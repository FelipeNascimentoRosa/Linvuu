import React, { useState } from 'react';
import { Volume2, Play, Square, BookOpen, HelpCircle, CheckCircle2, Users } from 'lucide-react';
import { ReadingTextSection } from '../types';
import { playRussianAudio, stopSpeech } from '../utils/audio';
import { InteractiveSentence } from './WordTooltip';

interface ReadingTextTabProps {
  readingText: ReadingTextSection;
}

export const ReadingTextTab: React.FC<ReadingTextTabProps> = ({ readingText }) => {
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const [showTranslation, setShowTranslation] = useState(true);
  const [playingParagraphIdx, setPlayingParagraphIdx] = useState<number | null>(null);
  const [playingQuestionIdx, setPlayingQuestionIdx] = useState<number | null>(null);

  const paragraphs = readingText.russian.split('\n\n').filter(Boolean);
  const ptParagraphs = readingText.portuguese.split('\n\n').filter(Boolean);
  const enParagraphs = readingText.english.split('\n\n').filter(Boolean);

  const handlePlayFull = () => {
    if (isPlayingFull) {
      stopSpeech();
      setIsPlayingFull(false);
      setPlayingParagraphIdx(null);
      return;
    }

    setIsPlayingFull(true);
    let currentIdx = 0;

    const playNext = () => {
      if (currentIdx >= paragraphs.length) {
        setIsPlayingFull(false);
        setPlayingParagraphIdx(null);
        return;
      }

      setPlayingParagraphIdx(currentIdx);
      playRussianAudio(paragraphs[currentIdx], speed, () => {
        currentIdx++;
        setTimeout(playNext, 600);
      });
    };

    playNext();
  };

  const handlePlayParagraph = (idx: number) => {
    if (isPlayingFull) {
      stopSpeech();
      setIsPlayingFull(false);
    }

    setPlayingParagraphIdx(idx);
    playRussianAudio(paragraphs[idx], speed, () => {
      setPlayingParagraphIdx(null);
    });
  };

  const handlePlayQA = (idx: number, text: string) => {
    setPlayingQuestionIdx(idx);
    playRussianAudio(text, 'normal', () => {
      setPlayingQuestionIdx(null);
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Leitura & Compreensão de Texto
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            {readingText.titleRu}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {readingText.titlePt} · Passe o mouse sobre qualquer palavra russa para ver a tradução instantânea.
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setSpeed('normal')}
              className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                speed === 'normal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              1.0x
            </button>
            <button
              onClick={() => setSpeed('slow')}
              className={`px-2 py-1 rounded-md font-mono transition-colors cursor-pointer ${
                speed === 'slow' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              0.6x
            </button>
          </div>

          <button
            onClick={handlePlayFull}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white transition-colors cursor-pointer shadow-xs ${
              isPlayingFull ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPlayingFull ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Pausar Leitura</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ouvir Texto Completo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Family Tree Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Árvore Genealógica da Família de Maria (Семья Марии)</span>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Guia visual para acompanhar o texto:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/90 p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs">
            <span className="font-bold text-slate-900 block mb-1 text-sm">Geração dos Pais e Avós</span>
            <div className="text-slate-600 space-y-1">
              <div>• <strong>Николай</strong> (отец / папа)</div>
              <div>• <strong>Наталья</strong> (мать / мама)</div>
              <div>• <strong>Дедушка & Бабушка</strong> (avô e avó)</div>
              <div>• <strong>Тётя Елена & Дядя Михаил</strong> (tia e tio)</div>
            </div>
          </div>

          <div className="bg-white/90 p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs">
            <span className="font-bold text-slate-900 block mb-1 text-sm">Geração dos Filhos</span>
            <div className="text-slate-600 space-y-1">
              <div>• <strong>Мария</strong> (a narradora do texto)</div>
              <div>• <strong>Андрей</strong> (irmão de Maria)</div>
              <div>• <strong>Катя</strong> (esposa de Andrei / cunhada)</div>
            </div>
          </div>

          <div className="bg-white/90 p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs">
            <span className="font-bold text-slate-900 block mb-1 text-sm">Sobrinhas e Animais</span>
            <div className="text-slate-600 space-y-1">
              <div>• <strong>Дима</strong> (племянник / sobrinho)</div>
              <div>• <strong>Наташа</strong> (племянница / sobrinha)</div>
              <div>• <strong>Шарик</strong> (собака / nosso cachorro)</div>
              <div>• <strong>Мурка</strong> (кошка / nossa gata)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Text Content */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Parágrafos do Texto
          </h3>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            {showTranslation ? 'Ocultar Traduções' : 'Mostrar Traduções'}
          </button>
        </div>

        <div className="space-y-6">
          {paragraphs.map((par, idx) => {
            const isPlayingThis = playingParagraphIdx === idx;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isPlayingThis
                    ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300/40 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200/70 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    {/* Russian Interactive Paragraph */}
                    <div className="text-base text-slate-900 font-display font-medium leading-relaxed">
                      <InteractiveSentence text={par} />
                    </div>

                    {/* Translations */}
                    {showTranslation && (
                      <div className="space-y-0.5 pt-2 border-t border-slate-200/60 text-xs">
                        <div className="text-slate-700">
                          <span className="text-slate-400 font-medium mr-1.5">PT:</span>
                          {ptParagraphs[idx]}
                        </div>
                        <div className="text-slate-400">
                          <span className="text-slate-400 mr-1.5">EN:</span>
                          {enParagraphs[idx]}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Paragraph Audio Button */}
                  <button
                    onClick={() => handlePlayParagraph(idx)}
                    title="Ouvir este parágrafo"
                    className={`p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                      isPlayingThis
                        ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                        : 'bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border-slate-200'
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

      {/* Comprehension Questions & Answers */}
      {readingText.questions && readingText.questions.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Вопросы к тексту (Perguntas e Respostas de Compreensão)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Respostas do ponto de vista de Maria (Мария), corrigindo as afirmações falsas sobre sua família.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {readingText.questions.map((q, qIdx) => {
              const isPlayingQ = playingQuestionIdx === qIdx;
              return (
                <div
                  key={qIdx}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-slate-900 text-sm font-display">
                        {q.questionRu}
                      </div>
                      <button
                        onClick={() => handlePlayQA(qIdx, `${q.questionRu} ${q.answerRu}`)}
                        className={`p-1.5 rounded-lg border transition-colors shrink-0 cursor-pointer ${
                          isPlayingQ
                            ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                            : 'bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border-slate-200'
                        }`}
                        title="Ouvir pergunta e resposta"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {q.questionPt}
                    </div>

                    <div className="pt-1.5 mt-1 border-t border-slate-200/60">
                      <div className="font-semibold text-emerald-800 text-xs font-mono">
                        → {q.answerRu}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        → {q.answerPt}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
