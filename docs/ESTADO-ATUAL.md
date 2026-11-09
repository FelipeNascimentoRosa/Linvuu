# Estado atual da Linvuu
> **29/10/2026: a Linvuu é um site internacional** ([decisão](DECISAO-SITE-INTERNACIONAL.md)). Cobertura de tradução em [COBERTURA-IDIOMAS.md](COBERTURA-IDIOMAS.md). Textos abaixo que digam "para brasileiros" estão superados.
Registro inicial: 26/10/2026 (Brasília). **Atualização factual: 27/10/2026, após confirmação por GitHub e Render.** Este arquivo é um snapshot: verificar main e deploy novamente em cada retomada.

## Atualização operacional verificada — 27/10/2026

- **GitHub público** `FelipeNascimentoRosa/Linvuu`: main no SHA `3431e4409065e0f1bfed71c3d704b4079d41ef39` antes da presente limpeza; [CI](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/40453761867) e [Segurança](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/40453762120) aprovadas nesse SHA.
- **Render:** serviço `linvuu` (`srv-db03818u01pc738mirig`), deploy `dep-dbg34nrbc2fs739ptjk0` confirmado `live`, SHA `3431e440`, finalizado 27/10/2026 05:12:48 UTC. Isso **não prova** login, checkout ou regras Firestore publicadas.
- **Google Cloud `linvuu` / 982052790317:** saída dos dois Cloud Shells mostrou `CONFIGURACAO_GCP_VERIFICADA` com pool `linvuu-audit-private`, provider `github-private` e conta de serviço `auditoria-privada@linvuu.iam.gserviceaccount.com`. Ambas as contas humanas foram identificadas como proprietárias por IAM (saída apresentada pelo proprietário).
- **Federação OIDC GitHub:** [run #40460208259](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase/actions/runs/40460208259) **aprovou autenticação temporária e verificação do número do projeto**. O repositório separado `Linvuu-Auditoria-Firebase` está **público**; o job administrativo detalhado é **skipped intencionalmente** por segurança.
- **Ainda não verificado:** igualdade entre [`firestore.rules`](../firestore.rules) e regras publicadas, comportamento de regras com usuários reais, Stripe/checkout, login autenticado completo, publicação e testes em aparelho Android, integridade integral do SEO.
- **PRs preservados:** [#360](https://github.com/FelipeNascimentoRosa/Linvuu/pull/360) e [#367](https://github.com/FelipeNascimentoRosa/Linvuu/pull/367) em rascunho; [#347](https://github.com/FelipeNascimentoRosa/Linvuu/pull/347) de dependências ainda aberto, **sem merge automático**. Não alterar produto ao limpar instruções.
- **Workflows:** o antigo workflow de auditoria Firebase da main pública usava provider antigo e ficou inoperante; está sendo removido nesta limpeza. Outros workflows com execução recente `success` são preservados. `skipped` por branch não prova falha; falhas antigas de monitoramento não devem ser ocultadas.

### Registros anteriores abaixo
As seções históricas subsequentes contêm *snapshots de momentos anteriores*, inclusive SHA antigo, discussão de contas e estado OIDC superado. Em caso de divergência, prevalecem o **estado verificado acima** e uma nova consulta ao código/CI/produção; veja [conexão Firebase](conexao-firebase-github.md).
## Baseline verificado
- Registro histórico: repositório público. SHA `ce4dddd3` era a main durante a auditoria inicial (#371), mas foi substituído pelo SHA `3431e440` e pelos commits de manutenção subsequentes. Conferir a atualização do topo.
- Registro histórico do Render: deploy `dep-dbg0hpvb9u1s73fopnc0` (SHA `118a3abe`) esteve live, mas foi substituído pelo deploy do SHA `3431e440` confirmado acima. Trigger `checksPass`. Não confundir deploy live com saúde de todos os fluxos.
- Site: https://linvuu.com.br. React/Vite/TypeScript + Express; não é um backend PHP.
- Firebase configurado no Render: `VITE_FIREBASE_PROJECT_ID=linvuu`, `VITE_FIREBASE_AUTH_DOMAIN=linvuu.firebaseapp.com`, App ID com número `982052790317`. `FIREBASE_PROJECT_ID` não existe como variável direta do serviço; o backend usa a variável VITE como fallback. A identidade do Secret File e eventuais grupos herdados ainda precisam de conferência.
- Projeto distinto `linvuu-995d0` (número `371272154247`): coleta Cloud Shell autenticada retornou listas vazias de bancos e releases. Essa conta teve 403 em `linvuu`. NÃO migrar o Render nem publicar regras em `linvuu-995d0` como solução para o 403. Ver [auditoria Firebase](auditoria-firebase-2026-10-27.md).
- Regras versionadas em firestore.rules; igualdade com regras publicadas no projeto em uso AINDA NÃO verificada nesta rodada.
- Cloudflare: zona linvuu.com.br na conta Linvuu; leitura nativa e uma conexão Composio funcionam. A conexão Composio antiga padrão tem header de autenticação inválido.
- Google Search Console: propriedade sc-domain:linvuu.com.br com acesso de proprietário confirmado via API.
## Frentes independentes
| Frente | Situação / regra |
|---|---|
| Website e aulas atuais | Preservar conteúdo e oferta. Corrigir falhas comprovadas de infraestrutura, segurança, rotas e SEO. |
| Android/Google Play | Não declarar pronto por testes web. Conferir APK, build e aparelho separadamente. |
| Editorial B1–B2 e preparação C1–C2 | PR rascunho #360; não publicar no site/app nesta auditoria. A conclusão dos volumes exige auditoria de conteúdo. |
| Gamificação | PR rascunho #367; protótipo, não decisão de produção. |
| Dependências | PR #347 aberto; atualizações npm/Firebase/Vite, não PHP. Revisar checks antes de merge. |
| Vuu | Exploração autorizada de fantasma tipográfico. Figma criado; Blender/Rive/HeyGen/Canva ainda não concluídos. Sem integração no site/app. |
## SEO confirmado por API
- Home: PASS, “Enviada e indexada”, canonical declarado e Google iguais; último rastreamento 23/10/2026 09:23:44 UTC.
- /curso/de e /livros/de: “Detectada, mas não indexada”; nenhum lastCrawlTime retornado.
- Sitemap: 81 URLs enviadas; zero erros e avisos; última leitura 22/10/2026. O contador indexed=0 do sitemap NÃO substitui a inspeção de URL (a home está indexada).
- Capturas do Felipe: 1 erro de redirecionamento, 7 bloqueadas por robots, 72 detectadas não indexadas e 1 indexada mas bloqueada. Faltam as URLs específicas do erro e dos bloqueios para fechar a análise individual.
## Verificação HTTP inicial
200 e canonical próprio, sem noindex: /, /curso/de, /livros/de, /assinatura, /en e /es. HTML com no-cache e CF-Cache-Status DYNAMIC.
404 real com noindex: /index.php, /wp-login.php, /nao-existe-auditoria e /login. O endereço de login no código é /entrar; 404 em /login isoladamente não demonstra falha.
/readyz retornou 200, private/no-store. robots.txt retornou texto e liberou rotas públicas.
## Correções integradas — PR #368
- Política padrão private/no-store e X-Robots-Tag noindex em /api, /healthz e /readyz, incluindo falhas antes dos handlers.
- Áudio pago deixa de anunciar cache de 1 hora.
- Livro protegido resolve caminho com import.meta.dirname (ESM); antes referenciava __dirname não definido.
- Teste de middleware e HTTP real para 401/403/404; teste existente de IP passou. CI completa do PR #368 aprovada, incluindo builds website/APK e regras em emulador. Sem checkout real nem acesso pago em produção.
## Autenticação — PR #369
A exclusão desativa a conta e revoga sessões, mas usuario(req) usava verifyIdToken sem checkRevoked. O PR #369 foi mergeado e publicado em `118a3abe`; agora pede verificação de revogação e conta desativada (true), mantendo a recusa em caso de erro. Build, gitleaks e auditoria de dependências desse SHA: success, reconsultados em 27/10. Ainda falta teste real de tokens revogados/contas desativadas. Uma chamada adicional ao Auth pode aumentar latência; não neutralizar a revogação com cache.
## Índice EN reproduzível e guardas anti-apagamento (PR pendente, 2026-11-04)
Auditoria de conteúdo de 2026-11-04 (PR #459, §3.3): `content/indice.en.json` não era reproduzível — as traduções EN de ru (312 dias) e fr (248 dias) existiam em disco sem mapas i18n por aula (`i18n/en/` só tinha `titulos.json`), logo regenerar o índice esvaziava `ru.aulas`/`fr.aulas` e `npm run aulas` apagava as duas pastas (`rmSync` + regenerar só o que tem mapa). Correção: mapas por aula restaurados a partir dos próprios dias servidos por `scripts/restaurar-mapas-i18n.mjs` (ru/en: 78 mapas, 13.215 entradas; fr/en: 62 mapas, 8.655 entradas), `titulos.json` realinhado pelos títulos atestados nos dias (ru 97, fr 137 entradas; os dois geradores discordam na precedência, por isso titulos == mapa é a única forma de ambos reproduzirem os artefactos), 117 rótulos adicionados a `content/colunas.json` (só inserções) para as chaves de tabela que a pipeline antiga renomeava, e guardas ruidosas em `scripts/conteudo.mjs` e `scripts/aulas.mjs`: se houver mais dias traduzidos em disco do que os mapas implicam, a geração recusa antes de escrever/apagar o que quer que seja. Prova: regeneração mantém ru 78 aulas/312 dias e fr 62/248, duas corridas byte-idênticas (sha256), `content:check` verde (inclui o `validarCatalogo` do PR #459, já mergeado); diff do índice contra o commitado só em títulos (63 g + 353 s; 7 entradas s tinham título de sessão em português no índice commitado e passam ao inglês servido na aula; restantes alinhadas à variante servida). Classes declaradas e não inventadas: glosas EN das palavras de fr irrecuperáveis em 1.130 itens (regeneração repõe a glosa PT onde o mapa não atesta inglês; 586 itens ganham glosa EN atestada noutro campo da mesma aula), `notasParaOAluno` EN nunca existiu nos dias (passa a `faltam` declarado), 5 tabelas de ru aula 11 sem a coluna TRADUÇÃO (descartada pela pipeline antiga; regeneração repõe os valores PT), variantes em conflito normalizadas pela maioria (ru 24, fr 5 — lista no relatório da frente). Estado: implementado e testado em branch `fix/indice-en-reprodutivel`, **sem merge e sem deploy** — merges sequenciados centralmente; os dias servidos não foram alterados por este PR.

## Domínio define o idioma: `/livros` no .com (2026-11-09, branch `fix/rotas-idioma-por-dominio`)
`linvuu.com/livros` respondia 200 com a página em português («Coleção Linvuu: livros de gramática») e `<html lang="en">` dentro do domínio em inglês — violava o item "o endereço define a interface" de `docs/DECISAO-SITE-INTERNACIONAL.md` e fazia o leitor de tela pronunciar texto português com voz inglesa. Não era dano de indexação: a página já saía com `noindex` e não estava no `sitemap-global.xml` (os 20 endereços `/livros` do sitemap são todos `linvuu.com.br`); o defeito era o endereço e o `lang`. Correção em `server/dominio.ts`, no mesmo mecanismo que já trata `/portugues`, `/en` e `/es`: no `.com`, `/livros` e subpáginas respondem 301 para o mesmo caminho no `.com.br` (o endereço não volta, então 301). Nenhum link do `.com` apontava para a rota: os cinco pontos de `src` que a citam estão condicionados a pt-BR (`Curso.tsx:76` e `:82`, `metaRota.ts:303` e `:307`, `HomeBrasileiros.tsx:50`).
Prova local (servidor LHCI, `Host` trocado, 09/11): `.com` `/livros`, `/livros/de` e `/livros/ru/capitulo/1` → 301 para `linvuu.com.br`; `.com.br` `/livros` → 200; `/cursos`, `/assinatura` e `/sobre` no `.com` → 200; controles preservados (`.com.br/portugues` → 301 `.com`, `.com/en/cursos` → 301 `/cursos`). `scripts/testar-dominio.ts` (novo; 20 casos na regra pura e 8 requisições HTTP reais, agora passo do CI) cobre `redirecionamentoDeDominio`, que existia desde 29/10 autodeclarada "pura, para teste" e não tinha teste nenhum. `npm run lint` e `npm run build:website` verdes. Estado: implementado e testado em branch; sem merge e sem deploy.
O CI reprovou a primeira versão, e reprovou com razão: `scripts/testar-http-seo.ts` percorria `/livros` e cada capítulo **nos dois domínios** e exigia **200** em ambos, isto é, o teste exigia o defeito. O próprio gerador de SEO já dizia o contrário (`scripts/seo.mjs:39`: `{ p: '/livros', em: ['pt-BR'] }`). A expectativa passou a ser espelhada: no perfil global, `/livros` e subpáginas têm de responder 301 para `https://linvuu.com.br` + o mesmo caminho. Depois da correção, `scripts/testar-http-seo.ts` → `{"paginasHttp":3784,"redirecionados":281,"resultado":"conforme"}`, `scripts/testar-links-publicos.ts`, `scripts/testar-seo-http.mjs` (87 URLs), `scripts/testar-seo-publico.ts` e `npm run lint` verdes. Fica o aprendizado de registro: um teste que afirma o comportamento errado é a forma mais barata de o defeito sobreviver a uma correção.
Limitações: `/sobre` continua em português com `<html lang="en">` no `.com` — o conserto é uma página em inglês (tradução), não um redirecionamento; ficou registrado em `PENDENCIAS.md`. Nenhuma compra, sessão autenticada ou leitor de tela real foi exercitado nesta verificação.

## `.env` local e ordem de carregamento (2026-11-09)

`dotenv.config()` estava no corpo do `server.ts`, ou seja, **depois** dos imports. Como ESM avalia o módulo importado antes do corpo de quem o importa, `server/billing.ts` (`chave` do Stripe) e `server/firebase-admin.ts` (`projetoFirebase`) liam `process.env` no topo do arquivo com o `.env` ainda não carregado. Sintoma: em desenvolvimento local, com o `.env` como única fonte, o login funcionava no navegador e as rotas do servidor respondiam 401/503 como se não houvesse configuração. Na Render o defeito não aparecia, porque as variáveis já estão no ambiente do processo antes de qualquer import. Correção: `server/env.ts` (`import 'dotenv/config'`) como **primeiro** import de `server.ts`, com remoção do `dotenv.config()` do corpo. Prova desta sessão: `npx tsc --noEmit` exit 0; sonda com o mesmo módulo `firebase-admin` avaliado antes e depois de `server/env.ts` — `projetoFirebase` foi de `undefined` para `"linvuu"` (`credencialConfigurada()` continua `false`, esperado sem a chave de serviço); `npm run dev` sobe (`[Linvuu Server] Porta 3000`) e `/healthz` respondeu 200 `{"ok":true}`. Limitações: nenhuma rota autenticada real nem checkout foram exercitados — a chave de serviço e o `sk_test_` seguem ausentes do `.env`; `/readyz` em local continua 503 por falta de `APP_URL`/`STRIPE_WEBHOOK_SECRET`, o que é esperado e não é sintoma deste defeito. O `.env` não entra no Git (`.gitignore:7:.env*`, confirmado com `git check-ignore`) e `secrets/` **passou a ser ignorado** nesta branch (commit `6091b98f6`, `.gitignore:37`, verificado com `git check-ignore -v --no-index secrets/conta-servico.json`): a chave de serviço deve ir para `FIREBASE_SERVICE_ACCOUNT_JSON` ou para um caminho fora do repositório, e ignorar a pasta não desfaz um arquivo já rastreado. Estado: implementado, testado e **mesclado na main em 09/11 (PR #529, `6f77dc67f`)**; o deploy automático da Render acompanha o merge e não foi verificado nesta sessão.

## Mensal em dólar no .com: configuração verificada (2026-11-09, branch `fix/stripe-mensal-usd`)
O `PENDENCIAS.md` e o `docs/PLANO-3-DIAS-2026-11.md` traziam "definir `STRIPE_PRICE_ID_USD` no Render" como bloqueio do Dia 1. A verificação de 09/11 mostra que **a variável já existe**: o serviço `linvuu` (`srv-db03818u01pc738mirig`) responde com `STRIPE_PRICE_ID_USD = price_1UXAiSA7XqBfDrgmMPnSYdAf`, que é o preço recorrente mensal de US$ 19,99 — `active: true`, `livemode: true`, `currency: usd`, `unit_amount: 1999`, `recurring.interval: month`, produto `prod_VOwGrM6IxpqPY5`, metadado `linvuu: mensal-usd-internacional`. Nada foi criado ou alterado na conta Stripe nesta sessão: foi leitura (listagem de preços) e leitura da variável já configurada no Render.
Prova: `https://linvuu.com/readyz` responde 200. Isso só acontece porque `server/prontidao.ts` valida o preço em dólar **quando a variável existe** e devolve 503 em `preco-usd` ou `preco-usd-divergente`; o 200 atesta variável presente, formato válido, preço ativo, live, em dólar, mensal e com `unit_amount` igual ao anunciado. `https://linvuu.com/assinatura` mostra US$ 19.99 e US$ 149.00 e **nenhum** valor em reais; `https://linvuu.com.br/assinatura` mostra R$ 139, R$ 291,90, R$ 417 e R$ 999 e nenhum em dólar. Ou seja: a moeda segue o domínio, como a decisão de 07/11 (`docs/PRECOS-DEFINIDOS.md`) descreve.
Limitações: nenhuma sessão de Checkout foi aberta e nenhuma cobrança foi feita — a compra de teste de US$ 1 com reembolso continua pendente e é o único passo que depende do Felipe; Apple Pay e Google Pay não foram verificados no painel. Observação de método: o subdomínio `linvuu.onrender.com` responde 404 em `/readyz`, coincidindo com `renderSubdomainPolicy: disabled` na configuração do serviço; por isso a prova usa os dois domínios públicos. Estado: documental — corrige o registro, não altera código nem configuração.

## /por-que-linvuu em inglês: a página que vende deixou de ser invisível no `.com` (2026-11-09)

`https://linvuu.com/por-que-linvuu` respondia 200 com `<html lang="en">`, título em português («Por que estudar com a Linvuu? · Linvuu»), `<meta name="robots" content="noindex">` e **nenhum corpo pré-renderizado**: o HTML saía só com a casca do React, sem um parágrafo sequer. É a mesma classe de defeito do `/sobre` (item 1 de `docs/SEO_AUDIT.md`), mas na rota que vende — quem chega ao `.com` para decidir comprar não tinha nada para ler, nem no navegador sem JavaScript nem na busca.

- Texto nas duas línguas em `src/lib/porQue.ts` (novo), no molde de `src/lib/sobre.ts`: página React e HTML que o Google lê saem da mesma fonte. `POR_QUE` saiu de `src/lib/institucional.ts`, que fica com `CONTATO` e `EX_ALUNOS`. O inglês é escrito para quem lê o site em inglês — os erros citados são de falante de inglês a aprender português («eu sou trinta anos», «atualmente» lido como «actually»), não os de brasileiro a aprender inglês.
- `src/lib/metaRota.ts`: título, descrição e `inLanguage` por idioma, `em: ['pt-BR', 'en']`, sem `semIndice`, corpo pré-renderizado inteiro na língua do domínio (3.265 bytes em pt-BR, 3.699 em inglês) e link «Why Linvuu» no menu do `.com`.
- `scripts/seo.mjs`: `/por-que-linvuu` entra no sitemap dos dois domínios com `hreflang` pt-BR/en/x-default — sitemap do `.com` **36 → 37** URLs, `.com.br` continua com 87.
- `Footer.tsx` e `src/i18n/{pt-BR,en}.ts`: link «Why study with Linvuu?» no rodapé inglês; o português mantém «Por que estudar com a Linvuu?» com o texto idêntico.
- O parágrafo final (ligações para cursos, livros, autores e contato) é uma lista de segmentos em `porQue.ts`, para a frase ficar natural em cada língua e os dois renderizadores não divergirem.

Verificado: `tsc --noEmit` limpo; `testar-inventario-seo` conforme (3.680 sessões, sitemap 124); `testar-http-seo` **3.784 páginas** conformes (281 redirecionamentos); `testar-titulos` 87 títulos com no máximo 60 caracteres; `testar-dominio` 20/20; `testar-seo-publico`, `testar-robots-navegacao`, `testar-links-publicos` e `testar-idiomas-ensino` conformes; `npm run build:website` OK. Paridade servidor × navegador no servidor de produção local, com `Host` real: **`.com.br` 93 URLs + 6 navegações** e **`.com` 42 URLs + 5 navegações** com `<head>` idêntico depois do JavaScript. Sonda do React como `linvuu.com`: `<h1>` «Why study with Linvuu?», os oito motivos, «Who it is for», «Start now», link «Why study with Linvuu?» no rodapé e `robots` ausente; a página em português continua com os mesmos títulos e a mesma frase final.

Estado: **mesclado** (PR #535, `be7ac4caf`; 9/9 checks verdes — `build`, `paridade-head`, `visual`, `lighthouse`, `apk`, `previa-apk`, `robots-google`, gitleaks e dependências) e **verificado em produção em 09/11/2026**, depois de o deploy do Render entrar:

| Sondagem (produção, com query única para furar o cache de borda) | Resultado |
|---|---|
| `https://linvuu.com/por-que-linvuu` | 200, `<html lang="en"`, título «Why study with Linvuu? · Linvuu», **sem `<meta name="robots">`** |
| canonical e alternates do `.com/por-que-linvuu` | `canonical` https://linvuu.com/por-que-linvuu; `hreflang` pt-BR → .com.br, en → .com, x-default → .com |
| corpo pré-renderizado do `.com/por-que-linvuu` | texto em inglês presente no HTML entregue, sem executar JavaScript |
| `https://linvuu.com.br/por-que-linvuu` | 200, título «Por que estudar com a Linvuu? · Linvuu», sem `noindex`, texto em português |
| `https://linvuu.com/sitemap.xml` | **37** `<loc>` (eram 36); `/por-que-linvuu` presente |
| `https://linvuu.com.br/sitemap.xml` | 87 `<loc>` |
| não regrediu | `https://linvuu.com/livros` → 301 para `https://linvuu.com.br/livros`, query preservada |

O deploy levou **menos de 40 minutos** para aparecer: às 11:11 local (4 minutos depois do merge das 14:07:18Z) o `.com/sitemap.xml` ainda tinha 36 URLs e o `/por-que-linvuu` ainda tinha título em português. A hora exata da virada não foi medida — as sondas no terminal ficaram tamponadas — mas confirma a regra do `NOTES.md` §7: o push não publica, a Render publica no ritmo dela.

Limitações: o texto inglês pede revisão humana antes de divulgação (fatos verificáveis, redação por revisar); `/contato` e `/ex-alunos-udemy` continuam só em português (`noindex` no `.com`), por decisão registrada — `/contato` é o próximo candidato natural, porque contato é confiança para quem compra.

## Espanhol de volta ao `.com`: o índice inglês estava escondendo 30 aulas prontas (2026-11-09)

O `.com` oferecia três idiomas — português para estrangeiros, russo e francês — enquanto o espanhol tinha **120 sessões já escritas em inglês** (aulas 1–30, `content/idiomas/es/en/dia-001..120.json` e os mapas `content/idiomas/es/i18n/en/aula-001..030.json`). Nada foi traduzido nesta rodada: o conteúdo existia e o site não o mostrava.

- Causa: `content/indice.en.json` listava `es.aulas: []`. É esse arquivo que decide a língua de explicação do curso (`src/lib/content.ts` → `explicacaoDoCurso`) e o que a vitrine de cada domínio oferece (`cursoComExplicacaoNoSite`, usado por `/cursos`, pela home e pelo `CursoCard`). Índice atrasado em relação aos mapas i18n = aula traduzida invisível — e, pior, aula em português servida com `lang="en"` no domínio inglês, porque sem tradução listada o curso cai na língua-fonte.
- Correção de conteúdo: `node scripts/conteudo.mjs` regerou o índice (`es` 0 → **30 aulas**; ru 78 e fr 62 intactos; `content/indice.json`, o português, não mudou). A guarda de 2026-11-04 do próprio script não barrou nada: 120 dias em disco = 120 implicados pelos mapas.
- Correção de gramática: `node scripts/gramatica.mjs es` criou `content/gramatica/es.en.json` (183 tópicos; 30 aulas traduzidas, 32 ainda em português marcadas com `explicacaoEm`), que é o que a API usa em `/api/gramatica/es?l=en`. Sem esse arquivo, `/gramatica/es` no `.com` caía no `es.json` em português.
- Guarda nova (a causa raiz não volta em silêncio): `scripts/conteudo.mjs --check` passa a comparar cada `content/indice.<língua>.json` com o que os mapas i18n implicam, e `npm run build` roda esse `--check`. Prova: com o índice antigo o comando sai 1 com «content/indice.en.json: es lista 0 aulas traduzidas, mas os mapas i18n implicam 30 (correr "npm run content")»; com o índice regerado sai 0.
- `content/cursos.json`: a descrição inglesa do espanhol dizia «Explanations in Portuguese today; English edition in preparation» — deixou de ser verdade para as aulas 1–30. Passou a «Lessons 1–30 are already explained in English; the rest is being translated». As de alemão e italiano continuam verdadeiras (não há nenhuma aula traduzida).
- `scripts/i18n-aulas.mjs`: a CLI (`extrair`, `juntar`, `titulos`, `estado`) comparava `import.meta.url` com `file://` + caminho do Windows e **nunca executava** neste ambiente — nenhum erro, nenhuma saída. Passou a usar `path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)`, como `scripts/auditar-cobertura-internacional.mjs` já fazia. Sem isso, o fluxo de tradução documentado em `docs/ESTRUTURA-INTERNACIONAL.md` não era executável.

Verificado localmente: `tsc --noEmit` limpo; `node scripts/conteudo.mjs --check` conforme (460 aulas · 1.840 dias-fonte · 680 dias traduzidos); `testar-inventario-seo` conforme (3.680 sessões, sitemap 133); `testar-titulos` 95 títulos ≤ 60 caracteres; `testar-idiomas-ensino` OK; `testar-dominio` 20/20 (HTTP real incluso); `npm run build:website` OK. Sonda com `Host` real no servidor de produção local (`curl -H "Host: …"`; `fetch` do Node não honra o `Host` e deu resultado falso na primeira tentativa):

| Sondagem local, `Host` real | Antes | Agora |
|---|---|---|
| `.com/curso/es` | `lang="en"`, «Spanish course: English edition in preparation», `noindex` | igual — o hub só é indexável quando **todas** as aulas estão em inglês (`metaRota.ts` → `explicacaoCompleta`), e faltam 32 |
| `.com/curso/es/dia/1` | `lang="en"` com **texto da aula em português** | `lang="en"`, «Sounds, alphabet and first words · Spanish · Day 1», corpo em inglês, sem `robots` |
| `.com/gramatica/es` | `lang="en"` com gramática em português (fallback `es.json`) | `lang="en"`, «Spanish grammar for English speakers», 12.880 bytes em inglês |
| `.com/sitemap.xml` | 36 `<loc>` | **46** `<loc>` (+`/gramatica/es`, +`/curso/es/dia/1..8`) |
| `.com.br/curso/es`, `.com.br/gramatica/es` | pt-BR | pt-BR, sem mudança de texto; o sitemap `.com.br` continua com **87** `<loc>` e ganhou `xhtml:link` para as 9 páginas de espanhol |

Limitação do método de sondagem: o navegador deste ambiente não executa o React quando o `Host` é forjado (`--host-resolver-rules`), porque o HSTS do domínio manda os assets para https contra um servidor http — uma página sem corpo pré-renderizado (`noindex`, como o hub do espanhol) aparece vazia na sonda mesmo com HTML e API corretos. A prova aqui é o HTML e a API servidos com `curl -H "Host: …"`, não a renderização no navegador.


O que continua faltando para o espanhol virar idioma pleno do `.com` (número medido, não estimado): **32 aulas / 128 sessões** em inglês, mais 32 aulas de gramática sem tradução. E, para alemão e italiano, o buraco é total: `de` 0 de **72 aulas** (288 sessões, **18.352 textos** de explicação, 402 só na aula 1) e `it` 0 de **62 aulas** (248 sessões, **17.100 textos**, 464 na aula 1). Os títulos já estão traduzidos (`de` 291, `it` 310) e as palavras dos cursos de alemão já trazem o inglês no próprio dado; o que falta é a prosa de explicação, que pelo §1 do `docs/ESTRUTURA-INTERNACIONAL.md` não é tradução palavra a palavra (as comparações de som são reescritas com referências do inglês) e pelo §4 exige revisão de falante nativo antes de divulgar.

Estado: **mesclado** (PR #537, `4c3f4f7d9`; 7/7 checks verdes — `build`, `paridade-head`, `lighthouse`, `apk`, `robots-google`, gitleaks e dependências) e **verificado em produção em 09/11/2026**, depois de o deploy do Render entrar (o sitemap do `.com` virou de 37 para 46 `<loc>` entre 14:50 e 14:52Z; `mergedAt` 14:26Z):

| Sondagem (produção, com query única para furar o cache de borda) | Resultado |
|---|---|
| `https://linvuu.com/curso/es/dia/1` | 200, `<html lang="en"`, «Sounds, alphabet and first words · Spanish · Day 1», **sem `robots`**, corpo em inglês, nenhuma palavra em português |
| `https://linvuu.com/gramatica/es` | 200, `lang="en"`, «Spanish grammar for English speakers · Linvuu», sem `robots`, 12.848 bytes |
| `https://linvuu.com/curso/es` | 200, `lang="en"`, «Spanish course: English edition in preparation», `noindex` — de propósito: faltam 32 aulas |
| `https://linvuu.com/cursos` | 200, `lang="en"`, «Courses · Linvuu» |
| `https://linvuu.com.br/curso/es/dia/1` | 200, `lang="pt-BR"`, «Sons, alfabeto e primeiras palavras · Espanhol · Dia 1» — inalterado |
| `https://linvuu.com.br/gramatica/es` | 200, `lang="pt-BR"`, «Gramática: espanhol» — inalterado |
| `https://linvuu.com/sitemap.xml` | **46** `<loc>` (eram 37); `/curso/es/dia/1` com `hreflang` en → `.com` |
| `https://linvuu.com.br/sitemap.xml` | 87 `<loc>`; a mesma URL com `hreflang` pt-BR → `.com.br` |
| não regrediu | `.com/sobre` 200 «Who writes Linvuu» sem `robots`; `.com/por-que-linvuu` 200 «Why study with Linvuu?» sem `robots` |



## /sobre em inglês: página escrita, não tradução automática (2026-11-09)

`https://linvuu.com/sobre` servia texto em português com `<html lang="en">` e `noindex`: mentia para o leitor de tela e não existia para a busca. Agora existe página em inglês de verdade — o item 1 da fila de `docs/SEO_AUDIT.md`.

- Texto nas duas línguas em `src/lib/sobre.ts`, no mesmo molde de `src/lib/institucional.ts`: a página React e o HTML pré-renderizado que o Google lê saem da mesma fonte, e o exemplo do método foi reescrito para o erro de quem fala inglês («eu sou trinta anos» em vez de «eu tenho trinta anos»).
- `src/lib/metaRota.ts`: `/sobre` passa a ter título, descrição e `inLanguage` por idioma, `em: ['pt-BR', 'en']` e nenhum `semIndice`; o HTML pré-renderizado traz a página inteira na língua do domínio; o menu do `.com` ganha o link «About Linvuu» (antes a página era órfã lá).
- `scripts/seo.mjs`: `/sobre` entra no sitemap dos dois domínios com `hreflang` (`.com`: 35 → 36 URLs).
- `Footer.tsx` e `src/i18n/{pt-BR,en}.ts`: link «About Linvuu» no rodapé inglês; o português continua «Quem somos», com o texto idêntico.

Verificado: `tsc --noEmit` e `lint:apk` limpos; `testar:dominio` 20/20; `testar-inventario-seo` conforme (3.680 sessões, sitemap 123); `testar-http-seo` **3.784 páginas** conformes (281 redirecionamentos); `testar-titulos` 87 títulos com no máximo 60 caracteres; `testar-seo-publico` conforme; `npm run build` OK. HTTP local com `Host` real: `.com/sobre` → `lang="en"`, `inLanguage: en`, sem `robots`, hreflang pt-BR/en/x-default; `.com.br/sobre` → `lang="pt-BR"`, `inLanguage: pt-BR`, texto em português.

Estado: **mesclado** (PR #533, `52ec41761`) e **verificado em produção em 09/11/2026**, depois de o deploy do Render entrar:

| Sondagem (produção, com query única para furar o cache de borda) | Resultado |
|---|---|
| `https://linvuu.com/sobre` | 200, `<html lang="en"`, título «Who writes Linvuu · Linvuu», **sem `<meta name="robots">`** |
| canonical e alternates do `.com/sobre` | `canonical` https://linvuu.com/sobre; `hreflang` pt-BR → .com.br, en → .com, x-default → .com |
| `https://linvuu.com.br/sobre` | 200, `<html lang="pt-BR"`, título «Quem escreve a Linvuu», `inLanguage: pt-BR`, sem `noindex` |
| `https://linvuu.com/sitemap.xml` | **36** `<loc>` (era 35); `/sobre` com os três `xhtml:link` |
| `https://linvuu.com.br/sitemap.xml` | 87 `<loc>`; `/sobre` com os três `xhtml:link` |
| menu e rodapé do `.com` | link «About Linvuu» presente na home e no `/sobre` |
| corpo pré-renderizado do `/sobre` inglês | texto inteiro em inglês, com o exemplo «eu sou trinta anos» citado como erro do falante de inglês |
| não regrediu | `https://linvuu.com/livros` → 301 para `https://linvuu.com.br/livros` (query preservada); `.com.br/livros` → 200; `.com/` → 200 com `lang="en"` |

O deploy levou cerca de 25 minutos para aparecer; até ele entrar, o `.com/sitemap.xml` continuou com 35 URLs e o `/sobre` com título em português — sinal de que a origem ainda estava na versão anterior, não de cache (a sonda com query única mostrou o mesmo).



Fila fechada nesta sessão, todos por squash, CI completo verde e branch remota apagada: **#530** (`/livros` no `.com` → 301, `6090f6814`), **#529** (`.env` carregado antes dos módulos, `6f77dc67f`) e **#531** (mensal em dólar já configurada, `b71ce2405`). Dois deles colidiam no mesmo ponto deste arquivo; as resoluções foram aditivas — as seções das duas pontas foram mantidas e nenhuma linha vinda da main foi removida. Depois do deploy, produção conferida por HTTP: `https://linvuu.com/readyz` → **200** e `https://linvuu.com/livros` → **301** para `https://linvuu.com.br/livros`. O 200 do `/readyz` continua atestando preço em dólar presente, ativo, live, mensal e com o valor anunciado (`server/prontidao.ts`).

Um playbook externo (recebido 09/11) pediu reescrever o i18n para `/pt/` + `/en/`, adotar Paraglide, "implementar prerender" e clonar 25 repositórios. A auditoria medida em `docs/SEO_AUDIT.md` mostra que o prerender já existe **por requisição** (`server.ts` + `src/lib/metaRota.ts`; 3.784 respostas HTTP conferidas pelo CI), que `hreflang`, `canonical` e 23 tipos de JSON-LD já são emitidos, que `robots` e sitemaps (87 + 35 URLs) existem, e que migrar as rotas moveria 3.784 URLs contra a decisão do fundador de 29/10. Cada pedido foi aceito ou recusado com evidência; as decisões em inglês ficaram em `NOTES.md`. Lacuna real encontrada: as páginas de aula dão alcance (3.784) mas pouca demanda de busca — falta o corpus editorial de páginas de dúvida.

Meta registrada em `docs/META-1M-2027.md`: **R$ 1,1 milhão até 31/12/2027**, derivada dos preços de `docs/PRECOS-DEFINIDOS.md` → ~1.100 alunos pagantes (80/mês em média), 870–1.000 ativos no fim. Limitação declarada: nenhuma premissa de conversão, churn ou CAC foi medida ainda; o primeiro mês de venda substitui a tabela. O documento conclui que SEO sozinho não fecha a meta e nomeia a maior fatia: turmas B2B (~R$ 420 mil), com o anual antecipado como alavanca de caixa. Estado: documentos de auditoria e de meta implementados nesta branch; sem merge.

## Pendências por prioridade
1. PRs #368 e #369 mergeados e deploy live confirmado. Verificação HTTP pós-deploy registrada no PR #369: APIs 401/404 com private/no-store e noindex; /healthz e /readyz 200 com os mesmos cabeçalhos; home e páginas públicas 200 com no-cache. Isso não substitui teste autenticado ou regras publicadas.
2. Obter as URLs individuais de redirecionamento/robots no Search Console e testar cadeias e política de indexação de cada uma.
3. Autenticação administrativa no projeto `linvuu`: a conta do Cloud Shell não conseguiu listar bancos/regras nele. Confirmar a conta proprietária e obter acesso ao projeto correto, consultar IAM e regras publicadas. O IAM coletado de `linvuu-995d0` não comprova o IAM de produção. Conector Composio é público de Auth; plugin Firebase instalado não expôs métodos remotos administrativos nesta sessão.
4. Concluir revisão de backend, conteúdo servido, idiomas, dependências e histórico de segredos. 164 arquivos de src foram recuperados; isso NÃO equivale a auditoria integral aprovada.
5. Identificar os supostos vazamentos PHP por URL/arquivo/evidência. Nenhum PHP encontrado no inventário de src e scripts consultado; duas sondagens públicas deram 404. Não concluir ausência em todo o histórico.
6. Checagem HTTP das 81 URLs concluída: todas 200, sem redirecionamentos, canonical próprio e sem noindex. Renderização completa de cada página ainda não validada.
7. Auditar sessões autenticadas, assinatura/revogação, respostas pagas, áudio, renderização e navegação de idioma com contas de teste.
## Documentação histórica
CONTEXTO.md e PARCERIA-IA.md registram rodadas antigas e contêm informações superadas (áudio, progresso, pendências, marca e ofertas). Consulte arquivos atuais e evidências antes de agir. Não propagar preços ou níveis antigos deste histórico.
## Vuu: referência de design
Figma: https://www.figma.com/design/GHaocmKtqRw2EQ1QqVx4YD
Matriz inicial com oito estados. Estudos gerados em 3D são imagens conceituais, não arquivos .blend nem animações finais.

## Auditoria Firebase — estado atual
O workflow de auditoria detalhada do repositório principal foi aposentado. A federação OIDC temporária foi efetivamente autenticada pelo workflow de teste **não sensível** em [40460208259](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase/actions/runs/40460208259). Não houve publicação de políticas IAM nem confirmação das regras Firestore em produção. Veja [conexao-firebase-github.md](conexao-firebase-github.md) para a arquitetura corrente e verificações pendentes.
