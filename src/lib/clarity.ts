// Microsoft Clarity (mapa de cliques e gravação de sessão): só no site, só depois do «Permitir análise».
// Campos de formulário ficam mascarados pelo próprio Clarity; o projeto deve estar em mascaramento «Strict».
const PROJETO = 'z9md9l7788';
type Fila = ((...a: unknown[]) => void) & { q?: unknown[][] };
const w = () => window as unknown as { clarity?: Fila };
let carregado = false;
export const clarity = {
  permitir() {
    if (typeof window === 'undefined') return;
    if (!carregado) {
      carregado = true;
      const f: Fila = w().clarity ?? Object.assign((...a: unknown[]) => { (f.q = f.q ?? []).push(a); }, {});
      w().clarity = f;
      const s = document.createElement('script');
      s.async = true; s.src = `https://www.clarity.ms/tag/${PROJETO}`;
      document.head.appendChild(s);
    }
    w().clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  },
  recusar() { if (carregado) w().clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' }); },
};
