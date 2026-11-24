import { useState } from 'react';
import { emailOficial } from '../config/site';
import { LOCALE, useT } from '../i18n';
import { siteDoIdioma } from '../i18n/locales';

export function ReportarProblema({ idioma, dia }: { idioma: string; dia: number }) {
  const t = useT().player;
  const [aberto, setAberto] = useState(false);
  const [descricao, setDescricao] = useState('');
  const caminho = `/curso/${idioma}/dia/${dia}`;
  const mensagem = `${t.reportarContexto}: ${siteDoIdioma(LOCALE.codigo)}${caminho}\n\n${descricao.trim()}`;
  const href = `mailto:${emailOficial()}?subject=${encodeURIComponent(`${t.reportar}: ${idioma} / ${dia}`)}&body=${encodeURIComponent(mensagem)}`;
  return <section className="aa-reporte">
    <button type="button" className="link" aria-expanded={aberto} onClick={() => setAberto(!aberto)}>{t.reportar}</button>
    {aberto && <div className="aa-reporte-corpo">
      <p>{t.reportarAjuda}</p>
      <label htmlFor="reporte-descricao">{t.reportarDescricao}</label>
      <textarea id="reporte-descricao" value={descricao} onChange={e => setDescricao(e.target.value)} maxLength={1200} rows={3} />
      <p><a className="btn btn-ghost" href={href}>{t.reportarEmail}</a></p>
      <small>{t.reportarAviso} <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a></small>
    </div>}
  </section>;
}
