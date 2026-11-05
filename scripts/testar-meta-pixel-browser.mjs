import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const base='http://127.0.0.1:4391';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4391','--strictPort'],{stdio:'ignore'});
let browser;
try {
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{} await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 for(const lang of ['', '/en', '/es']) {
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(); let loads=0,requests=0,tiktokLoads=0;
  await page.route('https://connect.facebook.net/**',async route=>{loads++;await route.fulfill({status:200,contentType:'text/javascript',body:'/* Meta SDK bloqueado no teste local */'});});
  await page.route('https://www.facebook.com/**',async route=>{requests++;await route.abort();});
  await page.route('https://analytics.tiktok.com/**',async route=>{tiktokLoads++;await route.fulfill({status:200,contentType:'text/javascript',body:'/* TikTok SDK bloqueado no teste local */'});});
  await page.addInitScript(()=>localStorage.setItem('linvuu:marketing:v1','yes'));
  await page.goto(base+lang+'/livros/de?utm_source=facebook&utm_medium=organic_social');
  const box=page.locator('.analytics-consent-ads'); await box.waitFor();
  // Depois da escolha o painel sai da página; reabre pelo botão «Preferências de cookies» do rodapé.
  const abrir=async()=>{ await page.waitForLoadState('networkidle'); if(!await box.isVisible()) await page.locator('.lv-preferencias').first().click(); await box.waitFor(); };
  assert.equal(loads,0,'consentimento antigo apenas Meta não autoriza novos pixels'); assert.equal(tiktokLoads,0); assert.equal(requests,0);
  await box.locator('button').last().click(); await page.reload(); await abrir();
  assert.equal(loads,0,'recusa persiste após recarregar'); assert.equal(tiktokLoads,0);
  await box.locator('summary').click(); await box.locator('button').first().click();
  await page.waitForFunction(()=>window.fbq?.queue?.some(x=>x[0]==='track'&&x[1]==='PageView'));
  await page.waitForFunction(()=>window.ttq?.some(x=>x[0]==='page'));
  assert.equal(loads,1,'consentimento carrega exatamente um SDK');
  assert.equal(tiktokLoads,1,'consentimento carrega exatamente um SDK TikTok');
  assert.equal(await page.evaluate(()=>window.fbq.queue.filter(x=>x[0]==='track'&&x[1]==='PageView').length),1);
  if(!await box.locator('button').last().isVisible()) await box.locator('summary').click();
  await box.locator('button').last().click();
  assert.equal(await page.evaluate(()=>window.fbq.queue.at(-1)?.join(':')),'consent:revoke');
  assert.equal(await page.evaluate(()=>window.ttq.at(-1)?.join(':')),'revokeConsent');
  await page.reload(); await abrir(); assert.equal(loads,1,'revogação impede novo carregamento'); assert.equal(tiktokLoads,1);
  console.log('ok:',lang||'pt-BR','recusa, autorização, uma visualização e revogação'); await context.close();
 }
} finally { await browser?.close(); server.kill(); }
