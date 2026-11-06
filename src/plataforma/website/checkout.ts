import { LOCALE, T } from '../../i18n';
import { carregarAuth } from '../../lib/firebase';
import { api } from '../../lib/api';
import { Capacitor } from '@capacitor/core';
import { ANALYTICS_ID, analytics } from '../../lib/analytics';
import { metaPixel } from '../../lib/metaPixel';
import { tiktokPixel } from '../../lib/tiktokPixel';

/** No app nativo a compra fica desligada até a decisão de cobrança pela loja (Google Play / App Store). Veja docs/APP.md. */
export const compraNoAppDisponivel = () => !Capacitor.isNativePlatform();

async function chamar(caminho: string, metodo: 'GET' | 'POST', corpo?: object) {
  const { auth } = await carregarAuth();
  const token = await auth.currentUser?.getIdToken();
  const r = await fetch(api(`/api/billing/${caminho}`), { method: metodo, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(corpo ? { 'Content-Type': 'application/json' } : {}) }, body: corpo ? JSON.stringify(corpo) : undefined });
  const j = await r.json().catch(() => ({}));
  // a mensagem sai no idioma do site (o servidor responde em português)
  if (!r.ok) throw new Error(r.status === 409 ? T.erros.jaTemAcesso : r.status === 401 ? T.erros.entreConta : r.status === 503 ? T.erros.pagamentoIndisponivel : r.status === 429 ? T.erros['auth/too-many-requests'] : T.erros.padrao);
  return j;
}

export type Plano = 'mensal' | 'trimestral' | 'trimestral-pix' | 'anual';

const cookie = (nome: string) => document.cookie.split('; ').find((c) => c.startsWith(nome + '='))?.slice(nome.length + 1);
/** O que a compra leva para a medição feita no servidor: só o que a pessoa autorizou (análise e/ou publicidade). */
function medicao() {
  const ph = analytics.choice() === 'yes' ? (() => { try { return localStorage.getItem(ANALYTICS_ID) ?? undefined; } catch { return undefined; } })() : undefined;
  const anuncios = metaPixel.choice() === 'yes';
  return { ...(ph ? { ph } : {}), anuncios, ...(anuncios ? { fbp: cookie('_fbp'), fbc: cookie('_fbc'), ttp: cookie('_ttp') } : {}) };
}
export async function abrir(tipo: 'checkout' | 'portal', plano?: Plano) {
  if (!compraNoAppDisponivel()) throw new Error(T.erros.compraApp);
  const idioma = LOCALE.explicacao === 'pt' ? undefined : LOCALE.explicacao;
  const j = await chamar(tipo, 'POST', { ...(plano ? { plano } : {}), ...(idioma ? { idioma } : {}), ...(tipo === 'checkout' ? { medicao: medicao() } : {}) });
  if (j.url) {
    if (tipo === 'checkout') { void analytics.capture('checkout_started', { page: 'plans', billing_plan: plano }); metaPixel.checkout(); tiktokPixel.checkout(); }
    window.location.href = j.url;
  }
}

export { useAssinatura } from '../../lib/acesso';
export type { Assinatura } from '../../lib/acesso';

