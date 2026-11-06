// Eventos explícitos via API pública de captura. Sem SDK, autocapture ou replay.
export const ANALYTICS_CHOICE='linvuu:analytics:v1', ANALYTICS_ID='linvuu:analytics-id:v1';
export type AnalyticsChoice='yes'|'no'|null;
export type AnalyticsEvent='page_viewed'|'course_viewed'|'lesson_started'|'practice_completed'|'lesson_completed'|'checkout_started'|'checkout_returned'|'view_pricing'|'select_plan'|'signup_completed';
type Config={token:string;host:string;platform:'web'|'android';environment:'production'|'test';locale:string;version:string};
type Store=Pick<Storage,'getItem'|'setItem'|'removeItem'>;
export function criarAnalytics(config:Config,store:Store,pedir:typeof fetch=fetch){
 let count=0;const requests=new Set<AbortController>();
 const configured=()=>/^phc_[A-Za-z0-9_-]{10,}$/.test(config.token)&&['https://us.i.posthog.com','https://eu.i.posthog.com'].includes(config.host);
 const choice=():AnalyticsChoice=>{try{const v=store.getItem(ANALYTICS_CHOICE);return v==='yes'||v==='no'?v:null;}catch{return null;}};
 const choose=(value:'yes'|'no')=>{try{store.setItem(ANALYTICS_CHOICE,value);if(value==='no'){store.removeItem(ANALYTICS_ID);for(const c of requests)c.abort();requests.clear();}}catch{/* sem persistência, não coletar */}};
 async function capture(event:AnalyticsEvent,props:Record<string,unknown>={}){
  if(!configured()||choice()!=='yes'||count>=120)return false;
  if(!['page_viewed','course_viewed','lesson_started','practice_completed','lesson_completed','checkout_started','checkout_returned','view_pricing','select_plan','signup_completed'].includes(event))return false;
  let id:string;try{id=store.getItem(ANALYTICS_ID)??'';if(!/^[a-f0-9-]{36}$/.test(id)){id=crypto.randomUUID();store.setItem(ANALYTICS_ID,id);}}catch{return false;}
  // Nunca aceitar URLs, texto livre, UIDs Firebase, respostas ou mensagens de erro.
  const properties:Record<string,unknown>={platform:config.platform,environment:config.environment,interface_language:typeof document==='undefined'?config.locale:document.documentElement.lang||config.locale,version:config.version,$process_person_profile:false,$geoip_disable:true};
  if(typeof props.page==='string'&&['home','courses','course','lesson','grammar','account','login','signup','plans','privacy','terms'].includes(props.page))properties.page=props.page;
  if(typeof props.study_language==='string'&&['en','es','fr','it','de','ru','br'].includes(props.study_language))properties.study_language=props.study_language;
  if(Number.isInteger(props.lesson)&&Number(props.lesson)>0&&Number(props.lesson)<=10000)properties.lesson=props.lesson;
  if(typeof props.billing_plan==='string'&&['mensal','trimestral','trimestral-pix','anual'].includes(props.billing_plan))properties.billing_plan=props.billing_plan;
  const controller=new AbortController();requests.add(controller);count++;const timeout=setTimeout(()=>controller.abort(),5000);
  try{const r=await pedir(config.host+'/i/v0/e/',{method:'POST',credentials:'omit',referrerPolicy:'no-referrer',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({api_key:config.token,distinct_id:id,event,properties,timestamp:new Date().toISOString()}),signal:controller.signal});return r.ok;}catch{return false;}finally{clearTimeout(timeout);requests.delete(controller);}
 }
 return {choice,choose,capture,configured};
}
const env=(import.meta.env??{}) as Record<string,string|undefined>;
const apk=env.VITE_ALVO==='apk';
const storage:Store={getItem:k=>localStorage.getItem(k),setItem:(k,v)=>localStorage.setItem(k,v),removeItem:k=>localStorage.removeItem(k)};
export const analytics=criarAnalytics({token:env.VITE_POSTHOG_TOKEN??'',host:env.VITE_POSTHOG_HOST??'',platform:apk?'android':'web',environment:apk||env.VITE_ANALYTICS_ENV==='test'?'test':'production',locale:typeof document==='undefined'?'pt-BR':document.documentElement.lang||'pt-BR',version:env.VITE_APK_BUILD_ID??'web'},storage);
export function rotaAnalytics(path:string){
 const pages:Record<string,string>={'/':'home','/cursos':'courses','/gramatica':'grammar','/conta':'account','/assinatura':'plans','/entrar':'login','/cadastro':'signup','/privacidade':'privacy','/termos':'terms'};
 const m=path.match(/^\/curso\/(en|es|fr|it|de|ru|br)(?:\/dia\/([1-9]\d{0,3}))?\/?$/);
 if(m)return {page:m[2]?'lesson':'course',study_language:m[1],...(m[2]?{lesson:Number(m[2])}:{})};
 if(/^\/gramatica\/(en|es|fr|it|de|ru|br)$/.test(path))return {page:'grammar',study_language:path.split('/')[2]};
 return pages[path]?{page:pages[path]}:null;
}
