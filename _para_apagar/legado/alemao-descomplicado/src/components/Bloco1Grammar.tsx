import React from 'react';
import {
  ShieldAlert,
  HelpCircle,
  Hash,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  V2_TOPOLOGICAL_MATRIX,
  CONTRAST_TRAPS_V2,
  W_FRAGEN_MATRIX,
  JA_NEIN_FRAGEN_MATRIX,
  CONJUGATION_KOMMEN,
  CONJUGATION_WOHNEN,
  CONJUGATION_HEISSEN,
  CONJUGATION_SEIN,
  CONJUGATION_ARBEITEN,
  PROFESSIONS_NO_ARTICLE,
  PROFESSIONS_GENDER,
  CARDINAL_NUMBERS,
} from '../data/lesson01Data';
import { AudioButton } from './AudioButton';

export const Bloco1Grammar: React.FC = () => {
  return (
    <section id="bloco-1-gramatica" className="space-y-12">
      {/* Bloco 1 Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Bloco 1 (60 Minutos)
          </span>
          <span className="text-xs text-slate-300 font-medium">Cronograma Teórico & Prático</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomia Gramatical Pura & Sintaxe Rígida
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Fundamentos invioláveis da oração alemã: regra V2, topologia de perguntas, matrizes completas de conjugação no
          presente (Präsens), regras morfofonológicas e convenções de gênero e numerais.
        </p>
      </div>

      {/* 1.1 A Regra de Ouro: V2 */}
      <div id="secao-1-1-v2" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 1.1
          </div>
          <h3 className="text-xl font-bold text-slate-900">A Regra de Ouro: A Posição II do Verbo (V2)</h3>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            O alemão é uma língua de <strong>verbo na segunda posição</strong> em orações declarativas. Isso significa
            que, em uma frase afirmativa neutra, o verbo conjugado ocupa <em>obrigatoriamente</em> a segunda posição
            sintática, independentemente de qual elemento ocupe a primeira posição.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Subheading */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-indigo-600" />
              Matriz Topológica da Oração Declarativa (Aussagesatz)
            </h4>

            {/* V2 Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Posição I (Vorfeld)</th>
                    <th className="py-3 px-4 bg-indigo-50/80 text-indigo-950 font-bold border-x border-indigo-100">
                      Posição II (Verbo Fixo)
                    </th>
                    <th className="py-3 px-4">Posição III (Sujeito Invertido)</th>
                    <th className="py-3 px-4">Mittelfeld (Complementos)</th>
                    <th className="py-3 px-4">Satzende (Fechamento)</th>
                    <th className="py-3 px-4 text-right">Áudio & Sentença</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {V2_TOPOLOGICAL_MATRIX.map((row, idx) => {
                    const fullSentence = `${row.vorfeld} ${row.verbo} ${row.sujeito === '—' ? '' : row.sujeito} ${
                      row.mittelfeld
                    }`.replace(/\s+/g, ' ').trim();
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900 bg-slate-50/40">
                          {row.vorfeld}
                        </td>
                        <td className="py-3 px-4 font-bold text-indigo-700 bg-indigo-50/40 border-x border-indigo-100">
                          {row.verbo}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {row.sujeito === '—' ? <span className="text-slate-300">—</span> : (
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
                              {row.sujeito}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-700">{row.mittelfeld}</td>
                        <td className="py-3 px-4 text-slate-400">{row.satzende}</td>
                        <td className="py-3 px-4 text-right">
                          <AudioButton text={fullSentence} lang="de-DE" size="xs" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Observação Crucial Box */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-sm text-amber-950 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold block text-amber-900">Observação crucial:</strong>
              <p className="leading-relaxed text-amber-900/90">
                Quando o <strong>Vorfeld (Posição I)</strong> é ocupado por um adjunto adverbial (ex.:{' '}
                <em>Jetzt</em>, <em>In Spanien</em>, <em>Heute</em>), o sujeito é obrigatoriamente deslocado para a{' '}
                <strong>Posição III</strong>, isto é, após o verbo conjugado. Em português, essa inversão é opcional e
                estilística; em alemão, é <strong>obrigatória e gramatical</strong>. Dizer{' '}
                <span className="line-through text-rose-700 font-medium">"Jetzt ich lerne Deutsch"</span> é erro grave de sintaxe.
              </p>
            </div>
          </div>

          {/* Trava de Contraste para Brasileiros */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Trava de Contraste para Brasileiros
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Português</th>
                    <th className="py-3 px-4 text-emerald-800 bg-emerald-50/50">Alemão Correto</th>
                    <th className="py-3 px-4 text-rose-800 bg-rose-50/50">Alemão Incorreto</th>
                    <th className="py-3 px-4">Fundamento Gramatical</th>
                    <th className="py-3 px-4 text-right">Ouvir Correto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONTRAST_TRAPS_V2.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-medium text-slate-700">{item.portugues}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700 bg-emerald-50/30">
                        {item.alemaoCorreto}
                      </td>
                      <td className="py-3 px-4 text-rose-700 line-through bg-rose-50/30 font-medium">
                        {item.alemaoIncorreto}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">{item.nota}</td>
                      <td className="py-3 px-4 text-right">
                        <AudioButton text={item.alemaoCorreto} lang="de-DE" size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Regra de ferro */}
            <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0">
                Regra de ferro
              </span>
              <span>
                Em alemão, o <strong>pronome pessoal nunca pode ser omitido</strong> em orações finitas. O português permite
                sujeito oculto (<em>pro-drop</em>); o alemão <strong>não permite</strong>.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 As W-Fragen & Ja-Nein-Fragen */}
      <div id="secao-1-2-perguntas" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Seção 1.2
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            As W-Fragen (Perguntas com Palavra Interrogativa) & Ja-Nein-Fragen
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Estruturas interrogativas fundamentais e o comportamento sintático do verbo conjugado.
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* W-Fragen */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                Matriz Topológica das W-Fragen
              </h4>
              <span className="text-xs text-slate-500">8 Questões Chave</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4 bg-sky-50/80 text-sky-950 font-bold">Posição I (W-Wort)</th>
                    <th className="py-3 px-4 bg-indigo-50/80 text-indigo-950 font-bold border-x border-indigo-100">
                      Posição II (Verbo Fixo)
                    </th>
                    <th className="py-3 px-4">Posição III (Sujeito)</th>
                    <th className="py-3 px-4">Mittelfeld</th>
                    <th className="py-3 px-4">Satzende</th>
                    <th className="py-3 px-4">Tradução em Português</th>
                    <th className="py-3 px-4 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {W_FRAGEN_MATRIX.map((row, idx) => {
                    const fullQuestion = `${row.vorfeld} ${row.verbo} ${row.sujeito} ${
                      row.mittelfeld === '—' ? '' : row.mittelfeld
                    }`.replace(/\s+/g, ' ').trim();
                    return (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-sky-800 bg-sky-50/30">{row.vorfeld}</td>
                        <td className="py-3 px-4 font-bold text-indigo-700 bg-indigo-50/30 border-x border-indigo-100">
                          {row.verbo}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">{row.sujeito}</td>
                        <td className="py-3 px-4 text-slate-500">{row.mittelfeld}</td>
                        <td className="py-3 px-4 text-slate-400">{row.satzende}</td>
                        <td className="py-3 px-4 text-xs text-slate-600 italic">{row.ptTranslation}</td>
                        <td className="py-3 px-4 text-right">
                          <AudioButton text={fullQuestion} lang="de-DE" size="xs" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-2.5 p-3 rounded-lg bg-sky-50/80 border border-sky-200 text-xs text-sky-900">
              <strong>Regra:</strong> O verbo conjugado ocupa a <strong>Posição II</strong> também nas W-Fragen. O elemento
              interrogativo (W-Wort) ocupa obrigatoriamente a Posição I.
            </div>
          </div>

          {/* Ja-Nein-Fragen */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              As Ja-Nein-Fragen (Perguntas de Sim/Não)
            </h4>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4 bg-indigo-50/80 text-indigo-950 font-bold border-r border-indigo-100">
                      Posição I (Verbo Fixo)
                    </th>
                    <th className="py-3 px-4 font-bold">Posição II (Sujeito)</th>
                    <th className="py-3 px-4">Mittelfeld</th>
                    <th className="py-3 px-4">Satzende</th>
                    <th className="py-3 px-4">Tradução em Português</th>
                    <th className="py-3 px-4 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {JA_NEIN_FRAGEN_MATRIX.map((row, idx) => {
                    const fullSentence = `${row.verbo} ${row.sujeito} ${row.mittelfeld}`;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-indigo-700 bg-indigo-50/30 border-r border-indigo-100">
                          {row.verbo}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{row.sujeito}</td>
                        <td className="py-3 px-4 text-slate-700">{row.mittelfeld}</td>
                        <td className="py-3 px-4 text-slate-400">{row.satzende}</td>
                        <td className="py-3 px-4 text-xs text-slate-600 italic">{row.ptTranslation}</td>
                        <td className="py-3 px-4 text-right">
                          <AudioButton text={fullSentence} lang="de-DE" size="xs" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-2.5 p-3 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950">
              <strong>Regra:</strong> Nas perguntas de sim/não (Ja-Nein-Fragen), o <strong>verbo conjugado ocupa a Posição I</strong>,
              e o sujeito ocupa a Posição II.
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 Matriz de Conjugação Exaustiva */}
      <div id="secao-1-3-conjugacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 1.3
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Matriz de Conjugação Exaustiva — Verbos Regulares & Irregulares no Präsens
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Padrões regulares, a regra morfofonológica das sibilantes, o verbo anômalo <em>sein</em> e a inserção de vogal
            de apoio em radicais terminados em <em>-t/-d</em>.
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Grid of 2 regular verbs: kommen & wohnen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Verbo kommen */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Verbo kommen (vir)</h4>
                  <span className="text-[11px] text-slate-500">Regular no Präsens</span>
                </div>
                <AudioButton text="kommen" lang="de-DE" size="xs" />
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase">
                    <th className="py-2 px-3">Pessoa</th>
                    <th className="py-2 px-3">Pronome</th>
                    <th className="py-2 px-3">Radical + Desinência</th>
                    <th className="py-2 px-3 font-bold text-indigo-700">Forma</th>
                    <th className="py-2 px-3 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONJUGATION_KOMMEN.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 text-slate-500">{r.pessoa}</td>
                      <td className="py-2 px-3 font-medium text-slate-800">{r.pronome}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono text-xs">{r.radicalDesinencia}</td>
                      <td className="py-2 px-3 font-bold text-indigo-700">{r.forma}</td>
                      <td className="py-2 px-3 text-right">
                        <AudioButton text={`${r.pronome} ${r.forma}`} lang="de-DE" size="xs" variant="icon-only" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Verbo wohnen */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Verbo wohnen (morar)</h4>
                  <span className="text-[11px] text-slate-500">Regular no Präsens</span>
                </div>
                <AudioButton text="wohnen" lang="de-DE" size="xs" />
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase">
                    <th className="py-2 px-3">Pessoa</th>
                    <th className="py-2 px-3">Pronome</th>
                    <th className="py-2 px-3">Radical + Desinência</th>
                    <th className="py-2 px-3 font-bold text-indigo-700">Forma</th>
                    <th className="py-2 px-3 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONJUGATION_WOHNEN.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 text-slate-500">{r.pessoa}</td>
                      <td className="py-2 px-3 font-medium text-slate-800">{r.pronome}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono text-xs">{r.radicalDesinencia}</td>
                      <td className="py-2 px-3 font-bold text-indigo-700">{r.forma}</td>
                      <td className="py-2 px-3 text-right">
                        <AudioButton text={`${r.pronome} ${r.forma}`} lang="de-DE" size="xs" variant="icon-only" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verbo heißen (Sibilante) */}
          <div className="rounded-xl border border-amber-200/90 overflow-hidden">
            <div className="bg-amber-50/80 px-4 py-2.5 border-b border-amber-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                  Verbo heißen (chamar-se) — <span className="text-amber-800 font-semibold">Sibilante!</span>
                </h4>
                <span className="text-[11px] text-amber-800/80">
                  Atenção à 2ª pessoa do singular (du heißt)
                </span>
              </div>
              <AudioButton text="heißen" lang="de-DE" size="xs" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase">
                    <th className="py-2 px-3">Pessoa</th>
                    <th className="py-2 px-3">Pronome</th>
                    <th className="py-2 px-3">Radical + Desinência</th>
                    <th className="py-2 px-3 font-bold text-indigo-700">Forma</th>
                    <th className="py-2 px-3 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONJUGATION_HEISSEN.map((r, i) => (
                    <tr
                      key={i}
                      className={r.pessoa === '2. Sg.' ? 'bg-amber-50/70 font-semibold' : 'hover:bg-slate-50/60'}
                    >
                      <td className="py-2 px-3 text-slate-500">{r.pessoa}</td>
                      <td className="py-2 px-3 font-medium text-slate-800">{r.pronome}</td>
                      <td className="py-2 px-3 font-mono text-xs text-slate-600">{r.radicalDesinencia}</td>
                      <td className="py-2 px-3 font-bold text-indigo-700">{r.forma}</td>
                      <td className="py-2 px-3 text-right">
                        <AudioButton text={`${r.pronome} ${r.forma}`} lang="de-DE" size="xs" variant="icon-only" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50/60 border-t border-amber-200/60 text-xs sm:text-sm text-amber-950">
              <strong className="text-amber-900 font-semibold">Regra morfofonológica das sibilantes:</strong> Verbos cujo radical termina
              em som sibilante (<strong>-s, -ß, -z, -x</strong>) não aceitam a desinência <em>-st</em> na 2ª pessoa do
              singular. Em vez disso, assumem apenas <em>-t</em>, o que torna a 2ª e a 3ª pessoa do singular morfologicamente
              idênticas (<strong>du heißt = er heißt</strong>). Isso vale para:{' '}
              <em>heißen, reisen, tanzen, sitzen, passen, mixen etc.</em>
            </div>
          </div>

          {/* Verbo sein & Verbo arbeiten */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Verbo sein (ser/estar) */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Verbo sein (ser/estar) — Irregular</h4>
                  <span className="text-[11px] text-slate-500">Conjugação supletiva anômala</span>
                </div>
                <AudioButton text="sein" lang="de-DE" size="xs" />
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase">
                    <th className="py-2 px-3">Pessoa</th>
                    <th className="py-2 px-3">Pronome</th>
                    <th className="py-2 px-3 font-bold text-indigo-700">Forma</th>
                    <th className="py-2 px-3 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONJUGATION_SEIN.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 text-slate-500">{r.pessoa}</td>
                      <td className="py-2 px-3 font-medium text-slate-800">{r.pronome}</td>
                      <td className="py-2 px-3 font-bold text-indigo-700">{r.forma}</td>
                      <td className="py-2 px-3 text-right">
                        <AudioButton text={`${r.pronome} ${r.forma}`} lang="de-DE" size="xs" variant="icon-only" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 space-y-1">
                <strong className="text-slate-900 block font-semibold">Trava de contraste:</strong>
                <p>
                  O verbo <em>sein</em> é usado para: identidade (<em>Ich bin Lehrer</em>), nacionalidade (<em>Ich bin Brasilianer</em>),
                  idade (<em>Ich bin 35 Jahre alt</em>), estado emocional (<em>Ich bin müde</em>), localização (<em>Ich bin in Berlin</em>).
                  Em português, usamos "ter" para idade; em alemão, usamos <strong>sein + Jahre alt</strong>.
                </p>
              </div>
            </div>

            {/* Verbo arbeiten (trabalhar) */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Verbo arbeiten (trabalhar) — Radical em -t</h4>
                  <span className="text-[11px] text-slate-500">Inserção de vogal -e- epentética</span>
                </div>
                <AudioButton text="arbeiten" lang="de-DE" size="xs" />
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase">
                    <th className="py-2 px-3">Pessoa</th>
                    <th className="py-2 px-3">Pronome</th>
                    <th className="py-2 px-3">Radical + Desinência</th>
                    <th className="py-2 px-3 font-bold text-indigo-700">Forma</th>
                    <th className="py-2 px-3 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONJUGATION_ARBEITEN.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 text-slate-500">{r.pessoa}</td>
                      <td className="py-2 px-3 font-medium text-slate-800">{r.pronome}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono text-xs">{r.radicalDesinencia}</td>
                      <td className="py-2 px-3 font-bold text-indigo-700">{r.forma}</td>
                      <td className="py-2 px-3 text-right">
                        <AudioButton text={`${r.pronome} ${r.forma}`} lang="de-DE" size="xs" variant="icon-only" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-700">
                <strong className="text-slate-900 block font-semibold">Regra:</strong>
                <p>
                  Verbos cujo radical termina em <strong>-t</strong> ou <strong>-d</strong> inserem um <strong>-e-</strong> antes
                  das desinências <em>-st</em> e <em>-t</em> (<em>du arbeitest, er arbeitet; du findest, er findet</em>).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.4 Profissões sem Artigo Indefinido */}
      <div id="secao-1-4-profissoes-artigo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 1.4
          </div>
          <h3 className="text-xl font-bold text-slate-900">Profissões sem Artigo Indefinido</h3>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            Após os verbos <em>sein</em> (ser) e <em>werden</em> (tornar-se), os nomes de profissões, nacionalidades e
            cargos <strong>NÃO levam artigo indefinido</strong>.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Português</th>
                  <th className="py-3 px-4 text-emerald-800 bg-emerald-50/50">Alemão Correto</th>
                  <th className="py-3 px-4 text-rose-800 bg-rose-50/50">Alemão Incorreto</th>
                  <th className="py-3 px-4 text-right">Ouvir Modelo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROFESSIONS_NO_ARTICLE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-medium text-slate-800">{item.portugues}</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 bg-emerald-50/30">
                      {item.alemaoCorreto}
                    </td>
                    <td className="py-3 px-4 text-rose-700 line-through bg-rose-50/30 font-medium">
                      {item.alemaoIncorreto}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <AudioButton text={item.alemaoCorreto} lang="de-DE" size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
            <strong className="font-semibold text-slate-900">Exceção:</strong> Se houver um adjetivo qualificativo, o artigo
            indefinido pode aparecer: <span className="font-semibold text-indigo-700">Ich bin ein guter Lehrer.</span>
          </div>
        </div>
      </div>

      {/* 1.5 Gênero dos Substantivos e Profissões (masc./fem.) */}
      <div id="secao-1-5-genero-profissoes" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            Seção 1.5
          </div>
          <h3 className="text-xl font-bold text-slate-900">Gênero dos Substantivos e Profissões (masc. / fem.)</h3>
          <p className="text-sm text-slate-600 mt-1">
            Matriz completa das 18 profissões fundamentais do Capítulo 1 e o sufixo formador feminino.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 bg-sky-50/50 text-sky-950 font-bold">Masculino</th>
                  <th className="py-3 px-4 bg-rose-50/50 text-rose-950 font-bold">Feminino</th>
                  <th className="py-3 px-4">Tradução</th>
                  <th className="py-3 px-4 text-right">Ouvir (Masc / Fem)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROFESSIONS_GENDER.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-semibold text-slate-800 bg-sky-50/20">{p.masculino}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800 bg-rose-50/20">{p.feminino}</td>
                    <td className="py-2.5 px-4 text-slate-600 text-xs sm:text-sm">{p.traducao}</td>
                    <td className="py-2.5 px-4 text-right space-x-1">
                      <AudioButton text={p.masculino} lang="de-DE" size="xs" variant="icon-only" />
                      <AudioButton text={p.feminino} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-teal-950">
            <strong className="font-semibold text-teal-900">Regra de formação do feminino:</strong> Acrescenta-se <strong>-in</strong> ao
            radical masculino. Se o masculino termina em <em>-er</em>, o feminino é <em>-erin</em>. Se termina em consoante, adiciona-se
            <em>-in</em> (<em>der Arzt → die Ärztin</em> com Umlaut; <em>der Student → die Studentin</em>).
          </div>
        </div>
      </div>

      {/* 1.6 Números Cardinais (0–100) */}
      <div id="secao-1-6-numeros" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Seção 1.6
          </div>
          <h3 className="text-xl font-bold text-slate-900">Números Cardinais (0–100)</h3>
          <p className="text-sm text-slate-600 mt-1">
            Série numérica fundamental e a estrutura de inversão unidade-dezena.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3 w-16 text-center">Nº</th>
                  <th className="py-3 px-4 font-bold">Alemão</th>
                  <th className="py-3 px-3 text-right">Áudio</th>
                  <th className="py-3 px-3 w-16 text-center border-l border-slate-200">Nº</th>
                  <th className="py-3 px-4 font-bold">Alemão</th>
                  <th className="py-3 px-3 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CARDINAL_NUMBERS.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3 text-center font-mono font-bold text-slate-500 bg-slate-50/50">
                      {r.numero}
                    </td>
                    <td className="py-2 px-4 font-semibold text-slate-800">{r.alemao}</td>
                    <td className="py-2 px-3 text-right">
                      <AudioButton text={r.alemao} lang="de-DE" size="xs" variant="icon-only" />
                    </td>

                    <td className="py-2 px-3 text-center font-mono font-bold text-slate-500 bg-slate-50/50 border-l border-slate-200">
                      {r.numero2}
                    </td>
                    <td className="py-2 px-4 font-semibold text-slate-800">{r.alemao2}</td>
                    <td className="py-2 px-3 text-right">
                      {r.alemao2 && (
                        <AudioButton text={r.alemao2} lang="de-DE" size="xs" variant="icon-only" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-blue-950">
            <strong className="font-semibold text-blue-900">Regra dos números compostos:</strong> Em alemão, diz-se primeiro a{' '}
            <strong>unidade</strong>, depois a <strong>dezena</strong>, unidas por <em>und</em>:{' '}
            <span className="font-semibold text-indigo-800">einundzwanzig</span> (um-e-vinte),{' '}
            <span className="font-semibold text-indigo-800">zweiundzwanzig</span> (dois-e-vinte). Isso é o inverso do português
            (vinte e um).
          </div>
        </div>
      </div>
    </section>
  );
};
