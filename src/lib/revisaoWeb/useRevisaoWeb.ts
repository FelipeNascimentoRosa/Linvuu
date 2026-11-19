import { useEffect, useState } from 'react';
import { gratis } from '../../config/planos';
import { useAssinatura } from '../acesso';
import { useAuth } from '../AuthContext';
import { agendaDoCurso, type ItemReforco } from './agenda';
import { armazemRevisao, EVENTO_REVISAO, sincronizarRevisao } from './armazem';

/** Blocos para rever agora e a data da próxima revisão do curso, só em sessões que o aluno pode abrir.
 *  Com login, traz da conta o que foi feito em outros aparelhos (e reenvia o que ficou só aqui) ao abrir e ao voltar à rede. */
export function useRevisaoWeb(idioma: string | undefined) {
  const { usuario } = useAuth();
  const assinatura = useAssinatura();
  const ler = () => {
    if (!idioma) return { itens: [] as ItemReforco[], proxima: null as string | null, total: 0 };
    const registros = armazemRevisao.ler(idioma);
    const a = agendaDoCurso(idioma, registros);
    return { itens: a.itens.filter((i) => gratis(i.dia) || assinatura.ativa), proxima: a.proxima, total: registros.length };
  };
  const [agenda, setAgenda] = useState(ler);
  const uid = usuario?.uid ?? null;
  useEffect(() => {
    const atualizar = () => setAgenda(ler());
    atualizar();
    const sincronizar = () => { if (uid && idioma) void sincronizarRevisao(idioma); };
    sincronizar();
    window.addEventListener(EVENTO_REVISAO, atualizar);
    window.addEventListener('storage', atualizar);
    window.addEventListener('online', sincronizar);
    return () => { window.removeEventListener(EVENTO_REVISAO, atualizar); window.removeEventListener('storage', atualizar); window.removeEventListener('online', sincronizar); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idioma, uid, assinatura.ativa]);
  return agenda;
}
