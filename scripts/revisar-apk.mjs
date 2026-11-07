// Prévia do build APK no navegador: não substitui teste nativo em aparelho.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
const base = 'http://127.0.0.1:4331';
const servidor = spawn(process.execPath, ['node_modules/vite/bin/vite.js','preview','--outDir','dist-apk','--host','127.0.0.1','--port','4331','--strictPort'], {stdio:'inherit'});
let browser;
try {
  let pronto = false;
  for (let i=0;i<60;i++) {
    try { if ((await fetch(base)).ok) { pronto=true; break; } } catch {}
    await new Promise(r=>setTimeout(r,500));
  }
  assert.ok(pronto,'prévia APK iniciou');
  browser=await chromium.launch();
  for (const width of [320,390]) for (const locale of ['', '/en']) {
    const context=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
    const page=await context.newPage(), erros=[];
    page.on('pageerror',e=>erros.push(e.message));
    await page.goto(base+locale+'/');
    await page.locator('.app-home h1').waitFor();
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('html').getAttribute('data-plataforma'),'nativo');
    assert.equal(await page.locator('.lv-head').count(),0,'sem cabeçalho marketing web');
    // Desde 19/10/2026 (400e45d3) o idioma do curso não depende do idioma da interface: sem preferência salva vale o idioma original do material,
    // então os 6 cursos aparecem em PT e EN. Se um dia a vitrine voltar a filtrar por tradução, atualizar este número.
    assert.equal(await page.locator('.app-home .app-idiomas button').count(),6,'vitrine mostra os 6 cursos em qualquer idioma da interface');
    const largura=await page.evaluate(()=>({pagina:document.documentElement.scrollWidth,tela:innerWidth}));
    assert.ok(largura.pagina<=largura.tela+1,'sem rolagem horizontal '+JSON.stringify(largura));
    const alvos=await page.locator('.app-header button, .lv-tab').evaluateAll(els=>els.map(el=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height})));
    assert.ok(alvos.every(a=>a.w>=48&&a.h>=48),'toques com no mínimo 48px');
    assert.equal(await page.locator('a[href*="checkout.stripe.com"]').count(),0);
    const shot=await page.screenshot({type:'jpeg',quality:55});
    console.log('LINVUU_APK_SCREEN '+width+'-'+(locale||'pt')+' '+shot.toString('base64'));
    await page.locator('button[aria-controls="app-ajustes"]').click();
    await page.locator('#app-idioma').waitFor();
    assert.equal(await page.locator('#app-idioma option').count(),2);
    await context.setOffline(true);
    await page.locator('.app-rede').waitFor();
    await context.setOffline(false);
    await page.locator('.app-rede').waitFor({state:'detached'});
    await page.goto(base+locale+'/assinatura');
    await page.getByRole('heading',{level:1}).waitFor();
    assert.equal(await page.locator('a[href*="checkout"]').count(),0);
    assert.deepEqual(erros,[],'sem exceções de JavaScript');
    console.log('APK_PREVIA_OK '+width+' '+(locale||'pt'));
    await context.close();
  }
} finally { await browser?.close(); servidor.kill('SIGTERM'); }
