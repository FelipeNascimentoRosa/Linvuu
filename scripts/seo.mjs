// Gera public/sitemap.xml e public/robots.txt nos três idiomas do site (/, /en, /es), com as versões alternativas (hreflang).
// O conjunto de URLs deriva do mesmo modelo de indexação do servidor (src/lib/metaRota.ts), para o sitemap não
// divergir do site servido: hub de curso só é indexável no idioma em que TODAS as aulas estão explicadas, e a
// gramática só onde o arquivo dela existe nesse idioma (sem o curso do próprio público — LOCALES.oculto — nem 'em-breve');
// as sessões grátis só são indexáveis no idioma em que a explicação da aula existe (o idioma-fonte do curso
// ou uma tradução presente em content/indice.<idioma>.json). Fora do sitemap ficam, por decisão, as páginas
// legais (/privacidade, /termos) e as versões que o servidor marca com noindex.
import fs from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
// Dois domínios: português no .com.br; inglês (raiz) e espanhol (/es) no .com. `legado` = prefixo antigo, só para ler content/lastmod.json.
const SITE_BR = 'https://linvuu.com.br', SITE_GLOBAL = 'https://linvuu.com';
const LOCALES = [{ c: 'pt-BR', p: '', legado: '', site: SITE_BR, l: 'pt', oculto: 'br' }, { c: 'en', p: '', legado: '/en', site: SITE_GLOBAL, l: 'en', oculto: 'en' }, { c: 'es', p: '/es', legado: '/es', site: SITE_GLOBAL, l: 'es', oculto: 'es' }];
const { cursos } = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'cursos.json'), 'utf8'));
const indice = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'indice.json'), 'utf8')).cursos;
const tr = Object.fromEntries(['en', 'es'].map((l) => { const f = path.join(raiz, 'content', `indice.${l}.json`); return [l, fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}]; }));
const fonte = (id) => indice[id]?.fonte ?? 'pt';

/** Caminhos (sem prefixo) e em quais idiomas cada um entra. */
const grupos = [];
const todos = (c) => LOCALES.map((l) => l.c);
/** x-default de um grupo: inglês (o .com, internacional) se estiver no cluster; senão PT; senão o idioma-fonte do curso; senão o primeiro. Espelha alternativosDe (metaRota.ts). */
const alvoPadrao = (g) => {
  const anot = g.anot ?? g.em;
  if (anot.includes('en')) return 'en';
  if (anot.includes('pt-BR')) return 'pt-BR';
  const id = g.p.match(/^\/(?:curso|gramatica)\/([a-z]{2})/)?.[1];
  const cod = id ? (fonte(id) === 'pt' ? 'pt-BR' : fonte(id)) : undefined;
  return cod && anot.includes(cod) ? cod : anot[0];
};
// Sitemap enxuto (decisão de 15/10/2026): só as páginas com texto próprio e valor de busca. As páginas centrais
// entram nos três idiomas; o resto é em português. O sitemap lista URLs canonicas desejadas; nao limita as URLs que o Google pode descobrir.
// `anot` = cluster hreflang declarado nas anotações (espelha o HTML de metaRota.ts); `em` é a lista de URLs
// com entrada própria. A assinatura é indexável nos três idiomas (página localizada genuína nas três —
// sem noindex desde a correção de integridade hreflang), por isso entra com <loc> próprio em todas.
grupos.push({ p: '/', em: todos() }, { p: '/cursos', em: todos(), anot: todos() }, { p: '/assinatura', em: todos(), anot: todos() });
// Livros e Sobre: só em português. Cada capítulo de amostra publicado (content/livros/<idioma>/cap-NN.json) entra no sitemap.
grupos.push({ p: '/russo-online', em: ['pt-BR', 'en'], anot: ['pt-BR', 'en'] }, { p: '/sobre', em: ['pt-BR'] }, { p: '/por-que-linvuu', em: ['pt-BR'] }, { p: '/contato', em: ['pt-BR'] }, { p: '/ex-alunos-udemy', em: ['pt-BR'] }, { p: '/livros', em: ['pt-BR'] });
const dirLivros = path.join(raiz, 'content', 'livros');
if (fs.existsSync(dirLivros)) for (const id of fs.readdirSync(dirLivros).sort()) {
  // Apenas os capítulos de amostra: a presença de outro arquivo não o torna público.
  const caps = fs.readdirSync(path.join(dirLivros, id)).map((f) => f.match(/^cap-(\d+)\.json$/)?.[1]).filter(Boolean).map(Number).filter((n) => n === 1 || n === 2).sort((a, b) => a - b);
  if (!caps.length) continue;
  grupos.push({ p: `/livros/${id}`, em: ['pt-BR'] });
  for (const n of caps) grupos.push({ p: `/livros/${id}/capitulo/${n}`, em: ['pt-BR'] });
}
// Hub de curso, gramática e aulas grátis, derivados do modelo de indexação do servidor
// (src/lib/metaRota.ts): hub e gramática são indexáveis em cada idioma em que o curso é
// oferecido — todos excepto o do próprio público desse idioma (LOCALES.oculto) e os cursos
// 'em-breve'. As sessões grátis (dias 1 a 8 = as duas primeiras aulas de cada curso) só são
// indexáveis no idioma em que a explicação daquela aula existe: o idioma-fonte do curso ou
// uma tradução com essa aula em content/indice.<idioma>.json. É a mesma regra que decide o
// noindex em produção (temNo, em metaRota.ts), lida dos mesmos ficheiros de conteúdo — assim,
// quando uma tradução for publicada, as URLs entram no sitemap sem nova lista manual.
const EXPLICACAO = { 'pt-BR': 'pt', en: 'en', es: 'es' };
const temAula = (id, loc, aula) => fonte(id) === EXPLICACAO[loc.c] || (tr[EXPLICACAO[loc.c]]?.[id]?.aulas ?? []).includes(aula);
// Mesma regra de metaRota.ts (explicacaoCompleta / gramaticaExisteEm); scripts/testar-inventario-seo.ts confere as duas nos dois sentidos.
const completo = (id, loc) => fonte(id) === EXPLICACAO[loc.c] || ((indice[id]?.grupos ?? []).length > 0 && (indice[id].grupos).every((g) => (tr[EXPLICACAO[loc.c]]?.[id]?.aulas ?? []).includes(g.aula)));
const temGramatica = (id, loc) => fonte(id) === EXPLICACAO[loc.c] || fs.existsSync(path.join(raiz, 'content', 'gramatica', `${id}.${EXPLICACAO[loc.c]}.json`));
for (const c of cursos.filter((x) => x.status !== 'em-breve')) {
  const oferecidos = LOCALES.filter((l) => l.oculto !== c.id);
  const emHub = oferecidos.filter((l) => completo(c.id, l)).map((l) => l.c);
  const emGram = oferecidos.filter((l) => temGramatica(c.id, l)).map((l) => l.c);
  if (emHub.length) grupos.push({ p: `/curso/${c.id}`, em: emHub });
  if (emGram.length) grupos.push({ p: `/gramatica/${c.id}`, em: emGram });
  for (let d = 1; d <= 8; d++) {
    const em = oferecidos.filter((l) => temAula(c.id, l, Math.ceil(d / 4))).map((l) => l.c);
    if (em.length) grupos.push({ p: `/curso/${c.id}/dia/${d}`, em });
  }
}
const url = (c, p) => { const l = LOCALES.find((x) => x.c === c); return `${l.site}${l.p ? (p === '/' ? l.p : l.p + p) : p}`; };
// chave do manifesto de lastmod: o caminho no esquema antigo (/, /en, /es), único por idioma
const chaveLastmod = (c, p) => { const l = LOCALES.find((x) => x.c === c); return l.legado ? (p === '/' ? l.legado : l.legado + p) : p; };
const linhasBr = [], linhasGlobal = [];
// lastmod só com data verificável: content/lastmod.json é gerado a partir do histórico git
// (scripts/gerar-lastmod.mjs) com a última alteração dos ficheiros-fonte de cada página.
// URL sem data no manifesto fica sem lastmod — anunciar alterações que não aconteceram
// faz o Google ignorar o sinal.
const manifestoLastmod = (() => { const f = path.join(raiz, 'content', 'lastmod.json'); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}; })();
for (const g of grupos) for (const c of g.em) {
  const anot = g.anot ?? g.em;
  const alt = anot.length > 1 ? anot.map((x) => `\n    <xhtml:link rel="alternate" hreflang="${x}" href="${url(x, g.p)}"/>`).join('') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url(alvoPadrao(g), g.p)}"/>` : '';
  const lm = manifestoLastmod[chaveLastmod(c, g.p)];
  const data = typeof lm === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(lm) ? `\n    <lastmod>${lm}</lastmod>` : '';
  (LOCALES.find((x) => x.c === c).site === SITE_BR ? linhasBr : linhasGlobal).push(`  <url><loc>${url(c, g.p)}</loc>${data}${alt}\n  </url>`);
}
const xml = (linhas) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${linhas.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(raiz, 'public', 'sitemap.xml'), xml(linhasBr));
fs.writeFileSync(path.join(raiz, 'public', 'sitemap-global.xml'), xml(linhasGlobal));
// A página de gramática carrega suas amostras abertas desta API; o acesso pago continua protegido no servidor.
const robots = (site) => `User-agent: *\nAllow: /\nAllow: /api/gramatica/\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: ${site}/sitemap.xml\n`;
fs.writeFileSync(path.join(raiz, 'public', 'robots.txt'), robots(SITE_BR));
fs.writeFileSync(path.join(raiz, 'public', 'robots-global.txt'), robots(SITE_GLOBAL));
console.log(`sitemap .com.br: ${linhasBr.length} endereços (pt-BR) · sitemap .com: ${linhasGlobal.length} endereços (en, es)`);
