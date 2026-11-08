// Tela de assinatura pelo Google Play, isolada com o SDK simulado (Chromium; não é Android, Google Play nem RevenueCat reais).
// Confere o que a política de assinaturas pede antes do botão (preço, frequência, renovação, como cancelar) e cada desfecho da compra.
import {build,preview} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const semAbertura=async(b,o)=>{const c=await b.newContext(o);await c.addInitScript(()=>{try{localStorage.setItem('linvuu:primeira-abertura:v1','1');}catch{}});return c;}; // estes testes começam depois das telas da primeira abertura
const raiz=path.resolve('scripts/harness-play'),saida=path.resolve('node_modules/.cache/harness-play');
const mock={name:'mock-play',enforce:'pre',resolveId(src,imp){if(src==='./comprasPlay'&&imp?.endsWith('AssinaturaPlay.tsx'))return path.join(raiz,'comprasPlay.mock.ts');}};
await build({root:raiz,logLevel:'error',configFile:false,plugins:[mock,react()],define:{'import.meta.env.VITE_ALVO':'"apk"'},build:{outDir:saida,emptyOutDir:true}});
const srv=await preview({root:raiz,configFile:false,logLevel:'error',build:{outDir:saida},preview:{port:4363,strictPort:true,host:'127.0.0.1'}});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
const mensal=(extra={})=>({identifier:'$rc_monthly',product:{title:'Linvuu Mensal (Linvuu)',priceString:'R$ 139,00',subscriptionPeriod:'P1M',defaultOption:{freePhase:null,introPhase:null},...extra}});
async function abrir(cenario,acesso={ativa:false,via:null,cancelaEm:null,ate:null}){
 const ctx=await semAbertura(browser,{viewport:{width:360,height:780}});const p=await ctx.newPage();
 await p.addInitScript(([c,a])=>{const pacote=c.pacotes;window.__acesso=a;window.__recargas=0;window.__play={chamadas:[],ofertas:()=>c.erroOfertas?Promise.reject(new Error('x')):Promise.resolve(pacote),comprar:()=>c.compra==='ok'?Promise.resolve({}):Promise.reject(c.compra),restaurar:()=>Promise.resolve({})};},[cenario,acesso]);
 await p.goto('http://127.0.0.1:4363/');await p.locator('#play-titulo').waitFor();return p;
}
const passou=[];
try{
 // 1. Oferta mensal: preço e frequência da loja, renovação e cancelamento visíveis antes do botão.
 let p=await abrir({pacotes:[mensal()],compra:'ok'});
 const botao=p.getByRole('button',{name:'Assinar por R$ 139,00 por mês'});await botao.waitFor();
 const texto=await p.locator('.app-play').innerText();
 assert.match(texto,/Linvuu Mensal\n/,'título sem o "(Linvuu)" da loja');
 assert.ok(texto.indexOf('Renova automaticamente por mês até você cancelar')<texto.indexOf('Assinar por'),'renovação antes do botão');
 assert.match(texto,/Cancele quando quiser em Google Play › Pagamentos e assinaturas › Assinaturas/);
 assert.doesNotMatch(texto,/site|Stripe|Pix|boleto|linvuu\.com\.br/i,'sem direcionar a pagamento externo');
 assert.deepEqual((await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>v.id),[]);
 passou.push('preço, frequência, renovação e cancelamento antes do botão','sem direcionamento externo','axe sem violações');
 // 2. Compra concluída sem acesso no servidor: tenta 4 vezes e pede para restaurar.
 await botao.click();
 await p.getByText('Compra confirmada pelo Google Play. Liberando o acesso…').waitFor();
 await p.getByText(/A compra foi feita, mas o acesso ainda não apareceu/).waitFor({timeout:20000});
 assert.equal(await p.evaluate(()=>window.__recargas),5,'1 conferência imediata + 4 novas tentativas');
 assert.deepEqual(await p.evaluate(()=>window.__play.chamadas),['ofertas','comprar:$rc_monthly']);
 passou.push('compra sem acesso: 5 conferências e aviso para restaurar');await p.close();
 // 3. Compra concluída e servidor libera durante a espera.
 p=await abrir({pacotes:[mensal()],compra:'ok'});
 await p.getByRole('button',{name:/^Assinar por/}).click();
 await p.evaluate(()=>{window.__acesso={ativa:true,via:'play',cancelaEm:null,ate:Math.floor(Date.now()/1000)+30*86400};});
 await p.getByText('Assinatura ativa. As sessões do curso estão liberadas.').waitFor({timeout:8000});
 assert.match(await p.locator('.app-play').innerText(),/Sua assinatura está ativa pelo Google Play/);
 assert.match(await p.getByRole('link',{name:'Gerenciar no Google Play'}).getAttribute('href'),/^https:\/\/play\.google\.com\/store\/account\/subscriptions\?package=com\.linvuu\.app/);
 passou.push('acesso liberado pelo servidor','link para gerenciar na Play');await p.close();
 // 4. Desfechos de erro com texto certo.
 for(const [compra,esperado,nome] of [[{userCancelled:true},'Compra cancelada. Nada foi cobrado.','cancelada'],[{code:'20'},'Pagamento pendente. O acesso é liberado quando o Google Play confirmar.','pendente'],[{code:'6'},'Esta conta do Google Play já tem a assinatura. Toque em "Restaurar compra".','já assinada'],[{code:'99'},'A compra não foi concluída. Nada foi cobrado. Tente novamente.','falha']]){
  p=await abrir({pacotes:[mensal()],compra});await p.getByRole('button',{name:/^Assinar por/}).click();
  await p.getByRole('status').filter({hasText:esperado}).waitFor();assert.equal(await p.evaluate(()=>window.__recargas),0,`${nome}: sem conferir acesso`);await p.close();
 }
 passou.push('cancelada, pendente, já assinada e falha com mensagens próprias');
 // 5. Teste grátis informado com o preço depois dele.
 p=await abrir({pacotes:[mensal({defaultOption:{freePhase:{billingPeriod:{iso8601:'P7D'},billingCycleCount:1,price:{formatted:'R$ 0,00',amountMicros:0}},introPhase:null}})],compra:'ok'});
 await p.getByText('7 dias grátis; depois, R$ 139,00 por mês.').waitFor();passou.push('teste grátis com preço posterior');await p.close();
 // 6. Produto sem período claro não é vendido; falha da loja oferece nova tentativa.
 p=await abrir({pacotes:[mensal({subscriptionPeriod:null})],compra:'ok'});
 await p.getByText('Nenhum plano disponível no Google Play agora. Tente novamente mais tarde.').waitFor();
 assert.equal(await p.getByRole('button',{name:/^Assinar/}).count(),0);await p.close();
 p=await abrir({erroOfertas:true,compra:'ok'});await p.getByText('Não foi possível falar com o Google Play.').waitFor();
 await p.getByRole('button',{name:'Tentar novamente'}).click();
 assert.equal((await p.evaluate(()=>window.__play.chamadas)).filter(x=>x==='ofertas').length,2);await p.close();
 passou.push('sem período não vende','falha da loja com nova tentativa');
 // 7. Acesso vindo de fora do app: não oferece compra nem leva ao site.
 p=await abrir({pacotes:[mensal()],compra:'ok'},{ativa:true,via:'assinatura',cancelaEm:null,ate:null});
 const t7=await p.locator('.app-play').innerText();assert.match(t7,/assinatura feita fora do app/);assert.equal(await p.getByRole('button',{name:/^Assinar/}).count(),0);assert.equal(await p.locator('.app-play a').count(),0);
 passou.push('assinante de fora do app sem nova compra nem link externo');await p.close();
 console.log(JSON.stringify({passed:passou,limite:'SDK simulado em Chromium; falta compra real com testador de licença na Play'}));
}finally{await browser.close();srv.httpServer.close();}
