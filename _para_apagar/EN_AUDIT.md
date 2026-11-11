# EN_AUDIT — Fase 1: auditoria da lacuna de inglês (09/11/2026)

> **Estado: medido, sem revisão humana, sem nenhuma página reescrita.**
> Este documento responde à Etapa 1 do [`PROMPT_EN.md`](PROMPT_EN.md): para cada página pública, existe versão em inglês, e o que ela tem de errado.
> Os números vêm de [`METRICS_EN.md`](METRICS_EN.md) (Etapa 2), medidos com `npm run medir:ingles` em 09/11/2026.

**In English (abstract).** All 39 public page routes of `linvuu.com` were audited by fetching the server HTML and, for pages the React client mounts, by rendering them in Chromium against production. 34 routes already serve native-quality English (median 0 grammar/usage lints per 100 words, Flesch 52,7). Three routes (`/contato`, `/ex-alunos-udemy`, `/livro/gramatica-ru`) serve Portuguese copy under `lang="en"` and are the only real translation gap; several others carry English metadata problems (short titles, over-long or Portuguese descriptions). Nothing was rewritten in this phase. **Later that day `/contato` was translated into English; `/ex-alunos-udemy` and `/livro/gramatica-ru` remain.**

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
| 8 | `/contato` | confiança | `https://linvuu.com/contato` | não | `noindex` | **português** → inglês em 09/11/2026 (F1) | 229 · 4,4 · 44,6 · 79 |
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

### F1 — Três páginas publicadas em português no domínio inglês (defeito principal) — **uma corrigida em 09/11/2026, duas pendentes**

`lang="en"`, `noindex`, 200 OK — e o corpo em português. Mesma classe de defeito que `/sobre` e `/por-que-linvuu` tinham antes de serem traduzidas.

| Rota | Título servido | Sinal PT | Ortografia Harper | Trecho literal |
|---|---|---|---|---|
| `/contato` | `Contato · Linvuu` | 4,4 % | 43 de 46 lints | "FALE COM A LINVUU · Dúvidas sobre os cursos, os livros ou o seu acesso? … **Esta página está em português.**" |
| `/ex-alunos-udemy` | `Ex-alunos da Udemy: continue o russo na Linvuu · Linvuu` | 9,0 % | 155 de 162 lints | "Se você fez um dos meus cursos de russo na Udemy, a Linvuu é o próximo passo… **Esta página está em português.**" |
| `/livro/gramatica-ru` | `Gramática russa A1–A2 · Linvuu` | 4,3 % | 47 de 50 lints | "**Este livro está escrito em português, para quem fala português.** … A gramática russa que faltava para o estudante brasileiro." |

Duas delas avisam o leitor, em português, que estão em português. Isso é honesto com quem chega, e continua sendo o defeito: a promessa do `.com` é inglês (Regra de Ouro 1).

Agravantes medidos:
- ~~`/contato` **não é linkada** no `.com`~~ — **corrigido em 09/11/2026**: a barra superior e o rodapé do `.com` passaram a apontar para `/contato` (antes trocavam o link por `mailto:`), e a página entrou no sitemap do `.com` com `hreflang` pt-BR/en/x-default.
- A descrição de `/livro/gramatica-ru` é a **genérica brasileira** ("Cursos de inglês, espanhol, francês… feitos para brasileiros"), 169 caracteres, numa página `noindex`.
- Correção certa: **traduzir**, não redirecionar. Redirecionar `/contato` para `/` deixaria o leitor sem canal de contato em inglês; as outras duas são páginas de conversão com oferta específica.

**`/contato` traduzida em 09/11/2026.** O texto vive em `src/lib/institucional.ts` (`CONTATO`, um registro por idioma, com `seoTitulo`/`seoDescricao` separados do `h1`); os rótulos dos canais vêm de `src/config/contato.ts`, que passou a receber o idioma (`contatos('en')`); o corpo pré-renderizado em `metaRota.ts` acompanha. O que foi medido no HTML servido com `Host: linvuu.com`: `h1` "Contact", canais "Website / E-mail / WhatsApp: Message on WhatsApp", nota dos autores em inglês, **sem** o aviso "Esta página está em português", `noindex` removido, `hreflang` en/pt-BR/x-default e `/contato` no sitemap do `.com` (46 → 47 URLs). No `.com.br` a página continua em português, com os mesmos canais e os mesmos rótulos de antes.

### F2 — Metadados em português em páginas que já têm interface em inglês — **corrigido em 09/11/2026**

`/entrar` e `/cadastro` tinham título em inglês (`Sign in · Linvuu`, `Sign up · Linvuu`) e a **mesma descrição genérica em português**, 160 caracteres, herdada do padrão do modelo.

Causa: rota sem descrição própria ficava com a `<meta name="description">` do `index.html`, que é em português. Correção estrutural em `src/lib/metaRota.ts`: `DESC_PADRAO` dá a descrição padrão **do idioma da página** (vale também para a 404), e `/entrar` e `/cadastro` passaram a ter descrição própria em inglês. O `.com.br` ficou idêntico ao que era (mesma descrição de 160 caracteres na 404 e nas duas páginas de conta).

### F3 — Títulos curtos (abaixo de 30 caracteres) — **corrigido no `.com` em 09/11/2026**

Eram oito, todos abaixo da faixa útil de 50–60 caracteres:

| Rota | Título antes | Caracteres | Título depois | Caracteres |
|---|---|---|---|---|
| `/cursos` | `Courses · Linvuu` | 16 | `Language courses: Portuguese, French and Russian · Linvuu` | 57 |
| `/entrar` | `Sign in · Linvuu` | 16 | `Sign in to your Linvuu account · Linvuu` | 39 |
| `/cadastro` | `Sign up · Linvuu` | 16 | `Create your Linvuu account · Linvuu` | 35 |
| `/assinatura` | `Subscription · Linvuu` | 21 | `Subscription: monthly and 12-month plans · Linvuu` | 49 |
| `/termos` | `Terms of use · Linvuu` | 21 | `Terms of use for the Linvuu site and courses · Linvuu` | 53 |
| `/privacidade` | `Privacy policy · Linvuu` | 23 | `Privacy policy: what data Linvuu collects · Linvuu` | 50 |
| `/sobre` | `Who writes Linvuu · Linvuu` | 26 | `Who writes Linvuu: the authors and the method · Linvuu` | 54 |
| `/contato` | `Contato · Linvuu` | 16 | `Contact Linvuu: e-mail, WhatsApp and LinkedIn · Linvuu` | 54 |

Regra de implementação: o rótulo de menu («Courses», «Subscription») continua servindo à navegação; o título de busca é um campo separado (`SEO_EN` em `metaRota.ts`, `seoTitulo` em `sobre.ts`). Em `/sobre` o `h1` e o lead visível não mudaram.

### F4 — Descrições longas demais (truncadas) ou curtas demais — **corrigido no `.com`, com quatro exceções**

- Longas, corrigidas: `/por-que-linvuu` 170 → 142, `/sobre` 170 → 158, `/` 164 → 152. As de `/curso/de` (222), `/curso/es` (212) e `/curso/it` (197) vêm de `content/cursos.json` e continuam: são páginas `noindex` (edição em inglês incompleta), onde a descrição não rende resultado de busca — ficam para quando o curso for traduzido.
- Curtas, corrigidas: `/cursos` 97 → 149, `/assinatura` 115 → 151, `/privacidade` 57 → 147, `/termos` 44 → 143, `/russo-online` 100 → 156, `/gramatica/ru|fr|es` 118|117|118 → 135|134|135.
- Continua curta: `/curso/en` (32 caracteres, "English for Portuguese speakers") — é o curso de inglês para brasileiros, oferecido no `.com.br` e `noindex` no `.com`; a descrição só faz sentido depois de decidir se a página fica.

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

`/curso/es` está `noindex`, mas `/curso/es/dia/1` está **indexável e no sitemap** — e o texto dela é inglês completo (684 palavras, 2 lints de gramática/uso, 0,3 por 100). Para o Google, a aula é a porta de entrada de um curso cujo hub não existe. `/curso/de|it|en` e `/gramatica/de|it|en` estão coerentes (hub e aula bloqueados).

### F11 — Inglês entregue de duas maneiras diferentes na mesma página

Cada rota é servida com um `<main data-prerender>` que fica **oculto quando o JavaScript roda** (`<style>@media (scripting:enabled){main[data-prerender]{display:none}}</style>`, `src/lib/metaRota.ts:389-390`). Para páginas com `corpo` pré-renderizado (home, aulas, gramática, sobre, contato), quem chega sem JS lê um texto; quem tem JS lê o do React. Nas duas páginas que restam do F1 os dois caminhos são portugueses — mas a divergência entre os dois caminhos é um risco a manter sob medição, porque o texto que o Google indexa pode não ser o que o aluno lê.

### Correção de metadados do `.com` (09/11/2026) — evidência

Medido no HTML que o servidor entrega com `Host: linvuu.com` (build de produção local, `NODE_ENV=production`), comparado ao baseline de `.en-baseline/fase1/resumo.json`:

| Rota | Título (caracteres) | Descrição (caracteres) |
|---|---|---|
| `/` | 46 → 46 | 164 → 152 |
| `/cursos` | 16 → 57 | 97 → 149 |
| `/assinatura` | 21 → 49 | 115 → 151 |
| `/por-que-linvuu` | 31 → 31 | 170 → 142 |
| `/sobre` | 26 → 54 | 170 → 158 |
| `/privacidade` | 23 → 50 | 57 → 147 |
| `/termos` | 21 → 53 | 44 → 143 |
| `/entrar` | 16 → 39 | 160 (português) → 143 (inglês) |
| `/cadastro` | 16 → 35 | 160 (português) → 132 (inglês) |
| `/pagina-que-nao-existe` | 23 → 23 | 160 (português) → 132 (inglês) |
| `/gramatica/ru` | 45 → 45 | 118 → 135 |
| `/gramatica/fr` | 44 → 44 | 117 → 134 |
| `/gramatica/es` | 45 → 45 | 118 → 135 |
| `/russo-online` | 45 → 45 | 100 → 156 |
| `/contato` | 16 → 54 | 115 → 124 (inglês; **F1** corrigido) |

O que a mudança **não** fez: nenhum texto visível mudou (`h1`, lead e corpo intactos; `/sobre` e `/por-que-linvuu` ganharam campos de SEO separados do texto da página), nenhuma rota mudou de idioma, `noindex` e `canonical` ficaram como estavam, e o `.com.br` foi conferido byte a byte nas mesmas rotas (descrição de 160 caracteres da 404 preservada). Os testes `testar:titulos` (95 títulos ≤ 60 nos dois domínios), `testar-contrato-billing`, `testar-inventario-seo`, `testar-seo-publico`, `testar-links-publicos` e `testar-robots-navegacao` passaram.

Uma correção factual veio junto: a descrição da home dizia «German, Spanish and Italian **coming soon in English**», mas os três cursos já têm as primeiras aulas explicadas em inglês (`/curso/es` tem 30 aulas). Agora diz «in translation», que é o estado real.


- **O inglês é nativo, não tradução automática.** Mediana de **0 lints de gramática/uso por 100 palavras** em 37 páginas; o pior caso é `/gramatica/fr` com 2,8 (exemplos em francês). Não há cara de texto passado por tradutor: as frases são curtas e concretas ("Rules stated precisely, examples that test the rule, and attention to the mistake a learner actually makes"; "The first two lessons of every course are free, no card needed").
- **Clareza dentro da faixa:** Flesch mediano 52,7 (alvo do mandato: 50–70); 18 das 33 páginas medidas como prosa caem na faixa, 11 ficam abaixo de 50 e 4 acima de 70.
- **Uma única `h1` por página** em todas as 37; onde a migalha de navegação repete o `h1`, o texto aparece duplicado na leitura (F9).
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
| INP e dados de campo | sem credenciais de CrUX/Search Console | ver `METRICS.md` §4 |

## 7. Prioridade para a Fase 2 e a Fase 3

A ordem segue a receita: primeiro o que já recebe tráfego e vende, depois o que só informa. `docs/META-1M-2027.md` §4 é a régua — cada linha diz a que motor a página serve.

| Ordem | Página | Por quê agora | Defeitos a fechar |
|---|---|---|---|
| 1 | `/` | porta de entrada do domínio inglês; motor de aquisição | F6 (339 → 600+), F7, F8 |
| 2 | `/cursos` | decide se o visitante continua; só 162 palavras e título de 17 caracteres | F3, F4, F6 |
| 3 | `/assinatura` | página onde o dinheiro entra; texto bom, mas duplicado e sem `h2` | F9, F5 |
| 4 | `/por-que-linvuu` | argumento de venda mais longo (514 palavras); descrição truncada | F4, F7 |
| 5 | `/contato` | **F1 corrigido em 09/11/2026**: já é inglês e é a página de confiança do domínio inglês; falta texto | F6, F7 |
| 6 | `/sobre` | confiança/autoria; título de 27 caracteres, Flesch 47 | F3, F4, F9 |
| 7 | `/ex-alunos-udemy` | **F1**: conversão de ex-alunos, 424 palavras em português | F1 |
| 8 | `/livro/gramatica-ru` | **F1**: produto pago, 232 palavras em português, `noindex` | F1, F4 |
| 9 | `/portugues`, `/russo-online` | vitrines de idioma; conteúdo bom, falta "quick answer" e palavras | F6, F7 |
| 10 | `/termos`, `/privacidade` | jurídico: Flesch 50 e 60, descrições de 44 e 57 caracteres | F3, F4 |
| 11 | gates (`/curso/de|it|en`, `/gramatica/de|it|en`) | tradução em curso; só entram quando o curso fechar | F5, F10 |

O que **não** entra na Fase 2: `/curso/*` e `/gramatica/*` de conteúdo (já nativos e bem avaliados), `/gramatica/{ru,br,fr,es}` (1098–1257 palavras, Flesch 70–80) e as aulas `dia/1` (0,2–1,2 lint/100).

**Estado em 09/11/2026:** F2, F3 e a maior parte de F4 foram fechados de uma vez, fora da ordem por página, porque eram metadados e não conteúdo (tabela de evidência no fim do §4). Com isso, na Fase 2 cada página entra pelo defeito que resta — F6 (palavras), F7 (quick answer), F8 (vírgula serial), F9 (microcopy) — não pelo título. `/contato` foi traduzida no mesmo dia, então o próximo F1 é `/ex-alunos-udemy`, seguido de `/livro/gramatica-ru`.

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
