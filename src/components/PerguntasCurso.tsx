import { Link } from 'react-router-dom';
import { precosDo } from '../config/planos';
import { LOCALE, useT } from '../i18n';

type Grupo = { titulo: string; nivel?: string; dias: [number, number] };

/** .com (lote I3): as 4 perguntas de quem compara cursos de idioma — preço, tempo até o B1, professor e iniciante.
 *  Tudo vem dos dados: contagens do índice, preço de planos.ts, título real da aula 1. O prazo é dito em horas e
 *  ritmo, nunca como promessa de data (CLAUDE.md, ARMADILHA 5). Professor ao vivo só existe no russo. */
export function PerguntasCurso({ id, nome, grupos }: { id: string; nome: string; grupos: Grupo[] }) {
  const t = useT();
  if (!grupos.length) return null;
  const q = t.cursoPagina.perguntas;
  const sessoes = grupos[grupos.length - 1].dias[1];
  const preco = precosDo(LOCALE.codigo);
  return (
    <section aria-labelledby="curso-perguntas" className="texto-legal curso-perguntas">
      <h2 id="curso-perguntas" className="pagina-h2">{q.titulo(nome)}</h2>
      <h3>{q.precoP}</h3><p>{q.precoR(preco.mensal, preco.anual)}</p>
      <h3>{q.prazoP}</h3><p>{q.prazoR(grupos.length, sessoes, Math.round(sessoes * 30 / 60), Math.round(sessoes / 30), grupos.some((g) => g.nivel === 'zero'))}</p>
      <h3>{q.professorP}</h3>{id === 'ru' ? <p>{q.professorRu} <Link to="/russo-online">{q.professorRuLink}</Link></p> : <p>{q.professorOutro}</p>}
      <h3>{q.iniciante}</h3><p>{q.inicianteR(grupos[0].titulo)}</p>
    </section>
  );
}
