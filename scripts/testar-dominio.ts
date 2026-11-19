// Sem credenciais e sem rede: testa a regra pura de domínio e o middleware real que a aplica.
// node --import tsx scripts/testar-dominio.ts
import assert from 'node:assert/strict';
import express from 'express';
import { redirecionamentoDeDominio, registrarDominio } from '../server/dominio.ts';
import { SITE_URL, SITE_GLOBAL_URL } from '../src/config/site.ts';

const BR = 'linvuu.com.br';
const GLOBAL = 'linvuu.com';
const url = (base: string, caminho: string) => `${base}${caminho}`;

// 1. Regra pura: um endereço, um domínio. null significa "segue para a página".
const casos: [string, string, string, string, string | null][] = [
  // [descrição, host, caminho, consulta, esperado]
  ['www do .com volta para a raiz do .com', `www.${GLOBAL}`, '/cursos', '', url(SITE_GLOBAL_URL, '/cursos')],
  ['www do .com.br volta para a raiz do .com.br', `www.${BR}`, '/assinatura', 'x=1', url(SITE_URL, '/assinatura') + '?x=1'],
  ['/en/livros no .com.br vai direto à coleção em inglês (.com), sem salto duplo', BR, '/en/livros', '', url(SITE_GLOBAL_URL, '/livros')],
  ['/es/ retirado em 06/11 vai para o inglês', BR, '/es/assinatura', '', url(SITE_GLOBAL_URL, '/assinatura')],
  ['/portugues no .com.br vai direto ao curso de português no .com (13/11/2026)', BR, '/portugues', '', url(SITE_GLOBAL_URL, '/curso/br')],
  ['/portugues no .com vira /curso/br (13/11/2026: as duas disputavam a mesma busca)', GLOBAL, '/portugues', '', url(SITE_GLOBAL_URL, '/curso/br')],
  ['/livro/gramatica-ru no .com vai para o .com.br (página só em português)', GLOBAL, '/livro/gramatica-ru', '', url(SITE_URL, '/livro/gramatica-ru')],
  ['/gramatica/br no .com.br mora no .com', BR, '/gramatica/br', '', url(SITE_GLOBAL_URL, '/gramatica/br')],
  ['/en/ antigo no .com perde o prefixo', GLOBAL, '/en/cursos', '', url(SITE_GLOBAL_URL, '/cursos')],
  ['/ex-alunos-udemy no .com vai para o .com.br (página só em português)', GLOBAL, '/ex-alunos-udemy', '', url(SITE_URL, '/ex-alunos-udemy')],
  ['/curso/en no .com vai para o .com.br (curso de inglês é explicado em português)', GLOBAL, '/curso/en', '', url(SITE_URL, '/curso/en')],
  ['/curso/en/dia/1 no .com vai para o .com.br', GLOBAL, '/curso/en/dia/1', '', url(SITE_URL, '/curso/en/dia/1')],
  ['/gramatica/en no .com vai para o .com.br', GLOBAL, '/gramatica/en', '', url(SITE_URL, '/gramatica/en')],
  ['/curso/en no .com.br segue (200)', BR, '/curso/en', '', null],
  ['/es/ no .com perde o prefixo', GLOBAL, '/es/cursos', '', url(SITE_GLOBAL_URL, '/cursos')],
  ['/es/livros no .com.br vai direto à coleção em inglês, num salto só', BR, '/es/livros', '', url(SITE_GLOBAL_URL, '/livros')],
  ['/en/livros no .com vai direto ao .com.br', GLOBAL, '/en/livros/ru', '', url(SITE_URL, '/livros/ru')],
  ['/es/portugues no .com.br não volta ao .br', BR, '/es/portugues', '', url(SITE_GLOBAL_URL, '/curso/br')],
  // 19/11/2026 (Felipe): o .com espelha o .com.br e tem a própria coleção /livros, em inglês (só o livro br).
  ['/livros no .com é a coleção em inglês', GLOBAL, '/livros', '', null],
  ['/livros/br no .com é o livro de português para quem fala inglês', GLOBAL, '/livros/br/capitulo/1', '', null],
  ['livro em português pedido no .com vai para o .com.br', GLOBAL, '/livros/ru/capitulo/1', '', url(SITE_URL, '/livros/ru/capitulo/1')],
  ['a consulta é preservada no redirecionamento de um livro em português', GLOBAL, '/livros/de', 'utm_source=x', url(SITE_URL, '/livros/de') + '?utm_source=x'],
  ['/livros/br no .com.br vai para o .com', BR, '/livros/br', '', url(SITE_GLOBAL_URL, '/livros/br')],
  // Controles: nada do que já funcionava pode passar a redirecionar.
  ['/livros no .com.br é a página normal', BR, '/livros', '', null],
  // Materiais gratuitos (alfabeto russo): escritos em português, moram no .com.br.
  ['/materiais-gratuitos no .com é o hub em inglês', GLOBAL, '/materiais-gratuitos', '', null],
  ['um guia dos materiais gratuitos no .com acompanha o redirecionamento', GLOBAL, '/materiais-gratuitos/alfabeto-russo', 'utm_source=x', url(SITE_URL, '/materiais-gratuitos/alfabeto-russo') + '?utm_source=x'],
  ['/materiais-gratuitos no .com.br é a página normal', BR, '/materiais-gratuitos/alfabeto-russo', '', null],
  ['/livro (sem s) não é a coleção', GLOBAL, '/livro', '', null],
  ['/curso/br segue no .com (explicação em inglês)', GLOBAL, '/curso/br', '', null],
  ['/curso/br no .com.br é tratado na rota, não aqui', BR, '/curso/br', '', null],
  ['/sobre não redireciona: agora tem página em inglês indexável (09/11/2026)', GLOBAL, '/sobre', '', null],
  ['a raiz do .com não redireciona', GLOBAL, '/', '', null],
  ['a raiz do .com.br não redireciona', BR, '/', '', null],
  ['host desconhecido segue o perfil brasileiro', 'localhost', '/livros', '', null],
];
for (const [descricao, host, caminho, consulta, esperado] of casos) {
  assert.equal(redirecionamentoDeDominio(host, caminho, consulta), esperado, descricao);
}
const redirecionam = casos.filter((c) => c[4] !== null).length;
console.log(`regra de domínio: ${casos.length} casos (${redirecionam} redirecionam, ${casos.length - redirecionam} seguem)`);

// 2. Middleware real: prova o 301, o cabeçalho Location e o que não pode ser redirecionado.
const app = express();
// `Host` não é um cabeçalho que o fetch do Node envie de forma confiável; um cabeçalho próprio escolhe o domínio do teste.
app.use((req, _res, next) => { req.headers.host = req.get('x-host-teste') || ''; next(); });
registrarDominio(app);
app.all('/{*resto}', (_req, res) => { res.status(200).send('ok'); });
const server = app.listen(0, '127.0.0.1');
await new Promise<void>((resolve) => server.once('listening', resolve));
const address = server.address();
assert(address && typeof address !== 'string');
try {
  const pedir = (metodo: string, caminho: string, host: string) =>
    fetch(`http://127.0.0.1:${address.port}${caminho}`, { method: metodo, headers: { 'x-host-teste': host }, redirect: 'manual' });
  const conferir = async (metodo: string, caminho: string, host: string, status: number, local?: string) => {
    const r = await pedir(metodo, caminho, host);
    await r.arrayBuffer();
    assert.equal(r.status, status, `${metodo} ${caminho} (${host})`);
    if (local !== undefined) assert.equal(r.headers.get('location'), local, `${metodo} ${caminho} (${host})`);
  };
  await conferir('GET', '/livros/ru', GLOBAL, 301, url(SITE_URL, '/livros/ru'));
  await conferir('GET', '/livros/ru?utm_source=x', GLOBAL, 301, url(SITE_URL, '/livros/ru') + '?utm_source=x');
  await conferir('HEAD', '/livros/ru', GLOBAL, 301, url(SITE_URL, '/livros/ru'));
  await conferir('GET', '/livros', GLOBAL, 200);
  await conferir('GET', '/cursos', GLOBAL, 200);
  await conferir('GET', '/sobre', GLOBAL, 200);
  await conferir('GET', '/livros', BR, 200);
  // POST não é endereço de página: o middleware só trata GET e HEAD.
  await conferir('POST', '/livros/ru', GLOBAL, 200);
  // A API nunca é redirecionada por causa do domínio.
  await conferir('GET', '/api/livros', GLOBAL, 200);
} finally {
  await new Promise<void>((resolve, reject) => server.close(e => e ? reject(e) : resolve()));
}
console.log('HTTP real: livros em português no .com respondem 301 para o .com.br; /livros do .com é 200; .com.br, /sobre, POST e /api seguem intactos');
