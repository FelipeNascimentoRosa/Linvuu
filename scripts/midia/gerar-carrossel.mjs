#!/usr/bin/env node
// Gera um carrossel 1080×1350 (Instagram/LinkedIn, 4:5) a partir de um tópico REAL da gramática da Linvuu.
// Nada é inventado: cada slide sai de um campo de content/gramatica/<idioma>(.en).json. Campo ausente = slide ausente;
// menos de 5 slides com conteúdo = o script recusa (nenhum carrossel raso sai daqui).
//
// Uso:
//   node scripts/midia/gerar-carrossel.mjs --idioma ru --topico a7-s3-1 --dominio br [--saida output/midia]
//   node scripts/midia/gerar-carrossel.mjs --idioma ru --listar [--dominio com]   (tópicos que rendem carrossel)
//
// Saída em <saida>/<dominio>-<idioma>-<topico>/: slide-1.png … slide-N.png, legenda.txt e especificacao.json
// (o mesmo formato da skill carrossel-do-livro, para aprovação do Felipe antes de postar).
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(import.meta.url);
const L = 1080, A = 1350, MIN_SLIDES = 5;

// ---------- argumentos ----------
const args = process.argv.slice(2);
const arg = (n, padrao) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : padrao; };
const idioma = arg('idioma');
const dominio = arg('dominio', 'br');
const topicoId = arg('topico');
const saidaBase = arg('saida', join(RAIZ, 'output', 'midia'));
if (!idioma || !/^[a-z]{2}$/.test(idioma)) falhar('informe --idioma (ex.: ru, de, fr, es, it, en, br)');
if (!['br', 'com'].includes(dominio)) falhar('--dominio deve ser br (linvuu.com.br, português) ou com (linvuu.com, inglês)');
if (!args.includes('--listar') && !topicoId) falhar('informe --topico <id> ou use --listar');

// ---------- marca: cores lidas de src/tokens.css (fonte única; nenhum hex inventado aqui) ----------
const tokens = readFileSync(join(RAIZ, 'src', 'tokens.css'), 'utf8');
const cor = (nome) => {
  const m = tokens.match(new RegExp(`--${nome}:\\s*(#[0-9A-Fa-f]{3,8})`));
  if (!m) falhar(`token --${nome} não encontrado em src/tokens.css`);
  return m[1];
};
const C = { verde: cor('verde-floresta'), verdeEsc: cor('verde-900'), papel: cor('papel'), papelEsc: cor('papel-escuro'), borda: cor('papel-borda'),
  grafite: cor('grafite'), grafite65: cor('grafite-65'), ocre: cor('ocre'), ocreClaro: cor('ocre-claro'), verde100: cor('verde-100') };

// ---------- textos fixos por domínio (copy permitida pelo CLAUDE.md, ARMADILHA 5) ----------
const T = dominio === 'br'
  ? { site: 'linvuu.com.br', lingua: 'pt', regra: 'A regra', tabela: 'Na tabela', exemplos: 'Em frases reais', erro: 'Erro comum', errado: 'Evite', certo: 'Diga', comparacao: 'Comparando com o português',
      cta1: 'Duas primeiras aulas grátis, sem cartão.', cta2: 'Áudio em cada frase. Cursos feitos por professores.', aula: (n, t) => `Aula ${n} · ${t}`, guarde: 'Salve para revisar amanhã.' }
  : { site: 'linvuu.com', lingua: 'en', regra: 'The rule', tabela: 'In a table', exemplos: 'In real sentences', erro: 'Common mistake', errado: 'Avoid', certo: 'Say', comparacao: 'Compared with English',
      cta1: 'The first two lessons are free. No card needed.', cta2: 'Audio for every sentence. Courses made by teachers.', aula: (n, t) => `Lesson ${n} · ${t}`, guarde: 'Save it and review tomorrow.' };

// ---------- conteúdo ----------
const arquivo = join(RAIZ, 'content', 'gramatica', `${idioma}${dominio === 'com' ? '.en' : ''}.json`);
if (!existsSync(arquivo)) falhar(`não há gramática explicada ${dominio === 'com' ? 'em inglês' : 'em português'} para "${idioma}" (${arquivo})`);
const gram = JSON.parse(readFileSync(arquivo, 'utf8'));
if (dominio === 'com' && gram.semTraducao) falhar(`${arquivo} ainda tem ${gram.semTraducao} trechos sem tradução: não sai carrossel do .com com português dentro`);

/** Primeiras frases inteiras até `max` caracteres. Nunca corta no meio de uma frase. */
function frases(texto, max) {
  // «→» não existe nas fontes da marca; «›» existe e diz o mesmo
  const limpo = String(texto ?? '').replace(/\s+/g, ' ').replace(/→/g, '›').trim();
  if (limpo.length <= max) return limpo;
  const partes = limpo.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = '';
  for (const p of partes) { if ((out + p).length > max) break; out += p; }
  return out.trim();
}
/** PASSO 1/STEP 1 vira lista; sem passos, a explicação vira um parágrafo. */
function passos(texto) {
  const t = String(texto ?? '');
  const ps = t.split(/\b(?:PASSO|STEP)\s*\d+:\s*/).map(s => s.trim()).filter(Boolean);
  return ps.length > 1 ? ps : null;
}
const traducaoDe = (ex) => ex[T.lingua] ?? ex.pt ?? ex.en ?? Object.entries(ex).find(([k]) => k !== idioma)?.[1];
const alvo = (ex) => ex[idioma] ?? Object.values(ex)[0];

// Rótulos de coluna: os mesmos do site. .com → content/colunas.json (en); .com.br → ROTULO_COLUNA de src/components/Sessao.tsx.
const ROTULOS = (() => {
  if (dominio === 'com') return JSON.parse(readFileSync(join(RAIZ, 'content', 'colunas.json'), 'utf8')).en;
  const fonteTsx = readFileSync(join(RAIZ, 'src', 'components', 'Sessao.tsx'), 'utf8');
  const m = fonteTsx.match(/const ROTULO_COLUNA: Record<string, string> = (\{[\s\S]*?\});/);
  if (!m) falhar('ROTULO_COLUNA não encontrado em src/components/Sessao.tsx');
  return Function(`"use strict"; return (${m[1]});`)();
})();
const rotulo = (c) => ROTULOS[c] ?? ROTULOS[c.toLowerCase()];

function primeiraTabela(t) {
  const tab = Array.isArray(t.tabela) && t.tabela.length ? t.tabela
    : Array.isArray(t.tabelas) && t.tabelas.length ? (t.tabelas[0].linhas ?? t.tabelas[0].tabela ?? t.tabelas[0]) : null;
  if (!Array.isArray(tab) || !tab.length || typeof tab[0] !== 'object') return null;
  const chaves = Object.keys(tab[0]).slice(0, 3);
  // chave já legível (ex.: «LETTER», «SOUND (ENGLISH)») vale como está; chave interna sem rótulo no idioma do domínio = tabela fora (nunca misturar línguas)
  const colunas = chaves.map(c => rotulo(c) ?? (/[A-Z ]/.test(c) && dominio === 'com' ? c.charAt(0) + c.slice(1).toLowerCase() : null));
  if (colunas.some(c => !c)) return null;
  const linhas = tab.slice(0, 7).map(l => chaves.map(c => String(l[c] ?? '')));
  // tabela larga demais não cabe legível em 1080 px: fica de fora, não é espremida
  if (linhas.some(l => l.join('').length > 70)) return null;
  return { colunas, linhas, titulo: t.tabelas?.[0]?.titulo };
}

/** Monta a especificação (o que cada slide diz e de qual campo veio). */
function especificar(t) {
  const slides = [];
  const erro = Array.isArray(t.erros) ? t.erros.find(e => e.errado && e.certo) : null;
  slides.push({ tipo: 'gancho', campo: 'titulo', titulo: t.titulo, apoio: T.aula(t.aula, t.aulaTitulo) });
  const ps = passos(t.explicacao);
  const regra = ps ? ps.slice(0, 3).map(p => frases(p, 170)).filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1)) : null;
  const corpoRegra = regra && regra.join(' ').length <= 520 ? regra : null;
  slides.push(corpoRegra ? { tipo: 'regra', campo: 'explicacao', lista: corpoRegra } : { tipo: 'regra', campo: 'explicacao', texto: frases(t.explicacao, 480) });
  const tab = primeiraTabela(t);
  if (tab) slides.push({ tipo: 'tabela', campo: t.tabela ? 'tabela' : 'tabelas[0]', ...tab });
  const exs = (t.exemplos ?? []).filter(e => alvo(e) && traducaoDe(e)).slice(0, 4);
  if (exs.length >= 2) slides.push({ tipo: 'exemplos', campo: 'exemplos', exemplos: exs.map(e => ({ alvo: alvo(e), traducao: traducaoDe(e) })) });
  if (erro) slides.push({ tipo: 'erro-comum', campo: 'erros[0]', errado: erro.errado, certo: erro.certo, motivo: frases(erro.motivo, 260) });
  if (t.comparacao) slides.push({ tipo: 'comparacao', campo: 'comparacao', texto: frases(t.comparacao, 360) });
  slides.push({ tipo: 'cta', campo: null, url: `${T.site}/gramatica/${idioma}` });
  return slides;
}
const rende = (t) => especificar(t).length >= MIN_SLIDES;

if (args.includes('--listar')) {
  const ok = gram.topicos.filter(rende);
  for (const t of ok) console.log(`${t.id}\t${especificar(t).length} slides\t${t.categoria} · ${t.titulo}`);
  console.log(`\n${ok.length} de ${gram.topicos.length} tópicos de ${idioma} (${T.site}) rendem carrossel de ${MIN_SLIDES}+ slides.`);
  process.exit(0);
}

const topico = gram.topicos.find(t => t.id === topicoId);
if (!topico) falhar(`tópico "${topicoId}" não existe em ${arquivo}`);
const spec = especificar(topico);
if (spec.length < MIN_SLIDES) falhar(`"${topicoId}" só rende ${spec.length} slides com conteúdo real (mínimo ${MIN_SLIDES}). Escolha outro com --listar.`);

// ---------- fontes da marca (.woff estáticos; o satori não lê woff2) ----------
const fonte = (pacote, arq) => readFileSync(require.resolve(`${pacote}/files/${arq}`));
const fontes = [];
for (const sub of ['latin', 'latin-ext', 'cyrillic']) {
  for (const [peso, nome] of [[400, 'Source Sans 3'], [600, 'Source Sans 3'], [700, 'Source Sans 3']])
    try { fontes.push({ name: `${nome} ${sub}`, weight: peso, style: 'normal', data: fonte('@fontsource/source-sans-3', `source-sans-3-${sub}-${peso}-normal.woff`) }); } catch {}
  for (const peso of [400, 700])
    try { fontes.push({ name: `Literata ${sub}`, weight: peso, style: 'normal', data: fonte('@fontsource/literata', `literata-${sub}-${peso}-normal.woff`) }); } catch {}
}

// ---------- componentes (objetos que o satori entende; sem JSX para não exigir build) ----------
const h = (type, style, ...children) => ({ type, props: { style: { display: 'flex', ...style }, children: children.flat().filter(c => c !== null && c !== undefined && c !== false) } });
// maxWidth + flexWrap: sem isso o satori deixa a linha longa vazar pela borda em vez de quebrar
const txt = (style, s) => ({ type: 'div', props: { style: { display: 'flex', flexWrap: 'wrap', maxWidth: '100%', ...style }, children: String(s) } });
// cada subconjunto (latino, latino estendido, cirílico) é uma família própria: o satori só troca de fonte entre famílias da lista
const SERIF = 'Literata latin, Literata latin-ext, Literata cyrillic', SANS = 'Source Sans 3 latin, Source Sans 3 latin-ext, Source Sans 3 cyrillic';

function moldura(conteudo, n, total, { escuro = false } = {}) {
  const fg = escuro ? C.papel : C.grafite, sub = escuro ? C.verde100 : C.grafite65;
  // boxSizing: sem ele o satori soma o padding à altura (1350 + 168 = 1518) e o rodapé sai da imagem (medido em 18/11/2026)
  return h('div', { width: L, height: A, boxSizing: 'border-box', flexDirection: 'column', justifyContent: 'space-between', background: escuro ? C.verde : C.papel, paddingTop: 96, paddingRight: 88, paddingBottom: 72, paddingLeft: 88, fontFamily: SANS, color: fg },
    // altura fixa, sem flexGrow: nesta versão do satori um filho com flexGrow faz o rodapé sumir (medido em 18/11/2026)
    h('div', { flexDirection: 'column', width: L - 176, height: A - 96 - 72 - 100, justifyContent: escuro ? 'center' : 'flex-start' }, conteudo),
    h('div', { justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 2, borderTopStyle: 'solid', borderTopColor: escuro ? C.verde100 : C.borda, paddingTop: 28, width: L - 176, flexShrink: 0, fontSize: 30, color: sub },
      txt({ fontWeight: 700, color: fg }, 'Linvuu'), txt({}, `${n}/${total}`)));
}
const titulo = (s, escuro) => txt({ fontFamily: SERIF, fontWeight: 700, fontSize: 64, lineHeight: 1.15, color: escuro ? C.papel : C.verde, marginBottom: 48 }, s);

function slide(s, n, total) {
  switch (s.tipo) {
    case 'gancho':
      return moldura([
        txt({ fontSize: 34, color: C.ocreClaro, marginBottom: 32 }, s.apoio),
        txt({ fontFamily: SERIF, fontWeight: 700, fontSize: s.titulo.length > 48 ? 84 : 100, lineHeight: 1.08, color: C.papel }, s.titulo),
        txt({ fontSize: 32, color: C.verde100, marginTop: 64 }, T.guarde),
      ], n, total, { escuro: true });
    case 'regra':
      return moldura([titulo(T.regra),
        s.lista
          ? h('div', { flexDirection: 'column' }, s.lista.map((p, i) => h('div', { marginBottom: 34, alignItems: 'flex-start' },
              txt({ width: 56, flexShrink: 0, fontFamily: SERIF, fontWeight: 700, fontSize: 40, color: C.ocre }, `${i + 1}.`),
              txt({ fontSize: 38, lineHeight: 1.42, flex: 1 }, p))))
          : txt({ fontSize: 40, lineHeight: 1.45 }, s.texto)], n, total);
    case 'tabela': {
      const cel = (v, i, cab) => txt({ flex: 1, padding: '20px 22px', fontSize: cab ? 28 : 36, fontWeight: cab ? 600 : i === 0 ? 400 : 600,
        color: cab ? C.grafite65 : i === 1 ? C.verde : C.grafite, lineHeight: 1.25 }, v);
      return moldura([titulo(s.titulo || T.tabela),
        h('div', { flexDirection: 'column', border: `2px solid ${C.borda}`, borderRadius: 12, background: '#FFFFFF00' },
          h('div', { background: C.papelEsc, borderTopLeftRadius: 10, borderTopRightRadius: 10 }, s.colunas.map((c, i) => cel(c, i, true))),
          s.linhas.map((l, j) => h('div', { borderTop: `2px solid ${C.borda}` }, l.map((v, i) => cel(v, i, false)))))], n, total);
    }
    case 'exemplos':
      return moldura([titulo(T.exemplos),
        h('div', { flexDirection: 'column' }, s.exemplos.map(e => h('div', { flexDirection: 'column', marginBottom: 40, paddingLeft: 28, borderLeft: `6px solid ${C.ocre}` },
          txt({ fontFamily: SERIF, fontSize: 46, fontWeight: 700, color: C.verde, lineHeight: 1.2 }, e.alvo),
          txt({ fontSize: 34, color: C.grafite65, marginTop: 8, lineHeight: 1.3 }, e.traducao))))], n, total);
    case 'erro-comum':
      return moldura([titulo(T.erro),
        h('div', { flexDirection: 'column', marginBottom: 28 }, txt({ fontSize: 30, fontWeight: 600, color: C.grafite65, marginBottom: 8 }, T.errado),
          txt({ fontFamily: SERIF, fontSize: 50, color: C.grafite65, textDecoration: 'line-through', lineHeight: 1.2 }, s.errado)),
        h('div', { flexDirection: 'column', marginBottom: 44 }, txt({ fontSize: 30, fontWeight: 600, color: C.verde, marginBottom: 8 }, T.certo),
          txt({ fontFamily: SERIF, fontSize: 56, fontWeight: 700, color: C.verde, lineHeight: 1.2 }, s.certo)),
        s.motivo ? txt({ fontSize: 36, lineHeight: 1.42 }, s.motivo) : null], n, total);
    case 'comparacao':
      return moldura([titulo(T.comparacao), txt({ fontSize: 42, lineHeight: 1.45 }, s.texto.charAt(0).toUpperCase() + s.texto.slice(1))], n, total);
    case 'cta':
      return moldura([
        txt({ fontFamily: SERIF, fontWeight: 700, fontSize: 76, lineHeight: 1.12, color: C.papel, marginBottom: 40 }, T.cta1),
        txt({ fontSize: 38, lineHeight: 1.4, color: C.verde100, marginBottom: 56 }, T.cta2),
        txt({ alignSelf: 'flex-start', background: C.papel, color: C.verde, fontWeight: 700, fontSize: 40, padding: '22px 36px', borderRadius: 10 }, s.url),
      ], n, total, { escuro: true });
  }
  throw new Error(`tipo de slide desconhecido: ${s.tipo}`);
}

// ---------- render ----------
const pasta = join(saidaBase, `${dominio}-${idioma}-${topico.id}`);
mkdirSync(pasta, { recursive: true });
const arquivos = [];
for (let i = 0; i < spec.length; i++) {
  const svg = await satori(slide(spec[i], i + 1, spec.length), { width: L, height: A, fonts: fontes });
  if (process.env.MIDIA_SVG) writeFileSync(join(pasta, `slide-${i + 1}.svg`), svg);
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: L } }).render().asPng();
  const nome = `slide-${i + 1}.png`;
  writeFileSync(join(pasta, nome), png);
  arquivos.push({ nome, bytes: png.length });
}
const fonteRel = arquivo.slice(RAIZ.length + 1);
writeFileSync(join(pasta, 'especificacao.json'), JSON.stringify({ fonte: fonteRel, topico: topico.id, idioma: dominio === 'br' ? 'pt-BR' : 'en', dominio: T.site, slides: spec.map((s, i) => ({ n: i + 1, ...s })) }, null, 2));
writeFileSync(join(pasta, 'legenda.txt'), `${topico.titulo}\n\n${frases(topico.explicacao.replace(/\b(?:PASSO|STEP)\s*\d+:\s*/g, ''), 300)}\n\n${T.cta1}\n${T.site}/gramatica/${idioma}\n`);
console.log(`carrossel: ${spec.length} slides ${L}×${A} de ${fonteRel} → ${topico.id} (${spec.map(s => s.tipo).join(', ')})`);
for (const a of arquivos) console.log(`  ${join(pasta, a.nome).slice(RAIZ.length + 1)}  ${(a.bytes / 1024).toFixed(0)} KB`);

function falhar(msg) { console.error(`gerar-carrossel: ${msg}`); process.exit(1); }
