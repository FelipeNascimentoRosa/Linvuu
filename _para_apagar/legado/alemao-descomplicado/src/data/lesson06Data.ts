export const LESSON_06_METADATA = {
  round: 'RODADA 06',
  day: 'DIA 006 DO CRONOGRAMA',
  chapter: 'KAPITEL 3, TEIL A (A1–A17, p. 58–65)',
  title: 'O Caso Acusativo (Akkusativ), Verbos Transitivos Diretos, Modalverb möchte(n), Komposita, Preposições Temporais e Locais, e Hotelreservierung',
  nextRound: 'RODADA 07 — DIA 007 (Kapitel 3, Teil B: Ein Tag im Leben / Rotina diária, horários oficiais/coloquiais e verbos separáveis).',
};

// 1.1 O Caso Acusativo (Akkusativ) - Tabelas Comparativas
export const AKKUSATIV_GENDER_RULES = [
  {
    genero: 'Masculino',
    nominativo: 'der Fernseher',
    acusativo: 'den Fernseher',
    mudanca: 'der → den',
    detalhe: 'Mudança exclusiva no artigo masculino (-en)',
  },
  {
    genero: 'Masculino (indef.)',
    nominativo: 'ein Fernseher',
    acusativo: 'einen Fernseher',
    mudanca: 'ein → einen',
    detalhe: 'Desinência acusativa -en adicionada à raiz ein',
  },
  {
    genero: 'Masculino (neg.)',
    nominativo: 'kein Fernseher',
    acusativo: 'keinen Fernseher',
    mudanca: 'kein → keinen',
    detalhe: 'Desinência acusativa -en adicionada a kein',
  },
  {
    genero: 'Masculino (poss.)',
    nominativo: 'mein Fernseher',
    acusativo: 'meinen Fernseher',
    mudanca: 'mein → meinen',
    detalhe: 'Desinência acusativa -en no possessivo',
  },
  {
    genero: 'Feminino',
    nominativo: 'die Lampe',
    acusativo: 'die Lampe',
    mudanca: 'sem mudança',
    detalhe: 'Permanece idêntico ao Nominativo (die)',
  },
  {
    genero: 'Feminino (indef.)',
    nominativo: 'eine Lampe',
    acusativo: 'eine Lampe',
    mudanca: 'sem mudança',
    detalhe: 'Permanece idêntico ao Nominativo (eine)',
  },
  {
    genero: 'Neutro',
    nominativo: 'das Bad',
    acusativo: 'das Bad',
    mudanca: 'sem mudança',
    detalhe: 'Permanece idêntico ao Nominativo (das)',
  },
  {
    genero: 'Neutro (indef.)',
    nominativo: 'ein Bad',
    acusativo: 'ein Bad',
    mudanca: 'sem mudança',
    detalhe: 'Permanece idêntico ao Nominativo (ein)',
  },
  {
    genero: 'Plural',
    nominativo: 'die Zimmer',
    acusativo: 'die Zimmer',
    mudanca: 'sem mudança',
    detalhe: 'Permanece idêntico ao Nominativo (die)',
  },
];

export const AKKUSATIV_COMPLETE_TABLE = [
  { tipo: 'Artigo definido', masc: 'den', fem: 'die', neutro: 'das', plural: 'die' },
  { tipo: 'Artigo indefinido', masc: 'einen', fem: 'eine', neutro: 'ein', plural: '— (sem plural)' },
  { tipo: 'Artigo negativo', masc: 'keinen', fem: 'keine', neutro: 'kein', plural: 'keine' },
  { tipo: 'Possessivo (ich)', masc: 'meinen', fem: 'meine', neutro: 'mein', plural: 'meine' },
  { tipo: 'Possessivo (du)', masc: 'deinen', fem: 'deine', neutro: 'dein', plural: 'deine' },
  { tipo: 'Possessivo (er)', masc: 'seinen', fem: 'seine', neutro: 'sein', plural: 'seine' },
  { tipo: 'Possessivo (sie)', masc: 'ihren', fem: 'ihre', neutro: 'ihr', plural: 'ihre' },
  { tipo: 'Possessivo (wir)', masc: 'unseren', fem: 'unsere', neutro: 'unser', plural: 'unsere' },
  { tipo: 'Possessivo (ihr)', masc: 'euren', fem: 'eure', neutro: 'euer', plural: 'eure' },
  { tipo: 'Possessivo (Sie)', masc: 'Ihren', fem: 'Ihre', neutro: 'Ihr', plural: 'Ihre' },
];

// 1.2 Verben mit Akkusativ
export const VERBEN_MIT_AKKUSATIV = [
  { verbo: 'haben', traducao: 'ter', exemplo: 'Ich habe einen Fernseher.', exTraducao: 'Eu tenho uma televisão.' },
  { verbo: 'brauchen', traducao: 'precisar', exemplo: 'Ich brauche einen Schreibtisch.', exTraducao: 'Eu preciso de uma escrivaninha.' },
  { verbo: 'kaufen', traducao: 'comprar', exemplo: 'Ich kaufe einen Computer.', exTraducao: 'Eu compro um computador.' },
  { verbo: 'bekommen', traducao: 'receber', exemplo: 'Ich bekomme einen Brief.', exTraducao: 'Eu recebo uma carta.' },
  { verbo: 'essen', traducao: 'comer', exemplo: 'Ich esse einen Apfel.', exTraducao: 'Eu como uma maçã.' },
  { verbo: 'trinken', traducao: 'beber', exemplo: 'Ich trinke einen Kaffee.', exTraducao: 'Eu bebo um café.' },
  { verbo: 'lesen', traducao: 'ler', exemplo: 'Ich lese einen Roman.', exTraducao: 'Eu leio um romance.' },
  { verbo: 'schreiben', traducao: 'escrever', exemplo: 'Ich schreibe einen Text.', exTraducao: 'Eu escrevo um texto.' },
  { verbo: 'sehen', traducao: 'ver', exemplo: 'Ich sehe einen Film.', exTraducao: 'Eu vejo um filme.' },
  { verbo: 'besuchen', traducao: 'visitar', exemplo: 'Ich besuche einen Freund.', exTraducao: 'Eu visito um amigo.' },
  { verbo: 'finden', traducao: 'achar / encontrar', exemplo: 'Ich finde den Schlüssel.', exTraducao: 'Eu encontro a chave.' },
  { verbo: 'suchen', traducao: 'procurar', exemplo: 'Ich suche den Schlüssel.', exTraducao: 'Eu procuro a chave.' },
  { verbo: 'öffnen', traducao: 'abrir', exemplo: 'Ich öffne die Tür.', exTraducao: 'Eu abro a porta.' },
  { verbo: 'schließen', traducao: 'fechar', exemplo: 'Ich schließe die Tür.', exTraducao: 'Eu fecho a porta.' },
  { verbo: 'bezahlen', traducao: 'pagar', exemplo: 'Ich bezahle die Rechnung.', exTraducao: 'Eu pago a conta.' },
  { verbo: 'kosten', traducao: 'custar', exemplo: 'Das kostet einen Euro.', exTraducao: 'Isso custa um euro.' },
  { verbo: 'möchten', traducao: 'gostaria de', exemplo: 'Ich möchte einen Kaffee.', exTraducao: 'Eu gostaria de um café.' },
];

export const SATZBAU_AKKUSATIV_ROWS = [
  { vorfeld: 'Ich', verb: 'brauche', subjekt: '—', mittelfeld: 'einen Schreibtisch.', satzende: '—' },
  { vorfeld: 'Ich', verb: 'habe', subjekt: '—', mittelfeld: 'einen Fernseher.', satzende: '—' },
  { vorfeld: 'Ich', verb: 'möchte', subjekt: '—', mittelfeld: 'einen Kaffee.', satzende: '—' },
  { vorfeld: 'Das Zimmer', verb: 'hat', subjekt: '—', mittelfeld: 'einen Fernseher.', satzende: '—' },
  { vorfeld: 'Wir', verb: 'kaufen', subjekt: '—', mittelfeld: 'einen Computer.', satzende: '—' },
];

// 1.3 Modalverb möchte(n)
export const MOECHTE_CONJUGATION = [
  { pessoa: '1. Sg.', pronome: 'ich', forma: 'möchte', nota: 'Raiz modal sem terminação -e adicional' },
  { pessoa: '2. Sg.', pronome: 'du', forma: 'möchtest', nota: 'Terminação regular -st precedida de -e-' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es/man', forma: 'möchte', nota: 'Idêntico à 1ª pessoa (sem terminação -t)' },
  { pessoa: '1. Pl.', pronome: 'wir', forma: 'möchten', nota: 'Forma com desinência -n' },
  { pessoa: '2. Pl.', pronome: 'ihr', forma: 'möchtet', nota: 'Terminação -t com inserção de -e-' },
  { pessoa: '3. Pl.', pronome: 'sie', forma: 'möchten', nota: 'Forma plural regular' },
  { pessoa: 'Formal', pronome: 'Sie', forma: 'möchten', nota: 'Forma de cortesia idêntica a wir/sie' },
];

export const MOECHTE_SATZBAU_ROWS = [
  { vorfeld: 'Ich', modalverb: 'möchte', mittelfeld: 'ein Einzelzimmer.', satzende: '— (sem infinitivo)' },
  { vorfeld: 'Ich', modalverb: 'möchte', mittelfeld: 'ein Einzelzimmer', satzende: 'buchen.' },
  { vorfeld: 'Wir', modalverb: 'möchten', mittelfeld: 'zwei Einzelzimmer.', satzende: '—' },
  { vorfeld: 'Er', modalverb: 'möchte', mittelfeld: 'einen Kaffee', satzende: 'trinken.' },
  { vorfeld: 'Möchten', modalverb: 'Sie (Pos. II invertida)', mittelfeld: 'ein Doppelzimmer?', satzende: '—' },
];

// 1.4 Komposita (Palavras Compostas)
export const KOMPOSITA_EXAMPLES = [
  { composto: 'die Telefonnummer', elementos: 'das Telefon + die Nummer', genero: 'die (Nummer)', traducao: 'número de telefone' },
  { composto: 'der Hotelschlüssel', elementos: 'das Hotel + der Schlüssel', genero: 'der (Schlüssel)', traducao: 'chave do hotel' },
  { composto: 'das Hotelzimmer', elementos: 'das Hotel + das Zimmer', genero: 'das (Zimmer)', traducao: 'quarto de hotel' },
  { composto: 'der Hotelzimmerschlüssel', elementos: 'das Hotel + das Zimmer + der Schlüssel', genero: 'der (Schlüssel)', traducao: 'chave do quarto de hotel' },
  { composto: 'die Zimmernummer', elementos: 'das Zimmer + die Nummer', genero: 'die (Nummer)', traducao: 'número do quarto' },
  { composto: 'der WLAN-Code', elementos: 'das WLAN + der Code', genero: 'der (Code)', traducao: 'código do Wi-Fi' },
  { composto: 'die Minibar', elementos: 'mini + die Bar', genero: 'die (Bar)', traducao: 'frigobar' },
  { composto: 'der Schreibtisch', elementos: 'schreiben + der Tisch', genero: 'der (Tisch)', traducao: 'escrivaninha' },
  { composto: 'der Fernseher', elementos: 'fern + der Seher', genero: 'der (Seher)', traducao: 'televisão' },
  { composto: 'der Haartrockner', elementos: 'das Haar + der Trockner', genero: 'der (Trockner)', traducao: 'secador de cabelo' },
  { composto: 'der Hosenbügler', elementos: 'die Hosen + der Bügler', genero: 'der (Bügler)', traducao: 'passador de calças' },
  { composto: 'die Kaffeemaschine', elementos: 'der Kaffee + die Maschine', genero: 'die (Maschine)', traducao: 'cafeteira' },
  { composto: 'das Einzelzimmer', elementos: 'einzel + das Zimmer', genero: 'das (Zimmer)', traducao: 'quarto individual' },
  { composto: 'das Doppelzimmer', elementos: 'doppel + das Zimmer', genero: 'das (Zimmer)', traducao: 'quarto duplo' },
  { composto: 'das Dreibettzimmer', elementos: 'drei + das Bett + das Zimmer', genero: 'das (Zimmer)', traducao: 'quarto triplo' },
];

// 1.5 Preposições Temporais e Locais
export const TEMPORAL_PREPOSITIONS = [
  { prep: 'um', uso: 'Horas exatas', exemplo: 'um 15.00 Uhr', traducao: 'às 15h00' },
  { prep: 'am', uso: 'Dias da semana, partes do dia, datas', exemplo: 'am Montag, am Vormittag', traducao: 'na segunda-feira, de manhã' },
  { prep: 'im', uso: 'Meses, estações do ano, anos com Jahrhundert', exemplo: 'im Januar, im Sommer', traducao: 'em janeiro, no verão' },
  { prep: 'von ... bis', uso: 'Período contínuo delimitado', exemplo: 'von 9.00 bis 18.00 Uhr', traducao: 'das 9h às 18h' },
];

export const LOKAL_PREPOSITIONS = [
  { prep: 'in', regencia: 'Dativo estático', uso: 'Dentro de um espaço tridimensional', exemplo: 'im Zentrum', traducao: 'no centro' },
  { prep: 'an', regencia: 'Dativo estático', uso: 'Na borda, junto a superfícies verticais/fronteiras', exemplo: 'am Stadtrand', traducao: 'na periferia / borda da cidade' },
  { prep: 'auf', regencia: 'Dativo estático', uso: 'Sobre superfície horizontal com contato', exemplo: 'auf dem Tisch', traducao: 'sobre a mesa' },
  { prep: 'bei', regencia: 'Dativo fixo', uso: 'Perto de, junto a empresa ou residência', exemplo: 'bei Siemens', traducao: 'na Siemens' },
  { prep: 'neben', regencia: 'Dativo estático', uso: 'Ao lado de', exemplo: 'neben dem Bett', traducao: 'ao lado da cama' },
  { prep: 'zwischen', regencia: 'Dativo estático', uso: 'Entre dois elementos', exemplo: 'zwischen den Stühlen', traducao: 'entre as cadeiras' },
  { prep: 'vor', regencia: 'Dativo estático', uso: 'Diante de, na frente de', exemplo: 'vor dem Haus', traducao: 'diante da casa' },
  { prep: 'hinter', regencia: 'Dativo estático', uso: 'Atrás de', exemplo: 'hinter dem Haus', traducao: 'atrás da casa' },
  { prep: 'über', regencia: 'Dativo estático', uso: 'Acima de (sem contato físico)', exemplo: 'über dem Sofa', traducao: 'acima do sofá' },
  { prep: 'unter', regencia: 'Dativo estático', uso: 'Embaixo de', exemplo: 'unter dem Tisch', traducao: 'embaixo da mesa' },
];

export const CONTRACTIONS_TABLE = [
  { fusao: 'in + dem', contracao: 'im', exemplo: 'im Zentrum (no centro)' },
  { fusao: 'in + das', contracao: 'ins', exemplo: 'ins Kino (ao cinema)' },
  { fusao: 'an + dem', contracao: 'am', exemplo: 'am Stadtrand (na periferia)' },
  { fusao: 'an + das', contracao: 'ans', exemplo: 'ans Meer (ao mar)' },
  { fusao: 'bei + dem', contracao: 'beim', exemplo: 'beim Arzt (no médico)' },
  { fusao: 'von + dem', contracao: 'vom', exemplo: 'vom Bahnhof (da estação)' },
  { fusao: 'zu + dem', contracao: 'zum', exemplo: 'zum Arzt (para o médico)' },
  { fusao: 'zu + der', contracao: 'zur', exemplo: 'zur Post (para os correios)' },
];

// 1.6 & 1.7 & 1.8 Verbos haben, brauchen, möchten + Acusativo
export const HABEN_PRAETERITUM = [
  { pessoa: '1. Sg.', pronome: 'ich', presente: 'habe', praeteritum: 'hatte' },
  { pessoa: '2. Sg.', pronome: 'du', presente: 'hast', praeteritum: 'hattest' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es', presente: 'hat', praeteritum: 'hatte' },
  { pessoa: '1. Pl.', pronome: 'wir', presente: 'haben', praeteritum: 'hatten' },
  { pessoa: '2. Pl.', pronome: 'ihr', presente: 'habt', praeteritum: 'hattet' },
  { pessoa: '3. Pl.', pronome: 'sie', presente: 'haben', praeteritum: 'hatten' },
  { pessoa: 'Formal', pronome: 'Sie', presente: 'haben', praeteritum: 'hatten' },
];

export const SEIN_PRAETERITUM = [
  { pessoa: '1. Sg.', pronome: 'ich', presente: 'bin', praeteritum: 'war' },
  { pessoa: '2. Sg.', pronome: 'du', presente: 'bist', praeteritum: 'warst' },
  { pessoa: '3. Sg.', pronome: 'er/sie/es', presente: 'ist', praeteritum: 'war' },
  { pessoa: '1. Pl.', pronome: 'wir', presente: 'sind', praeteritum: 'waren' },
  { pessoa: '2. Pl.', pronome: 'ihr', presente: 'seid', praeteritum: 'wart' },
  { pessoa: '3. Pl.', pronome: 'sie', presente: 'sind', praeteritum: 'waren' },
  { pessoa: 'Formal', pronome: 'Sie', presente: 'sind', praeteritum: 'waren' },
];

// 2.1 Texto A1 — An der Rezeption (p. 58)
export const TEXT_A1_DIALOGUE = [
  { speaker: 'Herr Heinemann', de: 'Guten Tag, haben Sie noch ein Zimmer frei?', pt: 'Bom dia, o senhor ainda tem um quarto livre?' },
  { speaker: 'Rezeptionistin', de: 'Grüß Gott! Haben Sie eine Reservierung?', pt: 'Bom dia! O senhor tem uma reserva?' },
  { speaker: 'Herr Heinemann', de: 'Nein, wir haben leider keine Reservierung. Wir möchten gerne zwei Einzelzimmer.', pt: 'Não, infelizmente não temos reserva. Nós gostaríamos de dois quartos individuais.' },
  { speaker: 'Rezeptionistin', de: 'Zwei Einzelzimmer? Moment mal ... Ja, Sie haben Glück. Wir haben noch Einzelzimmer frei. Wie lange möchten Sie bleiben?', pt: 'Dois quartos individuais? Um momento ... Sim, o senhor tem sorte. Ainda temos quartos individuais livres. Quanto tempo o senhor deseja ficar?' },
  { speaker: 'Herr Heinemann', de: 'Zwei Nächte. Was kostet ein Einzelzimmer?', pt: 'Duas noites. Quanto custa um quarto individual?' },
  { speaker: 'Rezeptionistin', de: 'Das Zimmer kostet 75,– Euro pro Nacht.', pt: 'O quarto custa 75 euros por noite.' },
  { speaker: 'Herr Heinemann', de: 'Mit Frühstück?', pt: 'Com café da manhã?' },
  { speaker: 'Rezeptionistin', de: 'Nein, der Preis ist ohne Frühstück. Das Frühstück kostet 20,– Euro extra.', pt: 'Não, o preço é sem café da manhã. O café da manhã custa 20 euros extra.' },
  { speaker: 'Herr Heinemann', de: 'Das ist teuer! Hat das Zimmer einen Schreibtisch? Ich möchte noch arbeiten.', pt: 'Isso é caro! O quarto tem uma escrivaninha? Eu ainda gostaria de trabalhar.' },
  { speaker: 'Rezeptionistin', de: 'Ja, alle Zimmer haben einen Schreibtisch, einen Fernseher, eine Minibar, ein Bad und WLAN.', pt: 'Sim, todos os quartos têm uma escrivaninha, uma televisão, um frigobar, um banheiro e Wi-Fi.' },
  { speaker: 'Herr Heinemann', de: 'Gibt es auch ein Hotelrestaurant?', pt: 'Há também um restaurante no hotel?' },
  { speaker: 'Rezeptionistin', de: 'Ja, natürlich. Ein italienisches Spezialitätenrestaurant.', pt: 'Sim, naturalmente. Um restaurante de especialidades italianas.' },
  { speaker: 'Herr Heinemann', de: 'Gut, wir nehmen die Zimmer.', pt: 'Bom, nós pegamos os quartos.' },
  { speaker: 'Rezeptionistin', de: 'Ich brauche noch Ihre Adresse.', pt: 'Eu ainda preciso do seu endereço.' },
  { speaker: 'Herr Heinemann', de: 'Hauptstraße 25, in Marburg.', pt: 'Rua Principal 25, em Marburg.' },
  { speaker: 'Rezeptionistin', de: 'Wie ist Ihre Postleitzahl?', pt: 'Qual é o seu CEP?' },
  { speaker: 'Herr Heinemann', de: '35037.', pt: '35037.' },
  { speaker: 'Rezeptionistin', de: 'Danke. Zahlen Sie mit Kreditkarte?', pt: 'Obrigada. O senhor paga com cartão de crédito?' },
  { speaker: 'Herr Heinemann', de: 'Nein, ich zahle bar. Und du?', pt: 'Não, eu pago em dinheiro. E você?' },
  { speaker: 'Herr Wegener', de: 'Ich zahle lieber mit Kreditkarte.', pt: 'Eu prefiro pagar com cartão de crédito.' },
  { speaker: 'Rezeptionistin', de: 'Das sind Ihre Zimmerschlüssel. Der WLAN-Code steht hier. Ihre Zimmernummer ist die 405 und Ihre Zimmernummer ist die 407. Schönen Aufenthalt!', pt: 'Estas são as chaves dos seus quartos. O código do Wi-Fi está aqui. Seu número de quarto é 405 e seu número de quarto é 407. Boa estadia!' },
  { speaker: 'Herr Heinemann', de: 'Danke schön.', pt: 'Muito obrigado.' },
  { speaker: 'Herr Wegener', de: 'Danke.', pt: 'Obrigado.' },
];

export const TEXT_A1_GRAMMAR_NOTES = [
  { item: 'Haben Sie noch ein Zimmer frei?', analise: 'haben + Sie + noch + ein Zimmer (neutro acusativo) + frei (adjetivo predicativo).' },
  { item: 'Wir haben leider keine Reservierung', analise: 'keine (negativo feminino acusativo) + Reservierung.' },
  { item: 'Wir möchten gerne zwei Einzelzimmer', analise: 'möchten + gerne + zwei Einzelzimmer (plural acusativo sem mudança).' },
  { item: 'Wie lange möchten Sie bleiben?', analise: 'Wie lange (W-Wort) + möchten (Posição II) + Sie + bleiben (infinitivo no Satzende).' },
  { item: 'Was kostet ein Einzelzimmer?', analise: 'Was (W-Wort) + kostet (Posição II) + ein Einzelzimmer (neutro acusativo).' },
  { item: 'Das Zimmer kostet 75 Euro pro Nacht', analise: 'kosten + quantia monetária + pro Nacht.' },
  { item: 'Der Preis ist ohne Frühstück', analise: 'ohne (preposição com Acusativo obrigatório) + Frühstück.' },
  { item: 'Hat das Zimmer einen Schreibtisch?', analise: 'haben + das Zimmer (sujeito) + einen Schreibtisch (masculino acusativo com desinência -en).' },
  { item: 'Alle Zimmer haben einen Schreibtisch, einen Fernseher...', analise: 'haben rege Acusativo em série: einen (masc.), einen (masc.), eine (fem.), ein (neutro).' },
  { item: 'Ich brauche noch Ihre Adresse', analise: 'brauchen + Ihre Adresse (feminino acusativo possessivo formal).' },
  { item: 'Zahlen Sie mit Kreditkarte?', analise: 'zahlen + mit + Dativo (Kreditkarte).' },
  { item: 'Ich zahle bar / Ich zahle lieber...', analise: 'zahlen + bar (advérbio invariável) / lieber (comparativo de gern).' },
  { item: 'Das sind Ihre Zimmerschlüssel', analise: 'das (demonstrativo invariável) + sind (verbo plural) + Ihre Zimmerschlüssel (predicativo plural).' },
  { item: 'Ihre Zimmernummer ist die 405', analise: 'Ihre (possessivo formal maiúsculo) + Zimmernummer (fem.) + ist + die 405.' },
];

// 2.2 Texto A2 — Diálogo Modelo de Recepção (p. 59)
export const TEXT_A2_DIALOGUE = [
  { speaker: 'Gast', de: 'Guten Tag. Haben Sie noch ein Zimmer frei?', pt: 'Bom dia. O senhor ainda tem um quarto livre?' },
  { speaker: 'Rezeptionist', de: 'Möchten Sie ein Einzelzimmer? Doppelzimmer? Dreibettzimmer?', pt: 'O senhor gostaria de um quarto individual? Um quarto duplo? Um quarto triplo?' },
  { speaker: 'Gast', de: 'Ja, ein Einzelzimmer, bitte. / Nein, ich möchte ein Doppelzimmer.', pt: 'Sim, um quarto individual, por favor. / Não, eu gostaria de um quarto duplo.' },
  { speaker: 'Rezeptionist', de: 'Wie lange möchten Sie bleiben?', pt: 'Quanto tempo o senhor deseja ficar?' },
  { speaker: 'Gast', de: 'Eine Nacht / Zwei Nächte. Hat das Zimmer ein Bad? Einen Schreibtisch? Einen Fernseher? Eine Minibar? WLAN?', pt: 'Uma noite / Duas noites. O quarto tem banheiro? Uma escrivaninha? Uma televisão? Um frigobar? Wi-Fi?' },
  { speaker: 'Rezeptionist', de: 'Ja, unsere Zimmer haben alle ein Bad, einen Schreibtisch... / Nein, unsere Zimmer haben kein Bad, keinen Schreibtisch, keinen Fernseher, keine Minibar, kein WLAN.', pt: 'Sim, todos os nossos quartos têm... / Não, nossos quartos não têm banheiro, não têm escrivaninha, não têm TV, não têm frigobar, não têm Wi-Fi.' },
  { speaker: 'Gast', de: 'Wie viel / Was kostet das Zimmer?', pt: 'Quanto / O que custa o quarto?' },
  { speaker: 'Rezeptionist', de: '85 Euro pro Nacht.', pt: '85 euros por noite.' },
  { speaker: 'Gast', de: 'Gut, ich nehme es.', pt: 'Bom, eu o pego.' },
];

// 2.3 Texto A5 — Os Três Hotéis de Munique (p. 61)
export const HOTEL_COMPARISON_A5 = [
  {
    nome: 'Hotel Central',
    estrelas: '★★★',
    endereco: 'Nußbaumstraße 2, München',
    zimmeranzahl: 56,
    kreditkarten: 'American Express, VISA, Mastercard, Diners Club',
    zeiten: 'Anreise ab 14.00 Uhr · Abreise bis 12.00 Uhr',
    lage: 'im Zentrum von München',
    preise: 'Einzelzimmer: 55–69 € (mit Frühstück) · Doppelzimmer: 69–89 € (mit Frühstück)',
    ausstattung: 'Bad mit WC, Haartrockner, Fernseher, Radio, WLAN, Telefon, Schreibtisch, Balkon',
    besonderheiten: 'Tiefgarage, 13 Euro pro Tag',
  },
  {
    nome: 'Hotel Krone',
    estrelas: '★★★',
    endereco: 'Goethestraße 9, München',
    zimmeranzahl: 23,
    kreditkarten: 'American Express, VISA, Mastercard',
    zeiten: 'Anreise ab 15.00 Uhr · Abreise bis 12.00 Uhr',
    lage: 'im Zentrum von München, wenige Minuten vom Hauptbahnhof entfernt',
    preise: 'EZ: 50–160 € · DZ: 66–175 € · Dreibettzimmer: 86–220 € (alle mit Frühstück)',
    ausstattung: 'Dusche mit WC, Haartrockner, Fernseher, Radio, WLAN, Schreibtisch',
    besonderheiten: 'Keine Tiefgarage, zentrale Lage am Hauptbahnhof',
  },
  {
    nome: 'Hotel Am Park',
    estrelas: '★★★★',
    endereco: 'Ridlerstraße 2, München',
    zimmeranzahl: 258,
    kreditkarten: 'American Express, VISA, Euro-/Mastercard, Diners Club',
    zeiten: 'Anreise ab 15.00 Uhr · Abreise bis 12.00 Uhr',
    lage: 'Theresienwiese, wenige Minuten vom Stadtzentrum entfernt',
    preise: 'EZ: 255–325 € · DZ: 275–350 € (alle ohne Frühstück)',
    ausstattung: 'Bad mit WC, Haartrockner, Radio, WLAN, Satelliten-Fernseher, Schreibtisch, Minibar, Hosenbügler, Zimmersafe',
    besonderheiten: 'Parkplatz, Restaurant, Bar, Schwimmbad, Sauna, Fitnesscenter',
  },
];

// 2.4 Texto A7 — Anmeldeformular (Dados Pessoais no Hotel)
export const ANMELDEFORMULAR_FIELDS = [
  { campo: 'Zimmer-Nr.', valorExemplo: '405', traducao: 'Nº do quarto' },
  { campo: 'Anreisetag', valorExemplo: '17.05.20', traducao: 'Data de chegada (check-in)' },
  { campo: 'Abreisetag', valorExemplo: '19.05.20', traducao: 'Data de partida (check-out)' },
  { campo: 'Anzahl Personen', valorExemplo: '1', traducao: 'Número de hóspedes' },
  { campo: 'Herr / Frau', valorExemplo: 'Herr', traducao: 'Senhor / Senhora' },
  { campo: 'Name', valorExemplo: 'Heinemann', traducao: 'Sobrenome' },
  { campo: 'Vorname', valorExemplo: 'Peter', traducao: 'Primeiro nome' },
  { campo: 'Geburtsort', valorExemplo: 'Frankfurt am Main', traducao: 'Local de nascimento' },
  { campo: 'Geburtsdatum', valorExemplo: '14.08.1982', traducao: 'Data de nascimento' },
  { campo: 'Staatsangehörigkeit', valorExemplo: 'deutsch', traducao: 'Nacionalidade' },
  { campo: 'Land', valorExemplo: 'Deutschland', traducao: 'País de residência' },
  { campo: 'Postleitzahl, Wohnort', valorExemplo: '35037 Marburg', traducao: 'CEP e Cidade' },
  { campo: 'Straße, Hausnummer', valorExemplo: 'Hauptstraße 25', traducao: 'Rua e número da casa' },
  { campo: 'Telefon / E-Mail', valorExemplo: '06421-998877 / p.heinemann@web.de', traducao: 'Telefone e e-mail' },
  { campo: 'Beruf', valorExemplo: 'Informatiker', traducao: 'Profissão' },
  { campo: 'Datum, Unterschrift', valorExemplo: '17.05.20, Peter Heinemann', traducao: 'Data e assinatura' },
];

// 2.5 Texto A8 — Diálogo com Verbos Preenchidos
export const TEXT_A8_DIALOGUE_ITEMS = [
  { num: 1, frase: 'Ich möchte gern ein Zimmer.', verbo: 'möchte', pessoa: '1ª sg. (möchten)' },
  { num: 2, frase: 'Haben Sie noch Einzelzimmer?', verbo: 'Haben', pessoa: 'formal (haben)' },
  { num: 3, frase: 'Wir haben noch Einzelzimmer.', verbo: 'haben', pessoa: '1ª pl. (haben)' },
  { num: 4, frase: 'Wie lange möchten Sie bleiben?', verbo: 'bleiben', pessoa: 'infinitivo no Satzende' },
  { num: 5, frase: 'Was kostet das Zimmer?', verbo: 'kostet', pessoa: '3ª sg. (kosten)' },
  { num: 6, frase: 'Das ist teuer!', verbo: 'ist', pessoa: '3ª sg. (sein)' },
  { num: 7, frase: 'Der Preis ist inklusive Frühstück.', verbo: 'ist', pessoa: '3ª sg. (sein)' },
  { num: 8, frase: 'Hat das Zimmer WLAN?', verbo: 'Hat', pessoa: '3ª sg. (haben)' },
  { num: 9, frase: 'Alle Zimmer haben WLAN.', verbo: 'haben', pessoa: '3ª pl. (haben)' },
  { num: 10, frase: 'Ich nehme das Zimmer.', verbo: 'nehme', pessoa: '1ª sg. (nehmen, forte: e → i no tu/ele)' },
  { num: 11, frase: 'Kann ich mit Kreditkarte zahlen?', verbo: 'zahlen', pessoa: 'infinitivo regido por kann' },
];

// 2.6 Texto A9 — der, die, das (Artigo Definido)
export const GENDERS_A9 = {
  masculino: [
    { termo: 'der Preis', traducao: 'o preço' },
    { termo: 'der Fernseher', traducao: 'a televisão' },
    { termo: 'der Parkplatz', traducao: 'o estacionamento' },
    { termo: 'der Hauptbahnhof', traducao: 'a estação central' },
    { termo: 'der Haartrockner', traducao: 'o secador de cabelo' },
    { termo: 'der Balkon', traducao: 'a varanda' },
    { termo: 'der Hosenbügler', traducao: 'o passador de calças' },
    { termo: 'der Zimmersafe', traducao: 'o cofre do quarto' },
    { termo: 'der Zimmerschlüssel', traducao: 'a chave do quarto' },
  ],
  feminino: [
    { termo: 'die Tiefgarage', traducao: 'a garagem subterrânea' },
    { termo: 'die Minibar', traducao: 'o frigobar' },
    { termo: 'die Adresse', traducao: 'o endereço' },
    { termo: 'die Dusche', traducao: 'o chuveiro' },
    { termo: 'die Kreditkarte', traducao: 'o cartão de crédito' },
  ],
  neutro: [
    { termo: 'das Zimmer', traducao: 'o quarto' },
    { termo: 'das Hotel', traducao: 'o hotel' },
    { termo: 'das Restaurant', traducao: 'o restaurante' },
    { termo: 'das Fitnesscenter', traducao: 'a academia' },
    { termo: 'das Bad', traducao: 'o banheiro' },
    { termo: 'das Frühstück', traducao: 'o café da manhã' },
    { termo: 'das Stadtzentrum', traducao: 'o centro da cidade' },
    { termo: 'das Bett', traducao: 'a cama' },
    { termo: 'das Internet / WLAN', traducao: 'a internet / o Wi-Fi' },
    { termo: 'das Radio', traducao: 'o rádio' },
  ],
};

// 2.9 Texto A12 — Im Hotelzimmer (Peter Heinemann)
export const TEXT_A12_DIALOGUE = [
  { speaker: 'Herr Heinemann', de: 'Ist dort die Rezeption?', pt: 'A recepção é aí?' },
  { speaker: 'Rezeptionistin', de: 'Ja. Sie wünschen?', pt: 'Sim. O senhor deseja?' },
  { speaker: 'Herr Heinemann', de: 'Hier ist Peter Heinemann, Zimmer 405. Ich habe ein Problem, nein – ich habe mehrere Probleme. Die Dusche ist kaputt, es gibt keine Handtücher und kein Toilettenpapier und der Fernseher geht auch nicht.', pt: 'Aqui é Peter Heinemann, quarto 405. Eu tenho um problema, não – eu tenho vários problemas. O chuveiro está quebrado, não há toalhas e não há papel higiênico e a televisão também não funciona.' },
  { speaker: 'Rezeptionistin', de: 'Das kann doch nicht sein!', pt: 'Isso não pode ser!' },
  { speaker: 'Herr Heinemann', de: 'Bitte kommen Sie doch und sehen Sie selbst.', pt: 'Por favor, venha e veja você mesma.' },
  { speaker: 'Rezeptionistin', de: 'Einen Moment bitte, ich komme. Wir bringen das sofort in Ordnung.', pt: 'Um momento, por favor, eu vou. Nós resolvemos isso imediatamente.' },
];

export const MEHRERE_EXPLANATION = {
  regra: 'mehrere é um quantificador indefinido invariável que significa "vários / várias", empregado exclusivamente com substantivos no plural.',
  exemplos: [
    { de: 'Ich habe mehrere Probleme.', pt: 'Eu tenho vários problemas.' },
    { de: 'Es gibt mehrere Hotels in München.', pt: 'Há vários hotéis em Munique.' },
    { de: 'Wir haben mehrere Zimmer frei.', pt: 'Nós temos vários quartos livres.' },
  ],
};

// 2.11 Texto A14 — Fonética ö [ø:] e [œ]
export const PHONETICS_OE_EXAMPLES = {
  long: [
    { de: 'schön', pt: 'bonito, belo' },
    { de: 'hören', pt: 'ouvir' },
    { de: 'Danke schön!', pt: 'Muito obrigado!' },
    { de: 'Wir hören gern Musik.', pt: 'Gostamos de ouvir música.' },
    { de: 'Das ist ein schöner Stuhl.', pt: 'Esta é uma cadeira bonita.' },
  ],
  short: [
    { de: 'zwölf', pt: 'doze' },
    { de: 'Wörter', pt: 'palavras' },
    { de: 'Wörterbuch', pt: 'dicionário' },
    { de: 'können', pt: 'poder, conseguir' },
    { de: 'möchten', pt: 'gostaria' },
    { de: 'öffnen', pt: 'abrir' },
  ],
  discriminacao: [
    { palavra: 'können', letra: 'ö', pronuncia: '[œ] curto' },
    { palavra: 'kennen', letra: 'e', pronuncia: '[ɛ] curto' },
    { palavra: 'zwölf', letra: 'ö', pronuncia: '[œ] curto' },
    { palavra: 'lesen', letra: 'e', pronuncia: '[e:] longo' },
    { palavra: 'öffnen', letra: 'ö', pronuncia: '[œ] curto' },
    { palavra: 'senden', letra: 'e', pronuncia: '[ɛ] curto' },
    { palavra: 'elf', letra: 'e', pronuncia: '[ɛ] curto' },
  ],
};

// 2.12 Texto A15 — Ich kann nicht ...
export const TEXT_A15_ITEMS = [
  { num: 0, problema: 'Meine Kreditkarte ist weg.', frase: 'Ich kann nicht bezahlen.', verbo: 'bezahlen', traducao: 'Não consigo pagar.' },
  { num: 1, problema: 'Die Dusche ist kaputt.', frase: 'Ich kann nicht duschen.', verbo: 'duschen', traducao: 'Não consigo tomar banho.' },
  { num: 2, problema: 'Der Fernseher geht nicht.', frase: 'Ich kann keinen Film sehen.', verbo: 'sehen', traducao: 'Não consigo ver filme.' },
  { num: 3, problema: 'Mein Zimmerschlüssel ist weg.', frase: 'Ich kann die Tür nicht öffnen.', verbo: 'öffnen', traducao: 'Não consigo abrir a porta.' },
  { num: 4, problema: 'Das Bett ist zu hart.', frase: 'Ich kann nicht schlafen.', verbo: 'schlafen', traducao: 'Não consigo dormir.' },
  { num: 5, problema: 'Der Sessel ist nicht stabil.', frase: 'Man kann nicht sitzen.', verbo: 'sitzen', traducao: 'Não se consegue sentar.' },
  { num: 6, problema: 'Im Zimmer gibt es keinen Schreibtisch.', frase: 'Ich kann nicht arbeiten.', verbo: 'arbeiten', traducao: 'Não consigo trabalhar.' },
  { num: 7, problema: 'Das Telefon funktioniert nicht.', frase: 'Ich kann nicht telefonieren.', verbo: 'telefonieren', traducao: 'Não consigo telefonar.' },
  { num: 8, problema: 'Ich habe kein WLAN.', frase: 'Ich kann keine E-Mails senden.', verbo: 'senden', traducao: 'Não consigo enviar e-mails.' },
  { num: 9, problema: 'Die Lampe ist kaputt.', frase: 'Ich kann nicht lesen.', verbo: 'lesen', traducao: 'Não consigo ler.' },
  { num: 10, problema: 'Es gibt keine Tiefgarage.', frase: 'Ich kann mein Auto hier nicht parken.', verbo: 'parken', traducao: 'Não consigo estacionar meu carro aqui.' },
];

// 2.13 Texto A16 — Die Nomengruppe im Nominativ (p. 65)
export const TEXT_A16_NOMEN_NOMINATIV = [
  { num: 0, base: 'neu, Fernseher', artigo: 'der', adjetivo: 'neue', frase: 'Ist der neue Fernseher kaputt?', genero: 'masculino (der neue)' },
  { num: 1, base: 'schön, Uhr', artigo: 'die', adjetivo: 'schöne', frase: 'Ist die schöne Uhr kaputt?', genero: 'feminino (die schöne)' },
  { num: 2, base: 'alt, Auto', artigo: 'das', adjetivo: 'alte', frase: 'Ist das alte Auto kaputt?', genero: 'neutro (das alte)' },
  { num: 3, base: 'teuer, Kaffeemaschine', artigo: 'die', adjetivo: 'teure', frase: 'Ist die teure Kaffeemaschine kaputt?', genero: 'feminino (die teure, perde -e- temático)' },
  { num: 4, base: 'neu, iPad', artigo: 'das', adjetivo: 'neue', frase: 'Ist das neue iPad kaputt?', genero: 'neutro (das neue)' },
  { num: 5, base: 'modern, Lampe', artigo: 'die', adjetivo: 'moderne', frase: 'Ist die moderne Lampe kaputt?', genero: 'feminino (die moderne)' },
  { num: 6, base: 'alt, Computer', artigo: 'der', adjetivo: 'alte', frase: 'Ist der alte Computer kaputt?', genero: 'masculino (der alte)' },
  { num: 7, base: 'bequem, Stuhl', artigo: 'der', adjetivo: 'bequeme', frase: 'Ist der bequeme Stuhl kaputt?', genero: 'masculino (der bequeme)' },
];

// 2.14 Texto A17 — Die Nomengruppe im Akkusativ (p. 65)
export const TEXT_A17_NOMEN_AKKUSATIV = [
  { num: 0, base: 'neu, Fernseher', frase: 'Ich brauche einen neuen Fernseher.', acusativo: 'einen neuen', genero: 'masculino acusativo (-en)' },
  { num: 1, base: 'groß, Schreibtisch', frase: 'Martin möchte einen großen Schreibtisch.', acusativo: 'einen großen', genero: 'masculino acusativo (-en)' },
  { num: 2, base: 'alt, Auto', frase: 'Wir brauchen ein altes Auto.', acusativo: 'ein altes', genero: 'neutro acusativo (-es)' },
  { num: 3, base: 'teuer, Uhr', frase: 'Herr Krumm möchte eine teure Uhr.', acusativo: 'eine teure', genero: 'feminino acusativo (-e)' },
  { num: 4, base: 'bequem, Sessel', frase: 'Ich habe einen bequemen Sessel.', acusativo: 'einen bequemen', genero: 'masculino acusativo (-en)' },
  { num: 5, base: 'kalt, Bier', frase: 'Er möchte ein kaltes Bier.', acusativo: 'ein kaltes', genero: 'neutro acusativo (-es)' },
  { num: 6, base: 'groß, Doppelzimmer', frase: 'Wir brauchen ein großes Doppelzimmer.', acusativo: 'ein großes', genero: 'neutro acusativo (-es)' },
  { num: 7, base: 'weich, Bett', frase: 'Ich möchte ein weiches Bett.', acusativo: 'ein weiches', genero: 'neutro acusativo (-es)' },
  { num: 8, base: 'gut, Drucker', frase: 'Der neue Informatiker hat einen guten Drucker.', acusativo: 'einen guten', genero: 'masculino acusativo (-en)' },
  { num: 9, base: 'französisch, Spezialitätenrestaurant', frase: 'Das moderne Hotel hat ein französisches Spezialitätenrestaurant.', acusativo: 'ein französisches', genero: 'neutro acusativo (-es)' },
  { num: 10, base: 'interessant, Buch', frase: 'Meine Freundin möchte ein interessantes Buch.', acusativo: 'ein interessantes', genero: 'neutro acusativo (-es)' },
];

// 2.15 Tabela Lexical Primária (29 Termos Canônicos)
export const LEXICON_LESSON_6 = [
  { palavraAlema: 'das Hotel', classeGramatical: 'Subst. neutro', plural: 'die Hotels', traducao: 'hotel', fraseModelo: 'Wir haben noch Einzelzimmer im Hotel frei.' },
  { palavraAlema: 'die Rezeption', classeGramatical: 'Subst. fem.', plural: 'die Rezeptionen', traducao: 'recepção', fraseModelo: 'Ist dort die Rezeption?' },
  { palavraAlema: 'die Reservierung', classeGramatical: 'Subst. fem.', plural: 'die Reservierungen', traducao: 'reserva', fraseModelo: 'Haben Sie eine Reservierung?' },
  { palavraAlema: 'das Einzelzimmer', classeGramatical: 'Subst. neutro', plural: 'die Einzelzimmer', traducao: 'quarto individual', fraseModelo: 'Wir möchten gerne zwei Einzelzimmer.' },
  { palavraAlema: 'das Doppelzimmer', classeGramatical: 'Subst. neutro', plural: 'die Doppelzimmer', traducao: 'quarto duplo', fraseModelo: 'Möchten Sie ein Doppelzimmer buchen?' },
  { palavraAlema: 'das Dreibettzimmer', classeGramatical: 'Subst. neutro', plural: 'die Dreibettzimmer', traducao: 'quarto triplo', fraseModelo: 'Das Dreibettzimmer kostet 86 Euro.' },
  { palavraAlema: 'die Nacht', classeGramatical: 'Subst. fem.', plural: 'die Nächte', traducao: 'noite', fraseModelo: 'Das Zimmer kostet 75 Euro pro Nacht.' },
  { palavraAlema: 'der Preis', classeGramatical: 'Subst. masc.', plural: 'die Preise', traducao: 'preço', fraseModelo: 'Der Preis ist ohne Frühstück.' },
  { palavraAlema: 'das Frühstück', classeGramatical: 'Subst. neutro', plural: 'sem plural', traducao: 'café da manhã', fraseModelo: 'Das Frühstück kostet 20 Euro extra.' },
  { palavraAlema: 'der Schreibtisch', classeGramatical: 'Subst. masc.', plural: 'die Schreibtische', traducao: 'escrivaninha', fraseModelo: 'Hat das Zimmer einen Schreibtisch?' },
  { palavraAlema: 'der Fernseher', classeGramatical: 'Subst. masc.', plural: 'die Fernseher', traducao: 'televisão', fraseModelo: 'Alle Zimmer haben einen Fernseher.' },
  { palavraAlema: 'die Minibar', classeGramatical: 'Subst. fem.', plural: 'die Minibars', traducao: 'frigobar', fraseModelo: 'Die Minibar im Zimmer ist leer.' },
  { palavraAlema: 'das Bad', classeGramatical: 'Subst. neutro', plural: 'die Bäder', traducao: 'banheiro', fraseModelo: 'Alle Zimmer haben ein privates Bad.' },
  { palavraAlema: 'das WLAN', classeGramatical: 'Subst. neutro', plural: 'sem plural', traducao: 'Wi-Fi', fraseModelo: 'Hat das Zimmer schnelles WLAN?' },
  { palavraAlema: 'das Restaurant', classeGramatical: 'Subst. neutro', plural: 'die Restaurants', traducao: 'restaurante', fraseModelo: 'Gibt es auch ein Hotelrestaurant?' },
  { palavraAlema: 'die Adresse', classeGramatical: 'Subst. fem.', plural: 'die Adressen', traducao: 'endereço', fraseModelo: 'Ich brauche noch Ihre private Adresse.' },
  { palavraAlema: 'die Postleitzahl', classeGramatical: 'Subst. fem.', plural: 'die Postleitzahlen', traducao: 'CEP', fraseModelo: 'Wie ist Ihre Postleitzahl?' },
  { palavraAlema: 'die Kreditkarte', classeGramatical: 'Subst. fem.', plural: 'die Kreditkarten', traducao: 'cartão de crédito', fraseModelo: 'Zahlen Sie mit Kreditkarte oder bar?' },
  { palavraAlema: 'der Zimmerschlüssel', classeGramatical: 'Subst. masc.', plural: 'die Zimmerschlüssel', traducao: 'chave do quarto', fraseModelo: 'Das sind Ihre Zimmerschlüssel.' },
  { palavraAlema: 'die Zimmernummer', classeGramatical: 'Subst. fem.', plural: 'die Zimmernummern', traducao: 'número do quarto', fraseModelo: 'Ihre Zimmernummer ist die 405.' },
  { palavraAlema: 'der Aufenthalt', classeGramatical: 'Subst. masc.', plural: 'die Aufenthalte', traducao: 'estadia', fraseModelo: 'Wir wünschen Ihnen einen schönen Aufenthalt!' },
  { palavraAlema: 'die Dusche', classeGramatical: 'Subst. fem.', plural: 'die Duschen', traducao: 'chuveiro', fraseModelo: 'Die Dusche in Zimmer 405 ist kaputt.' },
  { palavraAlema: 'das Handtuch', classeGramatical: 'Subst. neutro', plural: 'die Handtücher', traducao: 'toalha', fraseModelo: 'Es gibt leider keine Handtücher im Bad.' },
  { palavraAlema: 'das Toilettenpapier', classeGramatical: 'Subst. neutro', plural: 'sem plural', traducao: 'papel higiênico', fraseModelo: 'Im Bad gibt es kein Toilettenpapier.' },
  { palavraAlema: 'die Tiefgarage', classeGramatical: 'Subst. fem.', plural: 'die Tiefgaragen', traducao: 'garagem subterrânea', fraseModelo: 'Das Hotel hat eine eigene Tiefgarage.' },
  { palavraAlema: 'der Parkplatz', classeGramatical: 'Subst. masc.', plural: 'die Parkplätze', traducao: 'estacionamento', fraseModelo: 'Der Parkplatz kostet 13 Euro pro Tag.' },
  { palavraAlema: 'das Fitnesscenter', classeGramatical: 'Subst. neutro', plural: 'die Fitnesscenter', traducao: 'academia', fraseModelo: 'Das Hotel Am Park hat ein Fitnesscenter.' },
  { palavraAlema: 'das Schwimmbad', classeGramatical: 'Subst. neutro', plural: 'die Schwimmbäder', traducao: 'piscina', fraseModelo: 'Das Schwimmbad ist ab 7 Uhr geöffnet.' },
  { palavraAlema: 'die Sauna', classeGramatical: 'Subst. fem.', plural: 'die Saunen', traducao: 'sauna', fraseModelo: 'Die Sauna befindet sich im Untergeschoss.' },
];

// 2.16 Registro Coloquial e Autêntico (Umgangssprache)
export const COLLOQUIAL_LESSON_6 = [
  { expressao: 'Grüß Gott!', traducao: 'Bom dia! / Olá!', contexto: 'Saudação tradicional no Sul da Alemanha (Baviera) e Áustria' },
  { expressao: 'Grüezi!', traducao: 'Olá!', contexto: 'Saudação padrão na Suíça alemã' },
  { expressao: 'Na?', traducao: 'E aí? / Tudo bem?', contexto: 'Saudação informal ultracurta' },
  { expressao: 'Was geht?', traducao: 'O que tá pegando? / E aí?', contexto: 'Gíria juvenil cotidiana' },
  { expressao: 'Alles klar?', traducao: 'Tudo certo? / Tudo bem?', contexto: 'Pergunta rápida de checagem' },
  { expressao: 'Kein Problem!', traducao: 'Sem problema!', contexto: 'Resposta cordial cotidiana' },
  { expressao: 'Passt schon!', traducao: 'Tá ótimo assim! / Deixa estar!', contexto: 'Muito comum no sul para dizer que está tudo resolvido' },
  { expressao: 'Echt?', traducao: 'Sério? / De verdade?', contexto: 'Expressão de surpresa espontânea' },
  { expressao: 'Krass!', traducao: 'Nossa! / Impressionante! / Que doideira!', contexto: 'Gíria juvenil de forte intensidade' },
  { expressao: 'Bock haben', traducao: 'Estar a fim de algo', contexto: '"Ich habe keinen Bock" = Não estou a fim' },
  { expressao: 'Mach\'s gut!', traducao: 'Cuide-se! / Vai bem!', contexto: 'Despedida informal calorosa' },
  { expressao: 'Bis dann!', traducao: 'Até logo!', contexto: 'Despedida informal para reencontro próximo' },
  { expressao: 'Bis später!', traducao: 'Até mais tarde!', contexto: 'Despedida para reencontro no mesmo dia' },
  { expressao: 'Schönen Aufenthalt!', traducao: 'Tenha uma ótima estadia!', contexto: 'Fórmula de cortesia típica da hotelaria' },
  { expressao: 'Gute Reise!', traducao: 'Boa viagem!', contexto: 'Desejo formal e informal aos viajantes' },
];

// 3.1 Exercício A6 — 14 Perguntas e Respostas sobre os 3 Hotéis
export const EXERCISE_A6_QUESTIONS = [
  { num: 0, pergunta: 'Wie viel kostet ein Doppelzimmer im Hotel Central?', resposta: 'Es kostet zwischen 69 und 89 Euro.', detalhe: 'Preço por quarto com café incluso.' },
  { num: 1, pergunta: 'Ist der Preis mit oder ohne Frühstück?', resposta: 'Der Preis ist mit Frühstück.', detalhe: 'No Hotel Central o café da manhã está incluído.' },
  { num: 2, pergunta: 'Wie viele Sterne hat das Hotel Krone?', resposta: 'Es hat drei Sterne.', detalhe: 'Categoria 3 estrelas (Goethestraße).' },
  { num: 3, pergunta: 'Welche Besonderheit hat das Hotel Central?', resposta: 'Es hat eine Tiefgarage.', detalhe: 'Custa 13 euros por dia.' },
  { num: 4, pergunta: 'Wie ist die Zimmerausstattung im Hotel Krone?', resposta: 'Dusche mit WC, Haartrockner, Fernseher, Radio, WLAN, Schreibtisch.', detalhe: 'Quartos com chuveiro em vez de banheira.' },
  { num: 5, pergunta: 'Wie ist die Adresse vom Hotel Krone?', resposta: 'Goethestraße 9, München.', detalhe: 'A poucos minutos do Hauptbahnhof.' },
  { num: 6, pergunta: 'Wie viele Zimmer hat das Hotel Central?', resposta: 'Es hat 56 Zimmer.', detalhe: 'Hotel de porte médio.' },
  { num: 7, pergunta: 'Gibt es ein Fitnesscenter im Hotel Am Park?', resposta: 'Ja, es gibt ein Fitnesscenter.', detalhe: 'Hotel 4 estrelas com área completa de bem-estar.' },
  { num: 8, pergunta: 'Wie viel kostet ein Dreibettzimmer im Hotel Krone?', resposta: 'Es kostet zwischen 86 und 220 Euro.', detalhe: 'Com café da manhã incluso.' },
  { num: 9, pergunta: 'Liegt das Hotel Krone im Zentrum von München?', resposta: 'Ja, es liegt im Zentrum.', detalhe: 'Localização central junto à estação principal.' },
  { num: 10, pergunta: 'Wie viel kostet ein Einzelzimmer im Hotel Am Park?', resposta: 'Es kostet zwischen 255 und 325 Euro.', detalhe: 'Categoria executiva sem café da manhã.' },
  { num: 11, pergunta: 'Gibt es im Hotel Krone eine Tiefgarage?', resposta: 'Nein, es gibt keine Tiefgarage.', detalhe: 'Diferencial em relação ao Hotel Central.' },
  { num: 12, pergunta: 'Wie viele Sterne hat das Hotel Am Park?', resposta: 'Es hat vier Sterne.', detalhe: 'Hotel de luxo na Theresienwiese.' },
  { num: 13, pergunta: 'Kann man im Hotel Am Park etwas essen?', resposta: 'Ja, es gibt ein Restaurant.', detalhe: 'Possui restaurante próprio e bar.' },
];

// 3.4 Exercício A11 — 21 Sentenças de Necessidades
export const EXERCISE_A11_STATEMENTS = [
  { item: 'Fernseher', frase: 'Ich brauche unbedingt einen Fernseher.', tipo: 'brauche unbedingt (masc. acus.)' },
  { item: 'Telefon', frase: 'Ich finde ein Telefon wichtig.', tipo: 'finde ... wichtig (neutro acus.)' },
  { item: 'Tiefgarage', frase: 'Eine Tiefgarage brauche ich nicht.', tipo: 'brauche ... nicht (fem. acus. Vorfeld)' },
  { item: 'Parkplatz', frase: 'Ich brauche einen Parkplatz.', tipo: 'brauche (masc. acus.)' },
  { item: 'Fitnesscenter', frase: 'Ein Fitnesscenter finde ich unwichtig.', tipo: 'finde ... unwichtig (neutro acus.)' },
  { item: 'Minibar', frase: 'Ich finde eine Minibar wichtig.', tipo: 'finde ... wichtig (fem. acus.)' },
  { item: 'Haartrockner', frase: 'Ich brauche einen Haartrockner.', tipo: 'brauche (masc. acus.)' },
  { item: 'Schreibtisch', frase: 'Ich brauche einen Schreibtisch.', tipo: 'brauche (masc. acus.)' },
  { item: 'Bad', frase: 'Ich finde ein Bad wichtig.', tipo: 'finde ... wichtig (neutro acus.)' },
  { item: 'Zimmersafe', frase: 'Einen Zimmersafe brauche ich nicht.', tipo: 'brauche ... nicht (masc. acus. Vorfeld)' },
  { item: 'Hosenbügler', frase: 'Einen Hosenbügler finde ich unwichtig.', tipo: 'finde ... unwichtig (masc. acus. Vorfeld)' },
  { item: 'Dusche', frase: 'Ich brauche eine Dusche.', tipo: 'brauche (fem. acus.)' },
  { item: 'Einzelbett', frase: 'Ich brauche ein Einzelbett.', tipo: 'brauche (neutro acus.)' },
  { item: 'Doppelbett', frase: 'Ich finde ein Doppelbett wichtig.', tipo: 'finde ... wichtig (neutro acus.)' },
  { item: 'extra Sessel', frase: 'Einen extra Sessel brauche ich nicht.', tipo: 'brauche ... nicht (masc. acus. Vorfeld)' },
  { item: 'WLAN', frase: 'Ich brauche WLAN.', tipo: 'brauche (sem artigo)' },
  { item: 'Schwimmbad', frase: 'Ein Schwimmbad finde ich unwichtig.', tipo: 'finde ... unwichtig (neutro acus.)' },
  { item: 'Balkon', frase: 'Ich finde einen Balkon wichtig.', tipo: 'finde ... wichtig (masc. acus.)' },
  { item: 'Restaurant', frase: 'Ich brauche ein Restaurant.', tipo: 'brauche (neutro acus.)' },
  { item: 'Sauna', frase: 'Eine Sauna brauche ich nicht.', tipo: 'brauche ... nicht (fem. acus. Vorfeld)' },
  { item: 'Wellnessbereich', frase: 'Einen Wellnessbereich finde ich unwichtig.', tipo: 'finde ... unwichtig (masc. acus. Vorfeld)' },
];

// 3.5 Exercício A13 — Diálogos de Problemas no Hotel
export const EXERCISE_A13_PROBLEMS = [
  { item: 'Der Fernseher ist kaputt.', hospede: 'Peter Heinemann', zimmer: '405', fala: 'Hier ist Peter Heinemann, Zimmer 405. Ich habe ein Problem: Der Fernseher ist kaputt. Ich brauche einen neuen Fernseher.', solucao: 'Das bringen wir in Ordnung.' },
  { item: 'Das Bett ist zu hart.', hospede: 'Maria Schmidt', zimmer: '302', fala: 'Hier ist Maria Schmidt, Zimmer 302. Ich habe ein Problem: Das Bett ist zu hart. Ich brauche ein weiches Bett.', solucao: 'Das bringen wir sofort in Ordnung.' },
  { item: 'Das Bad ist sehr klein.', hospede: 'Hans Müller', zimmer: '210', fala: 'Hier ist Hans Müller, Zimmer 210. Ich habe ein Problem: Das Bad ist sehr klein. Ich brauche ein größeres Bad.', solucao: 'Wir schauen nach einem anderen Zimmer.' },
  { item: 'Die Minibar ist leer.', hospede: 'Anna Weber', zimmer: '115', fala: 'Hier ist Anna Weber, Zimmer 115. Ich habe ein Problem: Die Minibar ist leer. Ich brauche etwas zu trinken.', solucao: 'Wir füllen die Minibar sofort auf.' },
  { item: 'Der Haartrockner funktioniert nicht.', hospede: 'Lisa Meyer', zimmer: '408', fala: 'Hier ist Lisa Meyer, Zimmer 408. Ich habe ein Problem: Der Haartrockner funktioniert nicht. Ich brauche einen neuen Haartrockner.', solucao: 'Wir bringen Ihnen sofort einen neuen Föhn.' },
  { item: 'Die Dusche ist kaputt.', hospede: 'Peter Heinemann', zimmer: '405', fala: 'Hier ist Peter Heinemann, Zimmer 405. Ich habe ein Problem: Die Dusche ist kaputt. Ich brauche eine neue Dusche.', solucao: 'Unser Techniker kommt sofort.' },
  { item: 'Es gibt keine Handtücher.', hospede: 'Thomas Klein', zimmer: '220', fala: 'Hier ist Thomas Klein, Zimmer 220. Ich habe ein Problem: Es gibt keine Handtücher. Ich brauche Handtücher.', solucao: 'Das Housekeeping bringt Ihnen frische Handtücher.' },
  { item: 'Es gibt kein Toilettenpapier.', hospede: 'Sabine Groß', zimmer: '315', fala: 'Hier ist Sabine Groß, Zimmer 315. Ich habe ein Problem: Es gibt kein Toilettenpapier. Ich brauche Toilettenpapier.', solucao: 'Wir bringen sofort Toilettenpapier.' },
];

// 3.9 & 3.10 Tradução Reversa de Blindagem (10 Itens com Gabarito e Análise Sintática)
export const REVERSE_TRANSLATION_LESSON_6 = [
  {
    id: 1,
    pt: 'Bom dia, o senhor tem um quarto livre? — Sim, temos um quarto individual.',
    de: 'Guten Tag, haben Sie ein Zimmer frei? — Ja, wir haben ein Einzelzimmer.',
    justificativa: 'haben rege caso Acusativo neutro (ein Zimmer / ein Einzelzimmer). No alemão, apenas o masculino muda no Acusativo; o neutro permanece idêntico ao Nominativo.',
  },
  {
    id: 2,
    pt: 'Quanto custa o quarto? — Custa 75 euros por noite.',
    de: 'Was kostet das Zimmer? — Es kostet 75 Euro pro Nacht.',
    justificativa: 'kosten na Posição II com sujeito neutro das Zimmer (retomado anaforicamente pelo pronome pessoal neutro es: Es kostet...).',
  },
  {
    id: 3,
    pt: 'O preço é com ou sem café da manhã? — É sem café da manhã.',
    de: 'Ist der Preis mit oder ohne Frühstück? — Er ist ohne Frühstück.',
    justificativa: 'mit rege Dativo e ohne rege Acusativo obrigatório. Der Preis (masculino) é retomado pelo pronome pessoal er: Er ist ohne Frühstück.',
  },
  {
    id: 4,
    pt: 'O quarto tem uma escrivaninha e uma televisão? — Sim, todos os quartos têm.',
    de: 'Hat das Zimmer einen Schreibtisch und einen Fernseher? — Ja, alle Zimmer haben einen Schreibtisch und einen Fernseher.',
    justificativa: 'Schreibtisch e Fernseher são masculinos (der). Como objetos diretos do verbo haben, sofrem inflexão acusativa obrigatória: der → einen (-en).',
  },
  {
    id: 5,
    pt: 'Eu gostaria de um quarto duplo. — Quanto tempo o senhor deseja ficar? — Duas noites.',
    de: 'Ich möchte ein Doppelzimmer. — Wie lange möchten Sie bleiben? — Zwei Nächte.',
    justificativa: 'Uso de möchte (desejo polido, sem -t na 3ª/1ª pessoa). Com pergunta aberta, o verbo modal fica na Posição II e o infinitivo bleiben fecha a oração no Satzende.',
  },
  {
    id: 6,
    pt: 'Eu preciso de uma escrivaninha. — Nós resolvemos isso.',
    de: 'Ich brauche einen Schreibtisch. — Das bringen wir in Ordnung.',
    justificativa: 'brauchen rege Acusativo (einen Schreibtisch). A expressão idiomática institucional alemã para resolver um problema técnico é "etwas in Ordnung bringen".',
  },
  {
    id: 7,
    pt: 'O chuveiro está quebrado e não há toalhas.',
    de: 'Die Dusche ist kaputt und es gibt keine Handtücher.',
    justificativa: 'es gibt (há) rege caso Acusativo obrigatório. Handtücher é plural, logo a negação recebe a terminação plural keine.',
  },
  {
    id: 8,
    pt: 'Posso pagar com cartão de crédito? — Sim, com VISA ou Mastercard.',
    de: 'Kann ich mit Kreditkarte zahlen? — Ja, mit VISA oder Mastercard.',
    justificativa: 'können (capacidade/possibilidade) na Posição I (pergunta de Sim/Não), sujeito na Posição II e verbo infinitivo zahlen no Satzende. A preposição mit rege Dativo.',
  },
  {
    id: 9,
    pt: 'A televisão não funciona. — Isso não pode ser!',
    de: 'Der Fernseher funktioniert nicht. — Das kann doch nicht sein!',
    justificativa: 'A partícula modal doch expressa surpresa incontornável ("Não é possível!"). O modalverb kann fecha com o infinitivo sein no Satzende.',
  },
  {
    id: 10,
    pt: 'Eu gostaria de um café. — Um momento, por favor.',
    de: 'Ich möchte einen Kaffee. — Einen Moment, bitte.',
    justificativa: 'Kaffee e Moment são masculinos (der Kaffee, der Moment). Ambos estão no Acusativo como objeto ou complemento elíptico temporal: einen Kaffee, einen Moment.',
  },
];

// 3.11 Resumo dos Pontos-Chave do Dia 006 (14 Mandamentos da Rodada 06)
export const KEY_POINTS_LESSON_6 = [
  { numero: 1, conceito: 'A Regra de Ouro do Acusativo', regra: 'Apenas o gênero masculino muda no Acusativo (der → den, ein → einen, kein → keinen, mein → meinen). Feminino (die/eine), neutro (das/ein) e plural (die/keine) não sofrem alteração de caso.' },
  { numero: 2, conceito: 'Verbos Transitivos Diretos', regra: 'Verbos como haben, brauchen, kaufen, suchen, finden, sehen, lesen, schreiben, essen, trinken, bezahlen e möchten exigem seu complemento direto rigorosamente no caso Acusativo.' },
  { numero: 3, conceito: 'Conjugação do Modalverb möchte', regra: 'ich möchte, du möchtest, er/sie/es möchte, wir möchten, ihr möchtet, sie/Sie möchten. A 1ª e a 3ª pessoa do singular são absolutamente idênticas e terminam em -e (nunca levam -t).' },
  { numero: 4, conceito: 'Diferença entre möchte e wollen', regra: 'möchte expressa pedido ou desejo cortês e polido. wollen expressa vontade forte, impositiva e autoritária, soando descortês em balcões de atendimento e hotéis.' },
  { numero: 5, conceito: 'A Lei do Último Elemento nos Komposita', regra: 'Em substantivos compostos alemães, o último elemento determina soberanamente o gênero e o plural da palavra inteira: das Hotel + der Schlüssel = der Hotelschlüssel.' },
  { numero: 6, conceito: 'Preposições Temporais', regra: 'um para horários pontuais (um 15.00 Uhr); am para dias e partes do dia (am Montag); im para meses e estações (im Januar); von ... bis para períodos delimitados.' },
  { numero: 7, conceito: 'Preposições Locais de Repouso (Dativo)', regra: 'Para indicar localização estática ("onde?"), usa-se Dativo: in (dentro), an (na borda/superfície vertical), auf (sobre), bei (junto a/empresa), neben (ao lado).' },
  { numero: 8, conceito: 'Contrações Obrigatórias', regra: 'in + dem = im; an + dem = am; bei + dem = beim; von + dem = vom; zu + dem = zum; zu + der = zur; in + das = ins; an + das = ans.' },
  { numero: 9, conceito: 'O Quantificador Invariável mehrere', regra: 'mehrere significa "vários/várias", não se declina com artigo e é usado exclusivamente com substantivos no plural (Ich habe mehrere Probleme).' },
  { numero: 10, conceito: 'Präteritum de haben e sein', regra: 'Na linguagem falada cotidiana, haben e sein são usados prioritariamente no Präteritum: ich hatte, du hattest, er hatte... e ich war, du warst, er war...' },
  { numero: 11, conceito: 'Profissões e Nacionalidades sem Artigo', regra: 'Após os verbos sein e werden, profissões e nacionalidades não recebem artigo em alemão: "Ich bin Informatiker", "Er ist Deutscher".' },
  { numero: 12, conceito: 'Adjetivo Predicativo vs. Atributivo', regra: 'O adjetivo predicativo (após o verbo sein) não tem desinência: "Der Fernseher ist neu". O adjetivo atributivo (antes do substantivo) recebe desinência: "ein neuer Fernseher" / "einen neuen Fernseher".' },
  { numero: 13, conceito: 'Topologia da Negação com nicht', regra: 'Quando a negação recai sobre um adjetivo predicativo ou advérbio de estado, nicht o precede diretamente: "Das Bett ist nicht weich", "Der Fernseher geht nicht".' },
  { numero: 14, conceito: 'Fórmula Institucional de Solução', regra: 'Para afirmar que um problema será solucionado imediatamente, usa-se a locução fixa com o verbo bringen: "Wir bringen das sofort in Ordnung".' },
];
