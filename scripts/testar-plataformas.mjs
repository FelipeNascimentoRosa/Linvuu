import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Pré-condição: este teste verifica artefactos de build (dist/ e dist-apk/).
// Num clone limpo eles ainda não existem e o teste falhava com um falso
// negativo — na CI só passava porque os builds corriam imediatamente antes.
// Se um artefacto faltar, o build correspondente corre aqui; as asserções
// abaixo não mudam e continuam a falhar se o build não produzir o esperado.
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function garantirBuild(artefacto, script) {
  if (fs.existsSync(artefacto)) return;
  console.log(`testar-plataformas: ${artefacto} em falta — a correr "npm run ${script}"…`);
  const r = spawnSync(npm, ['run', script], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
garantirBuild('dist/index.html', 'build');
garantirBuild('dist-apk/index.html', 'build:apk');

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

