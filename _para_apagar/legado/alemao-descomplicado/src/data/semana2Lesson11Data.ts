// DADOS ESTRUTURADOS DA AULA 11 — SEMANA 2 (DIA 011 DO CRONOGRAMA)
// Kapitel 5, Teil A (A1–A19, p. 110–119)
// Foco: Verbos Separáveis & Inseparáveis, Perfekt (haben vs. sein), Modalverben müssen vs. sollen, Horários e Preposições Temporais

export interface LessonMetadata {
  week: number;
  day: string;
  round: string;
  chapter: string;
  title: string;
  pages: string;
  totalDuration: string;
}

export const SEMANA_02_LESSON_11_METADATA: LessonMetadata = {
  week: 2,
  day: 'Dia 011',
  round: 'Rodada 11',
  chapter: 'Kapitel 5, Teil A (A1–A19)',
  title: 'Trennbare Verben, Perfekt (haben/sein), Modalverben (müssen/sollen), Uhrzeiten & Tagesablauf',
  pages: 'p. 110–119',
  totalDuration: '180 minutos (3 blocos de 60 min)',
};

// 1.1 Verbos Separáveis Comuns
export interface TrennbarVerb {
  verb: string;
  prefix: string;
  base: string;
  translation: string;
  examplePresent: string;
  examplePerfekt: string;
  translationPresent: string;
  translationPerfekt: string;
}

export const TRENNBARE_VERBEN_LIST: TrennbarVerb[] = [
  {
    verb: 'aufstehen',
    prefix: 'auf-',
    base: 'stehen',
    translation: 'levantar-se',
    examplePresent: 'Ich stehe jeden Morgen um 7.00 Uhr auf.',
    examplePerfekt: 'Ich bin um 7.00 Uhr aufgestanden.',
    translationPresent: 'Eu me levanto toda manhã às 7h.',
    translationPerfekt: 'Eu me levantei às 7h (auxiliar sein).',
  },
  {
    verb: 'einkaufen',
    prefix: 'ein-',
    base: 'kaufen',
    translation: 'fazer compras',
    examplePresent: 'Ich kaufe im Supermarkt ein.',
    examplePerfekt: 'Ich habe im Supermarkt eingekauft.',
    translationPresent: 'Eu faço compras no supermercado.',
    translationPerfekt: 'Eu fiz compras no supermercado.',
  },
  {
    verb: 'fernsehen',
    prefix: 'fern-',
    base: 'sehen',
    translation: 'assistir TV',
    examplePresent: 'Ich sehe abends fern.',
    examplePerfekt: 'Ich habe abends ferngesehen.',
    translationPresent: 'Eu assisto TV à noite.',
    translationPerfekt: 'Eu assisti TV à noite.',
  },
  {
    verb: 'anfangen',
    prefix: 'an-',
    base: 'fangen',
    translation: 'começar, iniciar',
    examplePresent: 'Die Arbeit fängt um 9.30 Uhr an.',
    examplePerfekt: 'Die Arbeit hat um 9.30 Uhr angefangen.',
    translationPresent: 'O trabalho começa às 9h30 (du fängst, er fängt).',
    translationPerfekt: 'O trabalho começou às 9h30.',
  },
  {
    verb: 'anrufen',
    prefix: 'an-',
    base: 'rufen',
    translation: 'telefonar para, ligar',
    examplePresent: 'Ich rufe meine Mutter an.',
    examplePerfekt: 'Ich habe meine Mutter angerufen.',
    translationPresent: 'Eu ligo para a minha mãe (exige acusativo!).',
    translationPerfekt: 'Eu liguei para a minha mãe.',
  },
  {
    verb: 'einladen',
    prefix: 'ein-',
    base: 'laden',
    translation: 'convidar',
    examplePresent: 'Ich lade meine Freunde ein.',
    examplePerfekt: 'Ich habe meine Freunde eingeladen.',
    translationPresent: 'Eu convido meus amigos (du lädst, er lädt).',
    translationPerfekt: 'Eu convidei meus amigos.',
  },
  {
    verb: 'abholen',
    prefix: 'ab-',
    base: 'holen',
    translation: 'buscar (alguém/algo)',
    examplePresent: 'Ich hole dich vom Bahnhof ab.',
    examplePerfekt: 'Ich habe dich vom Bahnhof abgeholt.',
    translationPresent: 'Eu busco você na estação ferroviária.',
    translationPerfekt: 'Eu busquei você na estação.',
  },
  {
    verb: 'aufräumen',
    prefix: 'auf-',
    base: 'räumen',
    translation: 'arrumar, organizar',
    examplePresent: 'Ich räume mein Zimmer auf.',
    examplePerfekt: 'Ich habe mein Zimmer aufgeräumt.',
    translationPresent: 'Eu arrumo meu quarto.',
    translationPerfekt: 'Eu arrumei meu quarto.',
  },
  {
    verb: 'zumachen',
    prefix: 'zu-',
    base: 'machen',
    translation: 'fechar (porta, janela)',
    examplePresent: 'Ich mache das Fenster zu.',
    examplePerfekt: 'Ich habe das Fenster zugemacht.',
    translationPresent: 'Eu fecho a janela.',
    translationPerfekt: 'Eu fechei a janela.',
  },
  {
    verb: 'aufmachen',
    prefix: 'auf-',
    base: 'machen',
    translation: 'abrir (porta, janela)',
    examplePresent: 'Ich mache die Tür auf.',
    examplePerfekt: 'Ich habe die Tür aufgemacht.',
    translationPresent: 'Eu abro a porta.',
    translationPerfekt: 'Eu abri a porta.',
  },
  {
    verb: 'einschlafen',
    prefix: 'ein-',
    base: 'schlafen',
    translation: 'adormecer, pegar no sono',
    examplePresent: 'Ich schlafe um 23.00 Uhr ein.',
    examplePerfekt: 'Ich bin um 23.00 Uhr eingeschlafen.',
    translationPresent: 'Eu adormeço às 23h (du schläfst ein).',
    translationPerfekt: 'Eu adormeci às 23h (auxiliar sein - mudança de estado).',
  },
  {
    verb: 'ausgehen',
    prefix: 'aus-',
    base: 'gehen',
    translation: 'sair (para passear/festa)',
    examplePresent: 'Ich gehe am Wochenende aus.',
    examplePerfekt: 'Ich bin am Wochenende ausgegangen.',
    translationPresent: 'Eu saio no final de semana.',
    translationPerfekt: 'Eu saí no final de semana (auxiliar sein).',
  },
  {
    verb: 'mitnehmen',
    prefix: 'mit-',
    base: 'nehmen',
    translation: 'levar consigo',
    examplePresent: 'Ich nehme meinen Regenschirm mit.',
    examplePerfekt: 'Ich habe meinen Regenschirm mitgenommen.',
    translationPresent: 'Eu levo meu guarda-chuva comigo (du nimmst mit).',
    translationPerfekt: 'Eu levei meu guarda-chuva comigo.',
  },
  {
    verb: 'zurückkommen',
    prefix: 'zurück-',
    base: 'kommen',
    translation: 'voltar, retornar',
    examplePresent: 'Ich komme in drei Tagen zurück.',
    examplePerfekt: 'Ich bin gestern zurückgekommen.',
    translationPresent: 'Eu volto em três dias.',
    translationPerfekt: 'Eu voltei ontem (auxiliar sein).',
  },
  {
    verb: 'weiterleiten',
    prefix: 'weiter-',
    base: 'leiten',
    translation: 'encaminhar (e-mail, chamada)',
    examplePresent: 'Ich leite die E-Mail an den Chef weiter.',
    examplePerfekt: 'Ich habe die E-Mail weitergeleitet.',
    translationPresent: 'Eu encaminho o e-mail ao chefe.',
    translationPerfekt: 'Eu encaminhei o e-mail.',
  },
];

// 1.2 Prefixos Inseparáveis
export interface InseparablePrefix {
  prefix: string;
  example: string;
  translation: string;
  presentSentence: string;
  perfektSentence: string;
  translationSentence: string;
}

export const INSEPARABLE_PREFIXES: InseparablePrefix[] = [
  {
    prefix: 'be-',
    example: 'beginnen / bezahlen / besuchen',
    translation: 'começar / pagar / visitar',
    presentSentence: 'Ich bezahle die Rechnung.',
    perfektSentence: 'Ich habe die Rechnung bezahlt (sem ge-!).',
    translationSentence: 'Eu pago a conta / Eu paguei a conta.',
  },
  {
    prefix: 'emp-',
    example: 'empfehlen',
    translation: 'recomendar',
    presentSentence: 'Der Kellner empfiehlt den Fisch.',
    perfektSentence: 'Er hat den Fisch empfohlen (sem ge-!).',
    translationSentence: 'O garçom recomenda o peixe / Ele recomendou.',
  },
  {
    prefix: 'ent-',
    example: 'entschuldigen',
    translation: 'desculpar(-se)',
    presentSentence: 'Ich entschuldige mich.',
    perfektSentence: 'Ich habe mich entschuldigt (sem ge-!).',
    translationSentence: 'Eu me desculpo / Eu me desculpei.',
  },
  {
    prefix: 'er-',
    example: 'erzählen',
    translation: 'contar, narrar',
    presentSentence: 'Er erzählt eine Geschichte.',
    perfektSentence: 'Er hat eine Geschichte erzählt (sem ge-!).',
    translationSentence: 'Ele conta uma história / Ele contou uma história.',
  },
  {
    prefix: 'ge-',
    example: 'gefallen',
    translation: 'agradar',
    presentSentence: 'Das Bild gefällt mir.',
    perfektSentence: 'Das Bild hat mir gefallen (sem ge- adicional!).',
    translationSentence: 'O quadro me agrada / O quadro me agradou.',
  },
  {
    prefix: 'miss-',
    example: 'missverstehen',
    translation: 'entender mal / equivocar-se',
    presentSentence: 'Du missverstehst mich.',
    perfektSentence: 'Du hast mich missverstanden (sem ge-!).',
    translationSentence: 'Você me entende mal / Você me entendeu mal.',
  },
  {
    prefix: 'ver-',
    example: 'vereinbaren / verstehen',
    translation: 'combinar, marcar / compreender',
    presentSentence: 'Ich vereinbare einen Termin mit dem Arzt.',
    perfektSentence: 'Ich habe einen Termin vereinbart (sem ge-!).',
    translationSentence: 'Eu marco uma consulta / Eu marquei uma consulta.',
  },
  {
    prefix: 'zer-',
    example: 'zerstören',
    translation: 'destruir',
    presentSentence: 'Der Sturm zerstört das Haus.',
    perfektSentence: 'Der Sturm hat das Haus zerstört (sem ge-!).',
    translationSentence: 'A tempestade destrói a casa / A tempestade destruiu a casa.',
  },
];

// 1.3 Perfekt haben vs. sein
export interface PerfektCategory {
  auxiliary: 'haben' | 'sein';
  rules: string[];
  examples: {
    infinitive: string;
    participle: string;
    translation: string;
    sentence: string;
  }[];
}

export const PERFEKT_COMPARISON: PerfektCategory[] = [
  {
    auxiliary: 'sein',
    rules: [
      'Verbos de movimento com deslocamento físico no espaço (Ortswechsel): gehen, fahren, fliegen, kommen.',
      'Verbos de mudança de estado físico/biológico (Zustandswechsel): aufstehen, einschlafen, aufwachen, sterben.',
      'Exceções estáticas cruciais: bleiben (ficou = ist geblieben), sein (foi/esteve = ist gewesen), werden (tornou-se = ist geworden).',
    ],
    examples: [
      { infinitive: 'gehen', participle: 'ist gegangen', translation: 'foi (a pé)', sentence: 'Er ist in die Kantine gegangen.' },
      { infinitive: 'fahren', participle: 'ist gefahren', translation: 'foi (de veículo)', sentence: 'Martin ist zur Arbeit gefahren.' },
      { infinitive: 'fliegen', participle: 'ist geflogen', translation: 'voou', sentence: 'Das Flugzeug ist gelandet / geflogen.' },
      { infinitive: 'kommen', participle: 'ist gekommen', translation: 'veio / chegou', sentence: 'Der Zug ist um 18.20 Uhr angekommen.' },
      { infinitive: 'aufstehen', participle: 'ist aufgestanden', translation: 'levantou-se', sentence: 'Ich bin um 7.00 Uhr aufgestanden.' },
      { infinitive: 'einschlafen', participle: 'ist eingeschlafen', translation: 'adormeceu', sentence: 'Er ist um 23.00 Uhr eingeschlafen.' },
      { infinitive: 'bleiben', participle: 'ist geblieben', translation: 'ficou, permaneceu', sentence: 'Sie ist zu Hause geblieben.' },
    ],
  },
  {
    auxiliary: 'haben',
    rules: [
      'Todos os verbos transitivos que regem objeto direto (Acusativo): essen, trinken, lesen, schreiben, kaufen, buchen.',
      'Todos os verbos reflexivos: sich beeilen, sich ausruhen, sich freuen.',
      'Verbos que expressam duração contínua de atividade/estado sem deslocamento: arbeiten, schlafen, leben, wohnen.',
    ],
    examples: [
      { infinitive: 'essen', participle: 'hat gegessen', translation: 'comeu', sentence: 'Er hat Fisch zum Abendessen gegessen.' },
      { infinitive: 'trinken', participle: 'hat getrunken', translation: 'bebeu', sentence: 'Wir haben Kaffee getrunken.' },
      { infinitive: 'lesen', participle: 'hat gelesen', translation: 'leu', sentence: 'Paula hat viele E-Mails gelesen.' },
      { infinitive: 'schreiben', participle: 'hat geschrieben', translation: 'escreveu', sentence: 'Ich habe das Angebot geschrieben.' },
      { infinitive: 'arbeiten', participle: 'hat gearbeitet', translation: 'trabalhou', sentence: 'Du hast wirklich hart gearbeitet!' },
      { infinitive: 'buchen', participle: 'hat gebucht', translation: 'reservou', sentence: 'Ich habe den Flug nach London gebucht.' },
      { infinitive: 'lösen', participle: 'hat gelöst', translation: 'resolveu', sentence: 'Oliver und ich haben das Problem gelöst.' },
    ],
  },
];

// 1.4 Modalverben müssen vs. sollen
export interface ModalConjugation {
  person: string;
  mussen: string;
  sollen: string;
}

export const MODAL_MUSSEN_SOLLEN: ModalConjugation[] = [
  { person: 'ich (1. Sg.)', mussen: 'muss', sollen: 'soll' },
  { person: 'du (2. Sg.)', mussen: 'musst', sollen: 'sollst' },
  { person: 'er / sie / es / man (3. Sg.)', mussen: 'muss', sollen: 'soll' },
  { person: 'wir (1. Pl.)', mussen: 'müssen', sollen: 'sollen' },
  { person: 'ihr (2. Pl.)', mussen: 'müsst', sollen: 'sollt' },
  { person: 'sie (3. Pl.)', mussen: 'müssen', sollen: 'sollen' },
  { person: 'Sie (Höflichkeit)', mussen: 'müssen', sollen: 'sollen' },
];

// 1.7 Preposições Temporais
export interface TemporalPrep {
  prep: string;
  usage: string;
  example: string;
  translation: string;
}

export const TEMPORALE_PRAEPOSITIONEN: TemporalPrep[] = [
  { prep: 'am (+ Dativo)', usage: 'Dias da semana, períodos do dia (exceto in der Nacht), datas', example: 'am Montag, am Vormittag, am Wochenende', translation: 'na segunda-feira, de manhã, no fim de semana' },
  { prep: 'im (+ Dativo)', usage: 'Meses, estações do ano, anos', example: 'im Januar, im Sommer, im Herbst', translation: 'em janeiro, no verão, no outono' },
  { prep: 'um (+ Acusativo)', usage: 'Horário exato e pontual do relógio', example: 'um 15.00 Uhr, um Viertel vor acht', translation: 'às 15h00, às quinze para as oito' },
  { prep: 'von ... bis', usage: 'Período contínuo com início e fim demarcados', example: 'von 9.00 bis 18.00 Uhr, von Montag bis Freitag', translation: 'das 9h às 18h, de segunda a sexta-feira' },
  { prep: 'vor (+ Dativo)', usage: 'Antes de um evento/momento temporal', example: 'vor dem Essen, vor der Arbeit', translation: 'antes da refeição, antes do trabalho' },
  { prep: 'nach (+ Dativo)', usage: 'Depois de um evento/momento temporal', example: 'nach dem Essen, nach der Besprechung', translation: 'depois da comida, depois da reunião' },
  { prep: 'seit (+ Dativo)', usage: 'Ação que começou no passado e ainda continua no presente', example: 'seit drei Jahren, seit gestern', translation: 'há três anos / desde três anos, desde ontem' },
  { prep: 'in (+ Dativo)', usage: 'Dentro de determinado prazo no futuro', example: 'in drei Tagen, in einer Stunde', translation: 'daqui a três dias / em três dias, em uma hora' },
];

// 2.1 Texto A1: Was macht Martin?
export const TEXT_A1_PARAGRAPHS = [
  {
    de: 'Um 8.00 Uhr steht Martin auf. Um 8.30 Uhr isst Martin Frühstück. Um 9.00 Uhr fährt Martin zur Arbeit.',
    pt: 'Às 8h00 Martin se levanta. Às 8h30 Martin toma café da manhã. Às 9h00 Martin vai de carro/transporte para o trabalho.',
  },
  {
    de: 'Die Arbeit im Büro fängt um 9.30 Uhr an. Martin liest und schreibt viele E-Mails.',
    pt: 'O trabalho no escritório começa às 9h30. Martin lê e escreve muitos e-mails.',
  },
  {
    de: 'Um 10.30 Uhr ruft er Frau Körner an und vereinbart einen Termin. Danach präsentiert er ein Projekt.',
    pt: 'Às 10h30 ele telefona para a Sra. Körner e combina um compromisso. Depois ele apresenta um projeto.',
  },
  {
    de: 'Von 13.00 bis 13.30 Uhr macht Martin Mittagspause. Er geht in die Kantine.',
    pt: 'Das 13h00 às 13h30 Martin faz pausa para o almoço. Ele vai à cantina.',
  },
  {
    de: 'Von 13.30 bis 17.30 Uhr arbeitet Martin wieder. Er hat eine Besprechung mit Frau Müller. Dann übersetzt er noch zwei E-Mails aus Italien.',
    pt: 'Das 13h30 às 17h30 Martin trabalha novamente. Ele tem uma reunião com a Sra. Müller. Depois ele traduz ainda dois e-mails da Itália.',
  },
  {
    de: 'Um 17.30 Uhr hat Martin Feierabend. Er fährt in die Stadt und kauft im Supermarkt ein. Zu Hause kocht er Fisch zum Abendessen.',
    pt: 'Às 17h30 Martin encerra o expediente (Feierabend). Ele vai à cidade e faz compras no supermercado. Em casa ele cozinha peixe para o jantar.',
  },
  {
    de: 'Ab 19.00 Uhr sieht Martin fern. Er sieht Nachrichten und einen Spielfilm. Um 22.30 Uhr geht er ins Bett.',
    pt: 'A partir das 19h00 Martin assiste televisão. Ele vê o telejornal e um longa-metragem. Às 22h30 ele vai para a cama.',
  },
];

// 2.4 Horários (Wie spät ist es?)
export interface ClockTime {
  digital: string;
  formal: string;
  colloquial: string;
  pt: string;
}

export const CLOCK_TIMES: ClockTime[] = [
  { digital: '13:00', formal: '13.00 Uhr / ein Uhr', colloquial: 'Es ist eins.', pt: 'É uma hora / São 13 horas.' },
  { digital: '14:30', formal: '14.30 Uhr (vierzehn Uhr dreißig)', colloquial: 'Es ist halb drei.', pt: 'São duas e meia (atenção: halb + a hora que VEM, 3!).' },
  { digital: '17:15', formal: '17.15 Uhr (siebzehn Uhr fünfzehn)', colloquial: 'Es ist Viertel nach fünf.', pt: 'São cinco e quinze / um quarto passado das cinco.' },
  { digital: '18:45', formal: '18.45 Uhr (achtzehn Uhr fünfundvierzig)', colloquial: 'Es ist Viertel vor sieben.', pt: 'São quinze para as sete / um quarto para as sete.' },
  { digital: '16:10', formal: '16.10 Uhr (sechzehn Uhr zehn)', colloquial: 'Es ist zehn nach vier.', pt: 'São quatro e dez / dez minutos após as quatro.' },
  { digital: '20:55', formal: '20.55 Uhr (zwanzig Uhr fünfundfünfzig)', colloquial: 'Es ist fünf vor neun.', pt: 'São cinco para as nove.' },
];

// 2.12 Texto A14: Paula e Max Schneider
export interface DialogueLine {
  speaker: string;
  de: string;
  pt: string;
}

export const DIALOGUE_PAULA_MAX: DialogueLine[] = [
  { speaker: 'Max Schneider', de: 'Wie war dein Tag, Paula?', pt: 'Como foi seu dia, Paula?' },
  { speaker: 'Paula Schneider', de: 'Danke, gut.', pt: 'Obrigada, bom.' },
  { speaker: 'Max Schneider', de: 'Was hast du gemacht?', pt: 'O que você fez?' },
  { speaker: 'Paula Schneider', de: 'Nichts Besonderes. Ich habe sehr viele E-Mails gelesen und geschrieben.', pt: 'Nada de especial. Li e escrevi muitíssimos e-mails.' },
  { speaker: 'Paula Schneider', de: 'Hast du mit deinen Kollegen über das neue Projekt gesprochen?', pt: 'Você conversou com os seus colegas sobre o novo projeto?' },
  { speaker: 'Max Schneider', de: 'Ja, zuerst haben wir Kaffee getrunken, dann haben wir über das Projekt gesprochen. Viele Kollegen finden es sehr interessant. Ich hatte auch eine Besprechung mit Gästen aus Italien. Danach haben wir im Restaurant „Roma“ etwas gegessen.', pt: 'Sim, primeiro tomamos café, depois conversamos sobre o projeto. Muitos colegas o acham muito interessante. Eu também tive uma reunião com convidados da Itália. Depois comemos algo no restaurante "Roma".' },
  { speaker: 'Max Schneider', de: 'War das Essen gut?', pt: 'A comida estava boa?' },
  { speaker: 'Paula Schneider', de: 'Sehr gut.', pt: 'Muito boa.' },
  { speaker: 'Max Schneider', de: 'Hast du dein Computerproblem gelöst?', pt: 'Você resolveu seu problema de computador?' },
  { speaker: 'Paula Schneider', de: 'Ja, Oliver und ich haben das Problem gemeinsam gelöst. Danach bin ich noch nach Erding gefahren. Dort wohnt eine Kundin.', pt: 'Sim, o Oliver e eu resolvemos o problema juntos. Depois eu ainda fui a Erding. Lá mora uma cliente.' },
  { speaker: 'Max Schneider', de: 'Du hast wirklich hart gearbeitet!', pt: 'Você realmente trabalhou duro!' },
  { speaker: 'Paula Schneider', de: 'Ja, den Flug nach London habe ich auch schon gebucht. Und was hast du heute gemacht?', pt: 'Sim, e o voo para Londres eu também já reservei. E o que você fez hoje?' },
  { speaker: 'Max Schneider', de: 'Ich hatte meinen freien Tag, das heißt, ich habe einfach mal nichts gemacht.', pt: 'Eu tive meu dia de folga, ou seja, eu simplesmente não fiz nada.' },
];

// 2.17 Tabela Lexical Primária (29 Termos)
export interface LexicalTerm {
  word: string;
  articleClass: string;
  plural: string;
  translation: string;
  modelSentence: string;
}

export const VOCABULARIO_AULA_11: LexicalTerm[] = [
  { word: 'der Tagesablauf', articleClass: 'Subst. masc.', plural: 'die Tagesabläufe', translation: 'rotina diária / decurso do dia', modelSentence: 'Mein Tagesablauf ist streng strukturiert.' },
  { word: 'die Arbeit', articleClass: 'Subst. fem.', plural: 'die Arbeiten', translation: 'trabalho / serviço', modelSentence: 'Die Arbeit im Büro fängt um 9.30 Uhr an.' },
  { word: 'das Büro', articleClass: 'Subst. neutro', plural: 'die Büros', translation: 'escritório', modelSentence: 'Martin arbeitet in einem modernen Büro.' },
  { word: 'die E-Mail', articleClass: 'Subst. fem.', plural: 'die E-Mails', translation: 'e-mail / correio eletrônico', modelSentence: 'Martin liest und schreibt viele E-Mails.' },
  { word: 'der Termin', articleClass: 'Subst. masc.', plural: 'die Termine', translation: 'compromisso / consulta agendada', modelSentence: 'Er vereinbart einen Termin mit Frau Körner.' },
  { word: 'das Projekt', articleClass: 'Subst. neutro', plural: 'die Projekte', translation: 'projeto', modelSentence: 'Danach präsentiert er das neue Projekt.' },
  { word: 'die Mittagspause', articleClass: 'Subst. fem.', plural: 'die Mittagspausen', translation: 'pausa para almoço', modelSentence: 'Von 13.00 bis 13.30 Uhr macht er Mittagspause.' },
  { word: 'die Kantine', articleClass: 'Subst. fem.', plural: 'die Kantinen', translation: 'refeitório / cantina corporativa', modelSentence: 'Er geht mit den Kollegen in die Kantine.' },
  { word: 'die Besprechung', articleClass: 'Subst. fem.', plural: 'die Besprechungen', translation: 'reunião profissional', modelSentence: 'Er hat eine wichtige Besprechung mit Frau Müller.' },
  { word: 'der Feierabend', articleClass: 'Subst. masc.', plural: 'die Feierabende', translation: 'fim de expediente / hora de largar', modelSentence: 'Um 17.30 Uhr hat Martin endlich Feierabend.' },
  { word: 'der Supermarkt', articleClass: 'Subst. masc.', plural: 'die Supermärkte', translation: 'supermercado', modelSentence: 'Er kauft im Supermarkt für das Abendessen ein.' },
  { word: 'das Abendessen', articleClass: 'Subst. neutro', plural: 'die Abendessen', translation: 'jantar', modelSentence: 'Zu Hause kocht er frischen Fisch zum Abendessen.' },
  { word: 'die Nachrichten', articleClass: 'Subst. fem. (Plural)', plural: 'die Nachrichten', translation: 'notícias / telejornal', modelSentence: 'Er sieht jeden Abend um 20.00 Uhr die Nachrichten.' },
  { word: 'der Spielfilm', articleClass: 'Subst. masc.', plural: 'die Spielfilme', translation: 'filme de ficção / longa-metragem', modelSentence: 'Danach schaut er einen spannenden Spielfilm.' },
  { word: 'das Bett', articleClass: 'Subst. neutro', plural: 'die Betten', translation: 'cama', modelSentence: 'Um 22.30 Uhr geht er müde ins Bett.' },
  { word: 'die Uhrzeit', articleClass: 'Subst. fem.', plural: 'die Uhrzeiten', translation: 'horário / hora do relógio', modelSentence: 'Notieren Sie bitte die genaue Uhrzeit.' },
  { word: 'die Stunde', articleClass: 'Subst. fem.', plural: 'die Stunden', translation: 'hora (duração de 60 min)', modelSentence: 'Eine Stunde dauert genau sechzig Minuten.' },
  { word: 'die Minute', articleClass: 'Subst. fem.', plural: 'die Minuten', translation: 'minuto', modelSentence: 'Eine halbe Stunde dauert dreißig Minuten.' },
  { word: 'der Vormittag', articleClass: 'Subst. masc.', plural: 'die Vormittage', translation: 'manhã (antes do meio-dia)', modelSentence: 'Am Vormittag arbeite ich konzentriert im Büro.' },
  { word: 'der Nachmittag', articleClass: 'Subst. masc.', plural: 'die Nachmittage', translation: 'tarde (após o meio-dia)', modelSentence: 'Am Nachmittag lerne ich zwei Stunden Deutsch.' },
  { word: 'der Abend', articleClass: 'Subst. masc.', plural: 'die Abende', translation: 'noite / entardecer', modelSentence: 'Am Abend sehe ich fern und koche.' },
  { word: 'die Nacht', articleClass: 'Subst. fem.', plural: 'die Nächte', translation: 'noite (período de sono)', modelSentence: 'In der Nacht schlafe ich acht Stunden.' },
  { word: 'der Montag', articleClass: 'Subst. masc.', plural: 'die Montage', translation: 'segunda-feira', modelSentence: 'Am Montag fängt meine Arbeitswoche an.' },
  { word: 'der Dienstag', articleClass: 'Subst. masc.', plural: 'die Dienstage', translation: 'terça-feira', modelSentence: 'Am Dienstag habe ich einen Zahnarzttermin.' },
  { word: 'der Mittwoch', articleClass: 'Subst. masc.', plural: 'die Mittwoche', translation: 'quarta-feira', modelSentence: 'Am Mittwoch mache ich Sport.' },
  { word: 'der Donnerstag', articleClass: 'Subst. masc.', plural: 'die Donnerstage', translation: 'quinta-feira', modelSentence: 'Am Donnerstag koche ich mit Freunden.' },
  { word: 'der Freitag', articleClass: 'Subst. masc.', plural: 'die Freitage', translation: 'sexta-feira', modelSentence: 'Am Freitag freue ich mich auf das Wochenende.' },
  { word: 'der Samstag', articleClass: 'Subst. masc.', plural: 'die Samstage', translation: 'sábado', modelSentence: 'Am Samstag schlafe ich gerne lange aus.' },
  { word: 'der Sonntag', articleClass: 'Subst. masc.', plural: 'die Sonntage', translation: 'domingo', modelSentence: 'Am Sonntag ruhe ich mich im Park aus.' },
];

// 2.18 Expressões Coloquiais (Umgangssprache)
export interface ColloquialExpression {
  expression: string;
  translation: string;
  context: string;
}

export const UMGANGSSPRACHE_AULA_11: ColloquialExpression[] = [
  { expression: 'Schönen Feierabend!', translation: 'Bom fim de expediente / bom descanso!', context: 'Ao sair do escritório despedindo-se dos colegas.' },
  { expression: 'Ich muss los.', translation: 'Tenho que ir / preciso vazar.', context: 'Despedida com urgência.' },
  { expression: 'Bis später!', translation: 'Até mais tarde!', context: 'Despedida informal para quem se verá no mesmo dia.' },
  { expression: 'Was gibt\'s?', translation: 'O que há? / Novidades?', context: 'Cumprimento informal entre amigos ou colegas.' },
  { expression: 'Keine Ahnung.', translation: 'Não faço a menor ideia / sei lá.', context: 'Resposta espontânea a uma dúvida.' },
  { expression: 'Alles klar!', translation: 'Tudo certo! / Combinado!', context: 'Confirmação e alinhamento imediato.' },
  { expression: 'Ich habe es eilig.', translation: 'Estou com muita pressa.', context: 'Justificativa de rapidez ou recusa pontual.' },
  { expression: 'Ich bin im Stress.', translation: 'Estou atolado / estressado com prazos.', context: 'Cotidiano corporativo ou acadêmico.' },
  { expression: 'Ich muss noch etwas erledigen.', translation: 'Ainda tenho que resolver uma pendência.', context: 'Antes de sair do trabalho ou ir para casa.' },
  { expression: 'Ich mache jetzt Feierabend.', translation: 'Vou encerrar meu expediente agora.', context: 'Desligando o computador no trabalho.' },
  { expression: 'Ich habe einen festen Termin.', translation: 'Tenho um compromisso marcado com hora.', context: 'Recusa polida de reunião imprevista.' },
  { expression: 'Ich muss den Termin absagen.', translation: 'Preciso cancelar o compromisso.', context: 'Gestão de agenda profissional.' },
  { expression: 'Der Termin passt mir gut.', translation: 'Esse horário me cai super bem.', context: 'Concordando com proposta de reunião.' },
  { expression: 'Ich habe gerade keine Zeit.', translation: 'Estou sem tempo agora.', context: 'Priorização de tarefas urgentes.' },
  { expression: 'Ich rufe dich später zurück.', translation: 'Te ligo de volta mais tarde.', context: 'No telefone ao não poder atender no momento.' },
  { expression: 'Kann ich dich kurz sprechen?', translation: 'Posso falar com você rapidinho?', context: 'Abordagem respeitosa a um colega no escritório.' },
  { expression: 'Ich bin gleich wieder da.', translation: 'Já volto num segundo.', context: 'Ausentando-se momentaneamente da mesa.' },
  { expression: 'Ich muss mich beeilen.', translation: 'Tenho que me apressar.', context: 'Corrida contra o relógio para pegar transporte.' },
  { expression: 'Ich habe leider verschlafen.', translation: 'Infelizmente perdi a hora / dormi demais.', context: 'Justificativa sincera para um atraso matinal.' },
  { expression: 'Ich stehe unter Zeitdruck.', translation: 'Estou sob extrema pressão de tempo/prazo.', context: 'Momentos críticos de entrega de relatórios/projetos.' },
];

// 3.1–3.10 Gabarito dos Exercícios do Livro
export interface BookExercise {
  id: string;
  title: string;
  page: string;
  description: string;
  items: {
    number: string;
    question: string;
    answer: string;
    notes?: string;
  }[];
}

export const BOOK_EXERCISES_AULA_11: BookExercise[] = [
  {
    id: 'ex-a2',
    title: 'Exercício A2: Verben mit und ohne Präfix (p. 111)',
    page: 'p. 111',
    description: 'Completar a rotina diária de Martin com os verbos corretos no infinitivo.',
    items: [
      { number: '0', question: 'um 8.00 Uhr:', answer: 'aufstehen (levantar-se - separável)' },
      { number: '1', question: '8.30 Uhr:', answer: 'frühstücken (tomar café da manhã)' },
      { number: '2', question: '9.00 Uhr:', answer: 'zur Arbeit fahren (ir ao trabalho)' },
      { number: '3', question: '9.30 Uhr:', answer: 'anfangen, E-Mails lesen und schreiben (começar, ler e escrever e-mails)' },
      { number: '4', question: '10.30 Uhr:', answer: 'Frau Körner anrufen, einen Termin vereinbaren (ligar - separável; marcar - inseparável)' },
      { number: '5', question: '13.00 Uhr:', answer: 'Mittagspause machen, in die Kantine gehen (fazer almoço, ir à cantina)' },
      { number: '6', question: '13.30 Uhr:', answer: 'eine Besprechung haben, zwei E-Mails übersetzen (ter reunião, traduzir e-mails)' },
      { number: '7', question: '17.30 Uhr:', answer: 'Feierabend haben, in die Stadt fahren, im Supermarkt einkaufen, Fisch kochen' },
      { number: '8', question: '19.00 Uhr:', answer: 'fernsehen, einen Spielfilm sehen (assistir TV - separável; ver filme)' },
      { number: '9', question: '22.30 Uhr:', answer: 'ins Bett gehen (ir para a cama)' },
    ],
  },
  {
    id: 'ex-a6',
    title: 'Exercício A6: Wann ...? Horários Exatos (p. 113)',
    page: 'p. 113',
    description: 'Respostas auditivas estruturadas para marcação precisa do tempo.',
    items: [
      { number: '0', question: 'Wann kommst du?', answer: 'Ich komme um 9.55 Uhr (fünf vor zehn).' },
      { number: '1', question: 'Wann fängt das Konzert an?', answer: 'Es fängt um 20.00 Uhr an.' },
      { number: '2', question: 'Wie spät ist es?', answer: 'Es ist 15.30 Uhr (halb vier).' },
      { number: '3', question: 'Wann landet das Flugzeug?', answer: 'Es landet um 14.45 Uhr (Viertel vor drei).' },
      { number: '4', question: 'Wann öffnet das Museum?', answer: 'Das Museum öffnet um 9.00 Uhr.' },
      { number: '5', question: 'Wann beginnt der Unterricht?', answer: 'Der Unterricht beginnt um 8.30 Uhr (halb neun).' },
      { number: '6', question: 'Wann fährt dein Bus?', answer: 'Mein Bus fährt um 7.15 Uhr (Viertel nach sieben).' },
      { number: '7', question: 'Wann können wir uns treffen?', answer: 'Morgen früh um 10.00 Uhr.' },
      { number: '8', question: 'Wann kommt der Zug aus Berlin an?', answer: 'Der Zug aus Berlin kommt um 18.20 Uhr in Leipzig an.' },
    ],
  },
  {
    id: 'ex-a7',
    title: 'Exercício A7: Wie lange dauert ...? Duração e Horários (p. 113)',
    page: 'p. 113',
    description: 'Cálculo de duração em horas e minutos, abertura de museus e voos.',
    items: [
      { number: 'A7-Dur-1', question: 'Wie lange dauert 1 Stunde?', answer: '60 Minuten.' },
      { number: 'A7-Dur-2', question: 'Wie lange dauert ½ Stunde?', answer: '30 Minuten.' },
      { number: 'A7-Dur-3', question: 'Wie lange dauern 2 Stunden?', answer: '120 Minuten.' },
      { number: 'A7-Dur-4', question: 'Wie lange dauern 1 ½ Stunden?', answer: '90 Minuten (anderthalb Stunden).' },
      { number: 'A7-Dur-5', question: 'Wie lange dauern 2 ½ Stunden?', answer: '150 Minuten (zweieinhalb Stunden).' },
      { number: 'A7-1', question: 'Wann fängt das Konzert an?', answer: 'Um 19.30 Uhr.' },
      { number: 'A7-2', question: 'Wie lange dauert das Konzert?', answer: '2,5 Stunden (von 19.30 bis 22.00 Uhr).' },
      { number: 'A7-3', question: 'Wann landet das Flugzeug aus München?', answer: 'Um 19.30 Uhr.' },
      { number: 'A7-4', question: 'Wie lange dauert der Flug München–Madrid?', answer: '3 Stunden (von 16.30 bis 19.30 Uhr).' },
      { number: 'A7-5', question: 'Wann öffnet / schließt das Fotomuseum?', answer: 'Es öffnet um 14.00 Uhr und schließt um 18.00 Uhr (4 Stunden).' },
      { number: 'A7-6', question: 'Wann beginnt der Deutschunterricht?', answer: 'Um 18.30 Uhr (er dauert 2,5 Stunden bis 21.00 Uhr).' },
      { number: 'A7-7', question: 'Wann fährt dein Bus und wie lange fährst du?', answer: 'Um 17.32 Uhr; ich fahre 30 Minuten (bis 18.02 Uhr).' },
      { number: 'A7-8', question: 'Wann beginnt Ihre Arbeit / Wie viele Stunden arbeiten Sie?', answer: 'Um 9.00 Uhr; ich arbeite 8 Stunden am Tag (bis 17.00 Uhr).' },
      { number: 'A7-9', question: 'Wie lange schläfst du?', answer: '8 Stunden (von 23.00 bis 7.00 Uhr).' },
    ],
  },
  {
    id: 'ex-a9',
    title: 'Exercício A9: Wer muss etwas tun? Necessidade Pessoal (p. 114)',
    page: 'p. 114',
    description: 'Satzbau com o modalverb müssen: Posição II conjugado, infinitivo no final absoluto da frase.',
    items: [
      { number: '0', question: 'Martin (55 E-Mails beantworten)', answer: 'Martin muss heute 55 E-Mails beantworten.' },
      { number: '1', question: 'ich (einen Termin mit Frau Kümmel vereinbaren)', answer: 'Ich muss einen Termin mit Frau Kümmel vereinbaren.' },
      { number: '2', question: 'Irina (zwei Kollegen in München anrufen)', answer: 'Irina muss zwei Kollegen in München anrufen.' },
      { number: '3', question: 'du (ein Gespräch über das neue Projekt führen)', answer: 'Du musst ein Gespräch über das neue Projekt führen.' },
      { number: '4', question: 'wir (ein Angebot für die Firma MEFA schreiben)', answer: 'Wir müssen ein Angebot für die Firma MEFA schreiben.' },
      { number: '5', question: 'Otto (den Computer reparieren)', answer: 'Otto muss den Computer reparieren.' },
      { number: '6', question: 'ich (meine E-Mails lesen)', answer: 'Ich muss meine E-Mails lesen.' },
      { number: '7', question: 'ihr (Gäste begrüßen)', answer: 'Ihr müsst Gäste begrüßen.' },
    ],
  },
  {
    id: 'ex-a10',
    title: 'Exercício A10: Wer soll etwas tun? Ordens da Chefe Frau Weber (p. 114)',
    page: 'p. 114',
    description: 'Satzbau com o modalverb sollen: ordem ou incumbência vinda de outra pessoa.',
    items: [
      { number: '1', question: 'die Assistentin (für Frau Weber ein Hotelzimmer buchen)', answer: 'Die Assistentin soll für Frau Weber ein Hotelzimmer buchen.' },
      { number: '2', question: 'du (einen Tisch im Restaurant für zwei Personen reservieren)', answer: 'Du sollst einen Tisch im Restaurant für zwei Personen reservieren.' },
      { number: '3', question: 'Maria (zwei E-Mails aus Portugal übersetzen)', answer: 'Maria soll zwei E-Mails aus Portugal übersetzen.' },
      { number: '4', question: 'ich (einen Blumenstrauß für Frau Krause bestellen)', answer: 'Ich soll einen Blumenstrauß für Frau Krause bestellen.' },
      { number: '5', question: 'Peter (Herrn McDonald in Amerika anrufen)', answer: 'Peter soll Herrn McDonald in Amerika anrufen.' },
      { number: '6', question: 'ihr (den Termin mit Frau Kümmel absagen)', answer: 'Ihr sollt den Termin mit Frau Kümmel absagen.' },
      { number: '7', question: 'Hans (ein Computerproblem lösen)', answer: 'Hans soll ein Computerproblem lösen.' },
    ],
  },
  {
    id: 'ex-a12',
    title: 'Exercício A12: Was soll ich machen? Ofertas de Ajuda (p. 115)',
    page: 'p. 115',
    description: 'Perguntas com sollen para oferecer assistência solícita.',
    items: [
      { number: '0', question: 'Spaghetti kochen', answer: 'Soll ich zum Mittag Spaghetti kochen?' },
      { number: '1', question: 'das Fenster öffnen', answer: 'Soll ich das Fenster öffnen?' },
      { number: '2', question: 'den Computer reparieren', answer: 'Soll ich den Computer reparieren?' },
      { number: '3', question: 'den Brief übersetzen', answer: 'Soll ich den Brief übersetzen?' },
      { number: '4', question: 'Eintrittskarten kaufen', answer: 'Soll ich Eintrittskarten kaufen?' },
      { number: '5', question: 'den Fernseher einschalten', answer: 'Soll ich den Fernseher einschalten?' },
      { number: '6', question: 'die E-Mail schreiben', answer: 'Soll ich die E-Mail schreiben?' },
      { number: '7', question: 'ein Hotelzimmer buchen', answer: 'Soll ich ein Hotelzimmer buchen?' },
      { number: '8', question: 'zwei Plätze im Restaurant reservieren', answer: 'Soll ich zwei Plätze im Restaurant „Edel“ reservieren?' },
    ],
  },
  {
    id: 'ex-a14',
    title: 'Exercício A14: Was hat Paula gemacht? Perfekt no Diálogo (p. 116)',
    page: 'p. 116',
    description: 'Partizip II e auxiliar haben vs. sein nas ações do dia de Paula.',
    items: [
      { number: '1', question: 'lesen', answer: 'Ich habe sehr viele E-Mails gelesen (hat gelesen).' },
      { number: '2', question: 'schreiben', answer: 'Ich habe sehr viele E-Mails geschrieben (hat geschrieben).' },
      { number: '3', question: 'sprechen', answer: 'Wir haben über das Projekt gesprochen (hat gesprochen).' },
      { number: '4', question: 'trinken', answer: 'Zuerst haben wir Kaffee getrunken (hat getrunken).' },
      { number: '5', question: 'essen', answer: 'Wir haben im Restaurant „Roma“ etwas gegessen (hat gegessen).' },
      { number: '6', question: 'lösen', answer: 'Oliver und ich haben das Problem gemeinsam gelöst (hat gelöst).' },
      { number: '7', question: 'fahren', answer: 'Danach bin ich noch nach Erding gefahren (ist gefahren - sein!).' },
      { number: '8', question: 'buchen', answer: 'Den Flug nach London habe ich auch schon gebucht (hat gebucht).' },
      { number: '9', question: 'machen', answer: 'Ich habe einfach mal nichts gemacht (hat gemacht).' },
    ],
  },
  {
    id: 'ex-a16',
    title: 'Exercício A16: Was haben Sie gemacht? Perguntas e Respostas Positivas (p. 117)',
    page: 'p. 117',
    description: 'Treino intensivo de resposta afirmativa no Perfekt.',
    items: [
      { number: '0', question: 'Radio hören', answer: 'Haben Sie Radio gehört? — Ja, ich habe Radio gehört.' },
      { number: '1', question: 'eine Pause machen', answer: 'Haben Sie eine Pause gemacht? — Ja, ich habe eine Pause gemacht.' },
      { number: '2', question: 'zur Arbeit fahren', answer: 'Sind Sie zur Arbeit gefahren? — Ja, ich bin zur Arbeit gefahren (sein!).' },
      { number: '3', question: 'ein Problem lösen', answer: 'Haben Sie ein Problem gelöst? — Ja, ich habe ein Problem gelöst.' },
      { number: '4', question: 'hart arbeiten', answer: 'Haben Sie hart gearbeitet? — Ja, ich habe hart gearbeitet.' },
      { number: '5', question: 'einen Roman lesen', answer: 'Haben Sie einen Roman gelesen? — Ja, ich habe einen Roman gelesen.' },
      { number: '6', question: 'viele E-Mails schreiben', answer: 'Haben Sie viele E-Mails geschrieben? — Ja, ich habe viele E-Mails geschrieben.' },
      { number: '7', question: 'im Restaurant essen', answer: 'Haben Sie im Restaurant gegessen? — Ja, ich habe im Restaurant gegessen.' },
      { number: '8', question: 'einen Tee trinken', answer: 'Haben Sie einen Tee getrunken? — Ja, ich habe einen Tee getrunken.' },
      { number: '9', question: 'eine Reise buchen', answer: 'Haben Sie eine Reise gebucht? — Ja, ich habe eine Reise gebucht.' },
      { number: '10', question: 'über ein Projekt sprechen', answer: 'Haben Sie über ein Projekt gesprochen? — Ja, ich habe über ein Projekt gesprochen.' },
    ],
  },
  {
    id: 'ex-a19',
    title: 'Exercício A19: Dialoge com "schon" no Perfekt (p. 119)',
    page: 'p. 119',
    description: 'Perguntas com o advérbio schon ("já") e respostas afirmativas no Perfekt.',
    items: [
      { number: '0', question: 'Hat Sabine das Essen schon (kochen)?', answer: 'Ja, sie hat das Essen schon gekocht.' },
      { number: '1', question: 'Hast du schon etwas (essen)?', answer: 'Ja, ich habe schon etwas gegessen.' },
      { number: '2', question: 'Hast du die E-Mail schon (schreiben)?', answer: 'Ja, ich habe die E-Mail schon geschrieben.' },
      { number: '3', question: 'Habt ihr die Hausaufgaben schon (machen)?', answer: 'Ja, wir haben die Hausaufgaben schon gemacht.' },
      { number: '4', question: 'Hast du das Buch schon (lesen)?', answer: 'Ja, ich habe das Buch schon gelesen.' },
      { number: '5', question: 'Hat Susanne die Kollegen in München schon (anrufen)?', answer: 'Ja, sie hat die Kollegen schon angerufen.' },
      { number: '6', question: 'Ist Paula schon zur Arbeit (fahren)?', answer: 'Ja, sie ist schon zur Arbeit gefahren (sein!).' },
      { number: '7', question: 'Hast du schon den Termin mit Frau Kümmel (vereinbaren)?', answer: 'Ja, ich habe den Termin schon vereinbart.' },
      { number: '8', question: 'Hat Maria die E-Mails aus Portugal schon (übersetzen)?', answer: 'Ja, sie hat die E-Mails schon übersetzt.' },
      { number: '9', question: 'Hast du für heute Abend schon (einkaufen)?', answer: 'Ja, ich habe schon eingekauft.' },
      { number: '10', question: 'Habt ihr den Film schon (sehen)?', answer: 'Ja, wir haben den Film schon gesehen.' },
      { number: '11', question: 'Hat Otto das Projekt schon (präsentieren)?', answer: 'Ja, er hat das Projekt schon präsentiert.' },
      { number: '12', question: 'Wann bist du (aufstehen)?', answer: 'Ich bin um 7.00 Uhr aufgestanden (sein!).' },
    ],
  },
];

// 3.11–3.12 Tradução Reversa de Blindagem (10 Desafios)
export interface ReverseTranslationItem {
  id: number;
  pt: string;
  deExpected: string;
  grammaticalBreakdown: string;
}

export const REVERSE_TRANSLATION_CHALLENGES_L11: ReverseTranslationItem[] = [
  {
    id: 1,
    pt: 'Eu me levanto às 7h. Eu tomo café da manhã às 7h30. Eu vou para o trabalho às 8h.',
    deExpected: 'Ich stehe um 7.00 Uhr auf. Ich frühstücke um 7.30 Uhr. Ich fahre um 8.00 Uhr zur Arbeit.',
    grammaticalBreakdown: 'aufstehen é separável: stehe ... auf; frühstücken é regular: frühstücke; fahren com destino com preposição zu (+ Dat. der Arbeit = zur Arbeit).',
  },
  {
    id: 2,
    pt: 'Eu trabalho das 9h às 17h. Eu tenho uma reunião às 10h.',
    deExpected: 'Ich arbeite von 9.00 bis 17.00 Uhr. Ich habe um 10.00 Uhr eine Besprechung.',
    grammaticalBreakdown: 'Período temporal exige "von ... bis"; horário pontual exige "um"; uma reunião feminina no acusativo: "eine Besprechung".',
  },
  {
    id: 3,
    pt: 'Eu faço uma pausa para o almoço das 12h30 às 13h. Eu vou à cantina.',
    deExpected: 'Ich mache von 12.30 bis 13.00 Uhr Mittagspause. Ich gehe in die Kantine.',
    grammaticalBreakdown: 'Expressão idiomática "Mittagspause machen"; deslocamento físico com acusativo de direção: "in die Kantine gehen".',
  },
  {
    id: 4,
    pt: 'Eu faço compras no supermercado depois do trabalho. Eu cozinho o jantar em casa.',
    deExpected: 'Ich kaufe nach der Arbeit im Supermarkt ein. Ich koche zu Hause das Abendessen.',
    grammaticalBreakdown: 'einkaufen é separável: kaufe ... ein; nach rege dativo (nach der Arbeit); lugar de repouso: "zu Hause".',
  },
  {
    id: 5,
    pt: 'Eu assisto TV à noite. Eu vejo notícias e um filme.',
    deExpected: 'Ich sehe abends fern. Ich sehe Nachrichten und einen Spielfilm.',
    grammaticalBreakdown: 'fernsehen é separável com alternância: sehe fern; "einen Spielfilm" está no acusativo masculino (der -> einen).',
  },
  {
    id: 6,
    pt: 'Ontem eu me levantei às 8h. Eu trabalhei muito.',
    deExpected: 'Gestern bin ich um 8.00 Uhr aufgestanden. Ich habe viel gearbeitet.',
    grammaticalBreakdown: 'aufstehen no Perfekt usa o auxiliar sein (bin aufgestanden) com inversão por "Gestern" na Pos. I; arbeiten usa haben (habe gearbeitet).',
  },
  {
    id: 7,
    pt: 'Eu tenho que responder 55 e-mails hoje.',
    deExpected: 'Ich muss heute 55 E-Mails beantworten.',
    grammaticalBreakdown: 'müssen expressa necessidade própria/tarefa inadiável (Pos. II: muss); beantworten vai para o Satzende no infinitivo.',
  },
  {
    id: 8,
    pt: 'Eu devo marcar um compromisso com a Sra. Kümmel.',
    deExpected: 'Ich soll einen Termin mit Frau Kümmel vereinbaren.',
    grammaticalBreakdown: 'sollen expressa ordem ou atribuição delegada por outrem (Pos. II: soll); vereinbaren vai no infinitivo para o Satzende.',
  },
  {
    id: 9,
    pt: 'Eu tenho que resolver um problema de computador.',
    deExpected: 'Ich muss ein Computerproblem lösen.',
    grammaticalBreakdown: 'müssen (muss); substantivo composto neutro "das Computerproblem" no acusativo permanece "ein Computerproblem"; lösen no Satzende.',
  },
  {
    id: 10,
    pt: 'Você deve reservar um quarto de hotel.',
    deExpected: 'Du sollst ein Hotelzimmer buchen.',
    grammaticalBreakdown: 'sollen na 2ª pessoa singular (du sollst); objeto neutro "ein Hotelzimmer"; infinitivo "buchen" no Satzende.',
  },
];

// 3.13 Resumo dos Pontos-Chave do Dia 011
export interface KeyPointRule {
  concept: string;
  rule: string;
  example: string;
}

export const KEY_POINTS_L11: KeyPointRule[] = [
  { concept: 'Verbos separáveis (Trennbare Verben)', rule: 'No presente, o prefixo vai obrigatoriamente para o final absoluto da oração principal (Satzende).', example: 'Ich stehe jeden Morgen um 7.00 Uhr auf.' },
  { concept: 'Partizip II de Verbos Separáveis', rule: 'O prefixo permanece na frente, mas o infixo "-ge-" se interpõe entre o prefixo e o radical.', example: 'auf + ge + standen = aufgestanden; ein + ge + kauft = eingekauft.' },
  { concept: 'Verbos inseparáveis (Nicht trennbare Verben)', rule: 'Prefixos be-, emp-, ent-, er-, ge-, miss-, ver-, zer- NUNCA se separam do verbo base em tempo algum.', example: 'Ich vereinbare einen Termin / Er bezahlt die Rechnung.' },
  { concept: 'Partizip II de Verbos Inseparáveis', rule: 'NÃO recebem o infixo "ge-". Formam-se com o radical + "-t" ou "-en".', example: 'besucht, bezahlt, vereinbart, erzählt, begonnen.' },
  { concept: 'Verbos em "-ieren"', rule: 'Não recebem "ge-" no Perfekt. O Partizip II termina em "-iert".', example: 'studieren → studiert; telefonieren → telefoniert; präsentieren → präsentiert.' },
  { concept: 'Perfekt com auxiliar "sein"', rule: 'Exigido por verbos de movimento com deslocamento espacial, mudança de estado e exceções vitais (bleiben, sein, werden).', example: 'ist aufgestanden, ist gefahren, ist eingeschlafen, ist geblieben.' },
  { concept: 'Perfekt com auxiliar "haben"', rule: 'Exigido por todos os verbos transitivos (objeto acusativo), verbos reflexivos e ações continuadas sem deslocamento.', example: 'hat gegessen, hat getrunken, hat gelesen, hat gearbeitet.' },
  { concept: 'Modalverb "müssen"', rule: 'Indica necessidade própria, imperativo biológico ou obrigação interna autônoma. 1ª e 3ª pessoas do singular são idênticas: muss.', example: 'Ich muss schlafen / Du musst lernen / Er muss arbeiten.' },
  { concept: 'Modalverb "sollen"', rule: 'Indica dever imposto por outrem, ordem da chefia, recomendação externa ou dever moral. 1ª e 3ª pessoas do singular são idênticas: soll.', example: 'Ich soll Frau Körner anrufen (mein Chef will das).' },
  { concept: 'Sintaxe dos Modalverben (Klammer)', rule: 'Modalverb conjugado na Posição II; o verbo principal vai ao Satzende em sua forma infinitiva intacta.', example: 'Du musst den Termin heute absagen.' },
  { concept: 'Preposições Temporais: am, im, um', rule: 'am (dias da semana, períodos do dia: am Montag, am Abend); im (meses, estações: im Januar, im Sommer); um (horas pontuais: um 14.30 Uhr).', example: 'Am Montag um 8.00 Uhr fahre ich zur Arbeit.' },
  { concept: 'Preposições Temporais de Duração: von...bis, vor, nach, seit', rule: 'von...bis (período delimitado); vor + Dativo (anterioridade); nach + Dativo (posterioridade); seit + Dativo (ação iniciada no passado que perdura).', example: 'von 9.00 bis 17.00 Uhr; vor dem Essen; nach der Arbeit; seit drei Jahren.' },
  { concept: 'Horas Coloquiais (halb, Viertel)', rule: 'halb significa "meia hora ANTES" da hora seguinte: halb drei = 14h30! Viertel nach = 15 min depois; Viertel vor = 15 min antes.', example: 'halb vier = 15h30; Viertel nach fünf = 17h15; Viertel vor sieben = 18h45.' },
  { concept: 'Duração: Stunde vs. Uhr', rule: '"Uhr" marca o ponto fixo no relógio (um 15.00 Uhr); "Stunde" mede a duração temporal de 60 minutos (zwei Stunden arbeiten).', example: 'Der Unterricht beginnt um 8.30 Uhr und dauert zwei Stunden.' },
  { concept: 'Umgangssprache do Cotidiano Profissional', rule: 'Fórmulas essenciais de escritório: "Feierabend machen", "Ich habe es eilig", "Unter Zeitdruck stehen", "Verschlafen haben".', example: 'Schönen Feierabend! Ich muss mich beeilen, mein Zug fährt gleich.' },
];
