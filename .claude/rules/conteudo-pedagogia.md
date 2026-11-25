---
paths:
  - "content/idiomas/**"
  - "content/gramatica/**"
  - "content/livros/**"
  - "content/indice*.json"
  - "content/travas-en.json"
  - "scripts/conteudo.mjs"
---
# Conteúdo e pedagogia
- `dia-*.json` é **derivado**. Corrija a aula-fonte (`content/idiomas/<id>/aulas/aula-NNN.json`) e o mapa `i18n/`, rode `npm run content` e `node scripts/conteudo.mjs --check` (guardas 2026-11-04 e 2026-11-09).
- O CI não valida verdade linguística. Antes de editar, leia `docs/linvuu-10-de-10/02-pedagogia-qa.md` §4 (erros já vistos) e evite "nunca/sempre/qualquer" sem fonte.
- Texto de botão de áudio = texto do MP3, só na língua-alvo; sem MP3 mapeado, sem botão.
- `linvuu.com` é só inglês: gramática exige `explicacaoEm: "en"`; metadado de topo também no idioma do domínio.
- Não atualizar `content/travas-en.json` nem regenerar índices sem ordem do Felipe.
