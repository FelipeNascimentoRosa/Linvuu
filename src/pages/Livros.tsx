import { Fragment, useEffect, useState, type ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../livros.css';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { falar, falarLista, parar } from '../lib/audio';
import { carregarCapitulo, carregarSumario, capitulosDeAmostra } from '../lib/livrosCliente';
import {
  AUTORES, CAPITULOS_GRATIS, LIVROS_DESCRICAO, LIVROS_EM_PRODUCAO, LIVROS_META, caminhoCapitulo, caminhoLivro, ehTabelaDeFrases, livroMeta, minutosDeLeitura, plano, sumarioDe, tituloLivro, trechos,
  type BlocoLivro, type CapituloLivro, type ItemSumario, type MetaLivro,
} from '../lib/livros';
import NaoEncontrada from './NaoEncontrada';
import { APRESENTACOES_LIVRO } from '../lib/apresentacoes';

const capaDe = (id: string) => `/livros/${id}-a1-a2-v1-600.webp`;
const autoresTexto = AUTORES.map((a) => a.nome).join(' e ');

function Capa({ m, tamanho = 600 }: { m: MetaLivro; tamanho?: 600 | 900 }) {
  return <img className="lvr-capa" src={capaDe(m.id).replace('-600', `-${tamanho}`)} srcSet={`${capaDe(m.id)} 600w, ${capaDe(m.id).replace('-600', '-900')} 900w`} sizes="(max-width: 700px) 60vw, 300px" alt={`Capa do livro de ${m.nome}, Coleção Linvuu`} width={600} height={800} loading="lazy" />;
}

function NotaIdioma() {
  return LOCALE.codigo === 'pt-BR' ? null : <p className="lvr-nota" lang="pt-BR">Os livros da Coleção Linvuu são escritos em português, para quem fala português.</p>;
}

// ------------------------------------------------------------------ /livros
export function LivrosIndice() {
  usePageTitle('Coleção Linvuu: livros de gramática', LIVROS_DESCRICAO, ['pt-BR'], LOCALE.codigo !== 'pt-BR');
  return (
    <div className="pagina lvr">
      <header className="lvr-topo">
        <p className="lv-kicker lv-kicker-esc">Coleção Linvuu · Volume 1</p>
        <h1 className="pagina-h1">Gramática prática para quem fala português</h1>
        <p className="lead">Cada capítulo parte de dificuldades de quem fala português e apresenta exemplos para entender como a outra língua funciona. Escritos por {autoresTexto}.</p>
        {LOCALE.codigo === 'pt-BR' && <p>{LIVROS_EM_PRODUCAO}</p>}
        <NotaIdioma />
      </header>
      <ul className="lvr-grade">
        {LIVROS_META.map((m) => (
          <li key={m.id}>
            <Link to={caminhoLivro(m.id)} className="lvr-cartao">
              <Capa m={m} />
              <h2>{m.nome}</h2>
              <p>Níveis A1–A2 · leia os capítulos 1 e 2 grátis</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="lvr-rodape"><Link to="/sobre">Quem escreve os livros da Linvuu</Link></p>
    </div>
  );
}

// ------------------------------------------------------------------ /livros/:id
export function LivroPagina() {
  const { id = '' } = useParams();
  const m = livroMeta(id);
  const [sumario, setSumario] = useState<ItemSumario[]>([]);
  const [titulos, setTitulos] = useState<Record<number, CapituloLivro>>({});
  const [estadoSumario, setEstadoSumario] = useState<'carregando' | 'pronto' | 'erro'>('carregando');
  usePageTitle(m ? tituloLivro(m) : undefined, m ? m.descricao : undefined, ['pt-BR'], !m || LOCALE.codigo !== 'pt-BR');
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
      <nav className="lvr-trilha" aria-label="Você está em"><Link to="/livros">Livros</Link><span aria-hidden="true"> › </span><span>{m.nome}</span></nav>
      <header className="lvr-livro-topo">
        <Capa m={m} tamanho={900} />
        <div>
          <p className="lv-kicker lv-kicker-esc">Coleção Linvuu · Volume 1 · A1–A2</p>
          <h1 className="pagina-h1">{m.nome}: gramática prática, do zero ao A2</h1>
          <p className="lead">{m.descricao}</p>
          <p className="lvr-autoria">Por {autoresTexto}. <Link to="/sobre">Sobre os autores</Link></p>
          <div className="lv-hero-botoes">
            <Link className="btn btn-primary" to={caminhoCapitulo(m.id, CAPITULOS_GRATIS[0])}>Ler o capítulo 1 grátis</Link>
            <Link className="btn btn-ok" to={`/curso/${m.id}`}>Estudar o curso de {m.nome.toLowerCase()}</Link>
          </div>
          <NotaIdioma />
        </div>
      </header>
      {LOCALE.codigo === 'pt-BR' && APRESENTACOES_LIVRO[m.id] && <section aria-labelledby="lvr-apresentacao" className="texto-legal">
        <h2 id="lvr-apresentacao" className="pagina-h2">{APRESENTACOES_LIVRO[m.id].titulo}</h2>
        {APRESENTACOES_LIVRO[m.id].paragrafos.map((p) => <p key={p}>{p}</p>)}
      </section>}
      <section aria-labelledby="lvr-sumario">
        <h2 id="lvr-sumario" className="pagina-h2">Sumário</h2>
        <p className="lvr-sub">Os capítulos 1 e 2 estão abertos para leitura, com áudio. O livro inteiro está na plataforma Linvuu, junto das aulas e dos exercícios com correção.</p>
        {estadoSumario === 'carregando' && <p role="status">Carregando o sumário…</p>}
        {estadoSumario === 'erro' && <div role="alert"><p>Não foi possível carregar o sumário. Recarregue a página para tentar novamente.</p><button type="button" className="btn btn-ghost" onClick={() => window.location.reload()}>Recarregar página</button></div>}
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
                {aberto ? <span className="lvr-sum-tag lvr-sum-aberto">{c ? `${minutosDeLeitura(c)} min · ` : ''}grátis</span> : <span className="lvr-sum-tag">na plataforma</span>}
              </li>
            );
          })}
        </ol>
        <p className="lvr-rodape"><Link className="btn btn-ghost" to="/assinatura">Ver planos da plataforma</Link></p>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------ elementos do capítulo
function Inline({ s, lang }: { s: string; lang: string }) {
  return <>{trechos(s).map((t, i) => (t.t === 'est' ? <em key={i} className="lvr-est" lang={lang}>{t.v}</em> : t.t === 'ris' ? <del key={i} className="lvr-ris">{t.v}</del> : <Fragment key={i}>{t.v}</Fragment>))}</>;
}

function Ouvir({ texto, lang, rotulo }: { texto: string; lang: string; rotulo: string }) {
  const [tocando, setTocando] = useState(false);
  return (
    <button type="button" className="lvr-ouvir" data-tocando={tocando || undefined} aria-label={`Ouvir: ${rotulo}`} title="Ouvir"
      onClick={async () => { setTocando(true); try { await falar(texto, lang); } finally { setTocando(false); } }}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 0 1 0 7M18.8 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    </button>
  );
}

function Cena({ falas, lang }: { falas: { quem: string; texto: string }[]; lang: string }) {
  const [tocando, setTocando] = useState(false);
  return (
    <div className="lvr-cena">
      <button type="button" className="btn btn-ok lvr-cena-btn" disabled={tocando}
        onClick={async () => { setTocando(true); try { await falarLista(falas.map((f) => plano(f.texto)), lang); } finally { setTocando(false); } }}>
        {tocando ? 'Tocando…' : 'Ouvir a cena inteira'}
      </button>
      <div className="lvr-falas" lang={lang}>
        {falas.map((f, i) => (
          <p key={i} className="lvr-fala"><strong className="lvr-quem">{f.quem}</strong><span className="lvr-fala-t"><Inline s={f.texto} lang={lang} /></span><Ouvir texto={plano(f.texto)} lang={lang} rotulo={`${f.quem}, fala ${i + 1}`} /></p>
        ))}
      </div>
    </div>
  );
}

function Tabela({ b, lang, comAudio }: { b: Extract<BlocoLivro, { t: 'tabela' }>; lang: string; comAudio: boolean }) {
  return (
    <div className="lvr-tabela" role="region" tabIndex={0} aria-label="Tabela (role para o lado se precisar)">
      <table>
        <thead><tr>{b.cabecalho.map((h, i) => <th key={i} scope="col"><Inline s={h} lang={lang} /></th>)}</tr></thead>
        <tbody>
          {b.linhas.map((l, r) => (
            <tr key={r}>
              {l.map((c, i) => (
                <td key={i}>
                  {i === 0 && comAudio ? <span className="lvr-celula-audio"><Ouvir texto={plano(c)} lang={lang} rotulo={plano(c)} /><span lang={lang}><Inline s={c} lang={lang} /></span></span> : <Inline s={c} lang={lang} />}
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
  const lang = livroMeta(c.idioma)?.lang ?? c.idioma;
  const out: ReactElement[] = [];
  let secao = '', h2 = 0;
  c.blocos.forEach((b, i) => {
    if (b.t === 'h2') { secao = b.texto; h2++; out.push(<h2 key={i} id={`s${h2}`} className="lvr-h2">{b.texto}</h2>); return; }
    if (b.t === 'h3') { out.push(<h3 key={i} className="lvr-h3">{b.texto}</h3>); return; }
    if (b.t === 'h4') { const m = b.texto.match(/^(\d+)\s+(.*)$/); out.push(<h4 key={i} className="lvr-h4">{m && <span className="lvr-passo" aria-hidden="true">{m[1]}</span>}{m ? m[2] : b.texto}</h4>); return; }
    if (b.t === 'rotulo') { out.push(<p key={i} className="lvr-rotulo">{b.texto}</p>); return; }
    if (b.t === 'aviso') { out.push(<aside key={i} className="lvr-aviso"><p className="lvr-rotulo">{b.rotulo}</p><p><Inline s={b.texto} lang={lang} /></p></aside>); return; }
    if (b.t === 'dialogo') { out.push(<Cena key={i} falas={b.falas} lang={lang} />); return; }
    if (b.t === 'tabela') { out.push(<Tabela key={i} b={b} lang={lang} comAudio={ehTabelaDeFrases(secao)} />); return; }
    if (b.t === 'item') { out.push(<p key={i} className="lvr-item"><span className="lvr-item-n">{b.n}.</span><span><Inline s={b.texto} lang={lang} /></span></p>); return; }
    if (b.t === 'li') { out.push(<p key={i} className="lvr-li"><span aria-hidden="true">•</span><span><Inline s={b.texto} lang={lang} /></span></p>); return; }
    const meta = i === 0 && /^Meta do capítulo\./.test(b.texto);
    out.push(meta
      ? <p key={i} className="lvr-meta"><strong>Meta do capítulo.</strong> <Inline s={b.texto.replace(/^Meta do capítulo\.\s*/, '')} lang={lang} /></p>
      : <p key={i} className="lvr-p"><Inline s={b.texto} lang={lang} /></p>);
  });
  return <>{out}</>;
}

// ------------------------------------------------------------------ /livros/:id/capitulo/:n
export function LivroCapitulo() {
  const { id = '', n = '' } = useParams();
  const m = livroMeta(id);
  const num = Number(n);
  const [cap, setCap] = useState<CapituloLivro | null | undefined>(undefined);
  const [total, setTotal] = useState(0);
  usePageTitle(m && cap ? `Capítulo ${cap.n}: ${cap.titulo} · ${m.nome}` : undefined, m && cap ? `${m.nome}, capítulo ${cap.n} do livro de gramática prática da Coleção Linvuu: ${cap.titulo}. Leitura grátis, com áudio.` : undefined, ['pt-BR'], !m || !CAPITULOS_GRATIS.includes(num as 1 | 2) || cap === null || LOCALE.codigo !== 'pt-BR', true);
  useEffect(() => { parar(); setCap(undefined); if (m) { carregarCapitulo(m.id, num).then(setCap); carregarSumario(m.id).then((x) => setTotal(x.length)); } return () => parar(); }, [m, num]);
  if (!m || !CAPITULOS_GRATIS.includes(num as 1 | 2)) return <NaoEncontrada />;
  if (cap === null) return <NaoEncontrada />;
  if (!cap) return <div className="pagina lvr carga"><p className="lvr-sub" role="status">Carregando o capítulo…</p></div>;
  const secoes = sumarioDe(cap);
  const prox = CAPITULOS_GRATIS.find((x) => x === num + 1);
  return (
    <div className="pagina lvr">
      <nav className="lvr-trilha" aria-label="Você está em"><Link to="/livros">Livros</Link><span aria-hidden="true"> › </span><Link to={caminhoLivro(m.id)}>{m.nome}</Link><span aria-hidden="true"> › </span><span>Capítulo {cap.n}</span></nav>
      <div className="lvr-leitura">
        <article className="lvr-artigo">
          <header className="lvr-cab">
            <p className="lv-kicker lv-kicker-esc">{m.nome} · Capítulo {cap.n}{cap.nivel && ` · ${cap.nivel}`}</p>
            <h1 className="lvr-titulo">{cap.titulo}</h1>
            <p className="lvr-info">Leitura de cerca de {minutosDeLeitura(cap)} minutos · {AUTORES.map((a) => a.nome).join(' e ')}</p>
            <NotaIdioma />
          </header>
          <Blocos c={cap} />
          <footer className="lvr-fim">
            <h2 className="lvr-h2">Continue na plataforma</h2>
            <p>Este é o capítulo {cap.n}{total ? ` de ${total}` : ''}. Na plataforma Linvuu você tem o livro inteiro, as aulas em sessões de 30 minutos, o áudio em cada frase e os exercícios corrigidos na hora. As 2 primeiras aulas de cada curso são grátis.</p>
            <div className="lv-hero-botoes">
              <Link className="btn btn-primary" to={`/curso/${m.id}`}>Começar o curso de {m.nome.toLowerCase()}</Link>
              {prox ? <Link className="btn btn-ok" to={caminhoCapitulo(m.id, prox)}>Próximo: capítulo {prox}</Link> : <Link className="btn btn-ok" to="/assinatura">Ver os planos</Link>}
            </div>
            <p className="lvr-direitos">© Linvuu. Texto de {autoresTexto}. A leitura é livre; copiar, republicar ou distribuir o conteúdo não é permitido sem autorização. As vozes são sintéticas.</p>
          </footer>
        </article>
        <aside className="lvr-lateral" aria-label="Neste capítulo">
          <p className="lvr-rotulo">Neste capítulo</p>
          <ol>{secoes.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.texto.replace(/^\d+\.\s*/, '')}</a></li>)}</ol>
        </aside>
      </div>
    </div>
  );
}
