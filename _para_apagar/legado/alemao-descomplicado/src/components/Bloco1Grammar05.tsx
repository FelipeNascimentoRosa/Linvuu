import React from 'react';
import {
  LOCAL_PREPOSITIONS_FULL,
  IN_VS_NACH_COMPARISON,
  PREPOSITION_CONTRACTIONS,
  FAHREN_CONJUGATION,
  OTHER_A_TO_AE_VERBS,
  NEHMEN_CONJUGATION,
  DOUBLE_CONSONANT_CHANGE_VERBS,
  ESSEN_CONJUGATION,
  E_TO_IE_I_VERBS,
  WISSEN_CONJUGATION,
  WISSEN_VS_KENNEN_KOENNEN,
  MOEGEN_CONJUGATION,
  NEGATION_FULL_RULES,
  NICHT_POSITIONS,
  D_T_STEM_VERBS,
  TANZEN_CONJUGATION,
} from '../data/lesson05Data';
import { AudioButton } from './AudioButton';
import { CheckCircle, AlertTriangle, BookOpen, Layers, ArrowRight, ShieldCheck, Compass, HelpCircle } from 'lucide-react';

export const Bloco1Grammar05: React.FC = () => {
  return (
    <section id="bloco-1-gramatica-rodada5" className="space-y-12">
      {/* Banner de Abertura */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada 05
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 005 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomia Gramatical Pura & Sintaxe Rígida
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Sistema integral das 4 preposições locais (<em>aus, in, bei, nach</em>), alternâncias vocálicas complexas (<em>fahren, nehmen, essen, lesen, sehen, sprechen</em>),
          o pretérito-presente <em>wissen</em> vs. <em>kennen</em> vs. <em>können</em>, o modal <em>mögen</em>, regras rígidas de posicionamento da negação com <em>nicht/kein</em>,
          epêntese consonantal em <em>-t/-d</em> e a neutralização sibilante em <em>tanzen</em>.
        </p>
      </div>

      {/* 1.1 As Preposições Locais — Sistema Completo (aus, in, bei, nach) */}
      <div id="secao-1-1-preposicoes-locais" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              Seção 1.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Preposições Locais — Sistema Completo (<em>aus, in, bei, nach</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O alemão possui quatro preposições locais fundamentais que regem o caso Dativo. Cada uma expressa uma relação espacial estrita e inequívoca.
            </p>
          </div>
          <AudioButton
            text="Ich komme aus Italien. Ich wohne in Berlin. Ich arbeite bei Siemens. Ich fahre nach Italien."
            lang="de-DE"
            label="Ouvir 4 Preposições Locais"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Tabela Comparativa das 4 Preposições */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" />
              Tabela Comparativa do Sistema Espacial
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">Preposição</th>
                    <th className="py-3 px-4 font-semibold">Caso</th>
                    <th className="py-3 px-4 font-semibold">Pergunta</th>
                    <th className="py-3 px-4 font-semibold">Uso Estrutural</th>
                    <th className="py-3 px-4 font-semibold">Exemplo Canônico</th>
                    <th className="py-3 px-4 font-semibold">Tradução</th>
                    <th className="py-3 px-4 font-semibold text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {LOCAL_PREPOSITIONS_FULL.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-3 px-4 font-bold font-mono text-teal-700 text-base">{item.prep}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{item.caso}</td>
                      <td className="py-3 px-4 font-mono text-xs text-indigo-700">{item.pergunta}</td>
                      <td className="py-3 px-4 text-slate-600">{item.uso}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{item.exemplo}</td>
                      <td className="py-3 px-4 text-slate-600">{item.traducao}</td>
                      <td className="py-3 px-4 text-center">
                        <AudioButton text={item.exemplo} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Diferença Crucial: in vs nach */}
          <div className="bg-teal-50/60 rounded-xl p-5 border border-teal-200">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Diferença Crucial: <em>in</em> vs. <em>nach</em> (Lugar Estático vs. Direção / Países com Artigo)
            </h4>
            <div className="overflow-x-auto rounded-lg border border-teal-200 bg-white">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-100/70 text-teal-950 border-b border-teal-200">
                    <th className="py-2.5 px-3 font-semibold">Contexto</th>
                    <th className="py-2.5 px-3 font-semibold">Preposição & Caso</th>
                    <th className="py-2.5 px-3 font-semibold">Exemplo</th>
                    <th className="py-2.5 px-3 font-semibold">Tradução</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-100">
                  {IN_VS_NACH_COMPARISON.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-teal-50/30'}>
                      <td className="py-2 px-3 font-medium text-slate-800">{row.contexto}</td>
                      <td className="py-2 px-3 font-mono text-xs font-semibold text-teal-800">{row.preposicao}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">{row.exemplo}</td>
                      <td className="py-2 px-3 text-slate-600">{row.traducao}</td>
                      <td className="py-2 px-3 text-center">
                        <AudioButton text={row.exemplo} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-teal-900 leading-relaxed bg-white/80 p-3 rounded-lg border border-teal-200">
              <strong>Trava de contraste com o Português:</strong> Em português usamos "em" para lugar e "para" para direção. Em alemão, <em>in</em> pode ser usado para ambos, mas o <strong>caso muda</strong>: Dativo para lugar estático (<em>wo?</em>) e Acusativo para movimento/direção (<em>wohin?</em>). Para países neutros sem artigo (Alemanha, Brasil, Itália), usa-se invariavelmente <em>nach</em> para direção.
            </div>
          </div>

          {/* Contrações Obrigatórias */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Contrações Obrigatórias de Preposição + Artigo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {PREPOSITION_CONTRACTIONS.map((c, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 font-mono">{c.prepArtigo}</span>
                    <span className="font-bold text-base text-teal-700 font-mono bg-teal-100 px-2 py-0.5 rounded">
                      {c.contracao}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-900 flex items-center justify-between gap-1 mt-2">
                    <span>{c.exemplo}</span>
                    <AudioButton text={c.exemplo} lang="de-DE" size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{c.traducao}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 O Verbo fahren (dirigir/ir) — Alternância Vocálica a → ä */}
      <div id="secao-1-2-verbo-fahren" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Verbo <em>fahren</em> (dirigir/ir) — Alternância Vocálica <em>a → ä</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Verbos fortes com <em>a</em> no radical sofrem metafonia (trema) exclusivamente na <strong>2ª e 3ª pessoas do singular</strong>. As demais pessoas mantêm o radical intacto.
            </p>
          </div>
          <AudioButton
            text="ich fahre, du fährst, er fährt, wir fahren, ihr fahrt, sie fahren. Du fährst nach Berlin."
            lang="de-DE"
            label="Ouvir fahren"
          />
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Matriz de fahren */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Conjugação Completa — <em>fahren</em> (Präsens)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold">Pronome</th>
                    <th className="py-2.5 px-4 font-semibold">Forma</th>
                    <th className="py-2.5 px-4 font-semibold">Observação Morfológica</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {FAHREN_CONJUGATION.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-mono font-medium text-slate-700">{row.pronome}</td>
                      <td className="py-2.5 px-4 font-bold text-indigo-700 text-base">{row.forma}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">{row.observacao}</td>
                      <td className="py-2.5 px-4 text-center">
                        <AudioButton text={`${row.pronome.split(' ')[0]} ${row.forma}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Outros Verbos com a -> ä */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Outros Verbos Canônicos com Alternância <em>a → ä</em>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold">Infinitivo</th>
                    <th className="py-2 px-3 font-semibold">2ª Sg. (du)</th>
                    <th className="py-2 px-3 font-semibold">3ª Sg. (er/sie)</th>
                    <th className="py-2 px-3 font-semibold">Tradução</th>
                    <th className="py-2 px-3 font-semibold text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {OTHER_A_TO_AE_VERBS.map((v, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">{v.infinitivo}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.du}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.er}</td>
                      <td className="py-2 px-3 text-slate-600">{v.traducao}</td>
                      <td className="py-2 px-3 text-center">
                        <AudioButton text={`${v.infinitivo}: du ${v.du}, er ${v.er}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 O Verbo nehmen (pegar/tomar) — Irregularidade Dupla */}
      <div id="secao-1-3-verbo-nehmen" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Verbo <em>nehmen</em> (pegar/tomar) — Irregularidade Dupla (<em>e → i</em> + Consoante Dobrada)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              <em>nehmen</em> sofre dupla mutação: a vogal radical troca de <em>e</em> para <em>i</em>, e o fonema <em>-h-</em> transforma-se na consoante duplicada <em>-mm-</em> (tornando a vogal curta).
            </p>
          </div>
          <AudioButton
            text="ich nehme, du nimmst, er nimmt, wir nehmen, ihr nehmt, sie nehmen. Nimmst du den Bus?"
            lang="de-DE"
            label="Ouvir nehmen"
          />
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Conjugação Completa — <em>nehmen</em>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold">Pronome</th>
                    <th className="py-2.5 px-4 font-semibold">Forma</th>
                    <th className="py-2.5 px-4 font-semibold">Mecanismo</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {NEHMEN_CONJUGATION.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-mono font-medium text-slate-700">{row.pronome}</td>
                      <td className="py-2.5 px-4 font-bold text-indigo-700 text-base">{row.forma}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">{row.observacao}</td>
                      <td className="py-2.5 px-4 text-center">
                        <AudioButton text={`${row.pronome.split(' ')[0]} ${row.forma}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Verbos com <em>e → i</em> + Dobra Consonântica
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold">Infinitivo</th>
                    <th className="py-2 px-3 font-semibold">2ª Sg. (du)</th>
                    <th className="py-2 px-3 font-semibold">3ª Sg. (er/sie)</th>
                    <th className="py-2 px-3 font-semibold">Tradução</th>
                    <th className="py-2 px-3 font-semibold text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {DOUBLE_CONSONANT_CHANGE_VERBS.map((v, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">{v.infinitivo}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.du}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.er}</td>
                      <td className="py-2 px-3 text-slate-600">{v.traducao}</td>
                      <td className="py-2 px-3 text-center">
                        <AudioButton text={`${v.infinitivo}: du ${v.du}, er ${v.er}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 1.4 & 1.5 essen, lesen, sehen, sprechen */}
      <div id="secao-1-4-essen-e-verbos-fortes" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 1.4 & 1.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Verbo <em>essen</em> e as Alternâncias <em>e → ie</em> vs. <em>e → i</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              <em>essen</em> tem 2ª e 3ª pessoas do singular <strong>rigorosamente idênticas</strong> (<em>du isst, er isst</em>) pela fusão da sibilante. Verbos como <em>lesen</em> e <em>sehen</em> geram ditongo longo <em>ie</em>, enquanto <em>sprechen</em> e <em>geben</em> produzem <em>i</em> curto.
            </p>
          </div>
          <AudioButton
            text="ich esse, du isst, er isst, wir essen, ihr esst, sie essen. Du liest, er sieht, du sprichst, er gibt."
            lang="de-DE"
            label="Ouvir essen e Alternâncias"
          />
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Conjugação de essen */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Conjugação de <em>essen</em> (fusão sibilante)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold">Pronome</th>
                    <th className="py-2.5 px-4 font-semibold">Forma</th>
                    <th className="py-2.5 px-4 font-semibold">Observação</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ESSEN_CONJUGATION.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-mono font-medium text-slate-700">{row.pronome}</td>
                      <td className="py-2.5 px-4 font-bold text-indigo-700 text-base">{row.forma}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">{row.observacao}</td>
                      <td className="py-2.5 px-4 text-center">
                        <AudioButton text={`${row.pronome.split(' ')[0]} ${row.forma}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panorama de e -> ie / i */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Verbos Fortes com <em>e → ie</em> ou <em>e → i</em>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold">Infinitivo</th>
                    <th className="py-2 px-3 font-semibold">Tipo</th>
                    <th className="py-2 px-3 font-semibold">2ª Sg. (du)</th>
                    <th className="py-2 px-3 font-semibold">3ª Sg. (er)</th>
                    <th className="py-2 px-3 font-semibold">Tradução</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {E_TO_IE_I_VERBS.map((v, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">{v.infinitivo}</td>
                      <td className="py-2 px-3 font-mono font-semibold text-teal-700">{v.tipo}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.du}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.er}</td>
                      <td className="py-2 px-3 text-slate-600">{v.traducao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 1.6 & 1.7 wissen vs kennen vs können & mögen */}
      <div id="secao-1-6-wissen-e-moegen" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 1.6 & 1.7
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Pretérito-Presente <em>wissen</em> e o Verbo Modal <em>mögen</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              <em>wissen</em> expressa conhecimento factual (<em>Ich weiß die Antwort</em>), enquanto <em>kennen</em> expressa familiaridade com pessoas e lugares (<em>Ich kenne Berlin</em>). <em>mögen</em> introduz apreço direto por substantivos.
            </p>
          </div>
          <AudioButton
            text="ich weiß, du weißt, er weiß, wir wissen. Ich kenne Berlin. Ich mag Kaffee. Ich spiele gern Fußball."
            lang="de-DE"
            label="Ouvir wissen e mögen"
          />
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* wissen conjugação & comparação */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Conjugação de <em>wissen</em> (Pretérito-Presente)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold">Pronome</th>
                    <th className="py-2 px-3 font-semibold">Forma</th>
                    <th className="py-2 px-3 font-semibold">Observação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {WISSEN_CONJUGATION.map((w, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-mono font-medium text-slate-700">{w.pronome}</td>
                      <td className="py-2 px-3 font-bold text-indigo-700">{w.forma}</td>
                      <td className="py-2 px-3 text-slate-600">{w.observacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                Diferença Vital: wissen vs. kennen vs. können
              </div>
              {WISSEN_VS_KENNEN_KOENNEN.map((wk, i) => (
                <div key={i} className="flex justify-between border-b border-amber-100 pb-1">
                  <span><strong>{wk.verbo}</strong>: {wk.uso}</span>
                  <span className="font-mono text-amber-900">{wk.exemplo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* mögen conjugação e gern vs mögen */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Conjugação de <em>mögen</em> (gostar de algo)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold">Pronome</th>
                    <th className="py-2 px-3 font-semibold">Forma</th>
                    <th className="py-2 px-3 font-semibold">Mecanismo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {MOEGEN_CONJUGATION.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-mono font-medium text-slate-700">{m.pronome}</td>
                      <td className="py-2 px-3 font-bold text-indigo-700">{m.forma}</td>
                      <td className="py-2 px-3 text-slate-600">{m.observacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800">Diferença Estrutural: <em>gern</em> + Verbo vs. <em>mögen</em> + Substantivo</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <div className="font-semibold text-indigo-700">gern + Verbo</div>
                  <div className="text-slate-600">Gostar de <strong>fazer</strong> uma ação.</div>
                  <div className="font-mono text-slate-900 mt-1">Ich spiele gern Fußball.</div>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <div className="font-semibold text-teal-700">mögen + Substantivo</div>
                  <div className="text-slate-600">Gostar do <strong>objeto/coisa</strong>.</div>
                  <div className="font-mono text-slate-900 mt-1">Ich mag Fußball / Kaffee.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.8 A Negação com nicht e kein — Revisão e Aprofundamento */}
      <div id="secao-1-8-negacao-revisao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.8
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              A Negação com <em>nicht</em> e <em>kein</em> — Sintaxe e Posicionamento Preciso
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Regra de ouro: <em>kein</em> é exclusivo para substantivos indeterminados. Tudo o mais — verbos, adjetivos, advérbios e substantivos definidos — nega-se com <em>nicht</em>.
            </p>
          </div>
          <AudioButton
            text="Ich arbeite nicht. Ich habe keinen Drucker. Das ist nicht mein Buch. Ich kann nicht kommen."
            lang="de-DE"
            label="Ouvir Exemplos de Negação"
          />
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Matriz de Seleção: <em>nicht</em> vs. <em>kein</em>
            </h4>
            <div className="space-y-2.5">
              {NEGATION_FULL_RULES.map((rule, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {rule.particula}
                    </span>
                  </div>
                  <p className="text-slate-700 mb-1"><strong>Aplica-se a:</strong> {rule.uso}</p>
                  <div className="font-mono text-slate-900 bg-white p-2 rounded border border-slate-200 flex justify-between items-center">
                    <span>{rule.exemplo}</span>
                    <AudioButton text={rule.exemplo} lang="de-DE" size="sm" />
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{rule.traducao}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Posição Rigorosa de <em>nicht</em> na Topologia da Frase
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-semibold">Elemento Negado</th>
                    <th className="py-2.5 px-3 font-semibold">Posição Sintática</th>
                    <th className="py-2.5 px-3 font-semibold">Exemplo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {NICHT_POSITIONS.map((pos, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{pos.tipo}</td>
                      <td className="py-2.5 px-3 text-slate-600">{pos.posicao}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-indigo-700">{pos.exemplo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 1.9 & 1.10 Verbos em -t/-d e tanzen */}
      <div id="secao-1-9-verbos-td-e-tanzen" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 1.9 & 1.10
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Verbos com Radical em <em>-t/-d</em> e a Neutralização Sibilante de <em>tanzen</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Para evitar encontros consonantais impronunciáveis, verbos com radical terminado em <em>-t</em> ou <em>-d</em> inserem um <em>-e-</em> epentético. Em contrapartida, verbos em <em>-z</em> (sibilantes) fundem a desinência <em>-st</em> em apenas <em>-t</em>.
            </p>
          </div>
          <AudioButton
            text="du arbeitest, er arbeitet. Du tanzt, er tanzt."
            lang="de-DE"
            label="Ouvir arbeitest e tanzt"
          />
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Epêntese de <em>-e-</em> em Radicais em <em>-t/-d</em>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold">Infinitivo</th>
                    <th className="py-2 px-3 font-semibold">2ª Sg. (du)</th>
                    <th className="py-2 px-3 font-semibold">3ª Sg. (er/sie)</th>
                    <th className="py-2 px-3 font-semibold">Significado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {D_T_STEM_VERBS.map((v, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">{v.infinitivo}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.du}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">{v.er}</td>
                      <td className="py-2 px-3 text-slate-600">{v.traducao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              O Verbo <em>tanzen</em> — Comportamento Sibilante (<em>-z</em>)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold">Pessoa</th>
                    <th className="py-2 px-3 font-semibold">Forma</th>
                    <th className="py-2 px-3 font-semibold">Fenômeno</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TANZEN_CONJUGATION.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-mono text-slate-700">{r.pronome}</td>
                      <td className="py-2 px-3 font-mono font-bold text-indigo-700">{r.forma}</td>
                      <td className="py-2 px-3 text-slate-500">
                        {r.pronome.includes('du') || r.pronome.includes('er')
                          ? 'Idêntico (du tanzt = er tanzt)'
                          : 'Regular'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>Regra de Sibilantes:</strong> Verbos com radical em <em>-s, -ß, -z</em> ou <em>-x</em> perdem o <em>s</em> na terminação de 2ª pessoa do singular (<em>-st → -t</em>), resultando em homofonia perfeita entre <em>du</em> e <em>er/sie/es</em>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
