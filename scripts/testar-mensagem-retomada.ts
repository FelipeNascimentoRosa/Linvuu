// A mensagem de retomada só descreve sessões marcadas; nunca domínio, sequência ou nível.
import assert from 'node:assert/strict';
import { textoRetomada } from '../src/lib/mensagemRetomada';

const proibidas = /dominio|domínio|sequência|streak|nível|parabéns|fluente|aprendeu/i;
const casos: [number, number][] = [[0, 40], [1, 40], [7, 40], [40, 40], [-3, 40], [99, 40]];
for (const [f, t] of casos) {
  const r = textoRetomada(f, t);
  assert.ok(!proibidas.test(r.frase + r.contagem), `sem promessa de domínio em ${f}/${t}`);
}
assert.equal(textoRetomada(0, 40).contagem, 'Nenhuma sessão marcada ainda');
assert.equal(textoRetomada(1, 40).contagem, '1 de 40 sessão marcada');
assert.equal(textoRetomada(7, 40).contagem, '7 de 40 sessões marcadas');
assert.equal(textoRetomada(99, 40).contagem, '40 de 40 sessões marcadas', 'contagem nunca passa do total');
assert.equal(textoRetomada(-3, 40).contagem, 'Nenhuma sessão marcada ainda');
console.log('ok: mensagem de retomada sem promessa de domínio');
