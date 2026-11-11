export interface LessonMetadata {
  lessonNumber: number;
  round: string;
  day: string;
  chapter: string;
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  totalTerms: number;
  totalGrammarSections: number;
  totalExercises: number;
}

export const LESSON_09_METADATA: LessonMetadata = {
  lessonNumber: 9,
  round: 'Rodada Extra 09',
  day: 'Aula Extra 5',
  chapter: 'Os Verbos de Mudança Vocálica e Irregulares do Presente',
  title: 'Os 18 Verbos Especiais do Presente: waschen, lassen, fangen, raten, halten, nehmen, treffen, essen, vergessen, helfen, werfen, sterben, wissen, mögen, reden, warten, baden, bilden',
  subtitle: 'Alternância vocálica a → ä e e → i/ie na 2ª e 3ª pessoas, verbos irregulares e modais (wissen, mögen), regras de sibilantes e duplicação consonantal, 5 diálogos temáticos, 30 termos lexicais, 28 expressões idiomáticas e 6 exercícios comentados.',
  duration: '180 Minutos (Blocos 1, 2 e 3)',
  level: 'Nível A1–A2 (Morfologia Verbal e Domínio da Comunicação)',
  totalTerms: 30,
  totalGrammarSections: 4,
  totalExercises: 6,
};

// ==========================================
// BLOCO 1: ANATOMIA GRAMATICAL PURA
// ==========================================

export interface VerbConjugationFull {
  infinitive: string;
  translation: string;
  group: 'Grupo 1 (a → ä)' | 'Grupo 2 (e → i)' | 'Grupo 3 (Irregulares / Modais / Especiais)';
  ich: string;
  du: string;
  erSieEs: string;
  wir: string;
  ihr: string;
  sieSie: string;
  imperative: string;
  vowelChange?: string;
  specialNotes?: string;
}

export interface VerbExample {
  verbo: string;
  fraseDe: string;
  frasePt: string;
  contexto: string;
}

export interface VerbExpression {
  expressaoDe: string;
  expressaoPt: string;
  contexto: string;
}

// 1.1 Visão Geral dos 3 Grupos
export const OVERVIEW_GROUPS = [
  {
    grupo: 'Grupo 1',
    caracteristica: 'Verbos com alternância vocálica a → ä',
    verbos: 'waschen, lassen, fangen, raten, halten',
    regra: 'Ocorre apenas na 2ª pessoa (du) e 3ª pessoa do singular (er/sie/es/man). Nas demais pessoas o radical mantém "a".',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    grupo: 'Grupo 2',
    caracteristica: 'Verbos com alternância vocálica e → i / ie',
    verbos: 'nehmen, treffen, essen, vergessen, helfen, werfen, sterben',
    regra: 'Ocorre apenas na 2ª pessoa (du) e 3ª pessoa do singular. Atenção a sibilantes (du isst / er isst) e duplicação consonantal (du nimmst / er nimmt).',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    grupo: 'Grupo 3',
    caracteristica: 'Verbos irregulares, modais e com -e- epentético',
    verbos: 'wissen, mögen, reden, warten, baden, bilden',
    regra: 'wissen e mögen têm 1ª e 3ª pessoas singulares idênticas (ich weiß/er weiß; ich mag/er mag). reden, warten, baden, bilden inserem -e- antes de -st e -t.',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  },
];

// 1.2 GRUPO 1: a → ä
export const GROUP_1_VERBS: VerbConjugationFull[] = [
  {
    infinitive: 'waschen',
    translation: 'lavar',
    group: 'Grupo 1 (a → ä)',
    ich: 'wasche',
    du: 'wäschst',
    erSieEs: 'wäscht',
    wir: 'waschen',
    ihr: 'wascht',
    sieSie: 'waschen',
    imperative: 'wasch!',
    vowelChange: 'a → ä',
    specialNotes: 'Radical termina em -sch. Du wäschst, er wäscht.',
  },
  {
    infinitive: 'lassen',
    translation: 'deixar / permitir',
    group: 'Grupo 1 (a → ä)',
    ich: 'lasse',
    du: 'lässt',
    erSieEs: 'lässt',
    wir: 'lassen',
    ihr: 'lasst',
    sieSie: 'lassen',
    imperative: 'lass!',
    vowelChange: 'a → ä',
    specialNotes: 'Radical em -ss: du lässt e er lässt são idênticos.',
  },
  {
    infinitive: 'fangen',
    translation: 'pegar / capturar',
    group: 'Grupo 1 (a → ä)',
    ich: 'fange',
    du: 'fängst',
    erSieEs: 'fängt',
    wir: 'fangen',
    ihr: 'fangt',
    sieSie: 'fangen',
    imperative: 'fang!',
    vowelChange: 'a → ä',
    specialNotes: 'Frequentemente usado como verbo separável: anfangen (começar).',
  },
  {
    infinitive: 'raten',
    translation: 'aconselhar / adivinhar',
    group: 'Grupo 1 (a → ä)',
    ich: 'rate',
    du: 'rätst',
    erSieEs: 'rät',
    wir: 'raten',
    ihr: 'ratet',
    sieSie: 'raten',
    imperative: 'rat!',
    vowelChange: 'a → ä',
    specialNotes: 'Radical termina em -t: na 3ª pessoa não adiciona -et, apenas "rät".',
  },
  {
    infinitive: 'halten',
    translation: 'parar / segurar / achar',
    group: 'Grupo 1 (a → ä)',
    ich: 'halte',
    du: 'hältst',
    erSieEs: 'hält',
    wir: 'halten',
    ihr: 'haltet',
    sieSie: 'halten',
    imperative: 'halt!',
    vowelChange: 'a → ä',
    specialNotes: 'Radical termina em -t: 3ª pessoa é "hält". Expressão: halten von + Dativo (achar de algo).',
  },
];

export const GROUP_1_EXAMPLES: VerbExample[] = [
  { verbo: 'waschen', fraseDe: 'Ich wasche meine Hände.', frasePt: 'Lavo minhas mãos.', contexto: 'Rotina diária' },
  { verbo: 'waschen', fraseDe: 'Wäschst du dir die Haare?', frasePt: 'Você lava o cabelo?', contexto: 'Pergunta informal' },
  { verbo: 'waschen', fraseDe: 'Er wäscht das Auto.', frasePt: 'Ele lava o carro.', contexto: 'Tarefa doméstica' },
  { verbo: 'lassen', fraseDe: 'Ich lasse das Fenster offen.', frasePt: 'Deixo a janela aberta.', contexto: 'Estado' },
  { verbo: 'lassen', fraseDe: 'Lässt du mich in Ruhe?', frasePt: 'Você me deixa em paz?', contexto: 'Frase emocional' },
  { verbo: 'lassen', fraseDe: 'Er lässt sich die Haare schneiden.', frasePt: 'Ele corta o cabelo (deixa cortar).', contexto: 'Rotina' },
  { verbo: 'fangen', fraseDe: 'Ich fange den Ball.', frasePt: 'Pego a bola.', contexto: 'Esporte' },
  { verbo: 'fangen', fraseDe: 'Fängst du den Fisch?', frasePt: 'Você pega o peixe?', contexto: 'Pesca' },
  { verbo: 'fangen', fraseDe: 'Er fängt den Dieb.', frasePt: 'Ele pega o ladrão.', contexto: 'Polícia' },
  { verbo: 'raten', fraseDe: 'Ich rate dir, das nicht zu tun.', frasePt: 'Aconselho você a não fazer isso.', contexto: 'Conselho' },
  { verbo: 'raten', fraseDe: 'Rätst du mir das?', frasePt: 'Você me aconselha isso?', contexto: 'Pergunta' },
  { verbo: 'raten', fraseDe: 'Er rät mir, zum Arzt zu gehen.', frasePt: 'Ele me aconselha a ir ao médico.', contexto: 'Saúde' },
  { verbo: 'halten', fraseDe: 'Ich halte den Bus.', frasePt: 'Paro o ônibus.', contexto: 'Transporte' },
  { verbo: 'halten', fraseDe: 'Hältst du das für richtig?', frasePt: 'Você acha isso correto?', contexto: 'Opinião' },
  { verbo: 'halten', fraseDe: 'Der Zug hält in Berlin.', frasePt: 'O trem para em Berlim.', contexto: 'Viagem' },
];

export const GROUP_1_EXPRESSIONS: VerbExpression[] = [
  { expressaoDe: 'Halt den Mund!', expressaoPt: 'Cala a boca!', contexto: 'Informal / Agressivo' },
  { expressaoDe: 'Lass mich in Ruhe!', expressaoPt: 'Deixa-me em paz!', contexto: 'Emocional' },
  { expressaoDe: 'Was hältst du davon?', expressaoPt: 'O que você acha disso?', contexto: 'Opinião' },
  { expressaoDe: 'Ich rate dir gut.', expressaoPt: 'Eu te aconselho bem.', contexto: 'Conselho' },
  { expressaoDe: 'Das wäscht sich nicht von selbst.', expressaoPt: 'Isso não se lava sozinho.', contexto: 'Tarefa doméstica' },
  { expressaoDe: 'Ich fange an.', expressaoPt: 'Eu começo.', contexto: 'Início de ação' },
];

// 1.3 GRUPO 2: e → i
export const GROUP_2_VERBS: VerbConjugationFull[] = [
  {
    infinitive: 'nehmen',
    translation: 'pegar / tomar',
    group: 'Grupo 2 (e → i)',
    ich: 'nehme',
    du: 'nimmst',
    erSieEs: 'nimmt',
    wir: 'nehmen',
    ihr: 'nehmt',
    sieSie: 'nehmen',
    imperative: 'nimm!',
    vowelChange: 'e → i (dobra m: nimm-)',
    specialNotes: 'Atenção máxima: o radical dobra o m para "nimmst" e "nimmt".',
  },
  {
    infinitive: 'treffen',
    translation: 'encontrar / acertar',
    group: 'Grupo 2 (e → i)',
    ich: 'treffe',
    du: 'triffst',
    erSieEs: 'trifft',
    wir: 'treffen',
    ihr: 'trefft',
    sieSie: 'treffen',
    imperative: 'triff!',
    vowelChange: 'e → i',
    specialNotes: 'Reflexivo: sich treffen mit + Dativo (encontrar-se com).',
  },
  {
    infinitive: 'essen',
    translation: 'comer',
    group: 'Grupo 2 (e → i)',
    ich: 'esse',
    du: 'isst',
    erSieEs: 'isst',
    wir: 'essen',
    ihr: 'esst',
    sieSie: 'essen',
    imperative: 'iss!',
    vowelChange: 'e → i',
    specialNotes: 'Devido ao radical em -ss, 2ª e 3ª pessoas são idênticas: du isst, er isst.',
  },
  {
    infinitive: 'vergessen',
    translation: 'esquecer',
    group: 'Grupo 2 (e → i)',
    ich: 'vergesse',
    du: 'vergisst',
    erSieEs: 'vergisst',
    wir: 'vergessen',
    ihr: 'vergesst',
    sieSie: 'vergessen',
    imperative: 'vergiss!',
    vowelChange: 'e → i',
    specialNotes: 'Radical em -ss: 2ª e 3ª pessoas idênticas: du vergisst, er vergisst.',
  },
  {
    infinitive: 'helfen',
    translation: 'ajudar',
    group: 'Grupo 2 (e → i)',
    ich: 'helfe',
    du: 'hilfst',
    erSieEs: 'hilft',
    wir: 'helfen',
    ihr: 'helft',
    sieSie: 'helfen',
    imperative: 'hilf!',
    vowelChange: 'e → i',
    specialNotes: 'Exige objeto no Dativo! Ich helfe dir (não "dich").',
  },
  {
    infinitive: 'werfen',
    translation: 'jogar / atirar',
    group: 'Grupo 2 (e → i)',
    ich: 'werfe',
    du: 'wirfst',
    erSieEs: 'wirft',
    wir: 'werfen',
    ihr: 'werft',
    sieSie: 'werfen',
    imperative: 'wirf!',
    vowelChange: 'e → i',
    specialNotes: 'Frequentemente com advérbio separável: wegwerfen (jogar fora).',
  },
  {
    infinitive: 'sterben',
    translation: 'morrer',
    group: 'Grupo 2 (e → i)',
    ich: 'sterbe',
    du: 'stirbst',
    erSieEs: 'stirbt',
    wir: 'sterben',
    ihr: 'sterbt',
    sieSie: 'sterben',
    imperative: 'stirb!',
    vowelChange: 'e → i',
    specialNotes: 'Regência: sterben an + Dativo (morrer de uma doença).',
  },
];

export const GROUP_2_EXAMPLES: VerbExample[] = [
  { verbo: 'nehmen', fraseDe: 'Ich nehme den Bus.', frasePt: 'Pego o ônibus.', contexto: 'Transporte' },
  { verbo: 'nehmen', fraseDe: 'Nimmst du mich mit?', frasePt: 'Você me leva?', contexto: 'Carona' },
  { verbo: 'nehmen', fraseDe: 'Er nimmt das Buch.', frasePt: 'Ele pega o livro.', contexto: 'Ação' },
  { verbo: 'nehmen', fraseDe: 'Nimm dir ein Stück Kuchen!', frasePt: 'Pegue um pedaço de bolo!', contexto: 'Imperativo' },
  { verbo: 'treffen', fraseDe: 'Ich treffe meine Freunde.', frasePt: 'Encontro meus amigos.', contexto: 'Social' },
  { verbo: 'treffen', fraseDe: 'Triffst du sie heute?', frasePt: 'Você a encontra hoje?', contexto: 'Pergunta' },
  { verbo: 'treffen', fraseDe: 'Er trifft eine Entscheidung.', frasePt: 'Ele toma uma decisão.', contexto: 'Decisão' },
  { verbo: 'treffen', fraseDe: 'Wir treffen uns um 8.', frasePt: 'Encontramo-nos às 8.', contexto: 'Encontro' },
  { verbo: 'essen', fraseDe: 'Ich esse einen Apfel.', frasePt: 'Como uma maçã.', contexto: 'Comida' },
  { verbo: 'essen', fraseDe: 'Isst du Fleisch?', frasePt: 'Você come carne?', contexto: 'Dieta' },
  { verbo: 'essen', fraseDe: 'Er isst zu viel.', frasePt: 'Ele come demais.', contexto: 'Hábito' },
  { verbo: 'essen', fraseDe: 'Iss dein Gemüse!', frasePt: 'Come teu legume!', contexto: 'Imperativo' },
  { verbo: 'vergessen', fraseDe: 'Ich vergesse oft Namen.', frasePt: 'Esqueço nomes frequentemente.', contexto: 'Memória' },
  { verbo: 'vergessen', fraseDe: 'Vergisst du mich?', frasePt: 'Você me esquece?', contexto: 'Emocional' },
  { verbo: 'vergessen', fraseDe: 'Er vergisst den Termin.', frasePt: 'Ele esquece o compromisso.', contexto: 'Compromisso' },
  { verbo: 'vergessen', fraseDe: 'Vergiss das nicht!', frasePt: 'Não esqueça isso!', contexto: 'Imperativo' },
  { verbo: 'helfen', fraseDe: 'Ich helfe dir.', frasePt: 'Eu te ajudo.', contexto: 'Apoio' },
  { verbo: 'helfen', fraseDe: 'Hilfst du mir?', frasePt: 'Você me ajuda?', contexto: 'Pedido' },
  { verbo: 'helfen', fraseDe: 'Er hilft seiner Mutter.', frasePt: 'Ele ajuda sua mãe.', contexto: 'Família' },
  { verbo: 'helfen', fraseDe: 'Hilf mir bitte!', frasePt: 'Ajuda-me, por favor!', contexto: 'Imperativo' },
  { verbo: 'werfen', fraseDe: 'Ich werfe den Ball.', frasePt: 'Jogo a bola.', contexto: 'Esporte' },
  { verbo: 'werfen', fraseDe: 'Wirfst du mir den Schlüssel?', frasePt: 'Você me joga a chave?', contexto: 'Pedido' },
  { verbo: 'werfen', fraseDe: 'Er wirft den Müll weg.', frasePt: 'Ele joga o lixo fora.', contexto: 'Rotina' },
  { verbo: 'werfen', fraseDe: 'Wirf das nicht weg!', frasePt: 'Não jogue isso fora!', contexto: 'Imperativo' },
  { verbo: 'sterben', fraseDe: 'Ich sterbe nicht.', frasePt: 'Eu não morro.', contexto: 'Drama' },
  { verbo: 'sterben', fraseDe: 'Stirbst du vor Angst?', frasePt: 'Você morre de medo?', contexto: 'Expressão' },
  { verbo: 'sterben', fraseDe: 'Er stirbt an Krebs.', frasePt: 'Ele morre de câncer.', contexto: 'Doença' },
  { verbo: 'sterben', fraseDe: 'Stirb nicht!', frasePt: 'Não morra!', contexto: 'Drama' },
];

export const GROUP_2_EXPRESSIONS: VerbExpression[] = [
  { expressaoDe: "Nimm's leicht!", expressaoPt: 'Leve na boa!', contexto: 'Informal' },
  { expressaoDe: 'Iss was!', expressaoPt: 'Come alguma coisa!', contexto: 'Convidativo' },
  { expressaoDe: 'Vergiss es!', expressaoPt: 'Esquece!', contexto: 'Rejeição' },
  { expressaoDe: 'Hilf mir mal!', expressaoPt: 'Me dá uma ajuda!', contexto: 'Informal' },
  { expressaoDe: 'Wirf nicht alles weg!', expressaoPt: 'Não jogue tudo fora!', contexto: 'Conselho' },
  { expressaoDe: 'Ich sterbe vor Hunger!', expressaoPt: 'Estou morrendo de fome!', contexto: 'Expressão coloquial' },
  { expressaoDe: 'Das trifft sich gut!', expressaoPt: 'Isso cai bem! Que coincidência feliz!', contexto: 'Coincidência' },
];

// 1.4 GRUPO 3: IRREGULARES E REGULARES ESPECIAIS
export interface SpecialVerbSection {
  verb: string;
  category: string;
  translation: string;
  conjugation: {
    ich: string;
    du: string;
    erSieEs: string;
    wir: string;
    ihr: string;
    sieSie: string;
  };
  attentionRule: string;
  crucialDistinction?: {
    title: string;
    items: { term: string; explanation: string; example: string }[];
  };
  usageGuide?: string;
  examples: VerbExample[];
  expressions: VerbExpression[];
}

export const SPECIAL_VERBS_GROUP_3: SpecialVerbSection[] = [
  {
    verb: 'wissen',
    category: 'Verbo Irregular com Presente Fraco-Pré-terito',
    translation: 'saber (fatos / informações)',
    conjugation: {
      ich: 'weiß',
      du: 'weißt',
      erSieEs: 'weiß',
      wir: 'wissen',
      ihr: 'wisst',
      sieSie: 'wissen',
    },
    attentionRule: 'Atenção máxima: a 1ª e 3ª pessoas do singular são idênticas (ich weiß, er weiß). Não há terminação -e nem -t.',
    crucialDistinction: {
      title: 'Diferença Crucial: wissen vs. kennen vs. können',
      items: [
        { term: 'wissen', explanation: 'Saber fatos, dados, respostas ou orações subordinadas.', example: 'Ich weiß die Antwort. / Ich weiß, wo er ist.' },
        { term: 'kennen', explanation: 'Conhecer pessoas, cidades, lugares ou obras por experiência.', example: 'Ich kenne Berlin. / Ich kenne Peter.' },
        { term: 'können', explanation: 'Saber fazer algo, capacidade aprendida ou habilidade.', example: 'Ich kann Deutsch sprechen. / Ich kann schwimmen.' },
      ],
    },
    examples: [
      { verbo: 'wissen', fraseDe: 'Ich weiß es nicht.', frasePt: 'Eu não sei.', contexto: 'Resposta' },
      { verbo: 'wissen', fraseDe: 'Weißt du, wo er ist?', frasePt: 'Você sabe onde ele está?', contexto: 'Pergunta' },
      { verbo: 'wissen', fraseDe: 'Er weiß alles.', frasePt: 'Ele sabe tudo.', contexto: 'Ironia' },
      { verbo: 'wissen', fraseDe: 'Wir wissen das.', frasePt: 'Nós sabemos disso.', contexto: 'Afirmação' },
      { verbo: 'wissen', fraseDe: 'Wissen Sie das?', frasePt: 'O senhor sabe disso?', contexto: 'Formal' },
      { verbo: 'wissen', fraseDe: 'Weiß ich nicht!', frasePt: 'Sei lá!', contexto: 'Informal' },
    ],
    expressions: [
      { expressaoDe: 'Weißt du was?', expressaoPt: 'Sabe de uma coisa?', contexto: 'Início de conversa' },
      { expressaoDe: 'Ich weiß nicht.', expressaoPt: 'Não sei.', contexto: 'Resposta reflexiva' },
      { expressaoDe: 'Woher soll ich das wissen?', expressaoPt: 'Como vou saber?', contexto: 'Irritação' },
      { expressaoDe: 'Wissen ist Macht.', expressaoPt: 'Saber é poder.', contexto: 'Provérbio' },
      { expressaoDe: 'Nicht, dass ich wüsste.', expressaoPt: 'Não que eu saiba.', contexto: 'Resposta com Konjunktiv' },
    ],
  },
  {
    verb: 'mögen',
    category: 'Verbo Modal (Preteritopresente)',
    translation: 'gostar',
    conjugation: {
      ich: 'mag',
      du: 'magst',
      erSieEs: 'mag',
      wir: 'mögen',
      ihr: 'mögt',
      sieSie: 'mögen',
    },
    attentionRule: 'Como todo verbo modal no presente: 1ª e 3ª pessoas singulares idênticas (ich mag, er mag) e sem terminação pessoal.',
    usageGuide: 'Uso 1: mögen + substantivo (gostar de algo: Ich mag Kaffee).\nUso 2: mögen + infinitivo (Ich mag tanzen).\nUso 3: möchten (subjuntivo/Konjunktiv II) = "gostaria" (pedido educado no restaurante/comércio: Ich möchte ein Bier).',
    examples: [
      { verbo: 'mögen', fraseDe: 'Ich mag Kaffee.', frasePt: 'Eu gosto de café.', contexto: 'Preferência' },
      { verbo: 'mögen', fraseDe: 'Magst du Schokolade?', frasePt: 'Você gosta de chocolate?', contexto: 'Pergunta' },
      { verbo: 'mögen', fraseDe: 'Er mag keine Tiere.', frasePt: 'Ele não gosta de animais.', contexto: 'Negação' },
      { verbo: 'mögen', fraseDe: 'Wir mögen Musik.', frasePt: 'Nós gostamos de música.', contexto: 'Preferência' },
      { verbo: 'mögen', fraseDe: 'Mögt ihr Pizza?', frasePt: 'Vocês gostam de pizza?', contexto: 'Pergunta' },
      { verbo: 'mögen', fraseDe: 'Ich möchte ein Bier.', frasePt: 'Eu gostaria de uma cerveja.', contexto: 'Pedido educado' },
    ],
    expressions: [
      { expressaoDe: 'Ich mag dich.', expressaoPt: 'Eu gosto de você.', contexto: 'Afetivo' },
      { expressaoDe: 'Magst du mich?', expressaoPt: 'Você gosta de mim?', contexto: 'Afetivo' },
      { expressaoDe: 'Das mag sein.', expressaoPt: 'Pode ser. (Concordância parcial)', contexto: 'Concordância' },
      { expressaoDe: 'Wie magst du es?', expressaoPt: 'Como você gosta disso?', contexto: 'Preferência' },
    ],
  },
  {
    verb: 'reden',
    category: 'Verbo Regular com -e- Epentético',
    translation: 'falar / conversar',
    conjugation: {
      ich: 'rede',
      du: 'redest',
      erSieEs: 'redet',
      wir: 'reden',
      ihr: 'redet',
      sieSie: 'reden',
    },
    attentionRule: 'O radical termina em -d: insere obrigatoriamente a vogal de ligação "-e-" antes das terminações -st e -t para facilitar a pronúncia.',
    crucialDistinction: {
      title: 'Diferença Crucial: reden vs. sprechen vs. sagen',
      items: [
        { term: 'reden', explanation: 'Conversar, bater papo, diálogo informal entre pessoas.', example: 'Ich rede mit dir. / Wir reden über Politik.' },
        { term: 'sprechen', explanation: 'A faculdade da fala, idiomas falados ou tom formal.', example: 'Ich spreche Deutsch. / Der Direktor spricht.' },
        { term: 'sagen', explanation: 'Dizer algo pontual, enunciar um conteúdo específico.', example: 'Er sagt: "Guten Tag!". / Was sagst du dazu?' },
      ],
    },
    examples: [
      { verbo: 'reden', fraseDe: 'Ich rede mit dir.', frasePt: 'Eu falo com você.', contexto: 'Conversa' },
      { verbo: 'reden', fraseDe: 'Redest du mit mir?', frasePt: 'Você fala comigo?', contexto: 'Pergunta' },
      { verbo: 'reden', fraseDe: 'Er redet zu viel.', frasePt: 'Ele fala demais.', contexto: 'Crítica' },
      { verbo: 'reden', fraseDe: 'Wir reden über Politik.', frasePt: 'Falamos sobre política.', contexto: 'Discussão' },
      { verbo: 'reden', fraseDe: 'Redet ihr über mich?', frasePt: 'Vocês falam sobre mim?', contexto: 'Suspeita' },
      { verbo: 'reden', fraseDe: 'Reden Sie langsamer!', frasePt: 'Fale mais devagar!', contexto: 'Formal' },
    ],
    expressions: [
      { expressaoDe: 'Reden wir nicht darüber!', expressaoPt: 'Não vamos falar sobre isso!', contexto: 'Evitar assunto' },
      { expressaoDe: 'Du redest wirres Zeug.', expressaoPt: 'Você está falando bobagem/coisas desconexas.', contexto: 'Crítica' },
      { expressaoDe: 'Mit wem redest du?', expressaoPt: 'Com quem você está falando?', contexto: 'Pergunta' },
      { expressaoDe: 'Rede mit mir!', expressaoPt: 'Fala comigo!', contexto: 'Pedido' },
    ],
  },
  {
    verb: 'warten',
    category: 'Verbo Regular com -e- Epentético',
    translation: 'esperar',
    conjugation: {
      ich: 'warte',
      du: 'wartest',
      erSieEs: 'wartet',
      wir: 'warten',
      ihr: 'wartet',
      sieSie: 'warten',
    },
    attentionRule: 'O radical termina em -t: insere a vogal de ligação "-e-" em du wartest e er wartet.',
    usageGuide: 'Regência Fixa Fundamental: warten auf + Acusativo (esperar por alguém/algo: Ich warte auf den Bus; Ich warte auf dich).',
    examples: [
      { verbo: 'warten', fraseDe: 'Ich warte auf dich.', frasePt: 'Espero por você.', contexto: 'Relacionamento' },
      { verbo: 'warten', fraseDe: 'Wartest du auf mich?', frasePt: 'Você espera por mim?', contexto: 'Pergunta' },
      { verbo: 'warten', fraseDe: 'Er wartet auf den Bus.', frasePt: 'Ele espera o ônibus.', contexto: 'Transporte' },
      { verbo: 'warten', fraseDe: 'Wir warten auf das Ergebnis.', frasePt: 'Esperamos o resultado.', contexto: 'Ansiedade' },
      { verbo: 'warten', fraseDe: 'Wartet ihr schon lange?', frasePt: 'Vocês esperam há muito tempo?', contexto: 'Pergunta' },
      { verbo: 'warten', fraseDe: 'Warten Sie bitte!', frasePt: 'Espere, por favor!', contexto: 'Formal' },
    ],
    expressions: [
      { expressaoDe: 'Warte mal!', expressaoPt: 'Espera aí!', contexto: 'Informal' },
      { expressaoDe: 'Ich kann nicht mehr warten.', expressaoPt: 'Não posso mais esperar.', contexto: 'Impaciência' },
      { expressaoDe: 'Warten wir ab!', expressaoPt: 'Vamos esperar para ver!', contexto: 'Resignação' },
      { expressaoDe: 'Darauf habe ich gewartet!', expressaoPt: 'Por isso eu esperei!', contexto: 'Entusiasmo' },
    ],
  },
  {
    verb: 'baden',
    category: 'Verbo Regular com -e- Epentético',
    translation: 'tomar banho (de imersão)',
    conjugation: {
      ich: 'bade',
      du: 'badest',
      erSieEs: 'badet',
      wir: 'baden',
      ihr: 'badet',
      sieSie: 'baden',
    },
    attentionRule: 'Radical termina em -d: insere o "-e-" epentético (du badest, er badet).',
    crucialDistinction: {
      title: 'Diferença Crucial: baden vs. duschen',
      items: [
        { term: 'baden', explanation: 'Banho de imersão em água: na banheira (Badewanne), no mar (im Meer), no lago (im See) ou piscina (im Pool).', example: 'Ich bade im Meer. / Er badet in der Wanne.' },
        { term: 'duschen', explanation: 'Banho de chuveiro (a ducha rápida cotidiana).', example: 'Ich dusche jeden Morgen.' },
      ],
    },
    examples: [
      { verbo: 'baden', fraseDe: 'Ich bade im Meer.', frasePt: 'Tomo banho no mar.', contexto: 'Férias' },
      { verbo: 'baden', fraseDe: 'Badest du gern?', frasePt: 'Você gosta de tomar banho (de banheira/mar)?', contexto: 'Preferência' },
      { verbo: 'baden', fraseDe: 'Er badet jeden Tag.', frasePt: 'Ele toma banho de banheira todos os dias.', contexto: 'Rotina' },
      { verbo: 'baden', fraseDe: 'Wir baden im See.', frasePt: 'Tomamos banho no lago.', contexto: 'Verão' },
      { verbo: 'baden', fraseDe: 'Badet ihr im Pool?', frasePt: 'Vocês tomam banho na piscina?', contexto: 'Pergunta' },
      { verbo: 'baden', fraseDe: 'Baden Sie hier?', frasePt: 'O senhor toma banho aqui?', contexto: 'Formal' },
    ],
    expressions: [
      { expressaoDe: 'Bade dich nicht aus!', expressaoPt: 'Não se afogue!', contexto: 'Advertência' },
      { expressaoDe: 'Ich bade in der Sonne.', expressaoPt: 'Banho-me ao sol (tomo sol).', contexto: 'Metafórico' },
      { expressaoDe: 'Baden gehen', expressaoPt: 'Ir nadar / fracassar (coloquial: o plano foi por água abaixo).', contexto: 'Expressão idiomática' },
    ],
  },
  {
    verb: 'bilden',
    category: 'Verbo Regular com -e- Epentético',
    translation: 'formar / constituir / educar',
    conjugation: {
      ich: 'bilde',
      du: 'bildest',
      erSieEs: 'bildet',
      wir: 'bilden',
      ihr: 'bildet',
      sieSie: 'bilden',
    },
    attentionRule: 'Radical termina em -d: insere "-e-" antes de -st e -t (du bildest, er bildet).',
    usageGuide: 'Construções Reflexivas Idiomáticas:\n• sich (Dativ) eine Meinung bilden: formar a própria opinião\n• sich (Dativ) etwas einbilden: fantasiar, ter ilusões, achar-se superior\n• sich weiterbilden: fazer aperfeiçoamento profissional.',
    examples: [
      { verbo: 'bilden', fraseDe: 'Ich bilde mir eine Meinung.', frasePt: 'Formo minha opinião.', contexto: 'Opinião' },
      { verbo: 'bilden', fraseDe: 'Bildest du dir das ein?', frasePt: 'Você imagina isso?', contexto: 'Surpresa' },
      { verbo: 'bilden', fraseDe: 'Er bildet sich weiter.', frasePt: 'Ele se aperfeiçoa.', contexto: 'Educação' },
      { verbo: 'bilden', fraseDe: 'Wir bilden eine Gruppe.', frasePt: 'Formamos um grupo.', contexto: 'Trabalho' },
      { verbo: 'bilden', fraseDe: 'Bildet ihr euch das ein?', frasePt: 'Vocês imaginam isso?', contexto: 'Suspeita' },
      { verbo: 'bilden', fraseDe: 'Bilden Sie sich Ihre Meinung!', frasePt: 'Forme sua opinião!', contexto: 'Formal' },
    ],
    expressions: [
      { expressaoDe: 'Sich etwas einbilden', expressaoPt: 'Imaginar algo / ser convencido', contexto: 'Ilusão / Caráter' },
      { expressaoDe: 'Sich weiterbilden', expressaoPt: 'Aperfeiçoar-se profissionalmente', contexto: 'Educação' },
      { expressaoDe: 'Eine Ausnahme bilden', expressaoPt: 'Ser uma exceção', contexto: 'Regra' },
      { expressaoDe: 'Den Mittelpunkt bilden', expressaoPt: 'Ser o centro / núcleo', contexto: 'Foco' },
    ],
  },
];

// ==========================================
// BLOCO 2: TRANSCRIÇÃO, TRADUÇÃO & MINERAÇÃO
// ==========================================

export interface LessonDialogue {
  id: string;
  title: string;
  context: string;
  lines: {
    speaker: string;
    de: string;
    pt: string;
    targetVerb?: string;
  }[];
}

export const DIALOGUES_LESSON_09: LessonDialogue[] = [
  {
    id: 'dialog-1-kuche',
    title: 'Diálogo 1: Na Cozinha (In der Küche)',
    context: 'Preparando o jantar e combinando o horário do encontro.',
    lines: [
      { speaker: 'A', de: 'Wäschst du das Gemüse?', pt: 'Você lava os legumes?', targetVerb: 'waschen' },
      { speaker: 'B', de: 'Ja, ich wasche es gerade.', pt: 'Sim, estou lavando agora mesmo.', targetVerb: 'waschen' },
      { speaker: 'A', de: 'Nimmst du auch die Kartoffeln?', pt: 'Você pega as batatas também?', targetVerb: 'nehmen' },
      { speaker: 'B', de: 'Ja, ich nehme sie. Hilfst du mir?', pt: 'Sim, eu pego. Você me ajuda?', targetVerb: 'nehmen / helfen' },
      { speaker: 'A', de: 'Klar, ich helfe dir. Aber iss nicht die ganze Schokolade!', pt: 'Claro, eu te ajudo. Mas não coma todo o chocolate!', targetVerb: 'helfen / essen' },
      { speaker: 'B', de: 'Ich esse nur ein Stück. Vergiss es nicht: Wir treffen uns um 8.', pt: 'Eu como só um pedaço. Não esqueça: Encontramo-nos às 8.', targetVerb: 'essen / vergessen / treffen' },
    ],
  },
  {
    id: 'dialog-2-arbeit',
    title: 'Diálogo 2: No Trabalho (Bei der Arbeit)',
    context: 'Procurando pelo chefe no escritório.',
    lines: [
      { speaker: 'A', de: 'Weißt du, wo der Chef ist?', pt: 'Você sabe onde o chefe está?', targetVerb: 'wissen' },
      { speaker: 'B', de: 'Nein, ich weiß es nicht. Er hält gerade eine Besprechung.', pt: 'Não, não sei. Ele está conduzindo uma reunião agora.', targetVerb: 'wissen / halten' },
      { speaker: 'A', de: 'Kannst du ihm sagen, dass ich ihn sprechen muss?', pt: 'Pode dizer a ele que preciso falar com ele?', targetVerb: 'können / sprechen' },
      { speaker: 'B', de: 'Ja, ich sage es ihm. Warte bitte hier.', pt: 'Sim, eu digo. Espere aqui, por favor.', targetVerb: 'sagen / warten' },
      { speaker: 'A', de: 'Ich warte auf ihn. Rede mit ihm, es ist wichtig.', pt: 'Espero por ele. Fale com ele, é importante.', targetVerb: 'warten / reden' },
      { speaker: 'B', de: 'Okay, ich rede mit ihm.', pt: 'OK, eu falo com ele.', targetVerb: 'reden' },
    ],
  },
  {
    id: 'dialog-3-restaurant',
    title: 'Diálogo 3: No Restaurante (Im Restaurant)',
    context: 'Pedindo bebidas e pratos no restaurante.',
    lines: [
      { speaker: 'Kellner', de: 'Was möchten Sie trinken?', pt: 'O que gostariam de beber?', targetVerb: 'möchten' },
      { speaker: 'Gast 1', de: 'Ich möchte ein Bier. Und magst du auch eins?', pt: 'Eu gostaria de uma cerveja. E você gosta de uma também?', targetVerb: 'möchten / mögen' },
      { speaker: 'Gast 2', de: 'Nein, ich mag kein Bier. Ich nehme ein Wasser.', pt: 'Não, não gosto de cerveja. Eu pego uma água.', targetVerb: 'mögen / nehmen' },
      { speaker: 'Kellner', de: 'Und was essen Sie?', pt: 'E o que os senhores comem?', targetVerb: 'essen' },
      { speaker: 'Gast 1', de: 'Ich esse das Schnitzel. Und du?', pt: 'Eu como o schnitzel. E você?', targetVerb: 'essen' },
      { speaker: 'Gast 2', de: 'Ich esse den Fisch. Wirfst du mir die Speisekarte?', pt: 'Eu como o peixe. Joga-me o cardápio?', targetVerb: 'essen / werfen' },
      { speaker: 'Gast 1', de: 'Klar, hier. Lass uns bestellen.', pt: 'Claro, aqui. Vamos fazer o pedido.', targetVerb: 'lassen' },
    ],
  },
  {
    id: 'dialog-4-sport',
    title: 'Diálogo 4: No Esporte (Beim Sport)',
    context: 'Treinando com a bola no campo.',
    lines: [
      { speaker: 'A', de: 'Fängst du den Ball?', pt: 'Você pega a bola?', targetVerb: 'fangen' },
      { speaker: 'B', de: 'Ja, ich fange ihn! Wirf du mir den Ball!', pt: 'Sim, eu pego! Joga-me a bola!', targetVerb: 'fangen / werfen' },
      { speaker: 'A', de: 'Ich werfe ihn. Hältst du ihn fest?', pt: 'Eu jogo. Você a segura firme?', targetVerb: 'werfen / halten' },
      { speaker: 'B', de: 'Ja, ich halte ihn. Lass uns spielen!', pt: 'Sim, eu a seguro. Deixe-nos jogar!', targetVerb: 'halten / lassen' },
      { speaker: 'A', de: 'Ich rate dir: Triff den Ball besser!', pt: 'Eu te aconselho: Acerte a bola melhor!', targetVerb: 'raten / treffen' },
      { speaker: 'B', de: 'Ich treffe ihn schon! Warte mal!', pt: 'Eu já a acerto! Espera aí!', targetVerb: 'treffen / warten' },
    ],
  },
  {
    id: 'dialog-5-gesundheit',
    title: 'Diálogo 5: Na Saúde (Bei der Gesundheit)',
    context: 'Sentindo dores e recebendo conselhos médicos.',
    lines: [
      { speaker: 'A', de: 'Hilfst du mir? Ich sterbe vor Schmerzen.', pt: 'Você me ajuda? Estou morrendo de dor.', targetVerb: 'helfen / sterben' },
      { speaker: 'B', de: 'Was hältst du von einem Arztbesuch?', pt: 'O que você acha de uma consulta médica?', targetVerb: 'halten' },
      { speaker: 'A', de: 'Ich weiß nicht. Ich mag keine Ärzte.', pt: 'Não sei. Não gosto de médicos.', targetVerb: 'wissen / mögen' },
      { speaker: 'B', de: 'Lass mich dich überzeugen. Nimm eine Tablette.', pt: 'Deixe-me convencer você. Tome um comprimido.', targetVerb: 'lassen / nehmen' },
      { speaker: 'A', de: 'Okay, ich nehme eine. Aber rede nicht mit meiner Mutter.', pt: 'OK, tomo um. Mas não fale com minha mãe.', targetVerb: 'nehmen / reden' },
      { speaker: 'B', de: 'Ich rede nicht. Vergiss es.', pt: 'Não falo. Esquece.', targetVerb: 'reden / vergessen' },
    ],
  },
];

// 2.2 Tabela Lexical Primária (30 Termos)
export interface LexicalTerm09 {
  palavraAlema: string;
  classeGramatical: string;
  traducao: string;
  fraseModelo: string;
}

export const LEXICAL_TABLE_30: LexicalTerm09[] = [
  { palavraAlema: 'waschen', classeGramatical: 'Verbo irregular (a → ä)', traducao: 'lavar', fraseModelo: 'Ich wasche meine Hände.' },
  { palavraAlema: 'lassen', classeGramatical: 'Verbo irregular (a → ä)', traducao: 'deixar / permitir', fraseModelo: 'Lass mich in Ruhe!' },
  { palavraAlema: 'fangen', classeGramatical: 'Verbo irregular (a → ä)', traducao: 'pegar / capturar', fraseModelo: 'Ich fange den Ball.' },
  { palavraAlema: 'raten', classeGramatical: 'Verbo irregular (a → ä)', traducao: 'aconselhar', fraseModelo: 'Ich rate dir gut.' },
  { palavraAlema: 'halten', classeGramatical: 'Verbo irregular (a → ä)', traducao: 'parar / segurar', fraseModelo: 'Der Zug hält in Berlin.' },
  { palavraAlema: 'nehmen', classeGramatical: 'Verbo irregular (e → i)', traducao: 'pegar / tomar', fraseModelo: 'Ich nehme den Bus.' },
  { palavraAlema: 'treffen', classeGramatical: 'Verbo irregular (e → i)', traducao: 'encontrar / acertar', fraseModelo: 'Wir treffen uns um 8.' },
  { palavraAlema: 'essen', classeGramatical: 'Verbo irregular (e → i)', traducao: 'comer', fraseModelo: 'Ich esse einen Apfel.' },
  { palavraAlema: 'vergessen', classeGramatical: 'Verbo irregular (e → i)', traducao: 'esquecer', fraseModelo: 'Vergiss das nicht!' },
  { palavraAlema: 'helfen', classeGramatical: 'Verbo irregular (e → i)', traducao: 'ajudar', fraseModelo: 'Ich helfe dir.' },
  { palavraAlema: 'werfen', classeGramatical: 'Verbo irregular (e → i)', traducao: 'jogar / atirar', fraseModelo: 'Ich werfe den Ball.' },
  { palavraAlema: 'sterben', classeGramatical: 'Verbo irregular (e → i)', traducao: 'morrer', fraseModelo: 'Er stirbt an Krebs.' },
  { palavraAlema: 'wissen', classeGramatical: 'Verbo irregular', traducao: 'saber', fraseModelo: 'Ich weiß es nicht.' },
  { palavraAlema: 'mögen', classeGramatical: 'Verbo modal', traducao: 'gostar', fraseModelo: 'Ich mag Kaffee.' },
  { palavraAlema: 'reden', classeGramatical: 'Verbo regular (-d epentético)', traducao: 'falar / conversar', fraseModelo: 'Ich rede mit dir.' },
  { palavraAlema: 'warten', classeGramatical: 'Verbo regular (-t epentético)', traducao: 'esperar', fraseModelo: 'Ich warte auf dich.' },
  { palavraAlema: 'baden', classeGramatical: 'Verbo regular (-d epentético)', traducao: 'tomar banho', fraseModelo: 'Ich bade im Meer.' },
  { palavraAlema: 'bilden', classeGramatical: 'Verbo regular (-d epentético)', traducao: 'formar / constituir', fraseModelo: 'Ich bilde mir eine Meinung.' },
  { palavraAlema: 'der Mund', classeGramatical: 'Substantivo masculino', traducao: 'boca', fraseModelo: 'Halt den Mund!' },
  { palavraAlema: 'die Ruhe', classeGramatical: 'Substantivo feminino', traducao: 'paz / calma', fraseModelo: 'Lass mich in Ruhe!' },
  { palavraAlema: 'der Ball', classeGramatical: 'Substantivo masculino', traducao: 'bola', fraseModelo: 'Ich fange den Ball.' },
  { palavraAlema: 'der Zug', classeGramatical: 'Substantivo masculino', traducao: 'trem', fraseModelo: 'Der Zug hält in Berlin.' },
  { palavraAlema: 'der Bus', classeGramatical: 'Substantivo masculino', traducao: 'ônibus', fraseModelo: 'Ich nehme den Bus.' },
  { palavraAlema: 'der Freund', classeGramatical: 'Substantivo masculino', traducao: 'amigo', fraseModelo: 'Ich treffe meine Freunde.' },
  { palavraAlema: 'der Apfel', classeGramatical: 'Substantivo masculino', traducao: 'maçã', fraseModelo: 'Ich esse einen Apfel.' },
  { palavraAlema: 'der Termin', classeGramatical: 'Substantivo masculino', traducao: 'compromisso', fraseModelo: 'Vergiss den Termin nicht!' },
  { palavraAlema: 'die Mutter', classeGramatical: 'Substantivo feminino', traducao: 'mãe', fraseModelo: 'Er hilft seiner Mutter.' },
  { palavraAlema: 'der Müll', classeGramatical: 'Substantivo masculino', traducao: 'lixo', fraseModelo: 'Er wirft den Müll weg.' },
  { palavraAlema: 'der Krebs', classeGramatical: 'Substantivo masculino', traducao: 'câncer', fraseModelo: 'Er stirbt an Krebs.' },
  { palavraAlema: 'die Antwort', classeGramatical: 'Substantivo feminino', traducao: 'resposta', fraseModelo: 'Ich weiß die Antwort.' },
];

// 2.3 Registro Coloquial e Autêntico (28 Expressões)
export interface ColloquialTerm09 {
  expressaoAlema: string;
  traducao: string;
  contexto: string;
}

export const COLLOQUIAL_EXPRESSIONS_28: ColloquialTerm09[] = [
  { expressaoAlema: 'Halt den Mund!', traducao: 'Cala a boca!', contexto: 'Informal / Agressivo' },
  { expressaoAlema: 'Lass mich in Ruhe!', traducao: 'Deixa-me em paz!', contexto: 'Emocional' },
  { expressaoAlema: 'Was hältst du davon?', traducao: 'O que você acha disso?', contexto: 'Opinião' },
  { expressaoAlema: 'Ich rate dir gut.', traducao: 'Eu te aconselho bem.', contexto: 'Conselho' },
  { expressaoAlema: "Nimm's leicht!", traducao: 'Leve na boa!', contexto: 'Informal' },
  { expressaoAlema: 'Iss was!', traducao: 'Come alguma coisa!', contexto: 'Convidativo' },
  { expressaoAlema: 'Vergiss es!', traducao: 'Esquece!', contexto: 'Rejeição' },
  { expressaoAlema: 'Hilf mir mal!', traducao: 'Me dá uma ajuda!', contexto: 'Informal' },
  { expressaoAlema: 'Wirf nicht alles weg!', traducao: 'Não jogue tudo fora!', contexto: 'Conselho' },
  { expressaoAlema: 'Ich sterbe vor Hunger!', traducao: 'Estou morrendo de fome!', contexto: 'Expressão coloquial' },
  { expressaoAlema: 'Das trifft sich gut!', traducao: 'Isso cai bem! Coincidência feliz!', contexto: 'Coincidência' },
  { expressaoAlema: 'Weißt du was?', traducao: 'Sabe de uma coisa?', contexto: 'Início de conversa' },
  { expressaoAlema: 'Ich weiß nicht.', traducao: 'Não sei.', contexto: 'Resposta' },
  { expressaoAlema: 'Woher soll ich das wissen?', traducao: 'Como vou saber?', contexto: 'Irritação' },
  { expressaoAlema: 'Wissen ist Macht.', traducao: 'Saber é poder.', contexto: 'Provérbio' },
  { expressaoAlema: 'Ich mag dich.', traducao: 'Eu gosto de você.', contexto: 'Afetivo' },
  { expressaoAlema: 'Magst du mich?', traducao: 'Você gosta de mim?', contexto: 'Afetivo' },
  { expressaoAlema: 'Das mag sein.', traducao: 'Pode ser.', contexto: 'Concordância parcial' },
  { expressaoAlema: 'Reden wir nicht darüber!', traducao: 'Não vamos falar sobre isso!', contexto: 'Evitar assunto' },
  { expressaoAlema: 'Du redest wirres Zeug.', traducao: 'Você está falando bobagem.', contexto: 'Crítica' },
  { expressaoAlema: 'Warte mal!', traducao: 'Espera aí!', contexto: 'Informal' },
  { expressaoAlema: 'Ich kann nicht mehr warten.', traducao: 'Não posso mais esperar.', contexto: 'Impaciência' },
  { expressaoAlema: 'Warten wir ab!', traducao: 'Vamos esperar!', contexto: 'Resignação' },
  { expressaoAlema: 'Darauf habe ich gewartet!', traducao: 'Esperei por isso!', contexto: 'Entusiasmo' },
  { expressaoAlema: 'Bade dich nicht aus!', traducao: 'Não se afogue!', contexto: 'Advertência' },
  { expressaoAlema: 'Sich etwas einbilden', traducao: 'Imaginar algo / ter manias', contexto: 'Ilusão' },
  { expressaoAlema: 'Sich weiterbilden', traducao: 'Aperfeiçoar-se profissionalmente', contexto: 'Educação' },
  { expressaoAlema: 'Eine Ausnahme bilden', traducao: 'Ser uma exceção', contexto: 'Regra' },
];

// ==========================================
// BLOCO 3: EXERCÍCIOS & RESOLUÇÃO COMENTADA
// ==========================================

export interface ExerciseItemConjugation {
  id: number;
  promptBefore: string;
  baseVerb: string;
  promptAfter: string;
  correctForm: string;
  justification: string;
}

export const EXERCISE_1_CONJUGATE: ExerciseItemConjugation[] = [
  { id: 1, promptBefore: 'Ich', baseVerb: 'waschen', promptAfter: 'meine Hände.', correctForm: 'wasche', justification: '1ª sg. → radical normal: wasche' },
  { id: 2, promptBefore: '', baseVerb: 'lassen', promptAfter: 'du mich in Ruhe?', correctForm: 'Lässt', justification: '2ª sg. → alternância a → ä com terminação em -st: Lässt' },
  { id: 3, promptBefore: 'Er', baseVerb: 'fangen', promptAfter: 'den Ball.', correctForm: 'fängt', justification: '3ª sg. → alternância a → ä: fängt' },
  { id: 4, promptBefore: 'Ich', baseVerb: 'raten', promptAfter: 'dir gut.', correctForm: 'rate', justification: '1ª sg. → radical normal: rate' },
  { id: 5, promptBefore: 'Der Zug', baseVerb: 'halten', promptAfter: 'in Berlin.', correctForm: 'hält', justification: '3ª sg. → alternância a → ä: hält' },
  { id: 6, promptBefore: 'Ich', baseVerb: 'nehmen', promptAfter: 'den Bus.', correctForm: 'nehme', justification: '1ª sg. → radical normal: nehme' },
  { id: 7, promptBefore: '', baseVerb: 'treffen', promptAfter: 'du sie heute?', correctForm: 'Triffst', justification: '2ª sg. → alternância e → i: Triffst' },
  { id: 8, promptBefore: 'Ich', baseVerb: 'essen', promptAfter: 'einen Apfel.', correctForm: 'esse', justification: '1ª sg. → radical normal: esse' },
  { id: 9, promptBefore: '', baseVerb: 'vergessen', promptAfter: 'du mich?', correctForm: 'Vergisst', justification: '2ª sg. → alternância e → i (radical com sibilante -ss): Vergisst' },
  { id: 10, promptBefore: 'Ich', baseVerb: 'helfen', promptAfter: 'dir.', correctForm: 'helfe', justification: '1ª sg. → radical normal: helfe' },
  { id: 11, promptBefore: 'Er', baseVerb: 'werfen', promptAfter: 'den Müll weg.', correctForm: 'wirft', justification: '3ª sg. → alternância e → i: wirft' },
  { id: 12, promptBefore: 'Er', baseVerb: 'sterben', promptAfter: 'an Krebs.', correctForm: 'stirbt', justification: '3ª sg. → alternância e → i: stirbt' },
  { id: 13, promptBefore: 'Ich', baseVerb: 'wissen', promptAfter: 'es nicht.', correctForm: 'weiß', justification: '1ª sg. → irregular pré-térito no presente: weiß' },
  { id: 14, promptBefore: 'Ich', baseVerb: 'mögen', promptAfter: 'Kaffee.', correctForm: 'mag', justification: '1ª sg. → verbo modal sem terminação: mag' },
  { id: 15, promptBefore: 'Ich', baseVerb: 'reden', promptAfter: 'mit dir.', correctForm: 'rede', justification: '1ª sg. → radical regular: rede' },
  { id: 16, promptBefore: 'Ich', baseVerb: 'warten', promptAfter: 'auf dich.', correctForm: 'warte', justification: '1ª sg. → radical regular: warte' },
  { id: 17, promptBefore: 'Ich', baseVerb: 'baden', promptAfter: 'im Meer.', correctForm: 'bade', justification: '1ª sg. → radical regular: bade' },
  { id: 18, promptBefore: 'Ich', baseVerb: 'bilden', promptAfter: 'mir eine Meinung.', correctForm: 'bilde', justification: '1ª sg. → radical regular: bilde' },
];

export interface ExerciseItemFillVerb {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  correctWord: string;
  baseVerb: string;
}

export const EXERCISE_2_FILL_VERB: ExerciseItemFillVerb[] = [
  { id: 1, sentenceBefore: 'Ich', sentenceAfter: 'dir, zum Arzt zu gehen.', correctWord: 'rate', baseVerb: 'raten' },
  { id: 2, sentenceBefore: '', sentenceAfter: 'du mir bitte?', correctWord: 'Hilfst', baseVerb: 'helfen' },
  { id: 3, sentenceBefore: 'Ich', sentenceAfter: 'auf den Bus.', correctWord: 'warte', baseVerb: 'warten' },
  { id: 4, sentenceBefore: 'Er', sentenceAfter: 'den Ball.', correctWord: 'fängt', baseVerb: 'fangen' },
  { id: 5, sentenceBefore: 'Wir', sentenceAfter: 'uns um 8.', correctWord: 'treffen', baseVerb: 'treffen' },
  { id: 6, sentenceBefore: 'Ich', sentenceAfter: 'eine Tablette.', correctWord: 'nehme', baseVerb: 'nehmen' },
  { id: 7, sentenceBefore: '', sentenceAfter: 'du Schokolade?', correctWord: 'Magst', baseVerb: 'mögen' },
  { id: 8, sentenceBefore: 'Ich', sentenceAfter: 'es nicht.', correctWord: 'weiß', baseVerb: 'wissen' },
  { id: 9, sentenceBefore: '', sentenceAfter: 'mich in Ruhe!', correctWord: 'Lass', baseVerb: 'lassen' },
  { id: 10, sentenceBefore: 'Ich', sentenceAfter: 'meine Hände.', correctWord: 'wasche', baseVerb: 'waschen' },
  { id: 11, sentenceBefore: 'Der Zug', sentenceAfter: 'in Berlin.', correctWord: 'hält', baseVerb: 'halten' },
  { id: 12, sentenceBefore: 'Er', sentenceAfter: 'den Müll weg.', correctWord: 'wirft', baseVerb: 'werfen' },
  { id: 13, sentenceBefore: 'Ich', sentenceAfter: 'einen Apfel.', correctWord: 'esse', baseVerb: 'essen' },
  { id: 14, sentenceBefore: '', sentenceAfter: 'das nicht!', correctWord: 'Vergiss', baseVerb: 'vergessen' },
  { id: 15, sentenceBefore: 'Er', sentenceAfter: 'an Krebs.', correctWord: 'stirbt', baseVerb: 'sterben' },
  { id: 16, sentenceBefore: 'Ich', sentenceAfter: 'mit dir.', correctWord: 'rede', baseVerb: 'reden' },
  { id: 17, sentenceBefore: 'Ich', sentenceAfter: 'im Meer.', correctWord: 'bade', baseVerb: 'baden' },
  { id: 18, sentenceBefore: 'Ich', sentenceAfter: 'mir eine Meinung.', correctWord: 'bilde', baseVerb: 'bilden' },
];

export interface ExerciseItemTranslation {
  id: number;
  pt: string;
  de: string;
}

export const EXERCISE_3_TRANSLATE: ExerciseItemTranslation[] = [
  { id: 1, pt: 'Eu lavo minhas mãos.', de: 'Ich wasche meine Hände.' },
  { id: 2, pt: 'Você me deixa em paz?', de: 'Lässt du mich in Ruhe?' },
  { id: 3, pt: 'Ele pega a bola.', de: 'Er fängt den Ball.' },
  { id: 4, pt: 'Eu te aconselho bem.', de: 'Ich rate dir gut.' },
  { id: 5, pt: 'O trem para em Berlim.', de: 'Der Zug hält in Berlin.' },
  { id: 6, pt: 'Eu pego o ônibus.', de: 'Ich nehme den Bus.' },
  { id: 7, pt: 'Você a encontra hoje?', de: 'Triffst du sie heute?' },
  { id: 8, pt: 'Eu como uma maçã.', de: 'Ich esse einen Apfel.' },
  { id: 9, pt: 'Você me esquece?', de: 'Vergisst du mich?' },
  { id: 10, pt: 'Eu te ajudo.', de: 'Ich helfe dir.' },
  { id: 11, pt: 'Ele joga o lixo fora.', de: 'Er wirft den Müll weg.' },
  { id: 12, pt: 'Ele morre de câncer.', de: 'Er stirbt an Krebs.' },
  { id: 13, pt: 'Eu não sei.', de: 'Ich weiß es nicht.' },
  { id: 14, pt: 'Eu gosto de café.', de: 'Ich mag Kaffee.' },
  { id: 15, pt: 'Eu falo com você.', de: 'Ich rede mit dir.' },
  { id: 16, pt: 'Eu espero por você.', de: 'Ich warte auf dich.' },
  { id: 17, pt: 'Eu tomo banho no mar.', de: 'Ich bade im Meer.' },
  { id: 18, pt: 'Eu formo minha opinião.', de: 'Ich bilde mir eine Meinung.' },
];

export interface Exercise4DialogueItem {
  dialogueNumber: number;
  title: string;
  lines: {
    speaker: string;
    template: string; // contains blank
    correctAnswer: string[];
    fullSentence: string;
  }[];
}

export const EXERCISE_4_DIALOGUES: Exercise4DialogueItem[] = [
  {
    dialogueNumber: 1,
    title: 'Dialog 1: Gemüse & Kochen',
    lines: [
      { speaker: 'A', template: '______ (waschen) du das Gemüse?', correctAnswer: ['Wäschst'], fullSentence: 'Wäschst du das Gemüse?' },
      { speaker: 'B', template: 'Ja, ich ______ (waschen) es.', correctAnswer: ['wasche'], fullSentence: 'Ja, ich wasche es.' },
      { speaker: 'A', template: '______ (nehmen) du auch die Kartoffeln?', correctAnswer: ['Nimmst'], fullSentence: 'Nimmst du auch die Kartoffeln?' },
      { speaker: 'B', template: 'Ja, ich ______ (nehmen) sie. ______ (helfen) du mir?', correctAnswer: ['nehme', 'Hilfst'], fullSentence: 'Ja, ich nehme sie. Hilfst du mir?' },
      { speaker: 'A', template: 'Klar, ich ______ (helfen) dir.', correctAnswer: ['helfe'], fullSentence: 'Klar, ich helfe dir.' },
    ],
  },
  {
    dialogueNumber: 2,
    title: 'Dialog 2: Chef im Büro',
    lines: [
      { speaker: 'A', template: '______ (wissen) du, wo der Chef ist?', correctAnswer: ['Weißt'], fullSentence: 'Weißt du, wo der Chef ist?' },
      { speaker: 'B', template: 'Nein, ich ______ (wissen) es nicht.', correctAnswer: ['weiß'], fullSentence: 'Nein, ich weiß es nicht.' },
      { speaker: 'A', template: 'Kannst du ihm sagen, dass ich ihn ______ (sprechen) muss?', correctAnswer: ['sprechen'], fullSentence: 'Kannst du ihm sagen, dass ich ihn sprechen muss?' },
      { speaker: 'B', template: 'Ja, ich ______ (sagen) es ihm. ______ (warten) bitte hier.', correctAnswer: ['sage', 'Warte'], fullSentence: 'Ja, ich sage es ihm. Warte bitte hier.' },
    ],
  },
  {
    dialogueNumber: 3,
    title: 'Dialog 3: Getränke & Speisen',
    lines: [
      { speaker: 'Kellner', template: 'Was ______ (möchten) Sie trinken?', correctAnswer: ['möchten'], fullSentence: 'Was möchten Sie trinken?' },
      { speaker: 'Gast', template: 'Ich ______ (möchten) ein Bier. Und ______ (mögen) du auch eins?', correctAnswer: ['möchte', 'magst'], fullSentence: 'Ich möchte ein Bier. Und magst du auch eins?' },
      { speaker: 'Gast 2', template: 'Nein, ich ______ (mögen) kein Bier. Ich ______ (nehmen) ein Wasser.', correctAnswer: ['mag', 'nehme'], fullSentence: 'Nein, ich mag kein Bier. Ich nehme ein Wasser.' },
    ],
  },
];

export interface ExerciseReverseItem {
  id: number;
  pt: string;
  de: string;
  justification: string;
}

export const EXERCISE_5_REVERSE_BLINDAGEM: ExerciseReverseItem[] = [
  { id: 1, pt: 'Você lava o carro?', de: 'Wäschst du das Auto?', justification: '2ª sg. → alternância a → ä: Wäschst' },
  { id: 2, pt: 'Deixe-me em paz!', de: 'Lass mich in Ruhe!', justification: 'Imperativo informal de lassen → radical normal sem desinência: Lass' },
  { id: 3, pt: 'Ele pega o ladrão.', de: 'Er fängt den Dieb.', justification: '3ª sg. → alternância a → ä: fängt' },
  { id: 4, pt: 'Eu te aconselho a não fazer isso.', de: 'Ich rate dir, das nicht zu tun.', justification: '1ª sg. → radical normal: rate' },
  { id: 5, pt: 'O ônibus para aqui.', de: 'Der Bus hält hier.', justification: '3ª sg. → alternância a → ä: hält' },
  { id: 6, pt: 'Eu pego o trem.', de: 'Ich nehme den Zug.', justification: '1ª sg. → radical normal: nehme' },
  { id: 7, pt: 'Encontramo-nos às 8.', de: 'Wir treffen uns um 8.', justification: '1ª pl. → radical normal: treffen' },
  { id: 8, pt: 'Você come carne?', de: 'Isst du Fleisch?', justification: '2ª sg. → alternância e → i com sibilante: Isst' },
  { id: 9, pt: 'Não esqueça o compromisso!', de: 'Vergiss den Termin nicht!', justification: 'Imperativo informal com alternância e → i: Vergiss' },
  { id: 10, pt: 'Ela ajuda a mãe.', de: 'Sie hilft ihrer Mutter.', justification: '3ª sg. → alternância e → i e regência Dativo (ihrer Mutter): hilft' },
  { id: 11, pt: 'Ele joga a bola.', de: 'Er wirft den Ball.', justification: '3ª sg. → alternância e → i: wirft' },
  { id: 12, pt: 'Ele morre de câncer.', de: 'Er stirbt an Krebs.', justification: '3ª sg. → alternância e → i com regência an + Dativo: stirbt' },
  { id: 13, pt: 'Você sabe onde ele está?', de: 'Weißt du, wo er ist?', justification: '2ª sg. → irregular saber fatos: Weißt' },
  { id: 14, pt: 'Eu gosto de chocolate.', de: 'Ich mag Schokolade.', justification: '1ª sg. → verbo modal sem terminação: mag' },
  { id: 15, pt: 'Fale comigo!', de: 'Rede mit mir!', justification: 'Imperativo regular com -e por causa do radical em -d: Rede' },
  { id: 16, pt: 'Espero por você.', de: 'Ich warte auf dich.', justification: '1ª sg. → regular com regência auf + Acusativo: warte' },
  { id: 17, pt: 'Tomo banho no mar.', de: 'Ich bade im Meer.', justification: '1ª sg. → regular imersão: bade' },
  { id: 18, pt: 'Formo minha opinião.', de: 'Ich bilde mir eine Meinung.', justification: '1ª sg. → regular reflexivo: bilde' },
];

export interface Exercise6ExampleRow {
  verbo: string;
  fraseDe: string;
  justificativa: string;
}

export const EXERCISE_6_DIALOGUE_EXAMPLE: Exercise6ExampleRow[] = [
  { verbo: 'wissen', fraseDe: 'Weißt du, wo mein Handy ist?', justificativa: '2ª sg. → irregular: Weißt du' },
  { verbo: 'wissen', fraseDe: 'Nein, ich weiß es nicht.', justificativa: '1ª sg. → irregular: ich weiß' },
  { verbo: 'warten', fraseDe: 'Warte, ich helfe dir.', justificativa: 'Imperativo: Warte' },
  { verbo: 'helfen', fraseDe: 'Ich helfe dir.', justificativa: '1ª sg. → radical normal + Dativo: helfe dir' },
  { verbo: 'nehmen', fraseDe: 'Nimm mein Handy.', justificativa: 'Imperativo informal com e → i: Nimm' },
  { verbo: 'mögen', fraseDe: 'Magst du einen Kaffee?', justificativa: '2ª sg. → irregular: Magst du' },
  { verbo: 'mögen', fraseDe: 'Ja, ich mag Kaffee.', justificativa: '1ª sg. → irregular: ich mag' },
  { verbo: 'lassen', fraseDe: 'Lass uns in die Küche gehen.', justificativa: 'Imperativo informal: Lass uns' },
  { verbo: 'baden', fraseDe: 'Ich bade später.', justificativa: '1ª sg. → regular: bade' },
  { verbo: 'essen', fraseDe: 'Ich esse jetzt erst.', justificativa: '1ª sg. → radical normal: esse' },
  { verbo: 'warten', fraseDe: 'Okay, ich warte auf dich.', justificativa: '1ª sg. → regular com auf + Akk: warte' },
];

// 3.7 Resumo dos Pontos-Chave da Aula
export interface KeyPointVerbSummary {
  verbo: string;
  traducao: string;
  alternancia: string;
  du: string;
  erSieEs: string;
  imperativo: string;
}

export const VERBS_KEY_POINTS_SUMMARY: KeyPointVerbSummary[] = [
  { verbo: 'waschen', traducao: 'lavar', alternancia: 'a → ä', du: 'wäschst', erSieEs: 'wäscht', imperativo: 'wasch!' },
  { verbo: 'lassen', traducao: 'deixar / permitir', alternancia: 'a → ä', du: 'lässt', erSieEs: 'lässt', imperativo: 'lass!' },
  { verbo: 'fangen', traducao: 'pegar / capturar', alternancia: 'a → ä', du: 'fängst', erSieEs: 'fängt', imperativo: 'fang!' },
  { verbo: 'raten', traducao: 'aconselhar', alternancia: 'a → ä', du: 'rätst', erSieEs: 'rät', imperativo: 'rat!' },
  { verbo: 'halten', traducao: 'parar / segurar', alternancia: 'a → ä', du: 'hältst', erSieEs: 'hält', imperativo: 'halt!' },
  { verbo: 'nehmen', traducao: 'pegar / tomar', alternancia: 'e → i (mm)', du: 'nimmst', erSieEs: 'nimmt', imperativo: 'nimm!' },
  { verbo: 'treffen', traducao: 'encontrar', alternancia: 'e → i', du: 'triffst', erSieEs: 'trifft', imperativo: 'triff!' },
  { verbo: 'essen', traducao: 'comer', alternancia: 'e → i (ss)', du: 'isst', erSieEs: 'isst', imperativo: 'iss!' },
  { verbo: 'vergessen', traducao: 'esquecer', alternancia: 'e → i (ss)', du: 'vergisst', erSieEs: 'vergisst', imperativo: 'vergiss!' },
  { verbo: 'helfen', traducao: 'ajudar', alternancia: 'e → i', du: 'hilfst', erSieEs: 'hilft', imperativo: 'hilf!' },
  { verbo: 'werfen', traducao: 'jogar / atirar', alternancia: 'e → i', du: 'wirfst', erSieEs: 'wirft', imperativo: 'wirf!' },
  { verbo: 'sterben', traducao: 'morrer', alternancia: 'e → i', du: 'stirbst', erSieEs: 'stirbt', imperativo: 'stirb!' },
  { verbo: 'wissen', traducao: 'saber (fatos)', alternancia: 'irregular (weiß)', du: 'weißt', erSieEs: 'weiß', imperativo: 'wisse!' },
  { verbo: 'mögen', traducao: 'gostar', alternancia: 'modal (mag)', du: 'magst', erSieEs: 'mag', imperativo: '—' },
  { verbo: 'reden', traducao: 'falar / conversar', alternancia: 'regular (-d epentético)', du: 'redest', erSieEs: 'redet', imperativo: 'rede!' },
  { verbo: 'warten', traducao: 'esperar', alternancia: 'regular (-t epentético)', du: 'wartest', erSieEs: 'wartet', imperativo: 'warte!' },
  { verbo: 'baden', traducao: 'tomar banho (imersão)', alternancia: 'regular (-d epentético)', du: 'badest', erSieEs: 'badet', imperativo: 'bade!' },
  { verbo: 'bilden', traducao: 'formar / constituir', alternancia: 'regular (-d epentético)', du: 'bildest', erSieEs: 'bildet', imperativo: 'bilde!' },
];
