import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {assinaturaExercicios} from '../src/plataforma/apk/estudoModelo.ts';
import {iniciarRevisao} from '../src/plataforma/apk/revisaoModelo.ts';
const base='http://127.0.0.1:4366',passed=[],measurements=[];
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4366','--strictPort'],{stdio:'ignore'});let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 for(const locale of ['', '/en'])for(const motion of ['reduce','no-preference']){
  const context=await browser.newContext({viewport:{width:320,height:720},reducedMotion:motion}),page=await context.newPage();await page.route('https://linvuu.com.br/**',r=>r.abort());
  console.log('CONCLUSAO_CTX',locale||'pt',motion);
  await page.goto(base+locale+`/curso/${locale?'br':'en'}/dia/1`);await page.locator('.app-sessao').waitFor();
  await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').last().click();
  assert.equal(await page.locator('.app-conclusao').count(),0);await page.locator('.sessao-nav .btn-primary').click();await page.locator('.app-conclusao').waitFor();
  assert.equal(await page.locator('.app-conclusao h2').evaluate(e=>e===document.activeElement),true);
  assert.equal(await page.locator('.app-conclusao').getAttribute('data-nova'),'sim');
  const animations=await page.locator('.app-conclusao').evaluate(e=>e.getAnimations({subtree:true}).map(a=>({duration:a.effect.getTiming().duration,iterations:a.effect.getTiming().iterations})));
  if(motion==='reduce')assert.deepEqual(animations,[]);else{assert.equal(animations.length,2);assert(animations.every(a=>a.duration<=500&&a.iterations===1));}
  measurements.push({locale:locale||'pt',motion,animations});
  for(const theme of ['claro','escuro']){
   await page.evaluate(t=>{document.documentElement.dataset.temaAluno=t;document.documentElement.style.setProperty('--app-text-scale','2');},theme);
   await page.evaluate(()=>document.fonts.ready);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   // Garantir que trocar o tema não produz estados transitórios de contraste nos botões da conclusão.
   const transicoes=await page.locator('.app-sessao :is(.sessao-nav .btn,.app-conclusao .btn)').evaluateAll(els=>els.map(e=>getComputedStyle(e).transitionDuration));
   assert.ok(transicoes.length>0 && transicoes.every(d=>d.split(',').every(v=>parseFloat(v)===0)), `botoes da conclusao animando cores: ${transicoes}`);
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();if(axe.violations.length)console.log(JSON.stringify(axe.violations.map(v=>({id:v.id,nodes:v.nodes}))));assert.deepEqual(axe.violations.map(v=>v.id),[]);
  }
  await page.reload();await page.locator('.app-conclusao').waitFor();assert.equal(await page.locator('.app-conclusao').getAttribute('data-nova'),'nao');
  assert.deepEqual(await page.locator('.app-conclusao').evaluate(e=>e.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
  await page.locator('.sessao-nav .btn-primary').click();assert.equal(await page.locator('.app-conclusao').getAttribute('data-nova'),'nao');
  passed.push(`${locale||'pt'} ${motion}: leitura sem nota fictícia, foco, dois temas/200%, movimento limitado, sem replay`);await context.close();
 }
 const context=await browser.newContext({viewport:{width:320,height:720},reducedMotion:'reduce'}),page=await context.newPage();await page.route('https://linvuu.com.br/**',r=>r.abort());
 await page.goto(base+'/curso/en/dia/1');await page.locator('.app-sessao').waitFor();await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').last().click();
 await page.evaluate(()=>{window.__storageSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('linvuu:progresso:v1'))throw Error('quota-test');return window.__storageSet.call(this,k,v);};});
 await page.locator('.sessao-nav .btn-primary').click();assert.equal(await page.locator('.app-conclusao').count(),0);assert.match(await page.locator('.app-sessao [role=alert]').innerText(),/Não foi possível confirmar/);
 await page.evaluate(()=>Storage.prototype.setItem=window.__storageSet);await page.locator('.sessao-nav .btn-primary').click();await page.locator('.app-conclusao').waitFor();passed.push('falha de gravação não celebra nem marca conclusão; retry funciona');
 await page.evaluate(()=>localStorage.clear());await page.reload();await page.locator('.app-sessao').waitFor();await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').last().click();
 await page.evaluate(()=>{window.__storageSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('linvuu:dias-concluidos:v1'))throw Error('day-quota-test');return window.__storageSet.call(this,k,v);};});
 await page.locator('.sessao-nav .btn-primary').click();await page.locator('.app-conclusao').waitFor();assert.equal(await page.locator('.app-conclusao').getAttribute('data-confirmada'),'nao');assert.equal(await page.locator('.app-conclusao .concluida-prox').count(),0);assert.equal(await page.locator('.app-conclusao').getAttribute('data-nova'),'nao');
 await page.evaluate(()=>Storage.prototype.setItem=window.__storageSet);await page.locator('.app-conclusao button').click();assert.equal(await page.locator('.app-conclusao').getAttribute('data-confirmada'),'sim');passed.push('gravação parcial do percurso fica pendente, sem celebração ou próximo passo; retry confirma');
 const aula=JSON.parse(fs.readFileSync('content/idiomas/en/dia-004.json','utf8')),bloco=aula.sessao.blocos.findIndex(b=>b.tipo==='exercicios'),itens=aula.sessao.blocos[bloco].itens;
 const origem=itens.flatMap((e,n)=>!['repeat','producao'].includes(e.tipo)?[n]:[]),assinatura=assinaturaExercicios(itens),em=new Date().toISOString();
 const prefix=`linvuu:pratica-apk:v1:visitante:en:1:S4:bloco:${bloco}`;
 const sessao={'en:1:S4':{bloco:aula.sessao.blocos.length-1,completa:true,em}};
 await page.evaluate(({sessao})=>{localStorage.setItem('linvuu:progresso:v1',JSON.stringify(sessao));localStorage.setItem('linvuu:dias-concluidos:v1','["en:4"]');},{sessao});
 await page.goto(base+'/curso/en/dia/4');await page.locator('.app-conclusao').waitFor();assert.match(await page.locator('.app-conclusao h2').innerText(),/Conclusão anterior preservada/);passed.push('histórico sem resultado compatível não inventa acertos');
 const tentativa={tipo:'tentativa',versao:1,assinatura,indice:itens.length-1,escolha:null,ordem:[],texto:'',resultado:null,respostas:Object.fromEntries(origem.map(n=>[n,false])),finalizada:true,em};
 const rev={...iniciarRevisao(itens,origem),indice:origem.length-1,respostas:Object.fromEntries(origem.map(n=>[n,true])),fim:true};
 await page.evaluate(({prefix,assinatura,origem,em,tentativa,rev})=>{
  localStorage.setItem(prefix,JSON.stringify({versao:2,assinatura,acertos:0,total:origem.length,em}));
  localStorage.setItem(prefix+':tentativa',JSON.stringify(tentativa));localStorage.setItem(prefix+':revisao-erros',JSON.stringify(rev));
 },{prefix,assinatura,origem,em,tentativa,rev});
 await page.reload();await page.locator('.app-conclusao').waitFor();const texto=await page.locator('.app-conclusao').innerText();assert.match(texto,new RegExp(`0/${origem.length} acertos`));assert.match(texto,/Erros revisados com acerto/);passed.push('prática corrigida e revisão finalizada são estados distintos ao reabrir');
 await page.evaluate(({prefix,rev})=>{localStorage.setItem(prefix+':revisao-erros',JSON.stringify({...rev,fim:false}));window.dispatchEvent(new Event('linvuu:revisao-apk'));},{prefix,rev});
 await page.getByText('Há erros para revisar',{exact:true}).waitFor();
 await page.evaluate(({prefix,rev})=>{localStorage.setItem(prefix+':revisao-erros',JSON.stringify(rev));window.dispatchEvent(new Event('linvuu:revisao-apk'));},{prefix,rev});
 await page.getByText('Erros revisados com acerto',{exact:true}).waitFor();passed.push('estado de revisão acompanha confirmação em tempo real, sem novo carregamento');
 fs.writeFileSync('design/apk/lote32-conclusao-testes.json',JSON.stringify({passed,measurements,limit:'Chromium, visitante, armazenamento simulado; sem métricas de usuários reais, certificação Android físico/TalkBack ou sincronização entre aparelhos.'},null,2));console.log(JSON.stringify({passed,measurements}));
}finally{await browser?.close();server.kill();}
