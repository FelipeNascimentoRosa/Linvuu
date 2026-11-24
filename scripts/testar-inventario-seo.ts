import assert from 'node:assert/strict';
import fs from 'node:fs';
import { aplicarMeta, carregarDadosMeta, metaDaRota } from '../src/lib/metaRota.ts';
import { destinoSessao } from '../src/lib/destinoSessao.ts';
import { LOCALES_POR_PERFIL, caminhoEm, comPerfil, perfilDoHost, urlAbsolutaEm } from '../src/i18n/locales.ts';
import { SESSOES_GRATIS } from '../src/config/planos.ts';

const d = carregarDadosMeta(process.cwd());
assert.ok(d, 'metadados carregados');
// Italiano tem a primeira aula em inglês, mesmo com o restante ainda em tradução.
comPerfil('global', () => {
  assert.ok(!metaDaRota('/curso/it/dia/1', d).semIndice, 'amostra traduzida em inglês deve ser indexável');
  assert.ok(metaDaRota('/curso/it/dia/9', d).semIndice, 'sessão posterior não entra automaticamente no índice');
  assert.ok(metaDaRota('/gramatica/it', d).semIndice, 'gramática parcialmente traduzida não é liberada por esta alteração');
});
const base = fs.readFileSync('index.html', 'utf8');
const SITEMAP_BR = fs.readFileSync('public/sitemap.xml', 'utf8');
const SITEMAP_GLOBAL = fs.readFileSync('public/sitemap-global.xml', 'utf8');
let sessoes = 0, pagas = 0, gratuitas = 0;
const inventario: { url: string; status: number; noindex: boolean; tipo: string }[] = [];
for (const [perfil, loc] of LOCALES_POR_PERFIL) comPerfil(perfil, () => {
  for (const c of d.cursos) {
    const ind = d.indice[c.id];
    assert.ok(ind, `índice de ${c.id}`);
    const titulos = new Set<string>();
    for (let n = 1; n <= ind.total; n++) {
      const p = caminhoEm(loc.codigo, `/curso/${c.id}/dia/${n}`);
      const m = metaDaRota(p, d);
      const g = ind.grupos?.find(x => n >= x.dias[0] && n <= x.dias[1]);
      assert.ok(g, `sessão ${p} pertence a uma aula`);
      // Regra desde 11/11/2026: a sessão nunca é página de busca — a página de busca do curso é o hub (`/curso/<id>`).
      // A sessão continua servida a quem estuda (é a aula grátis que o hub anuncia), mas não recebe tráfego do Google.
      assert.equal(m.status, 200, p);
      // A sessão 1 é indexável onde a sua própria aula existe na língua do público.
      const noSitemap = (loc.codigo === 'en' ? SITEMAP_GLOBAL : SITEMAP_BR).includes(`${urlAbsolutaEm(loc.codigo, p)}</loc>`);
      if (n === 1) assert.equal(!m.semIndice, noSitemap, `sessão 1 indexável ⇔ no sitemap: ${p}`);
      else assert.ok(m.semIndice, `sessão fora do índice: ${p}`);
      assert.equal(m.caminho, p);
      assert.ok(!titulos.has(m.titulo!), `título único para cada sessão: ${p}`);
      titulos.add(m.titulo!);
      const h = aplicarMeta(base, m, 'https://linvuu.com.br', d);
      assert.ok(h.includes(`rel="canonical" href="${urlAbsolutaEm(loc.codigo, p)}"`), p);
      if (m.semIndice) {
        assert.ok(h.includes('name="robots" content="noindex"'), p);
        assert.ok(!h.includes('<main data-prerender>'), `sessão não pré-renderizada: ${p}`);
        assert.ok(!h.includes('hreflang='), `noindex não anuncia alternativas: ${p}`);
      } else {
        assert.ok(!h.includes('name="robots" content="noindex"'), p);
        assert.equal(h.includes("hreflang="), (m.em?.length ?? 0) > 1, `sessão 1 indexável anuncia alternativas só se existe o par: ${p}`);
      }
      const anonimo = destinoSessao(c.id, n, false);
      assert.equal(anonimo, n > SESSOES_GRATIS ? '/assinatura' : `/curso/${c.id}/dia/${n}`);
      assert.equal(destinoSessao(c.id, n, true), `/curso/${c.id}/dia/${n}`, 'conta conserva navegação; autorização continua no backend');
      assert.equal(destinoSessao(c.id, n, false, true), `/curso/${c.id}/dia/${n}`, 'app conserva navegação');
      inventario.push({ url: p, status: m.status, noindex: !!m.semIndice, tipo: n > SESSOES_GRATIS ? 'paga' : 'amostra' });
      sessoes++;
      if (n > SESSOES_GRATIS) pagas++; else gratuitas++;
    }
    for (const n of [0, ind.total + 1, -1, 1.5]) {
      const p = caminhoEm(loc.codigo, `/curso/${c.id}/dia/${n}`);
      assert.equal(metaDaRota(p, d).status, 404, p);
    }
  }
  for (const p of ['/entrar', '/cadastro', '/livro/gramatica-ru', '/pagina-inexistente-auditoria']) {
    const m = metaDaRota(caminhoEm(loc.codigo, p), d);
    assert.ok(m.semIndice, p);
  }
});

// Dois sitemaps: .com.br (português) e .com (inglês e espanhol). Cada URL é verificada no perfil do seu próprio domínio.
const sitemapBr = fs.readFileSync('public/sitemap-brasil.xml', 'utf8');
const sitemapEn = fs.readFileSync('public/sitemap-internacional.xml', 'utf8');
assert.ok([...sitemapBr.matchAll(/<loc>(.*?)<\/loc>/g)].every((m) => new URL(m[1]).hostname === 'linvuu.com.br'));
assert.ok([...sitemapEn.matchAll(/<loc>(.*?)<\/loc>/g)].every((m) => new URL(m[1]).hostname === 'linvuu.com'));
const sitemap = sitemapBr + sitemapEn;
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length, 'sitemap sem duplicatas');
// 11/11/2026: nenhuma sessão de aula é anunciada — o índice do curso é o hub, não as 3.680 sessões.
// 13/11/2026 (Felipe): exceção única para a sessão 1, a porta de entrada grátis de cada curso completo.
assert.ok(!urls.some(u => /\/dia\/(?!1$)\d+$/.test(u)), `sitemap não lista sessão de aula além da 1: ${urls.find(u => /\/dia\/(?!1$)\d+$/.test(u))}`);
for (const u of urls) {
  const { pathname: p, hostname } = new URL(u);
  comPerfil(perfilDoHost(hostname), () => {
    const m = metaDaRota(p, d);
    assert.equal(m.status, 200, u);
    assert.ok(!m.semIndice, u);
    assert.equal(u, urlAbsolutaEm(m.locale!.codigo, m.caminho), u);
  });
}
// Sentido inverso (regra única de indexação): toda página de curso, gramática ou sessão que o servidor declara
// indexável está no sitemap, e o cluster hreflang do sitemap é exatamente o que o servidor publica no HTML.
const blocos = [...sitemap.matchAll(/<url><loc>(.*?)<\/loc>([\s\S]*?)<\/url>/g)];
const anotSitemap = new Map(blocos.map((b) => [b[1], [...b[2].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((x) => `${x[1]}=${x[2]}`).sort().join(' ')]));
for (const [u, anot] of anotSitemap) {
  const entries = anot ? anot.split(' ') : [];
  for (const entry of entries) {
    const [lang, target] = entry.split('=');
    if (lang === 'x-default') continue;
    assert.ok(anotSitemap.has(target), `alternativa ausente do sitemap: ${u} → ${target}`);
    assert.equal(anotSitemap.get(target), anot, `hreflang nao reciproco: ${u} → ${target}`);
  }
}
let indexaveis = 0;
for (const [perfil, loc] of LOCALES_POR_PERFIL) for (const c of d.cursos) comPerfil(perfil, () => {
  const rotas = [`/curso/${c.id}`, `/gramatica/${c.id}`];
  for (const r of rotas) {
    const p = caminhoEm(loc.codigo, r);
    const m = metaDaRota(p, d);
    const u = urlAbsolutaEm(loc.codigo, p);
    if (m.status !== 200 || m.semIndice) { assert.ok(!anotSitemap.has(u), `noindex fora do sitemap: ${u}`); continue; }
    indexaveis++;
    assert.ok(anotSitemap.has(u), `indexável ausente do sitemap: ${u}`);
    const h = aplicarMeta(base, m, 'https://linvuu.com.br', d);
    const links = [...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((x) => `${x[1]}=${x[2]}`).sort().join(' ');
    assert.equal(anotSitemap.get(u), links, `hreflang HTML/XML: ${u}`);
  }
});
assert.ok(indexaveis > 0);
for (const p of ['/curso/en', '/curso/en/dia/1', '/gramatica/en', '/desconhecida']) {
  const m = metaDaRota(p, null);
  assert.equal(m.status, 503, 'falha dos metadados não vira soft 404/200');
  assert.ok(m.semIndice);
}
const incompleto = { ...d, indice: { ...d.indice, en: { ...d.indice.en, grupos: [] } } };
assert.equal(metaDaRota('/curso/en/dia/1', incompleto).status, 503);
const out = process.argv.indexOf('--json');
if (out >= 0) fs.writeFileSync(process.argv[out + 1], JSON.stringify({ sessoes, pagas, gratuitas, sitemap: urls.length, inventario }, null, 2));
console.log(JSON.stringify({ sessoes, pagas, gratuitas, sitemap: urls.length, resultado: 'conforme' }));
