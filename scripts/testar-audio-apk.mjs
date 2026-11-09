import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const base='http://127.0.0.1:4351';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','4351','--strictPort'],{env:{...process.env,VITE_ALVO:'apk'},stdio:'ignore'});
let browser;
try{
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
 const context=await semAbertura(browser,);const page=await context.newPage();
 await page.goto(base);await page.locator('h1').first().waitFor();
 const results=await page.evaluate(async()=>{
  const m=await import('/src/plataforma/apk/audio.ts');m.limparAudioPrivado();
  const checar=(v,msg)=>{if(!v)throw new Error(msg);};
  const tick=()=>new Promise(r=>setTimeout(r,30));
  const pedidos=[];let rede=false,acesso=false,liberar;
  const lento=new Promise(r=>{liberar=r;});
  const original=window.fetch;window.fetch=async(url)=>{
   pedidos.push(String(url));
   if(String(url).includes('/yy/index.json')){await lento;return new Response(JSON.stringify([m.hashTexto('Olá')]));}
   if(String(url).includes('/v2/vv/index.json'))return new Response(JSON.stringify([m.hashTexto('Nova')]),{status:200});
   if(String(url).includes('/v2/'))return new Response('[]',{status:200});
   if(String(url).includes('index.json')){if(!rede)throw new Error('offline');return new Response(JSON.stringify([m.hashTexto('Olá'),m.hashTexto('Deux')]),{status:200});}
   if(String(url).includes('/api/audio/'))return acesso?new Response(new Blob(['audio']),{status:200}):new Response('{}',{status:403});
   return original(url);
  };
  const instancias=[];
  class FakeAudio{
   paused=true;ended=false;src='';crossOrigin='';playbackRate=1;onended=null;onerror=null;
   constructor(){instancias.push(this);}play(){this.paused=false;return Promise.resolve();}pause(){this.paused=true;}load(){}removeAttribute(){this.src='';}
  }
  const OriginalAudio=window.Audio;window.Audio=FakeAudio;
  await m.falar('Olá','zz');checar(m.lerEstadoAudio().fase==='erro','falha deve ser visível');
  checar(!pedidos.some(u=>u.includes('/api/audio/')),'falha no índice não pode ir à API privada');
  await m.falar('Olá','zz');checar(pedidos.filter(u=>!u.includes('/v2/')).length===1,'backoff deve evitar repetição imediata');
  rede=true;window.dispatchEvent(new Event('online'));
  const tocando=m.falar('Olá','zz');await tick();checar(m.lerEstadoAudio().fase==='tocando','deve recuperar após online');
  m.pausar();checar(m.lerEstadoAudio().fase==='pausado','pausa');await m.retomar();checar(m.lerEstadoAudio().fase==='tocando','retomada');
  m.definirVelocidade(.75);checar(instancias.at(-1).playbackRate===.75,'velocidade');
  m.parar();await Promise.race([tocando,new Promise((_,rej)=>setTimeout(()=>rej(new Error('parar deixou promessa pendurada')),500))]);
  const fila=m.falarLista(['Olá','Deux'],'zz');await tick();const primeira=instancias.at(-1);primeira.onended();await tick();checar(m.lerEstadoAudio().trecho===2,'fila deve avançar');m.parar();await fila;
  const repeticao=m.repetirTrecho();await tick();checar(instancias.at(-1).src.endsWith(m.hashTexto('Deux')+'.mp3'),'repetir trecho atual');m.parar();await repeticao;
  await m.falar('Privado','zz');checar(m.lerEstadoAudio().erro==='acesso','403 deve ser explícito');
  acesso=true;const retry=m.tentarNovamente();await tick();checar(m.lerEstadoAudio().fase==='tocando','403 não pode envenenar cache');m.parar();await retry;
  const qtd=pedidos.filter(x=>x.includes('/api/audio/')).length;
  const cache=m.falar('Privado','zz');await tick();checar(pedidos.filter(x=>x.includes('/api/audio/')).length===qtd,'cache em memória');m.parar();await cache;
  const aguardando=m.falar('Olá','yy');await tick();m.parar();await Promise.race([aguardando,new Promise((_,rej)=>setTimeout(()=>rej(new Error('cancelamento durante download pendurado')),500))]);liberar();await tick();checar(m.lerEstadoAudio().fase==='parado','download cancelado não pode tocar depois');
  m.limparAudioPrivado();checar(!m.lerEstadoAudio().repetivel,'troca de conta limpa repetição');
  const estudo=await import('/src/plataforma/apk/estudo.ts');const progresso=await import('/src/lib/progresso.ts');
  progresso.definirUsuarioProgresso(null);estudo.salvarPratica('teste-isolamento',1,2);
  progresso.definirUsuarioProgresso('conta-a');checar(estudo.lerPratica('teste-isolamento')===null,'visitante não migra à conta');estudo.salvarPratica('teste-isolamento',2,2);
  progresso.definirUsuarioProgresso('conta-b');checar(estudo.lerPratica('teste-isolamento')===null,'contas não compartilham prática');
  progresso.definirUsuarioProgresso(null);checar(estudo.lerPratica('teste-isolamento').acertos===1,'visitante mantém resumo próprio');
  const privAntes=pedidos.filter(u=>u.includes('/api/audio/')).length;const nova=m.falar('Nova','vv');await tick();checar(instancias.at(-1).src===`https://linvuu.com.br/audio/v2/vv/${m.hashTexto('Nova')}.mp3`,'voz nova (v2) tem prioridade sobre a antiga');checar(pedidos.filter(u=>u.includes('/api/audio/')).length===privAntes,'voz nova não vai à API privada');m.parar();await nova;
  window.fetch=original;window.Audio=OriginalAudio;
  return {passed:['voz nova (v2) com prioridade','falha visível','backoff','recuperação online','pausa','retomada','velocidade','cancelamento resolve promessa','fila','repetição','403','retry após 403','cache volátil','limpeza de conta','isolamento da prática entre contas','cancelamento durante download'],requests:pedidos.length,limit:'HTMLAudioElement e rede simulados; não comprova som, CORS real, Android ou foco de áudio'};
 });
 assert.equal(results.passed.length,16);fs.writeFileSync('design/apk/audio-rodada2-testes.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{await browser?.close();server.kill();}
