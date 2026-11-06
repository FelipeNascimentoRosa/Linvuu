// Quais eventos o endpoint do Stripe precisa receber. A lista vem de EVENTOS_COBRANCA (a mesma que o webhook processa),
// então o que o código espera e o que o roteiro manda marcar no painel não podem divergir.
import { EVENTOS_COBRANCA } from './billing-webhook';

/** Eventos que o código trata e o endpoint não entrega ('*' no endpoint cobre todos). */
export function eventosFaltando(habilitados: readonly string[]): string[] {
  if (habilitados.includes('*')) return [];
  const tem = new Set(habilitados);
  return EVENTOS_COBRANCA.filter((e) => !tem.has(e));
}
