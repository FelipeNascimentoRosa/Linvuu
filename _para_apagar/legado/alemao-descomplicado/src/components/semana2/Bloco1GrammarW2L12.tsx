import React, { useState } from 'react';
import {
  TRENNBARE_VERBEN_27,
  TRENNBAR_IMPERATIV,
  INSEPARABLE_PREFIXES,
  IEREN_VERBEN,
  PERFEKT_SEIN_VERBS,
  PERFEKT_HABEN_VERBS,
  MODAL_PERFEKT_EXAMPLES,
  WECHSEL_PREPOSITIONS,
} from '../../data/semana2Lesson12Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Split,
  ShieldCheck,
  Compass,
  Cpu,
  Clock,
  Layers,
  Search,
} from 'lucide-react';

export const Bloco1GrammarW2L12: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePerfektTab, setActivePerfektTab] = useState<'sein' | 'haben'>('sein');
  const [activeWechselFilter, setActiveWechselFilter] = useState<'all' | 'in' | 'an' | 'auf'>('all');

  const filteredVerbs = TRENNBARE_VERBEN_27.filter(
    (v) =>
      v.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.prefix.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="bloco1-semana2-aula12" className="space-y-12">
      {/* Banner de Introdução do Bloco 1 */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Bloco 1 (60 Minutos) — Anatomia Gramatical Pura & Sintaxe Rígida
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Verbos Separáveis/Inseparáveis, Verbos em -ieren, Perfekt Avançado & Wechselpräpositionen
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Consolidação absoluta da oração alemã: os 27 verbos separáveis capitais, o particípio sem <span className="font-mono text-amber-300">ge-</span> (verbos inseparáveis e em <span className="font-mono text-emerald-300">-ieren</span>), o duplo infinitivo com verbos modais no passado (<span className="font-mono text-sky-300">Ersatzinfinitiv</span>) e a mecânica das preposições de troca (<span className="text-amber-300 font-semibold">Wo? + Dativ</span> vs. <span className="text-emerald-300 font-semibold">Wohin? + Akkusativ</span>).
          </p>
        </div>
      </div>

      {/* 1.1 Verbos Separáveis — Revisão e Aprofundamento */}
      <div id="sec-1-1" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Split className="w-4 h-4" /> Seção 1.1
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
              27 Verbos Fundamentais
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Os Verbos Separáveis (Trennbare Verben) — Matriz Completa & Pinça Oracional
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            No presente, o prefixo tônico é arremessado rigidamente para o final absoluto da oração (<span className="font-semibold text-slate-800">Satzende</span>). No Perfekt, o afixo <code className="bg-amber-100 text-amber-900 px-1 rounded font-bold">-ge-</code> é intercalado entre o prefixo e o radical.
          </p>
        </div>

        {/* Barra de Pesquisa de Verbos */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filtrar por verbo, prefixo ou tradução..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        {/* Tabela Interativa dos 27 Verbos */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Verbo Separável</th>
                <th className="py-3 px-3">Prefixo</th>
                <th className="py-3 px-3">Base</th>
                <th className="py-3 px-4">Tradução</th>
                <th className="py-3 px-4">Presente (Prefixo no Satzende)</th>
                <th className="py-3 px-4">Perfekt (-ge- no meio)</th>
                <th className="py-3 px-2 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVerbs.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-blue-900">{item.verb}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-xs font-semibold">
                      {item.prefix}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{item.base}</td>
                  <td className="py-2.5 px-4 text-slate-700">{item.translation}</td>
                  <td className="py-2.5 px-4 font-mono text-xs text-slate-800">{item.examplePresent}</td>
                  <td className="py-2.5 px-4 font-mono text-xs text-slate-800">{item.examplePerfekt}</td>
                  <td className="py-2.5 px-2 text-center">
                    <AudioButton text={`${item.verb}. ${item.examplePresent}. ${item.examplePerfekt}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Satzbau no Presente e Perfekt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Satzbau no Presente (Klammer / Pinça Oracional)
            </div>
            <p className="text-xs text-slate-600">
              Posição I (Elemento Inicial) → Posição II (Verbo Conjugado) → Mittelfeld (Complementos) → <strong>Satzende (Prefixo)</strong>
            </p>
            <div className="space-y-1.5 font-mono text-xs text-slate-800">
              <div className="p-2 bg-white rounded border border-blue-100 flex justify-between">
                <span>Ich <strong>stehe</strong> um 7.00 Uhr <strong>auf</strong>.</span>
                <AudioButton text="Ich stehe um sieben Uhr auf." size="sm" />
              </div>
              <div className="p-2 bg-white rounded border border-blue-100 flex justify-between">
                <span>Ich <strong>kaufe</strong> im Supermarkt <strong>ein</strong>.</span>
                <AudioButton text="Ich kaufe im Supermarkt ein." size="sm" />
              </div>
              <div className="p-2 bg-white rounded border border-blue-100 flex justify-between">
                <span>Ich <strong>schalte</strong> den Computer <strong>aus</strong>.</span>
                <AudioButton text="Ich schalte den Computer aus." size="sm" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Layers className="w-4 h-4 text-amber-600" />
              Satzbau no Perfekt (Prefixo + -ge- + Partizip)
            </div>
            <p className="text-xs text-slate-600">
              Posição I → Posição II (Auxiliar <em>haben</em> ou <em>sein</em>) → Mittelfeld → <strong>Satzende (Partizip II com -ge-)</strong>
            </p>
            <div className="space-y-1.5 font-mono text-xs text-slate-800">
              <div className="p-2 bg-white rounded border border-amber-100 flex justify-between">
                <span>Ich <strong>bin</strong> um 7.00 Uhr <strong>aufgestanden</strong>.</span>
                <AudioButton text="Ich bin um sieben Uhr aufgestanden." size="sm" />
              </div>
              <div className="p-2 bg-white rounded border border-amber-100 flex justify-between">
                <span>Ich <strong>habe</strong> im Supermarkt <strong>eingekauft</strong>.</span>
                <AudioButton text="Ich habe im Supermarkt eingekauft." size="sm" />
              </div>
              <div className="p-2 bg-white rounded border border-amber-100 flex justify-between">
                <span>Ich <strong>habe</strong> den Computer <strong>ausgeschaltet</strong>.</span>
                <AudioButton text="Ich habe den Computer ausgeschaltet." size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Imperativo com Verbos Separáveis */}
        <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/60 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            O Imperativo com Verbos Separáveis (du, ihr, Sie)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            No modo imperativo, a forma verbal conjugada lidera na <strong>Posição I</strong> e o prefixo separável é enviado para o <strong>final absoluto</strong> da exclamação.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {TRENNBAR_IMPERATIV.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-indigo-900 font-mono text-sm">{item.verb}</div>
                <div className="text-slate-700"><span className="text-slate-400 font-mono">du:</span> <strong>{item.du}</strong></div>
                <div className="text-slate-700"><span className="text-slate-400 font-mono">ihr:</span> <strong>{item.ihr}</strong></div>
                <div className="text-slate-700"><span className="text-slate-400 font-mono">Sie:</span> <strong>{item.Sie}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.2 Verbos Inseparáveis (Nicht-trennbare Verben) */}
      <div id="sec-1-2" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Seção 1.2
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700">
              8 Sentinelas Indivisíveis
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Os Verbos Inseparáveis — Os 8 Prefixos e a Imunidade ao <em>-ge-</em>
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Os prefixos inseparáveis não se separam nem no presente nem no imperativo, e no Perfekt <strong>NÃO recebem o infixo -ge-</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INSEPARABLE_PREFIXES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-rose-100 bg-rose-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-extrabold text-rose-900 bg-white px-2 py-0.5 rounded border border-rose-200">
                  {item.prefix}
                </span>
                <AudioButton text={`${item.prefix}. ${item.examples}`} size="sm" />
              </div>
              <div className="font-mono text-xs font-semibold text-slate-800">{item.examples}</div>
              <div className="text-xs text-slate-600">{item.translation}</div>
              <div className="text-[11px] font-mono text-rose-700 bg-rose-100/60 p-1.5 rounded">
                Perfekt: {item.perfektExamples}
              </div>
            </div>
          ))}
        </div>

        {/* Comparação Presente vs. Perfekt Inseparáveis */}
        <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold">
              <tr>
                <th className="py-2.5 px-4">Verbo Inseparável</th>
                <th className="py-2.5 px-4">Presente (soldado na Pos. II)</th>
                <th className="py-2.5 px-4">Perfekt (Particípio SEM -ge-)</th>
                <th className="py-2.5 px-3 text-center">Ouvir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr>
                <td className="py-2 px-4 font-bold text-slate-900">beginnen</td>
                <td className="py-2 px-4">Ich <strong>beginne</strong> um 9.00 Uhr.</td>
                <td className="py-2 px-4 text-emerald-800">Ich habe um 9.00 Uhr <strong>begonnen</strong>.</td>
                <td className="py-2 px-3 text-center"><AudioButton text="Ich beginne um neun Uhr. Ich habe um neun Uhr begonnen." size="sm" /></td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-900">vereinbaren</td>
                <td className="py-2 px-4">Ich <strong>vereinbare</strong> einen Termin.</td>
                <td className="py-2 px-4 text-emerald-800">Ich habe einen Termin <strong>vereinbart</strong>.</td>
                <td className="py-2 px-3 text-center"><AudioButton text="Ich vereinbare einen Termin. Ich habe einen Termin vereinbart." size="sm" /></td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-900">bezahlen</td>
                <td className="py-2 px-4">Ich <strong>bezahle</strong> die Rechnung.</td>
                <td className="py-2 px-4 text-emerald-800">Ich habe die Rechnung <strong>bezahlt</strong>.</td>
                <td className="py-2 px-3 text-center"><AudioButton text="Ich bezahle die Rechnung. Ich habe die Rechnung bezahlt." size="sm" /></td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-900">beantworten</td>
                <td className="py-2 px-4">Ich <strong>beantworte</strong> die E-Mail.</td>
                <td className="py-2 px-4 text-emerald-800">Ich habe die E-Mail <strong>beantwortet</strong>.</td>
                <td className="py-2 px-3 text-center"><AudioButton text="Ich beantworte die E-Mail. Ich habe die E-Mail beantwortet." size="sm" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.3 Verbos em -ieren (Perfekt sem ge-) */}
      <div id="sec-1-3" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Seção 1.3
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              Terminação em -ieren
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Os Verbos em <em>-ieren</em> — Regra Estrita do Particípio sem <em>ge-</em>
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Verbos de raiz internacional com sufixo <code className="font-mono text-emerald-800 bg-emerald-50 px-1 rounded">-ieren</code> formam o particípio passado com terminação regular <code className="font-mono text-emerald-800 bg-emerald-50 px-1 rounded">-iert</code>, <strong>sem prefixo ge-</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {IEREN_VERBEN.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">{item.verb}</span>
                <AudioButton text={`${item.verb}. ${item.partizip}. ${item.example}`} size="sm" />
              </div>
              <div className="font-mono text-emerald-800 font-bold text-sm">{item.partizip}</div>
              <div className="text-slate-600 text-[11px]">{item.translation}</div>
              <div className="font-mono text-[11px] text-slate-700 pt-1 border-t border-emerald-100">
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.5 O Perfekt com haben e sein */}
      <div id="sec-1-5" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Seção 1.5
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePerfektTab('sein')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePerfektTab === 'sein'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Auxiliar sein ({PERFEKT_SEIN_VERBS.length} verbos)
              </button>
              <button
                onClick={() => setActivePerfektTab('haben')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePerfektTab === 'haben'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Auxiliar haben ({PERFEKT_HABEN_VERBS.length} verbos)
              </button>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Critérios de Seleção do Auxiliar no Perfekt: <em>haben</em> vs. <em>sein</em>
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            <strong>sein</strong>: Movimento de deslocamento (A → B) + Mudança de estado biológico/físico + <em>bleiben</em> e <em>sein</em>.<br />
            <strong>haben</strong>: Verbos transitivos (com acusativo), pronominais reflexivos e processos de duração sem deslocamento.
          </p>
        </div>

        {activePerfektTab === 'sein' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {PERFEKT_SEIN_VERBS.map((v, i) => (
              <div key={i} className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono font-bold text-blue-900">{v.verb}</div>
                  <div className="font-mono font-semibold text-blue-700">{v.partizip}</div>
                  <div className="text-slate-500 text-[11px]">{v.trans}</div>
                </div>
                <AudioButton text={`${v.verb}. Er ${v.partizip}.`} size="sm" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {PERFEKT_HABEN_VERBS.map((v, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono font-bold text-slate-900">{v.verb}</div>
                  <div className="font-mono font-semibold text-slate-700">{v.partizip}</div>
                  <div className="text-slate-500 text-[11px]">{v.trans}</div>
                </div>
                <AudioButton text={`${v.verb}. Er ${v.partizip}.`} size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 1.7 O Perfekt com Modalverben (Ersatzinfinitiv) */}
      <div id="sec-1-7" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Seção 1.7
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700">
              Ersatzinfinitiv (Duplo Infinitivo)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            O Perfekt com Modalverben — A Estrutura do Infinitivo de Substituição
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Quando um modalverb acompanha um verbo principal no Perfekt, <strong>o modalverb não assume o particípio</strong> (ex: não se diz <em>*gemusst</em>), mas sim o seu <strong>infinitivo puro</strong> no Satzende, precedido pelo infinitivo do verbo principal: <code className="bg-purple-100 text-purple-900 px-1 rounded font-bold">haben + Infinitiv + Modalverb</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODAL_PERFEKT_EXAMPLES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-purple-900 text-sm">{item.modal}</span>
                <AudioButton text={item.perfekt} size="sm" />
              </div>
              <div className="font-mono font-bold text-slate-900 text-xs bg-white p-2 rounded border border-purple-100">
                {item.perfekt}
              </div>
              <div className="text-slate-600">{item.trans}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.9 Wechselpräpositionen (Wo? Dativo vs. Wohin? Acusativo) */}
      <div id="sec-1-9" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Seção 1.9
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800">
              9 Preposições de Troca
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            As Preposições de Troca (Wechselpräpositionen) — Regra Binária Wo? vs. Wohin?
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            As 9 preposições (<code className="font-mono font-semibold">in, an, auf, über, unter, neben, zwischen, vor, hinter</code>) alternam de caso conforme a semântica da ação:
            repouso/localização estática (<span className="text-blue-700 font-bold">Wo? → Dativ</span>) vs. deslocamento translatório com mudança de ambiente (<span className="text-emerald-700 font-bold">Wohin? → Akkusativ</span>).
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Preposição</th>
                <th className="py-3 px-4 bg-blue-50/70 text-blue-900">Wo? (Dativ / Repouso)</th>
                <th className="py-3 px-4 bg-emerald-50/70 text-emerald-900">Wohin? (Akkusativ / Movimento)</th>
                <th className="py-3 px-2 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {WECHSEL_PREPOSITIONS.map((w, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">{w.prep}</td>
                  <td className="py-3 px-4 bg-blue-50/30">
                    <div className="font-mono font-semibold text-blue-900">{w.woDativ}</div>
                    <div className="text-slate-600 text-[11px] font-mono mt-0.5">{w.exampleWo}</div>
                  </td>
                  <td className="py-3 px-4 bg-emerald-50/30">
                    <div className="font-mono font-semibold text-emerald-900">{w.wohinAkkusativ}</div>
                    <div className="text-slate-600 text-[11px] font-mono mt-0.5">{w.exampleWohin}</div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <AudioButton text={`${w.exampleWo}. ${w.exampleWohin}.`} size="sm" />
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
