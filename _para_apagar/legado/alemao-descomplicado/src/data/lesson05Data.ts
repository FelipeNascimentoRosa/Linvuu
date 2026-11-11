export const LESSON_05_METADATA = {
  round: 'RODADA 05',
  day: 'DIA 005 DO CRONOGRAMA',
  chapter: 'KAPITEL 2, TEIL B, C e D (p. 47–56)',
  title: 'Preposições Locais (aus, in, bei, nach), Verbos com Alternância (fahren, nehmen, essen), Freizeitaktivitäten, Nomengruppe, Negação Rígida e Agenda Semanal (Wochentage)',
  nextRound: 'RODADA 06 — DIA 006 (Kapitel 3: Ein Tag im Leben / Rotina, Horários, Verbos Separáveis e Preposições Temporais).',
};

// 1.1 Preposições Locais - Sistema Completo
export interface LocalPrepositionFull {
  prep: string;
  caso: string;
  pergunta: string;
  uso: string;
  exemplo: string;
  traducao: string;
}

export const LOCAL_PREPOSITIONS_FULL: LocalPrepositionFull[] = [
  {
    prep: 'aus',
    caso: 'Dativ',
    pergunta: 'Woher? (De onde?)',
    uso: 'Origem geográfica / procedência',
    exemplo: 'Ich komme aus Italien.',
    traducao: 'Eu venho da Itália.',
  },
  {
    prep: 'in',
    caso: 'Dativ',
    pergunta: 'Wo? (Onde?)',
    uso: 'Lugar estático (onde se está)',
    exemplo: 'Ich wohne in Berlin.',
    traducao: 'Eu moro em Berlim.',
  },
  {
    prep: 'bei',
    caso: 'Dativ',
    pergunta: 'Wo? (Onde / com quem?)',
    uso: 'Na empresa de / com / junto a alguém',
    exemplo: 'Ich arbeite bei Siemens.',
    traducao: 'Eu trabalho na Siemens.',
  },
  {
    prep: 'nach',
    caso: 'Dativ',
    pergunta: 'Wohin? (Para onde?)',
    uso: 'Direção para cidades e países sem artigo',
    exemplo: 'Ich fahre nach Italien.',
    traducao: 'Eu vou para a Itália.',
  },
];

export const IN_VS_NACH_COMPARISON = [
  {
    contexto: 'Cidade (lugar estático)',
    preposicao: 'in + Dativ',
    exemplo: 'Ich wohne in Berlin.',
    traducao: 'Eu moro em Berlim.',
  },
  {
    contexto: 'Cidade (direção / deslocamento)',
    preposicao: 'nach + Dativ',
    exemplo: 'Ich fahre nach Berlin.',
    traducao: 'Eu vou para Berlim.',
  },
  {
    contexto: 'País sem artigo (lugar estático)',
    preposicao: 'in + Dativ',
    exemplo: 'Ich wohne in Italien.',
    traducao: 'Eu moro na Itália.',
  },
  {
    contexto: 'País sem artigo (direção)',
    preposicao: 'nach + Dativ',
    exemplo: 'Ich fahre nach Italien.',
    traducao: 'Eu vou para a Itália.',
  },
  {
    contexto: 'País feminino com artigo (lugar estático)',
    preposicao: 'in + Dativ (der)',
    exemplo: 'Ich wohne in der Schweiz.',
    traducao: 'Eu moro na Suíça.',
  },
  {
    contexto: 'País feminino com artigo (direção)',
    preposicao: 'in + Akkusativ (die)',
    exemplo: 'Ich fahre in die Schweiz.',
    traducao: 'Eu vou para a Suíça.',
  },
];

export const PREPOSITION_CONTRACTIONS = [
  { prepArtigo: 'in + dem', contracao: 'im', exemplo: 'Ich wohne im Zentrum.', traducao: 'Eu moro no centro.' },
  { prepArtigo: 'in + das', contracao: 'ins', exemplo: 'Ich gehe ins Kino.', traducao: 'Eu vou ao cinema.' },
  { prepArtigo: 'an + dem', contracao: 'am', exemplo: 'Ich wohne am Stadtrand.', traducao: 'Eu moro nos arredores.' },
  { prepArtigo: 'an + das', contracao: 'ans', exemplo: 'Ich gehe ans Meer.', traducao: 'Eu vou ao mar.' },
  { prepArtigo: 'bei + dem', contracao: 'beim', exemplo: 'Ich arbeite beim Arzt.', traducao: 'Eu trabalho com o médico.' },
  { prepArtigo: 'von + dem', contracao: 'vom', exemplo: 'Ich komme vom Bahnhof.', traducao: 'Eu venho da estação.' },
  { prepArtigo: 'zu + dem', contracao: 'zum', exemplo: 'Ich gehe zum Arzt.', traducao: 'Eu vou ao médico.' },
  { prepArtigo: 'zu + der', contracao: 'zur', exemplo: 'Ich gehe zur Post.', traducao: 'Eu vou aos correios.' },
];

// 1.2 Verbo fahren
export const FAHREN_CONJUGATION = [
  { pronome: 'ich', forma: 'fahre', observacao: 'Radical normal (sem trema)' },
  { pronome: 'du', forma: 'fährst', observacao: 'Alternância a → ä + desinência -st' },
  { pronome: 'er / sie / es / man', forma: 'fährt', observacao: 'Alternância a → ä + desinência -t' },
  { pronome: 'wir', forma: 'fahren', observacao: 'Radical normal (infinitivo)' },
  { pronome: 'ihr', forma: 'fahrt', observacao: 'Radical normal + desinência -t' },
  { pronome: 'sie / Sie', forma: 'fahren', observacao: 'Radical normal (infinitivo)' },
];

export const OTHER_A_TO_AE_VERBS = [
  { infinitivo: 'fahren', du: 'fährst', er: 'fährt', traducao: 'dirigir / ir com transporte' },
  { infinitivo: 'schlafen', du: 'schläfst', er: 'schläft', traducao: 'dormir' },
  { infinitivo: 'tragen', du: 'trägst', er: 'trägt', traducao: 'carregar / vestir' },
  { infinitivo: 'waschen', du: 'wäschst', er: 'wäscht', traducao: 'lavar' },
  { infinitivo: 'lassen', du: 'lässt', er: 'lässt', traducao: 'deixar / permitir' },
  { infinitivo: 'fangen', du: 'fängst', er: 'fängt', traducao: 'pegar / capturar' },
  { infinitivo: 'halten', du: 'hältst', er: 'hält', traducao: 'parar / segurar' },
  { infinitivo: 'raten', du: 'rätst', er: 'rät', traducao: 'aconselhar / adivinhar' },
];

// 1.3 Verbo nehmen
export const NEHMEN_CONJUGATION = [
  { pronome: 'ich', forma: 'nehme', observacao: 'Radical normal' },
  { pronome: 'du', forma: 'nimmst', observacao: 'Dupla irregularidade: e → i + dobra de consoante (mm)' },
  { pronome: 'er / sie / es / man', forma: 'nimmt', observacao: 'Dupla irregularidade: e → i + dobra de consoante (mm)' },
  { pronome: 'wir', forma: 'nehmen', observacao: 'Radical normal' },
  { pronome: 'ihr', forma: 'nehmt', observacao: 'Radical normal' },
  { pronome: 'sie / Sie', forma: 'nehmen', observacao: 'Radical normal' },
];

export const DOUBLE_CONSONANT_CHANGE_VERBS = [
  { infinitivo: 'nehmen', du: 'nimmst', er: 'nimmt', traducao: 'pegar / tomar' },
  { infinitivo: 'treffen', du: 'triffst', er: 'trifft', traducao: 'encontrar' },
  { infinitivo: 'essen', du: 'isst', er: 'isst', traducao: 'comer' },
  { infinitivo: 'vergessen', du: 'vergisst', er: 'vergisst', traducao: 'esquecer' },
];

// 1.4 Verbo essen
export const ESSEN_CONJUGATION = [
  { pronome: 'ich', forma: 'esse', observacao: 'Radical normal' },
  { pronome: 'du', forma: 'isst', observacao: 'e → i + sibilante (-st funde com -ss)' },
  { pronome: 'er / sie / es / man', forma: 'isst', observacao: 'e → i + -t (idêntico a du isst!)' },
  { pronome: 'wir', forma: 'essen', observacao: 'Radical normal' },
  { pronome: 'ihr', forma: 'esst', observacao: 'Radical normal' },
  { pronome: 'sie / Sie', forma: 'essen', observacao: 'Radical normal' },
];

// 1.5 Verbos com e -> ie / i
export const E_TO_IE_I_VERBS = [
  { infinitivo: 'lesen', tipo: 'e → ie', du: 'liest', er: 'liest', traducao: 'ler (sibilante: du = er)' },
  { infinitivo: 'sehen', tipo: 'e → ie', du: 'siehst', er: 'sieht', traducao: 'ver / enxergar' },
  { infinitivo: 'sprechen', tipo: 'e → i', du: 'sprichst', er: 'spricht', traducao: 'falar' },
  { infinitivo: 'geben', tipo: 'e → i', du: 'gibst', er: 'gibt', traducao: 'dar (es gibt = há)' },
  { infinitivo: 'helfen', tipo: 'e → i', du: 'hilfst', er: 'hilft', traducao: 'ajudar (+ Dativ)' },
  { infinitivo: 'treffen', tipo: 'e → i', du: 'triffst', er: 'trifft', traducao: 'encontrar' },
  { infinitivo: 'werfen', tipo: 'e → i', du: 'wirfst', er: 'wirft', traducao: 'jogar / arremessar' },
  { infinitivo: 'sterben', tipo: 'e → i', du: 'stirbst', er: 'stirbt', traducao: 'morrer' },
];

// 1.6 Verbo wissen
export const WISSEN_CONJUGATION = [
  { pronome: 'ich', forma: 'weiß', observacao: '1ª e 3ª pessoas singulares idênticas e sem -t' },
  { pronome: 'du', forma: 'weißt', observacao: 'Vogal alternada ei + terminação sibilante -t' },
  { pronome: 'er / sie / es / man', forma: 'weiß', observacao: 'Idêntico a ich weiß' },
  { pronome: 'wir', forma: 'wissen', observacao: 'Plural regular com radical wissen' },
  { pronome: 'ihr', forma: 'wisst', observacao: 'Plural com radical wisst' },
  { pronome: 'sie / Sie', forma: 'wissen', observacao: 'Plural regular com radical wissen' },
];

export const WISSEN_VS_KENNEN_KOENNEN = [
  { verbo: 'wissen', uso: 'Saber fatos e dados intelectuais', exemplo: 'Ich weiß die Antwort.', traducao: 'Eu sei a resposta.' },
  { verbo: 'kennen', uso: 'Conhecer pessoas, obras ou lugares por vivência', exemplo: 'Ich kenne Berlin.', traducao: 'Eu conheço Berlim.' },
  { verbo: 'können', uso: 'Saber fazer algo (habilidade / capacidade física)', exemplo: 'Ich kann schwimmen.', traducao: 'Eu sei nadar.' },
];

// 1.7 Verbo mögen
export const MOEGEN_CONJUGATION = [
  { pronome: 'ich', forma: 'mag', observacao: '1ª e 3ª pessoas singulares idênticas (perde o trema)' },
  { pronome: 'du', forma: 'magst', observacao: 'Radical sem trema mag + terminação -st' },
  { pronome: 'er / sie / es / man', forma: 'mag', observacao: 'Idêntico a ich mag' },
  { pronome: 'wir', forma: 'mögen', observacao: 'Plural retém o trema original' },
  { pronome: 'ihr', forma: 'mögt', observacao: 'Plural retém o trema original' },
  { pronome: 'sie / Sie', forma: 'mögen', observacao: 'Plural retém o trema original' },
];

// 1.8 Negação nicht vs kein
export const NEGATION_FULL_RULES = [
  {
    particula: 'nicht',
    uso: 'Verbos simples, verbos modais, adjetivos, advérbios, orações',
    exemplo: 'Ich arbeite nicht. / Ich kann nicht kommen.',
    traducao: 'Eu não trabalho. / Eu não posso vir.',
  },
  {
    particula: 'kein / keine / kein',
    uso: 'Substantivos antecedidos de artigo indefinido (ein) ou sem artigo (Nullartikel)',
    exemplo: 'Ich habe keinen Drucker. / Ich habe keine Zeit.',
    traducao: 'Eu não tenho impressora. / Não tenho tempo.',
  },
  {
    particula: 'nicht + artigo definido',
    uso: 'Substantivos determinados com artigo definido (der/die/das)',
    exemplo: 'Das ist nicht der Lehrer.',
    traducao: 'Esse não é o professor.',
  },
  {
    particula: 'nicht + possessivo',
    uso: 'Substantivos determinados com pronome possessivo (mein, dein, etc.)',
    exemplo: 'Das ist nicht mein Buch.',
    traducao: 'Esse não é meu livro.',
  },
];

export const NICHT_POSITIONS = [
  { tipo: 'Verbo simples conjugado', posicao: 'Após o verbo (final do núcleo verbal)', exemplo: 'Ich arbeite nicht.' },
  { tipo: 'Verbo modal + infinitivo', posicao: 'Antes do infinitivo no Satzende', exemplo: 'Ich kann nicht kommen.' },
  { tipo: 'Adjetivo predicativo', posicao: 'Imediatamente antes do adjetivo', exemplo: 'Ich bin nicht müde.' },
  { tipo: 'Advérbio temporal/modal', posicao: 'Imediatamente antes do advérbio focalizado', exemplo: 'Ich komme nicht heute.' },
  { tipo: 'Oração inteira', posicao: 'Antes do final da oração (Satzende)', exemplo: 'Ich arbeite heute nicht.' },
];

// 1.9 Verbos em -t / -d
export const D_T_STEM_VERBS = [
  { infinitivo: 'arbeiten', du: 'arbeitest', er: 'arbeitet', traducao: 'trabalhar' },
  { infinitivo: 'finden', du: 'findest', er: 'findet', traducao: 'achar / encontrar' },
  { infinitivo: 'reden', du: 'redest', er: 'redet', traducao: 'conversar / falar' },
  { infinitivo: 'warten', du: 'wartest', er: 'wartet', traducao: 'esperar' },
  { infinitivo: 'baden', du: 'badest', er: 'badet', traducao: 'tomar banho' },
  { infinitivo: 'bilden', du: 'bildest', er: 'bildet', traducao: 'formar / construir' },
];

// 1.10 Verbo tanzen (sibilante em -z)
export const TANZEN_CONJUGATION = [
  { pronome: 'ich', forma: 'tanze' },
  { pronome: 'du', forma: 'tanzt' },
  { pronome: 'er / sie / es / man', forma: 'tanzt' },
  { pronome: 'wir', forma: 'tanzen' },
  { pronome: 'ihr', forma: 'tanzt' },
  { pronome: 'sie / Sie', forma: 'tanzen' },
];

// 2.1 Texto B1 - Estatísticas Austríacas
export interface AustrianStat {
  atividade: string;
  traducao: string;
  porcentagem: number;
}

export const TEXT_B1_STATS: AustrianStat[] = [
  { atividade: 'Filme, Serien oder Shows sehen', traducao: 'ver filmes, séries ou shows', porcentagem: 87 },
  { atividade: 'mit dem Handy telefonieren', traducao: 'telefonar com o celular', porcentagem: 87 },
  { atividade: 'Radio hören', traducao: 'ouvir rádio', porcentagem: 77 },
  { atividade: 'Zeitungen und Zeitschriften lesen', traducao: 'ler jornais e revistas', porcentagem: 61 },
  { atividade: 'im Internet surfen', traducao: 'navegar na internet', porcentagem: 51 },
  { atividade: 'Computerspiele spielen', traducao: 'jogar jogos no computador', porcentagem: 50 },
  { atividade: 'E-Mails schreiben', traducao: 'escrever e-mails', porcentagem: 47 },
  { atividade: 'Sport machen', traducao: 'praticar esportes', porcentagem: 30 },
  { atividade: 'Bücher lesen', traducao: 'ler livros', porcentagem: 29 },
  { atividade: 'Musik hören', traducao: 'ouvir música', porcentagem: 29 },
  { atividade: 'Freunde besuchen', traducao: 'visitar amigos', porcentagem: 27 },
  { atividade: 'shoppen', traducao: 'fazer compras', porcentagem: 26 },
  { atividade: 'kochen', traducao: 'cozinhar', porcentagem: 23 },
  { atividade: 'im Garten arbeiten', traducao: 'trabalhar no jardim', porcentagem: 23 },
  { atividade: 'etwas lernen (z. B. eine Sprache)', traducao: 'aprender algo (ex. um idioma)', porcentagem: 14 },
  { atividade: 'singen / ein Instrument spielen', traducao: 'cantar / tocar um instrumento', porcentagem: 8 },
];

// 2.2 Texto B2 - Schweiz
export const TEXT_B2_EXERCISE = [
  { num: 1, verbo: 'spielen', frase: 'Auch die Schweizer sehen in ihrer Freizeit gern Filme oder spielen zu Hause Computerspiele.', traducao: 'Também os suíços veem filmes com prazer em seu tempo livre ou jogam jogos de computador em casa.' },
  { num: 2, verbo: 'telefonieren', frase: 'Viele Schweizer telefonieren oft mit ihrem Handy...', traducao: 'Muitos suíços telefonam frequentemente com seu telefone celular...' },
  { num: 3, verbo: 'surfen', frase: '...oder surfen im Internet.', traducao: '...ou navegam na internet.' },
  { num: 4, verbo: 'wandern', frase: 'Die Schweizer sind gern aktiv: Sie wandern viel...', traducao: 'Os suíços gostam de ser ativos: eles caminham bastante...' },
  { num: 5, verbo: 'machen', frase: '...und machen Sport.', traducao: '...e praticam esportes.' },
  { num: 6, verbo: 'besuchen', frase: 'Freunde besuchen...', traducao: 'Visitar amigos...' },
  { num: 7, verbo: 'hören', frase: '...Radio hören...', traducao: '...ouvir rádio...' },
  { num: 8, verbo: 'lesen', frase: '...und Bücher lesen sind ebenfalls beliebte Freizeitaktivitäten.', traducao: '...e ler livros são igualmente atividades de lazer muito apreciadas.' },
];

// 2.3 Texto C1 - Grupo Nominal
export const NOMENGROPPE_C1 = [
  { caso: 'Nominativ (Definit)', masc: 'der Computer', fem: 'die Lampe', neutro: 'das Telefon', plural: 'die Bücher' },
  { caso: 'Nominativ (Indefinit)', masc: 'ein Computer', fem: 'eine Lampe', neutro: 'ein Telefon', plural: 'keine Bücher' },
  { caso: 'Nominativ + Adjektiv', masc: 'ein neuer Computer (-er)', fem: 'eine neue Lampe (-e)', neutro: 'ein neues Telefon (-es)', plural: 'keine neuen Bücher (-en)' },
];

// 2.4 Texto C2 - 15 Frases com Adjetivos Atributivos
export const TEXT_C2_SENTENCES = [
  { num: 0, substantivo: 'das Büro (neutro)', frase: 'Das ist ein modernes Büro.', desinencia: '-es', traducao: 'Este é um escritório moderno.' },
  { num: 1, substantivo: 'das Telefon (neutro)', frase: 'Das ist ein neues Telefon.', desinencia: '-es', traducao: 'Este é um telefone novo.' },
  { num: 2, substantivo: 'die Kantine (fem.)', frase: 'Das ist eine schöne Kantine.', desinencia: '-e', traducao: 'Esta é uma cantina bonita.' },
  { num: 3, substantivo: 'die Kaffeemaschine (fem.)', frase: 'Das ist eine praktische Kaffeemaschine.', desinencia: '-e', traducao: 'Esta é uma máquina de café prática.' },
  { num: 4, substantivo: 'die Bibliothek (fem.)', frase: 'Das ist eine interessante Bibliothek.', desinencia: '-e', traducao: 'Esta é uma biblioteca interessante.' },
  { num: 5, substantivo: 'das Buch (neutro)', frase: 'Das ist ein langweiliges Buch.', desinencia: '-es', traducao: 'Este é um livro entediante.' },
  { num: 6, substantivo: 'der Bildschirm (masc.)', frase: 'Das ist ein moderner Bildschirm.', desinencia: '-er', traducao: 'Este é um monitor moderno.' },
  { num: 7, substantivo: 'die Lampe (fem.)', frase: 'Das ist eine helle Lampe.', desinencia: '-e', traducao: 'Esta é uma lâmpada clara/luminosa.' },
  { num: 8, substantivo: 'der Stuhl (masc.)', frase: 'Das ist ein bequemer Stuhl.', desinencia: '-er', traducao: 'Esta é uma cadeira confortável.' },
  { num: 9, substantivo: 'die Uhr (fem.)', frase: 'Das ist eine alte Uhr.', desinencia: '-e', traducao: 'Este é um relógio antigo.' },
  { num: 10, substantivo: 'das Regal (neutro)', frase: 'Das ist ein preiswertes Regal.', desinencia: '-es', traducao: 'Esta é uma estante de bom preço.' },
  { num: 11, substantivo: 'das Bild (neutro)', frase: 'Das ist ein hässliches Bild.', desinencia: '-es', traducao: 'Este é um quadro feio.' },
  { num: 12, substantivo: 'der Stift (masc.)', frase: 'Das ist ein neuer Stift.', desinencia: '-er', traducao: 'Esta é uma caneta nova.' },
  { num: 13, substantivo: 'das Handy (neutro)', frase: 'Das ist ein modernes Handy.', desinencia: '-es', traducao: 'Este é um celular moderno.' },
  { num: 14, substantivo: 'das Problem (neutro)', frase: 'Das ist ein kleines Problem.', desinencia: '-es', traducao: 'Este é um problema pequeno.' },
];

// 2.5 Texto C3 - Frau Sommer vs Herr Winter
export const TEXT_C3_COMPARISON = [
  { item: 'Kaffee', sommer: 'Der Kaffee ist warm.', winter: 'Der Kaffee ist kalt.' },
  { item: 'Computer', sommer: 'Der Computer ist neu.', winter: 'Der Computer ist alt.' },
  { item: 'Lampe', sommer: 'Die Lampe ist schön.', winter: 'Die Lampe ist hässlich.' },
  { item: 'Sprachkurs', sommer: 'Der Sprachkurs ist interessant.', winter: 'Der Sprachkurs ist langweilig.' },
  { item: 'Büro (Größe)', sommer: 'Das Büro ist groß.', winter: 'Das Büro ist klein.' },
  { item: 'Schreibtisch', sommer: 'Der Schreibtisch ist modern.', winter: 'Der Schreibtisch ist unmodern.' },
  { item: 'Büro (Licht)', sommer: 'Das Büro ist hell.', winter: 'Das Büro ist dunkel.' },
  { item: 'Stuhl', sommer: 'Der Stuhl ist bequem.', winter: 'Der Stuhl ist unbequem.' },
];

// 2.6 Texto C4 - Possessivartikel
export const TEXT_C4_POSSESSIVE = [
  { grupo: 'Buch (neutro)', exemplos: ['du: Ist das dein Buch?', 'er: Ist das sein Buch?', 'sie: Ist das ihr Buch?', 'wir: Ist das unser Buch?', 'Sie: Ist das Ihr Buch?'] },
  { grupo: 'Drucker (masculino)', exemplos: ['du: Dein Drucker geht nicht.', 'Sie: Ihr Drucker geht nicht.', 'wir: Unser Drucker geht nicht.', 'ihr: Euer Drucker geht nicht.'] },
  { grupo: 'Freundin Maria (feminino)', exemplos: ['er: Das ist seine Freundin Maria.', 'sie: Das ist ihre Freundin Maria.', 'wir: Das ist unsere Freundin Maria.'] },
  { grupo: 'Bruder (masculino)', exemplos: ['er: Sein Bruder ist Arzt.', 'sie: Ihr Bruder ist Arzt.', 'wir: Unser Bruder ist Arzt.'] },
  { grupo: 'Kinder (plural)', exemplos: ['er: Seine Kinder spielen sehr gut Violine.'] },
];

// 2.7 Texto C5 - Informal vs Formal
export const TEXT_C5_PAIRS = [
  { informell: 'Ist das dein Stift?', formell: 'Ist das Ihr Stift?' },
  { informell: 'Sind das eure Bücher?', formell: 'Sind das Ihre Bücher?' },
  { informell: 'Ist das dein Büro?', formell: 'Ist das Ihr Büro?' },
  { informell: 'Ist das deine Brille?', formell: 'Ist das Ihre Brille?' },
  { informell: 'Ist das dein Auto?', formell: 'Ist das Ihr Auto?' },
  { informell: 'Ist das dein Drucker?', formell: 'Ist das Ihr Drucker?' },
  { informell: 'Ist das dein Laptop?', formell: 'Ist das Ihr Laptop?' },
  { informell: 'Ist das dein Schreibtisch?', formell: 'Ist das Ihr Schreibtisch?' },
];

// 2.8 Texto C6 - er, sie, es
export const TEXT_C6_ITEMS = [
  { num: 0, pergunta: 'Ist das Büro groß?', resposta: 'Nein, es ist klein.', pronome: 'es', substantivo: 'das Büro (neutro)' },
  { num: 1, pergunta: 'Ist das dein neuer Computer?', resposta: 'Ja, aber er funktioniert nicht.', pronome: 'er', substantivo: 'der Computer (masc.)' },
  { num: 2, pergunta: 'Ist das dein Stift?', resposta: 'Ja, aber er schreibt nicht.', pronome: 'er', substantivo: 'der Stift (masc.)' },
  { num: 3, pergunta: 'Funktioniert dein Telefon?', resposta: 'Nein, es ist kaputt.', pronome: 'es', substantivo: 'das Telefon (neutro)' },
  { num: 4, pergunta: 'Sind die Lampen kaputt?', resposta: 'Nein, sie gehen.', pronome: 'sie', substantivo: 'die Lampen (plural)' },
  { num: 5, pergunta: 'Geht deine Uhr?', resposta: 'Ja, sie funktioniert gut.', pronome: 'sie', substantivo: 'die Uhr (fem.)' },
  { num: 6, pergunta: 'Ist das dein Auto?', resposta: 'Ja, aber es fährt nicht.', pronome: 'es', substantivo: 'das Auto (neutro)' },
  { num: 7, pergunta: 'Ist dein Schreibtisch neu?', resposta: 'Ja, er ist neu.', pronome: 'er', substantivo: 'der Schreibtisch (masc.)' },
  { num: 8, pergunta: 'Ist das Buch spannend?', resposta: 'Nein, es ist langweilig.', pronome: 'es', substantivo: 'das Buch (neutro)' },
];

// 2.9 Texto C7 - Perguntas com können e natürlich
export const TEXT_C7_PAIRS = [
  { pergunta: 'Kannst du tanzen?', resposta: 'Natürlich kann ich tanzen.' },
  { pergunta: 'Können Sie Gitarre spielen?', resposta: 'Natürlich kann ich Gitarre spielen.' },
  { pergunta: 'Kannst du Auto fahren?', resposta: 'Natürlich kann ich Auto fahren.' },
  { pergunta: 'Könnt ihr Fußball spielen?', resposta: 'Natürlich können wir Fußball spielen.' },
  { pergunta: 'Können Sie kochen?', resposta: 'Natürlich kann ich kochen.' },
  { pergunta: 'Kannst du Klavier spielen?', resposta: 'Natürlich kann ich Klavier spielen.' },
  { pergunta: 'Können Sie hier gut arbeiten?', resposta: 'Natürlich kann ich hier gut arbeiten.' },
  { pergunta: 'Kannst du Englisch sprechen?', resposta: 'Natürlich kann ich Englisch sprechen.' },
  { pergunta: 'Könnt ihr gut singen?', resposta: 'Natürlich können wir gut singen.' },
  { pergunta: 'Kann ich hier Kaffee trinken?', resposta: 'Natürlich können Sie hier Kaffee trinken.' },
];

// 2.10 Texto C8 - Preenchimento de können
export const TEXT_C8_ITEMS = [
  { frase: 'Kannst du Schach spielen?', lacuna: 'kannst (du)' },
  { frase: 'Könnt ihr kochen?', lacuna: 'könnt (ihr)' },
  { frase: 'Kannst du Bulgarisch sprechen?', lacuna: 'kannst (du)' },
  { frase: 'Wo kann man Kaffee trinken?', lacuna: 'kann (man)' },
  { frase: 'Könnt ihr Ski fahren?', lacuna: 'könnt (ihr)' },
  { frase: 'Ich kann nicht singen.', lacuna: 'kann (ich)' },
  { frase: 'Wir können nicht nach Berlin fahren.', lacuna: 'können (wir)' },
];

// 2.11 Texto C9 - Tabela Completa de 5 Verbos
export const TEXT_C9_TABLE = [
  { pessoa: 'ich', fahren: 'fahre', tanzen: 'tanze', lesen: 'lese', wandern: 'wandere', fotografieren: 'fotografiere' },
  { pessoa: 'du', fahren: 'fährst', tanzen: 'tanzt', lesen: 'liest', wandern: 'wanderst', fotografieren: 'fotografierst' },
  { pessoa: 'er / sie / es / man', fahren: 'fährt', tanzen: 'tanzt', lesen: 'liest', wandern: 'wandert', fotografieren: 'fotografiert' },
  { pessoa: 'wir', fahren: 'fahren', tanzen: 'tanzen', lesen: 'lesen', wandern: 'wandern', fotografieren: 'fotografieren' },
  { pessoa: 'ihr', fahren: 'fahrt', tanzen: 'tanzt', lesen: 'lest', wandern: 'wandert', fotografieren: 'fotografiert' },
  { pessoa: 'sie / Sie', fahren: 'fahren', tanzen: 'tanzen', lesen: 'lesen', wandern: 'wandern', fotografieren: 'fotografieren' },
];

// 2.12 Texto C10 - Diálogos com Verbos
export const TEXT_C10_ITEMS = [
  { pergunta: 'Wohnen Sie auch in Marburg?', resposta: 'Nein, ich wohne in Gießen.', verbos: 'wohnen' },
  { pergunta: 'Was machen Sie am Freitag?', resposta: 'Wir fahren nach Köln.', verbos: 'machen, fahren' },
  { pergunta: 'Kann Ihre Frau Gitarre spielen?', resposta: 'Ja, sie spielt sehr gut Gitarre.', verbos: 'können, spielen' },
  { pergunta: 'Studierst du auch Astronomie?', resposta: 'Nein, ich studiere Psychologie.', verbos: 'studieren' },
  { pergunta: 'Fährst du am Mittwoch nach Köln?', resposta: 'Nein, ich arbeite am Mittwoch.', verbos: 'fahren, arbeiten' },
  { pergunta: 'Könnt ihr am Sonntag kommen?', resposta: 'Nein, am Sonntag kommen unsere Eltern.', verbos: 'können, kommen' },
  { pergunta: 'Tanzt du gern Walzer?', resposta: 'Nein, ich kann nicht tanzen.', verbos: 'tanzen, können' },
  { pergunta: 'Fotografiert ihr gern?', resposta: 'Ja, wir fotografieren sehr gern.', verbos: 'fotografieren' },
  { pergunta: 'Wandert ihr am Wochenende?', resposta: 'Nein, wir lernen Deutsch.', verbos: 'wandern, lernen' },
];

// 2.13 Texto C11 - Welches Verb passt?
export const TEXT_C11_ITEMS = [
  { num: 0, frase: 'Liest er oft Krimis?', verbo: 'lesen' },
  { num: 1, frase: 'Singst du im Chor?', verbo: 'singen' },
  { num: 2, frase: 'Schreibst du Online-Texte?', verbo: 'schreiben' },
  { num: 3, frase: 'Machst du heute Yoga?', verbo: 'machen' },
  { num: 4, frase: 'Hören Sie gern Musik?', verbo: 'hören' },
  { num: 5, frase: 'Könnt ihr Tango tanzen?', verbo: 'können' },
  { num: 6, frase: 'Kannst du Gedichte schreiben?', verbo: 'können' },
  { num: 7, frase: 'Studiert sie auch Chemie?', verbo: 'studieren' },
  { num: 8, frase: 'Spielen Sie Saxofon?', verbo: 'spielen' },
  { num: 9, frase: 'Kannst du ein Instrument spielen?', verbo: 'können' },
  { num: 10, frase: 'Fährst du gern Ski?', verbo: 'fahren' },
  { num: 11, frase: 'Kann deine Schwester Auto fahren?', verbo: 'können' },
];

// 2.14 Texto C12 - Was kann man nicht ...?
export const TEXT_C12_ITEMS = [
  { verbo: 'schreiben', intruso: 'ein Bild', frase: 'Ein Bild kann man nicht schreiben.', explicacao: 'Quadros são pintados (malen), não escritos.' },
  { verbo: 'spielen', intruso: 'Sport', frase: 'Sport kann man nicht spielen.', explicacao: 'Diz-se "Sport machen" ou "Sport treiben".' },
  { verbo: 'besuchen', intruso: 'ein Büro', frase: 'Ein Büro kann man nicht besuchen.', explicacao: 'Visita-se pessoas ou cursos; para escritório usa-se "ins Büro gehen".' },
  { verbo: 'lernen', intruso: 'Zeitung', frase: 'Zeitung kann man nicht lernen.', explicacao: 'Jornal lê-se (lesen), não se aprende.' },
  { verbo: 'bezahlen', intruso: 'Englisch', frase: 'Englisch kann man nicht bezahlen.', explicacao: 'Inglês aprende-se ou fala-se; paga-se o curso ou a fatura.' },
  { verbo: 'fahren', intruso: 'Volleyball', frase: 'Volleyball kann man nicht fahren.', explicacao: 'Vôlei joga-se (spielen); não é veículo nem esporte de deslizamento.' },
  { verbo: 'hören', intruso: 'Fußball', frase: 'Fußball kann man nicht hören.', explicacao: 'Futebol joga-se (spielen) ou assiste-se (sehen).' },
];

// 2.15 Texto C13 - nicht ou kein/keine
export const TEXT_C13_ITEMS = [
  { frase: 'Hier sind keine Bücher.', resposta: 'keine', justificativa: 'Substantivo plural indefinido' },
  { frase: 'Hier kann man nicht lesen.', resposta: 'nicht', justificativa: 'Negação do verbo lesen' },
  { frase: 'Paul kann nicht tanzen.', resposta: 'nicht', justificativa: 'Negação do verbo tanzen' },
  { frase: 'Hier ist kein Computer.', resposta: 'kein', justificativa: 'Substantivo masculino com ein/kein' },
  { frase: 'Ich kann nicht arbeiten.', resposta: 'nicht', justificativa: 'Negação do verbo arbeiten' },
  { frase: 'Wir wandern am Sonntag nicht.', resposta: 'nicht', justificativa: 'Negação da oração / ação' },
  { frase: 'Susanne kann nicht gut Ski fahren.', resposta: 'nicht', justificativa: 'Negação do advérbio gut' },
  { frase: 'Hier ist keine Kaffeemaschine.', resposta: 'keine', justificativa: 'Substantivo feminino indefinido' },
  { frase: 'Der Kaffee ist nicht warm, er ist kalt.', resposta: 'nicht', justificativa: 'Negação do adjetivo warm' },
];

// 2.16 Texto C14 - Preposições
export const TEXT_C14_ITEMS = [
  { frase: 'Peter wohnt in Marburg.', prep: 'in', traducao: 'Peter mora em Marburg.' },
  { frase: 'Er arbeitet als Informatiker an der Universität.', prep: 'an', traducao: 'Ele trabalha como cientista da computação na universidade.' },
  { frase: 'Am Wochenende fährt er nach München.', prep: 'nach', traducao: 'No fim de semana ele viaja para Munique.' },
  { frase: 'Sarah kommt aus Frankreich.', prep: 'aus', traducao: 'Sarah vem da França.' },
  { frase: 'Sie studiert an der Universität in Paris Medizin.', prep: 'an, in', traducao: 'Ela estuda medicina na universidade em Paris.' },
  { frase: 'Hans Behrens arbeitet bei BASF in Ludwigshafen.', prep: 'bei, in', traducao: 'Hans Behrens trabalha na BASF em Ludwigshafen.' },
  { frase: 'Susanne kommt auch aus Ludwigshafen.', prep: 'aus', traducao: 'Susanne vem também de Ludwigshafen.' },
  { frase: 'In Österreich wohnen 8,8 Millionen Menschen.', prep: 'In', traducao: 'Na Áustria moram 8,8 milhões de pessoas.' },
  { frase: 'Wir fahren am Montag nach Österreich.', prep: 'nach', traducao: 'Nós viajamos na segunda-feira para a Áustria.' },
];

// 2.17 Texto C15 - Pronomes Interrogativos
export const TEXT_C15_ITEMS = [
  { frase: 'Wie heißen Sie?', interrogativo: 'wie', traducao: 'Como o senhor se chama?' },
  { frase: 'Welche Sprachen sprichst du?', interrogativo: 'welche', traducao: 'Quais idiomas você fala?' },
  { frase: 'Woher kommt ihr?', interrogativo: 'woher', traducao: 'De onde vocês vêm?' },
  { frase: 'Was sind Sie von Beruf?', interrogativo: 'was', traducao: 'Qual é a sua profissão?' },
  { frase: 'Wie ist Ihre E-Mail-Adresse?', interrogativo: 'wie', traducao: 'Qual é o seu endereço de e-mail?' },
  { frase: 'Wo wohnt er?', interrogativo: 'wo', traducao: 'Onde ele mora?' },
  { frase: 'Wo kann ich hier Tennis spielen?', interrogativo: 'wo', traducao: 'Onde posso jogar tênis aqui?' },
];

// 2.18 Texto D1 - Wichtige Redemittel
export const REDEMITTEL_D1 = {
  alltagskommunikation: [
    { de: 'Guten Morgen!', pt: 'Bom dia!' },
    { de: 'Bitte sehr.', pt: 'Por favor. / De nada.' },
    { de: 'Danke (sehr). / Danke schön. / Vielen Dank.', pt: 'Muito obrigado.' },
    { de: 'Herzlich willkommen!', pt: 'Seja muito bem-vindo!' },
    { de: 'Wie geht es?', pt: 'Como vai você/o senhor?' },
    { de: 'Suchen Sie etwas?', pt: 'O senhor está procurando algo?' },
    { de: 'Vielleicht können wir später zusammen Kaffee trinken.', pt: 'Talvez possamos tomar café juntos mais tarde.' },
    { de: 'Gerne.', pt: 'Com muito prazer.' },
    { de: 'Bis später.', pt: 'Até mais tarde.' },
  ],
  arbeitsplatz: [
    { de: 'Das ist ein (schönes) Büro.', pt: 'Este é um escritório (bonito).' },
    { de: 'Hoffentlich ist alles da: (Stuhl, Computer, Drucker).', pt: 'Tomara que tudo esteja aí: (cadeira, computador, impressora).' },
    { de: 'Fehlt etwas?', pt: 'Falta alguma coisa?' },
    { de: '(Die Kaffeemaschine) funktioniert / geht nicht.', pt: '(A cafeteira) não funciona / não vai.' },
    { de: '(Der Drucker) ist kaputt.', pt: '(A impressora) está quebrada.' },
    { de: 'Ich kann nicht (drucken).', pt: 'Eu não consigo (imprimir).' },
    { de: 'Was kostet (der Bürostuhl)?', pt: 'Quanto custa (a cadeira de escritório)?' },
    { de: '(Der Bürostuhl) kostet (500 Euro).', pt: '(A cadeira de escritório) custa (500 euros).' },
    { de: 'Das ist teuer!', pt: 'Isso é caro!' },
    { de: 'Das ist ein teurer Stuhl.', pt: 'Esta é uma cadeira cara.' },
  ],
  abteilungen: [
    { de: 'die Verwaltung: Hier kann man Rechnungen bezahlen.', pt: 'a administração: Aqui se pode pagar faturas.' },
    { de: 'die Cafeteria: Hier kann man Kaffee trinken.', pt: 'a cafeteria: Aqui se pode tomar café.' },
    { de: 'die Kantine / die Mensa: Hier kann man etwas essen.', pt: 'a cantina / o refeitório: Aqui se pode comer algo.' },
    { de: 'das Sekretariat: Hier kann man Informationen bekommen.', pt: 'a secretaria: Aqui se pode obter informações.' },
    { de: 'die Bibliothek: Hier kann man Bücher und Zeitungen lesen.', pt: 'a biblioteca: Aqui se pode ler livros e jornais.' },
    { de: 'das Sprachenzentrum: Hier kann man Sprachkurse besuchen.', pt: 'o centro de idiomas: Aqui se pode frequentar cursos de idiomas.' },
  ],
  freizeit: [
    { de: 'Wie finden Sie (Marburg)?', pt: 'O que você/o senhor acha de (Marburg)?' },
    { de: 'Kochen Sie gern?', pt: 'O senhor gosta de cozinhar?' },
    { de: 'Was machen Sie am Wochenende?', pt: 'O que o senhor faz no fim de semana?' },
    { de: 'Welches Instrument spielen Sie?', pt: 'Qual instrumento o senhor toca?' },
    { de: 'Ich spiele (Klavier).', pt: 'Eu toco (piano).' },
    { de: 'Ich kann leider (kein Instrument) spielen.', pt: 'Infelizmente não sei tocar (nenhum instrumento).' },
    { de: 'Ich kann leider nicht (gut Salsa) tanzen.', pt: 'Infelizmente não sei dançar (bem salsa).' },
  ],
};

// 2.19 Texto D2 - Dicionário de Verbos
export interface VerbEntry {
  infinitivo: string;
  traducao: string;
  conjugacao: string;
  exemplo: string;
}

export const VERB_DICTIONARY_D2: VerbEntry[] = [
  { infinitivo: 'können', traducao: 'poder / saber fazer', conjugacao: 'ich kann, du kannst, er kann, wir können, ihr könnt, sie können', exemplo: 'Ich kann Klavier spielen.' },
  { infinitivo: 'bekommen', traducao: 'receber / obter', conjugacao: 'ich bekomme, du bekommst, er bekommt, wir bekommen, ihr bekommt, sie bekommen', exemplo: 'Informationen bekommen.' },
  { infinitivo: 'besuchen', traducao: 'visitar / frequentar', conjugacao: 'ich besuche, du besuchst, er besucht, wir besuchen, ihr besucht, sie besuchen', exemplo: 'einen Sprachkurs besuchen.' },
  { infinitivo: 'bezahlen', traducao: 'pagar', conjugacao: 'ich bezahle, du bezahlst, er bezahlt, wir bezahlen, ihr bezahlt, sie bezahlen', exemplo: 'Rechnungen bezahlen.' },
  { infinitivo: 'drucken', traducao: 'imprimir', conjugacao: 'ich drucke, du druckst, er druckt, wir drucken, ihr druckt, sie drucken', exemplo: 'Ich kann nicht drucken.' },
  { infinitivo: 'essen', traducao: 'comer', conjugacao: 'ich esse, du isst, er isst, wir essen, ihr esst, sie essen', exemplo: 'Hier kann man etwas essen.' },
  { infinitivo: 'fahren', traducao: 'dirigir / ir com condução', conjugacao: 'ich fahre, du fährst, er fährt, wir fahren, ihr fahrt, sie fahren', exemplo: 'Motorrad fahren / nach München fahren.' },
  { infinitivo: 'fehlen', traducao: 'faltar', conjugacao: 'es fehlt, sie fehlen', exemplo: 'Fehlt etwas? — Es fehlt nichts.' },
  { infinitivo: 'finden', traducao: 'achar / encontrar', conjugacao: 'ich finde, du findest, er findet, wir finden, ihr findet, sie finden', exemplo: 'Wie finden Sie Marburg?' },
  { infinitivo: 'fotografieren', traducao: 'fotografar', conjugacao: 'ich fotografiere, du fotografierst, er fotografiert, wir fotografieren', exemplo: 'Ich fotografiere gern.' },
  { infinitivo: 'funktionieren', traducao: 'funcionar', conjugacao: 'es funktioniert, sie funktionieren', exemplo: 'Das Gerät funktioniert nicht.' },
  { infinitivo: 'gehen', traducao: 'ir / funcionar / passar', conjugacao: 'ich gehe, du gehst, er geht, wir gehen', exemplo: 'Der Drucker geht nicht. / Wie geht es?' },
  { infinitivo: 'kochen', traducao: 'cozinhar', conjugacao: 'ich koche, du kochst, er kocht, wir kochen', exemplo: 'Kochen Sie gern?' },
  { infinitivo: 'kosten', traducao: 'custar', conjugacao: 'es kostet, sie kosten', exemplo: 'Was kostet der Bürostuhl?' },
  { infinitivo: 'machen', traducao: 'fazer', conjugacao: 'ich mache, du machst, er macht, wir machen', exemplo: 'Yoga machen / Sport machen.' },
  { infinitivo: 'reisen', traducao: 'viajar', conjugacao: 'ich reise, du reist, er reist, wir reisen', exemplo: 'Er reist viel.' },
  { infinitivo: 'suchen', traducao: 'procurar / buscar', conjugacao: 'ich suche, du suchst, er sucht, wir suchen', exemplo: 'Suchen Sie etwas?' },
  { infinitivo: 'surfen', traducao: 'surfar / navegar na internet', conjugacao: 'ich surfe, du surfst, er surft, wir surfen', exemplo: 'im Internet surfen.' },
  { infinitivo: 'stehen', traducao: 'estar em pé / estar situado', conjugacao: 'es steht, sie stehen', exemplo: 'Im Büro steht ein Schreibtisch.' },
  { infinitivo: 'tanzen', traducao: 'dançar', conjugacao: 'ich tanze, du tanzt, er tanzt, wir tanzen', exemplo: 'Tango tanzen.' },
  { infinitivo: 'telefonieren', traducao: 'telefonar', conjugacao: 'ich telefoniere, du telefonierst, er telefoniert, wir telefonieren', exemplo: 'mit dem Handy telefonieren.' },
  { infinitivo: 'trinken', traducao: 'beber / tomar', conjugacao: 'ich trinke, du trinkst, er trinkt, wir trinken', exemplo: 'Kaffee trinken.' },
  { infinitivo: 'wandern', traducao: 'fazer trilha / caminhar', conjugacao: 'ich wandere, du wanderst, er wandert, wir wandern', exemplo: 'Die Schweizer wandern viel.' },
];

// 2.20 Texto D3 - Autoavaliação
export const EVALUATION_D3 = [
  { item: 'Ich kann wichtige Bürogegenstände und kaputte Geräte benennen.', traducao: 'Consigo nomear objetos de escritório importantes e aparelhos quebrados.' },
  { item: 'Ich kann über Preise sprechen.', traducao: 'Consigo falar sobre preços.' },
  { item: 'Ich kann einige Abteilungen kurz beschreiben.', traducao: 'Consigo descrever brevemente alguns departamentos.' },
  { item: 'Ich kann einfache Gespräche über Hobbys und Freizeit verstehen und führen.', traducao: 'Consigo compreender e manter conversas simples sobre hobbies e tempo livre.' },
  { item: 'Ich kann die Wochentage nennen.', traducao: 'Consigo citar os dias da semana.' },
  { item: 'Ich kann eine Grafik beschreiben. (fakultativ)', traducao: 'Consigo descrever um gráfico estatístico. (facultativo)' },
];

// 2.21 Tabela Lexical Primária
export interface LexiconItemLesson5 {
  palavraAlema: string;
  classeGramatical: string;
  plural?: string;
  traducao: string;
  fraseModelo: string;
  audio?: string;
}

export const LEXICON_LESSON_5: LexiconItemLesson5[] = [
  { palavraAlema: 'die Freizeit', classeGramatical: 'Subst. fem.', plural: '(sem plural)', traducao: 'tempo livre / lazer', fraseModelo: 'Was machen die Österreicher in der Freizeit?' },
  { palavraAlema: 'das Hobby', classeGramatical: 'Subst. neutro', plural: 'die Hobbys', traducao: 'hobby / passatempo', fraseModelo: 'Was sind deine Hobbys?' },
  { palavraAlema: 'die Aktivität', classeGramatical: 'Subst. fem.', plural: 'die Aktivitäten', traducao: 'atividade', fraseModelo: 'Freizeitaktivitäten in der Schweiz.' },
  { palavraAlema: 'das Wochenende', classeGramatical: 'Subst. neutro', plural: 'die Wochenenden', traducao: 'fim de semana', fraseModelo: 'Was machen Sie am Wochenende?' },
  { palavraAlema: 'der Montag', classeGramatical: 'Subst. masc.', plural: 'die Montage', traducao: 'segunda-feira', fraseModelo: 'Am Montag arbeite ich.' },
  { palavraAlema: 'der Dienstag', classeGramatical: 'Subst. masc.', plural: 'die Dienstage', traducao: 'terça-feira', fraseModelo: 'Am Dienstag lerne ich Deutsch.' },
  { palavraAlema: 'der Mittwoch', classeGramatical: 'Subst. masc.', plural: 'die Mittwoche', traducao: 'quarta-feira', fraseModelo: 'Am Mittwoch tanze ich Tango.' },
  { palavraAlema: 'der Donnerstag', classeGramatical: 'Subst. masc.', plural: 'die Donnerstage', traducao: 'quinta-feira', fraseModelo: 'Am Donnerstag spiele ich Gitarre.' },
  { palavraAlema: 'der Freitag', classeGramatical: 'Subst. masc.', plural: 'die Freitage', traducao: 'sexta-feira', fraseModelo: 'Am Freitag besuche ich Freunde.' },
  { palavraAlema: 'der Samstag', classeGramatical: 'Subst. masc.', plural: 'die Samstage', traducao: 'sábado (Sonnabend)', fraseModelo: 'Am Samstag fahre ich nach Berlin.' },
  { palavraAlema: 'der Sonntag', classeGramatical: 'Subst. masc.', plural: 'die Sonntage', traducao: 'domingo', fraseModelo: 'Am Sonntag ruhe ich mich aus.' },
  { palavraAlema: 'die Woche', classeGramatical: 'Subst. fem.', plural: 'die Wochen', traducao: 'semana', fraseModelo: 'Die Woche hat sieben Tage.' },
  { palavraAlema: 'der Wochentag', classeGramatical: 'Subst. masc.', plural: 'die Wochentage', traducao: 'dia da semana', fraseModelo: 'Ich kann die Wochentage nennen.' },
  { palavraAlema: 'die Kantine', classeGramatical: 'Subst. fem.', plural: 'die Kantinen', traducao: 'cantina / refeitório', fraseModelo: 'Hier kann man etwas essen.' },
  { palavraAlema: 'die Mensa', classeGramatical: 'Subst. fem.', plural: 'die Mensen', traducao: 'refeitório universitário', fraseModelo: 'Hier können die Studenten essen.' },
  { palavraAlema: 'die Bibliothek', classeGramatical: 'Subst. fem.', plural: 'die Bibliotheken', traducao: 'biblioteca', fraseModelo: 'Hier kann man Bücher lesen.' },
  { palavraAlema: 'das Sekretariat', classeGramatical: 'Subst. neutro', plural: 'die Sekretariate', traducao: 'secretaria', fraseModelo: 'Hier kann man Informationen bekommen.' },
  { palavraAlema: 'die Verwaltung', classeGramatical: 'Subst. fem.', plural: 'die Verwaltungen', traducao: 'administração', fraseModelo: 'Hier kann man Rechnungen bezahlen.' },
  { palavraAlema: 'das Sprachenzentrum', classeGramatical: 'Subst. neutro', plural: 'die Sprachenzentren', traducao: 'centro de línguas', fraseModelo: 'Hier kann man Sprachkurse besuchen.' },
  { palavraAlema: 'die Sporthalle', classeGramatical: 'Subst. fem.', plural: 'die Sporthallen', traducao: 'ginásio de esportes', fraseModelo: 'Hier kann man Volleyball spielen.' },
  { palavraAlema: 'die Cafeteria', classeGramatical: 'Subst. fem.', plural: 'die Cafeterias', traducao: 'cafeteria', fraseModelo: 'Hier kann man Kaffee trinken.' },
  { palavraAlema: 'surfen', classeGramatical: 'Verbo regular', plural: '-', traducao: 'navegar (internet) / surfar', fraseModelo: 'Im Internet surfen.' },
  { palavraAlema: 'wandern', classeGramatical: 'Verbo regular', plural: '-', traducao: 'fazer caminhada / trilha', fraseModelo: 'Die Schweizer wandern viel.' },
  { palavraAlema: 'fotografieren', classeGramatical: 'Verbo regular', plural: '-', traducao: 'fotografar', fraseModelo: 'Ich fotografiere gern.' },
  { palavraAlema: 'telefonieren', classeGramatical: 'Verbo regular', plural: '-', traducao: 'telefonar', fraseModelo: 'Ich telefoniere oft.' },
];

// 2.22 Umgangssprache
export const COLLOQUIAL_LESSON_5 = [
  { expressao: 'Na?', traducao: 'E aí? / Tudo bom?', contexto: 'Saudação alemã ultra-concisa de grande proximidade' },
  { expressao: 'Was geht?', traducao: 'O que tá rolando? / Qual é a boa?', contexto: 'Saudação informal entre jovens e colegas' },
  { expressao: 'Alles klar?', traducao: 'Tudo certo? / Entendido?', contexto: 'Pergunta de checagem constante no dia a dia' },
  { expressao: 'Läuft bei dir?', traducao: 'Tudo nos conformes? / Mandando bem?', contexto: 'Gíria contemporânea de aprovação' },
  { expressao: 'Kein Stress!', traducao: 'Sem estresse! / Sem crise!', contexto: 'Usado para tranquilizar alguém apressado' },
  { expressao: 'Passt schon!', traducao: 'Tá ótimo assim! / Já serve!', contexto: 'Expressão típica para aceitar algo sem complicações' },
  { expressao: 'Echt?', traducao: 'É sério? / De verdade?', contexto: 'Reação comum de surpresa ou incredulidade' },
  { expressao: 'Krass!', traducao: 'Que doideira! / Bizarro! / Impressionante!', contexto: 'Gíria alemã para intensidades extremas' },
  { expressao: 'Bock haben', traducao: 'Estar a fim de fazer algo', contexto: '"Ich habe keinen Bock" = Não estou a fim' },
  { expressao: "Mach's gut!", traducao: 'Cuide-se! / Vai na boa!', contexto: 'Despedida informal calorosa' },
  { expressao: 'Bis dann!', traducao: 'Até lá! / Até logo!', contexto: 'Despedida comum entre amigos' },
  { expressao: 'Bis später!', traducao: 'Até mais tarde!', contexto: 'Despedida quando se prevê reencontro no mesmo dia' },
];

// 3.1 Exercício A23 - Negação
export const EXERCISE_A23_ITEMS = [
  { num: 0, pergunta: 'Spielen Sie gut Gitarre?', resposta: 'Nein, ich spiele nicht gut Gitarre.', justificativa: 'nicht nega o advérbio gut' },
  { num: 1, pergunta: 'Singen Sie vielleicht?', resposta: 'Nein, ich singe nicht.', justificativa: 'nicht nega o verbo singen (Posição final)' },
  { num: 2, pergunta: 'Sprechen Sie gut Schwedisch?', resposta: 'Nein, ich spreche nicht gut Schwedisch.', justificativa: 'nicht nega o advérbio gut' },
  { num: 3, pergunta: 'Können Sie gut Fußball spielen?', resposta: 'Nein, ich kann nicht gut Fußball spielen.', justificativa: 'nicht antes de gut e do infinitivo spielen' },
  { num: 4, pergunta: 'Können Sie gut kochen?', resposta: 'Nein, ich kann nicht gut kochen.', justificativa: 'nicht antes de gut kochen' },
  { num: 5, pergunta: 'Lernen Sie gern Deutsch?', resposta: 'Nein, ich lerne nicht gern Deutsch.', justificativa: 'nicht gern nega a preferência' },
];

// 3.2 Exercício A24 - Formal vs Informal
export const EXERCISE_A24_ITEMS = [
  { num: 0, formal: 'Welches Instrument spielen Sie (Sg.)?', informal: 'Welches Instrument spielst du?' },
  { num: 1, formal: 'Wie finden Sie (Sg.) Marburg?', informal: 'Wie findest du Marburg?' },
  { num: 2, formal: 'Fahren Sie (Pl.) nach München?', informal: 'Fahrt ihr nach München?' },
  { num: 3, formal: 'Können Sie (Sg.) gut singen?', informal: 'Kannst du gut singen?' },
  { num: 4, formal: 'Welche Sprache sprechen Sie (Pl.) zu Hause?', informal: 'Welche Sprache sprecht ihr zu Hause?' },
  { num: 5, formal: 'Lernen Sie (Pl.) auch Deutsch?', informal: 'Lernt ihr auch Deutsch?' },
];

// 3.3 Exercício A25 - Classificação por Verbos
export const EXERCISE_A25_CATEGORIES = [
  { verbo: 'spielen', itens: 'Gitarre, Trompete, Klavier, Schach, Fußball, Tennis, Pingpong, Karten, Saxofon, Golf, Violine, Volleyball' },
  { verbo: 'machen', itens: 'Gymnastik, Sport, Yoga' },
  { verbo: 'lesen', itens: 'Gedichte, Literatur, Zeitung, Romane' },
  { verbo: 'lernen', itens: 'Portugiesisch, Mathematik, Deutsch, Latein' },
  { verbo: 'hören', itens: 'Hip-Hop, Rockmusik, klassische Musik, Jazz' },
  { verbo: 'tanzen', itens: 'Salsa, Tango, Walzer' },
  { verbo: 'fahren', itens: 'Fahrrad, Ski, Motorrad, Auto' },
];

// 3.4 Exercício A26 - Diálogos de Aptidão
export const EXERCISE_A26_DIALOGUES = [
  { atividade: 'Salsa tanzen', pergunta: 'Kannst du gut Salsa tanzen?', resposta: 'Ja, ich kann gut Salsa tanzen.' },
  { atividade: 'Saxofon spielen', pergunta: 'Können Sie Saxofon spielen?', resposta: 'Nein, leider nicht.' },
  { atividade: 'Schach spielen', pergunta: 'Kannst du Schach spielen?', resposta: 'Ja, klar!' },
  { atividade: 'Motorrad fahren', pergunta: 'Können Sie Motorrad fahren?', resposta: 'Nein, ich kann nicht Motorrad fahren.' },
  { atividade: 'Ski fahren', pergunta: 'Kannst du Ski fahren?', resposta: 'Ja, natürlich!' },
  { atividade: 'Spanisch sprechen', pergunta: 'Sprechen Sie Spanisch?', resposta: 'Ja, ich spreche ein bisschen Spanisch.' },
  { atividade: 'Tango tanzen', pergunta: 'Kannst du Tango tanzen?', resposta: 'Nein, leider nicht.' },
  { atividade: 'Trompete spielen', pergunta: 'Können Sie Trompete spielen?', resposta: 'Nein, ich kann nicht Trompete spielen.' },
  { atividade: 'fotografieren', pergunta: 'Fotografierst du gern?', resposta: 'Ja, ich fotografiere sehr gern.' },
  { atividade: 'Golf spielen', pergunta: 'Spielen Sie Golf?', resposta: 'Nein, ich spiele nicht Golf.' },
  { atividade: 'Tennis spielen', pergunta: 'Kannst du Tennis spielen?', resposta: 'Ja, ich kann Tennis spielen.' },
  { atividade: 'Auto fahren', pergunta: 'Können Sie Auto fahren?', resposta: 'Ja, natürlich!' },
];

// 3.5 Exercício A27 - Wochentage
export const EXERCISE_A27_DAYS = [
  { dia: 'der Montag', tipo: 'Arbeitstag', exemplo: 'Am Montag arbeite ich.', pt: 'Na segunda-feira eu trabalho.' },
  { dia: 'der Dienstag', tipo: 'Arbeitstag', exemplo: 'Am Dienstag lerne ich Deutsch.', pt: 'Na terça-feira eu aprendo alemão.' },
  { dia: 'der Mittwoch', tipo: 'Arbeitstag', exemplo: 'Am Mittwoch tanze ich Tango.', pt: 'Na quarta-feira eu danço tango.' },
  { dia: 'der Donnerstag', tipo: 'Arbeitstag', exemplo: 'Am Donnerstag spiele ich Gitarre.', pt: 'Na quinta-feira eu toco violão.' },
  { dia: 'der Freitag', tipo: 'Arbeitstag', exemplo: 'Am Freitag besuche ich Freunde.', pt: 'Na sexta-feira eu visito amigos.' },
  { dia: 'der Samstag / Sonnabend', tipo: 'Wochenende', exemplo: 'Am Samstag fahre ich nach Berlin.', pt: 'No sábado eu vou para Berlim.' },
  { dia: 'der Sonntag', tipo: 'Wochenende', exemplo: 'Am Sonntag ruhe ich mich aus.', pt: 'No domingo eu descanso.' },
];

// 3.6 Exercício A28 - Herr Meier vs Frau Meier
export const EXERCISE_A28_SCHEDULE = [
  { dia: 'Montag', herr: 'Am Montag fährt Herr Meier Motorrad.', frau: 'Am Montag lernt Frau Meier Russisch.' },
  { dia: 'Dienstag', herr: 'Am Dienstag liest Herr Meier Zeitung.', frau: 'Am Dienstag fährt Frau Meier nach Berlin.' },
  { dia: 'Mittwoch', herr: 'Am Mittwoch fotografiert Herr Meier.', frau: 'Am Mittwoch kocht Frau Meier.' },
  { dia: 'Donnerstag', herr: 'Am Donnerstag wandert Herr Meier.', frau: 'Am Donnerstag schreibt Frau Meier Gedichte.' },
  { dia: 'Freitag', herr: 'Am Freitag tanzt Herr Meier Walzer.', frau: 'Am Freitag tanzt Frau Meier Tango.' },
  { dia: 'Samstag', herr: 'Am Samstag spielt Herr Meier Karten.', frau: 'Am Samstag macht Frau Meier Yoga.' },
  { dia: 'Sonntag', herr: 'Am Sonntag hört Herr Meier Musik.', frau: 'Am Sonntag besucht Frau Meier Freunde.' },
];

// 3.7 Exercício C7 - Ordenação de Frases
export const EXERCISE_C7_SENTENCES = [
  { num: 0, frase: 'Ich wohne in Berlin.', traducao: 'Eu moro em Berlim.' },
  { num: 1, frase: 'Kommt Miguel aus Spanien?', traducao: 'O Miguel vem da Espanha?' },
  { num: 2, frase: 'Kerstin spricht Französisch und Englisch.', traducao: 'Kerstin fala francês e inglês.' },
  { num: 3, frase: 'Ich lerne jetzt Deutsch.', traducao: 'Eu aprendo alemão agora.' },
  { num: 4, frase: 'Woher kommst du?', traducao: 'De onde você vem?' },
  { num: 5, frase: 'Was sind Sie von Beruf?', traducao: 'Qual é a sua profissão?' },
  { num: 6, frase: 'Wir wohnen in Berlin.', traducao: 'Nós moramos em Berlim.' },
  { num: 7, frase: 'Paola arbeitet als Journalistin.', traducao: 'Paola trabalha como jornalista.' },
  { num: 8, frase: 'Spielst du gern Fußball?', traducao: 'Você gosta de jogar futebol?' },
  { num: 9, frase: 'Marie hört gern Musik.', traducao: 'Marie gosta de ouvir música.' },
  { num: 10, frase: 'Hört ihr auch gern Musik?', traducao: 'Vocês também gostam de ouvir música?' },
  { num: 11, frase: 'Peter lernt Spanisch.', traducao: 'Peter aprende espanhol.' },
  { num: 12, frase: 'Er liest nicht gern Liebesromane.', traducao: 'Ele não gosta de ler romances de amor.' },
  { num: 13, frase: 'Liest du gern Liebesromane?', traducao: 'Você gosta de ler romances de amor?' },
  { num: 14, frase: 'Spielt ihr gern Tischtennis?', traducao: 'Vocês gostam de jogar tênis de mesa?' },
  { num: 15, frase: 'Wir studieren in München Medizin.', traducao: 'Nós estudamos medicina em Munique.' },
];

// 3.8 & 3.9 Tradução Reversa de Blindagem
export interface ReverseTranslationItemLesson5 {
  id: number;
  pt: string;
  de: string;
  justificativa: string;
}

export const REVERSE_TRANSLATION_LESSON_5: ReverseTranslationItemLesson5[] = [
  {
    id: 1,
    pt: 'Eu trabalho na Siemens em Munique.',
    de: 'Ich arbeite bei Siemens in München.',
    justificativa: 'arbeiten na 1ª pess. (arbeite) + bei para pessoa jurídica/empresa (bei Siemens) + in para cidade (in München).',
  },
  {
    id: 2,
    pt: 'Meu irmão mora na Suíça.',
    de: 'Mein Bruder wohnt in der Schweiz.',
    justificativa: 'Possessivo masculino mein + Bruder + wohnen na 3ª pess. (wohnt) + in + Dativo feminino para país com artigo (in der Schweiz).',
  },
  {
    id: 3,
    pt: 'Nós vamos para a Áustria no domingo.',
    de: 'Wir fahren am Sonntag nach Österreich. / Am Sonntag fahren wir nach Österreich.',
    justificativa: 'fahren (1ª pl.) + am Sonntag (an + dem) + nach para país sem artigo (nach Österreich). Se am Sonntag abre a oração, ocorre inversão.',
  },
  {
    id: 4,
    pt: 'Ela vem da Turquia.',
    de: 'Sie kommt aus der Türkei.',
    justificativa: 'kommen (3ª pess. kommt) + aus para procedência + Dativo feminino do artigo para país com artigo obrigatório (der Türkei).',
  },
  {
    id: 5,
    pt: 'A cafeteria fica no centro.',
    de: 'Die Cafeteria ist im Zentrum.',
    justificativa: 'sein (ist) + contração obrigatória in + dem Zentrum = im Zentrum.',
  },
  {
    id: 6,
    pt: 'Quanto custa a cafeteira? — Custa 50 euros.',
    de: 'Was kostet die Kaffeemaschine? — Sie kostet 50 Euro.',
    justificativa: 'Pergunta de preço Was kostet...? + die Kaffeemaschine (feminino) retomada anaforicamente pelo pronome pessoal feminino sie.',
  },
  {
    id: 7,
    pt: 'A impressora não funciona. Eu não consigo imprimir.',
    de: 'Der Drucker funktioniert nicht. Ich kann nicht drucken.',
    justificativa: 'funktionieren na 3ª sg. com nicht no final + modalverb können (1ª sg. kann) com infinitivo puro drucken no Satzende.',
  },
  {
    id: 8,
    pt: 'O que você faz no fim de semana? — Eu jogo futebol e ouço música.',
    de: 'Was machst du am Wochenende? — Ich spiele Fußball und höre Musik.',
    justificativa: 'am Wochenende (Dativo contraído) + coordenação de dois verbos conjugados na 1ª pessoa (spiele, höre).',
  },
  {
    id: 9,
    pt: 'Na segunda-feira eu trabalho. Na terça-feira eu aprendo alemão.',
    de: 'Am Montag arbeite ich. Am Dienstag lerne ich Deutsch.',
    justificativa: 'Posição I ocupada pelo adjunto temporal (Am Montag / Am Dienstag) força a inversão sujeito-verbo (Posição II: arbeite / lerne, Posição III: ich).',
  },
  {
    id: 10,
    pt: 'Eu gosto de cozinhar, mas não gosto de lavar pratos.',
    de: 'Ich koche gern, aber ich wasche nicht gern ab.',
    justificativa: 'kochen + gern (gostar de fazer) + aber (conjunção de Posição 0) + verbo separável abwaschen (dupla alteração a → ä em du wäschst, mas regular na 1ª pess. ich wasche ... ab).',
  },
];

// 3.10 Resumo dos Pontos-Chave
export const KEY_POINTS_LESSON_5 = [
  { numero: 1, conceito: 'Preposições Locais Canônicas', regra: 'aus (origem/procedência), in (lugar estático onde se está), bei (empresa ou pessoa), nach (direção para cidades e países sem artigo).' },
  { numero: 2, conceito: 'Oposição in vs. nach', regra: 'in + Dativo denota localização estática ("wo?"); nach + Dativo denota direção ("wohin?"). Para países com artigo, a direção usa in + Akkusativ (in die Schweiz).' },
  { numero: 3, conceito: 'Verbo fahren (a → ä)', regra: 'Verbos com a raiz em "a" mudam para "ä" estritamente na 2ª (du fährst) e 3ª (er/sie/es fährt) pessoas do singular.' },
  { numero: 4, conceito: 'Verbo nehmen (e → i + dobra)', regra: 'Dupla irregularidade: e vira i e o "h" vira consoante dobrada "mm" (du nimmst, er nimmt).' },
  { numero: 5, conceito: 'Verbo essen (e → i + sibilante)', regra: 'A raiz sibilante faz a 2ª e a 3ª pessoas singulares serem absolutamente idênticas: du isst, er isst.' },
  { numero: 6, conceito: 'Verbos lesen e sehen (e → ie)', regra: 'Alternam para ditongo longo ie exclusivamente na 2ª e 3ª pessoas: du liest, er liest / du siehst, er sieht.' },
  { numero: 7, conceito: 'Verbo sprechen (e → i)', regra: 'Alterna para i curto: du sprichst, er spricht.' },
  { numero: 8, conceito: 'Verbo wissen (saber fatos)', regra: 'Pretérito-presente: 1ª e 3ª pessoas singulares idênticas sem desinência (ich weiß, du weißt, er weiß, wir wissen).' },
  { numero: 9, conceito: 'Verbo mögen (gostar)', regra: 'Expressa apreço por substantivos (ich mag Kaffee), perdendo o trema no singular (ich mag, du magst, er mag).' },
  { numero: 10, conceito: 'Negação nicht', regra: 'Nega verbos, adjetivos, advérbios e predicados inteiros. Posiciona-se após o verbo simples e antes do infinitivo ou adjetivo.' },
  { numero: 11, conceito: 'Negação kein / keine', regra: 'Substitui o artigo indefinido (ein/eine) e nega substantivos que não teriam artigo (Nullartikel).' },
  { numero: 12, conceito: 'Dias da Semana (Wochentage)', regra: 'Todos masculinos (der Montag a der Sonntag) e combinam-se com a preposição contraída "am" (an + dem).' },
  { numero: 13, conceito: 'A Regra de Ouro: Posição II', regra: 'Em qualquer oração declarativa padrão alemã, o verbo conjugado ocupa rigidamente a Posição II.' },
  { numero: 14, conceito: 'Inversão Sujeito-Verbo', regra: 'Se o Vorfeld (Posição I) for ocupado por um elemento temporal ou circunstancial (ex.: "Am Montag"), o sujeito migra imediatamente para a Posição III.' },
  { numero: 15, conceito: 'Satzklammer (Pinça Oracional)', regra: 'Com modalverb na Posição II, o verbo lexical é arremessado no infinitivo puro para a última posição da oração.' },
];
