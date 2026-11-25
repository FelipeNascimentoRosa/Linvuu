---
name: linvuu-seguranca
description: Segurança SAST e dependências na Linvuu, com testes e evidências por branch/PR.
---
# Segurança SAST e dependências

## Contexto obrigatório
Ler `AGENTS.md`, `docs/DOMINIOS.md` e `docs/linvuu-10-de-10/00-INDICE.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
server/, src/, package-lock.json, firestore.rules, .github/workflows/

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/semgrep/semgrep
- https://github.com/eslint/eslint
- https://github.com/SonarSource/sonarqube
- https://github.com/PyCQA/bandit
- https://github.com/google/osv-scanner
- https://github.com/aquasecurity/trivy

## Protocolo da skill
Semgrep no código, ESLint para JS/TS se configurado, OSV/Trivy para vulnerabilidades; SonarQube precisa instância; Bandit apenas para scripts Python. Revisar licenças, segredos, IDOR, CORS, CSP e dependências. Distinguir achado comprovado de hipótese.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
