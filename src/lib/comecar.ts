// Guia "Como começar", na tela inicial e no HTML entregue ao Google (metaRota.ts). Só fatos que o site cumpre hoje.
export interface Comecar {
  kicker: string; titulo: string; lead: string;
  passos: { n: string; t: string; d: string }[];
  mapaTitulo: string;
  /** `id` liga ao destino em Home.tsx; `soPt` esconde o item fora do site em português. */
  mapa: { id: 'cursos' | 'gramatica' | 'livros' | 'duvidas'; t: string; d: string; soPt?: boolean }[];
  dica: string;
}

export const COMECAR: Record<'pt-BR' | 'en', Comecar> = {
  'pt-BR': {
    kicker: 'Primeiros passos', titulo: 'Como começar na Linvuu', lead: 'Quatro passos, sem cadastro e sem cartão.',
    passos: [
      { n: '01', t: 'Escolha o idioma', d: 'Inglês, espanhol, alemão, francês, italiano ou russo. Todas as explicações são em português.' },
      { n: '02', t: 'Abra a primeira sessão', d: 'Cada sessão dura cerca de 30 minutos e vem em blocos curtos: leia, toque em Continuar e siga no seu ritmo. As duas primeiras aulas de cada curso são grátis.' },
      { n: '03', t: 'Ouça e repita em voz alta', d: 'Toque no ícone de alto-falante ao lado de qualquer palavra, frase ou diálogo. Ouça primeiro e repita depois: o idioma entra pelo ouvido.' },
      { n: '04', t: 'Pratique e acompanhe', d: 'Os exercícios são corrigidos na hora, com a explicação do erro. Marque a sessão como concluída; ao entrar na sua conta, o progresso fica salvo em qualquer aparelho.' },
    ],
    mapaTitulo: 'Onde fica cada coisa',
    mapa: [
      { id: 'cursos', t: 'Cursos', d: 'A trilha de aulas, da primeira à última, em sessões de 30 minutos.' },
      { id: 'gramatica', t: 'Gramática', d: 'Consulta por tópico, com tabelas, exemplos e áudio, para achar uma regra específica.' },
      { id: 'livros', t: 'Livros', d: 'Capítulos para ler com calma. Os dois primeiros de cada livro são grátis, com áudio.', soPt: true },
      { id: 'duvidas', t: 'Dúvidas', d: 'Preço, cancelamento, reembolso e como o progresso é salvo.' },
    ],
    dica: 'Nunca estudou o idioma? Comece pela aula 1. Já estudou e trava em algum ponto? Procure o tópico na Gramática e depois pratique a sessão indicada.',
  },
  en: {
    kicker: 'Getting started', titulo: 'How to start on Linvuu', lead: 'Four steps, with no sign-up and no card.',
    passos: [
      { n: '01', t: 'Choose your course', d: 'Pick the course you want. Brazilian Portuguese, French and Russian are explained in English from start to finish; the other courses are being translated, and each course page shows its real coverage.' },
      { n: '02', t: 'Open the first session', d: 'Each session takes about 30 minutes and comes in short blocks: read, tap Continue and go at your own pace. The first two lessons of each course are free.' },
      { n: '03', t: 'Listen and repeat out loud', d: 'Tap the speaker icon next to any word, sentence or dialogue. Listen first, then repeat: the language comes in through the ear.' },
      { n: '04', t: 'Practise and track your progress', d: 'Exercises are marked straight away, with the reason for each mistake. Mark the session as done; when you sign in, your progress is saved on any device.' },
    ],
    mapaTitulo: 'Where to find things',
    mapa: [
      { id: 'cursos', t: 'Courses', d: 'The lesson path, from the first lesson to the last, in 30-minute sessions.' },
      { id: 'gramatica', t: 'Grammar', d: 'Look things up by topic, with tables, examples and audio, to find one specific rule.' },
      { id: 'duvidas', t: 'Questions', d: 'Price, cancelling, refunds and how your progress is saved.' },
    ],
    dica: 'New to the language? Start with lesson 1. Already studied and stuck on something? Find the topic in Grammar, then practise the session it points to.',
  },
};

/** Guia curto no topo da primeira sessão de cada curso. */
export const GUIA_SESSAO: Record<'pt-BR' | 'en', { titulo: string; passos: string[] }> = {
  'pt-BR': { titulo: 'Como usar esta sessão', passos: ['Ouça: toque no ícone de alto-falante ao lado de cada palavra, frase ou diálogo.', 'Entenda: o botão «Ouvir explicação» lê a regra em voz alta. Você pode ler e ouvir ao mesmo tempo.', 'Repita em voz alta, imitando o áudio. Falar é parte do exercício.', 'Pratique: os exercícios são corrigidos na hora, com a explicação do porquê.'] },
  en: { titulo: 'How to use this session', passos: ['Listen: tap the speaker icon next to each word, sentence or dialogue.', 'Understand: read the explanation at your own pace.', 'Repeat out loud, copying the audio. Speaking is part of the exercise.', 'Practise: exercises are marked straight away, with the reason.'] },
};
