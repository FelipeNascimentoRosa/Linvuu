import './vuu.css';

// Vuu ancorado (MOTION-SPEC): estados estáticos da pose B (balão de fala),
// sem animação e sem se mover pelo ecrã — por isso cumprem
// prefers-reduced-motion por construção. Quem decide QUANDO cada estado
// aparece é quem já tem o estado real da aprendizagem (ex.: Sessao.tsx, com
// `fim` e `errosSeguidos`); este componente só desenha. Variante verde
// (fundos claros) no `src`; na área do aluno em tema escuro, o CSS (vuu.css)
// troca pela variante papel, porque o verde perde contraste sobre o fundo
// verde-escuro. Estados servidos a ≥ 96 px, como manda marca/tokens.json
// (mascote.tamanho_minimo_px).
//
// "celebracao" e "erro-gentil" estão ligados em Sessao.tsx. "a-pensar" e
// "curioso" existem como estados prontos do sistema, mas ainda sem local
// de uso decidido no site — isso não é real até alguém os ligar a um ponto
// concreto da interface.
const ARTES = {
  celebracao: '/assets/vuu/vuu-celebracao.svg',
  'erro-gentil': '/assets/vuu/vuu-erro-gentil.svg',
  'a-pensar': '/assets/vuu/vuu-a-pensar.svg',
  curioso: '/assets/vuu/vuu-curioso.svg',
} as const;

export type EstadoVuu = keyof typeof ARTES;

// viewBox comum a todos os estados do sistema (pose B): 300 90 350 290. A
// altura segue a largura nessa proporção e o path do corpo é idêntico entre
// estados, por isso trocar de estado não desloca o layout (zero CLS entre
// estados).
export default function Vuu({ estado, largura = 96 }: { estado: EstadoVuu; largura?: number }) {
  return (
    <img
      className="vuu-estado"
      data-estado={estado}
      src={ARTES[estado]}
      alt=""
      aria-hidden="true"
      width={largura}
      height={Math.round((largura * 290) / 350)}
    />
  );
}
