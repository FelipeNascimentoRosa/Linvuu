// O registro gravado pelo webhook só é atalho para «tem acesso». «Sem acesso» no registro vem do Stripe e não pode esconder
// um acesso do Google Play: nesse caso devolve null e a consulta completa (Stripe + Play) é refeita.
import assert from 'node:assert/strict';
import { acessoDoRegistro, VALIDADE_REGISTRO_MS, type Registro } from '../server/acesso.ts';

const t = Date.parse('2026-11-05T12:00:00Z');
const ativa = { ativa: true, via: 'assinatura', status: 'active', cancelaEm: null, ate: null } as const;
const inativa = { ativa: false, via: null, status: null, cancelaEm: null, ate: null } as const;
const reg = (acesso: Registro['acesso'], atualizadoEm = t - 1000): Registro => ({ uid: 'u', acesso, atualizadoEm });

assert.deepEqual(acessoDoRegistro(reg(ativa), t), ativa, 'acesso confirmado e fresco: atalho vale');
assert.equal(acessoDoRegistro(reg(inativa), t), null, 'sem acesso no Stripe: reconsulta (pode haver Google Play)');
assert.equal(acessoDoRegistro(reg(ativa, t - VALIDADE_REGISTRO_MS - 1), t), null, 'registro vencido: reconsulta');
assert.equal(acessoDoRegistro(null, t), null);
assert.equal(acessoDoRegistro({ uid: 'u' }, t), null);
const pacote = { ativa: true, via: 'trimestral', status: 'paid', cancelaEm: null, ate: Math.floor(t / 1000) + 3600 } as const;
assert.deepEqual(acessoDoRegistro(reg(pacote), t), pacote);
assert.equal(acessoDoRegistro(reg(pacote), t + 2 * 3600_000), null, 'pacote que venceu depois da gravação não vale');
console.log('OK: registro de acesso é atalho só para «tem acesso»; «sem acesso» sempre reconsulta Stripe e Play.');
