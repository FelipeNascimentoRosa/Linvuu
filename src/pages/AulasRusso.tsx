import { Link, Navigate } from 'react-router-dom';
import '../livros.css';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { AULAS_RUSSO, whatsappAulasRusso } from '../config/aulas-russo';

/** Aulas ao vivo de russo (pt e en). Em espanhol a página não existe: volta para a home. */
export default function AulasRusso() {
  const cod = LOCALE.codigo === 'en' ? 'en' : 'pt-BR';
  const t = AULAS_RUSSO[cod];
  usePageTitle(t.titulo, t.descricao, ['pt-BR', 'en'], LOCALE.codigo === 'es');
  if (LOCALE.codigo === 'es') return <Navigate to="/" replace />;
  const wa = whatsappAulasRusso(cod);
  return (
    <div className="pagina lvr">
      <header className="lvr-topo">
        <p className="lv-kicker lv-kicker-esc">{cod === 'en' ? 'Live lessons' : 'Aulas ao vivo'}</p>
        <h1 className="pagina-h1">{t.titulo}</h1>
        <p className="lead">{t.lead}</p>
      </header>
      <section className="lvr-artigo" aria-label={t.comoTitulo}>
        {t.credenciais.length > 0 && <><h2 id="ar-quem" className="lvr-h2" style={{ marginTop: 0 }}>{t.quemTitulo}</h2>
        <ul>{t.credenciais.map((c) => <li key={c} className="lvr-p">{c}</li>)}</ul></>}
        <h2 className="lvr-h2">{t.comoTitulo}</h2>
        <ul>{t.como.map((c) => <li key={c} className="lvr-p">{c}</li>)}</ul>
        <h2 className="lvr-h2">{t.testeTitulo}</h2>
        <p className="lvr-p">{t.teste} <Link to="/curso/ru">{t.testeLink}</Link></p>
        <h2 className="lvr-h2">{t.ctaTitulo}</h2>
        <p className="lvr-p">{t.cta}</p>
        <p>{wa && <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">{t.ctaBotao}</a>}</p>
        {cod === 'pt-BR' && <p className="lvr-p"><Link to="/contato">{t.ctaAlternativa}</Link></p>}
      </section>
    </div>
  );
}
