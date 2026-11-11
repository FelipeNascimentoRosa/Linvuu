import React, { useState } from 'react';
import {
  EXERCISE_A6_QUESTIONS,
  TEXT_A8_DIALOGUE_ITEMS,
  GENDERS_A9,
  EXERCISE_A11_STATEMENTS,
  EXERCISE_A13_PROBLEMS,
  TEXT_A15_ITEMS,
  TEXT_A16_NOMEN_NOMINATIV,
  TEXT_A17_NOMEN_AKKUSATIV,
  REVERSE_TRANSLATION_LESSON_6,
  KEY_POINTS_LESSON_6,
} from '../data/lesson06Data';
import { AudioButton } from './AudioButton';
import {
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  BookOpen,
  Layers,
  ArrowRight,
  ShieldAlert,
  Building2,
  AlertTriangle,
} from 'lucide-react';

export const Bloco3ExercisesReview06: React.FC = () => {
  const [revealedA6, setRevealedA6] = useState<boolean>(false);
  const [revealedA11, setRevealedA11] = useState<boolean>(false);
  const [revealedA13, setRevealedA13] = useState<boolean>(false);
  const [revealedReverse, setRevealedReverse] = useState<Record<number, boolean>>({});
  const [allReverseRevealed, setAllReverseRevealed] = useState<boolean>(false);

  const toggleReverse = (id: number) => {
    setRevealedReverse((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllReverse = () => {
    if (allReverseRevealed) {
      setRevealedReverse({});
      setAllReverseRevealed(false);
    } else {
      const full: Record<number, boolean> = {};
      REVERSE_TRANSLATION_LESSON_6.forEach((item) => {
        full[item.id] = true;
      });
      setRevealedReverse(full);
      setAllReverseRevealed(true);
    }
  };

  return (
    <section id="bloco-3-exercicios-revisao-rodada6" className="space-y-12">
      {/* Banner de Abertura */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 3 (60 Minutos) · Rodada 06
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 006 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Exercícios Comentados & Tradução Reversa de Blindagem
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Kapitel 3, Teil A (A1–A17, p. 58–65): Resolução exaustiva de perguntas sobre os três hotéis de Munique (A6), diálogo de recepção (A8),
          distribuição de gêneros (A9), necessidades e prioridades (A11), gestão de falhas no quarto (A13), incapacidades funcionais (A15),
          declinações no Nominativo/Acusativo (A16–A17), 10 desafios de evocação ativa e os 14 Mandamentos da Rodada 06.
        </p>
      </div>

      {/* 3.1 Exercício A6 — 14 Perguntas e Respostas sobre os 3 Hotéis */}
      <div id="secao-3-1-exercicio-a6" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Exercício A6 (p. 61)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A6 — <em>Informationen</em> (Compreensão dos 3 Hotéis de Munique)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              14 perguntas e respostas detalhadas sobre Hotel Central, Hotel Krone e Hotel Am Park.
            </p>
          </div>
          <button
            onClick={() => setRevealedA6(!revealedA6)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-100 text-indigo-900 hover:bg-indigo-200 transition-colors cursor-pointer"
          >
            {revealedA6 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {revealedA6 ? 'Ocultar Respostas' : 'Revelar Respostas'}
          </button>
        </div>

        <div className="p-6 space-y-3">
          {EXERCISE_A6_QUESTIONS.map((q) => (
            <div key={q.num} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{q.pergunta}</span>
                <AudioButton text={q.resposta} size="sm" />
              </div>
              {revealedA6 && (
                <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs font-mono font-medium flex items-center justify-between gap-2">
                  <span>{q.resposta}</span>
                  <span className="text-slate-500 font-sans text-xs italic">{q.detalhe}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3.4 Exercício A11 — Was brauchen Sie unbedingt? (21 Sentenças) */}
      <div id="secao-3-4-exercicio-a11" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Exercício A11 (p. 63)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A11 — <em>Was brauchen Sie unbedingt?</em> (21 Sentenças de Preferências)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Treinamento de regência do Acusativo com <em>brauchen</em>, <em>finden ... wichtig</em> e negações.
            </p>
          </div>
          <button
            onClick={() => setRevealedA11(!revealedA11)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-100 text-indigo-900 hover:bg-indigo-200 transition-colors cursor-pointer"
          >
            {revealedA11 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {revealedA11 ? 'Ocultar Sentenças' : 'Revelar Sentenças'}
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXERCISE_A11_STATEMENTS.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-700 font-mono">{item.item}</span>
                  <span className="text-xs text-slate-400 font-mono">#{idx + 1}</span>
                </div>
                {revealedA11 ? (
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-indigo-950 font-mono">{item.frase}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="italic">{item.tipo}</span>
                      <AudioButton text={item.frase} size="sm" />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Clique em revelar para visualizar a estrutura acusativa.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.5 Exercício A13 — Probleme im Hotel (8 Situações Reais) */}
      <div id="secao-3-5-exercicio-a13" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Exercício A13 (p. 64)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A13 — <em>Probleme im Hotelzimmer</em> (Simulação de Reclamações e Soluções)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Fórmula institucional de solução de problemas e aplicação precisa do Acusativo com <em>brauchen</em> e <em>es gibt</em>.
            </p>
          </div>
          <button
            onClick={() => setRevealedA13(!revealedA13)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-100 text-indigo-900 hover:bg-indigo-200 transition-colors cursor-pointer"
          >
            {revealedA13 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {revealedA13 ? 'Ocultar Diálogos' : 'Revelar Diálogos'}
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXERCISE_A13_PROBLEMS.map((prob, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="font-bold text-xs text-rose-800 font-mono">{prob.item}</span>
                <span className="text-xs text-slate-500 font-medium">Zimmer {prob.zimmer}</span>
              </div>
              {revealedA13 ? (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-900">
                    <strong className="text-slate-600 block mb-0.5">{prob.hospede}:</strong>
                    <span className="font-mono">{prob.fala}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                    <div>
                      <strong className="text-emerald-800 block text-xs">Rezeption:</strong>
                      <span className="font-mono">{prob.solucao}</span>
                    </div>
                    <AudioButton text={prob.fala} size="sm" />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Aguardando revelação do diálogo completo...</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3.9 & 3.10 Tradução Reversa de Blindagem (10 Desafios Ativos) */}
      <div id="secao-3-9-traducao-reversa" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 3.9 & 3.10
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tradução Reversa de Blindagem Cognitiva (Português → Alemão)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              10 frases de alta fidelidade extraídas do conteúdo da Rodada 06. Tente formular mentalmente em alemão antes de revelar o gabarito.
            </p>
          </div>
          <button
            onClick={toggleAllReverse}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
          >
            {allReverseRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {allReverseRevealed ? 'Ocultar Todos os Gabaritos' : 'Revelar Todos os Gabaritos'}
          </button>
        </div>

        <div className="p-6 space-y-4">
          {REVERSE_TRANSLATION_LESSON_6.map((item) => {
            const isRevealed = revealedReverse[item.id] || allReverseRevealed;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-indigo-300 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      Desafio #{item.id}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{item.pt}</p>
                  </div>
                  <button
                    onClick={() => toggleReverse(item.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-indigo-600" />}
                    {isRevealed ? 'Ocultar' : 'Revelar'}
                  </button>
                </div>

                {isRevealed && (
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100">
                      <span className="text-sm font-bold font-mono text-indigo-950">{item.de}</span>
                      <AudioButton text={item.de} size="sm" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-100/80 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block mb-0.5">Análise Sintática & Blindagem:</strong>
                      {item.justificativa}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.11 Resumo dos Pontos-Chave do Dia 006 (14 Mandamentos) */}
      <div id="secao-3-11-mandamentos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.11
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Resumo dos Pontos-Chave do Dia 006 (14 Mandamentos da Rodada 06)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Diretrizes absolutas para retenção mnemônica do Acusativo, verbos transitivos, Komposita e hotelaria.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {KEY_POINTS_LESSON_6.map((mandamento) => (
            <div
              key={mandamento.numero}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {mandamento.numero}
                </span>
                <span className="font-bold text-sm text-indigo-950">{mandamento.conceito}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-8">{mandamento.regra}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
