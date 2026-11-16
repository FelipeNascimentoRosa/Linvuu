---
name: linvuu-frontend
description: Frontend React, Vite, UI e SEO renderizado na Linvuu, com testes e evidências por branch/PR.
---
# Frontend React, Vite, UI e SEO renderizado

## Contexto obrigatório
Ler `AGENTS.md`, `PAINEL.md`, `docs/DOMINIOS.md` e `docs/COORDENACAO-IA.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
src/pages/, src/plataforma/website/, src/components/, src/i18n/

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/microsoft/playwright
- https://github.com/GoogleChrome/lighthouse
- https://github.com/eslint/eslint

## Protocolo da skill
Testar H1, landmarks, conteúdo útil no HTML recebido sem JavaScript, hidratação React, navegação, idioma, canonical, mobile e acessibilidade. Rodar npm run lint e build:website. Diferença entre SSR/prerender e DOM hidratado é falha a registrar.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
