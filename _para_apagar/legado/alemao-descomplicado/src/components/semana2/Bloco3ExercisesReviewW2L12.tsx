import React, { useState } from 'react';
import {
  REVERSE_CHALLENGES_12,
  KEY_POINTS_17,
} from '../../data/semana2Lesson12Data';
import { AudioButton } from '../AudioButton';
import {
  GraduationCap,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  ListOrdered,
} from 'lucide-react';

interface BookExercise {
  id: string;
  number: string;
  page: string;
  title: string;
  description: string;
  items: { prompt: string; answer: string; explanation?: string }[];
}

const BOOK_EXERCISES_L12: BookExercise[] = [
  {
    id: 'ex-a23',
    number: 'A23',
    page: 'p. 121',
    title: 'Probleme, Probleme — Ergänzen Sie das richtige Verb',
    description: 'Completar com o verbo correspondente no Perfekt (gespeichert, weitergeleitet, angeschlossen, eingeschaltet, gelöscht, gesendet).',
    items: [
      { prompt: '0. Der Text ist weg.', answer: 'Du hast ihn nicht gespeichert.', explanation: 'speichern → Partizip II: gespeichert.' },
      { prompt: '1. Die E-Mail ist nicht angekommen.', answer: 'Martin hat sie nicht gesendet.', explanation: 'senden → Partizip II: gesendet.' },
      { prompt: '2. Der Computer geht nicht.', answer: 'Vera hat ihn nicht eingeschaltet.', explanation: 'einschalten (separável) → eingeschaltet.' },
      { prompt: '3. Ich kann den Text nicht drucken.', answer: 'Du hast den Drucker nicht angeschlossen.', explanation: 'anschließen (separável) → angeschlossen.' },
      { prompt: '4. Die Daten sind immer noch da.', answer: 'Frau Klein hat sie nicht gelöscht.', explanation: 'löschen → Partizip II: gelöscht.' },
      { prompt: '5. Paul hat die Information nicht bekommen.', answer: 'Ihr habt sie nicht weitergeleitet.', explanation: 'weiterleiten (separável) → weitergeleitet.' },
    ],
  },
  {
    id: 'ex-a24',
    number: 'A24',
    page: 'p. 121',
    title: 'Die Drucker sind kaputt! — Hörverstehen',
    description: 'Compreensão auditiva da ligação de compra e reparo de impressoras.',
    items: [
      { prompt: '1. Wie viele Drucker sind gekauft und kaputt?', answer: 'c) Herr Kühne hat fünf Drucker gekauft. Drei Drucker sind kaputt.', explanation: 'Confirmado no áudio: fünf gekauft, drei kaputt.' },
      { prompt: '2. Was möchte Herr Kühne?', answer: 'a) Herr Kühne möchte eine schnelle Reparatur.', explanation: 'Ele enfatiza urgência: "Wir brauchen die Drucker dringend."' },
      { prompt: '3. Wann ist der Reparaturtermin?', answer: 'c) Der Reparaturtermin ist am Donnerstag (um 17.30 Uhr).', explanation: 'Acordo firmado para quinta-feira no final do expediente.' },
    ],
  },
  {
    id: 'ex-a27',
    number: 'A27',
    page: 'p. 124',
    title: 'Datumsangaben — Schreib- und Sprechweise',
    description: 'Transformação de datas numéricas em forma oral por extenso com números ordinais.',
    items: [
      { prompt: '18.8.2008', answer: 'Heute ist der achtzehnte Achte zweitausendacht.', explanation: 'der achtzehnte (dia) + der Achte (mês de agosto).' },
      { prompt: '24.12.2012', answer: 'Heute ist der vierundzwanzigste Zwölfte zweitausendzwölf.', explanation: 'Véspera de Natal.' },
      { prompt: 'am 21.9. um 14.30 Uhr', answer: 'Am einundzwanzigsten Neunten um vierzehn Uhr dreißig.', explanation: 'Regência com „am“ exige terminação dativa em -en: einundzwanzigsten.' },
      { prompt: 'am 22. Mai um 18.00 Uhr', answer: 'Am zweiundzwanzigsten Fünften (Mai) um achtzehn Uhr.', explanation: 'am zweiundzwanzigsten.' },
      { prompt: 'am 7. März um 15.15 Uhr', answer: 'Am siebten Dritten um fünfzehn Uhr fünfzehn.', explanation: 'siebte é irregular (não *siebente).' },
    ],
  },
  {
    id: 'ex-c1',
    number: 'C1',
    page: 'p. 130',
    title: 'Finden Sie das Gegenteil (Verben mit Präfix)',
    description: 'Formulação de antônimos perfeitos com verbos separáveis.',
    items: [
      { prompt: 'Maria macht die Tür auf. → Heinz ...', answer: 'Heinz macht die Tür zu.', explanation: 'aufmachen (abrir) ↔ zumachen (fechar).' },
      { prompt: 'Maria macht das Licht an. → Heinz ...', answer: 'Heinz macht das Licht aus.', explanation: 'anmachen (acender) ↔ ausmachen (apagar).' },
      { prompt: 'Maria schaltet den Fernseher ein. → Heinz ...', answer: 'Heinz schaltet den Fernseher aus.', explanation: 'einschalten (ligar aparelho) ↔ ausschalten (desligar).' },
      { prompt: 'Maria schläft um 5.00 Uhr morgens ein. → Heinz ...', answer: 'Heinz wacht um 5.00 Uhr morgens auf.', explanation: 'einschlafen (adormecer) ↔ aufwachen (acordar).' },
      { prompt: 'Die Arbeit von Maria fängt um 15.00 Uhr an. → Heinz ...', answer: 'Die Arbeit von Heinz hört um 15.00 Uhr auf.', explanation: 'anfangen (começar) ↔ aufhören (terminar/cessar).' },
      { prompt: 'Maria kommt spät zu Hause an. → Heinz ...', answer: 'Heinz fährt früh von zu Hause ab.', explanation: 'ankommen (chegar) ↔ abfahren (partir).' },
    ],
  },
  {
    id: 'ex-c4',
    number: 'C4',
    page: 'p. 131',
    title: 'Ergänzen Sie die Verben: sollen, müssen, mögen, können, möchten',
    description: 'Emprego correto dos verbos modais conforme a nuance semântica e a pessoa verbal.',
    items: [
      { prompt: '0. Ich ... das Dokument noch ausdrucken.', answer: 'Ich muss das Dokument noch ausdrucken.', explanation: 'müssen: urgência ou necessidade própria.' },
      { prompt: '1. Vor der Prüfung ... er noch viel lernen.', answer: 'Vor der Prüfung muss er noch viel lernen.', explanation: 'müssen: necessidade de aprovação.' },
      { prompt: '2. In dem Restaurant ... ich nicht essen.', answer: 'In dem Restaurant mag ich nicht essen.', explanation: 'mögen: falta de apreço ou gosto.' },
      { prompt: '3. Ich ... keine Kartoffeln.', answer: 'Ich mag keine Kartoffeln.', explanation: 'mögen com acusativo de alimento.' },
      { prompt: '4. ... ich dich vom Flughafen abholen?', answer: 'Soll ich dich vom Flughafen abholen?', explanation: 'sollen: oferta de prestabilidade dirigida ao interlocutor.' },
      { prompt: '5. Jetzt ... ich gerne ein kaltes Bier trinken!', answer: 'Jetzt möchte ich gerne ein kaltes Bier trinken!', explanation: 'möchte(n): desejo cortês.' },
      { prompt: '6. Du ... nicht fernsehen. Der Fernseher ist kaputt.', answer: 'Du kannst nicht fernsehen.', explanation: 'können: incapacidade física/técnica.' },
    ],
  },
  {
    id: 'ex-c5',
    number: 'C5',
    page: 'p. 132',
    title: 'Ergänzen Sie haben oder sein und antworten Sie',
    description: 'Discriminação do auxiliar no Perfekt (movimento/mudança de estado vs. transitividade/duração).',
    items: [
      { prompt: '0. Wann ... Sie gelandet?', answer: 'Wann sind Sie gelandet? → Ich bin um 15.00 Uhr gelandet.', explanation: 'landen (deslocamento espacial/aterrissagem) → sein.' },
      { prompt: '1. Was ... Sie zum Abendbrot gegessen?', answer: 'Was haben Sie zum Abendbrot gegessen? → Ich habe Brot gegessen.', explanation: 'essen (transitivo com acusativo) → haben.' },
      { prompt: '2. Wie lange ... Sie in Italien geblieben?', answer: 'Wie lange sind Sie in Italien geblieben? → Ich bin zwei Wochen geblieben.', explanation: 'bleiben (exceção canônica que indica permanência) → sein.' },
      { prompt: '3. ... Frau Müller schon angerufen?', answer: 'Hat Frau Müller schon angerufen? → Ja, sie hat schon angerufen.', explanation: 'anrufen (telefonar) → haben.' },
      { prompt: '4. Wann ... ihr angekommen?', answer: 'Wann seid ihr angekommen? → Wir sind um 18.00 Uhr angekommen.', explanation: 'ankommen (chegada de movimento) → sein.' },
      { prompt: '5. Wann ... er abgefahren?', answer: 'Wann ist er abgefahren? → Er ist um 9.00 Uhr abgefahren.', explanation: 'abfahren (partida com veículo) → sein.' },
    ],
  },
  {
    id: 'ex-c7',
    number: 'C7',
    page: 'p. 133',
    title: 'Reisebericht von Marie im Perfekt (Londres)',
    description: 'Transformação de relato de viagem integralmente para o Perfekt.',
    items: [
      { prompt: '0. ich – in London – gestern – gut ankommen', answer: 'Ich bin gestern gut in London angekommen.', explanation: 'ankommen → sein.' },
      { prompt: '1. zuerst – ich – mit der Metro – ins Stadtzentrum – fahren', answer: 'Zuerst bin ich mit der Metro ins Stadtzentrum gefahren.', explanation: 'fahren → sein.' },
      { prompt: '2. das – ungefähr 45 Minuten – dauern', answer: 'Das hat ungefähr 45 Minuten gedauert.', explanation: 'dauern (duração temporal estática) → haben.' },
      { prompt: '3. nach 20 Minuten – ich – es – finden', answer: 'Nach 20 Minuten habe ich es gefunden.', explanation: 'finden → haben.' },
      { prompt: '4. gestern Abend – das Musical sehen', answer: 'Gestern Abend habe ich mit Christian das Musical „Das Phantom der Oper“ gesehen.', explanation: 'sehen → haben.' },
      { prompt: '5. die Bootsfahrt – uns – sehr gut – gefallen', answer: 'Die Bootsfahrt hat uns sehr gut gefallen.', explanation: 'gefallen (verbo inseparável sem ge-) → haben.' },
    ],
  },
  {
    id: 'ex-c10',
    number: 'C10',
    page: 'p. 134',
    title: 'Welche Präposition passt?',
    description: 'Seleção da preposição correta em contextos fixos (mit, von, zur, zum, für, zu).',
    items: [
      { prompt: '1. Der FC Bayern München gewann ... 2 : 0.', answer: 'mit (gewann mit 2 : 0)', explanation: 'mit indica placar esportivo.' },
      { prompt: '2. Heute ist der 80. Geburtstag ... Oma.', answer: 'von (Geburtstag von Oma)', explanation: 'von exprime posse/relação com nome próprio.' },
      { prompt: '3. Alles Gute ... Hochzeit!', answer: 'zur (Alles Gute zur Hochzeit!)', explanation: 'zu + der (feminino dativo) = zur.' },
      { prompt: '4. Ich gratuliere dir ... Geburtstag.', answer: 'zum (Ich gratuliere dir zum Geburtstag.)', explanation: 'gratulieren + dativo + zu + dem = zum.' },
      { prompt: '5. Ich danke dir ... die Einladung.', answer: 'für (Ich danke dir für die Einladung.)', explanation: 'danken + acusativo com für.' },
      { prompt: '6. Du bist krank. Du musst ... Arzt gehen.', answer: 'zum (Du musst zum Arzt gehen.)', explanation: 'zu + dem Arzt (masculino dativo) = zum.' },
      { prompt: '7. Wir finden eine Lösung ... das Problem.', answer: 'für (Lösung für das Problem.)', explanation: 'Lösung für + acusativo.' },
    ],
  },
];

export const Bloco3ExercisesReviewW2L12: React.FC = () => {
  const [openExerciseId, setOpenExerciseId] = useState<string | null>('ex-a23');
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const toggleExercise = (id: string) => {
    setOpenExerciseId(openExerciseId === id ? null : id);
  };

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({ ...prev, [id]: val }));
  };

  const toggleRevealSolution = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAllChallenges = () => {
    setUserInputs({});
    setRevealedSolutions({});
  };

  return (
    <section id="bloco3-semana2-aula12" className="space-y-12">
      {/* Banner de Introdução do Bloco 3 */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Bloco 3 (60 Minutos) — Resolução Comentada & Tradução Reversa de Blindagem
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Gabarito Completo A23–C10, Laboratório Reverso & Tabela Mestre dos 17 Pontos
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Resolução analítica de todos os exercícios do livro didático (Kapitel 5, Teil B–D),
            treinamento de alta retenção no <strong className="text-emerald-300">Laboratório de Tradução Reversa de Blindagem</strong> (12 desafios corporativos)
            e consolidação final com a Tabela Mestre dos 17 Pontos-Chave do Dia 012.
          </p>
        </div>
      </div>

      {/* 3.1 a 3.16 Resoluções Comentadas dos Exercícios do Livro */}
      <div id="sec-3-resolucoes" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4" /> Seções 3.1 a 3.16
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              Gabarito Analítico Completo
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Resoluções Comentadas dos Exercícios do Livro Didático (A23 a C10)
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Clique em cada bloco para expandir os itens, respostas autênticas em alemão e justificativas gramaticais.
          </p>
        </div>

        <div className="space-y-4">
          {BOOK_EXERCISES_L12.map((ex) => {
            const isOpen = openExerciseId === ex.id;
            return (
              <div key={ex.id} className="rounded-xl border border-slate-200 overflow-hidden transition-all">
                <button
                  onClick={() => toggleExercise(ex.id)}
                  className="w-full p-4 bg-slate-50/80 hover:bg-slate-100/80 text-left flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                      {ex.number}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{ex.title}</div>
                      <div className="text-xs text-slate-500 font-mono">{ex.page}</div>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white space-y-3 border-t border-slate-200 text-xs sm:text-sm">
                    <p className="text-xs text-slate-600 italic mb-2">{ex.description}</p>
                    <div className="space-y-2.5">
                      {ex.items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50/60 rounded-lg border border-slate-100 space-y-1">
                          <div className="text-slate-600 font-medium">{item.prompt}</div>
                          <div className="flex items-center justify-between">
                            <div className="font-mono font-bold text-emerald-900">{item.answer}</div>
                            <AudioButton text={item.answer} size="sm" />
                          </div>
                          {item.explanation && (
                            <div className="text-[11px] text-slate-500 bg-white p-1.5 rounded border border-slate-100 mt-1">
                              <strong>Explicação:</strong> {item.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.17 e 3.18 Laboratório de Tradução Reversa de Blindagem */}
      <div id="sec-3-20" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Seções 3.17 & 3.18
            </span>
            <button
              onClick={resetAllChallenges}
              className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Resetar Respostas
            </button>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Laboratório de Tradução Reversa de Blindagem (12 Desafios)
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Traduza as sentenças corporativas do português para o alemão. Digite no campo, clique em <strong>Verificar / Revelar Solução</strong> e compare sua precisão sintática e de conjugação no Perfekt.
          </p>
        </div>

        <div className="space-y-4">
          {REVERSE_CHALLENGES_12.map((ch) => {
            const isRevealed = revealedSolutions[ch.id];
            const currentVal = userInputs[ch.id] || '';

            return (
              <div key={ch.id} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-blue-600">Desafio {ch.id} de 12:</span>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{ch.pt}</div>
                  </div>
                  <button
                    onClick={() => toggleRevealSolution(ch.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                  >
                    {isRevealed ? 'Ocultar' : 'Verificar Solução'}
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Digite sua tradução em alemão culto aqui..."
                    value={currentVal}
                    onChange={(e) => handleInputChange(ch.id, e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-mono bg-white"
                  />

                  {isRevealed && (
                    <div className="p-3.5 bg-blue-50/80 rounded-lg border border-blue-200 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="font-mono font-bold text-blue-950 text-sm">{ch.de}</div>
                        <AudioButton text={ch.de} size="sm" />
                      </div>
                      <div className="text-xs text-slate-600">
                        <strong className="text-slate-800">Notas Gramaticais:</strong> {ch.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.19 Resumo dos Pontos-Chave do Dia 012 */}
      <div id="sec-3-22" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Seção 3.19
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800">
              17 Mandamentos Sintáticos
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Tabela Mestre dos Pontos-Chave do Dia 012
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Síntese das 17 regras inegociáveis para a fixação de verbos separáveis, inseparáveis, -ieren, Perfekt e Wechselpräpositionen.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-1/3">Conceito Central</th>
                <th className="py-3 px-4">Regra e Aplicação Prática</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {KEY_POINTS_17.map((kp, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{kp.concept}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-mono text-xs">{kp.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
