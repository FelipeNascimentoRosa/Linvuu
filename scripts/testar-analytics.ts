import assert from 'node:assert/strict';
import {criarAnalytics,ANALYTICS_ID,ANALYTICS_CHOICE,rotaAnalytics} from '../src/lib/analytics';
const data=new Map<string,string>(),store={getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v);},removeItem:(k:string)=>{data.delete(k);}};
const calls:{url:string;init:RequestInit}[]=[];
const send=(async(url:unknown,init:RequestInit)=>{calls.push({url:String(url),init});return new Response('{}',{status:200});}) as typeof fetch;
const cfg={token:'phc_fixture_not_a_real_token',host:'https://us.i.posthog.com',platform:'web' as const,environment:'test' as const,locale:'pt-BR',version:'test'};
const a=criarAnalytics(cfg,store,send);
await a.capture('page_viewed',{page:'home'});assert.equal(calls.length,0);assert.equal(data.has(ANALYTICS_ID),false);
// O consentimento antigo de medição não autoriza este fornecedor.
data.set('linvuu:medicao:v1','sim');await a.capture('page_viewed');assert.equal(calls.length,0);
a.choose('yes');await a.capture('page_viewed',{page:'home',email:'private@example.com',url:'https://linvuu.com.br/?token=secret',answer:'secret',uid:'secret'});
assert.equal(calls.length,1);const body=JSON.parse(String(calls[0].init.body));assert.equal(body.properties.environment,'test');assert.equal(body.properties.$process_person_profile,false);assert.equal(body.properties.$geoip_disable,true);assert.equal(calls[0].init.credentials,'omit');assert.equal(calls[0].init.referrerPolicy,'no-referrer');assert.doesNotMatch(String(calls[0].init.body),/private@example|secret|answer|email/);
assert.equal(calls[0].init.keepalive,true,'envio opt-in resiste à navegação entre páginas');
await a.capture('checkout_started',{page:'plans',billing_plan:'trimestral-pix',uid:'private',email:'hidden'});
const checkout=JSON.parse(String(calls[1].init.body));
assert.equal(checkout.event,'checkout_started');
assert.equal(checkout.properties.billing_plan,'trimestral-pix');
assert.doesNotMatch(String(calls[1].init.body),/private|hidden|email|uid/);
await a.capture('checkout_returned',{page:'plans',billing_plan:'desconto_inventado',token:'secret'});
const retorno=JSON.parse(String(calls[2].init.body));
assert.equal(retorno.event,'checkout_returned');
assert.equal(retorno.properties.billing_plan,undefined);
assert.doesNotMatch(JSON.stringify(retorno.properties),/secret|desconto_inventado|token/);
const first=data.get(ANALYTICS_ID);await a.capture('lesson_started',{study_language:'ru',lesson:3});assert.equal(JSON.parse(String(calls[3].init.body)).distinct_id,first);
a.choose('no');assert.equal(data.has(ANALYTICS_ID),false);await a.capture('page_viewed');assert.equal(calls.length,4);
a.choose('yes');await a.capture('lesson_started');assert.notEqual(data.get(ANALYTICS_ID),first);
const noStorage={getItem:()=>{throw Error('storage blocked');},setItem:()=>{throw Error('storage blocked');},removeItem:()=>{throw Error('storage blocked');}};
const b=criarAnalytics(cfg,noStorage,send);b.choose('yes');await b.capture('page_viewed');assert.equal(calls.length,5);
const invalid=criarAnalytics({...cfg,host:'https://attacker.invalid'},store,send);assert.equal(invalid.configured(),false);await invalid.capture('page_viewed');assert.equal(calls.length,5);
assert.deepEqual(rotaAnalytics('/curso/en/dia/3'),{page:'lesson',study_language:'en',lesson:3});assert.equal(rotaAnalytics('/entrar?token=secret'),null);assert.equal(rotaAnalytics('/user/private@example.com'),null);
const pending=criarAnalytics(cfg,store,((_u,init)=>new Promise((_resolve,reject)=>{init?.signal?.addEventListener('abort',()=>reject(Error('aborted')));})) as typeof fetch);
const request=pending.capture('page_viewed');pending.choose('no');assert.equal(await request,false);
assert.equal(data.get(ANALYTICS_CHOICE),'no');
{
  // Revisão espaçada: eventos novos só com a nota da lista fechada e a contagem de blocos; nada de bloco, questão ou resposta.
  const rev=criarAnalytics(cfg,store,send);rev.choose('yes');const antes=calls.length;
  await rev.capture('review_started',{study_language:'ru',blocks:4,answer:'secret',block:'ru_3_S1_B2'});
  await rev.capture('review_rated',{study_language:'ru',rating:'good',uid:'private'});
  await rev.capture('review_rated',{study_language:'ru',rating:'excelente'});
  await rev.capture('review_completed',{study_language:'ru',blocks:99999});
  const ev=calls.slice(antes).map(c=>JSON.parse(String(c.init.body)));
  assert.deepEqual(ev.map(e=>e.event),['review_started','review_rated','review_rated','review_completed']);
  assert.equal(ev[0].properties.blocks,4);assert.equal(ev[0].properties.study_language,'ru');
  assert.equal(ev[1].properties.rating,'good');assert.equal(ev[2].properties.rating,undefined,'nota fora da lista não passa');
  assert.equal(ev[3].properties.blocks,undefined,'contagem absurda não passa');
  assert.doesNotMatch(JSON.stringify(ev),/secret|private|ru_3_S1_B2|excelente/);
}
console.log('ok: opt-in próprio, recusa/revogação, ID rotativo, payload mínimo, sem storage/rede bloqueiam sem quebrar o app');
