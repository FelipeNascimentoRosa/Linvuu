// Dados completos e estruturados da Semana 2 — Rodada 07 / Dia 007 do Cronograma
// Kapitel 3, Teil A (A14–A29, p. 64–71)

export interface LessonMetadata {
  week: string;
  round: string;
  day: string;
  chapter: string;
  title: string;
  subtitle: string;
  totalHours: string;
}

export const SEMANA_02_LESSON_07_METADATA: LessonMetadata = {
  week: 'Semana 2',
  round: 'RODADA 07',
  day: 'DIA 007 DO CRONOGRAMA',
  chapter: 'KAPITEL 3, TEIL A (A14–A29, p. 64–71)',
  title: 'O Caso Acusativo com Adjetivos Atributivos, Verbos Transitivos, Fonética dos Tremas (ö/ü), Pontos Turísticos de Munique e Redação de E-mail',
  subtitle: 'Estruturação definitiva do Acusativo com artigos e adjetivos, verbos de alta frequência, horários de funcionamento, preços e prática de escrita autêntica',
  totalHours: '3 Horas (Bloco 1: 60 min | Bloco 2: 60 min | Bloco 3: 60 min)',
};

// 1.1 Revisão Rápida: O Caso Acusativo (Akkusativ)
export interface AkkusativGenderRule {
  genero: string;
  nominativo: string;
  acusativo: string;
  mudanca: string;
  explicacao: string;
}

export const AKKUSATIV_REVISION_RULES: AkkusativGenderRule[] = [
  {
    genero: 'Masculino',
    nominativo: 'der / ein / kein / mein',
    acusativo: 'den / einen / keinen / meinen',
    mudanca: 'der → den (-en)',
    explicacao: 'Exclusiva alteração no acusativo masculino singular: terminação -en em todos os determinantes.',
  },
  {
    genero: 'Feminino',
    nominativo: 'die / eine / keine / meine',
    acusativo: 'die / eine / keine / meine',
    mudanca: 'sem mudança',
    explicacao: 'Permanece exatamente idêntico ao nominativo em todas as formas.',
  },
  {
    genero: 'Neutro',
    nominativo: 'das / ein / kein / mein',
    acusativo: 'das / ein / kein / mein',
    mudanca: 'sem mudança',
    explicacao: 'Permanece idêntico ao nominativo. Não há alteração morfológica.',
  },
  {
    genero: 'Plural',
    nominativo: 'die / keine / meine',
    acusativo: 'die / keine / meine',
    mudanca: 'sem mudança',
    explicacao: 'Permanece idêntico ao nominativo. Desinência característica -e.',
  },
];

// 1.2 O Acusativo com Adjetivos Atributivos
export interface AdjectiveDeclensionItem {
  genero: string;
  artigo: string;
  adjetivo: string;
  substantivo: string;
  exemplo: string;
  traducao: string;
  regra: string;
}

export const ADJECTIVE_AKKUSATIV_TABLE: AdjectiveDeclensionItem[] = [
  {
    genero: 'Masculino',
    artigo: 'einen',
    adjetivo: 'neuen',
    substantivo: 'Computer',
    exemplo: 'Ich brauche einen neuen Computer.',
    traducao: 'Eu preciso de um computador novo.',
    regra: 'No masculino acusativo, o artigo indefinido recebe -en (einen) e o adjetivo recebe a desinência fraca/mista -en (neuen).',
  },
  {
    genero: 'Feminino',
    artigo: 'eine',
    adjetivo: 'neue',
    substantivo: 'Lampe',
    exemplo: 'Ich kaufe eine neue Lampe.',
    traducao: 'Eu compro uma lâmpada nova.',
    regra: 'No feminino, o artigo é eine e o adjetivo recebe -e (neue), idêntico ao nominativo.',
  },
  {
    genero: 'Neutro',
    artigo: 'ein',
    adjetivo: 'neues',
    substantivo: 'Telefon',
    exemplo: 'Ich möchte ein neues Telefon.',
    traducao: 'Eu gostaria de um telefone novo.',
    regra: 'No neutro, o artigo é ein e o adjetivo recebe -es (neues), idêntico ao nominativo.',
  },
  {
    genero: 'Plural',
    artigo: 'keine',
    adjetivo: 'neuen',
    substantivo: 'Bücher',
    exemplo: 'Ich habe keine neuen Bücher.',
    traducao: 'Não tenho livros novos.',
    regra: 'No plural com negação/possessivo, o determinante termina em -e (keine) e o adjetivo recebe -en (neuen).',
  },
];

// Verbos que regem Acusativo com conjugação e exemplos
export interface VerbAkkusativProfile {
  verbo: string;
  traducao: string;
  tipo: string;
  conjugacao: {
    ich: string;
    du: string;
    erSieEs: string;
    wir: string;
    ihr: string;
    sieSie: string;
  };
  exemplos: { de: string; pt: string; foco: string }[];
  notaEspecial?: string;
}

export const VERBS_WITH_AKKUSATIV: VerbAkkusativProfile[] = [
  {
    verbo: 'möchten',
    traducao: 'gostaria de (verbo modal no subjuntivo II)',
    tipo: 'Konjunktiv II de mögen (sentido de desejo educado)',
    conjugacao: {
      ich: 'möchte',
      du: 'möchtest',
      erSieEs: 'möchte',
      wir: 'möchten',
      ihr: 'möchtet',
      sieSie: 'möchten',
    },
    exemplos: [
      { de: 'Ich möchte einen Kaffee.', pt: 'Eu gostaria de um café.', foco: 'einen Kaffee (masc. acusativo)' },
      { de: 'Ich möchte eine Tasse Tee.', pt: 'Eu gostaria de uma xícara de chá.', foco: 'eine Tasse (fem. acusativo)' },
      { de: 'Ich möchte ein Glas Wasser.', pt: 'Eu gostaria de um copo de água.', foco: 'ein Glas (neutro acusativo)' },
      { de: 'Ich möchte einen Schreibtisch.', pt: 'Eu gostaria de uma escrivaninha.', foco: 'einen Schreibtisch (masc. acusativo)' },
      { de: 'Ich möchte ein Einzelzimmer.', pt: 'Eu gostaria de um quarto individual.', foco: 'ein Einzelzimmer (neutro acusativo)' },
    ],
    notaEspecial: 'Por ser Konjunktiv II, a 1ª pessoa (ich möchte) e a 3ª pessoa (er/sie/es möchte) são absolutamente idênticas e não levam a desinência -t.',
  },
  {
    verbo: 'brauchen',
    traducao: 'precisar de, necessitar de',
    tipo: 'Regular / Fraco',
    conjugacao: {
      ich: 'brauche',
      du: 'brauchst',
      erSieEs: 'braucht',
      wir: 'brauchen',
      ihr: 'braucht',
      sieSie: 'brauchen',
    },
    exemplos: [
      { de: 'Ich brauche einen Schreibtisch.', pt: 'Preciso de uma escrivaninha.', foco: 'einen Schreibtisch (masc. acusativo)' },
      { de: 'Ich brauche eine Lampe.', pt: 'Preciso de uma lâmpada.', foco: 'eine Lampe (fem. acusativo)' },
      { de: 'Ich brauche ein Bett.', pt: 'Preciso de uma cama.', foco: 'ein Bett (neutro acusativo)' },
      { de: 'Ich brauche keine Bücher.', pt: 'Não preciso de livros.', foco: 'keine Bücher (plural acusativo)' },
    ],
    notaEspecial: 'Em alemão, "brauchen" exige objeto direto no Acusativo SEM nenhuma preposição (em português dizemos "precisar DE", em alemão é direto: "Ich brauche den Schlüssel").',
  },
  {
    verbo: 'haben',
    traducao: 'ter, possuir',
    tipo: 'Irregular (du hast, er hat)',
    conjugacao: {
      ich: 'habe',
      du: 'hast',
      erSieEs: 'hat',
      wir: 'haben',
      ihr: 'habt',
      sieSie: 'haben',
    },
    exemplos: [
      { de: 'Ich habe einen Fernseher.', pt: 'Tenho uma televisão.', foco: 'einen Fernseher (masc. acusativo)' },
      { de: 'Ich habe eine Minibar.', pt: 'Tenho um frigobar.', foco: 'eine Minibar (fem. acusativo)' },
      { de: 'Ich habe ein Bad.', pt: 'Tenho um banheiro.', foco: 'ein Bad (neutro acusativo)' },
      { de: 'Ich habe keine Zeit.', pt: 'Não tenho tempo.', foco: 'keine Zeit (fem. acusativo abstrato)' },
    ],
    notaEspecial: 'Perde o -b- na 2ª e 3ª pessoa do singular: du hast, er/sie/es hat.',
  },
  {
    verbo: 'sehen',
    traducao: 'ver, enxergar',
    tipo: 'Forte com mudança vocálica (e → ie)',
    conjugacao: {
      ich: 'sehe',
      du: 'siehst',
      erSieEs: 'sieht',
      wir: 'sehen',
      ihr: 'seht',
      sieSie: 'sehen',
    },
    exemplos: [
      { de: 'Ich sehe einen Film.', pt: 'Vejo um filme.', foco: 'einen Film (masc. acusativo)' },
      { de: 'Ich sehe eine Frau.', pt: 'Vejo uma mulher.', foco: 'eine Frau (fem. acusativo)' },
      { de: 'Ich sehe ein Kind.', pt: 'Vejo uma criança.', foco: 'ein Kind (neutro acusativo)' },
      { de: 'Ich sehe keine Leute.', pt: 'Não vejo pessoas.', foco: 'keine Leute (plural acusativo)' },
    ],
    notaEspecial: 'Alternância vocálica e → ie restrita a du siehst e er/sie/es sieht.',
  },
  {
    verbo: 'lesen',
    traducao: 'ler',
    tipo: 'Forte com mudança vocálica (e → ie) e sibilante',
    conjugacao: {
      ich: 'lese',
      du: 'liest',
      erSieEs: 'liest',
      wir: 'lesen',
      ihr: 'lest',
      sieSie: 'lesen',
    },
    exemplos: [
      { de: 'Ich lese einen Roman.', pt: 'Leio um romance.', foco: 'einen Roman (masc. acusativo)' },
      { de: 'Ich lese eine Zeitung.', pt: 'Leio um jornal.', foco: 'eine Zeitung (fem. acusativo)' },
      { de: 'Ich lese ein Buch.', pt: 'Leio um livro.', foco: 'ein Buch (neutro acusativo)' },
      { de: 'Ich lese keine Zeitschriften.', pt: 'Não leio revistas.', foco: 'keine Zeitschriften (plural acusativo)' },
    ],
    notaEspecial: 'Como a raiz termina em -s, a terminação de du é apenas -t: du liest (idêntico a er/sie/es liest).',
  },
  {
    verbo: 'trinken',
    traducao: 'beber',
    tipo: 'Forte no passado, regular no presente',
    conjugacao: {
      ich: 'trinke',
      du: 'trinkst',
      erSieEs: 'trinkt',
      wir: 'trinken',
      ihr: 'trinkt',
      sieSie: 'trinken',
    },
    exemplos: [
      { de: 'Ich trinke einen Kaffee.', pt: 'Bebo um café.', foco: 'einen Kaffee (masc. acusativo)' },
      { de: 'Ich trinke eine Cola.', pt: 'Bebo uma cola.', foco: 'eine Cola (fem. acusativo)' },
      { de: 'Ich trinke ein Bier.', pt: 'Bebo uma cerveja.', foco: 'ein Bier (neutro acusativo)' },
      { de: 'Ich trinke keine Milch.', pt: 'Não bebo leite.', foco: 'keine Milch (fem. acusativo)' },
    ],
    notaEspecial: 'No presente mantém conjugação perfeitamente regular.',
  },
  {
    verbo: 'essen',
    traducao: 'comer',
    tipo: 'Forte com mudança vocálica (e → i)',
    conjugacao: {
      ich: 'esse',
      du: 'isst',
      erSieEs: 'isst',
      wir: 'essen',
      ihr: 'esst',
      sieSie: 'essen',
    },
    exemplos: [
      { de: 'Ich esse einen Apfel.', pt: 'Como uma maçã.', foco: 'einen Apfel (masc. acusativo)' },
      { de: 'Ich esse eine Banane.', pt: 'Como uma banana.', foco: 'eine Banane (fem. acusativo)' },
      { de: 'Ich esse ein Brötchen.', pt: 'Como um pãozinho.', foco: 'ein Brötchen (neutro acusativo)' },
      { de: 'Ich esse keine Pommes.', pt: 'Não como batatas fritas.', foco: 'keine Pommes (plural acusativo)' },
    ],
    notaEspecial: 'Mudança de e curto para i: du isst, er isst (atenção para não confundir com o verbo sein: er ist com 1 "s").',
  },
];

// 1.10 Resumo dos 16 Verbos com Acusativo
export interface AkkusativSummaryVerb {
  verbo: string;
  traducao: string;
  exemplo: string;
  traducaoExemplo: string;
}

export const AKKUSATIV_VERBS_SUMMARY: AkkusativSummaryVerb[] = [
  { verbo: 'haben', traducao: 'ter', exemplo: 'Ich habe einen Fernseher.', traducaoExemplo: 'Tenho uma televisão.' },
  { verbo: 'brauchen', traducao: 'precisar', exemplo: 'Ich brauche einen Schreibtisch.', traducaoExemplo: 'Preciso de uma escrivaninha.' },
  { verbo: 'möchten', traducao: 'gostaria', exemplo: 'Ich möchte einen Kaffee.', traducaoExemplo: 'Gostaria de um café.' },
  { verbo: 'sehen', traducao: 'ver', exemplo: 'Ich sehe einen Film.', traducaoExemplo: 'Vejo um filme.' },
  { verbo: 'lesen', traducao: 'ler', exemplo: 'Ich lese einen Roman.', traducaoExemplo: 'Leio um romance.' },
  { verbo: 'trinken', traducao: 'beber', exemplo: 'Ich trinke einen Kaffee.', traducaoExemplo: 'Bebo um café.' },
  { verbo: 'essen', traducao: 'comer', exemplo: 'Ich esse einen Apfel.', traducaoExemplo: 'Como uma maçã.' },
  { verbo: 'kaufen', traducao: 'comprar', exemplo: 'Ich kaufe einen Computer.', traducaoExemplo: 'Compro um computador.' },
  { verbo: 'bekommen', traducao: 'receber', exemplo: 'Ich bekomme einen Brief.', traducaoExemplo: 'Recebo uma carta.' },
  { verbo: 'finden', traducao: 'achar, encontrar', exemplo: 'Ich finde den Schlüssel.', traducaoExemplo: 'Acho a chave.' },
  { verbo: 'suchen', traducao: 'procurar', exemplo: 'Ich suche den Schlüssel.', traducaoExemplo: 'Procuro a chave.' },
  { verbo: 'öffnen', traducao: 'abrir', exemplo: 'Ich öffne die Tür.', traducaoExemplo: 'Abro a porta.' },
  { verbo: 'schließen', traducao: 'fechar', exemplo: 'Ich schließe die Tür.', traducaoExemplo: 'Fecho a porta.' },
  { verbo: 'bezahlen', traducao: 'pagar', exemplo: 'Ich bezahle die Rechnung.', traducaoExemplo: 'Pago a conta.' },
  { verbo: 'kosten', traducao: 'custar', exemplo: 'Das kostet einen Euro.', traducaoExemplo: 'Isso custa um euro.' },
  { verbo: 'besuchen', traducao: 'visitar', exemplo: 'Ich besuche einen Freund.', traducaoExemplo: 'Visito um amigo.' },
];

// BLOCO 2: DADOS DOS TEXTOS E ATIVIDADES A14-A29

// 2.1 Texto A14 — Phonetik: Umlaute – ö [ø:] e [œ]
export const PHONETIK_OE_DATA = {
  long: [
    { word: 'schön', ipa: '[ʃøːn]', trans: 'bonito' },
    { word: 'hören', ipa: '[ˈhøːʁən]', trans: 'ouvir' },
    { word: 'Danke schön!', ipa: '[ˈdaŋkə ʃøːn]', trans: 'Muito obrigado!' },
  ],
  longSentences: [
    { de: 'Wir hören gern Musik.', pt: 'Nós gostamos de ouvir música.' },
    { de: 'Das ist ein schöner Stuhl.', pt: 'Essa é uma cadeira bonita.' },
  ],
  short: [
    { word: 'zwölf', ipa: '[tsvœlf]', trans: 'doze' },
    { word: 'Wörter', ipa: '[ˈvœʁtɐ]', trans: 'palavras' },
    { word: 'Wörterbuch', ipa: '[ˈvœʁtɐbuːx]', trans: 'dicionário' },
    { word: 'können', ipa: '[ˈkœnən]', trans: 'poder, conseguir' },
    { word: 'möchten', ipa: '[ˈmœçtən]', trans: 'gostaria' },
    { word: 'öffnen', ipa: '[ˈœfnən]', trans: 'abrir' },
  ],
  shortSentences: [
    { de: 'Meine Kinder können schon zwölf deutsche Wörter schreiben.', pt: 'Meus filhos já sabem escrever doze palavras alemãs.' },
    { de: 'Im Regal steht ein altes Wörterbuch.', pt: 'Na estante está um dicionário velho.' },
    { de: 'Könnt ihr das Wort buchstabieren?', pt: 'Vocês conseguem soletrar a palavra?' },
    { de: 'Sind das elf oder zwölf Wörter?', pt: 'São onze ou doze palavras?' },
    { de: 'Möchten Sie ein Doppelzimmer?', pt: 'O senhor gostaria de um quarto duplo?' },
  ],
  testItems: [
    { id: 't1', word: 'können', answer: 'ö', pt: 'poder' },
    { id: 't2', word: 'können', answer: 'ö', pt: 'poder' },
    { id: 't3', word: 'zwölf', answer: 'ö', pt: 'doze' },
    { id: 't4', word: 'lesen', answer: 'e', pt: 'ler' },
    { id: 't5', word: 'öffnen', answer: 'ö', pt: 'abrir' },
    { id: 't6', word: 'senden', answer: 'e', pt: 'enviar' },
    { id: 't7', word: 'elf', answer: 'e', pt: 'onze' },
  ],
};

// 2.2 Texto A15 — Ich kann nicht ... (11 situações no hotel)
export interface HotelProblemItem {
  id: number;
  situacao: string;
  situacaoPt: string;
  verbo: string;
  fraseCompleta: string;
  traducao: string;
}

export const HOTEL_PROBLEMS_A15: HotelProblemItem[] = [
  {
    id: 0,
    situacao: 'Meine Kreditkarte ist weg.',
    situacaoPt: 'Meu cartão de crédito sumiu/foi embora.',
    verbo: 'bezahlen',
    fraseCompleta: 'Ich kann nicht bezahlen.',
    traducao: 'Eu não posso pagar.',
  },
  {
    id: 1,
    situacao: 'Die Dusche ist kaputt.',
    situacaoPt: 'O chuveiro está quebrado.',
    verbo: 'duschen',
    fraseCompleta: 'Ich kann nicht duschen.',
    traducao: 'Eu não consigo tomar banho.',
  },
  {
    id: 2,
    situacao: 'Der Fernseher geht nicht.',
    situacaoPt: 'A televisão não funciona.',
    verbo: 'sehen',
    fraseCompleta: 'Ich kann keinen Film sehen.',
    traducao: 'Eu não consigo assistir a nenhum filme.',
  },
  {
    id: 3,
    situacao: 'Mein Zimmerschlüssel ist weg.',
    situacaoPt: 'A chave do meu quarto sumiu.',
    verbo: 'öffnen',
    fraseCompleta: 'Ich kann die Tür nicht öffnen.',
    traducao: 'Eu não consigo abrir a porta.',
  },
  {
    id: 4,
    situacao: 'Das Bett ist zu hart.',
    situacaoPt: 'A cama é dura demais.',
    verbo: 'schlafen',
    fraseCompleta: 'Ich kann nicht schlafen.',
    traducao: 'Eu não consigo dormir.',
  },
  {
    id: 5,
    situacao: 'Der Sessel ist nicht stabil.',
    situacaoPt: 'A poltrona não é firme/estável.',
    verbo: 'sitzen',
    fraseCompleta: 'Man kann nicht sitzen.',
    traducao: 'Não dá para sentar.',
  },
  {
    id: 6,
    situacao: 'Im Zimmer gibt es keinen Schreibtisch.',
    situacaoPt: 'No quarto não há nenhuma escrivaninha.',
    verbo: 'arbeiten',
    fraseCompleta: 'Ich kann nicht arbeiten.',
    traducao: 'Eu não consigo trabalhar.',
  },
  {
    id: 7,
    situacao: 'Das Telefon funktioniert nicht.',
    situacaoPt: 'O telefone não funciona.',
    verbo: 'telefonieren',
    fraseCompleta: 'Ich kann nicht telefonieren.',
    traducao: 'Eu não consigo telefonar.',
  },
  {
    id: 8,
    situacao: 'Ich habe kein WLAN.',
    situacaoPt: 'Eu não tenho Wi-Fi.',
    verbo: 'senden',
    fraseCompleta: 'Ich kann keine E-Mails senden.',
    traducao: 'Eu não consigo enviar e-mails.',
  },
  {
    id: 9,
    situacao: 'Die Lampe ist kaputt.',
    situacaoPt: 'A lâmpada está quebrada.',
    verbo: 'lesen',
    fraseCompleta: 'Ich kann nicht lesen.',
    traducao: 'Eu não consigo ler.',
  },
  {
    id: 10,
    situacao: 'Es gibt keine Tiefgarage.',
    situacaoPt: 'Não há garagem subterrânea.',
    verbo: 'parken',
    fraseCompleta: 'Ich kann mein Auto hier nicht parken.',
    traducao: 'Eu não posso estacionar meu carro aqui.',
  },
];

// 2.3 Texto A16 — Die Nomengruppe im Nominativ (Perguntas sobre objetos com defeito)
export interface DefectiveItemNominativ {
  id: number;
  prompt: string;
  artigoAdjetivo: string;
  substantivo: string;
  genero: string;
  fraseCompleta: string;
  traducao: string;
}

export const NOMINATIV_A16_ITEMS: DefectiveItemNominativ[] = [
  {
    id: 0,
    prompt: 'der neue Fernseher',
    artigoAdjetivo: 'der neue',
    substantivo: 'Fernseher',
    genero: 'Masculino',
    fraseCompleta: 'Ist der neue Fernseher kaputt?',
    traducao: 'A nova televisão está quebrada?',
  },
  {
    id: 1,
    prompt: 'die schöne Uhr',
    artigoAdjetivo: 'die schöne',
    substantivo: 'Uhr',
    genero: 'Feminino',
    fraseCompleta: 'Ist die schöne Uhr kaputt?',
    traducao: 'O relógio bonito está quebrado?',
  },
  {
    id: 2,
    prompt: 'das alte Auto',
    artigoAdjetivo: 'das alte',
    substantivo: 'Auto',
    genero: 'Neutro',
    fraseCompleta: 'Ist das alte Auto kaputt?',
    traducao: 'O carro velho está quebrado?',
  },
  {
    id: 3,
    prompt: 'die teure Kaffeemaschine',
    artigoAdjetivo: 'die teure',
    substantivo: 'Kaffeemaschine',
    genero: 'Feminino',
    fraseCompleta: 'Ist die teure Kaffeemaschine kaputt?',
    traducao: 'A cafeteira cara está quebrada?',
  },
  {
    id: 4,
    prompt: 'das neue iPad',
    artigoAdjetivo: 'das neue',
    substantivo: 'iPad',
    genero: 'Neutro',
    fraseCompleta: 'Ist das neue iPad kaputt?',
    traducao: 'O novo iPad está quebrado?',
  },
  {
    id: 5,
    prompt: 'die moderne Lampe',
    artigoAdjetivo: 'die moderne',
    substantivo: 'Lampe',
    genero: 'Feminino',
    fraseCompleta: 'Ist die moderne Lampe kaputt?',
    traducao: 'A luminária moderna está quebrada?',
  },
  {
    id: 6,
    prompt: 'der alte Computer',
    artigoAdjetivo: 'der alte',
    substantivo: 'Computer',
    genero: 'Masculino',
    fraseCompleta: 'Ist der alte Computer kaputt?',
    traducao: 'O computador velho está quebrado?',
  },
  {
    id: 7,
    prompt: 'der bequeme Stuhl',
    artigoAdjetivo: 'der bequeme',
    substantivo: 'Stuhl',
    genero: 'Masculino',
    fraseCompleta: 'Ist der bequeme Stuhl kaputt?',
    traducao: 'A cadeira confortável está quebrada?',
  },
];

// 2.4 Texto A17 — Die Nomengruppe im Akkusativ
export interface AkkusativA17Item {
  id: number;
  sujeitoVerbo: string;
  adjetivoSubstantivo: string;
  acusativoCorreto: string;
  genero: string;
  fraseCompleta: string;
  traducao: string;
}

export const AKKUSATIV_A17_ITEMS: AkkusativA17Item[] = [
  {
    id: 0,
    sujeitoVerbo: 'Ich brauche',
    adjetivoSubstantivo: 'neu, Fernseher',
    acusativoCorreto: 'einen neuen Fernseher',
    genero: 'Masculino',
    fraseCompleta: 'Ich brauche einen neuen Fernseher.',
    traducao: 'Preciso de uma televisão nova.',
  },
  {
    id: 1,
    sujeitoVerbo: 'Martin möchte',
    adjetivoSubstantivo: 'groß, Schreibtisch',
    acusativoCorreto: 'einen großen Schreibtisch',
    genero: 'Masculino',
    fraseCompleta: 'Martin möchte einen großen Schreibtisch.',
    traducao: 'Martin gostaria de uma escrivaninha grande.',
  },
  {
    id: 2,
    sujeitoVerbo: 'Wir brauchen',
    adjetivoSubstantivo: 'alt, Auto',
    acusativoCorreto: 'ein altes Auto',
    genero: 'Neutro',
    fraseCompleta: 'Wir brauchen ein altes Auto.',
    traducao: 'Precisamos de um carro velho.',
  },
  {
    id: 3,
    sujeitoVerbo: 'Herr Krumm möchte',
    adjetivoSubstantivo: 'teuer, Uhr',
    acusativoCorreto: 'eine teure Uhr',
    genero: 'Feminino',
    fraseCompleta: 'Herr Krumm möchte eine teure Uhr.',
    traducao: 'O Sr. Krumm gostaria de um relógio caro.',
  },
  {
    id: 4,
    sujeitoVerbo: 'Ich habe',
    adjetivoSubstantivo: 'bequem, Sessel',
    acusativoCorreto: 'einen bequemen Sessel',
    genero: 'Masculino',
    fraseCompleta: 'Ich habe einen bequemen Sessel.',
    traducao: 'Tenho uma poltrona confortável.',
  },
  {
    id: 5,
    sujeitoVerbo: 'Er möchte',
    adjetivoSubstantivo: 'kalt, Bier',
    acusativoCorreto: 'ein kaltes Bier',
    genero: 'Neutro',
    fraseCompleta: 'Er möchte ein kaltes Bier.',
    traducao: 'Ele gostaria de uma cerveja gelada.',
  },
  {
    id: 6,
    sujeitoVerbo: 'Wir brauchen',
    adjetivoSubstantivo: 'groß, Doppelzimmer',
    acusativoCorreto: 'ein großes Doppelzimmer',
    genero: 'Neutro',
    fraseCompleta: 'Wir brauchen ein großes Doppelzimmer.',
    traducao: 'Precisamos de um quarto duplo grande.',
  },
  {
    id: 7,
    sujeitoVerbo: 'Ich möchte',
    adjetivoSubstantivo: 'weich, Bett',
    acusativoCorreto: 'ein weiches Bett',
    genero: 'Neutro',
    fraseCompleta: 'Ich möchte ein weiches Bett.',
    traducao: 'Gostaria de uma cama macia.',
  },
  {
    id: 8,
    sujeitoVerbo: 'Der neue Informatiker hat',
    adjetivoSubstantivo: 'gut, Drucker',
    acusativoCorreto: 'einen guten Drucker',
    genero: 'Masculino',
    fraseCompleta: 'Der neue Informatiker hat einen guten Drucker.',
    traducao: 'O novo técnico de TI tem uma boa impressora.',
  },
  {
    id: 9,
    sujeitoVerbo: 'Das moderne Hotel hat',
    adjetivoSubstantivo: 'französisch, Spezialitätenrestaurant',
    acusativoCorreto: 'ein französisches Spezialitätenrestaurant',
    genero: 'Neutro',
    fraseCompleta: 'Das moderne Hotel hat ein französisches Spezialitätenrestaurant.',
    traducao: 'O hotel moderno tem um restaurante de especialidades francesas.',
  },
  {
    id: 10,
    sujeitoVerbo: 'Meine Freundin möchte',
    adjetivoSubstantivo: 'interessant, Buch',
    acusativoCorreto: 'ein interessantes Buch',
    genero: 'Neutro',
    fraseCompleta: 'Meine Freundin möchte ein interessantes Buch.',
    traducao: 'Minha namorada/amiga gostaria de um livro interessante.',
  },
];

// 2.5 Texto A18 — Was es in einer Stadt alles gibt (Locais e atividades)
export interface CityPlaceActivity {
  id: number;
  atividade: string;
  atividadePt: string;
  localCorreto: string;
  artigo: string;
  genero: string;
  fraseCompleta: string;
  traducao: string;
}

export const CITY_PLACES_A18: CityPlaceActivity[] = [
  {
    id: 0,
    atividade: 'Informationen bekommen',
    atividadePt: 'obter informações',
    localCorreto: 'die Touristeninformation',
    artigo: 'die',
    genero: 'Feminino',
    fraseCompleta: 'Hier kann man Informationen bekommen: die Touristeninformation.',
    traducao: 'Aqui se pode obter informações: o posto de informações turísticas.',
  },
  {
    id: 1,
    atividade: 'übernachten',
    atividadePt: 'pernoitar, passar a noite',
    localCorreto: 'das Hotel',
    artigo: 'das',
    genero: 'Neutro',
    fraseCompleta: 'Hier kann man übernachten: das Hotel.',
    traducao: 'Aqui se pode pernoitar: o hotel.',
  },
  {
    id: 2,
    atividade: 'eine Oper oder ein Theaterstück sehen',
    atividadePt: 'ver uma ópera ou uma peça de teatro',
    localCorreto: 'die Oper / das Theater',
    artigo: 'die / das',
    genero: 'Fem. / Neutro',
    fraseCompleta: 'Hier kann man eine Oper oder ein Theaterstück sehen: die Oper oder das Theater.',
    traducao: 'Aqui se pode ver uma ópera ou peça de teatro: a ópera ou o teatro.',
  },
  {
    id: 3,
    atividade: 'etwas essen',
    atividadePt: 'comer algo',
    localCorreto: 'das Restaurant',
    artigo: 'das',
    genero: 'Neutro',
    fraseCompleta: 'Hier kann man etwas essen: das Restaurant.',
    traducao: 'Aqui se pode comer algo: o restaurante.',
  },
  {
    id: 4,
    atividade: 'eine Tasse Kaffee trinken',
    atividadePt: 'tomar uma xícara de café',
    localCorreto: 'das Café',
    artigo: 'das',
    genero: 'Neutro',
    fraseCompleta: 'Hier kann man eine Tasse Kaffee trinken: das Café.',
    traducao: 'Aqui se pode tomar um café: o café.',
  },
  {
    id: 5,
    atividade: 'sein Auto parken',
    atividadePt: 'estacionar o carro',
    localCorreto: 'der Parkplatz',
    artigo: 'der',
    genero: 'Masculino',
    fraseCompleta: 'Hier kann man sein Auto parken: der Parkplatz.',
    traducao: 'Aqui se pode estacionar o carro: o estacionamento.',
  },
  {
    id: 6,
    atividade: 'Geld bekommen',
    atividadePt: 'obter / sacar dinheiro',
    localCorreto: 'die Bank',
    artigo: 'die',
    genero: 'Feminino',
    fraseCompleta: 'Hier kann man Geld bekommen: die Bank.',
    traducao: 'Aqui se pode obter dinheiro: o banco.',
  },
  {
    id: 7,
    atividade: 'einen Film sehen',
    atividadePt: 'assistir a um filme',
    localCorreto: 'das Kino',
    artigo: 'das',
    genero: 'Neutro',
    fraseCompleta: 'Hier kann man einen Film sehen: das Kino.',
    traducao: 'Aqui se pode assistir a um filme: o cinema.',
  },
  {
    id: 8,
    atividade: 'Briefmarken kaufen',
    atividadePt: 'comprar selos postais',
    localCorreto: 'die Post',
    artigo: 'die',
    genero: 'Feminino',
    fraseCompleta: 'Hier kann man Briefmarken kaufen: die Post.',
    traducao: 'Aqui se pode comprar selos: a agência dos correios.',
  },
  {
    id: 9,
    atividade: 'studieren',
    atividadePt: 'cursar ensino superior / fazer faculdade',
    localCorreto: 'die Universität',
    artigo: 'die',
    genero: 'Feminino',
    fraseCompleta: 'Hier kann man studieren: die Universität.',
    traducao: 'Aqui se pode fazer faculdade: a universidade.',
  },
  {
    id: 10,
    atividade: 'Lebensmittel kaufen',
    atividadePt: 'comprar mantimentos / alimentos',
    localCorreto: 'der Supermarkt',
    artigo: 'der',
    genero: 'Masculino',
    fraseCompleta: 'Hier kann man Lebensmittel kaufen: der Supermarkt.',
    traducao: 'Aqui se pode comprar alimentos: o supermercado.',
  },
  {
    id: 11,
    atividade: 'berühmte Bilder bewundern',
    atividadePt: 'admirar quadros e obras famosas',
    localCorreto: 'das Museum',
    artigo: 'das',
    genero: 'Neutro',
    fraseCompleta: 'Hier kann man berühmte Bilder bewundern: das Museum.',
    traducao: 'Aqui se pode admirar quadros famosos: o museu.',
  },
  {
    id: 12,
    atividade: 'Hier regiert der Bürgermeister',
    atividadePt: 'Aqui governa o prefeito',
    localCorreto: 'das Rathaus',
    artigo: 'das',
    genero: 'Neutro',
    fraseCompleta: 'Hier regiert der Bürgermeister: das Rathaus.',
    traducao: 'Aqui governa o prefeito: a prefeitura.',
  },
  {
    id: 13,
    atividade: 'eine Aspirintablette kaufen',
    atividadePt: 'comprar um comprimido de aspirina',
    localCorreto: 'die Apotheke',
    artigo: 'die',
    genero: 'Feminino',
    fraseCompleta: 'Hier kann man eine Aspirintablette kaufen: die Apotheke.',
    traducao: 'Aqui se pode comprar um comprimido de aspirina: a farmácia.',
  },
  {
    id: 14,
    atividade: 'Hier halten Züge',
    atividadePt: 'Aqui param trens',
    localCorreto: 'der Bahnhof',
    artigo: 'der',
    genero: 'Masculino',
    fraseCompleta: 'Hier halten Züge: der Bahnhof.',
    traducao: 'Aqui param trens: a estação ferroviária.',
  },
];

// 2.6 Texto A19 — Phonetik: Umlaute – ü [y:] e [y]
export const PHONETIK_UE_DATA = {
  long: [
    { word: 'Frühstück', ipa: '[ˈfʁyːʃtʏk]', trans: 'café da manhã' },
    { word: 'für', ipa: '[fyːɐ̯]', trans: 'para' },
    { word: 'natürlich', ipa: '[naˈtyːɐ̯lɪç]', trans: 'naturalmente' },
    { word: 'Bücher', ipa: '[ˈbyːçɐ]', trans: 'livros' },
    { word: 'Handtücher', ipa: '[ˈhantˌtyːçɐ]', trans: 'toalhas de mão' },
    { word: 'Züge', ipa: '[ˈtsyːɡə]', trans: 'trens' },
  ],
  short: [
    { word: 'fünf', ipa: '[fʏnf]', trans: 'cinco' },
    { word: 'Schlüssel', ipa: '[ˈʃlʏsl̩]', trans: 'chave' },
    { word: 'wünschen', ipa: '[ˈvʏnʃn̩]', trans: 'desejar' },
    { word: 'München', ipa: '[ˈmʏnçn̩]', trans: 'Munique' },
    { word: 'Münzen', ipa: '[ˈmʏntsn̩]', trans: 'moedas' },
    { word: 'Glück', ipa: '[ɡlʏk]', trans: 'sorte, felicidade' },
  ],
  sentences: [
    { de: 'Möchten Sie neue Handtücher?', pt: 'O senhor gostaria de toalhas novas?' },
    { de: 'Natürlich lese ich Bücher!', pt: 'Naturalmente eu leio livros!' },
    { de: 'Das Frühstück ist im Hotelrestaurant.', pt: 'O café da manhã é no restaurante do hotel.' },
    { de: 'Ich habe fünf Münzen aus Griechenland.', pt: 'Tenho cinco moedas da Grécia.' },
    { de: 'Hier ist Ihr Zimmerschlüssel.', pt: 'Aqui está a chave do seu quarto.' },
    { de: 'Sie wünschen?', pt: 'O senhor deseja? / Em que posso ajudar?' },
    { de: 'Ich fahre nach München.', pt: 'Vou para Munique.' },
  ],
  testItems: [
    { id: 'u1', word: 'Bücher', answer: 'ü', pt: 'livros' },
    { id: 'u2', word: 'für', answer: 'ü', pt: 'para' },
    { id: 'u3', word: 'Tür', answer: 'ü', pt: 'porta' },
    { id: 'u4', word: 'Zimmer', answer: 'i', pt: 'quarto' },
    { id: 'u5', word: 'Glück', answer: 'ü', pt: 'sorte' },
    { id: 'u6', word: 'fünf', answer: 'ü', pt: 'cinco' },
    { id: 'u7', word: 'spielen', answer: 'ie', pt: 'jogar/brincar' },
  ],
};

// 2.7, 2.8, 2.10 — Pontos Turísticos de Munique (Sehenswürdigkeiten)
export interface SightseeingVenue {
  id: string;
  name: string;
  namePt: string;
  tipo: string;
  descricaoDe: string;
  descricaoPt: string;
  adresse: string;
  telefon: string;
  offnungszeiten: string;
  offnungszeitenDetail: string;
  eintrittspreise: {
    tageskarte: string;
    studenten: string;
    sonstiges?: string;
  };
  destaques: string[];
}

export const SIGHTSEEING_MUNICH: SightseeingVenue[] = [
  {
    id: 'deutsches-museum',
    name: 'Das Deutsche Museum',
    namePt: 'O Museu Alemão',
    tipo: 'Naturwissenschaftlich-technisches Museum',
    descricaoDe: 'Segelschiffe, Windmühlen, Industrieroboter, Raumsonden – das alles finden Sie im Deutschen Museum. Es zeigt viele technische Erfindungen und hat eine Ausstellungsfläche von 50 000 qm (Quadratmeter).',
    descricaoPt: 'Barcos a vela, moinhos de vento, robôs industriais, sondas espaciais – tudo isso você encontra no Deutsches Museum. É um museu técnico-científico que exibe inúmeras invenções e possui uma área expositiva de 50.000 m².',
    adresse: 'Museumsinsel 1, 80538 München',
    telefon: '(089) 2179333',
    offnungszeiten: 'Täglich 9.00 bis 17.00 Uhr',
    offnungszeitenDetail: 'Abre diariamente às 9h00 e fecha pontualmente às 17h00.',
    eintrittspreise: {
      tageskarte: '14,00 Euro',
      studenten: '4,50 Euro',
      sonstiges: 'Familienkarte: 29,00 Euro',
    },
    destaques: ['50.000 m² de área', 'Invenções tecnológicas mundiais', 'Sondas espaciais e robôs'],
  },
  {
    id: 'englischer-garten',
    name: 'Der Englische Garten',
    namePt: 'O Jardim Inglês',
    tipo: 'Öffentlicher Stadtpark & Naherholung',
    descricaoDe: 'Der Englische Garten ist 373 ha (Hektar) groß und 200 Jahre alt. Er bietet viele Freizeitmöglichkeiten. Man kann dort lange Spaziergänge machen oder im Biergarten ein kühles Bier trinken und etwas essen.',
    descricaoPt: 'O Englischer Garten tem 373 hectares e 200 anos de história. Oferece muitas opções de lazer. Pode-se fazer longas caminhadas ou tomar uma cerveja bem gelada e comer algo típico no Biergarten.',
    adresse: 'Zwischen Prinzregentenstraße und Freimann',
    telefon: 'Sem telefone (parque público)',
    offnungszeiten: 'Immer geöffnet (24/7)',
    offnungszeitenDetail: 'Sempre aberto ao público dia e noite.',
    eintrittspreise: {
      tageskarte: 'Eintritt frei (Gratuito)',
      studenten: 'Eintritt frei',
      sonstiges: 'Acesso livre a toda a área verde e riachos.',
    },
    destaques: ['373 hectares de extensão', 'Mais de 200 anos de história', 'Biergarten tradicional ao ar livre'],
  },
  {
    id: 'pinakothek-der-moderne',
    name: 'Die Pinakothek der Moderne',
    namePt: 'A Pinacoteca da Modernidade',
    tipo: 'Kunst- und Designmuseum des 20./21. Jahrhunderts',
    descricaoDe: 'Die Pinakothek der Moderne zeigt bedeutende Kunstwerke aus dem 20. Jahrhundert. Man kann dort Bilder von Wassily Kandinsky, Paul Klee, Pablo Picasso oder René Magritte bewundern.',
    descricaoPt: 'A Pinakothek der Moderne reúne obras de arte fundamentais do século XX. Pode-se admirar quadros de mestres como Wassily Kandinsky, Paul Klee, Pablo Picasso ou René Magritte.',
    adresse: 'Kunstareal München, Barer Str. 40, 80333 München',
    telefon: '(089) 23805360',
    offnungszeiten: 'Dienstag bis Sonntag: 10.00 bis 18.00 Uhr | Donnerstag: 10.00 bis 20.00 Uhr | Montag geschlossen',
    offnungszeitenDetail: 'Terça a domingo das 10h às 18h; quintas até as 20h. Fechado às segundas.',
    eintrittspreise: {
      tageskarte: '10,00 Euro',
      studenten: '5,00 Euro',
      sonstiges: 'Sonntags nur 1,00 Euro!',
    },
    destaques: ['Obras de Pablo Picasso e René Magritte', 'Design e arquitetura contemporânea', 'Domingos por apenas 1 Euro'],
  },
  {
    id: 'bmw-museum',
    name: 'Das BMW Museum',
    namePt: 'O Museu da BMW',
    tipo: 'Automobil- und Unternehmensmuseum',
    descricaoDe: 'Das BMW Museum zeigt die Geschichte des Unternehmens BMW. Hier können Besucher auch 125 besondere Autos und Motorräder sehen.',
    descricaoPt: 'O Museu BMW retrata toda a história centenária da marca BMW. Aqui os visitantes podem contemplar 125 modelos raros e icônicos de automóveis e motocicletas.',
    adresse: 'Am Olympiapark 2, 80809 München',
    telefon: '(089) 125016001',
    offnungszeiten: 'Dienstag bis Sonntag: 10.00 bis 18.00 Uhr | Montag: Ruhetag (geschlossen)',
    offnungszeitenDetail: 'Terça a domingo das 10h às 18h. Segunda-feira é dia de descanso (Ruhetag).',
    eintrittspreise: {
      tageskarte: '10,00 Euro',
      studenten: '7,00 Euro',
      sonstiges: 'Descontos especiais para grupos e famílias.',
    },
    destaques: ['125 veículos lendários e motocicletas', 'História e inovação da engenharia bávara', 'Localizado no histórico Parque Olímpico'],
  },
];

// 2.9 & 2.22 — Zeitangaben (Indicações de Tempo e Horários)
export interface TimeExpressionItem {
  alemao: string;
  traducao: string;
  categoria: 'Uhrzeit' | 'Wochentage' | 'Tageszeiten';
  exemplo: string;
  exemploPt: string;
}

export const TIME_EXPRESSIONS: TimeExpressionItem[] = [
  { alemao: 'Um wie viel Uhr? / Wann?', traducao: 'A que horas? / Quando?', categoria: 'Uhrzeit', exemplo: 'Wann öffnet das Museum? Um 9.00 Uhr.', exemploPt: 'Quando o museu abre? Às 9h00.' },
  { alemao: 'Von ... bis ...', traducao: 'Das ... às ... / De ... até ...', categoria: 'Uhrzeit', exemplo: 'Von 9.00 Uhr bis 18.00 Uhr.', exemploPt: 'Das 9h00 às 18h00.' },
  { alemao: 'Wie lange?', traducao: 'Por quanto tempo? / Até quando?', categoria: 'Uhrzeit', exemplo: 'Wie lange hat das Museum geöffnet?', exemploPt: 'Até que horas o museu fica aberto?' },
  { alemao: 'am Montag / am Dienstag ...', traducao: 'na segunda-feira / na terça-feira', categoria: 'Wochentage', exemplo: 'Am Montag ist das Museum geschlossen.', exemploPt: 'Na segunda-feira o museu está fechado.' },
  { alemao: 'am Wochenende', traducao: 'no fim de semana', categoria: 'Wochentage', exemplo: 'Am Wochenende besuche ich meine Eltern.', exemploPt: 'No fim de semana visito meus pais.' },
  { alemao: 'von Montag bis Sonntag = täglich', traducao: 'de segunda a domingo = diariamente', categoria: 'Wochentage', exemplo: 'Das Deutsche Museum ist täglich geöffnet.', exemploPt: 'O Museu Alemão abre diariamente.' },
  { alemao: 'montags (jeden Montag)', traducao: 'às segundas-feiras (toda segunda)', categoria: 'Wochentage', exemplo: 'Montags ist Ruhetag.', exemploPt: 'Às segundas é o dia de folga.' },
  { alemao: 'sonntags', traducao: 'aos domingos (todo domingo)', categoria: 'Wochentage', exemplo: 'Sonntags kostet die Karte nur einen Euro.', exemploPt: 'Aos domingos o ingresso custa só 1 euro.' },
  { alemao: 'heute Vormittag / Mittag / Nachmittag', traducao: 'hoje de manhã / ao meio-dia / à tarde', categoria: 'Tageszeiten', exemplo: 'Heute Nachmittag mache ich einen Spaziergang.', exemploPt: 'Hoje à tarde faço uma caminhada.' },
  { alemao: 'heute Abend / heute Nacht', traducao: 'hoje à noite / esta noite', categoria: 'Tageszeiten', exemplo: 'Heute Abend trinke ich ein Bier.', exemploPt: 'Hoje à noite tomo uma cerveja.' },
  { alemao: 'morgen Vormittag / morgen Abend', traducao: 'amanhã de manhã / amanhã à noite', categoria: 'Tageszeiten', exemplo: 'Morgen Abend schreibe ich eine E-Mail.', exemploPt: 'Amanhã à noite escrevo um e-mail.' },
];

// 2.13 Texto A26 — Tabela de Museus
export interface MuseumTableItem {
  nome: string;
  horario: string;
  precos: string;
}

export const MUSEUMS_A26_TABLE: MuseumTableItem[] = [
  {
    nome: 'Stadtmuseum',
    horario: 'Di.–So. 10.00 bis 18.00 Uhr, am Montag geschlossen',
    precos: '2,50 Euro; Schüler und Studenten 1,50 Euro; sonntags frei',
  },
  {
    nome: 'Ägyptisches Museum',
    horario: 'Di.–Sa. 13.00 bis 17.00 Uhr, So. und Mo. geschlossen',
    precos: '9,50 Euro; Schüler und Studenten 5,00 Euro',
  },
  {
    nome: 'Museum für moderne Kunst',
    horario: 'Mo.–So. 10.00 bis 19.00 Uhr',
    precos: '8,00 Euro; Schüler und Studenten 4,00 Euro; sonntags 1,00 Euro',
  },
  {
    nome: 'Fotomuseum',
    horario: 'Mo.–Fr. 14.00 bis 18.00 Uhr, Sa. und So. geschlossen',
    precos: '1,00 Euro für alle',
  },
  {
    nome: 'Industriemuseum',
    horario: 'Mo.–Sa. 9.00 bis 18.00 Uhr, So. geschlossen',
    precos: '4,00 Euro; für Schüler und Studenten frei',
  },
  {
    nome: 'Museum für Natur und Technik',
    horario: 'Mi.–So. 10.00 bis 17.00 Uhr, Mo. und Di. geschlossen',
    precos: '7,00 Euro für alle',
  },
];

// 2.14 Texto A27 — Eine E-Mail an Klara
export const EMAIL_A27_DATA = {
  from: 'Peter Heinemann <peter.heinemann@yahoo.de>',
  to: 'klara.heinemann@yahoo.de',
  subject: 'Grüße aus München',
  germanBody: `Liebe Klara,

viele Grüße aus München. Mein Hotel liegt im Zentrum. Das Hotelzimmer ist sehr groß. Es hat einen Fernseher und natürlich WLAN. Heute Abend um 20.00 Uhr gibt das Universitätsorchester ein Konzert und ich spiele, wie immer, Klavier.

Aber bis 20.00 Uhr habe ich noch etwas Zeit. Ich möchte gerne das Deutsche Museum besuchen und die vielen interessanten Erfindungen bewundern. Vielleicht mache ich auch noch einen Spaziergang und trinke ein Bier. Aber nur ein Bier, ich möchte heute Abend natürlich gut spielen.

Liebe Grüße
Dein Peter`,
  portugueseBody: `Querida Klara,

Muitas saudações de Munique. Meu hotel fica no centro. O quarto do hotel é muito grande. Tem uma televisão e, naturalmente, Wi-Fi. Hoje à noite às 20h00 a orquestra universitária faz um concerto e eu toco, como sempre, piano.

Mas até as 20h00 ainda tenho um pouco de tempo. Eu gostaria muito de visitar o Deutsches Museum e admirar as muitas invenções interessantes. Talvez eu faça ainda uma caminhada e tome uma cerveja. Mas só uma cerveja, pois hoje à noite quero, naturalmente, tocar bem.

Um forte abraço (Saudações afetuosas),
Do seu Peter`,
  notes: [
    { frase: 'Mein Hotel liegt im Zentrum', analise: 'liegen + im Zentrum (Dativo neutro: in dem → im Zentrum).' },
    { frase: 'Das Hotelzimmer ist sehr groß', analise: 'sein + adjetivo predicativo (sem terminação flexional).' },
    { frase: 'Es hat einen Fernseher', analise: 'haben rege Acusativo masculino: der Fernseher → einen Fernseher.' },
    { frase: 'um 20.00 Uhr gibt das Orchester ein Konzert', analise: 'Inversão verbo-sujeito após marcador temporal no Vorfeld + es gibt / geben com acusativo.' },
    { frase: 'Ich spiele, wie immer, Klavier', analise: 'Instrumentos musicais são usados sem artigo com o verbo spielen.' },
    { frase: 'Ich möchte gerne das Deutsche Museum besuchen', analise: 'Verbo möchten na posição 2 conjugado, infinitivo besuchen no fim absoluto da oração (Satzende).' },
    { frase: 'die vielen interessantes Erfindungen bewundern', analise: 'Infinitivo bewundern no Satzende + acusativo plural com adjetivo fraco (-en).' },
    { frase: 'Vielleicht mache ich auch noch einen Spaziergang', analise: 'Adverbio "Vielleicht" na posição 1 provoca inversão com o verbo mache.' },
    { frase: 'Ich trinke ein Bier', analise: 'trinken rege acusativo neutro: das Bier → ein Bier.' },
  ],
};

// 2.17 Tabela Lexical Primária (25 Termos)
export interface LexicalTerm {
  word: string;
  classe: string;
  plural: string;
  traducao: string;
  fraseModelo: string;
  traducaoFrase: string;
}

export const LEXICAL_TERMS_A14_A29: LexicalTerm[] = [
  {
    word: 'das Museum',
    classe: 'Subst. neutro',
    plural: 'die Museen',
    traducao: 'museu',
    fraseModelo: 'Das Deutsche Museum ist ein naturwissenschaftlich-technisches Museum.',
    traducaoFrase: 'O Museu Alemão é um museu técnico-científico.',
  },
  {
    word: 'die Sehenswürdigkeit',
    classe: 'Subst. fem.',
    plural: 'die Sehenswürdigkeiten',
    traducao: 'ponto turístico, atração',
    fraseModelo: 'Was es in einer Stadt alles gibt an Sehenswürdigkeiten.',
    traducaoFrase: 'O que tudo existe em uma cidade de pontos turísticos.',
  },
  {
    word: 'die Öffnungszeiten',
    classe: 'Subst. fem. plural',
    plural: 'die Öffnungszeiten',
    traducao: 'horário de funcionamento',
    fraseModelo: 'Wann hat das Museum geöffnet?',
    traducaoFrase: 'Quando o museu está aberto?',
  },
  {
    word: 'der Eintritt',
    classe: 'Subst. masc.',
    plural: 'die Eintritte',
    traducao: 'entrada, ingresso',
    fraseModelo: 'Der Eintritt in den Englischen Garten ist frei.',
    traducaoFrase: 'A entrada no Jardim Inglês é gratuita.',
  },
  {
    word: 'die Eintrittskarte',
    classe: 'Subst. fem.',
    plural: 'die Eintrittskarten',
    traducao: 'ingresso, bilhete de entrada',
    fraseModelo: 'Wie viel kostet eine Eintrittskarte?',
    traducaoFrase: 'Quanto custa um bilhete de entrada?',
  },
  {
    word: 'die Tageskarte',
    classe: 'Subst. fem.',
    plural: 'die Tageskarten',
    traducao: 'ingresso diário / passe para o dia todo',
    fraseModelo: 'Eine Tageskarte für das BMW Museum kostet 10 Euro.',
    traducaoFrase: 'Um ingresso diário para o Museu BMW custa 10 euros.',
  },
  {
    word: 'die Studentenkarte',
    classe: 'Subst. fem.',
    plural: 'die Studentenkarten',
    traducao: 'ingresso para estudantes',
    fraseModelo: 'Schüler und Studenten zahlen nur 4,50 Euro.',
    traducaoFrase: 'Alunos e estudantes pagam apenas 4,50 euros.',
  },
  {
    word: 'die Familienkarte',
    classe: 'Subst. fem.',
    plural: 'die Familienkarten',
    traducao: 'ingresso familiar',
    fraseModelo: 'Eine Familienkarte kostet 29 Euro.',
    traducaoFrase: 'Um ingresso familiar custa 29 euros.',
  },
  {
    word: 'die Ausstellungsfläche',
    classe: 'Subst. fem.',
    plural: 'die Ausstellungsflächen',
    traducao: 'área de exposição',
    fraseModelo: 'Es hat eine Ausstellungsfläche von 50 000 qm.',
    traducaoFrase: 'Tem uma área de exposição de 50.000 m².',
  },
  {
    word: 'die Erfindung',
    classe: 'Subst. fem.',
    plural: 'die Erfindungen',
    traducao: 'invenção tecnológica',
    fraseModelo: 'Es zeigt viele technische Erfindungen.',
    traducaoFrase: 'Ele exibe muitas invenções técnicas.',
  },
  {
    word: 'der Spaziergang',
    classe: 'Subst. masc.',
    plural: 'die Spaziergänge',
    traducao: 'caminhada, passeio a pé',
    fraseModelo: 'Man kann dort lange Spaziergänge machen.',
    traducaoFrase: 'Pode-se fazer longas caminhadas lá.',
  },
  {
    word: 'der Biergarten',
    classe: 'Subst. masc.',
    plural: 'die Biergärten',
    traducao: 'jardim de cerveja (área aberta tradicional)',
    fraseModelo: 'Im Biergarten ein kühles Bier trinken.',
    traducaoFrase: 'Beber uma cerveja gelada no Biergarten.',
  },
  {
    word: 'das Kunstwerk',
    classe: 'Subst. neutro',
    plural: 'die Kunstwerke',
    traducao: 'obra de arte',
    fraseModelo: 'Die Pinakothek zeigt bedeutende Kunstwerke.',
    traducaoFrase: 'A Pinacoteca exibe importantes obras de arte.',
  },
  {
    word: 'das Jahrhundert',
    classe: 'Subst. neutro',
    plural: 'die Jahrhunderte',
    traducao: 'século',
    fraseModelo: 'Kunstwerke aus dem 20. Jahrhundert.',
    traducaoFrase: 'Obras de arte do século XX.',
  },
  {
    word: 'das Unternehmen',
    classe: 'Subst. neutro',
    plural: 'die Unternehmen',
    traducao: 'empresa, corporação',
    fraseModelo: 'Das BMW Museum zeigt die Geschichte des Unternehmens BMW.',
    traducaoFrase: 'O Museu BMW mostra a história da empresa BMW.',
  },
  {
    word: 'der Besucher',
    classe: 'Subst. masc.',
    plural: 'die Besucher',
    traducao: 'visitante',
    fraseModelo: 'Hier können Besucher 125 besondere Autos sehen.',
    traducaoFrase: 'Aqui os visitantes podem ver 125 carros especiais.',
  },
  {
    word: 'der Ruhetag',
    classe: 'Subst. masc.',
    plural: 'die Ruhetage',
    traducao: 'dia de descanso / fechamento',
    fraseModelo: 'Montag ist im Museum Ruhetag.',
    traducaoFrase: 'Segunda-feira é o dia de folga no museu.',
  },
  {
    word: 'die Adresse',
    classe: 'Subst. fem.',
    plural: 'die Adressen',
    traducao: 'endereço',
    fraseModelo: 'Die Adresse ist Museumsinsel 1, 80538 München.',
    traducaoFrase: 'O endereço é Museumsinsel 1, 80538 Munique.',
  },
  {
    word: 'die Telefonnummer',
    classe: 'Subst. fem.',
    plural: 'die Telefonnummern',
    traducao: 'número de telefone',
    fraseModelo: 'Die Telefonnummer ist (089) 2179333.',
    traducaoFrase: 'O número de telefone é (089) 2179333.',
  },
  {
    word: 'das WLAN',
    classe: 'Subst. neutro',
    plural: 'sem plural',
    traducao: 'Wi-Fi, rede sem fio',
    fraseModelo: 'Das Hotel hat einen Fernseher und natürlich WLAN.',
    traducaoFrase: 'O hotel tem uma televisão e naturalmente Wi-Fi.',
  },
  {
    word: 'der Fernseher',
    classe: 'Subst. masc.',
    plural: 'die Fernseher',
    traducao: 'televisão, aparelho de TV',
    fraseModelo: 'Der Fernseher im Zimmer ist kaputt.',
    traducaoFrase: 'A televisão no quarto está estragada.',
  },
  {
    word: 'die Minibar',
    classe: 'Subst. fem.',
    plural: 'die Minibars',
    traducao: 'frigobar',
    fraseModelo: 'Die Minibar ist leider ganz leer.',
    traducaoFrase: 'O frigobar infelizmente está completamente vazio.',
  },
  {
    word: 'das Zentrum',
    classe: 'Subst. neutro',
    plural: 'die Zentren',
    traducao: 'centro da cidade',
    fraseModelo: 'Mein Hotel liegt direkt im Zentrum.',
    traducaoFrase: 'Meu hotel fica direto no centro.',
  },
  {
    word: 'das Orchester',
    classe: 'Subst. neutro',
    plural: 'die Orchester',
    traducao: 'orquestra',
    fraseModelo: 'Das Universitätsorchester gibt ein Konzert.',
    traducaoFrase: 'A orquestra universitária faz um concerto.',
  },
  {
    word: 'das Klavier',
    classe: 'Subst. neutro',
    plural: 'die Klaviere',
    traducao: 'piano',
    fraseModelo: 'Ich spiele heute Abend Klavier.',
    traducaoFrase: 'Eu toco piano hoje à noite.',
  },
];

// 2.18 Registro Coloquial e Autêntico (25 Expressões)
export interface ColloquialExpression {
  expressao: string;
  traducao: string;
  contexto: string;
}

export const COLLOQUIAL_EXPRESSIONS: ColloquialExpression[] = [
  { expressao: 'Halt den Mund!', traducao: 'Cala a boca! / Fique quieto!', contexto: 'Informal rude / exasperação' },
  { expressao: 'Lass mich in Ruhe!', traducao: 'Deixa-me em paz!', contexto: 'Emocional, pedido de afastamento' },
  { expressao: 'Was hältst du davon?', traducao: 'O que você acha disso?', contexto: 'Pedido sincero de opinião' },
  { expressao: 'Ich rate dir gut.', traducao: 'Eu te dou um bom conselho.', contexto: 'Aconselhamento amigável' },
  { expressao: "Nimm's leicht!", traducao: 'Leve na boa! / Não esquenta!', contexto: 'Consolo descontraído' },
  { expressao: 'Iss was!', traducao: 'Come alguma coisa!', contexto: 'Convidativo / zelo familiar' },
  { expressao: 'Vergiss es!', traducao: 'Esquece! / Nem pensar!', contexto: 'Rejeição definitiva' },
  { expressao: 'Hilf mir mal!', traducao: 'Me dá uma força aqui!', contexto: 'Pedido informal rápido' },
  { expressao: 'Wirf nicht alles weg!', traducao: 'Não jogue tudo fora!', contexto: 'Advertência de prudência' },
  { expressao: 'Ich sterbe vor Hunger!', traducao: 'Estou morrendo de fome!', contexto: 'Exagero hiperbólico comum' },
  { expressao: 'Das trifft sich gut!', traducao: 'Isso calha muito bem! / Que coincidência ótima!', contexto: 'Circunstância oportuna' },
  { expressao: 'Weißt du was?', traducao: 'Quer saber de uma coisa? / Sabe o quê?', contexto: 'Início enfático de conversa' },
  { expressao: 'Ich weiß nicht.', traducao: 'Eu não sei. / Sei lá.', contexto: 'Resposta de dúvida' },
  { expressao: 'Woher soll ich das wissen?', traducao: 'Como é que eu vou saber disso?!', contexto: 'Irritação diante de pergunta inesperada' },
  { expressao: 'Wissen ist Macht.', traducao: 'Conhecimento é poder.', contexto: 'Provérbio clássico' },
  { expressao: 'Ich mag dich.', traducao: 'Eu gosto de você.', contexto: 'Expressão afetiva de carinho' },
  { expressao: 'Magst du mich?', traducao: 'Você gosta de mim?', contexto: 'Pergunta afetiva' },
  { expressao: 'Das mag sein.', traducao: 'Pode ser. / É bem possível.', contexto: 'Concordância comedida' },
  { expressao: 'Reden wir nicht darüber!', traducao: 'Não vamos falar sobre isso!', contexto: 'Mudança deliberada de assunto' },
  { expressao: 'Du redest wirres Zeug.', traducao: 'Você está falando coisas sem nexo / bobagem.', contexto: 'Crítica informal' },
  { expressao: 'Warte mal!', traducao: 'Espera aí! / Peraí!', contexto: 'Pausa momentânea rápida' },
  { expressao: 'Ich kann nicht mehr warten.', traducao: 'Não aguento mais esperar.', contexto: 'Demonstração de impaciência' },
  { expressao: 'Warten wir ab!', traducao: 'Vamos aguardar para ver!', contexto: 'Paciência estratégica' },
  { expressao: 'Darauf habe ich gewartet!', traducao: 'Era por isso que eu estava esperando!', contexto: 'Entusiasmo ao ver algo acontecer' },
  { expressao: 'Bade dich nicht aus!', traducao: 'Não se esgote! / Cuidado no banho!', contexto: 'Advertência carinhosa' },
];

// BLOCO 3: 3.14 e 3.15 TRADUÇÃO REVERSA DE BLINDAGEM (10 Sentenças)
export interface ReverseTranslationItem {
  id: number;
  ptSentence: string;
  deSolution: string;
  points: string[];
}

export const REVERSE_TRANSLATION_ITEMS: ReverseTranslationItem[] = [
  {
    id: 1,
    ptSentence: 'Eu gostaria de um quarto individual. O quarto tem uma televisão e Wi-Fi.',
    deSolution: 'Ich möchte ein Einzelzimmer. Das Zimmer hat einen Fernseher und WLAN.',
    points: [
      'möchten → 1ª pessoa singular: möchte.',
      'ein Einzelzimmer (acusativo neutro: das Einzelzimmer → ein Einzelzimmer).',
      'haben → 3ª pessoa singular: hat.',
      'einen Fernseher (acusativo masculino: der Fernseher → einen Fernseher).',
    ],
  },
  {
    id: 2,
    ptSentence: 'O museu abre diariamente às 9h e fecha às 17h.',
    deSolution: 'Das Museum öffnet täglich um 9.00 Uhr und schließt um 17.00 Uhr.',
    points: [
      'öffnen → 3ª pessoa singular regular: öffnet.',
      'schließen → 3ª pessoa singular regular com -t: schließt.',
      'täglich (advérbio de frequência = von Montag bis Sonntag).',
      'Horário exato exige a preposição um (um 9.00 Uhr / um 17.00 Uhr).',
    ],
  },
  {
    id: 3,
    ptSentence: 'Quanto custa um ingresso diário? — Custa 14 euros.',
    deSolution: 'Was kostet eine Tageskarte? — Sie kostet 14 Euro.',
    points: [
      'kosten → 3ª pessoa singular: kostet.',
      'eine Tageskarte (acusativo feminino: die Tageskarte → eine Tageskarte).',
      'Pronome pessoal sie retoma o substantivo feminino die Tageskarte.',
    ],
  },
  {
    id: 4,
    ptSentence: 'Eu preciso de uma escrivaninha nova. Você tem uma?',
    deSolution: 'Ich brauche einen neuen Schreibtisch. Hast du einen?',
    points: [
      'brauchen → 1ª pessoa: brauche.',
      'einen neuen Schreibtisch: adjetivo atributivo no acusativo masculino (-en no artigo e no adjetivo).',
      'haben → 2ª pessoa singular informal: hast du.',
      'einen: pronome acusativo masculino que substitui den Schreibtisch.',
    ],
  },
  {
    id: 5,
    ptSentence: 'Eu gostaria de uma xícara de café e um pedaço de bolo.',
    deSolution: 'Ich möchte eine Tasse Kaffee und ein Stück Kuchen.',
    points: [
      'möchten → 1ª pessoa singular: möchte.',
      'eine Tasse Kaffee (feminino acusativo sem artigo intermediário).',
      'ein Stück Kuchen (neutro acusativo: das Stück → ein Stück).',
    ],
  },
  {
    id: 6,
    ptSentence: 'Onde fica o Museu Alemão? — Fica no centro de Munique.',
    deSolution: 'Wo ist das Deutsche Museum? — Es ist im Zentrum von München.',
    points: [
      'sein / liegen → 3ª pessoa singular: ist / liegt.',
      'im Zentrum: contração de in + dem (Dativo neutro de localização estática com Wo?).',
      'von München indica a relação geográfica.',
    ],
  },
  {
    id: 7,
    ptSentence: 'Eu vejo um filme. Você também vê um filme?',
    deSolution: 'Ich sehe einen Film. Siehst du auch einen Film?',
    points: [
      'sehen → 1ª pessoa: sehe.',
      'einen Film (masculino acusativo: der Film → einen Film).',
      'sehen → 2ª pessoa com mudança vocálica forte e → ie: du siehst.',
      'Ordem da interrogação de decisão: Verbo na posição 1 (Siehst du...).',
    ],
  },
  {
    id: 8,
    ptSentence: 'Eu leio um romance. Você lê um jornal?',
    deSolution: 'Ich lese einen Roman. Liest du eine Zeitung?',
    points: [
      'lesen → 1ª pessoa: lese.',
      'einen Roman (masculino acusativo: der Roman → einen Roman).',
      'lesen → 2ª pessoa com alternância e sibilante: du liest.',
      'eine Zeitung (feminino acusativo: die Zeitung → eine Zeitung).',
    ],
  },
  {
    id: 9,
    ptSentence: 'Eu bebo um café. Você bebe uma cerveja?',
    deSolution: 'Ich trinke einen Kaffee. Trinkst du ein Bier?',
    points: [
      'trinken → 1ª pessoa: trinke.',
      'einen Kaffee (masculino acusativo: der Kaffee → einen Kaffee).',
      'trinken → 2ª pessoa regular: du trinkst.',
      'ein Bier (neutro acusativo: das Bier → ein Bier).',
    ],
  },
  {
    id: 10,
    ptSentence: 'Eu como uma maçã. Você come uma banana?',
    deSolution: 'Ich esse einen Apfel. Isst du eine Banane?',
    points: [
      'essen → 1ª pessoa: esse.',
      'einen Apfel (masculino acusativo: der Apfel → einen Apfel).',
      'essen → 2ª pessoa com alternância forte e → i: du isst.',
      'eine Banane (feminino acusativo: die Banane → eine Banane).',
    ],
  },
];

// 3.16 Resumo dos Pontos-Chave do Dia 007
export const KEY_POINTS_DAY_007 = [
  { conceito: 'Acusativo (Akkusativ)', regra: 'Apenas o masculino muda: der → den, ein → einen, kein → keinen, mein → meinen. Feminino, Neutro e Plural mantêm exatamente as formas do Nominativo.' },
  { conceito: 'Adjetivo Atributivo no Acusativo', regra: 'Masculino: einen neuen Computer (-en); Feminino: eine neue Lampe (-e); Neutro: ein neues Telefon (-es); Plural: keine neuen Bücher (-en).' },
  { conceito: 'Verbo möchten', regra: 'ich möchte, du möchtest, er/sie/es möchte, wir möchten, ihr möchtet, sie/Sie möchten. Expressa desejo polido com objeto no Acusativo.' },
  { conceito: 'Verbo brauchen', regra: 'ich brauche, du brauchst, er braucht, wir brauchen, ihr braucht, sie brauchen. Em alemão não leva preposição "de", rege Acusativo direto!' },
  { conceito: 'Verbo haben', regra: 'ich habe, du hast, er hat, wir haben, ihr habt, sie haben. Perde o -b- em du hast e er hat.' },
  { conceito: 'Verbos fortes com alternância', regra: 'sehen (du siehst, er sieht), lesen (du liest, er liest), essen (du isst, er isst). Trinken é regular no presente.' },
  { conceito: 'Locais da Cidade', regra: 'das Museum, die Oper, das Theater, das Kino, die Touristeninformation, der Bahnhof, das Hotel, das Rathaus, die Apotheke, der Supermarkt.' },
  { conceito: 'Horários (Öffnungszeiten)', regra: 'Wann hat das Museum geöffnet? — Von 9.00 bis 17.00 Uhr. / Wann öffnet das Museum? — Um 9.00 Uhr.' },
  { conceito: 'Preços (Eintrittspreise)', regra: 'Was kostet eine Eintrittskarte? — Eine Tageskarte kostet 14 Euro. Schüler und Studenten zahlen 4,50 Euro.' },
  { conceito: 'Trema ö [ø:] e [œ]', regra: 'Longo em schön, hören; Curto em zwölf, Wörter, können, möchten, öffnen.' },
  { conceito: 'Trema ü [y:] e [y]', regra: 'Longo em Frühstück, für, natürlich, Bücher; Curto em fünf, Schlüssel, München, Glück.' },
];
