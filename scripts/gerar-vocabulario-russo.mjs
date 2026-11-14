// Exporta uma lista de trabalho para a síntese local; não altera os MP3 do curso.
import { VOCABULARIO_RUSSO } from '../src/lib/vocabulario-russo.ts';
import fs from 'node:fs';
import path from 'node:path';

const destino = process.argv[2];
if (!destino) throw new Error('Informe o caminho do JSON de trabalho.');
const hash = (txt) => {
  let h = 0x811c9dc5;
  for (const c of new TextEncoder().encode(txt.normalize('NFC').replace(/\u0301/g, '').trim())) h = Math.imul(h ^ c, 0x01000193) >>> 0;
  return h.toString(16).padStart(8, '0');
};
const vistos = new Set();
const trabalhos = VOCABULARIO_RUSSO.map(({ txt, pt }) => {
  const arquivo = `${hash(txt)}.mp3`;
  if (vistos.has(arquivo)) throw new Error(`Palavra repetida ou colisão de hash: ${txt}`);
  vistos.add(arquivo);
  // Vosk aceita + antes da vogal tônica. A letra ё já é tônica por natureza.
  const sintese = txt.normalize('NFD').replace(/([аеиоуыэюя])\u0301/gi, '+$1').normalize('NFC');
  return { txt, pt, arquivo, sintese };
});
fs.mkdirSync(path.dirname(path.resolve(destino)), { recursive: true });
fs.writeFileSync(destino, JSON.stringify(trabalhos, null, 2) + '\n');
console.log(`${trabalhos.length} palavras preparadas`);
