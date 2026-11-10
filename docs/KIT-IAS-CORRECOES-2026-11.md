# Correções do Kit IAs v1 — o que mudou e por quê (09/11/2026)

Aplicadas por decisão do Felipe ("faça o que for seguro") após a leitura
completa do kit e a pesquisa de riscos. Os arquivos originais NÃO foram
alterados; a versão corrigida vive nesta pasta.

## 1. Itens EXCLUÍDOS por segurança (não executar)

| Item | Onde estava | Por quê |
|---|---|---|
| DNS "SPF `v=spf1 -all`, DMARC → hello.linvuu@gmail.com, MX nulo" nos dois domínios | 05-PLANO-3-DIAS (Dia 1) e T2 (pendência 3) | Quebra o e-mail real: o .com.br recebe via Cloudflare Routing → Gmail pessoal do Felipe e o .com está autenticado para o Workspace (SPF c/ Google, DKIM publicado, DMARC → contato@linvuu.com.br, TLS-RPT). Substituído pela regra de e-mail no CONTEXTO-MASTER v3. |
| Salvar a chave de API do Postiz num documento "CREDENCIAIS POSTIZ" | Playbook (Z.ai), Tarefa 8 | Segredo em arquivo de texto. Vale a regra do kit v1: chave só no cofre do Felipe; o agente nunca vê nem repete o valor. |

## 2. Fatos corrigidos no CONTEXTO-MASTER (v2 → v3)

- Oferta: "aula 1 grátis / sessões de 30 min / áudio em cada palavra" →
  **2 primeiras aulas grátis, áudio em cada frase**. Vale para TODO o kit:
  os prompts R1 e R4 do ChatGPT e as peças da T7 devem usar a oferta real.
- Nome: "Felipe Valeva Rosa" → **Felipe Nascimento Rosa**.
- Spotify: "playlist de russo" → **21 playlists oficiais públicas (7 idiomas × 3 níveis)**.
- Stack: Render **Starter pago e ativo**; Stripe com **preços BRL e USD já criados**
  (pendente só o merge do PR #501); fábrica n8n/Postiz marcada como **não instalada**.
- Contas: nota de que hello.linvuu@gmail.com precisa ser confirmada como login
  vivo na T0 (a identidade verificada hoje é contato@linvuu.com, Workspace).
- Novo bloco "Segurança da automação" (Postiz Cloud primeiro; n8n ≥ 1.121.0 +
  chave fora do servidor; Telegram com aprovador restrito e timeout = rejeita;
  postagem só via API oficial; checkpoint = parar e devolver ao Felipe).

## 3. Itens do plano que JÁ ESTÃO FEITOS (não repetir)

| Item do plano/auditoria | Estado real verificado |
|---|---|
| Reivindicar Search Console do linvuu.com | **Feito em 08/11**: propriedade sc-domain verificada + reindexação das páginas pedida nos dois domínios. |
| Render (plano pago) | **Feito em 08/11**: Starter US$ 7/mês ativo. |
| Criar preços na Stripe (USD) | **Feitos em 07/11** (mensal US$ 19,99, anual US$ 149, BRL completo + cupom FUNDADORES). O que falta é o **merge do PR #501** para o mensal USD funcionar no site. |
| DKIM/SPF/DMARC dos dois domínios | **Feitos e conferidos em 08/11** via API do Cloudflare (ver regra de e-mail no master v3). |

## 4. O que continua valendo do plano (na ordem segura)

1. **T0** — verificação de contas, só leitura (em andamento em 09/11).
2. T1 — upload dos planos ao GitHub em branch novo + PR (sem merge) e tela do
   token para o Felipe criar (ele digita; valor só no cofre dele).
3. T5 — Meta: portfólio/vínculos/pixel; verificação **iniciada** e parada antes
   de documento/selfie (etapa só do Felipe); conta de anúncios sem pagamento;
   campanha **rascunho** (nunca "publicar e pausar").
4. T2 — Notion (sem o item de DNS da lista de pendências; trocar por
   "PR #501 — merge e teste do mensal USD").
5. T4 — PostHog: só insights/dashboard (sem mexer em privacidade/flags).
6. T6/T3/T7 — dependem de: contas criadas por ele no celular, Postiz Cloud
   conectado por ele, VPS contratada (decisão de gasto dele) para o n8n.
7. Semana 1 de marketing (prompt final dele de 08/11) segue valendo em paralelo:
   orgânico, Brasil, sem publicar/agendar por ele — a fábrica só assume quando
   estiver de pé E ele aprovar a troca de regime.
