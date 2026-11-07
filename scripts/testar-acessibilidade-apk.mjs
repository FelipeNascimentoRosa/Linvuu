import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const base='http://127.0.0.1:4340';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--port','4340','--host','127.0.0.1','--strictPort'],{stdio:'ignore'});
let browser;const results=[];
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const locale of ['', '/en']){
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const page=await context.newPage();
  await page.goto(base+locale+'/');await page.locator('.app-missao').waitFor();
  await page.locator('[aria-controls="app-ajustes"]').click();
  assert.equal(await page.locator('#app-idioma').evaluate(e=>document.activeElement===e),true,'Foco ao abrir ajustes');
  await page.locator('#app-leitura').selectOption('1.5');
  assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).fontSize),'24px');
  await page.locator('.app-ajustes-fechar').click();
  assert.equal(await page.locator('[aria-controls="app-ajustes"]').evaluate(e=>document.activeElement===e),true);
  await page.reload();await page.locator('.app-missao').waitFor();
  assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).fontSize),'24px','Preferência persistida');
  const path=await page.locator('.app-atalho-percurso').getAttribute('href');
  await page.locator('.app-atalho-percurso').click();await page.locator('.app-percurso-topo .btn').click();await page.locator('.app-sessao').waitFor();
  await page.locator('.sessao-nav .btn-primary').click();
  assert.equal(await page.locator('.app-etapa-titulo').evaluate(e=>document.activeElement===e),true,'Título recebe foco após avançar');
  for(const width of [320,390]){
   await page.setViewportSize({width,height:844});
   await page.evaluate(()=>document.documentElement.style.setProperty('--app-text-scale','2'));
   const size=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
   assert.ok(size[0]<=size[1]+1,`Overflow ${locale} ${width}: ${size}`);
   assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).fontSize),'34px','Texto corrido também cresce, não só os títulos');
   const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   results.push({locale:locale||'pt',width,rootFont:'200%',violations:scan.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,help:v.help,targets:v.nodes.map(n=>n.target)})),incomplete:scan.incomplete.map(v=>({id:v.id,count:v.nodes.length}))});
  }
  if(!locale){await page.setViewportSize({width:390,height:844});await page.screenshot({path:'design/apk/acessibilidade-200.png',fullPage:true});}
  console.log('A11Y_INTERACTION_OK',locale||'pt',path);await context.close();
 }
 fs.writeFileSync('design/apk/acessibilidade-resultados.json',JSON.stringify({kind:'Browser preview only; not Android TalkBack certification',results},null,2));
 assert.equal(results.reduce((s,r)=>s+r.violations.filter(v=>v.impact==='critical'||v.impact==='serious').length,0),0,'Sem violações graves/críticas no recorte testado');
}finally{await browser?.close();server.kill();}
