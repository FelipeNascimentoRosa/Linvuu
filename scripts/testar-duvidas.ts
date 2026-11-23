// Páginas de dúvida (src/lib/duvidas.ts): fidelidade ao material escrito e formato da página.
// node --import tsx scripts/testar-duvidas.ts
//   1. todo trecho de regra, célula de tabela, exemplo e erro existe, literalmente, no tópico-fonte de
//      content/gramatica/<idioma>.json (nada inventado: estratégia §8);
//   2. a aula indicada existe e o título bate com o do tópico;
//   3. resposta curta com até 60 palavras; título e descrição nas faixas do Google;
//   4. a página é indexável só no .com.br, sem hreflang, e o .com responde 404 pela meta (o 301 é de server/dominio.ts);
//   5. o pacote do navegador não leva a gramática paga: o módulo não importa content/.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DUVIDAS, caminhoDuvida, palavras, duvidaParaHtml } from '../src/lib/duvidas.ts';
import { carregarDadosMeta, metaDaRota, alternativosDe, conteudoRota } from '../src/lib/metaRota.ts';
import { comPerfil } from '../src/i18n/locales.ts';

const raiz = process.cwd();
const d = carregarDadosMeta(raiz);
assert.ok(d, 'dados de meta carregados');
type Topico = Record<string, unknown> & { id: string; aula: number; dia: number; aulaTitulo: string };
const topicos = (idioma: string): Map<string, Topico> => new Map((JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'gramatica', `${idioma}.json`), 'utf8')).topicos as Topico[]).map((t) => [t.id, t]));
// Comparação literal, só com a primeira letra livre: a página põe maiúscula em trecho que começa no meio da frase.
const contem = (fonte: string, trecho: string) => fonte.includes(trecho) || fonte.includes(trecho.charAt(0).toLowerCase() + trecho.slice(1));
const textoDe = (t: Topico) => JSON.stringify(t).replace(/\\"/g, '"');

let trechos = 0;
const vistos = new Set<string>();
for (const x of DUVIDAS) {
  const c = caminhoDuvida(x);
  assert.ok(!vistos.has(c), `${c}: endereço repetido`); vistos.add(c);
  assert.match(x.slug, /^[a-z0-9-]+$/, `${c}: slug`);
  const tops = topicos(x.idioma);
  const fonte = (id: string, onde: string) => { const t = tops.get(id); assert.ok(t, `${c}: ${onde} cita o tópico ${id}, que não existe em content/gramatica/${x.idioma}.json`); return textoDe(t!); };
  for (const r of x.regra) { assert.ok(contem(fonte(r.fonte, 'regra'), r.texto), `${c}: trecho de regra não está no tópico ${r.fonte}: ${r.texto}`); trechos++; }
  for (const t of x.tabelas) for (const l of t.linhas) {
    assert.equal(l.length, t.colunas.length, `${c}: linha da tabela «${t.titulo}» com ${l.length} células para ${t.colunas.length} colunas`);
    const f = fonte(t.fonte, `tabela «${t.titulo}»`);
    for (const v of l) { assert.ok(contem(f, v), `${c}: célula «${v}» não está no tópico ${t.fonte}`); trechos++; }
  }
  assert.equal(x.exemplos.length, 3, `${c}: o formato pede três exemplos`);
  for (const e of x.exemplos) { const f = fonte(e.fonte, 'exemplo'); assert.ok(contem(f, e.alvo) && contem(f, e.pt), `${c}: exemplo fora do tópico ${e.fonte}: ${e.alvo} — ${e.pt}`); trechos += 2; }
  assert.ok(x.erros.length >= 2, `${c}: pelo menos dois erros típicos`);
  for (const e of x.erros) { const f = fonte(e.fonte, 'erro'); for (const v of [e.errado, e.certo, e.motivo]) { assert.ok(contem(f, v), `${c}: erro fora do tópico ${e.fonte}: ${v}`); trechos++; } }
  const daAula = [...tops.values()].filter((t) => t.aula === x.aula.n);
  assert.ok(daAula.length, `${c}: aula ${x.aula.n} não existe`);
  assert.ok(daAula.some((t) => t.dia === x.aula.dia), `${c}: a aula ${x.aula.n} não tem a sessão ${x.aula.dia}`);
  assert.ok(daAula.some((t) => t.aulaTitulo === x.aula.titulo), `${c}: título da aula ${x.aula.n} difere do conteúdo («${x.aula.titulo}»)`);
  assert.ok(palavras(x.resposta) <= 60, `${c}: resposta curta com ${palavras(x.resposta)} palavras (máximo 60)`);
  assert.ok(x.perguntas.length >= 3, `${c}: pelo menos três perguntas frequentes`);
  if (x.livro) assert.ok(fs.existsSync(path.join(raiz, 'content', 'livros', x.idioma, `cap-${x.livro.caminho.match(/capitulo\/(\d+)$/)?.[1]?.padStart(2, '0')}.json`)), `${c}: capítulo do livro não publicado (${x.livro.caminho})`);

  comPerfil('br', () => {
    const m = metaDaRota(c, d);
    assert.equal(m.status, 200, `${c}: status no .com.br`);
    assert.ok(!m.semIndice, `${c}: indexável no .com.br`);
    const t = `${m.titulo} · Linvuu`;
    assert.ok(t.length >= 30 && t.length <= 60, `${c}: título com ${t.length} caracteres: ${t}`);
    assert.ok(m.descricao && m.descricao.length >= 120 && m.descricao.length <= 160, `${c}: descrição com ${m.descricao?.length} caracteres`);
    assert.deepEqual(alternativosDe(m, 'https://linvuu.com.br', d), [], `${c}: sem hreflang (não há versão em inglês)`);
    const html = conteudoRota(m, d, m.locale!);
    assert.equal((html.match(/<h1>/g) ?? []).length, 1, `${c}: um único h1 no resumo do servidor`);
    assert.ok(html.includes(duvidaParaHtml(x)), `${c}: resumo do servidor com o texto da página`);
  });
  comPerfil('global', () => {
    const m = metaDaRota(c, d);
    assert.ok(m.semIndice, `${c}: no .com a página não é indexável (o servidor redireciona antes)`);
  });
}
const modulo = fs.readFileSync(path.join(raiz, 'src', 'lib', 'duvidas.ts'), 'utf8');
assert.ok(!/from ['"][^'"]*content\//.test(modulo) && !/import\(['"][^'"]*content\//.test(modulo), 'src/lib/duvidas.ts não pode importar content/ (levaria a gramática paga ao navegador)');
// Endereço que não existe: 404 de verdade, como o resto do site.
comPerfil('br', () => assert.equal(metaDaRota('/gramatica/es/nao-existe', d).status, 404, 'slug inexistente responde 404'));
// O sitemap gerado lista as páginas só no .com.br.
const br = fs.readFileSync(path.join(raiz, 'public', 'sitemap.xml'), 'utf8'), gl = fs.readFileSync(path.join(raiz, 'public', 'sitemap-global.xml'), 'utf8');
for (const x of DUVIDAS) {
  assert.ok(br.includes(`<loc>https://linvuu.com.br${caminhoDuvida(x)}</loc>`), `${caminhoDuvida(x)} no sitemap do .com.br (rode node scripts/seo.mjs)`);
  assert.ok(!gl.includes(caminhoDuvida(x)), `${caminhoDuvida(x)} fora do sitemap do .com`);
}
console.log(`OK: ${DUVIDAS.length} páginas de dúvida, ${trechos} trechos conferidos literalmente com content/gramatica, só no .com.br e sem hreflang.`);
