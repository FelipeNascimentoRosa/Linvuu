// Texto da página «Por que estudar com a Linvuu?», nas duas línguas do site.
// Fica aqui — e não dentro da página — para o React (PorQue.tsx) e o HTML entregue ao Google
// (metaRota.ts) dizerem exatamente o mesmo, como em src/lib/sobre.ts e src/lib/institucional.ts.
// Regra do projeto (docs/MARKETING.md): só fato verificável, sem número de vaidade, sem promessa de fluência.
// O inglês foi escrito para quem lê o site em inglês (público do linvuu.com), não traduzido palavra por palavra:
// os erros citados são os de um falante de inglês a aprender português («eu sou trinta anos», «atualmente» lido
// como «actually»), não os de um brasileiro a aprender inglês.

/** Um trecho do parágrafo final: texto simples ou ligação interna do site. */
export type SegmentoPorQue = { texto: string; link?: '/cursos' | '/livros' | '/sobre' | '/contato' };
type Item = { id: string; titulo: string; texto: string };

export type TextoPorQue = {
  titulo: string;
  descricao: string;
  /** Descrição só da <meta name="description"> (até 160 caracteres). */
  seoDescricao?: string;
  seoTitulo?: string;
  /** Frase de abertura, a primeira coisa que a pessoa lê (gancho). */
  gancho: string;
  lead: string;
  /** Quadrados coloridos: o que a pessoa estuda quando é necessário. */
  necessarioTitulo: string;
  necessario: Item[];
  motivosRotulo: string;
  motivos: Item[];
  ctaTitulo: string;
  ctaBotao: { texto: string; link: '/cursos' };
  ctaSegmentos: SegmentoPorQue[];
};

export const POR_QUE: Record<'pt-BR' | 'en', TextoPorQue> = {
  'pt-BR': {
    titulo: 'Por que estudar idiomas na Linvuu?',
    seoTitulo: 'Por que estudar idiomas online · 2 aulas grátis',
    seoDescricao: 'Curso de idiomas online sem firula: imersão, gramática, exercícios e conversa quando fazem sentido. Áudio em cada frase, sessões de 30 minutos e 2 aulas grátis.',
    descricao: 'Curso de idiomas online sem firula: você estuda o necessário, com áudio em cada frase, exercícios corrigidos na hora, sessões de 30 minutos e as 2 primeiras aulas grátis.',
    gancho: 'Promessa de marketing não ensina idioma. Estudar o que você precisa, na hora em que precisa, ensina.',
    lead: 'Diferentemente de outros aplicativos e de sites que vendem só marketing, a Linvuu não tem firula: é o que você precisa para uma base sólida e para caminhar rumo à fluência.',
    necessarioTitulo: 'Aqui você estuda o necessário',
    necessario: [
      { id: 'imersao', titulo: 'Imersão', texto: 'Se for necessário, iremos imergir.' },
      { id: 'gramatica', titulo: 'Gramática', texto: 'Quando for necessário, iremos estudar.' },
      { id: 'exercicios', titulo: 'Exercícios', texto: 'Quando for necessário, iremos fazer.' },
      { id: 'conversa', titulo: 'Conversa', texto: 'Um grupo descontraído, também.' },
    ],
    motivosRotulo: 'Motivos para estudar na Linvuu',
    motivos: [
      { id: 'audio', titulo: 'Áudio em cada frase', texto: 'Ouça e repita desde o primeiro dia (voz de síntese neural).' },
      { id: 'sessoes', titulo: 'Sessões de 30 minutos', texto: 'Passos pequenos que cabem na rotina.' },
      { id: 'correcao', titulo: 'Exercícios corrigidos na hora', texto: 'Você vê o erro e o porquê logo depois.' },
      { id: 'livro-e-curso', titulo: 'O livro e o curso se completam', texto: 'O livro para ler, o curso para praticar.' },
      { id: 'autoria', titulo: 'Autoria com nome e sobrenome', texto: 'Felipe e Luiza Nascimento Rosa, matemáticos com experiência em linguística e ensino de idiomas.' },
      { id: 'gratis', titulo: 'Dá para começar sem pagar', texto: 'As 2 primeiras aulas e os 2 primeiros capítulos de cada livro são grátis.' },
    ],
    ctaTitulo: 'Comece agora, sem pagar nada',
    ctaBotao: { texto: 'Escolher meu idioma e começar grátis', link: '/cursos' },
    ctaSegmentos: [
      { link: '/livros', texto: 'Ler um capítulo' },
      { texto: ' · ' },
      { link: '/sobre', texto: 'Conhecer os autores' },
      { texto: ' · ' },
      { link: '/contato', texto: 'Falar com a gente' },
    ],
  },
  en: {
    titulo: 'Why study languages at Linvuu?',
    seoTitulo: 'Why study languages online · 2 free lessons',
    seoDescricao: 'Online language courses without the fluff: immersion, grammar, exercises and conversation when needed. Audio in every sentence and 2 free lessons.',
    descricao: 'Online language courses without the fluff: you study what you need, with audio in every sentence, exercises corrected on the spot, 30-minute sessions and the first 2 lessons free.',
    gancho: 'Marketing promises do not teach a language. Studying what you need, when you need it, does.',
    lead: 'Unlike other apps and sites that sell you marketing, Linvuu has no fluff: it is what you need to build a solid base and keep moving towards fluency.',
    necessarioTitulo: 'Here you study what you need',
    necessario: [
      { id: 'imersao', titulo: 'Immersion', texto: 'When you need it, we immerse.' },
      { id: 'gramatica', titulo: 'Grammar', texto: 'When you need it, we study it.' },
      { id: 'exercicios', titulo: 'Exercises', texto: 'When you need them, we do them.' },
      { id: 'conversa', titulo: 'Conversation', texto: 'A relaxed group, too.' },
    ],
    motivosRotulo: 'Reasons to study at Linvuu',
    motivos: [
      { id: 'audio', titulo: 'Audio in every sentence', texto: 'Listen and repeat from day one (neural speech synthesis).' },
      { id: 'sessoes', titulo: 'Thirty-minute sessions', texto: 'Small steps that fit your routine.' },
      { id: 'correcao', titulo: 'Exercises corrected on the spot', texto: 'You see the mistake and the reason right after.' },
      { id: 'livro-e-curso', titulo: 'The book and the course complete each other', texto: 'The book to read, the course to practise.' },
      { id: 'autoria', titulo: 'Authorship with first and last names', texto: 'Felipe and Luiza Nascimento Rosa, mathematicians with experience in linguistics and language teaching.' },
      { id: 'gratis', titulo: 'You can start without paying', texto: 'The first 2 lessons and the first 2 chapters of every book are free.' },
    ],
    ctaTitulo: 'Start now, without paying',
    ctaBotao: { texto: 'Pick my language and start free', link: '/cursos' },
    ctaSegmentos: [
      { link: '/livros', texto: 'Read a chapter (in Portuguese)' },
      { texto: ' · ' },
      { link: '/sobre', texto: 'Meet the authors' },
      { texto: ' · ' },
      { link: '/contato', texto: 'Write to us' },
    ],
  },
};
