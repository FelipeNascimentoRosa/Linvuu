import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, RotateCcw, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExerciseSet, ExerciseItem } from '../types';
import { playRussianAudio } from '../utils/audio';

interface ExercisesTabProps {
  exerciseSets: ExerciseSet[];
  onExerciseCompleted?: (setId: string) => void;
}

export const ExercisesTab: React.FC<ExercisesTabProps> = ({
  exerciseSets,
  onExerciseCompleted,
}) => {
  const [selectedSetId, setSelectedSetId] = useState<string>(exerciseSets[0]?.id || '');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedResults, setCheckedResults] = useState<Record<string, boolean>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [showGabarito, setShowGabarito] = useState<boolean>(false);
  const [activeAudioItem, setActiveAudioItem] = useState<string | null>(null);

  const activeSet = exerciseSets.find((s) => s.id === selectedSetId) || exerciseSets[0];

  if (!activeSet) {
    return <div className="text-center py-12 text-slate-500">Nenhum exercício disponível.</div>;
  }

  const handleInputChange = (itemId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [itemId]: value }));
    // reset check state when typing again
    setCheckedResults((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const handleSelectOption = (itemId: string, option: string) => {
    handleInputChange(itemId, option);
  };

  const handleCheckAnswer = (item: ExerciseItem) => {
    const rawAnswer = (userAnswers[item.id] || '').trim().toLowerCase();
    const correctClean = item.correctAnswer.trim().toLowerCase();
    const accepted = (item.acceptedAnswers || []).map((a) => a.trim().toLowerCase());

    const isCorrect =
      rawAnswer === correctClean ||
      accepted.includes(rawAnswer) ||
      rawAnswer.replace(/[\u0300-\u036f]/g, '') === correctClean.replace(/[\u0300-\u036f]/g, '');

    setCheckedResults((prev) => ({ ...prev, [item.id]: isCorrect }));
    setShowExplanations((prev) => ({ ...prev, [item.id]: true }));

    // Check if whole set is now done
    const updatedResults = { ...checkedResults, [item.id]: isCorrect };
    const allItemsChecked = activeSet.items.every((it) => updatedResults[it.id] !== undefined);

    if (allItemsChecked) {
      const allCorrect = activeSet.items.every((it) => updatedResults[it.id] === true);
      if (allCorrect) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      if (onExerciseCompleted) {
        onExerciseCompleted(activeSet.id);
      }
    }
  };

  const handleResetSet = () => {
    const itemIds = activeSet.items.map((i) => i.id);
    setUserAnswers((prev) => {
      const copy = { ...prev };
      itemIds.forEach((id) => delete copy[id]);
      return copy;
    });
    setCheckedResults((prev) => {
      const copy = { ...prev };
      itemIds.forEach((id) => delete copy[id]);
      return copy;
    });
    setShowExplanations((prev) => {
      const copy = { ...prev };
      itemIds.forEach((id) => delete copy[id]);
      return copy;
    });
  };

  const handlePlayPromptAudio = (item: ExerciseItem) => {
    if (!item.audioPhrase) return;
    setActiveAudioItem(item.id);
    playRussianAudio(item.audioPhrase, 'normal', () => setActiveAudioItem(null));
  };

  return (
    <div className="space-y-6">
      {/* Exercise Sets Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Exercícios Interativos ({exerciseSets.length} Conjuntos)
            </h2>
            <p className="text-xs text-slate-500">
              Autocompletar com sugestões rápidas, múltipla escolha e treino de escuta.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGabarito(!showGabarito)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer self-start ${
                showGabarito
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showGabarito ? 'Ocultar Gabarito' : 'Mostrar Gabarito'}</span>
            </button>

            <button
              onClick={handleResetSet}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer self-start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recomeçar Conjunto</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {exerciseSets.map((set, index) => {
            const isSelected = set.id === selectedSetId;
            const checkedCount = set.items.filter((i) => checkedResults[i.id] === true).length;
            const isSetFinished = checkedCount === set.items.length;

            return (
              <button
                key={set.id}
                onClick={() => setSelectedSetId(set.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{set.title}</span>
                {isSetFinished && (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Exercise List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            {activeSet.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {activeSet.descriptionPt}
          </p>
        </div>

        {/* Gabarito (Answer Key) Box */}
        {showGabarito && (
          <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-2xl space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Gabarito Oficial deste Exercício:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              {activeSet.items.map((it, i) => (
                <div key={it.id} className="bg-white p-2.5 rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-700 mr-1.5 font-mono">#{i + 1}:</span>
                  <span className="font-bold text-blue-700">{it.correctAnswer}</span>
                  {it.explanationPt && (
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {it.explanationPt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6 divide-y divide-slate-100">
          {activeSet.items.map((item, idx) => {
            const currentVal = userAnswers[item.id] || '';
            const isChecked = checkedResults[item.id] !== undefined;
            const isCorrect = checkedResults[item.id] === true;

            return (
              <div key={item.id} className={`pt-6 first:pt-0 space-y-3`}>
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {item.question}
                      </h4>
                    </div>
                    {item.promptPt && (
                      <p className="text-xs text-slate-500 ml-7">
                        {item.promptPt}
                      </p>
                    )}
                  </div>

                  {/* Audio Button for Dictation */}
                  {item.audioPhrase && (
                    <button
                      onClick={() => handlePlayPromptAudio(item)}
                      title="Ouvir áudio"
                      className={`p-2 rounded-xl border transition-colors shrink-0 flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                        activeAudioItem === item.id
                          ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                          : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Ouvir Áudio</span>
                    </button>
                  )}
                </div>

                {/* Input Area or Autocomplete Choices */}
                <div className="ml-7 space-y-3">
                  {/* Options Chips (Suggestion bank) */}
                  {item.options && item.options.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-medium mr-1">
                        Sugestões de autocompletar:
                      </span>
                      {item.options.map((opt) => {
                        const isChosen = currentVal === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleSelectOption(item.id, opt)}
                            className={`px-3 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Text Input with Check Button */}
                  <div className="flex items-center gap-2 max-w-md">
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCheckAnswer(item);
                        }
                      }}
                      placeholder="Digite ou selecione a resposta acima..."
                      className={`w-full px-3.5 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 focus:ring-emerald-400'
                            : 'bg-rose-50 border-rose-300 text-rose-950 focus:ring-rose-400'
                          : 'bg-white border-slate-300 focus:ring-blue-500 text-slate-900'
                      }`}
                    />

                    <button
                      onClick={() => handleCheckAnswer(item)}
                      disabled={!currentVal.trim()}
                      className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                      Verificar
                    </button>
                  </div>

                  {/* Feedback Banner */}
                  {isChecked && (
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 animate-in fade-in duration-200 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}

                      <div className="space-y-1">
                        <div className="font-semibold">
                          {isCorrect ? 'Correto! Отлично!' : `Incorreto. A resposta esperada é: "${item.correctAnswer}"`}
                        </div>
                        {item.explanationPt && (
                          <p className="text-slate-600">
                            {item.explanationPt}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
