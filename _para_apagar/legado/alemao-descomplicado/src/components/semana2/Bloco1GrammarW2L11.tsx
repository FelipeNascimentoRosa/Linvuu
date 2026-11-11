import React, { useState } from 'react';
import {
  TRENNBARE_VERBEN_LIST,
  INSEPARABLE_PREFIXES,
  PERFEKT_COMPARISON,
  MODAL_MUSSEN_SOLLEN,
  TEMPORALE_PRAEPOSITIONEN,
} from '../../data/semana2Lesson11Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Split,
  ShieldCheck,
  Flame,
  Calendar,
  Compass,
} from 'lucide-react';

export const Bloco1GrammarW2L11: React.FC = () => {
  const [activeVerbFilter, setActiveVerbFilter] = useState<'all' | 'trennbar' | 'nichttrennbar'>('all');
  const [activeModalPerson, setActiveModalPerson] = useState<number>(0);
  const [activePerfektTab, setActivePerfektTab] = useState<'haben' | 'sein'>('sein');

  return (
    <section id="bloco1-semana2-aula11" className="space-y-12">
      {/* Banner de Introdução do Bloco 1 */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Bloco 1 (60 Minutos) — Anatomia Gramatical Pura & Sintaxe Rígida
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Verbos Separáveis, Perfekt Rigoroso, Modalverben (müssen vs. sollen) & Preposições Temporais
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Domine a arquitetura de orações com verbos de prefixo separável no presente e no pretérito perfeito
            (<span className="font-mono text-amber-300">aufgestanden</span> vs.{' '}
            <span className="font-mono text-emerald-300">besucht</span>), a trava semântica irrevogável entre{' '}
            <span className="text-sky-300 font-semibold">müssen</span> (obrigação própria) e{' '}
            <span className="text-rose-300 font-semibold">sollen</span> (ordem de outrem), e as preposições temporais de alta precisão.
          </p>
        </div>
      </div>

      {/* 1.1 Verbos Separáveis (Trennbare Verben) */}
      <div id="sec-1-1" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <Split className="w-4 h-4" /> Seção 1.1
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
              Präfix-Trennung & Satzende
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Os Verbos Separáveis (Trennbare Verben) — A Mecânica da Pinça Oracional
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Na conjugação no tempo presente, o verbo base flexiona normalmente na{' '}
            <strong className="text-slate-900 font-bold">Posição II</strong>, enquanto o prefixo viaja para o{' '}
            <strong className="text-indigo-700 font-bold">final absoluto da frase (Satzende)</strong>.
          </p>
        </div>

        {/* Quadro Teórico de Satzbau */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 space-y-2">
            <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              Satzbau no Presente (Klammer / Pinça)
            </h4>
            <div className="font-mono text-xs bg-white/80 p-3 rounded-lg border border-indigo-100 space-y-1 text-slate-800">
              <p><span className="text-slate-400">Posição I:</span> <strong className="text-slate-900">Ich</strong></p>
              <p><span className="text-slate-400">Posição II (Verbo):</span> <strong className="text-indigo-700">stehe</strong></p>
              <p><span className="text-slate-400">Mittelfeld:</span> jeden Morgen um 7.00 Uhr</p>
              <p><span className="text-slate-400">Satzende (Prefixo):</span> <strong className="text-rose-600 font-bold">auf.</strong></p>
            </div>
            <p className="text-xs text-indigo-950 font-medium pt-1">
              Regra de Ouro: Nenhum elemento pode ficar após o prefixo na oração principal simples.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-2">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Satzbau no Perfekt (Infixo &quot;-ge-&quot;)
            </h4>
            <div className="font-mono text-xs bg-white/80 p-3 rounded-lg border border-amber-100 space-y-1 text-slate-800">
              <p><span className="text-slate-400">Posição I:</span> <strong className="text-slate-900">Ich</strong></p>
              <p><span className="text-slate-400">Posição II (Auxiliar):</span> <strong className="text-amber-700">bin</strong></p>
              <p><span className="text-slate-400">Mittelfeld:</span> um 7.00 Uhr</p>
              <p><span className="text-slate-400">Satzende (Partizip II):</span> <strong className="text-rose-600 font-bold">auf·ge·standen.</strong></p>
            </div>
            <p className="text-xs text-amber-950 font-medium pt-1">
              O elemento <span className="font-mono font-bold">-ge-</span> é inserido como um sanduíche entre o prefixo e a raiz!
            </p>
          </div>
        </div>

        {/* Tabela dos 15 Verbos Separáveis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Matriz dos 15 Verbos Separáveis Fundamentais (A1–A19)
            </h4>
            <span className="text-xs text-slate-500">Com exemplos no Presente e no Perfekt</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Verbo Separável</th>
                  <th className="p-3">Prefixo + Base</th>
                  <th className="p-3">Tradução</th>
                  <th className="p-3">Presente (Pos. II ... Satzende)</th>
                  <th className="p-3">Perfekt (Partizip II com -ge-)</th>
                  <th className="p-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {TRENNBARE_VERBEN_LIST.map((tv, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="p-3 font-bold text-indigo-950">
                      <span className="text-rose-600">{tv.prefix}</span>{tv.base}
                    </td>
                    <td className="p-3 font-mono text-slate-500">{tv.prefix} + {tv.base}</td>
                    <td className="p-3 font-medium text-slate-700">{tv.translation}</td>
                    <td className="p-3">
                      <div className="font-mono text-slate-900 font-semibold">{tv.examplePresent}</div>
                      <div className="text-[11px] text-slate-500 italic">{tv.translationPresent}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-amber-900 font-semibold">{tv.examplePerfekt}</div>
                      <div className="text-[11px] text-slate-500 italic">{tv.translationPerfekt}</div>
                    </td>
                    <td className="p-3 text-center">
                      <AudioButton text={`${tv.verb}. ${tv.examplePresent}. ${tv.examplePerfekt}`} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1.2 Verbos Inseparáveis (Nicht trennbare Verben) */}
      <div id="sec-1-2" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Seção 1.2
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
              Prefixos Fixos: Nunca se Separam & Sem &quot;ge-&quot;
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Os Verbos Inseparáveis (Nicht trennbare Verben) — As 8 Sentinelas Indivisíveis
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Os prefixos inseparáveis permanecem colados ao radical em <strong className="text-slate-900 font-bold">todos</strong> os tempos verbais.
            No Perfekt, eles possuem uma imunidade absoluta ao infixo <code className="bg-slate-100 px-1 rounded text-rose-600 font-bold">ge-</code>.
          </p>
        </div>

        {/* Macete Mnemônico */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
              Mnemônica Universal das 8 Sentinelas Inseparáveis
            </span>
            <p className="text-sm font-semibold text-emerald-950 font-mono">
              be- · emp- · ent- · er- · ge- · miss- · ver- · zer-
            </p>
            <p className="text-xs text-emerald-800">
              &quot;Berta empacota e entrega presentes, mas erra e gasta muito; comete equívocos, vende e zera tudo.&quot;
            </p>
          </div>
          <div className="shrink-0">
            <AudioButton text="be, emp, ent, er, ge, miss, ver, zer. Nicht trennbare Verben bekommen kein ge im Perfekt." size="sm" />
          </div>
        </div>

        {/* Grid de Exemplos Inseparáveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INSEPARABLE_PREFIXES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
                  {item.prefix}
                </span>
                <span className="text-xs text-slate-500 font-medium">{item.translation}</span>
                <AudioButton text={`${item.example}. ${item.presentSentence}. ${item.perfektSentence}`} size="sm" />
              </div>
              <p className="text-xs font-bold text-slate-800 font-mono">{item.example}</p>
              <div className="text-xs space-y-1 bg-white p-2.5 rounded-lg border border-slate-100">
                <p className="text-slate-800">
                  <span className="text-slate-400 font-medium">Presente:</span> <strong>{item.presentSentence}</strong>
                </p>
                <p className="text-emerald-800">
                  <span className="text-slate-400 font-medium">Perfekt:</span> <strong>{item.perfektSentence}</strong>
                </p>
                <p className="text-[11px] text-slate-500 italic">{item.translationSentence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.3 O Perfekt: haben vs. sein */}
      <div id="sec-1-3" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Seção 1.3
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100">
              Critérios de Seleção do Auxiliar
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            O Perfekt (Pretérito Perfeito) — A Divisão Fundamental entre haben e sein
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Mais de 85% dos verbos em alemão utilizam <span className="font-semibold text-indigo-700">haben</span>.
            O auxiliar <span className="font-semibold text-amber-700">sein</span> é reservado para categorias restritas e estritas de dinâmica física e estados.
          </p>
        </div>

        {/* Abas Interativas haben vs sein */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActivePerfektTab('sein')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activePerfektTab === 'sein'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Auxiliar sein (Movimento, Mudança de Estado & Exceções Estáticas)
          </button>
          <button
            onClick={() => setActivePerfektTab('haben')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activePerfektTab === 'haben'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Auxiliar haben (Transitivos, Reflexivos, Duração Estática)
          </button>
        </div>

        {/* Conteúdo da Aba Selecionada */}
        {PERFEKT_COMPARISON.filter((c) => c.auxiliary === activePerfektTab).map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <div className={`p-4 rounded-xl border ${
              cat.auxiliary === 'sein' ? 'bg-amber-50/60 border-amber-200' : 'bg-indigo-50/60 border-indigo-200'
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Regras Determinantes para o Auxiliar {cat.auxiliary.toUpperCase()}:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-800">
                {cat.rules.map((r, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      cat.auxiliary === 'sein' ? 'text-amber-600' : 'text-indigo-600'
                    }`} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.examples.map((ex, exIdx) => (
                <div key={exIdx} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs font-mono">{ex.infinitive}</span>
                    <AudioButton text={`${ex.participle}. ${ex.sentence}`} size="sm" />
                  </div>
                  <div className="text-xs font-semibold text-amber-800 font-mono">{ex.participle}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{ex.translation}</div>
                  <div className="text-xs bg-slate-50 p-2 rounded border border-slate-100 text-slate-700 font-mono mt-1">
                    {ex.sentence}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 1.4 a 1.6 Modalverben: müssen vs. sollen */}
      <div id="sec-1-4" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Seções 1.4–1.6
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-100">
              Trava de Contraste Semântico
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Os Modalverben müssen e sollen — Necessidade Própria vs. Ordem de Outrem
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Em português, dizemos indistintamente &quot;tenho que fazer&quot; ou &quot;devo fazer&quot;. No alemão culto, essa confusão gera ambiguidade hierárquica gravíssima.
          </p>
        </div>

        {/* Tabela de Contraste Semântico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border-2 border-indigo-200 bg-indigo-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-indigo-600 text-white font-mono font-bold text-xs">
                müssen (ter que / dever por necessidade própria)
              </span>
              <AudioButton text="Ich muss arbeiten. Das ist meine eigene Pflicht oder Notwendigkeit." size="sm" />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Expressa uma <strong className="text-indigo-950 font-bold">necessidade interna, imperativo biológico ou dever assumido de forma autônoma</strong>.
              Ninguém mandou diretamente você fazer; a situação ou você mesmo decidiu.
            </p>
            <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs font-mono space-y-1">
              <p className="text-indigo-900 font-semibold">Ich muss heute länger arbeiten.</p>
              <p className="text-slate-500 italic text-[11px]">Tenho que trabalhar até mais tarde hoje (porque tenho metas/tarefas a cumprir).</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border-2 border-rose-200 bg-rose-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-rose-600 text-white font-mono font-bold text-xs">
                sollen (dever / ter a ordem de outra pessoa)
              </span>
              <AudioButton text="Ich soll arbeiten. Mein Chef will das." size="sm" />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Expressa uma <strong className="text-rose-950 font-bold">ordem, encargo, incumbência ou instrução de terceiros</strong> (o chefe, o médico, a mãe).
              Equivale a &quot;Mandaram que eu fizesse...&quot; ou &quot;É para eu fazer...&quot;.
            </p>
            <div className="bg-white p-3 rounded-lg border border-rose-100 text-xs font-mono space-y-1">
              <p className="text-rose-900 font-semibold">Ich soll heute länger arbeiten. (Mein Chef will das!)</p>
              <p className="text-slate-500 italic text-[11px]">É para eu trabalhar até mais tarde hoje (meu chefe me deu essa ordem expressa!).</p>
            </div>
          </div>
        </div>

        {/* Tabela de Conjugação Paralela dos Modalverben */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Conjugação Comparativa Completa
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Pronome / Pessoa</th>
                  <th className="p-3">müssen (ter que)</th>
                  <th className="p-3">sollen (dever de terceiro)</th>
                  <th className="p-3">Satzbau com Infinitivo no Satzende</th>
                  <th className="p-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {MODAL_MUSSEN_SOLLEN.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">{row.person}</td>
                    <td className="p-3 font-mono font-bold text-indigo-700 text-sm">{row.mussen}</td>
                    <td className="p-3 font-mono font-bold text-rose-700 text-sm">{row.sollen}</td>
                    <td className="p-3 font-mono text-slate-700">
                      {idx === 0 && 'Ich muss / soll den Termin absagen.'}
                      {idx === 1 && 'Du musst / sollst die E-Mail beantworten.'}
                      {idx === 2 && 'Er muss / soll den Flug nach London buchen.'}
                      {idx === 3 && 'Wir müssen / sollen ein Angebot schreiben.'}
                      {idx === 4 && 'Ihr müsst / sollt die Rechnung bezahlen.'}
                      {idx === 5 && 'Sie müssen / sollen Gäste begrüßen.'}
                      {idx === 6 && 'Sie müssen / sollen das Fenster öffnen.'}
                    </td>
                    <td className="p-3 text-center">
                      <AudioButton
                        text={`${row.person}: ${row.mussen}, ${row.sollen}`}
                        size="sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1.7 Preposições Temporais (Temporale Präpositionen) */}
      <div id="sec-1-7" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Seção 1.7
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-semibold border border-sky-100">
              Regência de Casos no Tempo
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            As Preposições Temporais (am, im, um, von...bis, vor, nach, seit, in)
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Organize qualquer relato temporal com precisão milimétrica e domínio dos casos gramaticais (Dativo e Acusativo).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TEMPORALE_PRAEPOSITIONEN.map((tp, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-sky-300 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-mono font-bold text-xs">
                  {tp.prep}
                </span>
                <AudioButton text={`${tp.prep}. ${tp.example}`} size="sm" />
              </div>
              <p className="text-xs font-semibold text-slate-900">{tp.usage}</p>
              <div className="bg-white p-2 rounded border border-slate-100 text-xs font-mono text-sky-900 font-bold">
                {tp.example}
              </div>
              <p className="text-[11px] text-slate-500 italic">{tp.translation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 1.8 a 1.10 Verbos Modelo: anfangen e aufstehen */}
      <div id="sec-1-8" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Seções 1.8–1.10
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-100">
              Alternância Vocálica & Paradigmas Centrais
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Paradigmas do Dia: anfangen (a → ä) & aufstehen (auxiliar sein)
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Observe a alternância vocálica obrigatória na 2ª e 3ª pessoa do singular de{' '}
            <code className="bg-slate-100 px-1 rounded text-purple-800 font-bold">anfangen</code> (du fängst an, er fängt an).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* anfangen */}
          <div className="p-4 rounded-xl border border-slate-200 bg-purple-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-purple-900 text-sm">anfangen (começar) — Separável</h4>
              <AudioButton text="anfangen. ich fange an, du fängst an, er fängt an, wir fangen an, ihr fangt an, sie fangen an. Hat angefangen." size="sm" />
            </div>
            <div className="text-xs font-mono space-y-1 bg-white p-3 rounded-lg border border-purple-100">
              <p>ich <strong className="text-purple-700">fange</strong> ... an</p>
              <p>du <strong className="text-rose-600 font-bold">fängst</strong> ... an (a → ä!)</p>
              <p>er/sie/es <strong className="text-rose-600 font-bold">fängt</strong> ... an (a → ä!)</p>
              <p>wir <strong className="text-purple-700">fangen</strong> ... an</p>
              <p>ihr <strong className="text-purple-700">fangt</strong> ... an</p>
              <p>sie/Sie <strong className="text-purple-700">fangen</strong> ... an</p>
              <p className="pt-1 text-slate-500 font-sans italic">Perfekt: <strong>hat angefangen</strong> (auxiliar haben!)</p>
              <p className="text-slate-500 font-sans italic">Imperativo: <strong>Fang an! / Fangt an! / Fangen Sie an!</strong></p>
            </div>
          </div>

          {/* aufstehen */}
          <div className="p-4 rounded-xl border border-slate-200 bg-amber-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-900 text-sm">aufstehen (levantar-se) — Separável</h4>
              <AudioButton text="aufstehen. ich stehe auf, du stehst auf, er steht auf, wir stehen auf, ihr steht auf, sie stehen auf. Ist aufgestanden." size="sm" />
            </div>
            <div className="text-xs font-mono space-y-1 bg-white p-3 rounded-lg border border-amber-100">
              <p>ich <strong className="text-amber-700">stehe</strong> ... auf</p>
              <p>du <strong className="text-amber-700">stehst</strong> ... auf</p>
              <p>er/sie/es <strong className="text-amber-700">steht</strong> ... auf</p>
              <p>wir <strong className="text-amber-700">stehen</strong> ... auf</p>
              <p>ihr <strong className="text-amber-700">steht</strong> ... auf</p>
              <p>sie/Sie <strong className="text-amber-700">stehen</strong> ... auf</p>
              <p className="pt-1 text-rose-700 font-sans font-bold">Perfekt: ist aufgestanden (exige auxiliar sein!)</p>
              <p className="text-slate-500 font-sans italic">Imperativo: <strong>Steh auf! / Steht auf! / Stehen Sie auf!</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
