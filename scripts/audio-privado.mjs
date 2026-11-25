// Baixa o áudio pago (repositório privado Linvuu-Audio) para .audio-privado/ durante o build da Vercel.
// Duas formas de autenticar (a chave SSH tem prioridade):
//   AUDIO_DEPLOY_KEY  chave privada SSH em base64, de uma "deploy key" SOMENTE LEITURA cadastrada no repositório Linvuu-Audio
//                     (não expira e só enxerga esse repositório). Fica no painel da Vercel, nunca no Git.
//   AUDIO_REPO_TOKEN  token fine-grained só de leitura (Contents: Read) do Linvuu-Audio.
// AUDIO_REPO (opcional): dono/nome; padrão FelipeNascimentoRosa/Linvuu-Audio.
// Sem credencial: em desenvolvimento e no CI segue sem baixar; na Vercel só segue se ainda existir a origem antiga em server/.
// Falha ao baixar: enquanto a origem antiga existir, só avisa (não trava o deploy); depois dela, interrompe o build.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO = process.env.AUDIO_REPO || 'FelipeNascimentoRosa/Linvuu-Audio';
const chave = process.env.AUDIO_DEPLOY_KEY;
const token = process.env.AUDIO_REPO_TOKEN;
const destino = '.audio-privado';
const noRender = process.env.RENDER === 'true';
const origemAntiga = fs.existsSync('server/audio-privado-v2') || fs.existsSync('server/audio-privado');

function falha(msg) {
  if (origemAntiga) { console.warn(`audio-privado: AVISO: ${msg} Seguindo com a origem antiga em server/ (deploy não bloqueado).`); process.exit(0); }
  console.error(`audio-privado: ${msg} Build interrompido para não publicar um site sem o áudio pago (o deploy anterior continua no ar).`);
  process.exit(1);
}

if (!chave && !token) {
  if (noRender && !origemAntiga) {
    console.error('audio-privado: AUDIO_DEPLOY_KEY/AUDIO_REPO_TOKEN ausentes e server/audio-privado* não existe mais. O build para aqui para não publicar um site sem o áudio pago (o deploy anterior continua no ar). Defina a variável na Vercel (docs/AUDIO-PRIVADO.md).');
    process.exit(1);
  }
  console.log('audio-privado: sem credencial; usando server/audio-privado* quando existir.');
  process.exit(0);
}
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(REPO)) { console.error('audio-privado: AUDIO_REPO inválido.'); process.exit(1); }

fs.rmSync(destino, { recursive: true, force: true });
const baseEnv = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
let temporario = null;
try {
  if (chave) {
    // Chave SSH somente leitura. A chave vai para um arquivo temporário (0600) e é apagada logo depois.
    temporario = fs.mkdtempSync(path.join(os.tmpdir(), 'linvuu-audio-'));
    const arq = path.join(temporario, 'chave');
    fs.writeFileSync(arq, Buffer.from(chave, 'base64').toString('utf8').replace(/\r?\n?$/, '\n'), { mode: 0o600 });
    const ssh = `ssh -i "${arq}" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile="${path.join(temporario, 'hosts')}" -o BatchMode=yes`;
    execFileSync('git', ['clone', '--depth', '1', '--quiet', `git@github.com:${REPO}.git`, destino],
      { stdio: ['ignore', 'ignore', 'ignore'], env: { ...baseEnv, GIT_SSH_COMMAND: ssh } });
  } else {
    // O token vai num cabeçalho (nunca na URL) e o .git é apagado depois, porque `clone -c` grava o cabeçalho na configuração do clone.
    const cabecalho = 'Authorization: basic ' + Buffer.from(`x-access-token:${token}`).toString('base64');
    execFileSync('git', ['-c', `http.extraheader=${cabecalho}`, 'clone', '--depth', '1', '--quiet', `https://github.com/${REPO}.git`, destino],
      { stdio: ['ignore', 'ignore', 'ignore'], env: baseEnv });
  }
} catch {
  falha(`não foi possível baixar ${REPO} (${chave ? 'chave SSH sem acesso, ssh indisponível' : 'token sem leitura'}, repositório inexistente ou GitHub fora do ar).`);
} finally {
  if (temporario) fs.rmSync(temporario, { recursive: true, force: true });
}
fs.rmSync(`${destino}/.git`, { recursive: true, force: true });

let mp3 = 0;
const contar = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = `${d}/${e.name}`; if (e.isDirectory()) contar(p); else if (e.name.endsWith('.mp3')) mp3++; } };
contar(destino);
if (mp3 < 1000) { fs.rmSync(destino, { recursive: true, force: true }); falha(`só ${mp3} MP3 em ${REPO}; esperado mais de 10 mil.`); }
console.log(`audio-privado: ${mp3} MP3 baixados de ${REPO} (${chave ? 'chave SSH' : 'token'}).`);
