import { LOCALE, useT } from '../i18n';
import type { Explicacao } from '../i18n/locales';

const LABEL = { 'pt-BR': 'Idioma das explicações', en: 'Explanation language' };
const INDISPONIVEL = { 'pt-BR': 'ainda não disponível nesta aula', en: 'not available for this lesson yet' };
export function IdiomaExplicacao({ valor, disponiveis, mudar }: { valor: Explicacao; disponiveis: Explicacao[]; mudar: (v: Explicacao) => void }) {
  const t = useT();
  return <label className="idioma-explicacao">{LABEL[LOCALE.codigo]}{' '}
    <select value={valor} onChange={(e) => mudar(e.target.value as Explicacao)}>
      {(['pt', 'en'] as const).map((l) => <option key={l} value={l} disabled={!disponiveis.includes(l)}>{t.linguas[l]}{!disponiveis.includes(l) ? ` — ${INDISPONIVEL[LOCALE.codigo]}` : ''}</option>)}
    </select>
  </label>;
}
