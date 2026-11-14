// Alfabeto e pronúncia do alemão para quem fala português.
// Estado: rascunho sem revisão humana. Pedir revisão de falante de alemão antes de divulgar.
import { Q, W, type Alfabeto, type Bloco } from "./base.ts";

type Tipo = "igual" | "engana" | "novo";
const ROTULO: Record<Tipo, string> = { igual: "parece e soa como no português", engana: "parece, mas soa diferente", novo: "não existe em português" };
// [letra, nome em alemão, como se diz em português, relação com o português]
const ALFABETO: [string, string, string, Tipo][] = [
  ["A a", "A", "a", "igual"], ["B b", "Be", "bê", "igual"], ["C c", "Ce", "tsê", "engana"], ["D d", "De", "dê", "igual"], ["E e", "E", "ê", "igual"],
  ["F f", "Ef", "éf", "igual"], ["G g", "Ge", "guê", "igual"], ["H h", "Ha", "há (com sopro)", "engana"], ["I i", "I", "i", "igual"], ["J j", "Jot", "iót", "engana"],
  ["K k", "Ka", "ká", "igual"], ["L l", "El", "él", "igual"], ["M m", "Em", "ém", "igual"], ["N n", "En", "én", "igual"], ["O o", "O", "ô", "igual"],
  ["P p", "Pe", "pê", "igual"], ["Q q", "Ku", "ku", "engana"], ["R r", "Er", "ér", "engana"], ["S s", "Es", "és", "engana"], ["T t", "Te", "tê", "igual"],
  ["U u", "U", "u", "igual"], ["V v", "Vau", "fau", "engana"], ["W w", "We", "vê", "engana"], ["X x", "Ix", "iks", "igual"], ["Y y", "Ypsilon", "ípsilon", "engana"],
  ["Z z", "Zet", "tset", "engana"], ["Ä ä", "Ä", "é aberto (ä)", "novo"], ["Ö ö", "Ö", "ö (ê com lábios de u)", "novo"], ["Ü ü", "Ü", "ü (i com lábios de u)", "novo"], ["ß", "Eszett", "és-tsét", "novo"],
];

const blocos: Bloco[] = [
  { t: "p", x: "O alfabeto alemão tem as mesmas 26 letras do português, mais quatro: {{ä}}, {{ö}}, {{ü}} e {{ß}}. Boa parte delas soa como no português, mas algumas pegadinhas mudam tudo: {{w}} soa “v”, {{v}} soa “f”, {{z}} soa “ts” e {{j}} soa “i”. Esta página reúne as letras que parecem com as nossas e as que não parecem, com áudio." },
  { t: "nota", titulo: "Substantivos com maiúscula", x: "Em alemão todo substantivo se escreve com inicial maiúscula, no meio da frase também: {{das Haus}} (a casa), {{der Hund}} (o cachorro)." },
  { t: "tabela", titulo: "As 30 letras do alfabeto alemão", cabecalho: ["Letra", "Nome", "Como se diz", "Em relação ao português"], linhas: ALFABETO.map(([a, b, c, d]) => [a, b, c, ROTULO[d]]) },

  { t: "h", x: "Letras que parecem com as do português" },
  { t: "h3", x: "Parecem e soam como no português" },
  { t: "p", x: "As vogais {{a e i o u}} e as consoantes {{b d f g k l m n p t x}} soam, em geral, como no português. O {{g}} é sempre duro, como em “gato” (nunca “j”)." },
  { t: "palavras", itens: [W("Hand", "hant", "mão"), W("Land", "lant", "país"), W("Mutter", "múta", "mãe"), W("Katze", "kátse", "gato"), W("Fisch", "fich", "peixe"), W("Name", "náme", "nome"), W("Tag", "tak", "dia")] },
  { t: "h3", x: "Parecem, mas soam diferente" },
  { t: "cartoes", itens: [
    { glifo: "W w", nome: "We", som: "“v” de vida", dica: "O W alemão é o V do português.", exemplo: W("Wasser", "vássa", "água") },
    { glifo: "V v", nome: "Vau", som: "“f” de faca", dica: "Em palavras de origem estrangeira soa “v” (Vase = váze).", exemplo: W("Vater", "fáta", "pai") },
    { glifo: "Z z", nome: "Zet", som: "“ts”, como em tsunami", dica: "Nunca soa “z”. É o som do final de “pizza” em italiano.", exemplo: W("Zeit", "tsait", "tempo") },
    { glifo: "J j", nome: "Jot", som: "“i” rápido, como o Y de “yoga”", dica: "Não soa “j” de janela.", exemplo: W("Junge", "iúnge", "menino") },
    { glifo: "S s", nome: "Es", som: "“z” antes de vogal; “s” nos outros casos", dica: "Sonne = zône (z). Haus = hauss (s no fim).", exemplo: W("Sonne", "zône", "sol") },
    { glifo: "R r", nome: "Er", som: "como o “r” de “rato” (garganta)", dica: "Depois de vogal, no fim da palavra, soa como um “a” curto: Vater = fáta.", exemplo: W("rot", "rôt", "vermelho") },
    { glifo: "H h", nome: "Ha", som: "sopro no começo da palavra", dica: "Como o H do inglês “house”. Depois de vogal não soa: ele só alonga a vogal (sehen = zêen).", exemplo: W("Haus", "hauss", "casa") },
    { glifo: "Y y", nome: "Ypsilon", som: "como o Ü", dica: "Aparece em palavras de origem grega.", exemplo: W("Typ", "tüp", "tipo") },
  ] },

  { t: "h", x: "Letras que o português não tem" },
  { t: "p", x: "Quatro letras com forma nova. Os três pontinhos duplos (o trema alemão, {{Umlaut}}) mudam a vogal." },
  { t: "cartoes", itens: [
    { glifo: "Ä ä", nome: "Ä", som: "“é” aberto, como em café", dica: "É o A com o som de É.", exemplo: W("Käse", "kéze", "queijo") },
    { glifo: "Ö ö", nome: "Ö", som: "diga “ê” com os lábios arredondados, como para dizer “u”", dica: "Não existe em português. Ouça o áudio e repita.", exemplo: W("schön", "chön", "bonito") },
    { glifo: "Ü ü", nome: "Ü", som: "diga “i” com os lábios arredondados, como para dizer “u”", dica: "Também não existe em português. Ouça o áudio e repita.", exemplo: W("über", "übá", "sobre") },
    { glifo: "ß", nome: "Eszett", som: "“ss”, como em passo", dica: "Vem depois de vogal longa ou ditongo: Straße. Depois de vogal curta escreve-se ss: Wasser.", exemplo: W("Straße", "chtrásse", "rua") },
  ] },

  { t: "h", x: "Combinações de letras" },
  { t: "p", x: "Muitos sons do alemão vêm de combinações. Aprenda-as como se fossem letras." },
  { t: "cartoes", itens: [
    { glifo: "sch", som: "“ch” de chuveiro", exemplo: W("Schule", "chúle", "escola") },
    { glifo: "ch", som: "depois de a, o, u: som áspero de garganta; depois de e, i, ä, ö, ü, l, n, r: sopro suave, perto de “hi”", dica: "Dois sons: ach (Buch = bukh) e ich (ich = ich suave).", exemplo: W("Buch", "bukh", "livro") },
    { glifo: "st, sp", som: "no começo da palavra: “cht” e “chp”", dica: "O S vira “ch”.", exemplo: W("Straße", "chtrásse", "rua") },
    { glifo: "ei", som: "“ai”", dica: "Nunca “ei”.", exemplo: W("nein", "nain", "não") },
    { glifo: "ie", som: "“i” longo", dica: "Nunca “ie”.", exemplo: W("Liebe", "líbe", "amor") },
    { glifo: "eu, äu", som: "“oi”", exemplo: W("neu", "noi", "novo") },
    { glifo: "au", som: "“au”", exemplo: W("Haus", "hauss", "casa") },
    { glifo: "qu", som: "“kv”", exemplo: W("Quark", "kvark", "queijo fresco") },
    { glifo: "pf", som: "“p” e “f” juntos, de uma vez", exemplo: W("Pferd", "pfért", "cavalo") },
    { glifo: "ck", som: "“k”", exemplo: W("Zucker", "tsúka", "açúcar") },
  ] },

  { t: "h", x: "Regras para ler direito" },
  { t: "lista", itens: [
    "Consoante sonora no fim da sílaba soa surda: b = p, d = t, g = k. {{Hund}} se lê hunt, {{Tag}} se lê tak, {{ab}} se lê ap. (O russo tem a mesma regra.)",
    "O {{h}} depois de vogal não soa: só alonga a vogal. {{sehen}} se lê zêen.",
    "Vogal duplicada ({{aa}}, {{ee}}, {{oo}}) é longa: {{Boot}} se lê bôt.",
    "{{-er}} no fim da palavra soa como um “a” curto: {{Vater}} se lê fáta, {{Wasser}}, vássa.",
  ] },

  { t: "h", x: "Leia em voz alta" },
  { t: "palavras", titulo: "Palavras para treinar", itens: [W("Haus", "hauss", "casa"), W("Wasser", "vássa", "água"), W("Zeit", "tsait", "tempo"), W("Schule", "chúle", "escola"), W("Straße", "chtrásse", "rua"), W("Vater", "fáta", "pai"), W("Junge", "iúnge", "menino"), W("sieben", "zíben", "sete"), W("Eis", "ais", "sorvete, gelo"), W("neu", "noi", "novo"), W("Käse", "kéze", "queijo"), W("schön", "chön", "bonito"), W("Buch", "bukh", "livro"), W("ich", "ich", "eu"), W("Hund", "hunt", "cachorro")] },
];

const exercicios = [
  Q("de-1", "Que som tem a letra W em alemão?", "“v” de vida", ["“u” de uva", "“f” de faca", "“w” do inglês"], "O W alemão soa “v”: {{Wasser}} se lê vássa."),
  Q("de-2", "Como se lê esta palavra?", "fáta", ["váter", "báter", "váta"], "O V soa “f” e o -er final soa como um “a” curto.", "Vater"),
  Q("de-3", "Que som tem o Z em {{Zeit}}?", "“ts”", ["“z” de zebra", "“s” de sapo", "“dj”"], "O Z alemão sempre soa “ts”.", "Zeit"),
  Q("de-4", "Qual combinação soa como o “ch” de chuveiro?", "sch", ["ch", "sp", "ck"], "{{Schule}} se lê chúle.", "Schule"),
  Q("de-5", "Como se lê {{ei}} em {{nein}}?", "“ai”", ["“ei”", "“i”", "“ê”"], "{{ei}} soa “ai”; {{ie}} soa “i” longo.", "nein"),
  Q("de-6", "O que representa a letra ß?", "“ss”", ["“b”", "“z”", "“sch”"], "O Eszett (ß) é o “ss” depois de vogal longa: {{Straße}} = chtrásse."),
  Q("de-7", "Como se lê esta palavra?", "hunt", ["hund", "hunc", "unt"], "Consoante sonora no fim soa surda: o D soa T.", "Hund"),
  Q("de-8", "Que som tem o J em {{Junge}}?", "“i” rápido, como em iogurte", ["“j” de janela", "“g” de gato", "“dj”"], "O J alemão soa como o “i” de iogurte: iúnge.", "Junge"),
  Q("de-9", "O S de {{Sonne}} soa como...", "“z”", ["“s” de sapo", "“ch”", "“ts”"], "Antes de vogal o S alemão soa “z”: zône.", "Sonne"),
  Q("de-10", "Qual letra se pronuncia como um “i” com os lábios arredondados?", "ü", ["ä", "ö", "ß"], "O ü não existe em português: {{über}} se lê übá."),
];

export const ALEMAO: Alfabeto = {
  id: "de", slug: "alfabeto-alemao", idioma: "alemão", lang: "de",
  titulo: "Alfabeto alemão e pronúncia: guia grátis",
  h1: "Alfabeto alemão: as letras e os sons, em uma página",
  descricao: "O alfabeto alemão para quem fala português: as letras que parecem com as nossas, as que enganam (W, V, Z, J), ä ö ü ß e as combinações, com áudio.",
  lead: "As letras do alemão numa página só: as que soam como no português, as que enganam e as que o português não tem, com som, áudio e palavras para ler.",
  minutos: 25,
  ensina: "Alfabeto alemão e pronúncia das letras e combinações de letras, para falantes de português",
  blocos, exercicios,
};
