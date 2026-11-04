# Firebase — operação verificada e limites da auditoria (27/10/2026)

## Situação exata

**Projeto de produção:** `linvuu` / número `982052790317`. **Não usar** `linvuu-995d0`.

**Contas humanas:** `hello.linvuu@gmail.com` e `felipevaleevarosa@gmail.com` tiveram o papel `roles/owner` confirmado por `gcloud projects get-iam-policy linvuu`, mostrado pelo proprietário no Cloud Shell. A instalação/checagem feita de cada conta retornou `CONFIGURACAO_GCP_VERIFICADA`, sem criar chaves JSON permanentes.

**Federação GitHub → Google Cloud:** [run 40460208259](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase/actions/runs/40460208259) concluiu com `success`. Foram executados os testes offline, autenticação OIDC temporária e `gcloud projects describe linvuu`, confirmando o projeto pelo número. **OIDC FUNCIONA** para esse teste restrito.

**O que isso NÃO comprova:** regras Firestore publicadas, equivalência ao arquivo versionado, IAM abrangente, login real, segurança de documentos ou checkout. O acesso desta sessão de ChatGPT não é uma sessão Google Cloud de administrador.

## Repositórios e limites de publicidade

- Produto: [FelipeNascimentoRosa/Linvuu](https://github.com/FelipeNascimentoRosa/Linvuu) — **público**; web e APK atuais. O antigo workflow público de auditoria detalhada `.github/workflows/auditoria-firebase.yml` foi **aposentado nesta limpeza** por apontar ao provider e conta antigos, além de bloquear execução no repositório público.
- Auditoria: [FelipeNascimentoRosa/Linvuu-Auditoria-Firebase](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase) — **atualmente público**. Código e teste OIDC não sensível residem aqui.
- No repositório de auditoria, usar `testar_oidc_publico=true`, `executar_auditoria=false` permite verificar somente o ID do projeto.
- O job de coleta detalhada de IAM/Firestore **exige que o repositório seja privado**; enquanto público, é **skipped por condição**, intencionalmente. Nunca contornar esse gate ou fazer upload de policies/relatórios como artifact público.
- Uma alternativa segura sem alterar visibilidade é ler somente um **resultado resumido** (booleanos e contagens não sensíveis) a partir do Cloud Shell do proprietário, sem colar políticas, dados de usuários nem JSON com credenciais. A coleta detalhada precisa de canal privado apropriado.

## Identidade OIDC atual (repositório de auditoria)

- Pool: `linvuu-audit-private`.
- Provider: `github-private`.
- Conta de serviço: `auditoria-privada@linvuu.iam.gserviceaccount.com`.
- Papel: `projects/linvuu/roles/linvuuAuditoriaConfig`, apenas leitura de configurações/metadados.
- A condição associa os IDs numéricos `1435293296` (repositório), `204771338` (proprietário), `refs/heads/main` e o caminho exato do workflow. A conta e o provider **antigos** (`auditoria-github`, `linvuu-auditoria/github-main`) são legado; não remover vínculos IAM antigos automaticamente, sem auditoria de uso, mas não os utilizar em novas ações.

## Firestore: o que fazer antes de publicar qualquer regra

1. Entre em [Firebase Console, projeto `linvuu`](https://console.firebase.google.com/project/linvuu/firestore) com uma das contas proprietárias.
2. Abra **Firestore Database → Rules** e confira a regra **publicada**, a data e se está no banco `(default)`. Não clique em `Publish` por reflexo.
3. Compare **integralmente** a regra publicada com [`firestore.rules` na main](https://github.com/FelipeNascimentoRosa/Linvuu/blob/main/firestore.rules). Em especial: somente `users/{uid}` do próprio usuário pode ser lido, criação com campos validados, atualização somente do nome, e demais caminhos negados ao cliente. Isso é a intenção versionada; falta comprovação em produção.
4. O arquivo `firebase.json` do repositório aponta para `firestore.rules`; o teste `npm run testar:regras` usa emulador e **não publica regras**.
5. Se houver diferença, **não publique sem revisar** os impactos nas coleções e no fluxo de cadastro. Se for necessário um deploy de regras, usar autenticação da conta proprietária, confirmar o projeto e publicar **somente** as regras, depois reabrir a aba Rules para verificar o resultado. Nunca enviar service account JSON a chats, issues ou logs.
6. Em Firestore **Data**, validar apenas com contas de teste e permissões corretas; não criar nem excluir coleções reais como passo de auditoria.
7. Em Authentication, validar provedores e domínios autorizados separados de Firestore; isso não se conclui pelo teste OIDC do GitHub.

## Evidência e continuação

Para comparar por Cloud Shell com credencial humana, pode primeiro conferir:

```bash
gcloud config set project linvuu
gcloud firestore databases list --project=linvuu --format="table(name,locationId,type)"
```

Este comando só lista **metadados de bancos**. Não demonstra igualdade das regras publicadas.

**Não fazer:** migrar para outro projeto, publicar regras antigas sem comparar, conceder `roles/owner` à conta de auditoria, gerar chave de serviço persistente, copiar policies IAM para um repositório público ou alegar que uma execução `success` validou automaticamente toda a segurança do Firebase.
