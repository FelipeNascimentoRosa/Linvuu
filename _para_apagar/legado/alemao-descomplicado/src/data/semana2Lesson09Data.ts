// Dados completos e estruturados da Semana 2 — Aula 09 / Dia 009 do Cronograma
// Kapitel 4, Teil A, A1–A15 (p. 86–97)

export interface LessonMetadata {
  week: string;
  round: string;
  day: string;
  chapter: string;
  title: string;
  subtitle: string;
  totalHours: string;
}

export const SEMANA_02_LESSON_09_METADATA: LessonMetadata = {
  week: 'Semana 2',
  round: 'RODADA 09',
  day: 'DIA 009 DO CRONOGRAMA',
  chapter: 'KAPITEL 4, TEIL A, A1–A15 (p. 86–97)',
  title: 'O Modalverb mögen, Präteritum de sein/haben, Acusativo com Alimentos & Bebidas, Cultura Gastronômica Alemã e Diálogos no Restaurante',
  subtitle: 'Conjugação e negação de mögen vs. möchten, café da manhã no hotel, ofertas de supermercado, imperativo culinário, fonética do ä [ɛ:/ɛ] e pedidos no restaurante',
  totalHours: '3 Horas (Bloco 1: 60 min | Bloco 2: 60 min | Bloco 3: 60 min)',
};

// 1.1 O Modalverb mögen
export interface MoegenConjugation {
  person: string;
  pronoun: string;
  form: string;
  obs: string;
}

export const MOEGEN_CONJUGATION_DATA: MoegenConjugation[] = [
  { person: '1. Sg.', pronoun: 'ich', form: 'mag', obs: 'radical alterado (ö → a)' },
  { person: '2. Sg.', pronoun: 'du', form: 'magst', obs: 'radical alterado (ö → a) + st' },
  { person: '3. Sg.', pronoun: 'er / sie / es / man', form: 'mag', obs: 'radical alterado (idêntico à 1ª pessoa!)' },
  { person: '1. Pl.', pronoun: 'wir', form: 'mögen', obs: 'radical normal com trema' },
  { person: '2. Pl.', pronoun: 'ihr', form: 'mögt', obs: 'radical com trema + t' },
  { person: '3. Pl.', pronoun: 'sie', form: 'mögen', obs: 'radical normal com trema' },
  { person: 'Formal', pronoun: 'Sie', form: 'mögen', obs: 'radical normal com trema' },
];

export const MOEGEN_VS_MOECHTEN_DATA = [
  {
    verbo: 'mögen',
    uso: 'Gostar de algo (preferência permanente ou afeição)',
    exemplo: 'Ich mag Kaffee.',
    traducao: 'Eu gosto de café.',
    explicacao: 'Usa-se diretamente com substantivos ou com o advérbio gern para ações.'
  },
  {
    verbo: 'möchten',
    uso: 'Gostaria de algo (desejo educado, pedido circunstancial)',
    exemplo: 'Ich möchte einen Kaffee.',
    traducao: 'Eu gostaria de um café.',
    explicacao: 'Forma polida do Konjunktiv II de mögen, muito comum em pedidos de restaurante.'
  },
];

export const MOEGEN_EXAMPLES_DATA = [
  { de: 'Ich mag Schokolade.', pt: 'Eu gosto de chocolate.' },
  { de: 'Magst du Fisch?', pt: 'Você gosta de peixe?' },
  { de: 'Er mag keine Tomaten.', pt: 'Ele não gosta de tomates.' },
  { de: 'Wir mögen italienisches Essen.', pt: 'Nós gostamos de comida italiana.' },
  { de: 'Mögt ihr Kaffee?', pt: 'Vocês gostam de café?' },
  { de: 'Sie mögen keinen Alkohol.', pt: 'Eles não gostam de álcool.' },
];

export const MOEGEN_NEGATION_DATA = [
  { de: 'Ich mag kein Fleisch.', pt: 'Eu não gosto de carne.', tipo: 'Substantivo neutro (das Fleisch → kein)' },
  { de: 'Ich mag keinen Kaffee.', pt: 'Eu não gosto de café.', tipo: 'Substantivo masculino (der Kaffee → keinen)' },
  { de: 'Ich mag keine Milch.', pt: 'Eu não gosto de leite.', tipo: 'Substantivo feminino (die Milch → keine)' },
  { de: 'Ich mag nicht gern kochen.', pt: 'Eu não gosto de cozinhar.', tipo: 'Ação / Verbo (nicht gern + verbo)' },
];

// 1.2 Präteritum de sein e haben
export const PRAETERITUM_SEIN_HABEN_DATA = {
  sein: [
    { person: '1. Sg.', pronoun: 'ich', form: 'war', pt: 'eu era / estava / fui' },
    { person: '2. Sg.', pronoun: 'du', form: 'warst', pt: 'você era / estava / foi' },
    { person: '3. Sg.', pronoun: 'er/sie/es/man', form: 'war', pt: 'ele/ela era / estava / foi' },
    { person: '1. Pl.', pronoun: 'wir', form: 'waren', pt: 'nós éramos / estávamos / fomos' },
    { person: '2. Pl.', pronoun: 'ihr', form: 'wart', pt: 'vocês eram / estavam / foram' },
    { person: '3. Pl.', pronoun: 'sie', form: 'waren', pt: 'eles/elas eram / estavam / foram' },
    { person: 'Formal', pronoun: 'Sie', form: 'waren', pt: 'o senhor/a senhora era / estava / foi' },
  ],
  haben: [
    { person: '1. Sg.', pronoun: 'ich', form: 'hatte', pt: 'eu tinha / tive' },
    { person: '2. Sg.', pronoun: 'du', form: 'hattest', pt: 'você tinha / teve' },
    { person: '3. Sg.', pronoun: 'er/sie/es/man', form: 'hatte', pt: 'ele/ela tinha / teve' },
    { person: '1. Pl.', pronoun: 'wir', form: 'hatten', pt: 'nós tínhamos / tivemos' },
    { person: '2. Pl.', pronoun: 'ihr', form: 'hattet', pt: 'vocês tinham / tiveram' },
    { person: '3. Pl.', pronoun: 'sie', form: 'hatten', pt: 'eles/elas tinham / tiveram' },
    { person: 'Formal', pronoun: 'Sie', form: 'hatten', pt: 'o senhor/a senhora tinha / teve' },
  ],
  exemplos: [
    { de: 'Ich war gestern im Kino.', pt: 'Eu estava ontem no cinema.' },
    { de: 'Wir waren in Berlin.', pt: 'Nós estávamos em Berlim.' },
    { de: 'Er hatte einen Hund.', pt: 'Ele tinha um cachorro.' },
    { de: 'Ich hatte keine Zeit.', pt: 'Eu não tinha tempo.' },
    { de: 'Warst du schon mal in Wien?', pt: 'Você já esteve em Viena?' },
    { de: 'Hattest du einen Termin?', pt: 'Você tinha um compromisso?' },
  ]
};

// 1.3 As 5 Famílias do Plural aplicadas a Alimentos e Utensílios
export const PLURAL_FOOD_ITEMS_DATA = [
  { singular: 'das Brötchen', plural: 'die Brötchen', traducao: 'pãozinho', familia: 5, sufixo: '—', umlaut: false },
  { singular: 'das Ei', plural: 'die Eier', traducao: 'ovo', familia: 2, sufixo: '-er', umlaut: false },
  { singular: 'die Wurst', plural: 'die Würste', traducao: 'salsicha', familia: 1, sufixo: '-e', umlaut: true },
  { singular: 'der Schinken', plural: 'die Schinken', traducao: 'presunto', familia: 5, sufixo: '—', umlaut: false },
  { singular: 'der Käse', plural: 'die Käse', traducao: 'queijo', familia: 5, sufixo: '—', umlaut: false },
  { singular: 'die Marmelade', plural: 'die Marmeladen', traducao: 'geleia', familia: 3, sufixo: '-n', umlaut: false },
  { singular: 'die Butter', plural: 'sem plural', traducao: 'manteiga (Singularetantum)', familia: 0, sufixo: '—', umlaut: false },
  { singular: 'die Milch', plural: 'sem plural', traducao: 'leite (Singularetantum)', familia: 0, sufixo: '—', umlaut: false },
  { singular: 'der Saft', plural: 'die Säfte', traducao: 'suco', familia: 1, sufixo: '-e', umlaut: true },
  { singular: 'das Wasser', plural: 'sem plural', traducao: 'água (Singularetantum)', familia: 0, sufixo: '—', umlaut: false },
  { singular: 'der Tee', plural: 'die Tees', traducao: 'chá', familia: 4, sufixo: '-s', umlaut: false },
  { singular: 'der Kaffee', plural: 'die Kaffees', traducao: 'café', familia: 4, sufixo: '-s', umlaut: false },
  { singular: 'die Tasse', plural: 'die Tassen', traducao: 'xícara', familia: 3, sufixo: '-n', umlaut: false },
  { singular: 'der Teller', plural: 'die Teller', traducao: 'prato', familia: 5, sufixo: '—', umlaut: false },
  { singular: 'das Messer', plural: 'die Messer', traducao: 'faca', familia: 5, sufixo: '—', umlaut: false },
  { singular: 'die Gabel', plural: 'die Gabeln', traducao: 'garfo', familia: 3, sufixo: '-n', umlaut: false },
  { singular: 'der Löffel', plural: 'die Löffel', traducao: 'colher', familia: 5, sufixo: '—', umlaut: false },
];

// 1.4 a 1.8 Verbos de Comida e Bebida com Acusativo
export const FOOD_VERBS_DATA = [
  { verbo: 'essen', traducao: 'comer', exemplo: 'Ich esse einen Apfel.', explicacao: 'Vogal alternada: du isst, er isst' },
  { verbo: 'trinken', traducao: 'beber', exemplo: 'Ich trinke einen Kaffee.', explicacao: 'Regular: du trinkst, er trinkt' },
  { verbo: 'nehmen', traducao: 'pegar / pedir', exemplo: 'Ich nehme ein Brötchen.', explicacao: 'Vogal alternada: du nimmst, er nimmt' },
  { verbo: 'kaufen', traducao: 'comprar', exemplo: 'Ich kaufe einen Käse.', explicacao: 'Regular: du kaufst, er kauft' },
  { verbo: 'möchten', traducao: 'gostaria de', exemplo: 'Ich möchte eine Tasse Tee.', explicacao: 'Modal polido: ich möchte, du möchtest' },
  { verbo: 'bestellen', traducao: 'pedir / encomendar', exemplo: 'Ich bestelle einen Salat.', explicacao: 'Inseparável (be-): ich bestelle' },
  { verbo: 'mögen', traducao: 'gostar de', exemplo: 'Ich mag den Fisch.', explicacao: 'Modal de gosto: ich mag, du magst' },
];

export const AKKUSATIV_FOOD_TABLE = [
  { genero: 'Masculino (der)', artigoIndefinido: 'einen', negacao: 'keinen', exemplo: 'Ich esse einen Apfel.', pt: 'Como uma maçã.' },
  { genero: 'Feminino (die)', artigoIndefinido: 'eine', negacao: 'keine', exemplo: 'Ich esse eine Banane.', pt: 'Como uma banana.' },
  { genero: 'Neutro (das)', artigoIndefinido: 'ein', negacao: 'kein', exemplo: 'Ich esse ein Brötchen.', pt: 'Como um pãozinho.' },
  { genero: 'Plural (die)', artigoIndefinido: '— (sem artigo)', negacao: 'keine', exemplo: 'Ich esse keine Pommes.', pt: 'Não como batatas fritas.' },
];

export const NEHMEN_EXAMPLES = [
  { de: 'Ich nehme ein Brötchen mit Käse.', pt: 'Pego um pãozinho com queijo.' },
  { de: 'Nimmst du auch ein Ei?', pt: 'Você também pega um ovo?' },
  { de: 'Er nimmt ein Glas Orangensaft.', pt: 'Ele pega um copo de suco de laranja.' },
  { de: 'Wir nehmen zwei Tassen Kaffee.', pt: 'Pegamos duas xícaras de café.' },
  { de: 'Nehmt ihr auch Milch?', pt: 'Vocês também pegam leite?' },
];

export const ESSEN_EXAMPLES = [
  { de: 'Ich esse ein Brötchen mit Marmelade.', pt: 'Como um pãozinho com geleia.' },
  { de: 'Isst du Fleisch?', pt: 'Você come carne?' },
  { de: 'Er isst keine Wurst.', pt: 'Ele não come salsicha.' },
  { de: 'Wir essen um 12.00 Uhr zu Mittag.', pt: 'Nós almoçamos às 12h.' },
  { de: 'Esst ihr auch Fisch?', pt: 'Vocês também comem peixe?' },
];

export const TRINKEN_EXAMPLES = [
  { de: 'Ich trinke einen Kaffee.', pt: 'Bebo um café.' },
  { de: 'Trinkst du Tee?', pt: 'Você bebe chá?' },
  { de: 'Er trinkt ein Glas Wasser.', pt: 'Ele bebe um copo de água.' },
  { de: 'Wir trinken Orangensaft.', pt: 'Bebemos suco de laranja.' },
  { de: 'Trinkt ihr auch Milch?', pt: 'Vocês também bebem leite?' },
];

// 2.1 Texto A1 — Beim Frühstück
export const TEXT_A1_DIALOGUE = [
  { speaker: 'Norbert', de: "Guten Morgen, Peter. Wie geht's?", pt: 'Bom dia, Peter. Como vai?' },
  { speaker: 'Peter', de: 'Guten Morgen. Danke, gut. Ich habe jetzt richtigen Hunger.', pt: 'Bom dia. Obrigado, bem. Estou com muita fome agora.' },
  { speaker: 'Norbert', de: 'Ich auch. Was nimmst du zum Frühstück? … Hm, was für ein tolles Büfett! Wo stehen die Teller?', pt: 'Eu também. O que você pega no café da manhã? … Hm, que buffet maravilhoso! Onde estão os pratos?' },
  { speaker: 'Peter', de: 'Dort. Da liegt auch das Besteck.', pt: 'Lá. Também está lá o talher.' },
  { speaker: 'Norbert', de: 'Ach ja, ich sehe es. Ich nehme erst mal nur Joghurt mit Früchten.', pt: 'Ah sim, eu vejo. Eu pego primeiro só iogurte com frutas.' },
  { speaker: 'Peter', de: 'Nur Joghurt mit Früchten! Also, ich esse zwei Brötchen mit Käse und Schinken, ein gekochtes Ei … und … vielleicht noch zwei Scheiben Lachs.', pt: 'Só iogurte com frutas! Então, eu como dois pãezinhos com queijo e presunto, um ovo cozido … e … talvez mais duas fatias de salmão.' },
  { speaker: 'Kellnerin', de: 'Was möchten Sie trinken?', pt: 'O que os senhores gostariam de beber?' },
  { speaker: 'Peter', de: 'Eine Tasse Kaffee bitte.', pt: 'Uma xícara de café, por favor.' },
  { speaker: 'Norbert', de: 'Und ich möchte bitte einen Tee, einen Kräutertee …', pt: 'E eu gostaria de um chá, um chá de ervas …' },
  { speaker: 'Peter', de: 'Kräutertee und Joghurt mit Früchten. Du lebst wirklich gesund!', pt: 'Chá de ervas e iogurte com frutas. Você realmente vive saudavelmente!' },
];

export const TEXT_A1_NOTES = [
  'Ich habe richtigen Hunger = haben + richtigen Hunger (masculino acusativo com adjetivo terminando em -en).',
  'Was nimmst du zum Frühstück? = nehmen + zum Frühstück (Dativo de contração zu + dem).',
  'Was für ein tolles Büfett! = was für ein + adjetivo neutro (-es) + substantivo.',
  'Wo stehen die Teller? = verbo de posição stehen + sujeito plural.',
  'Ich nehme erst mal nur Joghurt = nehmen + Joghurt (sem artigo definido, subst. não contável).',
  'Ich esse zwei Brötchen = essen + numeral zwei + Brötchen (plural acusativo neutro).',
  'Ein gekochtes Ei = ein + particípio adjetivado gekocht + terminação neutra -es + Ei.',
  'Zwei Scheiben Lachs = zwei Scheiben + Lachs (especificação quantitativa sem artigo).',
  'Was möchten Sie trinken? = verbo modal möchten na posição 2 + infinitivo trinken no final da oração (Satzende).',
  'Eine Tasse Kaffee bitte = medida substantiva com nome de substância justaposto sem preposição.',
  'Ich möchte bitte einen Tee = möchten + einen Tee (masculino acusativo com -en).',
];

// 2.2 Oferta do Café da Manhã (Texto A2)
export const BREAKFAST_OFFER_DATA = [
  { artigo: 'der', substantivo: 'Orangensaft', plural: 'die Orangensäfte', traducao: 'suco de laranja', categoria: 'Bebidas' },
  { artigo: 'der', substantivo: 'Kaffee', plural: 'die Kaffees', traducao: 'café', categoria: 'Bebidas' },
  { artigo: 'der', substantivo: 'Kräutertee', plural: 'die Kräutertees', traducao: 'chá de ervas', categoria: 'Bebidas' },
  { artigo: 'die', substantivo: 'Milch', plural: 'sem plural', traducao: 'leite', categoria: 'Bebidas' },
  { artigo: 'die', substantivo: 'heiße Schokolade', plural: 'sem plural', traducao: 'chocolate quente', categoria: 'Bebidas' },
  { artigo: 'das', substantivo: 'Brötchen', plural: 'die Brötchen', traducao: 'pãozinho', categoria: 'Pães' },
  { artigo: 'das', substantivo: 'Vollkornbrot', plural: 'die Vollkornbrote', traducao: 'pão integral', categoria: 'Pães' },
  { artigo: 'das', substantivo: 'Weißbrot', plural: 'die Weißbrote', traducao: 'pão branco', categoria: 'Pães' },
  { artigo: 'das', substantivo: 'Toastbrot', plural: 'die Toastbrote', traducao: 'pão de torrada', categoria: 'Pães' },
  { artigo: 'der', substantivo: 'Schinken', plural: 'die Schinken', traducao: 'presunto', categoria: 'Frios e Ovos' },
  { artigo: 'die', substantivo: 'Salami', plural: 'die Salamis', traducao: 'salame', categoria: 'Frios e Ovos' },
  { artigo: 'die', substantivo: 'Leberwurst', plural: 'die Leberwürste', traducao: 'mortadela / patê de fígado', categoria: 'Frios e Ovos' },
  { artigo: 'der', substantivo: 'Lachs', plural: 'die Lachse', traducao: 'salmão', categoria: 'Frios e Ovos' },
  { artigo: 'das', substantivo: 'Ei (gekocht)', plural: 'die Eier', traducao: 'ovo (cozido)', categoria: 'Frios e Ovos' },
  { artigo: 'das', substantivo: 'Rührei', plural: 'die Rühreier', traducao: 'ovo mexido', categoria: 'Frios e Ovos' },
  { artigo: 'der', substantivo: 'Apfel', plural: 'die Äpfel', traducao: 'maçã', categoria: 'Frutas' },
  { artigo: 'die', substantivo: 'Banane', plural: 'die Bananen', traducao: 'banana', categoria: 'Frutas' },
  { artigo: 'die', substantivo: 'Pflaume', plural: 'die Pflaumen', traducao: 'ameixa', categoria: 'Frutas' },
  { artigo: 'die', substantivo: 'Aprikose', plural: 'die Aprikosen', traducao: 'damasco', categoria: 'Frutas' },
  { artigo: 'die', substantivo: 'Birne', plural: 'die Birnen', traducao: 'pera', categoria: 'Frutas' },
  { artigo: 'die', substantivo: 'Weintrauben (Pl.)', plural: 'die Weintrauben', traducao: 'uvas', categoria: 'Frutas' },
  { artigo: 'die', substantivo: 'Butter', plural: 'sem plural', traducao: 'manteiga', categoria: 'Laticínios & Doces' },
  { artigo: 'die', substantivo: 'Margarine', plural: 'sem plural', traducao: 'margarina', categoria: 'Laticínios & Doces' },
  { artigo: 'der', substantivo: 'Frischkäse', plural: 'die Frischkäse', traducao: 'queijo fresco', categoria: 'Laticínios & Doces' },
  { artigo: 'die', substantivo: 'Marmelade', plural: 'die Marmeladen', traducao: 'geleia', categoria: 'Laticínios & Doces' },
  { artigo: 'der', substantivo: 'Honig', plural: 'sem plural', traducao: 'mel', categoria: 'Laticínios & Doces' },
  { artigo: 'der/das', substantivo: 'Joghurt', plural: 'die Joghurts', traducao: 'iogurte (natural ou com frutas)', categoria: 'Laticínios & Doces' },
];

// 2.4 Texto A5 — Das Frühstücksbüfett
export const TEXT_A5_BUFFET_CONTENT = {
  de: `70 % der Menschen möchten im Hotel ein Frühstück in Büfettform. Das Frühstücksbüfett kommt ursprünglich aus Amerika.
Auch Gäste aus Deutschland essen im Hotel gern ein „englisches“ oder „amerikanisches“ Frühstück mit Käse, Schinken, Wurst, Eiern, Tomaten, Obst und Joghurt. Im Gegensatz zu diesem reichhaltigen Angebot besteht ein Frühstück in Deutschland oft nur aus Kaffee oder Tee, Brötchen, Butter und Marmelade.
In vielen Hotels kostet das Frühstück etwa 20 Euro, im Hotel „Adlon“ in Berlin bezahlt man 48 Euro. Doch der Service ist nicht immer gut. Manchmal gibt es auch in teuren Hotels beim Frühstück unfreundliches Personal, kalte Eier oder altes Brot.`,
  pt: `70% das pessoas gostariam de um café da manhã em forma de buffet no hotel. O buffet de café da manhã vem originalmente da América.
Também hóspedes da Alemanha comem no hotel com prazer um café da manhã "inglês" ou "americano" com queijo, presunto, salsicha, ovos, tomates, frutas e iogurte. Em contraste com essa oferta abundante, um café da manhã na Alemanha frequentemente consiste apenas de café ou chá, pãezinhos, manteiga e geleia.
Em muitos hotéis o café da manhã custa cerca de 20 euros, no hotel "Adlon" em Berlim paga-se 48 euros. Mas o serviço nem sempre é bom. Às vezes há também em hotéis caros no café da manhã pessoal antipático, ovos frios ou pão velho.`,
  stats: [
    { label: 'Preferem buffet no hotel', value: '70%' },
    { label: 'Custo médio em hotel padrão', value: 'ca. 20 €' },
    { label: 'Custo no Hotel Adlon (Berlim)', value: '48 €' },
    { label: 'Origem histórica do buffet', value: 'Estados Unidos (Amerika)' },
  ]
};

// 2.7 Louça e Talheres (Texto A10)
export const KITCHEN_ITEMS_DATA = [
  { artigo: 'die', item: 'Tasse', plural: 'die Tassen', traducao: 'xícara' },
  { artigo: 'der', item: 'Suppenteller', plural: 'die Suppenteller', traducao: 'prato de sopa' },
  { artigo: 'das', item: 'Wischtuch', plural: 'die Wischtücher', traducao: 'pano de prato' },
  { artigo: 'die', item: 'Serviette', plural: 'die Servietten', traducao: 'guardanapo' },
  { artigo: 'die', item: 'Gabel', plural: 'die Gabeln', traducao: 'garfo' },
  { artigo: 'das', item: 'Salz', plural: 'sem plural', traducao: 'sal' },
  { artigo: 'das', item: 'Wasserglas', plural: 'die Wassergläser', traducao: 'copo de água' },
  { artigo: 'das', item: 'Weinglas', plural: 'die Weingläser', traducao: 'copo de vinho' },
  { artigo: 'der', item: 'Kaffeelöffel', plural: 'die Kaffeelöffel', traducao: 'colher de café' },
  { artigo: 'das', item: 'Messer', plural: 'die Messer', traducao: 'faca' },
  { artigo: 'das', item: 'Kochbuch', plural: 'die Kochbücher', traducao: 'livro de receitas' },
  { artigo: 'das', item: 'Küchenmesser', plural: 'die Küchenmesser', traducao: 'faca de cozinha' },
  { artigo: 'die', item: 'Pfanne', plural: 'die Pfannen', traducao: 'frigideira' },
  { artigo: 'die', item: 'Schüssel', plural: 'die Schüsseln', traducao: 'tigela' },
  { artigo: 'die', item: 'Espressotassen', plural: 'die Espressotassen', traducao: 'xícaras de espresso' },
  { artigo: 'der', item: 'Teller', plural: 'die Teller', traducao: 'prato' },
  { artigo: 'der', item: 'Löffel', plural: 'die Löffel', traducao: 'colher' },
  { artigo: 'der', item: 'Pfeffer', plural: 'sem plural', traducao: 'pimenta' },
  { artigo: 'der', item: 'Topf', plural: 'die Töpfe', traducao: 'panela' },
];

// 2.9 Folheto do Supermercado (Texto A12)
export const SUPERMARKET_OFFERS_DATA = [
  { item: 'BioBio Joghurt', quantidade: '150 g', preco: '0,29 €', categoria: 'Laticínios' },
  { item: 'Kraft Gouda (8 Scheiben, mild & aromatisch)', quantidade: '125 g', preco: '1,75 €', categoria: 'Laticínios' },
  { item: 'Landbutter', quantidade: '250 g', preco: '1,48 €', categoria: 'Laticínios' },
  { item: 'Schlagsahne', quantidade: '200 g', preco: '0,63 €', categoria: 'Laticínios' },
  { item: 'Quark 20%', quantidade: '250 g', preco: '0,59 €', categoria: 'Laticínios' },
  { item: 'Junge Erbsen (Extra fein)', quantidade: '425 ml', preco: '1,07 €', categoria: 'Legumes e Conservas' },
  { item: 'Kartoffeln (hart kochend)', quantidade: '5 kg', preco: '2,99 €', categoria: 'Legumes e Conservas' },
  { item: 'Grüne Bohnen', quantidade: '425 ml', preco: '0,94 €', categoria: 'Legumes e Conservas' },
  { item: 'Ananasscheiben im eigenen Saft', quantidade: '425 ml', preco: '0,59 €', categoria: 'Frutas e Doces' },
  { item: 'Eszet Vollmilch', quantidade: '75 g', preco: '0,91 €', categoria: 'Doces' },
  { item: 'Wagner Nougatpralinen', quantidade: '200 g', preco: '5,37 €', categoria: 'Doces' },
  { item: 'Haribo Goldbären', quantidade: '250 g', preco: '1,79 €', categoria: 'Doces' },
  { item: 'Schwarzwälder Schinken', quantidade: '100 g', preco: '1,75 €', categoria: 'Carnes e Frios' },
  { item: 'Ungarische Salami', quantidade: '70 g', preco: '1,24 €', categoria: 'Carnes e Frios' },
  { item: 'Saftiges Rindfleisch', quantidade: '1 kg', preco: '18,02 €', categoria: 'Carnes e Frios' },
  { item: 'Hähnchenfilet', quantidade: '500 g', preco: '8,43 €', categoria: 'Carnes e Frios' },
  { item: 'Schweinslende', quantidade: '500 g', preco: '8,34 €', categoria: 'Carnes e Frios' },
  { item: 'Französisches Weißbrot', quantidade: '500 g', preco: '1,19 €', categoria: 'Padaria' },
  { item: 'Bauern Schwarzbrot', quantidade: '500 g', preco: '1,35 €', categoria: 'Padaria' },
  { item: 'Vollkornbrötchen', quantidade: 'Stück', preco: '0,39 €', categoria: 'Padaria' },
  { item: 'Pflaumenkuchen', quantidade: 'Stück', preco: '1,49 €', categoria: 'Padaria' },
  { item: 'Erdbeersahnetorte (ganz)', quantidade: 'ganz', preco: '6,99 €', categoria: 'Padaria' },
  { item: 'Apfelsaft, frisch gepresst', quantidade: '1 l', preco: '1,35 €', categoria: 'Bebidas' },
  { item: 'Paulaner Weißbier Kasten', quantidade: 'Kasten', preco: '17,59 €', categoria: 'Bebidas' },
  { item: 'Moët Champagner', quantidade: '0,75 l', preco: '43,44 €', categoria: 'Bebidas' },
];

// 2.14 Top Ten Lieblingsobst der Deutschen
export const TOP_OBST_DATA = [
  { rank: 1, obst: 'Äpfel', pct: '24,0%', share: 'Líder absoluto de consumo diário' },
  { rank: 2, obst: 'Bananen', pct: '20,0%', share: 'Segunda fruta mais consumida' },
  { rank: 3, obst: 'Erdbeeren', pct: '12,0%', share: 'Fruta preferida na primavera/verão' },
  { rank: 4, obst: 'Weintrauben', pct: '7,3%', share: 'Consumo in natura e mesas de frios' },
  { rank: 5, obst: 'Melonen', pct: '4,3%', share: 'Refrescante no verão alemão' },
  { rank: 6, obst: 'Orangen', pct: '4,0%', share: 'Consumo in natura e sucos' },
  { rank: 7, obst: 'Nektarinen', pct: '3,3%', share: 'Fruta de caroço sazonal' },
  { rank: 8, obst: 'Zitronen / Limetten', pct: '2,4%', share: 'Tempero culinário e coquetéis' },
  { rank: 9, obst: 'Kiwis', pct: '2,2%', share: 'Rica em vitamina C' },
  { rank: 10, obst: 'Ananas', pct: '2,1%', share: 'Consumo fresco e sobremesas' },
];

// 2.15 Receita de Salada de Frutas (Texto A19)
export const OBSTSALAT_RECIPE_DATA = {
  zutaten: [
    '2 Äpfel (duas maçãs)',
    '2 Bananen (duas bananas)',
    '2 Orangen (duas laranjas)',
    '1 Mango (uma manga)',
    '1 Esslöffel Zitronensaft (uma colher de sopa de suco de limão)',
    '1 Esslöffel Zucker (uma colher de sopa de açúcar)',
    '50 g Haselnüsse (50 g de avelãs)',
    '1 Gläschen Cointreau / Likör (um cálice de Cointreau / licor)',
  ],
  schritte: [
    { de: 'Schälen Sie das Obst.', pt: 'Descasque as frutas.', verbo: 'schälen' },
    { de: 'Schneiden Sie die Äpfel, Orangen, Bananen und die Mango in kleine Stücke.', pt: 'Corte as maçãs, laranjas, bananas e a manga em pedaços pequenos.', verbo: 'schneiden' },
    { de: 'Geben Sie die Obststücke in eine Schüssel und vermengen Sie das Obst mit Zucker, Zitronensaft, Haselnüssen und Likör.', pt: 'Coloque os pedaços de fruta em uma tigela e misture as frutas com açúcar, suco de limão, avelãs e licor.', verbo: 'geben / vermengen' },
    { de: 'Guten Appetit!', pt: 'Bom apetite!', verbo: 'expressão fixa' },
  ]
};

// 2.22 Cardápio do Restaurante (Texto A26)
export const SPEISEKARTE_DATA = {
  vorspeisen: [
    { nome: 'Tomatensuppe', preco: '3,90 €', desc: 'Sopa de tomate' },
    { nome: 'Italienische Gemüsesuppe', preco: '4,50 €', desc: 'Sopa de legumes italiana' },
    { nome: 'Gemischter Salat', preco: '3,50 €', desc: 'Salada mista com molho da casa' },
    { nome: 'Roher Schinken mit Melone', preco: '5,50 €', desc: 'Presunto cru com melão fatiado' },
  ],
  fleischgerichte: [
    { nome: 'Schweinebraten mit Sauerkraut', preco: '8,75 €', desc: 'Assado de porco tradicional com chucrute' },
    { nome: 'Wiener Schnitzel mit Blumenkohl', preco: '12,00 €', desc: 'Escalope empanado vienense com couve-flor' },
    { nome: 'Rindergulasch mit grünen Bohnen', preco: '10,50 €', desc: 'Goulash de carne bovina com vagem' },
  ],
  fischgerichte: [
    { nome: 'Forelle im Weißwein', preco: '15,50 €', desc: 'Truta ao vinho branco' },
    { nome: 'Steinbutt mit Gemüse', preco: '18,90 €', desc: 'Linguado / pregado com legumes da estação' },
    { nome: 'Lachs in Knoblauch', preco: '13,90 €', desc: 'Filé de salmão ao alho dourado' },
  ],
  nachspeisen: [
    { nome: 'Frischer Obstsalat', preco: '3,90 €', desc: 'Salada de frutas fresca' },
    { nome: 'Frische Erdbeeren mit Sahne', preco: '4,50 €', desc: 'Morangos frescos com chantilly' },
    { nome: 'Apfelkuchen', preco: '2,75 €', desc: 'Bolo de maçã caseiro' },
    { nome: 'Käseauswahl', preco: '3,75 €', desc: 'Seleção especial de queijos' },
  ],
  getraenke: [
    { nome: 'Kaffee', preco: '2,50 €' },
    { nome: 'Cappuccino', preco: '2,75 €' },
    { nome: 'Espresso', preco: '2,25 €' },
    { nome: 'Tee', preco: '2,25 €' },
    { nome: 'Mineralwasser', preco: '1,75 €' },
    { nome: 'Frischer Orangensaft', preco: '3,25 €' },
    { nome: 'Cola', preco: '1,75 €' },
    { nome: 'Limonade', preco: '1,75 €' },
  ]
};

// 2.25 Diálogo Completo no Restaurante (Texto A29)
export const TEXT_A29_DIALOGUE = [
  { speaker: 'Kellner', de: 'Guten Tag.', pt: 'Bom dia.' },
  { speaker: 'Andreas', de: 'Guten Tag.', pt: 'Bom dia.' },
  { speaker: 'Kellner', de: 'Einen Tisch für zwei Personen?', pt: 'Uma mesa para duas pessoas?' },
  { speaker: 'Andreas', de: 'Ja, bitte.', pt: 'Sim, por favor.' },
  { speaker: 'Kellner', de: 'Hier ist die Speisekarte. Möchten Sie schon etwas trinken?', pt: 'Aqui está o cardápio. Vocês gostariam de beber algo já?' },
  { speaker: 'Andreas', de: 'Ja, bitte. Ich hätte gern ein Mineralwasser.', pt: 'Sim, por favor. Eu gostaria de uma água mineral.' },
  { speaker: 'Beate', de: 'Ich nehme ein Glas Weißwein.', pt: 'Eu pego um copo de vinho branco.' },
  { speaker: 'Kellner', de: 'Die Getränke kommen sofort.', pt: 'As bebidas vêm imediatamente.' },
  { speaker: 'Beate', de: 'Was nimmst du?', pt: 'O que você pega?' },
  { speaker: 'Andreas', de: 'Hm, die Auswahl ist schwer. Der Fisch ist hier sehr gut. Ich glaube, ich nehme den Lachs. Und du?', pt: 'Hm, a escolha é difícil. O peixe é muito bom aqui. Eu acho que vou pedir o salmão. E você?' },
  { speaker: 'Beate', de: 'Ich weiß nicht. Vielleicht esse ich das Schnitzel oder auch Lachs. Ich esse sehr gern Fisch. Letztes Jahr waren wir in Italien, in Rom! Dort gibt es ein ausgezeichnetes Fisch-Restaurant! Ich glaube, es heißt „Sardine“.', pt: 'Não sei. Talvez eu coma o schnitzel ou também salmão. Eu gosto muito de peixe. Ano passado estivemos na Itália, em Roma! Lá há um excelente restaurante de peixe! Acho que se chama "Sardine".' },
  { speaker: 'Andreas', de: 'Wir waren letztes Jahr in Japan. In Japan isst man den Fisch oft roh.', pt: 'Nós estivemos ano passado no Japão. No Japão come-se frequentemente peixe cru.' },
  { speaker: 'Beate', de: 'Roh! Schmeckt das?', pt: 'Cru! Isso é gostoso?' },
  { speaker: 'Andreas', de: 'Ja, es schmeckt gut und ist auch gesund. Wir hatten Glück. Mein Sohn studiert in Japan. Wir waren zusammen in einem sehr guten Restaurant.', pt: 'Sim, tem um sabor bom e também é saudável. Tivemos sorte. Meu filho estuda no Japão. Estivemos juntos em um restaurante muito bom.' },
  { speaker: 'Beate', de: 'Ich war noch nie in Japan ...', pt: 'Eu nunca estive no Japão ...' },
  { speaker: 'Kellner', de: 'Hier sind Ihre Getränke.', pt: 'Aqui estão suas bebidas.' },
  { speaker: 'Andreas', de: 'Danke sehr. Ich nehme den Lachs.', pt: 'Muito obrigado. Eu fico com o salmão.' },
  { speaker: 'Beate', de: 'Ich auch.', pt: 'Eu também.' },
  { speaker: 'Kellner', de: 'Also: Zweimal den Lachs ...', pt: 'Então: duas vezes o salmão ...' },
  { speaker: 'Andreas', de: 'Ja, bitte ...', pt: 'Sim, por favor ...' },
  { speaker: 'Kellner', de: 'Zweimal Lachs für Sie ...', pt: 'Dois salmões para os senhores ...' },
  { speaker: 'Andreas', de: 'Danke.', pt: 'Obrigado.' },
  { speaker: 'Beate', de: 'Danke sehr. Guten Appetit!', pt: 'Muito obrigada. Bom apetite!' },
  { speaker: 'Andreas', de: 'Danke, gleichfalls.', pt: 'Obrigado, igualmente.' },
  { speaker: 'Kellner', de: 'Wie war das Essen?', pt: 'Como estava a refeição?' },
  { speaker: 'Andreas', de: 'Danke, sehr gut. Ich möchte bitte zahlen.', pt: 'Obrigado, muito boa. Eu gostaria de pagar, por favor.' },
  { speaker: 'Kellner', de: 'Das waren: zweimal Lachs, ein Glas Wein, ein Mineralwasser ... Macht zusammen 37,50 Euro. Herzlichen Dank.', pt: 'Foram: dois salmões, uma taça de vinho, uma água mineral ... Dá um total de 37,50 euros. Muito obrigado.' },
];

// 2.28 Tabela Lexical Primária (30 Termos)
export interface LexicalTerm {
  word: string;
  classe: string;
  plural: string;
  traducao: string;
  fraseModelo: string;
}

export const PRIMARY_LEXICON_W2L09_DATA: LexicalTerm[] = [
  { word: 'das Frühstück', classe: 'Subst. neutro', plural: 'die Frühstücke', traducao: 'café da manhã', fraseModelo: 'Was nimmst du zum Frühstück?' },
  { word: 'das Mittagessen', classe: 'Subst. neutro', plural: 'die Mittagessen', traducao: 'almoço', fraseModelo: 'Die Hauptmahlzeit ist das Mittagessen.' },
  { word: 'das Abendbrot', classe: 'Subst. neutro', plural: 'die Abendbrote', traducao: 'jantar tradicional', fraseModelo: 'Zum Abendbrot isst man Brot mit Käse.' },
  { word: 'das Brötchen', classe: 'Subst. neutro', plural: 'die Brötchen', traducao: 'pãozinho', fraseModelo: 'Ich esse zwei Brötchen mit Käse.' },
  { word: 'das Vollkornbrot', classe: 'Subst. neutro', plural: 'die Vollkornbrote', traducao: 'pão integral', fraseModelo: 'Essen Sie viel Vollkornbrot.' },
  { word: 'das Weißbrot', classe: 'Subst. neutro', plural: 'die Weißbrote', traducao: 'pão branco', fraseModelo: 'Essen Sie wenig Weißbrot.' },
  { word: 'das Toastbrot', classe: 'Subst. neutro', plural: 'die Toastbrote', traducao: 'pão de torrada', fraseModelo: 'Zwei Scheiben Toastbrot bitte.' },
  { word: 'der Schinken', classe: 'Subst. masc.', plural: 'die Schinken', traducao: 'presunto', fraseModelo: 'Ich esse Brötchen mit Schinken.' },
  { word: 'die Salami', classe: 'Subst. fem.', plural: 'die Salamis', traducao: 'salame', fraseModelo: 'Die Salami ist ungarisch.' },
  { word: 'die Leberwurst', classe: 'Subst. fem.', plural: 'die Leberwürste', traducao: 'patê de fígado / mortadela', fraseModelo: 'Die Leberwurst ist aus Fleisch.' },
  { word: 'der Lachs', classe: 'Subst. masc.', plural: 'die Lachse', traducao: 'salmão', fraseModelo: 'Ich nehme den Lachs.' },
  { word: 'das Ei', classe: 'Subst. neutro', plural: 'die Eier', traducao: 'ovo', fraseModelo: 'Ein gekochtes Ei bitte.' },
  { word: 'das Rührei', classe: 'Subst. neutro', plural: 'die Rühreier', traducao: 'ovo mexido', fraseModelo: 'Zwei Rühreier zum Frühstück.' },
  { word: 'der Apfel', classe: 'Subst. masc.', plural: 'die Äpfel', traducao: 'maçã', fraseModelo: 'Ich esse einen Apfel.' },
  { word: 'die Banane', classe: 'Subst. fem.', plural: 'die Bananen', traducao: 'banana', fraseModelo: 'Ich esse eine Banane.' },
  { word: 'die Pflaume', classe: 'Subst. fem.', plural: 'die Pflaumen', traducao: 'ameixa', fraseModelo: 'Pflaumenkuchen ist lecker.' },
  { word: 'die Aprikose', classe: 'Subst. fem.', plural: 'die Aprikosen', traducao: 'damasco', fraseModelo: 'Aprikosen sind süß.' },
  { word: 'die Birne', classe: 'Subst. fem.', plural: 'die Birnen', traducao: 'pera', fraseModelo: 'Die Birne ist weich.' },
  { word: 'die Weintrauben (Pl.)', classe: 'Subst. fem. pl.', plural: 'die Weintrauben', traducao: 'uvas', fraseModelo: 'Weintrauben sind sehr beliebt.' },
  { word: 'die Butter', classe: 'Subst. fem.', plural: 'sem plural', traducao: 'manteiga', fraseModelo: 'Butter und Marmelade aufs Brot.' },
  { word: 'die Margarine', classe: 'Subst. fem.', plural: 'sem plural', traducao: 'margarina', fraseModelo: 'Margarine ist pflanzlich.' },
  { word: 'der Frischkäse', classe: 'Subst. masc.', plural: 'die Frischkäse', traducao: 'queijo fresco', fraseModelo: 'Frischkäse schmeckt cremig.' },
  { word: 'die Marmelade', classe: 'Subst. fem.', plural: 'die Marmeladen', traducao: 'geleia', fraseModelo: 'Marmelade aufs Brötchen.' },
  { word: 'der Honig', classe: 'Subst. masc.', plural: 'sem plural', traducao: 'mel', fraseModelo: 'Honig ist süß und gesund.' },
  { word: 'der Joghurt', classe: 'Subst. masc./neutro', plural: 'die Joghurts', traducao: 'iogurte', fraseModelo: 'Joghurt mit frischen Früchten.' },
  { word: 'der Orangensaft', classe: 'Subst. masc.', plural: 'die Orangensäfte', traducao: 'suco de laranja', fraseModelo: 'Ein Glas Orangensaft bitte.' },
  { word: 'der Kaffee', classe: 'Subst. masc.', plural: 'die Kaffees', traducao: 'café', fraseModelo: 'Eine Tasse Kaffee am Morgen.' },
  { word: 'der Kräutertee', classe: 'Subst. masc.', plural: 'die Kräutertees', traducao: 'chá de ervas', fraseModelo: 'Ich möchte einen Kräutertee.' },
  { word: 'die Milch', classe: 'Subst. fem.', plural: 'sem plural', traducao: 'leite', fraseModelo: 'Trinkst du gern kalte Milch?' },
  { word: 'die heiße Schokolade', classe: 'Subst. fem.', plural: 'sem plural', traducao: 'chocolate quente', fraseModelo: 'Die heiße Schokolade wärmt.' },
];

// 2.29 Registro Coloquial e Autêntico (Umgangssprache)
export const UMGANGSSPRACHE_W2L09_DATA = [
  { exp: 'Guten Appetit!', trad: 'Bom apetite!', ctx: 'Desejo formal e familiar ao iniciar qualquer refeição.' },
  { exp: 'Prost!', trad: 'Saúde! / Tim-tim!', ctx: 'Brinde clássico ao beber cerveja entre amigos.' },
  { exp: 'Zum Wohl!', trad: 'À sua saúde!', ctx: 'Brinde mais refinado, tradicionalmente ao degustar vinho.' },
  { exp: 'Mahlzeit!', trad: 'Bom almoço! / Bom apetite!', ctx: 'Cumprimento corporativo e informal no horário de almoço.' },
  { exp: 'Ich habe Hunger.', trad: 'Estou com fome.', ctx: 'Expressão básica de apetite (com substantivo direto).' },
  { exp: 'Ich habe Durst.', trad: 'Estou com sede.', ctx: 'Expressão básica de sede.' },
  { exp: 'Das schmeckt lecker!', trad: 'Isso está uma delícia!', ctx: 'Elogio espontâneo e caloroso à comida.' },
  { exp: 'Das schmeckt schrecklich!', trad: 'Isso está horrível!', ctx: 'Crítica direta ao sabor de um prato.' },
  { exp: 'Ich bin satt.', trad: 'Estou satisfeito / Não aguento mais.', ctx: 'Declaração polida de que já comeu o suficiente.' },
  { exp: 'Die Rechnung bitte!', trad: 'A conta, por favor!', ctx: 'Solicitação padrão ao garçom no restaurante.' },
  { exp: 'Ich möchte zahlen / bezahlen.', trad: 'Gostaria de pagar.', ctx: 'Aviso polido de encerramento da conta.' },
  { exp: 'Stimmt so!', trad: 'Está certo assim! (pode ficar com o troco)', ctx: 'Fórmula comum alemã para dar gorjeta ao garçom.' },
  { exp: 'Lass es dir schmecken!', trad: 'Aproveite a comida! / Bom apetite!', ctx: 'Forma informal e afetuosa para amigos ou familiares.' },
  { exp: 'Ich könnte platzen!', trad: 'Estou estourando de tão cheio!', ctx: 'Expressão bem-humorada de saciedade extrema.' },
  { exp: 'Ich habe einen Bärenhunger.', trad: 'Estou com uma fome de leão / de urso!', ctx: 'Expressão idiomática de muita fome.' },
  { exp: 'Das Wasser läuft mir im Mund zusammen.', trad: 'Fiquei com água na boca!', ctx: 'Reação ao ver ou cheirar comida apetitosa.' },
  { exp: 'Es ist angerichtet.', trad: 'Está servido!', ctx: 'Aviso solene ou refinado de que a refeição está na mesa.' },
  { exp: 'Gleichfalls!', trad: 'Igualmente! / Para você também!', ctx: 'Resposta padrão a cumprimentos como Guten Appetit.' },
];

// 3.15 e 3.16 Tradução Reversa de Blindagem (10 Frases)
export interface ReverseTranslationItem {
  id: number;
  pt: string;
  de: string;
  grammarFocus: string;
  explicacao: string;
}

export const REVERSE_TRANSLATION_W2L09_DATA: ReverseTranslationItem[] = [
  {
    id: 1,
    pt: 'Eu gosto de café. Você gosta de chá?',
    de: 'Ich mag Kaffee. Magst du Tee?',
    grammarFocus: 'Conjugação de mögen (1ª sg: mag | 2ª sg: magst) + substantivo sem artigo',
    explicacao: 'O verbo mögen expressa preferência geral. O radical muda de ö para a nas pessoas do singular (ich mag, du magst).'
  },
  {
    id: 2,
    pt: 'Eu gostaria de uma xícara de café, por favor.',
    de: 'Ich möchte eine Tasse Kaffee, bitte.',
    grammarFocus: 'Verbo modal de cortesia möchten + Acusativo feminino (eine Tasse)',
    explicacao: 'Em pedidos e no restaurante, usa-se möchten (desejo polido) em vez de mögen. "Eine Tasse Kaffee" não leva preposição entre a xícara e a bebida.'
  },
  {
    id: 3,
    pt: 'O que você pega no café da manhã? — Eu pego um pãozinho com queijo.',
    de: 'Was nimmst du zum Frühstück? — Ich nehme ein Brötchen mit Käse.',
    grammarFocus: 'Verbo irregular nehmen (du nimmst / ich nehme) + zum Frühstück (Dativ)',
    explicacao: 'O verbo nehmen troca e por i na 2ª pessoa do singular (du nimmst). "Zum Frühstück" é a contração padrão de zu + dem.'
  },
  {
    id: 4,
    pt: 'Eu como uma maçã. Você come uma banana?',
    de: 'Ich esse einen Apfel. Isst du eine Banane?',
    grammarFocus: 'Verbo essen (ich esse / du isst) + Acusativo masculino (einen Apfel) e feminino (eine Banane)',
    explicacao: 'Essen sofre alternância vocálica (du isst). O substantivo der Apfel vai para o acusativo masculino einen Apfel.'
  },
  {
    id: 5,
    pt: 'Eu bebo um copo de suco de laranja.',
    de: 'Ich trinke ein Glas Orangensaft.',
    grammarFocus: 'Verbo trinken + Acusativo neutro (ein Glas) + especificação da bebida',
    explicacao: 'Das Glas é neutro (ein Glas). O nome da bebida Orangensaft é justaposto diretamente sem preposição de/von.'
  },
  {
    id: 6,
    pt: 'Eu estive no ano passado na Itália. Lá come-se muito peixe.',
    de: 'Ich war letztes Jahr in Italien. Dort isst man viel Fisch.',
    grammarFocus: 'Präteritum de sein (ich war) + sujeito impessoal man (man isst)',
    explicacao: 'O Präteritum de sein (war) é o tempo verbal preferido mesmo na fala. O pronome impessoal man conjuga o verbo sempre na 3ª pessoa do singular.'
  },
  {
    id: 7,
    pt: 'Nós estávamos em Roma. Nós tínhamos sorte.',
    de: 'Wir waren in Rom. Wir hatten Glück.',
    grammarFocus: 'Präteritum de sein (wir waren) e de haben (wir hatten)',
    explicacao: 'Tanto waren quanto hatten dispensam o Perfekt no uso oral cotidiano. Ter sorte é expressado pela locução fixa Glück haben.'
  },
  {
    id: 8,
    pt: 'Como está o sabor da salada? — Está excelente!',
    de: 'Wie schmeckt der Salat? — Er schmeckt ausgezeichnet!',
    grammarFocus: 'Verbo de regência sensorial schmecken + pronome de substituição no nominativo (er)',
    explicacao: 'Como der Salat é masculino, a resposta retoma o prato com o pronome sujeito correspondente er (Er schmeckt...).'
  },
  {
    id: 9,
    pt: 'A conta, por favor! — Dá 37,50 euros.',
    de: 'Die Rechnung bitte! — Das macht 37,50 Euro.',
    grammarFocus: 'Fórmula de restaurante (Die Rechnung bitte) + verbo machen indicando soma total',
    explicacao: 'O verbo machen na 3ª pessoa do singular (Das macht...) é a expressão padrão do comércio para o total da conta.'
  },
  {
    id: 10,
    pt: 'Bom apetite! — Obrigado, igualmente.',
    de: 'Guten Appetit! — Danke, gleichfalls.',
    grammarFocus: 'Cumprimento ritual à mesa + advérbio de reciprocidade gleichfalls',
    explicacao: 'Guten Appetit! é a fórmula canônica antes da primeira garfada; a resposta cortês recíproca é Danke, gleichfalls! (ou ebenfalls!).'
  },
];

// 3.17 Resumo dos 15 Pontos-Chave do Dia 009
export const MASTER_SUMMARY_W2L09_DATA = [
  { conceito: 'Modalverb mögen', regra: 'Conjugação: ich mag, du magst, er mag, wir mögen, ihr mögt, sie/Sie mögen. Mudança de radical ö → a no singular.' },
  { conceito: 'mögen vs. möchten', regra: 'mögen = preferência/afeição duradoura ("Ich mag Kaffee"). möchten = desejo polido circunstancial ("Ich möchte einen Kaffee").' },
  { conceito: 'Negação de mögen', regra: 'Com substantivos: kein/keinen/keine ("Ich mag kein Fleisch"). Com ações/verbos: nicht gern ("Ich mag nicht gern kochen").' },
  { conceito: 'Präteritum de sein', regra: 'ich war, du warst, er war, wir waren, ihr wart, sie/Sie waren. Tempo verbal de alta frequência no alemão oral.' },
  { conceito: 'Präteritum de haben', regra: 'ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie/Sie hatten. Uso predominante no passado simples.' },
  { conceito: 'As 5 Famílias do Plural', regra: 'Família 1 (-e), Família 2 (-er), Família 3 (-(e)n), Família 4 (-s), Família 5 (— sem terminação).' },
  { conceito: 'Acusativo de Alimentos', regra: 'Masculino: einen Apfel, keinen Schinken. Feminino: eine Banane. Neutro: ein Brötchen. Plural: keine Pommes.' },
  { conceito: 'Verbo nehmen com Alimentos', regra: 'Alternância e → i: du nimmst, er nimmt. "Ich nehme ein Brötchen mit Käse."' },
  { conceito: 'Verbo essen com Alimentos', regra: 'Alternância e → i: du isst, er isst. "Ich esse einen Salat."' },
  { conceito: 'Verbo trinken', regra: 'Regular: ich trinke, du trinkst, er trinkt. "Er trinkt ein Glas Wasser."' },
  { conceito: 'Vocabulário da Cozinha', regra: 'Artigos essenciais: die Tasse, der Teller, das Messer, die Gabel, der Löffel, der Topf, die Pfanne.' },
  { conceito: 'Cardápio (Speisekarte)', regra: 'Vorspeisen (entradas), Hauptgerichte (pratos principais), Nachspeisen (sobremesas), Getränke (bebidas).' },
  { conceito: 'Redemittel no Restaurante', regra: '"Ich hätte gern...", "Ich nehme...", "Wie schmeckt...?", "Die Rechnung bitte!", "Das macht 37,50 Euro."' },
  { conceito: 'Cultura Alimentar Alemã', regra: 'Frühstück (pão com queijo/geleia), Mittagessen (refeição quente entre 12h e 14h), Abendbrot (pão com frios).' },
  { conceito: 'Bebidas Populares', regra: 'Café (nº 1), Água mineral (líder em refrescos), Cerveja, Vinho, Weinschorle e Apfelwein regional.' },
];
