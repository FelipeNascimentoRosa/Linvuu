import React from 'react';
import {
  BookOpen,
  Headphones,
  Printer,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Layers,
  Calendar,
  Download,
} from 'lucide-react';
import { LESSON_METADATA } from '../data/lesson01Data';
import { LESSON_02_METADATA } from '../data/lesson02Data';
import { LESSON_03_METADATA } from '../data/lesson03Data';
import { LESSON_04_METADATA } from '../data/lesson04Data';
import { LESSON_05_METADATA } from '../data/lesson05Data';
import { LESSON_06_METADATA } from '../data/lesson06Data';
import { LESSON_07_METADATA } from '../data/lesson07Data';
import { LESSON_08_METADATA } from '../data/lesson08Data';
import { LESSON_09_METADATA } from '../data/lesson09Data';
import { SEMANA_02_LESSON_07_METADATA } from '../data/semana2Lesson07Data';
import { SEMANA_02_LESSON_08_METADATA } from '../data/semana2Lesson08Data';
import { SEMANA_02_LESSON_09_METADATA } from '../data/semana2Lesson09Data';
import { SEMANA_02_LESSON_10_METADATA } from '../data/semana2Lesson10Data';
import { SEMANA_02_LESSON_11_METADATA } from '../data/semana2Lesson11Data';
import { SEMANA_02_LESSON_12_METADATA } from '../data/semana2Lesson12Data';
import { SEMANA_02_LESSON_13_METADATA } from '../data/semana2Lesson13Data';
import { AudioButton } from './AudioButton';

interface HeaderProps {
  currentWeek: 1 | 2;
  setCurrentWeek: (week: 1 | 2) => void;
  currentLesson: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  setCurrentLesson: (lesson: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) => void;
  activeTab: 'all' | 'bloco1' | 'bloco2' | 'bloco3';
  setActiveTab: (tab: 'all' | 'bloco1' | 'bloco2' | 'bloco3') => void;
  onOpenStudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentWeek,
  setCurrentWeek,
  currentLesson,
  setCurrentLesson,
  activeTab,
  setActiveTab,
  onOpenStudio,
}) => {
  const metadata =
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
    <header id="main-header" className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand & Lesson Title */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0 ${
              currentWeek === 2 ? 'bg-blue-900 text-amber-400' : 'bg-slate-900 text-amber-400'
            }`}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Seletor de Semana (Week 1 vs Week 2) */}
                <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100/90 shadow-2xs">
                  <button
                    onClick={() => {
                      setCurrentWeek(2);
                      setCurrentLesson(10);
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                      currentWeek === 2
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Semana 2 (Atual)
                  </button>
                  <button
                    onClick={() => {
                      setCurrentWeek(1);
                      setCurrentLesson(6);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      currentWeek === 1
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Semana 1 (Arquivo)
                  </button>
                </div>

                {/* Sub-Seletor de Aulas para a Semana Ativa */}
                {currentWeek === 2 ? (
                  <div className="inline-flex rounded-lg border border-blue-200 p-0.5 bg-blue-50">
                    <button
                      onClick={() => setCurrentLesson(7)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentLesson === 7
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'text-blue-800 hover:text-blue-950'
                      }`}
                    >
                      Aula 07 · Dia 007
                    </button>
                    <button
                      onClick={() => setCurrentLesson(8)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentLesson === 8
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'text-blue-800 hover:text-blue-950'
                      }`}
                    >
                      Aula 08 · Dia 008
                    </button>
                    <button
                      onClick={() => setCurrentLesson(9)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentLesson === 9
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'text-blue-800 hover:text-blue-950'
                      }`}
                    >
                      Aula 09 · Dia 009
                    </button>
                    <button
                      onClick={() => setCurrentLesson(10)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentLesson === 10
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'text-blue-800 hover:text-blue-950'
                      }`}
                    >
                      Aula 10 · Dia 010
                    </button>
                    <button
                      onClick={() => setCurrentLesson(11)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentLesson === 11
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'text-blue-800 hover:text-blue-950'
                      }`}
                    >
                      Aula 11 · Dia 011
                    </button>
                    <button
                      onClick={() => setCurrentLesson(12)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentLesson === 12
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'text-blue-800 hover:text-blue-950'
                      }`}
                    >
                      Aula 12 · Dia 012
                    </button>
                    <button
                      onClick={() => setCurrentLesson(13)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentLesson === 13
                          ? 'bg-blue-700 text-white shadow-2xs'
                          : 'text-blue-800 hover:text-blue-950'
                      }`}
                    >
                      Aula 13 · Dia 013
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100/80 overflow-x-auto max-w-xs sm:max-w-none">
                    <button
                      onClick={() => setCurrentLesson(1)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 1 ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      A1
                    </button>
                    <button
                      onClick={() => setCurrentLesson(2)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 2 ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      A2
                    </button>
                    <button
                      onClick={() => setCurrentLesson(3)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 3 ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      A3
                    </button>
                    <button
                      onClick={() => setCurrentLesson(4)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 4 ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      A4
                    </button>
                    <button
                      onClick={() => setCurrentLesson(5)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 5 ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      A5
                    </button>
                    <button
                      onClick={() => setCurrentLesson(6)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 6 ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      A6
                    </button>
                    <button
                      onClick={() => setCurrentLesson(7)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 7 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600'
                      }`}
                    >
                      Ex7
                    </button>
                    <button
                      onClick={() => setCurrentLesson(8)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 8 ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600'
                      }`}
                    >
                      Ex8
                    </button>
                    <button
                      onClick={() => setCurrentLesson(9)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        currentLesson === 9 ? 'bg-rose-600 text-white font-bold' : 'text-slate-600'
                      }`}
                    >
                      Ex9
                    </button>
                  </div>
                )}

                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {metadata.round} · {metadata.day}
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  {metadata.chapter}
                </span>
              </div>

              <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-1 tracking-tight">
                {currentWeek === 2
                  ? currentLesson === 13
                    ? 'Alemão Descomplicado — Semana 2 · Rodada 13: As 4 Estações, Clima, denn vs. weil, wollen vs. möchten, Verben mit Dativ & Hiddensee (Kapitel 6, Teil A, A1–A20)'
                    : currentLesson === 12
                    ? 'Alemão Descomplicado — Semana 2 · Rodada 12: Verbos Separáveis/Inseparáveis/-ieren, Perfekt Avançado, Wechselpräpositionen & Kundenservice (Kapitel 5, Teil B–D, A20–A34)'
                    : currentLesson === 11
                    ? 'Alemão Descomplicado — Semana 2 · Rodada 11: Verbos Separáveis & Inseparáveis, Perfekt (haben/sein), Modalverben (müssen/sollen) & Horários (Kapitel 5, Teil A, A1–A19)'
                    : currentLesson === 10
                    ? 'Alemão Descomplicado — Semana 2 · Rodada 10: O Imperativo Completo, Conjunções (trotzdem/deshalb), Perfekt, Reflexivos & Culinária (Kapitel 4, Teil B–D, A16–A32)'
                    : currentLesson === 9
                    ? 'Alemão Descomplicado — Semana 2 · Rodada 09: O Modalverb mögen, Präteritum (war/hatte), Acusativo de Alimentos, Supermercado & Restaurante (Kapitel 4, Teil A, A1–A15)'
                    : currentLesson === 8
                    ? 'Alemão Descomplicado — Semana 2 · Rodada 08: As 5 Famílias do Plural, Substantivos Compostos, Pronomes no Acusativo & Munique (Kapitel 3, Teil B–D)'
                    : 'Alemão Descomplicado — Semana 2 · Rodada 07: O Caso Acusativo com Adjetivos, Verbos, Fonética (ö/ü), Munique & E-mail (Kapitel 3, Teil A, A14–A29)'
                  : currentLesson === 1
                  ? 'Alemão Descomplicado — Anatomia Gramatical & Registros (A1–A16)'
                  : currentLesson === 2
                  ? 'Alemão Descomplicado — Alternância Vocálica, Inflexões & Números (A17–A26)'
                  : currentLesson === 3
                  ? 'Alemão Descomplicado — Artigos, Possessivos, Satzbau & Plural (B1–D3)'
                  : currentLesson === 4
                  ? 'Alemão Descomplicado — Im Büro: Gêneros, Modalverb können, Satzklammer & Adjetivos (Kapitel 2, Teil A)'
                  : currentLesson === 5
                  ? 'Alemão Descomplicado — Preposições Locais, Alternância Vocálica & Agenda Semanal (Kapitel 2, Teil B–D)'
                  : currentLesson === 6
                  ? 'Alemão Descomplicado — O Caso Acusativo (Akkusativ), Modalverb möchte(n), Komposita & Hotelreservierung (Kapitel 3, Teil A)'
                  : currentLesson === 7
                  ? 'Alemão Descomplicado — Sobrevivência Linguística: As 150 Expressões Mais Usadas (Kapitel 0)'
                  : currentLesson === 8
                  ? 'Alemão Descomplicado — Guia Definitivo das Preposições Locais'
                  : 'Alemão Descomplicado — Os Verbos de Mudança Vocálica e Irregulares do Presente'}
              </h1>
            </div>
          </div>

          {/* Action utilities */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {currentWeek === 2 ? (
              <AudioButton
                text="Guten Tag! Willkommen zu Woche 2 und Tag 7 unseres Kurses Deutsch unkompliziert. Heute lernen wir den Akkusativ mit attributiven Adjektiven, die Umlaute ö und ü, die Sehenswürdigkeiten in München und das Schreiben einer E-Mail."
                lang="de-DE"
                size="sm"
                label="🇩🇪 Boas-Vindas Semana 2"
              />
            ) : currentLesson === 1 ? (
              <AudioButton
                text="Guten Tag! Willkommen zu Kapitel 1, Teil A. Heute lernen wir die Grammatik und machen Hörübungen."
                lang="de-DE"
                size="sm"
                label="🇩🇪 Boas-Vindas Aula 1"
              />
            ) : currentLesson === 2 ? (
              <AudioButton
                text="Guten Tag! Willkommen zu Kapitel 1, Teil A, A17 bis A26."
                lang="de-DE"
                size="sm"
                label="🇩🇪 Boas-Vindas Aula 2"
              />
            ) : (
              <AudioButton
                text="Guten Tag! Willkommen zurück zum Kurs Deutsch unkompliziert."
                lang="de-DE"
                size="sm"
                label="🇩🇪 Boas-Vindas"
              />
            )}
            <a
              id="download-zip-btn"
              href="/alemao-descomplicado-semana-1-e-2.zip"
              download="alemao-descomplicado-semana-1-e-2.zip"
              title="Baixar todo o conteúdo da Semana 1 e 2 em arquivo .ZIP para o Gemini Pro"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar ZIP (Semana 1 & 2)</span>
            </a>
            <button
              id="open-audio-studio-header-btn"
              onClick={onOpenStudio}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs cursor-pointer transition-colors"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Estúdio de Áudios</span>
            </button>
            <button
              id="print-page-btn"
              onClick={() => window.print()}
              title="Imprimir ou Salvar em PDF"
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 border-t border-slate-100 py-1 overflow-x-auto text-xs sm:text-sm scrollbar-none">
          <button
            id="tab-btn-all"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Visão Geral Completa
          </button>
          <button
            id="tab-btn-bloco1"
            onClick={() => setActiveTab('bloco1')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'bloco1'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Bloco 1 · Anatomia Gramatical (60 min)
          </button>
          <button
            id="tab-btn-bloco2"
            onClick={() => setActiveTab('bloco2')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'bloco2'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Bloco 2 · Textos, Áudios & Léxico (60 min)
          </button>
          <button
            id="tab-btn-bloco3"
            onClick={() => setActiveTab('bloco3')}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'bloco3'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Bloco 3 · Exercícios & Gabarito (60 min)
          </button>
        </div>
      </div>
    </header>
  );
};
