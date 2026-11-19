import { useMemo, useState } from 'react';
import { LOCALE } from '../../i18n';
import { avaliarVolta, previsoesVolta } from './reforco';
import { NOTAS, notasPermitidas, rotuloIntervalo, type Nota } from '../../lib/revisao/espacadoModelo';
import { pendentesRevisao, type Revisao } from '../../lib/revisao/revisaoModelo';

/** Rótulos por idioma da interface (pt-BR no .com.br, en no .com) e o texto falado de cada intervalo (leitor de tela). */
const T = {
  'pt-BR': {
    titulo: 'Como foi lembrar?',
    nomes: { again: 'Errei', hard: 'Difícil', good: 'Bom', easy: 'Fácil' } as Record<Nota, string>,
    errou: 'Você errou ou precisou repetir nesta volta. Só «Errei» registra isso; o bloco volta em breve para você reforçar.',
    acertou: 'Você acertou tudo de primeira. Diga o quanto custou lembrar: o intervalo muda com a sua escolha.',
    voltaEm: (r: string) => `volta em ${r}`,
    unidade: { m: 'minutos', h: 'horas', d: 'dias', mo: 'meses' } as Record<string, string>,
    ok: (r: string) => `Registrado. Este bloco volta em ${r}.`,
    falha: 'Não foi possível salvar neste aparelho. Tente de novo.',
  },
  en: {
    titulo: 'How did it feel to recall?',
    nomes: { again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' } as Record<Nota, string>,
    errou: 'You missed something or had to repeat in this round. Only “Again” records that; the block comes back soon so you can reinforce it.',
    acertou: 'You got everything right the first time. Say how much effort it took: the interval changes with your choice.',
    voltaEm: (r: string) => `back in ${r}`,
    unidade: { m: 'minutes', h: 'hours', d: 'days', mo: 'months' } as Record<string, string>,
    ok: (r: string) => `Saved. This block comes back in ${r}.`,
    falha: 'Could not save on this device. Try again.',
  },
};
const falado = (rotulo: string, u: Record<string, string>) => { const m = /^(\d+)(mo|m|h|d)$/.exec(rotulo); return m ? `${m[1]} ${u[m[2]]}` : rotulo; };

/** Painel final da volta espaçada: 4 botões (Errei/Difícil/Bom/Fácil) com o intervalo previsto pelo ts-fsrs.
 *  A nota respeita a correção automática: errou ou repetiu → só «Errei»; acertou de primeira → Difícil, Bom ou Fácil. */
export function AvaliacaoVolta({ bloco, revisaoEm, v }: { bloco: string; revisaoEm: string; v: Revisao }) {
  const t = T[LOCALE.codigo];
  const acertouDePrimeira = v.rodada === 1 && pendentesRevisao(v).length === 0;
  const liberadas = notasPermitidas(acertouDePrimeira);
  const agora = useMemo(() => Date.now(), []);
  const previsoes = useMemo(() => previsoesVolta(bloco, revisaoEm, agora), [bloco, revisaoEm, agora]);
  const [feito, setFeito] = useState<{ nota: Nota; rotulo: string } | null>(null);
  const [falhou, setFalhou] = useState(false);
  if (!previsoes) return null;
  const escolher = (nota: Nota) => {
    const ok = avaliarVolta(bloco, revisaoEm, nota, agora);
    setFalhou(!ok);
    if (ok) setFeito({ nota, rotulo: rotuloIntervalo(previsoes[nota], agora) });
  };
  return (
    <div className="app-avaliacao" role="group" aria-labelledby="app-avaliacao-titulo">
      <h4 id="app-avaliacao-titulo">{t.titulo}</h4>
      <p>{acertouDePrimeira ? t.acertou : t.errou}</p>
      <div className="app-avaliacao-botoes">
        {NOTAS.map((nota) => {
          const rotulo = rotuloIntervalo(previsoes[nota], agora);
          const ativa = !feito && liberadas.includes(nota);
          return (
            <button key={nota} type="button" className={`btn ${ativa ? 'btn-primary' : 'btn-ghost'}`} disabled={!ativa} aria-pressed={feito?.nota === nota}
              aria-label={`${t.nomes[nota]}, ${t.voltaEm(falado(rotulo, t.unidade))}`} onClick={() => escolher(nota)}>
              <span>{t.nomes[nota]}</span><small aria-hidden="true">{rotulo}</small>
            </button>
          );
        })}
      </div>
      <p role="status" aria-live="polite">{feito ? t.ok(falado(feito.rotulo, t.unidade)) : falhou ? t.falha : ''}</p>
    </div>
  );
}
