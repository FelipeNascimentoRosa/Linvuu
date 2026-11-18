import assert from 'node:assert/strict';
import type {Exercicio} from '../src/lib/aulas';
import {avancarRevisao,iniciarRevisao,novaRodada,pendentesRevisao,revisaoCompativel,validarRevisao} from '../src/lib/revisao/revisaoModelo';
import {valorValido,alterar,lerJournal,serializar,vazio} from '../src/plataforma/apk/recuperacao';
const itens:Exercicio[]=[
 {id:'en-001-m01',tipo:'multiple-choice',enunciado:'Choose',opcoes:['a','b'],gabarito:'b',explicacao:'Use b.'},
 {id:'en-001-m01',tipo:'fill-gap',enunciado:'Write',respostaEsperada:'hello',explicacao:'Say hello.'},
 {id:'en-001-m03',tipo:'sentence-ordering',enunciado:'Order',opcoes:['you','thank'],gabarito:'thank you',explicacao:'Thank comes first.'},
 {id:'en-001-p01',tipo:'producao',enunciado:'Private',respostaEsperada:'example'}
];
let v=iniciarRevisao(itens,[0,1,2]);
assert(validarRevisao(v));assert(revisaoCompativel(v,itens,[0,1,2]));
assert.equal(avancarRevisao(v),v); // cannot skip an unanswered question
v={...v,escolha:'b',resultado:'ok',respostas:{0:true}};
assert(revisaoCompativel(v,itens,[0,1,2]));
v=avancarRevisao(v);assert.equal(v.indice,1);assert.equal(v.escolha,null);
v={...v,texto:'wrong',resultado:'erro',respostas:{...v.respostas,1:false}};
assert(revisaoCompativel(v,itens,[0,1,2]));v=avancarRevisao(v);
v={...v,ordem:[1,0],resultado:'ok',respostas:{...v.respostas,2:true}};
assert(revisaoCompativel(v,itens,[0,1,2]));v=avancarRevisao(v);
assert.equal(v.fim,true);assert(revisaoCompativel(v,itens,[0,1,2]));assert.deepEqual(pendentesRevisao(v),[1]);
v=novaRodada(v);assert.deepEqual(v.fila,[1]);assert.equal(v.rodada,2);assert.equal(v.indice,0);assert.equal(v.texto,'');
assert(revisaoCompativel(v,itens,[0,1,2]));
v={...v,texto:'Hello!',resultado:'ok',respostas:{...v.respostas,1:true}};
assert(revisaoCompativel(v,itens,[0,1,2]));v=avancarRevisao(v);assert.deepEqual(pendentesRevisao(v),[]);assert.equal(novaRodada(v),v);
assert.equal(revisaoCompativel(v,[{...itens[0],explicacao:'updated'},...itens.slice(1)],[0,1,2]),false);
assert.equal(revisaoCompativel(v,itens,[1]),false);
assert.equal(revisaoCompativel(iniciarRevisao(itens,[3]),itens,[3]),false);
for(const bad of [{...v,fila:[0,0]},{...v,fila:[9]},{...v,texto:'x'.repeat(8001)},{...v,respostas:{0:'true'}},{...v,origem:[-1]},{...v,indice:99},{...v,ordem:[0,0]},{...v,versao:8}])assert.equal(validarRevisao(bad),false);
const key='linvuu:pratica-apk:v1:alice:en:1:A:bloco:0:revisao-erros';
assert(valorValido(key,JSON.stringify(v)));
const j=lerJournal(serializar(alterar(vazio(),key,JSON.stringify(v))));assert.deepEqual(JSON.parse(j!.entradas[key].valor!),v);
assert.equal(valorValido(key,JSON.stringify({acertos:1,total:1,em:v.em})),false);
console.log('Revisão: três tipos, IDs repetidos por posição, rodadas só de erros restantes, retomada, versão, limites, produção excluída e journal aprovados.');
