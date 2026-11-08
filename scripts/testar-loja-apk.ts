import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chavePersistente} from '../src/plataforma/apk/armazenamento';
import {rotaDoLink} from '../src/plataforma/apk/linksApp';
for(const k of ['linvuu:progresso:v1','linvuu:progresso:v1:uid:u','linvuu:pratica-apk:v1:u:en:1','linvuu:locale','linvuu:tema-app'])assert.equal(chavePersistente(k),true,k);
for(const k of ['firebase:authUser:abc','access_token','linvuu:token','outra:progresso','linvuu:medicao-id:v1'])assert.equal(chavePersistente(k),false,k);
const manifesto=fs.readFileSync('android/app/src/main/AndroidManifest.xml','utf8');assert.match(manifesto,/allowBackup="false"/);assert.match(manifesto,/dataExtractionRules=/);assert.match(manifesto,/usesCleartextTraffic="false"/);assert.doesNotMatch(manifesto,/FileProvider/);
assert.match(fs.readFileSync('android/variables.gradle','utf8'),/targetSdkVersion = 36/);
// Release de loja: versionCode explícito (sem ele o AAB sairia com 1 e a Play recusaria a atualização) e App Links verificados.
assert.match(fs.readFileSync('android/app/build.gradle','utf8'),/tarefaRelease && !suppliedCode/,'release exige ANDROID_VERSION_CODE');
assert.doesNotMatch(fs.readFileSync('scripts/build-release.sh','utf8'),/ANDROID_VERSION_CODE:-1/,'o script de release não tem versionCode padrão');
assert.match(manifesto,/android:autoVerify="true"/);assert.match(manifesto,/android:scheme="https"/);assert.match(manifesto,/BROWSABLE/);
assert.equal(rotaDoLink('https://linvuu.com.br/curso/en?x=1'),'/curso/en?x=1');
assert.equal(rotaDoLink('https://linvuu.com/assinatura'),'/assinatura');
for(const ruim of['http://linvuu.com.br/curso/en','https://evil.com/curso/en','https://linvuu.com.br/cursos-falsos','https://linvuu.com.br/conta','https://linvuu.com.br.evil.com/curso/en','javascript:alert(1)','nao e url'])assert.equal(rotaDoLink(ruim),null,ruim);
const temas=fs.readFileSync('android/app/src/main/res/values/styles.xml','utf8');assert.match(temas,/windowSplashScreenAnimatedIcon/);assert.match(temas,/postSplashScreenTheme/);
const resultados={checks:['chaves de estudo permitidas','tokens excluídos da persistência','chaves reais e navegador bloqueados','backup desativado','extração com regras','cleartext desativado','FileProvider removido','API36','splash com marca'],limite:'Análise estática e testes de funções em Node; não substitui Android, Google Play ou RevenueCat reais'};
fs.writeFileSync('design/apk/loja-rodada3-testes.json',JSON.stringify(resultados,null,2));console.log(JSON.stringify(resultados));
