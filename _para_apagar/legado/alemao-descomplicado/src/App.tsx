import React, { useState } from 'react';
import { Header } from './components/Header';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { TableOfContents } from './components/TableOfContents';

// Componentes da Semana 1
import { Bloco1Grammar } from './components/Bloco1Grammar';
import { Bloco2TextsLexicon } from './components/Bloco2TextsLexicon';
import { Bloco3ExercisesReview } from './components/Bloco3ExercisesReview';
import { Bloco1Grammar02 } from './components/Bloco1Grammar02';
import { Bloco2TextsLexicon02 } from './components/Bloco2TextsLexicon02';
import { Bloco3ExercisesReview02 } from './components/Bloco3ExercisesReview02';
import { Bloco1Grammar03 } from './components/Bloco1Grammar03';
import { Bloco2TextsLexicon03 } from './components/Bloco2TextsLexicon03';
import { Bloco3ExercisesReview03 } from './components/Bloco3ExercisesReview03';
import { Bloco1Grammar04 } from './components/Bloco1Grammar04';
import { Bloco2TextsLexicon04 } from './components/Bloco2TextsLexicon04';
import { Bloco3ExercisesReview04 } from './components/Bloco3ExercisesReview04';
import { Bloco1Grammar05 } from './components/Bloco1Grammar05';
import { Bloco2TextsLexicon05 } from './components/Bloco2TextsLexicon05';
import { Bloco3ExercisesReview05 } from './components/Bloco3ExercisesReview05';
import { Bloco1Grammar06 } from './components/Bloco1Grammar06';
import { Bloco2TextsLexicon06 } from './components/Bloco2TextsLexicon06';
import { Bloco3ExercisesReview06 } from './components/Bloco3ExercisesReview06';
import { Bloco1Grammar07 } from './components/Bloco1Grammar07';
import { Bloco2TextsLexicon07 } from './components/Bloco2TextsLexicon07';
import { Bloco3ExercisesReview07 } from './components/Bloco3ExercisesReview07';
import { Bloco1Grammar08 } from './components/Bloco1Grammar08';
import { Bloco2TextsLexicon08 } from './components/Bloco2TextsLexicon08';
import { Bloco3ExercisesReview08 } from './components/Bloco3ExercisesReview08';
import { Bloco1Grammar09 } from './components/Bloco1Grammar09';
import { Bloco2TextsLexicon09 } from './components/Bloco2TextsLexicon09';
import { Bloco3ExercisesReview09 } from './components/Bloco3ExercisesReview09';

// Componentes da Semana 2
import { Bloco1GrammarW2L07 } from './components/semana2/Bloco1GrammarW2L07';
import { Bloco2TextsLexiconW2L07 } from './components/semana2/Bloco2TextsLexiconW2L07';
import { Bloco3ExercisesReviewW2L07 } from './components/semana2/Bloco3ExercisesReviewW2L07';
import { Bloco1GrammarW2L08 } from './components/semana2/Bloco1GrammarW2L08';
import { Bloco2TextsLexiconW2L08 } from './components/semana2/Bloco2TextsLexiconW2L08';
import { Bloco3ExercisesReviewW2L08 } from './components/semana2/Bloco3ExercisesReviewW2L08';
import { Bloco1GrammarW2L09 } from './components/semana2/Bloco1GrammarW2L09';
import { Bloco2TextsLexiconW2L09 } from './components/semana2/Bloco2TextsLexiconW2L09';
import { Bloco3ExercisesReviewW2L09 } from './components/semana2/Bloco3ExercisesReviewW2L09';
import { Bloco1GrammarW2L10 } from './components/semana2/Bloco1GrammarW2L10';
import { Bloco2TextsLexiconW2L10 } from './components/semana2/Bloco2TextsLexiconW2L10';
import { Bloco3ExercisesReviewW2L10 } from './components/semana2/Bloco3ExercisesReviewW2L10';
import { Bloco1GrammarW2L11 } from './components/semana2/Bloco1GrammarW2L11';
import { Bloco2TextsLexiconW2L11 } from './components/semana2/Bloco2TextsLexiconW2L11';
import { Bloco3ExercisesReviewW2L11 } from './components/semana2/Bloco3ExercisesReviewW2L11';
import { Bloco1GrammarW2L12 } from './components/semana2/Bloco1GrammarW2L12';
import { Bloco2TextsLexiconW2L12 } from './components/semana2/Bloco2TextsLexiconW2L12';
import { Bloco3ExercisesReviewW2L12 } from './components/semana2/Bloco3ExercisesReviewW2L12';
import { Bloco1GrammarW2L13 } from './components/semana2/Bloco1GrammarW2L13';
import { Bloco2TextsLexiconW2L13 } from './components/semana2/Bloco2TextsLexiconW2L13';
import { Bloco3ExercisesReviewW2L13 } from './components/semana2/Bloco3ExercisesReviewW2L13';

import { AudioStudioModal } from './components/AudioStudioModal';
import { LESSON_METADATA } from './data/lesson01Data';
import { LESSON_02_METADATA } from './data/lesson02Data';
import { LESSON_03_METADATA } from './data/lesson03Data';
import { LESSON_04_METADATA } from './data/lesson04Data';
import { LESSON_05_METADATA } from './data/lesson05Data';
import { LESSON_06_METADATA } from './data/lesson06Data';
import { LESSON_07_METADATA } from './data/lesson07Data';
import { LESSON_08_METADATA } from './data/lesson08Data';
import { LESSON_09_METADATA } from './data/lesson09Data';
import { SEMANA_02_LESSON_07_METADATA } from './data/semana2Lesson07Data';
import { SEMANA_02_LESSON_08_METADATA } from './data/semana2Lesson08Data';
import { SEMANA_02_LESSON_09_METADATA } from './data/semana2Lesson09Data';
import { SEMANA_02_LESSON_10_METADATA } from './data/semana2Lesson10Data';
import { SEMANA_02_LESSON_11_METADATA } from './data/semana2Lesson11Data';
import { SEMANA_02_LESSON_12_METADATA } from './data/semana2Lesson12Data';
import { SEMANA_02_LESSON_13_METADATA } from './data/semana2Lesson13Data';
import { Headphones, CheckCircle, GraduationCap, ChevronUp } from 'lucide-react';

export default function App() {
  // Inicialização padrão na Semana 2 (Dia 013 / Aula 13)
  const [currentWeek, setCurrentWeek] = useState<1 | 2>(2);
  const [currentLesson, setCurrentLesson] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13>(13);
  const [activeTab, setActiveTab] = useState<'all' | 'bloco1' | 'bloco2' | 'bloco3'>('all');
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    // Se a aba oculta a seção, abre a aba correspondente
    if ((id.startsWith('sec-1-') || id.startsWith('secao-1-')) && activeTab !== 'all' && activeTab !== 'bloco1') {
      setActiveTab('bloco1');
    } else if ((id.startsWith('sec-2-') || id.startsWith('secao-2-')) && activeTab !== 'all' && activeTab !== 'bloco2') {
      setActiveTab('bloco2');
    } else if ((id.startsWith('sec-3-') || id.startsWith('secao-3-')) && activeTab !== 'all' && activeTab !== 'bloco3') {
      setActiveTab('bloco3');
    }

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMetadata =
    currentWeek === 2
      ? currentLesson === 13
        ? SEMANA_02_LESSON_13_METADATA
        : currentLesson === 12
        ? SEMANA_02_LESSON_12_METADATA
        : currentLesson === 11
        ? SEMANA_02_LESSON_11_METADATA
        : currentLesson === 10
        ? SEMANA_02_LESSON_10_METADATA
        : currentLesson === 9
        ? SEMANA_02_LESSON_09_METADATA
        : currentLesson === 8
        ? SEMANA_02_LESSON_08_METADATA
        : SEMANA_02_LESSON_07_METADATA
      : currentLesson === 1
      ? LESSON_METADATA
      : currentLesson === 2
      ? LESSON_02_METADATA
      : currentLesson === 3
      ? LESSON_03_METADATA
      : currentLesson === 4
      ? LESSON_04_METADATA
      : currentLesson === 5
      ? LESSON_05_METADATA
      : currentLesson === 6
      ? LESSON_06_METADATA
      : currentLesson === 7
      ? LESSON_07_METADATA
      : currentLesson === 8
      ? LESSON_08_METADATA
      : LESSON_09_METADATA;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Header com comutação Semana 1 vs Semana 2 */}
      <Header
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        currentLesson={currentLesson}
        setCurrentLesson={setCurrentLesson}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      {/* Container Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Barra de Áudio Unificada */}
        <AudioPlayerBar onOpenStudio={() => setIsStudioOpen(true)} />

        {/* Índice Rápido de Navegação */}
        <TableOfContents week={currentWeek} lesson={currentLesson} onSelectSection={scrollToSection} />

        {/* ============================================================== */}
        {/* SEMANA 2 — AULA 07 (DIA 007 DO CRONOGRAMA: KAPITEL 3, TEIL A) */}
        {/* ============================================================== */}
        {currentWeek === 2 && currentLesson === 7 && (
          <>
            {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1GrammarW2L07 />}
            {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexiconW2L07 />}
            {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReviewW2L07 />}
          </>
        )}

        {/* ============================================================== */}
        {/* SEMANA 2 — AULA 08 (DIA 008 DO CRONOGRAMA: KAPITEL 3, TEIL B-D) */}
        {/* ============================================================== */}
        {currentWeek === 2 && currentLesson === 8 && (
          <>
            {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1GrammarW2L08 />}
            {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexiconW2L08 />}
            {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReviewW2L08 />}
          </>
        )}

        {/* ============================================================== */}
        {/* SEMANA 2 — AULA 09 (DIA 009 DO CRONOGRAMA: KAPITEL 4, TEIL A) */}
        {/* ============================================================== */}
        {currentWeek === 2 && currentLesson === 9 && (
          <>
            {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1GrammarW2L09 />}
            {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexiconW2L09 />}
            {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReviewW2L09 />}
          </>
        )}

        {/* ============================================================== */}
        {/* SEMANA 2 — AULA 10 (DIA 010 DO CRONOGRAMA: KAPITEL 4, TEIL B-D) */}
        {/* ============================================================== */}
        {currentWeek === 2 && currentLesson === 10 && (
          <>
            {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1GrammarW2L10 />}
            {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexiconW2L10 />}
            {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReviewW2L10 />}
          </>
        )}

        {/* ============================================================== */}
        {/* SEMANA 2 — AULA 11 (DIA 011 DO CRONOGRAMA: KAPITEL 5, TEIL A) */}
        {/* ============================================================== */}
        {currentWeek === 2 && currentLesson === 11 && (
          <>
            {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1GrammarW2L11 />}
            {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexiconW2L11 />}
            {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReviewW2L11 />}
          </>
        )}

        {/* ============================================================== */}
        {/* SEMANA 2 — AULA 12 (DIA 012 DO CRONOGRAMA: KAPITEL 5, TEIL B-D) */}
        {/* ============================================================== */}
        {currentWeek === 2 && currentLesson === 12 && (
          <>
            {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1GrammarW2L12 />}
            {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexiconW2L12 />}
            {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReviewW2L12 />}
          </>
        )}

        {/* ============================================================== */}
        {/* SEMANA 2 — AULA 13 (DIA 013 DO CRONOGRAMA: KAPITEL 6, TEIL A)   */}
        {/* ============================================================== */}
        {currentWeek === 2 && currentLesson === 13 && (
          <>
            {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1GrammarW2L13 />}
            {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexiconW2L13 />}
            {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReviewW2L13 />}
          </>
        )}

        {/* ============================================================== */}
        {/* SEMANA 1 (ARQUIVO HISTÓRICO DAS AULAS 01 A 09)                */}
        {/* ============================================================== */}
        {currentWeek === 1 && (
          <>
            {/* Aula 1 */}
            {currentLesson === 1 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview />}
              </>
            )}

            {/* Aula 2 */}
            {currentLesson === 2 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar02 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon02 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview02 />}
              </>
            )}

            {/* Aula 3 */}
            {currentLesson === 3 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar03 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon03 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview03 />}
              </>
            )}

            {/* Aula 4 */}
            {currentLesson === 4 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar04 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon04 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview04 />}
              </>
            )}

            {/* Aula 5 */}
            {currentLesson === 5 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar05 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon05 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview05 />}
              </>
            )}

            {/* Aula 6 */}
            {currentLesson === 6 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar06 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon06 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview06 />}
              </>
            )}

            {/* Aula 7 (Extra Semana 1) */}
            {currentLesson === 7 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar07 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon07 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview07 />}
              </>
            )}

            {/* Aula 8 (Extra Semana 1) */}
            {currentLesson === 8 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar08 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon08 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview08 />}
              </>
            )}

            {/* Aula 9 (Extra Semana 1) */}
            {currentLesson === 9 && (
              <>
                {(activeTab === 'all' || activeTab === 'bloco1') && <Bloco1Grammar09 />}
                {(activeTab === 'all' || activeTab === 'bloco2') && <Bloco2TextsLexicon09 />}
                {(activeTab === 'all' || activeTab === 'bloco3') && <Bloco3ExercisesReview09 />}
              </>
            )}
          </>
        )}

        {/* Rodapé da Aula */}
        <footer className="mt-16 pt-8 pb-12 border-t border-slate-200 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-slate-700" />
            <span className="font-semibold text-slate-700">Alemão Descomplicado — Sistema de Aulas Estruturadas</span>
          </div>
          <div>
            <span>{currentMetadata.round} · {currentMetadata.day} — {currentMetadata.chapter}</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Voltar ao Topo</span>
          </button>
        </footer>
      </main>

      {/* Modal Flutuante do Estúdio de Áudio */}
      <AudioStudioModal isOpen={isStudioOpen} onClose={() => setIsStudioOpen(false)} />
    </div>
  );
}
