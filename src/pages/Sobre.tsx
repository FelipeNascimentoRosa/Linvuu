import { Link } from 'react-router-dom';
import '../livros.css';
import { emailOficial, SITE_URL } from '../config/site';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { AUTORES } from '../lib/livros';
import { SOBRE } from '../lib/sobre';

/** Quem escreve a Linvuu: autoria, origem e método. Existe em português (.com.br) e em inglês (.com). */
export default function Sobre() {
  const s = SOBRE[LOCALE.codigo];
  usePageTitle(s.seoTitulo ?? s.titulo, s.seoDescricao ?? s.descricao, ['pt-BR', 'en'], false);
  return (
    <div className="pagina lvr">
      <header className="lvr-topo">
        <h1 className="pagina-h1">{s.h1}</h1>
        <p className="lead">{s.lead}</p>
      </header>

      <section className="lvr-artigo" aria-labelledby="sobre-autores">
        <h2 id="sobre-autores" className="lvr-h2" style={{ marginTop: 0 }}>{s.autoresTitulo}</h2>
        <ul className="lvr-grade" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, margin: '0 0 16px' }}>
          {AUTORES.map((a) => (
            <li key={a.id} id={a.id} className="lvr-cena" style={{ margin: 0 }}>
              <h3 className="lvr-h3" style={{ margin: '0 0 6px' }}>{a.nome}</h3>
              <p className="lvr-p" style={{ margin: 0, fontSize: 16 }}>{s.autorPapel}</p>
              <p className="lvr-p" style={{ margin: '8px 0 0', fontSize: 15 }}><a href={a.links[0]} rel="me noopener" target="_blank">LinkedIn</a> · <a href={a.links[1]} rel="me noopener" target="_blank">Facebook</a></p>
            </li>
          ))}
        </ul>
        <p className="lvr-p">{s.bio}</p>

        <h2 className="lvr-h2">{s.origemTitulo}</h2>
        <p className="lvr-p">{s.origem}</p>

        <h2 className="lvr-h2">{s.metodoTitulo}</h2>
        {s.metodo.map((m) => (
          <p key={m.titulo} className="lvr-p"><strong>{m.titulo}</strong> {m.texto}</p>
        ))}

        <h2 className="lvr-h2">{s.audioTitulo}</h2>
        <p className="lvr-p">{s.audio}</p>

        <h2 className="lvr-h2">{s.ctaTitulo}</h2>
        <p className="lvr-p">{LOCALE.codigo === 'en' ? <a href={`${SITE_URL}/livros`}>{s.ctaLivros}</a> : <Link to="/livros">{s.ctaLivros}</Link>}, <Link to="/cursos">{s.ctaCursos}</Link> {s.ctaOu} <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>.</p>
      </section>
    </div>
  );
}
