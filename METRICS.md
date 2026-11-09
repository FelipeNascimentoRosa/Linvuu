# METRICS — linha de base e ciclos de mudança visual

Fonte única dos números usados para aceitar ou reverter qualquer mudança de design, UX ou SEO. O protocolo está em `NOTES.md` §9 e as regras de produto em `docs/SEO_AUDIT.md`. **Sem linha de base registrada aqui, não há autorização para alterar o visual.**

## Como reproduzir (mesmas ferramentas antes e depois)

```powershell
npm ci
npm ci --ignore-scripts --prefix scripts/seo-tools   # @lhci/cli 0.16.0 + lighthouse, isolados
npm run build:website
node scripts/medir-baseline.mjs --runs=2 --rotulo=baseline-local   # .com.br, servidor local sem credenciais
node scripts/medir-baseline.mjs --so-producao --runs=1 --rotulo=producao   # os dois domínios publicados
```

Versões usadas nas medições abaixo: Lighthouse 13.6.0 (dentro de `@lhci/cli` 0.16.0), Chromium 142 (Playwright 1.64.1), axe-core 4.14.0, Node 24.21.0, Windows 11. Os relatórios brutos ficam em `.baseline/<rótulo>-<carimbo>/` (ignorado pelo Git); o resumo em `resumo.json` e `resumo.md`.

Por que dois lugares: o servidor escolhe o perfil do domínio pelo cabeçalho `Host`, e nem Lighthouse nem Chromium deixam o auditor forjá-lo. O `.com.br` é medido no servidor local (mesma aplicação de produção, sem credenciais); o `.com` é medido em produção, onde CDN, compressão e cache se comportam como o leitor vê.

## 1. Lighthouse — 09/11/2026

Notas de 0 a 100 por categoria; LCP, FCP e TBT em milissegundos; CLS adimensional. Valor = mediana das rodadas. **TBT não é INP**: INP real exige dados de campo (CrUX ou Search Console), que este repositório não acessa; nenhuma linha deste documento é INP, e nenhuma deve ser citada como se fosse.

### 1.1 Servidor local (perfil `.com.br`), 6 páginas × 2 aparelhos × 2 rodadas

Rótulo `baseline-local`, carimbo `2026-11-09T15:12:58Z`. Build: `npm run build:website` sobre `main` = `f364b7dc`.

| Página | Aparelho | Desempenho | Acessibilidade | Boas práticas | SEO | LCP (ms) | CLS | TBT (ms) |
|---|---|---|---|---|---|---|---|---|
| `/` | celular | 95 | 100 | 100 | 100 | 1896 | 0,000 | 195 |
| `/` | computador | 100 | 100 | 100 | 100 | 434 | 0,000 | 9 |
| `/cursos` | celular | 99,5 | 100 | 100 | 100 | 1314 | 0,000 | 68 |
| `/cursos` | computador | 100 | 100 | 100 | 100 | 343 | 0,000 | 0 |
| `/curso/de` | celular | **86** | 100 | 100 | 100 | **4042** | 0,000 | 94 |
| `/curso/de` | computador | 100 | 100 | 100 | 100 | 742 | 0,000 | 0 |
| `/curso/ru/dia/1` | celular | 99 | 100 | 100 | 100 | 1611 | 0,000 | 50 |
| `/curso/ru/dia/1` | computador | 100 | 100 | 100 | 100 | 803 | 0,000 | 0 |
| `/gramatica/ru` | celular | **88,5** | 100 | 100 | 100 | **3769** | 0,000 | 20 |
| `/gramatica/ru` | computador | 100 | 100 | 100 | 100 | 793 | 0,000 | 0 |
| `/por-que-linvuu` | celular | **83,5** | 100 | 100 | 100 | **4585** | 0,000 | 19 |
| `/por-que-linvuu` | computador | 100 | 100 | 100 | 100 | 729 | 0,000 | 0 |

Leitura honesta do que está aqui:

- **Computador é 100 em tudo.** Toda a folga de melhoria está no celular, que é onde o aluno estuda.
- **Três páginas passam de 2,5 s de LCP no celular** (limite «bom» do Google): `/por-que-linvuu` 4,6 s, `/curso/de` 4,0 s, `/gramatica/ru` 3,8 s. Repetiu nas duas rodadas (`4585`/`4610`, `3645`/`4439`, `3771`/`3767`), então não é ruído.
- **Causa ainda não diagnosticada.** O relatório descarta as suspeitas fáceis: nenhuma imagem acima de 5 KiB, as duas fontes `.woff2` terminam de carregar em 36 ms, o CSS bloqueante custa 19,7 KiB e 302 ms (`render-blocking-insight`), e o TBT está entre 19 e 94 ms. O `lcp-breakdown-insight` do Lighthouse 13 atribui só 316 ms de atraso de renderização, o que **não fecha** com 4,6 s de LCP — hipótese a testar na Fase 5 (`hidratação/JS`, servidor local de thread única), não conclusão.
- **CLS 0,000 em 12 de 12 medições** e acessibilidade 100 em 12 de 12: layout e marcação não são o problema a atacar primeiro.

### 1.2 Produção (HTTP real, os dois domínios), 7 páginas × 2 aparelhos × 1 rodada

Rótulo `producao`, carimbo `2026-11-09T15:19:43Z`. Cada linha é uma medição única (sem mediana); por isso o §5 trata diferenças pequenas como ruído.

| Domínio e página | Aparelho | Desempenho | Acessibilidade | Boas práticas | SEO | LCP (ms) | CLS | TBT (ms) | Peso | Requisições |
|---|---|---|---|---|---|---|---|---|---|---|
| `.com.br/` | celular | 97 | 100 | 100 | 100 | 1885 | 0,000 | 145 | 775 KiB | 27 |
| `.com.br/` | computador | 99 | 100 | 100 | 100 | 620 | 0,000 | 0 | 890 KiB | 24 |
| `.com.br/curso/ru/dia/1` | celular | 100 | 100 | 100 | 100 | 1080 | 0,000 | 8 | 601 KiB | 29 |
| `.com.br/curso/ru/dia/1` | computador | 99 | 100 | 100 | 100 | 776 | 0,000 | 0 | 454 KiB | 23 |
| `.com.br/gramatica/ru` | celular | **87** | 100 | 100 | 100 | **4100** | 0,000 | 44 | 604 KiB | 29 |
| `.com.br/gramatica/ru` | computador | 100 | 100 | 100 | 100 | 734 | 0,000 | 0 | 469 KiB | 23 |
| `.com/` | celular | 99 | 100 | 100 | 100 | 977 | 0,000 | 107 | 790 KiB | 27 |
| `.com/` | computador | 100 | 100 | 100 | 100 | 374 | 0,000 | 0 | 766 KiB | 22 |
| `.com/curso/ru/dia/1` | celular | 100 | 100 | 100 | 100 | 971 | 0,000 | 7 | 607 KiB | 29 |
| `.com/curso/ru/dia/1` | computador | 100 | 100 | 100 | 100 | 612 | 0,000 | 0 | 472 KiB | 23 |
| `.com/curso/es/dia/1` | celular | 100 | 100 | 100 | 100 | 968 | 0,000 | 0 | 586 KiB | 28 |
| `.com/curso/es/dia/1` | computador | 100 | 100 | 100 | 100 | 612 | 0,000 | 0 | 451 KiB | 22 |
| `.com/gramatica/es` | celular | **83** | 100 | 100 | 100 | **4778** | 0,000 | 13 | 591 KiB | 28 |
| `.com/gramatica/es` | computador | 100 | 100 | 100 | 100 | 566 | 0,000 | 0 | 456 KiB | 22 |

O que muda na produção em relação ao servidor local:

- **Só as páginas de gramática continuam lentas no celular**: 4,1 s (`/gramatica/ru`) e 4,8 s (`/gramatica/es`), 87 e 83 de desempenho. O padrão atravessa domínios e idiomas, então não é dado de uma página: é o tipo de página.
- **As páginas de aula vão bem**: LCP 0,97–1,08 s no celular, 100 de desempenho nos dois domínios. É a página que o aluno usa em série — e é a que está saudável.
- **O `.com` é igual ou melhor que o `.com.br`** na home e nas aulas, servindo a mesma aplicação: a diferença é de conteúdo, não de infraestrutura.
- **CLS 0,000 em 14 de 14** e acessibilidade 100 em 14 de 14 na produção.

## 2. axe-core — WCAG 2.0/2.1/2.2 A e AA, viewport 412×823, 09/11/2026

| Onde | Páginas | Violações | Graves/críticas |
|---|---|---|---|
| Servidor local (`.com.br`) | 6 | **0** | 0 |
| Produção (`.com.br` e `.com`) | 7 | **0** | 0 |

Zero em 13 páginas, incluindo `/`, `/cursos`, `/curso/de`, `/curso/ru/dia/1`, `/curso/es/dia/1`, `/gramatica/ru`, `/gramatica/es` e `/por-que-linvuu`. Detalhe técnico que vale registrar: o site tem CSP `script-src 'self'` e o navegador recusa `addScriptTag`, então o axe-core é avaliado no contexto da página (CDP `Runtime.evaluate`) — mede o mesmo DOM sem afrouxar a política de segurança para poder auditar.

## 3. Inventário medido por HTTP

| Medida | Valor | Como foi obtido |
|---|---|---|
| Respostas HTML com meta coerente | **3.784** (281 redirecionamentos, 3 aliases) | `node --import tsx scripts/testar-http-seo.ts` |
| Sitemap `.com.br` / `.com` | **87** / **46** `<loc>` | `node scripts/seo.mjs`, contagem de `<loc>` |
| Aulas e sessões | 460 aulas, 1.840 dias-fonte, 680 traduzidos | `node scripts/conteudo.mjs --check` |
| Explicações | pt 1.592, en 928 sessões | `docs/COBERTURA-IDIOMAS.md` |
| Rotas sondadas em produção | 31 caminhos em 2 domínios = 62 requisições | `curl` com `?cb=` aleatório; resultado em `docs/SEO_AUDIT.md` §7 |
| Peso das páginas | 451 a 890 KiB, 22 a 29 requisições | Lighthouse `total-byte-weight` |
| CSS bloqueante | 19,7 KiB, cerca de 302 ms no celular | `render-blocking-insight` |
| Fontes | 2 arquivos `.woff2` (161 KiB), carregados em 36 ms | `network-requests` |

## 4. Funil e engajamento — NÃO MEDIDO

O site só pode enviar dez eventos (`src/lib/analytics.ts:4`): `page_viewed`, `course_viewed`, `lesson_started`, `practice_completed`, `lesson_completed`, `view_pricing`, `select_plan`, `checkout_started`, `checkout_returned`, `signup_completed`. Todos dependem de consentimento (`linvuu:analytics:v1`), vivem no PostHog e **não são legíveis sem o acesso do Felipe ao projeto 678481**. Portanto não existe valor de linha de base para funil ou engajamento, e este documento não inventa um.

Consequência para o protocolo, registrada antes de qualquer experimento: um ciclo de hero/CTA não pode ser julgado pelo evento que o playbook imagina (clique no CTA), porque ele **não existe**. As opções são (a) medir `view_pricing` → `select_plan` → `checkout_started` por sessão, que é o funil real e já existe, ou (b) acrescentar um evento de clique por CTA antes do experimento. A opção (a) não exige código novo; a (b) responde à pergunta sobre um botão específico.

## 5. Regra de decisão (aceitar ou reverter)

O ciclo é: medir (§1 a §4), mudar **uma** variável, medir com os mesmos comandos, comparar. A decisão é mecânica.

**Reverter se qualquer um acontecer:**

- qualquer categoria do Lighthouse cair **mais de 3 pontos** em relação a esta linha de base (mesma página, mesmo aparelho);
- SEO abaixo de 100 em qualquer página (hoje é 100 em 26 de 26 medições);
- CLS acima de 0,000 em qualquer página (hoje é 0,000 em 26 de 26);
- LCP do celular piorar **mais de 15%**;
- nova violação de axe-core (hoje são 0 em 13 páginas);
- se houver dado de funil: `checkout_started` por sessão cair mais de 10% em 14 dias com amostra de ao menos 100 sessões.

**Manter se** nenhum limite acima foi tocado e ao menos uma medida melhorou de forma visível.

**Ruído:** diferença de até 3 pontos de nota e de até 10% de LCP entre duas medições é ruído, no local porque a mediana é de 2 rodadas e em produção porque é 1 rodada. Uma mudança que só produz ruído não é melhoria e não deve ser anunciada como tal.

## 6. Ciclos REA registrados

| Data | Pergunta de evidência | Linha de base | Evidência externa | Mudança | Pós-mudança | Decisão | PR |
|---|---|---|---|---|---|---|---|
| 09/11/2026 | nenhum ciclo visual aberto ainda | §1 | — | — | — | — | — |

Sobre a evidência externa: os benchmarks citados no playbook (Material Design 3, Ant Design, Carbon, Design Systems Repo) são documentação pública de licença permissiva e servem para **ler padrão**, não para copiar código. Este repositório já tem sistema de design próprio (`docs/SISTEMA-DE-DESIGN.md`, `src/tokens.css`, e `scripts/validar-design.mjs` cobre contraste nos dois temas), então uma mudança visual parte dos tokens existentes. Nenhum dos 25 repositórios do playbook foi clonado: `AGENTS.md` proíbe executar código externo sem necessidade, e nada aqui precisa deles para medir o próprio site.

