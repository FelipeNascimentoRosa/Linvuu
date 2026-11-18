/** Reforço espaçado (modelo puro, sem DOM): depois que o aluno corrige os erros de um bloco, eles voltam no intervalo
 *  que o FSRS (ts-fsrs) calcula pela lembrança real de cada bloco. Até 18/11/2026 o intervalo era fixo (1, 3 e 7 dias).
 *  Base: recuperação espaçada e "successive relearning" (Cepeda et al., 2006; Rawson & Dunlosky, 2011) e o FSRS (MIT).
 *  Não é nota nem autorização: só decide quando lembrar o aluno.
 *
 *  Contrato de dados (versao 1, ADITIVO): os campos legados `passo`, `proxima` e `em` continuam sendo escritos junto
 *  com o objeto opcional `fsrs`. Um APK antigo no mesmo aparelho lê `proxima` como sempre e ignora `fsrs`; se ele regravar o
 *  registro, o `fsrs` some e o novo app migra de novo a partir do estágio legado, sem alterar a data já agendada. */
import { avaliar, cartaoDeLegado, MS_DIA, proximos, validarFsrs, type Fsrs, type Nota } from './fsrsAdaptador';
export { notasPermitidas, NOTAS, rotuloIntervalo, type Fsrs, type Nota } from './fsrsAdaptador';

/** Estágios do modelo antigo. Continuam valendo para ler registro legado: passo 3 = encerrado, nunca ressuscita. */
export const INTERVALOS_DIAS = [1, 3, 7] as const;
export const DIA_MS = MS_DIA;
/** Com o FSRS ativo o `passo` legado fica em 0..2: o passo 3 do app antigo significa "encerrado" e o FSRS não encerra. */
const PASSO_MAX_COM_FSRS = INTERVALOS_DIAS.length - 1;

export interface Espacado { tipo: 'espacado'; versao: 1; passo: number; proxima: string; em: string; fsrs?: Fsrs }

const data = (v: unknown) => typeof v === 'string' && Number.isFinite(Date.parse(v));
/** Valida só o contrato legado, como o app antigo: `fsrs` é opcional e um `fsrs` corrompido não invalida o registro
 *  (ele é ignorado e o estado é migrado do legado). */
export function validarEspacado(v: unknown): v is Espacado {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const o = v as Record<string, unknown>;
  return o.tipo === 'espacado' && o.versao === 1 && Number.isInteger(o.passo) && Number(o.passo) >= 0 && Number(o.passo) <= INTERVALOS_DIAS.length && data(o.proxima) && data(o.em);
}

/** Quando o bloco volta, sem registro espaçado: um intervalo depois da revisão concluída. */
export const primeiraVolta = (revisaoEm: string) => new Date(Date.parse(revisaoEm) + INTERVALOS_DIAS[0] * DIA_MS).toISOString();

/** Estado FSRS do bloco: o gravado, ou o migrado do legado (mesma data de vencimento). `null` = encerrado no modelo antigo. */
export function fsrsDoRegistro(esp: Espacado | null, revisaoEm: string): Fsrs | null {
  if (esp && validarFsrs(esp.fsrs)) return esp.fsrs;
  if (!esp) return cartaoDeLegado(0, primeiraVolta(revisaoEm), revisaoEm);
  if (esp.passo >= INTERVALOS_DIAS.length) return null;
  return cartaoDeLegado(esp.passo, esp.proxima, esp.em);
}

/** Grava a nota da volta: calcula o FSRS e escreve junto os campos legados (`proxima` = vencimento do FSRS). */
export function registrarAvaliacao(atual: Espacado | null, revisaoEm: string, nota: Nota, agora: number): Espacado {
  const base = fsrsDoRegistro(atual, revisaoEm);
  if (!base) return atual as Espacado; // encerrado no modelo antigo: nada a agendar
  const novo = avaliar(base, nota, agora);
  const passo = Math.min(PASSO_MAX_COM_FSRS, Math.max(0, novo.reps - novo.lapses));
  return { tipo: 'espacado', versao: 1, passo, proxima: novo.due, em: new Date(agora).toISOString(), fsrs: novo };
}

/** O que cada botão vai agendar, para mostrar o intervalo previsto antes de o aluno escolher. */
export function previsoesDaVolta(atual: Espacado | null, revisaoEm: string, agora: number): Record<Nota, Fsrs> | null {
  const base = fsrsDoRegistro(atual, revisaoEm);
  return base ? proximos(base, agora) : null;
}

/** Estado do bloco para o reforço: `null` quando o modelo antigo já o encerrou. */
export function situacaoEspacada(revisaoEm: string, esp: Espacado | null): { passo: number; proxima: string } | null {
  const fsrs = fsrsDoRegistro(esp, revisaoEm);
  if (!fsrs) return null;
  return { passo: esp?.passo ?? 0, proxima: fsrs.due };
}
