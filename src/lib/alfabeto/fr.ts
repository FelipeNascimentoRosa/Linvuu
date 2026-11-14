// Alfabeto e pronúncia do francês para quem fala português.
// Estado: rascunho sem revisão humana. Pedir revisão de falante de francês antes de divulgar.
import { Q, W, type Alfabeto, type Bloco } from "./base.ts";

type Tipo = "igual" | "engana" | "novo";
const ROTULO: Record<Tipo, string> = { igual: "parece e soa como no português", engana: "parece, mas soa diferente", novo: "não existe em português" };
// [letra, nome em francês, como se diz em português, relação com o português]
const ALFABETO: [string, string, string, Tipo][] = [
  ["A a", "a", "a", "igual"], ["B b", "bé", "bê", "igual"], ["C c", "cé", "sê", "igual"], ["D d", "dé", "dê", "igual"], ["E e", "e", "ë (ê fraco)", "engana"],
  ["F f", "effe", "éf", "igual"], ["G g", "gé", "jê", "igual"], ["H h", "hache", "ach", "engana"], ["I i", "i", "i", "igual"], ["J j", "ji", "ji", "igual"],
  ["K k", "ka", "ká", "igual"], ["L l", "elle", "él", "igual"], ["M m", "emme", "ém", "igual"], ["N n", "enne", "én", "igual"], ["O o", "o", "ô", "igual"],
  ["P p", "pé", "pê", "igual"], ["Q q", "ku", "kü", "igual"], ["R r", "erre", "ér", "engana"], ["S s", "esse", "és", "igual"], ["T t", "té", "tê", "igual"],
  ["U u", "u", "ü", "engana"], ["V v", "vé", "vê", "igual"], ["W w", "double vé", "dúbl vê", "engana"], ["X x", "iks", "iks", "igual"], ["Y y", "i grec", "i grék", "engana"],
  ["Z z", "zède", "zéd", "igual"], ["é è ê ë", "accents", "acentos", "novo"], ["à â î ô ù û", "accents", "acentos", "novo"], ["ç", "c cédille", "sê com cedilha", "igual"], ["œ", "e dans l’o", "ê com lábios de o", "novo"],
];

const blocos: Bloco[] = [
  { t: "p", x: "O alfabeto francês tem as mesmas 26 letras do português, mais vogais com acentos e o {{ç}}. A boa notícia: o francês e o português compartilham muitos sons, como o {{j}} (de “janela”), o {{ch}} (de “chuveiro”) e o {{gn}} (de “banho”). A má notícia: vários finais não se pronunciam e as vogais têm sons novos. Esta página reúne as letras que parecem com as nossas e as que não parecem, com áudio." },
  { t: "tabela", titulo: "As letras do alfabeto francês", cabecalho: ["Letra", "Nome", "Como se diz", "Em relação ao português"], linhas: ALFABETO.map(([a, b, c, d]) => [a, b, c, ROTULO[d]]) },

  { t: "h", x: "Letras que parecem com as do português" },
  { t: "h3", x: "Parecem e soam como no português" },
  { t: "p", x: "Muitas letras funcionam como no português: {{b d f k l m n p t v z}} e as vogais {{a i o}}. O {{c}} e o {{g}} seguem a mesma regra: {{ca co cu}} soam “ka ko ku”, {{ce ci}} soam “se si”; {{ga go gu}} soam “ga go gu” e {{ge gi}} soam “je ji”. O {{j}} é o “j” de janela. O {{ç}} soa “s”. O {{qu}} soa “k”. O {{s}} entre vogais soa “z”." },
  { t: "palavras", itens: [W("jardin", "jardẽ", "jardim"), W("café", "kafê", "café"), W("garçon", "garsõ", "garoto"), W("girafe", "jiráf", "girafa"), W("musique", "müzik", "música"), W("rose", "rôz", "rosa"), W("table", "tabl", "mesa")] },
  { t: "h3", x: "Parecem, mas soam diferente" },
  { t: "cartoes", itens: [
    { glifo: "U u", nome: "u", som: "diga “i” com os lábios arredondados, como para dizer “u”", dica: "Não é o “u” do português. Escrevemos “ü” nesta página.", exemplo: W("tu", "tü", "você") },
    { glifo: "R r", nome: "erre", som: "como o “r” de “rato” (garganta)", dica: "Em qualquer posição, não só no começo.", exemplo: W("rue", "rü", "rua") },
    { glifo: "E e", nome: "e", som: "“ë”: um “ê” fraco; no fim da palavra costuma ser mudo", dica: "{{table}} se lê tabl. Com acento tem outro som (veja abaixo).", exemplo: W("le", "lë", "o") },
    { glifo: "H h", nome: "hache", som: "mudo", dica: "Nunca se pronuncia: {{homme}} se lê om.", exemplo: W("homme", "om", "homem") },
    { glifo: "X x", nome: "iks", som: "“ks” (taxi), “gz” (exact) ou mudo no fim (prix)", exemplo: W("taxi", "taksi", "táxi") },
    { glifo: "Y y", nome: "i grec", som: "“i”", dica: "Sozinho, soa como um i.", exemplo: W("pays", "péi", "país") },
    { glifo: "W w", nome: "double vé", som: "“v” ou “u”, só em palavras estrangeiras", exemplo: W("wagon", "vagõ", "vagão") },
  ] },

  { t: "h", x: "Letras e sinais que o português não tem" },
  { t: "p", x: "Os acentos franceses não marcam a sílaba tônica: marcam o som da vogal." },
  { t: "cartoes", itens: [
    { glifo: "é", nome: "e accent aigu", som: "“ê” fechado", exemplo: W("été", "êtê", "verão") },
    { glifo: "è, ê", nome: "accent grave, circonflexe", som: "“é” aberto, como em café", exemplo: W("père", "pér", "pai") },
    { glifo: "à, â, î, ô, û, ù", som: "o acento não muda o som da vogal (ou muda muito pouco)", dica: "Em {{où}} (onde) e {{là}} (lá), o acento só distingue a palavra de outra.", exemplo: W("où", "u", "onde") },
    { glifo: "ë, ï, ü", nome: "tréma", som: "a vogal soa separada da anterior", exemplo: W("Noël", "noél", "Natal") },
    { glifo: "ç", nome: "c cédille", som: "“s”, antes de a, o, u", exemplo: W("français", "frãsé", "francês") },
    { glifo: "œ", som: "“eu”, um “ê” com os lábios de “o”", exemplo: W("œuf", "ëf", "ovo") },
  ] },

  { t: "h", x: "Combinações de letras" },
  { t: "p", x: "No francês, os sons mais característicos vêm de combinações. Os “nasais” (ã, õ, ẽ) são como no português: não se pronuncia o N." },
  { t: "cartoes", itens: [
    { glifo: "ou", som: "“u”", exemplo: W("tout", "tu", "tudo") },
    { glifo: "oi", som: "“uá”", exemplo: W("oiseau", "uazô", "pássaro") },
    { glifo: "eu, œu", som: "“ê” com lábios de o (ë)", exemplo: W("deux", "dë", "dois") },
    { glifo: "au, eau", som: "“ô”", exemplo: W("eau", "ô", "água") },
    { glifo: "ai, ei", som: "“é” aberto", exemplo: W("maison", "mezõ", "casa") },
    { glifo: "an, am, en, em", som: "“ã” nasal", exemplo: W("enfant", "ãfã", "criança") },
    { glifo: "on, om", som: "“õ” nasal", exemplo: W("bon", "bõ", "bom") },
    { glifo: "in, ain, ein", som: "“ẽ” nasal", exemplo: W("pain", "pẽ", "pão") },
    { glifo: "ch", som: "“ch” de chuveiro (como no português)", exemplo: W("chat", "cha", "gato") },
    { glifo: "gn", som: "“nh” de banho (como no português)", exemplo: W("montagne", "mõtanh", "montanha") },
    { glifo: "ill", som: "“iy”", exemplo: W("fille", "fiy", "filha") },
    { glifo: "ph, th", som: "“f” e “t”", exemplo: W("photo", "fôtô", "foto") },
  ] },

  { t: "h", x: "Regras para ler direito" },
  { t: "lista", itens: [
    "A maioria das consoantes finais não se pronuncia: {{petit}} se lê peti, {{grand}} se lê grã, {{trop}} se lê trô. As que costumam soar no fim são {{c r f l}} (ex.: {{sac}}, {{mer}}, {{neuf}}, {{sel}}).",
    "O {{e}} no fim da palavra é mudo: {{table}} se lê tabl.",
    "A sílaba tônica é sempre a última sílaba pronunciada da palavra, e os acentos não a indicam.",
    "O {{h}} nunca se pronuncia.",
  ] },

  { t: "h", x: "Leia em voz alta" },
  { t: "palavras", titulo: "Palavras para treinar", itens: [W("bonjour", "bõjur", "bom dia"), W("merci", "mérsi", "obrigado"), W("rue", "rü", "rua"), W("chat", "cha", "gato"), W("jardin", "jardẽ", "jardim"), W("français", "frãsé", "francês"), W("garçon", "garsõ", "garoto"), W("oiseau", "uazô", "pássaro"), W("fille", "fiy", "filha"), W("pain", "pẽ", "pão"), W("eau", "ô", "água"), W("tout", "tu", "tudo"), W("vin", "vẽ", "vinho"), W("tu", "tü", "você"), W("deux", "dë", "dois")] },
];

const exercicios = [
  Q("fr-1", "O que o francês e o português têm em comum nestas letras?", "o {{j}}, o {{ch}} e o {{gn}} soam igual nas duas línguas", ["o {{u}} soa igual nas duas línguas", "o {{h}} soa igual nas duas línguas", "o {{r}} soa igual nas duas línguas"], "{{jardin}} (j), {{chat}} (ch) e {{montagne}} (gn) têm os mesmos sons do português: “j”, “ch” e “nh”."),
  Q("fr-2", "Como se lê esta palavra?", "tü", ["tu", "tô", "ti"], "O {{u}} francês é um “i” com os lábios arredondados: tü.", "tu"),
  Q("fr-3", "Como se lê esta palavra?", "om", ["hom", "rom", "óm"], "O {{h}} é mudo: {{homme}} se lê om.", "homme"),
  Q("fr-4", "O que representa o {{ç}}?", "“s”", ["“k”", "“ch”", "“j”"], "O cedilha tem o mesmo som do português: {{garçon}} se lê garsõ."),
  Q("fr-5", "Como se lê {{ou}} em {{tout}}?", "“u”", ["“ô”", "“uá”", "“ou”"], "{{ou}} soa “u”: tu.", "tout"),
  Q("fr-6", "Como se lê {{oi}} em {{oiseau}}?", "“uá”", ["“oi”", "“ói”", "“ô”"], "{{oi}} soa “uá”: {{oiseau}} = uazô.", "oiseau"),
  Q("fr-7", "Como se lê esta palavra?", "pẽ", ["pain", "paim", "pãn"], "{{ain}} é um “ẽ” nasal e o N não se pronuncia.", "pain"),
  Q("fr-8", "O que acontece com a maioria das consoantes finais?", "não se pronunciam", ["sempre soam", "soam o dobro", "viram vogais"], "Em {{petit}} e {{grand}} o T e o D finais são mudos. As exceções mais comuns são {{c r f l}}."),
  Q("fr-9", "Qual a sílaba tônica de {{merci}}?", "a última", ["a primeira", "a do meio", "a que tem acento"], "Em francês a tônica é sempre a última sílaba pronunciada; os acentos não a marcam.", "merci"),
  Q("fr-10", "O {{r}} francês soa como...", "o “r” de “rato”, de garganta", ["o “r” de “prato”, com a ponta da língua", "um “l”", "um “h” mudo"], "É o R de garganta, em qualquer posição."),
];

export const FRANCES: Alfabeto = {
  id: "fr", slug: "alfabeto-frances", idioma: "francês", lang: "fr",
  titulo: "Alfabeto francês e pronúncia: guia grátis",
  h1: "Alfabeto francês: as letras e os sons, em uma página",
  descricao: "O alfabeto francês para quem fala português: as letras que soam como as nossas, as que enganam (u, r, h), os acentos e as combinações, com áudio.",
  lead: "As letras do francês numa página só: as que soam como no português, as que enganam e os acentos e combinações que o português não tem, com áudio e palavras para ler.",
  minutos: 25,
  ensina: "Alfabeto francês, acentos e combinações de letras, para falantes de português",
  blocos, exercicios,
};
