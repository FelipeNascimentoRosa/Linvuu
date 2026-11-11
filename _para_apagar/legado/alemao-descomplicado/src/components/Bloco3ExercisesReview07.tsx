import React, { useState } from 'react';
import {
  EXERCISE_1_FILL_DATA,
  EXERCISE_2_TRANSLATIONS,
  DIALOGUES_8_DATA,
  REVERSE_TRANSLATION_LESSON_7,
  SURVIVAL_KEY_POINTS,
} from '../data/lesson07Data';
import { AudioButton } from './AudioButton';
import {
  GraduationCap,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const Bloco3ExercisesReview07: React.FC = () => {
  // Controle de revelação para Exercício 1
  const [showAllEx1, setShowAllEx1] = useState<boolean>(false);
  const [revealedEx1, setRevealedEx1] = useState<Record<number, boolean>>({});

  // Controle de revelação para Exercício 2
  const [showAllEx2, setShowAllEx2] = useState<boolean>(false);
  const [revealedEx2, setRevealedEx2] = useState<Record<number, boolean>>({});

  // Controle de revelação para Tradução Reversa
  const [showAllReverse, setShowAllReverse] = useState<boolean>(false);
  const [revealedReverse, setRevealedReverse] = useState<Record<number, boolean>>({});

  const toggleEx1 = (id: number) => {
    setRevealedEx1((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEx2 = (id: number) => {
    setRevealedEx2((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleReverse = (id: number) => {
    setRevealedReverse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="bloco-3-exercicios-revisao-rodada7" className="space-y-12">
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-400 text-slate-950 font-mono">
            Bloco 3 (60 Minutos) · Rodada Extra 7
          </span>
          <span className="text-xs text-indigo-200 font-medium">Dia 006.5 · Kapitel 0: Sobrevivência Linguística</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Resolução Comentada, 8 Diálogos Cotidianos & Tradução Reversa
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Fixação imediata através de 34 frases de preenchimento, 20 exercícios de tradução ativa, 8 diálogos situacionais completos com áudios individuais,
          20 desafios de Tradução Reversa de Blindagem com análise sintática e os 10 Mandamentos de Sobrevivência Linguística.
        </p>
      </div>

      {/* 3.1 Exercício 1 — Complete as Frases com as Palavras Adequadas */}
      <div id="secao-3-1-exercicio-1" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício 1 — Complete as Frases com as Palavras Adequadas (34 Frases)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              <em>Ergänzen Sie die passenden Wörter.</em> Selecione do banco de palavras a partícula modal ou expressão exata.
            </p>
          </div>

          <button
            onClick={() => {
              const nextState = !showAllEx1;
              setShowAllEx1(nextState);
              const bulk: Record<number, boolean> = {};
              EXERCISE_1_FILL_DATA.forEach((item) => {
                bulk[item.id] = nextState;
              });
              setRevealedEx1(bulk);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-all shadow-xs"
          >
            {showAllEx1 ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-indigo-600" />}
            <span>{showAllEx1 ? 'Ocultar Todas as Respostas' : 'Revelar Todas as Respostas'}</span>
          </button>
        </div>

        {/* Banco de Palavras Original */}
        <div className="p-4 bg-indigo-50/50 border-b border-indigo-100 text-xs font-mono text-indigo-950 flex flex-wrap gap-2 items-center">
          <span className="font-sans font-bold text-indigo-900 uppercase tracking-wider text-[11px] mr-1">
            Banco de Palavras:
          </span>
          {[
            'ja', 'nein', 'doch', 'mal', 'denn', 'eigentlich', 'vielleicht', 'wohl', 'schon', 'eben',
            'halt', 'bloß', 'etwa', 'überhaupt', 'Quatsch', 'Unsinn', 'schade', 'leider', 'bitte', 'danke',
            'Entschuldigung', 'tut mir leid', 'kein Problem', 'macht nichts', 'echt', 'wirklich', 'unglaublich',
            'ach so', 'na ja', 'na und', 'wieso', 'warum', 'keine Ahnung', 'ich weiß nicht', 'auf jeden Fall'
          ].map((w, idx) => (
            <span key={idx} className="px-1.5 py-0.5 rounded bg-white border border-indigo-200 shadow-2xs">
              {w}
            </span>
          ))}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {EXERCISE_1_FILL_DATA.map((item) => {
              const isRevealed = revealedEx1[item.id] || showAllEx1;
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                    isRevealed
                      ? 'border-indigo-200 bg-indigo-50/30'
                      : 'border-slate-200 bg-slate-50/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center justify-center">
                      {item.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {isRevealed && <AudioButton text={item.fraseCompleta} size="sm" />}
                      <button
                        onClick={() => toggleEx1(item.id)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                      >
                        {isRevealed ? 'Ocultar' : 'Ver Resposta'}
                      </button>
                    </div>
                  </div>

                  <div className="font-mono text-sm text-slate-900 font-semibold">
                    {isRevealed ? (
                      <span>
                        {item.fraseCompleta.split(item.palavraGabarito)[0]}
                        <span className="text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded font-bold underline">
                          {item.palavraGabarito}
                        </span>
                        {item.fraseCompleta.split(item.palavraGabarito).slice(1).join(item.palavraGabarito)}
                      </span>
                    ) : (
                      <span className="text-slate-700">{item.fraseOriginal}</span>
                    )}
                  </div>

                  {isRevealed && (
                    <div className="pt-2 border-t border-indigo-100/80 text-xs space-y-1">
                      <div className="text-slate-700 font-sans italic">{item.traducao}</div>
                      <div className="text-[11px] text-slate-500 font-sans">{item.justificativa}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3.2 Exercício 2 — Traduza as Frases para o Alemão */}
      <div id="secao-3-2-exercicio-2" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 3.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício 2 — Traduza as Frases para o Alemão (20 Sentenças)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              <em>Übersetzen Sie ins Deutsche.</em> Teste sua capacidade de formulação direta antes de checar a resolução.
            </p>
          </div>

          <button
            onClick={() => {
              const nextState = !showAllEx2;
              setShowAllEx2(nextState);
              const bulk: Record<number, boolean> = {};
              EXERCISE_2_TRANSLATIONS.forEach((item) => {
                bulk[item.id] = nextState;
              });
              setRevealedEx2(bulk);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-all shadow-xs"
          >
            {showAllEx2 ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-emerald-600" />}
            <span>{showAllEx2 ? 'Ocultar Todas' : 'Revelar Todas'}</span>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {EXERCISE_2_TRANSLATIONS.map((item) => {
              const isRevealed = revealedEx2[item.id] || showAllEx2;
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                    isRevealed
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-slate-200 bg-slate-50/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center justify-center">
                      {item.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {isRevealed && <AudioButton text={item.audioText} size="sm" />}
                      <button
                        onClick={() => toggleEx2(item.id)}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer"
                      >
                        {isRevealed ? 'Ocultar' : 'Ver Tradução'}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-sans text-slate-800 font-medium">
                    {item.pt}
                  </div>

                  {isRevealed && (
                    <div className="pt-2 border-t border-emerald-200/80 font-mono text-xs sm:text-sm text-emerald-950 font-bold">
                      {item.de}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3.3 Exercício 3 — Os 8 Diálogos Cotidianos Completos */}
      <div id="secao-3-3-dialogos-cotidianos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Seção 3.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício 3 — Os 8 Diálogos Cotidianos Completos com Áudios
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Simulações orais autênticas para treinar a fala coloquial, com reprodução em áudio linha a linha e traduções simultâneas.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DIALOGUES_8_DATA.map((dialogue) => (
              <div
                key={dialogue.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40 shadow-2xs space-y-3"
              >
                <div className="p-3.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{dialogue.titulo}</h4>
                    <span className="text-[11px] text-slate-500 italic">{dialogue.subtitulo}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white rounded border border-slate-200 font-bold text-slate-700">
                    {dialogue.falas.length} falas
                  </span>
                </div>

                <div className="p-3.5 space-y-2.5">
                  {dialogue.falas.map((line, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-amber-900 text-[11px] bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            {line.speaker}:
                          </span>
                          <span className="font-mono font-bold text-slate-900">{line.de}</span>
                        </div>
                        <div className="text-slate-500 pl-6 text-[11px] font-sans">{line.pt}</div>
                      </div>
                      <AudioButton text={line.de} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.4 & 3.5 Tradução Reversa de Blindagem */}
      <div id="secao-3-4-traducao-reversa" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                Seções 3.4 & 3.5
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Tradução Reversa de Blindagem (Português → Alemão) & Gabarito Comentado
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                20 sentenças em português: traduza mentalmente ou no caderno, depois confira o gabarito fonético e a análise sintática detalhada.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const nextState = !showAllReverse;
              setShowAllReverse(nextState);
              const bulk: Record<number, boolean> = {};
              REVERSE_TRANSLATION_LESSON_7.forEach((item) => {
                bulk[item.id] = nextState;
              });
              setRevealedReverse(bulk);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-all shadow-xs"
          >
            {showAllReverse ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-rose-600" />}
            <span>{showAllReverse ? 'Ocultar Todas' : 'Revelar Todas (20)'}</span>
          </button>
        </div>

        <div className="p-6 space-y-3.5">
          {REVERSE_TRANSLATION_LESSON_7.map((item) => {
            const isRevealed = revealedReverse[item.id] || showAllReverse;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                  isRevealed
                    ? 'border-rose-200 bg-rose-50/30'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center justify-center">
                      {item.id}
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-semibold text-slate-900">
                      {item.pt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isRevealed && <AudioButton text={item.de} size="sm" />}
                    <button
                      onClick={() => toggleReverse(item.id)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs transition-all"
                    >
                      {isRevealed ? 'Ocultar' : 'Revelar Gabarito'}
                    </button>
                  </div>
                </div>

                {isRevealed && (
                  <div className="pt-2 border-t border-rose-200/80 space-y-1 text-xs">
                    <div className="font-mono font-bold text-rose-950 text-sm bg-white p-2 rounded border border-rose-200">
                      {item.de}
                    </div>
                    <div className="text-slate-600 text-[11px] leading-relaxed pl-1">
                      <span className="font-semibold text-rose-900">Análise Sintática:</span> {item.justificativa}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.6 Resumo dos Pontos-Chave da Rodada Extra (10 Mandamentos) */}
      <div id="secao-3-6-mandamentos-sobrevivencia" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Seção 3.6
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Resumo dos Pontos-Chave da Rodada Extra — Os 10 Mandamentos de Sobrevivência
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Síntese canônica e diretrizes de fixação imediata para fluência de sobrevivência.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SURVIVAL_KEY_POINTS.map((mand) => (
              <div
                key={mand.numero}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3.5 hover:bg-amber-50/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {mand.numero}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 font-mono">
                    {mand.conceito}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{mand.regra}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
