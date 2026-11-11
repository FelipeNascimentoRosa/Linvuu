import React, { useState } from 'react';
import {
  EXERCICIO_1_IN_ITEMS,
  EXERCICIO_2_AUS_ITEMS,
  EXERCICIO_3_AN_AUF_ITEMS,
  EXERCICIO_4_CASE_DETECTOR,
  EXERCICIO_5_TRADUCAO_REVERSA,
  FillExerciseItem,
} from '../data/lesson08Data';
import { AudioButton } from './AudioButton';
import {
  GraduationCap,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Award,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';

export const Bloco3ExercisesReview08: React.FC = () => {
  // Exercício 1 state
  const [showAllEx1, setShowAllEx1] = useState(false);
  const [revealedEx1, setRevealedEx1] = useState<Record<number, boolean>>({});

  // Exercício 2 state
  const [showAllEx2, setShowAllEx2] = useState(false);
  const [revealedEx2, setRevealedEx2] = useState<Record<number, boolean>>({});

  // Exercício 3 state
  const [showAllEx3, setShowAllEx3] = useState(false);
  const [revealedEx3, setRevealedEx3] = useState<Record<number, boolean>>({});

  // Exercício 4 state
  const [showAllEx4, setShowAllEx4] = useState(false);
  const [revealedEx4, setRevealedEx4] = useState<Record<number, boolean>>({});

  // Exercício 5 (Tradução Reversa) state
  const [showAllReverse, setShowAllReverse] = useState(false);
  const [revealedReverse, setRevealedReverse] = useState<Record<number, boolean>>({});

  // Checklist interativo
  const [checkedList, setCheckedList] = useState<Record<number, boolean>>({});

  const toggleCheck = (id: number) => {
    setCheckedList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderFillExercise = (
    title: string,
    subtitle: string,
    tagId: string,
    items: FillExerciseItem[],
    showAll: boolean,
    setShowAll: (v: boolean) => void,
    revealedMap: Record<number, boolean>,
    toggleSingle: (id: number) => void
  ) => {
    return (
      <div id={tagId} className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-mono">
              Exercício Prático
            </span>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAll ? 'Ocultar Todos os Gabaritos' : 'Revelar Todos os Gabaritos'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {items.map((item) => {
            const isRevealed = showAll || !!revealedMap[item.id];
            return (
              <div
                key={item.id}
                className={`border rounded-lg p-3.5 transition-all flex flex-col justify-between ${
                  isRevealed
                    ? 'border-indigo-200 bg-indigo-50/20'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{item.id.toString().padStart(2, '0')}
                    </span>
                    <button
                      onClick={() => toggleSingle(item.id)}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      {isRevealed ? 'Ocultar' : 'Ver resposta'}
                    </button>
                  </div>

                  {/* Frase com lacuna ou preenchida */}
                  <div className="mt-1.5 text-sm sm:text-base font-medium text-slate-900">
                    <span>{item.fraseAntes} </span>
                    {isRevealed ? (
                      <span className="font-bold text-indigo-600 underline decoration-indigo-400 decoration-2 px-1">
                        {item.gabarito}
                      </span>
                    ) : (
                      <span className="inline-block w-16 border-b-2 border-slate-400 border-dashed text-center font-mono text-xs text-slate-400">
                        ______
                      </span>
                    )}{' '}
                    <span>{item.fraseDepois}</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">{item.frasePt}</p>
                </div>

                {isRevealed && (
                  <div className="mt-3 pt-2 border-t border-indigo-100/80 flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-600 text-[11px] leading-snug">{item.explicacao}</span>
                    <AudioButton text={item.fraseCompletaDe} lang="de-DE" size="sm" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="bloco-3-exercicios-revisao-rodada8" className="space-y-12">
      {/* Banner Principal Bloco 3 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-400 text-slate-950 font-mono">
            Bloco 3 (60 Minutos) · Rodada Extra 08
          </span>
          <span className="text-xs text-indigo-200 font-medium">Laboratório de Fixação & Blindagem</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Exercícios de Fixação, Teste de Casos e Tradução Reversa de Blindagem
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 font-normal leading-relaxed">
          Chegou a hora de fixar cada detalhe: resolva os exercícios canônicos com revelação individual de gabarito e justificativa gramatical, teste seu reflexo no identificador de casos e pratique 20 sentenças em tradução reversa.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* EXERCÍCIO 1: IN, IM, INS, IN DER, IN DIE, IN DEN                           */}
      {/* ========================================================================= */}
      {renderFillExercise(
        'Exercício 1: Complete com im, in der, in den, ins, in die, in den',
        'Dominando Wechselpräposition in com substantivos neutros, masculinos, femininos, plurais e países.',
        'secao-3-1-exercicio-in',
        EXERCICIO_1_IN_ITEMS,
        showAllEx1,
        setShowAllEx1,
        revealedEx1,
        (id) => setRevealedEx1((prev) => ({ ...prev, [id]: !prev[id] }))
      )}

      {/* ========================================================================= */}
      {/* EXERCÍCIO 2: AUS, VON, VOM, ZU, ZUM, ZUR, NACH                            */}
      {/* ========================================================================= */}
      {renderFillExercise(
        'Exercício 2: Complete com aus, von, vom, zu, zum, zur, nach, in die',
        'Diferenciando com precisão absoluta origem física (aus) vs. procedência de pessoas (von) e destinos funcionais (zu) vs. cidades (nach).',
        'secao-3-2-exercicio-aus-zu',
        EXERCICIO_2_AUS_ITEMS,
        showAllEx2,
        setShowAllEx2,
        revealedEx2,
        (id) => setRevealedEx2((prev) => ({ ...prev, [id]: !prev[id] }))
      )}

      {/* ========================================================================= */}
      {/* EXERCÍCIO 3: AM, ANS, AUF DEM, AUF DEN, BEI, BEIM                         */}
      {/* ========================================================================= */}
      {renderFillExercise(
        'Exercício 3: Complete com am, ans, an der, an die, auf dem, auf den, bei, beim',
        'Contraste entre contato vertical e margem líquida (an), superfície horizontal/campo (auf) e permanência profissional (bei).',
        'secao-3-3-exercicio-an-auf-bei',
        EXERCICIO_3_AN_AUF_ITEMS,
        showAllEx3,
        setShowAllEx3,
        revealedEx3,
        (id) => setRevealedEx3((prev) => ({ ...prev, [id]: !prev[id] }))
      )}

      {/* ========================================================================= */}
      {/* EXERCÍCIO 4: IDENTIFICADOR DE CASO & PERGUNTA                              */}
      {/* ========================================================================= */}
      <div id="secao-3-4-detector-casos" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
              Exercício Analítico
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício 4: Detector de Pergunta & Caso (Wo? vs. Wohin? vs. Woher?)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Analise a frase alemã e identifique instantaneamente qual é a pergunta primária e qual caso rege a preposição.
            </p>
          </div>

          <button
            onClick={() => setShowAllEx4(!showAllEx4)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAllEx4 ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAllEx4 ? 'Ocultar Análises' : 'Revelar Todas as Análises'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXERCICIO_4_CASE_DETECTOR.map((item) => {
            const isRevealed = showAllEx4 || !!revealedEx4[item.id];
            return (
              <div
                key={item.id}
                className={`border rounded-xl p-4 transition-all flex flex-col justify-between ${
                  isRevealed
                    ? 'border-amber-200 bg-amber-50/25'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Desafio #{item.id}
                    </span>
                    <button
                      onClick={() =>
                        setRevealedEx4((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="text-xs font-semibold text-amber-700 hover:text-amber-900 cursor-pointer"
                    >
                      {isRevealed ? 'Ocultar' : 'Ver análise completa'}
                    </button>
                  </div>

                  <div className="mt-2">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                      {item.frase}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">{item.traducao}</p>
                  </div>
                </div>

                {isRevealed && (
                  <div className="mt-4 pt-3 border-t border-amber-200/80 space-y-2 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono font-bold">
                        Pergunta: {item.perguntaEsperada}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-mono font-semibold">
                        Caso: {item.casoEsperado}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                        Preposição: {item.preposicaoUsada}
                      </span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      <strong>Por que:</strong> {item.justificativa}
                    </p>
                    <div className="flex justify-end pt-1">
                      <AudioButton text={item.frase} lang="de-DE" size="sm" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXERCÍCIO 5: TRADUÇÃO REVERSA DE BLINDAGEM (20 FRASES)                     */}
      {/* ========================================================================= */}
      <div id="secao-3-5-traducao-reversa" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">
              Treino Ativo de Produção Oral e Escrita
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Tradução Reversa de Blindagem (20 Frases Essenciais)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Leia a frase em português, elabore mentalmente a construção alemã aplicando a contração correta e revele o gabarito.
            </p>
          </div>

          <button
            onClick={() => setShowAllReverse(!showAllReverse)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAllReverse ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAllReverse ? 'Ocultar Todas as Traduções' : 'Revelar Todas as Traduções'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXERCICIO_5_TRADUCAO_REVERSA.map((rev) => {
            const isRevealed = showAllReverse || !!revealedReverse[rev.id];
            return (
              <div
                key={rev.id}
                className={`border rounded-xl p-4 transition-all flex flex-col justify-between ${
                  isRevealed
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Frase #{rev.id.toString().padStart(2, '0')}
                    </span>
                    <button
                      onClick={() =>
                        setRevealedReverse((prev) => ({ ...prev, [rev.id]: !prev[rev.id] }))
                      }
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                    >
                      {isRevealed ? 'Ocultar' : 'Ver tradução alemã'}
                    </button>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-900">{rev.pt}</p>
                </div>

                {isRevealed ? (
                  <div className="mt-3 pt-3 border-t border-emerald-100 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-950 font-mono">{rev.de}</span>
                      <AudioButton text={rev.de} lang="de-DE" size="sm" />
                    </div>
                    <div className="text-[11px] text-slate-600 flex flex-col gap-0.5 pt-1">
                      <span className="text-emerald-800 font-medium">
                        <strong>Preposição:</strong> {rev.preposicaoChave}
                      </span>
                      <span className="text-slate-500">
                        <strong>Nota:</strong> {rev.dicaGramatical}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 pt-2 text-[11px] text-slate-400 italic">
                    Clique em "Ver tradução alemã" para conferir a preposição e a contração exata.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PARTE VI — DICAS FINAIS DE MEMORIZAÇÃO & CHECKLIST                         */}
      {/* ========================================================================= */}
      <div id="secao-3-6-dicas-finais" className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              Parte VI · Síntese Definitiva
            </span>
            <h3 className="text-xl font-bold text-white">
              As 8 Dicas de Ouro para Memorização Absoluta
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          {[
            {
              id: 1,
              title: '1. Wo? = Dativ | Wohin? = Akkusativ',
              desc: 'Esta é a regra mestra. Estático usa Dativo; movimento direcionado usa Acusativo.',
            },
            {
              id: 2,
              title: '2. in + dem = im | in + das = ins',
              desc: 'Nunca diga "in dem Kino" ou "in das Kino"; as contrações são obrigatórias.',
            },
            {
              id: 3,
              title: '3. zu + dem = zum | zu + der = zur',
              desc: 'Sempre com Dativo ao se dirigir a pessoas, serviços ou instituições.',
            },
            {
              id: 4,
              title: '4. nach vs. in die',
              desc: 'nach é para cidades e países neutros sem artigo. Para países com artigo (Schweiz, USA), use in + Acusativo.',
            },
            {
              id: 5,
              title: '5. aus vs. von',
              desc: 'aus vem de dentro de um espaço/país. von vem de uma pessoa, consulta médica ou evento.',
            },
            {
              id: 6,
              title: '6. bei vs. zu',
              desc: 'bei indica permanência com pessoas/empresas (Wo?). zu indica deslocamento em direção a elas (Wohin?).',
            },
            {
              id: 7,
              title: '7. an (vertical) vs. auf (horizontal)',
              desc: 'an der Wand (na parede vertical) vs. auf dem Tisch (sobre a mesa horizontal).',
            },
            {
              id: 8,
              title: '8. Aprenda o substantivo sempre com o artigo',
              desc: 'Saber se é der, die ou das resolve 100% da escolha entre im/ins, zum/zur, am/ans.',
            },
          ].map((dica) => (
            <div
              key={dica.id}
              onClick={() => toggleCheck(dica.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedList[dica.id]
                  ? 'bg-slate-800/90 border-emerald-500/80 text-white'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60'
              }`}
            >
              <CheckSquare
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  checkedList[dica.id] ? 'text-emerald-400' : 'text-slate-500'
                }`}
              />
              <div className="space-y-1">
                <strong className="font-bold block text-white text-xs sm:text-sm">{dica.title}</strong>
                <p className="text-xs text-slate-300 leading-normal">{dica.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center text-xs text-slate-400 font-mono">
          Fim do Guia Definitivo das Preposições Locais Alemãs · Rodada Extra 08 Concluída com Sucesso!
        </div>
      </div>
    </section>
  );
};
