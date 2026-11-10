# Release de loja (AAB) e checagens da Play — 24/10/2026

## Gerar o AAB (na sua máquina)
1. Gere a upload keystore (uma vez, só você guarda): `keytool -genkeypair -v -keystore linvuu-upload.jks -alias linvuu-upload -keyalg RSA -keysize 2048 -validity 10000`
2. `cp android/keystore.properties.example android/keystore.properties` e preencha (o arquivo real é ignorado pelo Git).
3. Variáveis do Firebase do app (as mesmas do `npm run app:android`) e `ANDROID_HOME`.
4. `ANDROID_VERSION_CODE=1 scripts/build-release.sh` → `dist-builds/linvuu-1.0.0-1.aab` (`applicationId com.linvuu.app`, `versionName 1.0.0`, R8 ligado). **O versionCode é sempre explícito** (o script e o Gradle recusam release sem ele): a Play só aceita um AAB com versionCode maior que o último publicado. Nova versão: `ANDROID_VERSION_CODE=2 ANDROID_VERSION_NAME=1.0.1 scripts/build-release.sh`.
O Gradle recusa `bundleRelease` sem `keystore.properties` completo; a chave de testes nunca assina release.

## O que o build do app (`VITE_ALVO=apk`) não leva
- Tela de bloqueio de preço: o app usa `AcessoLimitado` (texto neutro, sem preço); o `Paywall` do site fica só no site.
- Textos de plano/preço/renovação dos dicionários (`preco`, `precoAssinatura`, `mensalTxt`, `exAluno`, `noPix`, `tresMeses`, chaves `paywall*` e frases como "renovação automática", "LINVUU50", "assine a Linvuu", "Escolha como pagar").
- Capas `*-900.webp` (o app usa as de 600 px; o site mantém as duas).
Critério verificado: `grep -riE "renovação automática|LINVUU50|no Pix|assine a Linvuu|Escolha como pagar|paywall" dist-apk/assets/` → sem resultados.
Mantidos de propósito: `Assinatura-*.js` (tela /conta com exclusão de conta) e preços em lições de compras/vocabulário.

## Exclusão de conta
- In-app: /conta → "Excluir minha conta agora" (`POST /api/conta/excluir`, com fallback por e-mail). Não foi alterado.
- Link web público para a Play: `https://linvuu.com.br/excluir-conta` — página estática pré-renderizada, abre sem login (conferido em requisição anônima: HTTP 200, título "Excluir conta e dados da Linvuu"). Nas rotas `/en/excluir-conta` e `/es/excluir-conta` idem em inglês e espanhol. Só depende do deploy desta branch estar no ar para refletir o texto atual.

## Checklist do dia da publicação (09/11/2026)
1. **versionCode** explícito e maior que o último publicado (ver acima).
2. **App Links:** o app declara `autoVerify` para `linvuu.com.br` e `linvuu.com` em `/curso` e `/assinatura`, e abre a tela certa (`src/plataforma/apk/linksApp.ts`). A verificação só passa quando `https://<domínio>/.well-known/assetlinks.json` responde 200: defina `ANDROID_PLAY_SHA256` no Render com o SHA-256 do **certificado de assinatura do app** (Play Console → Configuração → Integridade do app → Assinatura de apps; não é o certificado de upload). Hoje responde 503 (fail-closed, correto) até isso ser feito. Conferir: `curl -s https://linvuu.com.br/.well-known/assetlinks.json` deve trazer `package_name: com.linvuu.app`, nos dois domínios.
3. **`STRIPE_PRICE_ID_USD` no Render** (mensal US$ 19,99 já criada no Stripe). Sem ela o linvuu.com não vende a mensal e o `/readyz` continua verde; o servidor registra um aviso no log na inicialização.
4. Compra de teste controlada na mensal em USD (linvuu.com) e na mensal em reais (linvuu.com.br).
