export interface LessonMetadata {
  round: string;
  day: string;
  chapter: string;
  pages: string;
  duration: string;
  title: string;
  subtitle: string;
}

export const SEMANA_02_LESSON_10_METADATA: LessonMetadata = {
  round: 'Semana 2 · Rodada 10',
  day: 'Dia 010 do Cronograma',
  chapter: 'Kapitel 4, Teil B, C e D (A16–A32)',
  pages: 'p. 98–108',
  duration: '180 minutos (3 Blocos de 60 min)',
  title: 'O Imperativo Completo, Trotzdem & Deshalb, Perfekt, Reflexivos, Gêneros & Culinária Alemã',
  subtitle: 'Guia definitivo de imperativo (Sie/du/ihr), conjunções de motivo e oposição (deshalb/trotzdem), história da batata, receitas culinárias, no restaurante e consolidação morfossintática',
};

// ==========================================
// BLOCO 1 — ANATOMIA GRAMATICAL
// ==========================================

export interface ImperativeRule {
  verb: string;
  infinitive: string;
  imperative: string;
  translation: string;
}

export const IMPERATIVE_FORMAL_DATA: ImperativeRule[] = [
  { verb: 'schälen', infinitive: 'schälen', imperative: 'Schälen Sie das Obst.', translation: 'Descasque as frutas.' },
  { verb: 'schneiden', infinitive: 'schneiden', imperative: 'Schneiden Sie die Äpfel.', translation: 'Corte as maçãs.' },
  { verb: 'geben', infinitive: 'geben', imperative: 'Geben Sie die Obststücke in eine Schüssel.', translation: 'Coloque os pedaços de fruta em uma tigela.' },
  { verb: 'vermengen', infinitive: 'vermengen', imperative: 'Vermengen Sie das Obst mit Zucker.', translation: 'Misture as frutas com açúcar.' },
  { verb: 'kochen', infinitive: 'kochen', imperative: 'Kochen Sie die Kartoffeln.', translation: 'Cozinhe as batatas.' },
  { verb: 'waschen', infinitive: 'waschen', imperative: 'Waschen Sie das Obst.', translation: 'Lave as frutas.' },
  { verb: 'essen', infinitive: 'essen', imperative: 'Essen Sie täglich Vollkornbrot.', translation: 'Coma pão integral diariamente.' },
  { verb: 'trinken', infinitive: 'trinken', imperative: 'Trinken Sie viel Milch.', translation: 'Beba muito leite.' },
  { verb: 'würzen', infinitive: 'würzen', imperative: 'Würzen Sie die Suppe mit Salz.', translation: 'Tempere a sopa com sal.' },
  { verb: 'öffnen', infinitive: 'öffnen', imperative: 'Öffnen Sie das Fenster.', translation: 'Abra a janela.' },
];

export const IMPERATIVE_INFORMAL_DU_DATA: ImperativeRule[] = [
  { verb: 'schälen', infinitive: 'schälen', imperative: 'Schäl das Obst!', translation: 'Descasque as frutas!' },
  { verb: 'schneiden', infinitive: 'schneiden', imperative: 'Schneid die Äpfel!', translation: 'Corte as maçãs!' },
  { verb: 'geben', infinitive: 'geben', imperative: 'Gib die Obststücke in eine Schüssel!', translation: 'Coloque os pedaços de fruta em uma tigela!' },
  { verb: 'vermengen', infinitive: 'vermengen', imperative: 'Vermeng das Obst mit Zucker!', translation: 'Misture as frutas com açúcar!' },
  { verb: 'kochen', infinitive: 'kochen', imperative: 'Koch die Kartoffeln!', translation: 'Cozinhe as batatas!' },
  { verb: 'waschen', infinitive: 'waschen', imperative: 'Wasch das Obst!', translation: 'Lave as frutas!' },
  { verb: 'essen', infinitive: 'essen', imperative: 'Iss täglich Vollkornbrot!', translation: 'Coma pão integral diariamente!' },
  { verb: 'trinken', infinitive: 'trinken', imperative: 'Trink viel Milch!', translation: 'Beba muito leite!' },
  { verb: 'würzen', infinitive: 'würzen', imperative: 'Würz die Suppe mit Salz!', translation: 'Tempere a sopa com sal!' },
  { verb: 'öffnen', infinitive: 'öffnen', imperative: 'Öffne das Fenster!', translation: 'Abra a janela!' },
];

export const IMPERATIVE_INFORMAL_IHR_DATA: ImperativeRule[] = [
  { verb: 'schälen', infinitive: 'schälen', imperative: 'Schält das Obst!', translation: 'Descascai as frutas!' },
  { verb: 'schneiden', infinitive: 'schneiden', imperative: 'Schneidet die Äpfel!', translation: 'Cortai as maçãs!' },
  { verb: 'geben', infinitive: 'geben', imperative: 'Gebt die Obststücke in eine Schüssel!', translation: 'Colocai os pedaços de fruta em uma tigela!' },
  { verb: 'vermengen', infinitive: 'vermengen', imperative: 'Vermengt das Obst mit Zucker!', translation: 'Misturai as frutas com açúcar!' },
  { verb: 'kochen', infinitive: 'kochen', imperative: 'Kocht die Kartoffeln!', translation: 'Cozinhai as batatas!' },
  { verb: 'waschen', infinitive: 'waschen', imperative: 'Wascht das Obst!', translation: 'Lavai as frutas!' },
  { verb: 'essen', infinitive: 'essen', imperative: 'Esst täglich Vollkornbrot!', translation: 'Comei pão integral diariamente!' },
  { verb: 'trinken', infinitive: 'trinken', imperative: 'Trinkt viel Milch!', translation: 'Bebei muito leite!' },
  { verb: 'würzen', infinitive: 'würzen', imperative: 'Würzt die Suppe mit Salz!', translation: 'Temperai a sopa com sal!' },
  { verb: 'öffnen', infinitive: 'öffnen', imperative: 'Öffnet das Fenster!', translation: 'Abri a janela!' },
];

export interface IrregularImperative {
  verb: string;
  du: string;
  ihr: string;
  sie: string;
  note: string;
}

export const IRREGULAR_IMPERATIVES: IrregularImperative[] = [
  { verb: 'sein', du: 'Sei!', ihr: 'Seid!', sie: 'Seien Sie!', note: 'Radical especial sei- com desinências próprias.' },
  { verb: 'haben', du: 'Hab!', ihr: 'Habt!', sie: 'Haben Sie!', note: 'Sem trema no imperativo.' },
  { verb: 'werden', du: 'Werd! / Werde!', ihr: 'Werdet!', sie: 'Werden Sie!', note: 'Mudança de estado e ordens solenes.' },
  { verb: 'wissen', du: 'Wisse!', ihr: 'Wisst!', sie: 'Wissen Sie!', note: 'Forma rara, usada em fórmulas literárias ou avisos.' },
  { verb: 'essen', du: 'Iss!', ihr: 'Esst!', sie: 'Essen Sie!', note: 'Alternância e -> i obrigatória em du (sem -st).' },
  { verb: 'geben', du: 'Gib!', ihr: 'Gebt!', sie: 'Geben Sie!', note: 'Alternância e -> i obrigatória em du.' },
  { verb: 'nehmen', du: 'Nimm!', ihr: 'Nehmt!', sie: 'Nehmen Sie!', note: 'Alternância e -> i com duplicação de m em du.' },
  { verb: 'lesen', du: 'Lies!', ihr: 'Lest!', sie: 'Lesen Sie!', note: 'Alternância e -> ie em du.' },
  { verb: 'sehen', du: 'Sieh!', ihr: 'Seht!', sie: 'Sehen Sie!', note: 'Alternância e -> ie em du.' },
];

export const PRAETERITUM_SEIN_DATA = [
  { person: '1. Sg.', pronoun: 'ich', form: 'war', ex: 'Ich war gestern im Restaurant.' },
  { person: '2. Sg.', pronoun: 'du', form: 'warst', ex: 'Warst du schon mal in Wien?' },
  { person: '3. Sg.', pronoun: 'er / sie / es / man', form: 'war', ex: 'Das Essen war hervorragend.' },
  { person: '1. Pl.', pronoun: 'wir', form: 'waren', ex: 'Wir waren in Italien.' },
  { person: '2. Pl.', pronoun: 'ihr', form: 'wart', ex: 'Wart ihr gestern auf der Party?' },
  { person: '3. Pl. / Formal', pronoun: 'sie / Sie', form: 'waren', ex: 'Waren Sie mit dem Essen zufrieden?' },
];

export const PRAETERITUM_HABEN_DATA = [
  { person: '1. Sg.', pronoun: 'ich', form: 'hatte', ex: 'Ich hatte keine Zeit.' },
  { person: '2. Sg.', pronoun: 'du', form: 'hattest', ex: 'Hattest du einen Termin?' },
  { person: '3. Sg.', pronoun: 'er / sie / es / man', form: 'hatte', ex: 'Er hatte großen Hunger.' },
  { person: '1. Pl.', pronoun: 'wir', form: 'hatten', ex: 'Wir hatten viel Glück.' },
  { person: '2. Pl.', pronoun: 'ihr', form: 'hattet', ex: 'Hattet ihr gestern Spaß?' },
  { person: '3. Pl. / Formal', pronoun: 'sie / Sie', form: 'hatten', ex: 'Hatten Sie meine Bestellung vergessen?' },
];

export const WERDEN_CONJUGATION_DATA = [
  { person: '1. Sg.', pronoun: 'ich', form: 'werde', use: 'Profissão / Futuro', ex: 'Ich werde Arzt.' },
  { person: '2. Sg.', pronoun: 'du', form: 'wirst', use: 'Idade / Estado', ex: 'Du wirst bald 30.' },
  { person: '3. Sg.', pronoun: 'er / sie / es / man', form: 'wird', use: 'Adjetivo / Clima', ex: 'Das Essen wird kalt. Es wird dunkel.' },
  { person: '1. Pl.', pronoun: 'wir', form: 'werden', use: 'Transformação', ex: 'Wir werden immer besser.' },
  { person: '2. Pl.', pronoun: 'ihr', form: 'werdet', use: 'Estado', ex: 'Werdet ihr nicht müde?' },
  { person: '3. Pl. / Formal', pronoun: 'sie / Sie', form: 'werden', use: 'Formal', ex: 'Werden Sie bitte nicht ungeduldig.' },
];

export interface PluralFamilyItem {
  singular: string;
  plural: string;
  translation: string;
  family: number;
  familyDesc: string;
}

export const LESSON_10_PLURAL_ITEMS: PluralFamilyItem[] = [
  { singular: 'die Kartoffel', plural: 'die Kartoffeln', translation: 'batata', family: 3, familyDesc: '-(e)n' },
  { singular: 'die Zwiebel', plural: 'die Zwiebeln', translation: 'cebola', family: 3, familyDesc: '-(e)n' },
  { singular: 'die Möhre', plural: 'die Möhren', translation: 'cenoura', family: 3, familyDesc: '-(e)n' },
  { singular: 'die Tomate', plural: 'die Tomaten', translation: 'tomate', family: 3, familyDesc: '-(e)n' },
  { singular: 'die Gurke', plural: 'die Gurken', translation: 'pepino', family: 3, familyDesc: '-(e)n' },
  { singular: 'der Salat', plural: 'die Salate', translation: 'salada', family: 1, familyDesc: '-e' },
  { singular: 'das Rezept', plural: 'die Rezepte', translation: 'receita', family: 1, familyDesc: '-e' },
  { singular: 'die Zutat', plural: 'die Zutaten', translation: 'ingrediente', family: 3, familyDesc: '-(e)n' },
  { singular: 'der Esslöffel', plural: 'die Esslöffel', translation: 'colher de sopa', family: 5, familyDesc: 'sem desinência' },
  { singular: 'das Gramm', plural: 'die Gramm', translation: 'grama', family: 5, familyDesc: 'invariável como medida' },
  { singular: 'das Kilo', plural: 'die Kilos', translation: 'quilo', family: 4, familyDesc: '-s' },
  { singular: 'der Liter', plural: 'die Liter', translation: 'litro', family: 5, familyDesc: 'invariável como medida' },
  { singular: 'die Portion', plural: 'die Portionen', translation: 'porção', family: 3, familyDesc: '-(e)n' },
  { singular: 'die Mahlzeit', plural: 'die Mahlzeiten', translation: 'refeição', family: 3, familyDesc: '-(e)n' },
  { singular: 'das Gericht', plural: 'die Gerichte', translation: 'prato preparado', family: 1, familyDesc: '-e' },
  { singular: 'die Speise', plural: 'die Speisen', translation: 'comida / prato', family: 3, familyDesc: '-(e)n' },
  { singular: 'die Vorspeise', plural: 'die Vorspeisen', translation: 'entrada', family: 3, familyDesc: '-(e)n' },
  { singular: 'das Hauptgericht', plural: 'die Hauptgerichte', translation: 'prato principal', family: 1, familyDesc: '-e' },
  { singular: 'die Nachspeise', plural: 'die Nachspeisen', translation: 'sobremesa', family: 3, familyDesc: '-(e)n' },
  { singular: 'das Getränk', plural: 'die Getränke', translation: 'bebida', family: 1, familyDesc: '-e (+ Umlaut)' },
];

export interface SuffixRule {
  suffix: string;
  gender: 'der' | 'die' | 'das';
  category: string;
  examples: string;
}

export const GENDER_SUFFIX_RULES: SuffixRule[] = [
  { suffix: '-er', gender: 'der', category: 'Pessoas masculinas e aparelhos', examples: 'der Minister, der Fernseher, der Schüler, der Computer, der Chemiker' },
  { suffix: '-in', gender: 'die', category: 'Pessoas femininas e profissões', examples: 'die Lehrerin, die Freundin, die Kellnerin, die Chemikerin' },
  { suffix: '-ung', gender: 'die', category: 'Ações e conceitos abstratos', examples: 'die Einladung, die Ausbildung, die Besprechung, die Wohnung' },
  { suffix: '-e', gender: 'die', category: 'Maioria das palavras dissílabas em -e', examples: 'die Geschichte, die Bluse, die Familie, die Straße, die Sonne' },
  { suffix: '-tät, -ion, -ie, -ik', gender: 'die', category: 'Estrangeirismos cultos', examples: 'die Universität, die Information, die Musik, die Politik' },
  { suffix: 'Palavras internacionais', gender: 'das', category: 'Empréstimos modernos', examples: 'das Radio, das Handy, das Auto, das Café' },
  { suffix: 'Infinitivo substantivado', gender: 'das', category: 'Ação verbal tornada substantivo', examples: 'das Lesen, das Schreiben, das Essen, das Leben' },
  { suffix: '-um', gender: 'das', category: 'Termos de origem latina', examples: 'das Gymnasium, das Museum, das Zentrum, das Datum' },
];

// ==========================================
// BLOCO 2 — TEXTOS E MINERAÇÃO LEXICAL
// ==========================================

export interface QuizQuestion {
  id: number;
  questionDe: string;
  questionPt: string;
  options: { key: string; text: string }[];
  correct: string;
  justification: string;
}

export const ESSEN_TRINKEN_QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    questionDe: 'Woher kommt die Kartoffel?',
    questionPt: 'De onde vem a batata?',
    options: [
      { key: 'A', text: 'aus Asien' },
      { key: 'B', text: 'aus Europa' },
      { key: 'C', text: 'aus Südamerika' },
      { key: 'D', text: 'aus Afrika' },
    ],
    correct: 'C',
    justification: 'A batata é originária da região andina na América do Sul e foi levada à Europa pelos navegadores espanhóis no século XVI.',
  },
  {
    id: 2,
    questionDe: 'Was isst man in Deutschland traditionell zu Weihnachten (am 25.12.)?',
    questionPt: 'O que se come na Alemanha tradicionalmente no Natal (25/12)?',
    options: [
      { key: 'A', text: 'Lachs (salmão)' },
      { key: 'B', text: 'Gans (ganso)' },
      { key: 'C', text: 'Rind (carne bovina)' },
      { key: 'D', text: 'Schwein (carne suína)' },
    ],
    correct: 'B',
    justification: 'A Weihnachtsgans (ganso assado de Natal com repolho roxo e Knödel) é o prato natalino mais canônico da culinária alemã.',
  },
  {
    id: 3,
    questionDe: 'Wo war das erste Kaffeehaus (Café) in Europa?',
    questionPt: 'Onde foi o primeiro café (Kaffeehaus) da Europa?',
    options: [
      { key: 'A', text: 'in Venedig' },
      { key: 'B', text: 'in Hamburg' },
      { key: 'C', text: 'in Wien' },
      { key: 'D', text: 'in Prag' },
    ],
    correct: 'A',
    justification: 'O primeiro café europeu abriu em Veneza (1645), na Piazza San Marco, ponto de entrada do comércio com o Oriente.',
  },
  {
    id: 4,
    questionDe: 'Der erste „Hamburger“: Wann war das?',
    questionPt: 'O primeiro "hambúrguer": quando foi criado?',
    options: [
      { key: 'A', text: '1954' },
      { key: 'B', text: '1974' },
      { key: 'C', text: '1904' },
      { key: 'D', text: '1944' },
    ],
    correct: 'C',
    justification: 'O formato de sanduíche de hambúrguer popularizou-se na Feira Mundial de St. Louis em 1904.',
  },
  {
    id: 5,
    questionDe: 'Wo produziert man den meisten Wein?',
    questionPt: 'Onde se produz a maior quantidade de vinho no mundo?',
    options: [
      { key: 'A', text: 'in Spanien' },
      { key: 'B', text: 'in Südafrika' },
      { key: 'C', text: 'in Argentinien' },
      { key: 'D', text: 'in Frankreich' },
    ],
    correct: 'D',
    justification: 'Historicamente a França disputa o topo mundial com a Itália e é citada como a maior produtora global.',
  },
  {
    id: 6,
    questionDe: 'Was ist das teuerste Gewürz auf der Welt?',
    questionPt: 'Qual é a especiaria mais cara do mundo?',
    options: [
      { key: 'A', text: 'Pfeffer (pimenta)' },
      { key: 'B', text: 'Safran (açafrão)' },
      { key: 'C', text: 'Curry' },
      { key: 'D', text: 'Ingwer (gengibre)' },
    ],
    correct: 'B',
    justification: 'O açafrão verdadeiro (Safran) é colhido manualmente dos estigmas da flor de Crocus sativus e custa milhares de euros por quilo.',
  },
];

export interface RecipeStep {
  textDe: string;
  textPt: string;
  imperativeVerb: string;
}

export interface FullRecipe {
  titleDe: string;
  titlePt: string;
  servings: string;
  ingredients: { itemDe: string; itemPt: string }[];
  steps: RecipeStep[];
}

export const RECIPES_DATA: FullRecipe[] = [
  {
    titleDe: 'Kartoffelsuppe mit Champignons',
    titlePt: 'Sopa de Batata com Champignons',
    servings: 'für 4 Personen',
    ingredients: [
      { itemDe: '500 g Kartoffeln', itemPt: '500 g de batatas' },
      { itemDe: '500 g Porree', itemPt: '500 g de alho-poró' },
      { itemDe: '500 g Champignons', itemPt: '500 g de cogumelos champignon' },
      { itemDe: 'Gemüsebrühe', itemPt: 'caldo de legumes' },
      { itemDe: '1 Becher Sahne', itemPt: '1 copo de creme de leite' },
      { itemDe: 'Salz und Pfeffer', itemPt: 'sal e pimenta-do-reino' },
    ],
    steps: [
      { textDe: 'Schälen Sie die Kartoffeln.', textPt: 'Descasque as batatas.', imperativeVerb: 'Schälen Sie' },
      { textDe: 'Machen Sie den Porree und die Champignons sauber.', textPt: 'Limpe o alho-poró e os cogumelos.', imperativeVerb: 'Machen Sie' },
      { textDe: 'Schneiden Sie alles klein.', textPt: 'Corte tudo em pedaços pequenos.', imperativeVerb: 'Schneiden Sie' },
      { textDe: 'Braten Sie die Kartoffeln, den Porree und die Champignons in Öl an.', textPt: 'Refogue as batatas, o alho-poró e os cogumelos no óleo.', imperativeVerb: 'Braten Sie ... an' },
      { textDe: 'Geben Sie die Brühe dazu und kochen Sie alles etwa 20 Minuten.', textPt: 'Adicione o caldo e cozinhe tudo por cerca de 20 minutos.', imperativeVerb: 'Geben Sie ... dazu / kochen Sie' },
      { textDe: 'Pürieren Sie die Suppe und geben Sie die Sahne hinzu.', textPt: 'Bata a sopa no liquidificador (ou mixer) e adicione o creme de leite.', imperativeVerb: 'Pürieren Sie / geben Sie ... hinzu' },
      { textDe: 'Würzen Sie die Suppe mit Salz und Pfeffer. Guten Appetit!', textPt: 'Tempere a sopa com sal e pimenta. Bom apetite!', imperativeVerb: 'Würzen Sie' },
    ],
  },
  {
    titleDe: 'Kartoffelsalat mit Apfel',
    titlePt: 'Salada de Batata com Maçã',
    servings: 'für 4 Personen',
    ingredients: [
      { itemDe: '750 g Kartoffeln', itemPt: '750 g de batatas' },
      { itemDe: '1/4 Liter Gemüsebrühe', itemPt: '1/4 de litro de caldo de legumes' },
      { itemDe: '1 Zwiebel', itemPt: '1 cebola' },
      { itemDe: '3 Äpfel', itemPt: '3 maçãs' },
      { itemDe: '4 Esslöffel Essig', itemPt: '4 colheres de sopa de vinagre' },
      { itemDe: '2 Esslöffel Öl', itemPt: '2 colheres de sopa de óleo' },
      { itemDe: '1 Bund Petersilie', itemPt: '1 maço de salsinha' },
      { itemDe: 'Salz und Pfeffer', itemPt: 'sal e pimenta-do-reino' },
    ],
    steps: [
      { textDe: 'Schälen und schneiden Sie die Zwiebel und kochen Sie die Zwiebel mit Brühe, Essig, Pfeffer und Salz ca. 10 Minuten.', textPt: 'Descasque e corte a cebola e cozinhe-a com o caldo, vinagre, pimenta e sal por cerca de 10 minutos.', imperativeVerb: 'Schälen, schneiden, kochen Sie' },
      { textDe: 'Kochen Sie die Kartoffeln und schneiden Sie sie in Scheiben.', textPt: 'Cozinhe as batatas e corte-as em rodelas.', imperativeVerb: 'Kochen, schneiden Sie' },
      { textDe: 'Waschen und schneiden Sie die Petersilie und die Äpfel.', textPt: 'Lave e corte a salsinha e as maçãs.', imperativeVerb: 'Waschen, schneiden Sie' },
      { textDe: 'Geben Sie die Brühe, die Kartoffeln, das Öl, die Petersilie und die Äpfel in eine Schüssel und vermengen Sie alles. Guten Appetit!', textPt: 'Coloque o caldo, as batatas, o óleo, a salsinha e as maçãs em uma tigela e misture tudo. Bom apetite!', imperativeVerb: 'Geben Sie ... in / vermengen Sie' },
    ],
  },
];

export interface RestaurantDialogueQuestion {
  num: number;
  questionDe: string;
  questionPt: string;
  answerDe: string;
  answerPt: string;
}

export const RESTAURANT_DIALOGUE_QUESTIONS: RestaurantDialogueQuestion[] = [
  { num: 0, questionDe: 'Für wie viele Personen braucht Hubert einen Tisch?', questionPt: 'Para quantas pessoas Hubert precisa de uma mesa?', answerDe: 'für drei Personen', answerPt: 'para três pessoas' },
  { num: 1, questionDe: 'Wo möchte Kerstin sitzen?', questionPt: 'Onde Kerstin gostaria de se sentar?', answerDe: 'am Fenster', answerPt: 'na janela' },
  { num: 2, questionDe: 'Was trinkt Katja?', questionPt: 'O que Katja bebe?', answerDe: 'ein Wasser', answerPt: 'uma água' },
  { num: 3, questionDe: 'Was trinkt Hubert?', questionPt: 'O que Hubert bebe?', answerDe: 'ein dunkles Bier', answerPt: 'uma cerveja escura' },
  { num: 4, questionDe: 'Worauf hat Hubert Appetit?', questionPt: 'Do que Hubert está com vontade/apetite?', answerDe: 'auf ein großes Schnitzel mit Bratkartoffeln', answerPt: 'de um schnitzel grande com batatas salteadas' },
  { num: 5, questionDe: 'Was isst Katja?', questionPt: 'O que Katja come?', answerDe: 'das Leipziger Allerlei', answerPt: 'o prato regional Leipziger Allerlei (legumes com caranguejo/molho)' },
  { num: 6, questionDe: 'Was isst Kerstin?', questionPt: 'O que Kerstin come?', answerDe: 'ein Schnitzel mit Salzkartoffeln', answerPt: 'um schnitzel com batatas cozidas' },
];

export interface ConjunctionSentence {
  id: number;
  sentenceDe: string;
  sentencePt: string;
  conjunction: 'deshalb' | 'trotzdem';
  explanation: string;
}

export const TROTZDEM_DESHALB_DATA: ConjunctionSentence[] = [
  { id: 1, sentenceDe: 'Paul kann nicht kochen, deshalb geht er oft ins Restaurant.', sentencePt: 'Paul não sabe cozinhar, por isso ele vai frequentemente ao restaurante.', conjunction: 'deshalb', explanation: 'Consequência lógica/razão (Grund): não saber cozinhar leva a comer fora.' },
  { id: 2, sentenceDe: 'Marie mag kein Gemüse, trotzdem gibt es bei ihr jede Woche Leipziger Allerlei.', sentencePt: 'Marie não gosta de legumes, mesmo assim toda semana tem Leipziger Allerlei na casa dela.', conjunction: 'trotzdem', explanation: 'Contradição/contra-motivo (Gegengrund): não gostar de legumes mas comer prato vegetal.' },
  { id: 3, sentenceDe: 'Alexandra ist Griechin, deshalb würzt sie ihre Gerichte gern mit Petersilie, Basilikum und Thymian.', sentencePt: 'Alexandra é grega, por isso tempera seus pratos com salsinha, manjericão e tomilho.', conjunction: 'deshalb', explanation: 'Razão cultural que explica o hábito alimentar.' },
  { id: 4, sentenceDe: 'Morgen schreibt Katja einen Test, trotzdem lernt sie nicht.', sentencePt: 'Amanhã Katja faz uma prova, mesmo assim ela não estuda.', conjunction: 'trotzdem', explanation: 'Contradição com a expectativa de estudar para a prova.' },
  { id: 5, sentenceDe: 'Herr Krause ist krank, trotzdem geht er zur Arbeit.', sentencePt: 'O senhor Krause está doente, mesmo assim ele vai ao trabalho.', conjunction: 'trotzdem', explanation: 'Ação que contraria o estado de saúde.' },
  { id: 6, sentenceDe: 'Sie mag keine Tiere, trotzdem hat sie einen Hund.', sentencePt: 'Ela não gosta de animais, mesmo assim ela tem um cachorro.', conjunction: 'trotzdem', explanation: 'Contradição direta entre preferência e posse de um animal.' },
  { id: 7, sentenceDe: 'Ich will heute Abend nicht alleine fernsehen, deshalb gehe ich zur Party von Otto.', sentencePt: 'Não quero assistir TV sozinho hoje à noite, por isso vou à festa do Otto.', conjunction: 'deshalb', explanation: 'Motivo pessoal para comparecer ao evento social.' },
  { id: 8, sentenceDe: 'Ich will nicht jeden Morgen mit dem Auto im Stau stehen, deshalb fahre ich mit der Straßenbahn.', sentencePt: 'Não quero ficar preso no trânsito toda manhã de carro, por isso vou de bonde.', conjunction: 'deshalb', explanation: 'Consequência prática para evitar o engarrafamento.' },
  { id: 9, sentenceDe: 'Marcus mag die Großstadt, trotzdem will er ein Haus auf dem Land kaufen.', sentencePt: 'Marcus gosta da cidade grande, mesmo assim ele quer comprar uma casa no campo.', conjunction: 'trotzdem', explanation: 'Gostar da metrópole em contraste com a decisão de mudar para a zona rural.' },
];

export interface LexicalEntry {
  german: string;
  grammarClass: string;
  plural: string;
  translation: string;
  sampleSentence: string;
}

export const LESSON_10_PRIMARY_LEXICON: LexicalEntry[] = [
  { german: 'die Kartoffel', grammarClass: 'Subst. fem.', plural: 'die Kartoffeln', translation: 'batata', sampleSentence: 'Die Kartoffel kam im 16. Jahrhundert nach Europa.' },
  { german: 'der Champignon', grammarClass: 'Subst. masc.', plural: 'die Champignons', translation: 'cogumelo champignon', sampleSentence: 'Ich brauche 500 g Champignons für die Suppe.' },
  { german: 'der Porree', grammarClass: 'Subst. masc.', plural: 'die Porrees', translation: 'alho-poró', sampleSentence: 'Braten Sie den Porree in heißem Öl an.' },
  { german: 'die Gemüsebrühe', grammarClass: 'Subst. fem.', plural: 'die Gemüsebrühen', translation: 'caldo de legumes', sampleSentence: 'Geben Sie die Gemüsebrühe vorsichtig dazu.' },
  { german: 'die Sahne', grammarClass: 'Subst. fem.', plural: 'sem plural', translation: 'creme de leite', sampleSentence: 'Geben Sie zum Schluss einen Becher Sahne hinzu.' },
  { german: 'der Pfeffer', grammarClass: 'Subst. masc.', plural: 'sem plural', translation: 'pimenta-do-reino', sampleSentence: 'Würzen Sie das Gericht mit etwas Pfeffer.' },
  { german: 'das Salz', grammarClass: 'Subst. neutro', plural: 'sem plural', translation: 'sal de cozinha', sampleSentence: 'Salzkartoffeln kocht man mit reichlich Salz.' },
  { german: 'das Öl', grammarClass: 'Subst. neutro', plural: 'die Öle', translation: 'óleo vegetal', sampleSentence: 'Man brät das Gemüse in zwei Esslöffeln Öl.' },
  { german: 'der Essig', grammarClass: 'Subst. masc.', plural: 'sem plural', translation: 'vinagre', sampleSentence: 'Der Kartoffelsalat braucht vier Esslöffel Essig.' },
  { german: 'die Petersilie', grammarClass: 'Subst. fem.', plural: 'sem plural', translation: 'salsinha', sampleSentence: 'Schneiden Sie ein Bund frische Petersilie klein.' },
  { german: 'die Zwiebel', grammarClass: 'Subst. fem.', plural: 'die Zwiebeln', translation: 'cebola', sampleSentence: 'Schälen und hacken Sie eine große Zwiebel.' },
  { german: 'der Apfel', grammarClass: 'Subst. masc.', plural: 'die Äpfel', translation: 'maçã', sampleSentence: 'Die Äpfel geben dem Salat einen frischen Geschmack.' },
  { german: 'der Esslöffel', grammarClass: 'Subst. masc.', plural: 'die Esslöffel', translation: 'colher de sopa', sampleSentence: 'Geben Sie zwei Esslöffel Honig dazu.' },
  { german: 'das Gramm', grammarClass: 'Subst. neutro', plural: 'die Gramm', translation: 'grama', sampleSentence: 'Wir wiegen genau 750 Gramm Kartoffeln ab.' },
  { german: 'das Kilo', grammarClass: 'Subst. neutro', plural: 'die Kilos', translation: 'quilo', sampleSentence: 'Ein Kilo Kartoffeln kostet im Angebot nur 1,99 Euro.' },
  { german: 'der Liter', grammarClass: 'Subst. masc.', plural: 'die Liter', translation: 'litro', sampleSentence: 'Kochen Sie das Gemüse mit einem Viertelliter Brühe.' },
  { german: 'die Portion', grammarClass: 'Subst. fem.', plural: 'die Portionen', translation: 'porção individual', sampleSentence: 'Dieses Rezept reicht für vier große Portionen.' },
  { german: 'die Mahlzeit', grammarClass: 'Subst. fem.', plural: 'die Mahlzeiten', translation: 'refeição', sampleSentence: 'Das Mittagessen ist in Deutschland die Hauptmahlzeit.' },
  { german: 'das Gericht', grammarClass: 'Subst. neutro', plural: 'die Gerichte', translation: 'prato culinário', sampleSentence: 'Wir servieren ein traditionelles vegetarisches Gericht.' },
  { german: 'die Speise', grammarClass: 'Subst. fem.', plural: 'die Speisen', translation: 'comida / prato', sampleSentence: 'Alle Speisen werden frisch zubereitet.' },
  { german: 'die Vorspeise', grammarClass: 'Subst. fem.', plural: 'die Vorspeisen', translation: 'entrada', sampleSentence: 'Als Vorspeise nehme ich die heiße Tagessuppe.' },
  { german: 'das Hauptgericht', grammarClass: 'Subst. neutro', plural: 'die Hauptgerichte', translation: 'prato principal', sampleSentence: 'Zum Hauptgericht bestellen wir gegrillten Lachs.' },
  { german: 'die Nachspeise', grammarClass: 'Subst. fem.', plural: 'die Nachspeisen', translation: 'sobremesa', sampleSentence: 'Gibt es heute Apfelstrudel als Nachspeise?' },
  { german: 'das Getränk', grammarClass: 'Subst. neutro', plural: 'die Getränke', translation: 'bebida', sampleSentence: 'Welches Getränk darf ich Ihnen bringen?' },
  { german: 'die Rechnung', grammarClass: 'Subst. fem.', plural: 'die Rechnungen', translation: 'conta do restaurante', sampleSentence: 'Könnten wir bitte die Rechnung bekommen?' },
  { german: 'die Kellnerin', grammarClass: 'Subst. fem.', plural: 'die Kellnerinnen', translation: 'garçonete', sampleSentence: 'Die Kellnerin bringt uns die Speisekarte.' },
  { german: 'der Kellner', grammarClass: 'Subst. masc.', plural: 'die Kellner', translation: 'garçom', sampleSentence: 'Der Kellner empfiehlt den badischen Weißwein.' },
];

export interface SlangEntry {
  expression: string;
  translation: string;
  context: string;
}

export const LESSON_10_UMGANGSSPRACHE: SlangEntry[] = [
  { expression: 'Guten Appetit!', translation: 'Bom apetite!', context: 'Desejo canônico no início de qualquer refeição formal ou informal.' },
  { expression: 'Prost!', translation: 'Saúde! (brinde com cerveja)', context: 'Brinde informal com cerveja, mantendo contato visual.' },
  { expression: 'Zum Wohl!', translation: 'À sua saúde! (brinde com vinho)', context: 'Brinde mais elegante, comumente reservado a taças de vinho ou ocasiões formais.' },
  { expression: 'Mahlzeit!', translation: 'Bom apetite! / Olá na hora do almoço', context: 'Saudação alemã universal no ambiente de trabalho por volta do meio-dia.' },
  { expression: 'Ich habe Hunger.', translation: 'Estou com fome.', context: 'Expressão padrão de apetite.' },
  { expression: 'Ich habe Durst.', translation: 'Estou com sede.', context: 'Expressão padrão de necessidade de líquidos.' },
  { expression: 'Das schmeckt lecker!', translation: 'Isso está uma delícia!', context: 'Elogio espontâneo à comida.' },
  { expression: 'Das schmeckt schrecklich!', translation: 'Isso tem um gosto horrível!', context: 'Crítica direta e contundente ao prato.' },
  { expression: 'Ich bin satt.', translation: 'Estou satisfeito / Não aguento mais comer.', context: 'Nunca confunda com "ich bin voll" (que pode soar como embriaguez!).' },
  { expression: 'Die Rechnung bitte!', translation: 'A conta, por favor!', context: 'Solicitação clássica para o garçom.' },
  { expression: 'Ich möchte zahlen.', translation: 'Gostaria de pagar.', context: 'Forma cortês de pedir a conta.' },
  { expression: 'Stimmt so!', translation: 'Pode ficar com o troco!', context: 'Expressão alemã para dar gorjeta ao arredondar o valor.' },
  { expression: 'Lass es dir schmecken!', translation: 'Aproveite a comida! / Bom rango!', context: 'Fórmula carinhosa entre amigos próximos ou familiares.' },
  { expression: 'Ich könnte platzen!', translation: 'Estou explodindo de tão cheio!', context: 'Exagero coloquial cômico após comer em demasia.' },
  { expression: 'Ich habe einen Bärenhunger.', translation: 'Estou com uma fome de leão (de urso)!', context: 'Enfatiza um apetite voraz.' },
  { expression: 'Das Wasser läuft mir im Mund zusammen.', translation: 'Estou ficando com água na boca.', context: 'Reação diante de um prato ou cheiro apetitoso.' },
  { expression: 'Es ist angerichtet.', translation: 'A mesa está servida.', context: 'Anúncio de que os pratos estão prontos na mesa.' },
  { expression: 'Sonst noch etwas?', translation: 'Mais alguma coisa?', context: 'Pergunta padrão da atendente na feira ou supermercado.' },
  { expression: 'Ist das alles?', translation: 'É só isso?', context: 'Confirmação do atendente antes de fechar a compra.' },
  { expression: 'Haben Sie das Geld passend?', translation: 'O senhor tem o valor trocado?', context: 'Pergunta frequente no caixa de pequenos estabelecimentos.' },
];

// ==========================================
// BLOCO 3 — EXERCÍCIOS E REVISÃO
// ==========================================

export interface ReverseTranslationChallenge {
  id: number;
  ptSentence: string;
  deSolution: string;
  grammarFocus: string;
}

export const LESSON_10_REVERSE_CHALLENGES: ReverseTranslationChallenge[] = [
  {
    id: 1,
    ptSentence: 'Eu gosto de batatas. Você gosta de arroz?',
    deSolution: 'Ich mag Kartoffeln. Magst du Reis?',
    grammarFocus: 'Modalverb mögen no presente: 1ª sg. (mag) e 2ª sg. com alternância (magst du).',
  },
  {
    id: 2,
    ptSentence: 'Eu gostaria de uma sopa de batata, por favor.',
    deSolution: 'Ich möchte eine Kartoffelsuppe, bitte.',
    grammarFocus: 'Modalverb möchten (pedido cortês) + substantivo feminino no acusativo (eine Kartoffelsuppe).',
  },
  {
    id: 3,
    ptSentence: 'O que você pega no café da manhã? — Eu pego um pãozinho com geleia.',
    deSolution: 'Was nimmst du zum Frühstück? — Ich nehme ein Brötchen mit Marmelade.',
    grammarFocus: 'Verbo irregular nehmen com alternância vocálica (du nimmst) + acusativo neutro (ein Brötchen).',
  },
  {
    id: 4,
    ptSentence: 'Eu como uma maçã. Você come uma pera?',
    deSolution: 'Ich esse einen Apfel. Isst du eine Birne?',
    grammarFocus: 'Alternância e -> i no verbo essen (du isst) + acusativo masculino (einen Apfel) e feminino (eine Birne).',
  },
  {
    id: 5,
    ptSentence: 'Eu bebo um copo de suco de laranja.',
    deSolution: 'Ich trinke ein Glas Orangensaft.',
    grammarFocus: 'Acusativo neutro (ein Glas) regendo a unidade de medida sem preposição.',
  },
  {
    id: 6,
    ptSentence: 'Eu estive no ano passado na Itália. Lá come-se muita massa.',
    deSolution: 'Ich war letztes Jahr in Italien. Dort isst man viel Nudeln.',
    grammarFocus: 'Präteritum de sein (ich war) + pronome impessoal man regendo o verbo na 3ª pessoa singular (man isst).',
  },
  {
    id: 7,
    ptSentence: 'Nós estávamos em Roma. Nós tínhamos sorte.',
    deSolution: 'Wir waren in Rom. Wir hatten Glück.',
    grammarFocus: 'Präteritum de sein (wir waren) e de haben (wir hatten) em contexto narrativo oral.',
  },
  {
    id: 8,
    ptSentence: 'Como está o sabor da salada? — Está excelente!',
    deSolution: 'Wie schmeckt der Salat? — Er schmeckt ausgezeichnet!',
    grammarFocus: 'Pergunta avaliativa com o verbo schmecken + resposta com pronome masculino anafórico (er).',
  },
  {
    id: 9,
    ptSentence: 'A conta, por favor! — Dá 37,50 euros.',
    deSolution: 'Die Rechnung bitte! — Das macht 37,50 Euro.',
    grammarFocus: 'Fórmula clássica de restaurante (Die Rechnung bitte) e expressão com machen para indicar o total.',
  },
  {
    id: 10,
    ptSentence: 'Bom apetite! — Obrigado, igualmente.',
    deSolution: 'Guten Appetit! — Danke, gleichfalls.',
    grammarFocus: 'Saudação à mesa e cortesia de retribuição simétrica com o advérbio gleichfalls.',
  },
];

export interface MasterKeyPoint {
  concept: string;
  ruleDe: string;
  rulePt: string;
}

export const LESSON_10_MASTER_KEY_POINTS: MasterKeyPoint[] = [
  { concept: 'Imperativo formal (Sie)', ruleDe: 'Schälen Sie das Obst.', rulePt: 'Verbo na Posição 1 seguido imediatamente de Sie (igual ao infinitivo).' },
  { concept: 'Imperativo informal singular (du)', ruleDe: 'Schäl das Obst! / Iss! / Nimm!', rulePt: 'Perde o pronome du e a terminação -st. Verbos com e -> i mantêm a vogal alternada.' },
  { concept: 'Imperativo informal plural (ihr)', ruleDe: 'Schält das Obst! / Esst!', rulePt: 'Elimina apenas o pronome ihr e mantém a terminação -t regular do presente.' },
  { concept: 'Imperativo de sein', ruleDe: 'Sei! (du), Seid! (ihr), Seien Sie! (Sie)', rulePt: 'Paradigma irregular único baseado na raiz sei-.' },
  { concept: 'Imperativo de haben', ruleDe: 'Hab! (du), Habt! (ihr), Haben Sie! (Sie)', rulePt: 'Sem trema e sem complicações fonéticas.' },
  { concept: 'Präteritum de sein', ruleDe: 'ich war, du warst, er war, wir waren, ihr wart, sie waren', rulePt: 'Uso obrigatório na oralidade cotidiana em vez do Perfekt com gewesen.' },
  { concept: 'Präteritum de haben', ruleDe: 'ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten', rulePt: 'Pretérito simples preferido no dia a dia para expressar posse ou estados passados.' },
  { concept: 'Acusativo com comida', ruleDe: 'einen Apfel (m), eine Banane (f), ein Brötchen (n), keine Pommes (pl)', rulePt: 'Apenas o artigo masculino se modifica para einen / keinen.' },
  { concept: 'As 5 Famílias do Plural', ruleDe: '1: -e; 2: -er; 3: -(e)n; 4: -s; 5: sem desinência', rulePt: 'Morfologia sistemática para todo o vocabulário de cozinha e mantimentos.' },
  { concept: 'O Verbo werden', ruleDe: 'ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden', rulePt: 'Expressa devir, mudança de estado, novas profissões e base do futuro.' },
  { concept: 'trotzdem (mesmo assim)', ruleDe: 'Pommes frites haben viel Fett, trotzdem esse ich sie gern.', rulePt: 'Advérbio concessivo que aponta para um contra-motivo; verbo fica na Posição II.' },
  { concept: 'deshalb (por isso)', ruleDe: 'Ich habe keinen Appetit, deshalb möchte ich jetzt nichts essen.', rulePt: 'Advérbio consecutivo que aponta para a causa/motivo; verbo fica na Posição II.' },
  { concept: 'Estrutura de Receitas', ruleDe: 'Zutaten (ingredientes) + Zubereitung (modo de preparo)', rulePt: 'Uso canônico do imperativo formal (Sie) em manuais culinários.' },
  { concept: 'Pronomes Reflexivos', ruleDe: 'mich, dich, sich, uns, euch, sich (no Acusativo)', rulePt: 'Complemento obrigatório de verbos reflexivos como sich freuen, sich ärgern, sich duschen.' },
  { concept: 'Caso Genitivo Simples', ruleDe: 'des Direktors, der Wand, deiner Mutter, des Druckers', rulePt: 'Indica posse ou relação: masculino/neutro ganha -(e)s (des), feminino/plural ganha der.' },
  { concept: 'Sufixos Determinadores de Gênero', ruleDe: '-er (masc), -in/-ung/-e/-tät/-ion (fem), -um/Infinitivos (neutro)', rulePt: 'Regras de terminação que blindam o acerto de artigos em mais de 80% dos substantivos.' },
];
