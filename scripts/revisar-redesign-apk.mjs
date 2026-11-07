import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='http://127.0.0.1:4344',rows=[];
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4344','--strictPort'],{stdio:'ignore'});
let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({args:['--no-sandbox'], executablePath:process.env.CHROME_EXECUTABLE_PATH});
 for(const locale of ['', '/en'])for(const width of [320,360,390,393,412]){
  const context=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const course=locale?'br':'en';
  for(const [name,path,ready]of [['inicio','/','.app-missao'],['catalogo','/cursos','.app-grade'],['percurso',`/curso/${course}`,'.app-unidade'],['aula',`/curso/${course}/dia/1`,'.app-sessao'],['conta','/assinatura','.app-conta-mobile'],['acesso',`/curso/${course}/dia/9`,'.acesso-limitado']]){
   await page.goto(base+locale+path);await page.locator(ready).first().waitFor();await page.evaluate(()=>document.fonts.ready);
   const original=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);assert.ok(original[0]<=original[1]+1,`Overflow normal ${locale} ${name} ${width}: ${original}`);
   if(!locale&&width===390)await page.screenshot({path:`design/apk/v3-${name}.png`,fullPage:false});
   if(name==='aula'){
    await page.locator('.sessao-nav .btn-primary').click();assert.equal(await page.locator('.app-etapa-titulo').evaluate(e=>e===document.activeElement),true);
    await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').first().click();
   }

   await page.evaluate(()=>document.documentElement.style.setProperty('--app-text-scale','2'));
   const enlarged=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);if(enlarged[0]>enlarged[1]+1) console.log(await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).map(e=>({tag:e.tagName,cls:e.className,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width,text:e.textContent?.slice(0,60)})).filter(e=>e.right>innerWidth+1).slice(0,15)));assert.ok(enlarged[0]<=enlarged[1]+1,`Overflow 200% ${locale} ${name} ${width}: ${enlarged}`);
   if(name==='percurso'){assert.ok(await page.locator('.app-unidade-num').first().isVisible());assert.ok(await page.locator('.app-sessao-num').first().isVisible());}
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   rows.push({locale:locale||'pt',width,page:name,scale:'200%',violations:axe.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>n.target)})),incomplete:axe.incomplete.map(v=>({id:v.id,count:v.nodes.length}))});
   await page.evaluate(()=>document.documentElement.style.setProperty('--app-text-scale','1'));
  }
  await page.locator('[aria-controls=app-ajustes]').click();await page.locator('#app-tema').selectOption('escuro');await page.locator('.app-ajustes-fechar').click();
  await page.goto(base+locale+'/');await page.locator('.app-missao').waitFor();
  if(!locale&&width===390)await page.screenshot({path:'design/apk/v3-escuro.png',fullPage:false});
  const dark=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  rows.push({locale:locale||'pt',width,page:'inicio-escuro',scale:'100%',violations:dark.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:dark.incomplete.map(v=>({id:v.id,count:v.nodes.length}))});
  assert.deepEqual(errors,[]);console.log('REDESIGN_OK',locale||'pt',width);await context.close();
 }
 fs.writeFileSync('design/apk/v3-testes.json',JSON.stringify({limitation:'Browser preview, not native TalkBack or physical Android certification',rows},null,2));
 const serious=rows.flatMap(r=>r.violations.filter(v=>['critical','serious'].includes(v.impact)).map(v=>({locale:r.locale,page:r.page,...v})));
 console.log('AXE',JSON.stringify(serious));assert.equal(serious.length,0);
}finally{await browser?.close();server.kill();}
