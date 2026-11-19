import assert from 'node:assert/strict';
import fs from 'node:fs';
import {criarArmazenamento} from '../src/plataforma/apk/armazenamento';
import {CHAVE_JOURNAL,alterar,lerJournal,reconciliar,serializar,valorValido,vazio} from '../src/plataforma/apk/recuperacao';
import {assinaturaExercicios} from '../src/lib/revisao/estudoModelo';
Object.assign(globalThis,{window:new EventTarget()});
class Memoria {
 constructor(entradas:Record<string,string>={}) {Object.defineProperty(this,'mapa',{value:new Map(Object.entries(entradas)),enumerable:false});for(const [k,v]of Object.entries(entradas))this.setItem(k,v);}
 declare mapa:Map<string,string>;
 getItem(k:string){return this.mapa.get(k)??null;}
 setItem(k:string,v:string){this.mapa.set(k,v);Object.defineProperty(this,k,{value:v,enumerable:true,configurable:true});}
 removeItem(k:string){this.mapa.delete(k);delete (this as unknown as Record<string,unknown>)[k];}
 clear(){for(const k of this.mapa.keys())this.removeItem(k);}
}
const dias='linvuu:dias-concluidos:v1:uid:a',outro='linvuu:dias-concluidos:v1:uid:b';
const checks:string[]=[];
function ambiente(local:Record<string,string>={},remoto:Record<string,string>={}) {
 const storage=new Memoria(local),persistido=new Map(Object.entries(remoto));let erro=false,falhaLeitura=false,falhaEscrita=false;
 const backend={snapshot:async()=>{if(falhaLeitura)throw Error('leitura');return {values:Object.fromEntries(persistido)};},set:async({key,value}:{key:string;value:string})=>{if(falhaEscrita)throw Error('escrita');persistido.set(key,value);},remove:async({key}:{key:string})=>{persistido.delete(key);}};
 const criar=()=>criarArmazenamento(backend,storage as unknown as Storage,v=>{erro=v;},30);
 return {storage,persistido,backend,criar,get erro(){return erro;},leitura:(v:boolean)=>{falhaLeitura=v;},escrita:(v:boolean)=>{falhaEscrita=v;}};
}
function doc(k:string,v:string|null,rev=1,pendente=false){const j=vazio();j.contador=rev;j.entradas[k]={valor:v,revisao:rev,pendente};return serializar(j);}
{
 const k='linvuu:pratica-apk:v1:a:en:1:s1:bloco:0:tentativa';
 const p={tipo:'tentativa',versao:1,assinatura:assinaturaExercicios([{id:'en-001-m01'}]),indice:0,escolha:null,ordem:[],texto:'answer draft',resultado:null,respostas:{},finalizada:false,em:new Date().toISOString()};
 const raw=JSON.stringify(p),a=ambiente(),m=a.criar();await m.hidratar();m.gravar(k,raw);await m.sincronizar();
 const b=ambiente({},Object.fromEntries(a.persistido));await b.criar().hidratar();assert.equal(b.storage.getItem(k),raw);
 for(const mal of [{...p,texto:'x'.repeat(8001)},{...p,ordem:[0,0]},{...p,respostas:{0:'true'}},{...p,indice:-1},{...p,versao:9}])assert.equal(valorValido(k,JSON.stringify(mal)),false);
 assert.equal(valorValido(k,JSON.stringify({acertos:1,total:1,em:p.em})),false);
 assert.equal(valorValido(k.slice(0,-10),raw),false);
 checks.push('tentativa parcial recuperada da cópia nativa com esquema limitado','tentativa rejeita tipos, duplicações, excesso e troca por resumo');
}
{
 const a=ambiente({[dias]:'["en:1"]','firebase:authUser:x':'segredo'},{[outro]:'["ru:2"]'}),m=a.criar();await m.hidratar();
 assert.equal(a.storage.getItem(outro),'["ru:2"]');assert.equal(a.storage.getItem(dias),'["en:1"]');
 const n=lerJournal(a.persistido.get(CHAVE_JOURNAL)!)!;assert.ok(n.entradas[dias]);assert.ok(n.entradas[outro]);assert.equal(n.entradas['firebase:authUser:x'],undefined);assert.equal(a.persistido.has(outro),false);
 checks.push('migração de dados válidos','isolamento de contas','credenciais excluídas do journal','legado nativo removido após confirmação');
 const b=ambiente({},Object.fromEntries(a.persistido));await b.criar().hidratar();assert.equal(b.storage.getItem(dias),'["en:1"]');checks.push('recuperação após perda do armazenamento WebView');
}
{
 const a=ambiente({[dias]:'[]'},{[dias]:'["en:1"]'});await a.criar().hidratar();assert.equal(a.storage.getItem(dias),'[]');checks.push('redefinição legada vazia não vira união');
}
{
 const a=ambiente({[CHAVE_JOURNAL]:doc(dias,'["en:1"]',2)},{[CHAVE_JOURNAL]:doc(dias,'["en:1","en:2"]',3)});await a.criar().hidratar();assert.equal(a.storage.getItem(dias),'["en:1","en:2"]');checks.push('revisão nativa mais recente vence cópia local antiga');
}
{
 const a=ambiente({[CHAVE_JOURNAL]:doc(dias,'["en:3"]',2,true)},{[CHAVE_JOURNAL]:doc(dias,'["en:1"]',10)});await a.criar().hidratar();assert.equal(a.storage.getItem(dias),'["en:3"]');assert.ok(lerJournal(a.persistido.get(CHAVE_JOURNAL)!)!.entradas[dias].revisao>10);checks.push('intenção local não confirmada é preservada e reversionada');
}
{
 const a=ambiente({[dias]:'["en:1"]'}),m=a.criar();await m.hidratar();a.escrita(true);m.gravar(dias,null);await m.sincronizar();assert.equal(a.erro,true);
 const b=ambiente(Object.fromEntries(a.storage.mapa),Object.fromEntries(a.persistido));await b.criar().hidratar();assert.equal(b.storage.getItem(dias),null);assert.equal(lerJournal(b.persistido.get(CHAVE_JOURNAL)!)!.entradas[dias].valor,null);checks.push('exclusão pendente não ressuscita após reabertura');
}
{
 const a=ambiente({[dias]:'["en:1"]'}),m=a.criar();await m.hidratar();a.escrita(true);m.gravar(dias,'["en:1","en:2"]');await m.sincronizar();assert.equal(a.erro,true);a.escrita(false);await m.sincronizar();assert.equal(a.erro,false);checks.push('falha de disco visível e reenvio confirmado');
}
{
 const a=ambiente({[dias]:'["en:1"]'});a.leitura(true);const m=a.criar();await m.hidratar();m.gravar(dias,'["en:2"]');await m.sincronizar();assert.equal(a.persistido.has(CHAVE_JOURNAL),false);a.leitura(false);await m.sincronizar();assert.equal(lerJournal(a.persistido.get(CHAVE_JOURNAL)!)!.entradas[dias].valor,'["en:2"]');checks.push('falha inicial mantém journal local e retry sem sobrescrever remoto desconhecido');
}
{
 const a=ambiente();let resolver!:(v:{values:Record<string,string>})=>void;
 a.backend.snapshot=()=>new Promise(r=>{resolver=r;});const m=a.criar(),p=m.hidratar();m.gravar(dias,'["en:2"]');resolver({values:{[dias]:'["en:1"]'}});await p;assert.equal(a.storage.getItem(dias),'["en:2"]');checks.push('escrita durante hidratação vence snapshot atrasado');
}
{
 const a=ambiente();a.backend.snapshot=()=>new Promise(()=>{});const m=a.criar();const inicio=Date.now();await m.hidratar();assert.ok(Date.now()-inicio<500);assert.equal(a.erro,true);checks.push('ponte travada tem prazo e não impede partida indefinidamente');
}
{
 const a=ambiente({[dias]:'["en:1"]'}),m=a.criar();await m.hidratar();
 const set=a.backend.set;let liberar!:()=>void,primeiro=true;
 a.backend.set=async o=>{if(primeiro){primeiro=false;await new Promise<void>(r=>{liberar=r;});}await set(o);};
 m.gravar(dias,'["en:2"]');await new Promise(r=>setTimeout(r,0));m.gravar(dias,'["en:3"]');liberar();await m.sincronizar();assert.equal(lerJournal(a.persistido.get(CHAVE_JOURNAL)!)!.entradas[dias].valor,'["en:3"]');checks.push('gravações concorrentes ordenadas e confirmação antiga não apaga novidade');
}
{
 const a=ambiente({[CHAVE_JOURNAL]:doc(dias,'["en:2"]'),[dias]:'json quebrado'});await a.criar().hidratar();assert.equal(a.storage.getItem(dias),'["en:2"]');checks.push('journal restaura valor bruto corrompido');
 const b=ambiente({[CHAVE_JOURNAL]:'quebrado'},{[CHAVE_JOURNAL]:doc(dias,'["en:3"]')});await b.criar().hidratar();assert.equal(b.storage.getItem(dias),'["en:3"]');checks.push('journal local inválido recuperado pela cópia nativa');
 const c=ambiente({[dias]:'["en:1"]'},{[CHAVE_JOURNAL]:'{"versao":99}'});await c.criar().hidratar();assert.equal(c.persistido.get(CHAVE_JOURNAL),'{"versao":99}');assert.equal(c.erro,true);checks.push('formato nativo desconhecido não é sobrescrito');
}
{
 const a=ambiente({[dias]:'["en:1"]'}),m=a.criar();await m.hidratar();const original=a.storage.setItem.bind(a.storage);
 a.storage.setItem=(k,v)=>{if(k===CHAVE_JOURNAL)throw Error('quota');original(k,v);};
 // O motor captura métodos originais: testar quota em uma nova instância.
 const n=a.criar();assert.throws(()=>n.gravar(dias,'["en:9"]'));assert.equal(a.storage.getItem(dias),'["en:1"]');assert.equal(a.erro,true);checks.push('quota não apresenta gravação como concluída');
}
{
 assert.equal(valorValido(dias,'["en:0"]'),false);assert.equal(valorValido('linvuu:progresso:v1','null'),false);assert.equal(valorValido('firebase:authUser:x','token'),false);
 const pratica='linvuu:pratica-apk:v1:a:en:1:s1:bloco:0';assert.equal(valorValido(pratica,'{"acertos":3,"total":2,"em":"2026-10-20"}'),false);
 assert.equal(lerJournal('{"versao":2,"contador":1,"entradas":{"firebase:authUser:x":{"revisao":1,"valor":"x"}}}'),null);
 const j=alterar(vazio(),dias,null);assert.equal(reconciliar(j,vazio()).entradas[dias].valor,null);checks.push('validação estrutural e exclusões explícitas');
}
{
 const a=ambiente({[dias]:'null'});await a.criar().hidratar();assert.equal(a.storage.getItem(dias),null);assert.equal(a.storage.getItem('linvuu:recuperacao-invalida:v1:'+dias),'null');assert.equal(a.erro,true);checks.push('JSON estruturalmente inválido isolado sem apagar evidência');
}
{
 const a=ambiente({[dias]:'["en:1"]'});await a.criar().hidratar();
 const set=a.storage.setItem.bind(a.storage);a.storage.setItem=(k,v)=>{if(k===dias)throw Error('interrupção entre journal e valor');set(k,v);};
 const m=a.criar();assert.throws(()=>m.gravar(dias,'["en:2"]'));
 const b=ambiente(Object.fromEntries(a.storage.mapa),Object.fromEntries(a.persistido));await b.criar().hidratar();assert.equal(b.storage.getItem(dias),'["en:2"]');checks.push('interrupção entre journal e valor recuperada na reabertura');
}
{
 const a=ambiente();a.backend.set=()=>new Promise(()=>{});const inicio=Date.now();await a.criar().hidratar();assert.ok(Date.now()-inicio<500);await new Promise(r=>setTimeout(r,40));assert.equal(a.erro,true);checks.push('gravação nativa travada não bloqueia a primeira tela');
}
{
 const a=ambiente({[dias]:'["en:1"]'},{[CHAVE_JOURNAL]:doc(dias,null,10)});await a.criar().hidratar();assert.equal(a.storage.getItem(dias),null);checks.push('tombstone nativo prevalece sobre resíduo legado sem journal local');
}
const resultado={checks,limite:'Storage/ponte simulados. Não comprova SharedPreferences real, TalkBack, login ou sincronização entre aparelhos.'};
fs.writeFileSync('design/apk/recuperacao-lote1-testes.json',JSON.stringify(resultado,null,2));console.log(JSON.stringify(resultado));
