import assert from 'node:assert/strict';
import { redirecionamentoDeDominio } from '../server/dominio.ts';
import { indisponivelNoDominio } from '../src/lib/disponibilidadeDominio.ts';
for (const [host, rota, perfil] of [
  ['linvuu.com', '/livros/ru', 'global'], ['linvuu.com', '/materiais-gratuitos/alfabeto-russo', 'global'],
  ['linvuu.com', '/curso/en/dia/1', 'global'], ['linvuu.com.br', '/curso/br/dia/1', 'br'],
  ['linvuu.com.br', '/gramatica/br', 'br'],
] as const) {
  assert.equal(redirecionamentoDeDominio(host, rota, 'a=1'), null, `${host}${rota} não troca de domínio`);
  assert.equal(indisponivelNoDominio(perfil, rota), true);
}
assert.equal(indisponivelNoDominio('global', '/livros/br'), false);
assert.equal(indisponivelNoDominio('br', '/livros/ru'), false);
assert.equal(indisponivelNoDominio('global', '/curso/it/dia/1'), false);
assert.equal(redirecionamentoDeDominio('www.linvuu.com', '/livros', 'a=1'), 'https://linvuu.com/livros?a=1');
console.log('Domínios mantidos e rotas sem conteúdo identificadas.');
