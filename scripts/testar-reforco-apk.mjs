// Reforço entre sessões, fim do gratuito e limpeza local, no build APK (Chromium; não é Android nem TalkBack).
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const base='http://127.0.0.1:4361';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4361','--strictPort'],{stdio:'ignore'});
let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 const ctx=await semAbertura(browser,{viewport:{width:360,height:780},reducedMotion:'reduce'});
 await ctx.route('https://linvuu.com.br/**',r=>r.abort());
 const p=await ctx.newPage();
 await p.goto(base+'/');await p.locator('#conteudo-principal h1').waitFor();
 assert.equal(await p.locator('.app-reforco').count(),0,'sem prática, sem cartão');
 // Prática real: abrir o bloco de exercícios pelo atalho ?bloco e responder sempre a última opção.
 await p.goto(base+'/curso/en/dia/4?bloco=1');await p.locator('.app-etapa-titulo').waitFor();
 assert.match(await p.locator('.app-etapa-titulo').innerText(),/Exerc/);
 let erros=0;
 for(let k=0;k<200&&!(await p.locator('.ex-resumo').count());k++){
  const ops=p.locator('.ex-op:not([disabled])'),campo=p.locator('input.ex-texto, textarea.ex-texto');
  if(await ops.count())await ops.last().click();else if(await campo.count())await campo.first().fill('xyz');
  await p.locator('.ex-acoes .btn-primary').click();
  if(await p.locator('.ex-feedback.erro').count())erros++;
  await p.locator('.ex-acoes .btn-primary').click();
 }
 assert.ok(erros>0,'o roteiro precisa errar ao menos uma vez');
 await p.goto(base+'/');await p.locator('#conteudo-principal h1').waitFor();
 const card=p.locator('.app-reforco');
 assert.equal(await card.count(),1,'cartão de reforço aparece');
 assert.match(await card.locator('h2').innerText(),new RegExp(`^${erros} exercícios? para rever$`));
 assert.equal(await card.locator('a').getAttribute('href'),'/curso/en/dia/4?bloco=1');
 const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 assert.deepEqual(axe.violations.map(v=>v.id),[],'início com reforço sem violações axe');
 // Fim do gratuito: aba de estudo e botão do percurso nunca levam à sessão 9 bloqueada.
 await p.evaluate(()=>localStorage.setItem('linvuu:dias-concluidos:v1',JSON.stringify([1,2,3,4,5,6,7,8].map(d=>'en:'+d))));
 await p.goto(base+'/curso/en');await p.locator('#conteudo-principal h1').waitFor();
 assert.equal(await p.locator('a[href="/curso/en/dia/9"]').count(),0,'nenhum link para sessão bloqueada');
 assert.equal(await p.locator('.lv-tab-estudar').getAttribute('href'),'/curso/en');
 // Limpeza local em dois toques: apaga estudo, mantém preferências.
 await p.evaluate(()=>localStorage.setItem('linvuu:tema-app','escuro'));
 await p.goto(base+'/conta');await p.locator('#conteudo-principal h1').waitFor();
 await p.getByRole('button',{name:/Apagar progresso deste aparelho/}).click();
 await p.getByRole('button',{name:/Confirmar/}).click();
 await p.locator('[aria-labelledby=apagar-local-titulo] [role=status]').filter({hasText:/Pronto/}).waitFor();
 const restantes=await p.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('linvuu:')).sort());
 assert.ok(restantes.includes('linvuu:tema-app'),'preferência mantida');
 assert.ok(!restantes.some(k=>k.startsWith('linvuu:pratica-apk:')||k.startsWith('linvuu:dias-concluidos')),'estudo apagado');
 await p.goto(base+'/');await p.locator('#conteudo-principal h1').waitFor();
 assert.equal(await p.locator('.app-reforco').count(),0,'cartão some depois de apagar');
 console.log(JSON.stringify({passed:['sem prática sem cartão','?bloco abre os exercícios',`reforço conta ${erros} erros reais`,'link volta ao bloco certo','axe sem violações no início','fim do gratuito sem link bloqueado','limpeza local mantém preferências'],limite:'Chromium em servidor local; não é Android nem TalkBack'}));
}finally{await browser?.close();server.kill();}
