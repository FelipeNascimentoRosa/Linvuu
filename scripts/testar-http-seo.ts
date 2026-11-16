import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { carregarDadosMeta, metaDaRota } from '../src/lib/metaRota.ts';
import { LOCALES_POR_PERFIL, caminhoEm, comPerfil, urlAbsolutaEm, type Perfil } from '../src/i18n/locales.ts';

const HOST: Record<Perfil, string> = { br: 'linvuu.com.br', global: 'linvuu.com' };

// Servidor local sem credenciais de produção. Somente GET de páginas, nunca pagamento ou gravação.
const port = '3937';
const origin = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], {
  env: { ...process.env, NODE_ENV: 'production', PORT: port }, stdio: ['ignore', 'ignore', 'pipe'],
});
let log = '';
child.stderr.on('data', b => { log = (log + String(b)).slice(-2000); });
const d = carregarDadosMeta(process.cwd());
assert.ok(d);
let verificados = 0, redirecionados = 0;
try {
  let pronto = false;
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(origin + '/healthz')).ok) { pronto = true; break; } } catch { /* servidor iniciando */ }
    await new Promise(r => setTimeout(r, 100));
  }
  assert.ok(pronto, log);
  // Cada idioma é verificado no domínio onde mora, com o Host real (o servidor decide o perfil pelo Host).
  const alvos: { host: string; p: string; perfil: Perfil; codigo: string }[] = [];
  for (const [perfil, loc] of LOCALES_POR_PERFIL) comPerfil(perfil, () => {
    const cam = (r: string) => alvos.push({ host: HOST[perfil], p: caminhoEm(loc.codigo, r), perfil, codigo: loc.codigo });
    for (const c of d.cursos) {
      cam(`/curso/${c.id}`);
      for (let n = 1; n <= d.indice[c.id].total; n++) cam(`/curso/${c.id}/dia/${n}`);
      cam(`/curso/${c.id}/dia/0`); cam(`/curso/${c.id}/dia/${d.indice[c.id].total + 1}`);
    }
    for (const r of ['/', '/cursos', '/assinatura', '/entrar', '/cadastro', '/livros', '/sobre', '/contato', '/ex-alunos-udemy', '/privacidade', '/termos', '/livro/gramatica-ru', '/materiais-gratuitos', '/materiais-gratuitos/alfabeto-russo', '/materiais-gratuitos/alfabeto-alemao', '/materiais-gratuitos/alfabeto-frances', '/materiais-gratuitos/alfabeto-italiano', '/materiais-gratuitos/alfabeto-espanhol', '/materiais-gratuitos/alfabeto-klingon', '/nao-existe-auditoria']) cam(r);
    for (const [id, book] of Object.entries(d.livros)) {
      cam(`/livros/${id}`);
      for (const n of Object.keys(book.caps)) cam(`/livros/${id}/capitulo/${n}`);
    }
  });
  // fetch() ignora o cabeçalho Host; http.request o envia de verdade (é ele que escolhe o domínio no servidor).
  const get = (host: string, p: string) => new Promise<{ status: number; headers: { get: (k: string) => string | null }; text: () => Promise<string>; arrayBuffer: () => Promise<void> }>((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: Number(port), path: p, headers: { host } }, (res) => {
      const partes: Buffer[] = [];
      res.on('data', (b) => partes.push(b));
      res.on('end', () => resolve({ status: res.statusCode ?? 0, headers: { get: (k) => { const v = res.headers[k.toLowerCase()]; return Array.isArray(v) ? v.join(', ') : v ?? null; } }, text: async () => Buffer.concat(partes).toString('utf8'), arrayBuffer: async () => undefined }));
    }).on('error', reject);
  });
  let cursor = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (cursor < alvos.length) {
      const { host, p, perfil, codigo } = alvos[cursor++];
      const r = await get(host, p);
      if (perfil === 'br' && /^\/(?:curso\/br|portugues|gramatica\/br)(?:\/|$)/.test(p)) {
        // no .com.br o português para estrangeiros (explicado em inglês) não existe: vai para o .com
        // (/portugues vai direto a /curso/br desde 13/11/2026, num salto só)
        assert.equal(r.status, 301, p);
        assert.equal(r.headers.get('location'), 'https://linvuu.com' + (p.replace(/\/$/, '') === '/portugues' ? '/curso/br' : p), p);
        await r.arrayBuffer();
        redirecionados++;
      } else if (perfil === 'global' && /^\/portugues\/?$/.test(p)) {
        assert.equal(r.status, 301, `${host}${p}`);
        assert.equal(r.headers.get('location'), 'https://linvuu.com/curso/br', `${host}${p}`);
        await r.arrayBuffer();
        redirecionados++;
      } else if (perfil === 'global' && /^\/(?:livros|ex-alunos-udemy|livro\/gramatica-ru|materiais-gratuitos)(?:\/|$)/.test(p)) {
        // no .com a coleção de livros de gramática e a página de ex-alunos da Udemy (só em português) não existem: vão para o .com.br.
        // É o espelho da regra acima e o que scripts/seo.mjs já declara ({ p: '/livros', em: ['pt-BR'] }).
        assert.equal(r.status, 301, `${host}${p}`);
        assert.equal(r.headers.get('location'), 'https://linvuu.com.br' + p, `${host}${p}`);
        await r.arrayBuffer();
        redirecionados++;
      } else {
        const m = comPerfil(perfil, () => metaDaRota(p, d));
        assert.equal(r.status, m.status, `${host}${p}`);
        assert.ok(r.headers.get('content-type')?.includes('text/html'), p);
        const body = await r.text();
        assert.equal(body.includes('name="robots" content="noindex"'), !!m.semIndice, `${host}${p} semIndice=${m.semIndice} status=${r.status}`);
        assert.ok(body.includes(`rel="canonical" href="${urlAbsolutaEm(m.locale!.codigo, m.caminho)}"`), `${host}${p}`);
        assert.equal(m.locale!.codigo, codigo, `${host}${p}: o idioma vem do endereço`);
        // no .com não sobra nenhum link para a estrutura antiga /en
        if (perfil === 'global') assert.ok(!/rel="canonical" href="https:\/\/linvuu\.com\/en(\/|")/.test(body), `${host}${p}`);
      }
      verificados++;
    }
  }));
  // Estrutura antiga e variantes de host: redirecionamento permanente e sem cadeia
  const regras: [string, string, string][] = [
    ['linvuu.com.br', '/en', 'https://linvuu.com/'], ['linvuu.com.br', '/en/curso/ru', 'https://linvuu.com/curso/ru'], ['linvuu.com.br', '/es/cursos', 'https://linvuu.com/cursos'],
    ['linvuu.com.br', '/es', 'https://linvuu.com/'], ['linvuu.com.br', '/portugues', 'https://linvuu.com/curso/br'], ['linvuu.com.br', '/gramatica/br', 'https://linvuu.com/gramatica/br'], ['linvuu.com', '/es/cursos', 'https://linvuu.com/cursos'], ['linvuu.com', '/en', 'https://linvuu.com/'], ['linvuu.com', '/en/cursos', 'https://linvuu.com/cursos'],
    ['www.linvuu.com', '/curso/ru', 'https://linvuu.com/curso/ru'], ['www.linvuu.com.br', '/cursos', 'https://linvuu.com.br/cursos'],
  ];
  for (const [host, p, destino] of regras) {
    const r = await get(host, p);
    assert.equal(r.status, 301, `${host}${p}`);
    assert.equal(r.headers.get('location'), destino, `${host}${p}`);
    await r.arrayBuffer(); redirecionados++;
  }
  // Os sitemaps publicos sao exclusivos e as URL antigas redirecionam sem misturar os domínios.
  for (const host of ['linvuu.com', 'linvuu.com.br']) {
    const nome = host === 'linvuu.com' ? 'sitemap-internacional.xml' : 'sitemap-brasil.xml';
    const outro = host === 'linvuu.com' ? 'sitemap-brasil.xml' : 'sitemap-internacional.xml';
    const r = await get(host, `/${nome}`);
    assert.equal(r.status, 200, `${host}/${nome}`);
    assert.match(r.headers.get('content-type') ?? '', /application\/xml/);
    const sm = await r.text();
    const locs = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((x) => new URL(x[1]).hostname);
    assert.ok(locs.length >= 10, `${host}: sitemap com ${locs.length} URLs`);
    assert.ok(locs.every((h) => h === host), `${host}: sitemap so com URLs do proprio dominio`);
    assert.ok(!sm.includes('xhtml:link'), `${host}: XML sem referencias cruzadas`);
    assert.equal((await get(host, `/${outro}`)).status, 404, `${host}: mapa do outro dominio bloqueado`);
    assert.equal((await get(host, '/sitemap-global.xml')).status, 404, `${host}: sitemap auxiliar interno bloqueado`);
    const legado = await get(host, '/sitemap.xml');
    assert.equal(legado.status, 200, `${host}: endereco historico continua disponivel`);
    assert.match(legado.headers.get('content-type') ?? '', /application\/xml/);
    assert.equal(await legado.text(), sm, `${host}: sitemap historico e exclusivo identicos`);
    const rb = await (await get(host, '/robots.txt')).text();
    assert.ok(rb.includes(`Sitemap: https://${host}/${nome}`), `${host}: robots aponta para o mapa correto`);
  }
  // llms.txt: cada domínio entrega o seu e só lista URLs do próprio domínio
  for (const [host, outro] of [['linvuu.com', 'linvuu.com.br'], ['linvuu.com.br', 'linvuu.com']]) {
    const r = await get(host, '/llms.txt');
    assert.equal(r.status, 200, `${host}/llms.txt`);
    const t = await r.text();
    assert.ok(t.includes(`https://${host}/`), `${host}: llms.txt cita o próprio domínio`);
    const proprias = [...t.matchAll(/https:\/\/(linvuu\.com(?:\.br)?)\//g)].filter((x) => x[1] === host).length;
    assert.ok(proprias >= 5, `${host}: llms.txt com links próprios`);
    // Desde 13/11/2026 o llms.txt é gerado das mesmas listas do sitemap: o .com lista espanhol e alemão (completos em inglês)
    // e não lista o italiano (0 de 248 explicadas em inglês). Links em Markdown, como pede a regra llms-txt do Lighthouse.
    if (host === 'linvuu.com') { assert.ok(!/\/curso\/it\b/.test(t), 'linvuu.com/llms.txt não lista o italiano'); assert.ok(/\/curso\/es\b/.test(t) && /\/curso\/de\b/.test(t), 'linvuu.com/llms.txt lista espanhol e alemão'); }
    assert.ok(/\[[^\]]+\]\(https:\/\/[^)]+\)/.test(t), `${host}: llms.txt com links em Markdown`);
  }
  for (const [p, target] of [['/brazilian-portuguese', 'https://linvuu.com/curso/br'], ['/preco', '/assinatura'], ['/metodo', '/#metodo']]) {
    const r = await get('linvuu.com.br', p);
    assert.equal(r.status, 301, p);
    assert.equal(r.headers.get('location'), target, p);
    await r.arrayBuffer();
  }
  console.log(JSON.stringify({ paginasHttp: verificados, redirecionados, aliases: 3, resultado: 'conforme' }));
} finally {
  child.kill();
}
