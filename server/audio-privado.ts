import fs from 'node:fs';
import path from 'node:path';
import { r2Configurado } from './audio-r2';

/**
 * Onde ficam os MP3 das sessões pagas. Eles NÃO vivem neste repositório (público): estão no repositório privado
 * Linvuu-Audio, baixado no build para `.audio-privado/` (scripts/audio-privado.mjs). `AUDIO_PRIVADO_DIR` aponta para outra pasta
 * (desenvolvimento, testes). `server/` é a origem antiga, mantida como reserva até o histórico ser limpo (docs/AUDIO-PRIVADO.md).
 * Dentro de cada raiz: `audio-privado-v2/<idioma>/` (voz ElevenLabs) tem prioridade sobre `audio-privado/<idioma>/` (voz antiga).
 */
export function raizesDoAudioPrivado(env: NodeJS.ProcessEnv = process.env, cwd: string = process.cwd()): string[] {
  const raizes: string[] = [];
  if (env.AUDIO_PRIVADO_DIR) raizes.push(path.resolve(env.AUDIO_PRIVADO_DIR));
  raizes.push(path.resolve(cwd, '.audio-privado'), path.resolve(cwd, 'server'));
  return raizes;
}

/** Caminho do MP3 pago, ou null se o nome for inválido ou o arquivo não existir em nenhuma raiz. */
export function arquivoDoAudioPrivado(idioma: string, arquivo: string, raizes: string[] = raizesDoAudioPrivado()): string | null {
  if (!/^[a-z]{2}$/.test(idioma) || !/^[0-9a-f]{8}\.mp3$/.test(arquivo)) return null;
  for (const raiz of raizes) {
    for (const pasta of ['audio-privado-v2', 'audio-privado']) {
      const arq = path.resolve(raiz, pasta, idioma, arquivo);
      if (fs.existsSync(arq)) return arq;
    }
  }
  return null;
}

/** Em produção, avisa no log se nenhuma origem tem áudio: sem ele toda sessão paga ficaria sem som. */
export function avisarSeSemAudioPrivado(env: NodeJS.ProcessEnv = process.env) {
  if (env.NODE_ENV !== 'production') return;
  // Com o R2 configurado, o áudio pago vem do bucket privado e o disco não precisa dele.
  if (r2Configurado(env)) return;
  const existe = raizesDoAudioPrivado(env).some((r) => fs.existsSync(path.join(r, 'audio-privado-v2')) || fs.existsSync(path.join(r, 'audio-privado')));
  if (!existe) console.error('[Linvuu] áudio pago ausente: configure o R2 (R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) ou defina AUDIO_REPO_TOKEN no build do Render (docs/infra/R2-AUDIO-PRIVADO.md)');
}
