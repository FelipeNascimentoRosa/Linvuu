import {useEffect,useRef,useState} from 'react';
import type {Exercicio} from '../../lib/aulas';
import {corrigirResposta} from '../../lib/correcaoExercicios';
import {textos} from '../../lib/textos';
import {usuarioDoProgresso} from '../../lib/progresso';
import {LOCALE} from '../../i18n';
import {falar,parar} from './audio';
import {avancarRevisao,iniciarRevisao,novaRodada,pendentesRevisao,revisaoCompativel,validarRevisao,type Revisao} from './revisaoModelo';
import {revisaoTextos} from './revisaoTextos';
import './revisao.css';

const chave=(bloco:string)=>`linvuu:pratica-apk:v1:${usuarioDoProgresso()??'visitante'}:${bloco}:revisao-erros`;
export function lerRevisao(bloco:string,itens:Exercicio[],origem:number[]):Revisao {
 try{const v:unknown=JSON.parse(localStorage.getItem(chave(bloco))??'null');if(revisaoCompativel(v,itens,origem))return v;}catch{/* reiniciar somente a revisão incompatível */}
 return iniciarRevisao(itens,origem);
}
export function RevisaoErros({itens,origem,idioma,bloco,aoSair,titulo,aoTerminar}:{itens:Exercicio[];origem:number[];idioma:string;bloco:string;aoSair:()=>void;titulo?:string;aoTerminar?:(v:Revisao)=>void}) {
 const R=revisaoTextos(),T=textos(idioma),lingua=idioma==='br'?'pt-BR':idioma;
 const [storageKey]=useState(()=>chave(bloco));
 const [v,setV]=useState(()=>lerRevisao(bloco,itens,origem));
 const ultimoEstado=useRef(JSON.stringify({respostas:v.respostas,fim:v.fim}));
 const [aviso,setAviso]=useState({seq:0,texto:'',resposta:''});
 const [falha,setFalha]=useState(false);
 const foco=useRef<HTMLHeadingElement>(null),pergunta=useRef<HTMLParagraphElement>(null);
 const atual=v.fila[v.indice],ex=itens[atual],pendentes=pendentesRevisao(v),certas=v.origem.length-pendentes.length;
 useEffect(()=>{try{if(!validarRevisao(v))throw Error('revisao-invalida');localStorage.setItem(storageKey,JSON.stringify(v));setFalha(false);const estado=JSON.stringify({respostas:v.respostas,fim:v.fim});if(estado!==ultimoEstado.current){ultimoEstado.current=estado;window.dispatchEvent(new Event('linvuu:revisao-apk'));if(v.fim)aoTerminar?.(v);}}catch{setFalha(true);}},[v,storageKey]);
 useEffect(()=>{if(v.fim)foco.current?.focus();else pergunta.current?.focus();},[v.indice,v.rodada,v.fim]);
 useEffect(()=>()=>parar(),[]);
 const editar=(dados:Partial<Revisao>)=>setV(p=>({...p,...dados,em:new Date().toISOString()}));
 const opcoes=!!ex.opcoes&&ex.gabarito!==undefined&&ex.tipo!=='sentence-ordering';
 const pode=ex.tipo==='sentence-ordering'?v.ordem.length>0:opcoes?v.escolha!==null:v.texto.trim().length>0;
 const verificar=()=>{
  if(!pode||v.resultado!==null)return;
  const ok=corrigirResposta(ex,{escolha:v.escolha,ordem:v.ordem,texto:v.texto});
  editar({resultado:ok?'ok':'erro',respostas:{...v.respostas,[atual]:ok}});
  setAviso(a=>({seq:a.seq+1,texto:ok?R.correta:T.errou,resposta:ok?'':ex.gabarito??ex.respostaEsperada??''}));
 };
 const seguir=()=>{parar();setAviso(a=>({...a,texto:'',resposta:''}));setV(avancarRevisao);};
 const resposta=(e:Exercicio)=>e.gabarito??e.respostaEsperada;
 return <section className="app-revisao" aria-labelledby="app-revisao-titulo">
  <header><p className="app-kicker">{R.rodada} {v.rodada}</p><h3 id="app-revisao-titulo" ref={foco} tabIndex={-1}>{v.fim?R.final:titulo??R.titulo}</h3><p>{R.separada}</p></header>
  <button type="button" className="btn btn-ghost app-revisao-voltar" onClick={()=>{parar();aoSair();}}>← {R.voltar}</button>
  {falha&&<p role="alert">{({'pt-BR':'Não foi possível salvar esta revisão. Ela continua aberta; evite fechar o aplicativo.',en:'This review could not be saved. It remains open; avoid closing the app.'}[LOCALE.codigo])}</p>}
  <p className="app-revisao-contagem">{certas}/{v.origem.length} {R.concluidas}</p>
  {!v.fim?<div className="exercicio" key={`${v.rodada}:${v.indice}`}>
   <p className="ex-n">{R.questao} {v.indice+1} {R.de} {v.fila.length}</p>
   <progress max={v.fila.length} value={v.indice+(v.resultado?1:0)} aria-label={R.progresso}/>
   <p className="ex-enunciado" id="app-revisao-pergunta" ref={pergunta} tabIndex={-1}>{ex.enunciado}</p>
   {ex.audio&&<button type="button" className="btn btn-ghost" aria-label={R.ouvir} onClick={()=>falar(ex.audio!,idioma)}>{T.ouvir}</button>}
   {opcoes&&<div className="ex-opcoes" role="radiogroup" aria-labelledby="app-revisao-pergunta" onKeyDown={e=>{
    if(v.resultado||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
    e.preventDefault();const lista=ex.opcoes!,selecionada=Math.max(0,lista.indexOf(v.escolha??''));
    const n=e.key==='Home'?0:e.key==='End'?lista.length-1:(selecionada+(['ArrowLeft','ArrowUp'].includes(e.key)?-1:1)+lista.length)%lista.length;
    editar({escolha:lista[n]});e.currentTarget.querySelectorAll<HTMLButtonElement>('[role=radio]')[n]?.focus();
   }}>{ex.opcoes!.map((o,n)=><button key={n} type="button" className={`ex-op ${v.escolha===o?'on':''} ${v.resultado&&o===ex.gabarito?'certa':''} ${v.resultado==='erro'&&v.escolha===o?'errada':''}`} role="radio" aria-checked={v.escolha===o} tabIndex={v.escolha===o||v.escolha===null&&n===0?0:-1} disabled={v.resultado!==null} onClick={()=>editar({escolha:o})}><span lang={lingua}>{o}</span>{v.resultado&&o===ex.gabarito&&<small> · {R.correta}</small>}{v.resultado==='erro'&&v.escolha===o&&<small> · {R.incorreta}</small>}</button>)}</div>}
   {ex.tipo==='sentence-ordering'&&<>
    <div className="ex-montada" aria-live="polite" lang={lingua}>{v.ordem.length?v.ordem.map(n=>ex.opcoes![n]).join(' '):T.pecas}</div>
    <div className="ex-opcoes">{ex.opcoes?.map((o,n)=><button type="button" className="ex-op" key={n} lang={lingua} disabled={v.resultado!==null||v.ordem.includes(n)} onClick={()=>editar({ordem:[...v.ordem,n]})}>{o}</button>)}</div>
    <button type="button" className="btn btn-ghost" disabled={v.resultado!==null||!v.ordem.length} onClick={()=>editar({ordem:[]})}>{T.limpar}</button>
   </>}
   {!opcoes&&ex.tipo!=='sentence-ordering'&&<input className="ex-texto" aria-labelledby="app-revisao-pergunta" lang={lingua} maxLength={8000} autoCapitalize="none" autoCorrect="off" spellCheck={false} value={v.texto} disabled={v.resultado!==null} onChange={e=>editar({texto:e.target.value})} onKeyDown={e=>{if(e.key==='Enter'&&!e.nativeEvent.isComposing&&pode&&!v.resultado){e.preventDefault();verificar();}}}/>}
   {v.resultado&&<div className={`ex-feedback ${v.resultado}`}><strong>{v.resultado==='ok'?R.correta:R.incorreta}</strong>{v.resultado==='erro'&&<p>{T.resposta} <span lang={lingua}>{resposta(ex)}</span></p>}<p>{ex.explicacao||R.semExplicacao}</p></div>}
   <div className="ex-acoes"><button type="button" className="btn btn-primary" disabled={!v.resultado&&!pode} onClick={v.resultado?seguir:verificar}>{!v.resultado?R.confirmar:v.indice===v.fila.length-1?R.terminar:R.seguir}</button></div>
  </div>:<div className="app-revisao-resumo">
   <p>{pendentes.length?R.restam:R.tudo}</p>
   {pendentes.length>0&&v.rodada<10000&&<button type="button" className="btn btn-primary" onClick={()=>{setAviso(a=>({...a,texto:'',resposta:''}));setV(novaRodada);}}>{R.repetir} ({pendentes.length})</button>}
   <details><summary>{R.ver}</summary><ol>{v.origem.map(n=><li key={n}><strong>{itens[n].enunciado}</strong><p>{v.respostas[n]?R.correta:R.incorreta} · {T.resposta} <span lang={lingua}>{resposta(itens[n])}</span></p><p>{itens[n].explicacao||R.semExplicacao}</p></li>)}</ol></details>
  </div>}
  {[0,1].map(slot=><p key={slot} className="sr-only" role="status" aria-live="polite" aria-atomic="true">{aviso.seq%2===slot&&<>{aviso.texto} <span lang={lingua}>{aviso.resposta}</span></>}</p>)}
 </section>;
}
