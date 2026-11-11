# Linvuu

Plataforma **internacional** de ensino de idiomas (português, inglês e espanhol; ver [docs/DECISAO-SITE-INTERNACIONAL.md](docs/DECISAO-SITE-INTERNACIONAL.md)) com **frontend React + Vite + TypeScript**, servidor **Node.js/Express** e versões web e Android tratadas separadamente. Código no repositório público; site: https://linvuu.com.br.

**O estado verificável fica em [docs/ESTADO-ATUAL.md](docs/ESTADO-ATUAL.md)**. Registros antigos, como `docs/historico/CONTEXTO.md`, não substituem o código, CI e as consultas de produção. Não tratar recursos em rascunho como lançados.

## Onde fica cada coisa (site × app)

Um repositório só, como manda a convenção do Capacitor: o site e o app Android compartilham aulas, livros, idiomas, login e servidor; o que muda é a interface.

| Pasta | O que é | Quem usa |
|---|---|---|
| `src/plataforma/website/` | Interface do **site** (linvuu.com.br e linvuu.com) | site |
| `src/plataforma/apk/` | Interface do **app Android** (primeira abertura, abas, sessões, ajustes) | app |
| `src/lib/`, `src/i18n/`, `src/config/`, `src/components/` | Código compartilhado: aulas, progresso, login, textos, preços | site e app |
| `android/` | Casca nativa do app (Gradle, manifesto, ícones). `npm run build:apk` gera `dist-apk/`, que o Capacitor copia para cá | app |
| `server/`, `server.ts` | Servidor (Render): API, cobrança, áudio privado, avaliações | site e app |
| `content/` | Aulas, gramática e livros | site e app |
| `public/` | Arquivos do site (o app leva só imagens e fontes; áudio vem do servidor) | site |
| `docs/` | Decisões e registros. App: `docs/APP.md`, `docs/COBRANCA-APP.md`, `docs/RELEASE-PLAY-20261024.md`, `docs/APP-PRIMEIRA-ABERTURA-2026-11-08.md` | — |

**Livros (e-books):** os livros A1–A2 da Coleção Linvuu (texto-fonte, diagramação e PDFs) ficam no repositório privado `FelipeNascimentoRosa/linvuu-livros-em-pdf`; o catálogo está no README de lá. Aqui ficam só os capítulos usados pelo site (`content/`).

Gerado e nunca versionado: `dist/`, `dist-apk/`, `android/app/build/`, `android/app/src/main/assets/public/`, `revisao-publica/`.

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

- [AGENTS.md](AGENTS.md): fonte comum para ChatGPT/Codex, Claude, Cursor, Antigravity e DeepSeek.
- [PAINEL.md](PAINEL.md): o que está aberto, reprovado ou bloqueado hoje. Leia antes de escolher a tarefa.
- [CLAUDE.md](CLAUDE.md): entrada de Claude e critério de evidência.
- [DEEPSEEK.md](DEEPSEEK.md): entrada de DeepSeek v4.1; contrato em [docs/PROMPT-MESTRE-DEEPSEEK-v4.1.md](docs/PROMPT-MESTRE-DEEPSEEK-v4.1.md).
- [docs/COORDENACAO-IA.md](docs/COORDENACAO-IA.md): coordenação entre agentes, com o estado dos PRs medido por API.
- [docs/AUDITORIA-SITE-2026-11-11.md](docs/AUDITORIA-SITE-2026-11-11.md): o que está errado no site, medido em 11/11/2026 nos 54 URLs dos dois sitemaps e no Search Console (registro atribuído a DeepSeek v4.1 Flash).
- [docs/conexao-firebase-github.md](docs/conexao-firebase-github.md): estado e limites da auditoria Firebase.
- `firestore.rules` e `firebase.json`: regras versionadas e configuração do emulador. **Nenhum deploy Firestore automático é executado por este README.**

**Não inserir chaves JSON, tokens de usuário, relatórios de IAM ou dados pessoais em issues/PRs públicos.** Não assumir que um workflow verde significa que a versão Android foi assinada, testada em aparelho ou publicada.
