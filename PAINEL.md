# PAINEL — Linvuu

> **Fonte única de verdade.** O agente lê este arquivo antes de qualquer coisa e o atualiza antes de encerrar a sessão. Se a memória do agente divergir do painel, o painel vence. Se não está aqui, não existe.
>
> Atualizado: **2026-11-11** (baseline, criado a partir da auditoria do dossiê 09–11/11) · Mantenedor: Felipe
> Quem escreve o quê: **agente** atualiza §§ 2, 4, 6, 7, 8, 9 no fim de cada sessão · **Felipe** atualiza §§ 1, 3 (status), 5, 10 no ritual diário.

---

## 1. Métrica-mãe do período

**Primeiro assinante pago no .com.br (R$ 139/mês).** Hoje: **0**.
Métrica da semana (muda com o lote): ver § 3.

## 2. Funil (atualizado no fim de cada sessão)

| Etapa | Estado |
|---|---|
| Home do .com.br no índice do Google | **NÃO** — "Descoberto, não indexado" (apenas /en/, /es/portugues, /excluir-conta e páginas internas) |
| Visitas/semana | sem dado |
| Cadastros | 0 (a partir do deploy do lote 4, o número vem de `GET /api/metricas` → `funil.porDia`, com token `METRICAS_TOKEN`) |
| Assinaturas | 0 |
| Eventos de analytics | 0 — instrumentação inexistente |
| Capítulos publicados | **12 de 113** |

## 3. Plano 30 dias — lotes

| Lote | Semana | Critério de pronto | Prova exigida | Status |
|---|---|---|---|---|
| 0 · Decisões | dia 1 | fila zerada | 3 merges no `git log` + PAINEL commitado | ⏳ em curso |
| 1 · Indexação | semana 1 | home no índice | `site:linvuu.com.br` + relatório GSC | ⏸ |
| 2 · Funil | semana 2 | jornada e2e verde + 4 eventos | teste Playwright + painel de analytics | ⏸ |
| 3 · Conteúdo | semana 3 | 30+ capítulos no ar | `npm run mapa:site` regenerado | ⏸ |
| 4 · Aquisição | semana 4 | 100 visitantes rastreáveis | GSC + analytics | ⏸ |

Legenda: ⏳ em curso · ✔ pronto (prova em § 8) · ⏸ aguardando lote anterior
**Regra de ouro:** lote não termina sem critério de pronto provado. Semana sem critério = repete-se o lote — a meta é da semana, não do calendário.

## 4. Tarefa atual

Lote 0 — dia de dono (sem código novo). Sequência do dia 1:
1. (agente) Pacote de evidências: 3 memos de decisão para #555, #556, #557 — `[ ]`
2. (Felipe) Mergear #555 → #556 → #557, nesta ordem — `[ ]`
3. (Felipe) Responder as 7 pendências do § 5 (sim/não/"adiar até [data]") — `[ ]`
4. (Felipe) Marcar o Lote 0 como ✔ no § 3, com as provas em § 8 — `[ ]`

## 5. Decisões pendentes (idade em dias · **> 7 = "não" automático**)

| # | Decisão | Idade (dias) | Resposta |
|---|---|---|---|
| 1 | Pacote permissivo | — | aguarda |
| 2 | Escopo de limpeza | — | aguarda |
| 3 | Mapa br-en | — | aguarda |
| 4 | DMARC rua= (exige escrita em DNS — só o Felipe) | 12 | aguarda |
| 5 | Política do livro em inglês | 9 | aguarda |
| 6 | Próximo idioma | 9 | aguarda |
| 7 | Foto real de pessoa acima da dobra (a pendência mais antiga do repo) | — | aguarda |

Cada pendência recebe: **sim**, **não** ou **"adiar até [data]"**. Pergunta com mais de 7 dias sem resposta morre por "não" — pendência velha é decisão escondida.

## 6. PRs abertos

| PR | Conteúdo | Estado |
|---|---|---|
| #555 | Barra de cookies — conserto com prova numérica + escolha por finalidade (pronto p/ LGPD) | aguarda revisão |
| #556 | Home variante A "ocre solar" — contraste 12,65:1 (AAA) | aguarda revisão |
| #557 | Gerador de mapa do site | aguarda revisão |

(Vazio é o estado correto no fim de cada dia de revisão.)

## 7. Achados fora do lote (reportar, não consertar)

- (vazio)

## 8. Evidências recentes (append-only: data · fato · prova)

- 2026-11-11 · lote 4 · `GET /api/metricas` ganhou `funil` (28 dias × contas, sessão 1, sessão 8, checkouts abertos, checkouts pagos; sessão e checkout contam só depois do deploy) · `npm run testar:medicao` e `testar-cobranca-eventos.ts` verdes
- 2026-11-11 · baseline deste painel · auditoria do dossiê 09–11/11 (36 PRs, 7 categorias)

## 9. Conta 60/20/20 do período

| Tipo | PRs | Teto |
|---|---|---|
| Produto | 0 | — (mínimo 60%) |
| Meta (docs/estratégia) | 0 | 20% |
| Infra | 0 | 20% |

**Mostre esta conta antes de abrir qualquer PR de documento ou infra.** Sem saldo, não abre.

## 10. Diário do operador (Felipe — 1 linha por dia, append-only)

| Data | Andou | Travou |
|---|---|---|
| 2026-11-11 | Baseline criado + plano de 30 dias aprovado | — |
