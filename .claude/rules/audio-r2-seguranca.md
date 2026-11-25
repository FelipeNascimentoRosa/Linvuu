---
paths:
  - "server/audio-*.ts"
  - "server/seguranca.ts"
  - "server/billing*.ts"
  - "server/acesso*.ts"
  - "scripts/*audio*"
  - "docs/infra/**"
---
# Áudio privado, R2 e segurança
- Em `/api/audio/...`: 401 (sem login) e 403 (sem assinatura) **antes** de qualquer consulta ao R2 ou ao disco.
- R2 privado; CORS só `https://linvuu.com.br`, `https://linvuu.com`, `https://localhost`. Nunca `Origin: null` nem `*`. APK: proxy autenticado com `Range`/206.
- Nunca áudio pago em `server/` ou `public/`. Nunca imprimir valor de variável ou segredo; confirme por `/readyz`.
- Prove com `testar-audio-autorizacao.ts`, `testar-audio-r2.ts`, `testar-isolamento-http.mjs`, `npm run testar:seguranca`. Leia `docs/linvuu-10-de-10/05-infra-audio-seguranca.md`.
