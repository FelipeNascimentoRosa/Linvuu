# App Linvuu (Android e iOS)

## Como o app é feito
- **Capacitor** empacota o frontend Android em um app nativo. A interface do APK é separada da interface web; bibliotecas de conteúdo e autenticação são compartilhadas.
- As chamadas à API (`/api/billing/*`, `/api/aula/*`) vão para `https://linvuu.com.br`, com o token do Firebase no cabeçalho. O servidor confere o token e a assinatura; o app nunca decide acesso sozinho.
- Os áudios vêm de `https://linvuu.com.br/audio` e precisam de internet. Não há download offline de áudio nesta versão. O progresso local pode ser recuperado sem rede; isso não disponibiliza gravações offline.
- Origens liberadas no servidor para o app: `https://localhost`, `capacitor://localhost`, `http://localhost` (ver `server/seguranca.ts`).
- Compra **desligada** dentro do app (`compraNoAppDisponivel()` em `src/lib/assinatura.ts`) até a decisão sobre cobrança pela loja (ver abaixo).

## Como gerar o app
| O que | Como |
|---|---|
| Android (APK de pré-lançamento) | GitHub → Actions → **App Android (APK de pré-lançamento)** → Run workflow. Baixe o APK da Release em rascunho indicada no resumo da execução (alternativa ao artifact quando há limite de armazenamento) e instale no aparelho (ative "instalar apps desconhecidos"). |
| Android (no seu computador) | `npm install` e depois `npm run app:android`. Abra a pasta `android/` no Android Studio e rode em um emulador ou aparelho. Requer JDK 21 e Android SDK. |
| iOS | Ainda não criado. Exige macOS e Xcode, e uma conta de desenvolvedor Apple. |

## Publicação nas lojas
Plano completo, com decisões e checklist: `docs/LANCAMENTO.md`.

## Antes de publicar nas lojas
1. **Cobrança.** Conteúdo digital vendido dentro do app precisa usar a cobrança da loja (Google Play Billing; no iOS, compra no app da Apple). Não é permitido vender a assinatura Stripe dentro do app. Opções: (a) integrar a cobrança da loja e o servidor reconhecer a compra; (b) publicar o app sem venda e deixar a assinatura no site. Verifique as regras vigentes antes de decidir, porque elas mudam e variam por país.
2. **Login com Google** dentro do app: o popup não funciona no WebView. Usar o plugin nativo do Firebase.
3. **Firebase:** adicionar `localhost` nos domínios autorizados (Authentication → Configurações).
4. **Conteúdo:** o Google Play exige utilidade, estabilidade e experiência adequada. Capacitor não implica rejeição automática. Downloads e lembretes são melhorias planejadas, não garantia de aprovação.
5. **Assinatura de release:** gerar uma keystore, guardar em GitHub Secrets (nunca no repositório) e configurar o `signingConfig` no `android/app/build.gradle`.
6. **Ícone e splash:** usar a marca oficial, sem emoji nem bandeiras.
7. **Política de privacidade e exclusão de conta** publicadas (ver `docs/SEGURANCA.md`, item 4).

## Auditoria
Checklist com o estado de cada item e as perguntas em aberto: `docs/AUDITORIA-APP.md`.

## Não feito ainda
- iOS (exige Mac).
- Ícone, splash, assinatura de release e ficha de loja.
- Cobrança pela loja.
- Login com Google no app.

## Firebase no build e limites de sincronização
- `npm run app:android` falha antes de compilar se faltar configuração pública Firebase. O workflow recebe `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID` e `VITE_FIREBASE_APP_ID` de Secrets ou Variables. Bucket e remetente são opcionais neste fluxo.
- Não usar conta de serviço, chave privada ou token administrativo em variáveis `VITE_*`: tudo que Vite usa no cliente pode entrar no APK.
- Presença das variáveis não prova login funcional: validar provedor e-mail/senha, restrições da chave, domínios e autorização do servidor com uma conta de teste.
- A conta sincroniza dias concluídos. Posição exata no bloco, respostas parciais e revisão de erros permanecem locais; não prometer restauração desses dados em outro aparelho.
- Validação física pendente: entrar e reabrir, modo avião com sessão existente, concluir offline e reconectar, entrar num segundo aparelho e conferir dias concluídos. Não esperar login inicial ou áudio remoto sem rede.
- Build de loja está bloqueado no Gradle até configurar assinatura de produção e verificação do manifesto final (pacote, nome sem Teste e ausência de depuração). Debug continua separado como `com.linvuu.app.teste`.
