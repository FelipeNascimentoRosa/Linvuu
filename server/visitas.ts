// Visitas por rota, contadas no servidor (lote 5). Sem cookie, sem IP, sem identificador:
// cada documento é (dia, host, rota-modelo) e o valor é um número. Só o agregado existe.
// Escrita: registrarVisita(), chamada no fim de toda resposta HTML 200. Leitura: lerVisitas(), usada em GET /api/metricas.
import crypto from 'node:crypto';
import type { Express, NextFunction, Request, Response } from 'express';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { credencialConfigurada, firebaseAdmin, projetoFirebase } from './firebase-admin';

export const COLECAO_VISITAS = 'visitas';
const dia = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const db = () => getFirestore(firebaseAdmin());

/** Robô declarado (Googlebot, Bing, Ahrefs, curl, monitor) não é visita. UA vazio também não. */
const ROBO = /bot|crawl|spider|slurp|preview|monitor|uptime|pingdom|curl|wget|http-client|python|java\/|okhttp|axios|node-fetch|undici|lighthouse|pagespeed|headless|phantom|scrapy|externalhit|whatsapp|telegram|slack|discord|linkedin|twitter|applebot|bing|yandex|baidu|semrush|ahrefs|mj12|dotbot|petalbot|gptbot|ccbot|claudebot|perplexity|chatgpt|adsbot|mediapartners/i;
/** Único aparelho com “bot” no nome que aparece em UA de gente de verdade (CUBOT); sem esta linha ele viraria robô. */
const APARELHO = /cubot/i;
export function ehRobo(agente: string | undefined): boolean {
  if (!agente || !agente.trim()) return true;
  if (APARELHO.test(agente)) return false;
  return ROBO.test(agente);
}

/** Rotas com molde escrito à mão: o que identifica a página sai e o molde fica (`/curso/ru/dia/12` → `/curso/:id/dia/:n`). */
const MOLDES: [RegExp, string][] = [
  [/^\/curso\/[a-z]{2,3}\/dia\/[^/]+$/, '/curso/:id/dia/:n'],
  [/^\/curso\/[a-z]{2,3}$/, '/curso/:id'],
  [/^\/gramatica\/[a-z]{2,3}$/, '/gramatica/:id'],
  [/^\/livros\/[^/]+$/, '/livros/:slug'],
];

/** Rota-modelo: agrupa as páginas que são o mesmo molde, para a contagem não virar uma linha por aula. */
export function rotaModelo(caminho: string): string {
  let p = String(caminho ?? '').split('?')[0].trim();
  if (!p.startsWith('/')) p = `/${p}`;
  if (p.length > 1) p = p.replace(/\/+$/, '');
  for (const [re, molde] of MOLDES) if (re.test(p)) return molde;
  // Regra geral: número no meio do caminho é página de aula, não rota nova; caixa alta não cria rota nova.
  return p.replace(/\/\d+(?=\/|$)/g, '/:n').toLowerCase();
}

export interface ChaveVisita { host: string; rota: string }

/** Decide se a resposta é visita contável. Função pura: o middleware abaixo só entrega os dados. */
export function visitaContavel(r: { status: number; tipo?: string; caminho: string; agente?: string; host?: string }): ChaveVisita | null {
  if (r.status !== 200) return null; // 301, 404 e 500 não são visita
  if (!/text\/html/i.test(String(r.tipo ?? ''))) return null; // imagem, JSON, sitemap e MP3 não são página
  if (ehRobo(r.agente)) return null;
  const host = String(r.host ?? '').split(':')[0].trim().toLowerCase();
  if (!/^[a-z0-9.-]{4,80}$/.test(host)) return null;
  const rota = rotaModelo(r.caminho);
  if (!rota.startsWith('/') || rota.length > 120) return null;
  return { host, rota };
}

/** ID do documento é hash: o caminho não entra como texto no Firestore, e nada de IP ou cookie entra em lugar nenhum. */
export const idVisita = (host: string, rota: string, d: string) => crypto.createHash('sha256').update(`${d}|${host}|${rota}`).digest('hex').slice(0, 32);

/** Soma 1 na (dia, host, rota). Nunca lança: medir não pode atrasar nem derrubar uma página. */
export async function registrarVisita(chave: ChaveVisita, ts = Date.now()): Promise<void> {
  if (!projetoFirebase || !credencialConfigurada()) return; // sem Admin, a página abre do mesmo jeito e nada é gravado
  const d = dia(ts);
  try {
    await db().collection(COLECAO_VISITAS).doc(idVisita(chave.host, chave.rota, d)).set({ d, h: chave.host, r: chave.rota, n: FieldValue.increment(1) }, { merge: true });
  } catch (e) {
    console.error('visitas/registrar', (e as { code?: number | string }).code ?? e);
  }
}

export interface LinhaVisita { d: string; h: string; r: string; n: number }

/** Função pura: agrega as linhas em dia, host e rota. */
export function agregarVisitas(linhas: LinhaVisita[], dias: number, agora: number) {
  const porDiaMapa = new Map<string, number>();
  for (let i = dias - 1; i >= 0; i--) porDiaMapa.set(dia(agora - i * 86_400_000), 0);
  const porHost = new Map<string, number>(), porRota = new Map<string, number>();
  let total = 0;
  for (const l of linhas) {
    const n = Number(l.n) || 0;
    if (n <= 0 || !porDiaMapa.has(l.d)) continue; // fora da janela não entra em nenhum dos três totais
    total += n;
    porDiaMapa.set(l.d, (porDiaMapa.get(l.d) ?? 0) + n);
    porHost.set(l.h, (porHost.get(l.h) ?? 0) + n);
    porRota.set(l.r, (porRota.get(l.r) ?? 0) + n);
  }
  const ordenar = (m: Map<string, number>, chave: 'host' | 'rota') => [...m].sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ [chave]: k, visitas: v }));
  return {
    total,
    porDia: [...porDiaMapa].map(([d, visitas]) => ({ dia: d, visitas })),
    porHost: ordenar(porHost, 'host'),
    porRota: ordenar(porRota, 'rota').slice(0, 50),
  };
}

export async function lerVisitas(dias: number, agora = Date.now()) {
  const desde = dia(agora - (dias - 1) * 86_400_000);
  const snap = await db().collection(COLECAO_VISITAS).where('d', '>=', desde).limit(5_000).get();
  const linhas = snap.docs.map((x) => x.data() as LinhaVisita);
  return {
    dias,
    nota: 'página HTML 200, sem robô declarado; conta a partir do deploy do lote 5. Sem cookie e sem IP: só o total por dia, host e rota.',
    truncado: snap.size >= 5_000,
    ...agregarVisitas(linhas, dias, agora),
  };
}

/** Conta toda resposta HTML 200 que sai do servidor. Fica registrado antes das rotas de página. */
export function registrarVisitas(app: Express, aoContar: (chave: ChaveVisita) => void = registrarVisita) {
  // Em desenvolvimento a contagem não roda: uma visita de teste não pode virar número no painel real.
  if (process.env.NODE_ENV !== 'production') return;
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') return next(); // HEAD é monitor e POST não é página
    res.on('finish', () => {
      const chave = visitaContavel({ status: res.statusCode, tipo: String(res.getHeader('content-type') ?? ''), caminho: req.path, agente: req.headers['user-agent'], host: req.headers.host });
      if (chave) aoContar(chave);
    });
    next();
  });
}
