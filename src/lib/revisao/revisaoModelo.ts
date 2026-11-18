import type {Exercicio} from '../aulas';
import {corrigirResposta} from '../correcaoExercicios';
import {assinaturaExercicios} from './estudoModelo';

/** Revisão local separada da primeira tentativa; não concede acesso ou nota no servidor. */
export interface Revisao {
 tipo:'revisao-erros';versao:1;assinatura:string;origem:number[];fila:number[];
 indice:number;rodada:number;respostas:Record<number,boolean>;
 escolha:string|null;ordem:number[];texto:string;resultado:'ok'|'erro'|null;fim:boolean;em:string;
}
const objeto=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const inteiro=(v:unknown,max=499)=>Number.isInteger(v)&&Number(v)>=0&&Number(v)<=max;
const indices=(v:unknown):v is number[]=>Array.isArray(v)&&v.length>0&&v.length<=500&&v.every(x=>inteiro(x))&&new Set(v).size===v.length;
export function validarRevisao(v:unknown):v is Revisao {
 if(!objeto(v)||v.tipo!=='revisao-erros'||v.versao!==1||typeof v.assinatura!=='string'||!/^ex2:[0-9a-f]{32}:\d{1,3}$/.test(v.assinatura)||!indices(v.origem)||!indices(v.fila))return false;
 const origem=v.origem;
 return v.fila.every(n=>origem.includes(n))&&inteiro(v.indice,v.fila.length-1)&&inteiro(v.rodada,10000)&&Number(v.rodada)>0&&objeto(v.respostas)&&Object.keys(v.respostas).length<=origem.length&&Object.entries(v.respostas).every(([k,r])=>/^(0|[1-9]\d{0,2})$/.test(k)&&origem.includes(Number(k))&&typeof r==='boolean')&&(v.escolha===null||typeof v.escolha==='string'&&v.escolha.length<=8000)&&Array.isArray(v.ordem)&&v.ordem.length<=500&&v.ordem.every(x=>inteiro(x))&&new Set(v.ordem).size===v.ordem.length&&typeof v.texto==='string'&&v.texto.length<=8000&&[null,'ok','erro'].includes(v.resultado as null)&&typeof v.fim==='boolean'&&typeof v.em==='string'&&Number.isFinite(Date.parse(v.em));
}
export function iniciarRevisao(itens:Exercicio[],origem:number[]):Revisao {
 return {tipo:'revisao-erros',versao:1,assinatura:assinaturaExercicios(itens),origem:[...origem],fila:[...origem],indice:0,rodada:1,respostas:{},escolha:null,ordem:[],texto:'',resultado:null,fim:false,em:new Date().toISOString()};
}
export function revisaoCompativel(v:unknown,itens:Exercicio[],origem:number[]):v is Revisao {
 if(!validarRevisao(v)||v.assinatura!==assinaturaExercicios(itens)||JSON.stringify(v.origem)!==JSON.stringify(origem)||v.origem.some(n=>!itens[n]||['repeat','producao'].includes(itens[n].tipo)))return false;
 const ex=itens[v.fila[v.indice]];
 if(v.escolha!==null&&!ex.opcoes?.includes(v.escolha)||v.ordem.some(n=>n>=(ex.opcoes?.length??0)))return false;
 if(v.fila.slice(0,v.indice).some(n=>typeof v.respostas[n]!=='boolean'))return false;
 if(v.fim)return v.indice===v.fila.length-1&&v.resultado===null&&v.fila.every(n=>typeof v.respostas[n]==='boolean');
 if(v.resultado===null)return true;
 const respondeu=ex.tipo==='sentence-ordering'?v.ordem.length>0:ex.opcoes&&ex.gabarito!==undefined?v.escolha!==null:v.texto.trim().length>0;
 const ok=corrigirResposta(ex,{escolha:v.escolha,ordem:v.ordem,texto:v.texto});
 return respondeu&&v.respostas[v.fila[v.indice]]===ok&&(v.resultado==='ok')===ok;
}
export function avancarRevisao(v:Revisao):Revisao {
 if(v.resultado===null||v.fim)return v;
 const limpa={...v,escolha:null,ordem:[],texto:'',resultado:null,em:new Date().toISOString()};
 return v.indice+1<v.fila.length?{...limpa,indice:v.indice+1}:{...limpa,fim:true};
}
export function pendentesRevisao(v:Revisao){return v.origem.filter(n=>v.respostas[n]!==true);}
export function novaRodada(v:Revisao):Revisao {
 const fila=pendentesRevisao(v);
 if(!v.fim||!fila.length||v.rodada>=10000)return v;
 return {...v,fila,indice:0,rodada:v.rodada+1,escolha:null,ordem:[],texto:'',resultado:null,fim:false,em:new Date().toISOString()};
}
