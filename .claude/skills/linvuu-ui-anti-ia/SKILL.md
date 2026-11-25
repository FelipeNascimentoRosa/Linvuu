---
name: linvuu-ui-anti-ia
description: UI da Linvuu sem cara de IA: tokens, camadas CSS, cartões alinhados, seções vazias, validar:design e auditar-visual. Use ao criar ou revisar páginas, componentes e telas do APK.
---
# UI anti-IA Linvuu
1. Leia `docs/linvuu-10-de-10/04-ui-design.md`. Sem folha global nova; hex só em `src/tokens.css`; sem mascotes.
2. Rótulo acima de título é proibido; cartões da fileira com altura igual e CTA na base; seção vazia não renderiza.
3. Prove: `npm run validar:design`, `node scripts/auditar-visual.mjs <urls>` (meta 0), `npm run lint`, e `npm run lint:apk` se tocar o APK.
4. Teste em 375 px e 1280 px, tema claro e escuro.
