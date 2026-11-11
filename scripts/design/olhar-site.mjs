// Captura o site publicado como está hoje — leitura (GET) em produção, sem escrever nada.
// Uso: node scripts/design/olhar-site.mjs [saida]
// Playwright 1.64.1 (Apache-2.0) já instalado com --no-save, igual ao CI (REPOS_FINAL.md §1).
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const saida = process.argv[2] ?? 'C:/Users/felip/AppData/Local/Temp/ui-antes'
mkdirSync(saida, { recursive: true })

const alvos = [
  ['br-home-desk', 'https://linvuu.com.br/', { width: 1440, height: 900 }, false],
  ['br-home-cheia', 'https://linvuu.com.br/', { width: 1440, height: 900 }, true],
  ['br-home-mob', 'https://linvuu.com.br/', { width: 390, height: 844 }, false],
  ['en-home-desk', 'https://linvuu.com/', { width: 1440, height: 900 }, false],
  ['br-planos-desk', 'https://linvuu.com.br/planos', { width: 1440, height: 900 }, false],
  ['en-russo-desk', 'https://linvuu.com/russo-online', { width: 1440, height: 900 }, false],
]

const navegador = await chromium.launch()
const saidaTxt = []

for (const [nome, url, viewport, cheia] of alvos) {
  const ctx = await navegador.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const pg = await ctx.newPage()
  const r = await pg.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await pg.evaluate(() => document.fonts.ready)
  await pg.waitForTimeout(400)
  const info = await pg.evaluate(() => {
    const cs = getComputedStyle
    const b = document.body
    const h1 = document.querySelector('h1')
    const btn = document.querySelector('a[class*="botao"], a[class*="btn"], button[class*="botao"], .site-botao, a[role="button"]')
    const cartao = document.querySelector('[class*="cartao"], [class*="card"]')
    const ler = (el) => (el ? `${cs(el).borderRadius} / ${cs(el).backgroundColor}` : '—')
    return {
      titulo: document.title,
      altura: b.scrollHeight,
      h1: h1 ? h1.textContent.trim().slice(0, 90) : '—',
      fonteH1: h1 ? `${cs(h1).fontFamily.split(',')[0]} ${cs(h1).fontSize}/${cs(h1).fontWeight} ${cs(h1).color}` : '—',
      fundo: cs(b).backgroundColor,
      botao: ler(btn),
      cartao: ler(cartao),
      fontes: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family).filter((v, i, a) => a.indexOf(v) === i).join(', '),
    }
  })
  const arq = `${saida}/${nome}.png`
  await pg.screenshot({ path: arq, fullPage: cheia })
  saidaTxt.push(`${nome}: HTTP ${r.status()} · ${info.altura}px de altura\n  titulo: ${info.titulo}\n  h1: ${info.h1}\n  h1 estilo: ${info.fonteH1}\n  fundo: ${info.fundo} · botao: ${info.botao} · cartao: ${info.cartao}\n  fontes: ${info.fontes}`)
  await ctx.close()
}

await navegador.close()
console.log(saidaTxt.join('\n\n'))
console.log(`\nPNGs em ${saida}`)
