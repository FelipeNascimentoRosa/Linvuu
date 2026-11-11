---
description: Executa o próximo lote do plano-mestre (ou o lote indicado), do começo ao fim
argument-hint: "[número do lote, opcional]"
---

Leia `docs/plano/EXECUTAR.md` e `docs/plano/ESTADO.md`.

Se `$ARGUMENTS` trouxer um número, execute esse lote de `docs/plano/LOTES.md`. Se vier vazio, escolha o próximo lote pela regra do §2 do `EXECUTAR.md`.

Siga o ciclo do §3 do `EXECUTAR.md` sem pular passo: anuncie em 3 linhas, confira a evidência, uma branch e um PR para o lote, prove com o DOD, atualize `ESTADO.md` e `PAINEL.md` no mesmo PR e termine com o relatório de fim de sessão. Não pergunte o que fazer; pare apenas nas condições do §5.
