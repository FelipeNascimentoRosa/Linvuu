// Segurança do servidor Express: cabeçalhos HTTP, Content-Security-Policy, limite de requisições e tratamento de erros.
// Sem dependência extra: cada peça é pequena e está coberta por scripts/testar-seguranca.mjs.
import type { Express, NextFunction, Request, Response } from 'express';

/** Política de conteúdo. Fontes e scripts são do próprio site; o resto é só o que o login (Firebase/Google) exige. */
export function politicaCSP(extraMidia = ''): string {
  const firebase = ['https://*.googleapis.com', 'https://*.firebaseio.com', 'wss://*.firebaseio.com', 'https://*.firebaseapp.com', 'https://*.google.com'];
  const d: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'", 'https://apis.google.com', 'https://connect.facebook.net', 'https://analytics.tiktok.com'],
    'style-src': ["'self'", "'sha256-4kzgBy+zsz5Dss9Gwj059V7MYYUJ3GYIpRQcTylPB9k='"], // fallback sem unsafe-inline: so o bloco anti-CLS do index.html, por hash
    'style-src-elem': ["'self'", "'sha256-4kzgBy+zsz5Dss9Gwj059V7MYYUJ3GYIpRQcTylPB9k='"], // elementos <style>: so o bloco anti-CLS do index.html
    'style-src-attr': ["'unsafe-inline'"], // atributos style="" do React (21 usos); nao carregam recursos externos
    'img-src': ["'self'", 'data:', 'blob:', 'https://*.googleusercontent.com', 'https://www.facebook.com', 'https://analytics.tiktok.com'],
    'media-src': ["'self'", 'blob:', 'data:', ...(extraMidia ? [extraMidia] : [])],
    'font-src': ["'self'", 'data:'],
    'connect-src': ["'self'", 'https://us.i.posthog.com', 'https://eu.i.posthog.com', 'https://www.facebook.com', 'https://analytics.tiktok.com', 'https://analytics-ipv6.tiktokw.us', ...firebase, ...(extraMidia ? [extraMidia] : [])],
    'frame-src': ['https://*.firebaseapp.com', 'https://accounts.google.com', 'https://*.google.com'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'", 'https://checkout.stripe.com', 'https://billing.stripe.com'],
    'frame-ancestors': ["'none'"],
  };
  return Object.entries(d).map(([k, v]) => `${k} ${v.join(' ')}`).join('; ') + '; upgrade-insecure-requests';
}

export function cabecalhos(producao: boolean) {
  // CSP_MODO=report põe a política só em observação (sem bloquear), caso algum recurso novo seja barrado por engano.
  const nomeCSP = process.env.CSP_MODO === 'report' ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
  const audioBase = (process.env.VITE_AUDIO_BASE_URL || '').match(/^https:\/\/[^/]+/)?.[0] ?? '';
  const csp = politicaCSP(audioBase);
  return (req: Request, res: Response, next: NextFunction) => {
    // Vale também para 401/403/404/429 e erros anteriores aos handlers.
    // A política da CDN não substitui a proteção no servidor e no navegador.
    if (/^\/api(?:\/|$)/.test(req.path) || /^\/(healthz|readyz)$/.test(req.path)) {
      res.setHeader('Cache-Control', 'private, no-store');
      res.setHeader('X-Robots-Tag', 'noindex');
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); // o login com Google abre uma janela
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    if (producao) {
      res.setHeader('Strict-Transport-Security', 'max-age=15552000'); // 180 dias; sem includeSubDomains nem preload
      res.setHeader(nomeCSP, csp);
    }
    next();
  };
}

type Janela = { n: number; ate: number };
/** Limite por IP e por grupo de rotas (memória do processo; o Render roda uma instância). */
// Faixas oficiais da Cloudflare (https://www.cloudflare.com/ips/). O cabeçalho CF-Connecting-IP só vale quando a conexão vem delas;
// de outro jeito qualquer pessoa poderia forjá-lo para fugir do limite de requisições.
const CF_V4 = ['173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22', '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20', '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13', '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22'];
const CF_V6 = ['2400:cb00:', '2606:4700:', '2803:f800:', '2405:b500:', '2405:8100:', '2c0f:f248:', '2a06:98c0:', '2a06:98c1:', '2a06:98c2:', '2a06:98c3:', '2a06:98c4:', '2a06:98c5:', '2a06:98c6:', '2a06:98c7:'];
const v4 = (ip: string) => ip.split('.').reduce((a, b) => (a * 256 + Number(b)) >>> 0, 0);
export function ehCloudflare(ip: string): boolean {
  const i = ip.replace(/^::ffff:/i, '').toLowerCase();
  if (/^\d+\.\d+\.\d+\.\d+$/.test(i)) {
    const n = v4(i);
    return CF_V4.some((c) => { const [base, bits] = c.split('/'); const m = bits === '0' ? 0 : (~0 << (32 - Number(bits))) >>> 0; return ((n & m) >>> 0) === ((v4(base) & m) >>> 0); });
  }
  return CF_V6.some((p) => i.startsWith(p));
}
/** IP do visitante: com a Cloudflare na frente, req.ip é o da borda dela; o do visitante vem em CF-Connecting-IP. */
export function ipDoVisitante(req: Request): string {
  const cf = req.headers['cf-connecting-ip'];
  const dele = typeof cf === 'string' ? cf.trim() : '';
  const hop = req.ip ?? '';
  return dele && /^[0-9a-f.:]+$/i.test(dele) && ehCloudflare(hop) ? dele : hop;
}

export function limitar(grupo: string, max: number, janelaMs: number) {
  const mapa = new Map<string, Janela>();
  setInterval(() => { const t = Date.now(); for (const [k, v] of mapa) if (v.ate < t) mapa.delete(k); }, 60_000).unref();
  return (req: Request, res: Response, next: NextFunction) => {
    const t = Date.now();
    const chave = `${grupo}:${ipDoVisitante(req)}`;
    let j = mapa.get(chave);
    if (!j || j.ate < t) { j = { n: 0, ate: t + janelaMs }; mapa.set(chave, j); }
    j.n++;
    res.setHeader('RateLimit-Limit', String(max));
    res.setHeader('RateLimit-Remaining', String(Math.max(0, max - j.n)));
    if (j.n > max) {
      res.setHeader('Retry-After', String(Math.ceil((j.ate - t) / 1000)));
      res.status(429).json({ error: 'Muitas tentativas. Aguarde um instante e tente de novo.' });
      return;
    }
    next();
  };
}

/** Origens do app nativo (o site empacotado): só elas recebem CORS. O site na web é da mesma origem e não precisa. */
const ORIGENS_APP = new Set(['https://localhost', 'capacitor://localhost', 'http://localhost']);
export function cors(req: Request, res: Response, next: NextFunction) {
  const origem = req.headers.origin;
  if (origem && ORIGENS_APP.has(origem)) {
    res.setHeader('Access-Control-Allow-Origin', origem);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '600');
    if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  }
  next();
}

export function registrarSeguranca(app: Express, producao: boolean) {
  app.disable('x-powered-by');
  app.set('trust proxy', 1); // atrás do proxy do Render: req.ip passa a ser o do visitante
  app.use(cabecalhos(producao));
  app.use('/api', cors);
  // Índices e MP3 gratuitos são carregados pelo app a partir de https://localhost.
  app.use('/audio', cors);
  app.use('/api/billing', limitar('billing', 30, 60_000));
  app.use('/api/aula', limitar('aula', 120, 60_000));
  app.use('/api/evento', limitar('evento', 40, 60_000));
  app.use('/api/newsletter', limitar('newsletter', 5, 60_000));
  app.use('/api/conta', limitar('conta', 5, 60_000));
  app.use('/api/audio', limitar('audio', 600, 60_000));
  app.use('/api', limitar('api', 300, 60_000));
}

/** Fecha a API: o que não existe sob /api responde 404 em JSON (sem cair na página do site). Vem depois das rotas reais. */
export function fecharApi(app: Express) {
  app.use('/api', (_req: Request, res: Response) => { res.status(404).json({ error: 'Não encontrado.' }); });
}

/** Último middleware: erros nunca devolvem detalhes internos. */
export function registrarErros(app: Express) {
  app.use((err: Error & { status?: number; type?: string }, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) { next(err); return; }
    const status = err.type === 'entity.too.large' ? 413 : err.status && err.status >= 400 && err.status < 500 ? err.status : 500;
    if (status === 500) console.error('erro não tratado', err);
    res.status(status).json({ error: status === 413 ? 'Pedido grande demais.' : status === 500 ? 'Erro interno.' : 'Pedido inválido.' });
  });
}

