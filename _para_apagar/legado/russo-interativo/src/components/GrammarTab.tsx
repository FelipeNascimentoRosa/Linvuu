import React, { useState } from 'react';
import { Volume2, AlertTriangle, CheckCircle, Info, Sparkles, HelpCircle } from 'lucide-react';
import { GrammarItem } from '../types';
import { playRussianAudio } from '../utils/audio';

interface GrammarTabProps {
  grammarItems: GrammarItem[];
}

export const GrammarTab: React.FC<GrammarTabProps> = ({ grammarItems }) => {
  const [playingAudioText, setPlayingAudioText] = useState<string | null>(null);

  const handlePlay = (text: string) => {
    setPlayingAudioText(text);
    playRussianAudio(text, 'normal', () => setPlayingAudioText(null));
  };

  return (
    <div className="space-y-8">
      {/* Crucial Pedagogical Alerts Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ser/Estar Warning Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">
                Aviso 1: O Russo NÃO usa "Ser" ou "Estar" no Presente!
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                Em russo, não existe equivalente a "sou", "é" ou "está" no tempo presente. A frase une o sujeito diretamente à profissão, qualidade ou lugar.
              </p>
              <div className="bg-white/80 rounded-lg p-2.5 border border-amber-200 text-xs font-mono text-amber-900 mt-2">
                <span className="font-bold">Я студент</span> = Eu sou estudante <span className="text-amber-600">(lit. "Eu estudante")</span>
              </div>
            </div>
          </div>
        </div>

        {/* Normalno Warning Banner */}
        <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-sky-100 rounded-xl text-sky-800 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wide">
                Aviso 2: "Нормально" NÃO significa "Normal"!
              </h3>
              <p className="text-xs text-sky-800 leading-relaxed">
                Ao responder a "Как дела?" (Como vai?), a palavra <strong>Норма́льно</strong> significa <strong>"Tudo bem"</strong>, <strong>"Bem"</strong>, <strong>"Tranquilo"</strong>, <strong>"Ok"</strong>.
              </p>
              <div className="bg-white/80 rounded-lg p-2.5 border border-sky-200 text-xs font-mono text-sky-900 mt-2">
                <span className="font-bold">— Как дела? — Нормально.</span> = — Como vai? — Tudo bem!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Spotlight: Gênero dos Substantivos & Ausência de Artigos */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-indigo-700/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-display text-white">
              Gênero dos Substantivos no Russo: O Segredo da Última Letra
            </h3>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full font-mono">
            3 Gêneros · Zero Artigos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          {/* Card 1: O que é gênero */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/70 space-y-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider block text-[11px]">
              1. O que é gênero gramatical?
            </span>
            <p className="text-slate-300 leading-relaxed">
              Gênero gramatical <strong>NÃO é sexo biológico</strong>! É uma etiqueta da língua. Em português, dizemos <em>"o livro"</em> e <em>"a mesa"</em> (mesa não tem sexo biológico, mas é feminina). Em russo funciona do mesmo modo, mas são <strong>3 gêneros: Masculino (он), Feminino (она́) e Neutro (оно́)</strong>.
            </p>
          </div>

          {/* Card 2: Sem artigos */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/70 space-y-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider block text-[11px]">
              2. No Russo NÃO há artigos!
            </span>
            <p className="text-slate-300 leading-relaxed">
              Não existe <em>o, a, os, as</em> nem <em>um, uma, uns, umas</em>! Enquanto em português o artigo entrega o gênero (<strong>o</strong> menino / <strong>a</strong> menina), no russo o que define o gênero é a <strong>ÚLTIMA LETRA (a terminação)</strong> da palavra!
            </p>
          </div>

          {/* Card 3: Falsos paralelos */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/70 space-y-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider block text-[11px]">
              3. O Exemplo do "Cachorro"
            </span>
            <p className="text-slate-300 leading-relaxed">
              O gênero do português <strong>NÃO serve de guia</strong> para o russo!
              <br />
              • <strong>"O cachorro"</strong> (masc. em PT) → <strong>соба́ка</strong> (FEMININO em russo, termina em <em>-a</em>!).
              <br />
              • <strong>"A mesa"</strong> (fem. em PT) → <strong>стол</strong> (MASCULINO em russo, termina em consoante!).
            </p>
          </div>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Exemplo 1: Собака */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-amber-300 font-semibold font-display text-sm">
                соба́ка <span className="text-xs text-rose-400 font-sans font-normal">(fem, -а)</span>
              </div>
              <div className="text-[11px] text-slate-300">
                o cachorro → <strong>моя собака</strong>
              </div>
            </div>
            <button
              onClick={() => handlePlay('Это моя собака')}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              title="Ouvir: Это моя собака"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Exemplo 2: Стол */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-amber-300 font-semibold font-display text-sm">
                стол <span className="text-xs text-sky-400 font-sans font-normal">(masc, cons.)</span>
              </div>
              <div className="text-[11px] text-slate-300">
                a mesa → <strong>мой стол</strong>
              </div>
            </div>
            <button
              onClick={() => handlePlay('Это мой стол')}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              title="Ouvir: Это мой стол"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Exemplo 3: Море */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-amber-300 font-semibold font-display text-sm">
                мо́ре <span className="text-xs text-emerald-400 font-sans font-normal">(neutro, -е)</span>
              </div>
              <div className="text-[11px] text-slate-300">
                o mar → <strong>наше море</strong>
              </div>
            </div>
            <button
              onClick={() => handlePlay('Это наше море')}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              title="Ouvir: Это наше море"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Exemplo 4: Окно */}
          <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-amber-300 font-semibold font-display text-sm">
                окно́ <span className="text-xs text-emerald-400 font-sans font-normal">(neutro, -о)</span>
              </div>
              <div className="text-[11px] text-slate-300">
                a janela → <strong>моё окно</strong>
              </div>
            </div>
            <button
              onClick={() => handlePlay('Это моё окно')}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              title="Ouvir: Это моё окно"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grammar Topics */}
      <div className="space-y-8">
        {grammarItems.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/60">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                  {item.explanationPt}
                </p>

                {item.importantNote && (
                  <div className="mt-3.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item.importantNote}</span>
                  </div>
                )}
              </div>

              {/* Table if present */}
              {item.tableHeaders && item.tableRows && (
                <div className="p-6 border-b border-slate-100 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        {item.tableHeaders.map((header, hIdx) => (
                          <th
                            key={hIdx}
                            className="py-2.5 px-4 font-semibold text-slate-700 uppercase tracking-wider text-[11px]"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {item.tableRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`py-3 px-4 ${
                                cIdx === 0
                                  ? 'font-semibold text-slate-900'
                                  : cIdx === 1
                                  ? 'font-mono text-blue-700 font-medium'
                                  : 'text-slate-600'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Examples with Audio */}
              {item.examples && item.examples.length > 0 && (
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Exemplos Práticos com Áudio
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.examples.map((ex, exIdx) => {
                      const isPlaying = playingAudioText === ex.russian;
                      return (
                        <div
                          key={exIdx}
                          className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all flex items-start justify-between gap-2.5"
                        >
                          <div className="space-y-0.5">
                            <div className="font-semibold text-slate-900 text-sm font-display">
                              {ex.russian}
                            </div>
                            <div className="text-xs text-slate-600">
                              {ex.portuguese}
                            </div>
                            {ex.note && (
                              <div className="text-[11px] text-amber-700 italic">
                                ({ex.note})
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handlePlay(ex.russian)}
                            title="Ouvir exemplo"
                            className={`p-1.5 rounded-lg border transition-colors shrink-0 cursor-pointer ${
                              isPlaying
                                ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                                : 'bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border-slate-200'
                            }`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
