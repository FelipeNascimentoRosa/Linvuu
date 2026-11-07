# Pasta de quarentena — Felipe pode apagar esta pasta inteira

Tudo aqui foi **movido** (nada foi apagado) em 07/11/2026 por não ter mais nenhuma referência no código, no servidor, nos scripts, no CI nem no site em produção. Cada item abaixo tem a prova.

| O que | De onde veio | Por que sobra | Prova (rodada em `origin/main` 588c8274) |
|---|---|---|---|
| 7 PNGs de mascotes antigos (batata, tomate, pelmeni, pretzel, croissant, pastel, ampulheta/ímã) | `public/mascots/` | O Vuu é o mascote oficial desde 29/10/2026 (`public/assets/vuu/`). Estas imagens eram servidas em `linvuu.com/mascots/…` | `git grep -n "mascots/"` fora de `content/` e do próprio script: 0 resultados; o campo `mascote` do `cursos.json` nunca era renderizado (`grep -rn "\.mascote" src` = 0) |
| `scripts/generate_all_mascots.js` | `scripts/` | Gerava os mascotes antigos; ninguém o chama | `git grep generate_all_mascots`: 0 |
| 32 arquivos de mascotes (PNG+SVG) do site estático antigo | `content/legado/site-estatico/**/mascots/` | Cópia do site HTML anterior à migração para Vite; o README do legado diz que não entra no build | `git grep "content/legado"` só aparece em docs históricos |
| `linvuu-promo-es.mp3` | `marketing/promo/` | Promo do site em espanhol, retirado em 06/11/2026 | `git grep linvuu-promo-es`: 0 |
| `medicao-20261019.json` | `docs/infra/` | Medição antiga de 19/10; não é lida por nenhum script | `git grep medicao-20261019`: 0 |

## Para apagar
`git rm -r _PARA-APAGAR-FELIPE` num commit seu, ou apague a pasta pelo GitHub (botão "Delete directory").
O histórico do Git continua guardando tudo; se quiser apagar também do histórico, isso é uma operação à parte (reescrita de histórico) e só com ordem explícita sua e backup antes.

## NÃO foi movido (precisa de decisão sua, e por quê)
- `content/legado/` (restante, ~4 MB): alemão e russo antigos; o README diz que é fonte para o player de aula. Se não precisa mais, é a próxima pasta a entrar aqui.
- `docs/infra/PILOTO-R2-*`, `manifesto-piloto-publico-*`, `simulacao-migracao-*`: plano do R2, que ainda está no roteiro.
- `server/audio-privado/` (90 MB, voz antiga Edge): o código ainda cai nele quando uma frase não foi regravada na voz nova (`server/billing.ts:185`). Apagar agora quebraria áudio de aluno pagante.
- `public/audio/v2/` e `server/audio-privado-v2/`: áudio em uso.
