# 03 — Conversão, promessa honesta e E-E-A-T

Leia antes de mexer em texto de venda, preço, avaliação, "sobre", promessa de resultado ou descrição de áudio. Autoavaliação de E-E-A-T em 25/11/2026: **4–5/10** (pouca prova de autoria e de método). Subir isso é a frente deste manual.

## 1. Fontes únicas (nunca hardcode fora delas)
| Dado | Arquivo |
|---|---|
| Preços BRL: mensal R$ 139, trimestral R$ 417, trimestral Pix R$ 291,90, anual R$ 999 (equivalência mensal R$ 83,25); cupom `FUNDADORES` (R$ 69,50/mês, só .com.br, com validade no arquivo) | `src/config/planos.ts` (`PRECO_*`, `FUNDADORES`, `CENTAVOS`) |
| Preços USD: mensal 1999, anual 14900 centavos; sem trimestral, Pix, boleto nem cupom | `src/config/planos.ts` (`CENTAVOS_USD`) |
| Texto e estrutura da oferta pública e da home | `src/config/oferta-publica.ts` (`HOME_BR`), `src/i18n/home.ts` |
| Avaliações reais | `src/config/avaliacoes.ts`, página `src/pages/ExAlunosUdemy.tsx`, registro `docs/AVALIACOES-2026-11-08.md` |
| Contato por perfil (`contato@linvuu.com.br` no .br) | `src/config/contato.ts`, `src/config/site.ts` |
| Aulas ao vivo de russo | `src/pages/AulasRusso.tsx`, `src/config/aulas-russo.ts` |

O CI trava preços e frases de venda (`scripts/testar-seo-publico.ts`, ver `01-seo-tecnico.md` §3): mudar copy exige mudar o teste **no mesmo PR, com ordem do Felipe**.

## 2. Promessas permitidas e proibidas
**Permitido** (decisões do Felipe): "2 primeiras aulas grátis" (sessões 1–8, paywall na 9); "áudio em cada frase" **somente onde há botão**; certificado **de conclusão emitido pela Linvuu (CNPJ)**.

**Proibido, com histórico:**
- Absolutos: *"qualquer placa russa em uma hora"*, *"read any Portuguese word aloud"*, *"em semanas, e não em anos"* (removidos). Nada de fluência, prazo ou "qualquer/todo/nunca" sem prova.
- **Áudio sintetizado.** Nunca "gravado por falantes nativos". Nunca "toda frase tem áudio" em tabela sem botão. Dizer com naturalidade que o áudio é sintetizado quando a página fizer promessa sobre áudio.
- Certificado "reconhecido pelo MEC", "oficial" ou equivalente a Celpe-Bras, Goethe, DELF etc.
- Prometer explicação num idioma sobre conteúdo em outro (defeito mais grave já visto: `/curso/it` no .com prometia explicação em inglês sobre 62 aulas em português; só 2 de 62 estão em inglês).
- Vitrine de plano não lançado ("Novos planos em preparação"): o teste proíbe a frase.
- Mascotes (ver `04-ui-design.md` §5).

## 3. Prova social e procedência
- **Não remover `/ex-alunos-udemy`** (no sitemap do .br; 301 do .com para o .br). Manter a procedência honesta: são avaliações reais da Udemy, ditas como tal. Nunca fabricar depoimento, nota ou contagem; número só se estiver em `src/config/avaliacoes.ts` e no registro.
- Seção de avaliação sem conteúdo real **não renderiza** (regra de seção vazia, `04-ui-design.md`).
- `/russo-online`: sem preço nem horário inventado; 7 avaliações reais no .br e seção espelhada em inglês no .com; 21 playlists públicas (7 idiomas × 3 níveis).

## 4. Princípios de CRO da casa
1. Uma oferta clara por página: cartões de plano com **altura igual** e CTA alinhado na base; meio de pagamento é seletor dentro do cartão, nunca dois preços e dois botões empilhados.
2. Home .br mostra as 4 opções (mensal, trimestral, trimestral Pix, anual) e o FUNDADORES; `/assinatura` idem (`id="oferta-atual"`).
3. Teste grátis antes de pedir cartão: texto "Testar 2 aulas grátis, sem cartão" (travado em teste).
4. Mesmo esqueleto nos dois domínios (espelho .com ⇄ .com.br, decisão de 19/11/2026); só a explicação de língua não se espelha.
5. Idioma único por página: PT no perfil `br`, EN no `global`; nunca misturar.

## 5. Plano E-E-A-T (a executar depois da trava, com ordem do Felipe)
| # | Ação | Prova de saída |
|---|---|---|
| 1 | Página de método (`/por-que-linvuu` já existe: `src/pages/PorQue.tsx`) com como a aula é construída, quem revisa e o que é sintetizado | revisão do Felipe + texto sem absolutos (`rg -n "qualquer|nunca|sempre|todo"` revisado) |
| 2 | Autoria visível em cada livro e em cada gramática (quem escreveu, quem revisou, data) | campo `responsavel` do dia/capítulo exibido; 0 página sem autor |
| 3 | Fontes citadas nas regras gramaticais sensíveis (§4 de `02-pedagogia-qa.md`) | link de fonte por regra revisada |
| 4 | Transparência do áudio sintetizado numa linha clara perto do player | `rg -n "sintetiz|synthesi"` presente em pt e en |
| 5 | Dados estruturados coerentes com o que a página mostra (`Course`, `FAQPage`, `Service` em `/russo-online`) | `testar-seo-publico.ts` verde + validação do Rich Results |
| 6 | Reforçar `/ex-alunos-udemy` com procedência por avaliação | cada avaliação com origem e data |

## 6. Critério de saída para 10/10
0 promessa absoluta (`rg` limpo nos arquivos da §1); 0 divergência entre texto e cobertura real (`node scripts/conteudo.mjs --check`); páginas de método, autoria e áudio publicadas e aprovadas pelo Felipe; taxa de conversão medida por funil (`server/funil.ts`, `server/conversoes.ts`) com baseline registrado **antes** de qualquer mudança de copy.
