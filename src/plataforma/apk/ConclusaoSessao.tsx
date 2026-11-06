import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {LOCALE} from '../../i18n';
import './conclusao.css';

const mensagens={
 'pt-BR':{passo:'Mais um passo.',leitura:'Leitura concluída',pratica:'Sessão concluída',historico:'Conclusão anterior preservada',ler:'Você marcou esta sessão de leitura e escuta como concluída. Ela não tem exercício corrigido.',feito:'Você concluiu a prática desta sessão. Continue no seu ritmo.',anterior:'Seu histórico está preservado. Não há um resultado corrigido compatível com a versão atual para exibir.',resultado:'Resultado da tentativa registrada',acertos:'acertos',revisao:'Revisão dos erros',pendente:'Há erros para revisar',finalizada:'Erros revisados com acerto',semErros:'Nenhum erro na tentativa registrada',naoAvaliada:'Sem avaliação automática',continuar:'Próxima sessão',percurso:'Voltar ao percurso',nota:'Retome esta sessão para reforçar o que aprendeu.',guardado:'Progresso salvo neste aparelho',falha:'Não foi possível confirmar o registro local. Tente novamente antes de sair.',tentar:'Tentar registrar novamente'},
 en:{passo:'One step further.',leitura:'Reading complete',pratica:'Session complete',historico:'Previous completion preserved',ler:'You marked this reading and listening session as complete. It has no marked test.',feito:'You completed this session’s practice. Keep learning at your own pace.',anterior:'Your history is preserved. No marked result compatible with the current version is available.',resultado:'Recorded attempt result',acertos:'correct',revisao:'Mistake review',pendente:'Some mistakes still need review',finalizada:'Mistakes answered correctly in review',semErros:'No mistakes in the recorded attempt',naoAvaliada:'No automatic assessment',continuar:'Next session',percurso:'Back to your path',nota:'Return to this session to reinforce what you learned.',guardado:'Progress saved on this device',falha:'The local record could not be confirmed. Try again before leaving.',tentar:'Try saving again'},
 es:{passo:'Un paso más.',leitura:'Lectura completada',pratica:'Sesión completada',historico:'Finalización anterior conservada',ler:'Marcaste esta sesión de lectura y escucha como completada. No tiene ejercicio corregido.',feito:'Completaste la práctica de esta sesión. Sigue a tu ritmo.',anterior:'Tu historial se conserva. No hay un resultado corregido compatible con la versión actual para mostrar.',resultado:'Resultado del intento registrado',acertos:'aciertos',revisao:'Repaso de errores',pendente:'Quedan errores por repasar',finalizada:'Errores acertados en el repaso',semErros:'Sin errores en el intento registrado',naoAvaliada:'Sin evaluación automática',continuar:'Siguiente sesión',percurso:'Volver al recorrido',nota:'Vuelve a esta sesión para reforzar lo aprendido.',guardado:'Progreso guardado en este dispositivo',falha:'No se pudo confirmar el registro local. Inténtalo de nuevo antes de salir.',tentar:'Intentar guardar de nuevo'}
};
export type TipoConclusao='leitura'|'pratica'|'historico';
export function ConclusaoSessao({tipo,resultado,revisao,nova,aoExibir,idioma,proximo,confirmado,tentar}:{tipo:TipoConclusao;resultado:{acertos:number;total:number}|null;revisao:'pendente'|'finalizada'|'semErros'|null;nova:boolean;aoExibir:()=>void;idioma:string;proximo?:string;confirmado:boolean;tentar:()=>void}){
 const M=mensagens[LOCALE.codigo],titulo=useRef<HTMLHeadingElement>(null);
 const [animar]=useState(nova&&confirmado);
 useEffect(()=>{if(nova&&confirmado){titulo.current?.focus();aoExibir();}},[nova,confirmado,aoExibir]);
 return <section className="app-conclusao" data-nova={animar?'sim':'nao'} data-confirmada={confirmado?'sim':'nao'} aria-labelledby="app-conclusao-titulo">
  <div className="app-conclusao-sinal" aria-hidden="true"><svg viewBox="0 0 80 80" focusable="false"><circle cx="40" cy="40" r="34"/><path d={confirmado?'m23 40 12 12 23-25':'M40 22v24m0 9v1'}/></svg></div>
  <p className="app-kicker">{M.passo}</p><h2 id="app-conclusao-titulo" ref={titulo} tabIndex={-1}>{M[tipo]}</h2>
  <p>{tipo==='leitura'?M.ler:tipo==='historico'?M.anterior:M.feito}</p>
  {(tipo==='pratica'&&!!resultado||!!revisao)&&<dl className="app-conclusao-dados">
   <div><dt>{tipo==='leitura'?M.naoAvaliada:M.resultado}</dt><dd>{tipo==='pratica'&&resultado?`${resultado.acertos}/${resultado.total} ${M.acertos}`:'—'}</dd></div>
   {revisao&&<div><dt>{M.revisao}</dt><dd>{M[revisao]}</dd></div>}
  </dl>}
  {!confirmado?<div role="alert"><p>{M.falha}</p><button className="btn btn-primary" type="button" onClick={tentar}>{M.tentar}</button></div>:<p className="app-conclusao-registro">{M.guardado}</p>}
  <div className="app-conclusao-acoes">{proximo&&confirmado&&<Link className="btn btn-primary concluida-prox" to={proximo}>{M.continuar}<span aria-hidden="true"> →</span></Link>}<Link className="btn btn-ghost" to={`/curso/${idioma}`}>{M.percurso}</Link></div>
  <p className="app-conclusao-nota">{M.nota}</p>
 </section>;
}
