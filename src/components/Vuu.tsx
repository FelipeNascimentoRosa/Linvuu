import './vuu.css';

// Um só Vuu para todo o site (decisão do Felipe, 07/11/2026): balão de fala verde com contorno papel, que lê bem
// em fundo claro e escuro, sem variantes por estado ou por tema. Estático, sem animação: cumpre
// prefers-reduced-motion por construção. Servido a ≥ 96 px (marca/tokens.json, mascote.tamanho_minimo_px).
// viewBox 350 × 290: a altura segue a largura nessa proporção.
export const ARTE_VUU = '/assets/vuu/vuu.svg';

export default function Vuu({ largura = 96 }: { largura?: number }) {
  return <img className="vuu-estado" src={ARTE_VUU} alt="" aria-hidden="true" width={largura} height={Math.round((largura * 290) / 350)} />;
}
