// Mede o conteúdo em inglês com o servidor local de pé: sobe, audita e derruba.
// Uso: npm run medir:ingles -- [--rotulo=fase1] [--sem-navegador]
// Argumentos extras são repassados à auditoria (scripts/en-tools/auditar-ingles.mjs).
import { spawn } from 'node:child_process';
import { setTimeout as esperar } from 'node:timers/promises';

const PORTA = 4398;
const servidor = spawn(process.execPath, ['scripts/iniciar-servidor-lhci.mjs'], { stdio: ['ignore', 'pipe', 'pipe'] });
let saida = '';
let pronto = false;
const ler = (b) => { saida = (saida + String(b)).slice(-4000); if (saida.includes('LINVUU_LHCI_READY')) pronto = true; };
servidor.stdout.on('data', ler);
servidor.stderr.on('data', ler);

// --sem-prod: mede as páginas montadas no navegador no perfil local (português), não em produção.
const extras = process.argv.slice(2).filter((a) => a !== '--sem-prod');
const modo = process.argv.includes('--sem-prod') ? [] : ['--prod'];

try {
  for (let i = 0; i < 300 && !pronto; i++) await esperar(100);
  if (!pronto) throw new Error(`Servidor local não subiu:\n${saida}`);
  const auditoria = spawn(
    process.execPath,
    ['scripts/en-tools/auditar-ingles.mjs', ...modo, '--base', `http://127.0.0.1:${PORTA}`, ...extras],
    { stdio: 'inherit' },
  );
  process.exitCode = await new Promise((ok) => auditoria.on('exit', (c) => ok(c ?? 1)));
} finally {
  servidor.kill();
}
