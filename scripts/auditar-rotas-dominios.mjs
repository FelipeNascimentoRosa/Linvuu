// Auditoria determinística de rotas e domínios (npm run audit:rotas-dominios).
// Sobe o servidor de produção local (dist/ já construído) e lê os dois domínios pelo cabeçalho Host, sem rede externa:
//   1. sitemaps: 100% das URLs de linvuu.com.br e linvuu.com respondem 200, no domínio certo, sem duplicata;
//   2. canonical: cada página aponta para si mesma; o hreflang pt-BR/en/x-default do HTML é igual ao do sitemap;
//   3. paridade: todo alternado declarado existe, responde 200 no outro domínio e devolve o link de volta (reciprocidade);
//   4. órfãs: rastreio com linkinator a partir de `/`: toda URL do sitemap precisa ser alcançada por link interno;
//   5. idioma: `<html lang>` e o texto visível de cada página batem com o domínio (sem mistura português/inglês).
// Parser de XML/HTML por expressão regular, de propósito: o sitemap é gerado por nós (scripts/seo.mjs) e a única
// dependência usada é o linkinator, que já é do projeto. Sai com código 1 se qualquer regra falhar.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { LinkChecker } from 'linkinator';

const DOMINIOS = {
  br: { host: 'linvuu.com.br', origem: 'https://linvuu.com.br', lang: 'pt-BR', sitemap: '/sitemap.xml' },
  com: { host: 'linvuu.com', origem: 'https://linvuu.com', lang: 'en', sitemap: '/sitemap.xml' },
};
// Páginas que citam o OUTRO idioma de propósito (curso/gramática DE inglês no .com.br tem frases em inglês; o português no .com
// tem exemplos em português). Só entram aqui páginas de ensino do idioma, nunca texto de interface.
const ISENTAS_IDIOMA = [/^\/curso\/(en|br)$/, /^\/gramatica\/(en|br)$/, /^\/livros(\/|$)/, /^\/materiais-gratuitos/, /^\/curso\/it$/];

const ATUALIZAR_MAPA = process.argv.includes('--atualizar-mapa');
const DOC = path.join(import.meta.dirname, '..', 'specs', 'MAPA-ROTAS-E-DOMINIOS.md');
const INI = '<!-- MATRIZ:INICIO (gerada por scripts/auditar-rotas-dominios.mjs; nao edite a mao) -->', FIM = '<!-- MATRIZ:FIM -->';
const raizRepo = path.join(import.meta.dirname, '..');
const lerJson = (...p) => JSON.parse(fs.readFileSync(path.join(raizRepo, ...p), 'utf8'));
const contarArq = (dir, re) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => re.test(f)).length : 0);

/** Matriz viva: rotas dos dois sitemaps lado a lado + cobertura de explicação por curso. Sem datas, para ser determinística. */
function gerarMatriz(mapas) {
  const paths = new Map();
  for (const [id, lista] of Object.entries(mapas)) for (const u of lista) {
    const p = normaliza(new URL(u.loc).pathname);
    const linha = paths.get(p) ?? { br: false, com: false, cluster: new Set() };
    linha[id] = true; for (const k of Object.keys(u.alt)) if (k !== 'x-default') linha.cluster.add(k);
    paths.set(p, linha);
  }
  const ordem = [...paths.keys()].sort((a, b) => a.localeCompare(b));
  const l1 = ['| Rota | .com.br (pt-BR) | .com (en) | hreflang declarado |', '|---|---|---|---|'];
  for (const p of ordem) {
    const x = paths.get(p); const c = [...x.cluster].sort().join(' ↔ ') || '—';
    l1.push(`| \`${p}\` | ${x.br ? 'sim' : '—'} | ${x.com ? 'sim' : '—'} | ${c} |`);
  }
  const indice = lerJson('content', 'indice.json').cursos;
  const l2 = ['| Curso | Sessões | Explicadas em português | Explicadas em inglês | Hub indexável no .com |', '|---|---|---|---|---|'];
  for (const id of Object.keys(indice).sort()) {
    const total = indice[id].total ?? 0;
    // Texto-fonte fica na raiz do curso (dia-NNN.json); a explicação em inglês de curso em português fica em <id>/en/.
    const pt = indice[id].fonte === 'pt' ? `${total}/${total}` : '—';
    const en = indice[id].fonte === 'en' ? total : contarArq(path.join(raizRepo, 'content', 'idiomas', id, 'en'), /^dia-\d+\.json$/);
    const noCom = mapas.com.some((u) => normaliza(new URL(u.loc).pathname) === `/curso/${id}`);
    l2.push(`| ${id} | ${total} | ${pt} | ${en}/${total} | ${noCom ? 'sim' : 'não'} |`);
  }
  return `${INI}\n\n### Rotas nos sitemaps\n\n${l1.join('\n')}\n\n### Cobertura de explicação por curso\n\n${l2.join('\n')}\n\n${FIM}`;
}

const falhas = [];
const falhar = (regra, msg) => { falhas.push(`[${regra}] ${msg}`); };

const porta = 42000 + Math.floor(Math.random() * 8000);
const env = { ...process.env, NODE_ENV: 'production', PORT: String(porta), DOTENV_CONFIG_PATH: '__sem_credenciais__' };
for (const k of Object.keys(env)) if (/^(STRIPE_|FIREBASE_|GOOGLE_|REVENUECAT_|VITE_FIREBASE_)/.test(k)) env[k] = '';
const servidor = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], { env, stdio: 'ignore' });
const proxies = [];

function pegar(host, caminho) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port: porta, path: caminho, method: 'GET', headers: { host, 'x-forwarded-host': host, 'x-forwarded-proto': 'https' } }, (r) => {
      const partes = [];
      r.on('data', (c) => partes.push(c));
      r.on('end', () => resolve({ status: r.statusCode, headers: r.headers, corpo: Buffer.concat(partes).toString('utf8') }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => req.destroy(new Error(`timeout ${host}${caminho}`)));
    req.end();
  });
}

/** Proxy local que fixa o Host: o linkinator fala com 127.0.0.1:<porta> e o servidor acredita que é o domínio real. */
function abrirProxy(host) {
  return new Promise((resolve) => {
    const s = http.createServer((req, res) => {
      const p = http.request({ host: '127.0.0.1', port: porta, path: req.url, method: req.method, headers: { ...req.headers, host, 'x-forwarded-host': host, 'x-forwarded-proto': 'https' } }, (r) => {
        const h = { ...r.headers };
        // Redirecionamentos para o domínio real viram redirecionamentos para o proxy, para o rastreio seguir sem rede externa.
        if (typeof h.location === 'string') h.location = h.location.replace(/^https:\/\/linvuu\.com(\.br)?/, `http://127.0.0.1:${s.address().port}`);
        res.writeHead(r.statusCode, h); r.pipe(res);
      });
      req.pipe(p); p.on('error', () => { res.writeHead(502); res.end(); });
    });
    s.listen(0, '127.0.0.1', () => { proxies.push(s); resolve(s.address().port); });
  });
}

const caminhoDe = (url) => { const u = new URL(url); return u.pathname + u.search; };
const normaliza = (p) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p);

function lerSitemap(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
    alt: Object.fromEntries([...m[1].matchAll(/<xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)].map((x) => [x[1], x[2]])),
  }));
}
function lerHead(html) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const alt = Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((x) => [x[1], x[2]]));
  const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
  const corpo = html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/g, ' ').replace(/<head[\s\S]*?<\/head>/, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  return { canonical, alt, lang, robots, texto: corpo.toLowerCase() };
}

// Palavras-função que só existem em um dos dois idiomas (sem homógrafos comuns: "a", "me", "no", "e" ficam de fora).
const PT = ['não', 'você', 'está', 'também', 'uma', 'para', 'aulas', 'aula', 'grátis', 'seus', 'sua', 'mais', 'como', 'pelo', 'pela', 'ainda', 'seu'];
const EN = ['the', 'and', 'with', 'your', 'you', 'for', 'are', 'this', 'that', 'lessons', 'lesson', 'free', 'from', 'will', 'have', 'our', 'can'];
function contar(texto, lista) {
  const palavras = texto.replace(/\S+@\S+|\S+\.(com|br)\S*|são josé dos campos/g, ' ').match(/[a-zà-ú]+/g) ?? [];
  const alvo = new Set(lista);
  let n = 0; for (const p of palavras) if (alvo.has(p)) n++;
  return { n, total: palavras.length, por1000: palavras.length ? (n * 1000) / palavras.length : 0 };
}

try {
  for (let i = 0; i < 300; i++) { try { if ((await pegar('linvuu.com.br', '/healthz')).status === 200) break; } catch { /* ainda subindo */ } await new Promise((r) => setTimeout(r, 100)); }

  // 1. Sitemaps
  const mapas = {};
  for (const [id, d] of Object.entries(DOMINIOS)) {
    const r = await pegar(d.host, d.sitemap);
    if (r.status !== 200 || !/xml/.test(String(r.headers['content-type']))) { falhar('sitemap', `${d.host}${d.sitemap} respondeu ${r.status} ${r.headers['content-type']}`); mapas[id] = []; continue; }
    mapas[id] = lerSitemap(r.corpo);
    const vistos = new Set();
    for (const u of mapas[id]) {
      if (!u.loc?.startsWith(d.origem)) { falhar('sitemap', `${d.host}: <loc> fora do domínio: ${u.loc}`); continue; }
      if (vistos.has(u.loc)) falhar('sitemap', `${d.host}: URL duplicada ${u.loc}`);
      vistos.add(u.loc);
    }
    console.log(`sitemap ${d.host}: ${mapas[id].length} URLs`);
  }
  const porLoc = Object.fromEntries(Object.entries(mapas).map(([id, l]) => [id, new Map(l.map((u) => [u.loc, u]))]));

  // Matriz viva do documento: o mapa em Markdown nunca pode divergir dos sitemaps reais
  const matriz = gerarMatriz(mapas);
  if (fs.existsSync(DOC)) {
    const atual = fs.readFileSync(DOC, 'utf8'), a = atual.indexOf(INI), b = atual.indexOf(FIM);
    if (a < 0 || b < 0) falhar('mapa', 'specs/MAPA-ROTAS-E-DOMINIOS.md sem os marcadores da matriz');
    else if (atual.slice(a, b + FIM.length) !== matriz) {
      if (ATUALIZAR_MAPA) { fs.writeFileSync(DOC, atual.slice(0, a) + matriz + atual.slice(b + FIM.length)); console.log('mapa atualizado: specs/MAPA-ROTAS-E-DOMINIOS.md'); }
      else falhar('mapa', 'a matriz de specs/MAPA-ROTAS-E-DOMINIOS.md esta desatualizada: rode `npm run audit:rotas-dominios -- --atualizar-mapa` e commite');
    }
  } else falhar('mapa', 'specs/MAPA-ROTAS-E-DOMINIOS.md nao existe');

  // 2, 3 e 5. Cada URL: status, canonical, hreflang igual ao sitemap, reciprocidade, idioma
  const paginas = {};
  for (const [id, d] of Object.entries(DOMINIOS)) {
    paginas[id] = new Map();
    for (const u of mapas[id]) {
      const caminho = caminhoDe(u.loc);
      const r = await pegar(d.host, caminho);
      if (r.status !== 200) { falhar('status', `${u.loc} respondeu ${r.status}`); continue; }
      const h = lerHead(r.corpo);
      paginas[id].set(u.loc, h);
      if (h.canonical !== u.loc) falhar('canonical', `${u.loc}: canonical é ${h.canonical}`);
      if (/noindex/.test(h.robots)) falhar('indexacao', `${u.loc}: está no sitemap mas tem noindex`);
      const a = JSON.stringify(Object.entries(h.alt).sort()), b = JSON.stringify(Object.entries(u.alt).sort());
      if (a !== b) falhar('hreflang', `${u.loc}: hreflang do HTML difere do sitemap\n      html:    ${a}\n      sitemap: ${b}`);
      if (h.lang !== d.lang) falhar('idioma', `${u.loc}: <html lang="${h.lang}"> em vez de "${d.lang}"`);
      if (!u.alt['x-default'] && Object.keys(u.alt).length) falhar('hreflang', `${u.loc}: tem alternados mas falta x-default`);
      for (const [cod, alvo] of Object.entries(u.alt)) {
        if (cod === 'x-default') continue;
        const outro = cod === 'en' ? 'com' : 'br';
        if (outro === id) { if (alvo !== u.loc) falhar('hreflang', `${u.loc}: alternado ${cod} do próprio idioma aponta para ${alvo}`); continue; }
        const par = porLoc[outro].get(alvo);
        if (!par) { falhar('paridade', `${u.loc} declara ${cod} → ${alvo}, que NÃO está no sitemap de ${DOMINIOS[outro].host}`); continue; }
        const volta = par.alt[DOMINIOS[id].lang];
        if (volta !== u.loc) falhar('reciprocidade', `${u.loc} → ${alvo}, mas a volta aponta para ${volta ?? 'nada'}`);
      }
      const caminhoSemBarra = normaliza(new URL(u.loc).pathname);
      if (!ISENTAS_IDIOMA.some((re) => re.test(caminhoSemBarra))) {
        const outroLista = id === 'com' ? PT : EN, propria = id === 'com' ? EN : PT;
        const estranho = contar(h.texto, outroLista), nativo = contar(h.texto, propria);
        // Só avalia com texto suficiente; mistura = palavras do outro idioma com peso relevante frente às do próprio.
        if (nativo.total >= 60 && estranho.n >= 6 && estranho.n > nativo.n * 0.25) falhar('mistura-de-idioma', `${u.loc}: ${estranho.n} palavras do outro idioma contra ${nativo.n} do próprio (${estranho.por1000.toFixed(1)}/1000)`);
      }
    }
  }

  // 4. Órfãs: rastreio por link interno a partir de `/`
  for (const [id, d] of Object.entries(DOMINIOS)) {
    const pp = await abrirProxy(d.host);
    const base = `http://127.0.0.1:${pp}`;
    const alcancadas = new Set(); const quebrados = [];
    const verif = new LinkChecker();
    verif.on('link', (l) => {
      if (!l.url.startsWith(base)) return;
      if (l.state === 'BROKEN' && l.status !== 429) quebrados.push(`${l.url} (${l.status}) em ${l.parent ?? '—'}`);
      alcancadas.add(normaliza(caminhoDe(l.url).split('#')[0]));
    });
    await verif.check({ path: `${base}/`, recurse: true, timeout: 20000, concurrency: 6, linksToSkip: [`^(?!${base.replace(/[.]/g, '\\.')}).*`], redirects: 'allow' });
    for (const q of quebrados) falhar('link-quebrado', `${d.host}: ${q}`);
    for (const u of mapas[id]) {
      const p = normaliza(new URL(u.loc).pathname);
      if (p !== '/' && !alcancadas.has(p)) falhar('orfa', `${u.loc} está no sitemap mas nenhum link interno chega nela`);
    }
    console.log(`rastreio ${d.host}: ${alcancadas.size} páginas alcançadas por link interno`);
  }
} finally {
  servidor.kill();
  for (const p of proxies) p.close();
}

if (falhas.length) {
  console.error(`\nFALHOU: ${falhas.length} problema(s)\n` + falhas.map((f) => ` - ${f}`).join('\n'));
  process.exit(1);
}
console.log('\nOK: sitemaps, canonical, hreflang (paridade e reciprocidade), órfãs e idioma sem problemas nos dois domínios.');
