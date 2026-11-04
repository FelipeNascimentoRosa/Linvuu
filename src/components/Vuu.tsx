import './vuu.css';

// Vuu ancorado (MOTION-SPEC): estados estáticos do sistema vetorial v2, sem
// animação e sem se mover pelo ecrã — por isso cumprem prefers-reduced-motion
// por construção. Quem decide QUANDO cada estado aparece é quem já tem o estado
// real da aprendizagem (ex.: Sessao.tsx, com `fim` e `errosSeguidos`); este
// componente só desenha. Variante verde (fundos claros) no `src`; na área do
// aluno em tema escuro, o CSS (vuu.css) troca pela variante papel, porque o
// verde perde contraste sobre o fundo verde-escuro (medido nas notas do
// sistema vetorial). Estados servidos a ≥ 96 px, como manda a decisão v2.
const ARTES = {
  celebracao: '/assets/vuu/vuu-celebracao.svg',
  'erro-gentil': '/assets/vuu/vuu-erro-gentil.svg',
} as const;

export type EstadoVuu = keyof typeof ARTES;

// viewBox comum a todos os estados do sistema: 40 70 486 474. A altura segue a
// largura nessa proporção e o path do corpo é idêntico entre estados, por isso
// trocar de estado não desloca o layout (zero CLS entre estados).
export default function Vuu({ estado, largura = 96 }: { estado: EstadoVuu; largura?: number }) {
  return (
    <img
      className="vuu-estado"
      data-estado={estado}
      src={ARTES[estado]}
      alt=""
      aria-hidden="true"
      width={largura}
      height={Math.round((largura * 474) / 486)}
    />
  );
}
