// Alfabeto russo (cirílico) para quem fala português. Conferido contra o livro de gramática de russo da Coleção Linvuu
// (Aula 1) e contra a referência de fonética «Russian phonology» (Wikipedia, consultada em 13/11/2026) para: Ж Ш Ц sempre
// duras e Ч Щ sempre suaves; И depois de Ж, Ш e Ц soa [ɨ]; redução das vogais sem acento; ensurdecimento no fim da palavra
// e diante de consoante surda; Л duro (velarizado); Ж e Ш apicais, levemente labializados; Щ longo e suave.
// Estado: rascunho sem revisão humana do Felipe.
import { Q, W as W0, type Alfabeto, type Bloco, type Cartao, type Exemplo } from "./base.ts";

// Palavras de uma sílaba também levam o acento (кóт = kót): o aluno sempre vê onde cai a força.
const VOGAL = /[аеиоуыэюя]/i;
const acentuarMono = (t: string) => {
  if (t.includes("'") || t.includes("\u0301") || /ё/i.test(t) || t.length < 2) return t;
  const vogais = [...t].filter((c) => VOGAL.test(c));
  return vogais.length === 1 ? t.replace(VOGAL, (v) => `${v}'`) : t;
};
const LEITURA_MONO: Record<string, string> = { kot: "kót", most: "móst", dom: "dóm", tam: "tám", nos: "nós", brat: "brát", moi: "mói", tchas: "tchás", borshsh: "bórshsh", my: "mý", tom: "tóm", mak: "mák", takt: "tákt", son: "són", khor: "khór", vot: "vót", kto: "któ", sok: "sók", bank: "bánk", fkhot: "fkhót" };
const W = (txt: string, leitura: string, pt: string): Exemplo => { const a = acentuarMono(txt); return W0(a, a !== txt ? (LEITURA_MONO[leitura] ?? leitura) : leitura, pt); };

type Grupo = "igual" | "engana" | "conhecido" | "novo" | "sinal";
type L = { m: string; n: string; nome: string; grupo: Grupo; som: string; dica: string; ex: Exemplo };
const l = (m: string, n: string, nome: string, grupo: Grupo, som: string, dica: string, ex: Exemplo): L => ({ m, n, nome, grupo, som, dica, ex });

/** As 33 letras, na ordem do alfabeto. */
export const LETRAS_RU: L[] = [
  l("А", "а", "a", "igual", "“a” de casa", "Sem acento fica mais curta, mas continua “a”.", W("ма'ма", "máma", "mamãe")),
  l("Б", "б", "bé", "conhecido", "“b” de bola", "Lembra um 6 com a ponta virada. É o B.", W("брат", "brat", "irmão")),
  l("В", "в", "vé", "engana", "“v” de vida", "Parece um B, mas é V.", W("вода'", "vadá", "água")),
  l("Г", "г", "gué", "conhecido", "“g” de gato", "Sempre duro, nunca “j”. Lembra a gama grega.", W("газе'та", "gaziéta", "jornal")),
  l("Д", "д", "dé", "conhecido", "“d” de dado", "Parece uma casinha com pés. Diante do “i” continua “d”: não vira “dj”.", W("дом", "dom", "casa")),
  l("Е", "е", "iê", "engana", "no início, “iê”; depois de consoante, geralmente indica sua suavização", "Parece um E. No início de palavra, e depois de vogal ou sinal, geralmente representa “iê”; depois de consoante, normalmente indica que ela é suave (не'т). Sem acento, a vogal pode enfraquecer.", W("не'бо", "niéba", "céu")),
  l("Ё", "ё", "iô", "conhecido", "“iô”", "É o Е com dois pontinhos, que fazem parte da letra. Leva sempre o acento. Em textos comuns os pontinhos costumam ser omitidos; aqui aparecem.", W("ёлка", "iólka", "pinheiro de Natal")),
  l("Ж", "ж", "jé", "novo", "como o “j” de janela, só que mais grosso", "Ponta da língua recuada e lábios levemente projetados. Sempre dura. Parece um inseto.", W("журна'л", "jurnál", "revista")),
  l("З", "з", "zé", "conhecido", "“z” de zebra", "Parece o número 3.", W("зима'", "zimá", "inverno")),
  l("И", "и", "i", "conhecido", "“i” de idade", "Parece um N espelhado.", W("игра'", "igrá", "jogo")),
  l("Й", "й", "i krátkoie", "conhecido", "um “i” rápido, como o final de “pai”", "É o И com um tracinho em cima, que faz parte da letra. Pode aparecer depois de vogal, como em мой, ou no início de palavras, como em йод.", W("мой", "moi", "meu")),
  l("К", "к", "ká", "igual", "“k” (como o C de casa)", "Igual ao português.", W("кот", "kot", "gato")),
  l("Л", "л", "él", "conhecido", "“l” de lua, em qualquer posição", "No fim da palavra não vira “u”, como o L de “mil” no Brasil: сто'л é stól. Parece um chapéu com pernas.", W("ла'мпа", "lámpa", "lâmpada")),
  l("М", "м", "ém", "igual", "“m” de mãe", "Igual ao português.", W("мост", "most", "ponte")),
  l("Н", "н", "én", "engana", "“n” de nariz", "Parece um H, mas é N.", W("нос", "nos", "nariz")),
  l("О", "о", "ô", "igual", "“o” de bola, com acento; “a” curto, sem acento", "É a regra mais importante dos primeiros dias; veja “Duas regras para ler direito”.", W("дом", "dom", "casa")),
  l("П", "п", "pé", "conhecido", "“p” de pai", "Parece um portão. É o pi grego.", W("па'па", "pápa", "papai")),
  l("Р", "р", "ér", "engana", "“r” de ponta de língua, que vibra", "Como o R de “prato”, mas com batidas repetidas. Nunca é o “r” de garganta de “rato”. Parece um P, mas é R.", W("рука'", "ruká", "mão")),
  l("С", "с", "és", "engana", "geralmente “s” de sapo", "Parece um C, mas geralmente soa “s”, inclusive entre vogais. Diante de consoante sonora, pode soar “z” por assimilação.", W("соба'ка", "sabáka", "cachorro")),
  l("Т", "т", "té", "igual", "“t” de tatu", "Diante do “i” continua “t”: não vira “tch”, como o T de “tia” em boa parte do Brasil.", W("там", "tam", "lá")),
  l("У", "у", "u", "engana", "“u” de uva", "Parece um Y, mas é U.", W("у'тро", "útra", "manhã")),
  l("Ф", "ф", "ef", "conhecido", "“f” de faca", "Parece um círculo com uma haste: é o fi grego.", W("фо'то", "fóta", "foto")),
  l("Х", "х", "khá", "engana", "“kh”: um sopro áspero, de garganta", "Parecido com o R de “rato” em boa parte do Brasil, mais raspado e sem vibração. Parece um X, mas não é “ks” nem “ch”.", W("хорошо'", "kharashó", "bem")),
  l("Ц", "ц", "tsé", "novo", "“ts” de tsunami", "Sempre dura. Parece um U com uma perninha embaixo.", W("лицо'", "litsó", "rosto")),
  l("Ч", "ч", "tché", "novo", "“tch” de tchau, mais suave", "Língua mais alta que no “tch” do português. Sempre suave. Parece uma cadeirinha.", W("час", "tchas", "hora")),
  l("Ш", "ш", "chá", "novo", "um “ch” mais grosso que o de chuveiro", "Ponta da língua recuada e lábios levemente projetados. Sempre dura. Parece um garfo de três dentes.", W("шко'ла", "shkóla", "escola")),
  l("Щ", "щ", "shchá", "novo", "um “ch” longo e suave", "Língua mais à frente e mais alta que no Ш, som prolongado, como um “xi” esticado. Sempre suave. É o Ш com uma perninha.", W("борщ", "borshsh", "sopa de beterraba")),
  l("Ъ", "ъ", "tviórdyi znak", "sinal", "sem som: separa", "O sinal duro. Raro: aparece entre um prefixo e uma vogal branda, que então soa com “i” inteiro (подъе'зд = pad-iést).", W("подъе'зд", "padiést", "entrada de prédio")),
  l("Ы", "ы", "y", "novo", "um “i” de língua recuada", "Diga “i” e leve a língua para trás, sem arredondar os lábios. Quase nunca começa palavra e vem depois de consoante dura.", W("мы", "my", "nós")),
  l("Ь", "ь", "miákhki znak", "sinal", "sem som: amolece", "O sinal brando. Deixa mole a consoante anterior, com a língua subindo ao céu da boca, num efeito parecido com o de “nh” e “lh”, só que mais leve.", W("день", "dién’", "dia")),
  l("Э", "э", "é", "conhecido", "“é” aberto, como em café", "Parece um E espelhado. Aparece no começo de palavras (э'то) e em empréstimos.", W("э'то", "éta", "isto")),
  l("Ю", "ю", "iu", "conhecido", "“iu”", "Parece um I colado a um O, mas lê-se “iu”. Para “iô”, a letra é Ё.", W("ю'мор", "iúmar", "humor")),
  l("Я", "я", "ia", "conhecido", "“ia”", "Parece um R espelhado. Sem acento fica fraca, perto de “i”.", W("я", "ia", "eu")),
];

const cartao = (x: L): Cartao => ({ glifo: `${x.m} ${x.n}`, nome: x.nome, som: x.som, dica: x.dica, exemplo: x.ex });
const doGrupo = (g: Grupo) => LETRAS_RU.filter((x) => x.grupo === g).map(cartao);

const blocos: Bloco[] = [
  { t: "h", x: "Letras que parecem com as do português" },
  { t: "h3", x: "Parecem e soam como no português: А К М О Т" },
  { t: "p", x: "Cinco letras iguais na forma e no som. Com elas você já lê palavras russas inteiras (veja a lista no fim da página)." },
  { t: "cartoes", itens: doGrupo("igual") },
  { t: "h3", x: "Parecem, mas soam diferente: В Е Н Р С У Х" },
  { t: "p", x: "Aqui está o único perigo de verdade do começo: sete letras que você vai achar que conhece e que soam diferente. Desconfie de toda letra russa que parece latina." },
  { t: "tabela", titulo: "Para fixar", cabecalho: ["Parece", "Mas é", "Pense em"], linhas: [["В", "V", "V de vida"], ["Е", "IÊ", "iê-iê"], ["Н", "N", "N de nariz"], ["Р", "R (de ponta de língua)", "R de prato"], ["С", "S", "S de sapo"], ["У", "U", "U de uva"], ["Х", "KH (sopro áspero)", "R inicial de rato"]] },
  { t: "cartoes", itens: doGrupo("engana") },

  { t: "h", x: "Letras que não parecem com as do português" },
  { t: "h3", x: "Formas novas, sons que você já conhece" },
  { t: "p", x: "Treze letras têm formas novas, mas o som já é seu. O trabalho é só ligar o desenho ao som. Muitas lembram letras gregas (Г, Д, Л, П, Ф)." },
  { t: "cartoes", itens: doGrupo("conhecido") },
  { t: "h3", x: "Formas novas e sons novos: Ж Ц Ч Ш Щ Ы" },
  { t: "p", x: "Seis letras têm sons que o português não tem exatamente. As aproximações abaixo servem para começar; ouça o áudio e repita." },
  { t: "cartoes", itens: doGrupo("novo") },
  { t: "nota", titulo: "Duras e suaves", x: "Ж, Ш e Ц são sempre duras. Ч e Щ são sempre suaves. Isso vale em qualquer palavra e tem duas consequências para a leitura. Depois de Ж, Ш e Ц a letra И soa como Ы (ци'рк se lê tsyrk; жи'ть, jyt’). E, com acento, a letra Е depois delas soa só “ê”, sem o “i” (це'нтр se lê tsentr; ше'сть, shest’)." },
  { t: "h3", x: "Os dois sinais sem som: Ь e Ъ" },
  { t: "p", x: "Não são letras de som, mas mudam como as vizinhas são lidas." },
  { t: "cartoes", itens: doGrupo("sinal") },

  { t: "h", x: "Vogais duras e brandas" },
  { t: "p", x: "As dez vogais costumam ser apresentadas em cinco pares de escrita. Em geral, Я, Ё, Ю, Е e И indicam que a consoante anterior é suave. Depois de consoante, isso não significa acrescentar um “i” separado: compare ма e мя, ouvindo a diferença na consoante. No início da palavra e depois de vogal, Ь ou Ъ, Я, Ё, Ю e Е geralmente representam um som de “i” breve seguido de vogal. Há consoantes sempre duras ou sempre suaves, vistas acima." },
  { t: "tabela", cabecalho: ["Dura", "Branda", "Exemplo"], linhas: [["А (a)", "Я (ia)", "ма — мя"], ["О (o)", "Ё (iô)", "мо — мё"], ["У (u)", "Ю (iu)", "му — мю"], ["Э (é)", "Е (iê)", "мэ — ме"], ["Ы (y)", "И (i)", "мы — ми"]] },

  { t: "h", x: "Duas regras para ler direito" },
  { t: "h3", x: "1. As vogais sem acento enfraquecem" },
  { t: "lista", itens: [
    "О sem acento geralmente se aproxima de um “a” reduzido: молоко́ se lê aproximadamente malakó e Москва́, maskvá. O som exato varia com a posição na palavra.",
    "Е e Я sem acento ficam fracos, perto de um “i”: метро́ se lê mitró e язы́к se lê iyzýk.",
    "Sob acento, todas as vogais soam com sua cara inteira: до'м se lê dóm.",
  ] },
  { t: "palavras", itens: [W("молоко'", "malakó", "leite"), W("Москва'", "maskvá", "Moscou"), W("метро'", "mitró", "metrô"), W("язы'к", "iyzýk", "língua, idioma")] },
  { t: "h3", x: "2. Consoante sonora no fim da palavra soa surda" },
  { t: "p", x: "No fim da palavra, uma consoante sonora é dita como a surda correspondente: дру'г termina em Г, mas soa drúk. A escrita não muda, só a pronúncia. Esses são os seis pares:" },
  { t: "tabela", cabecalho: ["Sonora", "Soa como", "Exemplo"], linhas: [["Б", "П", "зу'б se lê zúp (dente)"], ["В", "Ф", "ле'в se lê liéf (leão)"], ["Г", "К", "дру'г se lê drúk (amigo)"], ["Д", "Т", "са'д se lê sát (jardim)"], ["Ж", "Ш", "но'ж se lê nósh (faca)"], ["З", "С", "гла'з se lê glás (olho)"]] },
  { t: "p", x: "O mesmo acontece diante de uma consoante surda: ло'жка se lê lóshka. E uma surda diante de uma sonora fica sonora: футбо́л se lê fudból. Л, М, Н, Р e Й não mudam: сто'л se lê stól (mesa)." },

  { t: "h", x: "Leia em voz alta" },
  { t: "p", x: "Comece pelas letras iguais, depois use as que enganam e, por fim, leia placas reais. Leia antes de tocar o áudio." },
  { t: "palavras", titulo: "Só com letras iguais ao português", itens: [W("ма'ма", "máma", "mamãe"), W("кот", "kot", "gato"), W("там", "tam", "lá"), W("том", "tom", "volume"), W("мак", "mak", "papoula"), W("такт", "takt", "compasso"), W("тома'т", "tamát", "tomate"), W("а'том", "átam", "átomo")] },
  { t: "palavras", titulo: "Com as letras que enganam", itens: [W("нет", "niét", "não"), W("нос", "nos", "nariz"), W("сон", "son", "sono"), W("хор", "khor", "coro"), W("вот", "vot", "eis"), W("кто", "kto", "quem"), W("сок", "sok", "suco"), W("мост", "most", "ponte"), W("уро'к", "urók", "aula"), W("у'тро", "útra", "manhã"), W("рука'", "ruká", "mão"), W("ка'рта", "kárta", "mapa"), W("су'мка", "súmka", "bolsa"), W("метро'", "mitró", "metrô"), W("рестора'н", "ristarán", "restaurante")] },
  { t: "palavras", titulo: "Placas e avisos", itens: [W("БАНК", "bank", "banco"), W("ОТЕ'ЛЬ", "atiél’", "hotel"), W("ТЕА'ТР", "tiátr", "teatro"), W("КИНО'", "kinó", "cinema"), W("МУЗЕ'Й", "muzéi", "museu"), W("ПО'ЧТА", "pótchta", "correio"), W("ТАКСИ'", "taksí", "táxi"), W("АПТЕ'КА", "aptiéka", "farmácia"), W("ВХОД", "fkhot", "entrada"), W("ВЫ'ХОД", "výkhat", "saída"), W("ТУАЛЕ'Т", "tualiét", "banheiro"), W("МАГАЗИ'Н", "magazín", "loja"), W("АВТО'БУС", "aftóbus", "ônibus"), W("ВОКЗА'Л", "vagzál", "estação de trem")] },
];

const exercicios = [
  Q("ru-1", "Que som tem a letra В?", "“v” de vida", ["“b” de bola", "“p” de pai", "“f” de faca"], "В parece B, mas é V."),
  Q("ru-2", "Que som tem a letra Н?", "“n” de nariz", ["“h”", "“m”", "“k”"], "Н parece H, mas é N."),
  Q("ru-3", "Que som tem a letra Р?", "“r” de ponta de língua, que vibra", ["“p”", "“d”", "“r” de garganta, como em rato"], "Р parece P, mas é R, com a ponta da língua."),
  Q("ru-4", "A letra С soa como o S de “casa”, entre vogais?", "Não: entre vogais, soa “s”", ["Sim, soa “z” entre vogais", "Sim, soa “ts”", "Não: soa “k”"], "Entre vogais, С soa “s”. Antes de consoante sonora, pode soar “z” por assimilação."),
  Q("ru-5", "Que som tem a letra Х?", "“kh”, um sopro áspero de garganta", ["“ks”", "“ch” de chuveiro", "“x” de xadrez"], "Х parece X, mas é um sopro áspero, parecido com o R de “rato”."),
  Q("ru-6", "Qual letra soa como o “j” de janela, só que mais grossa?", "Ж", ["Ш", "З", "Щ"], "Ж é o par sonoro do Ш: ponta da língua recuada, lábios levemente projetados."),
  Q("ru-7", "Qual letra é um “ch” longo e suave, e tem uma perninha embaixo?", "Щ", ["Ш", "Ч", "Ц"], "Щ é o Ш com a perninha, mais longo e suave."),
  Q("ru-8", "Quais letras são sempre duras?", "Ж, Ш e Ц", ["Ч e Щ", "Ж e Ч", "Ш e Щ"], "Ж, Ш e Ц são sempre duras; Ч e Щ são sempre suaves."),
  Q("ru-9", "Qual sinal não tem som e deixa mole a consoante anterior?", "Ь", ["Ъ", "Ы", "Й"], "O sinal brando (Ь) amolece a consoante que vem antes."),
  Q("ru-10", "Como se lê esta palavra?", "ristarán", ["restoran", "ristórán", "pestoran"], "О sem acento soa “a”, e Е sem acento fica perto de “i”. O acento está no А.", "рестора'н"),
  Q("ru-11", "Como se lê esta palavra?", "drúk", ["drug", "drut", "drak"], "O Г no fim da palavra soa K.", "дру'г"),
  Q("ru-12", "Como se lê esta palavra?", "malakó", ["molokó", "mólako", "malakô"], "Os dois primeiros О não têm acento e soam “a”. O acento está no último.", "молоко'"),
  Q("ru-13", "Como se lê esta palavra?", "stól", ["stou", "stót", "stór"], "O Л é sempre “l”, nunca “u”. E ele não ensurdece no fim da palavra.", "сто'л"),
  Q("ru-14", "O que significa esta placa?", "saída", ["entrada", "banheiro", "loja"], "ВЫ'ХОД é saída; ВХО'Д é entrada.", "ВЫ'ХОД"),
  Q("ru-15", "O que significa esta placa?", "farmácia", ["banco", "hotel", "correio"], "АПТЕ'КА é farmácia.", "АПТЕ'КА"),
  Q("ru-16", "Qual é o par de vogal dura e vogal branda correto?", "О e Ё", ["А e Ю", "У e Я", "Э e И"], "Os pares são А–Я, О–Ё, У–Ю, Э–Е e Ы–И."),
];

export const RUSSO: Alfabeto = {
  id: "ru", slug: "alfabeto-russo", idioma: "russo", lang: "ru",
  titulo: "Alfabeto e 200 palavras em russo com áudio",
  h1: "Aprenda o alfabeto russo e 200 palavras do dia a dia",
  descricao: "Aprenda o alfabeto russo, ouça a pronúncia e estude 200 palavras em russo com tradução em português. Material gratuito para começar do zero.",
  lead: "Aprenda a ler as 33 letras do cirílico e pratique com 200 palavras úteis em russo, áudio e tradução para o português. Tudo gratuito e sem cadastro.",
  minutos: 40,
  ensina: "Leitura do alfabeto cirílico russo e vocabulário cotidiano, para falantes de português",
  blocos, exercicios,
};
