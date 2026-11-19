// Revisão espaçada no Web, ponta a ponta no navegador real (Playwright), nos dois domínios e em desktop e celular:
// semeia o armazém como visitante, percorre a tela só com o teclado, confere nota/intervalos/persistência e roda o
// detector "cara de IA" (scripts/auditar-visual.mjs) em cada estado da tela. Exige o site servido (npm run build && npm start).
// Uso: LINVUU_HOST_LOCAL=http://127.0.0.1:3099 node --import tsx scripts/testar-revisao-e2e.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { regras } from './auditar-visual.mjs';
import { registroDaPratica } from '../src/lib/revisaoWeb/pratica.ts';

const local = process.env.LINVUU_HOST_LOCAL;
assert.ok(local, 'defina LINVUU_HOST_LOCAL (ex.: http://127.0.0.1:3099)');
/** A assinatura do bloco depende do texto dos exercícios, que muda com a língua da interface: cada domínio semeia o seu. */
const dia = (n, cod) => JSON.parse(readFileSync(new URL(`../content/idiomas/ru/${cod === 'en' ? 'en/' : ''}dia-${String(n).padStart(3, '0')}.json`, import.meta.url), 'utf8'));
const MS = 86_400_000;
const AGORA = Date.now();

/** Bloco de exercícios real do curso, com a primeira questão de múltipla escolha como a errada. */
function semente(n, cod, { espacado }) {
  const d = dia(n, cod);
  const i = d.sessao.blocos.findIndex((b) => b.tipo === 'exercicios');
  const itens = d.sessao.blocos[i].itens;
  const k = itens.findIndex((e) => e.opcoes && e.gabarito !== undefined && e.tipo !== 'sentence-ordering');
  const acertos = Object.fromEntries(itens.map((e, x) => [x, x !== k]).filter(([x]) => !['repeat', 'producao'].includes(itens[x].tipo)));
  const r = registroDaPratica({ idioma: 'ru', aula: 1, sessao: Number(/\d+/.exec(d.sessao.sessao)[0]), bloco: i + 1 }, itens, acertos, new Date(AGORA - (espacado ? 4 : 1) * MS));
  if (espacado) { r.revisao = { ...r.revisao, fim: true, respostas: { [k]: true }, em: new Date(AGORA - 2 * MS).toISOString() }; }
  return { registro: r, errada: itens[k] };
}

const L = {
  'pt-BR': { host: 'linvuu.com.br', locale: 'pt-BR', comecar: /Começar a revisão/, bloco2: /2 blocos para rever/, ok: /Correto/, resumo: /Revisão concluída/, bom: /Bom, volta em/, repetir: /Repetir as que errei/, volta: /Este bloco volta em 1 d\./, proximoB: /Próximo bloco/, verResumo: /Ver resumo/, rotuloBom: /^Bom\s*\d+ d$/ },
  en: { host: 'linvuu.com', locale: 'en-US', comecar: /Start review/, bloco2: /2 blocks to review/, ok: /Correct/, resumo: /Review complete/, bom: /Good, back in/, repetir: /Repeat the ones I missed/, volta: /This block comes back in 1d\./, proximoB: /Next block/, verResumo: /See summary/, rotuloBom: /^Good\s*\d+d$/ },
};
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
let verificados = 0, ocorrencias = 0;
for (const [cod, t] of Object.entries(L)) {
  const A = semente(1, cod, { espacado: true });   // volta espaçada vencida (a mais antiga: abre primeiro)
  const B = semente(2, cod, { espacado: false });  // erro ainda pendente
  for (const [w, h, nome] of [[1440, 900, 'desktop'], [390, 844, 'celular']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, locale: t.locale });
    await ctx.addInitScript(([a, b]) => { try { localStorage.setItem('linvuu:sugestao-idioma-dispensada', '1'); if (!sessionStorage.getItem('semeado')) { sessionStorage.setItem('semeado', '1'); localStorage.setItem('linvuu:revisao-web:v1:visitante:ru', JSON.stringify({ versao: 1, registros: [a, b] })); } } catch {} }, [A.registro, B.registro]);
    await ctx.route('**/*', async (r) => { const u = new URL(r.request().url()); if (!u.hostname.startsWith('linvuu')) return r.abort(); const res = await r.fetch({ url: local + u.pathname + u.search, headers: { ...r.request().headers(), host: u.hostname } }); return r.fulfill({ response: res }); });
    const p = await ctx.newPage();
    p.setDefaultTimeout(20000);
    p.on('pageerror', () => {});
    const erros = []; p.on('pageerror', (e) => erros.push(String(e)));
    const auditar = async (estado) => { const res = await p.evaluate(regras); const n = Object.values(res).reduce((s, v) => s + v.length, 0); ocorrencias += n; assert.equal(n, 0, `[${cod}/${nome}] ${estado}: ${n} ocorrência(s) do detector: ${JSON.stringify(res)}`); };
    const lerRegistros = () => p.evaluate(() => JSON.parse(localStorage.getItem('linvuu:revisao-web:v1:visitante:ru')).registros);
    const url = `https://${t.host}/curso/ru/revisao`;
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.getByText(t.bloco2).waitFor();
    await auditar('início');
    // sem rede para a conta (visitante): nenhuma chamada a /api/progresso/revisao
    await p.getByRole('button', { name: t.comecar }).click();
    // ---- bloco 1: volta espaçada. Acerta de primeira só com o teclado e dá "Bom" (tecla 3) ----
    await p.getByRole('radio').first().waitFor();
    await auditar('pergunta');
    const certa = p.getByRole('radio', { name: A.errada.gabarito, exact: true });
    await certa.focus(); await p.keyboard.press('Space');
    assert.equal(await certa.getAttribute('aria-checked'), 'true', 'Espaço escolhe a opção');
    await p.keyboard.press('Enter'); // Enter na opção confere
    await p.getByText(t.ok).first().waitFor();
    await auditar('resposta conferida');
    assert.equal(await p.evaluate(() => document.activeElement?.textContent), (await p.getByRole('button', { name: /^(Terminar bloco|Finish block)$/ }).textContent()), 'o foco foi para o botão de avançar');
    await p.keyboard.press('Enter'); // Terminar bloco
    await p.getByRole('group', { name: /Como foi lembrar|How did it feel/ }).waitFor();
    const botoes = await p.locator('.revisao-notas-botoes .btn').evaluateAll((els) => els.map((e) => ({ t: e.textContent.replace(/\s+/g, ' ').trim(), off: e.disabled })));
    assert.deepEqual(botoes.map((b) => b.off), [true, false, false, false], 'acertou de primeira: "Errei" travado; Difícil/Bom/Fácil livres');
    assert.ok(botoes.some((b) => t.rotuloBom.test(b.t)), `botão Bom com intervalo real (${JSON.stringify(botoes)})`);
    if (cod === 'pt-BR') assert.ok(botoes.every((b) => /\d+ (min|h|d|meses?)$/.test(b.t)), `unidades pt-BR com espaço (${JSON.stringify(botoes)})`);
    else assert.ok(botoes.every((b) => /\d+(m|h|d|mo)$/.test(b.t)), `unidades en coladas (${JSON.stringify(botoes)})`);
    await auditar('notas');
    await p.keyboard.press('1'); // travado: não registra
    assert.equal((await lerRegistros()).find((r) => r.aula === 1 && r.sessao === 1).espacado, undefined, 'tecla 1 não registra "Errei" quando acertou de primeira');
    await p.keyboard.press('3'); // Bom
    await p.getByText(/Registrado|Saved/).waitFor();
    const regA = (await lerRegistros()).find((r) => r.aula === 1 && r.sessao === 1);
    assert.equal(regA.espacado.versao, 1); assert.equal(regA.espacado.fsrs.reps >= 1, true);
    assert.ok(Date.parse(regA.espacado.proxima) > AGORA + MS, 'Bom agenda para dias à frente');
    assert.equal(regA.espacado.proxima, regA.espacado.fsrs.due, 'campo legado espelha o vencimento do FSRS');
    await auditar('nota registrada');
    // ---- bloco 2: erros pendentes. Erra, vê o gabarito, repete a rodada e acerta ----
    await p.getByRole('button', { name: t.proximoB }).press('Enter');
    await p.getByRole('radio').first().waitFor();
    await p.getByText(/Bloco 2 de 2|Block 2 of 2/).waitFor();
    await p.getByRole('button', { name: /Conferir|Check/ }).waitFor();
    // Seletor que o Playwright repete até a tela assentar: a opção errada é qualquer uma que não seja o gabarito.
    await p.getByRole('radio').filter({ hasNotText: B.errada.gabarito }).first().click();
    await p.getByRole('button', { name: /Conferir|Check/ }).click();
    await p.getByText(/Incorreto|Incorrect/).first().waitFor().catch(async (e) => { console.error('ESTADO:', cod, nome, (await p.locator('main').innerText()).slice(0, 700)); throw e; });
    await auditar('resposta errada');
    await p.keyboard.press('Enter'); // Terminar bloco
    await p.getByRole('button', { name: t.repetir }).waitFor();
    await auditar('rodada com erro');
    await p.getByRole('button', { name: t.repetir }).click();
    await p.getByRole('radio', { name: B.errada.gabarito, exact: true }).click();
    await p.keyboard.press('Enter'); // Enter na opção confere
    await p.getByText(t.ok).first().waitFor();
    await p.keyboard.press('Enter'); // Terminar bloco
    await p.getByText(t.volta).waitFor();
    await auditar('erros corrigidos');
    const regB = (await lerRegistros()).find((r) => r.aula === 1 && r.sessao === 2);
    assert.equal(regB.revisao.fim, true); assert.equal(regB.revisao.rodada, 2); assert.equal(regB.espacado, undefined, 'a primeira volta ainda não tem nota');
    // ---- resumo ----
    await p.getByRole('button', { name: t.verResumo }).click();
    await p.getByRole('heading', { name: t.resumo }).waitFor();
    const resumo = await p.locator('.revisao-resumo').innerText();
    assert.match(resumo, cod === 'en' ? /2 blocks reviewed/ : /2 blocos revisados/);
    assert.match(resumo, cod === 'en' ? /Next review/ : /Próxima revisão/);
    // Uma nota «Bom» (volta em dias) e um bloco só com erros corrigidos: razão 1 de 1 e intervalo médio em dias.
    assert.match(resumo, cod === 'en' ? /Recalled well: 100% \(1 of 1/ : /Lembrança boa: 100% \(1 de 1/);
    assert.match(resumo, cod === 'en' ? /Average time until blocks come back: \d+ days?/ : /Intervalo médio até os blocos voltarem: \d+ dias?/);
    await auditar('resumo');
    assert.deepEqual(erros, [], `erros de página: ${erros.join(' | ')}`);
    // recarregar: nada volta como vencido, o estado persistiu
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.getByText(cod === 'en' ? /Nothing to review right now|Next review/ : /Nada para rever agora|Próxima revisão/).first().waitFor();
    // o cartão da página do curso: sem blocos vencidos e com próxima revisão agendada
    await p.goto(`https://${t.host}/curso/ru`, { waitUntil: 'networkidle' });
    await p.getByRole('region', { name: cod === 'en' ? 'Spaced review' : 'Revisão espaçada' }).waitFor();
    await auditar('cartão no curso');
    await ctx.close(); verificados++;
    console.log(`  ✓ ${cod} ${nome}: fluxo completo só com teclado, nota Bom, erros corrigidos, resumo, persistência e detector em 0`);
  }
}
await browser.close();
console.log(`revisão Web E2E: ${verificados} execuções verdes, ${ocorrencias} ocorrências do detector.`);
