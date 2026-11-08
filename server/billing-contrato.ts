/** Contrato sem efeitos colaterais para planos do site (nunca cria cobranças nem preços). */
export const PLANOS_WEB = ['mensal', 'trimestral', 'trimestral-pix', 'anual'] as const;
/** Fora do Brasil (linvuu.com, em dólares) só existem o mensal e o anual; trimestral e Pix são só do .com.br. */
export const PLANOS_USD = ['mensal', 'anual'] as const;
export const planoUsdValido = (value: unknown): value is (typeof PLANOS_USD)[number] => typeof value === 'string' && (PLANOS_USD as readonly string[]).includes(value);
export type PlanoWeb = (typeof PLANOS_WEB)[number];

/** Validação explícita; não confiar em valores enviados pelo navegador. */
export function planoSiteValido(value: unknown): value is PlanoWeb {
  return typeof value === 'string' && (PLANOS_WEB as readonly string[]).includes(value);
}

/** Preço mensal em dólares (linvuu.com): também é um ID já criado e revisado no Stripe, nunca criado pela rota. */
export function precoMensalUsdObrigatorio(id: string | undefined): string {
  if (!id || !/^price_[A-Za-z0-9]+$/.test(id)) {
    throw new Error('STRIPE_PRICE_ID_USD ausente ou inválido: o preço mensal em dólares precisa estar configurado no Render.');
  }
  return id;
}

/** Em produção, ID criado e revisado no Stripe; a rota não pode criar preço novo silenciosamente. */
export function precoMensalObrigatorio(id: string | undefined): string {
  if (!id || !/^price_[A-Za-z0-9]+$/.test(id)) {
    throw new Error('STRIPE_PRICE_ID ausente ou inválido: confira configuração comercial no Render.');
  }
  return id;
}
