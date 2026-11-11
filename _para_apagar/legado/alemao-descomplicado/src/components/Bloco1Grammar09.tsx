import React, { useState } from 'react';
import {
  OVERVIEW_GROUPS,
  GROUP_1_VERBS,
  GROUP_1_EXAMPLES,
  GROUP_1_EXPRESSIONS,
  GROUP_2_VERBS,
  GROUP_2_EXAMPLES,
  GROUP_2_EXPRESSIONS,
  SPECIAL_VERBS_GROUP_3,
  LESSON_09_METADATA,
} from '../data/lesson09Data';
import { AudioButton } from './AudioButton';
import {
  BookOpen,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookmarkCheck,
  Zap,
  ArrowRight,
  Info,
  HelpCircle,
} from 'lucide-react';

export const Bloco1Grammar09: React.FC = () => {
  const [selectedSpecialVerb, setSelectedSpecialVerb] = useState<string>('wissen');

  const activeSpecialVerb =
    SPECIAL_VERBS_GROUP_3.find((v) => v.verb === selectedSpecialVerb) ||
    SPECIAL_VERBS_GROUP_3[0];

  return (
    <section id="bloco-1-gramatica-rodada9" className="space-y-12">
      {/* Banner Principal da Aula 09 */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada Extra 09
          </span>
          <span className="text-xs text-rose-200 font-medium">{LESSON_09_METADATA.day}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Os Verbos de Mudança Vocálica e Irregulares do Presente
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 font-normal leading-relaxed">
          Anatomia completa dos 18 verbos de maior frequência comunicativa: <strong className="text-rose-300">waschen, lassen, fangen, raten, halten, nehmen, treffen, essen, vergessen, helfen, werfen, sterben, wissen, mögen, reden, warten, baden, bilden</strong>. Domine a alternância no radical nas 2ª e 3ª pessoas, peculiaridades ortográficas de sibilantes e duplicações, e diferenças de sentido fundamentais.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 1.1 VISÃO GERAL — POR QUE ESSES VERBOS SÃO ESPECIAIS?                       */}
      {/* ========================================================================= */}
      <div id="secao-1-1-visao-geral" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider font-mono">
              Seção 1.1 · Arquitetura dos Verbos
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Visão Geral — Por que esses verbos são especiais?
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          No presente do indicativo alemão (<em>Präsens</em>), certos verbos fortes sofrem mutação no núcleo da raiz vocálica ou apresentam comportamentos morfológicos únicos. Eles se dividem estrategicamente em três grupos:
        </p>

        {/* Tabela dos 3 Grupos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OVERVIEW_GROUPS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold font-mono mb-2 border ${item.badgeColor}`}>
                  {item.grupo}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{item.caracteristica}</h4>
                <p className="text-xs text-slate-600 mt-2 font-mono bg-white p-2 rounded-lg border border-slate-200/80">
                  {item.verbos}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 text-xs text-slate-600">
                <p>{item.regra}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alerta de Ouro */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="font-bold text-amber-900">Atenção Absoluta (Regra Áurea):</strong> A alternância vocálica ocorre <strong>exclusivamente</strong> na 2ª pessoa do singular (<em>du</em>) e na 3ª pessoa do singular (<em>er / sie / es / man</em>). Nas demais pessoas (<em>ich, wir, ihr, sie / Sie</em>), o radical permanece estritamente regular e inalterado!
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1.2 GRUPO 1 — VERBOS COM a → ä                                            */}
      {/* ========================================================================= */}
      <div id="secao-1-2-grupo-1-a-ae" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">
              Seção 1.2 · Grupo 1
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Verbos com Alternância Vocálica a → ä
            </h3>
            <p className="text-xs text-slate-500">
              waschen (lavar), lassen (deixar), fangen (pegar), raten (aconselhar), halten (parar/segurar)
            </p>
          </div>
        </div>

        {/* Tabela Completa de Conjugação Grupo 1 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
              Tabela Completa de Conjugação (Präsens)
            </h4>
            <span className="text-xs text-slate-400 font-mono">a → ä em du & er/sie/es</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-xs">
                  <th className="p-3 border-r border-slate-800">Pessoa</th>
                  <th className="p-3 border-r border-slate-800">waschen <span className="font-normal text-slate-400">(lavar)</span></th>
                  <th className="p-3 border-r border-slate-800">lassen <span className="font-normal text-slate-400">(deixar)</span></th>
                  <th className="p-3 border-r border-slate-800">fangen <span className="font-normal text-slate-400">(pegar)</span></th>
                  <th className="p-3 border-r border-slate-800">raten <span className="font-normal text-slate-400">(aconselhar)</span></th>
                  <th className="p-3">halten <span className="font-normal text-slate-400">(parar/segurar)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">ich</td>
                  <td className="p-3 border-r border-slate-200">wasche</td>
                  <td className="p-3 border-r border-slate-200">lasse</td>
                  <td className="p-3 border-r border-slate-200">fange</td>
                  <td className="p-3 border-r border-slate-200">rate</td>
                  <td className="p-3">halte</td>
                </tr>
                <tr className="bg-amber-50/60 font-bold hover:bg-amber-50">
                  <td className="p-3 text-amber-900 border-r border-slate-200">du</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">wäschst</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">lässt</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">fängst</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">rätst</td>
                  <td className="p-3 text-amber-900">hältst</td>
                </tr>
                <tr className="bg-amber-50/60 font-bold hover:bg-amber-50">
                  <td className="p-3 text-amber-900 border-r border-slate-200">er / sie / es / man</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">wäscht</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">lässt</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">fängt</td>
                  <td className="p-3 text-amber-900 border-r border-slate-200">rät</td>
                  <td className="p-3 text-amber-900">hält</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">wir</td>
                  <td className="p-3 border-r border-slate-200">waschen</td>
                  <td className="p-3 border-r border-slate-200">lassen</td>
                  <td className="p-3 border-r border-slate-200">fangen</td>
                  <td className="p-3 border-r border-slate-200">raten</td>
                  <td className="p-3">halten</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">ihr</td>
                  <td className="p-3 border-r border-slate-200">wascht</td>
                  <td className="p-3 border-r border-slate-200">lasst</td>
                  <td className="p-3 border-r border-slate-200">fangt</td>
                  <td className="p-3 border-r border-slate-200">ratet</td>
                  <td className="p-3">haltet</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">sie / Sie</td>
                  <td className="p-3 border-r border-slate-200">waschen</td>
                  <td className="p-3 border-r border-slate-200">lassen</td>
                  <td className="p-3 border-r border-slate-200">fangen</td>
                  <td className="p-3 border-r border-slate-200">raten</td>
                  <td className="p-3">halten</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Exemplos do Dia a Dia Grupo 1 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Exemplos do Dia a Dia com Áudios
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GROUP_1_EXAMPLES.map((ex, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex items-start justify-between gap-3 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {ex.verbo}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">{ex.contexto}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 font-mono">{ex.fraseDe}</p>
                  <p className="text-xs text-slate-600">{ex.frasePt}</p>
                </div>
                <AudioButton text={ex.fraseDe} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Expressões Fixas Grupo 1 */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-slate-50 border border-amber-200/80 space-y-4">
          <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wider font-mono flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-amber-600" />
            Expressões Fixas e Idiomáticas (Grupo 1)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GROUP_1_EXPRESSIONS.map((exp, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-2xs space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-amber-700 uppercase">{exp.contexto}</span>
                    <AudioButton text={exp.expressaoDe} lang="de-DE" size="sm" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-1">{exp.expressaoDe}</p>
                </div>
                <p className="text-xs text-slate-600 border-t border-slate-100 pt-1">{exp.expressaoPt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1.3 GRUPO 2 — VERBOS COM e → i / ie                                       */}
      {/* ========================================================================= */}
      <div id="secao-1-3-grupo-2-e-i" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">
              Seção 1.3 · Grupo 2
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Verbos com Alternância Vocálica e → i / ie
            </h3>
            <p className="text-xs text-slate-500">
              nehmen, treffen, essen, vergessen, helfen, werfen, sterben
            </p>
          </div>
        </div>

        {/* Tabela Completa Grupo 2 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
              Tabela Completa de Conjugação (Subgrupo 2A: e → i)
            </h4>
            <span className="text-xs text-slate-400 font-mono">e → i em du & er/sie/es</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-xs">
                  <th className="p-3 border-r border-slate-800">Pessoa</th>
                  <th className="p-3 border-r border-slate-800">nehmen <span className="font-normal text-slate-400">(pegar)</span></th>
                  <th className="p-3 border-r border-slate-800">treffen <span className="font-normal text-slate-400">(encontrar)</span></th>
                  <th className="p-3 border-r border-slate-800">essen <span className="font-normal text-slate-400">(comer)</span></th>
                  <th className="p-3 border-r border-slate-800">vergessen <span className="font-normal text-slate-400">(esquecer)</span></th>
                  <th className="p-3 border-r border-slate-800">helfen <span className="font-normal text-slate-400">(ajudar)</span></th>
                  <th className="p-3 border-r border-slate-800">werfen <span className="font-normal text-slate-400">(jogar)</span></th>
                  <th className="p-3">sterben <span className="font-normal text-slate-400">(morrer)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">ich</td>
                  <td className="p-3 border-r border-slate-200">nehme</td>
                  <td className="p-3 border-r border-slate-200">treffe</td>
                  <td className="p-3 border-r border-slate-200">esse</td>
                  <td className="p-3 border-r border-slate-200">vergesse</td>
                  <td className="p-3 border-r border-slate-200">helfe</td>
                  <td className="p-3 border-r border-slate-200">werfe</td>
                  <td className="p-3">sterbe</td>
                </tr>
                <tr className="bg-emerald-50/60 font-bold hover:bg-emerald-50">
                  <td className="p-3 text-emerald-900 border-r border-slate-200">du</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">nimmst</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">triffst</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">isst</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">vergisst</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">hilfst</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">wirfst</td>
                  <td className="p-3 text-emerald-900">stirbst</td>
                </tr>
                <tr className="bg-emerald-50/60 font-bold hover:bg-emerald-50">
                  <td className="p-3 text-emerald-900 border-r border-slate-200">er / sie / es / man</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">nimmt</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">trifft</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">isst</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">vergisst</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">hilft</td>
                  <td className="p-3 text-emerald-900 border-r border-slate-200">wirft</td>
                  <td className="p-3 text-emerald-900">stirbt</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">wir</td>
                  <td className="p-3 border-r border-slate-200">nehmen</td>
                  <td className="p-3 border-r border-slate-200">treffen</td>
                  <td className="p-3 border-r border-slate-200">essen</td>
                  <td className="p-3 border-r border-slate-200">vergessen</td>
                  <td className="p-3 border-r border-slate-200">helfen</td>
                  <td className="p-3 border-r border-slate-200">werfen</td>
                  <td className="p-3">sterben</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">ihr</td>
                  <td className="p-3 border-r border-slate-200">nehmt</td>
                  <td className="p-3 border-r border-slate-200">trefft</td>
                  <td className="p-3 border-r border-slate-200">esst</td>
                  <td className="p-3 border-r border-slate-200">vergesst</td>
                  <td className="p-3 border-r border-slate-200">helft</td>
                  <td className="p-3 border-r border-slate-200">werft</td>
                  <td className="p-3">sterbt</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">sie / Sie</td>
                  <td className="p-3 border-r border-slate-200">nehmen</td>
                  <td className="p-3 border-r border-slate-200">treffen</td>
                  <td className="p-3 border-r border-slate-200">essen</td>
                  <td className="p-3 border-r border-slate-200">vergessen</td>
                  <td className="p-3 border-r border-slate-200">helfen</td>
                  <td className="p-3 border-r border-slate-200">werfen</td>
                  <td className="p-3">sterben</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Caixas de Atenção Cirúrgica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Atenção: essen & vergessen (Sibilantes)</span>
            </div>
            <p className="text-xs text-blue-950 leading-relaxed">
              Como o radical termina em <em>-ss</em>, a terminação regular <em>-st</em> perde o <em>s</em> na 2ª pessoa. Por isso, a 2ª e a 3ª pessoas do singular tornam-se <strong>idênticas</strong>:
              <br />
              <strong className="font-mono">du isst = er isst</strong> | <strong className="font-mono">du vergisst = er vergisst</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <Info className="w-4 h-4 text-rose-600" />
              <span>Atenção: nehmen (Duplicação do "m")</span>
            </div>
            <p className="text-xs text-rose-950 leading-relaxed">
              O verbo <em>nehmen</em> sofre um encurtamento vocálico acompanhado da <strong>duplicação da consoante</strong> na 2ª e 3ª pessoas:
              <br />
              <strong className="font-mono">du nimmst</strong> | <strong className="font-mono">er nimmt</strong>. No imperativo também: <strong className="font-mono">Nimm!</strong>
            </p>
          </div>
        </div>

        {/* Exemplos do Dia a Dia Grupo 2 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Exemplos do Dia a Dia com Áudios (Grupo 2)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GROUP_2_EXAMPLES.map((ex, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex items-start justify-between gap-2 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      {ex.verbo}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">{ex.contexto}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 font-mono">{ex.fraseDe}</p>
                  <p className="text-xs text-slate-600">{ex.frasePt}</p>
                </div>
                <AudioButton text={ex.fraseDe} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Expressões Fixas Grupo 2 */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50/60 via-teal-50/40 to-slate-50 border border-emerald-200/80 space-y-4">
          <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wider font-mono flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            Expressões Fixas e Idiomáticas (Grupo 2)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GROUP_2_EXPRESSIONS.map((exp, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-emerald-200/60 shadow-2xs space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-emerald-700 uppercase">{exp.contexto}</span>
                    <AudioButton text={exp.expressaoDe} lang="de-DE" size="sm" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-1">{exp.expressaoDe}</p>
                </div>
                <p className="text-xs text-slate-600 border-t border-slate-100 pt-1">{exp.expressaoPt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1.4 GRUPO 3 — VERBOS IRREGULARES E REGULARES ESPECIAIS                    */}
      {/* ========================================================================= */}
      <div id="secao-1-4-grupo-3-irregulares" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-mono">
              Seção 1.4 · Grupo 3
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Verbos Irregulares (sem alternância vocálica tradicional) e Regulares Especiais
            </h3>
            <p className="text-xs text-slate-500">
              wissen, mögen, reden, warten, baden, bilden
            </p>
          </div>
        </div>

        {/* Seletor de Abas para os 6 Verbos */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {SPECIAL_VERBS_GROUP_3.map((v) => (
            <button
              key={v.verb}
              onClick={() => setSelectedSpecialVerb(v.verb)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                selectedSpecialVerb === v.verb
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {v.verb} ({v.translation.split(' ')[0]})
            </button>
          ))}
        </div>

        {/* Card Detalhado do Verbo Selecionado */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900 font-mono">{activeSpecialVerb.verb}</h4>
                <span className="text-xs font-medium text-slate-600">({activeSpecialVerb.translation})</span>
              </div>
              <p className="text-xs text-indigo-700 font-semibold mt-0.5">{activeSpecialVerb.category}</p>
            </div>
            <AudioButton text={activeSpecialVerb.verb} lang="de-DE" size="md" label="Pronunciar Infinitivo" />
          </div>

          {/* Regra de Atenção */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Regra Chave: </strong>
              {activeSpecialVerb.attentionRule}
            </div>
          </div>

          {/* Tabela de Conjugação Individual */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { pronome: 'ich', forma: activeSpecialVerb.conjugation.ich },
              { pronome: 'du', forma: activeSpecialVerb.conjugation.du },
              { pronome: 'er/sie/es', forma: activeSpecialVerb.conjugation.erSieEs },
              { pronome: 'wir', forma: activeSpecialVerb.conjugation.wir },
              { pronome: 'ihr', forma: activeSpecialVerb.conjugation.ihr },
              { pronome: 'sie/Sie', forma: activeSpecialVerb.conjugation.sieSie },
            ].map((row, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center space-y-1">
                <span className="text-[11px] text-slate-500 font-mono uppercase block">{row.pronome}</span>
                <span className="text-base font-bold text-slate-900 font-mono block">{row.forma}</span>
                <AudioButton text={`${row.pronome} ${row.forma}`} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>

          {/* Diferença Crucial (se houver) */}
          {activeSpecialVerb.crucialDistinction && (
            <div className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-3">
              <h5 className="text-sm font-bold text-indigo-950 uppercase tracking-wider font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                {activeSpecialVerb.crucialDistinction.title}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeSpecialVerb.crucialDistinction.items.map((item, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-lg border border-indigo-100 shadow-2xs space-y-1.5">
                    <span className="text-xs font-bold font-mono text-indigo-800 uppercase px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 inline-block">
                      {item.term}
                    </span>
                    <p className="text-xs text-slate-700">{item.explanation}</p>
                    <p className="text-xs font-mono font-semibold text-slate-900 border-t border-slate-100 pt-1.5">
                      {item.example}
                    </p>
                    <AudioButton text={item.example} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guia de Uso (se houver) */}
          {activeSpecialVerb.usageGuide && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">Guia Sintático de Aplicação:</span>
              {activeSpecialVerb.usageGuide}
            </div>
          )}

          {/* Exemplos e Expressões do Verbo Selecionado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exemplos */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Exemplos Práticos com {activeSpecialVerb.verb}
              </h5>
              <div className="space-y-2">
                {activeSpecialVerb.examples.map((ex, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 font-mono">{ex.fraseDe}</p>
                      <p className="text-slate-600">{ex.frasePt} <span className="text-[10px] text-slate-400">({ex.contexto})</span></p>
                    </div>
                    <AudioButton text={ex.fraseDe} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Expressões Fixas */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Expressões Fixas com {activeSpecialVerb.verb}
              </h5>
              <div className="space-y-2">
                {activeSpecialVerb.expressions.map((exp, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 font-mono">{exp.expressaoDe}</p>
                      <p className="text-slate-600">{exp.expressaoPt} <span className="text-[10px] text-slate-400">({exp.contexto})</span></p>
                    </div>
                    <AudioButton text={exp.expressaoDe} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
