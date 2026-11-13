import { useDestinoSessao } from '../lib/useDestinoSessao';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DIAS, IDIOMAS_GRAMATICA, diaDoCurso, gruposDoCurso, statusDoCurso, STATUS_AULA } from '../lib/content';
import { diaConcluido, diasConcluidos, marcarDia } from '../lib/progresso';
import { salvarDiaConta, sincronizarConta, estadoProgressoConta, EVENTO_SINCRONIZACAO } from '../lib/progressoConta';
import { useAuth } from '../lib/AuthContext';
import { textos } from '../lib/textos';
import { definirSons, EVENTO_SONS, somClique, somConcluido, sonsLigados } from '../lib/sons';
import { Traco } from './Traco';
import { LOCALE } from '../i18n';

export type Tema = 'claro' | 'escuro';
/** Na trilha, o título da aula já aparece no grupo: a sessão não precisa repeti-lo. */
const semPrefixo = (titulo: string, prefixo?: string) => (prefixo && titulo.startsWith(`${prefixo}: `) ? titulo.slice(prefixo.length + 2) : titulo);
const CHAVE_TEMA = 'linvuu:tema-aluno';
const lerTema = (): Tema => {
  try { return localStorage.getItem(CHAVE_TEMA) === 'escuro' ? 'escuro' : 'claro'; } catch { return 'claro'; }
};

/** Trilha lateral da área do aluno: saudação, progresso, aulas recolhíveis, busca, tema e atalho para a gramática. */
export function AreaAluno({ idioma, nome, dia, children }: { idioma: string; nome: string; dia: number; children: ReactNode }) {
  const destino = useDestinoSessao();
  const T = textos(idioma);
  const { usuario } = useAuth();
  const stats = statusDoCurso(idioma);
  const grupos = gruposDoCurso(idioma);
  const total = stats?.total ?? 0;
  const [concluidos, setConcluidos] = useState<number[]>([]);
  // No celular a trilha começa recolhida, para a aula aparecer primeiro.
  const [recolhida, setRecolhida] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);
  const [busca, setBusca] = useState('');
  const [abertos, setAbertos] = useState<Record<number, boolean>>({});
  const [tema, setTema] = useState<Tema>(lerTema);
  const [avisoTema, setAvisoTema] = useState('');
  // O tema da aula vale para a página inteira (cabeçalho e barra do topo), não só para a área do aluno.
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.dataset.temaAluno = tema;
    const cor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const antes = cor?.content;
    if (cor) cor.content = tema === 'escuro' ? '#1A221D' : (getComputedStyle(document.documentElement).getPropertyValue('--papel').trim() || '#F3F2EE');
    return () => { delete raiz.dataset.temaAluno; if (cor && antes) cor.content = antes; };
  }, [tema]);
  const [sons, setSons] = useState(sonsLigados);
  // Ao concluir um dia, o traço da barra desenha de novo. A primeira leitura (ao abrir a página) não desenha.
  const [desenho, setDesenho] = useState(0);
  const anterior = useRef<number | null>(null);

  useEffect(() => {
    const sync = () => {
      const novos = diasConcluidos(idioma);
      setConcluidos(novos);
      if (anterior.current !== null && novos.length > anterior.current) setDesenho((d) => d + 1);
      anterior.current = novos.length;
    };
    sync();
    window.addEventListener('linvuu:dias', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('linvuu:dias', sync); window.removeEventListener('storage', sync); };
  }, [idioma]);

  useEffect(() => {
    const sync = () => setSons(sonsLigados());
    window.addEventListener(EVENTO_SONS, sync);
    return () => window.removeEventListener(EVENTO_SONS, sync);
  }, []);

  // Quem entrou na conta traz o progresso de outros aparelhos e reenvia pendências ao voltar à rede.
  useEffect(() => {
    const sync = () => { if (usuario) void sincronizarConta(idioma); };
    sync();
    window.addEventListener('online', sync);
    return () => window.removeEventListener('online', sync);
  }, [usuario, idioma]);

  const escolherTema = (t: Tema) => {
    setTema(t);
    setAvisoTema(T.temaAlterado(t === 'escuro' ? T.escuro : T.claro));
    try { localStorage.setItem(CHAVE_TEMA, t); } catch { /* sem armazenamento */ }
    somClique();
  };

  const alternarSons = () => {
    const novo = !sons;
    definirSons(novo);
    setSons(novo);
    if (novo) somClique();
  };

  const grupoAtual = grupos.find((g) => dia >= g.dias[0] && dia <= g.dias[1]);
  const estaAberto = (aula: number) => abertos[aula] ?? aula === grupoAtual?.aula;
  const pct = total ? Math.round((concluidos.length / total) * 1000) / 10 : 0;
  const termo = busca.trim().toLowerCase();
  const todosOsDias = Array.from({ length: total }, (_, k) => k + 1);
  const encontrados = termo ? todosOsDias.filter((n) => diaDoCurso(idioma, DIAS[n - 1] ?? { dia: n, fase: 0, nivel: 'a2' as const, titulo: '', objetivo: '' }).titulo.toLowerCase().includes(termo)) : [];
  const numerosDo = (g: { dias: [number, number] }) => Array.from({ length: g.dias[1] - g.dias[0] + 1 }, (_, k) => g.dias[0] + k);
  const primeiroNome = usuario?.nome.split(/\s+/)[0];
  const temGramatica = IDIOMAS_GRAMATICA.includes(idioma);

  const linha = (n: number) => {
    // A trilha-mestre tem 120 dias; cursos com aulas escritas vão além (ex.: russo, 312). Mesmo fallback de Curso.tsx.
    const m = DIAS[n - 1] ?? { dia: n, fase: Math.ceil(n / 10), nivel: 'a2' as const, titulo: '', objetivo: '' };
    const d = diaDoCurso(idioma, m);
    const st = stats?.status[n - 1] ?? 'planejada';
    const feito = concluidos.includes(n);
    const atual = n === dia;
    return (
      <li key={n}>
        <Link to={destino(idioma, n)} className={`aa-dia ${atual ? 'atual' : ''} ${feito ? 'feito' : ''}`} aria-current={atual ? 'page' : undefined}>
          <span className="aa-marca" aria-hidden="true">{feito ? '✓' : ''}</span>
          <span className="aa-dia-n">{n}</span>
          <span className="aa-dia-t">{semPrefixo(d.titulo, grupos.find((g) => n >= g.dias[0] && n <= g.dias[1])?.titulo)}{(feito || st !== 'publicada') && <small>{feito ? T.concluidoDia : STATUS_AULA[st]}</small>}</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="area-aluno" data-recolhida={recolhida || undefined} data-tema={tema}>
      <p className="sr-only" role="status" aria-live="polite">{avisoTema}</p>
      <aside className="aa-lateral" aria-label={T.trilhaAluno}>
        <div className="aa-topo">
          <div className="aa-titulo">
            <strong>{primeiroNome ? T.olaNome(primeiroNome) : T.ola}</strong>
            <span className="aa-kicker">{T.trilhaAluno} · {nome}</span>
          </div>
          <button type="button" className="aa-recolher" aria-expanded={!recolhida} onClick={() => setRecolhida((x) => !x)} aria-label={recolhida ? T.expandir : T.recolher}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{recolhida ? <path d="m9 6 6 6-6 6" /> : <path d="m15 6-6 6 6 6" />}</svg>
          </button>
        </div>

        {!recolhida && (
          <div className="aa-corpo">
            <div className="aa-progresso">
              <div className="aa-progresso-resumo"><span className="aa-contagem">{T.diasConcluidos(concluidos.length, total)}</span><strong>{pct.toLocaleString(LOCALE.codigo)}%</strong></div>
              <div className="aa-barra" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={concluidos.length} aria-label={T.diasConcluidos(concluidos.length, total)}>
                <Traco key={desenho} valor={total ? concluidos.length / total : 0} exato altura={24} semente={7} trilha animar={desenho > 0} />
              </div>
              <p className="aa-acalma">{T.acalma(dia, total)}</p>
            </div>

            <div className="aa-linha-acoes">
              <div className="aa-tema" role="group" aria-label={T.tema} data-ativo={tema}>
                <button type="button" aria-pressed={tema === 'claro'} onClick={() => escolherTema('claro')}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>{T.claro}</button>
                <button type="button" aria-pressed={tema === 'escuro'} onClick={() => escolherTema('escuro')}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 14A8.8 8.8 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z" /></svg>{T.escuro}</button>
              </div>
              <button type="button" className="aa-sons" aria-pressed={sons} onClick={alternarSons}>{T.sonsRotulo}: {sons ? T.sonsLig : T.sonsDesl}</button>
              {temGramatica && <Link className="aa-gramatica" to={`/gramatica/${idioma}`}>{T.gramaticaDo(nome)}</Link>}
            </div>

            <label className="aa-busca">
              <span className="sr-only">{T.buscarDia}</span>
              <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder={T.buscarDia} />
            </label>

            {termo ? (
              <ol className="aa-lista">
                {encontrados.map((n) => linha(n))}
                {encontrados.length === 0 && <li className="aa-vazio">{T.semDias}</li>}
              </ol>
            ) : (
              grupos.map((g) => (
                <section key={g.aula} className="aa-grupo">
                  <button type="button" className="aa-grupo-topo" aria-expanded={estaAberto(g.aula)} onClick={() => setAbertos((x) => ({ ...x, [g.aula]: !estaAberto(g.aula) }))}>
                    <span className="aa-grupo-t">
                      <small>{T.aula(g.aula)}</small>
                      {g.titulo}
                    </span>
                    <span className="aa-grupo-n">
                      {numerosDo(g).filter((n) => concluidos.includes(n)).length}/{g.dias[1] - g.dias[0] + 1}
                    </span>
                    <span className={`aa-seta ${estaAberto(g.aula) ? 'aberta' : ''}`} aria-hidden="true">›</span>
                  </button>
                  {estaAberto(g.aula) && <ol className="aa-lista">{numerosDo(g).map((n) => linha(n))}</ol>}
                </section>
              ))
            )}
          </div>
        )}
      </aside>

      <div className="aa-conteudo" key={`${idioma}-${dia}`}><EstadoProgresso idioma={idioma} />{children}</div>
    </div>
  );
}

/** Botão de conclusão do dia: marca e desmarca, salva na conta quando há login e mostra um reforço curto. */
/** Marca a sessão (dia) como concluída neste navegador e na conta, toca o som e devolve a mensagem de progresso. */
export function concluirDia(idioma: string, dia: number, logado: boolean): string {
  const T = textos(idioma);
  const jaEstava = diaConcluido(idioma, dia);
  marcarDia(idioma, dia, true);
  if (logado) salvarDiaConta(idioma, dia, true);
  const total = statusDoCurso(idioma)?.total ?? 0;
  const feitos = new Set([...diasConcluidos(idioma), dia]);
  const grupo = gruposDoCurso(idioma).find((g) => dia >= g.dias[0] && dia <= g.dias[1]);
  const aulaFechada = !!grupo && Array.from({ length: grupo.dias[1] - grupo.dias[0] + 1 }, (_, k) => grupo.dias[0] + k).every((n) => feitos.has(n));
  if (!jaEstava) somConcluido();
  return aulaFechada ? T.msgAula : T.msgDia(feitos.size, total);
}

export function MarcarDia({ idioma, dia }: { idioma: string; dia: number }) {
  const T = textos(idioma);
  const { usuario } = useAuth();
  const { pathname, search, hash } = useLocation();
  const [feito, setFeito] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => setFeito(diaConcluido(idioma, dia));
    sync();
    window.addEventListener('linvuu:dias', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('linvuu:dias', sync); window.removeEventListener('storage', sync); };
  }, [idioma, dia]);

  const clicar = () => {
    const novo = !feito;
    if (!novo) { marcarDia(idioma, dia, false); if (usuario) salvarDiaConta(idioma, dia, false); setAviso(null); return; }
    setAviso(concluirDia(idioma, dia, !!usuario));
  };

  return (
    <div className="aa-marcar-bloco">
      <button type="button" className={`btn ${feito ? 'btn-ok' : 'btn-primary'} aa-marcar`} aria-pressed={feito} onClick={clicar}>
        {feito ? `✓ ${T.concluidoDia}` : T.marcarConcluido}
      </button>
      {aviso && <p className="aa-aviso" role="status">{aviso}</p>}
      {!usuario && <p className="aa-aviso-leve">{T.entrarProgresso} <Link to={`/entrar?proximo=${encodeURIComponent(pathname + search + hash)}`}>{T.entrarAgora}</Link></p>}
    </div>
  );
}


function EstadoProgresso({ idioma }: { idioma: string }) {
  const T = textos(idioma);
  const { usuario } = useAuth();
  const [estado, setEstado] = useState(estadoProgressoConta);
  useEffect(() => {
    const sync = () => setEstado(estadoProgressoConta());
    sync();
    window.addEventListener(EVENTO_SINCRONIZACAO, sync);
    window.addEventListener('storage', sync);
    window.addEventListener('linvuu:dias', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener(EVENTO_SINCRONIZACAO, sync); window.removeEventListener('linvuu:dias', sync); };
  }, [usuario]);
  if (!usuario || estado === 'local') return null;
  return <div className="aa-sync" role="status" aria-live="polite">
    <span>{estado === 'salvando' ? T.sincronizando : estado === 'salvo' ? T.progressoSalvo : T.progressoPendente}</span>
    {estado === 'pendente' && <button type="button" className="link" onClick={() => void sincronizarConta(idioma)}>{T.tentarSincronizar}</button>}
  </div>;
}
