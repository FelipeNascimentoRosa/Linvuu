import { useEffect, useRef } from 'react';

/** Ilustração decorativa: traços vetoriais independentes permitem desenhá-los sem ocultar conteúdo. */
export function RabiscoAprender() {
  return <svg className="br-rabisco-aprender" viewBox="0 0 500 300" fill="none" aria-hidden="true" focusable="false">
    <g className="br-rabisco-linhas" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path pathLength="1" d="M64 230 C92 155 142 134 232 164 L250 178 L266 165 C345 135 410 153 439 230 C377 205 309 204 250 236 C189 203 127 204 64 230 Z"/>
      <path pathLength="1" d="M250 178 C245 200 246 218 250 236 M70 235 C140 214 204 214 249 241 C301 214 374 212 434 235"/>
      <path pathLength="1" d="M94 199 C135 182 173 185 216 199 M104 210 C145 196 180 198 218 211 M282 198 C316 184 359 181 397 195 M281 211 C317 198 360 195 405 207"/>
      <path pathLength="1" d="M70 237 Q168 220 246 246 Q326 221 437 239 M74 242 Q170 228 246 250 Q335 227 431 244"/>
      <path pathLength="1" d="M357 169 L420 91 Q424 86 429 90 L437 96 Q441 100 436 105 L374 179 L351 186 Z M357 169 L374 179 M420 91 L436 105 M351 186 L360 174"/>
      <path pathLength="1" d="M101 112 C76 102 76 68 102 57 C130 45 162 57 163 80 C164 96 150 108 132 111 L119 126 L119 111 C113 112 107 112 101 112 Z"/>
      <path pathLength="1" d="M225 77 C199 66 201 34 227 25 C257 14 292 29 291 51 C291 68 278 80 257 81 L243 96 L242 81 C236 81 229 80 225 77 Z"/>
      <path pathLength="1" d="M321 118 C300 109 300 85 321 76 C344 66 371 77 371 94 C371 107 359 117 343 118 L334 129 L334 118 Z"/>
      <path pathLength="1" d="M48 256 C139 247 195 250 232 256 M265 256 C330 244 387 247 458 256 M45 261 C112 256 165 255 205 260"/>
    </g>
    <g className="br-rabisco-acentos" stroke="#B7791F" strokeWidth="3" strokeLinecap="round"><path pathLength="1" d="M37 178 l28 -13 M42 188 l22 -9 M436 141 l27 -15 M443 151 l22 -9 M201 265 q38 8 84 -1"/></g>
  </svg>;
}

/** Apresenta seções uma vez ao entrarem na tela; a página fica visível sem JS. */
export function useEntradaHome(ativo: boolean) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!ativo || !el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const itens = Array.from(el.querySelectorAll<HTMLElement>('.br-motion-item'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('br-motion-visivel'); obs.unobserve(entry.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
    itens.forEach((item) => { item.classList.add('br-motion-pronto'); obs.observe(item); });
    return () => { obs.disconnect(); itens.forEach((item) => item.classList.remove('br-motion-pronto', 'br-motion-visivel')); };
  }, [ativo]);
  return root;
}
