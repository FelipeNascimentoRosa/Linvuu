import React, { useState } from 'react';
import {
  MOEGEN_CONJUGATION_DATA,
  MOEGEN_VS_MOECHTEN_DATA,
  MOEGEN_EXAMPLES_DATA,
  MOEGEN_NEGATION_DATA,
  PRAETERITUM_SEIN_HABEN_DATA,
  PLURAL_FOOD_ITEMS_DATA,
  FOOD_VERBS_DATA,
  AKKUSATIV_FOOD_TABLE,
  NEHMEN_EXAMPLES,
  ESSEN_EXAMPLES,
  TRINKEN_EXAMPLES,
} from '../../data/semana2Lesson09Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  Heart,
  Utensils,
  History,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Bloco1GrammarW2L09: React.FC = () => {
  const [activeVerbTab, setActiveVerbTab] = useState<'moegen' | 'moechten'>('moegen');
  const [activePraeteritumTab, setActivePraeteritumTab] = useState<'sein' | 'haben'>('sein');
  const [selectedFoodFilter, setSelectedFoodFilter] = useState<number | 'all'>('all');

  const filteredFoodItems =
    selectedFoodFilter === 'all'
      ? PLURAL_FOOD_ITEMS_DATA
      : PLURAL_FOOD_ITEMS_DATA.filter((item) => item.familia === selectedFoodFilter);

  return (
    <section id="bloco1-semana2-aula9" className="space-y-12">
      {/* Banner Principal do Bloco 1 */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 009
            </span>
            <span className="px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-semibold rounded-full border border-blue-400/30">
              Kapitel 4, Teil A, A1–A15 (p. 86–97)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 1 (60 Minutos) — Anatomia Gramatical Pura & Sintaxe Rígida
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Domínio do modalverb <strong>mögen</strong> e contraste com <strong>möchten</strong>, consolidação do <strong>Präteritum</strong> oral de <em>sein</em> e <em>haben</em>, as 5 famílias do plural aplicadas ao léxico de alimentos e regência estrita do acusativo com verbos de alimentação (<em>essen, trinken, nehmen</em>).
          </p>
        </div>
      </div>

      {/* 1.1 O Modalverb mögen (gostar) — Conjugação Completa */}
      <div id="sec-1-1" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
              1.1
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                O Modalverb mögen (gostar) — Conjugação Completa & Negação
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Expressão de preferências duradouras, alteração vocálica no singular (ö &rarr; a) e distinção de möchten
              </p>
            </div>
          </div>
          <AudioButton
            text="Ich mag, du magst, er mag, wir mögen, ihr mögt, sie mögen. Ich mag Kaffee. Ich möchte einen Kaffee."
            label="Ouvir Paradigma"
            size="sm"
          />
        </div>

        {/* Tabela de Conjugação de mögen */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Pessoa</th>
                <th className="py-3 px-4">Pronome</th>
                <th className="py-3 px-4">Forma Conjugada</th>
                <th className="py-3 px-4">Observação Morfológica</th>
                <th className="py-3 px-4 text-right">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOEGEN_CONJUGATION_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-semibold text-slate-500">{row.person}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{row.pronoun}</td>
                  <td className="py-2.5 px-4 font-mono text-base font-extrabold text-rose-700">{row.form}</td>
                  <td className="py-2.5 px-4 text-slate-600">{row.obs}</td>
                  <td className="py-2.5 px-4 text-right">
                    <AudioButton text={`${row.pronoun} ${row.form}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerta de Simetria 1ª e 3ª Pessoa */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Regra Inflexível dos Modalverben:</strong> A 1ª pessoa do singular (<em>ich mag</em>) e a 3ª pessoa do singular (<em>er/sie/es/man mag</em>) são <strong>rigorosamente idênticas</strong> e não possuem terminação (nem <em>-e</em> nem <em>-t</em>). O trema (<em>ö</em>) desaparece em todas as pessoas do singular.
          </div>
        </div>

        {/* Trava de Contraste: mögen vs möchten */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Trava de Contraste: mögen (gostar) vs. möchten (gostaria)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOEGEN_VS_MOECHTEN_DATA.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-all space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-extrabold text-indigo-900">{item.verbo}</span>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
                <div className="text-xs font-semibold text-indigo-700">{item.uso}</div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-mono font-bold text-slate-900 text-sm">{item.exemplo}</div>
                  <div className="text-slate-600 text-xs italic">{item.traducao}</div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.explicacao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exemplos Práticos & Negação com mögen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Exemplos Afirmativos / Interrogativos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Frases Exemplares com mögen
            </h4>
            <div className="space-y-2">
              {MOEGEN_EXAMPLES_DATA.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div>
                    <span className="font-mono font-bold text-slate-900">{ex.de}</span>
                    <span className="block text-slate-500 text-xs">{ex.pt}</span>
                  </div>
                  <AudioButton text={ex.de} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Negação com mögen */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Regra de Negação: kein/keine (substantivos) vs. nicht gern (ações)
            </h4>
            <div className="space-y-2">
              {MOEGEN_NEGATION_DATA.map((neg, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-rose-100 bg-rose-50/40 hover:bg-rose-50/80 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div>
                    <span className="font-mono font-bold text-slate-900">{neg.de}</span>
                    <span className="block text-slate-600 text-xs">{neg.pt}</span>
                    <span className="block text-[10px] text-rose-700 font-semibold mt-0.5">{neg.tipo}</span>
                  </div>
                  <AudioButton text={neg.de} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 O Präteritum de sein e haben — Revisão Aprofundada */}
      <div id="sec-1-2" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
              1.2
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-amber-600" />
                O Präteritum de sein (war) e haben (hatte) — O Passado Simples da Oralidade
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Os dois únicos verbos cujo pretérito simples é hegemônico na comunicação oral diária
              </p>
            </div>
          </div>
          <AudioButton
            text="Ich war, du warst, er war, wir waren, ihr wart, sie waren. Ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten."
            label="Ouvir Paradigma Completo"
            size="sm"
          />
        </div>

        {/* Nota Pragmática de Uso */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-blue-900">
          <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Regra Pragmática da Comunicação Alemã:</strong> Enquanto os demais verbos alemães utilizam o <em>Perfekt</em> (composto) na linguagem falada cotidiana (ex: <em>Ich habe gegessen</em>), os verbos <strong>sein</strong> e <strong>haben</strong> preferem amplamente o <strong>Präteritum</strong> (<em>Ich war</em> em vez de <em>Ich bin gewesen</em>; <em>Ich hatte</em> em vez de <em>Ich habe gehabt</em>).
          </div>
        </div>

        {/* Comutador de Abas sein vs haben */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActivePraeteritumTab('sein')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activePraeteritumTab === 'sein'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            sein (war · ser / estar)
          </button>
          <button
            onClick={() => setActivePraeteritumTab('haben')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activePraeteritumTab === 'haben'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            haben (hatte · ter / possuir)
          </button>
        </div>

        {/* Tabela Ativa do Präteritum */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Pessoa</th>
                <th className="py-3 px-4">Pronome</th>
                <th className="py-3 px-4">Forma no Präteritum</th>
                <th className="py-3 px-4">Tradução Equivalente</th>
                <th className="py-3 px-4 text-right">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activePraeteritumTab === 'sein'
                ? PRAETERITUM_SEIN_HABEN_DATA.sein
                : PRAETERITUM_SEIN_HABEN_DATA.haben
              ).map((row, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-semibold text-slate-500">{row.person}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{row.pronoun}</td>
                  <td className="py-2.5 px-4 font-mono text-base font-extrabold text-amber-700">{row.form}</td>
                  <td className="py-2.5 px-4 text-slate-600">{row.pt}</td>
                  <td className="py-2.5 px-4 text-right">
                    <AudioButton text={`${row.pronoun} ${row.form}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exemplos em Contexto Real */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Frases Modelo do Präteritum em Uso Real
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRAETERITUM_SEIN_HABEN_DATA.exemplos.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">{item.de}</span>
                  <AudioButton text={item.de} size="sm" />
                </div>
                <div className="text-slate-500 text-xs italic">{item.pt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.3 As 5 Famílias do Plural aplicadas a Alimentos e Utensílios */}
      <div id="sec-1-3" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              1.3
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" />
                O Plural dos Substantivos — As 5 Famílias em Alimentos & Utensílios (p. 86–89)
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Sufixos -e, -er, -(e)n, -s e sem terminação aplicados aos itens essenciais da cozinha
              </p>
            </div>
          </div>
          <AudioButton
            text="das Brötchen die Brötchen, das Ei die Eier, die Wurst die Würste, der Schinken die Schinken, der Käse die Käse, die Marmelade die Marmeladen."
            label="Ouvir Amostra de Plurais"
            size="sm"
          />
        </div>

        {/* Filtros por Família */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-2">Filtrar:</span>
          <button
            onClick={() => setSelectedFoodFilter('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
              selectedFoodFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos ({PLURAL_FOOD_ITEMS_DATA.length})
          </button>
          {[1, 2, 3, 4, 5, 0].map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedFoodFilter(fam)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                selectedFoodFilter === fam
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {fam === 0 ? 'Sem Plural' : `Família ${fam}`}
            </button>
          ))}
        </div>

        {/* Grade de Alimentos & Utensílios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredFoodItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-slate-900">{item.singular}</span>
                <AudioButton text={`${item.singular}, ${item.plural}`} size="sm" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-emerald-700 text-xs">{item.plural}</span>
                {item.umlaut && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                    +Umlaut
                  </span>
                )}
              </div>
              <div className="text-slate-600 italic">{item.traducao}</div>
              <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                {item.familia === 0 ? 'Substantivo incontável' : `Família ${item.familia} (${item.sufixo})`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.4 a 1.8 O Acusativo com Verbos de Comida e Bebida */}
      <div id="sec-1-4-to-1-8" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              1.4–1.8
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                O Acusativo com Verbos de Comida e Bebida (essen, trinken, nehmen, kaufen)
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Regência direta inflexível: apenas o masculino sofre alteração (der &rarr; den / ein &rarr; einen / kein &rarr; keinen)
              </p>
            </div>
          </div>
          <AudioButton
            text="Ich esse einen Apfel, ich trinke einen Kaffee, ich nehme ein Brötchen, ich möchte eine Tasse Tee."
            label="Ouvir Acusativos"
            size="sm"
          />
        </div>

        {/* Tabela Matriz de Acusativo com Alimentos */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-indigo-900 text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Gênero / Número</th>
                <th className="py-3 px-4">Artigo Indefinido</th>
                <th className="py-3 px-4">Negação (kein-)</th>
                <th className="py-3 px-4">Exemplo Alemão</th>
                <th className="py-3 px-4">Tradução</th>
                <th className="py-3 px-4 text-right">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AKKUSATIV_FOOD_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{row.genero}</td>
                  <td className="py-2.5 px-4 font-mono font-extrabold text-indigo-700 text-sm">{row.artigoIndefinido}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-rose-700">{row.negacao}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{row.exemplo}</td>
                  <td className="py-2.5 px-4 text-slate-600">{row.pt}</td>
                  <td className="py-2.5 px-4 text-right">
                    <AudioButton text={row.exemplo} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Colunas com os Verbos Nucleares: nehmen, essen, trinken */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* nehmen */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono text-base font-extrabold text-slate-900">nehmen (pegar/pedir)</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">du nimmst</span>
            </div>
            <div className="space-y-2">
              {NEHMEN_EXAMPLES.map((item, idx) => (
                <div key={idx} className="text-xs space-y-0.5 bg-white p-2 rounded border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{item.de}</span>
                    <AudioButton text={item.de} size="sm" />
                  </div>
                  <span className="text-slate-500 text-[11px] block">{item.pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* essen */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono text-base font-extrabold text-slate-900">essen (comer)</span>
              <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">du isst</span>
            </div>
            <div className="space-y-2">
              {ESSEN_EXAMPLES.map((item, idx) => (
                <div key={idx} className="text-xs space-y-0.5 bg-white p-2 rounded border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{item.de}</span>
                    <AudioButton text={item.de} size="sm" />
                  </div>
                  <span className="text-slate-500 text-[11px] block">{item.pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* trinken */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono text-base font-extrabold text-slate-900">trinken (beber)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">regular</span>
            </div>
            <div className="space-y-2">
              {TRINKEN_EXAMPLES.map((item, idx) => (
                <div key={idx} className="text-xs space-y-0.5 bg-white p-2 rounded border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{item.de}</span>
                    <AudioButton text={item.de} size="sm" />
                  </div>
                  <span className="text-slate-500 text-[11px] block">{item.pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela Síntese dos Verbos com Acusativo */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
            1.8 Resumo dos 7 Verbos com Acusativo no Campo Semântico de Alimentação
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FOOD_VERBS_DATA.map((v, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 transition-all text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-indigo-900">{v.verbo}</span>
                  <span className="text-slate-500 italic text-[11px]">{v.traducao}</span>
                </div>
                <div className="font-mono font-bold text-slate-800 text-[11px]">{v.exemplo}</div>
                <div className="text-[10px] text-slate-400">{v.explicacao}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
