// Testa a validação dos eventos e as contas do relatório de métricas (sem Firestore). Uso: npx tsx scripts/testar-medicao.ts
import assert from 'node:assert/strict';
import { agregar, validar } from '../server/medicao.ts';
import { funilPorDia, idFunil } from '../server/funil.ts';

const id = 'a'.repeat(32);
assert.ok(validar({ id, eventos: [{ t: 'ex', idioma: 'en', ex: 'en-018-e01', tp: 'multiple-choice', ok: 1 }, { t: 'fim', idioma: 'en', aula: 18, ac: 30, tot: 40 }] }));
assert.equal(validar({ id: 'curto', eventos: [] }), null);
assert.equal(validar({ id, eventos: [{ t: 'ex', idioma: 'en', ex: '../../x', tp: 'a', ok: 1 }] }), null, 'id de exercício fora do padrão');
assert.equal(validar({ id, eventos: [{ t: 'fim', idioma: 'en', aula: 1, ac: 9, tot: 3 }] }), null, 'acertos maiores que o total');
assert.equal(validar({ id, eventos: [{ t: 'ex', idioma: 'en', ex: 'en-001-e01', tp: 'fill-gap', ok: 1, email: 'a@b.c' }] })?.eventos[0].hasOwnProperty('email'), false, 'campos extras são descartados');
assert.equal(validar({ id, eventos: Array(61).fill({ t: 'fim', idioma: 'en', aula: 1, ac: 1, tot: 1 }) }), null, 'lote grande demais');

const L = (u: string, d: string, t: string, extra = {}) => ({ u, d, t, idioma: 'en', ...extra });
const r = agregar([
  ...Array.from({ length: 5 }, (_, i) => L('a', '2026-11-05', 'ex', { ex: `en-001-e0${i}`, tp: 'multiple-choice', ok: i < 2 ? 1 : 0 })),
  L('a', '2026-11-05', 'fim', { aula: 1, ac: 2, tot: 5 }),
  ...Array.from({ length: 5 }, (_, i) => L('a', '2026-11-06', 'ex', { ex: `en-002-e0${i}`, tp: 'multiple-choice', ok: i < 4 ? 1 : 0 })),
  L('b', '2026-11-05', 'ex', { ex: 'en-001-e00', tp: 'fill-gap', ok: 0 }),
], '2026-11-20');
assert.equal(r.usuarios, 2);
assert.equal(r.comSessaoCompleta.n, 1);
assert.equal(r.retornoDia1.pct, 50);
assert.equal(r.retornoSemana.pct, 50);
assert.equal(r.acertoPrimeiroVsUltimoDia.melhoraram, 1);
assert.equal(r.ativosPorDia['2026-11-05'], 2);

// Funil do servidor (lote 4): 28 dias x 5 números, sem dado pessoal.
const agora = Date.parse('2026-11-20T12:00:00Z');
const f = funilPorDia(
  [{ e: 'sessao_1', d: '2026-11-20' }, { e: 'sessao_1', d: '2026-11-20' }, { e: 'sessao_8', d: '2026-11-19' }, { e: 'checkout_aberto', d: '2026-11-20' }, { e: 'checkout_pago', d: '2026-11-20' }, { e: 'sessao_1', d: '2026-01-01' }],
  [Date.parse('2026-11-20T01:00:00Z'), Date.parse('2026-11-19T23:00:00Z'), Date.parse('2026-01-01T00:00:00Z')],
  28, agora,
);
assert.equal(f.length, 28, '28 dias');
assert.equal(f[27].dia, '2026-11-20');
assert.equal(f[0].dia, '2026-10-24');
assert.deepEqual(f[27], { dia: '2026-11-20', contas: 1, sessao1: 2, sessao8: 0, checkoutsAbertos: 1, checkoutsPagos: 1 });
assert.deepEqual(f[26], { dia: '2026-11-19', contas: 1, sessao1: 0, sessao8: 1, checkoutsAbertos: 0, checkoutsPagos: 0 });
assert.equal(f.reduce((n, d) => n + d.sessao1, 0), 2, 'evento fora da janela não conta');
const h = idFunil('sessao_1', 'uid-secreto-123');
assert.match(h, /^[a-f0-9]{32}$/);
assert.ok(!h.includes('uid-secreto'), 'o ID do documento é hash, não o uid');
assert.notEqual(h, idFunil('sessao_8', 'uid-secreto-123'), 'tipos diferentes, documentos diferentes');
assert.equal(h, idFunil('sessao_1', 'uid-secreto-123'), 'mesmo aluno, mesmo documento (conta uma vez)');
console.log('ok: medição');
