import { useT } from '../i18n';
import './carregando.css';

// Esqueleto de carregamento com o Vuu — substitui a palavra "Carregando…" crua nos
// fallbacks globais: o ecrã de arranque (main.tsx, enquanto a sessão resolve), o
// fallback do Suspense (App.tsx, em cada navegação para uma rota lazy) e os estados
// de espera da página da aula (Dia.tsx: decisão de acesso e fetch dos dados).
// A arte por omissão é o estado sonolento do sistema vetorial v2 (variante verde,
// para fundos claros), servido a ≥ 96 px como manda a decisão v2; a prop `arte`
// continua a permitir trocar a arte sem tocar nos pontos de uso. Na área do aluno
// em tema escuro, o CSS (carregando.css) troca a arte padrão pela variante papel,
// porque o verde perde contraste sobre o fundo verde-escuro. Esqueleto em CSS
// puro, sem bibliotecas; a animação é uma respiração subtil, desligada com
// prefers-reduced-motion.
// `marca`: só no arranque, onde o wordmark é hoje a presença da marca na primeira tela.
const ARTE_PADRAO = '/assets/vuu/vuu-sonolento.svg';

export default function Carregando({ arte = ARTE_PADRAO, marca = false }: { arte?: string; marca?: boolean }) {
  const t = useT();
  return (
    <div className="carga-vuu" role="status">
      {marca && <img className="carga-vuu-marca" src="/brand/linvuu-wordmark-verde.svg" alt="Linvuu" width="156" height="50" />}
      <div className="carga-vuu-esqueleto" aria-hidden="true">
        <span className="carga-vuu-bloco carga-vuu-titulo" />
        <span className="carga-vuu-bloco carga-vuu-linha" />
        <span className="carga-vuu-bloco carga-vuu-linha carga-vuu-linha-curta" />
        <div className="carga-vuu-cartoes">
          <span className="carga-vuu-bloco carga-vuu-cartao" />
          <span className="carga-vuu-bloco carga-vuu-cartao" />
          <span className="carga-vuu-bloco carga-vuu-cartao" />
        </div>
      </div>
      <div className="carga-vuu-rodape">
        {/* viewBox do sistema vetorial: 40 70 486 474 — largura/altura nesta proporção para reservar o espaço certo antes de a imagem chegar. */}
        <img className="carga-vuu-mascote" data-padrao={arte === ARTE_PADRAO || undefined} src={arte} alt="" width="98" height="96" />
        <p className="carga-vuu-texto">{t.geral.carregando}</p>
      </div>
    </div>
  );
}
