import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { arquivoDoAudioPrivado, raizesDoAudioPrivado } from '../server/audio-privado.ts';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'linvuu-audio-'));
const mk = (raiz: string, pasta: string, idioma: string, nome: string, texto: string) => {
  const d = path.join(tmp, raiz, pasta, idioma); fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(path.join(d, nome), texto);
};
mk('novo', 'audio-privado-v2', 'en', 'aaaaaaaa.mp3', 'v2');
mk('novo', 'audio-privado', 'en', 'aaaaaaaa.mp3', 'v1');
mk('novo', 'audio-privado', 'en', 'bbbbbbbb.mp3', 'so-v1');
mk('velho', 'audio-privado', 'de', 'cccccccc.mp3', 'legado');
const raizes = [path.join(tmp, 'novo'), path.join(tmp, 'velho')];

// A voz nova tem prioridade; o que não foi regravado cai na antiga; depois a origem de reserva.
assert.equal(fs.readFileSync(arquivoDoAudioPrivado('en', 'aaaaaaaa.mp3', raizes)!, 'utf8'), 'v2');
assert.equal(fs.readFileSync(arquivoDoAudioPrivado('en', 'bbbbbbbb.mp3', raizes)!, 'utf8'), 'so-v1');
assert.equal(fs.readFileSync(arquivoDoAudioPrivado('de', 'cccccccc.mp3', raizes)!, 'utf8'), 'legado');
assert.equal(arquivoDoAudioPrivado('en', 'dddddddd.mp3', raizes), null);
// Nomes inválidos nunca chegam ao disco (travessia de diretório, extensão, idioma).
for (const [i, a] of [['..', 'aaaaaaaa.mp3'], ['en', '../x.mp3'], ['en', 'AAAAAAAA.mp3'], ['en', 'aaaaaaaa.wav'], ['eng', 'aaaaaaaa.mp3'], ['en', 'aaaaaaaa.mp3/..']]) {
  assert.equal(arquivoDoAudioPrivado(i, a, raizes), null, `${i}/${a}`);
}
// Ordem das raízes: variável de ambiente, depois o clone do build, depois a origem antiga em server/.
const r = raizesDoAudioPrivado({ AUDIO_PRIVADO_DIR: '/x/audio' } as NodeJS.ProcessEnv, '/app');
assert.deepEqual(r.map((p) => p.replace(/\\/g, '/').replace(/^[A-Za-z]:/, '')), ['/x/audio', '/app/.audio-privado', '/app/server']);
assert.equal(raizesDoAudioPrivado({} as NodeJS.ProcessEnv, '/app').length, 2);
fs.rmSync(tmp, { recursive: true, force: true });
console.log('OK: áudio pago resolvido do repositório privado, com v2 primeiro, reserva antiga e nomes validados.');
