import {
  TopologicalRow,
  ContrastTrap,
  ConjugationRow,
  ProfessionGender,
  NumberRow,
  TextEntry,
  CountryCaseRule,
  AlphabetLetter,
  LexicalTerm,
  ColloquialExpression,
  KeyPoint,
} from '../types';

export const LESSON_METADATA = {
  round: 'RODADA 01',
  day: 'DIA 001 DO CRONOGRAMA',
  chapter: 'KAPITEL 1, TEIL A, A1–A6, p. 8–10',
  title: 'Anatomia Gramatical Pura, Sintaxe Rígida, Transcrição & Mineração Lexical',
  nextRound: 'RODADA 02 — DIA 002 (Kapitel 1, Teil A, A17–A22, p. 13–15: Sprachen und Länder, Phonetik sch/sp, Diphthong ei, Flugzeug, Zahlen, Flüge, Telefonnummern).',
};

// 1.1 Matriz Topológica da Oração Declarativa (Aussagesatz)
export const V2_TOPOLOGICAL_MATRIX: TopologicalRow[] = [
  {
    vorfeld: 'Ich',
    verbo: 'heiße',
    sujeito: '—',
    mittelfeld: 'Franziska Binder.',
    satzende: '—',
    ptTranslation: 'Eu me chamo Franziska Binder.',
  },
  {
    vorfeld: 'Ich',
    verbo: 'bin',
    sujeito: '—',
    mittelfeld: '37 Jahre alt.',
    satzende: '—',
    ptTranslation: 'Eu tenho 37 anos de idade.',
  },
  {
    vorfeld: 'Ich',
    verbo: 'wohne',
    sujeito: '—',
    mittelfeld: 'in Wien.',
    satzende: '—',
    ptTranslation: 'Eu moro em Viena.',
  },
  {
    vorfeld: 'Meine Muttersprache',
    verbo: 'ist',
    sujeito: '—',
    mittelfeld: 'Deutsch.',
    satzende: '—',
    ptTranslation: 'Minha língua materna é alemão.',
  },
  {
    vorfeld: 'Jetzt',
    verbo: 'lerne',
    sujeito: 'ich',
    mittelfeld: 'Deutsch.',
    satzende: '—',
    ptTranslation: 'Agora eu aprendo alemão.',
  },
  {
    vorfeld: 'In Spanien',
    verbo: 'spricht',
    sujeito: 'man',
    mittelfeld: 'Spanisch.',
    satzende: '—',
    ptTranslation: 'Na Espanha fala-se espanhol.',
  },
];

// 1.1 Trava de Contraste para Brasileiros
export const CONTRAST_TRAPS_V2: ContrastTrap[] = [
  {
    portugues: 'Moro em Berlim.',
    alemaoCorreto: 'Ich wohne in Berlin.',
    alemaoIncorreto: 'Wohne in Berlin.',
    nota: 'Omissão indevida do pronome pessoal',
  },
  {
    portugues: 'Estudo medicina.',
    alemaoCorreto: 'Ich studiere Medizin.',
    alemaoIncorreto: 'Studiere Medizin.',
    nota: 'Em alemão não existe sujeito oculto',
  },
  {
    portugues: 'Hoje aprendo alemão.',
    alemaoCorreto: 'Heute lerne ich Deutsch.',
    alemaoIncorreto: 'Heute ich lerne Deutsch.',
    nota: 'Inversão obrigatória: Vorfeld adverbial desloca sujeito para Posição III',
  },
  {
    portugues: 'Tenho 35 anos.',
    alemaoCorreto: 'Ich bin 35 Jahre alt.',
    alemaoIncorreto: 'Ich habe 35 Jahre.',
    nota: 'O alemão usa o verbo sein (ser/estar) para idade, nunca haben',
  },
];

// 1.2 As W-Fragen
export const W_FRAGEN_MATRIX: TopologicalRow[] = [
  { vorfeld: 'Wie', verbo: 'heißen', sujeito: 'Sie?', mittelfeld: '—', satzende: '—', ptTranslation: 'Como o(a) senhor(a) se chama?' },
  { vorfeld: 'Wie', verbo: 'ist', sujeito: 'Ihr Vorname?', mittelfeld: '—', satzende: '—', ptTranslation: 'Qual é o seu primeiro nome?' },
  { vorfeld: 'Wie', verbo: 'ist', sujeito: 'Ihr Familienname?', mittelfeld: '—', satzende: '—', ptTranslation: 'Qual é o seu sobrenome?' },
  { vorfeld: 'Wie alt', verbo: 'sind', sujeito: 'Sie?', mittelfeld: '—', satzende: '—', ptTranslation: 'Quantos anos o(a) senhor(a) tem?' },
  { vorfeld: 'Woher', verbo: 'kommen', sujeito: 'Sie?', mittelfeld: '—', satzende: '—', ptTranslation: 'De onde o(a) senhor(a) vem?' },
  { vorfeld: 'Wo', verbo: 'wohnen', sujeito: 'Sie?', mittelfeld: '—', satzende: '—', ptTranslation: 'Onde o(a) senhor(a) mora?' },
  { vorfeld: 'Was', verbo: 'sind', sujeito: 'Sie', mittelfeld: 'von Beruf?', satzende: '—', ptTranslation: 'Qual é sua profissão?' },
  { vorfeld: 'Welche Sprachen', verbo: 'sprechen', sujeito: 'Sie?', mittelfeld: '—', satzende: '—', ptTranslation: 'Quais línguas o(a) senhor(a) fala?' },
];

// 1.2 Ja-Nein-Fragen
export const JA_NEIN_FRAGEN_MATRIX = [
  { verbo: 'Sprechen', sujeito: 'Sie', mittelfeld: 'Deutsch?', satzende: '—', ptTranslation: 'O senhor / A senhora fala alemão?' },
  { verbo: 'Studierst', sujeito: 'du', mittelfeld: 'in Berlin?', satzende: '—', ptTranslation: 'Você estuda em Berlim?' },
  { verbo: 'Kommen', sujeito: 'Sie', mittelfeld: 'aus Österreich?', satzende: '—', ptTranslation: 'O senhor / A senhora vem da Áustria?' },
];

// 1.3 Matrizes de Conjugação
export const CONJUGATION_KOMMEN: ConjugationRow[] = [
  { pessoa: '1. Sg.', pronome: 'ich', radicalDesinencia: 'komm + e', forma: 'komme' },
  { pessoa: '2. Sg.', pronome: 'du', radicalDesinencia: 'komm + st', forma: 'kommst' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es/man', radicalDesinencia: 'komm + t', forma: 'kommt' },
  { pessoa: '1. Pl.', pronome: 'wir', radicalDesinencia: 'komm + en', forma: 'kommen' },
  { pessoa: '2. Pl.', pronome: 'ihr', radicalDesinencia: 'komm + t', forma: 'kommt' },
  { pessoa: '3. Pl.', pronome: 'sie', radicalDesinencia: 'komm + en', forma: 'kommen' },
  { pessoa: 'Formal', pronome: 'Sie', radicalDesinencia: 'komm + en', forma: 'kommen' },
];

export const CONJUGATION_WOHNEN: ConjugationRow[] = [
  { pessoa: '1. Sg.', pronome: 'ich', radicalDesinencia: 'wohn + e', forma: 'wohne' },
  { pessoa: '2. Sg.', pronome: 'du', radicalDesinencia: 'wohn + st', forma: 'wohnst' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es/man', radicalDesinencia: 'wohn + t', forma: 'wohnt' },
  { pessoa: '1. Pl.', pronome: 'wir', radicalDesinencia: 'wohn + en', forma: 'wohnen' },
  { pessoa: '2. Pl.', pronome: 'ihr', radicalDesinencia: 'wohn + t', forma: 'wohnt' },
  { pessoa: '3. Pl.', pronome: 'sie', radicalDesinencia: 'wohn + en', forma: 'wohnen' },
  { pessoa: 'Formal', pronome: 'Sie', radicalDesinencia: 'wohn + en', forma: 'wohnen' },
];

export const CONJUGATION_HEISSEN: ConjugationRow[] = [
  { pessoa: '1. Sg.', pronome: 'ich', radicalDesinencia: 'heiß + e', forma: 'heiße' },
  { pessoa: '2. Sg.', pronome: 'du', radicalDesinencia: 'heiß + t (NÃO -st!)', forma: 'heißt' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es/man', radicalDesinencia: 'heiß + t', forma: 'heißt' },
  { pessoa: '1. Pl.', pronome: 'wir', radicalDesinencia: 'heiß + en', forma: 'heißen' },
  { pessoa: '2. Pl.', pronome: 'ihr', radicalDesinencia: 'heiß + t', forma: 'heißt' },
  { pessoa: '3. Pl.', pronome: 'sie', radicalDesinencia: 'heiß + en', forma: 'heißen' },
  { pessoa: 'Formal', pronome: 'Sie', radicalDesinencia: 'heiß + en', forma: 'heißen' },
];

export const CONJUGATION_SEIN: { pessoa: string; pronome: string; forma: string }[] = [
  { pessoa: '1. Sg.', pronome: 'ich', forma: 'bin' },
  { pessoa: '2. Sg.', pronome: 'du', forma: 'bist' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es/man', forma: 'ist' },
  { pessoa: '1. Pl.', pronome: 'wir', forma: 'sind' },
  { pessoa: '2. Pl.', pronome: 'ihr', forma: 'seid' },
  { pessoa: '3. Pl.', pronome: 'sie', forma: 'sind' },
  { pessoa: 'Formal', pronome: 'Sie', forma: 'sind' },
];

export const CONJUGATION_ARBEITEN: ConjugationRow[] = [
  { pessoa: '1. Sg.', pronome: 'ich', radicalDesinencia: 'arbeit + e', forma: 'arbeite' },
  { pessoa: '2. Sg.', pronome: 'du', radicalDesinencia: 'arbeit + est', forma: 'arbeitest' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es/man', radicalDesinencia: 'arbeit + et', forma: 'arbeitet' },
  { pessoa: '1. Pl.', pronome: 'wir', radicalDesinencia: 'arbeit + en', forma: 'arbeiten' },
  { pessoa: '2. Pl.', pronome: 'ihr', radicalDesinencia: 'arbeit + et', forma: 'arbeitet' },
  { pessoa: '3. Pl.', pronome: 'sie', radicalDesinencia: 'arbeit + en', forma: 'arbeiten' },
  { pessoa: 'Formal', pronome: 'Sie', radicalDesinencia: 'arbeit + en', forma: 'arbeiten' },
];

// 1.4 Profissões sem Artigo Indefinido
export const PROFESSIONS_NO_ARTICLE: ContrastTrap[] = [
  { portugues: 'Sou professor.', alemaoCorreto: 'Ich bin Lehrer.', alemaoIncorreto: 'Ich bin ein Lehrer.' },
  { portugues: 'Ela é médica.', alemaoCorreto: 'Sie ist Ärztin.', alemaoIncorreto: 'Sie ist eine Ärztin.' },
  { portugues: 'Ele se tornará engenheiro.', alemaoCorreto: 'Er wird Ingenieur.', alemaoIncorreto: 'Er wird ein Ingenieur.' },
];

// 1.5 Gênero dos Substantivos e Profissões
export const PROFESSIONS_GENDER: ProfessionGender[] = [
  { masculino: 'der Lehrer', feminino: 'die Lehrerin', traducao: 'professor / professora' },
  { masculino: 'der Ingenieur', feminino: 'die Ingenieurin', traducao: 'engenheiro / engenheira' },
  { masculino: 'der Mathematiker', feminino: 'die Mathematikerin', traducao: 'matemático / matemática' },
  { masculino: 'der Student', feminino: 'die Studentin', traducao: 'estudante universitário(a)' },
  { masculino: 'der Taxifahrer', feminino: 'die Taxifahrerin', traducao: 'motorista de táxi' },
  { masculino: 'der Assistent', feminino: 'die Assistentin', traducao: 'assistente' },
  { masculino: 'der Kellner', feminino: 'die Kellnerin', traducao: 'garçom / garçonete' },
  { masculino: 'der Manager', feminino: 'die Managerin', traducao: 'gerente' },
  { masculino: 'der Architekt', feminino: 'die Architektin', traducao: 'arquiteto / arquiteta' },
  { masculino: 'der Arzt', feminino: 'die Ärztin', traducao: 'médico / médica' },
  { masculino: 'der Informatiker', feminino: 'die Informatikerin', traducao: 'cientista da computação' },
  { masculino: 'der Chemiker', feminino: 'die Chemikerin', traducao: 'químico / química' },
  { masculino: 'der Musiker', feminino: 'die Musikerin', traducao: 'músico / música' },
  { masculino: 'der Jurist', feminino: 'die Juristin', traducao: 'jurista' },
  { masculino: 'der Physiker', feminino: 'die Physikerin', traducao: 'físico / física' },
  { masculino: 'der Philosoph', feminino: 'die Philosophin', traducao: 'filósofo / filósofa' },
  { masculino: 'der Maler', feminino: 'die Malerin', traducao: 'pintor / pintora' },
  { masculino: 'der Journalist', feminino: 'die Journalistin', traducao: 'jornalista' },
];

// 1.6 Números Cardinais (0–100)
export const CARDINAL_NUMBERS: NumberRow[] = [
  { numero: 0, alemao: 'null', numero2: 13, alemao2: 'dreizehn' },
  { numero: 1, alemao: 'eins', numero2: 14, alemao2: 'vierzehn' },
  { numero: 2, alemao: 'zwei', numero2: 15, alemao2: 'fünfzehn' },
  { numero: 3, alemao: 'drei', numero2: 16, alemao2: 'sechzehn' },
  { numero: 4, alemao: 'vier', numero2: 17, alemao2: 'siebzehn' },
  { numero: 5, alemao: 'fünf', numero2: 18, alemao2: 'achtzehn' },
  { numero: 6, alemao: 'sechs', numero2: 19, alemao2: 'neunzehn' },
  { numero: 7, alemao: 'sieben', numero2: 20, alemao2: 'zwanzig' },
  { numero: 8, alemao: 'acht', numero2: 21, alemao2: 'einundzwanzig' },
  { numero: 9, alemao: 'neun', numero2: 22, alemao2: 'zweiundzwanzig' },
  { numero: 10, alemao: 'zehn', numero2: 30, alemao2: 'dreißig' },
  { numero: 11, alemao: 'elf', numero2: 40, alemao2: 'vierzig' },
  { numero: 12, alemao: 'zwölf', numero2: 50, alemao2: 'fünfzig' },
  { numero: 60, alemao: 'sechzig', numero2: 70, alemao2: 'siebzig' },
  { numero: 80, alemao: 'achtzig', numero2: 90, alemao2: 'neunzig' },
  { numero: 100, alemao: '(ein)hundert', numero2: 101, alemao2: 'einhunderteins' },
];

// 2.1 Texto A1 — Sich vorstellen
export const TEXTO_A1_ENTRIES: TextEntry[] = [
  {
    speaker: 'Franziska Binder',
    alemao: 'Guten Morgen. Ich heiße Franziska Binder. Ich bin 37 Jahre alt. Ich wohne in Wien. Ich bin Lehrerin. Meine Muttersprache ist Deutsch. Ich spreche auch Spanisch und Englisch.',
    portugues: 'Bom dia. Eu me chamo Franziska Binder. Eu tenho 37 anos de idade. Eu moro em Viena. Eu sou professora. Minha língua materna é o alemão. Eu falo também espanhol e inglês.',
  },
  {
    speaker: 'Peter Heinemann',
    alemao: 'Guten Tag. Mein Name ist Peter Heinemann. Ich bin 35 Jahre alt. Ich komme aus Marburg. Ich bin Informatiker. Meine Muttersprache ist Deutsch. Ich lerne jetzt Japanisch.',
    portugues: 'Bom dia. Meu nome é Peter Heinemann. Eu tenho 35 anos de idade. Eu venho de Marburg. Eu sou cientista da computação. Minha língua materna é o alemão. Eu aprendo agora japonês.',
  },
  {
    speaker: 'Sarah Mounier',
    alemao: 'Hallo. Mein Vorname ist Sarah. Mein Familienname ist Mounier. Ich bin 22 Jahre alt. Ich komme aus Frankreich. Ich bin Studentin. Ich studiere in Paris Medizin. Meine Muttersprache ist Französisch. Ich spreche sehr gut Englisch und ein bisschen Spanisch.',
    portugues: 'Olá. Meu primeiro nome é Sarah. Meu sobrenome é Mounier. Eu tenho 22 anos de idade. Eu venho da França. Eu sou estudante. Eu estudo em Paris medicina. Minha língua materna é o francês. Eu falo muito bem inglês e um pouco de espanhol.',
  },
];

export const TEXTO_A1_GRAMMAR_NOTES = [
  'Ich heiße = verbo heißen (chamar-se), 1ª pessoa do singular.',
  'Ich bin 37 Jahre alt = verbo sein + Jahre alt (lit. "eu sou 37 anos velho"). Em português, "tenho 37 anos".',
  'Ich wohne in Wien = verbo wohnen + preposição in + dativo (cidade sem artigo: Wien).',
  'Ich bin Lehrerin = profissão sem artigo indefinido.',
  'Meine Muttersprache = possessivo mein + substantivo feminino Muttersprache (Nominativo: meine).',
  'Ich komme aus Marburg = verbo kommen + preposição aus (origem) + dativo (cidade sem artigo).',
  'Ich lerne jetzt Japanisch = verbo lernen + acusativo (idioma sem artigo). Jetzt ocupa o Vorfeld, sujeito ich na Posição III.',
  'Mein Vorname ist Sarah = Vorname (primeiro nome) masculino, possessivo mein (Nominativo).',
  'Mein Familienname ist Mounier = Familienname masculino, possessivo mein (Nominativo).',
  'Ich studiere in Paris Medizin = verbo studieren + local + acusativo (Medizin sem artigo).',
  'Ich spreche sehr gut Englisch = advérbio de modo sehr gut entre verbo e objeto.',
  'ein bisschen Spanisch = ein bisschen (um pouco) + idioma sem artigo.',
];

// 2.2 Texto A2 — Fragen und Antworten
export const TEXTO_A2_QA = [
  { deQuestion: 'Wie heißen Sie?', deAnswer: 'Ich heiße Franziska Binder.', ptQuestion: 'Como se chama?', ptAnswer: 'Eu me chamo Franziska Binder.' },
  { deQuestion: 'Wie ist Ihr Vorname?', deAnswer: 'Mein Vorname ist Franziska.', ptQuestion: 'Como é seu primeiro nome?', ptAnswer: 'Meu primeiro nome é Franziska.' },
  { deQuestion: 'Wie ist Ihr Familienname?', deAnswer: 'Mein Familienname ist Binder.', ptQuestion: 'Como é seu sobrenome?', ptAnswer: 'Meu sobrenome é Binder.' },
  { deQuestion: 'Wie alt sind Sie?', deAnswer: 'Ich bin 37 Jahre alt.', ptQuestion: 'Quantos anos tem?', ptAnswer: 'Eu tenho 37 anos de idade.' },
  { deQuestion: 'Woher kommen Sie?', deAnswer: 'Ich komme aus Österreich.', ptQuestion: 'De onde vem?', ptAnswer: 'Eu venho da Áustria.' },
  { deQuestion: 'Wo wohnen Sie?', deAnswer: 'Ich wohne in Wien.', ptQuestion: 'Onde mora?', ptAnswer: 'Eu moro em Viena.' },
  { deQuestion: 'Was sind Sie von Beruf?', deAnswer: 'Ich bin Lehrerin.', ptQuestion: 'Qual é sua profissão?', ptAnswer: 'Eu sou professora.' },
  { deQuestion: 'Welche Sprachen sprechen Sie?', deAnswer: 'Meine Muttersprache ist Deutsch. Ich spreche auch Spanisch und Englisch.', ptQuestion: 'Quais línguas fala?', ptAnswer: 'Minha língua materna é o alemão. Eu falo também espanhol e inglês.' },
];

export const TEXTO_A2_PETER = [
  { de: 'Mein Name ist Peter Heinemann.', pt: 'Meu nome é Peter Heinemann.' },
  { de: 'Mein Vorname ist Peter.', pt: 'Meu primeiro nome é Peter.' },
  { de: 'Mein Familienname ist Heinemann.', pt: 'Meu sobrenome é Heinemann.' },
  { de: 'Ich bin 35 Jahre alt.', pt: 'Eu tenho 35 anos de idade.' },
  { de: 'Ich komme aus Deutschland.', pt: 'Eu venho da Alemanha.' },
  { de: 'Ich wohne in Marburg.', pt: 'Eu moro em Marburg.' },
  { de: 'Ich bin Informatiker.', pt: 'Eu sou cientista da computação.' },
  { de: 'Meine Muttersprache ist Deutsch.', pt: 'Minha língua materna é o alemão.' },
  { de: 'Ich lerne jetzt Japanisch.', pt: 'Eu aprendo agora japonês.' },
];

// 2.3 Texto A3 — Länder
export const TEXTO_A3_COUNTRIES_NO_ARTICLE = [
  { de: 'Italien', pt: 'Itália' },
  { de: 'Frankreich', pt: 'França' },
  { de: 'Schweden', pt: 'Suécia' },
  { de: 'Dänemark', pt: 'Dinamarca' },
  { de: 'Großbritannien', pt: 'Grã-Bretanha' },
  { de: 'Polen', pt: 'Polônia' },
  { de: 'Russland', pt: 'Rússia' },
  { de: 'Spanien', pt: 'Espanha' },
  { de: 'Portugal', pt: 'Portugal' },
  { de: 'Brasilien', pt: 'Brasil' },
  { de: 'China', pt: 'China' },
  { de: 'Japan', pt: 'Japão' },
  { de: 'Belgien', pt: 'Bélgica' },
  { de: 'Rumänien', pt: 'Romênia' },
  { de: 'Slowenien', pt: 'Eslovênia' },
  { de: 'Indien', pt: 'Índia' },
  { de: 'Ungarn', pt: 'Hungria' },
  { de: 'Irland', pt: 'Irlanda' },
  { de: 'Griechenland', pt: 'Grécia' },
];

export const TEXTO_A3_COUNTRIES_WITH_ARTICLE = [
  { de: 'der Türkei', pt: 'Turquia', gender: 'Feminino (die Türkei)' },
  { de: 'der Ukraine', pt: 'Ucrânia', gender: 'Feminino (die Ukraine)' },
  { de: 'der Schweiz', pt: 'Suíça', gender: 'Feminino (die Schweiz)' },
  { de: 'den USA', pt: 'EUA', gender: 'Plural (die USA)' },
  { de: 'den Niederlanden', pt: 'Países Baixos', gender: 'Plural (die Niederlande)' },
];

export const COUNTRY_CASE_RULES: CountryCaseRule[] = [
  {
    categoria: 'Sem artigo (neutros)',
    paises: 'Italien, Frankreich, Schweden, Dänemark, Großbritannien, Polen, Russland, Spanien, Portugal, Brasilien, China, Japan, Belgien, Rumänien, Slowenien, Indien, Ungarn, Irland, Griechenland',
    preposicaoCaso: 'aus + nome puro',
    exemplo: 'Ich komme aus Italien.',
  },
  {
    categoria: 'Feminino (die)',
    paises: 'die Türkei, die Ukraine, die Schweiz',
    preposicaoCaso: 'aus + der (Dativo fem.)',
    exemplo: 'Ich komme aus der Türkei.',
  },
  {
    categoria: 'Plural (die)',
    paises: 'die USA, die Niederlande',
    preposicaoCaso: 'aus + den (Dativo plural)',
    exemplo: 'Ich komme aus den USA.',
  },
];

// 2.4 Texto A4 — Woher kommen die Personen?
export const TEXTO_A4_ITEMS = [
  {
    subject: 'W. A. Mozart = er',
    subjectPt: 'W. A. Mozart = ele',
    questionDe: 'Woher kommt Wolfgang Amadeus Mozart?',
    questionPt: 'De onde vem Wolfgang Amadeus Mozart?',
    answerDe: 'Wolfgang Amadeus Mozart kommt aus Österreich. Er kommt aus Österreich.',
    answerPt: 'Wolfgang Amadeus Mozart vem da Áustria. Ele vem da Áustria.',
  },
  {
    subject: 'Madame Tussaud = sie',
    subjectPt: 'Madame Tussaud = ela',
    questionDe: 'Woher kommt Madame Tussaud?',
    questionPt: 'De onde vem Madame Tussaud?',
    answerDe: 'Madame Tussaud kommt aus Frankreich. Sie kommt aus Frankreich.',
    answerPt: 'Madame Tussaud vem da França. Ela vem da França.',
  },
];

// 2.5 Texto A8 — Das Alphabet
export const ALPHABET_DATA: AlphabetLetter[] = [
  { letra: 'A', ipa: '[a:]' },
  { letra: 'B', ipa: '[be:]' },
  { letra: 'C', ipa: '[tse:]' },
  { letra: 'D', ipa: '[de:]' },
  { letra: 'E', ipa: '[e:]' },
  { letra: 'F', ipa: '[ɛf]' },
  { letra: 'G', ipa: '[ge:]' },
  { letra: 'H', ipa: '[ha:]' },
  { letra: 'I', ipa: '[i:]' },
  { letra: 'J', ipa: '[jɔt]' },
  { letra: 'K', ipa: '[ka:]' },
  { letra: 'L', ipa: '[ɛl]' },
  { letra: 'M', ipa: '[ɛm]' },
  { letra: 'N', ipa: '[ɛn]' },
  { letra: 'O', ipa: '[o:]' },
  { letra: 'P', ipa: '[pe:]' },
  { letra: 'Q', ipa: '[ku:]' },
  { letra: 'R', ipa: '[ɛr]' },
  { letra: 'S', ipa: '[ɛs]' },
  { letra: 'T', ipa: '[te:]' },
  { letra: 'U', ipa: '[u:]' },
  { letra: 'V', ipa: '[faʊ]' },
  { letra: 'W', ipa: '[ve:]' },
  { letra: 'X', ipa: '[ɪks]' },
  { letra: 'Y', ipa: '[ˈʏpsilɔn]' },
  { letra: 'Z', ipa: '[tsɛt]' },
];

export const SPECIAL_LETTERS: AlphabetLetter[] = [
  { letra: 'Ä', ipa: '[ɛ:]', nome: 'A-Umlaut' },
  { letra: 'Ö', ipa: '[ø:]', nome: 'O-Umlaut' },
  { letra: 'Ü', ipa: '[y:]', nome: 'U-Umlaut' },
  { letra: 'ß', ipa: '[ɛsˈtsɛt]', nome: 'Eszett / scharfes S' },
];

// 2.6 Tabela Lexical Primária
export const PRIMARY_LEXICON: LexicalTerm[] = [
  { palavraAlema: 'der Morgen', classeGramatical: 'Subst. masc. (die Morgen)', traducao: 'manhã', fraseModelo: 'Guten Morgen.', fraseTraducao: 'Bom dia.' },
  { palavraAlema: 'der Tag', classeGramatical: 'Subst. masc. (die Tage)', traducao: 'dia', fraseModelo: 'Guten Tag.', fraseTraducao: 'Bom dia.' },
  { palavraAlema: 'der Abend', classeGramatical: 'Subst. masc. (die Abende)', traducao: 'noite (ao anoitecer)', fraseModelo: 'Guten Abend.', fraseTraducao: 'Boa noite.' },
  { palavraAlema: 'der Name', classeGramatical: 'Subst. masc. (die Namen)', traducao: 'nome', fraseModelo: 'Mein Name ist Peter Heinemann.', fraseTraducao: 'Meu nome é Peter Heinemann.' },
  { palavraAlema: 'der Vorname', classeGramatical: 'Subst. masc. (die Vornamen)', traducao: 'primeiro nome', fraseModelo: 'Mein Vorname ist Peter.', fraseTraducao: 'Meu primeiro nome é Peter.' },
  { palavraAlema: 'der Familienname', classeGramatical: 'Subst. masc. (die Familiennamen)', traducao: 'sobrenome', fraseModelo: 'Mein Familienname ist Heinemann.', fraseTraducao: 'Meu sobrenome é Heinemann.' },
  { palavraAlema: 'das Jahr', classeGramatical: 'Subst. neutro (die Jahre)', traducao: 'ano', fraseModelo: 'Ich bin 35 Jahre alt.', fraseTraducao: 'Eu tenho 35 anos de idade.' },
  { palavraAlema: 'die Lehrerin', classeGramatical: 'Subst. fem. (die Lehrerinnen)', traducao: 'professora', fraseModelo: 'Ich bin Lehrerin.', fraseTraducao: 'Eu sou professora.' },
  { palavraAlema: 'der Informatiker', classeGramatical: 'Subst. masc. (die Informatiker)', traducao: 'cientista da computação', fraseModelo: 'Ich bin Informatiker.', fraseTraducao: 'Eu sou cientista da computação.' },
  { palavraAlema: 'die Studentin', classeGramatical: 'Subst. fem. (die Studentinnen)', traducao: 'estudante (fem.)', fraseModelo: 'Ich bin Studentin.', fraseTraducao: 'Eu sou estudante.' },
  { palavraAlema: 'die Muttersprache', classeGramatical: 'Subst. fem. (die Muttersprachen)', traducao: 'língua materna', fraseModelo: 'Meine Muttersprache ist Deutsch.', fraseTraducao: 'Minha língua materna é o alemão.' },
  { palavraAlema: 'das Land', classeGramatical: 'Subst. neutro (die Länder)', traducao: 'país', fraseModelo: 'Ich komme aus Österreich.', fraseTraducao: 'Eu venho da Áustria.' },
  { palavraAlema: 'die Stadt', classeGramatical: 'Subst. fem. (die Städte)', traducao: 'cidade', fraseModelo: 'Ich wohne in Wien.', fraseTraducao: 'Eu moro em Viena.' },
  { palavraAlema: 'der Beruf', classeGramatical: 'Subst. masc. (die Berufe)', traducao: 'profissão', fraseModelo: 'Was sind Sie von Beruf?', fraseTraducao: 'Qual é sua profissão?' },
  { palavraAlema: 'die Sprache', classeGramatical: 'Subst. fem. (die Sprachen)', traducao: 'língua', fraseModelo: 'Welche Sprachen sprechen Sie?', fraseTraducao: 'Quais línguas você fala?' },
  { palavraAlema: 'das Englisch', classeGramatical: 'Subst. neutro (sem plural)', traducao: 'inglês', fraseModelo: 'Ich spreche auch Englisch.', fraseTraducao: 'Eu falo também inglês.' },
  { palavraAlema: 'das Spanisch', classeGramatical: 'Subst. neutro (sem plural)', traducao: 'espanhol', fraseModelo: 'Ich spreche auch Spanisch.', fraseTraducao: 'Eu falo também espanhol.' },
  { palavraAlema: 'das Deutsch', classeGramatical: 'Subst. neutro (sem plural)', traducao: 'alemão', fraseModelo: 'Meine Muttersprache ist Deutsch.', fraseTraducao: 'Minha língua materna é o alemão.' },
  { palavraAlema: 'das Japanisch', classeGramatical: 'Subst. neutro (sem plural)', traducao: 'japonês', fraseModelo: 'Ich lerne jetzt Japanisch.', fraseTraducao: 'Eu aprendo agora japonês.' },
  { palavraAlema: 'das Französisch', classeGramatical: 'Subst. neutro (sem plural)', traducao: 'francês', fraseModelo: 'Meine Muttersprache ist Französisch.', fraseTraducao: 'Minha língua materna é o francês.' },
  { palavraAlema: 'ein bisschen', classeGramatical: 'Advérbio', traducao: 'um pouco', fraseModelo: 'Ich spreche ein bisschen Spanisch.', fraseTraducao: 'Eu falo um pouco de espanhol.' },
  { palavraAlema: 'sehr gut', classeGramatical: 'Advérbio', traducao: 'muito bem', fraseModelo: 'Ich spreche sehr gut Englisch.', fraseTraducao: 'Eu falo muito bem inglês.' },
  { palavraAlema: 'jetzt', classeGramatical: 'Advérbio', traducao: 'agora', fraseModelo: 'Ich lerne jetzt Japanisch.', fraseTraducao: 'Eu aprendo agora japonês.' },
  { palavraAlema: 'auch', classeGramatical: 'Advérbio', traducao: 'também', fraseModelo: 'Ich spreche auch Spanisch.', fraseTraducao: 'Eu falo também espanhol.' },
];

// 2.7 Registro Coloquial e Autêntico (Umgangssprache)
export const COLLOQUIAL_EXPRESSIONS: ColloquialExpression[] = [
  { expressao: 'Na?', traducao: 'E aí?', contexto: 'Saudação informal entre amigos' },
  { expressao: 'Hallo!', traducao: 'Olá!', contexto: 'Saudação informal' },
  { expressao: 'Tschüss!', traducao: 'Tchau!', contexto: 'Despedida informal' },
  { expressao: "Wie geht's?", traducao: 'Como vai?', contexto: 'Pergunta informal sobre bem-estar' },
  { expressao: "Mir geht's gut.", traducao: 'Estou bem.', contexto: 'Resposta informal' },
  { expressao: 'Und dir?', traducao: 'E você?', contexto: 'Pergunta informal de retorno' },
  { expressao: 'Keine Ahnung.', traducao: 'Não faço ideia.', contexto: 'Resposta informal' },
  { expressao: 'Klar.', traducao: 'Claro.', contexto: 'Concordância informal' },
  { expressao: 'Bock haben', traducao: 'Estar a fim de', contexto: '"Ich habe Bock" = Estou a fim' },
  { expressao: 'Muss ja.', traducao: 'Tem que ser.', contexto: 'Resignação informal' },
];

// 3.1 Exercício A5
export const EXERCICIO_A5 = [
  { pergunta: 'Wie heißen Sie?', respostaModelo: 'Ich heiße [Seu Nome].', justificativa: 'Verbo heißen, 1ª pessoa singular: heiße.' },
  { pergunta: 'Wie ist Ihr Vorname?', respostaModelo: 'Mein Vorname ist [Seu Primeiro Nome].', justificativa: 'Possessivo mein + substantivo masculino Vorname (Nominativo).' },
  { pergunta: 'Wie ist Ihr Familienname?', respostaModelo: 'Mein Familienname ist [Seu Sobrenome].', justificativa: 'Possessivo mein + substantivo masculino Familienname (Nominativo).' },
  { pergunta: 'Woher kommen Sie?', respostaModelo: 'Ich komme aus [Seu País/Cidade].', justificativa: 'Verbo kommen + preposição aus + Dativo.' },
  { pergunta: 'Wo wohnen Sie?', respostaModelo: 'Ich wohne in [Sua Cidade].', justificativa: 'Verbo wohnen + preposição in + Dativo.' },
];

// 3.2 Exercício A6 — Melodia da Frase
export const EXERCICIO_A6 = [
  { frase: 'Ich heiße Franziska Binder.', tipo: 'Declarativa', melodia: 'Entonação descendente no final (➘)' },
  { frase: 'Mein Name ist Peter Heinemann.', tipo: 'Declarativa', melodia: 'Entonação descendente no final (➘)' },
  { frase: 'Ich wohne in Marburg.', tipo: 'Declarativa', melodia: 'Entonação descendente no final (➘)' },
  { frase: 'Und Sie?', tipo: 'Interrogativa (sim/não)', melodia: 'Entonação ascendente no final (➚)' },
  { frase: 'Wie heißen Sie?', tipo: 'W-Frage', melodia: 'Entonação descendente no final (➘)' },
  { frase: 'Wo wohnen Sie?', tipo: 'W-Frage', melodia: 'Entonação descendente no final (➘)' },
];

// 3.6 Exercício A10 — Cidades, Países e Soletração
export const EXERCICIO_A10 = [
  { cidade: 'Düsseldorf', pais: 'Deutschland', soletra: 'D-ü-s-s-e-l-d-o-r-f' },
  { cidade: 'München', pais: 'Deutschland', soletra: 'M-ü-n-c-h-e-n' },
  { cidade: 'Paris', pais: 'Frankreich', soletra: 'P-a-r-i-s' },
  { cidade: 'Athen', pais: 'Griechenland', soletra: 'A-t-h-e-n' },
  { cidade: 'Bukarest', pais: 'Rumänien', soletra: 'B-u-k-a-r-e-s-t' },
  { cidade: 'Budapest', pais: 'Ungarn', soletra: 'B-u-d-a-p-e-s-t' },
  { cidade: 'Venedig', pais: 'Italien', soletra: 'V-e-n-e-d-i-g' },
  { cidade: 'Peking', pais: 'China', soletra: 'P-e-k-i-n-g' },
  { cidade: 'Wien', pais: 'Österreich', soletra: 'W-i-e-n' },
  { cidade: 'Porto', pais: 'Portugal', soletra: 'P-o-r-t-o' },
  { cidade: 'London', pais: 'Großbritannien', soletra: 'L-o-n-d-o-n' },
  { cidade: 'Stockholm', pais: 'Schweden', soletra: 'S-t-o-c-k-h-o-l-m' },
  { cidade: 'Brüssel', pais: 'Belgien', soletra: 'B-r-ü-s-s-e-l' },
  { cidade: 'Kopenhagen', pais: 'Dänemark', soletra: 'K-o-p-e-n-h-a-g-e-n' },
  { cidade: 'Köln', pais: 'Deutschland', soletra: 'K-ö-l-n' },
];

// 3.8 Exercício A12 — Profissões Masc/Fem
export const EXERCICIO_A12 = [
  { masculino: 'Lehrer', feminino: 'Lehrerin' },
  { masculino: 'Ingenieur', feminino: 'Ingenieurin' },
  { masculino: 'Mathematiker', feminino: 'Mathematikerin' },
  { masculino: 'Student', feminino: 'Studentin' },
  { masculino: 'Taxifahrer', feminino: 'Taxifahrerin' },
  { masculino: 'Assistent', feminino: 'Assistentin' },
  { masculino: 'Kellner', feminino: 'Kellnerin' },
  { masculino: 'Manager', feminino: 'Managerin' },
  { masculino: 'Architekt', feminino: 'Architektin' },
  { masculino: 'Arzt', feminino: 'Ärztin' },
];

// 3.9 Exercício A13 — Estudantes e Profissões Futuras
export const EXERCICIO_A13 = [
  { id: 0, estudante: 'Ich', area: 'Medizin', masc: 'Arzt', fem: 'Ärztin', fraseCompleta: 'Ich studiere Medizin. Später bin ich Arzt/Ärztin.' },
  { id: 1, estudante: 'Johann', area: 'Chemie', masc: 'Chemiker', fem: 'Chemikerin', fraseCompleta: 'Johann studiert Chemie. Später ist er Chemiker.' },
  { id: 2, estudante: 'Marie', area: 'Jura', masc: 'Jurist', fem: 'Juristin', fraseCompleta: 'Marie studiert Jura. Später ist sie Juristin.' },
  { id: 3, estudante: 'Andreas', area: 'Informatik', masc: 'Informatiker', fem: 'Informatikerin', fraseCompleta: 'Andreas studiert Informatik. Später ist er Informatiker.' },
  { id: 4, estudante: 'Ich', area: 'Ingenieurwesen', masc: 'Ingenieur', fem: 'Ingenieurin', fraseCompleta: 'Ich studiere Ingenieurwesen. Später bin ich Ingenieur/Ingenieurin.' },
  { id: 5, estudante: 'Michael', area: 'Physik', masc: 'Physiker', fem: 'Physikerin', fraseCompleta: 'Michael studiert Physik. Später ist er Physiker.' },
  { id: 6, estudante: 'Ich', area: 'Philosophie', masc: 'Philosoph', fem: 'Philosophin', fraseCompleta: 'Ich studiere Philosophie. Später bin ich Philosoph/Philosophin.' },
  { id: 7, estudante: 'Franziska', area: 'Malerei', masc: 'Maler', fem: 'Malerin', fraseCompleta: 'Franziska studiert Malerei. Später ist sie Malerin.' },
  { id: 8, estudante: 'Anika', area: 'Musik', masc: 'Musiker', fem: 'Musikerin', fraseCompleta: 'Anika studiert Musik. Später ist sie Musikerin.' },
  { id: 9, estudante: 'Otto', area: 'Journalistik', masc: 'Journalist', fem: 'Journalistin', fraseCompleta: 'Otto studiert Journalistik. Später ist er Journalist.' },
];

// 3.10 Exercício A14 — Ferramentas e Profissões
export const EXERCICIO_A14 = [
  { imagem: '1 (chapéu de cozinheiro, panela)', profissao: 'Koch / Köchin', justificativa: 'Utensílios de cozinha' },
  { imagem: '2 (calculadora, régua)', profissao: 'Ingenieur / Ingenieurin', justificativa: 'Ferramentas de engenharia' },
  { imagem: '3 (algemas, lupa)', profissao: 'Polizist / Polizistin', justificativa: 'Equipamento policial' },
  { imagem: '4 (regador, chave inglesa)', profissao: 'Mechaniker / Mechanikerin', justificativa: 'Ferramentas mecânicas' },
  { imagem: '5 (prancheta, lápis)', profissao: 'Architekt / Architektin', justificativa: 'Ferramentas de arquitetura' },
  { imagem: '6 (estetoscópio)', profissao: 'Arzt / Ärztin', justificativa: 'Equipamento médico' },
  { imagem: '7 (bandeja, bebidas)', profissao: 'Kellner / Kellnerin', justificativa: 'Bandeja de garçom' },
  { imagem: '8 (pincéis, tintas)', profissao: 'Maler / Malerin', justificativa: 'Materiais de pintura' },
];

// 3.11 Exercício A15 — Tabela comparativa de verbos preenchida
export const EXERCICIO_A15 = [
  { pronome: 'ich', kommen: 'komme', wohnen: 'wohne', heissen: 'heiße', sein: 'bin' },
  { pronome: 'du', kommen: 'kommst', wohnen: 'wohnst', heissen: 'heißt', sein: 'bist' },
  { pronome: 'er/Peter', kommen: 'kommt', wohnen: 'wohnt', heissen: 'heißt', sein: 'ist' },
  { pronome: 'sie/Sarah', kommen: 'kommt', wohnen: 'wohnt', heissen: 'heißt', sein: 'ist' },
  { pronome: 'wir', kommen: 'kommen', wohnen: 'wohnen', heissen: 'heißen', sein: 'sind' },
  { pronome: 'ihr', kommen: 'kommt', wohnen: 'wohnt', heissen: 'heißt', sein: 'seid' },
  { pronome: 'sie', kommen: 'kommen', wohnen: 'wohnen', heissen: 'heißen', sein: 'sind' },
  { pronome: 'Sie', kommen: 'kommen', wohnen: 'wohnen', heissen: 'heißen', sein: 'sind' },
];

// 3.12 Exercício A16 — Verbos com Justificativas
export const EXERCICIO_A16 = [
  { n: 0, fraseCompleta: 'Frau Binder wohnt in Berlin.', justificativa: '3ª pessoa singular de wohnen: wohnt.' },
  { n: 1, fraseCompleta: 'Sarah kommt aus Frankreich.', justificativa: '3ª pessoa singular de kommen: kommt.' },
  { n: 2, fraseCompleta: 'Ich heiße Rudi Zollner.', justificativa: '1ª pessoa singular de heißen: heiße.' },
  { n: 3, fraseCompleta: 'Wie heißt du?', justificativa: '2ª pessoa singular de heißen: heißt (sibilante).' },
  { n: 4, fraseCompleta: 'Herr Heinemann ist Informatiker.', justificativa: '3ª pessoa singular de sein: ist.' },
  { n: 5, fraseCompleta: 'Sarah und Gilles wohnen in Paris.', justificativa: '3ª pessoa plural de wohnen: wohnen.' },
  { n: 6, fraseCompleta: 'Woher kommen Sie?', justificativa: '3ª pessoa plural/formal de kommen: kommen.' },
  { n: 7, fraseCompleta: 'Was sind Sie von Beruf?', justificativa: '3ª pessoa plural/formal de sein: sind.' },
  { n: 8, fraseCompleta: 'Ich bin Lehrerin.', justificativa: '1ª pessoa singular de sein: bin.' },
  { n: 9, fraseCompleta: 'Wo wohnst du?', justificativa: '2ª pessoa singular de wohnen: wohnst.' },
  { n: 10, fraseCompleta: 'Ich studiere Medizin.', justificativa: '1ª pessoa singular de studieren: studiere.' },
  { n: 11, fraseCompleta: 'Wie heißen Sie?', justificativa: '3ª pessoa plural/formal de heißen: heißen.' },
  { n: 12, fraseCompleta: 'Woher kommst du?', justificativa: '2ª pessoa singular de kommen: kommst.' },
];

// 3.13 & 3.14 Tradução Reversa de Blindagem & Gabarito Comentado
export const REVERSE_TRANSLATION_ITEMS = [
  {
    id: 1,
    portugues: 'Eu me chamo Ana. Eu tenho 28 anos. Eu moro em São Paulo.',
    alemao: 'Ich heiße Ana. Ich bin 28 Jahre alt. Ich wohne in São Paulo.',
    explicacao: [
      'heißen → 1ª pessoa: heiße.',
      'sein + Jahre alt → 1ª pessoa: bin (idade usa sein).',
      'wohnen → 1ª pessoa: wohne.',
    ],
  },
  {
    id: 2,
    portugues: 'De onde você vem? Eu venho do Brasil.',
    alemao: 'Woher kommst du? Ich komme aus Brasilien.',
    explicacao: [
      'kommen → 2ª pessoa: kommst.',
      'aus + Dativo (Brasilien sem artigo).',
      'kommen → 1ª pessoa: komme.',
    ],
  },
  {
    id: 3,
    portugues: 'Qual é sua profissão? Eu sou engenheiro.',
    alemao: 'Was sind Sie von Beruf? Ich bin Ingenieur.',
    explicacao: [
      'sein → formal: sind.',
      'Profissão sem artigo indefinido: Ingenieur.',
    ],
  },
  {
    id: 4,
    portugues: 'Minha língua materna é o português. Eu falo também inglês e um pouco de alemão.',
    alemao: 'Meine Muttersprache ist Portugiesisch. Ich spreche auch Englisch und ein bisschen Deutsch.',
    explicacao: [
      'Possessivo mein + Muttersprache (feminino): meine.',
      'sprechen → 1ª pessoa: spreche.',
      'ein bisschen + idioma sem artigo.',
    ],
  },
  {
    id: 5,
    portugues: 'Como se chama? (formal) — Eu me chamo Pedro.',
    alemao: 'Wie heißen Sie? Ich heiße Pedro.',
    explicacao: [
      'heißen → formal: heißen.',
      'heißen → 1ª pessoa: heiße.',
    ],
  },
  {
    id: 6,
    portugues: 'Onde você mora? — Eu moro em Berlim.',
    alemao: 'Wo wohnst du? Ich wohne in Berlin.',
    explicacao: [
      'wohnen → 2ª pessoa: wohnst.',
      'wohnen → 1ª pessoa: wohne.',
      'in + Dativo (Berlin sem artigo).',
    ],
  },
  {
    id: 7,
    portugues: 'Hoje eu aprendo alemão.',
    alemao: 'Heute lerne ich Deutsch.',
    explicacao: [
      'Vorfeld: Heute.',
      'Verbo na Posição II: lerne.',
      'Sujeito na Posição III: ich.',
      'Deutsch no Satzende.',
    ],
  },
  {
    id: 8,
    portugues: 'Ela vem da Suíça. Ele vem dos EUA.',
    alemao: 'Sie kommt aus der Schweiz. Er kommt aus den USA.',
    explicacao: [
      'kommen → 3ª pessoa singular: kommt.',
      'aus + Dativo feminino: der Schweiz (die Schweiz → der Schweiz).',
      'aus + Dativo plural: den USA (die USA → den USA).',
    ],
  },
  {
    id: 9,
    portugues: 'Você fala espanhol? — Não, infelizmente não. Eu falo apenas alemão e inglês.',
    alemao: 'Sprichst du Spanisch? — Nein, leider nicht. Ich spreche nur Deutsch und Englisch.',
    explicacao: [
      'sprechen → 2ª pessoa: sprichst (Vokalwechsel e → i).',
      'sprechen → 1ª pessoa: spreche.',
      'nur = apenas.',
    ],
  },
  {
    id: 10,
    portugues: 'Quantos anos você tem? — Eu tenho 35 anos.',
    alemao: 'Wie alt bist du? — Ich bin 35 Jahre alt.',
    explicacao: [
      'sein → 2ª pessoa: bist.',
      'sein → 1ª pessoa: bin + Jahre alt.',
    ],
  },
];

// 3.15 Resumo dos Pontos-Chave do Dia 001
export const KEY_POINTS_SUMMARY: KeyPoint[] = [
  { conceito: 'V2 (Verbo na Posição II)', regra: 'O verbo conjugado ocupa a 2ª posição em declarativas.' },
  { conceito: 'W-Fragen', regra: 'W-Wort na Posição I, verbo na Posição II.' },
  { conceito: 'Ja-Nein-Fragen', regra: 'Verbo na Posição I, sujeito na Posição II.' },
  { conceito: 'Sibilantes', regra: 'Verbos com radical em -s, -ß, -z, -x: 2ª sg. = 3ª sg. (-t).' },
  { conceito: 'Profissões sem artigo', regra: 'Ich bin Lehrer (não ein Lehrer).' },
  { conceito: 'Países com artigo', regra: 'die Türkei, die Schweiz, die USA, die Niederlande.' },
  { conceito: 'aus + Dativo', regra: 'aus der Schweiz, aus den USA.' },
  { conceito: 'Idade', regra: 'Ich bin ... Jahre alt (não habe).' },
  { conceito: 'Números', regra: 'Unidade + und + dezena (einundzwanzig).' },
];
