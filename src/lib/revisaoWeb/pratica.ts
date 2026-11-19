/** Da prática de um bloco de exercícios ao registro de revisão (modelo puro, sem DOM).
 *
 *  Só blocos com erro geram registro (acertou tudo: nada a rever). A PRIMEIRA tentativa de cada versão do bloco é a que vale:
 *  refazer o bloco não reinicia a revisão nem a agenda do FSRS. Se o conteúdo do bloco mudou (assinatura diferente), a
 *  prática antiga deixa de valer e a nova a substitui. */
import type { Exercicio } from '../aulas';
import { assinaturaExercicios } from '../revisao/estudoModelo';
import { iniciarRevisao } from '../revisao/revisaoModelo';
import type { RegistroBloco } from '../revisao/registroBloco';
import type { criarArmazem } from './armazem';

export interface PontoDoBloco { idioma: string; aula: number; /** "S3" → 3 */ sessao: number; /** posição do bloco na sessão, a partir de 1 */ bloco: number }
export const corrigivel = (e: Exercicio) => e.tipo !== 'repeat' && e.tipo !== 'producao';
/** "S3" → 3; qualquer outro formato → null. */
export const numeroDaSessao = (s: string): number | null => { const m = /^S(\d{1,2})$/.exec(s); return m ? Number(m[1]) : null; };

/** Registro de um bloco recém-terminado, ou `null` se o aluno acertou tudo. `acertos`: índice do exercício → acertou. */
export function registroDaPratica(ponto: PontoDoBloco, itens: Exercicio[], acertos: Record<number, boolean>, agora = new Date()): RegistroBloco | null {
  const corrigiveis = itens.map((e, i) => (corrigivel(e) ? i : -1)).filter((i) => i >= 0);
  if (!corrigiveis.length || corrigiveis.some((i) => typeof acertos[i] !== 'boolean')) return null;
  const origem = corrigiveis.filter((i) => acertos[i] === false);
  if (!origem.length) return null;
  const em = agora.toISOString();
  return {
    ...ponto,
    pratica: { acertos: corrigiveis.length - origem.length, total: corrigiveis.length, em, versao: 2, assinatura: assinaturaExercicios(itens) },
    revisao: { ...iniciarRevisao(itens, origem), em },
  };
}

/** Guarda a prática do bloco no armazém, respeitando "a primeira tentativa de cada versão vale". Devolve o registro gravado, ou `null`. */
export function registrarPratica(armazem: Pick<ReturnType<typeof criarArmazem>, 'ler' | 'gravar'>, ponto: PontoDoBloco, itens: Exercicio[], acertos: Record<number, boolean>, agora = new Date()): RegistroBloco | null {
  const novo = registroDaPratica(ponto, itens, acertos, agora);
  if (!novo) return null;
  const atual = armazem.ler(ponto.idioma).find((r) => r.aula === ponto.aula && r.sessao === ponto.sessao && r.bloco === ponto.bloco);
  if (atual && atual.pratica.assinatura === novo.pratica.assinatura) return null;
  return armazem.gravar(novo);
}
