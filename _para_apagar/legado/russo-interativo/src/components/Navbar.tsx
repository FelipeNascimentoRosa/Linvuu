import React from 'react';
import { BookOpen, Map, Volume2, Sparkles, CheckCircle2, Award, Download } from 'lucide-react';
import { Lesson } from '../types';

interface NavbarProps {
  currentLesson: Lesson;
  allLessons: Lesson[];
  onSelectLesson: (id: number) => void;
  activeTab: 'vocab' | 'dialogues' | 'text' | 'grammar' | 'exercises' | 'self';
  onChangeTab: (tab: 'vocab' | 'dialogues' | 'text' | 'grammar' | 'exercises' | 'self') => void;
  onOpenRoadmap: () => void;
  onOpenCertificate?: () => void;
  completedExercisesCount: number;
  totalExercisesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLesson,
  allLessons,
  onSelectLesson,
  activeTab,
  onChangeTab,
  onOpenRoadmap,
  onOpenCertificate,
  completedExercisesCount,
  totalExercisesCount,
}) => {
  const tabs = [
    { id: 'vocab' as const, label: 'Vocabulário', count: currentLesson.vocabulary.length },
    { id: 'dialogues' as const, label: 'Diálogos', count: currentLesson.dialogues.length },
    ...(currentLesson.readingText
      ? [{ id: 'text' as const, label: 'Texto & Leitura', highlight: true }]
      : []),
    { id: 'grammar' as const, label: 'Gramática', highlight: true },
    { id: 'exercises' as const, label: 'Exercícios', count: currentLesson.exercises.length },
    { id: 'self' as const, label: 'О себе (Sobre Mim)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      {/* Top 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onChangeTab('vocab');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                RU
              </span>
              <span className="font-display font-semibold">Russo 30 Aulas</span>
            </a>

            {/* Quiet Lesson Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs text-slate-600 font-medium">
              <span className="text-slate-400">Aula</span>
              <select
                value={currentLesson.id}
                onChange={(e) => onSelectLesson(Number(e.target.value))}
                className="bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold rounded-md px-2.5 py-1 text-xs border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                aria-label="Selecionar Aula"
              >
                {allLessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.id}. {l.titleRu} — {l.titlePt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Zone 2: Navigation Links / Segmented Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChangeTab(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] tabular-nums font-mono px-1 rounded ${
                        isActive ? 'bg-slate-100 text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Avisos importantes de gramática" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Exercises Completed Counter */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Progresso:</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {completedExercisesCount}/{totalExercisesCount}
              </span>
            </div>

            {/* A1 Completion Diploma Button */}
            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                title="Ver Certificado Oficial do Nível A1"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Diploma A1</span>
              </button>
            )}

            {/* 30-Lessons Roadmap Button */}
            <button
              onClick={onOpenRoadmap}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              <Map className="w-3.5 h-3.5 text-blue-600" />
              <span>Grade 30 Aulas</span>
            </button>

            {/* Download Full ZIP Button */}
            <a
              href="/curso-russo-30-aulas-completo.zip"
              download="curso-russo-30-aulas-completo.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              title="Baixar todas as aulas, códigos e apostilas em arquivo ZIP"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Baixar Tudo (.ZIP)</span>
              <span className="sm:hidden">ZIP</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
