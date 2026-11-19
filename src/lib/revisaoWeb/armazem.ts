/** Armazém da revisão espaçada no Web: o que o aluno já praticou, por bloco, neste navegador e (com login) na conta.
 *
 *  - Visitante e offline: `localStorage` (`linvuu:revisao-web:v1:<dono>:<idioma>`), um registro por bloco com erro.
 *  - Conta: a mesma lista, reconciliada com `GET/PUT /api/progresso/revisao` pela regra única de `registroBloco.ts`
 *    (marca mais recente vence; cache antigo nunca sobrescreve progresso novo).
 *  - Ao entrar na conta, o que foi feito como visitante é fundido bloco a bloco: cada bloco existe uma só vez e mantém a
 *    data que já tinha, então nada vira "vencido hoje" por causa da junção. */
import { carregarAuth } from '../firebase';
import { api } from '../api';
import { usuarioDoProgresso } from '../progresso';
import { fundirRegistros, idBloco, LIMITE_LOTE, validarRegistroBloco, vence, type RegistroBloco } from '../revisao/registroBloco';

export const EVENTO_REVISAO = 'linvuu:revisao-web';
export const VISITANTE = 'visitante';
const PREFIXO = 'linvuu:revisao-web:v1';
type Disco = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
interface Acesso { uid: string; token: string }

const IDIOMA = /^[a-z]{2,3}$/;
const chave = (dono: string, idioma: string) => `${PREFIXO}:${dono}:${idioma}`;

/** Lê e valida uma lista; o que não passa no validador é descartado, nunca "consertado". */
function lerLista(disco: Disco, dono: string, idioma: string): RegistroBloco[] {
  try {
    const bruto: unknown = JSON.parse(disco.getItem(chave(dono, idioma)) ?? 'null');
    const lista = bruto && typeof bruto === 'object' && (bruto as { versao?: unknown }).versao === 1 ? (bruto as { registros?: unknown }).registros : null;
    if (!Array.isArray(lista)) return [];
    const vistos = new Set<string>();
    return lista.filter((r): r is RegistroBloco => {
      if (!validarRegistroBloco(r) || r.idioma !== idioma || vistos.has(idBloco(r))) return false;
      vistos.add(idBloco(r));
      return true;
    });
  } catch { return []; }
}
function gravarLista(disco: Disco, dono: string, idioma: string, registros: readonly RegistroBloco[]): boolean {
  try {
    if (registros.length) disco.setItem(chave(dono, idioma), JSON.stringify({ versao: 1, registros }));
    else disco.removeItem(chave(dono, idioma));
    return true;
  } catch { return false; }
}

/** `dono` devolve o uid da conta ativa ou 'visitante'. Tudo é injetável para testar sem navegador. */
export function criarArmazem(disco: Disco, dono: () => string, avisar: () => void = () => {}) {
  const ler = (idioma: string) => (IDIOMA.test(idioma) ? lerLista(disco, dono(), idioma) : []);
  /** Grava o registro se ele vence o que já existe. Devolve o vencedor (ou `null` se o aparelho não aceitou gravar). */
  const gravar = (r: RegistroBloco): RegistroBloco | null => {
    if (!validarRegistroBloco(r)) return null;
    const d = dono(), lista = lerLista(disco, d, r.idioma);
    const atual = lista.find((x) => idBloco(x) === idBloco(r));
    if (atual && !vence(r, atual)) return atual;
    const nova = [...lista.filter((x) => idBloco(x) !== idBloco(r)), r];
    if (!gravarLista(disco, d, r.idioma, nova)) return null;
    avisar();
    return r;
  };
  /** Funde as listas recebidas (da conta) com as locais. Devolve o que a conta ainda precisa receber. */
  const fundir = (idioma: string, remotos: readonly RegistroBloco[]): RegistroBloco[] => {
    const d = dono(), locais = lerLista(disco, d, idioma);
    const { paraConta, todos } = fundirRegistros(locais, remotos);
    if (gravarLista(disco, d, idioma, todos)) avisar();
    return paraConta;
  };
  /** Ao entrar: o que foi feito como visitante passa para a conta (mesma regra de conflito) e a cópia de visitante some. */
  const adotarVisitante = (idioma: string): number => {
    const d = dono();
    if (d === VISITANTE) return 0;
    const deles = lerLista(disco, VISITANTE, idioma);
    if (!deles.length) return 0;
    const { todos } = fundirRegistros(deles, lerLista(disco, d, idioma));
    if (!gravarLista(disco, d, idioma, todos)) return 0;
    gravarLista(disco, VISITANTE, idioma, []);
    avisar();
    return deles.length;
  };
  return { ler, gravar, fundir, adotarVisitante };
}

/** Sincronização com a conta. Uma fila por conta: dois pedidos nunca correm ao mesmo tempo. */
export function criarSincronizadorRevisao(armazem: ReturnType<typeof criarArmazem>, uidAtivo: () => string, acesso: () => Promise<Acesso | null>, pedir: typeof fetch = fetch) {
  const filas = new Map<string, Promise<boolean>>();
  const requisicao = (url: string, init: RequestInit) => pedir(api(url), { ...init, signal: AbortSignal.timeout(15000) });
  const executar = (idioma: string): Promise<boolean> => {
    const uid = uidAtivo();
    if (uid === VISITANTE || !IDIOMA.test(idioma)) return Promise.resolve(false);
    const anterior = filas.get(uid) ?? Promise.resolve(true);
    const atual = anterior.catch(() => false).then(async () => {
      if (uid !== uidAtivo()) return false;
      try {
        armazem.adotarVisitante(idioma);
        const t = await acesso();
        if (!t || t.uid !== uid || uid !== uidAtivo()) throw new Error('Sessão indisponível');
        const headers = { Authorization: `Bearer ${t.token}` };
        const r = await requisicao(`/api/progresso/revisao?idioma=${idioma}`, { headers });
        if (!r.ok) throw new Error('Revisão indisponível');
        const j = await r.json() as { registros?: unknown };
        if (!Array.isArray(j.registros)) throw new Error('Resposta inválida');
        if (uid !== uidAtivo()) return false;
        const remotos = j.registros.filter((x): x is RegistroBloco => validarRegistroBloco(x) && x.idioma === idioma);
        const pendentes = armazem.fundir(idioma, remotos);
        for (let i = 0; i < pendentes.length; i += LIMITE_LOTE) {
          if (uid !== uidAtivo()) return false;
          const lote = pendentes.slice(i, i + LIMITE_LOTE);
          const p = await requisicao('/api/progresso/revisao', { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ registros: lote }) });
          if (!p.ok) throw new Error('Não foi possível salvar');
          const resp = await p.json() as { registros?: unknown };
          // O servidor devolve o vencedor de cada bloco: se alguém gravou algo mais novo, o aparelho passa a ter isso.
          if (Array.isArray(resp.registros)) armazem.fundir(idioma, resp.registros.filter((x): x is RegistroBloco => validarRegistroBloco(x) && x.idioma === idioma));
        }
        return true;
      } catch { return false; }
    });
    filas.set(uid, atual);
    void atual.finally(() => { if (filas.get(uid) === atual) filas.delete(uid); });
    return atual;
  };
  return { sincronizar: executar };
}

// ---- instância do navegador ----
const disco = (): Disco => (typeof localStorage !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => { throw new Error('sem armazenamento'); }, removeItem: () => {} });
const dono = () => usuarioDoProgresso() ?? VISITANTE;
const avisar = () => { try { window.dispatchEvent(new Event(EVENTO_REVISAO)); } catch { /* fora do navegador */ } };
async function acessoAtual(): Promise<Acesso | null> {
  try {
    const { auth } = await carregarAuth();
    const u = auth.currentUser;
    if (!u) return null;
    const token = await u.getIdToken();
    return auth.currentUser?.uid === u.uid ? { token, uid: u.uid } : null;
  } catch { return null; }
}
export const armazemRevisao = criarArmazem({ getItem: (k) => disco().getItem(k), setItem: (k, v) => disco().setItem(k, v), removeItem: (k) => disco().removeItem(k) }, dono, avisar);
export const sincronizarRevisao = criarSincronizadorRevisao(armazemRevisao, dono, acessoAtual).sincronizar;
