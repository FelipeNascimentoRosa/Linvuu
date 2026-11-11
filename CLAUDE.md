# CLAUDE.md — Linvuu

<!-- Atualizado em 2026-11-11 a partir de auditoria completa (repo + sites ao vivo). Substitui a versão de 06/11/2026. -->

> Instruções de trabalho para o Claude Code neste repositório. Curto de propósito: o detalhe operacional vive em `docs/ESTADO-ATUAL.md` e `PENDENCIAS.md` — leia os dois no início de qualquer tarefa maior. Em conflito entre este arquivo e eles, **este arquivo manda nas regras** e **eles mandam nos fatos**.

## O produto em 5 linhas
- Linvuu: cursos de idiomas (alemão, inglês, espanhol, francês, italiano, português BR, russo) com explicação na língua do aluno e **áudio em cada frase**. **2 primeiras aulas grátis** (sessões 1–8; paywall na 9).
- Um único serviço Render serve **linvuu.com.br** (perfil `br`, interface pt-BR) e **linvuu.com** (perfil `global`, interface EN) — a separação é **por Host em runtime**, não por build (`server/dominio.ts`, `src/i18n/locales.ts`).
- Stack: React 19 + Vite 8 + TypeScript strict, react-router-dom 7, Express 5 (`server.ts`), Firebase (Auth + Firestore), Stripe 23, Capacitor 8 (APK do mesmo código, `VITE_ALVO=apk`).
- Preços (fonte única: `src/config/planos.ts` — nunca hardcode preço fora dele): BRL mensal 139 / trimestral 417 / trimestral Pix 291,90 / anual 999; USD mensal 19,99 / anual 149. Cupom FUNDADORES (50% no mensal BRL) só existe no .com.br.
- Dono: Felipe Nascimento Rosa. Marca: verde #1E3B2F, papel #F5F1E8, grafite #1D1F1C, ocre #B7791F; fontes Newsreader/Source Sans 3/Literata/Caveat; mascote **Vuu** (nunca o Pelmeni).

## Mapa de rotas (páginas)
`/` · `/cursos` · `/curso/:id` · `/curso/:id/dia/:n` · `/portugues` · `/gramatica(/:id)` · `/livros(/:id(/capitulo/:n))` · `/livro/gramatica-ru` · `/russo-online` · `/assinatura` · `/entrar` · `/cadastro` · `/conta` (só APK) · `/sobre` · `/por-que-linvuu` · `/contato` · `/ex-alunos-udemy` · `/privacidade` · `/termos` · `/excluir-conta` · `*` = 404 real.
Regras de domínio em `server/dominio.ts` (301): www→apex; `/en`/`/es` de interface → .com/raiz (espanhol de interface foi **retirado** em 06/11); `/curso/br` no .com.br → .com; `/livros` no .com → .com.br.

## Onde mora cada subsistema
| Subsistema | Arquivos |
|---|---|
| Billing/checkout/Stripe | `server/billing.ts`, `server/billing-contrato.ts`, `server/billing-webhook.ts`, `src/config/planos.ts` |
| Prontidão (env vars) | `server/prontidao.ts` (`/readyz` confere variáveis e valores) |
| Áudio de assinante | `server/audio-privado*` (ver ARMADILHA 2), rota `/api/audio` |
| Áudio público | `public/audio/` (hoje: `v2/` = 4.062 arquivos, `es/` 907, `it/` 557) |
| Conteúdo dos cursos | `content/idiomas/<id>/<interface>/dia-NNN.json` (4 sessões = 1 aula) |
| Índices de catálogo | `content/indice.json` (PT) e `content/indice.en.json` (EN) — **esquemas diferentes** (ver ARMADILHA 4) |
| SEO (meta/canonical/hreflang/JSON-LD) | `server/metaRota.ts` (fonte única; também `/api/meta`) |
| Sitemaps/robots | por domínio, gerados; sessões `/dia/N` são **noindex de propósito** (decisão 11/11, PR #551) |
| Design | `src/tokens.css` (tokens oficiais) + cascata em `src/main.tsx` (ver ARMADILHA 3) |
| Plataformas | `src/plataforma/website` × `src/plataforma/apk` (alias `@plataforma`; build falha se checkout vazar p/ o APK) |

## Estado real do catálogo (medido em 11/11/2026 — confira antes de afirmar)
Sessões com explicação por interface: **RU 312/312 · FR 248/248 · PT→EN (curso BR) 248 · ES-EN 120/248 · DE-EN 4/288 · IT-EN 0/248 · EN (no .br) 248/248.**
Regra `explicacaoCompleta` (`metaRota.ts`): curso só ganha página indexável/hreflang num idioma quando **todas** as aulas estão explicadas nele. Por isso o sitemap do .com tem 15 URLs e o do .com.br 39 — **é intencional, não é bug**. Não "corrija" sitemap/índice para expor curso parcial sem ordem do Felipe.

## ARMADILHAS (não repetir)
1. **Checkout mensal USD** depende de `STRIPE_PRICE_ID_USD` no ambiente do Render (o anual USD usa `price_data` inline e funciona sem ela). Se o mensal .com quebrar, cheque `/readyz` e o ambiente **antes** de mexer em código. O `render.yaml` não declara essa variável — a ausência lá não prova ausência no painel.
2. **Áudio pago no repo público:** `server/audio-privado*/` (11.033 MP3) ainda está na árvore pública. A migração p/ o repo privado `Linvuu-Audio` (`scripts/audio-privado.mjs`) espera o token no Render. **Nunca** adicione áudio pago novo em `server/`; trate qualquer mudança aqui como sensível e avise o Felipe.
3. **CSS em camadas:** `main.tsx` empilha tokens → site-publico → styles → redesign → camadas. **Não crie folha global nova** nem "redesign2.css": ajuste na camada existente certa ou nos tokens. Hex de cor só em `tokens.css` (os hex em componentes de bandeira são exceção legítima).
4. **Dois índices, dois esquemas:** `indice.json` ≠ `indice.en.json`. O gerador `scripts/conteudo.mjs` tem a **GUARDA 2026-11-04**: nunca regenere índice por cima de dias traduzidos em disco sem o mapa i18n — foi assim que o espanhol EN "sumiu" uma vez.
5. **Copy pública — fatos que não podem mudar sem ordem do Felipe:** "2 primeiras aulas grátis" (não "aula 1 grátis"); "áudio em cada frase" (não "em cada palavra"); nunca prometer fluência/prazo/certificado; preços só os de `planos.ts`; contato no .com.br é **contato@linvuu.com.br**.
6. **Home:** `src/pages/Home.tsx` é só um re-export de `HomeBrasileiros` (texto via `src/i18n/home.ts`). Não crie variante nova de home sem matar uma antiga.

## Regras de trabalho (invioláveis)
- **Nunca** trabalhe direto na `main`: branch + PR sempre. Fila máxima: 3 PRs abertos + 3 drafts.
- **Merge: somente com ordem explícita do Felipe na conversa.** (Isto substitui a autorização ampla registrada no AGENTS.md — em caso de divergência, vale esta linha.)
- **Não** pague plano/altere billing do Render/Stripe, **não** publique `firestore.rules`, **não** apague branch/arquivo/DNS pré-existente, **não** reescreva histórico do Git — tudo isso é só com ordem expressa e específica do Felipe.
- Segredos nunca em chat, arquivo, print ou commit. Variáveis de ambiente: confira existência pelo `/readyz`, nunca imprima valores.
- Vocabulário de status, sem exceção: **implementado → testado → mergeado → deploy → produção** são estados diferentes. Só afirme o que verificou (CI verde, smoke, leitura ao vivo). "Acho que funciona" não é status.
- Depois de deploy, rode a skill **`verificar-site`** (smoke dos dois domínios) antes de declarar produção.
- Ao mexer em texto de interface: PT no perfil `br`, EN no `global`, **nunca misturar línguas na mesma página** — o caso `/curso/it` no .com (promessa em inglês sobre conteúdo em português) é o anti-exemplo permanente.
- Testes são scripts Node sob medida em `scripts/` + workflows em `.github/workflows/` (não há Vitest/Jest). Rode o workflow relevante e diga qual rodou.

## Antes de qualquer tarefa, responda para você mesmo
1. Qual domínio/perfil é afetado (.com.br, .com, APK, os três)?
2. O curso envolvido está **completo** na interface afetada? (tabela acima)
3. A mudança toca billing, áudio pago, índice ou SEO? Se sim, releia a ARMADILHA correspondente.
4. Como vou **provar** o resultado (CI, smoke, URL ao vivo)?

---
*Base: auditoria de 11/11/2026 (HEAD `a4872027`). Atualize a tabela de catálogo e as armadilhas quando os fatos mudarem — CLAUDE.md desatualizado é pior que nenhum.*
