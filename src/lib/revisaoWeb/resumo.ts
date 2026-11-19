/** Números do resumo final da revisão (modelo puro, sem DOM): intervalo médio e proporção de acerto da sessão.
 *  - Intervalo médio: média, entre os blocos avaliados com nota, do tempo até cada um voltar (vencimento do FSRS menos o momento da nota).
 *  - Proporção de acerto: Bom + Fácil contra Errei. «Difícil» fica fora da razão (o aluno lembrou, mas com custo) e continua
 *    listado à parte; os blocos só com erros corrigidos não recebem nota e também ficam de fora. */
import type { Nota } from '../revisao/fsrsAdaptador';

export interface Esperas { somaMs: number; blocos: number }
export const SEM_ESPERAS: Esperas = { somaMs: 0, blocos: 0 };

/** Soma o tempo até a volta de mais um bloco avaliado. Espera negativa (relógio do aparelho mexido) conta como zero. */
export const somarEspera = (a: Esperas, esperaMs: number): Esperas => ({ somaMs: a.somaMs + Math.max(0, esperaMs), blocos: a.blocos + 1 });

/** Tempo médio até a volta, em milissegundos; `null` sem nenhum bloco avaliado. */
export const mediaEspera = (a: Esperas): number | null => (a.blocos > 0 ? a.somaMs / a.blocos : null);

export interface Proporcao { bons: number; total: number; porcento: number }
/** Bom + Fácil contra Errei; `null` quando ninguém marcou nenhuma das três (só Difícil, só correção ou nada). */
export function proporcaoAcerto(n: Record<Nota, number>): Proporcao | null {
  const bons = n.good + n.easy, total = bons + n.again;
  return total > 0 ? { bons, total, porcento: Math.round((bons / total) * 100) } : null;
}

const MIN = 60_000, HORA = 3_600_000, DIA = 86_400_000;
/** "10 minutos", "3 horas", "4 dias" (pt-BR) ou "10 minutes", "3 hours", "4 days" (en). Abaixo de 2 dias fala em horas; abaixo de 1 hora, em minutos. */
export function formatarEspera(ms: number, cod: 'pt-BR' | 'en'): string {
  const [min, hora, dia] = cod === 'en' ? ['minute', 'hour', 'day'] : ['minuto', 'hora', 'dia'];
  const plural = (n: number, u: string) => `${n} ${u}${n === 1 ? '' : 's'}`;
  if (ms < HORA) return plural(Math.max(1, Math.round(ms / MIN)), min);
  if (ms < 2 * DIA) return plural(Math.round(ms / HORA), hora);
  return plural(Math.round(ms / DIA), dia);
}
