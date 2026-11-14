# Vozes para materiais gratuitos: português e russo

Estado em 14/11/2026: pesquisa e recomendação; sem novas alterações em áudio ou publicação.

## Critério por conteúdo

- Explicações, instruções, tradução e navegação em português: voz pt-BR. A escolha específica deve ser aprovada após audição e verificação dos termos de uso.
- Letras russas: gravar separadamente o **nome da letra** e, quando fizer sentido, seu **som**, com descrição em português. Não anunciar áudio da letra quando o botão toca apenas um exemplo.
- Palavras e frases em russo: gravação específica ru-RU, com tonicidade revisada; prioridade para a voz Vosk-TTS 2 já escolhida pelo Felipe. Áudio de tradução, quando houver, é outro arquivo pt-BR.
- Diálogos: vozes russas em cada fala; explicações e traduções separadas em pt-BR. Para textos mistos, dividir em trechos com idioma explícito, sem confiar em detecção automática.
- Sem gravação e sem voz do navegador no idioma correto: informar que o áudio está indisponível; não apresentar pronúncia de voz de outro idioma como referência.

## Opções examinadas

1. **Vosk-TTS** — https://github.com/alphacep/vosk-tts; código Apache-2.0. O README do arquivo `vosk-model-tts-ru-0.9-multi` baixado na sessão anterior declara Apache-2.0; respectivo README do ruBERT também declara Apache-2.0. Origem dos dados de treinamento não foi conferida. Cinco vozes; Felipe escolheu `speaker_id=2`. É a referência atual para os 43 arquivos já gerados, sujeita a revisão auditiva de cada item e de exemplos mais longos.
2. **Piper** — https://github.com/OHF-Voice/piper1-gpl; motor GPL-3.0, não incluí-lo no produto sob a regra atual de reuso permissivo sem revisão. A ficha da voz `denis` declara dados e base CC0, porém isso não altera a licença do motor: https://huggingface.co/rhasspy/piper-voices/blob/main/ru/ru_RU/denis/medium/MODEL_CARD. Amostras anteriores foram inferiores no teste automático; não é a escolha atual para russo.
3. **edge-tts** — https://github.com/rany2/edge-tts; cliente do serviço on-line da Microsoft. A licença do cliente não comprova condições comerciais do serviço ou dos áudios gerados. Alternativa para avaliar pt-BR e ru-RU depois de verificar os termos aplicáveis. A documentação oficial de Azure lista `ru-RU-SvetlanaNeural` e `ru-RU-DmitryNeural`: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts. As condições do Azure não devem ser presumidas idênticas às do endpoint usado pelo edge-tts.
4. **F5-TTS** — https://github.com/SWivid/F5-TTS; código MIT, mas os modelos pré-treinados oficiais são CC-BY-NC. Não usar esses pesos na Linvuu comercial. Clonagem só com autorização do titular da voz e um modelo cujos termos permitam a finalidade. A licença de pesos alternativos deve ser verificada individualmente.
5. **Whisper** — https://github.com/openai/whisper reconhece fala, não gera voz. Ajuda a detectar erros de reconhecimento, mas não valida sotaque, tonicidade ou licenças.

## Situação no checkout

- 43 MP3 russos foram gerados localmente com Vosk voz 2: 26 novos e 17 sobrepostos a arquivos compartilhados com o curso. O Felipe pediu para manter a troca somente nesses 43. Os arquivos não estão commitados nem tiveram deploy verificado.
- Os 67 textos russos do guia atual foram verificados quanto à existência de MP3 no teste anterior. Isso não cobre as futuras 500 palavras.
- O teste anterior de 43 palavras não deve ser descrito como 43 transcrições exatas: `отель` foi reconhecido como `Атель`, aceito por aproximação. Correspondência automática não é revisão humana.
- No código atual, o exemplo da página chama `falar(texto, lang)`. O fallback usa voz do navegador, procura pelo prefixo do idioma e, se não achar, ainda pode pedir fala sem uma voz específica; não há garantia de sotaque correto. O botão da letra atualmente toca a palavra-exemplo, não o nome ou som isolado.
- Hash e caminhos existentes são compartilhados; substituir um MP3 afeta qualquer outra página que o referencie e o cache existente pode manter a versão antiga. Áudios de materiais gratuitos devem ter identificação própria antes de novas substituições.

## Para as 500 palavras

Antes de publicar: selecionar e documentar a origem de frequência e a licença; revisar tradução, contexto e acentuação; preparar áudio ru-RU com a voz escolhida em lotes; conferir por reconhecimento automático e revisão humana, sobretudo homógrafos e palavras curtas. Não prometer 500 palavras ou cobertura total de áudio antes de estarem prontas. Ainda não existem as listas completas nesta frente.
