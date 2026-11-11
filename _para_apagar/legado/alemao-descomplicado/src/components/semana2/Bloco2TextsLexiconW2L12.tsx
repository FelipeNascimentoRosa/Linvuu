import React, { useState } from 'react';
import {
  COMPUTER_PARTS,
  ORDINAL_NUMBERS_DAYS,
  MONTHS_LIST,
  MEDIA_STATS,
  VOCABULARY_30,
  UMGANGSSPRACHE_26,
} from '../../data/semana2Lesson12Data';
import { AudioButton } from '../AudioButton';
import {
  BookOpen,
  Monitor,
  PhoneCall,
  Calendar,
  Tv,
  MessageSquare,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mail,
  Volume2,
  FileText,
} from 'lucide-react';

export const Bloco2TextsLexiconW2L12: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [colloquialSearch, setColloquialSearch] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('a25');

  const filteredVocab = VOCABULARY_30.filter(
    (item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exampleSentence.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredColloquial = UMGANGSSPRACHE_26.filter(
    (item) =>
      item.expression.toLowerCase().includes(colloquialSearch.toLowerCase()) ||
      item.translation.toLowerCase().includes(colloquialSearch.toLowerCase()) ||
      item.context.toLowerCase().includes(colloquialSearch.toLowerCase())
  );

  const toggleSection = (sec: string) => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  return (
    <section id="bloco2-semana2-aula12" className="space-y-12">
      {/* Banner de Introdução do Bloco 2 */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Bloco 2 (60 Minutos) — Transcrição Integral, Tradução & Mineração Lexical
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Tecnologia no Escritório, Atendimento ao Cliente, Calendário & Consumo de Mídias
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Mergulho profundo na realidade profissional alemã: periféricos de informática (<span className="text-sky-300 font-semibold">der Bildschirm, die Tastatur</span>), agendamento telefônico de assistência técnica com <span className="text-amber-300 font-semibold">Frau Klein</span>, pronúncia e declinação de datas ordinais, estatísticas reais da mídia e mineração de 30 vocábulos e 26 expressões cotidianas.
          </p>
        </div>
      </div>

      {/* 2.1 e 2.2 Textos A20 e A21 — Am Computer (No Computador) */}
      <div id="sec-2-1" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Monitor className="w-4 h-4" /> Seções 2.1 & 2.2 (A20–A21)
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
              Hardware & Software
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Technik im Büro oder zu Hause — Periféricos e Ações Digitais
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Identificação de gêneros de periféricos de computador e os verbos de ação para manipulação de textos, e-mails e dados.
          </p>
        </div>

        {/* Grade de Periféricos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {COMPUTER_PARTS.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span
                  className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                    item.article === 'der'
                      ? 'bg-blue-100 text-blue-800'
                      : item.article === 'die'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {item.article}
                </span>
                <AudioButton text={`${item.article} ${item.word}. ${item.plural}.`} size="sm" />
              </div>
              <div className="font-bold text-slate-900 text-sm">{item.word}</div>
              <div className="text-slate-500 font-mono text-[11px]">{item.plural}</div>
              <div className="text-slate-600 font-medium pt-1 border-t border-slate-200/60">{item.trans}</div>
            </div>
          ))}
        </div>

        {/* Verbos de Ação Digital (A21) */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-5 space-y-3">
          <div className="font-bold text-blue-950 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Was kann oder muss man alles tun? (Ações Digitais Chave)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-blue-200/60 space-y-1">
              <div className="font-bold text-slate-900">den Computer / den Drucker:</div>
              <div className="font-mono text-blue-900 font-semibold">einschalten, ausschalten, anschließen, installieren</div>
              <div className="text-slate-600 text-[11px]">ligar, desligar, conectar cabo, instalar</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-200/60 space-y-1">
              <div className="font-bold text-slate-900">einen Text / eine Datei:</div>
              <div className="font-mono text-blue-900 font-semibold">speichern, kopieren, löschen, ausdrucken, ausschneiden, einfügen</div>
              <div className="text-slate-600 text-[11px]">salvar, copiar, apagar, imprimir, recortar, colar/inserir</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-200/60 space-y-1">
              <div className="font-bold text-slate-900">eine E-Mail:</div>
              <div className="font-mono text-blue-900 font-semibold">schreiben, senden, erhalten / bekommen, weiterleiten</div>
              <div className="text-slate-600 text-[11px]">escrever, enviar, receber, encaminhar</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.3 e 2.9 Fonética — Wortakzent e Som st [ʃt] */}
      <div id="sec-2-3" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4" /> Seções 2.3 & 2.9 (A22 & A28)
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Laboratório Fonético: O Acento Tônico do Verbo & A Pronúncia do <em>st</em>
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Regra rígida de acentuação e contraste do dígrafo <code className="font-mono font-bold text-purple-900">[ʃt]</code> inicial vs. <code className="font-mono font-bold text-purple-900">[st]</code> em sufixos numéricos ordinais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Acento do Verbo */}
          <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/30 space-y-3 text-xs">
            <div className="font-bold text-purple-950 text-sm">Wortakzent der Verben</div>
            <div className="space-y-2">
              <div className="p-2.5 bg-white rounded border border-purple-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-900">Trennbare Verben: Acento no Prefixo (à esquerda)</div>
                  <div className="font-mono text-slate-700"><strong>AUF</strong>stehen, <strong>EIN</strong>kaufen, <strong>FERN</strong>sehen, <strong>AB</strong>sagen</div>
                </div>
                <AudioButton text="aufstehen. einkaufen. fernsehen. absagen." size="sm" />
              </div>
              <div className="p-2.5 bg-white rounded border border-purple-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rose-900">Nicht-trennbare Verben: Acento no Radical (palavra base)</div>
                  <div className="font-mono text-slate-700">be<strong>GIN</strong>nen, über<strong>SET</strong>zen, ver<strong>EIN</strong>baren</div>
                </div>
                <AudioButton text="beginnen. übersetzen. vereinbaren. bezahlen." size="sm" />
              </div>
              <div className="p-2.5 bg-white rounded border border-purple-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">Verben auf -ieren: Acento sempre no [ie]</div>
                  <div className="font-mono text-slate-700">telefo<strong>NIE</strong>ren, repa<strong>RIE</strong>ren, stu<strong>DIE</strong>ren</div>
                </div>
                <AudioButton text="telefonieren. reparieren. studieren. kopieren." size="sm" />
              </div>
            </div>
          </div>

          {/* Fonética do st */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 space-y-3 text-xs">
            <div className="font-bold text-amber-950 text-sm">Pronúncia do Grupo consonantal „st“</div>
            <div className="space-y-2">
              <div className="p-2.5 bg-white rounded border border-amber-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-900">Início de palavra ou radical: [ʃt] (som chiado)</div>
                  <div className="font-mono text-slate-700">Stunde [ʃtʊndə], stehen [ʃte:ən], studieren, ein Stück, frühstücken</div>
                </div>
                <AudioButton text="Stunde. stehen. studieren. ein Stück. frühstücken." size="sm" />
              </div>
              <div className="p-2.5 bg-white rounded border border-amber-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Final de ordinais (a partir do 20): [st] (som seco de s)</div>
                  <div className="font-mono text-slate-700">der zwanzigste [tsvantsɪkstə], der einundzwanzigste</div>
                </div>
                <AudioButton text="der zwanzigste. der einundzwanzigste. der zweiundzwanzigste." size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.6 Texto A25 — Ein Reparaturauftrag (Transcrição Completa) */}
      <div id="sec-2-6" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" /> Seção 2.6 (Texto A25, p. 122)
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              Diálogo Telefônico Autêntico
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Ein Reparaturauftrag — Susanne Müller & Frau Klein
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Ligação de reclamação e agendamento de visita técnica para conserto de uma máquina de lavar roupa nova.
          </p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-indigo-900">Susanne Müller:</div>
              <div className="font-mono text-slate-800">Ja, guten Tag, Susanne Müller. Kann ich bitte Frau Klein sprechen?</div>
              <div className="text-slate-500 italic text-xs">Sim, bom dia, Susanne Müller. Posso falar com a Sra. Klein?</div>
            </div>
            <AudioButton text="Ja, guten Tag, Susanne Müller. Kann ich bitte Frau Klein sprechen?" size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-slate-700">Mitarbeiter:</div>
              <div className="font-mono text-slate-800">Einen Moment, bitte. Ich verbinde Sie.</div>
              <div className="text-slate-500 italic text-xs">Um momento, por favor. Eu a conecto.</div>
            </div>
            <AudioButton text="Einen Moment, bitte. Ich verbinde Sie." size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-rose-900">Frau Klein:</div>
              <div className="font-mono text-slate-800">Klein.</div>
              <div className="text-slate-500 italic text-xs">Klein. (Atendimento formal alemão dizendo o sobrenome).</div>
            </div>
            <AudioButton text="Klein." size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-indigo-900">Susanne Müller:</div>
              <div className="font-mono text-slate-800">
                Ja, guten Tag, Susanne Müller. Ich habe ein Problem. Ich habe am Donnerstag eine Waschmaschine gekauft und die Waschmaschine funktioniert jetzt nicht mehr. Ich möchte gern einen Termin für die Reparatur vereinbaren.
              </div>
              <div className="text-slate-500 italic text-xs">
                Sim, bom dia, Susanne Müller. Tenho um problema. Comprei uma lavadora na quinta-feira e ela agora não funciona mais. Gostaria de marcar um horário para o reparo.
              </div>
            </div>
            <AudioButton text="Ja, guten Tag, Susanne Müller. Ich habe ein Problem. Ich habe am Donnerstag eine Waschmaschine gekauft und die Waschmaschine funktioniert jetzt nicht mehr. Ich möchte gern einen Termin für die Reparatur vereinbaren." size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-rose-900">Frau Klein:</div>
              <div className="font-mono text-slate-800">Das glaube ich nicht! Die neue Waschmaschine ist kaputt?</div>
              <div className="text-slate-500 italic text-xs">Não acredito! A máquina de lavar nova está quebrada?</div>
            </div>
            <AudioButton text="Das glaube ich nicht! Die neue Waschmaschine ist kaputt?" size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-indigo-900">Susanne Müller:</div>
              <div className="font-mono text-slate-800">Ja, sie funktioniert nicht. Ich möchte jetzt gerne eine schnelle Reparatur. Kann der Monteur heute noch kommen?</div>
              <div className="text-slate-500 italic text-xs">Sim, ela não funciona. Gostaria agora de um conserto rápido. O técnico pode vir ainda hoje?</div>
            </div>
            <AudioButton text="Ja, sie funktioniert nicht. Ich möchte jetzt gerne eine schnelle Reparatur. Kann der Monteur heute noch kommen?" size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-rose-900">Frau Klein:</div>
              <div className="font-mono text-slate-800">Heute? Nein, das ist leider nicht möglich. Morgen vielleicht. Ja, morgen um 15.00 Uhr.</div>
              <div className="text-slate-500 italic text-xs">Hoje? Não, infelizmente não é possível. Amanhã talvez. Sim, amanhã às 15h.</div>
            </div>
            <AudioButton text="Heute? Nein, das ist leider nicht möglich. Morgen vielleicht. Ja, morgen um 15.00 Uhr." size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-indigo-900">Susanne Müller:</div>
              <div className="font-mono text-slate-800">Um 15.00 Uhr muss ich noch arbeiten. Geht es um 18.00 Uhr?</div>
              <div className="text-slate-500 italic text-xs">Às 15h ainda tenho que trabalhar. Dá às 18h?</div>
            </div>
            <AudioButton text="Um 15.00 Uhr muss ich noch arbeiten. Geht es um 18.00 Uhr?" size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-rose-900">Frau Klein:</div>
              <div className="font-mono text-slate-800">Ja, 18.00 Uhr ist auch möglich.</div>
              <div className="text-slate-500 italic text-xs">Sim, 18h também é possível.</div>
            </div>
            <AudioButton text="Ja, 18.00 Uhr ist auch möglich." size="sm" />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-indigo-900">Susanne Müller:</div>
              <div className="font-mono text-slate-800">Gut, dann erwarte ich den Monteur morgen um 18.00 Uhr. Auf Wiederhören.</div>
              <div className="text-slate-500 italic text-xs">Bom, então aguardo o técnico amanhã às 18h. Até logo (ao telefone).</div>
            </div>
            <AudioButton text="Gut, dann erwarte ich den Monteur morgen um 18.00 Uhr. Auf Wiederhören." size="sm" />
          </div>
        </div>
      </div>

      {/* 2.7 e 2.8 Dias, Meses e Como Dizer Datas em Alemão */}
      <div id="sec-2-7" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Seções 2.7 & 2.8 (A26–A27)
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              O Calendário & Datas
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Tage, Monate & Das Datum — Como Dizer Datas Oralmente
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Regra de ouro das datas: Escrita <code>14.5.2020</code> → Fala: <strong>Heute ist der vierzehnte Fünfte (Mai) zweitausendzwanzig</strong>. Em complementos circunstanciais com <em>am</em>: <strong>am vierzehnten Fünften</strong>.
          </p>
        </div>

        {/* Meses do Ano */}
        <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-2">
          <div className="font-bold text-emerald-950 text-xs">Die 12 Monate (Todos masculinos com o artigo „der“):</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {MONTHS_LIST.map((m, idx) => (
              <div key={idx} className="p-2 bg-white rounded border border-emerald-100 flex items-center justify-between">
                <span className="font-mono font-semibold text-slate-800">{m}</span>
                <AudioButton text={m} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Amostra dos Ordinais dos Dias */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Nº</th>
                <th className="py-2.5 px-4">Forma Alemã (Nominativo)</th>
                <th className="py-2.5 px-4">Tradução</th>
                <th className="py-2.5 px-2 text-center">Ouvir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {ORDINAL_NUMBERS_DAYS.slice(0, 10).map((d, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-bold text-emerald-900">{d.num}</td>
                  <td className="py-2 px-4 font-bold text-slate-900">{d.de}</td>
                  <td className="py-2 px-4 text-slate-600 font-sans">{d.trans}</td>
                  <td className="py-2 px-2 text-center">
                    <AudioButton text={d.de} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.13 e 2.14 Mídia e Televisão na Alemanha */}
      <div id="sec-2-13" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Tv className="w-4 h-4" /> Seções 2.13 & 2.14 (Textos B1 e B3)
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Mediennutzung & Fernsehen in Deutschland — Estatísticas Culturais
          </h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            Os alemães assistem a quase 4 horas diárias de televisão (236 minutos), enquanto usam a internet por 101 minutos e o rádio por 100 minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {MEDIA_STATS.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/30 space-y-1.5 text-xs">
              <div className="font-bold text-slate-900">{m.media}</div>
              <div className="font-mono text-xl font-extrabold text-amber-900">{m.minutes} min</div>
              <div className="text-slate-500 text-[11px]">{m.trans}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.29 Tabela Lexical Primária (30 Termos) */}
      <div id="sec-2-29" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Seção 2.29
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
              30 Termos Corporativos
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Tabela Lexical Primária — Informática, Escritório e Agenda
          </h3>
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar termo, tradução ou frase modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Artigo</th>
                <th className="py-3 px-4">Substantivo</th>
                <th className="py-3 px-3">Plural</th>
                <th className="py-3 px-4">Tradução Exata</th>
                <th className="py-3 px-4">Frase Modelo do Texto</th>
                <th className="py-3 px-2 text-center">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVocab.map((term, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                        term.article === 'der'
                          ? 'bg-blue-100 text-blue-800'
                          : term.article === 'die'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {term.article}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{term.word}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-slate-500">{term.plural}</td>
                  <td className="py-2.5 px-4 text-slate-700">{term.translation}</td>
                  <td className="py-2.5 px-4 font-mono text-xs text-slate-800">{term.exampleSentence}</td>
                  <td className="py-2.5 px-2 text-center">
                    <AudioButton text={`${term.article} ${term.word}. ${term.exampleSentence}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.30 Registro Coloquial (Umgangssprache - 26 Expressões) */}
      <div id="sec-2-30" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Seção 2.30
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700">
              26 Expressões Autênticas
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Registro Coloquial e Autêntico (Umgangssprache im Büro)
          </h3>
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar expressão informal ou contexto..."
            value={colloquialSearch}
            onChange={(e) => setColloquialSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredColloquial.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900 text-sm">{item.expression}</span>
                <AudioButton text={item.expression} size="sm" />
              </div>
              <div className="text-slate-700 font-medium">{item.translation}</div>
              <div className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded w-fit">
                {item.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
