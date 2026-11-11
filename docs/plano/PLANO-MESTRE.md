# Plano-mestre da Linvuu — 11/11/2026

Resposta ao `docs/historico/PROMPT-UNICO-PLANEJAMENTO-2026-11-11.md`, escrita uma vez, para ser executada lote a lote por outro modelo. Três arquivos trabalham juntos: este (o porquê e a ordem), [`LOTES.md`](LOTES.md) (os 100 lotes) e [`EXECUTAR.md`](EXECUTAR.md) (como rodar cada sessão). O andamento fica em [`ESTADO.md`](ESTADO.md).

**De onde vêm os fatos.** Do repositório na `main` em `7ad0f435`, dos documentos do projeto, do dossiê de 10–11/11 e de leituras feitas em 11/11/2026 nos dois sites, no DNS, na API do GitHub e no vidIQ. O que foi medido hoje está marcado "(medido 11/11)". Número meu que não é medição é **alvo** ou **hipótese `H n`** (lista no §11).

**A tese, em seis linhas.**
1. O site está pronto para vender e nunca vendeu: zero compra real atravessou o checkout.
2. Quase ninguém chega: 10 cliques em 28 dias no `.com.br`, 0 no `.com`.
3. A única demanda medida é por **aula com professor** ("russian classes near me": 120 impressões, 0 cliques), e a única prova social é de um **professor** (Udemy: 4,74 em 72 avaliações, 385 alunos).
4. R$ 139 por mês é preço de curso com gente; sem gente visível, o aluno compara com aplicativo de R$ 30 a R$ 60.
5. Por isso a assinatura sozinha não fecha R$ 1,1 milhão. A conta fecha com **quatro produtos**: assinatura, turma ao vivo, plataforma para professores e escolas, e vitrines de terceiros (Udemy, Amazon, Google Play).
6. Nada disso depende de mais páginas bonitas. Depende de vender a primeira turma, medir o funil e publicar o que já está escrito.

---

## §1. VEREDITO

| # | Área | Nota | A frase mais dura |
|---|---|---|---|
| 1 | Descoberta e SEO técnico | 7 | Tecnicamente limpo e invisível: URLs corretas num domínio de quatro semanas para o qual ninguém aponta. |
| 2 | SEO de conteúdo | 1 | Nenhuma página responde a uma pergunta que alguém digita; 1.515 tópicos de gramática em português estão empilhados em 6 URLs. |
| 3 | Arquitetura de informação | 5 | `/gramatica` é um redirecionamento vestido de página, e nada leva da dúvida à aula e da aula à compra. |
| 4 | Performance | 6 | CLS zero e LCP de 3,8 a 4,8 s no celular, com causa nunca diagnosticada. |
| 5 | Design visual | 5 | Uma paleta de 4 cores virou 54 tokens e três folhas empilhadas; a home quente espera num PR e o resto do site continua frio. |
| 6 | UX, mobile e acessibilidade | 5 | No celular a primeira dobra não mostra prova nem botão, e o alemão é lido com voz de português por falta de `lang`. |
| 7 | Pedagogia e produto | 7 | É o melhor ativo da casa: 460 objetivos de aula estão escritos e o hub mostra "sessão 1 de 4 · 30 min" no lugar; quem para de estudar não é chamado de volta. |
| 8 | Áudio | 5 | 16,5 mil arquivos; 11 mil deles são pagos e qualquer pessoa baixa; espanhol e italiano não têm contrato de uso comercial. |
| 9 | Livros | 4 | 113 capítulos escritos, 12 publicados, 151 arquivos pagos em repositório público e nenhum livro em loja. |
| 10 | Conversão e checkout | 2 | Nenhuma compra real foi feita; a seção de avaliações diz "chegam em breve" e o desconto de 50% não aparece onde se paga. |
| 11 | Medição | 1 | Nenhum número do funil existe; o que foi instrumentado só conta quem aceita o aviso. |
| 12 | Marketing e aquisição | 1 | 10 cliques em 28 dias, redes paradas, e o e-mail de contato exibido não recebe mensagem. |
| 13 | Confiança, legal e suporte | 4 | O site manda escrever para um endereço com MX nulo e promete inglês onde há português. |
| 14 | Engenharia, CI e app | 7 | 75 verificadores e 36 PRs em três dias para um produto com zero vendas: a engenharia está um ano à frente do negócio. |

- **O maior problema:** não chega gente, e a oferta não mostra as pessoas que justificam o preço.
- **O mais caro:** continuar produzindo site em vez de venda — 36 PRs entre 09 e 11/11, nenhum deles uma compra.
- **O mais fácil:** o e-mail de contato. É uma troca de endereço ou um clique na Cloudflare (lote 2).

## §2. ONDE O DINHEIRO VAZA

Ordenado por quanto trava a receita. Sem venda nenhuma, não há valor em reais para estimar; a ordem é por degrau do funil.

| # | Vazamento | Evidência | Lote |
|---|---|---|---|
| 1 | Não existe oferta de alto valor. Com R$ 139, cada aluno paga pouco e anúncio nunca se paga. | Só há planos de R$ 139 a R$ 999; a página de aulas ao vivo não tem preço nem data. | 17, 85, 86 |
| 2 | Ninguém chega. | Search Console: 236 impressões e 10 cliques em 28 dias (`.com.br`); 10 impressões e 0 cliques (`.com`). | 14–16, 23–27, 37 |
| 3 | O checkout nunca foi provado. | PENDENCIAS: "nenhuma compra real de ponta a ponta foi verificada". | 3 |
| 4 | O contato não chega. | MX de `linvuu.com` = `0 .` (medido 11/11) e o site exibe `contato@linvuu.com`. | 2 |
| 5 | O funil é cego. | PAINEL §2: visitas "sem dado"; não há evento de clique. | 4–6 |
| 6 | A prova social existe e não é usada. | Home e `/assinatura` dizem "chegam em breve"; as avaliações reais estão só em `/russo-online`. | 7 |
| 7 | 302 descontos de fundador vencem em 30/01/2027 sem um resgate verificado, e o código não aparece na página. | PRECOS-DEFINIDOS; CLAUDE.md D3. | 8, 19 |
| 8 | O anual não parcela. | PENDENCIAS, "[decisão do Felipe]". | 12 |
| 9 | O produto pago está de graça no GitHub. | API (medido 11/11): repositório `public`; 11.033 MP3 pagos e 151 arquivos de capítulo. | 20–22 |
| 10 | O canal de maior fatia da meta não tem uma linha de código. | META §3: turmas = 38% da meta; nenhuma tela de professor. | 45–51 |

**A conta que fecha (hipóteses, não promessa).**

| Produto | Conta | Caixa até 31/12/2027 |
|---|---|---|
| Assinatura no site e no app | 300 assinantes ativos em dez/2027, em rampa (`H7`) | R$ 180 mil |
| Turma ao vivo (russo, alemão, português para estrangeiros) | 40 turmas × 9 alunos × R$ 1.497 (`H1`) | R$ 540 mil |
| Plataforma para professores e escolas | 60 professores × 15 assentos × R$ 59 × 6 meses (`H2`) | R$ 319 mil |
| Vitrines: Udemy, Amazon, Google Play | (`H5`) | R$ 80 mil |
| **Soma** | | **R$ 1,12 milhão** |

Com metade do resultado em cada linha, a soma é perto de R$ 560 mil. Só com assinatura pela metade e 8 turmas, fica perto de R$ 200 mil. A diferença entre os três cenários é uma só: quantas turmas e quantos professores a Linvuu consegue vender — e isso é trabalho de venda do Felipe e dos professores, não de código. 40 turmas pedem cerca de 960 horas de aula em 2027 (perto de 20 horas por semana, somando todos os professores). Os portões de `ESTADO.md` dizem cedo qual cenário está acontecendo.

## §3. RÉGUA REVISADA

| Área | Piso que adoto | Como medir | Onde o piso atual é covarde |
|---|---|---|---|
| 1 SEO técnico | 100% das URLs do sitemap com inspeção "indexada" em 60 dias; 0 URL do sitemap que redireciona no cliente | tabela de inspeção no PAINEL; check paridade-head | mede forma do `<head>`, não se o Google aceitou a página |
| 2 SEO de conteúdo | 60 páginas de dúvida até 31/12/2026 e 196 até 09/02/2027; cada lote só sai depois de medir a indexação do anterior | contagem no sitemap + Search Console | "200 em 6 meses" sem portão por lote deixa publicar 200 páginas que não indexam |
| 3 Arquitetura | profundidade máxima 3; 0 órfã; 100% com próximo passo | script de links (lote 55) | não havia script: era intenção |
| 4 Performance | LCP ≤ 2,5 s agora e ≤ 2,0 s até 31/03/2027 no celular; JS inicial da home ≤ 120 KB gzip; piso do Lighthouse 0,90 | `medir:baseline`; limite no build | piso 0,75 aceita página lenta; "≥ 95" sem saber a causa do LCP é desejo |
| 5 Design | 2 folhas globais; ≤ 6 cores de texto; 0 hexadecimal fora de `tokens.css`; H1 ≥ 1,2 × H2 em 390 px | `validar:design` | a regra existia e o site tem 54 tokens |
| 6 UX e acessibilidade | botão e prova na 1ª dobra em 390×844; 0 alvo < 44 px; `lang` em 100% dos trechos estrangeiros; acessibilidade ≥ 0,95 **bloqueando** merge | `foto.mjs`, `olhar-site.mjs`, axe, Lighthouse | acessibilidade era aviso; teste com 5 pessoas não cabe em quem tem 10 visitas por mês — trocado por medida de máquina até haver tráfego |
| 7 Pedagogia | objetivo da aula visível no hub e na sessão em 460 de 460; revisão com data; retomada em 1, 3 e 7 dias | `curl` do hub; `testar:progresso` | "4 sessões de 30 min" não mede aprendizado |
| 8 Áudio | 0 arquivo pago em repositório público; manifesto com 0 faltante em CI; primeiro som ≤ 1 s; 100% do áudio pago com licença comercial | `git ls-files`; check de manifesto | a régua antiga dizia que es/it têm 3 arquivos — têm 2.335 e 1.996; o buraco é licença e exposição |
| 9 Livros | 0 capítulo pago em repositório público; 6 livros em loja até 09/02/2027 | `git ls-files`; links das lojas | "A1 completo" já existe; faltava distribuição |
| 10 Conversão | 3 compras reais e 3 reembolsos antes de qualquer divulgação; preço e botão na 1ª tela; 0 seção vazia | Stripe; `foto.mjs`; grep | "funil instrumentado" não é compra feita |
| 11 Medição | 6 números por dia e por domínio, vindos do servidor; 0 número dependente de consentimento no painel principal | `/api/metricas` | PostHog opt-in com 10 visitas por mês não mede nada |
| 12 Marketing | 1 turma vendida até 31/12/2026; 8 vídeos e 30 peças por mês; anúncio só depois do lote 3 e com parada em R$ 400 por aluno de turma | PAINEL; planilha | "CAC ≤ R$ 150" é impossível de julgar com ticket de R$ 139 e zero venda |
| 13 Confiança | 100% dos contatos exibidos recebem; 0 promessa de idioma que a página não entrega; regra dos 7 dias ao lado do botão | e-mail de teste; `testar:dominio` | "SLA de 1 dia" num endereço que devolve a mensagem |
| 14 Engenharia | fila de PRs ≤ 3 e nenhuma parada há mais de 48 h; no máximo 20% dos PRs de documento; alerta de queda; restauração de backup datada | API do GitHub; PAINEL §9 | "100% dos checks verdes" já é verdade e não vendeu nada |

## §4. DIAGNÓSTICO POR ÁREA

**1 · SEO técnico**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| `/curso/ru` e `/russo-online` fora do índice | domínio novo, sem links | a única consulta com demanda cai na home em português | PENDENCIAS [SEO, 10/11] |
| Search Console com 87 e 35 URLs antigas | sitemaps não reenviados | o Google trabalha com mapa velho | PENDENCIAS [auditoria, 11/11] |
| PAINEL diz que a home não está no índice; DECISAO-INDEXACAO diz que está | dois documentos, duas datas | ninguém sabe o estado real | PAINEL §2 × DECISAO §1 |

**2 · SEO de conteúdo**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| 0 página de dúvida | a explicação mora dentro de sessão `noindex` e de 1 página por idioma | nenhuma busca informacional chega | ESTRATEGIA-PAGINAS-DE-DUVIDA §1 |
| tópico com mediana de 87 palavras (medido 11/11, alemão) | tópico foi escrito para a aula, não para a busca | 1 tópico = 1 página daria conteúdo raso | `content/gramatica/de.json` |
| hub de curso sem preço, prazo e "tem professor?" | hub lista aulas | não responde à intenção de quem compara cursos | DECISAO-INDEXACAO §3 |

**3 · Arquitetura**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| `/gramatica` responde 200 e o navegador vai embora | `<Navigate>` no React | fora do sitemap; paridade quebrada | PENDENCIAS [SEO · /gramatica] |
| não há trilha nem "próximo passo" | páginas nasceram soltas | visitante lê e sai | régua 5.3 sem script |
| `/es/livros` faz dois 301 | regra de prefixo antes do caminho | salto desperdiçado e 404 em `/es/planos` | PENDENCIAS [rotas, 11/11] |

**4 · Performance**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| LCP 3,8–4,8 s no celular em 3 famílias de rota | não diagnosticada | página de entrada lenta | METRICS.md |
| um único `index-*.js` para todas as rotas (medido 11/11) | sem divisão por rota | a home carrega código de aula e cobrança | HTML de produção |
| flash de "Carregando…" em curso e aula | dados chegam depois do primeiro render | sensação de site quebrado | CLAUDE.md, regra de carregamento |

**5 · Design**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| 54 tokens e 17 cores de texto | três folhas globais empilhadas | cada rota tem sua escala | AUDITORIA-DESIGN D09, D12 |
| home quente só num PR; 6 páginas vestidas por `livros.css` frias | PR #556 parado | duas marcas no mesmo site | DOSSIE §3, §5.4 |
| Vuu a 48 px e Caveat em nenhuma página | marca definida e não aplicada | site poderia ser de qualquer um | AUDITORIA-DESIGN D11 |

**6 · UX, mobile e acessibilidade**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| H1 de 34 px menor que H2 de 36 px no celular; sem prova nem botão na dobra | layout pensado no desktop | o visitante de celular não vê por que ficar | AUDITORIA-DESIGN D01–D04 |
| home com 10.733 px de altura em 390 px (medido na captura v1-mob-cheia) | 10 seções empilhadas | planos ficam a 8 telas de distância | dossiê, `04-capturas` |
| 0 atributo `lang` no idioma estudado (medido 11/11) | componente de frase não marca idioma | leitor de tela lê errado; WCAG 3.1.2 | `curl` de `/gramatica/de` |

**7 · Pedagogia e produto**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| o hub mostra rótulo de duração em 1.840 de 1.840 dias (medido 11/11) | a página lê o campo do dia, não o da aula | os 460 objetivos escritos ficam invisíveis | `content/idiomas/*/aulas/*.json` |
| retomada só fala com quem volta | não há envio de e-mail | quem para não é chamado | `mensagemRetomada.ts` |
| revisão de erros só no APK | recurso não portado | o site esquece o que o aluno errou | `plataforma/apk/RevisaoErros.tsx` |

**8 · Áudio**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| 11.033 MP3 pagos em repositório público (medido 11/11) | migração parada à espera da chave no Render | o produto pago é baixável | CLAUDE.md, armadilha 2 |
| es e it pagos só em Edge TTS | motor sem contrato comercial | risco jurídico ao vender | docs/AUDIO.md |
| manifesto conferido à mão | sem check | áudio faltante só aparece para o aluno | régua 5.8 |

**9 · Livros**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| 151 arquivos de capítulo pago públicos | mesma causa do áudio | idem | `content/livros-privado` |
| 7 PDFs prontos e nenhum em loja | livro tratado só como brinde da assinatura | zero aquisição por livro | Linvuu-Livros-em-PDF |
| `/livro/gramatica-ru` anuncia "Dez aulas" num livro de 15 capítulos | texto antigo | página desmente o sumário | CLAUDE.md D7 |

**10 · Conversão**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| 0 compra real | ninguém fez a compra de teste | todo o resto é suposição | PENDENCIAS |
| "As primeiras avaliações… chegam em breve" na home | seção sem dado | parece site sem aluno | captura de 11/11 |
| `/assinatura`: posição 2,9, 33 impressões, 0 cliques; sem preço na 1ª tela | título e página não dizem o preço | quem procura preço não clica | DECISAO §1; AUDITORIA-DESIGN D15 |

**11 · Medição**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| visitas "sem dado" | medição depende de consentimento | impossível calcular conversão | PAINEL §2 |
| nenhum evento de clique | não foi tipado | botão novo não se compara com o antigo | SEO_AUDIT §7.4 |
| Clarity instalado e nunca lido | sem rotina | ferramenta sem uso | PROMPT-UNICO §2.5 |

**12 · Marketing**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| 10 cliques em 28 dias | nenhum canal ativo | funil vazio | DECISAO §1 |
| busca no YouTube existe e é pouco disputada: "alemão para iniciantes" 6.286/mês, competição 22 (medido 11/11) | nenhum vídeo | demanda entregue a outros | vidIQ |
| 302 códigos de fundador sem resgate | base não foi acionada; código não aparece na página | desconto vence em 30/01/2027 | PRECOS-DEFINIDOS |

**13 · Confiança**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| e-mail exibido não recebe | MX nulo em `linvuu.com` | contato perdido | DNS, medido 11/11 |
| `.com/curso/it` promete inglês com 0 de 248 | texto genérico do molde | o defeito mais grave do site, segundo o próprio CLAUDE.md | CLAUDE.md D1 |
| regra de arrependimento longe do botão | texto só em `/termos` | dúvida na hora de pagar | `/assinatura` |

**14 · Engenharia**

| Sintoma medido | Causa raiz | Consequência | Evidência |
|---|---|---|---|
| 3 PRs verdes parados e fila cheia | o merge depende de uma pessoa | o agente para | API do GitHub, medido 11/11 |
| 98 documentos, 5 planos concorrentes | cada sessão cria o seu | agente novo lê o plano errado | `docs/` |
| queda do site não avisa ninguém | só existe o "manter acordado" | indisponibilidade silenciosa | `.github/workflows` |

## §5. OS 100 LOTES

A tabela única, com as dez colunas pedidas, está em [`LOTES.md`](LOTES.md). Ela é gerada de dados e conferida por script: 100 linhas, numeração sem buraco, soma por área igual a 100, nenhuma dependência apontando para lote posterior.

Uma diferença em relação ao pedido: a coluna **motor** usa `assinatura`, `anual`, `turma`, `B2B`, `editorial`, `pago`, `Play`, `marketplace`, `todos` ou `higiene`. `turma` e `marketplace` não existiam na lista original; entram porque são o que este plano acrescenta à conta (§2).

## §6. ORDEM DE EXECUÇÃO

| Onda | Lotes | Roda em paralelo | Pré-requisitos | Resultado verificável ao fim |
|---|---|---|---|---|
| **0** · 11 a 25/11/2026 | 1–22 | Felipe: 1, 2, 3, 16 e as decisões do 17. Agente: 4–11, 14, 15, 18, depois 12, 13, 17, 19–21 | 3 antes de 12, 17 e 19; 20 e 21 antes de 22 | compra real e reembolso feitos nos dois domínios; funil imprime 6 números; e-mail recebe; página da turma de russo no ar com data e preço |
| **1** · 26/11 a 11/12 | 23–44 | Agente: 23–32, 42–44. Felipe e professores: 37, 40, 41. E-mail (33–35) depois do DNS | 23 antes de 24, 25; 33 antes de 34, 35 | 31 páginas de dúvida no ar; 6 hubs reescritos; 8 vídeos; primeira aula aberta; LCP ≤ 2,5 s |
| **2** · 12/12 a 10/01/2027 | 45–66 | Trilha de professores (45–51), trilha editorial (52–55), trilha de produto (56–61), trilha de design (62–66) | 45 antes de 46–48; 62 antes de 63; medir indexação do lote 24 antes do 52 | painel do professor em produção; 121 páginas de dúvida; 3 turmas-piloto de professores em negociação; 2 folhas globais |
| **3** · 11/01 a 09/02 | 67–84 | Livros (67, 68), editorial (69–71), app (72–76), áudio (77–81), Felipe: 82, 84 | 72 e 73 antes de 74; 78 antes de 79, 80; 83 antes de 84 | 6 livros em loja; app publicado com compra; 196 páginas de dúvida; custo por aluno de turma medido |
| **4** · 10/02 a 10/05 | 85–100 | Turmas novas (85, 86), `.com` (87), vitrines (88, 89), higiene (90–96, 99), medição (97, 98, 100) | 85 e 86 só se a turma de russo fechou com 6 ou mais | 3 idiomas com turma; painel semanal por 4 semanas; plano reescrito com números reais em 31/03 |

Regra entre ondas: a onda seguinte só começa pelos lotes cujo pré-requisito está **mergeado**. Lote à espera do Felipe não trava os demais: o agente prepara o que cabe a ele (texto, checklist, rascunho) e segue.

## §7. OS DEZ PRIMEIROS

| Ordem | Lote | Dia | Onde toca | Isto destrava |
|---|---|---|---|---|
| 1º | 2 · e-mail de contato recebe | 1 | Cloudflare (Email Routing) **ou** `src/config/site.ts` | todo pedido de turma, escola e suporte |
| 2º | 1 · mesclar #555, #556, #557 | 1 | GitHub | a fila: sem isso o agente não pode abrir o 4º PR |
| 3º | 3 · compra real e reembolso | 1–2 | `linvuu.com.br/assinatura`, `linvuu.com/assinatura`, Stripe | divulgar, parcelar, vender turma, anunciar |
| 4º | 4 · funil do servidor | 2–4 | `server/medicao.ts`, `/api/metricas` | saber a conversão; preencher o PAINEL com número |
| 5º | 5 · visitas sem cookie | 4 | `server.ts`, `server/medicao.ts` | o denominador de tudo |
| 6º | 7 · avaliações reais | 5 | `src/components/Avaliacoes.tsx`, `src/config/avaliacoes.ts` | prova social na página que vende |
| 7º | 8 · FUNDADORES e grade de planos | 5–6 | `src/pages/Assinatura.tsx`, `src/components/OfertaAtual.tsx` | o resgate dos 302 códigos antes de 30/01 |
| 8º | 10 · primeira dobra do celular | 6–7 | `src/pages/HomeBrasileiros.tsx`, `home-brasileiros.css` | o visitante de celular ver por que ficar |
| 9º | 17 · turma de russo com pagamento | 8–11 | `src/config/aulas-russo.ts`, `src/pages/AulasRusso.tsx`, `server/billing.ts` | o primeiro produto de alto valor |
| 10º | 20 · áudio pago fora da árvore pública | 11–14 | Render (chave), `scripts/audio-privado.mjs` | parar de entregar o produto de graça |

Cabe em 14 dias para uma pessoa com agente porque seis dos dez são S, e os dias do Felipe somam cerca de 6 horas: duas decisões (lotes 2 e 17), três compras (lote 3), três cliques de merge (lote 1) e a chave no Render (lote 20).

## §8. O QUE EU RECUSO

**Ideias óbvias que não recomendo aqui**

1. **Traduzir alemão, italiano e o resto do espanhol para inglês agora.** São mais de 35 mil textos; o `.com` teve 10 impressões em 28 dias. Só depois de o `.com` faturar US$ 500 por mês.
2. **Uma página por tópico de gramática (1.515 páginas).** Mediana de 87 palavras por tópico: seria conteúdo raso em massa num domínio novo. Agrupar em temas (lotes 23–24).
3. **Gamificação, sequência de dias, ranking.** Não há aluno para reter; o Duolingo faz isso com 500 engenheiros e de graça.
4. **Teste A/B.** Com 10 cliques por mês, nenhum teste termina. Decide-se por princípio e mede-se antes e depois.
5. **Anúncio para a assinatura de R$ 139.** O valor por aluno não paga o clique. Anúncio só para turma, e só depois do lote 3.
6. **Certificado.** O CLAUDE.md já proíbe prometer; emitir sem lastro custa confiança.
7. **Reabrir o site em espanhol.** Há demanda medida ("aprender ruso": 76 mil buscas por mês no YouTube, 19 vezes o português), mas exige interface, conteúdo e revisão. É o primeiro candidato de 2027 **se** o portão de março for cumprido; antes disso, não.
8. **Mais um mascote, mais uma variante de home, mais uma paleta.** A variante A está escolhida; aplicar e seguir.
9. **App para iOS, modo offline, reconhecimento de fala.** Nada disso vende a primeira turma.
10. **Trocar de framework, de biblioteca de i18n ou de estrutura de URL.** Já recusado com medição em `docs/SEO_AUDIT.md` §4; continuo recusando.

**O que o Felipe deveria parar de fazer hoje**

1. **Pedir auditoria nova.** Há quatro de 11/11. O que falta é executar.
2. **Deixar PR verde parado.** Três PRs com todos os checks verdes travam a fila inteira. Regra: nenhum PR verde dorme duas noites.
3. **Criar um plano por IA.** Existem cinco planos concorrentes no repositório. A partir de hoje há um; os outros vão para o histórico (lote 99).
4. **Mexer em aparência antes de vender.** Tudo o que é gosto fica nas ondas 1 e 2, depois da compra real e da turma.
5. **Tratar o repositório público como detalhe.** A decisão de 08/11 foi deixá-lo privado; em 11/11 ele está público. Ver §10, item 3.
6. **Esperar o SEO.** Domínio de quatro semanas leva meses. A primeira receita vem de gente que o Felipe já alcança: ex-alunos, redes, aula aberta, professores.

## §9. REDESENHO ESPECIFICADO

Princípio: **duas superfícies, uma marca.** `site` (páginas que vendem) é quente — cartão arredondado, sombra macia, superfícies alternadas. `estudo` (aula, gramática, livro, conta) é silenciosa — raio 0, sem sombra, texto em coluna. A fronteira já existe no `validar-design`; este redesenho a formaliza.

**(a) Tokens**

| Cor | Hex | Uso |
|---|---|---|
| verde-floresta | `#1E3B2F` | ação, links, fundo de marca |
| verde-900 | `#152A21` | ação em hover |
| verde-100 | `#E4E6DA` | superfície alternada, acerto |
| papel | `#F5F1E8` | fundo |
| papel-claro | `#FAF8F2` | cartão |
| papel-escuro | `#EAE4D6` | faixa recuada |
| grafite | `#1D1F1C` | texto principal |
| grafite-80 | `#3E403B` | texto secundário |
| grafite-65 | `#5C5E57` | legenda (mínimo para texto) |
| ocre | `#B7791F` | traço de progresso e marca-texto; nunca texto |
| ocre-claro | `#EFDFC2` | selo, superfície de destaque |
| tijolo / tijolo-claro | `#8C2F1E` / `#F2DED6` | erro em exercício |

Cores de texto permitidas: grafite, grafite-80, grafite-65, verde-floresta, papel (sobre verde) e tijolo. Seis, não dezessete.

| Degrau | Celular (390) | Desktop (1440) | Peso | Entrelinha | Tracking | Fonte |
|---|---|---|---|---|---|---|
| H1 | 36 px | 56 px | 600 | 1,08 | −0,025em | Newsreader |
| H2 | 28 px | 40 px | 600 | 1,12 | −0,015em | Newsreader |
| H3 | 22 px | 26 px | 600 | 1,2 | −0,01em | Newsreader |
| Lead | 18 px | 20 px | 400 | 1,5 | 0 | Source Sans 3 |
| Corpo | 17 px | 17 px | 400 | 1,6 | 0 | Source Sans 3 |
| Pequeno | 15 px | 15 px | 400 | 1,5 | 0 | Source Sans 3 |
| Legenda | 14 px | 14 px | 500 | 1,4 | 0 | Source Sans 3 |
| Sobretítulo | 13 px | 13 px | 600 | 1,3 | 0,14em | Source Sans 3 (único degrau abaixo de 14; só rótulo em maiúsculas) |
| Frase-alvo | 22 px | 30 px | 500 | 1,3 | 0 | Newsreader; Literata no cirílico |

Razão entre degraus de título: 1,27 a 1,29 no celular e 1,4 a 1,54 no desktop.

| Grupo | Valores |
|---|---|
| Espaço | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px (a escala `--s-1` a `--s-10` que já existe) |
| Largura | conteúdo 1200 px; texto corrido 68 caracteres; aula 720 px com coluna lateral de 320 px a partir de 1024 |
| Raio | `site`: cartão 20 px, controle 12 px, pílula 999. `estudo`: cartão 0, controle 2 px |
| Sombra | `site`: `--site-sombra-suave` em cartão e `--site-sombra-alta` em hover e camadas flutuantes (valores do PR #556). `estudo`: nenhuma |
| Movimento | 120 ms (hover, foco), 200 ms (abrir e fechar), 600 ms (entrada de seção), 1.100 ms (traço de progresso); curva `cubic-bezier(.2,.7,.2,1)`; com `prefers-reduced-motion`, tudo vira 0 ms, só opacidade |
| Pontos de quebra | 320, 768, 1024, 1440 px |
| Toque | alvo mínimo 44 × 44 px; campo de formulário 16 px |

**(b) Componentes e estados**

| Componente | Estados obrigatórios |
|---|---|
| Botão (primário, secundário, fantasma) | repouso, hover, foco visível, pressionado, ocupado, desativado |
| Seletor de idioma (pílulas) | repouso, selecionado, foco |
| Cartão de curso | repouso, hover, com nota de cobertura, com selo "2 aulas grátis" |
| Cartão de plano | repouso, recomendado, com seletor de meio de pagamento dentro, ocupado |
| Frase com áudio | parada, tocando, carregando, falha de áudio, sem conexão |
| Exercício | vazio, respondido certo, respondido errado **com a explicação do erro**, revisão |
| Barra de progresso (traço ocre) | 0%, parcial, completa |
| Paywall | visitante, com conta, cobrança indisponível |
| Barra de consentimento | compacta, detalhada |
| Campo de formulário | vazio, foco, erro com mensagem, sucesso |
| Aviso "erro típico de quem fala português" | único estado |
| Trilha e bloco "próximo passo" | único estado |
| Cartão de avaliação | sempre com a fonte e a data; sem avaliação, não renderiza |
| Nota de cobertura | "N de M aulas explicadas em inglês" |
| Estado vazio, erro e conclusão | com o Vuu em 96 px ou mais e uma linha em Caveat |

**(c) Wireframes em texto**

*Home (`.com.br`, celular primeiro)*
1. Cabeçalho fino — marca, menu, "Começar grátis". Objetivo: orientar sem ocupar a dobra.
2. Herói — H1 em até 3 linhas; uma frase de apoio; linha de prova (nota e fonte); botão "Fazer a primeira aula grátis"; pílulas de idioma. Objetivo: dizer o que é, provar e dar o primeiro passo sem rolar.
3. Demonstração — uma frase com áudio que toca de verdade, no idioma escolhido. Objetivo: mostrar o produto em 5 segundos.
4. Gente — foto real de aula e três linhas sobre quem escreve os cursos. Objetivo: responder à desconfiança de ensino online.
5. Idiomas — seis cartões, cada um com a primeira palavra do idioma e "2 aulas grátis". Objetivo: escolher.
6. Com professor — a turma ao vivo com data, vagas e preço. Objetivo: oferecer o produto de maior valor a quem quer acompanhamento.
7. Avaliações reais, com fonte. Objetivo: prova.
8. Planos — três cartões alinhados, o código de fundador, a regra dos 7 dias. Objetivo: preço sem letra miúda.
9. Perguntas — cinco, as que impedem a compra. Objetivo: tirar a última objeção.
10. Fecho com o mesmo botão do herói; rodapé.

Saem da home de hoje: o bloco de três passos do método (vira uma linha no herói) e a seção de livros (vira um cartão dentro de Idiomas). Alvo: de 10.733 px para 6.000 px ou menos em 390 px.

*Página de curso (`/curso/<id>`)*
1. Trilha. 2. H1 com a busca ("Curso de russo online, explicado em português"), prova e botão para a sessão 1. 3. Quatro blocos-pergunta: quanto custa, quanto tempo até B1, tem professor, serve para iniciante. 4. Ementa por nível, com o objetivo de cada aula (já escrito nas 460) e as 2 grátis destacadas. 5. Turma ao vivo do idioma, quando existir. 6. Dúvidas mais procuradas do idioma (links para as páginas de dúvida). 7. Livro do idioma. 8. Planos resumidos e botão.

*Página de aula (`/curso/<id>/dia/<n>`)*
1. Barra fina: curso, aula, sessão, traço de progresso visível. 2. Objetivo da sessão em uma linha. 3. Coluna de 720 px: explicação, frases com áudio, exercícios com correção e explicação do erro. 4. Coluna lateral (a partir de 1024 px): progresso da aula, revisão pendente, atalho para a dúvida relacionada. 5. Conclusão: o que você já consegue, próxima sessão, e — para visitante — "guarde seu progresso".

**(d) Diff contra o sistema atual**

| Sai | Entra | Fica |
|---|---|---|
| `styles.css`, `redesign.css` e `camadas.css` como três folhas | uma folha global sobre `tokens.css` | `tokens.css`, `site-publico.css`, folhas de componente |
| 17 cores de texto | 6 | as 4 cores de marca e seus derivados listados |
| escala por rota | a tabela de degraus acima | Newsreader, Source Sans 3, Literata |
| cartão com borda de 1 px nas páginas de venda | cartão de 20 px com sombra (variante A) | área de estudo com raio 0 e sem sombra |
| seção vazia e "chega em breve" | seção que não renderiza sem dado | — |
| Vuu a 48 px só no herói | Vuu ≥ 96 px em estados vazios, erro e conclusão; Caveat nesses mesmos lugares | um único Vuu |

**(e) Ordem de aplicação e ponto de reversão**

1. Mesclar o #556 (home). Reversão: reverter o commit de squash.
2. Lote 30 (escala e H1 > H2) — só tokens.
3. Lote 29 (toque, campo, texto, linha).
4. Lote 62 (remover regra morta) e só então lote 63 (fundir folhas), num PR único com capturas de 10 rotas em 390 e 1440 px. Reversão: reverter o PR.
5. Lotes 64, 65 e 66.

Nenhum desses passos muda URL, título, metadado ou HTML do servidor; o check paridade-head e o `testar-inventario-seo.ts` rodam em todos. O `validar:design` e o Lighthouse (CLS ≤ 0,1) seguram a regressão.

## §10. DEPENDÊNCIAS DO DONO

| # | Só o Felipe resolve | Destrava | Se ficar sem resposta | Tempo dele |
|---|---|---|---|---|
| 1 | Aprovar os PRs #555, #556 e #557 | lote 1 e a fila inteira | o agente não abre o 4º PR | 5 min |
| 2 | Escolher como o e-mail de contato vai receber (Cloudflare ou trocar o endereço) | lote 2 | contatos continuam voltando | 10 min |
| 3 | Dizer se o repositório fica público (CI grátis, exige tirar o material pago e limpar o histórico) ou privado (um clique, mas a conta gratuita do GitHub limita os minutos de CI) | lotes 20–22 | o produto pago segue baixável | 15 min + a chave no Render |
| 4 | Fazer as três compras e os reembolsos | lote 3 e tudo o que vende | nada pode ser divulgado | 40 min |
| 5 | Decidir a turma de russo: preço, datas, vagas, professor | lote 17 | não existe produto de alto valor | 1 h |
| 6 | Uma regra de merge por escrito no CLAUDE.md: "PR de lote sem risco médio ou alto, com CI verde, o agente mescla" — ou o contrário | velocidade de todas as ondas | cada lote espera um clique; a fila enche em 3 PRs | 5 min |
| 7 | Autorizar a escrita em DNS para o envio de e-mail | lotes 33–35, 68, 82 | sem sequência, sem retomada | 20 min |
| 8 | Gravar: 8 vídeos e 1 aula aberta por mês, com os professores | lotes 37, 39, 41, 88 | o canal com demanda medida fica vazio | 6 h por mês |
| 9 | Vender: 100 contatos com professores e escolas | lote 50 | a linha de R$ 319 mil não existe | 2 h por semana |
| 10 | Decidir preço por assento, parcelamento do anual e se o livro inteiro vai para a Amazon | lotes 12, 48, 67 | três linhas de receita paradas | 30 min |

## §11. ASSUNÇÕES

| # | O que assumi | Se for o dobro | Se for a metade |
|---|---|---|---|
| `H1` | Turma ao vivo de 12 semanas a R$ 1.497, com 9 alunos em média | menos turmas fecham a meta (20) | 40 turmas rendem R$ 270 mil; a linha de professores passa a ser a principal |
| `H2` | Professor paga R$ 59 por assento por mês, 15 assentos, 6 meses | 30 professores bastam | precisa de 120; priorizar escolas em vez de particulares |
| `H3` | Aula aberta converte inscrito em aluno de turma | uma aula por mês enche a turma | duas aulas abertas por turma |
| `H4` | Teste de nível traz busca e contato | sobe na fila para a onda 1 | vira só ferramenta interna |
| `H5` | E-book a R$ 39,90 e vitrines somando R$ 80 mil | — | efeito pequeno: as vitrines valem mais pela prova social |
| `H6` | Plantão semanal sustenta o preço de R$ 139 | — | se não mudar a conversão em 60 dias, testar preço menor no mensal |
| `H7` | 300 assinantes ativos em dez/2027 | assinatura passa a 30% da meta | a meta depende ainda mais de turma e professores |
| `H8` | O Felipe dispõe de 10 horas por semana para vender e gravar | ondas 1 a 3 andam no prazo | dobrar o prazo das ondas 1 a 3 e cortar o lote 88 |
| `H9` | Há pelo menos 3 professores além do Felipe para dar turma | — | teto de 12 a 15 turmas em 2027 |
| `H10` | Orçamento de mídia e ferramentas: R$ 0 até a primeira turma; depois, 30% do caixa da turma | — | — |

Os sete campos `⟨PREENCHER⟩` do prompt ficaram assim: impressões e cliques — medidos (236/10 e 10/0); sessões por mês — **sem dado** (lote 5 resolve); checkout homologado — **não** (lote 3); horas do dono — `H8`; orçamento — `H10`; outra pessoa para conteúdo — Luísa e professores, capacidade `H9`; usuários reais em 30 dias — **sem dado** (lote 4 resolve).

Três fatos dos documentos que **precisam de verificação** antes de serem citados: (1) "3.680 sessões" no DECISAO-INDEXACAO contra 1.840 no mapa do site — parece contagem dobrada pelos dois domínios; (2) a home do `.com.br` no índice ou fora dele (lote 14); (3) "Workspace verificado" para `contato@linvuu.com` contra o MX nulo medido hoje (lote 2).

## §12. AUTO-VERIFICAÇÃO

- [x] 100 lotes numerados de 1 a 100, sem buraco e sem título repetido (conferido por `gen.py`).
- [x] Contagem por área: 5 + 11 + 2 + 4 + 8 + 8 + 6 + 6 + 3 + 10 + 7 + 15 + 4 + 11 = **100**.
- [x] Lotes ligados a motor de receita: **76** (assinatura 25, editorial 19, turma 8, B2B 7, todos 7, Play 5, pago 2, marketplace 2, anual 1); higiene: 24.
- [x] Descoberta e SEO (áreas 1, 2 e 3): **18**. Pedagogia e áudio (7 e 8): **12**.
- [x] Medição e funil: **7**, incluindo heatmap com nome (Microsoft Clarity), preço (R$ 0) e base legal (consentimento, LGPD art. 7º, I) — lote 97.
- [x] Todo DOD é comando, URL, contagem ou número; todo lote tem evidência ou hipótese marcada.
- [x] Os 10 primeiros cabem em 14 dias (§7).
- [x] 10 recusas e 6 coisas a parar (§8).
- [x] Régua com número nas 14 áreas (§3).
- [x] Redesenho com tokens, componentes, wireframes, diff e ordem (§9).
- [x] Nenhum "está bom", "ok", "já passa" ou "razoável" como veredito.
- [x] Nenhuma promessa comercial; todo número de negócio novo está marcado `H n` ou "alvo".
- [ ] **Não verificado por mim:** os preços e limites de terceiros citados (Resend, taxas de parcelamento da Stripe, regras da Udemy, da Amazon e do Google Play). Cada lote que depende deles manda conferir na fonte antes de implementar.
