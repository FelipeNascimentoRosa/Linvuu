# 06 — Operação, pendências e roteiro até 10/10

## 1. Fluxo de trabalho (inviolável)
1. `git fetch origin main`; branch a partir de `origin/main`. **Nunca** trabalhar na `main`. (Cuidado: o clone antigo `C:\Users\felip\Linvuu` está na branch `vercel/migracao-total`, 1207 commits atrás; use worktree novo.)
2. Fila máxima: 3 PRs abertos + 3 rascunhos. Achado fora do escopo vai para a tabela §5 deste arquivo, não vira PR no meio do lote.
3. **Merge só com ordem explícita do Felipe na conversa.** Não pagar plano, não mexer em billing do Stripe, não publicar `firestore.rules`, não apagar branch/arquivo/DNS pré-existente, não reescrever histórico.
4. Estados distintos: **implementado → testado → mergeado → deploy → produção**. Só afirme o que verificou (CI verde, smoke, leitura ao vivo).
5. Depois de deploy: skill `verificar-site` (smoke dos dois domínios).
6. Todo PR descreve tarefa e arquivos no corpo e termina com o comando que provou e a saída real. Sem stub, mock ou "resto aqui".
7. Dependência nova só com licença conferida (MIT, Apache-2.0, BSD, MPL-2.0 sem modificar) e registro em `REPOS_FINAL.md`; GPL/AGPL/SSPL bloqueadas. Vídeo: HyperFrames (Apache-2.0), **nunca** Remotion.

## 2. CI (o que roda e o que reprova)
- `.github/workflows/ci.yml`: `npm ci`; `travas-en`; testes unitários de `scripts/auditoria_firebase` (Python); `npm run lint && lint:apk`; dezenas de `testar-*` (cache, domínio, analytics, pixels, prontidão, **títulos**, dúvidas, **áudio privado e autorização**, assetlinks, billing, acesso, conversões, medição, correção, progresso, avaliações, newsletter, revisão, regras do Firestore); `build:website`; **isolamento dos públicos** (`testar-isolamento-dominios.ts`, `testar-isolamento-http.mjs`, `testar-isolamento-navegador.mjs`); **`testar-seo-publico.ts`**; **inventário, robots, `testar-http-seo.ts`, links públicos, `testar-seo-http.mjs`**; `npm run audit:rotas-dominios`; `build:apk`; `testar:plataformas`; **`npm run validar:design`**; `npm audit --omit=dev --audit-level=high`; `npm run testar:seguranca`.
- `qualidade-seo.yml`: build do site, `testar-paridade-meta.mjs` (perfil brasileiro e `global`), Lighthouse CI (`lighthouserc.cjs`), `testar-robots-google.mjs`.
- `seguranca.yml`: **gitleaks** (`detect --redact --exit-code 1`).
- Outros: `analytics.yml`, `app-android.yml`, `audio.yml`, `auditoria-integral.yml`, `manter-acordado.yml`, `posthog-web.yml`, `revisao-apk.yml`, `revisao-publica.yml`, `revisao-web-e2e.yml`.
- **Regra:** nunca desligar, pular ou afrouxar teste para passar. Falha de infraestrutura se registra, não se esconde.

## 3. Comandos de verificação local (use filtros; não despeje saída longa)
```text
npm run content:check            # conteudo.mjs --check + travas-en
npm run lint && npm run lint:apk
npm run build:website            # gera dist/ e sitemaps
node --import tsx scripts/testar-seo-publico.ts
node --import tsx scripts/testar-titulos.ts
node --import tsx scripts/testar-audio-autorizacao.ts
node scripts/testar-isolamento-http.mjs
npm run validar:design
npm run audit:rotas-dominios     # exige dist/
npm run testar:seguranca
```

## 4. Registro anti-regressão das PRs recentes
| PR | Mudou | Lição |
|---|---|---|
| **#643** `vercel/migracao-total` (63 arquivos) | Migração Render → Vercel: `vercel.json`/`api/index.mjs`, `scripts/mover-arquivos-servidor.mjs`, `server/audio-r2.ts`, `scripts/enviar-audio-r2.ts`, `server/audio-privado.ts`, robots, testes de domínio/SEO/áudio, docs de infra | `includeFiles` é string glob; auth antes de R2; um sitemap por domínio; `www` 301 |
| **#644** `fix/r2-apk-origin` (4 arquivos) | `server/audio-rota.ts`, `server/seguranca.ts`, teste e doc: proxy autenticado com `Range`/206 para `Origin: https://localhost` | Nunca abrir `Origin: null` nem `*` no R2 |
| **#645** `fix/vitrine-pedagogica-eeat` (62 arquivos) | Erros pedagógicos de `dia/1` e gramáticas (ver `02-pedagogia-qa.md` §4), promessas absolutas removidas, vitrine do .com sem `/curso/it`, gramática exige `explicacaoEm: "en"`, `content/travas-en.json` e `public/llms*.txt` regenerados | CI não valida verdade linguística; derivado sem fonte regride |

## 5. Pendências reais (nenhuma está concluída)
| # | Pendência | Dono | Pronto quando |
|---|---|---|---|
| 1 | Teste manual de áudio de assinante em web, Safari e APK | Felipe | MP3 toca com `Range`; sem `Origin: null` no console/rede |
| 2 | Entrega dos 3 e-mails (`contato@`, `hello@`, `suporte@`) | Felipe | mensagem de teste chega nos três |
| 3 | 2FA na Vercel (e conferir Cloudflare/GitHub) | Felipe | 2FA ativo, códigos de recuperação guardados fora do repo |
| 4 | Billing do Render | Felipe | sem cobrança ativa |
| 5 | MP3 `Buongiorno, signora Rossi!` (`content/idiomas/it/dia-001.json`) | IA + Felipe | arquivo gerado, mapeado e tocando |
| 6 | 7 avisos de build da Vercel | IA (pós-trava) | build limpo |
| 7 | `www` + barra final em 2 saltos | IA (pós-trava) | 1 salto, testado por `testar-http-seo.ts` |
| 8 | Auditoria pedagógica `dia/2`–`dia/312` | IA + revisor | relatório por curso, 0 alta aberta |
| 9 | Italiano no .com (IT-EN 8/248) | Felipe + IA | 248/248, `travas-en.json` atualizado |
| 10 | ~~Excluir todos os mascotes~~ **Concluído em 25/11/2026** (PR `chore/faxina-mascotes-e-legado`; travas negativas de teste preservadas) | IA | feito |
| 11 | Apagar a branch remota `docs/linvuu-master-handoff` | Felipe | só **depois** do merge desta PR |
| 12 | Repositório com MP3 pagos público + histórico (registro de 11/11) | Felipe | decisão expressa sobre visibilidade/histórico |

## 6. Roteiro executável até 10/10
| Fase | Quando | Entregas | Critério de saída (mensurável) |
|---|---|---|---|
| **0 — Trava** | até a validação do GSC | só PRs de docs/config; testes manuais do Felipe (#1–#4) | GSC "Página com redirecionamento" validada (8 + 3 URLs); sitemaps 57 e 30 em Êxito |
| **1 — Verdade pedagógica** | após trava | auditoria `dia/2…312`; MP3 pendente; correções na fonte | relatório por curso; `content:check` verde; 0 alta aberta |
| **2 — Infra limpa** | após trava | avisos da Vercel; `www`+barra; 2FA | build sem avisos; 0 redirect > 1 salto |
| **3 — Conversão e E-E-A-T** | depois da fase 1 | itens 1–6 de `03-cro-eeat.md` §5 | 0 promessa absoluta; autoria em 100% dos livros/gramáticas; baseline de funil registrado |
| **4 — UI e marca** | paralelo à 3 | limpeza de mascote; `auditar-visual` 0; Lighthouse acima do limiar | `rg -iw -e vuu -e pelmeni` = 0; 0 ocorrência anti-IA |
| **5 — Italiano e expansão do .com** | após 1 | IT-EN 248/248 e novos livros em inglês (`docs/LIVROS-EM-INGLES.md`) | `explicacaoCompleta` verdadeiro para `it`; sitemap do .com atualizado com ordem do Felipe |

## 7. O que NÃO fazer
Alterar rota, redirect, `robots`, `sitemap`, `vercel.json`, DNS, Cloudflare ou R2 durante a trava; ler auditorias datadas como estado atual; reportar `site:` do Google como estado do site; editar só `dia-*.json` derivado; tocar `CLAUDE.md` no meio de sessão produtiva sem ordem; imprimir valor de variável ou segredo.
