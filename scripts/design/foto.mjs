// Fotografa uma URL local (ou publicada) em um viewport. Uso:
//   node scripts/design/foto.mjs http://localhost:3000/ C:/temp/antes.png 1440 900 [cheia]
import { chromium } from 'playwright'

const [url, saida, largura = '1440', altura = '900', cheia] = process.argv.slice(2)
if (!url || !saida) {
  console.error('uso: node scripts/design/foto.mjs <url> <arquivo.png> [largura] [altura] [cheia]')
  process.exit(1)
}

const navegador = await chromium.launch()
const ctx = await navegador.newContext({
  viewport: { width: Number(largura), height: Number(altura) },
  deviceScaleFactor: 1,
  bypassCSP: true,
})
const pg = await ctx.newPage()
const r = await pg.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
await pg.evaluate(() => document.fonts.ready)
await pg.waitForTimeout(400)
const barra = await pg.evaluate(() => {
  const el = document.querySelector('.analytics-consent')
  if (!el) return 'sem aviso de cookies'
  const b = el.getBoundingClientRect()
  return `${Math.round(b.width)}x${Math.round(b.height)} topo=${Math.round(b.top)} flutuante=${el.dataset.flutuante ?? '-'}`
})
await pg.screenshot({ path: saida, fullPage: cheia === 'cheia' })
await navegador.close()
console.log(`HTTP ${r?.status()} · aviso de cookies: ${barra} · ${saida}`)
