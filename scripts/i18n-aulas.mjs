// Explicação das aulas em outros idiomas (inglês e espanhol), sem tocar no idioma estudado nem nos áudios.
//
// Cada curso foi escrito numa língua de explicação (português; o curso `br` foi escrito em inglês). A tradução de uma aula é um
// mapa «texto original → texto traduzido», em content/idiomas/<id>/i18n/<en|es>/aula-NNN.json. Só os campos de explicação passam
// pelo mapa (títulos, explicações, traduções, instruções, motivos de erro, pronúncia aproximada…). O texto do idioma estudado
// (`ru`, `audio`, exemplos de letra) nunca muda. `titulos.json` traduz os títulos de todas as aulas e sessões, para a trilha.
//
// Uso:
//   node scripts/i18n-aulas.mjs extrair <id> <en|es> <aula> [pasta]   lista os textos ainda sem tradução (gera <pasta>/<id>-<l>-NNN.src.json)
//   node scripts/i18n-aulas.mjs juntar <id> <en|es> <aula> [pasta]    junta <id>-<l>-NNN.tr.json (mesma ordem; null = manter) ao mapa
//   node scripts/i18n-aulas.mjs titulos <id> <en|es> [pasta]          o mesmo para os títulos de todas as aulas e sessões
//   node scripts/i18n-aulas.mjs estado                                quantas aulas cada curso tem traduzidas
import fs from 'node:fs';
import path from 'node:path';

export const raiz = path.resolve(import.meta.dirname, '..');
export const LINGUAS = ['en', 'es'];
/** Língua em que cada curso foi escrito. */
export const fonteDe = (id) => (id === 'br' ? 'en' : 'pt');
const pad = (n) => String(n).padStart(3, '0');
const dirI18n = (id, l) => path.join(raiz, 'content', 'idiomas', id, 'i18n', l);
const lerJson = (f, padrao) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : padrao);
const escrever = (f, o) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 1) + '\n'); };

// Tipos de campo: «explicacao» (sempre na língua da explicação), «misto» (opções, erros, células de tabela: podem ser do idioma
// estudado e só mudam se houver tradução), «pronuncia» (pronúncia aproximada, feita para quem fala a língua da explicação) e «personagem».
/** Percorre a aula e chama f(texto, tipoDoCampo, definir) para cada texto que pode ser traduzido. */
export function percorrer(aula, f) {
  const campo = (obj, k, tipo) => { if (typeof obj[k] === 'string' && obj[k].trim()) f(obj[k], tipo, (v) => { obj[k] = v; }, k); };
  for (const k of ['titulo', 'objetivo', 'notasParaOAluno']) campo(aula, k, 'explicacao');
  for (const s of aula.sessoes) {
    campo(s, 'titulo', 'explicacao');
    for (const b of s.blocos) {
      if (b.tipo === 'intro') campo(b, 'texto', 'explicacao');
      for (const k of ['titulo', 'enunciado', 'explicacao', 'comparacao', 'contexto', 'tag']) campo(b, k, 'explicacao');
      if (b.tipo === 'producao') campo(b, 'exemplo', 'misto');
      if (b.tipo === 'texto') { campo(b, 'pt', 'explicacao'); b.perguntas?.forEach((p) => { campo(p, 'pergunta', 'misto'); campo(p, 'resposta', 'misto'); }); }
      if (b.tipo === 'alfabeto') b.grupos.forEach((g) => { campo(g, 'nome', 'explicacao'); g.letras.forEach((l) => { campo(l, 'som', 'explicacao'); campo(l, 'exemploPt', 'explicacao'); }); });
      if (b.tipo === 'palavras' || b.tipo === 'vocabulario') b.itens.forEach((i) => { campo(i, 'pt', 'explicacao'); campo(i, 'translit', 'pronuncia'); });
      if (b.tipo === 'dialogo') b.linhas.forEach((l) => { campo(l, 'pt', 'explicacao'); f(l.personagem, 'personagem', (v) => { l.rotulo = v; }, 'personagem'); });
      if (b.tipo === 'gramatica') {
        b.exemplos?.forEach((e) => campo(e, 'pt', 'explicacao'));
        b.erros?.forEach((e) => { campo(e, 'errado', 'misto'); campo(e, 'certo', 'misto'); campo(e, 'motivo', 'explicacao'); });
        const tabelas = [...(b.tabela ? [{ linhas: b.tabela }] : []), ...(b.tabelas ?? [])];
        tabelas.forEach((t) => { campo(t, 'titulo', 'explicacao'); t.linhas.forEach((linha) => Object.keys(linha).forEach((k) => campo(linha, k, 'misto'))); });
      }
      if (b.tipo === 'exercicios') b.itens.forEach((e) => {
        campo(e, 'enunciado', 'explicacao'); campo(e, 'explicacao', 'explicacao');
        if (e.tipo !== 'sentence-ordering') { e.opcoes?.forEach((_, i) => campo(e.opcoes, i, 'misto')); campo(e, 'gabarito', 'misto'); }
        if (e.tipo === 'producao') campo(e, 'respostaEsperada', 'misto');
      });
    }
  }
}

/** Textos traduzíveis de uma aula, sem repetição, na ordem em que aparecem. */
export function textosDaAula(aula) {
  const vistos = new Map();
  percorrer(JSON.parse(JSON.stringify(aula)), (t, tipo) => { if (!vistos.has(t)) vistos.set(t, tipo); });
  return [...vistos].map(([t, tipo]) => ({ t, tipo }));
}

/** Mapa completo de uma aula num idioma: títulos gerais + mapa da aula. */
export function mapaDa(id, l, n) {
  return { ...lerJson(path.join(dirI18n(id, l), 'titulos.json'), {}), ...lerJson(path.join(dirI18n(id, l), `aula-${pad(n)}.json`), {}) };
}
export const aulaTemTraducao = (id, l, n) => fs.existsSync(path.join(dirI18n(id, l), `aula-${pad(n)}.json`));
export const titulosDe = (id, l) => lerJson(path.join(dirI18n(id, l), 'titulos.json'), {});

/** A aula com a explicação no idioma `l`. Devolve também os textos de explicação que ficaram sem tradução. */
export function traduzirAula(aula, id, l) {
  const mapa = mapaDa(id, l, aula.aula);
  const copia = JSON.parse(JSON.stringify(aula));
  const faltam = [];
  percorrer(copia, (t, tipo, definir) => {
    const v = mapa[t];
    if (typeof v === 'string' && v.length) { definir(v); return; }
    if (tipo === 'explicacao') faltam.push(t);
  });
  // Overrides por exercício permitem adaptar enunciados idênticos a contextos distintos.
  for (const sessao of copia.sessoes) for (const bloco of sessao.blocos) {
    if (bloco.tipo !== 'exercicios') continue;
    for (const item of bloco.itens) {
      const raw = mapa[`@exercicio:${item.id}`];
      if (!raw) continue;
      const override = JSON.parse(raw);
      for (const campo of ['enunciado', 'explicacao', 'opcoes', 'gabarito']) {
        if (Object.hasOwn(override, campo)) item[campo] = override[campo];
      }
    }
  }
  // Palavras: o inglês já existe no dado (`en`) nos cursos de russo e alemão.
  if (l === 'en') for (const s of copia.sessoes) for (const b of s.blocos) if (b.tipo === 'palavras' || b.tipo === 'vocabulario') b.itens.forEach((i, k) => {
    const original = aula.sessoes[copia.sessoes.indexOf(s)].blocos[s.blocos.indexOf(b)].itens[k].pt;
    if (i.en && i.pt === original && !mapa[original]) { i.pt = i.en; const j = faltam.indexOf(original); if (j >= 0) faltam.splice(j, 1); }
  });
  return { aula: copia, faltam: [...new Set(faltam)] };
}

const aulasDo = (id) => {
  const dir = path.join(raiz, 'content', 'idiomas', id, 'aulas');
  return fs.readdirSync(dir).filter((f) => /^aula-\d+\.json$/.test(f)).sort().map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, id, l, a3, a4] = process.argv.slice(2);
  if (cmd === 'estado') {
    for (const c of fs.readdirSync(path.join(raiz, 'content', 'idiomas'))) for (const ll of LINGUAS) {
      if (fonteDe(c) === ll) continue;
      const total = aulasDo(c).length;
      const feitas = fs.existsSync(dirI18n(c, ll)) ? fs.readdirSync(dirI18n(c, ll)).filter((f) => /^aula-\d+\.json$/.test(f)).length : 0;
      const tit = Object.keys(titulosDe(c, ll)).length;
      console.log(`${c} → ${ll}: ${feitas}/${total} aulas, ${tit} títulos`);
    }
    process.exit(0);
  }
  if (!id || !LINGUAS.includes(l)) { console.error('uso: extrair|juntar <id> <en|es> <aula> [pasta] · titulos <id> <en|es> [pasta] · estado'); process.exit(1); }
  if (cmd === 'titulos') {
    const pasta = a3 ?? '.';
    const fonte = path.join(pasta, `${id}-${l}-titulos.src.json`), trad = path.join(pasta, `${id}-${l}-titulos.tr.json`);
    if (fs.existsSync(trad)) {
      const src = lerJson(fonte, []), tr = lerJson(trad, []);
      if (src.length !== tr.length) { console.error(`tamanhos diferentes: ${src.length} × ${tr.length}`); process.exit(1); }
      const mapa = titulosDe(id, l);
      src.forEach((t, i) => { if (tr[i]) mapa[t] = tr[i]; });
      escrever(path.join(dirI18n(id, l), 'titulos.json'), mapa);
      console.log(`${Object.keys(mapa).length} títulos em ${path.relative(raiz, dirI18n(id, l))}/titulos.json`);
    } else {
      const mapa = titulosDe(id, l);
      const lista = [...new Set(aulasDo(id).flatMap((a) => [a.titulo, ...a.sessoes.map((s) => s.titulo)]))].filter((t) => !mapa[t]);
      escrever(fonte, lista);
      console.log(`${lista.length} títulos sem tradução → ${fonte}`);
    }
    process.exit(0);
  }
  const n = Number(a3), pasta = a4 ?? '.';
  const aula = aulasDo(id).find((a) => a.aula === n);
  if (!aula) { console.error(`aula ${n} não encontrada`); process.exit(1); }
  const base = path.join(pasta, `${id}-${l}-${pad(n)}`);
  if (cmd === 'extrair') {
    const mapa = mapaDa(id, l, n);
    const lista = textosDaAula(aula).filter((x) => !mapa[x.t]);
    escrever(`${base}.src.json`, lista.map((x) => (x.tipo === 'explicacao' ? x.t : `[${x.tipo}] ${x.t}`)));
    console.log(`${lista.length} textos → ${base}.src.json`);
  } else if (cmd === 'juntar') {
    const src = lerJson(`${base}.src.json`, []).map((t) => t.replace(/^\[(misto|pronuncia|personagem)\] /, ''));
    const tr = lerJson(`${base}.tr.json`, []);
    if (src.length !== tr.length) { console.error(`tamanhos diferentes: ${src.length} × ${tr.length}`); process.exit(1); }
    const arq = path.join(dirI18n(id, l), `aula-${pad(n)}.json`);
    const mapa = lerJson(arq, {});
    src.forEach((t, i) => { if (typeof tr[i] === 'string') mapa[t] = tr[i]; });
    escrever(arq, mapa);
    const { faltam } = traduzirAula(aula, id, l);
    console.log(`${Object.keys(mapa).length} textos em ${path.relative(raiz, arq)}; sem tradução: ${faltam.length}${faltam.length ? `\n  ${faltam.slice(0, 8).join('\n  ')}` : ''}`);
  }
}
