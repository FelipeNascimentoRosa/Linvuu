// Casos da política de acesso pago (server/acesso-calculo.ts). Sem rede: objetos no formato do Stripe.
import assert from 'node:assert/strict';
import { calcularAcesso, fimDosPacotes, podeComprar, somarMeses, type SessaoPacote } from '../server/acesso-calculo.ts';

const dia = 86_400;
const t = (iso: string) => Math.floor(Date.parse(iso) / 1000);
const cobranca = (created: number, extra: Partial<{ amount: number; amount_refunded: number; refunded: boolean; disputed: boolean }> = {}) => ({ created, amount: 29190, amount_refunded: 0, refunded: false, disputed: false, ...extra });
const pacote = (id: string, plano: string, criada: number, pagoEm: number | null, extra = {}, pago = true): SessaoPacote => ({
  id, created: criada, payment_status: pago ? 'paid' : 'unpaid', metadata: { plano },
  payment_intent: pagoEm === null ? null : { latest_charge: cobranca(pagoEm, extra) },
});
let casos = 0;
const caso = (nome: string, f: () => void) => { f(); casos++; console.log('ok', nome); };

caso('somar meses respeita fim de mês', () => {
  assert.equal(somarMeses(t('2026-01-31T12:00:00Z'), 1), t('2026-02-28T12:00:00Z'));
  assert.equal(somarMeses(t('2026-11-05T09:00:00Z'), 3), t('2027-02-05T09:00:00Z'));
  assert.equal(somarMeses(t('2026-11-05T09:00:00Z'), 12), t('2027-11-05T09:00:00Z'));
});
caso('sem compra: sem acesso', () => assert.equal(calcularAcesso([], [], t('2026-11-05T00:00:00Z')).ativa, false));
caso('mensal ativa dá acesso', () => {
  const a = calcularAcesso([{ status: 'active' }], [], 0);
  assert.deepEqual([a.ativa, a.via], [true, 'assinatura']);
});
caso('mensal cancelada no fim do período mostra a data', () => {
  const a = calcularAcesso([{ status: 'active', cancel_at_period_end: true, items: { data: [{ current_period_end: 123 }] } }], [], 0);
  assert.equal(a.cancelaEm, 123);
});
caso('mensal cancelada/vencida/inadimplente não dá acesso', () => {
  for (const status of ['canceled', 'past_due', 'unpaid', 'incomplete', 'incomplete_expired', 'paused']) assert.equal(calcularAcesso([{ status }], [], 0).ativa, false, status);
});
caso('Pix pendente (sessão não paga) não libera', () => {
  const s = pacote('cs_1', 'trimestral-pix', t('2026-11-01T00:00:00Z'), null, {}, false);
  assert.equal(calcularAcesso([], [s], t('2026-11-02T00:00:00Z')).ativa, false);
});
caso('Pix pago dois dias depois: 3 meses contam do pagamento', () => {
  const s = pacote('cs_1', 'trimestral-pix', t('2026-11-01T10:00:00Z'), t('2026-11-03T10:00:00Z'));
  assert.equal(fimDosPacotes([s]), t('2027-02-03T10:00:00Z'));
});
caso('instante gravado pelo webhook tem prioridade', () => {
  const s = pacote('cs_1', 'trimestral', t('2026-11-01T10:00:00Z'), t('2026-11-01T10:00:00Z'));
  assert.equal(fimDosPacotes([s], { cs_1: t('2026-11-04T08:00:00Z') }), t('2027-02-04T08:00:00Z'));
});
caso('boleto pago: acesso; vencido sem pagar: nada', () => {
  const pago = pacote('cs_b', 'trimestral', t('2026-11-01T00:00:00Z'), t('2026-11-03T00:00:00Z'));
  const vencido = pacote('cs_v', 'trimestral', t('2026-11-01T00:00:00Z'), null, {}, false);
  assert.equal(calcularAcesso([], [vencido], t('2026-11-10T00:00:00Z')).ativa, false);
  assert.equal(calcularAcesso([], [pago, vencido], t('2026-11-10T00:00:00Z')).ativa, true);
});
caso('dois pacotes seguidos somam (antes o segundo apagava os dias do primeiro)', () => {
  const a = pacote('cs_a', 'trimestral-pix', t('2026-11-01T00:00:00Z'), t('2026-11-01T00:00:00Z'));
  const b = pacote('cs_b', 'trimestral', t('2026-12-01T00:00:00Z'), t('2026-12-01T00:00:00Z'));
  assert.equal(fimDosPacotes([b, a]), t('2027-05-01T00:00:00Z'));
});
caso('anual depois do trimestral vencido começa do pagamento', () => {
  const a = pacote('cs_a', 'trimestral', t('2026-01-01T00:00:00Z'), t('2026-01-01T00:00:00Z'));
  const b = pacote('cs_b', 'anual', t('2026-06-01T00:00:00Z'), t('2026-06-01T00:00:00Z'));
  assert.equal(fimDosPacotes([a, b]), t('2027-06-01T00:00:00Z'));
});
caso('reembolso integral do pacote tira o acesso', () => {
  const s = pacote('cs_r', 'anual', t('2026-11-01T00:00:00Z'), t('2026-11-01T00:00:00Z'), { amount: 99900, amount_refunded: 99900, refunded: true });
  assert.equal(calcularAcesso([], [s], t('2026-11-05T00:00:00Z')).ativa, false);
});
caso('reembolso parcial mantém o acesso', () => {
  const s = pacote('cs_p', 'anual', t('2026-11-01T00:00:00Z'), t('2026-11-01T00:00:00Z'), { amount: 99900, amount_refunded: 10000 });
  assert.equal(calcularAcesso([], [s], t('2026-11-05T00:00:00Z')).ativa, true);
});
caso('disputa suspende o acesso', () => {
  const s = pacote('cs_d', 'trimestral', t('2026-11-01T00:00:00Z'), t('2026-11-01T00:00:00Z'), { disputed: true });
  assert.equal(calcularAcesso([], [s], t('2026-11-05T00:00:00Z')).ativa, false);
});
caso('sessão sem plano de pacote (ou plano adulterado) não conta', () => {
  const s = pacote('cs_x', 'vitalicio', 0, 0);
  assert.equal(fimDosPacotes([s]), null);
});
caso('pacote expirado: sem acesso, mas informa até quando foi', () => {
  const s = pacote('cs_e', 'trimestral', t('2026-01-01T00:00:00Z'), t('2026-01-01T00:00:00Z'));
  const a = calcularAcesso([], [s], t('2026-05-01T00:00:00Z'));
  assert.deepEqual([a.ativa, a.ate], [false, t('2026-04-01T00:00:00Z')]);
});
caso('não deixa pagar duas vezes pelo mesmo período', () => {
  assert.deepEqual(podeComprar({ ativa: true, via: 'assinatura', status: 'active', cancelaEm: null, ate: null }, 'anual'), { ok: false, motivo: 'ja-assinante' });
  assert.deepEqual(podeComprar({ ativa: true, via: 'play', status: 'active', cancelaEm: null, ate: null }, 'mensal'), { ok: false, motivo: 'ja-assinante' });
  assert.deepEqual(podeComprar({ ativa: true, via: 'trimestral', status: 'paid', cancelaEm: null, ate: 1 }, 'mensal'), { ok: false, motivo: 'acesso-ativo' });
  assert.deepEqual(podeComprar({ ativa: true, via: 'trimestral', status: 'paid', cancelaEm: null, ate: 1 }, 'anual'), { ok: true });
  assert.deepEqual(podeComprar({ ativa: false, via: null, status: null, cancelaEm: null, ate: null }, 'mensal'), { ok: true });
});
console.log(`OK: ${casos} casos da política de acesso (início na confirmação, soma, reembolso, disputa, compra duplicada).`);
void dia;
