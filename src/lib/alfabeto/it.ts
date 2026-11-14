// Alfabeto e pronúncia do italiano para quem fala português.
// Estado: rascunho sem revisão humana. Pedir revisão de falante de italiano antes de divulgar.
import { Q, W, type Alfabeto, type Bloco } from "./base.ts";

type Tipo = "igual" | "engana" | "novo";
const ROTULO: Record<Tipo, string> = { igual: "parece e soa como no português", engana: "parece, mas soa diferente", novo: "só em palavras estrangeiras" };
// [letra, nome em italiano, como se diz em português, relação com o português]
const ALFABETO: [string, string, string, Tipo][] = [
  ["A a", "a", "a", "igual"], ["B b", "bi", "bi", "igual"], ["C c", "ci", "tchi", "engana"], ["D d", "di", "di", "igual"], ["E e", "e", "ê", "igual"],
  ["F f", "effe", "éffe", "igual"], ["G g", "gi", "dji", "engana"], ["H h", "acca", "ákka", "engana"], ["I i", "i", "i", "igual"], ["L l", "elle", "élle", "igual"],
  ["M m", "emme", "émme", "igual"], ["N n", "enne", "énne", "igual"], ["O o", "o", "ó", "igual"], ["P p", "pi", "pi", "igual"], ["Q q", "cu", "ku", "engana"],
  ["R r", "erre", "érre", "engana"], ["S s", "esse", "ésse", "engana"], ["T t", "ti", "ti", "igual"], ["U u", "u", "u", "igual"], ["V v", "vu", "vu", "igual"],
  ["Z z", "zeta", "dzéta", "engana"], ["J j", "i lunga", "i lúnga", "novo"], ["K k", "cappa", "káppa", "novo"], ["W w", "doppia vu", "dóppia vu", "novo"], ["X x", "ics", "iks", "novo"],
  ["Y y", "ipsilon", "ípsilon", "novo"],
];

const blocos: Bloco[] = [
  { t: "p", x: "O alfabeto italiano tem 21 letras, as 26 do português sem {{j k w x y}}, que só aparecem em palavras estrangeiras. É um dos mais parecidos com o nosso: a maior parte das letras soa como em português e as vogais são puras. As diferenças estão em poucas letras e combinações: {{c}} e {{g}} antes de {{e}} e {{i}}, {{h}} mudo, {{z}}, {{gn}}, {{gl}}, {{sc}} e as consoantes duplas." },
  { t: "tabela", titulo: "As letras do alfabeto italiano", cabecalho: ["Letra", "Nome", "Como se diz", "Em relação ao português"], linhas: ALFABETO.map(([a, b, c, d]) => [a, b, c, ROTULO[d]]) },

  { t: "h", x: "Letras que parecem com as do português" },
  { t: "h3", x: "Parecem e soam como no português" },
  { t: "p", x: "As vogais {{a e i o u}} e as consoantes {{b d f l m n p t v}} soam como no português. As vogais são sempre claras, sem reduzir no fim da palavra: {{casa}} termina em “a”, e {{lupo}} termina em “o” (nunca “u”)." },
  { t: "palavras", itens: [W("mamma", "mámma", "mamãe"), W("pane", "páne", "pão"), W("vino", "víno", "vinho"), W("latte", "látte", "leite"), W("tavolo", "távolo", "mesa"), W("libro", "líbro", "livro"), W("nome", "nôme", "nome")] },
  { t: "h3", x: "Parecem, mas soam diferente" },
  { t: "cartoes", itens: [
    { glifo: "C c", nome: "ci", som: "antes de a, o, u: “k”. Antes de e, i: “tch”", dica: "{{ce}} = tchê, {{ci}} = tchi. Em português, “ce/ci” soam “se/si”.", exemplo: W("cena", "tchêna", "jantar") },
    { glifo: "G g", nome: "gi", som: "antes de a, o, u: “g”. Antes de e, i: “dj”", dica: "{{ge}} = djê, {{gi}} = dji.", exemplo: W("gelato", "djeláto", "sorvete") },
    { glifo: "H h", nome: "acca", som: "mudo", dica: "Só aparece em quatro formas do verbo {{avere}} (ho, hai, ha, hanno) e depois de c e g.", exemplo: W("hai", "ai", "você tem") },
    { glifo: "Z z", nome: "zeta", som: "“ts” (como em pizza) ou “dz”", dica: "Nunca soa como o “z” de “zebra” sozinho.", exemplo: W("pizza", "píttsa", "pizza") },
    { glifo: "S s", nome: "esse", som: "“s” no começo e junto de consoante; entre vogais costuma soar “z” (varia pela região)", exemplo: W("sole", "sôle", "sol") },
    { glifo: "Q q", nome: "cu", som: "só aparece em {{qu}}, que soa “ku”", exemplo: W("quando", "kuándo", "quando") },
    { glifo: "R r", nome: "erre", som: "“r” vibrante, de ponta de língua", dica: "Em {{rr}} a vibração é mais longa.", exemplo: W("rosso", "rósso", "vermelho") },
  ] },

  { t: "h", x: "Combinações de letras" },
  { t: "p", x: "O italiano não tem letras novas, mas tem combinações que valem como sons próprios." },
  { t: "cartoes", itens: [
    { glifo: "ch, gh", som: "antes de e, i: “k” e “g” duros", dica: "O H serve para manter o som duro.", exemplo: W("chiave", "kiáve", "chave") },
    { glifo: "sc", som: "antes de e, i: “ch” de chuveiro. Antes de a, o, u: “sk”", dica: "{{sce}} = chê, {{sci}} = chi.", exemplo: W("scena", "chéna", "cena") },
    { glifo: "gn", som: "“nh” de banho", exemplo: W("gnocchi", "nhókki", "nhoque") },
    { glifo: "gl", som: "“lh” de filho (antes de i)", exemplo: W("famiglia", "famílha", "família") },
    { glifo: "ci, gi + a, o, u", som: "o I não soa: serve só para amolecer o c e o g", dica: "{{ciao}} se lê tchao. É dele que vem o nosso “tchau”.", exemplo: W("ciao", "tchao", "oi, tchau") },
    { glifo: "consoante dupla", som: "pronuncia-se mais longa e muda a palavra", dica: "{{caro}} (querido) é diferente de {{carro}} (carro).", exemplo: W("anno", "ánno", "ano") },
  ] },
  { t: "h3", x: "As cinco letras estrangeiras" },
  { t: "p", x: "{{J}}, {{K}}, {{W}}, {{X}} e {{Y}} existem no alfabeto escrito, mas só aparecem em palavras de outras línguas: {{jazz}}, {{kiwi}}, {{whisky}}, {{taxi}}, {{yogurt}}." },

  { t: "h", x: "Regras para ler direito" },
  { t: "lista", itens: [
    "Cada letra soa sempre do mesmo jeito, com as exceções acima. O italiano é uma das línguas mais regulares para ler.",
    "A maioria das palavras tem acento na penúltima sílaba: {{cosa}}, {{bello}}, {{amico}}.",
    "O acento gráfico (grave) marca o final tônico: {{città}}, {{caffè}}, {{perché}}.",
    "Consoantes duplas se pronunciam duas vezes: {{pizza}}, {{nonno}}, {{birra}}.",
  ] },

  { t: "h", x: "Leia em voz alta" },
  { t: "palavras", titulo: "Palavras para treinar", itens: [W("ciao", "tchao", "oi, tchau"), W("pizza", "píttsa", "pizza"), W("gelato", "djeláto", "sorvete"), W("gnocchi", "nhókki", "nhoque"), W("famiglia", "famílha", "família"), W("scena", "chéna", "cena"), W("chiave", "kiáve", "chave"), W("ghiaccio", "guiátcho", "gelo"), W("grazie", "gráttsie", "obrigado"), W("buongiorno", "buondjórno", "bom dia"), W("quando", "kuándo", "quando"), W("amico", "amíko", "amigo"), W("città", "tchittá", "cidade"), W("birra", "bírra", "cerveja"), W("zero", "dzéro", "zero")] },
];

const exercicios = [
  Q("it-1", "Como se lê {{ce}} em {{cena}}?", "“tchê”", ["“sê”", "“kê”", "“chê”"], "Antes de e e i, o C italiano soa “tch”: tchêna.", "cena"),
  Q("it-2", "Como se lê {{gi}} em {{gelato}}?", "“dj”", ["“gue”", "“j” de janela", "“ch”"], "Antes de e e i, o G italiano soa “dj”: djelato.", "gelato"),
  Q("it-3", "O que acontece com o {{h}}?", "é mudo", ["soa “r”", "soa “x”", "soa “h” inglês"], "O H é sempre mudo em italiano: {{hai}} se lê ai."),
  Q("it-4", "Como se lê esta palavra?", "nhókki", ["gnóki", "gnoqui", "nóki"], "{{gn}} soa “nh” de banho.", "gnocchi"),
  Q("it-5", "Como se lê {{ch}} em {{chiave}}?", "“k”", ["“ch”", "“tch”", "“x”"], "Antes de e e i, o {{ch}} soa “k”: kiáve.", "chiave"),
  Q("it-6", "Como se lê {{sc}} em {{scena}}?", "“ch”, como em chuveiro", ["“sk”", "“s”", "“ts”"], "{{sce}} e {{sci}} soam “chê” e “chi”.", "scena"),
  Q("it-7", "O que o {{z}} costuma soar em {{pizza}}?", "“ts”", ["“z” de zebra", "“s”", "“x”"], "O Z italiano soa “ts” ou “dz”, nunca como o Z de “zebra” sozinho.", "pizza"),
  Q("it-8", "Como se lê {{ciao}}?", "tchao", ["siao", "tiao", "chao"], "O I não soa: serve para amolecer o C. De {{ciao}} vem o nosso “tchau”.", "ciao"),
  Q("it-9", "Quantas letras tem o alfabeto italiano tradicional?", "21", ["26", "23", "30"], "São 21 letras. {{J K W X Y}} só aparecem em palavras estrangeiras."),
  Q("it-10", "O que as consoantes duplas mudam?", "a pronúncia (mais longa) e às vezes o significado", ["só a escrita", "o acento", "nada"], "{{caro}} (querido) e {{carro}} (carro) são palavras diferentes."),
];

export const ITALIANO: Alfabeto = {
  id: "it", slug: "alfabeto-italiano", idioma: "italiano", lang: "it",
  titulo: "Alfabeto italiano e pronúncia: guia grátis",
  h1: "Alfabeto italiano: as letras e os sons, em uma página",
  descricao: "O alfabeto italiano para quem fala português: as letras que soam como as nossas, c e g antes de e/i, h mudo, gn, gl, sc e as consoantes duplas, com áudio.",
  lead: "As letras do italiano numa página só: as que soam como no português, as que enganam e as combinações que mudam o som, com áudio e palavras para ler.",
  minutos: 20,
  ensina: "Alfabeto italiano e pronúncia das letras e combinações de letras, para falantes de português",
  blocos, exercicios,
};
