import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CURSOS_ATIVOS as CURSOS, cursoComExplicacaoNoSite } from '../lib/content';
import { CursoCard, LivroDoCurso } from '../components/CursoCard';
import { usePageTitle } from '../lib/usePageTitle';
import { LOCALE, useT } from '../i18n';
import '../site-publico.css';

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export default function Cursos() {
  const t = useT();
  usePageTitle(t.cursosPagina.titulo);
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';

  const emBreve = CURSOS.filter((c) => !cursoComExplicacaoNoSite(c.id));
  const lista = useMemo(() => CURSOS.filter((c) => {
    if (LOCALE.codigo === 'en' && c.id === 'it') return false;
    if (!cursoComExplicacaoNoSite(c.id)) return false;
    if (!q) return true;
    return norm(`${c.nome} ${c.nomeNativo}`).includes(norm(q));
  }), [q]);

  const set = (k: string, v: string) => {
    const p = new URLSearchParams(params);
    if (v && v !== 'todos') p.set(k, v); else p.delete(k);
    setParams(p, { replace: true });
  };

  return (
    <div className="pagina site-publico site-catalogo">
      <header className="site-intro site-intro-cursos"><h1 className="pagina-h1">{LOCALE.codigo === 'pt-BR' ? 'Cursos de idiomas' : 'Language courses'}</h1></header>
      <div className="filtros">
        <div className="search-field filtro-busca">
          <label htmlFor="q">{t.cursosPagina.buscar}</label>
          <input id="q" type="search" value={q} placeholder={t.cursosPagina.exemplo} onChange={(e) => set('q', e.target.value)} />
        </div>
      </div>
      {q && <p className="resultado" aria-live="polite">{t.cursosPagina.contagem(lista.length)}</p>}
      {lista.length > 0
        ? <div className="curso-grid">{lista.map((c) => (
          <div className="catalogo-idioma" key={c.id}>
            <CursoCard curso={c} nivel={2} catalogoRascunho />
            <LivroDoCurso curso={c} />
          </div>
        ))}</div>
        : <p className="vazio">{t.cursosPagina.vazio(q)} <button type="button" className="link" onClick={() => setParams({}, { replace: true })}>{t.cursosPagina.limpar}</button>.</p>}
      {emBreve.length > 0 && !q && <p className="nota" data-em-breve>{t.cursosPagina.emBreve}: {emBreve.map((c) => c.nome).join(', ')}.</p>}
    </div>
  );
}
