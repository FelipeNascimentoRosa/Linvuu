// Título, descrição e endereço de cada rota, para o servidor entregar o HTML já com as metatags certas
// (o WhatsApp, o Facebook e outros robôs não executam JavaScript; sem isto, todo link mostraria o texto da página inicial).
// Vale para os três idiomas do site: / (português), /en e /es.
import { COMECAR } from './comecar.ts';
import { HOME_BR } from '../config/oferta-publica.ts';
import fs from 'node:fs';
import path from 'node:path';
import { SESSOES_GRATIS, SESSOES_POR_AULA, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX, PRECO_ANUAL, CENTAVOS, precoSchema } from '../config/planos.ts';
import { LOCALES, Locale, caminhoEm, localeDoCaminho, semPrefixo } from '../i18n/locales.ts';
import { EMAIL_OFICIAL } from '../config/site.ts';
import { CONTATO, EX_ALUNOS, POR_QUE } from './institucional.ts';
import { EXCLUSAO } from './exclusaoConta.ts';
import { contatos } from '../config/contato.ts';
import { AUTORES, CAPITULOS_GRATIS, LIVROS_DESCRICAO, LIVROS_EM_PRODUCAO, LIVROS_META, capituloParaHtml, livroMeta, minutosDeLeitura, tituloLivro, type CapituloLivro, type ItemSumario } from './livros.ts';
import { APRESENTACOES_CURSO, APRESENTACOES_LIVRO } from './apresentacoes.ts';
import { AULAS_RUSSO } from '../config/aulas-russo';

type CursoMeta = { id: string; nome: string; descricao: string; status?: string; i18n?: Record<string, { nome: string; descricao: string }> };
export type DadosMeta = {
  raiz?: string;
  livros: Record<string, { sumario: ItemSumario[]; caps: Record<number, CapituloLivro> }>;
  cursos: CursoMeta[];
  indice: Record<string, { total: number; grupos?: { aula: number; titulo: string; dias: [number, number] }[]; fonte?: string; tr?: Record<string, { g: Record<string, string>; aulas?: number[] }> }>;
};
export type MetaRota = { status: number; titulo?: string; descricao?: string; caminho: string; semIndice?: boolean; jsonld?: object[]; locale?: Locale; /** idiomas em que a página existe (hreflang); padrão: os três */ em?: Locale['codigo'][] };

/**
 * Regra única de indexação de cursos (usada pelo servidor, por scripts/seo.mjs e pelos testes):
 * um curso só é página própria num idioma quando TODAS as aulas estão explicadas nesse idioma.
 * Curso parcialmente traduzido continua acessível, com aviso, mas sem entrar na busca nem no hreflang.
 */
export function explicacaoCompleta(d: DadosMeta, id: string, explicacao: string): boolean {
  const ind = d.indice[id];
  if (!ind) return false;
  if ((ind.fonte ?? 'pt') === explicacao) return true;
  const feitas = new Set(ind.tr?.[explicacao]?.aulas ?? []);
  const grupos = ind.grupos ?? [];
  return grupos.length > 0 && grupos.every((g) => feitas.has(g.aula));
}
/** A gramática existe num idioma quando é o idioma-fonte do curso ou quando há o arquivo traduzido. */
export function gramaticaExisteEm(d: DadosMeta, id: string, explicacao: string): boolean {
  if ((d.indice[id]?.fonte ?? 'pt') === explicacao) return true;
  return !!d.raiz && /^[a-z]{2}$/.test(id) && fs.existsSync(path.join(d.raiz, 'content', 'gramatica', `${id}.${explicacao}.json`));
}

export function carregarDadosMeta(raiz: string): DadosMeta | null {
  try {
    const cursos = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'cursos.json'), 'utf8')).cursos;
    const indice = JSON.parse(fs.readFileSync(path.join(raiz, 'content', 'indice.json'), 'utf8')).cursos;
    // títulos traduzidos (content/indice.en.json, indice.es.json) entram no índice de cada curso
    for (const l of ['en', 'es']) {
      const f = path.join(raiz, 'content', `indice.${l}.json`);
      if (!fs.existsSync(f)) continue;
      for (const [id, t] of Object.entries(JSON.parse(fs.readFileSync(f, 'utf8')) as Record<string, { g: Record<string, string>; aulas?: number[] }>)) if (indice[id]) (indice[id].tr ??= {})[l] = t;
    }
    return { raiz, cursos, indice, livros: carregarLivros(raiz) };
  } catch {
    return null;
  }
}

/** Sumário e capítulos de amostra de cada livro (content/livros/<idioma>/). */
function carregarLivros(raiz: string): DadosMeta['livros'] {
  const out: DadosMeta['livros'] = {};
  for (const m of LIVROS_META) {
    const dir = path.join(raiz, 'content', 'livros', m.id);
    if (!fs.existsSync(dir)) continue;
    const caps: Record<number, CapituloLivro> = {};
    for (const f of fs.readdirSync(dir)) {
      const n = f.match(/^cap-(\d+)\.json$/)?.[1];
      if (n && CAPITULOS_GRATIS.some((c) => c === Number(n))) caps[Number(n)] = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    }
    const fs0 = path.join(dir, 'sumario.json');
    out[m.id] = { sumario: fs.existsSync(fs0) ? JSON.parse(fs.readFileSync(fs0, 'utf8')) : [], caps };
  }
  return out;
}

const TX = {
  'pt-BR': {
    cursos: 'Cursos', entrar: 'Entrar', cadastro: 'Cadastre-se', assinatura: 'Assinatura', priv: 'Política de privacidade', privD: 'Quais dados a Linvuu coleta, para quê e quais são os seus direitos pela LGPD.', termos: 'Termos de uso', termosD: 'Regras de uso do site e dos cursos da Linvuu.',
    pt: 'Português para estrangeiros · Brazilian Portuguese', ptNav: 'Português para estrangeiros', ptD: 'Curso de português do Brasil para estrangeiros, do A1 ao B1, com aulas explicadas em inglês ou espanhol. 62 aulas.',
    ementa: (n: number) => `As ${n} aulas do curso`, ant: (n: number) => `← Sessão ${n}`, seg: (n: number) => `Sessão ${n} →`,
    curso: (n: string) => `Curso de ${n.toLowerCase()} online, explicado em português`, cursoPrep: (n: string) => `${n}: curso para quem fala português`, cursoJ: (n: string) => `${n} para quem fala português`, inicio: 'Início',
    aula: (a: number, t: string, n: string) => `Aula ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number, lingua: string) => `${n}, aula ${a} (${t}), sessão ${s} de ${tot}: explicação em ${lingua}, áudio em cada frase e exercícios com correção.`,
    sessao: (s: number, n: string) => `Sessão ${s} · ${n}`, gram: 'Gramática', gramC: (n: string) => `Gramática: ${n.toLowerCase()}`, gramD: (n: string, lingua: string) => `Gramática de ${n.toLowerCase()} explicada em ${lingua}, tópico por tópico, com tabelas, exemplos e erros comuns.`, nao: 'Página não encontrada',
  },
  en: {
    cursos: 'Courses', entrar: 'Sign in', cadastro: 'Sign up', assinatura: 'Subscription', priv: 'Privacy policy', privD: 'What data Linvuu collects, why, and what your rights are.', termos: 'Terms of use', termosD: 'Rules for using the Linvuu site and courses.',
    pt: 'Brazilian Portuguese for English speakers, A1 to B1', ptNav: 'Brazilian Portuguese', ptD: 'Learn Brazilian Portuguese from zero to B1 in 62 lessons explained in English, with audio, dialogues, grammar and exercises.',
    ementa: (n: number) => `All ${n} lessons in the course`, ant: (n: number) => `← Session ${n}`, seg: (n: number) => `Session ${n} →`,
    curso: (n: string) => `Learn ${n} online, explained in English`, cursoPrep: (n: string) => `${n} course: English edition in preparation`, cursoJ: (n: string) => `${n} for English speakers`, inicio: 'Home',
    aula: (a: number, t: string, n: string) => `Lesson ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number, lingua: string) => `${n}, lesson ${a} (${t}), session ${s} of ${tot}: explained in ${lingua}, with audio for every sentence and exercises.`,
    sessao: (s: number, n: string) => `Session ${s} · ${n}`, gram: 'Grammar', gramC: (n: string) => `${n} grammar for English speakers`, gramD: (n: string, lingua: string) => `${n} grammar explained in ${lingua}, topic by topic, with tables, examples and common mistakes. Free topics included.`, nao: 'Page not found',
  },
  es: {
    cursos: 'Cursos', entrar: 'Entrar', cadastro: 'Regístrate', assinatura: 'Suscripción', priv: 'Política de privacidad', privD: 'Qué datos recoge Linvuu, para qué y cuáles son tus derechos.', termos: 'Términos de uso', termosD: 'Reglas de uso del sitio y de los cursos de Linvuu.',
    pt: 'Portugués de Brasil para hispanohablantes, de A1 a B1', ptNav: 'Portugués de Brasil', ptD: 'Portugués de Brasil de cero a B1 en 62 lecciones: las 2 primeras y la gramática, en español; el resto, explicado en inglés. Audio y ejercicios.',
    ementa: (n: number) => `Las ${n} lecciones del curso`, ant: (n: number) => `← Sesión ${n}`, seg: (n: number) => `Sesión ${n} →`,
    curso: (n: string) => `${n} para hispanohablantes, de cero a B1`, cursoPrep: (n: string) => `${n}: edición en español en preparación`, cursoJ: (n: string) => `${n} para hispanohablantes`, inicio: 'Inicio',
    aula: (a: number, t: string, n: string) => `Lección ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number, lingua: string) => `${n}, lección ${a} (${t}), sesión ${s} de ${tot}: explicado en ${lingua}, con audio en cada frase y ejercicios.`,
    sessao: (s: number, n: string) => `Sesión ${s} · ${n}`, gram: 'Gramática', gramC: (n: string) => `Gramática: ${n.toLowerCase()}`, gramD: (n: string, lingua: string) => `Gramática de ${n.toLowerCase()} explicada en ${lingua}, tema por tema, con tablas, ejemplos y errores frecuentes.`, nao: 'Página no encontrada',
  },
} as const;
/** Nome de cada língua de explicação, escrito na língua da página (para as descrições dizerem a língua real de cada aula/gramática). */
const LINGUAS: Record<string, Record<string, string>> = {
  'pt-BR': { pt: 'português', en: 'inglês', es: 'espanhol' },
  en: { pt: 'Portuguese', en: 'English', es: 'Spanish' },
  es: { pt: 'portugués', en: 'inglés', es: 'español' },
};
const HOME = {
  'pt-BR': { titulo: HOME_BR.tituloSeo, descricao: HOME_BR.descricao },
  en: { titulo: 'Language courses for English speakers', descricao: 'Courses for English speakers: Brazilian Portuguese, French and Russian explained in English; German, Spanish and Italian in translation. Try 2 free lessons.' },
  es: { titulo: 'Cursos de idiomas para hispanohablantes', descricao: 'Cursos para hispanohablantes: portugués de Brasil con 2 lecciones y gramática en español; los demás, en portugués (en traducción). 2 clases gratis.' },
};

export function metaDaRota(pathname: string, d: DadosMeta | null): MetaRota {
  const loc = localeDoCaminho(pathname);
  const r = metaSemLocale(semPrefixo(pathname.replace(/\/+$/, '') || '/'), d, loc);
  return { ...r, caminho: caminhoEm(loc.codigo, r.caminho), locale: loc };
}

function metaSemLocale(p: string, d: DadosMeta | null, loc: Locale): MetaRota {
  const tx = TX[loc.codigo];
  const ex = loc.explicacao;
  if (p === '/') return { status: 200, caminho: '/', ...HOME[loc.codigo], jsonld: [organizacao(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Linvuu', url: SITE, inLanguage: loc.codigo }] };
  // Livros e página Sobre: só em português (nos outros idiomas a página existe, mas não entra na busca)
  const livroBase = { em: ['pt-BR'] as Locale['codigo'][], semIndice: loc.codigo !== 'pt-BR' ? true : undefined };
  if (p === '/sobre') return { status: 200, caminho: p, titulo: 'Quem escreve a Linvuu', descricao: 'A Linvuu é feita por Felipe Nascimento Rosa e Luiza Nascimento Rosa, matemáticos com experiência em linguística e ensino de idiomas. Autoria, origem e método.', ...livroBase, jsonld: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Quem escreve a Linvuu', url: `${SITE}/sobre`, inLanguage: 'pt-BR', mainEntity: { '@id': ORG_ID } }, organizacao(), ...AUTORES.map(pessoa)] };
  if (p === '/por-que-linvuu') return { status: 200, caminho: p, titulo: POR_QUE.titulo, descricao: POR_QUE.descricao, ...livroBase, jsonld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: POR_QUE.titulo, url: `${SITE}/por-que-linvuu`, inLanguage: 'pt-BR', about: { '@id': ORG_ID } }, organizacao()] };
  if (p === '/contato') return { status: 200, caminho: p, titulo: CONTATO.titulo, descricao: CONTATO.descricao, ...livroBase, jsonld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: CONTATO.titulo, url: `${SITE}/contato`, inLanguage: 'pt-BR', about: { '@id': ORG_ID } }, organizacao()] };
  if (p === '/ex-alunos-udemy') return { status: 200, caminho: p, titulo: EX_ALUNOS.titulo, descricao: EX_ALUNOS.descricao, ...livroBase, jsonld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: EX_ALUNOS.titulo, url: `${SITE}/ex-alunos-udemy`, inLanguage: 'pt-BR', about: { '@id': ORG_ID } }, organizacao()] };
  if (p === '/livros') return { status: 200, caminho: p, titulo: 'Coleção Linvuu: livros de gramática', descricao: LIVROS_DESCRICAO, ...livroBase, jsonld: [{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Coleção Linvuu', itemListElement: LIVROS_META.map((l, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/livros/${l.id}`, name: tituloLivro(l) })) }] };
  let lm = p.match(/^\/livros\/([^/]+)$/);
  if (lm) {
    const l = livroMeta(lm[1]);
    if (!l) return naoEncontrada(p, loc);
    const url = `${SITE}/livros/${l.id}`;
    const caps = Object.values(d?.livros[l.id]?.caps ?? {}).sort((a, b) => a.n - b.n);
    return { status: 200, caminho: p, titulo: tituloLivro(l), descricao: l.descricao, ...livroBase, jsonld: [
      { '@context': 'https://schema.org', '@type': 'Book', '@id': `${url}#livro`, name: tituloLivro(l), url, inLanguage: 'pt-BR', about: l.nome, image: `${SITE}/livros/${l.id}-a1-a2-v1-900.webp`, educationalLevel: 'A1–A2 (CEFR)', author: AUTORES.map((a) => ({ '@type': 'Person', name: a.nome, url: `${SITE}/sobre#${a.id}` })), publisher: { '@id': ORG_ID }, description: l.descricao, hasPart: caps.map((c) => ({ '@type': 'Chapter', name: `Capítulo ${c.n}: ${c.titulo}`, position: c.n, url: `${url}/capitulo/${c.n}`, isAccessibleForFree: true })) },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Livros', item: `${SITE}/livros` }, { '@type': 'ListItem', position: 2, name: l.nome, item: url }] },
    ] };
  }
  lm = p.match(/^\/livros\/([^/]+)\/capitulo\/(\d+)$/);
  if (lm) {
    const l = livroMeta(lm[1]); const c = d?.livros[lm[1]]?.caps[Number(lm[2])];
    if (!l || !c) return naoEncontrada(p, loc);
    const url = `${SITE}/livros/${l.id}/capitulo/${c.n}`;
    return { status: 200, caminho: p, titulo: `${l.nome}, cap. ${c.n}: ${c.titulo.split(':')[0]}`, descricao: `${l.nome}, capítulo ${c.n} do livro de gramática prática da Coleção Linvuu: ${c.titulo}. Leitura grátis, com áudio.`, ...livroBase, jsonld: [
      { '@context': 'https://schema.org', '@type': 'Chapter', name: `Capítulo ${c.n}: ${c.titulo}`, position: c.n, url, inLanguage: 'pt-BR', isAccessibleForFree: true, educationalLevel: c.nivel || undefined, timeRequired: `PT${minutosDeLeitura(c)}M`, isPartOf: { '@type': 'Book', name: tituloLivro(l), url: `${SITE}/livros/${l.id}` }, author: AUTORES.map((a) => ({ '@type': 'Person', name: a.nome, url: `${SITE}/sobre#${a.id}` })), publisher: { '@id': ORG_ID } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Livros', item: `${SITE}/livros` }, { '@type': 'ListItem', position: 2, name: l.nome, item: `${SITE}/livros/${l.id}` }, { '@type': 'ListItem', position: 3, name: `Capítulo ${c.n}`, item: url }] },
    ] };
  }
  const fixas: Record<string, { titulo: string; descricao?: string; semIndice?: boolean; em?: Locale['codigo'][] }> = {
    '/cursos': { titulo: tx.cursos, descricao: loc.codigo === 'pt-BR' ? 'Cursos de idiomas Linvuu: sem medo de gramática, com sessões de 30 minutos. Experimente duas aulas gratuitas.' : loc.codigo === 'en' ? 'Linvuu language courses: grammar without fear, with 30-minute sessions. Try two lessons for free.' : 'Cursos de idiomas Linvuu: gramática sin miedo, con sesiones de 30 minutos. Prueba dos clases gratis.' },
    '/portugues': { titulo: tx.pt, descricao: tx.ptD },
    // Aulas ao vivo de russo: existe em português e em inglês; em espanhol a página volta para a home (noindex).
    '/russo-online': { titulo: AULAS_RUSSO[loc.codigo === 'en' ? 'en' : 'pt-BR'].titulo, descricao: AULAS_RUSSO[loc.codigo === 'en' ? 'en' : 'pt-BR'].descricao, em: ['pt-BR', 'en'], semIndice: loc.codigo === 'es' || undefined },
    '/entrar': { titulo: tx.entrar, semIndice: true },
    '/cadastro': { titulo: tx.cadastro, semIndice: true },
    '/livro/gramatica-ru': { titulo: 'Gramática russa A1–A2', semIndice: true },
    // A página de preços existe de verdade nos três idiomas (renderização localizada genuína, verificada ao vivo):
    // indexável nas três, para os alternates hreflang da versão PT não apontarem para páginas noindex.
    '/assinatura': loc.codigo === 'pt-BR' ? { titulo: 'Planos e assinatura', descricao: 'Aprenda idiomas com a Linvuu: planos mensal, trimestral com 30% OFF no Pix e anual. Experimente duas aulas grátis, sem cartão.' } : loc.codigo === 'en' ? { titulo: tx.assinatura, descricao: 'Learn languages with Linvuu: monthly, quarterly (30% off with Pix) and annual plans. Try two free lessons, no card required.' } : { titulo: tx.assinatura, descricao: 'Aprende idiomas con Linvuu: planes mensual, trimestral con 30 % de descuento con Pix y anual. Prueba dos clases gratis, sin tarjeta.' },
    '/privacidade': { titulo: tx.priv, descricao: tx.privD },
    '/termos': { titulo: tx.termos, descricao: tx.termosD },
    '/excluir-conta': { titulo: EXCLUSAO[loc.codigo].titulo, descricao: EXCLUSAO[loc.codigo].descricao },
  };
  if (fixas[p]) {
    const jsonld: object[] = [];
    if (p === '/cursos' && d) jsonld.push({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: d.cursos.filter((c) => c.status !== 'em-breve' && c.id !== loc.cursoOculto && explicacaoCompleta(d, c.id, loc.explicacao)).map((c, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Course', name: c.nome, description: c.descricao, url: `${SITE}${loc.prefixo}/curso/${c.id}`, provider: { '@id': ORG_ID, '@type': 'EducationalOrganization', name: 'Linvuu' } } })) });
    if (p === '/assinatura' && loc.codigo === 'pt-BR') jsonld.push(
      { '@context': 'https://schema.org', '@type': 'Product', name: 'Assinatura Linvuu', description: fixas[p].descricao, image: `${SITE}/brand/linvuu-logo.png`, brand: { '@type': 'Brand', name: 'Linvuu' }, offers: [ ['Mensal', precoSchema(CENTAVOS.mensal)], ['Trimestral Pix', precoSchema(CENTAVOS['trimestral-pix'])], ['Trimestral cartão ou boleto', precoSchema(CENTAVOS.trimestral)], ['Anual', precoSchema(CENTAVOS.anual)] ].map(([name, price]) => ({ '@type': 'Offer', name, price, priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: `${SITE}/assinatura`, hasMerchantReturnPolicy: POLITICA_REEMBOLSO })) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Posso experimentar sem cartão?', acceptedAnswer: { '@type': 'Answer', text: 'As duas primeiras aulas de cada curso são gratuitas, sem cartão.' } }, { '@type': 'Question', name: 'Qual é o desconto no Pix?', acceptedAnswer: { '@type': 'Answer', text: `O plano trimestral custa ${PRECO_TRIMESTRAL_PIX} no Pix, 30% de desconto sobre ${PRECO_TRIMESTRAL}.` } }] },
    );
    if (p === '/russo-online' && loc.codigo !== 'es') jsonld.push({ '@context': 'https://schema.org', '@type': 'Service', name: fixas[p].titulo, description: fixas[p].descricao, serviceType: loc.codigo === 'en' ? 'Online Russian language lessons' : 'Aulas de russo online', inLanguage: loc.codigo, provider: { '@id': ORG_ID }, areaServed: 'Worldwide', url: `${SITE}${loc.prefixo}/russo-online` });
    return { status: 200, caminho: p, ...fixas[p], jsonld };
  }
  if (!d) return { status: 503, caminho: p, semIndice: true }; // falha de conteúdo não vira página genérica indexável
  const curso = (id: string) => { const c = d.cursos.find((x) => x.id === id); return c ? { ...c, ...(c.i18n?.[loc.codigo] ?? {}) } : undefined; };
  const tituloAula = (id: string, aula: number, original: string) => ((d.indice[id]?.fonte ?? 'pt') === ex ? original : d.indice[id]?.tr?.[ex]?.g[aula] ?? original);
  let m = p.match(/^\/curso\/([^/]+)$/);
  if (m) {
    const c = curso(m[1]);
    if (!c) return naoEncontrada(p, loc);
    const url = `${SITE}${caminhoEm(loc.codigo, p)}`;
    const aulas = d.indice[c.id]?.grupos?.length ?? 0;
    // Indexável só onde o curso existe de verdade: oferecido a esse público e com todas as aulas explicadas na língua dele.
    const oferecidoEm = (l: Locale) => c.status !== 'em-breve' && l.cursoOculto !== c.id && explicacaoCompleta(d, c.id, l.explicacao);
    return {
      status: 200, caminho: p, titulo: oferecidoEm(loc) || c.id === loc.cursoOculto ? tx.curso(c.nome) : tx.cursoPrep(c.nome), descricao: c.descricao,
      // o curso escrito para o próprio público deste idioma (ex.: inglês no site em inglês) não entra na busca;
      // nem o curso cuja edição neste idioma ainda está incompleta (prometeria explicações que não existem).
      semIndice: !oferecidoEm(loc) || undefined,
      em: LOCALES.filter(oferecidoEm).map((l) => l.codigo),
      jsonld: [
        // Dados de curso do Google (Course info): provedor, oferta (2 aulas grátis, depois assinatura) e instância online no ritmo do aluno.
        {
          '@context': 'https://schema.org', '@type': 'Course', name: tx.cursoJ(c.nome), description: c.descricao, inLanguage: loc.codigo, url,
          teaches: c.id === 'br' ? 'Brazilian Portuguese' : c.nome, educationalLevel: 'A1–B1 (CEFR)', isAccessibleForFree: false,
          ...(aulas ? { coursePrerequisites: 'None', timeRequired: `PT${aulas * 2}H` } : {}),
          provider: { '@type': 'EducationalOrganization', '@id': ORG_ID, name: 'Linvuu', url: SITE, logo: `${SITE}/brand/linvuu-logo.png` },
          offers: [{ '@type': 'Offer', category: 'Subscription', price: CENTAVOS.mensal / 100, priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: `${SITE}${loc.prefixo}/assinatura` }],
          hasCourseInstance: [{ '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT30M', courseSchedule: { '@type': 'Schedule', repeatFrequency: 'Daily', repeatCount: aulas * 4 } }],
        },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: tx.inicio, item: `${SITE}${loc.prefixo || '/'}` }, { '@type': 'ListItem', position: 2, name: tx.cursos, item: `${SITE}${loc.prefixo}/cursos` }, { '@type': 'ListItem', position: 3, name: c.nome, item: url }] },
      ],
    };
  }
  m = p.match(/^\/curso\/([^/]+)\/dia\/(\d+)$/);
  if (m) {
    const c = curso(m[1]);
    const n = Number(m[2]);
    const total = d.indice[m[1]]?.total ?? 0;
    if (!c || n < 1 || n > total) return naoEncontrada(p, loc);
    const g = d.indice[m[1]].grupos?.find((x) => n >= x.dias[0] && n <= x.dias[1]);
    if (!g) return { status: 503, caminho: p, semIndice: true };
    const t = tituloAula(m[1], g.aula, g.titulo);
    // A sessão só existe de verdade num idioma quando a explicação está nele: o original ou a tradução daquela aula.
    // Nos outros, a página mostra o texto original com um aviso e não entra na busca (seria conteúdo duplicado).
    const temNo = (l: Locale) => l.cursoOculto !== c.id && ((d.indice[c.id]?.fonte ?? 'pt') === l.explicacao || !!d.indice[c.id]?.tr?.[l.explicacao]?.aulas?.includes(g.aula));
    // A descrição nomeia a língua em que a explicação desta sessão está de fato: a língua da página, quando a aula está traduzida nela; senão, a língua em que o curso foi escrito.
    const descAula = tx.aulaD(c.nome, g.aula, t, n, total, LINGUAS[loc.codigo][temNo(loc) ? loc.explicacao : (d.indice[c.id]?.fonte ?? 'pt')] ?? '');
    // A apresentacao publica do curso continua indexavel. Sessoes sem amostra publica nao entram no indice.
    return { status: 200, caminho: p, titulo: `${tx.aula(g.aula, t, c.nome)} · ${tx.sessao(n, c.nome).split(' · ')[0]}`, descricao: descAula, semIndice: n > SESSOES_GRATIS || !temNo(loc) || undefined, em: LOCALES.filter(temNo).map((l) => l.codigo),
      // Sessão grátis: dados de recurso educacional, sempre gratuito (as demais são por assinatura e não ganham marcação de gratuidade)
      jsonld: n <= SESSOES_GRATIS ? [{
        '@context': 'https://schema.org', '@type': 'LearningResource', name: tx.aula(g.aula, t, c.nome), description: descAula, url: `${SITE}${caminhoEm(loc.codigo, p)}`,
        inLanguage: loc.codigo, learningResourceType: 'Lesson', educationalLevel: 'A1 (CEFR)', teaches: c.nome, timeRequired: 'PT30M', isAccessibleForFree: true,
        isPartOf: { '@type': 'Course', name: tx.cursoJ(c.nome), url: `${SITE}${caminhoEm(loc.codigo, `/curso/${c.id}`)}` }, provider: { '@id': ORG_ID },
      }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: tx.inicio, item: `${SITE}${loc.prefixo || '/'}` }, { '@type': 'ListItem', position: 2, name: c.nome, item: `${SITE}${caminhoEm(loc.codigo, `/curso/${c.id}`)}` }, { '@type': 'ListItem', position: 3, name: tx.sessao(n, c.nome), item: `${SITE}${caminhoEm(loc.codigo, p)}` }] }] : undefined };
  }
  m = p.match(/^\/gramatica(?:\/([^/]+))?$/);
  if (m) {
    if (!m[1]) return { status: 200, caminho: p, titulo: tx.gram };
    const c = curso(m[1]);
    if (!c) return naoEncontrada(p, loc);
    const url = `${SITE}${caminhoEm(loc.codigo, p)}`;
    const cursoUrl = `${SITE}${caminhoEm(loc.codigo, `/curso/${c.id}`)}`;
    // A descrição nomeia a língua em que a gramática está de fato: a língua da página, quando existe o arquivo de gramática nela; senão, a língua em que o curso foi escrito.
    const fonteGram = d.indice[c.id]?.fonte ?? 'pt';
    const temGram = gramaticaExisteEm(d, c.id, loc.explicacao);
    const gramEm = (l: Locale) => l.cursoOculto !== c.id && c.status !== 'em-breve' && gramaticaExisteEm(d, c.id, l.explicacao);
    const descGram = tx.gramD(c.nome, LINGUAS[loc.codigo][temGram ? loc.explicacao : fonteGram] ?? '');
    // Alternates só para os públicos a quem o curso é oferecido (mesma regra da página do curso):
    // a gramática de uma língua explicada ao próprio público dela não é uma versão de idioma —
    // declarar esse alternate apontava para a página gémea marcada noindex.
    return {
      // Gramática que ainda não existe neste idioma não é página própria (o conteúdo seria o original, em outra língua).
      status: 200, caminho: p, titulo: tx.gramC(c.nome), descricao: descGram, semIndice: !gramEm(loc) || undefined, em: LOCALES.filter(gramEm).map((l) => l.codigo),
      jsonld: [
        // A página de gramática é o recurso de referência do curso: tópicos e tabelas cuja descrição nomeia a língua real das explicações.
        { '@context': 'https://schema.org', '@type': 'LearningResource', name: tx.gramC(c.nome), description: descGram, url, inLanguage: loc.codigo, learningResourceType: 'Grammar reference', teaches: c.nome, isPartOf: { '@type': 'Course', name: tx.cursoJ(c.nome), url: cursoUrl }, provider: { '@id': ORG_ID } },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: tx.inicio, item: `${SITE}${loc.prefixo || '/'}` }, { '@type': 'ListItem', position: 2, name: c.nome, item: cursoUrl }, { '@type': 'ListItem', position: 3, name: tx.gramC(c.nome), item: url }] },
      ],
    };
  }
  return naoEncontrada(p, loc);
}


/**
 * Navegação global do HTML pré-renderizado, na língua da página.
 * Até 2026-11-04 só o português a tinha: sem menu, as aulas e gramáticas em inglês ficavam com
 * 1 único link interno (o de regresso ao curso), contra 7 nas aulas em português (auditoria SEO).
 * Nos outros idiomas os destinos são os que existem e são indexáveis nessa língua: Livros, Sobre,
 * Por-que-Linvuu e Contato só existem em português (são noindex nas outras), por isso não entram —
 * o rodapé do site segue a mesma regra (Footer.tsx só os mostra em pt-BR).
 */
function menuPreRender(loc: Locale): string {
  if (loc.codigo === 'pt-BR') return '<nav aria-label="Principal"><a href="/cursos">Cursos</a> · <a href="/livros">Livros</a> · <a href="/sobre">Quem somos</a> · <a href="/por-que-linvuu">Por que estudar com a Linvuu?</a> · <a href="/contato">Contato</a> · <a href="/privacidade">Privacidade</a></nav>';
  const tx = TX[loc.codigo];
  const a = (href: string, texto: string) => `<a href="${esc(caminhoEm(loc.codigo, href))}">${esc(texto)}</a>`;
  const itens = [a('/', tx.inicio), a('/cursos', tx.cursos), a('/gramatica', tx.gram), a('/portugues', tx.ptNav), a('/termos', tx.termos), a('/privacidade', tx.priv)];
  return `<nav aria-label="${loc.codigo === 'en' ? 'Main' : 'Principal'}">${itens.join(' · ')}</nav>`;
}

/**
 * Conteúdo mínimo dentro de <div id="root"> para quem não executa JavaScript (ou ainda não renderizou):
 * título, descrição e links reais. O React substitui tudo isto ao carregar, então o visitante não vê diferença.
 */
export function conteudoRota(m: MetaRota, d: DadosMeta | null, loc: Locale): string {
  if (m.status !== 200 || m.semIndice) return '';
  const tx = TX[loc.codigo];
  const a = (href: string, texto: string) => `<a href="${esc(caminhoEm(loc.codigo, href))}">${esc(texto)}</a>`;
  const li = (itens: string[]) => (itens.length ? `<ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul>` : '');
  const cabeca = (t: string, desc?: string) => `<h1>${esc(t)}</h1>${desc ? `<p>${esc(desc)}</p>` : ''}`;
  const nome = (c: CursoMeta) => ({ ...c, ...(c.i18n?.[loc.codigo] ?? {}) });
  const visiveis = (d?.cursos ?? []).filter((c) => c.status !== 'em-breve' && c.id !== loc.cursoOculto).map(nome);
  const base = semPrefixo(m.caminho);
  let corpo = '';
  if (base === '/' || base === '/cursos') {
    const home = HOME[loc.codigo];
    corpo = cabeca(base === '/' && loc.codigo === 'pt-BR' ? HOME_BR.titulo : (base === '/cursos' ? tx.cursos : home.titulo) ?? 'Linvuu · Idiomas para quem fala português', m.descricao ?? home.descricao ?? 'Cursos de inglês, espanhol, alemão, francês, italiano e russo para quem fala português.') + `<h2>${esc(tx.cursos)}</h2>` + li(visiveis.map((c) => `${a(`/curso/${c.id}`, c.nome)}: ${esc(c.descricao)} · ${a(`/gramatica/${c.id}`, tx.gramC(c.nome))}`)) + `<p>${loc.codigo === 'pt-BR' ? 'Criada por' : loc.codigo === 'es' ? 'Creada por' : 'Created by'} ${AUTORES.map((x) => esc(x.nome)).join(loc.codigo === 'pt-BR' ? ' e ' : loc.codigo === 'es' ? ' y ' : ' and ')}.</p>`
    if (base === '/' && loc.codigo === 'pt-BR') { corpo += `<p>${esc(HOME_BR.lead)}</p><h2>Conheça o Vuu</h2><p>Vuu acompanha a curiosidade que move a Linvuu: entender as palavras, ouvir como soam e praticar o idioma.</p><p>${a('/curso/de', 'Conhecer o curso de alemão')} · ${a('/curso/ru', 'Conhecer o curso de russo')} · ${a('/livros/de', 'Livro de alemão')} · ${a('/livros/es', 'Livro de espanhol')}</p><p>${esc(LIVROS_EM_PRODUCAO)}</p><h2>Ouça, entenda e pratique</h2><p>Explicações em português, áudio e exercícios. Experimente as duas primeiras aulas de cada curso sem cartão.</p><h2 id="planos">A oferta de hoje</h2><p>Acesso aos cursos de idiomas, com explicações em português.</p><ul><li>Mensal: ${esc(PRECO_MENSAL)}, com renovação automática.</li><li>Três meses no Pix: ${esc(PRECO_TRIMESTRAL_PIX)}, pagamento único e 30% de desconto.</li><li>Anual: ${esc(PRECO_ANUAL)}, pagamento único.</li></ul><p>${a('/assinatura', 'Ver todos os detalhes da assinatura')} · ${a('/cursos', 'Experimentar duas aulas grátis')}</p>`; }
    if (base === '/' && loc.codigo !== 'pt-BR') { const g = COMECAR[loc.codigo as 'pt-BR' | 'en' | 'es'] ?? COMECAR['pt-BR']; corpo += `<h2>${esc(g.titulo)}</h2><p>${esc(g.lead)}</p><ol>${g.passos.map((x) => `<li><strong>${esc(x.t)}.</strong> ${esc(x.d)}</li>`).join('')}</ol><p>${esc(g.dica)}</p>`; }
  } else {
    const ml = base.match(/^\/livros\/([^/]+)$/), mcl = base.match(/^\/livros\/([^/]+)\/capitulo\/(\d+)$/);
    if (base === '/livros') corpo = cabeca(m.titulo ?? '', m.descricao) + (loc.codigo === 'pt-BR' ? `<p>${esc(LIVROS_EM_PRODUCAO)}</p>` : '') + li(LIVROS_META.map((l) => `<a href="/livros/${l.id}">${esc(tituloLivro(l))}</a>`));
    else if (ml && livroMeta(ml[1])) {
      const l = livroMeta(ml[1])!; const lv = d?.livros[l.id];
      const apresentacao = loc.codigo === 'pt-BR' ? APRESENTACOES_LIVRO[l.id] : undefined;
      corpo = cabeca(tituloLivro(l), l.descricao) + `<p>Por ${AUTORES.map((a) => esc(a.nome)).join(' e ')}.</p>` + (apresentacao ? `<h2>${esc(apresentacao.titulo)}</h2>${apresentacao.paragrafos.map((p) => `<p>${esc(p)}</p>`).join('')}` : '') + `<h2>Sumário</h2><ol>${(lv?.sumario ?? []).map((x) => `<li>${lv?.caps[x.n] ? `<a href="/livros/${l.id}/capitulo/${x.n}">${esc(x.titulo)}</a>` : esc(x.titulo)}</li>`).join('')}</ol>`;
    } else if (mcl && d?.livros[mcl[1]]?.caps[Number(mcl[2])]) {
      const c = d.livros[mcl[1]].caps[Number(mcl[2])];
      corpo = cabeca(`Capítulo ${c.n}: ${c.titulo}`, undefined) + `<p>${AUTORES.map((a) => esc(a.nome)).join(' e ')}</p>` + capituloParaHtml(c, livroMeta(mcl[1])?.lang ?? mcl[1]) + `<p><a href="/livros/${mcl[1]}">Voltar ao livro</a></p>`;
    }
    const mc = base.match(/^\/curso\/([^/]+)$/);
    const md = base.match(/^\/curso\/([^/]+)\/dia\/(\d+)$/);
    const mg = base.match(/^\/gramatica\/([a-z]{2})$/);
    if (corpo) { /* livros */ } else if (mc) {
      const c = visiveis.find((x) => x.id === mc[1]);
      const grupos = d?.indice[mc[1]]?.grupos ?? [];
      const tr = d?.indice[mc[1]]?.tr?.[loc.explicacao]?.g;
      const mesmo = (d?.indice[mc[1]]?.fonte ?? 'pt') === loc.explicacao;
      // Links estaticos para amostras publicas reais. O Google tambem pode descobrir URLs pelo JavaScript.
      const indexavel = (g: { aula: number; dias: [number, number] }) => g.dias[0] <= SESSOES_GRATIS && (mesmo || !!d?.indice[mc[1]]?.tr?.[loc.explicacao]?.aulas?.includes(g.aula));
      const apresentacao = loc.codigo === 'pt-BR' ? APRESENTACOES_CURSO[mc[1]] : undefined;
      corpo = cabeca(m.titulo ?? '', c?.descricao) + (apresentacao ? `<h2>${esc(apresentacao.titulo)}</h2>${apresentacao.paragrafos.map((p) => `<p>${esc(p)}</p>`).join('')}` : '') + li(grupos.filter(indexavel).flatMap((g) => {
        const rot = tx.aula(g.aula, mesmo ? g.titulo : tr?.[g.aula] ?? g.titulo, c?.nome ?? '').split(' · ')[0];
        return Array.from({ length: g.dias[1] - g.dias[0] + 1 }, (_, k) => g.dias[0] + k)
          .filter((n) => n <= SESSOES_GRATIS).map((n) => a(`/curso/${mc[1]}/dia/${n}`, `${rot} · ${tx.sessao(n, c?.nome ?? '').split(' · ')[0]}`));
      }));
      // Ementa completa como texto: o que o curso ensina de verdade, aula por aula (só as amostras grátis viram link).
      if (grupos.length) corpo += `<h2>${esc(tx.ementa(grupos.length))}</h2><ol>${grupos.map((g) => `<li>${esc(mesmo ? g.titulo : tr?.[g.aula] ?? g.titulo)}</li>`).join('')}</ol>`;
      if (c && d && gramaticaExisteEm(d, mc[1], loc.explicacao)) corpo += `<p>${a(`/gramatica/${mc[1]}`, tx.gramC(c.nome))}</p>`;
    } else if (md) {
      // Navegação entre sessões da amostra pública + curso + gramática do curso, na língua da página.
      // A vizinha só entra se também for indexável nesta língua (a aula dela traduzida), com o mesmo
      // critério de metaSemLocale — nada de links do pré-render para páginas noindex.
      const diaN = Number(md[2]);
      const nomeCurso = visiveis.find((x) => x.id === md[1])?.nome ?? md[1];
      const navegar: string[] = [];
      const vizinhaIndexavel = (n: number) => {
        const g = d?.indice[md[1]]?.grupos?.find((x) => n >= x.dias[0] && n <= x.dias[1]);
        return !!g && ((d?.indice[md[1]]?.fonte ?? 'pt') === loc.explicacao || !!d?.indice[md[1]]?.tr?.[loc.explicacao]?.aulas?.includes(g.aula));
      };
      if (diaN > 1 && vizinhaIndexavel(diaN - 1)) navegar.push(a(`/curso/${md[1]}/dia/${diaN - 1}`, tx.ant(diaN - 1)));
      navegar.push(a(`/curso/${md[1]}`, nomeCurso));
      if (d && gramaticaExisteEm(d, md[1], loc.explicacao)) navegar.push(a(`/gramatica/${md[1]}`, tx.gramC(nomeCurso)));
      if (diaN < SESSOES_GRATIS && vizinhaIndexavel(diaN + 1)) navegar.push(a(`/curso/${md[1]}/dia/${diaN + 1}`, tx.seg(diaN + 1)));
      corpo = cabeca(m.titulo ?? '', m.descricao) + (loc.codigo === 'pt-BR' ? sessaoGratisParaHtml(d, md[1], diaN) : sessaoGratisEnParaHtml(d, md[1], diaN, loc.codigo === 'es' ? 'es' : 'en')) + `<p>${navegar.join(' · ')}</p>`;
    } else if (mg && d) {
      // Só chega aqui o que é indexável (o topo da função devolve '' para noindex): a gramática existe na língua da página.
      const suf = (d.indice[mg[1]]?.fonte ?? 'pt') === loc.explicacao ? '' : loc.explicacao;
      corpo = cabeca(m.titulo ?? '', m.descricao) + gramaticaGratisParaHtml(d, mg[1], suf) + `<p>${a(`/curso/${mg[1]}`, visiveis.find((x) => x.id === mg[1])?.nome ?? mg[1])}</p>`;
    } else if (m.titulo) {
      corpo = cabeca(m.titulo, m.descricao);
    }
  }
  if (base === '/assinatura' && loc.codigo === 'pt-BR') corpo = cabeca(m.titulo ?? '', m.descricao) + `<h2 id="oferta-atual">Assinatura Linvuu</h2><p>Acesso a todos os cursos de idiomas.</p><ul><li>Mensal: ${esc(PRECO_MENSAL)}, com renovação automática.</li><li>3 meses: ${esc(PRECO_TRIMESTRAL_PIX)} no Pix (30% OFF) ou ${esc(PRECO_TRIMESTRAL)} no cartão ou boleto, pagamento único.</li><li>12 meses: ${esc(PRECO_ANUAL)}, pagamento único.</li></ul><h2>Posso experimentar sem cartão?</h2><p>As duas primeiras aulas de cada curso são gratuitas, sem cartão.</p><h2>Qual é o desconto no Pix?</h2><p>O plano trimestral custa ${esc(PRECO_TRIMESTRAL_PIX)} no Pix, 30% de desconto sobre ${esc(PRECO_TRIMESTRAL)}.</p><p>${a('/cursos', 'Testar 2 aulas grátis, sem cartão')} · ${a('/cadastro', 'Criar conta')} · ${a('/termos', 'Consultar termos e condições')}</p>`;
  if (base === '/excluir-conta') {
    // Sem JavaScript a página continua útil: texto completo e o endereço para o pedido.
    const x = EXCLUSAO[loc.codigo];
    corpo = cabeca(x.titulo, x.lead) + x.secoes.map((s, i) => `<h2>${esc(s.titulo)}</h2>${s.passos ? `<ol>${s.passos.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>` : ''}${s.itens ? li(s.itens.map(esc)) : ''}${(s.paragrafos ?? []).map((p) => `<p>${esc(p)}</p>`).join('')}${i === 0 ? `<p>${esc(x.formulario.alternativa)} <a href="mailto:${EMAIL_OFICIAL}">${EMAIL_OFICIAL}</a>.</p>` : ''}`).join('');
  }
  if (base === '/russo-online' && loc.codigo !== 'es') { const x = AULAS_RUSSO[loc.codigo === 'en' ? 'en' : 'pt-BR']; corpo = cabeca(x.titulo, x.lead) + (x.credenciais.length ? `<h2>${esc(x.quemTitulo)}</h2>` + li(x.credenciais.map(esc)) : '') + `<h2>${esc(x.comoTitulo)}</h2>` + li(x.como.map(esc)) + `<h2>${esc(x.testeTitulo)}</h2><p>${esc(x.teste)} ${a('/curso/ru', x.testeLink)}</p><h2>${esc(x.ctaTitulo)}</h2><p>${esc(x.cta)}</p>`; }
  if (base === '/sobre') corpo = cabeca(m.titulo ?? '', m.descricao) + AUTORES.map((x) => `<h2 id="${x.id}">${esc(x.nome)}</h2><p>Autoria, revisão e adaptação dos livros e das aulas da Linvuu. ${x.links.map((u) => `<a href="${esc(u)}" rel="me">${/linkedin/.test(u) ? 'LinkedIn' : 'Facebook'}</a>`).join(' · ')}</p>`).join('');
  if (base === '/por-que-linvuu') corpo = cabeca(POR_QUE.titulo, POR_QUE.descricao) + `<p>${esc(POR_QUE.lead)}</p>` + POR_QUE.motivos.map((x) => `<h2 id="${x.id}">${esc(x.titulo)}</h2><p>${esc(x.texto)}</p>`).join('') + `<h2>Para quem é</h2><p>${esc(POR_QUE.paraQuem)}</p><p><a href="/cursos">Veja os cursos</a> · <a href="/livros">Leia os livros</a> · <a href="/contato">Fale com a gente</a></p>`;
  if (base === '/contato') corpo = cabeca(CONTATO.titulo, CONTATO.descricao) + `<p>${esc(CONTATO.lead)}</p>` + li(contatos().filter((c) => c.id !== 'linkedin').map((c) => `<a href="${esc(c.href)}">${esc(c.nome)}: ${esc(c.rotulo)}</a>`)) + `<h2 id="linkedin">LinkedIn</h2>` + li(AUTORES.map((x) => `<a href="${esc(x.links[0])}" rel="me">${esc(x.nome)}</a>`));
  if (base === '/ex-alunos-udemy') corpo = cabeca(EX_ALUNOS.titulo, EX_ALUNOS.descricao) + `<p>${esc(EX_ALUNOS.lead)}</p><h2>O que você encontra na Linvuu</h2>` + li(EX_ALUNOS.beneficios.map((x) => esc(x))) + `<h2>Como pedir sua condição especial</h2><ol>${EX_ALUNOS.passos.map((x) => `<li>${esc(x)}</li>`).join('')}</ol><p>${esc(EX_ALUNOS.aviso)}</p>` + `<h2>Perguntas frequentes</h2>` + EX_ALUNOS.perguntas.map((q) => `<h3>${esc(q.p)}</h3><p>${esc(q.r)}</p>`).join('');
  const menu = menuPreRender(loc);
  return corpo ? `<main data-prerender>${menu}${corpo}</main>` : '';
}

/** Sessão de aula grátis (dias 1 a SESSOES_GRATIS) em HTML simples para quem não executa JavaScript. O que é pago nunca passa por aqui. */
type Bloco = Record<string, any>;
const cacheGramatica = new Map<string, string>();
/** Apenas tópicos públicos que a página também mostra a visitantes após carregar a API. */
function gramaticaGratisParaHtml(d: DadosMeta | null, idioma: string, sufixo: string = ''): string {
  if (!d?.raiz || !/^[a-z]{2}$/.test(idioma) || !/^(|en|es)$/.test(sufixo)) return '';
  const arquivo = path.join(d.raiz, 'content', 'gramatica', sufixo ? `${idioma}.${sufixo}.json` : `${idioma}.json`);
  if (cacheGramatica.has(arquivo)) return cacheGramatica.get(arquivo)!;
  try {
    const pacote = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    const topicos = (pacote.topicos as Bloco[]).filter((t) => typeof t.dia === 'number' && t.dia <= SESSOES_GRATIS);
    const corpo = topicos.map((t) => `<section><h2>${esc(String(t.titulo ?? ''))}</h2>${String(t.explicacao ?? '').split(/\s*(?:PASSO|STEP) \d+:\s*/).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join('')}</section>`).join('');
    cacheGramatica.set(arquivo, corpo);
    return corpo;
  } catch { return ''; }
}
const cacheSessoesEn = new Map<string, any>();
const ROTULOS_SESSAO = {
  en: { voc: 'Vocabulary', pron: 'pronunciation', trad: 'english', alfa: 'Alphabet and sounds', letra: 'letter', som: 'sound', ex: 'example', lingua: 'In English:', pratica: 'Practise:' },
  es: { voc: 'Vocabulario', pron: 'pronunciación', trad: 'español', alfa: 'Alfabeto y sonidos', letra: 'letra', som: 'sonido', ex: 'ejemplo', lingua: 'En español:', pratica: 'Practica:' },
} as const;
/** Sessão gratuita (dias 1 a 8) explicada em inglês ou espanhol: content/idiomas/<curso>/<lingua>/dia-NNN.json,
 * ou o arquivo-base quando essa é a língua-fonte do curso (português para estrangeiros). Mesma regra de privacidade da versão em português. */
function sessaoGratisEnParaHtml(d: DadosMeta | null, curso: string, dia: number, lingua: 'en' | 'es' = 'en'): string {
  if (!d?.raiz || dia < 1 || dia > SESSOES_GRATIS || !/^[a-z]{2}$/.test(curso)) return '';
  const nomeArq = `dia-${String(dia).padStart(3, '0')}.json`;
  const f = (d.indice[curso]?.fonte ?? 'pt') === lingua ? path.join(d.raiz, 'content', 'idiomas', curso, nomeArq) : path.join(d.raiz, 'content', 'idiomas', curso, lingua, nomeArq);
  const R = ROTULOS_SESSAO[lingua];
  let arq = cacheSessoesEn.get(f);
  if (!arq) { try { arq = JSON.parse(fs.readFileSync(f, 'utf8')); cacheSessoesEn.set(f, arq); } catch { return ''; } }
  const sessao = arq.sessao;
  if (!sessao?.blocos) return '';
  const t = (x: unknown) => esc(String(x ?? ''));
  // Nos arquivos traduzidos a tradução fica em «en» ou, nos de espanhol, em «pt»; campo vazio não conta.
  const en = (x: Bloco) => x[lingua] || x.en || x.pt;
  const paras = (x: string) => String(x ?? '').split(/\s*(?:PASSO|STEP) \d+:\s*/).filter(Boolean).map((y) => `<p>${t(y)}</p>`).join('');
  const tab = (linhas: Bloco[]) => linhas?.length ? `<table><thead><tr>${Object.keys(linhas[0]).map((k) => `<th>${t(k)}</th>`).join('')}</tr></thead><tbody>${linhas.map((l) => `<tr>${Object.values(l).map((v) => `<td>${t(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
  const partes: string[] = [`<p>${t(arq.objetivo)}</p>`];
  for (const b of sessao.blocos as Bloco[]) {
    if (b.tipo === 'intro' || b.tipo === 'revisao') partes.push(`<p>${t(b.texto ?? b.enunciado)}</p>`);
    else if (b.tipo === 'palavras') partes.push(`<h2>${R.voc}</h2>${tab((b.itens ?? []).map((i: Bloco) => ({ [curso]: i.ru, [R.pron]: i.translit, [R.trad]: en(i) })))}`);
    else if (b.tipo === 'alfabeto') partes.push(`<h2>${R.alfa}</h2>` + (b.grupos ?? []).map((g: Bloco) => `<h3>${t(g.nome)}</h3>${tab((g.letras ?? []).map((l: Bloco) => ({ [R.letra]: `${l.maiuscula} ${l.minuscula}`, [R.som]: l.som, [R.ex]: l.exemplo, [R.trad]: l.exemploPt })))}`).join(''));
    else if (b.tipo === 'gramatica') partes.push(`<h2>${t(b.titulo)}</h2>${paras(b.explicacao)}${b.comparacao ? `<p><strong>${R.lingua}</strong> ${t(b.comparacao)}</p>` : ''}${b.exemplos ? `<ul>${b.exemplos.map((e: Bloco) => `<li>${t(e.ru)} — ${t(en(e))}</li>`).join('')}</ul>` : ''}${b.tabela ? tab(b.tabela) : ''}${(b.tabelas ?? []).map((x: Bloco) => `<h3>${t(x.titulo)}</h3>${tab(x.linhas)}`).join('')}`);
    else if (b.tipo === 'dialogo') partes.push(`<h2>${t(b.titulo)}</h2><p>${t(b.contexto)}</p><ul>${(b.linhas ?? []).map((l: Bloco) => `<li><strong>${t(l.personagem)}:</strong> ${t(l.ru)} <em>${t(en(l))}</em></li>`).join('')}</ul>`);
    else if (b.tipo === 'texto') partes.push(`<h2>${t(b.titulo)}</h2><p>${t(b.ru)}</p><p>${t(en(b))}</p>`);
    else if (b.tipo === 'producao') partes.push(`<p><strong>${R.pratica}</strong> ${t(b.enunciado)}</p>`);
  }
  return `<h2>${t(sessao.titulo)} (${t(sessao.duracaoMin)} min)</h2>${partes.join('')}`;
}
const cacheAulas = new Map<string, any>();
function sessaoGratisParaHtml(d: DadosMeta | null, curso: string, dia: number): string {
  if (!d?.raiz || dia < 1 || dia > SESSOES_GRATIS || !/^[a-z]{2}$/.test(curso)) return '';
  const aulaN = Math.ceil(dia / SESSOES_POR_AULA), idx = (dia - 1) % SESSOES_POR_AULA;
  const f = path.join(d.raiz, 'content', 'idiomas', curso, 'aulas', `aula-${String(aulaN).padStart(3, '0')}.json`);
  let aula = cacheAulas.get(f);
  if (!aula) { try { aula = JSON.parse(fs.readFileSync(f, 'utf8')); cacheAulas.set(f, aula); } catch { return ''; } }
  const sessao = aula.sessoes?.[idx];
  if (!sessao) return '';
  const t = (x: unknown) => esc(String(x ?? ''));
  const paras = (x: string) => String(x ?? '').split(/\s*PASSO \d+:\s*/).filter(Boolean).map((y) => `<p>${t(y)}</p>`).join('');
  const tab = (linhas: Bloco[]) => linhas?.length ? `<table><thead><tr>${Object.keys(linhas[0]).map((k) => `<th>${t(k)}</th>`).join('')}</tr></thead><tbody>${linhas.map((l) => `<tr>${Object.values(l).map((v) => `<td>${t(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
  const partes: string[] = [`<p>${t(aula.objetivo)}</p>`];
  for (const b of sessao.blocos as Bloco[]) {
    if (b.tipo === 'intro' || b.tipo === 'revisao') partes.push(`<p>${t(b.texto ?? b.enunciado)}</p>`);
    else if (b.tipo === 'palavras') partes.push(`<h2>Vocabulário</h2>${tab(b.itens.map((i: Bloco) => ({ [curso]: i.ru, pronúncia: i.translit, português: i.pt })))}`);
    else if (b.tipo === 'alfabeto') partes.push(`<h2>Alfabeto e sons</h2>` + (b.grupos ?? []).map((g: Bloco) => `<h3>${t(g.nome)}</h3>${tab(g.letras.map((l: Bloco) => ({ letra: `${l.maiuscula} ${l.minuscula}`, som: l.som, exemplo: l.exemplo, tradução: l.exemploPt })))}`).join(''));
    else if (b.tipo === 'gramatica') partes.push(`<h2>${t(b.titulo)}</h2>${paras(b.explicacao)}${b.comparacao ? `<p><strong>Em português:</strong> ${t(b.comparacao)}</p>` : ''}${b.exemplos ? `<ul>${b.exemplos.map((e: Bloco) => `<li>${t(e.ru)} — ${t(e.pt)}</li>`).join('')}</ul>` : ''}${b.tabela ? tab(b.tabela) : ''}${(b.tabelas ?? []).map((x: Bloco) => `<h3>${t(x.titulo)}</h3>${tab(x.linhas)}`).join('')}${b.erros ? `<h3>Erros comuns</h3><ul>${b.erros.map((e: Bloco) => `<li>${t(e.errado)} → ${t(e.certo)}. ${t(e.motivo)}</li>`).join('')}</ul>` : ''}`);
    else if (b.tipo === 'dialogo') partes.push(`<h2>${t(b.titulo)}</h2><p>${t(b.contexto)}</p><ul>${b.linhas.map((l: Bloco) => `<li><strong>${t(l.personagem)}:</strong> ${t(l.ru)} <em>${t(l.pt)}</em></li>`).join('')}</ul>`);
    else if (b.tipo === 'texto') partes.push(`<h2>${t(b.titulo)}</h2><p>${t(b.ru)}</p><p>${t(b.pt)}</p>`);
    else if (b.tipo === 'producao') partes.push(`<p><strong>Pratique:</strong> ${t(b.enunciado)}</p>`);
  }
  return `<h2>${t(sessao.titulo)} (${t(sessao.duracaoMin)} min)</h2>${partes.join('')}`;
}

const SITE = 'https://linvuu.com.br';
// Política real do site (paywall e termos): reembolso integral em até 7 dias.
const POLITICA_REEMBOLSO = { '@type': 'MerchantReturnPolicy', applicableCountry: 'BR', returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow', merchantReturnDays: 7, returnFees: 'https://schema.org/FreeReturn' };
const ORG_ID = `${SITE}/#organizacao`;
const organizacao = () => ({ '@context': 'https://schema.org', '@type': 'EducationalOrganization', '@id': ORG_ID, name: 'Linvuu', url: SITE, logo: `${SITE}/brand/linvuu-logo.png`, email: EMAIL_OFICIAL, founder: AUTORES.map((a) => ({ '@type': 'Person', '@id': `${SITE}/sobre#${a.id}`, name: a.nome, sameAs: [...a.links] })) });
const pessoa = (a: (typeof AUTORES)[number]) => ({ '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE}/sobre#${a.id}`, name: a.nome, url: `${SITE}/sobre#${a.id}`, worksFor: { '@id': ORG_ID }, sameAs: [...a.links], knowsAbout: ['Matemática', 'Linguística', 'Ensino de idiomas', 'Inteligência artificial', 'Teoria dos números', 'Álgebra linear'] });
const naoEncontrada = (p: string, loc: Locale): MetaRota => ({ status: 404, caminho: p, titulo: TX[loc.codigo].nao, semIndice: true });
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Versões por idioma + x-default exatamente como o HTML do servidor as publica (fonte única também para o navegador). */
export function alternativosDe(m: MetaRota, site: string, d: DadosMeta | null = null): { hreflang: string; href: string }[] {
  // uma versão por idioma + x-default: a versão em português quando faz parte do cluster;
  // sem ela (o curso de português para estrangeiros não existe em PT), a versão no idioma-fonte do conteúdo.
  const em = m.semIndice ? [] : LOCALES.filter((l) => !m.em || m.em.includes(l.codigo));
  if (em.length < 2) return [];
  const idCurso = semPrefixo(m.caminho).match(/^\/(?:curso|gramatica)\/([a-z]{2})/)?.[1];
  const fonte = idCurso ? d?.indice?.[idCurso]?.fonte : undefined;
  const codigoFonte = fonte === 'pt' ? 'pt-BR' : fonte;
  const padrao = em.find((l) => l.codigo === 'pt-BR') ?? em.find((l) => l.codigo === codigoFonte) ?? em[0];
  return [...em.map((l) => ({ hreflang: l.codigo, href: site + caminhoEm(l.codigo, m.caminho) })), { hreflang: 'x-default', href: site + caminhoEm(padrao.codigo, m.caminho) }];
}

/** O que o navegador aplica ao navegar dentro do site: os mesmos valores que o servidor colocaria no HTML desta rota. */
export function metaParaNavegador(m: MetaRota, site: string, d: DadosMeta | null = null) {
  return { status: m.status, caminho: m.caminho, titulo: m.titulo ? `${m.titulo} · Linvuu` : null, descricao: m.descricao ?? null, canonical: site + m.caminho, noindex: !!m.semIndice, alternativos: alternativosDe(m, site, d), lang: (m.locale ?? LOCALES[0]).codigo };
}

export function aplicarMeta(html: string, m: MetaRota, site: string, d: DadosMeta | null = null): string {
  let out = html;
  const troca = (re: RegExp, valor: string) => { out = out.replace(re, (_t, a: string, b: string) => a + valor + b); };
  const loc = m.locale ?? LOCALES[0];
  if (m.titulo) {
    const tit = esc(`${m.titulo} · Linvuu`);
    out = out.replace(/<title>[^<]*<\/title>/, () => `<title>${tit}</title>`);
    troca(/(<meta property="og:title" content=")[^"]*(")/, tit);
  }
  if (m.descricao) {
    const desc = esc(m.descricao);
    troca(/(<meta name="description" content=")[^"]*(")/, desc);
    troca(/(<meta property="og:description" content=")[^"]*(")/, desc);
  }
  const url = esc(site + m.caminho);
  troca(/(<html lang=")[^"]*(")/, loc.codigo);
  troca(/(<meta property="og:locale" content=")[^"]*(")/, loc.og);
  troca(/(<meta property="og:url" content=")[^"]*(")/, url);
  troca(/(<link rel="canonical" href=")[^"]*(")/, url);
  const alternativos = alternativosDe(m, site, d).map((x) => `<link rel="alternate" hreflang="${x.hreflang}" href="${esc(x.href)}" />`).join('\n    ');
  out = out.replace(/<link rel="alternate" hreflang="pt-BR" href="[^"]*" \/>/, () => alternativos);
  troca(/(<meta name="twitter:card" content=")[^"]*(")/, 'summary_large_image');
  const twitterTitle = esc(`${m.titulo ?? 'Linvuu'} · Linvuu`);
  const twitterDescription = esc(m.descricao ?? 'Cursos de idiomas Linvuu.');
  out = out.replace('</head>', () => `<meta name="twitter:title" content="${twitterTitle}" /><meta name="twitter:description" content="${twitterDescription}" /><meta name="twitter:image" content="${esc(site)}/brand/avatar-1080.png" />\n</head>`);
  if (m.jsonld?.length) out = out.replace('</head>', () => m.jsonld!.map((j) => `    <script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>\n`).join('') + '  </head>');
  const conteudo = conteudoRota(m, d, loc);
  if (conteudo) out = out.replace('<div id="root"></div>', () => `<div id="root">${conteudo}</div>`);
  if (m.semIndice) out = out.replace('</head>', () => '    <meta name="robots" content="noindex" />\n  </head>');
  // Marca a rota cujo <head> veio pronto do servidor: o navegador não reescreve título, robots, canonical nem hreflang dela.
  out = out.replace('</head>', () => `    <meta name="linvuu-rota" content="${esc(m.caminho)}" />\n  </head>`);
  return out;
}

