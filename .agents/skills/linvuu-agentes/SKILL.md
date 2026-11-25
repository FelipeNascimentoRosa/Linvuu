---
name: linvuu-agentes
description: Sincronia entre IA, PRs e governança na Linvuu, com testes e evidências por branch/PR.
---
# Sincronia entre IA, PRs e governança

## Contexto obrigatório
Ler `AGENTS.md`, `docs/DOMINIOS.md` e `docs/linvuu-10-de-10/00-INDICE.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
AGENTS.md, docs/linvuu-10-de-10/00-INDICE.md, CLAUDE.md, GEMINI.md, DEEPSEEK.md

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/github/github-mcp-server
- https://github.com/cli/cli

## Protocolo da skill
Usar AGENTS.md e docs/linvuu-10-de-10/00-INDICE.md como fontes; cada agente em branch isolada, evitar sobrescrever alterações de outro PR, registrar evidência e handoff. Não transformar memória ou conversa em estado de produção.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
