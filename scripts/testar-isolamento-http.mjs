import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const port=43922;
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'linvuu-audio-teste-'));
if (!path.resolve(fixture).startsWith(path.resolve(os.tmpdir()) + path.sep)) throw new Error('Pasta de teste fora do diretório temporário');
fs.mkdirSync(path.join(fixture,'audio-privado','ru'),{recursive:true});
fs.writeFileSync(path.join(fixture,'audio-privado','ru','12345678.mp3'),'audio de teste');
const env={...process.env,NODE_ENV:'production',PORT:String(port),AUDIO_PRIVADO_DIR:fixture};
for(const key of Object.keys(env)) if (/^(STRIPE_|FIREBASE_|GOOGLE_|REVENUECAT_)/.test(key)) env[key]='';
const child=spawn(process.execPath,['--import','tsx','server.ts'],{env,stdio:'ignore'});
const get=(host,path,headers={})=>new Promise((resolve,reject)=>{http.get({host:'127.0.0.1',port,path,headers:{host,...headers}},r=>{let body='';r.on('data',x=>body+=x);r.on('end',()=>resolve({status:r.statusCode,body,location:r.headers.location}));}).on('error',reject)});
try {
 for(let i=0;i<100;i++){try{await get('linvuu.com','/healthz');break}catch{await new Promise(r=>setTimeout(r,100))}}
 for(const [host,path] of [['linvuu.com','/livros/ru'],['linvuu.com.br','/curso/br'],['linvuu.com','/materiais-gratuitos/alfabeto-russo']]){const r=await get(host,path);assert.equal(r.status,404,host+path);assert.equal(r.location,undefined)}
 const r=await get('linvuu.com','/api/gramatica/it?l=en');assert.equal(r.status,200);const j=JSON.parse(r.body);assert(j.topicos.length>0);assert(j.topicos.every(t=>!t.explicacaoEm||t.explicacaoEm==='en'));
 const g=await get('linvuu.com','/api/gramatica/it');assert.equal(g.status,200);assert(JSON.parse(g.body).topicos.every(t=>!t.explicacaoEm||t.explicacaoEm==='en'));
 assert.equal((await get('linvuu.com','/api/gramatica/it?l=pt')).status,404);
 assert.equal((await get('linvuu.com.br','/api/gramatica/it?l=en')).status,404);
 const missing=await get('linvuu.com','/api/aula/it/9?l=en');assert.equal(missing.status,404);
 const english=await get('linvuu.com','/api/aula/it/1');assert.equal(english.status,200);assert.equal(JSON.parse(english.body).explicacao,'en');
 const portuguese=await get('linvuu.com.br','/api/aula/it/1');assert.equal(portuguese.status,200);assert.match(JSON.parse(portuguese.body).titulo,/Sons/);
 assert.equal((await get('linvuu.com','/api/aula/it/1?l=pt')).status,404);
 assert.equal((await get('linvuu.com.br','/api/aula/it/1?l=en')).status,404);
 assert.equal((await get('linvuu.com.br','/api/gramatica/br')).status,404);
 const app=await get('linvuu.com.br','/api/aula/it/1?l=en',{origin:'https://localhost'});assert.equal(app.status,200);assert.equal(JSON.parse(app.body).explicacao,'en');
 const appBr=await get('linvuu.com.br','/api/aula/br/1',{origin:'https://localhost'});assert.equal(appBr.status,200);
 for(const host of ['linvuu.com','linvuu.com.br']) {
   assert.equal((await get(host,'/audio/de/fcd97331.mp3')).status,200,`${host}: áudio público`);
   assert.equal((await get(host,'/api/audio/ru/12345678.mp3')).status,503,`${host}: áudio pago não é entregue sem autenticação/cobrança`);
   assert.equal((await get(host,'/api/aula/ru/9')).status,503,`${host}: aula paga não é entregue sem autenticação/cobrança`);
 }
 console.log('HTTP: domínio preservado; gramática sem tópicos em português; aula sem inglês indisponível.');
} finally { child.kill(); fs.rmSync(fixture,{recursive:true,force:true}); }
