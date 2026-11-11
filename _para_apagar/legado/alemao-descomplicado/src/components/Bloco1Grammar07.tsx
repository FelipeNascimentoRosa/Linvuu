import React from 'react';
import {
  MODAL_PARTICLES,
  PARTICLE_COMPARISONS,
  AGREEMENT_WORDS,
  DISAGREEMENT_WORDS,
  DOUBT_WORDS,
  QUANTITY_WORDS,
  TIME_SEQUENCE_WORDS,
  POLITENESS_WORDS,
  REACTION_WORDS,
  GREETING_FAREWELL_WORDS,
  OPINION_WORDS,
  ACTION_COMMANDS,
} from '../data/lesson07Data';
import { AudioButton } from './AudioButton';
import {
  Sparkles,
  MessageSquareQuote,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Scale,
  Clock,
  HeartHandshake,
  Zap,
  DoorOpen,
  Lightbulb,
  SlidersHorizontal,
} from 'lucide-react';

export const Bloco1Grammar07: React.FC = () => {
  return (
    <section id="bloco-1-gramatica-rodada7" className="space-y-12">
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada Extra 7
          </span>
          <span className="text-xs text-amber-200 font-medium">Dia 006.5 · Kapitel 0: Sobrevivência Linguística</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Anatomia Gramatical Pura & Sintaxe Rígida das 150 Expressões Cotidianas
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
          O coração da conversação germânica: Partículas Modais (<em>Modalpartikeln</em>), concordância e discordância, dúvida e probabilidade,
          gradação de intensidade, tempo, cortesia, reações emocionais, opiniões oracionais e imperativos de sobrevivência.
        </p>
      </div>

      {/* 1.1 As Partículas Modais (Modalpartikeln) */}
      <div id="secao-1-1-modalpartikeln" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Seção 1.1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Partículas Modais (<em>Modalpartikeln</em>) — O Coração da Conversa Alemã
            </h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Palavras curtas e invariáveis sem tradução unívoca em português, mas que modulam por completo a entonação, atitude e intenção do interlocutor.
              Sem elas, o alemão soa robótico, rude e ríspido; com elas, torna-se caloroso, educado, espontâneo e humano.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Tabela das 15 Partículas */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              As 15 Partículas Modais Mais Usadas no Cotidiano
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                    <th className="p-3">Partícula</th>
                    <th className="p-3">Função Pragmática</th>
                    <th className="p-3">Exemplo Canônico</th>
                    <th className="p-3">Tradução Aproximada</th>
                    <th className="p-3 text-center">Áudio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 font-mono text-xs">
                  {MODAL_PARTICLES.map((p, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3 font-bold text-amber-900 text-sm">{p.particula}</td>
                      <td className="p-3 text-slate-700 font-sans">{p.funcao}</td>
                      <td className="p-3 text-slate-900 font-bold">{p.exemplo}</td>
                      <td className="p-3 text-slate-600 font-sans italic">{p.traducao}</td>
                      <td className="p-3 text-center font-sans">
                        <AudioButton text={p.exemplo} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exemplos Comparativos: Sem vs. Com Partícula */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              Exemplos Comparativos: Sem Partícula (Seco) vs. Com Partícula (Natural)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                    <th className="p-3 text-rose-800">Sem Partícula (Seco / Rígido)</th>
                    <th className="p-3 text-emerald-800">Com Partícula (Natural / Humano)</th>
                    <th className="p-3">Tradução & Nuance Psicológica</th>
                    <th className="p-3 text-center">Ouvir Par</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-xs">
                  {PARTICLE_COMPARISONS.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-semibold text-rose-950 bg-rose-50/40">
                        {comp.semParticula}
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-950 bg-emerald-50/40">
                        {comp.comParticula}
                      </td>
                      <td className="p-3 text-slate-700">
                        <div className="font-semibold text-slate-900">{comp.traducao}</div>
                        <div className="text-slate-500 text-[11px] italic mt-0.5">{comp.nuance}</div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <AudioButton text={comp.semParticula} size="sm" label="Seco" />
                          <AudioButton text={comp.comParticula} size="sm" label="Natural" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trava de Contraste Cognitivo */}
          <div className="p-4 rounded-xl border border-amber-300/80 bg-amber-50/70 text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              Trava de Contraste Cognitivo (Português vs. Alemão)
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
              Em português, empregamos entonação musical, expressões idiomáticas como <em>"só"</em>, <em>"logo"</em>, <em>"afinal"</em>, <em>"mesmo"</em>, 
              <em>"ué"</em>, <em>"por acaso"</em> ou alongamento de vogais para expressar o que as <strong>Modalpartikeln</strong> executam com precisão cirúrgica em alemão.
              Embora intraduzíveis ao pé da letra, dominá-las é o divisor de águas entre um estrangeiro com fala robótica e um falante que soa nativo e espontâneo.
            </p>
          </div>
        </div>
      </div>

      {/* 1.2 As Palavras de Concordância e Discordância */}
      <div id="secao-1-2-concordancia-discordancia" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Seção 1.2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Concordância (<em>Zustimmung</em>) e Discordância (<em>Ablehnung</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Do acolhimento polido à rejeição veemente: 31 expressões para responder instantaneamente a qualquer afirmação ou convite.
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Concordância */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 border-b border-emerald-200 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Concordância (Zustimmung) — 16 Formas
            </h4>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-1">
              {AGREEMENT_WORDS.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">{item.palavra}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        {item.contexto}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px] font-sans">
                      {item.traducao} &bull; <span className="font-mono text-emerald-900 font-medium">{item.exemplo}</span>
                    </div>
                  </div>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Discordância */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2 border-b border-rose-200 pb-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              Discordância (Ablehnung) — 15 Formas
            </h4>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-1">
              {DISAGREEMENT_WORDS.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">{item.palavra}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        {item.contexto}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px] font-sans">
                      {item.traducao} &bull; <span className="font-mono text-rose-900 font-medium">{item.exemplo}</span>
                    </div>
                  </div>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 As Palavras de Dúvida e Incerteza */}
      <div id="secao-1-3-duvida-incerteza" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-900 shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Dúvida e Incerteza (<em>Zweifel & Unsicherheit</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              17 advérbios e construções para relativizar fatos, conjecturar cenários e expressar falta de certeza com refinamento.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DOUBT_WORDS.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 text-sm">{item.palavra}</span>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
                <div className="text-xs text-indigo-950 font-semibold">{item.traducao}</div>
                <div className="text-xs font-mono text-slate-700 bg-white p-1.5 rounded border border-slate-200/60">
                  {item.exemplo}
                </div>
                <div className="text-[11px] text-slate-500 italic">{item.traducaoExemplo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.4 Palavras de Quantidade e Intensidade */}
      <div id="secao-1-4-quantidade-intensidade" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Seção 1.4
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Quantidade e Intensidade (<em>Menge & Intensität</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              20 termos indispensáveis para calibrar a escala métrica e emocional de adjetivos, verbos e estados.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {QUANTITY_WORDS.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 text-sm">{item.palavra}</span>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
                <div className="text-xs text-amber-900 font-semibold">{item.traducao}</div>
                <div className="text-[11px] font-mono text-slate-700 bg-white p-1 rounded border border-slate-200/60">
                  {item.exemplo}
                </div>
                <div className="text-[10px] text-slate-500 italic">{item.traducaoExemplo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.5 Palavras de Tempo e Sequência */}
      <div id="secao-1-5-tempo-sequencia" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-900 shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Seção 1.5
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Tempo e Sequência (<em>Zeit & Reihenfolge</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              28 advérbios cronológicos essenciais para ancorar orações e gerenciar a ordem sintática rígida (V2 / inversão quando no Vorfeld).
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TIME_SEQUENCE_WORDS.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-blue-950 text-sm">{item.palavra}</span>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
                <div className="text-xs text-blue-800 font-semibold">{item.traducao}</div>
                <div className="text-[11px] font-mono text-slate-700 bg-white p-1 rounded border border-slate-200/60">
                  {item.exemplo}
                </div>
                <div className="text-[10px] text-slate-500 italic">{item.traducaoExemplo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.6 Palavras de Cortesia e Educação */}
      <div id="secao-1-6-cortesia-educacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 shrink-0 mt-0.5">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              Seção 1.6
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Cortesia e Educação (<em>Höflichkeit & Etikette</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              20 fórmulas sociais canônicas para transitar com elegância e diplomacia em qualquer interação na Alemanha, Áustria ou Suíça.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {POLITENESS_WORDS.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-purple-950 text-sm">{item.expressao}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold">
                    {item.contexto}
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-medium">{item.traducao}</div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-xs font-mono text-slate-600 truncate">{item.exemplo}</span>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.7 Palavras de Surpresa e Reação */}
      <div id="secao-1-7-surpresa-reacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 shrink-0 mt-0.5">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              Seção 1.7
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Surpresa e Reação (<em>Überraschung & Reaktion</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              22 exclamações espontâneas que demonstram escuta ativa instantânea e envolvimento empático genuíno.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REACTION_WORDS.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-rose-300 transition-all flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">{item.expressao}</span>
                    <span className="text-[10px] text-slate-500 font-sans">({item.contexto})</span>
                  </div>
                  <div className="text-xs text-rose-900 font-medium">{item.traducao}</div>
                  <div className="text-[11px] font-mono text-slate-600">{item.exemplo}</div>
                </div>
                <AudioButton text={item.exemplo} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.8 Palavras de Despedida e Saudação */}
      <div id="secao-1-8-despedida-saudacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-900 shrink-0 mt-0.5">
            <DoorOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              Seção 1.8
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Despedida e Saudação (<em>Begrüßung & Abschied</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              27 expressões para abrir e fechar contatos, adaptadas a horários, registros formais, informais e particularidades regionais.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GREETING_FAREWELL_WORDS.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-teal-300 transition-all flex items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900 text-sm">{item.expressao}</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-slate-100 text-slate-600">
                      {item.contexto}
                    </span>
                  </div>
                  <div className="text-xs text-teal-900 font-medium">{item.traducao}</div>
                  <div className="text-[11px] font-mono text-slate-500">{item.exemplo}</div>
                </div>
                <AudioButton text={item.exemplo} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.9 Palavras de Opinião e Argumentação */}
      <div id="secao-1-9-opiniao-argumentacao" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-900 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Seção 1.9
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Opinião e Argumentação (<em>Meinung & Argumentation</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              20 estruturas articuladoras para defender posicionamentos, balancear prós e contras e resumir raciocínios.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {OPINION_WORDS.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-950 text-sm">{item.expressao}</span>
                  <AudioButton text={item.exemplo} size="sm" />
                </div>
                <div className="text-xs text-slate-700 font-semibold">{item.traducao}</div>
                <div className="text-xs font-mono text-slate-800 bg-white p-2 rounded border border-slate-200/60">
                  {item.exemplo}
                </div>
                <div className="text-[11px] text-slate-500 italic">{item.traducaoExemplo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1.10 Palavras de Ação e Comando */}
      <div id="secao-1-10-acao-comando" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 bg-slate-50/60 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              Seção 1.10
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              As Palavras de Ação e Comando (<em>Handlung & Imperativ</em>)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              12 pares imperativos essenciais de sobrevivência: Contraste sistemático entre o imperativo informal (<em>du</em>) e o polido formal (<em>Sie</em>).
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ACTION_COMMANDS.map((cmd, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
                  <span className="font-bold text-xs text-slate-800 font-sans">{cmd.traducao}</span>
                  <AudioButton text={cmd.exemplo} size="sm" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-950 font-bold bg-amber-100/70 px-2 py-0.5 rounded">
                    du: {cmd.informal}
                  </span>
                  <span className="text-slate-800 font-bold bg-slate-200/70 px-2 py-0.5 rounded">
                    Sie: {cmd.formal}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-200/60">
                  {cmd.exemplo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
