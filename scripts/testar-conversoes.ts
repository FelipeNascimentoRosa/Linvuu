// Conversões de compra: só com consentimento e só para destinos configurados; e-mail e uid sempre em hash. Sem rede.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { enviarCompra, validarMedicao, type Compra } from '../server/conversoes.ts';

const sha = (v: string) => crypto.createHash('sha256').update(v).digest('hex');
const pedidos: { url: string; corpo: Record<string, unknown>; headers: Record<string, string> }[] = [];
const pedir = (async (url: string, init: RequestInit) => {
  pedidos.push({ url, corpo: JSON.parse(String(init.body)), headers: init.headers as Record<string, string> });
  return new Response(JSON.stringify(url.includes('tiktok') ? { code: 0 } : { ok: true }), { status: 200 });
}) as typeof fetch;
const env = { POSTHOG_TOKEN: 'phc_teste', POSTHOG_HOST: 'https://us.i.posthog.com', META_PIXEL_ID: '123', META_CAPI_TOKEN: 'tok', TIKTOK_PIXEL_ID: 'TT', TIKTOK_ACCESS_TOKEN: 'tt' } as NodeJS.ProcessEnv;
const compra = (metadata: Record<string, string>): Compra => ({ id: 'cs_1', uid: 'uid_A', plano: 'anual', valor: 999, moeda: 'BRL', email: ' Aluno@Exemplo.com ', quando: 1_800_000_000, metadata });

// Validação do que vem do navegador
assert.deepEqual(validarMedicao(undefined, '1.2.3.4', 'UA'), {});
assert.deepEqual(validarMedicao({ anuncios: false, fbp: 'fb.1.1700000000000.123' }, '1.2.3.4', 'UA'), { ads: '0' }, 'sem consentimento de anúncios: sem ids nem IP');
const m = validarMedicao({ ph: '0f8fad5b-d9cb-469f-a165-70867728950e', anuncios: true, fbp: 'fb.1.1700000000000.123456', fbc: 'fb.1.1700000000000.AbC-1', ttp: 'abcdefgh123', extra: 'x' }, '1.2.3.4', 'Mozilla');
assert.deepEqual(m, { ph: '0f8fad5b-d9cb-469f-a165-70867728950e', ads: '1', fbp: 'fb.1.1700000000000.123456', fbc: 'fb.1.1700000000000.AbC-1', ttp: 'abcdefgh123', ip: '1.2.3.4', ua: 'Mozilla' });
assert.equal(validarMedicao({ ph: 'não-é-uuid', anuncios: true, fbp: '<script>' }, undefined, undefined).fbp, undefined);

// Sem nada configurado: nenhum envio
assert.equal(await enviarCompra(compra({ ads: '1', ph: m.ph! }), {} as NodeJS.ProcessEnv, pedir), 0);
assert.equal(pedidos.length, 0);
// Recusou anúncios e análise: nenhum envio
assert.equal(await enviarCompra(compra({ ads: '0' }), env, pedir), 0);
assert.equal(pedidos.length, 0);
// Só análise: só PostHog
assert.equal(await enviarCompra(compra({ ads: '0', ph: m.ph! }), env, pedir), 1);
assert.equal(pedidos.length, 1); assert.match(pedidos[0].url, /posthog/);
assert.equal(pedidos[0].corpo.event, 'purchase_completed'); assert.equal(pedidos[0].corpo.distinct_id, m.ph);
assert.ok(!JSON.stringify(pedidos[0].corpo).includes('Aluno'), 'PostHog não recebe e-mail');
// Anúncios: Meta e TikTok, com e-mail e uid em hash, event_id = sessão (deduplicação)
pedidos.length = 0;
assert.equal(await enviarCompra(compra({ ...m } as Record<string, string>), env, pedir), 3);
const meta = pedidos.find((p) => p.url.includes('graph.facebook.com'))!;
const dado = (meta.corpo.data as Record<string, any>[])[0];
assert.equal(dado.event_name, 'Purchase'); assert.equal(dado.event_id, 'cs_1'); assert.deepEqual(dado.custom_data, { currency: 'BRL', value: 999, content_name: 'anual' });
assert.deepEqual(dado.user_data.em, [sha('aluno@exemplo.com')]); assert.deepEqual(dado.user_data.external_id, [sha('uid_a')]);
assert.equal(meta.headers.Authorization, 'Bearer tok'); assert.ok(!meta.url.includes('tok'), 'token fora da URL (logs)');
const tt = pedidos.find((p) => p.url.includes('tiktok'))!;
assert.equal((tt.corpo.data as Record<string, any>[])[0].user.email, sha('aluno@exemplo.com'));
assert.ok(!JSON.stringify(pedidos).includes('Aluno@Exemplo'), 'e-mail nunca sai em texto');
console.log('OK: conversões só com consentimento e destino configurado; e-mail/uid em hash; deduplicação por sessão.');
