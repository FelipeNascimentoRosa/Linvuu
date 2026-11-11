import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LOCALE } from '../i18n';
import type { Cta } from '../config/ctas';

/** A home traduzida apresenta os materiais atuais, cujas explicações são em português.
 *  `cta` marca o botão para a medição de clique (data-cta, lote 6) sem inventar atributo fora da lista fechada. */
export function HomeCourseLink({ to, className, children, onClick, cta }: { to: string; className?: string; children: ReactNode; onClick?: () => void; cta?: Cta }) {
  return LOCALE.codigo === 'pt-BR'
    ? <Link to={to} className={className} onClick={onClick} data-cta={cta}>{children}</Link>
    : <a href={to} className={className} hrefLang="pt-BR" onClick={onClick} data-cta={cta}>{children}</a>;
}
