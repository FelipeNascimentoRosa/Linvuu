import { ExclusaoConta, ApagarProgressoLocal } from './ExclusaoConta';
import { AssinaturaPlay } from './AssinaturaPlay';
import { comprasPlayDisponiveis } from './comprasPlay';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { useAssinatura } from '../../lib/acesso';
import { LOCALE, useT } from '../../i18n';
import { IconeEstudo } from './Visuais';
import { experiencia } from './experiencia';
import { appTextos } from './textos';

export default function Assinatura() {
  const { usuario } = useAuth();
  const acesso = useAssinatura();
  const t = useT();
  const a = appTextos();
  const x = experiencia();
  return <div className="pagina app-conta-mobile">
<header className="app-conta-topo"><span className="app-conta-icone"><IconeEstudo tipo="livro" /></span><p className="app-kicker">Linvuu</p><h1 className="pagina-h1">{{'pt-BR':'Sua conta',en:'Your account'}[LOCALE.codigo]}</h1><p>{x.rotina}</p></header>
    <section className="app-conta-status">
    {!usuario ? <Link className="btn btn-primary" to="/entrar?proximo=/conta">{t.nav.entrar}</Link>
      : <p role="status">{acesso.carregando ? t.geral.carregando : acesso.indisponivel ? t.assinatura.indisponivel : acesso.ativa ? t.assinatura.ativa : comprasPlayDisponiveis() ? a.comprasPlay : a.compras}</p>}
    {usuario && acesso.indisponivel && <button type="button" className="btn btn-primary" disabled={acesso.carregando} onClick={acesso.recarregar}>{a.tentarNovamente}</button>}
    <p className="nota">{a.gratis}</p>
    </section>
    <Link className="btn btn-ghost" to="/cursos">{t.nav.cursos}</Link>
    {usuario&&<AssinaturaPlay key={'play-'+usuario.uid} uid={usuario.uid} acesso={acesso}/>}
    <ApagarProgressoLocal key={'local-'+(usuario?.uid??'visitante')}/>
    <ExclusaoConta key={usuario?.uid??'visitante'}/>
    <p className="app-conta-legal"><Link to="/privacidade">{t.rodape.privacidade}</Link> · <Link to="/termos">{t.assinatura.termos}</Link></p>
  </div>;
}

