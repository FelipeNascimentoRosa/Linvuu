# Linvuu 10/10 — índice, roteamento e prompt de ativação

> Fonte única de entrada para qualquer IA ou conta (Claude, Codex, Gemini/Antigravity, DeepSeek). Substitui a leitura em cadeia de `PAINEL.md`, `CONTINUIDADE`, `ESTADO-ATUAL` e `COORDENACAO-IA`, **removidos em 25/11/2026** (falavam de Render; só o histórico do Git os guarda). Base: `main` em `c1737c48` (PRs #643, #644, #645), 25/11/2026. Antes de afirmar estado, meça ao vivo.

## 1. Estado real (verifique antes de repetir)

| Item | Estado em 25/11/2026 |
|---|---|
| Hospedagem | **Vercel**, função `api/index.mjs` (gerada por esbuild a partir de `server/vercel-entry.ts`), região `gru1`, `maxDuration` 60 (`vercel.json`). Render não tem mais serviços. |
| Domínios | `linvuu.com.br` (pt-BR, perfil `br`, BRL) e `linvuu.com` (EN, perfil `global`, USD). Separação por **Host em runtime** (`server/dominio.ts`, `src/i18n/locales.ts`), não por build. |
| DNS | Cloudflare em **DNS Only** (nuvem cinza) apontando para a Vercel; SSL Full (Strict); `www` → apex 301 nos dois. |
| Áudio de assinante | Bucket R2 privado `linvuu-audio` (11.033 MP3). Web: API responde 302 pré-assinado. APK (`Origin: https://localhost`): API faz proxy com `Range`/206. Detalhe em `05-infra-audio-seguranca.md`. |
| Search Console | Sitemap único `/sitemap.xml` em cada domínio: **57 URLs** no .com.br, **30** no .com, status Êxito. Validação de "Página com redirecionamento" em andamento. Exclusões `noindex` (`dia/2`+ e `/curso/it` no .com) são **intencionais**. |
| E-mail | `contato@`, `hello@`, `suporte@linvuu.com.br` encaminham para a caixa do Felipe (Cloudflare). |
| Mascotes | **Proibidos** em site, APK e marketing. Ainda há resíduos de código (ver `04-ui-design.md` §5). |

## 2. Trava ativa (vale até o Felipe liberar, previsão ~2 semanas a partir de 25/11/2026)
Enquanto o Google valida: **nenhuma alteração** em URLs, rotas, redirects, `public/robots*.txt`, `public/sitemap*.xml`, `vercel.json`, DNS, Cloudflare ou R2. Nenhum teste de CI pode ser desligado ou afrouxado. Conteúdo pedagógico (`content/`) só muda com PR próprio, auditoria linguística e `node scripts/conteudo.mjs --check` verde.

## 3. Tabela de roteamento — "se vai mexer em X, leia Y"

| Vai mexer em… | Leia | Arquivos-chave |
|---|---|---|
| Rota, redirect, sitemap, robots, canonical, hreflang, meta, JSON-LD, título | `01-seo-tecnico.md` | `server/dominio.ts`, `src/lib/metaRota.ts`, `scripts/seo.mjs`, `vercel.json`, `specs/MAPA-ROTAS-E-DOMINIOS.md` |
| Aula, gramática, livro, exercício, botão de áudio de frase, índice de catálogo | `02-pedagogia-qa.md` | `content/idiomas/**`, `content/gramatica/*.json`, `scripts/conteudo.mjs` |
| Texto de venda, preço, promessa, avaliação, Udemy, áudio "nativo" | `03-cro-eeat.md` | `src/config/oferta-publica.ts`, `src/config/planos.ts`, `src/i18n/*.ts` |
| CSS, componente, layout, cor, fonte, ícone, mascote, APK visual | `04-ui-design.md` | `src/tokens.css`, `src/camadas.css`, `scripts/validar-design.mjs`, `scripts/auditar-visual.mjs` |
| Áudio privado, R2, `/api/audio`, CORS, auth, variáveis de ambiente, Vercel, segredos | `05-infra-audio-seguranca.md` | `server/audio-rota.ts`, `server/audio-r2.ts`, `server/seguranca.ts`, `docs/infra/*` |
| Fluxo de PR, pendências do Felipe, roteiro até 10/10, o que NÃO fazer agora | `06-operacao-pendencias.md` | `.github/workflows/*`, `package.json` |

## 4. As 12 regras que mais custaram caro (anti-regressão)
1. Autenticação (401) e assinatura (403) **antes** de qualquer consulta ao R2 ou ao disco em `/api/audio/...`.
2. Nunca `Origin: null` nem `*` no CORS do R2; o APK recebe áudio por proxy autenticado com `Range`/206.
3. `vercel.json` → `functions[...].includeFiles` é **string glob**, não array/objeto.
4. Sitemap e robots: **um** sitemap por domínio, nunca dois byte-idênticos.
5. `www` → apex com **301** nos dois domínios (nunca 308).
6. `linvuu.com` fala só inglês: nada de `/curso/it` na vitrine, nada de aviso em português, gramática exige `explicacaoEm: "en"`.
7. O CI valida schema e contagem, **não a verdade linguística**: toda aula nova ou editada passa por revisão humana (`02-pedagogia-qa.md` §4).
8. Editar `dia-*.json` derivado sem corrigir a aula-fonte (`content/idiomas/<id>/aulas/aula-NNN.json` e mapa `i18n/`) é regressão: o próximo `npm run content` desfaz.
9. Preço, moeda e cupom só em `src/config/planos.ts`; o teste `testar-seo-publico.ts` trava os valores exibidos.
10. Áudio é sintetizado: nunca "gravado por nativos", nunca "toda frase tem áudio" onde há tabela sem botão.
11. Mascotes proibidos. Não criar, não reintroduzir, não usar nome legado.
12. `/ex-alunos-udemy` fica (está no sitemap) com a procedência honesta das avaliações reais.

## 5. Pendências reais (não marcar como concluídas)
Testes manuais do Felipe (áudio de assinante em web, Safari e APK; entrega dos 3 e-mails; 2FA na Vercel; billing do Render); MP3 de `Buongiorno, signora Rossi!` (`content/idiomas/it/dia-001.json`); 7 avisos de build da Vercel; cadeia de 2 saltos `www` + barra final; auditoria pedagógica de `dia/2` a `dia/312`; conclusão de Italiano no .com; remoção da branch remota `docs/linvuu-master-handoff` (depois do merge desta PR). Lista completa em `06-operacao-pendencias.md`.

## 6. PROMPT DE ATIVAÇÃO PARA OUTRA IA/CONTA (copiar e colar)

```text
Você vai trabalhar no repositório FelipeNascimentoRosa/Linvuu (site de idiomas Linvuu, produção na Vercel, branch main). Antes de qualquer proposta ou edição:
1. git fetch origin main e confirme que está trabalhando a partir de origin/main. Nunca trabalhe direto na main: branch + PR. Merge só com ordem expressa do Felipe.
2. Leia docs/linvuu-10-de-10/00-INDICE.md (este arquivo) e SÓ o manual da tabela de roteamento que cobre a sua tarefa. Documentos datados de estado (PAINEL, CONTINUIDADE, ESTADO-ATUAL) foram removidos; não os procure no histórico do Git como estado atual.
3. Trava ativa: zero alteração em URLs, rotas, redirects, public/robots*.txt, public/sitemap*.xml, vercel.json, DNS, Cloudflare e R2 enquanto o Google Search Console valida. Nunca desabilite ou afrouxe teste de CI.
4. Regras absolutas: sem mascotes em nenhum lugar; áudio é sintetizado (nunca prometa "gravado por nativos"); preços só em src/config/planos.ts; linvuu.com é só inglês; auth 401/403 antes de tocar no R2; nunca imprima valores de variáveis de ambiente ou segredos; conteúdo pedagógico novo exige revisão linguística humana e `node scripts/conteudo.mjs --check`.
5. Economia de tokens: respostas secas e técnicas, sem preâmbulo. Use rg/grep antes de ler; nunca leia arquivo grande inteiro nem dia-*.json em lote; filtre saídas de terminal.
6. Só afirme o que verificou: implementado → testado → mergeado → deploy → produção são estados diferentes. Estado de SEO só vale se medido ao vivo (curl, sitemap publicado, GSC).
7. Responda primeiro, em no máximo 15 linhas: HEAD que você viu, qual manual leu, qual arquivo pretende tocar e como vai provar o resultado. Aguarde OK antes de editar.
```
