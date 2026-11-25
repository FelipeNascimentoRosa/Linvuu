# CLAUDE.md — Linvuu

> **Entrada única: [`docs/linvuu-10-de-10/00-INDICE.md`](docs/linvuu-10-de-10/00-INDICE.md)** (estado real, tabela "mexer em X → ler Y", 6 manuais). Este arquivo guarda só regras permanentes. Em conflito, **este arquivo manda nas regras; o índice e os manuais mandam nos fatos**. `PAINEL.md`, `docs/CONTINUIDADE-*`, `docs/ESTADO-ATUAL.md`, `docs/historico/` e `_para_apagar/` foram removidos em 25/11/2026 (falavam de Render).
> Regras por área carregam ao abrir os arquivos (`.claude/rules/`). Fluxos pesados vivem em `.claude/skills/` e só entram sob demanda.

## Economia de tokens (obrigatória)
Resposta seca e técnica: sem preâmbulo, sem desculpa, sem elogio, sem narrar a ferramenta antes de usá-la. `rg` antes de ler; nunca ler arquivo grande inteiro (use intervalo) nem `dia-*.json` em lote; filtrar saída de terminal (`head`, `tail`, contagem). Não editar `CLAUDE.md` no meio de sessão produtiva sem ordem.

## LEI ZERO — não subestimar a Linvuu (Felipe, 18/11/2026)
1. É aprendizagem estrutural (alfabeto, fonética/IPA, morfologia, sintaxe, casos, conjugações, revisão espaçada) feita por professores, com engenharia, SEO internacional e segurança de produção. Não é clone do Duolingo nem MVP.
2. **Proibido** stub, `mock`, "resto aqui", resumo raso ou devolver trabalho técnico ao Felipe. Entrega completa, tipada, testada, com o comando que provou e a saída real.
3. **Proibido** instalar dependência que o PR não usa. Licença MIT/Apache-2.0/BSD/MPL-2.0 conferida e registro em `REPOS_FINAL.md`; GPL, AGPL e SSPL bloqueadas.
4. Mídia de marketing só com frases, tabelas e exemplos reais de `content/` (`npm run midia:carrossel`; `npm run midia:instalar` e depois `npm run midia:video`, que exige Node >=24.12). Motor de vídeo: HyperFrames (Apache-2.0). **Nunca Remotion.**
5. **Mascotes proibidos** em site, APK e marketing (Vuu, Pelmeni, qualquer outro). Todos foram excluídos em 25/11/2026; não reintroduzir (travas negativas em testes).

## Produto em 5 linhas
- Cursos de idiomas (de, en, es, fr, it, br, ru), explicação na língua do aluno, **áudio sintetizado** por frase. 2 primeiras aulas grátis (sessões 1–8; paywall na 9).
- **Vercel** serve **linvuu.com.br** (perfil `br`, pt-BR, BRL) e **linvuu.com** (perfil `global`, EN, USD) por **Host em runtime** (`server/dominio.ts`, `src/i18n/locales.ts`). Render não hospeda mais nada.
- Stack: React 19, Vite, TypeScript strict, react-router 7, Express 5 (`server.ts`), Firebase, Stripe, Capacitor (APK com `VITE_ALVO=apk`).
- Preços: só em `src/config/planos.ts`. Copy de venda: `src/config/oferta-publica.ts`.
- Dono: Felipe Nascimento Rosa. Marca: verde #1E3B2F, papel #F3F2EE, grafite #1D1F1C, ocre #B7791F.

## TRAVA ATIVA (Search Console validando, desde 25/11/2026)
**Zero alteração** em URLs, rotas, redirects, `public/robots*.txt`, `public/sitemap*.xml`, `vercel.json`, DNS, Cloudflare e R2 até o Felipe liberar. Nunca desligar ou afrouxar teste de CI (`testar-seo-publico.ts`, `testar-http-seo.ts`, `testar-isolamento-http.mjs`, `testar-titulos.ts`, `testar-paridade-meta.mjs`, `testar-audio-autorizacao.ts`, `validar:design`).

## ARMADILHAS (anti-regressão; detalhe nos manuais)
1. **Áudio:** em `/api/audio/...`, 401/403 **antes** de tocar o R2 ou o disco. R2 privado, CORS só dos dois domínios + `https://localhost`; nunca `Origin: null` nem `*`. APK recebe áudio por proxy autenticado com `Range`/206. Nunca áudio pago em `server/` ou `public/`. (→ `05`)
2. **`vercel.json`:** `functions[...].includeFiles` é **string glob**. (→ `05`)
3. **SEO:** um sitemap por domínio; `www`→apex em **301**; sessão `/dia/N` é noindex de propósito (exceto sessão 1 com `explicacaoCompleta`); curso parcial fora do sitemap do .com é **intencional**. (→ `01`)
4. **`linvuu.com` é só inglês:** sem `/curso/it` na vitrine, sem aviso em português, gramática exige `explicacaoEm: "en"`. Nunca misturar línguas na mesma página. `/es/...` e `/en/...` de interface só redirecionam. (→ `01`, `02`)
5. **Fonte de verdade:** `content/idiomas/**/dia-*.json` é derivado. Corrija a aula-fonte (`aulas/aula-NNN.json`) e o mapa `i18n/`, rode `npm run content` e `node scripts/conteudo.mjs --check` (guardas 2026-11-04 e 2026-11-09). Dois índices com esquemas diferentes: `indice.json` ≠ `indice.en.json`. (→ `02`)
6. **O CI não valida verdade linguística.** Conteúdo novo ou editado exige revisão humana e a checklist de erros já vistos. (→ `02`)
7. **Copy:** "2 primeiras aulas grátis"; "áudio em cada frase" só onde há botão; nunca "gravado por nativos", nunca prazo, fluência nem absoluto; certificado só **de conclusão** (nunca "oficial"/"MEC"). **Não remover `/ex-alunos-udemy`.** (→ `03`)
8. **CSS:** proibido criar folha global nova; hex só em `src/tokens.css`; seção sem conteúdo não renderiza. (→ `04`)
9. **Home:** `src/pages/Home.tsx` só re-exporta `HomeBrasileiros`. Não criar variante nova sem remover uma antiga.
10. **Checkout mensal USD** depende de `STRIPE_PRICE_ID_USD`: cheque `/readyz` antes de mexer em código.

## Regras de trabalho (invioláveis)
- Branch + PR sempre; nunca trabalhar na `main`. Fila: 3 PRs abertos + 3 rascunhos. **Merge só com ordem explícita do Felipe.**
- Não pagar plano, não alterar billing, não publicar `firestore.rules`, não apagar branch/arquivo/DNS pré-existente, não reescrever histórico sem ordem expressa e específica.
- Segredos nunca em chat, arquivo, print ou commit. Variáveis: confirme existência por `/readyz`; nunca imprima valores.
- Status honesto: **implementado → testado → mergeado → deploy → produção** são estados diferentes. SEO só vale medido ao vivo (`curl`, sitemap publicado, GSC); `site:` do Google é cache.
- Pós-deploy: skill `verificar-site`. Testes são scripts Node em `scripts/` + `.github/workflows/` (sem Vitest/Jest): diga qual rodou.
- Antes de qualquer tarefa: qual domínio/perfil? o curso está **completo** nessa interface? toca billing, áudio, índice ou SEO? como vou **provar**?

## Mapa curto
Rotas e domínios: `server/dominio.ts`, `specs/MAPA-ROTAS-E-DOMINIOS.md` · Meta/SEO: `src/lib/metaRota.ts`, `scripts/seo.mjs` · Conteúdo: `content/`, `scripts/conteudo.mjs` · Áudio: `server/audio-rota.ts`, `server/audio-r2.ts` · Billing: `server/billing*.ts`, `src/config/planos.ts` · Revisão (FSRS): `src/lib/revisao/`, `server/revisao.ts` · Design: `src/tokens.css` · Plataformas: `src/plataforma/{website,apk}`.

## Skills
Só as listadas em `skills-lock.json`; não reinstalar removidas sem motivo escrito. Da Linvuu: `linvuu-seo-tecnico`, `linvuu-pedagogia-qa`, `linvuu-cro-eeat`, `linvuu-ui-anti-ia`, `verificar-site`, `carrossel-do-livro`. Pesadas (`impeccable`, `firebase-apk-scanner`) rodam só por pedido explícito.
