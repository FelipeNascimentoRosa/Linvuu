# Decisão de indexação — 11/11/2026

**Aprovada por Felipe** («eu aprovo a mudança, pense em detalhes de SEO de pesquisa e o site em si, pode mudar»).
Muda a estrutura de indexação dos cursos: a sessão de aula deixa de ser página de busca. Não muda o produto,
o preço, o acesso grátis nem o que o aluno vê.

## 1. O que foi medido (não presumido)

Search Console, propriedades `sc-domain:linvuu.com.br` e `sc-domain:linvuu.com`, 13/10 a 08/11/2026:

| Dado | Valor |
|---|---|
| `.com.br` — impressões / cliques | 236 / 10 |
| `.com.br` — home | 192 impressões, 7 cliques, posição média 8,4 |
| `.com.br` — `/assinatura` | 33 impressões, posição 2,9, **0 cliques** |
| Sessões de aula (todos os idiomas, 27 dias) | ~25 impressões somadas |
| `.com` — 51 URLs | 10 impressões, 0 cliques |
| Sitemaps enviados / indexados | `.com.br` 87 / **0**; `.com` 35 / **0** |
| Inspeção de URL `/curso/de/dia/1` | «Discovered — currently not indexed», nunca rastreada |
| Inspeção de URL `/` | «Submitted and indexed», `INDEXING_ALLOWED`, rastreio móvel em 08/11 |

O HTML estava correto em ambos os casos (372 palavras na home, 409 na sessão, robots e canônica certos).
**Não havia bloqueio técnico**: o Google simplesmente não tinha motivo para indexar 3.680 sessões que
repetem o mesmo cabeçalho, a mesma navegação e o mesmo método (~400 palavras, 90% comuns entre si).

### Correção de um diagnóstico anterior

A conclusão «o site publica 3.680 páginas de sessão» estava errada na contagem do que o Google recebe.
Verificado no código (`src/lib/metaRota.ts`) e no HTML em produção (`/curso/de/dia/40` responde com
`<meta name="robots" content="noindex">`): **3.568 das 3.680 sessões já eram `noindex`** (as pagas).
O que o Google de fato recebia eram **138 URLs**, das quais 96 eram sessões de amostra — e mesmo essas
somaram ~25 impressões. O problema não era volume de páginas publicadas; era *submeter* páginas que não
têm demanda de busca e não têm texto próprio.

## 2. Decisão

1. **A sessão de aula nunca é página de busca.** Vale para as 3.680 (pagas e grátis), nos dois domínios.
   `noindex` sem `Disallow` no `robots.txt`: o Google precisa rastrear para ler a marca e retirar a URL.
   Bloquear no robots deixaria a URL presa no índice como «indexada sem conteúdo».
2. **A página de busca do curso é o hub** `/curso/<id>` (e `/gramatica/<id>` para a referência gramatical).
   É lá que entram preço, duração, método, ementa e as perguntas que as pessoas pesquisam.
3. **O sitemap só anuncia o que merece índice**: home, hubs, gramáticas, livros, institucional.
   As páginas legais (`/privacidade`, `/termos`) continuam fora, como antes.

A sessão continua servida a quem estuda — é o teste grátis que o hub anuncia («duas primeiras aulas grátis,
sem cartão»), e os links do hub para os dias 1–8 continuam no HTML. Só não recebe tráfego do Google.

## 3. O que mudou no código

| Ficheiro | Mudança |
|---|---|
| `src/lib/metaRota.ts` | rota `/curso/<id>/dia/<n>`: `semIndice: true` fixo (antes dependia de `n > SESSOES_GRATIS` e da tradução) |
| `scripts/seo.mjs` | saem do sitemap as 8 sessões por curso; `temAula` removida com o laço |
| `scripts/testar-inventario-seo.ts` | a regra testada passa a ser «toda sessão é `noindex`» e «o sitemap não pode conter `/curso/*/dia/*`» |
| `public/sitemap.xml` | 87 → **39** URLs |
| `public/sitemap-global.xml` | 51 → **15** URLs |

Verificação local (11/11/2026): `npm run lint` exit 0 · `npm run build` exit 0 ·
`node --import tsx scripts/testar-inventario-seo.ts` → `{"sessoes":3680,"pagas":3568,"gratuitas":112,"sitemap":54,"resultado":"conforme"}` ·
`testar-titulos.ts` → 40 títulos ≤60 e 40 descrições 120–160 · `testar-seo-publico.ts` exit 0.

## 4. Como medir se funcionou

- **GSC, cobertura:** as URLs `/curso/*/dia/*` devem cair de «Detetada — não indexada» para «Excluída por
  `noindex`» em 2 a 6 semanas. Isso é o sinal esperado, não uma perda.
- **GSC, impressões:** o que se mede é o **hub** (`/curso/de`, `/curso/ru`, `/curso/en`) receber impressões.
  Prazo realista: 4 a 8 semanas; cortar URLs não cria procura.
- **Não confundir:** retirar 96 URLs do índice não aumenta tráfego. O ganho é deixar de diluir a autoridade
  escassa do domínio e ter onde investir texto. A procura vem do passo seguinte (conteúdo por intenção de
  busca e links reais).

## 5. Limitações e reversão

- **Não cria demanda.** A Linvuu continua sem autoridade: as impressões que existem são de marca
  («linvuu») e de uma consulta genérica em inglês («russian classes near me», 122 impressões, posição 10,5,
  0 cliques). Isso resolve-se com páginas por intenção e menções reais, não com sitemap.
- **Reversão:** `git revert` do commit desta decisão. As pagas voltam a `noindex` pela regra antiga
  (`n > SESSOES_GRATIS`); as amostras grátis voltam ao índice e ao sitemap sem mais nenhum passo.
- **Código morto conhecido:** o pré-render da sessão grátis (`sessaoGratisParaHtml`, `sessaoGratisEnParaHtml`
  e o ramo `md` de `conteudoRota`) deixa de ser alcançado, porque `conteudoRota` devolve `''` para `noindex`.
  Fica registado em `PENDENCIAS.md` para remoção isolada, sem misturar com esta mudança de política.
- **Pendente de verificação em produção:** este documento descreve o que está **testado localmente**.
  Deploy e comportamento em produção exigem conferir Render e o HTML servido depois do merge.
