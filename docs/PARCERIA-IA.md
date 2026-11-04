> **Entrada atual para Claude e ChatGPT/Codex:** leia primeiro [ESTADO-ATUAL.md](ESTADO-ATUAL.md) e [COORDENACAO-IA.md](COORDENACAO-IA.md). O conteúdo abaixo inclui rodadas históricas; não representa uma verificação atual de produção.

# Linvuu: briefing para o ChatGPT (parceria com o Claude)

> Cole este texto inteiro no ChatGPT, ou peça para ele ler `docs/PARCERIA-IA.md` no repositório `FelipeVRosa/Linvuu`.
> Escrito pelo Claude em 16/10/2026, a pedido do Felipe. Mantido no repositório: quem mudar uma regra atualiza este arquivo.

---

## 0. Quem é quem

- **Felipe Nascimento Rosa:** dono do projeto. Decide produto, preço, marca e tudo o que for irreversível. Escreve em português e prefere respostas curtas e diretas.
- **Luiza Nascimento Rosa:** coautora. Revisa design e traduções.
- **Claude (Anthropic):** trabalha no repositório desde o início. Escreveu a maior parte do código, das aulas e da documentação.
- **Você (ChatGPT):** novo parceiro. Tem acesso ao GitHub do Felipe pelo Composio.

O Felipe pediu honestidade acima de tudo. Isso vale para nós dois: se você discordar de algo que o Claude fez, diga e explique. Se não testou, diga "não testei". Nunca diga que algo funciona sem ter rodado.

## 1. Regras de trabalho em dupla (obrigatórias)

O repositório é **privado** e está no plano gratuito do GitHub, então **não existe proteção de branch**: qualquer um de nós consegue escrever direto na `main`. As regras abaixo funcionam só por combinado:

1. **Nunca faça commit nem push direto na `main`.** Sempre uma branch e um PR.
2. **Prefixo de branch:** `gpt/<assunto>` para você e `claude/<assunto>` (ou nome descritivo) para o Claude. Assim cada um sabe de quem é cada branch.
3. **Merge só com a CI verde:** os checks `build`, `Varredura de segredos (gitleaks)` e `Auditoria completa de dependências` precisam passar. Use squash merge.
4. **Cada área tem um dono por vez.** Antes de mexer num arquivo grande (`src/components/Sessao.tsx`, `server.ts`, `server/billing.ts`, `src/redesign.css`), veja se há um PR aberto do outro tocando nele. Se houver, espere ou combine pelo Felipe.
5. **PRs pequenos**, um assunto por PR. Escreva no corpo do PR o que mudou, o que foi testado e o que *não* foi testado.
6. **Registro:** toda decisão nova vai para `docs/` (o arquivo do assunto). Não deixe decisão só na conversa.
7. **Não reescreva arquivos inteiros** para mudar poucas linhas. Isso esconde o diff e já causou regressões.
8. **Deploy:** cada merge na `main` publica no Render, que está no plano gratuito (decisão do Felipe: não trocar de plano). Para PR só de documentação, coloque `[skip render]` no título.
9. **Não apague** branches, workflows, arquivos de conteúdo nem dados do Firestore sem pedido explícito do Felipe.

## 2. Regras invioláveis (segurança, legal e marca)

- **Segredos:** nunca escreva chave, token ou senha no código, em PR ou no chat. Chaves ficam no painel do Render e no Console do Firebase. A chave pública do Firebase (`VITE_FIREBASE_*`) não pode ser repetida em conversas; uma chave antiga ainda precisa ser revogada pelo Felipe.
- **E-mail pessoal do Felipe:** não vai para nenhum serviço, código ou texto público. O e-mail oficial do site é `hello.linvuu@gmail.com`.
- **Material de terceiros:** PDFs e e-books que o Felipe envia como referência (gramáticas compradas, livros) **não entram no repositório nem no site**. Servem só para conferir fatos e a ordem dos tópicos. Não copie trechos.
- **Materiais públicos (site, loja, marketing):** não cite concorrentes nem instituições anteriores do Felipe. Não faça comparação com outros apps.
- **Sem promessas falsas:** nada de "fluência em X dias", "voz nativa", "áudio profissional" ou "oficial". Os áudios hoje são sintéticos.
- **LGPD:** a medição só roda com consentimento (`src/lib/medicao.ts`), com id aleatório e sem nome nem e-mail. Mantenha assim.

## 3. O produto

- **Linvuu:** cursos de idiomas para quem fala português, de A1 a B1, em sessões de cerca de 30 minutos. Cada aula tem 4 sessões, e cada sessão tem blocos: leitura/diálogo, palavras, gramática, exercícios, "Repita", fale e escreva, revisão.
- **Cursos:** inglês (`en`, 62 aulas, 248 sessões, o mais completo), espanhol (`es`), francês (`fr`), italiano (`it`), alemão (`de`, 72 aulas) e russo (`ru`, 78 aulas). Há também português para estrangeiros (`br`), com explicações em inglês ou espanhol.
- **Site:** https://linvuu.com.br, com Cloudflare na frente. Interface em português (`/`), inglês (`/en`) e espanhol (`/es`).
- **Modelo comercial:**
  - As 2 primeiras aulas (sessões 1 a 8) de cada curso são grátis, sem cartão.
  - Mensal: R$ 139, cartão, renovação automática.
  - 3 meses: R$ 291,90 no Pix ou R$ 417 no cartão/boleto, pagamento único.
  - 12 meses: R$ 999, pagamento único.
  - Ex-aluno: a oferta antiga (cupom LINVUU50) foi descontinuada; a condição atual de ex-alunos é o código FUNDADORES (ver `docs/PRECOS-DEFINIDOS.md`).
  - Reembolso em até 7 dias.
  - **Premium:** R$ 500/mês, com professor no WhatsApp e encontros ao vivo. **Ainda não é vendido.** O site diz "em preparação" e o botão leva a uma lista de interesse.
- **Datas:** lançamento comercial em **5 de novembro de 2026**. Depois disso o Felipe quer fazer a versão internacional ("tudo em inglês").

## 4. Arquitetura atual (como está hoje)

| Camada | Onde | Observação |
|---|---|---|
| Front | Vite + React 19 + TypeScript + react-router 7 | `src/` |
| Páginas | `src/pages/*` | Home, Cursos, Curso, Dia (aula), Assinatura, Conta, Gramática, Livros, Sobre, Legal… |
| Núcleo da aula | `src/components/Sessao.tsx` e `AreaAluno.tsx` | blocos, exercícios, progresso, conclusão |
| Lógica | `src/lib/*` | `content.ts` (carga das aulas), `progresso.ts`, `progressoConta.ts` (Firestore), `assinatura.ts` (Stripe), `compras.ts` (Google Play, ainda desligado), `medicao.ts`, `retomar.ts` |
| Textos da interface | `src/i18n/{pt-BR,en,es}.ts` | toda frase visível passa por aqui |
| Estilo | `src/tokens.css`, `styles.css` (legado), `redesign.css` | paleta: verde-floresta #1E3B2F, papel #F5F1E8, grafite #1D1F1C, ocre #B7791F, tijolo para erro. Valide com `npm run validar:design` |
| Servidor | `server.ts` + `server/*.ts` (Express) | serve o `dist/`, as aulas pagas (`/api/aula`), o áudio privado, o Stripe (`server/billing.ts`) e a medição (`server/medicao.ts`) |
| Conta | Firebase Auth (cliente) e Admin SDK (servidor) | o servidor confere o token e a assinatura; o cliente nunca decide o acesso sozinho |
| App | Capacitor 8, `android/` | empacota o `dist/`; a API vai para `https://linvuu.com.br` |
| Conteúdo | `content/idiomas/<id>/aulas/aula-NNN.json` → `npm run aulas` gera os `dia-NNN.json` | aulas grátis vão no bundle; pagas só pelo servidor |
| Complementos | `content/idiomas/<id>/complementos/*.json` + `scripts/aplicar-complementos.mjs <id>` | reforça até cerca de 40 exercícios por aula |
| Pendentes | `content/idiomas/<id>/pendentes/` | diálogos e leituras de es/fr/it/de/ru já escritos, esperando áudio; ver `docs/PENDENTE-AUDIO.md` |
| Áudio | MP3 com nome = hash FNV-1a do texto; `public/audio/<id>/` (grátis) e `server/audio-privado/<id>/` (pago) | gerados com Edge TTS pelo workflow `audio.yml` |
| CI | `.github/workflows/ci.yml`, `seguranca.yml`, `app-android.yml` (APK de teste), `audio.yml` | |

Comandos: `npm install`, `npm run dev`, `npm run build` (valida o conteúdo, gera SEO e faz o build), `npx tsc --noEmit`, `npm run testar:seguranca`, `npm run testar:medicao`, `npm run validar:design`.

Para testar como produção: `npx vite build` e depois `NODE_ENV=production PORT=<porta nova> npx tsx server.ts`.

## 5. O que já foi feito recentemente (outubro de 2026)

- **PR #256:** medição com consentimento, reforço automático de exercícios em todos os idiomas e o padrão de idiomas (`docs/PADRAO-IDIOMAS.md`).
- **PR #257:** exercícios "Repita" em es/fr/it/de/ru.
- **PR #258:** diálogos e leituras novos de es/fr/it/de/ru em `pendentes` (falta só o áudio).
- **PR #259**, a partir das avaliações suas e do Gemini, conferidas no código antes:
  - `/assinatura` mostra os planos sem login; o plano escolhido volta depois do cadastro e o checkout só abre com um novo clique.
  - A página do curso separa as aulas por nível (A1/A2/B1), mostra ✓ e tem "Continuar". A Home tem "Continuar de onde parou".
  - Um só "Concluir" (a sessão marca o dia na trilha e na conta).
  - Exercícios com barra de progresso, aviso de medição fora do enunciado e botão fixo no celular.
  - Cores fora da paleta trocadas por tokens; o modo escuro cobre o topo; `viewport-fit=cover` e áreas seguras.
  - App Android com abas embaixo.
- **O que as avaliações apontaram e não era defeito:** os livros "vazios" na Home eram só a captura de tela (as imagens carregam quando a página rola até elas).
- **Recusado por enquanto:** cache offline de aulas pagas no `localStorage` sem prazo de validade (quem cancelasse continuaria com o conteúdo).

## 6. A grande tarefa: separar WEBSITE e APK

### O que o Felipe pediu
Duas frentes claras: **WEBSITE** (vende pelo Stripe) e **APK** (vende pelo **Google Play Billing**, porque a Google Play não aceita Stripe para conteúdo digital dentro do app).

### Recomendação honesta (do Claude)
**Não duplique o site em duas pastas.** Hoje o app é o mesmo código do site, empacotado pelo Capacitor. Copiar tudo para `APK/` e `WEBSITE/` faria cada correção de aula, exercício ou design precisar ser feita duas vezes, e as cópias divergiriam em semanas.

A separação certa é por **camada de plataforma**, com o núcleo compartilhado:

```
src/
  nucleo/  (ou o src/ atual)  aulas, exercícios, progresso, design: igual nos dois
  plataforma/
    website/   Stripe (checkout, portal), SEO, rodapé, newsletter, BarraTopo
    apk/       Google Play Billing, abas embaixo, restaurar compras, offline (depois)
    index.ts   escolhe a plataforma pelo alvo do build
android/       projeto nativo do Capacitor (já existe)
server/
  billing.ts   Stripe (já existe)
  play.ts      NOVO: verificação de compras da Google Play + notificações (RTDN)
docs/
  WEBSITE.md   NOVO
  APK.md       NOVO (juntar APP.md, COBRANCA-APP.md e AUDITORIA-APP.md)
```

- **Alvo do build:** `VITE_ALVO=website|apk`. O build do APK **não deve conter o código do Stripe** (nem preço do site nem link de pagamento externo). Isso facilita a revisão da loja.
- **Regra de acesso no servidor:** `acesso = Stripe ativo OU Google Play ativo e não expirado`, com o uid do Firebase como identidade. Hoje só existe o Stripe.

Se, depois de ler o código, você achar que duas pastas separadas são melhores, defenda com argumentos para o Felipe decidir. A decisão é dele.

### O que já existe para o APK
- `src/lib/compras.ts`: começo do RevenueCat (`@revenuecat/purchases-capacitor` já está no `package.json`). Fica desligado até `VITE_COMPRAS_ATIVAS=true` e `VITE_REVENUECAT_ANDROID_KEY` estarem definidos. **Não há nenhuma verificação no servidor ainda.**
- `src/lib/assinatura.ts`: `compraNoAppDisponivel()` bloqueia o Stripe dentro do app nativo.
- `.github/workflows/app-android.yml`: gera um APK de teste (debug).
- Decisões e riscos em `docs/COBRANCA-APP.md`, `docs/LANCAMENTO.md`, `docs/APP.md` e `docs/AUDITORIA-APP.md`. **Leia antes de começar.**

### O que falta para o APK vender (ordem sugerida)
1. **Felipe:** abrir a conta de organização na Google Play (CNPJ), criar o app no Play Console e os produtos (mensal R$ 139; decidir o trimestral, que na loja seria compra única e não assinatura) e configurar os testadores de licença. Sem isso nenhuma compra pode ser testada.
2. **Escolher** entre RevenueCat (já instalado, cuida dos recibos e cobra taxa) e plugin próprio com a Google Play Developer API. O Felipe decide; apresente o custo dos dois.
3. **Servidor** (`server/play.ts`):
   - `POST /api/app/verificar-compra`: recebe `purchaseToken`/`productId` com o token do Firebase, verifica na Google e grava em `assinaturas/{uid}` com `origem: 'play'` e a data de expiração.
   - Confirmar (acknowledge) toda compra no prazo exigido; sem isso, a Google reembolsa.
   - Receber as RTDN (Pub/Sub): renovação, cancelamento, reembolso, pausa. Validar a origem.
   - Rota para restaurar compras.
   - O `purchaseToken` fica só no servidor.
   - Se for RevenueCat, o equivalente é o webhook com verificação do segredo.
4. **Firestore:** o cliente só lê o próprio documento; a escrita é só pelo servidor. Atualizar `firestore.rules`.
5. **Política da loja:** confirmar na política oficial se o app pode liberar o acesso de quem assinou no site e se pode mencionar o site. Até lá, o APK **não mostra preço nem link do site**.
6. **Testes:** compra, renovação, cancelamento, expiração, reembolso, troca de aparelho, assinante do site entrando no app e o contrário. Sempre em aparelho real, com testador de licença. Nunca com cobrança real.
7. **APK de release:** keystore em GitHub Secrets (nunca no repositório), `signingConfig`, ícone e splash com a marca, ficha da loja, política de privacidade e exclusão de conta.
8. **Requisito da loja:** a Google Play rejeita app que é "só um site empacotado". O app precisa de algo nativo (lembretes locais, aulas baixadas ou offline com prazo). Planeje antes do envio.
9. **Tamanho:** os áudios (cerca de 87 MB) vão dentro do APK. Considere servir o áudio pago por download com cache, em vez de empacotar tudo.

## 7. Outras pendências (para saber do contexto)

- **Áudio:** o Edge TTS não tem licença comercial clara. O Felipe está avaliando o Azure TTS. Depois da decisão: trocar o motor em `scripts/gerar-audios.mjs`, rodar `node scripts/ativar-pendentes.mjs <id>` por idioma, gerar só os áudios que faltam (cerca de 740 MP3 novos) e rodar `scripts/proteger-audio.mjs`. Atenção: `existe` só confere a pasta `public/`; com `so_gratis=false`, todo o áudio privado é regenerado.
- **Métricas:** falta definir `METRICAS_TOKEN` (24 caracteres ou mais) no Render para ler `GET /api/metricas`.
- **Conteúdo:** alemão e russo ainda têm menos de 40 exercícios em várias aulas; 6 simulados de inglês têm de 33 a 39. As traduções de es/fr/it/de/ru precisam de revisão humana.
- **Felipe (fora do código):** Search Console (sitemap), revogar a chave antiga do Firebase, compra de teste no Stripe, revisão jurídica dos termos e da privacidade, contador para os impostos das duas vendas.
- **Desatualizado:** `docs/CONTEXTO.md` dizia que o repositório é público. Hoje ele é privado.

## 8. Sua primeira resposta

Antes de escrever código:
1. Leia `docs/CONTEXTO.md`, este arquivo, `docs/COBRANCA-APP.md`, `docs/APP.md`, `src/lib/assinatura.ts`, `src/lib/compras.ts` e `server/billing.ts`.
2. Responda ao Felipe, em português e curto:
   - o que você entendeu;
   - onde discorda do plano WEBSITE/APK acima e por quê;
   - o que precisa dele (contas, decisões);
   - qual seria o seu primeiro PR.
3. Sugestão de primeiro PR: criar `src/plataforma/{website,apk}` e o `VITE_ALVO`, movendo **sem mudar comportamento** o que é só do site (Stripe/assinatura) e o que é só do app (`BarraInferior`, `compras.ts`). Escreva `docs/WEBSITE.md` e `docs/APK.md`. Teste com `npm run build`, `npx tsc --noEmit` e um teste no navegador nos dois alvos. Não mexa ainda na lógica de pagamento.
