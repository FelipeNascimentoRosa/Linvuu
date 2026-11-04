import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bloco, Exercicio, Palavra, SessaoAula } from '../lib/aulas';
import { corrigirResposta, resumirExercicios, normalizarResposta as norm } from '../lib/correcaoExercicios';
import { consentimento, definirConsentimento, registrar } from '../lib/medicao';
import { falar, falarLista, falarTrechos, parar, temVoz } from '../lib/audio';
import { trechos } from '../lib/narracao';
import { textos } from '../lib/textos';
import { chaveSessao, lerSessao, salvarSessao } from '../lib/progresso';
import { somErro } from '../lib/sons';
import { useAuth } from '../lib/AuthContext';
import { concluirDia } from './AreaAluno';
import Vuu from './Vuu';
import { LOCALE, dicionario } from '../i18n';
import { explicacaoDoCurso } from '../lib/content';
import colunasJson from '../../content/colunas.json';

const COLUNAS = colunasJson as Record<string, Record<string, string>>;


const ROTULO_COLUNA: Record<string, string> = { termina_em: 'Termina em', forca_na: 'Força na', masc_sg: 'Masculino singular', fem_sg: 'Feminino singular', masc_pl: 'Masculino plural', fem_pl: 'Feminino plural', yo: 'yo', el_ella_usted: 'él / ella / usted', nosotros: 'nosotros', vosotros: 'vosotros', ellos_ustedes: 'ellos / ellas / ustedes', usa_se: 'Usa-se', infinito: 'Infinito', italiano: 'Em italiano', traducao: 'Tradução', quando: 'Quando', equivale: 'Em português', construcao: 'Construção', observacao: 'Observação', singolare: 'Singular', grafia: 'Grafia', interrogativo: 'Interrogativo', lui_lei: 'lui / lei', cor: 'Cor', se_clausola: 'Cláusula com «se»', consequencia: 'Consequência', precisa: 'Você precisa', use: 'Use', parece: 'Parece', significa: 'Significa', masculino_plural: 'Masculino plural', feminino_plural: 'Feminino plural', positivo: 'Positivo', prep_cui: 'Preposição + cui', ordinal: 'Ordinal', termo: 'Termo', contexto: 'Contexto', recurso: 'Recurso', festa: 'Festa', estrategia: 'Estratégia', passato_prossimo: 'Passato prossimo', com_pronome: 'Com pronome', forca: 'Força', duas_frases: 'Duas frases', com_che: 'Com «che»', suposicao: 'Suposição', original: 'Original', relato: 'Relato', attiva: 'Voz ativa', resposta_igual: 'Resposta (também)', resposta_oposta: 'Resposta (nem)', momento: 'Momento', principal: 'Principal', simultaneo: 'Ao mesmo tempo', anterior: 'Antes', lei: 'Lei (cortesia)', tu: 'tu', parlare: 'parlare', vendere: 'vendere', dormire: 'dormire', finire: 'finire', partire: 'partire', prendere: 'prendere', credere: 'credere', scrivere: 'scrivere', alzarsi: 'alzarsi', divertirsi: 'divertirsi', pt: 'Português', nominativo: 'Nominativo', acusativo: 'Acusativo', exemplo: 'Exemplo', pronome: 'Pronome', forma: 'Forma', singular: 'Singular', plural: 'Plural', pais: 'País', auxiliar: 'Auxiliar', participio: 'Particípio passado', padrao: 'Padrão', modal: 'Modal', sentido: 'Sentido', wo: 'Wo? (onde: dativo)', wohin: 'Wohin? (para onde: acusativo)', zu: 'zu (até)', frase: 'Frase', alemao: 'Em alemão', informal: 'Informal', oficial: 'Oficial (24 h)', artigo: 'Artigo', definido: 'Definido', indefinido: 'Indefinido', negativo: 'Negativo', pos1: '1ª posição', pos2: '2ª posição (verbo)', resto: 'Resto', masc_neutro: 'Masculino e neutro', fem_plural: 'Feminino e plural', combinacao: 'Combinação', som: 'Som', resposta: 'Resposta', haben: 'haben', sein: 'sein', uso: 'Uso', comparativo: 'Comparativo', conj1: '1ª conjugação', conj2: '2ª conjugação', conjugacao: 'Conjugação', troca: 'Troca', situacao: 'Situação', preposicao: 'Preposição', posicao: 'Posição', verbo: 'Verbo', tipo: 'Tipo', pista: 'Pista', aspecto: 'Aspecto', imperfectivo: 'Imperfectivo', perfectivo: 'Perfectivo', prefixo: 'Prefixo', par: 'Par', futuro: 'Futuro', ideia: 'Ideia', significado: 'Significado', determinado: 'Determinado (agora)', indeterminado: 'Indeterminado (hábito)', a_pe: 'A pé', transporte: 'De transporte', coisa: 'Coisa', tema: 'Tema', regra: 'Regra', aula: 'Aula', hora: 'Hora', russo: 'Em russo', dia: 'Dia', passado: 'Passado', sujeito: 'Sujeito', infinitivo: 'Infinitivo', parado: 'Parado (onde?)', movimento: 'Movimento (para onde?)', palavra: 'Palavra', genero: 'Gênero', terminacao: 'Terminação', exemplos: 'Exemplos', adjetivo: 'Adjetivo', adverbio: 'Advérbio', frequencia: 'Frequência', pergunta: 'Pergunta', caso: 'Caso', funcao: 'Para que serve', dativo: 'Dativo', instrumental: 'Instrumental', possessivo: 'Possessivo',  genitivo: 'Genitivo', preposicional: 'Preposicional', numero: 'Número', masculino: 'Masculino', feminino: 'Feminino', como: 'Como', erro: 'Erro comum', formal: 'Formal', afirmativa: 'Afirmativa', negativa: 'Negativa', estrutura: 'Estrutura', expressao: 'Expressão', possuidor: 'Possuidor', escrita: 'Escrita', conta: 'Conta', fala: 'Como se diz', partitivo: 'Partitivo', quantidade: 'Quantidade', meio: 'Meio', tonico: 'Pronome tônico', objeto: 'Objeto', pessoa: 'Pessoa', vouloir: 'vouloir (querer)', pouvoir: 'pouvoir (poder)', devoir: 'devoir (dever)', savoir: 'savoir (saber)', nota: 'Nota', motivo: 'Motivo', formula: 'Fórmula', base: 'Base', parler: 'parler', finir: 'finir', etre: 'être', aller: 'aller', imparfait: 'Imparfait', pc: 'Passé composé', tempo: 'Tempo', parte: 'Parte', presente: 'Presente', com_pronomes: 'Com pronomes', fato: 'Fato', definicao: 'Definição', quem: 'Quem fala', pedido: 'Pedido', problema: 'Problema', operacao: 'Operação', fase: 'Fase', etapa: 'Etapa', negacao: 'Negação', registro: 'Tipo', conector: 'Conector', acao: 'Ação', prep: 'Preposição', costume: 'Costume', gatilho: 'Gatilho', modo: 'Modo', conjuncao: 'Conjunção', secao: 'Seção', valor: 'Valor', gerondio: 'Gérondif', ativa: 'Voz ativa', passiva: 'Voz passiva', direto: 'Discurso direto', indireto: 'Discurso indireto', connaitre: 'connaître', voir: 'voir', croire: 'croire', mettre: 'mettre' };
const humanizar = (c: string) => c.charAt(0).toUpperCase() + c.slice(1).replace(/_/g, ' ');
/** Cabeçalho de coluna no idioma do site; chaves que são palavras do idioma estudado (ex.: «haben», «parlare») aparecem como estão. */
const rotuloColuna = (c: string, explicacao: string) => (explicacao === 'pt' ? ROTULO_COLUNA[c] : COLUNAS[explicacao]?.[c]) ?? humanizar(c);

function Audio({ texto, idioma, rotulo }: { texto: string; idioma: string; rotulo?: string }) {
  rotulo = rotulo ?? textos(idioma).ouvir;
  return (
    <button type="button" className="som" aria-label={`${rotulo}: ${texto}`} onClick={() => falar(texto, idioma)}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></svg>
    </button>
  );
}

function Palavras({ itens, idioma }: { itens: Palavra[]; idioma: string }) {
  const T = textos(idioma);
  const unicos = useMemo(() => itens.filter((p, i) => itens.findIndex((q) => norm(q.ru) === norm(p.ru)) === i), [itens]);
  return (
    <ul className="palavras">
      {unicos.map((p) => (
        <li key={p.ru}>
          <div><strong lang={idioma} className="ru">{p.ru}</strong><span className="translit">{p.translit}</span></div>
          <div className="trad">{p.pt}{p.ainda && <span className="ainda" title={T.aindaDica(p.ainda.join(', '))}>{T.ainda}</span>}</div>
          <Audio texto={p.audio ?? p.ru} idioma={idioma} />
        </li>
      ))}
    </ul>
  );
}

export function Tabela({ linhas, explicacao = 'pt' }: { linhas: Record<string, string>[]; explicacao?: string }) {
  const cols = Object.keys(linhas[0] ?? {});
  return (
    <div className="tabela-rolagem">
      <table className="tabela">
        <thead><tr>{cols.map((c) => <th key={c}>{rotuloColuna(c, explicacao)}</th>)}</tr></thead>
        <tbody>{linhas.map((l, i) => <tr key={i}>{cols.map((c) => <td key={c}>{l[c]}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function AvisoMedicao({ idioma }: { idioma: string }) {
  const T = textos(idioma);
  const [c, setC] = useState(consentimento());
  if (c !== null) return null;
  const escolher = (v: 'sim' | 'nao') => { definirConsentimento(v); setC(v); };
  return (
    <div className="aviso-medicao" role="region" aria-label={T.medicaoSaiba}>
      <p>{T.avisoMedicao} <Link to="/privacidade">{T.medicaoSaiba}</Link></p>
      <div className="aviso-medicao-botoes">
        <button type="button" className="btn btn-primary" onClick={() => escolher('sim')}>{T.medicaoSim}</button>
        <button type="button" className="btn btn-ghost" onClick={() => escolher('nao')}>{T.medicaoNao}</button>
      </div>
    </div>
  );
}

function Exercicios({ itens, idioma }: { itens: Exercicio[]; idioma: string }) {
  const T = textos(idioma);
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState<string | null>(null);
  const [ordem, setOrdem] = useState<number[]>([]);
  const [texto, setTexto] = useState('');
  const [res, setRes] = useState<'ok' | 'erro' | 'livre' | null>(null);
  const [acertos, setAcertos] = useState<Record<number, boolean>>({});
  const [fim, setFim] = useState(false);
  const navTeclado = useRef(false); // true depois de um Tab: o Enter passa a agir no botão em foco
  const errosSeguidos = useRef(0); // erros em sequência: o som de erro fica mais baixo a cada um, sem virar alarme
  const ex = itens[i];
  const corrigiveis = itens.filter((x) => x.tipo !== 'producao' && x.tipo !== 'repeat');

  const verificar = () => {
    if (ex.tipo === 'producao' || ex.tipo === 'repeat') { setRes('livre'); return; }
    const ok = corrigirResposta(ex, { escolha, ordem, texto });
    setAcertos((a) => ({ ...a, [i]: ok }));
    registrar({ t: 'ex', idioma, ex: ex.id, tp: ex.tipo, ok: ok ? 1 : 0 });
    setRes(ok ? 'ok' : 'erro');
    errosSeguidos.current = ok ? 0 : errosSeguidos.current + 1;
    if (!ok) somErro(errosSeguidos.current);
  };
  const avancar = () => {
    setEscolha(null); setOrdem([]); setTexto(''); setRes(null);
    if (i + 1 >= itens.length) {
      const aula = Number(/^[a-z]{2,3}-(\d{3})-/.exec(itens[0]?.id ?? '')?.[1] ?? 0);
      const final = { ...acertos };
      const resumo = resumirExercicios(itens, final);
      registrar({ t: 'fim', idioma, aula, ac: resumo.acertos, tot: resumo.total });
      setFim(true);
    } else setI(i + 1);
  };
  const recomecar = () => { errosSeguidos.current = 0; setI(0); setAcertos({}); setFim(false); setEscolha(null); setOrdem([]); setTexto(''); setRes(null); };

  const comOpcoes = ex.opcoes && ex.gabarito !== undefined && ex.tipo !== 'sentence-ordering';
  const pode = ex.tipo === 'producao' || ex.tipo === 'repeat' ? true : ex.tipo === 'sentence-ordering' ? ordem.length > 0 : comOpcoes ? escolha !== null : texto.trim() !== '';

  // Teclado: 1 a 9 escolhem a opção (ou a peça), Enter verifica e avança. Não interfere em campos de texto nem em botões em foco.
  useEffect(() => {
    const aoPonteiro = () => { navTeclado.current = false; };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Tab') { navTeclado.current = true; return; }
      if (fim || e.metaKey || e.ctrlKey || e.altKey) return;
      const alvo = e.target as HTMLElement | null;
      const tag = alvo?.tagName;
      if (e.key === 'Enter') {
        if (tag === 'TEXTAREA' || tag === 'SELECT') return;
        if ((tag === 'BUTTON' || tag === 'A') && navTeclado.current) return; // navegando com Tab: o botão em foco faz a sua própria ação
        e.preventDefault();
        if (res === null) { if (pode) verificar(); } else avancar();
        return;
      }
      if (res !== null || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || alvo?.isContentEditable) return;
      if (!/^[1-9]$/.test(e.key)) return;
      const k = Number(e.key) - 1;
      navTeclado.current = false;
      if (comOpcoes && k < ex.opcoes!.length) { e.preventDefault(); setEscolha(ex.opcoes![k]); }
      else if (ex.tipo === 'sentence-ordering' && k < ex.opcoes!.length && !ordem.includes(k)) { e.preventDefault(); setOrdem((o) => [...o, k]); }
    };
    document.addEventListener('keydown', aoTeclar);
    document.addEventListener('pointerdown', aoPonteiro, true);
    return () => { document.removeEventListener('keydown', aoTeclar); document.removeEventListener('pointerdown', aoPonteiro, true); };
  });

  if (fim) {
    const { acertos: certos, erros } = resumirExercicios(itens, acertos);
    return (
      <div className="ex-resumo">
        {/* Celebração ancorada (MOTION-SPEC): só neste `fim`, que é o momento em
            que `avancar()` já registou o resumo real ({t:'fim', acertos, total})
            na medição — nenhum critério novo de progresso é inventado aqui. */}
        <Vuu estado="celebracao" />
        <h3>{T.acertou(certos, corrigiveis.length)}</h3>
        {erros.length > 0 && <ul>{erros.map((x, indice) => <li key={`${x.id}:${indice}`}><strong>{x.enunciado}</strong> {T.resposta} <span lang={idioma}>{x.gabarito ?? x.respostaEsperada}</span>{x.explicacao && <small> {x.explicacao}</small>}</li>)}</ul>}
        <button type="button" className="btn btn-ghost" onClick={recomecar}>{T.refazer}</button>
      </div>
    );
  }

  return (
    <div className="exercicio">
      <div className="ex-progresso">
        <div className="ex-progresso-meta">
          <span className="ex-n">{T.exercicio(i + 1, itens.length)}</span>
          {Object.keys(acertos).length > 0 && <span className="ex-placar">✓ {Object.values(acertos).filter(Boolean).length}</span>}
        </div>
        <div className="ex-barra" role="progressbar" aria-label={T.exercicio(i + 1, itens.length)} aria-valuemin={0} aria-valuemax={itens.length} aria-valuenow={i + (res ? 1 : 0)}>
          <span style={{ width: `${(100 * (i + (res ? 1 : 0))) / itens.length}%` }} />
        </div>
      </div>
      <p className="ex-enunciado">{ex.enunciado}</p>
      {ex.audio && <div className="ex-audio"><Audio texto={ex.audio} idioma={idioma} /> <span>{T.tocarOuvir}</span></div>}
      {comOpcoes && (
        <div className="ex-opcoes" role="radiogroup" aria-label={T.opcoes}>
          {ex.opcoes!.map((o) => (
            <button key={o} type="button" role="radio" aria-checked={escolha === o} disabled={res !== null} className={`ex-op ${escolha === o ? 'on' : ''} ${res && o === ex.gabarito ? 'certa' : ''} ${res === 'erro' && escolha === o ? 'errada' : ''}`} onClick={() => setEscolha(o)} lang={idioma}>{o}</button>
          ))}
          <small className="ex-dica">{T.teclado(ex.opcoes!.length)}</small>
        </div>
      )}
      {ex.tipo === 'sentence-ordering' && (
        <>
          <div className="ex-montada" aria-live="polite" lang={idioma}>{ordem.length ? ordem.map((k) => ex.opcoes![k]).join(' ') : <em>{T.pecas}</em>}</div>
          <div className="ex-opcoes">
            {ex.opcoes!.map((o, k) => <button key={k} type="button" className="ex-op" disabled={ordem.includes(k) || res !== null} onClick={() => setOrdem([...ordem, k])} lang={idioma}>{o}</button>)}
            <button type="button" className="link" disabled={res !== null || !ordem.length} onClick={() => setOrdem([])}>{T.limpar}</button>
          </div>
        </>
      )}
      {!comOpcoes && ex.tipo !== 'sentence-ordering' && ex.tipo !== 'repeat' && (
        ex.tipo === 'producao'
          ? <textarea className="ex-texto" rows={3} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder={T.escrevaPrivado} lang={idioma} />
          : <input className="ex-texto" value={texto} disabled={res !== null} onChange={(e) => setTexto(e.target.value)} placeholder={idioma === 'ru' ? T.escrevaCirilico : T.escreva} lang={idioma} />
      )}
      <div className="ex-acoes ex-acoes-fixas">
        {res === null ? <button type="button" className="btn btn-primary" disabled={!pode} onClick={verificar}>{ex.tipo === 'producao' ? T.verExemplo : ex.tipo === 'repeat' ? T.mostrarResposta : T.verificar}</button>
          : <button type="button" className="btn btn-primary" onClick={avancar}>{i + 1 >= itens.length ? T.verResultado : T.proximo}</button>}
      </div>
      {res && (
        <div className="ex-retorno">
          {/* Erro gentil ancorado (MOTION-SPEC): aparece ao lado da explicação a
              partir do 2.º erro seguido (`errosSeguidos`, a mesma contagem que já
              atenua o som de erro) — o primeiro erro não é "castigado" com um
              rosto preocupado, e o estado sai assim que um acerto zera a contagem. */}
          {res === 'erro' && errosSeguidos.current >= 2 && <Vuu estado="erro-gentil" />}
          <div className={`ex-feedback ${res}${ex.tipo === 'repeat' ? ' repita' : ''}`} role="status">
            {res === 'ok' && <strong>{T.certo}</strong>}
            {res === 'erro' && <strong>{T.errou} <span lang={idioma}>{ex.gabarito ?? ex.respostaEsperada}</span></strong>}
            {res === 'livre' && ex.tipo === 'repeat' && <><strong lang={idioma}>{ex.respostaEsperada}</strong>{ex.explicacao && <span> {ex.explicacao}</span>}</>}
            {res === 'livre' && ex.tipo !== 'repeat' && <strong>{T.compare} <span lang={idioma}>{ex.respostaEsperada}</span></strong>}
            {ex.explicacao && res !== 'livre' && <span> {ex.explicacao}</span>}
          </div>
        </div>
      )}
      {i <= 1 && <AvisoMedicao idioma={idioma} />}
    </div>
  );
}

/** Explicações em «PASSO 1: … PASSO 2: …» viram uma lista numerada; as demais ficam como parágrafo. */
function Explicacao({ texto }: { texto: string }) {
  const partes = texto.split(/\s*(?:PASSO|PASO|STEP) \d+:\s*/);
  if (partes.length < 3) return <p>{texto}</p>;
  const intro = partes[0].trim();
  return (
    <>
      {intro && <p>{intro}</p>}
      <ol className="passos">{partes.slice(1).map((x, i) => <li key={i}>{x.trim().replace(/^./, (c) => c.toUpperCase())}</li>)}</ol>
    </>
  );
}


/** «Ouvir explicação»: a narradora lê o texto em português e a voz do idioma estudado lê o que está entre «aspas». Só quando o texto está em português. */
function Narrar({ itens, idioma, explicacao }: { itens: string[]; idioma: string; explicacao?: string }) {
  const T = textos(idioma);
  const [lendo, setLendo] = useState(false);
  useEffect(() => () => parar(), []);
  if ((explicacao ?? explicacaoDoCurso(idioma)) !== 'pt') return null;
  const ouvir = async () => { setLendo(true); try { await falarTrechos(itens.flatMap((t) => trechos(t, idioma))); } finally { setLendo(false); } };
  return (
    <div className="narrar-barra">
      {lendo
        ? <button type="button" className="btn btn-ghost" onClick={() => { parar(); setLendo(false); }}>{T.parar}</button>
        : <button type="button" className="btn btn-ghost" onClick={ouvir}>🔊 {T.ouvirExplicacao}</button>}
    </div>
  );
}

/** `explicacao`: língua em que o bloco está escrito (quando a sessão ainda não foi traduzida, o rótulo acompanha o texto). */
export function Gramatica({ b, idioma, explicacao }: { b: Extract<Bloco, { tipo: 'gramatica' }>; idioma: string; explicacao?: string }) {
  const T = textos(idioma);
  const lingua = explicacao ?? explicacaoDoCurso(idioma);
  const rotuloComparacao = dicionario(lingua === 'pt' ? 'pt-BR' : lingua as 'en' | 'es').player.emPortugues;
  return (
    <section className="gramatica">
      <h3 className="bloco-sub">{b.titulo}</h3>
      <Narrar itens={[b.explicacao, ...(b.comparacao ? [`Em português: ${b.comparacao}`] : [])]} idioma={idioma} explicacao={explicacao} />
      <Explicacao texto={b.explicacao} />
      {b.comparacao && <p className="callout comparacao"><strong>{rotuloComparacao}</strong> {b.comparacao}</p>}
      {b.exemplos && <ul className="exemplos">{b.exemplos.map((e) => <li key={e.ru}><div className="ex-linha"><span lang={idioma} className="ru">{e.ru}</span><Audio texto={e.ru.replace(/\s*\(.*?\)\s*$/, '')} idioma={idioma} /></div><small className="trad">{e.pt}</small></li>)}</ul>}
      {b.tabela && <Tabela linhas={b.tabela} explicacao={lingua} />}
      {b.tabelas?.map((t, i) => <div key={i}>{t.titulo && <h4 className="bloco-sub">{t.titulo}</h4>}<Tabela linhas={t.linhas} explicacao={lingua} /></div>)}
      {b.erros && (
        <div className="erros">
          <h4 className="bloco-sub">{T.erros}</h4>
          <ul>{b.erros.map((e) => <li key={e.errado}><span className="errado" lang={idioma}>✗ {e.errado}</span><span className="certo" lang={idioma}>✓ {e.certo} <Audio texto={e.certo} idioma={idioma} /></span><small>{e.motivo}</small></li>)}</ul>
        </div>
      )}
    </section>
  );
}

function Conteudo({ b, idioma, explicacao }: { b: Bloco; idioma: string; explicacao?: string }) {
  const T = textos(idioma);
  const [trad, setTrad] = useState(false);
  const [exemplo, setExemplo] = useState(false);
  switch (b.tipo) {
    case 'intro': return <><p className="callout">{b.texto}</p><Narrar itens={[b.texto]} idioma={idioma} explicacao={explicacao} /></>;
    case 'revisao': return <p className="callout callout-tarefa"><strong>{T.revisao}</strong> {b.enunciado}</p>;
    case 'producao': return (
      <div className="callout callout-tarefa">
        <p><strong>{T.suaVez}</strong> {b.enunciado}</p>
        {b.exemplo && <><button type="button" className="link" onClick={() => setExemplo((v) => !v)}>{exemplo ? T.esconder : T.verExemplo}</button>{exemplo && <p lang={idioma} className="ru">{b.exemplo}</p>}</>}
      </div>
    );
    case 'alfabeto': return (
      <>{b.grupos.map((g) => (
        <section key={g.nome}>
          <h3 className="bloco-sub">{g.nome}</h3>
          <ul className="letras">{g.letras.map((l) => (
            <li key={l.maiuscula}>
              <span className="letra" lang={idioma}>{l.maiuscula} {l.minuscula}{l.nome && <> <Audio texto={l.nome} idioma={idioma} rotulo={T.nomeLetra(l.maiuscula)} /></>}</span>
              <span className="ipa">{l.ipa || T.semSom}</span>
              <span className="som-txt">{l.som}</span>
              <span className="letra-ex"><span lang={idioma}>{l.exemplo}</span> · {l.exemploPt} <Audio texto={l.exemplo} idioma={idioma} /></span>
            </li>
          ))}</ul>
        </section>
      ))}</>
    );
    case 'palavras': return <Palavras itens={b.itens} idioma={idioma} />;
    case 'dialogo': return (
      <section>
        <h3 className="bloco-sub">{b.titulo}</h3>
        {b.contexto && <p className="contexto">{b.contexto}</p>}
        <div className="dialogo-barra">
          <button type="button" className="btn btn-ghost" onClick={() => falarLista(b.linhas.map((l) => l.audio ?? l.ru), idioma)}>{T.ouvirDialogo}</button>
          <button type="button" className="link" onClick={parar}>{T.parar}</button>
          <label className="check"><input type="checkbox" checked={trad} onChange={(e) => setTrad(e.target.checked)} /> {T.mostrarTrad}</label>
        </div>
        <ul className="dialogo">{b.linhas.map((l, i) => (
          <li key={i}><span className="quem">{l.rotulo ?? l.personagem}</span><div><span lang={idioma} className="ru">{l.ru}</span>{trad && <small className="trad">{l.pt}</small>}</div><Audio texto={l.audio ?? l.ru} idioma={idioma} /></li>
        ))}</ul>
      </section>
    );
    case 'texto': return (
      <section>
        <h3 className="bloco-sub">{b.titulo}</h3>
        <p lang={idioma} className="ru texto-ru">{b.ru}</p>
        <div className="dialogo-barra">
          <Audio texto={b.ru} idioma={idioma} rotulo={T.ouvirTexto} />
          <label className="check"><input type="checkbox" checked={trad} onChange={(e) => setTrad(e.target.checked)} /> {T.mostrarTrad}</label>
        </div>
        {trad && <p className="trad">{b.pt}</p>}
        <h4 className="bloco-sub">{T.perguntas}</h4>
        {b.perguntas.map((p) => <details key={p.pergunta} className="pergunta"><summary lang={idioma}>{p.pergunta}</summary><p lang={idioma}>{p.resposta}</p></details>)}
      </section>
    );
    case 'gramatica': return <Gramatica b={b} idioma={idioma} explicacao={explicacao} />;
    case 'exercicios': return <Exercicios itens={b.itens} idioma={idioma} />;
  }
}

export function Sessao({ sessao, idioma, aula, dia, proximo, nomeIdioma, explicacao, compacta = false }: { compacta?: boolean; sessao: SessaoAula; idioma: string; aula: number; dia?: number; proximo?: string; nomeIdioma?: string; explicacao?: string }) {
  const T = textos(idioma);
  const { usuario } = useAuth();
  const [msgFim, setMsgFim] = useState<string | null>(null);
  // Um só "Concluir": fecha a sessão e marca o dia na trilha (e na conta), como o botão do rodapé.
  const concluir = () => { setCompleta(true); if (dia) setMsgFim(concluirDia(idioma, dia, !!usuario)); };
  const chave = chaveSessao(idioma, aula, sessao.sessao);
  const total = sessao.blocos.length;
  const [idx, setIdx] = useState(() => Math.min(lerSessao(chave)?.bloco ?? 0, total - 1));
  const [completa, setCompleta] = useState(() => lerSessao(chave)?.completa ?? false);
  const [voz, setVoz] = useState<boolean | null>(null);
  const [provisorio, setProvisorio] = useState(false);
  const b = sessao.blocos[idx];
  const tituloEtapa = useRef<HTMLHeadingElement>(null);
  const primeiraEtapa = useRef(true);
  useEffect(() => {
    if (primeiraEtapa.current) { primeiraEtapa.current = false; return; }
    tituloEtapa.current?.focus();
  }, [idx, compacta]);

  useEffect(() => { temVoz(idioma).then(setVoz); return () => parar(); }, [idioma]);
  useEffect(() => {
    const ouvir = (e: Event) => setProvisorio((e as CustomEvent<string>).detail === 'voz-do-navegador');
    window.addEventListener('linvuu:fonte-audio', ouvir);
    return () => window.removeEventListener('linvuu:fonte-audio', ouvir);
  }, []);
  useEffect(() => { parar(); salvarSessao(chave, { bloco: idx, completa }); }, [idx, completa, chave]);

  const etapas = (
      <ol className="passos-nav" aria-label={T.blocosSessao}>
        {sessao.blocos.map((x, k) => (
          <li key={k}><button type="button" className={`passo ${k === idx ? 'atual' : ''} ${k < idx || completa ? 'feito' : ''}`} aria-current={k === idx ? 'step' : undefined} onClick={() => setIdx(k)}><span>{k + 1}</span> {T.rotuloBloco[x.tipo]}</button></li>
        ))}
      </ol>
  );

  return (
    <div className={`sessao${compacta ? " app-sessao" : ""}`}>
      {compacta && <div className="app-etapa-progresso"><span>{T.bloco(idx + 1, total, b.min)}</span><strong>{completa ? total : idx + 1}/{total}</strong><progress max={total} value={completa ? total : idx} aria-label={T.blocosSessao} /></div>}
      {voz === false && <p className="nota">{T.semVoz(nomeIdioma ?? idioma)}</p>}
      {provisorio && <p className="nota nota-audio" role="status">{T.provisorio}</p>}
      {compacta ? <details className="app-navegador-etapas"><summary><span>{T.blocosSessao}</span><span>{idx + 1}/{total} <span aria-hidden="true">⌄</span></span></summary>{etapas}</details> : etapas}
      <div className="bloco">
        <div className="bloco-topo"><h2 ref={tituloEtapa} className={compacta ? "app-etapa-titulo" : undefined} tabIndex={-1}>{T.rotuloBloco[b.tipo]}</h2><span>{T.bloco(idx + 1, total, b.min)}</span></div>
        <Conteudo key={idx} b={b} idioma={idioma} explicacao={explicacao} />
      </div>
      <div className="sessao-nav">
        <button type="button" className="btn btn-ghost" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>{T.voltar}</button>
        {idx < total - 1
          ? <button type="button" className="btn btn-primary" onClick={() => setIdx(idx + 1)}>{T.continuar}</button>
          : <button type="button" className="btn btn-primary" onClick={concluir}>{completa ? T.concluida : T.concluir}</button>}
      </div>
      {idx === total - 1 && (completa || proximo) && (
        <p className="concluida" role="status">{completa && (msgFim ?? T.concluidaNav)} {proximo && <Link to={proximo} className="btn btn-primary concluida-prox">{T.proxSessao}</Link>}</p>
      )}
    </div>
  );
}
