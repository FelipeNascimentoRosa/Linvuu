# Homologação da cobrança (Rodada 1, 05/11/2026)

Objetivo: provar, antes de qualquer campanha, que **pagar libera, não pagar não libera, devolver tira** e que cada compra chega
uma vez à medição. Fecha a issue #380 quando todos os casos abaixo estiverem com ✅ e evidência (IDs do Stripe, sem dados pessoais).

## O que mudou no código (PR da Rodada 1)

| Antes | Agora | Onde |
|---|---|---|
| Pacote contava da criação do checkout (Pix pago 2 dias depois perdia 2 dias) | Conta da confirmação do pagamento (instante do evento do Stripe) | `server/acesso-calculo.ts` |
| Segundo pacote apagava os dias restantes do primeiro (`Math.max`) | Pacotes somam: o novo começa quando o atual termina | idem |
| Reembolso parcial tirava o acesso; reembolso da mensal **não** tirava | Parcial mantém; integral ou disputa tiram; mensal reembolsada/disputada é cancelada na hora | idem + `server/cobranca-eventos.ts` |
| Nada impedia pagar duas vezes (ex.: anual com mensal ativa) | 409 com mensagem; pacote sobre pacote soma | `podeComprar` + `/api/billing/checkout` |
| Duplo clique abria duas sessões | Mesma sessão por 10 min (chave de idempotência) | `server/billing.ts` |
| Invalidação de acesso só na memória do processo (perdia após reinício) | Registro `acessos/{uid}` no Firestore, gravado pelo webhook; uid achado pelo cliente do Stripe | `server/acesso.ts` |
| Valores em 4 lugares | Fonte única `CENTAVOS` em `src/config/planos.ts`; `/readyz` confere R$ 139/mês no Stripe | `testar-contrato-billing.ts` |
| Registro «sem acesso» (só Stripe) escondia acesso do Google Play por até 10 min | Registro só vale como atalho para «tem acesso»; senão relê Stripe e Play | `acessoDoRegistro` em `server/acesso.ts` |
| Compra não chegava a Meta/TikTok/PostHog | Evento do servidor com valor real, só com consentimento, uma vez por pagamento | `server/conversoes.ts` |
| Termos citavam só mensal e R$ 417 | Os 4 planos, início na confirmação, soma, reembolso de 7 dias para qualquer plano | `src/pages/Legal.tsx` |

Testes automáticos (CI, sem rede): `testar-acesso-calculo.ts` (17 casos), `testar-cobranca-eventos.ts` (11 etapas),
`testar-conversoes.ts`, `testar-registro-acesso.ts`, `testar-webhook-eventos.ts`, `testar-contrato-billing.ts`, `testar-billing-webhook.ts`.

**Firestore:** a coleção nova `acessos` é escrita só pelo servidor (Admin SDK). As regras publicadas (conferidas iguais ao
repositório em 05/11) já negam ao navegador tudo fora de `users/{uid}`. **Nenhuma mudança de regra é necessária.**

## O que o Felipe precisa fazer

0. **Stripe → Developers → Webhooks → endpoint `https://linvuu.com.br/api/stripe/webhook` → eventos marcados.** Reembolso e disputa só chegam se
   `charge.refunded`, `charge.dispute.created` e `charge.dispute.closed` estiverem marcados (a lista completa está em `EVENTOS_COBRANCA`,
   `server/billing-webhook.ts`). Confira sem alterar nada: `STRIPE_SECRET_KEY=rk_live_… node --import tsx scripts/verificar-webhook-stripe.mjs`
   (chave restrita com leitura de «Webhook Endpoints» basta). Diz exatamente quais faltam. Sem eles, devolver dinheiro não tira o acesso na hora.
1. **Render → linvuu → Environment** (depois do merge; nenhuma é obrigatória para o site continuar funcionando):
   - `META_PIXEL_ID` e `META_CAPI_TOKEN` (Gerenciador de Eventos → fonte de dados → Configurações → API de Conversões → Gerar token). Para testar sem sujar dados: `META_TEST_EVENT_CODE` (aba «Testar eventos»), depois apagar.
   - `TIKTOK_PIXEL_ID` e `TIKTOK_ACCESS_TOKEN` (TikTok Ads Manager → Eventos → Web → o pixel → Configurações → Gerar token). Teste: `TIKTOK_TEST_EVENT_CODE`.
   - PostHog do servidor usa o mesmo token público do site (`VITE_POSTHOG_TOKEN`/`VITE_POSTHOG_HOST`) se `POSTHOG_TOKEN`/`POSTHOG_HOST` não existirem.
2. **Revisar os termos novos** (`/termos`) — não sou advogado; confira com quem cuida do jurídico/contábil.
3. **Stripe em modo teste** para os casos abaixo: criar um preço recorrente de teste de R$ 139/mês e me passar `sk_test_…`, o `price_…` de teste e o `whsec_…` do `stripe listen`. Ou rodar você mesmo seguindo os comandos.
4. **Prova final com dinheiro real (D4):** depois de tudo verde em teste, uma assinatura mensal de R$ 139 com seu cartão → conferir aula 9 liberada → reembolso integral no painel → conferir acesso revogado em menos de 1 minuto e assinatura cancelada.

## Ambiente de teste local

```bash
# terminal 1 — encaminha eventos de teste do Stripe para o servidor local
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook   # mostra o whsec_… de teste

# terminal 2 — servidor com chaves de TESTE (nunca sk_live aqui)
STRIPE_SECRET_KEY=sk_test_... STRIPE_PRICE_ID=price_... STRIPE_WEBHOOK_SECRET=whsec_... \
FIREBASE_SERVICE_ACCOUNT_JSON="$(cat conta-servico.json)" npm run dev
```

Contas: duas contas fictícias criadas no site (A e B). Cartões de teste: https://docs.stripe.com/testing — Pix e boleto
de teste: https://docs.stripe.com/payments/pix e https://docs.stripe.com/payments/boleto (seção de testes de cada um).

## Matriz de casos

| # | Caso | Como provocar | Esperado | Evidência |
|---|---|---|---|---|
| 1 | Mensal com cartão | conta A, plano mensal, cartão 4242… | `/api/billing/status` ativa, via assinatura; aula 9 e áudio pago abrem | sub_… |
| 2 | Pix pago | conta B, trimestral Pix; simular pagamento só depois de alguns minutos | antes: sem acesso; depois: acesso com `ate` = confirmação + 3 meses | cs_… |
| 3 | Pix não pago / expirado | trimestral Pix e não pagar | sem acesso; nenhuma conversão enviada | cs_… |
| 4 | Boleto pago | trimestral cartão/boleto, escolher boleto, simular pagamento | acesso a partir da confirmação | cs_… |
| 5 | Boleto vencido | idem, simular vencimento | sem acesso | cs_… |
| 6 | Anual com cartão | conta B (com trimestral ativo) compra anual | `ate` = fim do trimestral + 12 meses | cs_… |
| 7 | Compra duplicada | conta A (mensal ativa) tenta anual | 409 «já tem uma assinatura ativa» | — |
| 8 | Mensal por cima de pacote | conta B tenta mensal | 409 «já tem acesso pago ativo» | — |
| 9 | Duplo clique | dois cliques rápidos em «Assinar» | uma única sessão no painel | cs_… |
| 10 | Renovação | test clock: avançar 1 mês | invoice.paid; acesso continua | in_… |
| 11 | Falha na renovação | test clock + cartão 4000 0000 0000 0341 | past_due → sem acesso | in_… |
| 12 | Cancelamento no fim do período | portal → cancelar | ativa até o fim, `cancelaEm` preenchido; depois sem acesso | sub_… |
| 13 | Reembolso integral da mensal | painel → reembolsar a cobrança inteira | assinatura cancelada na hora; sem acesso em < 1 min | re_… |
| 14 | Reembolso parcial | reembolsar R$ 20 de um pacote | acesso mantido | re_… |
| 15 | Disputa | cartão de teste de disputa | assinatura cancelada / pacote sem acesso | dp_… |
| 16 | Webhook adulterado / repetido / fora de ordem / com servidor reiniciado | `stripe events resend evt_…`; reiniciar o servidor entre eventos | assinatura inválida → 400; repetido → sem efeito duplo; após reinício o acesso continua certo | logs |

Para cada caso com compra paga e consentimento de publicidade: conferir **um** evento Purchase no Gerenciador de Eventos
da Meta (com `META_TEST_EVENT_CODE`) e **um** CompletePayment no TikTok; sem consentimento, nenhum.

## Limites conhecidos

- Início do pacote: usa o instante do evento de confirmação gravado pelo webhook; se o webhook estiver fora do ar nesse
  momento, usa a criação da cobrança no Stripe (pode ser alguns minutos antes). Diferença irrelevante para 3/12 meses.
- Disputa vencida pelo vendedor não devolve o acesso sozinha: reativação é manual (decisão da política).
- Reembolso parcial nunca tira acesso; se um dia for preciso, mudar `pagamentoValido` e os testes.
