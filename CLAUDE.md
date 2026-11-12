# CLAUDE.md — Linvuu

<!-- Atualizado em 2026-11-11 a partir de auditoria completa (repo + sites ao vivo). Substitui a versão de 06/11/2026. -->

> **LEIA-ME PRIMEIRO: [`docs/DOMINIOS.md`](docs/DOMINIOS.md)** — o site nacional (**linvuu.com.br**, português, reais) e o internacional (**linvuu.com**, inglês, dólares) lado a lado: catálogo completo, sitemap, moeda e plano de cada um. Todo número sobre o site é dito **por domínio**, nunca somado.
>
> **TRABALHO NO linvuu.com? LEIA [`docs/LEIA-ME-INTERNACIONAL.md`](docs/LEIA-ME-INTERNACIONAL.md)** — o aluno do .com tem o **inglês como língua materna**: tudo em inglês, explicado a partir do inglês; conteúdo em inglês **travado** (`content/travas-en.json`, conferido no CI e no build); progresso e próximos passos do .com.
>
> Instruções de trabalho para o Claude Code neste repositório. **Plano em vigor: `docs/plano/EXECUTAR.md` + `docs/plano/ESTADO.md` (comando `/lote`).** Curto de propósito: o detalhe operacional vive em `docs/ESTADO-ATUAL.md` e `PENDENCIAS.md` — leia os dois no início de qualquer tarefa maior. Em conflito entre este arquivo e eles, **este arquivo manda nas regras** e **eles mandam nos fatos**.

## O produto em 5 linhas
- Linvuu: cursos de idiomas (alemão, inglês, espanhol, francês, italiano, português BR, russo) com explicação na língua do aluno e **áudio em cada frase**. **2 primeiras aulas grátis** (sessões 1–8; paywall na 9).
- Um único serviço Render serve **linvuu.com.br** (perfil `br`, interface pt-BR) e **linvuu.com** (perfil `global`, interface EN) — a separação é **por Host em runtime**, não por build (`server/dominio.ts`, `src/i18n/locales.ts`).
- Stack: React 19 + Vite 8 + TypeScript strict, react-router-dom 7, Express 5 (`server.ts`), Firebase (Auth + Firestore), Stripe 23, Capacitor 8 (APK do mesmo código, `VITE_ALVO=apk`).
- Preços (fonte única: `src/config/planos.ts` — nunca hardcode preço fora dele): BRL mensal 139 / trimestral 417 / trimestral Pix 291,90 / anual 999; USD mensal 19,99 / anual 149. Cupom FUNDADORES (50% no mensal BRL) só existe no .com.br.
- Dono: Felipe Nascimento Rosa. Marca: verde #1E3B2F, papel #F5F1E8, grafite #1D1F1C, ocre #B7791F; fontes Newsreader/Source Sans 3/Literata/Caveat; mascote **Vuu** (nunca o Pelmeni).

## Mapa de rotas (páginas)
`/` · `/cursos` · `/curso/:id` · `/curso/:id/dia/:n` · `/portugues` · `/gramatica(/:id)` · `/livros(/:id(/capitulo/:n))` · `/livro/gramatica-ru` · `/russo-online` · `/assinatura` · `/entrar` · `/cadastro` · `/conta` (só APK) · `/sobre` · `/por-que-linvuu` · `/contato` · `/ex-alunos-udemy` · `/privacidade` · `/termos` · `/excluir-conta` · `*` = 404 real.
Regras de domínio em `server/dominio.ts` (301): www→apex; `/en`/`/es` de interface → .com/raiz (espanhol de interface foi **retirado** em 06/11); `/curso/br` no .com.br → .com; `/livros` no .com → .com.br.

## Onde mora cada subsistema
| Subsistema | Arquivos |
|---|---|
| Billing/checkout/Stripe | `server/billing.ts`, `server/billing-contrato.ts`, `server/billing-webhook.ts`, `src/config/planos.ts` |
| Prontidão (env vars) | `server/prontidao.ts` (`/readyz` confere variáveis e valores) |
| Áudio de assinante | repositório **privado** `Linvuu-Audio`, baixado no build para `.audio-privado/` (`scripts/audio-privado.mjs`, `AUDIO_REPO_TOKEN` no Render); servido só por `/api/audio` |
| Áudio público | `public/audio/` (hoje: `v2/` = 4.062 arquivos, `es/` 907, `it/` 557) |
| Conteúdo dos cursos | `content/idiomas/<id>/<interface>/dia-NNN.json` (4 sessões = 1 aula) |
| Índices de catálogo | `content/indice.json` (PT) e `content/indice.en.json` (EN) — **esquemas diferentes** (ver ARMADILHA 4) |
| SEO (meta/canonical/hreflang/JSON-LD) | `server/metaRota.ts` (fonte única; também `/api/meta`) |
| Sitemaps/robots | por domínio, gerados; sessões `/dia/N` são **noindex de propósito** (decisão 11/11, PR #551) |
| Design | `src/tokens.css` (tokens oficiais) + cascata em `src/main.tsx` (ver ARMADILHA 3) |
| Plataformas | `src/plataforma/website` × `src/plataforma/apk` (alias `@plataforma`; build falha se checkout vazar p/ o APK) |

## Estado real do catálogo (medido em 11/11/2026 — confira antes de afirmar)
Sessões com explicação por interface: **RU 312/312 · FR 248/248 · PT→EN (curso BR) 248 · ES-EN 164/248 · DE-EN 288/288 (12/11) · IT-EN 0/248 · EN (no .br) 248/248.**
Regra `explicacaoCompleta` (`metaRota.ts`): curso só ganha página indexável/hreflang num idioma quando **todas** as aulas estão explicadas nele. Por isso o sitemap do .com tem 20 URLs e o do .com.br 42 (12/11, após o alemão completo) — **é intencional, não é bug**. Não "corrija" sitemap/índice para expor curso parcial sem ordem do Felipe.

## ARMADILHAS (não repetir)
1. **Checkout mensal USD** depende de `STRIPE_PRICE_ID_USD` no ambiente do Render (o anual USD usa `price_data` inline e funciona sem ela). Se o mensal .com quebrar, cheque `/readyz` e o ambiente **antes** de mexer em código. O `render.yaml` não declara essa variável — a ausência lá não prova ausência no painel. **Configuração TESTADA (11/11/2026): a variável está cadastrada no painel do Render e o valor confere exatamente com o preço mensal USD da conta live da Stripe (US$ 19,99/mês), conferência feita nos dois painéis; declaração registrada a pedido do Felipe. A compra real de ponta a ponta segue sendo o lote 3 do plano-mestre.**
2. **Áudio pago fora do repositório público (lote 20, 11/11/2026):** os 11.033 MP3 pagos vivem só no repositório privado `Linvuu-Audio`; o build do Render os baixa com `AUDIO_REPO_TOKEN` (log: `audio-privado: 11033 MP3 baixados`). Sem a credencial, o build **para** (o deploy anterior continua no ar). **Nunca** adicione áudio pago em `server/` nem em `public/`: o caminho é commitar no `Linvuu-Audio`. O histórico do Git ainda tem os arquivos antigos (lote 22, só com ordem expressa do Felipe).
3. **CSS em camadas:** `main.tsx` empilha tokens → site-publico → styles → redesign → camadas. **Não crie folha global nova** nem "redesign2.css": ajuste na camada existente certa ou nos tokens. Hex de cor só em `tokens.css` (os hex em componentes de bandeira são exceção legítima).
4. **Dois índices, dois esquemas:** `indice.json` ≠ `indice.en.json`. O gerador `scripts/conteudo.mjs` tem a **GUARDA 2026-11-04**: nunca regenere índice por cima de dias traduzidos em disco sem o mapa i18n — foi assim que o espanhol EN "sumiu" uma vez.
5. **Copy pública — fatos que não podem mudar sem ordem do Felipe:** "2 primeiras aulas grátis" (não "aula 1 grátis"); "áudio em cada frase" (não "em cada palavra"); nunca prometer fluência/prazo; certificado **de conclusão emitido pela Linvuu (CNPJ)** é permitido (decisão do Felipe, 11/11/2026), mas nunca como "reconhecido pelo MEC", "oficial" ou equivalente a exame (Celpe-Bras, Goethe, DELF etc.); preços só os de `planos.ts`; contato no .com.br é **contato@linvuu.com.br**.
6. **Home:** `src/pages/Home.tsx` é só um re-export de `HomeBrasileiros` (texto via `src/i18n/home.ts`). Não crie variante nova de home sem matar uma antiga.

## Regras de trabalho (invioláveis)
- **Mapa de idiomas do site (Felipe, 11/11/2026) — leia antes de mexer em SEO, sitemap ou indexação.** Existem só dois sites: **linvuu.com.br** (interface, explicações e gramáticas em **português**, completos) e **linvuu.com** (interface em **inglês**; completos em inglês só russo, francês e português-para-estrangeiros; alemão, italiano e espanhol ainda sem explicação em inglês — é a frente de trabalho). **Não existe** interface nem explicação em espanhol (nem alemão, francês etc. para hispanofalantes) nem em qualquer outra língua. Todo `/es/...` e `/en/...` é endereço antigo: só redireciona (301) para a página atual; nunca crie página, sitemap, hreflang ou pedido de indexação para eles. `/curso/es` é o curso **de** espanhol para quem fala português — não é interface em espanhol.
- **Material antigo não é fonte nem métrica (ordem do Felipe, 11/11/2026).** `_para_apagar/`, `docs/historico/` e relatórios datados (auditorias, snapshots, painéis de métricas antigos) são arquivo morto: não leia como estado atual, não cite número deles, não compare métricas com eles. Estado de indexação/SEO só vale se medido **ao vivo** na hora: `curl` no site, sitemap publicado, Search Console. Resultado do Google (`site:`) é cache do Google, não o estado do site — nunca reporte como fato atual sem dizer isso.
- **Nunca** trabalhe direto na `main`: branch + PR sempre. Fila máxima: 3 PRs abertos + 3 drafts.
- **Merge: somente com ordem explícita do Felipe na conversa.** (Isto substitui a autorização ampla registrada no AGENTS.md — em caso de divergência, vale esta linha.)
- **Não** pague plano/altere billing do Render/Stripe, **não** publique `firestore.rules`, **não** apague branch/arquivo/DNS pré-existente, **não** reescreva histórico do Git — tudo isso é só com ordem expressa e específica do Felipe.
- Segredos nunca em chat, arquivo, print ou commit. Variáveis de ambiente: confira existência pelo `/readyz`, nunca imprima valores.
- Vocabulário de status, sem exceção: **implementado → testado → mergeado → deploy → produção** são estados diferentes. Só afirme o que verificou (CI verde, smoke, leitura ao vivo). "Acho que funciona" não é status.
- Depois de deploy, rode a skill **`verificar-site`** (smoke dos dois domínios) antes de declarar produção.
- Ao mexer em texto de interface: PT no perfil `br`, EN no `global`, **nunca misturar línguas na mesma página** — o caso `/curso/it` no .com (promessa em inglês sobre conteúdo em português) é o anti-exemplo permanente.
- Testes são scripts Node sob medida em `scripts/` + workflows em `.github/workflows/` (não há Vitest/Jest). Rode o workflow relevante e diga qual rodou.

## Antes de qualquer tarefa, responda para você mesmo
1. Qual domínio/perfil é afetado (.com.br, .com, APK, os três)?
2. O curso envolvido está **completo** na interface afetada? (tabela acima)
3. A mudança toca billing, áudio pago, índice ou SEO? Se sim, releia a ARMADILHA correspondente.
4. Como vou **provar** o resultado (CI, smoke, URL ao vivo)?

## DESIGN — regras permanentes
- **CSS:** proibido criar folha global nova. O caminho é consolidar `styles`/`redesign`/`camadas` numa folha só sobre `tokens.css`, nunca empilhar a próxima camada. Cor crua (hex) só em `tokens.css` (exceção: componentes de bandeira).
- **Cartões:** itens da mesma fileira têm **altura igual e CTA alinhado na base** (coluna flex + `margin-top:auto` no botão). Cartão com dois preços empilhados e dois botões é proibido — meio de pagamento é seletor dentro do cartão.
- **Nenhuma seção vazia em produção:** sem conteúdo real, a seção **não renderiza**. Placeholder do tipo "chega em breve" é defeito, não recurso.
- **Um template por tipo de página** (curso, gramática, livro) nos dois perfis. Curso parcial usa **sempre** a nota honesta de cobertura (modelo: `/curso/es` e `/curso/de` no .com — "Explanations in English: N of M lessons so far…"). Prometer explicação num idioma sobre conteúdo em outro é o defeito mais grave deste site.
- **Banner de idioma e cookies nunca cobrem o cabeçalho** — faixa fina no topo, dispensável, sem sobrepor logo/menu nem o hero.
- **Marca presente:** o mascote **Vuu** e a fonte **Caveat** existem para serem usados (estados vazios, conclusão de aula, detalhes editoriais). Hoje o Vuu só aparece no hero da home e a Caveat em nenhuma página.
- **Carregamento:** nada de flash de "Carregando…"/esqueleto vazio em curso e aula — o conteúdo principal renderiza junto (o servidor já gera meta por rota; elimine o flash no cliente).

## DESIGN — correções exatas por página (medido em 11/11/2026, 73 URLs lidas)
Formato: **onde → problema → correção → verificação**. Ao concluir um item, risque-o daqui no mesmo PR.

- **[corrigido no #576]** **D1 [ALTA] `linvuu.com/curso/it`** → subtítulo "Every lesson of this course is explained in English." sobre 62 aulas com títulos em português, sem nota de cobertura (italiano EN = 0/248) → aplicar a nota honesta de cobertura (modelo D-regra acima) ou retirar a frase → verificar: o texto da página é compatível com `indice.en.json` (`it.aulas=[]`).
- **[parte .com corrigida no #585: «Website» → linvuu.com; falta o e-mail do .com.br]** **D2 `linvuu.com.br/contato` e `/sobre`** → exibem `contato@linvuu.com` → trocar para **contato@linvuu.com.br** no perfil `br` (fonte: `config/site.ts` por perfil). E **`linvuu.com/contato`** → o item "Website" aponta para `linvuu.com.br` → apontar para `linvuu.com`.
- **[corrigido no #579]** **D3 Home e `/assinatura` do .com.br** → o cupom **FUNDADORES não aparece em nenhum lugar** → exibir na seção de planos e em `/assinatura` (50% no mensal BRL, conforme `planos.ts`) → verificar ao vivo nos dois lugares.
- **[corrigido no #579]** **D4 Home .com.br, seção "A oferta de hoje"** → omite o trimestral no cartão (R$ 417); só mostra mensal, Pix e anual → incluir o trimestral no cartão com hierarquia clara entre as 4 opções.
- **[corrigido no #582]** **D5 `/russo-online` (dois domínios)** → texto do Spotify diz que só há "a seleção avançada" e que níveis "entram aos poucos" → atualizar: **21 playlists públicas, 7 idiomas × 3 níveis** (desde 06/11/2026), com os links. E a versão .com **não tem** a seção de depoimentos que a .br tem (7 avaliações reais da Udemy) → espelhar a seção em inglês.
- **D6 Seção de avaliações vazia** → a inspeção visual de 11/11 viu "chegam em breve" na home, em `/assinatura` e no .com; a leitura de texto posterior não a encontrou → **conferir no navegador**: se existir no cliente, preencher com as avaliações reais (modelo: `/russo-online`) ou remover a seção (regra permanente acima).
- **[corrigido no #582]** **D7 `linvuu.com.br/livro/gramatica-ru`** → anuncia "**Dez aulas**", mas o livro tem **15 capítulos** (sumário em `/livros/ru`) → corrigir o número e conferir a landing inteira contra o sumário.
- **[corrigido no #576]** **D8 `linvuu.com/cursos`** → título e descrição nomeiam só "Portuguese, French and Russian", mas a página lista 5 cursos → renomear para os cursos reais da página.
- **[corrigido no #582]** **D9 `linvuu.com/ex-alunos-udemy`** → página 100% em português no domínio internacional, sem versão nem moldura EN → criar a versão EN ou redirecionar para o .com.br (o padrão do site é um dos dois; ex.: `/livros` no .com redireciona 301 para o .br — confirmado).
- **[corrigido no #582]** **D10 `linvuu.com/gramatica/de` e `/gramatica/it`** → título "…for English speakers" com o miolo (tópicos, explicações, tabelas) em português, e template diferente das gramáticas de ru/fr/es/br → unificar o template e traduzir o miolo ou aplicar a moldura honesta de cobertura.
- **[não reproduz em 11/11: 1 visível + 1 no FAQPage]** **D11 `linvuu.com/assinatura`** → a pergunta "What currency are the prices in?" aparece **duas vezes** (bloco solto + FAQ), mesma resposta → remover uma.
- **[corrigido no #576]** **D12 Home do .com** → a descrição cita italiano "in translation", mas **não há cartão de italiano** na home (5 cursos), e o texto promete livros "in six languages" → adicionar o cartão com a nota de cobertura ou corrigir as duas frases.
- **D13 Sitemaps e índice de gramática** → `/gramatica` (índice) está fora dos dois sitemaps e o título no .br é genérico ("Gramática · Linvuu") → título com palavra-chave e decisão explícita sobre o índice no sitemap. Atenção: curso parcial fora do sitemap do .com é **intencional** (regra `explicacaoCompleta`) — não "corrigir" sem ordem do Felipe; o que falta é distinguir decisão de esquecimento, página a página.
- **D14 Acabamentos visuais (inspeção desktop, 11/11)** →
  - `/assinatura` .br: grade desalinhada, anual sozinho com vazio à direita → grade de 3 cartões equilibrada (ver D3/D4 e regra dos cartões).
  - Home .br `#planos` e `/cursos`: botões sem alinhamento na base; leque de livros **corta o livro de russo** e esconde o título; busca de `/cursos` é um contêiner gigante com o campo em ~1/3 da largura → corrigir os três.
  - `/curso/ru/dia/1` (página da aula): coluna estreita com ~1/3 da tela vazia à direita; título "Introdução" numa serifada pesada estranha ao site; pílula "Revisão" órfã; barra de progresso invisível → alargar a coluna ou usar a direita (progresso/áudio), título na fonte padrão dos demais, progresso visível.
  - **[corrigido no #585]** `.com/curso/ru`: hero **sem a capa do livro** que existe no .br (metade direita vazia) → mesmo hero dos dois perfis.
  - **[corrigido no #584]** `.com` home: grade de cursos 3+2 com célula vazia → layout pensado para 5 cartões.
  - **[rótulos do .com corrigidos no #585]** Rodapé (todos): ícones finos/de baixo contraste e terço direito vazio; no .com, rótulos de acessibilidade das redes estão em português → contraste/uso do espaço e rótulos no idioma do perfil.
- **D15 Observação** → `/privacidade` e `/termos` (dois domínios): a leitura de texto só extraiu título+descrição → conferir a renderização do corpo no navegador antes de concluir qualquer defeito.

## NÃO MEXER (verificado bom em 11/11/2026)
Conteúdo pedagógico inteiro (livros e capítulos 1–2 de todos os idiomas, aulas grátis 1–2 completas), paywall na sessão 9 nos dois domínios, `/cursos` do .br, cursos completos (RU/FR/BR no .com; todos no .br), gramáticas completas, preços exibidos (batem com `planos.ts` nos dois domínios), robots.txt dos dois domínios, 404 real. A auditoria leu 73 URLs e **não encontrou nenhum placeholder de conteúdo**.

---
*Base: auditoria de 11/11/2026 (HEAD `a4872027`) + leitura completa dos sites em 11/11/2026 (73 URLs). Atualize a tabela de catálogo, as armadilhas e os itens D quando os fatos mudarem — CLAUDE.md desatualizado é pior que nenhum.*
