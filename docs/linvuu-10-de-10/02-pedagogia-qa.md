# 02 — Pedagogia, conteúdo e QA linguístico

Leia antes de tocar aula, gramática, livro, exercício, botão de áudio de frase ou índice. O CI valida **schema e contagem**, não a verdade linguística: foi assim que os erros da §4 chegaram à vitrine.

## 1. Mapa do conteúdo (verificado na `main`)

| O quê | Onde |
|---|---|
| Idiomas | `content/idiomas/{br,de,en,es,fr,it,ru}/` |
| Aula-fonte (4 sessões = 1 aula) | `content/idiomas/<id>/aulas/aula-NNN.json` |
| Dia servido na língua do material | `content/idiomas/<id>/dia-NNN.json` (ru tem 312 dias) |
| Dia servido com explicação em inglês | `content/idiomas/<id>/en/dia-NNN.json` |
| Mapa de tradução por aula | `content/idiomas/<id>/i18n/en/aula-NNN.json` (+ `titulos.json`) |
| Complementos, fontes, vozes | `content/idiomas/<id>/{complementos,fontes,pendentes}/`, `vozes.json` |
| Gramática | `content/gramatica/<id>.json` (explicada em pt) e `<id>.en.json` (em inglês): `br, de, en, es, fr, it, ru` |
| Livros | `content/livros/<id>/cap-NN.json`; `content/livros-privado/` é privado |
| Catálogo | `content/cursos.json`, `content/trilha.json`, `content/indice.json` (PT) e `content/indice.en.json` (EN) — **esquemas diferentes** |
| Trava do inglês | `content/travas-en.json` (`node scripts/travas-en.mjs`, `--atualizar` só com ordem) |
| Áudio por frase (listas de gravação) | `content/audio/*-gravar.csv` |

## 2. Schemas reais
- **Dia** (`dia-NNN.json`): `idioma, explicacao, dia, fase, nivel, status, titulo, objetivo, aula{numero,titulo,objetivo,sessoes,duracaoTotalMin,nivel}, sessao{sessao,titulo,duracaoMin,blocos[]}, origem, responsavel`.
- **Bloco** (`tipo`): `intro{min,texto}`, `alfabeto{grupos}`, `palavras{itens}`, `gramatica{titulo,explicacao,comparacao,exemplos,erros,tag}`, `exercicios{itens}`, `producao{enunciado,exemplo}`, `revisao{enunciado}`. Botões de áudio são campos `audio` nos itens.
- **Gramática**: `{idioma, categorias, topicos[]}`; tópico: `id, categoria, aula, aulaTitulo, sessao, dia, titulo, explicacao, comparacao, exemplos, tabela, erros`. No .com todo tópico exige `explicacaoEm: "en"` (o filtro da API passou a exigir; `testar-isolamento-http.mjs` confere).
- Aulas grátis = sessões 1–8 (`dia <= 8`); paywall na 9.

## 3. Fonte de verdade e guardas — `scripts/conteudo.mjs` (313 linhas)
- Os `dia-*.json` são **derivados**. Corrigir só o derivado é regressão: edite a aula-fonte e/ou o mapa `i18n/` e rode `npm run content`.
- **GUARDA 2026-11-04** (linha 16): nunca esvaziar índice quando há dias traduzidos em disco sem mapa i18n; recusa antes de escrever. Reposição: `node scripts/restaurar-mapas-i18n.mjs <curso> <língua>`.
- **GUARDA 2026-11-09** (linha 289): `content/indice.<língua>.json` tem que bater com o que os mapas i18n implicam; senão aulas traduzidas somem do domínio (30 aulas de espanhol ficaram fora do .com assim). Em `--check` a divergência vira erro.
- Comandos: `npm run content` (gera), `npm run content:check` (= `conteudo.mjs --check && travas-en.mjs`), `node scripts/validar-aulas.mjs`, `npm run auditar` (auditoria de russo), `node scripts/auditar-cobertura-internacional.mjs`.
- `npm run build` e `build:vercel` já rodam `conteudo.mjs --check` e `travas-en.mjs`.

## 3b. Lei do .com: pedagogia nativa em inglês (26/11/2026)
- **Proibido** traduzir pedagogia do curso PT-BR para o .com. O brasileiro parte do português (gênero, concordância, sujeito oculto); o anglófono parte do inglês (SVO, sem gênero, auxiliar `do`, sem dupla negação, sem `tu/vous`). Traduzir produz um curso pedagogicamente falso.
- **Compartilhado:** inventário da língua-alvo, hashes FNV-1a dos MP3 e tema/nível. **Livre por L1:** quantidade e ordem de blocos, explicações, pronúncia, `comparacao`, `erros`, distratores.
- **Fluxo:** `node scripts/ficha-alvo.mjs <curso> <aula>` → escrever `content/idiomas/<id>/en/dia-NNN.json` (CURADOS: `ru/en`, `fr/en`, `it/en`) → `npm run content` → `npm run content:check`. `i18n/en/aula-NNN.json` (mapa 1:1) é legado congelado.
- **Guardas em CURADOS:** o índice em inglês deriva dos `dia-*.json` em disco; aula incompleta (≠ 4 sessões) ou índice listando mais aulas do que o disco **falha ruidosamente** (`conteudo.mjs`). A sequência de blocos do dia em inglês **não** precisa igualar a do PT.
- **Critério de aceite:** nenhum erro/distrator vindo de interferência do português («Quanto custa?»); `comparacao` e `erros` citam o inglês; `auditar-pedagogia --espelho` verde. Legado ainda espelhado: `ru/en`, `fr/en`, `de/en`, `es/en` e `it/en` dias 1–8 (baseline), a refatorar.

## 4. Erros linguísticos já achados (checklist de regressão)
Verifique estes pontos sempre que reeditar as aulas citadas e **procure o mesmo tipo de erro** nas demais:

| Arquivo | Erro corrigido na #645 | Regra |
|---|---|---|
| `es/en/dia-001.json` | soletrava `J-O-H-N` com "erre" no lugar de "hache" | Soletração: conferir cada letra pelo nome real no idioma |
| `de/dia-001.json`, `de/en/dia-001.json` | regra falsa "letras finais nunca ficam mudas" (ex.: *Schuh*) | Nada de "nunca/sempre" fonético sem checar exceções |
| `fr/dia-001.json`, `fr/en/dia-001.json` | *bonsoir* na despedida noturna tratado como erro | Registro/uso social precisa de fonte |
| `ru/dia-001.json` | tendência inventada de lusófonos acentuarem o fim das palavras | Não atribuir erro típico sem evidência |
| `en/dia-001.json` | botão de áudio `"Hello! ou Hi!"` (conjunção portuguesa no áudio inglês, sem MP3) | Texto do botão = texto do MP3, só na língua-alvo |
| `br/dia-001.json` | `objetivo` em português vazando na API do .com | Metadado de topo também segue o idioma do domínio |
| `es` gramática (.com) | "I'm a doctor" sem artigo em inglês | Conferir contraste entre as línguas |
| `ru` gramática (.com) | negava absolutamente o *to be* no presente | Explicar omissão da cópula em frases equativas |
| `it/dia-001.json` | botão `Buongiorno, signora Rossi!` **sem MP3** (pendente de geração) | 3 dos 4 botões sem MP3 foram mapeados na #645 |

## 5. Protocolo de auditoria (dia/2 a dia/312 — aberto)
1. Amostra por curso e fase (não ler lote inteiro: use `rg` por padrão suspeito e `node -e` para listar campos). 2. Para cada aula: soletração, regra absoluta ("nunca", "sempre", "todo"), tradução literal, exemplo com idioma misturado, botão de áudio sem MP3 (`public/audio/` ou R2). 3. Registrar achado em `docs/` com arquivo, bloco e correção. 4. Corrigir na fonte, `npm run content`, `npm run content:check`. 5. Revisão humana: o Felipe é fluente em russo e corrige russo; para as demais, revisor nativo ou fonte citada.

## 6. Cobertura (medida em 11/11/2026 e reconferida por `content:check`)
Sessões explicadas por interface: RU 312/312, FR 248/248, curso BR→EN 248, ES-EN 248/248, DE-EN 288/288, IT-EN **8/248** (só as grátis). Italiano no .com é a frente aberta. Confirme com `node scripts/conteudo.mjs --check` (imprime o resumo do catálogo) antes de citar número.

## 7. Critério de saída para 10/10
- 100% dos botões de áudio de `dia/1` e das gramáticas gratuitas com MP3 mapeado (hoje falta `it/dia-001`).
- Auditoria de `dia/2`–`dia/312` concluída por curso, com relatório e 0 achados abertos de severidade alta.
- Italiano-EN com 248/248 e `travas-en.json` atualizado com ordem do Felipe.
- Nenhuma frase com "nunca/sempre/qualquer" absoluto sem fonte (checagem por `rg` no PR).
