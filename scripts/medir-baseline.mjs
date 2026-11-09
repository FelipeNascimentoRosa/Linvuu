// Fase 1 (linha de base) e Fase 5 (medição pós-mudança) do protocolo REA.
// Mede com as MESMAS ferramentas antes e depois, para que o delta seja atribuível a uma única mudança.
// English: this script only measures; it never changes the site. It is phase 1 (baseline) and phase 5
// (post-change) of the REA protocol: Lighthouse (mobile + desktop) + axe-core on the same URLs, so the
// delta of one visual change can be read straight from `.baseline/<run>/resumo.json`.
// Uso: node scripts/medir-baseline.mjs [--runs=2] [--producao] [--so-local] [--rotulo=nome]
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { setTimeout as esperar } from 'node:timers/promises';

const argumentos = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);
const RODADAS = Number(argumentos.runs ?? 2);
const ROTULO = String(argumentos.rotulo ?? 'baseline');
const BASE = resolve('.baseline', `${ROTULO}-${new Date().toISOString().replace(/[:.]/g, '-')}`);
const PORTA = 4398;
const ORIGEM = `http://127.0.0.1:${PORTA}`;
const LH = resolve('scripts/seo-tools/node_modules/lighthouse/cli/index.js');

// Amostra local: cobre as rotas públicas de tipos diferentes (vitrine, curso, aula, gramática, institucional).
// O perfil `global` (.com) não é medido aqui: o servidor decide o domínio pelo cabeçalho Host e o Lighthouse
// não permite forjá-lo; o `.com` é medido em produção, que é onde o leitor realmente entra.
const LOCAIS = [
  '/', '/cursos', '/curso/de', '/curso/ru/dia/1', '/gramatica/ru', '/por-que-linvuu',
];
// Produção: as duas faces do site, medidas por HTTP real (inclusive CDN e cache de borda).
const PRODUCAO = [
  'https://linvuu.com.br/',
  'https://linvuu.com.br/curso/ru/dia/1',
  'https://linvuu.com.br/gramatica/ru',
  'https://linvuu.com/',
  'https://linvuu.com/curso/ru/dia/1',
  'https://linvuu.com/curso/es/dia/1',
  'https://linvuu.com/gramatica/es',
];

const apelido = (url) => url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'raiz';
const mediana = (valores) => {
  const v = valores.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return null;
  const meio = Math.floor(v.length / 2);
  return v.length % 2 ? v[meio] : (v[meio - 1] + v[meio]) / 2;
};

async function comServidorLocal(fn) {
  const filho = spawn(process.execPath, ['scripts/iniciar-servidor-lhci.mjs'], { stdio: ['ignore', 'pipe', 'pipe'] });
  let saida = '';
  let pronto = false;
  const ler = (b) => { saida = (saida + String(b)).slice(-4000); if (saida.includes('LINVUU_LHCI_READY')) pronto = true; };
  filho.stdout.on('data', ler);
  filho.stderr.on('data', ler);
  try {
    for (let i = 0; i < 300 && !pronto; i++) await esperar(100);
    if (!pronto) throw new Error(`Servidor local não subiu:\n${saida}`);
    return await fn();
  } finally {
    filho.kill();
  }
}

function lighthouse(url, preset, arquivo) {
  const args = [LH, url, '--output=json', `--output-path=${arquivo}`, '--quiet',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--chrome-flags=--headless=new --no-sandbox --disable-gpu'];
  if (preset === 'desktop') args.push('--preset=desktop');
  return new Promise((ok, falha) => {
    const p = spawn(process.execPath, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let erro = '';
    p.stderr.on('data', (b) => { erro = (erro + String(b)).slice(-1500); });
    p.on('exit', (code) => (code === 0 ? ok() : falha(new Error(erro || `lighthouse saiu com ${code}`))));
  });
}

async function axe(url) {
  let chromium, createRequire;
  try {
    ({ chromium } = await import('playwright'));
    ({ createRequire } = await import('node:module'));
  } catch {
    return { indisponivel: 'playwright não instalado' };
  }
  let fonte;
  try {
    fonte = createRequire(import.meta.url)('axe-core').source;
  } catch {
    return { indisponivel: 'axe-core não instalado' };
  }
  const navegador = await chromium.launch({ headless: true });
  try {
    const pagina = await navegador.newPage({ viewport: { width: 412, height: 823 } });
    await pagina.goto(url, { waitUntil: 'load', timeout: 45_000 });
    // O site tem CSP `script-src 'self' …`: `addScriptTag` é recusado pelo navegador. Avaliar no contexto
    // da página (CDP Runtime.evaluate) não passa pelo CSP e mede o mesmo DOM que o leitor recebe.
    await pagina.evaluate(fonte);
    return await pagina.evaluate(async () => {
      const res = await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      });
      return {
        violacoes: res.violations.length,
        serias: res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').length,
        tipos: res.violations.map((v) => `${v.id}(${v.impact})x${v.nodes.length}`).sort(),
      };
    });
  } finally {
    await navegador.close();
  }
}

const lerRelatorio = (arquivo) => {
  const lhr = JSON.parse(readFileSync(arquivo, 'utf8'));
  const nota = (c) => (lhr.categories[c] ? Math.round(lhr.categories[c].score * 100) : null);
  const ms = (a) => lhr.audits[a]?.numericValue ?? null;
  return {
    desempenho: nota('performance'), acessibilidade: nota('accessibility'),
    boasPraticas: nota('best-practices'), seo: nota('seo'),
    lcpMs: ms('largest-contentful-paint'), cls: ms('cumulative-layout-shift'),
    tbtMs: ms('total-blocking-time'), fcpMs: ms('first-contentful-paint'),
    pesoBytes: ms('total-byte-weight'), requisicoes: lhr.audits['network-requests']?.details?.items?.length ?? null,
  };
};

const COLUNAS = ['desempenho', 'acessibilidade', 'boasPraticas', 'seo', 'lcpMs', 'cls', 'tbtMs', 'fcpMs', 'pesoBytes', 'requisicoes'];

function tabela(linhas) {
  const cab = '| Página | Aparelho | ' + COLUNAS.map((c) => c).join(' | ') + ' |';
  const sep = '|---' + '|---'.repeat(COLUNAS.length) + '|';
  const corpo = linhas.map((l) => `| ${l.pagina} | ${l.aparelho} | ` + COLUNAS.map((c) => {
    const v = l[c];
    if (v === null || v === undefined) return '—';
    if (c === 'cls') return v.toFixed(3);
    if (c === 'lcpMs' || c === 'tbtMs' || c === 'fcpMs') return Math.round(v);
    if (c === 'pesoBytes') return Math.round(v / 1024) + ' KiB';
    return v;
  }).join(' | ') + ' |');
  return [cab, sep, ...corpo].join('\n');
}

async function medir(urls, prefixoArquivo) {
  const linhas = [];
  const acessibilidade = [];
  for (const url of urls) {
    for (const aparelho of ['celular', 'computador']) {
      const amostras = [];
      for (let r = 1; r <= RODADAS; r++) {
        const arquivo = join(BASE, 'lighthouse', `${prefixoArquivo}-${apelido(url)}-${aparelho}-${r}.json`);
        try {
          await lighthouse(url, aparelho === 'computador' ? 'desktop' : 'mobile', arquivo);
          amostras.push(lerRelatorio(arquivo));
        } catch (e) {
          console.error(`  falhou ${url} ${aparelho} #${r}: ${e.message}`);
        }
      }
      if (!amostras.length) continue;
      const linha = { pagina: url, aparelho };
      for (const c of COLUNAS) linha[c] = mediana(amostras.map((a) => a[c]));
      linhas.push(linha);
      console.log(`  ${url} ${aparelho}: desempenho ${linha.desempenho} · a11y ${linha.acessibilidade} · seo ${linha.seo} · LCP ${Math.round(linha.lcpMs)} ms · CLS ${Number(linha.cls).toFixed(3)} · TBT ${Math.round(linha.tbtMs)} ms`);
    }
    const ax = await axe(url).catch((e) => ({ indisponivel: `falhou: ${String(e.message).slice(0, 120)}` }));
    acessibilidade.push({ pagina: url, ...ax });
    console.log(`  ${url} axe-core: ${ax.indisponivel ?? `${ax.violacoes} violações (${ax.serias} graves)`}`);
  }
  return { linhas, acessibilidade };
}

const principais = async () => {
  mkdirSync(join(BASE, 'lighthouse'), { recursive: true });
  const resumo = { rotulo: ROTULO, quando: new Date().toISOString(), rodadas: RODADAS, lighthouse: {}, axe: {} };

  if (!argumentos.producao && !argumentos['so-producao']) {
    console.log(`\n== Local (.com.br, 127.0.0.1:${PORTA}) — ${LOCAIS.length} páginas × 2 aparelhos × ${RODADAS} ==`);
    const local = await comServidorLocal(() => medir(LOCAIS.map((p) => ORIGEM + p), 'local'));
    resumo.lighthouse.local = local.linhas;
    resumo.axe.local = local.acessibilidade;
  }
  if (argumentos.producao || argumentos['so-producao']) {
    console.log(`\n== Produção (HTTP real) — ${PRODUCAO.length} páginas × 2 aparelhos × ${RODADAS} ==`);
    const prod = await medir(PRODUCAO, 'producao');
    resumo.lighthouse.producao = prod.linhas;
    resumo.axe.producao = prod.acessibilidade;
  }

  writeFileSync(join(BASE, 'resumo.json'), JSON.stringify(resumo, null, 2));
  const saida = [
    `# Medição ${ROTULO} — ${resumo.quando} (${RODADAS} rodada(s) por página e aparelho; valor = mediana)`,
    '', '## Lighthouse', '',
    tabela([...(resumo.lighthouse.local ?? []), ...(resumo.lighthouse.producao ?? [])]),
    '', '## axe-core (WCAG 2.0/2.1/2.2 A e AA, viewport 412×823)', '',
    '| Página | Violações | Graves/críticas | Tipos |', '|---|---|---|---|',
    ...Object.values(resumo.axe).flat().map((a) => `| ${a.pagina} | ${a.indisponivel ?? a.violacoes} | ${a.indisponivel ? '—' : a.serias} | ${a.indisponivel ? '—' : (a.tipos.join(', ') || 'nenhuma')} |`),
  ].join('\n');
  writeFileSync(join(BASE, 'resumo.md'), saida + '\n');
  console.log(`\n${saida}\n\nArquivos: ${BASE}`);
};

principais().catch((e) => { console.error(e); process.exit(1); });
