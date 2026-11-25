import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import http from 'node:http';
const port=43923;
const env={...process.env,NODE_ENV:'production',PORT:String(port)};
for (const k of Object.keys(env)) if (/^(STRIPE_|FIREBASE_|GOOGLE_|REVENUECAT_)/.test(k)) env[k]='';
const child=spawn(process.execPath,['--import','tsx','server.ts'],{env,stdio:'ignore'});
let browser;
try {
 for(let i=0;i<150;i++){try{await fetch(`http://127.0.0.1:${port}/healthz`);break}catch{await new Promise(r=>setTimeout(r,100))}}
 browser=await chromium.launch({headless:true,args:['--no-proxy-server']});
 const context=await browser.newContext();
 await context.route('**/*',async route=>{
  const u=new URL(route.request().url()); if(!/^linvuu\.com(\.br)?$/.test(u.hostname)) return route.abort();
  const result=await new Promise((resolve,reject)=>{const req=http.request({host:'127.0.0.1',port,path:u.pathname+u.search,method:route.request().method(),headers:{host:u.hostname,'x-forwarded-proto':'https'}},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks)}))});req.on('error',reject);req.end(route.request().postDataBuffer());});
  const headers=Object.fromEntries(Object.entries(result.headers).filter(([k])=>!/^(content-encoding|content-length|transfer-encoding|connection)$/i.test(k)).map(([k,v])=>[k,String(v)]));
  await route.fulfill({status:result.status,headers,body:result.body});
 });
 for(const host of ['linvuu.com.br','linvuu.com']) {
   const page=await context.newPage(); const r=await page.goto(`https://${host}/sobre`,{waitUntil:'domcontentloaded'});assert.equal(r.status(),200);
   await page.locator('main a[href="/livros"]').last().waitFor({state:'visible',timeout:20000});
   await page.locator('main a[href="/livros"]').last().click();await page.waitForURL(`https://${host}/livros`);assert.equal(new URL(page.url()).hostname,host);
   const missing=await page.goto(`https://${host}${host.endsWith('.br')?'/curso/br':'/livros/ru'}`,{waitUntil:'domcontentloaded'});assert.equal(missing.status(),404);assert.equal(new URL(page.url()).hostname,host);
   if(host==='linvuu.com') {
     await page.goto(`https://${host}/curso/it/dia/9`,{waitUntil:'domcontentloaded'});
     await page.getByText('This lesson is not yet available for English speakers.').waitFor({state:'visible',timeout:20000});
   }
   await page.close();
 }
 console.log('Chromium: navegação aos livros preserva o domínio; URLs indisponíveis não atravessam domínios.');
} finally { if(browser) await browser.close(); child.kill(); }
