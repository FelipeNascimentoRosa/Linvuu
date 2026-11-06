// Regra de acesso pago da Linvuu, sem rede e sem relógio próprio (testável caso a caso em scripts/testar-acesso-calculo.ts).
// Política decidida em 05/11/2026 (docs/HOMOLOGACAO-COBRANCA.md):
//  - Pacote (3 ou 12 meses) começa quando o pagamento é CONFIRMADO, não quando o checkout foi aberto (Pix e boleto pagam depois).
//  - Pacotes somam: o segundo começa quando o primeiro termina, se for comprado antes do fim.
//  - Reembolso integral ou disputa tiram o acesso daquele pagamento; reembolso parcial mantém (é um acerto, não uma devolução).
//  - Assinatura mensal: vale enquanto o Stripe disser active/trialing. O reembolso integral de uma mensalidade cancela a
//    assinatura no Stripe (webhook, server/acesso.ts), e então ela deixa de contar aqui.
import { MESES_DO_PACOTE, type PlanoPacote } from '../src/config/planos.ts';

export type Acesso = { ativa: boolean; via: 'assinatura' | 'trimestral' | 'play' | null; status: string | null; cancelaEm: number | null; ate: number | null };

/** O mínimo de uma Checkout Session de pacote (mode=payment), já com payment_intent.latest_charge expandido. */
export type SessaoPacote = {
  id: string;
  created: number;
  payment_status: string;
  metadata?: Record<string, string> | null;
  payment_intent?: string | null | { latest_charge?: string | null | { created: number; amount: number; amount_refunded: number; refunded: boolean; disputed: boolean; status?: string } };
};
export type AssinaturaStripe = { status: string; cancel_at_period_end?: boolean; items?: { data: { current_period_end?: number }[] } };

const ehPacote = (p: unknown): p is PlanoPacote => typeof p === 'string' && p in MESES_DO_PACOTE;

/** Some meses no calendário (31/01 + 1 mês = 03/03 no Date do JS; fixamos no último dia do mês, como o Stripe faz). */
export function somarMeses(segundos: number, meses: number): number {
  const d = new Date(segundos * 1000);
  const dia = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + meses);
  const ultimo = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(dia, ultimo));
  return Math.floor(d.getTime() / 1000);
}

/** Pagamento devolvido por inteiro ou em disputa: não dá acesso. Parcial: dá. */
export function pagamentoValido(s: SessaoPacote): boolean {
  const pi = s.payment_intent;
  if (!pi || typeof pi === 'string') return true; // sem detalhe da cobrança: o status «paid» da sessão é a referência
  const ch = pi.latest_charge;
  if (!ch || typeof ch === 'string') return true;
  if (ch.disputed) return false;
  return !(ch.refunded || (ch.amount > 0 && ch.amount_refunded >= ch.amount));
}

/**
 * Quando o pagamento foi confirmado. Ordem: o instante gravado pelo webhook (evento do Stripe que confirmou o pagamento);
 * senão a criação da cobrança bem-sucedida; senão a criação da sessão (cartão confirma na hora).
 */
export function confirmadoEm(s: SessaoPacote, gravados: Record<string, number> = {}): number {
  if (Number.isFinite(gravados[s.id])) return gravados[s.id];
  const pi = s.payment_intent;
  const ch = pi && typeof pi !== 'string' ? pi.latest_charge : null;
  if (ch && typeof ch !== 'string' && Number.isFinite(ch.created)) return Math.max(ch.created, s.created);
  return s.created;
}

/** Fim do acesso por pacotes, empilhando na ordem de confirmação. */
export function fimDosPacotes(sessoes: SessaoPacote[], gravados: Record<string, number> = {}): number | null {
  const validos = sessoes
    .filter((s) => s.payment_status === 'paid' && ehPacote(s.metadata?.plano) && pagamentoValido(s))
    .map((s) => ({ inicio: confirmadoEm(s, gravados), meses: MESES_DO_PACOTE[s.metadata!.plano as PlanoPacote] }))
    .sort((a, b) => a.inicio - b.inicio);
  let fim: number | null = null;
  for (const p of validos) fim = somarMeses(fim !== null && fim > p.inicio ? fim : p.inicio, p.meses);
  return fim;
}

export function calcularAcesso(assinaturas: AssinaturaStripe[], sessoes: SessaoPacote[], agora: number, gravados: Record<string, number> = {}): Acesso {
  const s = assinaturas.find((x) => x.status === 'active' || x.status === 'trialing');
  const ate = fimDosPacotes(sessoes, gravados);
  if (s) return { ativa: true, via: 'assinatura', status: s.status, cancelaEm: s.cancel_at_period_end ? s.items?.data[0]?.current_period_end ?? null : null, ate };
  if (ate && ate > agora) return { ativa: true, via: 'trimestral', status: 'paid', cancelaEm: null, ate };
  return { ativa: false, via: null, status: null, cancelaEm: null, ate };
}

/** Uma compra nova pode ser aberta? Evita cobrar duas vezes pelo mesmo período. */
export function podeComprar(a: Acesso, plano: string): { ok: true } | { ok: false; motivo: 'ja-assinante' | 'acesso-ativo' } {
  if (a.ativa && (a.via === 'assinatura' || a.via === 'play')) return { ok: false, motivo: 'ja-assinante' };
  // Pacote ativo: pode comprar outro pacote (soma), mas não a mensal por cima do período já pago.
  if (a.ativa && a.via === 'trimestral' && plano === 'mensal') return { ok: false, motivo: 'acesso-ativo' };
  return { ok: true };
}
