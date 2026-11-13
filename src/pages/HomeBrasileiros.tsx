import { HomeCourseLink } from '../components/HomeCourseLink';
import { homeText as h, homeNotice } from '../i18n/home';
import { LOCALE } from '../i18n';
import { Fragment, useState } from 'react';
import { OfertaAtual } from '../components/OfertaAtual';
import { HOME_BR } from '../config/oferta-publica';
import { LIVROS_EM_PRODUCAO } from '../lib/livros';
import { Link } from 'react-router-dom';
import { falar } from '../lib/audio';
import { usePageTitle } from '../lib/usePageTitle';
import { useRetomadaGeral } from '../lib/retomar';
import { textoRetomada } from '../lib/mensagemRetomada';
import { LIVROS } from '../config/livros';
import { IDIOMAS_GRAMATICA, cursoComExplicacaoNoSite, coberturaNoSite, getCurso } from '../lib/content';
import './home-brasileiros.css';
import { Avaliacoes } from '../components/Avaliacoes';

const TODOS = [
  { id: 'en', nome: 'Inglês', oi: 'Hello', frase: 'Hello. A coffee, please.', lang: 'en', detalhe: 'Do primeiro hello às suas próximas conversas.' },
  { id: 'es', nome: 'Espanhol', oi: 'Hola', frase: 'Hola. Un café, por favor.', lang: 'es', detalhe: 'Vá além do portunhol, com explicações que fazem sentido.' },
  { id: 'fr', nome: 'Francês', oi: 'Bonjour', frase: 'Bonjour. Un café, s’il vous plaît.', lang: 'fr', detalhe: 'Descubra os sons e entenda a lógica do francês.' },
  { id: 'it', nome: 'Italiano', oi: 'Ciao', frase: 'Buongiorno. Un caffè, per favore.', lang: 'it', detalhe: 'Aproxime a vontade de falar da prática diária.' },
  { id: 'de', nome: 'Alemão', oi: 'Hallo', frase: 'Guten Tag. Einen Kaffee, bitte.', lang: 'de', detalhe: 'Descomplique os primeiros passos, uma regra de cada vez.' },
  { id: 'br', nome: 'Português do Brasil', oi: 'Olá', frase: 'Oi, bom dia. Um café, por favor.', lang: 'pt-BR', detalhe: 'Do primeiro “oi” às suas próximas conversas no Brasil.' },
  { id: 'ru', nome: 'Russo', oi: 'Привет', frase: 'Здравствуйте. Мне кофе, пожалуйста.', lang: 'ru', detalhe: 'Comece pelo cirílico. Construa o resto com orientação.' },
];
// Cada público vê os cursos que não são a sua própria língua (em /en some o inglês; em / some o português para estrangeiros).
const idiomasDoSite = TODOS.filter((i) => i.id !== LOCALE.cursoOculto);
const perguntas = [
  ['Preciso saber alguma coisa para começar?', 'Não. Você pode começar do zero. As explicações são em português e a trilha apresenta o idioma passo a passo.'],
  ['Como posso conhecer as aulas?', 'As duas primeiras aulas de cada curso são gratuitas. Você pode experimentar antes de decidir pela assinatura.'],
  ['Quais cursos estão incluídos?', 'A assinatura atual dá acesso aos cursos da Linvuu. Antes de contratar, experimente as duas primeiras aulas de cada curso sem cartão.'],
  ['Quanto tempo preciso reservar?', 'As sessões são organizadas para cerca de 30 minutos. Você pode estudar no seu ritmo e voltar para continuar.'],
];
export default function HomeBrasileiros() {
  // No .com só entram os cursos com aulas explicadas em inglês; a cobertura vem do índice carregado antes de abrir o site.
  const idiomas = idiomasDoSite.filter((i) => cursoComExplicacaoNoSite(i.id));
  // .com: herói e grade só com os cursos explicados em inglês do começo ao fim; os parciais vão para a faixa
  // «In translation» com a contagem real (lote I1 — o herói não oferece o que a nota de baixo cancela).
  const ehCom = LOCALE.codigo !== 'pt-BR';
  const completo = (id: string) => { const c = coberturaNoSite(id); return c.total > 0 && c.traduzidas >= c.total; };
  const principais = ehCom ? idiomas.filter((i) => completo(i.id)) : idiomas;
  const emTraducao = ehCom ? idiomas.filter((i) => !completo(i.id)) : [];
  usePageTitle(h(HOME_BR.tituloSeo), h(HOME_BR.descricao));
  const retomada = useRetomadaGeral();
  const [idioma, setIdioma] = useState(principais[0] ?? idiomas[0]);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState('');
  const escolher = (id: string) => { const i = idiomas.find((x) => x.id === id); if (i && !tocando) { setIdioma(i); setErro(''); } };
  // Abas (padrão WAI-ARIA): setas esquerda/direita, Home e End trocam o idioma e levam o foco junto.
  const teclaAba = (e: React.KeyboardEvent) => {
    const n = principais.findIndex((i) => i.id === idioma.id); let alvo = -1;
    if (e.key === 'ArrowRight') alvo = (n + 1) % principais.length; else if (e.key === 'ArrowLeft') alvo = (n - 1 + principais.length) % principais.length;
    else if (e.key === 'Home') alvo = 0; else if (e.key === 'End') alvo = principais.length - 1;
    if (alvo < 0) return; e.preventDefault(); escolher(principais[alvo].id); document.getElementById(`br-aba-${principais[alvo].id}`)?.focus();
  };
  const ouvir = async () => {
    setErro(''); setTocando(true);
    try { await falar(idioma.frase, idioma.lang); }
    catch { setErro(h('Não foi possível tocar o áudio. Tente novamente.')); }
    finally { setTocando(false); }
  };
  return <div className="br-home">
    {retomada && (() => { const r = textoRetomada(retomada.feitos, retomada.total); const livro = LIVROS.find((l) => l.capa === `/livros/${retomada.idioma}-a1-a2-v1-600.webp`)?.link; const apoio = [livro?.startsWith('/livros/') ? { para: livro, texto: `${h('Livro de')} ${retomada.nome}` } : null, IDIOMAS_GRAMATICA.includes(retomada.idioma) ? { para: `/gramatica/${retomada.idioma}`, texto: `${h('Gramática de')} ${retomada.nome}` } : null].filter((x): x is { para: string; texto: string } => !!x); return <section className="br-resume" aria-label={`Continuar ${retomada.nome}`}>
      <img className="br-resume-vuu" src="/assets/vuu/vuu.svg" width="40" height="44" alt="" />
      <div className="br-resume-texto"><p className="br-resume-frase">{h(r.frase)}</p><p className="br-resume-prog">{retomada.nome} · {h(r.contagem)}</p><p className="br-resume-prox">{h('Próxima:')} {h('sessão')} {retomada.dia}{retomada.titulo ? ` · ${retomada.titulo}` : ''}</p></div>
      <HomeCourseLink cta="home_continuar" to={`/curso/${retomada.idioma}/dia/${retomada.dia}`}>{h("Continuar minha sessão")}</HomeCourseLink>{apoio.length > 0 && <p className="br-resume-apoio">{apoio.map((a) => <Link key={a.para} to={a.para}>{a.texto}</Link>)}</p>}</section>; })()}
    <section className="br-hero" aria-labelledby="br-h1">
      <div className="br-hero-in">
        <div className="br-hero-topo">
          <h1 id="br-h1">{h("Idiomas explicados em português,")}<br /><em>{h("com áudio em cada frase.")}</em></h1>
          <p className="br-lead">{h(HOME_BR.lead)}</p>
        </div>
        <div className="br-palco" id="experimente">
          <p className="br-pick" id="br-pick-title">{h("Que idioma você quer aprender?")}</p>
          <div className="br-abas" role="tablist" aria-labelledby="br-pick-title" onKeyDown={teclaAba}>
            {principais.map((i) => <button key={i.id} type="button" role="tab" id={`br-aba-${i.id}`} aria-selected={i.id === idioma.id} aria-controls="br-frase" tabIndex={i.id === idioma.id ? 0 : -1} onClick={() => escolher(i.id)}>{h(i.nome)}</button>)}
          </div>
          <div className="br-frase-painel" id="br-frase" role="tabpanel" aria-labelledby={`br-aba-${idioma.id}`}>
            <p className="br-frase" lang={idioma.lang} key={idioma.id}>{idioma.frase.split(' ').map((p, n) => <Fragment key={n}>{n > 0 && ' '}<span style={{ ['--n' as string]: n }}>{p}</span></Fragment>)}</p>
            <p className="br-nota">{h("Olá. Um café, por favor.")}</p>
            <div className="br-som">
              <button type="button" onClick={ouvir} disabled={tocando} aria-label={`${h('Ouvir frase em')} ${h(idioma.nome)}`}><span aria-hidden="true">{tocando ? '…' : '▶'}</span></button>
              <div className={tocando ? 'br-wave playing' : 'br-wave'} aria-hidden="true">{Array.from({ length: 28 }, (_, n) => <i key={n} style={{ height: `${10 + (n * 17 % 34)}px`, animationDelay: `${n * 45}ms` }} />)}</div>
              <span className="br-som-dica">{tocando ? h('Ouvindo…') : h('Ouça. Repita.')}</span>
            </div>
            <p role="status" className="br-error">{erro}</p>
            <img className="br-vuu-ouve" src="/assets/vuu/vuu.svg" width="120" height="132" alt="" />
          </div>
          <div className="br-cta-linha">
            <HomeCourseLink cta="home_comecar" to={`/curso/${idioma.id}/dia/1`} className="br-cta">{LOCALE.codigo === 'pt-BR' ? `Começar a aula grátis de ${idioma.nome.toLowerCase()}` : `Start the free ${h(idioma.nome)} lesson`}</HomeCourseLink>
            <HomeCourseLink cta="home_curso" to={`/curso/${idioma.id}`} className="br-cta-sec">{h('Ver o curso completo')}</HomeCourseLink>
          </div>
          <p className="br-fine">{h("As duas primeiras aulas são grátis, sem cartão.")}</p>
          {LOCALE.codigo === 'pt-BR' && <p className="br-fine"><a href="https://www.udemy.com/course/curso-de-russo-a1-ate-a2/" target="_blank" rel="noopener noreferrer">Curso de russo na Udemy: nota 4,7 de 5 em 72 avaliações, 285 alunos</a></p>}
          {LOCALE.codigo !== 'pt-BR' && <p className="br-fine"><a href="https://www.udemy.com/course/curso-de-russo-a1-ate-a2/" target="_blank" rel="noopener noreferrer" hrefLang="pt-BR">The authors’ Russian course on Udemy (taught in Portuguese): rated 4.7 out of 5 by 72 students</a></p>}
          {LOCALE.codigo !== 'pt-BR' && <p className="br-fine">{homeNotice}</p>}
        </div>
      </div>
    </section>
    <div className="br-benefits"><span><strong>{h("Em português.")}</strong>{h(" Desde a explicação.")}</span><span><strong>{h("Com áudio.")}</strong>{h(" Para ouvir e repetir.")}</span><span><strong>{h("No seu ritmo.")}</strong>{h(" Uma sessão por vez.")}</span></div>
    <section className="br-section br-why" id="por-que-online" aria-labelledby="br-why-title">
      <div className="br-section-head"><div><h2 id="br-why-title">{h("Por que aprender com a Linvuu?")}</h2></div></div>
      <div className="br-why-grid">
        <article><h3>{h("Feito por professores.")}</h3><p>{h("Cada curso é escrito e revisado por professores de idiomas.")}</p></article>
        <article><h3>{h("Baseado em livros de referência.")}</h3><p>{h("Livros didáticos e gramáticas de cada idioma, explicados em português.")}</p></article>
        <article><h3>{h("Você ouve e pratica.")}</h3><p>{h("Áudio em cada frase e exercícios com correção.")}</p></article>
        <article><h3>{h("Aula ao vivo, se quiser.")}</h3><p>{h("Aulas de russo por videochamada com professores.")}</p><Link className="br-text-link" to="/russo-online">{h("Ver aulas ao vivo")}</Link></article>
      </div>
    </section>
    <section className="br-section" id="metodo"><div className="br-section-head"><div><h2>{h("Entender muda")}<br />{h("o jeito de aprender.")}</h2></div><p>{h("Você traz o português. A Linvuu usa essa base para explicar os sons, as estruturas e os erros comuns no novo idioma.")}</p></div>
      <div className="br-method">{[
        ['01', 'Ouça o idioma acontecer.', 'Palavras e diálogos com áudio para ligar o que você lê ao que você escuta.', '◉', '/fotos/comece.jpg'],
        ['02', 'Entenda o porquê.', 'Explicações em português, exemplos e comparações para construir uma base.', 'Aa', '/fotos/imersao.jpg'],
        ['03', 'Coloque em prática.', 'Exercícios com correção e atividades de fala e escrita para usar o que aprendeu.', '↗', '/fotos/pratica.jpg'],
      ].map(([n, titulo, texto, , foto]) => <article key={n}><img className="br-method-foto" src={foto} alt="" width="1000" height="600" loading="lazy" decoding="async" /><h3>{h(titulo)}</h3><p>{h(texto)}</p></article>)}</div>
    </section>
    <section className="br-section" id="idiomas"><span id="cursos" /><div className="br-section-head"><div><h2>{h("Qual idioma você")}<br />{h("quer aprender hoje?")}</h2></div><p>{h("Para viajar, se aproximar de outras culturas ou realizar um objetivo seu. Encontre um idioma para começar.")}</p></div><div className="br-languages">{principais.map((i, n) => <HomeCourseLink cta="home_curso" key={i.id} to={`/curso/${i.id}`} className={`br-language br-language-${n}`}><span className="br-greeting" lang={i.lang}>{i.oi}<span aria-hidden="true">.</span></span><div><h3>{h(i.nome)}</h3><span aria-hidden="true">↗</span></div><p>{h(i.detalhe)}</p></HomeCourseLink>)}</div>{emTraducao.length > 0 && <div className="br-traducao"><p>The English explanations for these courses are being written lesson by lesson. You can already start with the lessons that are ready:</p><ul>{emTraducao.map((i) => { const c = coberturaNoSite(i.id); return <li key={i.id}><HomeCourseLink cta="home_curso" to={`/curso/${i.id}`}>{h(i.nome)}</HomeCourseLink><span>{c.traduzidas} of {c.total} lessons in English</span></li>; })}</ul></div>}</section>
    {/* Os livros só existem em português (/livros no .com redireciona ao .com.br): no .com a seção prometia o que o visitante não lê. */}
    {LOCALE.codigo === 'pt-BR' && (
    <section className="br-book"><div className="br-book-covers">{['en', 'de', 'ru'].filter(id => id !== LOCALE.cursoOculto && cursoComExplicacaoNoSite(id)).map(id => <img key={id} src={`/livros/${id}-a1-a2-v1-600.webp`} width="600" height="800" alt={LOCALE.codigo === 'pt-BR' ? `Capa do livro de ${(getCurso(id)?.nome ?? id).toLowerCase()} A1–A2, Coleção Linvuu` : `Cover of the ${getCurso(id)?.nome ?? id} A1–A2 book, Linvuu Collection`} loading="lazy" decoding="async" />)}</div><div><h2>{h("Seu aprendizado")}<br />{h("também tem páginas.")}</h2><p>{h("Explore os livros da Linvuu, leia com calma e volte aos assuntos que merecem mais atenção.")}</p><p>{h('Livros A1–A2 em seis idiomas. Leia os dois primeiros capítulos grátis, com áudio.')}</p><p>{h(LIVROS_EM_PRODUCAO)}</p><Link className="br-text-link" to="/livros">{h("Conhecer a coleção")}</Link><div className="br-book-links"><HomeCourseLink to="/livros/de">{h("Livro de alemão")}</HomeCourseLink><HomeCourseLink to="/livros/es">{h("Livro de espanhol")}</HomeCourseLink></div></div></section>
    )}
    <OfertaAtual />
    <div className="br-section br-avaliacoes"><Avaliacoes /></div>
    <section className="br-section br-faq" id="faq"><div><h2>{h("Uma dúvida")}<br />{h("antes do primeiro passo?")}</h2><Link to="/contato" className="br-text-link">{h("Fale com a Linvuu")}</Link></div><div>{perguntas.map(([p,r]) => <details key={p}><summary>{h(p)}</summary><p>{h(r)}</p></details>)}</div></section>
    <section className="br-last"><h2>{h("Abra espaço para")}<br /><em>{h("novas conversas.")}</em></h2><a href="#idiomas" className="br-button" data-cta="home_escolher_idioma">{h('Escolher meu idioma')} <span aria-hidden="true">↑</span></a><p>{h("Conheça a proposta. Explore os idiomas. Experimente uma aula.")}</p></section>
  </div>;
}
