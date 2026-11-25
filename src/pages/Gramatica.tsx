import { Fragment, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navegacao } from '../components/Navegacao';
import { Gramatica as BlocoGramatica } from '../components/Sessao';
import { idiomasDeGramaticaNoSite, todosIdiomasDeGramatica, fonteDoCurso, explicacaoDoCurso, getCurso, coberturaNoSite } from '../lib/content';
import { LOCALE, useT } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import type { Bloco } from '../lib/aulas';
import { Paywall } from '@plataforma/Bloqueio';
import { api } from '../lib/api';
import { carregarAuth } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { caminhoDuvida, duvidasDoIdioma } from '../lib/duvidas';

type Topico = Omit<Extract<Bloco, { tipo: 'gramatica' }>, 'tipo' | 'min' | 'tag'> & { id: string; categoria: string; aula: number; aulaTitulo: string; sessao: string; dia: number; /** língua do texto quando o tópico ainda não foi traduzido */ explicacaoEm?: string };
interface Pacote { idioma: string; categorias: string[]; topicos: Topico[]; completo: boolean; bloqueados: number; semTraducao?: number }
// Abas na ordem da vitrine do idioma do site (o curso de português para estrangeiros só aparece em inglês).

const HUB = {
  'pt-BR': { h1: 'Gramática de idiomas explicada em português', lead: 'Escolha o idioma. Cada gramática reúne os tópicos do curso com tabelas, exemplos e os erros mais comuns de quem fala português. Os tópicos das duas primeiras aulas são abertos.', item: (n: string) => `Tópicos de ${n.toLowerCase()} do A1 ao B1`,
    comoT: 'Como cada gramática funciona', como: ['Cada tópico explica a regra a partir do português: o que é igual, o que muda e onde quem fala português costuma errar.', 'Os exemplos vêm com tradução, e as tabelas reúnem as formas que você precisa consultar de novo.', 'Cada tópico aponta para a sessão do curso em que ele é praticado, com áudio em cada frase.'] },
  en: { h1: 'Grammar guides explained in English', lead: 'Pick a language. Each guide gathers the course topics with tables, examples and the mistakes English speakers make most. The topics from the first two lessons are open to everyone.', item: (n: string) => `${n} topics from A1 to B1`,
    comoT: 'How each guide works', como: ['Each topic explains the rule from English: what works the same, what changes and where English speakers usually go wrong.', 'Examples come with a translation, and tables gather the forms you will want to look up again.', 'Each topic points to the course session where you practise it, with audio for every sentence.'] },
} as const;

export default function Gramatica() {
  const IDIOMAS = idiomasDeGramaticaNoSite(); // só os que a vitrine deste domínio oferece (chips)
  const VALIDOS = todosIdiomasDeGramatica(); // endereço direto continua abrindo (o servidor marca noindex onde não há explicação)
  const { id } = useParams();
  const curso = getCurso(id);
  const { usuario, carregando: autenticando } = useAuth();
  const [pacote, setPacote] = useState<Pacote | undefined>();
  const [falhou, setFalhou] = useState(false);
  const [cat, setCat] = useState('todas');
  useEffect(() => setCat('todas'), [id]);
  // Só os tópicos das 2 primeiras aulas vêm para todos; o resto, só com assinatura (o servidor decide).
  useEffect(() => {
    if (!id || !VALIDOS.includes(id) || autenticando) return;
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
  // Cobertura na língua do site (pt-BR no .com.br, en no .com): decide o aviso honesto acima dos tópicos.
  const cob = curso ? coberturaNoSite(curso.id) : { traduzidas: 0, total: 0 };
  const hub = !id || !curso || !VALIDOS.includes(curso.id);
  usePageTitle(!hub ? g.titulo(curso.nome) : HUB[LOCALE.codigo === 'pt-BR' ? 'pt-BR' : 'en'].h1, !hub ? g.descricao(curso.nome) : undefined, undefined, !hub && (curso.id === LOCALE.cursoOculto || curso.status === 'em-breve'));
  // A gramática do curso de português para estrangeiros mora no .com: no .com.br o link vai direto para lá
  // (antes passava por um 301 a cada clique — auditoria seo-skills, 13/11/2026).
  const linkGram = (k: string, conteudo: ReactNode, className?: string, atual?: boolean) => <Link to={`/gramatica/${k}`} className={className} aria-current={atual ? 'page' : undefined}>{conteudo}</Link>;
  // Hub /gramatica (12/11/2026): página de verdade, indexável e no sitemap. Antes era um redirecionamento no cliente
  // para o primeiro idioma, e por isso ficava fora do sitemap (o <head> do servidor não batia com o DOM).
  if (hub) {
    const x = HUB[LOCALE.codigo === 'pt-BR' ? 'pt-BR' : 'en'];
    return (
      <div className="pagina">
        <Navegacao pai="/" trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: t.nav.gramatica }]} />
        <h1 className="pagina-h1">{x.h1}</h1>
        <p className="lead">{x.lead}</p>
        <ul className="gram-hub">
          {IDIOMAS.map((k) => { const c = getCurso(k); if (!c) return null; return (
            <li key={k}>{linkGram(k, <><strong>{g.titulo(c.nome)}</strong><span>{x.item(c.nome)}</span></>)}</li>
          ); })}
        </ul>
        <h2 className="pagina-h2">{x.comoT}</h2>
        <ul className="pt-pontos">{x.como.map((c) => <li key={c}><span>{c}</span></li>)}</ul>
      </div>
    );
  }


  return (
    <div className="pagina">
      <Navegacao pai={`/curso/${curso.id}`} trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: curso.nome, para: `/curso/${curso.id}` }, { rotulo: t.nav.gramatica }]} />
      <h1 className="pagina-h1">{g.titulo(curso.nome)}</h1>
      <p className="lead">{g.lead}</p>
      {curso.id === 'ru' && <p className="gram-curso"><Link to="/russo-online">{LOCALE.codigo === 'pt-BR' ? 'Aulas de russo ao vivo, com professor' : 'Live Russian lessons with a teacher'}</Link></p>}
      {curso.id !== LOCALE.cursoOculto && <p className="gram-curso"><Link to={`/curso/${curso.id}`}>{LOCALE.codigo === 'pt-BR' ? `Praticar no curso de ${curso.nome.toLowerCase()}, com áudio em cada frase` : `Practise in the ${curso.nome} course, with audio for every sentence`}</Link></p>}
      <div className="chips" role="group" aria-label={g.idioma}>
        {IDIOMAS.map((k) => <Fragment key={k}>{linkGram(k, getCurso(k)?.nome, k === curso.id ? 'chip on' : 'chip', k === curso.id)}</Fragment>)}
      </div>
      {/* Páginas de dúvida do idioma (src/lib/duvidas.ts): só em português, no .com.br. */}
      {LOCALE.codigo === 'pt-BR' && duvidasDoIdioma(curso.id).length > 0 && (
        <nav className="gram-duvidas" aria-labelledby="gram-duvidas-t">
          <h2 id="gram-duvidas-t" className="pagina-h2">Dúvidas frequentes</h2>
          <ul>{duvidasDoIdioma(curso.id).map((x) => <li key={x.slug}><Link to={caminhoDuvida(x)}>{x.h1}</Link></li>)}</ul>
        </nav>
      )}
      {/* Gramática sem tradução na língua do site: dizer antes de mostrar (D10 — título em inglês sobre miolo em português). */}
      {cob.traduzidas === 0 && <p className="nota">{g.semTraducaoTotal}</p>}
      {falhou && <p className="erro" role="alert">{g.erro}</p>}
      {!pacote && !falhou && <p className="resultado carga-lista" role="status">{t.geral.carregando}</p>}
      {pacote && <>
      {cob.traduzidas > 0 && (cob.traduzidas < cob.total || !!pacote.semTraducao) && <p className="nota">{g.semTraducao}</p>}
      <div className="chips" role="group" aria-label={g.categoria}>
        {['todas', ...pacote.categorias].map((c) => <button key={c} type="button" className={cat === c ? 'on' : ''} aria-pressed={cat === c} onClick={() => setCat(c)}>{c === 'todas' ? g.todas : c}</button>)}
      </div>
      <p className="resultado" aria-live="polite">{g.topicos(lista.length)}</p>
      <h2 className="sr-only">{LOCALE.codigo === 'pt-BR' ? 'Tópicos' : 'Topics'}</h2>
      <div className="topicos">
        {lista.map((x, i) => (
          <details key={x.id} className="topico" open={i === 0}>
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

