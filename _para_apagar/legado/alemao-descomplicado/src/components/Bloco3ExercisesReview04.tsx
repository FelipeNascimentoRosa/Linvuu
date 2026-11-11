import React, { useState } from 'react';
import {
  EXERCISE_A3_ITEMS,
  DEPARTMENTS_A14,
  HIER_KANN_MAN_A15,
  VERB_POSITION_A16,
  VERB_OBJECT_PAIRS_A17,
  PHONETICS_ACCENT_A18,
  HOBBIES_A19,
  DIALOGUES_PREFERENCE_A21,
  TEXT_A22_DIALOGUE,
  REVERSE_TRANSLATION_LESSON_4,
  KEY_POINTS_LESSON_4,
} from '../data/lesson04Data';
import { AudioButton } from './AudioButton';
import {
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  MessageCircle,
  Headphones,
  Award,
  Layers,
} from 'lucide-react';

export const Bloco3ExercisesReview04: React.FC = () => {
  const [revealedReverse, setRevealedReverse] = useState<Record<number, boolean>>({});
  const [showAllReverse, setShowAllReverse] = useState<boolean>(false);

  const toggleReverse = (id: number) => {
    setRevealedReverse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllReverse = () => {
    if (showAllReverse) {
      setRevealedReverse({});
      setShowAllReverse(false);
    } else {
      const allRevealed: Record<number, boolean> = {};
      REVERSE_TRANSLATION_LESSON_4.forEach((item) => {
        allRevealed[item.id] = true;
      });
      setRevealedReverse(allRevealed);
      setShowAllReverse(true);
    }
  };

  return (
    <section id="bloco-3-exercicios-revisao-rodada4" className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 3 (60 Minutos) · Rodada 04
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 004 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Resolução Comentada de Exercícios & Tradução Reversa
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Exercícios analíticos A3 a A22: distribuição de equipamentos de escritório (<em>Peter Lindau vs. Rita Kalt</em>),
          departamentos universitários (<em>A14</em>), o operador impessoal <em>man</em> com <em>können</em> (<em>A15</em>),
          ordenação topológica de orações (<em>A16</em>), fonética do acento tônico (<em>A18</em>), preferências de lazer com <em>lieber</em> (<em>A21</em>),
          o diálogo integral na cafeteria (<em>A22</em>), 10 sentenças de tradução reversa de blindagem e síntese conclusiva.
        </p>
      </div>

      {/* 3.1 Exercício A3 — Wo sind die Sachen? */}
      <div id="secao-3-1-ex-a3-wo-sind-die-sachen" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.1 · Exercício A3 (p. 37)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A3 — <em>Wo sind die Sachen?</em> (Onde Estão as Coisas?)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Compreensão auditiva e conferência de inventário: atribuição dos 14 objetos aos postos de <strong>Peter Lindau</strong> ou <strong>Rita Kalt</strong>.
            </p>
          </div>
          <AudioButton
            text="Der Computer steht bei Peter Lindau. Der Drucker steht bei Rita Kalt. Die Brille gehört Peter Lindau. Der Stift ist von Rita Kalt. Das Telefon steht bei Peter Lindau."
            lang="de-DE"
            label="Ouvir Resumo Auditivo A3"
          />
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">Objeto de Escritório</th>
                  <th className="py-2.5 px-3 text-center">Peter Lindau</th>
                  <th className="py-2.5 px-3 text-center">Rita Kalt</th>
                  <th className="py-2.5 px-3">Justificativa & Localização</th>
                  <th className="py-2.5 px-3 text-center">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {EXERCISE_A3_ITEMS.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{item.item}</td>
                    <td className="py-2.5 px-3 text-center">
                      {item.dono === 'Peter Lindau' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-sky-100 text-sky-800">
                          ☒ Peter
                        </span>
                      ) : (
                        <span className="text-slate-300">☐</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {item.dono === 'Rita Kalt' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800">
                          ☒ Rita
                        </span>
                      ) : (
                        <span className="text-slate-300">☐</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-xs text-slate-600">{item.justificativa}</td>
                    <td className="py-2.5 px-3 text-center">
                      <AudioButton text={`${item.item} bei ${item.dono}`} lang="de-DE" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.2 a 3.5 Exercícios A4, A5, A7 e A11 */}
      <div id="secao-3-2-a4-a5-a7-a11" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A4 & A5 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Exercícios A4 & A5 (p. 37)
          </div>
          <h4 className="text-lg font-bold text-slate-900">
            Profissões & Relato de Existência (<em>ein / kein / sind</em>)
          </h4>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900">A4 · Was sind die Leute von Beruf?</div>
              <div className="text-slate-700 italic">"Ich denke, Peter Lindau ist <strong>Informatiker</strong> von Beruf."</div>
              <div className="text-slate-700 italic">"Rita Kalt ist <strong>Sekretärin</strong> von Beruf."</div>
              <div className="text-[11px] text-slate-500">Regra: uso do verbo <em>denken</em> e profissões sem artigo após <em>sein</em>.</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900">A5 · Im Büro von Peter Lindau</div>
              <div className="space-y-1 text-slate-700">
                <p>✓ Im Büro von Peter Lindau ist <strong>ein</strong> Computer.</p>
                <p>✓ Im Büro von Peter Lindau ist <strong>kein</strong> Terminkalender.</p>
                <p>✓ Im Büro von Peter Lindau sind Fotos und Dokumente.</p>
                <p>✓ Im Büro von Peter Lindau sind <strong>keine</strong> Bücher.</p>
              </div>
              <div className="text-[11px] text-slate-500">Regra: <em>ein</em> (afirmativo) vs. <em>kein/keine</em> (negativo) no Nominativo.</div>
            </div>
          </div>
        </div>

        {/* A7 & A11 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Exercícios A7 & A11 (p. 38, 40)
          </div>
          <h4 className="text-lg font-bold text-slate-900">
            Preços & Diagnóstico de Falha (<em>kaputt / funktioniert nicht</em>)
          </h4>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900">A7 · Diálogos de Cotação</div>
              <div className="text-slate-700">
                <p>— Was kostet die Bürolampe? (34,99 €)</p>
                <p>— 34,99 Euro? Das ist <strong>preiswert</strong>! Ja, <strong>sie</strong> ist praktisch und schön.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900">A11 · Estruturas de Diagnóstico</div>
              <div className="space-y-1 text-slate-700">
                <p>• <em>Funktioniert dein Handy?</em> — Nein, mein Handy <strong>funktioniert nicht</strong>.</p>
                <p>• <em>Funktioniert Ihr Kopierer?</em> — Nein, mein Kopierer <strong>ist kaputt</strong>.</p>
                <p>• <em>Geht dein Auto?</em> — Nein, mein Auto <strong>geht nicht</strong>. Ich kann nicht fahren.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.7 Exercício A14 — Abteilungen */}
      <div id="secao-3-7-ex-a14-abteilungen" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.7 · Exercício A14 (p. 41)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A14 — <em>Abteilungen</em> (Departamentos da Universidade)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Associação funcional entre os departamentos e as ações executadas no campus acadêmico.
            </p>
          </div>
          <AudioButton
            text="das Sekretariat, Informationen bekommen. die Verwaltung, Rechnungen bezahlen. die Bibliothek, Zeitungen und Bücher lesen. das Sprachenzentrum, Sprachen lernen. die Kantine, die Mensa, die Sporthalle, die Cafeteria."
            lang="de-DE"
            label="Ouvir Departamentos A14"
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEPARTMENTS_A14.map((d, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    Item {i + 1} ({d.idLetra})
                  </span>
                  <AudioButton text={`${d.departamento}: ${d.funcao}`} lang="de-DE" size="sm" />
                </div>
                <div className="font-bold text-slate-900 text-sm">{d.departamento}</div>
                <div className="text-xs font-semibold text-emerald-800">{d.funcao}</div>
                <div className="text-[11px] text-slate-500 italic">{d.traducao}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.8 Exercício A15 — Hier kann man ... */}
      <div id="secao-3-8-ex-a15-hier-kann-man" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.8 · Exercício A15 (p. 41)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A15 — <em>Hier kann man ...</em> (O Sujeito Impessoal <em>man</em> + Modalverb)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Construções com o pronome impessoal <strong>man</strong> (a gente / se pode), que exige verbo estritamente na 3ª pessoa do singular (<em>kann</em>).
            </p>
          </div>
          <AudioButton
            text="Hier kann man Bücher lesen. Hier kann man Kaffee trinken. Hier kann man Volleyball oder Fußball spielen. Hier kann man Informationen bekommen. Hier kann man Rechnungen bezahlen."
            lang="de-DE"
            label="Ouvir Sentenças A15"
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HIER_KANN_MAN_A15.map((h) => (
              <div key={h.num} className="p-3 border border-slate-200 rounded-xl bg-slate-50/40 flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">#{h.num}</span>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm mt-0.5">{h.frase}</div>
                  <div className="text-xs text-slate-500 italic mt-0.5">{h.traducao}</div>
                </div>
                <AudioButton text={h.frase} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.9 Exercício A16 — Position der Verben */}
      <div id="secao-3-9-ex-a16-posicao-verbos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.9 · Exercício A16 (p. 42)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A16 — <em>Position der Verben</em> (Ordenação Sintática & Satzklammer)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Reorganização de fragmentos soltos respeitando a Posição II do modal e o infinitivo no Satzende.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {VERB_POSITION_A16.map((row, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/40 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs font-mono text-slate-500">Pistas: {row.original}</div>
                <AudioButton text={row.ordenada} lang="de-DE" size="sm" />
              </div>
              <div className="font-bold text-slate-900 text-sm font-mono text-indigo-950">
                ➔ {row.ordenada}
              </div>
              <div className="text-xs text-emerald-800 bg-emerald-50/60 p-2 rounded border border-emerald-200/60">
                {row.analise}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3.10 Exercício A17 — Was kann man ...? */}
      <div id="secao-3-10-ex-a17-combinacoes" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.10 · Exercício A17 (p. 42)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A17 — <em>Was kann man ...?</em> (Pares Colocacionais Verbo + Objeto)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Colocações canônicas de alta frequência em alemão padrão.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {VERB_OBJECT_PAIRS_A17.map((pair, idx) => (
              <div key={idx} className="p-3 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="font-mono font-bold text-sm text-slate-900">
                    <span className="text-indigo-700">{pair.verbo}</span>{' '}
                    <span className="text-slate-800">{pair.objeto}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{pair.traducao}</div>
                </div>
                <AudioButton text={`${pair.objeto} ${pair.verbo}`} lang="de-DE" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.11 Exercício A18 — Phonetik (Wortakzent) */}
      <div id="secao-3-11-ex-a18-fonetica" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.11 · Exercício A18 (p. 42)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A18 — Fonética: O Acento Tônico das Palavras (<em>Der Wortakzent</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              A regra cardinal do alemão: <strong>acento à esquerda</strong> (na primeira sílaba de palavras nativas e compostas) vs. <strong>acento à direita</strong> em estrangeirismos.
            </p>
          </div>
          <AudioButton
            text="Abend, Bücher, Lampe, Name, Drucker, Zeitung, Fußball, Bücherregal, Schreibtisch, Bildschirm. Büro, Student, Dokument, Termin, Universität, Bibliothek."
            lang="de-DE"
            label="Ouvir Fonética A18"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grundregel */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/40 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block border-b border-slate-200 pb-1">
                1. Regra Fundamental: Acento à Esquerda
              </span>
              <div className="divide-y divide-slate-100 text-xs">
                {PHONETICS_ACCENT_A18.grundregel.map((item, i) => (
                  <div key={i} className="py-1.5 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{item.termo}</span>
                    <AudioButton text={item.termo.replace(/-/g, '')} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Komposita */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/40 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block border-b border-slate-200 pb-1">
                2. Compostos (Komposita): Acento no 1º Elemento
              </span>
              <div className="divide-y divide-slate-100 text-xs">
                {PHONETICS_ACCENT_A18.komposita.map((item, i) => (
                  <div key={i} className="py-1.5 flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-900">{item.termo}</span>
                    <AudioButton text={item.termo.replace(/-/g, '')} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Fremdwörter */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/40 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block border-b border-slate-200 pb-1">
                3. Estrangeirismos: Acento à Direita
              </span>
              <div className="divide-y divide-slate-100 text-xs">
                {PHONETICS_ACCENT_A18.fremdwoerter.map((item, i) => (
                  <div key={i} className="py-1.5 flex items-center justify-between">
                    <span className="font-mono font-bold text-rose-900">{item.termo}</span>
                    <AudioButton text={item.termo.replace(/-/g, '')} lang="de-DE" size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.12 & 3.13 Hobbies e Diálogos de Preferência (A19, A21) */}
      <div id="secao-3-12-hobbies-preferencia" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 3.12 & 3.13 · Exercícios A19 & A21 (p. 43–44)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Hobbies Favoritos & Expressão de Preferência com <em>lieber</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Diferença entre gostar de fazer (<em>gern</em>) e preferir fazer algo alternativo (<em>lieber</em>).
            </p>
          </div>
          <AudioButton
            text="Freunde besuchen, Auto fahren, Fremdsprachen lernen, wandern, kochen, im Internet surfen, lesen, Bier trinken, Musik hören, Sport machen, fotografieren, telefonieren."
            lang="de-DE"
            label="Ouvir 12 Hobbies"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Hobbies */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 block">
              12 Hobbies Canônicos
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {HOBBIES_A19.map((h, i) => (
                <div key={i} className="p-2.5 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-slate-900">{h.hobby}</div>
                    <div className="text-[11px] text-slate-500 italic">{h.traducao}</div>
                  </div>
                  <AudioButton text={h.hobby} lang="de-DE" size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Diálogos com lieber */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 block">
              10 Diálogos Modelos com <em>lieber</em> (Preferência)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DIALOGUES_PREFERENCE_A21.map((d, i) => (
                <div key={i} className="p-3 border border-slate-200 rounded-xl bg-slate-50/40 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-indigo-700">Diálogo #{i}</span>
                    <AudioButton text={`${d.pergunta} ${d.resposta}`} lang="de-DE" size="sm" />
                  </div>
                  <div className="text-slate-800">
                    <p><strong>A:</strong> {d.pergunta}</p>
                    <p className="text-slate-500 italic text-xs pl-2">↳ {d.traducaoP}</p>
                  </div>
                  <div className="text-indigo-950 font-semibold">
                    <p><strong>B:</strong> {d.resposta}</p>
                    <p className="text-slate-500 italic text-xs pl-2">↳ {d.traducaoR}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3.14 Exercício A22 — In der Cafeteria */}
      <div id="secao-3-14-ex-a22-in-der-cafeteria" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.14 · Exercício A22 (p. 44)
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Exercício A22 — <em>In der Cafeteria</em> (Diálogo Completo na Cafeteria)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Interação social entre Lisa Herzberg e Herr Heinemann: hobbies, instrumentos, orquestra universitária, esportes e idiomas.
            </p>
          </div>
          <AudioButton
            text="Was trinken Sie, Herr Heinemann? Kaffee bitte. Geht Ihr Drucker jetzt? Ja, er funktioniert, ich kann drucken. Wie finden Sie Marburg? Marburg ist eine schöne Stadt. Am Wochenende fahre ich nach München. Ich spiele dort im Universitätsorchester. Welches Instrument spielen Sie? Klavier. Können Sie gut singen? Nein, ich kann nicht singen."
            lang="de-DE"
            label="Ouvir Destaques da Cafeteria"
          />
        </div>

        <div className="p-6 space-y-3">
          {TEXT_A22_DIALOGUE.map((line, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border ${
                line.speaker.includes('Herzberg')
                  ? 'bg-indigo-50/30 border-indigo-100'
                  : 'bg-amber-50/20 border-amber-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                      line.speaker.includes('Herzberg')
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'bg-amber-100 text-amber-950'
                    }`}
                  >
                    {line.speaker}
                  </span>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">{line.de}</span>
                </div>
                <AudioButton text={line.de} lang="de-DE" size="sm" />
              </div>
              <div className="text-xs text-slate-600 italic mt-1 pl-1 border-l-2 border-slate-300">
                {line.pt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3.15 & 3.16 Tradução Reversa de Blindagem */}
      <div id="secao-3-15-traducao-reversa" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 3.15 & 3.16
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tradução Reversa de Blindagem (Português ➔ Alemão)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              10 sentenças selecionadas para forçar a evocação ativa da sintaxe rígida, concordância adjetiva e modais.
            </p>
          </div>

          <button
            onClick={toggleAllReverse}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {showAllReverse ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAllReverse ? 'Ocultar Todas as Respostas' : 'Revelar Todas as Respostas'}
          </button>
        </div>

        <div className="p-6 space-y-4">
          {REVERSE_TRANSLATION_LESSON_4.map((item) => {
            const isRevealed = revealedReverse[item.id] || showAllReverse;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center font-mono shrink-0">
                      {item.id}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">{item.pt}</span>
                  </div>

                  <button
                    onClick={() => toggleReverse(item.id)}
                    className="self-start sm:self-auto px-2.5 py-1 text-xs font-semibold rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {isRevealed ? 'Ocultar Resposta' : 'Ver em Alemão'}
                  </button>
                </div>

                {isRevealed && (
                  <div className="pt-2 border-t border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-indigo-100">
                      <div className="font-mono font-bold text-indigo-950 text-sm">{item.de}</div>
                      <AudioButton text={item.de} lang="de-DE" size="sm" />
                    </div>
                    <div className="text-xs text-slate-600 bg-slate-100/80 p-2.5 rounded-lg border border-slate-200">
                      💡 <span className="font-semibold text-slate-800">Justificativa gramatical:</span>{' '}
                      {item.justificativa}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3.17 Resumo dos Pontos-Chave do Dia 004 */}
      <div id="secao-3-17-resumo-pontos-chave" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 3.17
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Resumo dos Pontos-Chave do Dia 004 (Rodada 04)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Síntese canônica das 10 regras estruturais fundamentais consolidadas nesta rodada.
            </p>
          </div>
          <Award className="w-6 h-6 text-amber-500 shrink-0" />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KEY_POINTS_LESSON_4.map((kp) => (
              <div key={kp.numero} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center font-mono shrink-0">
                    {kp.numero}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{kp.conceito}</span>
                </div>
                <p className="text-xs text-slate-700 pl-7 leading-relaxed">{kp.regra}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
