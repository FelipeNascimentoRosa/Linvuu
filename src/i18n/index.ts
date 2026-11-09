import { ptBR, Dicionario } from './pt-BR';
import { en } from './en';
import { CodigoLocale, LOCALES, Locale, caminhoEm, localeDoCaminho, perfilAtual, perfilDoIdioma, urlAbsolutaEm } from './locales';

const DICIONARIOS: Record<CodigoLocale, Dicionario> = { 'pt-BR': ptBR, en };
const CHAVE = 'linvuu:locale';

/** Idioma desta visita, decidido pelo endereço (/en ou sem prefixo). Trocar de idioma recarrega a página. */
export const LOCALE: Locale = typeof window === 'undefined' ? LOCALES[0] : localeDoCaminho(window.location.pathname);
export const T: Dicionario = DICIONARIOS[LOCALE.codigo];
/** Textos do idioma atual do site. */
export const useT = (): Dicionario => T;
export const dicionario = (codigo: CodigoLocale) => DICIONARIOS[codigo];
export { LOCALES };

/** Guarda a escolha explícita do visitante. */
export const lembrarLocale = (codigo: CodigoLocale) => { try { localStorage.setItem(CHAVE, codigo); } catch { /* sem armazenamento */ } };
/** Escolha guardada; só vale quando o visitante escolheu na barra do topo. */
export const localeLembrado = (): CodigoLocale | null => {
  try { const v = localStorage.getItem(CHAVE); return LOCALES.some((l) => l.codigo === v) ? (v as CodigoLocale) : null; } catch { return null; }
};
/** Endereço desta mesma página em outro idioma. */
const HOSTS_DO_SITE = /^(www\.)?linvuu\.com(\.br)?$/i;
export const urlEm = (codigo: CodigoLocale) => {
  const resto = `${window.location.search}${window.location.hash}`;
  // Nos domínios do site, cada idioma mora num domínio (PT no .com.br; EN e ES no .com): trocar de domínio exige endereço absoluto.
  // Fora deles (desenvolvimento, app Android, prévias), a estrutura antiga /, /en, /es continua valendo.
  if (HOSTS_DO_SITE.test(window.location.hostname) && perfilDoIdioma(codigo) !== perfilAtual()) return `${urlAbsolutaEm(codigo, window.location.pathname)}${resto}`;
  return `${caminhoEm(codigo, window.location.pathname)}${resto}`;
};
/** Caminho absoluto (fora do roteador) no idioma atual: para links <a> e window.location. */
export const comPrefixo = (caminho: string) => caminhoEm(LOCALE.codigo, caminho);
/** Formata data no idioma atual. */
export const data = (segundos: number) => new Date(segundos * 1000).toLocaleDateString(LOCALE.dataLocale);
