// Dados completos e estruturados da Semana 2 — Aula 08 / Dia 008 do Cronograma
// Kapitel 3, Teil B, C e D (p. 72–84)

export interface LessonMetadata {
  week: string;
  round: string;
  day: string;
  chapter: string;
  title: string;
  subtitle: string;
  totalHours: string;
}

export const SEMANA_02_LESSON_08_METADATA: LessonMetadata = {
  week: 'Semana 2',
  round: 'RODADA 08',
  day: 'DIA 008 DO CRONOGRAMA',
  chapter: 'KAPITEL 3, TEIL B, C e D (p. 72–84)',
  title: 'As 5 Famílias do Plural, Substantivos Compostos (Komposita), Pronomes Pessoais no Acusativo, Cidades Alemãs, Munique, Imperativo Formal e Präteritum (war/hatte)',
  subtitle: 'Domínio das terminações de plural e Umlaut, substituição pronominal com acusativo direto, pontos turísticos, rotina hoteleira e passado simples',
  totalHours: '3 Horas (Bloco 1: 60 min | Bloco 2: 60 min | Bloco 3: 60 min)',
};

// 1.1 As 5 Famílias do Plural
export interface PluralFamily {
  familia: number;
  terminacao: string;
  umlaut: string;
  exemploSingular: string;
  exemploPlural: string;
  traducao: string;
  exemplos: { singular: string; plural: string; traducao: string; temUmlaut?: boolean }[];
  dica: string;
}

export const PLURAL_FAMILIES_DATA: PluralFamily[] = [
  {
    familia: 1,
    terminacao: '-e',
    umlaut: 'às vezes (com vogais a, o, u)',
    exemploSingular: 'der Tisch',
    exemploPlural: 'die Tische',
    traducao: 'mesa / mesas',
    dica: 'Muito comum em substantivos masculinos e neutros monossilábicos. Femininos monossilábicos que entram aqui sempre recebem Umlaut (ex: die Nacht -> die Nächte).',
    exemplos: [
      { singular: 'der Tisch', plural: 'die Tische', traducao: 'mesa' },
      { singular: 'der Stuhl', plural: 'die Stühle', traducao: 'cadeira', temUmlaut: true },
      { singular: 'der Tag', plural: 'die Tage', traducao: 'dia' },
      { singular: 'die Nacht', plural: 'die Nächte', traducao: 'noite', temUmlaut: true },
      { singular: 'das Jahr', plural: 'die Jahre', traducao: 'ano' },
      { singular: 'das Heft', plural: 'die Hefte', traducao: 'caderno' },
    ],
  },
  {
    familia: 2,
    terminacao: '-er',
    umlaut: 'quase sempre (se a vogal permitir: a, o, u, au)',
    exemploSingular: 'das Kind',
    exemploPlural: 'die Kinder',
    traducao: 'criança / crianças',
    dica: 'Predominante em substantivos neutros curtos e alguns poucos masculinos (der Mann, der Wald). Nunca ocorre em substantivos femininos!',
    exemplos: [
      { singular: 'das Kind', plural: 'die Kinder', traducao: 'criança' },
      { singular: 'das Haus', plural: 'die Häuser', traducao: 'casa', temUmlaut: true },
      { singular: 'der Mann', plural: 'die Männer', traducao: 'homem', temUmlaut: true },
      { singular: 'das Bild', plural: 'die Bilder', traducao: 'quadro, imagem' },
      { singular: 'das Buch', plural: 'die Bücher', traducao: 'livro', temUmlaut: true },
      { singular: 'das Wort', plural: 'die Wörter', traducao: 'palavra (isolada)', temUmlaut: true },
    ],
  },
  {
    familia: 3,
    terminacao: '-(e)n',
    umlaut: 'NUNCA recebe trema!',
    exemploSingular: 'die Frau',
    exemploPlural: 'die Frauen',
    traducao: 'mulher / mulheres',
    dica: 'A família mais abundante do alemão: abrange cerca de 90% dos substantivos femininos (terminados em -e, -ung, -heit, -keit, -ion, -tät) e masculinos fracos (n-Deklination).',
    exemplos: [
      { singular: 'die Frau', plural: 'die Frauen', traducao: 'mulher' },
      { singular: 'die Lampe', plural: 'die Lampen', traducao: 'lâmpada' },
      { singular: 'die Tasse', plural: 'die Tassen', traducao: 'xícara' },
      { singular: 'der Mensch', plural: 'die Menschen', traducao: 'ser humano' },
      { singular: 'die Universität', plural: 'die Universitäten', traducao: 'universidade' },
      { singular: 'die Nation', plural: 'die Nationen', traducao: 'nação' },
    ],
  },
  {
    familia: 4,
    terminacao: '-s',
    umlaut: 'NUNCA recebe trema!',
    exemploSingular: 'das Auto',
    exemploPlural: 'die Autos',
    traducao: 'carro / carros',
    dica: 'Típica de palavras de origem estrangeira (inglesa/francesa), abreviações e palavras terminadas em vogais abertas (a, i, o, u, y).',
    exemplos: [
      { singular: 'das Auto', plural: 'die Autos', traducao: 'carro' },
      { singular: 'das Hobby', plural: 'die Hobbys', traducao: 'passatempo' },
      { singular: 'der Park', plural: 'die Parks', traducao: 'parque' },
      { singular: 'das Büro', plural: 'die Büros', traducao: 'escritório' },
      { singular: 'das Hotel', plural: 'die Hotels', traducao: 'hotel' },
      { singular: 'das Restaurant', plural: 'die Restaurants', traducao: 'restaurante' },
    ],
  },
  {
    familia: 5,
    terminacao: 'sem terminação (terminação zero -Ø)',
    umlaut: 'às vezes (com a, o, u)',
    exemploSingular: 'der Lehrer',
    exemploPlural: 'die Lehrer',
    traducao: 'professor / professores',
    dica: 'Característica de substantivos masculinos e neutros terminados em -er, -el, -en e diminutivos em -chen e -lein.',
    exemplos: [
      { singular: 'der Lehrer', plural: 'die Lehrer', traducao: 'professor' },
      { singular: 'der Schüler', plural: 'die Schüler', traducao: 'aluno' },
      { singular: 'der Vater', plural: 'die Väter', traducao: 'pai', temUmlaut: true },
      { singular: 'die Mutter', plural: 'die Mütter', traducao: 'mãe', temUmlaut: true },
      { singular: 'das Mädchen', plural: 'die Mädchen', traducao: 'menina' },
      { singular: 'der Garten', plural: 'die Gärten', traducao: 'jardim', temUmlaut: true },
    ],
  },
];

// 1.2 Substantivos Compostos (Komposita)
export interface CompoundNoun {
  composto: string;
  artigo: string;
  primeiroElemento: string;
  ultimoElemento: string;
  plural: string;
  traducao: string;
}

export const COMPOUND_NOUNS_DATA: CompoundNoun[] = [
  {
    composto: 'das Hotelzimmer',
    artigo: 'das',
    primeiroElemento: 'das Hotel',
    ultimoElemento: 'das Zimmer',
    plural: 'die Hotelzimmer',
    traducao: 'quarto de hotel',
  },
  {
    composto: 'der Schreibtisch',
    artigo: 'der',
    primeiroElemento: 'schreiben (verbo)',
    ultimoElemento: 'der Tisch',
    plural: 'die Schreibtische',
    traducao: 'escrivaninha',
  },
  {
    composto: 'die Telefonnummer',
    artigo: 'die',
    primeiroElemento: 'das Telefon',
    ultimoElemento: 'die Nummer',
    plural: 'die Telefonnummern',
    traducao: 'número de telefone',
  },
  {
    composto: 'das Krankenhaus',
    artigo: 'das',
    primeiroElemento: 'krank (adjetivo) + -en-',
    ultimoElemento: 'das Haus',
    plural: 'die Krankenhäuser',
    traducao: 'hospital',
  },
  {
    composto: 'der Kühlschrank',
    artigo: 'der',
    primeiroElemento: 'kühl (adjetivo)',
    ultimoElemento: 'der Schrank',
    plural: 'die Kühlschränke',
    traducao: 'geladeira',
  },
  {
    composto: 'das Computerprogramm',
    artigo: 'das',
    primeiroElemento: 'der Computer',
    ultimoElemento: 'das Programm',
    plural: 'die Computerprogramme',
    traducao: 'programa de computador',
  },
  {
    composto: 'die Kreditkarte',
    artigo: 'die',
    primeiroElemento: 'der Kredit',
    ultimoElemento: 'die Karte',
    plural: 'die Kreditkarten',
    traducao: 'cartão de crédito',
  },
  {
    composto: 'der Biergarten',
    artigo: 'der',
    primeiroElemento: 'das Bier',
    ultimoElemento: 'der Garten',
    plural: 'die Biergärten',
    traducao: 'jardim de cerveja',
  },
  {
    composto: 'der Zimmerschlüssel',
    artigo: 'der',
    primeiroElemento: 'das Zimmer',
    ultimoElemento: 'der Schlüssel',
    plural: 'die Zimmerschlüssel',
    traducao: 'chave do quarto',
  },
  {
    composto: 'der Terminkalender',
    artigo: 'der',
    primeiroElemento: 'der Termin',
    ultimoElemento: 'der Kalender',
    plural: 'die Terminkalender',
    traducao: 'agenda de compromissos',
  },
];

// 1.3 Pronomes Pessoais no Acusativo
export interface PersonalPronounAkkusativ {
  nominativo: string;
  acusativo: string;
  traducao: string;
  exemplo: string;
  exemploPt: string;
}

export const PERSONAL_PRONOUNS_AKKUSATIV: PersonalPronounAkkusativ[] = [
  { nominativo: 'ich', acusativo: 'mich', traducao: 'me / a mim', exemplo: 'Liebst du mich?', exemploPt: 'Você me ama?' },
  { nominativo: 'du', acusativo: 'dich', traducao: 'te / a ti', exemplo: 'Ich rufe dich an.', exemploPt: 'Eu te ligo.' },
  { nominativo: 'er', acusativo: 'ihn', traducao: 'o / a ele (masc.)', exemplo: 'Ich sehe ihn.', exemploPt: 'Eu o vejo.' },
  { nominativo: 'sie', acusativo: 'sie', traducao: 'a / a ela (fem.)', exemplo: 'Ich kenne sie.', exemploPt: 'Eu a conheço.' },
  { nominativo: 'es', acusativo: 'es', traducao: 'o/a (neutro)', exemplo: 'Ich brauche es.', exemploPt: 'Eu preciso dele/disso.' },
  { nominativo: 'wir', acusativo: 'uns', traducao: 'nos / a nós', exemplo: 'Er besucht uns.', exemploPt: 'Ele nos visita.' },
  { nominativo: 'ihr', acusativo: 'euch', traducao: 'vos / a vocês', exemplo: 'Ich höre euch.', exemploPt: 'Eu ouço vocês.' },
  { nominativo: 'sie (Pl.)', acusativo: 'sie', traducao: 'os / as / a eles(as)', exemplo: 'Ich mag sie.', exemploPt: 'Eu gosto deles/delas.' },
  { nominativo: 'Sie (formal)', acusativo: 'Sie', traducao: 'o senhor / a senhora', exemplo: 'Ich möchte Sie sprechen.', exemploPt: 'Gostaria de falar com o senhor.' },
];

// 1.4 & 1.5 Modais com Pronomes no Acusativo (Satzklammer)
export const MODALS_WITH_AKKUSATIV_PRONOUNS = [
  { modal: 'möchten', pronome: 'ihn', frase: 'Ich möchte ihn sehen.', traducao: 'Eu gostaria de vê-lo.' },
  { modal: 'möchten', pronome: 'sie', frase: 'Ich möchte sie sehen.', traducao: 'Eu gostaria de vê-la.' },
  { modal: 'möchten', pronome: 'es', frase: 'Ich möchte es sehen.', traducao: 'Eu gostaria de vê-lo (neutro).' },
  { modal: 'möchten', pronome: 'Sie', frase: 'Ich möchte Sie sehen.', traducao: 'Eu gostaria de ver o senhor/a senhora.' },
  { modal: 'können', pronome: 'ihn', frase: 'Ich kann ihn hören.', traducao: 'Eu posso ouvi-lo / consigo ouvi-lo.' },
  { modal: 'können', pronome: 'sie', frase: 'Ich kann sie verstehen.', traducao: 'Eu consigo entendê-la.' },
  { modal: 'können', pronome: 'mich', frase: 'Kannst du mich abholen?', traducao: 'Você pode me buscar?' },
  { modal: 'können', pronome: 'uns', frase: 'Können Sie uns helfen?', traducao: 'O senhor pode nos ajudar?' },
];

// 2.1 Texto B1 — Ranking de Visitantes das Cidades Alemãs
export interface CityVisitorRank {
  pos: number;
  cidade: string;
  visitantesAno: string;
  regiao: string;
}

export const GERMAN_CITIES_RANKING: CityVisitorRank[] = [
  { pos: 1, cidade: 'Berlin', visitantesAno: '13 503 000', regiao: 'im Osten' },
  { pos: 2, cidade: 'München', visitantesAno: '8 266 000', regiao: 'im Süden' },
  { pos: 3, cidade: 'Hamburg', visitantesAno: '7 178 000', regiao: 'im Norden' },
  { pos: 4, cidade: 'Frankfurt am Main', visitantesAno: '5 935 000', regiao: 'im Westen' },
  { pos: 5, cidade: 'Köln', visitantesAno: '3 700 000', regiao: 'im Westen' },
  { pos: 6, cidade: 'Düsseldorf', visitantesAno: '3 069 000', regiao: 'im Westen' },
  { pos: 7, cidade: 'Dresden', visitantesAno: '2 247 000', regiao: 'im Osten' },
  { pos: 8, cidade: 'Stuttgart', visitantesAno: '2 063 000', regiao: 'im Süden' },
  { pos: 9, cidade: 'Nürnberg', visitantesAno: '2 001 000', regiao: 'im Süden' },
  { pos: 10, cidade: 'Leipzig', visitantesAno: '1 837 000', regiao: 'im Osten' },
  { pos: 11, cidade: 'Hannover', visitantesAno: '1 354 000', regiao: 'im Norden' },
  { pos: 12, cidade: 'Bremen', visitantesAno: '1 166 000', regiao: 'im Norden' },
  { pos: 13, cidade: 'Rostock', visitantesAno: '818 000', regiao: 'im Norden (Ostseeküste)' },
  { pos: 14, cidade: 'Lübeck', visitantesAno: '796 000', regiao: 'im Norden' },
];

// 2.4 Texto B4 — München (Munique)
export const MUNICH_PROFILE_DATA = {
  title: 'München – die Landeshauptstadt Bayerns',
  population: 'ca. 1,56 Millionen Menschen',
  location: 'im Süden von Deutschland (Bundesland Bayern)',
  universities: [
    { name: 'Ludwig-Maximilians-Universität (LMU)', students: '51 000 Studenten' },
    { name: 'Technische Universität München (TUM)', students: 'Renomada em tecnologia e engenharia' },
  ],
  culture: {
    theaters: 71,
    orchestras: '3 große Orchester (u.a. Münchner Philharmoniker)',
    museums: '50 Museen und Sammlungen',
  },
  altePinakothek: {
    collection: 'Umfasst 9 000 Bilder europäischer Maler aus dem 15. bis 18. Jahrhundert',
    famousArtists: 'Albrecht Dürer und Peter Paul Rubens',
  },
  pinakothekDerModerne: 'Moderne Kunst und Architektur aus dem 20. und 21. Jahrhundert',
  hofbraeuhaus: {
    age: '400 Jahre alt (das berühmteste Wirtshaus der Welt)',
    beerPerDay: '1 000 Liter Bier täglich',
  },
  firms: [
    { name: 'Siemens', sector: 'Hersteller von Haushaltsgeräten, Medizintechnik und mehr' },
    { name: 'BMW', sector: 'Hersteller von Premium-Automobilen und Motorrädern' },
    { name: 'MAN', sector: 'Hersteller von Lastkraftwagen (LKWs) und Bussen' },
    { name: 'Rodenstock', sector: 'Hersteller von Brillen und optischen Linsen' },
  ],
};

// 2.16 Texto D1 — Wichtige Redemittel (Diálogos no Hotel & Turismo)
export const HOTEL_REDEMITTEL_DIALOGS = [
  {
    role: 'Hotelgast',
    de: 'Haben Sie noch ein Zimmer frei?',
    pt: 'O senhor ainda tem um quarto vago/livre?',
  },
  {
    role: 'Rezeptionist',
    de: 'Haben Sie eine Reservierung?',
    pt: 'O senhor tem uma reserva?',
  },
  {
    role: 'Hotelgast',
    de: 'Wir möchten gerne ein Doppelzimmer.',
    pt: 'Nós gostaríamos de um quarto duplo.',
  },
  {
    role: 'Rezeptionist',
    de: 'Wir haben noch Zimmer frei. Wie lange möchten Sie bleiben?',
    pt: 'Ainda temos quartos vagos. Quanto tempo os senhores desejam ficar?',
  },
  {
    role: 'Hotelgast',
    de: 'Wir bleiben zwei Nächte. Wie viel kostet ein Doppelzimmer?',
    pt: 'Ficamos duas noites. Quanto custa um quarto duplo?',
  },
  {
    role: 'Rezeptionist',
    de: 'Das Zimmer kostet 80 Euro pro Nacht. Der Preis ist inklusive Frühstück.',
    pt: 'O quarto custa 80 euros por noite. O preço inclui café da manhã.',
  },
  {
    role: 'Hotelgast',
    de: 'Hat das Zimmer einen Fernseher und ein Bad?',
    pt: 'O quarto tem televisão e banheiro?',
  },
  {
    role: 'Rezeptionist',
    de: 'Ja, alle unsere Zimmer haben ein Bad und natürlich WLAN.',
    pt: 'Sim, todos os nossos quartos têm banheiro e naturalmente Wi-Fi.',
  },
  {
    role: 'Hotelgast',
    de: 'Gut, wir nehmen das Zimmer.',
    pt: 'Ótimo, nós ficamos com o quarto.',
  },
  {
    role: 'Rezeptionist',
    de: 'Hier ist Ihr Zimmerschlüssel. Ihre Zimmernummer ist die 405. Schönen Aufenthalt!',
    pt: 'Aqui está a chave do quarto. Seu número de quarto é o 405. Tenha uma excelente estadia!',
  },
];

// 2.17 Texto D2 — Dicionário de 21 Verbos Fundamentais
export interface VerbDictionaryEntry {
  verbo: string;
  traducao: string;
  exemplo: string;
  exemploPt: string;
  conjugacao: string;
}

export const VERB_DICTIONARY_D2: VerbDictionaryEntry[] = [
  { verbo: 'möchte(n)', traducao: 'gostaria de', exemplo: 'Ich möchte ein Doppelzimmer.', exemploPt: 'Gostaria de um quarto duplo.', conjugacao: 'ich möchte, du möchtest, er möchte, wir möchten' },
  { verbo: 'bewundern', traducao: 'admirar', exemplo: 'Im Museum kann man berühmte Bilder bewundern.', exemploPt: 'No museu pode-se admirar quadros famosos.', conjugacao: 'ich bewundere, du bewunderst, er bewundert' },
  { verbo: 'bieten', traducao: 'oferecer', exemplo: 'Der Englische Garten bietet viele Freizeitmöglichkeiten.', exemploPt: 'O Jardim Inglês oferece muitas opções de lazer.', conjugacao: 'er bietet, hat geboten' },
  { verbo: 'bleiben', traducao: 'permanecer, ficar', exemplo: 'Wir bleiben zwei Nächte im Hotel.', exemploPt: 'Ficamos duas noites no hotel.', conjugacao: 'ich bleibe, du bleibst, er bleibt' },
  { verbo: 'brauchen', traducao: 'precisar de (+ Akkusativ)', exemplo: 'Ich brauche eine neue Lampe.', exemploPt: 'Preciso de uma luminária nova.', conjugacao: 'ich brauche, du brauchst, er braucht' },
  { verbo: 'bringen', traducao: 'trazer / colocar em ordem', exemplo: 'Das bringen wir sofort in Ordnung.', exemploPt: 'Nós resolvemos isso imediatamente.', conjugacao: 'ich bringe, du bringst, er bringt' },
  { verbo: 'duschen', traducao: 'tomar banho de chuveiro', exemplo: 'Ich dusche jeden Morgen.', exemploPt: 'Tomo banho toda manhã.', conjugacao: 'ich dusche, du duschst, er duscht' },
  { verbo: 'finden', traducao: 'encontrar / achar (opinião)', exemplo: 'Ich finde das Zimmer sehr gemütlich.', exemploPt: 'Acho o quarto muito acolhedor.', conjugacao: 'ich finde, du findest, er findet' },
  { verbo: 'liegen', traducao: 'estar localizado / deitado', exemplo: 'Mein Hotel liegt im Stadtzentrum.', exemploPt: 'Meu hotel fica no centro da cidade.', conjugacao: 'das Hotel liegt, lag, hat gelegen' },
  { verbo: 'nehmen', traducao: 'pegar, tomar (e -> i)', exemplo: 'Wir nehmen das Doppelzimmer.', exemploPt: 'Nós pegamos o quarto duplo.', conjugacao: 'ich nehme, du nimmst, er nimmt' },
  { verbo: 'öffnen', traducao: 'abrir', exemplo: 'Das Museum öffnet um 9.00 Uhr.', exemploPt: 'O museu abre às 9h00.', conjugacao: 'ich öffne, du öffnest, er öffnet' },
  { verbo: 'parken', traducao: 'estacionar', exemplo: 'Hier kann man sein Auto parken.', exemploPt: 'Aqui se pode estacionar o carro.', conjugacao: 'ich parke, du parkst, er parkt' },
  { verbo: 'schlafen', traducao: 'dormir (a -> ä)', exemplo: 'Er schläft sehr gut im Hotelbett.', exemploPt: 'Ele dorme muito bem na cama do hotel.', conjugacao: 'ich schlafe, du schläfst, er schläft' },
  { verbo: 'schließen', traducao: 'fechar', exemplo: 'Die Bank schließt um 18.00 Uhr.', exemploPt: 'O banco fecha às 18h00.', conjugacao: 'ich schließe, du schließt, er schließt' },
  { verbo: 'senden', traducao: 'enviar', exemplo: 'Ich sende Ihnen die Bestätigung.', exemploPt: 'Envio a confirmação ao senhor.', conjugacao: 'ich sende, du sendest, er sendet' },
  { verbo: 'spazieren gehen', traducao: 'passear, caminhar', exemplo: 'Am Nachmittag gehe ich spazieren.', exemploPt: 'À tarde eu vou passear.', conjugacao: 'ich gehe spazieren, du gehst spazieren' },
  { verbo: 'übernachten', traducao: 'pernoitar', exemplo: 'Wo möchten Sie übernachten?', exemploPt: 'Onde o senhor gostaria de pernoitar?', conjugacao: 'ich übernachte, du übernachtest' },
  { verbo: 'unternehmen', traducao: 'empreender, fazer atividade', exemplo: 'Heute möchte ich etwas unternehmen.', exemploPt: 'Hoje gostaria de fazer algum passeio.', conjugacao: 'ich unternehme, du unternimmst' },
  { verbo: 'wünschen', traducao: 'desejar', exemplo: 'Sie wünschen? Ein Einzelzimmer, bitte.', exemploPt: 'O senhor deseja? Um quarto individual, por favor.', conjugacao: 'ich wünsche, du wünschst' },
  { verbo: 'zahlen / bezahlen', traducao: 'pagar', exemplo: 'Zahlen Sie bar oder mit Karte?', exemploPt: 'O senhor paga em dinheiro ou no cartão?', conjugacao: 'ich bezahle, du bezahlst' },
  { verbo: 'zeigen', traducao: 'mostrar, exibir', exemplo: 'Das Museum zeigt historische Autos.', exemploPt: 'O museu exibe carros históricos.', conjugacao: 'das Museum zeigt, hat gezeigt' },
];

// 2.19 Tabela Lexical Primária (28 Termos)
export interface LexicalTermDia008 {
  word: string;
  classe: string;
  plural: string;
  traducao: string;
  fraseModelo: string;
  traducaoFrase: string;
}

export const LEXICAL_TERMS_DIA_008: LexicalTermDia008[] = [
  { word: 'die Sehenswürdigkeit', classe: 'Subst. fem.', plural: 'die Sehenswürdigkeiten', traducao: 'ponto turístico, atração', fraseModelo: 'München hat viele weltberühmte Sehenswürdigkeiten.', traducaoFrase: 'Munique tem muitos pontos turísticos mundialmente famosos.' },
  { word: 'der Besucher', classe: 'Subst. masc.', plural: 'die Besucher', traducao: 'visitante', fraseModelo: 'Berlin hat über 13 Millionen Besucher pro Jahr.', traducaoFrase: 'Berlim tem mais de 13 milhões de visitantes por ano.' },
  { word: 'die Landeshauptstadt', classe: 'Subst. fem.', plural: 'die Landeshauptstädte', traducao: 'capital do estado federado', fraseModelo: 'München ist die Landeshauptstadt von Bayern.', traducaoFrase: 'Munique é a capital do estado da Baviera.' },
  { word: 'die Universität', classe: 'Subst. fem.', plural: 'die Universitäten', traducao: 'universidade', fraseModelo: 'An der LMU studieren über 50 000 Studenten.', traducaoFrase: 'Na LMU estudam mais de 50.000 estudantes.' },
  { word: 'der Student', classe: 'Subst. masc.', plural: 'die Studenten', traducao: 'estudante universitário', fraseModelo: 'Die Studenten bekommen Rabatt im Museum.', traducaoFrase: 'Os estudantes recebem desconto no museu.' },
  { word: 'das Theater', classe: 'Subst. neutro', plural: 'die Theater', traducao: 'teatro', fraseModelo: 'München verfügt über 71 renommierte Theater.', traducaoFrase: 'Munique dispõe de 71 teatros renomados.' },
  { word: 'das Orchester', classe: 'Subst. neutro', plural: 'die Orchester', traducao: 'orquestra', fraseModelo: 'Drei große Orchester spielen klassische Musik.', traducaoFrase: 'Três grandes orquestras tocam música clássica.' },
  { word: 'das Museum', classe: 'Subst. neutro', plural: 'die Museen', traducao: 'museu', fraseModelo: 'Das Deutsche Museum zeigt Technikgeschichte.', traducaoFrase: 'O Deutsches Museum mostra a história da tecnologia.' },
  { word: 'die Sammlung', classe: 'Subst. fem.', plural: 'die Sammlungen', traducao: 'coleção, acervo', fraseModelo: 'Die Sammlung umfasst 9 000 Meisterwerke.', traducaoFrase: 'O acervo reúne 9.000 obras-primas.' },
  { word: 'das Jahrhundert', classe: 'Subst. neutro', plural: 'die Jahrhunderte', traducao: 'século', fraseModelo: 'Gemälde aus dem zwanzigsten Jahrhundert.', traducaoFrase: 'Pinturas do século vinte.' },
  { word: 'der Maler', classe: 'Subst. masc.', plural: 'die Maler', traducao: 'pintor', fraseModelo: 'Albrecht Dürer war ein berühmter deutscher Maler.', traducaoFrase: 'Albrecht Dürer foi um célebre pintor alemão.' },
  { word: 'die Kunst', classe: 'Subst. fem.', plural: 'sem plural', traducao: 'arte', fraseModelo: 'Ich interessiere mich sehr für moderne Kunst.', traducaoFrase: 'Interesso-me muito por arte moderna.' },
  { word: 'die Architektur', classe: 'Subst. fem.', plural: 'sem plural', traducao: 'arquitetura', fraseModelo: 'Die Architektur der Pinakothek ist beeindruckend.', traducaoFrase: 'A arquitetura da Pinacoteca é impressionante.' },
  { word: 'das Wirtshaus', classe: 'Subst. neutro', plural: 'die Wirtshäuser', traducao: 'taberna, cervejaria tradicional', fraseModelo: 'Das Hofbräuhaus ist das bekannteste Wirtshaus der Welt.', traducaoFrase: 'O Hofbräuhaus é a taberna mais conhecida do mundo.' },
  { word: 'der Liter', classe: 'Subst. masc.', plural: 'die Liter', traducao: 'litro', fraseModelo: 'Die Gäste trinken täglich 1 000 Liter Bier.', traducaoFrase: 'Os clientes bebem 1.000 litros de cerveja diariamente.' },
  { word: 'die Firma', classe: 'Subst. fem.', plural: 'die Firmen', traducao: 'empresa, firma', fraseModelo: 'Große Firmen wie BMW haben ihren Sitz in München.', traducaoFrase: 'Grandes empresas como a BMW têm sede em Munique.' },
  { word: 'der Hersteller', classe: 'Subst. masc.', plural: 'die Hersteller', traducao: 'fabricante, produtor', fraseModelo: 'Siemens ist Hersteller von Medizintechnik.', traducaoFrase: 'A Siemens é fabricante de tecnologia médica.' },
  { word: 'das Haushaltsgerät', classe: 'Subst. neutro', plural: 'die Haushaltsgeräte', traducao: 'eletrodoméstico', fraseModelo: 'Moderne Haushaltsgeräte sparen viel Energie.', traducaoFrase: 'Eletrodomésticos modernos poupam muita energia.' },
  { word: 'der Lastkraftwagen', classe: 'Subst. masc.', plural: 'die Lastkraftwagen (LKWs)', traducao: 'caminhão', fraseModelo: 'MAN produziert schwere Lastkraftwagen.', traducaoFrase: 'A MAN produz caminhões pesados.' },
  { word: 'die Brille', classe: 'Subst. fem.', plural: 'die Brillen', traducao: 'óculos', fraseModelo: 'Rodenstock stellt hochwertige Brillen her.', traducaoFrase: 'A Rodenstock fabrica óculos de alta qualidade.' },
  { word: 'die Öffnungszeiten', classe: 'Subst. fem. pl.', plural: 'die Öffnungszeiten', traducao: 'horário de funcionamento', fraseModelo: 'Die Öffnungszeiten sind von 9 bis 18 Uhr.', traducaoFrase: 'O horário de funcionamento é das 9h às 18h.' },
  { word: 'die Eintrittskarte', classe: 'Subst. fem.', plural: 'die Eintrittskarten', traducao: 'ingresso, bilhete de entrada', fraseModelo: 'Eine Eintrittskarte kostet 10 Euro.', traducaoFrase: 'Um ingresso custa 10 euros.' },
  { word: 'die Tageskarte', classe: 'Subst. fem.', plural: 'die Tageskarten', traducao: 'ingresso para o dia todo', fraseModelo: 'Die Tageskarte gilt für alle Ausstellungen.', traducaoFrase: 'O ingresso diário vale para todas as exposições.' },
  { word: 'die Studentenkarte', classe: 'Subst. fem.', plural: 'die Studentenkarten', traducao: 'ingresso de estudante', fraseModelo: 'Studentenkarten sind wesentlich günstiger.', traducaoFrase: 'Ingressos de estudante são consideravelmente mais baratos.' },
  { word: 'die Familienkarte', classe: 'Subst. fem.', plural: 'die Familienkarten', traducao: 'ingresso familiar', fraseModelo: 'Die Familienkarte kostet 29 Euro.', traducaoFrase: 'O ingresso familiar custa 29 euros.' },
  { word: 'der Schreibtisch', classe: 'Subst. masc.', plural: 'die Schreibtische', traducao: 'escrivaninha', fraseModelo: 'Im Zimmer steht ein bequemer Schreibtisch.', traducaoFrase: 'No quarto há uma escrivaninha confortável.' },
  { word: 'das Doppelzimmer', classe: 'Subst. neutro', plural: 'die Doppelzimmer', traducao: 'quarto duplo', fraseModelo: 'Wir möchten ein ruhiges Doppelzimmer buchen.', traducaoFrase: 'Gostaríamos de reservar um quarto duplo silencioso.' },
  { word: 'der Terminkalender', classe: 'Subst. masc.', plural: 'die Terminkalender', traducao: 'agenda de compromissos', fraseModelo: 'Ich trage das Treffen in meinen Terminkalender ein.', traducaoFrase: 'Anoto a reunião na minha agenda.' },
];

// 2.20 Umgangssprache (30 Expressões)
export interface ColloquialDia008 {
  expressao: string;
  traducao: string;
  contexto: string;
}

export const COLLOQUIAL_DIA_008: ColloquialDia008[] = [
  { expressao: 'Halt den Mund!', traducao: 'Cala a boca! / Fique quieto!', contexto: 'Informal enérgico' },
  { expressao: 'Lass mich in Ruhe!', traducao: 'Deixa-me em paz!', contexto: 'Emocional, pedido de afastamento' },
  { expressao: 'Was hältst du davon?', traducao: 'O que você acha disso?', contexto: 'Pedido sincero de opinião' },
  { expressao: 'Ich rate dir gut.', traducao: 'Eu te dou um bom conselho.', contexto: 'Aconselhamento fraterno' },
  { expressao: "Nimm's leicht!", traducao: 'Leve na boa! / Não esquenta!', contexto: 'Consolo descontraído' },
  { expressao: 'Iss was!', traducao: 'Come alguma coisa!', contexto: 'Zelo familiar ou hospitalidade' },
  { expressao: 'Vergiss es!', traducao: 'Esquece! / Nem pensar!', contexto: 'Rejeição definitiva' },
  { expressao: 'Hilf mir mal!', traducao: 'Me dá uma força aqui!', contexto: 'Pedido informal rápido' },
  { expressao: 'Wirf nicht alles weg!', traducao: 'Não jogue tudo fora!', contexto: 'Advertência de prudência' },
  { expressao: 'Ich sterbe vor Hunger!', traducao: 'Estou morrendo de fome!', contexto: 'Exagero hiperbólico cotidiano' },
  { expressao: 'Das trifft sich gut!', traducao: 'Isso calha muito bem! / Que coincidência ótima!', contexto: 'Circunstância oportuna' },
  { expressao: 'Weißt du was?', traducao: 'Quer saber de uma coisa? / Sabe o quê?', contexto: 'Abertura enfática de diálogo' },
  { expressao: 'Ich weiß nicht.', traducao: 'Eu não sei. / Sei lá.', contexto: 'Resposta de incerteza' },
  { expressao: 'Woher soll ich das wissen?', traducao: 'Como é que eu vou saber disso?!', contexto: 'Irritação diante de pergunta inesperada' },
  { expressao: 'Wissen ist Macht.', traducao: 'Conhecimento é poder.', contexto: 'Provérbio clássico' },
  { expressao: 'Ich mag dich.', traducao: 'Eu gosto de você.', contexto: 'Expressão afetiva de carinho' },
  { expressao: 'Magst du mich?', traducao: 'Você gosta de mim?', contexto: 'Pergunta de afeto' },
  { expressao: 'Das mag sein.', traducao: 'Pode ser. / É bem possível.', contexto: 'Concordância parcial' },
  { expressao: 'Reden wir nicht darüber!', traducao: 'Não vamos falar sobre isso!', contexto: 'Mudança deliberada de assunto' },
  { expressao: 'Du redest wirres Zeug.', traducao: 'Você está falando bobagem / sem nexo.', contexto: 'Crítica direta' },
  { expressao: 'Warte mal!', traducao: 'Espera aí! / Peraí!', contexto: 'Pausa momentânea' },
  { expressao: 'Ich kann nicht mehr warten.', traducao: 'Não aguento mais esperar.', contexto: 'Impaciência' },
  { expressao: 'Warten wir ab!', traducao: 'Vamos aguardar para ver!', contexto: 'Paciência estratégica' },
  { expressao: 'Darauf habe ich gewartet!', traducao: 'Era por isso que eu estava esperando!', contexto: 'Entusiasmo ao ver algo acontecer' },
  { expressao: 'Bade dich nicht aus!', traducao: 'Não se esgote! / Cuidado no banho!', contexto: 'Advertência informal' },
  { expressao: 'Schönen Aufenthalt!', traducao: 'Tenha uma boa estadia!', contexto: 'Recepção hoteleira' },
  { expressao: 'Gute Reise!', traducao: 'Boa viagem!', contexto: 'Despedida de viagem' },
  { expressao: 'Herzlich willkommen!', traducao: 'Seja muito bem-vindo!', contexto: 'Boas-vindas formais/afetuosas' },
  { expressao: 'Bis später!', traducao: 'Até mais tarde!', contexto: 'Despedida rápida' },
  { expressao: 'Auf Wiederhören!', traducao: 'Até logo (ao telefone)!', contexto: 'Encerramento de ligação formal' },
];

// 3.15 & 3.16 Tradução Reversa de Blindagem (15 Sentenças)
export interface ReverseTranslationDia008 {
  id: number;
  ptSentence: string;
  deSolution: string;
  points: string[];
}

export const REVERSE_TRANSLATION_DIA_008: ReverseTranslationDia008[] = [
  {
    id: 1,
    ptSentence: 'Eu gostaria de um quarto individual. O quarto tem uma televisão e Wi-Fi.',
    deSolution: 'Ich möchte ein Einzelzimmer. Das Zimmer hat einen Fernseher und WLAN.',
    points: ['möchten na 1ª sg.: möchte', 'ein Einzelzimmer (acusativo neutro)', 'haben na 3ª sg.: hat', 'einen Fernseher (acusativo masculino: der -> einen)'],
  },
  {
    id: 2,
    ptSentence: 'O museu abre diariamente às 9h e fecha às 17h.',
    deSolution: 'Das Museum öffnet täglich um 9.00 Uhr und schließt um 17.00 Uhr.',
    points: ['öffnen e schließen com terminação regular -t', 'täglich = de segunda a domingo', 'Horário exato com a preposição um'],
  },
  {
    id: 3,
    ptSentence: 'Quanto custa um ingresso diário? — Custa 14 euros.',
    deSolution: 'Was kostet eine Tageskarte? — Sie kostet 14 Euro.',
    points: ['kosten na 3ª sg.: kostet', 'eine Tageskarte (acusativo feminino)', 'Pronome sie substitui die Tageskarte'],
  },
  {
    id: 4,
    ptSentence: 'Eu preciso de uma escrivaninha nova. Você tem uma?',
    deSolution: 'Ich brauche einen neuen Schreibtisch. Hast du einen?',
    points: ['brauchen rege acusativo direto', 'einen neuen Schreibtisch (adjetivo atributivo no acusativo masculino)', 'hast du einen (pronome acusativo)'],
  },
  {
    id: 5,
    ptSentence: 'Eu gostaria de uma xícara de café e um pedaço de bolo.',
    deSolution: 'Ich möchte eine Tasse Kaffee und ein Stück Kuchen.',
    points: ['möchten na 1ª sg.: möchte', 'uma xícara de café = eine Tasse Kaffee (sem preposição)', 'ein Stück Kuchen (acusativo neutro)'],
  },
  {
    id: 6,
    ptSentence: 'Onde fica o Museu Alemão? — Fica no centro de Munique.',
    deSolution: 'Wo ist das Deutsche Museum? — Es ist im Zentrum von München.',
    points: ['Pergunta de localização Wo?', 'im Zentrum (Dativo estático com in + dem)', 'von München'],
  },
  {
    id: 7,
    ptSentence: 'Eu vejo um filme. Você também vê um filme?',
    deSolution: 'Ich sehe einen Film. Siehst du auch einen Film?',
    points: ['sehen com alternância vocálica forte e -> ie em du siehst', 'einen Film (masculino acusativo)'],
  },
  {
    id: 8,
    ptSentence: 'Eu leio um romance. Você lê um jornal?',
    deSolution: 'Ich lese einen Roman. Liest du eine Zeitung?',
    points: ['lesen com alternância e -> ie e sibilante: du liest', 'einen Roman (masc.) e eine Zeitung (fem.)'],
  },
  {
    id: 9,
    ptSentence: 'Eu bebo um café. Você bebe uma cerveja?',
    deSolution: 'Ich trinke einen Kaffee. Trinkst du ein Bier?',
    points: ['trinken é regular no presente: trinke / trinkst', 'einen Kaffee (masc. acusativo) vs. ein Bier (neutro acusativo)'],
  },
  {
    id: 10,
    ptSentence: 'Eu como uma maçã. Você come uma banana?',
    deSolution: 'Ich esse einen Apfel. Isst du eine Banane?',
    points: ['essen com alternância e -> i: ich esse / du isst', 'einen Apfel (masc. acusativo) e eine Banane (fem.)'],
  },
  {
    id: 11,
    ptSentence: 'Eu o vejo. Você a vê?',
    deSolution: 'Ich sehe ihn. Siehst du sie?',
    points: ['Pronome acusativo masculino ihn substitui substantivos masculinos', 'Pronome acusativo feminino sie substitui femininos', 'Posição do pronome: imediatamente após o verbo'],
  },
  {
    id: 12,
    ptSentence: 'Eu te ligo. Você me liga?',
    deSolution: 'Ich rufe dich an. Rufst du mich an?',
    points: ['Verbo separável anrufen: prefixo an no final absoluto (Satzende)', 'Pronomes acusativos: dich (te) e mich (me)'],
  },
  {
    id: 13,
    ptSentence: 'Eu visito vocês. Vocês me visitam?',
    deSolution: 'Ich besuche euch. Besucht ihr mich?',
    points: ['Pronome de 2ª pessoa do plural no acusativo: euch', 'Pronome de 1ª pessoa no acusativo: mich'],
  },
  {
    id: 14,
    ptSentence: 'Eu conheço ele. Você conhece ela?',
    deSolution: 'Ich kenne ihn. Kennst du sie?',
    points: ['kennen rege acusativo direto', 'ihn (ele no acusativo) e sie (ela no acusativo)'],
  },
  {
    id: 15,
    ptSentence: 'Eu compro o livro. Você compra a revista?',
    deSolution: 'Ich kaufe das Buch. Kaufst du die Zeitschrift?',
    points: ['das Buch (neutro acusativo idêntico ao nominativo)', 'die Zeitschrift (feminino acusativo idêntico ao nominativo)'],
  },
];

// 3.17 Resumo dos Pontos-Chave do Dia 008
export const KEY_POINTS_DIA_008 = [
  { conceito: 'As 5 Famílias do Plural', regra: '1: -e (Tische); 2: -er (Kinder, Häuser); 3: -(e)n (Frauen); 4: -s (Autos); 5: sem terminação (Lehrer, Väter).' },
  { conceito: 'Plural dos Compostos (Komposita)', regra: 'O último elemento determina sempre o gênero e a terminação do plural (das Hotel + das Zimmer = die Hotelzimmer).' },
  { conceito: 'Pronomes Pessoais no Acusativo', regra: 'mich, dich, ihn, sie, es, uns, euch, sie, Sie. Substituem substantivos objetos diretos.' },
  { conceito: 'Posição do Pronome no Acusativo', regra: 'Em alemão, o pronome fica DEPOIS do verbo conjugado (Ich sehe dich / Ich kenne ihn), diferentemente do português que aceita próclise.' },
  { conceito: 'Verbos Modais com Pronomes', regra: 'Satzklammer rígida: O pronome acusativo fica no Mittelfeld logo após o sujeito, e o verbo principal vai ao Satzende (Ich möchte ihn sehen / Ich kann sie hören).' },
  { conceito: 'Cidades da Alemanha & Pontos Cardeais', regra: 'im Norden (Hamburg, Bremen), im Süden (München, Stuttgart), im Osten (Berlin, Leipzig, Dresden), im Westen (Köln, Frankfurt), in der Mitte.' },
  { conceito: 'Perfil Cultural de Munique', regra: 'Capital da Baviera, 1,56M habitantes, 2 universidades (LMU e TUM), 71 teatros, 50 museus, Hofbräuhaus (400 anos, 1.000L de cerveja/dia), sedes da Siemens, BMW, MAN e Rodenstock.' },
  { conceito: 'Imperativo Formal (Höflichkeitsform)', regra: 'Verbo no infinitivo na Posição 1 invertido com Sie (Kochen Sie die Kartoffeln! / Waschen Sie das Obst!).' },
  { conceito: 'Präteritum de sein (war/waren)', regra: 'ich war, du warst, er war, wir waren, ihr wart, sie waren. 1ª e 3ª pessoas do singular são idênticas.' },
  { conceito: 'Präteritum de haben (hatte/hatten)', regra: 'ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten. 1ª e 3ª pessoas do singular são idênticas.' },
];
