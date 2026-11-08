// Avaliações de alunos. Coleção `avaliacoes/{dominio}_{uid}` no Firestore, gravada SÓ pelo servidor (Admin SDK):
// as regras do Firestore continuam negando tudo ao navegador, então não existe escrita aberta nem nota falsa direto no banco.
//  - POST /api/avaliacoes (exige login): o aluno precisa ter concluído pelo menos AULAS_MIN aulas. Nasce com status "pendente".
//  - GET  /api/avaliacoes: devolve só as "aprovada" do domínio da requisição (.com.br ou .com).
//  - A aprovação é manual (status → "aprovada" ou "recusada"); nada aparece no site sem ela.
import type { Express, Request, Response } from 'express';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { aprovadasPorDominio, AULAS_MIN, resumo, validarAvaliacao, type AvaliacaoPublica, type DominioAvaliacao } from '../src/config/avaliacoes';
import { usuario } from './billing';
import { perfilDaRequisicao } from './dominio';
import { firebaseAdmin, projetoFirebase } from './firebase-admin';

const COLECAO = 'avaliacoes';
const db = () => getFirestore(firebaseAdmin());
const dominioDe = (req: Request): DominioAvaliacao => (perfilDaRequisicao(req) === 'global' ? 'global' : 'br');

/** Lê as aprovadas de um domínio, da mais recente para a mais antiga. */
export async function lerAprovadas(dominio: DominioAvaliacao): Promise<AvaliacaoPublica[]> {
  const snap = await db().collection(COLECAO).where('dominio', '==', dominio).where('status', '==', 'aprovada').get();
  return snap.docs
    .map((d) => d.data())
    .map((d) => ({
      nome: String(d.nome ?? ''), nota: Number(d.nota), texto: String(d.texto ?? ''), relacao: d.relacao === 'conhece-professor' ? 'conhece-professor' as const : 'nenhuma' as const,
      aulas: Number(d.aulasFeitas ?? 0), em: (d.criadoEm?.toDate?.() as Date | undefined)?.toISOString().slice(0, 10) ?? '',
    }))
    .filter((a) => a.nome && a.texto && a.nota >= 1 && a.nota <= 5)
    .sort((a, b) => b.em.localeCompare(a.em));
}

let ultima = 0;
/** Atualiza o cache usado pelo JSON-LD do servidor (sincrono na montagem do HTML) e pelo GET. */
export async function atualizarCache(): Promise<void> {
  if (!projetoFirebase) return;
  try {
    const [br, global] = await Promise.all([lerAprovadas('br'), lerAprovadas('global')]);
    aprovadasPorDominio.br = br; aprovadasPorDominio.global = global; ultima = Date.now();
  } catch { /* mantém o cache anterior; o site segue sem avaliações novas */ }
}

export function registrarAvaliacoes(app: Express) {
  if (projetoFirebase) { void atualizarCache(); setInterval(() => void atualizarCache(), 5 * 60_000).unref(); }

  app.get('/api/avaliacoes', async (req: Request, res: Response) => {
    if (!projetoFirebase) { res.json({ itens: [], total: 0, media: null, contadas: 0 }); return; }
    if (Date.now() - ultima > 10 * 60_000) await atualizarCache();
    const itens = aprovadasPorDominio[dominioDe(req)];
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json({ itens, ...resumo(itens) });
  });

  app.post('/api/avaliacoes', async (req: Request, res: Response) => {
    if (!projetoFirebase) { res.status(503).json({ error: 'Indisponível no momento.' }); return; }
    // Campo-isca: invisível para pessoas; se vier preenchido é robô. Responde como sucesso, sem gravar.
    if (typeof req.body?.ref_extra_av === 'string' && req.body.ref_extra_av !== '') { res.status(204).end(); return; }
    const u = await usuario(req);
    if (!u) { res.status(401).json({ error: 'Entre na sua conta.', codigo: 'login' }); return; }
    const v = validarAvaliacao(req.body);
    if (!v) { res.status(400).json({ error: 'Pedido inválido.', codigo: 'invalido' }); return; }
    try {
      const perfil = await db().collection('users').doc(u.uid).get();
      const lista = perfil.exists ? perfil.data()?.licoesCompletas : [];
      const aulasFeitas = Array.isArray(lista) ? lista.length : 0;
      if (aulasFeitas < AULAS_MIN) { res.status(403).json({ error: 'Conclua as aulas gratuitas para avaliar.', codigo: 'poucas-aulas' }); return; }
      const dominio = dominioDe(req);
      await db().collection(COLECAO).doc(`${dominio}_${u.uid}`).create({
        uid: u.uid, dominio, nota: v.nota, texto: v.texto, nome: v.nome, relacao: v.relacao, aulasFeitas,
        status: 'pendente', criadoEm: FieldValue.serverTimestamp(), consentimento: true,
      });
      res.status(204).end();
    } catch (e) {
      if ((e as { code?: number | string })?.code === 6 || (e as { code?: string })?.code === 'already-exists') { res.status(409).json({ error: 'Você já enviou uma avaliação.', codigo: 'duplicada' }); return; }
      res.status(500).json({ error: 'Não foi possível registrar.', codigo: 'erro' });
    }
  });
}
