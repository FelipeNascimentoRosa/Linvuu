// Primeira abertura do app: escolhas guardadas no aparelho (língua materna, idioma de estudo, meta diária).
// Funções puras + leitura/gravação tolerante a falha de armazenamento (o app continua funcionando sem elas).
import type { CodigoLocale } from '../../i18n/locales';

export const CHAVE_FEITA = 'linvuu:primeira-abertura:v1';
export const CHAVE_CURSO = 'linvuu:curso-preferido';
export const CHAVE_META = 'linvuu:meta-diaria';
export const METAS = [1, 2, 3] as const;
export type Meta = (typeof METAS)[number];
const PRATICA = /^linvuu:pratica-apk:v1:/;

const ler = (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } };
const gravar = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* vale só nesta sessão */ } };

/** Já passou pela primeira abertura? Quem já estudou neste aparelho (versões antigas do app) não vê as telas de novo. */
export function primeiraAberturaFeita(): boolean {
  if (ler(CHAVE_FEITA) === '1') return true;
  try { for (let i = 0; i < localStorage.length; i++) if (PRATICA.test(localStorage.key(i) ?? '')) return true; } catch { return true; }
  return false;
}

export function concluirPrimeiraAbertura(e: { curso: string; meta: Meta }) {
  gravar(CHAVE_CURSO, e.curso); gravar(CHAVE_META, String(e.meta)); gravar(CHAVE_FEITA, '1');
}

export const cursoPreferido = (): string | null => ler(CHAVE_CURSO);
export function metaDiaria(): Meta { const n = Number(ler(CHAVE_META)); return (METAS as readonly number[]).includes(n) ? (n as Meta) : 1; }
export const gravarMeta = (m: Meta) => gravar(CHAVE_META, String(m));

/** Mesma data no fuso do aparelho. */
export const mesmoDia = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Quantas sessões tiveram prática registrada hoje (exercícios corrigidos), a partir dos registros locais. */
export function sessoesHoje(registros: { em?: unknown }[], agora = new Date()): number {
  return registros.filter((r) => typeof r.em === 'string' && !Number.isNaN(Date.parse(r.em)) && mesmoDia(new Date(r.em), agora)).length;
}

export function praticasLocais(): { em?: unknown }[] {
  const out: { em?: unknown }[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) ?? '';
      if (!PRATICA.test(k)) continue;
      try { const v = JSON.parse(localStorage.getItem(k) ?? 'null'); if (v && typeof v === 'object') out.push(v); } catch { /* registro inválido: ignora */ }
    }
  } catch { /* sem armazenamento */ }
  return out;
}

/** Caminho inicial do app no idioma escolhido (o app usa / para português e /en para inglês). */
export const inicioDoIdioma = (c: CodigoLocale) => (c === 'en' ? '/en' : '/');
