import { Autoria } from '../components/Autoria';
import { Fragment, useEffect, useState, type ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../livros.css';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { falar, falarLista, parar } from '../lib/audio';
import { carregarCapitulo, carregarSumario, capitulosDeAmostra } from '../lib/livrosCliente';
import {
  AUTORES, CAPITULOS_GRATIS, LIVROS_DESCRICAO, LIVROS_EM_PRODUCAO, caminhoCapitulo, caminhoLivro, ehTabelaDeFrases, livroDoSite, livrosDoSite, minutosDeLeitura, plano, sumarioDe, tituloLivro, trechos,
  type BlocoLivro, type CapituloLivro, type ItemSumario, type MetaLivro,
} from '../lib/livros';
import NaoEncontrada from './NaoEncontrada';
import { APRESENTACOES_LIVRO } from '../lib/apresentacoes';

const capaDe = (id: string) => `/livros/${id}-a1-a2-v1-600.webp`;

// Textos da interface dos livros nas duas línguas do site. O conteúdo do livro (capítulos) não passa por aqui:
// no .com.br os livros são escritos em português; no .com, em inglês (hoje só o de português para quem fala inglês).
const TX = {
  'pt-BR': {
    e: ' e ', capa: (n: string) => `Capa do livro de ${n}, Coleção Linvuu`,
    indiceT: 'Coleção Linvuu: livros de gramática', indiceD: LIVROS_DESCRICAO, indiceH1: 'Gramática prática para quem fala português',
    indiceLead: (a: string) => `Cada capítulo parte de dificuldades de quem fala português e apresenta exemplos para entender como a outra língua funciona. Escritos por ${a}.`,
    producao: LIVROS_EM_PRODUCAO as string | null,
    paraQuemT: 'Para quem são as gramáticas práticas da Linvuu?',
    paraQuem: 'Os livros são feitos para quem fala português e quer entender a gramática de outro idioma com explicações, exemplos e comparações. A coleção apresenta conteúdos do início ao nível A2. Os dois primeiros capítulos de cada livro estão disponíveis gratuitamente para leitura, com áudio.',
    cartao: 'Níveis A1–A2 · leia os capítulos 1 e 2 grátis', quemEscreve: 'Quem escreve os livros da Linvuu',
    trilha: 'Você está em', livros: 'Livros', titulo: (n: string) => `${n}: gramática prática, do zero ao A2`, volume: 'Coleção Linvuu, volume 1 (A1–A2)',
    por: (a: string) => `Por ${a}.`, sobreAutores: 'Sobre os autores', lerCap1: 'Ler o capítulo 1 grátis', estudar: (n: string) => `Estudar o curso de ${n.toLowerCase()}`,
    sumario: 'Sumário', sumarioSub: 'Os capítulos 1 e 2 estão abertos para leitura, com áudio. O livro inteiro está na plataforma Linvuu, junto das aulas e dos exercícios com correção.',
    carregandoSum: 'Carregando o sumário…', erroSum: 'Não foi possível carregar o sumário. Recarregue a página para tentar novamente.', recarregar: 'Recarregar página',
    gratis: 'grátis', plataforma: 'na plataforma', planos: 'Ver planos da plataforma', ouvir: 'Ouvir', tocando: 'Tocando…', cenaInteira: 'Ouvir a cena inteira',
    fala: (q: string, i: number) => `${q}, fala ${i}`, tabela: 'Tabela (role para o lado se precisar)', meta: /^Meta do capítulo\./, metaRot: 'Meta do capítulo.',
    capTitulo: (n: number, t: string, l: string) => `Capítulo ${n}: ${t} · ${l}`,
    capDesc: (l: string, n: number, t: string) => `${l}, capítulo ${n} do livro de gramática prática da Coleção Linvuu: ${t}. Leitura grátis, com áudio.`,
    carregandoCap: 'Carregando o capítulo…', capitulo: (n: number) => `Capítulo ${n}`,
    capInfo: (l: string, n: number, nivel: string, min: number, a: string) => `${l}, capítulo ${n}${nivel && ` (${nivel})`}. Leitura de cerca de ${min} minutos, por ${a}.`,
    continue: 'Continue na plataforma',
    continueTx: (n: number, total: number) => `Este é o capítulo ${n}${total ? ` de ${total}` : ''}. Na plataforma Linvuu você tem o livro inteiro, as aulas em sessões de 30 minutos, o áudio em cada frase e os exercícios corrigidos na hora. As 2 primeiras aulas de cada curso são grátis.`,
    comecar: (n: string) => `Começar o curso de ${n.toLowerCase()}`, proximo: (n: number) => `Próximo: capítulo ${n}`, verPlanos: 'Ver os planos',
    direitos: (a: string) => `© Linvuu. Texto de ${a}. A leitura é livre; copiar, republicar ou distribuir o conteúdo não é permitido sem autorização. As vozes são sintéticas.`,
    neste: 'Neste capítulo',
  },
  en: {
    e: ' and ', capa: (n: string) => `Cover of the ${n} book, Linvuu Collection`,
    indiceT: 'Linvuu Collection: practical grammar books', indiceD: 'Practical Brazilian Portuguese grammar for English speakers, from zero to A2. Read the first two chapters free, with audio.',
    indiceH1: 'Practical grammar for English speakers',
    indiceLead: (a: string) => `Every chapter starts from what trips up English speakers and gives examples to show how the other language works. Written by ${a}.`,
    producao: null,
    paraQuemT: 'Who are Linvuu’s practical grammars for?',
    paraQuem: 'The books are made for English speakers who want to understand another language’s grammar through explanations, examples and comparisons. The collection goes from the start to level A2. The first two chapters of every book are free to read, with audio.',
    cartao: 'Levels A1–A2 · read chapters 1 and 2 free', quemEscreve: 'Who writes Linvuu’s books',
    trilha: 'You are here', livros: 'Books', titulo: (n: string) => `${n}: practical grammar, from zero to A2`, volume: 'Linvuu Collection, volume 1 (A1–A2)',
    por: (a: string) => `By ${a}.`, sobreAutores: 'About the authors', lerCap1: 'Read chapter 1 free', estudar: (n: string) => `Study the ${n} course`,
    sumario: 'Contents', sumarioSub: 'Chapters 1 and 2 are open to read, with audio. The whole book is on the Linvuu platform, together with the lessons and the corrected exercises.',
    carregandoSum: 'Loading the contents…', erroSum: 'The contents could not be loaded. Reload the page to try again.', recarregar: 'Reload page',
    gratis: 'free', plataforma: 'on the platform', planos: 'See the platform plans', ouvir: 'Listen', tocando: 'Playing…', cenaInteira: 'Listen to the whole scene',
    fala: (q: string, i: number) => `${q}, line ${i}`, tabela: 'Table (scroll sideways if needed)', meta: /^Chapter goal\./, metaRot: 'Chapter goal.',
    capTitulo: (n: number, t: string, l: string) => `Chapter ${n}: ${t} · ${l}`,
    capDesc: (l: string, n: number, t: string) => `${l}, chapter ${n} of the Linvuu Collection practical grammar: ${t}. Free to read, with audio.`,
    carregandoCap: 'Loading the chapter…', capitulo: (n: number) => `Chapter ${n}`,
    capInfo: (l: string, n: number, nivel: string, min: number, a: string) => `${l}, chapter ${n}${nivel && ` (${nivel})`}. About ${min} minutes of reading, by ${a}.`,
    continue: 'Continue on the platform',
    continueTx: (n: number, total: number) => `This is chapter ${n}${total ? ` of ${total}` : ''}. On the Linvuu platform you get the whole book, lessons in 30-minute sessions, audio in every sentence and exercises corrected on the spot. The first 2 lessons of every course are free.`,
    comecar: (n: string) => `Start the ${n} course`, proximo: (n: number) => `Next: chapter ${n}`, verPlanos: 'See the plans',
    direitos: (a: string) => `© Linvuu. Text by ${a}. Reading is free; copying, republishing or distributing the content is not allowed without permission. The voices are synthetic.`,
    neste: 'In this chapter',
  },
} as const;
const tx = () => TX[LOCALE.codigo];
const autoresTexto = () => AUTORES.map((a) => a.nome).join(tx().e);

function Capa({ m, tamanho = 600 }: { m: MetaLivro; tamanho?: 600 | 900 }) {
  return <img className="lvr-capa" src={capaDe(m.id).replace('-600', `-${tamanho}`)} srcSet={`${capaDe(m.id)} 600w, ${capaDe(m.id).replace('-600', '-900')} 900w`} sizes="(max-width: 700px) 60vw, 300px" alt={tx().capa(m.nome)} width={600} height={800} loading="lazy" />;
}

// ------------------------------------------------------------------ /livros
export function LivrosIndice() {
  const t = tx();
  usePageTitle(t.indiceT, t.indiceD, ['pt-BR', 'en']);
  return (
    <div className="pagina lvr">
      <header className="lvr-topo">
        <h1 className="pagina-h1">{t.indiceH1}</h1>
        <p className="lead">{t.indiceLead(autoresTexto())}</p>
        {t.producao && <p>{t.producao}</p>}
      </header>
      <section aria-labelledby="livros-pergunta"><h2 id="livros-pergunta">{t.paraQuemT}</h2><p>{t.paraQuem}</p><Autoria /></section>
      <ul className="lvr-grade">
        {livrosDoSite(LOCALE.codigo).map((m) => (
          <li key={m.id}>
            <Link to={caminhoLivro(m.id)} className="lvr-cartao">
              <Capa m={m} />
              <h2>{m.nome}</h2>
              <p>{t.cartao}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="lvr-rodape"><Link to="/sobre">{t.quemEscreve}</Link></p>
    </div>
  );
}

// ------------------------------------------------------------------ /livros/:id
export function LivroPagina() {
  const { id = '' } = useParams();
  const t = tx();
  const m = livroDoSite(id, LOCALE.codigo);
  const [sumario, setSumario] = useState<ItemSumario[]>([]);
  const [titulos, setTitulos] = useState<Record<number, CapituloLivro>>({});
  const [estadoSumario, setEstadoSumario] = useState<'carregando' | 'pronto' | 'erro'>('carregando');
  usePageTitle(m ? tituloLivro(m) : undefined, m ? m.descricao : undefined, [LOCALE.codigo], !m);
  useEffect(() => {
    if (!m) return;
    let vivo = true;
    setEstadoSumario('carregando');
    setSumario([]);
    setTitulos({});
    carregarSumario(m.id).then((s) => {
      if (vivo) { setSumario(s); setEstadoSumario(s.length ? 'pronto' : 'erro'); }
    }).catch(() => { if (vivo) setEstadoSumario('erro'); });
    Promise.all(capitulosDeAmostra(m.id).map((n) => carregarCapitulo(m.id, n)))
      .then((cs) => { if (vivo) setTitulos(Object.fromEntries(cs.filter(Boolean).map((c) => [c!.n, c!]))); })
      .catch(() => { /* O sumário continua utilizável sem estimativas de leitura. */ });
    return () => { vivo = false; };
  }, [m]);
  if (!m) return <NaoEncontrada />;
  const liberados = new Set<number>(capitulosDeAmostra(m.id));
  return (
    <div className="pagina lvr">
      <nav className="lvr-trilha" aria-label={t.trilha}><Link to="/livros">{t.livros}</Link><span aria-hidden="true"> › </span><span>{m.nome}</span></nav>
      <header className="lvr-livro-topo">
        <Capa m={m} tamanho={900} />
        <div>
          <h1 className="pagina-h1">{t.titulo(m.nome)}</h1>
          <p className="lvr-info">{t.volume}</p>
          <p className="lead">{m.descricao}</p>
          <p className="lvr-autoria">{t.por(autoresTexto())} <Link to="/sobre">{t.sobreAutores}</Link></p>
          <div className="lv-hero-botoes">
            <Link className="btn btn-primary" to={caminhoCapitulo(m.id, CAPITULOS_GRATIS[0])}>{t.lerCap1}</Link>
            <Link className="btn btn-ok" to={`/curso/${m.id}`}>{t.estudar(m.nome)}</Link>
          </div>
        </div>
      </header>
      {LOCALE.codigo === 'pt-BR' && APRESENTACOES_LIVRO[m.id] && <section aria-labelledby="lvr-apresentacao" className="texto-legal">
        <h2 id="lvr-apresentacao" className="pagina-h2">{APRESENTACOES_LIVRO[m.id].titulo}</h2>
        {APRESENTACOES_LIVRO[m.id].paragrafos.map((p) => <p key={p}>{p}</p>)}
      </section>}
      <section aria-labelledby="lvr-sumario">
        <h2 id="lvr-sumario" className="pagina-h2">{t.sumario}</h2>
        <p className="lvr-sub">{t.sumarioSub}</p>
        {estadoSumario === 'carregando' && <p role="status">{t.carregandoSum}</p>}
        {estadoSumario === 'erro' && <div role="alert"><p>{t.erroSum}</p><button type="button" className="btn btn-ghost" onClick={() => window.location.reload()}>{t.recarregar}</button></div>}
        <ol className="lvr-sumario">
          {sumario.map((s) => {
            const aberto = liberados.has(s.n);
            const c = titulos[s.n];
            return (
              <li key={s.n}>
                <span className="lvr-sum-n">{s.n}</span>
                <span className="lvr-sum-t">
                  {aberto ? <Link to={caminhoCapitulo(m.id, s.n)}>{s.titulo}</Link> : s.titulo}
                  {s.nivel && <small> · {s.nivel}</small>}
                </span>
                {aberto ? <span className="lvr-sum-tag lvr-sum-aberto">{c ? `${minutosDeLeitura(c)} min · ` : ''}{t.gratis}</span> : <span className="lvr-sum-tag">{t.plataforma}</span>}
              </li>
            );
          })}
        </ol>
        <p className="lvr-rodape"><Link className="btn btn-ghost" to="/assinatura">{t.planos}</Link></p>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------ elementos do capítulo
function Inline({ s, lang }: { s: string; lang: string }) {
  return <>{trechos(s).map((t, i) => (t.t === 'est' ? <em key={i} className="lvr-est" lang={lang}>{t.v}</em> : t.t === 'ris' ? <del key={i} className="lvr-ris">{t.v}</del> : <Fragment key={i}>{t.v}</Fragment>))}</>;
}

function Ouvir({ texto, voz, rotulo }: { texto: string; voz: string; rotulo: string }) {
  const [tocando, setTocando] = useState(false);
  return (
    <button type="button" className="lvr-ouvir" data-tocando={tocando || undefined} aria-label={`${tx().ouvir}: ${rotulo}`} title={tx().ouvir}
      onClick={async () => { setTocando(true); try { await falar(texto, voz); } finally { setTocando(false); } }}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 0 1 0 7M18.8 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    </button>
  );
}

function Cena({ falas, lang, voz }: { falas: { quem: string; texto: string }[]; lang: string; voz: string }) {
  const [tocando, setTocando] = useState(false);
  return (
    <div className="lvr-cena">
      <button type="button" className="btn btn-ok lvr-cena-btn" disabled={tocando}
        onClick={async () => { setTocando(true); try { await falarLista(falas.map((f) => plano(f.texto)), voz); } finally { setTocando(false); } }}>
        {tocando ? tx().tocando : tx().cenaInteira}
      </button>
      <div className="lvr-falas" lang={lang}>
        {falas.map((f, i) => (
          <p key={i} className="lvr-fala"><strong className="lvr-quem">{f.quem}</strong><span className="lvr-fala-t"><Inline s={f.texto} lang={lang} /></span><Ouvir texto={plano(f.texto)} voz={voz} rotulo={tx().fala(f.quem, i + 1)} /></p>
        ))}
      </div>
    </div>
  );
}

function Tabela({ b, lang, voz, comAudio }: { b: Extract<BlocoLivro, { t: 'tabela' }>; lang: string; voz: string; comAudio: boolean }) {
  return (
    <div className="lvr-tabela" role="region" tabIndex={0} aria-label={tx().tabela}>
      <table>
        <thead><tr>{b.cabecalho.map((h, i) => <th key={i} scope="col"><Inline s={h} lang={lang} /></th>)}</tr></thead>
        <tbody>
          {b.linhas.map((l, r) => (
            <tr key={r}>
              {l.map((c, i) => (
                <td key={i}>
                  {i === 0 && comAudio ? <span className="lvr-celula-audio"><Ouvir texto={plano(c)} voz={voz} rotulo={plano(c)} /><span lang={lang}><Inline s={c} lang={lang} /></span></span> : <Inline s={c} lang={lang} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Blocos({ c }: { c: CapituloLivro }) {
  const lang = livroDoSite(c.idioma, LOCALE.codigo)?.lang ?? c.idioma;
  const voz = c.idioma; // pasta do áudio gravado (public/audio/<id>); o lang acima é só o do HTML (ex.: pt-BR)
  const out: ReactElement[] = [];
  let secao = '', h2 = 0;
  c.blocos.forEach((b, i) => {
    if (b.t === 'h2') { secao = b.texto; h2++; out.push(<h2 key={i} id={`s${h2}`} className="lvr-h2">{b.texto}</h2>); return; }
    if (b.t === 'h3') { out.push(<h3 key={i} className="lvr-h3">{b.texto}</h3>); return; }
    if (b.t === 'h4') { const m = b.texto.match(/^(\d+)\s+(.*)$/); out.push(<h4 key={i} className="lvr-h4">{m && <span className="lvr-passo" aria-hidden="true">{m[1]}</span>}{m ? m[2] : b.texto}</h4>); return; }
    if (b.t === 'rotulo') { out.push(<p key={i} className="lvr-rotulo">{b.texto}</p>); return; }
    if (b.t === 'aviso') { out.push(<aside key={i} className="lvr-aviso"><p className="lvr-rotulo">{b.rotulo}</p><p><Inline s={b.texto} lang={lang} /></p></aside>); return; }
    if (b.t === 'dialogo') { out.push(<Cena key={i} falas={b.falas} lang={lang} voz={voz} />); return; }
    if (b.t === 'tabela') { out.push(<Tabela key={i} b={b} lang={lang} voz={voz} comAudio={ehTabelaDeFrases(secao)} />); return; }
    if (b.t === 'item') { out.push(<p key={i} className="lvr-item"><span className="lvr-item-n">{b.n}.</span><span><Inline s={b.texto} lang={lang} /></span></p>); return; }
    if (b.t === 'li') { out.push(<p key={i} className="lvr-li"><span aria-hidden="true">•</span><span><Inline s={b.texto} lang={lang} /></span></p>); return; }
    const meta = i === 0 && tx().meta.test(b.texto);
    out.push(meta
      ? <p key={i} className="lvr-meta"><strong>{tx().metaRot}</strong> <Inline s={b.texto.replace(tx().meta, '').trim()} lang={lang} /></p>
      : <p key={i} className="lvr-p"><Inline s={b.texto} lang={lang} /></p>);
  });
  return <>{out}</>;
}

// ------------------------------------------------------------------ /livros/:id/capitulo/:n
export function LivroCapitulo() {
  const { id = '', n = '' } = useParams();
  const t = tx();
  const m = livroDoSite(id, LOCALE.codigo);
  const num = Number(n);
  const [cap, setCap] = useState<CapituloLivro | null | undefined>(undefined);
  const [total, setTotal] = useState(0);
  usePageTitle(m && cap ? t.capTitulo(cap.n, cap.titulo, m.nome) : undefined, m && cap ? t.capDesc(m.nome, cap.n, cap.titulo) : undefined, [LOCALE.codigo], !m || !CAPITULOS_GRATIS.includes(num as 1 | 2) || cap === null, true);
  useEffect(() => { parar(); setCap(undefined); if (m) { carregarCapitulo(m.id, num).then(setCap); carregarSumario(m.id).then((x) => setTotal(x.length)); } return () => parar(); }, [m, num]);
  if (!m || !CAPITULOS_GRATIS.includes(num as 1 | 2)) return <NaoEncontrada />;
  if (cap === null) return <NaoEncontrada />;
  if (!cap) return <div className="pagina lvr carga"><p className="lvr-sub" role="status">{t.carregandoCap}</p></div>;
  const secoes = sumarioDe(cap);
  const prox = CAPITULOS_GRATIS.find((x) => x === num + 1);
  return (
    <div className="pagina lvr">
      <nav className="lvr-trilha" aria-label={t.trilha}><Link to="/livros">{t.livros}</Link><span aria-hidden="true"> › </span><Link to={caminhoLivro(m.id)}>{m.nome}</Link><span aria-hidden="true"> › </span><span>{t.capitulo(cap.n)}</span></nav>
      <div className="lvr-leitura">
        <article className="lvr-artigo">
          <header className="lvr-cab">
            <h1 className="lvr-titulo">{cap.titulo}</h1>
            <p className="lvr-info">{t.capInfo(m.nome, cap.n, cap.nivel, minutosDeLeitura(cap), autoresTexto())}</p>
          </header>
          <Blocos c={cap} />
          <footer className="lvr-fim">
            <h2 className="lvr-h2">{t.continue}</h2>
            <p>{t.continueTx(cap.n, total)}</p>
            <div className="lv-hero-botoes">
              <Link className="btn btn-primary" to={`/curso/${m.id}`}>{t.comecar(m.nome)}</Link>
              {prox ? <Link className="btn btn-ok" to={caminhoCapitulo(m.id, prox)}>{t.proximo(prox)}</Link> : <Link className="btn btn-ok" to="/assinatura">{t.verPlanos}</Link>}
            </div>
            <p className="lvr-direitos">{t.direitos(autoresTexto())}</p>
          </footer>
        </article>
        <aside className="lvr-lateral" aria-label={t.neste}>
          <p className="lvr-rotulo">{t.neste}</p>
          <ol>{secoes.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.texto.replace(/^\d+\.\s*/, '')}</a></li>)}</ol>
        </aside>
      </div>
    </div>
  );
}
