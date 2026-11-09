# Manual completo de configuração manual — Linvuu
**YouTube (@Linvuu) · TikTok (@linvuu1) · Instagram (@uselinvuu)**

Para quem: Felipe configura tudo à mão, item por item, seguindo este documento.
Data: 2026-11-09 · Padrão dual (regra permanente): PT → linvuu.com.br · EN → linvuu.com · a oferta oficial é sempre "2 primeiras aulas grátis" (nunca "aula 1 grátis") · crédito de copy: © Felipe Nascimento Rosa e Luiza Nascimento Rosa.

Regra deste manual: nada genérico. Cada item traz a métrica, o benchmark ou a fonte que o justifica. Onde não existe número comprovado, está escrito "sem benchmark comprovado": nesses casos o item é decisão operacional, não promessa de resultado.

Como ler cada item: `O QUE FAZER → ONDE (caminho de menu) → VALOR/TEXTO EXATO → PORQUÊ (métrica/fonte)`. Os textos entre blocos de código são para copiar e colar.

Fontes-base da casa (não contradizer; construir sobre elas):

- `ficha-metrificacao-youtube.md`: benchmarks do canal (CTR, retenção, inscritos/1.000, limites do vidIQ Free)
- `seo-ferramentas-comparativo.md`: repositórios auditados (YoutubeTags, yt-dlp, youtube-growth, OpenSEO) e a ferramenta rejeitada por fabricar dados
- `perfis-config-pacote.md`: textos de perfil e padrão dual
- `pesquisa-tiktok-config-plataformas.md`: pesquisa profunda de Instagram (hashtags, collab, horários, SEO de busca)
- `ficha-metrificacao-instagram.md`: métricas e regras de decisão por post

Legenda de marcas: **[OFICIAL]** = documentação da plataforma · **[DADO]** = estudo/levantamento citado · **[DECISÃO]** = escolha operacional nossa · **[SEM BENCHMARK]** = efeito não comprovado publicamente.

---

## 1. YouTube — o canal (@Linvuu)

### 1.1 Desbloquear recursos (fazer PRIMEIRO; sem isto, metade do manual não existe)

**Verificar o telefone da conta**
- ONDE: YouTube Studio → Configurações → Canal → Elegibilidade de recursos (Feature eligibility) → Recursos intermediários → verificar por SMS/chamada.
- VALOR: o número real do dono (o mesmo do Redmi).
- PORQUÊ [OFICIAL]: recursos intermediários liberam miniaturas personalizadas, vídeos com mais de 15 min, lives pelo computador e podcasts (YouTube Help — acesso a recursos, via AIR Media-Tech, out/2026). Sem verificação, não há thumbnail própria, e thumbnail é a maior alavanca de CTR que existe (ver §2.4).

**Buscar os Recursos avançados**
- ONDE: mesma tela (Elegibilidade de recursos → Recursos avançados).
- VALOR: destrava por histórico do canal (~2 meses ativo e em dia) ou por verificação (vídeo/documento), conforme o Studio oferecer.
- PORQUÊ [OFICIAL]: capítulos manuais, "vídeo relacionado" dos Shorts (§2.5) e links clicáveis em Posts ficam atrás desse nível (YouTube Help — capítulos; YouTube Help — vídeo relacionado; documentação de recursos via FrameOS, out/2026).

**Público do canal = "Não é conteúdo para crianças"**
- ONDE: Studio → Configurações → Canal → Configurações avançadas → Público.
- VALOR: `Não, definir este canal como não sendo para crianças. Nunca envio conteúdo para crianças.`
- PORQUÊ [OFICIAL]: vídeo/canal marcado "para crianças" perde comentários, cards, telas finais, notificações e Posts (restrição COPPA — YouTube Help, via guias de telas finais/cards verificados em out/2026). A Linvuu é para adultos; a marcação errada amputa o funil inteiro.

**País de residência = Brasil**
- ONDE: Studio → Configurações → Canal → Informações básicas.
- PORQUÊ [OFICIAL]: o YouTube usa o país na elegibilidade ao Programa de Parcerias (YPP) e nos testes regionais de distribuição (YouTube Help — configurações do canal).

### 1.2 Branding (Personalização)

No Studio atual, a antiga tela "Personalização" aparece dividida em Perfil / Início / Informações básicas (rótulos podem variar); o conteúdo é o mesmo.

**Foto do perfil**
- ONDE: Personalização → Branding/Perfil → Foto.
- VALOR: arquivo `avatar-1080.png` do kit de marca (pasta `01-marca/logos`).
- PORQUÊ [OFICIAL]: a foto precisa ter no mínimo 98×98 px e o recomendado é 800×800 (YouTube Help — branding do canal); o arquivo do kit tem 1080×1080, acima do recomendado. Status: já aplicado em 2026-11-09; só conferir.

**Banner do canal**
- ONDE: Personalização → Branding/Perfil → Imagem do banner.
- VALOR: arquivo pronto e bilíngue: `~/workspace/linvuu/banner-youtube-bilingue.png`
- PORQUÊ [OFICIAL]: especificação do YouTube: mínimo 2048×1152 px, área segura de texto/logo = 1235×338 px central, arquivo ≤ 6 MB (YouTube Help — branding, via MarkStudios, out/2026). O banner atual do canal está só em português; este é o item nº 1 da lista de pendências (§6). O arquivo pronto já respeita a área segura e traz PT + EN + os dois domínios.

**Marca d'água de vídeo (watermark)**
- ONDE: Personalização → Branding → Marca d'água do vídeo.
- VALOR: símbolo L do kit (PNG 150×150, fundo transparente); exibição = vídeo inteiro, canto inferior direito.
- PORQUÊ [DECISÃO]: reforço de marca em embeds e Shorts reaproveitados. Efeito em métrica: [SEM BENCHMARK]; não prometer nada. Detalhe técnico: a marca d'água é suprimida durante as telas finais (YouTube Help — telas finais), então ela não compete com o CTA de fim de vídeo.

### 1.3 Informações básicas do canal

**Nome e handle: NÃO MEXER.** Nome `Linvuu`, handle `@Linvuu`.
- PORQUÊ [DECISÃO]: handle limpo e idêntico à marca é ativo de busca; trocas de handle têm janela e risco de perder o endereço curto. Já está certo.

**Descrição do canal (bilíngue, com ©)**
- ONDE: Personalização → Informações básicas → Descrição.
- VALOR EXATO:

```
Aprenda idiomas com explicação na sua língua e áudio em cada frase.
Russo, alemão, inglês, espanhol, francês, italiano e português.
👉 2 primeiras aulas grátis: linvuu.com.br

Learn languages with explanations in your own language and audio
on every sentence. Russian, German, English, Spanish, French,
Italian and Portuguese.
👉 First 2 lessons free: linvuu.com

© Felipe Nascimento Rosa e Luiza Nascimento Rosa
```

- PORQUÊ: é o texto do pacote oficial (`perfis-config-pacote.md`) no padrão dual PT→.com.br / EN→.com, com a linha de copyright dos dois autores. Status: aplicado em 2026-11-09, incluindo as traduções EN e ES da descrição; conferir se a linha © entrou em todas (ver §6).

**Links do canal**
- ONDE: Personalização → Informações básicas → Links.
- VALOR: 1º link `https://linvuu.com.br` (título: "Site oficial da Linvuu") · 2º link `https://linvuu.com` (título: "linvuu.com").
- PORQUÊ [OFICIAL]: o canal pode exibir até 14 links na página (YouTube Help — layout do canal, via MarkStudios). Só 2 por enquanto: os dois domínios; link de rede social só entra quando a URL real existir (regra do dono: nunca inventar URL). Status: aplicado em 2026-11-09; conferir.

**E-mail de contato (negócios)**
- ONDE: Personalização → Informações básicas → Informações de contato.
- VALOR: `hello.linvuu@gmail.com`
- PORQUÊ [DECISÃO]: é o e-mail da marca onde as redes estão cadastradas; é ele que aparece no botão "ver e-mail" do canal. Status: já estava preenchido (verificado em 2026-11-09).

### 1.4 Layout da página do canal (Personalização → Início/Layout)

**Trailer do canal (para quem NÃO é inscrito)**
- ONDE: Personalização → Layout → Destaque de vídeo → Trailer do canal.
- VALOR: vídeo "Comece aqui" de 30–60 s (a gravar): o que é a Linvuu, os 7 idiomas, explicação na língua do aluno, áudio em cada frase, 2 aulas grátis, nos dois idiomas ou com legendas PT/EN.
- PORQUÊ [OFICIAL]: o trailer é o único vídeo exibido só para não-inscritos na Home do canal; é a vitrine garantida para estranhos. Depois que a pessoa assiste, ele não é exibido de novo para ela (YouTube Help — layout do canal, via Thumblore). Efeito numérico isolado do trailer: [SEM BENCHMARK]; tratar como vitrine, não como promessa.

**Vídeo em destaque (para inscritos que retornam)**
- ONDE: mesmo bloco → Vídeo em destaque.
- VALOR: a aula mais recente da série ativa (trocar a cada aula nova).
- PORQUÊ [OFICIAL]: o slot aparece para quem já é inscrito e volta ao canal, e some para quem já assistiu; é distribuição gratuita para a base (YouTube Help — layout do canal).

**Seções da Home: usar 5–6, nesta ordem**
- ONDE: Personalização → Layout → Seções em destaque → Adicionar seção.
- VALOR (ordem): 1) Playlist única "Comece aqui" · 2) Playlist Russo · 3) Playlist Alemão · 4) Playlist Inglês · 5) Vídeos curtos (Shorts) · 6) Playlists criadas (índice dos demais idiomas).
- PORQUÊ [OFICIAL]: o teto é 12 seções (YouTube Help — layout do canal); o padrão que a plataforma entrega (Shorts, uploads, playlists, inscrições públicas) é arquivo morto, não vitrine. 5–6 seções ordenadas pelo que o visitante novo precisa é [DECISÃO] editorial informada por essa estrutura; teto é limite, não meta.

### 1.5 Palavras-chave do canal: sem duplicação

**Preencher as palavras-chave do canal (lista enxuta e final)**
- ONDE: Studio → Configurações → Canal → Informações básicas → Palavras-chave.
- VALOR EXATO (copiar):

```
linvuu, aprender russo, aprender alemão, aprender inglês, aprender espanhol, aprender francês, aprender italiano, aprender português, learn russian, learn german, learn english, learn spanish, learn french, learn italian, learn portuguese
```

- PORQUÊ [regra do dono + OFICIAL]: keywords de canal são identidade ampla, uma única vez. A descrição do canal já carrega a explicação ("explicação na sua língua", "áudio em cada frase"); não repetir essas frases aqui, e não repetir nas tags dos vídeos o que já está no título/descrição de cada vídeo (regra completa na §2.3). O próprio YouTube trata metadado de keyword como sinal fraco: para tags de vídeo, a posição oficial é "papel mínimo" (YouTube Help — tags); a lista acima existe para categorização básica do canal, não como alavanca. Efeito medido de keywords de canal: [SEM BENCHMARK].
- O que NÃO entra: "aulas de idiomas online grátis", "curso de idiomas", traduções da frase da descrição, nomes de concorrentes. Genérico aqui é exatamente o que o dono proibiu.

### 1.6 Padrões de upload (configurar UMA vez; vale para todo vídeo)

**Abrir e preencher**
- ONDE: Studio → Configurações → Padrões de upload (Upload defaults) → abas "Informações básicas" e "Configurações avançadas".
- PORQUÊ [OFICIAL]: os padrões só se aplicam a uploads feitos pelo navegador (youtube.com/upload). Upload pelo celular/app não herda; conferir manualmente nesses casos (YouTube Help — padrões de upload, via Zolyp, out/2026).

**Visibilidade padrão = Privado**
- VALOR: `Privado`.
- PORQUÊ [DECISÃO]: todo vídeo nasce privado para passar pelo checklist da §2.7 antes de publicar (título, descrição, tags, thumb, playlist, card, tela final). Publicar direto pula a conferência, e metadado errado publicado é o erro mais caro de corrigir depois.

**Descrição padrão = o esqueleto da §2.2**
- VALOR: colar o MODELO DE DESCRIÇÃO da §2.2 (versão do idioma do vídeo) como descrição padrão, com os campos `<...>` para preencher a cada upload.
- PORQUÊ [DECISÃO ancorada em OFICIAL]: a descrição tem limite de 5.000 caracteres (YouTube Help/Studio) e os primeiros ~200 caracteres são o que aparece em busca e na prévia; o esqueleto garante gancho + palavra-chave sempre no topo, sem depender de memória.

**Tags padrão = só a marca**
- VALOR: `linvuu`
- PORQUÊ [OFICIAL]: tags de vídeo têm papel mínimo na descoberta (YouTube Help — tags) e dividem o orçamento de 500 caracteres com as tags do vídeo. Padrão cheio de tag genérica rouba espaço e duplica a descrição. O resto das tags nasce por vídeo, da mineração (§2.3/§5).

**Categoria = Educação**
- ONDE: aba Configurações avançadas dos padrões de upload.
- PORQUÊ [DECISÃO]: categoria é sinal de classificação do conteúdo; "Educação" é a categoria real das aulas (e a mesma dos perfis de IG/TikTok no pacote).

**Licença = Licença padrão do YouTube · Permitir incorporação = Sim**
- PORQUÊ [DECISÃO]: incorporação liberada deixa blogs e parceiros embutirem as aulas, o que é distribuição gratuita. A licença padrão mantém os direitos com os autores (© Felipe Nascimento Rosa e Luiza Nascimento Rosa).

**Idioma do vídeo / idioma do título e da descrição**
- VALOR: vídeo em PT → `Português (Brasil)`; vídeo em EN → `Inglês`. Ajustar por vídeo quando o padrão não bater.
- PORQUÊ [OFICIAL]: o idioma declarado alimenta legendas automáticas e a tradução de metadados; declaração errada degrada os dois (YouTube Help — configurações de vídeo).

**Declaração de conteúdo alterado (IA): responder por vídeo**
- VALOR: aulas com voz sintética própria (TTS das frases) e animação gerada por código = "Não" (não é conteúdo realista alterado).
- PORQUÊ [OFICIAL]: o YouTube exige divulgação apenas para conteúdo realista feito/alterado com IA (pessoa real parecendo dizer/fazer algo, cena realista que não aconteceu); voz sintética não realista sobre material próprio fica fora (YouTube Help — divulgação de conteúdo alterado, verificado em guias de set/2026). Se um dia entrar deepfake/voz clonada de pessoa real, a resposta vira "Sim".

### 1.7 Comunidade e moderação (Configurações → Comunidade)

**Reter comentários possivelmente inapropriados**
- ONDE: Studio → Configurações → Comunidade → Padrões.
- VALOR: `Reter comentários possivelmente inapropriados para análise` = ligado (em vídeos e no canal).
- PORQUÊ [DECISÃO ancorada na plataforma]: canal de ensino atrai spam de "método milagroso" e golpe; a fila de revisão segura isso sem fechar os comentários (comentário é sinal de engajamento e é onde os alunos respondem aos quizzes).

**Bloquear comentários com links (reter para análise)**
- VALOR: opção de bloquear/reter comentários contendo links = ligada.
- PORQUÊ [DECISÃO]: link em comentário de canal novo é, na prática, spam ou golpe. Os links oficiais da Linvuu vão na descrição e no comentário fixado (§2.2), não na mão de terceiros.

**Palavras bloqueadas: lista inicial**
- ONDE: Configurações → Comunidade → Palavras bloqueadas.
- VALOR EXATO:

```
sub4sub, subs4subs, whatsapp grátis, grupo de whatsapp, ganhe dinheiro, renda extra, criptomoeda, bitcoin grátis, aposta, cassino, telegram vip
```

- PORQUÊ [DECISÃO]: filtro barato contra os padrões de spam mais comuns em PT/EN. Revisar a lista a cada mês com o que a fila de revisão mostrar. Efeito em métrica: [SEM BENCHMARK]; é higiene, não crescimento.

**Comentário fixado em todo vídeo (regra permanente)**
- ONDE: página do vídeo publicado → seu comentário → ⋮ → Fixar.
- VALOR: comentário do próprio canal com o CTA e o link UTM do curso (a §2.2 traz o texto pronto).
- PORQUÊ [DADO — ficha de metrificação §4]: a regra de decisão do canal diz: "views sobem e aulas iniciadas caem → o problema é a ponte"; link na 1ª linha da descrição + comentário fixado com UTM é a correção padrão, antes de mexer no vídeo.

### 1.8 Aba Posts (antiga Comunidade)

**Usar a aba Posts desde já**
- ONDE: página do canal → aba Posts (ou Studio → Criar → Postagem).
- VALOR: 1 post/semana: enquete de vocabulário ("qual palavra você quer aprender?") ou quiz com a resposta no dia seguinte, sempre a partir dos livros.
- PORQUÊ [OFICIAL]: o mínimo de inscritos para Posts foi removido em 2023; vale para canal com 0 inscritos (YouTube Help — acesso a recursos, via FrameOS/AIR, out/2026). Limite a respeitar: o YouTube envia no máximo 1 notificação de post a cada 3 dias (documentação, via Thumblore); postar todo dia queima a notificação à toa.

---

## 2. YouTube — sistema de SEO por vídeo (o coração)

Hierarquia real dos fatores, na palavra oficial: título, thumbnail e descrição importam mais que tags (YouTube Help — tags). Este sistema gasta o esforço nessa ordem: título → descrição → thumbnail → tags (por último e pouco).

### 2.1 Fórmula de título

**Estrutura obrigatória**
- FÓRMULA: `[termo exato que as pessoas digitam] + [gancho específico do vídeo]`
- LIMITE [OFICIAL]: o título tem no máximo 100 caracteres; mirar ≤ 60 para não truncar nas listagens (a exibição em busca/sugeridos corta por volta disso).
- PORQUÊ [DADO — ficha §4]: a decisão "busca <10% das views e vidIQ mostra demanda" manda publicar versão search-first com o termo exato no título. E o CTR se julga contra a faixa oficial: metade dos canais/vídeos fica entre 2% e 10% (YouTube Help — CTR FAQs); abaixo de 2% com ≥1.000 impressões, troca-se título/thumb.

**Modelos PT (público linvuu.com.br)**

```
Busca:      Como se diz "bom dia" em russo? | Aula de Russo A1
Busca:      Alfabeto cirílico em 10 minutos — aprenda a ler russo
Descoberta: 5 palavras russas que você já sabe (sem perceber)
Descoberta: O erro que todo brasileiro comete falando alemão
```

**Modelos EN (público linvuu.com)**

```
Search:     How to say "good morning" in Russian | Russian Lesson A1
Search:     The Cyrillic alphabet in 10 minutes — start reading Russian
Discovery:  Russian words you already know (you just don't know it)
Discovery:  The German mistake every beginner makes
```

**Título e thumbnail contam UMA história só**
- REGRA: o texto da thumbnail não repete o título; ela adiciona a metade visual da promessa (a palavra estrangeira grande, o rosto, o contraste). O título diz "como se diz bom dia em russo"; a thumb mostra só `ДОБРОЕ УТРО?!`.
- PORQUÊ: prática consolidada nas skills de thumbnail auditadas no GitHub (rsc-harness/youtube-thumbnails: "o texto da thumbnail não deve repetir o título; são duas superfícies da mesma promessa") e coerente com o CTR ser medido sobre o par título+thumb (YouTube Help — CTR).

**Testar com Test & Compare**
- ONDE: Studio → vídeo → Miniatura/Título → Testar e comparar (até 3 variantes de título e/ou thumbnail).
- PORQUÊ [OFICIAL]: o vencedor é escolhido por participação no tempo de exibição, não por clique puro (YouTube Help — Test & Compare; ficha §4). O teste roda até ~2 semanas; não interromper com amostra pequena (CTR só vale com ≥500–1.000 impressões — ficha §3).

### 2.2 Modelo de descrição: completo, pronto para colar

Regras da estrutura (antes dos modelos):

- Limite total: 5.000 caracteres [OFICIAL]. Os primeiros ~200 caracteres são a prévia que busca e página exibem; o gancho com a palavra-chave exata mora aí.
- Capítulos: primeiro timestamp em 00:00, mínimo de 3, cada um com ≥10 segundos [OFICIAL — YouTube Help, capítulos]. Capítulos manuais substituem os automáticos.
- Hashtags no fim: exatamente 3 no modelo. O YouTube exibe até 3 acima do título, escolhidas entre as da descrição como "mais engajantes" [OFICIAL — YouTube Help, hashtags]; com só 3 no texto, você escolhe quais aparecem. Teto de segurança: com mais de 60 hashtags, o YouTube ignora TODAS [OFICIAL].
- UTM obrigatória em todo link [ficha §3]: `utm_source=youtube&utm_medium=video&utm_campaign=<idioma>-<tema>`.
- Conferir a URL exata do curso no site antes de colar (padrão verificado: `linvuu.com.br/curso/ru`).

**Modelo PT (vídeo para o público brasileiro)**

```
Como se diz "bom dia" em russo? Nesta aula você aprende os cumprimentos essenciais em russo, com áudio em cada frase — e já sai falando hoje. 👇

▶ FAÇA A AULA COMPLETA — 2 PRIMEIRAS AULAS GRÁTIS, SEM CARTÃO:
https://linvuu.com.br/curso/ru?utm_source=youtube&utm_medium=video&utm_campaign=ru-cumprimentos

⏱️ CAPÍTULOS
00:00 Como se diz "bom dia" em russo
00:45 Os cumprimentos do dia a dia
02:30 Erro comum de pronúncia
04:00 Pratique comigo (áudio em cada frase)

📚 NESTA AULA
• Bom dia, boa tarde e boa noite em russo
• Como responder quando cumprimentam você
• A diferença entre o formal e o informal

🔁 CONTINUE A SÉRIE — CURSO DE RUSSO A1:
<colar a URL da playlist da série>

🌐 LINVUU
Brasil: https://linvuu.com.br
Global: https://linvuu.com
Aulas explicadas na sua língua, com áudio em cada frase. Russo, alemão, inglês, espanhol, francês, italiano e português.

© Felipe Nascimento Rosa e Luiza Nascimento Rosa

#aprenderrusso #russo #linvuu
```

Comentário fixado (colar como comentário do canal e fixar):

```
👉 Faça esta aula completa no site — as 2 primeiras são grátis, sem cartão: https://linvuu.com.br/curso/ru?utm_source=youtube&utm_medium=video&utm_campaign=ru-cumprimentos
Qual cumprimento você quer aprender no próximo vídeo?
```

**Modelo EN (vídeo para o público internacional)**

```
How do you say "good morning" in Russian? In this lesson you learn the essential Russian greetings, with audio on every sentence — and you start speaking today. 👇

▶ TAKE THE FULL LESSON — FIRST 2 LESSONS FREE, NO CARD:
https://linvuu.com?utm_source=youtube&utm_medium=video&utm_campaign=ru-greetings
<trocar pela URL exata do curso no site em inglês>

⏱️ CHAPTERS
00:00 How to say "good morning" in Russian
00:45 Everyday greetings
02:30 The pronunciation mistake to avoid
04:00 Practice with me (audio on every sentence)

📚 IN THIS LESSON
• Good morning, good afternoon and good evening in Russian
• How to answer when someone greets you
• Formal vs. informal greetings

🔁 KEEP GOING — RUSSIAN A1 SERIES:
<paste the series playlist URL>

🌐 LINVUU
Global: https://linvuu.com
Brasil: https://linvuu.com.br
Lessons explained in your own language, with audio on every sentence. Russian, German, English, Spanish, French, Italian and Portuguese.

© Felipe Nascimento Rosa e Luiza Nascimento Rosa

#learnrussian #russian #linvuu
```

Pinned comment (EN):

```
👉 Take the full lesson on the site — the first 2 are free, no card needed: https://linvuu.com?utm_source=youtube&utm_medium=video&utm_campaign=ru-greetings
Which greeting should we teach next?
```

**Tradução de título e descrição (o segundo idioma)**
- ONDE: Studio → Legendas → selecionar o vídeo → adicionar idioma → "Título e descrição".
- VALOR: todo vídeo PT ganha título+descrição EN traduzidos (e vice-versa), usando o outro modelo acima.
- PORQUÊ [DECISÃO dual]: um canal, dois públicos; a busca do YouTube casa título e descrição no idioma de quem busca (fatores de busca: correspondência de título/tags/descrição — YouTube Help, via FrameOS). Sem tradução, o vídeo PT é invisível para a busca em inglês. Ganho percentual: [SEM BENCHMARK]; faz-se pela estrutura da busca, não por promessa.

### 2.3 Tags: a regra completa (e por que ela é curta)

**O teto e o papel real**
- VALOR: campo Tags do vídeo (Studio → vídeo → Mostrar mais → Tags). Orçamento total: 500 caracteres somando todas as tags [OFICIAL].
- PORQUÊ [OFICIAL — citar a fonte, não a lenda]: "Tags podem ser úteis se o conteúdo do vídeo é comumente grafado errado; fora isso, tags têm papel mínimo na descoberta do vídeo" (YouTube Help — Adicionar tags). Corroboração independente: a análise do Backlinko de 1,3 milhão de vídeos achou só correlação fraca entre tags ricas em palavra-chave e ranking. Conclusão operacional: 10 minutos por vídeo em tags é o teto; o resto do tempo vai para título/thumb/roteiro.

**Composição das tags (SEM duplicar título/descrição)**
- REGRA DO DONO aplicada: o título carrega o termo principal + gancho; a descrição carrega o contexto; tags não repetem a frase do título palavra por palavra. Tags servem para o que título/descrição não cobrem:
  1. Erros de digitação reais do tema (a função que o YouTube endossa): ex. `aprender ruso`, `russo para brasilieros`, `alfabeto sirilico`, `cirilico`.
  2. Variantes e sinônimos que o autocomplete confirma (ver §5): ex. `russo para iniciantes`, `russo do zero`, `aulas de russo`.
  3. O termo no idioma-alvo: ex. `русский язык`, `привет`.
  4. Formato/série: ex. `russo a1`, `linvuu`.
- EXEMPLO PRONTO (vídeo "Como se diz bom dia em russo", ~230 de 500 caracteres):

```
aprender ruso, russo para brasilieros, alfabeto sirilico, russo para iniciantes, russo do zero, русский язык, привет, russo a1, linvuu
```

- Conferir a contagem: rodar `youtubetags --analyze` ou `analyze_tags()` do YoutubeTags (§5); a função devolve `total_characters` e `within_limit` contra o teto de 500.

**O que é PROIBIDO nas tags**
- Tag de tema que o vídeo não cobre (ex.: "viagem para Moscou" numa aula de gramática): é metadado enganoso, viola a política de spam/práticas enganosas e pode tirar o vídeo da busca [OFICIAL].
- Bloco de tags colado na descrição: o YouTube trata tag excessiva na descrição como spam [OFICIAL]. Tags vão só no campo Tags.
- Copiar a lista de tags de um concorrente inteira sem cruzar com a aula real: é o "SEO genérico" que o dono proibiu; a mineração (§5) serve para extrair candidatas, e o filtro é o conteúdo da aula.

### 2.4 Miniatura (thumbnail)

**Especificações técnicas**
- VALOR [OFICIAL]: 1280×720 px (16:9), largura mínima 640 px, JPG ou PNG, ≤ 2 MB. Deixar o canto inferior direito livre (é onde o YouTube sobrepõe o selo de duração).
- Pré-requisito: miniatura personalizada exige recursos intermediários (telefone verificado — §1.1).

**O que os dados dizem (montar a thumb nesta ordem)**
1. 1 rosto com emoção clara OU a palavra estrangeira gigante; nunca os dois disputando. Rostos com emoção forte: +20–30% de CTR reportados por vidIQ/TubeBuddy em guias de boas práticas (terceiros, não YouTube).
2. Máximo 3–4 palavras de texto, em caixa alta e legível a 320×180 px (o tamanho em que ela aparece no feed mobile; fazer o "teste de apertar os olhos" nesse tamanho). Thumbs com menos de 4 palavras tiveram ~30% mais cliques que as cheias de texto (1of10, via guias 2026).
3. Máximo 2–3 elementos visuais. Thumbs com mais de 3 elementos distintos: −23% de CTR (ThumbnailTest, via skill auditada no GitHub).
4. Contraste alto na paleta da marca: fundo verde-escuro `#1E3B2F`, texto papel `#F5F1E8`, detalhe ocre `#B7791F` (kit de marca). Cores contrastantes: +30% de CTR em estudo da Vidooly (2023, via guias).
5. Thumb personalizada sempre: 90% dos vídeos de melhor desempenho usam thumbnail personalizada (YouTube/Creator Academy); nunca deixar o frame automático.

- PORQUÊ GERAL: CTR é a métrica de capa do canal; faixa oficial de referência 2–10% (YouTube Help); a regra de decisão da ficha manda trocar thumb/título abaixo de 2% com ≥1.000 impressões, via Test & Compare (§2.1).

### 2.5 Shorts

**Formato e classificação**
- VALOR [OFICIAL]: vídeo vertical ou quadrado, até 3 minutos = Short automaticamente (regra desde 15/out/2024 — YouTube Help). Alvo Linvuu: 20–40 s por Short de gancho (uma palavra/frase por Short, a partir dos livros).
- PORQUÊ [DADO — ficha §1.2]: as réguas do formato são "% média assistida ≥70%" (canal vidIQ: 73,6% de APV de Shorts) e "escolheram assistir" ≥70% (faixa comunitária; o YouTube não publica benchmark oficial dessa métrica).

**Título do Short**
- VALOR: curto, com o termo falado: `Como se diz OBRIGADO em russo` / `How to say THANK YOU in Russian`.
- `#shorts` NÃO é obrigatório [OFICIAL — YouTube Help]: a classificação é automática pelo formato. Se usar hashtags, máx. 3 no total (as exibidas perto do título são até 3 — §2.2).

**Descrição do Short (curta, 2–3 linhas)**

```
Como se diz "obrigado" em russo: спасибо! 🔊
Aula completa de russo no canal — e as 2 primeiras aulas do curso são grátis no site.
#russo #aprenderrusso #shorts
```

- PORQUÊ [OFICIAL]: links em descrições e comentários de Shorts não são clicáveis (política anti-spam do YouTube); colar URL ali é inútil. A ponte do Short é o vídeo relacionado (item abaixo) + a descrição do canal.

**Vídeo relacionado (a ponte que funciona)**
- ONDE: Studio → Conteúdo → o Short → Vídeo relacionado → selecionar a aula longa correspondente.
- VALOR: todo Short nasce de uma aula → aponta para essa aula.
- PORQUÊ [OFICIAL]: o link aparece clicável abaixo do @ do canal no player do Short (YouTube Help — adicionar vídeo relacionado). Exige recursos avançados (§1.1) e o vídeo-alvo precisa estar público ou não listado. Atalho: Shorts criados pela ferramenta "Editar em um Short" a partir do vídeo longo já nascem vinculados ao original automaticamente (YouTube Help).

**Comentário no Short:** responder com a grafia/pronúncia e chamar para a aula no canal (texto, sem link; link não clica em Short).

### 2.6 Playlists e séries por idioma × nível

**Estrutura (criar conforme as aulas existirem; não criar playlist vazia)**
- Por idioma (7): uma playlist-mãe `Curso de Russo — do zero` / `Learn Russian — from zero` + séries por nível quando houver 3+ aulas do nível: `Russo A1`, `Russo A2`, `Russo B1`…
- Comece aqui (2): `Comece aqui — Linvuu` (PT) e `Start here — Linvuu` (EN), com 5–8 vídeos na ordem de assistir (aula 1 de cada idioma + vídeo de apresentação).
- Título da playlist = termo de busca dos dois lados: `Curso de Russo A1 | Learn Russian A1`; playlist também aparece em busca [DECISÃO dual].
- ONDE: Studio → Conteúdo → Playlists → Nova playlist; ordem dos vídeos = ordem das aulas (arrastar).

**Marcar as séries de aulas como SÉRIE OFICIAL**
- ONDE: Studio → Conteúdo → Playlists → editar a playlist → "Definir como série oficial" (rótulo pode variar).
- PORQUÊ [OFICIAL]: série oficial faz o YouTube tratar a playlist como curso sequencial (próxima aula em destaque para quem assiste em sequência). Regra da plataforma: um vídeo só pode estar em uma série oficial por vez; por isso nível é a unidade certa (a aula pertence a um nível só).
- Ligação com a Home: as séries alimentam as seções da §1.4 e as telas finais da §2.7; é o mesmo encadeamento visto de três lados.

### 2.7 Checklist de upload (colar no caderno; rodar em TODO vídeo)

1. [ ] Arquivo sobe com os padrões da §1.6 (nasce privado)
2. [ ] Título pela fórmula da §2.1 (termo exato + gancho, ≤100 caracteres)
3. [ ] Descrição pelo modelo da §2.2 (gancho nos ~200 primeiros caracteres, capítulos 00:00/≥3/≥10s, CTA com UTM, ©, 3 hashtags)
4. [ ] Tradução de título/descrição no outro idioma (§2.2)
5. [ ] Tags pela regra da §2.3 (≤500 caracteres, sem duplicar título, conferidas no `analyze_tags`)
6. [ ] Thumbnail 1280×720 ≤2 MB (§2.4) + 1–2 variantes para o Test & Compare
7. [ ] Playlist da série (idioma × nível) marcada; card para a aula anterior/próxima (até 5 cards por vídeo [OFICIAL]; cards de vídeo/playlist/canal são livres, link externo só no YPP)
8. [ ] Tela final nos últimos 5–20 s: próxima aula da série + playlist + botão de inscrição (até 4 elementos em 16:9; o vídeo precisa ter ≥25 s; pelo menos 1 elemento tem de ser vídeo ou playlist [tudo OFICIAL — YouTube Help, telas finais]. Usar 2–3 elementos, não 4; cada alvo a mais divide o clique [prática de guias verificados])
9. [ ] Idioma do vídeo e legenda conferidos; legenda própria enviada quando houver (a automática erra pronúncia e cirílico — pesquisa de Instagram §4)
10. [ ] Publicar (ou agendar) → colar e fixar o comentário-CTA (§2.2)
11. [ ] Se houver Short da aula: publicar com vídeo relacionado apontando para esta aula (§2.5)
12. [ ] Registrar na planilha (ficha de metrificação): CTR só se lê com ≥500–1.000 impressões; a decisão de dobrar/matar sai das regras da ficha §4

---

## 3. TikTok — @linvuu1

### 3.1 Perfil (textos do pacote; copiar)

- Nome: `Linvuu | Idiomas` (manter; já está assim)
- Foto: `avatar-1080.png` do kit (símbolo L)
- Bio, VALOR EXATO:

```
Idiomas como um professor ensina 📚
2 primeiras aulas grátis 👇 linvuu.com.br
```

- PORQUÊ: texto do `perfis-config-pacote.md`. O domínio na bio é texto, não link: o campo de site clicável só abre para conta Business qualificada ou 1.000+ seguidores (regra da plataforma registrada no pacote). Enquanto isso, a ponte é: bio com o domínio escrito + vídeo fixado com a aula grátis quando houver.

**Conta Pro/Criador (analytics)**
- ONDE: Perfil → ☰ → Configurações e privacidade → Gerenciar conta → Alternar para conta Pro (Criador).
- PORQUÊ [plataforma]: libera o TikTok Studio/Analytics (views, seguidores, horários de atividade); sem ele, nenhuma decisão de horário/tema tem dado.

**Fixar 3 vídeos no perfil (quando existirem):** 1) "comece aqui" 2) melhor vídeo de pronúncia 3) melhor vídeo de vocabulário. [DECISÃO] de vitrine; efeito isolado: [SEM BENCHMARK].

### 3.2 Configurações do app (uma vez)

**Conta pública**
- Configurações e privacidade → Privacidade → Conta privada = desligado.

**Comentários: filtros ligados**
- ONDE: Privacidade → Comentários.
- VALOR: `Filtrar spam e comentários ofensivos` = ligado · `Filtrar palavras-chave` = ligado, com a mesma lista da §1.7 do YouTube.
- PORQUÊ [DECISÃO]: mesma higiene do YouTube; comentário é onde o aluno responde ao quiz, então proteger sem fechar.

**Dueto e Costura (Stitch) = Todos**
- ONDE: Privacidade → Duet / Stitch → Todos.
- PORQUÊ [DECISÃO ancorada em DADO do Instagram]: resposta em vídeo de alunos/parceiros é a mecânica de descoberta mais forte medida para conta pequena no Instagram (collab 1,52× — §4); no TikTok, dueto/stitch aberto é o equivalente estrutural. Efeito medido no TikTok: [SEM BENCHMARK]; abre-se pela mecânica, não por promessa.

**Downloads dos seus vídeos = Desligado**
- PORQUÊ [DECISÃO]: evita repost do vídeo com marca d'água em outras plataformas sem o contexto da aula (o YouTube pune reupload sem transformação na distribuição de Shorts — política de originalidade; no TikTok é proteção de ativo).

**Qualidade de upload**
- ONDE: na tela de postar → "Permitir uploads de alta qualidade" = ligado; preferir postar pelo computador (tiktok.com/upload ou TikTok Studio web) em 1080×1920 (9:16).
- PORQUÊ: o app comprime upload de celular; o envio em 1080p pelo desktop é a prática reportada para preservar a nitidez do texto na tela (o texto É o conteúdo numa aula). Ganho percentual: [SEM BENCHMARK]; faz-se por fidelidade do material, não por número.

### 3.3 SEO por vídeo (o sistema)

**A frase-chave nas 3 camadas**
- VALOR: a palavra/frase da aula aparece (1) falada nos 2 primeiros segundos, (2) escrita na tela, (3) na primeira linha da legenda.
- PORQUÊ [plataforma]: a busca do TikTok lê fala transcrita, texto na tela (OCR) e legenda; a ajuda oficial do TikTok diz que, na busca, a correspondência do conteúdo com o termo digitado pesa mais que os demais fatores para a maioria dos usuários (TikTok Help — como recomenda conteúdo, via CreatorTribune/FrameOS, 2026). Quem só capricha na hashtag está otimizando o sinal mais fraco.

**Legenda: modelo pronto**

```
Como se diz "obrigado" em russo? 👇
Спасибо (spasibo) — e se a pessoa for formal, большое спасибо.
Aula completa de russo com áudio em cada frase: 2 primeiras grátis no site (link na bio).
#aprenderrusso #russo #idiomas #linvuu
```

- PORQUÊ [OFICIAL/DADO]: a legenda do app vai até 4.000 caracteres e só os primeiros ~150 aparecem antes do "mais"; a frase-chave e a resposta moram neles. A legenda longa indexável substituiu o volume de hashtags como alavanca de busca (análises 2026 sobre o teto de hashtags).

**Hashtags: teto 5, usar 3–5**
- REGRA: 1 de categoria (`#aprenderrusso`) + 2–3 de nicho/tema (`#russo`, `#alfabetocirilico`) + 1 de marca/série (`#linvuu`).
- PORQUÊ [DADO]: desde agosto/2025 o app limita posts a 5 hashtags (aviso no próprio app: "Maximum 5 hashtags"; o TikTok nunca publicou a regra no Help Center — verificada em 218 páginas de ajuda por CreatorTribune, out/2026). Efeito medido: vídeos com ≥1 hashtag tiveram ~5% mais views e ~9% mais interações que a média (Metricool, 2,3 milhões de posts, 92 mil contas — correlação entre contas, não teste controlado). `#fyp`/`#foryou`: nenhum estudo mostrou ganho; fora da lista.
- De onde saem as tags: mineração de vídeos reais do nicho (§5 — TikTok-Api/yt-dlp) + termos dos livros. Nunca lista pronta de internet.

**Ferramenta oficial de demanda (antes de gravar)**
- ONDE: buscar "Creator Search Insights" na busca do app → aba Content gap (temas muito buscados com poucos vídeos). No desktop: TikTok Creative Center → Trends → Keywords (filtro: Brasil, Educação).
- PORQUÊ [plataforma]: é a única fonte de demanda de busca da própria plataforma; substitui achismo de pauta. Nota: o filtro "buscas dos seguidores" do Search Insights libera com 1.000 seguidores (ajuda do TikTok, via CreatorTribune). Rotina da casa (pesquisa §5.3): checar 2× por semana.

**Horários: o que os estudos dizem (e o tamanho da divergência)**

| Estudo | Amostra | Janela forte (hora local do público) |
|---|---|---|
| Sprout Social (mar/2026) | ~2 bilhões de interações, 307 mil perfis | Ter–Qui, 14h–18h; fins de semana os piores |
| Buffer (set/2026) | 7,1 milhões de posts TikTok | Sábado o melhor dia; topo: domingo 9h, seg/dom 13h; tardes 12h–17h as mais fracas |
| Hootsuite (nov/2025) | 1M+ posts, 118 países | Qui 6h–9h e Sáb 10h–18h |

- DECISÃO LINVUU: os estudos divergem de verdade; não existe "o horário" comprovado. Manter o teste da casa (12h30 × 19h30 BRT, o mesmo do Instagram) por formato igual durante a fase de teste e decidir pelo TikTok Studio → Analytics → Seguidores → horários de maior atividade assim que houver base de seguidores. Horário é variável menor em todas as plataformas medidas (no Instagram, ≤9% das views — Virev); quem decide é gancho e retenção.
- Frequência: 2–5 posts por semana [DADO: Buffer, análise de 11,4 milhões de posts de 150 mil+ contas, 2026]. A grade da Linvuu (carrossel/Reel-companheiro adaptado + Shorts) cabe nessa faixa sem inflar produção.
- Retenção manda: a taxa de conclusão é o sinal de qualidade central do feed [plataforma/análises]; vídeos curtos da Linvuu miram conclusão ≥70% (faixa reportada como saudável por análises de SEO de TikTok, 2026; fonte secundária, tratar como referência de trabalho, não oficial). Na prática: gancho em 2 s, uma frase por vídeo, sem introdução.
- Comentários: o TikTok não tem comentário fixado em vídeos (páginas de ajuda verificadas em out/2026 — CreatorTribune). A continuação se faz respondendo o comentário com um vídeo novo (a plataforma linka a resposta ao comentário); é o formato de série da conta. [DECISÃO] de formato; efeito: [SEM BENCHMARK].

---

## 4. Instagram — @uselinvuu

(Condensado da pesquisa profunda da casa — `pesquisa-tiktok-config-plataformas.md` e `ficha-metrificacao-instagram.md`. Os números completos estão lá; aqui é só o aplicável.)

### 4.1 Perfil

**Tipo de conta: Profissional (Criador ou Empresa) · Categoria: Educação**
- PORQUÊ [DADO]: desde 10/07/2025, posts públicos de contas profissionais são indexados por Google e Bing (guias de SEO de Instagram, 2026); conta pessoal fica fora da busca externa.

**Campo "nome" (o pesquisável)**
- VALOR: `Linvuu | Aprenda Idiomas`
- PORQUÊ [DADO]: a busca do Instagram casa o termo contra nome de usuário, campo nome, bio, legendas, hashtags e lugares (explainer oficial de Search). O campo nome aceita 30 caracteres e é o campo mais desperdiçado quando repete o @; aqui ele carrega o termo que o brasileiro digita ("aprender idiomas" por extenso entra na bio).

**Bio (150 caracteres, bilíngue)**
- VALOR:

```
Russo, inglês, alemão e + — explicado na sua língua, com áudio em cada frase
Lessons explained in your language · audio on every sentence
2 primeiras aulas grátis · Free first 2 lessons ↓
```

- PORQUÊ [DECISÃO dual]: uma conta, dois públicos (PT→.com.br, EN→.com). Não existe estudo público comparando bio PT × EN × bilíngue; [SEM BENCHMARK]; a escolha é editorial do padrão dual. (O pacote traz uma variante só-PT da Semana 1; esta versão bilíngue é a de perfil permanente; perfil ≠ post.)

**Link da bio:** `https://linvuu.com.br` com UTM da campanha vigente:

```
https://linvuu.com.br?utm_source=instagram&utm_medium=organic&utm_campaign=semana1
```

Trocar o destino para a aula do idioma do post-âncora da semana. Cliques de bio para curso: [SEM BENCHMARK PÚBLICO]; medir os próprios desde o post 1 (ficha IG §1).

- Foto: `avatar-1080.png` (conferir se já é o símbolo oficial).

**Qualidade de mídia: LIGAR**
- ONDE: app → Configurações → Uso de dados e qualidade da mídia → "Fazer upload na qualidade mais alta" = ligado (e "usar menos dados móveis" desligado ao postar por Wi-Fi).
- PORQUÊ [plataforma]: é o toggle oficial que impede a compressão extra no upload; carrossel de tabela vive de texto nítido.

- 3 posts fixados: 1) "Comece aqui" (o que é a Linvuu + aulas grátis) 2) melhor carrossel de tabela 3) melhor Reel de pronúncia. Efeito dos pins: [SEM BENCHMARK]; vitrine [DECISÃO].
- Destaques: capas na paleta da marca; temas: `Comece aqui · Russo · Inglês · Alemão · Áudios · Grátis`. [DECISÃO] de vitrine.

### 4.2 SEO por post/Reel (o sistema)

**Primeira linha da legenda = a frase-chave pesquisável** (PT ou EN conforme o post; a conta é bilíngue: alternar o idioma-líder e repetir a frase-chave no outro idioma na 2ª linha).
- PORQUÊ [DADO]: a legenda é indexada por inteiro e as primeiras ~125 caracteres aparecem antes do "mais" (guias de SEO de IG, 2026). Na busca, Mosseri orienta palavras-chave e hashtags na legenda, não nos comentários. Experimento da Hootsuite (2022, 10 posts, 1 conta — evidência fraca): legendas lideradas por palavra-chave tiveram ~30% mais alcance que as lideradas por hashtags.

**Hashtags: 3–5, no FIM da legenda; o teto é 5**
- ESTRUTURA: 1 ampla de idioma + 2–3 de nicho do tema exato + 1 de marca (`#linvuu`) quando couber. Conjuntos-base por idioma no `perfis-config-pacote.md`; sempre trocar a genérica pelo termo do tema quando o post tiver um (ex.: `#alfabetocirilico` no lugar de `#idiomas`).
- PORQUÊ [DADO]: em 18/12/2025 o @creators fixou o máximo de 5 hashtags por post/Reel e o Help Center confirma que legenda + 1º comentário somam para o teto (passou de 5, o comentário não posta). Mosseri (dez/2024 e fev/2025): hashtags têm benefício de alcance "praticamente nenhum"; servem para classificar e conectar à busca, não para distribuir. Estudos divergem sobre contagem (Socialinsider, 75M posts: o número não influencia a distribuição; Metricool 2026: posts com hashtag tiveram 31,7% menos views — correlação entre contas, não causalidade). Conclusão operacional: 3–5 específicas, por conformidade e busca; não como aposta de alcance.
- Nunca esconder hashtags no 1º comentário "para liberar espaço": não libera (o teto soma os dois) e a busca lê a legenda.

**Alt text em todas as imagens/vídeos**
- ONDE: ao postar → Configurações avançadas → Texto alternativo (no Business Suite também dá ao agendar).
- VALOR: descrever o conteúdo com o termo do tema: `Tabela com os cumprimentos em russo: привет, доброе утро... — aula de russo A1 da Linvuu`.
- PORQUÊ: o alt text é indexado (guias) e é acessibilidade real para aluno com deficiência visual. Efeito em alcance: [SEM BENCHMARK]; preencher sempre, sem prometer número.

**Collab sempre que houver coautor real: a maior alavanca medida**
- COMO: professor/criador de idiomas menor ou do nosso tamanho publica e convida @uselinvuu (ou o inverso): dueto de pronúncia, quiz cruzado PT×EN. 1–2×/semana quando houver parceiro real; sem parceiro, não forçar.
- PORQUÊ [DADO]: Virev (out/2026, 19,9 milhões de posts, 384 mil contas, comparação dentro do mesmo criador): Collab = 1,52× as views dos posts próprios; em criadores de 1–10 mil seguidores, mediana 1,89× e 87% acima dos próprios posts. Emplifi (1º sem/2026, 520 mil posts): collabs aceitos renderam ~5× as interações em perfis <10 mil seguidores (associação, não prova causal). Para conta pequena, nenhum outro formato chega perto.

**Reel: regras de formato com número**
- Duração-alvo 15–30 s (Reel-companheiro do carrossel): Reel com mais de 3 min rendeu 0,76× as views de um de 10–19 s (Virev, 10,4M Reels).
- Sempre com legenda (revisada à mão; a automática erra cirílico e pronúncia): Reel sem legenda = 0,82× as views (Virev).
- Palavra-chave falada e na tela nos 3 primeiros segundos; os 3 sinais que o Instagram declara pesar: watch time, likes por alcance e envios por alcance (envios pesam mais para não-seguidores — Mosseri, via Virev).
- Trial Reels (testar só com não-seguidores antes de ir ao perfil): existe e serve para validar gancho sem queimar o post. Efeito: [SEM BENCHMARK] nesta pesquisa.
- Remix/Dueto ligados (resposta de alunos e parceiros). [DECISÃO].

**Horários: teste da casa**
- VALOR: slots 12h30 × 19h30 BRT alternados, mesmo formato, decidir por % de alcance de não-seguidores e salvamentos no Insights após 7–14 dias.
- PORQUÊ [DADO]: benchmarks externos (hora local do público): Metricool 2026 (24,36M posts) aponta 19h–21h, pico às 20h, como melhor janela geral; Sprout Social 2026 aponta ter–qui como dias fortes e fins de semana como piores; Buffer 2026, noites de semana 18h–23h. Conversão de fuso (nov/2026): 19h30 BRT = 17h30 Nova York = 22h30 Londres; 12h30 BRT = 10h30 NY = 15h30 Londres; os dois slots cobrem BR + US + UK sem post duplicado. E o tamanho do efeito é pequeno: horário moveu ≤9% das views no estudo Virev; é a segunda variável de ajuste, nunca a explicação de um fracasso.

**Medição por post (a régua está na ficha IG):** métricas primárias por formato: envios/alcance (curiosidade; linha 0,08%), salvamentos/alcance (tabela/regra; linha 0,05%), % de não-seguidores + envios (Reel; linha 0,10%), multiplicador ≥1,5× (collab). Vereditos só com leitura de 7 dias e mínimo de 3 posts do formato (regras completas em `ficha-metrificacao-instagram.md` §2 e §4). Curtidas não decidem nada (hierarquia do dono: salvamentos/compartilhamentos → seguidores novos de não-seguidores → cliques).

---

## 5. Rotina de mineração de dados (os repositórios)

Para que serve: tags, hashtags e temas não saem de lista pronta da internet; saem de (a) vídeos reais que já funcionam nos canais concorrentes de idiomas, cruzados com (b) os termos reais das aulas nos livros da Linvuu. Stack auditado no `seo-ferramentas-comparativo.md`: YoutubeTags (extrai tags/metadados sem chave de API — dado real do concorrente) + yt-dlp (metadados em lote de qualquer vídeo/canal) na camada de extração; vidIQ Free na camada de demanda (o que os repositórios NÃO têm: volume/tendência de palavra-chave); YouTube Studio como verdade do nosso canal.

> ⚠️ **Ferramenta proibida nesta casa:** `Avinashricky211/Advanced-Youtube-Seo-Generator`. A auditoria de código (comparativo §1.5) mostrou que ela fabrica os "analytics" com números aleatórios (`get_mock_analytics()`) e cospe tags fixas de turismo para qualquer nicho. Ferramenta que inventa métrica está fora, tenha sido indicada por quem for.

**Passo 0 — Instalar (uma vez)**

```
pip install YoutubeTags yt-dlp
yt-dlp --version
youtubetags --help
```

**Passo 1 — A lista de concorrentes (uma vez, revisar por trimestre)**

- 10 canais de ensino de idiomas: os mapeados na Fase 1 (`conteudo/fase1-pesquisa-mercado.md`) + os 3 canais rastreados no vidIQ Free (o Free acompanha até 3 concorrentes — limite verificado na ficha §3).
- Registrar num arquivo `banco-de-tags/concorrentes.md`: canal | idioma | URL | nº de inscritos (para comparar vídeos de canais de porte parecido; a conversão muda com o tamanho: canais de 0–2 mil inscritos que cruzaram 1.000 convertiam 4,8 inscritos/1.000 views contra 2,1 dos estagnados — estudo Astryx, ficha §1.1).

**Passo 2 — Extrair os vídeos que funcionam de cada canal**

```
# Top vídeos por busca do próprio YouTube (termo da aula), com views reais:
yt-dlp "ytsearch10:aprender russo alfabeto" --flat-playlist \
  --print "%(view_count)s | %(id)s | %(title)s"

# Metadados completos de um vídeo específico (título, descrição, tags, views):
yt-dlp --skip-download --dump-json "https://www.youtube.com/watch?v=VIDEO_ID" > video.json

# Listar vídeos de um canal (varredura para escolher os maiores):
yt-dlp --flat-playlist --print "%(id)s | %(title)s" \
  "https://www.youtube.com/@CANAL/videos" | head -30
```

**Passo 3 — Extrair tags e metadados com YoutubeTags (sem API key)**

```
# Tags de um vídeo (CLI):
youtubetags https://www.youtube.com/watch?v=VIDEO_ID

# Vários vídeos de uma vez, em JSON:
youtubetags ID1 ID2 ID3 --json

# Metadados completos:
youtubetags --info VIDEO_ID

# Tags do canal concorrente (as keywords dele):
youtubetags --channel @CANAL

# Conferir o SEU rascunho de tags contra o teto de 500 caracteres:
youtubetags --analyze VIDEO_ID
```

```python
# Em lote, via Python (para a rodada mensal):
from YoutubeTags import bulk_videotags, analyze_tags, tag_suggestions

ids = ["ID1", "ID2", "ID3"]               # top vídeos dos concorrentes do idioma
res = bulk_videotags(ids, max_workers=4)  # {id: [tags...]} — falha vira None
for vid, tags in res.items():
    if tags:
        print(vid, analyze_tags(tags))    # count, total_characters, duplicates...

# Variantes REAIS de busca (autocomplete do YouTube) para o termo da aula:
print(tag_suggestions("aprender russo", language="pt", region="BR"))
print(tag_suggestions("learn russian", language="en", region="US"))
```

- PORQUÊ: o YoutubeTags lê as tags da página pública do vídeo (meta tags e JSON embutido); é o que o concorrente realmente usa, não estimativa (auditoria de código, comparativo §1.1). Limite honesto dele: não há volume de busca; ele diz o que funciona nos outros, não quanto se busca. Volume/tendência é a consulta ao vidIQ (Free: 3 resultados por busca de keyword, 150 créditos/mês — ficha §3) e ao Creator Search Insights (TikTok) / aba Pesquisa do Analytics (YouTube).

**Passo 4 — Hashtags de Instagram/TikTok (mineração, com moderação)**

```
pip install instaloader
# Posts reais de uma hashtag (legenda, likes, comentários) — base para medir o termo:
instaloader "#aprenderrusso"
```

```python
# TikTok-Api (davidteather/TikTok-Api — vídeos por hashtag/usuário com contadores reais):
# Requer sessão/playwright; usar com a conta de pesquisa, nunca em rajada.
from TikTokApi import TikTokApi
# api.hashtag(name="aprenderrusso").videos(count=30)
```

- PORQUÊ + CUIDADO [comparativo §2.2]: não existe gerador open source de hashtag com métrica confiável; hashtag boa sai de posts reais minerados. Instaloader (13.828★) e TikTok-Api (6.738★) fazem scraping e são frágeis (login/captcha frequentes; abuso pode restringir a conta). Regras: rodar pouco, espaçado, e nunca com a conta oficial logada em rajada. `drawrowfly/tiktok-scraper` está parado desde 2023; não usar.

**Passo 5 — Cruzar com os livros (o filtro que impede o genérico)**

- Os termos das aulas saem de `conteudo/fontes-livros-drive.md` e do repositório FelipeNascimentoRosa/Linvuu-Livros-em-PDF (títulos de aula, seções, vocabulário de cada capítulo).
- Regra de entrada no banco (as três portas; a tag precisa passar por pelo menos uma, e a nº 1 manda):
  1. Existe na aula (termo real do livro/curso) → entra sempre.
  2. Concorrente top usa + autocomplete confirma → entra como variante de busca.
  3. Erro de digitação comum do termo da aula → entra só como tag de vídeo (a função que o YouTube endossa — §2.3).
- Fora disso, não entra. Hashtag de tendência fora do nicho (ex.: hashtag sazonal em alta) não entra só por estar em alta (pesquisa IG §5.3).

**Passo 6 — Gerar e manter o banco de tags por idioma**

- Arquivo por idioma: `banco-de-tags/russo.md`, `alemao.md`, `ingles.md`, `espanhol.md`, `frances.md`, `italiano.md`, `portugues.md`, com colunas:

| termo | origem (livro § / concorrente+vídeo / autocomplete) | uso (título / tag / hashtag) | caracteres |
|---|---|---|---|

- Rotina (mensal, junto com a rotina da ficha §3): repetir os Passos 2–3 nos vídeos novos dos concorrentes → atualizar os bancos → aposentar termos que os nossos dados condenaram (vídeo/tema com inscritos/1.000 < 0,50 após 2 tentativas sai da pauta — ficha §4).
- Camada de processo (opcional): o `melgarafael/youtube-growth` (PT-BR, API oficial do canal) organiza pauta/roteiro/metadados a partir dos dados reais do @Linvuu, sempre com revisão humana antes de publicar (comparativo §1.2). Para SEO do site (não do YouTube), a fila é: Lighthouse + SiteOne Crawler nas auditorias e OpenSEO + chave DataForSEO paga por uso quando a frente de palavras-chave do site abrir (comparativo §2.3).

---

## 6. Checklist final de conferência

### 6.1 JÁ APLICADO no @Linvuu (verificado em 2026-11-09; só conferir, não refazer)

- Login da marca ativo no navegador: hello.linvuu@gmail.com (senha trocada pelo dono em 2026-11-09)
- Avatar oficial da marca aplicado no canal (símbolo L)
- Descrição do canal bilíngue PT/EN com a linha © Felipe Nascimento Rosa e Luiza Nascimento Rosa; incluída também nas traduções EN e ES ✔ (conferir visualmente se a © aparece nas 3 versões)
- Links do canal: linvuu.com.br e linvuu.com
- E-mail de contato do canal: hello.linvuu@gmail.com
- Nome `Linvuu` e handle `@Linvuu` (canal UCWp6tZ1PN3RJzXEKWwnC0BA)
- vidIQ Free conectado ao @Linvuu (150 créditos de AI Coach; upsell pago recusado)
- PostHog: organização e projeto "Linvuu" criados (plano Free)
- Postiz: conta criada; parada na tela de pagamento por decisão do dono (sem cartão, sem trial)
- Notion: login funcionando
- Infra pronta e arquivada: ficha de metrificação do YouTube, comparativo de ferramentas SEO, pacote de perfis, banner bilíngue (abaixo)

### 6.2 FALTA ELE FAZER À MÃO (nesta ordem)

**YouTube — canal**

1. [ ] Subir o banner bilíngue. Arquivo pronto: `~/workspace/linvuu/banner-youtube-bilingue.png` (2048×1152, área segura respeitada) → Personalização → Branding → Imagem do banner (§1.2)
2. [ ] Verificar o telefone → liberar recursos intermediários (thumbnails!) (§1.1)
3. [ ] Conferir "Não é conteúdo para crianças" no nível do canal e país = Brasil (§1.1)
4. [ ] Palavras-chave do canal: colar a lista enxuta da §1.5
5. [ ] Padrões de upload completos da §1.6 (visibilidade Privado, descrição = modelo §2.2, tags = `linvuu`, categoria Educação)
6. [ ] Comunidade/moderação da §1.7 (reter inapropriados, bloquear links, palavras bloqueadas)
7. [ ] Marca d'água do kit (§1.2)
8. [ ] Gravar o trailer "Comece aqui" (30–60 s) e ligar o layout da §1.4 (trailer + destaque + 5–6 seções)
9. [ ] Criar as playlists por idioma e a "Comece aqui" PT/EN (§2.6); as de nível nascem com as aulas
10. [ ] Rodar a auditoria do canal no vidIQ (o Free libera 3 seções) e anotar os achados na planilha
11. [ ] Perseguir os recursos avançados (histórico ~2 meses) → destrava capítulos manuais plenos e vídeo relacionado dos Shorts (§1.1)

**YouTube — por vídeo (a partir da primeira aula)**

12. [ ] Rodar o checklist de upload da §2.7 em cada vídeo, sem exceção
13. [ ] Mineração mensal (§5): atualizar o banco de tags com os concorrentes + livros

**Instagram — @uselinvuu**

14. [ ] Aplicar o pacote da §4.1: campo nome pesquisável, bio bilíngue permanente, foto do kit, categoria Educação, qualidade de upload na máxima
15. [ ] Link da bio com a UTM da campanha (§4.1) e os 3 fixados quando houver posts
16. [ ] Seguir o sistema da §4.2 em cada post (frase-chave na 1ª linha, 3–5 hashtags, alt text, collab quando houver parceiro)

**TikTok — @linvuu1**

17. [ ] Login de novo, com calma: em 2026-11-09 o TikTok bloqueou as tentativas por frequência; esperar esfriar e entrar uma vez só, preferencialmente pelo caminho que já funcionou no celular (a senha entra via cartão seguro, nunca pelo chat)
18. [ ] Aplicar a §3.1 (bio do pacote, foto, conta Pro/Criador) e as configurações da §3.2 (filtros, dueto/stitch abertos, downloads off, upload em alta qualidade)
19. [ ] Publicar seguindo a §3.3 (frase-chave nas 3 camadas, 3–5 hashtags mineradas, Creator Search Insights antes da pauta)

**Meta / demais frentes (registrado, fora desta rodada de configuração)**

20. [ ] Meta/Facebook: a conta é a pessoal do dono (login felipevaleevarosa@gmail.com); portfólio Business, vínculos e pixel ficam para a tarefa T5, com ele presente; a "página" atual é perfil em modo profissional (decisão da T5: manter ou criar Página)
21. [ ] LinkedIn, X e Threads: perfis da empresa (decisão do dono) ainda não configurados no básico; entram numa rodada própria, com o mesmo padrão dual
22. [ ] Token do GitHub para a automação (`n8n-linvuu-consulta`, somente leitura no repo Linvuu): criar com o dono presente; o valor vai direto ao cofre dele, nunca ao chat/arquivo

---

## Fontes (acesso em 2026-11-09)

**Documentação oficial / plataforma**

- YouTube Help — Adicionar tags aos vídeos ("papel mínimo"; grafia errada; spam na descrição) e Hashtags (até 3 exibidas; >60 = todas ignoradas) — via https://rapidtags.app/youtube-tag-strategy/ , https://frameos.studio/blog/youtube-tags , https://taskant.com/youtube-hashtags-guide/
- YouTube Help — Capítulos de vídeo (00:00, ≥3, ≥10 s) — via https://umbrellacreators.com/blog/how-to-add-chapters-to-youtube-videos
- YouTube Help — Telas finais e Cards (5–20 s, até 4 elementos, vídeo ≥25 s; até 5 cards) — via https://www.zolyp.com/blog/youtube-end-screens-and-cards , https://increditors.com/youtube-end-screens-cards/
- YouTube Help — Shorts de 3 minutos e Vídeo relacionado (vertical/quadrado ≤3 min desde 15/out/2024; link sob o @; recursos avançados) — via https://www.zolyp.com/glossary/youtube-shorts , https://www.zolyp.com/blog/youtube-shorts-strategy
- YouTube Help — Layout do canal (trailer × destaque; até 12 seções) e Branding (banner 2048×1152, área segura 1235×338, ≤6 MB; até 14 links) — via https://www.thumblore.com/blogs/youtube-channel-layout , https://www.markstudios.com/blog/youtube-channel-page-trailer-about-section-layout-2026
- YouTube Help — Acesso a recursos (intermediários = telefone: thumbs, >15 min, live; avançados = histórico/verificação; Posts sem mínimo de inscritos desde 2023) — via https://air.io/en/youtube-hacks/youtube-feature-eligibility-by-subscriber-count , https://frameos.studio/blog/youtube-community-posts
- YouTube Help — Padrões de upload (só valem no navegador) — via https://www.zolyp.com/blog/youtube-upload-defaults
- TikTok — teto de 5 hashtags no app (ago/2025) e ajuda de recomendação/busca — via https://frameos.studio/blog/tiktok-hashtags , https://creatortribune.com/tiktok-hashtag-stuffing/ , https://cloutfluence.com/en/blog/tiktok/what-hashtags-to-use-on-tiktok/

**Estudos e dados de terceiros**

- CTR oficial 2–10%, retenção, inscritos/1.000 (OverseerOS/Astryx), YPP e alerta 2027: `ficha-metrificacao-youtube.md` (fontes completas lá)
- Thumbnail: 90% com thumb personalizada (Creator Academy); <4 palavras ~+30% (1of10); >3 elementos −23% (ThumbnailTest); rostos +20–30% (vidIQ/TubeBuddy); contraste +30% (Vidooly 2023) — via https://alici.ai/blog/how-to-make-youtube-thumbnails-best-practices-2026 , https://growthos.in/blog/youtube-thumbnail-best-practices , https://github.com/ericrisco/rsc-harness (skill youtube-thumbnails)
- Tags × ranking: Backlinko, 1,3 milhão de vídeos (correlação fraca) — via https://frameos.studio/blog/youtube-tags
- TikTok horários: Sprout Social 2026 (~2 bi interações) · Buffer 2026 (7,1M posts; frequência 2–5/semana de 11,4M posts) · Hootsuite 2025 (1M+ posts) — via https://omnisocials.com/best-time-to-post-on-tiktok , https://autovirality.com/blog/best-time-to-post-on-tiktok
- TikTok hashtags: Metricool (2,3M posts: +~5% views com ≥1 hashtag — correlação) — via https://frameos.studio/blog/tiktok-hashtags
- Instagram (teto 5, collab 1,52×/1,89×/~5×, sinais watch time/sends, Reel >3 min 0,76×, sem legenda 0,82×, benchmarks Socialinsider/Metricool, horários): `pesquisa-tiktok-config-plataformas.md` e `ficha-metrificacao-instagram.md` (fontes completas lá)
- Repositórios (estrelas, licenças, auditoria de código, comandos): `seo-ferramentas-comparativo.md`; API do YoutubeTags conferida no README oficial — https://github.com/nuhmanpk/YoutubeTags

**Nota final de honestidade:** onde este manual diz [SEM BENCHMARK], a configuração existe por estrutura, higiene ou decisão editorial, não porque alguém mediu ganho. A partir do 2º mês, as medianas do próprio canal (@Linvuu / @uselinvuu / @linvuu1) substituem qualquer benchmark externo, como mandam as fichas de metrificação.
