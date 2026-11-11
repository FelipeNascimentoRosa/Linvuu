import React, { useState } from 'react';
import {
  DIALOGUES_LESSON_09,
  LEXICAL_TABLE_30,
  COLLOQUIAL_EXPRESSIONS_28,
  LESSON_09_METADATA,
} from '../data/lesson09Data';
import { AudioButton } from './AudioButton';
import {
  MessageSquare,
  Search,
  BookOpen,
  Sparkles,
  Volume2,
  Filter,
  Layers,
  CheckCircle2,
  BookmarkCheck,
} from 'lucide-react';
import { speechEngine } from '../utils/speech';

export const Bloco2TextsLexicon09: React.FC = () => {
  const [activeDialogueId, setActiveDialogueId] = useState<string>(DIALOGUES_LESSON_09[0].id);
  const [isPlayingDialogue, setIsPlayingDialogue] = useState(false);
  const [lexicalSearch, setLexicalSearch] = useState('');
  const [lexicalFilter, setLexicalFilter] = useState<string>('all');
  const [colloquialSearch, setColloquialSearch] = useState('');

  const currentDialogue =
    DIALOGUES_LESSON_09.find((d) => d.id === activeDialogueId) ||
    DIALOGUES_LESSON_09[0];

  const handlePlayFullDialogue = async () => {
    if (isPlayingDialogue) {
      speechEngine.stop();
      setIsPlayingDialogue(false);
      return;
    }

    setIsPlayingDialogue(true);
    for (const line of currentDialogue.lines) {
      if (!speechEngine) break;
      await speechEngine.speakAsync(line.de, 'de-DE', 0.95);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    setIsPlayingDialogue(false);
  };

  const filteredLexical = LEXICAL_TABLE_30.filter((item) => {
    const matchesSearch =
      item.palavraAlema.toLowerCase().includes(lexicalSearch.toLowerCase()) ||
      item.traducao.toLowerCase().includes(lexicalSearch.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(lexicalSearch.toLowerCase());

    const matchesFilter =
      lexicalFilter === 'all' ||
      (lexicalFilter === 'verbos' && item.classeGramatical.toLowerCase().includes('verbo')) ||
      (lexicalFilter === 'substantivos' && item.classeGramatical.toLowerCase().includes('substantivo'));

    return matchesSearch && matchesFilter;
  });

  const filteredColloquial = COLLOQUIAL_EXPRESSIONS_28.filter((item) => {
    return (
      item.expressaoAlema.toLowerCase().includes(colloquialSearch.toLowerCase()) ||
      item.traducao.toLowerCase().includes(colloquialSearch.toLowerCase()) ||
      item.contexto.toLowerCase().includes(colloquialSearch.toLowerCase())
    );
  });

  return (
    <section id="bloco-2-textos-lexico-rodada9" className="space-y-12">
      {/* Banner Bloco 2 */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-400 text-slate-950 font-mono">
            Bloco 2 (60 Minutos) · Rodada Extra 09
          </span>
          <span className="text-xs text-emerald-200 font-medium">Transcrição, Tradução & Mineração Lexical</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Diálogos do Cotidiano & Tabela Lexical Primária
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 font-normal leading-relaxed">
          Vivencie os 18 verbos especiais em 5 situações reais: na cozinha, no escritório, no restaurante, no esporte e na saúde. Acompanhe a Tabela Lexical Primária de 30 termos com áudio e 28 expressões autênticas da <em>Umgangssprache</em>.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2.1 DIÁLOGOS DO DIA A DIA COM ESSES VERBOS                                */}
      {/* ========================================================================= */}
      <div id="secao-2-1-dialogos" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">
              Seção 2.1 · Imersão Comunicativa
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              5 Diálogos do Dia a Dia com Verbos de Mudança Vocálica e Irregulares
            </h3>
          </div>
        </div>

        {/* Tabs dos 5 Diálogos */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {DIALOGUES_LESSON_09.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                speechEngine.stop();
                setIsPlayingDialogue(false);
                setActiveDialogueId(d.id);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeDialogueId === d.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {d.title.split(':')[0]} <span className="hidden sm:inline">· {d.title.split(':')[1]?.trim()}</span>
            </button>
          ))}
        </div>

        {/* Cabeçalho do Diálogo Selecionado */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">{currentDialogue.title}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{currentDialogue.context}</p>
          </div>
          <button
            onClick={handlePlayFullDialogue}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors shrink-0 ${
              isPlayingDialogue
                ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingDialogue ? 'Parar Diálogo Completo' : 'Ouvir Diálogo Completo'}</span>
          </button>
        </div>

        {/* Linhas do Diálogo */}
        <div className="space-y-3">
          {currentDialogue.lines.map((line, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {line.speaker}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 font-mono">
                    {line.de}
                  </p>
                  <p className="text-xs text-slate-600">
                    {line.pt}
                  </p>
                  {line.targetVerb && (
                    <span className="inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 mt-1">
                      Verbo em foco: {line.targetVerb}
                    </span>
                  )}
                </div>
              </div>
              <AudioButton text={line.de} lang="de-DE" size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2.2 TABELA LEXICAL PRIMÁRIA (30 TERMOS)                                   */}
      {/* ========================================================================= */}
      <div id="secao-2-2-tabela-lexical" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
              Seção 2.2 · Mineração Lexical
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Tabela Lexical Primária (30 Termos Fundamentais)
            </h3>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar palavra, tradução ou frase..."
              value={lexicalSearch}
              onChange={(e) => setLexicalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 text-xs self-start sm:self-auto">
            <button
              onClick={() => setLexicalFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                lexicalFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos (30)
            </button>
            <button
              onClick={() => setLexicalFilter('verbos')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                lexicalFilter === 'verbos' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Verbos (18)
            </button>
            <button
              onClick={() => setLexicalFilter('substantivos')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                lexicalFilter === 'substantivos' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Substantivos (12)
            </button>
          </div>
        </div>

        {/* Tabela Lexical */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-xs">
                <th className="p-3 border-r border-slate-800">Termo Alemão</th>
                <th className="p-3 border-r border-slate-800">Classe Gramatical</th>
                <th className="p-3 border-r border-slate-800">Tradução</th>
                <th className="p-3 border-r border-slate-800">Frase Modelo</th>
                <th className="p-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLexical.map((term, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold font-mono text-slate-900 border-r border-slate-200">
                    {term.palavraAlema}
                  </td>
                  <td className="p-3 text-slate-600 border-r border-slate-200 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">
                      {term.classeGramatical}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-slate-800 border-r border-slate-200">
                    {term.traducao}
                  </td>
                  <td className="p-3 font-mono text-slate-900 border-r border-slate-200 text-xs sm:text-sm">
                    {term.fraseModelo}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <AudioButton text={term.palavraAlema} lang="de-DE" size="sm" />
                      <AudioButton text={term.fraseModelo} lang="de-DE" size="sm" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2.3 REGISTRO COLOQUIAL E AUTÊNTICO (Umgangssprache)                       */}
      {/* ========================================================================= */}
      <div id="secao-2-3-umgangssprache" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider font-mono">
              Seção 2.3 · Fala Real Germânica
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Registro Coloquial e Autêntico (28 Expressões da Umgangssprache)
            </h3>
          </div>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filtrar expressões coloquiais..."
            value={colloquialSearch}
            onChange={(e) => setColloquialSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredColloquial.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex flex-col justify-between space-y-2 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                    {item.contexto}
                  </span>
                  <AudioButton text={item.expressaoAlema} lang="de-DE" size="sm" />
                </div>
                <p className="text-sm font-bold text-slate-900 font-mono mt-2">{item.expressaoAlema}</p>
              </div>
              <p className="text-xs text-slate-600 border-t border-slate-200/60 pt-2 font-medium">
                {item.traducao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
