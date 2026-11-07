// Navegação por abas do app Android (Capacitor). No site ela não aparece: lá o cabeçalho já faz esse papel.
import { Link, useLocation } from 'react-router-dom';
import { useRetomadaGeral } from '../../lib/retomar';
import { useAssinatura } from '../../lib/acesso';
import { destinoEstudo } from './navegacaoModelo';
import { IDIOMAS_GRAMATICA } from '../../lib/content';
import { LOCALE, useT } from '../../i18n';
import './rodada4.css';

const ic = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export function BarraInferior() {
  const { pathname } = useLocation();
  const t = useT();
  const ret = useRetomadaGeral();
  const assinatura = useAssinatura();
  const estudar = destinoEstudo(ret, assinatura.ativa);
  const aba = (on: boolean) => `lv-tab${on ? ' on' : ''}`;
  const conta = '/conta';
  const abas = [
    { para: '/', on: pathname === '/', rotulo: t.geral.inicio, svg: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /> },
    { para: '/cursos', on: pathname === '/cursos' || /^\/curso\/[^/]+$/.test(pathname), rotulo: t.nav.cursos, svg: <><rect x="3" y="4" width="7" height="7" rx="1" /><rect x="14" y="4" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></> },
    { para: estudar, on: /\/dia\//.test(pathname), rotulo: ret ? { 'pt-BR':'Continuar', en:'Continue'}[LOCALE.codigo] : { 'pt-BR':'Estudar', en:'Study'}[LOCALE.codigo], svg: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />, destaque: true },
    { para: ret && IDIOMAS_GRAMATICA.includes(ret.idioma) ? `/gramatica/${ret.idioma}` : '/gramatica', on: pathname.startsWith('/gramatica'), rotulo: t.nav.gramatica, svg: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
    { para: conta, on: ['/conta', '/assinatura', '/entrar', '/cadastro'].includes(pathname), rotulo: { 'pt-BR':'Conta', en:'Account'}[LOCALE.codigo], svg: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5" /></> },
  ];
  return (
    <nav className="lv-tabbar" aria-label="Linvuu">
      {abas.map((a) => (
        <Link key={a.rotulo} to={a.para} className={`${aba(a.on)}${a.destaque ? ' lv-tab-estudar' : ''}`} aria-label={a.rotulo} aria-current={a.on ? 'page' : undefined}>
          {a.destaque ? <span className="lv-tab-pilula"><svg {...ic} width={18} height={18}>{a.svg}</svg></span> : <svg {...ic}>{a.svg}</svg>}
          <span className="lv-tab-rotulo">{a.rotulo}</span>
        </Link>
      ))}
    </nav>
  );
}
