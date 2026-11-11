// Cliques em botão, contados no servidor (lote 6). Mesmo critério das visitas (lote 5): sem cookie, sem IP e sem
// identificador — cada documento é (dia, host) e o valor é um número por botão da lista fechada de src/config/ctas.ts.
// Escrita: registrarClique(), pelo POST /api/cta que o próprio site dispara. Leitura: lerCtas(), em GET /api/metricas.
import crypto from 'node:crypto';
import type { Express, Request, Response } from 'express';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { CTAS, ctaValido, type Cta } from '../src/config/ctas';
import { credencialConfigurada, firebaseAdmin, projetoFirebase } from './firebase-admin';

export const COLECAO_CTAS = 'ctas';
const dia = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const db = () => getFirestore(firebaseAdmin());
/** Campo do contador de cada botão dentro do documento do dia. `c_` evita nome que o Firestore recusa. */
export const campoCta = (cta: Cta) => `c_${cta}`;

export interface ChaveCta { host: string; cta: Cta }

/** O host entra normalizado; se não parecer um domínio, o clique não é gravado. */
export function chaveCta(host: string | undefined, cta: unknown): ChaveCta | null {
  if (!ctaValido(cta)) return null;
  const h = String(host ?? '').split(':')[0].trim().toLowerCase();
  if (!/^[a-z0-9.-]{4,80}$/.test(h)) return null;
  return { host: h, cta };
}

/** ID do documento é hash: nem host nem caminho entram como texto, e nada de IP ou cookie entra em lugar nenhum. */
export const idCta = (host: string, d: string) => crypto.createHash('sha256').update(`${d}|${host}`).digest('hex').slice(0, 32);

/** Soma 1 no (dia, host, botão). Nunca lança: medir não pode atrasar nem derrubar um clique. */
export async function registrarClique(chave: ChaveCta, ts = Date.now()): Promise<void> {
  if (!projetoFirebase || !credencialConfigurada()) return; // sem Admin, o site funciona igual e nada é gravado
  const d = dia(ts);
  try {
    await db().collection(COLECAO_CTAS).doc(idCta(chave.host, d)).set({ d, h: chave.host, n: FieldValue.increment(1), [campoCta(chave.cta)]: FieldValue.increment(1) }, { merge: true });
  } catch (e) {
    console.error('ctas/registrar', (e as { code?: number | string }).code ?? e);
  }
}

export interface LinhaCta { d: string; h: string; n: number; [campo: string]: number | string }

/** Função pura: agrega as linhas em dia, host e botão. Linha fora da janela não entra em nenhum dos três totais. */
export function agregarCtas(linhas: LinhaCta[], dias: number, agora: number) {
  const porDiaMapa = new Map<string, number>();
  for (let i = dias - 1; i >= 0; i--) porDiaMapa.set(dia(agora - i * 86_400_000), 0);
  const porHost = new Map<string, number>(), porCta = new Map<string, number>();
  let total = 0;
  for (const l of linhas) {
    const n = Number(l.n) || 0;
    if (n <= 0 || !porDiaMapa.has(l.d)) continue;
    total += n;
    porDiaMapa.set(l.d, (porDiaMapa.get(l.d) ?? 0) + n);
    porHost.set(l.h, (porHost.get(l.h) ?? 0) + n);
    for (const cta of CTAS) {
      const c = Number(l[campoCta(cta)]) || 0;
      if (c > 0) porCta.set(cta, (porCta.get(cta) ?? 0) + c);
    }
  }
  return {
    total,
    porDia: [...porDiaMapa].map(([d, cliques]) => ({ dia: d, cliques })),
    porHost: [...porHost].sort((a, b) => b[1] - a[1]).map(([host, cliques]) => ({ host, cliques })),
    porCta: [...porCta].sort((a, b) => b[1] - a[1]).map(([cta, cliques]) => ({ cta, cliques })),
  };
}

export async function lerCtas(dias: number, agora = Date.now()) {
  const desde = dia(agora - (dias - 1) * 86_400_000);
  const snap = await db().collection(COLECAO_CTAS).where('d', '>=', desde).limit(5_000).get();
  const linhas = snap.docs.map((x) => x.data() as LinhaCta);
  return {
    dias,
    nota: 'clique em botão com data-cta, contado no servidor; conta a partir do deploy do lote 6. Sem cookie e sem IP: só o total por dia, host e botão.',
    truncado: snap.size >= 5_000,
    ...agregarCtas(linhas, dias, agora),
  };
}

/** POST /api/cta: o site avisa o clique, o servidor soma e responde antes de gravar. Botão fora da lista é recusado. */
export function registrarCtas(app: Express, aoContar: (chave: ChaveCta) => void = registrarClique) {
  const producao = process.env.NODE_ENV === 'production'; // clique de teste não pode virar número no painel real
  app.post('/api/cta', (req: Request, res: Response) => {
    const chave = chaveCta(req.headers.host, (req.body ?? {}).cta);
    if (!chave) { res.status(400).json({ error: 'Botão inválido.' }); return; }
    res.status(204).end();
    if (producao) aoContar(chave);
  });
}
