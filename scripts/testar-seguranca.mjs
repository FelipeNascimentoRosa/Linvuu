// Teste de segurança do servidor em modo produção: cabeçalhos, API fechada, limite de requisições e erros sem detalhes.
// Uso: npm run build && npm run testar:seguranca
import { spawn } from 'node:child_process';

const PORT = 3900 + Math.floor(Math.random() * 90);
const base = `http://127.0.0.1:${PORT}`;
const env = { ...process.env, NODE_ENV: 'production', PORT: String(PORT), STRIPE_SECRET_KEY: '', FIREBASE_PROJECT_ID: '', VITE_FIREBASE_PROJECT_ID: '' };
const srv = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], { env, stdio: ['ignore', 'pipe', 'pipe'] });
let log = ''; srv.stdout.on('data', (d) => (log += d)); srv.stderr.on('data', (d) => (log += d));
const falhas = [];
const ok = (cond, msg) => { console.log(`${cond ? 'ok   ' : 'FALHA'} ${msg}`); if (!cond) falhas.push(msg); };

try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(`${base}/healthz`)).ok) break; } catch { /* espera */ } await new Promise((r) => setTimeout(r, 500)); }
  if (srv.exitCode !== null) throw new Error(`Servidor encerrou antes de ficar pronto: ${log.slice(-2500)}`);
  const home = await fetch(base + '/');
  const h = (n) => home.headers.get(n) ?? '';
  ok(home.status === 200, 'home responde 200');
  const prontidao = await fetch(base + '/readyz');
  const resumo = await prontidao.json();
  ok(prontidao.status === 503 && resumo.ok === false, 'prontidao falha sem dependencias configuradas');
  ok(prontidao.headers.get('cache-control') === 'private, no-store', 'prontidao nao fica em cache publico');
  ok(Object.keys(resumo).sort().join(',') === 'checkedAt,ok', 'prontidao nao revela configuracao ou erros internos');
  ok((await fetch(base + '/healthz')).status === 200, 'falha de prontidao nao derruba liveness');
  const assetAusente = await fetch(base + '/assets/arquivo-inexistente.js');
  ok(assetAusente.status === 404 && (assetAusente.headers.get('content-type') ?? '').startsWith('text/plain'), 'asset ausente dá 404 de texto, sem HTML da SPA');
  const desconhecida = await fetch(base + '/pagina-inexistente-de-teste');
  ok(desconhecida.status === 404 && (desconhecida.headers.get('content-type') ?? '').includes('text/html'), 'fallback mantém 404 real para página desconhecida');
  const robots = await fetch(base + '/robots.txt');
  ok(robots.status === 200 && (robots.headers.get('content-type') ?? '').startsWith('text/plain'), 'robots continua arquivo de texto');
  const sitemap = await fetch(base + '/sitemap.xml');
  ok(sitemap.status === 200 && (sitemap.headers.get('content-type') ?? '').includes('xml'), 'sitemap continua XML');
  ok(!home.headers.has('x-powered-by'), 'sem X-Powered-By');
  ok(h('x-content-type-options') === 'nosniff', 'X-Content-Type-Options: nosniff');
  ok(h('x-frame-options') === 'DENY', 'X-Frame-Options: DENY');
  ok(/max-age=\d{7,}/.test(h('strict-transport-security')), 'HSTS');
  ok(h('referrer-policy') !== '', 'Referrer-Policy');
  ok(h('permissions-policy').includes('camera=()'), 'Permissions-Policy');
  const csp = h('content-security-policy');
  ok(csp.includes("default-src 'self'") && csp.includes("object-src 'none'") && csp.includes("frame-ancestors 'none'"), 'CSP com default-src, object-src e frame-ancestors');
  ok(!/script-src[^;]*unsafe-(inline|eval)/.test(csp), 'CSP sem unsafe-inline/unsafe-eval em scripts');
  ok(!/style-src [^;]*unsafe-inline/.test(csp), 'CSP sem unsafe-inline em style-src (elementos de estilo)');
  ok(/style-src-elem[^;]*sha256-/.test(csp) && /style-src-attr[^;]*unsafe-inline/.test(csp), 'CSP isola estilos: hash em style-src-elem e atributos em style-src-attr');
  ok(/script-src[^;]*https:\/\/connect\.facebook\.net/.test(csp) && /img-src[^;]*https:\/\/www\.facebook\.com/.test(csp) && /connect-src[^;]*https:\/\/www\.facebook\.com/.test(csp), 'CSP permite os domínios necessários ao pixel da Meta');
  ok(/script-src[^;]*https:\/\/analytics\.tiktok\.com/.test(csp) && /img-src[^;]*https:\/\/analytics\.tiktok\.com/.test(csp) && /connect-src[^;]*https:\/\/analytics\.tiktok\.com/.test(csp) && /connect-src[^;]*https:\/\/analytics-ipv6\.tiktokw\.us/.test(csp), 'CSP permite os domínios necessários ao pixel do TikTok');
  ok(!/<script(?![^>]*(type="module"|application\/ld\+json))[^>]*>[^<]/.test(await (await fetch(base + '/portugues')).text()), 'HTML sem script inline executável');

  const api = await fetch(base + '/api/download-project');
  ok(api.status === 404 && (api.headers.get('content-type') || '').includes('json'), 'rota antiga /api/download-project não existe (404 JSON)');
  ok((await fetch(base + '/api/user/profile')).status === 404, 'rota antiga /api/user/profile não existe');
  ok((await fetch(base + '/api/ai/philological-analysis', { method: 'POST' })).status === 404, 'rota antiga de IA não existe');
  ok([401, 403, 503].includes((await fetch(base + '/api/aula/de/9')).status), 'sessão paga sem login não é entregue');
  ok((await fetch(base + '/api/aula/..%2f..%2fserver/1')).status === 404, 'path traversal em /api/aula barrado');
  ok((await fetch(base + '/api/billing/status')).status !== 200, 'cobrança exige login');

  const pre = await fetch(base + '/api/billing/status', { method: 'OPTIONS', headers: { Origin: 'capacitor://localhost', 'Access-Control-Request-Method': 'GET' } });
  ok(pre.status === 204 && pre.headers.get('access-control-allow-origin') === 'capacitor://localhost', 'CORS libera o app nativo (capacitor://localhost)');
  const audio = await fetch(base + '/audio/en/index.json', { headers: { Origin: 'https://localhost' } });
  ok(audio.status === 200 && audio.headers.get('access-control-allow-origin') === 'https://localhost', 'índice de áudio gratuito permite o app por CORS');
  ok(!(await fetch(base + '/audio/en/index.json', { headers: { Origin: 'https://site-estranho.com' } })).headers.get('access-control-allow-origin'), 'áudio não libera CORS para origem estranha');
  ok(!(await fetch(base + '/api/billing/status', { headers: { Origin: 'https://site-estranho.com' } })).headers.get('access-control-allow-origin'), 'CORS não libera origens estranhas');
  const ruim = await fetch(base + '/api/billing/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{nao json' });
  const txt = await ruim.text();
  ok(ruim.status === 400 && !/at |node_modules|SyntaxError/.test(txt), 'JSON inválido → 400 sem detalhes internos');
  const grande = await fetch(base + '/api/billing/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x: 'a'.repeat(20000) }) });
  ok(grande.status === 413, 'corpo grande → 413');

  let limitou = false;
  for (let i = 0; i < 40 && !limitou; i++) limitou = (await fetch(base + '/api/billing/status')).status === 429;
  ok(limitou, 'limite de requisições em /api/billing (429)');
} finally {
  srv.kill();
}
if (falhas.length) { console.error(`\n${falhas.length} falha(s).\n${log.slice(-800)}`); process.exit(1); }
console.log('\nsegurança do servidor: tudo certo.');
process.exit(0);
