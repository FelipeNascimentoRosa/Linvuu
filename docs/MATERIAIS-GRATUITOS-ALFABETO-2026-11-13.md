# Materiais gratuitos: guias de alfabeto e pronúncia (13/11/2026)

Pedido do Felipe (13/11/2026): uma aba "Materiais gratuitos" para a pessoa permanecer no site, com **uma página só por idioma** ensinando o alfabeto (as letras que parecem com as do português e as que não parecem), para russo, alemão, francês, italiano e espanhol, **primeiro no domínio .com.br**. O russo precisa ser impecável.

**Estado em 14/11: implementado e testado localmente; publicação autorizada pelo Felipe, CI e deploy ainda não verificados.** O texto das 200 palavras e as gravações indicadas abaixo aguardam revisão humana.

## Atualização de 14/11: alfabeto e 200 palavras

Pedido atual do Felipe: oferecer alfabetização russa e **200 palavras úteis do dia a dia**, com tradução em português e áudio em russo, para uso comercial. Implementada uma seleção editorial própria de 200 palavras, não um ranking estatístico. A busca ignora acentos e maiúsculas, há carregamento progressivo e marcação semântica. O HTML para buscadores também inclui as palavras e traduções.

Corrigida a explicação das vogais iotadas: depois de consoante suave, elas não significam necessariamente um “i” separado; também foram qualificadas as aproximações sobre redução vocálica. Conteúdo ainda pede revisão do Felipe.

As 200 gravações foram geradas localmente com a voz 2 do Vosk-TTS, em `public/audio/materiais/ru/`, sem substituir os áudios do curso. O modelo declara licença Apache-2.0; veja `docs/VOZES-PTBR-RUSSO-2026-11-14.md`. Os dados, as traduções, os acentos e as gravações ainda precisam de revisão humana em russo. Verificados contagem, unicidade, tradução preenchida, presença de acentos em multissílabas, 200 arquivos de áudio e HTML pré-renderizado. Em 14/11, 200 URLs de áudio retornaram HTTP 200 no servidor local; a busca por “gato” encontrou кот, e o arquivo retornou `audio/mpeg`. A presença do arquivo não garante pronúncia correta. Os demais exemplos do guia continuam com seus áudios anteriores, cuja licença e qualidade não foram todos verificados.

Conferência automática com Whisper small após até duas tentativas adicionais: 184 transcrições textualmente equivalentes e nove números reconhecidos como algarismos. Permanecem sete divergências para escuta humana: они, это, год, хлеб, нога, идти, семь. Algumas podem refletir redução vocálica ou ensurdecimento; a transcrição não prova erro nem valida sotaque. Relatório local: `C:\site\amostras-audio-russo\vocabulario200\conferencia.json`.

OpenSEO consultado em 14/11 para Brasil e português, projeto `.com.br`: a expressão “palavras em russo” retornou volume estimado 1.900/mês; “palavras básicas em russo”, 90–110 em variantes apresentadas separadamente, que não devem ser somadas. A consulta “alfabeto russo” falhou por erro HTTP 500 do provedor, sem resultado; não inferir volume. Essas estimativas não são dados reais de tráfego nem garantia de classificação. O projeto do OpenSEO está configurado por padrão para EUA/inglês, portanto nesta consulta foi informado explicitamente Brasil/português.

## O que existe
| Rota | O que é |
|---|---|
| `/materiais-gratuitos` | hub com os cinco guias |
| `/materiais-gratuitos/alfabeto-russo` | russo: 33 letras, tabela completa, 5 grupos, regras, palavras e placas, teste de 16 perguntas |
| `/materiais-gratuitos/alfabeto-alemao`, `-frances`, `-italiano`, `-espanhol` | mesmo molde: tabela das letras, letras que parecem e soam iguais, as que enganam, as que o português não tem, combinações, regras, palavras e teste de 10 perguntas |

- Conteúdo: `src/lib/alfabeto/{ru,de,fr,it,es}.ts` (tipos em `base.ts`), reunido em `src/lib/materiais.ts`. Uma fonte só para a página React, o `<head>`, o JSON-LD e o HTML pré-renderizado (`src/lib/metaRota.ts`).
- Página: `src/pages/MateriaisGratuitos.tsx`; estilo: `src/materiais.css` (escopado em `.mat-*`, só tokens).
- Só **pt-BR e só no `.com.br`**: `server/dominio.ts` redireciona `/materiais-gratuitos*` do `.com` para o `.com.br` (301). No APK as rotas voltam para `/`.
- Menu: link "Materiais gratuitos" no Header (desktop e mobile) e no Footer, só em pt-BR. Entre 821 e 1100 px o cabeçalho ganhou intervalo menor (`src/redesign.css`) para o sétimo link não quebrar.
- Sitemap do `.com.br`: 49 → 55 URLs (`scripts/seo.mjs`); `llms.txt` ganhou a seção.
- O teste rápido grava o resultado no `localStorage` (`linvuu:materiais:v1`); sem login.
- Ao fim de cada guia: convite para `/curso/<id>` e `/livros/<id>/capitulo/1` (as duas primeiras aulas do curso são grátis; o capítulo 1 do livro é aberto).

## Russo: como foi conferido
- Base: Aula 1 do livro de gramática de russo (Coleção Linvuu, págs. 2–22): os grupos 5 + 7 + 13 + 8 (aqui 6 letras de som novo + 2 sinais), as duas regras de pronúncia, as placas. Os textos foram reescritos; o vídeo do Felipe (`xSIxHAcFv1E`) serviu para ordem e macetes; o vídeo `VwWPMRMf8Oc` é de terceiro (Troica Idiomas) e nada foi copiado.
- Fonética: conferida na referência *Russian phonology* (Wikipedia, lida em 13/11/2026). Confirmado: Ж, Ш e Ц sempre duras; Ч e Щ sempre suaves; И depois de Ж, Ш e Ц soa [ɨ] (жить, цирк); Е com acento depois de Ж, Ш e Ц soa [e] (центр, шесть); redução das vogais sem acento (О → «a»; Е, Я → perto de «i»); ensurdecimento no fim da palavra e diante de consoante surda, e sonorização de surda diante de sonora (футбол = fudból); Л duro velarizado (não vira «u»); Ж e Ш apicais e levemente labializados; Щ longo e suave; Х [x]; Р vibrante.
- Mudanças em relação ao livro (confirmar): o resumo do livro diz «С = S (não K)», provável erro; a frase sobre a ordem do alfabeto ser parecida com a do latim não se sustenta e não foi repetida; o livro ensina o Ы com «boca de u», mas a fonte descreve [ɨ] não arredondado (o arredondamento é dos Ж e Ш), então a página ensina «língua recuada, sem arredondar os lábios»; a classe «sempre duras / sempre suaves» e a regra da И depois de Ж/Ш/Ц faltam no livro e estão na página.
- Transcrições em português seguem a pronúncia real («niét», «mitró», «tiátr», «kharashó», «pótchta»), não a leitura letra a letra do livro.
- Nas placas, a assimilação no meio da palavra aparece sem explicação longa: вход = fkhot, автобус = aftóbus, вокзал = vagzál.

## Alemão, francês, italiano, espanhol
Escritos a partir de conhecimento geral das quatro línguas; **não foram conferidos em fonte externa nem por falante nativo**. Pontos que mais merecem revisão: ch alemão (ach/ich) e o R vocalizado; vogais nasais e consoantes finais do francês; c/g/sc/gn/gl e z do italiano; c/z (Espanha × América), ll e r/rr do espanhol.

## Acento nas palavras de uma sílaba
Revisão do Felipe (13/11/2026): *кот* leva acento (*кóт*, kót). Agora toda palavra russa de uma sílaba mostra o acento e a transcrição acentuada (`acentuarMono` em `src/lib/alfabeto/ru.ts`); o acento não muda o áudio (o hash ignora U+0301).

## Áudio do russo: Vosk-TTS, voz 2 (13/11/2026)
O áudio do *кот* soava com sotaque de inglês para o Felipe. Testadas com o Whisper (`faster-whisper small`, só mede se a palavra é compreensível, não o sotaque): Piper "denis" (CC0) acertou 3 de 8 palavras soltas e foi descartado; **Vosk-TTS** (`vosk-model-tts-ru-0.9-multi`, 5 vozes) acertou 39 de 40, e o Felipe escolheu a **voz 2** (`speaker_id=2`) ouvindo as amostras.
- Licença: o README do modelo declara **Apache 2.0** (ruBERT, da SberDevices, também Apache-2.0); código `vosk-tts` Apache-2.0. A origem dos dados de treino não está no README.
- Gerados 43 MP3 (64 kbps, mono, 44,1 kHz, 0,15 s de silêncio antes e 0,25 s depois, como o formato do site), com o acento indicado ao sintetizador (`+` antes da vogal tônica). Whisper entendeu 40 de 43 de primeira; as 3 restantes (*час, том, отель*) saíram na 1ª nova tentativa, mesma voz, outro ruído/velocidade. *отель* é aceita porque a pronúncia correta é "atiél’" (o Whisper escreveu "Атель").
- **26 são novos** (palavras que só tinham a voz do navegador) e **17 substituem** MP3 do ElevenLabs de palavras de uma sílaba (брат вот день дом друг кот кто мой мы нет нос сок сон стол там хор час). Os 17 originais estão guardados em `C:\site\amostras-audio-russo\originais-elevenlabs\` e no git (`git checkout -- public/audio/v2/ru/<hash>.mp3` volta um deles).
- **Os 17 trocados também tocam no curso de russo (aula 1)**, que passa a ter duas vozes (estas, em Vosk; o resto, em ElevenLabs). Avaliar se vale trocar o curso inteiro.
- `public/audio/v2/ru/index.json` foi refeito com `node scripts/indexar-audio-v2.mjs --idioma=ru` (655 → 681). O `manifest.json` do ElevenLabs não foi alterado, e `gerar-audios-eleven.mjs` nunca sobrescreve, então não desfaz esta troca.
- Conferido no site (servidor de desenvolvimento): os 67 textos em russo da página têm MP3 (HTTP 200), e o botão do *кот* toca a gravação nova (7.775 bytes).
- Não verificado: o sotaque, que depende do ouvido de um falante nativo.
- Ferramentas e modelos ficaram num ambiente temporário fora do projeto (Piper, Vosk, Whisper e ffmpeg via pip, ~1,5 GB); nada disso entrou no repositório.

Para os outros idiomas: `content/audio/<id>-alfabeto-gravar.csv` lista as palavras sem MP3 (de 14, fr 16, it 8, es 14). Cada MP3 vira `<hash>.mp3` (nome da coluna `arquivo`) em `public/audio/v2/<id>/`, e `node scripts/indexar-audio-v2.mjs --idioma=<id>` refaz o índice.

## Áudio
Os botões usam `falar()` (`src/lib/audio.ts`): MP3 em `public/audio/` pelo hash do texto, ou a voz do navegador (no Windows sem voz do idioma instalada, ela não soa nativa). Das 189 palavras e placas distintas, o **russo agora tem 67 de 67 com MP3**; **faltam 52** nos outros idiomas (de 14, fr 16, it 8, es 14), listadas em `content/audio/<id>-alfabeto-gravar.csv` (nenhum script as lê ainda). As letras sozinhas (nomes e sons) não têm áudio: o botão de cada cartão toca a palavra de exemplo. O áudio original do *кот* (ElevenLabs, 5,7 KB) era o `0318a91e.mp3`, usado 7 vezes na aula 1 do curso.

## Verificado
- `node --import tsx scripts/testar-alfabeto.ts`: 5 idiomas, 56 perguntas; russo com 33 letras (5 + 7 + 13 + 6 + 2), cada uma em um cartão e na tabela; títulos de 30–60 e descrições de 120–160; exemplos em cirílico válidos; sem apóstrofo solto; HTML pré-renderizado completo.
- `tsc --noEmit`; `testar-dominio.ts`, `testar-titulos.ts`, `testar-seo-publico.ts`, `testar-inventario-seo.ts`; `testar-http-seo.ts` até o passo por URL (o passo seguinte, `llms.txt`, dá 404 porque este clone não tem `dist/`).
- Navegador (dev): os 5 guias e o hub em 375 px sem rolagem lateral, 33 cartões e 33 linhas na tabela do russo, teste interativo e progresso salvo, sem erro de console.

## Não verificado
- `scripts/auditar-visual.mjs` (precisa de Playwright/Chromium): a meta de 0 ocorrências **não foi medida**.
- Build completo e `testar-plataformas.mjs`: neste clone Windows o `travas-en.mjs` reprova 1.342 arquivos por fim de linha (índice LF, pasta CRLF), alheio a esta mudança. Rodar no CI.
- `lastmod` das 6 URLs novas: `npm run seo:lastmod` depois do primeiro commit.
- Produção, Search Console e indexação: nada pedido nem medido.
