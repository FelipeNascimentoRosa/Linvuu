// Página «Aulas de russo online com professores» (/russo-online): uma só fonte para a tela, o <head> e o HTML do servidor.
// Só entra aqui o que tem documento: diploma e certificados de russo da Universidade Estatal de São Petersburgo e o perfil
// público do LinkedIn (só o que diz respeito ao russo; nunca citar outra escola ou instituto). Valores e horários não são anunciados: são combinados no contato.
import { whatsappUrl } from './contato.ts';

export type TextoAulasRusso = {
  titulo: string;
  descricao: string;
  lead: string;
  quemTitulo: string;
  credenciais: string[];
  /** Relatos reais de alunos, textos exatamente como publicados na Udemy. Só em português (idioma original). */
  relatosTitulo?: string;
  relatosFonte?: string;
  relatos?: { nome: string; texto: string }[];
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
    titulo: 'Aulas de russo online com professores',
    descricao: 'Aulas de russo ao vivo por videochamada com professores da Linvuu, junto com o curso de russo online.',
    lead: 'Aprenda russo com professores, ao vivo, por videochamada, e estude entre as aulas no curso de russo da Linvuu.',
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
    comoTitulo: 'Como funcionam as aulas',
    como: [
      'Aulas ao vivo por videochamada, em horários combinados com você.',
      'Entre uma aula e outra, você estuda no curso de russo da Linvuu: alfabeto, gramática explicada em português e áudio em cada frase.',
      'Serve para quem começa do zero, para quem quer destravar a conversa e para quem se prepara para o TRKI, a prova de proficiência em russo.',
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
    titulo: 'Online Russian lessons with teachers',
    descricao: 'Live online Russian lessons by video call with Linvuu teachers, alongside the online Russian course.',
    lead: 'Learn Russian with teachers, live, by video call, and study between lessons with the Linvuu Russian course.',
    quemTitulo: 'The teachers',
    credenciais: [
      'Felipe Rosa: winner (1st-degree diploma) of the 3rd SPbU International Online Olympiad in Russian as a Foreign Language, St Petersburg State University, 25 November 2022.',
      'Felipe Rosa: took part in the SPbU workshop series «Preparing for TORFL, B2 to C2» (24 hours), St Petersburg University Language Testing Centre, June 2021.',
      'Felipe Rosa: gave the talk «Preparing for TORFL using a distance-learning platform» at the SPbU online seminar, 26 June 2021.',
    ],
    comoTitulo: 'How the lessons work',
    como: [
      'Live lessons by video call, at times we agree on together.',
      'Between lessons you study with the Linvuu Russian course: the alphabet, grammar explained step by step and audio for every phrase.',
      'For complete beginners, for learners who want to start speaking, and for anyone preparing for TRKI, the Russian proficiency exam.',
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
