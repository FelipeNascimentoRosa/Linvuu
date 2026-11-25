import assert from 'node:assert/strict';
import express from 'express';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { criarRotaAudio } from '../server/audio-rota';

let consultasR2 = 0, consultasDisco = 0;
const bytes = Buffer.from('0123456789');
const origem = createServer((req, res) => {
  if (req.headers.range === 'bytes=2-5') {
    res.writeHead(206, { 'Content-Type': 'audio/mpeg', 'Content-Range': 'bytes 2-5/10', 'Accept-Ranges': 'bytes' });
    res.end(bytes.subarray(2, 6));
  } else { res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Accept-Ranges': 'bytes' }); res.end(bytes); }
});
origem.listen(0, '127.0.0.1'); await once(origem, 'listening');
const origemPorta = (origem.address() as { port: number }).port;
const app = express();
app.get('/api/audio/:idioma/:arquivo', criarRotaAudio({
  acessoLivreLocal: () => false,
  autorizar: async (req, res) => {
    if (!req.get('authorization')) { res.status(401).end(); return false; }
    if (req.get('authorization') !== 'Bearer assinatura-ativa-teste') { res.status(403).end(); return false; }
    return true;
  },
  r2Configurado: () => true,
  buscarR2: async (_idioma, arquivo) => { consultasR2++; return arquivo === '12345678.mp3' ? `http://127.0.0.1:${origemPorta}/audio` : null; },
  buscarDisco: () => { consultasDisco++; return null; },
}));
const servidor = app.listen(0, '127.0.0.1'); await once(servidor, 'listening');
const porta = (servidor.address() as { port: number }).port;
const base = `http://127.0.0.1:${porta}/api/audio/ru/`;
try {
  for (const arquivo of ['12345678.mp3', 'ffffffff.mp3']) assert.equal((await fetch(base + arquivo)).status, 401);
  assert.equal((await fetch(base + '12345678.mp3', { headers: { Authorization: 'Bearer assinatura-inativa-teste' } })).status, 403);
  assert.equal(consultasR2, 0, 'visitante e não assinante não consultam R2');
  assert.equal(consultasDisco, 0, 'visitante e não assinante não consultam disco');
  const auth = { Authorization: 'Bearer assinatura-ativa-teste' };
  const faltante = await fetch(base + 'ffffffff.mp3', { headers: auth }); assert.equal(faltante.status, 404);
  const redirecao = await fetch(base + '12345678.mp3', { headers: auth, redirect: 'manual' });
  assert.equal(redirecao.status, 302); assert.equal(redirecao.headers.get('cache-control'), 'private, no-store');
  const faixa = await fetch(base + '12345678.mp3', { headers: { ...auth, Range: 'bytes=2-5' } });
  assert.equal(faixa.status, 206); assert.match(faixa.headers.get('content-type') ?? '', /^audio\/mpeg/);
  assert.equal(await faixa.text(), '2345');
  assert.equal(consultasR2, 3, 'somente assinante consultou armazenamento');
  console.log('Áudio: 401/403 antes do R2, 404 autorizado, 302 privado e Range 206 verificados.');
} finally { servidor.close(); origem.close(); }
