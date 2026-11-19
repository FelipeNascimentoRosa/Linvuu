# Linvuu: análise de produto com consentimento

Projeto PostHog 678481, região US, fuso America/Sao_Paulo. Um único projeto cabe no plano atual; separar relatórios por `platform` (web/android/ci) e `environment` (production/test). Nunca somar testes ao tráfego real.

## Configuração

`VITE_POSTHOG_TOKEN` é o token público de captura do projeto, não um token administrativo. `VITE_POSTHOG_HOST=https://us.i.posthog.com`. Configurados fora do código, no GitHub Actions Variables e no serviço Render linvuu. No APK, o workflow passa as Variables ao build. Em prévias web, definir `VITE_ANALYTICS_ENV=test` e usar token fictício quando não houver intenção de enviar dados reais. Sem configuração válida, a integração não aparece nem envia dados.

## Privacidade

Consentimento novo `linvuu:analytics:v1`, independente da medição própria `linvuu:medicao:v1`. Antes de aceitar e após recusar/revogar: zero envios PostHog. Identificador aleatório deste aparelho, sem UID Firebase, nome, e-mail, respostas, URLs completas, referrer ou pagamentos. Não existe união entre aparelhos ou contas; retenção é por navegador/aparelho com consentimento. Revogar remove o identificador local e cancela requisições pendentes; eventos já recebidos não são apagados automaticamente. Falhas de rede não bloqueiam o estudo. Eventos não são enfileirados para reenvio offline. Máximo de 120 envios por carregamento, timeout de 5 segundos.

O conector usa somente a API pública de captura, sem carregar SDK/script remoto. Não inclui autocapture, replays, heatmaps, console, gravação de áudio, flags ou surveys. IPs descartados pelo projeto; processamento de perfis e geolocalização desativados nos eventos. Não confundir o contador de eventos com diagnóstico automático de UX.

## Eventos reais previstos

- `page_viewed`: categoria de rota conhecida, sem query/hash ou URLs completas.
- `course_viewed`: abertura do percurso de idioma.
- `lesson_started`: abertura da página de dia; não prova que o aluno estudou ou ouviu áudio.
- `practice_completed`: conclusão da primeira correção da prática; não significa domínio do conteúdo.
- `lesson_completed`: dia marcado concluído localmente; leituras vindas da conta não geram conclusão nova.
- `review_started`: o aluno apertou «Começar a revisão» em `/curso/:id/revisao` (só web); propriedades `study_language` e `blocks` (quantos blocos na fila).
- `review_rated`: nota Again/Hard/Good/Easy gravada com sucesso num bloco; propriedades `study_language` e `rating`. Não leva o bloco, a questão nem a resposta.
- `review_completed`: a tela de resumo abriu depois de ao menos um bloco revisado; propriedades `study_language` e `blocks`.

Propriedades controladas: `platform`, `environment`, `interface_language`, `version`, `page`, `study_language`, `lesson`, `rating` (lista fechada) e `blocks` (1 a 1000). Não capturamos mensagens de erro livre, nem inventamos eventos de compra/áudio que ainda não foram ligados. Novas métricas só começam após publicação, aceitação e uso real. Recusas, bloqueadores e perdas de rede reduzem a amostra; não extrapolar para todos os visitantes.

## Validação e publicação

`node --import tsx scripts/testar-analytics.ts` verifica opt-in separado, payload permitido, storage bloqueado e revogação. Workflow `analytics.yml` compila com fixture e intercepta todos os envios no navegador (web + APK, PT/EN/ES, 320px e fonte ampliada). Somente a branch autorizada envia um evento técnico `integration_verified`, com `environment=test` e `platform=ci`. Ele serve para verificar ingestão, nunca para estimar alunos.

A branch gpt/website-apk e o PR #263 continuam de testes. Não fazer merge desse PR para publicar somente analytics web. Preparar publicação web isolada sobre main e confirmar deploy/ingestão antes de declarar métricas em produção.

Fontes: https://posthog.com/docs/api/capture e https://posthog.com/docs/product-analytics/capture-events
