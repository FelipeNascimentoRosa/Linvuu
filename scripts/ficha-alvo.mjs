#!/usr/bin/env node
// Ficha limpa da língua-alvo de UMA aula — o único insumo permitido para escrever uma aula nova do .com (L1 inglesa).
//
//   node scripts/ficha-alvo.mjs <curso> <aula>          imprime a ficha em Markdown
//   node scripts/ficha-alvo.mjs <curso> <aula> --json   o mesmo em JSON
//
// A ficha traz SOMENTE: número da aula, dias, nível CEFR, título curto em inglês (de i18n/en/titulos.json, quando existir)
// e o INVENTÁRIO na língua-alvo com o hash FNV-1a do MP3 de cada texto (mesma regra de scripts/aulas.mjs e src/lib/audio.ts).
// NÃO traz (e o script falha se vazar): explicações, comparações, listas de erros, distratores, glosas, pronúncia aproximada
// nem qualquer texto em português. Quem escreve a aula .com parte daqui e da gramática do inglês, nunca do curso brasileiro.
// Ver CLAUDE.md («Lei do .com») e docs/linvuu-10-de-10/02-pedagogia-qa.md.
import fs from 'node:fs';
import path from 'node:path';
import { percorrer, titulosDe } from './i18n-aulas.mjs';

const raiz = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const json = process.argv.includes('--json');
const [id, aulaStr] = args;
const n = Number(aulaStr);
if (!id || !Number.isInteger(n) || n < 1) { console.error('uso: node scripts/ficha-alvo.mjs <curso> <aula> [--json]'); process.exit(1); }
if (id === 'br') { console.error('ficha-alvo: o curso `br` já é escrito em inglês; a ficha serve aos cursos cuja fonte está em português.'); process.exit(1); }
const arq = path.join(raiz, 'content', 'idiomas', id, 'aulas', `aula-${String(n).padStart(3, '0')}.json`);
if (!fs.existsSync(arq)) { console.error(`ficha-alvo: não existe ${path.relative(raiz, arq)}`); process.exit(1); }
const aula = JSON.parse(fs.readFileSync(arq, 'utf8'));

const textoParaAudio = (t) => t.normalize('NFC').replace(/́/g, '').trim();
const hash = (t) => { let h = 0x811c9dc5; for (const c of new TextEncoder().encode(textoParaAudio(t))) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };

const arquivoVozes = path.join(raiz, 'content', 'audio', `${id}-vozes.json`);
const vozes = fs.existsSync(arquivoVozes) ? JSON.parse(fs.readFileSync(arquivoVozes, 'utf8')) : { padrao: 'm', personagens: {} };
const titulos = titulosDe(id, 'en');
const tituloEn = (t) => (typeof titulos[t] === 'string' && titulos[t] ? titulos[t] : null);

// Mesmas regras de inventário de scripts/aulas.mjs: o que gera botão de áudio.
const trilha = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'trilha.json'), 'utf8'));
const item = (t, extra = {}) => (t ? { texto: textoParaAudio(t), hash: hash(t), ...extra } : null);
const sessoes = aula.sessoes.map((s, i) => {
  const inv = [];
  const falantes = new Map();
  for (const b of s.blocos) {
    if (b.tipo === 'alfabeto') b.grupos.forEach((g) => g.letras.forEach((l) => { const L = `${l.maiuscula ?? ''}${l.minuscula ?? ''}`; inv.push(item(l.exemplo, { bloco: 'alfabeto', letra: L, ipa: l.ipa }), item(l.nome, { bloco: 'alfabeto', letra: L, ipa: l.ipa })); }));
    if (b.tipo === 'palavras' || b.tipo === 'vocabulario') b.itens.forEach((x) => inv.push(item(x.audio ?? x.ru, { bloco: 'palavras' })));
    if (b.tipo === 'dialogo') b.linhas.forEach((l) => {
      if (!falantes.has(l.personagem)) falantes.set(l.personagem, `Speaker ${String.fromCharCode(65 + falantes.size)}`);
      inv.push(item(l.audio, { bloco: 'dialogo', falante: falantes.get(l.personagem), voz: vozes.personagens[l.personagem] ?? vozes.padrao }));
    });
    if (b.tipo === 'texto') inv.push(item(b.ru, { bloco: 'texto' }));
    if (b.tipo === 'gramatica') (b.exemplos ?? []).forEach((e) => inv.push(item(e.ru.replace(/\s*\(.*?\)\s*$/, ''), { bloco: 'exemplo' })));
    if (b.tipo === 'exercicios') b.itens.forEach((x) => inv.push(item(x.audio, { bloco: 'exercicio' })));
  }
  const vistos = new Set();
  const unico = inv.filter((x) => x && !vistos.has(x.hash) && vistos.add(x.hash));
  const dia = (n - 1) * 4 + i + 1;
  return { sessao: s.sessao, dia, fase: trilha.dias[dia - 1]?.fase ?? Math.ceil(dia / 10), nivel: aula.nivel ?? null, duracaoMin: s.duracaoMin, status: aula.status ?? null, titulo: tituloEn(s.titulo), inventario: unico };
});
const ficha = { curso: id, aula: n, nivel: aula.nivel ?? null, tituloEn: tituloEn(aula.titulo), dias: sessoes.map((s) => s.dia), sessoes };

const saida = json ? JSON.stringify(ficha, null, 1) : [
  `# Ficha-alvo — ${id} · aula ${n} · ${String(ficha.nivel ?? '').toUpperCase() || 'CEFR n/d'}`,
  `Title (English): ${ficha.tituloEn ?? '(none yet: write one in English)'}`,
  `Days: ${ficha.dias.join(', ')}. Write every explanation, comparison, error list, distractor and pronunciation note in English from an English speaker's grammar. Do not read the Portuguese course.`,
  ...sessoes.flatMap((s) => ['', `## Day ${s.dia} (${s.sessao}) — ${s.titulo ?? '(write a title in English)'}`, `Metadata (copy as is): fase=${s.fase} nivel=${s.nivel} duracaoMin=${s.duracaoMin} status=${s.status}`, `Audio inventory (${s.inventario.length}) — hash = MP3 name; keep every sentence below exactly as written:`,
    ...s.inventario.map((x) => `- ${x.hash} · ${x.bloco}${x.falante ? ` · ${x.falante}/${x.voz}` : ''}${x.letra ? ` · letter ${x.letra} ${x.ipa ?? ''}` : ''} · ${x.texto}`)]),
].join('\n');

// Trava: nenhuma explicação em português pode ter vazado para a saída.
const proibidos = new Set();
percorrer(JSON.parse(JSON.stringify(aula)), (t, tipo) => { if (tipo === 'explicacao' && t.trim().length >= 12) proibidos.add(t.trim().toLowerCase()); });
const baixa = saida.toLowerCase();
// glosas iguais ao texto-alvo (ex.: «argentina») não são vazamento: já estão no inventário
const CAMPOS_ALVO = new Set(['ru', 'audio', 'exemplo', 'nome', 'maiuscula', 'minuscula', 'personagem', 'gabarito', 'respostaEsperada', 'certo', 'errado']);
const alvoTxt = [];
(function varre(o, k) { if (typeof o === 'string') { if (CAMPOS_ALVO.has(k)) alvoTxt.push(o.toLowerCase()); } else if (Array.isArray(o)) o.forEach((x) => varre(x, k)); else if (o && typeof o === 'object') for (const [kk, v] of Object.entries(o)) varre(v, kk); })(aula, '');
alvoTxt.push(...sessoes.flatMap((x) => x.inventario.map((i) => i.texto.toLowerCase())));
const alvoBlob = alvoTxt.join(' | ');
// só é vazamento se o trecho em português não existir também como texto-alvo da aula (títulos de diálogo/texto, glosas iguais à palavra italiana)
const MARCA_PT = /[ãõ]|\b(você|não|são|está)\b/i;
const vazou = [...proibidos].filter((t) => !alvoBlob.includes(t) && baixa.includes(t) && MARCA_PT.test(t));
// fora do inventário-alvo (linhas «- hash · …»), a ficha só tem inglês: qualquer marcador de português é erro
const foraDoInventario = json ? '' : saida.split(/\r?\n/).filter((l) => !l.startsWith('- ')).join(' ');
if (MARCA_PT.test(foraDoInventario)) { console.error('ficha-alvo: marcador de português fora do inventário.'); process.exit(2); }
if (vazou.length) { console.error(`ficha-alvo: ${vazou.length} texto(s) de explicação em português vazaram para a ficha (ex.: «${vazou[0].slice(0, 60)}»). Corrija o script.`); process.exit(2); }
console.log(saida);
