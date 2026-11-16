---
name: linvuu-conteudo-i18n
description: Qualidade editorial, idiomas e indexabilidade na Linvuu, com testes e evidências por branch/PR.
---
# Qualidade editorial, idiomas e indexabilidade

## Contexto obrigatório
Ler `AGENTS.md`, `PAINEL.md`, `docs/DOMINIOS.md` e `docs/COORDENACAO-IA.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
content/, src/i18n/, src/lib/metaRota.ts

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/microsoft/playwright
- https://github.com/semgrep/semgrep

## Protocolo da skill
Conferir idioma de explicação realmente disponível; validar traduções completas antes de retirar noindex; nenhum legado /es ou /en como idioma de interface. Comparar conteúdo, metatags e links por domínio.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
