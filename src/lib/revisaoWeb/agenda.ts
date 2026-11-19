/** Agenda do curso no Web: converte aula + sessão no dia do percurso e lê a agenda dos registros guardados. */
import { gruposDoCurso } from '../content';
import { agendaDeRegistros, type ItemReforco } from '../revisao/reforcoModelo';
import type { RegistroBloco } from '../revisao/registroBloco';

/** Dia do percurso (sessão) a partir de aula + sessão "S3", pelos grupos reais do curso. */
export function diaDaSessao(idioma: string, aula: number, sessao: number): number | null {
  const g = gruposDoCurso(idioma).find((x) => x.aula === aula);
  if (!g) return null;
  const dia = g.dias[0] + sessao - 1;
  return dia >= g.dias[0] && dia <= g.dias[1] ? dia : null;
}
export type { ItemReforco };
export const agendaDoCurso = (idioma: string, registros: readonly RegistroBloco[], agora = Date.now()) => agendaDeRegistros(registros, (a, s) => diaDaSessao(idioma, a, s), agora);
