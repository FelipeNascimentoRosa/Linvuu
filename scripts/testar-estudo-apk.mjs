import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const base='http://127.0.0.1:4352';let browser;
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4352','--strictPort'],{stdio:'ignore'});
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});const context=await semAbertura(browser,);const page=await context.newPage();await page.route('https://linvuu.com.br/**',r=>r.abort());
 await page.goto(base+'/curso/en/dia/1');await page.locator('.app-sessao').waitFor();assert.match(await page.locator('.app-estudo-resumo').innerText(),/leitura e escuta/);
 await page.goto(base+'/curso/en/dia/4');await page.locator('.app-sessao').waitFor();await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').last().click();
 assert.equal(await page.locator('.sessao-nav .btn-primary').isDisabled(),true);
 await page.locator('.passo').filter({hasText:'Exercícios'}).first().click();
 let respondidos=0;
 while(!await page.locator('.ex-resumo').count()){
  assert.ok(respondidos<100,'limite de segurança de exercícios');
  if(await page.locator('.ex-op[role=radio]').count())await page.locator('.ex-op[role=radio]').first().click();
  else if(await page.locator('.ex-texto').count())await page.locator('.ex-texto').fill('resposta de teste');
  else if(await page.locator('.ex-op').count()){for(const b of await page.locator('.ex-op').all())if(await b.isEnabled())await b.click();}
  await page.locator('.ex-acoes .btn-primary').click();await page.locator('.ex-acoes .btn-primary').click();respondidos++;
 }
 assert.match(await page.locator('.app-estudo-resumo').innerText(),/Prática corrigida: \d+\/\d+/);
 await page.locator('.passo').last().click();assert.equal(await page.locator('.sessao-nav .btn-primary').isDisabled(),false);
 await page.reload();await page.locator('.app-sessao').waitFor();assert.match(await page.locator('.app-estudo-resumo').innerText(),/Prática corrigida:/);
 const resultado={passed:['leitura sem promessa de teste','pular prática não conclui sessão','respostas corrigidas liberam conclusão','resumo real de acertos','prática persiste ao reabrir'],respondidos,limite:'Visitante em Chromium, rede bloqueada; sem login real ou sincronização nova'};
 fs.writeFileSync('design/apk/estudo-rodada2-testes.json',JSON.stringify(resultado,null,2));console.log(JSON.stringify(resultado));
}finally{await browser?.close();server.kill();}
