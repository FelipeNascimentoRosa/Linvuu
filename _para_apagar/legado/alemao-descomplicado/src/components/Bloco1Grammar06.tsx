import React from 'react';
import {
  AKKUSATIV_GENDER_RULES,
  AKKUSATIV_COMPLETE_TABLE,
  VERBEN_MIT_AKKUSATIV,
  SATZBAU_AKKUSATIV_ROWS,
  MOECHTE_CONJUGATION,
  MOECHTE_SATZBAU_ROWS,
  KOMPOSITA_EXAMPLES,
  TEMPORAL_PREPOSITIONS,
  LOKAL_PREPOSITIONS,
  CONTRACTIONS_TABLE,
  HABEN_PRAETERITUM,
  SEIN_PRAETERITUM,
} from '../data/lesson06Data';
import { AudioButton } from './AudioButton';
import { CheckCircle, AlertTriangle, BookOpen, Layers, ArrowRight, ShieldCheck, Compass, HelpCircle, Clock, MapPin } from 'lucide-react';

export const Bloco1Grammar06: React.FC = () => {
  return (
    <section id="bloco-1-gramatica-rodada6" className="space-y-12">
      {/* Banner de Abertura */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada 06
          </span>
          <span className="text-xs text-slate-300 font-medium">Dia 006 do Cronograma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomia Gramatical Pura & Sintaxe Rígida
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          Kapitel 3, Teil A (A1–A17, p. 58–65): O Caso Acusativo (<em>Akkusativ</em>) e a grande regra da alteração exclusiva masculina (<em>der/ein/kein/mein → den/einen/keinen/meinen</em>),
          verbos transitivos diretos, o verbo modal de cortesia <em>möchte(n)</em> vs. <em>wollen</em>, a lei do último elemento nas <em>Komposita</em>,
          preposições temporais/locais, contrações obrigatórias e a conjugação de <em>haben</em> e <em>sein</em> no <em>Präteritum</em>.
        </p>
      </div>

      {/* 1.1 O Caso Acusativo (Akkusativ) — Introdução Profunda */}
      <div id="secao-1-1-acusativo-introducao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Caso Acusativo (<em>Akkusativ</em>) — Introdução Profunda
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O alemão possui quatro casos: <em>Nominativ</em>, <em>Genitiv</em>, <em>Dativ</em> e <em>Akkusativ</em>. O Acusativo é o caso do objeto direto — aquele que responde à pergunta <strong>Wen?</strong> (quem?) ou <strong>Was?</strong> (o quê?).
            </p>
          </div>
          <AudioButton
            text="Ich sehe den Mann. Ich sehe die Frau. Ich sehe das Kind. Ich habe einen Fernseher."
            label="Áudio Acusativo Exemplar"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Card: A Grande Regra do Acusativo */}
          <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base mb-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              A Grande Regra de Ouro do Acusativo
            </div>
            <p className="text-sm text-indigo-950 leading-relaxed">
              <strong>Apenas o artigo masculino muda no Acusativo.</strong> Todos os outros gêneros (Feminino, Neutro e Plural) permanecem rigorosamente idênticos à forma do Nominativo. A marca distintiva do masculino acusativo é a desinência <code className="bg-indigo-200/80 text-indigo-950 px-1.5 py-0.5 rounded font-mono font-bold">-en</code> (<em>den</em>, <em>einen</em>, <em>keinen</em>, <em>meinen</em>).
            </p>
          </div>

          {/* Tabela Comparativa de Gêneros */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Matriz Comparativa: Nominativo vs. Acusativo
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Gênero / Categoria</th>
                    <th className="p-3.5">Nominativo (Sujeito)</th>
                    <th className="p-3.5">Acusativo (Objeto Direto)</th>
                    <th className="p-3.5">Mudança Efetiva</th>
                    <th className="p-3.5">Detalhe Técnico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {AKKUSATIV_GENDER_RULES.map((item, idx) => (
                    <tr key={idx} className={item.mudanca !== 'sem mudança' ? 'bg-amber-50/40 font-medium' : 'hover:bg-slate-50/50'}>
                      <td className="p-3.5 text-slate-700 font-mono text-xs">{item.genero}</td>
                      <td className="p-3.5 text-slate-800">{item.nominativo}</td>
                      <td className="p-3.5 text-indigo-950 font-bold flex items-center justify-between gap-2">
                        <span>{item.acusativo}</span>
                        <AudioButton text={item.acusativo} size="sm" />
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                          item.mudanca !== 'sem mudança' ? 'bg-amber-200 text-amber-950' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {item.mudanca}
                        </span>
                      </td>
                      <td className="p-3.5 text-xs text-slate-600">{item.detalhe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabela Completa do Acusativo com Artigos e Possessivos */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Tabela Completa de Declinabilidade no Acusativo
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Classe do Determinante</th>
                    <th className="p-3.5 text-amber-700">Masculino (den/einen)</th>
                    <th className="p-3.5 text-rose-700">Feminino (die/eine)</th>
                    <th className="p-3.5 text-blue-700">Neutro (das/ein)</th>
                    <th className="p-3.5 text-emerald-700">Plural (die/keine)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {AKKUSATIV_COMPLETE_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-semibold text-slate-700 text-xs">{row.tipo}</td>
                      <td className="p-3.5 font-mono font-bold text-amber-800 bg-amber-50/20">{row.masc}</td>
                      <td className="p-3.5 font-mono text-rose-800">{row.fem}</td>
                      <td className="p-3.5 font-mono text-blue-800">{row.neutro}</td>
                      <td className="p-3.5 font-mono text-emerald-800">{row.plural}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trava de Contraste */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs sm:text-sm text-amber-950 space-y-2">
            <div className="font-bold flex items-center gap-2 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Trava de Contraste Sintático: Português vs. Alemão
            </div>
            <p className="leading-relaxed">
              Em português, o objeto direto não altera a forma do artigo: dizemos <em>"Eu vejo o homem"</em> e <em>"Eu vejo a mulher"</em> sem qualquer flexão do artigo definido além do gênero. Em alemão, o masculino sofre alteração morfológica imediata: <strong>Ich sehe den Mann</strong> (masculino acusativo com <em>den</em>), mas <strong>Ich sehe die Frau</strong> (feminino sem mudança) e <strong>Ich sehe das Kind</strong> (neutro sem mudança).
            </p>
          </div>
        </div>
      </div>

      {/* 1.2 Verben mit Akkusativ (Verbos que Regem Acusativo) */}
      <div id="secao-1-2-verbos-acusativo" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Verben mit Akkusativ (Verbos que Regem Acusativo)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Os verbos que regem Acusativo são verbos transitivos diretos. Eles exigem que seu complemento nominal responda por <em>Wen?</em> (para seres vivos) ou <em>Was?</em> (para coisas e conceitos).
            </p>
          </div>
          <AudioButton
            text="Ich brauche einen Schreibtisch. Ich habe einen Fernseher. Ich möchte einen Kaffee."
            label="Áudio Exemplos Acusativo"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Grade com os 17 Verbos com Acusativo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {VERBEN_MIT_AKKUSATIV.map((v, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 font-mono text-base">{v.verbo}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">{v.traducao}</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">{v.exemplo}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>{v.exTraducao}</span>
                  <AudioButton text={v.exemplo} size="sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Topologia da Frase (Satzbau com Acusativo) */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              Satzbau com Verben im Akkusativ (Arquitetura Sintática)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 text-indigo-900">Posição I (Vorfeld)</th>
                    <th className="p-3.5 text-amber-900">Posição II (Verbo Finito)</th>
                    <th className="p-3.5 text-slate-500">Posição III (Sujeito)</th>
                    <th className="p-3.5 text-emerald-900">Mittelfeld (Objeto no Acusativo)</th>
                    <th className="p-3.5 text-rose-900">Satzende</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs sm:text-sm">
                  {SATZBAU_AKKUSATIV_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-bold text-indigo-900 bg-indigo-50/20">{row.vorfeld}</td>
                      <td className="p-3.5 font-bold text-amber-900 bg-amber-50/30">{row.verb}</td>
                      <td className="p-3.5 text-slate-400">{row.subjekt}</td>
                      <td className="p-3.5 font-bold text-emerald-900 bg-emerald-50/20">{row.mittelfeld}</td>
                      <td className="p-3.5 text-slate-400">{row.satzende}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 O Modalverb möchte(n) (gostaria de) */}
      <div id="secao-1-3-modalverb-moechten" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              O Modalverb <em>möchte(n)</em> (gostaria de) — Cortesia e Desejo Polido
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O verbo <em>möchte</em> é formalmente a forma de Konjunktiv II do verbo <em>mögen</em>, mas funciona funcionalmente no A1 como um modalverb autônomo para expressar desejo educado (<em>Höflichkeitsform</em>).
            </p>
          </div>
          <AudioButton
            text="Ich möchte ein Einzelzimmer buchen. Er möchte einen Kaffee trinken."
            label="Áudio möchten"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Conjugação Completa */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
              Conjugação Completa de <em>möchte(n)</em>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Pessoa</th>
                    <th className="p-3.5">Pronome</th>
                    <th className="p-3.5">Forma Verbal</th>
                    <th className="p-3.5">Particularidade Morfossintática</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOECHTE_CONJUGATION.map((item, idx) => (
                    <tr key={idx} className={item.pessoa.includes('1. Sg.') || item.pessoa.includes('3. Sg.') ? 'bg-amber-50/40 font-medium' : 'hover:bg-slate-50/50'}>
                      <td className="p-3.5 font-mono text-xs text-slate-600">{item.pessoa}</td>
                      <td className="p-3.5 font-bold text-slate-800">{item.pronome}</td>
                      <td className="p-3.5 font-mono font-bold text-indigo-900 text-base flex items-center justify-between gap-2">
                        <span>{item.forma}</span>
                        <AudioButton text={`${item.pronome} ${item.forma}`} size="sm" />
                      </td>
                      <td className="p-3.5 text-xs text-slate-600">{item.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-xs text-slate-600 italic">
              * Nota vital: Como todos os verbos modais alemães, a <strong>1ª e a 3ª pessoa do singular são absolutamente idênticas</strong> (<em>ich möchte, er möchte</em>). Nunca acrescente a terminação <em>-t</em> na 3ª pessoa do singular.
            </div>
          </div>

          {/* Satzbau com möchte */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              Satzbau com <em>möchte(n)</em> (Substantivo Direto vs. Verbo no Infinitivo)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm font-mono text-xs sm:text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 text-indigo-900">Posição I (Vorfeld)</th>
                    <th className="p-3.5 text-amber-900">Posição II (Modalverb)</th>
                    <th className="p-3.5 text-emerald-900">Mittelfeld (Acusativo / Objeto)</th>
                    <th className="p-3.5 text-rose-900">Satzende (Infinitiv)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOECHTE_SATZBAU_ROWS.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-bold text-indigo-900 bg-indigo-50/20">{r.vorfeld}</td>
                      <td className="p-3.5 font-bold text-amber-900 bg-amber-50/30">{r.modalverb}</td>
                      <td className="p-3.5 font-bold text-emerald-900 bg-emerald-50/20">{r.mittelfeld}</td>
                      <td className="p-3.5 font-bold text-rose-900 bg-rose-50/20">{r.satzende}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contraste möchte vs wollen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <div className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <em>möchte</em> — Desejo Polido e Educado (Padrão Social)
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Usado em balcões de atendimento, hotéis, restaurantes e pedidos profissionais: <em>"Ich möchte ein Zimmer"</em> (Eu gostaria de um quarto). Soa cortês e refinado.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
              <div className="font-bold text-rose-950 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <em>wollen</em> — Vontade Rígida, Direta e Impositiva
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                Em alemão, <em>"Ich will ein Zimmer"</em> soa autoritário e descortês com funcionários de hotel ou garçons. Reserve <em>wollen</em> para decisões de vida ou planos inabaláveis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1.4 As Komposita (Palavras Compostas) */}
      <div id="secao-1-4-palavras-compostas" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.4
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As <em>Komposita</em> (Palavras Compostas) — A Lei do Último Elemento
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              O alemão forma palavras compostas juntando substantivos, verbos e adjetivos. O último elemento determina soberanamente o gênero gramatical e a forma de plural de todo o composto.
            </p>
          </div>
          <AudioButton
            text="das Hotelzimmer, der Hotelschlüssel, der Hotelzimmerschlüssel, die Zimmernummer"
            label="Áudio Komposita"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Palavra Composta</th>
                  <th className="p-3.5">Desconstrução Morfológica</th>
                  <th className="p-3.5">Gênero Soberano (Último Elemento)</th>
                  <th className="p-3.5">Tradução Exata</th>
                  <th className="p-3.5 text-right">Áudio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {KOMPOSITA_EXAMPLES.map((k, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold font-mono text-slate-900">{k.composto}</td>
                    <td className="p-3.5 text-slate-600 font-mono text-xs">{k.elementos}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        k.genero.startsWith('der') ? 'bg-amber-100 text-amber-900' :
                        k.genero.startsWith('die') ? 'bg-rose-100 text-rose-900' : 'bg-blue-100 text-blue-900'
                      }`}>
                        {k.genero}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-700">{k.traducao}</td>
                    <td className="p-3.5 text-right">
                      <AudioButton text={k.composto} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1.5 As Preposições Temporais e Locais — Introdução e Contrações */}
      <div id="secao-1-5-preposicoes-contrações" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Preposições Temporais, Locais (Dativo) & Contrações Obrigatórias
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Regência milimétrica para expressar tempo e localização estática, além do mecanismo obrigatório de fusão preposicional.
            </p>
          </div>
          <AudioButton
            text="um 15 Uhr, am Montag, im Januar, im Zentrum, am Stadtrand, beim Arzt, vom Bahnhof, zum Hotel"
            label="Áudio Preposições"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Preposições Temporais */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Preposições Temporais (<em>Temporal</em>)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TEMPORAL_PREPOSITIONS.map((t, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-950 font-mono text-base">{t.prep}</span>
                    <AudioButton text={t.exemplo} size="sm" />
                  </div>
                  <p className="text-xs text-slate-600">{t.uso}</p>
                  <p className="text-xs font-bold text-slate-900 pt-1 border-t border-slate-200/60">{t.exemplo}</p>
                  <p className="text-xs text-slate-500 italic">{t.traducao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preposições Locais (Onde? -> Dativo) */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Preposições Locais (<em>Lokal</em> — Onde? <em>Wo?</em> + Dativo Estático)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Preposição</th>
                    <th className="p-3.5">Relação Espacial</th>
                    <th className="p-3.5">Exemplo Canônico</th>
                    <th className="p-3.5">Tradução</th>
                    <th className="p-3.5 text-right">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {LOKAL_PREPOSITIONS.map((l, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-bold font-mono text-indigo-950">{l.prep}</td>
                      <td className="p-3.5 text-slate-600">{l.uso}</td>
                      <td className="p-3.5 font-medium text-slate-900 font-mono">{l.exemplo}</td>
                      <td className="p-3.5 text-slate-600">{l.traducao}</td>
                      <td className="p-3.5 text-right">
                        <AudioButton text={l.exemplo} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contrações Obrigatórias */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Contrações Preposicionais Obrigatórias
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CONTRACTIONS_TABLE.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-indigo-50/30 space-y-1">
                  <div className="text-xs text-slate-500 font-mono">{c.fusao}</div>
                  <div className="text-lg font-bold text-indigo-950 font-mono">{c.contracao}</div>
                  <div className="text-xs text-slate-700 font-medium">{c.exemplo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1.6 a 1.10 haben, brauchen, möchten, sein & Präteritum */}
      <div id="secao-1-10-praeteritum-verbos" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seções 1.6 – 1.10
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Verbos Nucleares no Acusativo & O <em>Präteritum</em> de <em>haben</em> e <em>sein</em>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Enquanto a maioria dos verbos alemães utiliza o <em>Perfekt</em> na língua falada, <em>haben</em> e <em>sein</em> utilizam preferencialmente as formas simples do <em>Präteritum</em> (<em>hatte</em> e <em>war</em>).
            </p>
          </div>
          <AudioButton
            text="Ich hatte ein Problem. Ich war in München. Er hatte keine Zeit. Wir waren im Hotel."
            label="Áudio Präteritum"
          />
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tabela Präteritum haben */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>O Verbo <em>haben</em> (Präsens vs. Präteritum)</span>
                <span className="text-xs text-indigo-600 font-mono">hatte</span>
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm font-mono">
                  <thead className="bg-slate-100/80 text-slate-700 text-xs uppercase">
                    <tr>
                      <th className="p-2.5">Pessoa</th>
                      <th className="p-2.5">Präsens</th>
                      <th className="p-2.5 text-indigo-900 font-bold">Präteritum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {HABEN_PRAETERITUM.map((h, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2.5 text-slate-600">{h.pronome}</td>
                        <td className="p-2.5 text-slate-800">{h.presente}</td>
                        <td className="p-2.5 font-bold text-indigo-950 bg-indigo-50/30">{h.praeteritum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabela Präteritum sein */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>O Verbo <em>sein</em> (Präsens vs. Präteritum)</span>
                <span className="text-xs text-indigo-600 font-mono">war</span>
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm font-mono">
                  <thead className="bg-slate-100/80 text-slate-700 text-xs uppercase">
                    <tr>
                      <th className="p-2.5">Pessoa</th>
                      <th className="p-2.5">Präsens</th>
                      <th className="p-2.5 text-indigo-900 font-bold">Präteritum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {SEIN_PRAETERITUM.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2.5 text-slate-600">{s.pronome}</td>
                        <td className="p-2.5 text-slate-800">{s.presente}</td>
                        <td className="p-2.5 font-bold text-indigo-950 bg-indigo-50/30">{s.praeteritum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
