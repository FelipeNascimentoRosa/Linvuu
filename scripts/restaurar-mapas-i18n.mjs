// Restaura os mapas i18n por aula (content/idiomas/<id>/i18n/<l>/aula-NNN.json) a partir dos dias traduzidos
// já commitados e servidos (content/idiomas/<id>/<l>/dia-NNN.json).
//
// Contexto (2026-11-04): as traduções EN de ru (312 dias) e fr (248 dias) vieram de uma pipeline que não deixou
// os mapas por aula — só deixou titulos.json. Sem mapas, `aulaTemTraducao()` é falso: regenerar os índices
// esvaziava ru/fr em content/indice.en.json e `scripts/aulas.mjs` apagava as pastas de tradução (rmSync).
// Os dias commitados carregam o resultado da tradução; este script inverte o processo: percorre cada aula-fonte
// e o dia traduzido correspondente com o MESMO `percorrer()` de i18n-aulas.mjs e regista os pares
// texto-fonte → texto-traduzido que diferem. Depois valida: regenera cada dia com traduzirAula() + as regras de
// aulas.mjs e compara, objecto a objecto, com o dia commitado (normalizado pelos mesmos adaptadores).
//
// A pipeline antiga divergia do esquema do repo em quatro pontos, tratados por adaptadores na sessão-alvo
// (todos declarados no relatório da frente):
//   1. tipo de bloco «words» em vez de «palavras» (ru/en, 121 dias) — normalizado;
//   2. diálogo: tradução na chave `en` em vez de `pt` (fr/en, 250 linhas) — movida para `pt`;
//   3. tabelas de gramática: CHAVES das linhas traduzidas (ex.: «escrito»→«written») — repostas as chaves-fonte
//      por posição; os rótulos visíveis ficam equivalentes via content/colunas.json (ver --colunas);
//   4. palavras: glosa `pt` vazia (fr/en, 1.130 itens — a glosa inglesa não existe nos ficheiros) — marcada como
//      não-recuperável: sem entrada de mapa, a regeneração repõe a glosa da fonte.
//   5. tabelas com título: chave «title» em vez de «titulo» (fr/en) — chave reposta, texto traduzido aproveitado.
//
// Conflitos (mesmo texto-fonte com dois alvos diferentes na mesma aula): o formato de mapa é global por aula —
// vence a variante mais frequente (empate: a primeira atestada) e as ocorrências sobrepostas são listadas;
// a regeneração normaliza-as para a variante vencedora, nunca para a língua-fonte.
// Tabelas com coluna-fonte descartada na tradução (glosa literal redundante): alinhamento por maximização de
// células invariantes idênticas; as células da coluna descartada ficam sem entrada (marcador = fonte).
//
// Uso:
//   node scripts/restaurar-mapas-i18n.mjs <id> <en|es>              só deriva e relata (não escreve)
//   node scripts/restaurar-mapas-i18n.mjs <id> <en|es> --escrever   escreve os mapas e valida contra os dias
//   node scripts/restaurar-mapas-i18n.mjs <id> <en|es> --colunas    propõe/aplica em content/colunas.json os
//                                                                   rótulos das chaves-fonte de tabelas
//
// Limite conhecido: `notasParaOAluno` não é escrito nos dias por aulas.mjs, logo a tradução desse campo não é
// recuperável a partir dos dias (não chega a nenhum artefacto servido; fica como texto por traduzir em faltam).
import fs from 'node:fs';
import path from 'node:path';
import { LINGUAS, fonteDe, titulosDe, traduzirAula, percorrer, raiz } from './i18n-aulas.mjs';

const [id, l, flag] = process.argv.slice(2);
if (!id || !LINGUAS.includes(l) || fonteDe(id) === l) { console.error('uso: node scripts/restaurar-mapas-i18n.mjs <id> <en|es> [--escrever|--colunas]'); process.exit(1); }
const pad = (n) => String(n).padStart(3, '0');
const dirIdioma = path.join(raiz, 'content', 'idiomas', id);
const dirTrad = path.join(dirIdioma, l);
const dirI18n = path.join(dirIdioma, 'i18n', l);
const ler = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const trilha = ler(path.join(raiz, 'content', 'trilha.json'));
let titulos = titulosDe(id, l);
const humanizar = (c) => c.charAt(0).toUpperCase() + c.slice(1).replace(/_/g, ' ');

// --- réplica de anotar() de scripts/aulas.mjs (aulas.mjs executa ao ser importado, não é importável) ---
const letrasDe = (t) => [...t.matchAll(/[А-Яа-яЁё]/g)].map((m) => m[0].toLowerCase());
function anotar(sessao, ensinadas) {
  const copia = JSON.parse(JSON.stringify(sessao));
  copia.blocos = copia.blocos.map((b) => {
    if (b.tipo === 'vocabulario') b.tipo = 'palavras';
    if (b.tipo === 'alfabeto') b.grupos.forEach((g) => g.letras.forEach((x) => ensinadas.add(x.maiuscula.toLowerCase())));
    if (b.tipo === 'palavras') b.itens.forEach((i) => { const f = [...new Set(letrasDe(i.ru))].filter((c) => !ensinadas.has(c)); if (f.length) i.ainda = f.map((c) => c.toUpperCase()); });
    return b;
  });
  copia.blocos = [...copia.blocos.filter((b) => b.tipo !== 'revisao'), ...copia.blocos.filter((b) => b.tipo === 'revisao')];
  return copia;
}

const recolher = (aula) => { const seq = []; percorrer(JSON.parse(JSON.stringify(aula)), (t, tipo, _d, chave) => seq.push({ chave, tipo, t })); return seq; };
const canon = (o) => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map((kk) => [kk, v[kk]])) : v));
const tabelasDe = (b) => [...(b.tabela ? [{ linhas: b.tabela }] : []), ...(b.tabelas ?? [])];

// --- normaliza a sessão traduzida para o esquema do repo, alinhada bloco a bloco com a sessão-fonte anotada ---
// Devolve { erro } se a estrutura não for emparelhável, ou { sessao } normalizada.
function normalizarSessaoTrad(diaSessao, fonteSessao, flags, paresChaves, onde) {
  const s = JSON.parse(JSON.stringify(diaSessao));
  if (s.blocos.length !== fonteSessao.blocos.length) return { erro: `nº de blocos difere (${fonteSessao.blocos.length} × ${s.blocos.length}) em ${onde}` };
  for (let bi = 0; bi < s.blocos.length; bi++) {
    const tb = s.blocos[bi], fb = fonteSessao.blocos[bi];
    if (tb.tipo === 'words') { tb.tipo = 'palavras'; flags.words = true; }
    if (tb.tipo !== fb.tipo) return { erro: `bloco ${bi}: tipo ${fb.tipo} × ${tb.tipo} em ${onde}` };
    if (tb.tipo === 'palavras') {
      if (tb.itens.length !== fb.itens.length) return { erro: `palavras bloco ${bi}: nº de itens difere em ${onde}` };
      tb.itens.forEach((it, ii) => { if (it.pt === '' && fb.itens[ii].pt) { it.pt = fb.itens[ii].pt; flags.glossa = (flags.glossa ?? 0) + 1; } });
    }
    if (tb.tipo === 'dialogo') {
      if (tb.linhas.length !== fb.linhas.length) return { erro: `diálogo bloco ${bi}: nº de linhas difere em ${onde}` };
      tb.linhas.forEach((ln) => {
        if ('en' in ln && !('pt' in ln)) { ln.pt = ln.en; delete ln.en; flags.dialogo = true; }
        if ('rotulo' in ln) { ln.personagem = ln.rotulo; delete ln.rotulo; }
      });
    }
    if (tb.tipo === 'gramatica') {
      const ft = tabelasDe(fb), tt = tabelasDe(tb);
      if (ft.length !== tt.length) return { erro: `gramática bloco ${bi}: nº de tabelas difere em ${onde}` };
      for (let ti = 0; ti < ft.length; ti++) {
        if (ft[ti].linhas.length !== tt[ti].linhas.length) return { erro: `tabela ${ti} bloco ${bi}: nº de linhas difere em ${onde}` };
        // Alinhamento de colunas: normalmente 1:1 por posição. A pipeline antiga por vezes DESCARTAVA uma
        // coluna-fonte ao traduzir (ex.: a coluna de glosa literal, redundante na língua da explicação):
        // escolhe-se o conjunto de colunas descartadas que maximiza as células byte-idênticas (a coluna do
        // idioma estudado é invariante e desempata); as células descartadas ficam com o valor-fonte (sem entrada).
        const L1 = ft[ti].linhas.length ? Object.keys(ft[ti].linhas[0]).length : 0;
        const L2 = tt[ti].linhas.length ? Object.keys(tt[ti].linhas[0]).length : 0;
        if (L2 > L1) return { erro: `tabela ${ti} bloco ${bi}: mais colunas na tradução (${L1} × ${L2}) em ${onde}` };
        let manter = [...Array(L1).keys()]; // índices das colunas-fonte que emparelham, por ordem
        if (L2 < L1) {
          const diff = L1 - L2;
          if (diff > 2) return { erro: `tabela ${ti} bloco ${bi}: ${diff} colunas a menos na tradução em ${onde}` };
          const combos = [];
          const gerar = (ini, faltam, acc) => { if (!faltam) { combos.push(acc); return; } for (let i = ini; i <= L1 - faltam; i++) gerar(i + 1, faltam - 1, [...acc, i]); };
          gerar(0, diff, []);
          // Pontuação: células byte-idênticas (a coluna do idioma estudado é invariante) valem muito;
          // desempata a semelhança de comprimento célula a célula (uma glosa de uma palavra não emparelha
          // com uma explicação de uma frase — foi assim que a coluna «TRADUÇÃO» se distinguiu de «POR QUE…»).
          let melhor = null, segundo = -Infinity;
          for (const fora of combos) {
            const cand = [...Array(L1).keys()].filter((c) => !fora.includes(c));
            let pontos = 0;
            for (let ri = 0; ri < ft[ti].linhas.length; ri++) { const vf = Object.values(ft[ti].linhas[ri]), vt = Object.values(tt[ti].linhas[ri]); cand.forEach((cf, ci) => { pontos += vf[cf] === vt[ci] ? 100 : -Math.abs(Math.log((String(vt[ci]).length + 1) / (String(vf[cf]).length + 1))); }); }
            if (!melhor || pontos > melhor.pontos) { segundo = melhor ? melhor.pontos : -Infinity; melhor = { pontos, cand, fora }; }
            else if (pontos > segundo) segundo = pontos;
          }
          if (!melhor || !(melhor.pontos > segundo)) return { erro: `tabela ${ti} bloco ${bi}: alinhamento de colunas ambíguo em ${onde}` };
          manter = melhor.cand;
          flags.tabelaReduzida = [...(flags.tabelaReduzida ?? []), `${onde} tabela ${ti}: fora [${melhor.fora.map((c) => Object.keys(ft[ti].linhas[0])[c]).join(', ')}]`];
        }
        // Título de tabela com a CHAVE renomeada na tradução (fr/en: «title» em vez de «titulo»): repõe a chave
        // do esquema do repo, mantendo o texto traduzido — o título é recuperável e entra no mapa.
        if ('title' in tt[ti] && !('titulo' in tt[ti])) { tt[ti].titulo = tt[ti].title; delete tt[ti].title; flags.titulosTabela = (flags.titulosTabela ?? 0) + 1; }
        // Título de tabela anulado na tradução: marcador = título-fonte (sem entrada; não recuperável).
        if (ft[ti].titulo && !tt[ti].titulo && 'titulo' in tt[ti]) { tt[ti].titulo = ft[ti].titulo; flags.titulosTabela = (flags.titulosTabela ?? 0) + 1; }
        for (let ri = 0; ri < ft[ti].linhas.length; ri++) {
          const chavesF = Object.keys(ft[ti].linhas[ri]), valoresF = Object.values(ft[ti].linhas[ri]), chavesT = Object.keys(tt[ti].linhas[ri]), valoresT = Object.values(tt[ti].linhas[ri]);
          if (chavesF.length !== L1 || valoresT.length !== L2) return { erro: `tabela ${ti} bloco ${bi}: linhas com larguras inconsistentes em ${onde}` };
          const nova = {};
          chavesF.forEach((cf, ci) => {
            const pos = manter.indexOf(ci);
            if (pos < 0) { nova[cf] = valoresF[ci]; return; } // coluna descartada: marcador = fonte (sem entrada)
            nova[cf] = valoresT[pos];
            if (chavesT[pos] !== cf) { flags.tabelas = true; if (!paresChaves.has(cf)) paresChaves.set(cf, new Map()); const m = paresChaves.get(cf); m.set(chavesT[pos], (m.get(chavesT[pos]) ?? 0) + 1); }
          });
          tt[ti].linhas[ri] = nova;
        }
      }
    }
  }
  return { sessao: s };
}

// --- dados ---
const arquivosAulas = fs.readdirSync(path.join(dirIdioma, 'aulas')).filter((f) => /^aula-\d+\.json$/.test(f)).sort();
const aulas = arquivosAulas.map((f) => ler(path.join(dirIdioma, 'aulas', f)));
const dias = new Map();
if (fs.existsSync(dirTrad)) for (const f of fs.readdirSync(dirTrad)) { const m = f.match(/^dia-(\d+)\.json$/); if (m) dias.set(Number(m[1]), ler(path.join(dirTrad, f))); }
const indiceF = path.join(raiz, 'content', `indice.${l}.json`);
const idxCurso = (fs.existsSync(indiceF) ? ler(indiceF) : {})[id] ?? { aulas: [], g: {}, s: {} };
const traduzidas = aulas.filter((a) => [0, 1, 2, 3].every((i) => dias.has((a.aula - 1) * 4 + i + 1)));
const parciais = aulas.filter((a) => !traduzidas.includes(a) && [0, 1, 2, 3].some((i) => dias.has((a.aula - 1) * 4 + i + 1)));
if (parciais.length) { console.error(`aulas com tradução parcial (abortar e investigar): ${parciais.map((a) => a.aula).join(', ')}`); process.exit(1); }
console.log(`${id} → ${l}: ${aulas.length} aulas-fonte, ${dias.size} dias traduzidos em disco, ${traduzidas.length} aulas completas para restaurar`);

// --- derivação (e normalização dos dias commitados, reutilizada na validação) ---
const ensinadas = new Set();
let totalPares = 0, totalEntradas = 0, glossasNaoRecuperaveis = 0;
const conflitos = [], desalinhadas = [], mapas = new Map(), paresChaves = new Map(), diasNorm = new Map(), tabelasReduzidas = [];
let titulosTabelaAnulados = 0;
for (const a of aulas) {
  const sessoesFonte = a.sessoes.map((s) => anotar(s, ensinadas));
  if (!traduzidas.includes(a)) continue;
  const ds = [0, 1, 2, 3].map((i) => dias.get((a.aula - 1) * 4 + i + 1));
  const flags = {};
  const sessoesTrad = [];
  let erro = null;
  for (let i = 0; i < 4 && !erro; i++) {
    const copia = JSON.parse(JSON.stringify(ds[i]));
    const r = normalizarSessaoTrad(copia.sessao, sessoesFonte[i], flags, paresChaves, `aula ${a.aula} sessão ${i + 1}`);
    if (r.erro) erro = r.erro;
    else { copia.sessao = r.sessao; sessoesTrad.push(r.sessao); diasNorm.set((a.aula - 1) * 4 + i + 1, copia); }
  }
  if (erro) { desalinhadas.push({ aula: a.aula, erro }); continue; }
  glossasNaoRecuperaveis += flags.glossa ?? 0;
  titulosTabelaAnulados += flags.titulosTabela ?? 0;
  if (flags.tabelaReduzida) tabelasReduzidas.push(...flags.tabelaReduzida);
  const fonte = { titulo: a.titulo, objetivo: a.objetivo, notasParaOAluno: a.notasParaOAluno, sessoes: sessoesFonte };
  // Título da aula atestado nos PRÓPRIOS dias servidos (dia.aula.titulo): o índice commitado diverge dele em
  // algumas aulas (outra geração de tradução); os dias são a verdade servida. Desacordo entre dias: maioria.
  const titulosNosDias = ds.map((d) => d.aula.titulo).filter(Boolean);
  const contagemTit = new Map(); titulosNosDias.forEach((t) => contagemTit.set(t, (contagemTit.get(t) ?? 0) + 1));
  const tituloAulaAlvo = [...contagemTit.entries()].sort((x, y) => y[1] - x[1])[0]?.[0] ?? idxCurso.g[a.aula] ?? a.titulo;
  for (const [t, n] of contagemTit) if (t !== tituloAulaAlvo) conflitos.push({ aula: a.aula, texto: a.titulo, a: tituloAulaAlvo, b: t, n });
  const trad = { titulo: tituloAulaAlvo, objetivo: ds[0].aula.objetivo, notasParaOAluno: a.notasParaOAluno, sessoes: sessoesTrad };
  const seqF = recolher(fonte), seqT = recolher(trad);
  const forma = (s) => s.map((x) => `${x.chave}:${x.tipo}`).join('|');
  if (seqF.length !== seqT.length || forma(seqF) !== forma(seqT)) {
    let loc = '';
    for (let i = 0; i < Math.max(seqF.length, seqT.length); i++) {
      if (`${seqF[i]?.chave}:${seqF[i]?.tipo}` !== `${seqT[i]?.chave}:${seqT[i]?.tipo}`) {
        loc = ` · 1ª divergência no texto ${i}: fonte ${seqF[i]?.chave}:${seqF[i]?.tipo} «${String(seqF[i]?.t).slice(0, 40)}» × trad ${seqT[i]?.chave}:${seqT[i]?.tipo} «${String(seqT[i]?.t).slice(0, 40)}»`;
        break;
      }
    }
    desalinhadas.push({ aula: a.aula, erro: `sequência de textos difere (${seqF.length} × ${seqT.length})${loc}` });
    continue;
  }
  // Conflitos (mesmo texto-fonte, alvos diferentes na mesma aula): o formato de mapa é global por aula, logo
  // vence a variante mais frequente (empate: a primeira); as ocorrências sobrepostas são listadas — a
  // regeneração normaliza-as para a variante vencedora, nunca para a língua-fonte.
  const pares = seqF.map((x, i) => [x.t, seqT[i].t]).filter(([f, t]) => f !== t);
  totalPares += seqF.length;
  const variantes = new Map();
  pares.forEach(([f, t], idx) => { if (!variantes.has(f)) variantes.set(f, new Map()); const m = variantes.get(f); if (!m.has(t)) m.set(t, { n: 0, idx }); m.get(t).n++; });
  const mapa = {};
  for (const [f, m] of variantes) {
    const ord = [...m.entries()].sort((x, y) => y[1].n - x[1].n || x[1].idx - y[1].idx);
    mapa[f] = ord[0][0];
    for (const [t, info] of ord.slice(1)) conflitos.push({ aula: a.aula, texto: f, a: ord[0][0], b: t, n: info.n });
  }
  totalEntradas += Object.keys(mapa).length;
  mapas.set(a.aula, mapa);
}
console.log(`pares percorridos: ${totalPares} · entradas de mapa derivadas: ${totalEntradas} · variantes normalizadas: ${conflitos.length} · aulas desalinhadas: ${desalinhadas.length} · glosas não-recuperáveis: ${glossasNaoRecuperaveis} · títulos de tabela ajustados: ${titulosTabelaAnulados} · tabelas com coluna descartada: ${tabelasReduzidas.length}`);
for (const c of conflitos.slice(0, 30)) console.log(`  normalizada aula ${c.aula}: «${c.texto.slice(0, 50)}» fica «${String(c.a).slice(0, 40)}», sobreposta «${String(c.b).slice(0, 40)}»${c.n ? ` (${c.n}×)` : ''}`);
for (const t of tabelasReduzidas.slice(0, 10)) console.log(`  tabela reduzida: ${t}`);
for (const d of desalinhadas.slice(0, 10)) console.log(`  desalinhada aula ${d.aula}: ${d.erro}`);

if (flag === '--colunas') {
  // Rótulo hoje visível na língua l para cada chave-fonte de tabela: colunas[l][chaveTraduzida] ?? humanizar(chaveTraduzida).
  const colF = path.join(raiz, 'content', 'colunas.json');
  const bruto = fs.readFileSync(colF, 'utf8');
  const colunas = JSON.parse(bruto);
  const propostas = new Map();
  for (const [cf, contagens] of paresChaves) {
    if (cf in (colunas[l] ?? {})) continue;
    const ct = [...contagens.entries()].sort((x, y) => y[1] - x[1])[0][0]; // renomeação maioritária
    propostas.set(cf, colunas[l]?.[ct] ?? humanizar(ct));
  }
  console.log(`colunas.${l}: ${paresChaves.size} chaves-fonte renomeadas observadas · ${propostas.size} rótulos a adicionar`);
  for (const [k, v] of [...propostas].sort()) console.log(`  + "${k}": "${v}"`);
  if (propostas.size) {
    // inserção cirúrgica: cada linha nova entra na sua posição ordenada SEM mover nenhuma linha existente
    // (o ficheiro é mantido à mão e não está estritamente ordenado em todo o lado — reordenar criaria ruído).
    const linhas = bruto.split('\n');
    const ini = linhas.findIndex((x) => x === `"${l}": {`);
    if (ini < 0) { console.error(`secção "${l}" não encontrada em colunas.json`); process.exit(1); }
    let fim = ini + 1; while (!/^\},?$/.test(linhas[fim])) fim++;
    const novas = [...propostas].map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)},`).sort();
    for (const nova of novas) {
      let pos = fim;
      for (let i = ini + 1; i < fim; i++) if (linhas[i] > nova) { pos = i; break; }
      linhas.splice(pos, 0, nova); fim++;
    }
    fs.writeFileSync(colF, linhas.join('\n'));
    console.log('colunas.json actualizado (inserção cirúrgica, resto byte a byte)');
  }
  process.exit(0);
}
if (desalinhadas.length) { console.error('há aulas desalinhadas — não escrevo mapas parciais.'); process.exit(1); }
if (flag !== '--escrever') { console.log('(dry-run: nada escrito; corre com --escrever para gravar os mapas e validar)'); process.exit(0); }

// --- escrita dos mapas (mesmo formato de i18n-aulas.mjs: JSON com indentação 1) ---
fs.mkdirSync(dirI18n, { recursive: true });
for (const [n, mapa] of [...mapas].sort((x, y) => x[0] - y[0])) fs.writeFileSync(path.join(dirI18n, `aula-${pad(n)}.json`), JSON.stringify(mapa, null, 1) + '\n');
console.log(`${mapas.size} mapas escritos em ${path.relative(raiz, dirI18n)}/`);

// --- alinhamento de titulos.json pelos dias servidos ---
// titulos.json derivou dos títulos que estão dentro das aulas servidas (duas gerações de tradução). Os dois
// geradores do repo discordam na precedência (conteudo.mjs: mapa vence; aulas.mjs: titulos vence), logo a
// única forma de ambos reproduzirem os artefactos é titulos == mapa nos títulos das aulas traduzidas.
// Alinha-se titulos.json pelo valor atestado nos dias (substituição cirúrgica no texto, resto byte a byte).
// Strings com valores de mapa diferentes entre aulas ficam listadas (não são alinháveis globalmente).
{
  const porTexto = new Map();
  for (const a of aulas) {
    if (!traduzidas.includes(a)) continue;
    const mapa = mapas.get(a.aula);
    for (const s of [a.titulo, ...a.sessoes.map((x) => x.titulo)]) {
      if (!mapa[s]) continue;
      if (!porTexto.has(s)) porTexto.set(s, new Map());
      porTexto.get(s).set(mapa[s], [...(porTexto.get(s).get(mapa[s]) ?? []), a.aula]);
    }
  }
  const titF = path.join(dirI18n, 'titulos.json');
  let bruto = fs.readFileSync(titF, 'utf8');
  let alinhados = 0;
  const cruzados = [];
  for (const [s, valores] of porTexto) {
    if (valores.size > 1) { cruzados.push({ texto: s, variantes: [...valores.keys()] }); continue; }
    const [valor] = valores.keys();
    if (titulos[s] === valor) continue;
    const antes = `${JSON.stringify(s)}: ${JSON.stringify(titulos[s])}`;
    if (!bruto.includes(antes)) { cruzados.push({ texto: s, variantes: ['(padrão não encontrado no ficheiro)'] }); continue; }
    bruto = bruto.replace(antes, `${JSON.stringify(s)}: ${JSON.stringify(valor)}`);
    alinhados++;
  }
  if (alinhados) fs.writeFileSync(titF, bruto);
  titulos = titulosDe(id, l);
  console.log(`titulos.json: ${alinhados} entradas alinhadas pelos dias · ${cruzados.length} textos com variantes entre aulas (não alinhados)`);
  for (const c of cruzados.slice(0, 10)) console.log(`  cruzado: «${c.texto.slice(0, 50)}» → ${c.variantes.map((v) => `«${String(v).slice(0, 35)}»`).join(' × ')}`);
}

// --- validação: regenerar cada dia com o código do repo (traduzirAula) + regras de aulas.mjs e comparar
//     com o dia commitado NORMALIZADO pelos mesmos adaptadores ---
const OBJETIVO = { en: (a, i, t, m) => `Lesson ${a}, session ${i} of ${t} · ${m} min`, es: (a, i, t, m) => `Lección ${a}, sesión ${i} de ${t} · ${m} min` };
const ensinadas2 = new Set();
let identicos = 0; const diferentes = [], hist = new Map();
const diffsDe = (x, y, p, out) => {
  if (canon(x) === canon(y)) return;
  if (typeof x !== 'object' || typeof y !== 'object' || !x || !y || Array.isArray(x) !== Array.isArray(y)) { out.push(p); return; }
  for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) diffsDe(x[k], y[k], p ? `${p}.${k}` : k, out);
};
for (const original of aulas) {
  if (!traduzidas.includes(original)) { original.sessoes.forEach((s) => anotar(s, ensinadas2)); continue; }
  const { aula: a } = traduzirAula(original, id, l);
  a.sessoes.forEach((s, i) => {
    const d = (a.aula - 1) * 4 + i + 1;
    const m = trilha.dias[d - 1] ?? { fase: Math.ceil(d / 10), nivel: a.nivel };
    const gerado = {
      idioma: id, explicacao: l, dia: d, fase: m.fase, nivel: a.nivel ?? m.nivel, status: a.status,
      titulo: `${titulos[original.titulo] ?? a.titulo}: ${titulos[original.sessoes[i].titulo] ?? s.titulo}`,
      objetivo: OBJETIVO[l](a.aula, i + 1, a.sessoes.length, s.duracaoMin),
      aula: { numero: a.aula, titulo: titulos[original.titulo] ?? a.titulo, objetivo: a.objetivo, sessoes: a.sessoes.length, duracaoTotalMin: a.duracaoTotalMin, nivel: a.nivel },
      sessao: anotar(s, ensinadas2),
      origem: `content/idiomas/${id}/aulas/${arquivosAulas[a.aula - 1]}`,
      responsavel: null,
    };
    if (canon(gerado) === canon(diasNorm.get(d))) identicos++;
    else { const out = []; diffsDe(gerado, diasNorm.get(d), '', out); diferentes.push({ dia: d, campos: out }); for (const c of out) { const k = c.replace(/\.\d+/g, '.N'); hist.set(k, (hist.get(k) ?? 0) + 1); } }
  });
}
console.log(`validação dia a dia (commitado normalizado × regenerado): ${identicos} idênticos · ${diferentes.length} com diferenças`);
for (const d of diferentes.slice(0, 20)) console.log(`  dia ${d.dia}: ${d.campos.slice(0, 6).join(' · ')}`);
console.log('histograma de campos diferentes (N = índice):');
for (const [k, n] of [...hist].sort((x, y) => y[1] - x[1]).slice(0, 25)) console.log(`  ${n}× ${k}`);
