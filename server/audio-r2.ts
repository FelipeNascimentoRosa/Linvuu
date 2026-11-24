// Áudio pago no Cloudflare R2 (bucket PRIVADO).
//
// O MP3 pago nunca entra no pacote da função (232 MB > limite de 250 MB) nem é servido
// estaticamente. A função verifica o acesso como sempre (login + assinatura ativa) e
// responde 302 para uma URL pré-assinada (expira em ~60 s); o leitor segue o redirect e
// os pedidos Range continuam a funcionar contra o R2. O contrato da URL
// (`/api/audio/:idioma/:hash.mp3`) não muda, por isso a web e o APK não mudam.
//
// Sem dependência extra: a assinatura SigV4 (S3-compatible) é feita com node:crypto.
// O R2 usa a região `auto` na assinatura.
//
// Configuração (ver docs/infra/R2-AUDIO-PRIVADO.md e docs/infra/VERCEL-VARIAVEIS.md):
//   R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
//   R2_URL_EXPIRACAO_SEGUNDOS (opcional, omissão 60)
// O R2 ainda NÃO está activado na conta Cloudflare do Linvuu (docs/infra/PILOTO-R2-20261019.md):
// sem a activação, este módulo fica desligado (`r2Configurado()` = false) e o áudio
// continua a sair do disco (Render / desenvolvimento local).
import crypto from 'node:crypto';

export type ConfigR2 = {
  conta: string;
  bucket: string;
  chaveAcesso: string;
  chaveSecreta: string;
  expiracaoSegundos: number;
};

export function configR2(env: NodeJS.ProcessEnv = process.env): ConfigR2 | null {
  const conta = (env.R2_ACCOUNT_ID ?? '').trim();
  const bucket = (env.R2_BUCKET ?? '').trim() || 'linvuu-audio';
  const chaveAcesso = (env.R2_ACCESS_KEY_ID ?? '').trim();
  const chaveSecreta = (env.R2_SECRET_ACCESS_KEY ?? '').trim();
  if (!conta || !chaveAcesso || !chaveSecreta) return null;
  const expiracao = Number(env.R2_URL_EXPIRACAO_SEGUNDOS ?? 60);
  return { conta, bucket, chaveAcesso, chaveSecreta, expiracaoSegundos: Number.isFinite(expiracao) && expiracao > 0 ? Math.floor(expiracao) : 60 };
}

export const r2Configurado = (env: NodeJS.ProcessEnv = process.env): boolean => configR2(env) !== null;

/** Origem pública do R2 (só para a CSP: o ficheiro em si nunca é público). */
export function hostR2(conta: string): string {
  return `https://${conta}.r2.cloudflarestorage.com`;
}

/** Chave do objecto no bucket, com o mesmo esquema do disco: voz nova primeiro, antiga como reserva. */
export const chaveAudioR2 = (variante: 'v2' | 'v1', idioma: string, arquivo: string): string =>
  `${variante === 'v2' ? 'audio-privado-v2' : 'audio-privado'}/${idioma}/${arquivo}`;

const codificar = (s: string): string => encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
const hmac = (chave: string | Buffer, dados: string): Buffer => crypto.createHmac('sha256', chave).update(dados, 'utf8').digest();
/** SHA-256 em hexadecimal (exportado para o upload: o hash do corpo entra na assinatura). */
export const sha256Hex = (dados: string | Buffer): string => crypto.createHash('sha256').update(dados).digest('hex');

function dataAmz(agora: Date): { carimbo: string; data: string } {
  const p = (n: number): string => String(n).padStart(2, '0');
  const data = `${agora.getUTCFullYear()}${p(agora.getUTCMonth() + 1)}${p(agora.getUTCDate())}`;
  return { data, carimbo: `${data}T${p(agora.getUTCHours())}${p(agora.getUTCMinutes())}${p(agora.getUTCSeconds())}Z` };
}

function chaveAssinatura(segredo: string, data: string): Buffer {
  const kData = hmac(`AWS4${segredo}`, data);
  const kRegiao = hmac(kData, 'auto');
  const kServico = hmac(kRegiao, 's3');
  return hmac(kServico, 'aws4_request');
}

function uriDoObjeto(bucket: string, chave: string): string {
  return `/${codificar(bucket)}/${chave.split('/').map(codificar).join('/')}`;
}

/**
 * URL pré-assinada (GET) para um objecto do bucket. Só quem recebe esta URL a consegue
 * abrir, e só durante `expiracaoSegundos`. Pura (o `agora` é injectável nos testes).
 */
export function urlPreAssinadaR2(cfg: ConfigR2, chave: string, expiracaoSegundos: number = cfg.expiracaoSegundos, agora: Date = new Date()): string {
  const host = hostR2(cfg.conta);
  const nomeHost = `${cfg.conta}.r2.cloudflarestorage.com`;
  const { data, carimbo } = dataAmz(agora);
  const ambito = `${data}/auto/s3/aws4_request`;
  const uri = uriDoObjeto(cfg.bucket, chave);
  const consulta: Record<string, string> = {
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': `${cfg.chaveAcesso}/${ambito}`,
    'X-Amz-Date': carimbo,
    'X-Amz-Expires': String(expiracaoSegundos),
    'X-Amz-SignedHeaders': 'host',
  };
  const canonica = Object.keys(consulta).sort().map((k) => `${codificar(k)}=${codificar(consulta[k])}`).join('&');
  const pedidoCanonico = ['GET', uri, canonica, `host:${nomeHost}\n`, 'host', 'UNSIGNED-PAYLOAD'].join('\n');
  const assinatura = hmac(chaveAssinatura(cfg.chaveSecreta, data), pedidoCanonico).toString('hex');
  return `${host}${uri}?${canonica}&X-Amz-Signature=${assinatura}`;
}

/**
 * Pedido S3 assinado por cabeçalho (HEAD, PUT, GET, ...). Devolve a URL e os cabeçalhos
 * (Authorization + X-Amz-Date + os extras, já incluídos na assinatura).
 * Puro, excepto o `agora` opcional. Usado pelo HEAD de existência, pelo upload e pela
 * verificação do bucket (GET / com `list-type=2`).
 */
export function pedidoAssinadoS3(
  cfg: ConfigR2,
  metodo: string,
  chave: string,
  opts: { corpoHash: string; cabecalhos?: Record<string, string>; consulta?: Record<string, string>; agora?: Date },
): { url: string; cabecalhos: Record<string, string> } {
  const host = hostR2(cfg.conta);
  const nomeHost = `${cfg.conta}.r2.cloudflarestorage.com`;
  const { data, carimbo } = dataAmz(opts.agora ?? new Date());
  const ambito = `${data}/auto/s3/aws4_request`;
  const uri = uriDoObjeto(cfg.bucket, chave);
  const consulta = Object.keys(opts.consulta ?? {}).sort().map((k) => `${codificar(k)}=${codificar(opts.consulta![k])}`).join('&');
  const extras = Object.fromEntries(
    Object.entries(opts.cabecalhos ?? {}).map(([k, v]) => [k.toLowerCase(), v.trim()]),
  );
  const cabecalhosCanonicos: Record<string, string> = { host: nomeHost, 'x-amz-date': carimbo, ...extras };
  const assinados = Object.keys(cabecalhosCanonicos).sort();
  const canonicoCabecalhos = assinados.map((k) => `${k}:${cabecalhosCanonicos[k]}\n`).join('');
  const pedidoCanonico = [metodo, uri, consulta, canonicoCabecalhos, assinados.join(';'), opts.corpoHash].join('\n');
  const assinatura = hmac(chaveAssinatura(cfg.chaveSecreta, data), pedidoCanonico).toString('hex');
  return {
    url: `${host}${uri}${consulta ? `?${consulta}` : ''}`,
    cabecalhos: {
      Authorization: `AWS4-HMAC-SHA256 Credential=${cfg.chaveAcesso}/${ambito}, SignedHeaders=${assinados.join(';')}, Signature=${assinatura}`,
      'X-Amz-Date': carimbo,
      ...opts.cabecalhos,
    },
  };
}

/** O objecto existe no bucket? 404 = não; outro erro lança (a rota responde 500). */
export async function existeNoR2(cfg: ConfigR2, chave: string, f: typeof fetch = fetch): Promise<boolean> {
  const { url, cabecalhos } = pedidoAssinadoS3(cfg, 'HEAD', chave, { corpoHash: sha256Hex('') });
  const r = await f(url, { method: 'HEAD', headers: cabecalhos, signal: AbortSignal.timeout(8000) });
  if (r.status === 404) return false;
  if (!r.ok) throw new Error(`r2 head ${r.status}`);
  return true;
}

/**
 * URL pré-assinada do MP3 pago (voz nova primeiro, antiga como reserva), ou null se o
 * ficheiro não existir no bucket. Lança se o R2 falhar (a rota responde 500, nunca
 * serve outro ficheiro por engano).
 */
export async function urlDoAudioPrivadoR2(
  idioma: string,
  arquivo: string,
  cfg: ConfigR2 | null = configR2(),
  f: typeof fetch = fetch,
): Promise<string | null> {
  if (!cfg) return null;
  if (!/^[a-z]{2}$/.test(idioma) || !/^[0-9a-f]{8}\.mp3$/.test(arquivo)) return null;
  for (const variante of ['v2', 'v1'] as const) {
    const chave = chaveAudioR2(variante, idioma, arquivo);
    if (await existeNoR2(cfg, chave, f)) return urlPreAssinadaR2(cfg, chave);
  }
  return null;
}
