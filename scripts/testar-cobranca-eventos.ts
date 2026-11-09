// Do evento do Stripe ao acesso gravado, sem Stripe nem Firestore reais: um Stripe falso em memória e um registro em memória.
// Cobre: uid achado depois de reinício, instante do pagamento, Pix pendente, soma de pacotes, reembolso/disputa da mensal,
// reembolso do pacote, conversão enviada uma vez (inclusive com eventos repetidos) e reenvio após falha.
import assert from 'node:assert/strict';
import type Stripe from 'stripe';
import { criarProcessadorCobranca } from '../server/cobranca-eventos.ts';
import type { Registro } from '../server/acesso.ts';
import type { Compra } from '../server/conversoes.ts';

const t = (iso: string) => Math.floor(Date.parse(iso) / 1000);
let agora = t('2026-11-05T12:00:00Z');
const subs: { id: string; customer: string; status: string }[] = [];
const sessoes: Record<string, unknown>[] = [];
const cancelados: string[] = [];
const fake = {
  customers: { retrieve: async (id: string) => ({ id, metadata: { uid: id === 'cus_A' ? 'uid_A' : '' } }) },
  subscriptions: {
    list: async (p: { customer: string; status: string }) => ({ data: subs.filter((s) => s.customer === p.customer && (p.status === 'all' || s.status === p.status)) }),
    cancel: async (id: string) => { cancelados.push(id); const s = subs.find((x) => x.id === id)!; s.status = 'canceled'; return s; },
  },
  checkout: { sessions: { list: (p: { customer?: string; payment_intent?: string }) => {
    const data = sessoes.filter((s) => (p.customer ? s.customer === p.customer : true) && (p.payment_intent ? (s.payment_intent as { id?: string } | null)?.id === p.payment_intent : true));
    return Object.assign(Promise.resolve({ data }), { autoPagingToArray: async () => data });
  } } },
  charges: { retrieve: async (id: string) => cobrancas[id] },
} as unknown as Stripe;
const cobrancas: Record<string, Record<string, unknown>> = {};
const reg = new Map<string, Registro>();
const reservas = new Set<string>();
const compras: Compra[] = [];
let aceitar = 1;
const p = criarProcessadorCobranca({
  stripe: () => fake,
  registro: {
    ler: async (uid) => reg.get(uid) ?? null,
    gravar: async (uid, dados) => { const r = reg.get(uid) ?? { uid }; reg.set(uid, { ...r, ...dados, pagamentos: { ...(r.pagamentos ?? {}), ...(dados.pagamentos ?? {}) } }); },
    reservar: async (uid, id) => (reservas.has(uid + id) ? false : (reservas.add(uid + id), true)),
    liberar: async (uid, id) => { reservas.delete(uid + id); },
  },
  enviarCompra: async (c) => { compras.push(c); return aceitar; },
  agora: () => agora,
});
const evento = (type: string, object: object, created = agora, id = `evt_${Math.random()}`) => ({ id, type, created, data: { object } }) as unknown as Stripe.Event;
const acesso = () => reg.get('uid_A')?.acesso;
let n = 0; const ok = (m: string) => { n++; console.log('ok', m); };

// 1. Pix aberto em 01/11, pago em 03/11: sessão pendente não libera; o evento de pagamento grava o instante; 3 meses a partir dele.
const pix = { id: 'cs_pix', object: 'checkout.session', customer: 'cus_A', mode: 'payment', created: t('2026-11-01T10:00:00Z'), payment_status: 'unpaid', metadata: { plano: 'trimestral-pix', ads: '1', ph: '' }, amount_total: 29190, currency: 'brl', customer_details: { email: 'aluno@exemplo.com' }, payment_intent: { id: 'pi_pix', latest_charge: null } };
sessoes.push(pix);
await p.processarEvento('cus_A', evento('checkout.session.completed', pix, t('2026-11-01T10:05:00Z')));
assert.equal(acesso()?.ativa, false); assert.equal(compras.length, 0);
ok('Pix pendente não libera nem conta como compra (uid achado pelo cliente do Stripe, sem memória de processo)');
pix.payment_status = 'paid'; (pix.payment_intent as { latest_charge: unknown }).latest_charge = { created: t('2026-11-03T09:00:00Z'), amount: 29190, amount_refunded: 0, refunded: false, disputed: false };
await p.processarEvento('cus_A', evento('checkout.session.async_payment_succeeded', pix, t('2026-11-03T09:00:30Z')));
assert.equal(acesso()?.ativa, true);
assert.equal(acesso()?.ate, t('2027-02-03T09:00:30Z'));
ok('Pix pago: acesso por 3 meses contados da confirmação');
assert.equal(compras.length, 1); assert.equal(compras[0].valor, 291.9); assert.equal(compras[0].email, 'aluno@exemplo.com');
await p.processarEvento('cus_A', evento('checkout.session.async_payment_succeeded', pix, t('2026-11-03T09:00:30Z')));
assert.equal(compras.length, 1);
ok('compra enviada uma vez, mesmo com o evento repetido');

// 2. Segundo pacote antes do fim: soma.
const anual = { ...pix, id: 'cs_anual', created: t('2026-12-01T00:00:00Z'), payment_status: 'paid', metadata: { plano: 'anual' }, amount_total: 99900, payment_intent: { id: 'pi_anual', latest_charge: { created: t('2026-12-01T00:00:00Z'), amount: 99900, amount_refunded: 0, refunded: false, disputed: false } } };
sessoes.push(anual);
await p.processarEvento('cus_A', evento('checkout.session.completed', anual, t('2026-12-01T00:00:10Z')));
assert.equal(acesso()?.ate, t('2028-02-03T09:00:30Z'));
ok('anual comprado durante o trimestral soma 12 meses ao fim do trimestral');

// 3. Reembolso integral do anual: volta ao fim do trimestral; a mensal não é tocada.
anual.payment_intent.latest_charge = { ...anual.payment_intent.latest_charge, amount_refunded: 99900, refunded: true };
cobrancas.ch_anual = { id: 'ch_anual', customer: 'cus_A', amount: 99900, amount_refunded: 99900, refunded: true, payment_intent: 'pi_anual' };
await p.processarEvento('cus_A', evento('charge.refunded', cobrancas.ch_anual));
assert.equal(acesso()?.ate, t('2027-02-03T09:00:30Z')); assert.deepEqual(cancelados, []);
ok('reembolso integral do pacote tira só aquele período');

// 4. Mensal: reembolso parcial mantém; reembolso integral cancela a assinatura e tira o acesso (o trimestral segue valendo).
subs.push({ id: 'sub_1', customer: 'cus_A', status: 'active' });
cobrancas.ch_m = { id: 'ch_m', customer: 'cus_A', amount: 13900, amount_refunded: 2000, refunded: false, payment_intent: 'pi_m' };
await p.processarEvento('cus_A', evento('charge.refunded', cobrancas.ch_m));
assert.deepEqual(cancelados, []); assert.equal(acesso()?.via, 'assinatura');
ok('reembolso parcial da mensal não cancela');
cobrancas.ch_m = { ...cobrancas.ch_m, amount_refunded: 13900, refunded: true };
await p.processarEvento('cus_A', evento('charge.refunded', cobrancas.ch_m));
assert.deepEqual(cancelados, ['sub_1']); assert.equal(acesso()?.via, 'trimestral');
ok('reembolso integral da mensal cancela a assinatura na hora');

// 5. Disputa de mensalidade: cancela.
subs.push({ id: 'sub_2', customer: 'cus_A', status: 'active' });
cobrancas.ch_d = { id: 'ch_d', customer: 'cus_A', amount: 13900, amount_refunded: 0, refunded: false, payment_intent: 'pi_d' };
await p.processarEvento('cus_A', evento('charge.dispute.created', { id: 'dp_1', charge: 'ch_d' }));
assert.deepEqual(cancelados, ['sub_1', 'sub_2']);
ok('disputa de mensalidade cancela a assinatura');

// 6. Conversão que falhou em todos os destinos autorizados: reserva solta, a próxima entrega reenvia.
aceitar = 0;
const mensal = { id: 'cs_m', object: 'checkout.session', customer: 'cus_A', mode: 'subscription', payment_status: 'paid', metadata: { plano: 'mensal', ads: '1' }, amount_total: 13900, currency: 'brl', customer_details: { email: null }, payment_intent: null, created: agora };
await p.processarEvento('cus_A', evento('checkout.session.completed', mensal));
aceitar = 1;
await p.processarEvento('cus_A', evento('checkout.session.completed', mensal));
assert.equal(compras.filter((c) => c.id === 'cs_m').length, 2);
await p.processarEvento('cus_A', evento('checkout.session.completed', mensal));
assert.equal(compras.filter((c) => c.id === 'cs_m').length, 2);
ok('falha de envio libera nova tentativa; sucesso não repete');

// 7. Cliente sem conta Linvuu: ignorado sem erro.
await p.processarEvento('cus_X', evento('customer.subscription.updated', { id: 'sub_x', customer: 'cus_X' }));
assert.equal(reg.has(''), false);
ok('cliente do Stripe sem uid é ignorado');

// 8. Pacote expira com o tempo.
agora = t('2027-02-04T00:00:00Z');
await p.processarEvento('cus_A', evento('customer.subscription.updated', { id: 'sub_2', customer: 'cus_A' }));
assert.equal(acesso()?.ativa, false);
ok('pacote vencido deixa de dar acesso');
console.log(`OK: ${n} etapas do webhook ao acesso gravado.`);
