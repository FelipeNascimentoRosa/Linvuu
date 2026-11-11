import React, { useState } from 'react';
import {
  TEXT_B1_STATS,
  TEXT_B2_EXERCISE,
  NOMENGROPPE_C1,
  TEXT_C2_SENTENCES,
  TEXT_C3_COMPARISON,
  TEXT_C4_POSSESSIVE,
  TEXT_C5_PAIRS,
  TEXT_C6_ITEMS,
  TEXT_C7_PAIRS,
  TEXT_C8_ITEMS,
  TEXT_C9_TABLE,
  TEXT_C10_ITEMS,
  TEXT_C11_ITEMS,
  TEXT_C12_ITEMS,
  TEXT_C13_ITEMS,
  TEXT_C14_ITEMS,
  TEXT_C15_ITEMS,
  REDEMITTEL_D1,
  VERB_DICTIONARY_D2,
  EVALUATION_D3,
  LEXICON_LESSON_5,
  COLLOQUIAL_LESSON_5,
} from '../data/lesson05Data';
import { AudioButton } from './AudioButton';
import {
  BookOpen,
  Search,
  Volume2,
  BarChart2,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  HelpCircle,
  FileText,
  ListOrdered,
} from 'lucide-react';

export const Bloco2TextsLexicon05: React.FC = () => {
  const [lexiconSearch, setLexiconSearch] = useState<string>('');
  const [evalAnswers, setEvalAnswers] = useState<Record<number, 'gut' | 'nicht'>>({});

  const filteredLexicon = LEXICON_LESSON_5.filter(
    (item) =>
      item.palavraAlema.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.traducao.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(lexiconSearch.toLowerCase())
  );

  const toggleEval = (index: number, value: 'gut' | 'nicht') => {
    setEvalAnswers((prev) => ({
      ...prev,
      [index]: prev[index] === value ? (undefined as any) : value,
    }));
  };

  return (
    <section id="bloco-2-textos-lexico-rodada5" className="space-y-12">
      {/* Banner de Abertura */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 2 (60 Minutos) · Rodada 05
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 005 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transcrição Integral, Tradução & Mineração Lexical
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Estatísticas socioculturais da Áustria e Suíça (B1–B2), o Grupo Nominal (C1–C2), contraste anafórico (C3–C6), matriz conversacional com <em>können</em> (C7–C11),
          limites semânticos de verbos (C12), negações e preposições (C13–C15), repertório de expressões (D1), dicionário de 23 verbos (D2) e mineração de 25 termos canônicos.
        </p>
      </div>

      {/* 2.1 Texto B1 — Was machen die Österreicher in der Freizeit? */}
      <div id="secao-2-1-texto-b1" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.1 · Texto B1 (p. 47)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Was machen die Österreicher in der Freizeit? (Pesquisa Estatística de Lazer)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Panorama sociológico das atividades de lazer na Áustria com ranking percentual e transcrição fonética.
            </p>
          </div>
          <AudioButton
            text="Siebenundachtzig Prozent der Österreicher sehen gern Filme, Serien oder Shows. Mit dem Handy telefonieren: siebenundachtzig Prozent. Radio hören: siebenundsiebzig Prozent. Zeitungen und Zeitschriften lesen: einundsechzig Prozent."
            lang="de-DE"
            label="Ouvir Destaques Estatísticos"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TEXT_B1_STATS.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/40 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-xs text-slate-800">{item.atividade}</span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 shrink-0">
                    {item.porcentagem}%
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{item.traducao}</span>
                  <AudioButton text={item.atividade} lang="de-DE" size="sm" />
                </div>
                <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${item.porcentagem}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.2 Texto B2 — Freizeitaktivitäten in der Schweiz */}
      <div id="secao-2-2-texto-b2" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.2 · Texto B2 (p. 47)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Freizeitaktivitäten in der Schweiz (Atividades de Lazer na Suíça)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Resolução comentada das 8 lacunas de verbos de lazer na Suíça.
            </p>
          </div>
          <AudioButton
            text="Auch die Schweizer sehen in ihrer Freizeit gern Filme oder spielen zu Hause Computerspiele. Viele Schweizer telefonieren oft mit ihrem Handy oder surfen im Internet. Die Schweizer sind gern aktiv: Sie wandern viel und machen Sport. Freunde besuchen, Radio hören und Bücher lesen sind ebenfalls beliebte Freizeitaktivitäten."
            lang="de-DE"
            label="Ouvir Texto B2 Completo"
          />
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-semibold">Nº</th>
                  <th className="py-2.5 px-3 font-semibold">Verbo</th>
                  <th className="py-2.5 px-3 font-semibold">Frase Integral com Lacuna Preenchida</th>
                  <th className="py-2.5 px-3 font-semibold">Tradução</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TEXT_B2_EXERCISE.map((b2) => (
                  <tr key={b2.num} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono font-bold text-slate-500">{b2.num}</td>
                    <td className="py-2 px-3 font-mono font-bold text-indigo-700">{b2.verbo}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">{b2.frase}</td>
                    <td className="py-2 px-3 text-slate-600">{b2.traducao}</td>
                    <td className="py-2 px-3 text-center">
                      <AudioButton text={b2.frase} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.3 & 2.4 Grupo Nominal (C1) e 15 Frases com Adjetivos Atributivos (C2) */}
      <div id="secao-2-3-grupo-nominal" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 2.3 & 2.4 · Textos C1 e C2 (p. 48)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Die Nomengruppe & 15 Combinações Atributivas
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Declinação do grupo nominal no caso Nominativo com artigo indefinido e desinência atributiva (<em>-er, -e, -es</em>).
            </p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* C1 Nomengruppe */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              C1: Matriz Comparativa do Grupo Nominal
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-semibold">Estrutura</th>
                    <th className="py-2.5 px-3 font-semibold text-blue-800">Masculino</th>
                    <th className="py-2.5 px-3 font-semibold text-rose-800">Feminino</th>
                    <th className="py-2.5 px-3 font-semibold text-amber-800">Neutro</th>
                    <th className="py-2.5 px-3 font-semibold text-purple-800">Plural</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {NOMENGROPPE_C1.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-3 font-medium text-slate-700">{row.caso}</td>
                      <td className="py-2.5 px-3 font-mono font-medium text-blue-900">{row.masc}</td>
                      <td className="py-2.5 px-3 font-mono font-medium text-rose-900">{row.fem}</td>
                      <td className="py-2.5 px-3 font-mono font-medium text-amber-900">{row.neutro}</td>
                      <td className="py-2.5 px-3 font-mono font-medium text-purple-900">{row.plural}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* C2 15 Sentenças */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              C2: 15 Frases Resolvidas de Adjetivo Atributivo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TEXT_C2_SENTENCES.map((s) => (
                <div key={s.num} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">{s.substantivo}</span>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                      {s.desinencia}
                    </span>
                  </div>
                  <div className="font-medium text-xs sm:text-sm text-slate-900 mt-1 flex items-center justify-between">
                    <span>{s.frase}</span>
                    <AudioButton text={s.frase} lang="de-DE" size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">{s.traducao}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 a 2.8: C3 (Sommer/Winter), C4 (Possessivos), C5 (Formal/Informal), C6 (er/sie/es) */}
      <div id="secao-2-5-a-2-8-antonomos-possessivos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seções 2.5 a 2.8 · Textos C3 a C6 (p. 49–50)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Antônimos, Pronomes Possessivos, Variação Diafásica & Retomada Pronominal
          </h3>
        </div>

        <div className="p-6 space-y-8">
          {/* C3 Frau Sommer vs Herr Winter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              C3: Frau Sommer (Otimista) vs. Herr Winter (Pessimista)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-semibold">Objeto</th>
                    <th className="py-2.5 px-3 font-semibold text-emerald-800">Frau Sommer (positiv)</th>
                    <th className="py-2.5 px-3 font-semibold text-rose-800">Herr Winter (negativ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TEXT_C3_COMPARISON.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-medium text-slate-800">{c.item}</td>
                      <td className="py-2 px-3 font-mono text-emerald-700 font-medium">{c.sommer}</td>
                      <td className="py-2 px-3 font-mono text-rose-700 font-medium">{c.winter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* C4 & C5 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* C4 Possessivos */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                C4: Possessivartikel em Contexto
              </h4>
              <div className="space-y-3">
                {TEXT_C4_POSSESSIVE.map((p, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                    <div className="font-bold text-indigo-900 mb-1">{p.grupo}</div>
                    <ul className="space-y-0.5 text-slate-700 font-mono text-[11px]">
                      {p.exemplos.map((ex, j) => (
                        <li key={j}>• {ex}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* C5 Informal vs Formal */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                C5: Registro Informal (<em>dein/euer</em>) vs. Formal (<em>Ihr/Ihre</em>)
              </h4>
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="py-2 px-3 font-semibold">Informal (du / ihr)</th>
                      <th className="py-2 px-3 font-semibold">Formal (Sie)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {TEXT_C5_PAIRS.map((pair, i) => (
                      <tr key={i} className="hover:bg-slate-50/40">
                        <td className="py-1.5 px-3 font-mono text-slate-700">{pair.informell}</td>
                        <td className="py-1.5 px-3 font-mono font-semibold text-indigo-700">{pair.formell}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* C6 Retomada com er, sie, es */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              C6: Retomada Pronominal Anafórica (<em>er, sie, es</em>)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TEXT_C6_ITEMS.map((item) => (
                <div key={item.num} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs">
                  <div className="text-slate-500 mb-1">{item.substantivo}</div>
                  <div className="text-slate-800 font-medium">{item.pergunta}</div>
                  <div className="font-mono text-indigo-800 font-bold mt-1 flex items-center justify-between">
                    <span>{item.resposta}</span>
                    <AudioButton text={item.resposta} lang="de-DE" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.9 a 2.13: C7 a C11 (können e verbos de ação) */}
      <div id="secao-2-9-a-2-13-pratica-verbos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seções 2.9 a 2.13 · Textos C7 a C11 (p. 51–52)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Prática Sistemática de <em>können</em>, Conjugação Quíntupla & Regência Verbal
          </h3>
        </div>

        <div className="p-6 space-y-8">
          {/* C9 Tabela Completa de 5 Verbos */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              C9: Matriz de Conjugação Integral (5 Verbos Chave)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-semibold">Pessoa</th>
                    <th className="py-2.5 px-3 font-semibold text-indigo-800">fahren</th>
                    <th className="py-2.5 px-3 font-semibold text-teal-800">tanzen</th>
                    <th className="py-2.5 px-3 font-semibold text-rose-800">lesen</th>
                    <th className="py-2.5 px-3 font-semibold text-amber-800">wandern</th>
                    <th className="py-2.5 px-3 font-semibold text-purple-800">fotografieren</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TEXT_C9_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono font-medium text-slate-600">{row.pessoa}</td>
                      <td className="py-2 px-3 font-mono font-bold text-indigo-700">{row.fahren}</td>
                      <td className="py-2 px-3 font-mono font-bold text-teal-700">{row.tanzen}</td>
                      <td className="py-2 px-3 font-mono font-bold text-rose-700">{row.lesen}</td>
                      <td className="py-2 px-3 font-mono font-bold text-amber-700">{row.wandern}</td>
                      <td className="py-2 px-3 font-mono font-bold text-purple-700">{row.fotografieren}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* C7 & C10 Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* C7 können + natürlich */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                C7: Perguntas de Habilidade e Resposta com <em>Natürlich...</em>
              </h4>
              <div className="space-y-2 text-xs">
                {TEXT_C7_PAIRS.map((c7, i) => (
                  <div key={i} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-slate-800 font-medium">{c7.pergunta}</div>
                      <div className="text-indigo-700 font-semibold font-mono">{c7.resposta}</div>
                    </div>
                    <AudioButton text={`${c7.pergunta} — ${c7.resposta}`} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* C10 Diálogos com verbos */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                C10: Minidiálogos & Integração Verbal
              </h4>
              <div className="space-y-2 text-xs">
                {TEXT_C10_ITEMS.map((c10, i) => (
                  <div key={i} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-slate-700">{c10.pergunta}</div>
                      <div className="text-slate-900 font-semibold font-mono">{c10.resposta}</div>
                    </div>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
                      {c10.verbos}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.14 a 2.17: C12 (Impossibilidades), C13 (nicht/kein), C14 (Preposições), C15 (Fragewörter) */}
      <div id="secao-2-14-a-2-17-precisao-gramatical" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seções 2.14 a 2.17 · Textos C12 a C15 (p. 52–53)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Limites Semânticos, Regência Preposicional & Negação Pontual
          </h3>
        </div>

        <div className="p-6 space-y-8">
          {/* C12 Limites Semânticos */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              C12: O que não se pode fazer? (Impossibilidades Semânticas)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TEXT_C12_ITEMS.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-rose-200 bg-rose-50/30 text-xs flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-rose-900 font-mono">{item.frase}</span>
                    <p className="text-slate-600 text-[11px] mt-1">{item.explicacao}</p>
                  </div>
                  <div className="mt-2 text-right">
                    <AudioButton text={item.frase} lang="de-DE" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C13 Negação nicht vs kein */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              C13: Preenchimento de <em>nicht</em> vs. <em>kein/keine</em>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TEXT_C13_ITEMS.map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 text-xs">
                  <div className="font-semibold text-slate-900 flex justify-between items-center">
                    <span>{item.frase}</span>
                    <AudioButton text={item.frase} lang="de-DE" size="sm" />
                  </div>
                  <div className="text-indigo-700 font-mono font-bold text-[11px] mt-1">
                    Gabarito: {item.resposta} ({item.justificativa})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C14 & C15 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* C14 Preposições */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                C14: Preposições Locais em Contexto Real
              </h4>
              <div className="space-y-2 text-xs">
                {TEXT_C14_ITEMS.map((c14, i) => (
                  <div key={i} className="p-2 bg-white rounded border border-slate-200 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-slate-900">{c14.frase}</div>
                      <div className="text-slate-500 text-[11px]">{c14.traducao}</div>
                    </div>
                    <span className="font-mono text-teal-700 font-bold px-1.5 py-0.5 bg-teal-50 rounded border border-teal-200">
                      {c14.prep}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* C15 Fragewörter */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                C15: Pronomes Interrogativos (<em>wie, was, wo, woher, welche</em>)
              </h4>
              <div className="space-y-2 text-xs">
                {TEXT_C15_ITEMS.map((c15, i) => (
                  <div key={i} className="p-2 bg-white rounded border border-slate-200 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-slate-900">{c15.frase}</div>
                      <div className="text-slate-500 text-[11px]">{c15.traducao}</div>
                    </div>
                    <span className="font-mono text-indigo-700 font-bold px-1.5 py-0.5 bg-indigo-50 rounded border border-indigo-200">
                      {c15.interrogativo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.18 Texto D1 — Wichtige Redemittel */}
      <div id="secao-2-18-redemittel" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.18 · Texto D1 (p. 54)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Wichtige Redemittel — Repertório Prático por Esferas Comunicativas
            </h3>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Comunicação Cotidiana */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
              Alltagskommunikation (Comunicação Cotidiana)
            </h4>
            {REDEMITTEL_D1.alltagskommunikation.map((r, i) => (
              <div key={i} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{r.de}</div>
                  <div className="text-slate-500 text-[11px]">{r.pt}</div>
                </div>
                <AudioButton text={r.de} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>

          {/* No Local de Trabalho */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
              Am Arbeitsplatz (No Ambiente Corporativo)
            </h4>
            {REDEMITTEL_D1.arbeitsplatz.map((r, i) => (
              <div key={i} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{r.de}</div>
                  <div className="text-slate-500 text-[11px]">{r.pt}</div>
                </div>
                <AudioButton text={r.de} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>

          {/* Departamentos */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
              Abteilungen (Departamentos Institucionais)
            </h4>
            {REDEMITTEL_D1.abteilungen.map((r, i) => (
              <div key={i} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{r.de}</div>
                  <div className="text-slate-500 text-[11px]">{r.pt}</div>
                </div>
                <AudioButton text={r.de} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>

          {/* Tempo Livre */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
              Freizeit (Tempo Livre & Hobbies)
            </h4>
            {REDEMITTEL_D1.freizeit.map((r, i) => (
              <div key={i} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{r.de}</div>
                  <div className="text-slate-500 text-[11px]">{r.pt}</div>
                </div>
                <AudioButton text={r.de} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.19 Texto D2 — Kleines Wörterbuch der Verben */}
      <div id="secao-2-19-dicionario-verbos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 2.19 · Texto D2 (p. 55)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Kleines Wörterbuch der Verben (Dicionário de 23 Verbos Canônicos)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Matriz de verbos essenciais para a comunicação básica com suas colocações oracionais autênticas.
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VERB_DICTIONARY_D2.map((v, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between text-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-indigo-950 font-mono">{v.infinitivo}</span>
                  <AudioButton text={`${v.infinitivo}. ${v.exemplo}`} lang="de-DE" size="sm" />
                </div>
                <div className="text-teal-700 font-medium mt-0.5">{v.traducao}</div>
                <div className="text-[11px] text-slate-500 font-mono mt-1 bg-white p-1.5 rounded border border-slate-200">
                  {v.conjugacao}
                </div>
              </div>
              <div className="mt-2 text-slate-700 font-medium text-[11px] border-t border-slate-200 pt-1.5">
                Ex.: <em>{v.exemplo}</em>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.20 Texto D3 — Evaluation */}
      <div id="secao-2-20-evaluation" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 2.20 · Texto D3 (p. 56)
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Evaluation — Matriz Interativa de Autoavaliação de Competências
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Avalie o seu domínio prático dos objetivos canônicos do Capítulo 2.
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-semibold">Competência Prática Canônica</th>
                  <th className="py-2.5 px-3 font-semibold text-center w-28">gut (bem)</th>
                  <th className="py-2.5 px-3 font-semibold text-center w-28">nicht so gut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {EVALUATION_D3.map((ev, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40">
                    <td className="py-3 px-3 font-medium text-slate-800">
                      <div>{ev.item}</div>
                      <div className="text-slate-500 text-xs font-normal mt-0.5">{ev.traducao}</div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleEval(idx, 'gut')}
                        className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                          evalAnswers[idx] === 'gut'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        ✓ Gut
                      </button>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleEval(idx, 'nicht')}
                        className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                          evalAnswers[idx] === 'nicht'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Revisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.21 Tabela Lexical Primária */}
      <div id="secao-2-21-tabela-lexical" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.21
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tabela Lexical Primária — 25 Termos Minados da Rodada
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Vocabulário completo de lazer, dias da semana, departamentos e ações centrais.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar termo ou tradução..."
              value={lexiconSearch}
              onChange={(e) => setLexiconSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-semibold">Palavra Alemã</th>
                  <th className="py-2.5 px-3 font-semibold">Classe & Plural</th>
                  <th className="py-2.5 px-3 font-semibold">Tradução Exata</th>
                  <th className="py-2.5 px-3 font-semibold">Frase Modelo Extraída</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLexicon.map((term, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-bold font-mono text-indigo-900">{term.palavraAlema}</td>
                    <td className="py-2 px-3 text-slate-500 font-mono text-xs">
                      {term.classeGramatical} {term.plural && <span className="text-slate-400 font-normal">{term.plural}</span>}
                    </td>
                    <td className="py-2 px-3 font-medium text-slate-800">{term.traducao}</td>
                    <td className="py-2 px-3 text-slate-600 font-mono text-xs">{term.fraseModelo}</td>
                    <td className="py-2 px-3 text-center">
                      <AudioButton text={`${term.palavraAlema}. ${term.fraseModelo}`} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.22 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="secao-2-22-coloquial" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.22
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Registro Coloquial e Autêntico (<em>Umgangssprache</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Expressões autênticas de alta frequência no cotidiano juvenil e corporativo informal alemão.
            </p>
          </div>
          <AudioButton
            text="Na? Was geht? Alles klar? Läuft bei dir? Kein Stress! Passt schon! Echt? Krass! Bock haben. Mach's gut! Bis dann! Bis später!"
            lang="de-DE"
            label="Ouvir Gírias e Expressões"
          />
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COLLOQUIAL_LESSON_5.map((c, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-100/50 transition-colors flex flex-col justify-between text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-950 font-mono">{c.expressao}</span>
                <AudioButton text={c.expressao} lang="de-DE" size="sm" />
              </div>
              <div className="text-slate-800 font-medium mt-1">{c.traducao}</div>
              <div className="text-[11px] text-slate-500 mt-1">{c.contexto}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
