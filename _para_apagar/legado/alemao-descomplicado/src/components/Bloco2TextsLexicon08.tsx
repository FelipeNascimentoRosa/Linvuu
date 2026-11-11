import React, { useState } from 'react';
import {
  TABELA_RESUMO_COMPLETA,
  QUATRO_REGRAS_PRATICAS,
  DIALOGOS_PREPOSICOES,
  MatrixRow,
} from '../data/lesson08Data';
import { AudioButton } from './AudioButton';
import {
  Table,
  Search,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowUpDown,
  Filter,
  Volume2,
} from 'lucide-react';
import { speechEngine } from '../utils/speech';

export const Bloco2TextsLexicon08: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  const filteredRows = TABELA_RESUMO_COMPLETA.filter((row) => {
    const matchesSearch =
      row.preposicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.significado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.exemploDe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.exemploPt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || row.categoria === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handlePlayAllExamples = async () => {
    if (isPlayingAll) {
      speechEngine.stop();
      setIsPlayingAll(false);
      return;
    }

    setIsPlayingAll(true);
    for (const row of filteredRows) {
      if (!speechEngine) break;
      await speechEngine.speakAsync(row.exemploDe, 'de-DE', 0.95);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
    setIsPlayingAll(false);
  };

  return (
    <section id="bloco-2-textos-lexico-rodada8" className="space-y-12">
      {/* Banner Bloco 2 */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-400 text-slate-950 font-mono">
            Bloco 2 (60 Minutos) · Rodada Extra 08
          </span>
          <span className="text-xs text-sky-200 font-medium">Matriz Completa & Diálogos Vivos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Tabela Resumo Panorâmica, Regras de Ouro e Diálogos Vivos
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 font-normal leading-relaxed">
          Consulte rapidamente todas as 16 preposições e contrações com filtros dinâmicos, domine a árvore de decisão prática de 4 passos e estude conversações autênticas no aeroporto, consultório e centro urbano.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* PARTE III — TABELA RESUMO COMPLETA                                         */}
      {/* ========================================================================= */}
      <div id="secao-2-1-tabela-resumo" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider font-mono">
                Parte III · Referência Imediata
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Tabela Resumo Completa das 16 Preposições & Contrações
              </h3>
            </div>
          </div>

          <button
            onClick={handlePlayAllExamples}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isPlayingAll
                ? 'bg-rose-600 text-white'
                : 'bg-slate-900 text-amber-400 hover:bg-slate-800'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            {isPlayingAll ? 'Parar Áudio Contínuo' : 'Ouvir Exemplos Filtrados'}
          </button>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por preposição, significado ou exemplo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas (19)
            </button>
            <button
              onClick={() => setSelectedCategory('in-im-ins')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'in-im-ins'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              in / im / ins
            </button>
            <button
              onClick={() => setSelectedCategory('aus-von-vom')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'aus-von-vom'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              aus / von / vom
            </button>
            <button
              onClick={() => setSelectedCategory('zu-zum-zur')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'zu-zum-zur'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              zu / zum / zur
            </button>
            <button
              onClick={() => setSelectedCategory('an-am-ans')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'an-am-ans'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              an / am / ans
            </button>
            <button
              onClick={() => setSelectedCategory('auf-aufs')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'auf-aufs'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              auf / aufs
            </button>
            <button
              onClick={() => setSelectedCategory('bei-beim')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'bei-beim'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              bei / beim
            </button>
            <button
              onClick={() => setSelectedCategory('nach')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'nach'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              nach
            </button>
          </div>
        </div>

        {/* Tabela Interativa */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <th className="p-3">Preposição / Forma</th>
                <th className="p-3">Caso Requerido</th>
                <th className="p-3">Significado Funcional</th>
                <th className="p-3">Exemplo Canônico</th>
                <th className="p-3">Tradução</th>
                <th className="p-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-700 text-sm">
                    {row.preposicao}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                        row.caso.includes('Wo?')
                          ? 'bg-amber-100 text-amber-900'
                          : row.caso.includes('Wohin?')
                          ? 'bg-sky-100 text-sky-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {row.caso}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{row.significado}</td>
                  <td className="p-3 font-semibold text-slate-900 font-mono">{row.exemploDe}</td>
                  <td className="p-3 text-slate-600">{row.exemploPt}</td>
                  <td className="p-3 text-center">
                    <AudioButton text={row.exemploDe} lang="de-DE" size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PARTE IV — AS 4 REGRAS PRÁTICAS PARA NÃO ERRAR NUNCA MAIS                 */}
      {/* ========================================================================= */}
      <div id="secao-2-2-regras-praticas" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
              Parte IV · Método de Blindagem
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              As 4 Regras Práticas para Não Errar Nunca Mais
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Sempre que você for montar uma frase com preposição local em alemão, siga este algoritmo mental de 4 passos na ordem exata. O resultado é sempre infalível:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUATRO_REGRAS_PRATICAS.map((regra, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 hover:bg-white hover:shadow-xs transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-900 text-amber-400 font-mono">
                  {regra.passo}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{regra.titulo}</h4>
              </div>

              <p className="text-xs text-slate-600">{regra.descricao}</p>

              {/* Detalhes de cada regra */}
              <div className="space-y-1.5 text-xs bg-white rounded-lg p-3 border border-slate-200/80 font-mono">
                {regra.detalhes.map((d: any, dIdx: number) => (
                  <div key={dIdx} className="flex flex-col py-1 border-b border-slate-100 last:border-0">
                    {d.pergunta && (
                      <div className="flex justify-between text-slate-900">
                        <strong className="text-indigo-600">{d.pergunta}</strong>
                        <span className="text-slate-500">{d.caso}</span>
                      </div>
                    )}
                    {d.preps && <span className="text-[11px] text-slate-600">{d.preps}</span>}

                    {d.caso && d.masc && (
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-indigo-700">{d.caso}:</span>
                        <span className="text-slate-600">
                          Masc: <strong>{d.masc}</strong> | Fem: <strong>{d.fem}</strong> | Neutro:{' '}
                          <strong>{d.neutro}</strong> | Plural: <strong>{d.plural}</strong>
                        </span>
                      </div>
                    )}

                    {d.fusao && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900">{d.fusao}</span>
                        <span className="text-[11px] text-slate-500">{d.contexto}</span>
                      </div>
                    )}

                    {d.contexto && d.escolha && (
                      <div className="flex flex-col">
                        <span className="text-slate-500 text-[11px]">{d.contexto}:</span>
                        <span className="text-slate-900 font-semibold">{d.escolha}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DIÁLOGOS VIVOS DA VIDA REAL                                               */}
      {/* ========================================================================= */}
      <div id="secao-2-3-dialogos-vivos" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">
              Alemão Falado em Situações Reais
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              3 Diálogos Situacionais das Preposições Locais
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Veja como nativos utilizam alternadamente <em>aus, in, nach, zum, zur, beim, vom</em> em conversações cotidianas reais. Pratique a escuta atenta e a reprodução oral.
        </p>

        <div className="space-y-6">
          {DIALOGOS_PREPOSICOES.map((dialogo) => (
            <div
              key={dialogo.id}
              className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs"
            >
              <div className="bg-slate-900 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-amber-400">{dialogo.cenario}</h4>
                  <span className="text-xs text-slate-400">{dialogo.local}</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Diálogo com Áudio Bilíngue
                </span>
              </div>

              <div className="p-4 sm:p-5 divide-y divide-slate-100 space-y-3 bg-slate-50/40">
                {dialogo.falas.map((fala, fIdx) => (
                  <div key={fIdx} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 font-mono">{fala.locutor}:</span>
                        <span className="text-sm font-semibold text-slate-900">{fala.de}</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-4 sm:pl-0">{fala.pt}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium">
                        {fala.preposicaoDestaque}
                      </span>
                      <AudioButton text={fala.de} lang="de-DE" size="sm" />
                      <AudioButton text={fala.pt} lang="pt-BR" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
