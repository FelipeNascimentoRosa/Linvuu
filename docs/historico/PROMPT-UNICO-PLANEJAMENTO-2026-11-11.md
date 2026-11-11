# Prompt único de planejamento máximo — Linvuu (11/11/2026)

> **Arquivado em 11/11/2026 (lote 99).** Substituído por [`docs/plano/`](../plano/EXECUTAR.md) — o único plano em vigor. Mantido só como registro histórico; não execute a partir daqui.

**Para que serve:** uma só sessão de um modelo de raciocínio forte (o "melhor cérebro" disponível, usado **uma vez**) para produzir o mapa completo do site, a régua do impecável e a fila de 100 lotes de execução — que depois é executada por Cline + Sonnet 5.5, lote por lote.

**Por que existe:** um one-shot falha por três motivos, sempre os mesmos — (1) o modelo não vê o site e inventa; (2) o padrão "está bom" deixa passar o medíocre; (3) o pedido sem formato vira ensaio e trava. Este arquivo remove os três: entrega a verdade medida, define impecável em números e impõe um esqueleto de saída com contagem verificável.

**Como usar:** copie **do começo do bloco até o fim do arquivo** e cole numa única mensagem. Não acrescente nada antes nem depois. Se o modelo pedir arquivos, a resposta é: "está no dossiê, seção 2; prossiga com assunção numerada".

**O que preencher antes (opcional, 3 minutos, melhora muito):** os sete campos marcados `⟨PREENCHER⟩` nas seções 2.4 e 2.6. Se não preencher, o modelo assume valores e lista as assunções — e você confere depois.

---

## BLOCO ÚNICO — copie daqui até o fim do arquivo

Você é o responsável técnico e de produto de um site de idiomas chamado **Linvuu**. Sua tarefa nesta única resposta é produzir o **plano completo de correção e evolução** desse site até o padrão "impecável", com **100 lotes de ação executáveis**, ordem de execução e um redesenho especificado. Não haverá segunda rodada: o que você não entregar agora não será entregue. Trabalhe como se o dinheiro e o tempo do dono fossem seus.

### 1. O padrão exigido (leia duas vezes)

1.1. **"Está bom", "está ok", "já passa", "aceitável", "razoável" são respostas proibidas.** Se você escrever qualquer uma delas como veredito, você falhou na tarefa. O padrão é: *o que existe hoje não é referência; a referência é o melhor site de idiomas do mundo e, depois dele, um passo além.*

1.2. **"Impecável" não é adjetivo, é número.** Na seção 5 você recebe a régua medida por domínio. Seu primeiro trabalho é **endurecê-la** onde estiver frouxa, dizendo o número que você adotaria e por quê. Toda meta no seu plano precisa de número, unidade e forma de medir.

1.3. **Não subestime por medo, por educação nem por hierarquia.** Se a arquitetura de rotas está errada, diga. Se o design é genérico, diga onde e por quê. Se o produto não vende porque a promessa é fraca, diga. Se uma decisão registrada no dossiê está errada, **discorde com evidência** — está explicitamente permitido contradizer o dono. O que não está permitido é elogiar para agradar.

1.4. **Você tem autonomia total** para propor mudança de: design, sistema de design, UX, UI, arquitetura de informação, hierarquia de páginas, copy, preços **como hipótese** (não como fato), pedagogia, áudio, medição, marketing, performance e infraestrutura. As únicas coisas que você não pode: (a) inventar fato sobre o negócio; (b) propor algo que quebre as restrições da seção 4 sem dizer que quebra e quanto custa resolver.

### 2. Verdade medida (trate como chão, não como opinião)

Tudo abaixo foi medido no repositório e nos documentos do projeto em 11/11/2026. Onde houver `⟨PREENCHER⟩`, o dado não existe e você deve assumir (ver 2.7).

#### 2.1. Produto e stack
- Plataforma de ensino de idiomas com a gramática explicada na língua do aluno; dois domínios: **linvuu.com.br** (interface em português) e **linvuu.com** (interface em inglês, raiz em inglês; o site em espanhol foi retirado em 06/11/2026). Regra: **um só idioma de interface por domínio**; a gramática é explicada na língua nativa do aluno.
- Dois públicos, um por domínio: no `.com.br`, quem fala português estuda **inglês, espanhol, alemão, francês, italiano e russo** com explicação em português; no `.com`, quem lê em inglês estuda **português do Brasil, francês e russo** explicados em inglês (espanhol, alemão e italiano aparecem com tradução parcial). O curso `br` (português para estrangeiros) **não existe** no `.com.br`: `/portugues`, `/curso/br` e `/gramatica/br` respondem **301** para o `.com` — medido em 11/11/2026.
- Stack: React 19.3 + Vite 8.3 + TypeScript 7.0 no cliente; Express 5.3 no servidor (SSR de `<head>` e API); Firebase 13.2 (cliente) e firebase-admin 14.5; Stripe 23.1; Capacitor 8.6 + RevenueCat 14.1 para APK Android; Node ≥ 22; deploy na Render; 10 workflows de GitHub Actions.
- Scripts npm relevantes: `build`, `build:website`, `lint` (tsc), `content:check`, `testar:dominio`, `testar:seguranca`, `testar:progresso`, `testar:medicao`, `testar:avaliacoes`, `validar:design`, `medir:baseline`, `medir:ingles`, `testar:plataformas`, `testar:regras` (emulador Firestore), `mapa:site`.
- Governança: 98 entradas em `docs/`, 155 arquivos em `scripts/`, **44 itens estacionados** em `PENDENCIAS.md`, fila máxima de 3 PRs abertos + 3 rascunhos, commit atômico por ação, verificação obrigatória por tipo de mudança.

#### 2.2. Superfície (rotas)
24 rotas reais + `*` (404) = **25 entradas `<Route>`** no `App.tsx`; 7 delas existem só no site — no APK, `Portugues`, `Sobre`, `AulasRusso`, `PorQue`, `Contato`, `ExAlunosUdemy` e `ExcluirConta` viram componente vazio (`vite.config.ts:97`). `/`, `/cursos`, `/portugues`, `/brazilian-portuguese`, `/curso/:id`, `/curso/:id/dia/:n`, `/entrar`, `/cadastro`, `/gramatica`, `/gramatica/:id`, `/livro/gramatica-ru`, `/livros`, `/livros/:id`, `/livros/:id/capitulo/:n`, `/russo-online`, `/sobre`, `/por-que-linvuu`, `/contato`, `/ex-alunos-udemy`, `/assinatura`, `/conta`, `/privacidade`, `/termos`, `/excluir-conta`, `*` (404). São **20 páginas** e **29 componentes** de interface em `.tsx` (22 e 35 arquivos, contando `.ts` e `.css`).

#### 2.3. Conteúdo (o ativo e a lacuna)
- **7 cursos**: br (português para estrangeiros), de, en, es, fr, it, ru. Total **460 aulas · 1.840 dias-fonte**; **684 dias traduzidos para inglês** (en 62 aulas/248 dias; es 62/248 com 120 em inglês; ru 78/312 com 312 em inglês; de 72/288 com **4** em inglês; fr 62/248 com 248; it 62/248; br 62/248).
- **3.680 sessões** publicadas: 3.568 pagas marcadas `noindex` e 112 gratuitas (2 aulas grátis por curso, 8 sessões).
- **Gramática**: 7 arquivos-fonte (um por curso) + **3 traduções em inglês** (es, fr, ru). Consequência assumida: `de`, `en` e `it` **não** têm gramática em inglês, e por isso as 7 rotas `/curso/{de,en,it}` e `/gramatica/{de,en,it}` do `.com` respondem 200 com `noindex` — decisão registrada, destravada só por conteúdo traduzido.
- **Áudio**: três camadas, medidas no clone de 11/11/2026. Camada gratuita (`public/audio`): **5.509 mp3** — `es/` 906, `it/` 556, `v2/` 4.046 (plano, sem subpasta por idioma) e `de/` 1. Camada paga no motor antigo (Edge TTS, `server/audio-privado`): **4.199** — es 1.429, it 1.440, en 535, de 495, fr 300. Camada paga no motor novo (`server/audio-privado-v2`): **6.834** — br 1.806, de 1.374, en 1.330, ru 1.326, fr 998. Total no repositório: **16.542 mp3**. O buraco real **não** é “espanhol e italiano sem áudio”: eles têm 2.335 e 1.996 arquivos somando as camadas; o buraco é que **es e it não têm versão de motor novo (v2)** — só o motor antigo, e o Edge TTS não é API oficial, de modo que o uso comercial não tem contrato (`docs/AUDIO.md`).
- **Livros**: 6 idiomas × (cap-01, cap-02, sumário) = **12 capítulos no total**. B1–C2 existem como protótipo e seguem sujeitos a revisão antes de publicar.
- **Ativo pago exposto — trate como restrição, não como detalhe**: o repositório é **público** e versiona o áudio pago — `server/audio-privado` (4.199 arquivos) + `server/audio-privado-v2` (6.840) = **11.039 arquivos, ~209 MB** — e `content/livros-privado` (**151 arquivos** de capítulo pago). O `.gitignore` só barra arquivo novo: o que já está no histórico continua clonável. A limpeza é o **passo 4** de `docs/AUDIO-PRIVADO.md` (`git filter-repo` + force push, autorizado pelo dono em 09/11/2026, pendente, com aviso obrigatório a todo clone). Consequência para o plano: **sigilo não é o que protege a receita hoje**; qualquer lote que dependa de áudio ou PDF não circular precisa declarar isso.
- **Marca**: um único mascote, o **Vuu** (capuz, mão no queixo; `public/assets/vuu/vuu.svg`), decisão de 08/11/2026.

#### 2.4. SEO e descoberta (estado medido)
- Sitemaps: **39 URLs** no `.com.br` e **15** no `.com` (**54** no total, com `hreflang` cruzado entre domínios). As 3.568 sessões saíram do mapa em 11/11/2026 e passaram a `noindex` (decisão em `docs/DECISAO-INDEXACAO-2026-11-11.md`).
- As **páginas de dúvida** — único formato de conteúdo com demanda de busca real — **ainda não existem publicadas** (estratégia escrita em `docs/ESTRATEGIA-PAGINAS-DE-DUVIDA.md`).
- Título e descrição são servidos no HTML (prerender sem JavaScript), com canonical e `hreflang`. Régua ativa: título 30–60 caracteres, descrição 120–160, verificada em 62 títulos e 62 descrições nos dois domínios.
- Existe check de CI de **paridade de `<head>`** (HTML do servidor vs. DOM renderizado) em todas as URLs do sitemap: passa em 48 URLs + 6 navegações no `.com.br` e 23 + 5 no `.com`. Uma URL que o navegador abandona (redirect no cliente) **quebra** o check — foi assim que se descobriu que `/gramatica` é apenas um alias para `/gramatica/<primeiro idioma>`.
- `robots.txt` permite tudo, bloqueia `/api/` e `/admin/` e declara o sitemap; existem `llms.txt` e `llms-global.txt`.
- Google Search Console, medido em 10/11/2026: a consulta "russian classes near me" apareceu com 120 impressões, posição 10,5 e **0 cliques**; `/curso/ru` e `/russo-online` estavam "Discovered – currently not indexed"; o sitemap do `.com` marcava 35 enviadas / 0 indexadas.
- ⟨PREENCHER⟩ impressões e cliques totais dos últimos 28 dias, por domínio.

#### 2.5. Medição, performance e design
- **PostHog** com consentimento próprio (`linvuu:analytics:v1`), **sem** heatmap, sem gravação, sem autocapture. O código tipa **10 eventos** e **os 10 têm ponto de disparo no código** (conferido em 11/11/2026: `page_viewed`, `course_viewed`, `lesson_started`, `practice_completed`, `lesson_completed`, `view_pricing`, `select_plan`, `checkout_started`, `checkout_returned`, `signup_completed`); o que **não** está provado é que eles **cheguem** ao PostHog com consentimento — não existe sessão medida nem funil com dado real, e `PAINEL.md` ainda diz “eventos de analytics: 0”. Não confunda “instrumentado no código” com “medido”. **Clarity** já instalado (projeto `z9md9l7788`, mascaramento estrito, só após consentimento) — mas **não há registro de que os dados sejam lidos e usados em decisão**, o que na prática equivale a não ter heatmap. Medição própria (`linvuu:medicao:v1`), Meta Pixel e TikTok Pixel. **A conversão visita → pagante nunca foi medida**: zero vendas verificadas e nenhum painel de funil com dados reais.
- **Lighthouse CI**: 5 URLs × 3 rodadas. Pisos atuais: performance ≥ 0,75 (erro), SEO ≥ 0,90 (erro), acessibilidade ≥ 0,90 (**apenas aviso**), CLS ≤ 0,1 (erro).
- **Sistema de design atual**: 4 cores (verde floresta `#1E3B2F`, papel `#F5F1E8`, grafite `#1D1F1C`, ocre `#B7791F`), Newsreader nos títulos + Source Sans 3 no corpo, elemento de assinatura = barra de progresso desenhada à mão em ocre. Proibido: gradiente roxo/azul, ilustração 3D, Corporate Memphis, bandeiras, símbolos turísticos, fontes de sistema, "cara de template de IA". Tom de voz: confiante, culto, direto; proibido afirmar o que o produto não entrega ("professores nativos", "oficial", "garantido").

#### 2.6. Negócio (o que a receita exige)
- Meta: **R$ 1.100.000 de receita acumulada até 31/12/2027** (14 meses) — exige ~**1.100 alunos pagantes** adquiridos, ~80/mês de média, chegando a ~160/mês em dez/2027. **Zero vendas verificadas** até hoje.
- Preços definidos: mensal **R$ 139**, trimestral **R$ 417** (R$ 291,90 no Pix), anual **R$ 999**, fundadores **R$ 69,50/mês** (302 resgates até 30/01/2027).
- Cinco motores, com peso de caixa até 2027: **B2B/turmas** (~38% da meta; 35 turmas de 20 alunos a R$ 12 mil), **anual antecipado** (alavanca de caixa), **SEO editorial** (25–30%, exige 200+ páginas de dúvida indexadas a partir de agora), **tráfego pago** (só com CAC < R$ 150), **APK no Play** (~15%, exige backend de compras).
- Base herdada: 302 códigos FUNDADORES da Udemy; se 10% converterem, ~R$ 2 mil/mês.
- ⟨PREENCHER⟩ sessões/mês atuais por domínio · ⟨PREENCHER⟩ checkout homologado com compra real aprovada? (sim/não/parcial) · ⟨PREENCHER⟩ horas de trabalho por semana do dono · ⟨PREENCHER⟩ orçamento mensal para mídia e ferramentas · ⟨PREENCHER⟩ existe outra pessoa para escrever e revisar conteúdo? · ⟨PREENCHER⟩ quantos usuários reais usaram o site nos últimos 30 dias.

#### 2.7. Regra para dado faltante
Se faltar um dado, **não pare e não pergunte antes de entregar**. Use a marca `ASSUNÇÃO n` (numerada), escreva o valor que você adotou e diga em uma linha o que muda no plano se o valor real for o dobro ou a metade. Ao final, liste todas em bloco próprio.

### 3. O que é livre e o que está travado

3.1. **Livre — proponha mudança sem pedir licença:** sistema de design (cores dentro da paleta ou paleta nova justificada), escala tipográfica, grid, espaçamento, componentes, microinterações, estados vazios/erro/carregamento, home, página de curso, página de aula, paywall, cadastro, conta, livros, gramática, rodapé, header, navegação inferior mobile, ordem das seções, arquitetura de informação, copy de toda página, preço **como hipótese a testar**, formato e duração da aula, ordem pedagógica, sistema de áudio, eventos de medição, táticas de marketing, e a própria especificação visual (tokens, wireframe textual por template).

3.2. **Travado por decisão registrada — pode discordar, mas precisa argumentar com número e dizer o custo:**
- Um idioma de interface por domínio (`.com.br` em português, `.com` em inglês). Não existe troca de idioma de interface dentro do mesmo domínio.
- Contrato de URL: as 25 rotas existem, são indexáveis ou `noindex` por decisão, e o check de paridade de `<head>` bloqueia merge. Renomear rota destrói indexação — se você propuser, precisa de plano de 301 + período de observação.
- As 3.568 sessões pagas continuam `noindex`; 112 gratuitas continuam indexáveis (funil de aquisição).
- Um único Vuu, o atual (`public/assets/vuu/vuu.svg`). Versões antigas estão descartadas.
- Acentuação e grafia seguem o padrão do projeto: português do Brasil, com acentos completos; nada de texto "sem acento para economizar".
- Licença: só repositório com licença permissiva (MIT/Apache-2.0/BSD) entra; Remotion não pode ser usado por empresa com 4+ pessoas; vídeo em código só com HyperFrames (Apache-2.0).
- Nada de escrita em produção (Render, Firestore, Stripe, Search Console, Cloudflare, DNS) sem ordem explícita do dono em mensagem.

3.3. **Travado de verdade — não se negocia em nenhuma hipótese:** não inventar depoimento, aluno, número, prêmio, parceria ou certificação; não prometer "professores nativos", "oficial", "garantido", "fluência em X meses"; não publicar dado pessoal; não alterar plano, cobrança, permissão ou infraestrutura para "fazer o teste passar"; não copiar texto de terceiro sem licença.

### 4. Restrições que vêm do negócio (não são preferências)

4.1. A meta é **receita**, não elegância: R$ 1,1 milhão até 31/12/2027 com **zero vendas verificadas hoje**. Todo lote precisa responder a uma pergunta: *qual dos cinco motores isto move, e quanto?* Se não move nenhum, diga que é higiene e classifique como tal — não disfarce de estratégia.

4.2. O gargalo medido não é conteúdo (460 aulas, 1.840 dias) nem código. É: **tráfego qualificado** (0 páginas de dúvida publicadas), **confiança para pagar** (nenhuma venda verificada, funil não instrumentado) e **caixa** (B2B inexistente como processo).

4.3. O dono é uma pessoa, com horas limitadas e apoio de agentes de IA para código. Um plano que exige equipe de 5 não é um plano; é uma lista de desejos. Se um lote exigir terceiro (revisor nativo, designer, professor), diga que exige e quanto custa.

4.4. O site já tem histórico público e auditorias anteriores: mudanças grandes em rotas, domínio ou conteúdo publicado precisam de plano de transição, não de "refaz do zero".

### 5. A régua do impecável (endureça onde estiver frouxa)

Instrução: os números abaixo são o **piso** que eu adoto hoje. Na sua resposta, **reescreva esta régua na sua versão mais dura**, apontando onde o piso é covarde e por quê. Meta sem número e sem forma de medir é meta inexistente.

**5.1. SEO técnico e descoberta.** 100% das URLs do sitemap com título de 30–60 e descrição de 120–160 caracteres *no HTML do servidor*; 0 divergência na paridade de `<head>`; 0 erro de cobertura no Search Console nas 10 URLs prioritárias; 1 único H1 por página; dados estruturados válidos (Organization, Course, BreadcrumbList, FAQPage, Article) sem erro no validador; TTFB ≤ 0,8 s; HTML inicial ≤ 100 KB; todo `noindex` justificado por escrito.

**5.2. Conteúdo editorial (o motor que falta).** ≥ 200 páginas de dúvida indexadas em 6 meses, cada uma com demanda verificada, resposta direta nas primeiras 40 palavras, 800–1.400 palavras, 1 CTA contextual e 0 texto raso; CTR ≥ 80% do esperado para a posição média; 0 página publicada sem intenção de busca.

**5.3. Estrutura e arquitetura de informação.** Toda página indexável a ≤ 3 cliques da home; 0 link órfão; breadcrumb visível; 100% das páginas com um "próximo passo" explícito; nenhuma rota ambígua ou alias sem aviso ao buscador.

**5.4. Performance.** LCP ≤ 2,0 s e INP ≤ 200 ms no p75 mobile; CLS ≤ 0,05; JS inicial ≤ 120 KB gzip; Lighthouse performance ≥ 95 em mobile nas 5 URLs auditadas; imagens em AVIF/WebP com largura e altura declaradas; 0 requisição bloqueante desnecessária.

**5.5. Design visual e sistema.** Um sistema de tokens único (cor, tipografia, espaço, raio, sombra, movimento) consumido por 100% dos componentes — **0 valor hexadecimal solto**; escala tipográfica de 6–8 degraus com razão ≥ 1,25; 4 breakpoints verificados (320, 768, 1024, 1440); o elemento de assinatura presente em todas as telas-chave; contraste AA em 100% do texto; nenhuma tela que poderia pertencer a qualquer outro site.

**5.6. UX/UI e acessibilidade.** 5 tarefas-chave com sucesso ≥ 90% em teste com 5 pessoas; todos os estados desenhados (vazio, erro, carregando, offline, sem permissão); alvos ≥ 44 px; foco visível; navegação completa por teclado; `prefers-reduced-motion` respeitado; 0 scroll horizontal a 320 px; nenhum beco sem saída; 0 campo redundante em formulário.

**5.7. Pedagogia.** Cada aula declara objetivo observável ("ao fim você faz X"); 4 sessões de 30 min; 100% das frases com áudio; prática com correção automática **e explicação do erro**; revisão espaçada com data de retorno calculada; teste de progresso por nível; mapa declarado para o CEFR; 0 exercício ambíguo em amostra de 30.

**5.8. Áudio.** Cobertura de 100% das sessões publicadas em **todos** os cursos (hoje espanhol e italiano têm 3 arquivos cada); manifesto íntegro (0 órfão, 0 faltante, verificado em CI); primeiro áudio em ≤ 1 s no p95; voz coerente por curso; custo por 1.000 frases registrado e comparado entre fornecedores antes de escalar.

**5.9. Livros, apostilas e certificado.** Todos os cursos com A1 completo (hoje 2 capítulos por idioma); cada capítulo com 1 objetivo, 1 tabela de gramática, exercícios e áudio; PDF gerado do mesmo conteúdo (fonte única, sem retrabalho); certificado emitido só com dados verificáveis e aviso legal explícito.

**5.10. Conversão e checkout.** Funil instrumentado em 6 passos (visita → curso → aula grátis → cadastro → aula 8 → checkout → pagamento pago); 0 passo sem evento; compra real aprovada **e** reembolso testado nos dois domínios; conversão medida semanalmente por domínio, origem e dispositivo; paywall com 2 ofertas comparáveis; 0 promessa sem prova ao lado do botão de pagar.

**5.11. Medição, funil e heatmap.** Painel diário com 6 números (visitas, cadastros, aula 1 concluída, aula 8, checkouts, pagantes); Clarity **usado de verdade** (já instalado) com 3 perguntas de pesquisa por período e 5 gravações assistidas por semana; 0 métrica sem definição escrita; 0 mistura entre tráfego de teste e real.

**5.12. Marketing e aquisição.** Um canal orgânico por vez até provar retorno; 30 peças/mês com CTA rastreável e link único por canal; B2B com proposta, preço e contrato prontos (é 38% da meta); tráfego pago só com CAC ≤ R$ 150 e LTV/CAC ≥ 3 declarado; 0 anúncio antes de checkout homologado.

**5.13. Confiança, legal e suporte.** Preço e política sem letra miúda; exclusão de conta funcional (exigência do Google Play); contato com SLA de 1 dia útil; prova social real ou ausência declarada — nunca inventada; 0 texto que prometa o que o produto não entrega.

**5.14. Engenharia, CI e app.** 100% dos checks aplicáveis verdes; 0 erro de TypeScript; 0 segredo no repositório; backup testado e datado; error boundary em toda rota; monitoramento de disponibilidade; build do APK reprodutível e assinado; toda mudança com comando de verificação que prova o resultado.

### 6. Cobertura obrigatória: 14 áreas, e o que você precisa provar em cada uma

Você não pode pular nenhuma. Para cada área, prove que olhou com (a) o sintoma medido, (b) a causa raiz, (c) o custo de não corrigir. Área sem lote correspondente = cobertura falhada.

| # | Área | O que provar |
|---|---|---|
| 1 | Descoberta e SEO técnico | indexação, sitemap, canonical, hreflang, `noindex`, paridade de `<head>`, dados estruturados, robots, llms.txt |
| 2 | SEO de conteúdo | demanda de busca real, páginas de dúvida, canibalização, intenção, título/descrição, CTR, plano de 200 páginas |
| 3 | Estrutura e arquitetura de informação | as 25 rotas, hierarquia, cliques até a home, órfãos, o que sobra e o que falta |
| 4 | Performance | LCP/INP/CLS, peso de JS, imagens, fontes, cache, servidor Express, custo de áudio sob demanda |
| 5 | Design visual | tokens, escala, grid, assinatura da marca, o que parece template e por quê |
| 6 | UX/UI e mobile | os 6 caminhos reais do usuário (descobrir, experimentar, cadastrar, estudar, pagar, cancelar), estados, acessibilidade |
| 7 | Pedagogia e produto | progressão, prática, correção, revisão espaçada, prova de aprendizado, CEFR, retenção |
| 8 | Áudio | cobertura (es/it quase zero), geração, custo, qualidade, entrega, cache, acessibilidade |
| 9 | Livros, apostilas e certificado | profundidade de 12 capítulos, geração de PDF, certificado, uso comercial |
| 10 | Conversão e checkout | paywall, ofertas, fricção no cadastro, Stripe, Pix, reembolso, prova de confiança |
| 11 | Medição, funil e heatmap | PostHog, Clarity, medição própria, pixéis, painel, definições, consentimento |
| 12 | Marketing e aquisição | orgânico, social, B2B, Play, e-mail, parcerias, CAC, mensagem por canal |
| 13 | Confiança, legal e suporte | preço, termos, privacidade, exclusão de conta, contato, SLA, promessas |
| 14 | Engenharia, CI e app Android | testes, checks, segredos, backup, erros, APK, observabilidade, dívida técnica |

### 7. Formato de saída (obrigatório, nesta ordem, sem introdução)

Escreva exatamente estas 12 seções, com estes títulos. **Sem preâmbulo, sem repetir o enunciado, sem elogio, sem resumo final.** Convenção: **"dossiê"** = seção 2 deste briefing; **"§"** = seções da *sua* resposta.

**§1. VEREDITO.** Uma tabela com as 14 áreas: nota de 0 a 10, e a frase mais dura que você pode dizer sobre ela. Depois, 3 linhas: qual é o maior problema do site, qual é o mais caro, qual é o mais fácil.

**§2. ONDE O DINHEIRO VAZA.** Até 10 linhas, ordenadas por reais perdidos ou por meses de atraso. Se não der para estimar em reais, ordene por travessão de conversão.

**§3. RÉGUA REVISADA.** Tabela: área | piso que você adota | como medir | onde o piso atual é covarde. Endureça, não afrouxe.

**§4. DIAGNÓSTICO POR ÁREA.** Uma tabela por área (14 no total), com 3 a 8 linhas cada: sintoma medido | causa raiz | consequência | evidência (arquivo, rota ou número da seção 2).

**§5. OS 100 LOTES.** Uma tabela única, 100 linhas, colunas exatamente estas: `nº | lote | área | evidência | ação | DOD (como provar) | esforço S/M/L | motor de receita | depende de | risco`.
- `lote` = no máximo 70 caracteres, começando por verbo no imperativo.
- `evidência` = arquivo, rota, medição da seção 2 ou `H n` (hipótese declarada).
- `DOD` = o comando, a URL ou o número que prova que está pronto. **Nunca** "melhorar", "revisar", "otimizar" sozinhos.
- `motor` = B2B, anual, editorial, pago, Play — ou `higiene`.
- `esforço`: S ≤ 1 dia, M ≤ 3 dias, L > 3 dias (se L, você deve quebrar em mais de um lote).

**§6. ORDEM DE EXECUÇÃO.** Cinco ondas (0–14 dias, 15–30, 31–60, 61–90, 91–180). Em cada onda: quais números de lote entram, o que roda em paralelo, o que é pré-requisito de quê, e o resultado verificável ao fim da onda.

**§7. OS DEZ PRIMEIROS.** Os 10 lotes que você executaria antes de qualquer outro, em ordem, cada um com: dia estimado, arquivo ou URL tocada, e a frase "isto destrava X".

**§8. O QUE EU RECUSO.** Mínimo 8 itens: ideias óbvias para "site de idiomas" que você **não** recomendaria aqui, e por quê. Depois, mínimo 5 itens: coisas que o dono deveria **parar de fazer** hoje.

**§9. REDESENHO ESPECIFICADO.** Não descreva "um design moderno". Entregue: (a) tokens completos em tabela (cor com hex e uso, tipografia com tamanho/peso/entrelinha/tracking por degrau, espaço em escala, raio, sombra, movimento com duração e curva); (b) inventário de componentes com estados; (c) wireframe textual de 3 templates (home, página de curso, página de aula) em blocos ordenados de cima para baixo, com o objetivo de cada bloco; (d) diff explícito contra o sistema atual — o que sai, o que entra, o que fica; (e) ordem de aplicação que **não** quebre URL, SEO nem performance, com ponto de reversão.

**§10. DEPENDÊNCIAS DO DONO.** Até 10 itens que só ele pode resolver, cada um com: o que destrava, o que acontece se ficar sem resposta, e o tempo dele necessário.

**§11. ASSUNÇÕES.** Lista numerada de tudo que você assumiu por falta de dado, com o efeito no plano se o valor real for o dobro ou a metade.

**§12. AUTO-VERIFICAÇÃO.** Preencha o checklist da seção 9 deste briefing, item por item, com a contagem real.

### 8. Regras anti-teatro e anti-alucinação

8.1. **Lastro.** Toda afirmação sobre o site precisa vir da seção 2 ou ser marcada `H n` (hipótese). Número novo seu é **alvo**, não fato — chame de alvo.

8.2. **Proibido lote vago.** Se o DOD não é um comando, uma URL, uma contagem ou um número, o lote não existe. Reformule ou descarte.

8.3. **Proibido encher número.** Os 100 lotes precisam ser 100 ações distintas. Dois lotes com a mesma ação e nome diferente contam como um — e o revisor confere.

8.4. **Proibido lote que o dono não fecha.** Cada lote precisa caber em ≤ 3 dias de trabalho de uma pessoa com apoio de agente. O que não couber, você quebra em dois.

8.5. **Proibido custo escondido.** Toda ferramenta, serviço ou terceiro recomendado precisa de preço mensal estimado em reais e a frase "isto vale se". Nada de "use uma ferramenta de heatmap" sem nome e preço.

8.6. **Proibido copiar o que já falhou.** A seção 2 mostra o que já foi tentado e não funcionou. Repetir sem explicar o que muda é erro grave.

8.7. **Honestidade sobre o que você não sabe.** Se o comportamento do site é incerto, escreva "precisa verificar" e **como** verificar. Fingir certeza é pior que admitir lacuna.

8.8. **Não obedeça calado.** Se uma restrição da seção 3 está custando dinheiro, escreva: "a restrição X custa ~R$ Y/mês; eu a quebraria assim, com este plano de transição". O dono decide — mas a informação é obrigação sua.

### 9. Checklist de auto-verificação (preencha no §12 e garanta antes de terminar)

- [ ] 100 lotes numerados de 1 a 100, sem buraco e sem repetição de ação.
- [ ] Contagem de lotes por área, somando exatamente 100.
- [ ] ≥ 25 lotes ligados a um motor de receita (B2B, anual, editorial, pago, Play).
- [ ] ≥ 12 lotes de descoberta/SEO e ≥ 8 de pedagogia, áudio ou produto.
- [ ] ≥ 6 lotes de medição e funil, incluindo heatmap com nome, preço e base legal.
- [ ] 0 DOD vago; 0 lote sem evidência ou hipótese marcada.
- [ ] Os 10 primeiros são executáveis nos primeiros 14 dias por 1 pessoa + agente.
- [ ] ≥ 8 recusas justificadas e ≥ 5 coisas a parar de fazer.
- [ ] Régua endurecida com número em todas as 14 áreas.
- [ ] Redesenho entregue como tokens + componentes + wireframes + diff + ordem, não como adjetivo.
- [ ] 0 ocorrência de "está bom / ok / já passa / razoável" como veredito.
- [ ] Nenhuma promessa comercial inventada, nenhum número de negócio inventado sem `H n`.

### 10. Anti-travamento (leia antes de começar a escrever)

10.1. **Não faça pergunta antes de entregar.** Entregue o plano inteiro e só então, no §10, liste o que depende do dono.

10.2. **Se o texto ameaçar não caber**, corte nesta ordem: §4 (diagnóstico) → §9 (redesenho, reduza a tokens + 1 wireframe) → §2. **Nunca** corte §5 nem §7. Se ainda assim faltar, escreva `CORTADO: <o que ficou de fora>` no fim — nunca entregue 60 lotes chamando de 100.

10.3. **Comece a responder pela tabela do §5**, se preferir garantir o essencial primeiro; depois volte e escreva §1 a §4. A ordem final da resposta continua sendo a da seção 7.

10.4. **Não repita o que o briefing já diz**, não resuma o briefing, não escreva introdução nem conclusão motivacional. Densidade, não cerimônia.

10.5. **Uma única resposta.** Se você tiver limite de tamanho, prefira tabelas compactas a parágrafos. Cada linha de lote deve caber em uma linha de tabela.

---

## FIM DO BLOCO — daqui para baixo é só nota para o dono, não cole

### Por que esse formato (o que eu faria, e fiz)

1. **Ficha antes de opinião.** A seção 2 existe porque o modelo não pode ver o site. Sem ela, todo diagnóstico é teatro plausível. Ela é o único pedaço do arquivo que vale reescrever a cada 30 dias.

2. **Régua numérica antes de plano.** "Impecável" é a palavra mais inútil do vocabulário de produto. Os 14 pisos da seção 5 transformam a exigência em algo verificável — e obrigam o modelo a endurecer, não a concordar.

3. **Cobertura com contagem.** As 14 áreas existem para impedir o clássico: plano lindo de SEO e UX com pedagogia e áudio intocados (ou o contrário). A auto-verificação da seção 9 é o que impede o modelo de entregar 70 lotes e chamar de 100.

4. **Recusa obrigatória.** A parte mais valiosa da resposta é o §8. Um modelo que só propõe nunca diz o que **não** fazer — e o que não fazer é metade do plano quando existe uma pessoa e 14 meses.

5. **Anti-travamento explícito.** Ordem de corte, permissão para começar pela tabela, proibição de perguntar antes: são as três travas que evitam a sessão desperdiçada.

6. **O que ainda pode falhar.** (a) O modelo pode inventar números sobre o site — a regra 8.1 reduz, não elimina; confira todo número que aparecer no §5 contra a seção 2. (b) O redesenho do §9 é especificação, não tela: a tradução para código é sua e minha. (c) Se as sete respostas de 2.4 e 2.6 ficarem em branco, o plano inteiro fica apoiado em assunção — e prioridade errada é mais caro que plano nenhum.

### Como usar a saída depois (fluxo de execução)

1. Cole a saída num arquivo `docs/PLANO-100-LOTES-2026-11-XX.md`.
2. Rode um lote por vez com Cline/Sonnet, no ciclo do `CLAUDE.md`: escopo declarado → implementação → comando de verificação → commit atômico → relatório de 8 linhas.
3. Todo lote que toca rota, título, metadado ou sitemap passa por `npm run build` + `scripts/testar-inventario-seo.ts`; todo lote visual passa por `npm run validar:design`; toda mudança de áudio passa pelo manifesto.
4. Reavalie a fila a cada 10 lotes: se dois lotes seguidos não moveram nenhum dos 6 números do §5.11 (visitas, cadastros, aula 1, aula 8, checkouts, pagantes), a fila está errada — volte ao §2.
