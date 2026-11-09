// Registro durável do acesso pago: coleção `acessos/{uid}` no Firestore, escrita só pelo servidor (Admin SDK).
// O navegador não lê nem escreve aqui: firestore.rules nega tudo fora de users/{uid} (bloco «match /{document=**}»).
//
// Para que serve (o Stripe continua sendo a fonte da verdade):
//  - o webhook grava o resultado recalculado a cada evento de cobrança; vale para todas as instâncias e sobrevive a
//    reinícios (antes, a invalidação vivia na memória de um processo só);
//  - guarda o instante em que cada pagamento foi confirmado (o pacote conta a partir daí);
//  - marca as conversões já enviadas (Meta, TikTok, PostHog), para uma compra nunca contar duas vezes.
// Sem credencial do Firebase, tudo aqui vira «sem registro» e o acesso é calculado direto no Stripe, como antes.
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdmin } from './firebase-admin';
import type { Acesso } from './acesso-calculo';

const COLECAO = 'acessos';
/** Quanto tempo um registro vale sem nova consulta ao Stripe. Eventos do webhook o renovam na hora. */
export const VALIDADE_REGISTRO_MS = 10 * 60_000;

export type Registro = { uid: string; cliente?: string; acesso?: Acesso; atualizadoEm?: number; pagamentos?: Record<string, number> };

let avisou = false;
const avisar = (e: unknown) => { if (!avisou) { avisou = true; console.error('[Linvuu] Registro de acesso indisponível; usando só o Stripe.', e instanceof Error ? e.message : ''); } };
const db = () => getFirestore(firebaseAdmin());

export async function lerRegistro(uid: string): Promise<Registro | null> {
  try {
    const s = await db().collection(COLECAO).doc(uid).get();
    return s.exists ? (s.data() as Registro) : null;
  } catch (e) { avisar(e); return null; }
}

export async function gravarRegistro(uid: string, dados: Omit<Partial<Registro>, 'uid'>): Promise<void> {
  try { await db().collection(COLECAO).doc(uid).set({ ...dados, uid }, { merge: true }); } catch (e) { avisar(e); }
}

/** Reserva o envio de uma conversão (uma vez por pagamento, mesmo com eventos repetidos em paralelo). */
export async function reservarConversao(uid: string, pagamento: string): Promise<boolean> {
  try {
    await db().collection(COLECAO).doc(uid).collection('conversoes').doc(pagamento).create({ em: Date.now() });
    return true;
  } catch (e) {
    const c = (e as { code?: number | string })?.code;
    if (c === 6 || c === 'already-exists') return false;
    avisar(e);
    return false; // sem registro não há como garantir envio único: melhor não enviar
  }
}
export async function liberarConversao(uid: string, pagamento: string): Promise<void> {
  try { await db().collection(COLECAO).doc(uid).collection('conversoes').doc(pagamento).delete(); } catch { /* fica reservado; nada a fazer */ }
}

export const registroFresco = (r: Registro | null, agora = Date.now()): r is Registro & { acesso: Acesso } =>
  !!r?.acesso && typeof r.atualizadoEm === 'number' && agora - r.atualizadoEm < VALIDADE_REGISTRO_MS
  // pacote que venceu depois da gravação não continua valendo
  && !(r.acesso.ativa && r.acesso.via === 'trimestral' && (r.acesso.ate ?? 0) * 1000 <= agora);

/** O registro só serve de atalho quando CONFIRMA acesso. Ele guarda o resultado do Stripe; «sem acesso» no registro não prova
 * que não há acesso por outra origem (Google Play via RevenueCat). Nesse caso a consulta completa é refeita. */
export const acessoDoRegistro = (r: Registro | null, agora = Date.now()): Acesso | null =>
  registroFresco(r, agora) && r.acesso.ativa ? r.acesso : null;
