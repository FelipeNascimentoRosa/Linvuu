import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { VOCABULARIO_RUSSO } from '../src/lib/vocabulario-russo.ts';
import { audioVocabularioRusso, alfabetoParaHtml, ALFABETOS } from '../src/lib/materiais.ts';

assert.equal(VOCABULARIO_RUSSO.length, 200, 'a seleção deve conter 200 palavras');
const palavras = new Set<string>();
for (const w of VOCABULARIO_RUSSO) {
  const chave = w.txt.normalize('NFD').replace(/\u0301/g, '').toLowerCase();
  assert.ok(!palavras.has(chave), `palavra duplicada: ${w.txt}`);
  palavras.add(chave);
  assert.ok(w.pt.trim(), `tradução ausente: ${w.txt}`);
  const vogais = [...w.txt].filter((c) => /[аеёиоуыэюя]/i.test(c));
  if (vogais.length > 1) assert.ok(/[\u0301ё]/i.test(w.txt), `acento ausente: ${w.txt}`);
  assert.ok(!(/ё/i.test(w.txt) && w.txt.includes('\u0301')), `acento extra em palavra com ё: ${w.txt}`);
  const arquivo = path.join(process.cwd(), 'public', audioVocabularioRusso(w.txt).slice(1));
  assert.ok(fs.existsSync(arquivo) && fs.statSync(arquivo).size > 1000, `áudio ausente: ${w.txt}`);
}
const html = alfabetoParaHtml(ALFABETOS[0]);
assert.ok(html.includes('200 palavras em russo para o dia a dia'));
for (const w of VOCABULARIO_RUSSO) assert.ok(html.includes(w.txt), `palavra ausente do HTML: ${w.txt}`);
console.log('Vocabulário russo: 200 palavras únicas, traduções e 200 MP3; HTML pré-renderizado OK.');
