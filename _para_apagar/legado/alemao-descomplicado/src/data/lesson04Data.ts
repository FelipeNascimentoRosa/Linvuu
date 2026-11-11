import {
  TopologicalRow,
  ContrastTrap,
  ConjugationRow,
  LexicalTerm,
  ColloquialExpression,
  KeyPoint,
} from '../types';

export const LESSON_04_METADATA = {
  round: 'RODADA 04',
  day: 'DIA 004 DO CRONOGRAMA',
  chapter: 'KAPITEL 2, TEIL A, A1–A13, p. 36–46',
  title: 'Gênero dos Substantivos (Sufixos), Modalverb können, Satzklammer, Negação (nicht vs. kein), Adjetivos Predicativos & Atributivos, Antônimos, Alternância Vocálica e Preposições Locais',
  nextRound: 'RODADA 05 — DIA 005 (Kapitel 2: Rotinas, Horários, Preposições Temporais & Verbos Separáveis).',
};

// 1.1 Gênero dos Substantivos — Regras de Sufixos
export interface SuffixRule {
  sufixo: string;
  exemplo: string;
  traducao: string;
  nota?: string;
}

export const FEMININE_SUFFIXES: SuffixRule[] = [
  { sufixo: '-ung', exemplo: 'die Zeitung, die Verwaltung, die Rechnung', traducao: 'jornal, administração, conta', nota: 'Sufixo formador de substantivos abstratos/ações nominais (100% feminino).' },
  { sufixo: '-heit', exemplo: 'die Freiheit, die Gesundheit', traducao: 'liberdade, saúde', nota: 'Designa estados ou qualidades abstratas (100% feminino).' },
  { sufixo: '-keit', exemplo: 'die Möglichkeit, die Schwierigkeit', traducao: 'possibilidade, dificuldade', nota: 'Sufixo derivado de adjetivos (100% feminino).' },
  { sufixo: '-schaft', exemplo: 'die Freundschaft, die Wissenschaft', traducao: 'amizade, ciência', nota: 'Coletividades e instituições (100% feminino).' },
  { sufixo: '-e (maioria ~90%)', exemplo: 'die Lampe, die Tasse, die Kantine', traducao: 'lâmpada, xícara, cantina', nota: 'Substantivos dissílabos terminados em -e são esmagadoramente femininos (atenção a exceções fracas como der Name, der Junge).' },
  { sufixo: '-in', exemplo: 'die Lehrerin, die Ärztin, die Sekretärin', traducao: 'professora, médica, secretária', nota: 'Marca o feminino de profissões e títulos biológicos.' },
  { sufixo: '-ion', exemplo: 'die Information, die Situation', traducao: 'informação, situação', nota: 'Estrangeirismos de origem latina em -ion (100% feminino).' },
  { sufixo: '-tät', exemplo: 'die Universität, die Aktivität', traducao: 'universidade, atividade', nota: 'Estrangeirismos correspondentes ao sufixo português -dade (100% feminino).' },
];

export const MASCULINE_SUFFIXES: SuffixRule[] = [
  { sufixo: '-er (agente)', exemplo: 'der Lehrer, der Computer, der Drucker', traducao: 'professor, computador, impressora', nota: 'Indica agente pessoal ou aparelho mecânico/tecnológico executor.' },
  { sufixo: '-ling', exemplo: 'der Frühling, der Schmetterling', traducao: 'primavera, borboleta', nota: 'Diminutivo arcaico ou pessoa/ser com tal característica (100% masculino).' },
  { sufixo: '-ismus', exemplo: 'der Tourismus, der Realismus', traducao: 'turismo, realismo', nota: 'Correntes ideológicas, científicas e movimentos (100% masculino).' },
  { sufixo: '-or', exemplo: 'der Motor, der Direktor', traducao: 'motor, diretor', nota: 'Termos de origem latina indicando máquinas ou cargos.' },
  { sufixo: '-tag (dias/tempo)', exemplo: 'der Montag, der Dienstag, der Freitag', traducao: 'segunda-feira, terça-feira, sexta-feira', nota: 'Todos os dias da semana, partes do dia (der Morgen) e estações (der Sommer) são masculinos.' },
];

export const NEUTER_SUFFIXES: SuffixRule[] = [
  { sufixo: '-chen', exemplo: 'das Mädchen, das Brötchen', traducao: 'menina/garota, pãozinho', nota: 'Diminutivo universal (força o neutro e atrai Umlaut na raiz).' },
  { sufixo: '-lein', exemplo: 'das Fräulein, das Büchlein', traducao: 'senhorita, livrinho', nota: 'Diminutivo literário/regional nobre (100% neutro).' },
  { sufixo: '-ment', exemplo: 'das Dokument, das Instrument', traducao: 'documento, instrumento', nota: 'Substantivos de raiz latina/francesa (100% neutro).' },
  { sufixo: '-um', exemplo: 'das Museum, das Zentrum', traducao: 'museu, centro', nota: 'Estrangeirismos eruditos latinos (100% neutro).' },
  { sufixo: '-nis', exemplo: 'das Ergebnis, das Zeugnis', traducao: 'resultado, certificado', nota: 'A grande maioria dos derivados em -nis é neutra (die Erlaubnis é rara exceção feminina).' },
];

export const CONTRAST_TRAPS_LESSON_4: ContrastTrap[] = [
  {
    portugues: 'a mesa (feminino no Brasil)',
    alemaoCorreto: 'der Tisch (masculino)',
    alemaoIncorreto: '*die Tisch',
    nota: 'O gênero gramatical não é propriedade biológica nem coincide com a língua materna. Sempre decore o substantivo com seu artigo e plural.',
  },
  {
    portugues: 'o sol (masculino) / a lua (feminina)',
    alemaoCorreto: 'die Sonne (feminina) / der Mond (masculino)',
    alemaoIncorreto: '*der Sonne / *die Mond',
    nota: 'Inversão cosmológica clássica: em alemão o Sol é feminino e a Lua é masculina.',
  },
  {
    portugues: 'Eu posso cozinhar muito bem (verbos adjacentes)',
    alemaoCorreto: 'Ich kann sehr gut kochen (Satzklammer: modal na Posição II, infinitivo no final)',
    alemaoIncorreto: '*Ich kann kochen sehr gut',
    nota: 'Em alemão, verbos auxiliares e modais geram a pinça oracional (Satzklammer): o verbo modal fica na Posição II e o infinitivo é empurrado rigidamente para o Satzende.',
  },
  {
    portugues: 'Eu não tenho impressora (negação com não)',
    alemaoCorreto: 'Ich habe keinen Drucker (kein nega substantivos)',
    alemaoIncorreto: '*Ich habe nicht Drucker',
    nota: 'Substantivos introduzidos por artigo indefinido ou sem artigo são obrigatoriamente negados com a família kein/keine/kein.',
  },
];

// 1.2 O Modalverb können
export const KOENNEN_CONJUGATION: ConjugationRow[] = [
  { pronomes: 'ich (eu)', forma: 'kann', destaque: 'Raiz irregular sem trema; desinência zero (sem -e)' },
  { pronomes: 'du (tu/você)', forma: 'kannst', destaque: 'Desinência regular -st aplicada à raiz kann-' },
  { pronomes: 'er / sie / es / man (ele/ela/a gente)', forma: 'kann', destaque: 'IDÊNTICO À 1ª PESSOA! Não recebe terminação -t.' },
  { pronomes: 'wir (nós)', forma: 'können', destaque: 'Plural regular: recupera trema (ö) e terminação -en' },
  { pronomes: 'ihr (vocês/vós)', forma: 'könnt', destaque: 'Recupera trema (ö) + desinência -t' },
  { pronomes: 'sie / Sie (eles/elas / o Sr./a Sra.)', forma: 'können', destaque: 'Recupera trema (ö) e terminação -en' },
];

export const SATZKLAMMER_EXAMPLES = [
  { vorfeld: 'Ich', modal: 'kann', mittelfeld: 'sehr gut', satzende: 'kochen.', traducao: 'Eu sei cozinhar muito bem.' },
  { vorfeld: 'Man', modal: 'kann', mittelfeld: 'hier Zeitungen', satzende: 'lesen.', traducao: 'Aqui se pode ler jornais.' },
  { vorfeld: 'Wir', modal: 'können', mittelfeld: 'leider nicht', satzende: 'singen.', traducao: 'Infelizmente não sabemos cantar.' },
  { vorfeld: 'Er', modal: 'kann', mittelfeld: 'heute nicht', satzende: 'kommen.', traducao: 'Ele não pode vir hoje.' },
  { vorfeld: 'Kannst (Pos. I)', modal: 'du', mittelfeld: 'gut', satzende: 'tanzen?', traducao: 'Você sabe dançar bem?' },
];

export const KOENNEN_USES = [
  { uso: 'Capacidade / Saber fazer', exemplo: 'Ich kann sehr gut Fußball spielen.', traducao: 'Eu sei jogar futebol muito bem.' },
  { uso: 'Possibilidade objetiva', exemplo: 'Hier kann man Zeitungen lesen.', traducao: 'Aqui é possível / se pode ler jornais.' },
  { uso: 'Permissão informal', exemplo: 'Kann ich hier Kaffee trinken?', traducao: 'Posso tomar café aqui?' },
  { uso: 'Habilidade / Talento', exemplo: 'Sie kann gut singen.', traducao: 'Ela sabe cantar bem.' },
];

// 1.3 Negação — nicht vs. kein
export const NICHT_VS_KEIN_VERB = [
  { tipo: 'Verbo simples', exemplo: 'Ich singe nicht.', traducao: 'Eu não canto.' },
  { tipo: 'Verbo com modal', exemplo: 'Ich kann nicht singen.', traducao: 'Eu não sei cantar.' },
  { tipo: 'Adjetivo', exemplo: 'Ich kann nicht gut singen.', traducao: 'Eu não sei cantar bem.' },
  { tipo: 'Advérbio de tempo/lugar', exemplo: 'Er kommt nicht heute.', traducao: 'Ele não vem hoje.' },
  { tipo: 'Frase inteira', exemplo: 'Ich arbeite heute nicht.', traducao: 'Eu não trabalho hoje.' },
];

export const KEIN_DECLENSION = [
  { genero: 'Masculino (Akk./Nom.)', afirmativa: 'Ich habe einen Drucker.', negativa: 'Ich habe keinen Drucker.', traducao: 'Eu não tenho impressora.' },
  { genero: 'Feminino (Akk./Nom.)', afirmativa: 'Ich habe eine Lampe.', negativa: 'Ich habe keine Lampe.', traducao: 'Eu não tenho luminária.' },
  { genero: 'Neutro (Akk./Nom.)', afirmativa: 'Ich habe ein Telefon.', negativa: 'Ich habe kein Telefon.', traducao: 'Eu não tenho telefone.' },
  { genero: 'Plural (Akk./Nom.)', afirmativa: 'Ich habe Bücher.', negativa: 'Ich habe keine Bücher.', traducao: 'Eu não tenho livros.' },
];

// 1.4 Adjetivo Predicativo vs. Atributivo
export const PREDICATIVE_ADJECTIVES = [
  { frase: 'Der Drucker ist neu.', traducao: 'A impressora é nova.', regra: 'Após sein: sem desinência.' },
  { frase: 'Die Lampe ist alt.', traducao: 'A luminária é velha.', regra: 'Após sein: sem desinência.' },
  { frase: 'Das Problem ist klein.', traducao: 'O problema é pequeno.', regra: 'Após sein: sem desinência.' },
  { frase: 'Die Bücher sind interessant.', traducao: 'Os livros são interessantes.', regra: 'Após sein: sem desinência.' },
];

export const ATTRIBUTIVE_DECLENSION = [
  { artigo: 'ein / eine (Indefinido)', masc: 'ein neuer Drucker (-er)', fem: 'eine alte Lampe (-e)', neutro: 'ein kleines Problem (-es)', plural: 'keine neuen Bücher (-en)' },
  { artigo: 'der / die / das (Definido)', masc: 'der neue Drucker (-e)', fem: 'die alte Lampe (-e)', neutro: 'das kleine Problem (-e)', plural: 'die neuen Bücher (-en)' },
];

// 1.5 Antônimos
export const ADJECTIVE_ANTONYMS = [
  { adjetivo: 'neu', antonimo: 'alt', traducao: 'novo / velho' },
  { adjetivo: 'schön', antonimo: 'hässlich', traducao: 'bonito / feio' },
  { adjetivo: 'modern', antonimo: 'unmodern', traducao: 'moderno / ultrapassado' },
  { adjetivo: 'bequem', antonimo: 'unbequem', traducao: 'confortável / desconfortável' },
  { adjetivo: 'klein', antonimo: 'groß', traducao: 'pequeno / grande' },
  { adjetivo: 'teuer', antonimo: 'billig', traducao: 'caro / barato' },
  { adjetivo: 'praktisch', antonimo: 'unpraktisch', traducao: 'prático / imprático' },
  { adjetivo: 'interessant', antonimo: 'langweilig', traducao: 'interessante / entediante' },
  { adjetivo: 'hell', antonimo: 'dunkel', traducao: 'claro / escuro' },
];

// 1.6 Verbos com Alternância Vocálica (Revisão)
export const VOWEL_CHANGE_VERBS = [
  { infinitivo: 'fahren', du: 'fährst', er: 'fährt', mudanca: 'a → ä', traducao: 'dirigir / ir com veículo' },
  { infinitivo: 'schlafen', du: 'schläfst', er: 'schläft', mudanca: 'a → ä', traducao: 'dormir' },
  { infinitivo: 'tragen', du: 'trägst', er: 'trägt', mudanca: 'a → ä', traducao: 'carregar / vestir' },
  { infinitivo: 'waschen', du: 'wäschst', er: 'wäscht', mudanca: 'a → ä', traducao: 'lavar' },
  { infinitivo: 'essen', du: 'isst', er: 'isst', mudanca: 'e → i (ss)', traducao: 'comer' },
  { infinitivo: 'lesen', du: 'liest', er: 'liest', mudanca: 'e → ie', traducao: 'ler' },
  { infinitivo: 'sprechen', du: 'sprichst', er: 'spricht', mudanca: 'e → i', traducao: 'falar' },
  { infinitivo: 'nehmen', du: 'nimmst', er: 'nimmt', mudanca: 'e → i (mm)', traducao: 'pegar / tomar' },
  { infinitivo: 'geben', du: 'gibst', er: 'gibt', mudanca: 'e → i', traducao: 'dar' },
  { infinitivo: 'sehen', du: 'siehst', er: 'sieht', mudanca: 'e → ie', traducao: 'ver / enxergar' },
];

// 1.7 Preposições Locais
export const LOCAL_PREPOSITIONS = [
  { prep: 'aus', caso: 'Dativ', uso: 'Origem / Proveniência geográfica', exemplo: 'Ich komme aus Italien.', traducao: 'Eu venho da Itália.' },
  { prep: 'in', caso: 'Dativ', uso: 'Localização estática (onde?)', exemplo: 'Ich wohne in Berlin.', traducao: 'Eu moro em Berlim.' },
  { prep: 'bei', caso: 'Dativ', uso: 'Junto a empresa, profissional ou pessoa física', exemplo: 'Ich arbeite bei Siemens.', traducao: 'Eu trabalho na Siemens.' },
  { prep: 'nach', caso: 'Dativ', uso: 'Direção para cidades, países sem artigo e continentes', exemplo: 'Ich fahre nach Italien.', traducao: 'Eu vou/viajo para a Itália.' },
];

// BLOCO 2: Textos & Mineração Lexical

// 2.1 Texto A1: Im Büro
export const TEXT_A1_DIALOGUE = [
  { speaker: 'Frau Herzberg', de: 'Guten Tag. Suchen Sie etwas?', pt: 'Bom dia. Procura algo?', note: 'Verbo suchen na Pos. I (Ja-Nein-Frage) + Sie formal + etwas (algo).' },
  { speaker: 'Herr Heinemann', de: 'Ja, mein Büro. Ich bin neu hier.', pt: 'Sim, meu escritório. Sou novo aqui.', note: 'Possessivo neutro mein Büro + sein (bin) + neu + hier.' },
  { speaker: 'Frau Herzberg', de: 'Sind Sie Herr Heinemann?', pt: 'O senhor é o Senhor Heinemann?', note: 'Ja-Nein-Frage com sein.' },
  { speaker: 'Herr Heinemann', de: 'Ja.', pt: 'Sim.', note: 'Confirmação afirmativa direta.' },
  { speaker: 'Frau Herzberg', de: 'Herzlich willkommen! Mein Name ist Lisa Herzberg, ich arbeite hier als Sekretärin. Kommen Sie! Hier ist Ihr Büro.', pt: 'Seja muito bem-vindo! Meu nome é Lisa Herzberg, eu trabalho aqui como secretária. Venha! Aqui é seu escritório.', note: 'Fórmula de acolhimento + arbeiten als + profissão + imperativo formal Kommen Sie! + possessivo formal Ihr Büro.' },
  { speaker: 'Herr Heinemann', de: 'Oh, das ist ein schönes Zimmer!', pt: 'Oh, este é um quarto/cômodo bonito!', note: 'Grupo nominal neutro nominativo: ein + schön + -es + Zimmer.' },
  { speaker: 'Frau Herzberg', de: 'Hoffentlich ist alles da.', pt: 'Espero que tudo esteja aí.', note: 'Hoffentlich (advérbio no Vorfeld) + ist (V2) + alles + da.' },
  { speaker: 'Frau Herzberg', de: 'Dort stehen: der Schreibtisch, das Telefon, der Computer, der Drucker, die Schreibtischlampe, der Stuhl und hier ist das Regal. Fehlt etwas?', pt: 'Lá estão: a escrivaninha, o telefone, o computador, a impressora, a luminária de mesa, a cadeira e aqui está a estante. Falta algo?', note: 'Dort stehen (plural coordenado de móveis e aparelhos) + Fehlt etwas? (fehlen + algo).' },
  { speaker: 'Herr Heinemann', de: 'Nein, ich glaube nicht. Vielen Dank, Frau Herzberg.', pt: 'Não, eu acho que não. Muito obrigado, Senhora Herzberg.', note: 'ich glaube nicht = expressão idiomática de opinião atenuada.' },
  { speaker: 'Frau Herzberg', de: 'Vielleicht können wir später zusammen Kaffee trinken.', pt: 'Talvez possamos tomar café juntos mais tarde.', note: 'Vielleicht (Pos. I) + können (Pos. II) + wir + später + zusammen + Kaffee + trinken (Satzende).' },
  { speaker: 'Herr Heinemann', de: 'Gerne.', pt: 'Com prazer / Com certeza.', note: 'Advérbio afirmativo cortês.' },
  { speaker: 'Frau Herzberg', de: 'Meine Telefonnummer ist die 44 22. Ganz einfach!', pt: 'Meu número de telefone é o 44 22. Bem simples!', note: 'Meine Telefonnummer (fem.) + die 44 22 (artigo die antes do número).' },
  { speaker: 'Herr Heinemann', de: 'Danke. Bis später.', pt: 'Obrigado. Até mais tarde.', note: 'Fórmula de despedida curta.' },
  { speaker: 'Frau Herzberg', de: 'Bis später.', pt: 'Até mais tarde.', note: 'Réplica de despedida.' },
];

// 2.2 Texto A2: Was ist im Büro? (17 itens)
export const OFFICE_ITEMS_A2 = [
  { artigo: 'das', subst: 'Telefon', plural: 'die Telefone', traducao: 'o telefone', audio: 'das Telefon, die Telefone' },
  { artigo: 'die', subst: 'Tasse', plural: 'die Tassen', traducao: 'a xícara', audio: 'die Tasse, die Tassen' },
  { artigo: 'die', subst: 'Lampe', plural: 'die Lampen', traducao: 'a lâmpada / luminária', audio: 'die Lampe, die Lampen' },
  { artigo: 'der', subst: 'Drucker', plural: 'die Drucker', traducao: 'a impressora', audio: 'der Drucker, die Drucker' },
  { artigo: 'der', subst: 'Stuhl', plural: 'die Stühle', traducao: 'a cadeira', audio: 'der Stuhl, die Stühle' },
  { artigo: 'der', subst: 'Schreibtisch', plural: 'die Schreibtische', traducao: 'a escrivaninha / mesa de escritório', audio: 'der Schreibtisch, die Schreibtische' },
  { artigo: 'der', subst: 'Computer', plural: 'die Computer', traducao: 'o computador', audio: 'der Computer, die Computer' },
  { artigo: 'der', subst: 'Laptop', plural: 'die Laptops', traducao: 'o laptop', audio: 'der Laptop, die Laptops' },
  { artigo: 'die', subst: 'Maus', plural: 'die Mäuse', traducao: 'o mouse', audio: 'die Maus, die Mäuse' },
  { artigo: 'der', subst: 'Schlüssel', plural: 'die Schlüssel', traducao: 'a chave', audio: 'der Schlüssel, die Schlüssel' },
  { artigo: 'das', subst: 'Buch', plural: 'die Bücher', traducao: 'o livro', audio: 'das Buch, die Bücher' },
  { artigo: 'die', subst: 'Brille', plural: 'die Brillen', traducao: 'os óculos (singular em al.)', audio: 'die Brille, die Brillen' },
  { artigo: 'der', subst: 'Terminkalender', plural: 'die Terminkalender', traducao: 'a agenda de compromissos', audio: 'der Terminkalender, die Terminkalender' },
  { artigo: 'der', subst: 'Stift', plural: 'die Stifte', traducao: 'a caneta / lápis', audio: 'der Stift, die Stifte' },
  { artigo: 'das', subst: 'Handy', plural: 'die Handys', traducao: 'o celular', audio: 'das Handy, die Handys' },
  { artigo: 'das', subst: 'Mobiltelefon', plural: 'die Mobiltelefone', traducao: 'o telefone celular / móvel', audio: 'das Mobiltelefon, die Mobiltelefone' },
  { artigo: 'das', subst: 'Smartphone', plural: 'die Smartphones', traducao: 'o smartphone', audio: 'das Smartphone, die Smartphones' },
  { artigo: 'die', subst: 'Kaffeemaschine', plural: 'die Kaffeemaschinen', traducao: 'a cafeteira', audio: 'die Kaffeemaschine, die Kaffeemaschinen' },
];

// 2.3 Texto A6: Was kostet ...?
export const OFFICE_PRICES_A6 = [
  { item: 'der / ein Bürostuhl', preco: '30,00 €', pronome: 'er', traducao: 'a cadeira de escritório' },
  { item: 'der / ein Computer', preco: '599,00 €', pronome: 'er', traducao: 'o computador' },
  { item: 'der / ein Bildschirm', preco: '299,00 €', pronome: 'er', traducao: 'o monitor' },
  { item: 'die / eine Bürolampe', preco: '34,99 €', pronome: 'sie', traducao: 'a luminária de escritório' },
  { item: 'das Kopiergerät / der Kopierer', preco: '691,00 €', pronome: 'es / er', traducao: 'a copiadora' },
  { item: 'der / ein Laptop', preco: '1299,00 €', pronome: 'er', traducao: 'o laptop' },
  { item: 'das / ein Regal', preco: '99,00 €', pronome: 'es', traducao: 'a estante' },
  { item: 'der / ein Papierkorb', preco: '2,99 €', pronome: 'er', traducao: 'a lixeira' },
  { item: 'der / ein Scanner', preco: '140,59 €', pronome: 'er', traducao: 'o scanner' },
  { item: 'das / ein Tablet', preco: '378,00 €', pronome: 'es', traducao: 'o tablet' },
];

// 2.4 Texto A8: Probleme im Büro
export const TEXT_A8_DIALOGUE = [
  { speaker: 'Frau Herzberg', de: 'Na, Herr Heinemann, wie geht es?', pt: 'E aí, Senhor Heinemann, como vai?', note: 'Na? (interjeição informal acolhedora) + Wie geht es? (saudação fixa).' },
  { speaker: 'Herr Heinemann', de: 'Danke, gut. Ich habe ein kleines Problem, Frau Herzberg. Mein Drucker funktioniert nicht. Ich kann nicht drucken.', pt: 'Obrigado, bem. Eu tenho um pequeno problema, Senhora Herzberg. Minha impressora não funciona. Eu não consigo imprimir.', note: 'ein kleines Problem (neutro) + funktioniert nicht (negação verbal) + kann nicht drucken (modal + Satzklammer).' },
  { speaker: 'Frau Herzberg', de: 'Was? Das ist ein neuer Drucker!', pt: 'O quê? Essa é uma impressora nova!', note: 'ein neuer Drucker (masculino atributivo com terminação -er).' },
  { speaker: 'Herr Heinemann', de: 'Ist der Computer auch kaputt?', pt: 'O computador também está quebrado?', note: 'Ja-Nein-Frage com adjetivo predicativo kaputt.' },
  { speaker: 'Frau Herzberg', de: 'Nein, der Computer funktioniert. Das Telefon auch.', pt: 'Não, o computador funciona. O telefone também.', note: 'Afirmação de operacionalidade dos aparelhos.' },
  { speaker: 'Herr Heinemann', de: 'Und die Lampe geht auch? Es ist eine alte Lampe.', pt: 'E a luminária também funciona? É uma lâmpada velha.', note: 'gehen usado no sentido coloquial de funcionar + eine alte Lampe (-e no feminino).' },
  { speaker: 'Frau Herzberg', de: 'Die Lampe funktioniert gut.', pt: 'A luminária funciona bem.', note: 'gut como advérbio qualificativo do verbo.' },
  { speaker: 'Herr Heinemann', de: 'Also nur der Drucker ...', pt: 'Então só a impressora ...', note: 'also (portanto, então) + nur (apenas, somente).' },
  { speaker: 'Frau Herzberg', de: 'Ja.', pt: 'Sim.', note: 'Confirmação objetiva.' },
  { speaker: 'Herr Heinemann', de: 'Ich komme gleich wieder. Ich frage mal Paul ...', pt: 'Eu já volto. Vou dar uma perguntada para o Paul ...', note: 'gleich wiederkommen (voltar já) + partícula modal atenuadora "mal".' },
];

// 2.5 Texto A9: Was ist das Problem?
export const TEXT_A9_EXERCISE = [
  { num: 0, problema: 'Mein Drucker ist kaputt.', resolucao: 'Ich kann nicht drucken.', verbo: 'drucken', traducao: 'Minha impressora está quebrada. Não posso imprimir.' },
  { num: 1, problema: 'Mein Telefon ist kaputt.', resolucao: 'Ich kann nicht telefonieren.', verbo: 'telefonieren', traducao: 'Meu telefone está quebrado. Não posso telefonar.' },
  { num: 2, problema: 'Mein Stift ist kaputt.', resolucao: 'Ich kann nicht schreiben.', verbo: 'schreiben', traducao: 'Minha caneta quebrou. Não posso escrever.' },
  { num: 3, problema: 'Mein Computer funktioniert nicht.', resolucao: 'Ich kann nicht arbeiten.', verbo: 'arbeiten', traducao: 'Meu computador não funciona. Não posso trabalhar.' },
  { num: 4, problema: 'Mein Stuhl ist unbequem.', resolucao: 'Ich kann nicht sitzen.', verbo: 'sitzen', traducao: 'Minha cadeira é desconfortável. Não posso me sentar.' },
  { num: 5, problema: 'Meine Brille ist kaputt.', resolucao: 'Ich kann nicht sehen.', verbo: 'sehen', traducao: 'Meus óculos quebraram. Não posso enxergar.' },
  { num: 6, problema: 'Mein Auto geht nicht.', resolucao: 'Ich kann nicht fahren.', verbo: 'fahren', traducao: 'Meu carro não pega. Não posso dirigir.' },
  { num: 7, problema: 'Mein Laptop funktioniert nicht.', resolucao: 'Ich kann nicht arbeiten.', verbo: 'arbeiten', traducao: 'Meu laptop não funciona. Não posso trabalhar.' },
  { num: 8, problema: 'Mein Fußball ist kaputt.', resolucao: 'Ich kann nicht Fußball spielen.', verbo: 'spielen', traducao: 'Minha bola de futebol estourou. Não posso jogar futebol.' },
];

// 2.8 Texto A13: Eine neue Kaffeemaschine
export const TEXT_A13_SENTENCES = [
  { num: 0, afirmativa: 'Die Kaffeemaschine ist nicht alt.', modelo: 'Es ist eine neue Kaffeemaschine.', genero: 'feminino (-e)' },
  { num: 1, afirmativa: 'Der Computer ist nicht neu.', modelo: 'Es ist ein alter Computer.', genero: 'masculino (-er)' },
  { num: 2, afirmativa: 'Die Uhr ist nicht alt.', modelo: 'Es ist eine neue Uhr.', genero: 'feminino (-e)' },
  { num: 3, afirmativa: 'Das Bild ist nicht schön.', modelo: 'Es ist ein hässliches Bild.', genero: 'neutro (-es)' },
  { num: 4, afirmativa: 'Das Buch ist nicht langweilig.', modelo: 'Es ist ein interessantes Buch.', genero: 'neutro (-es)' },
  { num: 5, afirmativa: 'Das Auto ist nicht teuer.', modelo: 'Es ist ein billiges Auto.', genero: 'neutro (-es)' },
  { num: 6, afirmativa: 'Das Büro ist nicht dunkel.', modelo: 'Es ist ein helles Büro.', genero: 'neutro (-es)' },
  { num: 7, afirmativa: 'Der Schreibtisch ist nicht unpraktisch.', modelo: 'Es ist ein praktischer Schreibtisch.', genero: 'masculino (-er)' },
  { num: 8, afirmativa: 'Das Handy ist nicht modern.', modelo: 'Es ist ein unmodernes Handy.', genero: 'neutro (-es)' },
  { num: 9, afirmativa: 'Die Lampe ist nicht hässlich.', modelo: 'Es ist eine schöne Lampe.', genero: 'feminino (-e)' },
  { num: 10, afirmativa: 'Das Regal ist nicht klein.', modelo: 'Es ist ein großes Regal.', genero: 'neutro (-es)' },
  { num: 11, afirmativa: 'Der Drucker ist nicht alt.', modelo: 'Es ist ein neuer Drucker.', genero: 'masculino (-er)' },
  { num: 12, afirmativa: 'Das Telefon ist nicht teuer.', modelo: 'Es ist ein billiges Telefon.', genero: 'neutro (-es)' },
  { num: 13, afirmativa: 'Die Brille ist nicht unpraktisch.', modelo: 'Es ist eine praktische Brille.', genero: 'feminino (-e)' },
  { num: 14, afirmativa: 'Der Stuhl ist nicht unbequem.', modelo: 'Es ist ein bequemer Stuhl.', genero: 'masculino (-er)' },
  { num: 15, afirmativa: 'Die Maus ist nicht groß.', modelo: 'Es ist eine kleine Maus.', genero: 'feminino (-e)' },
  { num: 16, afirmativa: 'Der Kopierer ist nicht billig.', modelo: 'Es ist ein teurer Kopierer.', genero: 'masculino (-er)' },
];

// 2.9 Tabela Lexical Primária
export const LEXICON_LESSON_4: LexicalTerm[] = [
  { palavraAlema: 'das Büro', classeGramatical: 'Subst. neutro', plural: 'die Büros', traducaoExata: 'escritório', fraseModelo: 'Hier ist Ihr Büro.', audio: 'das Büro' },
  { palavraAlema: 'der Schreibtisch', classeGramatical: 'Subst. masc.', plural: 'die Schreibtische', traducaoExata: 'escrivaninha', fraseModelo: 'Dort steht der Schreibtisch.', audio: 'der Schreibtisch' },
  { palavraAlema: 'der Drucker', classeGramatical: 'Subst. masc.', plural: 'die Drucker', traducaoExata: 'impressora', fraseModelo: 'Mein Drucker funktioniert nicht.', audio: 'der Drucker' },
  { palavraAlema: 'der Computer', classeGramatical: 'Subst. masc.', plural: 'die Computer', traducaoExata: 'computador', fraseModelo: 'Der Computer funktioniert.', audio: 'der Computer' },
  { palavraAlema: 'das Telefon', classeGramatical: 'Subst. neutro', plural: 'die Telefone', traducaoExata: 'telefone', fraseModelo: 'Das Telefon auch.', audio: 'das Telefon' },
  { palavraAlema: 'die Lampe', classeGramatical: 'Subst. fem.', plural: 'die Lampen', traducaoExata: 'lâmpada / luminária', fraseModelo: 'Die Lampe funktioniert gut.', audio: 'die Lampe' },
  { palavraAlema: 'der Stuhl', classeGramatical: 'Subst. masc.', plural: 'die Stühle', traducaoExata: 'cadeira', fraseModelo: 'Der Stuhl ist unbequem.', audio: 'der Stuhl' },
  { palavraAlema: 'das Regal', classeGramatical: 'Subst. neutro', plural: 'die Regale', traducaoExata: 'estante', fraseModelo: 'Hier ist das Regal.', audio: 'das Regal' },
  { palavraAlema: 'die Kaffeemaschine', classeGramatical: 'Subst. fem.', plural: 'die Kaffeemaschinen', traducaoExata: 'cafeteira', fraseModelo: 'Eine neue Kaffeemaschine.', audio: 'die Kaffeemaschine' },
  { palavraAlema: 'der Bildschirm', classeGramatical: 'Subst. masc.', plural: 'die Bildschirme', traducaoExata: 'monitor / tela', fraseModelo: 'Der Bildschirm kostet 299 Euro.', audio: 'der Bildschirm' },
  { palavraAlema: 'die Bürolampe', classeGramatical: 'Subst. fem.', plural: 'die Bürolampen', traducaoExata: 'luminária de escritório', fraseModelo: 'Die Bürolampe kostet 34,99 Euro.', audio: 'die Bürolampe' },
  { palavraAlema: 'der Kopierer', classeGramatical: 'Subst. masc.', plural: 'die Kopierer', traducaoExata: 'copiadora', fraseModelo: 'Der Kopierer kostet 691 Euro.', audio: 'der Kopierer' },
  { palavraAlema: 'der Laptop', classeGramatical: 'Subst. masc.', plural: 'die Laptops', traducaoExata: 'laptop', fraseModelo: 'Der Laptop kostet 1299 Euro.', audio: 'der Laptop' },
  { palavraAlema: 'der Papierkorb', classeGramatical: 'Subst. masc.', plural: 'die Papierkörbe', traducaoExata: 'lixeira de escritório', fraseModelo: 'Der Papierkorb kostet 2,99 Euro.', audio: 'der Papierkorb' },
  { palavraAlema: 'der Scanner', classeGramatical: 'Subst. masc.', plural: 'die Scanner', traducaoExata: 'scanner', fraseModelo: 'Der Scanner kostet 140,59 Euro.', audio: 'der Scanner' },
  { palavraAlema: 'das Tablet', classeGramatical: 'Subst. neutro', plural: 'die Tablets', traducaoExata: 'tablet', fraseModelo: 'Das Tablet kostet 378 Euro.', audio: 'das Tablet' },
  { palavraAlema: 'funktionieren', classeGramatical: 'Verbo regular', plural: '-', traducaoExata: 'funcionar', fraseModelo: 'Der Drucker funktioniert nicht.', audio: 'funktionieren' },
  { palavraAlema: 'drucken', classeGramatical: 'Verbo regular', plural: '-', traducaoExata: 'imprimir', fraseModelo: 'Ich kann nicht drucken.', audio: 'drucken' },
  { palavraAlema: 'kaputt', classeGramatical: 'Adjetivo', plural: '-', traducaoExata: 'quebrado / enguiçado', fraseModelo: 'Der Drucker ist kaputt.', audio: 'kaputt' },
  { palavraAlema: 'unbequem', classeGramatical: 'Adjetivo', plural: '-', traducaoExata: 'desconfortável', fraseModelo: 'Mein Stuhl ist unbequem.', audio: 'unbequem' },
  { palavraAlema: 'telefonieren', classeGramatical: 'Verbo regular', plural: '-', traducaoExata: 'telefonar', fraseModelo: 'Ich kann nicht telefonieren.', audio: 'telefonieren' },
  { palavraAlema: 'sehen', classeGramatical: 'Verbo forte (e→ie)', plural: '-', traducaoExata: 'enxergar / ver', fraseModelo: 'Ich kann nicht sehen.', audio: 'sehen' },
  { palavraAlema: 'fahren', classeGramatical: 'Verbo forte (a→ä)', plural: '-', traducaoExata: 'dirigir / ir com transporte', fraseModelo: 'Ich kann nicht fahren.', audio: 'fahren' },
];

// 2.10 Registro Coloquial e Autêntico (Umgangssprache)
export const COLLOQUIAL_LESSON_4: ColloquialExpression[] = [
  { expressaoAlema: 'Na?', traducaoExata: 'E aí? / E então?', contexto: 'Saudação informal ultracomum entre colegas de escritório ou conhecidos.' },
  { expressaoAlema: "Wie geht's?", traducaoExata: 'Como vai?', contexto: 'Forma contraída e ágil de "Wie geht es dir / Ihnen?".' },
  { expressaoAlema: 'Was ist los?', traducaoExata: 'O que está pegando? / O que houve?', contexto: 'Pergunta quando algo parece errado ou fora do comum.' },
  { expressaoAlema: 'Kein Problem!', traducaoExata: 'Sem problemas! / Sem crise!', contexto: 'Reação imediata para tranquilizar alguém diante de um pedido ou imprevisto.' },
  { expressaoAlema: 'Alles klar!', traducaoExata: 'Tudo certo! / Combinado!', contexto: 'Confirmação rápida de entendimento mútuo.' },
  { expressaoAlema: 'Kaputt!', traducaoExata: 'Enguiçou! / Quebrou!', contexto: 'Expressão coloquial instantânea ao notar que uma máquina ou objeto parou.' },
  { expressaoAlema: 'Geht nicht!', traducaoExata: 'Não funciona! / Não dá!', contexto: 'Dito para algo inoperante ou quando uma ação não é viável.' },
  { expressaoAlema: "Mach's gut!", traducaoExata: 'Fique bem! / Se cuide!', contexto: 'Despedida informal e calorosa ao sair do escritório.' },
  { expressaoAlema: 'Bis später!', traducaoExata: 'Até mais tarde!', contexto: 'Despedida comum entre colegas que ainda se verão no mesmo dia.' },
  { expressaoAlema: 'Bis dann!', traducaoExata: 'Até logo! / Até lá!', contexto: 'Despedida casual com reencontro previsto.' },
];

// BLOCO 3: Resolução de Exercícios & Tradução Reversa

// 3.1 Ex A3: Wo sind die Sachen?
export const EXERCISE_A3_ITEMS = [
  { item: 'der Computer', dono: 'Peter Lindau', justificativa: 'Fica na escrivaninha de Peter Lindau.' },
  { item: 'der Drucker', dono: 'Rita Kalt', justificativa: 'Fica sob a estação de trabalho de Rita Kalt.' },
  { item: 'die Brille', dono: 'Peter Lindau', justificativa: 'Óculos de leitura pessoal de Peter.' },
  { item: 'der Stift', dono: 'Rita Kalt', justificativa: 'Caneta sobre a mesa de Rita.' },
  { item: 'der Schlüssel', dono: 'Peter Lindau', justificativa: 'Molho de chaves no bolso/mesa de Peter.' },
  { item: 'die Fotos', dono: 'Rita Kalt', justificativa: 'Porta-retratos familiares no móvel de Rita.' },
  { item: 'die Dokumente', dono: 'Peter Lindau', justificativa: 'Pastas de trabalho de Peter.' },
  { item: 'die Bücher', dono: 'Rita Kalt', justificativa: 'Obras de referência na estante de Rita.' },
  { item: 'der Schreibtisch', dono: 'Peter Lindau', justificativa: 'Mesa de trabalho de Peter.' },
  { item: 'die Lampe', dono: 'Rita Kalt', justificativa: 'Luminária de mesa de Rita.' },
  { item: 'die Kaffeemaschine', dono: 'Peter Lindau', justificativa: 'Cafeteira elétrica ao lado de Peter.' },
  { item: 'der Terminkalender', dono: 'Rita Kalt', justificativa: 'Agenda de compromissos gerencial de Rita.' },
  { item: 'das Telefon', dono: 'Peter Lindau', justificativa: 'Aparelho telefônico ramal de Peter.' },
  { item: 'die Tasse', dono: 'Rita Kalt', justificativa: 'Xícara de chá/café de Rita.' },
];

// 3.7 Ex A14: Abteilungen da Universidade
export const DEPARTMENTS_A14 = [
  { departamento: 'das Sekretariat', funcao: 'Informationen bekommen', traducao: 'Obter informações', idLetra: 'g' },
  { departamento: 'die Verwaltung', funcao: 'Rechnungen bezahlen', traducao: 'Pagar faturas / contas', idLetra: 'e' },
  { departamento: 'die Bibliothek', funcao: 'Zeitungen und Bücher lesen', traducao: 'Ler jornais e livros', idLetra: 'b' },
  { departamento: 'das Sprachenzentrum', funcao: 'Sprachen lernen, Sprachkurse besuchen', traducao: 'Aprender línguas, fazer cursos de idiomas', idLetra: 'f' },
  { departamento: 'die Kantine', funcao: 'etwas essen (Mitarbeiter)', traducao: 'Comer algo (para funcionários)', idLetra: 'h' },
  { departamento: 'die Mensa', funcao: 'etwas essen (Studenten)', traducao: 'Comer algo (restaurante universitário para estudantes)', idLetra: 'c' },
  { departamento: 'die Sporthalle', funcao: 'Volleyball oder Fußball spielen', traducao: 'Jogar vôlei ou futebol', idLetra: 'a' },
  { departamento: 'die Cafeteria', funcao: 'Kaffee trinken', traducao: 'Tomar café e lanchar', idLetra: 'd' },
];

// 3.8 Ex A15: Hier kann man ...
export const HIER_KANN_MAN_A15 = [
  { num: 0, frase: 'Das ist die Bibliothek. Hier kann man Bücher lesen.', traducao: 'Esta é a biblioteca. Aqui se pode ler livros.' },
  { num: 1, frase: 'Das ist die Cafeteria. Hier kann man Kaffee trinken.', traducao: 'Esta é a cafeteria. Aqui se pode tomar café.' },
  { num: 2, frase: 'Das ist die Sporthalle. Hier kann man Volleyball oder Fußball spielen.', traducao: 'Este é o ginásio de esportes. Aqui se pode jogar vôlei ou futebol.' },
  { num: 3, frase: 'Das ist das Sekretariat. Hier kann man Informationen bekommen.', traducao: 'Esta é a secretaria. Aqui se pode obter informações.' },
  { num: 4, frase: 'Das ist die Verwaltung. Hier kann man Rechnungen bezahlen.', traducao: 'Esta é a administração. Aqui se pode pagar contas/faturas.' },
  { num: 5, frase: 'Das ist das Sprachenzentrum. Hier kann man Sprachen lernen.', traducao: 'Este é o centro de línguas. Aqui se pode aprender idiomas.' },
  { num: 6, frase: 'Das ist die Mensa. Hier können die Studenten etwas essen.', traducao: 'Este é o restaurante universitário (RU). Aqui os estudantes podem comer algo.' },
  { num: 7, frase: 'Das ist die Kantine. Hier können die Mitarbeiter etwas essen.', traducao: 'Este é o refeitório. Aqui os colaboradores podem comer algo.' },
];

// 3.9 Ex A16: Posição dos Verbos
export const VERB_POSITION_A16 = [
  {
    original: 'hier – Studenten – können – etwas – essen',
    ordenada: 'Hier können Studenten etwas essen.',
    analise: 'Vorfeld: Hier | Pos. II: können | Sujeito (Pos. III): Studenten | Mittelfeld: etwas | Satzende: essen.',
  },
  {
    original: 'im Sekretariat – Informationen – bekommen – kann – man',
    ordenada: 'Im Sekretariat kann man Informationen bekommen.',
    analise: 'Vorfeld: Im Sekretariat | Pos. II: kann | Sujeito: man | Mittelfeld: Informationen | Satzende: bekommen.',
  },
  {
    original: 'ich – sehr gut – kann – kochen',
    ordenada: 'Ich kann sehr gut kochen.',
    analise: 'Vorfeld: Ich | Pos. II: kann | Mittelfeld: sehr gut | Satzende: kochen.',
  },
  {
    original: 'hier – Zeitung – lesen – kann – man',
    ordenada: 'Hier kann man Zeitung lesen.',
    analise: 'Vorfeld: Hier | Pos. II: kann | Sujeito: man | Mittelfeld: Zeitung | Satzende: lesen.',
  },
  {
    original: 'wir – Englisch – lernen – können – im Sprachenzentrum',
    ordenada: 'Wir können im Sprachenzentrum Englisch lernen.',
    analise: 'Vorfeld: Wir | Pos. II: können | Mittelfeld: im Sprachenzentrum Englisch | Satzende: lernen.',
  },
];

// 3.10 Ex A17: Combinações Verbo + Objeto
export const VERB_OBJECT_PAIRS_A17 = [
  { verbo: 'spielen', objeto: 'Fußball / Volleyball', traducao: 'jogar futebol / vôlei' },
  { verbo: 'bezahlen', objeto: 'Rechnungen', traducao: 'pagar faturas / contas' },
  { verbo: 'lesen', objeto: 'Bücher / Zeitungen', traducao: 'ler livros / jornais' },
  { verbo: 'lernen', objeto: 'Sprachen / Englisch', traducao: 'aprender línguas / inglês' },
  { verbo: 'bekommen', objeto: 'Informationen', traducao: 'obter informações' },
  { verbo: 'besuchen', objeto: 'Sprachkurse', traducao: 'fazer / frequentar cursos de idiomas' },
  { verbo: 'trinken', objeto: 'Kaffee / Bier', traducao: 'beber café / cerveja' },
  { verbo: 'schreiben', objeto: 'Texte / Briefe', traducao: 'escrever textos / cartas' },
];

// 3.11 Ex A18: Phonetik (Acento Tônico)
export const PHONETICS_ACCENT_A18 = {
  grundregel: [
    { termo: 'A-bend', nota: 'Acento na 1ª sílaba à esquerda' },
    { termo: 'Bü-cher', nota: 'Acento na 1ª sílaba' },
    { termo: 'Lam-pe', nota: 'Acento na 1ª sílaba' },
    { termo: 'Na-me', nota: 'Acento na 1ª sílaba' },
    { termo: 'Dru-cker', nota: 'Acento na 1ª sílaba' },
    { termo: 'Zei-tung', nota: 'Acento na 1ª sílaba' },
    { termo: 'se-hen', nota: 'Acento no radical verbal' },
    { termo: 'ar-bei-ten', nota: 'Acento na 1ª sílaba' },
    { termo: 'fah-ren', nota: 'Acento na 1ª sílaba' },
    { termo: 'schrei-ben', nota: 'Acento na 1ª sílaba' },
    { termo: 'hö-ren', nota: 'Acento na 1ª sílaba' },
  ],
  komposita: [
    { termo: 'Fuß-ball', nota: 'Palavra composta: o acento principal recai SEMPRE no 1º elemento determinador (Bestimmungswort).' },
    { termo: 'Bü-cher-re-gal', nota: 'Acento no 1º elemento (Bücher).' },
    { termo: 'Schreib-tisch', nota: 'Acento no 1º elemento (Schreib-).' },
    { termo: 'Bild-schirm', nota: 'Acento no 1º elemento (Bild-).' },
    { termo: 'Sprach-kur-se', nota: 'Acento no 1º elemento (Sprach-).' },
    { termo: 'Sport-hal-le', nota: 'Acento no 1º elemento (Sport-).' },
  ],
  fremdwoerter: [
    { termo: 'Bü-ro', nota: 'Estrangeirismo francês: acento na última sílaba (oxítono).' },
    { termo: 'Stu-dent', nota: 'Acento na última sílaba.' },
    { termo: 'Do-ku-ment', nota: 'Acento na última sílaba.' },
    { termo: 'Ter-min', nota: 'Acento na última sílaba.' },
    { termo: 'U-ni-ver-si-tät', nota: 'Sufixo latino -tät atrai o acento tônico.' },
    { termo: 'Bi-blio-thek', nota: 'Origem grega: acento na última sílaba.' },
  ],
};

// 3.12 Ex A19 & A20: Hobbies favoritos
export const HOBBIES_A19 = [
  { hobby: 'Freunde besuchen', traducao: 'visitar amigos' },
  { hobby: 'Auto fahren', traducao: 'dirigir carro' },
  { hobby: 'Fremdsprachen lernen', traducao: 'aprender línguas estrangeiras' },
  { hobby: 'wandern', traducao: 'fazer caminhadas na natureza' },
  { hobby: 'kochen', traducao: 'cozinhar' },
  { hobby: 'im Internet surfen', traducao: 'navegar na internet' },
  { hobby: 'lesen', traducao: 'ler' },
  { hobby: 'Bier trinken', traducao: 'beber cerveja' },
  { hobby: 'Musik hören', traducao: 'ouvir música' },
  { hobby: 'Sport machen', traducao: 'praticar esportes' },
  { hobby: 'fotografieren', traducao: 'fotografar' },
  { hobby: 'telefonieren', traducao: 'telefonar' },
];

// 3.13 Ex A21: Diálogos com "gern" vs "lieber"
export const DIALOGUES_PREFERENCE_A21 = [
  { pergunta: 'Fahren Sie gern Auto?', resposta: 'Nein, ich spiele lieber Fußball.', traducaoP: 'Você gosta de dirigir?', traducaoR: 'Não, prefiro jogar futebol.' },
  { pergunta: 'Lernen Sie gern Fremdsprachen?', resposta: 'Nein, ich fotografiere lieber schöne Landschaften.', traducaoP: 'Gosta de aprender idiomas?', traducaoR: 'Não, prefiro fotografar belas paisagens.' },
  { pergunta: 'Spielst du gern Volleyball?', resposta: 'Nein, ich spiele lieber ein Instrument.', traducaoP: 'Você gosta de jogar vôlei?', traducaoR: 'Não, prefiro tocar um instrumento.' },
  { pergunta: 'Singst du gern?', resposta: 'Nein, ich telefoniere lieber.', traducaoP: 'Você gosta de cantar?', traducaoR: 'Não, prefiro bater papo ao telefone.' },
  { pergunta: 'Wandert Ihre Tochter gern?', resposta: 'Nein, sie fährt lieber Auto.', traducaoP: 'Sua filha gosta de fazer trilhas?', traducaoR: 'Não, ela prefere andar de carro.' },
  { pergunta: 'Machst du gern Sport?', resposta: 'Nein, ich lese lieber Romane.', traducaoP: 'Você gosta de praticar esportes?', traducaoR: 'Não, prefiro ler romances.' },
  { pergunta: 'Hören Sie gern Musik?', resposta: 'Nein, ich surfe lieber im Internet.', traducaoP: 'Você gosta de ouvir música?', traducaoR: 'Não, prefiro navegar na internet.' },
  { pergunta: 'Kocht dein Vater gern?', resposta: 'Nein, er trinkt lieber Bier.', traducaoP: 'Seu pai gosta de cozinhar?', traducaoR: 'Não, ele prefere tomar cerveja.' },
  { pergunta: 'Reisen Sie gern?', resposta: 'Nein, ich arbeite lieber.', traducaoP: 'Você gosta de viajar?', traducaoR: 'Não, prefiro trabalhar.' },
  { pergunta: 'Besucht ihr gern Freunde?', resposta: 'Nein, wir lernen lieber Fremdsprachen.', traducaoP: 'Vocês gostam de visitar amigos?', traducaoR: 'Não, preferimos aprender línguas estrangeiras.' },
];

// 3.14 Ex A22: In der Cafeteria (Diálogo Completo)
export const TEXT_A22_DIALOGUE = [
  { speaker: 'Frau Herzberg', de: 'Was trinken Sie, Herr Heinemann?', pt: 'O que você bebe, Senhor Heinemann?' },
  { speaker: 'Herr Heinemann', de: 'Kaffee bitte.', pt: 'Café, por favor.' },
  { speaker: 'Frau Herzberg', de: 'Bitte sehr.', pt: 'Aqui está.' },
  { speaker: 'Herr Heinemann', de: 'Danke.', pt: 'Obrigado.' },
  { speaker: 'Frau Herzberg', de: 'Geht Ihr Drucker jetzt?', pt: 'Sua impressora funciona agora?' },
  { speaker: 'Herr Heinemann', de: 'Ja, er funktioniert, ich kann drucken.', pt: 'Sim, ela funciona, eu posso imprimir.' },
  { speaker: 'Frau Herzberg', de: 'Wie finden Sie Marburg, Herr Heinemann?', pt: 'Como você acha Marburg, Senhor Heinemann?' },
  { speaker: 'Herr Heinemann', de: 'Marburg ist eine schöne Stadt.', pt: 'Marburg é uma cidade bonita.' },
  { speaker: 'Frau Herzberg', de: 'Das finde ich auch. Was machen Sie am Wochenende?', pt: 'Eu também acho. O que você faz no fim de semana?' },
  { speaker: 'Herr Heinemann', de: 'Am Wochenende fahre ich nach München. Ich spiele dort im Universitätsorchester.', pt: 'No fim de semana eu vou para Munique. Eu toco na orquestra universitária lá.' },
  { speaker: 'Frau Herzberg', de: 'Wir haben auch ein Universitätsorchester hier. Welches Instrument spielen Sie?', pt: 'Nós também temos uma orquestra universitária aqui. Qual instrumento você toca?' },
  { speaker: 'Herr Heinemann', de: 'Klavier. Und Sie, Frau Herzberg? Spielen Sie ein Instrument?', pt: 'Piano. E você, Senhora Herzberg? Você toca um instrumento?' },
  { speaker: 'Frau Herzberg', de: 'Ich spiele ein bisschen Gitarre.', pt: 'Eu toco um pouco de violão/guitarra.' },
  { speaker: 'Herr Heinemann', de: 'Können Sie gut singen? Wir suchen noch eine Sängerin für unseren Chor.', pt: 'Você sabe cantar bem? Nós ainda procuramos uma cantora para nosso coro.' },
  { speaker: 'Frau Herzberg', de: 'Nein, ich kann nicht singen. Ich spiele gern Volleyball oder Fußball.', pt: 'Não, eu não sei cantar. Eu jogo vôlei ou futebol com prazer.' },
  { speaker: 'Herr Heinemann', de: 'Ich bin ein sehr schlechter Fußballspieler. Spielt Ihr Mann auch Fußball?', pt: 'Eu sou um jogador de futebol muito ruim. Seu marido também joga futebol?' },
  { speaker: 'Frau Herzberg', de: 'Natürlich. Mein Mann kommt aus England.', pt: 'Naturalmente. Meu marido vem da Inglaterra.' },
  { speaker: 'Herr Heinemann', de: 'Ach so. Und welche Sprache sprechen Sie zu Hause?', pt: 'Ah, entendi. E qual língua vocês falam em casa?' },
  { speaker: 'Frau Herzberg', de: 'Englisch und Deutsch. Sprechen Sie gut Englisch?', pt: 'Inglês e alemão. Você fala bem inglês?' },
  { speaker: 'Herr Heinemann', de: 'Ja, ich spreche Englisch, Französisch und ein bisschen Spanisch.', pt: 'Sim, eu falo inglês, francês e um pouco de espanhol.' },
  { speaker: 'Frau Herzberg', de: 'Das ist toll! So viele Sprachen!', pt: 'Isso é ótimo! Tantas línguas!' },
];

// 3.15 & 3.16 Tradução Reversa de Blindagem & Gabarito Comentado
export interface ReverseTranslationItem {
  id: number;
  pt: string;
  de: string;
  justificativa: string;
}

export const REVERSE_TRANSLATION_LESSON_4: ReverseTranslationItem[] = [
  {
    id: 1,
    pt: 'Bom dia. Procura algo? — Sim, meu escritório. Sou novo aqui.',
    de: 'Guten Tag. Suchen Sie etwas? — Ja, mein Büro. Ich bin neu hier.',
    justificativa: 'suchen na Pos. I (Ja-Nein-Frage formal); sein na 1ª sg. (bin) + adjetivo predicativo neu + advérbio hier.',
  },
  {
    id: 2,
    pt: 'Este é um quarto bonito! — Espero que tudo esteja aí.',
    de: 'Das ist ein schönes Zimmer! — Hoffentlich ist alles da.',
    justificativa: 'ein + schön + -es (neutro nominativo) + Zimmer; hoffentlich (advérbio no Vorfeld) + ist (V2) + alles + da.',
  },
  {
    id: 3,
    pt: 'Minha impressora não funciona. Eu não consigo imprimir.',
    de: 'Mein Drucker funktioniert nicht. Ich kann nicht drucken.',
    justificativa: 'funktionieren na 3ª sg. + nicht (negação verbal); modal können na 1ª sg. (kann) + Satzklammer com drucken no Satzende.',
  },
  {
    id: 4,
    pt: 'O computador também está quebrado? — Não, o computador funciona.',
    de: 'Ist der Computer auch kaputt? — Nein, der Computer funktioniert.',
    justificativa: 'sein na 3ª sg. (ist) no Vorfeld + der Computer + predicativo kaputt; resposta com der Computer funktioniert.',
  },
  {
    id: 5,
    pt: 'Quanto custa a cadeira de escritório? — A cadeira custa 30 euros.',
    de: 'Was kostet der Bürostuhl? — Der Bürostuhl kostet 30 Euro.',
    justificativa: 'kosten na 3ª sg. (kostet); numeral + Euro (invariável no singular/plural monetário).',
  },
  {
    id: 6,
    pt: '30 euros? Isso é barato! — Sim, ela é barata e moderna.',
    de: '30 Euro? Das ist billig! — Ja, er ist billig und modern.',
    justificativa: 'Bürostuhl é gramaticalmente masculino (der Bürostuhl), logo é retomado pelo pronome pessoal er (não sie!).',
  },
  {
    id: 7,
    pt: 'O que você bebe? — Café, por favor.',
    de: 'Was trinken Sie? — Kaffee, bitte.',
    justificativa: 'W-Frage com trinken na forma de tratamento formal (Sie). Substantivo alimentar Kaffee sem artigo.',
  },
  {
    id: 8,
    pt: 'Como você acha Marburg? — Marburg é uma cidade bonita.',
    de: 'Wie finden Sie Marburg? — Marburg ist eine schöne Stadt.',
    justificativa: 'finden usado no sentido de achar/opinar; grupo nominal feminino: eine + schön + -e + Stadt.',
  },
  {
    id: 9,
    pt: 'Qual instrumento você toca? — Piano.',
    de: 'Welches Instrument spielen Sie? — Klavier.',
    justificativa: 'Welches (pronome interrogativo concordando com o neutro Instrument); instrumento musical direto sem artigo.',
  },
  {
    id: 10,
    pt: 'Você sabe cantar bem? — Não, eu não sei cantar.',
    de: 'Können Sie gut singen? — Nein, ich kann nicht singen.',
    justificativa: 'Können expressando capacidade/habilidade na Pos. I; resposta negativa com ich kann + nicht + singen (infinitivo no Satzende).',
  },
];

// 3.17 Resumo dos Pontos-Chave do Dia 004
export const KEY_POINTS_LESSON_4: KeyPoint[] = [
  {
    numero: 1,
    conceito: 'Gênero dos Substantivos & Sufixos',
    regra: 'Sufixos fixam o gênero: -ung, -heit, -keit, -schaft, -in, -ion, -tät (die); -er de agente, -ling, -ismus, -or (der); -chen, -lein, -ment, -um (das).',
  },
  {
    numero: 2,
    conceito: 'Conjugação do Modalverb können',
    regra: 'ich kann, du kannst, er/sie/es/man kann, wir können, ihr könnt, sie/Sie können. A 1ª e a 3ª pessoas do singular são rigorosamente IDÊNTICAS e sem -t.',
  },
  {
    numero: 3,
    conceito: 'A Satzklammer (Pinça Oracional)',
    regra: 'O verbo modal conjugado fica fixo na Posição II e o infinitivo principal é empurrado compulsoriamente para o Satzende (final absoluto da oração).',
  },
  {
    numero: 4,
    conceito: 'Negação com nicht',
    regra: 'nega verbos, adjetivos, advérbios e predicados inteiros (Ich singe nicht; Ich kann nicht kommen).',
  },
  {
    numero: 5,
    conceito: 'Negação com kein',
    regra: 'nega substantivos introduzidos por artigo indefinido (ein/eine) ou sem artigo (Ich habe keinen Drucker; Ich habe keine Zeit).',
  },
  {
    numero: 6,
    conceito: 'Adjetivo Predicativo',
    regra: 'Quando o adjetivo sucede o verbo sein (à direita), NÃO recebe nenhuma terminação ou desinência (Der Drucker ist neu; Das Zimmer ist schön).',
  },
  {
    numero: 7,
    conceito: 'Adjetivo Atributivo (Nominativo ein/kein)',
    regra: 'Quando antecede o substantivo: Masculino (-er: ein neuer Drucker), Feminino (-e: eine alte Lampe), Neutro (-es: ein kleines Problem), Plural (-en: keine neuen Bücher).',
  },
  {
    numero: 8,
    conceito: 'Antônimos Essenciais',
    regra: 'Dominar os 9 pares fundamentais: neu/alt, schön/hässlich, modern/unmodern, bequem/unbequem, klein/groß, teuer/billig, praktisch/unpraktisch, interessant/langweilig, hell/dunkel.',
  },
  {
    numero: 9,
    conceito: 'Preposições Locais Básicas',
    regra: 'aus (origem/país), in (localização estática/onde), bei (empresa ou junto a alguém), nach (direção/destino geográfico sem artigo). Todas regem Dativo.',
  },
  {
    numero: 10,
    conceito: 'Acento Tônico (Wortakzent)',
    regra: 'Regra geral alemã e palavras compostas: acento à esquerda (1º elemento). Estrangeirismos (Büro, Student, Dokument, Universität): acento à direita.',
  },
];
