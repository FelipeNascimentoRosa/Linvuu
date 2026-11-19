import { BotaoPreferencias } from './AnalyticsConsent';
import { Link } from 'react-router-dom';
import { CURSOS_ATIVOS, cursoComExplicacaoNoSite } from '../lib/content';
import { emailOficial } from '../config/site';
import { LOCALE, useT } from '../i18n';
import { Redes } from './Redes';
import { ContatoIcones } from './IconesContato';
import { Newsletter } from './Newsletter';

/** Rodapé do site. Nas páginas da área do aluno (`semNovidades`) o bloco de newsletter não aparece. */
export function Footer({ semNovidades = false }: { semNovidades?: boolean }) {
  const t = useT();
  return (
    <footer className="lv-foot">
      {!semNovidades && (
        <div className="lv-foot-news" id="novidades">
          <div className="lv-foot-news-in">
            <div>
              <h2>{t.rodape.novidadesTitulo}</h2>
              <p>{t.rodape.novidadesTexto}</p>
            </div>
            <Newsletter origem="rodape" />
          </div>
        </div>
      )}
      <div className="lv-foot-in">
        <div className="lv-foot-brand">
          <img src="/brand/linvuu-wordmark-papel.svg" alt="Linvuu" width="104" height="33" />
          <p>{t.rodape.frase}</p>
          <div id="redes"><ContatoIcones /><Redes /></div>
        </div>
        <nav aria-label="Linvuu">
          <h2>Linvuu</h2>
          {LOCALE.codigo !== 'pt-BR' && <Link to="/cursos">{t.nav.todos}</Link>}
          {LOCALE.codigo !== 'pt-BR' && <Link to="/gramatica">{t.nav.gramatica}</Link>}
          {LOCALE.codigo !== 'pt-BR' && <Link to="/curso/br">{t.rodape.portugues}</Link>}
          {LOCALE.codigo === 'pt-BR' && <><Link to="/gramatica">{t.nav.gramatica}</Link><Link to="/livros">Livros</Link><Link to="/materiais-gratuitos">Materiais gratuitos</Link><Link to="/sobre">{t.rodape.sobre}</Link><Link to="/por-que-linvuu">{t.rodape.porQue}</Link><Link to="/ex-alunos-udemy">Ex-alunos da Udemy</Link></>}
          {LOCALE.codigo !== 'pt-BR' && <><Link to="/sobre">{t.rodape.sobre}</Link><Link to="/por-que-linvuu">{t.rodape.porQue}</Link></>}
          <Link to="/#avaliacoes">{t.nav.avaliacoes}</Link>
          <Link to="/#faq">{t.nav.duvidas}</Link>
          <Link to="/contato">{t.rodape.contato}</Link>
        </nav>
        <nav aria-label={t.rodape.idiomas}>
          <h2>{t.rodape.idiomas}</h2>
          {CURSOS_ATIVOS.filter((c) => cursoComExplicacaoNoSite(c.id)).map((c) => <Link key={c.id} to={`/curso/${c.id}`}>{c.nome}</Link>)}
        </nav>
      </div>
      <div className="lv-foot-base">
        <span>{t.rodape.direitos}</span>
        <span className="lv-foot-legal"><Link to="/termos">{t.rodape.termos}</Link><Link to="/privacidade">{t.rodape.privacidade}</Link><Link to="/excluir-conta">{({'pt-BR':'Excluir conta',en:'Delete account'} as const)[LOCALE.codigo]}</Link><BotaoPreferencias /></span>
        <a href={`mailto:${emailOficial()}`}>{emailOficial()}</a>
        {/* Identificação legal da empresa (nome registado e CNPJ): factual, não se traduz. */}
        <span className="lv-foot-cnpj">Linvuu · Felipe Nascimento Rosa · CNPJ 38.800.654/0001-72 · São José dos Campos/SP</span>
      </div>
    </footer>
  );
}
