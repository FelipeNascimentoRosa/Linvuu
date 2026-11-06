// Paridade servidor × navegador: para cada URL do sitemap (e páginas noindex conhecidas), o <head> que o Google
// lê no HTML do servidor tem de ser o mesmo depois que o JavaScript roda — título, canonical, robots e hreflang.
// Também confere a navegação dentro do site (SPA): ao ir de uma página para outra, o <head> fica igual ao HTML
// que o servidor entregaria se a página fosse aberta direto.
// Uso: node scripts/testar-paridade-meta.mjs [base]   (padrão: servidor local de produção em http://127.0.0.1:4398)
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = (process.argv[2] ?? 'http://127.0.0.1:4398').replace(/\/$/, '');
const SITE = 'https://linvuu.com.br';
const extras = ['/en/curso/de', '/en/curso/de/dia/1', '/es/gramatica/de', '/curso/ru/dia/9', '/entrar', '/pagina-que-nao-existe', '/en/pagina-que-nao-existe'];

const lerHtml = (html) => {
  const tudo = (re) => [...html.matchAll(re)].map((m) => m[1]);
  return {
    titulo: (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '',
    robots: html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '',
    hreflang: tudo(/<link rel="alternate" hreflang="([^"]+" href="[^"]+)"/g).map((x) => x.replace('" href="', '=')).sort().join(' '),
  };
};
const lerDom = (page) => page.evaluate(() => ({
  titulo: document.title,
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  robots: [...document.querySelectorAll('meta[name="robots"]')].map((m) => m.content).join(','),
  hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => `${l.hreflang}=${l.getAttribute('href')}`).sort().join(' '),
}));

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).concat(extras))];
assert.ok(urls.length > 50, 'sitemap carregado');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
// Sem terceiros: o teste mede o site, não PostHog/pixels.
await ctx.route('**/*', (r) => (r.request().url().startsWith(base) ? r.continue() : r.abort()));
const falhas = [];
const esperarHead = async (page) => { await page.waitForLoadState('networkidle').catch(() => {}); await page.waitForTimeout(150); };

async function conferir(p) {
  const page = await ctx.newPage();
  try {
    const servidor = lerHtml(await (await fetch(base + p)).text());
    await page.goto(base + p, { waitUntil: 'load' });
    await esperarHead(page);
    const dom = await lerDom(page);
    for (const k of Object.keys(servidor)) if (servidor[k] !== dom[k]) falhas.push(`${p} [${k}] servidor=«${servidor[k]}» navegador=«${dom[k]}»`);
  } finally { await page.close(); }
}
const fila = [...urls];
await Promise.all(Array.from({ length: 4 }, async () => { for (let p; (p = fila.shift());) await conferir(p); }));

// Navegação SPA: abre uma página e segue um link interno real; o <head> resultante deve ser o do servidor para o destino.
const percursos = [['/', '/cursos'], ['/cursos', '/curso/ru'], ['/curso/ru', '/curso/ru/dia/1'], ['/en', '/en/cursos'], ['/en/cursos', '/en/curso/de'], ['/en/curso/ru', '/en/curso/ru/dia/1']];
for (const [de, para] of percursos) {
  const page = await ctx.newPage();
  await page.goto(base + de, { waitUntil: 'load' });
  await esperarHead(page);
  // clique programático: no celular o link do menu pode estar recolhido; o React Router trata o clique do mesmo jeito.
  const achou = await page.evaluate((h) => { const a = [...document.querySelectorAll(`a[href="${h}"]`)].find((x) => !x.closest('[data-prerender]')); a?.click(); return !!a; }, para);
  if (!achou) { falhas.push(`SPA ${de} → ${para}: link não encontrado`); await page.close(); continue; }
  await page.waitForURL(base + para);
  await esperarHead(page);
  const dom = await lerDom(page);
  const servidor = lerHtml(await (await fetch(base + para)).text());
  for (const k of Object.keys(servidor)) if (servidor[k] !== dom[k]) falhas.push(`SPA ${de} → ${para} [${k}] servidor=«${servidor[k]}» navegador=«${dom[k]}»`);
  await page.close();
}
await browser.close();
if (falhas.length) { console.error(falhas.join('\n')); process.exit(1); }
console.log(`Paridade de <head>: ${urls.length} URLs e ${percursos.length} navegações internas iguais ao HTML do servidor (${SITE}).`);
