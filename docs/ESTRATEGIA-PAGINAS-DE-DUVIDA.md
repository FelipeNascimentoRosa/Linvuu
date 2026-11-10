# Estratégia das páginas de dúvida (a partir dos livros)

Versão 1, 09/11/2026. Estado: **proposto** — nenhuma página publicada, nenhum código escrito.
Autoria dos textos-fonte: Felipe Nascimento Rosa e Luiza Nascimento Rosa.

## 1. O problema em uma frase

O `.com.br` tem 87 URLs e nenhuma delas responde à pergunta que o aluno digita. A explicação que
responde a essas perguntas **já está escrita** — dentro dos livros — e está atrás da assinatura ou
fora do bundle público. O gargalo não é escrever conteúdo novo: é publicar o que já existe na forma
em que as pessoas procuram.

Consequência prática: o material mais bem revisado da casa é invisível para o Google, e o aluno que
chega por uma dúvida (o público mais qualificado que existe, porque já está estudando) não tem
página para chegar.

## 2. Inventário medido (09/11/2026)

| Livro | Capítulos no sumário | Amostra grátis | Atrás da assinatura |
|---|---|---|---|
| Alemão | 28 (A1 17 · A2 11) | cap. 1–2 | 30 capítulos (`content/livros-privado/de`, JSON + MD) |
| Inglês | 28 (A1 8 · A1–A2 2 · A2 14 · B1 4) | cap. 1–2 | 28 capítulos (`content/livros-privado/en`) |
| Russo | 15 (A1 8 · A2 7) | cap. 1–2 | 16 capítulos (`content/livros-privado/ru`) |
| Espanhol | 14 (A1 9 · A2 5) | cap. 1–2 | — |
| Francês | 14 (A1 10 · A2 4) | cap. 1–2 | — |
| Italiano | 14 (A1 9 · A2 5) | cap. 1–2 | — |

Total: **113 capítulos escritos**; 12 públicos (2 por idioma) e 99 fora do alcance do Google.
Origem em Markdown, no repositório `Linvuu-Livros-em-PDF`: `livros/de/` (16 arquivos, ~210 KB) e
`livros/br-en/` (15 seções, ~430 KB). O mapa capítulo ↔ aula (`alinhamento.json`) existe para
alemão, inglês e russo — ver §10.

## 3. O que já funciona e não se refaz

- `/livros` (catálogo, capa, 2 capítulos grátis com áudio) — converte e tem áudio pronto.
- `/curso/<idioma>/dia/<n>` — 3.784 páginas HTTP, motor de aquisição atual.
- A família de rota `/gramatica/<idioma>` **existe, mas é uma página só por idioma**, com todos os
  tópicos juntos (`content/gramatica/<idioma>.json`: `categorias` + `topicos[]`, cada tópico com
  `aula`, `sessao`, `dia`, `titulo` e `explicacao`) e o pacote servido por `/api/gramatica/:idioma`.
  **Não existe** `/gramatica/<idioma>/<tema>` — rota por tema é código novo, com consequência de SEO
  (canonical, sitemap, hreflang) e risco de canibalizar `/curso/<idioma>/dia/<n>`, que já publica a
  explicação da sessão. O tópico da gramática já nasce ligado à aula (`aula`, `dia`), o que resolve o
  link interno sem trabalho.
- Áudio por frase já existe no acervo (`content/audio/*.csv`), inclusive as 884 frases dos capítulos
  privados de inglês.

## 4. A regra do grátis e do pago

| Vai para a página grátis e indexável | Continua pago |
|---|---|
| A regra (o «por dentro») | A cena com áudio |
| Uma tabela de referência | As frases de ouro |
| Três exemplos curtos | O treino em quatro degraus e a chave comentada |
| O erro típico de quem fala português | O retorno, o resumo e o «já consigo» |

O que é commodity (a regra, a tabela) vira isca; o que é produto (treino, áudio, correção) continua
na assinatura. Nenhum capítulo é republicado inteiro, e cada página derivada aponta para o capítulo.
Sem essa separação, a estratégia canibaliza o que se vende.

## 5. Formato da página

Rota proposta: `/gramatica/<idioma>/<slug>` (ex.: `/gramatica/de/der-die-das`). É rota **nova** sob
uma família que hoje é uma página por idioma; por isso o piloto é uma página e não trinta, e por isso
o §8 proíbe publicar capítulo inteiro.

Fonte do conteúdo, em ordem de preferência:

1. O capítulo do livro (`content/livros-privado/<idioma>/cap-NN.json`): tem tabela, `aviso` de erro
   típico e cena — o material mais bem revisado da casa.
2. O tópico já extraído em `content/gramatica/<idioma>.json`: é curto, já está ligado a `aula`/`dia`
   e serve de esqueleto quando o capítulo não cobre o tema.

1. `h1` na forma como se busca: «Quando uso der, die ou das?» — não «Substantivos: gênero».
2. Resposta direta em até 60 palavras, **antes** de qualquer tabela. É o trecho que aparece no
   resultado e decide o clique.
3. Uma tabela de referência (caso, artigo, exemplo).
4. Três exemplos com áudio, na língua estudada, com a tradução discreta.
5. «O erro típico de quem fala português» — bloco `aviso`, já existente no livro e no site.
6. Ponte dupla no fim: a aula grátis (`/curso/<idioma>/dia/<n>`) e o capítulo do livro
   (`/livros/<idioma>/capitulo/<n>`).
7. Dados estruturados: `Article` apenas. **Não** prometer FAQ rich result — o Google restringiu
   esse tipo de resultado em 2023; o valor está no conteúdo e na posição orgânica, não na estrela.
8. Idioma: português, portanto `.com.br`, `hreflang="pt-BR"`, `x-default` para o `.com.br`, entrada
   no `sitemap.xml` do `.com.br`. **Nada disso no `.com`** (lá o idioma é inglês).

## 6. Como escolher os temas (por evidência, não por intuição)

Critério, nesta ordem:

1. Consulta no Search Console do `.com.br` com **impressões > 0 e CTR ≈ 0** (posição média 11–30):
   é dúvida que já aparece no resultado e não tem página própria para atender. Essa lista é dado,
   não palpite, e sai em minutos pela API já conectada.
2. Sem dado de consulta: capítulos A1 primeiro (público maior), depois os que já têm aula
   correspondente — o link interno fica pronto sem escrever nada.

Universo: 113 páginas potenciais. O piloto é **uma**.

## 7. Piloto

Capítulo 5 do alemão, «Substantivos: gênero, artigo e plural» → `/gramatica/de/der-die-das`, porque
é a dúvida mais buscada do idioma e a que mais aparece em produção. Uma página, com o gerador e os
testes; só depois de o formato passar, as outras cinco.

Portões de verificação do piloto: `npm run content:check`, `npm run build`,
`node --import tsx scripts/testar-inventario-seo.ts`, `npm run testar:links-publicos`, e leitura do
HTML servido (`h1`, resposta nas primeiras 60 palavras, `hreflang`, ausência de `noindex`).
Revisão humana do texto: Felipe e Luiza — a página é derivada, mas publicada como autoria dos dois.

## 8. O que não fazer

- Não publicar capítulo inteiro: duplica `/livros`, canibaliza a assinatura e não cabe em página de dúvida.
- Não inventar exemplo: todo exemplo sai do capítulo ou da aula, com o trecho-fonte registrado por página.
- Não gerar por modelo de linguagem sem revisão dos autores: o texto é derivado e revisado, não sintético.
- Não colocar essas páginas no `.com`: são português e o domínio define o idioma.
- Não usar `noindex` «para não arriscar»: página criada para ser encontrada e marcada `noindex` é
  custo sem retorno — foi o que aconteceu com `/gramatica/de` no `.com` em 09/11.

## 9. Sequência sugerida

| # | Ação | Por quê |
|---|---|---|
| 1 | Piloto: 1 página de dúvida (alemão, der/die/das) | Prova o formato com o mínimo de código |
| 2 | 6 páginas de alemão A1 + seleção por Search Console | Densidade mínima para o hub `/gramatica/de` fazer sentido |
| 3 | Escala por idioma (inglês, depois russo) | O inglês é o livro com mais capítulos privados |
| 4 | Corrigir os 2 defeitos de UI já medidos | Contraste do CTA de `/assinatura` (1,36:1) e faixa de idioma cobrindo o menu em 390 px |
| 5 | Alemão no `.com` (aulas 2 a 72) | Ordem vigente do Felipe; independente deste eixo |

Os itens 1 a 3 são o eixo de aquisição; o 4 é o de conversão; o 5 é o internacional. Nenhum deles
substitui o outro, e a ordem entre 1–3 e 5 é decisão do Felipe.

## 10. Limitações declaradas

- Não há volume de busca verificado neste documento: a seleção do §6 ainda depende da leitura do
  Search Console, que não foi feita para este texto.
- A extração dos capítulos privados para o formato de página **não** existe hoje: `scripts/livros/`
  extrai PDF → JSON de capítulo, e não JSON → página de dúvida. O gerador é trabalho novo.
- O mapa capítulo ↔ aula (`alinhamento.json`) existe para **alemão, inglês e russo**; espanhol,
  francês e italiano não têm, então nesses três idiomas só a ponte para o livro funciona.
- Risco declarado de canibalização: `/curso/<idioma>/dia/<n>` já publica a explicação da sessão. A
  página de dúvida só se justifica onde a consulta é uma **pergunta** que a página de aula não
  responde no título — e isso se mede no Search Console antes de escalar, não depois.
- A versão em inglês da gramática (`content/gramatica/de.en.json`) foi descartada em 09/11 porque com
  1 aula de 72 traduzidas a página ficaria mista (inglês + português) e indexável. Ela volta quando a
  cobertura do curso justificar — é o mesmo eixo do item 5 do §9, não deste.
