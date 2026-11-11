// Confere, AO VIVO, quantas páginas dos dois sitemaps o servidor entrega com o HTML real (pré-renderizado)
// e quantas ainda saem com o resumo antigo (`<main data-prerender>`). Rodar depois de TODO deploy.
// Uso: node scripts/conferir-prerender.mjs            → produção (linvuu.com.br e linvuu.com)
//      node scripts/conferir-prerender.mjs http://127.0.0.1:4398   → servidor local (Host enviado no cabeçalho)
import http from 'node:http';
import https from 'node:https';

const base = process.argv[2];
const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const pegar = (host, caminho) => new Promise((ok, erro) => {
  const alvo = base ? new URL(caminho, base) : new URL(`https://${host}${caminho}`);
  const mod = alvo.protocol === 'https:' ? https : http;
  mod.get(alvo, { headers: { host, 'user-agent': UA } }, (res) => {
    const partes = []; res.on('data', (c) => partes.push(c)); res.on('end', () => ok({ status: res.statusCode, html: Buffer.concat(partes).toString('utf8') }));
  }).on('error', erro);
});

let real = 0, total = 0;
const resumo = [];
for (const host of ['linvuu.com.br', 'linvuu.com']) {
  const { html: sitemap } = await pegar(host, '/sitemap.xml');
  const caminhos = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, l]) => new URL(l)).filter((u) => u.hostname === host).map((u) => u.pathname);
  for (const c of caminhos) {
    total++;
    const { status, html } = await pegar(host, c);
    const root = html.match(/<div id="root">([\s\S]*)<\/div>\s*(?:<script|<\/body>)/)?.[1] ?? '';
    if (status === 200 && root && !root.includes('data-prerender')) real++; else resumo.push(`${host}${c} (${status})`);
  }
}
console.log(`${real} de ${total} páginas com o HTML real${resumo.length ? `; com resumo: ${resumo.join(', ')}` : ''}`);
process.exit(resumo.length ? 1 : 0);
