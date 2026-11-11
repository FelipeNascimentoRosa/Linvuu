# Auditoria de design do site — 11/11/2026

**Registrado por: Cline** (ordem do Felipe em 11/11/2026: "acrescente no seu dossiê e deixe lá no GitHub para o Claude ler").

Este documento é **só diagnóstico**: nenhum arquivo de código, CSS ou conteúdo foi alterado por esta auditoria. O único artefato é este `.md`. As correções ficam para PRs próprios, na ordem do §6.

**Método:** medição em produção nos dois domínios, **somente `GET` público**, entre **05:50 e 06:15 UTC de 11/11/2026** (02:50–03:15 em Brasília), depois do deploy `3401565ff` (#555) documentado em [`AUDITORIA-SITE-2026-11-11.md`](AUDITORIA-SITE-2026-11-11.md). Playwright 1.64.1 (Apache-2.0, o mesmo já instalado com `--no-save`, ver `REPOS_FINAL.md` §1), Chromium, capturas em 360×800, 820×1180 e 1440×900, mais uma passagem de LCP em perfil de celular (390×844, CPU 4× mais lenta, 1,6 Mbps, latência 150 ms). Nenhuma escrita em produção, nenhum segredo, nenhum dado pessoal, nenhuma conta de usuário usada.

**Régua de julgamento:** o que o próprio repositório já decidiu — [`SISTEMA-DE-DESIGN.md`](SISTEMA-DE-DESIGN.md) (contraste, alvos de 44 px em `pointer: coarse`, sombras, movimento), [`BRIEFING-DESIGN.md`](BRIEFING-DESIGN.md) §0 (só quatro cores, escala "forte e hierárquica", proibido template de IA), [`VUU.md`](VUU.md):8 (mascote nunca abaixo de 96 px) e `src/tokens.css`. Onde não há regra escrita, o critério é medido: ou existe número, ou não entra neste documento.

**Como ler cada achado:** `D##` · sintoma (o que se vê) · **medida** (número colado) · **código** (`arquivo:linha`) · **correção mínima**. Sem "achismo de gosto": o que não pude medir está no §8 (Limitações).

**Para o próximo agente (Claude, Codex, Antigravity):** não reabra o **D10** — a barra de cookies já tem correção na branch `ui/barra-consentimento-compacta`, falta merge. A fila de trabalho é o §6, um PR por linha. Os números do §1 podem ser reconferidos com o Anexo A do §7 (≈1 minuto por rota); ao mexer em tipografia ou alvos, cole a saída antes e depois — "deveria ficar melhor" não é verificação. Este documento não substitui `docs/ESTADO-ATUAL.md` nem a leitura da `main` atual.

---

## 1. Resumo em números

| Medida (11/11/2026, produção) | Resultado |
|---|---|
| Rotas medidas | **10** (7 no `.com.br`: home, cursos, curso, aula, livros, gramatica, assinatura; 3 no `.com`: home, cursos, aula) × 3 larguras = **30 capturas** |
| Overflow horizontal | **0 em 30** combinações |
| `<h1>` por página | **1 em 30** |
| Link "pular para o conteúdo" | **presente** nas 4 páginas inspecionadas no DOM |
| CLS | **0** em 28 de 30; **0,001** em `/curso` e `/gramatica` no desktop |
| CSS de produção | **23,6 kB gzip** (limite do repositório: 50 kB) |
| Contraste | **29 de 29 pares aprovados** (AA/AAA) — `npm run validar:design` exit 0 |
| H1 no desktop | **58 px**; H2 **56 px** (2 px de diferença) |
| H1 no celular (360 px) | **34 px**; H2 **36 px** — **o H2 é maior que o H1** |
| Linhas do H1 no desktop | **4** em português; **3** em inglês |
| Alvos de toque < 44 px, home 360 | **24 de 62** |
| Alvos de toque < 44 px, `/gramatica` 360 | **139 de 181** (77%) |
| Texto < 14 px, home 360 / `/curso` 360 | **23** / **484** elementos (menor: **9 px**) |
| Campos de formulário < 16 px | `select` **14 px** (altura 38), `checkbox` **13 px** (altura 20) |
| Maior medida de linha | **144 caracteres** (`/gramatica`, coluna de 1070 px, 17 px) |
| Cores de texto distintas | **17** na home, 10 no `/curso`, 9 em `/gramatica`, 6 na `/aula` |
| Altura total no celular | **11.052 px** (home) e **13.599 px** (`/curso`) |
| Peso por página | **396–960 kB**, 15–26 requisições |
| LCP com CPU 4× + 1,6 Mbps | **3.304 ms** (home), **2.684 ms** (`/gramatica`), **2.280 ms** (`/curso`) — elemento LCP é **texto** |

---

## 2. P1 — o que quebra a primeira tela

### D01 · No celular, o título das seções é maior que o título da página

- **Sintoma:** o H1 não domina; cada seção grita no mesmo volume do título e, no celular, grita mais.
- **Medida:** home em 1440 px → H1 **58 px** / H2 **56 px** (2 px, 3,4% de diferença). Home em 360 px → H1 **34 px** / H2 **36 px**. Obtido com `getComputedStyle` e contagem de caixas de linha (`Range.getClientRects`).
- **Código:** `src/pages/home-brasileiros.css:5` define `clamp(38px,4.2vw,58px)` para o H1 (o token `--t-h1` de 44 px nunca é usado); `:6` define o H2 como `clamp(36px,4vw,56px)`; `:172` reduz o H1 no celular a `clamp(30px,9.4vw,36px)` — a 360 px dá 33,84 → **34 px**, abaixo do H2.
- **Correção mínima:** voltar à escala aprovada — `--t-h1` (44) no H1, `--t-h2` (34) no H2 — e manter a proporção no celular (ex.: 40 / 28), nunca H1 menor que H2.

### D02 · O H1 em português quebra em quatro linhas e o realce vira escadinha

- **Sintoma:** "Aprenda idiomas / **online,** / explicados em / português." — a palavra "online," fica órfã; o realce ocre quebra em três blocos de larguras diferentes, em degraus.
- **Medida:** 4 caixas de linha no H1 em 1440 px e também em 360 px; na home inglesa, **3**. O realce é `linear-gradient(transparent 64%, …)` com `box-decoration-break:clone` e `padding:0 .1em` — cada linha ganha margem lateral própria.
- **Código:** `src/pages/home-brasileiros.css:19`.
- **Correção mínima:** encurtar o H1 PT para a cadência do EN (ou `text-wrap:balance` + `max-width` em `ch`), e trocar o realce por sublinhado (`text-decoration`) ou remover o `padding` lateral — o degrau some sem perder a marca.

### D03 · No celular, a primeira tela não mostra nenhuma prova do produto

- **Sintoma:** em 360×800 entram logo, selo, H1, lead, chips de idioma e botão. O cartão de demonstração (Vuu, frase no café, botão de áudio) começa abaixo da dobra.
- **Medida:** o primeiro controle do cartão (`select` "Quero ouvir em") fica em **y = 897 px** num ecrã de **800 px**. Altura total da home no celular: **11.052 px**.
- **Código:** `src/pages/home-brasileiros.css:17` (`grid-template-columns:1.02fr .98fr`) e `:129` (abaixo de 700 px vira coluna única, texto sempre antes da cena).
- **Correção mínima:** no celular, levar um recorte da cena para dentro do primeiro ecrã (frase + botão de áudio, sem o cartão inteiro) ou inverter a ordem para cena → H1 → CTA.

### D04 · O botão principal do funil desaparece no celular

- **Sintoma:** no celular o cabeçalho mostra apenas logo e hambúrguer. "Começar grátis" só existe dentro do menu, como **9º item**, depois de Cursos, Gramática, Método, Planos, Avaliações e FAQ.
- **Medida:** logo 114×30 em y=19; hambúrguer 44×47 em y=10; nenhum CTA na primeira tela em 360 px. No desktop o CTA existe e passa contraste (12,20:1).
- **Código:** `src/redesign.css:25` — `@media(max-width:820px){.lv-nav,.lv-conta{display:none}.lv-burger{display:block;margin-left:auto}}` esconde `.lv-conta`, onde está o `<Link … className="btn btn-primary lv-head-cta">` de `src/components/Header.tsx:69`; a cópia dentro do menu móvel está em `Header.tsx:93`.
- **Correção mínima:** manter o CTA no cabeçalho até 480 px (só o botão, sem "Entrar") ou fixar o CTA no fim do primeiro ecrã.

---

## 3. P2 — sistema de leitura e de toque

### D05 · Alvos de toque abaixo dos 44 px que o próprio sistema exige

- **Sintoma:** links de rodapé em faixa alta, "Ouvir" minúsculo, logo pequeno — no celular, errar o toque é o normal.
- **Medida:** home 360 px → **24 de 62** alvos abaixo de 44 px; `/gramatica` 360 px → **139 de 181** (77%); `/curso` 360 px → 19 de 356. Casos: "Livro de alemão →" **117×24**, "Conhecer a coleção →" **152×28**, "Ver aulas ao vivo →" **134×32**, logo **114×30**, "Política de privacidade" **100×42**; no rodapé, "Todos os cursos", "Gramática", "Livros", "Quem somos" e "Por que estudar com a Linvuu?" medem **320×27** cada; em `/gramatica`, cada botão "Ouvir: …" mede **38×38**.
- **Código:** a regra está escrita em `docs/SISTEMA-DE-DESIGN.md:39` ("Alvos de toque de 44 px em `pointer: coarse`") e não é aplicada na composição do site: `src/pages/home-brasileiros.css:45` (link do cartão com `min-height:44px` só ali), rodapé e lista de gramática não têm `min-height`.
- **Correção mínima:** `min-height:44px` (ou `padding` vertical equivalente) nos links de rodapé e de lista, e área clicável de 44 px nos botões "Ouvir" — o ícone pode continuar 38 px.

### D06 · Campos de formulário abaixo de 16 px (zoom involuntário no iOS)

- **Sintoma:** ao tocar no seletor de idioma do cartão de demonstração, o Safari do iPhone amplia a página; a caixa fica desalinhada do resto.
- **Medida:** `select` com fonte **14 px** e altura **38 px** (desktop) / **38 px** (celular); `checkbox` com **13 px** e altura **20 px**; o campo de e-mail, correto, tem 17 px e 53 px.
- **Código:** `src/pages/home-brasileiros.css:34` (`.br-demo select{…font-size:14px}`); o checkbox é o do boletim, herdado de `src/styles.css`.
- **Correção mínima:** `font-size:16px` e `min-height:44px` no `select`; `width/height` de 24 px no checkbox com rótulo clicável.

### D07 · Texto abaixo do piso de 14 px da escala, inclusive no componente que vende

- **Sintoma:** "VUU · UM GOSTINHO DO SEU PRÓXIMO IDIOMA", "NO CAFÉ" e "Ouça. Repita." existem para orientar o visitante e são o texto que ninguém lê.
- **Medida:** **9 px** (`VUU · …`), **10 px** (`NO CAFÉ`), **11 px** (`CURSOS DE IDIOMAS ONLINE`, `Ouça. Repita.`), 12–13 px nos rótulos em geral. Por página, no celular: **23** elementos < 14 px na home e **484** no `/curso` (menor: 10 px). A escala aprovada começa em `--t-caption:14px` (`src/tokens.css:82`).
- **Código:** `src/pages/home-brasileiros.css:13` (`.br-eyebrow` 11 px), `:31` (`.br-demo-top` 9 px), `:35` (`.br-demo-context` 10 px), `:40` (`.br-sound>span` 11 px).
- **Correção mínima:** piso de 12 px para rótulo decorativo e 14 px para rótulo com informação; trocar caixa-alta com 9 px por caixa-alta com 12 px e `letter-spacing` menor.

### D08 · Linha de 144 caracteres em `/gramatica`

- **Sintoma:** os blocos "Compare com o português…" atravessam a coluna inteira; o olho perde a linha ao voltar.
- **Medida:** **144 caracteres** na linha mais longa de um parágrafo de 1070 px a 17 px (contagem caractere a caractere com `Range`). Os quatro piores blocos medem 144, 140, 138 e 138 caracteres. A home, no seu pior parágrafo, fica em 96 caracteres.
- **Código:** `src/tokens.css:106` define `--max-texto:68ch`, que esse bloco não usa; o container vem de `src/pages/gramatica.css`/`site-publico.css` (`--max` 1200 px aplicado ao texto).
- **Correção mínima:** aplicar `max-width:var(--max-texto)` (68ch) aos parágrafos de exemplo; a coluna pode ser larga, o texto dentro dela não.

### D09 · A escala tipográfica muda de rota para rota

- **Sintoma:** a mesma marca aparece com três hierarquias diferentes: home, `/gramatica` e rodapé não parecem do mesmo site.
- **Medida:** H1 = **58 px** (home), **62 px** (`/gramatica`); H2 = **56 px** (home), **26 px** e **30 px** (`/gramatica`), **12 px** (títulos do rodapé). Os tokens `--t-h1:44` e `--t-h2:34` (`src/tokens.css:75-76`) não são usados em nenhuma dessas rotas.
- **Código:** `src/pages/home-brasileiros.css:5-6` e `:172`; tamanhos locais em `src/pages/gramatica.css` e no rodapé de `src/styles.css`.
- **Correção mínima:** uma única tabela de tamanhos por função (título de página, título de seção, subtítulo, corpo, rótulo), consumida pelas três rotas; nenhum `clamp` local fora dela.

### D10 · A barra de cookies cobre conteúdo (já corrigida fora da `main`)

- **Sintoma:** no celular a barra ocupa 115 px do rodapé da tela em todas as páginas, e cobre a lista de aulas do `/curso`, o corpo da `/aula` e a letra miúda do herói no desktop.
- **Medida:** **115 px** de altura no celular (14,4% de 800 px) e **62 px** no desktop; a variável reservada `--lv-consent-h` vale **131 px** e só empurra o fim do documento, não o conteúdo.
- **Código:** `src/components/analytics-consent.css` (painel com três ações + texto) e `src/components/AnalyticsConsent.tsx`.
- **Estado:** **corrigido na branch `ui/barra-consentimento-compacta`** (`3b475dd05` "barra de cookies de uma linha no lugar do painel que cobria o herói", com teste em `2184aeaba`), **não mergeada**. Não reabrir como achado novo — o que falta é merge e verificação em produção.

### D11 · O Vuu é desenhado abaixo do tamanho mínimo que o próprio `VUU.md` fixa

- **Sintoma:** no herói da home o mascote aparece como um carimbo de 48 px dentro do cartão; a expressão (capuz, mão no queixo) se perde.
- **Medida:** **48×48 px** no cartão de demonstração e **40×44 px** no bloco de retomada. A regra escrita é "nunca menor que 96 px de altura" (`docs/VUU.md:8`), e o carregamento usa corretamente 96 px (`src/components/carregando.css:15`).
- **Código:** `src/pages/home-brasileiros.css:32` (`.br-vuu{width:48px;height:48px}`) e `src/pages/HomeBrasileiros.tsx:51` (`width="40" height="44"`).
- **Correção mínima:** 96 px no mínimo nos dois pontos, ou nenhum Vuu — o avatar circular de 48 px é o caso que a regra quis proibir.

---

## 4. P3 — densidade, argumento e custo

### D12 · A paleta promete quatro cores e o site entrega 54 tokens e 17 cores de texto

- **Sintoma:** a home não parece uma página de duas cores de texto; cinzas e verdes quase iguais se acumulam sem função.
- **Medida:** **17** cores de texto distintas na home (18 contando o `rgba` do selo), **10** no `/curso`, **9** em `/gramatica`, **6** na `/aula`. Oito delas são verdes a menos de 20 unidades entre si: `#464F3F`, `#4E5949`, `#555C53`, `#4C624B`, `#535C50`, `#4B514A`, `#586553`, `#596155`. Em `src/tokens.css` há **54** declarações `--site-*` e ainda `--tinta:#2D4A63` (azul, linha 139).
- **Código:** `docs/SISTEMA-DE-DESIGN.md:9` fala em "as quatro cores aprovadas"; `src/tokens.css:138-196`.
- **Correção mínima:** manter duas cores de texto (principal e secundário) e usar peso/tamanho para o resto; os seis verdes de rótulo viram um só (`--site-texto-nota`) e o azul `--tinta` sai do site público.

### D13 · `/curso` tem 13.599 px de altura no celular

- **Sintoma:** 312 sessões listadas uma a uma, cada linha com o rótulo "Sessões 5–8" empurrado para a margem direita, deixando o meio vazio; são necessárias dezenas de rolagens para ver o preço.
- **Medida:** **13.599 px** de altura a 360 px e **10.854 px** a 1440 px (a página mais alta do site; a segunda é a home, com 11.052 px no celular). A página tem **356** alvos de toque — o conteúdo é uma lista de 312 itens, não uma página.
- **Código:** `src/pages/Curso.tsx` (lista de sessões) + `src/pages/home-brasileiros.css` (linhas de sessão).
- **Correção mínima:** agrupar por módulo (8–12 sessões) em `<details>` fechado por padrão, com a primeira aberta; o preço e o CTA sobem para o fim do primeiro ecrã.

### D14 · A sessão grátis veste a casca de aluno logado

- **Sintoma:** quem abre `/curso/:id/dia/1` sem conta vê "TRILHA · RUSSO" e o cumprimento "Olá" na coluna lateral, além de um botão "recolher" para uma barra que não tem nada a recolher.
- **Medida:** 2 controles de casca (trilha + recolher) numa página de visitante; a aula em si tem só 1.672 px de altura — a casca é a maior parte da moldura.
- **Código:** `src/pages/Dia.tsx:8` (importa `AreaAluno`) e `:77` (envolve o conteúdo em `<AreaAluno>`); a casca está em `src/pages/AreaAluno.tsx:120-129`.
- **Correção mínima:** uma casca "aula aberta" para quem não tem conta — sem trilha, sem nome, sem recolher, com um único CTA de cadastro.

### D15 · `/assinatura` não mostra preço no primeiro ecrã

- **Sintoma:** em 390×844 o primeiro ecrã traz "DISPONÍVEL HOJE / Assinatura atual", um parágrafo genérico, um botão-fantasma "Testar 2 aulas grátis, sem cartão" e uma nota sobre conta. Nenhum valor.
- **Medida:** 0 de 3 preços visíveis antes da primeira rolagem; os cartões de plano começam depois de dois parágrafos e uma nota.
- **Código:** `src/pages/Assinatura.tsx:45-72` (cabeçalho, `s.intro`, botão-fantasma e nota antes dos planos).
- **Correção mínima:** subir os três planos para o primeiro ecrã e mover `s.intro`/nota para depois; um preço por cartão, com o mensal como âncora.

### D16 · O herói do `.com` oferece um idioma que a nota logo abaixo cancela

- **Sintoma:** os chips do herói em inglês são Spanish, French, Brazilian Portuguese e Russian; a nota cinzenta imediatamente abaixo diz que "Spanish, German and Italian are coming as soon as their English explanations are ready".
- **Medida:** 1 dos 4 chips oferecidos está cancelado pelo texto a 120 px de distância; em português a nota equivalente é vazia (`''`), então só o visitante inglês vê a contradição.
- **Código:** `src/i18n/home.ts:150-152` (`homeNotice`, só `en`) contra a lista de chips do herói.
- **Correção mínima:** o chip indisponível vira "Spanish · soon" (desabilitado, com o motivo no próprio chip) e a nota desaparece — a informação fica onde o clique acontece.

### D17 · A seção "A OFERTA DE HOJE" é desmentida pelo FAQ da mesma página

- **Sintoma:** o bloco de planos abre com o rótulo "A OFERTA DE HOJE" e três cartões com preço; seis telas depois, o FAQ responde que "Start, Basic, Intermediário e Premium estão em preparação" e que "os preços e as condições serão informados antes da contratação".
- **Medida:** 2 textos contraditórios na mesma URL (`/#planos` e `/#faq`), ambos visíveis sem login.
- **Código:** `src/pages/OfertaAtual.tsx:29-33` (rótulo + cartões) contra `src/i18n/home.ts:52` (resposta do FAQ) e `:54` (o apoio Premium "será definido antes do lançamento").
- **Correção mínima:** escolher um dos dois — ou a seção é oferta (e o FAQ descreve o que já existe), ou é prévia (e o rótulo diz "Planos previstos", sem preço em cartão). O FAQ não pode ser o lugar onde a oferta se retrata.

### D18 · O custo de carregamento é de renderização, não de imagem

- **Sintoma:** no celular a página demora a aparecer mesmo com o HTML servido em 169–509 ms.
- **Medida (390×844, CPU 4× mais lenta, 1,6 Mbps, latência 150 ms):** LCP **3.304 ms** na home (elemento: `H1`), **2.684 ms** em `/gramatica` (`P`), **2.280 ms** em `/curso` (`P`). O `DOMContentLoaded` da home chega a **2.623 ms** com TTFB de 509 ms — quase 2,1 s entre receber o HTML e ter o DOM pronto, e o LCP acontece 681 ms depois disso. Requisições nessa passagem: 16 / 21 / 13; peso transferido 419 / 422 / 388 kB. Sem limitação de rede, as mesmas páginas ficam em 396–960 kB e 15–26 requisições.
- **Código:** o LCP é sempre texto — o gargalo é CSS/JS de render, não imagem (nenhuma imagem é candidata a LCP nas três rotas).
- **Correção mínima:** cortar o CSS crítico da home (23,6 kB gzip, todo bloqueante) e adiar o JS que não é do primeiro ecrã; nenhuma otimização de imagem muda este número.

---

## 5. O que já está certo (medido — não regredir)

- **Zero overflow horizontal** nas 30 combinações de rota × largura. Nenhuma barra de rolagem lateral, nenhum elemento cortado.
- **Um `<h1>` por página** nas 30 combinações.
- **Link "pular para o conteúdo"** presente no DOM das 4 páginas inspecionadas (home, `/gramatica`, `/curso`, `/aula`) — não é achado em aberto.
- **CLS 0** em 28 de 30 combinações e **0,001** nas outras duas. Nenhuma imagem sem `width`/`height` em rota nenhuma (`imgsSemDim: 0/9`, `0/8`, `0/3`…).
- **Contraste aprovado:** `npm run validar:design` → **exit 0**, 29 pares AA/AAA, CSS de produção **23,6 kB gzip** (limite 50 kB), nenhum hex direto nos módulos.
- **`prefers-reduced-motion` honrado** (`src/pages/home-brasileiros.css:158`): animações e transições desligadas, `scroll-behavior:auto`.
- **Estrutura semântica correta:** `main`, `nav`, `section` com `aria-labelledby`, `role="status"` nos avisos.

## 6. Ordem de ataque (sugestão; cada item é um PR)

| # | Ação | Achados | Arquivos | Verificação |
|---|---|---|---|---|
| 1 | Uma escala tipográfica única | D01, D02, D09 | `src/tokens.css`, `home-brasileiros.css`, `gramatica.css`, rodapé | `npm run validar:design` + script do §7 (H1 > H2 em 360 e 1440) |
| 2 | Primeiro ecrã no celular: prova e CTA | D03, D04 | `home-brasileiros.css`, `Header.tsx`, `redesign.css` | script do §7 (CTA visível em 360×800) + capturas |
| 3 | Alvos de 44 px e campos de 16 px | D05, D06 | rodapé, `gramatica`, `home-brasileiros.css` | script do §7 (0 alvos < 44 px em `pointer: coarse`) |
| 4 | Mergear a barra de cookies de uma linha | D10 | branch `ui/barra-consentimento-compacta` | teste já existe: `scripts/testar-analytics-browser.mjs` |
| 5 | Conteúdo que não se contradiz | D16, D17 | `src/i18n/home.ts`, `OfertaAtual.tsx` | `npm run content:check` + revisão do Felipe |
| 6 | Piso de texto e medida de linha | D07, D08 | `home-brasileiros.css`, `gramatica.css`/`site-publico.css` | script do §7 (≤ 68ch; nada informativo < 14 px) |
| 7 | Paleta e Vuu | D11, D12 | `tokens.css`, `home-brasileiros.css`, `HomeBrasileiros.tsx` | `npm run validar:design` + contagem de cores |

Os itens 1–3 fecham a primeira tela e cabem em três PRs pequenos. O item 5 depende de decisão do Felipe (produto), não de código. **Sugestão de régua:** D01, D05, D06 e D07 passam hoje por `npm run validar:design` sem quebrar nada — o validador mede contraste, `var()` e tamanho de CSS, mas não mede tamanho de texto, alvo de toque nem ordem de títulos. Enquanto não medir, o defeito volta.

---

## 7. Como reproduzir

```powershell
# 1. contraste, hex direto e tamanho do CSS (exit 0 esperado)
npm run validar:design

# 2. capturas do site publicado, como está hoje (script que já existe no repositório)
node scripts/design/olhar-site.mjs C:/temp/ui-antes

# 3. uma página, numa largura
node scripts/design/foto.mjs https://linvuu.com.br/ C:/temp/home-360.png 360 800
node scripts/design/foto.mjs https://linvuu.com.br/gramatica C:/temp/gramatica-1440.png 1440 900 cheia
```

Playwright 1.64.1 está instalado com `--no-save` (ver `REPOS_FINAL.md` §1). Se `require('playwright')` falhar num script fora do repositório, rode com `$env:NODE_PATH='<raiz do repositório>\node_modules'`.

**Anexo A — tipografia, alvos e campos** (`tipografia.cjs`, arquivo fora do repositório; só `GET` público):

```js
const { chromium } = require('playwright');
const alvos = [
  ['br-home-1440', 'https://linvuu.com.br/', 1440, 900],
  ['br-home-360', 'https://linvuu.com.br/', 360, 800],
  ['br-gramatica-1440', 'https://linvuu.com.br/gramatica', 1440, 900],
  ['br-gramatica-360', 'https://linvuu.com.br/gramatica', 360, 800],
];
(async () => {
  const nav = await chromium.launch();
  for (const [nome, url, w, h] of alvos) {
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    await pg.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await pg.evaluate(() => document.fonts.ready);
    const out = await pg.evaluate(() => {
      const cs = getComputedStyle;
      const px = (el) => Math.round(parseFloat(cs(el).fontSize));
      const caixa = (el) => { const b = el.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height) }; };
      const linhas = (el) => {
        const r = document.createRange(); r.selectNodeContents(el);
        return new Set([...r.getClientRects()].map((x) => Math.round(x.top))).size;
      };
      const alvos = [...document.querySelectorAll('a,button,select,input[type=checkbox]')]
        .map((el) => ({ txt: (el.textContent || el.getAttribute('aria-label') || el.type || '').trim().slice(0, 40), ...caixa(el) }))
        .filter((x) => x.h < 44);
      const miudos = [...document.querySelectorAll('body *')]
        .filter((el) => !el.children.length && el.textContent.trim() && px(el) < 14)
        .map((el) => ({ px: px(el), txt: el.textContent.trim().slice(0, 40) }));
      const campos = [...document.querySelectorAll('input,select,textarea')]
        .map((el) => ({ tipo: el.type || el.tagName.toLowerCase(), px: px(el), ...caixa(el) }));
      const h1 = document.querySelector('h1'), h2 = document.querySelector('h2');
      return { h1: { px: px(h1), linhas: linhas(h1) }, h2: px(h2), alvos, miudos, campos,
        total: document.querySelectorAll('a,button,select').length, altura: document.body.scrollHeight };
    });
    console.log(`${nome} h1=${out.h1.px}/${out.h1.linhas}l h2=${out.h2} alvos<44=${out.alvos.length}/${out.total} miudos=${out.miudos.length} altura=${out.altura}`);
    console.log('  menores:', JSON.stringify(out.miudos.slice(0, 5)), 'campos:', JSON.stringify(out.campos));
    await ctx.close();
  }
  await nav.close();
})();
```

**Anexo B — LCP em perfil de celular** (`lcp-throttle.cjs`): `Emulation.setCPUThrottlingRate {rate:4}` + `Network.emulateNetworkConditions {latency:150, downloadThroughput:1,6 Mbps / 8}`, viewport 390×844 com `deviceScaleFactor:2` e `PerformanceObserver` de `largest-contentful-paint` injetado por `addInitScript`. Saída no §4 (D18).

Os PNGs e o `medicoes.json` desta auditoria ficaram fora do repositório (`%TEMP%\auditoria-visual\`), como na auditoria de SEO — nenhum artefato binário entra no PR.

---

## 8. Limitações desta auditoria

1. **Não houve revisão humana.** É medição automática com saída colada, não parecer. O julgamento de gosto (o que é bonito) fica com o Felipe.
2. **Um único motor.** Chromium via Playwright. Safari/iOS e Firefox não foram medidos; o zoom de campo abaixo de 16 px (D06) é comportamento documentado do iOS, lido no CSS, não observado em aparelho.
3. **Viewport sintético.** 360×800, 820×1180 e 1440×900 a `deviceScaleFactor:1`. Não avalia nitidez em ecrã 2×/3× nem `safe-area` de iPhone com notch.
4. **Contraste por token, não por pixel.** O `validar:design` resolve `var()` no CSS; texto sobre imagem, sobre gradiente ou sobre o realce ocre não foi medido visualmente.
5. **LCP é amostra.** Uma rodada por rota em rede simulada pelo CDP, não a distribuição do CrUX nem a mediana de campo. O TTFB alto da home (509 ms) sugere partida a frio do contêiner.
6. **Nada da área logada.** Só a aula pública foi medida. Painel do aluno, e-mails, app Android e fluxo de pagamento não entraram.
7. **Nenhuma conta usada, nenhum fluxo de compra executado.** O funil foi avaliado pelo que a página mostra a um visitante.
8. **A contagem de cores** usa `color` computada de elementos com texto visível; `rgba` conta como cor distinta e o mesmo tom em `rgb()`/`rgba()` conta duas vezes.
9. **D10 já tem dono.** A barra de cookies foi corrigida em `ui/barra-consentimento-compacta`; este documento registra a medida original para o merge ter com o que comparar.
10. **Nada disto é dito sobre código que não existe.** Todos os `arquivo:linha` foram lidos na `main` de 11/11/2026; se a linha mudar, o achado continua válido pelo texto citado.

---

## 9. Referências cruzadas

- [`AUDITORIA-SITE-2026-11-11.md`](AUDITORIA-SITE-2026-11-11.md) — auditoria de indexação/SEO do mesmo dia; este documento não repete nem contradiz os números dela.
- [`SISTEMA-DE-DESIGN.md`](SISTEMA-DE-DESIGN.md) — tokens, temas, contraste, alvos de 44 px, movimento.
- [`BRIEFING-DESIGN.md`](BRIEFING-DESIGN.md) §0 — quatro cores, escala hierárquica, o que é proibido.
- [`VUU.md`](VUU.md):8 — o Vuu nunca abaixo de 96 px.
- [`DECISAO-SITE-INTERNACIONAL.md`](DECISAO-SITE-INTERNACIONAL.md) — um idioma de interface por domínio (base do D16).
- `PENDENCIAS.md` — fila de achados fora de escopo.
- Branch `ui/barra-consentimento-compacta` — correção do D10, ainda não mergeada.
