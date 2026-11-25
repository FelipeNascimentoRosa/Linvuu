# Segurança da Linvuu (site e futuro app)

Última revisão: 08/10/2026. Dividido em: **o que o código já faz**, **o que o GitHub faz**, **o que só você pode ativar** (painéis de terceiros) e **regras para o app**. Nada aqui é garantia de que o sistema é invulnerável; é uma lista do que foi verificado e do que falta.

## 1. No código (já ativo depois do deploy)
| Proteção | Onde | Como conferir |
|---|---|---|
| Cabeçalhos: HSTS, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP; sem `X-Powered-By` | `server/seguranca.ts` | `npm run testar:seguranca` |
| Content-Security-Policy (scripts só do próprio site e do login Google; sem `unsafe-inline` em scripts; sem frames de terceiros; `frame-ancestors 'none'`) | `server/seguranca.ts` | idem; se algo legítimo for bloqueado, defina `CSP_MODO=report` na Vercel (só observa) e ajuste a lista |
| Limite de requisições por IP: cobrança 30/min, sessões 120/min, resto da API 300/min (resposta 429) | `server/seguranca.ts` | idem |
| Corpo de requisição limitado a 10 KB; erros sem detalhes internos | `server.ts`, `server/seguranca.ts` | idem |
| Rotas antigas do protótipo removidas (perfil falso em memória, download do projeto, análise por IA aberta que gastaria a chave do Gemini, webhook sem assinatura) | `server.ts` | `/api/*` desconhecido responde 404 JSON |
| Sessões pagas (9 em diante) só saem do servidor com token do Firebase verificado e assinatura ativa no Stripe | `server/billing.ts` | idem |
| Dependências sem vulnerabilidade conhecida (a do `@grpc/grpc-js` foi corrigida com `overrides`) | `package.json` | `npm audit` = 0 |
| JSON-LD escapa `<` | `src/components/JsonLd.tsx` | |
| Regras do Firestore: o dono só altera o próprio `nome`; XP, streak e lições não podem ser forjados pelo navegador | `firestore.rules` | **precisa ser publicada** no Console (item 3) |

## 2. No GitHub (automático)
- **CI** a cada push e pull request: build, `npm audit --audit-level=high` e `npm run testar:seguranca`. Permissões mínimas (`contents: read`), sem guardar credencial no checkout.
- **Segurança** (`seguranca.yml`): gitleaks (varredura de segredos no histórico inteiro) e `npm audit` completo + verificação de assinaturas, a cada PR e toda segunda.
- **Dependabot** (`dependabot.yml`): PRs semanais de npm e mensais de GitHub Actions. **Os alertas e as atualizações de segurança do Dependabot não puderam ser ligados a partir desta sessão (o acesso às configurações do repositório é bloqueado). Ligue em Settings → Code security → Dependabot alerts e Dependabot security updates (grátis).**
- **CODEOWNERS** para servidor, workflows e regras.
- Workflow de áudio: entradas validadas (idioma e limite) e passadas por variável de ambiente, sem interpolar texto digitado no shell.
- Verificado: o histórico do Git não contém chaves (`sk_live`, `sk_test`, `whsec_`, `AIza…`, chaves privadas, tokens do GitHub).

### Limites do plano gratuito (repositório privado)
Estes itens **não puderam ser ativados** e exigem GitHub Pro/Team (ou tornar o repositório público):
1. **Proteção da `main`** (exigir PR, exigir CI verde, bloquear push direto e force-push). Com o Pro: Settings → Branches → Add rule → `main`.
2. **Secret scanning com *push protection*** e **CodeQL** (varredura de código): exigem GitHub Advanced Security em repositório privado. Enquanto isso o gitleaks do CI cobre os segredos.
Até lá, a regra é a do `SECURITY.md`: nada vai para a `main` sem PR e CI verde (é uma regra de conduta, não técnica).

## 3. O que só você pode ativar (não tenho acesso)
**GitHub:** 2FA (preferir chave de segurança ou passkey); revogar tokens antigos em Settings → Developer settings; conferir quem tem acesso ao repositório.
**Firebase / Google Cloud:**
- Publicar `firestore.rules` (Console → Firestore → Regras) e conferir que não há regra `allow read, write: if true`.
- Restringir a chave de API do navegador a `https://linvuu.com.br/*` e `https://www.linvuu.com.br/*` (Cloud Console → Credenciais) e às APIs usadas.
- Authentication → Configurações → Domínios autorizados: só `linvuu.com.br`, `www.linvuu.com.br` (e `localhost` se quiser).
- Authentication → ativar proteção contra enumeração de e-mail e política de senha mínima (8+ caracteres).
- Ativar **App Check** (reCAPTCHA Enterprise na web; App Attest/Play Integrity no app) e, depois de testar, exigir no Firestore.
- Alertas de orçamento no Google Cloud (uma chave vazada costuma aparecer primeiro como gasto).
**Stripe:** 2FA; usar chave **restrita** (permissões só para Customers, Checkout Sessions, Subscriptions, Billing Portal, Prices, Products) no lugar da chave secreta total; confirmar que o Render usa chave live só no lançamento; ativar Radar; conferir o nome público na conta.
**Render:** 2FA; plano pago (instância sempre ligada) e *Health Check Path* `/healthz`; variáveis marcadas como secretas; `APP_URL=https://linvuu.com.br`; `NODE_ENV=production`; desligar *Preview environments* para PRs de terceiros.
**Domínio e e-mail (Registro.br e DNS):** 2FA; travar a transferência; SPF, DKIM e DMARC para o e-mail de contato; CAA no DNS (opcional).
**Gemini:** quando a IA entrar, só pelo servidor, com login, limite por usuário e teto de gasto no Google AI Studio/Cloud.

## 4. Regras para o futuro app (iOS e Android)
1. **Nunca confie no app.** Toda regra de acesso (assinatura, XP, certificados) é decidida no servidor, com o token do Firebase verificado (`verifyIdToken`). O app só mostra.
2. **Nenhum segredo no app.** Só chaves públicas do Firebase. Chaves do Stripe, Gemini e Azure ficam no servidor.
3. **Pagamento:** assinaturas vendidas dentro de apps da Apple e do Google seguem as regras das lojas (compra no app). Faça o servidor reconhecer a assinatura pelas duas origens (Stripe e lojas) numa tabela de acesso por usuário. Consulte as regras vigentes antes de publicar.
4. **App Check** (App Attest no iOS, Play Integrity no Android) para que só o app genuíno chame o Firebase e a API.
5. **Armazenamento local:** tokens em Keychain/Keystore, nunca em preferências simples; sem dados pessoais em logs.
6. **TLS** obrigatório; considerar *certificate pinning* só se houver necessidade real (aumenta o custo de manutenção).
7. **Privacidade (LGPD):** mapear dados coletados, base legal, retenção e exclusão da conta pelo usuário; app da Apple exige exclusão de conta dentro do app. Atualize `/privacidade` e `/termos` com consulta jurídica.
8. **Menores de idade:** o produto não deve coletar dados de menores sem base legal; decidir a política antes do lançamento do app.
9. **Revisão antes de cada versão:** `npm audit`, varredura de segredos, teste de segurança, revisão das regras do Firestore.

## 5. Como testar
```
npm run build
npm run testar:seguranca   # sobe o servidor em modo produção e verifica cabeçalhos, API fechada, 429, 413 e erros sem detalhes
npm audit
```
Se encontrar um problema, escreva para contato@linvuu.com.
