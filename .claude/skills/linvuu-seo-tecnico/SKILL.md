---
name: linvuu-seo-tecnico
description: Auditoria e mudança de SEO técnico da Linvuu: rotas, 301, sitemap, robots, canonical, hreflang, meta, GSC, dois domínios. Use antes de tocar server/dominio.ts, metaRota.ts, seo.mjs ou vercel.json.
---
# SEO técnico Linvuu
1. Leia `docs/linvuu-10-de-10/01-seo-tecnico.md` e confira a TRAVA ATIVA em `00-INDICE.md` §2. Durante a trava, só leitura e medição.
2. Meça ao vivo antes de afirmar: `curl -sI -o /dev/null -w "%{http_code} %{redirect_url}\n" <url>` nos dois domínios; sitemap publicado; GSC.
3. Edite a fonte (`src/lib/metaRota.ts`, `server/dominio.ts`, `scripts/seo.mjs`), não o gerado.
4. Prove: `npm run build:website`, `npm run audit:rotas-dominios`, `node --import tsx scripts/testar-seo-publico.ts`, `testar-http-seo.ts`, `testar-titulos.ts`, `node scripts/testar-paridade-meta.mjs`.
5. Nunca enfraquecer teste. Relate: URL, status medido, comando, saída.
