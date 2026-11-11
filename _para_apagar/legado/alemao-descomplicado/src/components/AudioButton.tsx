import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { speechEngine, SpeechState } from '../utils/speech';

interface AudioButtonProps {
  text: string;
  lang?: 'de-DE' | 'pt-BR';
  label?: string;
  size?: 'sm' | 'md' | 'xs';
  isSpelling?: boolean;
  className?: string;
  variant?: 'subtle' | 'pill' | 'icon-only';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  lang = 'de-DE',
  label,
  size = 'sm',
  isSpelling = false,
  className = '',
  variant = 'subtle',
}) => {
  const [speechState, setSpeechState] = useState<SpeechState>(speechEngine.getState());

  useEffect(() => {
    const unsubscribe = speechEngine.subscribe(setSpeechState);
    return unsubscribe;
  }, []);

  const isCurrent = speechState.isPlaying && speechState.currentText === text;

  const targetLang: 'de-DE' | 'pt-BR' = (lang === 'pt-BR') ? 'pt-BR' : 'de-DE';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent) {
      speechEngine.stop();
    } else {
      if (isSpelling) {
        speechEngine.spellLetters(text, targetLang);
      } else {
        speechEngine.speak(text, targetLang);
      }
    }
  };

  const isGerman = targetLang === 'de-DE';

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }[size];

  if (variant === 'icon-only') {
    return (
      <button
        id={`audio-btn-${encodeURIComponent(text.slice(0, 16))}`}
        type="button"
        onClick={handleClick}
        title={isCurrent ? 'Parar áudio' : `Ouvir em ${isGerman ? 'Alemão' : 'Português'}`}
        className={`inline-flex items-center justify-center rounded-md p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer ${
          isCurrent
            ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-400 animate-pulse'
            : isGerman
            ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 bg-slate-100'
            : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/80 bg-emerald-50'
        } ${className}`}
      >
        {isCurrent ? <Square className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    );
  }

  return (
    <button
      id={`audio-btn-${encodeURIComponent(text.slice(0, 16))}`}
      type="button"
      onClick={handleClick}
      title={isCurrent ? 'Parar áudio' : `Ouvir pronúncia (${isGerman ? 'Alemão' : 'Português'})`}
      className={`inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 cursor-pointer ${sizeClasses} ${
        isCurrent
          ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300 animate-pulse'
          : isGerman
          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/80'
          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
      } ${className}`}
    >
      {isCurrent ? <Square className="w-3 h-3 fill-current" /> : <Volume2 className="w-3 h-3" />}
      <span>{label || (isGerman ? '🇩🇪 Ouvir' : '🇧🇷 Ouvir')}</span>
    </button>
  );
};
