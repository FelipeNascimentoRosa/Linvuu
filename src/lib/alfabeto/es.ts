// Alfabeto e pronúncia do espanhol para quem fala português.
// Estado: rascunho sem revisão humana. Pedir revisão de falante de espanhol antes de divulgar.
import { Q, W, type Alfabeto, type Bloco } from "./base.ts";

type Tipo = "igual" | "engana" | "novo";
const ROTULO: Record<Tipo, string> = { igual: "parece e soa como no português", engana: "parece, mas soa diferente", novo: "não existe em português" };
// [letra, nome em espanhol, como se diz em português, relação com o português]
const ALFABETO: [string, string, string, Tipo][] = [
  ["A a", "a", "a", "igual"], ["B b", "be", "bê", "igual"], ["C c", "ce", "sê (thê na Espanha)", "engana"], ["D d", "de", "dê", "engana"], ["E e", "e", "ê", "igual"],
  ["F f", "efe", "éfe", "igual"], ["G g", "ge", "rrê (j espanhol)", "engana"], ["H h", "hache", "átche", "engana"], ["I i", "i", "i", "igual"], ["J j", "jota", "rrôta (j espanhol)", "engana"],
  ["K k", "ka", "ká", "igual"], ["L l", "ele", "éle", "igual"], ["M m", "eme", "éme", "igual"], ["N n", "ene", "éne", "igual"], ["Ñ ñ", "eñe", "énhe", "novo"],
  ["O o", "o", "ô", "igual"], ["P p", "pe", "pê", "igual"], ["Q q", "cu", "ku", "engana"], ["R r", "erre", "érre", "engana"], ["S s", "ese", "ése", "engana"],
  ["T t", "te", "tê", "igual"], ["U u", "u", "u", "igual"], ["V v", "uve", "úbe", "engana"], ["W w", "uve doble", "úbe dóble", "engana"], ["X x", "equis", "ékis", "engana"],
  ["Y y", "ye", "iê", "engana"], ["Z z", "zeta", "sêta", "engana"],
];

const blocos: Bloco[] = [
  { t: "p", x: "O alfabeto espanhol tem 27 letras: as 26 do português mais o {{ñ}}. As combinações {{ch}} e {{ll}} já não contam como letras separadas, mas continuam com som próprio. O espanhol é muito regular e parecido com o português, e é justamente por isso que algumas diferenças pegam: o {{j}} e o {{g}} antes de {{e i}} soam com um som áspero de garganta, parecido com o “r” de “rato” em boa parte do Brasil, o {{v}} soa como {{b}}, o {{h}} é mudo e o {{z}} não soa “z”. Esta página reúne as letras que parecem com as nossas e as que não parecem, com áudio." },
  { t: "tabela", titulo: "As 27 letras do alfabeto espanhol", cabecalho: ["Letra", "Nome", "Como se diz", "Em relação ao português"], linhas: ALFABETO.map(([a, b, c, d]) => [a, b, c, ROTULO[d]]) },

  { t: "h", x: "Letras que parecem com as do português" },
  { t: "h3", x: "Parecem e soam como no português" },
  { t: "p", x: "As consoantes {{f k l m n p t}} e as cinco vogais soam como no português. O {{l}} é sempre “l”, nunca “u” no fim da palavra: {{sol}} não soa “sou”. As vogais espanholas são sempre puras: não são nasais e não enfraquecem no fim da palavra. {{lobo}} termina em “o” (nunca “u”), e {{leche}} termina em “e” (nunca “i”)." },
  { t: "palavras", itens: [W("mesa", "mêsa", "mesa"), W("pan", "pan", "pão"), W("lobo", "lôbo", "lobo"), W("tiempo", "tiêmpo", "tempo"), W("mano", "máno", "mão"), W("fiesta", "fiésta", "festa"), W("pelo", "pêlo", "cabelo")] },
  { t: "h3", x: "Parecem, mas soam diferente" },
  { t: "cartoes", itens: [
    { glifo: "J j", nome: "jota", som: "como o “r” de “rato” em boa parte do Brasil, só que raspado, de garganta", dica: "Nunca soa “j” de janela.", exemplo: W("jamón", "rramón", "presunto") },
    { glifo: "G g", nome: "ge", som: "antes de a, o, u: “g” de gato. Antes de e, i: como o J espanhol", dica: "{{gente}} = rrénte. Para manter o “g” duro diante de e, i, escreve-se {{gu}}: {{guerra}} = guérra.", exemplo: W("gente", "rrênte", "gente") },
    { glifo: "C c", nome: "ce", som: "antes de a, o, u: “k”. Antes de e, i: “s” (América) ou “th” inglês (Espanha)", dica: "Na América, {{ce}} e {{ci}} soam “se” e “si”, como no português.", exemplo: W("cerveza", "servêsa", "cerveja") },
    { glifo: "Z z", nome: "zeta", som: "“s” na América; “th” inglês na Espanha", dica: "Nunca soa “z”.", exemplo: W("zapato", "sapáto", "sapato") },
    { glifo: "V v / B b", nome: "uve / be", som: "os dois soam “b”", dica: "Em espanhol não existe o “v” de “vida”. {{vaca}} e {{baca}} soam igual.", exemplo: W("vaca", "báka", "vaca") },
    { glifo: "H h", nome: "hache", som: "mudo", dica: "Nunca se pronuncia: {{hola}} se lê ôla.", exemplo: W("hola", "ôla", "oi") },
    { glifo: "S s", nome: "ese", som: "“s” sempre", dica: "Nunca soa “z”, nem entre vogais (como o S de “casa” no português).", exemplo: W("casa", "kása", "casa") },
    { glifo: "D d", nome: "de", som: "“d” no começo; entre vogais e no fim, mais suave, com a língua entre os dentes", dica: "Como o “th” de “this” em inglês.", exemplo: W("dedo", "dêdo", "dedo") },
    { glifo: "R r / rr", nome: "erre", som: "{{r}} entre vogais: batida única, como em “caro”. No começo da palavra e em {{rr}}: vibração forte", dica: "O {{rr}} espanhol vibra com a língua; não é o “rr” de garganta de “carro” no Brasil.", exemplo: W("perro", "pérro", "cachorro") },
    { glifo: "Y y", nome: "ye", som: "no começo da sílaba, como “i” rápido ou “dj”; sozinho e no fim, “i”", exemplo: W("yo", "iô", "eu") },
    { glifo: "X x", nome: "equis", som: "“ks”, como em táxi; em palavras como México soa como o J espanhol", exemplo: W("taxi", "táksi", "táxi") },
  ] },

  { t: "h", x: "Letras e sinais que o português não tem" },
  { t: "cartoes", itens: [
    { glifo: "Ñ ñ", nome: "eñe", som: "“nh” de banho", dica: "O til sobre o N é parte da letra.", exemplo: W("año", "ánho", "ano") },
    { glifo: "ü", nome: "diéresis", som: "só aparece em {{güe}} e {{güi}}: o U soa", dica: "{{pingüino}} = pinguíno.", exemplo: W("pingüino", "pinguíno", "pinguim") },
    { glifo: "´ (tilde)", som: "marca a sílaba tônica", dica: "Não muda o som da vogal.", exemplo: W("canción", "kansiôn", "canção") },
    { glifo: "¿ ?  ¡ !", som: "as interrogações e exclamações abrem de cabeça para baixo", dica: "Abrem a pergunta ou a exclamação.", exemplo: W("¿cómo estás?", "kômo estás", "como você está?") },
  ] },

  { t: "h", x: "Combinações de letras" },
  { t: "cartoes", itens: [
    { glifo: "ch", som: "“tch” de tchau", exemplo: W("chico", "tchíko", "garoto") },
    { glifo: "ll", som: "na maior parte do mundo, como o Y de {{yo}}; em algumas regiões, “lh”", exemplo: W("calle", "káie", "rua") },
    { glifo: "qu", som: "“k”: só antes de e, i", exemplo: W("queso", "késo", "queijo") },
    { glifo: "gu", som: "“g” duro antes de e, i (o U não soa)", exemplo: W("guerra", "guérra", "guerra") },
    { glifo: "rr", som: "vibração forte da língua", exemplo: W("carro", "kárro", "carro") },
  ] },

  { t: "h", x: "Regras para ler direito" },
  { t: "lista", itens: [
    "O espanhol se lê como se escreve: cada letra tem seu som, e as vogais são sempre claras.",
    "O {{b}} e o {{v}} soam igual, como “b”.",
    "O {{h}} é mudo e o {{s}} nunca soa “z”.",
    "A palavra sem acento escrito termina em vogal, {{n}} ou {{s}}: tônica na penúltima ({{casa}}, {{hablan}}). Termina em outra consoante: tônica na última ({{ciudad}}, {{hablar}}). Quando foge dessas regras, o acento escrito avisa ({{canción}}, {{teléfono}}).",
  ] },

  { t: "h", x: "Leia em voz alta" },
  { t: "palavras", titulo: "Palavras para treinar", itens: [W("hola", "ôla", "oi"), W("gracias", "grásias", "obrigado"), W("jamón", "rramón", "presunto"), W("queso", "késo", "queijo"), W("chico", "tchíko", "garoto"), W("calle", "káie", "rua"), W("año", "ánho", "ano"), W("guerra", "guérra", "guerra"), W("pingüino", "pinguíno", "pinguim"), W("zapato", "sapáto", "sapato"), W("cerveza", "servêsa", "cerveja"), W("vaca", "báka", "vaca"), W("perro", "pérro", "cachorro"), W("yo", "iô", "eu"), W("México", "mérriko", "México")] },
];

const exercicios = [
  Q("es-1", "Como se lê {{j}} em {{jamón}}?", "como o “r” de “rato”, raspado", ["“j” de janela", "“dj”", "“ch”"], "O J espanhol é um som áspero de garganta, parecido com o R de “rato”.", "jamón"),
  Q("es-2", "O que acontece com o {{h}}?", "é mudo", ["soa “r”", "soa “x”", "soa “h” inglês"], "O H espanhol nunca se pronuncia: {{hola}} se lê ôla.", "hola"),
  Q("es-3", "Como soa o {{v}} de {{vaca}}?", "como “b”", ["como “v” de vida", "como “f”", "como “u”"], "Em espanhol o V e o B soam igual: báka.", "vaca"),
  Q("es-4", "Como se lê {{ñ}} em {{año}}?", "“nh”", ["“n”", "“ng”", "“ny”"], "O Ñ espanhol soa como o “nh” de banho.", "año"),
  Q("es-5", "Como se lê {{ch}} em {{chico}}?", "“tch”", ["“ch” de chuveiro", "“k”", "“s”"], "O {{ch}} espanhol soa “tch”: tchíko.", "chico"),
  Q("es-6", "Como se lê {{gente}}?", "rrênte", ["guênte", "jênte", "gente"], "Antes de e e i, o G espanhol soa como o J espanhol.", "gente"),
  Q("es-7", "Como se lê {{gu}} em {{guerra}}?", "“g” duro; o U não soa", ["“gu”", "“j”", "“gv”"], "Para manter o G duro diante de e e i, escreve-se {{gu}}.", "guerra"),
  Q("es-8", "Qual é o som do {{s}} de {{casa}} em espanhol?", "“s”, nunca “z”", ["“z” entre vogais", "“ch”", "“ts”"], "O S espanhol é sempre “s”: kása.", "casa"),
  Q("es-9", "O que o sinal {{¿}} faz?", "abre a pergunta", ["fecha a pergunta", "marca a sílaba tônica", "indica uma letra muda"], "Em espanhol, perguntas e exclamações abrem de cabeça para baixo."),
  Q("es-10", "Qual é a diferença entre {{pero}} e {{perro}}?", "o {{rr}} vibra forte; o {{r}} é uma batida só", ["não há diferença", "o {{rr}} é mudo", "o {{r}} é mudo"], "{{pero}} (mas) tem uma batida de língua; {{perro}} (cachorro) tem vibração forte.", "perro"),
];

export const ESPANHOL: Alfabeto = {
  id: "es", slug: "alfabeto-espanhol", idioma: "espanhol", lang: "es",
  titulo: "Alfabeto espanhol e pronúncia: guia grátis",
  h1: "Alfabeto espanhol: as letras e os sons, em uma página",
  descricao: "O alfabeto espanhol para quem fala português: as letras que soam como as nossas, as que enganam (j, g, v, h, z), o ñ e as combinações, com áudio.",
  lead: "As letras do espanhol numa página só: as que soam como no português, as que enganam e as que o português não tem, com som, áudio e palavras para ler.",
  minutos: 25,
  ensina: "Alfabeto espanhol e pronúncia das letras e combinações de letras, para falantes de português",
  blocos, exercicios,
};
