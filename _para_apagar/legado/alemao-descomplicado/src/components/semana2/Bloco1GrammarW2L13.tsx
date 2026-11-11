import React, { useState } from 'react';
import {
  Sun,
  CloudRain,
  Snowflake,
  Wind,
  Compass,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Car,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { AudioButton } from '../AudioButton';
import {
  SEASONS_DATA,
  WEATHER_VOCAB_DATA,
  DENN_VS_WEIL_DATA,
  DENN_EXAMPLES,
  WOLLEN_CONJUGATION,
  WOLLEN_VS_MOECHTEN_DATA,
  IMPERATIVE_DATA,
  DATIV_VERBS_DATA,
  PRONOUN_DECLENSION_DATA,
  DIRECTION_PREPOSITIONS_DATA,
  TRANSPORT_ITEMS,
  DEMONSTRATIVE_TABLE,
} from '../../data/semana2Lesson13Data';

export const Bloco1GrammarW2L13: React.FC = () => {
  const [weatherCategoryFilter, setWeatherCategoryFilter] = useState<'all' | 'nomen' | 'verb' | 'adjektiv' | 'temperatur'>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('Frühling');
  const [activeDativTab, setActiveDativTab] = useState<'verbs' | 'pronouns'>('verbs');

  const filteredWeather = WEATHER_VOCAB_DATA.filter(
    (item) => weatherCategoryFilter === 'all' || item.category === weatherCategoryFilter
  );

  return (
    <div id="bloco1-grammar-w2l13" className="space-y-12">
      {/* HEADER DO BLOCO 1 */}
      <section className="bg-gradient-to-r from-amber-900 via-yellow-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 border border-amber-400/30">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Bloco 1 (60 min) · Gramática Estrutural & Sintaxe Rígida
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Estações, Clima, denn vs. weil, wollen, Verbos com Dativo & Direções
            </h2>
            <p className="text-amber-100/90 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Mestria analítica do Capítulo 6 (Teil A, A1–A20): vocabulário meteorológico, coordenadas com <code className="text-amber-300 font-mono bg-black/30 px-1.5 py-0.5 rounded">denn</code>, conjugação e nuance de <code className="text-amber-300 font-mono bg-black/30 px-1.5 py-0.5 rounded">wollen</code> vs. <code className="text-amber-300 font-mono bg-black/30 px-1.5 py-0.5 rounded">möchten</code>, a mecânica dos <code className="text-amber-300 font-mono bg-black/30 px-1.5 py-0.5 rounded">Verben mit Dativ</code> e as preposições direcionais de viagem (<code className="text-amber-300 font-mono bg-black/30 px-1.5 py-0.5 rounded">Wohin?</code>).
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-xs text-amber-300 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
              Kapitel 6 · A1–A20
            </span>
            <span className="text-xs text-amber-200/80 font-medium">
              p. 142–156 do Kursbuch
            </span>
          </div>
        </div>
      </section>

      {/* 1.1 AS QUATRO ESTAÇÕES E O CLIMA */}
      <section id="sec-1-1" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seção 1.1</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Sun className="w-5 h-5 text-amber-600" />
              Die vier Jahreszeiten & Das Wetter (As Quatro Estações e o Clima)
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Masc. puro: der Frühling / Sommer / Herbst / Winter
          </span>
        </div>

        {/* CARDS DAS 4 ESTAÇÕES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SEASONS_DATA.map((season) => {
            const isSelected = selectedSeason === season.nameDe;
            return (
              <div
                key={season.nameDe}
                onClick={() => setSelectedSeason(season.nameDe)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/70 shadow-md ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {season.article}
                    </span>
                    <AudioButton text={`${season.article} ${season.nameDe}`} size="sm" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">{season.nameDe}</h4>
                  <p className="text-xs text-slate-600 font-medium capitalize mb-2">{season.translation}</p>
                  <p className="text-xs text-amber-900 font-semibold bg-amber-100/50 p-1.5 rounded mb-3">
                    📅 {season.monthsDe}
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed mb-2">{season.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Típico: </span>
                  {season.typicalWeather}
                </div>
              </div>
            );
          })}
        </div>

        {/* DETALHE DA ESTAÇÃO SELECIONADA */}
        {selectedSeason && (
          <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Exemplo Canônico — {selectedSeason}:
              </span>
              <p className="text-sm font-semibold text-slate-900 mt-0.5">
                {SEASONS_DATA.find((s) => s.nameDe === selectedSeason)?.example}
              </p>
            </div>
            <AudioButton
              text={SEASONS_DATA.find((s) => s.nameDe === selectedSeason)?.example || ''}
              size="md"
            />
          </div>
        )}

        {/* TABELA DE CLIMA E TEMPERATURA FILTRÁVEL */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-sky-600" />
              Vocabulário do Clima, Verbos Meteorológicos & Temperaturas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'nomen', 'verb', 'adjektiv', 'temperatur'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setWeatherCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize cursor-pointer transition-all ${
                    weatherCategoryFilter === cat
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all'
                    ? 'Todos (28)'
                    : cat === 'nomen'
                    ? 'Substantivos'
                    : cat === 'verb'
                    ? 'Verbos'
                    : cat === 'adjektiv'
                    ? 'Adjetivos'
                    : 'Temperaturas'}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <th className="p-3 w-40">Alemão</th>
                  <th className="p-3 w-36">Tradução</th>
                  <th className="p-3 w-28">Categoria</th>
                  <th className="p-3">Exemplo Canônico</th>
                  <th className="p-3 w-16 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredWeather.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">
                      {item.article ? (
                        <span className="font-mono text-amber-700 mr-1">{item.article}</span>
                      ) : null}
                      {item.de.replace(/^(der|die|das)\s+/, '')}
                    </td>
                    <td className="p-3 text-slate-700">{item.translation}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                          item.category === 'nomen'
                            ? 'bg-blue-100 text-blue-800'
                            : item.category === 'verb'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.category === 'adjektiv'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      <div className="font-medium text-slate-900">{item.exampleDe}</div>
                      <div className="text-xs text-slate-500">{item.examplePt}</div>
                    </td>
                    <td className="p-3 text-center">
                      <AudioButton text={item.exampleDe} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 1.2 CONJUNÇÃO DENN VS. WEIL */}
      <section id="sec-1-2" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seção 1.2</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Compass className="w-5 h-5 text-amber-600" />
              A Conjunção denn (pois, porque) & O Contraste com weil
            </h3>
          </div>
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            denn = Posição 0 (Verbo na Pos. II)
          </span>
        </div>

        {/* TABELA DE COMPARAÇÃO DENN VS WEIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {DENN_VS_WEIL_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border flex flex-col justify-between ${
                item.conjunction === 'denn'
                  ? 'bg-amber-50/60 border-amber-300'
                  : 'bg-indigo-50/60 border-indigo-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      item.conjunction === 'denn'
                        ? 'bg-amber-600 text-white'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {item.ruleName}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-600">{item.type}</span>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-700 block mb-1">Posição do Verbo Flexionado:</span>
                  <p className="text-sm font-black text-slate-950 bg-white/90 p-2.5 rounded-lg border border-slate-200/80">
                    {item.verbPosition}
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-700 block mb-1">Fórmula Sintática:</span>
                  <code className="text-xs font-mono text-slate-800 bg-white/90 p-2.5 rounded-lg block border border-slate-200/80">
                    {item.syntaxFormula}
                  </code>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200/80 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Exemplo:</span>
                    <AudioButton text={item.exampleDe} size="sm" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 mt-1">{item.exampleDe}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{item.examplePt}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic bg-white/50 p-2 rounded border border-slate-200/50">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {/* SATZBAU DESMONTADO COM DENN */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Anatomia Sintática: A Posição Zero de denn (5 Frases do Kursbuch)
          </h4>
          <div className="space-y-3">
            {DENN_EXAMPLES.map((ex, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs sm:text-sm">
                  <span className="bg-slate-200 text-slate-800 px-2.5 py-1 rounded font-medium">
                    {ex.satz1}
                  </span>
                  <span className="bg-amber-600 text-white px-2 py-1 rounded font-black font-mono shadow-xs">
                    {ex.konjunktion} (Pos 0)
                  </span>
                  <span className="bg-blue-100 text-blue-900 px-2.5 py-1 rounded font-semibold">
                    {ex.subjekt2} (Pos I)
                  </span>
                  <span className="bg-emerald-600 text-white px-2.5 py-1 rounded font-black shadow-xs">
                    {ex.verb2} (Pos II)
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
                    {ex.rest2}
                  </span>
                  <div className="ml-auto">
                    <AudioButton text={`${ex.satz1} denn ${ex.subjekt2} ${ex.verb2} ${ex.rest2}`} size="sm" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">{ex.translation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.3 O MODALVERB WOLLEN & WOLLEN VS. MÖCHTEN */}
      <section id="sec-1-3" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seção 1.3</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Sparkles className="w-5 h-5 text-amber-600" />
              O Verbo Modal wollen (querer) & A Trava de Polidez (wollen vs. möchten)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-md">
            ich will = er will
          </span>
        </div>

        {/* CONJUGAÇÃO DE WOLLEN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Tabela Completa de Conjugação — wollen
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <th className="p-3">Pessoa</th>
                    <th className="p-3">Pronome</th>
                    <th className="p-3">Forma Verbal</th>
                    <th className="p-3 w-16 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {WOLLEN_CONJUGATION.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-slate-500 font-mono text-xs">{c.person}</td>
                      <td className="p-3 font-semibold text-slate-800">{c.pronoun}</td>
                      <td className="p-3">
                        <span className="font-bold text-amber-700 text-sm">{c.form}</span>
                        {c.note && <span className="block text-[11px] text-slate-500 mt-0.5">{c.note}</span>}
                      </td>
                      <td className="p-3 text-center">
                        <AudioButton text={`${c.pronoun} ${c.form}`} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CONTRASTE WOLLEN VS MÖCHTEN */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Trava de Contraste Pragmático: wollen vs. möchten
            </h4>
            <div className="space-y-4">
              {WOLLEN_VS_MOECHTEN_DATA.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-sm text-slate-900 font-mono">{item.verb}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {item.formality}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mb-2 leading-relaxed">{item.nuance}</p>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">{item.exampleDe}</p>
                      <AudioButton text={item.exampleDe} size="sm" />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{item.translation}</p>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-2 font-medium">📍 Uso: {item.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1.4 IMPERATIVO: REVISÃO COMPLETA */}
      <section id="sec-1-4" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seção 1.4</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              O Imperativo (Imperativ) — Revisão Completa (Sie, du, ihr)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
            Comandos formais e informais de viagem
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="p-3">Verbo (Significado)</th>
                <th className="p-3">Formal (Sie)</th>
                <th className="p-3">Informal Sg. (du)</th>
                <th className="p-3">Informal Pl. (ihr)</th>
                <th className="p-3">Observação Fonética/Regra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {IMPERATIVE_DATA.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-slate-900 block">{item.verbInfinitive}</span>
                    <span className="text-xs text-slate-500">{item.meaning}</span>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span>{item.formalSie}</span>
                      <AudioButton text={item.formalSie} size="sm" />
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-amber-900">
                    <div className="flex items-center gap-1.5">
                      <span>{item.informalDu}</span>
                      <AudioButton text={item.informalDu} size="sm" />
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-indigo-900">
                    <div className="flex items-center gap-1.5">
                      <span>{item.informalIhr}</span>
                      <AudioButton text={item.informalIhr} size="sm" />
                    </div>
                  </td>
                  <td className="p-3 text-xs text-slate-600">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 1.5 & 1.6 VERBEN MIT DATIV & PRONOMES NO DATIVO */}
      <section id="sec-1-5" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seções 1.5 & 1.6</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Tag className="w-5 h-5 text-amber-600" />
              Verbos que Regem Dativo & Declinação de Pronomes Pessoais
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveDativTab('verbs')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                activeDativTab === 'verbs'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              8 Verbos com Dativo
            </button>
            <button
              onClick={() => setActiveDativTab('pronouns')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                activeDativTab === 'pronouns'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Pronomes no Dativo
            </button>
          </div>
        </div>

        {activeDativTab === 'verbs' ? (
          <div>
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl mb-6">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                A Mecânica de gefallen / passen / schmecken:
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                Em alemão, o que em português pensamos como objeto direto (ex.: "Eu gosto deste hotel") tem a estrutura invertida:
                <strong className="text-amber-950 font-bold ml-1">
                  [Das Hotel (Sujeito no Nominativo)] + gefällt + [mir (Objeto no Dativo)].
                </strong>{' '}
                Da mesma forma, roupas e medidas: <em>Die Hose (Nominativo) passt mir (Dativo).</em>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATIV_VERBS_DATA.map((v, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-slate-900 font-mono">{v.verb}</span>
                    <span className="text-xs font-semibold text-slate-600">{v.translation}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 mb-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">{v.exampleDe}</p>
                      <AudioButton text={v.exampleDe} size="sm" />
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{v.examplePt}</p>
                  </div>
                  <p className="text-[11px] text-slate-600">{v.grammaticalMechanic}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <th className="p-3">Nominativo (Sujeito)</th>
                    <th className="p-3">Acusativo (Obj. Direto)</th>
                    <th className="p-3 bg-amber-100/60 text-amber-900 font-black">Dativo (Obj. Indireto)</th>
                    <th className="p-3">Pessoa Gramatical</th>
                    <th className="p-3 w-16 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {PRONOUN_DECLENSION_DATA.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-800">{p.nominativ}</td>
                      <td className="p-3 text-slate-700">{p.akkusativ}</td>
                      <td className="p-3 font-black text-amber-800 bg-amber-50/40">{p.dativ}</td>
                      <td className="p-3 text-xs text-slate-500">{p.translationPt}</td>
                      <td className="p-3 text-center">
                        <AudioButton text={p.dativ.split(' ')[0]} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* 1.7 RICHTUNGSANGABEN (PREPOSIÇÕES DE DIREÇÃO: WOHIN?) */}
      <section id="sec-1-7" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seção 1.7</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Compass className="w-5 h-5 text-amber-600" />
              Richtungsangaben: Wohin? (nach, in, an, auf, zu)
            </h3>
          </div>
          <span className="text-xs text-amber-900 font-semibold bg-amber-100 px-2.5 py-1 rounded-md">
            Deslocamento & Destinos de Viagem
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIRECTION_PREPOSITIONS_DATA.map((dir, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-black font-mono text-amber-800 bg-amber-100 px-3 py-0.5 rounded-lg">
                    {dir.prep}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {dir.caseUsed}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mb-3">{dir.application}</p>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 mb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">{dir.exampleDe}</p>
                    <AudioButton text={dir.exampleDe} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{dir.examplePt}</p>
                </div>
              </div>
              <p className="text-[11px] text-rose-800 bg-rose-50 p-2 rounded border border-rose-200 font-medium">
                ⚠️ {dir.trava}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 1.8 VERKEHRSMITTEL & O DATIVO COM "MIT" */}
      <section id="sec-1-8" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seção 1.8</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Car className="w-5 h-5 text-amber-600" />
              Verkehrsmittel (Meios de Transporte) & A Regência Dativa de "mit"
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
            mit + dem / der
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRANSPORT_ITEMS.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100/60 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900">{item.vehicleDe}</span>
                <span className="text-xs font-black font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {item.mitDativ}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2">{item.translation}</p>
              <div className="p-2 bg-white rounded border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-900">{item.exampleSentence}</span>
                  <AudioButton text={item.exampleSentence} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1.9 ARTIGOS DEMONSTRATIVOS: DIESER & WELCHER */}
      <section id="sec-1-9" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Seção 1.9</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Tag className="w-5 h-5 text-amber-600" />
              Demonstrativartikel & Pronomen (dieser, diese, dieses, diese)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
            Nominativ vs. Akkusativ
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="p-3">Gênero Gramatical</th>
                <th className="p-3">Nominativo: Welcher?</th>
                <th className="p-3">Nominativo: Dieser</th>
                <th className="p-3">Acusativo: Welchen?</th>
                <th className="p-3">Acusativo: Diesen</th>
                <th className="p-3">Exemplo no Diálogo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {DEMONSTRATIVE_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{row.gender}</td>
                  <td className="p-3 font-mono text-slate-700">{row.nominativWelch}</td>
                  <td className="p-3 font-mono font-bold text-amber-800">{row.nominativDies}</td>
                  <td className="p-3 font-mono text-slate-700">{row.akkusativWelch}</td>
                  <td className="p-3 font-mono font-bold text-indigo-800">{row.akkusativDies}</td>
                  <td className="p-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span>{row.example}</span>
                      <AudioButton text={row.example} size="sm" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
