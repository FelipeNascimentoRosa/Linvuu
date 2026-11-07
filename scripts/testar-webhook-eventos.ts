import assert from 'node:assert/strict';
import { eventosFaltando } from '../server/webhook-eventos.ts';
import { EVENTOS_COBRANCA } from '../server/billing-webhook.ts';

assert.deepEqual(eventosFaltando(['*']), []);
assert.deepEqual(eventosFaltando([...EVENTOS_COBRANCA, 'outro.evento']), []);
const antigos = ['checkout.session.completed', 'customer.subscription.updated', 'invoice.paid'];
const falta = eventosFaltando(antigos);
assert.ok(falta.includes('charge.refunded') && falta.includes('charge.dispute.created'), 'reembolso e disputa são exigidos');
assert.equal(falta.length, EVENTOS_COBRANCA.length - 3);
// Reembolso e disputa são o que revoga acesso: nunca podem sair da lista.
for (const e of ['charge.refunded', 'charge.dispute.created', 'checkout.session.async_payment_succeeded', 'invoice.payment_failed']) assert.ok((EVENTOS_COBRANCA as readonly string[]).includes(e), e);
console.log('OK: lista de eventos exigidos do webhook confere e detecta os que faltam.');
