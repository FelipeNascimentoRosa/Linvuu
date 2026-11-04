import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { Plano } from '../lib/assinatura';
import { Navegacao } from '../components/Navegacao';
import { useAuth } from '../lib/AuthContext';
import { abrir, useAssinatura } from '../lib/assinatura';
import { AULAS_GRATIS, PRECO_ANUAL, PRECO_ANUAL_MES, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX, PRECO_TRIMESTRAL_PIX_MES } from '../config/planos';
import { EMAIL_OFICIAL } from '../config/site';
import { usePageTitle } from '../lib/usePageTitle';
import { data, LOCALE, useT } from '../i18n';
import { analytics } from '../lib/analytics';
import '../site-publico.css';

export default function Assinatura() {
  const t = useT();
  const s = t.assinatura;
  usePageTitle(LOCALE.codigo === 'pt-BR' ? 'Planos e assinatura' : s.titulo, LOCALE.codigo === 'pt-BR' ? 'Aprenda idiomas com a Linvuu: planos mensal, trimestral com 30% OFF no Pix e anual. Experimente duas aulas grátis, sem cartão.' : undefined, ['pt-BR'], LOCALE.codigo !== 'pt-BR');
  const { usuario, carregando } = useAuth();
  const a = useAssinatura();
  const [params] = useSearchParams();
  // Retorno do Stripe não é confirmação de pagamento (Pix e boleto são assíncronos).
  useEffect(() => { if (params.get('ok') === '1') void analytics.capture('checkout_returned', { page: 'plans' }); }, [params]);
  useEffect(() => { void analytics.capture('view_pricing', { page: 'plans' }); }, []);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');
  const nav = useNavigate();
  const PLANOS: Plano[] = ['mensal', 'trimestral-pix', 'trimestral', 'anual'];
  const pedido = params.get('plano') as Plano | null;
  const escolhido = pedido && PLANOS.includes(pedido) ? pedido : null;
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
      <h1 className="pagina-h1">{LOCALE.codigo === 'pt-BR' ? 'Um plano para o seu próximo passo.' : s.titulo}</h1>
      <div id="oferta-atual" />
      {LOCALE.codigo === 'pt-BR' && !a.ativa && <header className="site-offer-heading"><p className="site-eyebrow">DISPONÍVEL HOJE</p><h2>Assinatura atual</h2><p>Acesso a todos os cursos. Escolha o plano ou comece pelas duas primeiras aulas grátis, sem cartão.</p></header>}
      {carregando || (usuario && a.carregando) ? <p className="resultado" role="status">{t.geral.carregando}</p> : (
        <div className="texto-legal lv-assinatura">
          {params.get('ok') && !a.ativa && <p className="nota">{s.recebido} <button type="button" className="link-btn" onClick={a.recarregar}>{s.atualize}</button>.</p>}
          {usuario && a.indisponivel && <p className="erro" role="alert">{s.indisponivel}</p>}
          {usuario && escolhido && !a.ativa && (
            <div className="nota lv-assinatura-escolhido" role="status">
              <span>{s.escolhido(nomePlano[escolhido])}</span>
              <button type="button" className="btn btn-primary" onClick={() => ir('checkout', escolhido)} disabled={ocupado}>{ocupado ? t.geral.abrindo : s.continuarPagamento}</button>
            </div>
          )}
          {usuario && a.ativa ? (
            <>
              {a.via === 'trimestral' ? (
                <p><strong>{s.tresAtivo}</strong>{a.ate ? s.ate(data(a.ate)) : ''}. {s.semRenovacao}</p>
              ) : (
                <>
                  <p><strong>{s.ativa}</strong>{a.cancelaEm ? s.termina(data(a.cancelaEm)) : ''} {s.liberados}</p>
                  <button type="button" className="btn btn-primary" onClick={() => ir('portal')} disabled={ocupado}>{s.gerenciar}</button>
                </>
              )}
              <p>{s.reembolso} <a href={`mailto:${EMAIL_OFICIAL}`}>{EMAIL_OFICIAL}</a>.</p>
            </>
          ) : (
            <>
              <p>{s.intro(AULAS_GRATIS)}</p>
              <p><Link className="btn btn-ghost" to="/cursos">{LOCALE.codigo === 'pt-BR' ? 'Testar 2 aulas grátis, sem cartão' : t.geral.inicio}</Link></p>
              {!usuario && <p className="nota lv-assinatura-conta">{s.semConta} <Link to="/entrar?proximo=/assinatura">{s.jaTemConta}</Link></p>}
              <div className="lv-planos">
                <div className={`lv-plano ${escolhido === 'mensal' ? 'lv-plano-escolhido' : ''}`}>
                  <h3>{s.mensal}</h3>
                  <p className="lv-plano-preco">{PRECO_MENSAL}<span>{s.porMes}</span></p>
                  <p>{s.mensalTxt}</p>
                  <button type="button" className="btn btn-primary" onClick={() => ir('checkout', 'mensal')} disabled={ocupado}>{ocupado ? t.geral.abrindo : s.assinarBtn}</button>
                </div>
                <div className={`lv-plano ${escolhido?.startsWith('trimestral') ? 'lv-plano-escolhido' : ''}`}>
                  <h3>{s.tresMeses}</h3>
                  <p className="lv-plano-preco">{PRECO_TRIMESTRAL_PIX}<span>{s.noPix}</span></p>
                  <p className="lv-plano-equiv">{s.equivMes(PRECO_TRIMESTRAL_PIX_MES)}</p>
                  <p>{s.pixTxt}</p>
                  <button type="button" className="btn btn-primary" onClick={() => ir('checkout', 'trimestral-pix')} disabled={ocupado}>{ocupado ? t.geral.abrindo : s.pixBtn}</button>
                  <p className="lv-plano-preco">{PRECO_TRIMESTRAL}<span>{s.cartaoBoleto}</span></p>
                  <button type="button" className="btn btn-ghost" onClick={() => ir('checkout', 'trimestral')} disabled={ocupado}>{ocupado ? t.geral.abrindo : s.tresBtn}</button>
                </div>
                <div className={`lv-plano lv-plano-dest ${escolhido === 'anual' ? 'lv-plano-escolhido' : ''}`}>
                  <span className="lv-plano-selo">{s.menorPrecoMes}</span>
                  <h3>{s.dozeMeses}</h3>
                  <p className="lv-plano-preco">{PRECO_ANUAL}<span>{s.cartaoBoleto}</span></p>
                  <p className="lv-plano-equiv">{s.equivMes(PRECO_ANUAL_MES)}</p>
                  <p>{s.anoTxt}</p>
                  <button type="button" className="btn btn-primary" onClick={() => ir('checkout', 'anual')} disabled={ocupado}>{ocupado ? t.geral.abrindo : s.anoBtn}</button>
                </div>
              </div>
            </>
          )}
          {LOCALE.codigo === 'pt-BR' && !a.ativa && <section aria-label="Dúvidas sobre a assinatura"><h2>Posso experimentar sem cartão?</h2><p>As duas primeiras aulas de cada curso são gratuitas, sem cartão.</p><h2>Qual é o desconto no Pix?</h2><p>O plano trimestral custa R$ 291,90 no Pix, 30% de desconto sobre R$ 417.</p></section>}
          {erro && <p className="erro" role="alert">{erro}</p>}
          <p><Link to="/termos">{s.termos}</Link></p>
        </div>
      )}
    </div>
  );
}

