// Gera public/sitemap.xml e public/robots.txt nos dois domínios (.com.br em português, .com em inglês), com as versões alternativas (hreflang).
// O conjunto de URLs deriva do mesmo modelo de indexação do servidor (src/lib/metaRota.ts), para o sitemap não
// divergir do site servido: hub de curso só é indexável no idioma em que TODAS as aulas estão explicadas, e a
// gramática só onde o arquivo dela existe nesse idioma (sem o curso do próprio público — LOCALES.oculto — nem 'em-breve');
// as sessões de aula NÃO entram: desde 11/11/2026 a sessão é `noindex` (o curso é indexado no hub `/curso/<id>`),
// porque as 3.680 sessões dos dois domínios somaram ~25 impressões em 27 dias no Search Console e nenhuma foi indexada.
// Fora do sitemap ficam, por decisão, só as páginas que o servidor marca com noindex (entrar, cadastro, 404) e as
// que o navegador abandona (o alias `/gramatica`). Até 11/11/2026 ficavam também /privacidade, /termos e
// /excluir-conta: as três estavam indexadas e sem <loc> nenhum, então o Google as encontrava por link, sem lastmod e
// sem cluster hreflang declarado (AUDITORIA-SITE-2026-11-11 §4). /excluir-conta passou a ser indexável de propósito:
// é a página que a Google Play exige para exclusão de conta (noindex e sitemap seriam contraditórios — escolhemos sitemap).
import fs from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
// Dois domínios: português no .com.br; inglês (raiz) no .com. `legado` = prefixo antigo, só para ler content/lastmod.json.
const SITE_BR = 'https://linvuu.com.br', SITE_GLOBAL = 'https://linvuu.com';
const LOCALES = [{ c: 'pt-BR', p: '', legado: '', site: SITE_BR, l: 'pt', oculto: 'br' }, { c: 'en', p: '', legado: '/en', site: SITE_GLOBAL, l: 'en', oculto: 'en' }];
const { cursos } = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'cursos.json'), 'utf8'));
const indice = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'indice.json'), 'utf8')).cursos;
const tr = Object.fromEntries(['en'].map((l) => { const f = path.join(raiz, 'content', `indice.${l}.json`); return [l, fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}]; }));
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
// Sobre, Por que Linvuu e Contato: em todas as línguas (texto próprio em cada uma — Contato passou a existir em inglês em 09/11/2026). Livros e Ex-alunos: só em português. Cada capítulo de amostra publicado (content/livros/<idioma>/cap-NN.json) entra no sitemap.
grupos.push({ p: '/russo-online', em: ['pt-BR', 'en'], anot: ['pt-BR', 'en'] }, { p: '/sobre', em: todos(), anot: todos() }, { p: '/por-que-linvuu', em: todos(), anot: todos() }, { p: '/contato', em: todos(), anot: todos() }, { p: '/ex-alunos-udemy', em: ['pt-BR'] }, { p: '/livros', em: ['pt-BR'] });
// Materiais gratuitos (guias de alfabeto: russo, alemão, francês, italiano, espanhol), em português: só no .com.br.
// Os slugs vêm de src/lib/alfabeto/<id>.ts (slug: "alfabeto-...").
grupos.push({ p: '/materiais-gratuitos', em: ['pt-BR'] });
for (const f of fs.readdirSync(path.join(raiz, 'src', 'lib', 'alfabeto')).filter((x) => x !== 'base.ts').sort()) {
  const slug = fs.readFileSync(path.join(raiz, 'src', 'lib', 'alfabeto', f), 'utf8').match(/slug: "(alfabeto-[a-z]+)"/)?.[1];
  if (slug) grupos.push({ p: `/materiais-gratuitos/${slug}`, em: ['pt-BR'] });
}// Hub da gramática: desde 12/11/2026 é uma página de verdade (src/pages/Gramatica.tsx sem id lista as gramáticas
// do domínio), com o mesmo título no <head> e no <h1>; por isso entra no sitemap nas duas línguas.
grupos.push({ p: '/gramatica', em: todos(), anot: todos() });
// As duas páginas legais e a de exclusão de conta já são páginas reais nos dois idiomas e passaram na paridade.
grupos.push({ p: '/privacidade', em: todos(), anot: todos() }, { p: '/termos', em: todos(), anot: todos() }, { p: '/excluir-conta', em: todos(), anot: todos() });
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
const EXPLICACAO = { 'pt-BR': 'pt', en: 'en' };
// Mesma regra de metaRota.ts (explicacaoCompleta / gramaticaExisteEm); scripts/testar-inventario-seo.ts confere as duas nos dois sentidos.
const completo = (id, loc) => fonte(id) === EXPLICACAO[loc.c] || ((indice[id]?.grupos ?? []).length > 0 && (indice[id].grupos).every((g) => (tr[EXPLICACAO[loc.c]]?.[id]?.aulas ?? []).includes(g.aula)));
const temGramatica = (id, loc) => fonte(id) === EXPLICACAO[loc.c] || (fs.existsSync(path.join(raiz, 'content', 'gramatica', `${id}.${EXPLICACAO[loc.c]}.json`)) && (indice[id]?.grupos ?? []).length > 0 && (tr[EXPLICACAO[loc.c]]?.[id]?.aulas ?? []).length * 2 >= indice[id].grupos.length);
for (const c of cursos.filter((x) => x.status !== 'em-breve')) {
  const oferecidos = LOCALES.filter((l) => l.oculto !== c.id);
  const emHub = oferecidos.filter((l) => completo(c.id, l)).map((l) => l.c);
  const emGram = oferecidos.filter((l) => temGramatica(c.id, l)).map((l) => l.c);
  if (emHub.length) grupos.push({ p: `/curso/${c.id}`, em: emHub });
  if (emGram.length) grupos.push({ p: `/gramatica/${c.id}`, em: emGram });
  // Sessão 1 (decisão de 13/11/2026): indexável onde o curso inteiro está explicado na língua da página (a sessão 1 é
  // da aula 1; curso completo implica a aula 1 explicada). Mesma regra de metaRota.ts (temNo com n = 1).
  if (emHub.length) grupos.push({ p: `/curso/${c.id}/dia/1`, em: emHub });
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
console.log(`sitemap .com.br: ${linhasBr.length} endereços (pt-BR) · sitemap .com: ${linhasGlobal.length} endereços (en)`);

// llms.txt dos dois domínios, gerados aqui das MESMAS listas do sitemap (decisão de 13/11/2026, auditoria externa):
// o arquivo estático do .com dizia que espanhol e alemão «não são oferecidos» enquanto o sitemap os listava completos,
// e o do .com.br trazia o e-mail do .com. Preços lidos de src/config/planos.ts (fonte única); links em Markdown,
// que é o que a regra llms-txt do Lighthouse exige.
{
  const planos = fs.readFileSync(path.join(raiz, 'src', 'config', 'planos.ts'), 'utf8');
  const centavos = (nome) => Object.fromEntries([...planos.match(new RegExp(`export const ${nome} = \\{([^}]*)\\}`))[1].matchAll(/'?([\w-]+)'?:\s*(\d+)/g)].map(([, k, v]) => [k, Number(v)]));
  const BRL = centavos('CENTAVOS'), USD = centavos('CENTAVOS_USD');
  const fund = planos.match(/codigo: '(\w+)', precoMes: '([^']+)', validade: '([^']+)'/);
  const real = (c) => 'R$ ' + (c / 100).toFixed(2).replace('.', ',').replace(/,00$/, '');
  const dolar = (c) => 'US$' + (c / 100).toFixed(2);
  const lista = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'cursos.json'), 'utf8'));
  const nomes = Object.fromEntries((Array.isArray(lista) ? lista : lista.cursos).map((c) => [c.id, { pt: c.nome, en: c.i18n?.en?.nome ?? c.nome }]));
  const noSitemap = (loc, p) => grupos.some((g) => g.p === p && g.em.includes(loc));
  const md = (t, u) => `[${t}](${u})`;
  const cursosDe = (loc, site, en) => cursos.filter((c) => noSitemap(loc, `/curso/${c.id}`)).map((c) => {
    const n = nomes[c.id]?.[en ? 'en' : 'pt'] ?? c.id;
    const aulas = indice[c.id]?.grupos?.length;
    const gram = noSitemap(loc, `/gramatica/${c.id}`) ? ` · ${md(en ? `${n} grammar` : `Gramática de ${n.toLowerCase()}`, `${site}/gramatica/${c.id}`)}` : '';
    return `- ${md(en ? `${n} course` : `Curso de ${n.toLowerCase()}`, `${site}/curso/${c.id}`)}${aulas ? (en ? ` (${aulas} lessons, A1 to B1)` : ` (${aulas} aulas, do A1 ao B1)`) : ''}: ${md(en ? 'free first lesson' : 'primeira aula grátis', `${site}/curso/${c.id}/dia/1`)}${gram}`;
  });
  const br = `# Linvuu (Brasil)

> Cursos de idiomas e livros de gramática explicados em português, do zero ao B1, com áudio em cada frase. Escritos por Felipe Nascimento Rosa e Luiza Nascimento Rosa. As 2 primeiras aulas de cada curso são grátis, sem cartão.

## Como funciona
- Cada aula tem 4 sessões de 30 minutos: ouvir e ler, entender a regra comparada com o português, praticar com correção imediata.
- Áudio nas frases, palavras e diálogos.
- Trilha do A1 ao B1 do Quadro Europeu Comum de Referência. Não prometemos fluência nem prazo.

## Cursos explicados em português
${cursosDe('pt-BR', SITE_BR, false).join('\n')}
- ${md('Todos os cursos', `${SITE_BR}/cursos`)}
- ${md('Gramáticas', `${SITE_BR}/gramatica`)}
- ${md('Aulas de russo ao vivo, com professor', `${SITE_BR}/russo-online`)}

## Livros de gramática
- ${md('Catálogo dos livros', `${SITE_BR}/livros`)}: os capítulos 1 e 2 de cada livro são de leitura gratuita.

## Materiais gratuitos
- ${md('Guias de alfabeto e pronúncia', `${SITE_BR}/materiais-gratuitos`)}: russo, alemão, francês, italiano e espanhol, com áudio e teste rápido, sem cadastro.

## Planos e preços
- ${md('Página de planos', `${SITE_BR}/assinatura`)}
- Mensal: ${real(BRL.mensal)} por mês, renovação automática.${fund ? ` Com o código ${fund[1]} (ex-alunos da Udemy): ${fund[2]} por mês, válido até ${fund[3]}.` : ''}
- Trimestral: ${real(BRL.trimestral)} no cartão ou boleto, ou ${real(BRL['trimestral-pix'])} no Pix; pagamento único.
- Anual: ${real(BRL.anual)}; pagamento único.
- Reembolso integral em até 7 dias.

## Quem escreve
- ${md('Autores', `${SITE_BR}/sobre`)}
- ${md('Por que estudar com a Linvuu', `${SITE_BR}/por-que-linvuu`)}
- ${md('Contato', `${SITE_BR}/contato`)}: contato@linvuu.com.br

## Versão em inglês
- ${md('Cursos explicados em inglês, para quem fala inglês', SITE_GLOBAL)}
`;
  const gl = `# Linvuu (International)

> Online language courses for English speakers, from zero to B1, explained in English with audio for every sentence. Written by Felipe Nascimento Rosa and Luiza Nascimento Rosa. The first 2 lessons of every course are free, no card required.

## How it works
- Each lesson has 4 sessions of 30 minutes: listen and read, understand the rule compared with English, practise with instant correction.
- Audio for sentences, words and dialogues.
- A path from A1 to B1 of the Common European Framework of Reference. We do not promise fluency or a deadline.

## Courses explained in English
${cursosDe('en', SITE_GLOBAL, true).join('\n')}
- ${md('All courses', `${SITE_GLOBAL}/cursos`)}
- ${md('Grammar guides', `${SITE_GLOBAL}/gramatica`)}
- ${md('Live online Russian lessons with a teacher', `${SITE_GLOBAL}/russo-online`)}

## Plans and prices
- ${md('Pricing page', `${SITE_GLOBAL}/assinatura`)}
- Prices are in US dollars, paid by card.
- Monthly: ${dolar(USD.mensal)} a month, renews automatically.
- Annual: ${dolar(USD.anual)}, one-time payment for 12 months.
- Full refund within 7 days.

## About
- ${md('Authors', `${SITE_GLOBAL}/sobre`)}
- ${md('Contact', `${SITE_GLOBAL}/contato`)}: contato@linvuu.com

## Portuguese version
- ${md('Courses explained in Portuguese, for Portuguese speakers', SITE_BR)}
`;
  fs.writeFileSync(path.join(raiz, 'public', 'llms.txt'), br);
  fs.writeFileSync(path.join(raiz, 'public', 'llms-global.txt'), gl);
}
