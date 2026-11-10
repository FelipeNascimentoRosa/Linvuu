// Texto da página «Quem escreve a Linvuu», nas duas línguas do site.
// Fica aqui — e não dentro da página — para o React (Sobre.tsx) e o HTML entregue ao Google
// (metaRota.ts) dizerem exatamente o mesmo, como em src/lib/institucional.ts.
// Regra do projeto (docs/MARKETING.md): só fato verificável, sem número de vaidade, sem promessa de fluência.
// O inglês foi escrito para quem lê o site em inglês (público do linvuu.com), não traduzido palavra por palavra:
// o exemplo do hábito é o erro que um falante de inglês comete em português («eu sou trinta anos»), não o inverso.

export type TextoSobre = {
  titulo: string;
  descricao: string;
  /** Título e descrição só do <title> e da <meta name="description">.
   *  O h1 e o lead da página continuam em `titulo` e `descricao`: o Google mostra de 30 a 60 caracteres
   *  no título e até 160 na descrição, e o texto visível não precisa caber nisso. */
  seoTitulo?: string;
  seoDescricao?: string;
  kicker: string;
  h1: string;
  lead: string;
  autoresTitulo: string;
  autorPapel: string;
  bio: string;
  origemTitulo: string;
  origem: string;
  metodoTitulo: string;
  metodo: { titulo: string; texto: string }[];
  audioTitulo: string;
  audio: string;
  ctaTitulo: string;
  ctaLivros: string;
  ctaCursos: string;
  ctaOu: string;
};

export const SOBRE: Record<'pt-BR' | 'en', TextoSobre> = {
  'pt-BR': {
    titulo: 'Quem escreve a Linvuu',
    descricao: 'A Linvuu é feita por Felipe Nascimento Rosa e Luiza Nascimento Rosa, matemáticos com experiência em linguística e ensino de idiomas. Autoria, origem e método.',
    kicker: 'Sobre a Linvuu',
    h1: 'Quem escreve a Linvuu',
    lead: 'A Linvuu é feita por Felipe Nascimento Rosa e Luiza Nascimento Rosa. Os textos, a revisão e a adaptação de todos os livros e aulas são de autoria deles, escritos a partir de pesquisa bibliográfica, e não copiados de nenhum método existente.',
    autoresTitulo: 'Os autores',
    autorPapel: 'Autoria, revisão e adaptação dos livros e das aulas.',
    bio: 'Os dois são matemáticos de formação, com experiência em linguística, ensino de idiomas, inteligência artificial, teoria dos números e álgebra linear. Essa formação aparece no jeito de ensinar: regras explicadas com precisão, exemplos que testam a regra e atenção ao erro que cada estudante realmente comete.',
    origemTitulo: 'De onde vem a Linvuu',
    origem: 'A Linvuu nasceu da experiência de sala de aula dos autores, com alunos reais e os erros que se repetem de turma em turma. Essa experiência é a base dos livros e das aulas.',
    metodoTitulo: 'O método',
    metodo: [
      { titulo: 'Parte do português.', texto: 'Cada capítulo começa por um hábito seu que o outro idioma não aceita, como dizer “tenho 30 anos” em inglês ou ler uma palavra francesa letra por letra. Quem sabe qual é o hábito corrige o erro em semanas, e não em anos.' },
      { titulo: 'Explica na sua língua.', texto: 'A explicação é em português, com a regra completa, as exceções e o erro típico. O idioma estudado aparece em frases curtas, diálogos e tabelas.' },
      { titulo: 'Tem som em cada frase.', texto: 'Os diálogos, as frases prontas e o vocabulário têm áudio, para treinar a pronúncia desde o primeiro dia.' },
      { titulo: 'Revisto por quem fala o idioma.', texto: 'Os livros contaram com a colaboração de professores e falantes nativos dos idiomas ensinados.' },
    ],
    audioTitulo: 'Transparência sobre o áudio',
    audio: 'As vozes do site são geradas por síntese de voz. Estamos migrando para vozes neurais de maior qualidade. Quando houver gravações de falantes nativos, o site avisará.',
    ctaTitulo: 'Leia e fale com a gente',
    ctaLivros: 'Leia os dois primeiros capítulos de cada livro',
    ctaCursos: 'veja os cursos',
    ctaOu: 'ou escreva para',
  },
  en: {
    titulo: 'Who writes Linvuu',
    seoTitulo: 'Who writes Linvuu: the authors and the method',
    seoDescricao: 'Linvuu is written by Felipe Nascimento Rosa and Luiza Nascimento Rosa: mathematicians with linguistics and teaching experience. Authorship, origin and method.',
    descricao: 'Linvuu is written by Felipe Nascimento Rosa and Luiza Nascimento Rosa, mathematicians with experience in linguistics and language teaching. Authorship, origin and method.',
    kicker: 'About Linvuu',
    h1: 'Who writes Linvuu',
    lead: 'Linvuu is written by Felipe Nascimento Rosa and Luiza Nascimento Rosa. Every text, revision and adaptation in the books and lessons is theirs, written from bibliographic research and not copied from any existing method.',
    autoresTitulo: 'The authors',
    autorPapel: 'Authorship, revision and adaptation of the books and lessons.',
    bio: 'Both are mathematicians by training, with experience in linguistics, language teaching, artificial intelligence, number theory and linear algebra. That training shows in how they teach: rules stated precisely, examples that test the rule, and attention to the mistake a learner actually makes.',
    origemTitulo: 'Where Linvuu comes from',
    origem: 'Linvuu grew out of the authors’ classroom experience, with real students and the mistakes that repeat from class to class. That experience is the basis of the books and the lessons.',
    metodoTitulo: 'The method',
    metodo: [
      { titulo: 'It starts from how you already speak.', texto: 'Every chapter begins with a habit of yours that the new language does not accept, such as saying “eu sou trinta anos” when Brazilian Portuguese wants “eu tenho trinta anos”, or reading a French word letter by letter. Once you know which habit is in the way, you fix the mistake in weeks, not years.' },
      { titulo: 'Explained in your language.', texto: 'The explanation is in English: the full rule, the exceptions and the typical mistake. The language you are learning appears in short sentences, dialogues and tables.' },
      { titulo: 'Every sentence has sound.', texto: 'Dialogues, set phrases and vocabulary come with audio, so you practice pronunciation from the first day.' },
      { titulo: 'Reviewed by speakers of the language.', texto: 'The books were written with the help of teachers and native speakers of the languages taught.' },
    ],
    audioTitulo: 'Transparency about the audio',
    audio: 'The voices on this site are generated by speech synthesis. We are moving to higher-quality neural voices. When recordings by native speakers are available, the site will say so.',
    ctaTitulo: 'Read and talk to us',
    ctaLivros: 'Read the first two chapters of each book (in Portuguese)',
    ctaCursos: 'see the courses',
    ctaOu: 'or write to',
  },
};
