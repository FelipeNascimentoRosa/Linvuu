# Como ver o site e colocá-lo no ar

O site no ar roda no **Render**, em https://linvuu.com.br, com deploy automático a cada push na `main`. Domínio no Registro.br, HTTPS pelo Render.

## Ver no seu computador
```
npm install
npm run dev          # abre em http://localhost:3000
```
Para o login funcionar localmente, crie `.env` na raiz a partir de `.env.example` (ver `docs/AUTENTICACAO.md`). O servidor lê **`.env`**, não `.env.local`; as `VITE_*` são lidas pelo Vite em `.env` e `.env.local`. O `.env` fica fora do Git (`.gitignore`).

## No Render
- Build: `npm install && npm run build` (valida o conteúdo e gera `dist/`). Start: `npm start` (`tsx server.ts`, que serve o `dist/` e a API).
- Variáveis de ambiente: as do servidor (Gemini, Stripe) e as `VITE_FIREBASE_*` do login. Estas últimas precisam existir **antes do build**.
- Pull requests: o GitHub roda o teste `CI` (`npm ci` e `npm run build`) em cada PR.

## Outras hospedagens
`vercel.json` e `netlify.toml` continuam no repositório como alternativas. O GitHub Pages foi descartado.
