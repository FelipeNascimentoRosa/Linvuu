# App Android — primeira abertura, meta diária e decisões de domínio (08/11/2026)

**Estado:** implementado e testado em navegador (Chromium, 320–390 px). Não testado em aparelho Android; não publicado na Play.

## O que entrou
- **Primeira abertura (4 telas):** língua materna (Português ou English) → "Feito por professores de idiomas" → idioma de estudo → meta diária (1, 2 ou 3 sessões). A língua materna define interface e explicações (`/` ou `/en`) e pode ser trocada em Ajustes. Quem já estudou no aparelho não vê as telas.
- **Início:** abre no idioma de estudo escolhido; cartão "Meta de hoje" (sessões com exercícios corrigidos hoje, contadas no aparelho); cartão "Feito por professores de idiomas".
- **Tamanho:** `llms*.txt`, `robots-*.txt` e `sitemap-*.xml` do site não entram mais no pacote do app.
- **Testes:** `scripts/testar-primeira-abertura-apk.ts` (modelo, no CI) e `scripts/testar-primeira-abertura-apk.mjs` (fluxo PT e EN, axe, 320 px; na revisão do APK). Os testes de navegador antigos começam depois das telas iniciais.

## Decisões
1. **Um app só** (`com.linvuu.app`) para os dois públicos. A escolha da língua materna substitui a escolha de domínio. Dois apps dividiriam avaliações, downloads e trabalho de loja.
2. **Backend único:** o app continua falando com a API em `linvuu.com.br` (o mesmo serviço da Vercel atende `.com` e `.com.br`). Não muda nada de conta, progresso ou acesso conforme a língua escolhida.
3. **Sem venda dentro do app nesta versão.** No Brasil, conteúdo digital vendido dentro do app precisa usar o Google Play Billing; pelas notícias de 2026, a abertura para outras formas de pagamento no resto do mundo está prevista para 30/09/2027 (conferir na política oficial antes de mudar). Até ligar o Play Billing (ver `docs/COBRANCA-APP.md`), o app não mostra preço nem link de compra.

## Próximos passos para a loja (não feitos aqui)
- Conta de desenvolvedor de **organização** (CNPJ) no Play Console. Conferir na data se exige D-U-N-S e se o teste fechado com testadores vale só para contas pessoais.
- Login com Google nativo (o popup não funciona no WebView).
- Assinatura de release (AAB), ícone adaptativo, splash e ficha da loja (Data safety, política de privacidade, URL de exclusão de conta já pública).
- Lembrete diário opcional (notificação local) ligado à meta diária; exige permissão de notificação do Android 13+.
- Teste em aparelho físico com TalkBack e texto ampliado.
