import React, { useState, useEffect } from 'react';
import { Volume2, Square, Gauge, Headphones, RotateCcw } from 'lucide-react';
import { speechEngine, SpeechState } from '../utils/speech';

interface AudioPlayerBarProps {
  onOpenStudio?: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ onOpenStudio }) => {
  const [speechState, setSpeechState] = useState<SpeechState>(speechEngine.getState());

  useEffect(() => {
    const unsubscribe = speechEngine.subscribe(setSpeechState);
    return unsubscribe;
  }, []);

  const speeds = [0.8, 1.0, 1.2];

  return (
    <div
      id="audio-player-bar"
      className="bg-white/95 backdrop-blur border border-slate-200/90 rounded-xl shadow-sm px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            speechState.isPlaying ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {speechState.isPlaying ? <Volume2 className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-500">
              {speechState.isPlaying ? 'Reproduzindo Áudio' : 'Motor de Áudio & Pronúncia'}
            </span>
            {speechState.isPlaying && (
              <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-amber-500 text-white rounded">
                {speechState.lang === 'de-DE' ? 'Alemão (de-DE)' : 'Português (pt-BR)'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 truncate max-w-[260px] sm:max-w-md">
            {speechState.isPlaying
              ? speechState.currentText
              : 'Clique em qualquer botão de áudio nas tabelas ou abra o Estúdio de Transcrição.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {speechState.isPlaying && (
          <button
            id="stop-audio-bar-btn"
            onClick={() => speechEngine.stop()}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md cursor-pointer transition-colors"
          >
            <Square className="w-3 h-3 fill-current" />
            <span>Parar</span>
          </button>
        )}

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <span className="text-[11px] text-slate-500 pl-1.5 flex items-center gap-1">
            <Gauge className="w-3 h-3" /> Vel:
          </span>
          {speeds.map((s) => (
            <button
              key={s}
              id={`speed-btn-${s}`}
              onClick={() => speechEngine.setRate(s)}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                speechState.rate === s
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {onOpenStudio && (
          <button
            id="open-studio-bar-btn"
            onClick={onOpenStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs cursor-pointer transition-colors"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Estúdio de Áudios</span>
            <span className="sm:hidden">Áudios</span>
          </button>
        )}
      </div>
    </div>
  );
};
