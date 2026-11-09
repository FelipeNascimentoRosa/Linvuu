import { useDestinoSessao } from '../lib/useDestinoSessao';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { DIAS, FASES, IDIOMAS_GRAMATICA, coberturaDoCurso, diaDoCurso, gruposDoCurso, inicioDoNivel, NIVEL_CURTO, NIVEL_LABEL, STATUS_AULA, getCurso, statusDoCurso } from '../lib/content';
import { Navegacao } from '../components/Navegacao';
import { usePageTitle } from '../lib/usePageTitle';
import { SITE_URL } from '../config/site';
import { LOCALE, LOCALES, useT } from '../i18n';
import { gratis } from '../config/planos';
import { pontoDeRetomada, useDiasFeitos } from '../lib/retomar';
import NaoEncontrada from './NaoEncontrada';
import CursoBr from './CursoBr';
import '../site-publico.css';
import { LIVROS } from '../config/livros';
import { Capacitor } from '@capacitor/core';
import { APRESENTACOES_CURSO } from '../lib/apresentacoes';

export default function Curso() {
  const destino = useDestinoSessao();
  const { id } = useParams();
  const [params] = useSearchParams();
  const t = useT();
  const curso = getCurso(id);
  const feitos = useDiasFeitos(curso?.id);
  usePageTitle(curso && curso.id !== 'br' ? t.cursoPagina.tituloSeo(curso.nome) : undefined, curso?.descricao, LOCALES.filter((l) => l.cursoOculto !== curso?.id).map((l) => l.codigo), !curso || curso.status === 'em-breve' || curso.id === LOCALE.cursoOculto);
  if (!curso) return <NaoEncontrada />;
  if (curso.id === 'br') return <CursoBr />;

  const stats = statusDoCurso(curso.id);
  const nivel = params.get('nivel');
  const inicio = nivel ? inicioDoNivel(curso.id, nivel) : undefined;
  const faseInicio = inicio ? (DIAS[inicio.dia - 1]?.fase ?? 1) : 1;
  const grupos = gruposDoCurso(curso.id);
  const grupoInicio = inicio ? grupos.find((x) => inicio.dia >= x.dias[0] && inicio.dia <= x.dias[1]) : undefined;
  const tituloInicio = grupoInicio ? t.cursoPagina.aulaTitulo(grupoInicio.aula, grupoInicio.titulo) : (inicio && DIAS[inicio.dia - 1] ? diaDoCurso(curso.id, DIAS[inicio.dia - 1]).titulo : '');
  const ultimo = grupos.length ? grupos[grupos.length - 1].dias[1] : 0;
  const fasesRestantes = FASES.filter((f) => f.dias[1] > ultimo);
  const cob = coberturaDoCurso(curso.id);
  const cobertura = t.cursoPagina.cobertura(cob.traduzidas, cob.total, t.linguas[cob.reserva]);
  const ret = grupos.length ? pontoDeRetomada(curso.id) : undefined;
  const grupoRet = ret && feitos.size ? grupos.find((x) => ret.dia >= x.dias[0] && ret.dia <= x.dias[1]) : undefined;
  const aberto = grupoInicio?.aula ?? grupoRet?.aula ?? grupos[0]?.aula;
  const aulasPorNivel = grupos.reduce<Record<string, number>>((acc, g) => { const k = g.nivel ?? ''; acc[k] = (acc[k] ?? 0) + 1; return acc; }, {});
  const livro = LIVROS.find((l) => l.capa === `/livros/${curso.id}-a1-a2-v1-600.webp`);
  const website = import.meta.env.VITE_ALVO !== 'apk' && !Capacitor.isNativePlatform();
  const retomar = ret && !inicio && (
        <section className="curso-retomar" aria-label={t.cursoPagina.feitas(feitos.size, ret.total)}>
          <Link to={destino(curso.id, feitos.size ? ret.dia : 1)} className="btn btn-primary">
            {feitos.size ? t.cursoPagina.continuar(ret.dia, ret.titulo) : t.cursoPagina.comecar}
          </Link>
          {feitos.size > 0 && (
            <span className="curso-retomar-prog">
              <span className="curso-retomar-barra" aria-hidden="true"><span style={{ width: `${Math.round((100 * feitos.size) / ret.total)}%` }} /></span>
              {t.cursoPagina.feitas(feitos.size, ret.total)}
            </span>
          )}
        </section>
      );

  return (
    <div className={LOCALE.codigo === 'pt-BR' ? 'pagina site-publico site-curso' : 'pagina'}>
      <Navegacao pai="/cursos" trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: t.geral.cursos, para: '/cursos' }, { rotulo: curso.nome }]} />

      <header className="curso-topo">
        <div>
          {LOCALE.codigo === 'pt-BR' && <p className="site-eyebrow">SEU PRÓXIMO IDIOMA, PASSO A PASSO</p>}
          <h1 className="pagina-h1">{curso.nome} {curso.nomeNativo !== curso.nome && <em lang={curso.id}>{curso.nomeNativo}</em>}</h1>
          <p className="lead">{curso.descricao}</p>
          <div className="curso-fatos">
            {t.cursoPagina.fatos.map((f) => <span key={f}>{f}</span>)}
            {stats && <span>{t.cursoPagina.noAr(stats.publicadas, stats.total)}</span>}
            {IDIOMAS_GRAMATICA.includes(curso.id) && <Link to={`/gramatica/${curso.id}`} className="link-gramatica">{t.cursoPagina.gramatica(curso.nome)}</Link>}
          </div>
          {website && retomar}

        </div>
        {website && LOCALE.codigo === 'pt-BR' && livro?.capa && <figure className="curso-livro">
          <img src={livro.capa} alt={`Capa do livro de ${curso.nome}, Coleção Linvuu`} width="600" height="800" decoding="async" />
          <figcaption><span>Coleção Linvuu · A1–A2</span><strong>Seu livro para ler, ouvir e voltar quando precisar.</strong><Link to={livro.link?.startsWith('/livros/') ? livro.link : '/livros'}>Ler 2 capítulos grátis →</Link></figcaption>
        </figure>}
      </header>

      {LOCALE.codigo === 'pt-BR' && <nav className="site-course-nav" aria-label="Níveis e opções do curso">{Object.keys(aulasPorNivel).filter(Boolean).map(n => <a key={n} href={`#nivel-${n}`}>{NIVEL_LABEL[n] ?? n}</a>)}{website && livro?.link?.startsWith('/livros/') && <Link to={livro.link}>Livro de {curso.nome} ↗</Link>}<Link to="/#planos">Comparar planos ↗</Link></nav>}
      {website && LOCALE.codigo === 'pt-BR' && APRESENTACOES_CURSO[curso.id] && <section aria-labelledby="curso-apresentacao" className="texto-legal">
        <h2 id="curso-apresentacao" className="pagina-h2">{APRESENTACOES_CURSO[curso.id].titulo}</h2>
        {APRESENTACOES_CURSO[curso.id].paragrafos.map((p) => <p key={p}>{p}</p>)}
      </section>}
      {!website && retomar}

      {cobertura && <p className="nota">{cobertura}</p>}

      {inicio && (
        <section className="aviso aviso-inicio">
          <h2>{t.cursoPagina.partida(inicio.dia)}</h2>
          <p>{t.cursoPagina.sugerimos(NIVEL_LABEL[nivel!] ?? nivel!, inicio.dia, tituloInicio)}</p>
          {inicio.aviso && <p>{inicio.aviso}</p>}
          <Link to={destino(curso.id, inicio.dia)} className="btn btn-primary">{t.cursoPagina.irPara(inicio.dia)}</Link>
        </section>
      )}
      {stats && stats.publicadas < stats.total && <p className="nota">{t.cursoPagina.producao}</p>}
      {grupos.map((g, gi) => {
        const nDias = g.dias[1] - g.dias[0] + 1;
        const feitasAula = Array.from({ length: nDias }, (_, k) => g.dias[0] + k).filter((n) => feitos.has(n)).length;
        const novoNivel = g.nivel && g.nivel !== grupos[gi - 1]?.nivel;
        return (
        <div key={g.aula}>
        {novoNivel && (
          <h2 className="curso-nivel" id={`nivel-${g.nivel}`}>
            {NIVEL_LABEL[g.nivel!] ?? g.nivel} <small>{t.cursoPagina.aulasNivel(aulasPorNivel[g.nivel!] ?? 0)}</small>
          </h2>
        )}
        <details className="fase-bloco" open={g.aula === aberto}>
          <summary>
            <span className="fase-num">{t.cursoPagina.aula(g.aula)}</span>
            <strong>{g.titulo}</strong>
            <span className={`fase-dias ${feitasAula === nDias ? 'fase-feita' : ''}`}>{feitasAula > 0 ? `${feitasAula === nDias ? '✓ ' : ''}${feitasAula}/${nDias} · ` : ''}{t.cursoPagina.sessoes(g.dias[0], g.dias[1])}</span>
          </summary>
          <ol className="dias" start={g.dias[0]}>
            {Array.from({ length: g.dias[1] - g.dias[0] + 1 }, (_, k) => g.dias[0] + k).map((n) => {
              const m = DIAS[n - 1] ?? { dia: n, fase: Math.ceil(n / 10), nivel: 'a2' as const, titulo: '', objetivo: '' };
              const d = diaDoCurso(curso.id, m);
              const st = stats?.status[d.dia - 1] ?? 'planejada';
              return (
                <li key={d.dia} className={feitos.has(d.dia) ? 'dia-feito' : undefined}>
                  <Link to={destino(curso.id, d.dia)}>
                    <span className="dia-n">{feitos.has(d.dia) ? <span aria-label={t.cursoPagina.concluida}>✓</span> : d.dia}</span>
                    <span className="dia-t">{d.titulo}<small>{d.objetivo} · {gratis(d.dia) ? t.cursoPagina.gratis : t.cursoPagina.assinantes}</small></span>
                    {st !== 'publicada' && <span className={`pill pill-aula-${st}`}>{STATUS_AULA[st]}</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </details>
        </div>
        );
      })}
      {fasesRestantes.length > 0 && <h2 className="pagina-h2">{grupos.length ? t.cursoPagina.depois : t.cursoPagina.trilha}</h2>}
      {fasesRestantes.map((f) => (
        <details key={f.id} className="fase-bloco" open={!grupos.length && f.id === faseInicio}>
          <summary>
            <span className="fase-num">{t.cursoPagina.fase(f.id)}</span>
            <strong>{f.titulo}</strong>
            <span className="fase-nivel">{NIVEL_CURTO[f.nivel]}</span>
            <span className="fase-dias">{t.cursoPagina.sessoes(f.dias[0], f.dias[1])}</span>
          </summary>
          <ol className="dias" start={Math.max(f.dias[0], ultimo + 1)}>
            {DIAS.filter((d) => d.fase === f.id && d.dia > ultimo).map((m) => {
              const d = diaDoCurso(curso.id, m);
              const st = stats?.status[d.dia - 1] ?? 'planejada';
              return (
                <li key={d.dia}>
                  <Link to={destino(curso.id, d.dia)}>
                    <span className="dia-n">{d.dia}</span>
                    <span className="dia-t">{d.titulo}<small>{d.objetivo}</small></span>
                    {st !== 'publicada' && <span className={`pill pill-aula-${st}`}>{STATUS_AULA[st]}</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </details>
      ))}
    </div>
  );
}
