import React, { useState } from 'react';
import {
  EVERYDAY_PHRASES_50,
  PRIMARY_LEXICAL_TABLE_7,
  COLLOQUIAL_EXPRESSIONS_7,
  QUESTIONS_20,
  ANSWERS_20,
} from '../data/lesson07Data';
import { AudioButton } from './AudioButton';
import {
  BookOpen,
  Search,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  Sparkles,
  Volume2,
  AlertTriangle,
} from 'lucide-react';

export const Bloco2TextsLexicon07: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activePhraseCategory, setActivePhraseCategory] = useState<string>('all');

  const filteredLexicon = PRIMARY_LEXICAL_TABLE_7.filter(
    (item) =>
      item.termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.traducao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const phraseCategories = [
    'all',
    'Saudação e Apresentação',
    'Cortesia e Educação',
    'Opinião e Reação',
    'Despedida',
  ];

  const filteredPhrases = EVERYDAY_PHRASES_50.filter((p) => {
    if (activePhraseCategory === 'all') return true;
    return p.categoria === activePhraseCategory;
  });

  return (
    <section id="bloco-2-textos-lexico-rodada7" className="space-y-12">
      {/* Banner da Seção */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-400 text-slate-950 font-mono">
            Bloco 2 (60 Minutos) · Rodada Extra 7
          </span>
          <span className="text-xs text-emerald-200 font-medium">Dia 006.5 · Kapitel 0: Sobrevivência Linguística</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transcrição Integral, Tradução & Mineração Lexical
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          As 50 frases de ouro do cotidiano germânico, a Tabela Lexical Primária com busca instantânea, 29 expressões autênticas da <em>Umgangssprache</em>
          e a matriz com as 20 perguntas e 20 respostas essenciais com áudios interativos.
        </p>
      </div>

      {/* 2.1 As 50 Frases Mais Usadas em Conversas Cotidianas */}
      <div id="secao-2-1-50-frases" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 2.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As 50 Frases Mais Usadas em Conversas Cotidianas
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Organizadas por categorias pragmáticas com reprodução em áudio alemão e contextualização de registro.
            </p>
          </div>

          {/* Filtro de Categorias */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {phraseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePhraseCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activePhraseCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat === 'all' ? 'Todas (50)' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-mono text-slate-900">{phrase.alemao}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        phrase.contexto === 'Formal'
                          ? 'bg-slate-200 text-slate-800'
                          : phrase.contexto === 'Informal'
                          ? 'bg-amber-100 text-amber-900'
                          : phrase.contexto === 'Enfático'
                          ? 'bg-rose-100 text-rose-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {phrase.contexto}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-sans">{phrase.traducao}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{phrase.categoria}</div>
                </div>
                <AudioButton text={phrase.alemao} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.2 Tabela Lexical Primária (42 Termos) */}
      <div id="secao-2-2-tabela-lexical" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 2.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tabela Lexical Primária de Sobrevivência (42 Termos Canônicos)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Palavras com classe gramatical, tradução exata, frase modelo ilustrativa e áudio correspondente.
            </p>
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar termo ou tradução..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                  <th className="p-3">Palavra Alemã</th>
                  <th className="p-3">Classe Gramatical</th>
                  <th className="p-3">Tradução Exata</th>
                  <th className="p-3">Frase Modelo</th>
                  <th className="p-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 font-mono text-xs">
                {filteredLexicon.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-emerald-950 text-sm">{item.termo}</td>
                    <td className="p-3 text-slate-500 font-sans text-xs">{item.classe}</td>
                    <td className="p-3 text-slate-900 font-semibold font-sans">{item.traducao}</td>
                    <td className="p-3 text-slate-700 bg-slate-50/50">{item.fraseModelo}</td>
                    <td className="p-3 text-center font-sans">
                      <AudioButton text={item.fraseModelo} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-right text-xs text-slate-400">
            Exibindo {filteredLexicon.length} de {PRIMARY_LEXICAL_TABLE_7.length} termos catalogados.
          </div>
        </div>
      </div>

      {/* 2.3 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="secao-2-3-coloquial" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Seção 2.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Registro Coloquial e Autêntico (<em>Umgangssprache</em>) — 29 Expressões Reais
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Expressões ouvidas nas ruas, cafeterias, estações de trem e ambientes de trabalho em toda a Alemanha.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {COLLOQUIAL_EXPRESSIONS_7.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 text-sm">{item.expressao}</span>
                  <AudioButton text={item.expressao} size="sm" />
                </div>
                <div className="text-xs text-amber-950 font-semibold">{item.traducao}</div>
                <div className="text-[11px] text-slate-500 italic bg-white p-1.5 rounded border border-slate-200/60">
                  {item.contexto}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.4 & 2.5 Matriz de 20 Perguntas e 20 Respostas Mais Usadas */}
      <div id="secao-2-4-perguntas-respostas" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-900 shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 2.4 & 2.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Matriz das 20 Perguntas & 20 Respostas Mais Frequentes no Cotidiano
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Perguntas instantâneas e respostas automáticas para destravar interações em qualquer situação de sobrevivência.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 20 Perguntas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-2 border-b border-indigo-200 pb-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              As 20 Perguntas Mais Usadas
            </h4>
            <div className="divide-y divide-slate-100 max-h-[550px] overflow-y-auto pr-1">
              {QUESTIONS_20.map((q) => (
                <div key={q.num} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {q.num}
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{q.pergunta}</span>
                      <span className="text-[10px] text-slate-400">({q.contexto})</span>
                    </div>
                    <div className="text-slate-600 pl-7 text-[11px]">{q.traducao}</div>
                  </div>
                  <AudioButton text={q.pergunta} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* 20 Respostas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2 border-b border-emerald-200 pb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              As 20 Respostas Mais Usadas
            </h4>
            <div className="divide-y divide-slate-100 max-h-[550px] overflow-y-auto pr-1">
              {ANSWERS_20.map((a) => (
                <div key={a.num} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {a.num}
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{a.resposta}</span>
                      <span className="text-[10px] text-slate-400">({a.contexto})</span>
                    </div>
                    <div className="text-slate-600 pl-7 text-[11px]">{a.traducao}</div>
                  </div>
                  <AudioButton text={a.resposta} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
