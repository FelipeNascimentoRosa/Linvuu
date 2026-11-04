> **Entrada atual para Claude e ChatGPT/Codex:** leia primeiro [ESTADO-ATUAL.md](ESTADO-ATUAL.md) e [COORDENACAO-IA.md](COORDENACAO-IA.md). O conteúdo abaixo inclui rodadas históricas; não representa uma verificação atual de produção.

# Contexto do projeto (leia primeiro)

Para retomar numa conversa nova com o Claude, diga: "Leia docs/CONTEXTO.md e docs/ANALISE-E-PLANO.md do repositório FelipeNascimentoRosa/Linvuu e continue da próxima rodada." O repositório é privado (outubro de 2026). Claude e ChatGPT trabalham nele em parceria: regras em `docs/PARCERIA-IA.md`.

## O que é
Linvuu: idiomas em trilhas em sessões de ~30 min, para falantes de português. Dono: Felipe. Revisão de design e traduções: Luiza. E-mail oficial: hello.linvuu@gmail.com.

Atualização de 16/10/2026: foco somente em idiomas, website e Android. Arquitetura atual em `docs/WEBSITE.md` e `docs/APK.md`; as rodadas históricas abaixo contêm estados antigos.

## Onde cada coisa fica
| O quê | Onde | Observação |
|---|---|---|
| Código do site e as aulas | GitHub `FelipeNascimentoRosa/Linvuu` | Fonte da verdade. Tudo que não estiver aqui pode se perder |
| Site no ar | Render, https://linvuu.com.br | Só publica o que está no GitHub; deploy a cada push na `main` |
| Contas, XP, streak | Firebase (Auth + Firestore, coleção `users`) | Fora do GitHub: precisa de backup próprio |
| Chaves e variáveis | Painel do Render e Console do Firebase | Guarde uma cópia num gerenciador de senhas, nunca no GitHub |
| Domínio | Registro.br | Ative verificação em duas etapas e anote a data de renovação |
| Áudio nativo (futuro) | Servidor/armazenamento a contratar | O site lê de `VITE_AUDIO_BASE_URL`; até lá usa a voz do navegador |

## Estrutura do repositório
- `content/trilha.json`: trilha-mestre (12 fases, 120 dias). Idiomas com aulas escritas (russo e alemão) substituem o texto-mestre pelos títulos reais.
- `content/cursos.json`: cursos e status.
- `content/idiomas/<id>/aulas/aula-NNN.json`: **aulas escritas** (4 sessões de ~30 min). É aqui que o conteúdo novo entra.
- `content/idiomas/<id>/dia-NNN.json`: um dia por sessão. **Gerado** por `npm run aulas`. Não edite à mão os dias 1 a 24 do russo.
- `content/audio/<id>-gravar.csv`: lista de áudios a gravar (arquivo = hash do texto + .mp3).
- `content/legado/`: material anterior (alemão: 16 aulas; russo antigo; site estático). Fonte de consulta.
- `src/`: site (React + Vite). `server.ts`: API (Gemini, Stripe) e serve o `dist/` no Render.
- `docs/`: este contexto, a análise e o plano, marketing, internacional, a revisão das aulas, publicar, autenticação, backup.
- `src/i18n/`: textos do site e idiomas da interface. `scripts/seo.mjs`: sitemap e robots (rodam no build).

## Comandos
- `npm run dev`: abre o site local (porta 3000).
- `npm run aulas`: transforma as aulas em dias e gera a lista de áudios.
- `npm run auditar`: gera `docs/REVISAO-RU-AULAS.md` (alfabeto, letras fora de ordem, duplicatas, minutos, promessas).
- `npm run build`: valida o conteúdo e gera o site.

## Tamanho das trilhas
Decisão do Felipe: o russo tem 120 dias (30 aulas de 4 sessões). O alemão **passa de 120 dias** e segue os níveis do quadro europeu: A1 (20 aulas), A2 (26 aulas) e B1 (26 aulas), ou seja, 72 aulas = 288 sessões = 144 h. A trilha-mestre (`content/trilha.json`) continua com 120 dias como reserva para os idiomas ainda sem aulas escritas; `npm run aulas` cria dias além dos 120 quando um idioma tem mais aulas. O texto do site não promete um número fixo de dias. Plano completo em `docs/PLANO-ALEMAO.md`.

## Como adicionar uma aula (sem gastar tokens)
Dois jeitos. O compacto gasta cerca de 40% menos texto:
- **Compacto (recomendado):** escreva `content/idiomas/ru/fontes/aula-011.mjs` (copie `aula-007.mjs`). Palavras, diálogos e exercícios são listas curtas; ids, áudio e minutos são automáticos. Formato em `scripts/dsl-aula.mjs`.
- **JSON:** salve em `content/idiomas/ru/aulas/aula-011.json` (formato das aulas 1 a 6).
1. Escreva a aula pelo VS Code (não cole no chat).
2. `npm run aulas && npm run auditar` (o primeiro compila as fontes compactas e gera os dias).
3. Leia o relatório, corrija o JSON, repita.
4. Commit, push em uma branch e abra o PR. O teste automático roda o build.

## Decisões tomadas
- Mascotes só depois de pintados (`src/config/mascotes.ts`). Visual sóbrio, botões em pílula.
- Honestidade: nada de nível ou fluência em número fixo de dias. Horas e tempos saem do conteúdo (calculados), não de texto digitado.
- Login por e-mail e senha ativo; Google escondido até ser ativado.
- GitHub Pages foi descartado; hospedagem é o Render.

## Estado (rodada 13)
- Russo: aulas 1 a 30 (dias 1 a 120, status "publicada", curso "Disponível"; as aulas 11 a 16, 20 a 22 e 25 a 30 são de gramática; o curso passa dos 100 dias a partir da aula 25) estão no site, com player de sessão (áudio pela voz do navegador, exercícios, progresso salvo no navegador). O alfabeto fecha (33 letras; У e Х entraram na aula 1).
- Alemão COMPLETO: 72 aulas (A1, A2 e B1), 288 dias, 144 h, 205 tópicos de gramática e áudio em todas as frases; plano em `docs/PLANO-ALEMAO.md`. Antes: aulas 1 a 10 (dias 1 a 40, primeiro bloco) no ar, curso "Disponível"; plano das 30 aulas em `docs/PLANO-ALEMAO.md`.
- Áudio: MP3 salvos em `public/audio/<idioma>/` (gerados com Edge TTS por um workflow do GitHub); ver `docs/AUDIO.md`. Acento tônico é só gráfico (não entra no hash nem na fala). As 16 aulas antigas ficam em `content/legado/` só como consulta.
- Aba Gramática em `/gramatica/ru` e `/gramatica/de`, gerada das aulas (`scripts/gramatica.mjs`); ordem do curso, qualidade e próximos passos em `docs/GRAMATICA-RU.md`. Blocos de gramática aceitam `comparacao`, `erros`, `tabelas` e `tag`.
- A página do curso lista por aula quando o curso tem aulas escritas; as fases genéricas só aparecem para o que ainda é planejado.
- Os áudios RED KALINKA enviados pelo Felipe não entram no site nem no repositório (decisão dele; ele é o autor do livro). Ver `docs/GRAMATICA-RU.md`, seção 6.
- Marketing reescrito (ver `docs/MARKETING.md`); textos em `src/i18n/pt-BR.ts`; preparação internacional em `docs/INTERNACIONAL.md`.
- Páginas de termos e privacidade (modelo inicial, precisa de revisão jurídica e dos dados da empresa).
- Pendente de revisão: ver `docs/REVISAO-RU-AULAS.md` (diálogo da aula 1 com russo pouco natural, negação na aula 7).
- Progresso por conta (Firestore), áudio nativo, pagamento, termos e privacidade: ainda não feitos.

## Estado (rodada 14, outubro de 2026)
- **Três idiomas no site:** `/` português, `/en` inglês, `/es` espanhol (PR #220, mergeado). Textos em `src/i18n/`. A explicação das aulas é traduzida por mapas em `content/idiomas/<id>/i18n/<en|es>/` (`scripts/i18n-aulas.mjs`); o idioma estudado e o áudio não mudam.
- **Traduzido até agora:** títulos de todas as aulas e sessões (EN e ES) e as aulas 1 e 2 do português para hispanofalantes (`br` → `es`). Próximo: aulas 1 e 2 (grátis) dos outros cursos em EN e ES, depois o A1 do alemão e do russo.
- **Revisão:** a técnica passou (build, segurança, acessibilidade axe sem violações, `npm audit` limpo). Conteúdo: só as aulas 1 e 2 do português revisadas a fundo; o resto precisa de revisão por nativo. Detalhes em `docs/REVISAO-GERAL.md`.
- **PR #221 (mergeado):** cache do acesso no Stripe, cliente sem duplicar, checkout no idioma do site, redirecionamento aberto fechado no login, compressão, SEO (sitemap em 3 idiomas com hreflang, noindex em sessão não traduzida, 301), `render.yaml`, workflow `manter-acordado.yml`.

## Pendências do Felipe (fora do código)
- **Search Console:** «Não foi possível buscar o sitemap». O Felipe usa proteção contra robôs: liberar robôs verificados (Googlebot) e as rotas `/sitemap.xml` e `/robots.txt`; testar com «Inspeção de URL → Testar URL publicado». Se a proteção barrar o GitHub, apagar `.github/workflows/manter-acordado.yml` (ou usar plano do Render sem hibernação). Depois, reenviar `https://linvuu.com.br/sitemap.xml`.
- **Google Cloud / Firebase:** restringir a chave da API a `linvuu.com.br/*` e `localhost`; alerta de orçamento; ativar App Check; conferir domínios autorizados (`linvuu.com.br`, `localhost`); publicar `firestore.rules`.
- **Render:** plano sem hibernação e Health Check Path `/healthz`.
- **Stripe:** webhook (status no Firestore) e chaves live só no lançamento.
- **Áudio:** rodar o workflow «Gerar áudios» com idioma `br` (frases corrigidas nas aulas 1 e 2).
- **Marketing:** escrever a carta do professor (`src/config/carta.ts`) e reunir depoimentos com autorização.

## Material de referência recebido
- **«Gramática do italiano para brasileiros» (Falando com o Mundo, 25 páginas)**, enviado pelo Felipe em outubro de 2026. É um e-book comercial com licença individual (marca d'água «Licenciado para Aluno … Protegido por Eduzz»), então **não entra no repositório** (que é público) nem no site. Uso permitido: só conferir fatos e a ordem dos tópicos, como os outros livros (`docs/PLANO-PORTUGUES.md`, «Fontes e regra legal»).
- **Tópicos do e-book:** alfabeto; saudações; números, dias e meses; horas; perguntas; família; pronomes pessoais, reflexivos e possessivos; singular e plural; artigos definidos e indefinidos; preposições; comparativos e superlativos; advérbios de frequência; o verbo essere; principais irregulares.
- **Conferência:** os 20 tópicos do e-book já estão no curso de italiano da Linvuu (aulas 1 a 26 e 31). O curso vai além, até o B1.

