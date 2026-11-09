# Auditoria do app Linvuu

Checklist para conferir o que foi entregue e o que falta. Estados:
- ✅ confirmado (com a evidência ao lado)
- ⚠️ parcial
- ❌ falta ou não existe
- ❓ ainda não verificado (depende de você ou de um aparelho real)

Quem marca: você. Atualize o estado e a data quando verificar.

## 1. Infraestrutura (Render e site)
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 1.1 | Site `linvuu.com.br` responde (de outra rede) | ❓ | Sessão do assistente não conseguiu acessar (bloqueio de saída). Teste de outro celular/rede: `https://linvuu.com.br/healthz` deve devolver `{"ok":true}` |
| 1.2 | Serviço no Render ativo | ❓ | Workspace "Linvuu" existe, mas não foi consultado (o assistente pede confirmação antes de agir no workspace) |
| 1.3 | Último deploy bem-sucedido | ❓ | Render → serviço → Events |
| 1.4 | Variáveis de ambiente corretas (Firebase Admin, Stripe, Gemini não usada) | ❓ | Render → Environment. `STRIPE_SECRET_KEY` deve ser de teste até o lançamento |
| 1.5 | CORS libera as origens do app | ✅ | `server/seguranca.ts` (`ORIGENS_APP`: `https://localhost`, `capacitor://localhost`, `http://localhost`). Testado em `npm run testar:seguranca` |
| 1.6 | DNS aponta para o Render | ❓ | `nslookup linvuu.com.br` e painel do Registro.br |
| 1.7 | Certificado SSL válido | ❓ | Cadeado no navegador |
| 1.8 | Health check configurado no Render | ❓ | Render → Settings → Health Check Path = `/healthz` |

## 2. Firebase
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 2.1 | Projeto Firebase ativo | ❓ | Console Firebase |
| 2.2 | Login por e-mail e senha habilitado | ❓ | Authentication → Sign-in method |
| 2.3 | Login com Google habilitado | ⚠️ | Oculto até `VITE_AUTH_GOOGLE=true`. Não funciona no app (WebView) — ver 4.7 |
| 2.4 | `localhost` nos domínios autorizados | ❌ | Authentication → Settings → Authorized domains. Necessário para o login no app |
| 2.5 | `google-services.json` no projeto Android | ❌ (não é necessário agora) | Só será preciso quando o plugin nativo de login for adicionado |
| 2.6 | SHA-1/SHA-256 de debug e release no Firebase | ❌ (só com o login nativo) | Necessário para o login Google nativo; ainda não há keystore |
| 2.7 | Regras do Firestore publicadas | ⚠️ | O arquivo `firestore.rules` foi endurecido no repositório, mas a publicação no Console não foi confirmada |
| 2.8 | Regras de Storage | ➖ | O projeto não usa Storage |
| 2.9 | App Android registrado no Firebase com o mesmo package name | ❌ | Console → Configurações → Adicionar app Android com `com.linvuu.app` |

## 3. Stripe
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 3.1 | Chaves de produção só no lançamento | ❓ | Você configura quando estiver pronto (combinado). Hoje, confirmar que não é live |
| 3.2 | Webhook do Stripe | ➖ (não existe) | O servidor não recebe webhook: a assinatura é consultada na API do Stripe (`server/billing.ts`). Se um dia houver webhook, ele precisa de verificação de assinatura |
| 3.3 | Assinatura existente continua valendo | ❓ | Teste com uma conta com assinatura |
| 3.4 | Compra desligada dentro do app | ✅ | `compraNoAppDisponivel()` em `src/lib/assinatura.ts` e a checagem em `abrir()`. Não testado em aparelho |
| 3.5 | Decisão de cobrança da loja (Google Play / App Store) | ❌ | Pendência de decisão (ver `docs/APP.md`) |

## 4. App Android
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 4.1 | APK gera pelo GitHub Actions | ✅ | Workflow "App Android (APK de pré-lançamento)" concluído com sucesso no PR 186 |
| 4.2 | APK instala em aparelho real | ❓ | Baixe o artefato `linvuu-debug-apk` (Actions) e instale |
| 4.3 | App abre sem tela em branco | ❓ | Teste no aparelho |
| 4.4 | Áudios tocam sem internet | ⚠️ | Estão no pacote (`public/audio`), mas não testado. O pacote é grande: ver 4.16 |
| 4.5 | Chamadas de API funcionam dentro do app | ❓ | Teste no aparelho (depende de 1.1 e 1.5) |
| 4.6 | Login por e-mail funciona | ❓ | Teste no aparelho (depende de 2.4) |
| 4.7 | Login Google funciona | ❌ | Bloqueado no WebView. Precisa do plugin nativo (ex.: Firebase Authentication para Capacitor), após verificar que o plugin está mantido |
| 4.8 | Botão voltar do Android | ❓ | Teste no aparelho |
| 4.9 | Área segura (notch, barra de gestos) | ❓ | Teste no aparelho; `index.html` usa só `width=device-width`, sem `viewport-fit=cover` |
| 4.10 | Ícone e splash | ❌ | Não criados |
| 4.11 | Keystore de release | ❌ | Não criada. Guardar em GitHub Secrets; nunca no repositório |
| 4.12 | `versionCode` e `versionName` | ⚠️ | `versionCode 1` e `versionName "1.0"`: padrão do Capacitor. Subir `versionCode` a cada envio à loja |
| 4.13 | Package name `com.linvuu.app` definitivo | ❓ | Decisão sua. Trocar depois do registro no Firebase é trabalhoso |
| 4.14 | Versão mínima do Android | ✅ | `minSdkVersion 24` (Android 7) e `targetSdkVersion 36` em `android/variables.gradle` |
| 4.15 | Tratamento de perda de conexão | ❌ | Não há tela de erro offline; o app pode mostrar tela vazia |
| 4.16 | Tamanho do APK | ❓ | Com 2.552 MP3 empacotados, o APK pode ficar grande. Medir o artefato e decidir (baixar áudios sob demanda ou um AAB) |
| 4.17 | iOS | ❌ | Não criado (exige macOS e conta Apple) |

## 5. Segurança
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 5.1 | `npm audit` em 0 na `main` | ✅ (no PR 186) | CI da `main` inclui `npm audit --omit=dev --audit-level=high`; o workflow de Segurança roda `npm audit --audit-level=moderate`. Rodar de novo após cada `npm install` |
| 5.2 | Nenhuma chave no histórico | ✅ | Varredura gitleaks no workflow de Segurança (sem achados no PR 186) |
| 5.3 | `.env*` no `.gitignore` | ✅ | `.gitignore` linha `.env*` |
| 5.4 | Alertas e atualizações do Dependabot ligados | ❓ | Settings → Code security. O assistente não tem acesso a essa tela |
| 5.5 | Proteção da `main` | ❌ | Exige GitHub Pro em repositório privado |
| 5.6 | Secrets do GitHub configurados | ❓ | Settings → Secrets. O workflow de app não usa segredos ainda |
| 5.7 | Limite de requisições | ✅ | `server/seguranca.ts`: 30/min cobrança, 120/min sessões, 300/min resto da API. Testado |
| 5.8 | Cabeçalhos de segurança e CSP | ✅ | Testado em `npm run testar:seguranca` |
| 5.9 | Crash reporting e analytics | ❌ | Não há Crashlytics nem Sentry. Sem isso, erros em aparelho não chegam a você |
| 5.10 | 2FA em GitHub, Render, Google, Stripe e Registro.br | ❓ | Você verifica em cada painel |

## 6. Conteúdo e áudio
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 6.1 | Português (curso `br`) com 62 aulas e 2.552 áudios | ✅ | Índice e `public/audio/br` no `main` |
| 6.2 | Áudios de espanhol, alemão, russo e outros | ✅ | Gerados e publicados (ver `docs/FUTURAS-MUDANCAS.md`) |
| 6.3 | Áudios revisados por nativo | ❌ | Pendente em todos os idiomas |
| 6.4 | ElevenLabs | ❌ | Ainda não contratado. Confirme o custo por caractere antes de gerar conteúdo novo |
| 6.5 | Revisão jurídica dos livros de referência | ❌ | Pendente |

## 7. Build e CI
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 7.1 | CI verde na `main` | ✅ | Último CI da `main` concluído com sucesso |
| 7.2 | Build do site em produção | ✅ | `npm run build` |
| 7.3 | Teste de segurança do servidor | ✅ | `npm run testar:seguranca` no CI |
| 7.4 | Teste de ponta a ponta (login, aula paga, compra) | ❌ | Não existe ainda |

## 8. Documentação
| # | Item | Estado | Como verificar / evidência |
|---|---|---|---|
| 8.1 | `docs/APP.md` explica como gerar o app | ✅ | |
| 8.2 | `docs/FUTURAS-MUDANCAS.md` | ✅ | Roteiro com inglês, espanhol, ElevenLabs, Stripe, login, app |
| 8.3 | `docs/SEGURANCA.md` | ✅ | |
| 8.4 | README menciona o app | ❌ | Ainda não |
| 8.5 | Como gerar keystore e assinar | ❌ | Não documentado ainda |
| 8.6 | Passos para publicar na Play Store | ❌ | Não documentado ainda |

## Perguntas em aberto (respostas que só você pode dar)
1. O site responde de outra rede? (1.1)
2. O serviço no Render está ativo e com o último deploy verde? (1.2, 1.3)
3. Qual é o package name definitivo do app? (4.13)
4. O domínio `localhost` foi adicionado no Firebase? (2.4)
5. As regras do Firestore foram publicadas? (2.7)

## Sobre um segundo serviço no Render
Não é necessário agora. O app e o site usam a mesma API. Um serviço de **homologação** (staging, por exemplo `staging.linvuu.com.br`) faz sentido antes de publicar o app na loja, para testar atualizações sem afetar os usuários. Tem custo mensal; decida quando o app estiver testado em aparelho.
