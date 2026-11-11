import React, { useState } from 'react';
import {
  REVERSE_TRANSLATION_W2L09_DATA,
  MASTER_SUMMARY_W2L09_DATA,
} from '../../data/semana2Lesson09Data';
import { AudioButton } from '../AudioButton';
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

export const Bloco3ExercisesReviewW2L09: React.FC = () => {
  const [openExercise, setOpenExercise] = useState<string | null>('a3');
  const [userInputs, setUserInputs] = useState<{ [key: number]: string }>({});
  const [revealedSolutions, setRevealedSolutions] = useState<{ [key: number]: boolean }>({});

  const toggleExercise = (id: string) => {
    setOpenExercise(openExercise === id ? null : id);
  };

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({ ...prev, [id]: val }));
  };

  const toggleReveal = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="bloco3-semana2-aula9" className="space-y-12">
      {/* Banner de Abertura do Bloco 3 */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 009
            </span>
            <span className="px-3 py-1 bg-amber-500/30 text-amber-200 text-xs font-semibold rounded-full border border-amber-400/30">
              Kapitel 4, Teil A, A1–A15 (p. 86–97)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 3 (60 Minutos) — Resolução Comentada & Tradução Reversa de Blindagem
          </h2>
          <p className="text-amber-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Resoluções detalhadas de todos os exercícios do livro (A3 ao A28), imperativo culinário, conselhos alimentares com advérbios graduais, verdadeiro/falso do restaurante e o laboratório de tradução reversa com 10 sentenças nucleares.
          </p>
        </div>
      </div>

      {/* 3.1 a 3.14 — Gabarito Comentado dos Exercícios do Livro */}
      <div id="sec-3-1-to-3-14" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
              3.1–3.14
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                Gabarito Comentado dos Exercícios do Livro Didático (A3 a A28)
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Soluções canônicas comentadas passo a passo com áudio e justificativa gramatical
              </p>
            </div>
          </div>
        </div>

        {/* Acordeão de Exercícios */}
        <div className="space-y-3">
          {/* Ex A3 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleExercise('a3')}
              className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Exercício A3
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  Ich nehme ... / Ich möchte bitte ... / Ich hätte gern ... (p. 87)
                </span>
              </div>
              {openExercise === 'a3' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'a3' && (
              <div className="p-4 bg-white space-y-3 text-xs sm:text-sm border-t border-slate-200">
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg space-y-1">
                    <span className="font-bold text-slate-700">a) Ich nehme:</span>
                    <p className="font-mono text-slate-900">
                      ein Glas Orangensaft, eine Tasse Kaffee, zwei Scheiben Toastbrot, zwei Rühreier, Butter, Marmelade und Joghurt mit Früchten.
                    </p>
                    <span className="text-slate-500 text-xs italic block">
                      Pego: um copo de suco de laranja, uma xícara de café, duas fatias de pão de torrada, dois ovos mexidos, manteiga, geleia e iogurte com frutas.
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg space-y-1">
                    <span className="font-bold text-slate-700">b) Ich möchte bitte:</span>
                    <p className="font-mono text-slate-900">
                      zwei Brötchen, Butter und Marmelade, ein gekochtes Ei, zwei Scheiben Käse, ein Glas Orangensaft und eine Tasse Kaffee.
                    </p>
                    <span className="text-slate-500 text-xs italic block">
                      Gostaria por favor de: dois pãezinhos, manteiga e geleia, um ovo cozido, duas fatias de queijo, um copo de suco de laranja e uma xícara de café.
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg space-y-1">
                    <span className="font-bold text-slate-700">c) Ich hätte gern:</span>
                    <p className="font-mono text-slate-900">
                      zwei Scheiben Vollkornbrot, etwas Frischkäse, eine Banane, einen Apfel und eine Tasse Kräutertee.
                    </p>
                    <span className="text-slate-500 text-xs italic block">
                      Gostaria de: duas fatias de pão integral, um pouco de queijo fresco, uma banana, uma maçã e uma xícara de chá de ervas.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ex A6 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleExercise('a6')}
              className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Exercício A6
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  Textarbeit — Das Frühstücksbüfett (p. 88)
                </span>
              </div>
              {openExercise === 'a6' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'a6' && (
              <div className="p-4 bg-white space-y-3 text-xs sm:text-sm border-t border-slate-200">
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="font-bold text-slate-700 block mb-1">a) Frases Combinadas:</span>
                    <ul className="list-disc list-inside space-y-1 font-mono text-slate-900">
                      <li>Im Hotel essen deutsche Gäste gern ein englisches oder amerikanisches Frühstück.</li>
                      <li>Auch in teuren Hotels gibt es manchmal kalte Eier und altes Brot.</li>
                      <li>In Deutschland isst man zum Frühstück gern Brötchen, Butter und Marmelade.</li>
                    </ul>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="font-bold text-slate-700 block mb-1">b) Verbos Completados:</span>
                    <p className="font-mono text-slate-800">
                      Das Frühstücksbüfett <strong>kommt</strong> ursprünglich aus Amerika. Im Hotel <strong>essen</strong> deutsche Gäste gern ein „englisches“ oder „amerikanisches“ Frühstück. In vielen Hotels <strong>kostet</strong> das Frühstück etwa 20 Euro. Manchmal <strong>gibt</strong> es auch in teuren Hotels beim Frühstück unfreundliches Personal, kalte Eier oder altes Brot.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ex A8 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleExercise('a8')}
              className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Exercício A8
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  Lebensmittel & Adjektive (p. 88)
                </span>
              </div>
              {openExercise === 'a8' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'a8' && (
              <div className="p-4 bg-white space-y-2 text-xs sm:text-sm border-t border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-50 rounded font-mono">1. frisches, altes, warmes <strong>Brot</strong> (pão fresco, velho, quente)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">2. harter, weicher, salziger <strong>Käse</strong> (queijo duro, mole, salgado)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">3. heißer, kalter, starker <strong>Kaffee</strong> (café quente, frio, forte)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">4. frischer, kalter, warmer <strong>Joghurt</strong> (iogurte fresco, frio, morno)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">5. rohes, gekochtes, warmes <strong>Fleisch</strong> (carne crua, cozida, quente)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">6. roher, gekochter, kalter <strong>Schinken</strong> (presunto cru, cozido, frio)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">7. harte, weiche, gekochte <strong>Eier</strong> (ovos duros, moles, cozidos)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">8. süße, saure, frische <strong>Pflaumen</strong> (ameixas doces, ácidas, frescas)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">9. kalter, frischer, süßer <strong>Orangensaft</strong> (suco de laranja gelado, fresco, doce)</div>
                  <div className="p-2 bg-slate-50 rounded font-mono">10. kalte, warme, frische <strong>Milch</strong> (leite gelado, morno, fresco)</div>
                </div>
              </div>
            )}
          </div>

          {/* Ex A13 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleExercise('a13')}
              className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Exercício A13
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  Produkte im Supermarkt (Embalagens & Sufixos Compostos) — p. 91
                </span>
              </div>
              {openExercise === 'a13' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'a13' && (
              <div className="p-4 bg-white space-y-3 text-xs sm:text-sm border-t border-slate-200">
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 block">a) Embalagens e Produtos:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-slate-900">
                    <div className="p-2 bg-slate-50 rounded">eine Tafel Schokolade (uma barra de chocolate)</div>
                    <div className="p-2 bg-slate-50 rounded">ein Becher Quark (um copo de queijo quark)</div>
                    <div className="p-2 bg-slate-50 rounded">eine Packung Landbutter (um pacote de manteiga)</div>
                    <div className="p-2 bg-slate-50 rounded">eine Flasche Bier (uma garrafa de cerveja)</div>
                    <div className="p-2 bg-slate-50 rounded">eine Dose Ananasscheiben (uma lata de abacaxi)</div>
                    <div className="p-2 bg-slate-50 rounded">eine Packung Ungarische Salami (um pacote de salame)</div>
                    <div className="p-2 bg-slate-50 rounded">eine Tüte Gummibärchen (um saco de ursinhos de goma)</div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <span className="font-bold text-slate-700 block">b) Famílias com Sufixo Composto:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-slate-800 text-xs">
                    <div className="p-2 bg-slate-50 rounded"><strong>-saft:</strong> Apfelsaft, Orangensaft, Traubensaft, Tomatensaft</div>
                    <div className="p-2 bg-slate-50 rounded"><strong>-torte:</strong> Obsttorte, Sahnetorte</div>
                    <div className="p-2 bg-slate-50 rounded"><strong>-salat:</strong> Obstsalat, Kartoffelsalat, Tomatensalat</div>
                    <div className="p-2 bg-slate-50 rounded"><strong>-flasche:</strong> Bierflasche, Weinflasche, Milchflasche</div>
                    <div className="p-2 bg-slate-50 rounded"><strong>-marmelade:</strong> Obstmarmelade, Orangenmarmelade</div>
                    <div className="p-2 bg-slate-50 rounded"><strong>-glas:</strong> Weinglas, Saftglas, Milchglas</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ex A20 & A21 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleExercise('a20')}
              className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Exercícios A20 & A21
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  Agora nós cozinhamos (Imperativo Formal) & Conselhos de Saúde — p. 93
                </span>
              </div>
              {openExercise === 'a20' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'a20' && (
              <div className="p-4 bg-white space-y-3 text-xs sm:text-sm border-t border-slate-200">
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 block">A20 Instruções Culinárias no Imperativo Formal (Verbo + Sie):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-slate-900">
                    <div>1. Schälen und schneiden Sie die Zwiebeln.</div>
                    <div>2. Schälen Sie die Kartoffeln.</div>
                    <div>3. Schneiden Sie das Fleisch.</div>
                    <div>4. Schneiden Sie das Obst.</div>
                    <div>5. Schneiden Sie die Karotten.</div>
                    <div>6. Kochen Sie die Salami.</div>
                    <div>7. Kochen Sie das Steak.</div>
                    <div>8. Kochen Sie die Äpfel.</div>
                    <div>9. Braten Sie die Spaghetti.</div>
                    <div>10. Braten Sie das Ei.</div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <span className="font-bold text-slate-700 block">A21 Conselhos de Saúde com Advérbios:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-slate-800 text-xs">
                    <div>Essen Sie viel Vollkornbrot.</div>
                    <div>Essen Sie viel Obst und Gemüse.</div>
                    <div>Essen Sie wenig Sahnetorte und fettes Fleisch.</div>
                    <div>Essen Sie oft frischen Fisch.</div>
                    <div>Trinken Sie täglich zwei Liter Mineralwasser.</div>
                    <div>Essen Sie nie Hamburger mit Pommes frites.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ex A28 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleExercise('a28')}
              className="w-full flex items-center justify-between p-4 bg-slate-50/80 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Exercício A28
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  Im Restaurant — Richtig oder Falsch? (p. 96)
                </span>
              </div>
              {openExercise === 'a28' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'a28' && (
              <div className="p-4 bg-white space-y-2 text-xs sm:text-sm border-t border-slate-200">
                <div className="space-y-1.5 font-mono">
                  <div className="flex items-center justify-between p-2 bg-emerald-50 text-emerald-950 rounded">
                    <span>0. Andreas trinkt Mineralwasser.</span>
                    <strong className="text-emerald-700">richtig</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-rose-50 text-rose-950 rounded">
                    <span>1. Beate trinkt zwei Gläser Weißwein. (Ela pede só 1 taça)</span>
                    <strong className="text-rose-700">falsch</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 text-emerald-950 rounded">
                    <span>2. Andreas nimmt den Lachs.</span>
                    <strong className="text-emerald-700">richtig</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-rose-50 text-rose-950 rounded">
                    <span>3. Beate isst nur in Italien Fisch. (Ela come peixe com frequência)</span>
                    <strong className="text-rose-700">falsch</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-rose-50 text-rose-950 rounded">
                    <span>4. Andreas findet rohen Fisch ungenießbar. (Ele acha saudável e saboroso)</span>
                    <strong className="text-rose-700">falsch</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 text-emerald-950 rounded">
                    <span>5. Der Sohn von Andreas wohnt zur Zeit in Japan.</span>
                    <strong className="text-emerald-700">richtig</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 text-emerald-950 rounded">
                    <span>6. Beate war noch nie in Japan.</span>
                    <strong className="text-emerald-700">richtig</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-rose-50 text-rose-950 rounded">
                    <span>7. Andreas hat das Essen nicht geschmeckt. (Ele disse: "Danke, sehr gut")</span>
                    <strong className="text-rose-700">falsch</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3.15 & 3.16 — Laboratório de Tradução Reversa de Blindagem */}
      <div id="sec-3-15-to-3-16" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg">
              3.15
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                Laboratório de Tradução Reversa de Blindagem (10 Sentenças Nucleares)
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Traduza mentalmente ou digite a sentença em alemão, clique em Revelar para checar o gabarito oficial com áudio e justificativa gramatical
              </p>
            </div>
          </div>
        </div>

        {/* Lista das 10 Sentenças */}
        <div className="space-y-4">
          {REVERSE_TRANSLATION_W2L09_DATA.map((item) => {
            const isRevealed = revealedSolutions[item.id] || false;
            const currentVal = userInputs[item.id] || '';

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                      {item.id}
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.pt}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold shrink-0">
                    Blindagem 009
                  </span>
                </div>

                {/* Input do Aluno */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Digite a tradução em alemão..."
                    value={currentVal}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') toggleReveal(item.id);
                    }}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm font-mono rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    onClick={() => toggleReveal(item.id)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    {isRevealed ? 'Ocultar Gabarito' : 'Revelar Gabarito'}
                  </button>
                </div>

                {/* Bloco de Solução Revelada */}
                {isRevealed && (
                  <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2 text-xs sm:text-sm animate-fadeIn">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wide block">
                          Gabarito Oficial Alemão:
                        </span>
                        <span className="font-mono font-extrabold text-slate-900 text-sm sm:text-base">
                          {item.de}
                        </span>
                      </div>
                      <AudioButton text={item.de} size="sm" />
                    </div>

                    <div className="pt-1.5 border-t border-rose-200/60 space-y-1">
                      <div className="text-xs text-rose-950 font-semibold flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        Foco Gramatical: {item.grammarFocus}
                      </div>
                      <p className="text-slate-600 text-xs italic leading-relaxed">
                        {item.explicacao}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.17 Tabela Mestre dos Pontos-Chave */}
      <div id="sec-3-17" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
            3.17
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Tabela Mestre dos 15 Pontos-Chave do Dia 009
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Síntese canônica e definitiva das estruturas gramaticais, culturais e lexicais consolidadas no Dia 009
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-1/4">Conceito Estrutural</th>
                <th className="py-3 px-4">Regra e Aplicação Prática</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MASTER_SUMMARY_W2L09_DATA.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-indigo-900">{p.conceito}</td>
                  <td className="py-2.5 px-4 text-slate-700 leading-relaxed">{p.regra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
