import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='http://127.0.0.1:4357',passed=[];
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4357','--strictPort'],{stdio:'ignore'});
let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:320,height:720},reducedMotion:'reduce'}),page=await context.newPage();
 await page.route('https://linvuu.com.br/**',r=>r.abort());
 for(const locale of ['', '/en']){
  await page.goto(base+locale+'/');await page.locator('.app-missao').waitFor();
  assert.equal(await page.locator('.app-home-identidade').getAttribute('open'),null);
  await page.locator('.app-home-identidade summary').click();
  assert.equal(await page.locator('.app-home-identidade').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
  await page.evaluate(()=>document.documentElement.style.setProperty('--app-text-scale','2'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  assert.deepEqual(axe.violations.map(v=>v.id),[]);
  if(!locale)await page.screenshot({path:'design/apk/lote2-boasvindas-320-200.png',fullPage:true});
  passed.push(`${locale||'pt'}: boas-vindas opcionais, movimento reduzido, 320px/200%, zero violações axe`);
 }
 await page.goto(base+'/');await page.locator('.app-missao').waitFor();
 await page.evaluate(()=>localStorage.setItem('linvuu:dias-concluidos:v1',JSON.stringify(Array.from({length:8},(_,i)=>`en:${i+1}`))));
 await page.reload();await page.locator('.app-missao').waitFor();
 assert.equal(await page.locator('.app-acao-principal').getAttribute('href'),'/curso/en/dia/1');
 assert.match(await page.locator('.app-acao-principal').innerText(),/Revisar/i);passed.push('fim das oito gratuitas oferece revisão em vez de bloqueio');
 fs.writeFileSync('design/apk/lote2-home-browser.json',JSON.stringify({passed,limite:'Chromium, visitante, rede de produção bloqueada; não certifica TalkBack ou Android físico.'},null,2));
 console.log(JSON.stringify({passed}));
}finally{await browser?.close();server.kill();}
