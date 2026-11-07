/** Regras puras da assinatura pelo Google Play (sem SDK nem DOM), para teste em Node.
 *  O preço vem sempre da loja (priceString do Google Play), nunca de constante do app. */
export type Locale = 'pt-BR' | 'en';

/** Modo de produção: só no Android nativo, com modo explícito e chave pública Android do RevenueCat (goog_). */
export function configuracaoPlay(modo: string | undefined, chave: string | undefined, nativo: boolean) {
  return modo === 'google-play' && !!chave?.startsWith('goog_') && nativo;
}

const UNIDADES: Record<string, Record<Locale, [string, string]>> = {
  D: { 'pt-BR': ['dia', 'dias'], en: ['day', 'days'] },
  W: { 'pt-BR': ['semana', 'semanas'], en: ['week', 'weeks'] },
  M: { 'pt-BR': ['mês', 'meses'], en: ['month', 'months'] },
  Y: { 'pt-BR': ['ano', 'anos'], en: ['year', 'years'] },
};

/** "P1M" → "1 mês"; "P3M" → "3 meses". Formato desconhecido → null (a tela não inventa período). */
export function duracao(iso: string | null | undefined, l: Locale): string | null {
  const m = /^P(\d{1,3})([DWMY])$/.exec(iso ?? '');
  if (!m) return null;
  const n = Number(m[1]), [um, varios] = UNIDADES[m[2]][l];
  return `${n} ${n === 1 ? um : varios}`;
}

/** Frequência de cobrança: "por mês", "a cada 3 meses". */
export function frequencia(iso: string | null | undefined, l: Locale): string | null {
  const m = /^P(\d{1,3})([DWMY])$/.exec(iso ?? '');
  if (!m) return null;
  const n = Number(m[1]), [um] = UNIDADES[m[2]][l];
  if (n === 1) return { 'pt-BR': `por ${um}`, en: `per ${um}`  }[l];
  return { 'pt-BR': `a cada ${duracao(iso, l)}`, en: `every ${duracao(iso, l)}`  }[l];
}

interface Fase { billingPeriod: { iso8601: string }; billingCycleCount: number | null; price: { formatted: string; amountMicros: number } }
export interface ProdutoLoja { priceString: string; subscriptionPeriod: string | null; defaultOption?: { freePhase: Fase | null; introPhase: Fase | null } | null }

/** O que a tela precisa mostrar antes da compra (política de assinaturas da Play: preço, frequência e oferta inicial claros). */
export function resumoOferta(p: ProdutoLoja, l: Locale): { preco: string; frequencia: string; inicial: string | null } | null {
  const f = frequencia(p.subscriptionPeriod, l);
  if (!f || !p.priceString) return null; // sem período claro, não vende
  const gratis = p.defaultOption?.freePhase, intro = p.defaultOption?.introPhase;
  let inicial: string | null = null;
  if (gratis) {
    const d = duracao(gratis.billingPeriod.iso8601, l);
    if (d) inicial = { 'pt-BR': `${d} grátis; depois, ${p.priceString} ${f}.`, en: `${d} free, then ${p.priceString} ${f}.`  }[l];
  } else if (intro) {
    const d = duracao(intro.billingPeriod.iso8601, l), ciclos = intro.billingCycleCount ?? 1;
    if (d) inicial = { 'pt-BR': `${intro.price.formatted} por ${d}${ciclos > 1 ? ` (${ciclos} vezes)` : ''}; depois, ${p.priceString} ${f}.`, en: `${intro.price.formatted} for ${d}${ciclos > 1 ? ` (${ciclos} times)` : ''}, then ${p.priceString} ${f}.`  }[l];
  }
  return { preco: p.priceString, frequencia: f, inicial };
}

/** Página de assinaturas do Google Play para este app (é da loja, não é pagamento externo). */
export const linkGerenciarPlay = (pacote: string, produto?: string | null) =>
  `https://play.google.com/store/account/subscriptions?package=${encodeURIComponent(pacote)}${produto ? `&sku=${encodeURIComponent(produto.split(':')[0])}` : ''}`;
