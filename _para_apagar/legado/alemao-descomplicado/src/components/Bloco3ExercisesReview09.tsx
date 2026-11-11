import React, { useState } from 'react';
import {
  EXERCISE_1_CONJUGATE,
  EXERCISE_2_FILL_VERB,
  EXERCISE_3_TRANSLATE,
  EXERCISE_4_DIALOGUES,
  EXERCISE_5_REVERSE_BLINDAGEM,
  EXERCISE_6_DIALOGUE_EXAMPLE,
  VERBS_KEY_POINTS_SUMMARY,
} from '../data/lesson09Data';
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
  MessageSquare,
  BookOpen,
} from 'lucide-react';

export const Bloco3ExercisesReview09: React.FC = () => {
  // Exercício 1 State
  const [inputsEx1, setInputsEx1] = useState<Record<number, string>>({});
  const [revealedEx1, setRevealedEx1] = useState<Record<number, boolean>>({});
  const [showAllEx1, setShowAllEx1] = useState(false);

  // Exercício 2 State
  const [inputsEx2, setInputsEx2] = useState<Record<number, string>>({});
  const [revealedEx2, setRevealedEx2] = useState<Record<number, boolean>>({});
  const [showAllEx2, setShowAllEx2] = useState(false);

  // Exercício 3 State (Tradução)
  const [revealedEx3, setRevealedEx3] = useState<Record<number, boolean>>({});
  const [showAllEx3, setShowAllEx3] = useState(false);

  // Exercício 4 State (Diálogos)
  const [revealedEx4, setRevealedEx4] = useState<Record<number, boolean>>({});
  const [showAllEx4, setShowAllEx4] = useState(false);

  // Exercício 5 State (Blindagem Reversa)
  const [revealedEx5, setRevealedEx5] = useState<Record<number, boolean>>({});
  const [showAllEx5, setShowAllEx5] = useState(false);

  // Exercício 6 Interactive Dialogue State
  const [userDialogueText, setUserDialogueText] = useState('');

  const targetVerbs = [
    'waschen', 'lassen', 'fangen', 'raten', 'halten',
    'nehmen', 'treffen', 'essen', 'vergessen', 'helfen',
    'werfen', 'sterben', 'wissen', 'mögen', 'reden',
    'warten', 'baden', 'bilden'
  ];

  // Count which target verbs are mentioned in the user's text
  const detectedVerbs = targetVerbs.filter((v) => {
    const regex = new RegExp(`\\b${v.slice(0, 4)}`, 'i');
    return regex.test(userDialogueText);
  });

  return (
    <section id="bloco-3-exercicios-revisao-rodada9" className="space-y-12">
      {/* Banner Principal Bloco 3 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 3 (60 Minutos) · Rodada Extra 09
          </span>
          <span className="text-xs text-indigo-200 font-medium">Resolução Comentada & Tradução Reversa</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Laboratório Prático de Fixação & Blindagem
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 font-normal leading-relaxed">
          6 baterias de exercícios completas: conjugação analítica, preenchimento contextual, tradução direta, completamento de diálogos, tradução reversa de blindagem, produção criativa de diálogos e resumo final de pontos-chave.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 3.1 EXERCÍCIO 1 — CONJUGUE OS VERBOS                                      */}
      {/* ========================================================================= */}
      <div id="secao-3-1-exercicio-1-conjugar" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">
                Exercício 3.1 · 18 Itens
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Conjugue os Verbos (Ergänzen Sie die Verben in der richtigen Form)
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowAllEx1(!showAllEx1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAllEx1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showAllEx1 ? 'Ocultar Todas as Respostas' : 'Revelar Todas as Respostas'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXERCISE_1_CONJUGATE.map((item) => {
            const isRevealed = showAllEx1 || revealedEx1[item.id];
            const userVal = inputsEx1[item.id] || '';
            const isCorrect = userVal.trim().toLowerCase() === item.correctForm.toLowerCase();

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-500">#{item.id}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                    {item.baseVerb}
                  </span>
                </div>

                <div className="text-sm font-mono text-slate-900 flex items-center gap-1.5 flex-wrap">
                  {item.promptBefore && <span>{item.promptBefore}</span>}
                  <input
                    type="text"
                    placeholder={`(${item.baseVerb})`}
                    value={userVal}
                    onChange={(e) =>
                      setInputsEx1({ ...inputsEx1, [item.id]: e.target.value })
                    }
                    className={`px-2 py-1 border rounded text-xs font-mono w-28 focus:outline-none focus:ring-2 ${
                      userVal && isCorrect
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                        : userVal && !isCorrect
                        ? 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-slate-300 bg-white'
                    }`}
                  />
                  <span>{item.promptAfter}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs">
                  <button
                    onClick={() =>
                      setRevealedEx1((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                    className="text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
                  >
                    {isRevealed ? 'Ocultar' : 'Ver Gabarito'}
                  </button>

                  <div className="flex items-center gap-2">
                    {isRevealed && (
                      <span className="font-bold font-mono text-slate-900 bg-amber-100 px-2 py-0.5 rounded">
                        {item.correctForm}
                      </span>
                    )}
                    <AudioButton
                      text={`${item.promptBefore} ${item.correctForm} ${item.promptAfter}`.trim()}
                      lang="de-DE"
                      size="sm"
                    />
                  </div>
                </div>

                {isRevealed && (
                  <p className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                    <strong>Justificativa:</strong> {item.justification}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3.2 EXERCÍCIO 2 — COMPLETE COM O VERBO CORRETO                             */}
      {/* ========================================================================= */}
      <div id="secao-3-2-exercicio-2-banco-verbos" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">
                Exercício 3.2 · Banco de Verbos
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Complete com o Verbo Correto (Ergänzen Sie das passende Verb)
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowAllEx2(!showAllEx2)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAllEx2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showAllEx2 ? 'Ocultar Todas' : 'Revelar Todas'}</span>
          </button>
        </div>

        {/* Banco de Palavras */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span className="text-xs font-bold font-mono text-slate-600 uppercase tracking-wider block">
            Banco de Verbos Disponíveis:
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {[
              'waschen', 'lassen', 'fangen', 'raten', 'halten',
              'nehmen', 'treffen', 'essen', 'vergessen', 'helfen',
              'werfen', 'sterben', 'wissen', 'mögen', 'reden',
              'warten', 'baden', 'bilden'
            ].map((v) => (
              <span key={v} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXERCISE_2_FILL_VERB.map((item) => {
            const isRevealed = showAllEx2 || revealedEx2[item.id];
            const userVal = inputsEx2[item.id] || '';
            const isCorrect = userVal.trim().toLowerCase() === item.correctWord.toLowerCase();

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500">#{item.id}</span>
                  <span className="text-[11px] text-slate-500 font-mono">infinitivo: {item.baseVerb}</span>
                </div>

                <div className="text-sm font-mono text-slate-900 flex items-center gap-1.5 flex-wrap">
                  {item.sentenceBefore && <span>{item.sentenceBefore}</span>}
                  <input
                    type="text"
                    placeholder="verbo conjugado"
                    value={userVal}
                    onChange={(e) =>
                      setInputsEx2({ ...inputsEx2, [item.id]: e.target.value })
                    }
                    className={`px-2 py-1 border rounded text-xs font-mono w-28 focus:outline-none focus:ring-2 ${
                      userVal && isCorrect
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                        : userVal && !isCorrect
                        ? 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-slate-300 bg-white'
                    }`}
                  />
                  <span>{item.sentenceAfter}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs">
                  <button
                    onClick={() =>
                      setRevealedEx2((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                    className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                  >
                    {isRevealed ? 'Ocultar' : 'Ver Resposta'}
                  </button>

                  <div className="flex items-center gap-2">
                    {isRevealed && (
                      <span className="font-bold font-mono text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded">
                        {item.correctWord}
                      </span>
                    )}
                    <AudioButton
                      text={`${item.sentenceBefore} ${item.correctWord} ${item.sentenceAfter}`.trim()}
                      lang="de-DE"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3.3 EXERCÍCIO 3 — TRADUZA PARA O ALEMÃO                                   */}
      {/* ========================================================================= */}
      <div id="secao-3-3-exercicio-3-traducao" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                Exercício 3.3 · Tradução
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Traduza para o Alemão (Übersetzen Sie ins Deutsche)
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowAllEx3(!showAllEx3)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAllEx3 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showAllEx3 ? 'Ocultar Todas' : 'Revelar Todas'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXERCISE_3_TRANSLATE.map((item) => {
            const isRevealed = showAllEx3 || revealedEx3[item.id];

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex flex-col justify-between space-y-2 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                    #{item.id} · Português
                  </span>
                  <p className="text-sm font-semibold text-slate-800">{item.pt}</p>
                </div>

                <div className="border-t border-slate-200/60 pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        setRevealedEx3((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="text-xs text-blue-700 hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      {isRevealed ? 'Ocultar Alemão' : 'Revelar Alemão'}
                    </button>
                    {isRevealed && <AudioButton text={item.de} lang="de-DE" size="sm" />}
                  </div>

                  {isRevealed && (
                    <div className="p-2 rounded bg-blue-50/80 border border-blue-200/70 text-xs font-bold font-mono text-blue-950">
                      {item.de}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3.4 EXERCÍCIO 4 — DIÁLOGOS                                                */}
      {/* ========================================================================= */}
      <div id="secao-3-4-exercicio-4-dialogos" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider font-mono">
                Exercício 3.4 · Integração Dialogal
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Complete os Diálogos com as Formas Verbais Corretas
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowAllEx4(!showAllEx4)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAllEx4 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showAllEx4 ? 'Ocultar Gabaritos' : 'Revelar Todos os Diálogos'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {EXERCISE_4_DIALOGUES.map((diag) => {
            const isRevealed = showAllEx4 || revealedEx4[diag.dialogueNumber];

            return (
              <div
                key={diag.dialogueNumber}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-sm font-bold font-mono text-slate-900">{diag.title}</h4>
                  <button
                    onClick={() =>
                      setRevealedEx4((prev) => ({
                        ...prev,
                        [diag.dialogueNumber]: !prev[diag.dialogueNumber],
                      }))
                    }
                    className="text-xs text-purple-700 hover:text-purple-800 font-semibold cursor-pointer"
                  >
                    {isRevealed ? 'Ocultar Resolução' : 'Ver Resolução Comentada'}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {diag.lines.map((line, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {line.speaker}
                        </span>
                        <p className="text-slate-800">
                          {isRevealed ? line.fullSentence : line.template}
                        </p>
                      </div>

                      {isRevealed && (
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {line.correctAnswer.join(' / ')}
                          </span>
                          <AudioButton text={line.fullSentence} lang="de-DE" size="sm" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3.5 EXERCÍCIO 5 — TRADUÇÃO REVERSA DE BLINDAGEM                           */}
      {/* ========================================================================= */}
      <div id="secao-3-5-exercicio-5-blindagem" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider font-mono">
                Exercício 3.5 · Blindagem Ativa
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Tradução Reversa de Blindagem (18 Desafios de Produção Ativa)
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowAllEx5(!showAllEx5)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showAllEx5 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showAllEx5 ? 'Ocultar Todas' : 'Revelar Todas as Blindagens'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXERCISE_5_REVERSE_BLINDAGEM.map((item) => {
            const isRevealed = showAllEx5 || revealedEx5[item.id];

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                    Desafio #{item.id} (Português)
                  </span>
                  <p className="text-sm font-semibold text-slate-900">{item.pt}</p>
                </div>

                <div className="border-t border-slate-200/60 pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        setRevealedEx5((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="text-xs text-rose-700 hover:text-rose-800 font-semibold cursor-pointer"
                    >
                      {isRevealed ? 'Ocultar Alemão' : 'Ver Gabarito Alemão'}
                    </button>
                    {isRevealed && <AudioButton text={item.de} lang="de-DE" size="sm" />}
                  </div>

                  {isRevealed && (
                    <div className="space-y-1.5">
                      <div className="p-2 rounded bg-rose-50 border border-rose-200/70 text-xs sm:text-sm font-mono font-bold text-rose-950">
                        {item.de}
                      </div>
                      <p className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                        <strong>Justificativa:</strong> {item.justification}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3.6 EXERCÍCIO 6 — ESCREVA UM DIÁLOGO (PRODUÇÃO AUTÔNOMA)                  */}
      {/* ========================================================================= */}
      <div id="secao-3-6-exercicio-6-escrever-dialogo" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider font-mono">
              Exercício 3.6 · Produção Escrita
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Escreva um Diálogo com pelo menos 8 Verbos da Lista
            </h3>
          </div>
        </div>

        {/* Simulador Interativo com Contador de Verbos */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Área de Prática Autônoma:
            </h4>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-teal-100 text-teal-900 border border-teal-200">
              Verbos identificados: {detectedVerbs.length} / 8 mínimos
            </span>
          </div>

          <textarea
            rows={4}
            placeholder="Escreva seu diálogo em alemão aqui usando verbos como wissen, helfen, nehmen, warten, essen, mögen, etc..."
            value={userDialogueText}
            onChange={(e) => setUserDialogueText(e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {detectedVerbs.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-600">Verbos detectados no seu texto:</span>
              {detectedVerbs.map((v) => (
                <span key={v} className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-mono font-bold border border-teal-200">
                  ✓ {v}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modelo de Referência do Enunciado */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-600" />
            Exemplo Modelo de Referência & Resolução Comentada:
          </h4>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-xs">
                  <th className="p-3 border-r border-slate-800">Verbo Empregado</th>
                  <th className="p-3 border-r border-slate-800">Frase no Diálogo</th>
                  <th className="p-3">Justificativa Gramatical</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {EXERCISE_6_DIALOGUE_EXAMPLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold font-mono text-teal-800 border-r border-slate-200">
                      {row.verbo}
                    </td>
                    <td className="p-3 font-mono text-slate-900 border-r border-slate-200">
                      <div className="flex items-center justify-between gap-2">
                        <span>{row.fraseDe}</span>
                        <AudioButton text={row.fraseDe} lang="de-DE" size="sm" />
                      </div>
                    </td>
                    <td className="p-3 text-slate-600 text-xs">
                      {row.justificativa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3.7 RESUMO DOS PONTOS-CHAVE DA AULA                                       */}
      {/* ========================================================================= */}
      <div id="secao-3-7-resumo-pontos-chave" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">
              Seção 3.7 · Tabela Mestre de Consulta
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Resumo dos Pontos-Chave da Aula (18 Verbos Especiais do Presente)
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse font-mono">
            <thead>
              <tr className="bg-slate-900 text-white text-xs">
                <th className="p-3 border-r border-slate-800">Verbo</th>
                <th className="p-3 border-r border-slate-800">Tradução</th>
                <th className="p-3 border-r border-slate-800">Alternância / Tipo</th>
                <th className="p-3 border-r border-slate-800">2ª sg. (du)</th>
                <th className="p-3 border-r border-slate-800">3ª sg. (er/sie/es)</th>
                <th className="p-3 border-r border-slate-800">Imperativo</th>
                <th className="p-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {VERBS_KEY_POINTS_SUMMARY.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                    {row.verbo}
                  </td>
                  <td className="p-3 text-slate-600 font-sans border-r border-slate-200">
                    {row.traducao}
                  </td>
                  <td className="p-3 font-bold text-amber-800 border-r border-slate-200">
                    <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200/80">
                      {row.alternancia}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                    {row.du}
                  </td>
                  <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                    {row.erSieEs}
                  </td>
                  <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                    {row.imperativo}
                  </td>
                  <td className="p-3 text-center">
                    <AudioButton text={`${row.verbo}. du ${row.du}, er ${row.erSieEs}`} lang="de-DE" size="sm" />
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
