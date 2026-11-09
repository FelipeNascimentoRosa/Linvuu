# EN_AUDIT — Fase 1: auditoria da lacuna de inglês (09/11/2026)

> **Estado: medido, sem revisão humana, sem nenhuma página reescrita.**
> Este documento responde à Etapa 1 do [`PROMPT_EN.md`](PROMPT_EN.md): para cada página pública, existe versão em inglês, e o que ela tem de errado.
> Os números vêm de [`METRICS_EN.md`](METRICS_EN.md) (Etapa 2), medidos com `npm run medir:ingles` em 09/11/2026.

**In English (abstract).** All 39 public page routes of `linvuu.com` were audited by fetching the server HTML and, for pages the React client mounts, by rendering them in Chromium against production. 34 routes already serve native-quality English (median 0 grammar/usage lints per 100 words, Flesch 52,7). Three routes (`/contato`, `/ex-alunos-udemy`, `/livro/gramatica-ru`) serve Portuguese copy under `lang="en"` and are the only real translation gap; several others carry English metadata problems (short titles, over-long or Portuguese descriptions). Nothing was rewritten in this phase.

## 1. O que foi auditado e como

- **Escopo:** todas as famílias de página pública de `linvuu.com` (perfil global, interface em inglês). São 39 rotas: home, vitrines, preço, institucional, cursos, aulas, gramática, livro, jurídico, conta e o 404.
- **Fonte das rotas:** `src/App.tsx` (rotas do React), `server.ts` (redirecionamentos), `public/sitemap-global.xml` (46 URLs) e `public/sitemap.xml` (87 URLs).
- **Medição:** 37 páginas medidas, 1 redirecionamento (`/livros` → `.com.br`) e 1 página de erro (404, sem conteúdo a auditar).
- **Regra desta fase:** nenhuma palavra foi alterada. O que está aqui é diagnóstico.

## 2. Onde o inglês mora (e por que não existe `/en/`)

A Etapa 1 do mandato pede "URL `/en/...` ou similar". Neste site o inglês **não** usa prefixo de caminho: ele tem domínio próprio.

- Decisão de 29/10/2026 (`docs/DECISAO-SITE-INTERNACIONAL.md`): **um idioma de interface por domínio** — `linvuu.com.br` em português, `linvuu.com` em inglês, mesmos caminhos. O perfil vem do cabeçalho `Host` (`src/i18n/locales.ts:28`) e no `.com` o locale padrão é `en` (`locales.ts:51`).
- Consequência: **a versão em inglês de `/cursos` é `https://linvuu.com/cursos`**. A coluna "URL em inglês" da tabela é, portanto, a mesma rota no domínio inglês.
- Custo de adotar `/en/` agora, com evidência: `docs/SEO_AUDIT.md` §7 registra `{"paginasHttp":3784,"redirecionados":281,"aliases":3,"resultado":"conforme"}`; os dois sitemaps somam 133 entradas; `server.ts` já tem 301 por domínio (`/curso/br/*`, `/brazilian-portuguese`, `/metodo`, `/preco`). Prefixar locales moveria 3.784 URLs e quebraria canonical, `hreflang` e os testes de paridade de `<head>`.
- Portanto o item "toda página precisa de URL `/en/...`" está **recusado com evidência**, não por conveniência. O que a regra quer — uma versão em inglês de qualidade nativa por página — é o que este documento mede.

## 3. Inventário: as 39 rotas públicas

Legenda de status: **nativo** = inglês escrito do zero, sem cara de tradução; **nativo (curto)** = inglês correto, mas com pouco texto; **português** = conteúdo em português publicado no domínio inglês; **gate** = inglês pronto, `noindex` porque a tradução do curso ainda não fechou; **redireciona**; **404**.

| # | Rota | Família | URL em inglês | Sitemap `.com` | robots | Status do inglês | Palavras · PT % · Flesch · SEO |
|---|---|---|---|---|---|---|---|
| 1 | `/` | home | `https://linvuu.com/` | sim | indexável | nativo | 339 · 0,0 · 58,5 · 77 |
| 2 | `/cursos` | vitrine | `https://linvuu.com/cursos` | sim | indexável | nativo (curto) | 162 · 0,0 · 41,1 · 79 |
| 3 | `/assinatura` | preço | `https://linvuu.com/assinatura` | sim | indexável | nativo | 356 · 0,6 · 59,8 · 79 |
| 4 | `/por-que-linvuu` | argumento | `https://linvuu.com/por-que-linvuu` | sim | indexável | nativo | 514 · 0,0 · 57,8 · 62 |
| 5 | `/portugues` | vitrine de idioma | `https://linvuu.com/portugues` | sim | indexável | nativo | 455 · 0,9 · 56,6 · 90 |
| 6 | `/russo-online` | vitrine de idioma | `https://linvuu.com/russo-online` | sim | indexável | nativo | 241 · 0,0 · 51,9 · 87 |
| 7 | `/sobre` | confiança | `https://linvuu.com/sobre` | sim | indexável | nativo | 373 · 0,0 · 47,0 · 69 |
| 8 | `/contato` | confiança | `https://linvuu.com/contato` | não | `noindex` | **português** | 229 · 4,4 · 44,6 · 79 |
| 9 | `/ex-alunos-udemy` | confiança | `https://linvuu.com/ex-alunos-udemy` | não | `noindex` | **português** | 424 · 9,0 · 46,8 · 90 |
| 10 | `/livro/gramatica-ru` | livro | `https://linvuu.com/livro/gramatica-ru` | não | `noindex` | **português** | 232 · 4,3 · 40,0 · 75 |
| 11 | `/livros` | livro | — | não | — | redireciona para `.com.br` | 301 |
| 12 | `/curso/br` | hub de curso | `https://linvuu.com/curso/br` | sim | indexável | nativo | 419 · 0,2 · n/a · 82 |
| 13 | `/curso/ru` | hub de curso | `https://linvuu.com/curso/ru` | sim | indexável | nativo | 406 · 0,0 · n/a · 82 |
| 14 | `/curso/fr` | hub de curso | `https://linvuu.com/curso/fr` | sim | indexável | nativo | 466 · 0,0 · n/a · 82 |
| 15 | `/curso/es` | hub de curso | `https://linvuu.com/curso/es` | não | `noindex` | gate (30 de 62 aulas traduzidas) | 708 · 0,4 · 24,6 · 67 |
| 16 | `/curso/de` | hub de curso | `https://linvuu.com/curso/de` | não | `noindex` | gate ("English edition in preparation") | 854 · 0,4 · 13,5 · 67 |
| 17 | `/curso/it` | hub de curso | `https://linvuu.com/curso/it` | não | `noindex` | gate ("English edition in preparation") | 653 · 0,8 · 13,3 · 67 |
| 18 | `/curso/en` | hub de curso | `https://linvuu.com/curso/en` | não | `noindex` | gate | 770 · 0,6 · 15,6 · 69 |
| 19 | `/curso/br/dia/1` | aula | `https://linvuu.com/curso/br/dia/1` | sim | indexável | nativo | 592 · 1,2 · 68,8 · 72 |
| 20 | `/curso/ru/dia/1` | aula | `https://linvuu.com/curso/ru/dia/1` | sim | indexável | nativo | 449 · 0,0 · 76,5 · 67 |
| 21 | `/curso/fr/dia/1` | aula | `https://linvuu.com/curso/fr/dia/1` | sim | indexável | nativo | 839 · 0,0 · 81,4 · 72 |
| 22 | `/curso/es/dia/1` | aula | `https://linvuu.com/curso/es/dia/1` | sim | **indexável** | nativo | 684 · 0,0 · 68,0 · 72 |
| 23 | `/curso/de/dia/1` | aula | `https://linvuu.com/curso/de/dia/1` | não | `noindex` | gate | 791 · 0,9 · n/a · 67 |
| 24 | `/curso/it/dia/1` | aula | `https://linvuu.com/curso/it/dia/1` | não | `noindex` | gate | 691 · 3,5 · 25,1 · 67 |
| 25 | `/curso/en/dia/1` | aula | `https://linvuu.com/curso/en/dia/1` | não | `noindex` | gate | 795 · 3,0 · 22,1 · 67 |
| 26 | `/gramatica` | índice de gramática | `https://linvuu.com/gramatica` | não | canonical `/gramatica/br` | nativo | 362 · 0,8 · 51,2 · 67 |
| 27 | `/gramatica/ru` | gramática | `https://linvuu.com/gramatica/ru` | sim | indexável | nativo | 1098 · 0,0 · 80,5 · 69 |
| 28 | `/gramatica/br` | gramática | `https://linvuu.com/gramatica/br` | sim | indexável | nativo | 1257 · 4,5 · 70,0 · 72 |
| 29 | `/gramatica/fr` | gramática | `https://linvuu.com/gramatica/fr` | sim | indexável | nativo | 1104 · 0,1 · 80,1 · 69 |
| 30 | `/gramatica/es` | gramática | `https://linvuu.com/gramatica/es` | sim | indexável | nativo | 1229 · 0,1 · 69,7 · 69 |
| 31 | `/gramatica/de` | gramática | `https://linvuu.com/gramatica/de` | não | `noindex` | gate | 341 · 0,9 · 51,2 · 67 |
| 32 | `/gramatica/it` | gramática | `https://linvuu.com/gramatica/it` | não | `noindex` | gate | 382 · 0,8 · 50,7 · 67 |
| 33 | `/gramatica/en` | gramática | `https://linvuu.com/gramatica/en` | não | `noindex` | gate | 396 · 1,3 · 55,0 · 67 |
| 34 | `/privacidade` | jurídico | `https://linvuu.com/privacidade` | não | indexável | nativo | 821 · 0,4 · 50,1 · 61 |
| 35 | `/termos` | jurídico | `https://linvuu.com/termos` | não | indexável | nativo | 566 · 0,5 · 59,9 · 71 |
| 36 | `/entrar` | conta | `https://linvuu.com/entrar` | não | `noindex` | nativo (curto) | 204 · 1,0 · 52,7 · 67 |
| 37 | `/cadastro` | conta | `https://linvuu.com/cadastro` | não | `noindex` | nativo (curto) | 222 · 0,9 · 54,0 · 67 |
| 38 | `/excluir-conta` | conta | `https://linvuu.com/excluir-conta` | não | indexável | nativo | 293 · 0,0 · 60,2 · 87 |
| 39 | caminho inexistente | 404 | — | — | `noindex` | n/a | 0 palavras |

**PT %** é o sinal de português (marcadores por 100 palavras, `METRICS_EN.md` §3.2); **Flesch** é o `fleschKincaidReadingEase` (`n/a` quando a página é lista de títulos, não prosa); **SEO** é a nota do `analyzeSeo` (0–100). A página 28 tem 4,5 % de sinal PT **legítimo**: são os exemplos em português de uma página que ensina português. Idem 24 e 25 (exemplos em italiano e em inglês).

**Resumo:** 30 rotas com inglês nativo publicado, 4 com inglês pronto mas `noindex` (gate de tradução), 3 em português (a lacuna real), 1 redirecionamento e 1 404.

## 4. Defeitos encontrados, com evidência

### F1 — Três páginas publicadas em português no domínio inglês (defeito principal)

`lang="en"`, `noindex`, 200 OK — e o corpo em português. Mesma classe de defeito que `/sobre` e `/por-que-linvuu` tinham antes de serem traduzidas.

| Rota | Título servido | Sinal PT | Ortografia Harper | Trecho literal |
|---|---|---|---|---|
| `/contato` | `Contato · Linvuu` | 4,4 % | 43 de 46 lints | "FALE COM A LINVUU · Dúvidas sobre os cursos, os livros ou o seu acesso? … **Esta página está em português.**" |
| `/ex-alunos-udemy` | `Ex-alunos da Udemy: continue o russo na Linvuu · Linvuu` | 9,0 % | 155 de 162 lints | "Se você fez um dos meus cursos de russo na Udemy, a Linvuu é o próximo passo… **Esta página está em português.**" |
| `/livro/gramatica-ru` | `Gramática russa A1–A2 · Linvuu` | 4,3 % | 47 de 50 lints | "**Este livro está escrito em português, para quem fala português.** … A gramática russa que faltava para o estudante brasileiro." |

Duas delas avisam o leitor, em português, que estão em português. Isso é honesto com quem chega, e continua sendo o defeito: a promessa do `.com` é inglês (Regra de Ouro 1).

Agravantes medidos:
- `/contato` **não é linkada** no `.com`: a barra superior troca o link por `mailto:` no perfil global (`src/components/BarraTopo.tsx`). A página existe, é servida e não tem entrada interna.
- A descrição de `/livro/gramatica-ru` é a **genérica brasileira** ("Cursos de inglês, espanhol, francês… feitos para brasileiros"), 169 caracteres, numa página `noindex`.
- Correção certa: **traduzir**, não redirecionar. Redirecionar `/contato` para `/` deixaria o leitor sem canal de contato em inglês; as outras duas são páginas de conversão com oferta específica.

### F2 — Metadados em português em páginas que já têm interface em inglês

`/entrar` e `/cadastro` têm título em inglês (`Sign in · Linvuu`, `Sign up · Linvuu`) e a **mesma descrição genérica em português**, 169 caracteres, herdada do padrão do site. É o mecanismo do F1 (descrição padrão em `pt-BR`), mas só na `<meta>`, não no corpo.

### F3 — Títulos curtos (abaixo de 30 caracteres)

| Rota | Título | Caracteres |
|---|---|---|
| `/cursos` | `Courses · Linvuu` | 17 |
| `/contato` | `Contato · Linvuu` | 17 |
| `/entrar` | `Sign in · Linvuu` | 17 |
| `/cadastro` | `Sign up · Linvuu` | 17 |
| `/assinatura` | `Subscription · Linvuu` | 22 |
| `/termos` | `Terms of use · Linvuu` | 22 |
| `/privacidade` | `Privacy policy · Linvuu` | 24 |
| `/sobre` | `Who writes Linvuu · Linvuu` | 27 |

Um título de 17 caracteres desperdiça a parte mais visível do resultado de busca; a faixa útil é 50–60 (Etapa 5 do mandato).

### F4 — Descrições longas demais (truncadas) ou curtas demais

- Longas: `/curso/de` 222, `/curso/es` 212, `/curso/it` 197, `/por-que-linvuu` 170, `/sobre` 170, `/` 164, `/curso/fr` 161.
- Curtas: `/curso/en` 32 ("English for Portuguese speakers." — e o título promete "Learn English online, explained in English": a descrição contradiz o título), `/termos` 44, `/privacidade` 57, `/cursos` 97, `/russo-online` 100.

### F5 — Hierarquia de títulos rasa ou ausente

O `analyzeSeo` acusou `headings` em 10 páginas: 3 erros (`/entrar`, `/cadastro`, `/livro/gramatica-ru` — sem nenhum `h2`) e 7 avisos (`/gramatica`, `/gramatica/de|it|en`, `/curso/de|it|en/dia/1`). Todas têm exatamente um `h1`, o que está certo; falta o segundo nível que organiza o texto para quem lê na diagonal e para o trecho em destaque.

### F6 — Texto curto nas páginas que vendem

| Página | Palavras | Mínimo do mandato |
|---|---|---|
| `/cursos` | 162 | 600 |
| `/contato` | 229 | 600 |
| `/livro/gramatica-ru` | 232 | 600 |
| `/russo-online` | 241 | 600 |
| `/assinatura` | 356 | 600 |
| `/sobre` | 373 | 600 |
| `/portugues` | 455 | 600 |
| `/por-que-linvuu` | 514 | 600 |

A home tem 339. Nenhuma das oito principais chega a 600 palavras: não é defeito de gramática, é falta de matéria para ranquear e para convencer.

### F7 — Nenhuma "quick answer" nos primeiros 100 palavras (27 de 37 páginas)

O padrão que o `analyzeSeo` reconhece (resposta direta, `TL;DR`, tabela de comparação) não existe em nenhuma página. Onde já há um parágrafo de abertura que responde, ele não está marcado como resposta.

### F8 — Vírgula serial inconsistente (70 ocorrências)

O Harper, em dialeto americano, cobra a vírgula de Oxford em 70 pontos: `/portugues` 7, `/sobre` 6, `/` 4, `/por-que-linvuu` 3, `/privacidade` 3, `/termos` 3. Não é erro gramatical: é **guia de estilo não decidido**. O site mistura as duas convenções. Decisão necessária na Fase 2 (recomendo Chicago/Oxford, que é o que o verificador já cobra).

### F9 — Microcopy fora do padrão

- `/assinatura`: "Subscription **Subscription**" (migalha + `h1` colados no texto) e "Payment processed by Stripe" repetido nos dois planos.
- `/sobre`: "Linvuu **Linvuu**" (título + primeira linha).
- Aulas: "30 **min**" em todas as páginas de aula (o Harper prefere `minimum`); `/privacidade`: "plain text" → `plaintext`.
- `/curso/en`: título "Learn English online, explained in English" para um curso cujo público é incerto — quem fala português (a descrição diz isso) ou quem já fala inglês?

### F10 — Indexação incoerente entre hub e aula

`/curso/es` está `noindex`, mas `/curso/es/dia/1` está **indexável e no sitemap** — e o texto dela é inglês completo (684 palavras, 0 lint de gramática). Para o Google, a aula é a porta de entrada de um curso cujo hub não existe. `/curso/de|it|en` e `/gramatica/de|it|en` estão coerentes (hub e aula bloqueados).

### F11 — Inglês entregue de duas maneiras diferentes na mesma página

Cada rota é servida com um `<main data-prerender>` que fica **oculto quando o JavaScript roda** (`<style>@media (scripting:enabled){main[data-prerender]{display:none}}</style>`, `src/lib/metaRota.ts:389-390`). Para páginas com `corpo` pré-renderizado (home, aulas, gramática, sobre), quem chega sem JS lê um texto; quem tem JS lê o do React. Nas três páginas do F1 os dois caminhos são portugueses — mas a divergência entre os dois caminhos é um risco a manter sob medição, porque o texto que o Google indexa pode não ser o que o aluno lê.

## 5. O que já está bom (e não deve ser mexido sem motivo)

- **O inglês é nativo, não tradução automática.** Mediana de **0 lints de gramática/uso por 100 palavras** em 37 páginas; o pior caso é `/gramatica/fr` com 2,8 (exemplos em francês). Não há cara de texto passado por tradutor: as frases são curtas e concretas ("German, Spanish and Italian coming soon in English"; "Rules stated precisely, examples that test the rule, and attention to the mistake a learner actually makes").
- **Clareza dentro da faixa:** Flesch mediano 52,7 (alvo do mandato: 50–70); 18 das 33 páginas medidas como prosa caem na faixa, 11 ficam abaixo de 50 e 4 acima de 70.
- **Uma única `h1` por página** em todas as 37; nenhuma página com título duplicado entre `title` e `h1` (exceto F9).
- **Promessas honestas:** `/portugues` diz explicitamente que não promete fluência, prazo nem equivalência com Celpe-Bras; `/assinatura` informa reembolso de 7 dias e que a Stripe processa o pagamento. Isso é raro num site de cursos e é ativo de confiança — a reescrita das outras páginas deve copiar esse tom, não suavizá-lo.
- **Acessibilidade e desempenho não são o problema:** axe-core 4.14.0 com **0 violações** em 13 páginas e SEO/boas práticas 100 no Lighthouse (`METRICS.md`). O problema de inglês é de conteúdo, não de marcação.

## 6. O que esta auditoria não cobriu

| Item | Por quê | Onde fica |
|---|---|---|
| Microcopy fora do `<main>` (botões do rodapé, placeholders, mensagens de erro, avisos de cookie) | o extrator mede o conteúdo principal; o rodapé é igual em toda página e some do cálculo | Fase 4 |
| `alt` de imagens | 27 páginas sem `<img>` no conteúdo; as com imagem precisam de leitura manual | Fase 4 |
| E-mails transacionais (boas-vindas, recibo, exclusão) | não passam pelo HTML público | Fase 4 |
| Páginas autenticadas (`/conta`) | exige login | fora do escopo do mandato |
| APK (`perfil br`) | o app é o produto em português | fora |
| COMET/XCOMET (qualidade neural de tradução) | exige Python + PyTorch; não há ambiente preparado para isso neste repositório, e nenhuma página é tradução automática hoje | Fases 2–3, se alguma página passar a ser traduzida por máquina |
| MQM | framework aplicado à mão por página, na Fase 2/3, quando houver texto reescrito para comparar | Fases 2–3 |
| INP e dados de campo | sem credenciais de CrUX/Search Console | ver `METRICS.md` §6 |

## 7. Prioridade para a Fase 2 e a Fase 3

A ordem segue a receita: primeiro o que já recebe tráfego e vende, depois o que só informa. `docs/META-1M-2027.md` §4 é a régua — cada linha diz a que motor a página serve.

| Ordem | Página | Por quê agora | Defeitos a fechar |
|---|---|---|---|
| 1 | `/` | porta de entrada do domínio inglês; motor de aquisição | F6 (339 → 600+), F7, F8 |
| 2 | `/cursos` | decide se o visitante continua; só 162 palavras e título de 17 caracteres | F3, F4, F6 |
| 3 | `/assinatura` | página onde o dinheiro entra; texto bom, mas duplicado e sem `h2` | F9, F5 |
| 4 | `/por-que-linvuu` | argumento de venda mais longo (514 palavras); descrição truncada | F4, F7 |
| 5 | `/contato` | **F1**: hoje é português; é a página de confiança do domínio inglês | F1, F3, F6 |
| 6 | `/sobre` | confiança/autoria; título de 27 caracteres, Flesch 47 | F3, F4, F9 |
| 7 | `/ex-alunos-udemy` | **F1**: conversão de ex-alunos, 424 palavras em português | F1 |
| 8 | `/livro/gramatica-ru` | **F1**: produto pago, 232 palavras em português, `noindex` | F1, F4 |
| 9 | `/portugues`, `/russo-online` | vitrines de idioma; conteúdo bom, falta "quick answer" e palavras | F6, F7 |
| 10 | `/termos`, `/privacidade` | jurídico: Flesch 50 e 60, descrições de 44 e 57 caracteres | F3, F4 |
| 11 | gates (`/curso/de|it|en`, `/gramatica/de|it|en`) | tradução em curso; só entram quando o curso fechar | F10 |

O que **não** entra na Fase 2: `/curso/*` e `/gramatica/*` de conteúdo (já nativos e bem avaliados), `/gramatica/{ru,br,fr,es}` (1098–1257 palavras, Flesch 70–80) e as aulas `dia/1` (0,2–1,2 lint/100).

## 8. Critério de aceite por página (Fases 2 e 3)

Uma página só é dada por concluída quando **todas** as linhas passam, medidas com o mesmo comando antes e depois:

| Critério | Régua | Ferramenta |
|---|---|---|
| Gramática/uso | **0** lint crítico; no máximo 1 por 200 palavras (0,5 por 100) | Harper (`harper.js` 3.0.0) |
| Vírgula serial | uma convenção só na página, seguindo a decisão de estilo tomada na Fase 2 | Harper + leitura |
| Clareza | Flesch Reading Ease 50–70 (≥45 aceito em jurídico) | `@f-o-t/content-analysis` |
| Título | 50–60 caracteres, com a palavra-chave da página | medição em `resumo.json` |
| Descrição | 150–160 caracteres, em inglês, sem repetir o título | medição em `resumo.json` |
| Conteúdo | 600+ palavras nas páginas principais; hierarquia `h1` → `h2` → `h3` sem buraco | `analyzeSeo` |
| Quick answer | primeira resposta nos primeiros 100 palavras, quando a página responde a uma pergunta | `analyzeSeo` (`hasQuickAnswer`) |
| Idioma | 0 % de sinal PT fora de exemplo didático | `sinalPortugues` |
| SEO | nota ≥ 70 no `analyzeSeo` | `@f-o-t/content-analysis` |
| Marcação | axe-core 0 violações; Lighthouse SEO e acessibilidade 100 | `METRICS.md` §4 |
| Registro | trecho original, problema, correção e fonte em `NOTES_EN.md` | Etapa 7 do mandato |

Ferramentas que o repositório **não** usa, com motivo: LanguageTool (LGPL, pesado, e o Harper já cobre os casos encontrados), `@vuminhhoa/seo-analyzer` (fork do Yoast, GPL, e o `@f-o-t` cumpre o papel), `quality-docs` (exige configuração própria de `retext`, que já está montada aqui), LibreTranslate/Argos (nenhuma página é tradução automática hoje) e COMET (sem ambiente Python).
