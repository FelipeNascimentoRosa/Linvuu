// O que acontece a cada evento de cobrança do Stripe (chamado pelo webhook, server/billing-webhook.ts).
// Dependências injetadas para os testes (scripts/testar-cobranca-eventos.ts) rodarem sem Stripe nem Firestore reais.
import type Stripe from 'stripe';
import { calcularAcesso, type Acesso, type SessaoPacote } from './acesso-calculo';
import type { Registro } from './acesso';
import type { Compra } from './conversoes';
import { MESES_DO_PACOTE } from '../src/config/planos.ts';

const PLANOS_PACOTE = Object.keys(MESES_DO_PACOTE);
const SESSAO_PAGA = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded']);

export type DepsCobranca = {
  stripe: () => Stripe;
  registro: {
    ler: (uid: string) => Promise<Registro | null>;
    gravar: (uid: string, dados: Omit<Partial<Registro>, 'uid'>) => Promise<void>;
    reservar: (uid: string, pagamento: string) => Promise<boolean>;
    liberar: (uid: string, pagamento: string) => Promise<void>;
  };
  enviarCompra: (c: Compra) => Promise<number>;
  uidConhecido?: (cliente: string) => string | undefined;
  lembrarUid?: (cliente: string, uid: string) => void;
  esquecerMemoria?: (uid: string) => void;
  agora?: () => number;
};

export function criarProcessadorCobranca(d: DepsCobranca) {
  const st = d.stripe;
  const agora = d.agora ?? (() => Math.floor(Date.now() / 1000));

  /** Relê o Stripe para um cliente, calcula o acesso (server/acesso-calculo.ts) e grava o resultado para todas as instâncias. */
  async function acessoDoCliente(uid: string, c: string): Promise<Acesso> {
    const [subs, sessoes, registro] = await Promise.all([
      st().subscriptions.list({ customer: c, status: 'all', limit: 100 }),
      st().checkout.sessions.list({ customer: c, status: 'complete', limit: 100, expand: ['data.payment_intent.latest_charge'] }).autoPagingToArray({ limit: 1000 }),
      d.registro.ler(uid),
    ]);
    const pacotes = sessoes.filter((x) => x.mode === 'payment' && PLANOS_PACOTE.includes(String(x.metadata?.plano))) as unknown as SessaoPacote[];
    const a = calcularAcesso(subs.data, pacotes, agora(), registro?.pagamentos ?? {});
    await d.registro.gravar(uid, { cliente: c, acesso: a, atualizadoEm: Date.now() });
    return a;
  }

  /** De quem é este cliente do Stripe (o uid do Firebase fica no metadata do cliente e das sessões). */
  async function uidDoCliente(clienteId: string, objeto: { client_reference_id?: string | null; metadata?: Record<string, string> | null }): Promise<string | null> {
    const conhecido = d.uidConhecido?.(clienteId) ?? objeto.client_reference_id ?? objeto.metadata?.uid;
    if (conhecido) return conhecido;
    const c = await st().customers.retrieve(clienteId);
    const uid = 'deleted' in c && c.deleted ? null : (c as Stripe.Customer).metadata?.uid ?? null;
    if (uid) d.lembrarUid?.(clienteId, uid);
    return uid;
  }

  /** Reembolso integral ou disputa de uma MENSALIDADE: cancela a assinatura já (pacotes são tratados no cálculo). */
  async function encerrarMensalDevolvida(clienteId: string, evento: Stripe.Event): Promise<void> {
    const ch = evento.type === 'charge.refunded'
      ? (evento.data.object as Stripe.Charge)
      : await st().charges.retrieve(String((evento.data.object as Stripe.Dispute).charge));
    const integral = evento.type === 'charge.dispute.created' || ch.refunded || (ch.amount > 0 && ch.amount_refunded >= ch.amount);
    if (!integral) return;
    const pi = typeof ch.payment_intent === 'string' ? ch.payment_intent : ch.payment_intent?.id;
    if (pi) {
      const s = await st().checkout.sessions.list({ payment_intent: pi, limit: 1 });
      if (s.data.some((x) => x.mode === 'payment' && PLANOS_PACOTE.includes(String(x.metadata?.plano)))) return;
    }
    const ativas = await st().subscriptions.list({ customer: clienteId, status: 'active', limit: 10 });
    for (const sub of ativas.data) await st().subscriptions.cancel(sub.id, { invoice_now: false, prorate: false });
  }

  async function registrarConversao(uid: string, s: Stripe.Checkout.Session, quando: number): Promise<void> {
    if (!(await d.registro.reservar(uid, s.id))) return;
    const metadata = (s.metadata ?? {}) as Record<string, string>;
    const enviados = await d.enviarCompra({ id: s.id, uid, plano: metadata.plano || (s.mode === 'subscription' ? 'mensal' : 'pacote'), valor: (s.amount_total ?? 0) / 100, moeda: (s.currency ?? 'brl').toUpperCase(), email: s.customer_details?.email, quando, metadata });
    // Havia destino autorizado e nenhum aceitou: solta a reserva para a próxima entrega do Stripe tentar de novo.
    if (enviados === 0 && (metadata.ads === '1' || metadata.ph)) await d.registro.liberar(uid, s.id);
  }

  /** Cada evento de cobrança: registra quando o pagamento foi confirmado, cancela a mensal reembolsada/disputada,
   * recalcula e grava o acesso, e envia a conversão da compra (uma vez). Erro aqui = 500 = o Stripe repete. */
  async function processarEvento(clienteId: string, evento: Stripe.Event): Promise<void> {
    const objeto = evento.data.object as unknown as { client_reference_id?: string | null; metadata?: Record<string, string> | null };
    const uid = await uidDoCliente(clienteId, objeto);
    if (!uid) return; // cliente sem conta Linvuu (ex.: criado à mão no painel): nada a liberar
    d.esquecerMemoria?.(uid);
    const sessao = SESSAO_PAGA.has(evento.type) ? (evento.data.object as Stripe.Checkout.Session) : null;
    if (sessao?.payment_status === 'paid' && sessao.mode === 'payment') await d.registro.gravar(uid, { pagamentos: { [sessao.id]: evento.created } });
    if (evento.type === 'charge.refunded' || evento.type === 'charge.dispute.created') await encerrarMensalDevolvida(clienteId, evento);
    await acessoDoCliente(uid, clienteId);
    if (sessao?.payment_status === 'paid') await registrarConversao(uid, sessao, evento.created);
  }

  return { processarEvento, acessoDoCliente };
}
