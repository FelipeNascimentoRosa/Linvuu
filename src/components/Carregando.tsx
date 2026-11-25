import { useT } from '../i18n';
import './carregando.css';

export default function Carregando({ marca = false }: { marca?: boolean }) {
  const t = useT();
  return (
    <div className="esq" role="status">
      {marca && <img className="esq-marca" src="/brand/linvuu-wordmark-verde.svg" alt="Linvuu" width="156" height="50" />}
      <div className="esq-esqueleto" aria-hidden="true">
        <span className="esq-bloco esq-titulo" />
        <span className="esq-bloco esq-linha" />
        <span className="esq-bloco esq-linha esq-linha-curta" />
        <div className="esq-cartoes">
          <span className="esq-bloco esq-cartao" />
          <span className="esq-bloco esq-cartao" />
          <span className="esq-bloco esq-cartao" />
        </div>
      </div>
      <div className="esq-rodape">
        <p className="esq-texto">{t.geral.carregando}</p>
      </div>
    </div>
  );
}
