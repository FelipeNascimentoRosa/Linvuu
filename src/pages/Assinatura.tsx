import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { Plano } from '../lib/assinatura';
import { Navegacao } from '../components/Navegacao';
import { useAuth } from '../lib/AuthContext';
import { abrir, useAssinatura } from '../lib/assinatura';
import { AULAS_GRATIS, precosDo, FUNDADORES } from '../config/planos';
import { emailOficial } from '../config/site';
import { usePageTitle } from '../lib/usePageTitle';
import { data, LOCALE, useT } from '../i18n';
import { analytics } from '../lib/analytics';
import { Avaliacoes } from '../components/Avaliacoes';
import '../site-publico.css';

export default function Assinatura() {
  const t = useT();
  const s = t.assinatura;
  const P = precosDo(LOCALE.codigo); // reais no .com.br; dólares no .com (só mensal e anual)
  usePageTitle(LOCALE.codigo === 'pt-BR' ? 'Planos e preços' : 'Linvuu pricing', LOCALE.codigo === 'pt-BR' ? 'Aprenda idiomas com a Linvuu: planos mensal, trimestral com 30% OFF no Pix e anual. Experimente duas aulas grátis, sem cartão.' : undefined, ['pt-BR'], LOCALE.codigo !== 'pt-BR');
  const { usuario, carregando } = useAuth();
  const a = useAssinatura();
  const [params] = useSearchParams();
  // Retorno do Stripe não é confirmação de pagamento (Pix e boleto são assíncronos).
  useEffect(() => { if (params.get('ok') === '1') void analytics.capture('checkout_returned', { page: 'plans' }); }, [params]);
  useEffect(() => { void analytics.capture('view_pricing', { page: 'plans' }); }, []);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');
  const [meioTri, setMeioTri] = useState<'trimestral-pix' | 'trimestral'>('trimestral-pix');
  const nav = useNavigate();
  const PLANOS: Plano[] = ['mensal', 'trimestral-pix', 'trimestral', 'anual'];
  const pt = LOCALE.codigo === 'pt-BR';
  const pedido = params.get('plano') as Plano | null;
  const escolhido0 = pedido && PLANOS.includes(pedido) && (P.moeda === 'BRL' || pedido === 'mensal' || pedido === 'anual') ? pedido : null; // no .com (dólares) só existem mensal e anual
  const escolhido = escolhido0;
  useEffect(() => { if (escolhido === 'trimestral' || escolhido === 'trimestral-pix') setMeioTri(escolhido); }, [escolhido]);
  const nomePlano: Record<Plano, string> = { mensal: s.mensal, 'trimestral-pix': s.pixBtn, trimestral: s.tresBtn, anual: s.anoBtn };
  const ir = async (t: 'checkout' | 'portal', plano?: Plano) => {
    if (t === 'checkout') void analytics.capture('select_plan', { page: 'plans', billing_plan: plano });
    // Visitante: vê os preços, mas o pagamento exige conta. O plano escolhido volta na URL e o checkout só abre com um novo clique.
    if (!usuario) { nav(`/cadastro?proximo=${encodeURIComponent(`/assinatura?plano=${plano ?? 'mensal'}`)}`); return; }
    setOcupado(true); setErro('');
    try { await abrir(t, plano); } catch (e) { setErro((e as Error).message); setOcupado(false); }
  };
  return (
    <div className={LOCALE.codigo === 'pt-BR' ? 'pagina site-publico site-assinatura' : 'pagina'}>
      <Navegacao pai="/" trilha={[{ rotulo: t.geral.inicio, para: '/' }, { rotulo: s.titulo }]} />
      {/* h1 com a intenção de quem chega aqui: preço (auditoria seo-skills/marketingskills, 13/11/2026). */}
      <h1 className="pagina-h1">{pt ? 'Planos e preços da Linvuu' : 'Linvuu pricing'}</h1>
      <div id="oferta-atual" />
      {carregando || (usuario && a.carregando) ? <p className="resultado" role="status">{t.geral.carregando}</p> : (
        <div className="texto-legal lv-assinatura">
          {params.get('ok') && !a.ativa && <p className="nota">{s.recebido} <button type="button" className="link-btn" onClick={a.recarregar}>{s.atualize}</button>.</p>}
          {usuario && a.indisponivel && <p className="erro" role="alert">{s.indisponivel}</p>}
          {usuario && escolhido && !a.ativa && (
            <div className="nota lv-assinatura-escolhido" role="status">
              <span>{s.escolhido(nomePlano[escolhido])}</span>
              <button type="button" className="btn btn-primary" onClick={() => ir('checkout', escolhido)} disabled={ocupado} data-cta="assinatura_continuar">{ocupado ? t.geral.abrindo : s.continuarPagamento}</button>
            </div>
          )}
          {usuario && a.ativa ? (
            <>
              {a.via === 'trimestral' ? (
                <p><strong>{s.tresAtivo}</strong>{a.ate ? s.ate(data(a.ate)) : ''}. {s.semRenovacao}</p>
              ) : (
                <>
                  <p><strong>{s.ativa}</strong>{a.cancelaEm ? s.termina(data(a.cancelaEm)) : ''} {s.liberados}</p>
                  <button type="button" className="btn btn-primary" onClick={() => ir('portal')} disabled={ocupado} data-cta="assinatura_gerenciar">{s.gerenciar}</button>
                </>
              )}
              <p>{s.reembolso} <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>.</p>
            </>
          ) : (
            <>
              <p>{s.intro(AULAS_GRATIS)}</p>
              <p><Link className="btn btn-ghost" to="/cursos">{pt ? 'Testar 2 aulas grátis, sem cartão' : 'Try 2 free lessons, no card'}</Link></p>
              {!usuario && <p className="nota lv-assinatura-conta">{s.semConta} <Link to="/entrar?proximo=/assinatura">{s.jaTemConta}</Link></p>}
              <h2 className="pagina-h2">{pt ? 'Escolha seu plano' : 'Choose your plan'}</h2>
              {/* Três cartões numa fileira só, de mesma altura, botão na base. O trimestral tem UM preço e UM botão:
                  Pix ou cartão/boleto é um seletor dentro do cartão (regra do CLAUDE.md; auditoria Impeccable C1). */}
              <div className={`lv-planos lv-planos-${P.moeda === 'BRL' ? 3 : 2}`}>
                <div className={`lv-plano ${escolhido === 'mensal' ? 'lv-plano-escolhido' : ''}`}>
                  <h3>{s.mensal}</h3>
                  <p className="lv-plano-preco">{P.mensal}<span>{s.porMes}</span></p>
                  <p>{s.mensalTxt}</p>
                  {P.moeda === 'BRL' && FUNDADORES && <p className="lv-fundadores-txt">Ex-aluno da Udemy? Use o código <strong>{FUNDADORES.codigo}</strong> no pagamento: {FUNDADORES.precoMes} por mês, para sempre. Válido até {FUNDADORES.validade}.</p>}
                  <button type="button" className="btn btn-primary" onClick={() => ir('checkout', 'mensal')} disabled={ocupado} data-cta="assinatura_mensal">{ocupado ? t.geral.abrindo : s.assinarBtn}</button>
                  <p className="lv-garantia"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>{s.garantiaMensal}</span></p>
                </div>
                {P.moeda === 'BRL' && (
                <div className={`lv-plano ${escolhido?.startsWith('trimestral') ? 'lv-plano-escolhido' : ''}`}>
                  <h3>{s.tresMeses}</h3>
                  <div className="lv-meio" role="radiogroup" aria-label="Forma de pagamento">
                    {(['trimestral-pix', 'trimestral'] as const).map((m) => (
                      <button key={m} type="button" role="radio" aria-checked={meioTri === m} className={meioTri === m ? 'on' : ''} onClick={() => setMeioTri(m)}>{m === 'trimestral-pix' ? 'Pix' : 'Cartão ou boleto'}</button>
                    ))}
                  </div>
                  <p className="lv-plano-preco">{meioTri === 'trimestral-pix' ? P.trimestralPix : P.trimestral}<span>{meioTri === 'trimestral-pix' ? s.noPix : s.cartaoBoleto}</span></p>
                  <p className="lv-plano-equiv">{meioTri === 'trimestral-pix' ? `${s.equivMes(P.trimestralPixMes)} · 30% de desconto no Pix` : 'No Pix sai 30% mais barato.'}</p>
                  <p>{s.pixTxt}</p>
                  <button type="button" className="btn btn-primary" onClick={() => ir('checkout', meioTri)} disabled={ocupado} data-cta={meioTri === 'trimestral-pix' ? 'assinatura_trimestral_pix' : 'assinatura_trimestral'}>{ocupado ? t.geral.abrindo : (meioTri === 'trimestral-pix' ? s.pixBtn : s.tresBtn)}</button>
                  <p className="lv-garantia"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>{s.garantiaUnico}</span></p>
                </div>
                )}
                <div className={`lv-plano lv-plano-dest ${escolhido === 'anual' ? 'lv-plano-escolhido' : ''}`}>
                  <span className="lv-plano-selo">{s.menorPrecoMes}</span>
                  <h3>{s.dozeMeses}</h3>
                  <p className="lv-plano-preco">{P.anual}<span>{s.cartaoBoleto}</span></p>
                  <p className="lv-plano-equiv">{s.equivMes(P.anualMes)}</p>
                  <p>{s.anoTxt}</p>
                  <button type="button" className="btn btn-primary" onClick={() => ir('checkout', 'anual')} disabled={ocupado} data-cta="assinatura_anual">{ocupado ? t.geral.abrindo : s.anoBtn}</button>
                  <p className="lv-garantia"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>{s.garantiaUnico}</span></p>
                </div>
              </div>
            </>
          )}
          {!a.ativa && (pt
            ? <section aria-labelledby="faq-assinatura" className="lv-faq-assinatura"><h2 id="faq-assinatura" className="pagina-h2">Dúvidas sobre a assinatura</h2>
                <h3>É seguro pagar?</h3><p>O pagamento é processado pela Stripe, que também cuida do cartão. A Linvuu não vê nem guarda o número do seu cartão.</p>
                <h3>E se eu não gostar?</h3><p>Você tem reembolso integral em até 7 dias. É só escrever para <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>.</p>
                <h3>Como cancelo?</h3><p>Na assinatura mensal, pelo botão de gerenciar nesta página, quando quiser. Os pacotes de 3 e 12 meses são pagamento único: não renovam sozinhos.</p>
                <h3>Posso experimentar sem cartão?</h3><p>As {AULAS_GRATIS} primeiras aulas de cada curso são gratuitas, sem cartão.</p>
                <h3>Qual é o desconto no Pix?</h3><p>O plano trimestral custa {P.trimestralPix} no Pix, 30% de desconto sobre {P.trimestral}.</p></section>
            : <section aria-labelledby="faq-assinatura" className="lv-faq-assinatura"><h2 id="faq-assinatura" className="pagina-h2">Questions about the subscription</h2>
                <h3>Can I try it without a card?</h3><p>The first {AULAS_GRATIS} lessons of every course are free, with no card required.</p>
                <h3>What currency are the prices in?</h3><p>US dollars: {P.mensal} a month or {P.anual} for 12 months, paid by card.</p>
                <h3>Is paying safe?</h3><p>Payment is processed by Stripe. Linvuu never sees or stores your card number.</p>
                <h3>What if I do not like it?</h3><p>You get a full refund within 7 days. Write to <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>.</p>
                <h3>How do I cancel?</h3><p>The monthly plan can be cancelled any time with the manage button on this page. The 12-month plan is a one-time payment and does not renew.</p></section>)}
          {erro && <p className="erro" role="alert">{erro}</p>}
          <Avaliacoes />
          <p><Link to="/termos">{s.termos}</Link></p>
        </div>
      )}
    </div>
  );
}

