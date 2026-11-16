---
name: linvuu-backend
description: Backend Express, APIs e roteamento na Linvuu, com testes e evidências por branch/PR.
---
# Backend Express, APIs e roteamento

## Contexto obrigatório
Ler `AGENTS.md`, `PAINEL.md`, `docs/DOMINIOS.md` e `docs/COORDENACAO-IA.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
server.ts, server/, src/lib/metaRota.ts

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/expressjs/express
- https://github.com/semgrep/semgrep
- https://github.com/fastify/fastify (referência
- https://github.com/não migração)

## Protocolo da skill
Analisar ordem de middleware, rotas explícitas antes de express.static e fallback SPA, headers, autenticação, erros, 404 verdadeiros, Content-Type, cache e segregação por Host. Fazer testes HTTP GET e HEAD com Accept-Encoding e Host distintos.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
