import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import http from 'node:http';
const port=43922;
const child=spawn(process.execPath,['--import','tsx','server.ts'],{env:{...process.env,NODE_ENV:'production',PORT:String(port)},stdio:'ignore'});
const get=(host,path)=>new Promise((resolve,reject)=>{http.get({host:'127.0.0.1',port,path,headers:{host}},r=>{let body='';r.on('data',x=>body+=x);r.on('end',()=>resolve({status:r.statusCode,body,location:r.headers.location}));}).on('error',reject)});
try {
 for(let i=0;i<100;i++){try{await get('linvuu.com','/healthz');break}catch{await new Promise(r=>setTimeout(r,100))}}
 for(const [host,path] of [['linvuu.com','/livros/ru'],['linvuu.com.br','/curso/br'],['linvuu.com','/materiais-gratuitos/alfabeto-russo']]){const r=await get(host,path);assert.equal(r.status,404,host+path);assert.equal(r.location,undefined)}
 const r=await get('linvuu.com','/api/gramatica/it?l=en');assert.equal(r.status,200);const j=JSON.parse(r.body);assert(j.topicos.length>0);assert(j.topicos.every(t=>!t.explicacaoEm||t.explicacaoEm==='en'));
 const missing=await get('linvuu.com','/api/aula/it/9?l=en');assert.equal(missing.status,404);
 console.log('HTTP: domínio preservado; gramática sem tópicos em português; aula sem inglês indisponível.');
} finally { child.kill(); }
