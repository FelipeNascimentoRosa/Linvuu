// Assinatura pelo Google Play na tela de conta do app. Só aparece no build com cobrança da Play ligada.
// Mostra o preço e a frequência vindos da loja, a renovação automática e como cancelar ANTES do botão de compra.
// Não mostra nem leva a preço ou pagamento do site (política de pagamentos da Play).
import { useEffect, useRef, useState } from 'react';
import type { PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { LOCALE } from '../../i18n';
import type { Assinatura } from '../../lib/acesso';
import { comprasPlayDisponiveis, comprarPlay, ofertasPlay, restaurarPlay } from './comprasPlay';
import { linkGerenciarPlay, resumoOferta } from './comprasPlayModelo';

const PACOTE_APP = 'com.linvuu.app';
const textos = {
  'pt-BR': { titulo: 'Assinar pelo Google Play', carregando: 'Carregando planos do Google Play…', semOfertas: 'Nenhum plano disponível no Google Play agora. Tente novamente mais tarde.', erroOfertas: 'Não foi possível falar com o Google Play.', tentar: 'Tentar novamente', assinar: (p: string, f: string) => `Assinar por ${p} ${f}`, renova: (f: string) => `Renova automaticamente ${f} até você cancelar. A cobrança é feita na sua conta do Google Play.`, cancelar: 'Cancele quando quiser em Google Play › Pagamentos e assinaturas › Assinaturas. O acesso continua até o fim do período já pago.', restaurar: 'Restaurar compra', verificando: 'Compra confirmada pelo Google Play. Liberando o acesso…', liberado: 'Assinatura ativa. As sessões do curso estão liberadas.', atraso: 'A compra foi feita, mas o acesso ainda não apareceu. Toque em "Restaurar compra" em alguns minutos.', cancelada: 'Compra cancelada. Nada foi cobrado.', pendente: 'Pagamento pendente. O acesso é liberado quando o Google Play confirmar.', ja: 'Esta conta do Google Play já tem a assinatura. Toque em "Restaurar compra".', falha: 'A compra não foi concluída. Nada foi cobrado. Tente novamente.', restaurado: 'Compras restauradas. Conferindo o acesso…', nenhuma: 'Nenhuma assinatura ativa foi encontrada nesta conta do Google Play.', ativaPlay: 'Sua assinatura está ativa pelo Google Play.', ativaSite: 'Sua conta já tem acesso por uma assinatura feita fora do app. Ela é gerenciada pelo mesmo meio em que foi feita.', gerenciar: 'Gerenciar no Google Play', termina: (d: string) => `Cancelada: o acesso vai até ${d}.`, ate: (d: string) => `Próxima renovação ou fim do período: ${d}.` },
  en: { titulo: 'Subscribe with Google Play', carregando: 'Loading Google Play plans…', semOfertas: 'No plan is available on Google Play right now. Please try again later.', erroOfertas: 'Could not reach Google Play.', tentar: 'Try again', assinar: (p: string, f: string) => `Subscribe for ${p} ${f}`, renova: (f: string) => `Renews automatically ${f} until you cancel. You are charged through your Google Play account.`, cancelar: 'Cancel anytime in Google Play › Payments & subscriptions › Subscriptions. Access continues until the end of the period already paid.', restaurar: 'Restore purchase', verificando: 'Purchase confirmed by Google Play. Unlocking access…', liberado: 'Subscription active. Course sessions are unlocked.', atraso: 'The purchase went through, but access has not appeared yet. Tap "Restore purchase" in a few minutes.', cancelada: 'Purchase cancelled. You were not charged.', pendente: 'Payment pending. Access is unlocked once Google Play confirms it.', ja: 'This Google Play account already has the subscription. Tap "Restore purchase".', falha: 'The purchase was not completed. You were not charged. Please try again.', restaurado: 'Purchases restored. Checking access…', nenhuma: 'No active subscription was found on this Google Play account.', ativaPlay: 'Your subscription is active through Google Play.', ativaSite: 'Your account already has access from a subscription made outside the app. Manage it where you subscribed.', gerenciar: 'Manage on Google Play', termina: (d: string) => `Cancelled: access lasts until ${d}.`, ate: (d: string) => `Next renewal or end of period: ${d}.` },
};
const data = (s: number) => new Date(s * 1000).toLocaleDateString(LOCALE.codigo, { day: 'numeric', month: 'long', year: 'numeric' });

export function AssinaturaPlay({ uid, acesso }: { uid: string; acesso: Assinatura }) {
  const t = textos[LOCALE.codigo];
  const [pacotes, setPacotes] = useState<PurchasesPackage[] | null>(null);
  const [erro, setErro] = useState(false), [ocupado, setOcupado] = useState(false), [msg, setMsg] = useState('');
  const [tentativa, setTentativa] = useState(0);
  const [conferencia, setConferencia] = useState(0), origem = useRef<'compra' | 'restaurar'>('compra');
  const recarregar = acesso.recarregar;
  const disponivel = comprasPlayDisponiveis();
  useEffect(() => {
    if (!disponivel || acesso.ativa) return;
    let vivo = true;
    setPacotes(null); setErro(false);
    ofertasPlay(uid).then((p) => { if (vivo) setPacotes(p); }).catch(() => { if (vivo) setErro(true); });
    return () => { vivo = false; };
  }, [uid, disponivel, acesso.ativa, tentativa]);
  // Depois da compra, o servidor confere no RevenueCat: 1 conferência imediata e até 4 novas, a cada 2,5 s.
  useEffect(() => {
    if (!conferencia) return;
    if (acesso.ativa) { setConferencia(0); setMsg(t.liberado); return; }
    if (acesso.carregando) return;
    if (conferencia > 4) { setConferencia(0); setMsg(origem.current === 'compra' ? t.atraso : t.nenhuma); return; }
    const id = setTimeout(() => { setConferencia((c) => c + 1); recarregar(); }, 2500);
    return () => clearTimeout(id);
  }, [conferencia, acesso.ativa, acesso.carregando, recarregar, t]);
  if (!disponivel) return null;
  const conferir = (m: string) => { setMsg(m); setConferencia(1); recarregar(); };
  const executar = async (acao: () => Promise<unknown>, ok: string) => {
    if (ocupado) return;
    setOcupado(true); setMsg('');
    try { await acao(); conferir(ok); }
    catch (e) {
      const x = e as { userCancelled?: boolean; code?: string };
      setMsg(x?.userCancelled || x?.code === '1' ? t.cancelada : x?.code === '20' ? t.pendente : x?.code === '6' ? t.ja : t.falha);
    } finally { setOcupado(false); }
  };
  if (acesso.ativa) return <section className="app-exclusao app-play" aria-labelledby="play-titulo">
    <h2 id="play-titulo">{t.titulo}</h2>
    {acesso.via === 'play' ? <>
      <p>{t.ativaPlay} {acesso.cancelaEm ? t.termina(data(acesso.cancelaEm)) : acesso.ate ? t.ate(data(acesso.ate)) : ''}</p>
      <a className="btn btn-ghost" href={linkGerenciarPlay(PACOTE_APP)}>{t.gerenciar}</a>
    </> : <p>{t.ativaSite}</p>}
    <p role="status" aria-live="polite">{msg}</p>
  </section>;
  const ofertas = (pacotes ?? []).map((p) => ({ p, r: resumoOferta(p.product, LOCALE.codigo) })).filter((x) => x.r);
  return <section className="app-exclusao app-play" aria-labelledby="play-titulo" aria-busy={ocupado || pacotes === null}>
    <h2 id="play-titulo">{t.titulo}</h2>
    {erro ? <><p>{t.erroOfertas}</p><button type="button" className="btn btn-ghost" onClick={() => setTentativa((n) => n + 1)}>{t.tentar}</button></>
      : pacotes === null ? <p role="status">{t.carregando}</p>
      : !ofertas.length ? <p>{t.semOfertas}</p>
      : ofertas.map(({ p, r }) => <div className="app-play-plano" key={p.identifier}>
          <h3>{p.product.title.replace(/\s*\([^)]*\)\s*$/, '')}</h3>
          <p className="app-play-preco"><strong>{r!.preco}</strong> {r!.frequencia}</p>
          {r!.inicial && <p>{r!.inicial}</p>}
          <p>{t.renova(r!.frequencia)}</p>
          <button type="button" className="btn btn-primary" disabled={ocupado} onClick={() => { origem.current = 'compra'; void executar(() => comprarPlay(uid, p), t.verificando); }}>{t.assinar(r!.preco, r!.frequencia)}</button>
        </div>)}
    <p>{t.cancelar}</p>
    <button type="button" className="btn btn-ghost" disabled={ocupado} onClick={() => { origem.current = 'restaurar'; void executar(() => restaurarPlay(uid), t.restaurado); }}>{t.restaurar}</button>
    <p role="status" aria-live="polite">{msg}</p>
  </section>;
}
