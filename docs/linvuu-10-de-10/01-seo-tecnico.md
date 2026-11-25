# 01 — SEO técnico, domínios e indexação

Leia antes de mexer em rota, redirect, sitemap, robots, canonical, hreflang, meta, JSON-LD, título ou `vercel.json`. **Trava ativa** (ver `00-INDICE.md` §2).

## 1. Onde mora cada coisa (caminhos verificados na `main`)

| Assunto | Arquivo |
|---|---|
| Regras de domínio e 301 (www→apex, `/en` `/es` legados, `/curso/br` e `/livros/br` no .br → .com, `/livros/<id≠br>`, `/materiais-gratuitos/<guia>`, `/ex-alunos-udemy`, `/livro/gramatica-ru` no .com → .br, `/portugues` → `linvuu.com/curso/br`, `/index.html` → `/`) | `server/dominio.ts` |
| Meta por rota (título, description, canonical, robots, hreflang, JSON-LD). **Fonte única**, também usada pelo servidor e pelo teste | `src/lib/metaRota.ts` (não existe `server/metaRota.ts`; o CLAUDE.md antigo errava) |
| Perfil por Host | `src/i18n/locales.ts` (`perfilDoHost`, `comPerfil`) |
| Vitrine do que cada domínio oferece | `src/lib/content.ts` (`cursoComExplicacaoNoSite`), `content/indice.json`, `content/indice.en.json` |
| Geração de sitemaps, robots, `llms*.txt` | `scripts/seo.mjs` → `public/sitemap.xml`, `public/sitemap-global.xml`, `public/sitemap-brasil.xml`, `public/sitemap-internacional.xml`, `public/robots.txt`, `public/robots-global.txt`, `public/llms*.txt` |
| Entrega dos sitemaps/robots | `server/app.ts` (rota explícita antes do `express.static`; o Search Console recusa sitemap servido como `text/html`) |
| Pré-render e validação | `scripts/prerender.mjs`, `scripts/validar-prerender.mjs` |
| Matriz viva de rotas por domínio | `specs/MAPA-ROTAS-E-DOMINIOS.md` (gerada por `npm run audit:rotas-dominios`; se mudar, `-- --atualizar-mapa` e commitar) |
| Rotas Vercel | `vercel.json`: 1 rewrite, 1 bloco de headers, `functions["api/index.mjs"]` com `includeFiles`, `maxDuration: 60`, `regions: ["gru1"]`. Sem `redirects` (os 301 vêm de `server/dominio.ts`). |

`public/robots.txt` e `public/robots-global.txt` anunciam cada um **um** `Sitemap:` (`https://linvuu.com.br/sitemap.xml` e `https://linvuu.com/sitemap.xml`, linha 100 dos dois).

## 2. Decisões de indexação em vigor
- Páginas de sessão `/curso/:id/dia/:n` são **noindex de propósito** (decisão 11/11, PR #551), **exceto a sessão 1** de curso completo no idioma da página, e só quando existe `explicacaoCompleta` (`src/lib/metaRota.ts`). Curso parcial **não** ganha página indexável nem hreflang.
- Por isso o sitemap do .com é menor que o do .com.br. **Não é bug.** Não "corrigir" sem ordem do Felipe.
- `/curso/it` no .com: rota `200 + noindex`, fora da vitrine pública (home, `/cursos`, `/materiais-gratuitos` do .com não a linkam).
- Privadas (`/entrar`, `/cadastro`, `/curso/:id/revisao`): `noindex`; revisão também `nofollow`, fora do sitemap e **sem** `Disallow`.
- `/es/...` e `/en/...` de interface: só 301. Nunca criar página, sitemap, hreflang ou pedido de indexação para eles. `/curso/es` é o curso **de** espanhol, não interface em espanhol.
- `/ex-alunos-udemy`: no sitemap do .br; **não remover**.
- Título de páginas indexáveis: 35–60 caracteres (`scripts/testar-titulos.ts`, desde 11/11/2026; antes a rota `/livros/de/capitulo/1` saía com 29).

## 3. Testes que protegem (CI `ci.yml`, `qualidade-seo.yml`) — NUNCA enfraquecer

| Script | O que trava (literal) |
|---|---|
| `scripts/testar-seo-publico.ts` | Home contém `<h1>${HOME_BR.titulo}</h1>`, `R$ 139`, `R$ 291,90`, `R$ 999`, "Experimentar duas aulas grátis"; **não** contém `R$ 500` nem "Novos planos em preparação". `/curso/en/dia/9` tem `noindex`; `/curso/en` não. Oito amostras (`dia/1..8`) com link estático em `/curso/en` e `/curso/ru`. Gramática `/gramatica/<id>` contém tópico gratuito (`dia <= 8`) e **não** expõe tópico pago. `/sobre` e `/contato` no .com levam `<!--email_off-->` (Cloudflare Scrape Shield quebrava o `mailto:`). `/en` não pode prometer "Every explanation is in English". Sitemap só lista capítulos gratuitos e não lista `/livro/gramatica-ru`. |
| `scripts/testar-http-seo.ts` | Servidor local sem credenciais, só GET: canonical, destinos públicos e status de todas as sessões/idiomas. |
| `scripts/testar-isolamento-http.mjs` | Porta 43922, `NODE_ENV=production`. `/api/gramatica/<id>?l=en` → 200 no `linvuu.com`; `?l=pt` → 404; `linvuu.com.br/api/gramatica/it?l=en` → 404; todo tópico no .com com `explicacaoEm==='en'`; `/api/aula/it/9?l=en` → 404; `/api/audio/ru/12345678.mp3` e `/api/aula/ru/9` → **503** sem auth/cobrança nos dois hosts; `/audio/de/fcd97331.mp3` público → 200. |
| `scripts/testar-titulos.ts` | Faixa 35–60 caracteres, nos dois perfis. |
| `scripts/testar-paridade-meta.mjs` | `<head>` do HTML do servidor = `<head>` após JS (título, canonical, robots, hreflang) para todo URL do sitemap; roda no workflow `qualidade-seo.yml` com `http://127.0.0.1:4398` e com `global`. |
| `scripts/testar-inventario-seo.ts`, `testar-robots-navegacao.ts`, `testar-links-publicos.ts`, `testar-seo-http.mjs`, `testar-robots-google.mjs` | Inventário, robots, links e HTTP (job `Verificar todas as sessoes e idiomas…`). |
| `npm run audit:rotas-dominios` | Matriz desatualizada, URL do sitemap fora do ar, hreflang sem volta, página órfã e mistura de idioma reprovam. |
| `lighthouserc.cjs` | Lighthouse CI no workflow `qualidade-seo.yml`. |

## 4. Defeitos já vistos (não repetir)
- Sitemap duplicado no robots (dois arquivos byte-idênticos por domínio).
- `www.linvuu.com` com **308** e `.com.br` com 301: padronizado em 301.
- Vitrine do .com apontando para `/curso/it` (noindex) e exibindo aviso em português.
- Template do .com escondendo a seção editorial por restrição `pt-BR`.
- **Aberto:** `www` + barra final resolve em **2 saltos**. Só corrigir depois da trava.

## 5. Procedimento de mudança (depois da trava)
1. Branch a partir de `origin/main`. 2. Edite a **fonte** (`src/lib/metaRota.ts` / `server/dominio.ts` / `scripts/seo.mjs`), nunca o arquivo gerado. 3. `npm run build:website` e `npm run audit:rotas-dominios` (precisa de `dist/`). 4. Rode os scripts da §3 localmente. 5. Meça ao vivo: `curl -sI -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.linvuu.com/` e a leitura do sitemap publicado. 6. Só então peça ordem de merge.

## 6. Critério de saída para 10/10 (mensurável)
- 0 redirects com mais de 1 salto nos dois domínios (inclui `www` + barra final).
- GSC: validação de "Página com redirecionamento" concluída (8 no .br, 3 no .com) e 0 erros de cobertura nas URLs do sitemap.
- Sitemap `.com.br` 57 e `.com` 30 URLs, todas 200, canonical autorreferente, hreflang com volta (`npm run audit:rotas-dominios` verde).
- `testar-paridade-meta.mjs` verde nos dois perfis.
