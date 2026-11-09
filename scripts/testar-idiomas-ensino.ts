import assert from 'node:assert/strict';
import { escolherExplicacao, resolverExplicacao, preferenciaExplicacao, lembrarExplicacao, chaveExplicacao } from '../src/i18n/ensino';
import { localeDoCaminho } from '../src/i18n/locales';
const memoria = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {getItem: (k: string) => memoria.get(k) ?? null, setItem: (k: string, v: string) => memoria.set(k, v)} });
// Menus em dois idiomas não mudam a fonte portuguesa do curso de alemão.
for (const rota of ['/curso/de', '/en/curso/de']) {
  assert.ok(localeDoCaminho(rota));
  assert.equal(preferenciaExplicacao('de', 'pt'), 'pt');
}
lembrarExplicacao('de', 'en');
assert.equal(preferenciaExplicacao('de', 'pt'), 'en');
assert.equal(preferenciaExplicacao('fr', 'pt'), 'pt');
assert.equal(preferenciaExplicacao('br', 'en'), 'en');
memoria.set(chaveExplicacao('de'), 'invalido');
assert.equal(preferenciaExplicacao('de', 'pt'), 'pt');
assert.equal(escolherExplicacao('en', null), 'en');
assert.equal(resolverExplicacao('pt', 'en', false), 'pt');
assert.equal(resolverExplicacao('pt', 'en', true), 'en');
assert.equal(resolverExplicacao('en', 'es', false), 'en');
Object.defineProperty(globalThis, 'localStorage', {configurable: true, get() {throw new Error('armazenamento bloqueado');}});
assert.equal(preferenciaExplicacao('de', 'pt'), 'pt');
assert.doesNotThrow(() => lembrarExplicacao('de', 'es'));
console.log('OK: interface independente, preferência por curso, entrada inválida, reserva e armazenamento bloqueado.');
