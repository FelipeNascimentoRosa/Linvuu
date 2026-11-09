import { Link } from 'react-router-dom';
import { EMAIL_OFICIAL } from '../config/site';
import { LOCALE, useT } from '../i18n';

const ic = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

/** Barra fina do topo (cada domínio tem um só idioma, então não há seletor de idioma): novidades, dúvidas e contato. */
export function BarraTopo({ semNovidades = false }: { semNovidades?: boolean }) {
  const t = useT();
  return (
    <div className="barra-topo">
      <div className="barra-topo-in">
        <nav className="barra-links" aria-label={t.barra.atalhos}>
          {!semNovidades && <Link to="/#novidades"><svg {...ic}><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>{t.barra.novidades}</Link>}
          {LOCALE.codigo === 'pt-BR'
            ? <Link to="/contato"><svg {...ic}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>{t.barra.contato}</Link>
            : <a href={`mailto:${EMAIL_OFICIAL}`}><svg {...ic}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>{t.barra.contato}</a>}
        </nav>
      </div>
    </div>
  );
}
