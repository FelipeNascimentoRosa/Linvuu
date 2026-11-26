# Mapa vivo de rotas, sitemaps e domínios

Referenciado em [`CLAUDE.md`](../CLAUDE.md). A **matriz** (as duas tabelas entre os marcadores) é gerada por
`scripts/auditar-rotas-dominios.mjs` a partir dos sitemaps que o servidor realmente entrega; o texto em volta é regra.
Se a matriz divergir dos sitemaps, o CI falha. Para atualizar: `npm run audit:rotas-dominios -- --atualizar-mapa` e commitar.

## Os dois sites

| | linvuu.com.br | linvuu.com |
|---|---|---|
| Perfil / idioma da interface | `br` · pt-BR | `global` · en |
| Moeda | reais (BRL) | dólares (USD) |
| Quem é o aluno | fala português | fala inglês |
| Sitemap | `/sitemap.xml` (arquivo `sitemap-brasil.xml`) | `/sitemap.xml` (arquivo `sitemap-internacional.xml`) |

Um único serviço atende os dois; o que separa é o cabeçalho **Host**, em tempo de execução (`server/dominio.ts`).
Sitemaps e llms.txt nascem de `scripts/seo.mjs`, das mesmas listas de `src/lib/metaRota.ts`.

## Como ler a matriz

- **Exclusivas de um domínio:** `—` em uma das colunas. Ex.: `/livros`, `/ex-alunos-udemy` e `/materiais-gratuitos` só no .com.br (conteúdo em português).
- **Paridade hreflang:** onde a página existe nos dois, o HTML e o sitemap declaram `pt-BR` ↔ `en` e `x-default` (o `x-default` é o inglês quando ele está no cluster). Cada alternado precisa responder 200 no outro domínio e **devolver o link de volta**.
- **Canonical:** sempre a própria URL, no próprio domínio.
- `/es/...` e `/en/...` não existem como interface: só redirecionam (301). Nunca entram em sitemap nem hreflang.

## O que impede indexação prematura

1. **`explicacaoCompleta` (`metaRota.ts`):** o hub `/curso/<id>` só é indexável, e só entra no sitemap, num idioma em que **todas** as sessões do curso estão explicadas nele. Curso parcial não ganha página indexável nem hreflang. É intencional.
2. **Sessões `/curso/<id>/dia/N` são `noindex`** (decisão de 11/11/2026), **exceto a sessão 1** de curso completo no idioma da página; desde 18/11 o código exige `explicacaoCompleta` também na sessão 1.
3. **Gramática** só existe no sitemap onde o arquivo dela existe naquele idioma (`content/gramatica/<id>.json` / `<id>.en.json`).
4. **Italiano no .com:** só as aulas 1 e 2 (sessões 1–8) estão em inglês; as outras 60 estão em preparação (`docs/linvuu-10-de-10/06-operacao-pendencias.md`). Por isso `/curso/it` não está no sitemap do .com.
5. `/excluir-conta` e rotas de conta são `noindex, nofollow`.

## Idiomas: publicados × em preparação

Fonte da verdade: a tabela de cobertura abaixo (contagem de arquivos em `content/idiomas/`). Em preparação = qualquer curso com explicação menor que o total no idioma do domínio; o plano e o texto-fonte pendente ficam em `docs/linvuu-10-de-10/06-operacao-pendencias.md`.

## Matriz (gerada)

<!-- MATRIZ:INICIO (gerada por scripts/auditar-rotas-dominios.mjs; nao edite a mao) -->

### Rotas nos sitemaps

| Rota | .com.br (pt-BR) | .com (en) | hreflang declarado |
|---|---|---|---|
| `/` | sim | sim | en ↔ pt-BR |
| `/assinatura` | sim | sim | en ↔ pt-BR |
| `/contato` | sim | sim | en ↔ pt-BR |
| `/curso/br` | — | sim | — |
| `/curso/br/dia/1` | — | sim | — |
| `/curso/de` | sim | sim | en ↔ pt-BR |
| `/curso/de/dia/1` | sim | sim | en ↔ pt-BR |
| `/curso/en` | sim | — | — |
| `/curso/en/dia/1` | sim | — | — |
| `/curso/es` | sim | sim | en ↔ pt-BR |
| `/curso/es/dia/1` | sim | sim | en ↔ pt-BR |
| `/curso/fr` | sim | sim | en ↔ pt-BR |
| `/curso/fr/dia/1` | sim | sim | en ↔ pt-BR |
| `/curso/it` | sim | — | — |
| `/curso/it/dia/1` | sim | — | — |
| `/curso/ru` | sim | sim | en ↔ pt-BR |
| `/curso/ru/dia/1` | sim | sim | en ↔ pt-BR |
| `/cursos` | sim | sim | en ↔ pt-BR |
| `/ex-alunos-udemy` | sim | — | — |
| `/gramatica` | sim | sim | en ↔ pt-BR |
| `/gramatica/br` | — | sim | — |
| `/gramatica/de` | sim | sim | en ↔ pt-BR |
| `/gramatica/de/der-die-das` | sim | — | — |
| `/gramatica/en` | sim | — | — |
| `/gramatica/en/present-perfect` | sim | — | — |
| `/gramatica/es` | sim | sim | en ↔ pt-BR |
| `/gramatica/es/falsos-amigos` | sim | — | — |
| `/gramatica/fr` | sim | sim | en ↔ pt-BR |
| `/gramatica/it` | sim | — | — |
| `/gramatica/ru` | sim | sim | en ↔ pt-BR |
| `/livros` | sim | sim | en ↔ pt-BR |
| `/livros/br` | — | sim | — |
| `/livros/br/capitulo/1` | — | sim | — |
| `/livros/br/capitulo/2` | — | sim | — |
| `/livros/de` | sim | — | — |
| `/livros/de/capitulo/1` | sim | — | — |
| `/livros/de/capitulo/2` | sim | — | — |
| `/livros/en` | sim | — | — |
| `/livros/en/capitulo/1` | sim | — | — |
| `/livros/en/capitulo/2` | sim | — | — |
| `/livros/es` | sim | — | — |
| `/livros/es/capitulo/1` | sim | — | — |
| `/livros/es/capitulo/2` | sim | — | — |
| `/livros/fr` | sim | — | — |
| `/livros/fr/capitulo/1` | sim | — | — |
| `/livros/fr/capitulo/2` | sim | — | — |
| `/livros/it` | sim | — | — |
| `/livros/it/capitulo/1` | sim | — | — |
| `/livros/it/capitulo/2` | sim | — | — |
| `/livros/ru` | sim | — | — |
| `/livros/ru/capitulo/1` | sim | — | — |
| `/livros/ru/capitulo/2` | sim | — | — |
| `/materiais-gratuitos` | sim | sim | en ↔ pt-BR |
| `/materiais-gratuitos/alfabeto-alemao` | sim | — | — |
| `/materiais-gratuitos/alfabeto-espanhol` | sim | — | — |
| `/materiais-gratuitos/alfabeto-frances` | sim | — | — |
| `/materiais-gratuitos/alfabeto-italiano` | sim | — | — |
| `/materiais-gratuitos/alfabeto-russo` | sim | — | — |
| `/por-que-linvuu` | sim | sim | en ↔ pt-BR |
| `/privacidade` | sim | sim | en ↔ pt-BR |
| `/russo-online` | sim | sim | en ↔ pt-BR |
| `/sobre` | sim | sim | en ↔ pt-BR |
| `/termos` | sim | sim | en ↔ pt-BR |

### Cobertura de explicação por curso

| Curso | Sessões | Explicadas em português | Explicadas em inglês | Hub indexável no .com |
|---|---|---|---|---|
| br | 248 | — | 248/248 | sim |
| de | 288 | 288/288 | 288/288 | sim |
| en | 248 | 248/248 | 0/248 | não |
| es | 248 | 248/248 | 248/248 | sim |
| fr | 248 | 248/248 | 248/248 | sim |
| it | 248 | 248/248 | 8/248 | não |
| ru | 312 | 312/312 | 312/312 | sim |

<!-- MATRIZ:FIM -->

## A auditoria (`npm run audit:rotas-dominios`)

Sobe o servidor de produção local (precisa de `dist/`, ou seja, `npm run build` antes) e lê os dois domínios pelo Host:

1. **Sitemaps:** toda URL responde 200, está no domínio certo, sem duplicata, sem `noindex`.
2. **Canonical e hreflang:** canonical é a própria URL; o hreflang do HTML é idêntico ao do sitemap; todo alternado existe no outro sitemap e volta (reciprocidade); `x-default` presente.
3. **Órfãs:** rastreio com `linkinator` a partir de `/` em cada domínio; toda URL do sitemap precisa ser alcançada por link interno; link quebrado interno reprova.
4. **Idioma:** `<html lang>` bate com o domínio e o texto visível não mistura português/inglês (palavras-função de cada língua; páginas de ensino do idioma em `ISENTAS_IDIOMA` no script).
5. **Mapa:** a matriz deste arquivo precisa ser igual à gerada agora.

Sai com código 1 em qualquer falha. Medido em 18/11/2026 sobre o build local: 54 URLs no .com.br e 25 no .com, 0 falhas.
