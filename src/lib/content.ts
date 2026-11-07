import { SESSOES_GRATIS } from '../config/planos';
import { carregarAuth } from './firebase';
import trilhaJson from '../../content/trilha.json';
import cursosJson from '../../content/cursos.json';
import indiceJson from '../../content/indice.json';
import type { InfoAula, SessaoAula } from './aulas';
import { api } from './api';
import { LOCALE, T } from '../i18n';
import type { Explicacao } from '../i18n/locales';
import { chaveExplicacao, explicacaoValida, resolverExplicacao, type IdiomasDaAula } from '../i18n/ensino';

export type StatusCurso = 'disponivel' | 'em-producao' | 'em-breve' | 'em-planejamento';
export type StatusAula = 'planejada' | 'em-producao' | 'publicada';
export type Nivel = 'zero' | 'a1' | 'a2' | 'b1';

export interface Curso {
  id: string; area: 'idiomas'; nome: string; nomeNativo: string;
  mascote: string; status: StatusCurso; descricao: string; dias: number | null;
}
export interface Fase { id: number; titulo: string; nivel: Nivel; resumo: string; dias: [number, number] }
export interface DiaMestre { dia: number; fase: number; nivel: Nivel; titulo: string; objetivo: string }
export interface Aula extends DiaMestre {
  idioma: string; status: StatusAula;
  /** Dias em sessões (aulas escritas): trazem a aula e a sessão. Dias planejados trazem as três camadas vazias. */
  aula?: InfoAula;
  sessao?: SessaoAula;
  comeceAqui?: { status: string; audio: string | null; palavras: unknown[] };
  imersao?: { status: string; texto: string | null; audio: string | null; vocabulario: unknown[] };
  pratica?: { status: string; exercicios: unknown[] };
  videoApoio?: { status: string; url: string | null; motivo: string | null };
  responsavel: string | null;
}

const CURSOS_BASE = cursosJson.cursos as (Curso & { i18n?: Record<string, { nome: string; descricao: string }> })[];
/** Cursos com nome e descrição no idioma do site. */
export const CURSOS: Curso[] = CURSOS_BASE.map(({ i18n, ...c }) => ({ ...c, ...(i18n?.[LOCALE.codigo] ?? {}) }));
export const FASES = trilhaJson.fases as Fase[];
export const DIAS = trilhaJson.dias as DiaMestre[];
type Traducao = { aulas: number[]; g: Record<string, string>; s: Record<string, string> };
/** Traduções dos títulos e lista de aulas por idioma de explicação (content/indice.en.json), carregadas antes de abrir o site. */
let TRADUCOES: Partial<Record<Explicacao, Record<string, Traducao>>> = {};
const ARQUIVOS_TR = import.meta.glob('../../content/indice.en.json', { import: 'default' }) as Record<string, () => Promise<Record<string, Traducao>>>;
const carregandoTr = new Map<Explicacao, Promise<void>>();
/** Índice de traduções de uma língua de explicação; cada um é baixado uma vez, só quando alguém precisa dele. */
export function carregarTraducao(l: Explicacao): Promise<void> {
  if (l === 'pt') return Promise.resolve();
  let p = carregandoTr.get(l);
  if (!p) {
    const f = ARQUIVOS_TR[`../../content/indice.${l}.json`];
    p = (f ? f().catch(() => ({})) : Promise.resolve({})).then((v) => { TRADUCOES[l] = v; });
    carregandoTr.set(l, p);
  }
  return p;
}
/** Antes de abrir o site: só o índice da língua de explicação desta versão (nenhum na versão em português, ~40 KB a menos
 * no caminho crítico). Os outros vêm depois, sem pressa, para quem troca a língua da explicação numa aula. */
export async function carregarTraducoes() {
  await carregarTraducao(LOCALE.explicacao);
  const depois = () => { void carregarTraducao('en'); };
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) window.requestIdleCallback(depois, { timeout: 4000 }); else setTimeout(depois, 2000);
}
const INDICE = indiceJson.cursos as unknown as Record<string, { total: number; publicadas: number; emProducao: number; planejadas: number; status: StatusAula[]; sobrescritos: Record<string, { t: string; o: string }>; grupos?: { aula: number; titulo: string; nivel?: string; dias: [number, number] }[]; fonte?: Explicacao; amostra?: { min: number; blocos: [string, number][] } }>;

/** Língua em que as explicações do curso foram escritas (o curso de português para estrangeiros foi escrito em inglês). */
export const fonteDoCurso = (id: string): Explicacao => INDICE[id]?.fonte ?? 'pt';
/** Sem escolha salva: a língua do site, se o curso já tem aulas traduzidas nela; senão a língua em que o curso foi escrito. Aula sem tradução cai na original (resolverExplicacao). */
export const explicacaoDoCurso = (id: string): Explicacao => {
  try { const v = localStorage.getItem(chaveExplicacao(id)); if (explicacaoValida(v)) return v; } catch { /* sem armazenamento */ }
  return (TRADUCOES[LOCALE.explicacao]?.[id]?.aulas.length ?? 0) > 0 ? LOCALE.explicacao : fonteDoCurso(id);
};
const traducao = (id: string, explicacao = explicacaoDoCurso(id)): Traducao | undefined => fonteDoCurso(id) === explicacao ? undefined : TRADUCOES[explicacao]?.[id];
/** Quantas aulas do curso estão explicadas no idioma do site (todas, quando o curso foi escrito nele). */
export const coberturaDoCurso = (id: string) => {
  const total = INDICE[id]?.grupos?.length ?? 0;
  if (fonteDoCurso(id) === explicacaoDoCurso(id)) return { traduzidas: total, total, reserva: explicacaoDoCurso(id) };
  return { traduzidas: traducao(id)?.aulas.length ?? 0, total, reserva: fonteDoCurso(id) };
};
/** A aula tem explicação no idioma do site? */
export const aulaTraduzida = (id: string, aula: number, explicacao = explicacaoDoCurso(id)) => fonteDoCurso(id) === explicacao || !!traducao(id, explicacao)?.aulas.includes(aula);

/** Título e objetivo do dia para um curso (alguns idiomas têm aulas próprias no lugar do texto-mestre). */
export const diaDoCurso = (id: string, d: DiaMestre) => {
  const o = INDICE[id]?.sobrescritos[d.dia];
  const tr = traducao(id)?.s[d.dia];
  // «Aula 3, sessão 2 de 4 · 30 min» é gerado pelo script das aulas; aqui sai no idioma do site.
  const m = o?.o.match(/^Aula (\d+), sessão (\d+) de (\d+) · (\d+) min$/);
  const objetivo = m ? T.player.kickerAula(Number(m[1]), m[2], Number(m[3]), Number(m[4])) : o?.o ?? d.objetivo;
  return { ...d, titulo: tr ?? o?.t ?? d.titulo, objetivo };
};

export const getCurso = (id?: string) => CURSOS.find((c) => c.id === id);
export const statusDoCurso = (id: string) => INDICE[id];
/** Aulas escritas do curso (cada uma com 4 sessões = 4 dias), com o título no idioma do site quando houver. */
export const gruposDoCurso = (id: string) => {
  const g = INDICE[id]?.grupos ?? [];
  const tr = traducao(id);
  return tr ? g.map((x) => ({ ...x, titulo: tr.g[x.aula] ?? x.titulo })) : g;
};
const ORDEM_NIVEL = ['zero', 'a1', 'a2', 'b1', 'b2', 'c1'];
export const NIVEL_LABEL: Record<string, string> = T.nivel.label;
export const NIVEL_CURTO: Record<string, string> = T.nivel.curto;
export const STATUS_CURSO = T.status.curso as Record<StatusCurso, string>;
export const STATUS_AULA = T.status.aula as Record<StatusAula, string>;

/** Dia sugerido para começar conforme o nível, calculado a partir das aulas reais de cada idioma. */
export function inicioDoNivel(id: string, nivel: string): { dia: number; aviso?: string } | undefined {
  const g = gruposDoCurso(id);
  if (!g.length) return INICIO_POR_NIVEL[nivel];
  if (nivel === 'zero') return { dia: 1 };
  const pedido = ORDEM_NIVEL.indexOf(nivel);
  const alvo = g.find((x) => ORDEM_NIVEL.indexOf(x.nivel ?? 'zero') >= pedido);
  const nome = getCurso(id)?.nome ?? id;
  if (!alvo) {
    const ult = g.filter((x) => x.nivel === g[g.length - 1].nivel)[0];
    return { dia: ult.dias[0], aviso: T.nivel.semNivel(nome, NIVEL_CURTO[nivel] ?? nivel.toUpperCase(), NIVEL_CURTO[ult.nivel ?? ''] ?? '', ult.aula) };
  }
  if (ORDEM_NIVEL.indexOf(alvo.nivel ?? 'zero') > pedido) return { dia: 1 };
  return { dia: alvo.dias[0], aviso: alvo.aula > 1 ? T.nivel.blocoComeca(NIVEL_CURTO[nivel] ?? '', alvo.aula) : undefined };
}

/** Dia sugerido para começar conforme o nível. A trilha é para iniciantes. */
export const INICIO_POR_NIVEL: Record<string, { dia: number; aviso?: string }> = {
  zero: { dia: 1 },
  a1: { dia: 25, aviso: 'Se algum ponto parecer novo, volte às aulas anteriores; elas são curtas.' },
  a2: { dia: 97, aviso: 'O bloco A2 começa na aula 25. As aulas 11 a 24 revisam a gramática, se você sentir falta.' },
  b1: { dia: 97, aviso: 'Ainda não há aulas de B1. Comece pelo dia 97 (início do bloco A2) como revisão; as aulas de B1 estão em planejamento.' },
  b2: { dia: 97, aviso: 'Esta trilha foi pensada para quem está começando. As trilhas avançadas ainda estão em planejamento; use o dia 97 como revisão.' },
  c1: { dia: 97, aviso: 'Esta trilha foi pensada para quem está começando e serve só como revisão no seu nível. As trilhas avançadas ainda estão em planejamento.' },
};

// Só as sessões grátis (1 a 8) vão dentro do site. As demais ficam no servidor e só saem para quem tem assinatura.
// Cada curso tem a versão escrita (dia-NNN.json) e as versões com a explicação traduzida (<en|es>/dia-NNN.json).
const aulas = import.meta.glob(['../../content/idiomas/*/dia-00{1,2,3,4,5,6,7,8}.json', '../../content/idiomas/*/{en,es}/dia-00{1,2,3,4,5,6,7,8}.json'], { import: 'default' }) as Record<string, () => Promise<Aula>>;
/** Uma nova tentativa para falhas de rede ou de arquivo (o pedaço do código pode falhar por uma queda de conexão). */
const comNovaTentativa = async <T,>(f: () => Promise<T>): Promise<T> => {
  try { return await f(); } catch { await new Promise((ok) => setTimeout(ok, 400)); return f(); }
};

/** Carrega a sessão com a explicação escolhida por curso; sem tradução, devolve a versão escrita (com `semTraducao`). */
export const carregarAula = async (idioma: string, dia: number, explicacao = explicacaoDoCurso(idioma)): Promise<Aula & { semTraducao?: Explicacao; idiomas: IdiomasDaAula }> => {
  await carregarTraducao(explicacao);
  const nnn = String(dia).padStart(3, '0');
  const pasta = fonteDoCurso(idioma) === explicacao ? '' : `${explicacao}/`;
  const grupo = INDICE[idioma]?.grupos?.find((g) => dia >= g.dias[0] && dia <= g.dias[1]);
  const traduzida = !pasta || (grupo ? aulaTraduzida(idioma, grupo.aula, explicacao) : false);
  const key = `../../content/idiomas/${idioma}/${traduzida ? pasta : ''}dia-${nnn}.json`;
  const marcar = (a: Aula) => ({ ...a, ...(!traduzida ? { semTraducao: fonteDoCurso(idioma) } : {}), idiomas: { interface: LOCALE.codigo, estudado: idioma, explicacaoSolicitada: explicacao, explicacaoEfetiva: resolverExplicacao(fonteDoCurso(idioma), explicacao, traduzida) } });
  if (aulas[key]) return marcar(await comNovaTentativa(() => aulas[key]()));
  if (dia <= SESSOES_GRATIS) throw new Error('aula não encontrada');
  return comNovaTentativa(async () => {
    const { auth } = await carregarAuth();
    const token = await auth.currentUser?.getIdToken();
    const r = await fetch(api(`/api/aula/${idioma}/${dia}${traduzida && pasta ? `?l=${explicacao}` : ''}`), { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    if (!r.ok) throw new Error(`aula não encontrada (${r.status})`);
    return marcar(await r.json());
  });
};

/** Cursos da vitrine no idioma do site: cada público vê os idiomas que não são o seu, na ordem pensada para ele. */
export const CURSOS_ATIVOS = CURSOS.filter((c) => c.id !== LOCALE.cursoOculto).sort((a, b) => LOCALE.ordem.indexOf(a.id) - LOCALE.ordem.indexOf(b.id));
/** O curso é para outro público (ex.: o curso de inglês, escrito para quem fala português, visto por quem escolheu o site em inglês). */
export const cursoDeOutroPublico = (id: string) => id === LOCALE.cursoOculto;
/** Cursos com a aba Gramática (gerada das aulas por scripts/gramatica.mjs). */
export const IDIOMAS_GRAMATICA = ['en', 'es', 'de', 'fr', 'it', 'ru', 'br'];
