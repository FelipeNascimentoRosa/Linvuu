import { CENTAVOS, CENTAVOS_USD } from '../src/config/planos.ts';
import type { Express } from 'express';
import { firebaseAdmin, projetoFirebase } from './firebase-admin';

type Verificacao = { nome: string; verificar: (signal: AbortSignal) => Promise<void> };
type Resultado = { ok: boolean; checkedAt: string };

/** Uma execução por vez, cache curto e prazo total; nunca devolve credenciais ou erros internos. */
export function criarVerificadorProntidao(verificacoes: Verificacao[], opcoes: {
  timeoutMs?: number; cacheMs?: number; agora?: () => number; falhou?: (nome: string) => void;
} = {}) {
  const { timeoutMs = 5000, cacheMs = 60000, agora = Date.now, falhou = () => {} } = opcoes;
  let guardado: { resultado: Resultado; ate: number } | null = null;
  let pendente: Promise<Resultado> | null = null;
  // Uma dependência que ignore AbortSignal não deve acumular trabalhos em cada consulta.
  let trabalho: Promise<boolean> | null = null;
  return (): Promise<Resultado> => {
    if (guardado && agora() < guardado.ate) return Promise.resolve({ ...guardado.resultado });
    if (pendente) return pendente.then((r) => ({ ...r }));
    if (trabalho) return Promise.resolve({ ok: false, checkedAt: new Date(agora()).toISOString() });
    const controle = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    trabalho = Promise.all(verificacoes.map(async (v) => {
      try { await v.verificar(controle.signal); return true; }
      catch { falhou(v.nome); return false; }
    })).then((valores) => valores.length > 0 && valores.every(Boolean));
    const atual = trabalho;
    void atual.finally(() => { if (trabalho === atual) trabalho = null; });
    const prazo = new Promise<boolean>((resolve) => {
      timer = setTimeout(() => { controle.abort(); falhou('timeout'); resolve(false); }, timeoutMs);
    });
    pendente = Promise.race([atual, prazo]).then((ok) => {
      const resultado = { ok, checkedAt: new Date(agora()).toISOString() };
      guardado = { resultado, ate: agora() + cacheMs };
      return resultado;
    }).finally(() => { clearTimeout(timer); pendente = null; });
    return pendente.then((r) => ({ ...r }));
  };
}

function verificacoesProducao(): Verificacao[] {
  return [
    { nome: 'configuracao', verificar: async () => {
      if (process.env.APP_URL !== 'https://linvuu.com.br' || !process.env.STRIPE_WEBHOOK_SECRET) throw new Error('configuracao');
    } },
    { nome: 'firebase', verificar: async (signal) => {
      if (!projetoFirebase || !/^[a-z][a-z0-9-]+$/.test(projetoFirebase)) throw new Error('projeto');
      const credencial = firebaseAdmin().options.credential;
      if (!credencial) throw new Error('credencial');
      const token = await credencial.getAccessToken();
      signal.throwIfAborted();
      // Lê metadados do banco, nunca documentos de alunos; comprova credencial e alcance do Firestore.
      const r = await fetch(`https://firestore.googleapis.com/v1/projects/${projetoFirebase}/databases/(default)`, {
        headers: { Authorization: `Bearer ${token.access_token}` }, signal,
      });
      await r.body?.cancel();
      if (!r.ok) throw new Error('firebase');
    } },
    { nome: 'stripe', verificar: async (signal) => {
      const chave = process.env.STRIPE_SECRET_KEY;
      const preco = process.env.STRIPE_PRICE_ID;
      if (!chave || !preco || !/^price_[a-zA-Z0-9]+$/.test(preco)) throw new Error('configuracao');
      // Somente GET: verifica a chave e o preço configurado, sem criar cliente ou cobrança.
      const r = await fetch(`https://api.stripe.com/v1/prices/${preco}`, { headers: { Authorization: `Bearer ${chave}` }, signal });
      if (!r.ok) { await r.body?.cancel(); throw new Error('stripe'); }
      const p = await r.json() as { active?: boolean; livemode?: boolean; type?: string; currency?: string; unit_amount?: number | null; recurring?: { interval?: string; interval_count?: number } | null };
      if (!p.active || !p.livemode || p.type !== 'recurring' || p.currency !== 'brl') throw new Error('preco');
      // O valor anunciado (src/config/planos.ts) tem de ser o cobrado: R$ 139 por mês, nem outro valor nem outro intervalo.
      if (p.unit_amount !== CENTAVOS.mensal || p.recurring?.interval !== 'month' || (p.recurring?.interval_count ?? 1) !== 1) throw new Error('preco-divergente');
      // Preço mensal em dólares (linvuu.com): só confere se estiver configurado; sem ele o .com não vende a mensal (o checkout recusa).
      const usd = process.env.STRIPE_PRICE_ID_USD;
      if (usd) {
        if (!/^price_[a-zA-Z0-9]+$/.test(usd)) throw new Error('configuracao');
        const ru = await fetch(`https://api.stripe.com/v1/prices/${usd}`, { headers: { Authorization: `Bearer ${chave}` }, signal });
        if (!ru.ok) { await ru.body?.cancel(); throw new Error('stripe'); }
        const pu = await ru.json() as { active?: boolean; livemode?: boolean; type?: string; currency?: string; unit_amount?: number | null; recurring?: { interval?: string; interval_count?: number } | null };
        if (!pu.active || !pu.livemode || pu.type !== 'recurring' || pu.currency !== 'usd') throw new Error('preco-usd');
        if (pu.unit_amount !== CENTAVOS_USD.mensal || pu.recurring?.interval !== 'month' || (pu.recurring?.interval_count ?? 1) !== 1) throw new Error('preco-usd-divergente');
      }
    } },
  ];
}

export function registrarProntidao(app: Express) {
  const verificar = criarVerificadorProntidao(verificacoesProducao(), {
    falhou: (nome) => console.error(`[Linvuu] prontidao indisponivel: ${nome}`),
  });
  app.get('/readyz', async (_req, res) => {
    const resultado = await verificar();
    res.set('Cache-Control', 'private, no-store');
    res.status(resultado.ok ? 200 : 503).json(resultado);
  });
}
