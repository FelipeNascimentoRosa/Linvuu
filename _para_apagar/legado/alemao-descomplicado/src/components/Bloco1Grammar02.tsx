import React from 'react';
import {
  CONJUGATION_SPRECHEN,
  CONJUGATION_EPENTHETIC_VERBS,
  NEGATION_MATRIX,
  POSSESSIVE_PRONOUNS_MATRIX,
  COUNTRY_CASE_MATRIX_02,
  NUMBER_RULES,
} from '../data/lesson02Data';
import { AudioButton } from './AudioButton';
import { Sparkles, ArrowRight, CheckCircle, AlertTriangle, BookOpen, Volume2 } from 'lucide-react';

export const Bloco1Grammar02: React.FC = () => {
  return (
    <section id="bloco-1-gramatica-rodada2" className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada 02
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 002 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomia Gramatical: Alternância Vocálica, Inflexões & Sistema Numérico
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Matriz estrutural da alternância vocálica (<em>e → i</em>), inserção do <em>-e-</em> epentético em verbos terminados em <em>-t/-d</em>,
          sistema de negação (<em>nicht</em> vs. <em>kein</em>), possessivos no nominativo e regência de países com dativo.
        </p>
      </div>

      {/* 1.1 Alternância Vocálica: sprechen (e -> i) */}
      <div id="secao-1-1-sprechen" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Alternância Vocálica: O Verbo Forte <em>sprechen</em> (e → i)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Em alemão, certos verbos fortes alteram a vogal temática do radical exclusivamente na <strong>2ª (du)</strong> e na <strong>3ª (er/sie/es)</strong> pessoa do singular.
            </p>
          </div>
          <AudioButton
            text="ich spreche, du sprichst, er spricht, sie spricht, wir sprechen, ihr sprecht, sie sprechen, Sie sprechen"
            lang="de-DE"
            size="sm"
            label="Ouvir Todas as Formas"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pessoa Gramatical</th>
                  <th className="py-3 px-4 font-bold">Pronome</th>
                  <th className="py-3 px-4">Morfologia & Decomposição</th>
                  <th className="py-3 px-4 font-mono font-bold text-indigo-900">Forma Conjugada</th>
                  <th className="py-3 px-4 text-right">Pronúncia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CONJUGATION_SPRECHEN.map((row, idx) => {
                  const isVowelChange = row.forma === 'sprichst' || row.forma === 'spricht';
                  return (
                    <tr key={idx} className={isVowelChange ? 'bg-amber-50/60 font-semibold' : 'hover:bg-slate-50/70'}>
                      <td className="py-2.5 px-4 text-slate-700">{row.pessoa}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.pronome}</td>
                      <td className="py-2.5 px-4 text-xs font-mono text-slate-600">{row.radicalDesinencia}</td>
                      <td className="py-2.5 px-4 font-mono text-base text-indigo-800">
                        {row.forma}
                        {isVowelChange && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                            e → i
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <AudioButton text={`${row.pronome} ${row.forma}`} lang="de-DE" size="xs" variant="icon-only" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
              <strong className="block font-semibold text-amber-900">Regra de Ouro da Alternância Vocálica:</strong>
              <p>
                A mudança <em>e → i</em> ocorre <strong>somente no singular (du, er, sie, es)</strong>. O plural (<em>wir sprechen</em>, <em>ihr sprecht</em>, <em>sie sprechen</em>) e a forma formal (<em>Sie sprechen</em>) preservam a vogal temática <strong>e</strong> intacta!
              </p>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 space-y-1">
              <strong className="block font-semibold text-rose-900">Armadilha Frequente:</strong>
              <p>
                Nunca conjugue <em>*du sprechst</em> ou <em>*er sprecht</em>. No dia a dia alemão, a forma errada soa estranha e rompe a norma padrão.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 Verbos com Radical em -t / -d (Inserção de -e- Epentético) */}
      <div id="secao-1-2-epentetico" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 1.2
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Verbos com Radical em <em>-t</em> ou <em>-d</em>: O <em>-e-</em> Epentético (arbeiten, landen)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Quando o radical verbal termina em oclusiva dental (<em>-t</em> ou <em>-d</em>), insere-se a vogal <strong>-e-</strong> de apoio entre o radical e a terminação (<em>-st</em> ou <em>-t</em>) para permitir a pronúncia.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pessoa</th>
                  <th className="py-3 px-4 font-bold">Pronome</th>
                  <th className="py-3 px-4 font-mono font-bold text-emerald-900">arbeiten (trabalhar)</th>
                  <th className="py-3 px-4 font-mono font-bold text-sky-900">landen (aterrissar)</th>
                  <th className="py-3 px-4">Justificativa Fonética</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs sm:text-sm">
                {CONJUGATION_EPENTHETIC_VERBS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-sans text-slate-600">{row.pessoa}</td>
                    <td className="py-2.5 px-4 font-sans font-bold text-slate-900">{row.pronome}</td>
                    <td className="py-2.5 px-4 text-emerald-800 font-semibold">{row.arbeiten}</td>
                    <td className="py-2.5 px-4 text-sky-800 font-semibold">{row.landen}</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600">{row.regra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
            <strong>Exemplo no texto A24:</strong> <em>Das Flugzeug <strong>landet</strong> in 10 Minuten.</em> (O avião aterrissa em 10 minutos).
            Como o radical é <em>land-</em>, recebe <em>-et</em> em vez de apenas <em>-t</em>.
          </div>
        </div>
      </div>

      {/* 1.3 Negação: nicht vs kein */}
      <div id="secao-1-3-negacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            Seção 1.3
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Negação em Alemão: A Distinção Rígida entre <em>nicht</em> e <em>kein</em>
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Não utilize <em>nicht</em> aleatoriamente. O alemão divide a negação em duas classes sintáticas estritas.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEGATION_MATRIX.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg text-sm font-bold font-mono bg-slate-900 text-white">
                    {item.tipo}
                  </span>
                  <span className="text-xs font-medium text-slate-500">Regra Funcional</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{item.funcao}</p>
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Exemplo:</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">{item.exemploAlemao}</p>
                  <p className="text-xs text-slate-500">{item.traducao}</p>
                </div>
                <p className="text-xs text-indigo-900 bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100">
                  <strong>Regra morfológica:</strong> {item.regra}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.4 Matriz de Pronomes Possessivos (Nominativo) */}
      <div id="secao-1-4-possessivos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-violet-600"></span>
              Seção 1.4
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Pronomes Possessivos no Caso Nominativo (p. 14)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O possessivo concorda em gênero e número com o substantivo que acompanha (<em>mein Nachbar</em> [masc.] vs. <em>meine Nachbarin</em> [fem.]).
            </p>
          </div>
          <AudioButton
            text="mein, deine, sein, ihre, unser, eure, ihr, Ihre"
            lang="de-DE"
            size="sm"
            label="Ouvir Exemplos"
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pronome Pessoal</th>
                  <th className="py-3 px-4 font-bold text-sky-900 bg-sky-50/50">Masculino (der)</th>
                  <th className="py-3 px-4 font-bold text-rose-900 bg-rose-50/50">Feminino (die)</th>
                  <th className="py-3 px-4 font-bold text-emerald-900 bg-emerald-50/50">Neutro (das)</th>
                  <th className="py-3 px-4 font-bold text-amber-900 bg-amber-50/50">Plural (die)</th>
                  <th className="py-3 px-4">Significado em Português</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs sm:text-sm">
                {POSSESSIVE_PRONOUNS_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-sans font-bold text-slate-900">{row.pronome}</td>
                    <td className="py-2.5 px-4 text-sky-800 bg-sky-50/20 font-semibold">{row.masc}</td>
                    <td className="py-2.5 px-4 text-rose-800 bg-rose-50/20 font-semibold">{row.fem}</td>
                    <td className="py-2.5 px-4 text-emerald-800 bg-emerald-50/20 font-semibold">{row.neutro}</td>
                    <td className="py-2.5 px-4 text-amber-800 bg-amber-50/20 font-semibold">{row.plural}</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600">{row.traducao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-950">
            <strong>Dica de Memorização:</strong> Para palavras femininas e no plural (como <em>die Muttersprache</em> ou <em>die Nachbarin</em>), o possessivo sempre termina com a vogal <strong>-e</strong>: <em>mein<strong>e</strong> Muttersprache</em>, <em>sein<strong>e</strong> Muttersprache</em>, <em>ihr<strong>e</strong> Muttersprache</em>.
          </div>
        </div>
      </div>

      {/* 1.5 Regência Preposicional com Países e Dativo */}
      <div id="secao-1-5-regencia" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            Seção 1.5
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Regência de Países: <em>aus</em> + Dativo e Países com Artigo Obrigatório
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            A preposição <strong>aus</strong> (origem) exige obrigatoriamente o caso <strong>Dativo</strong>. Para a maioria dos países neutros o artigo não aparece, mas para países femininos e plurais o artigo declinado é indispensável.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Categoria de País</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">Origem (aus + Dativo)</th>
                  <th className="py-3 px-4 font-bold text-teal-900">Localização (in + Dativo)</th>
                  <th className="py-3 px-4">Exemplos Práticos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COUNTRY_CASE_MATRIX_02.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.categoria}</td>
                    <td className="py-3 px-4 font-mono font-bold text-indigo-800 bg-indigo-50/30">{row.regenciaAus}</td>
                    <td className="py-3 px-4 font-mono font-bold text-teal-800 bg-teal-50/30">{row.regenciaIn}</td>
                    <td className="py-3 px-4 text-slate-600">{row.exemplos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1.6 Regras dos Números Compostos (0 a 10.000) */}
      <div id="secao-1-6-regras-numeros" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            Seção 1.6
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Regras Morfológicas dos Números Cardinais (0 a 10.000) — p. 15
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Mecanismo sintático de inversão de unidades e dezenas e grafia sem espaços.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NUMBER_RULES.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md inline-block">
                  Faixa: {item.regra}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.explicacao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
