import React, { useState } from 'react';
import {
  REVERSE_TRANSLATION_DIA_008,
  KEY_POINTS_DIA_008,
} from '../../data/semana2Lesson08Data';
import { AudioButton } from '../AudioButton';
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

export const Bloco3ExercisesReviewW2L08: React.FC = () => {
  const [openExercise, setOpenExercise] = useState<string | null>('c1');
  const [userInputs, setUserInputs] = useState<{ [key: number]: string }>({});
  const [revealedSolutions, setRevealedSolutions] = useState<{ [key: number]: boolean }>({});

  const toggleExercise = (id: string) => {
    setOpenExercise(openExercise === id ? null : id);
  };

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({ ...prev, [id]: val }));
  };

  const toggleReveal = (id: number) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="bloco3-semana2-aula8" className="space-y-12">
      {/* Banner de Abertura do Bloco 3 */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 008
            </span>
            <span className="px-3 py-1 bg-amber-500/30 text-amber-200 text-xs font-semibold rounded-full border border-amber-400/30">
              Kapitel 3, Teil C e D (p. 74–84)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 3 (60 Minutos) — Resolução Comentada & Tradução Reversa de Blindagem
          </h2>
          <p className="text-amber-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Resoluções detalhadas de todos os exercícios do livro (C1 ao C14), treino intensivo do Imperativo Formal, domínio do Präteritum (war / hatte), substituição de pronomes no acusativo e o laboratório de tradução reversa com 15 sentenças reais.
          </p>
        </div>
      </div>

      {/* 3.1 a 3.14 — Gabarito Comentado dos Exercícios C1 a C14 */}
      <div id="sec-3-1-to-3-14" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              3.1–3.14
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Gabarito Comentado — Exercícios C1 a C14 (p. 74–79)
              </h3>
              <p className="text-xs text-slate-500">
                Resoluções analíticas estruturais de cada um dos exercícios do capítulo
              </p>
            </div>
          </div>
        </div>

        {/* Acordeão de Exercícios */}
        <div className="space-y-3">
          {/* C1 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExercise('c1')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors"
            >
              <span>3.1 Exercício C1 — Wer oder was ist das? (p. 74)</span>
              {openExercise === 'c1' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'c1' && (
              <div className="p-4 space-y-2 text-xs divide-y divide-slate-100 bg-white">
                <div className="py-1"><strong>0.</strong> Kyoto ist eine japanische Stadt. (fem.)</div>
                <div className="py-1"><strong>1.</strong> Niels Bohr ist <em>ein dänischer Physiker</em>. (masc.)</div>
                <div className="py-1"><strong>2.</strong> IBM ist <em>eine amerikanische Computerfirma</em>. (fem.)</div>
                <div className="py-1"><strong>3.</strong> Peugeot ist <em>ein französisches Auto</em>. (neutro)</div>
                <div className="py-1"><strong>4.</strong> Plato ist <em>ein griechischer Philosoph</em>. (masc.)</div>
                <div className="py-1"><strong>5.</strong> Die Davidstatue von Michelangelo ist <em>ein italienisches Kunstwerk</em>. (neutro)</div>
                <div className="py-1"><strong>6.</strong> Die Ermitage ist <em>ein russisches Museum</em>. (neutro)</div>
              </div>
            )}
          </div>

          {/* C2 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExercise('c2')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors"
            >
              <span>3.2 Exercício C2 — Was brauchst du? Negação com kein (p. 74)</span>
              {openExercise === 'c2' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'c2' && (
              <div className="p-4 space-y-2 text-xs divide-y divide-slate-100 bg-white">
                <div className="py-1">Braucht ihr einen Schreibtisch? — Nein, wir brauchen <strong>keinen Schreibtisch</strong>. (masc. acusativo)</div>
                <div className="py-1">Brauchen Sie ein Radio? — Nein, ich brauche <strong>kein Radio</strong>. (neutro acusativo)</div>
                <div className="py-1">Brauchst du eine Lampe? — Nein, ich brauche <strong>keine Lampe</strong>. (fem. acusativo)</div>
                <div className="py-1">Braucht sie einen Stift? — Nein, sie braucht <strong>keinen Stift</strong>. (masc. acusativo)</div>
                <div className="py-1">Braucht er eine Brille? — Nein, er braucht <strong>keine Brille</strong>. (fem. acusativo)</div>
                <div className="py-1">Brauchst du einen Drucker? — Nein, ich brauche <strong>keinen Drucker</strong>. (masc. acusativo)</div>
                <div className="py-1">Braucht er einen Schlüssel? — Nein, er braucht <strong>keinen Schlüssel</strong>. (masc. acusativo)</div>
                <div className="py-1">Braucht ihr ein Regal? — Nein, wir brauchen <strong>kein Regal</strong>. (neutro acusativo)</div>
                <div className="py-1">Brauchst du ein Handy? — Nein, ich brauche <strong>kein Handy</strong>. (neutro acusativo)</div>
              </div>
            )}
          </div>

          {/* C10 Imperativo */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExercise('c10')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors"
            >
              <span>3.10 Exercício C10 — Formulieren Sie Aufforderungen (Imperativ formal) — p. 78</span>
              {openExercise === 'c10' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'c10' && (
              <div className="p-4 space-y-2 text-xs divide-y divide-slate-100 bg-white">
                <div className="py-1">0. <strong>Kochen Sie</strong> die Kartoffeln. (Cozinhe as batatas.)</div>
                <div className="py-1">1. <strong>Waschen Sie</strong> das Obst. (Lave as frutas.)</div>
                <div className="py-1">2. <strong>Schälen Sie</strong> die Orangen. (Descasque as laranjas.)</div>
                <div className="py-1">3. <strong>Kaufen Sie</strong> Bioprodukte. (Compre produtos orgânicos.)</div>
                <div className="py-1">4. <strong>Schneiden Sie</strong> die Tomaten in kleine Stücke. (Corte os tomates em pedaços pequenos.)</div>
                <div className="py-1">5. <strong>Essen Sie</strong> täglich Vollkornbrot. (Coma diariamente pão integral.)</div>
                <div className="py-1">6. <strong>Trinken Sie</strong> viel Milch. (Beba muito leite.)</div>
                <div className="py-1">7. <strong>Würzen Sie</strong> die Suppe mit Salz. (Tempere a sopa com sal.)</div>
                <div className="py-1">8. <strong>Öffnen Sie</strong> das Fenster. (Abra a janela.)</div>
              </div>
            )}
          </div>

          {/* C11 & C12 Präteritum */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExercise('c11')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors"
            >
              <span>3.11 & 3.12 Exercícios C11 e C12 — Präteritum von haben (hatte) und sein (war) — p. 78</span>
              {openExercise === 'c11' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'c11' && (
              <div className="p-4 space-y-2 text-xs divide-y divide-slate-100 bg-white">
                <div className="py-1">Mein Bruder <strong>hatte</strong> früher einen Hund. Unsere Freunde <strong>hatten</strong> früher einen Hund.</div>
                <div className="py-1">Wir <strong>hatten</strong> Glück. Ich <strong>hatte</strong> Glück. Du <strong>hattest</strong> Glück.</div>
                <div className="py-1">Wo <strong>warst</strong> du? <strong>War</strong> Frau Krause da? <strong>Waren</strong> die Studenten da?</div>
                <div className="py-1"><strong>Wart</strong> ihr am Wochenende in Berlin? <strong>Waren</strong> Sie am Wochenende in Berlin?</div>
                <div className="py-1">Ich <strong>hatte</strong> ein sehr ruhiges Zimmer. Marie <strong>hatte</strong> kein Geld.</div>
                <div className="py-1">Johann <strong>war</strong> früher Taxifahrer.</div>
              </div>
            )}
          </div>

          {/* C13 Pronomes no Acusativo */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExercise('c13')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors"
            >
              <span>3.13 Exercício C13 — Substituição por Pronomes Pessoais (ihn, sie, es) — p. 79</span>
              {openExercise === 'c13' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'c13' && (
              <div className="p-4 space-y-2 text-xs divide-y divide-slate-100 bg-white">
                <div className="py-1">Besuchst du Peter heute Abend? → Ja, ich besuche <strong>ihn</strong> heute Abend.</div>
                <div className="py-1">Findest du Beate nett? → Ja, ich finde <strong>sie</strong> nett.</div>
                <div className="py-1">Isst du den Fisch? → Ja, ich esse <strong>ihn</strong>.</div>
                <div className="py-1">Findest du das Konzert interessant? → Ja, ich finde <strong>es</strong> interessant.</div>
                <div className="py-1">Trinkst du den Kaffee noch? → Ja, ich trinke <strong>ihn</strong> noch.</div>
                <div className="py-1">Brauchen Sie die Dokumente noch? → Ja, ich brauche <strong>sie</strong> noch.</div>
                <div className="py-1">Nehmt ihr das Zimmer? → Ja, wir nehmen <strong>es</strong>.</div>
                <div className="py-1">Kennst du Frau Krause? → Ja, ich kenne <strong>sie</strong>.</div>
              </div>
            )}
          </div>

          {/* C14 ich vs mich */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExercise('c14')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors"
            >
              <span>3.14 Exercício C14 — Distinção: ich (sujeito) vs. mich (objeto direto) — p. 79</span>
              {openExercise === 'c14' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openExercise === 'c14' && (
              <div className="p-4 space-y-2 text-xs divide-y divide-slate-100 bg-white">
                <div className="py-1"><strong>Ich</strong> esse gern Gemüse. (sujeito)</div>
                <div className="py-1">Die Ausstellung interessiert <strong>mich</strong> nicht. (objeto direto)</div>
                <div className="py-1">Kommt ihr <strong>mich</strong> besuchen? (objeto direto)</div>
                <div className="py-1">Petra mag <strong>mich</strong>. (objeto direto)</div>
                <div className="py-1">Liebesromane lese <strong>ich</strong> sehr gern. (sujeito invertido)</div>
                <div className="py-1">Findest du <strong>mich</strong> schön? / Hört ihr <strong>mich</strong>? / Liebst du <strong>mich</strong>?</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3.15 & 3.16 — Laboratório de Tradução Reversa de Blindagem (15 Sentenças) */}
      <div id="sec-3-15-to-3-16" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              3.15
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Laboratório de Tradução Reversa de Blindagem (15 Sentenças)
              </h3>
              <p className="text-xs text-slate-500">
                Digite a tradução em alemão de cada frase, compare com o gabarito oficial e revise os pontos sintáticos fixados
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {REVERSE_TRANSLATION_DIA_008.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {item.id}
                  </span>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {item.ptSentence}
                  </span>
                </div>
                <button
                  onClick={() => toggleReveal(item.id)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer shrink-0"
                >
                  {revealedSolutions[item.id] ? 'Ocultar Resposta' : 'Revelar Gabarito'}
                </button>
              </div>

              {/* Campo de Entrada do Aluno */}
              <div>
                <input
                  type="text"
                  placeholder="Digite sua tradução para o alemão..."
                  value={userInputs[item.id] || ''}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Gabarito e Explicação Gramatical Revelados */}
              {revealedSolutions[item.id] && (
                <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-950 text-xs sm:text-sm">
                      {item.deSolution}
                    </span>
                    <AudioButton text={item.deSolution} size="sm" />
                  </div>
                  <div className="pt-2 border-t border-indigo-200/60 flex flex-wrap gap-1.5">
                    {item.points.map((pt, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] bg-white text-indigo-900 px-2 py-0.5 rounded border border-indigo-100 font-medium"
                      >
                        ✓ {pt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3.17 — Resumo dos Pontos-Chave do Dia 008 */}
      <div id="sec-3-17" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              3.17
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tabela Mestre de Síntese — Pontos-Chave do Dia 008
              </h3>
              <p className="text-xs text-slate-500">
                Consolidação dos 10 conceitos estruturais dominados na Aula 08
              </p>
            </div>
          </div>
          <AudioButton
            text="Zusammenfassung: Die fünf Pluralfamilien, Komposita, Akkusativpronomen mich, dich, ihn, sie, es, uns, euch, Sie, die Städte Deutschlands und das Präteritum von haben und sein."
            label="🇩🇪 Síntese do Dia 008 em Áudio"
            size="sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3 font-bold w-1/3">Conceito Gramatical</th>
                <th className="py-2.5 px-3 font-bold w-2/3">Regra Operacional & Exemplo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {KEY_POINTS_DIA_008.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {item.conceito}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {item.regra}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
