// Gera public/sitemap.xml e public/robots.txt nos três idiomas do site (/, /en, /es), com as versões alternativas (hreflang).
// Fora do sitemap: o curso escrito para o próprio público de cada idioma (inglês em /en, espanhol em /es, português para
// estrangeiros em /) e, em /en e /es, as sessões ainda não traduzidas (o servidor as marca com noindex).
import fs from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
const SITE = 'https://linvuu.com.br';
const LOCALES = [{ c: 'pt-BR', p: '', l: 'pt', oculto: 'br' }, { c: 'en', p: '/en', l: 'en', oculto: 'en' }, { c: 'es', p: '/es', l: 'es', oculto: 'es' }];
const { cursos } = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'cursos.json'), 'utf8'));
const indice = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'indice.json'), 'utf8')).cursos;
const tr = Object.fromEntries(['en', 'es'].map((l) => { const f = path.join(raiz, 'content', `indice.${l}.json`); return [l, fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}]; }));
const fonte = (id) => indice[id]?.fonte ?? 'pt';

/** Caminhos (sem prefixo) e em quais idiomas cada um entra. */
const grupos = [];
const todos = (c) => LOCALES.map((l) => l.c);
// Sitemap enxuto (decisão de 15/10/2026): só as páginas com texto próprio e valor de busca. A página central entra nos três idiomas;
// o resto é em português. O sitemap lista URLs canonicas desejadas; nao limita as URLs que o Google pode descobrir.
grupos.push({ p: '/', em: todos() }, { p: '/cursos', em: ['pt-BR'] }, { p: '/assinatura', em: ['pt-BR'] });
// Livros e Sobre: só em português. Cada capítulo de amostra publicado (content/livros/<idioma>/cap-NN.json) entra no sitemap.
grupos.push({ p: '/sobre', em: ['pt-BR'] }, { p: '/por-que-linvuu', em: ['pt-BR'] }, { p: '/contato', em: ['pt-BR'] }, { p: '/ex-alunos-udemy', em: ['pt-BR'] }, { p: '/livros', em: ['pt-BR'] });
const dirLivros = path.join(raiz, 'content', 'livros');
if (fs.existsSync(dirLivros)) for (const id of fs.readdirSync(dirLivros).sort()) {
  // Apenas os capítulos de amostra: a presença de outro arquivo não o torna público.
  const caps = fs.readdirSync(path.join(dirLivros, id)).map((f) => f.match(/^cap-(\d+)\.json$/)?.[1]).filter(Boolean).map(Number).filter((n) => n === 1 || n === 2).sort((a, b) => a - b);
  if (!caps.length) continue;
  grupos.push({ p: `/livros/${id}`, em: ['pt-BR'] });
  for (const n of caps) grupos.push({ p: `/livros/${id}/capitulo/${n}`, em: ['pt-BR'] });
}
// Aulas grátis (dias 1 a 8 de cada curso, só em português): texto completo no HTML e dados de recurso educacional, então entram no sitemap.
// Excluídos: o curso escrito para o próprio público (br, que não aparece em português) e cursos sem explicação em português.
// Quando o curso também tem a versão em inglês (aulas em content/indice.en.json, gramática em content/gramatica/<id>.en.json),
// a URL /en/... entra no mesmo grupo, com hreflang recíproco.
const aulasEn = (id) => tr.en?.[id]?.aulas ?? [];
const gramaticaEn = (id) => fs.existsSync(path.join(raiz, 'content', 'gramatica', `${id}.en.json`));
for (const c of cursos.filter((x) => x.status !== 'em-breve' && x.id !== 'br' && fonte(x.id) === 'pt')) {
  const dias = Array.from({ length: 8 }, (_, k) => k + 1);
  const comEn = dias.filter((d) => aulasEn(c.id).includes(Math.ceil(d / 4)));
  grupos.push({ p: `/curso/${c.id}`, em: comEn.length ? ['pt-BR', 'en'] : ['pt-BR'] }, { p: `/gramatica/${c.id}`, em: gramaticaEn(c.id) ? ['pt-BR', 'en'] : ['pt-BR'] });
  for (const d of dias) grupos.push({ p: `/curso/${c.id}/dia/${d}`, em: comEn.includes(d) ? ['pt-BR', 'en'] : ['pt-BR'] });
}
// Português para estrangeiros possui versão pública em inglês.
grupos.push({ p: '/curso/br', em: ['en'] }, { p: '/gramatica/br', em: ['en'] });
const url = (c, p) => { const l = LOCALES.find((x) => x.c === c); return `${SITE}${l.p ? (p === '/' ? l.p : l.p + p) : p}`; };
const linhas = [];
// lastmod só com data verificável: content/lastmod.json é gerado a partir do histórico git
// (scripts/gerar-lastmod.mjs) com a última alteração dos ficheiros-fonte de cada página.
// URL sem data no manifesto fica sem lastmod — anunciar alterações que não aconteceram
// faz o Google ignorar o sinal.
const manifestoLastmod = (() => { const f = path.join(raiz, 'content', 'lastmod.json'); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}; })();
for (const g of grupos) for (const c of g.em) {
  const alt = g.em.length > 1 ? g.em.map((x) => `\n    <xhtml:link rel="alternate" hreflang="${x}" href="${url(x, g.p)}"/>`).join('') + (g.em.includes('pt-BR') ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url('pt-BR', g.p)}"/>` : '') : '';
  const lm = manifestoLastmod[url(c, g.p).slice(SITE.length)];
  const data = typeof lm === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(lm) ? `\n    <lastmod>${lm}</lastmod>` : '';
  linhas.push(`  <url><loc>${url(c, g.p)}</loc>${data}${alt}\n  </url>`);
}
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${linhas.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(raiz, 'public', 'sitemap.xml'), xml);
// A página de gramática carrega suas amostras abertas desta API; o acesso pago continua protegido no servidor.
fs.writeFileSync(path.join(raiz, 'public', 'robots.txt'), `User-agent: *\nAllow: /\nAllow: /api/gramatica/\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`sitemap: ${linhas.length} endereços em 3 idiomas`);
