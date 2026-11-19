/** Atalhos de teclado da revisão no Web (modelo puro, sem DOM: o componente só passa o que o evento diz).
 *  WCAG 2.1.4 (atalhos de uma tecla): os atalhos só valem com o foco DENTRO da região da revisão e nunca enquanto a pessoa
 *  digita (campo de texto, área de texto, lista, conteúdo editável) nem com Ctrl, Alt ou Meta apertados. Assim o Espaço e os
 *  números continuam livres para escrever em cirílico, acentos e para os leitores de tela. */
import type { Nota } from '../revisao/fsrsAdaptador';

export type Acao =
  | { tipo: 'avancar' }
  | { tipo: 'repetir-audio' }
  | { tipo: 'nota'; nota: Nota };

export interface Tecla { key: string; ctrlKey?: boolean; altKey?: boolean; metaKey?: boolean; shiftKey?: boolean; repeat?: boolean; isComposing?: boolean }
export interface Contexto {
  /** O foco está dentro da região da revisão. */
  dentro: boolean;
  /** Tag do elemento em foco (maiúscula) e se é editável. */
  tag: string;
  editavel: boolean;
  /** O foco está numa opção de resposta (botão com papel radio): ali o Enter confirma a resposta; o Espaço continua escolhendo a opção. */
  radio?: boolean;
  /** A etapa atual aceita avançar (a resposta já foi conferida ou o painel de notas não está aberto). */
  podeAvancar: boolean;
  /** Notas liberadas pela trava pedagógica e se o painel de notas está aberto. */
  notasAbertas: boolean;
  notasLiberadas: readonly Nota[];
  /** Há áudio para repetir nesta questão. */
  temAudio: boolean;
}

/** 1, 2, 3 e 4 = Errei/Difícil/Bom/Fácil (Again/Hard/Good/Easy), na ordem em que os botões aparecem. */
export const ORDEM_NOTAS: readonly Nota[] = ['again', 'hard', 'good', 'easy'];

export function acaoDaTecla(t: Tecla, c: Contexto): Acao | null {
  if (!c.dentro || t.ctrlKey || t.altKey || t.metaKey || t.repeat || t.isComposing) return null;
  if (c.editavel || ['INPUT', 'TEXTAREA', 'SELECT'].includes(c.tag)) return null;
  const k = t.key;
  if (c.notasAbertas) {
    if (/^[1-4]$/.test(k)) { const nota = ORDEM_NOTAS[Number(k) - 1]; return c.notasLiberadas.includes(nota) ? { tipo: 'nota', nota } : null; }
    return null;
  }
  if ((k === 'r' || k === 'R') && !t.shiftKey && c.temAudio) return { tipo: 'repetir-audio' };
  // Enter e Espaço agem no botão em foco (comportamento nativo): o atalho só serve quando o foco está na região mas não em um botão ou link.
  if (k === 'Enter' && c.radio && c.podeAvancar) return { tipo: 'avancar' };
  if ((k === 'Enter' || k === ' ') && c.podeAvancar && !['BUTTON', 'A', 'SUMMARY'].includes(c.tag)) return { tipo: 'avancar' };
  return null;
}
