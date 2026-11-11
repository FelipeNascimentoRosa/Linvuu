import React, { useState } from 'react';
import {
  IMPERATIVE_FORMAL_DATA,
  IMPERATIVE_INFORMAL_DU_DATA,
  IMPERATIVE_INFORMAL_IHR_DATA,
  IRREGULAR_IMPERATIVES,
  PRAETERITUM_SEIN_DATA,
  PRAETERITUM_HABEN_DATA,
  WERDEN_CONJUGATION_DATA,
  LESSON_10_PLURAL_ITEMS,
  GENDER_SUFFIX_RULES,
  TROTZDEM_DESHALB_DATA,
} from '../../data/semana2Lesson10Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Command,
  History,
  GitCompare,
  Layers,
  Flame,
} from 'lucide-react';

export const Bloco1GrammarW2L10: React.FC = () => {
  const [activeImperativeTab, setActiveImperativeTab] = useState<'formal' | 'du' | 'ihr' | 'irregular'>('formal');
  const [activePraeteritumTab, setActivePraeteritumTab] = useState<'sein' | 'haben'>('sein');
  const [selectedPluralFamily, setSelectedPluralFamily] = useState<number | 'all'>('all');

  const filteredPlurals =
    selectedPluralFamily === 'all'
      ? LESSON_10_PLURAL_ITEMS
      : LESSON_10_PLURAL_ITEMS.filter((item) => item.family === selectedPluralFamily);

  return (
    <section id="bloco1-semana2-aula10" className="space-y-12">
      {/* Banner Principal do Bloco 1 */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 010
            </span>
            <span className="px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-semibold rounded-full border border-blue-400/30">
              Kapitel 4, Teil B, C e D (A16–A32, p. 98–108)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 1 (60 Minutos) — Anatomia Gramatical Pura & Sintaxe Rígida
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Consolidação do <strong>Imperativo (Sie, du, ihr e formas irregulares)</strong>, domínio das conjunções causais e concessivas <strong>deshalb & trotzdem</strong> com sintaxe V2, o verbo de transformação <strong>werden</strong>, o pretérito simples <strong>war & hatte</strong>, e as regras morfológicas definitivas de gênero por sufixo.
          </p>
        </div>
      </div>

      {/* 1.1 O Imperativo (Imperativ) — Revisão e Aprofundamento */}
      <div id="sec-1-1" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Command className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Seção 1.1</span>
            <h3 className="text-xl font-bold text-slate-900">
              O Imperativo (Imperativ) — As 3 Formas Fundamentais & Verbos Irregulares
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          O imperativo é empregado em alemão para <strong>dar ordens, instruções culinárias, conselhos médicos e fazer pedidos cordiais</strong>. A língua alemã divide a flexão imperativa estritamente pelo destinatário da mensagem: o tratamento formal de respeito (<em>Sie</em>), a segunda pessoa do singular informal (<em>du</em>) e a segunda pessoa do plural informal (<em>ihr</em>).
        </p>

        {/* Seletor de Abas de Imperativo */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveImperativeTab('formal')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeImperativeTab === 'formal'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Formal (Sie)
          </button>
          <button
            onClick={() => setActiveImperativeTab('du')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeImperativeTab === 'du'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Informal Singular (du)
          </button>
          <button
            onClick={() => setActiveImperativeTab('ihr')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeImperativeTab === 'ihr'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. Informal Plural (ihr)
          </button>
          <button
            onClick={() => setActiveImperativeTab('irregular')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeImperativeTab === 'irregular'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            4. Formas Irregulares Especiais
          </button>
        </div>

        {/* Conteúdo da Aba Formal (Sie) */}
        {activeImperativeTab === 'formal' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 leading-relaxed">
                <strong>Regra Mestra do Imperativo Formal:</strong> O verbo na forma do infinitivo passa para a <strong>Posição I</strong> da oração, seguido obrigatoriamente do pronome <strong>Sie</strong>. A pontuação encerra-se com ponto final ou ponto de exclamação (<em>Schälen Sie das Obst.</em>).
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Verbo</th>
                    <th className="py-2.5 px-3 font-semibold">Infinitivo</th>
                    <th className="py-2.5 px-3 font-semibold">Imperativo (Sie)</th>
                    <th className="py-2.5 px-3 font-semibold">Tradução</th>
                    <th className="py-2.5 px-3 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {IMPERATIVE_FORMAL_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">{row.verb}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.infinitive}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 bg-blue-50/30">{row.imperative}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.translation}</td>
                      <td className="py-2.5 px-3 text-center">
                        <AudioButton text={row.imperative} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba Informal Singular (du) */}
        {activeImperativeTab === 'du' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong>Regra Mestra do Imperativo Informal Singular (du):</strong> Elimina-se o pronome <em>du</em> e a desinência pessoal <strong>-st</strong>. O <em>-e</em> final é quase sempre facultativo na oralidade moderna (<em>Schäl! / Schäle!</em>). <strong>ATENÇÃO MÁXIMA:</strong> Verbos com alternância vocálica <em>e → i/ie</em> <strong>mantêm obrigatoriamente a alternância</strong> e <strong>NUNCA</strong> recebem <em>-e</em> (<em>Iss!</em>, <em>Gib!</em>, <em>Nimm!</em>, <em>Lies!</em>). Verbos com <em>a → ä</em> <strong>perdem o trema</strong> (<em>Fahr!</em>, <em>Wasch!</em>, <em>Schlaf!</em>).
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Verbo</th>
                    <th className="py-2.5 px-3 font-semibold">Infinitivo</th>
                    <th className="py-2.5 px-3 font-semibold">Imperativo (du)</th>
                    <th className="py-2.5 px-3 font-semibold">Tradução</th>
                    <th className="py-2.5 px-3 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {IMPERATIVE_INFORMAL_DU_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-800">{row.verb}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.infinitive}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 bg-amber-50/30">{row.imperative}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.translation}</td>
                      <td className="py-2.5 px-3 text-center">
                        <AudioButton text={row.imperative} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba Informal Plural (ihr) */}
        {activeImperativeTab === 'ihr' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 leading-relaxed">
                <strong>Regra Mestra do Imperativo Informal Plural (ihr):</strong> Elimina-se apenas o pronome <em>ihr</em>. O verbo conserva rigorosamente a mesma forma conjugada regular da segunda pessoa do plural do presente com desinência <strong>-t</strong> (<em>Kocht!</em>, <em>Schneidet!</em>, <em>Wascht!</em>).
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Verbo</th>
                    <th className="py-2.5 px-3 font-semibold">Infinitivo</th>
                    <th className="py-2.5 px-3 font-semibold">Imperativo (ihr)</th>
                    <th className="py-2.5 px-3 font-semibold">Tradução</th>
                    <th className="py-2.5 px-3 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {IMPERATIVE_INFORMAL_IHR_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{row.verb}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.infinitive}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 bg-emerald-50/30">{row.imperative}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.translation}</td>
                      <td className="py-2.5 px-3 text-center">
                        <AudioButton text={row.imperative} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba Irregulares */}
        {activeImperativeTab === 'irregular' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-900 leading-relaxed">
                <strong>Matriz de Verbos com Imperativo Especial:</strong> Verbos auxiliares e de alta frequência exigem memorização direta de suas raízes. Destaque especial para <em>sein</em> (<strong>Sei!</strong>, <strong>Seid!</strong>, <strong>Seien Sie!</strong>) e para verbos com apócope radical.
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Verbo</th>
                    <th className="py-2.5 px-3 font-semibold text-amber-800">du (Singular)</th>
                    <th className="py-2.5 px-3 font-semibold text-emerald-800">ihr (Plural)</th>
                    <th className="py-2.5 px-3 font-semibold text-blue-800">Sie (Formal)</th>
                    <th className="py-2.5 px-3 font-semibold">Nota Gramatical</th>
                    <th className="py-2.5 px-3 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {IRREGULAR_IMPERATIVES.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{row.verb}</td>
                      <td className="py-2.5 px-3 font-bold text-amber-900 bg-amber-50/40">{row.du}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-900 bg-emerald-50/40">{row.ihr}</td>
                      <td className="py-2.5 px-3 font-bold text-blue-900 bg-blue-50/40">{row.sie}</td>
                      <td className="py-2.5 px-3 text-xs text-slate-500">{row.note}</td>
                      <td className="py-2.5 px-3 text-center">
                        <AudioButton text={`${row.du} ${row.ihr} ${row.sie}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 1.2 O Präteritum de sein e haben — Revisão Prática */}
      <div id="sec-1-2" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <History className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Seção 1.2</span>
            <h3 className="text-xl font-bold text-slate-900">
              O Präteritum de sein (war) e haben (hatte) — O Pretérito Oral Canônico
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Embora o pretérito falado dos verbos regulares em alemão seja quase exclusivamente feito com o <strong>Perfekt</strong> (<em>Ich habe gegessen</em>), os verbos <strong>sein</strong> e <strong>haben</strong> constituem uma <strong>exceção categórica</strong>: em 95% das situações orais do dia a dia, usa-se o <em>Präteritum</em> simples (<em>Ich war gestern da</em> em vez de <em>Ich bin gestern da gewesen</em>).
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setActivePraeteritumTab('sein')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activePraeteritumTab === 'sein'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            sein (war / estavam / era)
          </button>
          <button
            onClick={() => setActivePraeteritumTab('haben')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activePraeteritumTab === 'haben'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            haben (hatte / tinham / possuía)
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Pessoa</th>
                <th className="py-2.5 px-3 font-semibold">Pronome</th>
                <th className="py-2.5 px-3 font-semibold">Forma Präteritum</th>
                <th className="py-2.5 px-3 font-semibold">Exemplo Canônico</th>
                <th className="py-2.5 px-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activePraeteritumTab === 'sein' ? PRAETERITUM_SEIN_DATA : PRAETERITUM_HABEN_DATA).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 text-slate-500 font-mono">{row.person}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700">{row.pronoun}</td>
                  <td className="py-2.5 px-3 font-extrabold text-amber-700 font-mono text-base">{row.form}</td>
                  <td className="py-2.5 px-3 text-slate-800">{row.ex}</td>
                  <td className="py-2.5 px-3 text-center">
                    <AudioButton text={row.ex} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.3 O Acusativo com Verbos de Comida e Bebida */}
      <div id="sec-1-3" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 text-rose-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Seção 1.3</span>
            <h3 className="text-xl font-bold text-slate-900">
              O Caso Acusativo Obrigatório com Alimentos & Bebidas
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Os verbos que regem ação direta sobre comida (<em>essen, trinken, nehmen, kaufen, bestellen, möchten, mögen</em>) exigem que o objeto direto esteja no <strong>Caso Acusativo</strong>. Apenas o gênero masculino sofre mutação de artigo:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-200 text-blue-900">
              Masculino (der → den / einen)
            </span>
            <p className="font-bold text-sm text-blue-950">Ich esse einen Apfel.</p>
            <p className="text-xs text-blue-700">Como uma maçã. / Den Kaffee trinke ich gern.</p>
          </div>
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-200 text-rose-900">
              Feminino (die → die / eine)
            </span>
            <p className="font-bold text-sm text-rose-950">Ich esse eine Banane.</p>
            <p className="text-xs text-rose-700">Como uma banana. / Die Suppe schmeckt gut.</p>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-200 text-emerald-900">
              Neutro (das → das / ein)
            </span>
            <p className="font-bold text-sm text-emerald-950">Ich nehme ein Brötchen.</p>
            <p className="text-xs text-emerald-700">Pego um pãozinho. / Das Bier ist kalt.</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-200 text-purple-900">
              Plural (die → die / keine)
            </span>
            <p className="font-bold text-sm text-purple-950">Ich esse keine Pommes.</p>
            <p className="text-xs text-purple-700">Não como batatas fritas. / Die Kartoffeln kochen.</p>
          </div>
        </div>
      </div>

      {/* 1.4 As 5 Famílias do Plural em Alimentos & Cozinha */}
      <div id="sec-1-4" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Seção 1.4</span>
            <h3 className="text-xl font-bold text-slate-900">
              As 5 Famílias Morfológicas do Plural — Vocabulário Culinário (20 Termos)
            </h3>
          </div>
        </div>

        {/* Filtro das 5 famílias */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedPluralFamily('all')}
            className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer ${
              selectedPluralFamily === 'all'
                ? 'bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos os 20 Itens
          </button>
          {[1, 2, 3, 4, 5].map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedPluralFamily(fam)}
              className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer ${
                selectedPluralFamily === fam
                  ? 'bg-indigo-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Família {fam}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredPlurals.map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  Família {item.family} ({item.familyDesc})
                </span>
                <p className="text-sm font-bold text-slate-900 mt-1">{item.singular}</p>
                <p className="text-xs font-semibold text-indigo-600">{item.plural}</p>
                <p className="text-xs text-slate-500 mt-0.5">Tradução: {item.translation}</p>
              </div>
              <AudioButton text={`${item.singular}, ${item.plural}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 1.5 O Verbo werden (tornar-se / devir) */}
      <div id="sec-1-5" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Seção 1.5</span>
            <h3 className="text-xl font-bold text-slate-900">
              O Verbo werden (tornar-se / ficar) — Flexão Completa & Usos Canônicos
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          O verbo <strong>werden</strong> é um dos mais polivalentes da língua alemã: indica <strong>mudança de estado físico</strong> (<em>Das Essen wird kalt</em>), <strong>nova idade</strong> (<em>Ich werde 30</em>), <strong>profissão pretendida</strong> (<em>Ich werde Arzt</em>) e serve como alicerce do tempo futuro.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Pessoa</th>
                <th className="py-2.5 px-3 font-semibold">Pronome</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-700">Forma werden</th>
                <th className="py-2.5 px-3 font-semibold">Categoria de Uso</th>
                <th className="py-2.5 px-3 font-semibold">Exemplo Típico</th>
                <th className="py-2.5 px-3 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {WERDEN_CONJUGATION_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 text-slate-500 font-mono">{row.person}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700">{row.pronoun}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 bg-emerald-50/40 text-base">{row.form}</td>
                  <td className="py-2.5 px-3 text-xs font-medium text-slate-500">{row.use}</td>
                  <td className="py-2.5 px-3 text-slate-900 font-medium">{row.ex}</td>
                  <td className="py-2.5 px-3 text-center">
                    <AudioButton text={row.ex} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.6 Conjunções trotzdem & deshalb — Posição V2 */}
      <div id="sec-1-6" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <GitCompare className="w-5 h-5 text-purple-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Seção 1.6</span>
            <h3 className="text-xl font-bold text-slate-900">
              Sintaxe Rigorosa: deshalb (por isso) vs. trotzdem (mesmo assim)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">
                deshalb · Causa / Razão (Grund)
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700">Posição I → Verbo V2</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              Ich habe keinen Appetit, <span className="text-indigo-700 underline">deshalb möchte</span> ich jetzt nichts essen.
            </p>
            <p className="text-xs text-slate-600">
              Não tenho apetite, <em>por isso</em> não gostaria de comer nada agora. (A segunda oração expressa a consequência lógica direta da primeira).
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                trotzdem · Contra-motivo (Gegengrund)
              </span>
              <span className="text-xs font-mono font-bold text-amber-700">Posição I → Verbo V2</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              Pommes frites haben viel Fett, <span className="text-amber-700 underline">trotzdem esse</span> ich sie gern.
            </p>
            <p className="text-xs text-slate-600">
              Batatas fritas têm muita gordura, <em>mesmo assim</em> eu as como com prazer. (A segunda oração expressa uma contradição com a lógica esperada).
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            9 Exemplos Práticos de Aplicação Sintática
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {TROTZDEM_DESHALB_DATA.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs sm:text-sm"
              >
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded mr-2 ${
                      item.conjunction === 'deshalb'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.conjunction}
                  </span>
                  <span className="font-bold text-slate-900">{item.sentenceDe}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{item.sentencePt}</p>
                </div>
                <AudioButton text={item.sentenceDe} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.7 Sufixos Determinadores de Gênero (der, die, das) */}
      <div id="sec-1-7" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Seção 1.7</span>
            <h3 className="text-xl font-bold text-slate-900">
              Regras Morfológicas de Sufixos para Blindagem de Gênero
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {GENDER_SUFFIX_RULES.map((rule, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-1.5 ${
                rule.gender === 'der'
                  ? 'bg-blue-50/50 border-blue-200'
                  : rule.gender === 'die'
                  ? 'bg-rose-50/50 border-rose-200'
                  : 'bg-emerald-50/50 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-extrabold px-2 py-0.5 rounded uppercase ${
                    rule.gender === 'der'
                      ? 'bg-blue-600 text-white'
                      : rule.gender === 'die'
                      ? 'bg-rose-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {rule.gender}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700">{rule.suffix}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800">{rule.category}</p>
              <p className="text-[11px] text-slate-500 leading-snug">{rule.examples}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
