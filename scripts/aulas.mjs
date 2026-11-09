// Transforma as aulas (content/idiomas/<id>/aulas/aula-NNN.json, 4 sessões cada) em dias do curso
// (content/idiomas/<id>/dia-NNN.json, 1 sessão por dia) e gera a lista de áudios a gravar.
//   node scripts/aulas.mjs ru
import fs from 'node:fs';
import path from 'node:path';
import { LINGUAS, aulaTemTraducao, fonteDe, titulosDe, traduzirAula } from './i18n-aulas.mjs';

const id = process.argv[2] ?? 'ru';
const raiz = path.resolve(import.meta.dirname, '..');
const dirIdioma = path.join(raiz, 'content', 'idiomas', id);
const dirAulas = path.join(dirIdioma, 'aulas');
const trilha = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'trilha.json'), 'utf8'));
const pad = (n) => String(n).padStart(3, '0');
const escrever = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n');

fs.mkdirSync(dirAulas, { recursive: true });
const arquivos = fs.readdirSync(dirAulas).filter((f) => /^aula-\d+\.json$/.test(f)).sort();
const aulas = arquivos.map((f) => JSON.parse(fs.readFileSync(path.join(dirAulas, f), 'utf8')));

// 1) um dia por sessão. Cada palavra recebe `ainda`: letras que o aluno ainda não aprendeu naquele ponto do curso.
const ensinadas = new Set();
const letrasDe = (t) => [...t.matchAll(/[А-Яа-яЁё]/g)].map((m) => m[0].toLowerCase());
const anotar = (sessao) => {
  const copia = JSON.parse(JSON.stringify(sessao));
  copia.blocos = copia.blocos.map((b) => {
    if (b.tipo === 'vocabulario') b.tipo = 'palavras';
    if (b.tipo === 'alfabeto') b.grupos.forEach((g) => g.letras.forEach((l) => ensinadas.add(l.maiuscula.toLowerCase())));
    if (b.tipo === 'palavras') b.itens.forEach((i) => { const f = [...new Set(letrasDe(i.ru))].filter((c) => !ensinadas.has(c)); if (f.length) i.ainda = f.map((c) => c.toUpperCase()); });
    return b;
  });
  // a revisão fica no FIM da sessão (decisão do Felipe), mesmo que a fonte da aula a traga no começo
  copia.blocos = [...copia.blocos.filter((b) => b.tipo !== 'revisao'), ...copia.blocos.filter((b) => b.tipo === 'revisao')];
  return copia;
};
let dia = 0;
const usados = new Set();
for (const a of aulas) {
  a.sessoes.forEach((s, i) => {
    dia = (a.aula - 1) * 4 + i + 1;
    const m = trilha.dias[dia - 1] ?? { fase: Math.ceil(dia / 10), nivel: a.nivel }; // depois do dia 100 o curso continua
    escrever(path.join(dirIdioma, `dia-${pad(dia)}.json`), {
      idioma: id, dia, fase: m.fase, nivel: a.nivel ?? m.nivel, status: a.status,
      titulo: `${a.titulo}: ${s.titulo}`,
      objetivo: `Aula ${a.aula}, sessão ${i + 1} de ${a.sessoes.length} · ${s.duracaoMin} min`,
      aula: { numero: a.aula, titulo: a.titulo, objetivo: a.objetivo, sessoes: a.sessoes.length, duracaoTotalMin: a.duracaoTotalMin, nivel: a.nivel },
      sessao: anotar(s),
      origem: `content/idiomas/${id}/aulas/${arquivos[a.aula - 1]}`,
      responsavel: null,
    });
    usados.add(dia);
  });
}

// 1b) as mesmas sessões com a explicação em inglês e espanhol (content/idiomas/<id>/<en|es>/dia-NNN.json), para as aulas já traduzidas.
// Aulas sem tradução não geram arquivo: o site mostra a versão escrita e avisa o aluno.
const OBJETIVO = { en: (a, i, t, m) => `Lesson ${a}, session ${i} of ${t} · ${m} min`, es: (a, i, t, m) => `Lección ${a}, sesión ${i} de ${t} · ${m} min` };
for (const l of LINGUAS) {
  if (fonteDe(id) === l) continue;
  const dirL = path.join(dirIdioma, l);
  // GUARDA (2026-11-04): o passo seguinte apaga a pasta inteira e regenera só as aulas com mapa i18n.
  // Se houver mais dias em disco do que os mapas conseguem regenerar, são traduções servidas sem mapa —
  // apagar seria destruição de conteúdo publicado. Recusa ANTES do rmSync; nada é apagado.
  // Para repor os mapas a partir dos dias servidos: node scripts/restaurar-mapas-i18n.mjs <curso> <língua>.
  const emDisco = fs.existsSync(dirL) ? fs.readdirSync(dirL).filter((f) => /^dia-\d+\.json$/.test(f)).length : 0;
  const regeraveis = aulas.reduce((n, a) => n + (aulaTemTraducao(id, l, a.aula) ? a.sessoes.length : 0), 0);
  if (emDisco > regeraveis) throw new Error(`GUARDA aulas.mjs — ${id}/${l}: ${emDisco} dias traduzidos em disco, mas os mapas i18n só regeneram ${regeraveis}. Há traduções servidas sem mapa por aula em content/idiomas/${id}/i18n/${l}/. Reponha os mapas (scripts/restaurar-mapas-i18n.mjs ${id} ${l}) ou remova a pasta deliberadamente. Nada foi apagado.`);
  fs.rmSync(dirL, { recursive: true, force: true });
  const titulos = titulosDe(id, l);
  let n = 0;
  ensinadas.clear();
  for (const original of aulas) {
    if (!aulaTemTraducao(id, l, original.aula)) { original.sessoes.forEach((s) => anotar(s)); continue; } // mantém o registro das letras ensinadas
    const { aula: a, faltam } = traduzirAula(original, id, l);
    if (faltam.length) console.warn(`aviso ${id}/${l} aula ${a.aula}: ${faltam.length} textos de explicação sem tradução (ex.: «${faltam[0].slice(0, 60)}»)`);
    fs.mkdirSync(dirL, { recursive: true });
    a.sessoes.forEach((s, i) => {
      const d = (a.aula - 1) * 4 + i + 1;
      const m = trilha.dias[d - 1] ?? { fase: Math.ceil(d / 10), nivel: a.nivel };
      escrever(path.join(dirL, `dia-${pad(d)}.json`), {
        idioma: id, explicacao: l, dia: d, fase: m.fase, nivel: a.nivel ?? m.nivel, status: a.status,
        titulo: `${titulos[original.titulo] ?? a.titulo}: ${titulos[original.sessoes[i].titulo] ?? s.titulo}`,
        objetivo: OBJETIVO[l](a.aula, i + 1, a.sessoes.length, s.duracaoMin),
        aula: { numero: a.aula, titulo: titulos[original.titulo] ?? a.titulo, objetivo: a.objetivo, sessoes: a.sessoes.length, duracaoTotalMin: a.duracaoTotalMin, nivel: a.nivel },
        sessao: anotar(s),
        origem: `content/idiomas/${id}/aulas/${arquivos[a.aula - 1]}`,
        responsavel: null,
      });
      n++;
    });
  }
  if (n) console.log(`${id} → ${l}: ${n} sessões traduzidas`);
}

// 2) dias do material antigo que sobraram (mapeamento por aulas do roteiro antigo) voltam ao texto-mestre
let limpos = 0;
for (const f of fs.readdirSync(dirIdioma).filter((x) => /^dia-\d+\.json$/.test(x))) {
  const n = Number(f.match(/\d+/)[0]);
  if (usados.has(n)) continue;
  const d = JSON.parse(fs.readFileSync(path.join(dirIdioma, f), 'utf8'));
  if (!d.fonte || !String(d.fonte).includes('legado')) continue;
  const m = trilha.dias[n - 1];
  escrever(path.join(dirIdioma, f), {
    idioma: id, dia: n, fase: m.fase, nivel: m.nivel, status: 'planejada', titulo: m.titulo, objetivo: m.objetivo,
    comeceAqui: { status: 'pendente', audio: null, palavras: [] },
    imersao: { status: 'pendente', texto: null, audio: null, vocabulario: [] },
    pratica: { status: 'pendente', exercicios: [] },
    videoApoio: { status: 'nenhum', url: null, motivo: null },
    responsavel: null,
  });
  limpos++;
}

// 3) lista de áudios (texto único → arquivo nomeado pelo hash do texto).
// O acento tônico (U+0301) é só gráfico: não entra no hash nem na fala, para o nome do arquivo não mudar quando o acento for colocado.
const textoParaAudio = (t) => t.normalize('NFC').replace(/\u0301/g, '').trim();
const hash = (t) => { let h = 0x811c9dc5; for (const c of Buffer.from(textoParaAudio(t), 'utf8')) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const arquivoVozes = path.join(dirIdioma, 'vozes.json');
const vozes = fs.existsSync(arquivoVozes) ? JSON.parse(fs.readFileSync(arquivoVozes, 'utf8')) : { padrao: 'm', personagens: {} };
const desconhecidos = new Set();
const vozDe = (personagem) => { const v = vozes.personagens[personagem]; if (!v) desconhecidos.add(personagem); return v ?? vozes.padrao; };
const textos = new Map();
const add = (t, onde, voz = vozes.padrao) => { if (!t) return; const k = textoParaAudio(t); if (!textos.has(k)) textos.set(k, { onde, usos: 0, voz }); textos.get(k).usos++; };
for (const a of aulas) for (const s of a.sessoes) for (const b of s.blocos) {
  const onde = `aula ${a.aula} ${s.sessao} ${b.tipo}`;
  if (b.tipo === 'alfabeto') b.grupos.forEach((g) => g.letras.forEach((l) => { add(l.exemplo, onde); add(l.nome, onde); }));
  if (b.tipo === 'palavras' || b.tipo === 'vocabulario') b.itens.forEach((i) => add(i.audio ?? i.ru, onde));
  if (b.tipo === 'dialogo') b.linhas.forEach((l) => add(l.audio, onde, vozDe(l.personagem)));
  if (b.tipo === 'texto') add(b.ru, onde);
  if (b.tipo === 'gramatica') (b.exemplos ?? []).forEach((e) => add(e.ru.replace(/\s*\(.*?\)\s*$/, ''), onde));
  if (b.tipo === 'exercicios') b.itens.forEach((i) => add(i.audio, onde));
}
if (desconhecidos.size) console.warn(`aviso: personagens sem voz em ${path.relative(raiz, arquivoVozes)}: ${[...desconhecidos].join(', ')} (usando "${vozes.padrao}")`);
const colisoes = new Map();
for (const t of textos.keys()) { const h = hash(t); colisoes.set(h, [...(colisoes.get(h) ?? []), t]); }
if ([...colisoes.values()].some((v) => v.length > 1)) { console.error('colisão de hash entre textos'); process.exit(1); }
fs.mkdirSync(path.join(raiz, 'content', 'audio'), { recursive: true });
const csv = ['arquivo,texto,voz,primeiro_uso,vezes_usado', ...[...textos].map(([t, v]) => `${hash(t)}.mp3,"${t.replace(/"/g, '""')}",${v.voz},${v.onde},${v.usos}`)].join('\n') + '\n';
fs.writeFileSync(path.join(raiz, 'content', 'audio', `${id}-gravar.csv`), csv);
console.log(`${aulas.length} aulas → ${usados.size} dias; ${limpos} dias do material antigo voltaram ao texto-mestre; ${textos.size} áudios a gravar`);
