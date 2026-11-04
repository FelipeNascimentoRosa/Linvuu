import { useDestinoSessao } from '../lib/useDestinoSessao';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Aula, FASES, NIVEL_LABEL, STATUS_AULA, carregarAula, getCurso, statusDoCurso, aulaTraduzida, fonteDoCurso, explicacaoDoCurso } from '../lib/content';
import { Navegacao } from '../components/Navegacao';
import Carregando from '../components/Carregando';
import { Sessao } from '../components/Sessao';
import { AreaAluno, MarcarDia } from '../components/AreaAluno';
import { usePageTitle } from '../lib/usePageTitle';
import { Paywall } from '@plataforma/Bloqueio';
import { useAssinatura } from '../lib/acesso';
import { textos } from '../lib/textos';
import { gratis, SESSOES_POR_AULA } from '../config/planos';
import NaoEncontrada from './NaoEncontrada';
import { IdiomaExplicacao } from '../components/IdiomaExplicacao';
import { lembrarExplicacao } from '../i18n/ensino';
import type { Explicacao } from '../i18n/locales';
import { LOCALE, useT } from '../i18n';
import { Capacitor } from '@capacitor/core';
import { ReportarProblema } from '../components/ReportarProblema';
import { GUIA_SESSAO } from '../lib/comecar';

const CAMADAS = ['comeceAqui', 'imersao', 'pratica'] as const;
/** No celular, o objetivo e o guia ficam recolhidos para a aula começar logo na primeira tela. */
const telaLarga = () => typeof window === 'undefined' || window.matchMedia('(min-width: 901px)').matches;

export default function Dia() {
  const destino = useDestinoSessao();
  const { id, n } = useParams();
  const curso = getCurso(id);
  const T = textos(curso?.id);
  const t = useT();
  const dia = Number(n);
  const total = statusDoCurso(curso?.id ?? '')?.total ?? 120;
  const valido = !!curso && curso.area === 'idiomas' && Number.isInteger(dia) && dia >= 1 && dia <= total;
  const [aula, setAula] = useState<Awaited<ReturnType<typeof carregarAula>> | null>(null);
  const [explicacao, setExplicacao] = useState<Explicacao>(() => explicacaoDoCurso(id ?? ''));
  useEffect(() => setExplicacao(explicacaoDoCurso(id ?? '')), [id]);
  const [erro, setErro] = useState(false);
  const ass = useAssinatura();
  const bloqueado = !gratis(dia) && !ass.ativa && !import.meta.env.DEV;
  const decidindo = !gratis(dia) && ass.carregando && !import.meta.env.DEV;

  useEffect(() => {
    if (!valido || bloqueado || decidindo) { setAula(null); return; }
    let cancelado = false;
    setAula(null); setErro(false);
    carregarAula(curso!.id, dia, explicacao).then((a) => { if (cancelado) return; try { sessionStorage.removeItem('linvuu:recarregou-aula'); } catch { /* ok */ } setAula(a); }).catch((e: unknown) => {
      if (cancelado) return;

      console.error('Falha ao carregar a aula', curso!.id, dia, e);
      // Arquivo de aula que não existe mais depois de uma publicação nova: uma recarga resolve. Só uma vez, para não entrar em laço.
      const msg = String((e as Error)?.message ?? e);
      const recarregou = (() => { try { return sessionStorage.getItem('linvuu:recarregou-aula'); } catch { return '1'; } })();
      if (/Failed to fetch dynamically imported module|Loading chunk|Importing a module script failed/i.test(msg) && !recarregou) {
        try { sessionStorage.setItem('linvuu:recarregou-aula', '1'); } catch { /* sem armazenamento: recarrega mesmo assim */ }
        window.location.reload();
        return;
      }
      setErro(true);
    });
    return () => { cancelado = true; };
  }, [valido, curso, dia, bloqueado, decidindo, explicacao]);

  usePageTitle(aula ? `${T.rotuloDia(dia)}: ${aula.titulo} · ${curso!.nome}` : undefined, undefined, [], !valido || !gratis(dia) || curso?.id === LOCALE.cursoOculto || !aulaTraduzida(curso?.id ?? '', Math.ceil(dia / SESSOES_POR_AULA)));
  if (!valido) return <NaoEncontrada />;


  const fase = aula && FASES.find((f) => f.id === aula.fase);

  return (
    <div className="pagina pagina-aluno">
    <AreaAluno idioma={curso!.id} nome={curso!.nome} dia={dia}>
    <div className="aa-leitura">
      <Navegacao pai={`/curso/${curso!.id}`} idioma={curso!.id} trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: t.geral.cursos, para: curso!.id === 'br' ? '/portugues' : '/cursos' }, { rotulo: curso!.nome, para: `/curso/${curso!.id}` }, { rotulo: T.rotuloDia(dia) }]} />

      {/* Espera da decisão de acesso: mesmo componente dos fallbacks globais
          (esqueleto + Vuu sonolento), nunca o texto solto. */}
      {decidindo && <Carregando />}
      {bloqueado && !decidindo && <Paywall idioma={curso!.id} curso={curso!.nome} indisponivel={ass.indisponivel} />}
      <ReportarProblema key={`${curso!.id}:${dia}`} idioma={curso!.id} dia={dia} />
      {erro && (
        <div className="vazio">
          <p>{T.semAula}</p>
          <button type="button" className="btn btn-ghost" onClick={() => window.location.reload()}>{T.tentarDeNovo}</button>
        </div>
      )}
      {/* Espera do fetch dos dados da aula (carregarAula): era este <p> solto —
          e o gémeo `decidindo` acima — que mostravam «Carregando...» sem
          esqueleto nem mascote na navegação interna curso → dia, porque a
          página já montou e este estado é local, fora do Suspense de App.tsx. */}
      {!aula && !erro && !bloqueado && <Carregando />}

      {aula && (
        <>
          <header className="dia-header">
            <span className="kicker-pagina">
              {aula.aula ? T.kickerAula(aula.aula.numero, aula.sessao?.sessao.replace('S', '') ?? '', aula.aula.sessoes, aula.sessao?.duracaoMin ?? 30) : T.kickerDia(dia, total, fase?.titulo ?? '', NIVEL_LABEL[aula.nivel])}
            </span>
            {aula.aula && <p className="kicker-aula-titulo">{aula.aula.titulo}</p>}
            <h1 className="pagina-h1">{aula.aula && aula.titulo.startsWith(`${aula.aula.titulo}: `) ? aula.titulo.slice(aula.aula.titulo.length + 2) : aula.titulo}</h1>
            {telaLarga()
              ? <p className="lead">{aula.aula ? T.objetivoAula(aula.aula.objetivo) : T.objetivoDia(aula.objetivo)}</p>
              : <details className="aa-objetivo"><summary>{T.objetivoRotulo}</summary><p>{aula.aula ? aula.aula.objetivo : T.objetivoDia(aula.objetivo)}</p></details>}
            {aula.status !== 'publicada' && <span className={`pill pill-aula-${aula.status}`}>{STATUS_AULA[aula.status]}</span>}
          </header>

          <IdiomaExplicacao valor={explicacao} disponiveis={(['pt', 'en', 'es'] as const).filter((l) => fonteDoCurso(curso!.id) === l || (!!aula.aula && aulaTraduzida(curso!.id, aula.aula.numero, l)))} mudar={(l) => { lembrarExplicacao(curso!.id, l); setExplicacao(l); }} />
          {aula.semTraducao && <p className="nota nota-traducao" role="note">{LOCALE.codigo === 'en' ? 'Available explanations:' : LOCALE.codigo === 'es' ? 'Explicaciones disponibles:' : 'Explicações disponíveis:'} {t.linguas[aula.semTraducao]}</p>}
          {aula.status !== 'publicada' && (
            <p className="nota">{aula.sessao ? T.emRevisao : T.naoPublicada(curso!.nome)}</p>
          )}

          {aula.sessao ? (
            <>
            {dia === 1 && (() => { const g = GUIA_SESSAO[LOCALE.codigo as 'pt-BR' | 'en' | 'es'] ?? GUIA_SESSAO['pt-BR']; return (
              <details className="guia-sessao" open={(import.meta.env.VITE_ALVO === 'apk' || Capacitor.isNativePlatform()) && telaLarga()}><summary>{g.titulo}</summary><ol>{g.passos.map((x) => <li key={x}>{x}</li>)}</ol></details>
            ); })()}
            <Sessao key={`${curso!.id}:${dia}`} nomeIdioma={LOCALE.codigo === 'en' ? curso!.nome : curso!.nome.toLowerCase()} explicacao={aula.idiomas.explicacaoEfetiva} sessao={aula.sessao} idioma={curso!.id} aula={aula.aula?.numero ?? dia} dia={dia} proximo={dia < total ? destino(curso!.id, dia + 1) : undefined} />
            </>
          ) : (
            <div className="camadas">
              {CAMADAS.map((k, i) => (
                <section key={k} className="camada">
                  <span className="method-num">0{i + 1}</span>
                  <h2>{T.camadas[i].t}</h2>
                  <p>{T.camadas[i].d}</p>
                  <span className="camada-status">{aula[k]?.status === 'legado' ? T.emMigracao : T.emBreve}</span>
                </section>
              ))}
            </div>
          )}

          <nav className="dia-nav aa-nav" aria-label={T.navDias}>
            {dia > 1 ? <Link to={destino(curso!.id, dia - 1)}>{T.anterior(dia - 1)}</Link> : <span />}
            <MarcarDia idioma={curso!.id} dia={dia} />
            {dia < total ? <Link to={destino(curso!.id, dia + 1)}>{T.seguinte(dia + 1)}</Link> : <span />}
          </nav>
        </>
      )}
    </div>
    </AreaAluno>
    </div>
  );
}

