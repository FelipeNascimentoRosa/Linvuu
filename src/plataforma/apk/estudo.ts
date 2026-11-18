import {usuarioDoProgresso} from '../../lib/progresso';
import type {Exercicio} from '../../lib/aulas';
import {corrigirResposta} from '../../lib/correcaoExercicios';
import {assinaturaExercicios,validarPratica,validarTentativa,type Pratica,type Tentativa} from '../../lib/revisao/estudoModelo';
export {assinaturaExercicios,validarPratica,validarTentativa,type Pratica,type Tentativa} from '../../lib/revisao/estudoModelo';
const chave=(sessao:string)=>`linvuu:pratica-apk:v1:${usuarioDoProgresso()??'visitante'}:${sessao}`;
export function lerPratica(sessao:string,assinatura?:string):Pratica|null{try{const p:unknown=JSON.parse(localStorage.getItem(chave(sessao))??'null');return validarPratica(p)&&(!assinatura||p.assinatura===assinatura)?p:null;}catch{return null;}}
export function salvarPratica(sessao:string,acertos:number,total:number,assinatura?:string){const p:Pratica={acertos,total,em:new Date().toISOString(),...(assinatura?{versao:2 as const,assinatura}:{})};try{localStorage.setItem(chave(sessao),JSON.stringify(p));}catch{/* resumo permanece em memória */}return p;}
export function lerTentativa(sessao:string,itens:Exercicio[]):Tentativa|null{
 try{const p:unknown=JSON.parse(localStorage.getItem(chave(`${sessao}:tentativa`))??'null');
 if(!validarTentativa(p)||p.assinatura!==assinaturaExercicios(itens)||p.indice>=itens.length||Object.keys(p.respostas).some(k=>Number(k)>=itens.length))return null;
 const atual=itens[p.indice];if(p.escolha!==null&&!atual.opcoes?.includes(p.escolha)||p.ordem.some(i=>i>=(atual.opcoes?.length??0)))return null;
 const corrigivel=(e:Exercicio)=>e.tipo!=='repeat'&&e.tipo!=='producao';
 // A sequência salva deve representar uma passagem real pelos exercícios.
 if(Object.keys(p.respostas).some(k=>Number(k)>p.indice||!corrigivel(itens[Number(k)])))return null;
 if(itens.slice(0,p.indice).some((e,i)=>corrigivel(e)&&typeof p.respostas[i]!=='boolean'))return null;
 if(p.finalizada){if(p.indice!==itens.length-1||p.resultado!==null||itens.some((e,i)=>corrigivel(e)&&typeof p.respostas[i]!=='boolean'))return null;}
 else if(p.resultado===null){if(p.respostas[p.indice]!==undefined)return null;}
 else if(p.resultado==='livre'){if(corrigivel(atual)||p.respostas[p.indice]!==undefined)return null;}
 else {
  const respondeu=atual.tipo==='sentence-ordering'?p.ordem.length>0:atual.opcoes?p.escolha!==null:p.texto.trim().length>0;
  if(!corrigivel(atual)||!respondeu)return null;
  const correto=corrigirResposta(atual,{escolha:p.escolha,ordem:p.ordem,texto:p.texto});
  if(p.respostas[p.indice]!==correto||(p.resultado==='ok')!==correto)return null;
 }
 return p;
 }catch{return null;}
}
export function salvarTentativa(sessao:string,p:Tentativa){
 if(!validarTentativa(p))return;
 try{
  const k=chave(`${sessao}:tentativa`);let anterior:unknown=null;
  try{anterior=JSON.parse(localStorage.getItem(k)??'null');}catch{/* substituir somente a tentativa inválida */}
  if(validarTentativa(anterior)&&JSON.stringify({...anterior,em:''})===JSON.stringify({...p,em:''}))return;
  localStorage.setItem(k,JSON.stringify(p));
 }catch{/* tentativa continua em memória */}
}
