/** Textos editoriais derivados dos cursos e dos capítulos gratuitos publicados. */
export const APRESENTACOES_CURSO: Record<string, { titulo: string; paragrafos: string[] }> = {
  de: {
    titulo: 'Por onde começar no alemão',
    paragrafos: [
      'O curso começa pelos sons e avança em etapas, com explicações em português e exemplos de erros comuns. A trilha reúne gramática, diálogos e exercícios ao longo dos níveis A1, A2 e B1.',
      'As duas primeiras aulas são gratuitas. Para complementar o estudo, o livro de alemão abre com sons e letras e segue para pronomes e presente.',
    ],
  },
  ru: {
    titulo: 'Por onde começar no russo',
    paragrafos: [
      'O primeiro passo é conhecer o alfabeto cirílico e seus sons. A trilha segue com exemplos, diálogos e explicações dos casos gramaticais, organizados do A1 ao B1.',
      'As duas primeiras aulas são gratuitas. Você pode conhecer o material antes de escolher uma assinatura e voltar à trilha para continuar estudando.',
    ],
  },
  // en, es, fr, it: rascunho editorial a partir das 62 aulas publicadas de cada curso (títulos em content/indice.json); revisão humana antes do merge.
  en: {
    titulo: 'Por onde começar no inglês',
    paragrafos: [
      'O curso começa pelos sons e pelo verbo to be e segue em 62 aulas até o B1, com explicações em português. Os pontos que mais confundem brasileiros têm aulas próprias: o present perfect (for e since, already e yet, quando usar o passado simples), os phrasal verbs do dia a dia e, no B1, collocations e falsos amigos.',
      'Cada nível termina com revisão e simulado (A1, A2 e B1). As duas primeiras aulas são gratuitas, e o livro de inglês abre com dois capítulos para ler sem assinatura.',
    ],
  },
  es: {
    titulo: 'Por onde começar no espanhol',
    paragrafos: [
      'O espanhol parece fácil para quem fala português, e é aí que mora o «portunhol». O curso trata disso desde a primeira aula: ser e estar, falsos amigos, por × para, os dois passados e o subjuntivo, sempre a partir dos erros típicos de brasileiros, em 62 aulas do A1 ao B1.',
      'A trilha também cobre situações práticas, como viagem, trabalho, aluguel e a vida na Espanha ou na América Latina, e termina cada nível com revisão e simulado. As duas primeiras aulas são gratuitas.',
    ],
  },
  fr: {
    titulo: 'Por onde começar no francês',
    paragrafos: [
      'O primeiro passo é a pronúncia e a ortografia, que no francês não andam juntas. Depois vêm être e avoir, os partitivos, os verbos pronominais e, no A2 e no B1, o passado composto e o imperfeito, o plus-que-parfait e o discurso indireto, em 62 aulas com explicações em português.',
      'Há aulas sobre a vida prática (banco, correio, viagem, reuniões) e uma comparação de costumes entre o Brasil e a França. As duas primeiras aulas são gratuitas, e o livro de francês tem dois capítulos abertos.',
    ],
  },
  it: {
    titulo: 'Por onde começar no italiano',
    paragrafos: [
      'O italiano é próximo do português, mas tem armadilhas próprias: as preposições articuladas, o partitivo, os pronomes e a escolha entre passato prossimo e imperfetto. O curso trata cada uma em 62 aulas, do A1 ao B1, com explicações em português e exemplos de erros comuns.',
      'A trilha inclui situações do dia a dia (bar, viagem, trabalho, a burocracia de viver na Itália) e termina cada nível com revisão e simulado. As duas primeiras aulas são gratuitas.',
    ],
  },
};

export const APRESENTACOES_LIVRO: Record<string, { titulo: string; paragrafos: string[] }> = {
  de: {
    titulo: 'O que você encontra nos primeiros capítulos',
    paragrafos: [
      'O primeiro capítulo apresenta sons e letras a partir de uma cena na recepção. O segundo aborda pronomes e presente, em uma cena na cozinha de um albergue.',
      'As explicações partem de dificuldades de quem fala português. Os dois capítulos estão disponíveis para leitura gratuita, com recursos de áudio.',
    ],
  },
  es: {
    titulo: 'O que você encontra nos primeiros capítulos',
    paragrafos: [
      'O primeiro capítulo apresenta sons e ortografia a partir de uma cena na recepção. O segundo aborda pronomes, ser e estar e artigos, em uma cena no primeiro dia de trabalho.',
      'As explicações partem de dificuldades de quem fala português. Os dois capítulos estão disponíveis para leitura gratuita, com recursos de áudio.',
    ],
  },
};
