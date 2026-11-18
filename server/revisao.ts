// Revisão espaçada na conta do aluno: um documento por bloco em users/{uid}/revisao/{idioma_aula_Ssessao_Bbloco}.
// Só o servidor (Admin SDK) lê e escreve: as regras do Firestore não casam essa subcoleção, então o navegador não a alcança.
// Não toca em /api/progresso (contrato das lições concluídas) nem em users/{uid}.licoesCompletas.
//   GET /api/progresso/revisao?idioma=ru  -> { registros, truncado }
//   PUT /api/progresso/revisao            -> body { registros: RegistroBloco[] } (até 50) -> { registros: vencedores }
// Conflito: a regra de src/lib/revisao/registroBloco.ts (marca mais recente vence; o servidor devolve o vencedor).
import type { Express, Request, Response } from 'express';
import { FieldValue, getFirestore, type Firestore } from 'firebase-admin/firestore';
import { usuario } from './billing';
import { firebaseAdmin, projetoFirebase } from './firebase-admin';
import { idBloco, marcaRegistro, normalizarRegistro, validarLote, validarRegistroBloco, vence, type RegistroBloco } from '../src/lib/revisao/registroBloco';

const IDIOMA = /^[a-z]{2,3}$/;
/** Teto de blocos devolvidos por idioma. Só entram blocos com erro, então passar disso indica abuso, não uso real. */
export const LIMITE_LEITURA = 1000;

const colecao = (db: Firestore, uid: string) => db.collection('users').doc(uid).collection('revisao');
/** Lê o documento: ignora campos que este código não conhece (do servidor, como `marca`, ou de uma versão futura) e
 *  confere o resto; documento estranho vira "inexistente". */
function doDocumento(dados: unknown): RegistroBloco | null {
  if (!dados || typeof dados !== 'object') return null;
  const d = dados as Record<string, unknown>;
  const candidato: Record<string, unknown> = { idioma: d.idioma, aula: d.aula, sessao: d.sessao, bloco: d.bloco, pratica: d.pratica };
  if (d.revisao !== undefined) candidato.revisao = d.revisao;
  if (d.espacado !== undefined) candidato.espacado = d.espacado;
  return validarRegistroBloco(candidato) ? normalizarRegistro(candidato) : null;
}

/** Grava o lote numa transação: cada bloco só é substituído por um registro que vence o já guardado. Devolve o vencedor de cada um. */
export async function gravarLote(db: Firestore, uid: string, lote: RegistroBloco[]): Promise<RegistroBloco[]> {
  const col = colecao(db, uid);
  return db.runTransaction(async (t) => {
    const refs = lote.map((r) => col.doc(idBloco(r)));
    const atuais = refs.length ? await t.getAll(...refs) : [];
    return lote.map((r, i) => {
      const guardado = atuais[i].exists ? doDocumento(atuais[i].data()) : null;
      if (guardado && !vence(r, guardado)) return guardado;
      t.set(refs[i], { ...r, marca: marcaRegistro(r), atualizadoEm: FieldValue.serverTimestamp() });
      return r;
    });
  });
}

export async function lerRegistros(db: Firestore, uid: string, idioma: string): Promise<{ registros: RegistroBloco[]; truncado: boolean }> {
  const snap = await colecao(db, uid).where('idioma', '==', idioma).limit(LIMITE_LEITURA + 1).get();
  const registros = snap.docs.slice(0, LIMITE_LEITURA).map((d) => doDocumento(d.data())).filter((r): r is RegistroBloco => r !== null);
  return { registros, truncado: snap.size > LIMITE_LEITURA };
}

export function registrarRevisao(app: Express) {
  const db = () => getFirestore(firebaseAdmin());

  app.get('/api/progresso/revisao', async (req: Request, res: Response) => {
    if (!projetoFirebase) { res.status(503).json({ error: 'Indisponível no momento.' }); return; }
    const idioma = req.query.idioma;
    if (typeof idioma !== 'string' || !IDIOMA.test(idioma)) { res.status(400).json({ error: 'Pedido inválido.' }); return; }
    const u = await usuario(req);
    if (!u) { res.status(401).json({ error: 'Entre na sua conta.' }); return; }
    try {
      res.setHeader('Cache-Control', 'private, no-store');
      res.json(await lerRegistros(db(), u.uid, idioma));
    } catch {
      res.status(500).json({ error: 'Não foi possível ler a revisão.' });
    }
  });

  app.put('/api/progresso/revisao', async (req: Request, res: Response) => {
    if (!projetoFirebase) { res.status(503).json({ error: 'Indisponível no momento.' }); return; }
    const u = await usuario(req);
    if (!u) { res.status(401).json({ error: 'Entre na sua conta.' }); return; }
    const lote = validarLote(req.body);
    if (!lote) { res.status(400).json({ error: 'Pedido inválido.' }); return; }
    try {
      res.setHeader('Cache-Control', 'private, no-store');
      res.json({ registros: await gravarLote(db(), u.uid, lote) });
    } catch {
      res.status(500).json({ error: 'Não foi possível salvar a revisão.' });
    }
  });
}
