# Registro de infraestrutura e autenticação — 17/10/2026

## Escopo e localização
Registro das alterações realizadas nos painéis de produção, autorizado pelo responsável. Não contém credenciais. Este documento não aplica infraestrutura automaticamente.

- Produção web: https://linvuu.com.br, serviço Render linvuu, repositório FelipeVRosa/Linvuu, branch main.
- Cloudflare: DNS/proxy do domínio; A raiz 216.24.57.1 e CNAME www → linvuu.onrender.com, ambos com proxy. Render verifica raiz e www e redireciona www para raiz.
- Firebase de produção: ID `linvuu`, conta Google empresarial da Linvuu (a conta Gmail cujo nome começa com hello.linvuu).
- Outro projeto: `linvuu-995d0`, na conta pessoal do responsável. Não foi apagado, migrado nem usado para substituir produção.
- Render e GitHub: conta pessoal do responsável. Cloudflare: conta Linvuu.
- Ter contas administrativas distintas não exige migrar projetos. Futuramente avaliar acesso de recuperação e responsáveis via permissões individuais, sem compartilhar senhas nem criar chaves irrestritas.
- Render permanece Free; Firebase de produção permanece Spark.

## Alterações aplicadas
1. Firebase Authentication, projeto linvuu: adicionado domínio autorizado `linvuu.com.br`, preservando www e os domínios padrão.
2. Habilitado provedor Google; Email/Password permaneceu habilitado.
3. Google Cloud: responsável salvou `https://linvuu.firebaseapp.com/*` nas restrições de sites da chave pública usada pelo aplicativo. Não registrar o valor da chave.
4. Render: Health Check Path passou de vazio para `/healthz`. A mudança iniciou reimplantação do mesmo commit 5250c694a6b1257ec92db4bc04860976c39506fa. Deploy dep-db9lr5rbc2fs73ccnp4g ficou live em 17/10/2026 às 08:37, horário de São Paulo.
5. Cloudflare: regra 9fdcc693d8544f9782d22b2c967b8282 no ruleset 01c5c0ced2ce4bba8a04747d6c045925 passou a `action_parameters: {cache:false}`, apenas para /robots.txt e /sitemap.xml. Antes forçava TTL de 3600 segundos no edge. A regra dos assets permaneceu intacta. Realizado purge somente das oito variantes HTTP/HTTPS, raiz/www desses dois arquivos.
6. Search Console: solicitação de novo rastreamento de https://linvuu.com.br/robots.txt enviada e confirmada na interface.

## Diagnóstico confirmado do login
A janela Firebase mostrava “The requested action is invalid”. Seu console registrava “Unable to verify that the app domain is authorized”.
Uma consulta pública da configuração Auth com a chave do bundle retornava 200 para Referer https://linvuu.com.br/ e 403 para https://linvuu.firebaseapp.com/ (API_KEY_HTTP_REFERRER_BLOCKED).
Após o responsável salvar a restrição, a segunda consulta passou a 200. Um novo clique em “Continuar com Google” no site abriu o seletor de contas Google, usando o callback linvuu.firebaseapp.com/__/auth/handler.
Login Google concluído e retorno ao site confirmado com o menu da conta do responsável. O perfil passou a ser criado no Firestore após a correção de regras descrita abaixo. Isso não valida pagamento ou acesso privado.

## Verificações realizadas
- Após reimplantação Render: /healthz, /, /entrar, /assinatura, /robots.txt, /sitemap.xml e MP3 público existente retornaram 200.
- /healthz retorna {"ok":true}.
- Antes e depois do ajuste Cloudflare, robots e sitemap corretos em produção, sem Age nos testes; robots retorna text/plain e sitemap XML válido.
- Origem Render e variantes HTTP/HTTPS/www chegam ao mesmo robots correto.
- MP3 público testado com origem Capacitor retornou ACAO correspondente. Não houve teste físico Android.
- VITE_FIREBASE_PROJECT_ID no Render = linvuu. FIREBASE_PROJECT_ID não existe diretamente no serviço; o código usa VITE_FIREBASE_PROJECT_ID como fallback. Não houve listagem de valores de todas as variáveis. Os metadados da credencial administrativa foram inspecionados com autorização, sem registrar a chave.
- Novo plugin Cloudflare permite leituras reais de DNS/regras/Workers. O conector Composio anterior falhava com erro 9106; Firebase Composio falhava com 403. Esses erros de conectores não eram prova de falha no serviço.
- Google Cloud Console estava inacessível no navegador do assistente (“Site Unavailable”); ajuste de restrição foi feito pelo responsável.

## Estado de rastreamento em 17/10, aproximadamente 09:05 (São Paulo)
Consulta atual da API Search Console:
- https://linvuu.com.br/: “Enviada e indexada”, robots ALLOWED, fetch SUCCESSFUL, canonical raiz, última coleta da página em 15/10 às 20:19:42 UTC.
- https://www.linvuu.com.br/: aviso “Indexada, mas bloqueada pelo robots.txt”, baseado na coleta antiga de 14/10 às 19:19:56 UTC. Hoje a URL redireciona para raiz.
- Relatório robots da interface mostrou ambos os arquivos conhecidos válidos, buscados, 101 bytes; HTTP verificado em 17/10 às 06:32 e HTTPS em 15/10 às 17:06, horários exibidos.
Não afirmar que o alerta www desapareceu, nem prometer prazo. Alterar Firebase não atualiza os relatórios de indexação. O cache edge anterior não foi demonstrado como causa do aviso antigo.

Robots vigente:
```text
User-agent: *
Allow: /
Disallow: /livro/
Disallow: /api/

Sitemap: https://linvuu.com.br/sitemap.xml
```
O arquivo é gerado por scripts/seo.mjs; editar só public/robots.txt pode ser sobrescrito no build.
A página /assinatura permanece com noindex; não foi alterada nesta sessão.

## Próximos passos
1. Login Google real e retorno ao site já confirmados; manter verificação de persistência.
2. Validar progresso autenticado e acesso privado, sem pagamentos reais.
3. Auditar regras Firestore/Storage e integrações administrativas no projeto linvuu; isso ainda não foi concluído.
4. Reavaliar aviso www depois de nova coleta do Google. Não reenviar repetidamente nem mexer em DNS sem evidência.
5. Não alterar ou apagar linvuu-995d0 até inventariar sua finalidade.
6. PR #263 Android segue em rascunho: compilação passou, testes em aparelho e preparação Play ainda pendentes.

## Complemento da auditoria — tarde de 17/10
- Regras publicadas anteriormente cobriam `usuarios/{uid}`, enquanto o cliente grava em `users/{uid}`. Foi adicionado bloco de perfil em users, preservando os blocos anteriores.
- Cada usuário autenticado pode ler o próprio perfil e criá-lo somente com nome/email limitados, email correspondente ao token, timestamp do servidor, xp/streak zero e lista de conclusões vazia. Atualizações do cliente limitadas ao nome; exclusão e alterações de progresso/privilégios não são permitidas. Progresso continua sob responsabilidade do servidor.
- A criação do perfil foi verificada no banco. A lista de conclusões permaneceu vazia nos testes anteriores à troca de credencial; não tratar progresso no navegador como prova de sincronização.
- A variável GOOGLE_APPLICATION_CREDENTIALS aponta para o arquivo montado correto. Porém, a conta de serviço contida nesse arquivo pertence a outro projeto Google Cloud, diferente de linvuu. Isso é uma divergência: acesso entre projetos pode funcionar com IAM explícito, mas essa permissão não pôde ser auditada porque o Google Cloud Console estava indisponível neste navegador.
- Após autorização, foi gerada uma credencial da conta Firebase Admin SDK pertencente ao projeto linvuu e instalada exclusivamente no secret file do serviço Render. Não registrar JSON, chave privada, identificador de chave ou tokens neste repositório.
- Deploy de configuração iniciado: dep-db9rd2fbtjjs73cptlfg, mesmo commit 5250c694a6b1257ec92db4bc04860976c39506fa. Deploy finalizado com status live às 14:57:21 (São Paulo).
- Não houve transferência de propriedade de contas, alteração de pagamentos ou publicação do Android. Centralizar contas exige inventário de DNS, faturamento, propriedade e recuperação; e-mails diferentes, isoladamente, não são causa de falhas técnicas.

### Validação após instalação
- Login do responsável confirmado em produção. Marcada a sessão 1 de inglês pelo botão normal do site (sessão que o responsável já havia concluído). Firestore exibiu `en:1` na lista de conclusões do perfil: a gravação no servidor foi comprovada.
- Após recarregar a página, o site manteve o login e exibiu 1 de 248 sessões concluídas. Isso comprova a gravação na nuvem e persistência observada neste navegador; não equivale a um teste físico entre aparelhos.
- Testes com parâmetro único e Cache-Control no-cache: healthz, robots, sitemap, home, assinatura, entrar e MP3 público existente retornaram 200; tipos JSON/text/plain/XML/HTML/audio/mpeg corretos. O MP3 respondeu ao Origin do próprio site sem necessidade de ACAO por ser mesma origem.
- Nenhum pagamento real ou teste de Android físico foi executado. Acesso pago, Storage completo, IAM detalhado e migração de propriedade não estão validados por esses testes.
- A credencial anterior pertence a outro projeto; não atribuir a causa a e-mails diferentes. A troca pela conta administrativa de produção fez a gravação funcionar, mantendo o código e as regras já publicados.
- Pendente revisar/remover chaves antigas no IAM e arquivo secreto redundante após inventário, sem apagar credenciais utilizadas por outros sistemas. O Google Cloud Console segue inacessível neste navegador.
