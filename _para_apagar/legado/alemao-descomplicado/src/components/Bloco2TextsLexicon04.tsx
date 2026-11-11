import React, { useState } from 'react';
import {
  TEXT_A1_DIALOGUE,
  OFFICE_ITEMS_A2,
  OFFICE_PRICES_A6,
  TEXT_A8_DIALOGUE,
  TEXT_A9_EXERCISE,
  TEXT_A13_SENTENCES,
  ADJECTIVE_ANTONYMS,
  LEXICON_LESSON_4,
  COLLOQUIAL_LESSON_4,
} from '../data/lesson04Data';
import { AudioButton } from './AudioButton';
import {
  BookOpen,
  Search,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Tag,
  DollarSign,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const Bloco2TextsLexicon04: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLexicon = LEXICON_LESSON_4.filter(
    (item) =>
      item.palavraAlema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.traducaoExata || item.traducao || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="bloco-2-textos-lexico-rodada4" className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 2 (60 Minutos) · Rodada 04
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 004 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transcrição Integral, Tradução & Mineração Lexical
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Capítulo 2, Parte A (A1 a A13, p. 36–46): Diálogos completos de ambientação no escritório (<em>Im Büro</em>),
          equipamentos e mobiliário com gênero morfológico, orçamentos e perguntas de preço (<em>Was kostet ...?</em>),
          diagnóstico de avarias (<em>Probleme im Büro</em>), adjetivos e antônimos aplicados e tabela lexical primária.
        </p>
      </div>

      {/* 2.1 Texto A1 — Im Büro */}
      <div id="secao-2-1-a1-im-buero" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.1 · Texto A1 (p. 36)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A1 — <em>Im Büro</em> (No Escritório)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Diálogo completo entre <strong>Frau Lisa Herzberg</strong> (Secretária) e <strong>Herr Heinemann</strong> (Novo funcionário).
            </p>
          </div>
          <AudioButton
            text="Guten Tag. Suchen Sie etwas? Ja, mein Büro. Ich bin neu hier. Sind Sie Herr Heinemann? Ja. Herzlich willkommen! Mein Name ist Lisa Herzberg, ich arbeite hier als Sekretärin. Kommen Sie! Hier ist Ihr Büro. Oh, das ist ein schönes Zimmer! Hoffentlich ist alles da. Dort stehen: der Schreibtisch, das Telefon, der Computer, der Drucker, die Schreibtischlampe, der Stuhl und hier ist das Regal. Fehlt etwas? Nein, ich glaube nicht. Vielen Dank, Frau Herzberg. Vielleicht können wir später zusammen Kaffee trinken. Gerne. Meine Telefonnummer ist die 44 22. Ganz einfach! Danke. Bis später. Bis später."
            lang="de-DE"
            label="Ouvir Diálogo Completo A1"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Diálogo Linha a Linha com Tradução e Notas */}
          <div className="space-y-3">
            {TEXT_A1_DIALOGUE.map((line, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  line.speaker.includes('Herzberg')
                    ? 'bg-indigo-50/30 border-indigo-100'
                    : 'bg-amber-50/20 border-amber-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        line.speaker.includes('Herzberg')
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'bg-amber-100 text-amber-950'
                      }`}
                    >
                      {line.speaker}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">{line.de}</span>
                  </div>
                  <AudioButton text={line.de} lang="de-DE" size="sm" />
                </div>
                <div className="text-xs text-slate-600 italic mt-1.5 pl-1 border-l-2 border-slate-300">
                  {line.pt}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 pl-1">
                  💡 <span className="font-medium">Análise gramatical:</span> {line.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.2 Texto A2 — Was ist im Büro? */}
      <div id="secao-2-2-a2-was-ist-im-buero" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.2 · Texto A2 (p. 36)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A2 — <em>Was ist im Büro?</em> (O Que Há no Escritório?)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Inventário canônico de 18 objetos de escritório com artigo definido, forma no plural e tradução.
            </p>
          </div>
          <AudioButton
            text="das Telefon, die Tasse, die Lampe, der Drucker, der Stuhl, der Schreibtisch, der Computer, der Laptop, die Maus, der Schlüssel, das Buch, die Brille, der Terminkalender, der Stift, das Handy, das Mobiltelefon, das Smartphone, die Kaffeemaschine."
            lang="de-DE"
            label="Ouvir Todos os 18 Objetos"
          />
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">Artigo</th>
                  <th className="py-2.5 px-3">Substantivo Singular</th>
                  <th className="py-2.5 px-3">Forma Plural (die)</th>
                  <th className="py-2.5 px-3">Tradução em Português</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {OFFICE_ITEMS_A2.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2.5 px-3">
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                          item.artigo === 'der'
                            ? 'bg-sky-100 text-sky-800'
                            : item.artigo === 'die'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.artigo}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{item.subst}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{item.plural}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.traducao}</td>
                    <td className="py-2.5 px-3 text-center">
                      <AudioButton text={item.audio} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.3 Texto A6 — Was kostet ...? */}
      <div id="secao-2-3-a6-was-kostet" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.3 · Texto A6 (p. 38)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A6 — <em>Was kostet ...?</em> (Quanto Custa ...?)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Cotações de equipamentos e móveis de escritório, perguntas de valor e substituição pronominal (<em>der = er</em>, <em>die = sie</em>, <em>das = es</em>).
            </p>
          </div>
          <AudioButton
            text="Was kostet der Bürostuhl? Der Bürostuhl kostet 30 Euro. 30 Euro? Das ist billig! Ja, er ist billig und modern! Der Bildschirm, er ist modern. Die Lampe, sie ist schön. Das Regal, es ist praktisch."
            lang="de-DE"
            label="Ouvir Cotações e Diálogo"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Tabela de Preços e Pronomes */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">Item de Escritório</th>
                  <th className="py-2.5 px-3">Preço em Euros</th>
                  <th className="py-2.5 px-3">Retomada Pronominal</th>
                  <th className="py-2.5 px-3">Tradução</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {OFFICE_PRICES_A6.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.item}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">{row.preco}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/40">
                      {row.pronome}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 text-xs">{row.traducao}</td>
                    <td className="py-2.5 px-3 text-center">
                      <AudioButton text={`${row.item} kostet ${row.preco.replace('€', 'Euro')}`} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modelos de Diálogo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs sm:text-sm">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block border-b border-slate-200 pb-1">
                Diálogo Modelo 1: Opinião de Preço Baixo (billig)
              </span>
              <div className="space-y-1">
                <p><strong>A:</strong> Was kostet der Bürostuhl?</p>
                <p><strong>B:</strong> Der Bürostuhl kostet 30 Euro.</p>
                <p><strong>A:</strong> 30 Euro? Das ist billig!</p>
                <p><strong>B:</strong> Ja, <strong>er</strong> ist billig und modern!</p>
              </div>
              <AudioButton
                text="Was kostet der Bürostuhl? Der Bürostuhl kostet 30 Euro. 30 Euro? Das ist billig! Ja, er ist billig und modern!"
                lang="de-DE"
                size="sm"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs sm:text-sm">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block border-b border-slate-200 pb-1">
                Diálogo Modelo 2: Opinião de Preço Alto (teuer)
              </span>
              <div className="space-y-1">
                <p><strong>A:</strong> Was kostet der Bürostuhl?</p>
                <p><strong>B:</strong> Der Bürostuhl kostet 500 Euro.</p>
                <p><strong>A:</strong> 500 Euro? Das ist teuer!</p>
                <p><strong>B:</strong> Ja, aber <strong>er</strong> ist sehr schön!</p>
              </div>
              <AudioButton
                text="Was kostet der Bürostuhl? Der Bürostuhl kostet 500 Euro. 500 Euro? Das ist teuer! Ja, aber er ist sehr schön!"
                lang="de-DE"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2.4 Texto A8 — Probleme im Büro */}
      <div id="secao-2-4-a8-probleme-im-buero" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.4 · Texto A8 (p. 39)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A8 — <em>Probleme im Büro</em> (Problemas no Escritório)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Diálogo completo de diagnóstico: a impressora não funciona, impossibilidade de imprimir e checagem de outros aparelhos.
            </p>
          </div>
          <AudioButton
            text="Na, Herr Heinemann, wie geht es? Danke, gut. Ich habe ein kleines Problem, Frau Herzberg. Mein Drucker funktioniert nicht. Ich kann nicht drucken. Was? Das ist ein neuer Drucker! Ist der Computer auch kaputt? Nein, der Computer funktioniert. Das Telefon auch. Und die Lampe geht auch? Es ist eine alte Lampe. Die Lampe funktioniert gut. Also nur der Drucker ... Ja. Ich komme gleich wieder. Ich frage mal Paul ..."
            lang="de-DE"
            label="Ouvir Diálogo Completo A8"
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {TEXT_A8_DIALOGUE.map((line, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  line.speaker.includes('Herzberg')
                    ? 'bg-indigo-50/30 border-indigo-100'
                    : 'bg-amber-50/20 border-amber-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        line.speaker.includes('Herzberg')
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'bg-amber-100 text-amber-950'
                      }`}
                    >
                      {line.speaker}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">{line.de}</span>
                  </div>
                  <AudioButton text={line.de} lang="de-DE" size="sm" />
                </div>
                <div className="text-xs text-slate-600 italic mt-1.5 pl-1 border-l-2 border-slate-300">
                  {line.pt}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 pl-1">
                  💡 <span className="font-medium">Análise gramatical:</span> {line.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5 Texto A9 — Was ist das Problem? */}
      <div id="secao-2-5-a9-was-ist-das-problem" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.5 · Texto A9 (p. 39)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A9 — <em>Was ist das Problem?</em> (Qual é o Problema?)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Associação de falha de objeto a impossibilidade de ação com o verbo modal <em>können</em>.
            </p>
          </div>
          <AudioButton
            text="Mein Drucker ist kaputt. Ich kann nicht drucken. Mein Telefon ist kaputt. Ich kann nicht telefonieren. Mein Stift ist kaputt. Ich kann nicht schreiben. Mein Computer funktioniert nicht. Ich kann nicht arbeiten. Mein Stuhl ist unbequem. Ich kann nicht sitzen. Meine Brille ist kaputt. Ich kann nicht sehen. Mein Auto geht nicht. Ich kann nicht fahren. Mein Fußball ist kaputt. Ich kann nicht Fußball spielen."
            lang="de-DE"
            label="Ouvir Todas as Frases A9"
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TEXT_A9_EXERCISE.map((ex) => (
              <div key={ex.num} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">#{ex.num}</span>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {ex.verbo}
                  </span>
                </div>
                <div className="text-xs font-medium text-rose-700">{ex.problema}</div>
                <div className="text-sm font-bold text-slate-900 font-mono">{ex.resolucao}</div>
                <div className="text-[11px] text-slate-500 italic">{ex.traducao}</div>
                <div className="pt-1 flex justify-end">
                  <AudioButton text={`${ex.problema} ${ex.resolucao}`} lang="de-DE" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.8 Texto A13 — Eine neue Kaffeemaschine */}
      <div id="secao-2-8-a13-eine-neue-kaffeemaschine" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.8 · Texto A13 (p. 40)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A13 — <em>Eine neue Kaffeemaschine</em> (17 Sentenças de Fixação Adjetiva)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Conversão de orações negativas com adjetivo predicativo em orações com adjetivo atributivo e antônimo.
            </p>
          </div>
          <AudioButton
            text="Es ist eine neue Kaffeemaschine. Es ist ein alter Computer. Es ist eine neue Uhr. Es ist ein hässliches Bild. Es ist ein interessantes Buch. Es ist ein billiges Auto. Es ist ein helles Büro. Es ist ein praktischer Schreibtisch. Es ist ein bequemer Stuhl."
            lang="de-DE"
            label="Ouvir Sentenças de Exemplo"
          />
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Frase Negativa (Predicativo)</th>
                  <th className="py-2.5 px-3">Frase Afirmativa Atributiva</th>
                  <th className="py-2.5 px-3">Desinência & Gênero</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TEXT_A13_SENTENCES.map((s) => (
                  <tr key={s.num} className={s.num % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2 px-3 font-mono text-slate-400 text-xs">{s.num}</td>
                    <td className="py-2 px-3 text-slate-600 font-mono text-xs">{s.afirmativa}</td>
                    <td className="py-2 px-3 font-bold text-slate-900 font-mono">{s.modelo}</td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-xs text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                        {s.genero}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <AudioButton text={s.modelo} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.9 Tabela Lexical Primária */}
      <div id="secao-2-9-lexico-primario" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.9
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tabela Lexical Primária da Rodada 04 (23 Termos Essenciais)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Mapeamento de vocabulário de escritório, aparelhos e verbos com classe gramatical, plural, tradução e frase modelo.
            </p>
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar termo ou tradução..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">Palavra Alemã (com artigo)</th>
                  <th className="py-2.5 px-3">Classe & Plural</th>
                  <th className="py-2.5 px-3">Tradução Exata</th>
                  <th className="py-2.5 px-3">Frase Modelo do Texto</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLexicon.map((term, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{term.palavraAlema}</td>
                    <td className="py-2.5 px-3 text-xs text-slate-600">
                      <span className="font-mono text-indigo-700">{term.classeGramatical}</span>
                      {term.plural && (
                        <>
                          <span className="text-slate-400"> · </span>
                          <span>{term.plural}</span>
                        </>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{term.traducaoExata || term.traducao}</td>
                    <td className="py-2.5 px-3 text-xs text-slate-700 italic">{term.fraseModelo}</td>
                    <td className="py-2.5 px-3 text-center">
                      <AudioButton text={term.audio || term.palavraAlema} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.10 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="secao-2-10-coloquial" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.10
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Registro Coloquial e Autêntico (<em>Umgangssprache</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Expressões orais idiomáticas de uso cotidiano no ambiente de trabalho e interações casuais.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COLLOQUIAL_LESSON_4.map((c, idx) => {
              const expr = c.expressaoAlema || c.expressao || '';
              const trad = c.traducaoExata || c.traducao || '';
              return (
                <div key={idx} className="p-3 border border-slate-200 rounded-xl bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-mono font-bold text-sm text-indigo-900">{expr}</div>
                    <AudioButton text={expr} lang="de-DE" size="sm" />
                  </div>
                  <div className="text-xs font-semibold text-slate-800">{trad}</div>
                  <div className="text-[11px] text-slate-500">{c.contexto}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
