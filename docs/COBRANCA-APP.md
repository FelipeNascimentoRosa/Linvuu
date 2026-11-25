# Cobrança no app: Google Play Billing (decisão de 10/10/2026)

## Decisão
A primeira versão do app vende assinatura **dentro do app**, pelo Google Play Billing, porque conteúdo digital vendido no app precisa usar a cobrança da loja. A assinatura pelo site (Stripe) continua existindo. O acesso vale pelas duas origens.

Racional registrado: conversão melhor e experiência nativa. Custo: trabalho de backend e atraso de algumas semanas. Ver `docs/LANCAMENTO.md`.

## Consequências que mudam o plano

### 1. A conta da loja precisa existir antes
Não é possível testar compras sem o app cadastrado no Play Console, com produtos de assinatura criados e testadores de licença configurados. Portanto a **conta de organização (CNPJ) precisa ser aberta no início do desenvolvimento**, não no lançamento. A verificação pode levar semanas; abra logo que os documentos estiverem prontos.

### 2. Dois sistemas de cobrança, um só acesso
- **Google Play:** a loja é a vendedora (merchant of record) e cuida de impostos da venda no app. Reembolso e cancelamento passam pela loja.
- **Stripe (site):** a organização é a vendedora. Impostos, nota fiscal e reembolso são responsabilidade dela.

O servidor precisa decidir o acesso considerando as duas fontes:
`acesso = assinatura Stripe ativa OU assinatura Play ativa (não expirada)`.

Quem é assinante no site deve continuar com acesso no app, e quem assina no app deve ter acesso no site. A identidade é o uid do Firebase.

### 3. Regra de direcionamento: verificar antes de publicar
A política da loja proíbe levar o usuário a pagamento externo para conteúdo digital dentro do app. Não está claro, pelas fontes que consultei, se o app pode **liberar acesso para quem comprou no site** ou se pode **mostrar o link ou o preço do site** dentro do app. Algumas categorias têm exceções (como leitores de conteúdo); não sabemos se educação se enquadra. **Confirme na política oficial e, se necessário, com orientação jurídica antes de programar essa parte.**

### 4. Impostos e contabilidade
Pergunte ao contador como a receita da loja (com a Google como vendedora) e a receita do Stripe (com a organização como vendedora) serão tratadas, inclusive a nota fiscal. A escolha muda o cadastro fiscal da organização.

## Arquitetura proposta

**App (Capacitor)**
- Plugin de compra do Google Play para Capacitor. Antes de adotar, confira se o plugin está mantido e a versão suporta o Capacitor atual.
- Alternativa gerenciada: RevenueCat, que cuida de recibos e de entitlements em várias fontes. Avalie a taxa e a dependência antes de escolher.
- Compra enviada com `obfuscatedAccountId` = uid do Firebase, para vincular a compra à conta.

**Servidor**
1. `POST /api/app/verificar-compra`: recebe `purchaseToken` e `productId` do app (com token do Firebase), consulta a Google Play Developer API e grava a assinatura em `assinaturas/{uid}` com origem `play` e data de expiração.
2. **Confirmação (acknowledge):** toda compra precisa ser confirmada dentro do prazo exigido pela loja. Sem confirmação, o Google reembolsa automaticamente. Confirme o prazo vigente na documentação oficial.
3. **Notificações em tempo real do Google (RTDN)** via Pub/Sub: renovação, cancelamento, expiração, reembolso e pausa. Validar a origem de cada mensagem.
4. `server/billing.ts`: `acesso()` passa a considerar a origem Play, além do Stripe.
5. Rota de restauração de compras para quem trocou de aparelho.

**Dados**
- `assinaturas/{uid}`: origem (`stripe` ou `play`), produto, estado, expiração, identificador da compra (`purchaseToken` guardado no servidor, nunca exposto ao navegador).
- Regras do Firestore: o cliente só lê o próprio documento. Escrita só pelo servidor (Admin SDK).

**Testes**
- Testadores de licença configurados no Play Console (não cobram de verdade).
- Cenários: compra, renovação, cancelamento, expiração, reembolso, troca de aparelho, assinante do site entrando no app, assinante do app entrando no site.
- Teste em aparelho real antes de qualquer envio.

## Produtos
- Mensal: R$ 139 (mesmo preço do site).
- Trimestral: R$ 417 (no site, pagamento único). **No app, o plano trimestral não é assinatura recorrente na loja.** Decidir: oferecer só mensal no app, ou criar um produto de compra única de 3 meses (produto de compra única, não assinatura). Confirme o preço em reais na loja.
- Preços e descrições de produto precisam bater com o site.

## Promessas que não podemos fazer agora
A conversa mencionou que o Linvuu será "melhor em todos os aspectos" do que concorrentes, com "áudios profissionais" e "livros gratuitos de gramática", e que a conversão do app será melhor. Por enquanto:
- **Áudios:** são sintéticos (Edge TTS). "Áudio profissional" e "voz nativa" só podem entrar na ficha e no site depois da troca de provedor ou gravação, e com revisão.
- **Comparações com concorrentes:** não publicar em ficha de loja nem no site sem prova. Comparação pública sem base pode gerar problema legal (propaganda comparativa) e rejeição na loja.
- **Conversão melhor:** é hipótese de mercado, não resultado. Medir depois do lançamento.
- **Livros gratuitos:** só publicar conteúdo original ou de domínio público, com revisão jurídica. Não usar textos dos livros de referência.
- **Pontos e gamificação:** o XP atual é lido do servidor; não prometer recompensas que dependam de regras ainda não implementadas.

As regras de marca do projeto valem para tudo isso: sem promessa de fluência, prazo ou "oficial".

## Ordem de execução
1. Abrir a conta de organização (CNPJ) e criar o app no Play Console (pode ser em faixa interna, sem publicar).
2. Definir produtos e preços.
3. Escolher o plugin ou o RevenueCat.
4. Implementar verificação de compra, RTDN e a regra `acesso` com as duas origens.
5. Testar com testadores de licença, em aparelho real.
6. Revisão jurídica da política de direcionamento e da parte fiscal.
7. Faixa fechada com os testadores.
8. Lançamento.

## Pendências suas
- Abrir a conta de organização agora (documentos do CNPJ, contrato social, e-mail e site da empresa).
- Escolher entre plugin próprio e RevenueCat.
- Decidir a oferta do plano trimestral no app.
- Falar com contador sobre impostos das duas vendas.
- Falar com advogado sobre a regra de direcionamento e o texto dos termos.

## Estado da integração do SDK (branch feat/revenuecat-sdk)
- Pacote: `@revenuecat/purchases-capacitor` 13.7.3 (peer: `@capacitor/core` >= 8, compatível com o projeto).
- Código: `src/lib/compras.ts`. Desligado por padrão.
- Ligar no build: `VITE_COMPRAS_ATIVAS=true` e `VITE_REVENUECAT_ANDROID_KEY=<chave pública do SDK Android>`.
- Chave com prefixo `test_` = Test Store do RevenueCat (sem cobrança real). Para a Play, usar a chave Android de produção (prefixo `goog_`).
- Ainda não ligado a tela de assinatura nem a `getOfferings`/`purchasePackage`. Isso entra depois da conta da Play e dos produtos existirem.

### Configuração no RevenueCat (Test Store, 10/10/2026)
- Entitlement: identificador `Premium` (nome de exibição `com_linvuu_app_pro`). É esse identificador que o app deve checar.
- Produto: `Premium`, assinatura mensal, na Test Store (preço de teste USD 30, sem valor real). Não é o preço final.
- Pendente: associar o produto `Premium` ao entitlement `Premium` (Attach).
- Yearly, Lifetime e produto duplicado foram removidos da configuração de teste.
- Os produtos reais (mensal R$ 139, trimestral) só serão criados na Play, quando a conta estiver aprovada.

## Estado em 21/10/2026: código pronto, desligado (branch claude/apk-rodada4)
O app e o servidor já sabem vender e reconhecer a assinatura da Play. Nada liga sozinho.

**App** (`src/plataforma/apk/AssinaturaPlay.tsx`, `comprasPlay.ts`, `comprasPlayModelo.ts`)
- Tela Conta: preço e frequência vindos da Play, renovação automática e como cancelar aparecem antes do botão. Restaurar compra. Gerenciar no Google Play quando ativa.
- Não mostra preço, Pix, boleto nem link do site (política de pagamentos: proibido direcionar a outro meio de pagamento). Quem assinou no site só vê que já tem acesso (app "somente consumo" é permitido).
- Build só liga com `VITE_BILLING_MODE=google-play`, `VITE_REVENUECAT_ANDROID_KEY=goog_…` (chave PÚBLICA do SDK) e `LINVUU_COBRANCA_PLAY_AUTORIZADA=sim`. Sem os três, o build falha.
- Biblioteca: RevenueCat Capacitor 13.7.4 → purchases-android 10.27.0 → Play Billing Library 8.3.0 (exigida desde 31/08/2026).

**Servidor** (`server/play.ts`, `server/billing.ts`)
- `acesso = Stripe ativo OU entitlement Play ativo`, consultando `GET https://api.revenuecat.com/v1/subscribers/{uid}` com `REVENUECAT_SECRET_KEY=sk_…` (só na Vercel, nunca no app).
- Entitlement: `REVENUECAT_ENTITLEMENT` (padrão `Premium`). Compras de testadores (sandbox) só liberam com `REVENUECAT_ACEITAR_SANDBOX=true` — ligue só durante o teste fechado.
- Carência de pagamento da Play mantém acesso; reembolso e expiração tiram.

**Passos que só o dono pode fazer, na ordem**
1. Play Console (conta de organização): criar o app `com.linvuu.app`, perfil de pagamentos (merchant) e conta bancária.
2. Monetizar › Assinaturas: produto `linvuu_mensal`, plano base mensal renovável, preço em BRL. (Trimestral: decidir se vira plano base de 3 meses.)
3. Google Cloud: conta de serviço com acesso à Play Developer API; convidar no Play Console com permissão financeira; enviar o JSON ao RevenueCat (Project › Google Play).
4. Notificações em tempo real (RTDN): tópico Pub/Sub indicado pelo RevenueCat.
5. RevenueCat: app Android com o pacote `com.linvuu.app`, produto ligado ao entitlement `Premium`, Offering "default" com o pacote mensal. Copiar a chave pública `goog_…` (app) e a secreta `sk_…` (servidor).
6. Testadores de licença (Configuração › Testes de licença) e faixa de teste interno; o app precisa ser instalado pela Play para a compra funcionar.
7. Render: `REVENUECAT_SECRET_KEY`, `REVENUECAT_ACEITAR_SANDBOX=true` (só no teste). Build do app com as três variáveis acima.
8. Teste em aparelho real: compra, cancelamento, restaurar em outro aparelho, reembolso, assinante do site entrando no app. Depois, `REVENUECAT_ACEITAR_SANDBOX` desligado.
9. Política de privacidade: incluir Google Play (pagamento) e RevenueCat (validação de compras) entre os fornecedores; formulário de Segurança dos dados com "histórico de compras".

**Testes**: `node --import tsx scripts/testar-play-modelo.ts` (servidor, oferta, guardas) e `node scripts/testar-play-apk.mjs` (tela com SDK simulado). Não substituem a compra real com testador de licença.
