// Texto da página «Por que estudar com a Linvuu?», nas duas línguas do site.
// Fica aqui — e não dentro da página — para o React (PorQue.tsx) e o HTML entregue ao Google
// (metaRota.ts) dizerem exatamente o mesmo, como em src/lib/sobre.ts e src/lib/institucional.ts.
// Regra do projeto (docs/MARKETING.md): só fato verificável, sem número de vaidade, sem promessa de fluência.
// O inglês foi escrito para quem lê o site em inglês (público do linvuu.com), não traduzido palavra por palavra:
// os erros citados são os de um falante de inglês a aprender português («eu sou trinta anos», «atualmente» lido
// como «actually»), não os de um brasileiro a aprender inglês.

/** Um trecho do parágrafo final: texto simples ou ligação interna do site. */
export type SegmentoPorQue = { texto: string; link?: '/cursos' | '/livros' | '/sobre' | '/contato' };
/** Trechos do `lead` que a página destaca (negrito verde). Precisam aparecer no lead exatamente como escritos. */

export type TextoPorQue = {
  titulo: string;
  descricao: string;
  /** Descrição só da <meta name="description"> (até 160 caracteres). O lead visível continua em `descricao`. */
  seoDescricao?: string;
  seoTitulo?: string;
  /** Frase de abertura, a primeira coisa que a pessoa lê (gancho). */
  gancho: string;
  lead: string;
  destaques: string[];
  motivosRotulo: string;
  motivos: { id: string; titulo: string; texto: string }[];
  ctaTitulo: string;
  /** Botão principal do fim da página. */
  ctaBotao: { texto: string; link: '/cursos' };
  ctaSegmentos: SegmentoPorQue[];
};

export const POR_QUE: Record<'pt-BR' | 'en', TextoPorQue> = {
  'pt-BR': {
    titulo: 'Por que estudar idiomas na Linvuu?',
    seoTitulo: 'Por que estudar idiomas online · Áudio e 2 aulas grátis',
    seoDescricao: 'Curso de idiomas online sem firula: imersão, gramática, exercícios e conversa quando fazem sentido. Áudio em cada frase, sessões de 30 minutos e 2 aulas grátis.',
    descricao: 'Curso de idiomas online sem firula: você estuda o necessário, com áudio em cada frase, exercícios corrigidos na hora, sessões de 30 minutos e as 2 primeiras aulas grátis.',
    gancho: 'Promessa de marketing não ensina idioma. Estudar o que você precisa, na hora em que precisa, ensina.',
    lead: 'Aqui na Linvuu você estudará o necessário. Se for necessário imersão, iremos imergir. Quando for necessário gramática, iremos estudar gramática. Quando for necessário fazer exercícios, iremos fazer. Quando for necessário um grupo de conversação descontraído, também iremos fazer. Diferentemente de outros aplicativos e de sites que vendem só marketing, a Linvuu não tem firula: é o que você precisa para construir uma base sólida e caminhar rumo à fluência, em alemão, inglês, espanhol, francês, italiano, português e russo.',
    destaques: ['estudará o necessário', 'iremos imergir', 'iremos estudar gramática', 'iremos fazer', 'grupo de conversação descontraído', 'a Linvuu não tem firula'],
    motivosRotulo: 'Motivos para estudar na Linvuu',
    motivos: [
      { id: 'audio', titulo: 'Áudio em cada frase', texto: 'Quem ouve desde o início fala com mais segurança. Diálogos, frases prontas e vocabulário têm áudio, para você ouvir e repetir desde o primeiro dia. As vozes são geradas por síntese de voz neural, e o site avisa quando houver gravações de falantes nativos.' },
      { id: 'sessoes', titulo: 'Sessões de 30 minutos', texto: 'Estudar todo dia só funciona se couber na rotina. Cada aula é dividida em sessões de 30 minutos, em passos pequenos, e dá para retomar no dia seguinte sem perder o fio.' },
      { id: 'correcao', titulo: 'Exercícios corrigidos na hora', texto: 'Escolha, lacuna e produção, com a resposta certa e a explicação do erro logo depois de cada tentativa. Você descobre na hora o que errou e por quê, em vez de repetir o mesmo erro por semanas.' },
      { id: 'livro-e-curso', titulo: 'O livro e o curso se completam', texto: 'O livro traz a situação, a armadilha do português e o treino em degraus. O site traz o passo a passo, o vocabulário com áudio e os exercícios corrigidos. O que existe só de um lado vira conteúdo dos dois.' },
      { id: 'autoria', titulo: 'Autoria com nome e sobrenome', texto: 'Os textos são de Felipe Nascimento Rosa e Luiza Nascimento Rosa, matemáticos com experiência em linguística e ensino de idiomas. Eles escrevem, revisam e adaptam os livros e as aulas, a partir da experiência de sala de aula.' },
      { id: 'gratis', titulo: 'Dá para começar sem pagar', texto: 'As duas primeiras aulas de cada curso são grátis, e os dois primeiros capítulos de cada livro podem ser lidos inteiros, com áudio. Você testa o método antes de decidir.' },
    ],
    ctaTitulo: 'Comece agora, sem pagar nada',
    ctaBotao: { texto: 'Escolher meu idioma e começar grátis', link: '/cursos' },
    ctaSegmentos: [
      { texto: 'Prefere ler antes? ' },
      { link: '/livros', texto: 'Leia os dois primeiros capítulos dos livros' },
      { texto: ', ' },
      { link: '/sobre', texto: 'conheça os autores' },
      { texto: ' ou ' },
      { link: '/contato', texto: 'fale com a gente' },
      { texto: '.' },
    ],
  },
  en: {
    titulo: 'Why study languages at Linvuu?',
    seoTitulo: 'Why study languages online · Audio and 2 free lessons',
    seoDescricao: 'Online language courses without the fluff: immersion, grammar, exercises and conversation when they make sense. Audio in every sentence, 30-minute sessions and 2 free lessons.',
    descricao: 'Online language courses without the fluff: you study what you need, with audio in every sentence, exercises corrected on the spot, 30-minute sessions and the first 2 lessons free.',
    gancho: 'Marketing promises do not teach a language. Studying what you need, when you need it, does.',
    lead: 'At Linvuu you study what you actually need. When you need immersion, we immerse. When you need grammar, we study grammar. When you need exercises, we do exercises. When you need a relaxed conversation group, we do that too. Unlike other apps and sites that sell you marketing, Linvuu has no fluff: it is what you need to build a solid base and keep moving towards fluency, in Russian, French, German, Spanish and Portuguese.',
    destaques: ['you study what you actually need', 'we immerse', 'we study grammar', 'we do exercises', 'relaxed conversation group', 'Linvuu has no fluff'],
    motivosRotulo: 'Reasons to study at Linvuu',
    motivos: [
      { id: 'audio', titulo: 'Audio in every sentence', texto: 'People who listen from the start speak with more confidence. Dialogues, set phrases and vocabulary come with audio, so you listen and repeat from the first day. The voices are generated by neural speech synthesis, and the site says when recordings by native speakers are available.' },
      { id: 'sessoes', titulo: 'Thirty-minute sessions', texto: 'Studying every day only works if it fits your routine. Every lesson is split into 30-minute sessions, in small steps, and you can pick up the next day without losing the thread.' },
      { id: 'correcao', titulo: 'Exercises corrected on the spot', texto: 'Multiple choice, gap-fill and production, with the right answer and the explanation of the mistake right after each attempt. You find out immediately what you got wrong and why, instead of repeating the same mistake for weeks.' },
      { id: 'livro-e-curso', titulo: 'The book and the course complete each other', texto: 'The book brings the situation, the trap the new language sets for you and the practice in steps. The site brings the walkthrough, the vocabulary with audio and the corrected exercises. What exists on only one side becomes content on both.' },
      { id: 'autoria', titulo: 'Authorship with first and last names', texto: 'The texts are by Felipe Nascimento Rosa and Luiza Nascimento Rosa, mathematicians with experience in linguistics and language teaching. They write, revise and adapt the books and the lessons, from their own classroom experience.' },
      { id: 'gratis', titulo: 'You can start without paying', texto: 'The first two lessons of every course are free, and the first two chapters of every book can be read in full, with audio. You test the method before deciding.' },
    ],
    ctaTitulo: 'Start now, without paying',
    ctaBotao: { texto: 'Pick my language and start free', link: '/cursos' },
    ctaSegmentos: [
      { texto: 'Prefer to read first? ' },
      { link: '/livros', texto: 'Read the first two chapters of the books (in Portuguese)' },
      { texto: ', ' },
      { link: '/sobre', texto: 'meet the authors' },
      { texto: ' or ' },
      { link: '/contato', texto: 'write to us' },
      { texto: '.' },
    ],
  },
};
