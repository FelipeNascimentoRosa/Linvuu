#!/usr/bin/env node
// Raio-X pedagógico determinístico da base (SOMENTE LEITURA; nenhuma dependência externa; não escreve em content/).
//
//   node scripts/auditar-pedagogia.mjs                       tabela de todos os cursos e lados (pt e en)
//   node scripts/auditar-pedagogia.mjs --curso it --lingua en  só um curso/lado (validar um lote)
//   node scripts/auditar-pedagogia.mjs --detalhe             inclui amostras de cada achado
//   node scripts/auditar-pedagogia.mjs --json [arquivo]      relatório completo em JSON (stdout ou arquivo)
//   node scripts/auditar-pedagogia.mjs --audio-privado <dir> clone local do Linvuu-Audio (padrão: $AUDIO_PRIVADO_DIR ou .audio-privado)
//   node scripts/auditar-pedagogia.mjs --falhar              sai com código 1 se houver placeholder ou botão sem MP3 (uso em CI de lote)
//
// Lados: `pt` = content/idiomas/<id>/dia-NNN.json + content/gramatica/<id>.json (explicação em português);
//        `en` = content/idiomas/<id>/en/dia-NNN.json + content/gramatica/<id>.en.json (explicação em inglês).
// Medidas: (1) vazamento de idioma na prosa; (2) profundidade das aulas iniciais vs finais; (3) duplicações, placeholders e
// absolutos para triagem humana; (4) cobertura de áudio por hash (mesma normalização e FNV-1a de src/lib/audio.ts e scripts/aulas.mjs).
// Heurísticas de triagem: apontam onde um humano deve olhar, não provam erro.
import fs from 'node:fs';
import path from 'node:path';
import { textosDaAula, mapaDa, aulaTemTraducao } from './i18n-aulas.mjs';

const raiz = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const opc = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? (args[i + 1]?.startsWith('--') || args[i + 1] === undefined ? true : args[i + 1]) : undefined; };
const soCurso = opc('curso'), soLingua = opc('lingua'), detalhe = args.includes('--detalhe'), falhar = args.includes('--falhar');
const jsonOpt = opc('json');
const dirPrivado = path.resolve(typeof opc('audio-privado') === 'string' ? opc('audio-privado') : process.env.AUDIO_PRIVADO_DIR || path.join(raiz, '.audio-privado'));

const ler = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const existe = (f) => fs.existsSync(f);
const idiomas = fs.readdirSync(path.join(raiz, 'content', 'idiomas')).filter((d) => fs.statSync(path.join(raiz, 'content', 'idiomas', d)).isDirectory()).sort();
const diasDe = (dir) => (existe(dir) ? fs.readdirSync(dir).filter((x) => /^dia-\d+\.json$/.test(x)).sort() : []);

// ── texto: prosa vs. exemplos ────────────────────────────────────────────────────────────────────────────────────
const CHAVES_PROSA = new Set(['texto', 'explicacao', 'comparacao', 'enunciado', 'objetivo', 'titulo', 'motivo', 'contexto', 'resposta', 'pergunta', 'dica', 'nota', 'ainda']);
function* folhas(o, caminho = '', chave = '') {
  if (typeof o === 'string') { yield { s: o, caminho, chave }; return; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) yield* folhas(o[i], `${caminho}[${i}]`, chave); return; }
  if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) yield* folhas(v, `${caminho}.${k}`, k);
}
const semCitacoes = (s) => s.replace(/«[^»]*»|"[^"]*"|“[^”]*”|‘[^’]*’|`[^`]*`|\*\*?[^*]+\*\*?/g, ' ');
const palavras = (s) => s.toLowerCase().match(/[\p{L}\p{M}'’-]+/gu) ?? [];
const PT = new Set(['não', 'você', 'vocês', 'também', 'então', 'porque', 'são', 'está', 'estão', 'isso', 'isto', 'aqui', 'muito', 'pelo', 'pela', 'uma', 'dos', 'das', 'seu', 'sua', 'ao', 'às', 'nós', 'têm', 'há', 'será', 'língua', 'fala', 'falar', 'quando', 'depois', 'antes', 'ainda', 'só', 'mesmo', 'mesma', 'cada', 'sempre', 'nunca']);
const EN = new Set(['the', 'and', 'is', 'are', 'you', 'with', 'which', 'this', 'that', 'your', 'from', 'not', 'for', 'of', 'to', 'in', 'it', 'be', 'can', 'will', 'when', 'before', 'after', 'only']);
const PT_GLOSA = new Set([...PT].filter((p) => p !== 'são')); // «São Paulo» é nome próprio em inglês
const REF_PT =/portugu[eê]s|brasileir|brazilian|portuguese/i;
const ABSOLUTOS = /\b(nunca|sempre|jamais|qualquer|never|always|every|silent|mudas?)\b/gi;
// Marcador de pendência (TODO:, [TBD], FIXME), não a palavra TODO de ênfase em maiúsculas («nega TODO O RESTO»).
const PLACEHOLDER_MAIUSC = /(^|[\s(\[])(TODO|TBD|FIXME|XXX)(?=\s*([:)\]]|$))/;
const PLACEHOLDER_OUTROS = /\[\.\.\.\]|\[…\]|lorem ipsum|\{\{|\}\}|^\s*(undefined|NaN|null)\s*$/i;
const CHAVES_EXPLICACAO = new Set(['explicacao', 'comparacao', 'motivo', 'texto', 'contexto', 'resposta']); // duplicação e absolutos só aqui
const AUDIO_ERRADO = (id) => (id === 'fr' ? /\b(não|você)\b/i : /\b(ou|não|você)\b/i); // «ou» é palavra francesa válida

// ── áudio: mesma normalização e hash do player ─────────────────────────────────────────────────────────────────
const textoParaAudio = (t) => t.normalize('NFC').replace(/́/g, '').trim();
const hashTexto = (t) => { let h = 0x811c9dc5; for (const c of Buffer.from(textoParaAudio(t), 'utf8')) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const lerIndice = (f) => (existe(f) ? new Set(ler(f)) : new Set());
const lerCsv = (f) => { // arquivo,"texto",voz,... (aspas duplicadas dentro do texto)
  const out = []; if (!existe(f)) return out;
  for (const l of fs.readFileSync(f, 'utf8').split('\n').slice(1)) { const m = l.match(/^([0-9a-f]{8})\.mp3,"((?:[^"]|"")*)",/); if (m) out.push({ arquivo: m[1], texto: m[2].replace(/""/g, '"') }); }
  return out;
};
/** Textos dos botões de áudio de um dia servido, na mesma ordem de decisão de src/components/Sessao.tsx (Audio texto=...). */
function botoesDoDia(d) {
  const t = []; let o = ''; const add = (x) => { if (typeof x === 'string' && x.trim()) t.push({ texto: textoParaAudio(x), origem: o }); };
  for (const b of d.sessao?.blocos ?? []) {
    o = b.tipo; if (b.tipo === 'alfabeto') (b.grupos ?? []).forEach((g) => (g.letras ?? []).forEach((l) => { o = 'alfabeto.nome'; add(l.nome); o = 'alfabeto.exemplo'; add(l.exemplo); }));
    if (b.tipo === 'palavras' || b.tipo === 'vocabulario') (b.itens ?? []).forEach((i) => add(i.audio ?? i.ru));
    if (b.tipo === 'dialogo') (b.linhas ?? []).forEach((l) => add(l.audio ?? l.ru));
    if (b.tipo === 'texto') add(b.ru);
    if (b.tipo === 'gramatica') { o = 'gramatica.exemplo'; (b.exemplos ?? []).forEach((e) => add(String(e.ru ?? '').replace(/s*(.*?)s*$/, ''))); o = 'gramatica.erro-certo'; (b.erros ?? []).forEach((e) => add(e.audio ?? e.certo)); }
    if (b.tipo === 'exercicios') (b.itens ?? []).forEach((i) => add(i.audio));
  }
  return t;
}
const privadoDisponivel = existe(dirPrivado);
function auditarAudio(id) {
  const alvo = new Map(); let botoes = 0; // texto -> aulas; botões = ocorrências nos dias servidos (pt e en)
  for (const sub of ['', 'en']) {
    const dd = path.join(raiz, 'content', 'idiomas', id, sub);
    for (const f of diasDe(dd)) { const dia = ler(path.join(dd, f)); const aulaN = dia.aula?.numero ?? Math.ceil(Number(f.match(/d+/)[0]) / 4); for (const { texto: t, origem } of botoesDoDia(dia)) { botoes++; if (!alvo.has(t)) alvo.set(t, { aulas: new Set(), origem }); alvo.get(t).aulas.add(aulaN); } }
  }
  const pub = new Set([...lerIndice(path.join(raiz, 'public', 'audio', id, 'index.json')), ...lerIndice(path.join(raiz, 'public', 'audio', 'v2', id, 'index.json'))]);
  const priv = new Set();
  if (privadoDisponivel) for (const d of ['audio-privado', 'audio-privado-v2']) { const p = path.join(dirPrivado, d, id); if (existe(p)) for (const f of fs.readdirSync(p)) if (f.endsWith('.mp3')) priv.add(f.slice(0, -4)); }
  const csv = lerCsv(path.join(raiz, 'content', 'audio', `${id}-gravar.csv`));
  const csvHashes = new Set(csv.map((r) => r.arquivo));
  const hashRuim = csv.filter((r) => hashTexto(r.texto) !== r.arquivo).length;
  let comPublico = 0, comPrivado = 0, semMp3 = 0; const faltam = [];
  for (const [t, { aulas, origem }] of alvo) {
    const h = hashTexto(t);
    if (pub.has(h)) comPublico++; else if (priv.has(h)) comPrivado++; else { semMp3++; faltam.push({ hash: h, texto: t, aula: Math.min(...aulas), origem, noCsv: csvHashes.has(h) }); }
  }
  const foraDoCsv = faltam.filter((f) => !f.noCsv).length; const porOrigem = {}; for (const x of faltam) porOrigem[x.origem] = (porOrigem[x.origem] ?? 0) + 1;
  return { botoes, textos: alvo.size, comPublico, comPrivado, semMp3, semMp3ForaDoCsv: foraDoCsv, semMp3PorOrigem: porOrigem, semMp3Gratis: faltam.filter((x) => x.aula <= 2).length, csvLinhas: csv.length, csvHashRuim: hashRuim, faltam };
}

// ── auditoria de um lado (curso × língua) ──────────────────────────────────────────────────────────────────────
const media = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const f1 = (x) => (Math.round(x * 10) / 10).toString();
function auditarLado(id, lingua) {
  const dirDias = lingua === 'en' ? path.join(raiz, 'content', 'idiomas', id, 'en') : path.join(raiz, 'content', 'idiomas', id);
  const arquivos = diasDe(dirDias).map((f) => ({ f, caminho: path.join(dirDias, f), tipo: 'dia' }));
  const gram = path.join(raiz, 'content', 'gramatica', lingua === 'en' ? `${id}.en.json` : `${id}.json`);
  if (existe(gram)) arquivos.push({ f: path.basename(gram), caminho: gram, tipo: 'gramatica' });
  const r = { curso: id, lingua, sessoes: arquivos.filter((a) => a.tipo === 'dia').length, topicos: 0, vazamentos: 0, refsPt: 0, audioIdiomaErrado: 0, placeholders: 0, glosasVazias: 0, glosasPt: 0, absolutos: 0, duplicadas: 0,
    prof: { gramIni: [], gramFim: [], itensIni: [], itensFim: [] }, achados: { vazamento: [], refPt: [], glosaVazia: [], glosaPt: [], placeholder: [], absoluto: [], duplicada: [], audioIdiomaErrado: [] }, rasos: [] };
  const vistas = new Map(); // prosa longa -> arquivos
  for (const a of arquivos) {
    const d = ler(a.caminho);
    const aula = a.tipo === 'dia' ? (d.aula?.numero ?? Math.ceil((d.dia ?? Number(a.f.match(/\d+/)[0])) / 4)) : null;
    let palavrasProsa = 0, itens = 0; const gramBlocos = [];
    if (a.tipo === 'gramatica') r.topicos = (d.topicos ?? []).length;
    // Língua esperada da explicação: o campo `explicacao` do dia (o curso `br` foi escrito em inglês) ou `explicacaoEm` do tópico.
    const esperadaDia = d.explicacao ?? (id === 'br' && lingua === 'pt' ? 'en' : lingua); // `br` na raiz foi escrito em inglês
    for (const { s, caminho, chave } of folhas(d)) {
      // «null» é o zero em alemão; `nota` vazia é só célula de tabela sem observação.
      if (PLACEHOLDER_MAIUSC.test(s) || (PLACEHOLDER_OUTROS.test(s) && !(id === 'de' && /^\s*null\s*$/i.test(s))) || (s.trim() === '' && CHAVES_PROSA.has(chave) && chave !== 'nota')) { r.placeholders++; r.achados.placeholder.push({ arquivo: a.f, caminho, texto: s.slice(0, 80) }); }
      if (chave === 'audio' && id !== 'br' && AUDIO_ERRADO(id).test(s)) { r.audioIdiomaErrado++; r.achados.audioIdiomaErrado.push({ arquivo: a.f, caminho, texto: s.slice(0, 80) }); }
      // glosa em português num dia em inglês: o campo `pt` é a tradução mostrada ao aluno (em inglês no lado en)
      const topicoG = a.tipo === 'gramatica' ? caminho.match(/^\.topicos\[(\d+)\]/)?.[1] : undefined;
      const esperadaG = topicoG !== undefined ? (d.topicos[Number(topicoG)]?.explicacaoEm ?? lingua) : esperadaDia; // tópico ainda em português (explicacaoEm: pt) não é vazamento: é o que falta traduzir
      if (chave === 'pt' && esperadaG === 'en' && lingua === 'en' && palavras(semCitacoes(s)).some((p) => PT_GLOSA.has(p))) { r.glosasPt++; r.achados.glosaPt.push({ arquivo: a.f, caminho, texto: s.slice(0, 80) }); }
      if (!CHAVES_PROSA.has(chave) || caminho.includes('.opcoes')) continue;
      const topico = a.tipo === 'gramatica' ? caminho.match(/^\.topicos\[(\d+)\]/)?.[1] : undefined;
      const esperada = topico !== undefined ? (d.topicos[Number(topico)]?.explicacaoEm ?? lingua) : esperadaDia;
      const limpo = semCitacoes(s); const pal = palavras(limpo); palavrasProsa += pal.length;
      const ptHit = new Set(pal.filter((p) => PT.has(p))), enHit = new Set(pal.filter((p) => EN.has(p)));
      // vazamento: prosa em português num lado em inglês (≥2 marcadores) ou em inglês num lado em português (≥5 marcadores)
      const vaza = esperada === 'en' ? ptHit.size >= 2 : enHit.size >= 5;
      if (esperada === 'en' && id !== 'br' && chave !== 'enunciado' && /portuguese|portugu[eê]s/i.test(limpo) && !/^\s*\(?portuguese\)?\s*$/i.test(limpo)) { r.refsPt++; r.achados.refPt.push({ arquivo: a.f, caminho, texto: s.slice(0, 110) }); }
      if (vaza) { r.vazamentos++; r.achados.vazamento.push({ arquivo: a.f, caminho, texto: s.slice(0, 110) }); }
      if (!CHAVES_EXPLICACAO.has(chave)) continue;
      for (const m of limpo.matchAll(ABSOLUTOS)) { r.absolutos++; if (r.achados.absoluto.length < 400) r.achados.absoluto.push({ arquivo: a.f, termo: m[0].toLowerCase(), texto: limpo.slice(Math.max(0, m.index - 30), m.index + 50) }); }
      if (pal.length >= 12) { const k = limpo.toLowerCase().replace(/\s+/g, ' ').trim(); if (!vistas.has(k)) vistas.set(k, new Set()); vistas.get(k).add(a.f); }
    }
    if (a.tipo === 'dia') {
      for (const b of d.sessao?.blocos ?? []) {
        // itens = o que o aluno percorre: itens, exemplos, falas, perguntas e linhas de tabela (sessões de revisão têm só tabelas).
        const tab = (b.tabela?.length ?? 0) + (b.tabelas ?? []).reduce((x, t) => x + (t.linhas?.length ?? 0), 0);
        const n = (b.itens?.length ?? 0) + (b.exemplos?.length ?? 0) + (b.linhas?.length ?? 0) + (b.perguntas?.length ?? 0) + tab; itens += n;
        // glosa vazia: a palavra aparece sem tradução ao lado (o campo `pt` é o que a tela mostra, em qualquer lado)
        if (b.tipo === 'palavras') for (const i of b.itens ?? []) if (!String(i.pt ?? '').trim()) { r.glosasVazias++; if (r.achados.glosaVazia.length < 40) r.achados.glosaVazia.push({ arquivo: a.f, texto: String(i.ru ?? '') }); }
        if (b.tipo === 'gramatica') gramBlocos.push(palavras([b.explicacao, b.comparacao, ...(b.erros ?? []).map((e) => e.motivo)].filter(Boolean).join(' ')).length);
      }
      const alvoG = aula <= 20 ? r.prof.gramIni : aula >= 40 ? r.prof.gramFim : null;
      if (alvoG) alvoG.push(...gramBlocos);
      if (aula <= 20) r.prof.itensIni.push(itens); else if (aula >= 40) r.prof.itensFim.push(itens);
      if (aula >= 3) r.rasos.push({ curso: id, lingua, arquivo: a.f, aula, palavras: palavrasProsa, itens, score: palavrasProsa + 3 * itens });
    }
  }
  for (const [k, fs_] of vistas) if (fs_.size >= 2) { r.duplicadas++; if (r.achados.duplicada.length < 60) r.achados.duplicada.push({ arquivos: [...fs_].slice(0, 3).join(', '), texto: k.slice(0, 100) }); }
  return r;
}

// ── execução ──────────────────────────────────────────────────────────────────────────────────────────────────
const cursos = idiomas.filter((id) => !soCurso || id === soCurso);
const linguas = ['pt', 'en'].filter((l) => !soLingua || l === soLingua);
const lados = [], audio = {}, i18n = {};
for (const id of cursos) {
  audio[id] = auditarAudio(id);
  for (const l of linguas) lados.push(auditarLado(id, l));
  // cobertura do mapa de tradução para inglês (aulas com mapa e textos de explicação ainda sem tradução)
  const dirA = path.join(raiz, 'content', 'idiomas', id, 'aulas');
  const aulasN = existe(dirA) ? fs.readdirSync(dirA).filter((x) => /^aula-\d+\.json$/.test(x)).length : 0;
  let comMapa = 0, faltamExpl = 0, totalExpl = 0;
  for (let n = 1; n <= aulasN; n++) {
    if (!aulaTemTraducao(id, 'en', n)) continue; comMapa++;
    const aula = ler(path.join(dirA, `aula-${String(n).padStart(3, '0')}.json`)); const mapa = mapaDa(id, 'en', n);
    for (const { t, tipo } of textosDaAula(aula)) if (tipo === 'explicacao') { totalExpl++; if (!(typeof mapa[t] === 'string' && mapa[t].length)) faltamExpl++; }
  }
  i18n[id] = { aulas: aulasN, aulasComMapaEn: comMapa, explicacoesNoMapa: totalExpl - faltamExpl, explicacoesSemTraducao: faltamExpl };
}
const rasos = lados.flatMap((l) => l.rasos).sort((a, b) => a.score - b.score).slice(0, 10);
const relatorio = { geradoDe: 'content/idiomas/**, content/gramatica/**, public/audio/**/index.json' + (privadoDisponivel ? `, ${path.relative(raiz, dirPrivado) || dirPrivado}` : ''), audioPrivadoVerificado: privadoDisponivel, lados: lados.map(({ achados, rasos: _r, prof, ...x }) => ({ ...x, prof: { gramIni: f1(media(prof.gramIni)), gramFim: f1(media(prof.gramFim)), itensIni: f1(media(prof.itensIni)), itensFim: f1(media(prof.itensFim)) }, achados })), audio: Object.fromEntries(Object.entries(audio).map(([k, v]) => [k, { ...v, faltam: v.faltam.slice(0, 200) }])), i18nEn: i18n, maisRasos: rasos };

if (jsonOpt) { const s = JSON.stringify(relatorio, null, 1) + '\n'; if (typeof jsonOpt === 'string') fs.writeFileSync(path.resolve(jsonOpt), s); else process.stdout.write(s); }
else {
  const pad = (x, n) => String(x).padEnd(n), padL = (x, n) => String(x).padStart(n);
  console.log(`Fonte do áudio: índices públicos (public/audio/<id>/index.json e v2) + ${privadoDisponivel ? `clone privado em ${dirPrivado}` : 'clone privado NÃO encontrado (use --audio-privado <dir>); botões pagos contam como sem MP3'}.`);
  console.log(`${pad('Curso', 6)}${pad('Lado', 5)}${padL('Sess', 5)}${padL('Vaza', 6)}${padL('Gram ini→fim', 14)}${padL('Itens/dia ini→fim', 19)}${padL('Dup', 5)}${padL('Placeh', 7)}${padL('RefPT', 7)}${padL('GlsVaz', 7)}${padL('GlsPT', 6)}${padL('Absol', 7)}${padL('AudErr', 7)}  Áudio (únicos: pub+priv / sem MP3)`);
  for (const l of lados) {
    const a = audio[l.curso]; const aud = l.lingua === 'pt' || soLingua ? `${a.textos}: ${a.comPublico}+${a.comPrivado} / ${a.semMp3} (grátis ${a.semMp3Gratis})` : '(igual ao lado pt)';
    console.log(`${pad(l.curso, 6)}${pad(l.lingua, 5)}${padL(l.sessoes, 5)}${padL(l.vazamentos, 6)}${padL(`${f1(media(l.prof.gramIni))}→${f1(media(l.prof.gramFim))}`, 14)}${padL(`${f1(media(l.prof.itensIni))}→${f1(media(l.prof.itensFim))}`, 19)}${padL(l.duplicadas, 5)}${padL(l.placeholders, 7)}${padL(l.refsPt, 7)}${padL(l.glosasVazias, 7)}${padL(l.glosasPt, 6)}${padL(l.absolutos, 7)}${padL(l.audioIdiomaErrado, 7)}  ${aud}`);
  }
  console.log('\nMapa de tradução para inglês (explicações de aulas com mapa):');
  for (const [id, v] of Object.entries(i18n)) console.log(`  ${pad(id, 4)} aulas ${padL(v.aulas, 3)} | com mapa EN ${padL(v.aulasComMapaEn, 3)} | explicações traduzidas ${padL(v.explicacoesNoMapa, 5)} | sem tradução ${padL(v.explicacoesSemTraducao, 4)}`);
  console.log('\n10 arquivos mais rasos (aula ≥ 3; score = palavras de prosa + 3×itens):');
  for (const r of rasos) console.log(`  ${pad(`${r.curso}/${r.lingua}/${r.arquivo}`, 28)} aula ${padL(r.aula, 2)}  palavras ${padL(r.palavras, 4)}  itens ${padL(r.itens, 3)}  score ${r.score}`);
  const semCsv = Object.entries(audio).filter(([, v]) => v.semMp3ForaDoCsv || v.csvHashRuim);
  for (const [id, v] of semCsv) console.log(`  aviso áudio ${id}: ${v.semMp3ForaDoCsv} texto(s) sem MP3 e fora do CSV de gravação; ${v.csvHashRuim} linha(s) do CSV com hash que não bate.`);
  if (detalhe) for (const l of lados) for (const [k, lista] of Object.entries(l.achados)) if (lista.length) { console.log(`\n[${l.curso}/${l.lingua}] ${k} (${lista.length}, mostrando 8):`); for (const x of lista.slice(0, 8)) console.log('  ' + JSON.stringify(x)); }
}
if (falhar && (lados.some((l) => l.placeholders) || Object.values(audio).some((v) => v.semMp3))) process.exit(1);
