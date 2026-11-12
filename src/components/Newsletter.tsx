import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { authConfigurado } from '../lib/firebase';
import { api } from '../lib/api';
import { emailOficial } from '../config/site';
import { LOCALE, useT } from '../i18n';

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Captura de e-mail. Envia para POST /api/newsletter (server/newsletter.ts), que grava em `newsletter` no Firestore. Sem Firebase, oferece o e-mail de contato. */
export function Newsletter({ origem }: { origem: string }) {
  const t = useT();
  const [email, setEmail] = useState('');
  const [aceite, setAceite] = useState(false);
  const [isca, setIsca] = useState(''); // campo-isca anti-robô: pessoas não o veem nem preenchem
  const [estado, setEstado] = useState<'livre' | 'enviando' | 'ok' | 'erro'>('livre');
  const [aviso, setAviso] = useState('');

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_OK.test(email.trim())) { setAviso(t.newsletter.invalido); return; }
    if (!aceite) { setAviso(t.newsletter.semAceite); return; }
    setAviso(''); setEstado('enviando');
    try {
      // O servidor valida, limita por IP, registra o consentimento e grava (o navegador não escreve no Firestore).
      const r = await fetch(api('/api/newsletter'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), origem: origem.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40) || 'site', idioma: LOCALE.explicacao, aceite: true, ref_extra_nl: isca }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setEstado('ok');
    } catch { setEstado('erro'); }
  };

  if (!authConfigurado) return <p className="news-nota"><a href={`mailto:${emailOficial()}?subject=${encodeURIComponent(t.newsletter.assunto)}`}>{emailOficial()}</a></p>;
  if (estado === 'ok') return <p className="news-ok" role="status">{t.newsletter.ok}</p>;
  return (
    <form className="news" onSubmit={enviar} noValidate>
      <div className="news-linha">
        <label htmlFor={`news-${origem}`} className="sr-only">{t.newsletter.email}</label>
        <input id={`news-${origem}`} type="email" autoComplete="email" placeholder={t.newsletter.email} value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="btn btn-primary" disabled={estado === 'enviando'}>{estado === 'enviando' ? t.newsletter.ocupado : t.newsletter.botao}</button>
      </div>
      <input type="text" name="ref_extra_nl" tabIndex={-1} autoComplete="off" aria-hidden="true" value={isca} onChange={(e) => setIsca(e.target.value)} style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }} />
      <label className="check news-aceite"><input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} /> {t.newsletter.consentimento} <Link to="/privacidade">{t.rodape.privacidade}</Link></label>
      {aviso && <p className="conta-erro" role="alert">{aviso}</p>}
      {estado === 'erro' && <p className="conta-erro" role="alert">{t.newsletter.erro} <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>.</p>}
    </form>
  );
}
