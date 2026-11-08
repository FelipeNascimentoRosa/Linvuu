# Avaliações de alunos (.com.br e .com) — 08/11/2026

**Estado:** implementado em PR rascunho; nada publicado, sem deploy de regras. Não há avaliações reais ainda.

## Como funciona
- Seção "O que dizem nossos alunos" na página `/assinatura` dos dois domínios (texto em português no .com.br e em inglês no .com).
- Formulário só para aluno logado que concluiu pelo menos 2 aulas (`AULAS_MIN`). Uma avaliação por pessoa e por domínio.
- Gravação **só pelo servidor** (Admin SDK) na coleção `avaliacoes/{dominio}_{uid}`; as regras do Firestore **não mudam** (tudo continua negado ao navegador).
- Nasce com `status: "pendente"`. Só aparece no site depois de `status: "aprovada"`.
- Quem tem relação pessoal com o professor se declara; a avaliação aparece com o selo "Conhece o professor" e **não entra** na nota média nem no JSON-LD.
- JSON-LD (`Product` de `/assinatura`): `review` com as aprovadas (sem relação); `aggregateRating` só a partir de 5 avaliações.
- O cache do servidor atualiza a cada 5 minutos; o HTML do JSON-LD é montado com esse cache.

## Moderação (manual)
Alterar o campo `status` do documento para `aprovada` ou `recusada`. Recusar apenas spam, ofensa, links ou conteúdo que não seja avaliação. Não remover avaliações só por serem críticas.

## Limites
Testes cobrem validação e esquema (`npm run testar:avaliacoes`). A rota HTTP não tem teste automatizado contra o emulador; a gravação real no Firestore ainda não foi exercitada.
