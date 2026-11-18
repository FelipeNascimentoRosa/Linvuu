/** Registro de revisão de UM bloco de prática, o que o Web e o servidor trocam (modelo puro, sem DOM).
 *
 *  Um bloco só entra aqui quando tem algo a rever: houve erro na prática (`acertos < total`). Bloco perfeito não gera
 *  registro, então o volume por aluno fica limitado ao que realmente volta para revisão.
 *
 *  Regra de conflito (a mesma no navegador e no servidor, para os dois sempre escolherem o mesmo vencedor):
 *  1. vence o registro com a marca mais recente, a maior entre `espacado.fsrs.last_review`, `espacado.em`, `revisao.em` e `pratica.em`;
 *  2. empate: vence o que tem mais repetições (`fsrs.reps`, ou o `passo` legado);
 *  3. empate ainda: vence o de texto JSON maior (arbitrário, mas igual dos dois lados).
 *  Um cache antigo, portanto, nunca sobrescreve progresso mais novo. */
import type { Pratica } from './estudoModelo';
import { validarPratica } from './estudoModelo';
import { validarRevisao, type Revisao } from './revisaoModelo';
import { validarEspacado, type Espacado } from './espacadoModelo';
import { validarFsrs } from './fsrsAdaptador';

export interface RegistroBloco {
  idioma: string; aula: number; sessao: number; bloco: number;
  pratica: Pratica; revisao?: Revisao; espacado?: Espacado;
}

/** Quantos registros cabem num único pedido (o servidor recusa mais que isso). */
export const LIMITE_LOTE = 50;
/** Tamanho máximo do JSON de um registro; um registro normal tem poucos KB (o texto digitado é limitado a 8 000 caracteres). */
export const LIMITE_BYTES_REGISTRO = 24_000;
/** Corpo máximo do pedido de revisão: o lote cheio (50 × 24 000 bytes) mais a moldura. Só essa rota aceita corpo assim. */
export const LIMITE_CORPO_REVISAO = '1200kb';
/** Quanto a marca pode estar no futuro (relógio do aparelho adiantado) antes de o servidor recusar o registro. */
export const TOLERANCIA_RELOGIO_MS = 24 * 3_600_000;

const IDIOMA = /^[a-z]{2,3}$/;
const objeto = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const faixa = (v: unknown, min: number, max: number) => Number.isInteger(v) && Number(v) >= min && Number(v) <= max;
const CHAVES = ['idioma', 'aula', 'sessao', 'bloco', 'pratica', 'revisao', 'espacado'];

/** Identificador estável do bloco: serve de id do documento no servidor e de chave no cache local. */
export const idBloco = (r: Pick<RegistroBloco, 'idioma' | 'aula' | 'sessao' | 'bloco'>) => `${r.idioma}_${r.aula}_S${r.sessao}_B${r.bloco}`;

/** Marca de tempo do registro, em milissegundos. */
export function marcaRegistro(r: RegistroBloco): number {
  const t = [r.pratica.em, r.revisao?.em, r.espacado?.em, r.espacado?.fsrs?.last_review].map((d) => (d ? Date.parse(d) : 0));
  return Math.max(...t.filter(Number.isFinite));
}
const repeticoes = (r: RegistroBloco) => r.espacado?.fsrs?.reps ?? r.espacado?.passo ?? 0;

/** `true` se `a` deve substituir `b`. Relação total e antissimétrica: nunca os dois lados se acham vencedores. */
export function vence(a: RegistroBloco, b: RegistroBloco): boolean {
  const ma = marcaRegistro(a), mb = marcaRegistro(b);
  if (ma !== mb) return ma > mb;
  const ra = repeticoes(a), rb = repeticoes(b);
  if (ra !== rb) return ra > rb;
  return JSON.stringify(a) > JSON.stringify(b);
}

/** Valida o formato recebido (do navegador ou do disco). Não confia em nada: chaves extras, FSRS corrompido ou tamanho
 *  excessivo reprovam o registro inteiro. Não valida a assinatura dos exercícios: isso só o conteúdo atual sabe. */
export function validarRegistroBloco(v: unknown): v is RegistroBloco {
  if (!objeto(v) || Object.keys(v).some((k) => !CHAVES.includes(k))) return false;
  if (typeof v.idioma !== 'string' || !IDIOMA.test(v.idioma) || !faixa(v.aula, 1, 999) || !faixa(v.sessao, 1, 99) || !faixa(v.bloco, 1, 99)) return false;
  if (!validarPratica(v.pratica) || v.pratica.acertos >= v.pratica.total) return false;
  if (v.revisao !== undefined && !validarRevisao(v.revisao)) return false;
  if (v.espacado !== undefined) {
    if (!validarEspacado(v.espacado) || (v.espacado.fsrs !== undefined && !validarFsrs(v.espacado.fsrs))) return false;
    // Voltar a agendar só faz sentido depois de a revisão de erros terminar.
    if (!v.revisao || !v.revisao.fim) return false;
  }
  try { return JSON.stringify(v).length <= LIMITE_BYTES_REGISTRO; } catch { return false; }
}

/** Reconstrói o registro só com os campos conhecidos, para o servidor nunca gravar lixo que o validador não olha. */
export function normalizarRegistro(r: RegistroBloco): RegistroBloco {
  const p = r.pratica;
  const saida: RegistroBloco = {
    idioma: r.idioma, aula: r.aula, sessao: r.sessao, bloco: r.bloco,
    pratica: { acertos: p.acertos, total: p.total, em: p.em, ...(p.versao === 2 ? { versao: 2 as const, assinatura: p.assinatura } : {}) },
  };
  const v = r.revisao;
  if (v) saida.revisao = { tipo: v.tipo, versao: v.versao, assinatura: v.assinatura, origem: [...v.origem], fila: [...v.fila], indice: v.indice, rodada: v.rodada, respostas: { ...v.respostas }, escolha: v.escolha, ordem: [...v.ordem], texto: v.texto, resultado: v.resultado, fim: v.fim, em: v.em };
  const e = r.espacado;
  if (e) {
    saida.espacado = { tipo: e.tipo, versao: e.versao, passo: e.passo, proxima: e.proxima, em: e.em };
    if (e.fsrs) { const f = e.fsrs; saida.espacado.fsrs = { due: f.due, stability: f.stability, difficulty: f.difficulty, elapsed_days: f.elapsed_days, scheduled_days: f.scheduled_days, learning_steps: f.learning_steps, reps: f.reps, lapses: f.lapses, state: f.state, last_review: f.last_review }; }
  }
  return saida;
}

/** Corpo do PUT: só `registros`, 1 a 50 itens válidos, sem bloco repetido e sem marca absurdamente no futuro. */
export function validarLote(corpo: unknown, agora = Date.now()): RegistroBloco[] | null {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return null;
  const b = corpo as Record<string, unknown>;
  if (Object.keys(b).some((k) => k !== 'registros') || !Array.isArray(b.registros) || b.registros.length < 1 || b.registros.length > LIMITE_LOTE) return null;
  const ids = new Set<string>();
  const saida: RegistroBloco[] = [];
  for (const r of b.registros) {
    if (!validarRegistroBloco(r) || marcaRegistro(r) > agora + TOLERANCIA_RELOGIO_MS) return null;
    const id = idBloco(r);
    if (ids.has(id)) return null;
    ids.add(id);
    saida.push(normalizarRegistro(r));
  }
  return saida;
}

/** Junta o que há no aparelho com o que há na conta, bloco a bloco, sem duplicar nem sobrescrever o mais novo.
 *  `paraConta`: o que a conta ainda não tem (ou tem mais velho). `paraAparelho`: o que o aparelho ainda não tem (ou tem mais velho).
 *  Cada bloco aparece uma vez, com a data que já tinha: nada vira "vencido hoje" por causa da junção. */
export function fundirRegistros(locais: readonly RegistroBloco[], remotos: readonly RegistroBloco[]): { paraConta: RegistroBloco[]; paraAparelho: RegistroBloco[]; todos: RegistroBloco[] } {
  const mapa = new Map<string, { local?: RegistroBloco; remoto?: RegistroBloco }>();
  for (const r of locais) { const x = mapa.get(idBloco(r)) ?? {}; x.local = x.local && vence(x.local, r) ? x.local : r; mapa.set(idBloco(r), x); }
  for (const r of remotos) { const x = mapa.get(idBloco(r)) ?? {}; x.remoto = x.remoto && vence(x.remoto, r) ? x.remoto : r; mapa.set(idBloco(r), x); }
  const paraConta: RegistroBloco[] = [], paraAparelho: RegistroBloco[] = [], todos: RegistroBloco[] = [];
  for (const { local, remoto } of mapa.values()) {
    if (local && !remoto) { paraConta.push(local); todos.push(local); }
    else if (remoto && !local) { paraAparelho.push(remoto); todos.push(remoto); }
    else if (local && remoto) {
      if (vence(local, remoto)) { paraConta.push(local); todos.push(local); }
      else { if (vence(remoto, local)) paraAparelho.push(remoto); todos.push(remoto); }
    }
  }
  return { paraConta, paraAparelho, todos };
}
