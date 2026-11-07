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
import { aplicarMeta, carregarDadosMeta, metaDaRota, metaParaNavegador } from './src/lib/metaRota.ts';
import { SITE_URL, SITE_GLOBAL_URL } from './src/config/site.ts';
import { baseDaRequisicao, noPerfilDe, perfilDaRequisicao, registrarDominio } from './server/dominio';

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
  // Domínios: www → apex, .com.br/en|es → .com, .com/en → raiz (antes de qualquer rota de página).
  registrarDominio(app);
  // HTML, JS, CSS e JSON comprimidos (o pacote principal cai para cerca de um quarto). MP3 já vem comprimido e fica de fora.
  app.use(compression({ filter: (req, res) => !/\.mp3$/.test(req.path) && compression.filter(req, res) }));
  registrarNotificacoesCobranca(app);
  app.use(express.json({ limit: '10kb' }));

  // Saúde do serviço (para o Render e para monitoramento).
  app.get('/healthz', (_req: Request, res: Response) => { res.json({ ok: true }); });
  registrarProntidao(app);
  registrarAssetLinks(app);

  registrarCobranca(app, (req) => baseDaRequisicao(req, process.env.APP_URL || (producao ? SITE_URL : `http://localhost:${PORT}`)));
  registrarLivroProtegido(app);
  registrarProgresso(app);
  registrarMedicao(app);
  registrarNewsletter(app);
  registrarExclusao(app);
  // Metadados de cada rota (título, descrição, hreflang, conteúdo pré-renderizado): a mesma fonte para o HTML e para /api/meta.
  const dadosMeta = process.env.NODE_ENV === 'production' ? carregarDadosMeta(__dirname) : null;
  // Navegação dentro do site: o navegador pede ao servidor o título, robots, canonical e hreflang da nova rota,
  // em vez de calcular os seus — uma fonte só, igual ao HTML que o Google recebe nessa URL.
  app.get('/api/meta', (req: Request, res: Response) => {
    const p = String(req.query.p ?? '');
    if (!p.startsWith('/') || p.length > 300 || p.startsWith('//')) { res.status(400).json({ error: 'Caminho inválido.' }); return; }
    res.set('Cache-Control', 'public, max-age=300').set('Vary', 'Host').set('X-Robots-Tag', 'noindex').json(noPerfilDe(req, () => metaParaNavegador(metaDaRota(p, dadosMeta), SITE_URL, dadosMeta)));
  });
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
    // Cada domínio tem o seu sitemap e o seu robots (o do .com lista só inglês e espanhol; o do .com.br só português).
    const sitemapBr = arquivoEstatico('sitemap.xml', 'application/xml; charset=utf-8'), sitemapGlobal = arquivoEstatico('sitemap-global.xml', 'application/xml; charset=utf-8');
    const robotsBr = arquivoEstatico('robots.txt', 'text/plain; charset=utf-8'), robotsGlobal = arquivoEstatico('robots-global.txt', 'text/plain; charset=utf-8');
    app.get('/sitemap.xml', (req: Request, res: Response) => { res.vary('Host'); (perfilDaRequisicao(req) === 'global' ? sitemapGlobal : sitemapBr)(req, res); });
    app.get('/robots.txt', (req: Request, res: Response) => { res.vary('Host'); (perfilDaRequisicao(req) === 'global' ? robotsGlobal : robotsBr)(req, res); });
    // llms.txt: mapa curto do site para buscadores de IA; cada domínio entrega o seu (a versão do .com lista só o que existe em inglês).
    const llmsBr = arquivoEstatico('llms.txt', 'text/plain; charset=utf-8'), llmsGlobal = arquivoEstatico('llms-global.txt', 'text/plain; charset=utf-8');
    app.get('/llms.txt', (req: Request, res: Response) => { res.vary('Host'); (perfilDaRequisicao(req) === 'global' ? llmsGlobal : llmsBr)(req, res); });
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
      else if (/(sitemap\.xml|robots\.txt|llms(-global)?\.txt)$/.test(arquivo)) res.setHeader('Cache-Control', 'public, max-age=3600');
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
    let htmlBase: string | null = null;
    // A página de cada rota é carregada sob demanda (React.lazy): sem aviso, o navegador só descobre o módulo dela depois
    // de baixar e executar o JS principal. Aqui o HTML já pede esses módulos (modulepreload), em paralelo.
    const manifesto = (() => { try { return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dist', '.vite', 'manifest.json'), 'utf8')) as Record<string, { file: string; imports?: string[]; isEntry?: boolean }>; } catch { return null; } })();
    const PAGINAS: [RegExp, string][] = [
      [/^\/curso\/[a-z]{2}$/, 'src/plataforma/website/Curso.tsx'],
      [/^\/curso\/[a-z]{2}\/dia\/\d+$/, 'src/plataforma/website/Dia.tsx'],
      [/^\/assinatura$/, 'src/plataforma/website/Assinatura.tsx'],
      [/^\/gramatica(\/[a-z]{2})?$/, 'src/pages/Gramatica.tsx'],
      [/^\/livros(\/.*)?$/, 'src/pages/Livros.tsx'],
      [/^\/(termos|privacidade)$/, 'src/plataforma/website/Legal.tsx'],
      [/^\/sobre$/, 'src/pages/Sobre.tsx'], [/^\/por-que-linvuu$/, 'src/pages/PorQue.tsx'], [/^\/contato$/, 'src/pages/Contato.tsx'], [/^\/portugues$/, 'src/pages/Portugues.tsx'],
    ];
    const preloadCache = new Map<string, string>();
    const comPreloadDaRota = (html: string, caminho: string) => {
      if (!manifesto) return html;
      const semIdioma = caminho.replace(/^\/(en|es)(?=\/|$)/, '') || '/';
      const chave = PAGINAS.find(([re]) => re.test(semIdioma))?.[1];
      if (!chave || !manifesto[chave]) return html;
      let links = preloadCache.get(chave);
      if (links === undefined) {
        const visto = new Set<string>(), arquivos: string[] = [];
        const juntar = (k: string) => { const c = manifesto[k]; if (!c || visto.has(k) || c.isEntry) return; visto.add(k); arquivos.push(c.file); (c.imports ?? []).forEach(juntar); };
        juntar(chave);
        links = arquivos.filter((f) => !html.includes(`/${f}"`)).map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`).join('');
        preloadCache.set(chave, links);
      }
      return links ? html.replace('</head>', `${links}</head>`) : html;
    };
    // Arquivo de /assets que não existe mais (aba aberta antes de um deploy) deve dar 404 de verdade, não o HTML do site.
    app.get('/assets/*arquivo', (_req: Request, res: Response) => { res.status(404).type('text/plain').send('Not found'); });
    // Endereços que mudaram de lugar: redirecionamento permanente (o Google transfere a relevância).
    app.get(['/brazilian-portuguese', '/en/brazilian-portuguese', '/es/brazilian-portuguese'], (_req: Request, res: Response) => { res.redirect(301, `${SITE_GLOBAL_URL}/portugues`); });
    // Endereços antigos ou digitados à mão que davam 404.
    app.get('/metodo', (_req: Request, res: Response) => { res.redirect(301, '/#metodo'); });
    app.get('/preco', (_req: Request, res: Response) => { res.redirect(301, '/assinatura'); });
    // O curso de português para estrangeiros não existe no site em português: vai para a versão em inglês.
    app.get(/^\/curso\/br(\/.*)?$/, (req: Request, res: Response, next) => {
      if (perfilDaRequisicao(req) === 'global') { next(); return; } // no .com o curso de português para estrangeiros é uma página normal
      res.redirect(301, `${SITE_GLOBAL_URL}${req.path}`);
    });
    // Variante com barra no fim (/cursos/): redireciona para o endereço canônico em vez de servir uma cópia.
    app.get(/^\/.+\/$/, (req: Request, res: Response) => {
      const q = req.originalUrl.indexOf('?');
      res.redirect(301, req.path.replace(/\/+$/, '') + (q >= 0 ? req.originalUrl.slice(q) : ''));
    });
    app.get('/{*pagina}', (req: Request, res: Response) => {
      res.setHeader('Cache-Control', 'no-cache');
      htmlBase ??= fs.readFileSync(path.resolve(__dirname, 'dist', 'index.html'), 'utf8');
      res.vary('Host');
      const base = htmlBase;
      // Perfil do domínio da requisição durante a montagem síncrona do HTML (a estrutura de endereços difere entre .com e .com.br).
      const { m, html } = noPerfilDe(req, () => { const m = metaDaRota(req.path, dadosMeta); return { m, html: comPreloadDaRota(aplicarMeta(base, m, SITE_URL, dadosMeta), req.path) }; });
      res.status(m.status).type('html').send(html);
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
