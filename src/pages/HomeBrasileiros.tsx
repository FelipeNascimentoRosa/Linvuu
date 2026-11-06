import { HomeCourseLink } from '../components/HomeCourseLink';
import { homeText as h, homeNotice } from '../i18n/home';
import { LOCALE } from '../i18n';
import { useState } from 'react';
import { OfertaAtual } from '../components/OfertaAtual';
import { HOME_BR } from '../config/oferta-publica';
import { LIVROS_EM_PRODUCAO } from '../lib/livros';
import { Link } from 'react-router-dom';
import { falar } from '../lib/audio';
import { usePageTitle } from '../lib/usePageTitle';
import { useRetomadaGeral } from '../lib/retomar';
import { textoRetomada } from '../lib/mensagemRetomada';
import { LIVROS } from '../config/livros';
import { IDIOMAS_GRAMATICA } from '../lib/content';
import './home-brasileiros.css';

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
const idiomas = TODOS.filter((i) => i.id !== LOCALE.cursoOculto);
const perguntas = [
  ['Preciso saber alguma coisa para começar?', 'Não. Você pode começar do zero. As explicações são em português e a trilha apresenta o idioma passo a passo.'],
  ['Como posso conhecer as aulas?', 'As duas primeiras aulas de cada curso são gratuitas. Você pode experimentar antes de decidir pela assinatura.'],
  ['Quais cursos estão incluídos?', 'A assinatura atual dá acesso aos cursos da Linvuu. Antes de contratar, experimente as duas primeiras aulas de cada curso sem cartão.'],
  ['Quanto tempo preciso reservar?', 'As sessões são organizadas para cerca de 30 minutos. Você pode estudar no seu ritmo e voltar para continuar.'],
];
export default function HomeBrasileiros() {
  usePageTitle(h(HOME_BR.tituloSeo), h(HOME_BR.descricao));
  const retomada = useRetomadaGeral();
  const [idioma, setIdioma] = useState(idiomas[0]);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState('');
  const ouvir = async () => {
    setErro(''); setTocando(true);
    try { await falar(idioma.frase, idioma.lang); }
    catch { setErro(h('Não foi possível tocar o áudio. Tente novamente.')); }
    finally { setTocando(false); }
  };
  return <div className="br-home">
    {retomada && (() => { const r = textoRetomada(retomada.feitos, retomada.total); const livro = LIVROS.find((l) => l.capa === `/livros/${retomada.idioma}-a1-a2-v1-600.webp`)?.link; const apoio = [livro?.startsWith('/livros/') ? { para: livro, texto: `${h('Livro de')} ${retomada.nome}` } : null, IDIOMAS_GRAMATICA.includes(retomada.idioma) ? { para: `/gramatica/${retomada.idioma}`, texto: `${h('Gramática de')} ${retomada.nome}` } : null].filter((x): x is { para: string; texto: string } => !!x); return <section className="br-resume" aria-label={`Continuar ${retomada.nome}`}>
      <img className="br-resume-vuu" src="/assets/vuu/vuu-feliz-2d.svg" width="44" height="50" alt="" />
      <div className="br-resume-texto"><p className="br-resume-frase">{h(r.frase)}</p><p className="br-resume-prog">{retomada.nome} · {h(r.contagem)}</p><p className="br-resume-prox">{h('Próxima:')} {h('sessão')} {retomada.dia}{retomada.titulo ? ` · ${retomada.titulo}` : ''}</p></div>
      <HomeCourseLink to={`/curso/${retomada.idioma}/dia/${retomada.dia}`}>{h("Continuar minha sessão →")}</HomeCourseLink>{apoio.length > 0 && <p className="br-resume-apoio">{apoio.map((a) => <Link key={a.para} to={a.para}>{a.texto}</Link>)}</p>}</section>; })()}
    <section className="br-hero">
      <div className="br-hero-copy"><p className="br-eyebrow">{h("CURSOS DE IDIOMAS ONLINE")}</p>
        <h1>{h("Aprenda idiomas online,")}<br /><em>{h("explicados em português.")}</em></h1>
        <p className="br-lead">{h(HOME_BR.lead)}</p>
        <p className="br-pick" id="br-pick-title">{h("Que idioma você quer aprender?")}</p>
        <nav className="br-pick-list" aria-labelledby="br-pick-title">{idiomas.map((i) => <HomeCourseLink key={i.id} to={`/curso/${i.id}`} className="br-pick-btn">{h(i.nome)}</HomeCourseLink>)}</nav>
        <div className="br-actions"><a className="br-text-link" href="#experimente">{h("Experimentar o método ↓")}</a></div>
        <p className="br-fine">{h("2 primeiras aulas grátis · Sem cartão para experimentar")}</p>
      {LOCALE.codigo !== 'pt-BR' && <p className="br-fine">{homeNotice}</p>}
      </div>
      <div className="br-scene" id="experimente">
        <span className="br-orbit br-orbit-one" aria-hidden="true">{h("Olá, mundo.")}</span><span className="br-orbit br-orbit-two" aria-hidden="true">{h("Um novo começo ↗")}</span>
        <div className="br-demo"><div className="br-demo-top"><img className="br-vuu" src="/assets/vuu/vuu-feliz-2d.svg" width="48" height="48" alt="" /><span>{h("VUU · UM GOSTINHO DO SEU PRÓXIMO IDIOMA")}</span></div>
          <label htmlFor="br-idioma">{h("Quero ouvir em")}</label><select id="br-idioma" value={idioma.id} disabled={tocando} onChange={e => {setIdioma(idiomas.find(i => i.id === e.target.value)!); setErro('');}}>{idiomas.map(i => <option key={i.id} value={i.id}>{h(i.nome)}</option>)}</select>
          <span className="br-demo-context">{h("NO CAFÉ")}</span><p className="br-phrase" lang={idioma.lang}>{idioma.frase}</p><p className="br-translation">{h("Olá. Um café, por favor.")}</p>
          <div className="br-sound"><button type="button" onClick={ouvir} disabled={tocando} aria-label={`${h('Ouvir frase em')} ${h(idioma.nome)}`}><span aria-hidden="true">{tocando ? '…' : '▶'}</span></button><div className={tocando ? 'br-wave playing' : 'br-wave'} aria-hidden="true">{Array.from({length: 23}, (_, i) => <i key={i} style={{height: `${12 + (i * 17 % 35)}px`, animationDelay: `${i * 45}ms`}} />)}</div><span>{tocando ? h('Ouvindo…') : h('Ouça. Repita.')}</span></div>
          <p role="status" className="br-error">{erro}</p><div className="br-demo-foot"><span>{h("Pequenas frases. Novas possibilidades.")}</span><HomeCourseLink to={`/curso/${idioma.id}/dia/1`}>{h('Começar a primeira sessão em')} {h(idioma.nome)} <span aria-hidden="true">→</span></HomeCourseLink></div>
        </div>
      </div>
    </section>
    <div className="br-benefits"><span><strong>{h("Em português.")}</strong>{h(" Desde a explicação.")}</span><span><strong>{h("Com áudio.")}</strong>{h(" Para ouvir e repetir.")}</span><span><strong>{h("No seu ritmo.")}</strong>{h(" Uma sessão por vez.")}</span></div>
    <section className="br-section br-why" id="por-que-online" aria-labelledby="br-why-title">
      <div className="br-section-head"><div><p className="br-eyebrow">{h("CURSOS ONLINE, FEITOS POR PROFESSORES")}</p><h2 id="br-why-title">{h("Por que aprender com a Linvuu?")}</h2></div></div>
      <div className="br-why-grid">
        <article><h3>{h("Feito por professores.")}</h3><p>{h("Professores de idiomas, entre eles um vencedor da Olimpíada Internacional Online de Russo da Universidade de São Petersburgo.")}</p><Link className="br-text-link" to="/sobre">{h("Conhecer os professores →")}</Link></article>
        <article><h3>{h("Baseado em livros de referência.")}</h3><p>{h("Livros didáticos e gramáticas de cada idioma, explicados em português.")}</p></article>
        <article><h3>{h("Você ouve e pratica.")}</h3><p>{h("Áudio em cada frase e exercícios com correção.")}</p></article>
        {LOCALE.codigo !== 'es' && <article><h3>{h("Aula ao vivo, se quiser.")}</h3><p>{h("Aulas de russo por videochamada com professores.")}</p><Link className="br-text-link" to="/russo-online">{h("Ver aulas ao vivo →")}</Link></article>}
      </div>
    </section>
    <section className="br-section br-vuu-section" aria-labelledby="br-vuu-title">
      <div className="br-vuu-portrait"><img src="/assets/vuu/vuu-feliz-2d.svg" alt="" width="220" height="249" loading="lazy" /><span>VUU / LINVUU</span></div>
      <div><p className="br-eyebrow">{h('CONHEÇA O VUU')}</p><h2 id="br-vuu-title">{h('Uma língua fica mais próxima quando faz sentido.')}</h2>
        <p>{h('Vuu acompanha a curiosidade que move a Linvuu: entender o que as palavras fazem, ouvir como soam e usar o idioma em situações reais.')}</p>
        <p>{h('Comece com uma explicação em português e pratique no seu ritmo.')}</p>
        <HomeCourseLink to="/curso/de" className="br-text-link">{h('Conhecer o curso de alemão →')}</HomeCourseLink>
      </div>
    </section>
    <section className="br-section" id="metodo"><div className="br-section-head"><div><p className="br-eyebrow">{h("MENOS ADIVINHAÇÃO. MAIS COMPREENSÃO.")}</p><h2>{h("Entender muda")}<br />{h("o jeito de aprender.")}</h2></div><p>{h("Você traz o português. A Linvuu usa essa base para explicar os sons, as estruturas e os erros comuns no novo idioma.")}</p></div>
      <div className="br-method">{[
        ['01', 'Ouça o idioma acontecer.', 'Palavras e diálogos com áudio para ligar o que você lê ao que você escuta.', '◉', '/fotos/comece.jpg'],
        ['02', 'Entenda o porquê.', 'Explicações em português, exemplos e comparações para construir uma base.', 'Aa', '/fotos/imersao.jpg'],
        ['03', 'Coloque em prática.', 'Exercícios com correção e atividades de fala e escrita para usar o que aprendeu.', '↗', '/fotos/pratica.jpg'],
      ].map(([n, titulo, texto, icon, foto]) => <article key={n}><img className="br-method-foto" src={foto} alt="" width="1000" height="600" loading="lazy" decoding="async" /><div className="br-method-top"><span>{n}</span><b aria-hidden="true">{icon}</b></div><h3>{h(titulo)}</h3><p>{h(texto)}</p></article>)}</div>
    </section>
    <section className="br-section" id="idiomas"><span id="cursos" /><div className="br-section-head"><div><p className="br-eyebrow">{h("ESCOLHA UM CURSO ONLINE")}</p><h2>{h("Qual idioma você")}<br />{h("quer aprender hoje?")}</h2></div><p>{h("Para viajar, se aproximar de outras culturas ou realizar um objetivo seu. Encontre um idioma para começar.")}</p></div><div className="br-languages">{idiomas.map((i, n) => <HomeCourseLink key={i.id} to={`/curso/${i.id}`} className={`br-language br-language-${n}`}><span className="br-greeting" lang={i.lang}>{i.oi}<span aria-hidden="true">.</span></span><div><h3>{h(i.nome)}</h3><span aria-hidden="true">↗</span></div><p>{h(i.detalhe)}</p></HomeCourseLink>)}</div></section>
    <section className="br-book"><div className="br-book-covers" aria-hidden="true">{['en', 'de', 'ru'].filter(id => id !== LOCALE.cursoOculto).map(id => <img key={id} src={`/livros/${id}-a1-a2-v1-600.webp`} width="600" height="800" alt="" loading="lazy" decoding="async" />)}</div><div><p className="br-eyebrow">{h("PARA QUEM GOSTA DE IR ALÉM")}</p><h2>{h("Seu aprendizado")}<br />{h("também tem páginas.")}</h2><p>{h("Explore os livros da Linvuu, leia com calma e volte aos assuntos que merecem mais atenção.")}</p><p>{h('Livros A1–A2 em seis idiomas. Leia os dois primeiros capítulos grátis, com áudio.')}</p><p>{h(LIVROS_EM_PRODUCAO)}</p><Link className="br-text-link" to="/livros">{h("Conhecer a coleção →")}</Link><div className="br-book-links"><HomeCourseLink to="/livros/de">{h("Livro de alemão →")}</HomeCourseLink><HomeCourseLink to="/livros/es">{h("Livro de espanhol →")}</HomeCourseLink></div></div></section>
    <OfertaAtual />
    <section className="br-section br-faq" id="faq"><div><p className="br-eyebrow">{h("VAMOS COMEÇAR BEM")}</p><h2>{h("Uma dúvida")}<br />{h("antes do primeiro passo?")}</h2><Link to="/contato" className="br-text-link">{h("Fale com a Linvuu →")}</Link></div><div>{perguntas.map(([p,r]) => <details key={p}><summary>{h(p)}</summary><p>{h(r)}</p></details>)}</div></section>
    <section className="br-last"><p className="br-eyebrow">{h("SEU PRÓXIMO IDIOMA COMEÇA COM UM PASSO")}</p><h2>{h("Abra espaço para")}<br /><em>{h("novas conversas.")}</em></h2><a href="#idiomas" className="br-button">{h('Escolher meu idioma')} <span aria-hidden="true">↑</span></a><p>{h("Conheça a proposta. Explore os idiomas. Experimente uma aula.")}</p></section>
  </div>;
}
