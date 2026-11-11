// Funil real, contado no servidor (lote 4). Sem dado pessoal: o identificador do aluno ou da sessão de pagamento
// entra só como hash (sha256, 32 hex) no ID do documento, para contar cada pessoa/sessão uma vez. Nada de e-mail, nome ou uid em claro.
// Escrita: registrarFunil(). Leitura: funilPorDia(), usada por GET /api/metricas (server/medicao.ts).
import crypto from 'node:crypto';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdmin, projetoFirebase } from './firebase-admin';

export const COLECAO_FUNIL = 'funil';
export const TIPOS_FUNIL = ['sessao_1', 'sessao_8', 'checkout_aberto', 'checkout_pago'] as const;
export type TipoFunil = (typeof TIPOS_FUNIL)[number];

const dia = (ms: number) => new Date(ms).toISOString().slice(0, 10);
export const idFunil = (tipo: TipoFunil, chave: string) => crypto.createHash('sha256').update(`${tipo}:${chave}`).digest('hex').slice(0, 32);

/** Grava o evento uma única vez por (tipo, chave). Nunca lança: medir não pode derrubar login, progresso nem pagamento. */
export async function registrarFunil(tipo: TipoFunil, chave: string, ts = Date.now()): Promise<void> {
  if (!projetoFirebase) return;
  try {
    await getFirestore(firebaseAdmin()).collection(COLECAO_FUNIL).doc(idFunil(tipo, chave)).create({ e: tipo, d: dia(ts), ts });
  } catch (e) {
    const codigo = (e as { code?: number | string }).code;
    if (codigo !== 6 && codigo !== 'already-exists') console.error('funil/registrar', tipo, codigo ?? e);
  }
}

export interface DiaFunil { dia: string; contas: number; sessao1: number; sessao8: number; checkoutsAbertos: number; checkoutsPagos: number }

/** Função pura: devolve um objeto por dia, do mais antigo ao de hoje, com os 5 números do funil. */
export function funilPorDia(eventos: { e: string; d: string }[], criacaoDeContas: number[], dias: number, agora: number): DiaFunil[] {
  const mapa = new Map<string, DiaFunil>();
  for (let i = dias - 1; i >= 0; i--) {
    const d = dia(agora - i * 86_400_000);
    mapa.set(d, { dia: d, contas: 0, sessao1: 0, sessao8: 0, checkoutsAbertos: 0, checkoutsPagos: 0 });
  }
  for (const ms of criacaoDeContas) { const l = mapa.get(dia(ms)); if (l) l.contas++; }
  for (const ev of eventos) {
    const l = mapa.get(ev.d); if (!l) continue;
    if (ev.e === 'sessao_1') l.sessao1++;
    else if (ev.e === 'sessao_8') l.sessao8++;
    else if (ev.e === 'checkout_aberto') l.checkoutsAbertos++;
    else if (ev.e === 'checkout_pago') l.checkoutsPagos++;
  }
  return [...mapa.values()];
}

/** Datas de criação de conta (Firebase Auth) a partir de `desde`. Só o instante; nenhum dado da conta sai daqui. */
export async function criacoesDeConta(desde: number): Promise<number[]> {
  const auth = getAuth(firebaseAdmin());
  const out: number[] = [];
  let token: string | undefined;
  do {
    const r = await auth.listUsers(1000, token);
    for (const u of r.users) { const t = Date.parse(u.metadata.creationTime); if (Number.isFinite(t) && t >= desde) out.push(t); }
    token = r.pageToken;
  } while (token);
  return out;
}

export async function lerFunil(dias: number, agora = Date.now()) {
  const desde = agora - dias * 86_400_000;
  const [snap, contas] = await Promise.all([
    getFirestore(firebaseAdmin()).collection(COLECAO_FUNIL).where('ts', '>=', desde).limit(50_000).get(),
    criacoesDeConta(desde),
  ]);
  const eventos = snap.docs.map((x) => x.data() as { e: string; d: string });
  return {
    dias,
    desde: dia(agora - (dias - 1) * 86_400_000),
    nota: 'contas vêm do Firebase Auth (histórico completo); sessão 1/8 e checkouts só contam a partir do deploy do lote 4.',
    truncado: snap.size >= 50_000,
    total: {
      contas: contas.length,
      sessao1: eventos.filter((x) => x.e === 'sessao_1').length,
      sessao8: eventos.filter((x) => x.e === 'sessao_8').length,
      checkoutsAbertos: eventos.filter((x) => x.e === 'checkout_aberto').length,
      checkoutsPagos: eventos.filter((x) => x.e === 'checkout_pago').length,
    },
    porDia: funilPorDia(eventos, contas, dias, agora),
  };
}
