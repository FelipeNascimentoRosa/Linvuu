import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
let browser;
try{
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 for(const target of (process.env.ANALYTICS_TARGET==='website'?['website']:['website','apk'])){
  const base='http://127.0.0.1:4388',outDir=target==='apk'?'dist-apk':'dist';
  const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir',outDir,'--host','127.0.0.1','--port','4388','--strictPort'],{stdio:'ignore'});
  try{
   for(let n=0;n<60;n++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
   for(const locale of ['', '/en']){
    const ctx=await browser.newContext({viewport:{width:320,height:720}}),page=await ctx.newPage(),events=[];
    await page.route('https://linvuu.com.br/**',r=>r.abort());
    await page.route('https://us.i.posthog.com/**',async r=>{events.push(JSON.parse(r.request().postData()));await r.fulfill({status:200,contentType:'application/json',body:'{"status":1}'});});
    await page.goto(base+locale+'/');await page.locator('.analytics-consent').waitFor();
    await page.waitForTimeout(200);assert.equal(events.length,0,'nenhum envio antes de consentir');
    await page.locator('.analytics-consent-analytics .analytics-actions button').last().click();await page.reload();await page.locator('.analytics-consent').waitFor();assert.equal(events.length,0,'recusa persiste');
    await page.locator('.analytics-consent-analytics summary').click();await page.locator('.analytics-consent-analytics .analytics-actions button').first().click();
    for(let n=0;n<30&&!events.length;n++)await page.waitForTimeout(50);
    assert.equal(events[0]?.event,'page_viewed');assert.equal(events[0]?.properties.platform,target==='apk'?'android':'web');assert.equal(events[0]?.properties.environment,'test');assert.equal(events[0]?.properties.interface_language,locale==='/en'?'en':'pt-BR');
    await page.goto(base+locale+'/cursos?token=do-not-capture');await page.locator('.analytics-consent').waitFor();await page.waitForTimeout(200);
    assert.ok(!JSON.stringify(events).includes('do-not-capture'));
    await page.evaluate(()=>document.documentElement.style.setProperty('--app-text-scale','2'));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await page.locator('.analytics-consent-analytics summary').click();
    const axe=await new AxeBuilder({page}).include('.analytics-consent').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);
    if(target==='apk'&&!locale)await page.locator('.analytics-consent').screenshot({path:'design/apk/analytics-consent-320.png'});
    await page.locator('.analytics-consent-analytics .analytics-actions button').last().click();const previous=events.length;await page.reload();await page.locator('.analytics-consent').waitFor();await page.waitForTimeout(200);assert.equal(events.length,previous,'revogação impede novos eventos');
    assert.equal(await page.evaluate(()=>localStorage.getItem('linvuu:analytics-id:v1')),null);
    console.log('ok',target,locale||'pt','consentimento, recusa, revogação, idioma, payload, acessibilidade');await ctx.close();
   }
  }finally{server.kill();await new Promise(r=>server.once('exit',r));}
 }
}finally{await browser?.close();}
