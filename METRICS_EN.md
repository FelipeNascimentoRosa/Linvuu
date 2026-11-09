# METRICS_EN — baseline do conteúdo em inglês (09/11/2026)

> **Estado: medido, sem revisão humana, nenhuma página reescrita.**
> Este documento responde à Etapa 2 do [`PROMPT_EN.md`](PROMPT_EN.md): quais são os números do inglês hoje, com que ferramentas, com que limites, e qual é a régua para provar que a Fase 4 (e as Fases 2–3) melhorou alguma coisa.
> O diagnóstico página a página está em [`EN_AUDIT.md`](EN_AUDIT.md). O baseline de desempenho e acessibilidade continua em [`METRICS.md`](METRICS.md) — este arquivo trata só de texto.

**In English (abstract).** Baseline of the English copy on `linvuu.com`, measured on 09/11/2026: 37 pages, 20 717 words, 2 073 Harper lints (123 grammar/usage, 1 789 spelling — mostly foreign-language teaching examples —, 70 serial-comma style), median Flesch Reading Ease 52,7, median on-page SEO score 69. Tooling: Harper 3.0.0 (Apache-2.0), retext-readability 8.0.0 (MIT), @f-o-t/content-analysis 1.0.7 (MIT), Playwright for client-rendered pages. Everything is reproducible with `npm run medir:ingles`.

## 1. Como reproduzir

```bash
# 1. build do site (uma vez por sessão de medição)
npm run build

# 2. baseline contra o build local + produção para as páginas montadas pelo React
npm run medir:ingles -- --rotulo fase1

# 3. comparável em produção (recomendado para antes/depois de um deploy)
node scripts/en-tools/auditar-ingles.mjs --prod --base https://linvuu.com --rotulo producao
```

- **Saída:** `.en-baseline/<rotulo>/resumo.json` (dados completos), `.en-baseline/<rotulo>/resumo.md` (tabela) e `.en-baseline/<rotulo>/textos/<rota>.txt` (o texto medido de cada página, para leitura e para citar trechos). A pasta `.en-baseline/` é ignorada pelo Git.
- **Duração:** ~40 s no modo `npm run medir:ingles` (as páginas montadas no navegador são abertas no Chromium), ~2 min em `--tudo-prod`.
- **Repetibilidade verificada:** duas execuções seguidas devolveram os mesmos números nas 37 páginas; as páginas montadas pelo React variaram até ~3 % (animações de entrada mudam 1–2 palavras do texto visível), sem mudar nenhuma conclusão.
- **Pré-requisitos:** Node 24 (o `node --check` e o Playwright do repositório), `dist/` construído para o modo local, `npm install` dentro de `scripts/en-tools/` (as ferramentas não entram no bundle do site).

## 2. Ferramentas, versões e licenças

| Ferramenta | Versão | Licença | O que responde |
|---|---|---|---|
| [`harper.js`](https://writewithharper.com) (Automattic) | 3.0.0 | Apache-2.0 | Gramática, uso, ortografia e estilo, **offline** (WASM, nada sai da máquina) |
| `retext` + `retext-english` + `retext-readability` | 9.0.0 / 5.0.0 / 8.0.0 | MIT | Frases difíceis para leitor de 18 anos (algoritmos de nível de leitura) |
| `@f-o-t/content-analysis` | 1.0.7 | MIT | Flesch Reading Ease, nota de nível, SEO on-page (título, descrição, hierarquia, palavras, `quick answer`) |
| `playwright` (já no repositório) | 1.64.1 | Apache-2.0 | Texto real das páginas que o React monta no navegador |

Instaladas em `scripts/en-tools/package.json`, **fora** das dependências do site. Nenhuma delas é enviada ao navegador do aluno nem entra em `dist/`.

Ferramentas do mandato que ficaram de fora, com motivo técnico ou de licença: LanguageTool (LGPL-2.1, servidor Java, mais lento; o Harper cobriu todos os casos encontrados), `@vuminhhoa/seo-analyzer` (fork do YoastSEO, GPL — incompatível com a regra do `AGENTS.md` de licença permissiva), `quality-docs` (embrulha `retext`, que já está usado direto), LibreTranslate/Argos (só serviriam se houvesse tradução automática, e não há), COMET/XCOMET e Pearmut (exigem Python + PyTorch, sem ambiente no repositório), `syllable` (não instalado: o `@f-o-t` já entrega Flesch).

## 3. O que cada número significa

### 3.1 Palavras

Contagem de tokens alfabéticos (`/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*/g`) no texto do `<main>` — ou do `<body>` quando a página não tem `<main>`. **O `<head>`, o menu, o rodapé e o aviso de cookies ficam de fora**: são iguais em todas as páginas e distorceriam a comparação entre elas. Quando a página não traz texto no HTML (o React monta no navegador), o texto é o do DOM renderizado em produção, no Chromium, com `locale en-US`.

### 3.2 Sinal de português (`PT %`)

Número de tokens que são palavras funcionais portuguesas, por 100 palavras:

`curso, cursos, você, não, aula, aulas, para, mais, como, nosso, nossa, gratuito, grátis, português, nós, também, todos, página, é, são, está, uma, dos, das, pelo, pela`

- `linvuu` e `com` ficam **fora** de propósito: aparecem em marca, e-mail e domínio e não provam idioma.
- Serve como **detector de vazamento**, não como juiz de idioma: página que ensina português, francês, italiano ou inglês cita palavras estrangeiras de propósito (`/gramatica/br` 4,5 %, `/curso/it/dia/1` 3,5 %, `/curso/en/dia/1` 3,0 %). Página que ensina algo com sinal acima de ~3 % **e** conteúdo que não é exemplo didático é vazamento.
- Referência empírica: as 34 páginas realmente em inglês ficaram entre 0,0 % e 1,3 % (a única exceção é a que ensina português). As três páginas em português ficaram em 4,3 %, 4,4 % e 9,0 %.

### 3.3 Harper: cinco categorias, não um número só

O Harper devolve lints com tipo (`lint_kind`) e mensagem. Um número único misturaria coisas incomparáveis (uma vírgula de estilo e um erro de concordância), então cada lint entra em uma categoria:

| Categoria | O que é | Conta para a meta? |
|---|---|---|
| `gramaticaUso` | concordância, artigos, preposições, ordem, escolha de palavra, capitalização | **sim** — meta: 0 crítico, ≤ 0,5 por 100 palavras |
| `ortografia` | palavra desconhecida (`Spelling`/`Typo`) | sim, **com desconto**: em página que ensina língua, o exemplo estrangeiro é conteúdo, não erro |
| `estiloOxford` | "An Oxford comma is necessary here" | não — é convenção de guia de estilo, não erro. Vira decisão na Fase 2 |
| `legibilidade` | "This sentence is N words long" | não — é sinal para reescrever, e cai junto com o Flesch |
| `formatacao` | espaço sobrando, marcação | sim, quando aparece |

Dicionário da casa: `Linvuu`, `Udemy`, `PostHog`, `Stripe`, `CEFR` são importados para o dicionário do Harper antes da medição. Sem isso, toda menção à marca apareceria como erro de ortografia.

### 3.4 Flesch Reading Ease e nota de nível

Vêm do `analyzeReadability` (`@f-o-t/content-analysis`): `fleschKincaidReadingEase` (0–100, mais alto = mais fácil) e `fleschKincaidGradeLevel`. A faixa do mandato é 50–70 para web, ≥45 para texto técnico.

**Quando o Flesch não vale (`n/a`):** página cujo conteúdo é lista de títulos de aula, sem prosa. A régua usada: menos de 5 frases **ou** média acima de 45 palavras por frase. Exemplos: `/curso/br` (3 frases, 145,7 palavras/frase) e `/curso/de/dia/1` (19 frases, 51,4 palavras/frase). Reportar 0,0 ali seria mentira estatística — é uma lista.

### 3.5 Nota de SEO on-page

`analyzeSeo({ content, title, metaDescription })` do `@f-o-t/content-analysis`, alimentado com o **markdown** convertido do `<main>` (títulos como `#`, listas como `-`) e **sem o `h1`**, porque a ferramenta espera o título fora do corpo. Sem essas duas conversões ela acusa "nenhum título" e "H1 no corpo" em todas as páginas — artefato do formato, não defeito do site.

A nota cobre: título (comprimento, palavra-chave), descrição, hierarquia de títulos, comprimento do conteúdo, densidade de palavra-chave, `quick answer`, primeiro parágrafo, estrutura/conclusão. **Ela não vê links nem imagens** (o markdown gerado não os carrega): os avisos `links` e `images` em todas as páginas são artefato, e as contagens reais de `<a href="/…">` e `<img>` ficam em `resumo.json` (`linksInternos`, `imagens`, `imagensSemAlt`).

### 3.6 Frases difíceis (`retext-readability`)

`retext().use(retextEnglish).use(retextReadability, { age: 18 })` marca frases acima do nível de leitura de 18 anos. Contagem + até 5 exemplos por página em `resumo.json` (`retext.frasesDificeis`). Só informativo: não entra na meta, porque se sobrepõe ao Flesch.

## 4. Baseline — 37 páginas medidas em 09/11/2026

Medição: `https://linvuu.com` (HTML do servidor) + Chromium em produção para as páginas montadas pelo React. `Origem` diz de onde veio o texto medido.

| Página | Tipo | Origem | Palavras | Harper | gram/uso | ortogr. | Oxford | gram/uso por 100 | Flesch | PT % | SEO | Título | Descrição | H1 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | home | HTML do servidor | 339 | 16 | 0 | 12 | 4 | 0,0 | 58,5 | 0,0 | 77 | 46 | 164 | 1 |
| `/cursos` | vitrine | HTML do servidor | 162 | 10 | 0 | 10 | 0 | 0,0 | 41,1 | 0,0 | 79 | 16 | 97 | 1 |
| `/assinatura` | preço | produção, renderizado | 356 | 10 | 1 | 6 | 2 | 0,3 | 59,8 | 0,6 | 79 | 21 | 115 | 1 |
| `/por-que-linvuu` | argumento | HTML do servidor | 514 | 13 | 1 | 7 | 3 | 0,2 | 57,8 | 0,0 | 62 | 31 | 170 | 1 |
| `/portugues` | vitrine de idioma | produção, renderizado | 455 | 32 | 0 | 23 | 7 | 0,0 | 56,6 | 0,9 | 90 | 60 | 124 | 1 |
| `/russo-online` | vitrine de idioma | HTML do servidor | 241 | 12 | 0 | 11 | 1 | 0,0 | 51,9 | 0,0 | 87 | 45 | 100 | 1 |
| `/sobre` | confiança | HTML do servidor | 373 | 23 | 1 | 16 | 6 | 0,3 | 47,0 | 0,0 | 69 | 26 | 170 | 1 |
| `/contato` | confiança | produção, renderizado | 229 | 46 | 0 | 43 | 2 | 0,0 | 44,6 | 4,4 | 79 | 16 | 115 | 1 |
| `/ex-alunos-udemy` | confiança | produção, renderizado | 424 | 162 | 3 | 155 | 2 | 0,7 | 46,8 | 9,0 | 90 | 55 | 147 | 1 |
| `/livro/gramatica-ru` | livro | produção, renderizado | 232 | 50 | 0 | 47 | 2 | 0,0 | 40,0 | 4,3 | 75 | 30 | 160 | 1 |
| `/livros` | livro | 301 para `.com.br` | 9 | — | — | — | — | — | — | — | — | 0 | 0 | 0 |
| `/curso/br` | hub | HTML do servidor | 419 | 2 | 0 | 0 | 0 | 0,0 | n/a | 0,2 | 82 | 50 | 155 | 1 |
| `/curso/ru` | hub | HTML do servidor | 406 | 2 | 0 | 0 | 0 | 0,0 | n/a | 0,0 | 82 | 51 | 157 | 1 |
| `/curso/fr` | hub | HTML do servidor | 466 | 3 | 0 | 0 | 0 | 0,0 | n/a | 0,0 | 82 | 50 | 159 | 1 |
| `/curso/es` | hub | produção, renderizado | 708 | 11 | 0 | 6 | 2 | 0,0 | 24,6 | 0,4 | 67 | 55 | 210 | 1 |
| `/curso/de` | hub | produção, renderizado | 854 | 14 | 0 | 7 | 2 | 0,0 | 13,5 | 0,4 | 67 | 54 | 222 | 1 |
| `/curso/it` | hub | produção, renderizado | 653 | 11 | 0 | 6 | 2 | 0,0 | 13,3 | 0,8 | 67 | 55 | 197 | 1 |
| `/curso/en` | hub | produção, renderizado | 770 | 12 | 0 | 6 | 2 | 0,0 | 15,6 | 0,6 | 69 | 51 | 32 | 1 |
| `/curso/ru/dia/1` | aula | HTML do servidor | 449 | 15 | 2 | 11 | 0 | 0,4 | 76,5 | 0,0 | 67 | 41 | 129 | 1 |
| `/curso/br/dia/1` | aula | HTML do servidor | 592 | 82 | 7 | 71 | 1 | 1,2 | 68,8 | 1,2 | 72 | 51 | 149 | 1 |
| `/curso/fr/dia/1` | aula | HTML do servidor | 839 | 171 | 6 | 138 | 2 | 0,7 | 81,4 | 0,0 | 72 | 49 | 137 | 1 |
| `/curso/es/dia/1` | aula | HTML do servidor | 684 | 50 | 2 | 44 | 2 | 0,3 | 68,0 | 0,0 | 72 | 50 | 138 | 1 |
| `/curso/de/dia/1` | aula | produção, renderizado | 791 | 70 | 2 | 64 | 1 | 0,3 | n/a | 0,9 | 67 | 39 | 130 | 1 |
| `/curso/it/dia/1` | aula | produção, renderizado | 691 | 113 | 3 | 108 | 1 | 0,4 | 25,1 | 3,5 | 67 | 50 | 141 | 1 |
| `/curso/en/dia/1` | aula | produção, renderizado | 795 | 94 | 2 | 88 | 1 | 0,3 | 22,1 | 3,0 | 67 | 53 | 144 | 1 |
| `/gramatica` | índice | produção, renderizado | 362 | 11 | 0 | 7 | 2 | 0,0 | 51,2 | 0,8 | 67 | 58 | 131 | 1 |
| `/gramatica/ru` | gramática | HTML do servidor | 1098 | 104 | 0 | 102 | 2 | 0,0 | 80,5 | 0,0 | 69 | 45 | 118 | 1 |
| `/gramatica/br` | gramática | HTML do servidor | 1257 | 298 | 30 | 264 | 3 | 2,4 | 70,0 | 4,5 | 72 | 58 | 131 | 1 |
| `/gramatica/fr` | gramática | HTML do servidor | 1104 | 287 | 31 | 251 | 0 | 2,8 | 80,1 | 0,1 | 69 | 44 | 117 | 1 |
| `/gramatica/es` | gramática | HTML do servidor | 1229 | 264 | 31 | 229 | 1 | 2,5 | 69,7 | 0,1 | 69 | 45 | 118 | 1 |
| `/gramatica/de` | gramática | produção, renderizado | 341 | 11 | 0 | 7 | 2 | 0,0 | 51,2 | 0,9 | 67 | 44 | 120 | 1 |
| `/gramatica/it` | gramática | produção, renderizado | 382 | 11 | 0 | 7 | 2 | 0,0 | 50,7 | 0,8 | 67 | 45 | 121 | 1 |
| `/gramatica/en` | gramática | produção, renderizado | 396 | 11 | 0 | 7 | 2 | 0,0 | 55,0 | 1,3 | 67 | 45 | 121 | 1 |
| `/privacidade` | jurídico | produção, renderizado | 821 | 15 | 1 | 10 | 3 | 0,1 | 50,1 | 0,4 | 61 | 23 | 57 | 1 |
| `/termos` | jurídico | produção, renderizado | 566 | 13 | 0 | 9 | 3 | 0,0 | 59,9 | 0,5 | 71 | 21 | 44 | 1 |
| `/entrar` | conta | produção, renderizado | 204 | 9 | 0 | 6 | 2 | 0,0 | 52,7 | 1,0 | 67 | 16 | 160 | 1 |
| `/cadastro` | conta | produção, renderizado | 222 | 9 | 0 | 6 | 2 | 0,0 | 54,0 | 0,9 | 67 | 16 | 160 | 1 |
| `/excluir-conta` | conta | HTML do servidor | 293 | 6 | 0 | 5 | 1 | 0,0 | 60,2 | 0,0 | 87 | 44 | 113 | 1 |
| 404 | erro | HTML do servidor | 0 | — | — | — | — | — | — | — | — | 23 | 160 | 0 |

## 5. Agregados e distância até as metas

### 5.1 Totais

| Métrica | Valor | Comentário |
|---|---|---|
| Páginas medidas | 37 | + 1 redirect, + 1 página 404 |
| Palavras medidas | 20 717 | só o conteúdo principal |
| Lints do Harper | 2 073 | de todos os tipos |
| `gramaticaUso` | **123** (0,59 por 100 palavras) | a meta do mandato é ≤ 0,5. O número engana: **92 dos 123** vieram de `/gramatica/{br,fr,es}`, páginas que ensinam línguas e citam exemplos em outra língua. Fora delas sobram 31 lints em 17.127 palavras = **0,18 por 100**, dentro da meta |
| `ortografia` | 1 789 | 86 % do total. Em página que ensina russo, francês ou português, cada palavra estrangeira é "erro de ortografia"; o que importa aqui é o salto nas três páginas em português (43, 47 e 155) |
| `estiloOxford` | 70 | decisão de guia de estilo, não erro |
| `legibilidade` | 41 | frases longas, cai junto com a reescrita |
| `formatacao` | 50 | espaços e marcação |

### 5.2 Medianas

| Métrica | Mediana | Meta | Situação |
|---|---|---|---|
| `gramaticaUso` por 100 palavras | **0,0** (máx. 2,8) | ≤ 0,5 | **dentro** |
| Flesch Reading Ease (33 páginas de prosa) | **52,7** (13,3–81,4) | 50–70 | **dentro**; 11 páginas abaixo de 50, 4 acima de 70 |
| Nota de SEO on-page | **69** (61–90) | ≥ 70 | **no limite**; 20 das 37 abaixo de 70 |
| Sinal PT | **0,0 %** (máx. 9,0 %) | 0 % fora de exemplo | fora nas três páginas do F1 de `EN_AUDIT.md` |

### 5.3 Onde o número está ruim, e por quê

- **SEO 69 de mediana** — não é gramática: é título curto (8 páginas abaixo de 30 caracteres), descrição fora da faixa útil (10 páginas acima de 160 caracteres e 11 abaixo de 120) e conteúdo abaixo de 600 palavras nas oito páginas principais. Todas as 20 páginas abaixo de 70 têm pelo menos dois desses três problemas.
- **Flesch nas páginas de curso bloqueadas** (`/curso/es` 24,6, `/curso/de` 13,5, `/curso/it` 13,3, `/curso/en` 15,6) — são listas de títulos de aula com frases longas coladas; a reescrita deve separar o texto de apresentação da lista, e aí o número volta a valer.
- **`ortografia` alto em `/gramatica/br|fr|es`** (264, 251, 229) — são exemplos didáticos; não se corrige. O que se corrige é o que sobra em página de inglês puro (`/privacidade` 10, `/sobre` 16, `/` 12: nomes próprios e unidades).

## 6. Limites desta medição (o que ela não prova)

1. **Harper não é LanguageTool.** Ele tem menos regras; ausência de lint não é garantia de inglês perfeito. Nenhuma página é tradução automática hoje, então o risco de erro sistêmico é baixo.
2. **O Flesch mede sílabas, não sentido.** Texto curto e técnico (preço, jurídico) pontua baixo sem estar ruim. Por isso a faixa aceita ≥45 no jurídico e `n/a` onde é lista.
3. **A nota de SEO é de uma biblioteca, não do Google.** Ela não vê links, imagens, dados estruturados nem concorrência; os avisos `links`/`images` são artefato da conversão para markdown.
4. **Texto de página montada no navegador vem de produção** (o navegador local veria o perfil português, porque `window.location.hostname` seria `127.0.0.1`). Isso significa que o antes/depois de uma mudança só é comparável **depois do deploy** — ou rodando o modo local, que compara o build, não o ar.
5. **Pré-renderizado ≠ renderizado.** O HTML traz `<main data-prerender>` oculto quando há JavaScript; as duas versões podem divergir em quantidade de texto (`/gramatica/ru`: 1098 palavras no HTML, 358 no DOM). A medição escolhe o HTML quando ele tem texto; a divergência em si é um achado de `EN_AUDIT.md` F11.
6. **Sem dados de campo.** INP, LCP real, taxa de conversão e receita continuam fora: dependem de CrUX/Search Console (sem credenciais) e do PostHog do Felipe — ver `METRICS.md` §6 e `PENDENCIAS.md`.
7. **Sem julgamento humano ainda.** Nenhum falante nativo revisou estas páginas neste ciclo. Toda nota aqui é de máquina.

## 7. Como provar que uma mudança melhorou (Fases 2 a 4)

1. **Medir antes:** `npm run medir:ingles -- --rotulo antes-<pagina>` (ou `--prod` para o estado publicado).
2. **Mudar uma coisa só:** uma página por PR, como manda o `PROMPT_EN.md` (Regra de Ouro 6) e o protocolo REA de `METRICS.md`.
3. **Medir depois:** mesmo comando com `--rotulo depois-<pagina>`, e comparar campo a campo:

```bash
node -e "const a=require('./.en-baseline/antes-x/resumo.json'), b=require('./.en-baseline/depois-x/resumo.json'); for (const r of b.resultados) { const o=a.resultados.find(x=>x.rota===r.rota); if(!o||!r.medida||!o.medida) continue; console.log(r.rota, 'palavras', o.palavras,'->',r.palavras, '| gram/uso/100', o.harper.gramaticaUsoPor100,'->',r.harper.gramaticaUsoPor100, '| flesch', o.legibilidade.fleschReadingEase,'->',r.legibilidade.fleschReadingEase, '| seo', o.seo.score,'->',r.seo.score, '| PT%', o.sinalPortugues,'->',r.sinalPortugues); }"
```

4. **Régua de aceite** (a mesma de `EN_AUDIT.md` §8): `gramaticaUso` ≤ 0,5 por 100 palavras; Flesch 50–70 (≥45 no jurídico); SEO ≥ 70; título 50–60; descrição 150–160; sinal PT 0 % fora de exemplo didático; axe 0 violações; Lighthouse SEO e acessibilidade 100.
5. **Reverter** se a mudança piorar o LCP em mais de 15 % ou 3 pontos, ou introduzir qualquer violação de axe — o mesmo critério de `METRICS.md` §5.
6. **Registrar** em `NOTES_EN.md`: página, baseline, o que mudou, pós-métrica e a fonte da correção (regra gramatical, guia de estilo ou benchmark).

## 8. Estado

- **Medido:** sim, 09/11/2026, com duas execuções consistentes.
- **Revisado por falante nativo:** não.
- **Alterado em produção por causa deste documento:** nada.
- **Próximo passo autorizado pelo mandato:** Fase 2 (home, sobre, preço, contato), uma página por PR, com baseline próprio por página.
- **Pendência de licença:** nenhuma das ferramentas usadas no pipeline é GPL; `@f-o-t/content-analysis` é MIT (LICENSE dentro do pacote) e `harper.js` é Apache-2.0, conforme a regra do `AGENTS.md` para repositórios reaproveitados.
