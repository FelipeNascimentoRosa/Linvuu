# Linvuu

Plataforma **internacional** de ensino de idiomas (português, inglês e espanhol; ver [docs/DECISAO-SITE-INTERNACIONAL.md](docs/DECISAO-SITE-INTERNACIONAL.md)) com **frontend React + Vite + TypeScript**, servidor **Node.js/Express** e versões web e Android tratadas separadamente. Código no repositório público; site: https://linvuu.com.br.

**O estado verificável fica em [docs/ESTADO-ATUAL.md](docs/ESTADO-ATUAL.md)**. Registros antigos, como `docs/CONTEXTO.md`, não substituem o código, CI e as consultas de produção. Não tratar recursos em rascunho como lançados.

## Executar e validar

```bash
npm ci
npm run lint
npm run build:website
npm run build:apk
npm run testar:plataformas
```

- `npm run dev`: desenvolvimento com `tsx server.ts`.
- `npm run build`: valida o conteúdo, executa o gerador de SEO e compila o frontend web.
- `npm run testar:regras`: executa os testes de regras Firestore **em emulador**, sem provar as regras publicadas no Firebase.
- `npm run testar:newsletter` e `npm run testar:newsletter:rota`: testes de validação e rota; o segundo usa emulador.
- `npm run validar:design`: verificações automatizadas de design.
- `npm run build:apk`: build da variante de interface Android; **não** substitui a compilação Gradle, assinatura ou teste em aparelho.

Mais scripts e versões em [package.json](package.json). Testes da `main` só comprovam o commit executado, não funcionalidades externas (checkout, login real ou aparelho Android).

## Operação comprovada (27/10/2026)

- `main` **3431e440**: [CI](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/40453761867) e [Segurança](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/40453762120) aprovadas.
- Render: deploy de **3431e440** confirmado `live` (serviço `linvuu`), não é aprovação automática de autenticação e pagamentos.
- GitHub → Google Cloud: [teste OIDC público](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase/actions/runs/40460208259) aprovado para **identidade temporária e número do projeto `linvuu`**. A equivalência de `firestore.rules` com as regras publicadas **ainda não está comprovada**.
- O repositório separado [Linvuu-Auditoria-Firebase](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase) está **público**. Seu job de coleta detalhada IAM/Firestore é intencionalmente bloqueado no modo público; não removê-lo para obter logs sensíveis.
- Livros futuros, novos níveis e gamificação permanecem fora do deploy atual (PRs em rascunho #360 e #367).

## Arquivos e instruções

- [AGENTS.md](AGENTS.md): fonte comum para ChatGPT/Codex, Claude, Cursor e Antigravity.
- [CLAUDE.md](CLAUDE.md): entrada de Claude e critério de evidência.
- [docs/COORDENACAO-IA.md](docs/COORDENACAO-IA.md): coordenação entre agentes.
- [docs/conexao-firebase-github.md](docs/conexao-firebase-github.md): estado e limites da auditoria Firebase.
- `firestore.rules` e `firebase.json`: regras versionadas e configuração do emulador. **Nenhum deploy Firestore automático é executado por este README.**

**Não inserir chaves JSON, tokens de usuário, relatórios de IAM ou dados pessoais em issues/PRs públicos.** Não assumir que um workflow verde significa que a versão Android foi assinada, testada em aparelho ou publicada.
