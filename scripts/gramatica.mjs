// Monta a aba Gramática a partir dos blocos de gramática das aulas (nada é escrito duas vezes).
//   node scripts/gramatica.mjs ru  →  content/gramatica/ru.json
import fs from 'node:fs';
import path from 'node:path';
import { LINGUAS, aulaTemTraducao, fonteDe, traduzirAula } from './i18n-aulas.mjs';

const id = process.argv[2] ?? 'ru';
const raiz = path.resolve(import.meta.dirname, '..');
const dirAulas = path.join(raiz, 'content', 'idiomas', id, 'aulas');
// Categoria para blocos sem `tag` (aulas 1 a 10). Blocos novos usam gramatica(..., { tag }).
const CATEGORIAS = [
  [/c[óo]pula|profiss[ãa]o|negar com/i, 'Frase básica'], [/ty|ты.*вы|zовут|зовут/i, 'Pronomes'], [/g[êe]nero|plurais/i, 'Substantivos'],
  [/у меня есть|verbos|presente dos verbos|pedir/i, 'Verbos'], [/preposicional|acusativo|n[ãa]o tenho|нет/i, 'Casos'], [/n[úu]mero|рубль/i, 'Números'],
];
const ORDEM = ['Pronúncia', 'Frase básica', 'Substantivos', 'Adjetivos e possessivos', 'Pronomes', 'Verbos', 'Preposições', 'Advérbios', 'Perguntas', 'Números', 'Tempo', 'Aspecto e futuro', 'Verbos de movimento', 'Casos', 'Quadro dos casos', 'Comparação', 'Revisão'];
const categoria = (b) => b.tag ?? CATEGORIAS.find(([re]) => re.test(b.titulo))?.[1] ?? 'Outros';

// Uma versão por língua de explicação: a escrita (<id>.json) e as traduzidas (<id>.en.json).
// Tópicos de aulas ainda sem tradução entram na língua original, marcados com `explicacaoEm`.
if (!fs.existsSync(dirAulas)) fs.mkdirSync(dirAulas, { recursive: true });
const aulas = fs.readdirSync(dirAulas).filter((x) => /^aula-\d+\.json$/.test(x)).sort().map((f) => JSON.parse(fs.readFileSync(path.join(dirAulas, f), 'utf8')));
const CATEGORIA_TRADUZIDA = {};
function montar(l) {
  const topicos = [];
  let semTraducao = 0;
  for (const original of aulas) {
    const traduzida = l && aulaTemTraducao(id, l, original.aula);
    const a = traduzida ? traduzirAula(original, id, l).aula : original;
    if (l && !traduzida) semTraducao++;
    a.sessoes.forEach((s, i) => s.blocos.forEach((b, k) => {
      if (b.tipo !== 'gramatica') return;
      const { tipo, min, tag, ...resto } = b;
      const bo = original.sessoes[i].blocos[k];
      const cat = categoria(bo);
      if (traduzida && b.tag && b.tag !== bo.tag) (CATEGORIA_TRADUZIDA[l] ??= {})[cat] = b.tag;
      topicos.push({ id: `a${a.aula}-${s.sessao.toLowerCase()}-${k}`, categoria: cat, aula: a.aula, aulaTitulo: a.titulo, sessao: s.sessao, dia: (a.aula - 1) * 4 + i + 1, ...(l && !traduzida ? { explicacaoEm: fonteDe(id) } : {}), ...resto });
    }));
  }
  // a categoria vem da etiqueta (tag) da aula; traduzida quando alguma aula traduzida já trouxe o nome no idioma
  const nomeCat = (c) => (l && CATEGORIA_TRADUZIDA[l]?.[c]) || c;
  topicos.forEach((t) => { t.categoria = nomeCat(t.categoria); });
  const ordem = ORDEM.map(nomeCat);
  const categorias = ordem.filter((c) => topicos.some((t) => t.categoria === c)).concat([...new Set(topicos.map((t) => t.categoria))].filter((c) => !ordem.includes(c)));
  return { idioma: id, ...(l ? { explicacao: l, semTraducao } : {}), categorias, topicos };
}
fs.mkdirSync(path.join(raiz, 'content', 'gramatica'), { recursive: true });
const base = montar(null);
fs.writeFileSync(path.join(raiz, 'content', 'gramatica', `${id}.json`), JSON.stringify(base) + '\n');
console.log(`gramática (${id}): ${base.topicos.length} tópicos em ${base.categorias.length} categorias`);
for (const l of LINGUAS) {
  const arq = path.join(raiz, 'content', 'gramatica', `${id}.${l}.json`);
  if (fonteDe(id) === l || !aulas.some((a) => aulaTemTraducao(id, l, a.aula))) { fs.rmSync(arq, { force: true }); continue; }
  const p = montar(l);
  fs.writeFileSync(arq, JSON.stringify(p) + '\n');
  console.log(`gramática (${id} → ${l}): ${p.topicos.length - 0} tópicos, ${aulas.length - p.semTraducao} aulas traduzidas`);
}
