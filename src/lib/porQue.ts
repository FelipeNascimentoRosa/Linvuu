// Texto da página «Por que estudar com a Linvuu?», nas duas línguas do site.
// Fica aqui — e não dentro da página — para o React (PorQue.tsx) e o HTML entregue ao Google
// (metaRota.ts) dizerem exatamente o mesmo, como em src/lib/sobre.ts e src/lib/institucional.ts.
// Regra do projeto (docs/MARKETING.md): só fato verificável, sem número de vaidade, sem promessa de fluência.
// O inglês foi escrito para quem lê o site em inglês (público do linvuu.com), não traduzido palavra por palavra:
// os erros citados são os de um falante de inglês a aprender português («eu sou trinta anos», «atualmente» lido
// como «actually»), não os de um brasileiro a aprender inglês.

/** Um trecho do parágrafo final: texto simples ou ligação interna do site. */
export type SegmentoPorQue = { texto: string; link?: '/cursos' | '/livros' | '/sobre' | '/contato' };

export type TextoPorQue = {
  titulo: string;
  descricao: string;
  /** Descrição só da <meta name="description"> (até 160 caracteres). O lead visível continua em `descricao`. */
  seoDescricao?: string;
  seoTitulo?: string;
  kicker: string;
  lead: string;
  motivosRotulo: string;
  motivos: { id: string; titulo: string; texto: string }[];
  paraQuemTitulo: string;
  paraQuem: string;
  ctaTitulo: string;
  ctaSegmentos: SegmentoPorQue[];
};

export const POR_QUE: Record<'pt-BR' | 'en', TextoPorQue> = {
  'pt-BR': {
    titulo: 'Por que estudar com a Linvuu?',
    descricao: 'Explicação em português, erros típicos de brasileiros, áudio em cada frase, sessões de 30 minutos e livros escritos por quem dá aula. Veja o que muda na Linvuu.',
    kicker: 'Sobre o método',
    lead: 'A Linvuu é para quem fala português e quer aprender inglês, espanhol, alemão, francês, italiano ou russo sem decorar regras soltas. Cada aula parte do que você já sabe, explica o porquê e mostra o erro que quase todo brasileiro comete.',
    motivosRotulo: 'Motivos para estudar com a Linvuu',
    motivos: [
      { id: 'portugues', titulo: 'Parte do português, não do zero', texto: 'Cada capítulo começa por um hábito seu que o outro idioma não aceita: dizer “tenho 30 anos” em inglês, ler uma palavra francesa letra por letra, achar que “exquisito” em espanhol é “esquisito”. Quem sabe qual é o hábito corrige o erro em semanas, e não em anos.' },
      { id: 'explicacao', titulo: 'Explicação na sua língua', texto: 'A regra vem completa, em português, com as exceções e o erro típico. O idioma estudado aparece em frases curtas, diálogos e tabelas, e você entende por que a frase é assim antes de repetir.' },
      { id: 'audio', titulo: 'Som em cada frase', texto: 'Diálogos, frases prontas e vocabulário têm áudio, para você ouvir e repetir desde o primeiro dia. As vozes são geradas por síntese de voz neural, e o site avisa quando houver gravações de falantes nativos.' },
      { id: 'sessoes', titulo: 'Sessões de 30 minutos', texto: 'Cada aula é dividida em sessões de 30 minutos, em passos pequenos. Dá para estudar no intervalo do trabalho e retomar no dia seguinte sem perder o fio.' },
      { id: 'correcao', titulo: 'Exercícios corrigidos na hora', texto: 'Escolha, lacuna e produção, com a resposta certa e a explicação do erro logo depois de cada tentativa. Você descobre na hora o que errou e por quê.' },
      { id: 'livro-e-curso', titulo: 'O livro e o curso se completam', texto: 'O livro traz a situação, a armadilha do português e o treino em degraus. O site traz o passo a passo, o vocabulário com áudio e os exercícios corrigidos. O que existe só de um lado vira conteúdo dos dois.' },
      { id: 'autoria', titulo: 'Autoria com nome e sobrenome', texto: 'Os textos são de Felipe Nascimento Rosa e Luiza Nascimento Rosa, matemáticos com experiência em linguística e ensino de idiomas. Eles escrevem, revisam e adaptam os livros e as aulas, a partir da experiência de sala de aula.' },
      { id: 'gratis', titulo: 'Dá para começar sem pagar', texto: 'As duas primeiras aulas de cada curso são grátis, e os dois primeiros capítulos de cada livro podem ser lidos inteiros, com áudio. Você testa o método antes de decidir.' },
    ],
    paraQuemTitulo: 'Para quem é',
    paraQuem: 'Os cursos vão do A1 ao B1 do quadro europeu (CEFR). Servem para quem está começando, para quem estudou e travou e para quem quer organizar o que já sabe. A Linvuu não promete fluência em 30 dias: promete explicação clara e prática diária que funciona.',
    ctaTitulo: 'Comece agora',
    ctaSegmentos: [
      { link: '/cursos', texto: 'Veja os cursos' },
      { texto: ' e faça as duas primeiras aulas grátis, ' },
      { link: '/livros', texto: 'leia os dois primeiros capítulos dos livros' },
      { texto: ', ' },
      { link: '/sobre', texto: 'conheça os autores' },
      { texto: ' ou ' },
      { link: '/contato', texto: 'fale com a gente' },
      { texto: '.' },
    ],
  },
  en: {
    titulo: 'Why study with Linvuu?',
    seoDescricao: 'Explanations in English, the mistakes English speakers really make, audio in every sentence, 30-minute sessions and books written by teachers.',
    descricao: 'Explanations in English, the mistakes English speakers really make, audio in every sentence, 30-minute sessions and books written by teachers. See what changes at Linvuu.',
    kicker: 'About the method',
    lead: 'Linvuu is for English speakers learning Brazilian Portuguese, French or Russian without memorising loose rules. Every lesson starts from what you already know, explains why the sentence is built that way, and shows the mistake most English speakers make.',
    motivosRotulo: 'Reasons to study with Linvuu',
    motivos: [
      { id: 'portugues', titulo: 'It starts from where you already are', texto: 'Every chapter begins with a habit of yours that the new language does not accept: saying “eu sou trinta anos” for “I am thirty”, when Brazilian Portuguese wants “eu tenho trinta anos” — you have thirty years; or reading “atualmente” as “actually”, when it means “currently”. Once you know which habit is in the way, you fix the mistake in weeks, not years.' },
      { id: 'explicacao', titulo: 'Explained in English', texto: 'The rule comes in full, in English, with the exceptions and the typical mistake. The language you are learning appears in short sentences, dialogues and tables, so you understand why the sentence is built that way before repeating it.' },
      { id: 'audio', titulo: 'Sound in every sentence', texto: 'Dialogues, set phrases and vocabulary come with audio, so you listen and repeat from the first day. The voices are generated by neural speech synthesis, and the site says when recordings by native speakers are available.' },
      { id: 'sessoes', titulo: 'Thirty-minute sessions', texto: 'Every lesson is split into 30-minute sessions, in small steps. You can study on a work break and pick up the next day without losing the thread.' },
      { id: 'correcao', titulo: 'Exercises corrected on the spot', texto: 'Multiple choice, gap-fill and production, with the right answer and the explanation of the mistake right after each attempt. You find out immediately what you got wrong and why.' },
      { id: 'livro-e-curso', titulo: 'The book and the course complete each other', texto: 'The book brings the situation, the trap the new language sets for you and the practice in steps. The site brings the walkthrough, the vocabulary with audio and the corrected exercises. What exists on only one side becomes content on both.' },
      { id: 'autoria', titulo: 'Authorship with first and last names', texto: 'The texts are by Felipe Nascimento Rosa and Luiza Nascimento Rosa, mathematicians with experience in linguistics and language teaching. They write, revise and adapt the books and the lessons, from their own classroom experience.' },
      { id: 'gratis', titulo: 'You can start without paying', texto: 'The first two lessons of every course are free, and the first two chapters of every book can be read in full, with audio. You test the method before deciding.' },
    ],
    paraQuemTitulo: 'Who it is for',
    paraQuem: 'The courses run from A1 to B1 on the CEFR scale, and on this site Brazilian Portuguese, French, Russian and German are explained in English. They serve beginners, people who studied before and got stuck, and people who want to organise what they already know. Linvuu does not promise fluency in 30 days: it promises a clear explanation and daily practice that works.',
    ctaTitulo: 'Start now',
    ctaSegmentos: [
      { link: '/cursos', texto: 'See the courses' },
      { texto: ' and take the first two lessons free, ' },
      { link: '/livros', texto: 'read the first two chapters of the books (in Portuguese)' },
      { texto: ', ' },
      { link: '/sobre', texto: 'meet the authors' },
      { texto: ' or ' },
      { link: '/contato', texto: 'write to us' },
      { texto: '.' },
    ],
  },
};
