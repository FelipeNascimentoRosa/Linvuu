# Troca de vozes: Edge TTS → ElevenLabs v4

Estado em 23/10/2026. Tudo abaixo está na main e no ar (deploy de 23/10). **Russo aprovado pelo dono (inteiro).**

## Decisões fixas
- Modelo `eleven_v4`, `language_code` explícito, configurações padrão da voz, MP3 44,1 kHz 64 kbps, `seed` derivada do hash.
- Custo real pela API: **~0,44 crédito por caractere** (cabeçalho `character-cost`), menos da metade do que o conector estima.
- Vozes (m / f):
  - russo: `VwRq6NLQB8AqRusa9F9t` Arcadees / `xcVbjGhhLIoKi3va6mAe` Viktoriya Voloshina
  - português (pt e br): `uuRRBfx9C2chYfSRNn6t` Vander Maria / `BQzELs93jJsUOf5rCb9p` Vanessa
  - inglês: `Gfpl8Yo74Is0W6cPUWWT` Max / `hpp4J3VqNfWAUOO0d1Us` Bella
  - alemão: `r8MyP4qUsq5WFFSkPdfV` Johannes / `rKiu7lQ4c5P3az3745s3` Carla Blum
  - francês: `AfbuxQ9DVtS4azaxN1W7` Léo / `6vTyAgAT8PncODBcLjRf` Claire Estelle
- Caminho versionado, para o cache nunca servir voz antiga: públicos em `public/audio/v2/<idioma>/`, pagos em `server/audio-privado-v2/<idioma>/`. O áudio do Edge continua como reserva (o app e o servidor caem nele onde não houver v2).
- Nome do arquivo = hash do texto (igual a `src/lib/audio.ts`). `manifest.json` por pasta registra voz, caracteres, créditos e duração de cada arquivo.

## Como retomar / continuar
```
ELEVENLABS_API_KEY=... node scripts/gerar-audios-eleven.mjs --idioma=de --simular
ELEVENLABS_API_KEY=... node scripts/gerar-audios-eleven.mjs --idioma=de --so=privado --ordem=aula --teto=4000
```
Nunca sobrescreve; retomável; para sozinho no teto de créditos, em custo anormal, em >15% de arquivos suspeitos ou em 8 falhas. A chave nunca vai para o código (segredo do GitHub / variável de ambiente). Revogar as chaves que foram coladas no chat.

## Feito (23/10/2026)
| Idioma | Frases | Em ElevenLabs | Falta |
|---|---:|---:|---:|
| ru | 1.980 | 1.980 | 0 |
| pt (narração) | 962 | 962 | 0 |
| br | 2.552 | 2.552 | 0 |
| en | 2.370 | 1.864 | 506 (pagas depois da aula 46) |
| de | 2.471 | 1.889 | 582 (pagas depois da aula 46) |
| fr | 1.831 | 1.477 | 354 (pagas depois da aula 46) |

Gasto total ~126,4 mil créditos. Reserva estimada ~4,5 mil (a chave não lê o saldo; conferir no painel).
Promo: `marketing/promo/linvuu-promo-{pt,en,es}.mp3` (slogan, 68 créditos).

## Plano para o que falta (decidido com o dono em 23/10)
- **Alemão:** os créditos restantes do ElevenLabs vão para cá, em ordem de aula (`--ordem=aula`).
- es e it continuam em Azure/Edge até lá.

## Pendente
- Ouvir de ouvido: sílaba tônica do russo, palavras soltas; vozes en/de/fr foram escolhidas só pelo catálogo.
- Revogar as duas chaves expostas no chat e guardar a nova como segredo do GitHub.

## Estado em 24/10/2026 (saldo ElevenLabs zerado)
Faltam só as sessões pagas depois da aula 46: **de 434, fr 353, en 506**. Até lá o site e o app tocam a voz Edge nessas falas (o Edge dessas fica no repositório de propósito). Para completar, um comando só, quando houver crédito ou outra chave:
`ELEVENLABS_API_KEY=... scripts/completar-audio-eleven.sh` (use `--simular` para só contar). Ao terminar, commitar `server/audio-privado-v2/` e então apagar o Edge equivalente com o script de comparação.
Ressalva: francês tem 54 falas da lista sem nenhum áudio (nem Edge) e inglês tem listas de glossário de livro sem áudio; conferir se aparecem ao aluno antes de gerar.
