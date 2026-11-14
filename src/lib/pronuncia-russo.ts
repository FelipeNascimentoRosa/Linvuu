/** Gravação humana CC0 de кот, escolhida para substituir a síntese defeituosa. */
export const HASH_KOT = '0318a91e';
export const AUDIO_KOT = '/materiais/ru/kot-lvova-cc0.mp3';
export const pronunciaEspecial = (idioma: string, hash: string): string | undefined =>
  idioma === 'ru' && hash === HASH_KOT ? AUDIO_KOT : undefined;
