import React, { useState } from 'react';
import {
  TEXT_A1_DIALOGUE,
  TEXT_A1_GRAMMAR_NOTES,
  TEXT_A2_DIALOGUE,
  HOTEL_COMPARISON_A5,
  ANMELDEFORMULAR_FIELDS,
  TEXT_A8_DIALOGUE_ITEMS,
  GENDERS_A9,
  TEXT_A12_DIALOGUE,
  MEHRERE_EXPLANATION,
  PHONETICS_OE_EXAMPLES,
  TEXT_A15_ITEMS,
  TEXT_A16_NOMEN_NOMINATIV,
  TEXT_A17_NOMEN_AKKUSATIV,
  LEXICON_LESSON_6,
  COLLOQUIAL_LESSON_6,
} from '../data/lesson06Data';
import { AudioButton } from './AudioButton';
import {
  BookOpen,
  Search,
  Volume2,
  Building2,
  AlertCircle,
  FileCheck,
  CheckCircle,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Layers,
  PhoneCall,
  BedDouble,
  FileText,
} from 'lucide-react';

export const Bloco2TextsLexicon06: React.FC = () => {
  const [lexiconSearch, setLexiconSearch] = useState<string>('');

  const filteredLexicon = LEXICON_LESSON_6.filter(
    (item) =>
      item.palavraAlema.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.traducao.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(lexiconSearch.toLowerCase())
  );

  return (
    <section id="bloco-2-textos-lexico-rodada6" className="space-y-12">
      {/* Banner de Abertura */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 2 (60 Minutos) · Rodada 06
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 006 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transcrição Integral, Tradução & Mineração Lexical
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Kapitel 3, Teil A (A1–A17, p. 58–65): O diálogo na recepção (<em>An der Rezeption</em>), check-in de hotel, comparação dos três hotéis de Munique (Central, Krone, Am Park),
          formulário de registro cadastral (<em>Anmeldeformular</em>), fonética de <em>-er</em> e <em>ö</em>, reclamações na hospedagem (<em>Probleme im Hotelzimmer</em>),
          construção de grupos nominais no Nominativo/Acusativo e mineração de 29 termos canônicos.
        </p>
      </div>

      {/* 2.1 Texto A1 — An der Rezeption (p. 58) */}
      <div id="secao-2-1-texto-a1" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A1 — <em>An der Rezeption</em> (Na Recepção do Hotel) — p. 58
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Herr Heinemann e Herr Wegener chegam ao hotel sem reserva prévia e solicitam dois quartos individuais.
            </p>
          </div>
          <AudioButton
            text="Guten Tag, haben Sie noch ein Zimmer frei? Grüß Gott! Haben Sie eine Reservierung? Nein, wir haben leider keine Reservierung. Wir möchten gerne zwei Einzelzimmer."
            label="Áudio Diálogo A1"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Diálogo Linha a Linha com Tradução Analítica */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              Diálogo Integral e Tradução Justaposta
            </h4>
            <div className="space-y-2">
              {TEXT_A1_DIALOGUE.map((line, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    line.speaker === 'Rezeptionistin'
                      ? 'bg-indigo-50/40 border-indigo-200/70'
                      : line.speaker === 'Herr Heinemann'
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'bg-amber-50/40 border-amber-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-600">
                      {line.speaker}:
                    </span>
                    <AudioButton text={line.de} size="sm" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{line.de}</p>
                  <p className="text-xs text-slate-600 mt-0.5 italic">{line.pt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notas Gramaticais e Sintáticas do Texto A1 */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              14 Notas Sintáticas e Gramaticais do Texto A1
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TEXT_A1_GRAMMAR_NOTES.map((n, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                  <div className="font-bold text-xs text-indigo-950 font-mono">{n.item}</div>
                  <div className="text-xs text-slate-600">{n.analise}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.2 Texto A2 — Diálogo Modelo de Recepção (p. 59) */}
      <div id="secao-2-2-texto-a2" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A2 — <em>Ein Gespräch mit der Hotelrezeption</em> — p. 59
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Matriz combinatória de perguntas e respostas para reserva imediata e conferência de comodidades.
            </p>
          </div>
          <AudioButton
            text="Möchten Sie ein Einzelzimmer? Doppelzimmer? Dreibettzimmer? Wie lange möchten Sie bleiben? Hat das Zimmer ein Bad, einen Schreibtisch, einen Fernseher, eine Minibar, WLAN?"
            label="Áudio Modelo A2"
          />
        </div>

        <div className="p-6 space-y-3">
          {TEXT_A2_DIALOGUE.map((line, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600">
                <span>{line.speaker}</span>
                <AudioButton text={line.de} size="sm" />
              </div>
              <p className="text-sm font-semibold text-slate-900">{line.de}</p>
              <p className="text-xs text-slate-600 italic">{line.pt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2.3 Texto A5 — Welches Hotel nehmen Sie? (p. 61) */}
      <div id="secao-2-3-texto-a5" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A5 — <em>Welches Hotel nehmen Sie?</em> (Os 3 Hotéis de Munique) — p. 61
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Análise comparativa das fichas técnicas do Hotel Central, Hotel Krone e Hotel Am Park.
            </p>
          </div>
          <AudioButton
            text="Hotel Central, Hotel Krone und Hotel Am Park in München. Einzelzimmer mit Frühstück oder ohne Frühstück."
            label="Áudio Hotéis A5"
          />
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {HOTEL_COMPARISON_A5.map((hotel, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-lg text-slate-900">{hotel.nome}</span>
                  <span className="text-amber-500 font-mono text-sm">{hotel.estrelas}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <p><strong className="text-slate-900">Endereço:</strong> {hotel.endereco}</p>
                  <p><strong className="text-slate-900">Quartos:</strong> {hotel.zimmeranzahl}</p>
                  <p><strong className="text-slate-900">Horários:</strong> {hotel.zeiten}</p>
                  <p><strong className="text-slate-900">Localização:</strong> {hotel.lage}</p>
                  <p><strong className="text-slate-900">Cartões:</strong> {hotel.kreditkarten}</p>
                  <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-950 font-medium">
                    {hotel.preise}
                  </div>
                  <p className="pt-1"><strong className="text-slate-900">Equipamentos:</strong> {hotel.ausstattung}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 italic">
                <strong>Destaques:</strong> {hotel.besonderheiten}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.4 Texto A7 — Anmeldeformular (Dados Pessoais) */}
      <div id="secao-2-4-texto-a7" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.4
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A7 — <em>Persönliche Angaben (Anmeldeformular)</em> — p. 62
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Vocabulário técnico cadastral do formulário de registro de hóspedes em conformidade legal na Alemanha.
            </p>
          </div>
          <AudioButton
            text="Anmeldeformular, Zimmernummer, Anreisetag, Abreisetag, Staatsangehörigkeit, Postleitzahl, Unterschrift"
            label="Áudio Anmeldeformular"
          />
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3">Campo Oficial (Alemão)</th>
                  <th className="p-3">Tradução Exata</th>
                  <th className="p-3">Exemplo Canônico (Herr Heinemann)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {ANMELDEFORMULAR_FIELDS.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold font-mono text-indigo-950">{f.campo}</td>
                    <td className="p-3 text-slate-600">{f.traducao}</td>
                    <td className="p-3 font-mono text-slate-800 bg-slate-50/40">{f.valorExemplo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.5 Texto A8 — Diálogo com Análise dos 11 Verbos */}
      <div id="secao-2-5-texto-a8" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A8 — <em>Dialog mit Verben</em> — p. 62
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Resolução comentada das 11 ocorrências verbais do diálogo de check-in.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3">Nº</th>
                  <th className="p-3">Frase Completa</th>
                  <th className="p-3 text-indigo-900">Verbo Finito / Infinitivo</th>
                  <th className="p-3">Forma e Função Gramatical</th>
                  <th className="p-3 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {TEXT_A8_DIALOGUE_ITEMS.map((item) => (
                  <tr key={item.num} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono text-slate-400">{item.num}</td>
                    <td className="p-3 font-medium text-slate-900">{item.frase}</td>
                    <td className="p-3 font-bold font-mono text-indigo-950">{item.verbo}</td>
                    <td className="p-3 text-xs text-slate-600">{item.pessoa}</td>
                    <td className="p-3 text-right">
                      <AudioButton text={item.frase} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.6 Texto A9 — der – die – das (24 Itens de Hotelaria) */}
      <div id="secao-2-6-texto-a9" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.6
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A9 — <em>der – die – das</em> (Classificação de Gêneros de Hotel) — p. 62
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Distribuição canônica dos 24 substantivos essenciais de hotelaria entre os três gêneros gramaticais.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Masculino */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-4 space-y-3">
            <h4 className="font-bold text-amber-950 text-sm flex items-center justify-between border-b border-amber-200 pb-2">
              <span>der / ein (Masculino)</span>
              <span className="text-xs font-mono font-normal text-amber-800">9 substantivos</span>
            </h4>
            <div className="space-y-1.5">
              {GENDERS_A9.masculino.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-white/80 transition-colors">
                  <span className="font-mono font-bold text-amber-950">{item.termo}</span>
                  <span className="text-slate-600 italic">{item.traducao}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feminino */}
          <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4 space-y-3">
            <h4 className="font-bold text-rose-950 text-sm flex items-center justify-between border-b border-rose-200 pb-2">
              <span>die / eine (Feminino)</span>
              <span className="text-xs font-mono font-normal text-rose-800">5 substantivos</span>
            </h4>
            <div className="space-y-1.5">
              {GENDERS_A9.feminino.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-white/80 transition-colors">
                  <span className="font-mono font-bold text-rose-950">{item.termo}</span>
                  <span className="text-slate-600 italic">{item.traducao}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Neutro */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-4 space-y-3">
            <h4 className="font-bold text-blue-950 text-sm flex items-center justify-between border-b border-blue-200 pb-2">
              <span>das / ein (Neutro)</span>
              <span className="text-xs font-mono font-normal text-blue-800">10 substantivos</span>
            </h4>
            <div className="space-y-1.5">
              {GENDERS_A9.neutro.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-white/80 transition-colors">
                  <span className="font-mono font-bold text-blue-950">{item.termo}</span>
                  <span className="text-slate-600 italic">{item.traducao}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.7 & 2.11 Fonética -er [ɐ] e ö [ø:] / [œ] */}
      <div id="secao-2-7-fonetica-er-oe" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 2.7 & 2.11
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Oficina Fonética: A Vogal Reduzida <em>-er</em> [ɐ] e os <em>Umlaute</em> <em>ö</em> [ø:] e [œ]
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Treinamento acústico para o <em>Tiefschwa</em> final e os dois alofones do trema <em>ö</em>.
            </p>
          </div>
          <AudioButton
            text="das Zimmer, der Fernseher, der Kellner, schön, hören, zwölf, Wörterbuch, können, öffnen"
            label="Áudio Fonética Completa"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Fonética -er */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span>Regra do -er final [ɐ] (<em>Tiefschwa</em>)</span>
              <span className="text-xs text-indigo-600 font-mono">Texto A10 (p. 63)</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              No final de palavras, o agrupamento <strong>-er</strong> não soa como "er" consonantal com rolamento de língua, mas sim como uma vogal aberta reduzida semelhante a um "a" átono ([ɐ]): <em>das Zimmer [ˈtsɪmɐ], der Fernseher [ˈfɛʁnˌzeːɐ], der Haartrockner [ˈhaːɐ̯ˌtʁɔknɐ]</em>.
            </p>
          </div>

          {/* Fonética ö longo vs curto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-950">ö Longo [ø:] (fechado)</span>
                <AudioButton text="schön, hören, Danke schön! Wir hören gern Musik." size="sm" />
              </div>
              <p className="text-xs text-slate-600">Lábios em formato arredondado de "o", emitindo internamente o som de "e":</p>
              <ul className="text-xs space-y-1 font-mono text-slate-800">
                {PHONETICS_OE_EXAMPLES.long.map((e, idx) => (
                  <li key={idx}><strong>{e.de}</strong> — <span className="text-slate-500 font-sans italic">{e.pt}</span></li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-950">ö Curto [œ] (aberto)</span>
                <AudioButton text="zwölf, Wörter, Wörterbuch, können, möchten, öffnen" size="sm" />
              </div>
              <p className="text-xs text-slate-600">Emissão rápida antes de consoantes dobradas ou grupos consonantais:</p>
              <ul className="text-xs space-y-1 font-mono text-slate-800">
                {PHONETICS_OE_EXAMPLES.short.map((e, idx) => (
                  <li key={idx}><strong>{e.de}</strong> — <span className="text-slate-500 font-sans italic">{e.pt}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2.9 Texto A12 — Im Hotelzimmer (Reclamação & mehrere) */}
      <div id="secao-2-9-texto-a12" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.9
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A12 — <em>Im Hotelzimmer</em> (Reclamação & O Quantificador <em>mehrere</em>) — p. 63
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Peter Heinemann liga para a recepção relatando uma cascata de falhas estruturais em seu quarto.
            </p>
          </div>
          <AudioButton
            text="Ist dort die Rezeption? Ja, Sie wünschen? Hier ist Peter Heinemann, Zimmer 405. Ich habe mehrere Probleme. Die Dusche ist kaputt, es gibt keine Handtücher und kein Toilettenpapier und der Fernseher geht auch nicht."
            label="Áudio Reclamação A12"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            {TEXT_A12_DIALOGUE.map((line, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-600">
                  <span>{line.speaker}</span>
                  <AudioButton text={line.de} size="sm" />
                </div>
                <p className="text-sm font-semibold text-slate-900">{line.de}</p>
                <p className="text-xs text-slate-600 italic">{line.pt}</p>
              </div>
            ))}
          </div>

          {/* O Quantificador mehrere */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
            <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              O Quantificador Invariável <em>mehrere</em> (Vários / Várias)
            </h4>
            <p className="text-xs text-indigo-900 leading-relaxed">
              {MEHRERE_EXPLANATION.regra}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
              {MEHRERE_EXPLANATION.exemplos.map((ex, idx) => (
                <div key={idx} className="p-2 rounded bg-white border border-indigo-100">
                  <div className="font-bold text-slate-900">{ex.de}</div>
                  <div className="text-slate-500 font-sans text-xs">{ex.pt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.12 Texto A15 — Ich kann nicht ... */}
      <div id="secao-2-12-texto-a15" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.12
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Texto A15 — <em>Ich kann nicht ...</em> (Incapacidade e Verbo no Satzende) — p. 64
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Conexão entre a avaria material e a impossibilidade funcional decorrente.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TEXT_A15_ITEMS.map((item) => (
              <div key={item.num} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="text-xs text-rose-700 font-semibold">{item.problema}</div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 font-mono text-sm">{item.frase}</span>
                  <AudioButton text={item.frase} size="sm" />
                </div>
                <div className="text-xs text-slate-500 italic">{item.traducao}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.13 & 2.14 Grupo Nominal no Nominativo e Acusativo */}
      <div id="secao-2-14-grupo-nominal" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 2.13 & 2.14
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Textos A16 & A17 — <em>Die Nomengruppe im Nominativ & Akkusativ</em> — p. 65
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Declinação atributiva de adjetivos após artigos definidos (Nominativo) e indefinidos (Acusativo).
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* A16 Nominativo */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center justify-between">
              <span>Texto A16: Grupo Nominal no Nominativo</span>
              <span className="text-xs font-mono text-indigo-600">der/die/das + -e</span>
            </h4>
            <div className="space-y-2">
              {TEXT_A16_NOMEN_NOMINATIV.map((item) => (
                <div key={item.num} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 font-mono">{item.frase}</span>
                    <span className="block text-slate-500">{item.genero}</span>
                  </div>
                  <AudioButton text={item.frase} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* A17 Acusativo */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center justify-between">
              <span>Texto A17: Grupo Nominal no Acusativo</span>
              <span className="text-xs font-mono text-indigo-600">einen -en / ein -es / eine -e</span>
            </h4>
            <div className="space-y-2">
              {TEXT_A17_NOMEN_AKKUSATIV.map((item) => (
                <div key={item.num} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 font-mono">{item.frase}</span>
                    <span className="block text-indigo-700 font-medium">{item.acusativo} ({item.genero})</span>
                  </div>
                  <AudioButton text={item.frase} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.15 Tabela Lexical Primária (29 Termos Canônicos) */}
      <div id="secao-2-15-tabela-lexical" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.15
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tabela Lexical Primária da Rodada 06 (29 Termos Canônicos)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Vocabulário rigorosamente extraído de Kapitel 3, Teil A com classe, plural, tradução e áudio.
            </p>
          </div>
          {/* Barra de Busca Dinâmica */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar termo ou tradução..."
              value={lexiconSearch}
              onChange={(e) => setLexiconSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3">Palavra Alemã</th>
                  <th className="p-3">Classe & Plural</th>
                  <th className="p-3">Tradução Exata</th>
                  <th className="p-3">Frase Modelo do Texto</th>
                  <th className="p-3 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredLexicon.map((term, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold font-mono text-indigo-950">{term.palavraAlema}</td>
                    <td className="p-3 text-slate-600 font-mono text-xs">
                      <span className="block">{term.classeGramatical}</span>
                      <span className="text-slate-400">{term.plural}</span>
                    </td>
                    <td className="p-3 text-slate-800 font-medium">{term.traducao}</td>
                    <td className="p-3 text-slate-600 italic text-xs">{term.fraseModelo}</td>
                    <td className="p-3 text-right">
                      <AudioButton text={term.fraseModelo} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-slate-500 text-right">
            Exibindo {filteredLexicon.length} de {LEXICON_LESSON_6.length} termos catalogados.
          </div>
        </div>
      </div>

      {/* 2.16 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="secao-2-16-coloquial" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.16
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Registro Coloquial e Autêntico (<em>Umgangssprache</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Fórmulas expressivas, regionalismos e saudações indispensáveis na Áustria, Suíça e Alemanha.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {COLLOQUIAL_LESSON_6.map((c, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-950 font-mono text-sm">{c.expressao}</span>
                <AudioButton text={c.expressao} size="sm" />
              </div>
              <p className="text-xs font-semibold text-slate-800">{c.traducao}</p>
              <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-200/60">{c.contexto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
