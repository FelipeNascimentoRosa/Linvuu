import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercicio } from '../lib/aulas';
import { corrigirResposta } from '../lib/correcaoExercicios';
import { falar, parar } from '../lib/audio';
import { textos } from '../lib/textos';
import { avancarRevisao, novaRodada, pendentesRevisao, type Revisao } from '../lib/revisao/revisaoModelo';
import { NOTAS, fsrsDoRegistro, notasPermitidas, previsoesDaVolta, rotuloIntervalo, type Espacado, type Nota } from '../lib/revisao/espacadoModelo';
import { acaoDaTecla } from '../lib/revisaoWeb/atalhos';
import { codigoRevisao, intervaloFalado, intervaloVisivel, textosRevisao } from '../lib/revisaoWeb/textos';

/** Revisão de UM bloco de exercícios no Web: só os que o aluno errou, com correção automática, e no fim a nota (FSRS) quando é uma volta espaçada.
 *  Teclado (só com o foco dentro desta região e fora de campos de texto, WCAG 2.1.4): Enter ou Espaço avançam, R repete o áudio, 1 a 4 escolhem a nota. */
export function RevisaoBloco({ idioma, itens, inicial, modo, espacado, revisaoEm, aoMudar, aoNota, aoConcluir }: {
  idioma: string; itens: Exercicio[]; inicial: Revisao; modo: 'erros' | 'espacado';
  /** quando a revisão dos erros deste bloco terminou (âncora do FSRS na primeira volta) */
  revisaoEm: string;
  /** estado FSRS atual do bloco (só na volta espaçada), para prever o intervalo de cada botão */
  espacado: Espacado | null;
  aoMudar: (v: Revisao) => void;
  /** grava a nota escolhida; devolve false se o aparelho não aceitou */
  aoNota: (nota: Nota, v: Revisao, agora: number) => boolean;
  /** erros corrigidos (modo erros) ou nota registrada (modo espacado): o bloco está concluído */
  aoConcluir: (nota: Nota | null, v: Revisao) => void;
}) {
  const R = textosRevisao(), T = textos(idioma), cod = codigoRevisao();
  const lingua = idioma === 'br' ? 'pt-BR' : idioma;
  const [v, setV] = useState(inicial);
  const [falhou, setFalhou] = useState(false);
  const [feito, setFeito] = useState<{ nota: Nota; rotulo: string } | null>(null);
  const [aviso, setAviso] = useState('');
  const regiao = useRef<HTMLElement>(null), titulo = useRef<HTMLHeadingElement>(null), pergunta = useRef<HTMLParagraphElement>(null), concluido = useRef(false), seguirBtn = useRef<HTMLButtonElement>(null);
  const agora = useMemo(() => Date.now(), []);
  const atual = v.fila[v.indice], ex = itens[atual];
  const pend = pendentesRevisao(v), certas = v.origem.length - pend.length;
  const opcoes = !!ex.opcoes && ex.gabarito !== undefined && ex.tipo !== 'sentence-ordering';
  const pode = ex.tipo === 'sentence-ordering' ? v.ordem.length > 0 : opcoes ? v.escolha !== null : v.texto.trim().length > 0;
  const acertouDePrimeira = v.rodada === 1 && pend.length === 0;
  const liberadas = notasPermitidas(acertouDePrimeira);
  const previsoes = useMemo(() => (modo === 'espacado' ? previsoesDaVolta(espacado, revisaoEm, agora) : null), [modo, espacado, revisaoEm, agora]);
  const notasAbertas = v.fim && modo === 'espacado' && !!previsoes && !feito;

  const mudar = (n: Revisao) => { setV(n); aoMudar(n); };
  const editar = (d: Partial<Revisao>) => mudar({ ...v, ...d, em: new Date().toISOString() });
  const verificar = () => {
    if (!pode || v.resultado !== null) return;
    const ok = corrigirResposta(ex, { escolha: v.escolha, ordem: v.ordem, texto: v.texto });
    editar({ resultado: ok ? 'ok' : 'erro', respostas: { ...v.respostas, [atual]: ok } });
    setAviso(ok ? R.correta : `${R.incorreta}. ${R.resposta} ${ex.gabarito ?? ex.respostaEsperada ?? ''}`);
  };
  const seguir = () => { parar(); setAviso(''); mudar(avancarRevisao(v)); };
  const escolher = (nota: Nota) => {
    if (!previsoes || !liberadas.includes(nota) || feito) return;
    const ok = aoNota(nota, v, agora);
    setFalhou(!ok);
    if (ok) { setFeito({ nota, rotulo: rotuloIntervalo(previsoes[nota], agora) }); concluido.current = true; aoConcluir(nota, v); }
  };
  // Modo erros: quando o bloco termina sem erro pendente, ele está concluído (a volta espaçada começa a contar daí).
  useEffect(() => { if (modo === 'erros' && v.fim && pend.length === 0 && !concluido.current) { concluido.current = true; aoConcluir(null, v); } }, [modo, v, pend.length, aoConcluir]);
  // Depois de conferir, o foco vai para "Próxima questão": a opção clicada fica desabilitada e o foco cairia no vazio (e com ele os atalhos).
  useEffect(() => { if (v.resultado !== null) seguirBtn.current?.focus(); }, [v.resultado, v.indice, v.rodada]);
  useEffect(() => { if (v.fim) titulo.current?.focus(); else pergunta.current?.focus(); }, [v.indice, v.rodada, v.fim]);
  useEffect(() => () => parar(), []);

  const aoTeclar = (e: React.KeyboardEvent<HTMLElement>) => {
    const alvo = e.target as HTMLElement;
    const acao = acaoDaTecla(
      { key: e.key, ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey, repeat: e.repeat, isComposing: e.nativeEvent.isComposing },
      { dentro: true, tag: alvo.tagName, editavel: alvo.isContentEditable, radio: alvo.getAttribute('role') === 'radio', podeAvancar: !v.fim && (v.resultado !== null || pode), notasAbertas, notasLiberadas: liberadas, temAudio: !v.fim && !!ex.audio },
    );
    if (!acao) return;
    e.preventDefault();
    if (acao.tipo === 'avancar') { if (v.resultado === null) verificar(); else seguir(); }
    else if (acao.tipo === 'repetir-audio') void falar(ex.audio!, idioma);
    else escolher(acao.nota);
  };
  const resposta = (e: Exercicio) => e.gabarito ?? e.respostaEsperada;
  const primeira = fsrsDoRegistro(null, v.em);
  const rotuloVolta = primeira ? intervaloVisivel(rotuloIntervalo(primeira, Date.parse(v.em)), cod) : '';

  return (
    <section ref={regiao} className="revisao-web" role="region" aria-label={R.regiao} onKeyDown={aoTeclar}>
      <header className="revisao-web-topo">
        <h2 id="revisao-bloco-titulo" ref={titulo} tabIndex={-1}>{v.fim ? (modo === 'erros' && !pend.length ? R.fimErros : R.titulo) : R.titulo}</h2>
        <p className="revisao-web-meta">{R.rodada} {v.rodada} · {certas}/{v.origem.length} {R.concluidas}</p>
      </header>
      {!v.fim ? (
        <div className="exercicio" key={`${v.rodada}:${v.indice}`}>
          <p className="ex-n">{R.questao} {v.indice + 1} {R.de} {v.fila.length}</p>
          <div className="ex-barra" role="progressbar" aria-label={`${R.questao} ${v.indice + 1} ${R.de} ${v.fila.length}`} aria-valuemin={0} aria-valuemax={v.fila.length} aria-valuenow={v.indice + (v.resultado ? 1 : 0)}>
            <span style={{ width: `${(100 * (v.indice + (v.resultado ? 1 : 0))) / v.fila.length}%` }} />
          </div>
          <p className="ex-enunciado" id="revisao-pergunta" ref={pergunta} tabIndex={-1}>{ex.enunciado}</p>
          {ex.audio && <div className="ex-audio"><button type="button" className="btn btn-ghost" aria-label={`${R.ouvir}: ${ex.audio}`} onClick={() => void falar(ex.audio!, idioma)}>{R.ouvir}</button><small>{R.repetirAudio}</small></div>}
          {opcoes && (
            <div className="ex-opcoes" role="radiogroup" aria-labelledby="revisao-pergunta" onKeyDown={(e) => {
              if (v.resultado || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
              e.preventDefault();
              const lista = ex.opcoes!, sel = Math.max(0, lista.indexOf(v.escolha ?? ''));
              const n = e.key === 'Home' ? 0 : e.key === 'End' ? lista.length - 1 : (sel + (['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 1) + lista.length) % lista.length;
              editar({ escolha: lista[n] });
              e.currentTarget.querySelectorAll<HTMLButtonElement>('[role=radio]')[n]?.focus();
            }}>
              {ex.opcoes!.map((o, n) => (
                <button key={o} type="button" role="radio" aria-checked={v.escolha === o} tabIndex={v.escolha === o || (v.escolha === null && n === 0) ? 0 : -1} disabled={v.resultado !== null} lang={lingua}
                  className={`ex-op ${v.escolha === o ? 'on' : ''} ${v.resultado && o === ex.gabarito ? 'certa' : ''} ${v.resultado === 'erro' && v.escolha === o ? 'errada' : ''}`} onClick={() => editar({ escolha: o })}>{o}</button>
              ))}
            </div>
          )}
          {ex.tipo === 'sentence-ordering' && (
            <>
              <div className="ex-montada" aria-live="polite" lang={lingua}>{v.ordem.length ? v.ordem.map((k) => ex.opcoes![k]).join(' ') : <em>{R.pecas}</em>}</div>
              <div className="ex-opcoes">
                {ex.opcoes!.map((o, k) => <button key={k} type="button" className="ex-op" lang={lingua} disabled={v.resultado !== null || v.ordem.includes(k)} onClick={() => editar({ ordem: [...v.ordem, k] })}>{o}</button>)}
                <button type="button" className="link" disabled={v.resultado !== null || !v.ordem.length} onClick={() => editar({ ordem: [] })}>{R.limpar}</button>
              </div>
            </>
          )}
          {!opcoes && ex.tipo !== 'sentence-ordering' && (
            <input className="ex-texto" aria-labelledby="revisao-pergunta" lang={lingua} maxLength={8000} autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder={R.escreva} value={v.texto} disabled={v.resultado !== null}
              onChange={(e) => editar({ texto: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && pode && !v.resultado) { e.preventDefault(); verificar(); } }} />
          )}
          <div className="ex-acoes ex-acoes-fixas">
            {v.resultado === null
              ? <button type="button" className="btn btn-primary" disabled={!pode} onClick={verificar}>{R.confirmar}</button>
              : <button type="button" ref={seguirBtn} className="btn btn-primary" onClick={seguir}>{v.indice === v.fila.length - 1 ? R.terminar : R.seguir}</button>}
          </div>
          <div role="status" aria-live="polite" className={v.resultado ? `ex-feedback ${v.resultado}` : 'sr-only'}>
            {v.resultado && <><strong>{aviso}</strong>{ex.explicacao && <span> {ex.explicacao}</span>}</>}
          </div>
          <small className="ex-dica">{R.atalhos}</small>
        </div>
      ) : (
        <div className="revisao-web-fim">
          {modo === 'erros' && (pend.length > 0
            ? <>
                <p>{R.restam(pend.length)}</p>
                <button type="button" className="btn btn-primary" onClick={() => { setAviso(''); mudar(novaRodada(v)); }}>{R.repetir(pend.length)}</button>
              </>
            : <p>{R.voltaEm(rotuloVolta)}</p>)}
          {modo === 'espacado' && previsoes && (
            <div className="revisao-notas" role="group" aria-labelledby="revisao-notas-titulo">
              <h3 id="revisao-notas-titulo">{R.notaTitulo}</h3>
              <p>{acertouDePrimeira ? R.notaAcertou : R.notaErrou}</p>
              <div className="revisao-notas-botoes">
                {NOTAS.map((nota, k) => {
                  const rotulo = rotuloIntervalo(previsoes[nota], agora);
                  const ativa = !feito && liberadas.includes(nota);
                  return (
                    <button key={nota} type="button" className={`btn ${ativa ? 'btn-primary' : 'btn-ghost'}`} disabled={!ativa} aria-pressed={feito?.nota === nota} aria-keyshortcuts={String(k + 1)}
                      aria-label={`${R.nomes[nota]}, ${R.notaVolta(intervaloFalado(rotulo, cod))}`} onClick={() => escolher(nota)}>
                      <span>{R.nomes[nota]}</span><small aria-hidden="true">{intervaloVisivel(rotulo, cod)}</small>
                    </button>
                  );
                })}
              </div>
              <p role="status" aria-live="polite">{feito ? R.notaOk(intervaloFalado(feito.rotulo, cod)) : falhou ? R.falhaSalvar : ''}</p>
              <small className="ex-dica">{R.atalhos}</small>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
