import {useEffect,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {LOCALE} from '../i18n';
import {analytics,rotaAnalytics,type AnalyticsChoice} from '../lib/analytics';
import {metaPixel} from '../lib/metaPixel';
import {tiktokPixel} from '../lib/tiktokPixel';
import {APK} from '../plataforma';
import './analytics-consent.css';
const texts={
 'pt-BR':{title:'Preferências de análise',text:'Podemos usar o PostHog para entender a navegação e melhorar as aulas? Enviamos eventos com um identificador aleatório deste aparelho, sem nome, e-mail ou respostas. Não gravamos a tela. É opcional e você pode mudar sua escolha aqui.',yes:'Permitir análise',no:'Não permitir',privacy:'Privacidade',saved:'Preferência salva.'},
 en:{title:'Analytics preferences',text:'May we use PostHog to understand navigation and improve lessons? We send events with a random device identifier, without your name, email or answers. We do not record your screen. This is optional; you can change your choice here.',yes:'Allow analytics',no:'Decline analytics',privacy:'Privacy',saved:'Preference saved.'},
 es:{title:'Preferencias de análisis',text:'¿Podemos usar PostHog para entender la navegación y mejorar las clases? Enviamos eventos con un identificador aleatorio de este dispositivo, sin nombre, correo ni respuestas. No grabamos la pantalla. Es opcional y puedes cambiar tu elección aquí.',yes:'Permitir análisis',no:'No permitir',privacy:'Privacidad',saved:'Preferencia guardada.'}
};
const ads={
 'pt-BR':{title:'Preferências de publicidade',text:'Podemos usar os pixels da Meta e do TikTok para medir campanhas da Linvuu e criar públicos de anúncios? Essas empresas recebem dados de navegação e podem usar cookies. Você pode recusar ou mudar de ideia aqui.',yes:'Permitir publicidade',no:'Não permitir publicidade'},
 en:{title:'Advertising preferences',text:'May we use the Meta and TikTok pixels to measure Linvuu campaigns and create advertising audiences? These companies receive browsing data and may use cookies. You can decline or change your choice here.',yes:'Allow advertising',no:'Decline advertising'},
 es:{title:'Preferencias de publicidad',text:'¿Podemos usar los píxeles de Meta y TikTok para medir las campañas de Linvuu y crear públicos publicitarios? Estas empresas reciben datos de navegación y pueden usar cookies. Puedes rechazar o cambiar tu elección aquí.',yes:'Permitir publicidad',no:'No permitir publicidad'}
};
const extra={'pt-BR':{fechar:'Fechar',reabrir:'Preferências de cookies'},en:{fechar:'Close',reabrir:'Cookie preferences'},es:{fechar:'Cerrar',reabrir:'Preferencias de cookies'}};
const EVENTO_PREFERENCIAS='linvuu:preferencias-privacidade';
/** No site, o painel só aparece enquanto falta uma escolha; depois, reabre por este botão (rodapé e página de privacidade). */
export function BotaoPreferencias({className}:{className?:string}){
 if(APK)return null;
 return <button type="button" className={className?`link lv-preferencias ${className}`:'link lv-preferencias'} onClick={()=>window.dispatchEvent(new Event(EVENTO_PREFERENCIAS))}>{extra[LOCALE.codigo].reabrir}</button>;
}
export function AnalyticsConsent(){
 const t=texts[LOCALE.codigo],ad=ads[LOCALE.codigo],x=extra[LOCALE.codigo],[aberto,setAberto]=useState(false),{pathname,search}=useLocation(),[choice,setChoice]=useState<AnalyticsChoice>(()=>analytics.choice()),[adChoice,setAdChoice]=useState<AnalyticsChoice>(()=>metaPixel.choice());
 useEffect(()=>{if(choice!=='yes')return;const props=rotaAnalytics(pathname);if(!props)return;void analytics.capture('page_viewed',props);if(props.page==='course')void analytics.capture('course_viewed',props);if(props.page==='lesson')void analytics.capture('lesson_started',props);},[pathname,choice]);
 useEffect(()=>{if(!APK&&adChoice==='yes'){metaPixel.pageView();tiktokPixel.pageView();}},[pathname,search,adChoice]);
 useEffect(()=>{const abrir=()=>setAberto(true);window.addEventListener(EVENTO_PREFERENCIAS,abrir);return()=>window.removeEventListener(EVENTO_PREFERENCIAS,abrir);},[]);
 if(!analytics.configured()&&APK)return null;
 const pendente=(analytics.configured()&&choice===null)||(!APK&&adChoice===null);
 // Site: escolha feita = painel fora da página (não ocupa texto nem espaço; nada se desloca). O app mantém o painel no fluxo.
 if(!APK&&!pendente&&!aberto)return (choice||adChoice)?<span className="sr-only" role="status">{t.saved}</span>:null;
 const choose=(v:'yes'|'no')=>{analytics.choose(v);setChoice(analytics.choice());};
 const chooseAd=(v:'yes'|'no')=>{metaPixel.choose(v);tiktokPixel.choose(v);setAdChoice(metaPixel.choice());};
 return <aside className="analytics-consent" data-pending={pendente} data-flutuante={APK?undefined:'true'} aria-label={t.title}>
 {analytics.configured()&&<details className="analytics-consent-analytics" open={choice===null}><summary>{t.title}</summary><p>{t.text} <Link to="/privacidade">{t.privacy}</Link></p><div className="analytics-actions"><button type="button" className="btn btn-ghost" aria-pressed={choice==='yes'} onClick={()=>choose('yes')}>{t.yes}</button><button type="button" className="btn btn-ghost" aria-pressed={choice==='no'} onClick={()=>choose('no')}>{t.no}</button></div></details>}
 {!APK&&<details className="analytics-consent-ads" open={adChoice===null}><summary>{ad.title}</summary><p>{ad.text} <Link to="/privacidade">{t.privacy}</Link></p><div className="analytics-actions"><button type="button" className="btn btn-ghost" aria-pressed={adChoice==='yes'} onClick={()=>chooseAd('yes')}>{ad.yes}</button><button type="button" className="btn btn-ghost" aria-pressed={adChoice==='no'} onClick={()=>chooseAd('no')}>{ad.no}</button></div></details>}
 {(choice||adChoice)&&<span className="sr-only" role="status">{t.saved}</span>}
 {!APK&&aberto&&!pendente&&<div className="analytics-actions analytics-fechar"><button type="button" className="btn btn-ghost" onClick={()=>setAberto(false)}>{x.fechar}</button></div>}</aside>;
}
