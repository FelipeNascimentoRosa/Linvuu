import React, { useState } from 'react';
import {
  BOOK_EXERCISES_AULA_11,
  REVERSE_TRANSLATION_CHALLENGES_L11,
  KEY_POINTS_L11,
} from '../../data/semana2Lesson11Data';
import { AudioButton } from '../AudioButton';
import {
  GraduationCap,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  ShieldCheck,
  ListOrdered,
} from 'lucide-react';

export const Bloco3ExercisesReviewW2L11: React.FC = () => {
  const [openExerciseId, setOpenExerciseId] = useState<string | null>('ex-a2');
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const toggleExercise = (id: string) => {
    setOpenExerciseId(openExerciseId === id ? null : id);
  };

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({ ...prev, [id]: val }));
  };

  const toggleRevealSolution = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAllChallenges = () => {
    setUserInputs({});
    setRevealedSolutions({});
  };

  return (
    <section id="bloco3-semana2-aula11" className="space-y-12">
      {/* Banner de Introdução do Bloco 3 */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Bloco 3 (60 Minutos) — Resolução Comentada & Tradução Reversa de Blindagem
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Gabarito Integral A2–A19, Laboratório Reverso & Tabela Mestre de 15 Pontos
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Consolide o aprendizado com o gabarito detalhado de cada exercício do livro (Kapitel 5, Teil A),
            teste sua precisão sintática no <strong className="text-emerald-300">Laboratório de Tradução Reversa de Blindagem</strong> (10 sentenças em alemão culto)
            e revise os 15 mandamentos da gramática do Dia 011.
          </p>
        </div>
      </div>

      {/* 3.1 a 3.10 Resoluções Comentadas do Livro */}
      <div id="sec-3-resolucoes" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4" /> Seções 3.1–3.10
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
              Gabarito Analítico (p. 111–119)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Resoluções Comentadas dos Exercícios do Livro (A2 a A19)
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Clique em cada bloco de exercício para abrir o gabarito completo com justificativas sintáticas.
          </p>
        </div>

        <div className="space-y-3">
          {BOOK_EXERCISES_AULA_11.map((ex) => {
            const isOpen = openExerciseId === ex.id;
            return (
              <div
                key={ex.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleExercise(ex.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        {ex.page}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{ex.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{ex.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                      {ex.items.length} itens
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                          <tr>
                            <th className="p-2.5 w-12">Nº</th>
                            <th className="p-2.5">Item / Pergunta</th>
                            <th className="p-2.5">Gabarito Oficial & Análise</th>
                            <th className="p-2.5 text-center w-16">Áudio</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          {ex.items.map((it, itIdx) => (
                            <tr key={itIdx} className="hover:bg-white transition-colors">
                              <td className="p-2.5 font-mono text-slate-400 font-semibold">{it.number}</td>
                              <td className="p-2.5 font-medium text-slate-700">{it.question}</td>
                              <td className="p-2.5 font-mono font-bold text-emerald-950">
                                {it.answer}
                                {it.notes && (
                                  <span className="block text-[11px] font-sans font-normal text-slate-500 italic mt-0.5">
                                    {it.notes}
                                  </span>
                                )}
                              </td>
                              <td className="p-2.5 text-center">
                                <AudioButton text={`${it.question} ... ${it.answer}`} size="sm" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.11–3.12 Laboratório de Tradução Reversa de Blindagem */}
      <div id="sec-3-20" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Seções 3.11–3.12
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Laboratório de Tradução Reversa de Blindagem (10 Desafios Críticos)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Traduza as sentenças do português para o alemão. Digite no campo, teste sua precisão sintática e compare com o gabarito.
            </p>
          </div>

          <button
            onClick={resetAllChallenges}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Laboratório
          </button>
        </div>

        <div className="space-y-4">
          {REVERSE_TRANSLATION_CHALLENGES_L11.map((item) => {
            const isRevealed = revealedSolutions[item.id];
            const currentVal = userInputs[item.id] || '';

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-mono">
                    Desafio #{item.id}
                  </span>
                  <button
                    onClick={() => toggleRevealSolution(item.id)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                  >
                    {isRevealed ? 'Ocultar Resposta' : 'Revelar Solução'}
                  </button>
                </div>

                <div className="text-sm font-semibold text-slate-900">
                  <span className="text-slate-400 font-normal mr-2">PT:</span>
                  {item.pt}
                </div>

                {/* Input do Aluno */}
                <div>
                  <input
                    type="text"
                    value={currentVal}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder="Digite sua versão em alemão aqui..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                  />
                </div>

                {/* Resposta e Análise Reveladas */}
                {isRevealed && (
                  <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-900 font-mono">
                        Alemão Esperado (Sintaxe Canônica):
                      </span>
                      <AudioButton text={item.deExpected} size="sm" />
                    </div>
                    <p className="font-mono font-bold text-slate-900 text-sm">
                      {item.deExpected}
                    </p>
                    <div className="pt-2 border-t border-indigo-100 text-slate-600 text-[11px]">
                      <strong className="text-indigo-950">Blindagem Gramatical:</strong> {item.grammaticalBreakdown}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.13 Resumo dos Pontos-Chave do Dia 011 */}
      <div id="sec-3-22" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Seção 3.13
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100">
              15 Mandamentos da Aula 11
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Tabela Mestre dos 15 Pontos-Chave (Dia 011)
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Síntese definitiva das regras de ouro, exceções críticas e estruturas de fixação.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3 w-44">Conceito Gramatical</th>
                <th className="p-3">Regra de Ouro</th>
                <th className="p-3">Exemplo Canônico</th>
                <th className="p-3 text-center w-16">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {KEY_POINTS_L11.map((kp, idx) => (
                <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{kp.concept}</td>
                  <td className="p-3 text-slate-700 font-medium leading-relaxed">{kp.rule}</td>
                  <td className="p-3 font-mono text-amber-900 font-semibold text-[11px]">{kp.example}</td>
                  <td className="p-3 text-center">
                    <AudioButton text={`${kp.concept}. ${kp.rule}. ${kp.example}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
