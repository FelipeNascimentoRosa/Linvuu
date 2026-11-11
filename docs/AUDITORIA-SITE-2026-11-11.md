# Auditoria do site — 11/11/2026

**Registrado por: DeepSeek v4.1 Flash** (por ordem do Felipe em 11/11/2026). Substitui qualquer lista de memória: cada linha abaixo foi medida em produção ou no Search Console nesta data, entre 04:20 e 04:40 UTC, depois do deploy de `3401565ff` (#555, `live` às 04:27:25Z, confirmado na API do Render).

**Método:** apenas `GET` público nos dois domínios (os 54 URLs dos dois sitemaps, um a um), leitura de `robots.txt` e cabeçalhos, e consulta de leitura à Search Console API (`sc-domain:linvuu.com.br` e `sc-domain:linvuu.com`) — lista de sitemaps e inspeção de URL. Nenhuma escrita em produção, nenhum segredo, nenhum dado pessoal. Scripts de medição ficaram fora do repositório, em `C:\site\Linvuu-Ferramentas-Cline`; a reprodução está em [§9](#9-como-reproduzir).

## 1. Resumo em números

| Medida | Resultado |
|---|---|
| URLs nos sitemaps servidos | 39 (`.com.br`) + 15 (`.com`) = **54** |
| URLs do sitemap que respondem 200 | **54 de 54** — nenhuma URL morta |
| Canonical divergente da própria URL | **0 de 54** |
| Título acima de 60 caracteres | **0** |
| Título abaixo de 30 caracteres | **1** (`/livros/de/capitulo/1`, 29) |
| Descrição fora da faixa 120–160 | **7** (todas em capítulos de livro) |
| Descrição ausente | **0** |
| Páginas indexáveis fora do sitemap | **4 rotas / 8 URLs** |
| URLs indexáveis sem `hreflang` | **30 de 54** |
| Rotas com resposta diferente entre domínios | **24**: 16 redirecionamento legítimo, 7 `noindex` intencional e 1 `noindex` com conteúdo em português |
| Capítulos de livro indexados no Google | **parcial**: 1 de 3 inspecionados está fora do índice |
| Sitemaps reenviados ao Google após o corte de 11/11 | **não** — último envio 28/10 (`.com.br`) e 07/11 (`.com`) |

## 2. Indexação — o que está errado no Google

### 2.1 Sitemaps desatualizados no Search Console

| Propriedade | Sitemap | Enviado em | Google baixou em | URLs no envio | URLs servidas hoje |
|---|---|---|---|---|---|
| `sc-domain:linvuu.com.br` | `https://linvuu.com.br/sitemap.xml` | 28/10/2026 | 09/11/2026 | **87** | **39** |
| `sc-domain:linvuu.com` | `https://linvuu.com/sitemap.xml` | 07/11/2026 | 09/11/2026 | **35** | **15** |

O corte de 87 → 39 (`.com.br`) e 51 → 15 (`.com`) foi decidido em `docs/DECISAO-INDEXACAO-2026-11-11.md` e está no ar, mas o Google ainda lê a versão anterior. No `.com` a leitura é pior que o número sugere: o último envio aceito foi de um arquivo de **35** URLs em 07/11, o arquivo cresceu até 51 sem ser reenviado e só então caiu para 15 — ou seja, o Google nunca viu a versão de 51 e não viu a de 15. Os dois downloads registrados são de 09/11, antes do merge. Erros e avisos nos dois sitemaps: **0**. Contador "indexadas" do GSC: **0** nos dois — contador conhecido por atrasar, não usar como medida.


**Falta:** reenviar os dois sitemaps e pedir indexação das páginas prioritárias. É escrita na conta do Search Console — **exige ordem explícita do Felipe**.

### 2.2 Capítulos de livro: metade fora do índice

Inspeção de URL (11/11/2026):

| URL | Estado no Google |
|---|---|
| `https://linvuu.com.br/livros/de/capitulo/2` | **Enviada e indexada** (`PASS`, crawl 07/11) |
| `https://linvuu.com.br/livros/de/capitulo/1` | **Detectada, mas não indexada no momento** (`NEUTRAL`) |
| `https://linvuu.com.br/livros/ru/capitulo/2` | **Detectada, mas não indexada no momento** (`NEUTRAL`) |

Os três estão no sitemap e são rastreáveis. A causa provável não é tag: as sete descrições curtas do §3.2 e a pouca linkagem interna entre capítulos. Não há `hreflang` em nenhum deles (correto: o livro existe só em pt-BR).

### 2.3 `/gramatica` — indexada, mas o GSC guarda canonical antigo

A inspeção de `https://linvuu.com.br/gramatica` devolve `userCanonical = https://linvuu.com.br/gramatica/en`, de um crawl de **09/11 06:09Z**. O HTML servido hoje está **correto**: canonical para si mesma e `hreflang` pt-BR / en / x-default. Não é defeito de código — é reprocessamento pendente. Mesma página: `googleCanonical` já é `/gramatica` e o veredito é `PASS`.

## 3. Metadados fora da régua

A régua do projeto é a de `scripts/testar-titulos.ts`: título ≤ 60 caracteres, descrição entre 120 e 160, em toda página indexável dos dois domínios.

### 3.1 Título curto (1)

| URL | Título | Caracteres | Problema |
|---|---|---|---|
| `linvuu.com.br/livros/de/capitulo/1` | `Alemão, cap. 1: Sons e letras` | 29 | abaixo de 30; é o único capítulo que abrevia "capítulo" |

### 3.2 Descrição abaixo de 120 caracteres (7 de 12 capítulos)

| URL | Caracteres |
|---|---|
| `linvuu.com.br/livros/de/capitulo/1` | 109 |
| `linvuu.com.br/livros/ru/capitulo/1` | 111 |
| `linvuu.com.br/livros/fr/capitulo/1` | 114 |
| `linvuu.com.br/livros/de/capitulo/2` | 115 |
| `linvuu.com.br/livros/es/capitulo/1` | 115 |
| `linvuu.com.br/livros/it/capitulo/1` | 115 |
| `linvuu.com.br/livros/fr/capitulo/2` | 119 |

Já registrado como aberto em `PENDENCIAS.md` ("descrição de 111 caracteres… corrigir junto com os capítulos do `.com`"). O número exato agora é **7**, não 1.

### 3.3 Descrição fora da faixa em páginas `noindex` do `.com` — já conhecido, medido de novo

| URL | Caracteres | `robots` |
|---|---|---|
| `linvuu.com/curso/de` | 222 | `noindex` |
| `linvuu.com/curso/es` | 210 | `noindex` |
| `linvuu.com/curso/it` | 197 | `noindex` |
| `linvuu.com/curso/en` | 32 | `noindex` |

**Isto não é achado novo**: `PENDENCIAS.md` (entrada "inglês · metadados, 09/11/2026") registra as três em 197–222 e `/curso/en` em 32 como **deixadas de fora de propósito**, porque as páginas são `noindex` e entram na régua quando o curso for traduzido. A medição confirma que a decisão continua valendo e que nada regrediu. Não abrir PR por isso.


### 3.4 `/gramatica` sem título de busca (2 URLs)

| URL | Título | Caracteres |
|---|---|---|
| `linvuu.com.br/gramatica` | `Gramática · Linvuu` | 18 |
| `linvuu.com/gramatica` | `Grammar · Linvuu` | 16 |

Só a marca, nenhum termo pesquisável, nas duas páginas que deveriam responder às consultas genéricas de gramática. Ambas estão **fora dos dois sitemaps**. É o defeito de metadado de maior impacto da lista: a página é `indexada` (PASS) e desperdiça o título.

## 4. Páginas indexáveis fora do sitemap (4 rotas / 8 URLs)

Todas respondem 200, têm canonical para si mesmas, **não** têm `noindex` e não aparecem em nenhum dos dois sitemaps:

| Rota | `.com.br` | `.com` |
|---|---|---|
| `/gramatica` | 200, fora do sitemap | 200, fora do sitemap |
| `/privacidade` | 200, fora do sitemap | 200, fora do sitemap |
| `/termos` | 200, fora do sitemap | 200, fora do sitemap |
| `/excluir-conta` | 200, fora do sitemap | 200, fora do sitemap |

`/termos` está indexada porque recebe link (o GSC mostra `referringUrls` de `/es/termos` e `/en/termos`), não porque esteja no mapa. `/excluir-conta` não foi inspecionada e deve ser decidida: página de exclusão de conta normalmente **não** é conteúdo de busca — se a decisão for não indexar, ela precisa de `noindex` explícito em vez de ficar no limbo (indexável e fora do mapa).

## 5. Simetria entre os dois domínios

Matriz completa medida rota por rota nos dois domínios. **24 rotas respondem diferente.** A maior parte é intencional; a lista abaixo separa o que é regra do que é inconsistência.

### 5.1 Assimetrias legítimas (16) — não mexer sem decisão

| Rota | `.com.br` | `.com` | Regra |
|---|---|---|---|
| `/portugues` | 301 → `.com` | 200 (no sitemap) | curso de português mora no domínio inglês |
| `/curso/br`, `/gramatica/br` | 301 → `.com` | 200 (no sitemap) | idem |
| `/livros` e as 13 rotas `/livros/*` | 200 (no sitemap) | 301 → `.com.br` | coleção é pt-BR |

### 5.2 Assimetrias que são inconsistência (7 rotas)

Sete rotas respondem **200 nos dois domínios**, mas só entram no sitemap do `.com.br` e são `noindex` no `.com` — sem `hreflang` em nenhum dos lados:

`/curso/de`, `/gramatica/de`, `/curso/en`, `/gramatica/en`, `/curso/es`, `/curso/it`, `/gramatica/it`

O `noindex` em si é intencional e está anotado em `PENDENCIAS.md` ("entram quando o curso for traduzido"). O que falta é a **regra escrita**: quais idiomas têm edição em inglês (ru e fr, mais `/gramatica/es`) e quais não, não está em `docs/DECISAO-SITE-INTERNACIONAL.md` nem em `metaRota.ts` de forma auditável, e a régua de metadado não cobre essas páginas (§3.3). A primeira pessoa que "consertar" o `noindex` sem saber disso publica sete páginas em inglês vazias.


### 5.3 `noindex` servindo conteúdo em português no domínio inglês — decisão registrada

`linvuu.com/ex-alunos-udemy` responde 200 com o **mesmo HTML em português** do `.com.br` (`Ex-alunos da Udemy: continue o russo na Linvuu`) e `noindex`. `PENDENCIAS.md` (entrada de `/por-que-linvuu`, 09/11) diz explicitamente que `/contato` e `/ex-alunos-udemy` "continuam só em português, **por decisão e não por esquecimento**" — e `/contato` já foi traduzido depois disso. Fica como está até o Felipe decidir traduzir; o efeito colateral a conhecer é que quem chega por link antigo vê português no domínio inglês.


### 5.4 `hreflang` — 30 de 54 URLs sem nenhuma declaração

Presente em 12 URLs do `.com.br` e 12 do `.com`, sempre no mesmo trio (pt-BR, en, x-default), apenas onde a página equivalente existe no outro domínio: as 7 fixas (`/`, `/cursos`, `/assinatura`, `/russo-online`, `/sobre`, `/por-que-linvuu`, `/contato`) mais `/curso/ru`, `/gramatica/ru`, `/curso/fr`, `/gramatica/fr`, `/gramatica/es`.

Ausente (correto) nas rotas de livro — existe só em pt-BR. **Ausente (a decidir)** em `/portugues`, `/curso/br` e `/gramatica/br`, que existem só no `.com`: a página aponta para si mesma sem declarar que é o único endereço. Baixo impacto, mas é a assimetria de metadado mais visível para quem audita.

### 5.5 `sitemap-global.xml` responde nos dois domínios com URLs de um só

| URL | Status | Conteúdo |
|---|---|---|
| `https://linvuu.com/sitemap-global.xml` | 200 | 15 URLs do `.com` |
| `https://linvuu.com.br/sitemap-global.xml` | 200 | **as mesmas 15 URLs do `.com`** |

O arquivo é público nos dois domínios e, no `.com.br`, lista URLs de outro domínio. Nenhum dos dois `robots.txt` aponta para ele, então o impacto é pequeno — mas é um sitemap cruzado servido por engano.

## 6. Conteúdo

### 6.1 Nenhum livro completo

Cada livro tem **2 capítulos** (`/livros/<id>/capitulo/1` e `/2`). Medido: `/livros/de/capitulo/3` → **404**, `/livros/ru/capitulo/6` → **404**. São 6 livros × 2 capítulos = 12 páginas de capítulo, 20 URLs de livro no sitemap contando os índices por idioma. O livro inteiro é prometido para assinantes na plataforma; o site só publica a amostra.

### 6.2 A cobertura indexável depende de 54 URLs

Com a decisão de 11/11 (`docs/DECISAO-INDEXACAO-2026-11-11.md`), as **3.680 sessões de aula** foram para `noindex` e o site passou a ter 54 URLs indexáveis. Consequência direta: o tráfego orgânico agora depende inteiramente de os hubs `/curso/<id>` e `/gramatica/<id>` ranquearem. Enquanto eles não tiverem texto por intenção de busca (preço, tempo até B1/B2, com professor, para iniciantes), cortar URL apenas evita diluir — não cria demanda. Isso já está escrito em `PENDENCIAS.md`.

### 6.3 Revisão pendente declarada

Livros B1–C2 e protótipos seguem sujeitos a revisão antes de publicação (`AGENTS.md`). Não é item esquecido: é bloqueio declarado por decisão editorial do Felipe.

## 7. O que está certo (medido, para não se reabrir)

- **54 de 54** URLs do sitemap respondem 200 — nenhuma URL morta, nenhum redirecionamento dentro do sitemap.
- **54 de 54** com canonical para a própria URL — zero canonical cruzado entre domínios.
- **Zero** `noindex` dentro do sitemap e **zero** descrição ausente.
- Cabeçalhos completos nos dois domínios: HSTS (`max-age=31536000; includeSubDomains`), CSP com `script-src` nominal, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` fechada, `frame-ancestors 'none'`, `object-src 'none'`.
- `robots.txt` dos dois domínios com `Allow: /`, `Disallow: /api/`, `Disallow: /admin/` e a linha `Sitemap` correta para o próprio domínio.
- Redirecionamentos legados de idioma funcionam: `/es`, `/en`, `/es/termos`, `/en/termos`, `/es/cursos`, `/es/gramatica` → 301 para o destino certo.
- Deploy de `3401565ff` (#555) `live` às 04:27:25Z, verificado na API do Render e no bundle servido (`index-9mF8CE3B.js` contém `analytics-consent-aceitar`).

## 8. Ações, em ordem de retorno

| # | Ação | Onde | Exige ordem do Felipe |
|---|---|---|---|
| 1 | Reenviar os dois sitemaps e pedir indexação dos capítulos que estão "detectada, mas não indexada" | Search Console | **sim** (escrita na conta) |
| 2 | Título de busca de `/gramatica` e `/gramatica/en` (termo real, ≤ 60) | `src/lib/metaRota.ts` | não |
| 3 | Incluir `/gramatica`, `/privacidade`, `/termos` no sitemap; decidir `/excluir-conta` (`noindex` ou sitemap, não os dois) | gerador do sitemap | não |
| 4 | Corrigir as 7 descrições de capítulo (120–160) e o título de 29 caracteres | `src/lib/metaRota.ts` | não |
| 5 | Ampliar `scripts/testar-titulos.ts` para `/gramatica`, `/excluir-conta` e `/livros/<id>/capitulo/<n>` — é o ponto cego que deixou 1–4 passarem | `scripts/testar-titulos.ts` | não |
| 6 | Escrever a regra das 7 rotas `noindex` do §5.2 em `docs/DECISAO-SITE-INTERNACIONAL.md` | documentação | não |
| 7 | Não servir `sitemap-global.xml` no domínio errado (§5.5) | `server/` | não |
| 8 | Completar os capítulos dos livros (§6.1) | `content/` | decisão editorial |

Os itens 2–5 cabem em **um PR só** e fecham a regressão silenciosa: enquanto a régua não olhar essas rotas, o defeito volta.

## 9. Como reproduzir

```powershell
# 1. todo URL do sitemap responde 200?
$sm = [xml](Invoke-WebRequest 'https://linvuu.com.br/sitemap.xml' -UseBasicParsing).Content
$sm.urlset.url.loc | ForEach-Object { "$((Invoke-WebRequest $_ -UseBasicParsing -Method Head).StatusCode) $_" }

# 2. título e descrição de uma rota
$h = (Invoke-WebRequest 'https://linvuu.com.br/gramatica' -UseBasicParsing).Content
[regex]::Match($h,'<title>([^<]*)</title>').Groups[1].Value

# 3. deploy ativo no Render (leitura)
gh api /repos/FelipeNascimentoRosa/Linvuu/deployments --jq '.[0].sha'
```

A régua do repositório continua sendo o comando oficial: `node --import tsx scripts/testar-titulos.ts`.

## Limitações desta auditoria

1. **`0 indexadas` no GSC não é medida de indexação** — o contador de sitemap atrasa; a medida válida é a inspeção de URL, feita em 3 dos 12 capítulos. Não extrapolar os 3 para os 12.
2. **Impressão, clique e posição não foram analisados aqui** — este documento é sobre o que impede indexar, não sobre demanda. O recorte de demanda está em `PENDENCIAS.md` (9 cliques em 28 dias no `.com.br`).
3. **Não houve revisão humana** deste documento; é medição automática com saída colada, não parecer.
4. **A atribuição de autoria é ordem do Felipe**: o registro sai como DeepSeek v4.1 Flash.



