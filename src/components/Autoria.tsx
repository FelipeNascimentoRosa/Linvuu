import { Link } from 'react-router-dom';
import { LOCALE } from '../i18n';

/** Autoria editorial: preserva os dois autores apresentados na página institucional. */
export function Autoria() {
  const en = LOCALE.codigo === 'en';
  return <aside className="autoria-editorial" aria-label={en ? 'About the authors' : 'Sobre os autores'}>
    <p>{en ? 'Written by Felipe Nascimento Rosa and Luiza Nascimento Rosa, mathematicians with experience in linguistics and language teaching.' : 'Conteúdo escrito por Felipe Nascimento Rosa e Luiza Nascimento Rosa, matemáticos com experiência em linguística e ensino de idiomas.'} <Link to="/sobre">{en ? 'Meet the authors' : 'Conheça os autores'}</Link></p>
  </aside>;
}
