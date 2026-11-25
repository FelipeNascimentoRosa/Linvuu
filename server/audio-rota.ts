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
      res.set('Cache-Control', 'private, no-store').redirect(302, url);
      return;
    }
    const arquivoLocal = deps.buscarDisco(idioma, arquivo);
    if (!arquivoLocal) { res.status(404).end(); return; }
    res.set('Cache-Control', 'private, no-store').type('audio/mpeg').sendFile(arquivoLocal);
  };
}
