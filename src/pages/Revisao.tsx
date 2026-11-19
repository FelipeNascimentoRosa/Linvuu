import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Aula, carregarAula, explicacaoDoCurso, getCurso } from '../lib/content';
import type { Exercicio } from '../lib/aulas';
import { assinaturaExercicios } from '../lib/revisao/estudoModelo';
import { iniciarRevisao, revisaoCompativel, type Revisao } from '../lib/revisao/revisaoModelo';
import { registrarAvaliacao, type Nota } from '../lib/revisao/espacadoModelo';
import type { RegistroBloco } from '../lib/revisao/registroBloco';
import { armazemRevisao, sincronizarRevisao } from '../lib/revisaoWeb/armazem';
import { agendaDoCurso, type ItemReforco } from '../lib/revisaoWeb/agenda';
import { useRevisaoWeb } from '../lib/revisaoWeb/useRevisaoWeb';
import { codigoRevisao, quandoRevisao, textosRevisao } from '../lib/revisaoWeb/textos';
import { formatarEspera, mediaEspera, proporcaoAcerto, SEM_ESPERAS, somarEspera, type Esperas } from '../lib/revisaoWeb/resumo';
import { analytics } from '../lib/analytics';
import { usePageTitle } from '../lib/usePageTitle';
import { useAssinatura } from '../lib/acesso';
import { gratis } from '../config/planos';
import { RevisaoBloco } from '../components/RevisaoBloco';
import { Navegacao } from '../components/Navegacao';
import Carregando from '../components/Carregando';
import NaoEncontrada from './NaoEncontrada';
import { useT } from '../i18n';

type Estatisticas = { blocos: number; correcao: number } & Record<Nota, number>;
const ZERO: Estatisticas = { blocos: 0, correcao: 0, again: 0, hard: 0, good: 0, easy: 0 };
type Aberto = { estado: 'carregando' } | { estado: 'erro' } | { estado: 'mudou' } | { estado: 'ok'; itens: Exercicio[]; registro: RegistroBloco; inicial: Revisao };

const achar = (idioma: string, i: ItemReforco) => armazemRevisao.ler(idioma).find((r) => r.aula === i.aula && r.sessao === i.sessao && r.bloco === i.bloco);

/** Revisão espaçada de um curso (rota privada: `noindex, nofollow`, fora dos sitemaps). */
export default function Revisao() {
  const { id } = useParams();
  const curso = getCurso(id);
  const t = useT();
  const R = textosRevisao();
  const assinatura = useAssinatura();
  const valido = !!curso && curso.area === 'idiomas';
  usePageTitle(valido ? `${R.titulo} · ${curso!.nome}` : undefined, R.descricao, [], true);
  const agenda = useRevisaoWeb(valido ? curso!.id : undefined);
  const [fila, setFila] = useState<ItemReforco[] | null>(null);
  const [pos, setPos] = useState(0);
  const [stats, setStats] = useState<Estatisticas>(ZERO);
  const [esperas, setEsperas] = useState<Esperas>(SEM_ESPERAS);
  const [aberto, setAberto] = useState<Aberto>({ estado: 'carregando' });
  const [concluido, setConcluido] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [falhaSalvar, setFalhaSalvar] = useState(false);
  const cabecalho = useRef<HTMLHeadingElement>(null), proximoBtn = useRef<HTMLButtonElement>(null);
  const item = fila?.[pos];
  const cursoId = curso?.id ?? '';

  useEffect(() => {
    if (!item || !valido) return;
    let cancelado = false;
    setAberto({ estado: 'carregando' }); setConcluido(false);
    carregarAula(cursoId, item.dia, explicacaoDoCurso(cursoId)).then((a: Aula) => {
      if (cancelado) return;
      const registro = achar(cursoId, item);
      const bloco = a.sessao?.blocos[item.bloco - 1];
      if (!registro?.revisao || !bloco || bloco.tipo !== 'exercicios' || registro.pratica.assinatura !== assinaturaExercicios(bloco.itens)) { setAberto({ estado: 'mudou' }); return; }
      const origem = registro.revisao.origem;
      // Erros pendentes: continua de onde parou. Volta espaçada: uma rodada nova sobre as mesmas questões.
      const inicial = item.tipo === 'erros' && revisaoCompativel(registro.revisao, bloco.itens, origem) ? registro.revisao : iniciarRevisao(bloco.itens, origem);
      setAberto({ estado: 'ok', itens: bloco.itens, registro, inicial });
    }).catch(() => { if (!cancelado) setAberto({ estado: 'erro' }); });
    return () => { cancelado = true; };
  }, [item, valido, cursoId, tentativa]);

  const aoMudar = useCallback((v: Revisao) => {
    if (!item || item.tipo !== 'erros') return;
    const atual = achar(cursoId, item);
    if (atual) setFalhaSalvar(!armazemRevisao.gravar({ ...atual, revisao: v }));
  }, [item, cursoId]);
  const aoNota = useCallback((nota: Nota, _v: Revisao, agora: number) => {
    if (!item) return false;
    const atual = achar(cursoId, item);
    if (!atual?.revisao) return false;
    const ok = !!armazemRevisao.gravar({ ...atual, espacado: registrarAvaliacao(atual.espacado ?? null, atual.revisao.em, nota, agora) });
    if (ok) void analytics.capture('review_rated', { study_language: cursoId, rating: nota });
    return ok;
  }, [item, cursoId]);
  const aoConcluir = useCallback((nota: Nota | null) => {
    setConcluido(true);
    // Tempo até o bloco voltar: o vencimento gravado pelo FSRS menos o instante da nota (`em`).
    const esp = nota && item ? achar(cursoId, item)?.espacado : undefined;
    if (esp) setEsperas((e) => somarEspera(e, Date.parse(esp.proxima) - Date.parse(esp.em)));
    setStats((s) => ({ ...s, blocos: s.blocos + 1, ...(nota ? { [nota]: s[nota] + 1 } : { correcao: s.correcao + 1 }) }));
    void sincronizarRevisao(cursoId);
  }, [cursoId, item]);

  // Ao concluir o bloco (nota registrada ou erros corrigidos) o foco vai para "Próximo bloco", senão o teclado ficaria perdido.
  useEffect(() => { if (concluido) proximoBtn.current?.focus(); }, [concluido]);
  const seguir = () => { setPos((p) => p + 1); setConcluido(false); };
  const terminou = !!fila && pos >= fila.length;
  useEffect(() => { if (terminou) cabecalho.current?.focus(); }, [terminou]);
  useEffect(() => { if (terminou && stats.blocos > 0) void analytics.capture('review_completed', { study_language: cursoId, blocks: stats.blocos }); }, [terminou]);
  // Depois de terminar, a "próxima revisão" vem da agenda real (inclui o que acabou de ser reagendado).
  const proxima = useMemo(() => (terminou && valido ? agendaDoCurso(cursoId, armazemRevisao.ler(cursoId)).proxima : null), [terminou, valido, cursoId]);

  if (!valido) return <NaoEncontrada />;
  const trilha = [{ rotulo: t.geral.inicio, para: '/' }, { rotulo: t.geral.cursos, para: '/cursos' }, { rotulo: curso!.nome, para: `/curso/${curso!.id}` }, { rotulo: R.titulo }];
  return (
    <div className="pagina pagina-revisao">
      <Navegacao pai={`/curso/${curso!.id}`} idioma={curso!.id} trilha={trilha} />
      <div className="revisao-pagina">
        {!fila && (
          <>
            <h1 ref={cabecalho} tabIndex={-1} className="pagina-h1">{R.titulo}</h1>
            <p className="lead">{R.descricao}</p>
            {agenda.itens.length > 0 && <>
              <p><strong>{R.blocos(agenda.itens.length)}</strong></p>
              <button type="button" className="btn btn-primary" onClick={() => { setFila(agenda.itens); setPos(0); setStats(ZERO); setEsperas(SEM_ESPERAS); void analytics.capture('review_started', { study_language: cursoId, blocks: agenda.itens.length }); }}>{R.comecar}</button>
            </>}
            {agenda.itens.length === 0 && (assinatura.carregando ? <Carregando /> : <p>{agenda.total === 0 ? R.vazio : R.nada}</p>)}
            {agenda.itens.length === 0 && agenda.proxima && <p>{R.proxima(quandoRevisao(agenda.proxima))}</p>}
            <p><Link className="btn btn-ghost" to={`/curso/${curso!.id}`}>{R.voltar}</Link></p>
          </>
        )}
        {fila && item && !terminou && (
          <>
            <p className="ex-n" role="status">{R.bloco(pos + 1, fila.length)}</p>
            {aberto.estado === 'carregando' && <Carregando />}
            {aberto.estado === 'erro' && <div className="vazio"><p>{R.erroCarregar}</p><button type="button" className="btn btn-ghost" onClick={() => setTentativa((n) => n + 1)}>{R.tentar}</button></div>}
            {aberto.estado === 'mudou' && <div className="vazio"><p>{R.semBloco}</p><button type="button" className="btn btn-primary" onClick={seguir}>{R.pular}</button></div>}
            {aberto.estado === 'ok' && (
              <>
                <RevisaoBloco key={`${pos}:${item.aula}:${item.sessao}:${item.bloco}:${tentativa}`} idioma={cursoId} itens={aberto.itens} inicial={aberto.inicial} modo={item.tipo} espacado={aberto.registro.espacado ?? null} revisaoEm={aberto.registro.revisao!.em}
                  aoMudar={aoMudar} aoNota={aoNota} aoConcluir={aoConcluir} />
                {falhaSalvar && <p role="alert">{R.falhaSalvar}</p>}
                {concluido && <p className="ex-acoes"><button type="button" ref={proximoBtn} className="btn btn-primary" onClick={seguir}>{pos + 1 >= fila.length ? R.verResumo : R.proximoBloco}</button></p>}
              </>
            )}
          </>
        )}
        {terminou && (
          <section className="revisao-resumo" aria-labelledby="revisao-resumo-titulo">
            <h1 id="revisao-resumo-titulo" ref={cabecalho} tabIndex={-1} className="pagina-h1">{R.resumoTitulo}</h1>
            <p><strong>{R.resumoBlocos(stats.blocos)}</strong></p>
            <h2>{R.resumoDesempenho}</h2>
            <dl className="revisao-desempenho">
              {(['correcao', 'again', 'hard', 'good', 'easy'] as const).filter((k) => stats[k] > 0).map((k) => <div key={k}><dt>{R.desempenho[k]}</dt><dd>{stats[k]}</dd></div>)}
            </dl>
            {(() => {
              const acerto = proporcaoAcerto(stats), media = mediaEspera(esperas);
              return (acerto || media !== null) && (
                <ul className="revisao-numeros">
                  {acerto && <li>{R.resumoAcerto(acerto.bons, acerto.total, acerto.porcento)}</li>}
                  {media !== null && <li>{R.resumoIntervalo(formatarEspera(media, codigoRevisao()))}</li>}
                </ul>
              );
            })()}
            <p>{proxima ? R.resumoProxima(quandoRevisao(proxima)) : R.resumoSem}</p>
            <p><Link className="btn btn-primary" to={`/curso/${curso!.id}`}>{R.voltar}</Link></p>
          </section>
        )}
      </div>
    </div>
  );
}
