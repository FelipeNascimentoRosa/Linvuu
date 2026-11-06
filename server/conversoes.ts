// Compra confirmada → PostHog, Meta (Conversions API) e TikTok (Events API), a partir do servidor (webhook do Stripe).
// Por que no servidor: a volta do checkout não prova pagamento (Pix e boleto pagam depois) e bloqueadores cortam pixels.
// Consentimento: a escolha do visitante segue no metadata da Checkout Session (lerMedicao/validarMedicao). Sem o «sim» para
// publicidade, nada vai para Meta/TikTok; sem identificador de análise (só existe com o «sim» para análise), nada vai ao PostHog.
// Sem as variáveis de ambiente de cada destino, aquele envio simplesmente não acontece.
import crypto from 'node:crypto';

export type Medicao = { ph?: string; ads?: '1' | '0'; fbp?: string; fbc?: string; ttp?: string; ip?: string; ua?: string };

/** Valida o que o navegador manda no checkout. Nada de texto livre: formatos fixos e tamanhos limitados. */
export function validarMedicao(corpo: unknown, ip: string | undefined, ua: string | undefined): Medicao {
  const m: Medicao = {};
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return m;
  const b = corpo as Record<string, unknown>;
  if (typeof b.ph === 'string' && /^[a-f0-9-]{36}$/.test(b.ph)) m.ph = b.ph;
  if (b.anuncios === true) {
    m.ads = '1';
    if (typeof b.fbp === 'string' && /^fb\.\d\.\d{10,16}\.\d{1,20}$/.test(b.fbp)) m.fbp = b.fbp;
    if (typeof b.fbc === 'string' && /^fb\.\d\.\d{10,16}\.[\w-]{1,300}$/.test(b.fbc)) m.fbc = b.fbc;
    if (typeof b.ttp === 'string' && /^[\w.-]{8,100}$/.test(b.ttp)) m.ttp = b.ttp;
    if (ip && /^[0-9a-fA-F:.]{3,45}$/.test(ip)) m.ip = ip;
    if (ua) m.ua = ua.slice(0, 400);
  } else m.ads = '0';
  return m;
}

const sha = (v: string) => crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex');
const comPrazo = (ms: number) => AbortSignal.timeout(ms);

export type Compra = { id: string; uid: string; plano: string; valor: number; moeda: string; email?: string | null; quando: number; metadata: Record<string, string> };

/** Envia a compra a cada destino configurado e autorizado. Devolve quantos aceitaram (0 = nenhum). Nunca lança. */
export async function enviarCompra(c: Compra, env: NodeJS.ProcessEnv = process.env, pedir: typeof fetch = fetch): Promise<number> {
  const m = c.metadata;
  const envios: Promise<boolean>[] = [];
  const site = env.APP_URL || 'https://linvuu.com.br';
  const posthogToken = env.POSTHOG_TOKEN || env.VITE_POSTHOG_TOKEN;
  const posthogHost = env.POSTHOG_HOST || env.VITE_POSTHOG_HOST;
  if (m.ph && posthogToken && posthogHost && /^https:\/\/(us|eu)\.i\.posthog\.com$/.test(posthogHost)) {
    envios.push(pedir(`${posthogHost}/i/v0/e/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: comPrazo(5000), body: JSON.stringify({
      api_key: posthogToken, distinct_id: m.ph, event: 'purchase_completed', timestamp: new Date(c.quando * 1000).toISOString(),
      properties: { billing_plan: c.plano, value: c.valor, currency: c.moeda, platform: 'web', environment: env.NODE_ENV === 'production' ? 'production' : 'test', $process_person_profile: false, $geoip_disable: true, $insert_id: c.id },
    }) }).then((r) => r.ok).catch(() => false));
  }
  if (m.ads === '1' && env.META_PIXEL_ID && env.META_CAPI_TOKEN) {
    const versao = env.META_GRAPH_VERSION || 'v21.0';
    envios.push(pedir(`https://graph.facebook.com/${versao}/${env.META_PIXEL_ID}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.META_CAPI_TOKEN}` }, signal: comPrazo(8000), body: JSON.stringify({
      data: [{ event_name: 'Purchase', event_time: c.quando, event_id: c.id, action_source: 'website', event_source_url: `${site}/assinatura`,
        user_data: { ...(c.email ? { em: [sha(c.email)] } : {}), external_id: [sha(c.uid)], ...(m.fbp ? { fbp: m.fbp } : {}), ...(m.fbc ? { fbc: m.fbc } : {}), ...(m.ip ? { client_ip_address: m.ip } : {}), ...(m.ua ? { client_user_agent: m.ua } : {}) },
        custom_data: { currency: c.moeda, value: c.valor, content_name: c.plano } }],
      ...(env.META_TEST_EVENT_CODE ? { test_event_code: env.META_TEST_EVENT_CODE } : {}),
    }) }).then((r) => r.ok).catch(() => false));
  }
  if (m.ads === '1' && env.TIKTOK_PIXEL_ID && env.TIKTOK_ACCESS_TOKEN) {
    envios.push(pedir('https://business-api.tiktok.com/open_api/v1.3/event/track/', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Access-Token': env.TIKTOK_ACCESS_TOKEN }, signal: comPrazo(8000), body: JSON.stringify({
      event_source: 'web', event_source_id: env.TIKTOK_PIXEL_ID, ...(env.TIKTOK_TEST_EVENT_CODE ? { test_event_code: env.TIKTOK_TEST_EVENT_CODE } : {}),
      data: [{ event: 'CompletePayment', event_time: c.quando, event_id: c.id,
        user: { ...(c.email ? { email: sha(c.email) } : {}), external_id: sha(c.uid), ...(m.ttp ? { ttp: m.ttp } : {}), ...(m.ip ? { ip: m.ip } : {}), ...(m.ua ? { user_agent: m.ua } : {}) },
        properties: { currency: c.moeda, value: c.valor, content_type: 'product', contents: [{ content_id: c.plano, content_name: c.plano, quantity: 1, price: c.valor }] },
        page: { url: `${site}/assinatura` } }],
    }) }).then(async (r) => r.ok && ((await r.json().catch(() => ({}))) as { code?: number }).code === 0).catch(() => false));
  }
  if (!envios.length) return 0;
  return (await Promise.all(envios)).filter(Boolean).length;
}
