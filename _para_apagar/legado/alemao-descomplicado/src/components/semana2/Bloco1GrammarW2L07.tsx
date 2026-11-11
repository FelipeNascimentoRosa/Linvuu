import React, { useState } from 'react';
import {
  AKKUSATIV_REVISION_RULES,
  ADJECTIVE_AKKUSATIV_TABLE,
  VERBS_WITH_AKKUSATIV,
  AKKUSATIV_VERBS_SUMMARY,
  SEMANA_02_LESSON_07_METADATA,
} from '../../data/semana2Lesson07Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Search,
  Layers,
  ChevronDown,
  Info,
} from 'lucide-react';

export const Bloco1GrammarW2L07: React.FC = () => {
  const [selectedVerbTab, setSelectedVerbTab] = useState<string>('all');
  const [searchVerb, setSearchVerb] = useState<string>('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('moechten');

  const filteredVerbsSummary = AKKUSATIV_VERBS_SUMMARY.filter(
    (v) =>
      v.verbo.toLowerCase().includes(searchVerb.toLowerCase()) ||
      v.traducao.toLowerCase().includes(searchVerb.toLowerCase()) ||
      v.exemplo.toLowerCase().includes(searchVerb.toLowerCase())
  );

  return (
    <section id="bloco1-semana2-aula7" className="space-y-12">
      {/* Banner de Abertura do Bloco 1 */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              {SEMANA_02_LESSON_07_METADATA.week} · {SEMANA_02_LESSON_07_METADATA.round}
            </span>
            <span className="px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-semibold rounded-full border border-blue-400/30">
              {SEMANA_02_LESSON_07_METADATA.day}
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/90 text-xs rounded-full">
              {SEMANA_02_LESSON_07_METADATA.chapter}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 1 (60 Minutos) — Anatomia Gramatical Pura & Sintaxe Rígida
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Consolidação do Caso Acusativo com ênfase na declinação de adjetivos atributivos, desinências dos artigos e o domínio dos verbos transitivos diretos mais frequentes da língua alemã.
          </p>
        </div>
      </div>

      {/* 1.1 Revisão Rápida: O Caso Acusativo (Akkusativ) */}
      <div id="sec-1-1" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              1.1
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Revisão Rápida: O Caso Acusativo (Akkusativ)
              </h3>
              <p className="text-xs text-slate-500">
                Antes de avançar, consolide o que foi aprendido no Dia 006
              </p>
            </div>
          </div>
          <AudioButton
            text="Akkusativ im Deutschen: Nur der maskuline Artikel ändert sich von der zu den, ein zu einen, kein zu keinen und mein zu meinen. Weiblich, sächlich und Plural bleiben unverändert."
            label="🇩🇪 Regra de Ouro em Áudio"
            size="sm"
          />
        </div>

        {/* Regra de Ouro em Destaque */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            REGRA DE OURO DO ACUSATIVO ALEMÃO:
          </div>
          <p className="text-sm leading-relaxed">
            <span className="font-extrabold text-amber-900">Apenas o gênero masculino</span> muda no Acusativo (<code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono text-amber-900">der → den</code>, <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono text-amber-900">ein → einen</code>, <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono text-amber-900">kein → keinen</code>, <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono text-amber-900">mein → meinen</code>). Todos os outros gêneros (Feminino, Neutro e Plural) permanecem <span className="font-extrabold text-amber-900">100% idênticos ao Nominativo</span>.
          </p>
        </div>

        {/* Tabela de Gêneros do Acusativo */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Gênero</th>
                <th className="py-3 px-4 font-bold">Nominativo (Sujeito)</th>
                <th className="py-3 px-4 font-bold">Acusativo (Objeto Direto)</th>
                <th className="py-3 px-4 font-bold">Mudança Morfológica</th>
                <th className="py-3 px-4 font-bold">Explicação & Detalhe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AKKUSATIV_REVISION_RULES.map((rule, idx) => (
                <tr key={idx} className={rule.genero === 'Masculino' ? 'bg-amber-50/40 hover:bg-amber-50/70 transition-colors' : 'hover:bg-slate-50/60 transition-colors'}>
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      rule.genero === 'Masculino' ? 'bg-blue-600' :
                      rule.genero === 'Feminino' ? 'bg-rose-500' :
                      rule.genero === 'Neutro' ? 'bg-emerald-500' : 'bg-purple-600'
                    }`} />
                    {rule.genero}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{rule.nominativo}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-900 bg-blue-50/40">{rule.acusativo}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      rule.mudanca === 'der → den'
                        ? 'bg-amber-200 text-amber-900 font-bold'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {rule.mudanca}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">{rule.explicacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.2 O Acusativo com Adjetivos Atributivos */}
      <div id="sec-1-2" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              1.2
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                O Acusativo com Adjetivos Atributivos
              </h3>
              <p className="text-xs text-slate-500">
                Quando um adjetivo precede um substantivo no Acusativo, ele recebe uma terminação obrigatória
              </p>
            </div>
          </div>
          <AudioButton
            text="Ich brauche einen neuen Computer. Ich kaufe eine neue Lampe. Ich möchte ein neues Telefon. Ich habe keine neuen Bücher."
            label="🇩🇪 Frases Modelo em Áudio"
            size="sm"
          />
        </div>

        {/* Comparação Direta: Nominativo vs Acusativo com Adjetivos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Masculino</span>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-500">Nom:</span> ein neuer Computer
            </div>
            <div className="text-sm font-bold text-blue-900 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>einen neuen Computer</span>
            </div>
            <p className="text-[11px] text-blue-950 font-medium">Artigo <code className="bg-white px-1 py-0.5 rounded">einen</code> + adjetivo com desinência <code className="bg-white px-1 py-0.5 rounded">-en</code>.</p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Feminino</span>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-500">Nom:</span> eine neue Lampe
            </div>
            <div className="text-sm font-bold text-rose-900 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>eine neue Lampe</span>
            </div>
            <p className="text-[11px] text-rose-950 font-medium">Idêntico ao nominativo: artigo <code className="bg-white px-1 py-0.5 rounded">eine</code> + adjetivo com <code className="bg-white px-1 py-0.5 rounded">-e</code>.</p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Neutro</span>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-500">Nom:</span> ein neues Telefon
            </div>
            <div className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>ein neues Telefon</span>
            </div>
            <p className="text-[11px] text-emerald-950 font-medium">Idêntico ao nominativo: artigo <code className="bg-white px-1 py-0.5 rounded">ein</code> + adjetivo com <code className="bg-white px-1 py-0.5 rounded">-es</code>.</p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800">Plural (Negação)</span>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-500">Nom:</span> keine neuen Bücher
            </div>
            <div className="text-sm font-bold text-purple-900 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>keine neuen Bücher</span>
            </div>
            <p className="text-[11px] text-purple-950 font-medium">Determinante <code className="bg-white px-1 py-0.5 rounded">keine</code> + adjetivo sempre com <code className="bg-white px-1 py-0.5 rounded">-en</code>.</p>
          </div>
        </div>

        {/* Tabela Detalhada com Exemplos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Gênero</th>
                <th className="py-3 px-4 font-bold">Artigo</th>
                <th className="py-3 px-4 font-bold">Adjetivo</th>
                <th className="py-3 px-4 font-bold">Substantivo</th>
                <th className="py-3 px-4 font-bold">Exemplo Prático</th>
                <th className="py-3 px-4 font-bold">Áudio & Regra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ADJECTIVE_AKKUSATIV_TABLE.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{item.genero}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-700 bg-blue-50/30">{item.artigo}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-700 bg-indigo-50/30">{item.adjetivo}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{item.substantivo}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-900">{item.exemplo}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{item.traducao}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <AudioButton text={item.exemplo} label="🇩🇪 Ouvir" size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.3 a 1.9 Verbos Individuais com Acusativo */}
      <div id="sec-1-3-to-1-9" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              1.3–1.9
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Os 7 Verbos Principais que Regem Acusativo
              </h3>
              <p className="text-xs text-slate-500">
                Conjugação completa, peculiaridades sintáticas e exemplos com objetos diretos
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'möchten', 'brauchen', 'haben', 'sehen', 'lesen', 'trinken', 'essen'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedVerbTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  selectedVerbTab === tab
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab === 'all' ? 'Ver Todos' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Verbos Formatada */}
        <div className="space-y-6">
          {VERBS_WITH_AKKUSATIV.filter((v) => selectedVerbTab === 'all' || v.verbo === selectedVerbTab).map((verb) => (
            <div
              key={verb.verbo}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-extrabold text-blue-900 bg-blue-100 px-3 py-1 rounded-lg">
                    {verb.verbo}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-800">
                      {verb.traducao}
                    </span>
                    <span className="block text-xs text-slate-500">
                      Tipo: {verb.tipo}
                    </span>
                  </div>
                </div>
                <AudioButton
                  text={`${verb.verbo}. Ich ${verb.conjugacao.ich}, du ${verb.conjugacao.du}, er ${verb.conjugacao.erSieEs}, wir ${verb.conjugacao.wir}, ihr ${verb.conjugacao.ihr}, sie ${verb.conjugacao.sieSie}.`}
                  label="🇩🇪 Conjugação em Áudio"
                  size="sm"
                />
              </div>

              {/* Matriz de Conjugação */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="block text-slate-400 text-[10px] font-semibold">ich</span>
                  <span className="font-mono font-bold text-slate-800">{verb.conjugacao.ich}</span>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="block text-amber-700 text-[10px] font-bold">du (Atenção!)</span>
                  <span className="font-mono font-bold text-amber-950">{verb.conjugacao.du}</span>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="block text-amber-700 text-[10px] font-bold">er / sie / es</span>
                  <span className="font-mono font-bold text-amber-950">{verb.conjugacao.erSieEs}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="block text-slate-400 text-[10px] font-semibold">wir</span>
                  <span className="font-mono font-bold text-slate-800">{verb.conjugacao.wir}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="block text-slate-400 text-[10px] font-semibold">ihr</span>
                  <span className="font-mono font-bold text-slate-800">{verb.conjugacao.ihr}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="block text-slate-400 text-[10px] font-semibold">sie / Sie</span>
                  <span className="font-mono font-bold text-slate-800">{verb.conjugacao.sieSie}</span>
                </div>
              </div>

              {/* Exemplos Práticos */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Exemplos com Objeto no Acusativo:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {verb.exemplos.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-900">
                          {ex.de}
                        </div>
                        <div className="text-slate-500">
                          {ex.pt}
                        </div>
                        <span className="inline-block text-[10px] text-blue-700 font-mono bg-blue-50 px-1.5 py-0.5 rounded">
                          {ex.foco}
                        </span>
                      </div>
                      <AudioButton text={ex.de} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Nota Especial */}
              {verb.notaEspecial && (
                <div className="bg-blue-50/70 border border-blue-200 text-blue-900 p-3 rounded-xl text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Observação Importante: </span>
                    {verb.notaEspecial}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 1.10 Resumo dos 16 Verbos com Acusativo */}
      <div id="sec-1-10" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              1.10
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Resumo dos 16 Verbos Mais Comuns que Regem Acusativo
              </h3>
              <p className="text-xs text-slate-500">
                Tabela de consulta rápida com exemplos de aplicação em contexto
              </p>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar verbo ou exemplo..."
              value={searchVerb}
              onChange={(e) => setSearchVerb(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Verbo (Infinitivo)</th>
                <th className="py-3 px-4 font-bold">Tradução</th>
                <th className="py-3 px-4 font-bold">Exemplo Prático</th>
                <th className="py-3 px-4 font-bold">Tradução do Exemplo</th>
                <th className="py-3 px-4 font-bold text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVerbsSummary.map((item, idx) => (
                <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-900 bg-purple-50/30">
                    {item.verbo}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {item.traducao}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {item.exemplo}
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600">
                    {item.traducaoExemplo}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <AudioButton text={item.exemplo} size="sm" />
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
