import express from 'express';
import compression from 'compression';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { registrarCobranca, registrarLivroProtegido, registrarNotificacoesCobranca } from './server/billing';
import { registrarProgresso } from './server/progresso';
import { registrarMedicao } from './server/medicao';
import { registrarNewsletter } from './server/newsletter';
import { registrarExclusao } from './server/exclusao';
import { credencialConfigurada } from './server/firebase-admin';
import { fecharApi, registrarErros, registrarSeguranca } from './server/seguranca';
import { registrarProntidao } from './server/prontidao';
import { registrarAssetLinks } from './server/assetlinks';
import { aplicarMeta, carregarDadosMeta, metaDaRota } from './src/lib/metaRota.ts';
import { SITE_URL } from './src/config/site.ts';

dotenv.config();

// Uma falha assíncrona esquecida não pode derrubar o site: registra e segue.
process.on('unhandledRejection', (e) => { console.error('[Linvuu] promessa rejeitada sem tratamento:', e instanceof Error ? e.message : e); });
// Depois de uma exceção não capturada o processo fica em estado incerto: registra e sai, e o Render sobe outro.
process.on('uncaughtException', (e) => { console.error('[Linvuu] erro não capturado:', e.message); setTimeout(() => process.exit(1), 200).unref(); });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();

  // Porta: usa process.env.PORT (Render) ou 3000 em desenvolvimento
  const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  const producao = process.env.NODE_ENV === 'production';
  if (producao && !credencialConfigurada()) console.error('[Linvuu] ATENÇÃO: Firebase Admin sem credencial. Login no servidor, progresso e áreas pagas ficam indisponíveis até definir FIREBASE_SERVICE_ACCOUNT_JSON.');
  registrarSeguranca(app, producao);
  // HTML, JS, CSS e JSON comprimidos (o pacote principal cai para cerca de um quarto). MP3 já vem comprimido e fica de fora.
  app.use(compression({ filter: (req, res) => !/\.mp3$/.test(req.path) && compression.filter(req, res) }));
  registrarNotificacoesCobranca(app);
  app.use(express.json({ limit: '10kb' }));

  // Saúde do serviço (para o Render e para monitoramento).
  app.get('/healthz', (_req: Request, res: Response) => { res.json({ ok: true }); });
  registrarProntidao(app);
  registrarAssetLinks(app);

  registrarCobranca(app, () => process.env.APP_URL || (producao ? SITE_URL : `http://localhost:${PORT}`));
  registrarLivroProtegido(app);
  registrarProgresso(app);
  registrarMedicao(app);
  registrarNewsletter(app);
  registrarExclusao(app);
  fecharApi(app);

  // -------------------------------------------------------------
  // 7. Vite Middleware Integration (Dev) or Static dist (Prod)
  // -------------------------------------------------------------
  if (process.env.NODE_ENV === 'production') {
    // sitemap.xml e robots.txt: rota explícita ANTES do express.static e do catch-all. Saem do dist como arquivo puro, com o tipo certo, e nunca
    // viram o HTML da SPA (o Search Console recusa um sitemap que chega como text/html).
    const arquivoEstatico = (nome: string, tipo: string) => (_req: Request, res: Response) => {
      const arq = path.resolve(__dirname, 'dist', nome);
      if (!fs.existsSync(arq)) { res.status(404).type('text/plain; charset=utf-8').send('Not found'); return; }
      res.set({ 'Content-Type': tipo, 'Cache-Control': 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' }).send(fs.readFileSync(arq));
    };
    app.get('/sitemap.xml', arquivoEstatico('sitemap.xml', 'application/xml; charset=utf-8'));
    app.get('/robots.txt', arquivoEstatico('robots.txt', 'text/plain; charset=utf-8'));
    const distDir = path.resolve(__dirname, 'dist');
    // Regras de cache dos estáticos: as mesmas para o express.static e para o Brotli pré-comprimido abaixo,
    // para o mesmo arquivo ter sempre a mesma política, comprimido ou não.
    const cabecalhosCache = (res: Response, arquivo: string) => {
      // Apenas arquivos com fingerprint de conteúdo, direto em dist/assets (saída do Vite), são imutáveis. Subpastas (assets/vuu/...) são arte pública
      // com nome escolhido à mão: um nome como «vuu-feliz-2d.svg» casaria por acaso com o padrão de hash e ficaria um ano em cache.
      if (path.dirname(arquivo).endsWith(`${path.sep}assets`) && /-[A-Za-z0-9_-]{8}\.[A-Za-z0-9]+$/.test(path.basename(arquivo))) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      else if (arquivo.includes(`${path.sep}assets${path.sep}`)) res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      // O nome do MP3 deriva do texto, não do conteúdo: uma regravação pode reutilizar o nome.
      else if (arquivo.endsWith('.mp3')) res.setHeader('Cache-Control', 'public, max-age=86400');
      else if (arquivo.includes(`${path.sep}audio${path.sep}`) && arquivo.endsWith('index.json')) res.setHeader('Cache-Control', 'public, max-age=300');
      else if (/\.(webp|png|jpe?g|svg|woff2?)$/.test(arquivo)) res.setHeader('Cache-Control', 'public, max-age=2592000');
      // sitemap e robots: o Google relê com frequência; uma hora de cache basta
      else if (/(sitemap\.xml|robots\.txt)$/.test(arquivo)) res.setHeader('Cache-Control', 'public, max-age=3600');
    };
    // Brotli pré-comprimido: o build gera «<arquivo>.br» ao lado dos estáticos de texto (scripts/comprimir.mjs).
    // Quem aceita Brotli recebe o .br pronto, sem custo de CPU por pedido; quem não aceita segue para o
    // express.static e para o gzip dinâmico do middleware compression. Como o Content-Encoding é definido
    // aqui, o compression não volta a comprimir a resposta (ele salta respostas já codificadas).
    // Só estáticos: pedidos parciais (Range), métodos que não GET/HEAD e URLs fora de dist/ passam adiante.
    const tiposPreComprimidos: Record<string, string> = {
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.html': 'text/html; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.json': 'application/json; charset=utf-8',
      '.xml': 'application/xml; charset=utf-8',
      '.txt': 'text/plain; charset=utf-8',
    };
    const aceitaBrotli = (req: Request): boolean => {
      const bruto = req.headers['accept-encoding'];
      if (!bruto) return false;
      return bruto.split(',').some((parte) => {
        const [cod, ...params] = parte.split(';').map((p) => p.trim());
        if (cod.toLowerCase() !== 'br') return false;
        const q = params.find((p) => p.startsWith('q='));
        return !q || Number.parseFloat(q.slice(2)) > 0;
      });
    };
    app.use((req: Request, res: Response, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      if (req.headers.range) return next();
      const tipo = tiposPreComprimidos[path.extname(req.path).toLowerCase()];
      if (!tipo || !aceitaBrotli(req)) return next();
      let relativo = req.path;
      try { relativo = decodeURIComponent(req.path); } catch { return next(); }
      const arquivo = path.resolve(distDir, `.${relativo}`);
      if (!arquivo.startsWith(distDir + path.sep)) return next();
      const preComprimido = `${arquivo}.br`;
      let tamanhoBr: number;
      try {
        if (!fs.statSync(arquivo).isFile()) return next();
        tamanhoBr = fs.statSync(preComprimido).size;
      } catch { return next(); }
      res.setHeader('Content-Type', tipo);
      res.setHeader('Content-Encoding', 'br');
      const vary = res.getHeader('Vary');
      if (!vary) res.setHeader('Vary', 'Accept-Encoding');
      else if (!String(vary).split(',').map((v) => v.trim()).includes('Accept-Encoding')) res.setHeader('Vary', `${vary}, Accept-Encoding`);
      cabecalhosCache(res, arquivo);
      res.setHeader('Content-Length', tamanhoBr);
      if (req.method === 'HEAD') { res.end(); return; }
      fs.createReadStream(preComprimido)
        .on('error', () => { if (!res.headersSent) next(); else res.destroy(); })
        .pipe(res);
    });
    // index: false — a página inicial também passa pelo catch-all abaixo, que coloca as metatags (sem isso, «/» saía sem hreflang).
    app.use(express.static(distDir, {
      redirect: false, // /livros é também uma pasta de capas em dist/: sem isto o express responderia 301 para /livros/
      index: false,
      setHeaders: cabecalhosCache,
    }));
    // Cada rota recebe o HTML com título, descrição e endereço próprios (prévia de compartilhamento correta) e o status certo (404 de verdade).
    const dadosMeta = carregarDadosMeta(__dirname);
    let htmlBase: string | null = null;
    // Arquivo de /assets que não existe mais (aba aberta antes de um deploy) deve dar 404 de verdade, não o HTML do site.
    app.get('/assets/*arquivo', (_req: Request, res: Response) => { res.status(404).type('text/plain').send('Not found'); });
    // Endereços que mudaram de lugar: redirecionamento permanente (o Google transfere a relevância).
    app.get(['/brazilian-portuguese', '/en/brazilian-portuguese', '/es/brazilian-portuguese'], (_req: Request, res: Response) => { res.redirect(301, '/en/portugues'); });
    // Endereços antigos ou digitados à mão que davam 404.
    app.get('/metodo', (_req: Request, res: Response) => { res.redirect(301, '/#metodo'); });
    app.get('/preco', (_req: Request, res: Response) => { res.redirect(301, '/assinatura'); });
    // O curso de português para estrangeiros não existe no site em português: vai para a versão em inglês.
    app.get(/^\/curso\/br(\/.*)?$/, (req: Request, res: Response) => { res.redirect(301, `/en${req.path}`); });
    app.get('/{*pagina}', (req: Request, res: Response) => {
      res.setHeader('Cache-Control', 'no-cache');
      htmlBase ??= fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'), 'utf8');
      const m = metaDaRota(req.path, dadosMeta);
      res.status(m.status).type('html').send(aplicarMeta(htmlBase, m, SITE_URL, dadosMeta));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  registrarErros(app);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ [Linvuu Server] Porta ${PORT}`);
    console.log(`🌐 Acesse o site em: http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
