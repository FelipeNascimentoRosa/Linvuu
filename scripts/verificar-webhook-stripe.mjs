// Confere no Stripe (somente leitura) se o endpoint de produção recebe todos os eventos de cobrança que o servidor trata.
// Uso: STRIPE_SECRET_KEY=rk_live_... node --import tsx scripts/verificar-webhook-stripe.mjs [url-do-endpoint]
// Chave restrita basta, com permissão de LEITURA em «Webhook Endpoints». Nada é criado nem alterado.
import { eventosFaltando } from '../server/webhook-eventos.ts';

const chave = process.env.STRIPE_SECRET_KEY;
if (!chave) { console.error('Defina STRIPE_SECRET_KEY (pode ser chave restrita só com leitura de Webhook Endpoints).'); process.exit(2); }
const alvo = process.argv[2] ?? 'https://linvuu.com.br/api/stripe/webhook';
const r = await fetch('https://api.stripe.com/v1/webhook_endpoints?limit=100', { headers: { Authorization: `Bearer ${chave}` } });
if (!r.ok) { console.error(`Stripe respondeu ${r.status}: a chave não consegue ler os webhooks.`); process.exit(2); }
const { data } = await r.json();
const ep = data.find((e) => e.url === alvo);
if (!ep) { console.error(`Nenhum endpoint com a URL ${alvo}. Endpoints: ${data.map((e) => e.url).join(', ') || '(nenhum)'}`); process.exit(1); }
if (ep.status !== 'enabled') { console.error(`Endpoint ${ep.id} está «${ep.status}», não «enabled».`); process.exit(1); }
const falta = eventosFaltando(ep.enabled_events);
if (falta.length) { console.error(`Endpoint ${ep.id} NÃO recebe: ${falta.join(', ')}\nNo painel: Developers → Webhooks → o endpoint → Update details → Select events → marque os que faltam.`); process.exit(1); }
console.log(`OK: endpoint ${ep.id} (${ep.livemode ? 'live' : 'teste'}) recebe todos os eventos de cobrança.`);
