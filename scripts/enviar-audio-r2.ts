// Envia o áudio pago (MP3 do repo privado Linvuu-Audio) para o bucket privado do R2.
//
// Uso:
//   node scripts/audio-privado.mjs        # primeiro, clona o repo privado para .audio-privado/
//   node --import tsx scripts/enviar-audio-r2.ts            # simulação (só lista, não envia)
//   node --import tsx scripts/enviar-audio-r2.ts --enviar   # envia o que falta
//   node --import tsx scripts/enviar-audio-r2.ts --enviar --dir /caminho/.audio-privado
//
// O esquema de chaves é o mesmo do disco (`audio-privado-v2/<idioma>/<hash>.mp3`, com
// `audio-privado/<idioma>/<hash>.mp3` como reserva), por isso a rota /api/audio não muda.
// Cada ficheiro é enviado com Content-MD5; se o objecto já existir no bucket com o mesmo
// MD5 (ETag), é saltado — o script pode ser corrido várias vezes e retoma onde ficou.
// Sem --enviar nada é enviado: só conta o que falta.
//
// Precisa de R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID e R2_SECRET_ACCESS_KEY no ambiente
// (nunca em chat nem no Git). O token precisa de Object Read + Object Write no bucket e
// de ListBucket (para a verificação inicial). Ver docs/infra/R2-AUDIO-PRIVADO.md.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { configR2, pedidoAssinadoS3, sha256Hex, type ConfigR2 } from '../server/audio-r2';

const args = process.argv.slice(2);
const enviar = args.includes('--enviar');
const dirArg = args.find((a) => a.startsWith('--dir='))?.slice('--dir='.length);
const origem = dirArg ?? process.env.AUDIO_PRIVADO_DIR ?? '.audio-privado';

const cfg: ConfigR2 | null = configR2();
if (!cfg) {
  console.error('enviar-audio-r2: faltam R2_ACCOUNT_ID, R2_ACCESS_KEY_ID ou R2_SECRET_ACCESS_KEY no ambiente.');
  process.exit(1);
}

const md5Hex = (b: Buffer): string => crypto.createHash('md5').update(b).digest('hex');
const md5B64 = (b: Buffer): string => crypto.createHash('md5').update(b).digest('base64');

async function verificarBucket(): Promise<void> {
  const { url, cabecalhos } = pedidoAssinadoS3(cfg!, 'GET', '', {
    corpoHash: sha256Hex(''),
    consulta: { 'list-type': '2', 'max-keys': '1' },
  });
  const r = await fetch(url, { headers: cabecalhos, signal: AbortSignal.timeout(15000) });
  if (r.status === 404) { console.error(`enviar-audio-r2: o bucket "${cfg!.bucket}" não existe na conta R2. Cria-o primeiro (docs/infra/R2-AUDIO-PRIVADO.md).`); process.exit(1); }
  if (r.status === 403) { console.error('enviar-audio-r2: o token não tem acesso ao bucket (falta Object Read/Write ou ListBucket).'); process.exit(1); }
  if (!r.ok) { console.error(`enviar-audio-r2: não foi possível verificar o bucket (HTTP ${r.status}).`); process.exit(1); }
  await r.body?.cancel();
}

function listarMp3(): { chave: string; caminho: string }[] {
  const ficheiros: { chave: string; caminho: string }[] = [];
  for (const variante of ['audio-privado-v2', 'audio-privado']) {
    const base = path.join(origem, variante);
    if (!fs.existsSync(base)) continue;
    for (const idioma of fs.readdirSync(base)) {
      if (!/^[a-z]{2}$/.test(idioma)) continue;
      const pasta = path.join(base, idioma);
      if (!fs.statSync(pasta).isDirectory()) continue;
      for (const nome of fs.readdirSync(pasta)) {
        if (!/^[0-9a-f]{8}\.mp3$/.test(nome)) continue;
        ficheiros.push({ chave: `${variante}/${idioma}/${nome}`, caminho: path.join(pasta, nome) });
      }
    }
  }
  return ficheiros;
}

async function etagDoObjeto(chave: string): Promise<string | null> {
  const { url, cabecalhos } = pedidoAssinadoS3(cfg!, 'HEAD', chave, { corpoHash: sha256Hex('') });
  const r = await fetch(url, { method: 'HEAD', headers: cabecalhos, signal: AbortSignal.timeout(15000) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`HEAD ${chave}: HTTP ${r.status}`);
  return (r.headers.get('etag') ?? '').replaceAll('"', '');
}

async function enviarObjeto(chave: string, corpo: Buffer): Promise<void> {
  const { url, cabecalhos } = pedidoAssinadoS3(cfg!, 'PUT', chave, {
    corpoHash: sha256Hex(corpo),
    cabecalhos: { 'content-type': 'audio/mpeg', 'content-md5': md5B64(corpo) },
  });
  const r = await fetch(url, {
    method: 'PUT',
    headers: { ...cabecalhos, 'Content-Length': String(corpo.length) },
    body: corpo as unknown as BodyInit,
    signal: AbortSignal.timeout(60000),
  });
  if (!r.ok) throw new Error(`PUT ${chave}: HTTP ${r.status}`);
  await r.body?.cancel();
}

const ficheiros = listarMp3();
if (!ficheiros.length) {
  console.error(`enviar-audio-r2: nenhum MP3 em ${origem}/audio-privado*/<idioma>/*.mp3. Corre primeiro "node scripts/audio-privado.mjs".`);
  process.exit(1);
}
console.log(`enviar-audio-r2: ${ficheiros.length} MP3 em ${origem}; bucket "${cfg.bucket}" (${enviar ? 'a enviar' : 'simulação — nada é enviado sem --enviar'}).`);
await verificarBucket();

let ja = 0, enviados = 0, falhas = 0;
for (let i = 0; i < ficheiros.length; i++) {
  const { chave, caminho } = ficheiros[i];
  try {
    const corpo = fs.readFileSync(caminho);
    const etag = await etagDoObjeto(chave);
    if (etag && etag === md5Hex(corpo)) { ja++; continue; }
    if (!enviar) continue;
    await enviarObjeto(chave, corpo);
    enviados++;
  } catch (e) {
    falhas++;
    console.error(`enviar-audio-r2: falha em ${chave}: ${(e as Error).message}`);
  }
  if ((i + 1) % 1000 === 0) console.log(`enviar-audio-r2: ${i + 1}/${ficheiros.length} verificados (${ja} já no bucket, ${enviados} enviados, ${falhas} falhas).`);
}
console.log(`enviar-audio-r2: fim — ${ficheiros.length} ficheiros, ${ja} já estavam no bucket, ${enviados} enviados, ${falhas} falhas${enviar ? '' : ' (simulação; corre com --enviar para enviar)'}.`);
if (falhas > 0) process.exit(1);
