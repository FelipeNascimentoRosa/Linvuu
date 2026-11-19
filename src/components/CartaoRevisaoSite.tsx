import { lazy, Suspense } from 'react';

/** Cartão da revisão espaçada só no site. No build do APK a constante `VITE_ALVO` é trocada na compilação, a ramificação cai
 *  e o `import()` some junto: o APK tem a revisão própria (src/plataforma/apk) e não leva o código do Web. */
const Cartao = import.meta.env.VITE_ALVO === 'apk' ? null : lazy(() => import('./CartaoRevisao').then((m) => ({ default: m.CartaoRevisao })));

export function CartaoRevisaoSite({ idioma }: { idioma: string }) {
  return Cartao ? <Suspense fallback={null}><Cartao idioma={idioma} /></Suspense> : null;
}
