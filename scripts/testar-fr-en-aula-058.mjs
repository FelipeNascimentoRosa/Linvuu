import assert from 'node:assert/strict'; import fs from 'node:fs'; import { traduzirAula } from './i18n-aulas.mjs';
const a=JSON.parse(fs.readFileSync('content/idiomas/fr/aulas/aula-058.json','utf8'));const t=traduzirAula(a,'fr','en').aula;
for(const s of t.sessoes.slice(0,3))for(const b of s.blocos)if(b.tipo==='palavras')for(const v of b.itens)assert.ok(v.pt);
assert.equal(t.sessoes[0].blocos[2].erros[0].errado,'Je voudrais être rembourser.');
assert.equal(t.sessoes[2].blocos[2].erros[2].errado,'Y a-il un autre vol ?');
const itens=t.sessoes.flatMap(s=>s.blocos).filter(b=>b.tipo==='exercicios').flatMap(b=>b.itens);
for(const x of itens)if(Array.isArray(x.opcoes)&&x.gabarito&&x.tipo!=='sentence-ordering')assert.ok(x.opcoes.includes(x.gabarito),x.id);
console.log('ok: aula 58 em inglês');
