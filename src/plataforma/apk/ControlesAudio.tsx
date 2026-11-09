import {useSyncExternalStore} from 'react';
import {LOCALE} from '../../i18n';
import {lerEstadoAudio,observarAudio,pausar,retomar,parar,definirVelocidade,repetirTrecho,tentarNovamente} from './audio';
const copia={
 'pt-BR':{titulo:'Áudio da sessão',inicio:'Para começar, toque em Ouvir no conteúdo da aula. As gravações precisam de internet.',carregando:'Carregando gravação…',tocando:'Reproduzindo',pausado:'Pausado',concluido:'Áudio concluído',parado:'Áudio parado',pausar:'Pausar',retomar:'Retomar',parar:'Parar',repetir:'Repetir trecho',velocidade:'Velocidade',rede:'Não foi possível carregar o áudio. Verifique a conexão e tente novamente.',arquivo:'Esta gravação não está disponível agora. Tente novamente.',acesso:'Entre com uma conta com acesso para ouvir esta gravação.',tentar:'Tentar novamente'},
 en:{titulo:'Session audio',inicio:'To begin, use the Listen button in the lesson content. Recordings require internet.',carregando:'Loading recording…',tocando:'Playing',pausado:'Paused',concluido:'Audio finished',parado:'Audio stopped',pausar:'Pause',retomar:'Resume',parar:'Stop',repetir:'Repeat segment',velocidade:'Speed',rede:'Could not load audio. Check your connection and try again.',arquivo:'This recording is currently unavailable. Try again.',acesso:'Sign in with an account that has access to this recording.',tentar:'Try again'}};
/** `temAudio`: o bloco atual tem algo para ouvir. Sem áudio e nada tocando, o painel não ocupa a tela. */
export function ControlesAudio({temAudio=true}:{temAudio?:boolean}={}){
 const e=useSyncExternalStore(observarAudio,lerEstadoAudio),t=copia[LOCALE.codigo];
 if(!temAudio&&['parado','concluido'].includes(e.fase)&&!e.erro)return null;
 return <section className="app-audio-controles" aria-label={t.titulo}><details open><summary>{t.titulo}</summary>
  <p role="status" aria-live="polite" aria-atomic="true">{e.erro?t[e.erro]:e.repetivel?t[e.fase as Exclude<typeof e.fase,'erro'>]:t.inicio}{e.total>1&&!e.erro?` · ${e.trecho}/${e.total}`:''}</p>
  <div className="app-audio-botoes">
   <button type="button" className="btn btn-ghost" disabled={!['tocando','pausado'].includes(e.fase)} onClick={()=>e.fase==='pausado'?void retomar():pausar()}>{e.fase==='pausado'?t.retomar:t.pausar}</button>
   <button type="button" className="btn btn-ghost" disabled={!['tocando','pausado','carregando'].includes(e.fase)} onClick={parar}>{t.parar}</button>
   <button type="button" className="btn btn-ghost" disabled={!e.repetivel} onClick={()=>void repetirTrecho()}>{t.repetir}</button>
   <label>{t.velocidade}<select value={e.velocidade} onChange={ev=>definirVelocidade(Number(ev.target.value))}><option value={0.75}>0,75×</option><option value={1}>1×</option><option value={1.25}>1,25×</option></select></label>
  </div>
  {e.erro&&<button type="button" className="btn btn-primary" onClick={()=>void tentarNovamente()}>{t.tentar}</button>}
 </details></section>;
}
