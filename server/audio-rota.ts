import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import type { Request, Response } from 'express';

type DependenciasAudio = {
  acessoLivreLocal: () => boolean;
  autorizar: (req: Request, res: Response) => Promise<boolean>;
  r2Configurado: () => boolean;
  buscarR2: (idioma: string, arquivo: string) => Promise<string | null>;
  buscarDisco: (idioma: string, arquivo: string) => string | null;
};

/** O armazenamento só é consultado depois da autenticação e da autorização. */
export function criarRotaAudio(deps: DependenciasAudio) {
  return async (req: Request, res: Response): Promise<void> => {
    const idioma = String(req.params.idioma), arquivo = String(req.params.arquivo);
    if (!/^[a-z]{2}$/.test(idioma) || !/^[0-9a-f]{8}\.mp3$/.test(arquivo)) { res.status(404).end(); return; }
    const r2 = deps.r2Configurado();
    if ((r2 || !deps.acessoLivreLocal()) && !(await deps.autorizar(req, res))) return;
    if (r2) {
      let url: string | null;
      try { url = await deps.buscarR2(idioma, arquivo); }
      catch (e) { console.error('audio/r2', e); res.status(500).json({ error: 'Não foi possível abrir o áudio.' }); return; }
      if (!url) { res.status(404).end(); return; }
      // O WebView vem de https://localhost: um segundo redirect entre origens faz
      // navegadores enviarem Origin: null ao R2. Transmitir pela API evita ampliar CORS.
      if (req.get('Origin') === 'https://localhost') {
        try {
          const range = req.get('Range');
          const upstream = await fetch(url, { headers: range ? { Range: range } : {}, signal: AbortSignal.timeout(12000) });
          if ((upstream.status !== 200 && upstream.status !== 206) || !upstream.body) {
            res.status(502).json({ error: 'N?o foi poss?vel abrir o ?udio.' }); return;
          }
          res.status(upstream.status).set('Cache-Control', 'private, no-store').type('audio/mpeg');
          for (const nome of ['content-length', 'content-range', 'accept-ranges', 'etag']) {
            const valor = upstream.headers.get(nome); if (valor) res.set(nome, valor);
          }
          await pipeline(Readable.fromWeb(upstream.body as import('node:stream/web').ReadableStream), res);
        } catch (e) {
          console.error('audio/r2-stream', e instanceof Error ? e.name : 'error');
          if (!res.headersSent) res.status(502).json({ error: 'N?o foi poss?vel abrir o ?udio.' });
          else res.destroy();
        }
        return;
      }
      res.set('Cache-Control', 'private, no-store').redirect(302, url);
      return;
    }
    const arquivoLocal = deps.buscarDisco(idioma, arquivo);
    if (!arquivoLocal) { res.status(404).end(); return; }
    res.set('Cache-Control', 'private, no-store').type('audio/mpeg').sendFile(arquivoLocal);
  };
}
