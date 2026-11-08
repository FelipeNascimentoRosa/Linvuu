// Telas da primeira abertura do app (só no Android). Ordem: língua materna → quem faz a Linvuu → idioma de estudo → meta diária.
// A língua materna decide o idioma da interface e das explicações; ela pode ser trocada depois em Ajustes.
import { useEffect, useRef, useState } from 'react';
import { LOCALES, lembrarLocale } from '../../i18n';
import type { CodigoLocale } from '../../i18n/locales';
import { AULAS_GRATIS } from '../../config/planos';
import { concluirPrimeiraAbertura, inicioDoIdioma, METAS, primeiraAberturaFeita, type Meta } from './primeiraAberturaModelo';
import './primeira-abertura.css';

const NOMES: Record<CodigoLocale, Record<string, string>> = {
  'pt-BR': { en: 'Inglês', es: 'Espanhol', de: 'Alemão', fr: 'Francês', it: 'Italiano', ru: 'Russo', br: 'Português do Brasil' },
  en: { en: 'English', es: 'Spanish', de: 'German', fr: 'French', it: 'Italian', ru: 'Russian', br: 'Brazilian Portuguese' },
};
const OLA: Record<string, string> = { en: 'Hello', es: 'Hola', de: 'Hallo', fr: 'Bonjour', it: 'Ciao', ru: 'Привет', br: 'Olá' };

const TX = {
  'pt-BR': {
    passo: (n: number, t: number) => `Passo ${n} de ${t}`, voltar: 'Voltar', continuar: 'Continuar', comecar: 'Começar a estudar',
    feitoKicker: 'Quem faz a Linvuu', feitoTitulo: 'Feito por professores de idiomas.',
    feito: [
      ['Livros próprios', 'Cada curso nasce de um livro escrito por professores, com base em referências bibliográficas da área.'],
      ['Explicação no seu idioma', 'A gramática vem em português, com tabelas, exemplos e exercícios com gabarito.'],
      ['Comece sem pagar', `As ${AULAS_GRATIS} primeiras aulas de cada curso são grátis.`],
    ] as [string, string][],
    estudoTitulo: 'O que você quer estudar?', estudoAjuda: 'Você pode estudar outros idiomas depois.',
    metaTitulo: 'Quantas sessões por dia?', metaAjuda: 'Uma meta pequena, todo dia, rende mais que uma maratona por semana. Dá para mudar quando quiser.',
    metas: { 1: ['1 sessão', 'Leve'], 2: ['2 sessões', 'Constante'], 3: ['3 sessões', 'Intensa'] } as Record<Meta, [string, string]>,
  },
  en: {
    passo: (n: number, t: number) => `Step ${n} of ${t}`, voltar: 'Back', continuar: 'Continue', comecar: 'Start learning',
    feitoKicker: 'Who makes Linvuu', feitoTitulo: 'Made by language teachers.',
    feito: [
      ['Our own books', 'Every course comes from a book written by teachers, grounded in the academic literature of the field.'],
      ['Explained in your language', 'Grammar is explained in English, with tables, examples and exercises with answer keys.'],
      ['Start for free', `The first ${AULAS_GRATIS} lessons of every course are free.`],
    ] as [string, string][],
    estudoTitulo: 'What do you want to learn?', estudoAjuda: 'You can add other languages later.',
    metaTitulo: 'How many sessions a day?', metaAjuda: 'A small goal every day goes further than a weekly marathon. You can change it any time.',
    metas: { 1: ['1 session', 'Light'], 2: ['2 sessions', 'Steady'], 3: ['3 sessions', 'Intense'] } as Record<Meta, [string, string]>,
  },
} as const;

const TOTAL = 4;

export function PrimeiraAbertura() {
  const [visivel, setVisivel] = useState(() => !primeiraAberturaFeita());
  const [passo, setPasso] = useState(1);
  const [lingua, setLingua] = useState<CodigoLocale | null>(null);
  const [curso, setCurso] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta>(1);
  const titulo = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titulo.current?.focus(); }, [passo, visivel]);
  useEffect(() => {
    if (!visivel) return;
    const antes = document.body.style.overflow; document.body.style.overflow = 'hidden';
    // O resto do app fica inerte (fora do foco e do leitor de tela) enquanto as telas iniciais estão abertas.
    const fundo = [...document.querySelectorAll<HTMLElement>('#conteudo, .lv-tabbar, .app-header, .skip-link, .analytics-consent')];
    fundo.forEach((e) => { e.inert = true; });
    return () => { document.body.style.overflow = antes; fundo.forEach((e) => { e.inert = false; }); };
  }, [visivel]);
  if (!visivel) return null;

  const c = lingua ?? 'pt-BR';
  const t = TX[c];
  const loc = LOCALES.find((l) => l.codigo === c)!;
  const cursos = loc.ordem.filter((id) => id !== loc.cursoOculto);
  const terminar = () => {
    if (!lingua || !curso) return;
    concluirPrimeiraAbertura({ curso, meta });
    lembrarLocale(lingua);
    setVisivel(false);
    // A interface e as explicações dependem do idioma do endereço: recarrega no início do idioma escolhido.
    window.location.replace(inicioDoIdioma(lingua));
  };
  const pode = passo === 1 ? !!lingua : passo === 3 ? !!curso : true;
  const avancar = () => { if (!pode) return; if (passo < TOTAL) setPasso(passo + 1); else terminar(); };

  return (
    <div className="pa" role="dialog" aria-modal="true" aria-labelledby="pa-titulo" lang={c}>
      <div className="pa-topo">
        {passo > 1 ? <button type="button" className="pa-voltar" onClick={() => setPasso(passo - 1)}><span aria-hidden="true">←</span> {t.voltar}</button> : <span />}
        <p className="pa-passo">{passo === 1 ? 'Linvuu' : t.passo(passo, TOTAL)}</p>
      </div>
      <div className="pa-barra" aria-hidden="true"><span style={{ width: `${(passo / TOTAL) * 100}%` }} /></div>

      <div className="pa-corpo">
        {passo === 1 && <>
          <img className="pa-monograma" src="/brand/linvuu-app-monograma.svg" alt="" width="64" height="64" />
          <h1 id="pa-titulo" ref={titulo} tabIndex={-1}>Qual é a sua língua materna?<span className="pa-sub" lang="en">What is your native language?</span></h1>
          <div className="pa-opcoes" role="radiogroup" aria-labelledby="pa-titulo">
            {([['pt-BR', 'Português', 'Explicações em português · Brasil'], ['en', 'English', 'Explanations in English']] as const).map(([cod, nome, desc]) => (
              <button key={cod} type="button" role="radio" aria-checked={lingua === cod} className="pa-opcao pa-lingua" lang={cod} onClick={() => setLingua(cod)}>
                <span className="pa-sigla" aria-hidden="true">{cod === 'en' ? 'EN' : 'PT'}</span>
                <span><strong>{nome}</strong><small>{desc}</small></span>
                <span className="pa-check" aria-hidden="true" />
              </button>
            ))}
          </div>
        </>}

        {passo === 2 && <>
          <p className="pa-kicker">{t.feitoKicker}</p>
          <h1 id="pa-titulo" ref={titulo} tabIndex={-1}>{t.feitoTitulo}</h1>
          <ol className="pa-feito">
            {t.feito.map(([tt, tx], i) => <li key={tt}><span className="pa-num" aria-hidden="true">{i + 1}</span><span><strong>{tt}</strong><span>{tx}</span></span></li>)}
          </ol>
        </>}

        {passo === 3 && <>
          <h1 id="pa-titulo" ref={titulo} tabIndex={-1}>{t.estudoTitulo}</h1>
          <p className="pa-ajuda">{t.estudoAjuda}</p>
          <div className="pa-grade" role="radiogroup" aria-labelledby="pa-titulo">
            {cursos.map((id) => (
              <button key={id} type="button" role="radio" aria-checked={curso === id} className="pa-opcao pa-curso" onClick={() => setCurso(id)}>
                <span className="pa-ola" lang={id === 'br' ? 'pt-BR' : id}>{OLA[id]}</span>
                <strong>{NOMES[c][id]}</strong>
              </button>
            ))}
          </div>
        </>}

        {passo === 4 && <>
          <h1 id="pa-titulo" ref={titulo} tabIndex={-1}>{t.metaTitulo}</h1>
          <p className="pa-ajuda">{t.metaAjuda}</p>
          <div className="pa-opcoes" role="radiogroup" aria-labelledby="pa-titulo">
            {METAS.map((m) => (
              <button key={m} type="button" role="radio" aria-checked={meta === m} className="pa-opcao pa-meta" onClick={() => setMeta(m)}>
                <span className="pa-pontos" aria-hidden="true">{Array.from({ length: 3 }, (_, i) => <i key={i} className={i < m ? 'on' : ''} />)}</span>
                <span><strong>{t.metas[m][0]}</strong><small>{t.metas[m][1]}</small></span>
                <span className="pa-check" aria-hidden="true" />
              </button>
            ))}
          </div>
        </>}
      </div>

      <div className="pa-rodape">
        <button type="button" className="pa-avancar" onClick={avancar} disabled={!pode}>
          {passo === 1 && !lingua ? 'Continuar · Continue' : passo === TOTAL ? t.comecar : t.continuar}<span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
