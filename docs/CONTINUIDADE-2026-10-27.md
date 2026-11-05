# Linvuu — passagem de turno e decisões de 27 de outubro de 2026

**Leitura obrigatória para Claude, ChatGPT/Codex, Gemini/Antigravity e Cursor.**
**Fonte factual:** PRs/commits, GitHub Actions, Render, GSC Wizard + URL Inspection API oficial, Firebase/Google Cloud Cloud Shell, Stripe e PostHog. Este documento é um retrato com data; nunca substitui consultar novamente a main e o serviço. Acesso aos repositórios depende de autenticação do agente e da permissão concedida pelo proprietário.

## 0. Identidade do projeto e limites editoriais
- Linvuu é uma plataforma brasileira de ensino de **idiomas** (inglês, espanhol, francês, italiano, alemão e russo). Website em português, com rotas de idioma de interface `/en` e `/es`; versão Android tratada separadamente. **Não usar descrições antigas de produto STEAM** como estado vigente.
- Público inicial: Brasil. Manter português brasileiro claro. O posicionamento visual é premium e não infantilizado; conservar a marca e o curso tal como publicados.
- A1/A2 atuais e website em produção não devem ser alterados acidentalmente por PRs de livros B1–C2, gamificação, protótipos ou artes.
- **Mascote Vuu:** o proprietário explicitamente pediu em 27/10 registrar Vuu como frente de identidade/produto. O arquivo `AGENTS.md` existente o trata como **frente futura**, e a árvore de arquivos da `main` inspecionada hoje não mostrou asset/implementação identificável como Vuu. Logo, **não declarar Vuu integrado ao site, aprovado visualmente ou distribuído no APK** sem localizar o asset, PR e testes. Se continuar Vuu, preservar estética premium, não infantilizar e pedir evidência do arquivo/arte aprovada. Não remover mascotes legados sem escopo e autorização específica.
- PRs futuros mantidos em **draft**: [#360, editorial B1–C2](https://github.com/FelipeNascimentoRosa/Linvuu/pull/360) e [#367, gamificação](https://github.com/FelipeNascimentoRosa/Linvuu/pull/367). Não fazer merge/release involuntário.

## 1. Três repositórios e privacidade
| Repositório | Papel | Estado verificado antes do encerramento | Alvo autorizado |
| --- | --- | --- | --- |
| `FelipeNascimentoRosa/Linvuu` (ID `1400441159`) | produto web/APK, CI, código de regras e docs dos agentes | público | **privado** |
| `FelipeNascimentoRosa/Linvuu-Livros-em-PDF` (ID `1416459328`) | livros próprios, templates, fontes e PDFs | **já privado** | permanecer privado |
| `FelipeNascimentoRosa/Linvuu-Auditoria-Firebase` (ID `1435293296`) | OIDC e auditoria de metadados IAM/Firestore | público | **privado** |
As mudanças de visibilidade são operações separadas, a serem **confirmadas por API após aplicação**. Não reportar três repositórios privados antes dessa confirmação.
- GitHub repo privado **não torna o domínio https://linvuu.com.br privado**; Render publica a aplicação independentemente do código-fonte.
- **Atenção:** minutos GitHub Actions deixam de ser ilimitados quando o repo fica privado; plano/cota/faturamento podem impedir novos jobs. Verificar Render GitHub integration, PR checks, e acesso dos agentes após converter; se falhar, não expor o código publicamente para fazer o runner voltar.
- A auditoria OIDC exige o **ID numérico** do repo de auditoria e o mesmo caminho de workflow. ID e nome foram preservados. O repo principal privado não poderá fornecer `firestore.rules` por URL pública: foi preparado PR #1 (mergeado) no repositório de auditoria para **não** fazer download anônimo e marcar a **comparação de regras versionadas como pendente**. A coleta de metadados continua somente de leitura; não equivale a auditoria completa.

## 2. Cronologia dos PRs integrados na main do produto (UTC de 27/10)
1. **#368** (`a2a38e9a`): proteção de cache da API e coordenação entre agentes.
2. **#369** (`118a3abe`): autenticação backend rejeita tokens revogados e contas desativadas (validação automatizada; produção com contas reais precisa ser comprovada).
3. **#370** (`663b6ece`): distinção documental de projetos Firebase e evidências; não trocar projeto por inferência.
4. **#371** (`ce4dddd3`): primeira ponte OIDC auditoria; tornou-se obsoleta e foi substituída.
5. **#372** (`b2624451`): bloqueio de coleta IAM sensível no repositório público.
6. **#373** (`3431e440`): instruções compartilhadas para Cursor e Antigravity.
7. **#374** (`6bf7dd9d`): remove workflow de auditoria Firebase legado do repo principal; impede instalador antigo de aplicar IAM; atualiza CLAUDE/README/estado. Não alterar website nem Android.
8. **#375** (`56c2ec50`): corrige JSON-LD de páginas `/curso/*`, incluindo logo real e ID Organization; auditor SEO posterior eliminou aviso do logo em en/de/es.
9. **#377** (`fdbd25a0`): checkout falha de modo controlado sem `STRIPE_PRICE_ID` válido; **não cria produtos ou preços Stripe live durante pedidos**. Testes no CI. Não mudar valores comerciais.
10. **#378** (`4397e03d`): eventos PostHog `checkout_started` e `checkout_returned` apenas com consentimento, sem PII; retorno não é pagamento aprovado.
11. **#379** (`3df784f0`): interrompe transições cromáticas dos botões de conclusão/navegação do APK para reduzir falha intermitente de contraste; preview/CI + rerun passaram, issue #376 permanece até teste físico.
12. **#382** (`62a64ecc`): relatório de auditoria por 20 frentes, instruções Claude, limites de teste real.
13. **#383** (`a71a2eec`): documentação com evidências Googlebot, cinco URLs prioritárias e sitemap reenviado/aceito em 27/10; CI, gitleaks, dependências aprovados. Apenas docs.
A **main anterior à preparação deste relatório** está em `a71a2eec52ec5cad52ca56ee5f16503b087c3b95`. Uma alteração posterior de handoff/privacidade mudará SHA; use HEAD da main atual. PR #376 é uma issue de contraste, não um PR. Issues abertas para continuidade: **#376 Android contraste**, **#380 checkout end-to-end**, **#381 indexação**. PRs de editoriais/protótipos draft não entram em lançamento automaticamente.

## 3. Render e produção
- Serviço Render web **`linvuu`**, ID `srv-db03818u01pc738mirig`, publicação via GitHub e gatilho `checksPass` automático quando aplicável. CI e segurança passar no GitHub é distinto de deploy `live`.
- Deploy **`62a64ecc` confirmado `live`**, ID `dep-dbg59ess728c73etvsr0`, encerrado em 27/10 07:39:26Z. O commit posterior `a71a2eec` contém só documentos; **não afirmar deploy sem consultar Render**.
- Auditor externo constatou **HTTP 200** em `/healthz`, `/readyz`, rotas prioritárias, `/robots.txt` e `/sitemap.xml`. A prontidão verifica credencial Firebase, metadados Firestore e preço ativo Stripe por leitura; não significa venda homologada.
- Cloudflare gerencia DNS da zona `linvuu.com.br` (apex A proxied para Render, www CNAME para `linvuu.onrender.com`), `Always Use HTTPS=on`, regra 301 de www → `https://linvuu.com.br`, bypass de cache para robots, sitemap, health, readyz e APIs. Bot Fight Mode **desativado** e Cloudflare `is_robots_txt_managed=false`. API de firewall legado retornou 410 deprecated; Rulesets API consultada, não encontrei regra personalizada bloqueando Googlebot, mas não é garantia de zero bloqueios históricos.
- Manter CORS, cabeçalhos de segurança, /readyz, variáveis e configurações Firebase corretas; nunca colar valores de chaves em docs ou PR.

## 4. Firebase, Firestore, Google Cloud IAM e duas contas
- Projeto **correto para produção: `linvuu`**, project number `982052790317`. Havia referências antigas e confusão com **`linvuu-995d0`**; não migrar produção nem redeploy nesse projeto secundário por suposição.
- Proprietários humanos confirmados pelo `gcloud projects get-iam-policy linvuu`: `hello.linvuu@gmail.com` e `felipevaleevarosa@gmail.com` com `roles/owner`. Ambos executaram no Cloud Shell `configurar-auditoria-privada.py --apply` e `--verify` e receberam `CONFIGURACAO_GCP_VERIFICADA`; **nenhuma chave JSON permanente criada**.
- O instalador antigo `~/configurar.py` exigia uma conta e um pool obsoletos; usar somente o instalador atualizado da auditoria, nunca o legado.
- Workload Identity Federation somente leitura: pool `linvuu-audit-private`, provider `github-private`, SA `auditoria-privada@linvuu.iam.gserviceaccount.com`; condição restrita a GitHub repository ID `1435293296`, owner ID `204771338`, branch `main` e caminho exato `.github/workflows/auditoria-firebase.yml`.
- [Run #40460208259](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase/actions/runs/40460208259): **OIDC temporário e leitura do número do projeto testados com sucesso**; não autoriza concluir que todos os recursos Firebase foram auditados, nem dá acesso admin ao ChatGPT/Claude.
- `firestore.rules` do produto e as regras mostradas na aba Rules do Firebase em imagens de 22/10 **coincidiram visualmente**, restritivas para `users/{uid}`; **não** houve comparação byte a byte com a regra publicada nem teste real com dois usuários. Nenhum `firebase deploy` foi executado. Endpoint e controles do Admin SDK operam fora das regras de clientes, exigem testes separados.
- Auditoria no repo privado passa a poder coletar somente metadados pelo workflow manual (se Actions privado executar). A **comparação SHA do arquivo versionado com regras publicadas fica pendente**, porque o main se tornará privado; não interpretar sucesso da coleta como aprovação das regras. Qualquer inventário IAM pode conter metadados administrativos e deve continuar privado.

## 5. Search Console e Googlebot — ESTADO EXATO DE 27/10
- Propriedade `sc-domain:linvuu.com.br`; domínio canônico **`https://linvuu.com.br`**. `robots.txt`: `User-agent: *`, `Allow: /`, `Disallow: /livro/` (singular) e `Disallow: /api/`. As rotas `/livros/` e `/curso/` não estão barradas por essas duas regras.
- **Página principal indexada de verdade:** URL Inspection API registrou Googlebot MOBILE em **27/10/2026 07:10:35 UTC**, `robotsTxtState=ALLOWED`, `pageFetchState=SUCCESSFUL`, `indexingState=INDEXING_ALLOWED`, `Submitted and indexed`, canonical correto. Inspeção [aqui](https://search.google.com/search-console/inspect?resource_id=sc-domain:linvuu.com.br&id=slvJs3kQAtNn8jNoX3jw2g).
- Outras URLs indexadas nas inspeções: `/en`, `/assinatura`, `/cursos`, `/livros`, `/curso/en`, `/sobre`, `/contato`, `/por-que-linvuu`. Não afirmar que somente `/en` está indexada. Google inspeções podem mudar.
- **5 URLs prioritárias ainda não indexadas:** `/curso/de`, `/curso/ru`, `/livros/de` (desconhecidas), `/livros/es`, `/es` (descobertas, não indexadas); checar condições atualizadas antes de agir.
- URL `http://linvuu.com.br/` tinha `Redirect error` histórico. Auditor externo atual seguiu HTTP, HTTPS, www e não-www à home HTTPS sem loop; não alterar redirecionamentos válidos por relatório antigo.
- Sitemap HTTP 200 XML com **81 URLs**, foi **reenviado ao Google Search Console em 27/10 07:52:07Z** e **baixado de novo em 07:52:08Z**, **0 erros, 0 avisos**. Reenvio é pedido de nova leitura, **não solicitação de indexação individual**.
- GSC Wizard Indexing Tracker: **81 URLs cadastradas, 7 indexadas, 17 não indexadas, 57 sem inspeção** na fotografia inicial; a nota automatizada 27/100 é influenciada pela falta de inspeção, não é porcentagem verdadeira de URLs Google indexadas. Score SEO técnico interno ~84/100 e desempenho orgânico ~35/100, avaliações qualitativas.
- Search Analytics até 24/10: **14 cliques, 66 impressões** em 28 dias; cliques podem ser acessos do proprietário. Exibição da home em busca confirmada (56 impressões, 11 cliques).
- A conexão GSC consegue inspecionar URLs, auditar on-page, reenviar sitemap e registrar anotações, **mas não aciona “Solicitar indexação” individual**. Interface: Inspeção de URL → Testar URL publicada → Solicitar indexação (uma vez) nas cinco páginas prioritárias. Não usar a Google Indexing API para páginas de cursos comuns. 
- [Diagnóstico completo](SEO-INDEXACAO-GSC-2026-10-27.md), [issue #381](https://github.com/FelipeNascimentoRosa/Linvuu/issues/381). Google decide a indexação; **não prometer que um agente consegue impor indexação no próximo rastreio**.

## 6. Stripe, vendas web e consentimento analítico
- Stripe Linvuu em **livemode** conectado; auditoria encontrou **1 preço mensal ativo R$ 139,00**, webhook habilitado `/api/stripe/webhook` para checkout/assinaturas/faturas e eventos relevantes. **18 Checkout Sessions reais observadas expiradas/sem pagamento**; isso não comprova defeito, mas também não prova compra concluída.
- PR #377 removeu criação de produtos/preços `live` quando uma requisição não achava preço. O backend usa `STRIPE_PRICE_ID` configurado; nenhuma alteração comercial deliberada.
- PR #378 adicionou `checkout_started` e `checkout_returned` no PostHog **com consentimento**, sem PII. `checkout_returned` não é confirmação de pagamento, especialmente Pix/boleto.
- **Bloqueador para prontidão web >=80/100:** homologar cadastro com usuário teste → sessão Stripe test mode → webhook validado e idempotente → concessão de acesso → cancelamento/reembolso/revogação. Nenhuma transação real foi iniciada por IA nesta sessão; [issue #380](https://github.com/FelipeNascimentoRosa/Linvuu/issues/380).
- Não aumentar prontidão comercial com base apenas em /readyz ou teste unitário.

## 7. Android e Google Play
- Separação web/APK existe no código e em scripts/CI; a prévia Chromium da interface Android **não** é AAB assinada nem validação Play Console ou dispositivo real. Google Play é prioridade separada.
- Falha `color-contrast` intermitente em botões de conclusão/sessão em 320px com texto 200% registrada na [issue #376](https://github.com/FelipeNascimentoRosa/Linvuu/issues/376); rerun de prévia passou sem mudar código. PR #379 alterou transições cromáticas no contexto nativo e obteve checks verdes; **não fechar #376 até três repetições + aparelho real**.
- Arquitetura planejada para compras nativas deve obedecer às regras da Google Play; RevenueCat SDK ainda não estava integrado ao binário examinado. Não declarar Google Play pronta nem reutilizar checkout web no APK inadvertidamente.
- Conteúdo avançado e livros futuros permanecem em rascunho. Áudios ElevenLabs existem em aulas mas ainda há pendências conhecidas; nunca declarar direitos comerciais de TTS por mera existência de MP3.

## 8. Nota honesta (0–100) e prioridades
| Área | Nota aproximada | Falta principal |
| --- | ---: | --- |
| Infraestrutura/Render/GitHub | **91** | validar Actions/Render após tornar privados |
| Segurança automatizada | **80** | testes autenticados e validação de permissão real |
| SEO técnico | **84** | páginas de apresentação e acompanhamento |
| Indexação/visibilidade orgânica | **35** | cursos/livros ainda não indexados |
| Vendas web | **75** | compra test mode, webhook, acesso |
| APK/Google Play | **60** | AAB, aparelho, políticas loja |

**Sequência amanhã:** (1) conferir repos private e permissões de GitHub Apps, (2) última main/Actions/Render; (3) leitura GSC após sitemap; (4) validar compra test mode e direitos de acesso sem cobrar cliente; (5) testes Firestore com duas contas; (6) APK AAB/aparelho. Não alterar valores de Stripe, Firestore Rules, credenciais, publicações ou livros sem escopo e testes próprios.

## 9. Protocolo multiagente sem colisões
- `AGENTS.md` define regras comuns. `CLAUDE.md`, `GEMINI.md` e `.cursor/rules/linvuu.mdc` **devem apontar a este documento**. Claude/ChatGPT/Gemini não sincronizam memória automaticamente: sincronia **significa ler a mesma main e os mesmos PRs/docs/checks**, e escrever handoffs rastreáveis.
- Para qualquer tarefa, buscar estado da main e PRs antes de escrever. Criar **branch/PR separado**, listar arquivos envolvidos, testes, SHA e reversão. Não trabalhar em arquivos alheios sem coordenação. Não alterar `main` sem checks aplicáveis verdes.
- Sempre classificar alegações como: **informado pelo usuário**, **encontrado no código**, **testado offline**, **CI verde**, **merged**, **Render live**, **Google/Stripe/Cloud confirmado externamente**, ou **pendente**.
- Repositórios privados exigem credenciais próprias em cada agente/conector: usuário humano é quem autoriza plugins/apps. Nunca solicitar token pessoal/admin por chat ou deixar chave no Markdown.
- Estado das conversas do ChatGPT não é um canal automático para Claude/Gemini; a documentação GitHub é a ponte comum e deve ser atualizada após mudança verificável.

**Documentação complementar:** [Estado atual](ESTADO-ATUAL.md) · [Coordenação IA](COORDENACAO-IA.md) · [Firebase](conexao-firebase-github.md) · [Auditoria 20 frentes](AUDITORIA-20-FRENTES-2026-10-27.md) · [Diagnóstico SEO](SEO-INDEXACAO-GSC-2026-10-27.md).
