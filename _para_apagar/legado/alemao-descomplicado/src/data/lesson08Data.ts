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

export const LESSON_08_METADATA: LessonMetadata = {
  lessonNumber: 8,
  round: 'Rodada Extra 08',
  day: 'Kapitel Lokale Präpositionen',
  chapter: 'Guia Definitivo das Preposições Locais Alemãs',
  title: 'As 16 Preposições e Contrações Locais: in, im, ins, aus, zu, zum, zur, nach, an, am, ans, auf, bei, beim, von, vom',
  subtitle: 'A distinção mestra Wo? (Dativo) vs. Wohin? (Acusativo) vs. Woher? (Dativo), regras passo a passo, dezenas de frases contextualizadas, áudios e exercícios interativos.',
  duration: '180 Minutos (Blocos 1, 2 e 3)',
  level: 'Nível A1–A2 (Gramática Estrutural de Precisão)',
  totalTerms: 120,
  totalGrammarSections: 14,
  totalExercises: 6,
};

// ==========================================
// PARTE I — A LÓGICA FUNDAMENTAL
// ==========================================
export interface CoreLogicItem {
  pergunta: string;
  caso: string;
  significado: string;
  exemploDe: string;
  exemploPt: string;
  explicacao: string;
}

export const LOGICA_FUNDAMENTAL: CoreLogicItem[] = [
  {
    pergunta: 'Wo?',
    caso: 'Dativ (Dativo)',
    significado: 'Onde? (localização estática, permanência)',
    exemploDe: 'Ich bin im Haus.',
    exemploPt: 'Estou na casa.',
    explicacao: 'Indica repouso, permanência ou ação restrita ao mesmo ambiente. Não há travessia de fronteira.',
  },
  {
    pergunta: 'Wohin?',
    caso: 'Akkusativ (Acusativo)',
    significado: 'Para onde? (movimento, direção com mudança de lugar)',
    exemploDe: 'Ich gehe ins Haus.',
    exemploPt: 'Vou para dentro da casa.',
    explicacao: 'Indica deslocamento em direção a um destino, cruzando o limite exterior para o interior.',
  },
  {
    pergunta: 'Woher?',
    caso: 'Dativ (Dativo)',
    significado: 'De onde? (origem, ponto de partida)',
    exemploDe: 'Ich komme aus dem Haus.',
    exemploPt: 'Venho de dentro da casa.',
    explicacao: 'Indica o ponto de saída, a procedência geográfica ou a origem de um local.',
  },
];

// ==========================================
// PARTE II — AS PREPOSIÇÕES UMA A UMA
// ==========================================
export interface PrepositionGuideSection {
  id: string;
  numero: string;
  preposicao: string;
  titulo: string;
  casoRegente: string;
  significadoPrincipal: string;
  regraPratica: string;
  tabelaContracoes?: {
    genero: string;
    artigoOriginal: string;
    contracao: string;
    exemploDe: string;
    exemploPt: string;
  }[];
  paisesExemplos?: {
    tipo: string;
    wo: string;
    wohin: string;
    woher?: string;
    exemploDe: string;
    exemploPt: string;
  }[];
  exemplosExtras: {
    de: string;
    pt: string;
    destaque: string;
    nota?: string;
  }[];
  armadilhaBrasileiro?: string;
}

export const GUIA_PREPOSICOES: PrepositionGuideSection[] = [
  {
    id: 'prep-1-in',
    numero: '1',
    preposicao: 'in',
    titulo: 'in — A Preposição Mais Versátil (Dentro de / Para dentro de)',
    casoRegente: 'Wechselpräposition (Dativo para Wo? / Acusativo para Wohin?)',
    significadoPrincipal: '"em", "no", "na" (localização interior) | "para", "para dentro de" (movimento)',
    regraPratica: 'Se você já está dentro de um espaço tridimensional fechado: Dativo (in + dem = im, in der, in den). Se você está indo para dentro: Acusativo (in den, in die, in + das = ins).',
    tabelaContracoes: [
      {
        genero: 'Masculino (der Supermarkt)',
        artigoOriginal: 'dem (Dativo) / den (Acusativo)',
        contracao: 'im (Dativo) / in den (Acusativo)',
        exemploDe: 'Ich bin im Supermarkt. | Ich gehe in den Supermarkt.',
        exemploPt: 'Estou no supermercado. | Vou ao supermercado.',
      },
      {
        genero: 'Feminino (die Schule)',
        artigoOriginal: 'der (Dativo) / die (Acusativo)',
        contracao: 'in der (Dativo) / in die (Acusativo)',
        exemploDe: 'Ich bin in der Schule. | Ich gehe in die Schule.',
        exemploPt: 'Estou na escola. | Vou à escola.',
      },
      {
        genero: 'Neutro (das Kino)',
        artigoOriginal: 'dem (Dativo) / das (Acusativo)',
        contracao: 'im (Dativo) / ins (Acusativo)',
        exemploDe: 'Ich bin im Kino. | Ich gehe ins Kino.',
        exemploPt: 'Estou no cinema. | Vou ao cinema.',
      },
      {
        genero: 'Plural (die USA / die Berge)',
        artigoOriginal: 'den (Dativo) / die (Acusativo)',
        contracao: 'in den (Dativo) / in die (Acusativo)',
        exemploDe: 'Ich bin in den Bergen. | Ich fahre in die Berge.',
        exemploPt: 'Estou nas montanhas. | Vou às montanhas.',
      },
    ],
    paisesExemplos: [
      {
        tipo: 'Feminino (die Schweiz, die Türkei, die Slowakei, die Ukraine)',
        wo: 'in der Schweiz / in der Türkei',
        wohin: 'in die Schweiz / in die Türkei',
        exemploDe: 'Ich wohne in der Schweiz. | Ich fahre in die Schweiz.',
        exemploPt: 'Moro na Suíça. | Vou para a Suíça.',
      },
      {
        tipo: 'Masculino (der Iran, der Irak, der Libanon, der Sudan)',
        wo: 'im Iran / im Irak',
        wohin: 'in den Iran / in den Irak',
        exemploDe: 'Er arbeitet im Iran. | Er reist in den Iran.',
        exemploPt: 'Ele trabalha no Irã. | Ele viaja para o Irã.',
      },
      {
        tipo: 'Plural (die USA, die Niederlande, die Philippinen)',
        wo: 'in den USA / in den Niederlanden',
        wohin: 'in die USA / in die Niederlande',
        exemploDe: 'Ich lebe in den USA. | Ich fliege in die USA.',
        exemploPt: 'Vivo nos EUA. | Voo para os EUA.',
      },
    ],
    exemplosExtras: [
      { de: 'Er sitzt im Wohnzimmer.', pt: 'Ele está sentado na sala de estar.', destaque: 'im Wohnzimmer (Wo? - Dativo)' },
      { de: 'Sie geht in die Küche.', pt: 'Ela vai para a cozinha.', destaque: 'in die Küche (Wohin? - Acusativo)' },
      { de: 'Die Kinder spielen im Garten.', pt: 'As crianças brincam no jardim.', destaque: 'im Garten (Wo? - Dativo)' },
      { de: 'Wir steigen in den Zug ein.', pt: 'Nós embarcamos no trem.', destaque: 'in den Zug (Wohin? - Acusativo)' },
      { de: 'Ich habe einen Termin in der Botschaft.', pt: 'Tenho um compromisso na embaixada.', destaque: 'in der Botschaft (Wo? - Dativo)' },
    ],
    armadilhaBrasileiro: 'Cuidado com países que possuem artigo obrigatório! Dizer *"Ich fahre nach Schweiz"* é um erro gravíssimo. O correto é sempre "Ich fahre in die Schweiz" (Acusativo).',
  },
  {
    id: 'prep-2-im',
    numero: '2',
    preposicao: 'im',
    titulo: 'im — A Contração Obrigatória de in + dem',
    casoRegente: 'Dativ (Wo? — Onde?)',
    significadoPrincipal: '"no" (masculino e neutro estático)',
    regraPratica: 'Sempre que o substantivo for masculino (der) ou neutro (das) e responder à pergunta "Wo?", a fusão in + dem = im é obrigatória na fala culta e cotidiana.',
    exemplosExtras: [
      { de: 'Ich bin im Büro.', pt: 'Estou no escritório.', destaque: 'im Büro (das Büro)' },
      { de: 'Ich wohne im Zentrum.', pt: 'Moro no centro.', destaque: 'im Zentrum (das Zentrum)' },
      { de: 'Das Buch ist im Regal.', pt: 'O livro está na estante.', destaque: 'im Regal (das Regal)' },
      { de: 'Wir essen heute im Restaurant.', pt: 'Hoje almoçamos/jantamos no restaurante.', destaque: 'im Restaurant (das Restaurant)' },
      { de: 'Er wartet im Flur.', pt: 'Ele está esperando no corredor.', destaque: 'im Flur (der Flur)' },
      { de: 'Der Schlüssel liegt im Auto.', pt: 'A chave está no carro.', destaque: 'im Auto (das Auto)' },
      { de: 'Ich habe Kopfschmerzen im Zug.', pt: 'Estou com dor de cabeça no trem.', destaque: 'im Zug (der Zug)' },
      { de: 'Die Dokumente sind im Schrank.', pt: 'Os documentos estão no armário.', destaque: 'im Schrank (der Schrank)' },
    ],
    armadilhaBrasileiro: 'Nunca use "im" para feminino ou plural! Dizer *"im Schule"* ou *"im USA"* destrói a gramática. Feminino: in der Schule. Plural: in den USA.',
  },
  {
    id: 'prep-3-ins',
    numero: '3',
    preposicao: 'ins',
    titulo: 'ins — A Contração Obrigatória de in + das',
    casoRegente: 'Akkusativ (Wohin? — Para onde?)',
    significadoPrincipal: '"para dentro do", "ao" (neutro em movimento)',
    regraPratica: 'Sempre que o substantivo for neutro (das) e indicar direção ou entrada em um espaço, a contração in + das = ins é estritamente mandatória.',
    exemplosExtras: [
      { de: 'Ich gehe heute Abend ins Kino.', pt: 'Vou ao cinema hoje à noite.', destaque: 'ins Kino (das Kino)' },
      { de: 'Wir fahren im Sommer ins Ausland.', pt: 'No verão nós vamos para o exterior.', destaque: 'ins Ausland (das Ausland)' },
      { de: 'Ich lege das Buch ins Regal.', pt: 'Eu coloco o livro dentro da estante.', destaque: 'ins Regal (movimento de colocar)' },
      { de: 'Kommst du mit ins Restaurant?', pt: 'Você vem comigo ao restaurante?', destaque: 'ins Restaurant (das Restaurant)' },
      { de: 'Er springt ins Schwimmbad.', pt: 'Ele pula na piscina.', destaque: 'ins Schwimmbad (das Schwimmbad)' },
      { de: 'Die Kinder müssen jetzt ins Bett.', pt: 'As crianças têm que ir para a cama agora.', destaque: 'ins Bett (das Bett)' },
      { de: 'Wir gehen ins Theater.', pt: 'Nós vamos ao teatro.', destaque: 'ins Theater (das Theater)' },
      { de: 'Ich stecke das Geld ins Portemonnaie.', pt: 'Eu coloco o dinheiro na carteira.', destaque: 'ins Portemonnaie (das Portemonnaie)' },
    ],
    armadilhaBrasileiro: 'Nunca use "ins" para masculino (in den Supermarkt), nem para feminino (in die Schule), nem para plural (in die Alpen). "ins" pertence unicamente ao gênero neutro.',
  },
  {
    id: 'prep-4-aus',
    numero: '4',
    preposicao: 'aus',
    titulo: 'aus — Origem de Dentro de um Espaço ou País (Woher? — De onde?)',
    casoRegente: 'Sempre Dativ (Dativo absoluto)',
    significadoPrincipal: '"de", "vindo de dentro de", "natural de"',
    regraPratica: 'Use aus para saída física de recintos fechados (edifícios, salas, caixas), ou para nacionalidade/cidade natal/país de origem.',
    tabelaContracoes: [
      {
        genero: 'Países neutros sem artigo',
        artigoOriginal: '—',
        contracao: 'aus + Nome',
        exemploDe: 'Ich komme aus Deutschland / aus Brasilien / aus Italien.',
        exemploPt: 'Venho da Alemanha / do Brasil / da Itália.',
      },
      {
        genero: 'Países femininos com artigo',
        artigoOriginal: 'der (Dativo)',
        contracao: 'aus der + Nome',
        exemploDe: 'Ich komme aus der Schweiz / aus der Türkei / aus der Ukraine.',
        exemploPt: 'Venho da Suíça / da Turquia / da Ucrânia.',
      },
      {
        genero: 'Países masculinos com artigo',
        artigoOriginal: 'dem (Dativo)',
        contracao: 'aus dem + Nome',
        exemploDe: 'Er kommt aus dem Iran / aus dem Irak / aus dem Libanon.',
        exemploPt: 'Ele vem do Irã / do Iraque / do Líbano.',
      },
      {
        genero: 'Países plurais com artigo',
        artigoOriginal: 'den (Dativo)',
        contracao: 'aus den + Nome',
        exemploDe: 'Sie kommen aus den USA / aus den Niederlanden.',
        exemploPt: 'Eles vêm dos EUA / dos Países Baixos.',
      },
    ],
    exemplosExtras: [
      { de: 'Er kommt gerade aus dem Haus.', pt: 'Ele acabou de sair de dentro da casa.', destaque: 'aus dem Haus' },
      { de: 'Wir kommen aus dem Kino.', pt: 'Estamos saindo do cinema.', destaque: 'aus dem Kino' },
      { de: 'Sie nimmt die Flasche aus dem Kühlschrank.', pt: 'Ela tira a garrafa de dentro da geladeira.', destaque: 'aus dem Kühlschrank' },
      { de: 'Aus welcher Stadt kommst du?', pt: 'De qual cidade você vem?', destaque: 'Aus welcher Stadt' },
      { de: 'Der Rauch kommt aus dem Fenster.', pt: 'A fumaça está saindo de dentro da janela.', destaque: 'aus dem Fenster' },
    ],
    armadilhaBrasileiro: 'Trava de contraste fundamental: Em português usamos "de" para tudo ("venho de casa", "venho do médico", "venho do Brasil"). Em alemão: aus = de dentro de um espaço físico ou país. von = de uma pessoa ou evento.',
  },
  {
    id: 'prep-5-zu',
    numero: '5',
    preposicao: 'zu',
    titulo: 'zu — Direção a Pessoas, Instituições e Lugares Específicos',
    casoRegente: 'Sempre Dativ (Dativo absoluto)',
    significadoPrincipal: '"para", "em direção a", "ao encontro de"',
    regraPratica: 'Use zu sempre que o destino for uma pessoa, um profissional, uma empresa, uma festa/evento ou um edifício funcional específico.',
    tabelaContracoes: [
      {
        genero: 'Masculino: zu + dem = zum',
        artigoOriginal: 'dem',
        contracao: 'zum',
        exemploDe: 'Ich gehe zum Arzt / zum Bahnhof / zum Flughafen.',
        exemploPt: 'Vou ao médico / à estação / ao aeroporto.',
      },
      {
        genero: 'Feminino: zu + der = zur',
        artigoOriginal: 'der',
        contracao: 'zur',
        exemploDe: 'Ich gehe zur Post / zur Bank / zur Arbeit / zur Polizei.',
        exemploPt: 'Vou aos correios / ao banco / ao trabalho / à polícia.',
      },
      {
        genero: 'Neutro: zu + dem = zum',
        artigoOriginal: 'dem',
        contracao: 'zum',
        exemploDe: 'Ich gehe zum Rathaus / zum Bürgeramt / zum Konzert.',
        exemploPt: 'Vou à prefeitura / ao posto de atendimento / ao concerto.',
      },
      {
        genero: 'Plural: zu + den',
        artigoOriginal: 'den',
        contracao: 'zu den',
        exemploDe: 'Ich fahre am Wochenende zu den Eltern / zu den Großeltern.',
        exemploPt: 'No fim de semana vou aos pais / aos avós.',
      },
    ],
    exemplosExtras: [
      { de: 'Ich gehe heute zu Maria.', pt: 'Hoje vou à casa da Maria.', destaque: 'zu Maria (pessoa: sem artigo)' },
      { de: 'Kommst du mit zu mir?', pt: 'Você vem comigo para minha casa?', destaque: 'zu mir (pronome dativo)' },
      { de: 'Wir müssen dringend zum Tierarzt.', pt: 'Temos que ir urgentemente ao veterinário.', destaque: 'zum Tierarzt' },
      { de: 'Sie fährt jeden Morgen zur Universität.', pt: 'Ela vai toda manhã à universidade.', destaque: 'zur Universität' },
      { de: 'Wie komme ich zum Bahnhof?', pt: 'Como chego à estação ferroviária?', destaque: 'zum Bahnhof' },
    ],
    armadilhaBrasileiro: 'Não use "nach" para pessoas ou edifícios! *"Ich gehe nach Arzt"* ou *"Ich gehe nach Post"* é totalmente errado. Pessoas e instituições exigem zu + Dativo (zum Arzt, zur Post).',
  },
  {
    id: 'prep-6-zum',
    numero: '6',
    preposicao: 'zum',
    titulo: 'zum — A Contração Obrigatória de zu + dem',
    casoRegente: 'Dativ (Masculino e Neutro)',
    significadoPrincipal: '"ao", "para o" (movimento em direção a elemento masculino/neutro)',
    regraPratica: 'Obrigatório para substantivos masculinos e neutros quando nos dirigimos a uma pessoa, serviço, evento ou marco urbano.',
    exemplosExtras: [
      { de: 'Ich gehe zum Friseur.', pt: 'Vou ao cabeleireiro.', destaque: 'zum Friseur (der Friseur)' },
      { de: 'Er geht zum Chef.', pt: 'Ele vai ao chefe.', destaque: 'zum Chef (der Chef)' },
      { de: 'Wir fahren zum Bahnhof.', pt: 'Vamos à estação de trem.', destaque: 'zum Bahnhof (der Bahnhof)' },
      { de: 'Ich bringe das Auto zum Mechaniker.', pt: 'Levo o carro ao mecânico.', destaque: 'zum Mechaniker (der Mechaniker)' },
      { de: 'Kommen Sie doch zum Abendessen!', pt: 'Venha para o jantar!', destaque: 'zum Abendessen (das Abendessen)' },
      { de: 'Wir gehen zum Fußballspiel.', pt: 'Nós vamos à partida de futebol.', destaque: 'zum Fußballspiel (das Spiel)' },
    ],
    armadilhaBrasileiro: 'Lembre-se: zum = zu + dem. Portanto, nunca diga *"zum Post"*, pois Post é feminina (die Post -> zur Post).',
  },
  {
    id: 'prep-7-zur',
    numero: '7',
    preposicao: 'zur',
    titulo: 'zur — A Contração Obrigatória de zu + der',
    casoRegente: 'Dativ (Feminino)',
    significadoPrincipal: '"à", "para a" (movimento em direção a elemento feminino)',
    regraPratica: 'Obrigatório para todos os destinos femininos (die -> der no Dativo: zu + der = zur).',
    exemplosExtras: [
      { de: 'Ich muss heute zur Bank gehen.', pt: 'Tenho que ir ao banco hoje.', destaque: 'zur Bank (die Bank)' },
      { de: 'Er fährt jeden Tag zur Arbeit.', pt: 'Ele vai todo dia ao trabalho.', destaque: 'zur Arbeit (die Arbeit)' },
      { de: 'Wir bringen den Brief zur Post.', pt: 'Levamos a carta aos correios.', destaque: 'zur Post (die Post)' },
      { de: 'Sie geht zur Apotheke.', pt: 'Ela vai à farmácia.', destaque: 'zur Apotheke (die Apotheke)' },
      { de: 'Kommst du zur Party?', pt: 'Você vem à festa?', destaque: 'zur Party (die Party)' },
      { de: 'Der Schüler geht zur Tafel.', pt: 'O aluno vai ao quadro negro.', destaque: 'zur Tafel (die Tafel)' },
    ],
    armadilhaBrasileiro: 'Use zur exclusivamente para palavras femininas. Para neutro e masculino use sempre zum (zum Rathaus, zum Markt).',
  },
  {
    id: 'prep-8-nach',
    numero: '8',
    preposicao: 'nach',
    titulo: 'nach — Direção a Cidades, Países sem Artigo, Continentes e Casa',
    casoRegente: 'Dativ (sem artigo aparente na maioria dos casos)',
    significadoPrincipal: '"para" (destinos geográficos amplos e expressão fixa)',
    regraPratica: 'Use nach apenas para cidades, países sem artigo, continentes, pontos cardeais e a expressão única "nach Hause" (ir para casa).',
    exemplosExtras: [
      { de: 'Ich fliege morgen nach Berlin.', pt: 'Voo amanhã para Berlim.', destaque: 'nach Berlin (cidade)' },
      { de: 'Wir reisen im Juli nach Deutschland.', pt: 'Viajamos em julho para a Alemanha.', destaque: 'nach Deutschland (país sem artigo)' },
      { de: 'Er möchte nach Japan reisen.', pt: 'Ele gostaria de viajar para o Japão.', destaque: 'nach Japan (país sem artigo)' },
      { de: 'Die Zugvögel fliegen nach Süden.', pt: 'As aves migratórias voam para o sul.', destaque: 'nach Süden (ponto cardeal)' },
      { de: 'Ich bin müde, ich gehe jetzt nach Hause.', pt: 'Estou cansado, vou para casa agora.', destaque: 'nach Hause (expressão fixa de movimento)' },
      { de: 'Er fährt nach München und dann nach Wien.', pt: 'Ele vai para Munique e depois para Viena.', destaque: 'nach München / nach Wien' },
    ],
    armadilhaBrasileiro: 'Distinção crucial de sobrevivência: "nach Hause" = movimento de ir para casa. "zu Hause" = estar estático em casa. Nunca misture os dois!',
  },
  {
    id: 'prep-9-an',
    numero: '9',
    preposicao: 'an / am / ans',
    titulo: 'an — Contato Vertical e Proximidade de Fronteira Líquida',
    casoRegente: 'Wechselpräposition (Dativo = am / an der | Acusativo = ans / an den)',
    significadoPrincipal: '"em", "junto a", "na parede", "à margem de", "no litoral"',
    regraPratica: 'an indica contato com superfície vertical (parede, quadro, porta) ou proximidade imediata de água (mar, praia, rio, lago, janela).',
    tabelaContracoes: [
      {
        genero: 'Contato Vertical: Parede (die Wand)',
        artigoOriginal: 'der (Dativo) / die (Acusativo)',
        contracao: 'an der (Wo?) / an die (Wohin?)',
        exemploDe: 'Das Bild hängt an der Wand. | Ich hänge das Bild an die Wand.',
        exemploPt: 'O quadro está na parede. | Eu penduro o quadro na parede.',
      },
      {
        genero: 'Fronteira Líquida: Mar (das Meer)',
        artigoOriginal: 'dem (Dativo) / das (Acusativo)',
        contracao: 'am (Wo?) / ans (Wohin?)',
        exemploDe: 'Ich mache Urlaub am Meer. | Wir fahren ans Meer.',
        exemploPt: 'Passo férias no mar. | Nós vamos para o mar.',
      },
      {
        genero: 'Posição à Mesa: Tisch (der Tisch)',
        artigoOriginal: 'dem (Dativo) / den (Acusativo)',
        contracao: 'am (Wo?) / an den (Wohin?)',
        exemploDe: 'Wir sitzen am Tisch. | Setz dich an den Tisch!',
        exemploPt: 'Estamos sentados à mesa. | Sente-se à mesa!',
      },
    ],
    exemplosExtras: [
      { de: 'Der Vater steht am Fenster.', pt: 'O pai está junto à janela.', destaque: 'am Fenster (an + dem)' },
      { de: 'Wir spazieren am Strand.', pt: 'Nós passeamos na praia.', destaque: 'am Strand (der Strand)' },
      { de: 'Er wartet an der Bushaltestelle.', pt: 'Ele espera no ponto de ônibus.', destaque: 'an der Bushaltestelle' },
      { de: 'Ich treffe dich am Bahnhofseingang.', pt: 'Encontro você na entrada da estação.', destaque: 'am Eingang' },
      { de: 'Frankfurt liegt am Main.', pt: 'Frankfurt fica às margens do rio Meno.', destaque: 'am Main (rio)' },
    ],
    armadilhaBrasileiro: 'Não confunda "an" com "auf"! Na parede (vertical) é "an der Wand". Na mesa (horizontal superior) é "auf dem Tisch". Estar sentado à mesa com os pés no chão é "am Tisch".',
  },
  {
    id: 'prep-10-auf',
    numero: '10',
    preposicao: 'auf / aufs',
    titulo: 'auf — Contato Horizontal, Superfícies e Espaços Abertos',
    casoRegente: 'Wechselpräposition (Dativo = auf dem / auf der | Acusativo = aufs / auf den)',
    significadoPrincipal: '"em cima de", "sobre", "no" (espaço aberto, praça, campo, ilha)',
    regraPratica: 'auf exige superfície horizontal superior (mesa, chão, telhado) ou locais abertos/elevados (praça, mercado ao ar livre, campo, ilhas).',
    tabelaContracoes: [
      {
        genero: 'Superfície: Mesa (der Tisch)',
        artigoOriginal: 'dem (Dativo) / den (Acusativo)',
        contracao: 'auf dem (Wo?) / auf den (Wohin?)',
        exemploDe: 'Das Glas steht auf dem Tisch. | Ich stelle das Glas auf den Tisch.',
        exemploPt: 'O copo está sobre a mesa. | Ponho o copo sobre a mesa.',
      },
      {
        genero: 'Local Aberto: Campo (das Land)',
        artigoOriginal: 'dem (Dativo) / das (Acusativo)',
        contracao: 'auf dem (Wo?) / aufs (Wohin?)',
        exemploDe: 'Ich wohne auf dem Land. | Wir ziehen aufs Land.',
        exemploPt: 'Moro no campo (interior). | Nos mudamos para o campo.',
      },
      {
        genero: 'Mercado de Rua: Markt (der Markt)',
        artigoOriginal: 'dem (Dativo) / den (Acusativo)',
        contracao: 'auf dem (Wo?) / auf den (Wohin?)',
        exemploDe: 'Ich kaufe Obst auf dem Markt. | Ich gehe auf den Markt.',
        exemploPt: 'Compro frutas na feira. | Vou à feira livre.',
      },
    ],
    exemplosExtras: [
      { de: 'Die Katze schläft auf dem Sofa.', pt: 'O gato dorme sobre o sofá.', destaque: 'auf dem Sofa' },
      { de: 'Das Heft liegt auf dem Boden.', pt: 'O caderno está caído no chão.', destaque: 'auf dem Boden' },
      { de: 'Er macht Urlaub auf einer Insel.', pt: 'Ele passa férias em uma ilha.', destaque: 'auf einer Insel' },
      { de: 'Der Teller steht auf dem Küchentisch.', pt: 'O prato está sobre a mesa da cozinha.', destaque: 'auf dem Küchentisch' },
      { de: 'Die Kinder spielen auf dem Spielplatz.', pt: 'As crianças brincam no parquinho.', destaque: 'auf dem Spielplatz' },
    ],
    armadilhaBrasileiro: 'Cuidado com "auf dem Land" (no interior/campo) e "auf die Bank" (sentar no banco de praça). Já no banco financeiro, diz-se "in die Bank" ou "zur Bank".',
  },
  {
    id: 'prep-11-bei',
    numero: '11',
    preposicao: 'bei / beim',
    titulo: 'bei — Permanência Junto a Pessoas, Empresas e Profissionais',
    casoRegente: 'Sempre Dativ (Dativo absoluto)',
    significadoPrincipal: '"na casa de", "com", "na empresa de", "durante a consulta em"',
    regraPratica: 'bei responde estritamente a "Wo?". Indica permanência física na residência de alguém, vínculo empregatício em uma empresa, ou presença num atendimento profissional.',
    tabelaContracoes: [
      {
        genero: 'Masculino/Neutro: bei + dem = beim',
        artigoOriginal: 'dem',
        contracao: 'beim',
        exemploDe: 'Ich bin beim Arzt / beim Friseur / beim Bäcker.',
        exemploPt: 'Estou no consultório do médico / no cabeleireiro / na padaria.',
      },
      {
        genero: 'Empresas corporativas (sem artigo)',
        artigoOriginal: '—',
        contracao: 'bei + Nome',
        exemploDe: 'Ich arbeite bei Siemens / bei BMW / bei Bosch.',
        exemploPt: 'Trabalho na Siemens / na BMW / na Bosch.',
      },
      {
        genero: 'Pessoas e família',
        artigoOriginal: 'den / mir / dir',
        contracao: 'bei + Dativo',
        exemploDe: 'Ich wohne bei meinen Eltern. / Er übernachtet bei mir.',
        exemploPt: 'Moro com meus pais. / Ele pernoita na minha casa.',
      },
    ],
    exemplosExtras: [
      { de: 'Ich bin gerade beim Zahnarzt.', pt: 'Estou no dentista agora.', destaque: 'beim Zahnarzt' },
      { de: 'Sie feiert Geburtstag bei ihrer Freundin.', pt: 'Ela comemora o aniversário na casa da amiga.', destaque: 'bei ihrer Freundin' },
      { de: 'Wir essen heute bei Oma.', pt: 'Hoje almoçamos na casa da vovó.', destaque: 'bei Oma' },
      { de: 'Er hat ein Praktikum bei Google.', pt: 'Ele está fazendo estágio na Google.', destaque: 'bei Google' },
      { de: 'Bleibst du heute Nacht bei mir?', pt: 'Você fica esta noite na minha casa?', destaque: 'bei mir' },
    ],
    armadilhaBrasileiro: 'Nunca use "bei" para indicar movimento! *"Ich gehe beim Arzt"* é inaceitável. O correto é "Ich gehe zum Arzt" (movimento -> zu). E quando você já estiver lá: "Ich bin beim Arzt" (estático -> bei).',
  },
  {
    id: 'prep-12-von',
    numero: '12',
    preposicao: 'von / vom',
    titulo: 'von — Origem e Ponto de Partida de Pessoas, Eventos e Serviços',
    casoRegente: 'Sempre Dativ (Dativo absoluto)',
    significadoPrincipal: '"de", "vindo de uma pessoa", "saindo de um serviço/evento"',
    regraPratica: 'von responde a "Woher?" para procedência de pessoas, consultas, reuniões, trabalhos ou descolamento de superfícies.',
    tabelaContracoes: [
      {
        genero: 'Masculino/Neutro: von + dem = vom',
        artigoOriginal: 'dem',
        contracao: 'vom',
        exemploDe: 'Ich komme vom Arzt / vom Bahnhof / vom Markt / vom Sport.',
        exemploPt: 'Venho do médico / da estação / da feira / do esporte.',
      },
      {
        genero: 'Feminino: von + der',
        artigoOriginal: 'der',
        contracao: 'von der',
        exemploDe: 'Ich komme von der Arbeit / von der Post / von der Schule.',
        exemploPt: 'Venho do trabalho / dos correios / da escola.',
      },
      {
        genero: 'Pessoas e Nomes próprios',
        artigoOriginal: '—',
        contracao: 'von + Nome',
        exemploDe: 'Ich komme gerade von Maria / von Thomas / von meinen Eltern.',
        exemploPt: 'Venho agora da casa de Maria / de Thomas / dos meus pais.',
      },
    ],
    exemplosExtras: [
      { de: 'Er kommt spät vom Büro nach Hause.', pt: 'Ele chega tarde do escritório em casa.', destaque: 'vom Büro' },
      { de: 'Ich habe einen Brief von meiner Schwester bekommen.', pt: 'Recebi uma carta da minha irmã.', destaque: 'von meiner Schwester' },
      { de: 'Das Flugzeug kommt von links.', pt: 'O avião vem pela esquerda.', destaque: 'von links' },
      { de: 'Der Ball rollt vom Tisch.', pt: 'A bola rola de cima da mesa.', destaque: 'vom Tisch (descolamento de superfície)' },
      { de: 'Sie kommt gerade vom Einkaufen.', pt: 'Ela acabou de voltar das compras.', destaque: 'vom Einkaufen' },
    ],
    armadilhaBrasileiro: 'Lembre-se do par simétrico: Se você vai "zum Arzt", você volta "vom Arzt". Se você vai "ins Kino", você volta "aus dem Kino". Se você vai "zu Maria", você volta "von Maria"!',
  },
];

// ==========================================
// PARTE III — TABELA RESUMO COMPLETA
// ==========================================
export interface MatrixRow {
  preposicao: string;
  caso: string;
  significado: string;
  exemploDe: string;
  exemploPt: string;
  categoria: 'in-im-ins' | 'aus-von-vom' | 'zu-zum-zur' | 'an-am-ans' | 'auf-aufs' | 'bei-beim' | 'nach';
}

export const TABELA_RESUMO_COMPLETA: MatrixRow[] = [
  {
    preposicao: 'in',
    caso: 'Dativo (Wo?)',
    significado: 'dentro de (posição estática)',
    exemploDe: 'Ich bin in der Schule.',
    exemploPt: 'Estou dentro da escola.',
    categoria: 'in-im-ins',
  },
  {
    preposicao: 'in',
    caso: 'Acusativo (Wohin?)',
    significado: 'para dentro de (movimento)',
    exemploDe: 'Ich gehe in die Schule.',
    exemploPt: 'Vou para a escola.',
    categoria: 'in-im-ins',
  },
  {
    preposicao: 'im',
    caso: 'Dativo (Wo?)',
    significado: 'in + dem (masc./neutro estático)',
    exemploDe: 'Ich bin im Kino / im Büro.',
    exemploPt: 'Estou no cinema / no escritório.',
    categoria: 'in-im-ins',
  },
  {
    preposicao: 'ins',
    caso: 'Acusativo (Wohin?)',
    significado: 'in + das (neutro em movimento)',
    exemploDe: 'Ich gehe ins Kino / ins Haus.',
    exemploPt: 'Vou ao cinema / para dentro de casa.',
    categoria: 'in-im-ins',
  },
  {
    preposicao: 'aus',
    caso: 'Dativo (Woher?)',
    significado: 'de dentro de (espaço, país, cidade)',
    exemploDe: 'Ich komme aus dem Haus / aus Brasilien.',
    exemploPt: 'Venho de dentro da casa / do Brasil.',
    categoria: 'aus-von-vom',
  },
  {
    preposicao: 'zu',
    caso: 'Dativo (Wohin?)',
    significado: 'para (pessoas, instituições, eventos)',
    exemploDe: 'Ich gehe zu Maria / zu den Eltern.',
    exemploPt: 'Vou à Maria / aos pais.',
    categoria: 'zu-zum-zur',
  },
  {
    preposicao: 'zum',
    caso: 'Dativo (Wohin?)',
    significado: 'zu + dem (masc./neutro)',
    exemploDe: 'Ich gehe zum Arzt / zum Bahnhof.',
    exemploPt: 'Vou ao médico / à estação.',
    categoria: 'zu-zum-zur',
  },
  {
    preposicao: 'zur',
    caso: 'Dativo (Wohin?)',
    significado: 'zu + der (feminino)',
    exemploDe: 'Ich gehe zur Post / zur Arbeit.',
    exemploPt: 'Vou aos correios / ao trabalho.',
    categoria: 'zu-zum-zur',
  },
  {
    preposicao: 'nach',
    caso: 'Dativo (Wohin?)',
    significado: 'para cidades, países sem artigo e casa',
    exemploDe: 'Ich fahre nach Berlin / nach Hause.',
    exemploPt: 'Vou para Berlim / vou para casa.',
    categoria: 'nach',
  },
  {
    preposicao: 'an',
    caso: 'Dativo (Wo?)',
    significado: 'junto a, em contato vertical',
    exemploDe: 'Das Bild hängt an der Wand.',
    exemploPt: 'O quadro está na parede.',
    categoria: 'an-am-ans',
  },
  {
    preposicao: 'an',
    caso: 'Acusativo (Wohin?)',
    significado: 'para junto de, para a parede',
    exemploDe: 'Ich hänge das Bild an die Wand.',
    exemploPt: 'Penduro o quadro na parede.',
    categoria: 'an-am-ans',
  },
  {
    preposicao: 'am',
    caso: 'Dativo (Wo?)',
    significado: 'an + dem (beira d’água, mesa, janela)',
    exemploDe: 'Ich sitze am Tisch / am Fenster.',
    exemploPt: 'Estou sentado à mesa / na janela.',
    categoria: 'an-am-ans',
  },
  {
    preposicao: 'ans',
    caso: 'Acusativo (Wohin?)',
    significado: 'an + das (em direção à beira d’água)',
    exemploDe: 'Wir fahren ans Meer.',
    exemploPt: 'Vamos para a beira do mar.',
    categoria: 'an-am-ans',
  },
  {
    preposicao: 'auf',
    caso: 'Dativo (Wo?)',
    significado: 'sobre superfície horizontal, espaço aberto',
    exemploDe: 'Das Buch liegt auf dem Tisch.',
    exemploPt: 'O livro está sobre a mesa.',
    categoria: 'auf-aufs',
  },
  {
    preposicao: 'auf',
    caso: 'Acusativo (Wohin?)',
    significado: 'para cima de superfície, para feira/ilha',
    exemploDe: 'Ich lege das Buch auf den Tisch.',
    exemploPt: 'Coloco o livro sobre a mesa.',
    categoria: 'auf-aufs',
  },
  {
    preposicao: 'bei',
    caso: 'Dativo (Wo?)',
    significado: 'na casa de, com alguém, na empresa de',
    exemploDe: 'Ich wohne bei meinen Eltern / bei Siemens.',
    exemploPt: 'Moro com meus pais / na Siemens.',
    categoria: 'bei-beim',
  },
  {
    preposicao: 'beim',
    caso: 'Dativo (Wo?)',
    significado: 'bei + dem (no atendimento de)',
    exemploDe: 'Ich bin beim Arzt / beim Bäcker.',
    exemploPt: 'Estou no médico / na padaria.',
    categoria: 'bei-beim',
  },
  {
    preposicao: 'von',
    caso: 'Dativo (Woher?)',
    significado: 'de (pessoa, evento ou superfície)',
    exemploDe: 'Ich komme von Maria / von der Arbeit.',
    exemploPt: 'Venho da casa de Maria / do trabalho.',
    categoria: 'aus-von-vom',
  },
  {
    preposicao: 'vom',
    caso: 'Dativo (Woher?)',
    significado: 'von + dem (do profissional/evento)',
    exemploDe: 'Ich komme vom Arzt / vom Bahnhof.',
    exemploPt: 'Venho do médico / da estação.',
    categoria: 'aus-von-vom',
  },
];

// ==========================================
// PARTE IV — AS 4 REGRAS PRÁTICAS PARA NUNCA ERRAR
// ==========================================
export const QUATRO_REGRAS_PRATICAS = [
  {
    passo: 'Regra 1',
    titulo: 'Identifique a Pergunta Central',
    descricao: 'Descubra a intenção da frase: você está parado (Wo?), indo em direção (Wohin?) ou partindo (Woher?)',
    detalhes: [
      { pergunta: 'Wo? (Onde?)', caso: 'Dativ', preps: 'in, an, auf, bei, unter, über, neben, vor, hinter' },
      { pergunta: 'Wohin? (Para onde?)', caso: 'Akkusativ / Dativ especial', preps: 'in, an, auf (com Akkusativ) | zu, nach (com Dativ)' },
      { pergunta: 'Woher? (De onde?)', caso: 'Dativ', preps: 'aus (de dentro/país) | von (de pessoa/evento)' },
    ],
  },
  {
    passo: 'Regra 2',
    titulo: 'Identifique o Gênero e o Caso do Substantivo',
    descricao: 'Aplique a tabela de declinação do artigo definido correspondente ao caso identificado na Regra 1.',
    detalhes: [
      { caso: 'Dativ (Wo? / Woher? / zu / nach)', masc: 'dem', fem: 'der', neutro: 'dem', plural: 'den (+n)' },
      { caso: 'Akkusativ (Wohin? com Wechselpräpositionen)', masc: 'den', fem: 'die', neutro: 'das', plural: 'die' },
    ],
  },
  {
    passo: 'Regra 3',
    titulo: 'Aplique a Contração Obrigatória',
    descricao: 'Na língua alemã culta e falada, preposição + artigo contraem-se compulsoriamente:',
    detalhes: [
      { fusao: 'in + dem = im', contexto: 'Masc./Neutro Dativ (estático)' },
      { fusao: 'in + das = ins', contexto: 'Neutro Akkusativ (movimento)' },
      { fusao: 'zu + dem = zum', contexto: 'Masc./Neutro Dativ (direção)' },
      { fusao: 'zu + der = zur', contexto: 'Feminino Dativ (direção)' },
      { fusao: 'bei + dem = beim', contexto: 'Masc./Neutro Dativ (estático)' },
      { fusao: 'von + dem = vom', contexto: 'Masc./Neutro Dativ (origem)' },
      { fusao: 'an + dem = am', contexto: 'Masc./Neutro Dativ (borda/parede)' },
      { fusao: 'an + das = ans', contexto: 'Neutro Akkusativ (direção à borda)' },
    ],
  },
  {
    passo: 'Regra 4',
    titulo: 'Escolha a Preposição Correta pelo Contexto Real',
    descricao: 'Evite a tradução literal do português "em", "para" e "de". Cada contexto alemão exige sua preposição exclusiva:',
    detalhes: [
      { contexto: 'Dentro de recinto (estático)', escolha: 'in + Dativo (im Kino / in der Schule)' },
      { contexto: 'Para dentro de recinto (movimento)', escolha: 'in + Acusativo (ins Kino / in die Schule)' },
      { contexto: 'De dentro de recinto ou país', escolha: 'aus + Dativo (aus dem Kino / aus Deutschland)' },
      { contexto: 'Para pessoas, serviços e eventos', escolha: 'zu + Dativo (zum Arzt / zur Post / zu Maria)' },
      { contexto: 'Para cidades e países sem artigo', escolha: 'nach (nach Berlin / nach Brasilien)' },
      { contexto: 'Para países com artigo definido', escolha: 'in + Acusativo (in die Schweiz / in die USA)' },
      { contexto: 'Superfície vertical ou margem de água', escolha: 'an (an der Wand / am Meer / ans Meer)' },
      { contexto: 'Superfície horizontal ou área aberta', escolha: 'auf (auf dem Tisch / auf den Markt)' },
      { contexto: 'Permanência na casa/empresa de alguém', escolha: 'bei + Dativo (bei mir / bei Siemens / beim Arzt)' },
      { contexto: 'Origem de pessoas, serviços ou eventos', escolha: 'von + Dativo (vom Arzt / von Maria)' },
    ],
  },
];

// ==========================================
// PARTE V — EXERCÍCIOS DE FIXAÇÃO
// ==========================================
export interface FillExerciseItem {
  id: number;
  fraseAntes: string;
  fraseDepois: string;
  gabarito: string;
  explicacao: string;
  fraseCompletaDe: string;
  frasePt: string;
}

export const EXERCICIO_1_IN_ITEMS: FillExerciseItem[] = [
  {
    id: 1,
    fraseAntes: 'Ich bin',
    fraseDepois: 'Kino.',
    gabarito: 'im',
    explicacao: 'Kino é neutro (das Kino). Responde a "Wo?" (estático) -> in + dem = im.',
    fraseCompletaDe: 'Ich bin im Kino.',
    frasePt: 'Estou no cinema.',
  },
  {
    id: 2,
    fraseAntes: 'Ich gehe',
    fraseDepois: 'Kino.',
    gabarito: 'ins',
    explicacao: 'Kino é neutro (das Kino). Responde a "Wohin?" (movimento) -> in + das = ins.',
    fraseCompletaDe: 'Ich gehe ins Kino.',
    frasePt: 'Vou ao cinema.',
  },
  {
    id: 3,
    fraseAntes: 'Ich wohne',
    fraseDepois: 'Schweiz.',
    gabarito: 'in der',
    explicacao: 'die Schweiz é feminino. Responde a "Wo?" (estático) -> in + der = in der.',
    fraseCompletaDe: 'Ich wohne in der Schweiz.',
    frasePt: 'Moro na Suíça.',
  },
  {
    id: 4,
    fraseAntes: 'Ich fahre',
    fraseDepois: 'Schweiz.',
    gabarito: 'in die',
    explicacao: 'die Schweiz é feminino. Responde a "Wohin?" (movimento) -> in + die = in die.',
    fraseCompletaDe: 'Ich fahre in die Schweiz.',
    frasePt: 'Vou para a Suíça.',
  },
  {
    id: 5,
    fraseAntes: 'Ich lebe',
    fraseDepois: 'USA.',
    gabarito: 'in den',
    explicacao: 'die USA é plural. Responde a "Wo?" (estático) -> in + den = in den.',
    fraseCompletaDe: 'Ich lebe in den USA.',
    frasePt: 'Vivo nos EUA.',
  },
  {
    id: 6,
    fraseAntes: 'Ich fliege',
    fraseDepois: 'USA.',
    gabarito: 'in die',
    explicacao: 'die USA é plural. Responde a "Wohin?" (movimento) -> in + die = in die.',
    fraseCompletaDe: 'Ich fliege in die USA.',
    frasePt: 'Voo para os EUA.',
  },
  {
    id: 7,
    fraseAntes: 'Ich bin',
    fraseDepois: 'Schule.',
    gabarito: 'in der',
    explicacao: 'die Schule é feminino. Responde a "Wo?" (estático) -> in + der = in der.',
    fraseCompletaDe: 'Ich bin in der Schule.',
    frasePt: 'Estou na escola.',
  },
  {
    id: 8,
    fraseAntes: 'Ich gehe',
    fraseDepois: 'Schule.',
    gabarito: 'in die',
    explicacao: 'die Schule é feminino. Responde a "Wohin?" (movimento) -> in + die = in die.',
    fraseCompletaDe: 'Ich gehe in die Schule.',
    frasePt: 'Vou à escola.',
  },
  {
    id: 9,
    fraseAntes: 'Ich bin',
    fraseDepois: 'Büro.',
    gabarito: 'im',
    explicacao: 'das Büro é neutro. Responde a "Wo?" (estático) -> in + dem = im.',
    fraseCompletaDe: 'Ich bin im Büro.',
    frasePt: 'Estou no escritório.',
  },
  {
    id: 10,
    fraseAntes: 'Ich gehe',
    fraseDepois: 'Büro.',
    gabarito: 'ins',
    explicacao: 'das Büro é neutro. Responde a "Wohin?" (movimento) -> in + das = ins.',
    fraseCompletaDe: 'Ich gehe ins Büro.',
    frasePt: 'Vou para o escritório.',
  },
  {
    id: 11,
    fraseAntes: 'Wir gehen am Samstag',
    fraseDepois: 'Supermarkt.',
    gabarito: 'in den',
    explicacao: 'der Supermarkt é masculino. Responde a "Wohin?" (movimento) -> in + den (Akkusativ).',
    fraseCompletaDe: 'Wir gehen am Samstag in den Supermarkt.',
    frasePt: 'Nós vamos no sábado ao supermercado.',
  },
  {
    id: 12,
    fraseAntes: 'Meine Tante arbeitet',
    fraseDepois: 'Türkei.',
    gabarito: 'in der',
    explicacao: 'die Türkei é feminino. Responde a "Wo?" -> in + der (Dativ).',
    fraseCompletaDe: 'Meine Tante arbeitet in der Türkei.',
    frasePt: 'Minha tia trabalha na Turquia.',
  },
  {
    id: 13,
    fraseAntes: 'Er reist geschäftlich',
    fraseDepois: 'Iran.',
    gabarito: 'in den',
    explicacao: 'der Iran é masculino. Responde a "Wohin?" -> in + den (Akkusativ).',
    fraseCompletaDe: 'Er reist geschäftlich in den Iran.',
    frasePt: 'Ele viaja a negócios para o Irã.',
  },
  {
    id: 14,
    fraseAntes: 'Das Kind legt das Spielzeug',
    fraseDepois: 'Karton.',
    gabarito: 'in den',
    explicacao: 'der Karton é masculino. Ação de colocar dentro (Wohin?) -> in + den.',
    fraseCompletaDe: 'Das Kind legt das Spielzeug in den Karton.',
    frasePt: 'A criança coloca o brinquedo na caixa de papelão.',
  },
];

export const EXERCICIO_2_AUS_ITEMS: FillExerciseItem[] = [
  {
    id: 1,
    fraseAntes: 'Ich komme',
    fraseDepois: 'Brasilien.',
    gabarito: 'aus',
    explicacao: 'Brasilien é país neutro sem artigo. Origem geográfica -> aus + Nome.',
    fraseCompletaDe: 'Ich komme aus Brasilien.',
    frasePt: 'Venho do Brasil.',
  },
  {
    id: 2,
    fraseAntes: 'Ich komme',
    fraseDepois: 'Arzt.',
    gabarito: 'vom',
    explicacao: 'der Arzt é pessoa/profissional. Origem de consulta/pessoa -> von + dem = vom.',
    fraseCompletaDe: 'Ich komme vom Arzt.',
    frasePt: 'Venho do médico.',
  },
  {
    id: 3,
    fraseAntes: 'Ich gehe',
    fraseDepois: 'Arzt.',
    gabarito: 'zum',
    explicacao: 'der Arzt é profissional masculino. Direção a pessoa -> zu + dem = zum.',
    fraseCompletaDe: 'Ich gehe zum Arzt.',
    frasePt: 'Vou ao médico.',
  },
  {
    id: 4,
    fraseAntes: 'Ich gehe',
    fraseDepois: 'Post.',
    gabarito: 'zur',
    explicacao: 'die Post é feminino. Direção a instituição funcional -> zu + der = zur.',
    fraseCompletaDe: 'Ich gehe zur Post.',
    frasePt: 'Vou aos correios.',
  },
  {
    id: 5,
    fraseAntes: 'Ich fahre',
    fraseDepois: 'Berlin.',
    gabarito: 'nach',
    explicacao: 'Berlin é cidade sem artigo. Direção a cidades -> nach + Nome.',
    fraseCompletaDe: 'Ich fahre nach Berlin.',
    frasePt: 'Vou para Berlim.',
  },
  {
    id: 6,
    fraseAntes: 'Ich fahre',
    fraseDepois: 'Schweiz.',
    gabarito: 'in die',
    explicacao: 'die Schweiz tem artigo feminino obrigatório! Não use nach. Movimento -> in die Schweiz.',
    fraseCompletaDe: 'Ich fahre in die Schweiz.',
    frasePt: 'Vou para a Suíça.',
  },
  {
    id: 7,
    fraseAntes: 'Ich komme',
    fraseDepois: 'Maria.',
    gabarito: 'von',
    explicacao: 'Maria é pessoa física sem artigo. Origem de pessoa -> von + Nome.',
    fraseCompletaDe: 'Ich komme von Maria.',
    frasePt: 'Venho da casa de Maria.',
  },
  {
    id: 8,
    fraseAntes: 'Ich gehe',
    fraseDepois: 'Maria.',
    gabarito: 'zu',
    explicacao: 'Maria é pessoa física sem artigo. Direção a pessoa -> zu + Nome.',
    fraseCompletaDe: 'Ich gehe zu Maria.',
    frasePt: 'Vou à casa de Maria.',
  },
  {
    id: 9,
    fraseAntes: 'Ich komme',
    fraseDepois: 'Bahnhof.',
    gabarito: 'vom',
    explicacao: 'der Bahnhof é ponto de partida de serviço urbano -> von + dem = vom.',
    fraseCompletaDe: 'Ich komme vom Bahnhof.',
    frasePt: 'Venho da estação.',
  },
  {
    id: 10,
    fraseAntes: 'Ich gehe',
    fraseDepois: 'Bahnhof.',
    gabarito: 'zum',
    explicacao: 'der Bahnhof é destino masculino de serviço -> zu + dem = zum.',
    fraseCompletaDe: 'Ich gehe zum Bahnhof.',
    frasePt: 'Vou à estação.',
  },
  {
    id: 11,
    fraseAntes: 'Die Delegation reist morgen',
    fraseDepois: 'Japan.',
    gabarito: 'nach',
    explicacao: 'Japan é país sem artigo. Direção -> nach.',
    fraseCompletaDe: 'Die Delegation reist morgen nach Japan.',
    frasePt: 'A delegação viaja amanhã para o Japão.',
  },
  {
    id: 12,
    fraseAntes: 'Sie holt die Kinder',
    fraseDepois: 'Schule ab.',
    gabarito: 'von der',
    explicacao: 'die Schule. Buscar crianças saindo da escola -> von der Schule.',
    fraseCompletaDe: 'Sie holt die Kinder von der Schule ab.',
    frasePt: 'Ela busca as crianças na escola.',
  },
  {
    id: 13,
    fraseAntes: 'Er nimmt das Fleisch',
    fraseDepois: 'Kühlschrank.',
    gabarito: 'aus dem',
    explicacao: 'der Kühlschrank. Tirar de dentro de um recinto fechado -> aus dem Kühlschrank.',
    fraseCompletaDe: 'Er nimmt das Fleisch aus dem Kühlschrank.',
    frasePt: 'Ele tira a carne de dentro da geladeira.',
  },
  {
    id: 14,
    fraseAntes: 'Wann fliegst du',
    fraseDepois: 'USA?',
    gabarito: 'in die',
    explicacao: 'die USA é plural. Direção para país com artigo -> in die USA.',
    fraseCompletaDe: 'Wann fliegst du in die USA?',
    frasePt: 'Quando você voa para os EUA?',
  },
];

export const EXERCICIO_3_AN_AUF_ITEMS: FillExerciseItem[] = [
  {
    id: 1,
    fraseAntes: 'Das Bild hängt',
    fraseDepois: 'Wand.',
    gabarito: 'an der',
    explicacao: 'die Wand é superfície vertical. Posição estática (Wo?) -> an + der = an der.',
    fraseCompletaDe: 'Das Bild hängt an der Wand.',
    frasePt: 'O quadro está pendurado na parede.',
  },
  {
    id: 2,
    fraseAntes: 'Ich hänge das Bild',
    fraseDepois: 'Wand.',
    gabarito: 'an die',
    explicacao: 'die Wand é superfície vertical. Ação de pendurar (Wohin?) -> an + die = an die.',
    fraseCompletaDe: 'Ich hänge das Bild an die Wand.',
    frasePt: 'Eu penduro o quadro na parede.',
  },
  {
    id: 3,
    fraseAntes: 'Das Buch liegt',
    fraseDepois: 'Tisch.',
    gabarito: 'auf dem',
    explicacao: 'der Tisch é superfície horizontal. Posição estática (Wo?) -> auf + dem = auf dem.',
    fraseCompletaDe: 'Das Buch liegt auf dem Tisch.',
    frasePt: 'O livro está deitado sobre a mesa.',
  },
  {
    id: 4,
    fraseAntes: 'Ich lege das Buch',
    fraseDepois: 'Tisch.',
    gabarito: 'auf den',
    explicacao: 'der Tisch é superfície horizontal. Ação de colocar sobre (Wohin?) -> auf + den = auf den.',
    fraseCompletaDe: 'Ich lege das Buch auf den Tisch.',
    frasePt: 'Eu coloco o livro sobre a mesa.',
  },
  {
    id: 5,
    fraseAntes: 'Ich wohne',
    fraseDepois: 'meinen Eltern.',
    gabarito: 'bei',
    explicacao: 'Residência com pessoas/família (Wo?) -> bei + Dativ (meinen Eltern).',
    fraseCompletaDe: 'Ich wohne bei meinen Eltern.',
    frasePt: 'Moro com meus pais.',
  },
  {
    id: 6,
    fraseAntes: 'Ich bin gerade',
    fraseDepois: 'Arzt.',
    gabarito: 'beim',
    explicacao: 'der Arzt. Permanência estática no consultório do profissional (Wo?) -> bei + dem = beim.',
    fraseCompletaDe: 'Ich bin gerade beim Arzt.',
    frasePt: 'Estou no consultório do médico agora.',
  },
  {
    id: 7,
    fraseAntes: 'Ich fahre im Sommer',
    fraseDepois: 'Meer.',
    gabarito: 'ans',
    explicacao: 'das Meer é borda líquida. Movimento em direção à praia/mar (Wohin?) -> an + das = ans.',
    fraseCompletaDe: 'Ich fahre im Sommer ans Meer.',
    frasePt: 'No verão eu vou para o mar.',
  },
  {
    id: 8,
    fraseAntes: 'Ich verbringe den Urlaub',
    fraseDepois: 'Meer.',
    gabarito: 'am',
    explicacao: 'das Meer. Permanência junto ao mar (Wo?) -> an + dem = am.',
    fraseCompletaDe: 'Ich verbringe den Urlaub am Meer.',
    frasePt: 'Passo as férias no mar.',
  },
  {
    id: 9,
    fraseAntes: 'Wir sitzen gemütlich',
    fraseDepois: 'Tisch und frühstücken.',
    gabarito: 'am',
    explicacao: 'Estar sentado à mesa pronto para comer/trabalhar -> an + dem = am Tisch.',
    fraseCompletaDe: 'Wir sitzen gemütlich am Tisch und frühstücken.',
    frasePt: 'Estamos sentados confortavelmente à mesa e tomando café.',
  },
  {
    id: 10,
    fraseAntes: 'Die Kaffeetasse steht',
    fraseDepois: 'Schreibtisch.',
    gabarito: 'auf dem',
    explicacao: 'der Schreibtisch. A xícara está apoiada na superfície horizontal superior -> auf dem.',
    fraseCompletaDe: 'Die Kaffeetasse steht auf dem Schreibtisch.',
    frasePt: 'A xícara de café está sobre a escrivaninha.',
  },
  {
    id: 11,
    fraseAntes: 'Der Bus hält direkt',
    fraseDepois: 'Bahnhof.',
    gabarito: 'am',
    explicacao: 'Parar junto à estação (contato de fronteira) -> am Bahnhof.',
    fraseCompletaDe: 'Der Bus hält direkt am Bahnhof.',
    frasePt: 'O ônibus para diretamente junto à estação.',
  },
  {
    id: 12,
    fraseAntes: 'Meine Großmutter lebt glücklich',
    fraseDepois: 'Land.',
    gabarito: 'auf dem',
    explicacao: 'das Land no sentido de campo/interior -> auf dem Land.',
    fraseCompletaDe: 'Meine Großmutter lebt glücklich auf dem Land.',
    frasePt: 'Minha avó vive feliz no campo.',
  },
];

// ==========================================
// EXERCÍCIO 4 — DETECTOR DE CASO E PERGUNTA
// ==========================================
export interface CaseDetectorItem {
  id: number;
  frase: string;
  perguntaEsperada: 'Wo?' | 'Wohin?' | 'Woher?';
  casoEsperado: 'Dativ' | 'Akkusativ';
  preposicaoUsada: string;
  traducao: string;
  justificativa: string;
}

export const EXERCICIO_4_CASE_DETECTOR: CaseDetectorItem[] = [
  {
    id: 1,
    frase: 'Wir spazieren am Flussufer.',
    perguntaEsperada: 'Wo?',
    casoEsperado: 'Dativ',
    preposicaoUsada: 'am (an + dem)',
    traducao: 'Passeamos na margem do rio.',
    justificativa: 'O passeio ocorre dentro do mesmo espaço, sem mudança de localidade.',
  },
  {
    id: 2,
    frase: 'Er fährt mit dem Auto in die Schweiz.',
    perguntaEsperada: 'Wohin?',
    casoEsperado: 'Akkusativ',
    preposicaoUsada: 'in die',
    traducao: 'Ele vai de carro para a Suíça.',
    justificativa: 'Movimento com travessia de fronteira em direção a um país feminino.',
  },
  {
    id: 3,
    frase: 'Sie kommt gerade vom Zahnarzt.',
    perguntaEsperada: 'Woher?',
    casoEsperado: 'Dativ',
    preposicaoUsada: 'vom (von + dem)',
    traducao: 'Ela acabou de vir do dentista.',
    justificativa: 'Origem de um atendimento profissional pessoal.',
  },
  {
    id: 4,
    frase: 'Ich stelle die Blumenvase auf das Fensterbrett.',
    perguntaEsperada: 'Wohin?',
    casoEsperado: 'Akkusativ',
    preposicaoUsada: 'auf das (aufs)',
    traducao: 'Coloco o vaso de flores sobre o peitoril da janela.',
    justificativa: 'Ação de mover e pousar um objeto sobre superfície horizontal.',
  },
  {
    id: 5,
    frase: 'Er arbeitet seit fünf Jahren bei Siemens.',
    perguntaEsperada: 'Wo?',
    casoEsperado: 'Dativ',
    preposicaoUsada: 'bei',
    traducao: 'Ele trabalha há cinco anos na Siemens.',
    justificativa: 'Vínculo estático em empresa/empregador.',
  },
  {
    id: 6,
    frase: 'Flug LH 204 kommt aus Tokio.',
    perguntaEsperada: 'Woher?',
    casoEsperado: 'Dativ',
    preposicaoUsada: 'aus',
    traducao: 'O voo LH 204 vem de Tóquio.',
    justificativa: 'Procedência e ponto de partida de cidade/país.',
  },
];

// ==========================================
// EXERCÍCIO 5 — TRADUÇÃO REVERSA DE BLINDAGEM (20 FRASES)
// ==========================================
export interface ReverseTranslationItem {
  id: number;
  pt: string;
  de: string;
  preposicaoChave: string;
  dicaGramatical: string;
}

export const EXERCICIO_5_TRADUCAO_REVERSA: ReverseTranslationItem[] = [
  {
    id: 1,
    pt: 'Estou no escritório e trabalho no computador.',
    de: 'Ich bin im Büro und arbeite am Computer.',
    preposicaoChave: 'im Büro (Wo? Dativ) | am Computer (contato tela/borda)',
    dicaGramatical: 'das Büro -> in + dem = im. der Computer -> an + dem = am.',
  },
  {
    id: 2,
    pt: 'Eu vou para a cama agora porque estou exausto.',
    de: 'Ich gehe jetzt ins Bett, weil ich erschöpft bin.',
    preposicaoChave: 'ins Bett (Wohin? Akkusativ)',
    dicaGramatical: 'das Bett -> in + das = ins.',
  },
  {
    id: 3,
    pt: 'Meu irmão mora na Suíça há dois anos.',
    de: 'Mein Bruder wohnt seit zwei Jahren in der Schweiz.',
    preposicaoChave: 'in der Schweiz (Wo? Dativ)',
    dicaGramatical: 'die Schweiz é feminina; no Dativo vira der.',
  },
  {
    id: 4,
    pt: 'Nós voamos para os EUA nas próximas férias.',
    de: 'Wir fliegen in den nächsten Ferien in die USA.',
    preposicaoChave: 'in die USA (Wohin? Akkusativ)',
    dicaGramatical: 'die USA é plural; no Acusativo mantém die.',
  },
  {
    id: 5,
    pt: 'De onde você vem? — Eu venho do Brasil.',
    de: 'Woher kommst du? — Ich komme aus Brasilien.',
    preposicaoChave: 'aus Brasilien (Woher? Dativ)',
    dicaGramatical: 'Brasilien não tem artigo; usa-se apenas aus.',
  },
  {
    id: 6,
    pt: 'Eu venho do médico agora e vou para casa.',
    de: 'Ich komme jetzt vom Arzt und gehe nach Hause.',
    preposicaoChave: 'vom Arzt (Woher?) | nach Hause (Wohin?)',
    dicaGramatical: 'von + dem = vom. Ir para casa é sempre a expressão fixa "nach Hause".',
  },
  {
    id: 7,
    pt: 'Você tem que ir aos correios hoje?',
    de: 'Musst du heute zur Post gehen?',
    preposicaoChave: 'zur Post (Wohin? Dativ)',
    dicaGramatical: 'die Post -> zu + der = zur.',
  },
  {
    id: 8,
    pt: 'Como eu chego à estação central de trem?',
    de: 'Wie komme ich zum Hauptbahnhof?',
    preposicaoChave: 'zum Hauptbahnhof (Wohin? Dativ)',
    dicaGramatical: 'der Hauptbahnhof -> zu + dem = zum.',
  },
  {
    id: 9,
    pt: 'Amanhã nós viajamos para Berlim e Munique.',
    de: 'Morgen reisen wir nach Berlin und München.',
    preposicaoChave: 'nach Berlin / nach München (Wohin?)',
    dicaGramatical: 'Cidades não usam artigo; usa-se rigorosamente nach.',
  },
  {
    id: 10,
    pt: 'O espelho está na parede no corredor.',
    de: 'Der Spiegel hängt an der Wand im Flur.',
    preposicaoChave: 'an der Wand (Wo? Dativ) | im Flur (Wo? Dativ)',
    dicaGramatical: 'die Wand é vertical -> an der. der Flur -> in + dem = im.',
  },
  {
    id: 11,
    pt: 'Eu penduro o quadro na parede.',
    de: 'Ich hänge das Bild an die Wand.',
    preposicaoChave: 'an die Wand (Wohin? Akkusativ)',
    dicaGramatical: 'Movimento de pendurar (Wohin?) -> an die.',
  },
  {
    id: 12,
    pt: 'A chave está sobre a mesa na cozinha.',
    de: 'Der Schlüssel liegt auf dem Tisch in der Küche.',
    preposicaoChave: 'auf dem Tisch (Wo? Dativ) | in der Küche (Wo? Dativ)',
    dicaGramatical: 'der Tisch é horizontal -> auf dem. die Küche -> in der.',
  },
  {
    id: 13,
    pt: 'Coloque a chave sobre a mesa, por favor!',
    de: 'Lege den Schlüssel bitte auf den Tisch!',
    preposicaoChave: 'auf den Tisch (Wohin? Akkusativ)',
    dicaGramatical: 'Ação de colocar sobre (Wohin?) -> auf den.',
  },
  {
    id: 14,
    pt: 'Ele mora com os pais dele em Hamburgo.',
    de: 'Er wohnt bei seinen Eltern in Hamburg.',
    preposicaoChave: 'bei seinen Eltern (Wo? Dativ) | in Hamburg (Wo?)',
    dicaGramatical: 'Morar na casa de alguém -> bei + Dativ plural.',
  },
  {
    id: 15,
    pt: 'Ela trabalha como engenheira na BMW em Munique.',
    de: 'Sie arbeitet als Ingenieurin bei BMW in München.',
    preposicaoChave: 'bei BMW (empresa corporativa)',
    dicaGramatical: 'Empregador/empresa é sempre bei + Nome.',
  },
  {
    id: 16,
    pt: 'Nós estamos agora no mar e aproveitamos o sol.',
    de: 'Wir sind jetzt am Meer und genießen die Sonne.',
    preposicaoChave: 'am Meer (Wo? Dativ)',
    dicaGramatical: 'das Meer -> an + dem = am.',
  },
  {
    id: 17,
    pt: 'No próximo verão nós vamos para o mar.',
    de: 'Im nächsten Sommer fahren wir ans Meer.',
    preposicaoChave: 'ans Meer (Wohin? Akkusativ)',
    dicaGramatical: 'das Meer -> an + das = ans.',
  },
  {
    id: 18,
    pt: 'Ela está sentada à mesa da cozinha.',
    de: 'Sie sitzt am Küchentisch.',
    preposicaoChave: 'am Küchentisch (Wo? Dativ)',
    dicaGramatical: 'Estar sentado à mesa é an + dem = am.',
  },
  {
    id: 19,
    pt: 'Ela acabou de sair da casa da Maria.',
    de: 'Sie kommt gerade von Maria.',
    preposicaoChave: 'von Maria (Woher? Dativ)',
    dicaGramatical: 'Origem de pessoa física -> von + Nome.',
  },
  {
    id: 20,
    pt: 'Estamos cansados, por isso ficamos em casa hoje.',
    de: 'Wir sind müde, deshalb bleiben wir heute zu Hause.',
    preposicaoChave: 'zu Hause (permanência estática)',
    dicaGramatical: 'Estar em casa estático é sempre "zu Hause".',
  },
];

// ==========================================
// PARTE VI — AS DICAS FINAIS E DIÁLOGOS DE OURO
// ==========================================
export interface PrepositionDialogue {
  id: string;
  cenario: string;
  local: string;
  falas: {
    locutor: string;
    de: string;
    pt: string;
    preposicaoDestaque: string;
  }[];
}

export const DIALOGOS_PREPOSICOES: PrepositionDialogue[] = [
  {
    id: 'dialogo-1-flughafen',
    cenario: 'No Aeroporto de Frankfurt (Flughafen)',
    local: 'Terminal de Desembarque & Alfândega',
    falas: [
      {
        locutor: 'Zöllner (Policial)',
        de: 'Guten Tag. Woher kommen Sie und wohin reisen Sie?',
        pt: 'Bom dia. De onde o senhor vem e para onde está viajando?',
        preposicaoDestaque: 'Woher? / wohin?',
      },
      {
        locutor: 'Passagier (Passageiro)',
        de: 'Ich komme aus Brasilien und fliege nach Berlin.',
        pt: 'Eu venho do Brasil e estou voando para Berlim.',
        preposicaoDestaque: 'aus Brasilien / nach Berlin',
      },
      {
        locutor: 'Zöllner',
        de: 'Wohnen Sie in Berlin oder fahren Sie weiter in die Schweiz?',
        pt: 'O senhor mora em Berlim ou segue viagem para a Suíça?',
        preposicaoDestaque: 'in Berlin / in die Schweiz',
      },
      {
        locutor: 'Passagier',
        de: 'Ich wohne in Berlin, aber meine Frau arbeitet in der Schweiz.',
        pt: 'Eu moro em Berlim, mas minha esposa trabalha na Suíça.',
        preposicaoDestaque: 'in Berlin / in der Schweiz',
      },
    ],
  },
  {
    id: 'dialogo-2-arzt',
    cenario: 'Consulta Médica e Farmácia',
    local: 'Consultório do Clínico Geral & Farmácia',
    falas: [
      {
        locutor: 'Thomas',
        de: 'Hallo Anna! Wo warst du heute Vormittag?',
        pt: 'Olá Anna! Onde você estava hoje pela manhã?',
        preposicaoDestaque: 'Wo?',
      },
      {
        locutor: 'Anna',
        de: 'Ich war beim Arzt und jetzt gehe ich schnell zur Apotheke.',
        pt: 'Eu estive no médico e agora vou depressa à farmácia.',
        preposicaoDestaque: 'beim Arzt / zur Apotheke',
      },
      {
        locutor: 'Thomas',
        de: 'Gehst du danach direkt nach Hause?',
        pt: 'Você vai depois direto para casa?',
        preposicaoDestaque: 'nach Hause',
      },
      {
        locutor: 'Anna',
        de: 'Nein, ich muss noch zu meiner Mutter und dann ins Büro.',
        pt: 'Não, ainda tenho que ir à casa da minha mãe e depois ao escritório.',
        preposicaoDestaque: 'zu meiner Mutter / ins Büro',
      },
    ],
  },
  {
    id: 'dialogo-3-orientierung',
    cenario: 'Pedindo Informações no Centro da Cidade',
    local: 'Praça Central (Am Marktplatz)',
    falas: [
      {
        locutor: 'Tourist (Turista)',
        de: 'Entschuldigung, wie komme ich von hier zum Bahnhof?',
        pt: 'Com licença, como chego daqui até a estação de trem?',
        preposicaoDestaque: 'von hier / zum Bahnhof',
      },
      {
        locutor: 'Passant (Pedestre)',
        de: 'Gehen Sie geradeaus an der Post vorbei und dann nach links.',
        pt: 'Vá em frente, passe pelos correios e depois vire à esquerda.',
        preposicaoDestaque: 'an der Post / nach links',
      },
      {
        locutor: 'Tourist',
        de: 'Gibt es ein gutes Café auf dem Weg?',
        pt: 'Há um bom café no caminho?',
        preposicaoDestaque: 'auf dem Weg',
      },
      {
        locutor: 'Passant',
        de: 'Ja, am Flussufer gibt es das Café Müller, direkt am Wasser.',
        pt: 'Sim, na margem do rio há o Café Müller, bem junto à água.',
        preposicaoDestaque: 'am Flussufer / am Wasser',
      },
    ],
  },
];
