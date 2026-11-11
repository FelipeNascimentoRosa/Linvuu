# 05 · PLANO — O SITE COMPLETO EM 3 DIAS

> **Arquivado em 11/11/2026 (lote 99).** Substituído por [`docs/plano/`](../plano/EXECUTAR.md) — o único plano em vigor. Mantido só como registro histórico; não execute a partir daqui.

> Plano operativo da Linvuu. Dia 1 começa HOJE.
> Método: organização extrema + repositórios públicos + revisores
> em cada própria língua. Cada linha tem um dono. Sem dono, não é tarefa.

---

## O que significa "completo em 3 dias"

Completo = o essencial de VENDA no ar e funcionando:

1. Checkout funcionando nos dois domínios (dólar incluso).
2. Conteúdo prioritário revisado e indexável.
3. Fábrica de conteúdo ligada (n8n → Postiz).
4. Redes semeadas (nada de perfil fantasma).
5. Medição viva (PostHog + pixel recebendo eventos).

O polimento fino de todos os idiomas continua no motor de 30 dias
(ver `06-MARKETING-30-DIAS.md`). O site vende a partir do Dia 3.

---

## DIA 1 — HOJE — Desbloqueio + fila longa + matéria-prima

**Felipe (manhã, ~2 h):**
- [x] `STRIPE_PRICE_ID_USD` no Render — **já estava definida**; verificado em 09/11 (ver `PENDENCIAS.md` e `docs/ESTADO-ATUAL.md`).
- [ ] Compra de teste de US$ 1 no linvuu.com (reembolsar em seguida, confirmando
      que o acesso cai) — única etapa deste item que depende do Felipe.
- [ ] DNS no Cloudflare (dois domínios): SPF `v=spf1 -all`, DMARC
      `v=DMARC1; p=reject; rua=mailto:hello.linvuu@gmail.com`, MX nulo `0 .`
      — mantendo o TXT google-site-verification existente.
- [ ] Reivindicar o Search Console do linvuu.com (propriedade sc-domain).

**Muse (em paralelo):**
- [ ] T0 — Verificação de contas (a regra de ouro começa aqui).
- [ ] T1 — GitHub: upload do plano + token de leitura para o n8n.
- [ ] T5 — Meta: portfólio, vínculos, pixel, verificação comercial INICIADA
      (a fila mais longa do kit entra no primeiro dia).

**ChatGPT (em paralelo):**
- [ ] PROMPT R1 — as 30 peças de atração (15 EN + 15 PT).
- [ ] PROMPT R2 — as 9 cópias de anúncio (para uso na Semana 2, não antes).

**Claude (à tarde):**
- [ ] PR: 30 aulas de espanhol no `content/indice.en.json` + regenerar
      `COBERTURA-IDIOMAS.md`.
- [ ] PR: avaliações reais (Udemy/Google) na página de avaliações,
      sem nomear a escola anterior.

**Critério de pronto do Dia 1:** compra em dólar testada; fila da Meta
andando; 30 peças em revisão; dois PRs abertos.

---

## DIA 2 — Estrutura + revisores + volume

**Muse:**
- [ ] T2 — Notion: o escritório da operação (4 bancos).
- [ ] T4 — PostHog: painéis "Atração 30".
- [ ] T6 — Redes: YouTube, LinkedIn, TikTok (domínio + app) e Postiz.
      Pré-requisito do Felipe: criar as contas de marca no CELULAR antes.

**Gemini / AI Studio (o dia dos revisores):**
- [ ] Criar os 7 revisores (PT, EN, ES, FR, DE, IT, RU) — template no
      arquivo `03-GEMINI-E-STUDIO.md`, um system prompt em cada língua.
- [ ] Primeira leva: revisar o conteúdo EN dos idiomas com lacuna
      (espanhol, italiano, alemão, francês — números exatos na auditoria).
- [ ] Saída para a "Fila de Revisão" do Notion.

**ChatGPT:**
- [ ] PROMPT R4 — 5 e-mails do ciclo de vida (EN + PT).
- [ ] PROMPT R5 — rascunhos de SEO (lista de palavras-chave do Felipe).

**Claude:**
- [ ] Revisar as 30 peças do R1 e as 9 do R2 (veredito peça a peça).
- [ ] PR: `CHATGPT.md` na raiz do repo (encaminha para `AGENTS.md`).
- [ ] Merge verificado do PR do Muse (T1), conferindo os arquivos.

**Critério de pronto do Dia 2:** Notion vivo; PostHog medindo; 4 canais
conectados no Postiz; revisores rodando a primeira leva; peças aprovadas.

---

## DIA 3 — Fábrica ligada + semeadura + verificação

**Muse:**
- [ ] T3 — n8n: importar os 2 workflows, credenciais, ativar e rodar o
      teste ponta a ponta até a aprovação do Telegram.
- [ ] T7 — Semeadura: 12 rascunhos no Postiz (8 EN + 4 PT), calendário de
      2 semanas, 3 anúncios pessoais.

**Felipe:**
- [ ] Aprovar o teste da fábrica no Telegram.
- [ ] Publicar as primeiras peças MANUALMENTE pelo Postiz (a fábrica
      assume a rotina; o lançamento não espera fila da Meta).
- [ ] Postar o anúncio pessoal no Instagram @felipenrosaa e no LinkedIn.

**Claude:**
- [ ] Smoke de produção: 12 URLs por domínio, como Googlebot.
- [ ] Conferir: evento de teste no Events Manager da Meta (pixel
      28831394486482407) e eventos chegando no PostHog.

**Critério de pronto do Dia 3 (definição de "site completo"):**
- [ ] Compra real testada nos dois domínios.
- [ ] 12+ peças na fila do Postiz, primeiras publicadas.
- [ ] Fábrica ativa com aprovação humana no Telegram.
- [ ] Painéis da Atração 30 recebendo dados.
- [ ] Verificação comercial e app do Instagram em andamento (fila externa,
      registrada — não bloqueia o orgânico).

---

## Se algo atrasar (a regra do plano)

Fila externa (Meta/TikTok) atrasada NÃO para o lançamento: publica-se
manualmente pelo Postiz e a fábrica assume quando as aprovações chegarem.
O que não pode atrasar: checkout, medição e as 30 peças — são os três
pilares da atração.
