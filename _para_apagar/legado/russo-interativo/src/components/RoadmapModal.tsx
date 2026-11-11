import React, { useState } from 'react';
import { X, CheckCircle2, Lock, ArrowRight, BookOpen, Sparkles, PlusCircle, Download } from 'lucide-react';
import { COURSE_ROADMAP, CoursePlanItem } from '../data/lessonsData';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonId: number;
  onSelectLesson: (id: number) => void;
  availableLessonIds: number[];
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  currentLessonId,
  onSelectLesson,
  availableLessonIds,
}) => {
  const [filterLevel, setFilterLevel] = useState<'all' | 'A1' | 'A2' | 'B1'>('all');

  if (!isOpen) return null;

  const filtered = COURSE_ROADMAP.filter((item) => {
    if (filterLevel === 'all') return true;
    return item.level === filterLevel;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[88vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Currículo Completo
              </span>
              <span className="text-xs text-slate-500">30 Aulas Planejadas</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display mt-1">
              Plano de Estudos de Russo: Do Zero ao B1
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Filters */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between gap-2 flex-wrap bg-white">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1">Nível:</span>
            {(['all', 'A1', 'A2', 'B1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  filterLevel === lvl
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl === 'all' ? 'Todas (30)' : `${lvl}`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-600 font-medium hidden sm:inline">
              🎉 Aulas 1 a 10 disponíveis (Nível A1 Completo!)
            </span>
            <a
              href="/curso-russo-30-aulas-completo.zip"
              download="curso-russo-30-aulas-completo.zip"
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Tudo (.ZIP)</span>
            </a>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="p-6 overflow-y-auto space-y-2.5">
          {filtered.map((item) => {
            const isAvailable = availableLessonIds.includes(item.number);
            const isCurrent = currentLessonId === item.number;

            return (
              <div
                key={item.number}
                onClick={() => {
                  if (isAvailable) {
                    onSelectLesson(item.number);
                    onClose();
                  }
                }}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-400/20'
                    : isAvailable
                    ? 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 cursor-pointer'
                    : 'border-slate-100 bg-slate-50/50 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-mono shrink-0 ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isAvailable
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {item.number < 10 ? `0${item.number}` : item.number}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm font-display">
                        {item.titleRu}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        {item.level}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Em estudo
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      {item.titlePt}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.theme}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isAvailable ? (
                    <button
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700'
                      }`}
                    >
                      <span>Abrir Aula</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Em breve</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          Você pode ir adicionando as próximas aulas uma a uma conforme extrair do livro didático!
        </div>
      </div>
    </div>
  );
};
