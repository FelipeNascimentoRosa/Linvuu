# Áudio das aulas

## Como funciona hoje
- O site toca um **MP3 salvo** (`public/audio/<idioma>/<hash>.mp3`). Se o MP3 não existir, usa a voz do navegador e mostra o aviso «Áudio provisório».
- O **nome do arquivo** é o hash do texto (a lista de tudo que precisa de áudio está em `content/audio/<idioma>-gravar.csv`, gerada por `npm run aulas`).
- **Acento tônico é só gráfico:** o sinal (U+0301) não entra no hash nem na fala. Pôr o acento depois não muda o nome de nenhum arquivo.
- `public/audio/<idioma>/index.json` lista os MP3 que existem. O site lê essa lista antes de pedir um arquivo, então não há erro 404.
- Os MP3 ficam **no GitHub** (versionados) e são servidos pelo Render com cache de 1 ano (o nome nunca muda). O `index.json` fica 5 minutos em cache.

## Gerar os áudios (Edge TTS)
Daqui do ambiente do Claude não se alcança o servidor do Edge, então a geração roda no GitHub:
1. GitHub → **Actions** → **Gerar áudios (Edge TTS)** → **Run workflow**. Escolha o idioma (`de`) e o limite (`0` = todos os que faltam).
2. O workflow gera só o que falta (nunca sobrescreve), guarda um `.zip` para ouvir (em **Artifacts**, no fim da página da execução) e salva os MP3 num ramo `audio/<idioma>-<n>`.
3. **Ouça o `.zip`.** Gostou? Abra um pull request do ramo para a `main` e mescle. Não gostou? Feche o PR; nada entra na `main`.

**Piloto de vozes:** subir um ramo `piloto-audio/<nome>` gera 15 áudios espalhados (com a voz masculina e a feminina) e só guarda o `.zip`. O relatório da execução diz qual arquivo é qual frase.

**No seu computador (alternativa):** `npm install`, depois `node scripts/gerar-audios.mjs --idioma=de` (ou `--simular` para ver o que seria gerado).

## Vozes
- Padrão: alemão `de-DE-ConradNeural` (masculina) e `de-DE-KatjaNeural` (feminina); russo `ru-RU-DmitryNeural` e `ru-RU-SvetlanaNeural`.
- Para trocar, defina `EDGE_VOZ_DE_M`, `EDGE_VOZ_DE_F` (e `RU`, `GB`, `ES`, `FR`, `BR`) no workflow ou no terminal.
- Quem fala cada frase de diálogo: `content/idiomas/<idioma>/vozes.json` (`f` = feminina, `m` = masculina). Personagem que não estiver na lista usa a voz padrão e aparece um aviso ao rodar `npm run aulas`.
- Para **refazer** um áudio específico: `node scripts/gerar-audios.mjs --idioma=de --refazer=b42c0ebf` (apague o arquivo e gere de novo).

## Substituir por voz humana
Grave, exporte em MP3 e salve com o **mesmo nome** (`<hash>.mp3`) em `public/audio/<idioma>/`. O gerador não sobrescreve arquivos existentes.

## Cuidados
- **O Edge TTS não é uma API oficial da Microsoft.** Ele usa o recurso «ler em voz alta» do navegador Edge: a Microsoft pode mudá-lo ou limitá-lo sem aviso, e o uso comercial não tem contrato. Por isso os MP3 são **salvos no repositório**: se o serviço mudar, os áudios já gerados continuam funcionando.
- Para um serviço oficial, com as mesmas vozes e controle de pronúncia, use o **Azure AI Speech** (o Felipe planeja usá-lo para o russo). O ponto de troca é a função `sintetizar` em `scripts/gerar-audios.mjs`.
- **Tamanho:** cada MP3 tem ~11 KB (uma palavra) a ~30 KB (uma frase longa). Os dois idiomas completos devem somar de 15 a 30 MB, muito abaixo do limite do GitHub (recomendação: repositório abaixo de 1 GB).
- **Backup:** `git clone --mirror https://github.com/FelipeNascimentoRosa/Linvuu.git` guarda tudo (código, aulas e MP3) numa pasta que você copia para um HD externo.
- **Migrar para Firebase Storage (se o tamanho crescer):** envie `public/audio/<idioma>/` para um bucket e aponte `VITE_AUDIO_BASE_URL` para ele no Render. Os nomes dos arquivos não mudam.
