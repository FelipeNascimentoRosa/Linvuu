// Stripe é a fonte da verdade. A cada evento de cobrança o webhook entrega o cliente e o evento a `invalidar`, que relê o
// Stripe, grava o acesso recalculado (server/acesso.ts) e trata reembolso, disputa e conversão (server/billing.ts).
// Falha em `invalidar` responde 500: o Stripe repete a entrega.
import express, { type Express } from 'express';
import Stripe from 'stripe';

export const EVENTOS_COBRANCA = [
  'checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed',
  'customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted',
  'customer.subscription.paused', 'customer.subscription.resumed',
  'invoice.paid', 'invoice.payment_failed', 'invoice.voided', 'invoice.marked_uncollectible',
  'charge.refunded', 'charge.dispute.created', 'charge.dispute.closed',
] as const;
const eventos = new Set<string>(EVENTOS_COBRANCA);

type Objeto = { customer?: string | { id: string } | null; charge?: string | { id: string } | null };
type Dependencias = {
  stripe: Stripe | null;
  segredo: () => string | undefined;
  invalidar: (clienteId: string, evento: Stripe.Event) => void | Promise<void>;
  // Injetável nos testes; em produção usa o relógio real para expirar recibos.
  agora?: () => number;
};

/** A ausência de banco não exige recibos duráveis: repetir invalidação é seguro. */
export function registrarWebhookCobranca(app: Express, deps: Dependencias) {
  const recebidos = new Map<string, number>();
  const agora = deps.agora ?? Date.now;
  const prazo = 24 * 60 * 60 * 1000;
  app.post('/api/stripe/webhook', express.raw({ type: 'application/json', limit: '100kb' }), async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const segredo = deps.segredo();
    if (!deps.stripe || !segredo) { res.status(503).json({ error: 'Notificações de pagamento indisponíveis.' }); return; }
    const assinatura = req.headers['stripe-signature'];
    if (typeof assinatura !== 'string' || !Buffer.isBuffer(req.body)) {
      res.status(400).json({ error: 'Notificação inválida.' }); return;
    }
    let evento: Stripe.Event;
    try {
      // constructEvent também verifica o timestamp (tolerância padrão de 300 s).
      evento = deps.stripe.webhooks.constructEvent(req.body, assinatura, segredo);
    } catch {
      res.status(400).json({ error: 'Assinatura inválida.' }); return;
    }
    if (!eventos.has(evento.type)) { res.json({ received: true }); return; }
    const t = agora();
    for (const [id, ate] of recebidos) if (ate <= t) recebidos.delete(id);
    if ((recebidos.get(evento.id) ?? 0) > t) { res.json({ received: true }); return; }
    try {
      const objeto = evento.data.object as Objeto;
      let cliente = typeof objeto.customer === 'string' ? objeto.customer : objeto.customer?.id;
      // Disputas referenciam a cobrança; elas não trazem customer diretamente.
      if (!cliente && objeto.charge) {
        const id = typeof objeto.charge === 'string' ? objeto.charge : objeto.charge.id;
        const charge = await deps.stripe.charges.retrieve(id);
        cliente = typeof charge.customer === 'string' ? charge.customer : charge.customer?.id;
      }
      if (cliente) await deps.invalidar(cliente, evento);
      // Guarda só após processar; falhas transitórias voltam 500 para o Stripe tentar novamente.
      if (recebidos.size >= 10_000) recebidos.delete(recebidos.keys().next().value!);
      recebidos.set(evento.id, t + prazo);
      res.json({ received: true });
    } catch {
      // Sem payload, dados pessoais, chaves ou objetos Stripe nos logs.
      console.error('[Linvuu] Não foi possível processar notificação Stripe.');
      res.status(500).json({ error: 'Não foi possível processar a notificação.' });
    }
  });
}
