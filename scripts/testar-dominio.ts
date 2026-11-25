import assert from 'node:assert/strict';
import express from 'express';
import { redirecionamentoDeDominio, registrarDominio } from '../server/dominio.ts';
import { indisponivelNoDominio } from '../src/lib/disponibilidadeDominio.ts';

const casos: [string, string, string, string | null][] = [
 ['www.linvuu.com','/cursos','x=1','https://linvuu.com/cursos?x=1'],
 ['www.linvuu.com.br','/cursos','','https://linvuu.com.br/cursos'],
 ['www.linvuu.com.br','/curso/ru/','','https://linvuu.com.br/curso/ru'],
 ['www.linvuu.com','/cursos//','a=1','https://linvuu.com/cursos?a=1'],
 ['www.linvuu.com','/','','https://linvuu.com/'],
 ['linvuu.com.br','/en/cursos','',null],
 ['linvuu.com.br','/es/assinatura','',null],
 ['linvuu.com','/en/cursos','','https://linvuu.com/cursos'],
 ['linvuu.com','/portugues','','https://linvuu.com/curso/br'],
 ['linvuu.com','/livros/ru','x=1',null], ['linvuu.com','/curso/en/dia/1','',null],
 ['linvuu.com.br','/gramatica/br','',null], ['linvuu.com.br','/curso/br/dia/1','',null],
 ['linvuu.com','/materiais-gratuitos/alfabeto-russo','',null], ['linvuu.com','/curso/it','',null],
];
for (const [host,p,q,esperado] of casos) assert.equal(redirecionamentoDeDominio(host,p,q),esperado,`${host}${p}`);
for (const [perfil,p] of [['global','/livros/ru'],['global','/gramatica/es/falsos-amigos'],['br','/curso/br/dia/1']] as const) assert.ok(indisponivelNoDominio(perfil,p),p);
for (const [perfil,p] of [['global','/livros/br'],['global','/curso/it'],['br','/curso/en'],['br','/livros/ru']] as const) assert.ok(!indisponivelNoDominio(perfil,p),p);
const app=express();
app.use((req,_res,next)=>{req.headers.host=req.get('x-host-teste') || '';next()});
registrarDominio(app);
app.all('/{*resto}',(_req,res)=>{res.send('ok')});
const server=app.listen(0,'127.0.0.1');
await new Promise<void>(r=>server.once('listening',r));
const address=server.address(); assert(address && typeof address !== 'string');
try {
 for(const [host,p,status,alvo] of [['www.linvuu.com','/cursos?x=1',301,'https://linvuu.com/cursos?x=1'],['linvuu.com','/livros/ru',200,''],['linvuu.com.br','/curso/br',200,'']] as const){
  const r=await fetch(`http://127.0.0.1:${address.port}${p}`,{headers:{'x-host-teste':host},redirect:'manual'});
  assert.equal(r.status,status); if(alvo) assert.equal(r.headers.get('location'),alvo); await r.arrayBuffer();
 }
} finally {await new Promise<void>((r,reject)=>server.close(e=>e?reject(e):r()));}
console.log(`Domínios: ${casos.length} regras e middleware HTTP conformes; disponibilidade testada separadamente.`);
