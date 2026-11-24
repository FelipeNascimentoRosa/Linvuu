// Testa o contrato HTTP da entrada de função sem publicar nem usar credenciais reais.
import assert from 'node:assert/strict';
import http from 'node:http';
process.env.VERCEL = '1';
process.env.NODE_ENV = 'production';
for (const key of Object.keys(process.env)) {
  if (/^(STRIPE_|FIREBASE_|GOOGLE_|REVENUECAT_)/.test(key)) delete process.env[key];
}
const { default: handler } = await import('../api/index.ts');
const server = http.createServer(handler);
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const get = (host, path) => new Promise((resolve, reject) => {
  http.get({ host: '127.0.0.1', port, path, headers: { host } }, (res) => {
    const data = []; res.on('data', (b) => data.push(b));
    res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(data).toString(), headers: res.headers }));
  }).on('error', reject);
});
try {
  for (const [host, lang] of [['linvuu.com.br', 'pt-BR'], ['linvuu.com', 'en']]) {
    const r = await get(host, '/');
    assert.equal(r.status, 200, host);
    assert.match(r.body, new RegExp(`<html[^>]*lang="${lang}"`), host);
    assert.match(r.body, new RegExp(`rel="canonical" href="https://${host.replaceAll('.', '\\.')}\/"`), host);
    assert.equal((await get(host, '/healthz')).status, 200);
  }
  assert.equal((await get('linvuu.com', '/api/aula/it/9')).status, 404);
  assert.equal((await get('linvuu.com.br', '/curso/br')).status, 404);
  console.log('Adaptador de função: respostas por domínio e isolamento conformes.');
} finally {
  await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
}
