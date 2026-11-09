# Auditoria de SEO, rotas e i18n — Linvuu (09/11/2026)

Medido em `main` = `b71ce2405`, no repositório, com produção consultada por HTTP. Cada linha abaixo aponta arquivo, comando ou medição. O que não foi medido está marcado como **não medido** — não há checklist genérico aqui.

Motivo desta auditoria: um playbook externo (recebido em 09/11) pediu reescrever o i18n para `/pt/` + `/en/`, trocar a biblioteca de i18n por Paraglide, "implementar prerender" e clonar 25 repositórios. Boa parte disso já existe neste repositório, e a parte que não existe **destruiria** decisão do fundador e indexação. O §4 registra o veredito item por item.

## 1. "É um SPA? Precisa de prerender?"

Não é SPA cega, e o prerender já existe — feito no Express, por requisição.

- `server.ts:20` importa `aplicarMeta, carregarDadosMeta, metaDaRota, metaParaNavegador` de `src/lib/metaRota.ts`.
- `server.ts:210` lê `dist/index.html` como base; o catch-all injeta `<title>`, `description`, `robots`, `canonical`, `hreflang`, `<html lang>` e JSON-LD **antes** de entregar o HTML.
- `server.ts:155` explica por que a home também passa pelo catch-all (sem isso `/` saía sem `hreflang`).

Medição, não estimativa: `scripts/testar-http-seo.ts` percorreu os dois domínios e devolveu `{"paginasHttp":3784,"redirecionados":281,"resultado":"conforme"}` (verificação do PR #530). O `dist/` tem 1 `.html` porque o meta vem do servidor, não de arquivo pré-gerado.

Isso é melhor que prerender de build para este produto: as 1.840 sessões e os títulos vivem em JSON e mudam a cada PR; um HTML pré-gerado ficaria velho entre o build e o deploy.

## 2. Inventário medido

| Item | Estado | Fonte |
|---|---|---|
| Páginas HTML públicas | 3.784 respostas HTTP com meta coerente | `scripts/testar-http-seo.ts` |
| Sitemap `.com.br` | `public/sitemap.xml`, **87 URLs** | contagem de `<loc>` |
| Sitemap `.com` | `public/sitemap-global.xml`, **35 URLs** | contagem de `<loc>` |
| `robots.txt` | existe; `Allow: /`, `Disallow: /api/` e `/admin/`, `Sitemap:` declarado | `public/robots.txt`; `public/robots-global.txt` |
| `favicon` | existe (`/brand/favicon-64.png` + `apple-touch-icon`) | `index.html:22-23` |
| `webmanifest` (PWA) | **não existe** — e não é prioridade: o app do celular é o APK. O `manifest` do `vite.config.ts:70` é o manifest de build do Vite (modulepreload), outro assunto | `vite.config.ts:69-70` |
| `hreflang` | por rota, entre `pt-BR` e `en` | `src/lib/metaRota.ts`, `index.html:20`, `scripts/testar-paridade-meta.mjs` |
| `canonical` | por rota | `src/lib/metaRota.ts` |
| `lang` por domínio | `.com.br` → `pt-BR`; `.com` → `en`; rota que não existe no domínio → 301 | `server/dominio.ts`, `scripts/testar-dominio.ts` |
| JSON-LD | **23 tipos** já emitidos, incluindo `EducationalOrganization`, `WebSite`, `BreadcrumbList`, `Course`, `CourseInstance`, `Offer`, `Product`, `FAQPage`, `Book`, `Chapter` | `src/lib/metaRota.ts`, `src/components/JsonLd.tsx` |
| Imagens | 16 `.webp`, 9 `.svg`, 5 `.png`, 3 `.jpg` — WebP já é o padrão | `public/**` |
| Conteúdo | 7 cursos, **1.840 sessões**; 1.592 explicadas em pt, 808 em inglês | `docs/COBERTURA-IDIOMAS.md` |

## 3. O que o CI já cobra (não precisa de auditoria manual)

Sete checks por PR: `build`, `visual`, `lighthouse`, `paridade-head`, `robots-google`, `Auditoria completa de dependências`, `Varredura de segredos (gitleaks)`.

`lighthouserc.cjs:18-28`, 5 URLs × 3 corridas, mobile:

- `categories:seo` ≥ **0,90** → **erro** (bloqueia merge)
- `categories:performance` ≥ **0,75** → erro; `cumulative-layout-shift` ≤ **0,1** → erro
- `categories:accessibility` ≥ **0,90** → aviso
- `is-crawlable` e `robots-txt` → erro

Ou seja: "corrija CSS não usado / fontes / CLS / imagens sem dimensão" já tem porteiro automático. O que o Lighthouse **não** vê é demanda de busca e conversão — é aí que está o trabalho real (§5).

## 4. Veredito sobre o playbook recebido (item por item)

| Pedido do playbook | Veredito | Porquê |
|---|---|---|
| "implemente prerender (vite-plugin-prerender ou SSR)" | **Já existe** | meta injetado por requisição no Express (§1), com teste HTTP que reprova o CI |
| Migrar para `/pt/...` e `/en/...` | **Recusado** | Contraria a decisão de 29/10 (`docs/DECISAO-SITE-INTERNACIONAL.md`: um idioma de interface por domínio). O `.com` já removeu os prefixos de propósito (`/en/cursos` → 301 `/cursos`, provado por `scripts/testar-dominio.ts`). Reescrever moveria 3.784 URLs, 87 + 35 entradas de sitemap e todo o histórico de indexação, sem ganho de SEO |
| Trocar i18n por Paraglide/i18next | **Recusado** | `src/i18n/pt-BR.ts` e `en.ts` são tipados e têm paridade cobrada por `scripts/testar-paridade-meta.mjs`. Trocar biblioteca não converte ninguém e arrisca quebrar 1.840 sessões de texto |
| "crie robots/sitemap/manifest/favicon se não houver" | **3 de 4 existem** | só falta `webmanifest`, que não é prioridade enquanto o caminho móvel for o APK |
| "JSON-LD Organization/WebSite/Breadcrumb/Product" | **Já existe** | 23 tipos, incluindo os quatro citados |
| "converta imagens para WebP/AVIF, `loading=lazy`" | **Quase todo feito** | WebP já é o padrão (16 de 33); AVIF é ganho marginal. `lazy` e dimensões explícitas: conferir caso a caso, com CLS ≤ 0,1 já bloqueando merge |
| "adicione formulário de contato com rate limit" | **Já existe** | `server/newsletter.ts`, `src/components/Newsletter.tsx`, rate limit em `server/seguranca.ts` |
| "clone 25 repositórios como memória" | **Recusado** | `AGENTS.md` proíbe executar código externo sem necessidade e manda reusar só licença permissiva. Awesome-lists não substituem medição local: as cinco perguntas do playbook foram respondidas lendo este repositório |
| "APK só no final" | **Concordo, e já é o estado** | compras desligadas e sem backend Play (`docs/APK.md:7`) |

Uma coisa do playbook é boa e fica: **a auditoria medida** (este arquivo) e a exigência de explicação em inglês para decisões de conteúdo — registrada em `NOTES.md`.

## 5. Lacunas reais (com custo e ordem)

Ordenadas pelo que trava receita, não pelo que é mais fácil.

1. **Compra não verificada de ponta a ponta**, nos dois domínios. Enquanto isso não acontecer, nada de anúncio: é a mesma conclusão de `docs/MARKETING-30-DIAS-2026-11.md`. Depende de Felipe (US$ 1, reembolsar, conferir queda de acesso).
2. ~~**`.com/sobre` em português com `<html lang="en">`**~~ — **resolvido em 09/11** (PR #533; verificado em produção: 200, `lang="en"`, sem `noindex`, sitemap do `.com` com 36 URLs): página escrita em inglês, `lang="en"`, sem `noindex`, no sitemap do `.com` com hreflang. Foi tradução, não redirect, como este documento dizia. O mesmo defeito existia, pior, em `/por-que-linvuu` — título em português, `noindex` e **sem corpo pré-renderizado** no `.com` — na rota que vende; corrigido em 09/11 na branch `feat/por-que-em-ingles`, **mesclado (PR #535) e verificado em produção**: 200, `lang="en"`, título «Why study with Linvuu?», sem `robots`, corpo em inglês e sitemap do `.com` com 37 URLs.
3. **Inglês só cobre 3 dos 7 cursos** (br 248, fr 248, ru 312 = 808 sessões). `de`, `en`, `es` e `it` têm **0** explicação em inglês: vender esses quatro no `.com` seria prometer o que não existe. Traduzir 4 × 248–288 sessões é meses de trabalho — só depois de o Brasil pagar (§ `docs/META-1M-2027.md`).
4. **Demanda de busca das páginas de aula é baixa.** 3.784 páginas é alcance, não tráfego: ninguém procura "aula 7 dia 3 curso de alemão". O tráfego orgânico vem de páginas de dúvida ("quando usar since e for", "acusativo alemão"). **Falta o corpus editorial** que disputa essas buscas — é o único item desta lista que gera receita sem depender de Felipe.
5. **APK sem monetização**: compras desligadas, sem backend Play, sem AAB assinado (`docs/APK.md:7,15`). Quatro a seis semanas de engenharia que só pagam depois da publicação.
6. `docs/DECISAO-SITE-INTERNACIONAL.md` ainda descreve `/`, `/en`, `/es` — documento desatualizado confunde os próximos agentes.
7. #453 (títulos ≤ 60 caracteres) e #445 (duplicata do #469) — higiene de fila.

## 6. Fila executável

| # | Tarefa | Dono | Depende de | Efeito |
|---|---|---|---|---|
| 1 | Traduzir `/sobre` e `/por-que-linvuu` para o `.com` | ~~agente~~ **feito 09/11, os dois em produção** | — | tirou o português das duas rotas institucionais do domínio en |
| 2 | Corpus editorial pt: páginas de dúvida com `FAQPage` | agente | — | a única alavanca de tráfego orgânico real |
| 3 | Atualizar `DECISAO-SITE-INTERNACIONAL.md` ao modelo por domínio | agente | — | para de induzir erro nos agentes |
| 4 | Compra verificada US$ 1 + R$ (dois domínios) | Felipe | Stripe test | destrava anúncio e medição |
| 5 | Play: AAB assinado + backend de compras | agente + Felipe | dados empresariais | abre o canal APK |
| 6 | Traduzir `de`/`en`/`es`/`it` para inglês | agente | receita do Brasil | abre o `.com` de verdade |
| 7 | Traduzir `/contato` para o `.com` | agente | decisão do Felipe | contato é confiança para quem compra; hoje é `noindex` no `.com` |

O item 2 é o único que combina "não depende de terceiro" com "gera receita", e é o que o `docs/META-1M-2027.md` trata como motor principal de médio prazo.

