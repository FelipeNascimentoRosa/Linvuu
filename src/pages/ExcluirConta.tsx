// /excluir-conta: pedido de exclusão de conta e dados sem precisar entrar nem ter o app (exigência da Google Play).
import { useState } from 'react';
import { Navegacao } from '../components/Navegacao';
import { usePageTitle } from '../lib/usePageTitle';
import { emailOficial } from '../config/site';
import { LOCALE, useT } from '../i18n';
import { useAuth } from '../lib/AuthContext';
import { EXCLUSAO } from '../lib/exclusaoConta';
import { ExclusaoDireta } from '../components/ExclusaoDireta';
import './excluir-conta.css';

export default function ExcluirConta() {
  const t = useT(), x = EXCLUSAO[LOCALE.codigo];
  const { usuario } = useAuth();
  const [email, setEmail] = useState(usuario?.email ?? '');
  usePageTitle(x.titulo, x.descricao);
  const f = x.formulario;
  return (
    <div className="pagina">
      <Navegacao pai="/" trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: x.titulo }]} />
      <h1 className="pagina-h1">{x.titulo}</h1>
      <div className="texto-legal">
        <p>{x.lead}</p>
        {x.secoes.map((s, i) => (
          <section key={s.titulo} aria-labelledby={`exc-${i}`}>
            <h2 id={`exc-${i}`}>{s.titulo}</h2>
            {s.passos && <ol className="exclusao-passos">{s.passos.map((p) => <li key={p}>{p}</li>)}</ol>}
            {s.itens && <ul>{s.itens.map((p) => <li key={p}>{p}</li>)}</ul>}
            {s.paragrafos?.map((p) => <p key={p}>{p}</p>)}
            {i === 0 && (
              <div className="exclusao-pedido">
                <ExclusaoDireta origem="site" />
                <label htmlFor="exclusao-email">{f.rotulo}</label>
                <input id="exclusao-email" type="email" autoComplete="email" maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} />
                <a className="btn btn-primary" href={`mailto:${emailOficial()}?subject=${encodeURIComponent(f.assunto)}&body=${encodeURIComponent(f.corpo + email.trim())}`}>{f.botao}</a>
                <p>{f.aviso}</p>
                <p>{f.alternativa} <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>.</p>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
