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
