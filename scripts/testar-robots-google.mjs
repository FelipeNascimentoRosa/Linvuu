// Executa o parser C++ oficial do Google sobre as regras publicadas pelo build.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const bin = process.env.GOOGLE_ROBOTS_BIN;
assert(bin, 'Defina GOOGLE_ROBOTS_BIN com o caminho do executável oficial compilado.');
// Os dois domínios: cada um com o seu robots.txt e o seu sitemap.
const dominios = [
  { site: 'https://linvuu.com.br', robots: 'public/robots.txt', sitemap: 'public/sitemap.xml' },
  { site: 'https://linvuu.com', robots: 'public/robots-global.txt', sitemap: 'public/sitemap-global.xml' },
];
let total = 0;
for (const { site, robots: arqRobots, sitemap } of dominios) {
  const robots = resolve(arqRobots);
  const urls = [...readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert(urls.length > 0, `O sitemap de ${site} precisa conter URLs.`);
  assert(urls.every(u => u.startsWith(site)), `O sitemap de ${site} só lista URLs do próprio domínio.`);
  const casos = [
    ...urls.map(url => [url, true]),
    [`${site}/livro/gramatica-ru`, true], // Google precisa ler o noindex.
    [`${site}/api/gramatica/ru`, true],
    [`${site}/api/gramatica/ru?l=en`, true],
    [`${site}/api/billing/checkout`, false],
    [`${site}/api/audio/ru/teste.mp3`, false],
    [`${site}/admin/painel`, false],
  ];
  for (const [url, permitido] of casos) {
    const r = spawnSync(bin, [robots, 'Googlebot', url], { encoding: 'utf8', timeout: 10000 });
    assert.ifError(r.error);
    assert.equal(r.status, permitido ? 0 : 1, `${url}: parser retornou ${r.status}; ${r.stderr || r.stdout}`);
  }
  total += urls.length;
}
console.log(`Parser oficial: ${total} URLs dos dois sitemaps e regras específicas verificadas para Googlebot.`);
