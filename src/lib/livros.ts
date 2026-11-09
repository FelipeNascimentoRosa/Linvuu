// Livros da Coleção Linvuu: tipos, textos e utilidades puras (sem DOM e sem Vite), usadas no navegador e no servidor.
// Os capítulos de amostra ficam em content/livros/<idioma>/cap-NN.json (gerados por scripts/livros/extrair_capitulos.py)
// e o sumário completo em content/livros/<idioma>/sumario.json. O livro inteiro fica na plataforma, só para assinantes.

export const AUTORES = [
  { id: 'felipe', nome: 'Felipe Nascimento Rosa', links: ['https://www.linkedin.com/in/felipenrosaa/', 'https://www.facebook.com/felipepcrosa'] },
  { id: 'luiza', nome: 'Luiza Nascimento Rosa', links: ['https://www.linkedin.com/in/luizanrosaa/', 'https://www.facebook.com/luiza.costa.nascimento.2025'] },
] as const;

export const CAPITULOS_GRATIS = [1, 2] as const;
export const LIVROS_EM_PRODUCAO = 'Estamos produzindo livros para os níveis B1–B2. Eles ainda não estão disponíveis.';
export const LIVROS_DESCRICAO = 'Gramática prática de inglês, espanhol, alemão, francês, italiano e russo para quem fala português. Leia os dois primeiros capítulos grátis, com áudio.';

export type FalaLivro = { quem: string; texto: string };
export type BlocoLivro =
  | { t: 'h2' | 'h3' | 'h4' | 'p' | 'li' | 'rotulo'; texto: string }
  | { t: 'item'; n: number; texto: string }
  | { t: 'dialogo'; falas: FalaLivro[] }
  | { t: 'tabela'; cabecalho: string[]; linhas: string[][] }
  | { t: 'aviso'; rotulo: string; texto: string };
export interface CapituloLivro { n: number; idioma: string; titulo: string; nivel: string; paginas: [number, number]; blocos: BlocoLivro[] }
export interface ItemSumario { n: number; titulo: string; nivel: string; pagina: number | null }

export interface MetaLivro { id: string; nome: string; saudacao: string; lang: string; descricao: string }
/** Idiomas com capítulos de amostra publicados. */
export const LIVROS_META: MetaLivro[] = [
  { id: 'en', nome: 'Inglês', saudacao: 'Hello', lang: 'en', descricao: 'Gramática do inglês para quem fala português, do zero ao A2 e os primeiros passos do B1. Cada capítulo parte de um hábito do português que o inglês não aceita.' },
  { id: 'es', nome: 'Espanhol', saudacao: 'Hola', lang: 'es', descricao: 'Gramática prática do espanhol para quem fala português, do zero ao A2. Cada capítulo parte de uma armadilha do português, dos falsos amigos ao ser e estar.' },
  { id: 'de', nome: 'Alemão', saudacao: 'Hallo', lang: 'de', descricao: 'Gramática prática do alemão para quem fala português, do zero ao A2: sons, casos, ordem da frase e os erros que brasileiros mais cometem.' },
  { id: 'fr', nome: 'Francês', saudacao: 'Bonjour', lang: 'fr', descricao: 'Gramática prática do francês para quem fala português, do zero ao A2: da pronúncia e da ortografia ao passé composé, explicados em português.' },
  { id: 'ru', nome: 'Russo', saudacao: 'Привет', lang: 'ru', descricao: 'Gramática prática do russo para quem fala português, do alfabeto ao A2: gênero, casos, verbos e as armadilhas que o português cria, explicados em português.' },
  { id: 'it', nome: 'Italiano', saudacao: 'Ciao', lang: 'it', descricao: 'Gramática prática do italiano para quem fala português, do zero ao A2, com atenção às semelhanças que enganam e às diferenças que ninguém avisa.' },
];
export const livroMeta = (id: string) => LIVROS_META.find((l) => l.id === id);
export const tituloLivro = (m: MetaLivro) => `${m.nome}: gramática prática, do zero ao A2`;
export const caminhoLivro = (id: string) => `/livros/${id}`;
export const caminhoCapitulo = (id: string, n: number) => `/livros/${id}/capitulo/${n}`;

// ---------- texto com marcas: *idioma estudado*, ~~forma errada~~ ----------
export type Trecho = { t: 'txt' | 'est' | 'ris'; v: string };
export function trechos(s: string): Trecho[] {
  const out: Trecho[] = [];
  for (const parte of s.split(/(\*[^*]+\*|~~[^~]+~~)/)) {
    if (!parte) continue;
    if (parte.startsWith('~~')) out.push({ t: 'ris', v: parte.slice(2, -2) });
    else if (parte.startsWith('*')) out.push({ t: 'est', v: parte.slice(1, -1) });
    else out.push({ t: 'txt', v: parte });
  }
  return out;
}
/** Texto sem as marcas (é o que a voz lê). */
export const plano = (s: string) => s.replace(/~~/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();

export const palavrasDoCapitulo = (c: CapituloLivro) => {
  let total = 0;
  for (const b of c.blocos) {
    if ('texto' in b) total += plano(b.texto).split(' ').length;
    if (b.t === 'dialogo') for (const f of b.falas) total += plano(f.texto).split(' ').length;
    if (b.t === 'tabela') for (const l of b.linhas) for (const x of l) total += plano(x).split(' ').length;
  }
  return total;
};
export const minutosDeLeitura = (c: CapituloLivro) => Math.max(5, Math.round(palavrasDoCapitulo(c) / 140 / 5) * 5);
export const sumarioDe = (c: CapituloLivro) => c.blocos.flatMap((b) => (b.t === 'h2' ? [b.texto] : [])).map((texto, i) => ({ id: `s${i + 1}`, texto }));

/** Textos que ganham áudio: as falas da Cena e a 1ª coluna das tabelas "Frases de ouro" e "Glossário". Mesma regra no site e em scripts/livros/audio-livros.mjs. */
export function itensDeAudio(c: CapituloLivro): { texto: string; voz: 'm' | 'f'; onde: string }[] {
  const out: { texto: string; voz: 'm' | 'f'; onde: string }[] = [];
  let secao = '';
  const quemVoz = new Map<string, 'm' | 'f'>();
  for (const b of c.blocos) {
    if (b.t === 'h2') secao = b.texto;
    if (b.t === 'dialogo') for (const f of b.falas) {
      if (!quemVoz.has(f.quem)) quemVoz.set(f.quem, quemVoz.size % 2 === 0 ? 'f' : 'm');
      out.push({ texto: plano(f.texto), voz: quemVoz.get(f.quem)!, onde: `cap ${c.n} cena` });
    }
    if (b.t === 'tabela' && ehTabelaDeFrases(secao)) for (const l of b.linhas) if (l[0]) out.push({ texto: plano(l[0]), voz: 'f', onde: `cap ${c.n} ${/glossário/i.test(secao) ? 'glossário' : 'frases de ouro'}` });
  }
  return out.filter((i) => i.texto);
}
export const ehTabelaDeFrases = (tituloSecao: string) => /frases de ouro|glossário/i.test(tituloSecao);

/**
 * Garante um sumário de títulos sem saltos de nível (ex.: h2 seguido de h4).
 * A extração classifica os títulos pelo tamanho da fonte no PDF e, nos livros ES/FR,
 * as subsecções da secção "5. Por dentro" (um h2) nasceram como h4. Regra: cada título
 * desce no máximo um nível em relação ao título-pai (o anterior de nível estritamente
 * menor, com o h1 da página como raiz); títulos irmãos mantêm o mesmo nível e um h4
 * sob um h3 legítimo não muda. Sem saltos no dado, devolve o próprio capítulo.
 */
export function normalizarNiveis(c: CapituloLivro): CapituloLivro {
  const nivel = (t: string) => (t === 'h2' ? 2 : t === 'h3' ? 3 : 4);
  const pilha: { orig: number; efetivo: number }[] = [];
  let mudou = false;
  const blocos = c.blocos.map((b): BlocoLivro => {
    if (b.t !== 'h2' && b.t !== 'h3' && b.t !== 'h4') return b;
    const orig = nivel(b.t);
    while (pilha.length && pilha[pilha.length - 1].orig >= orig) pilha.pop();
    const pai = pilha.length ? pilha[pilha.length - 1].efetivo : 1;
    const efetivo = Math.min(orig, pai + 1);
    pilha.push({ orig, efetivo });
    if (efetivo === orig) return b;
    mudou = true;
    return { ...b, t: `h${efetivo}` as 'h2' | 'h3' | 'h4' };
  });
  return mudou ? { ...c, blocos } : c;
}

// ---------- HTML simples para os buscadores (o React o substitui ao carregar) ----------
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s: string, lang: string) => trechos(s).map((t) => (t.t === 'est' ? `<em lang="${lang}">${esc(t.v)}</em>` : t.t === 'ris' ? `<del>${esc(t.v)}</del>` : esc(t.v))).join('');
export function capituloParaHtml(c: CapituloLivro, lang: string): string {
  const h: string[] = [];
  let ul = false;
  const fechaLista = () => { if (ul) { h.push('</ul>'); ul = false; } };
  for (const b of normalizarNiveis(c).blocos) {
    if (b.t === 'li' || b.t === 'item') { if (!ul) { h.push('<ul>'); ul = true; } h.push(`<li>${inline(b.texto, lang)}</li>`); continue; }
    fechaLista();
    if (b.t === 'h2') h.push(`<h2>${esc(plano(b.texto))}</h2>`);
    else if (b.t === 'h3') h.push(`<h3>${esc(plano(b.texto))}</h3>`);
    else if (b.t === 'h4') h.push(`<h4>${esc(plano(b.texto))}</h4>`);
    else if (b.t === 'p') h.push(`<p>${inline(b.texto, lang)}</p>`);
    else if (b.t === 'rotulo') h.push(`<p><strong>${esc(b.texto)}</strong></p>`);
    else if (b.t === 'aviso') h.push(`<aside><strong>${esc(b.rotulo)}</strong> ${inline(b.texto, lang)}</aside>`);
    else if (b.t === 'dialogo') h.push('<dl>' + b.falas.map((f) => `<dt>${esc(f.quem)}</dt><dd lang="${lang}">${inline(f.texto, lang)}</dd>`).join('') + '</dl>');
    else if (b.t === 'tabela') h.push(`<table><thead><tr>${b.cabecalho.map((x) => `<th>${inline(x, lang)}</th>`).join('')}</tr></thead><tbody>${b.linhas.map((l) => `<tr>${l.map((x) => `<td>${inline(x, lang)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
  }
  fechaLista();
  return h.join('');
}
