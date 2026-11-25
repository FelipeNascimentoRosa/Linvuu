import { Link } from 'react-router-dom';
import { LOCALE } from '../i18n';

export function CreditoVitrine() {
  return <p>{LOCALE.codigo === 'en' ? 'Content by Felipe and Luiza. ' : 'Conteúdo de Felipe e Luiza. '}<Link to="/sobre">{LOCALE.codigo === 'en' ? 'About the authors' : 'Conheça os autores'}</Link></p>;
}
