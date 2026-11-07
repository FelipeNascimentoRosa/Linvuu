import {useState} from 'react';
import {LOCALE} from '../../i18n';
import {EMAIL_OFICIAL} from '../../config/site';
import {useAuth} from '../../lib/AuthContext';
import {apagarEstudoDesteAparelho} from './apagarLocal';
import {comprasPlayDisponiveis} from './comprasPlay';
import {ExclusaoDireta} from '../../components/ExclusaoDireta';
const copia={
 'pt-BR':{titulo:'Excluir conta e dados',texto:'Solicite a exclusão da conta Linvuu e dos dados associados. Você pode iniciar o pedido mesmo sem conseguir entrar.',email:'E-mail da conta',abrir:'Preparar e-mail de exclusão',aviso:'O botão prepara uma mensagem no seu aplicativo de e-mail. Você precisa enviá-la; a conta não é excluída ao tocar aqui.',assinatura:'Excluir a conta e cancelar uma assinatura são ações diferentes. Informe se há assinatura ativa para que o suporte oriente o cancelamento e a exclusão, sem cobranças inesperadas.',retencao:'O suporte verificará a titularidade e informará o prazo e eventuais dados que precisem ser conservados por obrigação legal. Não envie senha nem documentos nesta mensagem.',assunto:'Linvuu — solicitação de exclusão de conta e dados',corpo:'Solicito excluir minha conta Linvuu e os dados associados. E-mail da conta: ',alternativa:'Se o e-mail não abrir, envie seu pedido para'},
 en:{titulo:'Delete account and data',texto:'Request deletion of your Linvuu account and associated data, even if you cannot sign in.',email:'Account email',abrir:'Prepare deletion email',aviso:'This prepares a message in your email app. You must send it; tapping here does not delete your account.',assinatura:'Deleting an account and cancelling a subscription are different actions. Mention any active subscription so support can help with cancellation and deletion.',retencao:'Support will verify ownership and explain the timeframe and any legally required retention. Do not send passwords or documents in this message.',assunto:'Linvuu — account and data deletion request',corpo:'Please delete my Linvuu account and associated data. Account email: ',alternativa:'If your email app does not open, send your request to'}};
const play={'pt-BR':'Assinatura pelo Google Play: excluir a conta não interrompe a cobrança da loja. Cancele antes em Google Play › Pagamentos e assinaturas › Assinaturas.',en:'Google Play subscription: deleting your account does not stop Google Play billing. Cancel first in Google Play › Payments & subscriptions › Subscriptions.'} as const;
export function ExclusaoConta(){const t=copia[LOCALE.codigo],{usuario}=useAuth(),[email,setEmail]=useState(usuario?.email??'');
 return <section className="app-exclusao" id="excluir-conta" aria-labelledby="exclusao-titulo"><h2 id="exclusao-titulo">{t.titulo}</h2><p>{t.texto}</p><p>{t.assinatura}</p>{comprasPlayDisponiveis()&&<p>{play[LOCALE.codigo]}</p>}<p>{t.retencao}</p><ExclusaoDireta origem="app"/><label htmlFor="exclusao-email">{t.email}</label><input id="exclusao-email" type="email" autoComplete="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/><a className="btn btn-ghost" href={`mailto:${EMAIL_OFICIAL}?subject=${encodeURIComponent(t.assunto)}&body=${encodeURIComponent(t.corpo+email.trim())}`}>{t.abrir}</a><p>{t.aviso}</p><p>{t.alternativa} <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p></section>;
}

const local={
 'pt-BR':{titulo:'Progresso salvo neste aparelho',texto:'Apaga sessões concluídas, prática e revisões guardadas neste celular para quem está usando o app agora. Não exclui a conta nem dados no servidor.',apagar:'Apagar progresso deste aparelho',confirmar:'Confirmar: apagar agora',cancelar:'Cancelar',feito:(n:number)=>n?`Pronto: ${n} registro(s) de estudo apagado(s) deste aparelho.`:'Não havia progresso salvo neste aparelho.',erro:'Não foi possível apagar agora. Tente novamente.'},
 en:{titulo:'Progress saved on this device',texto:'Deletes completed sessions, practice and reviews stored on this phone for whoever is using the app now. It does not delete your account or server data.',apagar:'Delete progress on this device',confirmar:'Confirm: delete now',cancelar:'Cancel',feito:(n:number)=>n?`Done: ${n} study record(s) deleted from this device.`:'There was no progress saved on this device.',erro:'Could not delete now. Please try again.'},
 };
/** Apagar dados locais em dois toques (sem janela do sistema), com resultado anunciado. */
export function ApagarProgressoLocal(){
 const t=local[LOCALE.codigo],{usuario}=useAuth(),[etapa,setEtapa]=useState<'inicio'|'confirmar'|'ocupado'>('inicio'),[msg,setMsg]=useState('');
 const apagar=async()=>{setEtapa('ocupado');try{setMsg(t.feito(await apagarEstudoDesteAparelho(usuario?.uid??null)));}catch{setMsg(t.erro);}finally{setEtapa('inicio');}};
 return <section className="app-exclusao" aria-labelledby="apagar-local-titulo"><h2 id="apagar-local-titulo">{t.titulo}</h2><p>{t.texto}</p>
  {etapa==='confirmar'?<><button type="button" className="btn btn-primary" onClick={()=>void apagar()}>{t.confirmar}</button><button type="button" className="btn btn-ghost" onClick={()=>setEtapa('inicio')}>{t.cancelar}</button></>
   :<button type="button" className="btn btn-ghost" disabled={etapa==='ocupado'} onClick={()=>{setMsg('');setEtapa('confirmar');}}>{t.apagar}</button>}
  <p role="status" aria-live="polite">{msg}</p></section>;
}
