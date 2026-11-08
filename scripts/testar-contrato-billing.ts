import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PLANOS_WEB, PLANOS_USD, planoSiteValido, planoUsdValido, precoMensalObrigatorio, precoMensalUsdObrigatorio } from '../server/billing-contrato';
import { CENTAVOS, CENTAVOS_USD, PRECOS, MESES_DO_PACOTE, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX, PRECO_ANUAL, PRECO_ANUAL_MES, PRECO_TRIMESTRAL_PIX_MES } from '../src/config/planos.ts';
import { carregarDadosMeta, metaDaRota, aplicarMeta } from '../src/lib/metaRota.ts';
import { LOCALES_POR_PERFIL, comPerfil } from '../src/i18n/locales.ts';

assert.deepEqual(PLANOS_WEB, ['mensal', 'trimestral', 'trimestral-pix', 'anual']);
for (const plano of PLANOS_WEB) assert.equal(planoSiteValido(plano), true, plano);
for (const entrada of ['', 'gratis', 'premium', 'anual-desconto', null, undefined, 139, {}, [], false, ' mensal', 'mensal ']) {
  assert.equal(planoSiteValido(entrada), false, JSON.stringify(entrada));
}
for (const id of [undefined, '', 'price_', 'prod_abc', 'price_test+erro', 'price_test\n', 'price_abc/def']) {
  assert.throws(() => precoMensalObrigatorio(id), /STRIPE_PRICE_ID/);
}
assert.equal(precoMensalObrigatorio('price_1UO8OKA7XqBfDrgm15gMOYpe'), 'price_1UO8OKA7XqBfDrgm15gMOYpe');
const source = fs.readFileSync('server/billing.ts', 'utf8');
assert.ok(source.includes('precoMensalObrigatorio(process.env.STRIPE_PRICE_ID)'));
assert.ok(source.includes('planoSiteValido(plano)'));
assert.ok(!/stripe!?\.products\.create|stripe!?\.prices\.create|stripe!?\.prices\.search/.test(source), 'uma requisição de checkout não cria catálogo Stripe');
// Fonte única de preço: o texto mostrado, o valor cobrado e o JSON-LD saem dos mesmos números.
const reais = (c: number) => 'R$ ' + (c % 100 ? (c / 100).toFixed(2).replace('.', ',') : String(c / 100));
assert.equal(PRECO_MENSAL, reais(CENTAVOS.mensal));
assert.equal(PRECO_TRIMESTRAL, reais(CENTAVOS.trimestral));
assert.equal(PRECO_TRIMESTRAL_PIX, reais(CENTAVOS['trimestral-pix']));
assert.equal(PRECO_ANUAL, reais(CENTAVOS.anual));
assert.equal(CENTAVOS['trimestral-pix'], Math.round(CENTAVOS.trimestral * 0.7), 'Pix = 30% de desconto sobre o trimestral');
assert.equal(CENTAVOS.trimestral, CENTAVOS.mensal * MESES_DO_PACOTE.trimestral, 'trimestral no cartão = 3 mensalidades');
assert.equal(PRECO_ANUAL_MES, reais(Math.round(CENTAVOS.anual / 12)));
assert.equal(PRECO_TRIMESTRAL_PIX_MES, reais(Math.round(CENTAVOS['trimestral-pix'] / 3)));
assert.ok(!/\b(13900|41700|29190|99900)\b/.test(source), 'billing.ts não repete valores: usa CENTAVOS');
const d = carregarDadosMeta(process.cwd());
const ld = JSON.stringify(metaDaRota('/assinatura', d).jsonld);
for (const c of Object.values(CENTAVOS)) assert.ok(ld.includes(`"price":"${(c / 100).toFixed(2)}"`), `JSON-LD com ${c}`);
assert.ok(fs.readFileSync('server/prontidao.ts', 'utf8').includes('p.unit_amount !== CENTAVOS.mensal'), '/readyz confere o valor da mensal');
// ── linvuu.com cobra em dólares (docs/PRECOS-DEFINIDOS.md): só mensal e anual, só cartão, sem FUNDADORES ──
assert.deepEqual(PLANOS_USD, ['mensal', 'anual']);
assert.equal(planoUsdValido('mensal'), true); assert.equal(planoUsdValido('anual'), true);
for (const e of ['trimestral', 'trimestral-pix', 'gratis', '', null, undefined]) assert.equal(planoUsdValido(e), false, String(e));
assert.deepEqual(CENTAVOS_USD, { mensal: 1999, anual: 14900 });
assert.equal(PRECOS.en.mensal, 'US$19.99'); assert.equal(PRECOS.en.anual, 'US$149.00');
assert.equal(PRECOS['pt-BR'].mensal, PRECO_MENSAL);
for (const id of [undefined, '', 'price_', 'prod_abc']) assert.throws(() => precoMensalUsdObrigatorio(id), /STRIPE_PRICE_ID_USD/);
assert.equal(precoMensalUsdObrigatorio('price_abc123'), 'price_abc123');
assert.ok(source.includes("perfilDaRequisicao(req) === 'global'") && source.includes('planoUsdValido(plano)'), 'checkout escolhe a moeda pelo domínio');
assert.ok(source.includes("currency: 'usd', unit_amount: CENTAVOS_USD.anual") && source.includes('precoMensalUsdObrigatorio(process.env.STRIPE_PRICE_ID_USD)'));
assert.ok(source.includes('allow_promotion_codes: !dolar'), 'sem código promocional (FUNDADORES) no .com');
assert.ok(!/\b(1999|14900)\b/.test(source), 'billing.ts não repete valores em dólar: usa CENTAVOS_USD');
const ldEn = comPerfil('global', () => JSON.stringify(metaDaRota('/assinatura', d).jsonld));
assert.ok(ldEn.includes('"price":"19.99"') && ldEn.includes('"price":"149.00"') && ldEn.includes('"priceCurrency":"USD"') && !ldEn.includes('BRL'), 'JSON-LD do .com em dólares');
assert.ok(fs.readFileSync('server/prontidao.ts', 'utf8').includes('CENTAVOS_USD.mensal'), '/readyz confere a mensal em dólares quando configurada');
// Nenhuma página comercial do .com mostra reais; nenhuma do .com.br mostra dólares (o conteúdo do curso de português cita reais e Pix como assunto de aula: fora desta checagem).
const base = fs.readFileSync('index.html', 'utf8');
const rotas = ['/', '/cursos', '/assinatura', '/portugues', '/sobre', '/privacidade', '/termos', '/curso/ru', '/curso/fr', '/gramatica/ru', '/russo-online'];
for (const [perfil, loc] of LOCALES_POR_PERFIL) comPerfil(perfil, () => {
  const site = perfil === 'global' ? 'https://linvuu.com' : 'https://linvuu.com.br';
  for (const r of rotas) {
    const m = metaDaRota(r, d);
    if (m.status !== 200) continue;
    const h = aplicarMeta(base, m, site, d);
    if (perfil === 'global') assert.ok(!/R\$|BRL|reais|Pix\b|boleto|FUNDADORES/i.test(h), `${site}${r}: o .com não pode mostrar reais, Pix, boleto nem FUNDADORES`);
    else assert.ok(!/US\$|\bUSD\b/.test(h), `${site}${r}: o .com.br não pode mostrar dólares`);
  }
});
console.log('OK: contrato web valida planos, preço explícito, ausência de criação silenciosa de preços e fonte única de valores (texto, cobrança, JSON-LD, /readyz).');
