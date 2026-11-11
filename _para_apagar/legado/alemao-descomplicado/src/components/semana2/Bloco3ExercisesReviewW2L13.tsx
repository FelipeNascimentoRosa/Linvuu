import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  BookOpen,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AudioButton } from '../AudioButton';
import {
  SOLVED_EXERCISES_W2L13,
  REVERSE_TRANSLATION_CHALLENGES_W2L13,
  KEY_POINTS_MASTER_W2L13,
} from '../../data/semana2Lesson13Data';

export const Bloco3ExercisesReviewW2L13: React.FC = () => {
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [expandedExercises, setExpandedExercises] = useState<Record<string, boolean>>({
    'ex-A2': true,
    'ex-A5': true,
    'ex-A7': true,
    'ex-A16': true,
    'ex-A19': true,
    'ex-A25': true,
  });

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({ ...prev, [id]: val }));
  };

  const toggleReveal = (id: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExerciseExpand = (id: string) => {
    setExpandedExercises((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAllChallenges = () => {
    setUserInputs({});
    setRevealedAnswers({});
  };

  return (
    <div id="bloco3-exercises-w2l13" className="space-y-12">
      {/* HEADER DO BLOCO 3 */}
      <section className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold tracking-wider uppercase mb-3 border border-purple-400/30">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              Bloco 3 (60 min) · Resolução Comentada & Laboratório de Blindagem
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Gabarito Analítico, Tradução Reversa & Tabela Mestre
            </h2>
            <p className="text-purple-100/90 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Consolidação ativa de todo o conteúdo do Dia 013: gabarito exaustivo dos exercícios A2 a A25 do Kursbuch, laboratório de tradução reversa de blindagem (12 desafios de alta retenção com feedback imediato) e os 17 pontos-chave de fixação definitiva.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-xs text-purple-300 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-purple-500/30">
              Kapitel 6 · A2–A25
            </span>
            <span className="text-xs text-purple-200/80 font-medium">
              Blindagem & Autoavaliação
            </span>
          </div>
        </div>
      </section>

      {/* 3.1 A 3.9 GABARITO COMENTADO DOS EXERCÍCIOS */}
      <section id="sec-3-resolucoes" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Seções 3.1 a 3.9</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Gabarito Comentado dos Exercícios do Kursbuch (A2 a A25)
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            {SOLVED_EXERCISES_W2L13.length} Módulos de Exercícios
          </span>
        </div>

        <div className="space-y-6">
          {SOLVED_EXERCISES_W2L13.map((ex) => {
            const isExpanded = !!expandedExercises[ex.exerciseId];
            return (
              <div key={ex.exerciseId} className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleExerciseExpand(ex.exerciseId)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                        {ex.sourcePage}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{ex.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{ex.description}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-200 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                          <th className="p-2.5 w-12 text-center">#</th>
                          <th className="p-2.5 w-1/3">Enunciado / Pergunta</th>
                          <th className="p-2.5 w-1/3 text-emerald-800 font-bold">Resposta do Gabarito</th>
                          <th className="p-2.5">Justificativa Gramatical</th>
                          <th className="p-2.5 w-16 text-center">Áudio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {ex.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="p-2.5 text-center font-mono text-xs text-slate-400">{item.number}</td>
                            <td className="p-2.5 text-slate-800 font-medium">{item.prompt}</td>
                            <td className="p-2.5 font-bold text-emerald-800">{item.answer}</td>
                            <td className="p-2.5 text-xs text-slate-600">{item.explanation}</td>
                            <td className="p-2.5 text-center">
                              <AudioButton text={item.answer} size="sm" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3.10 & 3.11 TRADUÇÃO REVERSA DE BLINDAGEM */}
      <section id="sec-3-20" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Seções 3.10 & 3.11</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Laboratório de Tradução Reversa de Blindagem (12 Desafios)
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Traduza as sentenças do português para o alemão mentalmente ou digitando no campo antes de revelar o gabarito.
            </p>
          </div>
          <button
            onClick={resetAllChallenges}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer self-start sm:self-auto transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reiniciar Laboratório
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVERSE_TRANSLATION_CHALLENGES_W2L13.map((ch) => {
            const isRevealed = !!revealedAnswers[ch.id];
            const currentInput = userInputs[ch.id] || '';

            return (
              <div
                key={ch.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      Desafio #{ch.id}
                    </span>
                    <button
                      onClick={() => toggleReveal(ch.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-950 cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Ocultar
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Revelar
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm font-black text-slate-900 mb-3">{ch.ptSentence}</p>

                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => handleInputChange(ch.id, e.target.value)}
                    placeholder="Digite sua versão em alemão..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 mb-3"
                  />

                  {isRevealed && (
                    <div className="p-3 bg-white rounded-lg border border-purple-200 shadow-xs mb-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                          Gabarito Canônico:
                        </span>
                        <AudioButton text={ch.deSolution} size="sm" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">{ch.deSolution}</p>

                      <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 space-y-1">
                        <span className="font-semibold text-purple-900 block">Notas de Blindagem:</span>
                        {ch.grammaticalNotes.map((note, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 font-mono italic">
                  Chave: {ch.keyStructure}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3.12 TABELA MESTRE DOS 17 PONTOS-CHAVE */}
      <section id="sec-3-22" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Seção 3.12</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              Tabela Mestre dos 17 Pontos-Chave do Dia 013
            </h3>
          </div>
          <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-md">
            Síntese Conceitual Absoluta
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="p-3 w-48">Conceito / Tópico</th>
                <th className="p-3">Regra de Ouro Sintática & Gramatical</th>
                <th className="p-3 w-64">Exemplo Canônico</th>
                <th className="p-3 w-16 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {KEY_POINTS_MASTER_W2L13.map((pt, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{pt.concept}</td>
                  <td className="p-3 text-slate-700 leading-relaxed">{pt.ruleExplanation}</td>
                  <td className="p-3 font-mono font-semibold text-purple-900 text-xs">{pt.canonicalExample}</td>
                  <td className="p-3 text-center">
                    <AudioButton text={pt.canonicalExample} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
