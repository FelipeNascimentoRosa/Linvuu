// Medição do aprendizado (só chega aqui quem aceitou). Sem conta, e-mail ou nome: um identificador aleatório do navegador + eventos de exercício.
// POST /api/evento  grava em lote.   GET /api/metricas  relatório agregado, só com o token METRICAS_TOKEN (sem ele, a rota não existe).
import crypto from 'node:crypto';
import type { Express, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdmin, projetoFirebase } from './firebase-admin';
import { lerFunil } from './funil';

const COLECAO = 'eventos';
const ID = /^[a-f0-9]{32}$/;
const IDIOMA = /^[a-z]{2,3}$/;
const EXERCICIO = /^[a-z]{2,3}-\d{3}-[a-z0-9]{1,8}$/;
const TIPO = /^[a-z-]{2,24}$/;
const db = () => getFirestore(firebaseAdmin());
const dia = (ms: number) => new Date(ms).toISOString().slice(0, 10);

type Ev = { t: 'ex'; idioma: string; ex: string; tp: string; ok: 0 | 1 } | { t: 'fim'; idioma: string; aula: number; ac: number; tot: number };

export function validar(corpo: unknown): { id: string; eventos: Ev[] } | null {
  const b = corpo as { id?: unknown; eventos?: unknown } | null;
  if (!b || typeof b.id !== 'string' || !ID.test(b.id) || !Array.isArray(b.eventos) || b.eventos.length === 0 || b.eventos.length > 60) return null;
  const eventos: Ev[] = [];
  for (const e of b.eventos as Record<string, unknown>[]) {
    if (e?.t === 'ex' && typeof e.idioma === 'string' && IDIOMA.test(e.idioma) && typeof e.ex === 'string' && EXERCICIO.test(e.ex) && typeof e.tp === 'string' && TIPO.test(e.tp) && (e.ok === 0 || e.ok === 1)) eventos.push({ t: 'ex', idioma: e.idioma, ex: e.ex, tp: e.tp, ok: e.ok });
    else if (e?.t === 'fim' && typeof e.idioma === 'string' && IDIOMA.test(e.idioma) && Number.isInteger(e.aula) && Number.isInteger(e.ac) && Number.isInteger(e.tot) && (e.aula as number) >= 0 && (e.aula as number) <= 1000 && (e.tot as number) >= 0 && (e.tot as number) <= 500 && (e.ac as number) >= 0 && (e.ac as number) <= (e.tot as number)) eventos.push({ t: 'fim', idioma: e.idioma, aula: e.aula as number, ac: e.ac as number, tot: e.tot as number });
    else return null;
  }
  return { id: b.id, eventos };
}

interface Linha { u: string; d: string; t: string; idioma: string; ex?: string; tp?: string; ok?: number; aula?: number; ac?: number; tot?: number }

/** Conta o que importa para saber se o aluno evolui. Função pura: testável sem o Firestore. */
export function agregar(linhas: Linha[], hoje: string) {
  const porUsuario = new Map<string, Linha[]>();
  for (const l of linhas) { const a = porUsuario.get(l.u) ?? []; a.push(l); porUsuario.set(l.u, a); }
  const ms = (d: string) => Date.parse(`${d}T00:00:00Z`);
  const dias = (a: string, b: string) => Math.round((ms(b) - ms(a)) / 86_400_000);
  let comSessaoCompleta = 0, elegiveis7 = 0, voltaram7 = 0, elegiveis1 = 0, voltaram1 = 0, comDoisDias = 0, melhoraram = 0, exTotal = 0;
  const diasAtivos = new Map<string, Set<string>>();
  for (const [u, ls] of porUsuario) {
    const ds = [...new Set(ls.map((l) => l.d))].sort();
    for (const d of ds) { const s = diasAtivos.get(d) ?? new Set(); s.add(u); diasAtivos.set(d, s); }
    if (ls.some((l) => l.t === 'fim')) comSessaoCompleta++;
    exTotal += ls.filter((l) => l.t === 'ex').length;
    const primeiro = ds[0];
    if (dias(primeiro, hoje) >= 1) { elegiveis1++; if (ds.some((d) => dias(primeiro, d) === 1)) voltaram1++; }
    if (dias(primeiro, hoje) >= 7) { elegiveis7++; if (ds.some((d) => { const x = dias(primeiro, d); return x >= 1 && x <= 7; })) voltaram7++; }
    if (ds.length >= 2) {
      const taxa = (d: string) => { const e = ls.filter((l) => l.d === d && l.t === 'ex'); return e.length >= 5 ? e.filter((l) => l.ok === 1).length / e.length : null; };
      const a = taxa(ds[0]), z = taxa(ds[ds.length - 1]);
      if (a !== null && z !== null) { comDoisDias++; if (z > a) melhoraram++; }
    }
  }
  const pct = (a: number, b: number) => (b ? Math.round((a / b) * 1000) / 10 : null);
  const ex = linhas.filter((l) => l.t === 'ex');
  const porTipo: Record<string, { n: number; acerto: number | null }> = {};
  const porExercicio = new Map<string, { n: number; ok: number }>();
  for (const l of ex) {
    const t = (porTipo[l.tp ?? '?'] ??= { n: 0, acerto: 0 }); t.n++; t.acerto = (t.acerto ?? 0) + (l.ok ?? 0);
    const e = porExercicio.get(l.ex ?? '?') ?? { n: 0, ok: 0 }; e.n++; e.ok += l.ok ?? 0; porExercicio.set(l.ex ?? '?', e);
  }
  for (const t of Object.values(porTipo)) t.acerto = pct(t.acerto ?? 0, t.n);
  const piores = [...porExercicio].filter(([, v]) => v.n >= 20).map(([k, v]) => ({ exercicio: k, respostas: v.n, acerto: pct(v.ok, v.n) })).sort((a, b) => (a.acerto ?? 0) - (b.acerto ?? 0)).slice(0, 15);
  return {
    usuarios: porUsuario.size,
    comSessaoCompleta: { n: comSessaoCompleta, pct: pct(comSessaoCompleta, porUsuario.size) },
    retornoDia1: { elegiveis: elegiveis1, voltaram: voltaram1, pct: pct(voltaram1, elegiveis1) },
    retornoSemana: { elegiveis: elegiveis7, voltaram: voltaram7, pct: pct(voltaram7, elegiveis7) },
    exerciciosPorUsuario: porUsuario.size ? Math.round((exTotal / porUsuario.size) * 10) / 10 : null,
    acertoPrimeiroVsUltimoDia: { usuariosComDoisDias: comDoisDias, melhoraram: melhoraram, pct: pct(melhoraram, comDoisDias), aviso: 'Indício, não prova: quem volta já é mais engajado.' },
    ativosPorDia: Object.fromEntries([...diasAtivos].sort().map(([d, s]) => [d, s.size])),
    acertoPorTipo: porTipo,
    exerciciosMaisDificeis: piores,
  };
}

export function registrarMedicao(app: Express) {
  app.post('/api/evento', async (req: Request, res: Response) => {
    if (!projetoFirebase) { res.status(204).end(); return; }
    const v = validar(req.body);
    if (!v) { res.status(400).json({ error: 'Pedido inválido.' }); return; }
    try {
      const agora = Date.now(); const lote = db().batch();
      for (const e of v.eventos) lote.set(db().collection(COLECAO).doc(), { u: v.id, d: dia(agora), ts: agora, ...e });
      await lote.commit();
      res.status(204).end();
    } catch { res.status(500).json({ error: 'Não foi possível registrar.' }); }
  });

  app.get('/api/metricas', async (req: Request, res: Response) => {
    const token = process.env.METRICAS_TOKEN;
    if (!token || token.length < 24) { res.status(404).json({ error: 'Não encontrado.' }); return; }
    const dado = Buffer.from(String(req.headers.authorization ?? '').replace(/^Bearer /, ''));
    const certo = Buffer.from(token);
    if (dado.length !== certo.length || !crypto.timingSafeEqual(dado, certo)) { res.status(404).json({ error: 'Não encontrado.' }); return; }
    if (!projetoFirebase) { res.status(503).json({ error: 'Indisponível.' }); return; }
    const dd = Math.min(90, Math.max(1, Number(req.query.dias) || 30));
    try {
      const desde = Date.now() - dd * 86_400_000;
      const snap = await db().collection(COLECAO).where('ts', '>=', desde).limit(50_000).get();
      const linhas = snap.docs.map((x) => x.data() as Linha);
      res.setHeader('Cache-Control', 'private, no-store');
      // O funil falhar (ex.: permissão de listar usuários) não pode esconder o relatório de aprendizado.
      const funil = await lerFunil(dd).catch((e) => { console.error('metricas/funil', e); return { erro: 'Funil indisponível.' }; });
      res.json({ dias: dd, eventos: linhas.length, truncado: snap.size >= 50_000, funil, ...agregar(linhas, dia(Date.now())) });
    } catch { res.status(500).json({ error: 'Não foi possível ler as métricas.' }); }
  });
}
