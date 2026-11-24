# Áudio pago fora do repositório público

**Problema (auditoria de 09/11/2026):** `server/audio-privado/` e `server/audio-privado-v2/` (11.039 MP3, ~232 MB, o produto pago) estavam neste repositório, que é público. Qualquer pessoa podia baixá-los sem assinar.

**Solução:** o áudio vive no repositório **privado** `FelipeNascimentoRosa/Linvuu-Audio`. O build do Render o baixa para `.audio-privado/` (`scripts/audio-privado.mjs`) e a rota `/api/audio` o serve só com assinatura ativa (`server/audio-privado.ts`). O v2 tem prioridade; o antigo é reserva.

**Na Vercel o áudio não vem do disco:** o pacote da função não comporta os 232 MB. O áudio pago vive num bucket **privado** do Cloudflare R2 e a rota responde 302 para uma URL pré-assinada — ver `docs/infra/R2-AUDIO-PRIVADO.md` (activação, upload e variáveis). Sem as variáveis do R2, a rota cai para o disco, como aqui.

## Autenticação do build: chave SSH (feito em 09/11/2026) ou token
O build baixa o repositório privado com uma **deploy key SSH somente leitura** (título "render-linvuu-audio (somente leitura)" em Linvuu-Audio → Settings → Deploy keys). A chave privada (base64) está na variável `AUDIO_DEPLOY_KEY` do Render. Ela não expira e só enxerga o `Linvuu-Audio`. Para trocar: gere outra com `ssh-keygen -t ed25519 -N ""`, cadastre a pública como deploy key somente leitura, ponha a privada em base64 no Render e remova a antiga. O token (`AUDIO_REPO_TOKEN`) continua aceito como alternativa.

## Passo a passo com token (alternativa)
1. **Token (você):** GitHub → Settings → Developer settings → Fine-grained tokens → só o repositório `Linvuu-Audio`, permissão **Contents: Read-only**, validade de 1 ano. Copie.
2. **Render (você):** serviço `linvuu` → Environment → `AUDIO_REPO_TOKEN` = o token. Faça o deploy deste PR.
3. **Conferir em produção (você):** abrir uma sessão paga com assinatura ativa e ouvir; `GET /api/audio/<idioma>/<hash>.mp3` sem login deve dar 401 e, com assinatura, 200. O log do build mostra `audio-privado: N MP3 baixados`.
4. **Só depois do passo 3:** remover `server/audio-privado*` do histórico (abaixo) e confirmar de novo.
Se o passo 3 falhar, nada foi perdido: o site ainda lê a origem antiga em `server/`.

## Limpar o histórico (passo 4, destrutivo)
Apagar a pasta num commit não basta: o histórico do Git guarda tudo. Exige `git filter-repo` e um force push, que o `AGENTS.md` proíbe por padrão; o Felipe autorizou esta operação em 09/11/2026. Antes: avisar todo agente/máquina com clone, pois ele terá de clonar de novo.
```bash
git clone --mirror https://github.com/FelipeNascimentoRosa/Linvuu.git linvuu-limpo.git && cd linvuu-limpo.git
git filter-repo --invert-paths --path server/audio-privado --path server/audio-privado-v2
git push --force --mirror
```
Depois, peça ao suporte do GitHub para apagar objetos em cache e as referências `refs/pull/*` antigas. **Quem já clonou o repositório ainda tem uma cópia do áudio**: limpar o histórico impede novas cópias, não recolhe as antigas.

## Áudio novo
Os geradores (`scripts/gerar-audios*.mjs`) ainda escrevem em `server/audio-privado*`, agora ignorado pelo Git. Depois de gerar, copie os MP3 pagos para o repositório `Linvuu-Audio`, faça commit lá e faça um novo deploy do site (o build baixa a versão mais recente).
