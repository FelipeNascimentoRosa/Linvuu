import React, { useState } from 'react';
import {
  GERMAN_CITIES_RANKING,
  MUNICH_PROFILE_DATA,
  HOTEL_REDEMITTEL_DIALOGS,
  VERB_DICTIONARY_D2,
  LEXICAL_TERMS_DIA_008,
  COLLOQUIAL_DIA_008,
} from '../../data/semana2Lesson08Data';
import { AudioButton } from '../AudioButton';
import {
  Search,
  MapPin,
  Building,
  GraduationCap,
  Beer,
  Clock,
  Compass,
  Sparkles,
  BookOpen,
  Info,
  CheckCircle,
} from 'lucide-react';

export const Bloco2TextsLexiconW2L08: React.FC = () => {
  const [searchLexicon, setSearchLexicon] = useState<string>('');
  const [searchColloquial, setSearchColloquial] = useState<string>('');
  const [selectedVerb, setSelectedVerb] = useState<string>(VERB_DICTIONARY_D2[0].verbo);

  const filteredLexicon = LEXICAL_TERMS_DIA_008.filter((item) => {
    return (
      item.word.toLowerCase().includes(searchLexicon.toLowerCase()) ||
      item.traducao.toLowerCase().includes(searchLexicon.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(searchLexicon.toLowerCase())
    );
  });

  const filteredColloquial = COLLOQUIAL_DIA_008.filter((exp) => {
    return (
      exp.expressao.toLowerCase().includes(searchColloquial.toLowerCase()) ||
      exp.traducao.toLowerCase().includes(searchColloquial.toLowerCase()) ||
      exp.contexto.toLowerCase().includes(searchColloquial.toLowerCase())
    );
  });

  const activeVerbData =
    VERB_DICTIONARY_D2.find((v) => v.verbo === selectedVerb) || VERB_DICTIONARY_D2[0];

  return (
    <section id="bloco2-semana2-aula8" className="space-y-12">
      {/* Banner de Abertura do Bloco 2 */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-teal-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 008
            </span>
            <span className="px-3 py-1 bg-teal-500/30 text-teal-200 text-xs font-semibold rounded-full border border-teal-400/30">
              Kapitel 3, Teil B, C e D (p. 72–84)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 2 (60 Minutos) — Transcrição Integral, Tradução & Mineração Lexical
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Exploração cultural das cidades alemãs mais visitadas, geografia da Alemanha (pontos cardeais), radiografia de Munique (universidades, teatros, museus, indústrias e o Hofbräuhaus), diálogos autênticos de reserva e recepção hoteleira e pequeno dicionário de 21 verbos essenciais.
          </p>
        </div>
      </div>

      {/* 2.1 & 2.3 — Cidades Mais Visitadas & Pontos Cardeais (Textos B1, B2 e B3) */}
      <div id="sec-2-1-to-2-3" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
              2.1–2.3
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Textos B1 a B3 — Ranking das Cidades Mais Visitadas & Pontos Cardeais (p. 72)
              </h3>
              <p className="text-xs text-slate-500">
                Welche Stadt hat die meisten Besucher? Wo liegt ...? (im Norden, im Süden, im Osten, im Westen, in der Mitte)
              </p>
            </div>
          </div>
          <AudioButton
            text="Berlin liegt im Osten von Deutschland. Hamburg liegt im Norden. München liegt im Süden. Köln liegt im Westen. Frankfurt am Main liegt im Westen."
            label="🇩🇪 Cidades e Regiões em Áudio"
            size="sm"
          />
        </div>

        {/* Grade de Pontos Cardeais da Alemanha */}
        <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40 space-y-3">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Preposições dos Pontos Cardeais (Wo liegt...?)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center font-mono">
            <div className="p-2 bg-white rounded-lg border border-teal-100">
              <span className="text-[10px] text-slate-500 block">Norte</span>
              <strong className="text-teal-950">im Norden</strong>
            </div>
            <div className="p-2 bg-white rounded-lg border border-teal-100">
              <span className="text-[10px] text-slate-500 block">Sul</span>
              <strong className="text-teal-950">im Süden</strong>
            </div>
            <div className="p-2 bg-white rounded-lg border border-teal-100">
              <span className="text-[10px] text-slate-500 block">Leste</span>
              <strong className="text-teal-950">im Osten</strong>
            </div>
            <div className="p-2 bg-white rounded-lg border border-teal-100">
              <span className="text-[10px] text-slate-500 block">Oeste</span>
              <strong className="text-teal-950">im Westen</strong>
            </div>
            <div className="p-2 bg-white rounded-lg border border-teal-100 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 block">Centro</span>
              <strong className="text-amber-800">in der Mitte</strong>
            </div>
          </div>
        </div>

        {/* Tabela do Ranking com Cidades e Visitantes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3 font-bold text-center">Posição</th>
                <th className="py-2.5 px-3 font-bold">Cidade</th>
                <th className="py-2.5 px-3 font-bold">Visitantes / Ano</th>
                <th className="py-2.5 px-3 font-bold">Localização Geográfica</th>
                <th className="py-2.5 px-3 font-bold text-center">Pronúncia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {GERMAN_CITIES_RANKING.map((c) => (
                <tr key={c.pos} className="hover:bg-slate-50/60">
                  <td className="py-2 px-3 text-center font-bold text-teal-800 font-mono">
                    #{c.pos}
                  </td>
                  <td className="py-2 px-3 font-bold text-slate-900">
                    {c.cidade}
                  </td>
                  <td className="py-2 px-3 text-slate-700 font-mono">
                    {c.visitantesAno}
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium">
                      {c.regiao}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <AudioButton text={`${c.cidade} liegt ${c.regiao}.`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.4, 2.5 & 2.6 — Munique: A Capital da Baviera (Textos B4, B5 e B6) */}
      <div id="sec-2-4-to-2-6" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              2.4–2.6
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Textos B4 a B6 — München: Die Landeshauptstadt Bayerns (p. 73)
              </h3>
              <p className="text-xs text-slate-500">
                Perfil socioeconômico e cultural da capital bávara + modelo para apresentar sua própria cidade natal
              </p>
            </div>
          </div>
          <AudioButton
            text="In München wohnen ca. 1,56 Millionen Menschen. München liegt im Süden von Deutschland und ist die Landeshauptstadt von Bayern. München hat zwei Universitäten: die Ludwig-Maximilians-Universität und die Technische Universität."
            label="🇩🇪 Perfil de Munique em Áudio"
            size="sm"
          />
        </div>

        {/* Destaques em Cartões Visuais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* População e Posição */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <MapPin className="w-4 h-4" />
              <span>População & Localização</span>
            </div>
            <div className="text-slate-900 font-bold text-sm">
              {MUNICH_PROFILE_DATA.population}
            </div>
            <div className="text-slate-600">
              {MUNICH_PROFILE_DATA.location}
            </div>
          </div>

          {/* Universidades */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-700 font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>Universidades</span>
            </div>
            <div className="text-slate-900 font-bold text-sm">
              LMU & TU München
            </div>
            <div className="text-slate-600">
              51.000 estudantes só na LMU
            </div>
          </div>

          {/* Cultura */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-purple-700 font-bold">
              <Building className="w-4 h-4" />
              <span>Teatros & Museus</span>
            </div>
            <div className="text-slate-900 font-bold text-sm">
              71 Teatros & 50 Museus
            </div>
            <div className="text-slate-600">
              3 grandes orquestras sinfônicas
            </div>
          </div>

          {/* Cervejaria e Tradição */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <Beer className="w-4 h-4" />
              <span>Hofbräuhaus</span>
            </div>
            <div className="text-slate-900 font-bold text-sm">
              400 anos de história
            </div>
            <div className="text-slate-600">
              1.000 litros de cerveja por dia
            </div>
          </div>
        </div>

        {/* Grandes Indústrias sediadas em Munique */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/30 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Grandes Corporações Globais Sediadas em Munique:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {MUNICH_PROFILE_DATA.firms.map((firm, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-xs">
                <span className="font-bold text-slate-900 block text-sm">{firm.name}</span>
                <span className="text-slate-500 text-[11px] block mt-1">{firm.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.16 Texto D1 — Wichtige Redemittel (Diálogos no Hotel & Turismo) */}
      <div id="sec-2-16" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              2.16
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Texto D1 — Wichtige Redemittel: No Hotel & Turismo (p. 82)
              </h3>
              <p className="text-xs text-slate-500">
                Frases de alta utilidade comunicativa: reserva de quarto, comodidades, preços e horários de museus
              </p>
            </div>
          </div>
          <AudioButton
            text="Haben Sie noch ein Zimmer frei? Wir möchten gerne ein Doppelzimmer. Wie viel kostet ein Doppelzimmer? Das Zimmer kostet 80 Euro pro Nacht."
            label="🇩🇪 Diálogo do Hotel em Áudio"
            size="sm"
          />
        </div>

        <div className="space-y-3">
          {HOTEL_REDEMITTEL_DIALOGS.map((d, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 text-xs sm:text-sm ${
                d.role === 'Hotelgast'
                  ? 'border-blue-200 bg-blue-50/40 ml-0 mr-4'
                  : 'border-emerald-200 bg-emerald-50/40 ml-4 mr-0'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  d.role === 'Hotelgast' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {d.role}
                </span>
                <div className="font-semibold text-slate-900 mt-1">{d.de}</div>
                <div className="text-slate-500 text-xs">{d.pt}</div>
              </div>
              <AudioButton text={d.de} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* 2.17 Texto D2 — Kleines Wörterbuch der Verben (21 Verbos) */}
      <div id="sec-2-17" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              2.17
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Texto D2 — Kleines Wörterbuch der Verben (21 Verbos Chave) — p. 83
              </h3>
              <p className="text-xs text-slate-500">
                Dicionário compacto com paradigmas de conjugação, regência e aplicação prática
              </p>
            </div>
          </div>
        </div>

        {/* Navegador Interativo dos 21 Verbos */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
          {VERB_DICTIONARY_D2.map((v) => (
            <button
              key={v.verbo}
              onClick={() => setSelectedVerb(v.verbo)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedVerb === v.verbo
                  ? 'bg-purple-900 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {v.verbo}
            </button>
          ))}
        </div>

        {/* Card do Verbo Selecionado */}
        <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/30 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Verbo Selecionado
              </span>
              <h4 className="text-2xl font-mono font-bold text-purple-950 mt-0.5">
                {activeVerbData.verbo}
              </h4>
              <span className="text-xs text-slate-600 font-medium">
                Significado: {activeVerbData.traducao}
              </span>
            </div>
            <AudioButton text={`${activeVerbData.verbo}. ${activeVerbData.exemplo}`} size="sm" />
          </div>

          <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1 text-xs">
            <div className="font-semibold text-slate-900">
              {activeVerbData.exemplo}
            </div>
            <div className="text-slate-500 text-[11px]">
              {activeVerbData.exemploPt}
            </div>
          </div>

          <div className="text-[11px] text-purple-900 font-mono bg-purple-100/70 p-2.5 rounded-lg">
            <strong>Formas principais:</strong> {activeVerbData.conjugacao}
          </div>
        </div>
      </div>

      {/* 2.19 Tabela Lexical Primária (28 Termos) */}
      <div id="sec-2-19" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
              2.19
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tabela Lexical Primária — 28 Termos Fundamentais do Dia 008
              </h3>
              <p className="text-xs text-slate-500">
                Vocabulário minerado dos textos com gênero, artigo, plural exato, tradução e frase modelo
              </p>
            </div>
          </div>
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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-3 font-bold">Palavra (com Artigo)</th>
                <th className="py-3 px-3 font-bold">Classe & Plural</th>
                <th className="py-3 px-3 font-bold">Tradução</th>
                <th className="py-3 px-3 font-bold">Frase Modelo</th>
                <th className="py-3 px-3 font-bold text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLexicon.map((term, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {term.word}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    <span className="block font-medium">{term.classe}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{term.plural}</span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    {term.traducao}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-medium text-slate-900 block">{term.fraseModelo}</span>
                    <span className="text-slate-500 text-[10px] block">{term.traducaoFrase}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <AudioButton text={`${term.word}. ${term.fraseModelo}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.20 Umgangssprache (30 Expressões) */}
      <div id="sec-2-20" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
              2.20
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Registro Coloquial e Autêntico (Umgangssprache) — 30 Expressões
              </h3>
              <p className="text-xs text-slate-500">
                Expressões idiomáticas do cotidiano com contexto pragmático de uso
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
