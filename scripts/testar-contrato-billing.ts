import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PLANOS_WEB, planoSiteValido, precoMensalObrigatorio } from '../server/billing-contrato';
import { CENTAVOS, MESES_DO_PACOTE, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX, PRECO_ANUAL, PRECO_ANUAL_MES, PRECO_TRIMESTRAL_PIX_MES } from '../src/config/planos.ts';
import { carregarDadosMeta, metaDaRota } from '../src/lib/metaRota.ts';

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
console.log('OK: contrato web valida planos, preço explícito, ausência de criação silenciosa de preços e fonte única de valores (texto, cobrança, JSON-LD, /readyz).');
