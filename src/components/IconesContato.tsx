import { Link } from 'react-router-dom';
import { SOCIAL_PATHS } from '../config/socialIcons';
import { LOCALE } from '../i18n';
import { contatos, type IdContato } from '../config/contato';

/** Ícone de um canal de contato: marca (WhatsApp, LinkedIn) ou traço simples (site, e-mail). */
export function IconeContato({ id, size = 20 }: { id: IdContato; size?: number }) {
  if (id === 'whatsapp' || id === 'linkedin') {
    return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false"><path d={SOCIAL_PATHS[id]} fill="currentColor" /></svg>;
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {id === 'site'
        ? <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" /></>
        : <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6.5L20.5 7" /></>}
    </svg>
  );
}

/** Fileira de ícones (rodapé). Usa a mesma classe `.redes` dos ícones sociais, então herda o estilo do rodapé. */
export function ContatoIcones({ ids = ['email', 'whatsapp', 'linkedin'] }: { ids?: IdContato[] }) {
  const en = LOCALE.codigo === 'en';
  return (
    <ul className="redes" aria-label={en ? 'Contact Linvuu' : 'Contato com a Linvuu'}>
      {contatos(LOCALE.codigo).filter((c) => ids.includes(c.id)).map((c) => (
        <li key={c.id}>
          {c.externo || c.href.startsWith('mailto:') || c.href.startsWith('http')
            ? <a href={c.href} aria-label={c.id === 'email' ? (en ? 'Send an e-mail to Linvuu' : 'Enviar e-mail para a Linvuu') : (en ? `${c.nome} (opens in a new tab)` : `${c.nome} (abre em nova aba)`)} {...(c.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><IconeContato id={c.id} /></a>
            : <Link to={c.href} aria-label={`${c.nome}: ${c.rotulo}`}><IconeContato id={c.id} /></Link>}
        </li>
      ))}
    </ul>
  );
}
