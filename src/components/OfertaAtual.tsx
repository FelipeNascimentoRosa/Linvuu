import { HomeCourseLink } from './HomeCourseLink';
import { homeText as h } from '../i18n/home';
import { precosDo, FUNDADORES } from '../config/planos';
import { LOCALE } from '../i18n';
import { analytics } from '../lib/analytics';
import { useEffect, useRef } from 'react';

/** Oferta que pode ser contratada hoje. Os detalhes e a confirmação ficam na página de assinatura. */
export function OfertaAtual() {
  const secao = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = secao.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { void analytics.capture('view_pricing', { page: 'home' }); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // Reais no .com.br; dólares no .com, que só vende mensal e anual no cartão (sem Pix nem boleto). Mesma fonte da /assinatura.
  const P = precosDo(LOCALE.codigo);
  const emReais = P.moeda === 'BRL';
  type Plano = { nome: string; preco: string; detalhe: string; id: string; equivMes?: string; destaque?: boolean };
  const planos: Plano[] = [
    { nome: 'Mensal', preco: P.mensal, detalhe: 'por mês · renovação automática', id: 'mensal' },
    ...(emReais ? [{ nome: 'Três meses', preco: P.trimestralPix, detalhe: `no Pix (30% de desconto) ou ${P.trimestral} no cartão/boleto · pagamento único`, id: 'trimestral-pix', equivMes: P.trimestralPixMes }] : []),
    { nome: 'Anual', preco: P.anual, detalhe: '12 meses · pagamento único', id: 'anual', equivMes: P.anualMes, destaque: true },
  ];
  return <section ref={secao} className="br-plans-wrap br-live-plans" id="planos" aria-labelledby="oferta-titulo">
    <div className="br-section">
      <div className="br-section-head"><div><h2 id="oferta-titulo">{h('Seu ritmo.')}<br />{h('Seu próximo idioma.')}</h2></div>
        {!emReais && <p>{h('Acesso aos cursos de idiomas, com explicações em português. Comece pelas duas primeiras aulas grátis, sem cartão.')}</p>}</div>
      <div className="br-plans">{planos.map(p => <article className={p.destaque ? 'br-plan br-plan-destaque' : 'br-plan'} key={p.id}>
        {p.destaque && <span className="br-plan-selo">{h('Menor preço por mês')}</span>}
        <span className="br-plan-name">{h(p.nome)}</span><h3>{p.preco}</h3><p>{h(p.detalhe)}</p>
        {p.equivMes && <p className="br-plan-equiv">≈ {p.equivMes} {h('por mês')}</p>}
        <HomeCourseLink cta="home_plano" to={`/assinatura?plano=${p.id}#oferta-atual`} className="br-button" onClick={() => { void analytics.capture('select_plan', { page: 'home', billing_plan: p.id }); }}>{h('Ver condições do plano')} <span aria-hidden="true">↗</span></HomeCourseLink>
      </article>)}</div>
      {emReais && FUNDADORES && <p className="br-plan-note">Ex-aluno da Udemy? Use o código <strong>{FUNDADORES.codigo}</strong> no pagamento do mensal: {FUNDADORES.precoMes} por mês, para sempre. Válido até {FUNDADORES.validade}.</p>}
      <div className="br-current"><HomeCourseLink to="/cursos">{h('Experimentar duas aulas grátis')}</HomeCourseLink><HomeCourseLink to="/assinatura">{h('Ver todos os detalhes da assinatura')}</HomeCourseLink></div>
    </div>
  </section>;
}
