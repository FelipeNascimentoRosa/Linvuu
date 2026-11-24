// Testa a assinatura SigV4 do R2 (server/audio-r2.ts) sem rede: a assinatura é recalculada
// no teste, de forma independente, a partir do pedido canónico da especificação AWS.
// Corre com: node --import tsx scripts/testar-audio-r2.ts
// (As credenciais abaixo são as do exemplo público da documentação da AWS — não são reais.)
import crypto from 'node:crypto';
import {
  chaveAudioR2, configR2, pedidoAssinadoS3, sha256Hex, urlDoAudioPrivadoR2, urlPreAssinadaR2,
  type ConfigR2,
} from '../server/audio-r2';

const t = (n: string, ok: boolean) => { console.log(ok ? 'ok   ' : 'FALHA', n); if (!ok) process.exitCode = 1; };
const AGORA = new Date('2026-11-24T12:00:00.000Z');
const CFG: ConfigR2 = {
  conta: '0123456789abcdef0123456789abcdef',
  bucket: 'linvuu-audio',
  chaveAcesso: 'AKIAIOSFODNN7EXAMPLE',
  chaveSecreta: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  expiracaoSegundos: 60,
};
const hmac = (chave: string | Buffer, dados: string): Buffer => crypto.createHmac('sha256', chave).update(dados, 'utf8').digest();
const chaveAssinatura = (segredo: string, data: string): Buffer => {
  const kData = hmac(`AWS4${segredo}`, data);
  return hmac(hmac(hmac(kData, 'auto'), 's3'), 'aws4_request');
};

// configR2
t('sem variáveis, desligado', configR2({}) === null);
t('sem segredo, desligado', configR2({ R2_ACCOUNT_ID: 'x', R2_ACCESS_KEY_ID: 'y' }) === null);
t('config completa', (() => { const c = configR2({ R2_ACCOUNT_ID: 'abc', R2_ACCESS_KEY_ID: 'k', R2_SECRET_ACCESS_KEY: 's' }); return c?.conta === 'abc' && c.bucket === 'linvuu-audio' && c.expiracaoSegundos === 60; })());
t('bucket e expiração por variável', (() => { const c = configR2({ R2_ACCOUNT_ID: 'abc', R2_BUCKET: 'outro', R2_ACCESS_KEY_ID: 'k', R2_SECRET_ACCESS_KEY: 's', R2_URL_EXPIRACAO_SEGUNDOS: '120' }); return c?.bucket === 'outro' && c.expiracaoSegundos === 120; })());

// chaves dos objectos
t('chave v2', chaveAudioR2('v2', 'ru', 'abcdef12.mp3') === 'audio-privado-v2/ru/abcdef12.mp3');
t('chave v1', chaveAudioR2('v1', 'en', 'abcdef12.mp3') === 'audio-privado/en/abcdef12.mp3');

// URL pré-assinada: estrutura + assinatura recalculada de forma independente
const url = new URL(urlPreAssinadaR2(CFG, 'audio-privado-v2/ru/abcdef12.mp3', 60, AGORA));
t('URL pré-assinada no host do R2', url.hostname === `${CFG.conta}.r2.cloudflarestorage.com`);
t('URL pré-assinada com o bucket e caminho do objecto', url.pathname === '/linvuu-audio/audio-privado-v2/ru/abcdef12.mp3');
t('parâmetros da assinatura', url.searchParams.get('X-Amz-Algorithm') === 'AWS4-HMAC-SHA256'
  && url.searchParams.get('X-Amz-Credential') === `${CFG.chaveAcesso}/20261124/auto/s3/aws4_request`
  && url.searchParams.get('X-Amz-Date') === '20261124T120000Z'
  && url.searchParams.get('X-Amz-Expires') === '60'
  && url.searchParams.get('X-Amz-SignedHeaders') === 'host');
t('assinatura com 64 hex', /^[0-9a-f]{64}$/.test(url.searchParams.get('X-Amz-Signature') ?? ''));
{
  const canonica = [...url.searchParams.entries()]
    .filter(([k]) => k !== 'X-Amz-Signature')
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
  const pedido = ['GET', '/linvuu-audio/audio-privado-v2/ru/abcdef12.mp3', canonica, `host:${CFG.conta}.r2.cloudflarestorage.com\n`, 'host', 'UNSIGNED-PAYLOAD'].join('\n');
  const esperada = hmac(chaveAssinatura(CFG.chaveSecreta, '20261124'), pedido).toString('hex');
  t('assinatura da URL pré-assinada confere', url.searchParams.get('X-Amz-Signature') === esperada);
}

// Pedido assinado por cabeçalho (HEAD): formato + assinatura recalculada
const { url: urlHead, cabecalhos } = pedidoAssinadoS3(CFG, 'HEAD', 'audio-privado-v2/ru/abcdef12.mp3', { corpoHash: sha256Hex(''), agora: AGORA });
t('HEAD na URL do objecto', urlHead === `https://${CFG.conta}.r2.cloudflarestorage.com/linvuu-audio/audio-privado-v2/ru/abcdef12.mp3`);
t('HEAD com X-Amz-Date', cabecalhos['X-Amz-Date'] === '20261124T120000Z');
{
  const auth = cabecalhos.Authorization ?? '';
  const assinatura = auth.match(/Signature=([0-9a-f]{64})$/)?.[1] ?? '';
  const pedido = ['HEAD', '/linvuu-audio/audio-privado-v2/ru/abcdef12.mp3', '', `host:${CFG.conta}.r2.cloudflarestorage.com\nx-amz-date:20261124T120000Z\n`, 'host;x-amz-date', sha256Hex('')].join('\n');
  const esperada = hmac(chaveAssinatura(CFG.chaveSecreta, '20261124'), pedido).toString('hex');
  t('assinatura do HEAD confere', assinatura === esperada && auth.includes('SignedHeaders=host;x-amz-date'));
}

// urlDoAudioPrivadoR2 com fetch simulado
const fetchFalso = (estado: Record<string, number>) => (async (u: string | URL, opts?: { method?: string }) => {
  const chave = String(u).split('.com/linvuu-audio/')[1]?.split('?')[0] ?? '';
  const status = estado[chave] ?? 404;
  return { status, ok: status >= 200 && status < 300 } as Response;
}) as unknown as typeof fetch;
const v2existe = { 'audio-privado-v2/ru/abcdef12.mp3': 200 };
const soV1 = { 'audio-privado/ru/abcdef12.mp3': 200 };
const nada = {};
t('R2: voz nova primeiro', (await urlDoAudioPrivadoR2('ru', 'abcdef12.mp3', CFG, fetchFalso(v2existe)))?.includes('/audio-privado-v2/ru/abcdef12.mp3') ?? false);
t('R2: cai para a voz antiga', (await urlDoAudioPrivadoR2('ru', 'abcdef12.mp3', CFG, fetchFalso(soV1)))?.includes('/audio-privado/ru/abcdef12.mp3') ?? false);
t('R2: sem ficheiro, null', (await urlDoAudioPrivadoR2('ru', 'abcdef12.mp3', CFG, fetchFalso(nada))) === null);
t('R2: sem configuração, null', (await urlDoAudioPrivadoR2('ru', 'abcdef12.mp3', null, fetchFalso(v2existe))) === null);
t('R2: parâmetros inválidos, null', (await urlDoAudioPrivadoR2('ru', 'nao-mp3.txt', CFG, fetchFalso(v2existe))) === null);
{
  let lancou = false;
  try { await urlDoAudioPrivadoR2('ru', 'abcdef12.mp3', CFG, fetchFalso({ 'audio-privado-v2/ru/abcdef12.mp3': 500 })); } catch { lancou = true; }
  t('R2: erro do bucket lança (a rota responde 500)', lancou);
}
