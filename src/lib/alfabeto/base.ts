// Materiais gratuitos: guia do alfabeto e da pronúncia, para quem fala português. Tipos e utilitários comuns aos cinco idiomas.
// Módulo puro (sem DOM): a página React e o servidor (metaRota, HTML pré-renderizado) leem o mesmo conteúdo.
//
// Convenções de texto:
//  - `{{...}}` marca um trecho na língua estudada dentro de um parágrafo em português (vira <span lang="..">).
//    No russo, trechos em cirílico são reconhecidos sozinhos.
//  - Palavras em russo levam o acento tônico como apóstrofo depois da vogal (ма'ма); `ac` o converte no acento
//    combinado U+0301, que a página mostra e o áudio ignora (src/lib/audio.ts: textoParaAudio).

export const ac = (s: string) => s.replace(/'/g, "́");
/** Texto sem as marcas `{{ }}`, para HTML pré-renderizado e títulos. */
export const limpar = (s: string) => ac(s).replace(/\{\{|\}\}/g, "");

/** Uma palavra na língua estudada: como se escreve, como se lê (com letras do português) e o que significa. */
export type Exemplo = { txt: string; leitura: string; pt: string };
export const W = (txt: string, leitura: string, pt: string): Exemplo => ({ txt: ac(txt), leitura, pt });

/** Cartão de uma letra (ou combinação de letras): o desenho, o nome, o som e um exemplo. */
export type Cartao = { glifo: string; nome?: string; som: string; dica?: string; exemplo?: Exemplo };

export type Bloco =
  | { t: "p"; x: string }
  | { t: "h"; x: string }
  | { t: "h3"; x: string }
  | { t: "lista"; itens: string[] }
  | { t: "cartoes"; itens: Cartao[] }
  | { t: "palavras"; titulo?: string; itens: Exemplo[] }
  | { t: "nota"; titulo: string; x: string }
  | { t: "tabela"; titulo?: string; cabecalho: string[]; linhas: string[][] };

export type Exercicio = { id: string; enunciado: string; txt?: string; opcoes: string[]; correta: number; explicacao: string };

export type Alfabeto = {
  /** código do curso do site (/curso/<id>) e da pasta de áudio */
  id: "ru" | "de" | "fr" | "it" | "es";
  slug: string;
  /** "russo", "alemão"... (minúsculas, para frases) */
  idioma: string;
  /** código BCP-47 do texto estudado, para `lang` e para a voz */
  lang: string;
  /** título de busca (30 a 60 caracteres) */
  titulo: string;
  h1: string;
  /** descrição de busca (120 a 160 caracteres) */
  descricao: string;
  lead: string;
  minutos: number;
  /** o que a página ensina, em uma frase (JSON-LD) */
  ensina: string;
  blocos: Bloco[];
  exercicios: Exercicio[];
};

// Sorteio determinístico: a mesma ordem das alternativas no servidor e no navegador.
function semente(s: string) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; }
function embaralhar<T>(lista: T[], id: string): T[] {
  let a = semente(id) || 1;
  const rnd = () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const r = [...lista];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

/** Pergunta de múltipla escolha. `txt` aparece em destaque, com botão de áudio. */
export const Q = (id: string, enunciado: string, certa: string, erradas: string[], explicacao: string, txt?: string): Exercicio => {
  const opcoes = embaralhar([certa, ...erradas], id);
  return { id, enunciado, txt: txt ? ac(txt) : undefined, opcoes, correta: opcoes.indexOf(certa), explicacao };
};
