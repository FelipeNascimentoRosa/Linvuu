// Reforço espaçado no build APK (Chromium; não é Android nem TalkBack): erro corrigido volta depois do intervalo,
// o cartão abre a rodada nova direto e o resultado reagenda a volta.
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const base='http://127.0.0.1:4362';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4362','--strictPort'],{stdio:'ignore'});
let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 const ctx=await semAbertura(browser,{viewport:{width:360,height:780},reducedMotion:'reduce'});
 await ctx.route('https://linvuu.com.br/**',r=>r.abort());
 const p=await ctx.newPage();
 // 1. Primeira tentativa real com erros.
 await p.goto(base+'/curso/en/dia/4?bloco=1');await p.locator('.app-etapa-titulo').waitFor();
 for(let k=0;k<200&&!(await p.locator('.ex-resumo').count());k++){
  const ops=p.locator('.ex-op:not([disabled])'),campo=p.locator('input.ex-texto, textarea.ex-texto');
  if(await ops.count())await ops.last().click();else if(await campo.count())await campo.first().fill('xyz');
  await p.locator('.ex-acoes .btn-primary').click();await p.locator('.ex-acoes .btn-primary').click();
 }
 // 2. Revisão dos erros concluída com tudo certo há 2 dias (montada a partir da tentativa salva, como o app faz).
 const origem=await p.evaluate(()=>{
  const k=Object.keys(localStorage).find(x=>/^linvuu:pratica-apk:v1:visitante:en:1:S4:bloco:1:tentativa$/.test(x));
  const t=JSON.parse(localStorage.getItem(k));const origem=Object.entries(t.respostas).filter(([,v])=>v===false).map(([n])=>Number(n)).sort((a,b)=>a-b);
  const em=new Date(Date.now()-2*864e5).toISOString();
  localStorage.setItem(k.replace(/:tentativa$/,':revisao-erros'),JSON.stringify({tipo:'revisao-erros',versao:1,assinatura:t.assinatura,origem,fila:origem,indice:origem.length-1,rodada:1,respostas:Object.fromEntries(origem.map(n=>[n,true])),escolha:null,ordem:[],texto:'',resultado:null,fim:true,em}));
  return origem;
 });
 assert.ok(origem.length>0,'o roteiro precisa errar ao menos uma vez');
 // 3. O início mostra a volta espaçada e o link abre a rodada nova.
 await p.goto(base+'/');await p.locator('#conteudo h1').waitFor();
 const card=p.locator('.app-reforco');
 assert.equal(await card.count(),1,'cartão aparece quando a volta venceu');
 assert.match(await card.innerText(),/1, 3 e 7 dias/);
 assert.equal(await card.locator('a').getAttribute('href'),'/curso/en/dia/4?bloco=1&reforco=1');
 assert.deepEqual((await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>v.id),[]);
 await card.locator('a').click();
 await p.locator('#app-revisao-titulo').filter({hasText:'Reforço espaçado'}).waitFor();
 assert.match(await p.locator('.app-revisao .app-kicker').innerText(),/Rodada 1/i,'rodada nova, sem respostas antigas');
 assert.deepEqual((await new AxeBuilder({page:p}).include('.app-revisao').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>v.id),[]);
 // 4. Responder errado de novo: o bloco volta em 1 dia, no mesmo passo.
 for(let k=0;k<100&&!(await p.locator('.app-revisao-resumo').count());k++){
  const ops=p.locator('.app-revisao .ex-op:not([disabled])'),campo=p.locator('.app-revisao input.ex-texto');
  if(await p.locator('.app-revisao .ex-feedback').count()===0){if(await ops.count())await ops.last().click();else if(await campo.count())await campo.fill('xyz');}
  await p.locator('.app-revisao .ex-acoes .btn-primary').click();
 }
 const esp=await p.evaluate(()=>JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>k.endsWith(':en:1:S4:bloco:1:espacado')))));
 assert.equal(esp.passo,0,'errou: mesmo passo');
 const dias=(Date.parse(esp.proxima)-Date.parse(esp.em))/864e5;
 assert.equal(dias,1,'errou: volta em 1 dia');
 await p.goto(base+'/');await p.locator('#conteudo h1').waitFor();
 assert.equal(await p.locator('.app-reforco').count(),0,'sem volta vencida, sem cartão');
 assert.match(await p.locator('.app-reforco-proxima').innerText(),/Próximo reforço espaçado: amanhã\./);
 // 5. A limpeza local também apaga o registro espaçado.
 await p.goto(base+'/conta');await p.locator('#conteudo h1').waitFor();
 await p.getByRole('button',{name:/Apagar progresso deste aparelho/}).click();await p.getByRole('button',{name:/Confirmar/}).click();
 await p.locator('[aria-labelledby=apagar-local-titulo] [role=status]').filter({hasText:/Pronto/}).waitFor();
 assert.equal(await p.evaluate(()=>Object.keys(localStorage).some(k=>k.includes(':espacado'))),false);
 // 6. Sem conexão, o aviso diz o que continua funcionando (as sessões gratuitas vêm no app).
 await ctx.setOffline(true);
 await p.getByText(/As sessões gratuitas \(1 a 8\) continuam funcionando/).waitFor();
 await ctx.setOffline(false);
 console.log(JSON.stringify({passed:['volta vence depois do intervalo','cartão explica 1/3/7 dias','link abre rodada nova','axe sem violações (início e rodada)','errar na volta reagenda em 1 dia','aviso da próxima volta','limpeza local apaga o agendamento','aviso offline exato'],limite:'Chromium em servidor local; não é Android nem TalkBack'}));
}finally{await browser?.close();server.kill();}
