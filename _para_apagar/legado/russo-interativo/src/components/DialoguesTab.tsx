import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Square, User, Sparkles, MessageCircle } from 'lucide-react';
import { Dialogue, DialogueLine } from '../types';
import { playRussianAudio, DialogueAudioSequence, stopSpeech } from '../utils/audio';
import { InteractiveSentence } from './WordTooltip';

interface DialoguesTabProps {
  dialogues: Dialogue[];
}

export const DialoguesTab: React.FC<DialoguesTabProps> = ({ dialogues }) => {
  const [selectedDialogueId, setSelectedDialogueId] = useState<string>(dialogues[0]?.id || '');
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState<boolean>(false);
  const [dialogueSpeed, setDialogueSpeed] = useState<'normal' | 'slow'>('normal');

  const currentSequenceRef = useRef<DialogueAudioSequence | null>(null);

  // Switch dialogue if props update
  useEffect(() => {
    if (!dialogues.some((d) => d.id === selectedDialogueId) && dialogues[0]) {
      setSelectedDialogueId(dialogues[0].id);
    }
  }, [dialogues, selectedDialogueId]);

  const activeDialogue = dialogues.find((d) => d.id === selectedDialogueId) || dialogues[0];

  // Stop audio on unmount or dialogue switch
  useEffect(() => {
    return () => {
      if (currentSequenceRef.current) {
        currentSequenceRef.current.stop();
      }
      stopSpeech();
    };
  }, [selectedDialogueId]);

  const handlePlayLine = (line: DialogueLine) => {
    if (isPlayingFull && currentSequenceRef.current) {
      currentSequenceRef.current.stop();
      setIsPlayingFull(false);
    }

    setActiveLineId(line.id);
    playRussianAudio(
      line.russian,
      dialogueSpeed,
      () => setActiveLineId(null),
      () => setActiveLineId(line.id)
    );
  };

  const handlePlayFullDialogue = () => {
    if (!activeDialogue) return;

    if (isPlayingFull) {
      if (currentSequenceRef.current) {
        currentSequenceRef.current.stop();
      }
      setIsPlayingFull(false);
      setActiveLineId(null);
      return;
    }

    setIsPlayingFull(true);

    const sequenceLines = activeDialogue.lines.map((l) => ({
      text: l.russian,
      id: l.id,
    }));

    const sequence = new DialogueAudioSequence(
      sequenceLines,
      (lineId) => setActiveLineId(lineId),
      () => {
        setIsPlayingFull(false);
        setActiveLineId(null);
      }
    );

    currentSequenceRef.current = sequence;
    sequence.start(dialogueSpeed);
  };

  if (!activeDialogue) {
    return <div>Nenhum diálogo disponível.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Dialogue Selection Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Diálogos da Lição ({dialogues.length})
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Passe o mouse sobre qualquer palavra russa para ver a tradução e ouvir a pronúncia.
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {dialogues.map((d, index) => {
            const isSelected = d.id === selectedDialogueId;
            return (
              <button
                key={d.id}
                onClick={() => {
                  if (isPlayingFull && currentSequenceRef.current) {
                    currentSequenceRef.current.stop();
                  }
                  setSelectedDialogueId(d.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Diálogo {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dialogue Player Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Dialogue Header with Continuous Audio Controls */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {activeDialogue.title}
            </h3>
            {activeDialogue.description && (
              <p className="text-xs text-slate-500 mt-0.5">
                {activeDialogue.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Speed Selector */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setDialogueSpeed('normal')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  dialogueSpeed === 'normal'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1.0x Normal
              </button>
              <button
                onClick={() => setDialogueSpeed('slow')}
                className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  dialogueSpeed === 'slow'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                0.6x Lento
              </button>
            </div>

            {/* Full Continuous Audio Playback */}
            <button
              onClick={handlePlayFullDialogue}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs ${
                isPlayingFull
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isPlayingFull ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Pausar Diálogo</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Ouvir Diálogo Completo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Lines Presentation */}
        <div className="p-6 space-y-4">
          {activeDialogue.lines.map((line, idx) => {
            const isPlayingThisLine = activeLineId === line.id;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={line.id}
                className={`p-4 rounded-xl border transition-all ${
                  isPlayingThisLine
                    ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300/40 shadow-xs'
                    : 'bg-white border-slate-200/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Speaker & Content */}
                  <div className="flex items-start gap-3 flex-1">
                    {/* Avatar Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none ${
                        isEven
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {line.speaker.slice(0, 1)}
                    </div>

                    <div className="space-y-1 flex-1">
                      {/* Speaker Name */}
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        {line.speaker}
                      </span>

                      {/* Interactive Russian Line */}
                      <div className="text-base text-slate-900 font-display font-medium leading-relaxed">
                        <InteractiveSentence text={line.russian} />
                      </div>

                      {/* Portuguese Translation */}
                      <div className="text-xs text-slate-600 font-medium pt-0.5">
                        <span className="text-slate-400 mr-1.5 font-normal">PT:</span>
                        {line.portuguese}
                      </div>

                      {/* English Translation */}
                      <div className="text-xs text-slate-400">
                        <span className="text-slate-400 mr-1.5">EN:</span>
                        {line.english}
                      </div>
                    </div>
                  </div>

                  {/* Individual Audio Button */}
                  <button
                    onClick={() => handlePlayLine(line)}
                    title="Ouvir esta fala"
                    className={`p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${
                      isPlayingThisLine
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs animate-pulse'
                        : 'bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border-slate-200'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
