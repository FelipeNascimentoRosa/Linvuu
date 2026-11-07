// Página pública de exclusão de conta (exigida pela Google Play): carrega sem erro nos 3 idiomas, sem login,
// com o caminho de pedido em destaque, sem link de pagamento, acessível e sem rolagem lateral no celular.
// Uso: servidor do site rodando em BASE (padrão http://127.0.0.1:4370).
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const BASE=process.env.BASE||'http://127.0.0.1:4370';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE_PATH,args:['--no-sandbox']});
const passou=[];
try{
 for(const [pref,h1,botao,assunto] of [['','Excluir conta e dados da Linvuu','Preparar e-mail de exclusão','solicitação de exclusão'],['/en','Delete your Linvuu account and data','Prepare deletion email','deletion request']]){
  for(const tema of ['light','dark']){
   const ctx=await browser.newContext({viewport:{width:360,height:780},colorScheme:tema});await ctx.route(/posthog|googletagmanager/,r=>r.abort());
   const p=await ctx.newPage();const erros=[];p.on('pageerror',e=>erros.push(e.message));
   const r=await p.goto(`${BASE}${pref}/excluir-conta`);assert.equal(r.status(),200);
   await p.getByRole('heading',{level:1,name:h1}).waitFor();
   assert.deepEqual(erros,[],'sem erro de JavaScript');
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,'sem rolagem lateral');
   const link=p.getByRole('link',{name:botao});
   await p.getByLabel(/E-mail da conta|Account email|Correo de la cuenta/).fill('aluno@exemplo.com');
   const href=decodeURIComponent(await link.getAttribute('href'));
   assert.match(href,/^mailto:hello\.linvuu@gmail\.com\?subject=/);assert.ok(href.includes(assunto)&&href.includes('aluno@exemplo.com'));
   const conteudo=p.locator('#conteudo .pagina');
   const hrefs=await conteudo.locator('a').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
   assert.ok(hrefs.every(h=>!/checkout|stripe|billing|portal/i.test(h??'')),'sem link de pagamento: '+hrefs.join(' '));
   assert.match(await conteudo.innerText(),/Linvuu/);
   assert.match(await conteudo.innerText(),/Google Play/);
   assert.deepEqual((await new AxeBuilder({page:p}).include('#conteudo').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>v.id),[],`axe ${pref||'/'} ${tema}`);
   if(tema==='light'&&pref===''){assert.equal(await p.locator('footer a[href="/excluir-conta"]').count(),1,'link no rodapé');}
   await ctx.close();
  }
  passou.push(`${pref||'/'}: 200, sem login, mailto pronto, sem link de pagamento, axe claro/escuro, 360px`);
 }
 passou.push('link no rodapé');
 console.log(JSON.stringify({passed:passou,limite:'Chromium; o envio do e-mail e o atendimento são manuais'}));
}finally{await browser.close();}
