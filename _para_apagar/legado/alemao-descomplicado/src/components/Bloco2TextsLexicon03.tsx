import React, { useState, useEffect } from 'react';
import {
  TEXT_B1_POPULATION,
  TEXT_B3_DACH,
  TEXT_B2_QUIZ,
  REGULAR_VERBS_C1,
  VOWEL_CHANGE_VERBS_C1,
  TEXT_C10_DRILL,
  EXERCISE_C11_ITEMS,
  EXERCISE_C12_ITEMS,
  EXERCISE_C13_ITEMS,
  EXERCISE_C14_ITEMS,
  REDEMITTEL_GROUPS,
  VERB_DICTIONARY_D2,
  EVALUATION_D3_ITEMS,
  LEXICON_LESSON_3,
  COLLOQUIAL_LESSON_3,
} from '../data/lesson03Data';
import { AudioButton } from './AudioButton';
import { speechEngine, SpeechState } from '../utils/speech';
import {
  Globe,
  HelpCircle,
  BookOpen,
  Search,
  MessageSquare,
  CheckSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2,
  Square,
  Headphones,
  Play,
  RotateCcw,
} from 'lucide-react';

export const Bloco2TextsLexicon03: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVerbTab, setActiveVerbTab] = useState<'regular' | 'vowelChange'>('regular');
  const [checkedEval, setCheckedEval] = useState<Record<number, 'gut' | 'nichtSoGut'>>({});
  const [revealedQuiz, setRevealedQuiz] = useState<Record<number, boolean>>({});
  const [speechState, setSpeechState] = useState<SpeechState>(speechEngine.getState());
  const [verbAudioMode, setVerbAudioMode] = useState<'pronounAndVerb' | 'verbOnly'>('pronounAndVerb');

  useEffect(() => {
    const unsubscribe = speechEngine.subscribe(setSpeechState);
    return unsubscribe;
  }, []);

  const toggleQuizAnswer = (num: number) => {
    setRevealedQuiz((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const handleEvalCheck = (idx: number, rating: 'gut' | 'nichtSoGut') => {
    setCheckedEval((prev) => ({ ...prev, [idx]: rating }));
  };

  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\be→ie\b/gi, '')
      .replace(/\be→i\b/gi, '')
      .replace(/[-+]/g, ' ')
      .trim();
  };

  const getSpokenSubjectForVerb = (pessoa: string) => {
    if (pessoa.includes('er/sie/es/man') || pessoa.includes('er/sie/es')) return 'er';
    return pessoa;
  };

  const handlePlayWord = (spokenText: string) => {
    if (speechState.isPlaying && speechState.currentText === spokenText) {
      speechEngine.stop();
    } else {
      speechEngine.speak(spokenText, 'de-DE');
    }
  };

  const handlePlayFullRow = (row: (typeof REGULAR_VERBS_C1)[0]) => {
    const subject = getSpokenSubjectForVerb(row.pessoa);
    const text = `${subject} ${row.singen}. ${subject} ${row.kommen}. ${subject} ${row.lernen}. ${subject} ${row.spielen}. ${subject} ${row.arbeiten}. ${subject} ${row.heissen}.`;
    handlePlayWord(text);
  };

  const handlePlayFullVowelRow = (row: (typeof VOWEL_CHANGE_VERBS_C1)[0]) => {
    const subject = getSpokenSubjectForVerb(row.pessoa);
    const lesenForm = cleanTextForSpeech(row.lesen);
    const sprechenForm = cleanTextForSpeech(row.sprechen);
    const text = `${subject} ${row.sein}. ${subject} ${lesenForm}. ${subject} ${sprechenForm}.`;
    handlePlayWord(text);
  };

  const handlePlayFullColumn = (verbName: string, items: { pessoa: string; form: string }[]) => {
    const sentences = items.map((i) => `${getSpokenSubjectForVerb(i.pessoa)} ${cleanTextForSpeech(i.form)}`).join('. ');
    const text = `${verbName}: ${sentences}.`;
    handlePlayWord(text);
  };

  const renderVerbCell = (
    verbForm: string,
    pessoa: string,
    isSpecial: boolean = false,
    displayForm?: string
  ) => {
    const cleanForm = cleanTextForSpeech(verbForm);
    const spokenText =
      verbAudioMode === 'pronounAndVerb'
        ? `${getSpokenSubjectForVerb(pessoa)} ${cleanForm}`
        : cleanForm;
    const isPlaying = speechState.isPlaying && speechState.currentText === spokenText;

    return (
      <td className="py-1.5 px-2 text-center">
        <button
          type="button"
          onClick={() => handlePlayWord(spokenText)}
          title={`Ouvir pronúncia: "${spokenText}"`}
          className={`w-full py-2 px-2.5 rounded-lg flex items-center justify-between gap-1.5 transition-all duration-150 cursor-pointer border ${
            isPlaying
              ? 'bg-amber-100 text-amber-950 font-bold border-amber-400 ring-2 ring-amber-300 shadow-xs'
              : isSpecial
              ? 'bg-indigo-50/50 text-indigo-800 font-bold border-indigo-200 hover:bg-indigo-100/70 hover:border-indigo-300'
              : 'bg-white text-slate-800 font-medium border-slate-200/80 hover:bg-amber-50/60 hover:border-amber-200 hover:text-slate-900'
          }`}
        >
          <span className="font-mono text-xs sm:text-sm font-semibold">{displayForm || verbForm}</span>
          <span
            className={`p-0.5 rounded transition-colors ${
              isPlaying ? 'text-amber-800 animate-pulse' : 'text-slate-400 group-hover:text-slate-700'
            }`}
          >
            {isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Volume2 className="w-3 h-3" />}
          </span>
        </button>
      </td>
    );
  };

  const renderPronounCell = (pessoa: string, onPlayRow: () => void) => {
    const spokenPronoun =
      pessoa === 'er/sie/es/man' ? 'er, sie, es, man' : pessoa === 'er/sie/es' ? 'er, sie, es' : pessoa;
    const isPronounPlaying = speechState.isPlaying && speechState.currentText === spokenPronoun;

    return (
      <td className="py-1.5 px-2 bg-slate-50/80">
        <div className="flex items-center justify-between gap-1">
          <button
            type="button"
            onClick={() => handlePlayWord(spokenPronoun)}
            title={`Ouvir pronome: "${spokenPronoun}"`}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all cursor-pointer border text-left flex-1 ${
              isPronounPlaying
                ? 'bg-amber-100 border-amber-300 text-amber-950 font-bold ring-1 ring-amber-300'
                : 'bg-white border-slate-200 text-slate-900 font-semibold hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <Volume2 className={`w-3 h-3 ${isPronounPlaying ? 'text-amber-700' : 'text-indigo-600'}`} />
            <span className="font-sans text-xs sm:text-sm">{pessoa}</span>
          </button>
          <button
            type="button"
            onClick={onPlayRow}
            title={`Ouvir toda a linha de conjugação para "${pessoa}"`}
            className="px-1.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded transition-colors cursor-pointer whitespace-nowrap"
          >
            Linha
          </button>
        </div>
      </td>
    );
  };

  const filteredLexicon = LEXICON_LESSON_3.filter(
    (item) =>
      item.palavraAlema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.traducaoExata || item.traducao || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="bloco-2-textos-lexico-rodada3" className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 2 (60 Minutos) · Rodada 03
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 003 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transcrição Integral, Tradução & Mineração Lexical
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Dados demográficos globais (<em>Wo wohnen die meisten Menschen?</em>), radiografia dos países de língua alemã (D-A-CH),
          o quiz <em>Wie-Viele</em>, matriz dos verbos no presente, dicionário verbal de 16 lemas e tabela lexical com busca interativa.
        </p>
      </div>

      {/* 2.1 Texto B1 — Wo wohnen die meisten Menschen? */}
      <div id="secao-2-1-b1-populacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.1 · Texto B1 (p. 21)
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              Wo wohnen die meisten Menschen? (Onde vivem a maioria das pessoas?)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Grandes cifras demográficas globais e projeções populacionais para 2050.
            </p>
          </div>
          <AudioButton
            text={TEXT_B1_POPULATION.introDe}
            lang="de-DE"
            size="sm"
            label="Ouvir Texto Demográfico"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Caixa de Texto B1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase text-slate-400 mb-1">Alemão Original</div>
              <p className="text-sm text-slate-900 leading-relaxed font-medium">{TEXT_B1_POPULATION.introDe}</p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-slate-400 mb-1">Tradução Analítica</div>
              <p className="text-sm text-slate-700 leading-relaxed">{TEXT_B1_POPULATION.introPt}</p>
            </div>
          </div>

          {/* Escala Numérica */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Escala Numérica do Texto</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
              {TEXT_B1_POPULATION.scale.map((s) => (
                <div key={s.num} className="p-2.5 rounded-lg border border-slate-200 bg-white shadow-2xs">
                  <div className="font-mono text-xs font-bold text-indigo-700">{s.num}</div>
                  <div className="text-xs font-semibold text-slate-800">{s.de}</div>
                  <div className="text-[10px] text-slate-400">{s.pt}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Hoje x Amanhã */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hoje */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center justify-between">
                <span>Heute (Hoje) — Einwohner in Millionen</span>
                <span className="text-xs text-slate-500">16 Países</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 text-xs">
                {TEXT_B1_POPULATION.heute.map((c) => (
                  <div key={c.pais} className="p-2 rounded bg-white border border-slate-200/70 flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      <span className="text-slate-400 font-mono mr-1.5">{c.rank}.</span>
                      {c.pais}
                    </span>
                    <span className="font-mono font-bold text-indigo-700">{c.pop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amanhã (2050) */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center justify-between">
                <span>Morgen (2050, Schätzung)</span>
                <span className="text-xs text-amber-700 font-semibold">Projeção</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {TEXT_B1_POPULATION.morgen.map((c) => (
                  <div key={c.pais} className="p-2 rounded bg-white border border-slate-200/70 flex items-center justify-between">
                    <span className="font-medium text-slate-800">
                      <span className="text-slate-400 font-mono mr-1.5">{c.rank}.</span>
                      {c.pais}
                    </span>
                    <span className="font-mono font-bold text-amber-800">{c.pop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.2 Texto B3 — Deutschland, Österreich und die Schweiz */}
      <div id="secao-2-2-b3-dach" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.2 · Texto B3 (p. 24)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Informationen über Deutschland, Österreich und die Schweiz (D-A-CH)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Habitantes, estados federados, capitais, línguas oficiais e marcos históricos.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TEXT_B3_DACH.map((item) => (
              <div key={item.pais} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-slate-900">{item.pais}</h4>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-200 font-mono text-slate-700">
                      {item.artigo}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-slate-700">
                    <div><strong>Habitantes:</strong> {item.habitantes}</div>
                    <div><strong>Divisão:</strong> {item.divisao}</div>
                    <div><strong>Capital:</strong> {item.capital}</div>
                    <div><strong>Línguas:</strong> {item.linguas}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
                    {item.deText}
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    {item.ptText}
                  </div>
                  <div className="pt-1 flex justify-end">
                    <AudioButton text={item.deText} lang="de-DE" size="sm" label={`Ouvir ${item.pais}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.3 Texto B2 — Das WIE-VIELE-Quiz */}
      <div id="secao-2-3-b2-quiz" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.3 · Texto B2 (p. 22–23)
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              Das WIE-VIELE-Quiz (O Quiz do QUANTOS)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              6 questões para testar conhecimentos geopolíticos com respostas analíticas completas.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEXT_B2_QUIZ.map((q) => {
              const isRevealed = revealedQuiz[q.num];
              return (
                <div key={q.num} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        Questão {q.num}
                      </span>
                      <div className="font-semibold text-sm text-slate-900 mt-1.5">{q.perguntaDe}</div>
                      <div className="text-xs text-slate-500">{q.perguntaPt}</div>
                    </div>
                    <AudioButton text={q.perguntaDe} lang="de-DE" size="sm" />
                  </div>

                  {/* Opções */}
                  <div className="space-y-1 text-xs">
                    {q.opcoes.map((op, idx) => (
                      <div key={idx} className="p-1.5 rounded bg-white border border-slate-200/70 text-slate-700">
                        {op}
                      </div>
                    ))}
                  </div>

                  {/* Revelar Gabarito */}
                  <div className="pt-2 border-t border-slate-200/70">
                    <button
                      onClick={() => toggleQuizAnswer(q.num)}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                    >
                      {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {isRevealed ? 'Ocultar Resolução' : 'Ver Resposta Correta'}
                    </button>

                    {isRevealed && (
                      <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                        <div className="font-bold text-emerald-900">Resposta Correta: {q.respostaCorreta}</div>
                        <div className="text-emerald-950 font-mono">{q.fraseDe}</div>
                        <div className="text-emerald-800 text-[11px]">{q.frasePt}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2.4 Texto C1 — Personalpronomen und Verben im Präsens */}
      <div id="secao-2-4-c1-verbos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.4 · Texto C1 (p. 25)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Personalpronomen und Verben im Präsens (Pronomes & Verbos no Presente)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Matriz completa de conjugação regular e verbos com alternância vocálica (<em>e → ie / i</em>).
            </p>
          </div>
          <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white text-xs">
            <button
              onClick={() => setActiveVerbTab('regular')}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                activeVerbTab === 'regular' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
              }`}
            >
              Verbos Regulares & em -t/-d
            </button>
            <button
              onClick={() => setActiveVerbTab('vowelChange')}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                activeVerbTab === 'vowelChange' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
              }`}
            >
              Alternância Vocálica (e→ie / e→i)
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Audio Toolbar */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-indigo-600" />
                Modo de reprodução ao clicar no verbo:
              </span>
              <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white">
                <button
                  type="button"
                  onClick={() => setVerbAudioMode('pronounAndVerb')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    verbAudioMode === 'pronounAndVerb'
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pronome + Verbo (ex: ich singe)
                </button>
                <button
                  type="button"
                  onClick={() => setVerbAudioMode('verbOnly')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    verbAudioMode === 'verbOnly'
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Apenas Verbo (ex: singe)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {speechState.isPlaying && (
                <button
                  type="button"
                  onClick={() => speechEngine.stop()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-100 text-rose-800 hover:bg-rose-200 text-xs font-bold border border-rose-200 cursor-pointer transition-colors"
                >
                  <Square className="w-3 h-3 fill-current" />
                  Parar Áudio
                </button>
              )}
              {activeVerbTab === 'regular' ? (
                <button
                  type="button"
                  onClick={() => handlePlayWord('singen, kommen, lernen, spielen, arbeiten, heißen.')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 text-xs font-medium cursor-pointer transition-colors shadow-2xs"
                >
                  <Play className="w-3 h-3 text-indigo-600" />
                  Ouvir Todos os Infinitivos
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePlayWord('sein, lesen, sprechen.')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 text-xs font-medium cursor-pointer transition-colors shadow-2xs"
                >
                  <Play className="w-3 h-3 text-indigo-600" />
                  Ouvir Todos os Infinitivos
                </button>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5 px-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Dica fonética:</strong> Clique em qualquer pronome, verbo no cabeçalho ou forma conjugada para escutar a pronúncia nativa instantânea. Use o botão <strong>&ldquo;Linha&rdquo;</strong> ou <strong>&ldquo;Coluna&rdquo;</strong> para ouvir sequências inteiras.
            </span>
          </div>

          {activeVerbTab === 'regular' && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[760px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
                    {/* Header Pronome */}
                    <th className="py-3 px-3 w-36">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Pronome</span>
                        <button
                          type="button"
                          onClick={() => handlePlayWord('ich. du. er. sie. es. man. wir. ihr. sie. Sie.')}
                          title="Ouvir todos os pronomes"
                          className="text-[10px] text-slate-600 hover:text-indigo-700 flex items-center gap-1 bg-white border border-slate-200 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          Todos
                        </button>
                      </div>
                    </th>

                    {/* Header singen */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('singen')}
                          title="Ouvir infinitivo: singen"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-slate-800 hover:text-indigo-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          <span>singen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'singen',
                              REGULAR_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: x.singen }))
                            )
                          }
                          title="Ouvir toda a coluna de singen"
                          className="text-[10px] text-slate-500 hover:text-indigo-700 bg-white border border-slate-200 hover:border-slate-300 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>

                    {/* Header kommen */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('kommen')}
                          title="Ouvir infinitivo: kommen"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-slate-800 hover:text-indigo-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          <span>kommen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'kommen',
                              REGULAR_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: x.kommen }))
                            )
                          }
                          title="Ouvir toda a coluna de kommen"
                          className="text-[10px] text-slate-500 hover:text-indigo-700 bg-white border border-slate-200 hover:border-slate-300 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>

                    {/* Header lernen */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('lernen')}
                          title="Ouvir infinitivo: lernen"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-slate-800 hover:text-indigo-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          <span>lernen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'lernen',
                              REGULAR_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: x.lernen }))
                            )
                          }
                          title="Ouvir toda a coluna de lernen"
                          className="text-[10px] text-slate-500 hover:text-indigo-700 bg-white border border-slate-200 hover:border-slate-300 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>

                    {/* Header spielen */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('spielen')}
                          title="Ouvir infinitivo: spielen"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-slate-800 hover:text-indigo-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          <span>spielen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'spielen',
                              REGULAR_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: x.spielen }))
                            )
                          }
                          title="Ouvir toda a coluna de spielen"
                          className="text-[10px] text-slate-500 hover:text-indigo-700 bg-white border border-slate-200 hover:border-slate-300 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>

                    {/* Header arbeiten (-t) */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('arbeiten')}
                          title="Ouvir infinitivo: arbeiten"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          <span>arbeiten (-t)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'arbeiten',
                              REGULAR_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: x.arbeiten }))
                            )
                          }
                          title="Ouvir toda a coluna de arbeiten"
                          className="text-[10px] text-indigo-600 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>

                    {/* Header heißen (-ß) */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('heißen')}
                          title="Ouvir infinitivo: heißen"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-slate-800 hover:text-indigo-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          <span>heißen (-ß)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'heißen',
                              REGULAR_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: x.heissen }))
                            )
                          }
                          title="Ouvir toda a coluna de heißen"
                          className="text-[10px] text-slate-500 hover:text-indigo-700 bg-white border border-slate-200 hover:border-slate-300 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 font-mono">
                  {REGULAR_VERBS_C1.map((r) => {
                    return (
                      <tr key={r.pessoa} className="hover:bg-slate-50/70 transition-colors">
                        {/* Pronome Cell */}
                        {renderPronounCell(r.pessoa, () => handlePlayFullRow(r))}

                        {/* singen Cell */}
                        {renderVerbCell(r.singen, r.pessoa)}

                        {/* kommen Cell */}
                        {renderVerbCell(r.kommen, r.pessoa)}

                        {/* lernen Cell */}
                        {renderVerbCell(r.lernen, r.pessoa)}

                        {/* spielen Cell */}
                        {renderVerbCell(r.spielen, r.pessoa)}

                        {/* arbeiten (-t) Cell */}
                        {renderVerbCell(r.arbeiten, r.pessoa, true)}

                        {/* heissen (-ß) Cell */}
                        {renderVerbCell(r.heissen, r.pessoa)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeVerbTab === 'vowelChange' && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-3 px-3 w-36">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Pronome</span>
                        <button
                          type="button"
                          onClick={() => handlePlayWord('ich. du. er. sie. es. wir. ihr. sie. Sie.')}
                          title="Ouvir todos os pronomes"
                          className="text-[10px] text-slate-600 hover:text-indigo-700 flex items-center gap-1 bg-white border border-slate-200 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          Todos
                        </button>
                      </div>
                    </th>

                    {/* Header sein */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('sein')}
                          title="Ouvir infinitivo: sein"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-indigo-600" />
                          <span>sein (irregular)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'sein',
                              VOWEL_CHANGE_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: x.sein }))
                            )
                          }
                          title="Ouvir toda a coluna de sein"
                          className="text-[10px] text-indigo-600 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>

                    {/* Header lesen */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('lesen')}
                          title="Ouvir infinitivo: lesen"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-amber-900 hover:bg-amber-50 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-amber-600" />
                          <span>lesen (e → ie)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'lesen',
                              VOWEL_CHANGE_VERBS_C1.map((x) => ({ pessoa: x.pessoa, form: cleanTextForSpeech(x.lesen) }))
                            )
                          }
                          title="Ouvir toda a coluna de lesen"
                          className="text-[10px] text-amber-700 hover:text-amber-950 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>

                    {/* Header sprechen */}
                    <th className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handlePlayWord('sprechen')}
                          title="Ouvir infinitivo: sprechen"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3 text-emerald-600" />
                          <span>sprechen (e → i)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayFullColumn(
                              'sprechen',
                              VOWEL_CHANGE_VERBS_C1.map((x) => ({
                                pessoa: x.pessoa,
                                form: cleanTextForSpeech(x.sprechen),
                              }))
                            )
                          }
                          title="Ouvir toda a coluna de sprechen"
                          className="text-[10px] text-emerald-700 hover:text-emerald-950 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                        >
                          Coluna
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 font-mono">
                  {VOWEL_CHANGE_VERBS_C1.map((v) => (
                    <tr key={v.pessoa} className="hover:bg-slate-50/70 transition-colors">
                      {/* Pronome Cell */}
                      {renderPronounCell(v.pessoa, () => handlePlayFullVowelRow(v))}

                      {/* sein Cell */}
                      {renderVerbCell(v.sein, v.pessoa, true)}

                      {/* lesen Cell */}
                      {renderVerbCell(cleanTextForSpeech(v.lesen), v.pessoa, false, v.lesen)}

                      {/* sprechen Cell */}
                      {renderVerbCell(cleanTextForSpeech(v.sprechen), v.pessoa, false, v.sprechen)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 2.5 Texto C10 — Possessivartikel (du, ich, Sie, er) */}
      <div id="secao-2-5-c10-possessivos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.5 · Texto C10 (p. 30)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Treino Estruturado dos Possessivartikel (C10)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Concordância de gênero para os sujeitos <em>du</em>, <em>ich</em>, <em>Sie</em> e <em>er</em> com membros da família.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEXT_C10_DRILL.map((block) => (
              <div key={block.sujeito} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 uppercase">
                  Sujeito: {block.sujeito}
                </span>
                <div className="space-y-1.5 pt-2">
                  {block.perguntas.map((p, idx) => (
                    <div key={idx} className="p-1.5 bg-white rounded border border-slate-200 text-xs flex items-center justify-between">
                      <span className="font-medium text-slate-800">{p.pergunta}</span>
                      <AudioButton text={p.pergunta} lang="de-DE" size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.6 Texto C11 — Possessivartikel (14 itens de preenchimento) */}
      <div id="secao-2-6-c11-itens" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.6 · Texto C11 (p. 30)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício C11 — Aplicação dos Possessivos com Justificativa
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              14 orações contextualizadas resolvendo gênero, número e pessoa do possuidor.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-2.5 px-3">Nº</th>
                  <th className="py-2.5 px-3">Pessoa Base</th>
                  <th className="py-2.5 px-3">Frase Completa</th>
                  <th className="py-2.5 px-3">Possessivo</th>
                  <th className="py-2.5 px-3">Justificativa Gramatical</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {EXERCISE_C11_ITEMS.map((item) => (
                  <tr key={item.num} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3 font-mono text-slate-400">{item.num}</td>
                    <td className="py-2 px-3 font-semibold text-slate-800">{item.pessoa}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">{item.texto}</td>
                    <td className="py-2 px-3 font-mono font-bold text-indigo-700">{item.possessivo}</td>
                    <td className="py-2 px-3 text-xs text-slate-600">{item.justificativa}</td>
                    <td className="py-2 px-3 text-center">
                      <AudioButton text={item.texto} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.7, 2.8, 2.9 Exercícios de Números (C12, C13, C14) */}
      <div id="secao-2-7-numeros-treinos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 2.7, 2.8 & 2.9 · Exercícios C12, C13 e C14 (p. 31)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Treino Numérico Rigoroso: C12, C13 e C14
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Conversão de palavras para algarismos, algarismos para palavras e preenchimento de sequências lógicas.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* C12 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">C12 · Palavras → Números</h4>
              <div className="space-y-1.5 text-xs">
                {EXERCISE_C12_ITEMS.map((item) => (
                  <div key={item.num} className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{item.alemao}</span>
                    <span className="font-mono font-bold text-indigo-700">{item.numero}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* C13 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">C13 · Números → Palavras</h4>
              <div className="space-y-1.5 text-xs max-h-80 overflow-y-auto pr-1">
                {EXERCISE_C13_ITEMS.map((item) => (
                  <div key={item.num} className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-700">{item.numero}</span>
                    <span className="font-medium text-indigo-800">{item.alemao}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* C14 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">C14 · Sequências Numéricas</h4>
              <div className="space-y-1.5 text-xs max-h-80 overflow-y-auto pr-1">
                {EXERCISE_C14_ITEMS.map((item) => (
                  <div key={item.num} className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">{item.n1}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-bold text-emerald-700">{item.n2}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-600">{item.n3}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.10 Texto D1 — Wichtige Redemittel */}
      <div id="secao-2-10-d1-redemittel" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.10 · Texto D1 (p. 32)
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Wichtige Redemittel (Expressões e Fórmulas de Comunicação)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Repertório ativo para interações cotidianas sobre identidade, profissão, estudos, línguas e hobbies.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REDEMITTEL_GROUPS.map((group) => (
              <div key={group.titulo} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200/80 pb-2">
                  {group.titulo}
                </h4>
                <div className="space-y-3">
                  {group.itens.map((it, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200/70 space-y-1">
                      <div className="font-medium text-xs sm:text-sm text-slate-900">{it.de}</div>
                      <div className="text-xs text-slate-500">{it.pt}</div>
                      <div className="pt-1 flex justify-end">
                        <AudioButton text={it.de} lang="de-DE" size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.11 Texto D2 — Kleines Wörterbuch der Verben */}
      <div id="secao-2-11-d2-dicionario-verbos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.11 · Texto D2 (p. 33)
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Kleines Wörterbuch der Verben (Pequeno Dicionário de Verbos)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              16 verbos fundamentais com todas as pessoas conjugadas e frases modelo extraídas do capítulo.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VERB_DICTIONARY_D2.map((v) => (
              <div key={v.verbo} className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-indigo-950 font-mono">{v.verbo}</h4>
                  <AudioButton text={v.exemplo} lang="de-DE" size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2 rounded-lg border border-slate-200/70">
                  <div>
                    <div>{v.sg1}</div>
                    <div>{v.sg2}</div>
                    <div>{v.sg3}</div>
                  </div>
                  <div>
                    <div>{v.pl1}</div>
                    <div>{v.pl2}</div>
                    <div>{v.pl3}</div>
                  </div>
                </div>
                <div className="text-xs pt-1 border-t border-slate-200/60">
                  <div className="font-medium text-slate-900">{v.exemplo}</div>
                  <div className="text-[11px] text-slate-500">{v.pt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.12 Texto D3 — Evaluation (Autoavaliação) */}
      <div id="secao-2-12-d3-avaliacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.12 · Texto D3 (p. 34)
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-600" />
              Evaluation: Überprüfen Sie sich selbst (Autoavaliação)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Matriz de autoavaliação interativa para verificar competências de fala e escuta desenvolvidas no Capítulo 1.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Competência Canônica (Ich kann...)</th>
                  <th className="py-3 px-4">Tradução</th>
                  <th className="py-3 px-4 text-center">gut (bem)</th>
                  <th className="py-3 px-4 text-center">nicht so gut (não tão bem)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {EVALUATION_D3_ITEMS.map((it, idx) => {
                  const rating = checkedEval[idx];
                  return (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-4 font-medium text-slate-900">{it.item}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">{it.pt}</td>
                      <td className="py-2.5 px-4 text-center">
                        <button
                          onClick={() => handleEvalCheck(idx, 'gut')}
                          className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                            rating === 'gut' ? 'bg-emerald-600 border-emerald-600 text-white font-bold' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {rating === 'gut' && '✓'}
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button
                          onClick={() => handleEvalCheck(idx, 'nichtSoGut')}
                          className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                            rating === 'nichtSoGut' ? 'bg-amber-600 border-amber-600 text-white font-bold' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {rating === 'nichtSoGut' && '✓'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2.13 Tabela Lexical Primária (21 termos) */}
      <div id="secao-2-13-lexico" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.13
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Tabela Lexical Primária do Dia 003 ({LEXICON_LESSON_3.length} termos)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Substantivos com artigo definido, classe gramatical, forma de plural e frase contextualizada com áudio nativo.
            </p>
          </div>

          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar termo ou tradução..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-2.5 px-3">Palavra Alemã</th>
                  <th className="py-2.5 px-3">Classe & Plural</th>
                  <th className="py-2.5 px-3">Tradução Exata</th>
                  <th className="py-2.5 px-3">Frase Modelo</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLexicon.map((term) => (
                  <tr key={term.palavraAlema} className="hover:bg-slate-50/70">
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

      {/* 2.14 Registro Coloquial (Umgangssprache) */}
      <div id="secao-2-14-coloquial" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 2.14
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Registro Coloquial e Autêntico (<em>Umgangssprache</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              10 expressões orais reais para destravar a fala espontânea em ambientes sociais.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COLLOQUIAL_LESSON_3.map((c, idx) => {
              const expr = c.expressaoAlema || c.expressao || '';
              const trad = c.traducaoExata || c.traducao || '';
              return (
                <div key={expr || idx} className="p-3 border border-slate-200 rounded-xl bg-slate-50/50 space-y-1">
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
