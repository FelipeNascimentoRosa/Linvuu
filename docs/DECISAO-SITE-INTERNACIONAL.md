# Decisão: a Linvuu é um site internacional (29/10/2026)

**Decisão do Felipe (fundador), 29/10/2026.** O site é internacional a partir de hoje. Isto vale para todos os agentes e para todo o código e documentação.

> ## Emenda de 09/11/2026 — o idioma passou de caminho para domínio
>
> O texto abaixo é histórico e continua registrando a decisão de 29/10, mas os itens que falam em `/`, `/en` e `/es` **não descrevem mais o site**. O modelo em vigor:
>
> | Antes (29–30/10) | Agora (desde 30/10; espanhol removido em 06/11) |
> |---|---|
> | `/` em português, `/en` em inglês, `/es` em espanhol | `linvuu.com.br` em português, `linvuu.com` em inglês — **um idioma de interface por domínio**, sem prefixo de caminho |
> | moeda única | reais no `.com.br`, dólares no `.com` (`docs/PRECOS-DEFINIDOS.md`) |
> | separação por caminho | `server/dominio.ts` devolve **301** quando a rota só existe no outro domínio; `scripts/testar-dominio.ts` cobre a regra (20 casos puros + 8 requisições HTTP reais no CI) |
>
> Ficam **superados** os itens 4 e 8 (que citam `/`, `/en`, `/es`) e a linha "Render" da seção Infraestrutura (o mesmo serviço serve os dois domínios, não os caminhos `/en` e `/es`). O espanhol deixou de existir em 06/11. O resto da decisão — não prometer o que não existe, ocultar o curso da própria língua, língua do site ≠ língua da explicação — continua valendo integralmente.
>
> Estado medido em 09/11 (`main` = `be7ac4caf`): `.com.br` responde `lang="pt-BR"` e `.com` responde `lang="en"`; `/livros` no `.com` → 301 para o `.com.br` (PR #530). As três rotas institucionais que serviam português dentro do domínio inglês **foram traduzidas**: `/sobre` (PR #533) e `/por-que-linvuu` (PR #535), verificadas em produção, e `/contato` (PR #543), que passou a responder 200 em inglês, sem `noindex`, com `hreflang` pt-BR/en/x-default e entrada no sitemap do `.com` (46 → 47 URLs). Continuam só em português, por decisão e não por esquecimento, `/ex-alunos-udemy` (conversão de ex-alunos) e `/livro/gramatica-ru` (produto em português): os dois seguem `noindex` no `.com`, listados em `PENDENCIAS.md`.


> ## Emenda de 11/11/2026 — espanhol é língua a estudar, nunca língua de explicação
>
> **Ordem do Felipe, 11/11/2026.** O espanhol **não é** língua de interface nem de explicação, e não volta — só numa outra decisão dele (se o site viralizar), que seria registrada aqui antes de qualquer código. O que existe hoje:
>
> | | Até 06/11 | Agora |
> |---|---|---|
> | `.com.br` | português, com uma opção de ler as explicações em espanhol | explicações **em português** |
> | `.com` | — | explicações **em inglês** |
> | espanhol | interface e explicações em espanhol | **só língua a estudar**: `curso/es`, `livros/es`, `content/idiomas/es` (como alemão, russo, francês, italiano) |
> | `/es/...` | família de endereços válida | endereço **legado**, sem conteúdo; só redireciona |
>
> Limpeza feita nesta data: `Explicacao = 'pt' | 'en'` (`src/i18n/ensino.ts`), sem dicionário espanhol, sem pasta de tradução `es` em `content/idiomas/*`, sem texto público prometendo aula explicada em espanhol. Os itens 1, 3, 4 e 6 abaixo estão **superados** nesta parte; a linha "Render" da seção Infraestrutura também. O resto continua valendo.

> ## Emenda de 11/11/2026 — quais páginas de idioma ficam fora do índice
>
> **Regra, escrita por ordem do Felipe em 11/11/2026** (medida em `docs/AUDITORIA-SITE-2026-11-11.md` §5.2). Uma página de curso ou de gramática só é indexável — sem `noindex`, com `<loc>` no sitemap do seu domínio e `hreflang` para as versões que existem — quando o conteúdo dela existe **na língua daquele domínio**. Não é escolha de SEO: é o item 6 abaixo («não prometer o que não existe»), lido dos arquivos de conteúdo por `explicacaoCompleta` e `gramaticaExisteEm` (`src/lib/metaRota.ts`).
>
> | Domínio | `/curso/<id>` indexável | `/gramatica/<id>` indexável |
> |---|---|---|
> | `linvuu.com.br` (pt) | todos, menos `br` (o curso de português mora no `.com`) | todos, menos `br` |
> | `linvuu.com` (en) | `br`, `fr`, `ru` | `br`, `es`, `fr`, `ru` |
>
> No `.com`, sete rotas respondem **200 com `noindex`**, sem `<loc>` e sem `hreflang`: `/curso/de`, `/curso/en`, `/curso/es`, `/curso/it`, `/gramatica/de`, `/gramatica/en` e `/gramatica/it`. São páginas que só servem a quem já tem o link — mostram o texto original em português. O que as destrava **não é código, é conteúdo**: `content/indice.en.json` com todas as aulas daquele curso explicadas em inglês, e `content/gramatica/<id>.en.json`. Publicada a tradução, a página entra no índice e no sitemap sozinha, porque a decisão é lida dos arquivos a cada requisição.
>
> Medido nos dois domínios em 11/11/2026: no `.com`, `br`, `fr` e `ru` têm curso completo em inglês; `es` tem só a gramática traduzida (`/gramatica/es` indexável, `/curso/es` não).
>
> **Não** apague esse `noindex` para "igualar" os domínios: sem a tradução, a página em inglês passa a mostrar português e a competir consigo mesma na busca. Quem cobre o que sobra indexável é `scripts/testar-titulos.ts` (títulos 30–60, descrições 120–160) mais `scripts/testar-inventario-seo.ts` (indexável ⇔ no sitemap, `hreflang` igual ao HTML).

## O que isso significa
1. **Público.** Falantes de português e de inglês estudam qualquer idioma que não seja o seu. Um americano ou um indiano estuda russo ou alemão com explicações em inglês; um falante de espanhol lê o site em português ou em inglês — **não há explicação em espanhol** (emenda de 11/11).
2. **Uma só home, um só marketing.** A home e a comunicação são as mesmas para todas as línguas (modelo dos concorrentes, como o Babbel). Só o texto muda de língua. Não se cria home separada por público. A home em português (`src/pages/HomeBrasileiros.tsx`) é a base; `src/i18n/home.ts` traduz.
3. **O curso da própria língua do visitante nunca aparece** na vitrine (`cursoOculto` em `src/i18n/locales.ts`): no `.com` não há inglês; no `.com.br` não há português para estrangeiros.
4. **Língua do site ≠ língua de explicação.** O domínio define a interface (`.com.br` em português, `.com` em inglês). A explicação das aulas e a gramática têm arquivos próprios por língua, hoje só `pt` e `en` (ver `docs/ESTRUTURA-INTERNACIONAL.md`).
5. **Nada de "para brasileiros" no texto público.** "Brasileiros" só aparece no curso Português do Brasil.
6. **Não prometer o que não existe.** "Explicado em inglês" só onde as aulas estão traduzidas (hoje: só o curso `br` em inglês) e "explicado em português" no `.com.br`. O estado real está em `docs/COBERTURA-IDIOMAS.md` (`node scripts/cobertura-idiomas.mjs`).

## Onde isso aparece (para não se perder)
| Assunto | Arquivo |
|---|---|
| Estrutura de arquivos por língua | `docs/ESTRUTURA-INTERNACIONAL.md` |
| Cobertura de tradução | `docs/COBERTURA-IDIOMAS.md` |
| Locales, vitrine, curso oculto | `src/i18n/locales.ts` |
| Home e traduções | `src/pages/HomeBrasileiros.tsx`, `src/i18n/home.ts` |
| Metas e prerender | `src/lib/metaRota.ts` |
| Teste de SEO | `scripts/testar-seo-publico.ts` |

## Documentos anteriores que esta decisão substitui
`docs/INTERNACIONAL.md` (13/10, "EN desligado") e qualquer texto que descreva a Linvuu como "para brasileiros" ou o inglês/espanhol como edição só de interface.

## Infraestrutura
- **Render:** o mesmo serviço `linvuu` serve os dois domínios (`.com.br` em português, `.com` em inglês); não há serviço nem caminho por língua.
- **Firebase:** um só projeto e um só Firestore; a língua é preferência do usuário, não projeto separado.
- **Preço e Stripe:** não mudam por esta decisão. Preço internacional exige autorização explícita do Felipe.
