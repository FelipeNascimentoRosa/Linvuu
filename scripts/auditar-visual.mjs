// Auditoria visual "cara de IA" + legibilidade, na página renderizada.
// Regras e limites tirados do detector do Impeccable (pbakaus/impeccable, Apache-2.0,
// crates/foundation/src/registry.rs e crates/core/src/checks/*.rs). Reimplementação própria,
// só das regras que valem para este site; nada do pacote é baixado nem executado.
//
// Uso: node scripts/auditar-visual.mjs <url> [<url> ...]
//   Host local: LINVUU_HOST_LOCAL=http://127.0.0.1:4398 node scripts/auditar-visual.mjs https://linvuu.com.br/
//   (as URLs públicas são servidas pelo servidor local com o Host certo).
// Exceções iguais às do detector: tight-leading não vale para tipo de exibição (≥ 24px);
// rótulos numerados contam só no formato «01», «02» (lista de aulas numeradas é sequência de verdade).
// Saída: uma linha por regra com contagem e exemplos; total de ocorrências por página no fim.
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';

const local = process.env.LINVUU_HOST_LOCAL;
const exe = process.env.CHROME_PATH;
// Importável: `regras` roda dentro da página (page.evaluate) e serve a testes que auditam estados da tela (scripts/testar-revisao-e2e.mjs).
const principal = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;
const urls = principal ? process.argv.slice(2) : [];
if (principal && !urls.length) { console.error('uso: node scripts/auditar-visual.mjs <url>...'); process.exit(1); }

export function regras() {
  const out = {};
  const add = (id, det) => { (out[id] ||= []).push(det); };
  const cs = (el) => getComputedStyle(el);
  const px = (v) => parseFloat(v) || 0;
  const txt = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim();
  const visivel = (el) => { const r = el.getBoundingClientRect(); const s = cs(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && px(s.opacity) > 0.05; };
  const rgb = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };

  // cream-palette: fundo da página quente-claro (min ≥ 209, r ≥ g ≥ b, r−b entre 6 e 48)
  let bg = rgb(cs(document.body).backgroundColor); if (!bg || bg.a === 0) bg = rgb(cs(document.documentElement).backgroundColor);
  if (bg && Math.min(bg.r, bg.g, bg.b) >= 209 && bg.r >= bg.g && bg.g >= bg.b && bg.r - bg.b >= 6 && bg.r - bg.b <= 48) add('cream-palette', `fundo rgb(${bg.r},${bg.g},${bg.b})`);

  const heads = [...document.querySelectorAll('h1,h2,h3')].filter(visivel);
  // kicker-above-heading / hero-eyebrow-chip: rótulo curto, pequeno, em caixa-alta ou espaçado, logo acima do título
  for (const h of heads) {
    let prev = h.previousElementSibling; if (!prev && h.parentElement) prev = h.parentElement.previousElementSibling;
    if (!prev || !visivel(prev)) continue;
    const t = txt(prev), s = cs(prev), fh = px(cs(h).fontSize), fp = px(s.fontSize);
    const caixaAlta = s.textTransform === 'uppercase' || (t.length > 3 && t === t.toUpperCase() && /[A-ZÀ-Ý]/.test(t));
    const espacado = px(s.letterSpacing) / fp > 0.05;
    if (t && t.length <= 60 && fp <= Math.max(16, fh * 0.45) && (caixaAlta || espacado)) add(h.tagName === 'H1' ? 'hero-eyebrow-chip' : 'kicker-above-heading', `«${t}» acima de «${txt(h).slice(0, 40)}»`);
  }
  // italic-serif-display
  for (const h of heads) { const s = cs(h); if (/H1|H2/.test(h.tagName) && px(s.fontSize) >= 32 && s.fontStyle === 'italic' && /serif|Newsreader|Literata|Georgia/i.test(s.fontFamily)) add('italic-serif-display', txt(h).slice(0, 50)); }
  // oversized-h1: ≥72px e ≥40 caracteres ocupando ≥28% da altura da tela
  for (const h of document.querySelectorAll('h1')) { const s = cs(h), r = h.getBoundingClientRect(); if (px(s.fontSize) >= 72 && txt(h).length >= 40 && r.height / innerHeight >= 0.28) add('oversized-h1', txt(h).slice(0, 50)); }
  // skipped-heading
  let ult = 0; for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) { const n = +h.tagName[1]; if (ult && n > ult + 1) add('skipped-heading', `${'h' + ult} → ${h.tagName.toLowerCase()} «${txt(h).slice(0, 40)}»`); ult = n; }
  // numbered-section-labels: «01», «02»… repetidos junto a títulos
  const numeros = [...document.querySelectorAll('span,small,p,b,div')].filter((e) => e.children.length === 0 && /^0\d\.?$/.test(txt(e)) && px(cs(e).fontSize) <= 16 && visivel(e));
  if (numeros.length >= 3) add('numbered-section-labels', `${numeros.length} rótulos numéricos (${numeros.slice(0, 3).map(txt).join(', ')}…)`);

  const corpo = [...document.querySelectorAll('p,li,dd,blockquote')].filter((e) => visivel(e) && txt(e).length > 0);
  for (const p of corpo) {
    const s = cs(p), f = px(s.fontSize), lh = s.lineHeight === 'normal' ? f * 1.2 : px(s.lineHeight), r = p.getBoundingClientRect(), t = txt(p);
    const linhas = Math.round(r.height / lh);
    if (f < 12 && t.length > 20) add('tiny-text', `${f}px «${t.slice(0, 40)}»`);
    if (linhas >= 2 && f < 24 && lh / f < 1.3) add('tight-leading', `${(lh / f).toFixed(2)} «${t.slice(0, 40)}»`);
    const cpl = Math.min(r.width / (f * 0.5), t.length / Math.max(linhas, 1));
    if (linhas >= 2 && cpl > 80 * 1.1) add('line-length', `~${Math.round(cpl)} car./linha «${t.slice(0, 40)}»`);
    if (t.length > 20 && s.textTransform !== 'uppercase' && px(s.letterSpacing) / f > 0.05) add('wide-tracking', `«${t.slice(0, 40)}»`);
    if (t.length >= 80 && t === t.toUpperCase() && /[A-Z]{20}/.test(t.replace(/\s/g, ''))) add('all-caps-body', t.slice(0, 40));
  }
  for (const e of document.querySelectorAll('a,button,label,summary')) { if (!visivel(e) || !txt(e)) continue; const f = px(cs(e).fontSize); if (f < 11) add('undersized-ui-text', `${f}px «${txt(e).slice(0, 30)}»`); }
  // heading-rhythm: espaço acima do título deve ser maior que o espaço abaixo
  let ruins = 0, total = 0;
  for (const h of heads) { const a = h.previousElementSibling, b = h.nextElementSibling; if (!a || !b || !visivel(a) || !visivel(b)) continue; total++; const r = h.getBoundingClientRect(); const acima = r.top - a.getBoundingClientRect().bottom, abaixo = b.getBoundingClientRect().top - r.bottom; if (acima <= abaixo) ruins++; }
  if (total >= 3 && ruins / total > 0.5) add('heading-rhythm', `${ruins} de ${total} títulos mais perto do bloco de cima que do próprio conteúdo`);
  // unbalanced-heading: última linha < 40% da anterior
  for (const h of heads) { const rg = document.createRange(); rg.selectNodeContents(h); const linhas = {}; for (const q of rg.getClientRects()) { const k = Math.round(q.top / 4); linhas[k] = (linhas[k] || 0) + q.width; } const w = Object.values(linhas); if (w.length >= 2 && w[w.length - 1] < 0.4 * w[w.length - 2] && cs(h).textWrap !== 'balance') add('unbalanced-heading', txt(h).slice(0, 50)); }
  // gpt-thin-border-wide-shadow: fileira de ≥3 cartões com borda fina + sombra difusa ≥32px
  const cartoes = [...document.querySelectorAll('article,li,a,div')].filter((e) => { const s = cs(e); return px(s.borderTopWidth) > 0 && px(s.borderTopWidth) <= 1.5 && /(\d+(\.\d+)?)px (\d+(\.\d+)?)px (\d+(\.\d+)?)px/.test(s.boxShadow) && Math.max(...[...s.boxShadow.matchAll(/-?\d+(?:\.\d+)?px -?\d+(?:\.\d+)?px (\d+(?:\.\d+)?)px/g)].map((m) => +m[1])) >= 32 && visivel(e); });
  const porPai = new Map(); for (const c of cartoes) porPai.set(c.parentElement, (porPai.get(c.parentElement) || 0) + 1);
  for (const [, n] of porPai) if (n >= 3) add('gpt-thin-border-wide-shadow', `fileira de ${n} cartões`);
  // nested-cards: caixa com borda/sombra e cantos arredondados dentro de outra
  const caixa = (e) => { const s = cs(e); return px(s.borderTopLeftRadius) >= 8 && (px(s.borderTopWidth) > 0 || s.boxShadow !== 'none') && e.getBoundingClientRect().width > 160; };
  const caixas = [...document.querySelectorAll('div,article,section,li')].filter((e) => visivel(e) && caixa(e));
  let aninhadas = 0; for (const c of caixas) { let p = c.parentElement; while (p && p !== document.body) { if (caixas.includes(p)) { aninhadas++; break; } p = p.parentElement; } }
  if (aninhadas) add('nested-cards', `${aninhadas} caixas dentro de caixas`);
  // em-dash-overuse: ≥8 travessões, cerca de 1 a cada 500 caracteres de texto corrido
  const corrido = corpo.map(txt).join(' '); const travessoes = (corrido.match(/—/g) || []).length;
  if (travessoes >= 8 && travessoes / (corrido.length / 500) >= 0.8) add('em-dash-overuse', `${travessoes} travessões em ${corrido.length} caracteres`);
  // straggler: parágrafo cuja última linha tem uma palavra só
  for (const p of corpo.filter((e) => e.tagName === 'P' && txt(e).length >= 40)) { if (/pretty|balance/.test(cs(p).textWrap)) continue; const rg = document.createRange(); rg.selectNodeContents(p); const qs = [...rg.getClientRects()]; if (qs.length < 2) continue; const topos = [...new Set(qs.map((q) => Math.round(q.top)))]; if (topos.length < 2) continue; const ult = qs.filter((q) => Math.round(q.top) === topos[topos.length - 1]).reduce((a, q) => a + q.width, 0); const f = px(cs(p).fontSize); if (ult < f * 4) add('straggler', txt(p).slice(-40)); }
  return out;
}

const b = principal ? await chromium.launch({ executablePath: exe || undefined, args: ['--no-sandbox'] }) : null;
let soma = 0;
for (const url of urls) {
  for (const [w, h, nome] of [[1440, 900, 'desktop'], [390, 844, 'celular']]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, locale: url.includes('.com.br') ? 'pt-BR' : 'en-US' });
    await c.addInitScript(() => { try { localStorage.setItem('linvuu:sugestao-idioma-dispensada', '1'); } catch {} });
    if (local) await c.route('**/*', async (r) => { const u = new URL(r.request().url()); if (!u.hostname.startsWith('linvuu')) return r.abort(); const res = await r.fetch({ url: local + u.pathname + u.search, headers: { ...r.request().headers(), host: u.hostname } }); return r.fulfill({ response: res }); });
    else await c.route(/posthog|googletagmanager|facebook|tiktok/, (r) => r.abort());
    const p = await c.newPage(); await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(900);
    const res = await p.evaluate(regras);
    const n = Object.values(res).reduce((a, v) => a + v.length, 0); soma += n;
    console.log(`\n${url} [${nome}] — ${n} ocorrência(s)`);
    for (const [id, v] of Object.entries(res).sort()) console.log(`  ${id}: ${v.length}  ${v.slice(0, 2).join(' | ')}`);
    await c.close();
  }
}
if (principal) console.log(`\nTOTAL: ${soma}`);
await b?.close();
