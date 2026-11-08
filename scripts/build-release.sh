#!/usr/bin/env bash
# Release de loja do Linvuu: AAB com.linvuu.app, R8 ativo, assinado pela SUA chave de upload.
#   1) build web do app (VITE_ALVO=apk) -> 2) cap sync -> 3) ./gradlew bundleRelease -> 4) verificação da assinatura.
# Pré-requisito: android/keystore.properties (modelo em android/keystore.properties.example; fica fora do Git).
# A upload keystore é gerada e guardada por você; este script nunca a cria, a envia ou a imprime.
# Obrigatória: ANDROID_VERSION_CODE (sem padrão). Opcionais: ANDROID_VERSION_NAME (padrão 1.0.0), ANDROID_HOME, GRADLE_BIN.
set -euo pipefail
cd "$(dirname "$0")/.."

props="android/keystore.properties"
[ -f "$props" ] || { echo "Falta $props. Copie android/keystore.properties.example e preencha com a sua chave de upload." >&2; exit 1; }
lido() { grep -E "^$1=" "$props" | head -1 | cut -d= -f2-; }
ks="$(lido storeFile)"; alias_="$(lido keyAlias)"; senha="$(lido storePassword)"
[ -n "$ks" ] && [ -n "$alias_" ] && [ -n "$senha" ] && [ -n "$(lido keyPassword)" ] || { echo "$props incompleto (storeFile, storePassword, keyAlias, keyPassword)." >&2; exit 1; }
case "$ks" in /*) ksabs="$ks" ;; *) ksabs="android/$ks" ;; esac
[ -f "$ksabs" ] || { echo "Keystore não encontrada em $ksabs." >&2; exit 1; }

# O versionCode é sempre explícito: a Play recusa um AAB cujo versionCode não seja maior que o último publicado.
[ -n "${ANDROID_VERSION_CODE:-}" ] || { echo "Defina ANDROID_VERSION_CODE (inteiro maior que o último publicado na Play). Primeira publicação: 1." >&2; exit 1; }
export ANDROID_VERSION_CODE ANDROID_VERSION_NAME="${ANDROID_VERSION_NAME:-1.0.0}"
[[ "$ANDROID_VERSION_CODE" =~ ^[0-9]+$ ]] || { echo "ANDROID_VERSION_CODE deve ser inteiro." >&2; exit 1; }
export LINVUU_SOURCE_SHA="$(git rev-parse HEAD 2>/dev/null || echo)" VITE_APK_BUILD_ID="release $(git rev-parse --short HEAD 2>/dev/null || echo local)"

# 1) e 2): build web (VITE_ALVO=apk) + cap sync. O script do app recusa configuração de compra/Firebase incompleta.
npm run app:android

# 3) AAB de release
G=./gradlew; [ -x android/gradlew ] || G=gradle; [ -n "${GRADLE_BIN:-}" ] && G="$GRADLE_BIN"
(cd android && echo "sdk.dir=${ANDROID_HOME:?Defina ANDROID_HOME}" > local.properties && "$G" bundleRelease --no-daemon)
aab="android/app/build/outputs/bundle/release/app-release.aab"
[ -f "$aab" ] || { echo "AAB não gerado: $aab" >&2; exit 1; }

# 4) Verificações: assinatura, identidade do pacote e ausência de .teste
saida=$(jarsigner -verify -certs "$aab" 2>&1 || true)
echo "$saida" | grep -q "jar verified" || { echo "Assinatura do AAB não verificou:" >&2; echo "$saida" | tail -5 >&2; exit 1; }
echo "$saida" | grep -qi "CN=Android Debug" && { echo "AAB assinado com chave de debug." >&2; exit 1; }
impressao=$(keytool -list -v -keystore "$ksabs" -alias "$alias_" -storepass "$senha" 2>/dev/null | grep -E "SHA256:" | head -1 | sed 's/^ *//')
manifesto=$(unzip -p "$aab" base/manifest/AndroidManifest.xml | strings | tr -d '\0')
echo "$manifesto" | grep -q "com.linvuu.app" || { echo "applicationId com.linvuu.app não encontrado no AAB." >&2; exit 1; }
echo "$manifesto" | grep -q "com.linvuu.app.teste" && { echo "AAB com sufixo .teste." >&2; exit 1; }

mkdir -p dist-builds
nome="linvuu-${ANDROID_VERSION_NAME}-${ANDROID_VERSION_CODE}.aab"; cp "$aab" "dist-builds/$nome"
sha=$(sha256sum "dist-builds/$nome" | cut -d' ' -f1)
echo "OK  dist-builds/$nome"
echo "    applicationId=com.linvuu.app  versionCode=$ANDROID_VERSION_CODE  versionName=$ANDROID_VERSION_NAME"
echo "    sha256=$sha"
echo "    certificado de upload ($impressao): confira que é o registrado no Play Console."
