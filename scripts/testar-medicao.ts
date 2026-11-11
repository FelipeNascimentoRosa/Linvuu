// Testa a validação dos eventos e as contas do relatório de métricas (sem Firestore). Uso: npx tsx scripts/testar-medicao.ts
import assert from 'node:assert/strict';
import express from 'express';
import { agregar, validar } from '../server/medicao.ts';
import { funilPorDia, idFunil } from '../server/funil.ts';
import { agregarVisitas, ehRobo, idVisita, registrarVisitas, rotaModelo, visitaContavel } from '../server/visitas.ts';
import { agregarCtas, campoCta, chaveCta, idCta, registrarCtas } from '../server/ctas.ts';
import { CTAS } from '../src/config/ctas.ts';
import { readdirSync, readFileSync } from 'node:fs';

const id = 'a'.repeat(32);
assert.ok(validar({ id, eventos: [{ t: 'ex', idioma: 'en', ex: 'en-018-e01', tp: 'multiple-choice', ok: 1 }, { t: 'fim', idioma: 'en', aula: 18, ac: 30, tot: 40 }] }));
assert.equal(validar({ id: 'curto', eventos: [] }), null);
assert.equal(validar({ id, eventos: [{ t: 'ex', idioma: 'en', ex: '../../x', tp: 'a', ok: 1 }] }), null, 'id de exercício fora do padrão');
assert.equal(validar({ id, eventos: [{ t: 'fim', idioma: 'en', aula: 1, ac: 9, tot: 3 }] }), null, 'acertos maiores que o total');
assert.equal(validar({ id, eventos: [{ t: 'ex', idioma: 'en', ex: 'en-001-e01', tp: 'fill-gap', ok: 1, email: 'a@b.c' }] })?.eventos[0].hasOwnProperty('email'), false, 'campos extras são descartados');
assert.equal(validar({ id, eventos: Array(61).fill({ t: 'fim', idioma: 'en', aula: 1, ac: 1, tot: 1 }) }), null, 'lote grande demais');

const L = (u: string, d: string, t: string, extra = {}) => ({ u, d, t, idioma: 'en', ...extra });
const r = agregar([
  ...Array.from({ length: 5 }, (_, i) => L('a', '2026-11-05', 'ex', { ex: `en-001-e0${i}`, tp: 'multiple-choice', ok: i < 2 ? 1 : 0 })),
  L('a', '2026-11-05', 'fim', { aula: 1, ac: 2, tot: 5 }),
  ...Array.from({ length: 5 }, (_, i) => L('a', '2026-11-06', 'ex', { ex: `en-002-e0${i}`, tp: 'multiple-choice', ok: i < 4 ? 1 : 0 })),
  L('b', '2026-11-05', 'ex', { ex: 'en-001-e00', tp: 'fill-gap', ok: 0 }),
], '2026-11-20');
assert.equal(r.usuarios, 2);
assert.equal(r.comSessaoCompleta.n, 1);
assert.equal(r.retornoDia1.pct, 50);
assert.equal(r.retornoSemana.pct, 50);
assert.equal(r.acertoPrimeiroVsUltimoDia.melhoraram, 1);
assert.equal(r.ativosPorDia['2026-11-05'], 2);

// Funil do servidor (lote 4): 28 dias x 5 números, sem dado pessoal.
const agora = Date.parse('2026-11-20T12:00:00Z');
const f = funilPorDia(
  [{ e: 'sessao_1', d: '2026-11-20' }, { e: 'sessao_1', d: '2026-11-20' }, { e: 'sessao_8', d: '2026-11-19' }, { e: 'checkout_aberto', d: '2026-11-20' }, { e: 'checkout_pago', d: '2026-11-20' }, { e: 'sessao_1', d: '2026-01-01' }],
  [Date.parse('2026-11-20T01:00:00Z'), Date.parse('2026-11-19T23:00:00Z'), Date.parse('2026-01-01T00:00:00Z')],
  28, agora,
);
assert.equal(f.length, 28, '28 dias');
assert.equal(f[27].dia, '2026-11-20');
assert.equal(f[0].dia, '2026-10-24');
assert.deepEqual(f[27], { dia: '2026-11-20', contas: 1, sessao1: 2, sessao8: 0, checkoutsAbertos: 1, checkoutsPagos: 1 });
assert.deepEqual(f[26], { dia: '2026-11-19', contas: 1, sessao1: 0, sessao8: 1, checkoutsAbertos: 0, checkoutsPagos: 0 });
assert.equal(f.reduce((n, d) => n + d.sessao1, 0), 2, 'evento fora da janela não conta');
const h = idFunil('sessao_1', 'uid-secreto-123');
assert.match(h, /^[a-f0-9]{32}$/);
assert.ok(!h.includes('uid-secreto'), 'o ID do documento é hash, não o uid');
assert.notEqual(h, idFunil('sessao_8', 'uid-secreto-123'), 'tipos diferentes, documentos diferentes');
assert.equal(h, idFunil('sessao_1', 'uid-secreto-123'), 'mesmo aluno, mesmo documento (conta uma vez)');

// Visitas por rota (lote 5): sem cookie, sem IP, sem robô.
const CHROME = 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36';
assert.equal(ehRobo('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'), true);
assert.equal(ehRobo('Mozilla/5.0 (compatible; bingbot/2.0)'), true);
assert.equal(ehRobo('curl/8.4.0'), true);
assert.equal(ehRobo(''), true, 'sem UA não é visita');
assert.equal(ehRobo(undefined), true);
assert.equal(ehRobo(CHROME), false);
assert.equal(ehRobo('Mozilla/5.0 (Linux; Android 10; CUBOT X30) AppleWebKit/537.36 Chrome/91.0 Mobile Safari/537.36'), false, 'CUBOT não é robô');
assert.equal(rotaModelo('/'), '/');
assert.equal(rotaModelo('/curso/ru'), '/curso/:id');
assert.equal(rotaModelo('/curso/de/dia/12'), '/curso/:id/dia/:n');
assert.equal(rotaModelo('/gramatica/it'), '/gramatica/:id');
assert.equal(rotaModelo('/livros/gramatica-ru'), '/livros/:slug');
assert.equal(rotaModelo('/assinatura'), '/assinatura');
assert.equal(rotaModelo('/assinatura/?utm=x'), '/assinatura', 'barra final e consulta não criam rota nova');
assert.equal(rotaModelo('/Algo/Maiusculo'), '/algo/maiusculo', 'caixa alta não cria rota nova');
const v = (extra: Record<string, unknown> = {}) => visitaContavel({ status: 200, tipo: 'text/html; charset=utf-8', caminho: '/curso/ru', agente: CHROME, host: 'linvuu.com.br', ...extra });
assert.deepEqual(v(), { host: 'linvuu.com.br', rota: '/curso/:id' });
assert.equal(visitaContavel({ status: 301, tipo: 'text/html', caminho: '/x', agente: CHROME, host: 'linvuu.com.br' }), null, '301 não é visita');
assert.equal(visitaContavel({ status: 404, tipo: 'text/html', caminho: '/x', agente: CHROME, host: 'linvuu.com.br' }), null, '404 não é visita');
assert.equal(visitaContavel({ status: 200, tipo: 'application/json', caminho: '/api/meta', agente: CHROME, host: 'linvuu.com.br' }), null, 'JSON não é página');
assert.equal(visitaContavel({ status: 200, tipo: 'text/html', caminho: '/', agente: 'Googlebot/2.1', host: 'linvuu.com.br' }), null, 'robô não é visita');
assert.equal(visitaContavel({ status: 200, tipo: 'text/html', caminho: '/', agente: CHROME, host: '' }), null, 'sem host não há contagem');
const vi = idVisita('linvuu.com.br', '/curso/:id', '2026-11-20');
assert.match(vi, /^[a-f0-9]{32}$/);
assert.notEqual(vi, idVisita('linvuu.com', '/curso/:id', '2026-11-20'), 'domínios diferentes, documentos diferentes');
assert.notEqual(vi, idVisita('linvuu.com.br', '/curso/:id', '2026-11-21'), 'dias diferentes, documentos diferentes');
assert.equal(vi, idVisita('linvuu.com.br', '/curso/:id', '2026-11-20'), 'mesma chave, mesmo documento (soma no mesmo contador)');
const ag = agregarVisitas([
  { d: '2026-11-20', h: 'linvuu.com.br', r: '/', n: 3 },
  { d: '2026-11-20', h: 'linvuu.com.br', r: '/curso/:id', n: 2 },
  { d: '2026-11-19', h: 'linvuu.com', r: '/', n: 4 },
  { d: '2026-01-01', h: 'linvuu.com.br', r: '/', n: 99 },
  { d: '2026-11-20', h: 'linvuu.com.br', r: '/x', n: 0 },
], 28, agora);
assert.equal(ag.total, 9, 'só o que está dentro da janela e tem n > 0');
assert.equal(ag.porDia.length, 28);
assert.deepEqual(ag.porDia[27], { dia: '2026-11-20', visitas: 5 });
assert.deepEqual(ag.porDia[26], { dia: '2026-11-19', visitas: 4 });
assert.deepEqual(ag.porHost, [{ host: 'linvuu.com.br', visitas: 5 }, { host: 'linvuu.com', visitas: 4 }]);
assert.deepEqual(ag.porRota[0], { rota: '/', visitas: 7 }, 'rota com mais visita primeiro');

// O middleware de verdade, num servidor Express local: conta HTML 200 de gente e mais nada.
process.env.NODE_ENV = 'production';
const contadas: { host: string; rota: string }[] = [];
const app = express();
registrarVisitas(app, (c) => contadas.push(c));
app.get('/curso/ru', (_req, res) => { res.type('html').send('<h1>ok</h1>'); });
app.get('/sumiu', (_req, res) => { res.status(404).type('html').send('x'); });
app.get('/api/x', (_req, res) => { res.json({ ok: true }); });
const srv = await new Promise<import('node:http').Server>((ok) => { const s = app.listen(0, '127.0.0.1', () => ok(s)); });
const base = `http://127.0.0.1:${(srv.address() as { port: number }).port}`;
const pedir = (caminho: string, agente = CHROME) => fetch(base + caminho, { headers: { 'user-agent': agente } });
await pedir('/curso/ru');         // conta
await pedir('/sumiu');            // 404 não conta
await pedir('/api/x');            // JSON não conta
await pedir('/curso/ru', 'Googlebot/2.1'); // robô não conta
await new Promise((r) => setTimeout(r, 50));
srv.close();
assert.deepEqual(contadas, [{ host: '127.0.0.1', rota: '/curso/:id' }], 'só a visita de gente em HTML 200 é contada');
// Cliques em botão (lote 6): lista fechada, contagem por dia/host/botão, sem cookie e sem IP.
assert.equal(new Set(CTAS).size, CTAS.length, 'sem identificador repetido na lista fechada');
assert.ok(CTAS.every((c) => /^[a-z]+(_[a-z]+)+$/.test(c)), 'identificador em minúsculas, com sublinhado, igual nos dois idiomas');
assert.deepEqual(chaveCta('linvuu.com.br', 'assinatura_anual'), { host: 'linvuu.com.br', cta: 'assinatura_anual' });
assert.equal(chaveCta('linvuu.com.br:443', 'home_curso')?.host, 'linvuu.com.br', 'a porta não entra no host');
assert.equal(chaveCta('linvuu.com.br', 'botao_inventado'), null, 'botão fora da lista não é contado');
assert.equal(chaveCta('linvuu.com.br', 'https://linvuu.com.br/x'), null, 'URL não é identificador de botão');
assert.equal(chaveCta('', 'assinatura_anual'), null, 'sem host não há contagem');
const ci = idCta('linvuu.com.br', '2026-11-20');
assert.match(ci, /^[a-f0-9]{32}$/);
assert.ok(!ci.includes('linvuu'), 'o ID do documento é hash, não o host');
assert.equal(ci, idCta('linvuu.com.br', '2026-11-20'), 'mesmo dia e host, mesmo documento (soma no mesmo contador)');
assert.notEqual(ci, idCta('linvuu.com', '2026-11-20'), 'domínios diferentes, documentos diferentes');
assert.notEqual(ci, idCta('linvuu.com.br', '2026-11-21'), 'dias diferentes, documentos diferentes');
const ac = agregarCtas([
  { d: '2026-11-20', h: 'linvuu.com.br', n: 3, [campoCta('assinatura_anual')]: 2, [campoCta('home_curso')]: 1 },
  { d: '2026-11-19', h: 'linvuu.com', n: 4, [campoCta('assinatura_anual')]: 4 },
  { d: '2026-01-01', h: 'linvuu.com.br', n: 99, [campoCta('assinatura_anual')]: 99 },
  { d: '2026-11-20', h: 'linvuu.com.br', n: 0 },
], 28, agora);
assert.equal(ac.total, 7, 'só o que está dentro da janela e tem n > 0');
assert.deepEqual(ac.porDia[27], { dia: '2026-11-20', cliques: 3 });
assert.deepEqual(ac.porHost, [{ host: 'linvuu.com', cliques: 4 }, { host: 'linvuu.com.br', cliques: 3 }]);
assert.deepEqual(ac.porCta, [{ cta: 'assinatura_anual', cliques: 6 }, { cta: 'home_curso', cliques: 1 }], 'botão com mais clique primeiro; fora da janela não entra');
// Todo data-cta escrito no código tem de existir na lista fechada: identificador inventado não passa do build.
const marcados = new Set<string>();
for (const f of readdirSync(new URL('../src/', import.meta.url), { recursive: true, encoding: 'utf8' })) {
  if (!/\.tsx?$/.test(f)) continue;
  const texto = readFileSync(new URL(`../src/${f.replace(/\\/g, '/')}`, import.meta.url), 'utf8');
  for (const m of texto.matchAll(/\b(?:data-cta|cta)="([a-zA-Z0-9_-]+)"/g)) marcados.add(m[1]);
}
for (const m of marcados) assert.ok((CTAS as readonly string[]).includes(m), `cta="${m}" não está na lista fechada de src/config/ctas.ts`);
assert.ok(marcados.size >= 10, `os botões principais estão marcados (${marcados.size})`);

// A rota de verdade, num servidor Express local: só identificador da lista é contado, e uma vez por clique.
const cliques: { host: string; cta: string }[] = [];
const appCta = express();
appCta.use(express.json());
registrarCtas(appCta, (c) => cliques.push(c));
const srvCta = await new Promise<import('node:http').Server>((ok) => { const s = appCta.listen(0, '127.0.0.1', () => ok(s)); });
const baseCta = `http://127.0.0.1:${(srvCta.address() as { port: number }).port}`;
const clicar = (corpo: unknown) => fetch(baseCta + '/api/cta', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(corpo) });
assert.equal((await clicar({ cta: 'assinatura_anual' })).status, 204, 'clique válido responde sem corpo');
assert.equal((await clicar({ cta: 'botao_inventado' })).status, 400, 'botão fora da lista é recusado');
assert.equal((await clicar({})).status, 400, 'sem identificador é recusado');
assert.equal((await clicar({ cta: ['assinatura_anual'] })).status, 400, 'lista no lugar do identificador é recusada');
await new Promise((r) => setTimeout(r, 50));
srvCta.close();
assert.deepEqual(cliques, [{ host: '127.0.0.1', cta: 'assinatura_anual' }], 'só o clique em botão da lista é contado');
console.log('ok: medição');
