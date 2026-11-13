import { Link } from 'react-router-dom';
import '../livros.css';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { EX_ALUNOS } from '../lib/institucional';
import { whatsappUrl } from '../config/contato';

/** Ex-alunos da Udemy: página em português que explica como continuar o russo na Linvuu. O valor especial não aparece aqui: é combinado depois da confirmação. */
export default function ExAlunosUdemy() {
  usePageTitle(EX_ALUNOS.titulo, EX_ALUNOS.descricao, ['pt-BR'], LOCALE.codigo !== 'pt-BR');
  const zap = whatsappUrl(EX_ALUNOS.mensagemWhatsapp);
  return (
    <div className="pagina lvr">
      <header className="lvr-topo">
        <h1 className="pagina-h1">{EX_ALUNOS.titulo}</h1>
        <p className="lead">{EX_ALUNOS.lead}</p>
        {LOCALE.codigo !== 'pt-BR' && <p className="lvr-nota" lang="pt-BR">Esta página está em português.</p>}
      </header>

      <section className="lvr-artigo" aria-label="O que você encontra na Linvuu">
        <h2 className="lvr-h2">O que você encontra na Linvuu</h2>
        <ul className="lvr-lista">
          {EX_ALUNOS.beneficios.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <p className="lvr-p">
          Quer ver antes? <Link to="/livros/ru">Leia os dois primeiros capítulos do livro de russo</Link> ou <Link to="/curso/ru">veja o curso de russo</Link>.
        </p>

        <h2 className="lvr-h2">Como pedir sua condição especial</h2>
        <ol className="lvr-lista">
          {EX_ALUNOS.passos.map((p) => <li key={p}>{p}</li>)}
        </ol>
        <p className="lvr-p">{EX_ALUNOS.aviso}</p>
        <p className="lvr-p">
          {zap && <a className="btn btn-primary" href={zap} target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp</a>}{' '}
          <Link className="btn" to="/cadastro">Criar minha conta</Link>
        </p>

        <h2 className="lvr-h2">Perguntas frequentes</h2>
        {EX_ALUNOS.perguntas.map((q) => (
          <div key={q.p}>
            <h3 className="lvr-h3">{q.p}</h3>
            <p className="lvr-p">{q.r}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
