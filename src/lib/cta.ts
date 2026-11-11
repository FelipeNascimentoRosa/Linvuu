import { analytics, rotaAnalytics } from './analytics';
import { ctaValido, type Cta } from '../config/ctas';

/** Um clique vale duas medidas, e nenhuma delas guarda quem clicou:
 *  - evento `cta_clicked` no PostHog, só com consentimento (quem recusou não envia nada para fora);
 *  - contador no servidor, sem cookie, sem IP e sem identificador — o mesmo critério das visitas do lote 5, que é
 *    o que enxerga também quem recusou o aviso. É esse número que aparece em GET /api/metricas.
 *  No APK não há servidor: fica só o evento do PostHog. */
export function registrarCta(cta: Cta, caminho?: string): void {
  const rota = rotaAnalytics(caminho ?? (typeof location === 'undefined' ? '' : location.pathname));
  void analytics.capture('cta_clicked', { ...(rota ? { page: rota.page } : {}), cta });
  if (import.meta.env.VITE_ALVO === 'apk' || typeof fetch === 'undefined') return;
  try {
    void fetch('/api/cta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cta }), keepalive: true }).catch(() => {});
  } catch { /* o clique não pode falhar porque a contagem falhou */ }
}

/** Lê o identificador do botão clicado: `<button data-cta="assinatura_anual">`. Fora da lista fechada, devolve null. */
export function ctaDoAlvo(alvo: EventTarget | null): Cta | null {
  const el = alvo as Element | null;
  const v = el && typeof el.closest === 'function' ? el.closest('[data-cta]')?.getAttribute('data-cta') ?? null : null;
  return ctaValido(v) ? v : null;
}
