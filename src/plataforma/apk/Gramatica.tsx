// Gramática do app Android. Diferenças em relação à página do site:
// - sem a segunda barra de "Voltar" (o cabeçalho do app já volta);
// - /gramatica abre o idioma que o aluno estuda, não sempre o inglês;
// - sem servidor (offline ou erro), mostra os tópicos das sessões gratuitas que já vêm no app, com "Tentar novamente".
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Gramatica as BlocoGramatica } from './Sessao';
import { CURSOS_ATIVOS, IDIOMAS_GRAMATICA, carregarAula, fonteDoCurso, getCurso } from '../../lib/content';
import { LOCALE, useT } from '../../i18n';
import { usePageTitle } from '../../lib/usePageTitle';
import type { Bloco } from '../../lib/aulas';
import { AcessoLimitado } from './AcessoLimitado';
import { api } from '../../lib/api';
import { carregarAuth } from '../../lib/firebase';
import { useAuth } from '../../lib/AuthContext';
import { useRetomadaGeral } from '../../lib/retomar';
import { SESSOES_GRATIS } from '../../config/planos';

type Topico = Omit<Extract<Bloco, { tipo: 'gramatica' }>, 'tipo' | 'min' | 'tag'> & { id: string; categoria: string; aula: number; aulaTitulo?: string; sessao: string; dia: number; explicacaoEm?: string };
interface Pacote { idioma: string; categorias: string[]; topicos: Topico[]; completo: boolean; bloqueados: number; semTraducao?: number }
const IDIOMAS = CURSOS_ATIVOS.map((c) => c.id).filter((k) => IDIOMAS_GRAMATICA.includes(k));

const textos = {
  'pt-BR': { offline: 'Sem conexão com o servidor. Mostrando os tópicos das sessões gratuitas, que já vêm no app.', erro: 'Não foi possível carregar a gramática agora.', tentar: 'Tentar novamente', aula: (n: number) => `Aula ${n}` },
  en: { offline: 'No connection to the server. Showing the topics from the free sessions, which come with the app.', erro: 'Could not load grammar right now.', tentar: 'Try again', aula: (n: number) => `Lesson ${n}` },
  };

/** Tópicos das sessões gratuitas embutidas no APK (sem rede). */
async function topicosLocais(id: string): Promise<Pacote> {
  const a = textos[LOCALE.codigo];
  const topicos: Topico[] = [];
  for (let dia = 1; dia <= SESSOES_GRATIS; dia++) {
    const aula = await carregarAula(id, dia).catch(() => null);
    const numero = aula?.aula?.numero ?? Math.ceil(dia / 4);
    aula?.sessao?.blocos.forEach((b, i) => {
      if (b.tipo !== 'gramatica') return;
      const { tipo: _t, min: _m, ...resto } = b as Extract<Bloco, { tipo: 'gramatica' }> & { tag?: string };
      topicos.push({ ...resto, id: `${id}-${dia}-${i}`, categoria: a.aula(numero), aula: numero, sessao: aula.sessao!.sessao, dia, explicacaoEm: aula.semTraducao });
    });
  }
  return { idioma: id, categorias: [...new Set(topicos.map((t) => t.categoria))], topicos, completo: false, bloqueados: 0 };
}

export default function Gramatica() {
  const { id } = useParams();
  const ret = useRetomadaGeral();
  const curso = getCurso(id);
  const { usuario, carregando: autenticando } = useAuth();
  const [pacote, setPacote] = useState<Pacote | undefined>();
  const [estado, setEstado] = useState<'ok' | 'offline' | 'falhou'>('ok');
  const [tentativa, setTentativa] = useState(0);
  const [cat, setCat] = useState('todas');
  useEffect(() => setCat('todas'), [id]);
  useEffect(() => {
    if (!id || !IDIOMAS.includes(id) || autenticando) return;
    let vivo = true;
    setPacote(undefined); setEstado('ok');
    (async () => {
      try {
        const token = usuario ? await (await carregarAuth()).auth.currentUser?.getIdToken() : undefined;
        const l = fonteDoCurso(id) === LOCALE.explicacao ? '' : `?l=${LOCALE.explicacao}`;
        const r = await fetch(api(`/api/gramatica/${id}${l}`), { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!r.ok) throw new Error(String(r.status));
        const j = (await r.json()) as Pacote;
        if (vivo) setPacote(j);
      } catch {
        const local = await topicosLocais(id).catch(() => null);
        if (!vivo) return;
        if (local?.topicos.length) { setPacote(local); setEstado('offline'); } else setEstado('falhou');
      }
    })();
    return () => { vivo = false; };
  }, [id, usuario, autenticando, tentativa]);
  const lista = useMemo(() => (pacote ? pacote.topicos.filter((t) => cat === 'todas' || t.categoria === cat) : []), [pacote, cat]);
  const t = useT(), g = t.gramaticaPagina, a = textos[LOCALE.codigo];
  usePageTitle(curso ? g.titulo(curso.nome) : g.tituloGeral, curso ? g.descricao(curso.nome) : undefined);
  if (!id || !curso || !IDIOMAS.includes(curso.id)) {
    const padrao = ret && IDIOMAS.includes(ret.idioma) ? ret.idioma : IDIOMAS[0];
    return <Navigate to={`/gramatica/${padrao}`} replace />;
  }
  return (
    <div className="pagina app-gramatica">
      <h1 className="pagina-h1">{g.titulo(curso.nome)}</h1>
      <p className="lead">{g.lead}</p>
      <div className="chips" role="group" aria-label={g.idioma}>
        {IDIOMAS.map((k) => <Link key={k} to={`/gramatica/${k}`} replace className={k === curso.id ? 'chip on' : 'chip'} aria-current={k === curso.id ? 'page' : undefined}>{getCurso(k)?.nome}</Link>)}
      </div>
      {estado !== 'ok' && <div className="app-gramatica-aviso" role="status"><p>{estado === 'offline' ? a.offline : a.erro}</p><button type="button" className="btn btn-ghost" onClick={() => setTentativa((n) => n + 1)}>{a.tentar}</button></div>}
      {!pacote && estado === 'ok' && <p className="resultado" role="status">{t.geral.carregando}</p>}
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
              <BlocoGramatica b={{ tipo: 'gramatica', min: 0, ...x }} idioma={curso.id} explicacao={x.explicacaoEm} />
              <p className="topico-link"><Link to={`/curso/${curso.id}/dia/${x.dia}`}>{g.praticar(x.aula, x.sessao.replace('S', ''))}</Link></p>
            </details>
          ))}
        </div>
        {!pacote.completo && pacote.bloqueados > 0 && estado === 'ok' && (
          <div className="aa-leitura">
            <p className="resultado">{g.bloqueados(pacote.bloqueados)}</p>
            <AcessoLimitado idioma={curso.id} curso={curso.nome} />
          </div>
        )}
      </>}
    </div>
  );
}
