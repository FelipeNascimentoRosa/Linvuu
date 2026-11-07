import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CURSOS_ATIVOS, idiomasDeGramaticaNoSite, cursoComExplicacaoNoSite } from '../lib/content';
import { useAuth } from '../lib/AuthContext';
import { LOCALE, useT } from '../i18n';
import { homeText } from '../i18n/home';
import '../site-publico.css';

// Gramática: o primeiro curso da vitrine que tem a aba de gramática.

export function Header() {
  const GRAMATICA = `/gramatica/${idiomasDeGramaticaNoSite()[0] ?? 'ru'}`;
  const [menu, setMenu] = useState(false);
  const [conta, setConta] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const { usuario, carregando, sair } = useAuth();
  const refConta = useRef<HTMLDivElement>(null);
  const t = useT();

  useEffect(() => { setMenu(false); setConta(false); }, [loc.pathname, loc.search]);
  useEffect(() => {
    const fora = (e: MouseEvent) => {
      if (refConta.current && !refConta.current.contains(e.target as Node)) setConta(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setConta(false); } };
    document.addEventListener('mousedown', fora);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', fora); document.removeEventListener('keydown', esc); };
  }, []);

  const proximo = /^\/(?:curso|gramatica|livros)(?:\/|$)/.test(loc.pathname) ? `?proximo=${encodeURIComponent(loc.pathname + loc.search + loc.hash)}` : '';
  const deslogar = async () => { await sair(); setConta(false); setMenu(false); nav('/'); };

  return (
    <header className="lv-head">
      <div className="lv-head-in">
        <Link to="/" className="lv-logo" aria-label={t.geral.paginaInicial}>
          <img src="/brand/linvuu-wordmark-verde.svg" alt="Linvuu" width="104" height="33" />
        </Link>

        <nav className="lv-nav" aria-label={t.geral.principal}>
          <Link to="/cursos">{t.nav.cursos}</Link>
          <Link to={GRAMATICA}>{t.nav.gramatica}</Link>
          <Link to="/#metodo">{t.nav.metodo}</Link>
          <Link to="/#planos">{homeText('Planos')}</Link>
          <Link to="/#faq">{t.nav.duvidas}</Link>
        </nav>

        <div className="lv-conta" ref={refConta}>
          {carregando ? null : usuario ? (
            <>
              <button type="button" className="avatar-btn" aria-expanded={conta} aria-label={t.nav.contaDe(usuario.nome)} onClick={() => setConta((v) => !v)}>
                {usuario.foto ? <img src={usuario.foto} alt="" referrerPolicy="no-referrer" /> : usuario.nome.slice(0, 1).toUpperCase()}
              </button>
              {conta && (
                <div className="menu-conta">
                  <strong>{usuario.nome}</strong>
                  <span>{usuario.email}</span>
                  <Link to="/assinatura" onClick={() => setConta(false)}>{t.nav.assinatura}</Link>
                  <button type="button" onClick={deslogar}>{t.nav.sair}</button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to={`/entrar${proximo}`} className="lv-entrar">{t.nav.entrar}</Link>
              <Link to={`/cadastro${proximo}`} className="btn btn-primary lv-head-cta">{t.nav.comecar}</Link>
            </>
          )}
        </div>

        <button type="button" className="lv-burger" aria-label={t.geral.menu} aria-expanded={menu} aria-controls="menu-mobile" onClick={() => setMenu((v) => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {menu && (
        <div className="lv-mobile" id="menu-mobile">
          {CURSOS_ATIVOS.filter((c) => cursoComExplicacaoNoSite(c.id)).map((c) => <Link key={c.id} to={`/curso/${c.id}`}>{c.nome}</Link>)}
          <Link to="/cursos">{t.nav.todos}</Link>
          <Link to={GRAMATICA}>{t.nav.gramatica}</Link>
          <Link to="/#metodo">{t.nav.metodo}</Link>
          <Link to="/#planos">{homeText('Planos')}</Link>
          <Link to="/#faq">{t.nav.duvidas}</Link>
          {usuario ? <button type="button" className="menu-mobile-sair" onClick={deslogar}>{t.nav.sair} ({usuario.nome})</button> : (
            <div className="menu-mobile-conta">
              <Link to={`/entrar${proximo}`} className="btn btn-ghost">{t.nav.entrar}</Link>
              <Link to={`/cadastro${proximo}`} className="btn btn-primary">{t.nav.comecar}</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
