---
paths:
  - "src/**/*.css"
  - "src/components/**"
  - "src/pages/**"
  - "src/tokens.css"
  - "scripts/validar-design.mjs"
  - "scripts/auditar-visual.mjs"
---
# Design e UI
- Proibido criar folha global nova; hex só em `src/tokens.css`; CSS Module usa só `var()`.
- Cartões da mesma fileira com altura igual e CTA na base; seção sem conteúdo real não renderiza; um template por tipo de página.
- Meta: 0 ocorrências em `node scripts/auditar-visual.mjs <urls>`; `npm run validar:design` verde. **Sem mascotes** (exclusão total autorizada, em PR própria).
- Leia `docs/linvuu-10-de-10/04-ui-design.md`.
