import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const base='http://127.0.0.1:4347', rows=[];
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4347','--strictPort'],{stdio:'ignore'});
let browser;
try {
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 const context=await semAbertura(browser,{viewport:{width:320,height:640},reducedMotion:'reduce'});const page=await context.newPage();
 await page.route('https://linvuu.com.br/**',r=>r.abort());
 for(const tema of ['claro','escuro'])for(const path of ['/','/cursos','/curso/en','/curso/en/dia/1','/curso/en/dia/4','/curso/en/dia/9','/entrar','/assinatura','/conta','/gramatica/en']){
  if(page.url()!=='about:blank')await page.evaluate(()=>localStorage.clear());
  await page.goto(base+path);await page.locator('#conteudo h1').waitFor();
  await page.evaluate(t=>{localStorage.setItem('linvuu:tema-app',t);document.documentElement.dataset.temaAluno=t},tema);
  await page.waitForTimeout(150);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  const issues=axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));
  const normalBar=await page.locator('.lv-tabbar').count()?await page.locator('.lv-tabbar').evaluate(e=>e.getBoundingClientRect().height):0;
  assert.ok(normalBar<=96,`barra normal excessiva: ${normalBar}`);
  await page.evaluate(()=>document.documentElement.style.setProperty('--app-text-scale','2'));
  const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,bar:document.querySelector('.lv-tabbar')?.getBoundingClientRect().height??0}));
  if(layout.overflow)console.log(await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(e=>e.getBoundingClientRect().right>innerWidth+1 || e.scrollWidth>e.clientWidth+1).map(e=>({cls:e.className,text:e.textContent?.slice(0,50),right:e.getBoundingClientRect().right,sw:e.scrollWidth,cw:e.clientWidth})).slice(0,12)));
  assert.equal(layout.overflow,false,`${tema} ${path} overflow`);assert.ok(layout.bar<=160,`${tema} ${path} nav ${layout.bar}`);
  if(path==='/cursos'){assert.ok(await page.locator('input[type=search]').getAttribute('placeholder'));assert.equal(await page.locator('.app-header>button[aria-label]').count(),0);}
  if(path==='/'){assert.ok(await page.locator('#app-idiomas-ajuda').isVisible());assert.equal(await page.locator('h1').evaluate(e=>getComputedStyle(e).outlineStyle),'none');}
  if(path==='/curso/en/dia/1'){assert.ok(await page.locator('.app-audio-controles details').getAttribute('open')!==null);assert.match(await page.locator('.app-audio-controles [role=status]').innerText(),/internet/);}
  if(path==='/conta'){assert.equal(new URL(page.url()).pathname,'/conta');assert.equal(await page.locator('.app-header>button[aria-label]').count(),0);}
  if(await page.locator('.lv-tabbar').count()){
   const labels=await page.locator('.lv-tab').evaluateAll(els=>els.map(el=>{const l=el.lastElementChild,r=l.getBoundingClientRect(),a=el.getBoundingClientRect();return {visible:getComputedStyle(l).display!=='none',contained:r.left>=a.left-1&&r.right<=a.right+1&&r.bottom<=a.bottom+1};}));
   assert.equal(labels.length,5);assert.ok(labels.every(l=>l.visible&&l.contained),'cada rótulo deve ficar na própria aba');
  }
  if(path==='/assinatura'){assert.equal(await page.locator('#excluir-conta').count(),1);assert.match(await page.locator('#excluir-conta a.btn').getAttribute('href'),/^mailto:contato@linvuu\.com(\.br)?\?/);} // endereço de contato por perfil (src/config/site.ts: emailOficial)
  if(path==='/curso/en'){
   assert.equal(await page.locator('a[href="/curso/en/dia/9"]').count(),0);
   for(const width of [320,360,393,412]){
    await page.setViewportSize({width,height:640});
    assert.ok(await page.locator('.app-unidade-num').first().isVisible(),`unidade visível ${width}`);
    assert.ok(await page.locator('.app-sessao-num').first().isVisible(),`sessão visível ${width}`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`percurso ${width} sem overflow`);
   }
   await page.setViewportSize({width:320,height:640});
  }
  if(path==='/curso/en/dia/9')assert.ok(await page.locator('.acesso-limitado a[href="/curso/en"]').isVisible(),'bloqueio oferece revisão');
  if(path==='/curso/en/dia/4'){
   await page.locator('.app-sessao').waitFor();
   await page.locator('.app-navegador-etapas summary').click();
   await page.locator('.passo').filter({hasText:'Exercícios'}).first().click();
   const audio=page.locator('.ex-audio button');await audio.waitFor();
   assert.equal(await audio.getAttribute('aria-label'),'Ouvir');
   if(await page.locator('.ex-texto').count()){
    await page.locator('.ex-texto').fill('resposta deliberadamente incorreta');
    await page.locator('.ex-acoes .btn-primary').click();
    const resposta=await page.locator('.ex-feedback.erro strong').innerText();
    assert.equal((await page.locator('.app-sessao .sr-only[role=status]').count())>0,true);
    assert.ok((await page.locator('.app-sessao .sr-only[role=status]').innerText()).includes(resposta),'região viva inclui resposta correta');
   }
  }
  if(tema==='escuro' && path==='/curso/en/dia/1')await page.screenshot({path:'design/apk/rodada1-aula-escura.png'});
  rows.push({tema,path,layout,violations:issues,incomplete:axe.incomplete.map(v=>({id:v.id,nodes:v.nodes.length}))});console.log(tema,path,JSON.stringify(issues));
 }
 fs.writeFileSync('design/apk/parecer-rodada1-testes.json',JSON.stringify({limite:'Chromium; sem Android/TalkBack/login real',rows},null,2));
 assert.equal(rows.flatMap(r=>r.violations).length,0);
}finally{await browser?.close();server.kill();}
