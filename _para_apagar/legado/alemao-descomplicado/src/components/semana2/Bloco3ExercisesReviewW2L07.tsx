import React, { useState } from 'react';
import {
  REVERSE_TRANSLATION_ITEMS,
  KEY_POINTS_DAY_007,
  HOTEL_PROBLEMS_A15,
  NOMINATIV_A16_ITEMS,
  AKKUSATIV_A17_ITEMS,
  CITY_PLACES_A18,
  SIGHTSEEING_MUNICH,
  MUSEUMS_A26_TABLE,
} from '../../data/semana2Lesson07Data';
import { AudioButton } from '../AudioButton';
import {
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const Bloco3ExercisesReviewW2L07: React.FC = () => {
  // Estado para o laboratório de Tradução Reversa de Blindagem
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  // Exercício A15 interativo
  const [a15UserInputs, setA15UserInputs] = useState<Record<number, string>>({});
  const [showA15Answers, setShowA15Answers] = useState<boolean>(false);

  // Accordion dos exercícios do livro
  const [expandedExercise, setExpandedExercise] = useState<string | null>('reversa');

  const toggleAccordion = (id: string) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const handleReveal = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAllReverse = () => {
    setUserInputs({});
    setRevealedSolutions({});
  };

  return (
    <section id="bloco3-semana2-aula7" className="space-y-12">
      {/* Banner de Abertura do Bloco 3 */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-purple-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 007
            </span>
            <span className="px-3 py-1 bg-purple-500/30 text-purple-200 text-xs font-semibold rounded-full border border-purple-400/30">
              Kapitel 3, Teil A
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 3 (60 Minutos) — Resolução Comentada & Tradução Reversa
          </h2>
          <p className="text-purple-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Consolidação prática com resolução integral comentada de todas as atividades do livro (A14 a A29), laboratório interativo de Tradução Reversa de Blindagem (10 sentenças reais) e síntese dos pontos-chave.
          </p>
        </div>
      </div>

      {/* 3.14 & 3.15 — Tradução Reversa de Blindagem (Português → Alemão) */}
      <div id="sec-3-14" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              3.14
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Laboratório de Tradução Reversa de Blindagem (10 Desafios)
              </h3>
              <p className="text-xs text-slate-500">
                Produza ativamente em alemão antes de conferir a solução e o gabarito comentado
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const allRev: Record<number, boolean> = {};
                REVERSE_TRANSLATION_ITEMS.forEach((it) => (allRev[it.id] = true));
                setRevealedSolutions(allRev);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
            >
              Revelar Todas
            </button>
            <button
              onClick={resetAllReverse}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Limpar campos"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {REVERSE_TRANSLATION_ITEMS.map((item) => {
            const isRevealed = revealedSolutions[item.id];
            const userText = userInputs[item.id] || '';
            const isFilled = userText.trim().length > 0;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                      Desafio #{item.id}
                    </span>
                    <div className="font-semibold text-sm text-slate-900">
                      {item.ptSentence}
                    </div>
                  </div>
                  <button
                    onClick={() => handleReveal(item.id)}
                    className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isRevealed ? 'Ocultar' : 'Ver Gabarito'}</span>
                  </button>
                </div>

                {/* Campo de digitação */}
                <div>
                  <input
                    type="text"
                    placeholder="Digite sua versão em alemão aqui..."
                    value={userText}
                    onChange={(e) =>
                      setUserInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono"
                  />
                </div>

                {/* Gabarito e Análise Gramatical Revelados */}
                {isRevealed && (
                  <div className="pt-3 border-t border-purple-100 bg-purple-50/50 p-3.5 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-mono font-bold text-sm text-purple-950">
                        {item.deSolution}
                      </div>
                      <AudioButton text={item.deSolution} size="sm" />
                    </div>
                    <div className="space-y-1 text-slate-700 pt-1">
                      <span className="font-bold text-[10px] uppercase text-purple-900 block">
                        Pontos Gramaticais de Blindagem:
                      </span>
                      {item.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.1 a 3.13 — Central de Resoluções Comentadas do Livro */}
      <div id="sec-3-resolucoes" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              3.1–3.13
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Resoluções Comentadas do Livro (A14 a A29)
              </h3>
              <p className="text-xs text-slate-500">
                Consulta integral com comentários estruturais e pedagógicos
              </p>
            </div>
          </div>
        </div>

        {/* Acordeão de Atividades */}
        <div className="space-y-3">
          {/* A15 Resolução */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('a15')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 cursor-pointer"
            >
              <span>3.2 Exercício A15 — Ich kann nicht ... (Completar Verbos)</span>
              {expandedExercise === 'a15' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedExercise === 'a15' && (
              <div className="p-4 bg-white space-y-2 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {HOTEL_PROBLEMS_A15.map((p) => (
                    <div key={p.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900">{p.fraseCompleta}</span>
                        <span className="text-[10px] text-slate-500 block">{p.traducao}</span>
                      </div>
                      <span className="font-mono text-blue-700 font-bold">{p.verbo}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* A16 Resolução */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('a16')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 cursor-pointer"
            >
              <span>3.3 Exercício A16 — Die Nomengruppe im Nominativ (Artigo + Adjetivo)</span>
              {expandedExercise === 'a16' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedExercise === 'a16' && (
              <div className="p-4 bg-white space-y-2 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {NOMINATIV_A16_ITEMS.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{item.fraseCompleta}</span>
                      <span className="font-mono text-blue-700 font-bold">{item.artigoAdjetivo} ({item.genero})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* A17 Resolução */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('a17')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 cursor-pointer"
            >
              <span>3.4 Exercício A17 — Die Nomengruppe im Akkusativ</span>
              {expandedExercise === 'a17' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedExercise === 'a17' && (
              <div className="p-4 bg-white space-y-2 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {AKKUSATIV_A17_ITEMS.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{item.fraseCompleta}</span>
                      <span className="font-mono text-indigo-700 font-bold">{item.acusativoCorreto}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* A18 Resolução */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('a18')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 cursor-pointer"
            >
              <span>3.5 Exercício A18 — Was es in einer Stadt alles gibt (15 Locais e Funções)</span>
              {expandedExercise === 'a18' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedExercise === 'a18' && (
              <div className="p-4 bg-white space-y-2 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {CITY_PLACES_A18.map((item) => (
                    <div key={item.id} className="p-2 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-[10px] text-slate-500 block">{item.atividade}</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{item.localCorreto}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3.16 — Resumo dos Pontos-Chave do Dia 007 */}
      <div id="sec-3-16" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              3.16
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Resumo dos Pontos-Chave do Dia 007 (Semana 2)
              </h3>
              <p className="text-xs text-slate-500">
                Síntese consolidada das regras gramaticais, verbos e conteúdos do dia
              </p>
            </div>
          </div>
          <AudioButton
            text="Zusammenfassung Tag 7: Nur der Maskulin ändert sich im Akkusativ zu den und einen neuen. Verben mit Akkusativ: möchten, brauchen, haben, sehen, lesen, trinken, essen."
            label="🇩🇪 Resumo em Áudio"
            size="sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Conceito Fundamental</th>
                <th className="py-3 px-4 font-bold">Regra Prática & Aplicação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {KEY_POINTS_DAY_007.map((pt, idx) => (
                <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 w-1/3">
                    {pt.conceito}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {pt.regra}
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
