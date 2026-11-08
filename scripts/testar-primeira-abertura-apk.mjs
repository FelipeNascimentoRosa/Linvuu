// Telas da primeira abertura do app (build dist-apk): fluxo completo em PT e EN, 320px, movimento reduzido e axe sem violações.
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4358',passed=[];
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4358','--strictPort'],{stdio:'ignore'});
let browser;
const axe=async(page,onde)=>{const r=await new AxeBuilder({page}).include('.pa').analyze();assert.deepEqual(r.violations.map(v=>v.id),[],`axe em ${onde}`);};
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 for(const [lingua,nome,curso,meta,inicio] of [['pt','Português','Russo','2 sessões','/'],['en','English','Russian','3 sessions','/en']]){
  const ctx=await browser.newContext({viewport:{width:320,height:640},reducedMotion:'reduce'});const page=await ctx.newPage();
  await page.route('https://linvuu.com.br/**',r=>r.abort());
  await page.goto(base+'/');await page.waitForSelector('.pa');
  assert.equal(await page.locator('.pa-avancar').isDisabled(),true,'sem língua escolhida não avança');
  await axe(page,`${lingua} passo 1`);
  await page.click(`.pa-lingua:has-text("${nome}")`);await page.click('.pa-avancar');
  await axe(page,`${lingua} passo 2`);await page.click('.pa-avancar');
  assert.equal(await page.locator('.pa-avancar').isDisabled(),true,'sem curso escolhido não avança');
  await page.click(`.pa-curso:has-text("${curso}")`);await axe(page,`${lingua} passo 3`);await page.click('.pa-avancar');
  await page.click(`.pa-meta:has-text("${meta}")`);await axe(page,`${lingua} passo 4`);await page.click('.pa-avancar');
  await page.waitForURL(u=>new URL(u).pathname===inicio);await page.waitForSelector('.app-dashboard');
  assert.equal(await page.locator('.pa').count(),0,'não reaparece depois de concluir');
  const guardado=await page.evaluate(()=>[localStorage.getItem('linvuu:curso-preferido'),localStorage.getItem('linvuu:meta-diaria')]);
  assert.deepEqual(guardado,['ru',lingua==='pt'?'2':'3']);
  assert.match(await page.locator('.app-missao').innerText(),/Привет/,'início abre no idioma escolhido para estudar');
  await page.reload();await page.waitForSelector('.app-dashboard');assert.equal(await page.locator('.pa').count(),0,'não reaparece ao reabrir');
  passed.push(`${lingua}: fluxo completo, bloqueio sem escolha, 320px, axe sem violações, início em ${inicio}`);await ctx.close();
 }
 console.log(JSON.stringify({passed,limite:'Chromium em servidor local; não é aparelho Android nem TalkBack'}));
}finally{await browser?.close();server.kill();}
