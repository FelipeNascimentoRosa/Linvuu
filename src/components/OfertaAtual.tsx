import { HomeCourseLink } from './HomeCourseLink';
import { homeText as h } from '../i18n/home';
import { PRECO_ANUAL, PRECO_ANUAL_MES, PRECO_MENSAL, PRECO_TRIMESTRAL_PIX, PRECO_TRIMESTRAL_PIX_MES } from '../config/planos';
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
  const planos = [
    { nome: 'Mensal', preco: PRECO_MENSAL, detalhe: 'por mês · renovação automática', id: 'mensal' },
    { nome: 'Três meses no Pix', preco: PRECO_TRIMESTRAL_PIX, detalhe: 'pagamento único · 30% de desconto', id: 'trimestral-pix', equivMes: PRECO_TRIMESTRAL_PIX_MES },
    { nome: 'Anual', preco: PRECO_ANUAL, detalhe: '12 meses · pagamento único', id: 'anual', equivMes: PRECO_ANUAL_MES, destaque: true },
  ];
  return <section ref={secao} className="br-plans-wrap br-live-plans" id="planos" aria-labelledby="oferta-titulo">
    <div className="br-section">
      <div className="br-section-head"><div><p className="br-eyebrow">{h('A OFERTA DE HOJE')}</p><h2 id="oferta-titulo">{h('Seu ritmo.')}<br />{h('Seu próximo idioma.')}</h2></div>
        <p>{h('Acesso aos cursos de idiomas, com explicações em português. Comece pelas duas primeiras aulas grátis, sem cartão.')}</p></div>
      <div className="br-plans">{planos.map(p => <article className={p.destaque ? 'br-plan br-plan-destaque' : 'br-plan'} key={p.id}>
        {p.destaque && <span className="br-plan-selo">{h('Menor preço por mês')}</span>}
        <span className="br-plan-name">{h(p.nome)}</span><h3>{p.preco}</h3><p>{h(p.detalhe)}</p>
        {p.equivMes && <p className="br-plan-equiv">≈ {p.equivMes} {h('por mês')}</p>}
        <HomeCourseLink to={`/assinatura?plano=${p.id}#oferta-atual`} className="br-button" onClick={() => { void analytics.capture('select_plan', { page: 'home', billing_plan: p.id }); }}>{h('Ver condições do plano')} <span aria-hidden="true">↗</span></HomeCourseLink>
      </article>)}</div>
      <p className="br-plan-note">{h('O plano de três meses também está disponível no cartão ou boleto. Consulte os valores e condições antes de contratar.')}</p>
      <div className="br-current"><HomeCourseLink to="/cursos">{h('Experimentar duas aulas grátis →')}</HomeCourseLink><HomeCourseLink to="/assinatura">{h('Ver todos os detalhes da assinatura →')}</HomeCourseLink></div>
    </div>
  </section>;
}
