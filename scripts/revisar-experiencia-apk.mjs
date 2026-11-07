// Testes de interface em navegador; TalkBack e escala do Android exigem aparelho.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
const base='http://127.0.0.1:4336';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--port','4336','--host','127.0.0.1','--strictPort'],{stdio:'ignore'});
let browser;
const largura=async page=>{const v=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);if(v[0]>v[1]+1)console.log(await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).map(e=>({tag:e.tagName,cls:e.className,x:e.getBoundingClientRect().x,right:e.getBoundingClientRect().right,text:e.textContent?.slice(0,40)})).filter(e=>e.right>innerWidth+1).slice(0,18)));assert.ok(v[0]<=v[1]+1,'Sem overflow: '+v);};
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,300));}
 browser=await chromium.launch();
 for(const width of [320,390])for(const locale of ['', '/en']){
  const ctx=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+locale+'/');await page.locator('.app-missao').waitFor();await largura(page);
  assert.equal(await page.locator('.app-idiomas [aria-pressed=true]').count(),1);
  await page.locator('[aria-controls=app-ajustes]').click();await page.locator('#app-tema').selectOption('escuro');assert.equal(await page.locator('html').getAttribute('data-tema-aluno'),'escuro');await page.keyboard.press('Escape');
  const contraste=await page.locator('.lv-tab.on').evaluate(e=>{const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);const lum=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);const a=lum(rgb(getComputedStyle(e).color)),b=lum(rgb(getComputedStyle(e.closest('nav')).backgroundColor));return(Math.max(a,b)+.05)/(Math.min(a,b)+.05);});assert.ok(contraste>=4.5,'Contraste da aba ativa no tema escuro');

  const path=await page.locator('.app-atalho-percurso').getAttribute('href');await page.locator('.app-atalho-percurso').click();await page.locator('.app-unidade').first().waitFor();await largura(page);
  assert.equal(await page.locator('.app-unidade[open]').count(),1);
  const quantidade=await page.locator('.app-unidade').count();
  if(await page.locator('.app-ver-mais').count()){await page.locator('.app-ver-mais').click();assert.ok(await page.locator('.app-unidade').count()>quantidade);}
  await page.locator('.app-percurso-topo .btn').click();await page.locator('.app-sessao').waitFor();await largura(page);
  const progress=page.locator('.app-etapa-progresso progress');assert.equal(await progress.getAttribute('value'),'0');
  await page.locator('.sessao-nav .btn-primary').click();assert.equal(await progress.getAttribute('value'),'1');await page.reload();await page.locator('.app-sessao').waitFor();assert.equal(await progress.getAttribute('value'),'1');
  assert.equal(await page.locator('html').getAttribute('data-tema-aluno'),'escuro','Tema preservado');
  await page.evaluate(()=>{const sizes=Array.from(document.querySelectorAll('body *')).map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,n]of sizes)if(e instanceof HTMLElement)e.style.fontSize=(n*2)+'px';});await largura(page);
  assert.deepEqual(errors,[]);console.log('EXPERIENCIA_APK_OK',width,locale||'pt',path);await ctx.close();
 }
}finally{await browser?.close();server.kill();}
