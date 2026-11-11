import React, { useState } from 'react';
import {
  TEXT_A1_PARAGRAPHS,
  CLOCK_TIMES,
  DIALOGUE_PAULA_MAX,
  VOCABULARIO_AULA_11,
  UMGANGSSPRACHE_AULA_11,
} from '../../data/semana2Lesson11Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  CheckCircle,
  Clock,
  MessageSquare,
  Search,
  Sparkles,
  Calendar,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const Bloco2TextsLexiconW2L11: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [colloquialSearch, setColloquialSearch] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('a1');

  const filteredVocab = VOCABULARIO_AULA_11.filter(
    (item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.modelSentence.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredColloquial = UMGANGSSPRACHE_AULA_11.filter(
    (item) =>
      item.expression.toLowerCase().includes(colloquialSearch.toLowerCase()) ||
      item.translation.toLowerCase().includes(colloquialSearch.toLowerCase()) ||
      item.context.toLowerCase().includes(colloquialSearch.toLowerCase())
  );

  const toggleSection = (sec: string) => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  return (
    <section id="bloco2-semana2-aula11" className="space-y-12">
      {/* Banner de Introdução do Bloco 2 */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Bloco 2 (60 Minutos) — Transcrição Integral, Tradução & Mineração Lexical
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            A Rotina de Martin & Paula, Leitura de Relógio e Mineração Corporativa
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Mergulhe na rotina diária corporativa (<span className="font-mono text-amber-300">Tagesablauf</span>),
            na expressão do tempo e horários falados (<span className="font-mono text-sky-300">halb drei, Viertel nach fünf</span>),
            nos diálogos no <span className="font-mono text-emerald-300">Perfekt</span> e no acervo de 29 termos fundamentais e 20 fórmulas coloquiais de escritório.
          </p>
        </div>
      </div>

      {/* 2.1 Texto A1: Was macht Martin? */}
      <div id="sec-2-1" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Seção 2.1 · Texto A1 (p. 110)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Was macht Martin? (O que Martin faz?)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              A rotina cronológica de Martin com verbos separáveis destacados (<span className="text-indigo-600 font-bold">steht auf, fängt an, ruft an, kauft ein, sieht fern</span>).
            </p>
          </div>
          <AudioButton
            text={TEXT_A1_PARAGRAPHS.map((p) => p.de).join(' ')}
            label="Ouvir Texto Completo"
            size="md"
          />
        </div>

        {/* Parágrafos com Tradução Justaposta */}
        <div className="space-y-3">
          {TEXT_A1_PARAGRAPHS.map((para, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-sky-300 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-sm font-semibold text-slate-900 leading-relaxed">
                  {para.de}
                </p>
                <AudioButton text={para.de} size="sm" />
              </div>
              <p className="text-xs text-slate-600 italic border-t border-slate-100 pt-2">
                {para.pt}
              </p>
            </div>
          ))}
        </div>

        {/* Análise Gramatical das Ações de Martin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
              Verbos Separáveis Identificados em A1
            </h4>
            <ul className="text-xs text-indigo-950 space-y-1 font-mono">
              <li>• aufstehen → <strong className="text-indigo-700">steht ... auf</strong></li>
              <li>• anfangen → <strong className="text-indigo-700">fängt ... an</strong> (a → ä)</li>
              <li>• anrufen → <strong className="text-indigo-700">ruft ... an</strong> (+ Acusativo)</li>
              <li>• einkaufen → <strong className="text-indigo-700">kauft ... ein</strong></li>
              <li>• fernsehen → <strong className="text-indigo-700">sieht ... fern</strong></li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Verbos Inseparáveis Identificados em A1
            </h4>
            <ul className="text-xs text-emerald-950 space-y-1 font-mono">
              <li>• vereinbaren → <strong className="text-emerald-700">vereinbart</strong> (ver- nunca se separa)</li>
              <li>• präsentieren → <strong className="text-emerald-700">präsentiert</strong> (verbo em -ieren)</li>
              <li>• übersetzen → <strong className="text-emerald-700">übersetzt</strong> (aqui inseparável)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2.4 Texto A5: Wie spät ist es? (Horários) */}
      <div id="sec-2-4" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Seção 2.4 · Texto A5 (p. 112)
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100">
              Uhrzeiten im Deutschen
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Wie spät ist es? (Que horas são?) — O Sistema Oficial vs. Coloquial
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            No alemão coloquial, <strong className="text-amber-800">halb</strong> olha sempre para a hora seguinte
            (<span className="font-mono text-slate-900">halb drei = duas e meia</span>, ou seja, meia hora antes das três).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLOCK_TIMES.map((clock, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {clock.digital}
                </span>
                <AudioButton text={`${clock.colloquial}. ${clock.formal}`} size="sm" />
              </div>
              <div className="text-xs font-bold text-amber-900 font-mono bg-amber-50/60 p-2 rounded border border-amber-100">
                Coloquial: {clock.colloquial}
              </div>
              <div className="text-xs text-slate-600 font-mono">
                Oficial: {clock.formal}
              </div>
              <p className="text-[11px] text-slate-500 italic pt-1">
                {clock.pt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2.11 e 2.12 Texto A13 e A14: Paula e Max Schneider (Perfekt) */}
      <div id="sec-2-12" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Seções 2.11–2.12 · Textos A13–A14 (p. 115–116)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Was hat Paula gemacht? (O que Paula fez?)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Diálogo autêntico entre Paula e Max com narrativas no pretérito perfeito (<span className="font-mono text-purple-700">Perfekt</span>).
            </p>
          </div>
          <AudioButton
            text={DIALOGUE_PAULA_MAX.map((l) => `${l.speaker}: ${l.de}`).join(' ')}
            label="Ouvir Diálogo Completo"
            size="md"
          />
        </div>

        {/* Diálogo */}
        <div className="space-y-3">
          {DIALOGUE_PAULA_MAX.map((line, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                line.speaker === 'Paula Schneider'
                  ? 'bg-purple-50/40 border-purple-200'
                  : 'bg-slate-50 border-slate-200'
              } space-y-1.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  {line.speaker}
                </span>
                <AudioButton text={line.de} size="sm" />
              </div>
              <p className="text-sm font-mono font-semibold text-slate-900">
                {line.de}
              </p>
              <p className="text-xs text-slate-600 italic">
                {line.pt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2.14 Texto A17: Martin im Perfekt */}
      <div id="sec-2-14" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Seção 2.14 · Texto A17 (p. 118)
          </span>
          <AudioButton
            text="Um 8.00 Uhr ist Martin aufgestanden. Um 8.30 Uhr hat er Frühstück gegessen. Um 9.00 Uhr ist er zur Arbeit gefahren. Die Arbeit hat um 9.30 Uhr angefangen. Martin hat viele E-Mails geschrieben und gelesen. Um 10.30 Uhr hat er Frau Körner angerufen und einen Termin vereinbart. Danach hat er ein Projekt präsentiert. Von 13.00 bis 13.30 Uhr hat Martin Mittagspause gemacht. Er ist in die Kantine gegangen. Um 17.00 Uhr hatte Martin Feierabend. Er ist in die Stadt gefahren und hat im Supermarkt eingekauft. Ab 19.00 Uhr hat er ferngesehen."
            label="Ouvir Rotina no Perfekt"
            size="sm"
          />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          Transformação Textual: A Rotina de Martin Reescrita no Perfekt
        </h3>
        <p className="text-xs text-slate-600">
          Observe a distribuição dos auxiliares <strong className="text-amber-700">ist</strong> (aufgestanden, gefahren, gegangen)
          vs. <strong className="text-indigo-700">hat</strong> (gegessen, angefangen, geschrieben, angerufen, vereinbart, eingekauft, ferngesehen).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1 font-mono text-amber-950">
            <p className="font-bold text-amber-800">Verbos com SEIN:</p>
            <p>• Um 8.00 Uhr <strong>ist</strong> Martin <strong>aufgestanden</strong>.</p>
            <p>• Um 9.00 Uhr <strong>ist</strong> Martin zur Arbeit <strong>gefahren</strong>.</p>
            <p>• Er <strong>ist</strong> in die Kantine <strong>gegangen</strong>.</p>
            <p>• Er <strong>ist</strong> in die Stadt <strong>gefahren</strong>.</p>
            <p>• Um 22.30 Uhr <strong>ist</strong> er ins Bett <strong>gegangen</strong>.</p>
          </div>

          <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-1 font-mono text-indigo-950">
            <p className="font-bold text-indigo-800">Verbos com HABEN:</p>
            <p>• Um 8.30 Uhr <strong>hat</strong> er Frühstück <strong>gegessen</strong>.</p>
            <p>• Die Arbeit <strong>hat</strong> um 9.30 Uhr <strong>angefangen</strong>.</p>
            <p>• Martin <strong>hat</strong> viele E-Mails <strong>geschrieben</strong>.</p>
            <p>• Er <strong>hat</strong> Frau Körner <strong>angerufen</strong>.</p>
            <p>• Er <strong>hat</strong> im Supermarkt <strong>eingekauft</strong>.</p>
            <p>• Ab 19.00 Uhr <strong>hat</strong> er <strong>ferngesehen</strong>.</p>
          </div>
        </div>
      </div>

      {/* 2.17 Tabela Lexical Primária (29 Termos) */}
      <div id="sec-2-17" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Seção 2.17
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Tabela Lexical Primária da Aula 11 (29 Termos Corporativos e de Rotina)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Com artigo definido, classe gramatical, plural exato, tradução e frase modelo audível.
            </p>
          </div>

          {/* Busca */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar termo ou tradução..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Tabela de Vocabulário */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3">Termo Alemão</th>
                <th className="p-3">Classe & Plural</th>
                <th className="p-3">Tradução Exata</th>
                <th className="p-3">Frase Modelo</th>
                <th className="p-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredVocab.map((term, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900 font-mono">{term.word}</td>
                  <td className="p-3 text-slate-500">
                    <span className="font-semibold text-slate-700">{term.articleClass}</span>
                    <span className="block text-[11px] text-slate-400 font-mono">{term.plural}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-700">{term.translation}</td>
                  <td className="p-3 font-mono text-slate-600 text-[11px]">{term.modelSentence}</td>
                  <td className="p-3 text-center">
                    <AudioButton text={`${term.word}. ${term.modelSentence}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.18 Umgangssprache (20 Expressões) */}
      <div id="sec-2-18" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Seção 2.18
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Registro Coloquial e Autêntico (Umgangssprache — 20 Expressões)
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Expressões idiomáticas do cotidiano corporativo, pressa, agenda e despedidas.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={colloquialSearch}
              onChange={(e) => setColloquialSearch(e.target.value)}
              placeholder="Buscar expressão..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredColloquial.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-rose-300 transition-all space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-900">
                  {item.context}
                </span>
                <AudioButton text={item.expression} size="sm" />
              </div>
              <p className="font-mono text-xs font-bold text-slate-900">
                {item.expression}
              </p>
              <p className="text-xs text-slate-600">
                {item.translation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
