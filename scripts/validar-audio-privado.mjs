// Validação barata do acesso ao repositório privado Linvuu-Audio no build da Vercel.
//
// O build da Vercel NÃO clona o áudio (232 MB): o áudio pago vem do R2 em runtime
// (server/audio-r2.ts). Este passo só confirma que o repo privado continua acessível
// (para o upload para o R2, feito por scripts/enviar-audio-r2.mjs, a partir de um clone
// local ou do CI). É só um aviso: nunca falha o build — o áudio do site não depende
// deste passo, depende do R2 (ver docs/infra/R2-AUDIO-PRIVADO.md).
//
// Sem credencial nenhuma: avisa e segue (o R2 pode já ter o áudio).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO = process.env.AUDIO_REPO || 'FelipeNascimentoRosa/Linvuu-Audio';
const chave = process.env.AUDIO_DEPLOY_KEY;
const token = process.env.AUDIO_REPO_TOKEN;

if (!chave && !token) {
  console.log('validar-audio-privado: sem AUDIO_DEPLOY_KEY/AUDIO_REPO_TOKEN; o áudio pago tem de estar no R2 (docs/infra/R2-AUDIO-PRIVADO.md).');
  process.exit(0);
}
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(REPO)) { console.warn('validar-audio-privado: AUDIO_REPO inválido.'); process.exit(0); }

let temporario = null;
try {
  if (chave) {
    temporario = fs.mkdtempSync(path.join(os.tmpdir(), 'linvuu-audio-'));
    const arq = path.join(temporario, 'chave');
    fs.writeFileSync(arq, Buffer.from(chave, 'base64').toString('utf8').replace(/\r?\n?$/, '\n'), { mode: 0o600 });
    const ssh = `ssh -i "${arq}" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile="${path.join(temporario, 'hosts')}" -o BatchMode=yes`;
    execFileSync('git', ['ls-remote', '--quiet', `git@github.com:${REPO}.git`, 'HEAD'],
      { stdio: ['ignore', 'ignore', 'ignore'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_SSH_COMMAND: ssh } });
  } else {
    const cabecalho = 'Authorization: basic ' + Buffer.from(`x-access-token:${token}`).toString('base64');
    execFileSync('git', ['-c', `http.extraheader=${cabecalho}`, 'ls-remote', '--quiet', `https://github.com/${REPO}.git`, 'HEAD'],
      { stdio: ['ignore', 'ignore', 'ignore'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
  }
  console.log(`validar-audio-privado: repositório ${REPO} acessível.`);
} catch {
  console.warn(`validar-audio-privado: AVISO: não foi possível confirmar o acesso a ${REPO} (chave/token sem leitura, repositório inexistente ou GitHub fora do ar). O build segue; o áudio pago depende do R2.`);
} finally {
  if (temporario) fs.rmSync(temporario, { recursive: true, force: true });
}
