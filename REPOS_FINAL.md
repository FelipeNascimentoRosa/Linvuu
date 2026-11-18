# REPOS_FINAL — registro de ferramentas de terceiros

**Verificado em 09/11/2026 contra a API do GitHub** (`gh api repos/<owner>/<repo>`), não contra memória de conversa. Licença, estrelas e data do último push estão na tabela do §3; onde a lista recebida não dava `owner/repo`, o item aparece como não verificável.

Este arquivo **não é uma ordem de instalação**. É o registro de quem pode entrar, sob que licença, e quem foi recusado — para que a mesma proposta não volte sem dado novo.

## 0. Como usar este arquivo (vale mais que qualquer item abaixo)

1. **Licença permissiva primeiro** (`AGENTS.md`): MIT, Apache-2.0, BSD-3. GPL, AGPL e SSPL não entram no site, nem como dependência de build, nem como ferramenta de serviço.
2. **Instalar só o que a fase pede**, em diretório isolado (`scripts/*-tools/`), fora do bundle e do `dist/`. Texto revisado pode ser instalado; código externo não roda sem necessidade, e todo commit externo fica registrado.
3. **Recusa registrada não se reabre sem dado novo.** Achado de última hora vai para `PENDENCIAS.md`, não para um PR novo no meio do lote.
4. **"Verificar licença" já foi verificado.** A lista original pedia conferência em dois itens (SEO Prism, Tolgee); ambos estão no §4 com o resultado. Item sem `owner/repo` é tratado como não verificável e não entra.

Bloco para colar no prompt de um agente:

```text
Consulte REPOS_FINAL.md como fonte primária de ferramentas.
Para cada fase, clone ou instale apenas os repositórios marcados como aprovados no §2 e
nunca os do §4. Não use ferramenta copyleft (AGPL/GPL) sem registrar o impacto em
NOTES.md e propor alternativa permissiva. O que já está no §1 não se instala de novo.
```

## 1. Já em uso neste repositório (não instalar de novo)

| Ferramenta | Onde | Versão | Licença | Papel |
|---|---|---|---|---|
| Harper (`harper.js`) | `scripts/en-tools/package.json` | 3.0.0 | Apache-2.0 | gramática e uso do inglês (`EN_AUDIT.md`) |
| `retext` + `retext-english` + `retext-readability` | `scripts/en-tools/package.json` | 9.0.0 / 5.0.0 / 8.0.0 | MIT | Flesch Reading Ease (`METRICS_EN.md` §3.3) |
| `@f-o-t/content-analysis` | `scripts/en-tools/package.json` | 1.0.7 | MIT | nota de SEO on-page, título, descrição, headings |
| Lighthouse + `@lhci/cli` | `scripts/seo-tools/`, `lighthouserc.cjs`, `.github/workflows/qualidade-seo.yml` | 13.6.0 / 0.16.0 | Apache-2.0 | desempenho, SEO, acessibilidade, boas práticas (`METRICS.md` §1) |
| axe-core | `scripts/seo-tools/node_modules/` (transitivo de `@lhci/cli`) | 4.14.0 | MPL-2.0 | violações WCAG 2.0/2.1/2.2 A e AA (`METRICS.md` §2) |
| Playwright | `node_modules/` (instalado com `--no-save`, igual ao CI) | 1.64.1 | Apache-2.0 | render do React e contexto da página para o axe |

Duas notas técnicas:

- **MPL-2.0 é copyleft de arquivo.** Usar o axe-core como vem, sem alterar os arquivos dele, não impõe nada ao site. Só obrigaria a publicar alterações feitas *no axe-core*.
- **O axe-core não é declarado** em `scripts/seo-tools/package.json`: ele chega como dependência do `@lhci/cli`. Funciona, mas é frágil — se o `@lhci/cli` trocar de árvore, o passo do axe passa a responder "axe-core não instalado" sem quebrar o build. Está em `PENDENCIAS.md`.

## 2. Aprovado por licença, não instalado (entra quando a fase pedir)

| Ferramenta | Licença | Por que ainda não | Quando entra |
|---|---|---|---|
| `textlint/textlint` | MIT | Harper + retext já cobrem estilo e legibilidade; duas ferramentas de lint no mesmo texto geram conflito de regra | só se surgir regra que as duas não tenham |
| `amperser/proselint` | BSD-3-Clause | exige Python; o ambiente deste repositório é Node — mesmo motivo que derrubou o COMET | se houver ambiente Python preparado |
| `manojahi/serpiq` | MIT | exige Search Console (sem credenciais) e LLM; 34 estrelas e sem push desde 04/2026 | quando houver GSC |
| `IliasSami/scrawly-seo-crawler` | MIT | é app desktop; o inventário por HTTP de `scripts/medir-baseline.mjs` já cobre as 133 URLs do sitemap | não previsto |
| `gooddata/gooddata-neobackstop` | MIT | o check `visual` do CI já compara telas a cada PR | Fase 4, se o check não bastar |
| `carbon-design-system/carbon` | Apache-2.0 | é benchmark de design, não dependência de código | Fase 4 (design com REA) |
| `primer/react` | MIT | idem | Fase 4 |
| `adobe/spectrum-css` | Apache-2.0 | idem | Fase 4 |
| `mozilla/pontoon` | BSD-3-Clause | é a plataforma de tradução, não o dataset; o dataset é o banco dela | só se houver memória de tradução a manter |
| OPUS (opus.nlpl.eu) | por corpus | não é um repositório; cada corpus tem licença própria | caso a caso, com a licença do corpus citada |
| The Elements of Style (1918, Gutenberg #37134) | domínio público | é referência de leitura, não de instalação | ao reescrever prosa |


## 3. Tabela completa — os 27 itens da lista, verificados um a um

| # | Item da lista | Repositório verificado | Licença (API) | ★ | Último push | Decisão |
|---|---|---|---|---|---|---|
| 1 | Lingui | `lingui/js-lingui` | MIT | 5.935 | 2026-11-03 | recusado — §4.1 (arquitetura, não licença) |
| 2 | Paraglide JS | `opral/paraglide-js` | MIT | 802 | 2026-11-07 | recusado — §4.1 |
| 3 | Tolgee | `tolgee/tolgee-platform` (a lista dava `tolgee/platform`, que **não existe**) | Apache-2.0 **exceto** `ee/` e `webapp/src/ee` | 4.156 | 2026-11-09 | recusado — §4.3 |
| 4 | Localess / Accent | — | — | — | — | não verificável — §4.7 |
| 5 | OPUS + Pontoon | `mozilla/pontoon` (OPUS não é repositório) | BSD-3-Clause | 1.679 | 2026-11-06 | aprovado, não instalado — §2 |
| 6 | Harper | `Automattic/harper` | Apache-2.0 | 17.511 | 2026-11-09 | **em uso** — §1 |
| 7 | LanguageTool | `languagetool-org/languagetool` | LGPL-2.1 | 15.241 | 2026-11-09 | recusado — §4.4 |
| 8 | textlint | `textlint/textlint` | MIT | **3.207** | 2026-11-09 | aprovado, não instalado — §2 |
| 9 | proselint | `amperser/proselint` | BSD-3-Clause | 4.599 | 2026-09-04 | aprovado, não instalado (exige Python) — §2 |
| 10 | retext-readability | `retextjs/retext-readability` | MIT | 104 | 2023-09-11 | **em uso** — §1 |
| 11 | The Elements of Style | Gutenberg #37134 (1918) | domínio público | — | — | referência de leitura — §2 |
| 12 | SEO Prism | `mykeura/seo-prism` | **AGPL-3.0** | 0 | 2026-11-09 | **recusado** — §4.2 |
| 13 | serpIQ | `manojahi/serpiq` | MIT | 34 | 2026-04-28 | aprovado, bloqueado por credenciais — §2 |
| 14 | seolens | três homônimos: `intelseclab/seolens` (sem licença), `gitstq/seolens` (MIT, 0★) | indefinida | 5 / 0 | — | não verificável — §4.7 |
| 15 | Scrawly | provável `IliasSami/scrawly-seo-crawler` | MIT | 21 | 2026-10-10 | dispensável — §2 |
| 16 | IBM Carbon | `carbon-design-system/carbon` | Apache-2.0 | 9.612 | 2026-11-09 | benchmark Fase 4 — §2 |
| 17 | Material Design 3 | a lista não dá repositório; o código de referência é `material-components/material-components-web` | MIT | 17.029 | 2025-01-13 | benchmark Fase 4 — §2 (repo em manutenção) |
| 18 | GitHub Primer | `primer/react` | MIT | 3.932 | 2026-11-09 | benchmark Fase 4 — §2 |
| 19 | Adobe Spectrum | `adobe/spectrum-css` | Apache-2.0 | 1.294 | 2026-10-13 | benchmark Fase 4 — §2 |
| 20 | Lighthouse CI | `GoogleChrome/lighthouse-ci` | Apache-2.0 | 7.134 | 2026-11-03 | **em uso** — §1 |
| 21 | Web Performance Toolkit | `aliesbelik/webperf-toolkit` | MIT | 6 | 2026-08-03 | não entra — é lista de links, sem código a instalar |
| 22 | axe-core | `dequelabs/axe-core` | MPL-2.0 | 7.787 | 2026-11-05 | **em uso** — §1 |
| 23 | DiffLens / NeoBackstop | DiffLens: não encontrado na API; `gooddata/gooddata-neobackstop` | MIT (NeoBackstop) | 4 | 2026-10-23 | parcialmente dispensável — §2 |
| 24 | evidence-synthesis | `gasserane/personal-skills` | **sem licença** | 3 | 2026-11-08 | recusado — §4.5 |
| 25 | marketingskills | `coreyhaines31/marketingskills` | MIT | **59.364** | 2026-11-06 | nada a instalar — §4.6 |
| 26 | Launch Marketing Playbook | `Gingiris-1031/gingiris-opensource` | **sem licença** | 8 | 2026-07-06 | recusado — §4.5 |
| 27 | growth-marketing-experimentation | `niranjanbala/growth-marketing-experimentation` | **sem licença** | 3 | 2025-07-07 | recusado — §4.5 |

Contagem, item a item: **4 em uso** (6, 10, 20, 22) · **11 aprovados por licença, nenhum instalado** (5, 8, 9, 11, 13, 15, 16, 17, 18, 19, 23) · **8 recusados com motivo** (1, 2, 3, 7, 12, 24, 26, 27) · **2 dispensados** (21, 25) · **2 não verificáveis** (4, 14 — o DiffLens do 23 também não foi encontrado).


## 4. Recusados, com o motivo que decide

### 4.1 Lingui e Paraglide — MIT, recusados por arquitetura

`src/i18n/pt-BR.ts` e `src/i18n/en.ts` são objetos tipados, e `scripts/testar-paridade-meta.mjs` reprova o CI quando uma chave existe em um idioma e não no outro. A decisão está escrita em `NOTES.md` linha 17: *"We deliberately did not adopt Paraglide or i18next: the catalogue is two languages with full parity checks, and swapping the library would touch every screen for no conversion gain."* E em `PENDENCIAS.md` linha 7, como **não reabrir sem dado novo**.

Trocar o catálogo por Lingui ou Paraglide mexeria em todas as telas para economizar kB de strings que já são poucas — e o modelo do site não é catálogo em runtime: é **um idioma de interface por domínio** (decisão de 29/10/2026, `docs/DECISAO-SITE-INTERNACIONAL.md`).

### 4.2 SEO Prism — AGPL-3.0 (a lista pedia "verificar no repositório")

`mykeura/seo-prism`: **AGPL-3.0**, 0 estrelas, criado em 09/11/2026 — o mesmo dia em que a lista chegou. É exatamente a licença que o resto da própria lista manda evitar, e oferecê-lo como servidor MCP para agente piora o caso: uso em rede é o gatilho da AGPL.

O que ele faria já é medido: hreflang, canonical, headings, título, descrição e thin content em `scripts/en-tools/auditar-ingles.mjs` (`@f-o-t/content-analysis`), e o mapa de 133 URLs de sitemap em `docs/SEO_AUDIT.md` §7. O que falta — links quebrados e páginas órfãs — é uma varredura simples sobre o `sitemap.xml`, não uma dependência AGPL.

### 4.3 Tolgee — o repositório da lista não existe, e o certo tem pegadinha

`tolgee/platform` responde **404**. O repositório verdadeiro é `tolgee/tolgee-platform`, e o `LICENSE` dele (lido pela API) diz: o que está fora de `ee/` e `webapp/src/ee` é **Apache-2.0**; essas duas pastas têm licença própria, separada e **não** permissiva. Quem instala "Tolgee, Apache-2.0" acreditando pegar o produto inteiro está errado.

Não entra porque não há plataforma de tradução a gerenciar: o catálogo são dois arquivos com paridade verificada no CI, e o conteúdo dos cursos é gerado por `scripts/i18n-aulas.mjs`, que já faz extrair → traduzir → juntar.

### 4.4 LanguageTool — LGPL-2.1

A licença permite uso comercial fechado, e isso está certo na lista. O que decide é outro par: peso (Java + servidor HTTP, contra um verificador Rust que roda em milissegundos) e cobertura. A auditoria de 09/11/2026 achou **0,18 lint de gramática/uso por 100 palavras** fora das páginas que ensinam línguas (`METRICS_EN.md` §3.3) — não há o que uma segunda ferramenta pesada vá consertar. E a LGPL ainda obriga a publicar alterações feitas nos arquivos da própria ferramenta.


### 4.5 Sem arquivo de licença = todos os direitos reservados

`gasserane/personal-skills` (3★), `Gingiris-1031/gingiris-opensource` (8★) e `niranjanbala/growth-marketing-experimentation` (3★) não têm licença. Sem licença, o padrão legal é reserva total de direitos: **não se copia texto nem se instala código**. Nada impede ler o guia de lançamento e escrever o nosso; o que não se faz é colar o texto deles no repositório.

A metodologia que o `personal-skills` descreveria (REA com gradação de confiança) já está formalizada aqui em `METRICS.md` §5 e `NOTES.md` §9, com a régua de aceite e reversão.

### 4.6 marketingskills — MIT, mas não há o que instalar

59.364 estrelas e licença MIT: a permissão existe. Só que o conteúdo são *skills* — texto de instrução para agente, não código. O ambiente do agente já expõe skills com esses nomes (`ads`, `ab-testing`, `copywriting`, `cro`, `analytics`, `schema`…) e este repositório não vendoriza nenhuma delas: `.claude/skills/` tem duas, locais (`carrossel-do-livro`, `verificar-site`). Instalar seria copiar texto de terceiro para dentro do repositório sem necessidade.

### 4.7 Não verificáveis — a lista não dá `owner/repo`

Localess, Accent, DiffLens, seolens. Para `seolens` existem três repositórios homônimos — dois sem licença e um MIT com 0 estrela — e não há como saber qual é o da lista. `DiffLens` não aparece na busca da API. **Sem `owner/repo` e licença, não entra: não por suspeita, por falta de evidência.**

### 4.8 Weblate e Traduora — copyleft, como a lista já avisava

Confirmado: `traduora/traduora` é **AGPL-3.0** (2.139★). O espelho `weblate/weblate` no GitHub reporta GPL-2.0 e tem 2 estrelas porque é espelho do repositório oficial — o projeto se declara GPLv3+. Em qualquer das duas, é copyleft, e a lista está certa. Nenhum dos dois é necessário: não há tradução comunitária a hospedar.

## 5. Correções à lista recebida

| O que a lista dizia | O que a API mostra em 09/11/2026 |
|---|---|
| Harper "12.200+ estrelas" | **17.511** |
| textlint "15.000+ estrelas" | **3.207** |
| marketingskills "46.800+ estrelas" | **59.364** |
| SEO Prism "open-source (verificar licença)" | **AGPL-3.0** — é o copyleft que a lista manda evitar |
| Tolgee `tolgee/platform`, "Apache-2.0" | repositório **não existe**; o certo é `tolgee/tolgee-platform`, com `ee/` fora da Apache-2.0 |
| "Localess — MIT / Accent — BSD-3" | sem repositório identificado; não verificável |
| Scrawly "open-source" | provável `IliasSami/scrawly-seo-crawler` (MIT, 21★) — a lista não dá o `owner/repo` |
| axe-core "MPL-2.0, integra-se ao Lighthouse" | correto |
| Weblate/Traduora copyleft | correto |

## 6. A "prioridade de instalação da Fase 1" da lista — revisada contra o que existe

A lista pedia: **Harper → Lighthouse CI → SEO Prism → Lingui/Paraglide**. O estado real:

| Pedido | Estado em 09/11/2026 |
|---|---|
| Harper | **instalado e usado** (`scripts/en-tools`, harper.js 3.0.0) |
| Lighthouse CI | **já existe** (`lighthouserc.cjs` + `.github/workflows/qualidade-seo.yml`; 9 checks verdes, SEO/acessibilidade/boas práticas 100) |
| SEO Prism | **recusado**: AGPL-3.0 (§4.2); o que ele faria já é medido |
| Lingui / Paraglide | **recusados**: arquitetura (§4.1) |

A Fase 1 já está fechada sem eles: #539 (linha de base medida, mapa de rotas) e #540 (auditoria do inglês com `EN_AUDIT.md` + `METRICS_EN.md`). **A lacuna que resta não é de ferramenta**: são as três páginas em português servidas no `.com` (`/contato`, `/ex-alunos-udemy`, `/livro/gramatica-ru` — `EN_AUDIT.md` §4, F1) e a LCP móvel de `/gramatica/:id` e `/por-que-linvuu`, ainda sem causa diagnosticada.

## 7. Limitações deste registro

- **Verificado por API em 09/11/2026.** Licença muda: reconferir antes de instalar, porque fork ou troca de licença depois desta data invalida a linha.
- **Estrelas e data de push são sinal de vida, não de qualidade.** `retext-readability` está sem push desde 2023 e é a ferramenta certa; `marketingskills` tem 59 mil estrelas e não serve a este repositório.
- **Não testei nenhuma ferramenta recusada.** A recusa é de licença, arquitetura ou necessidade — não é juízo sobre qualidade técnica.
- **Nada foi clonado e nenhuma dependência nova entrou no site** por causa deste arquivo. As seis ferramentas do §1 já estavam instaladas antes dele.

## Adições de 18/11/2026 (ordem do Felipe: prompt de reentrada do Gemini) — licença conferida no LICENSE do repositório e no registro do npm
| Item | Licença | Decisão | Uso |
|---|---|---|---|
| obra/superpowers, addyosmani/web-quality-skills, emilkowalski/skills, jakubkrehel/make-interfaces-feel-better, AgriciDaniel/claude-seo | MIT | instaladas (skills) | `.claude/skills`, commit em `skills-lock.json` |
| pbakaus/impeccable | Apache-2.0 | instalada (skill) | já era a régua de `scripts/auditar-visual.mjs` |
| trailofbits/skills | CC-BY-SA-4.0 | instalada sem 35 skills fora do escopo (blockchain, fuzzing C/Rust, Swift, Lean) | auditoria de segurança |
| satori 0.63, @resvg/resvg-js 2.6 | MPL-2.0 (sem modificar) | aprovadas | `scripts/midia/gerar-carrossel.mjs` |
| @fontsource/source-sans-3, @fontsource/literata | OFL-1.1 | aprovadas | .woff estáticos com cirílico para o carrossel (o satori não lê woff2) |
| linkinator 8.1 | MIT | aprovada | auditoria de links do build (196 internos, 0 quebrados em 18/11) |
| remotion | licença própria, paga a partir de 4 pessoas | **recusada** | vídeo: HyperFrames ou Playwright |
| next-sitemap | MIT | **dispensada** | é para Next.js; os sitemaps já saem de `scripts/seo.mjs` |
| @tanstack/react-query, zod, isomorphic-dompurify | MIT | **não instaladas** | sem uso no código (LEI ZERO, item 3): validadores próprios já testados, nenhum HTML de aluno renderizado, ~15 `fetch` com token/timeout próprios |
| ts-fsrs 5.4.2 (fixado, sem `^`) | MIT | **instalada (18/11/2026)** | reforço espaçado do APK: `src/plataforma/apk/fsrsAdaptador.ts`. A 6.0.0 exige Node ≥ 24 (o projeto usa 22); o fuzz da 5.4.2 passa de `maximum_interval` em 1 dia (366 medido) e o adaptador impõe o teto de 365 |
| hyperframes 0.9.67 (heygen-com/hyperframes) | Apache-2.0 | **motor oficial de vídeo** | `scripts/midia/gerar-video.mjs` (`npm run midia:video`); animação só em CSS, sem GSAP (licença própria) |
