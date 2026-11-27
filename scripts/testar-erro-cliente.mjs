// Teste de POST /api/erro em modo produção: esquema fechado, limite de 4 kB, limpeza de PII, rate limit e resposta 204 muda.
import { spawn } from 'node:child_process';

const PORT = 4100 + Math.floor(Math.random() * 90);
const base = `http://127.0.0.1:${PORT}`;
const env = { ...process.env, NODE_ENV: 'production', PORT: String(PORT), STRIPE_SECRET_KEY: '', FIREBASE_PROJECT_ID: '', VITE_FIREBASE_PROJECT_ID: '' };
const srv = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], { env, stdio: ['ignore', 'pipe', 'pipe'] });
let log = ''; srv.stdout.on('data', (d) => (log += d)); srv.stderr.on('data', (d) => (log += d));
const falhas = [];
const ok = (cond, msg) => { console.log(`${cond ? 'ok   ' : 'FALHA'} ${msg}`); if (!cond) falhas.push(msg); };
const valido = { tipo: 'error', mensagem: 'x is not a function', stack: 'Error: x\n    at https://linvuu.com.br/assets/index-abc.js:1:2', rota: '/curso/ru', dominio: 'linvuu.com.br', versao: 'abc123' };
// Cada chamada usa um IP de origem diferente (X-Forwarded-For) para não gastar o limite; só o teste de limite repete o mesmo.
let n = 0;
const post = (corpo, ip = `10.1.${Math.floor(++n / 250)}.${n % 250}`) => fetch(`${base}/api/erro`, { method: 'POST', headers: { 'Content-Type': 'application/json', host: 'linvuu.com.br', 'x-forwarded-for': ip }, body: typeof corpo === 'string' ? corpo : JSON.stringify(corpo) });

try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(`${base}/healthz`)).ok) break; } catch { /* espera */ } await new Promise((r) => setTimeout(r, 500)); }
  if (srv.exitCode !== null) throw new Error(`Servidor encerrou antes de ficar pronto: ${log.slice(-2000)}`);

  const r1 = await post(valido);
  ok(r1.status === 204 && (await r1.text()) === '', 'relatório válido responde 204 sem corpo');
  ok(/"evento":"erro-cliente"/.test(log) && /"rota":"\/curso\/ru"/.test(log), 'vira uma linha estruturada no log');

  // Texto sintético com o formato de uma chave Google, montado em tempo de execução: nada com esse padrão fica escrito no repositório.
  const chaveFalsa = ['AIza', 'Sy', 'Test', '0'.repeat(31)].join('');
  const pii = { ...valido, mensagem: 'falha para aluno@exemplo.com em https://linvuu.com.br/dia?token=SEGREDO123&uid=abc', stack: `chave ${chaveFalsa}`, rota: '/entrar?email=aluno@exemplo.com#x' };
  const r2 = await post(pii);
  ok(r2.status === 400, 'rota com "?" fora do formato é recusada (400)');
  const r2b = await post({ ...pii, rota: '/entrar' });
  ok(r2b.status === 204, 'mensagem com PII é aceita depois de limpa');
  ok(!/aluno@exemplo\.com|SEGREDO123/.test(log) && !log.includes(chaveFalsa),'log sem e-mail, token nem query string');
  ok(/\[email\]/.test(log) && /\[token\]/.test(log), 'log mostra os marcadores no lugar dos dados');

  ok((await post({ ...valido, uid: 'abc' })).status === 400, 'campo fora do esquema (uid) → 400');
  ok((await post({ ...valido, tipo: 'outro' })).status === 400, 'tipo desconhecido → 400');
  ok((await post({ ...valido, mensagem: '' })).status === 400, 'mensagem vazia → 400');
  ok((await post([valido])).status === 400, 'corpo que não é objeto → 400');
  ok((await post('{quebrado')).status === 400, 'JSON inválido → 400');
  const grande = await post({ ...valido, stack: 'a'.repeat(5000) });
  ok(grande.status === 413, 'corpo acima de 4 kB → 413');
  const corpo413 = await grande.text();
  ok(!/stack|at |node_modules/.test(corpo413), '413 sem detalhes internos');
  ok((await fetch(`${base}/api/erro`)).status === 404, 'GET não existe');
  const cabecalhos = await post(valido);
  ok(cabecalhos.headers.get('cache-control') === 'private, no-store' && cabecalhos.headers.get('x-robots-tag') === 'noindex', 'resposta sem cache e noindex');

  let limitado = false;
  for (let i = 0; i < 12; i++) { if ((await post(valido, "10.9.9.9")).status === 429) { limitado = true; break; } }
  ok(limitado, 'rate limit por IP responde 429');
} catch (e) { falhas.push(String(e)); console.error(e); } finally { srv.kill(); }

if (falhas.length) { console.error(`\n${falhas.length} falha(s).`); process.exit(1); }
console.log('\n/api/erro: esquema, limites, PII e rate limit conferidos.');
