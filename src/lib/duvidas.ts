// Páginas de dúvida (docs/ESTRATEGIA-PAGINAS-DE-DUVIDA.md, decisão do Felipe em 23/11/2026: começar por 3 temas).
// Cada página responde a UMA pergunta que o brasileiro digita, com o material que já está escrito em
// content/gramatica/<idioma>.json. Regra do grátis e do pago (§4 da estratégia): vai para a página a regra, as
// tabelas de referência, três exemplos e o erro típico; o treino, o áudio das aulas pagas e a correção continuam
// na assinatura. Nenhum tópico é republicado inteiro.
//
// Só no .com.br (português): no .com o endereço redireciona para cá (server/dominio.ts). Sem hreflang, porque não
// existe versão em inglês destas páginas.
//
// Nada aqui é inventado: todo trecho de regra, célula de tabela, exemplo e erro é cópia literal do tópico indicado em
// `fonte` (conferido por scripts/testar-duvidas.ts). Só a resposta curta do topo e as respostas das perguntas
// são texto novo, escrito a partir desses tópicos. Este módulo NÃO importa content/gramatica: importar o arquivo
// levaria a gramática paga inteira para o JavaScript público.

export type IdiomaDuvida = 'es' | 'en' | 'de';

export interface TabelaDuvida {
  titulo: string;
  colunas: string[];
  /** Índices das colunas escritas na língua estudada: recebem `lang` (WCAG 3.1.2). */
  naLingua: number[];
  linhas: string[][];
  /** id do tópico em content/gramatica/<idioma>.json de onde as células saíram. */
  fonte: string;
}

export interface Duvida {
  idioma: IdiomaDuvida;
  /** Nome do idioma em minúsculas, como entra na frase («o curso de espanhol»). */
  nomeIdioma: string;
  /** Código BCP 47 do idioma estudado. */
  lang: string;
  slug: string;
  /** <title> sem « · Linvuu» (30–60 caracteres com o sufixo). */
  titulo: string;
  /** <meta name="description"> (120–160 caracteres). */
  descricao: string;
  /** H1 na forma da pergunta que se busca. */
  h1: string;
  /** Resposta direta, até 60 palavras, antes de qualquer tabela. */
  resposta: string;
  regra: { texto: string; fonte: string }[];
  tabelas: TabelaDuvida[];
  exemplos: { alvo: string; pt: string; fonte: string }[];
  erros: { errado: string; certo: string; motivo: string; fonte: string }[];
  perguntas: { p: string; r: string }[];
  /** Aula do curso em que o tema é praticado. */
  aula: { n: number; dia: number; titulo: string };
  /** Capítulo grátis do livro que trata do tema, quando existe. */
  livro?: { caminho: string; rotulo: string };
}

export const DUVIDAS: Duvida[] = [
  {
    idioma: 'es',
    nomeIdioma: 'espanhol',
    lang: 'es',
    slug: 'falsos-amigos',
    titulo: 'Falsos amigos do espanhol que enganam brasileiros',
    descricao: 'Os falsos amigos do espanhol que mais enganam brasileiros: exquisito, embarazada, vaso, cena, cola, oficina e apellido, com exemplos e o erro típico.',
    h1: 'Quais falsos amigos do espanhol mais enganam brasileiros?',
    resposta: 'Falsos amigos são palavras do espanhol que parecem português, mas querem dizer outra coisa. Os que mais enganam: «exquisito» é delicioso, e não esquisito; «embarazada» é grávida; «vaso» é copo; «cena» é jantar; «cola» é fila; «oficina» é escritório; e «apellido» é sobrenome.',
    regra: [
      { texto: '«exquisito» não é «esquisito»: significa delicioso, muito bom, refinado. «La comida era exquisita». Para dizer «esquisito» no sentido de estranho, use «raro» ou «extraño»: «Es un hombre muy raro».', fonte: 'a21-s3-2' },
      { texto: '«embarazada» não é «embaraçada»: significa grávida. «Mi hermana estaba embarazada». Para dizer «sem graça, constrangido», use «avergonzado» ou «cortado»: «Estaba muy avergonzada».', fonte: 'a21-s3-2' },
      { texto: '«Cola» é «fila» de pessoas (a do banco ou a do caixa): «Vi a Marta en la cola». Também é a cola de colar e o rabo do animal. Em vários países da América Latina, como o México, diz-se mais «fila»: as duas se entendem. «Oficina» é «escritório», e não «oficina mecânica» (que é «taller»).', fonte: 'a23-s3-2' },
      { texto: '«Un rato» é «um momento», não o animal; o animal é «ratón» (e «rata» é a ratazana): «Esperé un rato».', fonte: 'a19-s3-2' },
    ],
    tabelas: [
      {
        titulo: 'Os falsos amigos da mesa',
        colunas: ['Em espanhol', 'Parece', 'Significa'],
        naLingua: [0],
        linhas: [
          ['el vaso', 'vaso', 'copo'],
          ['la cena', 'cena', 'jantar'],
          ['la cola', 'cola', 'fila (e também rabo)'],
          ['exquisito', 'esquisito', 'delicioso, refinado'],
          ['la taza', 'taça', 'xícara'],
          ['la copa', 'copa', 'taça (de vinho, sobremesa)'],
        ],
        fonte: 'a8-s3-2',
      },
      {
        titulo: 'Os que mudam o sentido da frase',
        colunas: ['Em espanhol', 'Significa', 'Exemplo'],
        naLingua: [0, 2],
        linhas: [
          ['exquisito', 'delicioso, refinado', 'La tarta era exquisita.'],
          ['raro, extraño', 'esquisito, estranho', 'Era un ruido muy raro.'],
          ['embarazada', 'grávida', 'Mi prima estaba embarazada.'],
          ['avergonzado, cortado', 'constrangido', 'Estaba avergonzado.'],
          ['antiguo / viejo', 'antigo / velho', 'Era una casa antigua.'],
        ],
        fonte: 'a21-s3-2',
      },
      {
        titulo: 'Mais dois que enganam no dia a dia',
        colunas: ['Em espanhol', 'Significa', 'Exemplo'],
        naLingua: [0, 2],
        linhas: [
          ['escena', 'cena (de filme, de teatro)', 'La última escena es muy triste.'],
          ['constipado', 'resfriado', 'Estoy constipado desde ayer.'],
        ],
        fonte: 'a30-s3-2',
      },
    ],
    exemplos: [
      { alvo: 'Un vaso de agua, por favor.', pt: 'Um copo de água, por favor.', fonte: 'a8-s3-2' },
      { alvo: 'La cena está exquisita.', pt: 'O jantar está delicioso.', fonte: 'a8-s3-2' },
      { alvo: 'Hay mucha cola en el bar.', pt: 'Há muita fila no bar.', fonte: 'a8-s3-2' },
    ],
    erros: [
      { errado: 'La sopa era esquisita. (querendo dizer deliciosa)', certo: 'La sopa era exquisita.', motivo: '«Exquisito» é delicioso; «esquisito» não existe em espanhol.', fonte: 'a21-s3-2' },
      { errado: 'Mi amiga estaba embarazada de vergüenza.', certo: 'Mi amiga estaba avergonzada.', motivo: '«Embarazada» é grávida; «embaraçada» é «avergonzada» ou «cortada».', fonte: 'a21-s3-2' },
      { errado: 'Quiero un vaso de café.', certo: 'Quiero una taza de café.', motivo: 'O café vai na «taza»; o «vaso» é para água ou suco.', fonte: 'a8-s3-2' },
      { errado: 'Trabajo en una oficina mecánica.', certo: 'Trabajo en un taller mecánico.', motivo: '«Oficina» é escritório; oficina mecânica é «taller».', fonte: 'a23-s3-2' },
      { errado: 'Mi apellido es Pepe. (querendo dizer: apelido)', certo: 'Mi apodo es Pepe.', motivo: '«Apellido» é sobrenome; o apelido é «apodo».', fonte: 'a24-s2-2' },
      { errado: 'Hay un rato en la cocina.', certo: 'Hay un ratón en la cocina.', motivo: '«Rato» é um momento; o animal é «ratón».', fonte: 'a19-s3-2' },
    ],
    perguntas: [
      { p: '«Exquisito» quer dizer esquisito em espanhol?', r: 'Não. «Exquisito» quer dizer delicioso ou refinado: «una cena exquisita» é um jantar delicioso. Para algo estranho, o espanhol usa «raro» ou «extraño».' },
      { p: '«Embarazada» quer dizer embaraçada?', r: 'Não, quer dizer grávida. Para dizer que alguém ficou sem graça ou constrangido, use «avergonzado» ou «cortado».' },
      { p: 'Fila, em espanhol, é «cola» ou «fila»?', r: 'Na Espanha, a fila de pessoas é «cola» («hacer cola»). Em vários países da América Latina, como o México, diz-se mais «fila». As duas se entendem.' },
    ],
    aula: { n: 8, dia: 31, titulo: 'Café e comida: querer, quisiera, números até 100' },
    livro: { caminho: '/livros/es/capitulo/1', rotulo: 'Capítulo 1 do livro de espanhol: falsos cognatos e portunhol (grátis)' },
  },
  {
    idioma: 'en',
    nomeIdioma: 'inglês',
    lang: 'en',
    slug: 'present-perfect',
    titulo: 'Present perfect ou simple past: quando usar',
    descricao: 'Present perfect ou simple past? A regra explicada para brasileiros, com yesterday, ever, already, yet, been e gone, exemplos e os erros mais comuns.',
    h1: 'Present perfect ou simple past: quando usar cada um?',
    resposta: 'Use o present perfect (have/has + particípio) para experiências sem dizer quando e para ações passadas com resultado agora: «I have been to Japan», «I have lost my keys». Se a frase diz quando aconteceu (yesterday, last week, in 2020, two days ago, When…?), use o simple past: «I went to Japan in 2020».',
    regra: [
      { texto: 'Em português, usamos o pretérito perfeito simples para quase tudo (“Eu já vi esse filme” e “Eu vi esse filme ontem” usam o mesmo “vi”). O pretérito perfeito composto (“tenho visto”) existe, mas serve para algo que se repete até agora, e por isso não ajuda aqui.', fonte: 'a30-s1-2' },
      { texto: 'Em português «já fui ao Japão» e «fui ao Japão em 2020» usam o mesmo pretérito. O inglês separa: «I have been to Japan» (experiência) e «I went in 2020» (quando).', fonte: 'a30-s1-4' },
      { texto: 'Em português «perdi as chaves» não diz se você ainda as procura. Em inglês, «I have lost my keys» sugere que o problema continua; «I lost my keys» só informa o fato.', fonte: 'a31-s3-1' },
      { texto: 'Em português «ela foi a Paris» é ambíguo (voltou ou não?). O inglês separa: «has been to» (voltou) e «has gone to» (está lá).', fonte: 'a30-s3-1' },
      { texto: 'Em português «já» e «ainda» aparecem nos mesmos lugares («já terminei», «ainda não terminei»). Em inglês, «already» é afirmativo e «yet» é negativo ou pergunta, no fim da frase.', fonte: 'a31-s1-1' },
    ],
    tabelas: [
      {
        titulo: 'As quatro armadilhas do português',
        colunas: ['Em português', 'Em inglês', 'Evite'],
        naLingua: [1, 2],
        linhas: [
          ['Eu vi a Sarah ontem.', 'I saw Sarah yesterday. (Tempo fechado = Past Simple!)', 'I have seen Sarah yesterday.'],
          ['Você já foi para Londres?', 'Have you ever been to London?', 'You already went to London? (falta o auxiliar e a ideia de ever)'],
          ['Ela já foi para Roma duas vezes.', 'She has been to Rome twice.', 'She has went to Rome twice. (Proibido usar a 2ª coluna após have!)'],
          ['Eu nunca comi sushi.', "I've never eaten sushi.", "I haven't never eaten sushi."],
        ],
        fonte: 'a30-s1-2',
      },
      {
        titulo: 'Afirmativa, negativa e pergunta',
        colunas: ['Afirmativa', 'Negativa', 'Pergunta'],
        naLingua: [0, 1, 2],
        linhas: [
          ['I have seen that movie.', "I haven't seen that movie.", 'Have you seen that movie?'],
          ['She has visited Rome.', "She hasn't visited Rome.", 'Has she visited Rome?'],
          ['They have eaten sushi.', "They haven't eaten sushi.", 'Have they eaten sushi?'],
        ],
        fonte: 'a30-s1-4',
      },
    ],
    exemplos: [
      { alvo: 'I have just arrived.', pt: 'Acabei de chegar.', fonte: 'a31-s2-1' },
      { alvo: 'She has just left.', pt: 'Ela acabou de sair.', fonte: 'a31-s2-1' },
      { alvo: 'I have lost my keys.', pt: 'ainda estou sem elas', fonte: 'a31-s3-1' },
    ],
    erros: [
      { errado: 'I have seen him yesterday.', certo: 'I saw him yesterday.', motivo: 'Yesterday é tempo passado fechado; exige obrigatoriamente o Past Simple.', fonte: 'a30-s4-2' },
      { errado: 'When have you arrived?', certo: 'When did you arrive?', motivo: 'Perguntas com When…? pedem um momento fechado no passado (Past Simple).', fonte: 'a30-s4-2' },
      { errado: 'Have you ever went to Paris?', certo: 'Have you ever been to Paris?', motivo: 'Após have / has, usa-se a 3ª coluna (been), nunca a 2ª (went).', fonte: 'a30-s4-2' },
      { errado: 'She has wrote / He has saw.', certo: 'She has written / He has seen.', motivo: 'Os particípios de write e see são written e seen.', fonte: 'a30-s4-2' },
      { errado: "I haven't finished already.", certo: "I haven't finished yet.", motivo: 'Em frases negativas (“ainda não”), usa-se yet no final, nunca already.', fonte: 'a30-s4-2' },
      { errado: "I didn't finish yet.", certo: "I haven't finished yet.", motivo: 'Com yet, present perfect.', fonte: 'a31-s1-1' },
    ],
    perguntas: [
      { p: 'Posso usar o present perfect com «yesterday»?', r: 'Não. «Yesterday» marca um tempo fechado no passado, que pede o simple past: «I saw him yesterday», e não «I have seen him yesterday».' },
      { p: 'Qual é a diferença entre «been to» e «gone to»?', r: '«Have been to» quer dizer que a pessoa foi e voltou: «I have been to Paris». «Has gone to» quer dizer que ela foi e ainda está lá: «She has gone to Paris».' },
      { p: 'Onde vão «already» e «yet»?', r: '«Already» (já) vai em frases afirmativas, antes do particípio: «I have already finished». «Yet» vai em negativas e perguntas, no fim da frase: «I haven\'t finished yet», «Have you finished yet?».' },
    ],
    aula: { n: 30, dia: 117, titulo: 'Present perfect: experiências com ever e never' },
  },
  {
    idioma: 'de',
    nomeIdioma: 'alemão',
    lang: 'de',
    slug: 'der-die-das',
    titulo: 'Der, die ou das: como saber o gênero em alemão',
    descricao: 'Como saber se um substantivo alemão é der, die ou das: as pistas pela terminação, as exceções e os erros típicos de quem fala português, com exemplos.',
    h1: 'Der, die ou das: como saber o gênero em alemão?',
    resposta: 'Todo substantivo alemão tem gênero: masculino (der), feminino (die) ou neutro (das), e ele não segue o português: «die Sonne» é o sol e «der Mond» é a lua. Algumas terminações ajudam (-ung e -heit são femininas, -chen é neutro), mas há exceções. Por isso, aprenda sempre o artigo junto com a palavra.',
    regra: [
      { texto: 'Em alemão todo substantivo tem gênero: masculino (der), feminino (die) ou neutro (das). O gênero não segue o português: «das Mädchen» (a menina) é neutro. Por isso, decore sempre o artigo junto com a palavra.', fonte: 'a3-s1-3' },
      { texto: 'O gênero do alemão não acompanha o do português. Se a palavra é “o” em português, não assuma der. O gênero é parte da palavra e precisa ser aprendido junto.', fonte: 'a3-s1-2' },
      { texto: 'Há pistas pela terminação, com exceções: -ung, -heit, -keit, -schaft, -tion, -ie e a maioria das palavras em -e são femininas; -er, -ling e -ismus são masculinas; -chen, -lein, -um e -ment são neutras. Dias da semana, meses e estações do ano são masculinos.', fonte: 'a3-s1-3' },
      { texto: 'TODO substantivo é escrito com letra MAIÚSCULA, em qualquer lugar da frase.', fonte: 'a3-s1-3' },
      { texto: 'O artigo definido do plural é sempre «die», para os três gêneros.', fonte: 'a3-s2-1' },
    ],
    tabelas: [
      {
        titulo: 'Os três artigos',
        colunas: ['Gênero', 'Artigo', 'Exemplos'],
        naLingua: [1, 2],
        linhas: [
          ['masculino', 'der', 'der Mann, der Tisch, der Vater'],
          ['feminino', 'die', 'die Frau, die Lampe, die Mutter'],
          ['neutro', 'das', 'das Kind, das Buch, das Haus'],
        ],
        fonte: 'a3-s1-3',
      },
      {
        titulo: 'Pistas pela terminação (com exceções)',
        colunas: ['Terminação', 'Gênero', 'Exemplos'],
        naLingua: [2],
        linhas: [
          ['-ung, -heit, -keit, -schaft, -tion, -ie, -e', 'feminino (die)', 'die Zeitung, die Freiheit, die Nation, die Familie, die Lampe'],
          ['-er, -ling, -ismus', 'masculino (der)', 'der Lehrer, der Frühling'],
          ['-chen, -lein, -um, -ment', 'neutro (das)', 'das Mädchen, das Museum, das Dokument'],
          ['dias, meses, estações', 'masculino (der)', 'der Montag, der Juli, der Sommer'],
        ],
        fonte: 'a3-s1-3',
      },
      {
        titulo: 'Onde o português engana',
        colunas: ['Em português', 'Em alemão', 'O que muda'],
        naLingua: [1],
        linhas: [
          ['o sol', 'die Sonne', 'masculino vira feminino'],
          ['a lua', 'der Mond', 'feminino vira masculino'],
          ['o leite', 'die Milch', 'masculino vira feminino'],
          ['a casa', 'das Haus', 'feminino vira neutro'],
          ['o carro', 'das Auto', 'masculino vira neutro'],
          ['a chave', 'der Schlüssel', 'feminino vira masculino'],
          ['a mesa', 'der Tisch', 'feminino vira masculino'],
        ],
        fonte: 'a3-s1-2',
      },
    ],
    exemplos: [
      { alvo: 'das Mädchen', pt: 'a menina', fonte: 'a3-s1-3' },
      { alvo: 'das Kind', pt: 'a criança', fonte: 'a3-s1-3' },
      { alvo: 'die Sonne', pt: 'o sol', fonte: 'a3-s1-2' },
    ],
    erros: [
      { errado: 'das Frau', certo: 'die Frau', motivo: 'Frau é feminino: die.', fonte: 'a3-s1-3' },
      { errado: 'die kind', certo: 'das Kind', motivo: 'Kind é neutro e o substantivo leva maiúscula.', fonte: 'a3-s1-3' },
      { errado: 'Das ist ein Lampe.', certo: 'Das ist eine Lampe.', motivo: '«Lampe» é feminino: eine.', fonte: 'a3-s3-0' },
      { errado: 'die Kinders', certo: 'die Kinder', motivo: 'Kind → Kinder (sem -s).', fonte: 'a3-s2-1' },
    ],
    perguntas: [
      { p: 'Existe uma regra para saber se é der, die ou das?', r: 'Não existe regra completa, mas há pistas pela terminação: -ung, -heit, -keit, -schaft, -tion e -ie costumam ser femininas; -chen, -lein, -um e -ment, neutras; -er, -ling e -ismus, masculinas. Há exceções, por isso o artigo se aprende junto com a palavra.' },
      { p: 'Qual é o artigo do plural em alemão?', r: 'No plural, o artigo definido é sempre «die», para os três gêneros: «der Tag» vira «die Tage» e «das Kind» vira «die Kinder».' },
      { p: 'Por que «das Mädchen» é neutro, se é uma menina?', r: 'Porque as palavras terminadas em -chen são neutras em alemão, mesmo quando falam de pessoas. É um dos casos em que o gênero da palavra não acompanha o sentido nem o português.' },
    ],
    aula: { n: 3, dia: 9, titulo: 'Substantivos e artigos' },
  },
];

export const caminhoDuvida = (x: Pick<Duvida, 'idioma' | 'slug'>) => `/gramatica/${x.idioma}/${x.slug}`;
export const duvidaPor = (idioma: string, slug: string) => DUVIDAS.find((x) => x.idioma === idioma && x.slug === slug);
export const duvidasDoIdioma = (idioma: string) => DUVIDAS.filter((x) => x.idioma === idioma);
/** Contagem de palavras da resposta curta (a regra do formato: até 60). */
export const palavras = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
/** Primeira letra maiúscula: os trechos-fonte às vezes começam no meio de uma frase («em português…»). */
export const inicial = (s: string) => s.charAt(0).toLocaleUpperCase('pt-BR') + s.slice(1);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** HTML simples da página, para o resumo do servidor (quem não executa JavaScript), quando não há pré-renderização. */
export function duvidaParaHtml(x: Duvida): string {
  const celula = (t: TabelaDuvida, i: number, v: string) => (t.naLingua.includes(i) ? `<td lang="${x.lang}">${esc(v)}</td>` : `<td>${esc(v)}</td>`);
  return `<p><strong>${esc(x.resposta)}</strong></p>`
    + `<h2>A regra</h2>${x.regra.map((r) => `<p>${esc(inicial(r.texto))}</p>`).join('')}`
    + x.tabelas.map((t) => `<h3>${esc(t.titulo)}</h3><table><thead><tr>${t.colunas.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.linhas.map((l) => `<tr>${l.map((v, i) => celula(t, i, v)).join('')}</tr>`).join('')}</tbody></table>`).join('')
    + `<h2>Exemplos</h2><ul>${x.exemplos.map((e) => `<li><span lang="${x.lang}">${esc(e.alvo)}</span> — ${esc(e.pt)}</li>`).join('')}</ul>`
    + `<h2>O erro típico de quem fala português</h2><ul>${x.erros.map((e) => `<li>✗ <span lang="${x.lang}">${esc(e.errado)}</span> → ✓ <span lang="${x.lang}">${esc(e.certo)}</span>. ${esc(e.motivo)}</li>`).join('')}</ul>`
    + `<h2>Perguntas frequentes</h2>${x.perguntas.map((q) => `<h3>${esc(q.p)}</h3><p>${esc(q.r)}</p>`).join('')}`
    + `<p><a href="/curso/${x.idioma}/dia/${x.aula.dia}">Praticar na aula ${x.aula.n} do curso de ${esc(x.nomeIdioma)}</a> · <a href="/curso/${x.idioma}/dia/1">Começar pelas 2 aulas grátis</a> · <a href="/gramatica/${x.idioma}">Gramática do ${esc(x.nomeIdioma)}</a>${x.livro ? ` · <a href="${x.livro.caminho}">${esc(x.livro.rotulo)}</a>` : ''}</p>`;
}
