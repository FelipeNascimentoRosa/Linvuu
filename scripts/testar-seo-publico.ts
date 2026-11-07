import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Traco } from '../src/components/Traco.tsx';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { aplicarMeta, carregarDadosMeta, metaDaRota } from '../src/lib/metaRota.ts';
import { HOME_BR } from '../src/config/oferta-publica.ts';
// Vitrine de planos não lançados (removida do código em 05/11/2026): o texto não pode voltar ao HTML.
const PLANOS_AVISO = 'Novos planos em preparação';
import { CAPITULOS_GRATIS } from '../src/lib/livros.ts';
import { LIVROS } from '../src/config/livros.ts';
const raiz = process.cwd();
const dados = carregarDadosMeta(raiz);
assert.ok(dados);
const base = fs.readFileSync('index.html', 'utf8');
const html = (url: string) => aplicarMeta(base, metaDaRota(url, dados), 'https://linvuu.com.br', dados);
const home = html('/');
assert.ok(home.includes(`<h1>${HOME_BR.titulo}</h1>`));
assert.ok(home.includes(HOME_BR.descricao));
for (const rota of ['/curso/de', '/curso/ru', '/livros/de', '/livros/es']) assert.ok(home.includes(`href="${rota}"`), `link público ${rota}`);
assert.ok(home.includes('Conheça o Vuu'));
assert.ok(home.includes('Estamos produzindo livros para os níveis B1–B2. Eles ainda não estão disponíveis.'));
assert.ok(html('/livros').includes('Estamos produzindo livros para os níveis B1–B2. Eles ainda não estão disponíveis.'));
assert.ok(!home.includes(PLANOS_AVISO), 'a home apresenta a oferta ativa, sem planos não lançados');
assert.ok(home.includes('R$ 139') && home.includes('R$ 291,90') && home.includes('R$ 999'));
assert.ok(home.includes('Experimentar duas aulas grátis'));
assert.ok(!home.includes('R$ 500'));
assert.ok(!home.includes('Escolha o idioma</strong>'));
assert.ok(html('/cursos').includes('<h1>Cursos</h1>'));
// Aulas ao vivo de russo: pt e en indexáveis; sem preço ou horário inventado.
const rpt = html('/russo-online'), ren = html('/en/russo-online');
assert.ok(rpt.includes('<h1>Aulas de russo online com professores</h1>') && rpt.includes('Olimpíada') && rpt.includes('O que alunos dizem') && !/Valeeva|Instituto|IVR/.test(rpt + html('/en/russo-online')) && !html('/en/russo-online').includes('O que alunos dizem'));
assert.ok(ren.includes('<h1>Online Russian lessons with teachers</h1>') && ren.includes('"@type":"Service"'));
assert.ok(!/noindex/.test(rpt) && !/noindex/.test(ren), 'pt e en indexáveis');
assert.ok(fs.readFileSync('dist/sitemap.xml', 'utf8').includes('/russo-online'));
assert.ok(html('/en').includes('Language courses for English speakers'));
assert.ok(!html('/en').includes('Brazilian learners'));
assert.ok(html('/en').includes('Brazilian Portuguese, French and Russian explained in English'));
assert.ok(!html('/en').includes('Every explanation is in English'), 'a home em inglês não promete explicação em inglês onde ela não existe');
assert.ok(!html('/en').includes('lessons explained in English'));
assert.ok(!html('/assinatura').includes('name="robots" content="noindex"'));
assert.ok(html('/assinatura').includes('<h1>Planos e assinatura</h1>'));
assert.ok(html('/assinatura').includes('id="oferta-atual"'));
assert.ok(html('/assinatura').includes('R$ 139'));
assert.ok(!html('/assinatura').includes(PLANOS_AVISO), 'planos em preparação não aparecem na assinatura');
assert.ok(html('/assinatura').includes('Testar 2 aulas grátis, sem cartão'));
assert.ok(html('/assinatura').includes('R$ 291,90'));
assert.ok(!html('/assinatura').includes('Alguns áudios podem estar temporariamente indisponíveis'));
for (const rota of ['/entrar', '/cadastro']) assert.ok(html(rota).includes('name="robots" content="noindex"'));
// A versão EN da assinatura são páginas localizadas genuínas e indexáveis — os alternates
// hreflang da página de preços não podem apontar para páginas noindex (defeito S2 da auditoria).
for (const rota of ['/en/assinatura']) assert.ok(!html(rota).includes('name="robots" content="noindex"'), `${rota} indexável`);
assert.equal(metaDaRota('/pagina-inexistente-auditoria', dados).status, 404);
assert.ok(!html('/curso/en/dia/9').includes('\"isAccessibleForFree\":true'));
assert.ok(!html('/curso/en/dia/9').includes('<h2>Vocabulário</h2>'));
assert.ok(html('/curso/en/dia/9').includes('name="robots" content="noindex"'), 'sessao paga sem amostra publica tem noindex');
assert.ok(!html('/curso/en').includes('name="robots" content="noindex"'), 'apresentacao publica do curso segue indexavel');
for (const curso of ['en', 'de', 'ru', 'fr', 'it', 'es']) {
  const pagina = html(`/curso/${curso}`);
  assert.ok(pagina.includes('"logo":"https://linvuu.com.br/brand/linvuu-logo.png"'), `organização com logo real no curso ${curso}`);
  assert.ok(pagina.includes('"provider":{'), `provedor de curso registrado ${curso}`);
  assert.ok(pagina.includes(`href="/gramatica/${curso}"`), `curso ${curso} aponta à gramática no HTML inicial`);
}

for (const curso of ['en', 'ru']) {
  const links = [...html(`/curso/${curso}`).matchAll(new RegExp(`href="/curso/${curso}/dia/(\\d+)"`, 'g'))].map((x) => Number(x[1]));
  assert.deepEqual(links, [1, 2, 3, 4, 5, 6, 7, 8], 'todas as oito amostras possuem links estaticos, sem sessoes pagas');
}
assert.ok(!/href="\/en\/curso\/de\/dia\//.test(html('/en/curso/de')), 'curso sem aulas traduzidas nao anuncia sessoes inexistentes');
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
for (const match of sitemap.matchAll(/<loc>https:\/\/linvuu\.com\.br\/livros\/[a-z]{2}\/capitulo\/(\d+)<\/loc>/g)) {
  assert.ok(CAPITULOS_GRATIS.some(n => n === Number(match[1])), 'sitemap inclui somente capítulos gratuitos');
}
assert.ok(sitemap.includes('<loc>https://linvuu.com.br/cursos</loc>'));
assert.ok(sitemap.includes('<loc>https://linvuu.com.br/assinatura</loc>'));
assert.ok(!sitemap.includes('/livro/gramatica-ru'), 'rota legada não entra no sitemap');
assert.ok(!LIVROS.some((livro) => livro.link === '/livro/gramatica-ru'), 'vitrine não promove a rota legada');
for (const [idioma, prefixo] of [['en', ''], ['es', ''], ['de', ''], ['fr', ''], ['it', ''], ['ru', ''], ['br', '/en']]) {
  const pacote = JSON.parse(fs.readFileSync(`content/gramatica/${idioma}.json`, 'utf8'));
  const livre = pacote.topicos.find((t: {dia: number}) => t.dia <= 8);
  const nomesLivres = new Set(pacote.topicos.filter((t: {dia: number}) => t.dia <= 8).map((t: {titulo: string}) => t.titulo));
  const pago = pacote.topicos.find((t: {dia: number; titulo: string}) => t.dia > 8 && t.titulo && !nomesLivres.has(t.titulo));
  const pagina = html(`${prefixo}/gramatica/${idioma}`);
  assert.ok(livre && pagina.includes(livre.titulo), `gramática ${idioma} contém tópico gratuito no HTML inicial`);
  if (pago) assert.ok(!pagina.includes(pago.titulo), `gramática ${idioma} não expõe tópico pago`);
}
console.log('SEO público: proposta consistente, idiomas preservados e conteúdo pago fora do HTML.');

const traco = (valor: number) => renderToStaticMarkup(createElement(Traco, {valor, exato:true, trilha:true}));
assert.ok(!traco(0).includes('<path'), 'zero não desenha progresso fictício');
assert.ok(traco(1/248).includes('stroke-dasharray:' + (1/248) + ' 1'), 'primeira sessão respeita fração real');
assert.ok(traco(1).includes('stroke-dasharray:1 1'), 'curso completo desenha todo o traço');
assert.ok(renderToStaticMarkup(createElement(Traco, {valor:0})).includes('<path'), 'assinatura decorativa mantém comportamento');
