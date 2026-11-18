import assert from 'node:assert/strict';
import {assinaturaExercicios,validarTentativa,validarPratica} from '../src/lib/revisao/estudoModelo';
import {lerTentativa,salvarTentativa,lerPratica,salvarPratica} from '../src/plataforma/apk/estudo';
import {definirUsuarioProgresso} from '../src/lib/progresso';
import type {Exercicio} from '../src/lib/aulas';
const dados=new Map<string,string>();
Object.assign(globalThis,{localStorage:{getItem:(k:string)=>dados.get(k)??null,setItem:(k:string,v:string)=>dados.set(k,v)},window:{dispatchEvent:()=>true}});
const itens:Exercicio[]=[{id:'en-001-m01',tipo:'multiple-choice',enunciado:'Choose',opcoes:['a','b'],gabarito:'b',explicacao:'Because'}];
const assinatura=assinaturaExercicios(itens);
const tentativa={tipo:'tentativa' as const,versao:1 as const,assinatura,indice:0,escolha:'a',ordem:[],texto:'',resultado:'erro' as const,respostas:{0:false},finalizada:false,em:new Date().toISOString()};
assert(validarTentativa(tentativa));salvarTentativa('en:1:A:bloco:0',tentativa);
assert.deepEqual(lerTentativa('en:1:A:bloco:0',itens),tentativa);
salvarTentativa('en:1:A:bloco:0',{...tentativa,em:'2026-10-21T03:00:00.000Z'});
assert.deepEqual(lerTentativa('en:1:A:bloco:0',itens),tentativa); // reabrir não regrava a tentativa sem mudança
for(const campo of ['enunciado','gabarito','explicacao','audio','opcoes'] as const){const alterados=[{...itens[0],[campo]:campo==='opcoes'?['a','c']:'changed'}];assert.notEqual(assinaturaExercicios(alterados),assinatura);assert.equal(lerTentativa('en:1:A:bloco:0',alterados),null);}
salvarPratica('en:1:A:bloco:0',0,1,assinatura);assert(lerPratica('en:1:A:bloco:0',assinatura));assert.equal(lerPratica('en:1:A:bloco:0','other'),null);
assert(validarPratica({acertos:0,total:1,em:tentativa.em})); // legacy remains readable, never auto-matches content
assert(!validarTentativa({...tentativa,ordem:[0,0]}));assert(!validarTentativa({...tentativa,texto:'a'.repeat(8001)}));assert(!validarTentativa({...tentativa,indice:500}));assert(!validarTentativa({...tentativa,respostas:{'-1':true}}));assert(!validarTentativa({...tentativa,em:'invalid'}));
for(const inconsistente of [
 {...tentativa,resultado:'ok' as const},
 {...tentativa,respostas:{}},
 {...tentativa,finalizada:true},
 {...tentativa,escolha:'missing'},
]){salvarTentativa('en:1:invalida',inconsistente);assert.equal(lerTentativa('en:1:invalida',itens),null);}
definirUsuarioProgresso('alice');assert.equal(lerTentativa('en:1:A:bloco:0',itens),null);salvarTentativa('en:1:A:bloco:0',{...tentativa,escolha:'b'});definirUsuarioProgresso('bob');assert.equal(lerTentativa('en:1:A:bloco:0',itens),null);definirUsuarioProgresso(null);assert.equal(lerTentativa('en:1:A:bloco:0',itens)?.escolha,'a');
console.log('Tentativas APK: conteúdo, feedback, limites, resumos e isolamento por usuário aprovados.');
