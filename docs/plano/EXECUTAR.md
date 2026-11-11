# Como executar o plano — instruções para o agente e para o Felipe

Este arquivo é o único que precisa ser lido no começo de cada sessão. Ele não substitui o `CLAUDE.md` (regras do repositório) nem o `PAINEL.md` (memória do projeto): ele diz **qual é o próximo trabalho e como entregá-lo**.

O plano foi escrito uma vez, por um modelo mais forte, para ser executado por um modelo mais barato. Nenhum lote pede para chamar o modelo forte de novo.

## 1. O que o Felipe cola para começar uma sessão

```
Leia docs/plano/EXECUTAR.md e docs/plano/ESTADO.md. Execute o próximo lote que cabe a você, do começo ao fim, seguindo o ciclo do EXECUTAR.md. Não pergunte o que fazer: o arquivo diz.
```

No Claude Code, o comando `/lote` faz o mesmo. Para um lote específico: `/lote 17`.

## 2. Como o agente escolhe o lote

1. Abra `docs/plano/ESTADO.md`. Vá de cima para baixo.
2. O próximo lote é o **primeiro** com estado `a fazer` cujos lotes da coluna "depende de" (em `LOTES.md`) estão `mergeado` ou `em produção`.
3. Se esse lote é **[F]** (só o Felipe): não o execute. Prepare o que ajuda o Felipe a fazê-lo em 10 minutos — o texto pronto, a lista de cliques, o comando de conferência —, mude o estado para `espera o Felipe` com uma linha dizendo o que falta, e siga para o próximo lote.
4. Se é **[A+F]**: faça toda a parte [A]; a parte do Felipe vai para o relatório final como pedido único e claro.
5. Se há **3 PRs abertos**, não abra o quarto. Pare e entregue a lista do que o Felipe precisa aprovar, em ordem, com uma linha por PR.

## 3. O ciclo de um lote

1. **Anuncie em 3 linhas:** número e nome do lote, o que vai mudar, como vai provar (o DOD de `LOTES.md`, copiado).
2. **Releia** a linha do lote em `LOTES.md` e as perguntas "Antes de qualquer tarefa" do `CLAUDE.md`.
3. **Confira a evidência.** Ela foi medida em 11/11/2026. Se o fato mudou (alguém já consertou, o número é outro), escreva isso em `ESTADO.md` e ajuste o escopo — não conserte o que não está mais quebrado.
4. **Branch nova a partir da `main` atualizada.** Um lote, um PR.
5. **Implemente só o lote.** Defeito visto fora dele vai para "Achados" no `PAINEL.md`, não para o código.
6. **Prove.** Rode o DOD e os checks do tipo de mudança:
   - rota, título, metadado ou sitemap: `npm run build` e `node --import tsx scripts/testar-inventario-seo.ts`;
   - visual: `npm run validar:design` e capturas em 390×844 e 1440×900 com `scripts/design/foto.mjs`;
   - domínio ou idioma: `npm run testar:dominio`;
   - cobrança: `node --import tsx scripts/testar-contrato-billing.ts`, sempre em modo de teste;
   - sempre: `npm run lint`.
7. **Atualize no mesmo PR:** a linha do lote em `ESTADO.md` (estado, número do PR, prova em uma linha) e o `PAINEL.md` (§§ 2, 4, 6, 8).
8. **Abra o PR** com: o que mudou, a saída real do DOD colada, o que não foi verificado, e como reverter.
9. **Relatório de fim de sessão**, no formato do `docs/PROMPT-MESTRE-DEEPSEEK-v4.1.md` §5, com no máximo 3 pedidos ao Felipe, cada um com a recomendação e o custo de esperar.

## 4. Defeito, gosto e dinheiro — quem decide o quê

| Tipo | Exemplos | O agente |
|---|---|---|
| Defeito | texto falso, link quebrado, e-mail que não recebe, teste vermelho, `lang` ausente | conserta e reporta |
| Gosto | aparência, ordem de seções, texto de venda, foto | propõe com antes/depois e **para** |
| Dinheiro e risco | preço, parcelamento, produto no Stripe, DNS, regras do Firestore, histórico do Git, publicação na loja | prepara tudo e **espera ordem escrita na sessão** |

O que o agente nunca faz, mesmo com teste falhando: mesclar sem a regra de merge que estiver escrita no `CLAUDE.md` no dia; escrever no Stripe, no DNS, no Search Console ou no Render sem ordem na conversa; publicar `firestore.rules`; reescrever histórico; mudar preço fora de `src/config/planos.ts` e de `docs/PRECOS-DEFINIDOS.md`; inventar avaliação, aluno, número ou prazo; afrouxar teste para passar.

## 5. Quando parar

- DOD cumprido e PR aberto: pare e relate. Não emende o lote seguinte no mesmo PR.
- Duas tentativas falhadas no mesmo lote: pare. Estado `bloqueado`, com o que tentou (saídas coladas), por que falhou e 3 caminhos com recomendação.
- Fila com 3 PRs abertos: pare (item 5 do §2).
- A evidência do lote não confere mais: registre e passe ao próximo.

## 6. A cada 10 lotes mergeados

Cole no `PAINEL.md` os 6 números do funil (visitas, contas, sessão 1, sessão 8, checkouts, pagantes). Se dois blocos de 10 seguidos não mexerem em nenhum deles, a fila está errada: pare a higiene e puxe para a frente os lotes de motor `turma`, `B2B` e `editorial`.

## 7. O ritual do Felipe (15 minutos por dia)

1. Abrir os PRs verdes e aprovar ou devolver com uma linha. Nenhum PR verde dorme duas noites.
2. Responder os pedidos do último relatório com **sim**, **não** ou **adiar até [data]**.
3. Uma linha no diário do `PAINEL.md` §10.

Às sextas, mais 30 minutos: conferir os portões de `ESTADO.md` e os resgates do código FUNDADORES.

## 8. Se algo neste plano estiver errado

O plano foi escrito com os fatos de 11/11/2026. Fato manda em plano: se a medição de hoje desmente um lote, o agente registra a medição em `ESTADO.md`, marca o lote como `bloqueado — evidência mudou` e segue. Lote novo só entra pelo lote 100 (reescrita nos portões) ou por ordem do Felipe — nunca por iniciativa do agente no meio da fila.
