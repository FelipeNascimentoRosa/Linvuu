# 04 — UI, design system e anti "cara de IA"

Leia antes de tocar CSS, componente, layout, cor, fonte, ícone ou tela do APK.

## 1. Sistema de design (verificado na `main`)
- Tokens oficiais: `src/tokens.css`. Cascata em `src/main.tsx`: **tokens → site-publico → styles → redesign → camadas** (`src/site-publico.css`, `src/styles.css`, `src/redesign.css`, `src/camadas.css`; livros e materiais em `src/livros.css`, `src/materiais.css`).
- Marca: verde `#1E3B2F`, papel `#F3F2EE` (neutro desde 12/11/2026; antes era creme `#F5F1E8`), grafite `#1D1F1C`, ocre `#B7791F`. Fontes: Newsreader, Source Sans 3, Literata, Caveat.
- **Proibido criar folha global nova** (nem "redesign2.css"). Ajuste na camada certa ou nos tokens. Hex de cor só em `tokens.css` (exceção legítima: componentes de bandeira). CSS Module de componente usa só `var()`.
- CSS de produção abaixo de 50 kB gzip.

## 2. Validação automática (CI e local)
| Comando | O que garante |
|---|---|
| `npm run validar:design` (`scripts/validar-design.mjs`) | contraste AA 4,5:1 (AAA 7:1 informado) e 3:1 não-texto nos **dois temas**, lido de `src/tokens.css` e `src/redesign.css`; nenhum hex em CSS Module; CSS < 50 kB gzip quando existe `dist/` |
| `node scripts/auditar-visual.mjs <urls>` | detector "cara de IA" (regras do Impeccable, Apache-2.0) na página renderizada: rótulo em caixa-alta acima de título, título desequilibrado, palavra órfã, texto miúdo, espaçamento largo, "01/02/03", cartões aninhados, contraste de leitura. **Meta: 0 ocorrências** em página nova ou mexida (baseline 12/11/2026: 0 em 14 páginas dos dois domínios). Rótulo acima de título é proibido |
| `npm run lint` e `npm run lint:apk` | `tsc --noEmit` web e APK |
| `npm run testar:plataformas` | `src/plataforma/website` × `src/plataforma/apk` (alias `@plataforma`); checkout não vaza para o APK |

## 3. Regras de layout
- Cartões da mesma fileira: altura igual, CTA na base (`margin-top:auto` em coluna flex).
- **Nenhuma seção vazia em produção**; sem conteúdo real, não renderiza. "Chega em breve" é defeito.
- **Um template por tipo de página** (curso, gramática, livro) nos dois perfis. Curso parcial usa a nota honesta de cobertura (modelo: `/curso/es` e `/curso/de` no .com).
- Banner de idioma e de cookies nunca cobrem o cabeçalho.
- Sem flash de "Carregando…" em curso e aula: o conteúdo principal renderiza junto (o servidor já gera meta por rota).
- Revisão espaçada: Web e APK **nunca se importam** (`scripts/testar-isolamento-revisao.mjs`).

## 4. Anti-IA: o que o detector e o Felipe rejeitam
Título que não carrega peso sozinho (rótulo em cima), listas "01/02/03" decorativas, cartões dentro de cartões, parágrafos com ar de template, gradientes e ícones genéricos sem função. Prefira tipografia e espaçamento dos tokens; imagem só se vier de `marca/` ou `content/`.

## 5. Mascotes — PROIBIÇÃO ABSOLUTA
Decisão do Felipe (retirada em 15/11/2026, reforçada em 25/11/2026): **nenhum mascote** em site, APK ou marketing. Isto inclui o Vuu e o Pelmeni. `docs/VUU.md` registra a retirada.
- **Autorização do Felipe (25/11/2026): todos os mascotes podem ser excluídos, literalmente todos** (código, CSS, texto, alt text, arte, testes e docs que os citem). Executar em **PR própria** de limpeza, fora da PR de docs, respeitando a trava de rotas/SEO e sem enfraquecer teste (ajustar asserção só para tirar o mascote, nunca para afrouxar).
- Não criar, não reintroduzir, não "reaproveitar" arte, nome ou alt text.
- Resíduos conhecidos na `main` (nomes/comentários legados; limpeza futura, **não** parte desta PR). Para listar: `rg -iw -e vuu -e pelmeni src server scripts public content marketing design`. Na verificação de 25/11/2026 apareceram arquivos como `src/components/Carregando.tsx`, `src/components/carregando.css`, `src/i18n/home.ts`, `src/lib/mensagemRetomada.ts`, `src/pages/home-brasileiros.css`, `src/styles.css`, `server/app.ts` e testes. Note: o `rg` sem `-w` casa com "Linvuu" e gera ruído.
- `CLAUDE.md` e `DEEPSEEK.md` antigos ainda falavam do Vuu como marca presente: o `CLAUDE.md` novo não fala, e o `DEEPSEEK.md` aponta para esta regra.

## 6. APK
Mesmo código com `VITE_ALVO=apk` (`npm run build:apk`, `tsconfig.apk.json`). Telas e testes: `scripts/testar-*-apk.*` (acessibilidade, estudo, reforço, primeira abertura). Áudio no APK vem por proxy autenticado (ver `05-infra-audio-seguranca.md`). Verificação em aparelho real com assinante é **pendência do Felipe**.

## 7. Critério de saída para 10/10
`validar:design` verde; `auditar-visual.mjs` com 0 ocorrências nas páginas públicas dos dois domínios e nas telas do APK revisadas; Lighthouse CI (`lighthouserc.cjs`) dentro do limiar configurado; `rg -iw -e vuu -e pelmeni` retornando 0 fora de histórico; nenhuma seção vazia nem cartão desalinhado em 375 px e 1280 px.
