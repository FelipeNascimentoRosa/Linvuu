import { LOCALE, T } from '../i18n';
import { Capacitor } from '@capacitor/core';
// Firebase (Authentication + Firestore). As chaves vêm de variáveis VITE_FIREBASE_* (ver docs/AUTENTICACAO.md).
// Sem elas, o login fica desativado e o site continua funcionando.
// `?? {}` deixa este módulo importável fora do Vite (testes em Node).
const env = (import.meta.env ?? {}) as Record<string, string | boolean | undefined>;

const cfg = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
};

export const authConfigurado = Boolean(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
/** Login com Google fica escondido até o provedor ser ativado no Firebase (VITE_AUTH_GOOGLE=true). */
export const googleAtivo = env.VITE_AUTH_GOOGLE === 'true'; // no app Android o login usa o seletor nativo (src/plataforma/apk/googleNativo.ts), não o popup


// Emuladores locais (só em desenvolvimento): VITE_AUTH_EMULATOR=127.0.0.1:9099, VITE_FIRESTORE_EMULATOR=127.0.0.1:8080
const emuladorAuth = env.DEV ? (env.VITE_AUTH_EMULATOR as string | undefined) : undefined;
const emuladorDb = env.DEV ? (env.VITE_FIRESTORE_EMULATOR as string | undefined) : undefined;

let appCache: Promise<import('firebase/app').FirebaseApp> | null = null;
const carregarApp = () => {
  if (!appCache) appCache = import('firebase/app').then(({ initializeApp }) => initializeApp(cfg as Record<string, string>));
  return appCache;
};

let authCache: Promise<{ auth: import('firebase/auth').Auth; m: typeof import('firebase/auth') }> | null = null;
/** Carrega o Auth só quando preciso, para não pesar a página inicial. A sessão fica salva no navegador (sobrevive ao reload). */
export function carregarAuth() {
  if (!authCache) {
    authCache = (async () => {
      const [app, m] = await Promise.all([carregarApp(), import('firebase/auth')]);
      const auth = m.getAuth(app);
      if (emuladorAuth) m.connectAuthEmulator(auth, `http://${emuladorAuth}`, { disableWarnings: true });
      try { await m.setPersistence(auth, m.browserLocalPersistence); } catch { /* segue com a persistência padrão */ }
      // E-mails do Firebase (nova senha) e janelas do Google no idioma do site.
      auth.languageCode = LOCALE.codigo;
      return { auth, m };
    })();
  }
  return authCache;
}

let dbCache: Promise<{ db: import('firebase/firestore').Firestore; f: typeof import('firebase/firestore') }> | null = null;
export function carregarDb() {
  if (!dbCache) {
    dbCache = (async () => {
      const [app, f] = await Promise.all([carregarApp(), import('firebase/firestore')]);
      const db = f.getFirestore(app);
      if (emuladorDb) {
        const [host, porta] = emuladorDb.split(':');
        f.connectFirestoreEmulator(db, host, Number(porta));
      }
      return { db, f };
    })();
  }
  return dbCache;
}

const ERROS = T.erros;
export const mensagemDeErro = (e: unknown) => {
  const code = (e as { code?: string })?.code ?? '';
  if (!ERROS[code]) console.warn('[linvuu] erro de login:', code || e);
  return ERROS[code] ?? `${ERROS.padrao}${code ? ` (${code})` : ''}`;
};
