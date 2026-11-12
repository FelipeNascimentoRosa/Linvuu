// Sugestão de idioma para quem chega no domínio "errado" (como o Duolingo pergunta a língua de quem chega):
// navegador em outra língua que não o português no .com.br → oferece o linvuu.com (inglês); navegador em português no .com → oferece o .com.br.
// Não redireciona sozinho: redirecionar pela língua do navegador confunde o Google e quem escolheu o endereço de propósito.
import { useEffect, useState } from 'react';
import { LOCALE, urlEm } from '../i18n';
import type { CodigoLocale } from '../i18n/locales';
import { idiomaSugerido } from '../lib/sugestaoIdioma';
import './sugestao-idioma.css';

const CHAVE = 'linvuu:sugestao-idioma-dispensada';
const TX: Record<CodigoLocale, { texto: string; ir: string; curto: string; fechar: string }> = {
  en: { texto: 'Prefer English? Linvuu explains every course in English.', ir: 'Open Linvuu in English', curto: 'In English', fechar: 'Stay here' },
  'pt-BR': { texto: 'Fala português? A Linvuu explica todos os cursos em português.', ir: 'Abrir a Linvuu em português', curto: 'Em português', fechar: 'Continuar aqui' },
};

export function SugestaoIdioma() {
  const [alvo, setAlvo] = useState<CodigoLocale | null>(null);
  useEffect(() => {
    try { if (localStorage.getItem(CHAVE) === '1') return; } catch { /* sem armazenamento: mostra */ }
    if (/bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) return;
    setAlvo(idiomaSugerido(navigator.languages?.length ? navigator.languages : [navigator.language], LOCALE.codigo));
  }, []);
  if (!alvo) return null;
  const t = TX[alvo];
  const fechar = () => { try { localStorage.setItem(CHAVE, '1'); } catch { /* fecha só agora */ } setAlvo(null); };
  return (
    <aside className="sugestao-idioma" lang={alvo} aria-label={t.ir}>
      <p>{t.texto}</p>
      <a href={urlEm(alvo)} hrefLang={alvo} aria-label={t.ir} onClick={() => { try { localStorage.setItem(CHAVE, '1'); } catch { /* segue */ } }}><span className="si-longo">{t.ir} →</span><span className="si-curto">{t.curto} →</span></a>
      <button type="button" onClick={fechar} aria-label={t.fechar}><span className="si-longo">{t.fechar}</span><span className="si-curto" aria-hidden="true">×</span></button>
    </aside>
  );
}
