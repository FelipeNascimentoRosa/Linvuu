import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../livros.css';
import { SITE_URL } from '../config/site';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { POR_QUE } from '../lib/porQue';

/** Põe em destaque os trechos do lead listados em `destaques` (o texto continua o mesmo que o Google lê). */
function Destacado({ texto, destaques }: { texto: string; destaques: string[] }) {
  const alvo = new RegExp(`(${destaques.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return <>{texto.split(alvo).map((parte, i) => (i % 2 ? <strong key={i}>{parte}</strong> : <Fragment key={i}>{parte}</Fragment>))}</>;
}

/** "Por que estudar na Linvuu?": a promessa em uma frase e os motivos em fatos verificáveis. Existe em português (.com.br) e em inglês (.com). */
export default function PorQue() {
  const x = POR_QUE[LOCALE.codigo];
  usePageTitle(x.seoTitulo ?? x.titulo, x.seoDescricao ?? x.descricao, ['pt-BR', 'en'], false);
  return (
    <div className="pagina lvr pq">
      <header className="lvr-topo">
        <h1 className="pagina-h1">{x.titulo}</h1>
        <p className="pq-gancho">{x.gancho}</p>
        <p className="lead pq-lead"><Destacado texto={x.lead} destaques={x.destaques} /></p>
      </header>

      <section className="pq-motivos" aria-label={x.motivosRotulo}>
        {x.motivos.map((m) => (
          <article key={m.id} id={m.id} className="pq-motivo">
            <h2>{m.titulo}</h2>
            <p>{m.texto}</p>
          </article>
        ))}
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
