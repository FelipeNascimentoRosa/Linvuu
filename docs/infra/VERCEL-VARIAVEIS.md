# Variáveis de ambiente na Vercel (migração Render → Vercel)

**Regra de segurança:** os segredos colam-se **directamente no painel da Vercel** como
Sensitive; **nunca** em chat, no GitHub ou num ficheiro do repo.

**Âmbitos:** Production + Preview para todas (as `VITE_*` têm de existir **antes** do
build, porque são embutidas no bundle do cliente; as de runtime também são precisas nos
previews da função). Development: só para quem corre `vercel dev` — opcional.

**Pré-requisito:** o `render.yaml` **não** é a lista completa. Antes do primeiro deploy,
exportar a lista completa de variáveis do painel do Render e confrontar com esta tabela
— as de §2 podem existir lá (e têm de ser copiadas) ou não existir (e nesse caso há
funcionalidades desligadas hoje, que a migração regista mas não "arranja").

## 1. As que estão no `render.yaml`

| Variável | Tipo na Vercel | Notas |
|---|---|---|
| `NODE_ENV` | Config | A Vercel já define `production` por omissão; confirmar no preview. |
| `APP_URL` | Config | **Manter exactamente `https://linvuu.com.br`** — o `/readyz` falha com outro valor. |
| `STRIPE_SECRET_KEY` | **Sensitive** | Painel Stripe. |
| `STRIPE_PRICE_ID` | **Sensitive** | `price_…` da mensal em reais. |
| `STRIPE_WEBHOOK_SECRET` | **Sensitive** | Painel Stripe → endpoint do webhook. A URL do webhook **não muda** (`https://linvuu.com.br/api/stripe/webhook`). |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | **Sensitive** | O JSON inteiro da service account (Firebase Console). É daqui que sai o `projectId` do Firebase do Linvuu. |
| `VITE_FIREBASE_API_KEY` | Sensitive | Firebase Console (chave pública do cliente, mas vai no build). |
| `VITE_FIREBASE_AUTH_DOMAIN` | Config | Firebase Console. |
| `VITE_FIREBASE_PROJECT_ID` | Config | Firebase Console. |
| `VITE_FIREBASE_APP_ID` | Config | Firebase Console. |
| `VITE_FIREBASE_STORAGE_BUCKET` | Config | Firebase Console. |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Config | Firebase Console. |
| `VITE_AUTH_GOOGLE` | Config | `true`. |
| `AUDIO_DEPLOY_KEY` | **Sensitive** | Chave SSH base64 (só leitura) do repo privado Linvuu-Audio. No build da Vercel só valida o acesso (`scripts/validar-audio-privado.mjs`); o áudio vem do R2. |
| `AUDIO_REPO_TOKEN` | **Sensitive** | Token fine-grained (só leitura) do Linvuu-Audio, alternativa à chave. |

## 2. Usadas no código mas AUSENTES do `render.yaml` — verificar no Render

| Variável | Se não existir hoje |
|---|---|
| `STRIPE_PRICE_ID_USD` | **A mensal em dólares (linvuu.com) não é vendida** — o checkout USD dá erro. O `/readyz` continua verde e só deixa um aviso no log. Gap pré-existente, não da migração. |
| `REVENUECAT_SECRET_KEY` | Subscrições Google Play não funcionam (`/api/play/*` desliga). **Sensitive** (só chave `sk_`). |
| `REVENUECAT_ENTITLEMENT` | Omissão segura (omissão `'Premium'`). |
| `REVENUECAT_ACEITAR_SANDBOX` | Omissão segura (omissão `false`). |
| `METRICAS_TOKEN` | `/api/metricas` dá 404. **Sensitive** (≥ 24 caracteres). |
| `ANDROID_PLAY_SHA256` | `/.well-known/assetlinks.json` dá 503 ("Certificado Play App Signing não configurado") — é o estado actual; não é um problema de indexação web. Só se quiser os app links a funcionar (SHA-256 do Play Console). |
| `POSTHOG_TOKEN`, `POSTHOG_HOST`, `VITE_POSTHOG_TOKEN`, `VITE_POSTHOG_HOST` | Sem PostHog não há eventos de compra no analytics. |
| `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_GRAPH_VERSION`, `META_TEST_EVENT_CODE` | Sem eles não há envio de conversões ao Meta. `META_CAPI_TOKEN` é **Sensitive**. |
| `TIKTOK_PIXEL_ID`, `TIKTOK_ACCESS_TOKEN`, `TIKTOK_TEST_EVENT_CODE` | Idem para o TikTok. `TIKTOK_ACCESS_TOKEN` é **Sensitive**. |
| `VITE_AUDIO_BASE_URL` | Omissão segura (omissão `https://linvuu.com.br/audio`). |
| `VITE_API_BASE_URL` | Omissão segura (omissão `''` na web, `https://linvuu.com.br` no APK). |
| `CSP_MODO` | Opcional (`'report'` = report-only). |
| `FIREBASE_PROJECT_ID` | Alternativa ao `VITE_FIREBASE_PROJECT_ID`; opcional. |
| `AUDIO_REPO` | Omissão segura (omissão `FelipeNascimentoRosa/Linvuu-Audio`). |
| `GOOGLE_APPLICATION_CREDENTIALS` | **Não usar na Vercel** (não há ficheiro de credenciais) — manter só `FIREBASE_SERVICE_ACCOUNT_JSON`. |
| `ELEVENLABS_API_KEY` | Só para gerar áudio (não é runtime do site). Não precisa de estar na Vercel. |

## 3. Novas — áudio pago no R2 (docs/infra/R2-AUDIO-PRIVADO.md)

| Variável | Tipo na Vercel | Notas |
|---|---|---|
| `R2_ACCOUNT_ID` | Config | ID da conta Cloudflare (o subdomínio de `<conta>.r2.cloudflarestorage.com`). |
| `R2_BUCKET` | Config | `linvuu-audio`. |
| `R2_ACCESS_KEY_ID` | **Sensitive** | Token de API do R2 (Object Read & Write no bucket). |
| `R2_SECRET_ACCESS_KEY` | **Sensitive** | Idem — só aparece uma vez na criação. |
| `R2_URL_EXPIRACAO_SEGUNDOS` | Config | Opcional; omissão `60`. |

Sem as variáveis do R2, a rota `/api/audio` cai para o disco (comportamento do Render).
Com elas, o áudio sai do bucket privado por URL pré-assinada.
