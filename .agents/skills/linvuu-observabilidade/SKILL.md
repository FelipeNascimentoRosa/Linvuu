---
name: linvuu-observabilidade
description: Observabilidade, incidentes e performance na Linvuu, com testes e evidências por branch/PR.
---
# Observabilidade, incidentes e performance

## Contexto obrigatório
Ler `AGENTS.md`, `docs/DOMINIOS.md` e `docs/linvuu-10-de-10/00-INDICE.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
server/, src/, scripts/, docs/

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/getsentry/sentry-javascript
- https://github.com/open-telemetry/opentelemetry-js
- https://github.com/GoogleChrome/lighthouse

## Protocolo da skill
Separar erro 4xx/5xx, renderização, latência, Core Web Vitals, sitemap e recrawling; evitar registrar cookies ou dados pessoais. Criar baseline e regressões por domínio.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
