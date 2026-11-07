// Executado em CI contra servidor local, sem credenciais, cadastro ou pagamento.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
const base = 'http://127.0.0.1:4328';
const server = spawn(process.execPath, ['--import','tsx','server.ts'], {env:{...process.env,NODE_ENV:'production',PORT:'4328'},stdio:'inherit'});
let browser;
try {
  let ready = false;
  for (let i=0;i<60;i++) {try {if ((await fetch(base+'/healthz')).ok) {ready=true;break;}} catch {} await new Promise(r=>setTimeout(r,500));}
  assert.ok(ready,'servidor local iniciou');
  await fs.mkdir('revisao-publica',{recursive:true});
  browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE_PATH});
  for (const [nome,viewport] of [['desktop',{width:1440,height:1000}],['celular',{width:390,height:844}],['estreito',{width:320,height:740}]]) {
    const context=await browser.newContext({viewport,reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const rotas = [['/','home'],['/en','home-en'],['/es','home-es'],['/cursos','cursos'],...['en','es','fr','it','de','ru'].map(id=>[`/curso/${id}`,`curso-${id}`]),['/curso/en/dia/1','sessao-en'],['/curso/fr/dia/1','sessao-fr'],['/curso/ru/dia/1','sessao-ru'],['/curso/es/dia/1','sessao-es'],['/curso/it/dia/1','sessao-it'],['/curso/de/dia/1','sessao-de'],['/gramatica/en','gramatica'],['/livros','livros'],['/livros/en','livro-en'],['/livros/en/capitulo/1','capitulo'],['/sobre','sobre'],['/contato','contato'],['/por-que-linvuu','metodo'],['/privacidade','privacidade'],['/termos','termos'],['/entrar','entrar'],['/cadastro','cadastro'],['/assinatura','assinatura']];
    for (const [rota,arquivo] of rotas) {
      await page.goto(base+rota);
      await page.getByRole('heading',{level:1}).waitFor();
      // A jornada é testada com análise e publicidade recusadas quando o aviso aparece.
      for (const tipo of ['analytics','ads']) {
        const recusar=page.locator(`.analytics-consent-${tipo}[open] .analytics-actions button`).last();
        if (await recusar.isVisible()) await recusar.click();
      }
      if (arquivo === 'gramatica') {
        await page.locator('.topico').first().waitFor();
        assert.ok(await page.locator('.topico').count() > 0, 'amostras de gramática carregam para visitante');
      }
      await page.evaluate(()=>document.fonts.ready);
      // Uma screenshot é salva mesmo quando há falha de largura.
      await page.screenshot({path:`revisao-publica/${nome}-${arquivo}.png`,fullPage:true});
      // Captura compacta nos logs: alternativa de leitura quando a cota de artifacts estiver cheia.
      const shot=await page.screenshot({type:'jpeg',quality:55,fullPage:false});
      if (['curso-en','cursos','sessao-en','gramatica','livro-en','entrar'].includes(arquivo)) console.log(`LINVUU_SCREEN ${nome}-${arquivo} ${shot.toString('base64')}`);
      console.log(`ROTA_VALIDADA ${nome} ${rota}`);
      if (arquivo === 'sessao-en') {
        if (nome!=='desktop') await page.getByRole('button',{name:'Mostrar trilha',exact:true}).click();
        const bar=page.getByRole('progressbar').first();
        assert.equal(await bar.getAttribute('aria-valuenow'),'0','progresso inicial real é zero');
        assert.equal(await bar.locator('path.traco-linha').count(),0,'zero não desenha progresso');
        if (nome!=='desktop') await page.getByRole('button',{name:'Recolher trilha',exact:true}).click();
        const guia=page.locator('details.guia-sessao');
        assert.equal(await guia.getAttribute('open'),null,'guia começa recolhido no website');
        await guia.locator('summary').click();
        assert.equal(await guia.locator('ol').isVisible(),true,'instruções continuam acessíveis');
        await guia.locator('summary').click();
        if (nome==='desktop') {
          await page.getByRole('button',{name:'Escuro',exact:true}).click();
          assert.equal(await page.locator('html').getAttribute('data-tema-aluno'),'escuro');
          const colors=await page.locator('button.voltar').evaluate(el=>({fg:getComputedStyle(el).color,expected:getComputedStyle(el.closest('.area-aluno')).getPropertyValue('--sem-texto').trim()}));
          assert.equal(colors.fg,'rgb(245, 241, 232)','Voltar usa texto claro no tema escuro');
          const dark=await page.screenshot({type:'jpeg',quality:65,fullPage:false});
          console.log(`LINVUU_SCREEN desktop-sessao-escuro ${dark.toString('base64')}`);
          await page.getByRole('button',{name:'Claro',exact:true}).click();
          assert.equal(await page.locator('html').getAttribute('data-tema-aluno'),'claro');
        }
      }
      const sizes=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
      if (sizes.document>sizes.viewport+1) console.log('ELEMENTOS_FORA',JSON.stringify(await page.locator('body *').evaluateAll(els=>els.filter(el=>el.getBoundingClientRect().right>innerWidth+1).slice(-15).map(el=>({tag:el.tagName,classe:el.className,right:el.getBoundingClientRect().right})))));
      assert.ok(sizes.document<=sizes.viewport+1,`${nome} ${rota}: sem rolagem horizontal (${JSON.stringify(sizes)})`);
      assert.equal(await page.getByRole('heading',{level:1}).count(),1,`${rota}: um título principal`);
    }
    // Jornada de visitante: aula, posição de leitura, progresso, retorno após login e reporte.
    await page.goto(base+'/curso/en/dia/1');
    await page.locator('.sessao').waitFor();
    await page.getByRole('button',{name:'Continuar',exact:true}).click();
    await page.locator('.bloco h2').filter({hasText:'Diálogo'}).waitFor();
    await page.reload();
    await page.locator('.bloco h2').filter({hasText:'Diálogo'}).waitFor();
    await page.getByRole('button',{name:'Marcar como concluída',exact:true}).click();
    await page.getByRole('button',{name:'✓ Concluída',exact:true}).waitFor();
    await page.reload();
    await page.getByRole('button',{name:'✓ Concluída',exact:true}).waitFor();
    await page.getByRole('button',{name:'Reportar um problema',exact:true}).click();
    await page.getByLabel('O que aconteceu?',{exact:true}).fill('Teste de contexto da sessão, sem envio.');
    const relato = await page.getByRole('link',{name:'Abrir e-mail para enviar relato',exact:true}).getAttribute('href');
    assert.ok(relato.startsWith('mailto:contato@linvuu.com.br?'));
    assert.ok(decodeURIComponent(relato).includes('/curso/en/dia/1'));
    assert.ok(decodeURIComponent(relato).includes('Teste de contexto da sessão, sem envio.'));
    await page.screenshot({path:`revisao-publica/${nome}-reportar.png`,fullPage:false});
    assert.ok(await page.getByRole('link',{name:'Entrar e continuar nesta sessão',exact:true}).getAttribute('href').then(h=>h.includes('proximo=%2Fcurso%2Fen%2Fdia%2F1')));
    const proximo = '?proximo=%2Fcurso%2Fen%2Fdia%2F1';
    assert.equal(await page.locator('.lv-entrar').getAttribute('href'),'/entrar'+proximo);
    if (nome==='desktop') await page.locator('.lv-entrar').click();
    else {
      await page.getByRole('button',{name:'Menu',exact:true}).click();
      await page.locator('.menu-mobile-conta').getByRole('link',{name:'Entrar',exact:true}).click();
    }
    await page.getByRole('heading',{name:'Entre na sua conta',exact:true}).waitFor();
    assert.ok(page.url().endsWith('/entrar'+proximo));
    assert.equal(await page.getByRole('link',{name:'Cadastre-se grátis',exact:true}).getAttribute('href'),'/cadastro'+proximo);
    await page.getByRole('link',{name:'Cadastre-se grátis',exact:true}).click();
    await page.getByRole('heading',{name:'Crie sua conta grátis',exact:true}).waitFor();
    assert.equal(await page.locator('.conta-troca').getByRole('link',{name:'Entrar',exact:true}).getAttribute('href'),'/entrar'+proximo);
    await page.goto(base+'/curso/en');
    await page.getByRole('link',{name:/Continuar na sessão 2:/}).waitFor();
    // A sessão paga exige conta; não iniciar checkout nem criar usuário real no CI.
    await page.goto(base+'/curso/en/dia/9');
    await page.locator('.bloqueio-aula').waitFor();
    assert.equal(await page.locator('.sessao').count(),0,'aula paga não é montada para visitante');
    assert.equal(await page.getByRole('link',{name:'Já tenho conta',exact:true}).getAttribute('href'),'/entrar?proximo=%2Fcurso%2Fen%2Fdia%2F9');
    console.log(`JORNADA_VALIDADA ${nome}: posição, conclusão, retomada, reporte, login/cadastro com retorno e acesso pago fechado`);
    await page.goto(base+'/');
    await page.getByRole('heading',{level:1}).waitFor();
    for (const plano of ['mensal','trimestral-pix','anual']) {
      await page.goto(base+'/');
      await page.locator(`#planos a[href*="plano=${plano}"]`).click();
      assert.equal(new URL(page.url()).searchParams.get('plano'),plano,'a oferta selecionada chega à assinatura');
      await page.locator('.lv-plano-escolhido').waitFor();
      assert.equal(await page.locator('.lv-plano-escolhido').count(),1,'o plano selecionado é destacado');
    }
    await page.goto(base+'/assinatura#oferta-atual');
    await page.getByRole('heading',{name:'Assinatura atual',exact:true}).waitFor();
    await page.waitForFunction(()=>document.getElementById('oferta-atual')?.getBoundingClientRect().top < 300);
    assert.equal(errors.length,0,`${nome}: erros JS: ${errors.join('; ')}`);
    await context.close();
  }
  console.log('Revisão pública: desktop, 390px, 320px, ofertas disponíveis e âncora de assinatura passaram.');
} finally {await browser?.close();server.kill();}
