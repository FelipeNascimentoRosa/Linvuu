import React, { useState } from 'react';
import {
  CheckCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Eye,
  EyeOff,
  Music,
  MapPin,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import {
  EXERCICIO_A5,
  EXERCICIO_A6,
  EXERCICIO_A10,
  EXERCICIO_A12,
  EXERCICIO_A13,
  EXERCICIO_A14,
  EXERCICIO_A15,
  EXERCICIO_A16,
  REVERSE_TRANSLATION_ITEMS,
  KEY_POINTS_SUMMARY,
  LESSON_METADATA,
} from '../data/lesson01Data';
import { AudioButton } from './AudioButton';

export const Bloco3ExercisesReview: React.FC = () => {
  const [revealedItems, setRevealedItems] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const revealAll = () => {
    const allRevealed = REVERSE_TRANSLATION_ITEMS.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<number, boolean>);
    setRevealedItems(allRevealed);
  };

  const hideAll = () => {
    setRevealedItems({});
  };

  return (
    <section id="bloco-3-exercicios-gabarito" className="space-y-12">
      {/* Bloco 3 Title Banner */}
      <div className="bg-gradient-to-r from-amber-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Bloco 3 (60 Minutos)
          </span>
          <span className="text-xs text-slate-300 font-medium">Resolução Comentada & Tradução Reversa</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Resolução Comentada & Tradução Reversa de Blindagem
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Exercícios do livro (A5 a A16) com resoluções comentadas detalhadas, treino de entonação e soletração auditiva,
          gabarito com justificativa sintática e tabela resumo dos 9 pontos-chave.
        </p>
      </div>

      {/* 3.1 Exercício A5 — Wer sind Sie? */}
      <div id="secao-3-1-a5" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 3.1
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exercício A5 — Wer sind Sie? (Quem é você?) — p. 10</h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Antworten Sie. Wie heißen Sie? Wie ist Ihr Vorname? Wie ist Ihr Familienname? Woher kommen Sie? Wo wohnen Sie?</em>
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pergunta</th>
                  <th className="py-3 px-4 text-indigo-900 font-bold">Resposta Modelo</th>
                  <th className="py-3 px-4">Justificativa Gramatical</th>
                  <th className="py-3 px-4 text-right">Áudio Pergunta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A5.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.pergunta}</td>
                    <td className="py-3 px-4 font-medium text-indigo-700 bg-indigo-50/30">{row.respostaModelo}</td>
                    <td className="py-3 px-4 text-xs text-slate-600">{row.justificativa}</td>
                    <td className="py-3 px-4 text-right">
                      <AudioButton text={row.pergunta} lang="de-DE" size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.2 Exercício A6 — Phonetik: Satzmelodie */}
      <div id="secao-3-2-a6" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 3.2
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercício A6 — Phonetik: Satzmelodie (Melodia da Frase) — p. 10
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Hören und wiederholen Sie. Achten Sie auf die Satzmelodie. Ich heiße Franziska Binder. Mein Name ist Peter Heinemann. Ich wohne in Marburg. Und Sie? Wie heißen Sie? Wo wohnen Sie?</em>
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Frase</th>
                  <th className="py-3 px-4">Tipo de Oração</th>
                  <th className="py-3 px-4 text-amber-900 font-bold">Melodia da Entonação</th>
                  <th className="py-3 px-4 text-right">Ouvir Melodia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A6.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.frase}</td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-600">{row.tipo}</td>
                    <td className="py-3 px-4 font-semibold text-amber-800 bg-amber-50/30">{row.melodia}</td>
                    <td className="py-3 px-4 text-right">
                      <AudioButton text={row.frase} lang="de-DE" size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-50/80 border border-violet-200 text-xs sm:text-sm text-violet-950">
            <strong>Regra Fonética:</strong> Frases declarativas e perguntas com palavra interrogativa (<em>W-Fragen</em>) têm{' '}
            <strong>entonação descendente</strong>. Perguntas de sim/não (<em>Ja-Nein-Fragen</em>) têm <strong>entonação ascendente</strong>.
          </div>
        </div>
      </div>

      {/* 3.3 Exercício A7 — Interview */}
      <div id="secao-3-3-a7" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Seção 3.3
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exercício A7 — Interview (Entrevista) — p. 10</h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Fragen Sie Ihre Nachbarin/Ihren Nachbarn und berichten Sie.</em>
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-xs block">
                Formell vs. Informell (Perguntas)
              </span>
              <p>• <strong>Wie heißen Sie?</strong> (formell) — <strong>Wie heißt du?</strong> (informell)</p>
              <p>• <strong>Woher kommen Sie?</strong> (formell) — <strong>Woher kommst du?</strong> (informell)</p>
              <p>• <strong>Wo wohnen Sie?</strong> (formell) — <strong>Wo wohnst du?</strong> (informell)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-xs block">
                Berichten (Relatar sobre o colega)
              </span>
              <p>• Meine Nachbarin / Mein Nachbar heißt ...</p>
              <p>• Sie / Er kommt aus ...</p>
              <p>• Sie / Er wohnt in ...</p>
              <p className="text-xs text-slate-500"><em>meine Nachbarin = sie | mein Nachbar = er</em></p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pergunta Formal (Sie)</th>
                  <th className="py-3 px-4 font-bold text-sky-900">Pergunta Informal (du)</th>
                  <th className="py-3 px-4 text-emerald-900 font-bold">Resposta Modelo</th>
                  <th className="py-3 px-4 text-right">Áudios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Wie heißen Sie?</td>
                  <td className="py-2.5 px-4 font-semibold text-sky-800 bg-sky-50/30">Wie heißt du?</td>
                  <td className="py-2.5 px-4 text-emerald-800 font-medium">Ich heiße [Nome].</td>
                  <td className="py-2.5 px-4 text-right space-x-1">
                    <AudioButton text="Wie heißen Sie?" lang="de-DE" size="xs" variant="icon-only" />
                    <AudioButton text="Wie heißt du?" lang="de-DE" size="xs" variant="icon-only" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Woher kommen Sie?</td>
                  <td className="py-2.5 px-4 font-semibold text-sky-800 bg-sky-50/30">Woher kommst du?</td>
                  <td className="py-2.5 px-4 text-emerald-800 font-medium">Ich komme aus [País/Cidade].</td>
                  <td className="py-2.5 px-4 text-right space-x-1">
                    <AudioButton text="Woher kommen Sie?" lang="de-DE" size="xs" variant="icon-only" />
                    <AudioButton text="Woher kommst du?" lang="de-DE" size="xs" variant="icon-only" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Wo wohnen Sie?</td>
                  <td className="py-2.5 px-4 font-semibold text-sky-800 bg-sky-50/30">Wo wohnst du?</td>
                  <td className="py-2.5 px-4 text-emerald-800 font-medium">Ich wohne in [Cidade].</td>
                  <td className="py-2.5 px-4 text-right space-x-1">
                    <AudioButton text="Wo wohnen Sie?" lang="de-DE" size="xs" variant="icon-only" />
                    <AudioButton text="Wo wohnst du?" lang="de-DE" size="xs" variant="icon-only" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950">
            <strong>Nota sobre a 2ª pessoa do singular (du):</strong> O verbo <em>heißen</em> na 2ª pessoa do singular é{' '}
            <strong>heißt</strong> (não <em>heißst</em>), devido à regra das sibilantes. O verbo <em>kommen</em> é{' '}
            <strong>kommst</strong>. O verbo <em>wohnen</em> é <strong>wohnst</strong>.
          </div>
        </div>
      </div>

      {/* 3.4 & 3.5 Exercícios A8 & A9 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* A8 */}
        <div id="secao-3-4-a8" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 3.4 · Exercício A8
          </div>
          <h4 className="font-bold text-base text-slate-900">Buchstaben (Letras) — p. 10</h4>
          <p className="text-xs text-slate-600">
            <strong>Enunciado Original:</strong> <em>Hören und wiederholen Sie.</em>
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <strong>Resolução Comentada:</strong> O alfabeto alemão possui 26 letras básicas mais 4 letras especiais
            (Ä, Ö, Ü, ß). A pronúncia é fixa e invariável. Pratique no Bloco 2 acima na Seção 2.5.
          </div>
        </div>

        {/* A9 */}
        <div id="secao-3-5-a9" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 3.5 · Exercício A9
          </div>
          <h4 className="font-bold text-base text-slate-900">Wie heißen die Leute? — p. 10</h4>
          <p className="text-xs text-slate-600">
            <strong>Enunciado Original:</strong> <em>Hören und schreiben Sie. ■ Müller</em>
          </p>
          <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-200 text-xs text-indigo-950 space-y-2">
            <div className="flex items-center justify-between">
              <strong>Nomes germânicos frequentes soletrados:</strong>
              <AudioButton text="Müller. Schmidt. Schneider. Fischer. Weber. Meyer. Wagner. Becker." lang="de-DE" size="xs" label="Ouvir Nomes" />
            </div>
            <div className="flex flex-wrap gap-1.5 font-medium">
              {['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker'].map((nome) => (
                <span key={nome} className="px-2 py-0.5 rounded bg-white border border-indigo-200 text-slate-800">
                  {nome}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              <em>Nota: A soletração (buchstabieren) é uma habilidade auditiva essencial. Pratique soletrar seu próprio nome usando o alfabeto.</em>
            </p>
          </div>
        </div>
      </div>

      {/* 3.6 Exercício A10 — Cidades, Países e Soletração */}
      <div id="secao-3-6-a10" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            Seção 3.6
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercício A10 — In welchem Land ist die Stadt? (Em que país fica a cidade?) — p. 11
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Fragen und antworten Sie. Buchstabieren Sie die Namen der Städte. Düsseldorf, München, Paris, Athen, Bukarest, Budapest, Venedig, Peking, Wien, Porto, London, Stockholm, Brüssel, Kopenhagen, Köln.</em>
          </p>
          <div className="mt-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700">
            <em>Modelo:</em> Woher kommen Sie? — Ich komme aus Düsseldorf. Ich buchstabiere: D-ü-s-s-e-l-d-o-r-f. Wo ist Düsseldorf? — Düsseldorf ist in Deutschland.
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Cidade</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">País</th>
                  <th className="py-3 px-4 font-mono text-xs">Soletração Fonética</th>
                  <th className="py-3 px-4 text-right">Ouvir Soletração</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A10.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{item.cidade}</td>
                    <td className="py-2.5 px-4 font-medium text-indigo-700 bg-indigo-50/20">{item.pais}</td>
                    <td className="py-2.5 px-4 font-mono text-xs text-slate-600">{item.soletra}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={item.soletra} lang="de-DE" isSpelling size="xs" label="🔤 Soletrar" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.7 Exercício A11 */}
      <div id="secao-3-7-a11" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Seção 3.7 · Exercício A11
        </div>
        <h4 className="font-bold text-lg text-slate-900">Persönliche Informationen (Informações Pessoais) — p. 11</h4>
        <p className="text-sm text-slate-600">
          <strong>Enunciado Original:</strong> <em>Buchstabieren Sie. Wie heißen Sie? (Buchstabieren Sie Ihren Namen.) Woher kommen Sie? (Buchstabieren Sie Ihre Heimatstadt.) In welchem Land ist Ihre Heimatstadt? (Buchstabieren Sie Ihr Land.)</em>
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
          <strong>Resolução Comentada / Estrutura Padrão:</strong>
          <p>• <em>Ich heiße [Nome]. Ich buchstabiere: [letra por letra].</em></p>
          <p>• <em>Ich komme aus [Cidade]. Ich buchstabiere: [letra por letra].</em></p>
          <p>• <em>[Cidade] ist in [País]. Ich buchstabiere: [letra por letra].</em></p>
        </div>
      </div>

      {/* 3.8 Exercício A12 — Berufe */}
      <div id="secao-3-8-a12" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            Seção 3.8
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exercício A12 — Berufe (Profissões) — p. 11</h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Hören und ergänzen Sie. Ich bin Lehrer. Ingenieur, Mathematiker, Student, Taxifahrer, Assistent. Ich bin Lehrerin. Kellnerin, Managerin, Architektin, Ärztin.</em>
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-sky-950 bg-sky-50/50">Masculino</th>
                  <th className="py-3 px-4 font-bold text-rose-950 bg-rose-50/50">Feminino</th>
                  <th className="py-3 px-4 text-right">Ouvir Par</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A12.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-semibold text-slate-800 bg-sky-50/20">{row.masculino}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800 bg-rose-50/20">{row.feminino}</td>
                    <td className="py-2.5 px-4 text-right space-x-1">
                      <AudioButton text={row.masculino} lang="de-DE" size="xs" variant="icon-only" />
                      <AudioButton text={row.feminino} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Regra:</strong> O feminino é formado adicionando <em>-in</em> ao radical masculino. Para masculinos
            terminados em <em>-er</em>, adiciona-se <em>-in</em> (<em>der Lehrer → die Lehrerin</em>). Para masculinos
            terminados em consoante, adiciona-se <em>-in</em> com possível Umlaut (<em>der Arzt → die Ärztin</em>).
          </div>
        </div>
      </div>

      {/* 3.9 Exercício A13 — Wie heißen die Berufe? */}
      <div id="secao-3-9-a13" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 3.9
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercício A13 — Wie heißen die Berufe? (Como se chamam as profissões?) — p. 11
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Ergänzen Sie die maskuline oder feminine Form. Informatiker, Ingenieur, Ärztin, Chemiker, Musikerin, Juristin, Physiker, Philosoph, Malerin, Journalist. Später bin ich... Später ist er... Später ist sie...</em>
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3 text-center w-12">Nº</th>
                  <th className="py-3 px-4 font-bold">Estudante</th>
                  <th className="py-3 px-4 font-bold text-amber-900">Área de Estudo</th>
                  <th className="py-3 px-4 font-semibold text-sky-800">Profissão Masc.</th>
                  <th className="py-3 px-4 font-semibold text-rose-800">Profissão Fem.</th>
                  <th className="py-3 px-4">Frase Completa</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A13.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 text-center font-mono text-slate-400 text-xs">{item.id}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{item.estudante}</td>
                    <td className="py-2.5 px-4 font-medium text-amber-900">{item.area}</td>
                    <td className="py-2.5 px-4 text-sky-800">{item.masc}</td>
                    <td className="py-2.5 px-4 text-rose-800">{item.fem}</td>
                    <td className="py-2.5 px-4 text-xs font-medium text-slate-700">{item.fraseCompleta}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={item.fraseCompleta} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.10 Exercício A14 — Welche Berufe passen? */}
      <div id="secao-3-10-a14" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 3.10
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercício A14 — Welche Berufe passen? (Quais profissões se encaixam?) — p. 12
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Ordnen Sie zu. Architekt/Architektin, Maler/Malerin, Koch/Köchin, Mechaniker/Mechanikerin, Polizist/Polizistin, Arzt/Ärztin, Ingenieur/Ingenieurin, Kellner/Kellnerin. Und Sie? Was sind Sie von Beruf?</em>
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Elemento Visual / Ferramenta</th>
                  <th className="py-3 px-4 font-bold text-emerald-900">Profissão Correspondente</th>
                  <th className="py-3 px-4">Justificativa Semântica</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A14.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-medium text-slate-800">{row.imagem}</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700 bg-emerald-50/20">{row.profissao}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-600">{row.justificativa}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={row.profissao} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.11 Exercício A15 — Konjugation der Verben */}
      <div id="secao-3-11-a15" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 3.11
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercício A15 — Konjugation der Verben (Conjugação dos Verbos) — p. 12
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Ergänzen Sie die Endungen (kommen, wohnen, heißen, sein).</em>
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pronome / Pessoa</th>
                  <th className="py-3 px-4 font-semibold text-indigo-900">kommen</th>
                  <th className="py-3 px-4 font-semibold text-indigo-900">wohnen</th>
                  <th className="py-3 px-4 font-semibold text-amber-900">heißen</th>
                  <th className="py-3 px-4 font-semibold text-emerald-900">sein</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A15.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 font-mono text-xs sm:text-sm">
                    <td className="py-2.5 px-4 font-bold text-slate-900 font-sans">{row.pronome}</td>
                    <td className="py-2.5 px-4 text-indigo-700">{row.kommen}</td>
                    <td className="py-2.5 px-4 text-indigo-700">{row.wohnen}</td>
                    <td className="py-2.5 px-4 text-amber-800 font-semibold">{row.heissen}</td>
                    <td className="py-2.5 px-4 text-emerald-700 font-semibold">{row.sein}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
            <strong>Nota:</strong> O verbo <em>heißen</em> na 2ª pessoa do singular é <strong>heißt</strong> (não <em>heißst</em>), devido à regra das sibilantes.
          </div>
        </div>
      </div>

      {/* 3.12 Exercício A16 — Verben */}
      <div id="secao-3-12-a16" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Seção 3.12
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exercício A16 — Verben (Verbos) — p. 12</h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Ergänzen Sie as formas corretas dos verbos entre parênteses.</em>
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3 text-center w-12">Nº</th>
                  <th className="py-3 px-4 font-bold text-slate-900">Frase Completa</th>
                  <th className="py-3 px-4">Justificativa Gramatical</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXERCICIO_A16.map((row) => (
                  <tr key={row.n} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 text-center font-mono text-slate-400 text-xs">{row.n}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.fraseCompleta}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-600">{row.justificativa}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={row.fraseCompleta} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.13 & 3.14 Tradução Reversa de Blindagem & Gabarito Comentado */}
      <div id="secao-3-13-traducao-reversa" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              Seções 3.13 & 3.14
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tradução Reversa de Blindagem (Português → Alemão) & Gabarito
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Traduza as sentenças para o alemão aplicando as regras de V2, conjugação e casos. Verifique a análise passo a passo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={revealAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Revelar Todos</span>
            </button>
            <button
              onClick={hideAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Ocultar Todos</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {REVERSE_TRANSLATION_ITEMS.map((item) => {
            const isRevealed = !!revealedItems[item.id];
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Sentença {item.id} de 10 (Português)
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-900">"{item.portugues}"</p>
                  </div>

                  <button
                    onClick={() => toggleReveal(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shrink-0"
                  >
                    {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{isRevealed ? 'Ocultar Gabarito' : 'Verificar Resposta'}</span>
                  </button>
                </div>

                {isRevealed && (
                  <div className="pt-3 border-t border-slate-200/80 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between gap-2 bg-emerald-50/80 p-3 rounded-lg border border-emerald-200">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                          Tradução Alemã Correta:
                        </span>
                        <p className="text-sm sm:text-base font-bold text-emerald-950">{item.alemao}</p>
                      </div>
                      <AudioButton text={item.alemao} lang="de-DE" size="sm" />
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                      <strong className="text-slate-900 block font-semibold">Análise de Blindagem Gramatical:</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        {item.explicacao.map((exp, eIdx) => (
                          <li key={eIdx}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.15 Resumo dos Pontos-Chave do Dia 001 */}
      <div id="secao-3-15-resumo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
            Seção 3.15
          </div>
          <h3 className="text-xl font-bold text-slate-900">Resumo dos Pontos-Chave do Dia 001</h3>
          <p className="text-sm text-slate-600 mt-1">
            Matriz de referência rápida para memorização e consulta permanente.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-slate-900 w-1/3">Conceito</th>
                  <th className="py-3 px-4 font-bold text-indigo-950">Regra Sintática / Morfológica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {KEY_POINTS_SUMMARY.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/30">{item.conceito}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{item.regra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Próxima Rodada Notice */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                Fim da Aula 01 · Rodada 01
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                Próxima Rodada: RODADA 02 — DIA 002
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {LESSON_METADATA.nextRound}
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-xs font-medium text-slate-200 border border-white/20">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Registros Concluídos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
