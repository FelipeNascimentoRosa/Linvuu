import test from 'node:test';
import assert from 'node:assert/strict';
import { auditarCobertura } from './auditar-cobertura-internacional.mjs';

const indice = { cursos: {
  en: { fonte: 'pt', grupos: [{ aula: 1 }, { aula: 2 }] },
  br: { fonte: 'en', grupos: [{ aula: 1 }, { aula: 2 }] }
} };
test('interface traduzida não constitui aulas traduzidas; cobertura parcial é explícita', () => {
  const linhas = auditarCobertura(indice, { en: { en: { aulas: [1] } } });
  const parcial = linhas.find(x => x.curso === 'en' && x.explicacao === 'en');
  assert.equal(parcial.cobertura, 'parcial');
  assert.equal(parcial.aulasSemTexto, 1);
  assert.equal(linhas.find(x => x.curso === 'br' && x.explicacao === 'en').cobertura, 'total');
  assert.equal(linhas.find(x => x.curso === 'br' && x.explicacao === 'pt').cobertura, 'ausente');
});
test('não aceita tradução apontando para aula inexistente ou duplicada', () => {
  assert.throws(() => auditarCobertura(indice, { en: { en: { aulas: [3] } } }), /Cobertura inválida/);
  assert.throws(() => auditarCobertura(indice, { en: { en: { aulas: [1, 1] } } }), /Cobertura inválida/);
});
test('rejeita aulas de origem duplicadas e idiomas de origem desconhecidos', () => {
  assert.throws(() => auditarCobertura({ cursos: { en: { grupos: [{ aula: 1 }, { aula: 1 }] } } }, {}), /duplicadas/);
  assert.throws(() => auditarCobertura({ cursos: { en: { fonte: 'xx', grupos: [] } } }, {}), /Fonte desconhecida/);
});
