// ============================================================================
// DADOS DA AULA 13 — SEMANA 2 · DIA 013 (KAPITEL 6, TEIL A, A1–A20, p. 142–156)
// As Quatro Estações, Clima, denn vs. weil, wollen, Verben mit Dativ,
// Richtungsangaben, Verkehrsmittel, Demonstrativartikel, ch-Laut, Hiddensee E-mail
// ============================================================================

export interface LessonMetadata {
  week: number;
  day: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  chapter: string;
  round: string;
  totalPages: string;
  totalTime: string;
}

export const SEMANA_02_LESSON_13_METADATA: LessonMetadata = {
  week: 2,
  day: 'Dia 013',
  lessonNumber: 13,
  title: 'Estações, Clima, Conjunção denn, Modalverb wollen, Verbos com Dativo & Férias na Alemanha',
  subtitle: 'Estações & Clima, denn vs. weil, wollen vs. möchten, Verben mit Dativ (gefallen/passen), Richtungsangaben (nach/in/an/auf/zu), Verkehrsmittel & E-Mail de Férias em Hiddensee',
  chapter: 'Kapitel 6: Teil A (A1–A20, p. 142–156)',
  round: 'Rodada 13',
  totalPages: '15 páginas (p. 142–156)',
  totalTime: '180 minutos (3 Blocos de 60 min)',
};

// ----------------------------------------------------------------------------
// 1.1 ESTAÇÕES E CLIMA (JAHRESZEITEN UND WETTER)
// ----------------------------------------------------------------------------
export interface SeasonInfo {
  nameDe: string;
  article: string;
  monthsDe: string;
  translation: string;
  description: string;
  typicalWeather: string;
  example: string;
}

export const SEASONS_DATA: SeasonInfo[] = [
  {
    nameDe: 'Frühling',
    article: 'der',
    monthsDe: 'März, April, Mai',
    translation: 'primavera',
    description: 'A natureza floresce, dias ficam mais longos e as temperaturas sobem gradativamente.',
    typicalWeather: 'Es wird warm, der Wind weht, es regnet ab und zu.',
    example: 'Im Frühling blühen die Blumen und es wird wärmer.',
  },
  {
    nameDe: 'Sommer',
    article: 'der',
    monthsDe: 'Juni, Juli, August',
    translation: 'verão',
    description: 'A estação mais quente e ensolarada, com dias longos e férias escolares na Alemanha.',
    typicalWeather: 'Die Sonne scheint, es ist heiß, manchmal gibt es Gewitter.',
    example: 'Im Sommer fahren viele Deutsche an die Ostsee oder nach Italien.',
  },
  {
    nameDe: 'Herbst',
    article: 'der',
    monthsDe: 'September, Oktober, November',
    translation: 'outono',
    description: 'Folhas coloridas, ventos fortes e aumento de chuvas e nevoeiros densos.',
    typicalWeather: 'Der Sturm weht, der Nebel ist dicht, die Nächte sind kalt.',
    example: 'Im Herbst fallen die Blätter und das Wetter wird stürmisch.',
  },
  {
    nameDe: 'Winter',
    article: 'der',
    monthsDe: 'Dezember, Januar, Februar',
    translation: 'inverno',
    description: 'Frio rigoroso, dias curtos, geadas e neve principalmente nos Alpes e planaltos.',
    typicalWeather: 'Es schneit, es gibt Frost, die Temperatur liegt unter null Grad.',
    example: 'Im Winter machen wir Urlaub in den Alpen, denn ich liebe den Schnee.',
  },
];

export interface WeatherVocab {
  de: string;
  article?: string;
  translation: string;
  category: 'nomen' | 'verb' | 'adjektiv' | 'temperatur';
  exampleDe: string;
  examplePt: string;
}

export const WEATHER_VOCAB_DATA: WeatherVocab[] = [
  { de: 'der Regen', article: 'der', translation: 'a chuva', category: 'nomen', exampleDe: 'Der Regen prasselt gegen das Fenster.', examplePt: 'A chuva bate forte contra a janela.' },
  { de: 'der Wind', article: 'der', translation: 'o vento', category: 'nomen', exampleDe: 'Der Wind weht sehr stark im Herbst.', examplePt: 'O vento sopra muito forte no outono.' },
  { de: 'die Wolke', article: 'die (Pl. Wolken)', translation: 'a nuvem', category: 'nomen', exampleDe: 'Die Wolken sind grau und dunkel.', examplePt: 'As nuvens estão cinzentas e escuras.' },
  { de: 'die Wärme', article: 'die', translation: 'o calor agradável', category: 'nomen', exampleDe: 'Die Wärme des Frühlings ist wunderbar.', examplePt: 'O calor da primavera é maravilhoso.' },
  { de: 'die Sonne', article: 'die', translation: 'o sol', category: 'nomen', exampleDe: 'Die Sonne scheint den ganzen Nachmittag.', examplePt: 'O sol brilha a tarde inteira.' },
  { de: 'die Hitze', article: 'die', translation: 'o calor intenso/canícula', category: 'nomen', exampleDe: 'Die Hitze in der Stadt ist heute unerträglich.', examplePt: 'O calor intenso na cidade está insuportável hoje.' },
  { de: 'der Himmel', article: 'der', translation: 'o céu', category: 'nomen', exampleDe: 'Der Himmel ist blau und wolkenlos.', examplePt: 'O céu está azul e sem nuvens.' },
  { de: 'das Gewitter', article: 'das', translation: 'a tempestade com trovões/raios', category: 'nomen', exampleDe: 'Am Nachmittag gibt es ein schweres Gewitter.', examplePt: 'À tarde há uma tempestade pesada.' },
  { de: 'der Sturm', article: 'der (Pl. Stürme)', translation: 'a tempestade de vento/vendaval', category: 'nomen', exampleDe: 'Wegen des Sturms fährt die Fähre nicht.', examplePt: 'Por causa da tempestade a balsa não navega.' },
  { de: 'der Nebel', article: 'der', translation: 'a neblina/nevoeiro', category: 'nomen', exampleDe: 'Der Nebel ist morgens sehr dicht.', examplePt: 'A neblina é muito densa pela manhã.' },
  { de: 'der Schnee', article: 'der', translation: 'a neve', category: 'nomen', exampleDe: 'Der Schnee liegt auf den Bergen.', examplePt: 'A neve cobre as montanhas.' },
  { de: 'das Eis', article: 'das', translation: 'o gelo', category: 'nomen', exampleDe: 'Auf den Straßen liegt gefährliches Eis.', examplePt: 'Nas ruas há gelo perigoso.' },
  { de: 'die Kälte', article: 'die', translation: 'o frio', category: 'nomen', exampleDe: 'Gegen die Kälte braucht man einen warmen Mantel.', examplePt: 'Contra o frio é necessário um casaco quente.' },
  { de: 'der Frost', article: 'der', translation: 'a geada', category: 'nomen', exampleDe: 'Im Winter gibt es nachts oft Frost.', examplePt: 'No inverno há frequentemente geada à noite.' },
  // Verben
  { de: 'regnen', translation: 'chover', category: 'verb', exampleDe: 'Es regnet heute den ganzen Tag.', examplePt: 'Está chovendo hoje o dia todo.' },
  { de: 'schneien', translation: 'nevar', category: 'verb', exampleDe: 'Im Januar schneit es in München oft.', examplePt: 'Em janeiro neva com frequência em Munique.' },
  { de: 'wehen', translation: 'soprar (vento)', category: 'verb', exampleDe: 'Ein kalter Wind weht vom Norden.', examplePt: 'Um vento frio sopra do norte.' },
  { de: 'scheinen', translation: 'brilhar', category: 'verb', exampleDe: 'Die Sonne scheint hell am blauen Himmel.', examplePt: 'O sol brilha claro no céu azul.' },
  { de: 'frieren', translation: 'passar frio / congelar', category: 'verb', exampleDe: 'Bei minus 10 Grad friert man sehr schnell.', examplePt: 'A 10 graus negativos a pessoa passa frio muito rápido.' },
  { de: 'donnern', translation: 'trovejar', category: 'verb', exampleDe: 'Es donnert laut in der Ferne.', examplePt: 'Está trovejando alto ao longe.' },
  { de: 'blitzen', translation: 'relampejar', category: 'verb', exampleDe: 'Es blitzt und sofort fängt der Regen an.', examplePt: 'Relampeja e imediatamente a chuva começa.' },
  // Adjetivos
  { de: 'sonnig', translation: 'ensolarado', category: 'adjektiv', exampleDe: 'Heute ist es sonnig und warm.', examplePt: 'Hoje está ensolarado e quente.' },
  { de: 'bewölkt', translation: 'nublado', category: 'adjektiv', exampleDe: 'Der Himmel ist komplett bewölkt.', examplePt: 'O céu está completamente nublado.' },
  { de: 'stürmisch', translation: 'tempestuoso/ventoso', category: 'adjektiv', exampleDe: 'An der Küste ist das Wetter oft stürmisch.', examplePt: 'Na costa o tempo é frequentemente tempestuoso.' },
  { de: 'neblig', translation: 'nevoento/com neblina', category: 'adjektiv', exampleDe: 'Fahr vorsichtig, es ist sehr neblig!', examplePt: 'Dirija com cuidado, está muito nevoento!' },
  // Temperaturas
  { de: 'Die Temperatur liegt bei 20 Grad.', translation: 'A temperatura está em 20 graus.', category: 'temperatur', exampleDe: 'Die Temperatur liegt bei 20 Grad Celsius.', examplePt: 'A temperatura está em 20 graus Celsius.' },
  { de: 'Die Tageshöchsttemperatur beträgt 19 Grad.', translation: 'A temperatura máxima diária é de 19 graus.', category: 'temperatur', exampleDe: 'Die Tageshöchsttemperatur beträgt heute 19 Grad.', examplePt: 'A temperatura máxima diária hoje atinge 19 graus.' },
  { de: 'Es ist minus 10 Grad.', translation: 'Está menos 10 graus.', category: 'temperatur', exampleDe: 'Im Winter ist es nachts oft minus 10 Grad.', examplePt: 'No inverno faz frequentemente 10 graus negativos à noite.' },
  { de: 'Es ist 35 Grad heiß.', translation: 'Está um calor de 35 graus.', category: 'temperatur', exampleDe: 'Im Juli ist es in Spanien 35 Grad.', examplePt: 'Em julho faz 35 graus na Espanha.' },
];

// ----------------------------------------------------------------------------
// 1.2 CONJUNÇÃO DENN VS. WEIL
// ----------------------------------------------------------------------------
export interface ConjunctionComparison {
  ruleName: string;
  conjunction: string;
  type: string;
  verbPosition: string;
  syntaxFormula: string;
  exampleDe: string;
  examplePt: string;
  note: string;
}

export const DENN_VS_WEIL_DATA: ConjunctionComparison[] = [
  {
    ruleName: 'Conjunção Coordenativa: denn',
    conjunction: 'denn',
    type: 'Koordinierende Konjunktion (Posição 0)',
    verbPosition: 'Posição II (a oração mantém a ordem canônica)',
    syntaxFormula: '[Hauptsatz 1] + , denn + [Subjekt (Pos I)] + [konjugiertes Verb (Pos II)] + [Rest]',
    exampleDe: 'Ich bleibe heute zu Hause, denn es regnet in Strömen.',
    examplePt: 'Eu fico hoje em casa, pois está chovendo a cântaros.',
    note: 'denn não "gasta" posição sintática (chamada posição 0). O sujeito vem logo após e o verbo flexionado fica na posição 2.',
  },
  {
    ruleName: 'Conjunção Subordinativa: weil',
    conjunction: 'weil',
    type: 'Subordinierende Konjunktion',
    verbPosition: 'Satzende (o verbo flexionado é empurrado para o fim)',
    syntaxFormula: '[Hauptsatz 1] + , weil + [Subjekt] + [Mittelfeld] + [konjugiertes Verb (Satzende)]',
    exampleDe: 'Ich bleibe heute zu Hause, weil es in Strömen regnet.',
    examplePt: 'Eu fico hoje em casa, porque está chovendo a cântaros.',
    note: 'weil cria uma oração subordinada (Nebensatz). O verbo conjugado obrigatoriamente vai para a última posição da oração.',
  },
];

export interface DennExample {
  satz1: string;
  konjunktion: string;
  subjekt2: string;
  verb2: string;
  rest2: string;
  translation: string;
}

export const DENN_EXAMPLES: DennExample[] = [
  {
    satz1: 'Ich mache am liebsten im Januar Urlaub,',
    konjunktion: 'denn',
    subjekt2: 'ich',
    verb2: 'liebe',
    rest2: 'den Schnee.',
    translation: 'Tiro férias preferencialmente em janeiro, pois amo a neve.',
  },
  {
    satz1: 'Ich fahre im Sommer nach Italien,',
    konjunktion: 'denn',
    subjekt2: 'ich',
    verb2: 'mag',
    rest2: 'die Sonne und das Meer.',
    translation: 'Vou no verão para a Itália, pois gosto do sol e do mar.',
  },
  {
    satz1: 'Wir bleiben heute Abend im Hotel,',
    konjunktion: 'denn',
    subjekt2: 'es',
    verb2: 'gibt',
    rest2: 'draußen ein schweres Gewitter.',
    translation: 'Ficamos hoje à noite no hotel, pois há lá fora uma tempestade pesada.',
  },
  {
    satz1: 'Herr Berg tauscht den Anzug um,',
    konjunktion: 'denn',
    subjekt2: 'er',
    verb2: 'passt',
    rest2: 'ihm leider nicht.',
    translation: 'Herr Berg troca o terno, pois ele infelizmente não lhe serve.',
  },
  {
    satz1: 'Wir nehmen die Fähre nach Hiddensee,',
    konjunktion: 'denn',
    subjekt2: 'es',
    verb2: 'gibt',
    rest2: 'keine Straße zur Insel.',
    translation: 'Pegamos a balsa para Hiddensee, pois não há rua para a ilha.',
  },
];

// ----------------------------------------------------------------------------
// 1.3 MODALVERB WOLLEN (QUERER) & CONTRASTE COM MÖCHTEN
// ----------------------------------------------------------------------------
export interface ModalConjugation {
  person: string;
  pronoun: string;
  form: string;
  note?: string;
}

export const WOLLEN_CONJUGATION: ModalConjugation[] = [
  { person: '1. Sg.', pronoun: 'ich', form: 'will', note: 'Idêntico à 3ª pessoa do singular (sem terminação -e)' },
  { person: '2. Sg.', pronoun: 'du', form: 'willst', note: 'Terminação regular -st com radical irregular will-' },
  { person: '3. Sg.', pronoun: 'er / sie / es / man', form: 'will', note: 'Sem terminação -t, idêntico à 1ª pessoa' },
  { person: '1. Pl.', pronoun: 'wir', form: 'wollen', note: 'Retoma o radical no infinitivo wollen' },
  { person: '2. Pl.', pronoun: 'ihr', form: 'wollt', note: 'Radical woll- + -t' },
  { person: '3. Pl.', pronoun: 'sie', form: 'wollen', note: 'Forma regular no plural' },
  { person: 'Formal', pronoun: 'Sie', form: 'wollen', note: 'Forma respeitosa' },
];

export interface WollenVsMoechten {
  verb: string;
  nuance: string;
  formality: string;
  exampleDe: string;
  translation: string;
  context: string;
}

export const WOLLEN_VS_MOECHTEN_DATA: WollenVsMoechten[] = [
  {
    verb: 'wollen (ich will)',
    nuance: 'Vontade firme, determinação, intenção direta ou categórica.',
    formality: 'Direto, às vezes imperativo ou até ríspido se usado em restaurantes ou lojas.',
    exampleDe: 'Ich will im Winter nach Schweden fahren.',
    translation: 'Eu quero ir para a Suécia no inverno (decisão tomada, intenção firme).',
    context: 'Planejamento pessoal, manifestação de vontade firme ou discussão de metas.',
  },
  {
    verb: 'möchten (ich möchte)',
    nuance: 'Desejo polido, pedido cortês, aspiração educada (Konjunktiv II de mögen).',
    formality: 'Extremamente polido, padrão ouro para atendimento ao cliente e interações sociais.',
    exampleDe: 'Ich möchte gern ein Zimmer reservieren.',
    translation: 'Eu gostaria de reservar um quarto (pedido educado e acolhedor).',
    context: 'Em hotéis, lojas, restaurantes, bilheterias e conversas formais.',
  },
];

// ----------------------------------------------------------------------------
// 1.4 IMPERATIVO (REVISÃO INTEGRAL: SIE, DU, IHR)
// ----------------------------------------------------------------------------
export interface ImperativeExample {
  verbInfinitive: string;
  meaning: string;
  formalSie: string;
  informalDu: string;
  informalIhr: string;
  notes: string;
}

export const IMPERATIVE_DATA: ImperativeExample[] = [
  {
    verbInfinitive: 'fahren',
    meaning: 'ir de veículo / viajar',
    formalSie: 'Fahren Sie nach Berlin!',
    informalDu: 'Fahr nach Berlin!',
    informalIhr: 'Fahrt nach Berlin!',
    notes: 'No "du", o verbo forte não recebe trema: fahr (não fährst).',
  },
  {
    verbInfinitive: 'nehmen',
    meaning: 'pegar / tomar',
    formalSie: 'Nehmen Sie den Zug!',
    informalDu: 'Nimm den Zug!',
    informalIhr: 'Nehmt den Zug!',
    notes: 'Alternância e -> i mantida no "du": nimm! No "ihr", retoma o radical nehmt!',
  },
  {
    verbInfinitive: 'warten',
    meaning: 'esperar',
    formalSie: 'Warten Sie hier!',
    informalDu: 'Warte hier!',
    informalIhr: 'Wartet hier!',
    notes: 'Radicais em -t/-d exigem o -e de apoio no du: warte!',
  },
  {
    verbInfinitive: 'mitkommen',
    meaning: 'vir junto (separável)',
    formalSie: 'Kommen Sie bitte mit!',
    informalDu: 'Komm mit!',
    informalIhr: 'Kommt mit!',
    notes: 'O prefixo separável mit vai obrigatoriamente para o Satzende!',
  },
  {
    verbInfinitive: 'einpacken',
    meaning: 'fazer as malas / empacotar',
    formalSie: 'Packen Sie den Koffer ein!',
    informalDu: 'Pack den Koffer ein!',
    informalIhr: 'Packt den Koffer ein!',
    notes: 'Prefixo separável ein no final.',
  },
];

// ----------------------------------------------------------------------------
// 1.5 VERBEN MIT DATIV & PRONOMES NO DATIVO
// ----------------------------------------------------------------------------
export interface DativVerb {
  verb: string;
  translation: string;
  exampleDe: string;
  examplePt: string;
  grammaticalMechanic: string;
}

export const DATIV_VERBS_DATA: DativVerb[] = [
  {
    verb: 'gefallen',
    translation: 'agradar / gostar de',
    exampleDe: 'Das Hotel gefällt mir sehr gut.',
    examplePt: 'O hotel me agrada muito (eu gosto muito do hotel).',
    grammaticalMechanic: 'O que agrada é o sujeito (Nominativo: das Hotel); a pessoa agradada é o objeto indireto (Dativ: mir).',
  },
  {
    verb: 'gehören',
    translation: 'pertencer a',
    exampleDe: 'Das Ticket gehört mir nicht.',
    examplePt: 'A passagem não me pertence.',
    grammaticalMechanic: 'A coisa possuída é Nominativo; o dono/destinatário está no Dativo (mir, dir, ihm...).',
  },
  {
    verb: 'helfen',
    translation: 'ajudar',
    exampleDe: 'Kann ich Ihnen helfen?',
    examplePt: 'Posso ajudá-lo(a)?',
    grammaticalMechanic: 'Em português "ajudar" pede objeto direto, mas em alemão helfen rege Dativ obrigatoriamente.',
  },
  {
    verb: 'danken',
    translation: 'agradecer a',
    exampleDe: 'Ich danke dir für die Auskunft.',
    examplePt: 'Eu te agradeço pela informação.',
    grammaticalMechanic: 'Quem recebe o agradecimento vai no Dativo.',
  },
  {
    verb: 'passen',
    translation: 'servir (tamanho/corte/horário)',
    exampleDe: 'Die Hose passt mir perfekt.',
    examplePt: 'A calça me serve perfeitamente.',
    grammaticalMechanic: 'A peça de roupa é Nominativo; a pessoa para quem serve é Dativ.',
  },
  {
    verb: 'stehen',
    translation: 'cair bem / ficar bem esteticamente',
    exampleDe: 'Die schwarze Bluse steht Ihnen ausgezeichnet.',
    examplePt: 'A blusa preta lhe cai excelentemente.',
    grammaticalMechanic: 'Distinção crucial: passen = medida/tamanho físico; stehen = harmonia estética, visual e cor.',
  },
  {
    verb: 'schmecken',
    translation: 'ter bom sabor / apetecer',
    exampleDe: 'Der Fisch schmeckt uns ausgezeichnet.',
    examplePt: 'O peixe nos apetece / nós achamos o peixe delicioso.',
    grammaticalMechanic: 'A comida é Nominativo; a pessoa que saboreia fica no Dativ.',
  },
  {
    verb: 'wehtun',
    translation: 'doer (separável: tun ... weh)',
    exampleDe: 'Mein Kopf tut mir weh.',
    examplePt: 'Minha cabeça me dói.',
    grammaticalMechanic: 'A parte do corpo é o sujeito (Nominativo); a pessoa que sente a dor é o pronome no Dativ.',
  },
];

export interface PronounDeclension {
  nominativ: string;
  akkusativ: string;
  dativ: string;
  translationPt: string;
}

export const PRONOUN_DECLENSION_DATA: PronounDeclension[] = [
  { nominativ: 'ich (eu)', akkusativ: 'mich (me/a mim)', dativ: 'mir (a mim / me)', translationPt: '1ª pess. singular' },
  { nominativ: 'du (tu/você)', akkusativ: 'dich (te/a ti)', dativ: 'dir (a ti / te)', translationPt: '2ª pess. singular informal' },
  { nominativ: 'er (ele)', akkusativ: 'ihn (o/a ele)', dativ: 'ihm (a ele / lhe)', translationPt: '3ª pess. masc.' },
  { nominativ: 'sie (ela)', akkusativ: 'sie (a/a ela)', dativ: 'ihr (a ela / lhe)', translationPt: '3ª pess. fem.' },
  { nominativ: 'es (ele/ela neutro)', akkusativ: 'es (o/a neutro)', dativ: 'ihm (a ele / lhe)', translationPt: '3ª pess. neutro' },
  { nominativ: 'wir (nós)', akkusativ: 'uns (nos)', dativ: 'uns (a nós / nos)', translationPt: '1ª pess. plural' },
  { nominativ: 'ihr (vocês/vós)', akkusativ: 'euch (vos/vocês)', dativ: 'euch (a vós / vos)', translationPt: '2ª pess. plural informal' },
  { nominativ: 'sie (eles/elas)', akkusativ: 'sie (os/as)', dativ: 'ihnen (a eles / lhes)', translationPt: '3ª pess. plural' },
  { nominativ: 'Sie (o Sr./a Sra.)', akkusativ: 'Sie (o/a senhor(a))', dativ: 'Ihnen (ao Sr. / à Sra.)', translationPt: 'Formal respeitoso' },
];

// ----------------------------------------------------------------------------
// 1.7 RICHTUNGSANGABEN (PREPOSIÇÕES DE DIREÇÃO: WOHIN?)
// ----------------------------------------------------------------------------
export interface DirectionPreposition {
  prep: string;
  caseUsed: string;
  application: string;
  ruleFormula: string;
  exampleDe: string;
  examplePt: string;
  trava: string;
}

export const DIRECTION_PREPOSITIONS_DATA: DirectionPreposition[] = [
  {
    prep: 'nach',
    caseUsed: 'Dativ (sem artigo na maioria dos países)',
    application: 'Cidades, países neutros sem artigo, continentes e direções cardeais.',
    ruleFormula: 'nach + [Stadt / Land ohne Artikel / Himmelsrichtung]',
    exampleDe: 'Ich fahre nach Berlin / nach Italien / nach Süden.',
    examplePt: 'Vou para Berlim / para a Itália / para o sul.',
    trava: 'Nunca use "nach" com países que têm artigo (como die Schweiz, die Türkei, die USA)!',
  },
  {
    prep: 'in (+ Akk.)',
    caseUsed: 'Akkusativ (mudança de local / entrada)',
    application: 'Países com artigo feminino, masculino ou plural; montanhas, florestas e espaços fechados.',
    ruleFormula: 'in + [Akkusativ: in die Schweiz, in die Türkei, in die USA, in die Berge]',
    exampleDe: 'Wir reisen im August in die Schweiz und in die USA.',
    examplePt: 'Viajamos em agosto para a Suíça e para os EUA.',
    trava: 'in den Urlaub (ir de férias), in die Berge (ir para as montanhas).',
  },
  {
    prep: 'an (+ Akk.)',
    caseUsed: 'Akkusativ (direção à beira de água)',
    application: 'Massas de água (mar, costa, praia, lago, rio).',
    ruleFormula: 'ans Meer (an + das), an den Strand (an + den), an die Ostsee (an + die)',
    exampleDe: 'Familie Berg fährt im Sommer ans Meer und an die Ostsee.',
    examplePt: 'A família Berg vai no verão para o mar e para o Mar Báltico.',
    trava: 'an den Strand (masculino no acusativo) = ir à praia; ans Meer (neutro) = ir ao mar.',
  },
  {
    prep: 'auf (+ Akk.)',
    caseUsed: 'Akkusativ (subir em superfície / ilhas)',
    application: 'Ilhas abertas, montanhas específicas ou superfícies planas.',
    ruleFormula: 'auf eine Insel, auf die Insel Sylt, auf die Insel Rügen',
    exampleDe: 'Paul will unbedingt auf eine Insel in der Ostsee fliegen.',
    examplePt: 'Paul quer imperativamente voar para uma ilha no Mar Báltico.',
    trava: 'Para ilhas usa-se "auf" (auf die Insel Sylt), não "in" ou "nach"!',
  },
  {
    prep: 'zu (+ Dat.)',
    caseUsed: 'Dativ sempre (preposição regente pura de Dativo)',
    application: 'Pessoas, profissionais, parentes e instituições/eventos específicos.',
    ruleFormula: 'zum Arzt (zu + dem), zu meinen Eltern, zu Oma und Opa',
    exampleDe: 'Dorothee fährt im August zu Oma und Opa aufs Land.',
    examplePt: 'Dorothee vai em agosto para a casa dos avós no campo.',
    trava: 'Ao visitar pessoas usa-se sempre "zu" (Ich gehe zu Peter, zum Arzt).',
  },
];

// ----------------------------------------------------------------------------
// 1.8 VERKEHRSMITTEL & O DATIVO COM "MIT"
// ----------------------------------------------------------------------------
export interface TransportItem {
  vehicleDe: string;
  article: 'der' | 'die' | 'das';
  mitDativ: string;
  translation: string;
  verbUsed: string;
  exampleSentence: string;
}

export const TRANSPORT_ITEMS: TransportItem[] = [
  { vehicleDe: 'der Zug', article: 'der', mitDativ: 'mit dem Zug', translation: 'o trem / de trem', verbUsed: 'fahren / reisen', exampleSentence: 'Ich fahre am liebsten mit dem Zug nach München.' },
  { vehicleDe: 'die Bahn', article: 'die', mitDativ: 'mit der Bahn', translation: 'a ferrovia / de ferrovia', verbUsed: 'fahren / reisen', exampleSentence: 'Wir reisen bequem mit der Bahn durch Deutschland.' },
  { vehicleDe: 'das Auto', article: 'das', mitDativ: 'mit dem Auto', translation: 'o carro / de carro', verbUsed: 'fahren', exampleSentence: 'Sie fahren mit dem Auto nach Österreich.' },
  { vehicleDe: 'das Motorrad', article: 'das', mitDativ: 'mit dem Motorrad', translation: 'a motocicleta / de moto', verbUsed: 'fahren', exampleSentence: 'Er fährt mit dem Motorrad über die Alpen.' },
  { vehicleDe: 'der Bus', article: 'der', mitDativ: 'mit dem Bus', translation: 'o ônibus / de ônibus', verbUsed: 'fahren', exampleSentence: 'Die Touristen fahren mit dem Bus zur Stadtbesichtigung.' },
  { vehicleDe: 'das Schiff', article: 'das', mitDativ: 'mit dem Schiff', translation: 'o navio / de navio', verbUsed: 'fahren / reisen', exampleSentence: 'Wir reisen mit dem Schiff über den Bodensee.' },
  { vehicleDe: 'die Fähre', article: 'die', mitDativ: 'mit der Fähre', translation: 'a balsa / de balsa', verbUsed: 'fahren', exampleSentence: 'Nach Hiddensee muss man mit der Fähre fahren.' },
  { vehicleDe: 'das Flugzeug', article: 'das', mitDativ: 'mit dem Flugzeug', translation: 'o avião / de avião', verbUsed: 'fliegen / reisen', exampleSentence: 'Ich fliege mit dem Flugzeug nach Südafrika.' },
  { vehicleDe: 'das Fahrrad', article: 'das', mitDativ: 'mit dem Fahrrad', translation: 'a bicicleta / de bicicleta', verbUsed: 'fahren', exampleSentence: 'Auf Hiddensee fahren fast alle mit dem Fahrrad.' },
];

// ----------------------------------------------------------------------------
// 1.9 ARTIGOS DEMONSTRATIVOS: DIESER & WELCHER
// ----------------------------------------------------------------------------
export interface DemonstrativeRow {
  gender: string;
  nominativWelch: string;
  nominativDies: string;
  akkusativWelch: string;
  akkusativDies: string;
  example: string;
}

export const DEMONSTRATIVE_TABLE: DemonstrativeRow[] = [
  {
    gender: 'Masculino (der)',
    nominativWelch: 'welcher Pullover?',
    nominativDies: 'dieser Pullover',
    akkusativWelch: 'welchen Pullover?',
    akkusativDies: 'diesen Pullover',
    example: 'Welchen Pullover möchten Sie? — Diesen hier!',
  },
  {
    gender: 'Feminino (die)',
    nominativWelch: 'welche Bluse?',
    nominativDies: 'diese Bluse',
    akkusativWelch: 'welche Bluse?',
    akkusativDies: 'diese Bluse',
    example: 'Welche Bluse steht mir besser? — Diese blaue Bluse.',
  },
  {
    gender: 'Neutro (das)',
    nominativWelch: 'welches Kleid?',
    nominativDies: 'dieses Kleid',
    akkusativWelch: 'welches Kleid?',
    akkusativDies: 'dieses Kleid',
    example: 'Welches Kleid gefällt dir? — Dieses elegante Kleid.',
  },
  {
    gender: 'Plural (die)',
    nominativWelch: 'welche Schuhe?',
    nominativDies: 'diese Schuhe',
    akkusativWelch: 'welche Schuhe?',
    akkusativDies: 'diese Schuhe',
    example: 'Welche Schuhe nehmen Sie mit? — Diese Turnschuhe.',
  },
];

// ----------------------------------------------------------------------------
// 2. TEXTOS E DIÁLOGOS DE A1 A A29 (KAPITEL 6, TEIL A)
// ----------------------------------------------------------------------------
export interface DialogueLine {
  speaker: string;
  german: string;
  portuguese: string;
}

export const HIDDENSEE_EMAIL_TEXT = {
  header: {
    from: 'Karola <karola@web.de>',
    to: 'Brigitte <brigitte@post.de>',
    subject: 'Ostseegrüße von der Insel Hiddensee',
  },
  paragraphsDe: [
    'Liebe Brigitte,\nherzliche Grüße von der Ostsee! Wir sind gestern hier auf der Insel Hiddensee angekommen. Bei der Fahrt hatten wir schreckliches Wetter! Es hat den ganzen Tag geregnet. Die Insel Hiddensee ist eine Insel in der Ostsee. Es gibt keine Straße zur Insel, man muss mit der Fähre fahren. Leider hatte die Fähre viele Stunden Verspätung, denn es war ein heftiger Sturm. Wir waren erst um 23.00 Uhr im Hotel „Post“. Das Hotel hat vier Sterne, große Zimmer und ein reichhaltiges Frühstücksbüfett.',
    'Heute scheint die Sonne und wir sind schon am Strand spazieren gegangen. Die Insel ist klein und wunderschön. Es gibt fast keine Autos, alle fahren mit dem Fahrrad. Wir wollen heute Nachmittag einen Ausflug nach Neundorf machen, das liegt im Süden. Wir fahren natürlich auch mit dem Fahrrad. In Neundorf gibt es ein gutes Fischrestaurant. Dort möchte ich heute Abend gern essen, aber Matthias mag keinen Fisch. Vielleicht kann er in dem Restaurant auch ein Steak essen. Morgen besuchen wir eine Ausstellung im Heimatmuseum. Sie zeigt Bilder von der Insel und dem Meer.\nIch rufe dich am Wochenende an.\n\nLiebe Grüße\nKarola',
  ],
  paragraphsPt: [
    'Querida Brigitte,\nsaudações cordiais do Mar Báltico! Chegamos ontem aqui na ilha de Hiddensee. Durante a viagem tivemos um tempo horrível! Choveu o dia todo. A ilha de Hiddensee é uma ilha no Mar Báltico. Não existe rua até a ilha, é preciso navegar de balsa. Infelizmente a balsa teve muitas horas de atraso, pois houve uma tempestade violenta. Nós só chegamos às 23h00 ao Hotel "Post". O hotel tem quatro estrelas, quartos grandes e um farto buffet de café da manhã.',
    'Hoje o sol brilha e já fomos passear na praia. A ilha é pequena e maravilhosa. Quase não existem carros, todo mundo anda de bicicleta. Hoje à tarde queremos fazer uma excursão até Neundorf, que fica no sul. Naturalmente iremos também de bicicleta. Em Neundorf há um bom restaurante de frutos do mar. Lá eu gostaria de jantar hoje à noite, mas Matthias não gosta de peixe. Talvez ele possa comer um bife no restaurante também. Amanhã visitamos uma exposição no museu de história local. Ela exibe quadros da ilha e do mar.\nEu te ligo no final de semana.\n\nCom afeto,\nKarola',
  ],
};

export const CLOTHING_SHOP_DIALOGUE: DialogueLine[] = [
  { speaker: 'Verkäuferin', german: 'Guten Tag! Kann ich Ihnen helfen?', portuguese: 'Bom dia! Posso ajudá-la?' },
  { speaker: 'Frau Berg', german: 'Guten Tag. Ich hätte gern die Bluse dort im Schaufenster.', portuguese: 'Bom dia. Eu gostaria daquela blusa ali na vitrine.' },
  { speaker: 'Verkäuferin', german: 'Diese hier?', portuguese: 'Esta aqui?' },
  { speaker: 'Frau Berg', german: 'Ja, genau diese. Welche Größe ist das?', portuguese: 'Sim, exatamente esta. Que tamanho é este?' },
  { speaker: 'Verkäuferin', german: 'Das ist Größe 40. Wir haben die Bluse aber auch in anderen Größen und anderen Farben.', portuguese: 'Este é tamanho 40. Mas nós temos a blusa também em outros tamanhos e outras cores.' },
  { speaker: 'Frau Berg', german: 'Haben Sie sie auch in Gelb?', portuguese: 'A senhora a tem também em amarelo?' },
  { speaker: 'Verkäuferin', german: 'Nein, in Gelb leider nicht. Aber in Rot, Grün und Schwarz.', portuguese: 'Não, em amarelo infelizmente não. Mas em vermelho, verde e preto.' },
  { speaker: 'Frau Berg', german: 'Kann ich die schwarze Bluse einmal anprobieren?', portuguese: 'Posso experimentar a blusa preta uma vez?' },
  { speaker: 'Verkäuferin', german: 'Ja, gerne! Die Umkleidekabine ist dort drüben.', portuguese: 'Sim, com prazer! O provador é logo ali.' },
  { speaker: 'Frau Berg', german: 'Was meinen Sie? Steht mir diese Bluse?', portuguese: 'O que a senhora acha? Esta blusa me cai bem?' },
  { speaker: 'Verkäuferin', german: 'Sie steht Ihnen ausgezeichnet! Der Schnitt passt wunderbar.', portuguese: 'Ela lhe cai com perfeição! O corte se ajusta maravilhosamente.' },
  { speaker: 'Frau Berg', german: 'Was kostet die Bluse?', portuguese: 'Quanto custa a blusa?' },
  { speaker: 'Verkäuferin', german: 'Sie kostet 59 Euro.', portuguese: 'Ela custa 59 euros.' },
  { speaker: 'Frau Berg', german: 'Gut, ich nehme sie. Ich zahle mit Kreditkarte.', portuguese: 'Ótimo, eu a levo. Vou pagar com cartão de crédito.' },
  { speaker: 'Verkäuferin', german: 'Sehr gerne. Auf Wiedersehen und herzlichen Dank!', portuguese: 'Com muito prazer. Até logo e muito obrigada!' },
];

export const PHONETICS_CH_DATA = {
  ichLaut: {
    rule: 'Pronúncia [ç] (Ich-Laut palatal suave, como um sussurro contínuo do "h" inglês em "huge"): ocorre após vogais anteriores (e, i, ä, ö, ü, eu, äu, ei) e consoantes líquidas (l, r, n). Também no sufixo diminutivo -chen e no sufixo adjetival -ig.',
    words: ['ich', 'mich', 'dich', 'natürlich', 'sechzehn', 'sprechen', 'möchte', 'Bücher', 'nächste', 'euch', 'weich', 'manchmal', 'München', 'Milch', 'welche', 'durch', 'Mädchen', 'Brötchen', 'billig', 'wichtig', 'wenig', 'richtig', 'ledig', 'sechzig'],
    sentences: [
      { de: 'Ich möchte sechzehn Bücher.', pt: 'Eu gostaria de dezesseis livros.' },
      { de: 'Wie gefällt euch München?', pt: 'O que vocês acham de Munique?' },
      { de: 'Ich spreche Deutsch.', pt: 'Eu falo alemão.' },
      { de: 'Welche Brötchen möchte ich?', pt: 'Quais pãezinhos eu gostaria?' },
      { de: 'Das Brötchen kostet sechzig Cent.', pt: 'O pãozinho custa sessenta centavos.' },
    ],
  },
  achLaut: {
    rule: 'Pronúncia [x] (Ach-Laut velar gutural profundo, raspado na garganta): ocorre estritamente após as quatro vogais posteriores puras: a, o, u, au.',
    words: ['ach', 'machen', 'Buch', 'doch', 'Kuchen', 'brauchen', 'auch', 'Sprache', 'Nacht', 'Woche'],
    sentences: [
      { de: 'Ich mache am Wochenende einen Kuchen.', pt: 'Eu faço um bolo no final de semana.' },
      { de: 'Hast du das Buch noch?', pt: 'Você ainda tem o livro?' },
      { de: 'Wir brauchen auch noch Kaffee.', pt: 'Nós também ainda precisamos de café.' },
    ],
  },
};

// ----------------------------------------------------------------------------
// 2.30 TABELA LEXICAL PRIMÁRIA (45 TERMOS RICAMENTE DOCUMENTADOS)
// ----------------------------------------------------------------------------
export interface PrimaryLexiconWord {
  id: number;
  wordDe: string;
  article: 'der' | 'die' | 'das' | 'Pl.' | '';
  pluralDe: string;
  grammarClass: string;
  translationPt: string;
  exampleSentence: string;
  examplePt: string;
}

export const PRIMARY_LEXICON_W2L13: PrimaryLexiconWord[] = [
  { id: 1, wordDe: 'Frühling', article: 'der', pluralDe: 'die Frühlinge', grammarClass: 'Subst. masc.', translationPt: 'primavera', exampleSentence: 'Im Frühling wird das Wetter endlich wärmer.', examplePt: 'Na primavera o clima finalmente fica mais quente.' },
  { id: 2, wordDe: 'Sommer', article: 'der', pluralDe: 'die Sommer', grammarClass: 'Subst. masc.', translationPt: 'verão', exampleSentence: 'Im Sommer fahren wir für drei Wochen ans Meer.', examplePt: 'No verão vamos por três semanas ao mar.' },
  { id: 3, wordDe: 'Herbst', article: 'der', pluralDe: 'die Herbste', grammarClass: 'Subst. masc.', translationPt: 'outono', exampleSentence: 'Im Herbst weht der Wind oft sehr stark.', examplePt: 'No outono o vento sopra frequentemente com muita força.' },
  { id: 4, wordDe: 'Winter', article: 'der', pluralDe: 'die Winter', grammarClass: 'Subst. masc.', translationPt: 'inverno', exampleSentence: 'Im Winter liegt in den Bergen viel Schnee.', examplePt: 'No inverno há muita neve nas montanhas.' },
  { id: 5, wordDe: 'Wetter', article: 'das', pluralDe: 'sem plural', grammarClass: 'Subst. neutro', translationPt: 'clima / tempo meteorológico', exampleSentence: 'Wie ist das Wetter heute in Berlin?', examplePt: 'Como está o tempo hoje em Berlim?' },
  { id: 6, wordDe: 'Regen', article: 'der', pluralDe: 'sem plural', grammarClass: 'Subst. masc.', translationPt: 'chuva', exampleSentence: 'Wegen des Regens nehme ich einen Schirm mit.', examplePt: 'Por causa da chuva levo um guarda-chuva comigo.' },
  { id: 7, wordDe: 'Schnee', article: 'der', pluralDe: 'sem plural', grammarClass: 'Subst. masc.', translationPt: 'neve', exampleSentence: 'Der Schnee fällt lautlos vom Himmel.', examplePt: 'A neve cai silenciosamente do céu.' },
  { id: 8, wordDe: 'Sonne', article: 'die', pluralDe: 'die Sonnen', grammarClass: 'Subst. fem.', translationPt: 'sol', exampleSentence: 'Die Sonne scheint den ganzen Tag über der Insel.', examplePt: 'O sol brilha o dia inteiro sobre a ilha.' },
  { id: 9, wordDe: 'Wind', article: 'der', pluralDe: 'die Winde', grammarClass: 'Subst. masc.', translationPt: 'vento', exampleSentence: 'Der Wind weht die Wolken schnell weg.', examplePt: 'O vento afasta as nuvens rapidamente.' },
  { id: 10, wordDe: 'Wolke', article: 'die', pluralDe: 'die Wolken', grammarClass: 'Subst. fem.', translationPt: 'nuvem', exampleSentence: 'Am Himmel sieht man dunkle graue Wolken.', examplePt: 'No céu veem-se nuvens cinzentas escuras.' },
  { id: 11, wordDe: 'Gewitter', article: 'das', pluralDe: 'die Gewitter', grammarClass: 'Subst. neutro', translationPt: 'tempestade elétrica', exampleSentence: 'Es gibt heute Abend ein schweres Gewitter.', examplePt: 'Haverá uma tempestade violenta hoje à noite.' },
  { id: 12, wordDe: 'Sturm', article: 'der', pluralDe: 'die Stürme', grammarClass: 'Subst. masc.', translationPt: 'vendaval / temporal de vento', exampleSentence: 'Der Sturm hat mehrere Bäume umgeworfen.', examplePt: 'O vendaval derrubou várias árvores.' },
  { id: 13, wordDe: 'Nebel', article: 'der', pluralDe: 'sem plural', grammarClass: 'Subst. masc.', translationPt: 'neblina / nevoeiro', exampleSentence: 'Im dichten Nebel kann man kaum sehen.', examplePt: 'No nevoeiro denso quase não se consegue enxergar.' },
  { id: 14, wordDe: 'Hitze', article: 'die', pluralDe: 'sem plural', grammarClass: 'Subst. fem.', translationPt: 'calor tórrido / canícula', exampleSentence: 'Die Hitze im Juli ist kaum zu ertragen.', examplePt: 'O calor tórrido em julho mal se pode suportar.' },
  { id: 15, wordDe: 'Kälte', article: 'die', pluralDe: 'sem plural', grammarClass: 'Subst. fem.', translationPt: 'frio rigoroso', exampleSentence: 'Die Kälte draußen zwingt uns ins Haus.', examplePt: 'O frio rigoroso lá fora nos força para dentro de casa.' },
  { id: 16, wordDe: 'Frost', article: 'der', pluralDe: 'die Fröste', grammarClass: 'Subst. masc.', translationPt: 'geada / congelamento', exampleSentence: 'Nachts herrscht strenger Frost auf den Straßen.', examplePt: 'À noite predomina severa geada nas ruas.' },
  { id: 17, wordDe: 'Temperatur', article: 'die', pluralDe: 'die Temperaturen', grammarClass: 'Subst. fem.', translationPt: 'temperatura', exampleSentence: 'Die Temperatur liegt bei zwanzig Grad.', examplePt: 'A temperatura situa-se em vinte graus.' },
  { id: 18, wordDe: 'Grad', article: 'der', pluralDe: 'die Grade', grammarClass: 'Subst. masc.', translationPt: 'grau (celsius)', exampleSentence: 'Gestern hatten wir minus zehn Grad.', examplePt: 'Ontem tivemos dez graus negativos.' },
  { id: 19, wordDe: 'Reise', article: 'die', pluralDe: 'die Reisen', grammarClass: 'Subst. fem.', translationPt: 'viagem', exampleSentence: 'Gute Reise und pass auf dich auf!', examplePt: 'Boa viagem e cuide-se bem!' },
  { id: 20, wordDe: 'Reiseziel', article: 'das', pluralDe: 'die Reiseziele', grammarClass: 'Subst. neutro', translationPt: 'destino de viagem', exampleSentence: 'Spanien ist das beliebteste Reiseziel der Deutschen.', examplePt: 'A Espanha é o destino de viagem predileto dos alemães.' },
  { id: 21, wordDe: 'Urlaub', article: 'der', pluralDe: 'die Urlaube', grammarClass: 'Subst. masc.', translationPt: 'férias', exampleSentence: 'Wir fahren nächste Woche endlich in den Urlaub.', examplePt: 'Na próxima semana vamos finalmente sair de férias.' },
  { id: 22, wordDe: 'Koffer', article: 'der', pluralDe: 'die Koffer', grammarClass: 'Subst. masc.', translationPt: 'mala de viagem', exampleSentence: 'Herr Berg hat seinen Koffer schon gepackt.', examplePt: 'Herr Berg já aprontou a sua mala.' },
  { id: 23, wordDe: 'Rucksack', article: 'der', pluralDe: 'die Rucksäcke', grammarClass: 'Subst. masc.', translationPt: 'mochila', exampleSentence: 'Für die Wanderung nehme ich einen leichten Rucksack.', examplePt: 'Para a caminhada levo uma mochila leve.' },
  { id: 24, wordDe: 'Reisetasche', article: 'die', pluralDe: 'die Reisetaschen', grammarClass: 'Subst. fem.', translationPt: 'bolsa de viagem', exampleSentence: 'Die Reisetasche steht schon im Flur.', examplePt: 'A bolsa de viagem já está no corredor.' },
  { id: 25, wordDe: 'Fahrkarte', article: 'die', pluralDe: 'die Fahrkarten', grammarClass: 'Subst. fem.', translationPt: 'passagem / bilhete de transporte', exampleSentence: 'Ich kaufe die Fahrkarte am Automaten.', examplePt: 'Compro a passagem na máquina automática.' },
  { id: 26, wordDe: 'Bahnhof', article: 'der', pluralDe: 'die Bahnhöfe', grammarClass: 'Subst. masc.', translationPt: 'estação de trem', exampleSentence: 'Wir treffen uns um zehn Uhr am Hauptbahnhof.', examplePt: 'Nós nos encontramos às dez horas na estação central.' },
  { id: 27, wordDe: 'Flughafen', article: 'der', pluralDe: 'die Flughäfen', grammarClass: 'Subst. masc.', translationPt: 'aeroporto', exampleSentence: 'Der Bus fährt direkt zum Flughafen Frankfurt.', examplePt: 'O ônibus vai direto para o aeroporto de Frankfurt.' },
  { id: 28, wordDe: 'Flugzeug', article: 'das', pluralDe: 'die Flugzeuge', grammarClass: 'Subst. neutro', translationPt: 'avião', exampleSentence: 'Das Flugzeug landet pünktlich in Hamburg.', examplePt: 'O avião aterrissa pontualmente em Hamburgo.' },
  { id: 29, wordDe: 'Zug', article: 'der', pluralDe: 'die Züge', grammarClass: 'Subst. masc.', translationPt: 'trem', exampleSentence: 'Der Intercity-Zug hat leider dreißig Minuten Verspätung.', examplePt: 'O trem Intercity tem infelizmente trinta minutos de atraso.' },
  { id: 30, wordDe: 'Fähre', article: 'die', pluralDe: 'die Fähren', grammarClass: 'Subst. fem.', translationPt: 'balsa / ferry-boat', exampleSentence: 'Die Fähre bringt uns sicher auf die Insel Hiddensee.', examplePt: 'A balsa nos conduz com segurança à ilha de Hiddensee.' },
  { id: 31, wordDe: 'Kleidung', article: 'die', pluralDe: 'sem plural', grammarClass: 'Subst. fem.', translationPt: 'vestuário / roupas', exampleSentence: 'Packen Sie warme Kleidung für die Berge ein!', examplePt: 'Empacote roupas quentes para as montanhas!' },
  { id: 32, wordDe: 'Hemd', article: 'das', pluralDe: 'die Hemden', grammarClass: 'Subst. neutro', translationPt: 'camisa social', exampleSentence: 'Das blaue Hemd gefällt mir sehr gut.', examplePt: 'A camisa azul me agrada muito.' },
  { id: 33, wordDe: 'Hose', article: 'die', pluralDe: 'die Hosen', grammarClass: 'Subst. fem.', translationPt: 'calça', exampleSentence: 'Diese dunkle Hose passt mir perfekt.', examplePt: 'Esta calça escura me serve com perfeição.' },
  { id: 34, wordDe: 'Kleid', article: 'das', pluralDe: 'die Kleider', grammarClass: 'Subst. neutro', translationPt: 'vestido', exampleSentence: 'Frau Berg kauft ein elegantes Kleid für den Urlaub.', examplePt: 'Frau Berg compra um vestido elegante para as férias.' },
  { id: 35, wordDe: 'Rock', article: 'der', pluralDe: 'die Röcke', grammarClass: 'Subst. masc.', translationPt: 'saia', exampleSentence: 'Steht mir dieser rote Rock?', examplePt: 'Esta saia vermelha me cai bem?' },
  { id: 36, wordDe: 'Bluse', article: 'die', pluralDe: 'die Blusen', grammarClass: 'Subst. fem.', translationPt: 'blusa feminina', exampleSentence: 'Die Bluse im Schaufenster kostet 59 Euro.', examplePt: 'A blusa na vitrine custa 59 euros.' },
  { id: 37, wordDe: 'Pullover', article: 'der', pluralDe: 'die Pullover', grammarClass: 'Subst. masc.', translationPt: 'suéter / pulôver', exampleSentence: 'Für den kühlen Abend brauche ich einen Pullover.', examplePt: 'Para a noite fria preciso de um suéter.' },
  { id: 38, wordDe: 'Regenjacke', article: 'die', pluralDe: 'die Regenjacken', grammarClass: 'Subst. fem.', translationPt: 'jaqueta impermeável de chuva', exampleSentence: 'An der Küste ist eine Regenjacke unverzichtbar.', examplePt: 'Na costa uma jaqueta de chuva é indispensável.' },
  { id: 39, wordDe: 'Mantel', article: 'der', pluralDe: 'die Mäntel', grammarClass: 'Subst. masc.', translationPt: 'casaco comprido / sobretudo', exampleSentence: 'Der schwere Mantel schützt vor Kälte und Wind.', examplePt: 'O casaco pesado protege contra frio e vento.' },
  { id: 40, wordDe: 'Schuh', article: 'der', pluralDe: 'die Schuhe', grammarClass: 'Subst. masc.', translationPt: 'sapato', exampleSentence: 'Diese Schuhe passen mir leider nicht.', examplePt: 'Estes sapatos infelizmente não me servem.' },
  { id: 41, wordDe: 'Farbe', article: 'die', pluralDe: 'die Farben', grammarClass: 'Subst. fem.', translationPt: 'cor', exampleSentence: 'In welcher Farbe möchten Sie das T-Shirt?', examplePt: 'Em que cor você gostaria da camiseta?' },
  { id: 42, wordDe: 'Stau', article: 'der', pluralDe: 'die Staus', grammarClass: 'Subst. masc.', translationPt: 'engarrafamento / congestionamento', exampleSentence: 'Auf der A9 gibt es zehn Kilometer Stau.', examplePt: 'Na autoestrada A9 há dez quilômetros de congestionamento.' },
  { id: 43, wordDe: 'Verspätung', article: 'die', pluralDe: 'die Verspätungen', grammarClass: 'Subst. fem.', translationPt: 'atraso', exampleSentence: 'Unser Zug hat leider zwanzig Minuten Verspätung.', examplePt: 'Nosso trem tem infelizmente vinte minutos de atraso.' },
  { id: 44, wordDe: 'Gleis', article: 'das', pluralDe: 'die Gleise', grammarClass: 'Subst. neutro', translationPt: 'plataforma / via férrea', exampleSentence: 'Der Zug nach Berlin fährt heute von Gleis 5 ab.', examplePt: 'O trem para Berlim parte hoje da plataforma 5.' },
  { id: 45, wordDe: 'Strand', article: 'der', pluralDe: 'die Strände', grammarClass: 'Subst. masc.', translationPt: 'praia', exampleSentence: 'Wir gehen jeden Vormittag an den weißen Strand.', examplePt: 'Vamos toda manhã para a praia de areia branca.' },
];

// ----------------------------------------------------------------------------
// 2.31 EXPRESSÕES COLOQUIAIS E AUTÊNTICAS (UMGANGSSPRACHE - 26 ITENS)
// ----------------------------------------------------------------------------
export interface ColloquialExpression {
  expressionDe: string;
  translationPt: string;
  contextUsage: string;
  exampleSentence: string;
}

export const COLLOQUIAL_EXPRESSIONS_W2L13: ColloquialExpression[] = [
  { expressionDe: 'Gute Reise!', translationPt: 'Boa viagem!', contextUsage: 'Despedida a quem vai embarcar', exampleSentence: 'Gute Reise und melde dich, sobald du ankommst!' },
  { expressionDe: 'Komm gut an!', translationPt: 'Chegue bem! / Boa chegada!', contextUsage: 'Desejo afetuoso de trajeto seguro', exampleSentence: 'Fahr vorsichtig und komm gut an!' },
  { expressionDe: 'Schönen Urlaub!', translationPt: 'Boas férias!', contextUsage: 'Votos antes das férias', exampleSentence: 'Schönen Urlaub und erhol dich gut in Italien!' },
  { expressionDe: 'Erhol dich gut!', translationPt: 'Descanse bem! / Aproveite o repouso!', contextUsage: 'Votos de descanso', exampleSentence: 'Du hast viel gearbeitet, erhol dich gut!' },
  { expressionDe: 'Ich muss noch packen.', translationPt: 'Ainda tenho que fazer as malas.', contextUsage: 'Preparativos de viagem', exampleSentence: 'Mein Zug fährt in drei Stunden und ich muss noch packen!' },
  { expressionDe: 'Hast du alles?', translationPt: 'Você pegou tudo? / Está com tudo aí?', contextUsage: 'Checagem final antes de sair', exampleSentence: 'Hast du alles? Pass, Ticket, Handy, Schlüssel?' },
  { expressionDe: 'Ich habe meinen Pass vergessen.', translationPt: 'Esqueci meu passaporte.', contextUsage: 'Imprevisto de viagem', exampleSentence: 'Oh nein! Ich habe meinen Pass zu Hause vergessen!' },
  { expressionDe: 'Der Zug hat Verspätung.', translationPt: 'O trem está atrasado.', contextUsage: 'Aviso de trânsito ferroviário', exampleSentence: 'Der Zug hat leider 30 Minuten Verspätung.' },
  { expressionDe: 'Ich muss umsteigen.', translationPt: 'Tenho que fazer baldeação / trocar de condução.', contextUsage: 'Itinerário de transporte', exampleSentence: 'In Leipzig muss ich in einen Regionalzug umsteigen.' },
  { expressionDe: 'Wo ist Gleis 5?', translationPt: 'Onde fica a plataforma 5?', contextUsage: 'Orientação em estações ferroviárias', exampleSentence: 'Entschuldigung, wo ist Gleis 5 für den Zug nach Berlin?' },
  { expressionDe: 'Wie viel kostet die Fahrkarte?', translationPt: 'Quanto custa a passagem?', contextUsage: 'Compra de bilhetes', exampleSentence: 'Wie viel kostet die Fahrkarte nach Hamburg hin und zurück?' },
  { expressionDe: 'Einfache Fahrt oder Rückfahrkarte?', translationPt: 'Só ida ou ida e volta?', contextUsage: 'Pergunta do atendente na bilheteria', exampleSentence: 'Möchten Sie eine einfache Fahrt oder eine Rückfahrkarte?' },
  { expressionDe: 'Ich möchte einen Sitzplatz reservieren.', translationPt: 'Gostaria de reservar um assento.', contextUsage: 'Reserva em trens de longa distância', exampleSentence: 'Ich möchte einen Sitzplatz am Fenster reservieren.' },
  { expressionDe: 'Das Wetter ist herrlich!', translationPt: 'O tempo está maravilhoso!', contextUsage: 'Elogio ao clima ensolarado', exampleSentence: 'Heute ist das Wetter herrlich, lass uns spazieren gehen.' },
  { expressionDe: 'Es regnet in Strömen!', translationPt: 'Está chovendo a cântaros / chovendo canivetes!', contextUsage: 'Chuva torrencial contínua', exampleSentence: 'Bleib drinnen, es regnet draußen in Strömen!' },
  { expressionDe: 'Es ist eiskalt!', translationPt: 'Está um gelo / congelante!', contextUsage: 'Frio extremo abaixo de zero', exampleSentence: 'Zieh die Mütze an, es ist eiskalt draußen!' },
  { expressionDe: 'Es ist schwül.', translationPt: 'Está abafado / com umidade pesada.', contextUsage: 'Sensação térmica antes de tempestades de verão', exampleSentence: 'Die Luft steht, es ist furchtbar schwül vor dem Gewitter.' },
  { expressionDe: 'Die Sonne brennt.', translationPt: 'O sol está queimando / de rachar.', contextUsage: 'Radiação solar intensa ao meio-dia', exampleSentence: 'Vergiss die Sonnencreme nicht, die Sonne brennt heute!' },
  { expressionDe: 'Ich bin müde von der Reise.', translationPt: 'Estou exausto da viagem.', contextUsage: 'Cansaço pós-deslocamento', exampleSentence: 'Nach zehn Stunden Fahrt bin ich todmüde von der Reise.' },
  { expressionDe: 'Das Hotel ist spitze!', translationPt: 'O hotel é fantástico / excelente!', contextUsage: 'Avaliação informal muito positiva', exampleSentence: 'Das Hotel am Strand ist wirklich absolute Spitze!' },
  { expressionDe: 'Ich möchte ein Zimmer reservieren.', translationPt: 'Gostaria de reservar um quarto.', contextUsage: 'Check-in e hospedagem', exampleSentence: 'Ich möchte ein ruhiges Doppelzimmer reservieren.' },
  { expressionDe: 'Haben Sie noch ein Zimmer frei?', translationPt: 'O senhor/a senhora ainda tem quarto vago?', contextUsage: 'Consulta direta na recepção', exampleSentence: 'Guten Abend, haben Sie für heute Nacht noch ein Zimmer frei?' },
  { expressionDe: 'Ich hätte gern ein Einzelzimmer.', translationPt: 'Eu gostaria de um quarto individual.', contextUsage: 'Pedido polido no hotel', exampleSentence: 'Ich hätte gern ein Einzelzimmer mit Meerblick.' },
  { expressionDe: 'Das Frühstück ist inklusive.', translationPt: 'O café da manhã está incluso.', contextUsage: 'Detalhe de diária do hotel', exampleSentence: 'Der Preis beträgt 89 Euro, das Frühstück ist inklusive.' },
  { expressionDe: 'Wo geht es zum Strand?', translationPt: 'Por onde vai para a praia?', contextUsage: 'Orientação turística de lazer', exampleSentence: 'Entschuldigung, wo geht es hier zum Strand?' },
  { expressionDe: 'Ich möchte eine Stadtrundfahrt machen.', translationPt: 'Gostaria de fazer um city tour.', contextUsage: 'Turismo urbano', exampleSentence: 'Morgen wollen wir eine Stadtrundfahrt durch Berlin machen.' },
];

// ----------------------------------------------------------------------------
// 3. EXERCÍCIOS RESOLVIDOS E COMENTADOS (A2 A A25)
// ----------------------------------------------------------------------------
export interface SolvedExercise {
  exerciseId: string;
  title: string;
  sourcePage: string;
  description: string;
  items: {
    number: string;
    prompt: string;
    answer: string;
    explanation: string;
  }[];
}

export const SOLVED_EXERCISES_W2L13: SolvedExercise[] = [
  {
    exerciseId: 'ex-A2',
    title: 'Exercício A2 — Wärme und Kälte (Calor e Frio)',
    sourcePage: 'p. 142',
    description: 'Conversão sistemática de adjetivos e predicativos climáticos em seus substantivos correspondentes com artigo.',
    items: [
      { number: '0', prompt: 'Es ist kalt.', answer: 'die Kälte', explanation: 'Adjetivo kalt → substantivo abstrato die Kälte (feminino).' },
      { number: '1', prompt: 'Es ist heiß.', answer: 'die Hitze', explanation: 'Adjetivo heiß → substantivo abstrato die Hitze (feminino).' },
      { number: '2', prompt: 'Es ist warm.', answer: 'die Wärme', explanation: 'Adjetivo warm → substantivo die Wärme (feminino).' },
      { number: '3', prompt: 'Es ist stürmisch.', answer: 'der Sturm', explanation: 'Adjetivo stürmisch → substantivo der Sturm (masculino).' },
      { number: '4', prompt: 'Es ist neblig.', answer: 'der Nebel', explanation: 'Adjetivo neblig → substantivo der Nebel (masculino).' },
      { number: '5', prompt: 'Es ist bewölkt.', answer: 'die Wolke / die Wolken', explanation: 'Adjetivo bewölkt → substantivo die Wolken (plural frequente).' },
      { number: '6', prompt: 'Es regnet.', answer: 'der Regen', explanation: 'Forma verbal regnet → substantivo der Regen (masculino).' },
      { number: '7', prompt: 'Es schneit.', answer: 'der Schnee', explanation: 'Forma verbal schneit → substantivo der Schnee (masculino).' },
      { number: '8', prompt: 'Es ist sonnig.', answer: 'die Sonne', explanation: 'Adjetivo sonnig → substantivo die Sonne (feminino).' },
    ],
  },
  {
    exerciseId: 'ex-A5',
    title: 'Exercício A5 — Wohin willst du fahren? (Para Onde Você Quer Ir?)',
    sourcePage: 'p. 143',
    description: 'Respostas negativas com justificativa climática usando a estrutura [Nein, im ... ist es dort zu ... / regnet es dort zu viel].',
    items: [
      { number: '0', prompt: 'Willst du im Winter nach Schweden fahren? (zu kalt)', answer: 'Nein, im Winter ist es dort zu kalt!', explanation: 'Modelo canônico com inversão: [Nein, im Winter ist es dort zu kalt!].' },
      { number: '1', prompt: 'Wollt ihr im Frühling nach Irland fahren? (zu stürmisch)', answer: 'Nein, im Frühling ist es dort zu stürmisch!', explanation: 'Uso de zu stürmisch (excessivamente ventoso).' },
      { number: '2', prompt: 'Wollen Sie im Herbst nach Schottland fahren? (zu neblig)', answer: 'Nein, im Herbst ist es dort zu neblig!', explanation: 'Forma formal com justificativa zu neblig (com neblina demais).' },
      { number: '3', prompt: 'Wollt ihr im Sommer nach Tunesien fahren? (zu heiß)', answer: 'Nein, im Sommer ist es dort zu heiß!', explanation: 'zu heiß expressa calor insuportável.' },
      { number: '4', prompt: 'Willst du im Herbst nach London fahren? (es regnet zu viel)', answer: 'Nein, im Herbst regnet es dort zu viel!', explanation: 'Atenção ao Satzbau: o verbo regnet fica na posição II logo após o elemento temporal [im Herbst].' },
      { number: '5', prompt: 'Wollen Sie im Winter nach Norwegen fahren? (zu kalt)', answer: 'Nein, im Winter ist es dort zu kalt!', explanation: 'Inverno nórdico severo.' },
      { number: '6', prompt: 'Willst du im Sommer nach Italien fahren? (zu warm)', answer: 'Nein, im Sommer ist es dort zu warm!', explanation: 'Calor de verão no Mediterrâneo.' },
      { number: '7', prompt: 'Wollt ihr im Winter nach Österreich fahren? (es schneit zu viel)', answer: 'Nein, im Winter schneit es dort zu viel!', explanation: 'Verbo schneit em posição II após adjunto temporal.' },
      { number: '8', prompt: 'Willst du im Frühling nach Deutschland fahren? (zu bewölkt)', answer: 'Nein, im Frühling ist es dort zu bewölkt!', explanation: 'Céu frequentemente encoberto.' },
      { number: '9', prompt: 'Wollen Sie im Sommer nach Marokko fahren? (zu heiß)', answer: 'Nein, im Sommer ist es dort zu heiß!', explanation: 'Clima desértico no verão.' },
      { number: '10', prompt: 'Wollt ihr im Winter nach Russland fahren? (es schneit zu viel)', answer: 'Nein, im Winter schneit es dort zu viel!', explanation: 'Inverno com excesso de neve.' },
      { number: '11', prompt: 'Wollen Sie im Herbst nach Italien fahren? (es regnet zu viel)', answer: 'Nein, im Herbst regnet es dort zu viel!', explanation: 'Chuvas de outono.' },
      { number: '12', prompt: 'Willst du im Frühling nach Kanada fahren? (zu stürmisch)', answer: 'Nein, im Frühling ist es dort zu stürmisch!', explanation: 'Vendavais na primavera canadense.' },
    ],
  },
  {
    exerciseId: 'ex-A7',
    title: 'Exercício A7 — Preposições Direcionais (Wohin?)',
    sourcePage: 'p. 144',
    description: 'Preenchimento exato da preposição de deslocamento direcional (nach, in, an, auf, zu).',
    items: [
      { number: '0', prompt: 'Familie Grüne fährt im Sommer ... Frankreich.', answer: 'nach', explanation: 'Países neutros sem artigo exigem nach.' },
      { number: '1', prompt: 'Susanne möchte ... die Insel Sylt fahren.', answer: 'auf', explanation: 'Ilhas exigem auf + Akkusativ: auf die Insel Sylt.' },
      { number: '2', prompt: 'Meine Eltern reisen ... die Niederlande.', answer: 'in', explanation: 'Países com artigo (Plural) exigem in + Akkusativ: in die Niederlande.' },
      { number: '3', prompt: 'Ich fliege im Juni ... Südafrika.', answer: 'nach', explanation: 'Países sem artigo levam nach.' },
      { number: '4', prompt: 'Dorothee fährt im August ... Oma und Opa.', answer: 'zu', explanation: 'Pessoas e parentes exigem zu + Dativ: zu Oma und Opa.' },
      { number: '5', prompt: 'Paul will unbedingt ... eine Insel fliegen.', answer: 'auf', explanation: 'Ilhas sem nome ou com substantivo Insel levam auf eine Insel.' },
      { number: '6', prompt: 'Dort geht er den ganzen Tag ... den Strand.', answer: 'an', explanation: 'Corpos aquáticos e praias exigem an + Akkusativ: an den Strand.' },
      { number: '7', prompt: 'Unser Chef fährt jedes Jahr ... Schweden.', answer: 'nach', explanation: 'Suécia é país sem artigo: nach Schweden.' },
      { number: '8', prompt: 'Frau Krüger will im Januar ... Japan fliegen.', answer: 'nach', explanation: 'Japão é país sem artigo: nach Japan.' },
      { number: '9', prompt: 'Herr Schulz möchte ... die Ostsee fahren.', answer: 'an', explanation: 'Mares exigem an + Akkusativ: an die Ostsee.' },
    ],
  },
  {
    exerciseId: 'ex-A11',
    title: 'Exercício A11 — Preparativos de Viagem (Soll ich / Sollen wir ... mitnehmen?)',
    sourcePage: 'p. 146',
    description: 'Prática de pronomes no Acusativo (ihn, sie, es) em ordens afirmativas e negativas no Imperativo.',
    items: [
      { number: '0', prompt: 'Laptop (ich) → Soll ich den Laptop mitnehmen?', answer: 'Ja, nimm ihn mit. / Nein, lass ihn zu Hause.', explanation: 'der Laptop (masc. Akk.) → pronome ihn.' },
      { number: '1', prompt: 'Turnschuhe (ich) → Soll ich die Turnschuhe mitnehmen?', answer: 'Ja, nimm sie mit.', explanation: 'die Turnschuhe (Pl.) → pronome sie.' },
      { number: '2', prompt: 'Anzug (ich) → Soll ich den Anzug mitnehmen?', answer: 'Nein, lass ihn zu Hause.', explanation: 'der Anzug (masc. Akk.) → pronome ihn.' },
      { number: '3', prompt: 'Nachthemd (ich) → Soll ich das Nachthemd mitnehmen?', answer: 'Ja, nimm es mit.', explanation: 'das Nachthemd (neutro Akk.) → pronome es.' },
      { number: '4', prompt: 'Kleid (ich) → Soll ich das Kleid mitnehmen?', answer: 'Ja, nimm es mit.', explanation: 'das Kleid (neutro Akk.) → pronome es.' },
      { number: '5', prompt: 'Mantel (ich) → Soll ich den Mantel mitnehmen?', answer: 'Nein, lass ihn hier.', explanation: 'der Mantel (masc. Akk.) → pronome ihn.' },
      { number: '6', prompt: 'Regenjacke (ich) → Soll ich die Regenjacke mitnehmen?', answer: 'Ja, nimm sie mit.', explanation: 'die Regenjacke (fem. Akk.) → pronome sie.' },
      { number: '7', prompt: 'Sonnencreme (wir) → Sollen wir die Sonnencreme mitnehmen?', answer: 'Ja, nehmt sie mit.', explanation: 'Imperativo plural informal para "wir": nehmt sie mit!' },
      { number: '8', prompt: 'Fotoapparat (wir) → Sollen wir den Fotoapparat mitnehmen?', answer: 'Ja, nehmt ihn mit.', explanation: 'der Fotoapparat (masc. Akk.) → ihn.' },
      { number: '9', prompt: 'Handy (wir) → Sollen wir das Handy mitnehmen?', answer: 'Ja, nehmt es mit.', explanation: 'das Handy (neutro Akk.) → es.' },
      { number: '10', prompt: 'Führerschein (ich) → Soll ich den Führerschein mitnehmen?', answer: 'Ja, nimm ihn mit.', explanation: 'der Führerschein (masc. Akk.) → ihn.' },
      { number: '11', prompt: 'Kreditkarte (wir) → Sollen wir die Kreditkarte mitnehmen?', answer: 'Ja, nehmt sie mit.', explanation: 'die Kreditkarte (fem. Akk.) → sie.' },
      { number: '12', prompt: 'Aspirin (wir) → Sollen wir das Aspirin mitnehmen?', answer: 'Ja, nehmt es mit.', explanation: 'das Aspirin (neutro Akk.) → es.' },
      { number: '13', prompt: 'Kalender (ich) → Soll ich den Kalender mitnehmen?', answer: 'Ja, nimm ihn mit.', explanation: 'der Kalender (masc. Akk.) → ihn.' },
      { number: '14', prompt: 'Regenschirm (ich) → Soll ich den Regenschirm mitnehmen?', answer: 'Ja, nimm ihn mit.', explanation: 'der Regenschirm (masc. Akk.) → ihn.' },
    ],
  },
  {
    exerciseId: 'ex-A12',
    title: 'Exercício A12 — Vor dem Urlaub (Herr und Frau Berg)',
    sourcePage: 'p. 147',
    description: 'Compreensão auditiva e leitura sobre o diálogo de Herr e Frau Berg arrumando as malas.',
    items: [
      { number: '0', prompt: 'Herr Berg hat seinen Koffer schon gepackt.', answer: 'richtig', explanation: 'Ele confirma que sua mala já está pronta.' },
      { number: '1', prompt: 'Herr Berg hat am Freitag einige Dinge für den Urlaub gekauft.', answer: 'richtig', explanation: 'Ele fez compras na sexta-feira antes da viagem.' },
      { number: '2', prompt: 'Herr Berg findet das neue Hemd nicht schön.', answer: 'falsch', explanation: 'Ele gosta muito da camisa nova; quem tem dúvidas é a esposa quanto à cor.' },
      { number: '3', prompt: 'Herr Berg möchte den Anzug umtauschen.', answer: 'richtig', explanation: 'O terno não serviu bem (passt ihm nicht) e ele pretende trocá-lo.' },
      { number: '4', prompt: 'Herr Berg sucht sein Handy.', answer: 'richtig', explanation: 'Ele procura o celular pelo apartamento.' },
      { number: '5', prompt: 'Herr Berg hat insgesamt drei Fotoapparate.', answer: 'richtig', explanation: 'Ele possui três máquinas fotográficas e quer levar todas.' },
      { number: '6', prompt: 'Herr Berg will in Italien neue Kleidung kaufen.', answer: 'falsch', explanation: 'Ele já comprou tudo na Alemanha antes da viagem.' },
    ],
  },
  {
    exerciseId: 'ex-A16',
    title: 'Exercício A16 — Personalpronomen im Dativ (Respostas Ágeis)',
    sourcePage: 'p. 149',
    description: 'Respostas automatizadas empregando os verbos de regência no Dativo com pronomes adequados.',
    items: [
      { number: '0', prompt: 'Wie geht es Ihnen?', answer: 'Danke, mir geht es gut.', explanation: 'Regência impessoal es geht + Dativ (mir).' },
      { number: '1', prompt: 'Schmeckt dir die Tomatensuppe?', answer: 'Ja, sie schmeckt mir.', explanation: 'die Suppe (sie) + schmeckt mir (Dativ).' },
      { number: '2', prompt: 'Gefällt euch das Hotel?', answer: 'Ja, es gefällt uns.', explanation: 'das Hotel (es) + gefällt uns (Dativ plural).' },
      { number: '3', prompt: 'Wie geht es Klaus?', answer: 'Danke, ihm geht es gut.', explanation: 'Klaus (ele) → pronome dativo ihm.' },
      { number: '4', prompt: 'Passt dir der Bikini?', answer: 'Ja, er passt mir.', explanation: 'der Bikini (er) + passt mir.' },
      { number: '5', prompt: 'Wie geht es Ihrer Frau?', answer: 'Danke, ihr geht es gut.', explanation: 'Ihre Frau (ela) → pronome dativo ihr.' },
      { number: '6', prompt: 'Gefällt dir meine Sonnenbrille?', answer: 'Ja, sie gefällt mir.', explanation: 'die Brille (sie) + gefällt mir.' },
      { number: '7', prompt: 'Schmeckt dir das Schnitzel?', answer: 'Ja, es schmeckt mir.', explanation: 'das Schnitzel (es) + schmeckt mir.' },
      { number: '8', prompt: 'Gehört dir die Tasche?', answer: 'Ja, sie gehört mir.', explanation: 'die Tasche (sie) + gehört mir.' },
      { number: '9', prompt: 'Schmeckt euch der Kaffee?', answer: 'Ja, er schmeckt uns.', explanation: 'der Kaffee (er) + schmeckt uns.' },
      { number: '10', prompt: 'Passen dir die Socken?', answer: 'Ja, sie passen mir.', explanation: 'die Socken (Pl.) + passen (plural) mir.' },
      { number: '11', prompt: 'Steht mir die Bluse?', answer: 'Ja, sie steht dir ausgezeichnet.', explanation: 'steht dir (harmonia visual com pronome dir).' },
      { number: '12', prompt: 'Schmeckt dir der Wein?', answer: 'Ja, er schmeckt mir sehr gut.', explanation: 'der Wein (er) + schmeckt mir.' },
    ],
  },
  {
    exerciseId: 'ex-A19',
    title: 'Exercício A19 — Demonstrativartikel (dieser, diese, dieses)',
    sourcePage: 'p. 150',
    description: 'Declinação exata do artigo demonstrativo conforme o gênero gramatical e caso sintático.',
    items: [
      { number: '1', prompt: 'Steht mir ... Rock?', answer: 'dieser', explanation: 'der Rock (masculino Nominativo sujeito).' },
      { number: '2', prompt: 'Willst du wirklich ... Schuhe kaufen?', answer: 'diese', explanation: 'die Schuhe (plural Acusativo).' },
      { number: '3', prompt: 'Was kostet ... Fahrrad?', answer: 'dieses', explanation: 'das Fahrrad (neutro Nominativo).' },
      { number: '4', prompt: 'Hast du ... Haus schon fotografiert?', answer: 'dieses', explanation: 'das Haus (neutro Acusativo).' },
      { number: '5', prompt: 'Kennst du ... Frau?', answer: 'diese', explanation: 'die Frau (feminino Acusativo).' },
      { number: '6', prompt: '... Handy funktioniert nicht.', answer: 'Dieses', explanation: 'das Handy (neutro Nominativo).' },
      { number: '7', prompt: 'Ich mag ... Film nicht.', answer: 'diesen', explanation: 'der Film (masculino Acusativo: diesen Film).' },
      { number: '8', prompt: 'Wie gefällt dir ... Brille?', answer: 'diese', explanation: 'die Brille (feminino Nominativo sujeito).' },
      { number: '9', prompt: 'Ist ... Anzug von Giorgio Armani?', answer: 'dieser', explanation: 'der Anzug (masculino Nominativo).' },
      { number: '10', prompt: '... Bluse ist sehr schön.', answer: 'Diese', explanation: 'die Bluse (feminino Nominativo).' },
      { number: '11', prompt: '... Suppe schmeckt ausgezeichnet.', answer: 'Diese', explanation: 'die Suppe (feminino Nominativo).' },
      { number: '12', prompt: '... Laptop gehört mir nicht.', answer: 'Dieser', explanation: 'der Laptop (masculino Nominativo).' },
      { number: '13', prompt: 'Willst du wirklich ... Tabletten nehmen?', answer: 'diese', explanation: 'die Tabletten (plural Acusativo).' },
      { number: '14', prompt: '... Zimmer ist zu dunkel.', answer: 'Dieses', explanation: 'das Zimmer (neutro Nominativo).' },
      { number: '15', prompt: '... Auto habe ich schon einmal gesehen.', answer: 'Dieses', explanation: 'das Auto (neutro Acusativo).' },
      { number: '16', prompt: 'Wir akzeptieren ... Kreditkarte nicht.', answer: 'diese', explanation: 'die Kreditkarte (feminino Acusativo).' },
      { number: '17', prompt: '... Regenschirm ist kaputt.', answer: 'Dieser', explanation: 'der Regenschirm (masculino Nominativo).' },
    ],
  },
  {
    exerciseId: 'ex-A25',
    title: 'Exercício A25 — Verkehrsdurchsagen (Anúncios de Estação e Trânsito)',
    sourcePage: 'p. 155',
    description: 'Compreensão dos anúncios de rádio e mensagens sonoras oficiais em estações e estradas.',
    items: [
      { number: '1', prompt: 'Sie wollen nach Berlin und stehen auf dem Bahnhof in Hannover.', answer: 'c) Ihr Zug kommt 30 Minuten später.', explanation: 'O alto-falante informa que o trem acumula 30 minutos de atraso.' },
      { number: '2', prompt: 'Sie sitzen im Intercity-Express. Sie möchten nach Magdeburg.', answer: 'b) Sie müssen in Leipzig umsteigen.', explanation: 'O ICE não faz parada em Magdeburg; os passageiros devem trocar de composição em Leipzig.' },
      { number: '3', prompt: 'Sie möchten Ihre Mutter am Bahnhof abholen und stehen am Gleis 15.', answer: 'c) Der Zug aus Köln kommt auf einem anderen Bahnsteig/Gleis an.', explanation: 'Mudança de plataforma (Gleiswechsel) anunciada de última hora.' },
      { number: '4', prompt: 'Sie fahren mit dem Auto nach Innsbruck in Österreich durch Bayern.', answer: 'b) Auf der Autobahn Richtung Innsbruck sind zehn Kilometer Stau.', explanation: 'O boletim de trânsito rodoviário avisa sobre 10 km de congestionamento.' },
      { number: '5', prompt: 'Sie fahren auf der A 75 von Augsburg nach München.', answer: 'c) Auf der Autobahn Richtung München gibt es zwei Kilometer Stau.', explanation: 'Retenção moderada de 2 km reportada no rádio.' },
      { number: '6', prompt: 'Sie fahren auf der A 9 von München nach Nürnberg.', answer: 'b) Auf der Autobahn Richtung Nürnberg sind bei Ingolstadt Personen auf der Fahrbahn. Die Autofahrer müssen langsam fahren.', explanation: 'Alerta grave de pedestres na pista na altura de Ingolstadt exigindo redução imediata de velocidade.' },
    ],
  },
];

// ----------------------------------------------------------------------------
// 3.10 & 3.11 TRADUÇÃO REVERSA DE BLINDAGEM (12 DESAFIOS)
// ----------------------------------------------------------------------------
export interface ReverseTranslationChallenge {
  id: number;
  ptSentence: string;
  deSolution: string;
  grammaticalNotes: string[];
  keyStructure: string;
}

export const REVERSE_TRANSLATION_CHALLENGES_W2L13: ReverseTranslationChallenge[] = [
  {
    id: 1,
    ptSentence: 'No verão eu vou para a praia. No inverno eu fico em casa.',
    deSolution: 'Im Sommer fahre ich an den Strand. Im Winter bleibe ich zu Hause.',
    grammaticalNotes: [
      'Inversão sintática obrigatória: elemento temporal [Im Sommer] na Posição I → verbo [fahre] na Posição II → sujeito [ich] na Posição III.',
      'Direção à praia: an + den Strand (Acusativo masculino: an den Strand).',
      'Permanência em casa: locução fixa "zu Hause" com o verbo bleiben.',
    ],
    keyStructure: 'Im Sommer fahre ich an den Strand...',
  },
  {
    id: 2,
    ptSentence: 'O tempo está bom hoje. O sol brilha.',
    deSolution: 'Das Wetter ist heute schön. Die Sonne scheint.',
    grammaticalNotes: [
      'das Wetter (neutro): sujeito com verbo sein (ist).',
      'die Sonne (feminino): verbo scheinen conjugado na 3ª pessoa do singular (scheint).',
    ],
    keyStructure: 'Das Wetter ist heute schön. Die Sonne scheint.',
  },
  {
    id: 3,
    ptSentence: 'Está chovendo. Eu preciso de um guarda-chuva.',
    deSolution: 'Es regnet. Ich brauche einen Regenschirm.',
    grammaticalNotes: [
      'Verbo impessoal de clima: Es regnet.',
      'brauchen exige objeto no Acusativo: der Regenschirm vira einen Regenschirm.',
    ],
    keyStructure: 'Es regnet. Ich brauche einen Regenschirm.',
  },
  {
    id: 4,
    ptSentence: 'No inverno neva e está frio.',
    deSolution: 'Im Winter schneit es und es ist kalt.',
    grammaticalNotes: [
      'Elemento temporal na posição I [Im Winter] com inversão do verbo [schneit es].',
      'Coordenada aditiva "und" mantendo a estrutura impessoal [es ist kalt].',
    ],
    keyStructure: 'Im Winter schneit es und es ist kalt.',
  },
  {
    id: 5,
    ptSentence: 'Eu gostaria de ir para a Itália de trem.',
    deSolution: 'Ich möchte nach Italien mit dem Zug fahren.',
    grammaticalNotes: [
      'Modal möchten na Posição II e infinitivo fahren no Satzende (pinça modal).',
      'Itália é país sem artigo: nach Italien.',
      'Meio de transporte: mit + Dativ masculino (mit dem Zug).',
    ],
    keyStructure: 'Ich möchte nach Italien mit dem Zug fahren.',
  },
  {
    id: 6,
    ptSentence: 'Nós viajamos para a Suíça de carro.',
    deSolution: 'Wir reisen in die Schweiz mit dem Auto.',
    grammaticalNotes: [
      'A Suíça é país feminino com artigo: in die Schweiz (Acusativo direcional).',
      'Meio de transporte: mit + Dativ neutro (mit dem Auto).',
    ],
    keyStructure: 'Wir reisen in die Schweiz mit dem Auto.',
  },
  {
    id: 7,
    ptSentence: 'Eu vou para o mar nas férias.',
    deSolution: 'Ich fahre im Urlaub ans Meer.',
    grammaticalNotes: [
      'ans Meer = contração de an + das Meer (Acusativo neutro direcional).',
      'Locução temporal: im Urlaub (em férias).',
    ],
    keyStructure: 'Ich fahre im Urlaub ans Meer.',
  },
  {
    id: 8,
    ptSentence: 'Eu preciso de um passaporte e uma passagem.',
    deSolution: 'Ich brauche einen Pass und eine Fahrkarte.',
    grammaticalNotes: [
      'Verbo brauchen rege duplo Acusativo.',
      'der Pass (masculino) → einen Pass.',
      'die Fahrkarte (feminino) → eine Fahrkarte.',
    ],
    keyStructure: 'Ich brauche einen Pass und eine Fahrkarte.',
  },
  {
    id: 9,
    ptSentence: 'A camisa me agrada. A calça me serve.',
    deSolution: 'Das Hemd gefällt mir. Die Hose passt mir.',
    grammaticalNotes: [
      'gefallen: a camisa é o sujeito (das Hemd) e quem gosta fica no Dativo (mir).',
      'passen: a calça é o sujeito (die Hose) e a pessoa que veste fica no Dativo (mir).',
    ],
    keyStructure: 'Das Hemd gefällt mir. Die Hose passt mir.',
  },
  {
    id: 10,
    ptSentence: 'O hotel me agrada. O quarto é grande.',
    deSolution: 'Das Hotel gefällt mir. Das Zimmer ist groß.',
    grammaticalNotes: [
      'das Hotel (sujeito neutro no Nominativo) + gefällt mir (pronome no Dativ).',
      'das Zimmer (neutro) com adjetivo predicativo sem terminação flexional (groß).',
    ],
    keyStructure: 'Das Hotel gefällt mir. Das Zimmer ist groß.',
  },
  {
    id: 11,
    ptSentence: 'Quanto custa a passagem para Berlim?',
    deSolution: 'Was kostet die Fahrkarte nach Berlin?',
    grammaticalNotes: [
      'Pergunta de preço padrão: Was kostet ...?',
      'die Fahrkarte (sujeito feminino).',
      'Destino a cidades usa sempre nach (nach Berlin).',
    ],
    keyStructure: 'Was kostet die Fahrkarte nach Berlin?',
  },
  {
    id: 12,
    ptSentence: 'O trem tem 30 minutos de atraso.',
    deSolution: 'Der Zug hat 30 Minuten Verspätung.',
    grammaticalNotes: [
      'der Zug (masculino sujeito no Nominativo).',
      'die Verspätung (feminino) usado diretamente com numeral: [X] Minuten Verspätung.',
    ],
    keyStructure: 'Der Zug hat 30 Minuten Verspätung.',
  },
];

// ----------------------------------------------------------------------------
// 3.12 TABELA MESTRE DOS 17 PONTOS-CHAVE DO DIA 013
// ----------------------------------------------------------------------------
export interface KeyPointMaster {
  concept: string;
  ruleExplanation: string;
  canonicalExample: string;
}

export const KEY_POINTS_MASTER_W2L13: KeyPointMaster[] = [
  { concept: '1. As 4 Estações', ruleExplanation: 'Todas as estações são masculinas: der Frühling, der Sommer, der Herbst, der Winter. Usam a contração "im" (im Frühling).', canonicalExample: 'Im Sommer fahren wir ans Meer.' },
  { concept: '2. Os 12 Meses', ruleExplanation: 'Todos os meses são masculinos: der Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember (sempre com "im").', canonicalExample: 'Im August habe ich Urlaub.' },
  { concept: '3. Verbos do Clima', ruleExplanation: 'Verbos impessoais usam pronome impessoal "es": es regnet, es schneit, es donnert, es blitzt.', canonicalExample: 'Gestern hat es den ganzen Tag geregnet.' },
  { concept: '4. Expressão de Temperatura', ruleExplanation: 'Usa-se "Die Temperatur liegt bei [X] Grad" ou "beträgt [X] Grad" ou diretamente "Es ist [X] Grad".', canonicalExample: 'Die Temperatur liegt bei 22 Grad.' },
  { concept: '5. Conjunção denn', ruleExplanation: 'denn ocupa posição zero: o sujeito vem logo após e o verbo flexionado permanece na Posição II.', canonicalExample: 'Ich bleibe hier, denn es regnet.' },
  { concept: '6. denn vs. weil', ruleExplanation: 'denn mantém o verbo na posição II; weil obriga o verbo conjugado a ir para a última posição da oração subordinada.', canonicalExample: 'denn es regnet vs. weil es regnet.' },
  { concept: '7. Conjugação de wollen', ruleExplanation: 'Modalverb irregular com raiz will-: 1ª e 3ª singular são idênticas (ich will, er will).', canonicalExample: 'Er will im Winter nach Schweden fahren.' },
  { concept: '8. wollen vs. möchten', ruleExplanation: 'wollen = determinação forte/categórica; möchten = pedido educado e acolhedor (padrão ouro para lojas e restaurantes).', canonicalExample: 'Ich will reisen vs. Ich möchte bestellen.' },
  { concept: '9. Verben mit Dativ', ruleExplanation: 'Verbos especiais que exigem complemento no Dativo: gefallen, gehören, helfen, danken, passen, schmecken, wehtun, stehen.', canonicalExample: 'Das Hotel gefällt mir sehr gut.' },
  { concept: '10. Pronomes no Dativo', ruleExplanation: 'Declinação fixa: mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen.', canonicalExample: 'Kann ich Ihnen helfen?' },
  { concept: '11. Mecânica de gefallen', ruleExplanation: 'A coisa que agrada é o sujeito (Nominativo); a pessoa que sente o agrado é o objeto no Dativo.', canonicalExample: 'Gefallen dir diese Schuhe?' },
  { concept: '12. Richtungsangaben: nach vs. in', ruleExplanation: 'nach = cidades e países sem artigo (nach Italien); in + Akk = países com artigo (in die Schweiz, in die USA).', canonicalExample: 'Ich fliege nach Japan, aber in die Schweiz.' },
  { concept: '13. Richtungsangaben: an vs. auf vs. zu', ruleExplanation: 'an = corpos d’água (ans Meer); auf = ilhas (auf eine Insel); zu = pessoas/instituições (zu Oma, zum Arzt).', canonicalExample: 'Wir fahren auf die Insel Hiddensee.' },
  { concept: '14. Verkehrsmittel com "mit"', ruleExplanation: 'A preposição "mit" rege sempre Dativ: mit dem Zug, mit dem Auto, mit dem Bus, mit der Bahn, mit dem Flugzeug.', canonicalExample: 'Fährst du mit der Fähre?' },
  { concept: '15. O Imperativo (Revisão)', ruleExplanation: 'Formal: Fahren Sie!; Informal singular: Fahr! / Nimm!; Informal plural: Fahrt! / Nehmt!.', canonicalExample: 'Nehmen Sie bitte die Fahrkarte mit!' },
  { concept: '16. Demonstrativartikel', ruleExplanation: 'dieser (masc), diese (fem), dieses (neutro), diese (plur). No Acusativo masculino vira "diesen".', canonicalExample: 'Welchen Rock möchten Sie? — Diesen hier!' },
  { concept: '17. Fonética do ch-Laut', ruleExplanation: '[ç] (ich-Laut suave) após e, i, ä, ö, ü, eu, consoantes líquidas e nos sufixos -chen e -ig; [x] (ach-Laut profundo) após a, o, u, au.', canonicalExample: 'Ich möchte Milch vs. Ich mache Kuchen.' },
];
