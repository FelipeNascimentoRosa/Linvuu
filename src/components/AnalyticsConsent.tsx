import {useCallback,useEffect,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {LOCALE} from '../i18n';
import {analytics,rotaAnalytics,type AnalyticsChoice} from '../lib/analytics';
import {metaPixel} from '../lib/metaPixel';
import {tiktokPixel} from '../lib/tiktokPixel';
import {clarity} from '../lib/clarity';
import {APK} from '../plataforma';
import './analytics-consent.css';
const texts={
 'pt-BR':{title:'Preferências de análise',text:'Podemos usar o PostHog e o Microsoft Clarity para entender a navegação e melhorar o site? O Clarity grava a sessão sem o texto digitado em formulários. Não enviamos nome, e-mail nem respostas. É opcional e você pode mudar sua escolha aqui.',yes:'Permitir análise',no:'Não permitir',privacy:'Privacidade',saved:'Preferência salva.'},
 en:{title:'Analytics preferences',text:'May we use PostHog and Microsoft Clarity to understand navigation and improve the site? Clarity records the session without text typed into forms. We do not send your name, email or answers. This is optional; you can change your choice here.',yes:'Allow analytics',no:'Decline analytics',privacy:'Privacy',saved:'Preference saved.'},
 es:{title:'Preferencias de análisis',text:'¿Podemos usar PostHog y Microsoft Clarity para entender la navegación y mejorar el sitio? Clarity graba la sesión sin el texto escrito en formularios. No enviamos nombre, correo ni respuestas. Es opcional y puedes cambiar tu elección aquí.',yes:'Permitir análisis',no:'No permitir',privacy:'Privacidad',saved:'Preferencia guardada.'}
};
const ads={
 'pt-BR':{title:'Preferências de publicidade',text:'Podemos usar os pixels da Meta e do TikTok para medir anúncios? Eles recebem dados de navegação e podem usar cookies.',yes:'Permitir',no:'Recusar'},
 en:{title:'Advertising preferences',text:'May we use the Meta and TikTok pixels to measure ads? They receive browsing data and may use cookies.',yes:'Allow',no:'Decline'},
 es:{title:'Preferencias de publicidad',text:'¿Podemos usar los píxeles de Meta y TikTok para medir anuncios? Reciben datos de navegación y pueden usar cookies.',yes:'Permitir',no:'Rechazar'}
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
 useEffect(()=>{if(APK)return;if(choice==='yes')clarity.permitir();else if(choice==='no')clarity.recusar();},[choice]);
 useEffect(()=>{if(!APK&&adChoice==='yes'){metaPixel.pageView();tiktokPixel.pageView();}},[pathname,search,adChoice]);
 const medir=useCallback((el:HTMLElement|null)=>{const raiz=document.documentElement;if(!el||APK){raiz.style.removeProperty('--lv-consent-h');return;}const ro=new ResizeObserver(()=>raiz.style.setProperty('--lv-consent-h',`${Math.ceil(el.getBoundingClientRect().height)+16}px`));ro.observe(el);},[]);
 useEffect(()=>()=>{document.documentElement.style.removeProperty('--lv-consent-h');},[]);
 // Foco do teclado nunca fica atrás do aviso (WCAG 2.4.11): se cair embaixo dele, a página rola até aparecer.
 useEffect(()=>{if(APK)return;const f=(e:FocusEvent)=>{const a=e.target as HTMLElement|null,av=document.querySelector<HTMLElement>('.analytics-consent[data-flutuante="true"]');if(!a||!av||av.contains(a))return;const r=a.getBoundingClientRect(),topo=av.getBoundingClientRect().top;if(r.bottom>topo-8)window.scrollBy({top:r.bottom-topo+24,behavior:'instant' as ScrollBehavior});};document.addEventListener('focusin',f);return()=>document.removeEventListener('focusin',f);},[]);
 useEffect(()=>{const abrir=()=>setAberto(true);window.addEventListener(EVENTO_PREFERENCIAS,abrir);return()=>window.removeEventListener(EVENTO_PREFERENCIAS,abrir);},[]);
 if(!analytics.configured()&&APK)return null;
 const pendente=(analytics.configured()&&choice===null)||(!APK&&adChoice===null);
 // Site: escolha feita = painel fora da página (não ocupa texto nem espaço; nada se desloca). O app mantém o painel no fluxo.
 if(!APK&&!pendente&&!aberto){document.documentElement.style.removeProperty('--lv-consent-h');return (choice||adChoice)?<span className="sr-only" role="status">{t.saved}</span>:null;}
 const choose=(v:'yes'|'no')=>{analytics.choose(v);setChoice(analytics.choice());};
 const chooseAd=(v:'yes'|'no')=>{metaPixel.choose(v);tiktokPixel.choose(v);setAdChoice(metaPixel.choice());};
 return <aside ref={medir} className="analytics-consent" data-pending={pendente} data-flutuante={APK?undefined:'true'} aria-label={t.title}>
 {analytics.configured()&&<details className="analytics-consent-analytics" open={choice===null}><summary>{t.title}</summary><p>{t.text} <Link to="/privacidade">{t.privacy}</Link></p><div className="analytics-actions"><button type="button" className="btn btn-ghost" aria-pressed={choice==='yes'} onClick={()=>choose('yes')}>{t.yes}</button><button type="button" className="btn btn-ghost" aria-pressed={choice==='no'} onClick={()=>choose('no')}>{t.no}</button></div></details>}
 {!APK&&<details className="analytics-consent-ads" open={adChoice===null}><summary>{ad.title}</summary><p>{ad.text} <Link to="/privacidade">{t.privacy}</Link></p><div className="analytics-actions"><button type="button" className="btn btn-ghost" aria-pressed={adChoice==='yes'} onClick={()=>chooseAd('yes')}>{ad.yes}</button><button type="button" className="btn btn-ghost" aria-pressed={adChoice==='no'} onClick={()=>chooseAd('no')}>{ad.no}</button></div></details>}
 {(choice||adChoice)&&<span className="sr-only" role="status">{t.saved}</span>}
 {!APK&&aberto&&!pendente&&<div className="analytics-actions analytics-fechar"><button type="button" className="btn btn-ghost" onClick={()=>setAberto(false)}>{x.fechar}</button></div>}</aside>;
}
