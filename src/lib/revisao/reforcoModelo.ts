/** Modelo puro do reforço entre sessões (sem conteúdo nem DOM), para teste em Node. */
import { validarPratica } from './estudoModelo';
import { pendentesRevisao, validarRevisao } from './revisaoModelo';
import { situacaoEspacada, validarEspacado } from './espacadoModelo';

/** `erros`: ainda há questões erradas sem revisão certa. `espacado`: já corrigidas, voltando no intervalo. */
export interface ItemReforco { dia: number; bloco: number; pendentes: number; em: string; tipo: 'erros' | 'espacado'; passo: number }
type Leitor = Pick<Storage, 'getItem' | 'key' | 'length'>;
const PADRAO = /^linvuu:pratica-apk:v1:([^:]+):([a-z]{2,3}):(\d{1,3}):S(\d{1,2}):bloco:(\d{1,2})$/;
const ler = (s: Leitor, k: string): unknown => { try { return JSON.parse(s.getItem(k) ?? 'null'); } catch { return null; } };

/** Blocos para rever agora e a data do próximo reforço espaçado ainda no futuro. */
export function agendaReforco(idioma: string, dono: string, storage: Leitor, diaDe: (aula: number, sessao: number) => number | null, agora = Date.now()): { itens: ItemReforco[]; proxima: string | null } {
  const itens: ItemReforco[] = [];
  let proxima: string | null = null;
  try {
    for (let i = 0; i < storage.length; i++) {
      const k = storage.key(i);
      const m = k ? PADRAO.exec(k) : null;
      if (!m || m[1] !== dono || m[2] !== idioma) continue;
      const pratica = ler(storage, k!);
      if (!validarPratica(pratica) || pratica.acertos >= pratica.total) continue;
      const dia = diaDe(Number(m[3]), Number(m[4]));
      if (!dia) continue;
      const rev = ler(storage, `${k}:revisao-erros`);
      const pendentes = validarRevisao(rev) ? pendentesRevisao(rev).length : pratica.total - pratica.acertos;
      if (pendentes > 0) { itens.push({ dia, bloco: Number(m[5]), pendentes, em: pratica.em, tipo: 'erros', passo: 0 }); continue; }
      if (!validarRevisao(rev) || !rev.fim) continue;
      const esp = ler(storage, `${k}:espacado`);
      const s = situacaoEspacada(rev.em, validarEspacado(esp) ? esp : null);
      if (!s) continue;
      if (Date.parse(s.proxima) <= agora) itens.push({ dia, bloco: Number(m[5]), pendentes: rev.origem.length, em: s.proxima, tipo: 'espacado', passo: s.passo });
      else if (!proxima || s.proxima < proxima) proxima = s.proxima;
    }
  } catch { return { itens: [], proxima: null }; }
  // O que está há mais tempo esperando é o que mais se beneficia de ser lembrado agora.
  return { itens: itens.sort((a, b) => a.em.localeCompare(b.em) || a.dia - b.dia), proxima };
}

/** Blocos para rever agora, do mais antigo ao mais novo. `diaDe` converte aula+sessão no dia do percurso. */
export function listarReforco(idioma: string, dono: string, storage: Leitor, diaDe: (aula: number, sessao: number) => number | null, agora = Date.now()): ItemReforco[] {
  return agendaReforco(idioma, dono, storage, diaDe, agora).itens;
}
