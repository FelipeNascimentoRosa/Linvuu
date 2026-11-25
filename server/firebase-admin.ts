// Inicialização única do Firebase Admin (usado por billing.ts e progresso.ts).
// Ordem da credencial:
//   1. FIREBASE_SERVICE_ACCOUNT_JSON: o JSON da conta de serviço inteiro, numa variável de ambiente.
//   2. GOOGLE_APPLICATION_CREDENTIALS: caminho de um arquivo JSON (Secret File na Vercel: /etc/secrets/...).
// Sem nenhuma das duas, falha na hora com mensagem clara. Não tenta a credencial padrão do Google (ADC): na Vercel ela não
// existe, a busca demora e o erro dela escapava do try/catch e derrubava o servidor inteiro.
// A chave nunca é impressa nem enviada ao navegador.
import fs from 'node:fs';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';

const projeto = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;

function credencial() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) return cert(JSON.parse(json));
  const arquivo = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (arquivo && fs.existsSync(arquivo)) return cert(JSON.parse(fs.readFileSync(arquivo, 'utf8')));
  throw new Error('Firebase Admin sem credencial: defina FIREBASE_SERVICE_ACCOUNT_JSON (ou GOOGLE_APPLICATION_CREDENTIALS apontando para um arquivo existente).');
}

/** Há credencial configurada? (para avisar no início do servidor) */
export const credencialConfigurada = () => !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON || !!(process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS));

let app: App | null = null;
/** Devolve o app do Firebase Admin, criando-o na primeira chamada. Lança erro se a credencial não existir. */
export function firebaseAdmin(): App {
  if (app) return app;
  app = getApps()[0] ?? initializeApp({ credential: credencial(), projectId: projeto });
  return app;
}
export const projetoFirebase = projeto;
