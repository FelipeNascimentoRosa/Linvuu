// Página «Aulas de russo online com professores» (/russo-online): uma só fonte para a tela, o <head> e o HTML do servidor.
// Só entra aqui o que tem documento: diploma e certificados de russo da Universidade Estatal de São Petersburgo e o perfil
// público do LinkedIn (só o que diz respeito ao russo; nunca citar outra escola ou instituto). Valores e horários não são anunciados: são combinados no contato.
import { whatsappUrl } from './contato.ts';
import { SPOTIFY_PLAYLIST_RU } from './social.ts';

export type TextoAulasRusso = {
  titulo: string;
  descricao: string;
  lead: string;
  /** Para quem as aulas servem: público real, sem promessa que a página não cumpre. */
  paraQuemTitulo: string;
  paraQuem: string[];
  /** Perguntas frequentes: cada resposta é um facto verificável do produto (curso, formato, agenda). Preço, horário e
   * duração nunca aparecem aqui — são combinados no contato, como diz o topo deste arquivo. */
  faqTitulo: string;
  faq: { p: string; r: string }[];
  quemTitulo: string;
  credenciais: string[];
  /** Relatos reais de alunos, textos exatamente como publicados na Udemy. Só em português (idioma original). */
  relatosTitulo?: string;
  relatosFonte?: string;
  relatos?: { nome: string; texto: string }[];
  playlistTitulo: string;
  playlist: string;
  playlistBotao: string;
  playlistUrl: string;
  comoTitulo: string;
  como: string[];
  testeTitulo: string;
  teste: string;
  testeLink: string;
  ctaTitulo: string;
  cta: string;
  ctaBotao: string;
  ctaMensagem: string;
  ctaAlternativa: string;
};

export const AULAS_RUSSO: Record<'pt-BR' | 'en', TextoAulasRusso> = {
  'pt-BR': {
    titulo: 'Aulas de russo online, ao vivo com professor',
    descricao: 'Aulas de russo por videochamada, em horários combinados com você, e o curso de russo da Linvuu entre as aulas: gramática explicada e áudio em cada frase.',
    lead: 'A aula é onde o russo vira conversa. O curso é onde estão a gramática e o áudio, aula por aula, para a hora com o professor ser gasta falando — não copiando tabela.',
    paraQuemTitulo: 'Para quem são as aulas',
    paraQuem: [
      'Quem começa do zero: o alfabeto cirílico é a primeira coisa que o curso ensina, e a aula segue a mesma ordem — você não precisa chegar sabendo nada.',
      'Quem já lê russo e trava na hora de falar: a aula é o lugar da fala, com alguém corrigindo na hora.',
      'Quem se prepara para o TRKI, a prova de proficiência em russo, do B2 ao C2.',
      'Quem ouviu russo em casa a vida inteira e nunca estudou a gramática: os casos e os verbos de movimento, finalmente em ordem.',
    ],
    faqTitulo: 'Perguntas frequentes',
    faq: [
      { p: 'Preciso saber o alfabeto cirílico antes da primeira aula?', r: 'Não. O alfabeto é a primeira aula do curso de russo da Linvuu, com áudio em cada letra, e as aulas seguem a mesma sequência.' },
      { p: 'Como os horários são combinados?', r: 'Diretamente com a gente: você diz o seu fuso horário e os dias que funcionam, e fechamos a agenda. Horário e valor não ficam fixos nesta página porque dependem da frequência que você quer.' },
      { p: 'O que eu estudo entre as aulas?', r: 'O curso de russo da Linvuu: 78 aulas e 312 sessões, gramática explicada passo a passo, áudio em cada frase e exercícios com correção. As duas primeiras aulas são grátis, sem cartão.' },
      { p: 'A aula é a mesma coisa que o curso?', r: 'Não. O curso é o que você estuda sozinho, com áudio e exercícios. A aula é ao vivo, por videochamada, e trabalha o que você estudou: pronúncia, conversa e as dúvidas que só um professor resolve.' },
      { p: 'Onde as aulas acontecem?', r: 'Online, por videochamada, de onde você estiver. Não há sala nem deslocamento: basta uma conexão e onde anotar.' },
    ],
    quemTitulo: 'Os professores',
    credenciais: [
      'Felipe Rosa: vencedor (diploma de 1º grau) da III Olimpíada Internacional Online de Russo como Língua Estrangeira da Universidade Estatal de São Petersburgo (SPbGU), em 25/11/2022.',
      'Felipe Rosa: participou da série de master classes «Preparação para o TRKI, de B2 a C2» (24 horas) do Centro de Testes de Língua da SPbGU, em junho de 2021.',
      'Felipe Rosa: apresentou a palestra «Preparação para o TRKI (TORFL) usando plataforma EAD» no seminário on-line da SPbGU, em 26/06/2021.',
    ],
    relatosTitulo: 'O que alunos dizem',
    relatosFonte: 'Avaliações de 5 estrelas do curso «Russo para Brasileiros: do Zero ao A2» na Udemy (nota média 4,74, 72 avaliações, em 07/11/2026). Textos exatamente como publicados; nomes abreviados.',
    relatos: [
      { nome: 'Lucas L.', texto: 'Os professores são extremamente didáticos e os vídeos apresentam uma ótima qualidade de imagem e áudio' },
      { nome: 'Paulo Henrique S.', texto: 'O curso tem sido sensacional, eu estou gostando muito das explicações. Vocês estão de parabéns!' },
      { nome: 'Ana Maria L.', texto: 'O curso é bem completo, os professores são bem atenciosos e me enviaram o material das aulas por whatsapp.' },
      { nome: 'Naelson P.', texto: 'Bem completo e professores simpáticos!' },
      { nome: 'Herica M.', texto: 'Curso excelente e com valor acessível. Recomendo!' },
      { nome: 'Priscila Z.', texto: 'Melhores professores, didática e método que realmente funcionam! Indico demais.' },
      { nome: 'Paola Renata O.', texto: 'excelente material, com professores capacitados que realmente te ensinam russo. muito obrigada!' },
    ],
    playlistTitulo: 'Ouça russo enquanto estuda',
    playlist: 'A Linvuu montou uma playlist no Spotify com músicas em russo separadas por nível. Hoje há a seleção avançada, e novas faixas e níveis entram aos poucos.',
    playlistBotao: 'Abrir a playlist no Spotify',
    playlistUrl: SPOTIFY_PLAYLIST_RU,
    comoTitulo: 'Como funcionam as aulas',
    como: [
      'Você conta o seu nível e o seu objetivo: uma viagem, o trabalho, uma prova, a família.',
      'Combinamos a agenda no seu fuso horário e nos encontramos por videochamada.',
      'Entre as aulas você continua no curso de russo da Linvuu, e a aula seguinte começa onde a anterior parou.',
    ],
    testeTitulo: 'Experimente antes',
    teste: 'As duas primeiras aulas do curso de russo são grátis, sem cartão. Veja o método antes de conversar.',
    testeLink: 'Ver o curso de russo',
    ctaTitulo: 'Peça informações',
    cta: 'Formato, horários e valores são combinados diretamente. Conte seu objetivo e seu nível de russo.',
    ctaBotao: 'Falar pelo WhatsApp',
    ctaMensagem: 'Olá! Vi a página de aulas de russo online da Linvuu e quero saber como funcionam as aulas.',
    ctaAlternativa: 'Prefere e-mail ou outro canal? Veja a página de contato.',
  },
  en: {
    titulo: 'Russian classes online, live with a teacher',
    descricao: 'Russian classes by video call, at times arranged with you, plus the Linvuu Russian course between classes: grammar explained in English and audio throughout.',
    lead: 'A class is where Russian turns into conversation. The course is where the grammar and the audio live, lesson by lesson, so the time with the teacher goes on speaking instead of copying tables.',
    paraQuemTitulo: 'Who the classes are for',
    paraQuem: [
      'Complete beginners: the Cyrillic alphabet is the first thing the course teaches, and the classes follow the same order, so nothing is expected of you on day one.',
      'Learners who can read Russian but freeze the moment they have to speak: the class is where the speaking happens, with someone correcting it on the spot.',
      'Anyone preparing for TORFL (TRKI), the Russian proficiency exam, at levels B2 to C2.',
      'Heritage speakers who heard Russian at home all their lives and never studied the grammar: the cases and the verbs of motion, finally in order.',
    ],
    faqTitulo: 'Common questions',
    faq: [
      { p: 'Do I need to know the Cyrillic alphabet before the first class?', r: 'No. The alphabet is the first lesson of the Linvuu Russian course, with audio for every letter, and the classes follow the same sequence.' },
      { p: 'How are class times arranged?', r: 'Directly with us: you tell us your time zone and the days that work, and we agree on a schedule. Times and prices are not fixed on this page because they depend on how often you want classes.' },
      { p: 'What do I study between classes?', r: 'The Linvuu Russian course: 78 lessons and 312 sessions, grammar explained step by step, audio in every phrase and exercises with correction. The first two lessons are free, and no card is needed to open them.' },
      { p: 'Is a class the same thing as the course?', r: 'No. The course is what you study on your own, with audio and exercises. The class is live, by video call, and works on what you studied: pronunciation, conversation and the questions only a teacher can answer.' },
      { p: 'Where do the classes happen?', r: 'Online, by video call, from wherever you are. No classroom, no travel: you need a connection and something to take notes on.' },
    ],
    quemTitulo: 'The teachers',
    credenciais: [
      'Felipe Rosa: winner (1st-degree diploma) of the 3rd SPbU International Online Olympiad in Russian as a Foreign Language, St Petersburg State University, 25 November 2022.',
      'Felipe Rosa: took part in the SPbU workshop series «Preparing for TORFL, B2 to C2» (24 hours), St Petersburg University Language Testing Centre, June 2021.',
      'Felipe Rosa: gave the talk «Preparing for TORFL using a distance-learning platform» at the SPbU online seminar, 26 June 2021.',
    ],
    playlistTitulo: 'Listen to Russian while you study',
    playlist: 'Linvuu has a Spotify playlist of Russian songs sorted by level. The advanced selection is up now, and more tracks and levels are added over time.',
    playlistBotao: 'Open the playlist on Spotify',
    playlistUrl: SPOTIFY_PLAYLIST_RU,
    comoTitulo: 'How the classes work',
    como: [
      'You tell us your level and what you need Russian for: a trip, work, an exam, family.',
      'We agree on a schedule in your time zone and meet by video call.',
      'Between classes you keep going in the Linvuu Russian course, so the next class starts where the last one stopped.',
    ],
    testeTitulo: 'Try it first',
    teste: 'The first two lessons of the Russian course are free, no card needed. See the method before we talk.',
    testeLink: 'See the Russian course',
    ctaTitulo: 'Ask for details',
    cta: 'Format, schedule and prices are arranged directly. Tell us your goal and your current level of Russian.',
    ctaBotao: 'Message on WhatsApp',
    ctaMensagem: 'Hello! I saw the online Russian lessons page on Linvuu and would like to know how the lessons work.',
    ctaAlternativa: 'Prefer email or another channel? See the contact page.',
  },
};

export const whatsappAulasRusso = (cod: 'pt-BR' | 'en') => whatsappUrl(AULAS_RUSSO[cod].ctaMensagem);
