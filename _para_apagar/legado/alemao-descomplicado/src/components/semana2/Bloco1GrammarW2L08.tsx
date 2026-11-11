import React, { useState } from 'react';
import {
  PLURAL_FAMILIES_DATA,
  COMPOUND_NOUNS_DATA,
  PERSONAL_PRONOUNS_AKKUSATIV,
  MODALS_WITH_AKKUSATIV_PRONOUNS,
} from '../../data/semana2Lesson08Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Split,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const Bloco1GrammarW2L08: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<number>(1);
  const [interactivePronoun, setInteractivePronoun] = useState<string>('ihn');

  const currentFamilyData =
    PLURAL_FAMILIES_DATA.find((f) => f.familia === selectedFamily) ||
    PLURAL_FAMILIES_DATA[0];

  return (
    <section id="bloco1-semana2-aula8" className="space-y-12">
      {/* Banner Principal do Bloco 1 */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 008
            </span>
            <span className="px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-semibold rounded-full border border-blue-400/30">
              Kapitel 3, Teil B, C e D (p. 72–84)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 1 (60 Minutos) — Anatomia Gramatical Pura & Sintaxe Rígida
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Consolidação das cinco famílias do plural dos substantivos e substantivos compostos (Komposita), maestria da substituição com pronomes pessoais no acusativo (mich, dich, ihn, sie, es, uns, euch, Sie) e a estrutura oracional rígida com verbos modais (Satzklammer).
          </p>
        </div>
      </div>

      {/* 1.1 O Plural dos Substantivos — As 5 Famílias */}
      <div id="sec-1-1" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              1.1
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                O Plural dos Substantivos — Revisão Aprofundada das 5 Famílias
              </h3>
              <p className="text-xs text-slate-500">
                Toda palavra em alemão pertence a uma destas cinco famílias morfológicas de plural
              </p>
            </div>
          </div>
          <AudioButton
            text="Die fünf Pluralfamilien: die Tische, die Kinder, die Frauen, die Autos, die Lehrer."
            label="🇩🇪 As 5 Famílias em Áudio"
            size="sm"
          />
        </div>

        {/* Tabela Comparativa Resumida das 5 Famílias */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="py-3 px-3 font-bold">Família</th>
                <th className="py-3 px-3 font-bold">Terminação</th>
                <th className="py-3 px-3 font-bold">Trema (Umlaut)?</th>
                <th className="py-3 px-3 font-bold">Exemplo Singular</th>
                <th className="py-3 px-3 font-bold">Exemplo Plural</th>
                <th className="py-3 px-3 font-bold text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PLURAL_FAMILIES_DATA.map((fam) => (
                <tr
                  key={fam.familia}
                  onClick={() => setSelectedFamily(fam.familia)}
                  className={`cursor-pointer transition-colors ${
                    selectedFamily === fam.familia
                      ? 'bg-blue-50/80 font-medium'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-blue-900">
                    Família {fam.familia}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">
                    {fam.terminacao}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {fam.umlaut}
                  </td>
                  <td className="py-2.5 px-3 text-slate-800">
                    {fam.exemploSingular}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {fam.exemploPlural}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <AudioButton text={`${fam.exemploSingular}, ${fam.exemploPlural}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Navegador Interativo Detalhado por Família */}
        <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                Exploração Detalhada: Família {currentFamilyData.familia} ({currentFamilyData.terminacao})
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                {currentFamilyData.dica}
              </p>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedFamily(num)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedFamily === num
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentFamilyData.exemplos.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-slate-500">{item.singular} ({item.traducao})</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <span>{item.plural}</span>
                    {item.temUmlaut && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                        Umlaut
                      </span>
                    )}
                  </div>
                </div>
                <AudioButton text={`${item.singular}, ${item.plural}`} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.2 O Plural dos Substantivos Compostos (Komposita) */}
      <div id="sec-1-2" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              1.2
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                O Plural dos Substantivos Compostos (Komposita)
              </h3>
              <p className="text-xs text-slate-500">
                Regra Inegociável: O último elemento da composição determina SEMPRE o gênero e o plural da palavra composta
              </p>
            </div>
          </div>
          <AudioButton
            text="das Hotelzimmer, die Hotelzimmer. der Schreibtisch, die Schreibtische. das Krankenhaus, die Krankenhäuser."
            label="🇩🇪 Komposita em Áudio"
            size="sm"
          />
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Regra de Ouro da Composição Germânica:</strong> Não importa quantos elementos formem a palavra composta (ex.: <em>Hotel + Zimmer</em> ou <em>Kredit + Karte</em> ou <em>Termin + Kalender</em>); quem manda é a <strong>última palavra</strong>. Se a última palavra for neutra com plural em -er (<em>das Haus &rarr; die Häuser</em>), o composto todo será neutro com plural em -er (<em>das Krankenhaus &rarr; die Krankenhäuser</em>).
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {COMPOUND_NOUNS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {item.composto}
                  </span>
                  <span className="text-slate-500 block text-[11px]">
                    = {item.primeiroElemento} + <strong>{item.ultimoElemento}</strong>
                  </span>
                </div>
                <AudioButton text={`${item.composto}, ${item.plural}`} size="sm" />
              </div>
              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-indigo-900">{item.plural}</span>
                  <span className="text-slate-500 text-[10px] block">({item.traducao})</span>
                </div>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">
                  {item.artigo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.3 Os Pronomes Pessoais no Acusativo */}
      <div id="sec-1-3" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              1.3
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Os Pronomes Pessoais no Acusativo — Revisão Completa
              </h3>
              <p className="text-xs text-slate-500">
                Substituição precisa do objeto direto: mich, dich, ihn, sie, es, uns, euch, sie, Sie
              </p>
            </div>
          </div>
          <AudioButton
            text="ich mich, du dich, er ihn, sie sie, es es, wir uns, ihr euch, sie sie, Sie Sie."
            label="🇩🇪 Pronomes no Acusativo"
            size="sm"
          />
        </div>

        {/* Trava de Contraste Português vs Alemão */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-rose-950">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong>Trava de Contraste Sintática (Atenção Máxima):</strong> Em português, o pronome oblíquo frequentemente vem ANTES do verbo (próclise: <em>&quot;Eu te vejo&quot;</em> ou <em>&quot;Eu o conheço&quot;</em>). Em alemão, isso é gramaticalmente impossível! O verbo conjugado ocupa a Posição II, e o pronome no acusativo deve vir <strong>IMEDIATAMENTE DEPOIS do verbo</strong>:
            <div className="font-mono font-bold mt-1 text-rose-900 text-xs sm:text-sm">
              [Suj. Pos I] + [Verbo Pos II] + [Pronome Acusativo] → Ich sehe <span className="underline">dich</span>. / Ich kenne <span className="underline">ihn</span>.
            </div>
          </div>
        </div>

        {/* Grade de Pronomes com Exemplos e Áudios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {PERSONAL_PRONOUNS_AKKUSATIV.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-all space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {p.nominativo} → <strong className="text-emerald-700 text-sm font-mono">{p.acusativo}</strong>
                </span>
                <AudioButton text={`${p.exemplo}`} size="sm" />
              </div>
              <div className="text-slate-600 text-[11px]">
                {p.traducao}
              </div>
              <div className="pt-2 border-t border-slate-200/70">
                <div className="font-semibold text-slate-900">{p.exemplo}</div>
                <div className="text-slate-500 text-[11px]">{p.exemploPt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.4, 1.5 & 1.6 — Modais (möchten / können) com Pronomes e Satzklammer */}
      <div id="sec-1-4-to-1-6" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              1.4–1.6
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Verbos Modais + Pronomes no Acusativo & Satzklammer
              </h3>
              <p className="text-xs text-slate-500">
                Estrutura oracional: Sujeito + Modal (Pos. II) + Pronome (Mittelfeld) + Verbo no Infinitivo (Satzende)
              </p>
            </div>
          </div>
          <AudioButton
            text="Ich möchte ihn sehen. Ich kann sie hören. Kannst du mich abholen? Können Sie uns helfen?"
            label="🇩🇪 Exemplos Modais com Pronomes"
            size="sm"
          />
        </div>

        {/* Diagrama de Satzklammer Visual */}
        <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2 text-xs">
          <span className="font-bold text-purple-900 uppercase tracking-wider block">
            Visualizador da Pinça Oracional Alemã (Satzklammer):
          </span>
          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-2xs">
              <span className="text-[10px] text-slate-400 block">Posição I</span>
              <strong className="text-slate-900 text-xs sm:text-sm">Ich</strong>
            </div>
            <div className="bg-purple-100 p-2.5 rounded-lg border border-purple-300 shadow-2xs">
              <span className="text-[10px] text-purple-700 block">Posição II (Modal)</span>
              <strong className="text-purple-950 text-xs sm:text-sm">möchte / kann</strong>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-2xs">
              <span className="text-[10px] text-slate-400 block">Mittelfeld (Pronome)</span>
              <strong className="text-emerald-700 text-xs sm:text-sm">ihn / sie / es / dich</strong>
            </div>
            <div className="bg-purple-100 p-2.5 rounded-lg border border-purple-300 shadow-2xs">
              <span className="text-[10px] text-purple-700 block">Satzende (Infinitivo)</span>
              <strong className="text-purple-950 text-xs sm:text-sm">sehen / anrufen.</strong>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {MODALS_WITH_AKKUSATIV_PRONOUNS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-all flex items-center justify-between text-xs"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  {item.modal} + {item.pronome}
                </span>
                <div className="font-semibold text-slate-900 mt-1">
                  {item.frase}
                </div>
                <div className="text-slate-500 text-[11px]">
                  {item.traducao}
                </div>
              </div>
              <AudioButton text={item.frase} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
