import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Mail,
  ShoppingBag,
  Mic,
  Search,
  MessageSquare,
  Sparkles,
  MapPin,
  Building,
  Calendar,
  Filter,
} from 'lucide-react';
import { AudioButton } from '../AudioButton';
import {
  HIDDENSEE_EMAIL_TEXT,
  CLOTHING_SHOP_DIALOGUE,
  PHONETICS_CH_DATA,
  PRIMARY_LEXICON_W2L13,
  COLLOQUIAL_EXPRESSIONS_W2L13,
} from '../../data/semana2Lesson13Data';

export const Bloco2TextsLexiconW2L13: React.FC = () => {
  const [lexiconSearch, setLexiconSearch] = useState<string>('');
  const [colloquialSearch, setColloquialSearch] = useState<string>('');
  const [activePhoneticTab, setActivePhoneticTab] = useState<'ich' | 'ach'>('ich');

  const filteredLexicon = PRIMARY_LEXICON_W2L13.filter((item) => {
    const term = lexiconSearch.toLowerCase();
    return (
      item.wordDe.toLowerCase().includes(term) ||
      item.translationPt.toLowerCase().includes(term) ||
      item.exampleSentence.toLowerCase().includes(term)
    );
  });

  const filteredColloquial = COLLOQUIAL_EXPRESSIONS_W2L13.filter((item) => {
    const term = colloquialSearch.toLowerCase();
    return (
      item.expressionDe.toLowerCase().includes(term) ||
      item.translationPt.toLowerCase().includes(term) ||
      item.contextUsage.toLowerCase().includes(term)
    );
  });

  return (
    <div id="bloco2-texts-w2l13" className="space-y-12">
      {/* HEADER DO BLOCO 2 */}
      <section className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-teal-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold tracking-wider uppercase mb-3 border border-teal-400/30">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              Bloco 2 (60 min) · Transcrição Integral, Tradução & Mineração Lexical
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Diálogos Autênticos, E-mail de Hiddensee & Repertório Lexical
            </h2>
            <p className="text-teal-100/90 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Leitura analítica do e-mail de férias na ilha báltica de Hiddensee (A26), compra de roupas e tamanhos na loja com Frau Berg (A17), laboratório fonético do <code className="text-teal-300 font-mono bg-black/30 px-1 py-0.5 rounded">ch-Laut</code> ([ç] vs. [x]), 45 termos da Tabela Lexical Primária e 26 expressões de <code className="text-teal-300 font-mono bg-black/30 px-1 py-0.5 rounded">Umgangssprache</code>.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-xs text-teal-300 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-teal-500/30">
              Kapitel 6 · A1–A29
            </span>
            <span className="text-xs text-teal-200/80 font-medium">
              Transcrição & Vocabulário
            </span>
          </div>
        </div>
      </section>

      {/* 2.26 TEXTO A26: E-MAIL DE FÉRIAS NA ILHA DE HIDDENSEE */}
      <section id="sec-2-26" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Seção 2.26 · Texto A26</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Mail className="w-5 h-5 text-teal-600" />
              Sie haben Post! — Ostseegrüße von der Insel Hiddensee
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            p. 156 do Kursbuch
          </span>
        </div>

        {/* CABEÇALHO DO E-MAIL */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs sm:text-sm font-mono space-y-1 text-slate-700">
          <div><strong className="text-slate-900">Von:</strong> {HIDDENSEE_EMAIL_TEXT.header.from}</div>
          <div><strong className="text-slate-900">An:</strong> {HIDDENSEE_EMAIL_TEXT.header.to}</div>
          <div><strong className="text-slate-900">Betreff:</strong> {HIDDENSEE_EMAIL_TEXT.header.subject}</div>
        </div>

        {/* CORPO DO E-MAIL BILINGUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-teal-50/50 rounded-xl border border-teal-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-100 px-2.5 py-0.5 rounded-full">
                  Original em Alemão
                </span>
                <AudioButton text={HIDDENSEE_EMAIL_TEXT.paragraphsDe.join(' ')} size="sm" />
              </div>
              {HIDDENSEE_EMAIL_TEXT.paragraphsDe.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed mb-4 whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
            <div className="pt-3 border-t border-teal-200/80 text-[11px] text-teal-800 font-semibold">
              📍 Destino: Insel Hiddensee (Mar Báltico — sem circulação de automóveis)
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-full">
                  Tradução Analítica Justaposta
                </span>
              </div>
              {HIDDENSEE_EMAIL_TEXT.paragraphsPt.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              💡 Transcrição pedagógica integral do Kursbuch
            </div>
          </div>
        </div>

        {/* NOTAS GRAMATICAIS DO TEXTO */}
        <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
            Anatomia Sintática & Estruturas-Chave do E-mail:
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">1.</span>
              <span><strong>Wir sind ... angekommen:</strong> ankommen (separável) no Perfekt com auxiliar sein.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">2.</span>
              <span><strong>Bei der Fahrt hatten wir...:</strong> haben no Präteritum (hatten) com inversão sintática.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">3.</span>
              <span><strong>Es hat geregnet:</strong> regnen no Perfekt regular com haben.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">4.</span>
              <span><strong>Man muss mit der Fähre fahren:</strong> Modalverb müssen + Dativ com mit der Fähre.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">5.</span>
              <span><strong>denn es war ein Sturm:</strong> conjunção coordenativa denn sem alteração de posição verbal.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">6.</span>
              <span><strong>spazieren gegangen:</strong> spazieren gehen no Perfekt com auxiliar sein.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">7.</span>
              <span><strong>Wir wollen ... machen:</strong> Modalverb wollen na Posição II e infinitivo no Satzende.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-black">8.</span>
              <span><strong>Ich rufe dich an:</strong> anrufen separável no presente (an no Satzende).</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2.17 TEXTO A17: COMPRA DE ROUPAS COM FRAU BERG */}
      <section id="sec-2-17" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Seção 2.17 · Texto A17</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <ShoppingBag className="w-5 h-5 text-teal-600" />
              Frau Berg kauft eine neue Bluse (Compras de Roupas & Cores)
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            p. 149 do Kursbuch
          </span>
        </div>

        <div className="space-y-3 mb-6">
          {CLOTHING_SHOP_DIALOGUE.map((line, idx) => {
            const isClerk = line.speaker === 'Verkäuferin';
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isClerk
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-teal-50/60 border-teal-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isClerk ? 'bg-slate-200 text-slate-800' : 'bg-teal-600 text-white'
                      }`}
                    >
                      {line.speaker}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{line.german}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{line.portuguese}</p>
                </div>
                <div className="self-end sm:self-center shrink-0">
                  <AudioButton text={line.german} size="sm" />
                </div>
              </div>
            );
          })}
        </div>

        {/* VOCABULÁRIO DE CORES */}
        <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-xl">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            🎨 As 8 Cores Fundamentais (Die Farben):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-blue-600 text-white font-bold">blau (azul)</div>
            <div className="p-2 rounded bg-yellow-400 text-slate-900 font-bold">gelb (amarelo)</div>
            <div className="p-2 rounded bg-emerald-600 text-white font-bold">grün (verde)</div>
            <div className="p-2 rounded bg-rose-600 text-white font-bold">rot (vermelho)</div>
            <div className="p-2 rounded bg-slate-900 text-white font-bold">schwarz (preto)</div>
            <div className="p-2 rounded bg-white text-slate-900 font-bold border border-slate-300">weiß (branco)</div>
            <div className="p-2 rounded bg-slate-400 text-white font-bold">grau (cinza)</div>
            <div className="p-2 rounded bg-amber-800 text-white font-bold">braun (marrom)</div>
          </div>
        </div>
      </section>

      {/* 2.20 FONÉTICA: CH [ç] E [x] */}
      <section id="sec-2-20" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Seção 2.20 · Fonética</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <Mic className="w-5 h-5 text-teal-600" />
              Fonética Rigorosa do ch-Laut: [ç] (Ich-Laut) vs. [x] (Ach-Laut)
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActivePhoneticTab('ich')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                activePhoneticTab === 'ich'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              [ç] Ich-Laut (Suave)
            </button>
            <button
              onClick={() => setActivePhoneticTab('ach')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                activePhoneticTab === 'ach'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              [x] Ach-Laut (Gutural)
            </button>
          </div>
        </div>

        {activePhoneticTab === 'ich' ? (
          <div>
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl mb-4">
              <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-1">
                Regra Fonética do Ich-Laut [ç]:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {PHONETICS_CH_DATA.ichLaut.rule}
              </p>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Palavras de Treino:
              </span>
              <div className="flex flex-wrap gap-2">
                {PHONETICS_CH_DATA.ichLaut.words.map((w, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-900 text-xs font-semibold border border-slate-200"
                  >
                    <span>{w}</span>
                    <AudioButton text={w} size="sm" />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Frases de Fixação:
              </span>
              <div className="space-y-2">
                {PHONETICS_CH_DATA.ichLaut.sentences.map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">{s.de}</p>
                      <p className="text-xs text-slate-500">{s.pt}</p>
                    </div>
                    <AudioButton text={s.de} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                Regra Fonética do Ach-Laut [x]:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {PHONETICS_CH_DATA.achLaut.rule}
              </p>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Palavras de Treino:
              </span>
              <div className="flex flex-wrap gap-2">
                {PHONETICS_CH_DATA.achLaut.words.map((w, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-900 text-xs font-semibold border border-slate-200"
                  >
                    <span>{w}</span>
                    <AudioButton text={w} size="sm" />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Frases de Fixação:
              </span>
              <div className="space-y-2">
                {PHONETICS_CH_DATA.achLaut.sentences.map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">{s.de}</p>
                      <p className="text-xs text-slate-500">{s.pt}</p>
                    </div>
                    <AudioButton text={s.de} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2.30 TABELA LEXICAL PRIMÁRIA (45 TERMOS) */}
      <section id="sec-2-30" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Seção 2.30</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <BookOpen className="w-5 h-5 text-teal-600" />
              Tabela Lexical Primária do Dia 013 (45 Termos Fundamentais)
            </h3>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={lexiconSearch}
              onChange={(e) => setLexiconSearch(e.target.value)}
              placeholder="Buscar termo ou tradução..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="p-3 w-12 text-center">#</th>
                <th className="p-3 w-48">Palavra Alemã (com Artigo)</th>
                <th className="p-3 w-36">Classe & Plural</th>
                <th className="p-3 w-40">Tradução Exata</th>
                <th className="p-3">Frase Modelo do Kursbuch</th>
                <th className="p-3 w-16 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLexicon.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 text-center text-slate-400 font-mono text-xs">{item.id}</td>
                  <td className="p-3 font-semibold text-slate-900">
                    {item.article && (
                      <span
                        className={`font-mono mr-1.5 font-bold ${
                          item.article === 'der'
                            ? 'text-blue-700'
                            : item.article === 'die' || item.article === 'Pl.'
                            ? 'text-rose-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {item.article}
                      </span>
                    )}
                    {item.wordDe}
                  </td>
                  <td className="p-3 text-slate-600 text-xs">
                    <div>{item.grammarClass}</div>
                    <div className="font-mono text-slate-500">{item.pluralDe}</div>
                  </td>
                  <td className="p-3 text-slate-800 font-medium">{item.translationPt}</td>
                  <td className="p-3 text-slate-700">
                    <div className="font-medium text-slate-900">{item.exampleSentence}</div>
                    <div className="text-xs text-slate-500">{item.examplePt}</div>
                  </td>
                  <td className="p-3 text-center">
                    <AudioButton text={item.exampleSentence} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2.31 UMGANGSSPRACHE (26 EXPRESSÕES) */}
      <section id="sec-2-31" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Seção 2.31</span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              Registro Coloquial e Autêntico (Umgangssprache — 26 Expressões)
            </h3>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={colloquialSearch}
              onChange={(e) => setColloquialSearch(e.target.value)}
              placeholder="Buscar expressão ou contexto..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredColloquial.map((expr, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    {expr.contextUsage}
                  </span>
                  <AudioButton text={expr.expressionDe} size="sm" />
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-0.5">{expr.expressionDe}</h4>
                <p className="text-xs text-slate-600 font-medium mb-3">{expr.translationPt}</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                <span className="font-semibold text-slate-800 block">{expr.exampleSentence}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
