// Página «Aulas de russo online com professores» (/russo-online): uma só fonte para a tela, o <head> e o HTML do servidor.
// Só entra aqui o que tem documento: diploma e certificados da Universidade Estatal de São Petersburgo, certificado do
// Instituto Valeeva Rosa e perfil público do LinkedIn. Valores e horários não são anunciados: são combinados no contato.
import { whatsappUrl } from './contato.ts';

export type TextoAulasRusso = {
  titulo: string;
  descricao: string;
  lead: string;
  quemTitulo: string;
  credenciais: string[];
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
    descricao: 'Aulas de russo ao vivo por videochamada, com professores da Linvuu. Entre eles, um vencedor da Olimpíada Internacional Online de Russo da Universidade de São Petersburgo.',
    lead: 'Aprenda russo com professores, ao vivo, por videochamada. Entre eles, um vencedor da Olimpíada Internacional Online de Russo como Língua Estrangeira da Universidade Estatal de São Petersburgo.',
    quemTitulo: 'Os professores',
    credenciais: [
      'Um dos professores venceu, com diploma de 1º grau, a III Olimpíada Internacional Online de Russo como Língua Estrangeira da Universidade Estatal de São Petersburgo (novembro de 2022).',
      'Palestra «Preparação para o TRKI (TORFL) usando plataforma EAD» apresentada em seminário do Centro de Testes de Proficiência da Universidade Estatal de São Petersburgo (junho de 2021).',
      'Experiência no Instituto Valeeva Rosa, escola membro da Associação de Escolas Russas no Exterior (2024).',
      'Professores de línguas, com intérprete de russo e formação em matemática na equipe. Aulas em português ou em inglês.',
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
    descricao: 'Live online Russian lessons by video call with Linvuu teachers, including a winner of the Saint Petersburg State University International Online Russian Olympiad.',
    lead: 'Learn Russian with teachers, live, by video call. Among them, a winner of the III International Online Olympiad in Russian as a Foreign Language at Saint Petersburg State University.',
    quemTitulo: 'The teachers',
    credenciais: [
      'One of the teachers won a first-degree diploma at the III International Online Olympiad in Russian as a Foreign Language, Saint Petersburg State University (November 2022).',
      'Talk “Preparing for TRKI (TORFL) using a distance-learning platform” given at a seminar of the Russian Language Testing Center, Saint Petersburg State University (June 2021).',
      'Experience at Instituto Valeeva Rosa, a school that is a member of the Association of Russian Schools Abroad (2024).',
      'Language teachers, with a Russian interpreter and a mathematics background on the team. Lessons in English or Portuguese.',
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
