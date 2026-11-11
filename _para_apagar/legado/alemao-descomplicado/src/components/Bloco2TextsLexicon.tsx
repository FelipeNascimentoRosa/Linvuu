import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  MessageSquare,
  Globe2,
  FileText,
  Bookmark,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  TEXTO_A1_ENTRIES,
  TEXTO_A1_GRAMMAR_NOTES,
  TEXTO_A2_QA,
  TEXTO_A2_PETER,
  TEXTO_A3_COUNTRIES_NO_ARTICLE,
  TEXTO_A3_COUNTRIES_WITH_ARTICLE,
  COUNTRY_CASE_RULES,
  TEXTO_A4_ITEMS,
  ALPHABET_DATA,
  SPECIAL_LETTERS,
  PRIMARY_LEXICON,
  COLLOQUIAL_EXPRESSIONS,
} from '../data/lesson01Data';
import { AudioButton } from './AudioButton';

export const Bloco2TextsLexicon: React.FC = () => {
  const [lexiconSearch, setLexiconSearch] = useState('');

  const filteredLexicon = PRIMARY_LEXICON.filter(
    (item) =>
      item.palavraAlema.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.traducao.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.classeGramatical.toLowerCase().includes(lexiconSearch.toLowerCase())
  );

  return (
    <section id="bloco-2-textos-lexico" className="space-y-12">
      {/* Bloco 2 Title Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
            Bloco 2 (60 Minutos)
          </span>
          <span className="text-xs text-slate-300 font-medium">Transcrição & Mineração Lexical</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transcrição Integral, Tradução & Mineração Lexical
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Transcrições textuais autênticas (A1–A4), traduções analíticas justapostas, regência preposicional de países,
          alfabeto fonético completo com IPA, tabela lexical primária e gírias coloquiais.
        </p>
      </div>

      {/* 2.1 Texto A1 — Sich vorstellen */}
      <div id="secao-2-1-a1" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 2.1
          </div>
          <h3 className="text-xl font-bold text-slate-900">Texto A1 — Sich vorstellen (Apresentar-se) — p. 8</h3>
          <p className="text-sm text-slate-600 mt-1">
            Três perfis de apresentação pessoal com correspondência analítica direta entre alemão e português.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* 3 Speakers Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TEXTO_A1_ENTRIES.map((entry, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                      {entry.speaker}
                    </span>
                    <AudioButton text={entry.alemao} lang="de-DE" size="xs" label="🇩🇪 Áudio" />
                  </div>

                  {/* German text */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Texto Original (Alemão)
                    </span>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200/70">
                      "{entry.alemao}"
                    </p>
                  </div>

                  {/* Portuguese translation */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Tradução Analítica Justaposta
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/40 p-3 rounded-lg border border-emerald-200/60">
                      {entry.portugues}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                  <AudioButton text={entry.portugues} lang="pt-BR" size="xs" label="🇧🇷 Português" />
                </div>
              </div>
            ))}
          </div>

          {/* Notas Gramaticais do Texto */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              Notas Gramaticais do Texto (A1)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {TEXTO_A1_GRAMMAR_NOTES.map((nota, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white border border-slate-200/70">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{nota}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.2 Texto A2 — Fragen und Antworten */}
      <div id="secao-2-2-a2" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Seção 2.2
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Texto A2 — Fragen und Antworten (Perguntas e Respostas) — p. 9
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Diálogos estruturados em colunas paralelas para assimilação de perguntas e respostas formais.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Franziska QA Table */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              Entrevista com Franziska Binder
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4 bg-sky-50/70 text-sky-950 font-bold">Pergunta em Alemão</th>
                    <th className="py-3 px-4">Tradução da Pergunta</th>
                    <th className="py-3 px-4 bg-emerald-50/70 text-emerald-950 font-bold">Resposta em Alemão</th>
                    <th className="py-3 px-4">Tradução da Resposta</th>
                    <th className="py-3 px-4 text-right">Ouvir Par</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TEXTO_A2_QA.map((qa, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-4 font-semibold text-slate-900 bg-sky-50/20">{qa.deQuestion}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600 italic">{qa.ptQuestion}</td>
                      <td className="py-2.5 px-4 font-semibold text-emerald-900 bg-emerald-50/20">{qa.deAnswer}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">{qa.ptAnswer}</td>
                      <td className="py-2.5 px-4 text-right space-x-1">
                        <AudioButton text={qa.deQuestion} lang="de-DE" size="xs" variant="icon-only" />
                        <AudioButton text={qa.deAnswer} lang="de-DE" size="xs" variant="icon-only" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Peter Heinemann Self-Intro */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Monólogo de Respostas: Peter Heinemann
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4 font-bold">Alemão</th>
                    <th className="py-3 px-4">Tradução Analítica Justaposta</th>
                    <th className="py-3 px-4 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TEXTO_A2_PETER.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-4 font-semibold text-slate-800">{item.de}</td>
                      <td className="py-2.5 px-4 text-slate-600 text-xs sm:text-sm">{item.pt}</td>
                      <td className="py-2.5 px-4 text-right">
                        <AudioButton text={item.de} lang="de-DE" size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 2.3 Texto A3 — Länder (Países) */}
      <div id="secao-2-3-a3" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 2.3
          </div>
          <h3 className="text-xl font-bold text-slate-900">Texto A3 — Länder (Países) — p. 9</h3>
          <p className="text-sm text-slate-600 mt-1">
            Classificação geográfica, países neutros sem artigo versus países que exigem artigo com declinação em Dativo.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Países sem artigo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Países Neutros (Sem Artigo) — <span className="text-emerald-700">Ich komme aus + [Nome]</span>
              </h4>
              <AudioButton text="Ich komme aus Italien, Frankreich, Schweden, Dänemark, Großbritannien, Polen, Russland, Spanien, Portugal, Brasilien, China, Japan, Belgien, Rumänien, Slowenien, Indien, Ungarn, Irland, Griechenland." lang="de-DE" size="xs" label="🇩🇪 Ouvir Lista" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs sm:text-sm">
              {TEXTO_A3_COUNTRIES_NO_ARTICLE.map((c, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between hover:bg-white hover:border-slate-300 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-slate-900 block">{c.de}</span>
                    <span className="text-slate-500 text-[11px]">{c.pt}</span>
                  </div>
                  <AudioButton text={`aus ${c.de}`} lang="de-DE" size="xs" variant="icon-only" />
                </div>
              ))}
            </div>
          </div>

          {/* Países com artigo */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-800 mb-2">
              Atenção: Países com Artigo Obrigatório no Dativo (aber: Ich komme aus...)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TEXTO_A3_COUNTRIES_WITH_ARTICLE.map((c, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-rose-900 uppercase tracking-wider block">
                      {c.gender}
                    </span>
                    <span className="text-base font-bold text-slate-900">aus {c.de}</span>
                    <span className="text-xs text-slate-600 block mt-0.5">da {c.pt}</span>
                  </div>
                  <AudioButton text={`Ich komme aus ${c.de}`} lang="de-DE" size="xs" />
                </div>
              ))}
            </div>
          </div>

          {/* A Lacuna da Regência Articular — Países com Artigo */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-violet-600" />
              A Lacuna da Regência Articular — Países com Artigo
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              O manual lista os países sem explicar por que alguns exigem artigo. Aqui está a regra completa:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4 font-bold">Categoria</th>
                    <th className="py-3 px-4">Países</th>
                    <th className="py-3 px-4 text-indigo-900 font-bold">Preposição aus + Caso</th>
                    <th className="py-3 px-4">Exemplo</th>
                    <th className="py-3 px-4 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COUNTRY_CASE_RULES.map((rule, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">{rule.categoria}</td>
                      <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">{rule.paises}</td>
                      <td className="py-3 px-4 font-bold text-indigo-700">{rule.preposicaoCaso}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-800">{rule.exemplo}</td>
                      <td className="py-3 px-4 text-right">
                        <AudioButton text={rule.exemplo} lang="de-DE" size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explicação formal */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <strong className="text-slate-900 block font-semibold">Explicação formal:</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>A maioria dos países em alemão é neutra e não leva artigo no uso normal.</li>
                <li>Alguns países são femininos (<em>die Türkei, die Ukraine, die Schweiz</em>) e sempre levam artigo.</li>
                <li>Alguns países são plurais (<em>die USA, die Niederlande</em>) e sempre levam artigo plural.</li>
                <li>
                  A preposição <strong>aus rege Dativo</strong>. Portanto:
                  <ul className="list-none pl-4 pt-1 space-y-0.5">
                    <li>• Feminino: <em>die → der</em> (<strong>aus der Schweiz</strong>)</li>
                    <li>• Plural: <em>die → den</em> (<strong>aus den USA</strong>)</li>
                  </ul>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                <strong>Trava de contraste:</strong> Em português, dizemos "venho da Turquia", "venho da Suíça", "venho dos EUA". Em alemão, a mesma lógica se aplica, mas com a declinação de caso (Dativo).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.4 Texto A4 — Woher kommen die Personen? */}
      <div id="secao-2-4-a4" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            Seção 2.4
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Texto A4 — Woher kommen die Personen? (De onde vêm as pessoas?) — p. 9
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Aplicação prática dos pronomes de 3ª pessoa do singular (<em>er / sie</em>).
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEXTO_A4_ITEMS.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-bold text-xs text-slate-900">
                    {item.subject} <span className="text-slate-400 font-normal">({item.subjectPt})</span>
                  </span>
                  <AudioButton text={item.answerDe} lang="de-DE" size="xs" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Pergunta & Resposta (Alemão)</span>
                  <p className="text-sm font-semibold text-slate-800">{item.questionDe}</p>
                  <p className="text-sm font-medium text-indigo-900">{item.answerDe}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/70">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Tradução Justaposta</span>
                  <p className="text-xs text-slate-600">{item.questionPt}</p>
                  <p className="text-xs text-slate-700">{item.answerPt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
            <strong className="block font-bold text-slate-900">Nota sobre Pronomes Pessoais:</strong>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 font-mono text-xs">
              <span className="p-2 bg-white rounded border border-slate-200">er = ele (3ª sg. masc)</span>
              <span className="p-2 bg-white rounded border border-slate-200">sie = ela (3ª sg. fem)</span>
              <span className="p-2 bg-white rounded border border-slate-200">es = ele/ela (3ª sg. neutro)</span>
              <span className="p-2 bg-white rounded border border-slate-200">sie = eles/elas (plural)</span>
              <span className="p-2 bg-white rounded border border-slate-200">Sie = formal (senhor/a)</span>
            </div>
            <p className="text-slate-600 text-xs mt-2">
              <strong>Atenção:</strong> O pronome <em>sie</em> pode significar "ela" (singular) ou "eles/elas" (plural).
              O contexto e a conjugação verbal distinguem: <em>sie kommt</em> (ela vem) vs. <em>sie kommen</em> (eles vêm).
            </p>
          </div>
        </div>
      </div>

      {/* 2.5 Texto A8 — Das Alphabet */}
      <div id="secao-2-5-alfabeto" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 2.5
          </div>
          <h3 className="text-xl font-bold text-slate-900">Texto A8 — Das Alphabet (O Alfabeto) — p. 10</h3>
          <p className="text-sm text-slate-600 mt-1">
            Pronúncia oficial alemã (IPA) das 26 letras do alfabeto e as 4 letras especiais germânicas com áudio interativo.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Alphabet Letters Grid */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Tabela do Alfabeto Alemão (26 Letras)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {ALPHABET_DATA.map((l) => (
                <div
                  key={l.letra}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-center hover:bg-white hover:border-slate-300 transition-all group flex flex-col items-center justify-between"
                >
                  <span className="text-lg font-bold text-slate-900">{l.letra}</span>
                  <span className="font-mono text-xs text-indigo-700 my-1">{l.ipa}</span>
                  <AudioButton text={l.letra} lang="de-DE" size="xs" variant="icon-only" />
                </div>
              ))}
            </div>
          </div>

          {/* Letras Especiais */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-3">
              Letras Especiais (Umlaute e ß)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SPECIAL_LETTERS.map((s) => (
                <div
                  key={s.letra}
                  className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between"
                >
                  <div>
                    <span className="text-2xl font-bold text-amber-950 block">{s.letra}</span>
                    <span className="font-mono text-xs font-bold text-amber-800">{s.ipa}</span>
                    <span className="text-xs text-slate-600 block mt-1 font-medium">{s.nome}</span>
                  </div>
                  <AudioButton text={s.letra} lang="de-DE" size="sm" label="Ouvir" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.6 Tabela Lexical Primária */}
      <div id="secao-2-6-lexico" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 2.6
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tabela Lexical Primária (24 Termos Essenciais)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Vocabulário fundamental do Capítulo 1 com artigos gramaticais, formas de plural, traduções exatas e frases modelo.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar vocabulário..."
              value={lexiconSearch}
              onChange={(e) => setLexiconSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-slate-900">Palavra Alemã (com artigo)</th>
                  <th className="py-3 px-4">Classe Gramatical & Plural</th>
                  <th className="py-3 px-4">Tradução Exata</th>
                  <th className="py-3 px-4">Frase Modelo Extraída do Texto</th>
                  <th className="py-3 px-4 text-right">Ouvir Palavra / Frase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLexicon.map((term, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/30">
                      {term.palavraAlema}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">{term.classeGramatical}</td>
                    <td className="py-3 px-4 font-medium text-emerald-800">{term.traducao}</td>
                    <td className="py-3 px-4 text-xs text-slate-700 italic">
                      <div>"{term.fraseModelo}"</div>
                      <div className="text-[11px] text-slate-500">{term.fraseTraducao}</div>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <AudioButton text={term.palavraAlema} lang="de-DE" size="xs" variant="icon-only" />
                      <AudioButton text={term.fraseModelo} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.7 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="secao-2-7-coloquial" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            Seção 2.7
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Registro Coloquial e Autêntico (Umgangssprache)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Expressões idiomáticas do dia a dia para comunicação natural além do registro puramente formal.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-amber-950">Expressão Alemã</th>
                  <th className="py-3 px-4">Tradução</th>
                  <th className="py-3 px-4">Contexto de Uso</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COLLOQUIAL_EXPRESSIONS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-900">{item.expressao}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{item.traducao}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{item.contexto}</td>
                    <td className="py-3 px-4 text-right">
                      <AudioButton text={item.expressao} lang="de-DE" size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950">
            <strong>Nota:</strong> O manual <em>Begegnungen A1+</em> usa predominantemente o registro formal (<em>Sie</em>) nas
            primeiras lições, mas o estudante deve estar ciente de que, em contextos informais, usa-se <em>du</em> e expressões coloquiais.
          </div>
        </div>
      </div>
    </section>
  );
};
