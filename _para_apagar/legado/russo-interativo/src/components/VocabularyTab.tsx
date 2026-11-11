import React, { useState } from 'react';
import { Volume2, Search, Play, Square, Layers, List, Sparkles, HelpCircle } from 'lucide-react';
import { VocabWord } from '../types';
import { playRussianAudio, stopSpeech } from '../utils/audio';

interface VocabularyTabProps {
  vocabulary: VocabWord[];
  lessonTitle: string;
}

export const VocabularyTab: React.FC<VocabularyTabProps> = ({ vocabulary, lessonTitle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'flashcards'>('table');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSequentialPlaying, setIsSequentialPlaying] = useState(false);

  // Filter words by search
  const filteredWords = vocabulary.filter((w) => {
    const q = searchTerm.toLowerCase();
    return (
      w.russian.toLowerCase().includes(q) ||
      w.stressed.toLowerCase().includes(q) ||
      w.transliteration.toLowerCase().includes(q) ||
      w.portuguese.toLowerCase().includes(q) ||
      w.english.toLowerCase().includes(q) ||
      (w.category && w.category.toLowerCase().includes(q))
    );
  });

  const handlePlayWord = (word: VocabWord, speed: 'normal' | 'slow') => {
    setActiveWordId(word.id);
    playRussianAudio(
      word.stressed || word.russian,
      speed,
      () => setActiveWordId(null),
      () => setActiveWordId(word.id)
    );
  };

  // Play all vocabulary sequentially
  const handlePlayAllSequentially = () => {
    if (isSequentialPlaying) {
      stopSpeech();
      setIsSequentialPlaying(false);
      setActiveWordId(null);
      return;
    }

    setIsSequentialPlaying(true);
    let index = 0;

    const playNext = () => {
      if (index >= filteredWords.length) {
        setIsSequentialPlaying(false);
        setActiveWordId(null);
        return;
      }

      const item = filteredWords[index];
      setActiveWordId(item.id);

      playRussianAudio(item.stressed || item.russian, 'normal', () => {
        index++;
        setTimeout(playNext, 600);
      });
    };

    playNext();
  };

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Vocabulário da Lição
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {filteredWords.length} palavras e expressões com pronúncia nativa e velocidade lenta.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFlashcardIndex(0);
              }}
              placeholder="Buscar em russo, PT ou EN..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-48 sm:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800"
            />
          </div>

          {/* Sequential Audio Play Button */}
          <button
            onClick={handlePlayAllSequentially}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              isSequentialPlaying
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
            }`}
          >
            {isSequentialPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Parar Áudio</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ouvir Todas</span>
              </>
            )}
          </button>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Visualização em Lista"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setViewMode('flashcards');
                setIsFlipped(false);
              }}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'flashcards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Modo Flashcards"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcards' && currentFlashcard && (
        <div className="max-w-xl mx-auto space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[260px] p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm flex flex-col items-center justify-center text-center relative group select-none"
          >
            <span className="absolute top-4 right-4 text-[11px] text-slate-400 font-mono">
              {flashcardIndex + 1} / {filteredWords.length}
            </span>

            {!isFlipped ? (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Russo (Clique para virar)
                </span>
                <div className="text-3xl font-bold text-slate-900 font-display">
                  {currentFlashcard.stressed}
                </div>
                <div className="text-sm text-slate-500 italic font-mono">
                  [{currentFlashcard.transliteration}]
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
                  Tradução
                </span>
                <div className="text-2xl font-bold text-slate-900">
                  {currentFlashcard.portuguese}
                </div>
                <div className="text-sm text-slate-500">
                  EN: {currentFlashcard.english}
                </div>
                {currentFlashcard.notes && (
                  <p className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 mt-2">
                    {currentFlashcard.notes}
                  </p>
                )}
              </div>
            )}

            {/* Quick Audio in Card */}
            <div className="absolute bottom-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => handlePlayWord(currentFlashcard, 'normal')}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-medium transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ouvir</span>
              </button>
              <button
                onClick={() => handlePlayWord(currentFlashcard, 'slow')}
                className="px-2 py-1 bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700 rounded-lg text-xs font-mono transition-colors"
                title="Pronúncia lenta"
              >
                0.6x
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
              }}
              className="px-4 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Anterior
            </button>
            <span className="text-xs text-slate-500">
              Clique no cartão para revelar a tradução
            </span>
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {/* TABLE / LIST VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Russo (Com Acento)</th>
                  <th className="py-3 px-4">Pronúncia</th>
                  <th className="py-3 px-4">Português</th>
                  <th className="py-3 px-4 hidden md:table-cell">English</th>
                  <th className="py-3 px-4 w-28 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredWords.map((word, idx) => {
                  const isCurrent = activeWordId === word.id;
                  return (
                    <tr
                      key={word.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCurrent ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      {/* Index */}
                      <td className="py-3.5 px-4 text-center text-xs text-slate-400 font-mono tabular-nums">
                        {idx + 1}
                      </td>

                      {/* Russian */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 text-base font-display flex items-baseline gap-2">
                          <span>{word.stressed}</span>
                          {word.category && (
                            <span className="hidden sm:inline-block text-[10px] text-slate-400 font-normal">
                              ({word.category})
                            </span>
                          )}
                        </div>
                        {word.notes && (
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-start gap-1">
                            <span className="text-amber-600 font-semibold">•</span>
                            <span>{word.notes}</span>
                          </div>
                        )}
                      </td>

                      {/* Transliteration */}
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-500 italic">
                        {word.transliteration}
                      </td>

                      {/* Portuguese */}
                      <td className="py-3.5 px-4 text-slate-900 font-medium">
                        {word.portuguese}
                      </td>

                      {/* English */}
                      <td className="py-3.5 px-4 text-slate-600 text-xs hidden md:table-cell">
                        {word.english}
                      </td>

                      {/* Audio Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handlePlayWord(word, 'normal')}
                            title="Ouvir na velocidade normal"
                            className={`p-1.5 rounded-lg border cursor-pointer transition-all ${
                              isCurrent
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200'
                            }`}
                          >
                            <Volume2 className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} />
                          </button>
                          <button
                            onClick={() => handlePlayWord(word, 'slow')}
                            title="Ouvir em velocidade lenta (0.65x)"
                            className="px-1.5 py-1 text-[10px] font-mono font-medium rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-700 cursor-pointer transition-colors"
                          >
                            0.6x
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
