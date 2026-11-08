// Baixa o áudio pago (repositório privado Linvuu-Audio) para .audio-privado/ durante o build do Render.
// Variáveis: AUDIO_REPO_TOKEN (token só de leitura do repositório de áudio; fica no painel do Render, nunca no Git),
//            AUDIO_REPO (opcional; padrão FelipeNascimentoRosa/Linvuu-Audio).
// Sem o token: em desenvolvimento e no CI segue sem baixar; no Render só segue se ainda existir a origem antiga em server/.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const REPO = process.env.AUDIO_REPO || 'FelipeNascimentoRosa/Linvuu-Audio';
const token = process.env.AUDIO_REPO_TOKEN;
const destino = '.audio-privado';
const noRender = process.env.RENDER === 'true';
const origemAntiga = fs.existsSync('server/audio-privado-v2') || fs.existsSync('server/audio-privado');

if (!token) {
  if (noRender && !origemAntiga) {
    console.error('audio-privado: AUDIO_REPO_TOKEN ausente e server/audio-privado* não existe mais. O build para aqui para não publicar um site sem o áudio pago (o deploy anterior continua no ar). Defina a variável no Render (docs/AUDIO-PRIVADO.md).');
    process.exit(1);
  }
  console.log('audio-privado: sem AUDIO_REPO_TOKEN; usando server/audio-privado* quando existir.');
  process.exit(0);
}
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(REPO)) { console.error('audio-privado: AUDIO_REPO inválido.'); process.exit(1); }

fs.rmSync(destino, { recursive: true, force: true });
// O token vai num cabeçalho (nunca na URL) e o .git é apagado depois, porque `clone -c` grava o cabeçalho na configuração do clone.
const cabecalho = 'Authorization: basic ' + Buffer.from(`x-access-token:${token}`).toString('base64');
try {
  execFileSync('git', ['-c', `http.extraheader=${cabecalho}`, 'clone', '--depth', '1', '--quiet', `https://github.com/${REPO}.git`, destino],
    { stdio: ['ignore', 'ignore', 'ignore'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
} catch {
  console.error(`audio-privado: não foi possível baixar ${REPO} (token sem leitura, repositório inexistente ou GitHub fora do ar).`);
  process.exit(1);
}
fs.rmSync(`${destino}/.git`, { recursive: true, force: true });

let mp3 = 0;
const contar = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = `${d}/${e.name}`; if (e.isDirectory()) contar(p); else if (e.name.endsWith('.mp3')) mp3++; } };
contar(destino);
if (mp3 < 1000) { console.error(`audio-privado: só ${mp3} MP3 em ${REPO}; esperado mais de 10 mil. Build interrompido.`); process.exit(1); }
console.log(`audio-privado: ${mp3} MP3 baixados de ${REPO}.`);
