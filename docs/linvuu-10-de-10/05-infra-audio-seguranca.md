# 05 — Infra, áudio privado, segurança e variáveis

Leia antes de mexer em Vercel, Cloudflare, R2, `/api/audio`, autenticação, cobrança ou segredos. **Trava ativa** em `vercel.json`, DNS, Cloudflare e R2 (ver `00-INDICE.md` §2). Os valores de variáveis **nunca** entram em chat, arquivo, print ou commit; abaixo só **nomes**.

## 1. Arquitetura de produção
- Node 24.x (`package.json` `engines`; `.nvmrc` fixa 22 no CI local — confira antes de mudar), Express 5 (`server.ts`, `server/app.ts`), build Vercel: `npm run build:vercel` (valida áudio privado, `conteudo.mjs --check`, `travas-en`, `seo.mjs`, `vite build`, prerender com Playwright, `validar-prerender`, `comprimir`, `mover-arquivos-servidor`, esbuild de `server/vercel-entry.ts` → `api/index.mjs`).
- `vercel.json`: `functions["api/index.mjs"].includeFiles` **precisa ser string glob** (`{content/**,conteudo/gramatica-ru.html,server-files/**,server-files/.vite/manifest.json}`); o formato array/objeto quebrou o deploy. Região `gru1`, `maxDuration` 60.
- Documentação existente: `docs/infra/VERCEL.md`, `docs/infra/VERCEL-VARIAVEIS.md`, `docs/infra/R2-AUDIO-PRIVADO.md`, `docs/AUDIO-PRIVADO.md`, `docs/DOMINIOS-PUBLICOS-AUDITORIA-2026-11-24.md`.
- Cloudflare: DNS Only (nuvem cinza) → Vercel, SSL Full (Strict), `www` 301 → apex nos dois domínios; Worker `linvuu-keepalive` sem agendamento; encaminhamento de e-mail para a caixa do Felipe.

## 2. Áudio privado — contrato (não regredir)
Código: `server/audio-rota.ts` (`criarRotaAudio`), `server/audio-r2.ts`, `server/audio-privado.ts`, `scripts/enviar-audio-r2.ts`, `scripts/validar-audio-privado.mjs`.
1. **Ordem:** `autorizar` (401 sem credencial, 403 sem assinatura) **antes** de `buscarR2`/`buscarDisco`. Antes da #643 a rota consultava o R2 primeiro (enumeração de arquivos e custo de operações por anônimos).
2. Web: 302 para URL pré-assinada, `Cache-Control: private, no-store`. Arquivo inexistente para assinante → 404.
3. APK (`Origin: https://localhost`): a API busca no R2 e **transmite** 200/206 repassando `Range` (`Content-Range`, `no-store`); redirect cross-origin faria o WebView enviar `Origin: null`.
4. R2: bucket `linvuu-audio` privado, **sem** `r2.dev`, **sem** custom domain, CORS só para `https://linvuu.com.br`, `https://linvuu.com` e `https://localhost`, métodos GET/HEAD. **Nunca** `Origin: null`, nunca `*`.
5. 11.033 MP3 (maior ~0,395 MB). **Nunca** adicionar áudio pago em `server/` nem em `public/`. Público gratuito: `public/audio/` (ex.: `/audio/de/fcd97331.mp3` → 200).
6. Sem R2 configurado fora de dev, a rota exige autorização; sem credenciais, `/api/audio/ru/12345678.mp3` e `/api/aula/ru/9` respondem **503** (`testar-isolamento-http.mjs`).

Teste de contrato: `scripts/testar-audio-autorizacao.ts` — asserções literais: visitante 401 (arquivo existente e inexistente), token inativo 403, `consultasR2 === 0` e `consultasDisco === 0` para não assinante; assinante: inexistente 404, existente 302 com `cache-control: private, no-store`, `Range: bytes=2-5` → 206 corpo `2345`, APK com `Origin: https://localhost` → 206 `bytes 2-5/10`; `consultasR2 === 4` no fim. Complementares: `testar-audio-r2.ts` (`npm run testar:audio-r2`), `testar-audio-privado.ts`, `validar-audio-privado.mjs`. Reprodução real em Safari e APK com assinante é **pendência do Felipe**.

## 3. Segurança
- Cabeçalhos, CSP e origens do app: `server/seguranca.ts` (`ORIGENS_APP`: `https://localhost`, `capacitor://localhost`, `http://localhost`; `Vary: Origin`). Teste: `npm run testar:seguranca` (`testar-seguranca.mjs` + `testar-ip.ts`).
- Regras do Firestore: `firestore.rules`, testadas por `npm run testar:regras` (emulador). **Não publicar** sem ordem expressa.
- Segredos: workflow `seguranca.yml` roda `gitleaks detect --redact --exit-code 1`; `npm audit --omit=dev --audit-level=high` no CI.
- Billing: `server/billing.ts`, `billing-contrato.ts`, `billing-webhook.ts`, `cobranca-eventos.ts`; testes `testar-contrato-billing.ts`, `testar-billing-webhook.ts`, `testar-cobranca-eventos.ts`. Não alterar cobrança para contornar teste.
- `/readyz` (`server/prontidao.ts`) confere variáveis sem imprimir valores; é a forma de provar configuração.

## 4. Variáveis de ambiente (apenas nomes; conferir por `/readyz`)
Servidor: `APP_URL`, `NODE_ENV`, `PORT`, `CSP_MODO`, `METRICAS_TOKEN`, `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT_JSON`, `GOOGLE_APPLICATION_CREDENTIALS`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`, `STRIPE_PRICE_ID_USD`, `REVENUECAT_SECRET_KEY`, `REVENUECAT_ENTITLEMENT`, `REVENUECAT_ACEITAR_SANDBOX`, `ANDROID_PLAY_SHA256`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_URL_EXPIRACAO_SEGUNDOS`, `AUDIO_REPO`, `AUDIO_REPO_TOKEN`, `AUDIO_DEPLOY_KEY`, `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_GRAPH_VERSION`, `META_TEST_EVENT_CODE`, `TIKTOK_PIXEL_ID`, `TIKTOK_ACCESS_TOKEN`, `TIKTOK_TEST_EVENT_CODE`, `POSTHOG_HOST`, `POSTHOG_TOKEN`, `VERCEL`.
Cliente (`VITE_*`, públicas por natureza): `VITE_API_BASE_URL`, `VITE_AUDIO_BASE_URL`, `VITE_AUTH_GOOGLE`, `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_POSTHOG_HOST`, `VITE_POSTHOG_TOKEN`, `VITE_ALVO` (`apk` ou website).
Checkout mensal USD depende de `STRIPE_PRICE_ID_USD`; se quebrar, cheque `/readyz` e o ambiente **antes** de mexer em código.

## 5. Erros de infra já vistos
- `vercel.json` com `includeFiles` inválido e erro de TypeScript em `ts-fsrs` quebraram o build (#643; `ts-fsrs` 6 entrou na #639).
- Rota de áudio consultando R2 antes de autenticar (#643).
- Bucket planejado sem CORS e fluxo `https://localhost → API → 302 R2` com `Origin: null` (#643/#644).
- `PAINEL.md` registra o repositório com MP3 pagos como público em 11/11/2026; o histórico do Git ainda guarda arquivos antigos. Reescrever histórico só com ordem expressa.

## 6. Critério de saída para 10/10
Build Vercel sem aviso (hoje 7 avisos abertos); `npm run testar:seguranca`, `testar-audio-autorizacao.ts` e `gitleaks` verdes no CI; reprodução confirmada em web, Safari e APK por assinante real; 2FA ativo na Vercel e no Cloudflare; billing do Render conferido e encerrado; `/readyz` sem pendência.
