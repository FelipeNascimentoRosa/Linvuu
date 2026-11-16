// Pré-renderização das páginas indexáveis: o HTML que o servidor entrega passa a ser a página real que a
// pessoa vê (o React montado num navegador de verdade), e não um resumo escrito à parte.
//
// Camadas:
//   1. build  — este script: depois do `vite build`, sobe o servidor de produção, abre cada URL dos dois
//      sitemaps num Chromium, como visitante sem conta (nenhum conteúdo pago entra), com o domínio certo
//      (.com.br → pt-BR, .com → en), e grava o conteúdo de #root em dist/prerender/<perfil><caminho>.html.
//   2. servidor — server.ts entrega esse HTML dentro de #root; o <head> (título, canonical, hreflang,
//      JSON-LD) continua vindo de metaRota.ts. Sem arquivo pré-renderizado, cai no resumo antigo.
//   3. navegador — o React assume a página como sempre.
//
// Nunca derruba o build: sem Playwright/Chromium, ou com falha numa página, registra e segue (a página
// fica com o resumo antigo). `PRERENDER_OBRIGATORIO=1` transforma falha em erro (uso no CI).
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import http from 'node:http';

const raiz = path.resolve(import.meta.dirname, '..');
const dist = path.join(raiz, 'dist');
const saida = path.join(dist, 'prerender');
const PORTA = Number(process.env.PRERENDER_PORT || 4399);
const obrigatorio = process.env.PRERENDER_OBRIGATORIO === '1';
const falhar = (msg) => { console.error(`[prerender] ${msg}`); process.exit(obrigatorio ? 1 : 0); };

const PERFIS = [
  { perfil: 'br', host: 'linvuu.com.br', sitemap: 'sitemap-brasil.xml' },
  { perfil: 'global', host: 'linvuu.com', sitemap: 'sitemap-internacional.xml' },
];

let chromium;
try { ({ chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')); }
catch { falhar('Playwright indisponível: páginas ficam com o resumo do servidor.'); }

const urls = [];
for (const p of PERFIS) {
  const arq = [path.join(dist, p.sitemap), path.join(raiz, 'public', p.sitemap)].find((f) => fs.existsSync(f));
  if (!arq) continue;
  for (const [, loc] of fs.readFileSync(arq, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)) {
    const u = new URL(loc);
    if (u.hostname === p.host) urls.push({ ...p, caminho: u.pathname.replace(/\/+$/, '') || '/' });
  }
}
if (!urls.length) falhar('nenhum sitemap encontrado.');

// Servidor de produção sem credenciais reais (mesmo modelo do Lighthouse): só visitante, nada pago.
const env = { ...process.env, NODE_ENV: 'production', PORT: String(PORTA), DOTENV_PATH: path.join(raiz, '.lighthouseci', 'sem-credenciais.env') };
for (const k of Object.keys(env)) if (/^(STRIPE_|FIREBASE_|GOOGLE_|REVENUECAT_|POSTHOG_|METRICAS_)/i.test(k)) env[k] = '';
const servidor = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], { cwd: raiz, env, stdio: ['ignore', 'ignore', 'inherit'] });
const encerrar = () => { if (servidor.exitCode === null) servidor.kill(); };
process.on('exit', encerrar);
let pronto = false;
for (let i = 0; i < 300 && servidor.exitCode === null; i++) {
  try { if ((await fetch(`http://127.0.0.1:${PORTA}/healthz`)).ok) { pronto = true; break; } } catch { /* subindo */ }
  await new Promise((r) => setTimeout(r, 100));
}
if (!pronto) falhar('servidor local não subiu.');

let navegador;
try {
  navegador = await chromium.launch({ args: ['--no-proxy-server'] });
} catch (e) { encerrar(); falhar(`Chromium não abriu (${e.message.split('\n')[0]}).`); }

fs.rmSync(saida, { recursive: true, force: true });
let ok = 0;
const falhas = [];
const contexto = await navegador.newContext({ viewport: { width: 1280, height: 900 }, userAgent: 'LinvuuPrerender/1.0' });
// A página abre no endereço real (https://linvuu.com.br/…), e cada pedido aos dois domínios é atendido pelo
// servidor local com o Host certo: mesmos caminhos absolutos, mesmo perfil, sem rede. O resto (analytics,
// Firebase, fontes remotas) é bloqueado: não entra no HTML nem atrasa a captura.
await contexto.route('**/*', async (rota) => {
  const u = new URL(rota.request().url());
  if (!/^linvuu\.com(\.br)?$/.test(u.hostname)) return rota.abort();
  try {
    // http.request (não fetch): o fetch do Node descarta o cabeçalho Host, e o servidor responderia como .com.br.
    const r = await new Promise((ok, erro) => {
      const req = http.request({ host: '127.0.0.1', port: PORTA, path: `${u.pathname}${u.search}`, headers: { host: u.hostname, 'user-agent': 'LinvuuPrerender/1.0', accept: rota.request().headers().accept ?? '*/*', 'x-forwarded-proto': 'https' } }, (res) => {
        const partes = []; res.on('data', (c) => partes.push(c)); res.on('end', () => ok({ status: res.statusCode, headers: res.headers, corpo: Buffer.concat(partes) }));
      });
      req.on('error', erro); req.end();
    });
    const headers = Object.fromEntries(Object.entries(r.headers).filter(([k]) => !/^(content-encoding|content-length|transfer-encoding|connection)$/i.test(k)).map(([k, v]) => [k, String(v)]));
    await rota.fulfill({ status: r.status, headers, body: r.corpo });
  } catch { await rota.abort(); }
});
for (const u of urls) {
  const pg = await contexto.newPage();
  try {
    const r = await pg.goto(`https://${u.host}${u.caminho}`, { waitUntil: 'networkidle', timeout: 30000 });
    if (!r || r.status() !== 200) throw new Error(`status ${r?.status()}`);
    // Espera o conteúdo principal.
    await pg.waitForFunction(() => {
      const root = document.getElementById('root');
      // O React já substituiu o resumo do servidor (data-prerender) e o conteúdo principal chegou.
      return !!root?.querySelector('h1') && !root.querySelector('[data-prerender], [role="status"].carga-lista, .carregando');
    }, null, { timeout: 15000 });
    const html = await pg.evaluate(() => {
      const root = document.getElementById('root').cloneNode(true);
      // Fora do HTML pré-renderizado: avisos que dependem do visitante (cookies, sugestão de idioma).
      root.querySelectorAll('.analytics-consent, .sugestao-idioma, script, [data-sem-prerender]').forEach((e) => e.remove());
      return root.innerHTML;
    });
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) throw new Error(`${h1} h1`);
    const arq = path.join(saida, u.perfil, `${u.caminho === '/' ? 'index' : u.caminho}.html`);
    fs.mkdirSync(path.dirname(arq), { recursive: true });
    fs.writeFileSync(arq, html);
    ok++;
  } catch (e) {
    falhas.push(`${u.host}${u.caminho}: ${String(e.message).split('\n')[0]}`);
  } finally { await pg.close(); }
}
await navegador.close();
encerrar();
console.log(`[prerender] ${ok} de ${urls.length} páginas com o HTML real${falhas.length ? `; resumo antigo em: ${falhas.join(' · ')}` : ''}`);
if (obrigatorio && falhas.length) process.exit(1);
process.exit(0);
