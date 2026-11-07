// Prévia web do APK: não substitui testes nativos em aparelho.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
const base='http://127.0.0.1:4332';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4332','--strictPort'],{stdio:'ignore'});
let browser;
try {
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,500));}
 browser=await chromium.launch();
 for(const locale of ['', '/en']) {
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+locale+'/cursos');await page.locator('.app-catalogo').waitFor();
  assert.equal(await page.locator('.app-grade section').count(),locale?1:6);
  const search=page.locator('input[type=search]');await search.fill('zzzzzzzzzz');
  await page.locator('.vazio button').click();assert.equal(await search.inputValue(),'');
  await page.locator('[aria-controls="app-ajustes"]').click();await page.locator('#app-ajustes').waitFor();
  await page.keyboard.press('Escape');assert.equal(await page.locator('#app-ajustes').count(),0);
  assert.equal(await page.locator('[aria-controls="app-ajustes"]').evaluate(e=>document.activeElement===e),true);
  for(const id of locale?['br']:['en','es','fr','it','de','ru']) {
   await page.goto(base+locale+'/curso/'+id);await page.locator('h1').first().waitFor();
   await page.goto(base+locale+'/curso/'+id+'/dia/1');await page.locator('.sessao').waitFor();
   const width=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);assert.ok(width[0]<=width[1]+1,`${locale}/${id} horizontal overflow`);
  }
  if(!locale) {
   await page.goto(base+'/curso/en/dia/1');await page.locator('.sessao').waitFor();
   await page.locator('.passo').nth(1).click();await page.reload();await page.locator('.passo.atual').waitFor();
   assert.equal(await page.locator('.passo.atual').evaluate(e=>Array.from(e.parentElement.parentElement.children).indexOf(e.parentElement)),1);
   await page.goto(base+'/curso/en/dia/9');await page.locator('.acesso-limitado').waitFor();
   const login=page.locator('.acesso-limitado a[href*="entrar"]');assert.match(await login.getAttribute('href'),/proximo=/);
   await login.click();await page.locator('#c-email').waitFor();assert.equal(new URL(page.url()).searchParams.get('proximo'),'/curso/en/dia/9');
   assert.equal(await page.locator('#c-email').isEnabled(),true);
  }
  await page.goto(base+locale+'/assinatura');await page.locator('h1').first().waitFor();
  assert.equal(await page.locator('a[href*="checkout"]').count(),0);
  assert.deepEqual(errors,[]);console.log('APK_FLUXOS_OK '+(locale||'pt'));await ctx.close();
 }
}finally{await browser?.close();server.kill('SIGTERM');}
