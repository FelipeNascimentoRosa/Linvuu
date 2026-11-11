import React, { useState } from 'react';
import {
  PHONETIK_OE_DATA,
  HOTEL_PROBLEMS_A15,
  NOMINATIV_A16_ITEMS,
  AKKUSATIV_A17_ITEMS,
  CITY_PLACES_A18,
  PHONETIK_UE_DATA,
  SIGHTSEEING_MUNICH,
  TIME_EXPRESSIONS,
  MUSEUMS_A26_TABLE,
  EMAIL_A27_DATA,
  LEXICAL_TERMS_A14_A29,
  COLLOQUIAL_EXPRESSIONS,
} from '../../data/semana2Lesson07Data';
import { AudioButton } from '../AudioButton';
import {
  Volume2,
  CheckCircle,
  HelpCircle,
  Search,
  Sparkles,
  MapPin,
  Clock,
  Euro,
  Mail,
  Send,
  Building,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const Bloco2TextsLexiconW2L07: React.FC = () => {
  // Estados para testes fonéticos interativos
  const [oeAnswers, setOeAnswers] = useState<Record<string, string>>({});
  const [ueAnswers, setUeAnswers] = useState<Record<string, string>>({});

  // Filtro de vocabulário
  const [searchLexicon, setSearchLexicon] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('all');

  // Estado do simulador de e-mail A28
  const [emailActivity, setEmailActivity] = useState<string>('BMW Museum besuchen');
  const [emailTime, setEmailTime] = useState<string>('19.00 Uhr Fußball spielen');

  // Filtro de expressões coloquiais
  const [searchColloquial, setSearchColloquial] = useState<string>('');

  const filteredLexicon = LEXICAL_TERMS_A14_A29.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchLexicon.toLowerCase()) ||
      item.traducao.toLowerCase().includes(searchLexicon.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(searchLexicon.toLowerCase());
    const matchesClass =
      filterClass === 'all' || item.classe.toLowerCase().includes(filterClass.toLowerCase());
    return matchesSearch && matchesClass;
  });

  const filteredColloquial = COLLOQUIAL_EXPRESSIONS.filter(
    (exp) =>
      exp.expressao.toLowerCase().includes(searchColloquial.toLowerCase()) ||
      exp.traducao.toLowerCase().includes(searchColloquial.toLowerCase()) ||
      exp.contexto.toLowerCase().includes(searchColloquial.toLowerCase())
  );

  return (
    <section id="bloco2-semana2-aula7" className="space-y-12">
      {/* Banner de Abertura do Bloco 2 */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 007
            </span>
            <span className="px-3 py-1 bg-emerald-500/30 text-emerald-200 text-xs font-semibold rounded-full border border-emerald-400/30">
              Kapitel 3, Teil A (A14–A29)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 2 (60 Minutos) — Transcrição Integral, Tradução & Mineração Lexical
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Imersão em textos autênticos do capítulo: treinamento dos tremas alemães (ö/ü), soluções para queixas no hotel, locais da cidade e pontos turísticos de Munique, horários de visitação, preços e correspondência por e-mail.
          </p>
        </div>
      </div>

      {/* 2.1 Texto A14 — Phonetik: Umlaute – ö [ø:] und [œ] */}
      <div id="sec-2-1" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
              2.1
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Texto A14 — Fonética: Trema ö — [ø:] longo vs. [œ] curto (p. 64)
              </h3>
              <p className="text-xs text-slate-500">
                Posicione os lábios em formato de &quot;O&quot; fechado e tente pronunciar o som de &quot;E&quot;
              </p>
            </div>
          </div>
          <AudioButton
            text="schön, hören, Danke schön! Wir hören gern Musik. Wörter, zwölf, Wörterbuch, können, möchten, öffnen."
            label="🇩🇪 Demonstração do Som ö"
            size="sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Som ö Longo [ø:] */}
          <div className="p-5 rounded-2xl border border-teal-200 bg-teal-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-teal-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                ö longo [ø:] — vogal tensa e prolongada
              </span>
              <span className="text-xs font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                [ø:]
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {PHONETIK_OE_DATA.long.map((item, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-teal-100 text-center">
                  <span className="font-mono font-bold text-teal-950 block">{item.word}</span>
                  <span className="text-[10px] text-teal-600 block">{item.ipa}</span>
                  <span className="text-[10px] text-slate-500 block">{item.trans}</span>
                  <div className="mt-1 flex justify-center">
                    <AudioButton text={item.word} size="sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-2 border-t border-teal-100">
              <span className="text-xs font-semibold text-teal-800">Frases de Treinamento:</span>
              {PHONETIK_OE_DATA.longSentences.map((s, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-teal-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-slate-900">{s.de}</div>
                    <div className="text-slate-500 text-[11px]">{s.pt}</div>
                  </div>
                  <AudioButton text={s.de} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Som ö Curto [œ] */}
          <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-indigo-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                ö curto [œ] — vogal breve antes de consoantes duplas
              </span>
              <span className="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                [œ]
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {PHONETIK_OE_DATA.short.map((item, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-indigo-100 text-center">
                  <span className="font-mono font-bold text-indigo-950 block">{item.word}</span>
                  <span className="text-[10px] text-indigo-600 block">{item.ipa}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{item.trans}</span>
                  <div className="mt-1 flex justify-center">
                    <AudioButton text={item.word} size="sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-2 border-t border-indigo-100">
              <span className="text-xs font-semibold text-indigo-800">Frases de Treinamento:</span>
              {PHONETIK_OE_DATA.shortSentences.slice(0, 3).map((s, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-slate-900">{s.de}</div>
                    <div className="text-slate-500 text-[11px]">{s.pt}</div>
                  </div>
                  <AudioButton text={s.de} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Treinador Auditivo Interativo A14: Was hören Sie? ö oder e? */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Laboratório Auditivo: Was hören Sie? ö oder e?
              </span>
              <p className="text-xs text-slate-600">
                Clique no áudio de cada palavra e selecione se a vogal pronunciada é &quot;ö&quot; ou &quot;e&quot;
              </p>
            </div>
            <button
              onClick={() => {
                const initial: Record<string, string> = {};
                PHONETIK_OE_DATA.testItems.forEach((t) => (initial[t.id] = t.answer));
                setOeAnswers(initial);
              }}
              className="text-xs text-teal-700 font-semibold hover:underline cursor-pointer"
            >
              Revelar Gabarito do Livro
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {PHONETIK_OE_DATA.testItems.map((item, idx) => {
              const selected = oeAnswers[item.id];
              const isCorrect = selected === item.answer;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selected
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50'
                        : 'border-rose-300 bg-rose-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex justify-center mb-1.5">
                    <AudioButton text={item.word} size="sm" />
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-800 block">
                    {item.word.replace(/[öe]/gi, '...')}
                  </span>
                  <span className="text-[10px] text-slate-500 block mb-2">{item.pt}</span>
                  <div className="flex justify-center gap-1">
                    {['ö', 'e'].map((letter) => (
                      <button
                        key={letter}
                        onClick={() =>
                          setOeAnswers((prev) => ({ ...prev, [item.id]: letter }))
                        }
                        className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                          selected === letter
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                  {selected && (
                    <span className="text-[10px] font-bold block mt-1.5 text-emerald-700">
                      Gabarito: {item.answer}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2.2 Texto A15 — Ich kann nicht ... (Queixas no hotel) */}
      <div id="sec-2-2" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              2.2
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Texto A15 — Ich kann nicht ... (Eu não consigo ...) (p. 64)
              </h3>
              <p className="text-xs text-slate-500">
                Expressando impedimentos práticos com o modal können no hotel
              </p>
            </div>
          </div>
          <AudioButton
            text="Die Dusche ist kaputt. Ich kann nicht duschen. Der Fernseher geht nicht. Ich kann keinen Film sehen."
            label="🇩🇪 Áudio do Texto A15"
            size="sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {HOTEL_PROBLEMS_A15.map((prob) => (
            <div
              key={prob.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Situação #{prob.id}
                  </span>
                  <div className="font-semibold text-sm text-slate-900 mt-1">
                    {prob.situacao}
                  </div>
                  <div className="text-xs text-slate-500">
                    {prob.situacaoPt}
                  </div>
                </div>
                <AudioButton text={`${prob.situacao} ${prob.fraseCompleta}`} size="sm" />
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm font-bold text-blue-900">
                    {prob.fraseCompleta}
                  </div>
                  <div className="text-xs text-slate-500">
                    {prob.traducao}
                  </div>
                </div>
                <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                  {prob.verbo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.3 & 2.4 — Textos A16 e A17: Grupos Nominais no Nominativo e Acusativo */}
      <div id="sec-2-3-2-4" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* A16 Nominativ */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                A16
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Die Nomengruppe im Nominativ (p. 65)
                </h4>
                <p className="text-xs text-slate-500">Ist der/die/das ... kaputt?</p>
              </div>
            </div>
            <AudioButton
              text="Ist der neue Fernseher kaputt? Ist die schöne Uhr kaputt? Ist das alte Auto kaputt?"
              size="sm"
            />
          </div>

          <div className="space-y-2">
            {NOMINATIV_A16_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-900">
                    {item.fraseCompleta}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {item.traducao} ({item.genero})
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                    {item.artigoAdjetivo}
                  </span>
                  <AudioButton text={item.fraseCompleta} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* A17 Akkusativ */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                A17
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Die Nomengruppe im Akkusativ (p. 65)
                </h4>
                <p className="text-xs text-slate-500">einen neuen / eine teure / ein altes</p>
              </div>
            </div>
            <AudioButton
              text="Ich brauche einen neuen Fernseher. Martin möchte einen großen Schreibtisch. Wir brauchen ein altes Auto."
              size="sm"
            />
          </div>

          <div className="space-y-2">
            {AKKUSATIV_A17_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-900">
                    {item.fraseCompleta}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {item.traducao}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                    {item.acusativoCorreto}
                  </span>
                  <AudioButton text={item.fraseCompleta} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5 Texto A18 — Was es in einer Stadt alles gibt ... */}
      <div id="sec-2-5" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              2.5
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Texto A18 — Was es in einer Stadt alles gibt ... (p. 66)
              </h3>
              <p className="text-xs text-slate-500">
                Mapeamento das 15 instituições e locais da cidade com suas respectivas funções
              </p>
            </div>
          </div>
          <AudioButton
            text="die Touristeninformation, das Museum, das Theater, die Oper, das Kino, der Bahnhof, das Hotel, das Rathaus, das Restaurant, der Parkplatz, die Bank, die Post, die Universität, die Apotheke, das Café, der Supermarkt."
            label="🇩🇪 Locais da Cidade em Áudio"
            size="sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {CITY_PLACES_A18.map((place) => (
            <div
              key={place.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    Hier kann man: {place.atividadePt}
                  </span>
                  <span className="font-bold text-sm text-slate-900 block mt-0.5">
                    {place.localCorreto}
                  </span>
                </div>
                <AudioButton text={place.fraseCompleta} size="sm" />
              </div>
              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-600">
                {place.fraseCompleta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.6 Texto A19 — Phonetik: Umlaute – ü [y:] und [y] */}
      <div id="sec-2-6" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
              2.6
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Texto A19 — Fonética: Trema ü — [y:] longo vs. [y] curto (p. 67)
              </h3>
              <p className="text-xs text-slate-500">
                Lábios em posição de &quot;U&quot; fechado soprando o som de &quot;I&quot;
              </p>
            </div>
          </div>
          <AudioButton
            text="Frühstück, für, natürlich, Bücher, Handtücher, Züge. fünf, Schlüssel, wünschen, München, Münzen, Glück. Möchten Sie neue Handtücher?"
            label="🇩🇪 Demonstração do Som ü"
            size="sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ü longo */}
          <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-4">
            <span className="font-bold text-sm text-rose-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              ü longo [y:] — vogal aberta e tensa
            </span>
            <div className="grid grid-cols-3 gap-2">
              {PHONETIK_UE_DATA.long.map((item, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-rose-100 text-center text-xs">
                  <span className="font-mono font-bold text-rose-950 block">{item.word}</span>
                  <span className="text-[10px] text-rose-600 block">{item.ipa}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{item.trans}</span>
                  <div className="mt-1 flex justify-center">
                    <AudioButton text={item.word} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ü curto */}
          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-4">
            <span className="font-bold text-sm text-amber-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              ü curto [y] — vogal breve
            </span>
            <div className="grid grid-cols-3 gap-2">
              {PHONETIK_UE_DATA.short.map((item, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-amber-100 text-center text-xs">
                  <span className="font-mono font-bold text-amber-950 block">{item.word}</span>
                  <span className="text-[10px] text-amber-600 block">{item.ipa}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{item.trans}</span>
                  <div className="mt-1 flex justify-center">
                    <AudioButton text={item.word} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frases com ü */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Frases Modelo do Livro com Som ü:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {PHONETIK_UE_DATA.sentences.map((st, i) => (
              <div key={i} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{st.de}</div>
                  <div className="text-slate-500 text-[11px]">{st.pt}</div>
                </div>
                <AudioButton text={st.de} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.7, 2.8, 2.10, 2.13 — Pontos Turísticos de Munique (Sehenswürdigkeiten) */}
      <div id="sec-2-7-to-2-13" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              2.7–2.13
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Pontos Turísticos de Munique (Sehenswürdigkeiten in München)
              </h3>
              <p className="text-xs text-slate-500">
                Textos A20 a A26: horários de funcionamento, tarifas e informações culturais
              </p>
            </div>
          </div>
        </div>

        {/* 4 Grandes Atrações em Cards Detalhados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SIGHTSEEING_MUNICH.map((venue) => (
            <div
              key={venue.id}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {venue.tipo}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">
                      {venue.name}
                    </h4>
                    <span className="text-xs text-slate-500">{venue.namePt}</span>
                  </div>
                  <AudioButton text={`${venue.name}. ${venue.descricaoDe}`} size="sm" />
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {venue.descricaoDe}
                </p>
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  {venue.descricaoPt}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{venue.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold">{venue.offnungszeiten}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Euro className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Tageskarte: <strong>{venue.eintrittspreise.tageskarte}</strong> | Studenten: <strong>{venue.eintrittspreise.studenten}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/70">
                {venue.destaques.map((d, i) => (
                  <span key={i} className="text-[10px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                    ✓ {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tabela de 6 Museus A26 */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Texto A26 — Tabela Geral de Museus, Horários & Tarifas (p. 70)
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-2.5 px-3 font-bold">Museu</th>
                  <th className="py-2.5 px-3 font-bold">Horário de Funcionamento (Öffnungszeiten)</th>
                  <th className="py-2.5 px-3 font-bold">Preços de Entrada (Eintrittspreise)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MUSEUMS_A26_TABLE.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{m.nome}</td>
                    <td className="py-2.5 px-3 text-slate-700 font-mono">{m.horario}</td>
                    <td className="py-2.5 px-3 text-slate-700">{m.precos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.14 Texto A27 — Eine E-Mail an Klara */}
      <div id="sec-2-14" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              2.14
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Texto A27 — Eine E-Mail an Klara (p. 71)
              </h3>
              <p className="text-xs text-slate-500">
                Correspondência autêntica de Peter Heinemann direto de Munique
              </p>
            </div>
          </div>
          <AudioButton
            text={EMAIL_A27_DATA.germanBody}
            label="🇩🇪 E-mail Integral em Áudio"
            size="sm"
          />
        </div>

        {/* Janela de E-mail Estilizada */}
        <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-slate-50">
          <div className="bg-slate-200 px-4 py-2.5 flex items-center justify-between border-b border-slate-300 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="font-semibold ml-2">Neue Nachricht — {EMAIL_A27_DATA.subject}</span>
            </div>
            <span className="text-[11px] text-slate-500">München, Deutschland</span>
          </div>

          <div className="p-4 sm:p-6 bg-white space-y-4 text-xs sm:text-sm">
            <div className="space-y-1 pb-3 border-b border-slate-100 text-xs text-slate-600">
              <div><strong className="text-slate-800">Von:</strong> {EMAIL_A27_DATA.from}</div>
              <div><strong className="text-slate-800">An:</strong> {EMAIL_A27_DATA.to}</div>
              <div><strong className="text-slate-800">Betreff:</strong> {EMAIL_A27_DATA.subject}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3 font-serif text-slate-900 whitespace-pre-line leading-relaxed border-r-0 md:border-r md:border-slate-200 md:pr-6">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-indigo-700 block">
                  Original Alemão:
                </span>
                {EMAIL_A27_DATA.germanBody}
              </div>
              <div className="space-y-3 text-slate-600 whitespace-pre-line leading-relaxed">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-500 block">
                  Tradução Português:
                </span>
                {EMAIL_A27_DATA.portugueseBody}
              </div>
            </div>
          </div>
        </div>

        {/* 9 Notas Gramaticais do Texto A27 */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
            Anatomia Sintática: 9 Estruturas Fundamentais no E-mail
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EMAIL_A27_DATA.notes.map((n, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1">
                <div className="font-mono font-bold text-indigo-900">{n.frase}</div>
                <div className="text-slate-600 text-[11px]">{n.analise}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.15 & 2.16 — Textos A28 e A29: Simulador de E-mail e Marcadores de Tempo */}
      <div id="sec-2-15-2-16" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              2.15–2.16
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Textos A28 & A29 — Redação Guiada & Rotina Temporal (p. 71)
              </h3>
              <p className="text-xs text-slate-500">
                Construção autônoma de frases combinando marcadores de tempo com ações diárias
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* A28 Exemplo de Redação */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3 text-xs">
            <span className="font-bold text-sm text-slate-900 block">
              Texto A28 — Modelo de E-mail Guiado
            </span>
            <p className="text-slate-600">
              Palavras-chave: <em>günstig, Zimmer klein, Fernseher kaputt, Minibar leer, WLAN, BMW Museum besuchen, 19.00 Uhr Fußball spielen</em>.
            </p>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800">
              Liebe Klara,<br /><br />
              viele Grüße aus München. Mein Hotel liegt günstig im Zentrum. Es ist ein preiswertes Hotel. Das Hotelzimmer ist klein, aber gemütlich. Der Fernseher ist kaputt und die Minibar ist leer. Aber zum Glück gibt es WLAN. Heute Nachmittag möchte ich das BMW Museum besuchen. Um 19.00 Uhr spiele ich Fußball. Bis dahin habe ich noch etwas Zeit. Ich trinke einen Tee und esse etwas.<br /><br />
              Liebe Grüße<br />
              Dein Peter
            </div>
            <AudioButton
              text="Liebe Klara, viele Grüße aus München. Mein Hotel liegt günstig im Zentrum. Das Hotelzimmer ist klein, aber gemütlich. Der Fernseher ist kaputt und die Minibar ist leer."
              label="🇩🇪 Ouvir Trecho do E-mail"
              size="sm"
            />
          </div>

          {/* A29 Was machen Sie? */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3 text-xs">
            <span className="font-bold text-sm text-slate-900 block">
              Texto A29 — 10 Combinações Temporais (Was machen Sie?)
            </span>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {[
                { time: 'Heute Vormittag', action: 'mache ich einen Spaziergang.', pt: 'Hoje de manhã faço uma caminhada.' },
                { time: 'Heute Mittag', action: 'besuche ich das Heimatmuseum.', pt: 'Hoje ao meio-dia visito o museu local.' },
                { time: 'Heute Nachmittag', action: 'spiele ich Klavier.', pt: 'Hoje à tarde toco piano.' },
                { time: 'Heute Abend', action: 'trinke ich ein Bier.', pt: 'Hoje à noite tomo uma cerveja.' },
                { time: 'Heute Nacht', action: 'schlafe ich.', pt: 'Hoje à noite / de madrugada durmo.' },
                { time: 'Morgen Vormittag', action: 'tanze ich Tango.', pt: 'Amanhã de manhã danço tango.' },
                { time: 'Morgen Mittag', action: 'besuche ich einen Sprachkurs.', pt: 'Amanhã ao meio-dia frequento um curso de idiomas.' },
                { time: 'Morgen Nachmittag', action: 'lese ich Zeitung.', pt: 'Amanhã à tarde leio jornal.' },
                { time: 'Morgen Abend', action: 'schreibe ich eine E-Mail.', pt: 'Amanhã à noite escrevo um e-mail.' },
                { time: 'Morgen Nacht', action: 'höre ich klassische Musik.', pt: 'Amanhã de noite ouço música clássica.' },
              ].map((comb, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">{comb.time} {comb.action}</span>
                    <span className="block text-[10px] text-slate-500">{comb.pt}</span>
                  </div>
                  <AudioButton text={`${comb.time} ${comb.action}`} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.17 Tabela Lexical Primária (25 Termos) */}
      <div id="sec-2-17" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
              2.17
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tabela Lexical Primária — 25 Termos-Chave Extraídos dos Textos
              </h3>
              <p className="text-xs text-slate-500">
                Vocabulário completo com artigos definidos, plural regular, tradução precisa e frase modelo com áudio
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-48 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar termo ou tradução..."
                value={searchLexicon}
                onChange={(e) => setSearchLexicon(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-3 font-bold">Palavra (com Artigo)</th>
                <th className="py-3 px-3 font-bold">Classe & Plural</th>
                <th className="py-3 px-3 font-bold">Tradução</th>
                <th className="py-3 px-3 font-bold">Frase Modelo do Texto</th>
                <th className="py-3 px-3 font-bold text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLexicon.map((term, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {term.word}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <span className="block font-medium">{term.classe}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{term.plural}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800">
                    {term.traducao}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-900 block">{term.fraseModelo}</span>
                    <span className="text-slate-500 text-[10px] block">{term.traducaoFrase}</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <AudioButton text={`${term.word}. ${term.fraseModelo}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.18 Registro Coloquial e Autêntico (25 Expressões) */}
      <div id="sec-2-18" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
              2.18
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Registro Coloquial e Autêntico (Umgangssprache) — 25 Expressões
              </h3>
              <p className="text-xs text-slate-500">
                Expressões idiomáticas de alta frequência comunicativa com contexto pragmático de uso
              </p>
            </div>
          </div>
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar expressão..."
              value={searchColloquial}
              onChange={(e) => setSearchColloquial(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-rose-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredColloquial.map((exp, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {exp.expressao}
                </span>
                <AudioButton text={exp.expressao} size="sm" />
              </div>
              <div className="text-slate-700 font-medium">
                {exp.traducao}
              </div>
              <div className="pt-2 border-t border-slate-200/70 text-[10px] text-slate-500 font-sans">
                <strong>Contexto:</strong> {exp.contexto}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
