import { Link, useLocation } from 'react-router-dom';
import { useT } from '../../i18n';
import { useAuth } from '../../lib/AuthContext';
import { appTextos } from './textos';
import { LOCALE } from '../../i18n';
import { SESSOES_GRATIS } from '../../config/planos';
import { comprasPlayDisponiveis } from './comprasPlay';
export function AcessoLimitado({ curso, indisponivel, idioma }: { curso: string; indisponivel?: boolean; idioma?: string }) {
  const t = useT(), a = appTextos();
  const { usuario } = useAuth();
  const local = useLocation();
  const destino = local.pathname + local.search + local.hash;
  const x = {
    'pt-BR': {titulo:'Continue estudando com as sessões gratuitas',descricao:`As primeiras ${SESSOES_GRATIS} sessões deste curso são gratuitas. Você pode voltar a elas para estudar ou revisar.`,revisar:'Ver sessões gratuitas',conta:'Entrar permite consultar o acesso desta conta; não desbloqueia conteúdo pago por si só.'},
    en: {titulo:'Keep studying with the free sessions',descricao:`The first ${SESSOES_GRATIS} sessions of this course are free. Return to them to study or review.`,revisar:'View free sessions',conta:'Signing in checks your account access; it does not unlock paid content by itself.'},
      }[LOCALE.codigo];
  return <section className="acesso-limitado" aria-label={curso}>
    <h1>{x.titulo}</h1>
    <p>{x.descricao}</p>
    <p>{indisponivel ? t.assinatura.indisponivel : usuario ? a.semAcesso : a.bloqueado}</p>
    <p>{comprasPlayDisponiveis() ? a.comprasPlay : a.compras}</p>
    {!usuario && <p>{x.conta}</p>}
    {idioma && <Link className="btn btn-primary" to={`/curso/${idioma}`}>{x.revisar}</Link>}
    <Link className="btn btn-ghost" to={usuario ? '/assinatura' : '/entrar?proximo=' + encodeURIComponent(destino)}>{usuario ? t.nav.assinatura : t.nav.entrar}</Link>
  </section>;
}
