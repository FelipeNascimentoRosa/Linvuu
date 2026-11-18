/** Adaptador do ts-fsrs (modelo puro, sem DOM) para o reforço espaçado do APK.
 *  Três decisões moram aqui, e só aqui:
 *  1. Parâmetros: retenção 0,9, intervalo máximo de 365 dias, fuzz ligado (o fuzz do ts-fsrs é determinístico:
 *     a mesma entrada dá a mesma saída, então o teste é exato e os blocos não se acumulam no mesmo dia).
 *  2. Dia civil LOCAL: um cartão em revisão é calculado pela data do calendário do aluno, nunca por blocos de 24 h,
 *     para 23:55 → 00:05 contar como um dia novo e o vencimento cair na meia-noite local (e não às 21:00 do dia anterior).
 *  3. Migração: o registro legado (passos de 1, 3 e 7 dias) vira um Card coerente SEM mudar a data já agendada. */
import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from 'ts-fsrs';

export const MS_DIA = 86_400_000;
export const PARAMETROS = generatorParameters({ request_retention: 0.9, maximum_interval: 365, enable_fuzz: true });
const motor = fsrs(PARAMETROS);

/** Card do FSRS como é gravado: datas em ISO 8601 (JSON puro). `learning_steps` é exigido pelo ts-fsrs 5. */
export interface Fsrs {
  due: string; stability: number; difficulty: number; elapsed_days: number; scheduled_days: number;
  learning_steps: number; reps: number; lapses: number; state: 0 | 1 | 2 | 3; last_review: string;
}
export type Nota = 'again' | 'hard' | 'good' | 'easy';
export const NOTAS: readonly Nota[] = ['again', 'hard', 'good', 'easy'];
const GRADE: Record<Nota, Grade> = { again: Rating.Again, hard: Rating.Hard, good: Rating.Good, easy: Rating.Easy };

const data = (v: unknown) => typeof v === 'string' && Number.isFinite(Date.parse(v));
const inteiro = (v: unknown, max: number) => Number.isInteger(v) && Number(v) >= 0 && Number(v) <= max;
const finito = (v: unknown, min: number, max: number) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
export function validarFsrs(v: unknown): v is Fsrs {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const o = v as Record<string, unknown>;
  return data(o.due) && data(o.last_review) && finito(o.stability, 0, 100_000) && finito(o.difficulty, 0, 10)
    && inteiro(o.elapsed_days, 100_000) && inteiro(o.scheduled_days, PARAMETROS.maximum_interval) && inteiro(o.learning_steps, 20)
    && inteiro(o.reps, 1_000_000) && inteiro(o.lapses, 1_000_000) && inteiro(o.state, 3);
}

/** Dia do calendário LOCAL (número de dias desde 1970 pela data civil do aluno). Imune a horário de verão. */
export const diaCivil = (t: number) => { const d = new Date(t); return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / MS_DIA; };
/** 00:00 locais de um dia civil. */
export const meiaNoiteLocal = (dia: number) => { const u = new Date(dia * MS_DIA); return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()); };
const meiaNoiteUtc = (t: number) => new Date(diaCivil(t) * MS_DIA);

const paraCartao = (f: Fsrs, civil: boolean): Card => ({
  due: new Date(civil ? meiaNoiteUtc(Date.parse(f.due)) : f.due), stability: f.stability, difficulty: f.difficulty,
  elapsed_days: f.elapsed_days, scheduled_days: f.scheduled_days, learning_steps: f.learning_steps, reps: f.reps,
  lapses: f.lapses, state: f.state as State, last_review: civil ? meiaNoiteUtc(Date.parse(f.last_review)) : new Date(f.last_review),
});
const deCartao = (c: Card, due: Date, agora: number): Fsrs => ({
  due: due.toISOString(), stability: c.stability, difficulty: c.difficulty, elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days, learning_steps: c.learning_steps, reps: c.reps, lapses: c.lapses,
  state: c.state as Fsrs['state'], last_review: new Date(agora).toISOString(),
});

/** Os quatro estados seguintes possíveis, calculados juntos (é o que alimenta o intervalo mostrado em cada botão). */
export function proximos(f: Fsrs, agoraDoRelogio: number): Record<Nota, Fsrs> {
  // Relógio do aparelho atrasado (ou acertado para trás) não pode derrubar a tela: o ts-fsrs recusa tempo negativo
  // (FSRSValidationError). A conta parte da última revisão, que é o mais cedo que a próxima pode acontecer.
  const agora = Math.max(agoraDoRelogio, Date.parse(f.last_review));
  const civil = f.state === State.Review;
  const agoraCalc = civil ? meiaNoiteUtc(agora) : new Date(agora);
  const registro = motor.repeat(paraCartao(f, civil), agoraCalc);
  const saida = {} as Record<Nota, Fsrs>;
  for (const nota of NOTAS) {
    const c = registro[GRADE[nota]].card;
    // Voltou para o calendário (Revisão): vence à meia-noite local, N dias civis depois de hoje.
    // Passo curto (Aprendendo/Reaprendendo): minutos reais a partir de agora.
    // O fuzz do ts-fsrs 5.4.2 pode passar do `maximum_interval` em 1 dia (medido: 366 com estabilidade alta);
    // o teto de 365 dias é garantido aqui, e não só configurado.
    const dias = Math.min(PARAMETROS.maximum_interval, Math.max(1, c.scheduled_days));
    const due = c.state === State.Review
      ? meiaNoiteLocal(diaCivil(agora) + dias)
      : new Date(agora + (c.due.getTime() - agoraCalc.getTime()));
    saida[nota] = deCartao(c.state === State.Review ? { ...c, scheduled_days: dias } : c, due, agora);
  }
  return saida;
}
export const avaliar = (f: Fsrs, nota: Nota, agora: number): Fsrs => proximos(f, agora)[nota];

/** Dificuldade inicial que o próprio ts-fsrs dá a uma primeira lembrança "Bom". */
const DIFICULDADE_INICIAL = motor.next(createEmptyCard(new Date(0)), new Date(0), Rating.Good).card.difficulty;

/** Migração: o estágio legado (1, 3 ou 7 dias) vira um Card em Revisão com a MESMA data de vencimento.
 *  Nada futuro vira vencido: `due` é a `proxima` gravada. A estabilidade é o intervalo agendado (com retenção 0,9
 *  o intervalo do FSRS é a própria estabilidade). */
export function cartaoDeLegado(passo: number, proxima: string, em: string): Fsrs {
  const agendados = Math.round((Date.parse(proxima) - Date.parse(em)) / MS_DIA);
  const dias = Math.min(PARAMETROS.maximum_interval, Math.max(1, agendados));
  return { due: new Date(Date.parse(proxima)).toISOString(), stability: dias, difficulty: DIFICULDADE_INICIAL, elapsed_days: 0, scheduled_days: dias, learning_steps: 0, reps: passo, lapses: 0, state: State.Review, last_review: new Date(Date.parse(em)).toISOString() };
}

/** Rótulo compacto do intervalo de um botão: 10m, 3h, 2d, 5mo. Dias contam pelo calendário local. */
export function rotuloIntervalo(proximo: Fsrs, agora: number): string {
  const espera = Date.parse(proximo.due) - agora;
  if (proximo.state !== State.Review) {
    const min = Math.max(1, Math.round(espera / 60_000));
    return min < 60 ? `${min}m` : `${Math.round(min / 60)}h`;
  }
  const dias = Math.max(1, diaCivil(Date.parse(proximo.due)) - diaCivil(agora));
  return dias < 60 ? `${dias}d` : `${Math.round(dias / 30)}mo`;
}

/** Trava pedagógica: o sistema corrigiu a volta, então a nota respeita o resultado. Errou algo (ou precisou repetir):
 *  só "Errei/Again". Acertou tudo de primeira: o aluno gradua o esforço entre Difícil, Bom e Fácil. */
export const notasPermitidas = (acertouDePrimeira: boolean): readonly Nota[] => (acertouDePrimeira ? ['hard', 'good', 'easy'] : ['again']);
