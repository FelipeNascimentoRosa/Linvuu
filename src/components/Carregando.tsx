import { useT } from '../i18n';
import './carregando.css';

export default function Carregando({ marca = false }: { marca?: boolean }) {
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
        <p className="carga-vuu-texto">{t.geral.carregando}</p>
      </div>
    </div>
  );
}
