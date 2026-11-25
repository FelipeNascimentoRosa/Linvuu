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
  en: { texto: 'Prefer English? Visit Linvuu for English speakers.', ir: 'Open Linvuu in English', curto: 'In English', fechar: 'Stay here' },
  'pt-BR': { texto: 'Fala português? Visite a Linvuu para quem fala português.', ir: 'Abrir a Linvuu em português', curto: 'Em português', fechar: 'Continuar aqui' },
};

export function SugestaoIdioma() {
  const [alvo, setAlvo] = useState<CodigoLocale | null>(null);
  useEffect(() => {
    try { if (localStorage.getItem(CHAVE) === '1') return; } catch { /* sem armazenamento: mostra */ }
    if (/bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) return;
    setAlvo(idiomaSugerido(navigator.languages?.length ? navigator.languages : [navigator.language], LOCALE.codigo));
  }, []);
  if (!alvo) return null;
  const t = LOCALE.codigo === 'en' && alvo === 'pt-BR'
    ? { texto: 'Prefer Portuguese? Visit Linvuu for Portuguese speakers.', ir: 'Open Linvuu in Portuguese', curto: 'In Portuguese', fechar: 'Stay here' }
    : TX[alvo];
  const fechar = () => { try { localStorage.setItem(CHAVE, '1'); } catch { /* fecha só agora */ } setAlvo(null); };
  return (
    <aside className="sugestao-idioma" lang={LOCALE.codigo === 'en' ? 'en' : alvo} aria-label={t.ir}>
      <p>{t.texto}</p>
      <a href={urlEm(alvo)} hrefLang={alvo} aria-label={t.ir} onClick={(e) => {
        try { localStorage.setItem(CHAVE, '1'); } catch { /* segue */ }
        // Só para o par real desta página (o mesmo do hreflang do <head>); sem par, a home do outro domínio.
        // Antes o link levava ao mesmo caminho no outro domínio, que às vezes era 301 de volta ou noindex (claude-seo L2).
        const par = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${alvo}"]`)?.href;
        e.currentTarget.href = par || urlEm(alvo);
      }}><span className="si-longo">{t.ir}</span><span className="si-curto">{t.curto}</span></a>
      <button type="button" onClick={fechar} aria-label={t.fechar}><span className="si-longo">{t.fechar}</span><span className="si-curto" aria-hidden="true">×</span></button>
    </aside>
  );
}
