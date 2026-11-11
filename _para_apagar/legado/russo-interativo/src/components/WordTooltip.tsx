import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Volume1, HelpCircle } from 'lucide-react';
import { lookupWord, WordInfo } from '../data/wordDictionary';
import { playRussianAudio } from '../utils/audio';

interface WordTooltipProps {
  rawWord: string;
  displayWord?: string;
  customInfo?: WordInfo;
  className?: string;
}

export const WordTooltip: React.FC<WordTooltipProps> = ({
  rawWord,
  displayWord,
  customInfo,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const wordInfo = customInfo || lookupWord(rawWord);
  const shownText = displayWord || rawWord;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleAudio = (e: React.MouseEvent, speed: 'normal' | 'slow') => {
    e.stopPropagation();
    setIsPlaying(true);
    playRussianAudio(
      wordInfo?.stressed || rawWord,
      speed,
      () => setIsPlaying(false),
      () => setIsPlaying(true)
    );
  };

  // Close when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!wordInfo) {
    // If not a recognized word, render normally without tooltip
    return <span className={className}>{shownText}</span>;
  }

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`word-interactive font-medium cursor-pointer text-slate-800 ${className}`}
        aria-label={`Tradução e áudio de ${rawWord}`}
      >
        {shownText}
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900/95 text-white rounded-xl shadow-xl backdrop-blur-sm border border-slate-700/60 text-xs animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900/95" />

          {/* Header with Russian word & sound */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700/70">
            <div>
              <span className="text-sm font-semibold text-amber-300">
                {wordInfo.stressed}
              </span>
              <span className="ml-1.5 text-[11px] text-slate-400 italic">
                [{wordInfo.translit}]
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => handleAudio(e, 'normal')}
                title="Pronúncia normal"
                className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-400 animate-pulse' : ''}`} />
              </button>
              <button
                type="button"
                onClick={(e) => handleAudio(e, 'slow')}
                title="Pronúncia lenta (0.65x)"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-300 transition-colors text-[10px] font-mono"
              >
                0.6x
              </button>
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-1">
            <div className="flex items-start gap-1">
              <span className="text-slate-400 font-medium shrink-0">PT:</span>
              <span className="text-slate-100 font-semibold">{wordInfo.pt}</span>
            </div>
            <div className="flex items-start gap-1">
              <span className="text-slate-400 font-medium shrink-0">EN:</span>
              <span className="text-slate-300">{wordInfo.en}</span>
            </div>
          </div>

          {/* Grammar Note */}
          {wordInfo.note && (
            <div className="mt-2 pt-1.5 border-t border-slate-700/60 flex items-start gap-1 text-[11px] text-amber-200/90 leading-tight">
              <HelpCircle className="w-3 h-3 shrink-0 mt-0.5 text-amber-400" />
              <span>{wordInfo.note}</span>
            </div>
          )}
        </div>
      )}
    </span>
  );
};

export const InteractiveSentence: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  // Split words while preserving punctuation and spacing
  const tokens = text.split(/(\s+|[.,!?;:()«»"—–]+)/);

  return (
    <span className={`inline-block ${className}`}>
      {tokens.map((token, idx) => {
        if (!token) return null;
        // If token contains whitespace or pure punctuation
        if (/^[\s.,!?;:()«»"—–]+$/.test(token)) {
          return <span key={idx}>{token}</span>;
        }

        return <WordTooltip key={idx} rawWord={token} displayWord={token} />;
      })}
    </span>
  );
};
