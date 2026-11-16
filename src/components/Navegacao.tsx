import { Link, useNavigate } from 'react-router-dom';
import { Chevron } from './Icones';
import { textos } from '../lib/textos';
import { LOCALE } from '../i18n';

export interface Migalha { rotulo: string; para?: string }

/** Botão "Voltar" + trilha de navegação (breadcrumb). `pai` é para onde voltar se não houver histórico. */
export function Navegacao({ trilha, pai, idioma }: { trilha: Migalha[]; pai: string; idioma?: string }) {
  const T = textos(idioma);
  const nav = useNavigate();
  const temHistorico = (window.history.state?.idx ?? 0) > 0;
  return (
    <div className="navegacao">
      <button type="button" className="voltar" onClick={() => (temHistorico ? nav(-1) : nav(pai))}>
        <Chevron dir="left" /> {T.voltarBtn}
      </button>
      <nav aria-label={T.voceEstaEm}>
        <ol className="trilha-nav">
          {trilha.map((m, i) => (
            <li key={m.rotulo}>
              {i > 0 && <Chevron />}
              {m.para ? <Link to={LOCALE.codigo === 'pt-BR' && import.meta.env.VITE_ALVO !== 'apk' && m.para === '/cursos' && m.rotulo === 'Cursos' ? '/livros' : m.para}>{LOCALE.codigo === 'pt-BR' && import.meta.env.VITE_ALVO !== 'apk' && m.para === '/cursos' && m.rotulo === 'Cursos' ? 'Livros' : m.rotulo}</Link> : <span aria-current="page">{m.rotulo}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
