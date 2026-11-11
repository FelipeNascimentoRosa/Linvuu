import React, { useState } from 'react';
import {
  TEXT_A17_COUNTRIES_RESOLUCAO,
  TEXT_A19_DIALOGUES,
  PHONETIK_A21_ITEMS,
  TEXT_A22_PLANES,
  TEXT_A23_NUMBERS,
  TEXT_A24_FLUEGE,
  TEXT_A25_ZAHLEN,
  TEXT_A26_TELEFON,
  REVERSE_TRANSLATION_ITEMS_02,
  KEY_POINTS_02,
  LESSON_02_METADATA,
} from '../data/lesson02Data';
import { AudioButton } from './AudioButton';
import {
  CheckCircle,
  Eye,
  EyeOff,
  BookOpen,
  Volume2,
  HelpCircle,
  Check,
  FileCheck2,
} from 'lucide-react';

export const Bloco3ExercisesReview02: React.FC = () => {
  const [revealedItems, setRevealedItems] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const revealAll = () => {
    const all = REVERSE_TRANSLATION_ITEMS_02.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<number, boolean>);
    setRevealedItems(all);
  };

  const hideAll = () => {
    setRevealedItems({});
  };

  return (
    <section id="bloco-3-exercicios-rodada2" className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Bloco 3 (60 Minutos) · Rodada 02
          </span>
          <span className="text-xs text-slate-300 font-medium">Gabaritos Comentados & Tradução Reversa</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Resolução Comentada de Exercícios & Tradução Reversa de Blindagem
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Gabarito exaustivo dos exercícios A17 a A26 (p. 13–15), 10 sentenças de tradução reversa com justificativa sintática detalhada
          e matriz final dos 11 pontos-chave do Dia 002.
        </p>
      </div>

      {/* 3.1 Exercício A17 — Sprachen */}
      <div id="secao-3-1-ex-a17" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Seção 3.1
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exercício A17 — Sprachen (Línguas) — p. 13</h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Ordnen Sie die Sprachen zu. Lesen Sie laut. Portugiesisch • Englisch • Arabisch • Russisch • Türkisch • Rumänisch • Ungarisch • Griechisch • Polnisch • Japanisch • Tschechisch • Chinesisch • Französisch • Spanisch</em>
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">País</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">Língua</th>
                  <th className="py-3 px-4">Frase Completa</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A17_COUNTRIES_RESOLUCAO.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.pais}</td>
                    <td className="py-2.5 px-4 font-medium text-indigo-700 bg-indigo-50/20">{row.lingua}</td>
                    <td className="py-2.5 px-4 text-slate-800">{row.frase}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={row.frase} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.2 Exercício A19 — Sprechen Sie ...? */}
      <div id="secao-3-2-ex-a19" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 3.2
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exercício A19 — Sprechen Sie ...? — p. 13</h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Antworten Sie auf die Fragen mit Ja oder Nein.</em>
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pergunta</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">Resposta Modelo</th>
                  <th className="py-3 px-4">Justificativa Sintática</th>
                  <th className="py-3 px-4 text-right">Áudios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A19_DIALOGUES.map((d, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{d.pergunta}</td>
                    <td className="py-2.5 px-4 font-semibold text-indigo-700 bg-indigo-50/20">{d.resposta}</td>
                    <td className="py-2.5 px-4 text-xs text-slate-600">{d.justificativa}</td>
                    <td className="py-2.5 px-4 text-right space-x-1">
                      <AudioButton text={d.pergunta} lang="de-DE" size="xs" variant="icon-only" />
                      <AudioButton text={d.resposta} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.3 Exercício A20 — Ihre Muttersprache */}
      <div id="secao-3-3-ex-a20" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Seção 3.3 · Exercício A20
        </div>
        <h4 className="font-bold text-lg text-slate-900">Ihre Muttersprache (Relato de Entrevista) — p. 14</h4>
        <p className="text-xs text-slate-600">
          <strong>Enunciado Original:</strong> <em>Fragen Sie Ihre Nachbarin/Ihren Nachbarn. Berichten Sie: Ich komme aus... Meine Muttersprache ist... Ich spreche auch... Mein Nachbar kommt aus... Seine Muttersprache ist... Er spricht auch... Meine Nachbarin kommt aus... Ihre Muttersprache ist... Sie spricht auch...</em>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Exemplo 1 (Eu mesmo):</span>
            <p className="text-slate-700 italic">
              "Ich komme aus Brasilien. Meine Muttersprache ist Portugiesisch. Ich spreche auch Englisch und ein bisschen Deutsch."
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Exemplo 2 (Vizinho masc. - sein):</span>
            <p className="text-slate-700 italic">
              "Mein Nachbar kommt aus Spanien. Seine Muttersprache ist Spanisch. Er spricht auch Englisch und Französisch."
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Exemplo 3 (Vizinha fem. - ihr):</span>
            <p className="text-slate-700 italic">
              "Meine Nachbarin kommt aus Italien. Ihre Muttersprache ist Italienisch. Sie spricht auch Deutsch und Englisch."
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
          <strong>Justificativa Gramatical:</strong> O possessivo de 3ª pessoa concorda com o possuidor (<em>sein</em> para homem/er; <em>ihr</em> para mulher/sie) e com a coisa possuída (como <em>Muttersprache</em> é feminino, ambos recebem a desinência <strong>-e</strong>: <em>sein<strong>e</strong></em> e <em>ihr<strong>e</strong></em>).
        </div>
      </div>

      {/* 3.4 Exercício A21 — Phonetik: Diphthong ei */}
      <div id="secao-3-4-ex-a21" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
          Seção 3.4 · Exercício A21
        </div>
        <h4 className="font-bold text-lg text-slate-900">Phonetik: Diphthong ei — p. 14</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-4 font-bold">Palavra</th>
                <th className="py-2.5 px-4 font-mono">Pronúncia IPA</th>
                <th className="py-2.5 px-4">Tradução</th>
                <th className="py-2.5 px-4 text-right">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PHONETIK_A21_ITEMS.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-2 px-4 font-bold text-slate-900">{item.palavra}</td>
                  <td className="py-2 px-4 font-mono text-amber-800">{item.ipa}</td>
                  <td className="py-2 px-4 text-slate-600">{item.traducao}</td>
                  <td className="py-2 px-4 text-right">
                    <AudioButton text={item.palavra} lang="de-DE" size="xs" variant="icon-only" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.5 Exercício A22 — Flugzeuge */}
      <div id="secao-3-5-ex-a22" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Seção 3.5
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Exercício A22 — Aus welchem Land kommt das Flugzeug? — p. 14
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            <strong>Enunciado Original:</strong> <em>Bilden Sie Sätze: Barcelona → Das Flugzeug kommt aus Spanien.</em>
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Cidade</th>
                  <th className="py-3 px-4 font-bold text-indigo-900">País</th>
                  <th className="py-3 px-4">Frase Completa</th>
                  <th className="py-3 px-4 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEXT_A22_PLANES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.cidade}</td>
                    <td className="py-2.5 px-4 font-medium text-indigo-700 bg-indigo-50/20">{row.pais}</td>
                    <td className="py-2.5 px-4 text-slate-800">{row.frase}</td>
                    <td className="py-2.5 px-4 text-right">
                      <AudioButton text={row.frase} lang="de-DE" size="xs" variant="icon-only" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.6 a 3.9 Números, Voos e Telefones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3.7 Voos */}
        <div id="secao-3-7-ex-a24" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Seção 3.7 · Exercício A24
          </div>
          <h4 className="font-bold text-base text-slate-900">Flüge — Números por Extenso (p. 15)</h4>
          <div className="space-y-2 text-xs">
            {TEXT_A24_FLUEGE.map((f, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-900">{f.voo} ({f.origem}):</span>
                  <span className="text-indigo-900 ml-1.5 font-medium">{f.extenso}</span>
                </div>
                <AudioButton text={f.extenso} lang="de-DE" size="xs" variant="icon-only" />
              </div>
            ))}
          </div>
        </div>

        {/* 3.9 Telefones */}
        <div id="secao-3-9-ex-a26" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            Seção 3.9 · Exercício A26
          </div>
          <h4 className="font-bold text-base text-slate-900">Welche Telefonnummer hat ...? (p. 15)</h4>
          <div className="space-y-2 text-xs max-h-80 overflow-y-auto pr-1">
            {TEXT_A26_TELEFON.map((t, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{t.pessoa}:</span>
                  <span className="font-mono text-rose-700 ml-1 font-semibold">{t.numero}</span>
                  <span className="text-slate-500 block text-[11px]">{t.extensoBloco !== '—' ? t.extensoBloco : t.extensoDigito}</span>
                </div>
                <AudioButton text={t.extensoBloco !== '—' ? t.extensoBloco : t.extensoDigito} lang="de-DE" size="xs" variant="icon-only" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3.10 & 3.11 Tradução Reversa de Blindagem & Gabarito Comentado */}
      <div id="secao-3-10-traducao-reversa" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              Seções 3.10 & 3.11
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Tradução Reversa de Blindagem (Português → Alemão) & Gabarito Comentado
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Traduza as 10 sentenças para o alemão aplicando as regras de alternância vocálica (<em>e→i</em>), regência com dativo e possessivos.
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
          {REVERSE_TRANSLATION_ITEMS_02.map((item) => {
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

      {/* 3.12 Resumo dos Pontos-Chave do Dia 002 */}
      <div id="secao-3-12-resumo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
            Seção 3.12
          </div>
          <h3 className="text-xl font-bold text-slate-900">Resumo dos Pontos-Chave do Dia 002</h3>
          <p className="text-sm text-slate-600 mt-1">
            11 conceitos estruturais fundamentais consolidados para a Rodada 02.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-slate-900 w-1/4">Conceito</th>
                  <th className="py-3 px-4 font-bold text-indigo-950">Regra Sintática / Fonética</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {KEY_POINTS_02.map((item, idx) => (
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
                Fim da Aula 02 · Rodada 02
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-2">
                Próxima Etapa: {LESSON_02_METADATA.nextRound}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Avanço para artigos no acusativo, plurais irregulares e diálogos em cafeterias e restaurantes.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-xs font-medium text-slate-200 border border-white/20">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Registros Preservados
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
