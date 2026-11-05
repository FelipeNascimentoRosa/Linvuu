> **REMOVIDO em 05/11/2026 por decisão do Felipe:** o Kokoro não será usado. Os scripts e o lock Python (`scripts/audio/`) e o bloco pip do Dependabot foram retirados do repositório (histórico git preserva tudo). Este documento fica só como registro histórico.

# Kokoro local — Linvuu
Preparação e testes em 19/10/2026. Instalado no ambiente de trabalho desta conversa, NÃO no Windows de Felipe nem no Render.
A produção web não recebe Python, PyTorch ou modelos. Síntese em lote fora do servidor; MP3 final permanece independente do motor.

## O que foi verificado
- Python 3.12, Kokoro 0.9.4, Torch 2.6.0+cpu e dependências isolados.
- Modelo hexgrad/Kokoro-82M fixado em f3ff3571791e39611d31c381e3a41a3af07b4987.
- SHA256 dos pesos: 496dba118d1a58f5f3db2efc88dbdc216e0483fc89fe6e47ee1f2c53f18ad1e4.
- Frases pt-BR e en-US sintetizadas com conexões de rede bloqueadas; dois MP3 do CSV br gerados como piloto. Nenhum instalado em produção ou aprovado por escuta.
- Vozes baixadas: pf_dora, pm_alex, af_heart, am_michael, bf_emma, bm_george, ef_dora, em_alex, ff_siwis, if_sara, im_nicola.
- Francês não tem voz masculina no catálogo Kokoro verificado. Alemão/russo não são cobertos por este modelo. O programa lista pendências, sem fingir trocar idioma ou gênero.
- Os 12 CSVs atuais no Git somam 915 linhas e 90.228 caracteres em texto_falado. Não são inventário completo dos áudios existentes nem garantia de estarem atualizados com todas as revisões recentes.

## Se o Kokoro ou Hugging Face sair do ar
Os MP3 já gerados continuam funcionando. A geração também funciona com uma cópia local dos pesos, config, vozes e dependências.
O backup deve ter duas cópias independentes, uma delas sob controle do Felipe. A disponibilidade futura desta conversa não é garantia de conservação.
A ferramenta instalada foi testada sem rede. O backup separa assets e dependências Linux x86_64/Python 3.12; NÃO é instalador nativo para Windows, ARM ou macOS.
No Windows, uma opção é WSL2 com Ubuntu compatível. Python 3.12, venv e ffmpeg precisam estar disponíveis no sistema; o backup Python não inclui o sistema operacional nem todos os binários do ffmpeg.
Manter os dois ZIPs na mesma pasta e extrair ambos; a pasta resultante deve conter model/, wheels/, scripts/audio/, assets-lock.json e requirements-lock-linux-py312.txt.

Restaurar em Linux compatível:
    python3.12 -m venv .venv
    .venv/bin/python -m pip install --no-index --find-links=wheels -r requirements-lock-linux-py312.txt
    .venv/bin/python -m pip check
As wheels preservam as dependências, inclusive modelo linguístico inglês e espeak-ng loader. Mudança de sistema/arquitetura exige pacote próprio.
O arquivo SHA256SUMS.txt de cada pacote permite checar integridade; preservar licenças e atribuições incluídas, sem apresentar cópia privada como autorização irrestrita de redistribuição de dependências.

## Lotes com retomada
Planejar sem carregar modelo ou chamar serviço:
    python scripts/audio/kokoro_lote.py csv/es-lote-01.csv --limite 25

Gerar piloto offline, mantendo nomes do CSV:
    .venv/bin/python scripts/audio/kokoro_lote.py csv/br-lote-01.csv --modelo model --saida piloto-br --gerar --piloto --limite 2
    .venv/bin/python scripts/audio/kokoro_lote.py csv/es-lote-01.csv --modelo model --saida piloto-es --gerar --piloto --inicio 1 --limite 25

O padrão é somente planejar. Cada execução aceita até 150 linhas. Início usa posição no CSV, começando em 1.
O manifesto salva por arquivo: texto/voz/parâmetros por hash, integridade do áudio e status de piloto. Repetir o comando reutiliza somente arquivos íntegros com a mesma identidade; arquivos conflitantes são preservados e reportados.
Usar apenas um processo por pasta de saída. Para novo modelo/voz/texto, gerar em nova pasta e comparar antes de instalar.
Lotes menores de 25 servem para aprovação; depois até 150 por execução. Não prometer duração sem benchmark por idioma e comprimento.
Esta primeira versão rejeita textos acima de 400 caracteres ou limites de fonemas, em vez de arriscar truncamento; segmentação longa é trabalho pendente.
Pilotos não têm liberação automática de produção. O script não altera public/audio, índices ou JSON de aulas.
Saída: MP3 mono 24 kHz/48 kbps, observacoes.json e manifesto.json. A voz candidata não é garantia de pronúncia correta; ouvir antes de liberar ditados.

## Licenças e qualidade
O autor declara pesos Apache-2.0 e apresenta atribuições no README do modelo. Preservar estes textos e a licença do código.
As wheels incluem suas próprias licenças. O mecanismo de fonetização, bibliotecas e modelos auxiliares têm termos próprios; revisar obrigações antes de redistribuir um pacote de software.
Não clonar voz de pessoa nem atribuir a voz sintética a um professor real. Não aprovar espanhol europeu apenas pelo rótulo: conferir pronúncia e variante na escuta.
Ainda faltam aprovação linguística dos pilotos, segmentação longa, seleção final de vozes, cobertura alemã/russa, confirmação de direitos dos arquivos antigos e inventário atualizado por referência.

