import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Pré-condição: este teste lê os artefactos já construídos (dist/ e dist-apk/); não os constrói.
// Num clone limpo, correr antes: npm run build && npm run build:apk (na CI, o passo build:apk corre imediatamente antes).
if (!fs.existsSync('dist/index.html') || !fs.existsSync('dist-apk/index.html')) {
  console.error('testar-plataformas: faltam artefactos de build (dist/ e/ou dist-apk/). Corre primeiro: npm run build && npm run build:apk');
  process.exit(1);
}
assert.ok(fs.existsSync('dist/index.html'), 'build website existe');
assert.ok(fs.existsSync('dist-apk/index.html'), 'build apk existe');
assert.ok(fs.existsSync('dist/sitemap.xml'), 'website mantém sitemap');
assert.ok(!fs.existsSync('dist-apk/audio'), 'APK não empacota MP3');
assert.ok(!fs.existsSync('dist-apk/sitemap.xml'), 'APK não empacota sitemap');
const js = fs.readdirSync('dist-apk/assets').filter((n) => n.endsWith('.js')).map((n) => fs.readFileSync(path.join('dist-apk/assets', n), 'utf8')).join('\n');
assert.ok(!js.includes('"checkout"'), 'APK não contém ação de checkout');
assert.ok(!js.includes('checkout.stripe.com'), 'APK não contém link Stripe');
assert.ok(!/R\$\s*(139|417|291|999|79|125)/.test(js), 'APK não contém preços do website');
assert.ok(js.includes('https://linvuu.com.br/audio'), 'APK usa áudio remoto');
const bytes = (dir) => fs.readdirSync(dir, { withFileTypes: true }).reduce((n, f) => n + (f.isDirectory() ? bytes(path.join(dir, f.name)) : fs.statSync(path.join(dir, f.name)).size), 0);
console.log(`ok: plataformas separadas; website ${(bytes('dist') / 1024 ** 2).toFixed(1)} MiB, assets APK ${(bytes('dist-apk') / 1024 ** 2).toFixed(1)} MiB (não é tamanho do APK compilado)`);

