import assert from 'node:assert/strict';
import fs from 'node:fs';
const a=JSON.parse(fs.readFileSync('content/idiomas/de/edicoes/en/aula-001.json','utf8'));
assert.equal(a.idioma,'de'); assert.equal(a.idiomaApoio,'en'); assert.equal(a.status,'em-producao'); assert.equal(a.sessoes.length,4);
let count=0;
for (const [index,s] of a.sessoes.entries()) {
 assert.equal(s.sessao,`S${index+1}`); assert.equal(s.duracaoMin,30);
 for(const b of s.blocos) if(b.tipo==='exercicios') for(const e of b.itens){count++;if(Array.isArray(e.opcoes)&&e.gabarito&&e.tipo!=='sentence-ordering')assert.ok(e.opcoes.includes(e.gabarito),e.id);}
}
assert.ok(count>=40); console.log(`ok: aula autoral de/en, 4 sessões, ${count} exercícios`);
