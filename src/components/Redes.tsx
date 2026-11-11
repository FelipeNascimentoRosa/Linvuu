import { REDES } from '../config/social';
import { SOCIAL_PATHS } from '../config/socialIcons';
import { useT } from '../i18n';

/** Ícones das redes da Linvuu; só entram redes com endereço (sem ícone «em breve»). Rótulos no idioma do domínio. */
export function Redes() {
  const t = useT();
  return (
    <ul className="redes" aria-label={t.rodape.redesRotulo}>
      {REDES.filter((r) => r.url).map((r) => (
        <li key={r.id}>
          <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.nome} (${t.rodape.novaAba})`}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d={SOCIAL_PATHS[r.id]} fill="currentColor" /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
