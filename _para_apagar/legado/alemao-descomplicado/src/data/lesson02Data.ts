import {
  TopologicalRow,
  ContrastTrap,
  ConjugationRow,
  LexicalTerm,
  ColloquialExpression,
  KeyPoint,
} from '../types';

export const LESSON_02_METADATA = {
  round: 'RODADA 02',
  day: 'DIA 002 DO CRONOGRAMA',
  chapter: 'KAPITEL 1, TEIL A, A17–A26, p. 13–15',
  title: 'Línguas, Países, Alternância Vocálica (e→i), Números Cardinais & Regência',
  nextRound: 'RODADA 03 — DIA 003 (Kapitel 1, Teil B: No Café, Pedidos, Artigos Definidos e Indefinidos, Plural).',
};

// 1.1 Alternância Vocálica: sprechen (e -> i)
export const CONJUGATION_SPRECHEN: ConjugationRow[] = [
  { pessoa: '1ª sing.', pronome: 'ich', radicalDesinencia: 'sprech- + -e', forma: 'spreche' },
  { pessoa: '2ª sing. (informal)', pronome: 'du', radicalDesinencia: 'sprich- + -st (e→i)', forma: 'sprichst' },
  { pessoa: '3ª sing. masc.', pronome: 'er / Peter', radicalDesinencia: 'sprich- + -t (e→i)', forma: 'spricht' },
  { pessoa: '3ª sing. fem.', pronome: 'sie / Sarah', radicalDesinencia: 'sprich- + -t (e→i)', forma: 'spricht' },
  { pessoa: '3ª sing. neutro', pronome: 'es', radicalDesinencia: 'sprich- + -t (e→i)', forma: 'spricht' },
  { pessoa: '1ª plural', pronome: 'wir', radicalDesinencia: 'sprech- + -en', forma: 'sprechen' },
  { pessoa: '2ª plural (informal)', pronome: 'ihr', radicalDesinencia: 'sprech- + -t (sem alteração)', forma: 'sprecht' },
  { pessoa: '3ª plural', pronome: 'sie', radicalDesinencia: 'sprech- + -en', forma: 'sprechen' },
  { pessoa: 'Tratamento formal', pronome: 'Sie', radicalDesinencia: 'sprech- + -en', forma: 'sprechen' },
];

// 1.2 Verbos com radical em -t / -d (Inserção de -e- epentético)
export const CONJUGATION_EPENTHETIC_VERBS: {
  pessoa: string;
  pronome: string;
  arbeiten: string;
  landen: string;
  regra: string;
}[] = [
  { pessoa: '1ª sing.', pronome: 'ich', arbeiten: 'arbeite', landen: 'lande', regra: 'Radical + -e' },
  { pessoa: '2ª sing.', pronome: 'du', arbeiten: 'arbeit-e-st', landen: 'land-e-st', regra: 'Radical em -t/-d recebe -e- antes de -st' },
  { pessoa: '3ª sing.', pronome: 'er / sie / es', arbeiten: 'arbeit-e-t', landen: 'land-e-t', regra: 'Radical em -t/-d recebe -e- antes de -t' },
  { pessoa: '1ª plural', pronome: 'wir', arbeiten: 'arbeiten', landen: 'landen', regra: 'Radical + -en' },
  { pessoa: '2ª plural', pronome: 'ihr', arbeiten: 'arbeit-e-t', landen: 'land-e-t', regra: 'Radical em -t/-d recebe -e- antes de -t' },
  { pessoa: '3ª plural / formal', pronome: 'sie / Sie', arbeiten: 'arbeiten', landen: 'landen', regra: 'Radical + -en' },
];

// 1.3 Negação: nicht vs kein
export const NEGATION_MATRIX = [
  {
    tipo: 'nicht',
    funcao: 'Nega verbos, adjetivos, advérbios, pronomes e orações inteiras.',
    exemploAlemao: 'Ich spreche nicht Polnisch. / Das Flugzeug kommt nicht aus Spanien.',
    traducao: 'Eu não falo polonês. / O avião não vem da Espanha.',
    regra: 'Não varia em gênero nem em número.',
  },
  {
    tipo: 'kein / keine',
    funcao: 'Nega substantivos que seriam precedidos por artigo indefinido (ein/eine) ou substantivos contáveis sem artigo.',
    exemploAlemao: 'Ich spreche keine Fremdsprache. / Er hat kein Auto.',
    traducao: 'Eu não falo nenhuma língua estrangeira. / Ele não tem carro.',
    regra: 'Declina como o artigo indefinido ein (kein, keine, kein, keine no plural).',
  },
];

// 1.4 Matriz de Pronomes Possessivos (Nominativo)
export const POSSESSIVE_PRONOUNS_MATRIX = [
  { pronome: 'ich', masc: 'mein', fem: 'meine', neutro: 'mein', plural: 'meine', traducao: 'meu / minha' },
  { pronome: 'du', masc: 'dein', fem: 'deine', neutro: 'dein', plural: 'deine', traducao: 'teu / tua (seu)' },
  { pronome: 'er', masc: 'sein', fem: 'seine', neutro: 'sein', plural: 'seine', traducao: 'dele' },
  { pronome: 'sie (ela)', masc: 'ihr', fem: 'ihre', neutro: 'ihr', plural: 'ihre', traducao: 'dela' },
  { pronome: 'es', masc: 'sein', fem: 'seine', neutro: 'sein', plural: 'seine', traducao: 'dele (neutro)' },
  { pronome: 'wir', masc: 'unser', fem: 'unsere', neutro: 'unser', plural: 'unsere', traducao: 'nosso / nossa' },
  { pronome: 'ihr', masc: 'euer', fem: 'eure', neutro: 'euer', plural: 'eure', traducao: 'de vocês' },
  { pronome: 'sie (eles/elas)', masc: 'ihr', fem: 'ihre', neutro: 'ihr', plural: 'ihre', traducao: 'deles / delas' },
  { pronome: 'Sie (formal)', masc: 'Ihr', fem: 'Ihre', neutro: 'Ihr', plural: 'Ihre', traducao: 'do senhor / da senhora' },
];

// 1.5 Regência Preposicional com Países e Dativo
export const COUNTRY_CASE_MATRIX_02 = [
  {
    categoria: 'Países neutros (a grande maioria, sem artigo)',
    regenciaAus: 'aus + Nome do país (Dativo neutro sem artigo visível)',
    regenciaIn: 'in + Nome do país',
    exemplos: 'aus Spanien, aus Deutschland, aus Brasilien, aus Japan, in Spanien, in Portugal',
  },
  {
    categoria: 'Países femininos (die Schweiz, die Türkei, die Ukraine)',
    regenciaAus: 'aus der + Nome do país (Dativo feminino der)',
    regenciaIn: 'in der + Nome do país (Dativo locativo der)',
    exemplos: 'aus der Schweiz, aus der Türkei, in der Schweiz, in der Türkei',
  },
  {
    categoria: 'Países no plural (die USA, die Niederlande)',
    regenciaAus: 'aus den + Nome do país (Dativo plural den)',
    regenciaIn: 'in den + Nome do país (Dativo locativo plural den)',
    exemplos: 'aus den USA, aus den Niederlanden, in den USA, in den Niederlanden',
  },
];

// 2.1 Texto A17: Línguas e Países
export const TEXT_A17_LANGUAGES = [
  'Portugiesisch',
  'Englisch',
  'Arabisch',
  'Russisch',
  'Türkisch',
  'Rumänisch',
  'Ungarisch',
  'Griechisch',
  'Polnisch',
  'Japanisch',
  'Tschechisch',
  'Chinesisch',
  'Französisch',
  'Spanisch',
];

export const TEXT_A17_COUNTRIES_RESOLUCAO = [
  { pais: 'Spanien', lingua: 'Spanisch', frase: 'In Spanien spricht man Spanisch.', traducao: 'Na Espanha fala-se espanhol.' },
  { pais: 'Griechenland', lingua: 'Griechisch', frase: 'In Griechenland spricht man Griechisch.', traducao: 'Na Grécia fala-se grego.' },
  { pais: 'Russland', lingua: 'Russisch', frase: 'In Russland spricht man Russisch.', traducao: 'Na Rússia fala-se russo.' },
  { pais: 'Japan', lingua: 'Japanisch', frase: 'In Japan spricht man Japanisch.', traducao: 'No Japão fala-se japonês.' },
  { pais: 'Tschechien', lingua: 'Tschechisch', frase: 'In Tschechien spricht man Tschechisch.', traducao: 'Na República Tcheca fala-se tcheco.' },
  { pais: 'Ungarn', lingua: 'Ungarisch', frase: 'In Ungarn spricht man Ungarisch.', traducao: 'Na Hungria fala-se húngaro.' },
  { pais: 'China', lingua: 'Chinesisch', frase: 'In China spricht man Chinesisch.', traducao: 'Na China fala-se chinês.' },
  { pais: 'Großbritannien', lingua: 'Englisch', frase: 'In Großbritannien spricht man Englisch.', traducao: 'Na Grã-Bretanha fala-se inglês.' },
  { pais: 'Polen', lingua: 'Polnisch', frase: 'In Polen spricht man Polnisch.', traducao: 'Na Polônia fala-se polonês.' },
  { pais: 'Mexiko', lingua: 'Spanisch', frase: 'In Mexiko spricht man Spanisch.', traducao: 'No México fala-se espanhol.' },
  { pais: 'Portugal', lingua: 'Portugiesisch', frase: 'In Portugal spricht man Portugiesisch.', traducao: 'Em Portugal fala-se português.' },
  { pais: 'den USA', lingua: 'Englisch', frase: 'In den USA spricht man Englisch.', traducao: 'Nos EUA fala-se inglês.' },
  { pais: 'Rumänien', lingua: 'Rumänisch', frase: 'In Rumänien spricht man Rumänisch.', traducao: 'Na Romênia fala-se romeno.' },
  { pais: 'der Türkei', lingua: 'Türkisch', frase: 'In der Türkei spricht man Türkisch.', traducao: 'Na Turquia fala-se turco.' },
  { pais: 'Tunesien', lingua: 'Arabisch', frase: 'In Tunesien spricht man Arabisch.', traducao: 'Na Tunísia fala-se árabe.' },
  { pais: 'Kanada', lingua: 'Englisch/Französisch', frase: 'In Kanada spricht man Englisch und Französisch.', traducao: 'No Canadá fala-se inglês e francês.' },
  { pais: 'Algerien', lingua: 'Arabisch', frase: 'In Algerien spricht man Arabisch.', traducao: 'Na Argélia fala-se árabe.' },
];

// 2.2 Texto A18: Phonetik sch e sp
export const PHONETIK_A18_ITEMS = {
  sch: {
    som: 'sch [ʃ] (Som correspondente ao "ch" ou "x" do português)',
    palavras: [
      { alemao: 'Schweden', traducao: 'Suécia' },
      { alemao: 'die Schweiz', traducao: 'a Suíça' },
      { alemao: 'Russisch', traducao: 'Russo' },
      { alemao: 'Englisch', traducao: 'Inglês' },
      { alemao: 'Arabisch', traducao: 'Árabe' },
      { alemao: 'Rumänisch', traducao: 'Romeno' },
      { alemao: 'Türkisch', traducao: 'Turco' },
      { alemao: 'Polnisch', traducao: 'Polonês' },
      { alemao: 'Französisch', traducao: 'Francês' },
      { alemao: 'Ungarisch', traducao: 'Húngaro' },
    ],
  },
  sp: {
    som: 'sp [ʃp] (No início de palavra ou sílaba, o "s" tem som de "ch" antes de "p")',
    palavras: [
      { alemao: 'sprechen', traducao: 'falar' },
      { alemao: 'Spanisch', traducao: 'Espanhol' },
      { alemao: 'Sprache', traducao: 'língua' },
      { alemao: 'Spanien', traducao: 'Espanha' },
    ],
    frases: [
      { alemao: 'Was ist Ihre Muttersprache?', traducao: 'Qual é sua língua materna?' },
      { alemao: 'Welche Sprachen sprechen Sie?', traducao: 'Quais línguas fala?' },
      { alemao: 'Sprechen Sie Spanisch?', traducao: 'Fala espanhol?' },
      { alemao: 'Sprichst du Polnisch?', traducao: 'Fala polonês?' },
    ],
  },
};

// 2.3 Texto A19: Sprechen Sie ...?
export const TEXT_A19_DIALOGUES = [
  {
    pergunta: 'Sprechen Sie Spanisch?',
    traducaoPergunta: 'Você fala espanhol? (formal)',
    resposta: 'Nein, leider nicht. Ich spreche nur Deutsch und Englisch.',
    traducaoResposta: 'Não, infelizmente não. Eu falo apenas alemão e inglês.',
    justificativa: 'Formal Sie → sprechen. "leider nicht" = infelizmente não; "nur" = apenas.',
  },
  {
    pergunta: 'Sprichst du Türkisch?',
    traducaoPergunta: 'Você fala turco? (informal)',
    resposta: 'Nein, leider nicht. Ich spreche nur Deutsch und Englisch.',
    traducaoResposta: 'Não, infelizmente não. Eu falo apenas alemão e inglês.',
    justificativa: 'Informal du → sprichst (alternância vocálica e→i).',
  },
  {
    pergunta: 'Spricht Maria Schwedisch?',
    traducaoPergunta: 'Maria fala sueco?',
    resposta: 'Nein, leider nicht. Sie spricht nur Deutsch und Englisch.',
    traducaoResposta: 'Não, infelizmente não. Ela fala apenas alemão e inglês.',
    justificativa: '3ª pessoa singular sie → spricht (e→i).',
  },
  {
    pergunta: 'Spricht Paul Japanisch?',
    traducaoPergunta: 'Paul fala japonês?',
    resposta: 'Ja, er spricht gut Japanisch.',
    traducaoResposta: 'Sim, ele fala bem japonês.',
    justificativa: '3ª pessoa singular er → spricht.',
  },
  {
    pergunta: 'Sprichst du Französisch?',
    traducaoPergunta: 'Você fala francês?',
    resposta: 'Ja, ich spreche ein bisschen Französisch.',
    traducaoResposta: 'Sim, eu falo um pouco de francês.',
    justificativa: '2ª pessoa singular du → sprichst; "ein bisschen" = um pouco.',
  },
  {
    pergunta: 'Spricht Frau Müller Polnisch?',
    traducaoPergunta: 'A senhora Müller fala polonês?',
    resposta: 'Nein, sie spricht nicht Polnisch.',
    traducaoResposta: 'Não, ela não fala polonês.',
    justificativa: '3ª pessoa singular sie → spricht; negação com nicht.',
  },
  {
    pergunta: 'Sprichst du Russisch?',
    traducaoPergunta: 'Você fala russo?',
    resposta: 'Ja, ich spreche gut Russisch.',
    traducaoResposta: 'Sim, eu falo bem russo.',
    justificativa: '2ª pessoa singular du → sprichst; gut = bem.',
  },
  {
    pergunta: 'Sprechen Sie Griechisch?',
    traducaoPergunta: 'Você fala grego? (formal)',
    resposta: 'Ja, ich spreche ein bisschen Griechisch.',
    traducaoResposta: 'Sim, eu falo um pouco de grego.',
    justificativa: 'Formal Sie → sprechen.',
  },
  {
    pergunta: 'Sprichst du Deutsch?',
    traducaoPergunta: 'Você fala alemão?',
    resposta: 'Ja, ich spreche sehr gut Deutsch.',
    traducaoResposta: 'Sim, eu falo muito bem alemão.',
    justificativa: '2ª pessoa singular du → sprichst; sehr gut = muito bem.',
  },
  {
    pergunta: 'Sprechen Klaus und Marie Arabisch?',
    traducaoPergunta: 'Klaus e Marie falam árabe?',
    resposta: 'Nein, sie sprechen nicht Arabisch.',
    traducaoResposta: 'Não, eles não falam árabe.',
    justificativa: '3ª pessoa do plural (Klaus und Marie = sie) → sprechen.',
  },
];

// 2.4 Texto A20: Ihre Muttersprache
export const TEXT_A20_STRUCTURE = {
  perguntas: [
    { de: 'Was ist deine Muttersprache?', pt: 'Qual é sua língua materna? (informal)' },
    { de: 'Was ist Ihre Muttersprache?', pt: 'Qual é sua língua materna? (formal)' },
    { de: 'Welche Sprachen sprichst du?', pt: 'Quais línguas você fala? (informal)' },
    { de: 'Welche Sprachen sprechen Sie?', pt: 'Quais línguas o senhor/a senhora fala? (formal)' },
  ],
  relatos: [
    {
      sujeito: 'Ich (Primeira pessoa)',
      linhas: [
        { de: 'Ich komme aus ...', pt: 'Eu venho de ...' },
        { de: 'Meine Muttersprache ist ...', pt: 'Minha língua materna é ...' },
        { de: 'Ich spreche auch ... und ...', pt: 'Eu falo também ... e ...' },
      ],
      exemplo: 'Ich komme aus Brasilien. Meine Muttersprache ist Portugiesisch. Ich spreche auch Englisch und ein bisschen Deutsch.',
    },
    {
      sujeito: 'Mein Nachbar (Vizinho - Masculino er)',
      linhas: [
        { de: 'Mein Nachbar kommt aus ...', pt: 'Meu vizinho vem de ...' },
        { de: 'Seine Muttersprache ist ...', pt: 'A língua materna dele é ...' },
        { de: 'Er spricht auch ... und ...', pt: 'Ele fala também ... e ...' },
      ],
      exemplo: 'Mein Nachbar kommt aus Spanien. Seine Muttersprache ist Spanisch. Er spricht auch Englisch und Französisch.',
    },
    {
      sujeito: 'Meine Nachbarin (Vizinha - Feminino sie)',
      linhas: [
        { de: 'Meine Nachbarin kommt aus ...', pt: 'Minha vizinha vem de ...' },
        { de: 'Ihre Muttersprache ist ...', pt: 'A língua materna dela é ...' },
        { de: 'Sie spricht auch ... und ...', pt: 'Ela fala também ... e ...' },
      ],
      exemplo: 'Meine Nachbarin kommt aus Italien. Ihre Muttersprache ist Italienisch. Sie spricht auch Deutsch und Englisch.',
    },
  ],
};

// 2.5 Texto A21: Phonetik Diphthong ei [aɪ]
export const PHONETIK_A21_ITEMS = [
  { palavra: 'ein', ipa: '[aɪn]', traducao: 'um / uma' },
  { palavra: 'heißen', ipa: '[ˈhaɪsən]', traducao: 'chamar-se' },
  { palavra: 'mein', ipa: '[maɪn]', traducao: 'meu' },
  { palavra: 'dein', ipa: '[daɪn]', traducao: 'teu' },
  { palavra: 'Heinemann', ipa: '[ˈhaɪnəman]', traducao: '(sobrenome)' },
  { palavra: 'Heimatstadt', ipa: '[ˈhaɪmatʃtat]', traducao: 'cidade natal' },
  { palavra: 'Schweiz', ipa: '[ʃvaɪts]', traducao: 'Suíça' },
  { palavra: 'Malerei', ipa: '[maləˈraɪ]', traducao: 'pintura' },
  { palavra: 'Türkei', ipa: '[tʏrˈkaɪ]', traducao: 'Turquia' },
];

export const PHONETIK_A21_FRASES = [
  { de: 'Wie heißen Sie?', pt: 'Como se chama?' },
  { de: 'Was ist deine Muttersprache?', pt: 'Qual é sua língua materna?' },
  { de: 'Meine Heimatstadt ist Bern.', pt: 'Minha cidade natal é Berna.' },
  { de: 'Mein Nachbar heißt Pedro.', pt: 'Meu vizinho se chama Pedro.' },
  { de: 'Ich komme aus der Türkei.', pt: 'Eu venho da Turquia.' },
  { de: 'Ich heiße Peter Heinemann. Meine Muttersprache ist Deutsch. Ich komme aus der Schweiz. Er studiert Malerei. Meine Muttersprache ist Türkisch.', pt: 'Eu me chamo Peter Heinemann. Minha língua materna é alemão. Eu venho da Suíça. Ele estuda pintura. Minha língua materna é turco.' },
];

// 2.6 Texto A22: Aus welchem Land kommt das Flugzeug?
export const TEXT_A22_PLANES = [
  { cidade: 'Barcelona', pais: 'Spanien', frase: 'Das Flugzeug kommt aus Spanien.', traducao: 'O avião vem da Espanha.' },
  { cidade: 'Kopenhagen', pais: 'Dänemark', frase: 'Das Flugzeug kommt aus Dänemark.', traducao: 'O avião vem da Dinamarca.' },
  { cidade: 'Tokio', pais: 'Japan', frase: 'Das Flugzeug kommt aus Japan.', traducao: 'O avião vem do Japão.' },
  { cidade: 'Hamburg', pais: 'Deutschland', frase: 'Das Flugzeug kommt aus Deutschland.', traducao: 'O avião vem da Alemanha.' },
  { cidade: 'Oslo', pais: 'Norwegen', frase: 'Das Flugzeug kommt aus Norwegen.', traducao: 'O avião vem da Noruega.' },
  { cidade: 'Budapest', pais: 'Ungarn', frase: 'Das Flugzeug kommt aus Ungarn.', traducao: 'O avião vem da Hungria.' },
  { cidade: 'London/Heathrow', pais: 'Großbritannien', frase: 'Das Flugzeug kommt aus Großbritannien.', traducao: 'O avião vem da Grã-Bretanha.' },
  { cidade: 'Thessaloniki', pais: 'Griechenland', frase: 'Das Flugzeug kommt aus Griechenland.', traducao: 'O avião vem da Grécia.' },
  { cidade: 'Istanbul', pais: 'der Türkei', frase: 'Das Flugzeug kommt aus der Türkei.', traducao: 'O avião vem da Turquia.' },
  { cidade: 'Peking', pais: 'China', frase: 'Das Flugzeug kommt aus China.', traducao: 'O avião vem da China.' },
  { cidade: 'Lissabon', pais: 'Portugal', frase: 'Das Flugzeug kommt aus Portugal.', traducao: 'O avião vem de Portugal.' },
  { cidade: 'Athen', pais: 'Griechenland', frase: 'Das Flugzeug kommt aus Griechenland.', traducao: 'O avião vem da Grécia.' },
  { cidade: 'Neu-Delhi', pais: 'Indien', frase: 'Das Flugzeug kommt aus Indien.', traducao: 'O avião vem da Índia.' },
  { cidade: 'Stockholm', pais: 'Schweden', frase: 'Das Flugzeug kommt aus Schweden.', traducao: 'O avião vem da Suécia.' },
  { cidade: 'Amsterdam', pais: 'den Niederlanden', frase: 'Das Flugzeug kommt aus den Niederlanden.', traducao: 'O avião vem dos Países Baixos.' },
  { cidade: 'Warschau', pais: 'Polen', frase: 'Das Flugzeug kommt aus Polen.', traducao: 'O avião vem da Polônia.' },
];

// 2.7 Texto A23: Números 0 a 10.000
export const TEXT_A23_NUMBERS = [
  { num: 0, alemao: 'null', pt: 'zero' },
  { num: 1, alemao: 'eins', pt: 'um' },
  { num: 2, alemao: 'zwei', pt: 'dois' },
  { num: 3, alemao: 'drei', pt: 'três' },
  { num: 4, alemao: 'vier', pt: 'quatro' },
  { num: 5, alemao: 'fünf', pt: 'cinco' },
  { num: 6, alemao: 'sechs', pt: 'seis' },
  { num: 7, alemao: 'sieben', pt: 'sete' },
  { num: 8, alemao: 'acht', pt: 'oito' },
  { num: 9, alemao: 'neun', pt: 'nove' },
  { num: 10, alemao: 'zehn', pt: 'dez' },
  { num: 11, alemao: 'elf', pt: 'onze' },
  { num: 12, alemao: 'zwölf', pt: 'doze' },
  { num: 13, alemao: 'dreizehn', pt: 'treze' },
  { num: 14, alemao: 'vierzehn', pt: 'quatorze' },
  { num: 15, alemao: 'fünfzehn', pt: 'quinze' },
  { num: 16, alemao: 'sechzehn', pt: 'dezesseis' },
  { num: 17, alemao: 'siebzehn', pt: 'dezessete' },
  { num: 18, alemao: 'achtzehn', pt: 'dezoito' },
  { num: 19, alemao: 'neunzehn', pt: 'dezenove' },
  { num: 20, alemao: 'zwanzig', pt: 'vinte' },
  { num: 21, alemao: 'einundzwanzig', pt: 'vinte e um' },
  { num: 22, alemao: 'zweiundzwanzig', pt: 'vinte e dois' },
  { num: 23, alemao: 'dreiundzwanzig', pt: 'vinte e três' },
  { num: 24, alemao: 'vierundzwanzig', pt: 'vinte e quatro' },
  { num: 25, alemao: 'fünfundzwanzig', pt: 'vinte e cinco' },
  { num: 26, alemao: 'sechsundzwanzig', pt: 'vinte e seis' },
  { num: 27, alemao: 'siebenundzwanzig', pt: 'vinte e sete' },
  { num: 28, alemao: 'achtundzwanzig', pt: 'vinte e oito' },
  { num: 29, alemao: 'neunundzwanzig', pt: 'vinte e nove' },
  { num: 30, alemao: 'dreißig', pt: 'trinta' },
  { num: 40, alemao: 'vierzig', pt: 'quarenta' },
  { num: 50, alemao: 'fünfzig', pt: 'cinquenta' },
  { num: 60, alemao: 'sechzig', pt: 'sessenta' },
  { num: 70, alemao: 'siebzig', pt: 'setenta' },
  { num: 80, alemao: 'achtzig', pt: 'oitenta' },
  { num: 90, alemao: 'neunzig', pt: 'noventa' },
  { num: 100, alemao: '(ein)hundert', pt: 'cem' },
  { num: 101, alemao: 'einhundert(und)eins', pt: 'cento e um' },
  { num: 121, alemao: 'einhunderteinundzwanzig', pt: 'cento e vinte e um' },
  { num: 1000, alemao: 'eintausend', pt: 'mil' },
  { num: 10000, alemao: 'zehntausend', pt: 'dez mil' },
];

export const NUMBER_RULES = [
  { regra: '13 a 19', explicacao: 'número + zehn (dreizehn, vierzehn...). Exceções de redução do radical: sechzehn (não sechszehn) e siebzehn (não siebenzehn).' },
  { regra: '20 a 90', explicacao: 'número + zig (zwanzig, vierzig...). Exceção ortográfica: dreißig (com ß, não com z).' },
  { regra: '21 a 99', explicacao: 'unidade + und + dezena escrita junta numa única palavra (einundzwanzig, zweiundzwanzig, fünfundachtzig).' },
  { regra: 'Centenas e Milhares', explicacao: '100: (ein)hundert. 101: einhunderteins. 121: einhunderteinundzwanzig. 1000: eintausend. 10000: zehntausend.' },
];

// 2.8 Texto A24: Flüge
export const TEXT_A24_FLUEGE = [
  { voo: 'LH 4077', origem: 'Florenz', tempo: '10 Minuten', extenso: 'viertausendsiebenundsiebzig', frase: 'Der Flug LH 4077 aus Florenz landet in 10 Minuten.' },
  { voo: 'LH 4383', origem: 'Toulouse', tempo: '15 Minuten', extenso: 'viertausenddreihundertdreiundachtzig', frase: 'Der Flug LH 4383 aus Toulouse landet in 15 Minuten.' },
  { voo: 'LH 663', origem: 'Moskau', tempo: '20 Minuten', extenso: 'sechshundertdreiundsechzig', frase: 'Der Flug LH 663 aus Moskau landet in 20 Minuten.' },
  { voo: 'LH 1108', origem: 'Zürich', tempo: '25 Minuten', extenso: 'eintausendeinhundertacht', frase: 'Der Flug LH 1108 aus Zürich landet in 25 Minuten.' },
  { voo: 'LH 2583', origem: 'Warschau', tempo: '30 Minuten', extenso: 'zweitausendfünfhundertdreiundachtzig', frase: 'Der Flug LH 2583 aus Warschau landet in 30 Minuten.' },
  { voo: 'LH 2442', origem: 'Porto', tempo: '35 Minuten', extenso: 'zweitausendvierhundertzweiundvierzig', frase: 'Der Flug LH 2442 aus Porto landet in 35 Minuten.' },
];

// 2.9 Texto A25: Zahlen sprechen
export const TEXT_A25_ZAHLEN = [
  { num: '513', extenso: 'fünfhundertdreizehn' },
  { num: '227', extenso: 'zweihundertsiebenundzwanzig' },
  { num: '31', extenso: 'einunddreißig' },
  { num: '21', extenso: 'einundzwanzig' },
  { num: '52', extenso: 'zweiundfünfzig' },
  { num: '63', extenso: 'dreiundsechzig' },
  { num: '34', extenso: 'vierunddreißig' },
  { num: '42', extenso: 'zweiundvierzig' },
  { num: '18', extenso: 'achtzehn' },
  { num: '019', extenso: 'null eins neun (ou neunzehn)' },
  { num: '867', extenso: 'achthundertsiebenundsechzig' },
  { num: '077', extenso: 'null sieben sieben (ou siebenundsiebzig)' },
  { num: '100', extenso: '(ein)hundert' },
  { num: '210', extenso: 'zweihundertzehn' },
  { num: '95', extenso: 'fünfundneunzig' },
  { num: '364', extenso: 'dreihundertvierundsechzig' },
  { num: '824', extenso: 'achthundertvierundzwanzig' },
  { num: '391', extenso: 'dreihunderteinundneunzig' },
];

// 2.10 Texto A26: Welche Telefonnummer hat ...?
export const TEXT_A26_TELEFON = [
  { pessoa: 'die Polizei', numero: '110', extensoDigito: 'eins – eins – null', extensoBloco: 'hundertzehn' },
  { pessoa: 'die Feuerwehr', numero: '112', extensoDigito: 'eins – eins – zwei', extensoBloco: 'hundertzwölf' },
  { pessoa: 'der Notarzt', numero: '112', extensoDigito: 'eins – eins – zwei', extensoBloco: 'hundertzwölf' },
  { pessoa: 'die Auskunft', numero: '11833', extensoDigito: 'eins – eins – acht – drei – drei', extensoBloco: '—' },
  { pessoa: 'Petra', numero: '99 64 58', extensoDigito: 'neun – neun – sechs – vier – fünf – acht', extensoBloco: 'neunundneunzig – vierundsechzig – achtundfünfzig' },
  { pessoa: 'Steffi', numero: '76 54 83', extensoDigito: 'sieben – sechs – fünf – vier – acht – drei', extensoBloco: 'sechsundsiebzig – vierundfünfzig – dreiundachtzig' },
  { pessoa: 'Herr Lange', numero: '88 98 64', extensoDigito: 'acht – acht – neun – acht – sechs – vier', extensoBloco: 'achtundachtzig – achtundneunzig – vierundsechzig' },
  { pessoa: 'Frau Kirsch', numero: '24 53 67', extensoDigito: 'zwei – vier – fünf – drei – sechs – sieben', extensoBloco: 'vierundzwanzig – dreiundfünfzig – siebenundsechzig' },
  { pessoa: 'Frau Hirsch', numero: '87 63 20', extensoDigito: 'acht – sieben – sechs – drei – zwei – null', extensoBloco: 'siebenundachtzig – dreiundsechzig – zwanzig' },
  { pessoa: 'Herr Edel', numero: '53 74 16', extensoDigito: 'fünf – drei – sieben – vier – eins – sechs', extensoBloco: 'dreiundfünfzig – vierundsiebzig – sechzehn' },
  { pessoa: 'Herr Meier', numero: '23 94 75', extensoDigito: 'zwei – drei – neun – vier – sieben – fünf', extensoBloco: 'dreiundzwanzig – vierundneunzig – fünfundsiebzig' },
  { pessoa: 'Frau Körner', numero: '56 12 43', extensoDigito: 'fünf – sechs – eins – zwei – vier – drei', extensoBloco: 'sechsundfünfzig – zwölf – dreiundvierzig' },
];

// 2.11 Tabela Lexical Primária (20 Termos)
export const LEXICAL_TERMS_02: LexicalTerm[] = [
  { palavraAlema: 'die Sprache', classeGramatical: 'Subst. fem. (die Sprachen)', traducao: 'língua', fraseModelo: 'Welche Sprachen sprechen Sie?' },
  { palavraAlema: 'das Land', classeGramatical: 'Subst. neutro (die Länder)', traducao: 'país', fraseModelo: 'Aus welchem Land kommt das Flugzeug?' },
  { palavraAlema: 'die Stadt', classeGramatical: 'Subst. fem. (die Städte)', traducao: 'cidade', fraseModelo: 'In welcher Stadt wohnen Sie?' },
  { palavraAlema: 'der Flug', classeGramatical: 'Subst. masc. (die Flüge)', traducao: 'voo', fraseModelo: 'Der Flug LH 4077 landet in 10 Minuten.' },
  { palavraAlema: 'das Flugzeug', classeGramatical: 'Subst. neutro (die Flugzeuge)', traducao: 'avião', fraseModelo: 'Das Flugzeug kommt aus Spanien.' },
  { palavraAlema: 'die Muttersprache', classeGramatical: 'Subst. fem. (die Muttersprachen)', traducao: 'língua materna', fraseModelo: 'Was ist deine Muttersprache?' },
  { palavraAlema: 'der Nachbar', classeGramatical: 'Subst. masc. (die Nachbarn)', traducao: 'vizinho', fraseModelo: 'Mein Nachbar heißt Pedro.' },
  { palavraAlema: 'die Nachbarin', classeGramatical: 'Subst. fem. (die Nachbarinnen)', traducao: 'vizinha', fraseModelo: 'Meine Nachbarin kommt aus Italien.' },
  { palavraAlema: 'die Heimatstadt', classeGramatical: 'Subst. fem. (die Heimatstädte)', traducao: 'cidade natal', fraseModelo: 'Meine Heimatstadt ist Bern.' },
  { palavraAlema: 'die Schweiz', classeGramatical: 'Subst. fem. (sem plural)', traducao: 'Suíça', fraseModelo: 'Ich komme aus der Schweiz.' },
  { palavraAlema: 'die Türkei', classeGramatical: 'Subst. fem. (sem plural)', traducao: 'Turquia', fraseModelo: 'Ich komme aus der Türkei.' },
  { palavraAlema: 'die USA', classeGramatical: 'Subst. plural (die USA)', traducao: 'EUA', fraseModelo: 'Ich komme aus den USA.' },
  { palavraAlema: 'die Niederlande', classeGramatical: 'Subst. plural (die Niederlande)', traducao: 'Países Baixos', fraseModelo: 'Ich komme aus den Niederlanden.' },
  { palavraAlema: 'die Zahl', classeGramatical: 'Subst. fem. (die Zahlen)', traducao: 'número', fraseModelo: 'Die Zahlen von 1 bis 100.' },
  { palavraAlema: 'die Telefonnummer', classeGramatical: 'Subst. fem. (die Telefonnummern)', traducao: 'número de telefone', fraseModelo: 'Welche Telefonnummer hat Herr Meier?' },
  { palavraAlema: 'die Polizei', classeGramatical: 'Subst. fem. (sem plural)', traducao: 'polícia', fraseModelo: 'Die Polizei hat die Nummer 110.' },
  { palavraAlema: 'die Feuerwehr', classeGramatical: 'Subst. fem. (sem plural)', traducao: 'bombeiros', fraseModelo: 'Die Feuerwehr hat die Nummer 112.' },
  { palavraAlema: 'der Notarzt', classeGramatical: 'Subst. masc. (die Notärzte)', traducao: 'médico de emergência', fraseModelo: 'Der Notarzt hat die Nummer 112.' },
  { palavraAlema: 'die Auskunft', classeGramatical: 'Subst. fem. (die Auskünfte)', traducao: 'informação', fraseModelo: 'Die Auskunft hat die Nummer 11833.' },
  { palavraAlema: 'der Diphthong', classeGramatical: 'Subst. masc. (die Diphthonge)', traducao: 'ditongo', fraseModelo: 'Der Diphthong ei spricht man [aɪ].' },
];

// 2.12 Registro Coloquial e Autêntico (Umgangssprache)
export const COLLOQUIAL_EXPRESSIONS_02: ColloquialExpression[] = [
  { expressao: 'Na?', traducao: 'E aí?', contexto: 'Saudação informal ultracurta entre amigos' },
  { expressao: 'Was geht?', traducao: 'O que há?', contexto: 'Saudação informal entre jovens' },
  { expressao: 'Alles klar?', traducao: 'Tudo certo?', contexto: 'Pergunta ou confirmação informal cotidiana' },
  { expressao: 'Läuft bei dir?', traducao: 'Tá tudo bem? / Mandando bem!', contexto: 'Gíria juvenil para sucesso ou rotina fluindo' },
  { expressao: 'Kein Stress!', traducao: 'Sem estresse! / Fica tranquilo!', contexto: 'Tranquilizar alguém em situações cotidianas' },
  { expressao: 'Passt schon!', traducao: 'Tá bom assim! / Deixa pra lá!', contexto: 'Aceitação informal rápida sem complicação' },
  { expressao: 'Echt?', traducao: 'Sério? / Verdade?', contexto: 'Reação de surpresa ou checagem informal' },
  { expressao: 'Krass!', traducao: 'Doideira! / Impressionante!', contexto: 'Gíria juvenil para expressar espanto positivo ou negativo' },
  { expressao: 'Bock haben', traducao: 'Estar a fim de', contexto: '"Ich habe Bock" = Estou a fim / "Kein Bock" = Não estou a fim' },
  { expressao: 'Schnauze!', traducao: 'Cala a boca!', contexto: 'Muito informal/grosseiro (evitar no uso formal)' },
];

// 3.10 & 3.11 Tradução Reversa de Blindagem
export interface ReverseTranslationItem02 {
  id: number;
  portugues: string;
  alemao: string;
  explicacao: string[];
}

export const REVERSE_TRANSLATION_ITEMS_02: ReverseTranslationItem02[] = [
  {
    id: 1,
    portugues: 'Eu falo alemão e um pouco de espanhol.',
    alemao: 'Ich spreche Deutsch und ein bisschen Spanisch.',
    explicacao: [
      'Verbo sprechen conjugado na 1ª pessoa do singular: ich spreche.',
      'A expressão "ein bisschen" significa "um pouco" e acompanha o nome do idioma sem preposição.',
      'Nomes de línguas em alemão são substantivados neutros grafados com inicial maiúscula (Deutsch, Spanisch).',
    ],
  },
  {
    id: 2,
    portugues: 'Você fala turco? — Não, infelizmente não. Eu falo apenas inglês.',
    alemao: 'Sprichst du Türkisch? — Nein, leider nicht. Ich spreche nur Englisch.',
    explicacao: [
      'Pergunta de Sim/Não (Ja-Nein-Frage): verbo na Posição 1.',
      'Alternância vocálica do radical: sprechen na 2ª pessoa do singular muda de e → i: du sprichst.',
      '"leider nicht" = fórmula fixa idiomática para "infelizmente não".',
      'O advérbio "nur" significa "apenas / somente" (diferente de "erst" que expressa temporalidade).',
    ],
  },
  {
    id: 3,
    portugues: 'Ela fala sueco? — Sim, ela fala muito bem sueco.',
    alemao: 'Spricht sie Schwedisch? — Ja, sie spricht sehr gut Schwedisch.',
    explicacao: [
      'Alternância vocálica e→i na 3ª pessoa do singular: sie spricht.',
      'Pronome pessoal "sie" em minúscula (ela), concordando com a forma verbal "spricht".',
      'Advérbio intensificador: "sehr gut" (muito bem).',
    ],
  },
  {
    id: 4,
    portugues: 'Nós viemos da Suíça. Eles vêm dos EUA.',
    alemao: 'Wir kommen aus der Schweiz. Sie kommen aus den USA.',
    explicacao: [
      'Verbo kommen na 1ª do plural: wir kommen; na 3ª do plural: sie kommen.',
      'Regência preposicional de origem com países que possuem artigo obrigatório:',
      'die Schweiz (feminino) → aus + Dativo feminino = aus der Schweiz.',
      'die USA (plural) → aus + Dativo plural = aus den USA.',
    ],
  },
  {
    id: 5,
    portugues: 'Meu vizinho vem da Turquia. A língua materna dele é turco.',
    alemao: 'Mein Nachbar kommt aus der Türkei. Seine Muttersprache ist Türkisch.',
    explicacao: [
      'Sujeito masculino: "Mein Nachbar" (sem desinência no Nominativo masculino para mein).',
      'País feminino com artigo: die Türkei → no Dativo com aus torna-se "aus der Türkei".',
      'Pronome possessivo de 3ª pessoa masculina (dele = sein): como Muttersprache é feminino, recebe -e: "Seine Muttersprache".',
    ],
  },
  {
    id: 6,
    portugues: 'Minha vizinha vem da França. A língua materna dela é francês.',
    alemao: 'Meine Nachbarin kommt aus Frankreich. Ihre Muttersprache ist Französisch.',
    explicacao: [
      'Sujeito feminino: "Meine Nachbarin" (terminação -in de profissão/agente feminina).',
      'França é país neutro sem artigo: "aus Frankreich" (sem der/den).',
      'Pronome possessivo de 3ª pessoa feminina (dela = ihr): como Muttersprache é feminino, recebe -e: "Ihre Muttersprache".',
    ],
  },
  {
    id: 7,
    portugues: 'O avião vem de Tóquio. Ele aterrissa em 10 minutos.',
    alemao: 'Das Flugzeug kommt aus Tokio. Es landet in 10 Minuten.',
    explicacao: [
      '"Das Flugzeug" é substantivo neutro; o pronome que o retoma na oração seguinte é "es" (não "er").',
      'Verbo "landen" tem radical em -d (land-): na 3ª pessoa do singular recebe o -e- epentético antes do -t: "land-e-t".',
      'A preposição "in" com indicação de tempo futuro rege Dativo: "in 10 Minuten" (Minuten no Dativo plural).',
    ],
  },
  {
    id: 8,
    portugues: 'Qual é o número de telefone da polícia? — É 110.',
    alemao: 'Welche Telefonnummer hat die Polizei? — Sie hat die Nummer 110.',
    explicacao: [
      'Pergunta com pronome interrogativo: "Welche Telefonnummer" (feminino Nominativo/Acusativo).',
      'O verbo "haben" na 3ª pessoa do singular é irregular: "hat" (perde a consoante b).',
      'A polícia ("die Polizei") é feminina em alemão, logo é retomada pelo pronome "sie" (ela).',
    ],
  },
  {
    id: 9,
    portugues: 'Eu tenho o número 23 94 75.',
    alemao: 'Ich habe die Nummer 23 94 75.',
    explicacao: [
      'Conjugação de haben na 1ª pessoa do singular: ich habe.',
      '"die Nummer" é objeto direto (Acusativo feminino, mantém o artigo die).',
      'Leitura do número pode ser em blocos de dois: dreiundzwanzig – vierundneunzig – fünfundsiebzig.',
    ],
  },
  {
    id: 10,
    portugues: 'O voo LH 4077 vem de Florença.',
    alemao: 'Der Flug LH 4077 kommt aus Florenz.',
    explicacao: [
      '"Der Flug" é substantivo masculino (der Flug, die Flüge).',
      'Florenz é cidade sem artigo: "aus Florenz".',
      'O número do voo é lido por extenso como "viertausendsiebenundsiebzig".',
    ],
  },
];

// 3.12 Resumo dos Pontos-Chave do Dia 002
export const KEY_POINTS_02: KeyPoint[] = [
  { conceito: 'sprechen', regra: 'Alternância vocálica e→i na 2ª e 3ª sg. (du sprichst, er spricht). No plural e formal volta ao e (wir sprechen, ihr sprecht, sie/Sie sprechen).' },
  { conceito: 'Verbos em -t/-d', regra: 'Inserção de -e- epentético antes de -st e -t para facilitar a articulação fonética (du arbeitest, er arbeitet; das Flugzeug landet).' },
  { conceito: 'nicht', regra: 'Partícula negativa universal para verbos, adjetivos, advérbios e frases inteiras (Ich spreche nicht Polnisch).' },
  { conceito: 'kein / keine', regra: 'Negação exclusiva de substantivos com artigo indefinido ou sem artigo contáveis (Ich habe kein Auto; Ich spreche keine Fremdsprache).' },
  { conceito: 'Diphthong ei', regra: 'Pronúncia obrigatória [aɪ] similar ao "ai" em "pai" (ein, heißen, mein, dein, Heinemann, Schweiz, Türkei).' },
  { conceito: 'sch [ʃ]', regra: 'Som sibilante similar ao "ch" português em "chave" (Schweden, die Schweiz, Spanisch, Russisch, Englisch).' },
  { conceito: 'sp [ʃp]', regra: 'No início de palavra ou radical sílabico, o grupo "sp" pronuncia-se [ʃp] (sprechen, Spanisch, Sprache, Spanien).' },
  { conceito: 'Números Cardinais', regra: 'Inversão rígida da unidade antes da dezena unidas por "und" (einundzwanzig, fünfundachtzig). Exceções em sechzehn, siebzehn e dreißig.' },
  { conceito: 'Países com Artigo', regra: 'Países femininos (die Schweiz, die Türkei) e no plural (die USA, die Niederlande) exigem artigo.' },
  { conceito: 'aus + Dativo', regra: 'A preposição aus sempre rege Dativo: aus der Schweiz, aus der Türkei, aus den USA, aus den Niederlanden.' },
  { conceito: 'Telefonnummern', regra: 'Leitura oficial aceita dígito por dígito (eins-eins-null) ou agrupada em dezenas (dreiundzwanzig-vierundneunzig-fünfundsiebzig).' },
];
