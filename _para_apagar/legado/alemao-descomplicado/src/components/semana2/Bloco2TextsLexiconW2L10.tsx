import React, { useState } from 'react';
import {
  ESSEN_TRINKEN_QUIZ_DATA,
  RECIPES_DATA,
  RESTAURANT_DIALOGUE_QUESTIONS,
  LESSON_10_PRIMARY_LEXICON,
  LESSON_10_UMGANGSSPRACHE,
} from '../../data/semana2Lesson10Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  Search,
  CheckCircle,
  HelpCircle,
  UtensilsCrossed,
  Clock,
  Sparkles,
  ShoppingBag,
  ChefHat,
  MessageSquare,
  Wine,
  FileText,
  UserCheck,
} from 'lucide-react';

export const Bloco2TextsLexiconW2L10: React.FC = () => {
  const [lexiconSearch, setLexiconSearch] = useState('');
  const [slangSearch, setSlangSearch] = useState('');
  const [revealedQuiz, setRevealedQuiz] = useState<Record<number, boolean>>({});
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(0);

  const toggleQuiz = (id: number) => {
    setRevealedQuiz((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredLexicon = LESSON_10_PRIMARY_LEXICON.filter(
    (item) =>
      item.german.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.translation.toLowerCase().includes(lexiconSearch.toLowerCase())
  );

  const filteredSlang = LESSON_10_UMGANGSSPRACHE.filter(
    (item) =>
      item.expression.toLowerCase().includes(slangSearch.toLowerCase()) ||
      item.translation.toLowerCase().includes(slangSearch.toLowerCase())
  );

  return (
    <section id="bloco2-semana2-aula10" className="space-y-12">
      {/* Banner Principal do Bloco 2 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 010
            </span>
            <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 text-xs font-semibold rounded-full border border-indigo-400/30">
              Kapitel 4, Teil B, C e D (p. 98–108)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 2 (60 Minutos) — Transcrição Integral, Tradução & Mineração Lexical
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Quiz cultural de comida e bebida, história épica da batata (século XVI ao XXI), receitas reais com imperativo formal, diálogos autênticos no restaurante com fórmulas de pagamento e reclamação, pronomes reflexivos e o dicionário canônico dos 17 verbos.
          </p>
        </div>
      </div>

      {/* 2.1 Texto B1 — Das Essen-und-Trinken-Quiz */}
      <div id="sec-2-1" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Seção 2.1 · Texto B1</span>
            <h3 className="text-xl font-bold text-slate-900">
              Das Essen-und-Trinken-Quiz (O Grande Quiz de Comida & Bebida)
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          6 perguntas históricas e socioculturais do livro com opções de múltipla escolha e respostas explicadas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ESSEN_TRINKEN_QUIZ_DATA.map((q) => {
            const isRevealed = revealedQuiz[q.id];
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Questão {q.id}
                    </span>
                    <AudioButton text={q.questionDe} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{q.questionDe}</h4>
                  <p className="text-xs text-slate-500 italic">{q.questionPt}</p>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt) => (
                      <div
                        key={opt.key}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border ${
                          isRevealed && opt.key === q.correct
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-mono font-bold mr-1.5">{opt.key}:</span>
                        {opt.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => toggleQuiz(q.id)}
                    className="w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
                  >
                    {isRevealed ? 'Ocultar Justificativa' : 'Ver Resposta Comentada'}
                  </button>

                  {isRevealed && (
                    <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1 animate-fadeIn">
                      <p className="font-bold text-emerald-900">
                        Resposta Oficial: Opção {q.correct}
                      </p>
                      <p className="text-emerald-800 leading-relaxed">{q.justification}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2.2 Texto B2 — Die Kartoffel (A História da Batata) */}
      <div id="sec-2-2" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <UtensilsCrossed className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Seção 2.2 · Texto B2</span>
            <h3 className="text-xl font-bold text-slate-900">
              Die Kartoffel — O Alimento que Transformou a Europa (Texto Integral)
            </h3>
          </div>
        </div>

        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed flex items-center justify-between">
          <span>
            Texto sobre a introdução da batata na Europa pelos navegadores espanhóis, o quadro histórico <em>Die Kartoffelesser</em> (Vincent van Gogh) e as diferentes preparações culinárias modernas.
          </span>
          <AudioButton text="Die Kartoffel ist schon sehr alt. Sie kam im 16. Jahrhundert mit spanischen Seefahrern aus Südamerika nach Europa. Schon ab dem 17. Jahrhundert war die Kartoffel in Europa das Hauptnahrungsmittel von armen Leuten. Das Bild Die Kartoffelesser von Vincent van Gogh ist weltbekannt." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Texto Original (Alemão)</span>
              <AudioButton text="Heute isst man Kartoffeln auf verschiedene Weise. In Deutschland sind Salzkartoffeln sehr beliebt. Salzkartoffeln kann man sehr einfach zubereiten: Man schält die Kartoffel, danach kocht man sie mit etwas Salz. In Belgien oder Frankreich isst man die Kartoffeln anders: Man schneidet sie in Streifen und frittiert sie. Dann heißen sie nicht mehr Kartoffeln, sondern Pommes frites." />
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
              Die Kartoffel ist schon sehr alt. Sie kam im 16. Jahrhundert mit spanischen Seefahrern aus Südamerika nach Europa. Schon ab dem 17. Jahrhundert war die Kartoffel in Europa das Hauptnahrungsmittel von armen Leuten. Das Bild „Die Kartoffelesser“ von Vincent van Gogh ist weltbekannt. Es ist aus dem 19. Jahrhundert und zeigt die Kartoffel als wichtiges Nahrungsmittel in armen Familien.
            </p>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
              Heute isst man Kartoffeln auf verschiedene Weise. In Deutschland sind Salzkartoffeln sehr beliebt. Salzkartoffeln kann man sehr einfach zubereiten: Man schält die Kartoffel, danach kocht man sie mit etwas Salz. In Belgien oder Frankreich isst man die Kartoffeln anders: Man schneidet sie in Streifen und frittiert sie. Dann heißen sie nicht mehr Kartoffeln, sondern Pommes frites. Pommes frites haben aber einen großen Nachteil: Sie enthalten sehr viel Fett. Aus Irland kommt eine weitere Erfindung: die Kartoffelchips. Das sind ganz dünne, frittierte Kartoffelscheiben mit Käse und Zwiebeln oder Salz und Essig.
            </p>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
              In Form von Pommes frites oder Kartoffelchips ist die „alte“ Kartoffel auch im 21. Jahrhundert ein modernes und beliebtes Nahrungsmittel.
            </p>
          </div>

          <div className="p-5 bg-blue-50/40 border border-blue-200/80 rounded-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">Tradução Analítica Justaposta</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              A batata já é muito antiga. Ela veio no século XVI com navegadores espanhóis da América do Sul para a Europa. Já a partir do século XVII a batata era na Europa o alimento principal de pessoas pobres. O quadro "Os comedores de batata" de Vincent van Gogh é mundialmente famoso. É do século XIX e mostra a batata como alimento importante em famílias pobres.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Hoje come-se batatas de diversas maneiras. Na Alemanha, batatas cozidas com sal (Salzkartoffeln) são muito populares. Batatas cozidas podem ser preparadas muito facilmente: descasca-se a batata, depois cozinha-se com um pouco de sal. Na Bélgica ou na França come-se de outra forma: corta-se em tiras e frita-se. Então elas não se chamam mais batatas, mas batatas fritas (Pommes frites). Porém, têm uma grande desvantagem: contêm muita gordura. Da Irlanda vem outra invenção: os chips de batata (Kartoffelchips) — fatias finíssimas com queijo e cebolas ou sal e vinagre.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Na forma de batatas fritas ou chips, a "velha" batata continua sendo no século XXI um alimento moderno e popular.
            </p>
          </div>
        </div>

        {/* Linha do Tempo Cronológica */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            Cronologia Histórica da Batata
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-amber-700 text-sm">Século XVI</span>
              <p className="text-slate-600 mt-1">Chegada à Europa vinda da América do Sul via navegadores espanhóis.</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-amber-700 text-sm">Século XVII</span>
              <p className="text-slate-600 mt-1">Torna-se o alimento básico de sobrevivência da população pobre europeia.</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-amber-700 text-sm">Século XIX</span>
              <p className="text-slate-600 mt-1">Vincent van Gogh retrata sua importância na obra-prima <em>Die Kartoffelesser</em>.</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-amber-700 text-sm">Século XXI</span>
              <p className="text-slate-600 mt-1">Consagrada globalmente em formatos modernos como Pommes frites e chips.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2.4 Texto B4 — Zwei Rezepte mit Kartoffeln */}
      <div id="sec-2-4" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ChefHat className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Seção 2.4 · Texto B4</span>
            <h3 className="text-xl font-bold text-slate-900">
              Zwei Rezepte mit Kartoffeln — O Imperativo Culinário em Ação
            </h3>
          </div>
        </div>

        {/* Seletor de Receita */}
        <div className="flex gap-2">
          {RECIPES_DATA.map((rec, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRecipeIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedRecipeIndex === idx
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Receita {idx + 1}: {rec.titleDe}
            </button>
          ))}
        </div>

        {/* Conteúdo da Receita Selecionada */}
        {(() => {
          const currentRecipe = RECIPES_DATA[selectedRecipeIndex];
          return (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{currentRecipe.titleDe}</h4>
                  <p className="text-xs text-slate-500">{currentRecipe.titlePt} · {currentRecipe.servings}</p>
                </div>
                <AudioButton text={currentRecipe.titleDe} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Ingredientes */}
                <div className="md:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    Zutaten (Ingredientes)
                  </h5>
                  <ul className="divide-y divide-slate-200/60 text-xs">
                    {currentRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="py-2 flex items-center justify-between">
                        <span className="font-bold text-slate-900">{ing.itemDe}</span>
                        <span className="text-slate-500 italic">{ing.itemPt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modo de Preparo */}
                <div className="md:col-span-7 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-emerald-600" />
                    Zubereitung (Modo de Preparo com Imperativo Formal)
                  </h5>
                  <div className="space-y-3">
                    {currentRecipe.steps.map((st, i) => (
                      <div key={i} className="p-3 rounded-lg bg-emerald-50/40 border border-emerald-100 flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="font-mono font-bold text-[10px] text-emerald-800 uppercase px-1.5 py-0.5 rounded bg-emerald-100">
                            Passo {i + 1} · {st.imperativeVerb}
                          </span>
                          <p className="font-bold text-slate-900">{st.textDe}</p>
                          <p className="text-slate-600 italic">{st.textPt}</p>
                        </div>
                        <AudioButton text={st.textDe} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 2.5 Texto B5 — Im Restaurant (No Restaurante) */}
      <div id="sec-2-5" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Wine className="w-5 h-5 text-purple-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Seção 2.5 · Texto B5</span>
            <h3 className="text-xl font-bold text-slate-900">
              Im Restaurant — Diálogo de Hubert, Kerstin & Katja e Redemittel Canônicos
            </h3>
          </div>
        </div>

        {/* Resolução das Perguntas do Diálogo */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Perguntas de Compreensão Auditiva do Restaurante (Exercício B5a)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RESTAURANT_DIALOGUE_QUESTIONS.map((q) => (
              <div key={q.num} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900">{q.questionDe}</span>
                  <AudioButton text={q.answerDe} />
                </div>
                <p className="text-slate-500 italic">{q.questionPt}</p>
                <div className="mt-1 pt-1 border-t border-slate-200 font-semibold text-slate-800">
                  Resposta: <span className="text-purple-700 font-bold">{q.answerDe}</span> ({q.answerPt})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabela de Redemittel no Restaurante */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-purple-900 uppercase tracking-wider text-[11px]">
              Kellner / Kellnerin (Garçom / Garçonete)
            </span>
            <ul className="space-y-1.5 text-slate-800">
              <li>• <strong>Vor dem Essen:</strong> Was möchten Sie trinken? Was kann ich Ihnen bringen? Haben Sie schon gewählt?</li>
              <li>• <strong>Nach dem Essen:</strong> Hat es Ihnen geschmeckt? Waren Sie mit dem Essen zufrieden?</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px]">
              Gast (Cliente)
            </span>
            <ul className="space-y-1.5 text-slate-800">
              <li>• <strong>Bestellen:</strong> Ich hätte gern... / Ich nehme... / Ich trinke... / Könnte ich bitte noch ein Bier haben?</li>
              <li>• <strong>Reklamieren:</strong> Haben Sie meine Bestellung vergessen? Das Essen ist kalt.</li>
              <li>• <strong>Wünsche & Zahlen:</strong> Guten Appetit! Prost! Zum Wohl! Wir möchten dann zahlen. Die Rechnung, bitte!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2.24 Texto D1 — Wichtige Redemittel */}
      <div id="sec-2-24" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Seção 2.24 · Texto D1</span>
            <h3 className="text-xl font-bold text-slate-900">
              Wichtige Redemittel — Expressões de Sobrevivência Linguística (p. 106)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-indigo-700 uppercase">1. Im Restaurant (No Restaurante)</span>
            <p className="text-slate-800 leading-relaxed">
              Guten Morgen! Ich möchte bitte eine Tasse Kaffee. Ich nehme das Schnitzel. Ich esse den Lachs. Ich trinke ein Bier. Ich hätte gern ein Glas Weißwein. Wie schmeckt der Salat? Er schmeckt ausgezeichnet! Die Rechnung bitte! Ich möchte bitte zahlen.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-emerald-700 uppercase">2. Lebensmittel einkaufen (Compras)</span>
            <p className="text-slate-800 leading-relaxed">
              Ich möchte bitte zwei Kilo Kartoffeln. Ich nehme drei Bananen. Ich brauche 200 Gramm Schinken. Sonst noch etwas? Ist das alles? Ja, das ist alles. Haben Sie das Geld passend?
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-amber-700 uppercase">3. Kochen (Instruções Culinárias)</span>
            <p className="text-slate-800 leading-relaxed">
              Schälen Sie das Obst. Schneiden Sie die Äpfel. Kochen Sie die Kartoffeln. Braten Sie das Fleisch. Geben Sie die Obststücke in eine Schüssel. Vermengen Sie das Obst mit Zucker.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-rose-700 uppercase">4. Essgewohnheiten (Hábitos Alimentares)</span>
            <p className="text-slate-800 leading-relaxed">
              Ich esse zum Frühstück frisches Obst, zum Mittagessen Fleisch mit Kartoffeln und zum Abendbrot Spaghetti. Zum Frühstück gibt es normalerweise ein Brötchen mit Marmelade. Viele Menschen mögen auch Schokolade.
            </p>
          </div>
        </div>
      </div>

      {/* 2.27 Tabela Lexical Primária */}
      <div id="sec-2-27" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Seção 2.27</span>
              <h3 className="text-xl font-bold text-slate-900">
                Tabela Lexical Primária (27 Termos Fundamentais)
              </h3>
            </div>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar vocabulário..."
              value={lexiconSearch}
              onChange={(e) => setLexiconSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Palavra Alemã</th>
                <th className="py-2.5 px-3 font-semibold">Classe & Plural</th>
                <th className="py-2.5 px-3 font-semibold">Tradução Exata</th>
                <th className="py-2.5 px-3 font-semibold">Frase Modelo</th>
                <th className="py-2.5 px-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLexicon.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{entry.german}</td>
                  <td className="py-2.5 px-3 text-slate-500 text-xs">
                    {entry.grammarClass} ({entry.plural})
                  </td>
                  <td className="py-2.5 px-3 text-blue-700 font-medium">{entry.translation}</td>
                  <td className="py-2.5 px-3 text-slate-600 text-xs">{entry.sampleSentence}</td>
                  <td className="py-2.5 px-3 text-center">
                    <AudioButton text={`${entry.german}. ${entry.sampleSentence}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.28 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="sec-2-28" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Seção 2.28</span>
              <h3 className="text-xl font-bold text-slate-900">
                Umgangssprache — Registro Coloquial Autêntico (20 Expressões)
              </h3>
            </div>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar expressão..."
              value={slangSearch}
              onChange={(e) => setSlangSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredSlang.map((entry, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-amber-50/40 transition-colors flex items-start justify-between gap-2"
            >
              <div className="space-y-1">
                <p className="font-bold text-sm text-slate-900">{entry.expression}</p>
                <p className="text-xs font-semibold text-amber-800">{entry.translation}</p>
                <p className="text-[11px] text-slate-500 italic">{entry.context}</p>
              </div>
              <AudioButton text={entry.expression} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
