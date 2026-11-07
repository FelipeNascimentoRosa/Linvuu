# Próximas mudanças (roteiro)

Lista viva. Cada item diz o que falta, por quê e de quem depende. Marque como feito com a data e o PR.

## 1. Idiomas da interface (inglês e espanhol)
- [ ] Traduzir a interface do site (menus, botões, páginas, mensagens, rodapé, e-mails) para **inglês** e **espanhol**. Hoje só há `src/i18n/pt-BR.ts`; o `src/i18n/locales.ts` já prevê novos idiomas (copie o pt-BR, traduza e ative).
- [ ] Textos fixos fora do `i18n`: as páginas `Dia.tsx`, `Curso.tsx`, `Navegacao.tsx`, `Paywall.tsx`, `Sessao.tsx` (começou no curso `br`, com `src/lib/textos.ts`), `Assinatura.tsx`, `Conta.tsx`, `Legal.tsx`, `Cursos.tsx`, `Gramatica.tsx`, e os componentes da Home.
- [ ] Rotas com idioma (`/en/...`, `/es/...`) e `hreflang` em todas as páginas; sitemap com as três versões.
- [ ] Termos de uso, política de privacidade e página de preços traduzidos com revisão jurídica (não basta traduzir).
- [ ] Explicações das aulas: hoje o português é o idioma das explicações nos cursos da Linvuu. Decidir se o aluno escolhe o idioma da explicação (o campo `en` e `es` já existe no dado, mas `MOSTRAR_INGLES = false` em `Sessao.tsx`).
- [ ] Revisão por falante nativo de cada idioma antes de publicar.

## 2. Áudio
- [ ] **ElevenLabs** para todos os áudios (quando houver plano pago). O gerador atual usa Edge TTS (`scripts/gerar-audios.mjs`); trocar o provedor mantendo o hash do texto como nome do arquivo, para não regerar o que já existe.
- [ ] Ouvir e aprovar as vozes (nasais, «r», «lh», «t/d» antes de «i» no português; equivalentes em cada idioma).
- [ ] Migrar o português para Azure Speech ou ElevenLabs antes do lançamento comercial (decisão de licença).

## 3. Pagamentos (Stripe) — você configura quando estiver pronto
- [ ] Trocar para as chaves **live** no Render só na data de lançamento; manter `STRIPE_PRICE_ID` e o nome público da conta.
- [ ] Publicar o portal de cliente do Stripe e conferir o reembolso de 7 dias.
- [ ] Revisar o fluxo de cancelamento e o aviso de Pix/boleto.
- [ ] **Compra dentro do app:** Google Play e App Store exigem cobrança própria para conteúdo digital vendido dentro do app. Decidir antes de publicar: (a) cobrança pela loja (Google Play Billing / StoreKit) com o servidor reconhecendo a compra, ou (b) app sem venda, com assinatura feita no site. Ver `docs/APP.md`.

## 4. Login e conta
- [ ] Firebase: adicionar o domínio `localhost` (usado pelo app Android) em Authentication → Domínios autorizados.
- [ ] Login com Google dentro do app (plugin nativo do Firebase; o popup não funciona no WebView).
- [ ] Recuperação de senha, verificação de e-mail e exclusão de conta pelo próprio usuário (exigência das lojas e da LGPD).
- [ ] Ativar App Check (reCAPTCHA na web; App Attest / Play Integrity no app).

## 5. App (iOS e Android)
- [ ] Android: APK de pré-lançamento pelo GitHub Actions (`.github/workflows/app-android.yml`) — **feito nesta etapa**.
- [ ] Android: ícone, splash screen, nome e cores do app (ícone com a marca, sem emoji); assinatura de release (keystore guardada em Secrets do GitHub, nunca no repositório).
- [ ] Android: AAB para a Play Store, ficha da loja, política de privacidade publicada, classificação de conteúdo.
- [ ] iOS: exige um Mac (ou um workflow `macos-latest` no GitHub Actions) e conta de desenvolvedor Apple.
- [ ] Modo offline: decidir o que baixar (aulas grátis e áudios já estão no pacote; sessões pagas precisam de assinatura online).
- [ ] Testes em aparelhos reais (Android e iPhone) antes de cada envio.

## 6. Qualidade e infraestrutura
- [ ] Render: plano pago (sem hibernação) e `Health Check Path` `/healthz`.
- [ ] Monitoramento de erros (ex.: Sentry ou o próprio log do Render) e alertas de disponibilidade.
- [ ] Análise de uso sem dados pessoais (medir aulas concluídas, não pessoas).
- [ ] Testes automáticos de ponta a ponta das aulas grátis e do fluxo de assinatura (Playwright).
- [ ] Acessibilidade: revisão com leitor de tela e contraste em todas as páginas.

## 7. Conteúdo
- [ ] Revisão por professor nativo de cada idioma (espanhol: Espanha ou México; italiano; alemão; russo; português para estrangeiros).
- [ ] Revisão jurídica dos livros enviados como referência (`docs/PLANO-PORTUGUES.md`): uso só como conferência de fatos e ordem de tópicos.
- [ ] Capas e vitrine: a capa de português já existe (`public/livros/br-a1-a2-v1-*.webp`).
