// Confere a integridade dos guias de alfabeto dos Materiais gratuitos (src/lib/alfabeto/*.ts e src/lib/materiais.ts).
// Uso: node --import tsx scripts/testar-alfabeto.ts
import assert from 'node:assert/strict';
import { ALFABETOS, DESCRICAO_HUB, TITULO_HUB, alfabetoParaHtml, caminhoAlfabeto, textosFalados } from '../src/lib/materiais.ts';
import { LETRAS_RU } from '../src/lib/alfabeto/ru.ts';
import { limpar, type Bloco } from '../src/lib/alfabeto/base.ts';

assert.deepEqual(ALFABETOS.map((a) => a.id), ['ru', 'de', 'fr', 'it', 'es'], 'ordem e idiomas dos guias');
assert.equal(new Set(ALFABETOS.map((a) => a.slug)).size, 5, 'slugs repetidos');
assert.ok(TITULO_HUB.length >= 30 && TITULO_HUB.length <= 60, `título do hub: ${TITULO_HUB.length}`);
assert.ok(DESCRICAO_HUB.length >= 120 && DESCRICAO_HUB.length <= 160, `descrição do hub: ${DESCRICAO_HUB.length}`);

/** Todo texto visível de um bloco (para conferências de texto). */
const textosDoBloco = (b: Bloco): string[] => {
  if (b.t === 'p' || b.t === 'h' || b.t === 'h3') return [b.x];
  if (b.t === 'lista') return b.itens;
  if (b.t === 'nota') return [b.titulo, b.x];
  if (b.t === 'cartoes') return b.itens.flatMap((c) => [c.glifo, c.nome ?? '', c.som, c.dica ?? '', c.exemplo?.txt ?? '', c.exemplo?.leitura ?? '', c.exemplo?.pt ?? '']);
  if (b.t === 'palavras') return [b.titulo ?? '', ...b.itens.flatMap((w) => [w.txt, w.leitura, w.pt])];
  return [b.titulo ?? '', ...b.cabecalho, ...b.linhas.flat()];
};

for (const a of ALFABETOS) {
  const onde = `[${a.id}]`;
  assert.equal(caminhoAlfabeto(a.slug), `/materiais-gratuitos/${a.slug}`);
  assert.match(a.slug, /^alfabeto-[a-z]+$/, `${onde} slug`);
  assert.ok(a.titulo.length >= 30 && a.titulo.length <= 60, `${onde} título com ${a.titulo.length} caracteres`);
  assert.ok(a.descricao.length >= 120 && a.descricao.length <= 160, `${onde} descrição com ${a.descricao.length} caracteres`);
  assert.ok(a.h1.length > 20 && a.lead.length > 60 && a.ensina.length > 20, `${onde} textos de abertura`);

  // estrutura: tabela do alfabeto, cartões, palavras para ler, regras e teste
  const tipos = new Set(a.blocos.map((b) => b.t));
  for (const t of ['p', 'h', 'h3', 'tabela', 'cartoes', 'palavras', 'lista'] as const) assert.ok(tipos.has(t), `${onde} sem bloco ${t}`);
  assert.ok(a.blocos.filter((b) => b.t === 'h').length >= 4, `${onde} poucas seções`);
  const primeiraTabela = a.blocos.find((b) => b.t === 'tabela') as Extract<Bloco, { t: 'tabela' }>;
  assert.ok(primeiraTabela.linhas.length >= 26, `${onde} tabela do alfabeto com ${primeiraTabela.linhas.length} linhas`);
  for (const l of primeiraTabela.linhas) assert.equal(l.length, primeiraTabela.cabecalho.length, `${onde} linha de tabela com colunas erradas: ${l[0]}`);

  // palavras e cartões completos
  for (const b of a.blocos) {
    if (b.t === 'palavras') for (const w of b.itens) assert.ok(w.txt && w.leitura && w.pt, `${onde} palavra incompleta: ${w.txt}`);
    if (b.t === 'cartoes') for (const c of b.itens) { assert.ok(c.glifo && c.som, `${onde} cartão incompleto: ${c.glifo}`); if (c.exemplo) assert.ok(c.exemplo.txt && c.exemplo.leitura && c.exemplo.pt, `${onde} exemplo incompleto em ${c.glifo}`); }
  }

  // texto: sem apóstrofo ASCII (viraria acento), marcas {{ }} fechadas, sem inglês solto
  const todos = [...a.blocos.flatMap(textosDoBloco), ...a.exercicios.flatMap((e) => [e.enunciado, e.txt ?? '', e.explicacao, ...e.opcoes])];
  for (const s of todos) {
    // apóstrofo depois de vogal russa é acento tônico (a página o converte com ac()); qualquer outro é erro
    assert.ok(!s.replace(/[Ѐ-ӿ]'/g, '').includes("'"), `${onde} apóstrofo ASCII em: ${s}`);
    assert.equal((s.match(/\{\{/g) ?? []).length, (s.match(/\}\}/g) ?? []).length, `${onde} marca {{ }} aberta em: ${s}`);
  }
  for (const b of a.blocos) if (b.t === 'p') assert.ok(!/\b(the|and|lesson|click)\b/i.test(b.x), `${onde} texto parece estar em inglês`);

  // teste rápido
  assert.ok(a.exercicios.length >= 8 && a.exercicios.length <= 16, `${onde} ${a.exercicios.length} exercícios`);
  const ids = new Set<string>();
  for (const e of a.exercicios) {
    assert.ok(!ids.has(e.id) && e.id.startsWith(`${a.id}-`), `${onde} id de exercício: ${e.id}`); ids.add(e.id);
    assert.ok(e.opcoes.length >= 3 && e.opcoes.length <= 4, `${e.id}: número de alternativas`);
    assert.equal(new Set(e.opcoes).size, e.opcoes.length, `${e.id}: alternativas repetidas`);
    assert.ok(e.correta >= 0 && e.correta < e.opcoes.length, `${e.id}: resposta correta fora das alternativas`);
    assert.ok(e.explicacao.length > 8, `${e.id}: sem explicação`);
  }

  // HTML pré-renderizado
  const html = alfabetoParaHtml(a);
  assert.ok(html.length > 3000 && html.includes(`lang="${a.lang}"`) && html.includes('<h2>'), `${onde} HTML pré-renderizado`);
  assert.ok(!html.includes('{{') && !html.includes('}}'), `${onde} marca {{ }} no HTML`);
  assert.ok(textosFalados(a).length >= 20, `${onde} poucos textos falados`);
}

// Russo: 33 letras, em cinco grupos, cada uma em um cartão.
assert.equal(LETRAS_RU.length, 33, 'o alfabeto russo tem 33 letras');
assert.equal(new Set(LETRAS_RU.map((x) => x.n)).size, 33, 'letras russas duplicadas');
const contagem = (g: string) => LETRAS_RU.filter((x) => x.grupo === g).length;
assert.deepEqual(['igual', 'engana', 'conhecido', 'novo', 'sinal'].map(contagem), [5, 7, 13, 6, 2], 'grupos do alfabeto russo (5 + 7 + 13 + 6 + 2)');
const russo = ALFABETOS[0];
const glifosCartao = russo.blocos.flatMap((b) => (b.t === 'cartoes' ? b.itens.map((c) => c.glifo) : []));
assert.equal(glifosCartao.length, 33, `cartões do russo: ${glifosCartao.length}`);
for (const x of LETRAS_RU) assert.ok(glifosCartao.includes(`${x.m} ${x.n}`), `letra sem cartão: ${x.m}`);
assert.equal((russo.blocos.find((b) => b.t === 'tabela') as Extract<Bloco, { t: 'tabela' }>).linhas.length, 33, 'tabela completa do russo');
for (const x of LETRAS_RU) {
  assert.ok(x.ex.txt.length > 0 && x.ex.leitura && x.ex.pt, `exemplo da letra ${x.m}`);
  assert.ok(/^[Ѐ-ӿ́ -]+$/.test(x.ex.txt), `exemplo de ${x.m} com caractere fora do cirílico: ${x.ex.txt}`);
}
// Letras do cartão de cada grupo batem com a tabela de rótulos (uma letra não pode estar em dois grupos).
const maiusculas = new Set(LETRAS_RU.map((x) => x.m));
assert.equal(maiusculas.size, 33);
assert.ok(limpar('ма\'ма').includes('́'), 'acento combinado');

console.log(`alfabetos: ${ALFABETOS.length} idiomas, ${ALFABETOS.reduce((s, a) => s + a.exercicios.length, 0)} perguntas, ${ALFABETOS.reduce((s, a) => s + textosFalados(a).length, 0)} textos falados — OK`);
