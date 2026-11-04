# Preços definidos da Linvuu (01/11/2026)

**Aprovado pelo Felipe (fundador), 01/11/2026.** Este documento é a tabela canónica de preços da Linvuu — a fonte única. Qualquer mudança de preço começa por atualizar este ficheiro, no mesmo PR que altera o código, a configuração, o Stripe ou a Play Console.

## Site — Stripe, em reais (BRL)

| Plano | Preço | Como é cobrado |
|---|---|---|
| Mensal | **R$ 139/mês** | Subscrição no Stripe, produto "Linvuu Mensal" (renova todos os meses) |
| Trimestral | **R$ 417** no cartão/boleto ou **R$ 291,90** no Pix | Pagamento único, sem renovação automática |
| Anual — **plano-herói** | **R$ 999** | Pagamento único, sem renovação automática (≈ R$ 83,25/mês) |

O anual é o plano em destaque na montra: é o menor custo por mês. Os pacotes (trimestral e anual) são pagamentos únicos — terminados os meses pagos, o acesso termina, sem cobrança automática.

## Fundadores — ex-alunos da Udemy

| Benefício | Valor |
|---|---|
| Código no checkout | **FUNDADORES** |
| Desconto | 50% sobre a subscrição mensal, para sempre (`duration: forever`) |
| Preço efetivo | **R$ 69,50/mês, travado** |
| Limite | 302 resgates (um por ex-aluno) |
| Validade do código | Até 30/01/2027 |

O código aplica-se no checkout do site; o desconto fica associado à subscrição e não sobe quando o código expirar — quem entrou como fundador mantém os R$ 69,50/mês.

## APK — Google Play (preço definido na loja)

No Android, o preço vem sempre da loja (Google Play, via RevenueCat) — nunca de constante do app. Os valores a configurar na Play Console são:

| Plano | Preço |
|---|---|
| Mensal | **R$ 139,90/mês** |
| Anual — **herói** | **R$ 999,90/ano** |

Não há plano trimestral no APK: na loja, mensal e anual bastam. É paridade prática com o site — o aluno paga o mesmo venha do telemóvel ou do navegador.

## Internacional — em dólares (USD)

Só se vende um curso onde as explicações em inglês estiverem completas (ver `docs/COBERTURA-IDIOMAS.md` e a regra em `docs/DECISAO-SITE-INTERNACIONAL.md`: não prometer o que não existe).

| Canal | Mensal | Anual |
|---|---|---|
| Site (Stripe) | **US$ 19,99/mês** — preço já criado no Stripe, sobre o produto mensal | **US$ 149**, pagamento único, quando a montra `/en` abrir |
| Google Play | **US$ 19,99/mês** | **US$ 149,99/ano** |

## Onde cada valor vive (operacional)

| Valor | Onde está |
|---|---|
| Subscrição mensal (BRL e USD) e código FUNDADORES | Stripe (produtos, preços, cupão e código promocional) |
| Pacotes trimestral e anual do site | `server/billing.ts` (montantes dos pagamentos únicos) |
| Montra de preços do site | `src/config/planos.ts` (constantes apresentadas nas páginas) |
| Preços do Android | Play Console / RevenueCat (a loja é a fonte do preço no app) |

Se um valor nesta tabela divergir do que está num destes sítios, o sítio está errado — corrige-se o sítio e regista-se a divergência neste documento.
