import { perguntasHome as perguntas } from '../lib/perguntasHome';
import { HomeCourseLink } from '../components/HomeCourseLink';
import { CursoCard, LivroDoCurso } from '../components/CursoCard';
import { homeText as h } from '../i18n/home';
import { LOCALE } from '../i18n';
import { useState } from 'react';
import { OfertaAtual } from '../components/OfertaAtual';
import { HOME_BR } from '../config/oferta-publica';
import { Link } from 'react-router-dom';
import { falar } from '../lib/audio';
import { usePageTitle } from '../lib/usePageTitle';
import { CURSOS_ATIVOS, cursoComExplicacaoNoSite, coberturaNoSite } from '../lib/content';
import { CreditoVitrine } from '../components/CreditoVitrine';

// Catálogo da home, na mesma ordem nos dois domínios: no .com o português (br) ocupa o lugar do inglês.
const CATALOGO = { 'pt-BR': ['en', 'es', 'de', 'fr', 'it', 'ru'], en: ['br', 'es', 'de', 'fr', 'ru'] } as const;
import './home-brasileiros.css';
import { Avaliacoes } from '../components/Avaliacoes';

const TODOS = [
  { id: 'en', nome: 'Inglês', oi: 'Hello', frase: 'Hello. A coffee, please.', lang: 'en' },
  { id: 'es', nome: 'Espanhol', oi: 'Hola', frase: 'Hola. Un café, por favor.', lang: 'es' },
  { id: 'fr', nome: 'Francês', oi: 'Bonjour', frase: 'Bonjour. Un café, s’il vous plaît.', lang: 'fr' },
  { id: 'it', nome: 'Italiano', oi: 'Ciao', frase: 'Buongiorno. Un caffè, per favore.', lang: 'it' },
  { id: 'de', nome: 'Alemão', oi: 'Hallo', frase: 'Guten Tag. Einen Kaffee, bitte.', lang: 'de' },
  { id: 'br', nome: 'Português do Brasil', oi: 'Olá', frase: 'Oi, bom dia. Um café, por favor.', lang: 'pt-BR' },
  { id: 'ru', nome: 'Russo', oi: 'Привет', frase: 'Здравствуйте. Мне кофе, пожалуйста.', lang: 'ru' },
];
// Cada público vê os cursos que não são a sua própria língua (em /en some o inglês; em / some o português para estrangeiros).
const idiomasDoSite = TODOS.filter((i) => i.id !== LOCALE.cursoOculto);

export default function HomeBrasileiros() {
  // No .com só entram os cursos com aulas explicadas em inglês; a cobertura vem do índice carregado antes de abrir o site.
  const idiomas = idiomasDoSite.filter((i) => cursoComExplicacaoNoSite(i.id));
  // .com: herói e grade só com os cursos explicados em inglês do começo ao fim; os parciais vão para a faixa
  // «In translation» com a contagem real (lote I1 — o herói não oferece o que a nota de baixo cancela).
  const ehCom = LOCALE.codigo !== 'pt-BR';
  const completo = (id: string) => { const c = coberturaNoSite(id); return c.total > 0 && c.traduzidas >= c.total; };
  const principais = ehCom ? idiomas.filter((i) => completo(i.id)) : idiomas;
  const catalogo = CATALOGO[LOCALE.codigo].map((id) => CURSOS_ATIVOS.find((c) => c.id === id)).filter((c): c is (typeof CURSOS_ATIVOS)[number] => !!c && cursoComExplicacaoNoSite(c.id));
  usePageTitle(h(HOME_BR.tituloSeo), h(HOME_BR.descricao));
  const totalAulas = principais.reduce((n, i) => n + coberturaNoSite(i.id).total, 0);
  const [idioma, setIdioma] = useState(principais[0] ?? idiomas[0]);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState('');
  const escolher = (id: string) => { const i = idiomas.find((x) => x.id === id); if (i && !tocando) { setIdioma(i); setErro(''); } };
  // Abas (padrão WAI-ARIA): setas esquerda/direita, Home e End trocam o idioma e levam o foco junto.
  const teclaAba = (e: React.KeyboardEvent) => {
    const n = principais.findIndex((i) => i.id === idioma.id); let alvo = -1;
    if (e.key === 'ArrowRight') alvo = (n + 1) % principais.length; else if (e.key === 'ArrowLeft') alvo = (n - 1 + principais.length) % principais.length;
    else if (e.key === 'Home') alvo = 0; else if (e.key === 'End') alvo = principais.length - 1;
    if (alvo < 0 || tocando || principais.length === 0) return; e.preventDefault(); escolher(principais[alvo].id); document.getElementById(`br-aba-${principais[alvo].id}`)?.focus();
  };
  const ouvir = async () => {
    setErro(''); setTocando(true);
    try { await falar(idioma.frase, idioma.lang); }
    catch { setErro(h('Não foi possível tocar o áudio. Tente novamente.')); }
    finally { setTocando(false); }
  };
  // Mesmo esqueleto e desenho nos dois domínios (Felipe, 19/11/2026: o .com espelha o .com.br); muda só a língua.
  return <div className="br-home br-home-leve">
    <CreditoVitrine />
    <section className="br-hero" aria-labelledby="br-h1">
      <div className="br-hero-in">
        <div className="br-hero-topo br-hero-topo-simples">
          <h1 id="br-h1">{h("Idiomas explicados em português,")}<br /><em>{h("como um bom professor explicaria.")}</em></h1>
          <p className="br-hero-sub">{h("Cada regra vem com o porquê. Cada frase vem com áudio. Você entende o que diz, em vez de decorar.")}</p>
          <div className="br-hero-acoes">
            <HomeCourseLink cta="home_comecar" to={`/curso/${idioma.id}`} className="br-hero-cta">{h("Começar grátis")} · {h(idioma.nome)} <span aria-hidden="true">→</span></HomeCourseLink>
            <a className="br-hero-link" href="#idiomas">{h("Ver todos os cursos")}</a>
          </div>
          <p className="br-hero-fino">{h("As 2 primeiras aulas são grátis. Sem cartão.")}</p>
          <dl className="br-metricas">
            <div><dt>{h("idiomas")}</dt><dd>{principais.length}</dd></div>
            <div><dt>{h("aulas")}</dt><dd>{totalAulas}</dd></div>
            <div><dt>{h("aulas grátis por curso")}</dt><dd>2</dd></div>
            <div><dt>{h("em cada frase")}</dt><dd>{h("Áudio")}</dd></div>
          </dl>
        </div>
        <div className="br-palco" id="experimente">
          <p className="br-pick" id="br-pick-title">{h("Qual idioma você quer aprender?")}</p>
          <div className="br-abas" role="tablist" aria-labelledby="br-pick-title" onKeyDown={teclaAba}>
            {principais.map((i) => <button key={i.id} type="button" role="tab" id={`br-aba-${i.id}`} aria-selected={i.id === idioma.id} aria-controls="br-frase" tabIndex={i.id === idioma.id ? 0 : -1} onClick={() => escolher(i.id)}>{h(i.nome)}</button>)}
          </div>
          <div className="br-frase-painel" id="br-frase" role="tabpanel" aria-labelledby={`br-aba-${idioma.id}`}>
            <p className="br-frase" lang={idioma.lang} key={idioma.id}>{idioma.frase}</p>
            <p className="br-nota">{h("Olá. Um café, por favor.")}</p>
            <div className="br-som">
              <button className="br-ouvir" type="button" onClick={ouvir} disabled={tocando} aria-label={tocando ? undefined : `${h("Ouça aqui e repita em")} ${h(idioma.nome)}`}><span aria-hidden="true">▶</span> {tocando ? h("Ouvindo…") : h("Ouça aqui e repita")}</button>
            </div>
            <p role="status" className="br-error">{erro}</p>
          </div>
        </div>
      </div>
    </section>
    <section className="br-section br-why br-motion-item" id="por-que-online" aria-labelledby="br-why-title">
      <div className="br-section-head"><div><h2 id="br-why-title">{h("O que um aplicativo não explica,")}<br />{h("a Linvuu explica.")}</h2></div><p>{h("Repetir frases sem saber por que elas são assim cansa e não fixa. Aqui, cada estrutura nova chega explicada, ouvida e praticada.")}</p></div>
      <div className="br-why-grid">
        <article data-tom="vermelho"><h3>{h("Escrito por professores.")}</h3><p>{h("Cada aula é escrita e revisada por quem ensina o idioma há anos, em linguagem clara.")}</p></article>
        <article data-tom="ocre"><h3>{h("Baseado em livros de referência.")}</h3><p>{h("A gramática segue os livros didáticos de cada idioma, explicada em português.")}</p></article>
        <article data-tom="verde"><h3>{h("Você ouve, entende e pratica.")}</h3><p>{h("Áudio em cada frase e exercícios com correção na hora.")}</p></article>
        <article data-tom="vermelho"><h3>{h("Aula ao vivo, se quiser.")}</h3><p>{h("Aulas de russo por videochamada com professores.")}</p><Link className="br-text-link" to="/russo-online">{h("Ver aulas ao vivo")}</Link></article>
      </div>
      <div className="br-why-acao">
        <HomeCourseLink cta="home_comecar" to={`/curso/${idioma.id}`} className="br-why-cta">{h("Fazer a primeira aula de")} {ehCom ? h(idioma.nome) : idioma.nome.toLowerCase()} <span aria-hidden="true">→</span></HomeCourseLink>
        <span>{h("Grátis, sem cartão, no seu ritmo.")}</span>
      </div>
    </section>
    <section className="br-section br-motion-item" id="idiomas" aria-labelledby="titulo-livros"><span id="cursos" /><div className="br-section-head"><div><h2 id="titulo-livros">{ehCom ? 'Choose your language.' : 'Escolha seu idioma.'}</h2></div><p>{ehCom ? 'Courses include audio and exercises. The first 2 lessons are free.' : 'Os cursos incluem áudio e exercícios. As 2 primeiras aulas são grátis.'}</p></div><div className="site-publico site-catalogo"><div className="curso-grid">{catalogo.map((c) => <div className="catalogo-idioma" key={c.id}><CursoCard curso={c} nivel={3} catalogoRascunho /><LivroDoCurso curso={c} /></div>)}</div></div></section>
    <section className="br-book"><div><h2>{ehCom ? 'Your learning has pages, too.' : 'Seu aprendizado também tem páginas.'}</h2><p>{ehCom ? 'Read Linvuu’s Brazilian Portuguese grammar calmly and come back to the topics that deserve more attention.' : 'Explore os livros da Linvuu, leia com calma e volte aos assuntos que merecem mais atenção.'}</p></div><Link className="br-text-link" to="/livros">{ehCom ? 'See the book' : 'Conhecer a coleção'} <span aria-hidden="true">→</span></Link></section>
    <OfertaAtual />
    <div className="br-section br-avaliacoes br-motion-item"><Avaliacoes vitrine /></div>
    <section className="br-section br-faq br-motion-item" id="faq"><div><h2>{h("Uma dúvida")}<br />{h("antes do primeiro passo?")}</h2><Link to="/contato" className="br-text-link">{h("Fale com a Linvuu")}</Link></div><div>{perguntas.map(([p,r]) => <details key={p}><summary>{h(p)}</summary><p>{h(r)}</p></details>)}</div></section>
  </div>;
}
