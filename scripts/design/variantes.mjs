// Mostra como o site publicado ficaria com cada variante de UI, sem tocar no código de produção:
// abre a home real, injeta o CSS da variante e fotografa. Uso:
//   node scripts/design/variantes.mjs a-ocre-solar [saida]
import { chromium } from 'playwright'
import { mkdirSync, readFileSync } from 'node:fs'

const alvo = process.argv[2] ?? 'a-ocre-solar'
const saida = process.argv[3] ?? 'C:/Users/felip/AppData/Local/Temp/ui-variantes'
mkdirSync(saida, { recursive: true })
const css = readFileSync(new URL(`./variantes/${alvo}.css`, import.meta.url), 'utf8')

const pagina = process.env.PAGINA ?? 'https://linvuu.com.br/'
const vistas = [
  ['desk', { width: 1440, height: 900 }, false],
  ['cheia', { width: 1440, height: 900 }, true],
  ['mob', { width: 390, height: 844 }, false],
]

const navegador = await chromium.launch()
for (const [nome, viewport, cheia] of vistas) {
  // A CSP de produção bloqueia <style> inline; bypassCSP vale só neste navegador de teste.
  const ctx = await navegador.newContext({ viewport, deviceScaleFactor: 1, bypassCSP: true })
  const pg = await ctx.newPage()
  await pg.goto(pagina, { waitUntil: 'networkidle', timeout: 60000 })
  await pg.addStyleTag({ content: css })
  await pg.evaluate(() => document.fonts.ready)
  await pg.waitForTimeout(350)
  await pg.screenshot({ path: `${saida}/${alvo}-${nome}.png`, fullPage: cheia })
  await ctx.close()
}
await navegador.close()
console.log(`${alvo}: ${vistas.length} PNGs em ${saida}`)
