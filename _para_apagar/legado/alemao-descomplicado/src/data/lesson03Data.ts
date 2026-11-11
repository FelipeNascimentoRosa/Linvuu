import {
  TopologicalRow,
  ContrastTrap,
  ConjugationRow,
  LexicalTerm,
  ColloquialExpression,
  KeyPoint,
} from '../types';

export const LESSON_03_METADATA = {
  round: 'RODADA 03',
  day: 'DIA 003 DO CRONOGRAMA',
  chapter: 'KAPITEL 1, TEIL B, C e D, p. 21–34',
  title: 'Artigos (Definidos, Indefinidos e Negativos), Possessivos, Satzbau, Verbos haben/sein/werden, Populações & 5 Famílias do Plural',
  nextRound: 'RODADA 04 — DIA 004 (Kapitel 2: No Café, Pedidos, Bebidas e Alimentos, Acusativo Inicial).',
};

// 1.1 O Artikelbestimmung — Artigo Definido, Indefinido e Negativo
export const ARTICLES_DEFINITE = [
  { genero: 'Masculino', singular: 'der Name', plural: 'die Namen', traducao: 'o nome / os nomes' },
  { genero: 'Feminino', singular: 'die Telefonnummer', plural: 'die Telefonnummern', traducao: 'o número de telefone / os números de telefone' },
  { genero: 'Neutro', singular: 'das Kind', plural: 'die Kinder', traducao: 'a criança / as crianças' },
];

export const ARTICLES_INDEFINITE = [
  { genero: 'Masculino', singular: 'ein Vater', plural: 'meine Väter (não há indefinido plural)', traducao: 'um pai / meus pais' },
  { genero: 'Feminino', singular: 'eine Mutter', plural: 'meine Mütter', traducao: 'uma mãe / minhas mães' },
  { genero: 'Neutro', singular: 'ein Kind', plural: 'meine Kinder', traducao: 'uma criança / minhas crianças' },
];

export const ARTICLES_NEGATIVE = [
  { genero: 'Masculino', singular: 'kein Vater', plural: 'keine Väter', traducao: 'nenhum pai / nenhuns pais' },
  { genero: 'Feminino', singular: 'keine Mutter', plural: 'keine Mütter', traducao: 'nenhuma mãe / nenhumas mães' },
  { genero: 'Neutro', singular: 'kein Kind', plural: 'keine Kinder', traducao: 'nenhuma criança / nenhumas crianças' },
];

// 1.2 O Possessivartikel (Artigo Possessivo no Nominativo)
export const POSSESSIVE_ARTICLES = [
  { pronome: 'ich (eu)', masc: 'mein Vater', fem: 'meine Mutter', neutro: 'mein Kind', plural: 'meine Freunde' },
  { pronome: 'du (tu/você)', masc: 'dein Vater', fem: 'deine Mutter', neutro: 'dein Kind', plural: 'deine Freunde' },
  { pronome: 'er (ele)', masc: 'sein Vater', fem: 'seine Mutter', neutro: 'sein Kind', plural: 'seine Freunde' },
  { pronome: 'sie (ela)', masc: 'ihr Vater', fem: 'ihre Mutter', neutro: 'ihr Kind', plural: 'ihre Freunde' },
  { pronome: 'wir (nós)', masc: 'unser Vater', fem: 'unsere Mutter', neutro: 'unser Kind', plural: 'unsere Freunde' },
  { pronome: 'ihr (vós/vocês)', masc: 'euer Vater', fem: 'eure Mutter (perde -e-)', neutro: 'euer Kind', plural: 'eure Freunde' },
  { pronome: 'sie (eles/elas)', masc: 'ihr Vater', fem: 'ihre Mutter', neutro: 'ihr Kind', plural: 'ihre Freunde' },
  { pronome: 'Sie (Sr./Sra. formal)', masc: 'Ihr Vater', fem: 'Ihre Mutter', neutro: 'Ihr Kind', plural: 'Ihre Freunde' },
];

export const CONTRAST_TRAPS_LESSON_3: ContrastTrap[] = [
  {
    portugues: 'meu pai / minha mãe / meu filho / meus pais',
    alemaoCorreto: 'mein Vater (m.) / meine Mutter (f.) / mein Kind (n.) / meine Eltern (pl.)',
    alemaoIncorreto: '*meine Vater / *mein Mutter',
    nota: 'O possessivo no singular termina em -e apenas diante de substantivo feminino ou no plural.',
  },
  {
    portugues: 'o pai dele (dele = er)',
    alemaoCorreto: 'sein Vater',
    alemaoIncorreto: '*ihr Vater (para ele)',
    nota: 'Brasileiros confundem "sein" (dele) com "ihr" (dela) ou "Ihr" (do senhor). O gênero do possuidor determina a raiz.',
  },
  {
    portugues: 'o pai dela (dela = sie)',
    alemaoCorreto: 'ihr Vater',
    alemaoIncorreto: '*sein Vater (para ela)',
    nota: 'Possuidor feminino singular exige a raiz ihr- (sem inicial maiúscula a menos que inicie frase).',
  },
  {
    portugues: 'o pai do senhor / da senhora',
    alemaoCorreto: 'Ihr Vater',
    alemaoIncorreto: '*ihr Vater (sem maiúscula formal)',
    nota: 'Tratamento de respeito "Sie" exige o possessivo com inicial maiúscula obrigatória: "Ihr Vater".',
  },
  {
    portugues: 'a mãe de vocês (ihr -> euer)',
    alemaoCorreto: 'eure Mutter (síncope vocálica)',
    alemaoIncorreto: '*euere Mutter',
    nota: 'O possessivo euer perde o -e- interno ao receber a terminação desinencial: euer -> eure, eurem, euren.',
  },
  {
    portugues: 'Eu tenho 30 anos.',
    alemaoCorreto: 'Ich bin 30 Jahre alt. (sein + Jahre alt)',
    alemaoIncorreto: '*Ich habe 30 Jahre. (uso de haben para idade)',
    nota: 'Trava de contraste fundamental: em alemão NUNCA se usa o verbo haben para expressar idade.',
  },
];

// 1.3 Satzbau (Estrutura da Frase)
export const SATZBAU_DECLARATIVE: TopologicalRow[] = [
  { vorfeld: 'Mein Name', verbo: 'ist', sujeito: '—', mittelfeld: 'Conrad Müller.', satzende: '—', ptTranslation: 'Meu nome é Conrad Müller.' },
  { vorfeld: 'Sarah', verbo: 'studiert', sujeito: '—', mittelfeld: 'in Paris Medizin.', satzende: '—', ptTranslation: 'Sarah estuda medicina em Paris.' },
  { vorfeld: 'Ich', verbo: 'lerne', sujeito: '—', mittelfeld: 'jetzt Deutsch.', satzende: '—', ptTranslation: 'Eu aprendo alemão agora.' },
  { vorfeld: 'Jetzt', verbo: 'lerne', sujeito: 'ich', mittelfeld: 'Deutsch.', satzende: '—', ptTranslation: 'Agora aprendo eu alemão (inversão do sujeito).' },
  { vorfeld: 'In Spanien', verbo: 'spricht', sujeito: 'man', mittelfeld: 'Spanisch.', satzende: '—', ptTranslation: 'Na Espanha fala-se espanhol.' },
  { vorfeld: 'Später', verbo: 'bin', sujeito: 'ich', mittelfeld: 'Architektin.', satzende: '—', ptTranslation: 'Mais tarde serei arquiteta.' },
];

export const SATZBAU_W_FRAGE = [
  { wWort: 'Woher', verbo: 'kommen', sujeito: 'Sie?', mittelfeld: '—', pt: 'De onde vem o senhor?' },
  { wWort: 'Wie', verbo: 'heißen', sujeito: 'Sie?', mittelfeld: '—', pt: 'Como se chama o senhor?' },
  { wWort: 'Welche Telefonnummer', verbo: 'hat', sujeito: 'Ihr Sohn?', mittelfeld: '—', pt: 'Qual número de telefone tem o filho da senhora?' },
];

export const SATZBAU_JA_NEIN = [
  { verbo: 'Sprechen', sujeito: 'Sie', mittelfeld: 'Deutsch?', pt: 'O senhor fala alemão?' },
  { verbo: 'Studierst', sujeito: 'du', mittelfeld: 'in Berlin?', pt: 'Você estuda em Berlim?' },
];

// 1.4 Verbo haben (ter)
export const CONJUGATION_HABEN: ConjugationRow[] = [
  { pessoa: '1ª sing.', pronome: 'ich', radicalDesinencia: 'hab- + -e', forma: 'habe' },
  { pessoa: '2ª sing.', pronome: 'du', radicalDesinencia: 'ha- + -st (queda de -b-)', forma: 'hast' },
  { pessoa: '3ª sing.', pronome: 'er / sie / es / man', radicalDesinencia: 'ha- + -t (queda de -b-)', forma: 'hat' },
  { pessoa: '1ª plural', pronome: 'wir', radicalDesinencia: 'hab- + -en', forma: 'haben' },
  { pessoa: '2ª plural', pronome: 'ihr', radicalDesinencia: 'hab- + -t', forma: 'habt' },
  { pessoa: '3ª plural', pronome: 'sie', radicalDesinencia: 'hab- + -en', forma: 'haben' },
  { pessoa: 'Formal', pronome: 'Sie', radicalDesinencia: 'hab- + -en', forma: 'haben' },
];

export const IDIOMS_HABEN = [
  { de: 'Hunger haben', pt: 'ter fome', exemplo: 'Ich habe Hunger.', audio: 'Ich habe Hunger.' },
  { de: 'Durst haben', pt: 'ter sede', exemplo: 'Hast du Durst?', audio: 'Hast du Durst?' },
  { de: 'Zeit haben', pt: 'ter tempo', exemplo: 'Wir haben Zeit.', audio: 'Wir haben Zeit.' },
  { de: 'Glück haben', pt: 'ter sorte', exemplo: 'Er hat Glück.', audio: 'Er hat Glück.' },
  { de: 'Angst haben', pt: 'ter medo', exemplo: 'Sie hat Angst.', audio: 'Sie hat Angst.' },
  { de: 'Recht haben', pt: 'ter razão', exemplo: 'Du hast Recht.', audio: 'Du hast Recht.' },
  { de: 'Spaß haben', pt: 'divertir-se (ter diversão)', exemplo: 'Wir haben viel Spaß.', audio: 'Wir haben viel Spaß.' },
  { de: 'Kinder haben', pt: 'ter filhos', exemplo: 'Klaus hat zwei Kinder.', audio: 'Klaus hat zwei Kinder.' },
];

// 1.5 Verbo sein (ser / estar)
export const CONJUGATION_SEIN: ConjugationRow[] = [
  { pessoa: '1ª sing.', pronome: 'ich', radicalDesinencia: 'irregular', forma: 'bin' },
  { pessoa: '2ª sing.', pronome: 'du', radicalDesinencia: 'irregular', forma: 'bist' },
  { pessoa: '3ª sing.', pronome: 'er / sie / es / man', radicalDesinencia: 'irregular', forma: 'ist' },
  { pessoa: '1ª plural', pronome: 'wir', radicalDesinencia: 'irregular', forma: 'sind' },
  { pessoa: '2ª plural', pronome: 'ihr', radicalDesinencia: 'irregular', forma: 'seid' },
  { pessoa: '3ª plural', pronome: 'sie', radicalDesinencia: 'irregular', forma: 'sind' },
  { pessoa: 'Formal', pronome: 'Sie', radicalDesinencia: 'irregular', forma: 'sind' },
];

export const USES_SEIN = [
  { contexto: 'Identidade', exemplo: 'Ich bin Lehrer.', traducao: 'Sou professor.' },
  { contexto: 'Nacionalidade', exemplo: 'Ich bin Brasilianer.', traducao: 'Sou brasileiro.' },
  { contexto: 'Idade', exemplo: 'Ich bin 30 Jahre alt.', traducao: 'Tenho 30 anos de idade.' },
  { contexto: 'Estado', exemplo: 'Ich bin müde.', traducao: 'Estou cansado.' },
  { contexto: 'Localização', exemplo: 'Ich bin in Berlin.', traducao: 'Estou em Berlim.' },
  { contexto: 'Profissão', exemplo: 'Sie ist Ärztin.', traducao: 'Ela é médica.' },
];

// 1.6 Verbo werden (tornar-se)
export const CONJUGATION_WERDEN: ConjugationRow[] = [
  { pessoa: '1ª sing.', pronome: 'ich', radicalDesinencia: 'werd- + -e', forma: 'werde' },
  { pessoa: '2ª sing.', pronome: 'du', radicalDesinencia: 'wirst (e→i, perda de -d-)', forma: 'wirst' },
  { pessoa: '3ª sing.', pronome: 'er / sie / es / man', radicalDesinencia: 'wird (e→i, perda de -d-)', forma: 'wird' },
  { pessoa: '1ª plural', pronome: 'wir', radicalDesinencia: 'werd- + -en', forma: 'werden' },
  { pessoa: '2ª plural', pronome: 'ihr', radicalDesinencia: 'werd- + -et', forma: 'werdet' },
  { pessoa: '3ª plural', pronome: 'sie', radicalDesinencia: 'werd- + -en', forma: 'werden' },
  { pessoa: 'Formal', pronome: 'Sie', radicalDesinencia: 'werd- + -en', forma: 'werden' },
];

export const USES_WERDEN = [
  { contexto: 'werden + profissão (sem artigo)', exemplo: 'Ich werde Arzt.', traducao: 'Tornar-me-ei médico.' },
  { contexto: 'werden + adjetivo', exemplo: 'Ich werde müde.', traducao: 'Fico cansado.' },
  { contexto: 'werden + idade', exemplo: 'Ich werde 30.', traducao: 'Faço 30 anos.' },
];

// 1.7 Números Cardinais (100 a 1.000.000.000)
export const CARDINAL_NUMBERS_ADVANCED = [
  { num: '100', de: '(ein)hundert', pt: 'cem' },
  { num: '101', de: 'einhunderteins', pt: 'cento e um' },
  { num: '110', de: 'einhundertzehn', pt: 'cento e dez' },
  { num: '121', de: 'einhunderteinundzwanzig', pt: 'cento e vinte e um' },
  { num: '200', de: 'zweihundert', pt: 'duzentos' },
  { num: '300', de: 'dreihundert', pt: 'trezentos' },
  { num: '400', de: 'vierhundert', pt: 'quatrocentos' },
  { num: '500', de: 'fünfhundert', pt: 'quinhentos' },
  { num: '600', de: 'sechshundert', pt: 'seiscentos' },
  { num: '700', de: 'siebenhundert', pt: 'setecentos' },
  { num: '800', de: 'achthundert', pt: 'oitocentos' },
  { num: '900', de: 'neunhundert', pt: 'novecentos' },
  { num: '1.000', de: 'eintausend', pt: 'mil' },
  { num: '1.100', de: 'eintausendeinhundert', pt: 'mil e cem' },
  { num: '2.000', de: 'zweitausend', pt: 'dois mil' },
  { num: '10.000', de: 'zehntausend', pt: 'dez mil' },
  { num: '100.000', de: '(ein)hunderttausend', pt: 'cem mil' },
  { num: '1.000.000', de: 'eine Million (subst. fem.)', pt: 'um milhão' },
  { num: '2.000.000', de: 'zwei Millionen', pt: 'dois milhões' },
  { num: '1.000.000.000', de: 'eine Milliarde (subst. fem.)', pt: 'um bilhão' },
];

// 1.8 O Plural dos Substantivos — As 5 Famílias
export const PLURAL_FAMILIES = [
  {
    familia: 'Família 1',
    terminacao: '-e (com ou sem Umlaut)',
    regra: 'Típica de masculinos e muitos neutros.',
    exemplos: [
      { sg: 'der Tisch', pl: 'die Tische', tipo: '-e sem Umlaut', pt: 'a mesa / as mesas' },
      { sg: 'der Stuhl', pl: 'die Stühle', tipo: '-e + Umlaut (u→ü)', pt: 'a cadeira / as cadeiras' },
    ],
  },
  {
    familia: 'Família 2',
    terminacao: '-er (com ou sem Umlaut)',
    regra: 'Típica de neutros e poucos masculinos.',
    exemplos: [
      { sg: 'das Kind', pl: 'die Kinder', tipo: '-er sem Umlaut', pt: 'a criança / as crianças' },
      { sg: 'das Haus', pl: 'die Häuser', tipo: '-er + Umlaut (au→äu)', pt: 'a casa / as casas' },
    ],
  },
  {
    familia: 'Família 3',
    terminacao: '-(e)n',
    regra: 'Quase todos os femininos (95%) e masculinos fracos.',
    exemplos: [
      { sg: 'die Frau', pl: 'die Frauen', tipo: '-en', pt: 'a mulher / as mulheres' },
      { sg: 'die Lampe', pl: 'die Lampen', tipo: '-n', pt: 'a lâmpada / as lâmpadas' },
    ],
  },
  {
    familia: 'Família 4',
    terminacao: '-s',
    regra: 'Palavras de origem estrangeira, abreviações e terminadas em vogais abertas.',
    exemplos: [
      { sg: 'das Auto', pl: 'die Autos', tipo: '-s', pt: 'o carro / os carros' },
      { sg: 'das Hobby', pl: 'die Hobbys', tipo: '-s', pt: 'o hobby / os hobbies' },
    ],
  },
  {
    familia: 'Família 5',
    terminacao: 'sem terminação (com ou sem Umlaut)',
    regra: 'Substantivos em -er, -el, -en (masculinos e neutros).',
    exemplos: [
      { sg: 'der Lehrer', pl: 'die Lehrer', tipo: 'sem terminação e sem Umlaut', pt: 'o professor / os professores' },
      { sg: 'der Vater', pl: 'die Väter', tipo: 'sem terminação + Umlaut (a→ä)', pt: 'o pai / os pais' },
    ],
  },
];

// 2.1 Texto B1 — Wo wohnen die meisten Menschen?
export const TEXT_B1_POPULATION = {
  introDe: 'In China wohnen heute 1 (eine) Milliarde 386 (dreihundertsechsundachtzig) Millionen Menschen. Im Jahre 2050 (zweitausendfünfzig) leben wahrscheinlich 1 (eine) Milliarde 402 (vierhundertundzwei) Millionen Menschen in China.',
  introPt: 'Na China vivem hoje 1 bilhão 386 milhões de pessoas. No ano de 2050 provavelmente viverão 1 bilhão 402 milhões de pessoas na China.',
  scale: [
    { num: '1 000', de: 'eintausend', pt: 'mil' },
    { num: '10 000', de: 'zehntausend', pt: 'dez mil' },
    { num: '100 000', de: '(ein)hunderttausend', pt: 'cem mil' },
    { num: '1 000 000', de: 'eine Million', pt: 'um milhão' },
    { num: '10 000 000', de: 'zehn Millionen', pt: 'dez milhões' },
    { num: '100 000 000', de: '(ein)hundert Millionen', pt: 'cem milhões' },
    { num: '1 000 000 000', de: 'eine Milliarde', pt: 'um bilhão' },
  ],
  heute: [
    { rank: 1, pais: 'China', pop: '1 386 Mio.' },
    { rank: 2, pais: 'Indien', pop: '1 329 Mio.' },
    { rank: 3, pais: 'USA', pop: '324 Mio.' },
    { rank: 4, pais: 'Indonesien', pop: '260 Mio.' },
    { rank: 5, pais: 'Brasilien', pop: '206 Mio.' },
    { rank: 6, pais: 'Pakistan', pop: '203 Mio.' },
    { rank: 7, pais: 'Nigeria', pop: '187 Mio.' },
    { rank: 8, pais: 'Bangladesch', pop: '163 Mio.' },
    { rank: 9, pais: 'Russland', pop: '144 Mio.' },
    { rank: 10, pais: 'Mexiko', pop: '129 Mio.' },
    { rank: 11, pais: 'Japan', pop: '125 Mio.' },
    { rank: 12, pais: 'Philippinen', pop: '103 Mio.' },
    { rank: 13, pais: 'Äthiopien', pop: '102 Mio.' },
    { rank: 14, pais: 'Ägypten', pop: '94 Mio.' },
    { rank: 15, pais: 'Vietnam', pop: '93 Mio.' },
    { rank: 16, pais: 'Deutschland', pop: '83 Mio.' },
  ],
  morgen: [
    { rank: 1, pais: 'Indien', pop: '1 639 Mio.' },
    { rank: 2, pais: 'China', pop: '1 402 Mio.' },
    { rank: 3, pais: 'Nigeria', pop: '401 Mio.' },
    { rank: 4, pais: 'USA', pop: '379 Mio.' },
    { rank: 5, pais: 'Pakistan', pop: '338 Mio.' },
    { rank: 6, pais: 'Indonesien', pop: '330 Mio.' },
    { rank: 7, pais: 'Brasilien', pop: '228 Mio.' },
    { rank: 8, pais: 'Äthiopien', pop: '205 Mio.' },
    { rank: 9, pais: 'Rep. Kongo', pop: '194 Mio.' },
    { rank: 10, pais: 'Bangladesch', pop: '192 Mio.' },
  ],
};

// 2.2 Texto B3 — Deutschland, Österreich und die Schweiz
export const TEXT_B3_DACH = [
  {
    pais: 'Deutschland',
    artigo: 'sem artigo',
    habitantes: '82,7 Millionen',
    divisao: '16 Bundesländer',
    capital: 'Berlin',
    linguas: '1 Amtssprache: Deutsch',
    cidades: 'Berlin, Hamburg, München',
    historia: 'Seit 1871 Nationalstaat; Wiedervereinigung 1990.',
    deText: 'Deutschland hat 82,7 Millionen Einwohner und 16 Bundesländer. Die Hauptstadt ist Berlin. In Deutschland gibt es nur eine Amtssprache: Deutsch. Die drei größten Städte sind Berlin, Hamburg und München. Seit 1871 ist Deutschland ein Nationalstaat. Sehr wichtig für Deutschland ist die deutsche Wiedervereinigung 1990.',
    ptText: 'A Alemanha tem 82,7 milhões de habitantes e 16 estados federais. A capital é Berlim. Na Alemanha há apenas uma língua oficial: alemão. As três maiores cidades são Berlim, Hamburgo e Munique. Desde 1871 a Alemanha é um Estado nacional. Muito importante para a Alemanha é a reunificação alemã de 1990.',
  },
  {
    pais: 'Österreich',
    artigo: 'sem artigo',
    habitantes: '8,7 Millionen',
    divisao: '9 Bundesländer',
    capital: 'Wien (1,8 Mio. Einwohner)',
    linguas: '1 Amtssprache: Deutsch + 3 Regionalsprachen (Kroatisch, Slowenisch, Ungarisch)',
    cidades: 'Wien',
    historia: 'Seit 1918 ist Österreich eine Republik.',
    deText: 'Österreich hat 8,7 Millionen Einwohner und neun Bundesländer. Die Hauptstadt ist Wien. In Wien wohnen 1,8 Millionen Menschen. Österreich hat eine Amtssprache: Deutsch und drei Regionalsprachen: Kroatisch, Slowenisch und Ungarisch. Seit 1918 ist Österreich eine Republik.',
    ptText: 'A Áustria tem 8,7 milhões de habitantes e nove estados federais. A capital é Viena. Em Viena vivem 1,8 milhões de pessoas. A Áustria tem uma língua oficial: alemão, e três línguas regionais: croata, esloveno e húngaro. Desde 1918 a Áustria é uma república.',
  },
  {
    pais: 'Die Schweiz',
    artigo: 'feminino (die)',
    habitantes: '8,5 Millionen',
    divisao: '26 Kantone (= Bundesländer)',
    capital: 'Bern',
    linguas: '4 Amtssprachen: Deutsch (~70%), Französisch (~20%), Italienisch (~10%), Rätoromanisch (1%)',
    cidades: 'Bern, Zürich, Genf',
    historia: 'Über 700 Jahre alt.',
    deText: 'Die Schweiz ist über 700 Jahre alt. Sie hat 26 Kantone (= Bundesländer) und 8,5 Millionen Einwohner. Die Hauptstadt ist Bern. Die Schweiz hat vier Amtssprachen: Etwa 70 Prozent der Einwohner sprechen Deutsch, etwa 20 % Französisch, etwa 10 % Italienisch und 1 % spricht Rätoromanisch.',
    ptText: 'A Suíça tem mais de 700 anos. Ela tem 26 cantões (= estados federais) e 8,5 milhões de habitantes. A capital é Berna. A Suíça tem quatro línguas oficiais: cerca de 70 por cento dos habitantes falam alemão, cerca de 20% francês, cerca de 10% italiano e 1% fala romanche.',
  },
];

// 2.3 Texto B2 — Das WIE-VIELE-Quiz
export const TEXT_B2_QUIZ = [
  {
    num: 1,
    perguntaDe: 'Wie viele Bundesländer hat Deutschland?',
    perguntaPt: 'Quantos estados federais tem a Alemanha?',
    opcoes: ['A: ca. 400', 'B: ca. 2000', 'C: ca. 6500'],
    respostaCorreta: '16 Bundesländer',
    fraseDe: 'Ich glaube, Deutschland hat 16 Bundesländer.',
    frasePt: 'Eu acredito que a Alemanha tem 16 estados federais.',
  },
  {
    num: 2,
    perguntaDe: 'Wie viele Menschen wohnen in Österreich?',
    perguntaPt: 'Quantas pessoas vivem na Áustria?',
    opcoes: ['A: 12,5 Millionen', 'B: 8,7 Millionen', 'C: 7,4 Millionen'],
    respostaCorreta: '8,7 Millionen',
    fraseDe: 'Ich glaube, in Österreich wohnen 8,7 Millionen Menschen.',
    frasePt: 'Eu acredito que na Áustria vivem 8,7 milhões de pessoas.',
  },
  {
    num: 3,
    perguntaDe: 'Wie viele Amtssprachen hat die Schweiz?',
    perguntaPt: 'Quantas línguas oficiais tem a Suíça?',
    opcoes: [
      'A: 2 (Deutsch und Französisch)',
      'B: 3 (Deutsch, Französisch und Italienisch)',
      'C: 4 (Deutsch, Französisch, Italienisch und Rätoromanisch)',
    ],
    respostaCorreta: '4 Amtssprachen',
    fraseDe: 'Ich denke, die Schweiz hat 4 Amtssprachen.',
    frasePt: 'Eu penso que a Suíça tem 4 línguas oficiais.',
  },
  {
    num: 4,
    perguntaDe: 'Wie viele Menschen wohnen in Berlin?',
    perguntaPt: 'Quantas pessoas vivem em Berlim?',
    opcoes: ['A: 1,5 Millionen', 'B: 3,5 Millionen', 'C: 6 Millionen', 'D: 10 Millionen'],
    respostaCorreta: '3,5 Millionen',
    fraseDe: 'Vielleicht wohnen in Berlin 3,5 Millionen Menschen.',
    frasePt: 'Talvez vivam em Berlim 3,5 milhões de pessoas.',
  },
  {
    num: 5,
    perguntaDe: 'Wie viele Buchstaben hat das deutsche Alphabet (ohne besondere Buchstaben)?',
    perguntaPt: 'Quantas letras tem o alfabeto alemão (sem letras especiais)?',
    opcoes: ['A: 22', 'B: 24', 'C: 26', 'D: 32'],
    respostaCorreta: '26 Buchstaben',
    fraseDe: 'Ich glaube, das deutsche Alphabet hat 26 Buchstaben.',
    frasePt: 'Eu acredito que o alfabeto alemão tem 26 letras.',
  },
  {
    num: 6,
    perguntaDe: 'Wie viele Millionenstädte hat Deutschland?',
    perguntaPt: 'Quantas cidades milionárias tem a Alemanha?',
    opcoes: [
      'A: 2 (Berlin und Hamburg)',
      'B: 4 (Berlin, Hamburg, München und Köln)',
      'C: 6 (Berlin, Hamburg, München, Köln, Frankfurt und Dortmund)',
      'D: 7 (Berlin, Hamburg, München, Köln, Frankfurt, Dortmund und Leipzig)',
    ],
    respostaCorreta: '4 Millionenstädte (Berlin, Hamburg, München, Köln)',
    fraseDe: 'Ich denke, Deutschland hat 4 Millionenstädte.',
    frasePt: 'Eu penso que a Alemanha tem 4 cidades milionárias.',
  },
];

// 2.4 Texto C1 — Personalpronomen und Verben im Präsens
export const REGULAR_VERBS_C1 = [
  { pessoa: 'ich', singen: 'singe', kommen: 'komme', lernen: 'lerne', spielen: 'spiele', arbeiten: 'arbeite', heissen: 'heiße' },
  { pessoa: 'du', singen: 'singst', kommen: 'kommst', lernen: 'lernst', spielen: 'spielst', arbeiten: 'arbeitest', heissen: 'heißt' },
  { pessoa: 'er/sie/es/man', singen: 'singt', kommen: 'kommt', lernen: 'lernt', spielen: 'spielt', arbeiten: 'arbeitet', heissen: 'heißt' },
  { pessoa: 'wir', singen: 'singen', kommen: 'kommen', lernen: 'lernen', spielen: 'spielen', arbeiten: 'arbeiten', heissen: 'heißen' },
  { pessoa: 'ihr', singen: 'singt', kommen: 'kommt', lernen: 'lernt', spielen: 'spielt', arbeiten: 'arbeitet', heissen: 'heißt' },
  { pessoa: 'sie', singen: 'singen', kommen: 'kommen', lernen: 'lernen', spielen: 'spielen', arbeiten: 'arbeiten', heissen: 'heißen' },
  { pessoa: 'Sie', singen: 'singen', kommen: 'kommen', lernen: 'lernen', spielen: 'spielen', arbeiten: 'arbeiten', heissen: 'heißen' },
];

export const VOWEL_CHANGE_VERBS_C1 = [
  { pessoa: 'ich', sein: 'bin', lesen: 'lese', sprechen: 'spreche' },
  { pessoa: 'du', sein: 'bist', lesen: 'liest (e→ie)', sprechen: 'sprichst (e→i)' },
  { pessoa: 'er/sie/es', sein: 'ist', lesen: 'liest (e→ie)', sprechen: 'spricht (e→i)' },
  { pessoa: 'wir', sein: 'sind', lesen: 'lesen', sprechen: 'sprechen' },
  { pessoa: 'ihr', sein: 'seid', lesen: 'lest', sprechen: 'sprecht' },
  { pessoa: 'sie', sein: 'sind', lesen: 'lesen', sprechen: 'sprechen' },
  { pessoa: 'Sie', sein: 'sind', lesen: 'lesen', sprechen: 'sprechen' },
];

// 2.5 Texto C10 — Possessivartikel (du, ich, Sie, er x parentes)
export const TEXT_C10_DRILL = [
  {
    sujeito: 'du',
    perguntas: [
      { item: 'Schwester (f)', pergunta: 'Ist das deine Schwester?' },
      { item: 'Bruder (m)', pergunta: 'Ist das dein Bruder?' },
      { item: 'Vater (m)', pergunta: 'Ist das dein Vater?' },
      { item: 'Mutter (f)', pergunta: 'Ist das deine Mutter?' },
      { item: 'Tochter (f)', pergunta: 'Ist das deine Tochter?' },
      { item: 'Sohn (m)', pergunta: 'Ist das dein Sohn?' },
      { item: 'Mann (m)', pergunta: 'Ist das dein Mann?' },
      { item: 'Kind (n)', pergunta: 'Ist das dein Kind?' },
    ],
  },
  {
    sujeito: 'ich',
    perguntas: [
      { item: 'Schwester (f)', pergunta: 'Ja, das ist meine Schwester.' },
      { item: 'Bruder (m)', pergunta: 'Ja, das ist mein Bruder.' },
      { item: 'Vater (m)', pergunta: 'Ja, das ist mein Vater.' },
      { item: 'Mutter (f)', pergunta: 'Ja, das ist meine Mutter.' },
      { item: 'Tochter (f)', pergunta: 'Ja, das ist meine Tochter.' },
      { item: 'Sohn (m)', pergunta: 'Ja, das ist mein Sohn.' },
      { item: 'Mann (m)', pergunta: 'Ja, das ist mein Mann.' },
      { item: 'Kind (n)', pergunta: 'Ja, das ist mein Kind.' },
    ],
  },
  {
    sujeito: 'Sie',
    perguntas: [
      { item: 'Schwester (f)', pergunta: 'Ist das Ihre Schwester?' },
      { item: 'Bruder (m)', pergunta: 'Ist das Ihr Bruder?' },
      { item: 'Vater (m)', pergunta: 'Ist das Ihr Vater?' },
      { item: 'Mutter (f)', pergunta: 'Ist das Ihre Mutter?' },
      { item: 'Tochter (f)', pergunta: 'Ist das Ihre Tochter?' },
      { item: 'Sohn (m)', pergunta: 'Ist das Ihr Sohn?' },
      { item: 'Mann (m)', pergunta: 'Ist das Ihr Mann?' },
      { item: 'Kind (n)', pergunta: 'Ist das Ihr Kind?' },
    ],
  },
  {
    sujeito: 'er',
    perguntas: [
      { item: 'Schwester (f)', pergunta: 'Ja, das ist seine Schwester.' },
      { item: 'Bruder (m)', pergunta: 'Ja, das ist sein Bruder.' },
      { item: 'Vater (m)', pergunta: 'Ja, das ist sein Vater.' },
      { item: 'Mutter (f)', pergunta: 'Ja, das ist seine Mutter.' },
      { item: 'Tochter (f)', pergunta: 'Ja, das ist seine Tochter.' },
      { item: 'Sohn (m)', pergunta: 'Ja, das ist sein Sohn.' },
      { item: 'Mann (m)', pergunta: 'Ja, das ist sein Mann.' },
      { item: 'Kind (n)', pergunta: 'Ja, das ist sein Kind.' },
    ],
  },
];

// 2.6 Texto C11 — Possessivartikel (14 itens de preenchimento com justificativa)
export const EXERCISE_C11_ITEMS = [
  { num: 0, pessoa: 'ich', texto: 'Mein Name ist Anne.', possessivo: 'mein', justificativa: 'ich → mein (masculino Name)' },
  { num: 1, pessoa: 'Sie', texto: 'Wie ist Ihr Name?', possessivo: 'Ihr', justificativa: 'Sie → Ihr (masculino Name)' },
  { num: 2, pessoa: 'du', texto: 'Wie ist deine E-Mail-Adresse?', possessivo: 'deine', justificativa: 'du → deine (feminino E-Mail-Adresse)' },
  { num: 3, pessoa: 'du', texto: 'Sind das deine Kinder?', possessivo: 'deine', justificativa: 'du → deine (plural Kinder)' },
  { num: 4, pessoa: 'ich', texto: 'Meine Nachbarin spricht Ungarisch.', possessivo: 'Meine', justificativa: 'ich → meine (feminino Nachbarin)' },
  { num: 5, pessoa: 'du', texto: 'Welche Sprachen spricht dein Nachbar?', possessivo: 'dein', justificativa: 'du → dein (masculino Nachbar)' },
  { num: 6, pessoa: 'er', texto: 'Was ist seine Heimatstadt?', possessivo: 'seine', justificativa: 'er → seine (feminino Heimatstadt)' },
  { num: 7, pessoa: 'sie (Sg.)', texto: 'Was ist ihr Hobby?', possessivo: 'ihr', justificativa: 'sie → ihr (neutro Hobby)' },
  { num: 8, pessoa: 'ich', texto: 'Mein Bruder ist Arzt.', possessivo: 'Mein', justificativa: 'ich → mein (masculino Bruder)' },
  { num: 9, pessoa: 'Sie', texto: 'Sind das Ihre Fotos?', possessivo: 'Ihre', justificativa: 'Sie → Ihre (plural Fotos)' },
  { num: 10, pessoa: 'er', texto: 'Was ist seine Muttersprache?', possessivo: 'seine', justificativa: 'er → seine (feminino Muttersprache)' },
  { num: 11, pessoa: 'Sie', texto: 'Wohnt Ihr Sohn in Paris?', possessivo: 'Ihr', justificativa: 'Sie → Ihr (masculino Sohn)' },
  { num: 12, pessoa: 'sie (Sg.)', texto: 'Sind das ihre Freunde?', possessivo: 'ihre', justificativa: 'sie → ihre (plural Freunde)' },
  { num: 13, pessoa: 'ich', texto: 'Nein, das sind meine Freunde.', possessivo: 'meine', justificativa: 'ich → meine (plural Freunde)' },
  { num: 14, pessoa: 'du', texto: 'Wie ist deine Telefonnummer?', possessivo: 'deine', justificativa: 'du → deine (feminino Telefonnummer)' },
];

// 2.7 Texto C12 — Schreiben Sie die Zahlen
export const EXERCISE_C12_ITEMS = [
  { num: 0, alemao: 'siebenundvierzig', numero: 47 },
  { num: 1, alemao: 'dreiundzwanzig', numero: 23 },
  { num: 2, alemao: 'fünfundvierzig', numero: 45 },
  { num: 3, alemao: 'neunundneunzig', numero: 99 },
  { num: 4, alemao: 'zweiundfünfzig', numero: 52 },
  { num: 5, alemao: 'sechsunddreißig', numero: 36 },
  { num: 6, alemao: 'einundachtzig', numero: 81 },
  { num: 7, alemao: 'achtundsiebzig', numero: 78 },
  { num: 8, alemao: 'dreiunddreißig', numero: 33 },
];

// 2.8 Texto C13 — Schreiben Sie die Zahlen in Worten
export const EXERCISE_C13_ITEMS = [
  { num: 0, numero: 1, alemao: 'eins' },
  { num: 1, numero: 4, alemao: 'vier' },
  { num: 2, numero: 7, alemao: 'sieben' },
  { num: 3, numero: 8, alemao: 'acht' },
  { num: 4, numero: 11, alemao: 'elf' },
  { num: 5, numero: 10, alemao: 'zehn' },
  { num: 6, numero: 15, alemao: 'fünfzehn' },
  { num: 7, numero: 5, alemao: 'fünf' },
  { num: 8, numero: 3, alemao: 'drei' },
  { num: 9, numero: 6, alemao: 'sechs' },
  { num: 10, numero: 13, alemao: 'dreizehn' },
  { num: 11, numero: 16, alemao: 'sechzehn' },
  { num: 12, numero: 27, alemao: 'siebenundzwanzig' },
  { num: 13, numero: 14, alemao: 'vierzehn' },
];

// 2.9 Texto C14 — Ergänzen Sie die fehlende Zahl
export const EXERCISE_C14_ITEMS = [
  { num: 0, n1: 'zwei', n2: 'drei', n3: 'vier' },
  { num: 1, n1: 'vier', n2: 'fünf', n3: 'sechs' },
  { num: 2, n1: 'achtzig', n2: 'einundachtzig', n3: 'zweiundachtzig' },
  { num: 3, n1: 'zweiundvierzig', n2: 'dreiundvierzig', n3: 'vierundvierzig' },
  { num: 4, n1: 'elf', n2: 'zwölf', n3: 'dreizehn' },
  { num: 5, n1: 'dreihundert', n2: 'vierhundert', n3: 'fünfhundert' },
  { num: 6, n1: 'siebenunddreißig', n2: 'achtunddreißig', n3: 'neununddreißig' },
  { num: 7, n1: 'einhunderteins', n2: 'einhundertzwei', n3: 'einhundertdrei' },
  { num: 8, n1: 'fünfundsiebzig', n2: 'sechsundsiebzig', n3: 'siebenundsiebzig' },
  { num: 9, n1: 'zehn', n2: 'elf', n3: 'zwölf' },
  { num: 10, n1: 'eintausend', n2: 'zweitausend', n3: 'dreitausend' },
  { num: 11, n1: 'achtzig', n2: 'neunzig', n3: 'hundert' },
  { num: 12, n1: 'neunzehn', n2: 'zwanzig', n3: 'einundzwanzig' },
  { num: 13, n1: 'fünfundsechzig', n2: 'sechsundsechzig', n3: 'siebenundsechzig' },
  { num: 14, n1: 'einundfünfzig', n2: 'zweiundfünfzig', n3: 'dreiundfünfzig' },
  { num: 15, n1: 'sechzig', n2: 'siebzig', n3: 'achtzig' },
];

// 2.10 Texto D1 — Wichtige Redemittel
export const REDEMITTEL_GROUPS = [
  {
    titulo: 'Saudações & Identificação Pessoal',
    itens: [
      { de: 'Guten Morgen! / Guten Tag! / Guten Abend! / Hallo!', pt: 'Bom dia! / Boa tarde! / Boa noite! / Olá!' },
      { de: 'Wie heißen Sie? — Ich heiße Max Müller. / Mein Name ist Max Müller.', pt: 'Como se chama? — Chamo-me Max Müller. / Meu nome é Max Müller.' },
      { de: 'Wie ist Ihr Vorname / Familienname? — Mein Vorname ist Max. Mein Familienname ist Müller.', pt: 'Qual é seu primeiro nome / sobrenome? — Meu primeiro nome é Max. Meu sobrenome é Müller.' },
      { de: 'Wie alt sind Sie? — Ich bin 30 Jahre alt.', pt: 'Quantos anos tem? — Tenho 30 anos de idade.' },
      { de: 'Woher kommen Sie? — Ich komme aus Spanien.', pt: 'De onde vem o senhor? — Eu venho da Espanha.' },
      { de: 'Wo wohnen Sie? — Ich wohne in Madrid.', pt: 'Onde mora? — Moro em Madri.' },
    ],
  },
  {
    titulo: 'Profissão & Estudos',
    itens: [
      { de: 'Was sind Sie von Beruf? — Ich bin Lehrer. / Ich arbeite als Managerin bei Siemens.', pt: 'Qual é a sua profissão? — Sou professor. / Trabalho como gerente na Siemens.' },
      { de: 'Was / Wo studieren Sie? — Ich studiere Medizin in Berlin.', pt: 'O que / onde o senhor estuda? — Estudo medicina em Berlim.' },
    ],
  },
  {
    titulo: 'Idiomas, Estado Civil & Hobbies',
    itens: [
      { de: 'Welche Sprachen sprechen Sie? — Meine Muttersprache ist Italienisch. Ich spreche sehr gut Englisch und lerne jetzt Deutsch.', pt: 'Quais línguas o senhor fala? — Minha língua materna é o italiano. Falo inglês muito bem e aprendo alemão agora.' },
      { de: 'Ich bin ledig / verheiratet / geschieden. Ich habe zwei Kinder / keine Kinder.', pt: 'Sou solteiro / casado / divorciado. Tenho dois filhos / não tenho filhos.' },
      { de: 'Was sind deine / Ihre Hobbys? — Ich spiele gern Fußball. Ich singe im Chor. Ich lese gern Romane. Ich höre gern Jazz-Musik. Ich schreibe gern Gedichte.', pt: 'Quais são seus hobbies? — Jogo futebol com prazer. Canto no coro. Leio romances. Ouço jazz. Escrevo poemas.' },
    ],
  },
];

// 2.11 Texto D2 — Kleines Wörterbuch der Verben (16 verbos com todas as pessoas e frases de contexto)
export const VERB_DICTIONARY_D2 = [
  {
    verbo: 'sein (ser/estar)',
    sg1: 'ich bin', sg2: 'du bist', sg3: 'er/sie ist',
    pl1: 'wir sind', pl2: 'ihr seid', pl3: 'sie/Sie sind',
    exemplo: 'Ich bin Studentin. / Hans Behrens ist Chemiker.',
    pt: 'Eu sou estudante. / Hans Behrens é químico.',
  },
  {
    verbo: 'haben (ter)',
    sg1: 'ich habe', sg2: 'du hast', sg3: 'er/sie hat',
    pl1: 'wir haben', pl2: 'ihr habt', pl3: 'sie/Sie haben',
    exemplo: 'Ich habe zwei Kinder. / Wir haben viel Zeit.',
    pt: 'Tenho dois filhos. / Nós temos muito tempo.',
  },
  {
    verbo: 'arbeiten (als Managerin arbeiten)',
    sg1: 'ich arbeite', sg2: 'du arbeitest', sg3: 'er/sie arbeitet',
    pl1: 'wir arbeiten', pl2: 'ihr arbeitet', pl3: 'sie/Sie arbeiten',
    exemplo: 'Susanne arbeitet als Managerin bei BASF.',
    pt: 'Susanne trabalha como gerente na BASF.',
  },
  {
    verbo: 'denken (pensar)',
    sg1: 'ich denke', sg2: 'du denkst', sg3: 'er/sie denkt',
    pl1: 'wir denken', pl2: 'ihr denkt', pl3: 'sie/Sie denken',
    exemplo: 'Ich denke, die Schweiz hat 4 Amtssprachen.',
    pt: 'Penso que a Suíça tem 4 línguas oficiais.',
  },
  {
    verbo: 'glauben (acreditar/achar)',
    sg1: 'ich glaube', sg2: 'du glaubst', sg3: 'er/sie glaubt',
    pl1: 'wir glauben', pl2: 'ihr glaubt', pl3: 'sie/Sie glauben',
    exemplo: 'Ich glaube, Deutschland hat 16 Bundesländer.',
    pt: 'Acredito que a Alemanha tem 16 estados federais.',
  },
  {
    verbo: 'heißen (chamar-se)',
    sg1: 'ich heiße', sg2: 'du heißt', sg3: 'er/sie heißt',
    pl1: 'wir heißen', pl2: 'ihr heißt', pl3: 'sie/Sie heißen',
    exemplo: 'Ich heiße Conrad Kremer. Und Sie? Wie heißen Sie?',
    pt: 'Chamo-me Conrad Kremer. E o senhor? Como se chama?',
  },
  {
    verbo: 'hören (Musik hören)',
    sg1: 'ich höre', sg2: 'du hörst', sg3: 'er/sie hört',
    pl1: 'wir hören', pl2: 'ihr hört', pl3: 'sie/Sie hören',
    exemplo: 'Marie hört gern Musik.',
    pt: 'Marie gosta de ouvir música.',
  },
  {
    verbo: 'kommen (aus Frankreich kommen)',
    sg1: 'ich komme', sg2: 'du kommst', sg3: 'er/sie kommt',
    pl1: 'wir kommen', pl2: 'ihr kommt', pl3: 'sie/Sie kommen',
    exemplo: 'Kommen Sie aus Italien? — Ja, ich komme aus Mailand.',
    pt: 'O senhor vem da Itália? — Sim, venho de Milão.',
  },
  {
    verbo: 'lernen (Deutsch lernen)',
    sg1: 'ich lerne', sg2: 'du lernst', sg3: 'er/sie lernt',
    pl1: 'wir lernen', pl2: 'ihr lernt', pl3: 'sie/Sie lernen',
    exemplo: 'Hans lernt Sprachen. Ich lerne jetzt Deutsch.',
    pt: 'Hans aprende idiomas. Eu aprendo alemão agora.',
  },
  {
    verbo: 'lesen (ein Buch lesen)',
    sg1: 'ich lese', sg2: 'du liest', sg3: 'er/sie liest',
    pl1: 'wir lesen', pl2: 'ihr lest', pl3: 'sie/Sie lesen',
    exemplo: 'Susanne liest gern Kriminalromane.',
    pt: 'Susanne gosta de ler romances policiais.',
  },
  {
    verbo: 'schreiben (ein Gedicht schreiben)',
    sg1: 'ich schreibe', sg2: 'du schreibst', sg3: 'er/sie schreibt',
    pl1: 'wir schreiben', pl2: 'ihr schreibt', pl3: 'sie/Sie schreiben',
    exemplo: 'Klaus schreibt Gedichte.',
    pt: 'Klaus escreve poemas.',
  },
  {
    verbo: 'singen (im Chor singen)',
    sg1: 'ich singe', sg2: 'du singst', sg3: 'er/sie singt',
    pl1: 'wir singen', pl2: 'ihr singt', pl3: 'sie/Sie singen',
    exemplo: 'Marie singt im Chor.',
    pt: 'Marie canta no coro.',
  },
  {
    verbo: 'spielen (Fußball spielen)',
    sg1: 'ich spiele', sg2: 'du spielst', sg3: 'er/sie spielt',
    pl1: 'wir spielen', pl2: 'ihr spielt', pl3: 'sie/Sie spielen',
    exemplo: 'Maximilian spielt gern Fußball. Marta spielt gut Gitarre.',
    pt: 'Maximilian joga futebol. Marta toca violão muito bem.',
  },
  {
    verbo: 'sprechen (Englisch sprechen)',
    sg1: 'ich spreche', sg2: 'du sprichst', sg3: 'er/sie spricht',
    pl1: 'wir sprechen', pl2: 'ihr sprecht', pl3: 'sie/Sie sprechen',
    exemplo: 'Martin spricht sehr gut Englisch.',
    pt: 'Martin fala inglês muito bem.',
  },
  {
    verbo: 'studieren (Medizin studieren)',
    sg1: 'ich studiere', sg2: 'du studierst', sg3: 'er/sie studiert',
    pl1: 'wir studieren', pl2: 'ihr studiert', pl3: 'sie/Sie studieren',
    exemplo: 'Sarah und Gilles studieren in Paris.',
    pt: 'Sarah e Gilles estudam em Paris.',
  },
  {
    verbo: 'wohnen (in Berlin wohnen)',
    sg1: 'ich wohne', sg2: 'du wohnst', sg3: 'er/sie wohnt',
    pl1: 'wir wohnen', pl2: 'ihr wohnt', pl3: 'sie/Sie wohnen',
    exemplo: 'Ich wohne in Berlin. Wo wohnen Sie?',
    pt: 'Eu moro em Berlim. Onde o senhor mora?',
  },
];

// 2.12 Texto D3 — Evaluation
export const EVALUATION_D3_ITEMS = [
  { item: 'Ich kann grüßen.', pt: 'Eu consigo cumprimentar.' },
  { item: 'Ich kann mich kurz vorstellen.', pt: 'Eu consigo me apresentar brevemente.' },
  { item: 'Ich kann einige Sätze über meine Familie sagen.', pt: 'Eu consigo dizer algumas frases sobre minha família.' },
  { item: 'Ich kann einige Länder, Sprachen und Berufe nennen.', pt: 'Eu consigo nomear alguns países, línguas e profissões.' },
  { item: 'Ich kann einfache Fragen zur Person stellen.', pt: 'Eu consigo fazer perguntas simples sobre a pessoa.' },
  { item: 'Ich kann einige Tätigkeiten nennen.', pt: 'Eu consigo nomear algumas atividades.' },
  { item: 'Ich kann bis 100 zählen und kenne das deutsche Alphabet.', pt: 'Eu consigo contar até 100 e conheço o alfabeto alemão.' },
  { item: 'Ich kann einfache Informationen über Länder (Einwohner/Hauptstadt/Sprachen) verstehen. (fakultativ)', pt: 'Eu consigo entender informações simples sobre países (habitantes/capital/línguas). (facultativo)' },
];

// 2.13 Tabela Lexical Primária (21 termos)
export const LEXICON_LESSON_3: LexicalTerm[] = [
  {
    palavraAlema: 'das Bundesland',
    classeGramatical: 'Subst. neutro',
    plural: 'die Bundesländer',
    traducaoExata: 'estado federal',
    fraseModelo: 'Deutschland hat 16 Bundesländer.',
    audio: 'Deutschland hat 16 Bundesländer.',
  },
  {
    palavraAlema: 'die Hauptstadt',
    classeGramatical: 'Subst. fem.',
    plural: 'die Hauptstädte',
    traducaoExata: 'capital',
    fraseModelo: 'Die Hauptstadt ist Berlin.',
    audio: 'Die Hauptstadt ist Berlin.',
  },
  {
    palavraAlema: 'der Einwohner',
    classeGramatical: 'Subst. masc.',
    plural: 'die Einwohner',
    traducaoExata: 'habitante',
    fraseModelo: 'Deutschland hat 82,7 Millionen Einwohner.',
    audio: 'Deutschland hat 82,7 Millionen Einwohner.',
  },
  {
    palavraAlema: 'die Amtssprache',
    classeGramatical: 'Subst. fem.',
    plural: 'die Amtssprachen',
    traducaoExata: 'língua oficial',
    fraseModelo: 'In Deutschland gibt es nur eine Amtssprache.',
    audio: 'In Deutschland gibt es nur eine Amtssprache.',
  },
  {
    palavraAlema: 'die Wiedervereinigung',
    classeGramatical: 'Subst. fem.',
    plural: 'die Wiedervereinigungen',
    traducaoExata: 'reunificação',
    fraseModelo: 'Die deutsche Wiedervereinigung 1990.',
    audio: 'Die deutsche Wiedervereinigung 1990.',
  },
  {
    palavraAlema: 'die Republik',
    classeGramatical: 'Subst. fem.',
    plural: 'die Republiken',
    traducaoExata: 'república',
    fraseModelo: 'Seit 1918 ist Österreich eine Republik.',
    audio: 'Seit 1918 ist Österreich eine Republik.',
  },
  {
    palavraAlema: 'der Kanton',
    classeGramatical: 'Subst. masc.',
    plural: 'die Kantone',
    traducaoExata: 'cantão',
    fraseModelo: 'Die Schweiz hat 26 Kantone.',
    audio: 'Die Schweiz hat 26 Kantone.',
  },
  {
    palavraAlema: 'das Prozent',
    classeGramatical: 'Subst. neutro',
    plural: 'die Prozente',
    traducaoExata: 'por cento',
    fraseModelo: 'Etwa 70 Prozent sprechen Deutsch.',
    audio: 'Etwa 70 Prozent sprechen Deutsch.',
  },
  {
    palavraAlema: 'die Million',
    classeGramatical: 'Subst. fem.',
    plural: 'die Millionen',
    traducaoExata: 'milhão',
    fraseModelo: '1 Million Menschen.',
    audio: 'Eine Million Menschen.',
  },
  {
    palavraAlema: 'die Milliarde',
    classeGramatical: 'Subst. fem.',
    plural: 'die Milliarden',
    traducaoExata: 'bilhão',
    fraseModelo: '1 Milliarde Menschen.',
    audio: 'Eine Milliarde Menschen.',
  },
  {
    palavraAlema: 'die Zahl',
    classeGramatical: 'Subst. fem.',
    plural: 'die Zahlen',
    traducaoExata: 'número',
    fraseModelo: 'Schreiben Sie die Zahlen.',
    audio: 'Schreiben Sie die Zahlen.',
  },
  {
    palavraAlema: 'der Buchstabe',
    classeGramatical: 'Subst. masc.',
    plural: 'die Buchstaben',
    traducaoExata: 'letra',
    fraseModelo: 'Das Alphabet hat 26 Buchstaben.',
    audio: 'Das Alphabet hat 26 Buchstaben.',
  },
  {
    palavraAlema: 'die Millionenstadt',
    classeGramatical: 'Subst. fem.',
    plural: 'die Millionenstädte',
    traducaoExata: 'cidade milionária',
    fraseModelo: 'Deutschland hat 4 Millionenstädte.',
    audio: 'Deutschland hat 4 Millionenstädte.',
  },
  {
    palavraAlema: 'der Familienstand',
    classeGramatical: 'Subst. masc.',
    plural: 'sem plural',
    traducaoExata: 'estado civil',
    fraseModelo: 'Ich bin ledig, verheiratet oder geschieden.',
    audio: 'Ich bin ledig, verheiratet oder geschieden.',
  },
  {
    palavraAlema: 'ledig',
    classeGramatical: 'Adjetivo',
    plural: '—',
    traducaoExata: 'solteiro',
    fraseModelo: 'Ich bin ledig.',
    audio: 'Ich bin ledig.',
  },
  {
    palavraAlema: 'verheiratet',
    classeGramatical: 'Adjetivo',
    plural: '—',
    traducaoExata: 'casado',
    fraseModelo: 'Ich bin verheiratet.',
    audio: 'Ich bin verheiratet.',
  },
  {
    palavraAlema: 'geschieden',
    classeGramatical: 'Adjetivo',
    plural: '—',
    traducaoExata: 'divorciado',
    fraseModelo: 'Ich bin geschieden.',
    audio: 'Ich bin geschieden.',
  },
  {
    palavraAlema: 'das Hobby',
    classeGramatical: 'Subst. neutro',
    plural: 'die Hobbys',
    traducaoExata: 'hobby / passatempo',
    fraseModelo: 'Was sind deine Hobbys?',
    audio: 'Was sind deine Hobbys?',
  },
  {
    palavraAlema: 'der Chor',
    classeGramatical: 'Subst. masc.',
    plural: 'die Chöre',
    traducaoExata: 'coro',
    fraseModelo: 'Ich singe im Chor.',
    audio: 'Ich singe im Chor.',
  },
  {
    palavraAlema: 'der Roman',
    classeGramatical: 'Subst. masc.',
    plural: 'die Romane',
    traducaoExata: 'romance',
    fraseModelo: 'Ich lese gern Romane.',
    audio: 'Ich lese gern Romane.',
  },
  {
    palavraAlema: 'das Gedicht',
    classeGramatical: 'Subst. neutro',
    plural: 'die Gedichte',
    traducaoExata: 'poema',
    fraseModelo: 'Ich schreibe gern Gedichte.',
    audio: 'Ich schreibe gern Gedichte.',
  },
];

// 2.14 Registro Coloquial e Autêntico (Umgangssprache)
export const COLLOQUIAL_LESSON_3: ColloquialExpression[] = [
  { expressaoAlema: 'Na?', traducaoExata: 'E aí?', contexto: 'Saudação informal extremamente comum' },
  { expressaoAlema: 'Was geht ab?', traducaoExata: 'O que está rolando?', contexto: 'Gíria juvenil entre amigos' },
  { expressaoAlema: 'Alles klar?', traducaoExata: 'Tudo certo? Tudo bem?', contexto: 'Saudação e verificação informal' },
  { expressaoAlema: 'Läuft!', traducaoExata: 'Tá rodando! Tá dando certo!', contexto: 'Gíria afirmativa e de entusiasmo' },
  { expressaoAlema: 'Kein Ding!', traducaoExata: 'Sem problema! De nada!', contexto: 'Informal no lugar de "Bitte sehr"' },
  { expressaoAlema: 'Passt schon!', traducaoExata: 'Tá bom assim! Não precisa se preocupar!', contexto: 'Expressão idiomática do dia a dia' },
  { expressaoAlema: 'Echt?', traducaoExata: 'Sério? De verdade?', contexto: 'Expressão de surpresa informal' },
  { expressaoAlema: 'Krass!', traducaoExata: 'Doideira! Impressionante! Sinistro!', contexto: 'Gíria juvenil cotidiana' },
  { expressaoAlema: 'Bock haben', traducaoExata: 'Estar a fim de fazer algo', contexto: '"Ich habe Bock" = Estou super a fim' },
  { expressaoAlema: 'Schnauze!', traducaoExata: 'Cala a boca! Bico calado!', contexto: 'Muito informal/agressivo (para conhecimento passivo)' },
];

// BLOCO 3 EXERCÍCIOS RESOLVIDOS

// 3.1 Exercício C1 — Was passt?
export const EXERCISE_C1_SOLUTIONS = [
  { num: 0, frase: 'Wie heißen Sie?', verbo: 'heißen', justificativa: 'Formal Sie exige forma infinita' },
  { num: 1, frase: 'Er studiert Betriebswirtschaft.', verbo: 'studiert', justificativa: '3ª pessoa do singular (er) -> radical + -t' },
  { num: 2, frase: 'Wo wohnt Sarah?', verbo: 'wohnt', justificativa: '3ª pessoa do singular (Sarah = sie) -> radical + -t' },
  { num: 3, frase: 'Was bist du von Beruf?', verbo: 'du', justificativa: '2ª pessoa do singular do verbo sein (bist) exige o pronome du' },
  { num: 4, frase: 'Woher kommen Sie?', verbo: 'kommen', justificativa: 'Tratamento formal Sie com verbo de movimento' },
  { num: 5, frase: 'Frau Binder ist Lehrerin.', verbo: 'ist', justificativa: '3ª pessoa singular do verbo sein com profissão sem artigo' },
];

// 3.2 Exercício C2 — Was passt hier?
export const EXERCISE_C2_SOLUTIONS = [
  {
    num: 1,
    pergunta: '... kommt aus Italien.',
    opcoes: ['Mein Nachbar', 'Ich', 'Du'],
    resposta: 'Mein Nachbar',
    justificativa: 'O verbo vem com a desinência -t (3ª sing.), logo o sujeito deve ser "Mein Nachbar" (er).',
  },
  {
    num: 2,
    pergunta: 'Ich ... in Berlin.',
    opcoes: ['wohnen', 'wohne', 'wohnst'],
    resposta: 'wohne',
    justificativa: 'Sujeito ich exige a terminação -e na 1ª pessoa do singular.',
  },
  {
    num: 3,
    pergunta: 'Meine Nachbarin ... Serena.',
    opcoes: ['heiße', 'heißt', 'heißen'],
    resposta: 'heißt',
    justificativa: 'Meine Nachbarin é 3ª pessoa do singular (sie), exigindo desinência -t.',
  },
  {
    num: 4,
    pergunta: '... du Deutsch?',
    opcoes: ['Lernst', 'Lernen', 'Lernt'],
    resposta: 'Lernst',
    justificativa: 'O pronome du exige desinência -st no presente.',
  },
  {
    num: 5,
    pergunta: 'Sarah und Gilles ... in Paris.',
    opcoes: ['studiert', 'studiere', 'studieren'],
    resposta: 'studieren',
    justificativa: 'Sarah e Gilles formam um sujeito plural (sie = eles), exigindo a terminação -en.',
  },
];

// 3.3 Exercício C3 — Diálogo Conrad & Serena
export const EXERCISE_C3_DIALOGUE = [
  { speaker: 'Conrad', de: 'Hallo, ich heiße Conrad Kremer. Und Sie? Wie heißen Sie?', pt: 'Olá, me chamo Conrad Kremer. E a senhora? Como se chama?', verbo: 'heißen', justificativa: '1ª sg. heiße / Formal Sie heißen' },
  { speaker: 'Serena', de: 'Mein Name ist Serena Rosso.', pt: 'Meu nome é Serena Rosso.', verbo: 'sein', justificativa: '3ª sg. ist' },
  { speaker: 'Conrad', de: 'Kommen Sie aus Italien?', pt: 'A senhora vem da Itália?', verbo: 'kommen', justificativa: 'Formal Sie kommen' },
  { speaker: 'Serena', de: 'Ja, ich komme aus Mailand.', pt: 'Sim, venho de Milão.', verbo: 'kommen', justificativa: '1ª sg. komme' },
  { speaker: 'Conrad', de: 'Wohnen Sie in Frankfurt?', pt: 'A senhora mora em Frankfurt?', verbo: 'wohnen', justificativa: 'Formal Sie wohnen' },
  { speaker: 'Serena', de: 'Nein, ich wohne in Berlin.', pt: 'Não, moro em Berlim.', verbo: 'wohnen', justificativa: '1ª sg. wohne' },
  { speaker: 'Conrad', de: 'Und Sie? Wo wohnen Sie?', pt: 'E a senhora? Onde mora?', verbo: 'wohnen (2×)', justificativa: 'Formal Sie wohnen' },
  { speaker: 'Conrad', de: 'Ich wohne in Frankfurt.', pt: 'Eu moro em Frankfurt.', verbo: 'wohnen', justificativa: '1ª sg. wohne' },
  { speaker: 'Serena', de: 'Studieren Sie in Berlin?', pt: 'O senhor estuda em Berlim?', verbo: 'studieren', justificativa: 'Formal Sie studieren' },
  { speaker: 'Serena', de: 'Ja, ich studiere Chemie.', pt: 'Sim, estudo química.', verbo: 'studieren', justificativa: '1ª sg. studiere' },
  { speaker: 'Conrad', de: 'Sie sprechen sehr gut Deutsch.', pt: 'A senhora fala alemão muito bem.', verbo: 'sprechen', justificativa: 'Formal Sie sprechen' },
  { speaker: 'Serena', de: 'Ich spreche auch Englisch und Französisch.', pt: 'Falo também inglês e francês.', verbo: 'sprechen', justificativa: '1ª sg. spreche' },
];

// 3.4 Exercício C4 — Ergänzen Sie die Verben
export const EXERCISE_C4_ITEMS = [
  { num: 0, frase: 'Susanne arbeitet als Managerin bei BASF.', verbo: 'arbeiten', justificativa: '3ª sg. arbeitet' },
  { num: 1, frase: 'Marta spielt gut Gitarre.', verbo: 'spielen', justificativa: '3ª sg. spielt' },
  { num: 2, frase: 'Marie singt im Chor.', verbo: 'singen', justificativa: '3ª sg. singt' },
  { num: 3, frase: 'Hans lernt Sprachen.', verbo: 'lernen', justificativa: '3ª sg. lernt' },
  { num: 4, frase: 'Maximilian ist der Sohn von Hans und Susanne.', verbo: 'sein', justificativa: '3ª sg. ist' },
  { num: 5, frase: 'Marie hört gern Musik.', verbo: 'hören', justificativa: '3ª sg. hört' },
  { num: 6, frase: 'Susanne liest gern Kriminalromane.', verbo: 'lesen', justificativa: '3ª sg. com alternância e→ie: liest' },
  { num: 7, frase: 'Maximilian spielt gern Fußball.', verbo: 'spielen', justificativa: '3ª sg. spielt' },
  { num: 8, frase: 'Martin spricht sehr gut Englisch und schreibt gern Online-Texte.', verbo: 'sprechen / schreiben', justificativa: '3ª sg. spricht (e→i) / schreibt' },
];

// 3.5 Exercício C5 — Quatro Blocos de Verbos (sprechen, arbeiten, lesen, sein)
export const EXERCISE_C5_GROUPS = [
  {
    verboBase: 'sprechen (falar)',
    itens: [
      { frase: 'Welche Sprachen sprichst du?', justificativa: '2ª sg. du sprichst (e→i)' },
      { frase: 'Spricht Paul Französisch?', justificativa: '3ª sg. er spricht (e→i)' },
      { frase: 'Wir sprechen alle gut Englisch.', justificativa: '1ª pl. wir sprechen' },
      { frase: 'Sprecht ihr auch Englisch?', justificativa: '2ª pl. ihr sprecht (sem alternância)' },
      { frase: 'Jutta und Karl sprechen ein bisschen Russisch.', justificativa: '3ª pl. sie sprechen' },
      { frase: 'Meine Schwester spricht Polnisch und Deutsch.', justificativa: '3ª sg. sie spricht (e→i)' },
      { frase: 'Welche Sprachen sprechen Sie?', justificativa: 'Formal Sie sprechen' },
    ],
  },
  {
    verboBase: 'arbeiten (trabalhar)',
    itens: [
      { frase: 'Klaus arbeitet in Berlin.', justificativa: '3ª sg. Klaus arbeitet (-e- epentético)' },
      { frase: 'Wir arbeiten bei Siemens.', justificativa: '1ª pl. wir arbeiten' },
      { frase: 'Wo arbeiten Sie?', justificativa: 'Formal Sie arbeiten' },
      { frase: 'Hans Behrens arbeitet bei BASF.', justificativa: '3ª sg. arbeitet' },
      { frase: 'Arbeitest du auch bei BASF?', justificativa: '2ª sg. arbeitest (-e- epentético)' },
      { frase: 'Marta arbeitet als Lehrerin.', justificativa: '3ª sg. arbeitet' },
      { frase: 'Ich arbeite nicht gern.', justificativa: '1ª sg. arbeite' },
    ],
  },
  {
    verboBase: 'lesen (ler)',
    itens: [
      { frase: 'Ich lese gern Kriminalromane.', justificativa: '1ª sg. lese' },
      { frase: 'Was liest du gern?', justificativa: '2ª sg. du liest (e→ie)' },
      { frase: 'Frau und Herr Krause lesen gern Gedichte.', justificativa: '3ª pl. sie lesen' },
      { frase: 'Meine Mutter liest gern Liebesromane.', justificativa: '3ª sg. sie liest (e→ie)' },
      { frase: 'Mein Vater liest Geschichtsromane.', justificativa: '3ª sg. er liest (e→ie)' },
      { frase: 'Lesen Sie auch gern Geschichtsromane?', justificativa: 'Formal Sie lesen' },
    ],
  },
  {
    verboBase: 'sein (ser/estar)',
    itens: [
      { frase: 'Ich bin Studentin.', justificativa: '1ª sg. bin' },
      { frase: 'Hans Behrens ist Chemiker.', justificativa: '3ª sg. ist' },
      { frase: 'Susanne Behrens ist Managerin.', justificativa: '3ª sg. ist' },
      { frase: 'Was sind Sie von Beruf?', justificativa: 'Formal Sie sind' },
      { frase: 'Seid ihr Studenten?', justificativa: '2ª pl. ihr seid' },
      { frase: 'Bist du Informatiker?', justificativa: '2ª sg. du bist' },
    ],
  },
];

// 3.6 Exercício C6 — Perfis Auditivos (Sandra, Paolo, Klaus, Franziska)
export const EXERCISE_C6_PROFILES = [
  {
    nome: 'Sandra',
    pais: 'aus Schweden',
    textoDe: 'Sandra kommt aus Schweden. Sie wohnt jetzt in Hamburg und studiert dort Medizin. Sie ist Studentin. Sie spielt gern Volleyball und liest gern Kriminalromane.',
    textoPt: 'Sandra vem da Suécia. Ela mora agora em Hamburgo e estuda medicina lá. Ela é estudante. Ela gosta de jogar vôlei e de ler romances policiais.',
  },
  {
    nome: 'Paolo',
    pais: 'aus Spanien',
    textoDe: 'Paolo kommt aus Spanien. Er wohnt jetzt in Frankfurt. Dort arbeitet er als Ingenieur bei Siemens. Paolo spielt gern Fußball.',
    textoPt: 'Paolo vem da Espanha. Ele mora agora em Frankfurt. Lá ele trabalha como engenheiro na Siemens. Paolo gosta de jogar futebol.',
  },
  {
    nome: 'Klaus',
    pais: 'wohnt in Berlin',
    textoDe: 'Klaus wohnt in Berlin. Er ist Journalist. Klaus ist verheiratet und hat zwei Kinder. Er schreibt Gedichte.',
    textoPt: 'Klaus mora em Berlim. Ele é jornalista. Klaus é casado e tem dois filhos. Ele escreve poemas.',
  },
  {
    nome: 'Franziska',
    pais: 'wohnt in Wien',
    textoDe: 'Franziska wohnt in Wien. Sie ist Lehrerin. Sie ist verheiratet. Sie hört gern Musik und singt im Chor.',
    textoPt: 'Franziska mora em Viena. Ela é professora. Ela é casada. Ela gosta de ouvir música e canta no coro.',
  },
];

// 3.7 Exercício C7 — Bilden Sie Sätze (16 orações)
export const EXERCISE_C7_SENTENCES = [
  { num: 0, pistas: 'in Berlin – wohnen – ich', de: 'Ich wohne in Berlin.', pt: 'Eu moro em Berlim.', regra: 'Sujeito + verbo + local' },
  { num: 1, pistas: 'aus Spanien – Miguel – kommen?', de: 'Kommt Miguel aus Spanien?', pt: 'Miguel vem da Espanha?', regra: 'Verbo na Posição I (Ja-Nein-Frage)' },
  { num: 2, pistas: 'Kerstin – Französisch und Englisch – sprechen', de: 'Kerstin spricht Französisch und Englisch.', pt: 'Kerstin fala francês e inglês.', regra: 'Sujeito + verbo + objetos (e→i)' },
  { num: 3, pistas: 'Deutsch – ich – lernen – jetzt', de: 'Ich lerne jetzt Deutsch.', pt: 'Eu aprendo alemão agora.', regra: 'Sujeito + verbo + adjunto + objeto' },
  { num: 4, pistas: 'du – kommen – woher?', de: 'Woher kommst du?', pt: 'De onde você vem?', regra: 'W-Frage: W-Wort + verbo + sujeito' },
  { num: 5, pistas: 'von Beruf – was – Sie – sein?', de: 'Was sind Sie von Beruf?', pt: 'Qual é a profissão do senhor?', regra: 'W-Frage: W-Wort + verbo + sujeito' },
  { num: 6, pistas: 'wohnen – wir – in Berlin.', de: 'Wir wohnen in Berlin.', pt: 'Nós moramos em Berlim.', regra: 'Sujeito + verbo + local' },
  { num: 7, pistas: 'arbeiten – Paola – als Journalistin', de: 'Paola arbeitet als Journalistin.', pt: 'Paola trabalha como jornalista.', regra: 'Sujeito + verbo + predicativo com als' },
  { num: 8, pistas: 'Fußball – spielen – du – gern?', de: 'Spielst du gern Fußball?', pt: 'Você gosta de jogar futebol?', regra: 'Verbo na Posição I (Ja-Nein-Frage)' },
  { num: 9, pistas: 'hören – Marie – gern – Musik', de: 'Marie hört gern Musik.', pt: 'Marie gosta de ouvir música.', regra: 'Sujeito + verbo + gern + objeto' },
  { num: 10, pistas: 'ihr – hören – auch gern – Musik?', de: 'Hört ihr auch gern Musik?', pt: 'Vocês também gostam de ouvir música?', regra: 'Verbo na Posição I (Ja-Nein-Frage)' },
  { num: 11, pistas: 'Peter – Spanisch – lernen', de: 'Peter lernt Spanisch.', pt: 'Peter aprende espanhol.', regra: 'Sujeito + verbo + objeto' },
  { num: 12, pistas: 'er – nicht gern – lesen – Liebesromane', de: 'Er liest nicht gern Liebesromane.', pt: 'Ele não gosta de ler romances de amor.', regra: 'Sujeito + verbo (e→ie) + nicht gern + objeto' },
  { num: 13, pistas: 'Liebesromane – du – gern – lesen?', de: 'Liest du gern Liebesromane?', pt: 'Você gosta de ler romances de amor?', regra: 'Verbo na Posição I com alternância (liest du)' },
  { num: 14, pistas: 'Tischtennis – spielen – ihr – gern?', de: 'Spielt ihr gern Tischtennis?', pt: 'Vocês gostam de jogar tênis de mesa?', regra: 'Verbo na Posição I (Ja-Nein-Frage)' },
  { num: 15, pistas: 'studieren – in München – wir – Medizin', de: 'Wir studieren in München Medizin.', pt: 'Nós estudamos medicina em Munique.', regra: 'Sujeito + verbo + local + objeto' },
];

// 3.8 Exercício C8 — Textos Biográficos Criados
export const EXERCISE_C8_TEXTS = [
  {
    nome: 'Anna Tatzikowa',
    pistas: 'Moskau • München • Medizin • Russisch • Englisch • ledig • Tennis spielen • Musik hören',
    de: 'Das ist Anna Tatzikowa. Sie kommt aus Moskau. Sie wohnt in München. Sie studiert Medizin. Ihre Muttersprache ist Russisch. Sie spricht auch Englisch. Sie ist ledig. Sie spielt gern Tennis und hört gern Musik.',
    pt: 'Esta é Anna Tatzikowa. Ela vem de Moscou. Ela mora em Munique. Ela estuda medicina. Sua língua materna é o russo. Ela fala também inglês. Ela é solteira. Ela gosta de jogar tênis e ouvir música.',
  },
  {
    nome: 'Paul Ehrlicher',
    pistas: 'Leipzig • Kriminalkommissar • geschieden • zwei Kinder • Englisch • Gitarre spielen • singen',
    de: 'Das ist Paul Ehrlicher. Er kommt aus Leipzig. Er ist Kriminalkommissar. Er ist geschieden und hat zwei Kinder. Er spricht Englisch. Er spielt gern Gitarre und singt gern.',
    pt: 'Este é Paul Ehrlicher. Ele vem de Leipzig. Ele é comissário de polícia. Ele é divorciado e tem dois filhos. Ele fala inglês. Ele gosta de tocar violão e cantar.',
  },
  {
    nome: 'Petra Sommer',
    pistas: 'Frankfurt • Lehrerin • verheiratet • Deutsch • Englisch • Spanisch • Italienisch lernen • Gedichte schreiben',
    de: 'Das ist Petra Sommer. Sie kommt aus Frankfurt. Sie ist Lehrerin. Sie ist verheiratet. Ihre Muttersprache ist Deutsch. Sie spricht auch Englisch und Spanisch. Sie lernt jetzt Italienisch. Sie schreibt gern Gedichte.',
    pt: 'Esta é Petra Sommer. Ela vem de Frankfurt. Ela é professora. Ela é casada. Sua língua materna é o alemão. Ela fala também inglês e espanhol. Ela aprende italiano agora. Ela gosta de escrever poemas.',
  },
];

// 3.9 Exercício C9 — Wie heißen die Fragewörter?
export const EXERCISE_C9_ITEMS = [
  { num: 0, frase: 'Wie heißen Sie?', wWort: 'wie', pt: 'Como se chama?' },
  { num: 1, frase: 'Woher kommen Sie?', wWort: 'woher', pt: 'De onde vem o senhor?' },
  { num: 2, frase: 'Wo wohnst du?', wWort: 'wo', pt: 'Onde você mora?' },
  { num: 3, frase: 'Was sind Sie von Beruf?', wWort: 'was', pt: 'Qual é sua profissão?' },
  { num: 4, frase: 'Wie alt ist Ihre Tochter?', wWort: 'wie', pt: 'Quantos anos tem a sua filha?' },
  { num: 5, frase: 'Was ist deine Muttersprache?', wWort: 'was', pt: 'Qual é a sua língua materna?' },
  { num: 6, frase: 'Welche Sprachen sprechen Ihre Kinder?', wWort: 'welche', pt: 'Quais línguas falam seus filhos?' },
  { num: 7, frase: 'Was ist dein Hobby?', wWort: 'was', pt: 'Qual é o seu hobby?' },
  { num: 8, frase: 'Wie ist deine Telefonnummer?', wWort: 'wie', pt: 'Qual é o seu número de telefone?' },
  { num: 9, frase: 'Was studieren Sie?', wWort: 'was', pt: 'O que o senhor estuda?' },
  { num: 10, frase: 'Woher kommt Pedro?', wWort: 'woher', pt: 'De onde vem Pedro?' },
  { num: 11, frase: 'Wie heißt du?', wWort: 'wie', pt: 'Como você se chama?' },
  { num: 12, frase: 'Wo arbeitet Hans Behrens?', wWort: 'wo', pt: 'Onde trabalha Hans Behrens?' },
];

// 3.10 & 3.11 Tradução Reversa de Blindagem
export const REVERSE_TRANSLATION_LESSON_3 = [
  {
    num: 1,
    pt: 'Meu nome é Ana. Eu venho do Brasil. Eu moro em São Paulo.',
    de: 'Ich heiße Ana. Ich komme aus Brasilien. Ich wohne in São Paulo.',
    audio: 'Ich heiße Ana. Ich komme aus Brasilien. Ich wohne in São Paulo.',
    justificativa: 'heißen → 1ª sg.: heiße. / kommen → 1ª sg.: komme. / wohnen → 1ª sg.: wohne.',
  },
  {
    num: 2,
    pt: 'Qual é sua profissão? — Eu sou professora.',
    de: 'Was sind Sie von Beruf? — Ich bin Lehrerin.',
    audio: 'Was sind Sie von Beruf? Ich bin Lehrerin.',
    justificativa: 'sein → Formal: sind. / Profissão feminina sem artigo: Lehrerin.',
  },
  {
    num: 3,
    pt: 'Minha língua materna é o português. Eu falo também inglês.',
    de: 'Meine Muttersprache ist Portugiesisch. Ich spreche auch Englisch.',
    audio: 'Meine Muttersprache ist Portugiesisch. Ich spreche auch Englisch.',
    justificativa: 'Possessivo mein + Muttersprache (fem.): meine. / sprechen → 1ª sg.: spreche.',
  },
  {
    num: 4,
    pt: 'Meu vizinho vem da Alemanha. A língua materna dele é alemão.',
    de: 'Mein Nachbar kommt aus Deutschland. Seine Muttersprache ist Deutsch.',
    audio: 'Mein Nachbar kommt aus Deutschland. Seine Muttersprache ist Deutsch.',
    justificativa: 'kommen → 3ª sg.: kommt. / Possessivo sein (dele) + Muttersprache (fem.): seine.',
  },
  {
    num: 5,
    pt: 'Minha vizinha é casada e tem dois filhos.',
    de: 'Meine Nachbarin ist verheiratet und hat zwei Kinder.',
    audio: 'Meine Nachbarin ist verheiratet und hat zwei Kinder.',
    justificativa: 'sein → 3ª sg.: ist. / haben → 3ª sg.: hat. / Plural regular em -er: Kinder.',
  },
  {
    num: 6,
    pt: 'Quantos anos você tem? — Eu tenho 30 anos.',
    de: 'Wie alt bist du? — Ich bin 30 Jahre alt.',
    audio: 'Wie alt bist du? Ich bin dreißig Jahre alt.',
    justificativa: 'sein → 2ª sg.: bist. / Trava de contraste: usa-se sein + Jahre alt (bin 30 Jahre alt), nunca haben.',
  },
  {
    num: 7,
    pt: 'Eu sou solteiro e não tenho filhos.',
    de: 'Ich bin ledig und habe keine Kinder.',
    audio: 'Ich bin ledig und habe keine Kinder.',
    justificativa: 'sein → 1ª sg.: bin. / haben → 1ª sg.: habe + artigo negativo no plural: keine Kinder.',
  },
  {
    num: 8,
    pt: 'Meu hobby é jogar futebol e ouvir música.',
    de: 'Mein Hobby ist Fußball spielen und Musik hören.',
    audio: 'Mein Hobby ist Fußball spielen und Musik hören.',
    justificativa: 'Possessivo mein + Hobby (neutro): mein. / sein → 3ª sg.: ist.',
  },
  {
    num: 9,
    pt: 'A Alemanha tem 16 estados federais. A capital é Berlim.',
    de: 'Deutschland hat 16 Bundesländer. Die Hauptstadt ist Berlin.',
    audio: 'Deutschland hat 16 Bundesländer. Die Hauptstadt ist Berlin.',
    justificativa: 'haben → 3ª sg.: hat. / sein → 3ª sg.: ist. / Plural em -er + Umlaut: Bundesländer.',
  },
  {
    num: 10,
    pt: 'A Suíça tem quatro línguas oficiais.',
    de: 'Die Schweiz hat vier Amtssprachen.',
    audio: 'Die Schweiz hat vier Amtssprachen.',
    justificativa: 'Die Schweiz é país com artigo feminino. / haben → 3ª sg.: hat. / vier + Amtssprachen (plural).',
  },
];

// 3.12 Resumo dos Pontos-Chave do Dia 003
export const KEY_POINTS_LESSON_3: KeyPoint[] = [
  { conceito: 'Artigo definido', regra: 'der (masc.), die (fem.), das (neutro), die (plural para todos os gêneros).' },
  { conceito: 'Artigo indefinido', regra: 'ein (masc.), eine (fem.), ein (neutro). Crucial: não existe artigo indefinido no plural!' },
  { conceito: 'Artigo negativo', regra: 'kein (masc.), keine (fem.), kein (neutro), keine (plural). Nega substantivos com ein ou sem artigo.' },
  { conceito: 'Possessivartikel', regra: 'mein, dein, sein (dele), ihr (dela), unser, euer (vira eure), ihr (deles), Ihr (do senhor/da senhora).' },
  { conceito: 'V2 (Posição II)', regra: 'Verbo conjugado ocupa rigidamente a Posição II em todas as orações declarativas.' },
  { conceito: 'W-Frage', regra: 'W-Wort na Posição I, verbo conjugado na Posição II, sujeito na Posição III.' },
  { conceito: 'Ja-Nein-Frage', regra: 'Verbo conjugado na Posição I, sujeito invertido na Posição II.' },
  { conceito: 'haben', regra: 'ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben. Queda do -b- em du e er.' },
  { conceito: 'sein', regra: 'ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. Usado para idade (Ich bin 30 Jahre alt).' },
  { conceito: 'werden', regra: 'ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden. Transição para profissão, estado ou idade.' },
  { conceito: 'Números grandes', regra: '100 = (ein)hundert, 1.000 = eintausend, 1.000.000 = eine Million (fem.), 1.000.000.000 = eine Milliarde (fem.).' },
  { conceito: '5 Famílias do Plural', regra: '1: -e (Tische/Stühle); 2: -er (Kinder/Häuser); 3: -(e)n (Frauen/Lampen); 4: -s (Autos/Hobbys); 5: sem terminação (Lehrer/Väter).' },
  { conceito: 'Profissões', regra: 'Nunca levam artigo indefinido após os verbos copulativos sein e werden (Ich bin Lehrer, não *Ich bin ein Lehrer).' },
];
