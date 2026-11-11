import React, { useState } from 'react';
import {
  LESSON_10_REVERSE_CHALLENGES,
  LESSON_10_MASTER_KEY_POINTS,
} from '../../data/semana2Lesson10Data';
import { AudioButton } from '../AudioButton';
import {
  CheckCircle2,
  HelpCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const Bloco3ExercisesReviewW2L10: React.FC = () => {
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [expandedExercise, setExpandedExercise] = useState<string | null>('ex-c1');

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({ ...prev, [id]: val }));
  };

  const toggleSolution = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAccordion = (exId: string) => {
    setExpandedExercise((prev) => (prev === exId ? null : exId));
  };

  return (
    <section id="bloco3-semana2-aula10" className="space-y-12">
      {/* Banner Principal do Bloco 3 */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 010
            </span>
            <span className="px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-semibold rounded-full border border-blue-400/30">
              Kapitel 4, Teil B, C e D (p. 98–108)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 3 (60 Minutos) — Resoluções Comentadas & Laboratório de Tradução Reversa
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Gabarito canônico e minucioso de todos os exercícios dos capítulos B, C e D (C1 a C16), laboratório interativo de Tradução Reversa de Blindagem (10 sentenças) e Tabela Mestre dos 16 Pontos-Chave.
          </p>
        </div>
      </div>

      {/* 3.1 a 3.19 — Resoluções Comentadas do Livro */}
      <div id="sec-3-resolucoes" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Seções 3.1 a 3.19</span>
            <h3 className="text-xl font-bold text-slate-900">
              Gabarito Oficial e Resoluções Comentadas dos Exercícios (p. 98–105)
            </h3>
          </div>
        </div>

        {/* Acordeão com os exercícios principais */}
        <div className="space-y-3">
          {/* C1 — Ergänzen Sie die Verben */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('ex-c1')}
              className="w-full p-4 bg-slate-50 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-100 cursor-pointer"
            >
              <span>3.5 Exercício C1 — Ergänzen Sie die Verben in der richtigen Form (14 Itens)</span>
              {expandedExercise === 'ex-c1' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {expandedExercise === 'ex-c1' && (
              <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-2 animate-fadeIn">
                <p className="text-slate-500 italic">Verbos: wohnen, haben, lernen, kommen, stehen, liegen/lesen, fahren, geben, trinken, fliegen/bleiben, arbeiten, essen, sein, sprechen.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>0.</strong> Ich <strong>wohne</strong> in einer Drei-Zimmer-Wohnung.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>1.</strong> <strong>Hast</strong> du einen neuen Schreibtisch?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>2.</strong> Marie <strong>lernt</strong> seit drei Jahren Englisch.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>3.</strong> Jean-Marc und Sarah <strong>kommen</strong> aus Frankreich.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>4.</strong> In welchem Zimmer <strong>steht</strong> der Fernseher?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>5.</strong> Marco <strong>liegt</strong> im Bett und <strong>liest</strong> einen Roman.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>6.</strong> <strong>Fährst</strong> du mit deinem neuen Auto?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>7.</strong> <strong>Gibt</strong> es in der Nähe ein gutes Restaurant?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>8.</strong> <strong>Trinkst</strong> du auch ein Glas Apfelsaft?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>9.</strong> Paul <strong>fliegt</strong> nach New York, ich <strong>bleibe</strong> zu Hause.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>10.</strong> Wo <strong>arbeitet</strong> Frau Krause?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>11.</strong> Franziska <strong>isst</strong> kein Fleisch.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>12.</strong> <strong>Bist</strong> du glücklich?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg"><strong>13.</strong> Otto <strong>spricht</strong> fließend Italienisch.</div>
                </div>
              </div>
            )}
          </div>

          {/* C3 — Welches Präfix fehlt? */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('ex-c3')}
              className="w-full p-4 bg-slate-50 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-100 cursor-pointer"
            >
              <span>3.7 Exercício C3 — Welches Präfix fehlt? (Prefixos Separáveis & Inseparáveis)</span>
              {expandedExercise === 'ex-c3' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {expandedExercise === 'ex-c3' && (
              <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-2 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg">0. <strong>auf</strong>gestanden (aufstehen)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">1. <strong>er</strong>klären (inseparável)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">2. <strong>be</strong>kommen (inseparável)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">3. <strong>an</strong>gekommen (ankommen)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">4. <strong>ver</strong>stehe (verstehen)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">5. Nimm ... <strong>mit</strong> (mitnehmen)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">6. <strong>ver</strong>einbart (vereinbaren)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">7. fängt ... <strong>an</strong> (anfangen)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">8. schalte ... <strong>aus</strong> (ausschalten)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">9. <strong>an</strong>rufen (separável)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">10. <strong>be</strong>antworten (inseparável)</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">11. kauft ... <strong>ein</strong> (einkaufen)</div>
                </div>
              </div>
            )}
          </div>

          {/* C8 — Wie war die Party? */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('ex-c8')}
              className="w-full p-4 bg-slate-50 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-100 cursor-pointer"
            >
              <span>3.12 Exercício C8 — Wie war die Party? (O Tempo Perfekt em Ação Narrativa)</span>
              {expandedExercise === 'ex-c8' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {expandedExercise === 'ex-c8' && (
              <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-3 animate-fadeIn">
                <p className="text-slate-800 leading-relaxed font-serif p-3 bg-indigo-50/40 rounded-lg border border-indigo-100">
                  „Hallo Carsten, wie war die Party am Freitag? – Super. Ich habe nicht so viele Leute <strong>eingeladen</strong>, und fast alle sind <strong>gekommen</strong>, nur Karin hat <strong>abgesagt</strong>, denn sie ist zu ihrer Oma <strong>gefahren</strong>. Wir haben einen großen Topf leckere italienische Nudeln <strong>gekocht</strong> und dann alles <strong>gegessen</strong>! Laura hat uns tolle Fotos <strong>gezeigt</strong>, wir haben <strong>getanzt</strong> und Musik <strong>gehört</strong>. Ach ja, wir haben auch verschiedene Spiele <strong>gespielt</strong> und viel <strong>gelacht</strong>.“
                </p>
                <div className="text-[11px] text-slate-500">
                  Observe o uso de <strong>sein</strong> como auxiliar nos verbos de deslocamento: <em>sind gekommen</em>, <em>ist gefahren</em>.
                </div>
              </div>
            )}
          </div>

          {/* C10 & C11 — Pronomes Reflexivos */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('ex-c11')}
              className="w-full p-4 bg-slate-50 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-100 cursor-pointer"
            >
              <span>3.14 Exercício C11 — Ergänzen Sie die Reflexivpronomen (13 Frases de Contexto)</span>
              {expandedExercise === 'ex-c11' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {expandedExercise === 'ex-c11' && (
              <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-2 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-50 rounded">1. Susanne interessiert <strong>sich</strong> für Sprachen.</div>
                  <div className="p-2 bg-slate-50 rounded">2. Matthias erinnert <strong>sich</strong> nicht gern an seine Schulzeit.</div>
                  <div className="p-2 bg-slate-50 rounded">3. Ich habe <strong>mich</strong> verliebt.</div>
                  <div className="p-2 bg-slate-50 rounded">4. Warum streitest du <strong>dich</strong> immer mit deinem Bruder?</div>
                  <div className="p-2 bg-slate-50 rounded">5. Otto ärgert <strong>sich</strong> über die Note.</div>
                  <div className="p-2 bg-slate-50 rounded">6. Frau und Herr Müller haben <strong>sich</strong> angemeldet.</div>
                  <div className="p-2 bg-slate-50 rounded">7. Sie treffen <strong>sich</strong> um 20.00 Uhr.</div>
                  <div className="p-2 bg-slate-50 rounded">8. Sonja muss <strong>sich</strong> beeilen.</div>
                  <div className="p-2 bg-slate-50 rounded">9. Wir haben <strong>uns</strong> noch nicht bedankt.</div>
                  <div className="p-2 bg-slate-50 rounded">10. Marie schminkt <strong>sich</strong> für die Hochzeit.</div>
                  <div className="p-2 bg-slate-50 rounded">11. Freut ihr <strong>euch</strong> auf den Urlaub?</div>
                  <div className="p-2 bg-slate-50 rounded">12. Der Kunde hat <strong>sich</strong> beschwert.</div>
                  <div className="p-2 bg-slate-50 rounded">13. Ich habe <strong>mich</strong> erkältet.</div>
                </div>
              </div>
            )}
          </div>

          {/* C16 — Artikel und Genitiv */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('ex-c16')}
              className="w-full p-4 bg-slate-50 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-100 cursor-pointer"
            >
              <span>3.19 Exercício C16 — Ergänzen Sie Artikel und Genitiv (9 Sentenças)</span>
              {expandedExercise === 'ex-c16' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {expandedExercise === 'ex-c16' && (
              <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-2 animate-fadeIn">
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg">1. Das Lieblingshobby <strong>des Direktors</strong> ist Surfen.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">2. Die Farbe <strong>der Wand</strong> gefällt mir gut.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">3. Ist das die Tasche <strong>deiner Mutter</strong>?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">4. Kennst du schon den neuen Mann <strong>der Außenministerin</strong>?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">5. Die Familie <strong>deines Mannes</strong> ist ziemlich groß.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">6. Die Einladung <strong>deiner Firma</strong> zum Essen nehmen wir an!</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">7. Die Installation <strong>des Druckers</strong> dauert sehr lange.</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">8. Wie lange dauert die Ausbildung <strong>deines Sohnes</strong> noch?</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">9. Wann ist der Abschluss <strong>deines Studiums</strong>?</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3.20 e 3.21 — Laboratório de Tradução Reversa de Blindagem */}
      <div id="sec-3-20" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Seções 3.20 & 3.21</span>
            <h3 className="text-xl font-bold text-slate-900">
              Laboratório de Tradução Reversa de Blindagem (10 Desafios Críticos)
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Digite a sua versão em alemão antes de revelar o gabarito oficial. Pratique a pronúncia nativa e consolide as travas sintáticas do Dia 010:
        </p>

        <div className="space-y-4">
          {LESSON_10_REVERSE_CHALLENGES.map((item) => {
            const isRevealed = revealedSolutions[item.id];
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Desafio 0{item.id} de 10
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                    {item.grammarFocus.split(':')[0]}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">
                  {item.ptSentence}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Digite sua tradução em alemão aqui..."
                    value={userInputs[item.id] || ''}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleSolution(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          Ocultar Gabarito
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          Revelar Gabarito Oficial
                        </>
                      )}
                    </button>
                    {isRevealed && <AudioButton text={item.deSolution} />}
                  </div>
                </div>

                {isRevealed && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 animate-fadeIn text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold text-emerald-950 font-serif text-sm">
                        {item.deSolution}
                      </span>
                    </div>
                    <p className="text-emerald-800 pt-1 border-t border-emerald-200/60 leading-relaxed">
                      <strong>Análise Gramatical:</strong> {item.grammarFocus}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.22 — Tabela Mestre dos 16 Pontos-Chave */}
      <div id="sec-3-22" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Seção 3.22</span>
            <h3 className="text-xl font-bold text-slate-900">
              Tabela Mestre dos 16 Pontos-Chave do Dia 010
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Conceito / Tópico</th>
                <th className="py-2.5 px-3 font-semibold">Exemplo Canônico Alemão</th>
                <th className="py-2.5 px-3 font-semibold">Regra / Explicação Sintática</th>
                <th className="py-2.5 px-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LESSON_10_MASTER_KEY_POINTS.map((pt, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{pt.concept}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-indigo-700 bg-indigo-50/20">{pt.ruleDe}</td>
                  <td className="py-2.5 px-3 text-slate-600 text-xs">{pt.rulePt}</td>
                  <td className="py-2.5 px-3 text-center">
                    <AudioButton text={pt.ruleDe} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
