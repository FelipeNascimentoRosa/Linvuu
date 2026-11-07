import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Navegacao } from '../components/Navegacao';
import { Gramatica as BlocoGramatica } from '../components/Sessao';
import { idiomasDeGramaticaNoSite, fonteDoCurso, explicacaoDoCurso, getCurso } from '../lib/content';
import { LOCALE, useT } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import type { Bloco } from '../lib/aulas';
import { Paywall } from '@plataforma/Bloqueio';
import { api } from '../lib/api';
import { carregarAuth } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

type Topico = Omit<Extract<Bloco, { tipo: 'gramatica' }>, 'tipo' | 'min' | 'tag'> & { id: string; categoria: string; aula: number; aulaTitulo: string; sessao: string; dia: number; /** língua do texto quando o tópico ainda não foi traduzido */ explicacaoEm?: string };
interface Pacote { idioma: string; categorias: string[]; topicos: Topico[]; completo: boolean; bloqueados: number; semTraducao?: number }
// Abas na ordem da vitrine do idioma do site (o curso de português para estrangeiros só aparece em inglês e espanhol).

export default function Gramatica() {
  const IDIOMAS = idiomasDeGramaticaNoSite();
  const { id } = useParams();
  const curso = getCurso(id);
  const { usuario, carregando: autenticando } = useAuth();
  const [pacote, setPacote] = useState<Pacote | undefined>();
  const [falhou, setFalhou] = useState(false);
  const [cat, setCat] = useState('todas');
  useEffect(() => setCat('todas'), [id]);
  // Só os tópicos das 2 primeiras aulas vêm para todos; o resto, só com assinatura (o servidor decide).
  useEffect(() => {
    if (!id || !IDIOMAS.includes(id) || autenticando) return;
    let vivo = true;
    setPacote(undefined); setFalhou(false);
    (async () => {
      const token = usuario ? await (await carregarAuth()).auth.currentUser?.getIdToken() : undefined;
      const explicacao = explicacaoDoCurso(id);
      const l = fonteDoCurso(id) === explicacao ? '' : `?l=${explicacao}`;
      const r = await fetch(api(`/api/gramatica/${id}${l}`), { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!r.ok) throw new Error(String(r.status));
      const j = (await r.json()) as Pacote;
      if (vivo) setPacote(j);
    })().catch(() => vivo && setFalhou(true));
    return () => { vivo = false; };
  }, [id, usuario, autenticando]);
  const lista = useMemo(() => (pacote ? pacote.topicos.filter((t) => cat === 'todas' || t.categoria === cat) : []), [pacote, cat]);
  const t = useT();
  const g = t.gramaticaPagina;
  usePageTitle(curso ? g.titulo(curso.nome) : g.tituloGeral, curso ? g.descricao(curso.nome) : undefined, undefined, curso?.id === LOCALE.cursoOculto || curso?.status === 'em-breve');
  if (!id || !curso || !IDIOMAS.includes(curso.id)) return <Navigate to={`/gramatica/${IDIOMAS[0]}`} replace />;

  return (
    <div className="pagina">
      <Navegacao pai={`/curso/${curso.id}`} trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: curso.nome, para: `/curso/${curso.id}` }, { rotulo: t.nav.gramatica }]} />
      <h1 className="pagina-h1">{g.titulo(curso.nome)}</h1>
      <p className="lead">{g.lead}</p>
      <div className="chips" role="group" aria-label={g.idioma}>
        {IDIOMAS.map((k) => <Link key={k} to={`/gramatica/${k}`} className={k === curso.id ? 'chip on' : 'chip'} aria-current={k === curso.id ? 'page' : undefined}>{getCurso(k)?.nome}</Link>)}
      </div>
      {falhou && <p className="erro" role="alert">{g.erro}</p>}
      {!pacote && !falhou && <p className="resultado carga-lista" role="status">{t.geral.carregando}</p>}
      {pacote && <>
      {!!pacote.semTraducao && <p className="nota">{g.semTraducao}</p>}
      <div className="chips" role="group" aria-label={g.categoria}>
        {['todas', ...pacote.categorias].map((c) => <button key={c} type="button" className={cat === c ? 'on' : ''} aria-pressed={cat === c} onClick={() => setCat(c)}>{c === 'todas' ? g.todas : c}</button>)}
      </div>
      <p className="resultado" aria-live="polite">{g.topicos(lista.length)}</p>
      <div className="topicos">
        {lista.map((x) => (
          <details key={x.id} className="topico">
            <summary><strong>{x.titulo}</strong><span className="topico-cat">{x.categoria}</span><span className="topico-aula">{g.aula(x.aula)}</span></summary>
            <BlocoGramatica b={{ tipo: 'gramatica', min: 0, ...x }} idioma={curso.id} explicacao={x.explicacaoEm ?? explicacaoDoCurso(curso.id)} />
            <p className="topico-link"><Link to={`/curso/${curso.id}/dia/${x.dia}`}>{g.praticar(x.aula, x.sessao.replace('S', ''))}</Link></p>
          </details>
        ))}
      </div>
      {!pacote.completo && pacote.bloqueados > 0 && (
        <div className="aa-leitura">
          <p className="resultado">{g.bloqueados(pacote.bloqueados)}</p>
          <Paywall idioma={curso.id} curso={curso.nome} />
        </div>
      )}
      </>}
    </div>
  );
}

