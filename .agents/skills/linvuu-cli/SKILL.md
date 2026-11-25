---
name: linvuu-cli
description: CLI e automação de manutenção na Linvuu, com testes e evidências por branch/PR.
---
# CLI e automação de manutenção

## Contexto obrigatório
Ler `AGENTS.md`, `docs/DOMINIOS.md` e `docs/linvuu-10-de-10/00-INDICE.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
scripts/, package.json, .github/

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/cli/cli
- https://github.com/scrapy/scrapy
- https://github.com/linkchecker/linkchecker

## Protocolo da skill
Scripts reproduzíveis devem expor códigos de saída, logs sem segredos e testes offline quando possível. Monitorar sitemap, robots, link quebrado e saúde. Sempre gravar comando, SHA, data, exit code e resultado.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
