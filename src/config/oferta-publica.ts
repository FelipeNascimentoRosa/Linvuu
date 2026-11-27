/**
 * Textos da vitrine pública (home e seção de planos) nos dois domínios. Fonte única: a home React, a seção de planos,
 * a /assinatura e o HTML pré-renderizado (src/lib/metaRota.ts) leem daqui, para o servidor e o navegador dizerem o mesmo.
 * Preços nunca entram aqui: vêm de src/config/planos.ts.
 */
export type Vitrine = {
  tituloSeo: string; titulo: string; descricao: string; lead: string;
  cta: string; ctaFino: string;
  contrasteTitulo: string; contraste: readonly { t: string; d: string }[];
  autoriaTitulo: string; autoriaLead: string; autoria: readonly { t: string; d: string }[]; autoriaLink: string;
  planosTitulo: string; planosLead: string; planosNotas: readonly string[];
};

/** Home e planos do linvuu.com.br (português). `titulo` é o <h1>; `tituloSeo` e `descricao` vão para <title> e <meta>. */
export const HOME_BR: Vitrine = {
  tituloSeo: 'Linvuu — Idiomas explicados em português, com áudio',
  titulo: 'Aprenda a lógica do idioma, não a jogar um aplicativo.',
  descricao: 'Cursos de 6 idiomas explicados em português, do zero ao A2, com gramática clara e áudio em cada frase. Faça 2 aulas grátis, sem cartão.',
  lead: 'Inglês, espanhol, alemão, francês, italiano e russo explicados em português a partir dos hábitos de quem fala português. Gramática completa, exceções reais e áudio em cada frase — em sessões de 30 minutos.',
  cta: 'Experimentar duas aulas grátis',
  ctaFino: 'Aulas 1 e 2 liberadas em todos os cursos e 2 capítulos grátis em cada livro. Sem pedir cartão.',
  contrasteTitulo: 'O que aplicativos de jogo escondem, a Linvuu explica',
  contraste: [
    { t: 'Explicado a partir do português', d: 'Quem fala português comete erros previsíveis em alemão, russo ou inglês. Cada lição começa no hábito que faz você errar, mostra a regra sem rodeios e coloca os dois sistemas lado a lado.' },
    { t: 'Gramática, fonética e áudio do dia 1 ao A2', d: 'Em vez de adivinhar frases soltas por tentativa e erro, você estuda alfabeto, pronúncia, tabelas de casos e conjugações com explicação clara e áudio em cada frase.' },
    { t: 'Revisão espaçada no ritmo da memória', d: 'Sem vidas perdidas nem cobrança artificial de sequência. O sistema calcula quando uma estrutura está prestes a sumir da memória e devolve o exercício na hora certa.' },
  ],
  autoriaTitulo: 'Feito por professores, não por algoritmo de engajamento',
  autoriaLead: 'Todo o material da Linvuu é escrito e revisado por Felipe Nascimento Rosa e Luiza Nascimento Rosa, matemáticos de formação com prática direta em ensino de idiomas e linguística contrastiva.',
  autoria: [
    { t: 'Olimpíada de São Petersburgo', d: 'Diploma de 1º grau na III Olimpíada Internacional de Russo da Universidade Estatal de São Petersburgo (SPbGU, 2022) e palestra no seminário oficial de preparação para o exame TRKI/TORFL.' },
    { t: 'Tradução em cobertura real', d: 'Atuação como tradutor de russo na cobertura da TV Globo em 2022, além de ensino contínuo de russo para brasileiros desde 2018.' },
    { t: 'Avaliação pública de alunos', d: 'Nota média 4,7/5 em 72 avaliações públicas verificáveis de alunos na Udemy — com condição vitalícia dedicada para ex-alunos.' },
  ],
  autoriaLink: 'Conheça a história completa dos autores',
  planosTitulo: 'Um único acesso para todos os idiomas. Sem pegadinha.',
  planosLead: 'Faça as 2 primeiras aulas de qualquer curso e leia os 2 primeiros capítulos de cada livro antes de pagar. Se assinar e decidir sair, reembolso integral em até 7 dias.',
  planosNotas: [
    'Trimestral no Pix (30% de desconto) e Anual são pagamentos únicos, sem renovação automática. O plano mensal pode ser cancelado a qualquer momento.',
    'O áudio de cada frase usa síntese de voz neural, ajustada para clareza e ritmo didático constante em todo o catálogo.',
  ],
};

/** Home e planos do linvuu.com (inglês). Mesma estrutura do .com.br; só a língua e o catálogo mudam. */
export const HOME_EN: Vitrine = {
  tituloSeo: 'Linvuu — Language courses for English speakers',
  titulo: 'Learn how a language actually works, not how to tap a game.',
  descricao: 'Spanish, German, French, Russian and Brazilian Portuguese, fully explained in English, with audio on every sentence. Try 2 lessons free, no card.',
  lead: 'Spanish, German, French, Russian and Brazilian Portuguese, fully explained in English — built around the exact habits English speakers carry into a new language. Clear grammar, real exceptions, and audio on every sentence in focused 30-minute sessions.',
  cta: 'Try 2 lessons free',
  ctaFino: 'First 2 full lessons unlocked in every course. No credit card required.',
  contrasteTitulo: 'What gamified apps hide, Linvuu explains',
  contraste: [
    { t: 'Built for English speakers', d: 'English speakers hit predictable walls — grammatical gender, verb aspect, cases, and false friends. Every lesson addresses those exact friction points in plain English.' },
    { t: 'Complete A1–A2 structure', d: 'You do not guess rules from random phrases. You learn the sound system, full grammar tables, real exceptions and sentence-level audio from day one through A2.' },
    { t: 'Spaced repetition without gimmicks', d: 'No hearts, no streak anxiety. Our spaced-repetition engine tracks what is fading and brings the exact structure back right before you forget it.' },
  ],
  autoriaTitulo: 'Written by teachers, not engagement algorithms',
  autoriaLead: 'Every course on Linvuu is written and reviewed by Felipe Nascimento Rosa and Luiza Nascimento Rosa — mathematicians and language educators focused on structured, contrastive teaching.',
  autoria: [
    { t: 'St. Petersburg Russian Olympiad', d: 'First-degree diploma winner at the III International Russian Language Olympiad (St. Petersburg State University, SPbGU, 2022) and invited speaker at SPbGU’s TRKI/TORFL preparation seminar.' },
    { t: 'Live broadcast translation', d: 'Served as Russian-language translator for TV Globo’s 2022 news coverage, alongside teaching structured language courses since 2018.' },
    { t: 'Verified student record', d: '4.7/5 average across 72 public student reviews on Udemy before launching Linvuu as an independent platform.' },
  ],
  autoriaLink: 'Meet the authors',
  planosTitulo: 'One membership, every course. No surprises.',
  planosLead: 'Test the first 2 full lessons free before paying a cent. Every plan includes a full 7-day refund and straightforward cancellation.',
  planosNotas: [
    'Sentence audio uses neural speech synthesis tuned for clarity and steady didactic pacing across the catalog.',
  ],
};

export const vitrineDo = (codigo: string): Vitrine => (codigo === 'pt-BR' ? HOME_BR : HOME_EN);
