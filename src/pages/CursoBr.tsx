import { useDestinoSessao } from '../lib/useDestinoSessao';
import { Link } from 'react-router-dom';
import { gruposDoCurso, statusDoCurso, coberturaDoCurso } from '../lib/content';
import { Navegacao } from '../components/Navegacao';
import { usePageTitle } from '../lib/usePageTitle';
import { SESSOES_GRATIS } from '../config/planos';
import { LOCALE, useT } from '../i18n';
import { PerguntasCurso } from '../components/PerguntasCurso';
import { emailOficial } from '../config/site';
import { APRESENTACOES_CURSO_EN } from '../lib/apresentacoes';
import { CreditoVitrine } from '../components/CreditoVitrine';

/** Página do curso de português do Brasil para estrangeiros (explicado em inglês). */
export default function CursoBr() {
  const destino = useDestinoSessao();
  const t = useT();
  const c = t.cursoBr;
  const p = t.portugues;
  usePageTitle(c.tituloSeo, c.descSeo, ['en']);
  const grupos = gruposDoCurso('br');
  const stats = statusDoCurso('br');
  const cob = coberturaDoCurso('br');
  const cobertura = t.cursoPagina.cobertura(cob.traduzidas, cob.total, t.linguas[cob.reserva]);
  return (
    <div className="pagina">
      <Navegacao idioma="br" pai="/cursos" trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: t.geral.cursos, para: '/cursos' }, { rotulo: c.h1 }]} />
      <header className="curso-topo">
        <div>
          <h1 className="pagina-h1">Brazilian Portuguese course for English speakers</h1>
          <p className="curso-nativo" lang="pt-BR">{c.h1b}</p>
          <p className="lead">{c.lead(grupos.length || 62)}</p>
          <div className="curso-fatos">
            <span>{c.sessoes(stats?.total ?? 248)}</span><span>{c.doZero}</span><span>{c.gratis(SESSOES_GRATIS)}</span>
            <Link to="/gramatica/br" className="link-gramatica">{t.cursoPagina.gramatica(c.h1)}</Link>
          </div>
        </div>
      </header>
      <CreditoVitrine />
      <section aria-labelledby="course-introduction"><h2 id="course-introduction">{APRESENTACOES_CURSO_EN.br.titulo}</h2>{APRESENTACOES_CURSO_EN.br.paragrafos.map((p) => <p key={p}>{p}</p>)}</section>
      {cobertura && <p className="nota">{cobertura}</p>}
      {/* Desde 13/11/2026 /portugues redireciona para cá (as duas disputavam a mesma busca): os níveis e as respostas diretas vieram junto. */}
      <section aria-labelledby="br-niveis">
        <h2 id="br-niveis" className="pagina-h2">{p.niveisT}</h2>
        <div className="lv-niveis">
          {p.niveis.map((n) => (
            <article key={n.cod}>
              <div className="lv-nivel-cod"><span className="lv-cod">{n.cod}</span><span>{p.aulas(n.aulas)}</span></div>
              <p>{n.d}</p>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="br-honesto">
        <h2 id="br-honesto" className="pagina-h2">{p.honestoT}</h2>
        <ul className="pt-pontos">
          {p.pontos.map((x) => <li key={x}><span>{x}</span></li>)}
          <li><span>{p.honesto[0]}</span></li>
          <li><span>{p.honesto[1]} <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>.</span></li>
          <li><span>{p.honesto[2]}</span></li>
        </ul>
      </section>
      {import.meta.env.VITE_ALVO !== 'apk' && LOCALE.codigo !== 'pt-BR' && cob.total > 0 && cob.traduzidas >= cob.total && <PerguntasCurso id="br" nome={c.h1} grupos={grupos} />}
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
