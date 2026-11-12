import { Link } from 'react-router-dom';
import '../livros.css';
import { SITE_URL } from '../config/site';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { POR_QUE } from '../lib/porQue';

/** "Por que estudar com a Linvuu?": os motivos, em fatos verificáveis. Existe em português (.com.br) e em inglês (.com). */
export default function PorQue() {
  const x = POR_QUE[LOCALE.codigo];
  usePageTitle(x.seoTitulo ?? x.titulo, x.seoDescricao ?? x.descricao, ['pt-BR', 'en'], false);
  return (
    <div className="pagina lvr">
      <header className="lvr-topo">
        <p className="lv-kicker lv-kicker-esc">{x.kicker}</p>
        <h1 className="pagina-h1">{x.titulo}</h1>
        <p className="lead">{x.lead}</p>
      </header>

      <section className="lvr-artigo" aria-label={x.motivosRotulo}>
        {x.motivos.map((m, i) => (
          <div key={m.id} id={m.id}>
            <h2 className="lvr-h2" style={i === 0 ? { marginTop: 0 } : undefined}>{m.titulo}</h2>
            <p className="lvr-p">{m.texto}</p>
          </div>
        ))}

        <h2 className="lvr-h2">{x.paraQuemTitulo}</h2>
        <p className="lvr-p">{x.paraQuem}</p>

        <h2 className="lvr-h2">{x.ctaTitulo}</h2>
        <p className="lvr-p">
          {x.ctaSegmentos.map((s, i) => (s.link === '/livros' && LOCALE.codigo === 'en' ? <a key={i} href={`${SITE_URL}/livros`}>{s.texto}</a> : s.link ? <Link key={i} to={s.link}>{s.texto}</Link> : <span key={i}>{s.texto}</span>))}
        </p>
      </section>
    </div>
  );
}
