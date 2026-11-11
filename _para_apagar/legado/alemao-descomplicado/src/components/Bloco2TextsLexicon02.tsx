import React, { useState } from 'react';
import {
  TEXT_A17_LANGUAGES,
  TEXT_A17_COUNTRIES_RESOLUCAO,
  PHONETIK_A18_ITEMS,
  TEXT_A19_DIALOGUES,
  TEXT_A20_STRUCTURE,
  PHONETIK_A21_ITEMS,
  PHONETIK_A21_FRASES,
  TEXT_A22_PLANES,
  TEXT_A23_NUMBERS,
  TEXT_A24_FLUEGE,
  TEXT_A25_ZAHLEN,
  TEXT_A26_TELEFON,
  LEXICAL_TERMS_02,
  COLLOQUIAL_EXPRESSIONS_02,
} from '../data/lesson02Data';
import { AudioButton } from './AudioButton';
import {
  Globe,
  Search,
  BookOpen,
  Volume2,
  Phone,
  Plane,
  Hash,
  Sparkles,
  MessageSquare,
  Compass,
} from 'lucide-react';

export const Bloco2TextsLexicon02: React.FC = () => {
  const [lexicalSearch, setLexicalSearch] = useState('');

  const filteredLexical = LEXICAL_TERMS_02.filter((item) => {
    const q = lexicalSearch.toLowerCase();
    return (
      item.palavraAlema.toLowerCase().includes(q) ||
      item.traducao.toLowerCase().includes(q) ||
      item.fraseModelo.toLowerCase().includes(q)
    );
  });

  return (
    <section id="bloco-2-textos-lexico-rodada2" className="space-y-12">
      {/* Bloco 2 Title Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-400/20 text-teal-300 border border-teal-400/30">
            Bloco 2 (60 Minutos) · Rodada 02
          </span>
          <span className="text-xs text-slate-300 font-medium">Textos A17–A26 (p. 13–15)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transcrição Integral, Fonética, Números & Mineração Lexical
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Países e línguas, pares mínimos de pronúncia (<em>sch</em> vs. <em>sp</em>, ditongo <em>ei</em>), números cardinais até 10.000,
          anúncios de voos, números de telefone de emergência e tabela lexical primária.
        </p>
      </div>

      {/* 2.1 Texto A17 — Sprachen und Länder */}
      <div id="secao-2-1-a17" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A17 — Sprachen und Länder (Línguas e Países) — p. 13
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Transcrição do vocabulário original de idiomas e modelo frasal com o pronome impessoal <strong>man</strong> (<em>In Spanien spricht man Spanisch</em>).
            </p>
          </div>
          <AudioButton
            text="In Spanien spricht man Spanisch. In Deutschland spricht man Deutsch. In Portugal spricht man Portugiesisch."
            lang="de-DE"
            size="sm"
            label="🇩🇪 Ouvir Modelo A17"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Caixa com as 14 línguas */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 block">
              14 Línguas do Texto Original:
            </span>
            <div className="flex flex-wrap gap-2">
              {TEXT_A17_LANGUAGES.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-xs font-semibold text-indigo-950 shadow-2xs inline-flex items-center gap-1"
                >
                  {lang}
                  <AudioButton text={lang} lang="de-DE" size="xs" variant="icon-only" />
                </span>
              ))}
            </div>
          </div>

          {/* Tabela de Resolução Comentada dos 17 Países */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">País (Land)</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">Língua (Sprache)</th>
                  <th className="py-3 px-4">Frase Completa em Alemão</th>
                  <th className="py-3 px-4 text-slate-500">Tradução Justaposta</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A17_COUNTRIES_RESOLUCAO.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.pais}</td>
                    <td className="py-2.5 px-4 font-semibold text-indigo-800 bg-indigo-50/20">{row.lingua}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-800">{row.frase}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-600">{row.traducao}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={row.frase} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.2 Texto A18 — Phonetik: sch [ʃ] und sp [ʃp] */}
      <div id="secao-2-2-a18" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 2.2
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Texto A18 — Phonetik: sch [ʃ] und sp [ʃp] — p. 13
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Treino contrastivo de sibilantes palatais. Diferencie o som do dígrafo <strong>sch</strong> e do grupo inicial <strong>sp</strong>.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloco sch */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-sm font-bold font-mono bg-violet-900 text-white">
                  sch [ʃ]
                </span>
                <span className="text-xs text-slate-500">Som de "ch" em "chave"</span>
              </div>
              <p className="text-xs text-slate-600">{PHONETIK_A18_ITEMS.sch.som}</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {PHONETIK_A18_ITEMS.sch.palavras.map((p, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{p.alemao}</span>
                      <span className="text-[11px] text-slate-500">{p.traducao}</span>
                    </div>
                    <AudioButton text={p.alemao} lang="de-DE" size="xs" variant="icon-only" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco sp */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-sm font-bold font-mono bg-indigo-900 text-white">
                  sp [ʃp]
                </span>
                <span className="text-xs text-slate-500">Pronúncia inicial "ch+p"</span>
              </div>
              <p className="text-xs text-slate-600">{PHONETIK_A18_ITEMS.sp.som}</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {PHONETIK_A18_ITEMS.sp.palavras.map((p, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{p.alemao}</span>
                      <span className="text-[11px] text-slate-500">{p.traducao}</span>
                    </div>
                    <AudioButton text={p.alemao} lang="de-DE" size="xs" variant="icon-only" />
                  </div>
                ))}
              </div>

              {/* Frases com sp */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Frases Práticas:</span>
                {PHONETIK_A18_ITEMS.sp.frases.map((f, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-900 block">{f.alemao}</span>
                      <span className="text-[11px] text-slate-500">{f.traducao}</span>
                    </div>
                    <AudioButton text={f.alemao} lang="de-DE" size="xs" variant="icon-only" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.3 Texto A19 — Sprechen Sie ...? */}
      <div id="secao-2-3-a19" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Seção 2.3
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Texto A19 — Sprechen Sie ...? (Você fala ...?) — p. 13
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Perguntas diretas (<em>Ja-Nein-Fragen</em>) interrogando competência linguística com respostas afirmativas, negativas e fórmulas polidas.
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pergunta em Alemão</th>
                  <th className="py-3 px-4 text-slate-500">Tradução Pergunta</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">Resposta Modelo</th>
                  <th className="py-3 px-4 text-slate-500">Tradução Resposta</th>
                  <th className="py-3 px-4 text-right">Áudios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A19_DIALOGUES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{item.pergunta}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-500">{item.traducaoPergunta}</td>
                    <td className="py-2.5 px-4 font-semibold text-indigo-800 bg-indigo-50/20">{item.resposta}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-500">{item.traducaoResposta}</td>
                    <td className="py-2.5 px-4 text-right space-x-1">
                      <AudioButton text={item.pergunta} lang="de-DE" size="xs" variant="icon-only" />
                      <AudioButton text={item.resposta} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.4 Texto A20 — Ihre Muttersprache */}
      <div id="secao-2-4-a20" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 2.4
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Texto A20 — Ihre Muttersprache (Sua Língua Materna) — p. 14
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Perguntas sobre idiomas falados e estrutura triádica de relatos em 1ª e 3ª pessoa (<em>ich</em>, <em>er</em>, <em>sie</em>).
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Perguntas Formais e Informais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEXT_A20_STRUCTURE.perguntas.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{p.de}</span>
                  <span className="text-xs text-slate-500">{p.pt}</span>
                </div>
                <AudioButton text={p.de} lang="de-DE" size="xs" variant="icon-only" />
              </div>
            ))}
          </div>

          {/* Modelos de Relato */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEXT_A20_STRUCTURE.relatos.map((r, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-100 block">
                  {r.sujeito}
                </span>
                <div className="space-y-1.5">
                  {r.linhas.map((line, lIdx) => (
                    <div key={lIdx} className="text-xs">
                      <span className="font-semibold text-slate-800 block">{line.de}</span>
                      <span className="text-[11px] text-slate-400">{line.pt}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-950 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block">Exemplo Completo:</span>
                  <p className="font-medium">{r.exemplo}</p>
                  <div className="pt-1 flex justify-end">
                    <AudioButton text={r.exemplo} lang="de-DE" size="xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5 Texto A21 — Phonetik: Diphthong ei [aɪ] */}
      <div id="secao-2-5-a21" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Seção 2.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A21 — Phonetik: Diphthong ei [aɪ] — p. 14
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O ditongo ortográfico <strong>ei</strong> possui pronúncia idêntica ao "ai" do português.
            </p>
          </div>
          <AudioButton
            text="ein, heißen, mein, dein, Heinemann, Heimatstadt, Schweiz, Malerei, Türkei"
            lang="de-DE"
            size="sm"
            label="🇩🇪 Ouvir Todos"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PHONETIK_A21_ITEMS.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{item.palavra}</span>
                  <span className="font-mono text-xs text-amber-800 font-semibold">{item.ipa}</span>
                  <span className="text-xs text-slate-500 block">{item.traducao}</span>
                </div>
                <div className="self-end">
                  <AudioButton text={item.palavra} lang="de-DE" size="xs" variant="icon-only" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Leitura em Voz Alta (Lesen Sie laut):
            </span>
            <div className="space-y-2">
              {PHONETIK_A21_FRASES.map((f, idx) => (
                <div key={idx} className="p-3 bg-slate-50/60 rounded-xl border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-slate-900 block">{f.de}</span>
                    <span className="text-xs text-slate-500">{f.pt}</span>
                  </div>
                  <AudioButton text={f.de} lang="de-DE" size="xs" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.6 Texto A22 — Aus welchem Land kommt das Flugzeug? */}
      <div id="secao-2-6-a22" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Seção 2.6
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A22 — Aus welchem Land kommt das Flugzeug? (De que país vem o avião?) — p. 14
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              16 pares de cidades e países de origem. Aplicação prática de <em>aus + Dativo</em> e verbos de deslocamento.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              16 Rotas Internacionais
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Cidade (Stadt)</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">País (Land)</th>
                  <th className="py-3 px-4 font-medium text-slate-800">Frase Completa (Satz)</th>
                  <th className="py-3 px-4 text-slate-500">Tradução</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A22_PLANES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.cidade}</td>
                    <td className="py-2.5 px-4 font-semibold text-indigo-700 bg-indigo-50/20">{row.pais}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-800">{row.frase}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-500">{row.traducao}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={row.frase} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.7 Texto A23 — Die Zahlen (0 a 10.000) */}
      <div id="secao-2-7-a23" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 2.7
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A23 — Die Zahlen (Os Números de 0 a 10.000) — p. 15
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Tabela exaustiva dos números cardinais com escuta individual.
            </p>
          </div>
          <AudioButton
            text="null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf, zwanzig, einundzwanzig, dreißig, hundert, tausend"
            lang="de-DE"
            size="sm"
            label="🇩🇪 Ouvir Amostra"
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {TEXT_A23_NUMBERS.map((item) => (
              <div
                key={item.num}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/40 hover:border-indigo-200 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-mono font-bold text-sm text-indigo-900 block">{item.num}</span>
                  <span className="font-semibold text-slate-900 text-xs block">{item.alemao}</span>
                  <span className="text-[10px] text-slate-400">{item.pt}</span>
                </div>
                <AudioButton text={item.alemao} lang="de-DE" size="xs" variant="icon-only" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.8 Texto A24 — Flüge */}
      <div id="secao-2-8-a24" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 2.8
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Texto A24 — Flüge (Anúncios de Voos no Aeroporto) — p. 15
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Treino auditivo de números de voo de quatro dígitos e estimativas de aterrissagem em minutos.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Código do Voo</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">Origem</th>
                  <th className="py-3 px-4">Tempo de Pouso</th>
                  <th className="py-3 px-4 font-mono text-xs">Número por Extenso</th>
                  <th className="py-3 px-4">Anúncio Completo</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A24_FLUEGE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{item.voo}</td>
                    <td className="py-2.5 px-4 font-medium text-indigo-700">{item.origem}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-700">{item.tempo}</td>
                    <td className="py-2.5 px-4 font-mono text-xs text-amber-900 bg-amber-50/30">{item.extenso}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-600">{item.frase}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={item.frase} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.9 Texto A25 — Zahlen sprechen */}
      <div id="secao-2-9-a25" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              Seção 2.9
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A25 — Zahlen sprechen (Falar os Números) — p. 15
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Leitura comentada da sequência de 18 números do manual para articulação rápida.
            </p>
          </div>
          <AudioButton
            text="513, 227, 31, 21, 52, 63, 34, 42, 18, 019, 867, 077, 100, 210, 95, 364, 824, 391"
            lang="de-DE"
            size="sm"
            label="🇩🇪 Ouvir Sequência"
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TEXT_A25_ZAHLEN.map((z, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-1">
                <div>
                  <span className="font-mono font-bold text-lg text-slate-900 block">{z.num}</span>
                  <span className="text-xs text-indigo-900 font-medium leading-tight block">{z.extenso}</span>
                </div>
                <div className="self-end pt-1">
                  <AudioButton text={z.extenso} lang="de-DE" size="xs" variant="icon-only" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.10 Texto A26 — Welche Telefonnummer hat ...? */}
      <div id="secao-2-10-a26" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              Seção 2.10
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A26 — Welche Telefonnummer hat ...? — p. 15
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Números de emergência vitais na Alemanha (Polizei 110, Feuerwehr 112) e leitura de números de telefone.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
              Notrufnummern: 110 & 112
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pessoa / Serviço</th>
                  <th className="py-3 px-4 font-mono font-bold text-rose-900">Número</th>
                  <th className="py-3 px-4 font-mono text-xs">Leitura Dígito a Dígito</th>
                  <th className="py-3 px-4 font-mono text-xs text-indigo-900">Leitura em Blocos</th>
                  <th className="py-3 px-4 text-right">Ouvir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A26_TELEFON.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{t.pessoa}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-rose-700 bg-rose-50/20">{t.numero}</td>
                    <td className="py-2.5 px-4 font-mono text-xs text-slate-600">{t.extensoDigito}</td>
                    <td className="py-2.5 px-4 font-mono text-xs text-indigo-800">{t.extensoBloco}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton
                        text={`${t.pessoa} hat die Nummer ${t.numero}`}
                        lang="de-DE"
                        size="xs"
                        variant="icon-only"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.11 Tabela Lexical Primária (20 Termos) */}
      <div id="secao-2-11-lexico" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.11
            </div>
            <h3 className="text-xl font-bold text-slate-900">Tabela Lexical Primária (20 Termos Fundamentais)</h3>
            <p className="text-sm text-slate-600 mt-1">
              Vocabulário essencial do Dia 002 com artigos de cor, formas de plural e contextualização oracional.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar no vocabulário..."
              value={lexicalSearch}
              onChange={(e) => setLexicalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Palavra Alemã (com artigo)</th>
                  <th className="py-3 px-4">Classe & Plural</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">Tradução Exata</th>
                  <th className="py-3 px-4">Frase Modelo Extraída</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLexical.map((term, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{term.palavraAlema}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-600 font-mono">{term.classeGramatical}</td>
                    <td className="py-2.5 px-4 font-medium text-indigo-700 bg-indigo-50/20">{term.traducao}</td>
                    <td className="py-2.5 px-4 text-xs font-medium text-slate-800">{term.fraseModelo}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={term.palavraAlema} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.12 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="secao-2-12-coloquial" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            Seção 2.12
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Registro Coloquial e Autêntico (Umgangssprache)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Expressões idiomáticas do cotidiano alemão real para desenvolvimento de naturalidade auditiva.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COLLOQUIAL_EXPRESSIONS_02.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-2xs transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{exp.expressao}</span>
                    <AudioButton text={exp.expressao} lang="de-DE" size="xs" variant="icon-only" />
                  </div>
                  <span className="text-xs font-semibold text-amber-800 block mt-0.5">{exp.traducao}</span>
                  <p className="text-xs text-slate-500 mt-1">{exp.contexto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
