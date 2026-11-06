// Idiomas da INTERFACE. O idioma das explicações é uma preferência separada por curso. O endereço diz o idioma: / (português), /en (inglês), /es (espanhol).
// A base de cada curso (o idioma estudado: palavras, frases, diálogos e áudio) é a mesma; muda só a explicação.
import { SITE_URL, SITE_GLOBAL_URL } from '../config/site';
export type CodigoLocale = 'pt-BR' | 'en' | 'es';
/** Língua do material pedagógico, independente da interface e do idioma estudado. */
export type Explicacao = 'pt' | 'en' | 'es';
export interface Locale {
  codigo: CodigoLocale; rotulo: string; nome: string; prefixo: '' | '/en' | '/es';
  /** Público editorial das páginas públicas/SEO; não determina a língua carregada nas aulas. */
  explicacao: Explicacao; og: string; dataLocale: string;
  /** Curso que não aparece para este público (é a língua dele). */
  cursoOculto: string;
  /** Ordem da vitrine. */
  ordem: string[];
}

/**
 * Perfil de domínio. Cada domínio tem a sua própria estrutura de endereços:
 *  - br (linvuu.com.br, o app/APK e o desenvolvimento): / português, /en inglês, /es espanhol (como sempre foi).
 *  - global (linvuu.com): / inglês, /es espanhol. Português vive só no .com.br.
 * O perfil vem do host no navegador; o servidor o define por requisição (síncrona) com comPerfil().
 */
export type Perfil = 'br' | 'global';
const PREFIXOS: Record<Perfil, Record<CodigoLocale, string>> = {
  br: { 'pt-BR': '', en: '/en', es: '/es' },
  global: { 'pt-BR': '', en: '', es: '/es' },
};
export const perfilDoHost = (host: string): Perfil => (/(^|\.)linvuu\.com$/i.test((host || '').split(':')[0]) ? 'global' : 'br');
let perfil: Perfil = typeof window === 'undefined' ? 'br' : perfilDoHost(window.location.hostname);
export const perfilAtual = (): Perfil => perfil;
/** Executa fn (síncrona!) com o perfil do host da requisição e restaura o anterior. */
export function comPerfil<T>(p: Perfil, fn: () => T): T {
  const antes = perfil; perfil = p;
  try { return fn(); } finally { perfil = antes; }
}
/** Domínio onde cada idioma "mora": português no .com.br; inglês e espanhol no .com. */
export const perfilDoIdioma = (c: CodigoLocale): Perfil => (c === 'pt-BR' ? 'br' : 'global');
export const siteDoIdioma = (c: CodigoLocale): string => (perfilDoIdioma(c) === 'br' ? SITE_URL : SITE_GLOBAL_URL);

const def = (codigo: CodigoLocale, rotulo: string, nome: string, explicacao: Explicacao, og: string, dataLocale: string, cursoOculto: string, ordem: string[]): Locale => ({
  codigo, rotulo, nome, explicacao, og, dataLocale, cursoOculto, ordem,
  get prefixo() { return PREFIXOS[perfil][codigo] as Locale['prefixo']; },
});
export const LOCALES: Locale[] = [
  def('pt-BR', 'PT', 'Português', 'pt', 'pt_BR', 'pt-BR', 'br', ['en', 'es', 'de', 'fr', 'it', 'ru']),
  // inglês: primeiro o que já está inteiro explicado em inglês (português do Brasil, russo, francês), depois o que está em tradução
  def('en', 'EN', 'English', 'en', 'en_US', 'en-US', 'en', ['br', 'ru', 'fr', 'es', 'de', 'it']),
  def('es', 'ES', 'Español', 'es', 'es_ES', 'es-ES', 'es', ['br', 'en', 'de', 'fr', 'it', 'ru']),
];
export const LOCALE_PADRAO: CodigoLocale = 'pt-BR';
/** Idioma de um endereço sem prefixo neste domínio: português no .com.br, inglês no .com. */
export const localePadrao = (): Locale => (perfil === 'global' ? LOCALES[1] : LOCALES[0]);

/** Locale de um caminho (/en/cursos → en; no .com, /cursos → en e /es/cursos → es). */
export const localeDoCaminho = (caminho: string): Locale => {
  const achado = LOCALES.find((l) => l.prefixo && (caminho === l.prefixo || caminho.startsWith(`${l.prefixo}/`)));
  return achado ?? localePadrao();
};
/** Caminho sem o prefixo de idioma (/en/cursos → /cursos). */
export const semPrefixo = (caminho: string): string => {
  const l = localeDoCaminho(caminho);
  return l.prefixo ? caminho.slice(l.prefixo.length) || '/' : caminho;
};
/** O mesmo caminho em outro idioma, no domínio ATUAL (para links dentro do mesmo domínio). */
export const caminhoEm = (codigo: CodigoLocale, caminho: string): string => {
  const l = LOCALES.find((x) => x.codigo === codigo) ?? LOCALES[0];
  const base = semPrefixo(caminho);
  return l.prefixo ? (base === '/' ? l.prefixo : `${l.prefixo}${base}`) : base;
};
/** Endereço absoluto canônico de uma página em um idioma, no domínio onde esse idioma mora (independe do domínio que serve a requisição). */
export const urlAbsolutaEm = (codigo: CodigoLocale, caminho: string): string => {
  const base = semPrefixo(caminho);
  const pre = PREFIXOS[perfilDoIdioma(codigo)][codigo];
  return siteDoIdioma(codigo) + (pre ? (base === '/' ? pre : pre + base) : base);
};
/** Caminho de um idioma no perfil dado, a partir de um caminho sem prefixo (usado nos redirecionamentos de domínio). */
export const caminhoNoPerfil = (p: Perfil, codigo: CodigoLocale, base: string): string => {
  const pre = PREFIXOS[p][codigo];
  return pre ? (base === '/' ? pre : pre + base) : base;
};
/** Cada idioma no perfil do domínio onde ele realmente mora (para testes e geradores que percorrem o site inteiro). */
export const LOCALES_POR_PERFIL: [Perfil, Locale][] = [['br', LOCALES[0]], ['global', LOCALES[1]], ['global', LOCALES[2]]];
