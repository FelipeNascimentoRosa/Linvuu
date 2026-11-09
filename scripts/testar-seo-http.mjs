// Verifica o sitemap e os cabeçalhos do servidor de produção local, sem usar credenciais reais.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import http from 'node:http';

const port = 41000 + Math.floor(Math.random() * 10000);
const base = `http://127.0.0.1:${port}`;
const env = { ...process.env, NODE_ENV: 'production', PORT: String(port), DOTENV_CONFIG_PATH: '__sem_credenciais__' };
for (const key of Object.keys(env)) if (/^(STRIPE_|FIREBASE_|GOOGLE_|REVENUECAT_|VITE_FIREBASE_)/.test(key)) env[key] = '';
const server = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], { env, stdio: 'ignore' });
try {
  let ready = false;
  for (let i = 0; i < 200; i++) {
    try { if ((await fetch(`${base}/healthz`)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert(ready, 'servidor local disponível');
  const robots = await fetch(`${base}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get('content-type'), /^text\/plain/);
  const regras = await robots.text();
  assert(!/Disallow:\s*\/livro\//.test(regras));
  assert.match(regras, /Allow:\s*\/api\/gramatica\//);
  assert.match(regras, /Disallow:\s*\/api\//);
  const antigo = await fetch(`${base}/livro/gramatica-ru`);
  assert.match(await antigo.text(), /name="robots" content="noindex"/);
  const api = await fetch(`${base}/api/gramatica/ru`);
  assert.equal(api.status, 200);
  assert.match(api.headers.get('x-robots-tag'), /noindex/);
  const pacote = await api.json();
  assert(pacote.topicos.length > 0 && pacote.topicos.every(t => t.dia <= 8), 'API anônima só devolve tópicos gratuitos');
  assert.equal(pacote.completo, false, 'API não libera conteúdo pago sem assinatura');

  const sitemap = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get('content-type'), /^application\/xml/);
  const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert(urls.length > 0);
  for (const url of urls) {
    const u = new URL(url);
    assert.equal(u.origin, 'https://linvuu.com.br');
    const response = await fetch(base + u.pathname, { redirect: 'manual' });
    assert.equal(response.status, 200, url);
    const html = await response.text();
    assert(!/name="robots" content="noindex"/.test(html), url);
    assert(html.includes(`rel="canonical" href="${url}"`), url);
  }
  const html = readFileSync('dist/index.html', 'utf8');
  const js = html.match(/(?:src|href)="(\/assets\/[^" ]+-[A-Za-z0-9_-]{8}\.js)"/)?.[1];
  assert(js, 'asset Vite com fingerprint no HTML');
  const versionado = await fetch(base + js);
  assert.match(versionado.headers.get('cache-control'), /max-age=31536000.*immutable/);
  const vuu = await fetch(`${base}/assets/vuu/vuu.svg`);
  assert.equal(vuu.status, 200);
  assert.match(vuu.headers.get('cache-control'), /must-revalidate/);
  assert(!vuu.headers.get('cache-control')?.includes('immutable'));
  for (const arte of ['vuu.svg']) {
    const r = await fetch(`${base}/assets/vuu/${arte}`);
    assert.equal(r.status, 200, arte);
    assert.match(r.headers.get('cache-control'), /must-revalidate/, `${arte} precisa revalidar`);
    assert(!r.headers.get('cache-control')?.includes('immutable'), `${arte} não pode ser imutável (nome sem hash de conteúdo)`);
    assert(r.headers.get('etag'), `${arte} possui ETag`);
  }
  const etag = vuu.headers.get('etag');
  assert(etag, 'SVG possui ETag para revalidação');
  // fetch acrescenta Cache-Control: no-cache aos pedidos condicionais; usar HTTP direto como um cache comum.
  const statusCondicional = await new Promise((resolve, reject) => {
    const req = http.get(`${base}/assets/vuu/vuu.svg`, { headers: { 'If-None-Match': etag } }, res => { res.resume(); resolve(res.statusCode); });
    req.on('error', reject);
  });
  assert.equal(statusCondicional, 304);
  const indiceAudio = await fetch(`${base}/audio/de/index.json`);
  assert.match(indiceAudio.headers.get('cache-control'), /max-age=300/);
  const audio = (await indiceAudio.json()).find(h => /^[a-f0-9]{8}$/.test(h) && existsSync(`public/audio/de/${h}.mp3`));
  assert(audio, 'amostra pública de áudio disponível');
  const mp3 = await fetch(`${base}/audio/de/${audio}.mp3`);
  assert.match(mp3.headers.get('cache-control'), /max-age=86400/);
  assert(!mp3.headers.get('cache-control')?.includes('immutable'));
  await mp3.arrayBuffer();
  assert.match((await fetch(base + '/')).headers.get('cache-control'), /no-cache/);
  console.log(`SEO HTTP: ${urls.length} URLs reais, canonical/noindex, robots, sitemap e cache verificados.`);
} finally {
  if (server.exitCode === null) server.kill();
}
