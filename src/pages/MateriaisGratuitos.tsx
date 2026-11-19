import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../materiais.css';
import { LOCALE } from '../i18n';
import { usePageTitle } from '../lib/usePageTitle';
import { falar, parar } from '../lib/audio';
import {
  ALFABETOS, CAMINHO_HUB, DESCRICAO_HUB, HUB_EN, LEAD_HUB, TITULO_HUB, alfabetoPorSlug, caminhoAlfabeto, caminhoAulaGratis, palavrasDoGuia, audioVocabularioRusso,
  type Alfabeto, type Bloco, type Cartao, type Exercicio, type Exemplo,
} from '../lib/materiais';
import { ac } from '../lib/alfabeto/base';
import NaoEncontrada from './NaoEncontrada';

// ------------------------------------------------------------------ progresso do teste (só neste navegador)
const CHAVE = 'linvuu:materiais:v1';
type Progresso = Record<string, { acertos: number; total: number }>;
const lerProgresso = (): Progresso => { try { const r = localStorage.getItem(CHAVE); return r ? (JSON.parse(r) as Progresso) : {}; } catch { return {}; } };
const gravarProgresso = (p: Progresso) => { try { localStorage.setItem(CHAVE, JSON.stringify(p)); } catch { /* armazenamento bloqueado: a página funciona sem salvar */ } };
function useProgresso() {
  const [p, setP] = useState<Progresso>({});
  useEffect(() => { setP(lerProgresso()); }, []);
  const registrar = (id: string, acertos: number, total: number) => { const novo = { ...lerProgresso(), [id]: { acertos, total } }; gravarProgresso(novo); setP(novo); };
  return { progresso: p, registrar };
}

// ------------------------------------------------------------------ texto
const MARCA = /(\{\{[^}]+\}\})/;
const CIRILICO = /([Ѐ-ӿ́]+(?: [Ѐ-ӿ́]+)*)/;
/** Português com trechos na língua estudada: `{{...}}` e, em russo, trechos em cirílico, marcados com o `lang` certo. */
function Rico({ x, lang }: { x: string; lang: string }) {
  const s = ac(x);
  return <>{s.split(MARCA).map((parte, i) => {
    if (parte.startsWith('{{')) return <span key={i} lang={lang} className="mat-lg">{parte.slice(2, -2)}</span>;
    return <Fragment key={i}>{parte.split(CIRILICO).map((q, j) => (j % 2 ? <span key={j} lang="ru" className="mat-lg">{q}</span> : <Fragment key={j}>{q}</Fragment>))}</Fragment>;
  })}</>;
}

/** O que a voz lê: sem acento tônico; placas em maiúsculas viram minúsculas (o MP3 gravado é o da palavra em minúsculas). */
const paraFalar = (txt: string) => { const s = ac(txt); return s === s.toUpperCase() && s !== s.toLowerCase() ? s.toLocaleLowerCase() : s; };

function Ouvir({ texto, lang, rotulo }: { texto: string; lang: string; rotulo: string }) {
  const [tocando, setTocando] = useState(false);
  return (
    <button type="button" className="mat-ouvir" data-tocando={tocando || undefined} aria-label={`Ouvir: ${rotulo}`} title="Ouvir"
      onClick={async () => { setTocando(true); try { await falar(paraFalar(texto), lang); } finally { setTocando(false); } }}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 0 1 0 7M18.8 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    </button>
  );
}

function CartaoLetra({ c, lang }: { c: Cartao; lang: string }) {
  const longo = c.glifo.length > 7;
  return (
    <li className="mat-letra">
      <div className="mat-letra-glifo" data-longo={longo || undefined} lang={lang}>{c.glifo}</div>
      <div className="mat-letra-corpo">
        {c.nome && <p className="mat-letra-nome">Nome: <strong lang={lang}>{c.nome}</strong></p>}
        <p className="mat-letra-som"><Rico x={c.som} lang={lang} /></p>
        {c.dica && <p className="mat-letra-dica"><Rico x={c.dica} lang={lang} /></p>}
        {c.exemplo && (
          <p className="mat-letra-ex">
            <Ouvir texto={c.exemplo.txt} lang={lang} rotulo={`${c.exemplo.leitura}, ${c.exemplo.pt}`} />
            <span lang={lang} className="mat-lg mat-letra-ex-txt">{c.exemplo.txt}</span>
            <span className="mat-letra-ex-pt"><em>{c.exemplo.leitura}</em>, {c.exemplo.pt}</span>
          </p>
        )}
      </div>
    </li>
  );
}

function ListaPalavras({ itens, lang }: { itens: Exemplo[]; lang: string }) {
  return (
    <ul className="mat-palavras">
      {itens.map((w) => (
        <li key={w.txt + w.pt} className="mat-palavra">
          <Ouvir texto={w.txt} lang={lang} rotulo={`${w.leitura}, ${w.pt}`} />
          <span lang={lang} className="mat-lg mat-palavra-txt">{w.txt}</span>
          <span className="mat-palavra-pt"><em>{w.leitura}</em><br />{w.pt}</span>
        </li>
      ))}
    </ul>
  );
}

function Tabela({ b, lang }: { b: Extract<Bloco, { t: 'tabela' }>; lang: string }) {
  return (
    <div className="mat-tabela-caixa" role="region" aria-label={b.titulo ?? 'Tabela'} tabIndex={0}>
      <table className="mat-tabela">
        {b.titulo && <caption>{b.titulo}</caption>}
        <thead><tr>{b.cabecalho.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody>{b.linhas.map((linha, i) => <tr key={i}>{linha.map((cel, j) => <td key={j}><Rico x={cel} lang={lang} /></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Blocos({ blocos, lang }: { blocos: Bloco[]; lang: string }) {
  const out: ReactNode[] = [];
  let secao = 0;
  blocos.forEach((b, i) => {
    if (b.t === 'p') out.push(<p key={i} className="mat-p"><Rico x={b.x} lang={lang} /></p>);
    else if (b.t === 'h') out.push(<h2 key={i} id={`sec-${++secao}`} className="mat-h2"><Rico x={b.x} lang={lang} /></h2>);
    else if (b.t === 'h3') out.push(<h3 key={i} className="mat-h3"><Rico x={b.x} lang={lang} /></h3>);
    else if (b.t === 'lista') out.push(<ul key={i} className="mat-lista">{b.itens.map((x) => <li key={x}><Rico x={x} lang={lang} /></li>)}</ul>);
    else if (b.t === 'cartoes') out.push(<ul key={i} className="mat-letras">{b.itens.map((c) => <CartaoLetra key={c.glifo} c={c} lang={lang} />)}</ul>);
    else if (b.t === 'palavras') out.push(<div key={i}>{b.titulo && <h3 className="mat-h3">{b.titulo}</h3>}<ListaPalavras itens={b.itens} lang={lang} /></div>);
    else if (b.t === 'nota') out.push(<aside key={i} className="mat-nota"><h3 className="mat-nota-t">{b.titulo}</h3><p><Rico x={b.x} lang={lang} /></p></aside>);
    else if (b.t === 'tabela') out.push(<Tabela key={i} b={b} lang={lang} />);
  });
  return <>{out}</>;
}

// ------------------------------------------------------------------ teste rápido
function Pergunta({ e, numero, lang, resposta, onResponder }: { e: Exercicio; numero: number; lang: string; resposta: number | undefined; onResponder: (i: number) => void }) {
  const respondida = resposta !== undefined;
  const acertou = respondida && resposta === e.correta;
  return (
    <li className="mat-q">
      <fieldset>
        <legend><span className="mat-q-n">{numero}.</span> <Rico x={e.enunciado} lang={lang} /></legend>
        {e.txt && <p className="mat-q-txt"><Ouvir texto={e.txt} lang={lang} rotulo="a palavra do exercício" /><span lang={lang} className="mat-lg">{e.txt}</span></p>}
        <div className="mat-q-opcoes">
          {e.opcoes.map((o, i) => {
            const estado = !respondida ? undefined : i === e.correta ? 'certa' : i === resposta ? 'errada' : 'neutra';
            return <button key={o} type="button" className="mat-opcao" data-estado={estado} disabled={respondida} aria-pressed={resposta === i} onClick={() => onResponder(i)}><Rico x={o} lang={lang} /></button>;
          })}
        </div>
        <p className="mat-q-retorno" role="status" aria-live="polite">
          {respondida && <><strong>{acertou ? 'Certo.' : 'Não foi dessa vez.'}</strong> <Rico x={e.explicacao} lang={lang} /></>}
        </p>
      </fieldset>
    </li>
  );
}

function Teste({ a, onConcluir }: { a: Alfabeto; onConcluir: (acertos: number, total: number) => void }) {
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const total = a.exercicios.length;
  const feitas = Object.keys(respostas).length;
  const acertos = a.exercicios.filter((e) => respostas[e.id] === e.correta).length;
  const terminou = feitas === total;
  useEffect(() => { setRespostas({}); }, [a.id]);
  useEffect(() => { if (terminou) onConcluir(acertos, total); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [terminou]);
  return (
    <section aria-labelledby="mat-teste" className="mat-exercicios">
      <h2 id="mat-teste" className="mat-h2">Teste rápido</h2>
      <p className="mat-p">Escolha uma alternativa em cada pergunta. A resposta e a explicação aparecem na hora. {feitas} de {total} respondidas.</p>
      <ol className="mat-qs">
        {a.exercicios.map((e, i) => <Pergunta key={e.id} e={e} numero={i + 1} lang={a.lang} resposta={respostas[e.id]} onResponder={(r) => setRespostas((p) => (e.id in p ? p : { ...p, [e.id]: r }))} />)}
      </ol>
      {terminou && (
        <div className="mat-resultado" role="status">
          <p className="mat-resultado-t">Você acertou {acertos} de {total}.</p>
          <p className="mat-p">{acertos === total ? 'Sem erros. Agora é praticar com palavras de verdade.' : acertos >= total * 0.7 ? 'Bom resultado. Se alguma explicação ficou solta, volte à parte da página antes de seguir.' : 'Releia a página com calma, ouça os áudios de novo e refaça o teste.'}</p>
          <button type="button" className="btn btn-ghost" onClick={() => { parar(); setRespostas({}); }}>Refazer o teste</button>
        </div>
      )}
    </section>
  );
}

// ------------------------------------------------------------------ páginas
const nota = LOCALE.codigo !== 'pt-BR';
const ParaPortugues = () => (nota ? <p className="mat-nota-idioma" lang="pt-BR">Este material é escrito em português, para quem fala português.</p> : null);


function VocabularioRusso({ a }: { a: Alfabeto }) {
  const [busca, setBusca] = useState('');
  const [limite, setLimite] = useState(20);
  const [erroAudio, setErroAudio] = useState('');
  const audioAtual = useRef<HTMLAudioElement | null>(null);
  useEffect(() => () => { audioAtual.current?.pause(); }, []);
  const ouvir = async (txt: string) => {
    setErroAudio('');
    audioAtual.current?.pause();
    const audio = new Audio(audioVocabularioRusso(txt));
    audioAtual.current = audio;
    try { await audio.play(); }
    catch { setErroAudio('Não foi possível reproduzir o áudio. Tente novamente.'); }
  };
  const normalizar = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();
  const palavras = palavrasDoGuia(a);
  const resultado = palavras.filter((w) => normalizar(`${w.txt} ${w.pt}`).includes(normalizar(busca.trim())));
  return <section aria-labelledby="mat-vocabulario" className="mat-exercicios">
    <h2 id="mat-vocabulario" className="mat-h2">200 palavras em russo para o dia a dia</h2>
    <p className="mat-p">Uma seleção de palavras úteis para começar. Ouça em russo e confira a tradução em português.</p>
    <label htmlFor="mat-busca-palavra">Buscar em russo ou português</label>
    <input id="mat-busca-palavra" type="search" value={busca} onChange={(e) => { setBusca(e.target.value); setLimite(20); }} />
    <p className="mat-p" role="status">{resultado.length} {resultado.length === 1 ? 'palavra encontrada' : 'palavras encontradas'}.</p>
    <p className="mat-p" role="alert">{erroAudio}</p>
    <ul className="mat-palavras">{resultado.slice(0, limite).map((w) => <li key={w.txt} className="mat-palavra">
      <button type="button" className="mat-ouvir" onClick={() => void ouvir(w.txt)} aria-label={`Ouvir ${w.txt} em russo, ${w.pt}`} title="Ouvir em russo">▶</button>
      <span lang="ru" className="mat-lg mat-palavra-txt">{w.txt}</span><span className="mat-palavra-pt">{w.pt}</span>
    </li>)}</ul>
    {limite < resultado.length && <button type="button" className="btn btn-ghost" onClick={() => setLimite((n) => n + 20)}>Mostrar mais palavras</button>}
  </section>;
}

/** /materiais-gratuitos — mesmo desenho e mesmas imagens nos dois domínios; no .com o texto é inglês e o cartão leva à aula grátis. */
export function MateriaisIndice() {
  const en = LOCALE.codigo === 'en';
  usePageTitle(en ? HUB_EN.titulo : TITULO_HUB, en ? HUB_EN.descricao : DESCRICAO_HUB, ['pt-BR', 'en']);
  return (
    <div className="pagina mat">
      <header className="mat-topo">
        <h1 className="pagina-h1">{en ? HUB_EN.h1 : 'Materiais gratuitos'}</h1>
        <p className="lead">{en ? HUB_EN.lead : LEAD_HUB}</p>
      </header>
      <ul className="mat-grade">
        {ALFABETOS.map((a, n) => (
          <li key={a.id} className="mat-cartao" data-tom={['vermelho', 'ocre', 'verde'][n % 3]}>
            <Link to={en ? caminhoAulaGratis(a.id) : caminhoAlfabeto(a.slug)} className="mat-cartao-link">
              <span className="mat-cartao-arte"><img src={`/assets/materiais/rabiscos/${a.id}.webp`} alt="" loading="lazy" /></span>
              <span className="mat-cartao-corpo">
                <h2>{en ? `${HUB_EN.idioma[a.id]} alphabet` : `Alfabeto ${a.idioma.charAt(0).toUpperCase() + a.idioma.slice(1)}`}</h2>
                <span className="mat-cartao-sub">{en ? HUB_EN.sub : 'Letras, sons e áudio em uma página'}</span>
                <span className="mat-cartao-cta">{en ? HUB_EN.cta : 'Abrir o guia grátis'} <span aria-hidden="true">→</span></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <section className="mat-convite" aria-labelledby="mat-convite-t">
        <div><h2 id="mat-convite-t">{en ? HUB_EN.conviteT : 'Do alfabeto à primeira conversa.'}</h2><p>{en ? HUB_EN.convite : 'As 2 primeiras aulas de cada curso são grátis, com explicação em português e áudio em cada frase.'}</p></div>
        <Link to="/cursos" className="mat-convite-cta">{en ? HUB_EN.conviteCta : 'Começar um curso grátis'} <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  );
}

/** /materiais-gratuitos/alfabeto-<idioma> */
export function AlfabetoPagina() {
  const { slug = '' } = useParams();
  const a = alfabetoPorSlug(slug);
  usePageTitle(a?.titulo, a?.descricao, ['pt-BR'], nota || !a);
  const { registrar } = useProgresso();
  useEffect(() => () => parar(), [slug]);
  if (!a) return <NaoEncontrada />;
  const secoes = a.blocos.filter((b): b is Extract<Bloco, { t: 'h' }> => b.t === 'h').map((b, i) => ({ id: `sec-${i + 1}`, texto: b.x }));
  return (
    <div className="pagina mat">
      <nav className="mat-trilha" aria-label="Você está em"><Link to={CAMINHO_HUB}>Materiais gratuitos</Link><span aria-hidden="true"> › </span><span aria-current="page">Alfabeto {a.idioma}</span></nav>
      <article className="mat-aula">
        <header className="mat-topo">
          <h1 className="pagina-h1">{a.h1}</h1>
          <p className="lead">{a.lead}</p>
          <p className="mat-meta">Cerca de {a.minutos} minutos · Com áudio · Sem cadastro</p>
          <ParaPortugues />
        </header>
        {a.id !== 'ru' && <nav className="mat-sumario" aria-label="Nesta página">
          <ol>{secoes.map((s) => <li key={s.id}><a href={`#${s.id}`}><Rico x={s.texto} lang={a.lang} /></a></li>)}<li><a href="#mat-teste">Teste rápido</a></li></ol>
        </nav>}
        <Blocos blocos={a.blocos} lang={a.lang} />
        <Teste a={a} onConcluir={(ac2, t) => registrar(a.id, ac2, t)} />
        {a.id === 'ru' && <VocabularioRusso a={a} />}
        <section aria-labelledby="mat-depois" className="mat-depois">
          <h2 id="mat-depois" className="mat-h2">Para continuar</h2>
          <p className="mat-p">Com o alfabeto na cabeça, o próximo passo é entender as palavras. O curso de {a.idioma} da Linvuu tem explicações em português e áudio em cada frase, e as duas primeiras aulas são grátis. O livro de gramática de {a.idioma} tem o capítulo 1 aberto para leitura.</p>
          <p className="mat-acoes">
            <Link className="btn btn-ok" to={`/curso/${a.id}`}>Conhecer o curso de {a.idioma}</Link>
            <Link className="btn btn-ghost" to={`/livros/${a.id}/capitulo/1`}>Ler o capítulo 1 do livro</Link>
          </p>
        </section>
      </article>
    </div>
  );
}
