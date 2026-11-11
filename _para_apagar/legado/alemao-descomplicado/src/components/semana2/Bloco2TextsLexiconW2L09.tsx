import React, { useState } from 'react';
import {
  TEXT_A1_DIALOGUE,
  TEXT_A1_NOTES,
  BREAKFAST_OFFER_DATA,
  TEXT_A5_BUFFET_CONTENT,
  KITCHEN_ITEMS_DATA,
  SUPERMARKET_OFFERS_DATA,
  TOP_OBST_DATA,
  OBSTSALAT_RECIPE_DATA,
  SPEISEKARTE_DATA,
  TEXT_A29_DIALOGUE,
  PRIMARY_LEXICON_W2L09_DATA,
  UMGANGSSPRACHE_W2L09_DATA,
} from '../../data/semana2Lesson09Data';
import { AudioButton } from '../AudioButton';
import {
  Coffee,
  ShoppingBag,
  UtensilsCrossed,
  BookOpen,
  Apple,
  Search,
  MessageSquare,
  Wine,
  Sparkles,
  Info,
  CheckCircle,
} from 'lucide-react';

export const Bloco2TextsLexiconW2L09: React.FC = () => {
  const [searchLexicon, setSearchLexicon] = useState<string>('');
  const [searchColloquial, setSearchColloquial] = useState<string>('');
  const [selectedCategoryOffer, setSelectedCategoryOffer] = useState<string>('all');
  const [activeMenuTab, setActiveMenuTab] = useState<'vorspeisen' | 'fleisch' | 'fisch' | 'nachspeisen' | 'getraenke'>('fleisch');

  const filteredLexicon = PRIMARY_LEXICON_W2L09_DATA.filter((item) => {
    return (
      item.word.toLowerCase().includes(searchLexicon.toLowerCase()) ||
      item.traducao.toLowerCase().includes(searchLexicon.toLowerCase()) ||
      item.fraseModelo.toLowerCase().includes(searchLexicon.toLowerCase())
    );
  });

  const filteredColloquial = UMGANGSSPRACHE_W2L09_DATA.filter((exp) => {
    return (
      exp.exp.toLowerCase().includes(searchColloquial.toLowerCase()) ||
      exp.trad.toLowerCase().includes(searchColloquial.toLowerCase()) ||
      exp.ctx.toLowerCase().includes(searchColloquial.toLowerCase())
    );
  });

  const filteredOffers =
    selectedCategoryOffer === 'all'
      ? BREAKFAST_OFFER_DATA
      : BREAKFAST_OFFER_DATA.filter((item) => item.categoria === selectedCategoryOffer);

  return (
    <section id="bloco2-semana2-aula9" className="space-y-12">
      {/* Banner de Abertura do Bloco 2 */}
      <div className="bg-gradient-to-r from-amber-950 via-orange-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-800/40">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
              Semana 2 · Dia 009
            </span>
            <span className="px-3 py-1 bg-amber-500/30 text-amber-200 text-xs font-semibold rounded-full border border-amber-400/30">
              Kapitel 4, Teil A, A1–A15 (p. 86–97)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bloco 2 (60 Minutos) — Transcrição Integral, Tradução & Mineração Lexical
          </h2>
          <p className="text-amber-100 text-sm sm:text-base max-w-4xl leading-relaxed">
            Imersão nos textos canônicos do café da manhã no hotel (Texto A1), buffet de 70% e Hotel Adlon (Texto A5), folheto de compras do supermercado (Texto A12), receita com imperativo formal (Texto A19), cultura alimentar alemã (Texto A22), fonética do <em>ä</em> e pedidos no restaurante (Textos A26 a A29).
          </p>
        </div>
      </div>

      {/* 2.1 Texto A1 — Beim Frühstück (No Café da Manhã) */}
      <div id="sec-2-1" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-lg">
              2.1
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-orange-600" />
                Texto A1 — Beim Frühstück (No Café da Manhã) — p. 86
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Diálogo autêntico no buffet de hotel entre Norbert, Peter e a garçonete
              </p>
            </div>
          </div>
          <AudioButton
            text={TEXT_A1_DIALOGUE.map((d) => `${d.speaker}: ${d.de}`).join(' ')}
            label="Ouvir Diálogo Completo"
            size="sm"
          />
        </div>

        {/* Transcrição Analítica Justaposta */}
        <div className="space-y-3">
          {TEXT_A1_DIALOGUE.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-1 text-xs sm:text-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-x-2">
                  <span className="font-bold text-orange-900 uppercase tracking-wide text-xs">{item.speaker}:</span>
                  <span className="font-mono font-bold text-slate-900">{item.de}</span>
                </div>
                <AudioButton text={item.de} size="sm" />
              </div>
              <div className="text-slate-600 italic text-xs pl-6">{item.pt}</div>
            </div>
          ))}
        </div>

        {/* Notas Gramaticais Exclusivas do Texto A1 */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 space-y-2 text-xs text-amber-950">
          <div className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-700" />
            Notas Gramaticais e Sintáticas do Texto A1
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside">
            {TEXT_A1_NOTES.map((note, idx) => (
              <li key={idx} className="leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2.2 Texto A2 — Oferta do Café da Manhã (Unser Frühstücksangebot) */}
      <div id="sec-2-2" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
              2.2
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Apple className="w-5 h-5 text-amber-600" />
                Texto A2 — Unser Frühstücksangebot (Oferta Completa de Café da Manhã) — p. 86
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                27 itens alimentares com gênero gramatical definido, formas de plural e classificação
              </p>
            </div>
          </div>
        </div>

        {/* Filtros por Categoria de Alimentos */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'Bebidas', 'Pães', 'Frios e Ovos', 'Frutas', 'Laticínios & Doces'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryOffer(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                selectedCategoryOffer === cat
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todos os Itens (27)' : cat}
            </button>
          ))}
        </div>

        {/* Grade de Alimentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredOffers.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-all space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                    item.artigo.includes('der')
                      ? 'bg-blue-100 text-blue-800'
                      : item.artigo.includes('die')
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {item.artigo}
                </span>
                <AudioButton text={`${item.artigo} ${item.substantivo}, ${item.plural}`} size="sm" />
              </div>
              <div className="font-mono font-bold text-slate-900 text-sm">{item.substantivo}</div>
              <div className="text-emerald-700 font-mono text-[11px] font-semibold">{item.plural}</div>
              <div className="text-slate-500 italic text-[11px]">{item.traducao}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.4 Texto A5 — Das Frühstücksbüfett (O Buffet de Café da Manhã) */}
      <div id="sec-2-4" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              2.4
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Texto A5 — Das Frühstücksbüfett (O Buffet nos Hotéis Alemães) — p. 87
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Dados sociológicos, contraste entre café tradicional e americano, e custos em Berlim (Hotel Adlon)
              </p>
            </div>
          </div>
          <AudioButton text={TEXT_A5_BUFFET_CONTENT.de} label="Ouvir Texto A5" size="sm" />
        </div>

        {/* Estatísticas Chave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TEXT_A5_BUFFET_CONTENT.stats.map((st, idx) => (
            <div key={idx} className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-center space-y-1">
              <div className="text-lg font-extrabold text-indigo-900 font-mono">{st.value}</div>
              <div className="text-[11px] text-indigo-700 font-medium">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Texto Justaposto Alemão / Português */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 leading-relaxed">
            <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] block">
              Original Alemão
            </span>
            <p className="font-mono text-slate-800 whitespace-pre-line">{TEXT_A5_BUFFET_CONTENT.de}</p>
          </div>
          <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200 space-y-2 leading-relaxed">
            <span className="font-bold text-slate-600 uppercase tracking-wider text-[11px] block">
              Tradução Analítica
            </span>
            <p className="text-slate-700 italic whitespace-pre-line">{TEXT_A5_BUFFET_CONTENT.pt}</p>
          </div>
        </div>
      </div>

      {/* 2.7 Louça e Talheres (Texto A10) */}
      <div id="sec-2-7" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
              2.7
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-teal-600" />
                Texto A10 — In der Küche: Geschirr und Besteck (Louça e Talheres) — p. 89
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                19 termos essenciais da copa e cozinha com gênero gramatical e plural
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {KITCHEN_ITEMS_DATA.map((k, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 bg-white hover:border-teal-400 transition-all space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">
                  {k.artigo} {k.item}
                </span>
                <AudioButton text={`${k.artigo} ${k.item}, ${k.plural}`} size="sm" />
              </div>
              <div className="text-teal-700 font-mono text-[11px] font-semibold">{k.plural}</div>
              <div className="text-slate-500 italic text-[11px]">{k.traducao}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.9 Texto A12 — Einkaufen im Supermarkt (Ofertas da Semana) */}
      <div id="sec-2-9" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              2.9
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                Texto A12 — Einkaufen im Supermarkt (Ofertas da Semana) — p. 90
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                25 produtos alimentícios reais com peso, volume, preço em euros e horário comercial
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            <span className="font-bold text-slate-700 block">Öffnungszeiten:</span>
            Mo–Fr: 7.00–22.00 | Sa: 8.00–20.00
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SUPERMARKET_OFFERS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-2xs transition-all flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-mono font-bold text-slate-900 block text-xs sm:text-sm">{item.item}</span>
                <span className="text-slate-500 text-[11px]">{item.quantidade} • {item.categoria}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-extrabold text-emerald-700 text-sm block">{item.preco}</span>
                <AudioButton text={`${item.item}, ${item.preco}`} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.14 & 2.15 Top Frutas e Receita de Obstsalat */}
      <div id="sec-2-14-to-2-15" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Frutas */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Apple className="w-5 h-5 text-rose-600" />
              2.14 Die Top Ten: Das Lieblingsobst der Deutschen
            </h3>
            <span className="text-xs text-slate-500 font-medium">Texto A18</span>
          </div>
          <div className="space-y-2">
            {TOP_OBST_DATA.map((f) => (
              <div
                key={f.rank}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-rose-50/30 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[10px]">
                    {f.rank}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{f.obst}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-rose-700">{f.pct}</span>
                  <AudioButton text={f.obst} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2.15 Receita com Imperativo Formal */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              2.15 Gemischter Obstsalat mit Schuss (Receita & Imperativo)
            </h3>
            <span className="text-xs text-slate-500 font-medium">Texto A19</span>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">Zutaten (Ingredientes):</span>
            <div className="grid grid-cols-2 gap-1 text-slate-600">
              {OBSTSALAT_RECIPE_DATA.zutaten.map((z, idx) => (
                <div key={idx} className="bg-slate-50 p-1.5 rounded border border-slate-100">{z}</div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs pt-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
              Zubereitung (Modo de Preparo — Imperativo Formal):
            </span>
            {OBSTSALAT_RECIPE_DATA.schritte.map((step, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono font-bold text-slate-900">{step.de}</span>
                  <AudioButton text={step.de} size="sm" />
                </div>
                <div className="text-slate-600 italic text-[11px]">{step.pt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.22 Cardápio do Restaurante (Texto A26 — Speisekarte) */}
      <div id="sec-2-22" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg">
              2.22
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-rose-600" />
                Texto A26 — Im Restaurant: Eine Speisekarte (Cardápio Completo) — p. 95
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Vorspeisen, Fleisch- und Fischgerichte (com Salzkartoffeln ou Pommes), Nachspeisen e Getränke
              </p>
            </div>
          </div>
        </div>

        {/* Abas do Cardápio */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
          {[
            { id: 'vorspeisen', label: 'Vorspeisen (Entradas)' },
            { id: 'fleisch', label: 'Fleischgerichte (Carnes)' },
            { id: 'fisch', label: 'Fischgerichte (Peixes)' },
            { id: 'nachspeisen', label: 'Nachspeisen (Sobremesas)' },
            { id: 'getraenke', label: 'Getränke (Bebidas)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMenuTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                activeMenuTab === tab.id
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pratos da Aba Ativa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {(activeMenuTab === 'vorspeisen'
            ? SPEISEKARTE_DATA.vorspeisen
            : activeMenuTab === 'fleisch'
            ? SPEISEKARTE_DATA.fleischgerichte
            : activeMenuTab === 'fisch'
            ? SPEISEKARTE_DATA.fischgerichte
            : activeMenuTab === 'nachspeisen'
            ? SPEISEKARTE_DATA.nachspeisen
            : SPEISEKARTE_DATA.getraenke
          ).map((dish: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-rose-300 transition-all space-y-1.5 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono font-bold text-slate-900 text-sm">{dish.nome}</span>
                <span className="font-mono font-extrabold text-rose-700 shrink-0">{dish.preco}</span>
              </div>
              {dish.desc && <div className="text-slate-500 italic text-[11px]">{dish.desc}</div>}
              <div className="pt-2 flex justify-end">
                <AudioButton text={`${dish.nome}, ${dish.preco}`} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.25 Diálogo Completo no Restaurante (Texto A29) */}
      <div id="sec-2-25" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg">
              2.25
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Wine className="w-5 h-5 text-indigo-600" />
                Texto A29 — Gespräch im Restaurant (Conversa no Restaurante) — p. 97
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Andreas e Beate pedem salmão, relatam viagens à Itália e ao Japão (peixe cru no Präteritum) e fecham a conta
              </p>
            </div>
          </div>
          <AudioButton
            text={TEXT_A29_DIALOGUE.map((d) => `${d.speaker}: ${d.de}`).join(' ')}
            label="Ouvir Conversa Completa"
            size="sm"
          />
        </div>

        <div className="space-y-3">
          {TEXT_A29_DIALOGUE.map((line, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white transition-all space-y-1 text-xs sm:text-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-x-2">
                  <span className="font-bold text-indigo-900 uppercase text-xs">{line.speaker}:</span>
                  <span className="font-mono font-bold text-slate-900">{line.de}</span>
                </div>
                <AudioButton text={line.de} size="sm" />
              </div>
              <div className="text-slate-600 italic text-xs pl-6">{line.pt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.28 Tabela Lexical Primária (30 Termos) */}
      <div id="sec-2-28" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
              2.28
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Tabela Lexical Primária do Dia 009 (30 Termos Nucleares)
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Vocabulário completo de alimentos, bebidas, refeições e utensílios com frase modelo
              </p>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar termo ou tradução..."
              value={searchLexicon}
              onChange={(e) => setSearchLexicon(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Palavra Alemã (com artigo)</th>
                <th className="py-3 px-4">Classe & Plural</th>
                <th className="py-3 px-4">Tradução Exata</th>
                <th className="py-3 px-4">Frase Modelo</th>
                <th className="py-3 px-4 text-right">Áudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLexicon.map((term, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{term.word}</td>
                  <td className="py-2.5 px-4 text-slate-500 text-xs">
                    <span className="block font-semibold text-slate-700">{term.classe}</span>
                    <span className="font-mono text-blue-700 text-[11px]">{term.plural}</span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-700 font-medium">{term.traducao}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-xs">{term.fraseModelo}</td>
                  <td className="py-2.5 px-4 text-right">
                    <AudioButton text={`${term.word}. ${term.fraseModelo}`} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.29 Registro Coloquial e Autêntico (Umgangssprache) */}
      <div id="sec-2-29" className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              2.29
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                Registro Coloquial & Autêntico (Umgangssprache — 18 Expressões)
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Frases de restaurante, brindes, expressão de apetite, saciedade e encerramento da conta
              </p>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar expressão..."
              value={searchColloquial}
              onChange={(e) => setSearchColloquial(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredColloquial.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-1.5 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono font-bold text-slate-900 text-sm">{item.exp}</span>
                <AudioButton text={item.exp} size="sm" />
              </div>
              <div className="text-emerald-800 font-semibold">{item.trad}</div>
              <div className="text-slate-500 text-[11px] leading-relaxed pt-1 border-t border-slate-100">
                {item.ctx}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
