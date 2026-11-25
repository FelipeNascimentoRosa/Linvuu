---
name: linvuu-pedagogia-qa
description: QA pedagógico e linguístico de aulas, gramáticas e livros da Linvuu (dia-*.json, content/gramatica, áudio por frase). Use ao criar, editar ou auditar conteúdo de qualquer idioma.
---
# Pedagogia QA Linvuu
1. Leia `docs/linvuu-10-de-10/02-pedagogia-qa.md` (schemas, guardas, checklist de erros já vistos).
2. Não ler `dia-*.json` em lote: `rg` por padrão suspeito e `node -e` para listar campos.
3. Cheque: soletração, regra absoluta ("nunca/sempre/todo"), tradução literal, mistura de idiomas, botão de áudio sem MP3, metadado de topo no idioma do domínio.
4. Corrija a **aula-fonte** e o mapa `i18n/`; `npm run content`; `node scripts/conteudo.mjs --check`.
5. Entregue tabela: arquivo | bloco | erro | correção | fonte. Revisão humana final antes de mergear.
