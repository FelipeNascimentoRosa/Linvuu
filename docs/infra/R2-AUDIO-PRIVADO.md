# Áudio pago no Cloudflare R2 (migração Vercel)

**Estado em 25/11/2026:** bucket privado `linvuu-audio` ativado, com 11.033 objetos
conferidos; a Vercel usa credencial de leitura. A reprodução por assinante real nos
dois domínios e no APK ainda precisa de validação. O áudio gratuito continua em `public/audio/`.

## Porque o R2

O áudio pago tem 11.039 MP3, ~232 MB. O pacote de uma função da Vercel tem o limite de
250 MB — o áudio não cabe lá dentro com as dependências. Por isso o áudio vive fora da
função, num bucket **privado** do R2, e a função só emite URLs pré-assinadas.

## Como funciona

1. O leitor pede `GET /api/audio/:idioma/:hash.mp3` como sempre (o contrato da URL não
   muda — a web e o APK não mudam).
2. A função verifica o login (Firebase) e a assinatura activa (Stripe / RevenueCat).
3. Só após a autorização verifica a existência no R2 (HEAD assinado; voz nova
   `audio-privado-v2/` primeiro, antiga `audio-privado/` como reserva).
4. Responde **302** para uma URL pré-assinada do R2 (expira em ~60 s, `R2_URL_EXPIRACAO_SEGUNDOS`).
   O leitor segue o redirect; os pedidos `Range` continuam a funcionar contra o R2.
5. A CSP inclui a origem do R2 em `media-src` (`server/seguranca.ts`), senão o navegador
   bloqueava o áudio vindo de outro domínio.

O MP3 nunca é servido estaticamente nem entra no pacote da função. Sem as variáveis do
R2, a rota cai para o disco (`.audio-privado/` ou `server/`, como no Render).

## Passo 1 — Activar o R2 (Felipe, no painel da Cloudflare)

Conta Linvuu → Storage & databases → R2 → Overview → concluir a activação.
A franquia gratuita inclui 10 GB de armazenamento; o áudio tem ~232 MB. O egress do R2
é gratuito. Conferir o resumo exibido antes de concluir (pode haver cobrança por
excedentes acima da franquia).

## Passo 2 — Criar o bucket e o token (Felipe)

1. Criar o bucket **`linvuu-audio`**, classe Standard, **privado** (sem domínio público,
   sem r2.dev, sem CORS público).
2. Criar um token de API do R2 (Manage R2 API Tokens → Create API Token) com permissões
   **Object Read & Write** no bucket `linvuu-audio` (o upload precisa de ListBucket).
   Guardar o Access Key ID e o Secret Access Key — o segredo só aparece uma vez.

## Passo 3 — Enviar o áudio (Felipe, na máquina dele)

```bash
node scripts/audio-privado.mjs                     # clona o repo privado para .audio-privado/
node --import tsx scripts/enviar-audio-r2.ts       # simulação: conta o que falta, não envia
node --import tsx scripts/enviar-audio-r2.ts --enviar   # envia o que falta
```

As variáveis `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID` e `R2_SECRET_ACCESS_KEY`
têm de estar no ambiente (nunca em chat nem no Git). O script salta os ficheiros que já
estão no bucket com o mesmo MD5, por isso pode ser corrido várias vezes. O esquema de
chaves é o mesmo do disco (`audio-privado-v2/<idioma>/<hash>.mp3`).

## Passo 4 — Variáveis na Vercel (Felipe, no painel)

`R2_ACCOUNT_ID`, `R2_BUCKET` (= `linvuu-audio`), `R2_ACCESS_KEY_ID` (Sensitive),
`R2_SECRET_ACCESS_KEY` (Sensitive). Production + Preview. Ver
`docs/infra/VERCEL-VARIAVEIS.md`.

## Verificar

1. Com uma conta sem assinatura: `GET /api/audio/ru/<hash>.mp3` dá **403**.
2. Sem login: dá **401**.
3. Com assinatura activa: dá **302** para `https://<conta>.r2.cloudflarestorage.com/audio-privado-v2/ru/<hash>.mp3?...`
   e o áudio toca. Abrir a URL pré-assinada directamente depois de 60 s dá 403 (expirou).
4. Um hash válido inexistente dá **401** sem login e **404** após autorização.

## Voltar atrás

Remover as variáveis `R2_*` não restaura o áudio na Vercel: a função de produção não
inclui os arquivos privados no disco. A reversão exige uma origem anterior funcional e
verificada, além de avaliar a configuração de DNS e dos demais serviços.

## O que NÃO fazer

- Nunca tornar o bucket público nem ligar um domínio público a ele: o áudio pago só sai
  atrás de login + assinatura, por URL pré-assinada.
- Nunca pôr as chaves do R2 no Git, em chat ou num ficheiro do repo.

## CORS pendente em produ??o

A consulta ? configura??o CORS do bucket de produ??o retornou 404 (configura??o inexistente). O player usa `fetch` e segue o redirecionamento para a origem do R2; navegadores exigem CORS tamb?m para URLs pr?-assinadas. Preparar uma pol?tica restrita a `https://linvuu.com.br`, `https://linvuu.com` e `https://localhost` (origem configurada no APK), com GET/HEAD e os cabe?alhos necess?rios para Range. Confirmar a origem efetiva do APK e validar a reprodu??o autenticada antes de considerar a migra??o conclu?da. A aplica??o da pol?tica em produ??o depende da etapa de estabiliza??o aprovada. Refer?ncia: https://developers.cloudflare.com/r2/buckets/cors/
