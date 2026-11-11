import React, { useState } from 'react';
import {
  EXERCISE_A23_ITEMS,
  EXERCISE_A24_ITEMS,
  EXERCISE_A25_CATEGORIES,
  EXERCISE_A26_DIALOGUES,
  EXERCISE_A27_DAYS,
  EXERCISE_A28_SCHEDULE,
  EXERCISE_C7_SENTENCES,
  REVERSE_TRANSLATION_LESSON_5,
  KEY_POINTS_LESSON_5,
} from '../data/lesson05Data';
import { AudioButton } from './AudioButton';
import {
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const Bloco3ExercisesReview05: React.FC = () => {
  const [revealedA23, setRevealedA23] = useState<boolean>(false);
  const [revealedA24, setRevealedA24] = useState<boolean>(false);
  const [revealedC7, setRevealedC7] = useState<boolean>(false);
  const [revealedReverse, setRevealedReverse] = useState<Record<number, boolean>>({});
  const [allReverseRevealed, setAllReverseRevealed] = useState<boolean>(false);

  const toggleReverse = (id: number) => {
    setRevealedReverse((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllReverse = () => {
    if (allReverseRevealed) {
      setRevealedReverse({});
      setAllReverseRevealed(false);
    } else {
      const full: Record<number, boolean> = {};
      REVERSE_TRANSLATION_LESSON_5.forEach((item) => {
        full[item.id] = true;
      });
      setRevealedReverse(full);
      setAllReverseRevealed(true);
    }
  };

  return (
    <section id="bloco-3-exercicios-revisao-rodada5" className="space-y-12">
      {/* Banner de Abertura */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 3 (60 Minutos) · Rodada 05
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 005 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Resolução Comentada de Exercícios & Tradução Reversa de Blindagem
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Consolidação empírica: Negação oracional com <em>nicht</em> (A23), flexão formal/informal (A24), classificação canônica de ações de lazer (A25),
          diálogos de aptidão (A26), agenda semanal de Herr e Frau Meier com inversão obrigatória da Posição II (A27–A28),
          16 sentenças ordenadas (C7), tradução reversa com análise estrutural e os 15 mandamentos da Rodada 05.
        </p>
      </div>

      {/* 3.1 Exercício A23 — Negation */}
      <div id="secao-3-1-exercicio-a23" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 3.1 · Exercício A23 (p. 45)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Antworten Sie negativ (Prática de Negação com <em>nicht</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Posição precisa de <em>nicht</em> antes de advérbios graduadores (<em>gut, gern</em>) e no final de verbos simples.
            </p>
          </div>

          <button
            onClick={() => setRevealedA23(!revealedA23)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
          >
            {revealedA23 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {revealedA23 ? 'Ocultar Respostas' : 'Revelar Respostas'}
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-semibold">Nº</th>
                  <th className="py-2.5 px-3 font-semibold">Pergunta Original</th>
                  <th className="py-2.5 px-3 font-semibold">Resposta Negativa Canônica</th>
                  <th className="py-2.5 px-3 font-semibold">Justificativa Topológica</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {EXERCISE_A23_ITEMS.map((item) => (
                  <tr key={item.num} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-500">{item.num}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{item.pergunta}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-emerald-800">
                      {revealedA23 ? item.resposta : '••••••••••••••••••••••••••••••••'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 text-xs">{item.justificativa}</td>
                    <td className="py-2.5 px-3 text-center">
                      <AudioButton text={item.resposta} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.2 Exercício A24 — Formell und informell */}
      <div id="secao-3-2-exercicio-a24" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 3.2 · Exercício A24 (p. 45)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Formell und Informell — Conversão para <em>du</em> ou <em>ihr</em>
            </h3>
          </div>

          <button
            onClick={() => setRevealedA24(!revealedA24)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
          >
            {revealedA24 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {revealedA24 ? 'Ocultar Gabarito' : 'Revelar Gabarito'}
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXERCISE_A24_ITEMS.map((item) => (
              <div key={item.num} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between text-xs">
                <div>
                  <div className="text-slate-500 text-[11px] mb-1">Formal (Sie):</div>
                  <div className="font-semibold text-slate-800">{item.formal}</div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200">
                  <div className="text-emerald-700 font-mono font-bold flex items-center justify-between">
                    <span>{revealedA24 ? item.informal : '••••••••••••••••'}</span>
                    <AudioButton text={item.informal} lang="de-DE" size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.3 Exercício A25 — Was man machen kann */}
      <div id="secao-3-3-exercicio-a25" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 3.3 · Exercício A25 (p. 45)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Was man machen kann — Agrupamento Canônico por Colocação Verbal
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Cada atividade ou esporte em alemão exige um verbo nuclear específico (<em>spielen, machen, lesen, lernen, hören, tanzen, fahren</em>).
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXERCISE_A25_CATEGORIES.map((cat, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="font-mono font-bold text-indigo-900 text-sm mb-1 bg-indigo-50 px-2 py-1 rounded inline-block">
                  Das kann man {cat.verbo}:
                </div>
                <div className="text-xs text-slate-700 leading-relaxed mt-2">{cat.itens}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex justify-end">
                <AudioButton text={`Das kann man ${cat.verbo}: ${cat.itens}`} lang="de-DE" size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3.4 Exercício A26 — Diálogos de Aptidão */}
      <div id="secao-3-4-exercicio-a26" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 3.4 · Exercício A26 (p. 45)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Was können Sie gut / nicht gut? (12 Minidiálogos de Habilidades)
          </h3>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXERCISE_A26_DIALOGUES.map((d, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{d.atividade}</div>
                <div className="text-slate-800 font-medium">A: {d.pergunta}</div>
                <div className="text-emerald-800 font-semibold font-mono mt-1">B: {d.resposta}</div>
              </div>
              <div className="mt-2 text-right">
                <AudioButton text={`${d.pergunta} — ${d.resposta}`} lang="de-DE" size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3.5 & 3.6 Wochentage & Herr und Frau Meier (A27–A28) */}
      <div id="secao-3-5-e-3-6-agenda-semanal" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seções 3.5 & 3.6 · Exercícios A27 e A28 (p. 46)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Die Wochentage & Herr und Frau Meier haben viel Zeit
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Dias da semana e aplicação inequívoca da <strong>Posição II do verbo conjugado com Vorfeld temporal</strong> (inversão: <em>Am Montag fährt Herr Meier...</em>).
            </p>
          </div>
          <AudioButton
            text="Am Montag fährt Herr Meier Motorrad. Am Dienstag liest Herr Meier Zeitung. Am Montag lernt Frau Meier Russisch. Am Dienstag fährt Frau Meier nach Berlin."
            lang="de-DE"
            label="Ouvir Agenda Semanal"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* A27 Dias da semana */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              A27: Os 7 Dias da Semana & Preposição Obrigatória <em>am</em> (an + dem)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {EXERCISE_A27_DAYS.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center flex flex-col justify-between ${
                    day.tipo === 'Wochenende'
                      ? 'border-amber-200 bg-amber-50/40'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{day.tipo}</span>
                    <div className="font-bold text-sm text-indigo-900 font-mono mt-0.5">{day.dia}</div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600 font-mono">{day.exemplo}</div>
                  <div className="mt-2">
                    <AudioButton text={day.exemplo} lang="de-DE" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* A28 Herr vs Frau Meier */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              A28: Agenda Comparativa Semanal (Herr Meier vs. Frau Meier) — Verbo estritamente na Posição II
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-semibold">Dia da Semana</th>
                    <th className="py-2.5 px-3 font-semibold text-blue-800">Herr Meier (Posição II)</th>
                    <th className="py-2.5 px-3 font-semibold text-purple-800">Frau Meier (Posição II)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {EXERCISE_A28_SCHEDULE.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-bold font-mono text-slate-700">{s.dia}</td>
                      <td className="py-2.5 px-3 font-mono text-blue-900 font-medium">
                        <div className="flex items-center justify-between">
                          <span>{s.herr}</span>
                          <AudioButton text={s.herr} lang="de-DE" size="sm" />
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-purple-900 font-medium">
                        <div className="flex items-center justify-between">
                          <span>{s.frau}</span>
                          <AudioButton text={s.frau} lang="de-DE" size="sm" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 3.7 Exercício C7 — Ordenação de Sentenças */}
      <div id="secao-3-7-exercicio-c7" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 3.7 · Exercício C7 (p. 28 Revisão)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Bilden Sie Sätze (16 Sentenças Sintaticamente Ordenadas)
            </h3>
          </div>

          <button
            onClick={() => setRevealedC7(!revealedC7)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
          >
            {revealedC7 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {revealedC7 ? 'Ocultar Sentenças' : 'Revelar Sentenças'}
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EXERCISE_C7_SENTENCES.map((c7) => (
              <div key={c7.num} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">#{c7.num}</span>
                  <div className="font-bold text-indigo-950 font-mono mt-1">
                    {revealedC7 ? c7.frase : '••••••••••••••••••••'}
                  </div>
                  <div className="text-slate-500 text-[11px] mt-1">{c7.traducao}</div>
                </div>
                <div className="mt-2 text-right">
                  <AudioButton text={c7.frase} lang="de-DE" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.8 & 3.9 Tradução Reversa de Blindagem & Gabarito Comentado */}
      <div id="secao-3-8-traducao-reversa" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seções 3.8 & 3.9
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tradução Reversa de Blindagem (Português → Alemão) com Análise Estrutural
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Treinamento de evocação ativa: traduza mentalmente ou no caderno antes de revelar o gabarito fonético e a justificativa sintática.
            </p>
          </div>

          <button
            onClick={toggleAllReverse}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            {allReverseRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {allReverseRevealed ? 'Ocultar Todas as 10' : 'Revelar Todas as 10'}
          </button>
        </div>

        <div className="p-6 space-y-4">
          {REVERSE_TRANSLATION_LESSON_5.map((item) => {
            const isRevealed = revealedReverse[item.id] || allReverseRevealed;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center font-mono">
                        {item.id}
                      </span>
                      <span className="font-semibold text-slate-900 text-sm sm:text-base">{item.pt}</span>
                    </div>

                    {isRevealed && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-emerald-800 text-base">{item.de}</span>
                          <AudioButton text={item.de} lang="de-DE" size="sm" />
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                          <strong>Análise Sintática:</strong> {item.justificativa}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleReverse(item.id)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
                    title={isRevealed ? 'Ocultar resposta' : 'Revelar resposta'}
                  >
                    {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.10 Resumo dos Pontos-Chave */}
      <div id="secao-3-10-resumo-pontos-chave" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 3.10
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Resumo dos Pontos-Chave do Dia 005 — 15 Mandamentos da Rodada 05
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Síntese executiva para memorização definitiva e blindagem cognitiva.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {KEY_POINTS_LESSON_5.map((kp) => (
              <div key={kp.numero} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 text-indigo-700 font-bold">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center text-[10px] font-mono">
                      {kp.numero}
                    </span>
                    <span>{kp.conceito}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed mt-1">{kp.regra}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
