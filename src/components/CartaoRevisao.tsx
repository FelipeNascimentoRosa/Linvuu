import { Link } from 'react-router-dom';
import { useRevisaoWeb } from '../lib/revisaoWeb/useRevisaoWeb';
import { quandoRevisao, textosRevisao } from '../lib/revisaoWeb/textos';

/** Entrada da revisão espaçada na página do curso e na área do aluno. Só aparece quando há algo real a mostrar:
 *  blocos para rever agora ou uma próxima revisão agendada (sem registro nenhum, não renderiza). */
export function CartaoRevisao({ idioma }: { idioma: string }) {
  const R = textosRevisao();
  const { itens, proxima } = useRevisaoWeb(idioma);
  if (!itens.length && !proxima) return null;
  const hoje = itens.length;
  return (
    <section className="cartao-revisao" aria-label={R.cartaoRegiao}>
      <h2 className="cartao-revisao-titulo">{hoje ? R.cartaoHoje(hoje) : R.nada}</h2>
      <p>{hoje ? R.cartaoTexto : proxima ? R.cartaoProxima(quandoRevisao(proxima)) : ''}</p>
      {hoje > 0 && <Link className="btn btn-primary" to={`/curso/${idioma}/revisao`} data-cta="revisao_web">{R.cartaoAcao}</Link>}
      {hoje > 0 && proxima && <small>{R.cartaoProxima(quandoRevisao(proxima))}</small>}
    </section>
  );
}
