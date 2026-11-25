---
paths:
  - "server/dominio.ts"
  - "src/lib/metaRota.ts"
  - "scripts/seo.mjs"
  - "scripts/prerender.mjs"
  - "vercel.json"
  - "public/robots*.txt"
  - "public/sitemap*.xml"
  - "public/llms*.txt"
  - "specs/MAPA-ROTAS-E-DOMINIOS.md"
---
# SEO, rotas e domínios
- **TRAVA ATIVA** (GSC validando): não alterar URLs, rotas, redirects, robots, sitemaps, `vercel.json`, DNS, Cloudflare ou R2 sem ordem do Felipe.
- Edite a fonte (`metaRota.ts`, `dominio.ts`, `seo.mjs`), nunca o arquivo gerado. Um sitemap por domínio; `www`→apex em 301.
- Curso parcial fora do sitemap do .com é intencional (`explicacaoCompleta`). Não expor `/curso/it` no .com.
- Prove com `npm run build:website`, `npm run audit:rotas-dominios`, `testar-seo-publico.ts`, `testar-http-seo.ts`, `testar-titulos.ts`, `testar-paridade-meta.mjs`. Leia `docs/linvuu-10-de-10/01-seo-tecnico.md`.
