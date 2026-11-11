/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LESSONS_DATA } from './data/lessonsData';
import { Lesson } from './types';
import { Navbar } from './components/Navbar';
import { VocabularyTab } from './components/VocabularyTab';
import { DialoguesTab } from './components/DialoguesTab';
import { GrammarTab } from './components/GrammarTab';
import { ExercisesTab } from './components/ExercisesTab';
import { ReadingTextTab } from './components/ReadingTextTab';
import { SelfIntroductionTab } from './components/SelfIntroductionTab';
import { RoadmapModal } from './components/RoadmapModal';
import { A1CertificateModal } from './components/A1CertificateModal';
import { ArrowLeft, ArrowRight, Volume2, BookOpen, AlertCircle, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { playRussianAudio } from './utils/audio';

export default function App() {
  const [lessons] = useState<Lesson[]>(LESSONS_DATA);
  const [currentLessonId, setCurrentLessonId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'vocab' | 'dialogues' | 'text' | 'grammar' | 'exercises' | 'self'>('vocab');
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  // Load completed exercises from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ru30_completed_exercises');
      if (stored) {
        setCompletedExercises(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleExerciseCompleted = (setId: string) => {
    if (!completedExercises.includes(setId)) {
      const updated = [...completedExercises, setId];
      setCompletedExercises(updated);
      try {
        localStorage.setItem('ru30_completed_exercises', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const getLessonHighlights = (lessonId: number) => {
    switch (lessonId) {
      case 1:
        return [
          { text: 'Sem verbo ser/estar no presente', color: 'bg-emerald-500' },
          { text: '"Нормально" = tudo bem / tranquilo', color: 'bg-sky-500' },
        ];
      case 2:
        return [
          { text: 'Gênero dos substantivos (он, она, оно)', color: 'bg-emerald-500' },
          { text: 'Pronomes possessivos (мой, твой, наш, ваш)', color: 'bg-indigo-500' },
        ];
      case 3:
        return [
          { text: 'Estrutura de posse: "У меня есть..."', color: 'bg-emerald-500' },
          { text: 'Plural dos substantivos (-ы, -и, -а)', color: 'bg-purple-500' },
        ];
      case 4:
        return [
          { text: 'Caso Preposicional de lugar (в / на)', color: 'bg-emerald-500' },
          { text: 'Conjugação no presente (работать / учиться)', color: 'bg-amber-500' },
        ];
      case 5:
        return [
          { text: 'Nacionalidades e cidades natais (по национальности)', color: 'bg-emerald-500' },
          { text: 'Verbo morar no presente e passado (жить: живу / жил)', color: 'bg-rose-500' },
        ];
      case 6:
        return [
          { text: 'Advérbios de idioma (по-русски, по-английски)', color: 'bg-emerald-500' },
          { text: 'Conjugação verbal I e II (читать / говорить)', color: 'bg-indigo-500' },
          { text: 'Учиться vs. Изучать & Как vs. Какой', color: 'bg-amber-500' },
        ];
      case 7:
        return [
          { text: 'Ações de rotina e lazer (делать, отдыхать, гулять)', color: 'bg-emerald-500' },
          { text: 'Verbos da 2ª conj (смотреть, любить) & хотеть', color: 'bg-sky-500' },
          { text: 'Causalidade (потому что) & Дома vs. Домой', color: 'bg-purple-500' },
        ];
      case 8:
        return [
          { text: 'Cores e adjetivos (белый, чёрный, красный...)', color: 'bg-emerald-500' },
          { text: 'Posse no passado: был / была / было / были', color: 'bg-indigo-500' },
          { text: 'Verbo рисовать & Plurais irregulares', color: 'bg-amber-500' },
        ];
      case 9:
        return [
          { text: 'Caso Acusativo inanimado (рыбу, воду, хлеб...)', color: 'bg-emerald-500' },
          { text: 'Verbos irregulares: есть (comer) e пить (beber)', color: 'bg-amber-500' },
          { text: 'Compras: в магазине vs. на рынке', color: 'bg-sky-500' },
        ];
      case 10:
        return [
          { text: 'Vestuário e calçados (одежда, обувь, пальто...)', color: 'bg-emerald-500' },
          { text: 'Numerais de 10 a 1.000.000 & рубль / рубля / рублей', color: 'bg-indigo-500' },
          { text: 'Verbos носить e стоить & Estações do ano', color: 'bg-amber-500' },
        ];
      default:
        return [
          { text: 'Imersão comunicativa direta', color: 'bg-emerald-500' },
          { text: 'Gramática contextual aplicada', color: 'bg-sky-500' },
        ];
    }
  };

  const currentLesson = lessons.find((l) => l.id === currentLessonId) || lessons[0];
  const totalExercisesInCourse = lessons.reduce((acc, l) => acc + l.exercises.length, 0);
  const highlights = getLessonHighlights(currentLesson.id);

  const handleNextLesson = () => {
    const next = lessons.find((l) => l.id === currentLessonId + 1);
    if (next) {
      setCurrentLessonId(next.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    const prev = lessons.find((l) => l.id === currentLessonId - 1);
    if (prev) {
      setCurrentLessonId(prev.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 3-Zone Clean Header */}
      <Navbar
        currentLesson={currentLesson}
        allLessons={lessons}
        onSelectLesson={(id) => setCurrentLessonId(id)}
        activeTab={activeTab}
        onChangeTab={(t) => setActiveTab(t)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        completedExercisesCount={completedExercises.length}
        totalExercisesCount={totalExercisesInCourse}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Lesson Hero Banner */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            {/* Editorial Label & Number */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span className="text-blue-600 font-bold">Aula {currentLesson.id} de 30</span>
              <span aria-hidden="true">·</span>
              <span className={currentLesson.id === 10 ? 'text-amber-600 font-bold' : ''}>
                {currentLesson.id === 10 ? 'Grande Final do Nível A1!' : 'Nível A1 Inicial'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Com Áudio Nativo & Hover Tooltips</span>
            </div>

            {/* Russian Title */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display flex items-baseline gap-3 flex-wrap">
              <span>{currentLesson.titleRu}</span>
              <span className="text-xl sm:text-2xl font-normal text-slate-500 font-sans">
                ({currentLesson.titlePt})
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {currentLesson.descriptionPt}
            </p>

            {/* Special A1 Level Graduation Callout */}
            {currentLesson.id === 10 && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="p-2 bg-amber-200/70 text-amber-900 rounded-xl mt-0.5">
                    <Award className="w-5 h-5 text-amber-700" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">
                      🎉 Parabéns pela Conclusão do Nível A1!
                    </h3>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Você completou todas as 10 lições essenciais da base comunicativa russa. Emita o seu diploma oficial do nível A1!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver Meu Diploma A1</span>
                </button>
              </div>
            )}

            {/* Key Pedagogical Reminder Pill-Free Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              {highlights.map((h, idx) => (
                <React.Fragment key={idx}>
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span className={`w-2 h-2 rounded-full ${h.color}`} />
                    {h.text}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                </React.Fragment>
              ))}
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {currentLesson.vocabulary.length} termos com áudio duplo
              </span>
            </div>
          </div>
        </section>

        {/* Tab Content Render */}
        <section className="transition-all">
          {activeTab === 'vocab' && (
            <VocabularyTab
              vocabulary={currentLesson.vocabulary}
              lessonTitle={currentLesson.titlePt}
            />
          )}

          {activeTab === 'dialogues' && (
            <DialoguesTab dialogues={currentLesson.dialogues} />
          )}

          {activeTab === 'text' && currentLesson.readingText && (
            <ReadingTextTab readingText={currentLesson.readingText} />
          )}

          {activeTab === 'grammar' && (
            <GrammarTab grammarItems={currentLesson.grammar} />
          )}

          {activeTab === 'exercises' && (
            <ExercisesTab
              exerciseSets={currentLesson.exercises}
              onExerciseCompleted={handleExerciseCompleted}
            />
          )}

          {activeTab === 'self' && <SelfIntroductionTab />}
        </section>

        {/* Lesson Pagination Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={handlePrevLesson}
            disabled={currentLessonId <= 1}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Aula Anterior</span>
          </button>

          <div className="text-xs text-slate-500 font-medium">
            Aula <span className="font-bold text-slate-900">{currentLessonId}</span> de{' '}
            <span className="font-bold text-slate-900">{lessons.length}</span> (30 planejadas)
          </div>

          <button
            onClick={handleNextLesson}
            disabled={currentLessonId >= lessons.length}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
          >
            <span>Próxima Aula</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      {/* 30-Lessons Roadmap Modal */}
      <RoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        currentLessonId={currentLessonId}
        onSelectLesson={(id) => setCurrentLessonId(id)}
        availableLessonIds={lessons.map((l) => l.id)}
      />

      {/* A1 Level Completion Certificate Modal */}
      <A1CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Curso de Russo em 30 Aulas · Material Interativo A1–B1</p>
          <div className="flex flex-wrap items-center gap-3 text-slate-600 justify-center">
            <a
              href="/curso-russo-30-aulas-completo.zip"
              download="curso-russo-30-aulas-completo.zip"
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Baixar Pacote Completo (.ZIP)</span>
            </a>
            <span>·</span>
            <span>Áudio: Web Speech API (ru-RU)</span>
            <span>·</span>
            <span>Traduções sob Demanda</span>
            <span>·</span>
            <span>Autocompletar Inteligente</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
