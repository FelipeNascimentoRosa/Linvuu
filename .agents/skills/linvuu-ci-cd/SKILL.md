---
name: linvuu-ci-cd
description: CI/CD, GitHub Actions, Render, qualidade e rollback na Linvuu, com testes e evidências por branch/PR.
---
# CI/CD, GitHub Actions, Render, qualidade e rollback

## Contexto obrigatório
Ler `AGENTS.md`, `PAINEL.md`, `docs/DOMINIOS.md` e `docs/COORDENACAO-IA.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
.github/workflows/, package.json, scripts/

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/actions/checkout
- https://github.com/actions/setup-node
- https://github.com/GoogleChrome/lighthouse-ci
- https://github.com/cli/cli

## Protocolo da skill
Confirmar SHA da main e deploy Render. Gates: npm ci, lint, testes, build, prerender, sitemap por Host. CI verde não comprova deploy. Registrar plano de reversão e testar endpoints após release.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
