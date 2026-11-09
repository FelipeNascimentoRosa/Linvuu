import type { CodigoLocale } from '../i18n/locales';

/** Língua sugerida a partir do navegador, ou null se o visitante já está na língua certa. */
export function idiomaSugerido(navegador: readonly string[], atual: CodigoLocale): CodigoLocale | null {
  const pt = navegador.some((l) => /^pt\b/i.test(l));
  const primeira = navegador[0] ?? '';
  if (atual === 'pt-BR' && primeira && !/^pt\b/i.test(primeira) && !pt) return 'en';
  if (atual === 'en' && /^pt\b/i.test(primeira)) return 'pt-BR';
  return null;
}

