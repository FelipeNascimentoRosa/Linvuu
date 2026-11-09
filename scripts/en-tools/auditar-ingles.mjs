// Fase 1 do PROMPT_EN.md: Etapa 1 (lacuna) e Etapa 2 (baseline métrico) do conteúdo em inglês.
// Mede o HTML que o próprio servidor entrega no perfil global (linvuu.com), não o código-fonte das páginas.
// Ferramentas isoladas em scripts/en-tools (Harper, retext-readability, @f-o-t/content-analysis).
// Uso: node scripts/auditar-ingles.mjs [--base http://127.0.0.1:4399] [--host linvuu.com] [--rotulo fase1]
import { request } from 'node:http';
import * as http from 'node:http';
import * as https from 'node:https';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Este arquivo vive em scripts/en-tools para que as ferramentas (Harper, retext, @f-o-t) resolvam
// pelo node_modules daquela pasta, sem misturar dependências com o site publicado.
const carregar = async (nome) => import(nome);

const arg = (nome, padrao) => {
  const i = process.argv.indexOf(`--${nome}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : padrao;
};
const BASE = new URL(arg('base', 'http://127.0.0.1:4399'));
const HOST = arg('host', 'linvuu.com');
const ROTULO = arg('rotulo', 'fase1');
const usarProducao = process.argv.includes('--prod') || process.argv.includes('--tudo-prod');
// --tudo-prod mede todas as páginas em produção, no navegador: é o que o leitor recebe, sem depender
// de um `dist` local que pode estar velho. O modo padrão combina o build local (texto no HTML) com
// produção (páginas montadas pelo React).
const tudoProd = process.argv.includes('--tudo-prod');

/** Páginas públicas, agrupadas por modelo. A prioridade é comercial: o que vende vem antes do que só informa. */
const PAGINAS = [
  { rota: '/', tipo: 'home', prioridade: 1 },
  { rota: '/cursos', tipo: 'vitrine de cursos', prioridade: 1 },
  { rota: '/assinatura', tipo: 'preço', prioridade: 1 },
  { rota: '/por-que-linvuu', tipo: 'argumento de venda', prioridade: 1 },
  { rota: '/portugues', tipo: 'vitrine de idioma', prioridade: 2 },
  { rota: '/russo-online', tipo: 'vitrine de idioma', prioridade: 2 },
  { rota: '/sobre', tipo: 'confiança', prioridade: 2 },
  { rota: '/contato', tipo: 'confiança', prioridade: 2 },
  { rota: '/ex-alunos-udemy', tipo: 'confiança', prioridade: 3 },
  { rota: '/livro/gramatica-ru', tipo: 'livro', prioridade: 3 },
  { rota: '/livros', tipo: 'livro', prioridade: 3 },
  { rota: '/curso/br', tipo: 'hub de curso', prioridade: 2 },
  { rota: '/curso/ru', tipo: 'hub de curso', prioridade: 2 },
  { rota: '/curso/fr', tipo: 'hub de curso', prioridade: 2 },
  { rota: '/curso/es', tipo: 'hub de curso', prioridade: 3 },
  { rota: '/curso/de', tipo: 'hub de curso', prioridade: 3 },
  { rota: '/curso/it', tipo: 'hub de curso', prioridade: 3 },
  { rota: '/curso/en', tipo: 'hub de curso', prioridade: 3 },
  { rota: '/curso/ru/dia/1', tipo: 'aula', prioridade: 2 },
  { rota: '/curso/br/dia/1', tipo: 'aula', prioridade: 2 },
  { rota: '/curso/fr/dia/1', tipo: 'aula', prioridade: 2 },
  { rota: '/curso/es/dia/1', tipo: 'aula', prioridade: 3 },
  { rota: '/curso/de/dia/1', tipo: 'aula', prioridade: 3 },
  { rota: '/curso/it/dia/1', tipo: 'aula', prioridade: 3 },
  { rota: '/curso/en/dia/1', tipo: 'aula', prioridade: 3 },
  { rota: '/gramatica', tipo: 'índice de gramática', prioridade: 3 },
  { rota: '/gramatica/ru', tipo: 'gramática', prioridade: 2 },
  { rota: '/gramatica/br', tipo: 'gramática', prioridade: 2 },
  { rota: '/gramatica/fr', tipo: 'gramática', prioridade: 2 },
  { rota: '/gramatica/es', tipo: 'gramática', prioridade: 3 },
  { rota: '/gramatica/de', tipo: 'gramática', prioridade: 3 },
  { rota: '/gramatica/it', tipo: 'gramática', prioridade: 3 },
  { rota: '/gramatica/en', tipo: 'gramática', prioridade: 3 },
  { rota: '/privacidade', tipo: 'jurídico', prioridade: 2 },
  { rota: '/termos', tipo: 'jurídico', prioridade: 2 },
  { rota: '/entrar', tipo: 'conta', prioridade: 3 },
  { rota: '/cadastro', tipo: 'conta', prioridade: 3 },
  { rota: '/excluir-conta', tipo: 'conta', prioridade: 3 },
  { rota: '/pagina-que-nao-existe', tipo: '404', prioridade: 3 },
];

function buscar(caminho) {
  const seguro = BASE.protocol === 'https:';
  const modulo = seguro ? https : http;
  return new Promise((ok, falha) => {
    const req = modulo.request(
      {
        host: BASE.hostname,
        port: BASE.port || (seguro ? 443 : 80),
        path: caminho,
        // No build local o servidor decide o idioma pelo cabeçalho Host; em produção o próprio domínio já diz.
        headers: seguro ? { 'Accept-Language': 'en' } : { Host: HOST, 'Accept-Language': 'en' },
        timeout: 30000,
      },
      (res) => {
        const partes = [];
        res.on('data', (c) => partes.push(c));
        res.on('end', () => ok({ status: res.statusCode, headers: res.headers, html: Buffer.concat(partes).toString('utf8') }));
      },
    );
    req.on('timeout', () => { req.destroy(); falha(new Error('tempo esgotado')); });
    req.on('error', falha);
    req.end();
  });
}

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', middot: '·', times: '×' };
const decodificar = (s) => s.replace(/&(#?\w+);/g, (t, c) => ENTIDADES[c] ?? t);

/**
 * Texto que o aluno lê. O <head> sai fora (título e descrição já são lidos à parte) e, quando existe,
 * só o <main> é medido: sem isso, o menu e a tabela de vocabulário entram no meio das frases e o
 * verificador acusa "frase de 67 palavras" que ninguém escreveu.
 */
function textoDe(html) {
  const semCabeca = html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, ' ');
  const principal = semCabeca.match(/<main\b[^>]*>[\s\S]*?<\/main>/i);
  const corpo = principal ? principal[0] : semCabeca.replace(/<(nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  const limpo = corpo
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|section|article|tr|td|th|blockquote|button|label|figcaption|dt|dd)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');
  return decodificar(limpo).replace(/\u00a0/g, ' ').split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
}

/**
 * O seo do @f-o-t/content-analysis analisa MARKDOWN (é assim que ele acha títulos e parágrafos).
 * Converter o HTML da página para markdown simples deixa a nota de SEO honesta: hierarquia de títulos,
 * contagem de palavras e "quick answer" passam a ser lidos do conteúdo de verdade.
 */
function markdownDe(html) {
  const semCabeca = html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, ' ');
  const principal = semCabeca.match(/<main\b[^>]*>[\s\S]*?<\/main>/i);
  const corpo = principal ? principal[0] : semCabeca.replace(/<(nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  const semRuido = corpo
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ');
  const comTitulos = semRuido.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_t, nivel, texto) => `\n\n${'#'.repeat(Number(nivel))} ${decodificar(texto.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()}\n\n`);
  const comListas = comTitulos.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_t, texto) => `\n- ${decodificar(texto.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()}`);
  const comParagrafos = comListas.replace(/<\/(p|div|section|article|blockquote|tr|button|label)>/gi, '\n\n');
  return decodificar(comParagrafos.replace(/<[^>]+>/g, ' '))
    .replace(/\u00a0/g, ' ')
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function metaDaPagina(html) {
  const um = (re) => { const m = html.match(re); return m ? decodificar(m[1]).trim() : ''; };
  const todos = (re) => [...html.matchAll(re)].map((m) => decodificar(m[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()).filter(Boolean);
  return {
    lang: um(/<html[^>]*\blang="([^"]*)"/i),
    title: um(/<title>([\s\S]*?)<\/title>/i),
    descricao: um(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i),
    robots: um(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i),
    canonical: um(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i),
    h1: todos(/<h1[^>]*>([\s\S]*?)<\/h1>/gi),
    h2: todos(/<h2[^>]*>([\s\S]*?)<\/h2>/gi),
    h3: todos(/<h3[^>]*>([\s\S]*?)<\/h3>/gi),
    h4a6: todos(/<h[4-6][^>]*>([\s\S]*?)<\/h[4-6]>/gi),
    imagens: (html.match(/<img\b/gi) ?? []).length,
    imagensSemAlt: (html.match(/<img\b(?:(?!\balt=)[^>])*>/gi) ?? []).length,
    linksInternos: (html.match(/<a\b[^>]+href="\//gi) ?? []).length,
    jsonLd: (html.match(/application\/ld\+json/gi) ?? []).length,
  };
}

/** Marcadores de português: se aparecem num texto declarado em inglês, houve vazamento de idioma.
 *  Ficam de fora "linvuu" (marca) e "com" (aparece em e-mail e domínio), que não provam idioma. */
const MARCADORES_PT = ['curso', 'cursos', 'você', 'não', 'aula', 'aulas', 'para', 'mais', 'como', 'nosso', 'nossa', 'gratuito', 'grátis', 'português', 'nós', 'também', 'todos', 'página', 'é', 'são', 'está', 'uma', 'dos', 'das', 'pelo', 'pela'];
const palavras = (t) => (t.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*/g) ?? []);

function sinalPortugues(t) {
  const todas = palavras(t).map((p) => p.toLowerCase());
  if (!todas.length) return 0;
  const achados = todas.filter((p) => MARCADORES_PT.includes(p)).length;
  return Math.round((achados / todas.length) * 1000) / 10;
}

let linterHarper = null;

async function prepararHarper() {
  const { LocalLinter } = await carregar('harper.js');
  const { binaryInlined } = await carregar('harper.js/binaryInlined');
  const l = new LocalLinter({ binary: binaryInlined });
  await l.setup();
  // Nomes próprios e termos da casa: sem isto, toda menção a marca aparece como erro de ortografia.
  await l.importWords(['Linvuu', 'Udemy', 'PostHog', 'Stripe', 'CEFR']);
  return l;
}

async function lintsHarper(texto) {
  const brutos = await linterHarper.lint(texto);
  const lista = [];
  for (const l of brutos) {
    const item = { tipo: 'Other', mensagem: '', trecho: '', sugestoes: [] };
    try { item.tipo = l.lint_kind(); } catch {}
    try { item.mensagem = l.message(); } catch {}
    try { item.trecho = l.get_problem_text(); } catch {}
    try { item.sugestoes = l.suggestions().map((s) => { const t = s.get_replacement_text(); s.free?.(); return t; }); } catch {}
    lista.push(item);
    try { l.free(); } catch {}
  }
  const porTipo = {};
  for (const x of lista) porTipo[x.tipo] = (porTipo[x.tipo] ?? 0) + 1;
  // Harper trata a vírgula serial como regra; aqui ela é escolha de guia de estilo, não erro.
  const categoria = (x) => {
    if (x.tipo === 'Spelling' || x.tipo === 'Typo') return 'ortografia';
    if (/Oxford comma/i.test(x.mensagem)) return 'estiloOxford';
    if (x.tipo === 'Readability') return 'legibilidade';
    if (x.tipo === 'Formatting') return 'formatacao';
    return 'gramaticaUso';
  };
  const categorias = { gramaticaUso: 0, ortografia: 0, estiloOxford: 0, legibilidade: 0, formatacao: 0 };
  for (const x of lista) { x.categoria = categoria(x); categorias[x.categoria] += 1; }
  const exemplos = lista.filter((x) => x.categoria === 'gramaticaUso' || x.categoria === 'ortografia').slice(0, 16);
  return { total: lista.length, categorias, porTipo, exemplos, lista };
}

const PORTAS = { proxy: 4400, app: Number(BASE.port || 4399), host: BASE.hostname };

/**
 * Algumas páginas não entregam o texto no HTML: o React monta no navegador. Para medir o que o aluno lê,
 * o Chromium abre a página por um proxy local que fala com o servidor como se fosse linvuu.com
 * (o Chromium não deixa forjar o cabeçalho Host, e o perfil de idioma do servidor depende dele).
 */
async function iniciarProxy() {
  const { createServer } = await import('node:http');
  const servidor = createServer((req, res) => {
    const paraServidor = request({ host: PORTAS.host, port: PORTAS.app, path: req.url, method: req.method, headers: { ...req.headers, host: HOST } }, (r) => {
      res.writeHead(r.statusCode ?? 502, r.headers);
      r.pipe(res);
    });
    paraServidor.on('error', () => { res.writeHead(502); res.end(); });
    req.pipe(paraServidor);
  });
  await new Promise((ok) => servidor.listen(PORTAS.proxy, '127.0.0.1', ok));
  return { base: `http://127.0.0.1:${PORTAS.proxy}`, fechar: () => new Promise((ok) => servidor.close(ok)) };
}

async function renderizar(urlCompleta, navegador) {
  const contexto = await navegador.newContext({ locale: 'en-US', viewport: { width: 1280, height: 900 } });
  const aba = await contexto.newPage();
  try {
    const resposta = await aba.goto(urlCompleta, { waitUntil: 'networkidle', timeout: 45000 });
    await aba.waitForTimeout(1200);
    const dados = await aba.evaluate(() => {
      const meta = (nome) => document.querySelector(`meta[name="${nome}"]`)?.getAttribute('content') ?? '';
      const visivel = document.body.innerText.replace(/\s+/g, ' ').trim();
      // Seção com animação de entrada pode ficar oculta e o innerText volta vazio: o textContent ainda traz o texto escrito.
      const texto = visivel.length > 120 ? visivel : document.body.textContent.replace(/\s+/g, ' ').trim();
      const titulos = (s) => [...document.querySelectorAll(s)].map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim()).filter(Boolean);
      return {
        texto,
        html: document.body.innerHTML,
        title: document.title,
        descricao: meta('description'),
        robots: meta('robots'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
        lang: document.documentElement.lang,
        h1: titulos('h1'), h2: titulos('h2'), h3: titulos('h3'), h4a6: titulos('h4,h5,h6'),
        imagens: document.querySelectorAll('img').length,
        imagensSemAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
        linksInternos: [...document.querySelectorAll('a[href^="/"]')].length,
      };
    });
    return { ...dados, status: resposta?.status() ?? 0 };
  } finally {
    await contexto.close();
  }
}

async function medir(pagina, ferramentas) {
  const { analisarLegibilidade, analisarSeo, navegador, baseProxy } = ferramentas;
  const r = tudoProd ? { status: 200, html: '' } : await buscar(pagina.rota);
  let m = metaDaPagina(r.html);
  let texto = textoDe(r.html).replace(/\n/g, ' ');
  let markdown = markdownDe(r.html);
  let origem = 'html do servidor';
  let total = palavras(texto).length;

  // Página montada no navegador: o HTML chega quase vazio. Medir o texto renderizado é a única leitura honesta.
  if (navegador && (tudoProd || (total < 150 && r.status === 200))) {
    // Em produção o perfil global vem do próprio domínio. No local, o navegador está em 127.0.0.1,
    // e o React leria o perfil brasileiro; por isso --prod existe e é o modo usado no baseline.
    const alvo = usarProducao ? `https://${HOST}${pagina.rota}` : `${baseProxy}${pagina.rota}`;
    try {
      const visto = await renderizar(alvo, navegador);
      if (visto.status) r.status = visto.status;
      if (palavras(visto.texto).length > total || tudoProd) {
        texto = visto.texto;
        total = palavras(texto).length;
        markdown = markdownDe(visto.html);
        m = { ...m, ...Object.fromEntries(Object.entries(visto).filter(([k, v]) => v !== '' && v !== undefined && k !== 'texto' && k !== 'html' && k !== 'status')) };
        origem = usarProducao ? 'produção, texto renderizado' : 'renderizado no navegador (perfil local)';
      }
    } catch (erro) {
      origem = `html do servidor (falha ao renderizar: ${erro.message})`;
    }
  }

  const base = { rota: pagina.rota, tipo: pagina.tipo, prioridade: pagina.prioridade, status: r.status, url: `https://${HOST}${pagina.rota}`, ...m, palavras: total, origem, sinalPortugues: sinalPortugues(texto) };

  if (r.status !== 200 || total < 40) {
    return { ...base, medida: false, motivo: r.status !== 200 ? `status ${r.status}` : 'pouco texto mesmo depois de renderizar' };
  }

  const harper = await lintsHarper(texto);
  const legibilidade = analisarLegibilidade(texto);
  // O analisador espera o H1 fora do conteúdo (o título vem em `title`): manter o H1 no corpo
  // produziria um "erro de hierarquia" que nenhum leitor vê.
  const markdownSemH1 = markdown.replace(/^# .*$/gm, '');
  const seo = analisarSeo({ content: markdownSemH1, title: m.title, metaDescription: m.descricao });

  let retextDificil = null;
  try {
    const arvore = ferramentas.retext().use(ferramentas.retextEnglish).use(ferramentas.retextReadability, { age: 18 });
    const arquivo = await arvore.process(texto);
    const mensagens = arquivo.messages.filter((x) => x.ruleId === 'readability' || x.source === 'retext-readability');
    retextDificil = { frasesDificeis: mensagens.length, exemplos: mensagens.slice(0, 5).map((x) => x.reason ?? x.message) };
  } catch (erro) {
    retextDificil = { erro: erro.message };
  }

  return {
    ...base,
    medida: true,
    harper: {
      lints: harper.total,
      categorias: harper.categorias,
      por100: Math.round((harper.total / total) * 1000) / 10,
      gramaticaUsoPor100: Math.round((harper.categorias.gramaticaUso / total) * 1000) / 10,
      porTipo: harper.porTipo,
      exemplos: harper.exemplos,
    },
    legibilidade: {
      // Lista de títulos de aula não é prosa: Flesch em frase sem ponto não significa nada.
      aplicavel: (legibilidade.metrics.sentenceCount ?? 0) >= 5 && (legibilidade.metrics.avgWordsPerSentence ?? 0) <= 45,
      frases: legibilidade.metrics.sentenceCount,
      fleschReadingEase: legibilidade.fleschKincaidReadingEase,
      nota: legibilidade.fleschKincaidGradeLevel,
      nivel: legibilidade.readabilityLevel,
      alvo: legibilidade.targetScore,
      dentroDoAlvo: legibilidade.isOnTarget,
      palavrasPorFrase: legibilidade.metrics.avgWordsPerSentence,
      silabasPorPalavra: legibilidade.metrics.avgSyllablesPerWord,
      palavrasComplexasPct: legibilidade.metrics.complexWordPercentage,
    },
    seo: { score: seo.score, problemas: seo.issues, metricas: seo.metrics },
    retext: retextDificil,
    texto,
  };
}

const fmt = (n, casas = 1) => (typeof n === 'number' ? n.toFixed(casas).replace('.', ',') : '—');

function tabelaMarkdown(resultados) {
  const linhas = [
    '| Página | Tipo | Origem | Palavras | Harper (todas) | gramática/uso | ortografia | vírgula serial | /100 gramática+uso | Flesch | Sinal PT % | SEO | Título | Descrição | H1 |',
    '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|',
  ];
  for (const x of resultados) {
    if (!x.medida) {
      linhas.push(`| \`${x.rota}\` | ${x.tipo} | ${x.origem ?? '—'} | ${x.palavras ?? 0} | — | — | — | — | — | — | ${fmt(x.sinalPortugues ?? 0)} | — | ${x.title?.length ?? 0} | ${x.descricao?.length ?? 0} | ${x.h1?.length ?? 0} |`);
      continue;
    }
    const c = x.harper.categorias;
    const flesch = x.legibilidade.aplicavel ? fmt(x.legibilidade.fleschReadingEase) : 'n/a';
    linhas.push(`| \`${x.rota}\` | ${x.tipo} | ${x.origem} | ${x.palavras} | ${x.harper.lints} | ${c.gramaticaUso} | ${c.ortografia} | ${c.estiloOxford} | ${fmt(x.harper.gramaticaUsoPor100)} | ${flesch} | ${fmt(x.sinalPortugues)} | ${x.seo.score} | ${x.title.length} | ${x.descricao.length} | ${x.h1.length} |`);
  }
  return linhas.join('\n');
}

linterHarper = await prepararHarper();
const fof = await carregar('@f-o-t/content-analysis');
const usarNavegador = !process.argv.includes('--sem-navegador');
let navegador = null;
let proxy = null;
if (usarNavegador) {
  const { createRequire } = await import('node:module');
  // Playwright é dependência da raiz (testes de navegador), não desta pasta de ferramentas.
  const reqRaiz = createRequire(resolve('package.json'));
  const { chromium } = reqRaiz('playwright');
  navegador = await chromium.launch({ args: ['--no-sandbox'] });
  proxy = await iniciarProxy();
}
const ferramentas = {
  retext: (await carregar('retext')).retext,
  retextEnglish: (await carregar('retext-english')).default,
  retextReadability: (await carregar('retext-readability')).default,
  analisarLegibilidade: fof.analyzeReadability,
  analisarSeo: fof.analyzeSeo,
  navegador,
  baseProxy: proxy?.base ?? '',
};

const resultados = [];
for (const pagina of PAGINAS) {
  try {
    const x = await medir(pagina, ferramentas);
    resultados.push(x);
    const marca = x.medida
      ? `${x.palavras}p lints=${x.harper.lints} (${fmt(x.harper.por100)}/100) flesch=${fmt(x.legibilidade.fleschReadingEase)} seo=${x.seo.score} pt=${fmt(x.sinalPortugues)}%`
      : `sem medição (${x.motivo})`;
    console.log(`${x.status} ${x.rota} — ${marca}`);
  } catch (erro) {
    resultados.push({ rota: pagina.rota, tipo: pagina.tipo, prioridade: pagina.prioridade, erro: erro.message });
    console.log(`ERRO ${pagina.rota} — ${erro.message}`);
  }
}

const pasta = resolve('.en-baseline', ROTULO);
mkdirSync(resolve(pasta, 'textos'), { recursive: true });
writeFileSync(resolve(pasta, 'resumo.json'), JSON.stringify({ geradoEm: new Date().toISOString(), base: BASE.href, host: HOST, resultados }, null, 2));
writeFileSync(resolve(pasta, 'resumo.md'), `# Baseline do inglês — ${ROTULO}\n\nGerado em ${new Date().toISOString()} a partir de \`${BASE.href}\` com Host \`${HOST}\`.\n\n${tabelaMarkdown(resultados)}\n`);
for (const x of resultados) {
  if (!x.medida) continue;
  const nome = x.rota === '/' ? 'home' : x.rota.replace(/^\//, '').replace(/\//g, '-');
  writeFileSync(resolve(pasta, 'textos', `${nome}.txt`), `URL: ${x.url}\nTÍTULO: ${x.title}\nDESCRIÇÃO: ${x.descricao}\n\n${x.texto}\n`);
}
console.log(`resumo: ${resolve(pasta, 'resumo.md')}`);
if (navegador) await navegador.close();
if (proxy) await proxy.fechar();
