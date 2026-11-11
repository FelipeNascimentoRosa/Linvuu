import React, { useState } from 'react';
import {
  EXERCISE_C1_SOLUTIONS,
  EXERCISE_C2_SOLUTIONS,
  EXERCISE_C3_DIALOGUE,
  EXERCISE_C4_ITEMS,
  EXERCISE_C5_GROUPS,
  EXERCISE_C6_PROFILES,
  EXERCISE_C7_SENTENCES,
  EXERCISE_C8_TEXTS,
  EXERCISE_C9_ITEMS,
  REVERSE_TRANSLATION_LESSON_3,
  KEY_POINTS_LESSON_3,
} from '../data/lesson03Data';
import { AudioButton } from './AudioButton';
import {
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  MessageCircle,
  Headphones,
  CheckCircle,
  Award,
} from 'lucide-react';

export const Bloco3ExercisesReview03: React.FC = () => {
  const [revealedReverse, setRevealedReverse] = useState<Record<number, boolean>>({});
  const [showAllReverse, setShowAllReverse] = useState<boolean>(false);

  const toggleReverse = (num: number) => {
    setRevealedReverse((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleAllReverse = () => {
    if (showAllReverse) {
      setRevealedReverse({});
      setShowAllReverse(false);
    } else {
      const allRevealed: Record<number, boolean> = {};
      REVERSE_TRANSLATION_LESSON_3.forEach((item) => {
        allRevealed[item.num] = true;
      });
      setRevealedReverse(allRevealed);
      setShowAllReverse(true);
    }
  };

  return (
    <section id="bloco-3-exercicios-revisao-rodada3" className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 3 (60 Minutos) · Rodada 03
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 003 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Resolução Comentada de Exercícios & Tradução Reversa de Blindagem
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Gabarito integral com análise passo a passo dos exercícios C1 a C9 (Kapitel 1, p. 25–29),
          10 sentenças de tradução reversa para fixação neuromuscular e consolidação dos 13 pontos-chave do Dia 003.
        </p>
      </div>

      {/* 3.1 & 3.2 Exercícios C1 e C2 */}
      <div id="secao-3-1-ex-c1-c2" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* C1 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Seção 3.1 · Exercício C1 (p. 25)
              </span>
              <h3 className="font-bold text-base text-slate-900 mt-1">Was passt? (Qual forma se encaixa?)</h3>
            </div>
          </div>
          <div className="space-y-2">
            {EXERCISE_C1_SOLUTIONS.map((item) => (
              <div key={item.num} className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs sm:text-sm text-slate-900">{item.frase}</span>
                  <AudioButton text={item.frase} lang="de-DE" size="sm" />
                </div>
                <div className="text-xs text-slate-500">
                  Forma: <strong className="text-indigo-700 font-mono">{item.verbo}</strong> · {item.justificativa}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* C2 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Seção 3.2 · Exercício C2 (p. 26)
              </span>
              <h3 className="font-bold text-base text-slate-900 mt-1">Was passt hier? (Múltipla Escolha)</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {EXERCISE_C2_SOLUTIONS.map((item) => (
              <div key={item.num} className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-500">Opção correta:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
                    {item.resposta}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-800">{item.pergunta}</div>
                <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                  <strong>Justificativa:</strong> {item.justificativa}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.3 Exercício C3 — Diálogo Conrad e Serena */}
      <div id="secao-3-3-ex-c3-dialogo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.3 · Exercício C3 (p. 26)
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-600" />
              Diálogo Completo: Conrad Kremer & Serena Rosso
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Inserção de verbos de apresentação (<em>heißen, sein, kommen, wohnen, studieren, sprechen</em>).
            </p>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXERCISE_C3_DIALOGUE.map((line, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${line.speaker === 'Conrad' ? 'bg-blue-100 text-blue-900' : 'bg-rose-100 text-rose-900'}`}>
                      {line.speaker}
                    </span>
                    <AudioButton text={line.de} lang="de-DE" size="sm" />
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-1.5">{line.de}</div>
                  <div className="text-xs text-slate-500">{line.pt}</div>
                </div>
                <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-600">
                  <span className="font-mono font-semibold text-indigo-700">{line.verbo}</span> · {line.justificativa}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.4 & 3.5 Exercícios C4 e C5 */}
      <div id="secao-3-4-ex-c4-c5" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* C4 */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-200/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Seção 3.4 · Exercício C4 (p. 26)
            </span>
            <h3 className="font-bold text-base text-slate-900 mt-1">Ergänzen Sie die Verben</h3>
          </div>
          <div className="space-y-2">
            {EXERCISE_C4_ITEMS.map((item) => (
              <div key={item.num} className="p-2.5 bg-slate-50/60 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{item.frase}</span>
                  <AudioButton text={item.frase} lang="de-DE" size="sm" />
                </div>
                <div className="text-[11px] text-slate-500">
                  <span className="font-mono text-indigo-700 font-bold">{item.verbo}</span>: {item.justificativa}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* C5 */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-200/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Seção 3.5 · Exercício C5 (p. 27)
            </span>
            <h3 className="font-bold text-base text-slate-900 mt-1">
              4 Blocos de Inflexão (<em>sprechen, arbeiten, lesen, sein</em>)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXERCISE_C5_GROUPS.map((group) => (
              <div key={group.verboBase} className="p-3 bg-slate-50/40 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-xs text-indigo-950 font-mono border-b border-slate-200/70 pb-1">
                  {group.verboBase}
                </div>
                <div className="space-y-1.5">
                  {group.itens.map((it, idx) => (
                    <div key={idx} className="p-1.5 bg-white rounded border border-slate-200/70 text-[11px] space-y-0.5">
                      <div className="font-medium text-slate-800">{it.frase}</div>
                      <div className="text-slate-500 text-[10px]">{it.justificativa}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.6 Exercício C6 — Perfis Biográficos Auditivos */}
      <div id="secao-3-6-ex-c6-biografias" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.6 · Exercício C6 (p. 27)
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-indigo-600" />
              Perfis de Escuta: Sandra, Paolo, Klaus e Franziska
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Compreensão oral integrada combinando moradia, profissão, estado civil e hobbies.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXERCISE_C6_PROFILES.map((p) => (
              <div key={p.nome} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900">
                      {p.nome}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{p.pais}</span>
                  </div>
                  <AudioButton text={p.textoDe} lang="de-DE" size="sm" label="Ouvir Perfil" />
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                  {p.textoDe}
                </div>
                <div className="text-xs text-slate-600 italic">
                  {p.textoPt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.7 Exercício C7 — Bilden Sie Sätze (16 orações) */}
      <div id="secao-3-7-ex-c7-sintaxe" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.7 · Exercício C7 (p. 28)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Bilden Sie Sätze (Construção Sintática de 16 Orações)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Reorganização de constituintes oracionais com aplicação rigorosa da V2 e perguntas Ja-Nein.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXERCISE_C7_SENTENCES.map((item) => (
              <div key={item.num} className="p-3 bg-slate-50/50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400 text-[10px]">Item {item.num}</span>
                  <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                    {item.regra}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">Pistas: {item.pistas}</div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">{item.de}</div>
                  <AudioButton text={item.de} lang="de-DE" size="sm" />
                </div>
                <div className="text-slate-600 text-[11px]">{item.pt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.8 & 3.9 Exercícios C8 e C9 */}
      <div id="secao-3-8-ex-c8-c9" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* C8 Textos */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-200/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Seção 3.8 · Exercício C8 (p. 29)
            </span>
            <h3 className="font-bold text-base text-slate-900 mt-1">Schreiben Sie kurze Texte (3 Perfis)</h3>
          </div>
          <div className="space-y-4">
            {EXERCISE_C8_TEXTS.map((t) => (
              <div key={t.nome} className="p-3.5 bg-slate-50/50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-indigo-900">{t.nome}</span>
                  <AudioButton text={t.de} lang="de-DE" size="sm" />
                </div>
                <p className="text-xs text-slate-900 leading-relaxed font-medium">{t.de}</p>
                <p className="text-[11px] text-slate-500 italic">{t.pt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* C9 Fragewörter */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-200/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Seção 3.9 · Exercício C9 (p. 29)
            </span>
            <h3 className="font-bold text-base text-slate-900 mt-1">
              Wie heißen die Fragewörter? (13 Perguntas)
            </h3>
          </div>
          <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
            {EXERCISE_C9_ITEMS.map((item) => (
              <div key={item.num} className="p-2 bg-slate-50/60 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-indigo-700 mr-2 uppercase">{item.wWort}</span>
                  <span className="text-slate-800">{item.frase}</span>
                </div>
                <AudioButton text={item.frase} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.10 Tradução Reversa de Blindagem */}
      <div id="secao-3-10-traducao-reversa" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Seções 3.10 & 3.11
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Tradução Reversa de Blindagem (Português → Alemão)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Tente formular mentalmente ou por escrito a oração em alemão antes de revelar o gabarito comentado.
            </p>
          </div>
          <button
            onClick={toggleAllReverse}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
          >
            {showAllReverse ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAllReverse ? 'Ocultar Todos os Gabaritos' : 'Revelar Todos os Gabaritos'}
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVERSE_TRANSLATION_LESSON_3.map((item) => {
              const isRevealed = revealedReverse[item.num];
              return (
                <div key={item.num} className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        Sentença {item.num}
                      </span>
                      <button
                        onClick={() => toggleReverse(item.num)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {isRevealed ? 'Ocultar' : 'Gabarito'}
                      </button>
                    </div>
                    <div className="font-semibold text-sm text-slate-900 mt-2">
                      {item.pt}
                    </div>
                  </div>

                  {isRevealed && (
                    <div className="p-3 rounded-lg bg-emerald-50/90 border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-950 font-mono">
                          {item.de}
                        </span>
                        <AudioButton text={item.audio} lang="de-DE" size="sm" />
                      </div>
                      <div className="text-[11px] text-emerald-900 pt-1 border-t border-emerald-200/80">
                        <strong>Análise:</strong> {item.justificativa}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3.12 Resumo dos Pontos-Chave do Dia 003 */}
      <div id="secao-3-12-resumo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 3.12
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Resumo dos Pontos-Chave do Dia 003 (13 Conceitos Nucleares)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              A síntese de sobrevivência gramatical consolidada no final da Rodada 03.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 w-1/4">Conceito Gramatical</th>
                  <th className="py-3 px-4">Regra de Ouro / Sintaxe Canônica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {KEY_POINTS_LESSON_3.map((pt) => (
                  <tr key={pt.conceito} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-indigo-950">{pt.conceito}</td>
                    <td className="py-2.5 px-4 text-slate-700 leading-relaxed">{pt.regra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
