import { useEffect, useState } from 'react';
import { LOCALE } from '../../i18n';
import { gratis } from '../../config/planos';
import { useAssinatura } from '../../lib/acesso';
import { agendaDoCurso, type ItemReforco } from './reforco';

const quando = (iso: string, l: 'pt-BR' | 'en') => {
  const dias = Math.max(1, Math.ceil((Date.parse(iso) - Date.now()) / 86_400_000));
  return { 'pt-BR': dias === 1 ? 'amanhã' : `em ${dias} dias`, en: dias === 1 ? 'tomorrow' : `in ${dias} days`  }[l];
};
const textos = {
  'pt-BR': { rotulo: 'Reforço', titulo: (n: number) => n === 1 ? '1 exercício para rever' : `${n} exercícios para rever`, texto: (s: number) => s === 1 ? 'Volte ao que errou antes de seguir. Lembrar com esforço é o que fixa.' : `Erros em ${s} blocos de prática. Comece pelo mais antigo: lembrar com esforço é o que fixa.`, espacado: 'Erros que você já corrigiu voltam depois de 1, 3 e 7 dias. Relembrar depois de um intervalo fixa mais do que rever na hora.', acao: 'Rever erros agora', proxima: (q: string) => `Próximo reforço espaçado: ${q}.` },
  en: { rotulo: 'Review', titulo: (n: number) => n === 1 ? '1 exercise to review' : `${n} exercises to review`, texto: (s: number) => s === 1 ? 'Go back to what you missed before moving on. Effortful recall is what makes it stick.' : `Mistakes in ${s} practice blocks. Start with the oldest: effortful recall is what makes it stick.`, espacado: 'Mistakes you already fixed come back after 1, 3 and 7 days. Recalling after a gap makes them stick better than reviewing right away.', acao: 'Review mistakes now', proxima: (q: string) => `Next spaced review: ${q}.` },
};

/** Link do cartão: a volta espaçada abre direto a rodada nova; o erro pendente abre o bloco. */
export const linkReforco = (idioma: string, i: ItemReforco) => `/curso/${idioma}/dia/${i.dia}?bloco=${i.bloco}${i.tipo === 'espacado' ? '&reforco=1' : ''}`;

/** Reforço do curso, só em sessões que o aluno pode abrir. Atualiza quando a prática muda. */
export function useReforco(idioma: string | undefined) {
  const assinatura = useAssinatura();
  const ler = () => {
    if (!idioma) return { itens: [] as ItemReforco[], proxima: null as string | null };
    const a = agendaDoCurso(idioma);
    return { itens: a.itens.filter((i) => gratis(i.dia) || assinatura.ativa), proxima: a.proxima };
};
  const [agenda, setAgenda] = useState(ler);
  useEffect(() => {
    const sync = () => setAgenda(ler());
    sync();
    for (const e of ['storage', 'linvuu:dias', 'linvuu:revisao-apk']) window.addEventListener(e, sync);
    return () => { for (const e of ['storage', 'linvuu:dias', 'linvuu:revisao-apk']) window.removeEventListener(e, sync); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idioma, assinatura.ativa]);
  const t = textos[LOCALE.codigo];
  const { itens, proxima } = agenda;
  return {
    itens,
    total: itens.reduce((n, i) => n + i.pendentes, 0),
    t,
    /** Explicação do cartão: muda quando só há voltas espaçadas. */
    texto: itens.length && itens.every((i) => i.tipo === 'espacado') ? t.espacado : t.texto(itens.length),
    proxima: proxima ? t.proxima(quando(proxima, LOCALE.codigo)) : null,
    link: itens[0] && idioma ? linkReforco(idioma, itens[0]) : null,
};
}
