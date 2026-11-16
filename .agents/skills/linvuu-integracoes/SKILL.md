---
name: linvuu-integracoes
description: Integrações Stripe, Firebase e webhooks na Linvuu, com testes e evidências por branch/PR.
---
# Integrações Stripe, Firebase e webhooks

## Contexto obrigatório
Ler `AGENTS.md`, `PAINEL.md`, `docs/DOMINIOS.md` e `docs/COORDENACAO-IA.md`. Confirmar branch e deploy. Não assumir métricas históricas como atuais.

## Arquivos do projeto
server/, firestore.rules, firebase.json, src/config/

## Repositórios de referência para avaliação (não são dependências instaladas)
- https://github.com/stripe/stripe-node
- https://github.com/firebase/firebase-js-sdk
- https://github.com/firebase/firebase-admin-node
- https://github.com/microsoft/playwright

## Protocolo da skill
Validar assinatura/idempotência de webhook, retries, sandbox de pagamentos, Firestore no emulador e permissão após compra. Não usar credenciais de produção, fazer cobrança real ou alterar IAM.

1. Reproduzir o defeito com caminho, entrada e resposta observada; coletar evidência de ferramenta.
2. Explicar causa no arquivo e linha correspondente. Corrigir apenas na branch separada.
3. Executar teste unitário/integrado e comparar resultado antes/depois.
4. Registrar no PR resultado, limitações, riscos, SHA e verificação em produção pendente.
5. Não afirmar sucesso de build, deploy, Google Search Console ou segurança sem teste/consulta.

**Licenças:** conferir a licença e as condições de uso da versão escolhida antes de instalar ou copiar código de qualquer referência externa.
