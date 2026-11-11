import React from 'react';
import {
  LOGICA_FUNDAMENTAL,
  GUIA_PREPOSICOES,
  LESSON_08_METADATA,
} from '../data/lesson08Data';
import { AudioButton } from './AudioButton';
import {
  Compass,
  MapPin,
  MoveRight,
  ArrowLeftRight,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookmarkCheck,
  Building,
  Home,
  User,
  Waves,
  Maximize2,
} from 'lucide-react';

export const Bloco1Grammar08: React.FC = () => {
  return (
    <section id="bloco-1-gramatica-rodada8" className="space-y-12">
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-slate-950 font-mono">
            Bloco 1 (60 Minutos) · Rodada Extra 08
          </span>
          <span className="text-xs text-indigo-200 font-medium">{LESSON_08_METADATA.day}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Guia Definitivo das Preposições Locais Alemãs
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 font-normal leading-relaxed">
          Domine com rigor cirúrgico a distinção fundamental entre <strong className="text-amber-300">Wo? (Dativo)</strong>,{' '}
          <strong className="text-sky-300">Wohin? (Acusativo)</strong> e <strong className="text-emerald-300">Woher? (Dativo)</strong>.
          Análise detalhada das 16 preposições e contrações fundamentais: <em>in, im, ins, aus, zu, zum, zur, nach, an, am, ans, auf, bei, beim, von, vom</em>.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* PARTE I — A LÓGICA FUNDAMENTAL                                             */}
      {/* ========================================================================= */}
      <div id="secao-1-1-logica-fundamental" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-mono">
              Parte I · O Pilar Central do Alemão
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              A Lógica Fundamental: Wo? (Onde?) vs. Wohin? (Para onde?) vs. Woher? (De onde?)
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Antes de qualquer regra específica, você precisa internalizar a distinção mais importante do idioma alemão. Quase todas as dúvidas de preposições locais nascem da confusão entre <strong>localização estática</strong>, <strong>movimento direcionado</strong> e <strong>origem geográfica</strong>.
        </p>

        {/* Tríade de Cartões de Alto Contraste */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LOGICA_FUNDAMENTAL.map((item) => (
            <div
              key={item.pergunta}
              className={`rounded-xl border p-5 transition-all flex flex-col justify-between ${
                item.pergunta === 'Wo?'
                  ? 'border-amber-200 bg-amber-50/40'
                  : item.pergunta === 'Wohin?'
                  ? 'border-sky-200 bg-sky-50/40'
                  : 'border-emerald-200 bg-emerald-50/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-black tracking-wide font-mono ${
                      item.pergunta === 'Wo?'
                        ? 'bg-amber-500 text-slate-950'
                        : item.pergunta === 'Wohin?'
                        ? 'bg-sky-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {item.pergunta}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                    {item.caso}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">{item.significado}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">{item.explicacao}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/60 bg-white/80 rounded-lg p-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 font-mono">{item.exemploDe}</span>
                  <AudioButton text={item.exemploDe} lang="de-DE" size="sm" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-600">{item.exemploPt}</span>
                  <AudioButton text={item.exemploPt} lang="pt-BR" size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regra de Ouro em Destaque */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <strong className="text-amber-400 block font-semibold">Regra de Ouro Definitiva:</strong>
            <p className="text-slate-300 leading-relaxed">
              Se há <strong>movimento com mudança de lugar</strong>, use <span className="text-sky-300 font-semibold">Acusativo (Wohin?)</span>. 
              Se há <strong>localização estática</strong> ou <strong>permanência</strong>, use <span className="text-amber-300 font-semibold">Dativo (Wo?)</span>. 
              Se há <strong>origem / procedência</strong>, use <span className="text-emerald-300 font-semibold">Dativo (Woher?)</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PARTE II — AS PREPOSIÇÕES UMA A UMA                                        */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-mono">Parte II</span>
          <h3 className="text-2xl font-bold text-slate-900">As Preposições e Contrações uma a uma</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cada preposição dissecada com suas contrações obrigatórias, tabelas por gênero, travas de contraste e múltiplos exemplos com áudio.
          </p>
        </div>

        {GUIA_PREPOSICOES.map((prep) => (
          <div
            key={prep.id}
            id={prep.id}
            className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5"
          >
            {/* Header da Preposição */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 font-mono font-bold flex items-center justify-center text-sm">
                  {prep.numero}
                </span>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">{prep.titulo}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-semibold">
                      {prep.casoRegente}
                    </span>
                    <span className="text-xs text-slate-500">
                      Significado: <strong>{prep.significadoPrincipal}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regra Prática */}
            <div className="bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-lg text-sm text-slate-700 leading-relaxed">
              <strong className="text-indigo-900 block mb-1">Aplicação Prática:</strong>
              {prep.regraPratica}
            </div>

            {/* Tabela de Contrações e Gêneros (se houver) */}
            {prep.tabelaContracoes && prep.tabelaContracoes.length > 0 && (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3">Gênero / Contexto</th>
                      <th className="p-3">Artigo</th>
                      <th className="p-3">Contração / Forma</th>
                      <th className="p-3">Exemplo em Alemão</th>
                      <th className="p-3">Tradução em Português</th>
                      <th className="p-3 text-center">Áudio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {prep.tabelaContracoes.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">{row.genero}</td>
                        <td className="p-3 font-mono text-slate-600">{row.artigoOriginal}</td>
                        <td className="p-3 font-mono font-bold text-indigo-600">{row.contracao}</td>
                        <td className="p-3 font-medium text-slate-900">{row.exemploDe}</td>
                        <td className="p-3 text-slate-600">{row.exemploPt}</td>
                        <td className="p-3 text-center">
                          <AudioButton text={row.exemploDe} lang="de-DE" size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Países com Artigo (se houver) */}
            {prep.paisesExemplos && prep.paisesExemplos.length > 0 && (
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Caso Especial: Países com Artigo Obrigatório
                </h5>
                <div className="overflow-x-auto border border-amber-200 bg-amber-50/30 rounded-lg">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-amber-100/70 border-b border-amber-200 text-slate-800 font-bold">
                        <th className="p-2.5">Tipo de País</th>
                        <th className="p-2.5">Wo? (Dativo)</th>
                        <th className="p-2.5">Wohin? (Acusativo)</th>
                        <th className="p-2.5">Exemplo</th>
                        <th className="p-2.5 text-center">Áudio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-200/60 text-slate-800">
                      {prep.paisesExemplos.map((p, idx) => (
                        <tr key={idx} className="hover:bg-amber-100/40 transition-colors">
                          <td className="p-2.5 font-semibold text-slate-900">{p.tipo}</td>
                          <td className="p-2.5 font-mono font-bold text-amber-900">{p.wo}</td>
                          <td className="p-2.5 font-mono font-bold text-sky-800">{p.wohin}</td>
                          <td className="p-2.5 text-xs text-slate-700">
                            <strong>{p.exemploDe}</strong> ({p.exemploPt})
                          </td>
                          <td className="p-2.5 text-center">
                            <AudioButton text={p.exemploDe} lang="de-DE" size="sm" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dezenas de Frases Exemplares Extras */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                Frases Contextualizadas com Áudio Nativo
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {prep.exemplosExtras.map((ex, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 hover:bg-indigo-50/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900 leading-snug">{ex.de}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <AudioButton text={ex.de} lang="de-DE" size="sm" />
                          <AudioButton text={ex.pt} lang="pt-BR" size="sm" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{ex.pt}</p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-indigo-600 font-mono font-medium">{ex.destaque}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trava de Contraste / Alerta para Brasileiros */}
            {prep.armadilhaBrasileiro && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-rose-950 block mb-0.5">Trava de Contraste — Cuidado:</strong>
                  {prep.armadilhaBrasileiro}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
