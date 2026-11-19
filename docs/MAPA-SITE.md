# Mapa do site

Gerado por `scripts/mapa-site.ts` em 2026-11-19. **Não editar à mão**: rode `npm run mapa:site` de novo.

Responde, sem abrir navegador, três perguntas: o que existe, de onde vem e como se prova que está certo. Pedagogia e texto final são revisão humana do Felipe; este mapa não opina sobre conteúdo.

## Resumo

- Rotas declaradas em `src/App.tsx`: **28**
- Páginas concretas no .com.br (pt-BR): **41** — 31 indexáveis
- Sessões de aula (`/curso/:id/dia/:n`, fora do índice): **1840** em 7 cursos
- Capítulos de livro: **14** em 7 livros
- Folhas de CSS: **20** (2380 linhas)
- Comandos de verificação no `package.json`: **22**
- Arquivos JSON de conteúdo: **4454**

## 0. Checagens objetivas

Mesma régua de `scripts/testar-titulos.ts` (título até 60 caracteres, descrição entre 120 e 160), aplicada ao site inteiro: o teste percorre a lista dele, este mapa percorre todas as páginas indexáveis dos dois domínios.

| Domínio | Indexáveis | Fora da faixa | Indexável sem descrição |
|---|---|---|---|
| .com.br | 31 | 0 | 0 |
| .com | 23 | 0 | 0 |

## 1. Rotas do .com.br (avaliadas pelo mesmo `metaRota` que o servidor usa)

| Caminho | Componente | HTTP | No índice | Título (chars) | Descrição (chars) | Idiomas |
|---|---|---|---|---|---|---|
| `/` | Home | 200 | sim | 37 | 149 | 1 |
| `/cursos` | Cursos | 200 | sim | 48 | 143 | 1 |
| `/portugues` | — | 404 | não | 21 | 0 | 1 |
| `/curso/en` | Curso | 200 | sim | 46 | 147 | 1 |
| `/curso/es` | Curso | 200 | sim | 48 | 158 | 2 |
| `/curso/ru` | Curso | 200 | sim | 45 | 153 | 2 |
| `/curso/de` | Curso | 200 | sim | 46 | 159 | 2 |
| `/curso/fr` | Curso | 200 | sim | 47 | 157 | 2 |
| `/curso/it` | Curso | 200 | sim | 48 | 153 | 1 |
| `/curso/br` | Curso | 200 | não | 49 | 111 | 1 |
| `/curso/:id/revisao` | Revisao | 404 | não | 21 | 0 | 1 |
| `/entrar` | Conta | 200 | não | 6 | 0 | 1 |
| `/cadastro` | Conta | 200 | não | 11 | 0 | 1 |
| `/gramatica` | Gramatica | 200 | sim | 43 | 156 | 1 |
| `/gramatica/en` | Gramatica | 200 | sim | 42 | 145 | 1 |
| `/gramatica/es` | Gramatica | 200 | sim | 44 | 147 | 2 |
| `/gramatica/ru` | Gramatica | 200 | sim | 41 | 144 | 2 |
| `/gramatica/de` | Gramatica | 200 | sim | 42 | 145 | 2 |
| `/gramatica/fr` | Gramatica | 200 | sim | 43 | 146 | 2 |
| `/gramatica/it` | Gramatica | 200 | sim | 44 | 147 | 1 |
| `/gramatica/br` | Gramatica | 200 | não | 63 | 163 | 1 |
| `/livro/gramatica-ru` | LivroGramatica | 200 | não | 21 | 0 | 1 |
| `/livros` | LivrosIndice | 200 | sim | 35 | 150 | 2 |
| `/livros/en` | LivroPagina | 200 | sim | 40 | 159 | 1 |
| `/livros/es` | LivroPagina | 200 | sim | 42 | 155 | 1 |
| `/livros/de` | LivroPagina | 200 | sim | 40 | 137 | 1 |
| `/livros/fr` | LivroPagina | 200 | sim | 41 | 141 | 1 |
| `/livros/ru` | LivroPagina | 200 | sim | 39 | 156 | 1 |
| `/livros/it` | LivroPagina | 200 | sim | 42 | 144 | 1 |
| `/livros/br` | LivroPagina | 404 | não | 21 | 0 | 1 |
| `/materiais-gratuitos` | MateriaisIndice | 200 | sim | 41 | 146 | 2 |
| `/materiais-gratuitos/:slug` | AlfabetoPagina | 404 | não | 21 | 0 | 1 |
| `/russo-online` | AulasRusso | 200 | sim | 44 | 153 | 2 |
| `/sobre` | Sobre | 200 | sim | 21 | 158 | 2 |
| `/por-que-linvuu` | PorQue | 200 | sim | 47 | 160 | 2 |
| `/contato` | Contato | 200 | sim | 26 | 125 | 2 |
| `/ex-alunos-udemy` | ExAlunosUdemy | 200 | sim | 46 | 147 | 1 |
| `/assinatura` | Assinatura | 200 | sim | 43 | 143 | 1 |
| `/privacidade` | Legal | 200 | sim | 46 | 141 | 1 |
| `/termos` | Legal | 200 | sim | 34 | 155 | 1 |
| `/excluir-conta` | ExcluirConta | 200 | não | 31 | 157 | 1 |

Todas as rotas, com o tipo de cada uma:

| Rota | Tipo | Componente | Observação |
|---|---|---|---|
| `/` | página | Home |  |
| `/cursos` | página | Cursos |  |
| `/portugues` | só no site (no APK, /conta) | — |  |
| `/brazilian-portuguese` | redireciona | — | → /curso/br |
| `/curso/:id` | página | Curso |  |
| `/curso/:id/dia/:n` | página | Dia |  |
| `/curso/:id/revisao` | só no site (no APK, /conta) | Revisao |  |
| `/entrar` | página | Conta |  |
| `/cadastro` | página | Conta |  |
| `/gramatica` | página | Gramatica |  |
| `/gramatica/:id` | página | Gramatica |  |
| `/livro/gramatica-ru` | página | LivroGramatica |  |
| `/livros` | página | LivrosIndice |  |
| `/livros/:id` | página | LivroPagina |  |
| `/livros/:id/capitulo/:n` | página | LivroCapitulo |  |
| `/materiais-gratuitos` | só no site (no APK, /conta) | MateriaisIndice |  |
| `/materiais-gratuitos/:slug` | só no site (no APK, /conta) | AlfabetoPagina |  |
| `/russo-online` | só no site (no APK, /conta) | AulasRusso |  |
| `/sobre` | só no site (no APK, /conta) | Sobre |  |
| `/por-que-linvuu` | só no site (no APK, /conta) | PorQue |  |
| `/contato` | só no site (no APK, /conta) | Contato |  |
| `/ex-alunos-udemy` | só no site (no APK, /conta) | ExAlunosUdemy |  |
| `/assinatura` | só no site (no APK, /conta) | Assinatura |  |
| `/conta` | só no APK (não existe no site) | Assinatura |  |
| `/privacidade` | página | Legal |  |
| `/termos` | página | Legal |  |
| `/excluir-conta` | só no site (no APK, /conta) | ExcluirConta |  |
| `*` | não encontrada (404) | NaoEncontrada |  |

No .com (inglês): 41 páginas concretas, 23 indexáveis. A mesma rota pode ter status diferente em cada domínio — o mapa avalia cada perfil separadamente, como o servidor.

## 2. Folhas de estilo e quem veste cada uma

A coluna "veste" sai da importação real no código. Folha global (`styles.css`, `redesign.css`, `camadas.css`) alcança também a área do aluno, que tem regra própria (raio 0, sem sombra): mudança de gosto ali é regressão, não melhoria.

| Folha | Linhas | Importada por |
|---|---|---|
| `styles.css` | 465 | `main.tsx` |
| `redesign.css` | 449 | `main.tsx` |
| `pages/home-brasileiros.css` | 236 | `pages/HomeBrasileiros.tsx` |
| `camadas.css` | 230 | `main.tsx` |
| `tokens.css` | 209 | `main.tsx` |
| `plataforma/apk/app.css` | 176 | `plataforma/apk/Header.tsx` |
| `materiais.css` | 117 | `pages/MateriaisGratuitos.tsx` |
| `livros.css` | 116 | `pages/AulasRusso.tsx`, `pages/Contato.tsx`, `pages/ExAlunosUdemy.tsx`, `pages/Livros.tsx`, `pages/PorQue.tsx`, `pages/Sobre.tsx` |
| `plataforma/apk/rodada4.css` | 63 | `plataforma/apk/BarraInferior.tsx` |
| `components/analytics-consent.css` | 50 | `components/AnalyticsConsent.tsx` |
| `plataforma/apk/home-lote2.css` | 41 | `plataforma/apk/Home.tsx` |
| `plataforma/apk/primeira-abertura.css` | 41 | `plataforma/apk/PrimeiraAbertura.tsx` |
| `components/Button.module.css` | 35 | `components/Button.tsx` |
| `components/avaliacoes.css` | 34 | `components/Avaliacoes.tsx` |
| `site-publico.css` | 33 | `components/Header.tsx`, `main.tsx`, `pages/Assinatura.tsx`, `pages/Curso.tsx`, `pages/Cursos.tsx` |
| `plataforma/apk/conclusao.css` | 22 | `plataforma/apk/ConclusaoSessao.tsx` |
| `plataforma/apk/revisao.css` | 22 | `plataforma/apk/RevisaoErros.tsx` |
| `components/carregando.css` | 19 | `components/Carregando.tsx` |
| `components/sugestao-idioma.css` | 15 | `components/SugestaoIdioma.tsx` |
| `pages/excluir-conta.css` | 7 | `pages/ExcluirConta.tsx` |

## 3. Verificações disponíveis

| Comando | O que executa |
|---|---|
| `npm run build` | `node scripts/audio-privado.mjs && node scripts/conteudo.mjs --check && node scripts/travas-en.mjs && node scripts/seo.mjs && vite build && (npx playwright install chromium \|\| true) && node scripts/prerender.mjs && node scripts/validar-prerender.mjs && node scripts/comprimir.mjs` |
| `npm run lint` | `tsc --noEmit` |
| `npm run content` | `node scripts/conteudo.mjs` |
| `npm run content:check` | `node scripts/conteudo.mjs --check && node scripts/travas-en.mjs` |
| `npm run testar:medicao` | `node --import tsx scripts/testar-medicao.ts` |
| `npm run testar:seguranca` | `node scripts/testar-seguranca.mjs && node --import tsx scripts/testar-ip.ts` |
| `npm run validar:design` | `node scripts/validar-design.mjs` |
| `npm run medir:baseline` | `node scripts/medir-baseline.mjs` |
| `npm run medir:ingles` | `node scripts/en-tools/medir-ingles.mjs` |
| `npm run testar:avaliacoes` | `node --import tsx scripts/testar-avaliacoes.ts` |
| `npm run testar:progresso` | `node --import tsx scripts/testar-progresso.ts && node --import tsx scripts/testar-mensagem-retomada.ts` |
| `npm run build:website` | `node scripts/build-plataforma.mjs website` |
| `npm run build:apk` | `node scripts/build-plataforma.mjs apk` |
| `npm run testar:plataformas` | `node scripts/testar-plataformas.mjs` |
| `npm run testar:dominio` | `node --import tsx scripts/testar-dominio.ts` |
| `npm run lint:apk` | `tsc --noEmit -p tsconfig.apk.json` |
| `npm run testar:regras` | `npm --prefix scripts/regras ci && npx --yes firebase-tools@15.34.1 emulators:exec --only firestore --project demo-linvuu-regras "node scripts/regras/testar-regras.mjs"` |
| `npm run testar:exclusao` | `node --import tsx scripts/testar-exclusao.ts` |
| `npm run testar:newsletter` | `node --import tsx scripts/testar-newsletter.ts` |
| `npm run testar:revisao` | `node --import tsx scripts/testar-fsrs-dominio.ts && node --import tsx scripts/testar-registro-bloco.ts && node --import tsx scripts/testar-revisao-web.ts && node scripts/testar-isolamento-revisao.mjs` |
| `npm run testar:revisao:rota` | `npx --yes firebase-tools@15.34.1 emulators:exec --only firestore,auth --project demo-linvuu-revisao "node --import tsx scripts/testar-revisao-rota.ts"` |
| `npm run testar:newsletter:rota` | `npx --yes firebase-tools@15.34.1 emulators:exec --only firestore --project demo-linvuu-newsletter "node --import tsx scripts/testar-newsletter-rota.ts"` |

Scripts em `scripts/`: 80 (73 testes, 4 validadores, 2 medições).

## 4. Conteúdo

| Pasta | Arquivos JSON |
|---|---|
| `content/*.json` (raiz) | 7 |
| `content/idiomas/` | 4337 |
| `content/livros-privado/` | 77 |
| `content/livros/` | 21 |
| `content/gramatica/` | 12 |
| `content/audio/` | 0 |

## 5. Painel de ataque

Dividido por risco. **Sem arrependimento**: conserta defeito, não pode piorar. **Gosto**: muda aparência, depende de aprovação humana tela por tela.

| Frente | Grupo | Como se prova | Estado |
|---|---|---|---|
| Idioma vazando no .com.br | sem arrependimento | `npm run testar:dominio` | a medir |
| Link quebrado e 404 | sem arrependimento | `npm run build` + varredura das rotas em `dist` | a medir |
| Contraste AA par por par | sem arrependimento | `npm run validar:design` | home medida; demais páginas não |
| JSON de conteúdo inválido | sem arrependimento | `npm run content:check` | a medir |
| Teclado, foco e leitor de tela | sem arrependimento | inspeção por rota com Playwright | a medir |
| Aparência das páginas internas | gosto | captura antes/depois em 1440×900 e 390×844 | proposta |

## 6. Ordem sugerida

1. Grupo sem arrependimento, de cima para baixo do §5 — cada frente com o seu commit atômico.
2. Grupo de gosto, uma família de páginas por vez, com captura antes/depois e aprovação do Felipe antes do merge.
3. Conteúdo e pedagogia: fora deste mapa. Revisão do Felipe.

## 7. Limites deste mapa

- Descreve o que o **código declara** e o que o `metaRota` responde; não abre navegador nem mede desempenho.
- Não julga aparência, texto nem pedagogia.
- Contagem de sessões e capítulos é contagem de arquivos de conteúdo, não de páginas visitadas.
