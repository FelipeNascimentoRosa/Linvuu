// Verifica o HTML estatico realmente produzido no build, sem executar rede nem tocar em producao.
import fs from 'node:fs';
import path from 'node:path';

if (process.env.VITE_ALVO === 'apk') { console.log('[validar-prerender] APK: validacao do HTML web nao se aplica.'); process.exit(0); }
const raiz = process.cwd();
const configs = [
  { site: 'linvuu.com.br', perfil: 'br', sitemap: 'sitemap-brasil.xml' },
  { site: 'linvuu.com', perfil: 'global', sitemap: 'sitemap-internacional.xml' },
];
const falhas = [];
const resultados = [];
for (const { site, perfil, sitemap } of configs) {
  const arquivo = path.join(raiz, 'dist', sitemap);
  if (!fs.existsSync(arquivo)) { falhas.push(site + ': sitemap nao existe em dist (' + sitemap + ')'); continue; }
  const xml = fs.readFileSync(arquivo, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((x) => x[1]);
  if (!urls.length) falhas.push(site + ': nenhum loc no sitemap');
  let corretas = 0;
  for (const loc of urls) {
    let u;
    try { u = new URL(loc); } catch { falhas.push(site + ': URL invalida ' + loc); continue; }
    if (u.protocol !== 'https:' || u.hostname !== site) { falhas.push(site + ': URL fora do dominio ' + loc); continue; }
    const arquivoHTML = path.join(raiz, 'dist', 'prerender', perfil, u.pathname === '/' ? 'index.html' : u.pathname.slice(1) + '.html');
    if (!fs.existsSync(arquivoHTML)) { falhas.push(site + ': HTML nao pre-renderizado ' + loc); continue; }
    const html = fs.readFileSync(arquivoHTML, 'utf8');
    if ((html.match(/<h1(?:\s|>)/gi) || []).length !== 1) { falhas.push(site + ': H1 ausente/duplicado ' + loc); continue; }
    const texto = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]*>/g, ' ').replace(/&(?:[a-z]+|#\d+);/gi, ' ').replace(/\s+/g, ' ').trim();
    if (texto.length < 180) { falhas.push(site + ': HTML superficial (' + texto.length + ' caracteres) ' + loc); continue; }
    corretas++;
  }
  resultados.push({ site, urls: urls.length, htmlCompleto: corretas });
}
console.log(JSON.stringify({ resultados, falhas, ok: falhas.length === 0 }, null, 2));
if (falhas.length) process.exitCode = 1;
