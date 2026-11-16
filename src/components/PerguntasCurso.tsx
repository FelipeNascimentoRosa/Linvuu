import { Link } from 'react-router-dom';
import { LOCALE, useT } from '../i18n';
import { gerarPerguntasCurso, type GrupoPergunta } from '../lib/perguntasCurso';

/** Perguntas visíveis e dados estruturados compartilham a mesma fonte. */
export function PerguntasCurso({ id, nome, grupos }: { id: string; nome: string; grupos: GrupoPergunta[] }) {
  const t = useT();
  const perguntas = gerarPerguntasCurso(id, LOCALE.codigo, grupos);
  if (!perguntas.length) return null;
  return (
    <section aria-labelledby="curso-perguntas" className="texto-legal curso-perguntas">
      <h2 id="curso-perguntas" className="pagina-h2">{t.cursoPagina.perguntas.titulo(nome)}</h2>
      {perguntas.map((q) => <div key={q.pergunta}><h3>{q.pergunta}</h3><p>{q.resposta}{q.link && <> <Link to="/russo-online">{q.link}</Link></>}</p></div>)}
    </section>
  );
}
