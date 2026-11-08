import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const base='http://127.0.0.1:4356';let browser;
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4356','--strictPort'],{stdio:'ignore'});
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});const context=await semAbertura(browser,);const page=await context.newPage();await page.route('https://linvuu.com.br/**',r=>r.abort());
 await page.goto(base+'/curso/en/dia/4');await page.locator('.app-sessao').waitFor();await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').filter({hasText:'Exercícios'}).first().click();
 const pergunta=await page.locator('.ex-enunciado').innerText();
 if(await page.locator('.ex-op[role=radio]').count()){
  await page.locator('.ex-op[role=radio]').first().click();await page.reload();await page.locator('.ex-enunciado').waitFor();assert.equal(await page.locator('.ex-op[aria-checked=true]').count(),1);
 }else{await page.locator('.ex-texto').fill('tentativa preservada');await page.reload();await page.locator('.ex-enunciado').waitFor();assert.equal(await page.locator('.ex-texto').inputValue(),'tentativa preservada');}
 assert.equal(await page.locator('.ex-enunciado').innerText(),pergunta);
 await page.locator('.ex-acoes .btn-primary').click();const feedback=await page.locator('.ex-feedback').innerText();await page.reload();await page.locator('.ex-feedback').waitFor();assert.equal(await page.locator('.ex-feedback').innerText(),feedback);
 await page.locator('.ex-acoes .btn-primary').click();const contador=await page.locator('.ex-n').innerText();await page.reload();await page.locator('.ex-n').waitFor();assert.equal(await page.locator('.ex-n').innerText(),contador);assert.equal(await page.locator('.ex-feedback').count(),0);
 // Leaving a block also remounts the exercise component: the same next exercise must return.
 await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').first().click();await page.locator('.passo').filter({hasText:'Exercícios'}).first().click();assert.equal(await page.locator('.ex-n').innerText(),contador);
 console.log('Retomada APK no navegador: rascunho, feedback corrigido, próxima questão e troca de bloco aprovados.');
}finally{await browser?.close();server.kill();}
