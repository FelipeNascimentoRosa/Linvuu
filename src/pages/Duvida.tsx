import { Link, useParams } from 'react-router-dom';
import '../materiais.css';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { duvidaPor, inicial, type TabelaDuvida } from '../lib/duvidas';
import NaoEncontrada from './NaoEncontrada';

// Página de dúvida (/gramatica/<idioma>/<slug>): uma pergunta, a resposta curta no topo, a regra, as tabelas, três
// exemplos, o erro típico e as perguntas frequentes. Conteúdo e regras em src/lib/duvidas.ts. Só no .com.br:
// no .com o servidor redireciona (301) antes de chegar aqui; a guarda de `LOCALE` cobre o endereço aberto direto.

function Tabela({ t, lang }: { t: TabelaDuvida; lang: string }) {
  return (
    <div className="mat-tabela-caixa" role="region" aria-label={t.titulo} tabIndex={0}>
      <table className="mat-tabela">
        <caption>{t.titulo}</caption>
        <thead><tr>{t.colunas.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody>{t.linhas.map((l, i) => <tr key={i}>{l.map((v, j) => <td key={j} lang={t.naLingua.includes(j) ? lang : undefined}>{v}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function Duvida() {
  const { id = '', slug = '' } = useParams();
  const x = duvidaPor(id, slug);
  const foraDoIdioma = LOCALE.codigo !== 'pt-BR';
  usePageTitle(x?.titulo, x?.descricao, ['pt-BR'], foraDoIdioma || !x);
  if (!x) return <NaoEncontrada />;
  return (
    <div className="pagina mat">
      <nav className="mat-trilha" aria-label="Você está em">
        <Link to="/gramatica">Gramática</Link><span aria-hidden="true"> › </span>
        <Link to={`/gramatica/${x.idioma}`}>{inicial(x.nomeIdioma)}</Link><span aria-hidden="true"> › </span>
        <span aria-current="page">{x.h1}</span>
      </nav>
      <article className="mat-aula">
        <header className="mat-topo">
          <h1 className="pagina-h1">{x.h1}</h1>
          <p className="lead">{x.resposta}</p>
          <p className="mat-meta">Por Felipe Nascimento Rosa e Luiza Nascimento Rosa · Leitura grátis, sem cadastro</p>
        </header>

        <section aria-labelledby="duvida-regra">
          <h2 id="duvida-regra" className="mat-h2">A regra</h2>
          {x.regra.map((r, i) => <p key={i} className="mat-p">{inicial(r.texto)}</p>)}
          {x.tabelas.map((t) => <Tabela key={t.titulo} t={t} lang={x.lang} />)}
        </section>

        <section aria-labelledby="duvida-exemplos">
          <h2 id="duvida-exemplos" className="mat-h2">Exemplos</h2>
          <ul className="mat-lista">
            {x.exemplos.map((e) => <li key={e.alvo}><strong lang={x.lang}>{e.alvo}</strong> — {e.pt}</li>)}
          </ul>
        </section>

        <section aria-labelledby="duvida-erros">
          <h2 id="duvida-erros" className="mat-h2">O erro típico de quem fala português</h2>
          <ul className="mat-lista">
            {x.erros.map((e) => (
              <li key={e.errado}>
                <span aria-label="Errado">✗</span> <s lang={x.lang}>{e.errado}</s>{' → '}
                <span aria-label="Certo">✓</span> <strong lang={x.lang}>{e.certo}</strong>. {e.motivo}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="duvida-perguntas">
          <h2 id="duvida-perguntas" className="mat-h2">Perguntas frequentes</h2>
          {x.perguntas.map((q) => (
            <div key={q.p}>
              <h3 className="mat-h3">{q.p}</h3>
              <p className="mat-p">{q.r}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="duvida-depois" className="mat-depois">
          <h2 id="duvida-depois" className="mat-h2">Para praticar</h2>
          <p className="mat-p">Este tema é praticado na aula {x.aula.n} do curso de {x.nomeIdioma} («{x.aula.titulo}»), com áudio em cada frase e exercícios com correção. As 2 primeiras aulas do curso são grátis, sem cartão.</p>
          <p className="mat-acoes">
            <Link className="btn btn-ok" to={`/curso/${x.idioma}/dia/1`}>Começar pelas 2 aulas grátis</Link>
            <Link className="btn btn-ghost" to={`/curso/${x.idioma}/dia/${x.aula.dia}`}>Ir para a aula {x.aula.n}</Link>
            <Link className="btn btn-ghost" to={`/gramatica/${x.idioma}`}>Gramática do {x.nomeIdioma}</Link>
          </p>
          {x.livro && <p className="mat-p"><Link to={x.livro.caminho}>{x.livro.rotulo}</Link></p>}
        </section>
      </article>
    </div>
  );
}
