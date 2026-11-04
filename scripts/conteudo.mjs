// Gera a estrutura de conteúdo: dias por idioma + content/indice.json.
//   node scripts/conteudo.mjs          cria o que falta (nunca sobrescreve aula já editada)
//   node scripts/conteudo.mjs --check  só valida (usado em `npm run content:check`)
// O --check valida o catálogo COMPLETO (validarCatalogo abaixo): a trilha-mestre tem
// 120 dias, mas os cursos continuam além dela — 248–312 dias-fonte por curso
// (62–78 aulas × 4 sessões), mais os dias com explicação traduzida (en/es).
import fs from 'node:fs';
import path from 'node:path';
import { LINGUAS, aulaTemTraducao, fonteDe, titulosDe, mapaDa } from './i18n-aulas.mjs';

const root = path.resolve(import.meta.dirname, '..', 'content');
const trilha = JSON.parse(fs.readFileSync(path.join(root, 'trilha.json'), 'utf8'));
const { cursos } = JSON.parse(fs.readFileSync(path.join(root, 'cursos.json'), 'utf8'));
const check = process.argv.includes('--check');

// GUARDA (2026-11-04): nunca esvaziar um índice quando há dias traduzidos em disco sem mapa i18n por aula.
// Os dias de content/idiomas/<id>/<l>/ são a verdade servida; os mapas (i18n/<l>/aula-NNN.json) são a única
// fonte de que o gerador sabe derivar a disponibilidade. Se existirem mais dias em disco do que os mapas
// implicam, a regeneração apagaria essas aulas do índice — recusa ruidosa ANTES de escrever o que quer
// que seja, nos dois modos (geração e --check). Para repor os mapas a partir dos dias servidos:
// node scripts/restaurar-mapas-i18n.mjs <curso> <língua>.
{
  const violacoes = [];
  for (const c of cursos.filter((x) => x.area === 'idiomas')) {
    const dirAulas = path.join(root, 'idiomas', c.id, 'aulas');
    const fontes = fs.existsSync(dirAulas) ? fs.readdirSync(dirAulas).filter((f) => /^aula-\d+\.json$/.test(f)).map((f) => JSON.parse(fs.readFileSync(path.join(dirAulas, f), 'utf8'))) : [];
    for (const l of LINGUAS) {
      if (fonteDe(c.id) === l) continue;
      const dirL = path.join(root, 'idiomas', c.id, l);
      const emDisco = fs.existsSync(dirL) ? fs.readdirSync(dirL).filter((f) => /^dia-\d+\.json$/.test(f)).length : 0;
      if (!emDisco) continue;
      const implicados = fontes.reduce((n, a) => n + (aulaTemTraducao(c.id, l, a.aula) ? a.sessoes.length : 0), 0);
      if (emDisco > implicados) violacoes.push(`${c.id}/${l}: ${emDisco} dias traduzidos em disco, mas os mapas i18n só implicam ${implicados}`);
    }
  }
  if (violacoes.length) {
    console.error(`GUARDA conteudo.mjs — regeneração recusada para não esvaziar índices:\n${violacoes.join('\n')}\nHá traduções servidas sem mapa por aula em content/idiomas/<curso>/i18n/<língua>/. Reponha os mapas (scripts/restaurar-mapas-i18n.mjs) ou remova a pasta de dias deliberadamente. Nada foi escrito.`);
    process.exit(1);
  }
}
const STATUS = ['planejada', 'em-producao', 'publicada'];
const pad = (n) => String(n).padStart(3, '0');
const erros = [];
const indice = { cursos: {} };
// Títulos e aulas traduzidas, um arquivo por idioma (o site carrega só o do idioma escolhido).
const traducoes = {};

// ── Validação completa do catálogo (só --check) ─────────────────────────────
// Valida TODOS os ficheiros de curso que o site serve, com as regras que os
// próprios geradores aplicam (compilar-aulas.mjs produz as aulas; aulas.mjs
// deriva os dias — 1 dia = 1 sessão, dia N = aula ⌈N/4⌉, sessão (N−1)%4+1):
//   · aulas-fonte (content/idiomas/<curso>/aulas/aula-NNN.json): numeração
//     contínua 1..A, 4 sessões S1–S4 por aula, blocos estruturalmente válidos,
//     duracaoTotalMin = soma das sessões;
//   · dias-fonte (dia-NNN.json): conjunto exacto 1..máx(120 da trilha, 4A) sem
//     buracos nem extras, campos derivados da aula-fonte (título, objectivo,
//     origem, sequência de blocos após as transformações do gerador);
//   · dias traduzidos (<curso>/<en|es>/dia-NNN.json): prefixo contínuo 1..M do
//     curso, mesma estrutura e mesmos campos não traduzíveis do dia-fonte;
//   · mapas i18n (i18n/<en|es>/*.json): JSON-objecto válido, aulas dentro de 1..A;
//   · content/indice.json: total/publicadas conferem com os ficheiros.
// Corre antes do ciclo legado: se houver JSON corrompido, o erro sai com o nome
// do ficheiro em vez de uma excepção sem contexto.
const TIPOS_BLOCO = ['alfabeto', 'dialogo', 'exercicios', 'gramatica', 'intro', 'palavras', 'producao', 'revisao', 'texto', 'vocabulario'];
let resumoCatalogo = null;
function validarCatalogo() {
  const ler = (f, onde) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { erros.push(`${onde}: JSON inválido (${e.message})`); return null; } };
  const blocosValidos = (blocos, onde) => {
    if (!Array.isArray(blocos) || !blocos.length) { erros.push(`${onde}: blocos vazios ou ausentes`); return; }
    for (const b of blocos) {
      if (!b || typeof b !== 'object' || !TIPOS_BLOCO.includes(b.tipo)) { erros.push(`${onde}: bloco com tipo inválido "${b?.tipo}"`); continue; }
      if (typeof b.min !== 'number') erros.push(`${onde}: bloco ${b.tipo} sem "min" numérico`);
      if (b.tipo === 'alfabeto' && !Array.isArray(b.grupos)) erros.push(`${onde}: bloco alfabeto sem "grupos"`);
      if ((b.tipo === 'palavras' || b.tipo === 'vocabulario') && !Array.isArray(b.itens)) erros.push(`${onde}: bloco ${b.tipo} sem "itens"`);
      if (b.tipo === 'dialogo' && !Array.isArray(b.linhas)) erros.push(`${onde}: bloco dialogo sem "linhas"`);
      if (b.tipo === 'exercicios' && !Array.isArray(b.itens)) erros.push(`${onde}: bloco exercicios sem "itens"`);
    }
  };
  const sessaoValida = (s, onde) => {
    if (!s || typeof s !== 'object') { erros.push(`${onde}: sessão ausente`); return; }
    if (typeof s.titulo !== 'string' || !s.titulo) erros.push(`${onde}: sessão sem título`);
    if (typeof s.duracaoMin !== 'number' || !(s.duracaoMin > 0)) erros.push(`${onde}: duracaoMin inválida "${s.duracaoMin}"`);
    blocosValidos(s.blocos, onde);
  };
  // aulas.mjs (anotar): «vocabulario» vira «palavras» e a revisão vai para o fim.
  const tiposDerivados = (blocos) => { const t = (blocos ?? []).map((b) => (b.tipo === 'vocabulario' ? 'palavras' : b.tipo)); return [...t.filter((x) => x !== 'revisao'), ...t.filter((x) => x === 'revisao')]; };
  const totais = { aulas: 0, dias: 0, traduzidos: 0 };
  const porCurso = [];
  const indiceFicheiro = ler(path.join(root, 'indice.json'), 'content/indice.json');
  for (const c of cursos.filter((x) => x.area === 'idiomas')) {
    const dir = path.join(root, 'idiomas', c.id);
    for (const f of fs.readdirSync(dir)) if (/^dia-/.test(f) && !/^dia-\d{3}\.json$/.test(f)) erros.push(`${c.id}/${f}: nome de dia fora do padrão dia-NNN.json`);
    // — aulas-fonte —
    const dirAulas = path.join(dir, 'aulas');
    const nomes = fs.existsSync(dirAulas) ? fs.readdirSync(dirAulas).filter((f) => /^aula-\d+\.json$/.test(f)).sort() : [];
    const aulas = [null];
    nomes.forEach((f, i) => {
      const n = Number(f.match(/\d+/)[0]);
      const onde = `${c.id}/aulas/${f}`;
      if (f !== `aula-${pad(n)}.json`) erros.push(`${onde}: nome fora do padrão aula-NNN.json`);
      if (n !== i + 1) erros.push(`${onde}: numeração das aulas não é contínua (esperava aula-${pad(i + 1)}.json)`);
      const a = ler(path.join(dirAulas, f), onde);
      if (!a) return;
      aulas[n] = a;
      if (a.idioma !== c.id) erros.push(`${onde}: idioma "${a.idioma}" ≠ ${c.id}`);
      if (a.aula !== n) erros.push(`${onde}: campo aula=${a.aula} ≠ ${n}`);
      if (!STATUS.includes(a.status)) erros.push(`${onde}: status inválido "${a.status}"`);
      if (typeof a.titulo !== 'string' || !a.titulo) erros.push(`${onde}: título vazio`);
      if (!Array.isArray(a.sessoes) || a.sessoes.length !== 4) erros.push(`${onde}: ${a.sessoes?.length ?? 0} sessões (esperado 4)`);
      else {
        a.sessoes.forEach((s, j) => { if (s.sessao !== `S${j + 1}`) erros.push(`${onde}: sessao[${j}].sessao="${s.sessao}" (esperado "S${j + 1}")`); sessaoValida(s, `${onde} S${j + 1}`); });
        const soma = a.sessoes.reduce((t, s) => t + (s.duracaoMin || 0), 0);
        if (a.duracaoTotalMin !== soma) erros.push(`${onde}: duracaoTotalMin=${a.duracaoTotalMin} ≠ soma das sessões (${soma})`);
      }
    });
    const A = nomes.length;
    totais.aulas += A;
    const totalDias = A * 4;
    const esperado = Math.max(trilha.dias.length, totalDias);
    // — dias-fonte —
    const presentes = new Set(fs.readdirSync(dir).filter((f) => /^dia-\d{3}\.json$/.test(f)).map((f) => Number(f.match(/\d+/)[0])));
    for (let n = 1; n <= esperado; n++) if (!presentes.has(n)) erros.push(`${c.id}/dia-${pad(n)}.json: falta`);
    const fonteInfo = {};
    let publicadas = 0;
    for (const n of [...presentes].sort((a, b) => a - b)) {
      const onde = `${c.id}/dia-${pad(n)}.json`;
      if (n > esperado) { erros.push(`${onde}: além do fim do curso (${esperado} dias)`); continue; }
      const d = ler(path.join(dir, `dia-${pad(n)}.json`), onde);
      if (!d) continue;
      totais.dias++;
      if (d.status === 'publicada') publicadas++;
      if (d.idioma !== c.id) erros.push(`${onde}: idioma "${d.idioma}" ≠ ${c.id}`);
      if (d.dia !== n) erros.push(`${onde}: campo dia=${d.dia} ≠ ${n}`);
      if ('explicacao' in d) erros.push(`${onde}: dia-fonte com campo "explicacao"`);
      if (!STATUS.includes(d.status)) erros.push(`${onde}: status inválido "${d.status}"`);
      fonteInfo[n] = { status: d.status, fase: d.fase, nivel: d.nivel, duracaoMin: d.sessao?.duracaoMin, tipos: (d.sessao?.blocos ?? []).map((b) => b.tipo) };
      if (n > totalDias) { // zona de stubs da trilha (sem aula-fonte): esquema antigo
        if (!d.comeceAqui || !d.imersao || !d.pratica) erros.push(`${onde}: stub sem comeceAqui/imersao/pratica`);
        continue;
      }
      const na = Math.ceil(n / 4), si = (n - 1) % 4;
      const a = aulas[na], s = a?.sessoes?.[si];
      if (!a || !s) { erros.push(`${onde}: sem aula/sessão-fonte correspondente (aula ${na})`); continue; }
      if (d.status !== a.status) erros.push(`${onde}: status "${d.status}" ≠ status da aula (${a.status})`);
      const faseEsp = n <= trilha.dias.length ? trilha.dias[n - 1].fase : Math.ceil(n / 10);
      if (d.fase !== faseEsp) erros.push(`${onde}: fase=${d.fase} (esperado ${faseEsp})`);
      const nivelEsp = a.nivel ?? trilha.dias[n - 1]?.nivel;
      if (nivelEsp !== undefined ? d.nivel !== nivelEsp : typeof d.nivel !== 'string' || !d.nivel) erros.push(`${onde}: nivel "${d.nivel}" ≠ "${nivelEsp}"`);
      if (d.titulo !== `${a.titulo}: ${s.titulo}`) erros.push(`${onde}: título não deriva da aula/sessão-fonte`);
      if (d.objetivo !== `Aula ${na}, sessão ${si + 1} de ${a.sessoes.length} · ${s.duracaoMin} min`) erros.push(`${onde}: objectivo não deriva da aula/sessão-fonte`);
      if (d.aula?.numero !== na || d.aula?.titulo !== a.titulo || d.aula?.objetivo !== a.objetivo || d.aula?.sessoes !== a.sessoes.length || d.aula?.duracaoTotalMin !== a.duracaoTotalMin || d.aula?.nivel !== a.nivel) erros.push(`${onde}: bloco "aula" não confere com a aula-fonte ${na}`);
      if (d.origem !== `content/idiomas/${c.id}/aulas/aula-${pad(na)}.json`) erros.push(`${onde}: origem "${d.origem}" não aponta para a aula-fonte`);
      if (d.sessao?.sessao !== `S${si + 1}`) erros.push(`${onde}: sessao.sessao="${d.sessao?.sessao}" (esperado "S${si + 1}")`);
      if (d.sessao?.titulo !== s.titulo) erros.push(`${onde}: título da sessão não confere com a aula-fonte`);
      if (d.sessao?.duracaoMin !== s.duracaoMin) erros.push(`${onde}: duracaoMin da sessão não confere com a aula-fonte`);
      if (JSON.stringify((d.sessao?.blocos ?? []).map((b) => b.tipo)) !== JSON.stringify(tiposDerivados(s.blocos))) erros.push(`${onde}: sequência de blocos difere da aula-fonte`);
      sessaoValida(d.sessao, onde);
    }
    // — content/indice.json (ficheiro) confere com o conteúdo —
    const ind = indiceFicheiro?.cursos?.[c.id];
    if (ind) {
      if (ind.total !== esperado) erros.push(`content/indice.json: ${c.id} total=${ind.total} ≠ ${esperado} dias no conteúdo (correr "npm run content")`);
      if (ind.publicadas !== publicadas) erros.push(`content/indice.json: ${c.id} publicadas=${ind.publicadas} ≠ ${publicadas} nos ficheiros (correr "npm run content")`);
    }
    // — dias traduzidos + mapas i18n —
    const trads = [];
    for (const l of LINGUAS) {
      if (fonteDe(c.id) === l) continue;
      const dirI = path.join(dir, 'i18n', l);
      if (fs.existsSync(dirI)) for (const f of fs.readdirSync(dirI).filter((x) => x.endsWith('.json'))) {
        const j = ler(path.join(dirI, f), `${c.id}/i18n/${l}/${f}`);
        if (j && (typeof j !== 'object' || Array.isArray(j))) erros.push(`${c.id}/i18n/${l}/${f}: mapa não é um objecto JSON`);
        const m = f.match(/^aula-(\d+)\.json$/);
        if (m && Number(m[1]) > A) erros.push(`${c.id}/i18n/${l}/${f}: mapa para aula além do curso (${A} aulas)`);
      }
      const dirL = path.join(dir, l);
      if (!fs.existsSync(dirL)) continue;
      for (const f of fs.readdirSync(dirL)) if (/^dia-/.test(f) && !/^dia-\d{3}\.json$/.test(f)) erros.push(`${c.id}/${l}/${f}: nome de dia fora do padrão dia-NNN.json`);
      const nums = fs.readdirSync(dirL).filter((f) => /^dia-\d{3}\.json$/.test(f)).map((f) => Number(f.match(/\d+/)[0])).sort((a, b) => a - b);
      nums.forEach((n, i) => { if (n !== i + 1) erros.push(`${c.id}/${l}/dia-${pad(n)}.json: dias traduzidos não formam um prefixo contínuo (falta o dia ${i + 1})`); });
      for (const n of nums) {
        const onde = `${c.id}/${l}/dia-${pad(n)}.json`;
        if (n > totalDias) { erros.push(`${onde}: tradução além do fim do curso (${totalDias} dias)`); continue; }
        const d = ler(path.join(dirL, `dia-${pad(n)}.json`), onde);
        if (!d) continue;
        totais.traduzidos++;
        const na = Math.ceil(n / 4), si = (n - 1) % 4, fi = fonteInfo[n], a = aulas[na];
        if (d.idioma !== c.id) erros.push(`${onde}: idioma "${d.idioma}" ≠ ${c.id}`);
        if (d.explicacao !== l) erros.push(`${onde}: explicacao "${d.explicacao}" ≠ ${l}`);
        if (d.dia !== n) erros.push(`${onde}: campo dia=${d.dia} ≠ ${n}`);
        if (fi) {
          if (d.status !== fi.status) erros.push(`${onde}: status "${d.status}" ≠ status do dia-fonte (${fi.status})`);
          if (d.fase !== fi.fase) erros.push(`${onde}: fase difere do dia-fonte`);
          if (d.nivel !== fi.nivel) erros.push(`${onde}: nivel difere do dia-fonte`);
          if (d.sessao?.duracaoMin !== fi.duracaoMin) erros.push(`${onde}: duracaoMin difere do dia-fonte`);
          if (JSON.stringify((d.sessao?.blocos ?? []).map((b) => b.tipo)) !== JSON.stringify(fi.tipos)) erros.push(`${onde}: sequência de blocos difere do dia-fonte`);
        }
        if (d.aula?.numero !== na) erros.push(`${onde}: aula.numero=${d.aula?.numero} (esperado ${na})`);
        if (a && (d.aula?.sessoes !== a.sessoes.length || d.aula?.duracaoTotalMin !== a.duracaoTotalMin || d.aula?.nivel !== a.nivel)) erros.push(`${onde}: bloco "aula" não confere com a aula-fonte ${na}`);
        if (d.origem !== `content/idiomas/${c.id}/aulas/aula-${pad(na)}.json`) erros.push(`${onde}: origem "${d.origem}" não aponta para a aula-fonte`);
        if (d.sessao?.sessao !== `S${si + 1}`) erros.push(`${onde}: sessao.sessao="${d.sessao?.sessao}" (esperado "S${si + 1}")`);
        const objEsp = l === 'en' ? `Lesson ${na}, session ${si + 1} of 4 · ${d.sessao?.duracaoMin} min` : `Lección ${na}, sesión ${si + 1} de 4 · ${d.sessao?.duracaoMin} min`;
        if (d.objetivo !== objEsp) erros.push(`${onde}: objectivo fora do formato da língua de explicação`);
        sessaoValida(d.sessao, onde);
      }
      if (nums.length) trads.push(`${nums.length} ${l}`);
    }
    porCurso.push(`${c.id}: ${A} aulas · ${totalDias} dias${trads.length ? ` · ${trads.join(' · ')}` : ''}`);
  }
  resumoCatalogo = `ok: catálogo completo validado — ${totais.aulas} aulas · ${totais.dias} dias-fonte · ${totais.traduzidos} dias traduzidos (${porCurso.join('; ')})`;
}
if (check) validarCatalogo();
// No --check, a validação completa subsume as verificações do ciclo legado;
// sair já aqui mantém os diagnósticos nomeados se houver JSON corrompido
// (o ciclo legado faria JSON.parse sem contexto e perderia as mensagens).
if (check && erros.length) { console.error(erros.join('\n')); process.exit(1); }

for (const c of cursos.filter((x) => x.area === 'idiomas')) {
  const dir = path.join(root, 'idiomas', c.id);
  fs.mkdirSync(dir, { recursive: true });
  const status = [];
  const sobrescritos = {};
  const grupos = {};
  // a trilha-mestre tem 100 dias; um idioma pode continuar depois (dia-101.json em diante, gerados por aulas.mjs)
  const maisDias = fs.readdirSync(dir).map((f) => f.match(/^dia-(\d+)\.json$/)?.[1]).filter(Boolean).map(Number).filter((n) => n > trilha.dias.length);
  const ultimoDia = Math.max(trilha.dias.length, ...maisDias);
  for (let n = 1; n <= ultimoDia; n++) {
    const d = trilha.dias[n - 1] ?? { dia: n, fase: Math.ceil(n / 10), nivel: 'a2', titulo: `Dia ${n}`, objetivo: '' };
    const file = path.join(dir, `dia-${pad(d.dia)}.json`);
    if (!fs.existsSync(file) && n > trilha.dias.length) { erros.push(`falta ${c.id}/dia-${pad(n)}.json (a continuação do curso não pode ter buracos)`); continue; }
    if (!fs.existsSync(file)) {
      if (check) { erros.push(`falta ${c.id}/dia-${pad(d.dia)}.json`); status.push('planejada'); continue; }
      const aula = {
        idioma: c.id, dia: d.dia, fase: d.fase, nivel: d.nivel, status: 'planejada',
        titulo: d.titulo, objetivo: d.objetivo,
        comeceAqui: { status: 'pendente', audio: null, palavras: [] },
        imersao: { status: 'pendente', texto: null, audio: null, vocabulario: [] },
        pratica: { status: 'pendente', exercicios: [] },
        // vídeo de apoio é opcional: só entra onde os alunos mais erram
        videoApoio: { status: 'nenhum', url: null, motivo: null },
        responsavel: null,
      };
      fs.writeFileSync(file, JSON.stringify(aula, null, 2) + '\n');
    }
    const aula = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (aula.dia !== d.dia || aula.idioma !== c.id) erros.push(`${file}: dia/idioma não confere`);
    if (!STATUS.includes(aula.status)) erros.push(`${file}: status inválido "${aula.status}"`);
    status.push(aula.status);
    if (aula.aula?.numero) { const g = (grupos[aula.aula.numero] ??= { aula: aula.aula.numero, titulo: aula.aula.titulo, nivel: aula.nivel, dias: [d.dia, d.dia] }); g.dias[1] = d.dia; }
    const m = trilha.dias[d.dia - 1] ?? { titulo: null, objetivo: null };
    if (aula.titulo !== m.titulo || aula.objetivo !== m.objetivo) sobrescritos[d.dia] = { t: aula.titulo, o: aula.objetivo };
  }
  // Títulos e aulas traduzidas para inglês e espanhol (a trilha mostra os títulos no idioma do site).
  const tr = {};
  const dirAulas = path.join(dir, 'aulas');
  const fontes = fs.existsSync(dirAulas) ? fs.readdirSync(dirAulas).filter((f) => /^aula-\d+\.json$/.test(f)).sort().map((f) => JSON.parse(fs.readFileSync(path.join(dirAulas, f), 'utf8'))) : [];
  for (const l of LINGUAS) {
    if (fonteDe(c.id) === l) continue;
    const titulos = titulosDe(c.id, l);
    const t = { aulas: [], g: {}, s: {} };
    for (const a of fontes) {
      const mapa = aulaTemTraducao(c.id, l, a.aula) ? mapaDa(c.id, l, a.aula) : titulos;
      if (aulaTemTraducao(c.id, l, a.aula)) t.aulas.push(a.aula);
      const ta = mapa[a.titulo];
      if (ta) t.g[a.aula] = ta;
      a.sessoes.forEach((s, i) => { const ts = mapa[s.titulo]; if (ta || ts) t.s[(a.aula - 1) * 4 + i + 1] = `${ta ?? a.titulo}: ${ts ?? s.titulo}`; });
    }
    if (t.aulas.length || Object.keys(t.g).length) tr[l] = t;
  }
  for (const [l, t] of Object.entries(tr)) (traducoes[l] ??= {})[c.id] = t;
  // Amostra da Home: os blocos da 1ª sessão (sem carregar a aula inteira no site).
  const s1 = fontes[0]?.sessoes[0];
  indice.cursos[c.id] = {
    fonte: fonteDe(c.id),
    ...(s1 ? { amostra: { min: s1.duracaoMin, blocos: s1.blocos.map((b) => [b.tipo, b.min]) } } : {}),
    total: status.length,
    publicadas: status.filter((s) => s === 'publicada').length,
    emProducao: status.filter((s) => s === 'em-producao').length,
    planejadas: status.filter((s) => s === 'planejada').length,
    status,
    sobrescritos,
    grupos: Object.values(grupos),
  };
}
if (!check) {
  fs.writeFileSync(path.join(root, 'indice.json'), JSON.stringify(indice) + '\n');
  for (const l of LINGUAS) fs.writeFileSync(path.join(root, `indice.${l}.json`), JSON.stringify(traducoes[l] ?? {}) + '\n');
}
if (erros.length) { console.error(erros.join('\n')); process.exit(1); }
console.log(check && resumoCatalogo ? resumoCatalogo : `ok: ${Object.keys(indice.cursos).length} idiomas × ${trilha.dias.length} dias`);
