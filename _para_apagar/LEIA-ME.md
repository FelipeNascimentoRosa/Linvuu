# Para apagar

Pasta de quarentena criada em 11/11/2026 a pedido do Felipe. Nada aqui é lido pelo site, pelo build, pelo servidor ou pelo CI.
Quando o Felipe disser "apague a pasta _para_apagar", basta `git rm -r _para_apagar`. O histórico do Git guarda tudo.

| Item | O que era | Prova de que nada usa |
|---|---|---|
| `legado/` (4,4 MB) | Apps antigos (alemão-descomplicado, russo-interativo) de antes do site atual | Nenhuma referência em `src`, `server`, `scripts`, `.github`, `package.json`, `vite.config.ts` |
| `EN_AUDIT.md` | Auditoria do inglês do .com de 09/11; itens já corrigidos | Só citado em comentários de código |
| `METRICS_EN.md` | Métricas da auditoria acima | Sem referência fora dos próprios relatórios |
| `PROMPT_EN.md` | Prompt de trabalho da auditoria acima | Só citado em comentário de `scripts/en-tools/auditar-ingles.mjs` |
