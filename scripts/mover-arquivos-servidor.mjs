// Move os ficheiros por Host e os ficheiros internos de dist/ para server-files/.
//
// Só corre no build da Vercel (`npm run build:vercel`), DEPOIS de comprimir.mjs, e NUNCA
// no build da Vercel (aí tudo continua em dist/, como hoje).
//
// Porquê: a Vercel serve tudo o que está em dist/ pelo CDN ANTES de qualquer rewrite —
// um ficheiro estático existente ganha à função. Isso quebraria três comportamentos:
//   1. /sitemap.xml e /robots.txt variam por Host (.com.br vs .com); se dist/sitemap.xml
//      ficasse no output, o .com passaria a receber o sitemap BR.
//   2. Ficheiros internos ficariam públicos: sitemap-global.xml, robots-global.txt,
//      llms-global.txt, llms-full-global.txt e dist/prerender/* (fragmentos de HTML).
//   3. /index.html passaria a responder 200 em vez do 301 para /.
// Com os ficheiros fora de dist/, esses pedidos chegam à função e o comportamento actual
// (variante por Host + guarda 404) mantém-se intacto. A função lê-os de server-files/
// via `includeFiles` (vercel.json).
//
// Os companheiros .br dos ficheiros movidos são APAGADOS (não movidos): um .br deixado
// em dist/ seria servido directamente pelo CDN (ex.: /sitemap.xml.br). A função serve
// os ficheiros sem Brotli e o middleware compression faz gzip dinâmico.
import fs from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
const dist = path.join(raiz, 'dist');
const destino = path.join(raiz, 'server-files');

// Obrigatórios: sem eles o site não arranca direito — o build falha.
const obrigatorios = ['index.html', path.join('.vite', 'manifest.json'), 'sitemap.xml', 'robots.txt'];
// Opcionais: o seo.mjs gera-os sempre, mas o pré-render pode falhar sem derrubar o build.
const opcionais = [
  'sitemap-brasil.xml', 'sitemap-internacional.xml', 'sitemap-global.xml',
  'robots-global.txt', 'llms.txt', 'llms-global.txt', 'llms-full.txt', 'llms-full-global.txt',
  'prerender',
];

let movidos = 0;
const mover = (relativo, obrigatorio) => {
  const origem = path.join(dist, relativo);
  const alvo = path.join(destino, relativo);
  if (!fs.existsSync(origem)) {
    const msg = `mover-arquivos-servidor: ${relativo} não existe em dist/.`;
    if (obrigatorio) { console.error(msg); process.exit(1); }
    console.warn(`${msg} (opcional, segue sem ele)`);
    return;
  }
  fs.mkdirSync(path.dirname(alvo), { recursive: true });
  fs.rmSync(alvo, { recursive: true, force: true });
  fs.renameSync(origem, alvo);
  // O .br do ficheiro movido não pode ficar em dist/ (o CDN servi-lo-ia directamente).
  fs.rmSync(`${origem}.br`, { force: true });
  movidos++;
};

fs.rmSync(destino, { recursive: true, force: true });
for (const f of obrigatorios) mover(f, true);
for (const f of opcionais) mover(f, false);
console.log(`mover-arquivos-servidor: ${movidos} ficheiros movidos de dist/ para server-files/.`);
