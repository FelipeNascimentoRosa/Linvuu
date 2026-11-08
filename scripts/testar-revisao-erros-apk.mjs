import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {normalizarResposta} from '../src/lib/correcaoExercicios.ts';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const base='http://127.0.0.1:4363',passed=[];
const aula=JSON.parse(fs.readFileSync('content/idiomas/en/dia-004.json','utf8'));
const itens=aula.sessao.blocos.find(b=>b.tipo==='exercicios').itens;
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4363','--strictPort'],{stdio:'ignore'});let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 const context=await semAbertura(browser,{viewport:{width:320,height:720},reducedMotion:'reduce'}),page=await context.newPage();await page.route('https://linvuu.com.br/**',r=>r.abort());
 await page.goto(base+'/curso/en/dia/4');await page.locator('.app-sessao').waitFor();await page.locator('.app-navegador-etapas summary').click();await page.locator('.passo').filter({hasText:'Exercícios'}).first().click();
 let n=0;
 while(!await page.locator('.ex-resumo').count()){
  assert(n++<100);
  const ex=itens[n-1];
  if(await page.locator('.ex-op[role=radio]').count())await page.locator('.ex-op[role=radio]').nth(ex.opcoes.findIndex(o=>o!==ex.gabarito)).click();
  else if(await page.locator('.ex-texto').count())await page.locator('.ex-texto').fill('deliberadamente incorreta');
  else if(await page.locator('.ex-op').count()){
   let ordem=ex.opcoes.map((_,i)=>i).reverse();if(normalizarResposta(ordem.map(i=>ex.opcoes[i]).join(' '))===normalizarResposta(ex.gabarito))ordem=ordem.reverse();
   for(const i of ordem)await page.locator('.ex-op').nth(i).click();
  }
  await page.locator('.ex-acoes .btn-primary').click();await page.locator('.ex-acoes .btn-primary').click();
 }
 const antes=await page.evaluate(()=>Object.fromEntries(Object.entries(localStorage).filter(([k])=>k.includes('pratica-apk:')&&!k.endsWith(':revisao-erros'))));
 const original=JSON.parse(Object.entries(antes).find(([k])=>k.endsWith(':tentativa'))[1]);
 const erros=Object.keys(original.respostas).filter(k=>original.respostas[k]===false).map(Number);
 assert(erros.length>0);await page.getByRole('button',{name:/Praticar só os erros|Continuar revisão|Ver revisão concluída/}).click();await page.locator('.app-revisao').waitFor();
 const ler=()=>page.evaluate(()=>JSON.parse(Object.entries(localStorage).find(([k])=>k.endsWith(':revisao-erros'))[1]));
 assert.deepEqual((await ler()).origem,erros);passed.push('somente erros corrigíveis entram na revisão real de 42 exercícios');
 for(const tema of ['claro','escuro']){
  await page.evaluate(t=>{document.documentElement.dataset.temaAluno=t;document.documentElement.style.setProperty('--app-text-scale','2');},tema);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();if(a.violations.length)console.log(JSON.stringify({tema,violations:a.violations.map(v=>({id:v.id,nodes:v.nodes}))}));assert.deepEqual(a.violations.map(v=>v.id),[]);
 }
 await page.evaluate(()=>{document.documentElement.dataset.temaAluno='claro';document.documentElement.style.setProperty('--app-text-scale','1');});passed.push('questão ativa em dois temas e 320px/200% sem violações axe');
 const first=itens[erros[0]];
 if(first.opcoes)await page.locator('.app-revisao [role=radio]').first().click();else await page.locator('.app-revisao .ex-texto').fill('rascunho de revisão');
 const rascunho=await ler();await page.reload();await page.locator('.ex-resumo').waitFor();await page.getByRole('button',{name:/Praticar só os erros|Continuar revisão|Ver revisão concluída/}).click();
 assert.equal((await ler()).texto,rascunho.texto);assert.equal((await ler()).escolha,rascunho.escolha);passed.push('rascunho da revisão recuperado após reabrir');
 let deliberado=true,revisados=0,teclado=false;
 const tipos=new Set();
 while(!await page.locator('.app-revisao-resumo').count()){
  assert(revisados++<100);const v=await ler(),ex=itens[v.fila[v.indice]];tipos.add(ex.tipo);
  if(ex.tipo==='sentence-ordering'){
   const target=normalizarResposta(ex.gabarito);const busca=(ordem,restantes)=>{if(!restantes.length)return normalizarResposta(ordem.map(i=>ex.opcoes[i]).join(' '))===target?ordem:null;for(const i of restantes){const found=busca([...ordem,i],restantes.filter(n=>n!==i));if(found)return found;}return null;};
   const ordem=busca([],ex.opcoes.map((_,i)=>i));assert(ordem,'gabarito de ordenação encontrado');
   for(const i of ordem)await page.locator('.app-revisao .ex-op').nth(i).click();
  }else if(ex.opcoes&&ex.gabarito!==undefined){
   if(!teclado){const radios=page.locator('.app-revisao [role=radio]');await radios.first().focus();await page.keyboard.press('End');assert.equal(await radios.last().getAttribute('aria-checked'),'true');await page.keyboard.press('Home');assert.equal(await radios.first().evaluate(e=>e===document.activeElement),true);teclado=true;}
   await page.locator('.app-revisao [role=radio]').nth(ex.opcoes.indexOf(ex.gabarito)).click();
  }
  else await page.locator('.app-revisao .ex-texto').fill(deliberado?'erro para segunda rodada':ex.respostaEsperada);
  if(deliberado&&!ex.opcoes){deliberado=false;}
  await page.locator('.app-revisao .ex-acoes .btn-primary').click();
  if(revisados===1){const f=await page.locator('.app-revisao .ex-feedback').innerText();await page.reload();await page.locator('.ex-resumo').waitFor();await page.getByRole('button',{name:/Praticar só os erros|Continuar revisão|Ver revisão concluída/}).click();assert.equal(await page.locator('.app-revisao .ex-feedback').innerText(),f);}
  await page.locator('.app-revisao .ex-acoes .btn-primary').click();
 }
 passed.push('feedback e posição recuperados; escolha, escrita e ordenação corrigidas');
 for(const tipo of ['multiple-choice','fill-gap','sentence-ordering'])assert(tipos.has(tipo),`tipo revisado: ${tipo}`);
 assert(teclado);passed.push('alternativas operáveis por teclado com Home/End e foco coerente');
 const round=await ler();const faltam=round.origem.filter(i=>round.respostas[i]!==true);assert(faltam.length>0);
 await page.getByRole('button',{name:/Revisar os que faltam/}).click();assert.deepEqual((await ler()).fila,faltam);passed.push('nova rodada contém apenas os erros restantes');
 while(!await page.locator('.app-revisao-resumo').count()){
  const v=await ler(),ex=itens[v.fila[v.indice]];assert(!ex.opcoes);await page.locator('.app-revisao .ex-texto').fill(ex.respostaEsperada);await page.locator('.app-revisao .ex-acoes .btn-primary').click();await page.locator('.app-revisao .ex-acoes .btn-primary').click();
 }
 assert.equal(await page.getByRole('button',{name:/Revisar os que faltam/}).count(),0);
 assert.match(await page.locator('.app-revisao-resumo').innerText(),/Você acertou todas/);passed.push('conclusão sem repetir questões já acertadas');
 await page.locator('.app-revisao-resumo summary').click();await page.evaluate(()=>document.documentElement.style.setProperty('--app-text-scale','2'));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);passed.push('resumo e explicações em 320px/200%, sem violações axe');
 const depois=await page.evaluate(()=>Object.fromEntries(Object.entries(localStorage).filter(([k])=>k.includes('pratica-apk:')&&!k.endsWith(':revisao-erros'))));assert.deepEqual(depois,antes);passed.push('resultado e tentativa originais preservados byte a byte');
 await page.getByRole('button',{name:/Voltar ao resultado inicial/}).click();assert.equal(await page.locator('.ex-resumo h3').evaluate(e=>e===document.activeElement),true);passed.push('foco retorna ao resultado original');
 assert.equal(await page.getByRole('button',{name:/Ver revisão concluída/}).count(),1);passed.push('entrada distingue revisão nova, retomada e concluída');
 fs.writeFileSync('design/apk/lote3-revisao-testes.json',JSON.stringify({passed,originalExercises:n,reviewedTypes:[...tipos],reviewed:revisados,limite:'Chromium e visitante; não certifica Android físico, TalkBack, login real ou sincronização entre aparelhos.'},null,2));console.log(JSON.stringify({passed,revisados,tipos:[...tipos]}));
}finally{await browser?.close();server.kill();}
