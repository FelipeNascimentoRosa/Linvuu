// DADOS ESTRUTURADOS DA AULA 12 — SEMANA 2 (DIA 012 DO CRONOGRAMA)
// Kapitel 5, Teil B, C e D (A20–A34, p. 120–140)
// Foco: Verbos Separáveis/Inseparáveis e em -ieren, Perfekt Avançado (haben/sein/Ersatzinfinitiv), Modalverben, Wechselpräpositionen, Informática e Atendimento ao Cliente

export interface LessonMetadata {
  week: number;
  day: string;
  round: string;
  chapter: string;
  title: string;
  pages: string;
  totalDuration: string;
}

export const SEMANA_02_LESSON_12_METADATA: LessonMetadata = {
  week: 2,
  day: 'Dia 012',
  round: 'Rodada 12',
  chapter: 'Kapitel 5, Teil B, C e D (A20–A34)',
  title: 'Verbos Separáveis & Inseparáveis, Verbos em -ieren, Perfekt (haben/sein/Modal), Wechselpräpositionen & Kundenservice',
  pages: 'p. 120–140',
  totalDuration: '180 minutos (3 blocos de 60 min)',
};

// 1.1 Verbos Separáveis
export interface TrennbarVerb {
  verb: string;
  prefix: string;
  base: string;
  translation: string;
  examplePresent: string;
  examplePerfekt: string;
}

export const TRENNBARE_VERBEN_27: TrennbarVerb[] = [
  { verb: 'aufstehen', prefix: 'auf-', base: 'stehen', translation: 'levantar-se', examplePresent: 'Ich stehe um 7.00 Uhr auf.', examplePerfekt: 'Ich bin um 7.00 Uhr aufgestanden.' },
  { verb: 'einkaufen', prefix: 'ein-', base: 'kaufen', translation: 'fazer compras', examplePresent: 'Ich kaufe im Supermarkt ein.', examplePerfekt: 'Ich habe im Supermarkt eingekauft.' },
  { verb: 'fernsehen', prefix: 'fern-', base: 'sehen', translation: 'assistir TV', examplePresent: 'Ich sehe abends fern.', examplePerfekt: 'Ich habe abends ferngesehen.' },
  { verb: 'anfangen', prefix: 'an-', base: 'fangen', translation: 'começar', examplePresent: 'Ich fange um 9.00 Uhr an.', examplePerfekt: 'Ich habe um 9.00 Uhr angefangen.' },
  { verb: 'anrufen', prefix: 'an-', base: 'rufen', translation: 'telefonar', examplePresent: 'Ich rufe meine Mutter an.', examplePerfekt: 'Ich habe meine Mutter angerufen.' },
  { verb: 'einladen', prefix: 'ein-', base: 'laden', translation: 'convidar', examplePresent: 'Ich lade meine Freunde ein.', examplePerfekt: 'Ich habe meine Freunde eingeladen.' },
  { verb: 'abholen', prefix: 'ab-', base: 'holen', translation: 'buscar', examplePresent: 'Ich hole dich ab.', examplePerfekt: 'Ich habe dich abgeholt.' },
  { verb: 'aufräumen', prefix: 'auf-', base: 'räumen', translation: 'arrumar', examplePresent: 'Ich räume mein Zimmer auf.', examplePerfekt: 'Ich habe mein Zimmer aufgeräumt.' },
  { verb: 'zumachen', prefix: 'zu-', base: 'machen', translation: 'fechar', examplePresent: 'Ich mache die Tür zu.', examplePerfekt: 'Ich habe die Tür zugemacht.' },
  { verb: 'aufmachen', prefix: 'auf-', base: 'machen', translation: 'abrir', examplePresent: 'Ich mache das Fenster auf.', examplePerfekt: 'Ich habe das Fenster aufgemacht.' },
  { verb: 'einschlafen', prefix: 'ein-', base: 'schlafen', translation: 'adormecer', examplePresent: 'Ich schlafe um 23.00 Uhr ein.', examplePerfekt: 'Ich bin um 23.00 Uhr eingeschlafen.' },
  { verb: 'ausgehen', prefix: 'aus-', base: 'gehen', translation: 'sair', examplePresent: 'Ich gehe am Wochenende aus.', examplePerfekt: 'Ich bin am Wochenende ausgegangen.' },
  { verb: 'mitnehmen', prefix: 'mit-', base: 'nehmen', translation: 'levar consigo', examplePresent: 'Ich nehme meinen Regenschirm mit.', examplePerfekt: 'Ich habe meinen Regenschirm mitgenommen.' },
  { verb: 'zurückkommen', prefix: 'zurück-', base: 'kommen', translation: 'voltar', examplePresent: 'Ich komme um 18.00 Uhr zurück.', examplePerfekt: 'Ich bin um 18.00 Uhr zurückgekommen.' },
  { verb: 'weiterleiten', prefix: 'weiter-', base: 'leiten', translation: 'encaminhar', examplePresent: 'Ich leite die E-Mail weiter.', examplePerfekt: 'Ich habe die E-Mail weitergeleitet.' },
  { verb: 'einschalten', prefix: 'ein-', base: 'schalten', translation: 'ligar', examplePresent: 'Ich schalte den Computer ein.', examplePerfekt: 'Ich habe den Computer eingeschaltet.' },
  { verb: 'ausschalten', prefix: 'aus-', base: 'schalten', translation: 'desligar', examplePresent: 'Ich schalte den Computer aus.', examplePerfekt: 'Ich habe den Computer ausgeschaltet.' },
  { verb: 'anziehen', prefix: 'an-', base: 'ziehen', translation: 'vestir', examplePresent: 'Ich ziehe mich an.', examplePerfekt: 'Ich habe mich angezogen.' },
  { verb: 'ausziehen', prefix: 'aus-', base: 'ziehen', translation: 'tirar (roupa)', examplePresent: 'Ich ziehe mich aus.', examplePerfekt: 'Ich habe mich ausgezogen.' },
  { verb: 'aufhören', prefix: 'auf-', base: 'hören', translation: 'parar', examplePresent: 'Ich höre um 17.00 Uhr auf.', examplePerfekt: 'Ich habe um 17.00 Uhr aufgehört.' },
  { verb: 'mitkommen', prefix: 'mit-', base: 'kommen', translation: 'vir junto', examplePresent: 'Ich komme mit.', examplePerfekt: 'Ich bin mitgekommen.' },
  { verb: 'abfahren', prefix: 'ab-', base: 'fahren', translation: 'partir', examplePresent: 'Der Zug fährt um 9.00 Uhr ab.', examplePerfekt: 'Der Zug ist um 9.00 Uhr abgefahren.' },
  { verb: 'ankommen', prefix: 'an-', base: 'kommen', translation: 'chegar', examplePresent: 'Der Zug kommt um 10.00 Uhr an.', examplePerfekt: 'Der Zug ist um 10.00 Uhr angekommen.' },
  { verb: 'einsteigen', prefix: 'ein-', base: 'steigen', translation: 'entrar (veículo)', examplePresent: 'Ich steige in den Bus ein.', examplePerfekt: 'Ich bin in den Bus eingestiegen.' },
  { verb: 'aussteigen', prefix: 'aus-', base: 'steigen', translation: 'sair (veículo)', examplePresent: 'Ich steige aus dem Bus aus.', examplePerfekt: 'Ich bin aus dem Bus ausgestiegen.' },
  { verb: 'umsteigen', prefix: 'um-', base: 'steigen', translation: 'trocar (veículo)', examplePresent: 'Ich steige in Berlin um.', examplePerfekt: 'Ich bin in Berlin umgestiegen.' },
  { verb: 'vorbeikommen', prefix: 'vorbei-', base: 'kommen', translation: 'passar (visita)', examplePresent: 'Ich komme später vorbei.', examplePerfekt: 'Ich bin später vorbeigekommen.' },
];

// Imperativo de verbos separáveis
export interface TrennbarImperativ {
  verb: string;
  du: string;
  ihr: string;
  Sie: string;
}

export const TRENNBAR_IMPERATIV: TrennbarImperativ[] = [
  { verb: 'aufstehen', du: 'Steh auf!', ihr: 'Steht auf!', Sie: 'Stehen Sie auf!' },
  { verb: 'einkaufen', du: 'Kauf ein!', ihr: 'Kauft ein!', Sie: 'Kaufen Sie ein!' },
  { verb: 'fernsehen', du: 'Sieh fern!', ihr: 'Seht fern!', Sie: 'Sehen Sie fern!' },
  { verb: 'anfangen', du: 'Fang an!', ihr: 'Fangt an!', Sie: 'Fangen Sie an!' },
  { verb: 'anrufen', du: 'Ruf an!', ihr: 'Ruft an!', Sie: 'Rufen Sie an!' },
  { verb: 'einladen', du: 'Lad ein!', ihr: 'Ladet ein!', Sie: 'Laden Sie ein!' },
  { verb: 'abholen', du: 'Hol ab!', ihr: 'Holt ab!', Sie: 'Holen Sie ab!' },
  { verb: 'aufräumen', du: 'Räum auf!', ihr: 'Räumt auf!', Sie: 'Räumen Sie auf!' },
];

// 1.2 Verbos Inseparáveis
export interface InseparablePrefix {
  prefix: string;
  examples: string;
  translation: string;
  perfektExamples: string;
}

export const INSEPARABLE_PREFIXES: InseparablePrefix[] = [
  { prefix: 'be-', examples: 'beginnen, bezahlen, besuchen, beantworten', translation: 'começar, pagar, visitar, responder', perfektExamples: 'begonnen, bezahlt, besucht, beantwortet (SEM ge-)' },
  { prefix: 'emp-', examples: 'empfehlen, empfangen', translation: 'recomendar, receber', perfektExamples: 'empfohlen, empfangen (SEM ge-)' },
  { prefix: 'ent-', examples: 'entschuldigen, entscheiden', translation: 'desculpar, decidir', perfektExamples: 'entschuldigt, entschieden (SEM ge-)' },
  { prefix: 'er-', examples: 'erzählen, erklären, erwarten', translation: 'contar, explicar, esperar', perfektExamples: 'erzählt, erklärt, erwartet (SEM ge-)' },
  { prefix: 'ge-', examples: 'gefallen, gehören', translation: 'agradar, pertencer', perfektExamples: 'gefallen, gehört (SEM ge- adicional)' },
  { prefix: 'miss-', examples: 'missverstehen, missfallen', translation: 'entender mal, desagradar', perfektExamples: 'missverstanden, missfallen (SEM ge-)' },
  { prefix: 'ver-', examples: 'vereinbaren, verstehen, verkaufen', translation: 'combinar, entender, vender', perfektExamples: 'vereinbart, verstanden, verkauft (SEM ge-)' },
  { prefix: 'zer-', examples: 'zerstören, zerbrechen', translation: 'destruir, quebrar', perfektExamples: 'zerstört, zerbrochen (SEM ge-)' },
];

// 1.3 Verbos em -ieren
export interface IerenVerb {
  verb: string;
  partizip: string;
  translation: string;
  example: string;
}

export const IEREN_VERBEN: IerenVerb[] = [
  { verb: 'studieren', partizip: 'studiert', translation: 'estudar', example: 'Ich habe Medizin studiert.' },
  { verb: 'telefonieren', partizip: 'telefoniert', translation: 'telefonar', example: 'Ich habe mit dir telefoniert.' },
  { verb: 'reparieren', partizip: 'repariert', translation: 'consertar', example: 'Ich habe den Drucker repariert.' },
  { verb: 'kopieren', partizip: 'kopiert', translation: 'copiar', example: 'Ich habe den Text kopiert.' },
  { verb: 'organisieren', partizip: 'organisiert', translation: 'organizar', example: 'Ich habe die Party organisiert.' },
  { verb: 'präsentieren', partizip: 'präsentiert', translation: 'apresentar', example: 'Ich habe das Projekt präsentiert.' },
  { verb: 'übersetzen', partizip: 'übersetzt', translation: 'traduzir', example: 'Ich habe den Brief übersetzt.' },
  { verb: 'funktionieren', partizip: 'funktioniert', translation: 'funcionar', example: 'Der Drucker hat funktioniert.' },
  { verb: 'installieren', partizip: 'installiert', translation: 'instalar', example: 'Ich habe das Programm installiert.' },
  { verb: 'interessieren', partizip: 'interessiert', translation: 'interessar', example: 'Das hat mich interessiert.' },
];

// 1.5 Perfekt haben vs sein
export const PERFEKT_SEIN_VERBS = [
  { verb: 'gehen', partizip: 'ist gegangen', trans: 'foi (a pé)' },
  { verb: 'fahren', partizip: 'ist gefahren', trans: 'foi (de veículo)' },
  { verb: 'fliegen', partizip: 'ist geflogen', trans: 'voou' },
  { verb: 'kommen', partizip: 'ist gekommen', trans: 'veio' },
  { verb: 'aufstehen', partizip: 'ist aufgestanden', trans: 'levantou-se' },
  { verb: 'einschlafen', partizip: 'ist eingeschlafen', trans: 'adormeceu' },
  { verb: 'aufwachen', partizip: 'ist aufgewacht', trans: 'acordou' },
  { verb: 'bleiben', partizip: 'ist geblieben', trans: 'ficou (exceção: sem movimento)' },
  { verb: 'sein', partizip: 'ist gewesen', trans: 'foi/esteve' },
  { verb: 'werden', partizip: 'ist geworden', trans: 'tornou-se' },
  { verb: 'passieren', partizip: 'ist passiert', trans: 'aconteceu' },
  { verb: 'einsteigen', partizip: 'ist eingestiegen', trans: 'embarcou' },
  { verb: 'aussteigen', partizip: 'ist ausgestiegen', trans: 'desembarcou' },
  { verb: 'umsteigen', partizip: 'ist umgestiegen', trans: 'fez baldeação' },
  { verb: 'abfahren', partizip: 'ist abgefahren', trans: 'partiu' },
  { verb: 'ankommen', partizip: 'ist angekommen', trans: 'chegou' },
  { verb: 'zurückkommen', partizip: 'ist zurückgekommen', trans: 'voltou' },
  { verb: 'ausgehen', partizip: 'ist ausgegangen', trans: 'saiu para se divertir' },
  { verb: 'mitkommen', partizip: 'ist mitgekommen', trans: 'veio junto' },
];

export const PERFEKT_HABEN_VERBS = [
  { verb: 'essen', partizip: 'hat gegessen', trans: 'comeu' },
  { verb: 'trinken', partizip: 'hat getrunken', trans: 'bebeu' },
  { verb: 'lesen', partizip: 'hat gelesen', trans: 'leu' },
  { verb: 'schreiben', partizip: 'hat geschrieben', trans: 'escreveu' },
  { verb: 'arbeiten', partizip: 'hat gearbeitet', trans: 'trabalhou' },
  { verb: 'kaufen', partizip: 'hat gekauft', trans: 'comprou' },
  { verb: 'machen', partizip: 'hat gemacht', trans: 'fez' },
  { verb: 'sehen', partizip: 'hat gesehen', trans: 'viu' },
  { verb: 'hören', partizip: 'hat gehört', trans: 'ouviu' },
  { verb: 'sprechen', partizip: 'hat gesprochen', trans: 'falou' },
  { verb: 'nehmen', partizip: 'hat genommen', trans: 'pegou' },
  { verb: 'finden', partizip: 'hat gefunden', trans: 'encontrou' },
  { verb: 'geben', partizip: 'hat gegeben', trans: 'deu' },
  { verb: 'helfen', partizip: 'hat geholfen', trans: 'ajudou' },
  { verb: 'treffen', partizip: 'hat getroffen', trans: 'encontrou' },
  { verb: 'vergessen', partizip: 'hat vergessen', trans: 'esqueceu' },
  { verb: 'verlieren', partizip: 'hat verloren', trans: 'perdeu' },
  { verb: 'gewinnen', partizip: 'hat gewonnen', trans: 'ganhou' },
  { verb: 'beginnen', partizip: 'hat begonnen', trans: 'começou' },
  { verb: 'anfangen', partizip: 'hat angefangen', trans: 'começou' },
  { verb: 'anrufen', partizip: 'hat angerufen', trans: 'telefonou' },
  { verb: 'einladen', partizip: 'hat eingeladen', trans: 'convidou' },
  { verb: 'einkaufen', partizip: 'hat eingekauft', trans: 'fez compras' },
  { verb: 'fernsehen', partizip: 'hat ferngesehen', trans: 'assistiu TV' },
  { verb: 'mitnehmen', partizip: 'hat mitgenommen', trans: 'levou consigo' },
];

// 1.7 Perfekt com Modalverben (Ersatzinfinitiv)
export const MODAL_PERFEKT_EXAMPLES = [
  { modal: 'müssen', perfekt: 'Ich habe arbeiten müssen.', trans: 'Eu tive que trabalhar.' },
  { modal: 'sollen', perfekt: 'Ich habe arbeiten sollen.', trans: 'Eu devi trabalhar (foi instruído).' },
  { modal: 'können', perfekt: 'Ich habe kommen können.', trans: 'Eu pude vir.' },
  { modal: 'wollen', perfekt: 'Ich habe kommen wollen.', trans: 'Eu quis vir.' },
  { modal: 'dürfen', perfekt: 'Ich habe gehen dürfen.', trans: 'Eu tive permissão para ir.' },
  { modal: 'mögen', perfekt: 'Ich habe essen mögen.', trans: 'Eu gostei/quis comer.' },
];

// 1.9 Wechselpräpositionen (Wo? Dativo vs. Wohin? Acusativo)
export interface Wechselpreposition {
  prep: string;
  woDativ: string;
  wohinAkkusativ: string;
  exampleWo: string;
  exampleWohin: string;
}

export const WECHSEL_PREPOSITIONS: Wechselpreposition[] = [
  { prep: 'in', woDativ: 'im Kino (in dem)', wohinAkkusativ: 'ins Kino (in das)', exampleWo: 'Ich bin im Kino.', exampleWohin: 'Ich gehe ins Kino.' },
  { prep: 'an', woDativ: 'am Fenster (an dem)', wohinAkkusativ: 'ans Fenster (an das)', exampleWo: 'Das Bild hängt an der Wand.', exampleWohin: 'Ich hänge das Bild an die Wand.' },
  { prep: 'auf', woDativ: 'auf dem Tisch', wohinAkkusativ: 'auf den Tisch', exampleWo: 'Das Buch liegt auf dem Tisch.', exampleWohin: 'Ich lege das Buch auf den Tisch.' },
  { prep: 'über', woDativ: 'über dem Sofa', wohinAkkusativ: 'über das Sofa', exampleWo: 'Die Lampe hängt über dem Tisch.', exampleWohin: 'Ich hänge die Lampe über den Tisch.' },
  { prep: 'unter', woDativ: 'unter dem Tisch', wohinAkkusativ: 'unter den Tisch', exampleWo: 'Die Katze ist unter dem Sofa.', exampleWohin: 'Die Katze kriecht unter das Sofa.' },
  { prep: 'neben', woDativ: 'neben dem Bett', wohinAkkusativ: 'neben das Bett', exampleWo: 'Der Stuhl steht neben dem Bett.', exampleWohin: 'Ich stelle den Stuhl neben das Bett.' },
  { prep: 'zwischen', woDativ: 'zwischen den Stühlen', wohinAkkusativ: 'zwischen die Stühle', exampleWo: 'Die Bank ist zwischen den Bäumen.', exampleWohin: 'Ich stelle die Bank zwischen die Bäume.' },
  { prep: 'vor', woDativ: 'vor dem Haus', wohinAkkusativ: 'vor das Haus', exampleWo: 'Das Auto steht vor dem Haus.', exampleWohin: 'Ich fahre das Auto vor das Haus.' },
  { prep: 'hinter', woDativ: 'hinter dem Haus', wohinAkkusativ: 'hinter das Haus', exampleWo: 'Der Garten ist hinter dem Haus.', exampleWohin: 'Ich gehe hinter das Haus.' },
];

// 2.1 Hardware e Computador
export const COMPUTER_PARTS = [
  { article: 'der', word: 'Lautsprecher', plural: 'die Lautsprecher', trans: 'alto-falante' },
  { article: 'der', word: 'Bildschirm', plural: 'die Bildschirme', trans: 'monitor / tela' },
  { article: 'die', word: 'Tastatur', plural: 'die Tastaturen', trans: 'teclado' },
  { article: 'die', word: 'Maus', plural: 'die Mäuse', trans: 'mouse' },
  { article: 'die', word: 'Taste', plural: 'die Tasten', trans: 'tecla' },
  { article: 'das', word: 'Kabel', plural: 'die Kabel', trans: 'cabo' },
  { article: 'der', word: 'Computer', plural: 'die Computer', trans: 'computador' },
  { article: 'der', word: 'Drucker', plural: 'die Drucker', trans: 'impressora' },
  { article: 'der', word: 'Kopierer', plural: 'die Kopierer', trans: 'copiadora' },
  { article: 'der', word: 'Scanner', plural: 'die Scanner', trans: 'scanner' },
  { article: 'der', word: 'USB-Stick', plural: 'die USB-Sticks', trans: 'pen drive' },
];

// 2.7 Números Ordinais e Datas
export const ORDINAL_NUMBERS_DAYS = [
  { num: '1.', de: 'der erste', trans: 'o primeiro' },
  { num: '2.', de: 'der zweite', trans: 'o segundo' },
  { num: '3.', de: 'der dritte', trans: 'o terceiro (irregular)' },
  { num: '4.', de: 'der vierte', trans: 'o quarto' },
  { num: '5.', de: 'der fünfte', trans: 'o quinto' },
  { num: '6.', de: 'der sechste', trans: 'o sexto' },
  { num: '7.', de: 'der siebte', trans: 'o sétimo (irregular)' },
  { num: '8.', de: 'der achte', trans: 'o oitavo (irregular: apenas -te)' },
  { num: '9.', de: 'der neunte', trans: 'o nono' },
  { num: '10.', de: 'der zehnte', trans: 'o décimo' },
  { num: '11.', de: 'der elfte', trans: 'o décimo primeiro' },
  { num: '12.', de: 'der zwölfte', trans: 'o décimo segundo' },
  { num: '13.', de: 'der dreizehnte', trans: 'o décimo terceiro' },
  { num: '14.', de: 'der vierzehnte', trans: 'o décimo quarto' },
  { num: '15.', de: 'der fünfzehnte', trans: 'o décimo quinto' },
  { num: '16.', de: 'der sechzehnte', trans: 'o décimo sexto' },
  { num: '17.', de: 'der siebzehnte', trans: 'o décimo sétimo' },
  { num: '18.', de: 'der achtzehnte', trans: 'o décimo oitavo' },
  { num: '19.', de: 'der neunzehnte', trans: 'o décimo nono' },
  { num: '20.', de: 'der zwanzigste', trans: 'o vigésimo (-ste a partir do 20)' },
  { num: '21.', de: 'der einundzwanzigste', trans: 'o vigésimo primeiro' },
  { num: '30.', de: 'der dreißigste', trans: 'o trigésimo' },
  { num: '31.', de: 'der einunddreißigste', trans: 'o trigésimo primeiro' },
];

export const MONTHS_LIST = [
  'der Januar', 'der Februar', 'der März', 'der April', 'der Mai', 'der Juni',
  'der Juli', 'der August', 'der September', 'der Oktober', 'der November', 'der Dezember'
];

// 2.13 Estatísticas de Mídias
export const MEDIA_STATS = [
  { media: 'Fernsehen', minutes: 236, trans: 'Televisão' },
  { media: 'Internet (Recherche/Information)', minutes: 101, trans: 'Internet (pesquisa/informações)' },
  { media: 'Radio', minutes: 100, trans: 'Rádio' },
  { media: 'Messenger', minutes: 44, trans: 'Mensageiro / Apps de mensagem' },
  { media: 'Telefon (Handy)', minutes: 43, trans: 'Telefone celular' },
  { media: 'E-Mails', minutes: 38, trans: 'E-mails' },
  { media: 'Musik', minutes: 36, trans: 'Música' },
  { media: '(Online-)Spiele', minutes: 30, trans: 'Jogos online' },
  { media: 'Buch', minutes: 26, trans: 'Livro impresso' },
  { media: 'Zeitungen/Zeitschriften', minutes: 22, trans: 'Jornais / Revistas' },
];

// 2.29 Tabela Lexical Primária (30 Termos)
export interface LexicalTerm {
  word: string;
  article: 'der' | 'die' | 'das';
  plural: string;
  translation: string;
  exampleSentence: string;
}

export const VOCABULARY_30: LexicalTerm[] = [
  { word: 'Computer', article: 'der', plural: 'die Computer', translation: 'computador', exampleSentence: 'Man muss den Computer einschalten.' },
  { word: 'Bildschirm', article: 'der', plural: 'die Bildschirme', translation: 'monitor', exampleSentence: 'Der Bildschirm ist kaputt.' },
  { word: 'Tastatur', article: 'die', plural: 'die Tastaturen', translation: 'teclado', exampleSentence: 'Die Tastatur funktioniert nicht.' },
  { word: 'Maus', article: 'die', plural: 'die Mäuse', translation: 'mouse', exampleSentence: 'Die Maus ist weg.' },
  { word: 'Taste', article: 'die', plural: 'die Tasten', translation: 'tecla', exampleSentence: 'Drücken Sie die Taste „Stopp“.' },
  { word: 'Kabel', article: 'das', plural: 'die Kabel', translation: 'cabo', exampleSentence: 'Das Kabel ist nicht angeschlossen.' },
  { word: 'Drucker', article: 'der', plural: 'die Drucker', translation: 'impressora', exampleSentence: 'Der Drucker ist kaputt.' },
  { word: 'Kopierer', article: 'der', plural: 'die Kopierer', translation: 'copiadora', exampleSentence: 'Der Kopierer ist kaputt.' },
  { word: 'Scanner', article: 'der', plural: 'die Scanner', translation: 'scanner', exampleSentence: 'Der Scanner funktioniert nicht.' },
  { word: 'Lautsprecher', article: 'der', plural: 'die Lautsprecher', translation: 'alto-falante', exampleSentence: 'Der Lautsprecher ist kaputt.' },
  { word: 'USB-Stick', article: 'der', plural: 'die USB-Sticks', translation: 'pen drive', exampleSentence: 'Der USB-Stick ist voll.' },
  { word: 'E-Mail', article: 'die', plural: 'die E-Mails', translation: 'e-mail', exampleSentence: 'Ich habe die E-Mail gesendet.' },
  { word: 'Termin', article: 'der', plural: 'die Termine', translation: 'compromisso', exampleSentence: 'Ich möchte einen Termin vereinbaren.' },
  { word: 'Reparatur', article: 'die', plural: 'die Reparaturen', translation: 'reparo', exampleSentence: 'Ich brauche eine Reparatur.' },
  { word: 'Monteur', article: 'der', plural: 'die Monteure', translation: 'técnico', exampleSentence: 'Der Monteur kommt am Donnerstag.' },
  { word: 'Waschmaschine', article: 'die', plural: 'die Waschmaschinen', translation: 'máquina de lavar', exampleSentence: 'Die Waschmaschine funktioniert nicht.' },
  { word: 'Kühlschrank', article: 'der', plural: 'die Kühlschränke', translation: 'geladeira', exampleSentence: 'Der Kühlschrank ist kaputt.' },
  { word: 'Geschirrspüler', article: 'der', plural: 'die Geschirrspüler', translation: 'lava-louças', exampleSentence: 'Der Geschirrspüler geht nicht mehr.' },
  { word: 'Uhrzeit', article: 'die', plural: 'die Uhrzeiten', translation: 'horário', exampleSentence: 'Wie spät ist es?' },
  { word: 'Datum', article: 'das', plural: 'die Daten', translation: 'data', exampleSentence: 'Welches Datum ist heute?' },
  { word: 'Tag', article: 'der', plural: 'die Tage', translation: 'dia', exampleSentence: 'Der Tag hat 24 Stunden.' },
  { word: 'Woche', article: 'die', plural: 'die Wochen', translation: 'semana', exampleSentence: 'Die Woche hat sieben Tage.' },
  { word: 'Monat', article: 'der', plural: 'die Monate', translation: 'mês', exampleSentence: 'Das Jahr hat zwölf Monate.' },
  { word: 'Jahr', article: 'das', plural: 'die Jahre', translation: 'ano', exampleSentence: 'Das Jahr hat 365 Tage.' },
  { word: 'Stunde', article: 'die', plural: 'die Stunden', translation: 'hora', exampleSentence: 'Eine Stunde hat 60 Minuten.' },
  { word: 'Minute', article: 'die', plural: 'die Minuten', translation: 'minuto', exampleSentence: 'Eine Minute hat 60 Sekunden.' },
  { word: 'Sekunde', article: 'die', plural: 'die Sekunden', translation: 'segundo', exampleSentence: 'Eine Minute hat 60 Sekunden.' },
  { word: 'Feierabend', article: 'der', plural: 'die Feierabende', translation: 'fim de expediente', exampleSentence: 'Um 17.00 Uhr habe ich Feierabend.' },
  { word: 'Besprechung', article: 'die', plural: 'die Besprechungen', translation: 'reunião', exampleSentence: 'Ich habe eine Besprechung.' },
  { word: 'Pause', article: 'die', plural: 'die Pausen', translation: 'pausa', exampleSentence: 'Ich mache eine Pause.' },
];

// 2.30 Registro Coloquial (Umgangssprache) - 26 Expressões
export interface ColloquialExpression {
  expression: string;
  translation: string;
  context: string;
}

export const UMGANGSSPRACHE_26: ColloquialExpression[] = [
  { expression: 'Feierabend!', translation: 'Fim de expediente!', context: 'Trabalho / Alívio do final do dia' },
  { expression: 'Ich muss los.', translation: 'Tenho que ir.', context: 'Despedida rápida' },
  { expression: 'Bis später!', translation: 'Até mais tarde!', context: 'Despedida informal' },
  { expression: "Was gibt's?", translation: 'O que há? / Novidades?', context: 'Saudação informal' },
  { expression: 'Keine Ahnung.', translation: 'Não faço ideia.', context: 'Resposta direta' },
  { expression: 'Alles klar!', translation: 'Tudo certo! / Combinado!', context: 'Concordância' },
  { expression: 'Ich habe es eilig.', translation: 'Estou com pressa.', context: 'Urgência' },
  { expression: 'Ich bin im Stress.', translation: 'Estou estressado.', context: 'Sobrecarga de trabalho' },
  { expression: 'Ich muss noch etwas erledigen.', translation: 'Ainda tenho que resolver uma pendência.', context: 'Trabalho' },
  { expression: 'Ich mache Feierabend.', translation: 'Vou encerrar o expediente.', context: 'Rotina de saída' },
  { expression: 'Ich habe einen Termin.', translation: 'Tenho um compromisso.', context: 'Agenda' },
  { expression: 'Ich muss einen Termin absagen.', translation: 'Tenho que cancelar um compromisso.', context: 'Agenda' },
  { expression: 'Der Termin passt mir gut.', translation: 'O compromisso me cai muito bem.', context: 'Agenda / Horário conveniente' },
  { expression: 'Ich habe keine Zeit.', translation: 'Não tenho tempo.', context: 'Recusa educada' },
  { expression: 'Ich rufe dich später zurück.', translation: 'Te ligo mais tarde de volta.', context: 'Telefone' },
  { expression: 'Kann ich dich kurz sprechen?', translation: 'Posso falar rapidamente com você?', context: 'Escritório / Colega' },
  { expression: 'Ich bin gleich wieder da.', translation: 'Já volto num instante.', context: 'Escritório' },
  { expression: 'Ich muss mich beeilen.', translation: 'Tenho que me apressar.', context: 'Pressa' },
  { expression: 'Ich habe verschlafen.', translation: 'Eu dormi demais / perdi a hora.', context: 'Atraso involuntário' },
  { expression: 'Ich stehe unter Zeitdruck.', translation: 'Estou sob forte pressão de prazo.', context: 'Trabalho / Prazos' },
  { expression: 'Der Computer stürzt ab.', translation: 'O computador trava / dá pane.', context: 'Informática' },
  { expression: 'Ich muss den Text speichern.', translation: 'Tenho que salvar o texto.', context: 'Informática' },
  { expression: 'Die E-Mail ist nicht angekommen.', translation: 'O e-mail não chegou.', context: 'Informática / Comunicação' },
  { expression: 'Ich habe die Datei gelöscht.', translation: 'Apaguei o arquivo.', context: 'Informática' },
  { expression: 'Der Drucker funktioniert nicht.', translation: 'A impressora não funciona.', context: 'Equipamento de escritório' },
  { expression: 'Ich muss den Computer neu starten.', translation: 'Tenho que reiniciar o computador.', context: 'Informática' },
];

// 3.17 e 3.18 Tradução Reversa de Blindagem (12 Desafios)
export interface ReverseTranslationChallenge {
  id: number;
  pt: string;
  de: string;
  notes: string;
}

export const REVERSE_CHALLENGES_12: ReverseTranslationChallenge[] = [
  {
    id: 1,
    pt: 'Eu me levanto às 7h. Eu tomo café da manhã às 7h30. Eu vou para o trabalho às 8h.',
    de: 'Ich stehe um 7.00 Uhr auf. Ich frühstücke um 7.30 Uhr. Ich fahre um 8.00 Uhr zur Arbeit.',
    notes: 'aufstehen (separável: stehe ... auf); frühstücken (regular: frühstücke); fahren (deslocamento com preposição zur Arbeit).',
  },
  {
    id: 2,
    pt: 'Eu trabalho das 9h às 17h. Eu tenho uma reunião às 10h.',
    de: 'Ich arbeite von 9.00 bis 17.00 Uhr. Ich habe um 10.00 Uhr eine Besprechung.',
    notes: 'von ... bis (período temporal contínuo); Besprechung é feminino acusativo (eine Besprechung).',
  },
  {
    id: 3,
    pt: 'Eu faço uma pausa para o almoço das 12h30 às 13h. Eu vou à cantina.',
    de: 'Ich mache von 12.30 bis 13.00 Uhr Mittagspause. Ich gehe in die Kantine.',
    notes: 'Mittagspause sem artigo ou com eine; in die Kantine (Wohin? acusativo de deslocamento feminino).',
  },
  {
    id: 4,
    pt: 'Eu faço compras no supermercado depois do trabalho. Eu cozinho o jantar em casa.',
    de: 'Ich kaufe nach der Arbeit im Supermarkt ein. Ich koche zu Hause das Abendessen.',
    notes: 'einkaufen (separável: kaufe ... ein); nach der Arbeit (nach + dativo feminino der); zu Hause (expressão fixa de repouso).',
  },
  {
    id: 5,
    pt: 'Eu assisto TV à noite. Eu vejo notícias e um filme.',
    de: 'Ich sehe abends fern. Ich sehe Nachrichten und einen Spielfilm.',
    notes: 'fernsehen (separável: sehe ... fern com alternância e->ie); einen Spielfilm (acusativo masculino: einen).',
  },
  {
    id: 6,
    pt: 'Ontem eu me levantei às 8h. Eu trabalhei muito.',
    de: 'Gestern bin ich um 8.00 Uhr aufgestanden. Ich habe viel gearbeitet.',
    notes: 'aufstehen exige o auxiliar SEIN (bin aufgestanden) por mudança de estado físico; gearbeitet usa haben.',
  },
  {
    id: 7,
    pt: 'Eu tenho que responder 55 e-mails hoje.',
    de: 'Ich muss heute 55 E-Mails beantworten.',
    notes: 'müssen na Pos. II (muss) e o verbo inseparável no infinitivo no Satzende (beantworten).',
  },
  {
    id: 8,
    pt: 'Eu devo marcar um compromisso com a Sra. Kümmel.',
    de: 'Ich soll einen Termin mit Frau Kümmel vereinbaren.',
    notes: 'sollen expressa incumbência/ordem de terceiros; vereinbaren é inseparável e vai ao Satzende.',
  },
  {
    id: 9,
    pt: 'Eu tenho que resolver um problema de computador.',
    de: 'Ich muss ein Computerproblem lösen.',
    notes: 'müssen (necessidade própria/urgência objetiva); ein Computerproblem neutro acusativo.',
  },
  {
    id: 10,
    pt: 'Você deve reservar um quarto de hotel.',
    de: 'Du sollst ein Hotelzimmer buchen.',
    notes: 'sollst (2ª pessoa singular); buchen no infinitivo no final da oração.',
  },
  {
    id: 11,
    pt: 'Eu salvei o texto. Eu não apaguei o e-mail.',
    de: 'Ich habe den Text gespeichert. Ich habe die E-Mail nicht gelöscht.',
    notes: 'speichern e löschen são verbos regulares (gespeichert, gelöscht) combinados com haben.',
  },
  {
    id: 12,
    pt: 'Você conectou a impressora? Eu desliguei o computador.',
    de: 'Hast du den Drucker angeschlossen? Ich habe den Computer ausgeschaltet.',
    notes: 'anschließen e ausschalten são separáveis; no Perfekt recebem o infixo -ge- (angeschlossen, ausgeschaltet).',
  },
];

// 3.19 Resumo dos Pontos-Chave do Dia 012 (17 Regras)
export const KEY_POINTS_17 = [
  { concept: 'Verbos separáveis no Presente', rule: 'O prefixo se destaca da forma conjugada e é arremessado rigidamente para o Satzende: Ich stehe um 7.00 Uhr auf.' },
  { concept: 'Verbos separáveis no Perfekt', rule: 'O infixo -ge- é posicionado exatamente entre o prefixo e o radical do particípio: auf + ge + standen = aufgestanden; ein + ge + kauft = eingekauft.' },
  { concept: 'Verbos inseparáveis no Presente', rule: 'O prefixo permanece soldado ao verbo na Posição II da oração: Ich besuche meine Oma.' },
  { concept: 'Verbos inseparáveis no Perfekt', rule: 'NUNCA recebem o afixo -ge-: besucht, bezahlt, vereinbart, begonnen, verstanden.' },
  { concept: 'Verbos terminados em -ieren', rule: 'NUNCA recebem ge- no particípio passado: studiert, telefoniert, repariert, funktioniert, installiert.' },
  { concept: 'Perfekt com auxiliar haben', rule: 'Rege verbos transitivos (com acusativo), reflexivos e processos de duração estática sem deslocamento.' },
  { concept: 'Perfekt com auxiliar sein', rule: 'Rege verbos de deslocamento direcional de A para B (gehen, fahren, fliegen, ankommen) e mudança de estado (aufstehen, einschlafen, sterben), além de bleiben e sein.' },
  { concept: 'Perfekt com Modalverben (Ersatzinfinitiv)', rule: 'Estrutura haben + Infinitivo Principal + Infinitivo Modal no Satzende: Ich habe arbeiten müssen.' },
  { concept: 'Conjugação do Modalverb müssen', rule: 'ich muss, du musst, er/sie/es muss, wir müssen, ihr müsst, sie/Sie müssen (sem trema no singular!).' },
  { concept: 'Conjugação do Modalverb sollen', rule: 'ich soll, du sollst, er/sie/es soll, wir sollen, ihr sollt, sie/Sie sollen (radical puro, sem trema em nenhuma pessoa).' },
  { concept: 'Preposições temporais com Dativo', rule: 'am (dias da semana e partes do dia), im (meses e estações), um (horas exatas no relógio), von...bis (período), vor (anterioridade), nach (posterioridade), seit (continuidade até o presente).' },
  { concept: 'Declinação e Leitura de Datas', rule: '14.5.2020 = der vierzehnte Fünfte zweitausendzwanzig (com am: am vierzehnten Fünften).' },
  { concept: 'Wechselpräpositionen (Regra de Ouro)', rule: 'Wo? (Localização / repouso) exige caso DATIVO. Wohin? (Deslocamento / direção de transposição) exige caso ACUSATIVO.' },
  { concept: 'Léxico Computacional e Escritório', rule: 'einschalten (ligar), ausschalten (desligar), anschließen (conectar cabo/periférico), speichern (salvar), löschen (apagar), weiterleiten (encaminhar).' },
  { concept: 'Fraseologia Telefônica Corporativa', rule: 'Guten Tag, [Name] hier. Kann ich bitte [Person] sprechen? Einen Moment, bitte. Ich verbinde Sie.' },
  { concept: 'Negociação e Gestão de Agenda', rule: 'Ich möchte gern einen Termin vereinbaren. Wann haben Sie Zeit? Geht es am Dienstag um 11.00 Uhr? Nein, da bin ich nicht im Büro.' },
  { concept: 'Avaliação de Competências (A1)', rule: 'Capacidade de relatar rotinas no passado (Perfekt), agendar serviços técnicos, operar comandos digitais e realizar chamadas assertivas.' },
];
