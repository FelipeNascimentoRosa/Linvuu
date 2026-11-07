import { useDestinoSessao } from '../lib/useDestinoSessao';
import { Link } from 'react-router-dom';
import { gruposDoCurso, statusDoCurso, coberturaDoCurso } from '../lib/content';
import { Navegacao } from '../components/Navegacao';
import { usePageTitle } from '../lib/usePageTitle';
import { SITE_URL } from '../config/site';
import { SESSOES_GRATIS } from '../config/planos';
import { LOCALE, useT } from '../i18n';

/** Página do curso de português do Brasil para estrangeiros (inglês e espanhol). */
export default function CursoBr() {
  const destino = useDestinoSessao();
  const t = useT();
  const c = t.cursoBr;
  usePageTitle(c.tituloSeo, c.descSeo, ['en']);
  const grupos = gruposDoCurso('br');
  const stats = statusDoCurso('br');
  const cob = coberturaDoCurso('br');
  const cobertura = t.cursoPagina.cobertura(cob.traduzidas, cob.total, t.linguas[cob.reserva]);
  return (
    <div className="pagina">
      <Navegacao idioma="br" pai="/portugues" trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: c.migalha, para: '/portugues' }, { rotulo: t.geral.cursos }]} />
      <header className="curso-topo">
        <div>
          <h1 className="pagina-h1">{c.h1} <em lang="pt-BR">{c.h1b}</em></h1>
          <p className="lead">{c.lead(grupos.length || 62)}</p>
          <div className="curso-fatos">
            <span>{c.sessoes(stats?.total ?? 248)}</span><span>{c.doZero}</span><span>{c.gratis(SESSOES_GRATIS)}</span>
            <Link to="/gramatica/br" className="link-gramatica">{t.cursoPagina.gramatica(c.h1)}</Link>
            <Link to="/portugues" className="link-gramatica">{c.sobre}</Link>
          </div>
        </div>
      </header>
      {cobertura && <p className="nota">{cobertura}</p>}
      {c.niveis.map((n) => {
        const lista = grupos.filter((g) => (g.nivel ?? 'a1') === n.k);
        if (!lista.length) return null;
        return (
          <section key={n.k}>
            <h2 className="pagina-h2">{n.titulo}</h2>
            {n.resumo && <p className="nota">{n.resumo}</p>}
            {lista.map((g, i) => (
              <details key={g.aula} className="fase-bloco" open={n.k === 'a1' && i === 0}>
                <summary>
                  <span className="fase-num">{t.cursoPagina.aula(g.aula)}</span>
                  <strong>{g.titulo}</strong>
                  <span className="fase-dias">{t.cursoPagina.sessoes(g.dias[0], g.dias[1])}</span>
                </summary>
                <ol className="dias" start={g.dias[0]}>
                  {Array.from({ length: g.dias[1] - g.dias[0] + 1 }, (_, k) => g.dias[0] + k).map((d, k) => (
                    <li key={d}>
                      <Link to={destino('br', d)}>
                        <span className="dia-n">{d}</span>
                        <span className="dia-t">{g.titulo}<small>{t.cursoPagina.sessaoDe(k + 1)} · {d > SESSOES_GRATIS ? t.cursoPagina.assinantes : t.cursoPagina.gratis}</small></span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </section>
        );
      })}
    </div>
  );
}
