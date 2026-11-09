import '../livros.css';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { AUTORES } from '../lib/livros';
import { CONTATO } from '../lib/institucional';
import { contatos } from '../config/contato';
import { IconeContato } from '../components/IconesContato';

/** Contato: site, e-mail, WhatsApp (quando houver número) e LinkedIn dos autores.
 *  Existe em português (.com.br) e em inglês (.com) desde 09/11/2026 — era o último F1 do EN_AUDIT.md. */
export default function Contato() {
  const c = CONTATO[LOCALE.codigo];
  usePageTitle(c.seoTitulo, c.seoDescricao, ['pt-BR', 'en']);
  const canais = contatos(LOCALE.codigo).filter((x) => x.id !== 'linkedin');
  return (
    <div className="pagina lvr">
      <header className="lvr-topo">
        <p className="lv-kicker lv-kicker-esc">{c.kicker}</p>
        <h1 className="pagina-h1">{c.titulo}</h1>
        <p className="lead">{c.lead}</p>
      </header>

      <section className="lvr-artigo" aria-label={c.ariaCanais}>
        <ul className="lvr-grade contato-grade">
          {canais.map((x) => (
            <li key={x.id} id={x.id} className="lvr-cena contato-card">
              <a href={x.href} {...(x.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="contato-icone"><IconeContato id={x.id} size={26} /></span>
                <span className="contato-texto"><strong>{x.nome}</strong><span>{x.rotulo}</span></span>
              </a>
            </li>
          ))}
        </ul>

        <h2 id="linkedin" className="lvr-h2">LinkedIn</h2>
        <p className="lvr-p">{c.autoresNota}</p>
        <ul className="lvr-grade contato-grade">
          {AUTORES.map((a) => (
            <li key={a.id} className="lvr-cena contato-card">
              <a href={a.links[0]} target="_blank" rel="me noopener noreferrer">
                <span className="contato-icone"><IconeContato id="linkedin" size={26} /></span>
                <span className="contato-texto"><strong>{a.nome}</strong><span>{c.perfilRotulo}</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
