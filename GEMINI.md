# Linvuu — instruções para Gemini / Google Antigravity

**OBRIGATÓRIO:** antes de trabalhar, leia integralmente [AGENTS.md](AGENTS.md). Documentos datados (como `docs/CONTINUIDADE-2026-10-27.md`) são histórico, não estado atual.

As regras de projeto são compartilhadas entre Claude, ChatGPT/Codex, Cursor e Antigravity.

Antes de qualquer edição, **leia integralmente**:
1. `AGENTS.md` — instruções comuns (fonte normativa).
2. `docs/ESTADO-ATUAL.md` — snapshot com data; reconfirme `main`, PRs e deploy.
3. `docs/COORDENACAO-IA.md` — procedimentos para evitar colisões de agentes.
4. As regras e documentos locais pertinentes ao arquivo modificado.

Use branch e PR; não escreva diretamente na `main`, não faça merge automático de protótipos/livros futuros e não contorne testes vermelhos. Uma falha sem etapas de execução exige diagnosticar infraestrutura, permissões e quota antes de atribuir erro ao código.

Não exponha credenciais, IAM, chaves, informações privadas nem conteúdo protegido de terceiros. Não altere site, APK, pagamentos ou conteúdo A1–A2 como efeito colateral de documentação. Diferencie teste de merge, deploy e verificação real. Registre o resultado no PR.

Este arquivo é a entrada específica do Antigravity, e não substitui `AGENTS.md`.
