import { Link } from 'react-router-dom';
import '../livros.css';
import { SITE_URL } from '../config/site';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { POR_QUE } from '../lib/porQue';

/** "Por que estudar na Linvuu?": gancho, quatro quadrados coloridos (o que se estuda quando é necessário), seis motivos curtos e um CTA. pt-BR no .com.br, EN no .com. */
export default function PorQue() {
  const x = POR_QUE[LOCALE.codigo];
  usePageTitle(x.seoTitulo ?? x.titulo, x.seoDescricao ?? x.descricao, ['pt-BR', 'en'], false);
  return (
    <div className="pagina lvr pq">
      <header className="lvr-topo">
        <h1 className="pagina-h1">{x.titulo}</h1>
        <p className="pq-gancho">{x.gancho}</p>
        <p className="lead pq-lead">{x.lead}</p>
      </header>

      <section className="pq-bloco" aria-labelledby="pq-nec-t">
        <h2 id="pq-nec-t" className="pq-h2">{x.necessarioTitulo}</h2>
        <ul className="pq-quadros">
          {x.necessario.map((m) => (
            <li key={m.id} id={m.id} className="pq-quadro">
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pq-bloco" aria-label={x.motivosRotulo}>
        <ul className="pq-motivos">
          {x.motivos.map((m) => (
            <li key={m.id} id={m.id} className="pq-motivo">
              <h2>{m.titulo}</h2>
              <p>{m.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pq-fim" aria-labelledby="pq-fim-t">
        <h2 id="pq-fim-t">{x.ctaTitulo}</h2>
        <Link className="pq-botao" to={x.ctaBotao.link}>{x.ctaBotao.texto} <span aria-hidden="true">→</span></Link>
        <p>
          {x.ctaSegmentos.map((s, i) => (s.link === '/livros' && LOCALE.codigo === 'en' ? <a key={i} href={`${SITE_URL}/livros`}>{s.texto}</a> : s.link ? <Link key={i} to={s.link}>{s.texto}</Link> : <span key={i}>{s.texto}</span>))}
        </p>
      </section>
    </div>
  );
}
