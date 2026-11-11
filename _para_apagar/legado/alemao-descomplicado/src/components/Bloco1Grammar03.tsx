import React from 'react';
import {
  ARTICLES_DEFINITE,
  ARTICLES_INDEFINITE,
  ARTICLES_NEGATIVE,
  POSSESSIVE_ARTICLES,
  CONTRAST_TRAPS_LESSON_3,
  SATZBAU_DECLARATIVE,
  SATZBAU_W_FRAGE,
  SATZBAU_JA_NEIN,
  CONJUGATION_HABEN,
  IDIOMS_HABEN,
  CONJUGATION_SEIN,
  USES_SEIN,
  CONJUGATION_WERDEN,
  USES_WERDEN,
  CARDINAL_NUMBERS_ADVANCED,
  PLURAL_FAMILIES,
} from '../data/lesson03Data';
import { AudioButton } from './AudioButton';
import { CheckCircle, AlertTriangle, BookOpen, Layers, Hash } from 'lucide-react';

export const Bloco1Grammar03: React.FC = () => {
  return (
    <section id="bloco-1-gramatica-rodada3" className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada 03
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 003 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomia Gramatical Pura & Sintaxe Rígida
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Determinação de artigos (definidos, indefinidos e negativos), pronomes possessivos no nominativo, topologia sintática
          (V2, W-Frage, Ja-Nein-Frage), a tríade verbal essencial (<em>haben</em>, <em>sein</em> e <em>werden</em>), números até 1 bilhão
          e as 5 famílias estruturais do plural alemão.
        </p>
      </div>

      {/* 1.1 Artikelbestimmung */}
      <div id="secao-1-1-artigos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O <em>Artikelbestimmung</em> — Artigo Definido, Indefinido e Negativo
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O alemão possui três gêneros gramaticais no singular: masculino (<em>der</em>), feminino (<em>die</em>) e neutro (<em>das</em>).
              No plural, o artigo definido é sempre <strong>die</strong> para todos os gêneros.
            </p>
          </div>
          <AudioButton
            text="der Name, die Namen. die Telefonnummer, die Telefonnummern. das Kind, die Kinder."
            lang="de-DE"
            size="sm"
            label="Ouvir Artigos & Substantivos"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Tabela Definido */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Tabela do Artigo Definido (Nominativo)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Gênero</th>
                    <th className="py-3 px-4">Singular</th>
                    <th className="py-3 px-4">Plural</th>
                    <th className="py-3 px-4">Tradução</th>
                    <th className="py-3 px-4 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ARTICLES_DEFINITE.map((row) => (
                    <tr key={row.genero} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-800">{row.genero}</td>
                      <td className="py-3 px-4 font-mono font-medium text-indigo-700">{row.singular}</td>
                      <td className="py-3 px-4 font-mono font-medium text-emerald-700">{row.plural}</td>
                      <td className="py-3 px-4 text-slate-600">{row.traducao}</td>
                      <td className="py-3 px-4 text-center">
                        <AudioButton text={`${row.singular}, ${row.plural}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grid Indefinido & Negativo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Indefinido */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  O Artigo Indefinido (ein, eine, ein)
                </h4>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3">Gênero</th>
                      <th className="py-2.5 px-3">Singular</th>
                      <th className="py-2.5 px-3">Plural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {ARTICLES_INDEFINITE.map((row) => (
                      <tr key={row.genero}>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{row.genero}</td>
                        <td className="py-2.5 px-3 font-mono font-medium text-indigo-700">{row.singular}</td>
                        <td className="py-2.5 px-3 text-slate-600 text-xs">{row.plural}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                <strong>Regra crucial:</strong> Não existe artigo indefinido no plural. Para expressar &ldquo;uns/umas&rdquo;,
                usa-se o possessivo (<em>meine, deine</em>) ou simplesmente o substantivo sem artigo (<em>Kinder</em> = crianças).
              </div>
            </div>

            {/* Negativo */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  O Artigo Negativo (kein, keine, kein)
                </h4>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3">Gênero</th>
                      <th className="py-2.5 px-3">Singular</th>
                      <th className="py-2.5 px-3">Plural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {ARTICLES_NEGATIVE.map((row) => (
                      <tr key={row.genero}>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{row.genero}</td>
                        <td className="py-2.5 px-3 font-mono font-medium text-rose-700">{row.singular}</td>
                        <td className="py-2.5 px-3 font-mono font-medium text-rose-700">{row.plural}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                <strong>Uso:</strong> <em>kein</em> nega substantivos precedidos de artigo indefinido (<em>ein</em>) ou substantivos desprovidos de artigo (<em>kein Vater, keine Kinder</em>).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 O Possessivartikel */}
      <div id="secao-1-2-possessivos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O <em>Possessivartikel</em> (Artigo Possessivo) — Matriz do Nominativo
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Os artigos possessivos concordam em gênero, número e caso com o substantivo que determinam.
              No feminino e no plural, recebem a terminação <strong>-e</strong>.
            </p>
          </div>
          <AudioButton
            text="mein Vater, meine Mutter, mein Kind, meine Freunde. dein Vater, seine Mutter, ihr Kind, unsere Freunde, eure Mutter, Ihr Vater"
            lang="de-DE"
            size="sm"
            label="Ouvir Possessivos"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Pronome Pessoal</th>
                  <th className="py-3 px-4">Masculino (der)</th>
                  <th className="py-3 px-4">Feminino (die)</th>
                  <th className="py-3 px-4">Neutro (das)</th>
                  <th className="py-3 px-4">Plural (die)</th>
                  <th className="py-3 px-4 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {POSSESSIVE_ARTICLES.map((row) => (
                  <tr key={row.pronome} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.pronome}</td>
                    <td className="py-3 px-4 font-mono text-slate-800">{row.masc}</td>
                    <td className="py-3 px-4 font-mono text-indigo-700 font-medium">{row.fem}</td>
                    <td className="py-3 px-4 font-mono text-slate-800">{row.neutro}</td>
                    <td className="py-3 px-4 font-mono text-emerald-700 font-medium">{row.plural}</td>
                    <td className="py-3 px-4 text-center">
                      <AudioButton text={`${row.masc}, ${row.fem}, ${row.neutro}, ${row.plural}`} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-amber-50/80 border border-amber-300/80 rounded-xl text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Atenção à síncope vocálica de <em>euer</em>:</strong> O possessivo da 2ª pessoa do plural perde o <em>-e-</em> interno
              quando recebe uma desinência terminativa: <em>euer</em> → <strong>eure</strong> Mutter, <strong>eurem</strong> Vater, <strong>euren</strong> Freunden.
            </div>
          </div>

          {/* Travas de Contraste para Brasileiros */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Travas de Contraste para Brasileiros (Erros Frequentes)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONTRAST_TRAPS_LESSON_3.map((trap, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-2">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Português: {trap.portugues}</div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-mono text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      {trap.alemaoCorreto}
                    </div>
                    <AudioButton text={trap.alemaoCorreto} lang="de-DE" size="sm" />
                  </div>
                  {trap.alemaoIncorreto && (
                    <div className="text-xs text-rose-700 line-through font-mono">
                      {trap.alemaoIncorreto}
                    </div>
                  )}
                  {trap.nota && (
                    <div className="text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                      {trap.nota}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 O Satzbau (Estrutura da Frase) */}
      <div id="secao-1-3-satzbau" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O <em>Satzbau</em> (Estrutura da Frase) — Revisão Topológica Aprofundada
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Topologia dos campos oracionais em declarativas (<em>Vorfeld, V2, Posição III invertida</em>), perguntas W (<em>W-Frage</em>)
              e perguntas de sim/não (<em>Ja-Nein-Frage</em>).
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Declarativa */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Oração Declarativa (<em>Aussagesatz</em>) — Topologia Rígida
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Posição I (Vorfeld)</th>
                    <th className="py-3 px-4 bg-amber-50 text-amber-950">Posição II (Verbo Fixo)</th>
                    <th className="py-3 px-4">Posição III (Sujeito Invertido)</th>
                    <th className="py-3 px-4">Mittelfeld</th>
                    <th className="py-3 px-4">Tradução</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {SATZBAU_DECLARATIVE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">{row.vorfeld}</td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-900 bg-amber-50/40">{row.verbo}</td>
                      <td className="py-3 px-4 font-medium text-indigo-700">{row.sujeito}</td>
                      <td className="py-3 px-4 text-slate-800">{row.mittelfeld}</td>
                      <td className="py-3 px-4 text-xs text-slate-500">{row.ptTranslation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grid W-Frage & Ja-Nein-Frage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* W-Frage */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                W-Frage (Pergunta com Pronome Interrogativo)
              </h4>
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3">Posição I (W-Wort)</th>
                      <th className="py-2.5 px-3 bg-amber-50 text-amber-950">Posição II (Verbo)</th>
                      <th className="py-2.5 px-3">Posição III (Sujeito)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {SATZBAU_W_FRAGE.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-semibold text-sky-700">{row.wWort}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-900 bg-amber-50/40">{row.verbo}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-800">{row.sujeito}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ja-Nein-Frage */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Ja-Nein-Frage (Pergunta Direta de Sim/Não)
              </h4>
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3 bg-amber-50 text-amber-950">Posição I (Verbo Fixo)</th>
                      <th className="py-2.5 px-3">Posição II (Sujeito)</th>
                      <th className="py-2.5 px-3">Mittelfeld</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {SATZBAU_JA_NEIN.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-900 bg-amber-50/40">{row.verbo}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{row.sujeito}</td>
                        <td className="py-2.5 px-3 text-slate-700">{row.mittelfeld}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.4 Verbo haben */}
      <div id="secao-1-4-haben" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.4
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Verbo <em>haben</em> (ter) — Conjugação & Expressões Idiomáticas
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O verbo <em>haben</em> sofre queda consonantal de <strong>-b-</strong> na 2ª (<em>du hast</em>) e na 3ª (<em>er/sie/es hat</em>) pessoa do singular.
            </p>
          </div>
          <AudioButton
            text="ich habe, du hast, er hat, sie hat, wir haben, ihr habt, sie haben, Sie haben"
            lang="de-DE"
            size="sm"
            label="Ouvir haben"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Conjugação haben */}
            <div className="lg:col-span-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Pessoa</th>
                    <th className="py-3 px-4">Pronome</th>
                    <th className="py-3 px-4">Forma</th>
                    <th className="py-3 px-4">Observação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {CONJUGATION_HABEN.map((row) => (
                    <tr key={row.pessoa} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-700">{row.pessoa}</td>
                      <td className="py-2.5 px-4 text-slate-800">{row.pronome}</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-indigo-700">{row.forma}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500">{row.radicalDesinencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Expressões com haben */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Expressões Fixas com <em>haben</em>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {IDIOMS_HABEN.map((idiom) => (
                  <div key={idiom.de} className="p-3 border border-slate-200 rounded-lg bg-slate-50/40 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900">{idiom.de}</div>
                      <div className="text-xs text-slate-500">{idiom.pt}</div>
                    </div>
                    <AudioButton text={idiom.audio} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-rose-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>Trava de contraste fundamental:</strong> Em português dizemos &ldquo;tenho 30 anos&rdquo;; em alemão,
              usa-se rigorosamente <strong>sein + Jahre alt</strong> (<em>Ich bin 30 Jahre alt</em>). O verbo <em>haben</em> NUNCA é usado para expressar idade!
            </div>
          </div>
        </div>
      </div>

      {/* 1.5 Verbo sein */}
      <div id="secao-1-5-sein" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Verbo <em>sein</em> (ser/estar) — Conjugação Irregular & Usos
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Verbo de anomalia supletiva (raízes heterogêneas). Fundamental para identidade, nacionalidade, idade, profissão e localização.
            </p>
          </div>
          <AudioButton
            text="ich bin, du bist, er ist, sie ist, wir sind, ihr seid, sie sind, Sie sind"
            lang="de-DE"
            size="sm"
            label="Ouvir sein"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Conjugação sein */}
            <div className="lg:col-span-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Pessoa</th>
                    <th className="py-3 px-4">Pronome</th>
                    <th className="py-3 px-4">Forma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {CONJUGATION_SEIN.map((row) => (
                    <tr key={row.pessoa} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-700">{row.pessoa}</td>
                      <td className="py-2.5 px-4 text-slate-800">{row.pronome}</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-indigo-700">{row.forma}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Contextos de Uso */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Usos Canônicos de <em>sein</em>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {USES_SEIN.map((u) => (
                  <div key={u.contexto} className="p-3 border border-slate-200 rounded-lg bg-slate-50/40 space-y-1">
                    <span className="text-[11px] font-bold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {u.contexto}
                    </span>
                    <div className="font-mono text-xs sm:text-sm font-semibold text-slate-900 pt-1">{u.exemplo}</div>
                    <div className="text-xs text-slate-500">{u.traducao}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.6 Verbo werden */}
      <div id="secao-1-6-werden" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.6
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Verbo <em>werden</em> (tornar-se / ficar) — Introdução
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Expressa transição de estado, mudanças etárias ou projetos futuros de carreira.
              Apresenta alternância vocálica <em>e → i</em> e síncope da dental: <em>du wirst</em>, <em>er wird</em>.
            </p>
          </div>
          <AudioButton
            text="ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden, Sie werden"
            lang="de-DE"
            size="sm"
            label="Ouvir werden"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Pessoa</th>
                    <th className="py-3 px-4">Pronome</th>
                    <th className="py-3 px-4">Forma</th>
                    <th className="py-3 px-4">Morfologia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {CONJUGATION_WERDEN.map((row) => (
                    <tr key={row.pessoa} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-700">{row.pessoa}</td>
                      <td className="py-2.5 px-4 text-slate-800">{row.pronome}</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-indigo-700">{row.forma}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-500">{row.radicalDesinencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Padrões de Emprego de <em>werden</em>
              </h4>
              <div className="space-y-3">
                {USES_WERDEN.map((uw) => (
                  <div key={uw.contexto} className="p-3 border border-slate-200 rounded-lg bg-slate-50/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-purple-900">{uw.contexto}</div>
                      <div className="font-mono text-sm font-semibold text-slate-900">{uw.exemplo}</div>
                      <div className="text-xs text-slate-500">{uw.traducao}</div>
                    </div>
                    <AudioButton text={uw.exemplo} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.7 Números Cardinais de 100 a 1.000.000.000 */}
      <div id="secao-1-7-numeros-avancados" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.7
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Hash className="w-5 h-5 text-indigo-600" />
              Números Cardinais — Aprofundamento (100 a 1.000.000.000)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Regra de escala contínua: <em>Million</em> e <em>Milliarde</em> são substantivos femininos e exigem artigo (<em>eine Million, zwei Millionen</em>).
            </p>
          </div>
          <AudioButton
            text="einhundert, zweihundert, eintausend, zehntausend, einhunderttausend, eine Million, zwei Millionen, eine Milliarde"
            lang="de-DE"
            size="sm"
            label="Ouvir Escalas Numéricas"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CARDINAL_NUMBERS_ADVANCED.map((n) => (
              <div key={n.num} className="p-3 border border-slate-200 rounded-xl bg-slate-50/40 space-y-1">
                <div className="text-xs font-mono font-bold text-indigo-700">{n.num}</div>
                <div className="text-xs font-semibold text-slate-900 leading-tight">{n.de}</div>
                <div className="text-[11px] text-slate-500">{n.pt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.8 O Plural dos Substantivos — As 5 Famílias */}
      <div id="secao-1-8-plural-familias" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.8
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              O Plural dos Substantivos — As 5 Famílias Morfológicas
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Ao contrário do português (que adiciona apenas <em>-s</em>), o alemão distribui seus plurais em 5 classes com ou sem <em>Umlaut</em>.
            </p>
          </div>
          <AudioButton
            text="der Tisch, die Tische. der Stuhl, die Stühle. das Kind, die Kinder. das Haus, die Häuser. die Frau, die Frauen. das Auto, die Autos. der Lehrer, die Lehrer. der Vater, die Väter."
            lang="de-DE"
            size="sm"
            label="Ouvir Plurais Canônicos"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {PLURAL_FAMILIES.map((fam) => (
              <div key={fam.familia} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900">
                      {fam.familia}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {fam.terminacao}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">{fam.regra}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  {fam.exemplos.map((ex, i) => (
                    <div key={i} className="text-xs bg-white p-2 rounded-lg border border-slate-200/60 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-900">
                          {ex.sg} → <strong className="text-indigo-700">{ex.pl}</strong>
                        </div>
                        <div className="text-[11px] text-slate-500">{ex.pt}</div>
                      </div>
                      <AudioButton text={`${ex.sg}, ${ex.pl}`} lang="de-DE" size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
