import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/usePageTitle';
import { JsonLd } from '../components/JsonLd';
import { EMAIL_OFICIAL } from '../config/site';
import { siteDoIdioma, urlAbsolutaEm } from '../i18n/locales';
import { precosDo, SESSOES_GRATIS } from '../config/planos';
import { LOCALE, useT } from '../i18n';

/** Página de entrada do curso de português do Brasil para estrangeiros, no idioma do site. Em português, serve para indicar o curso a estrangeiros. */
export default function Portugues() {
  const t = useT();
  const c = t.portugues;
  usePageTitle(c.tituloSeo, c.descSeo);
  const emPortugues = LOCALE.codigo === 'pt-BR';
  return (
    <div className="pagina pt-estrangeiros">
      <JsonLd dados={{ '@context': 'https://schema.org', '@type': 'Course', name: c.tituloSeo, description: c.descSeo, inLanguage: LOCALE.codigo, teaches: 'Brazilian Portuguese', url: urlAbsolutaEm(LOCALE.codigo, '/portugues'), provider: { '@type': 'Organization', name: 'Linvuu', url: siteDoIdioma(LOCALE.codigo) } }} />

      <header className="curso-topo">
        <div>
          <p className="lv-kicker lv-kicker-esc">{c.kicker}</p>
          <h1 className="pagina-h1">{c.h1} <em lang="pt-BR">Português do Brasil</em></h1>
          <p className="lead">{c.lead}</p>
          <div className="lv-hero-botoes">
            {emPortugues ? (
              <>
                <a href={urlAbsolutaEm('en', '/portugues')} hrefLang="en" className="btn btn-primary">{c.comecar}</a>
              </>
            ) : (
              <>
                <Link to="/curso/br/dia/1" className="btn btn-primary">{c.comecar}</Link>
                <Link to="/curso/br" className="btn btn-ghost">{c.ver}</Link>
              </>
            )}
          </div>
          <p className="nota">{c.nota(SESSOES_GRATIS, precosDo(LOCALE.codigo).mensal)}</p>
        </div>
      </header>

      <section aria-labelledby="pt-niveis">
        <h2 id="pt-niveis" className="pagina-h2">{c.niveisT}</h2>
        <div className="lv-niveis">
          {c.niveis.map((n) => (
            <article key={n.cod}>
              <div className="lv-nivel-cod"><span className="lv-cod">{n.cod}</span><span>{c.aulas(n.aulas)}</span></div>
              <p>{n.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="pt-como">
        <h2 id="pt-como" className="pagina-h2">{c.comoT}</h2>
        <ul className="pt-pontos">{c.pontos.map((p) => <li key={p}><span>{p}</span></li>)}</ul>
      </section>

      <section aria-labelledby="pt-honesto">
        <h2 id="pt-honesto" className="pagina-h2">{c.honestoT}</h2>
        <ul className="pt-pontos">
          <li><span>{c.honesto[0]}</span></li>
          <li><span>{c.honesto[1]} <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</span></li>
          <li><span>{c.honesto[2]}</span></li>
        </ul>
        {!emPortugues && (
          <div className="lv-hero-botoes">
            <Link to="/curso/br/dia/1" className="btn btn-primary">{c.comecar}</Link>
            <Link to="/assinatura" className="btn btn-ghost">{c.planos}</Link>
          </div>
        )}
      </section>
    </div>
  );
}
