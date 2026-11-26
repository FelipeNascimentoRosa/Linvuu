#!/usr/bin/env node
// Renderiza dias de um curso em texto limpo e compacto para revisão humana/por subagente (SOMENTE LEITURA).
//   node scripts/render-revisao.mjs <curso> <lingua> <diaInicio> <diaFim>     ex.: it en 1 12
// Imprime só o que o revisor precisa: título/objetivo, explicação, comparação, exemplos, erros e exercícios
// (pergunta, opções, resposta, explicação). Sem JSON, sem ids de bloco, sem tempos.
import fs from 'node:fs';
import path from 'node:path';

const [curso, lingua, ini, fim] = process.argv.slice(2);
if (!curso || !lingua || !ini) { console.error('uso: node scripts/render-revisao.mjs <curso> <lingua> <diaInicio> [diaFim]'); process.exit(2); }
const raiz = path.resolve(import.meta.dirname, '..');
const dir = lingua === 'en' ? path.join(raiz, 'content', 'idiomas', curso, 'en') : path.join(raiz, 'content', 'idiomas', curso);
const de = Number(ini), ate = Number(fim ?? ini);
const out = [];
const L = (...x) => out.push(x.join(''));

for (let n = de; n <= ate; n++) {
  const f = path.join(dir, `dia-${String(n).padStart(3, '0')}.json`);
  if (!fs.existsSync(f)) { L(`# dia ${n}: (arquivo ausente)`); continue; }
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  L(`\n## DIA ${n} — ${d.titulo}`);
  L(`objetivo: ${d.aula?.objetivo ?? d.objetivo ?? ''}`);
  for (const b of d.sessao?.blocos ?? []) {
    if (b.tipo === 'palavras') { L(`[palavras] ` + (b.itens ?? []).map((i) => `${i.ru ?? i.audio} = ${i.pt}`).join(' | ')); continue; }
    if (b.tipo === 'dialogo') { L(`[dialogo]`); for (const l of b.linhas ?? []) L(`  ${l.ru ?? l.audio} = ${l.pt ?? ''}`); continue; }
    if (b.tipo === 'texto') { L(`[texto] ${b.ru} = ${b.pt ?? ''}`); continue; }
    if (b.tipo === 'alfabeto') { L(`[alfabeto] ` + (b.grupos ?? []).flatMap((g) => (g.letras ?? []).map((l) => `${l.nome}/${l.exemplo ?? ''}`)).join(' | ')); continue; }
    if (b.tipo === 'gramatica') {
      L(`[gramatica] ${b.titulo}`);
      if (b.explicacao) L(`  explicacao: ${b.explicacao}`);
      if (b.comparacao) L(`  comparacao: ${b.comparacao}`);
      for (const e of b.exemplos ?? []) L(`  ex: ${e.ru ?? ''}${e.pt ? ` = ${e.pt}` : ''}`);
      for (const t of b.tabela ?? []) L(`  tab: ${Object.values(t).join(' | ')}`);
      for (const e of b.erros ?? []) L(`  ERRO: ${e.errado} → ${e.certo}  (${e.motivo})`);
      continue;
    }
    if (b.tipo === 'exercicios') {
      L(`[exercicios]`);
      for (const i of b.itens ?? []) {
        const op = Array.isArray(i.opcoes) ? ` {${i.opcoes.join(' / ')}}` : '';
        const resp = i.gabarito ?? i.respostaEsperada ?? '';
        L(`  ${i.id ?? ''} ${i.tipo}: ${i.enunciado}${i.audio ? ` ♪${i.audio}` : ''}${op} => ${resp}${i.explicacao ? `  (${i.explicacao})` : ''}`);
      }
      continue;
    }
    if (b.tipo === 'producao' || b.tipo === 'revisao') { L(`[${b.tipo}] ${b.enunciado ?? ''}`); continue; }
    L(`[${b.tipo}] ${JSON.stringify(b).slice(0, 300)}`);
  }
}
process.stdout.write(out.join('\n') + '\n');
