import type { Explicacao } from './locales';

/** O idioma estudado identifica conteúdo, áudio e progresso; nunca vem do idioma da interface. */
export type IdiomaEstudado = 'en' | 'es' | 'fr' | 'it' | 'de' | 'ru' | 'br';
export interface IdiomasDaAula {
  interface: 'pt-BR' | 'en';
  estudado: string;
  explicacaoSolicitada: Explicacao;
  explicacaoEfetiva: Explicacao;
}
export const explicacaoValida = (v: unknown): v is Explicacao => v === 'pt' || v === 'en';
export const chaveExplicacao = (curso: string) => `linvuu:explicacao:${curso}`;
/** Sem preferência, usa o idioma original do material, independentemente dos menus. */
export function escolherExplicacao(fonte: Explicacao, valor: unknown): Explicacao {
  return explicacaoValida(valor) ? valor : fonte;
}
export function resolverExplicacao(fonte: Explicacao, solicitada: Explicacao, traduzida: boolean): Explicacao {
  return solicitada === fonte || traduzida ? solicitada : fonte;
}
export function preferenciaExplicacao(curso: string, fonte: Explicacao): Explicacao {
  try { return escolherExplicacao(fonte, localStorage.getItem(chaveExplicacao(curso))); }
  catch { return fonte; }
}
export function lembrarExplicacao(curso: string, idioma: Explicacao) {
  if (!explicacaoValida(idioma)) return;
  try { localStorage.setItem(chaveExplicacao(curso), idioma); } catch { /* a escolha desta tela continua válida */ }
}
