import React from 'react';
import {
  FEMININE_SUFFIXES,
  MASCULINE_SUFFIXES,
  NEUTER_SUFFIXES,
  CONTRAST_TRAPS_LESSON_4,
  KOENNEN_CONJUGATION,
  SATZKLAMMER_EXAMPLES,
  KOENNEN_USES,
  NICHT_VS_KEIN_VERB,
  KEIN_DECLENSION,
  PREDICATIVE_ADJECTIVES,
  ATTRIBUTIVE_DECLENSION,
  ADJECTIVE_ANTONYMS,
  VOWEL_CHANGE_VERBS,
  LOCAL_PREPOSITIONS,
} from '../data/lesson04Data';
import { AudioButton } from './AudioButton';
import { CheckCircle, AlertTriangle, BookOpen, Layers, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const Bloco1Grammar04: React.FC = () => {
  return (
    <section id="bloco-1-gramatica-rodada4" className="space-y-12">
      {/* Banner de Abertura */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada 04
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 004 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomia Gramatical Pura & Sintaxe Rígida
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Mapeamento morfofonológico dos sufixos de gênero (<em>der</em>, <em>die</em>, <em>das</em>), o verbo modal <em>können</em> e a <strong>Satzklammer</strong> (pinça oracional),
          a fronteira categórica entre <em>nicht</em> e <em>kein</em>, a declinação do adjetivo atributivo vs. predicativo, pares de antônimos, alternâncias vocálicas e preposições locais.
        </p>
      </div>

      {/* 1.1 O Gênero dos Substantivos — Regras de Sufixos */}
      <div id="secao-1-1-generos-sufixos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Gênero dos Substantivos — Regras Morfológicas de Sufixos
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O alemão possui três gêneros: masculino (<em>der</em>), feminino (<em>die</em>) e neutro (<em>das</em>).
              Embora não haja regra empírica 100% universal para radicais primários, <strong>as terminações e sufixos derivacionais determinam com precisão matemática o gênero</strong>.
            </p>
          </div>
          <AudioButton
            text="Die Zeitung, die Freiheit, die Möglichkeit, die Freundschaft, die Lampe, die Lehrerin, die Information, die Universität. Der Lehrer, der Computer, der Frühling, der Tourismus, der Motor, der Montag. Das Mädchen, das Fräulein, das Dokument, das Museum, das Ergebnis."
            lang="de-DE"
            label="Ouvir Sufixos e Exemplos"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* 3 Colunas de Sufixos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feminino */}
            <div className="border border-rose-200 rounded-xl overflow-hidden bg-rose-50/20">
              <div className="px-4 py-3 bg-rose-100/70 border-b border-rose-200 flex items-center justify-between">
                <span className="font-bold text-rose-900 text-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Sufixos Femininos (die)
                </span>
                <span className="text-[11px] font-mono font-bold text-rose-700">Artigo: die</span>
              </div>
              <div className="divide-y divide-rose-100">
                {FEMININE_SUFFIXES.map((item) => (
                  <div key={item.sufixo} className="p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-rose-700 bg-rose-100/80 px-1.5 py-0.5 rounded text-xs">
                        {item.sufixo}
                      </span>
                      <AudioButton text={item.exemplo} lang="de-DE" size="sm" />
                    </div>
                    <div className="font-semibold text-slate-900">{item.exemplo}</div>
                    <div className="text-slate-600 italic">{item.traducao}</div>
                    {item.nota && <div className="text-[11px] text-slate-500">{item.nota}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Masculino */}
            <div className="border border-sky-200 rounded-xl overflow-hidden bg-sky-50/20">
              <div className="px-4 py-3 bg-sky-100/70 border-b border-sky-200 flex items-center justify-between">
                <span className="font-bold text-sky-900 text-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Sufixos Masculinos (der)
                </span>
                <span className="text-[11px] font-mono font-bold text-sky-700">Artigo: der</span>
              </div>
              <div className="divide-y divide-sky-100">
                {MASCULINE_SUFFIXES.map((item) => (
                  <div key={item.sufixo} className="p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sky-700 bg-sky-100/80 px-1.5 py-0.5 rounded text-xs">
                        {item.sufixo}
                      </span>
                      <AudioButton text={item.exemplo} lang="de-DE" size="sm" />
                    </div>
                    <div className="font-semibold text-slate-900">{item.exemplo}</div>
                    <div className="text-slate-600 italic">{item.traducao}</div>
                    {item.nota && <div className="text-[11px] text-slate-500">{item.nota}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Neutro */}
            <div className="border border-emerald-200 rounded-xl overflow-hidden bg-emerald-50/20">
              <div className="px-4 py-3 bg-emerald-100/70 border-b border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Sufixos Neutros (das)
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700">Artigo: das</span>
              </div>
              <div className="divide-y divide-emerald-100">
                {NEUTER_SUFFIXES.map((item) => (
                  <div key={item.sufixo} className="p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded text-xs">
                        {item.sufixo}
                      </span>
                      <AudioButton text={item.exemplo} lang="de-DE" size="sm" />
                    </div>
                    <div className="font-semibold text-slate-900">{item.exemplo}</div>
                    <div className="text-slate-600 italic">{item.traducao}</div>
                    {item.nota && <div className="text-[11px] text-slate-500">{item.nota}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Travas de Contraste */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Trava de Contraste Crítica: O Gênero Gramatical Não Coincide Entre as Línguas
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
              {CONTRAST_TRAPS_LESSON_4.map((trap, idx) => (
                <div key={idx} className="bg-white/80 border border-amber-200/80 rounded-lg p-3 space-y-1">
                  <div className="font-semibold text-slate-900 flex items-center justify-between">
                    <span>{trap.portugues}</span>
                    <AudioButton text={trap.alemaoCorreto} lang="de-DE" size="sm" />
                  </div>
                  <div className="text-emerald-700 font-mono font-medium">✓ {trap.alemaoCorreto}</div>
                  <div className="text-rose-600 font-mono line-through">✗ {trap.alemaoIncorreto}</div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">{trap.nota}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 O Modalverb können & A Satzklammer */}
      <div id="secao-1-2-modalverb-koennen" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Modalverb <em>können</em> (Poder / Saber Fazer) & A <em>Satzklammer</em> (Pinça Frasal)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O verbo modal <em>können</em> expressa capacidade (saber fazer), possibilidade e habilidade.
              Como todos os modais germânicos, <strong>a 1ª e a 3ª pessoas do singular são rigorosamente idênticas</strong> e não recebem desinência <em>-t</em>.
            </p>
          </div>
          <AudioButton
            text="Ich kann, du kannst, er kann, wir können, ihr könnt, sie können. Ich kann sehr gut kochen. Man kann hier Zeitungen lesen."
            lang="de-DE"
            label="Ouvir Conjugação de können"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Matriz de Conjugação */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Conjugação Completa no Präsens — <em>können</em>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-4">Pessoa & Pronome</th>
                    <th className="py-2.5 px-4">Forma Conjugada</th>
                    <th className="py-2.5 px-4">Anatomia Morfológica & Regra</th>
                    <th className="py-2.5 px-4 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {KOENNEN_CONJUGATION.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-mono font-medium text-slate-700">{row.pronomes || row.pronome}</td>
                      <td className="py-2.5 px-4 font-bold text-indigo-700 text-base">{row.forma}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">{row.destaque}</td>
                      <td className="py-2.5 px-4 text-center">
                        <AudioButton text={`${(row.pronomes || row.pronome || '').split(' ')[0]} ${row.forma}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* A Satzklammer (Pinça Oracional) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                A <em>Satzklammer</em> (Pinça Oracional com Verbos Modais)
              </h4>
              <span className="text-xs text-slate-500 font-medium">Posição II (Modal) ↔ Satzende (Infinitiv)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              O verbo modal conjugado ocupa a <strong>Posição II</strong> e lança o verbo principal em seu <strong>infinitivo puro para o Satzende</strong> (o fim absoluto da oração),
              encapsulando todos os objetos, advérbios e complementos no <em>Mittelfeld</em>.
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-indigo-950 text-white font-semibold">
                    <th className="py-2.5 px-3">Posição I (Vorfeld)</th>
                    <th className="py-2.5 px-3 bg-amber-500 text-slate-950 font-bold">Posição II (Modalverb)</th>
                    <th className="py-2.5 px-3">Mittelfeld (Complementos)</th>
                    <th className="py-2.5 px-3 bg-emerald-600 text-white font-bold">Satzende (Infinitiv)</th>
                    <th className="py-2.5 px-3">Tradução em Português</th>
                    <th className="py-2.5 px-3 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {SATZKLAMMER_EXAMPLES.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{row.vorfeld}</td>
                      <td className="py-2.5 px-3 font-bold text-amber-700 bg-amber-50/50 font-mono">{row.modal}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.mittelfeld}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700 bg-emerald-50/50 font-mono">{row.satzende}</td>
                      <td className="py-2.5 px-3 text-slate-600 italic text-xs">{row.traducao}</td>
                      <td className="py-2.5 px-3 text-center">
                        <AudioButton text={`${row.vorfeld} ${row.modal} ${row.mittelfeld} ${row.satzende}`} lang="de-DE" size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Usos Canônicos de können */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
              Usos e Funções Semânticas de <em>können</em>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KOENNEN_USES.map((u, i) => (
                <div key={i} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                      {u.uso}
                    </span>
                    <div className="font-semibold text-slate-900 text-sm mt-1.5">{u.exemplo}</div>
                    <div className="text-xs text-slate-600 italic">{u.traducao}</div>
                  </div>
                  <AudioButton text={u.exemplo} lang="de-DE" size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 A Negação — nicht vs. kein */}
      <div id="secao-1-3-negacao-nicht-kein" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              A Negação Rígida — <em>nicht</em> vs. <em>kein / keine / kein</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Em alemão, a partícula de negação não é única como em português ("não").
              <strong>kein</strong> substitui o artigo indefinido ou a ausência de artigo para substantivos.
              <strong>nicht</strong> nega verbos, adjetivos, advérbios e predicados oracionais.
            </p>
          </div>
          <AudioButton
            text="Ich singe nicht. Ich kann nicht singen. Ich kann nicht gut singen. Er kommt nicht heute. Ich habe keinen Drucker. Ich habe keine Lampe. Ich habe kein Telefon. Ich habe keine Bücher."
            lang="de-DE"
            label="Ouvir Exemplos de Negação"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* nicht */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30">
              <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>1. <em>nicht</em> — Verbos, Adjetivos & Advérbios</span>
                <span className="text-xs text-indigo-700 font-mono">Não substantivos</span>
              </div>
              <div className="p-4 space-y-3 text-xs sm:text-sm">
                {NICHT_VS_KEIN_VERB.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{item.tipo}</span>
                      <div className="font-semibold text-slate-900">{item.exemplo}</div>
                      <div className="text-xs text-slate-600 italic">{item.traducao}</div>
                    </div>
                    <AudioButton text={item.exemplo} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* kein */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30">
              <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>2. <em>kein / keine / kein</em> — Substantivos</span>
                <span className="text-xs text-amber-700 font-mono">Substitui ein / ø</span>
              </div>
              <div className="p-4 space-y-3 text-xs sm:text-sm">
                {KEIN_DECLENSION.map((item, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">{item.genero}</span>
                    <div className="flex items-center justify-between mt-1">
                      <div className="space-y-0.5">
                        <div className="text-slate-500 line-through text-xs">{item.afirmativa}</div>
                        <div className="font-bold text-rose-700">{item.negativa}</div>
                        <div className="text-xs text-slate-600 italic">{item.traducao}</div>
                      </div>
                      <AudioButton text={item.negativa} lang="de-DE" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.4 Adjetivo Predicativo vs. Atributivo */}
      <div id="secao-1-4-adjetivo-predicativo-atributivo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.4
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Adjetivo Predicativo vs. Adjetivo Atributivo
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Diferença estrutural crucial do alemão: se o adjetivo está à direita do verbo <em>sein</em>, ele é <strong>predicativo e invariável</strong>.
              Se antecede o substantivo, ele é <strong>atributivo e exige desinência de caso/gênero</strong>.
            </p>
          </div>
          <AudioButton
            text="Der Drucker ist neu. Das ist ein neuer Drucker. Die Lampe ist alt. Es ist eine alte Lampe. Das Problem ist klein. Ich habe ein kleines Problem."
            lang="de-DE"
            label="Ouvir Adjetivos em Contraste"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Predicativo */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center justify-between border-b border-slate-200 pb-2">
                <span>Adjetivo Predicativo (À direita de <em>sein</em>)</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Sem desinência</span>
              </div>
              <p className="text-xs text-slate-600">
                O adjetivo funciona como predicativo do sujeito. Sua forma é idêntica ao infinitivo lexical:
              </p>
              <div className="space-y-2">
                {PREDICATIVE_ADJECTIVES.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs sm:text-sm p-2 bg-white rounded border border-slate-200/80">
                    <div>
                      <div className="font-semibold text-slate-900">{p.frase}</div>
                      <div className="text-xs text-slate-500 italic">{p.traducao}</div>
                    </div>
                    <AudioButton text={p.frase} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Atributivo */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center justify-between border-b border-slate-200 pb-2">
                <span>Adjetivo Atributivo (Antes do substantivo)</span>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Com desinência</span>
              </div>
              <p className="text-xs text-slate-600">
                Após artigo indefinido no <strong>Nominativo</strong>, as desinências refletem a marca de gênero do artigo definido:
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-2.5 bg-white rounded border border-slate-200/80 space-y-1">
                  <div className="font-bold text-indigo-900 text-xs uppercase">Masculino: marca <em>-er</em> (como d<strong>er</strong>)</div>
                  <div className="font-mono font-semibold text-slate-800">ein neu<span className="text-rose-600 font-bold">er</span> Drucker</div>
                  <div className="text-xs text-slate-500">uma impressora nova</div>
                </div>
                <div className="p-2.5 bg-white rounded border border-slate-200/80 space-y-1">
                  <div className="font-bold text-indigo-900 text-xs uppercase">Feminino: marca <em>-e</em> (como di<strong>e</strong>)</div>
                  <div className="font-mono font-semibold text-slate-800">eine alt<span className="text-rose-600 font-bold">e</span> Lampe</div>
                  <div className="text-xs text-slate-500">uma luminária velha</div>
                </div>
                <div className="p-2.5 bg-white rounded border border-slate-200/80 space-y-1">
                  <div className="font-bold text-indigo-900 text-xs uppercase">Neutro: marca <em>-es</em> (como da<strong>s</strong>)</div>
                  <div className="font-mono font-semibold text-slate-800">ein klein<span className="text-rose-600 font-bold">es</span> Problem</div>
                  <div className="text-xs text-slate-500">um problema pequeno</div>
                </div>
                <div className="p-2.5 bg-white rounded border border-slate-200/80 space-y-1">
                  <div className="font-bold text-indigo-900 text-xs uppercase">Plural Negativo: marca <em>-en</em></div>
                  <div className="font-mono font-semibold text-slate-800">keine neu<span className="text-rose-600 font-bold">en</span> Bücher</div>
                  <div className="text-xs text-slate-500">nenhuns livros novos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.5 Antônimos dos Adjetivos */}
      <div id="secao-1-5-antonimos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Os 9 Pares de Antônimos Canônicos
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Vocabulário polar fundamental para descrições de objetos de escritório, aparelhos, conforto e preços.
            </p>
          </div>
          <AudioButton
            text="neu, alt. schön, hässlich. modern, unmodern. bequem, unbequem. klein, groß. teuer, billig. praktisch, unpraktisch. interessant, langweilig. hell, dunkel."
            lang="de-DE"
            label="Ouvir Pares de Antônimos"
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ADJECTIVE_ANTONYMS.map((pair, idx) => (
              <div key={idx} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-900">
                    <span className="text-indigo-700">{pair.adjetivo}</span>
                    <span className="text-slate-400 font-sans text-xs">↔</span>
                    <span className="text-rose-700">{pair.antonimo}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{pair.traducao}</div>
                </div>
                <AudioButton text={`${pair.adjetivo}, ${pair.antonimo}`} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.6 Verbos com Alternância Vocálica */}
      <div id="secao-1-6-alternancia-vocalica" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.6
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Verbos com Alternância Vocálica na Raiz — Revisão dos 10 Verbos Fortes
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              A alternância vocálica ocorre <strong>exclusivamente na 2ª pessoa do singular (du) e na 3ª pessoa do singular (er/sie/es)</strong>.
              O plural é sempre regular baseado no infinitivo.
            </p>
          </div>
          <AudioButton
            text="fahren: du fährst, er fährt. schlafen: du schläfst, er schläft. essen: du isst, er isst. lesen: du liest, er liest. sprechen: du sprichst, er spricht. sehen: du siehst, er sieht."
            lang="de-DE"
            label="Ouvir Verbos com Alternância"
          />
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">Infinitivo</th>
                  <th className="py-2.5 px-3">2ª Sg. (du)</th>
                  <th className="py-2.5 px-3">3ª Sg. (er / sie / es)</th>
                  <th className="py-2.5 px-3">Alternância</th>
                  <th className="py-2.5 px-3">Significado</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {VOWEL_CHANGE_VERBS.map((v, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{v.infinitivo}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-indigo-700">{v.du}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-rose-700">{v.er}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-xs font-semibold">
                        {v.mudanca}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 italic text-xs">{v.traducao}</td>
                    <td className="py-2.5 px-3 text-center">
                      <AudioButton text={`${v.infinitivo}, du ${v.du}, er ${v.er}`} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1.7 Preposições Locais */}
      <div id="secao-1-7-preposicoes-locais" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.7
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Preposições Locais Canônicas — <em>aus</em>, <em>in</em>, <em>bei</em> e <em>nach</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Todas regem o caso <strong>Dativo</strong>. A distinção semântica de direção vs. permanência estática e o emprego de <em>bei</em> para empresas e indivíduos são marcas de proficiência.
            </p>
          </div>
          <AudioButton
            text="Ich komme aus Italien. Ich wohne in Berlin. Ich arbeite bei Siemens. Ich fahre nach Italien."
            lang="de-DE"
            label="Ouvir Preposições"
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCAL_PREPOSITIONS.map((p, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-lg text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                    {p.prep}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    + {p.caso}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800">{p.uso}</div>
                <div className="text-xs font-mono font-medium text-slate-900 bg-white p-2 rounded border border-slate-200/80">
                  {p.exemplo}
                </div>
                <div className="text-xs text-slate-600 italic">{p.traducao}</div>
                <div className="pt-1 flex justify-end">
                  <AudioButton text={p.exemplo} lang="de-DE" size="sm" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-slate-700 space-y-1">
            <span className="font-bold text-amber-900">Nota de Contraste Idiomática:</span>
            <p>
              Em português usamos "trabalho <em>na</em> Siemens" ou "estou <em>na</em> casa de Maria".
              Em alemão, usa-se estritamente <strong>bei</strong> para entidades corporativas ou pessoas físicas (<em>bei Siemens</em>, <em>bei Maria</em>).
              Para cidades e países sem artigo usa-se <strong>in</strong> (lugar estático) e <strong>nach</strong> (direção de viagem: <em>nach München, nach Deutschland</em>).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
