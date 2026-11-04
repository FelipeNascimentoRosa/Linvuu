// Título, descrição e endereço de cada rota, para o servidor entregar o HTML já com as metatags certas
// (o WhatsApp, o Facebook e outros robôs não executam JavaScript; sem isto, todo link mostraria o texto da página inicial).
// Vale para os três idiomas do site: / (português), /en e /es.
import { COMECAR } from './comecar.ts';
import { HOME_BR } from '../config/oferta-publica.ts';
import fs from 'node:fs';
import path from 'node:path';
import { SESSOES_GRATIS, SESSOES_POR_AULA, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX, PRECO_ANUAL } from '../config/planos.ts';
import { LOCALES, Locale, caminhoEm, localeDoCaminho, semPrefixo } from '../i18n/locales.ts';
import { EMAIL_OFICIAL } from '../config/site.ts';
import { CONTATO, EX_ALUNOS, POR_QUE } from './institucional.ts';
import { EXCLUSAO } from './exclusaoConta.ts';
import { contatos } from '../config/contato.ts';
import { AUTORES, CAPITULOS_GRATIS, LIVROS_DESCRICAO, LIVROS_EM_PRODUCAO, LIVROS_META, capituloParaHtml, livroMeta, minutosDeLeitura, tituloLivro, type CapituloLivro, type ItemSumario } from './livros.ts';
import { APRESENTACOES_CURSO, APRESENTACOES_LIVRO } from './apresentacoes.ts';

type CursoMeta = { id: string; nome: string; descricao: string; status?: string; i18n?: Record<string, { nome: string; descricao: string }> };
export type DadosMeta = {
  raiz?: string;
  livros: Record<string, { sumario: ItemSumario[]; caps: Record<number, CapituloLivro> }>;
  cursos: CursoMeta[];
  indice: Record<string, { total: number; grupos?: { aula: number; titulo: string; dias: [number, number] }[]; fonte?: string; tr?: Record<string, { g: Record<string, string>; aulas?: number[] }> }>;
};
export type MetaRota = { status: number; titulo?: string; descricao?: string; caminho: string; semIndice?: boolean; jsonld?: object[]; locale?: Locale; /** idiomas em que a página existe (hreflang); padrão: os três */ em?: Locale['codigo'][] };

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
    pt: 'Português para estrangeiros · Brazilian Portuguese', ptD: 'Curso de português do Brasil para estrangeiros, do A1 ao B1, com aulas explicadas em inglês ou espanhol. 62 aulas.',
    curso: (n: string) => `${n}: curso para quem fala português, do zero ao B1`, cursoJ: (n: string) => `${n} para quem fala português`, inicio: 'Início',
    aula: (a: number, t: string, n: string) => `Aula ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number) => `${n}, aula ${a} (${t}), sessão ${s} de ${tot}: explicação em português, áudio em cada frase e exercícios com correção.`,
    sessao: (s: number, n: string) => `Sessão ${s} · ${n}`, gram: 'Gramática', gramC: (n: string) => `Gramática: ${n.toLowerCase()}`, gramD: (n: string) => `Gramática de ${n.toLowerCase()} explicada em português, tópico por tópico, com tabelas, exemplos e erros comuns.`, nao: 'Página não encontrada',
  },
  en: {
    cursos: 'Courses', entrar: 'Sign in', cadastro: 'Sign up', assinatura: 'Subscription', priv: 'Privacy policy', privD: 'What data Linvuu collects, why, and what your rights are.', termos: 'Terms of use', termosD: 'Rules for using the Linvuu site and courses.',
    pt: 'Brazilian Portuguese for English speakers, A1 to B1', ptD: 'Learn Brazilian Portuguese from zero to B1 in 62 lessons explained in English, with audio, dialogues, grammar and exercises.',
    curso: (n: string) => `Learn ${n} online, from zero to B1: course for English speakers`, cursoJ: (n: string) => `${n} for English speakers`, inicio: 'Home',
    aula: (a: number, t: string, n: string) => `Lesson ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number) => `${n}, lesson ${a} (${t}), session ${s} of ${tot}: explained in English, with audio for every sentence and exercises.`,
    sessao: (s: number, n: string) => `Session ${s} · ${n}`, gram: 'Grammar', gramC: (n: string) => `${n} grammar for English speakers`, gramD: (n: string) => `${n} grammar explained in English, topic by topic, with tables, examples and common mistakes. Free topics included.`, nao: 'Page not found',
  },
  es: {
    cursos: 'Cursos', entrar: 'Entrar', cadastro: 'Regístrate', assinatura: 'Suscripción', priv: 'Política de privacidad', privD: 'Qué datos recoge Linvuu, para qué y cuáles son tus derechos.', termos: 'Términos de uso', termosD: 'Reglas de uso del sitio y de los cursos de Linvuu.',
    pt: 'Portugués de Brasil para hispanohablantes, de A1 a B1', ptD: 'Aprende portugués de Brasil de cero a B1 en 62 lecciones explicadas en español, con audio, diálogos, gramática y ejercicios.',
    curso: (n: string) => `${n} para hispanohablantes, de cero a B1`, cursoJ: (n: string) => `${n} para hispanohablantes`, inicio: 'Inicio',
    aula: (a: number, t: string, n: string) => `Lección ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number) => `${n}, lección ${a} (${t}), sesión ${s} de ${tot}: explicado en español, con audio en cada frase y ejercicios.`,
    sessao: (s: number, n: string) => `Sesión ${s} · ${n}`, gram: 'Gramática', gramC: (n: string) => `Gramática: ${n.toLowerCase()}`, gramD: (n: string) => `Gramática de ${n.toLowerCase()} explicada en español, tema por tema, con tablas, ejemplos y errores frecuentes.`, nao: 'Página no encontrada',
  },
} as const;
const HOME = {
  'pt-BR': { titulo: HOME_BR.tituloSeo, descricao: HOME_BR.descricao },
  en: { titulo: 'Language courses for English speakers', descricao: 'Brazilian Portuguese, Spanish, French, Italian, German and Russian courses for English speakers. Explanations in English, audio and exercises. Try 2 free lessons.' },
  es: { titulo: 'Cursos de idiomas para hispanohablantes', descricao: 'Cursos de portugués de Brasil, inglés, francés, italiano, alemán y ruso para hispanohablantes. Explicaciones en español, audio y ejercicios. Prueba 2 clases gratis.' },
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
  if (p === '/sobre') return { status: 200, caminho: p, titulo: 'Quem escreve a Linvuu', descricao: 'A Linvuu é feita por Felipe Nascimento Rosa e Luiza Nascimento Rosa, matemáticos com experiência em linguística e ensino de idiomas. Conheça a autoria, a origem e o método.', ...livroBase, jsonld: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Quem escreve a Linvuu', url: `${SITE}/sobre`, inLanguage: 'pt-BR', mainEntity: { '@id': ORG_ID } }, organizacao(), ...AUTORES.map(pessoa)] };
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
  const fixas: Record<string, { titulo: string; descricao?: string; semIndice?: boolean }> = {
    '/cursos': { titulo: tx.cursos, descricao: loc.codigo === 'pt-BR' ? 'Cursos de idiomas Linvuu: sem medo de gramática, com sessões de 30 minutos. Experimente duas aulas gratuitas.' : loc.codigo === 'en' ? 'Linvuu language courses: grammar without fear, with 30-minute sessions. Try two lessons for free.' : 'Cursos de idiomas Linvuu: gramática sin miedo, con sesiones de 30 minutos. Prueba dos clases gratis.' },
    '/portugues': { titulo: tx.pt, descricao: tx.ptD },
    '/entrar': { titulo: tx.entrar, semIndice: true },
    '/cadastro': { titulo: tx.cadastro, semIndice: true },
    '/livro/gramatica-ru': { titulo: 'Gramática russa A1–A2', semIndice: true },
    '/assinatura': loc.codigo === 'pt-BR' ? { titulo: 'Planos e assinatura', descricao: 'Aprenda idiomas com a Linvuu: planos mensal, trimestral com 30% OFF no Pix e anual. Experimente duas aulas grátis, sem cartão.' } : { titulo: tx.assinatura, semIndice: true },
    '/privacidade': { titulo: tx.priv, descricao: tx.privD },
    '/termos': { titulo: tx.termos, descricao: tx.termosD },
    '/excluir-conta': { titulo: EXCLUSAO[loc.codigo].titulo, descricao: EXCLUSAO[loc.codigo].descricao },
  };
  if (fixas[p]) {
    const jsonld: object[] = [];
    if (p === '/cursos' && d) jsonld.push({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: d.cursos.filter((c) => c.status !== 'em-breve' && c.id !== loc.cursoOculto).map((c, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Course', name: c.nome, description: c.descricao, url: `${SITE}${loc.prefixo}/curso/${c.id}`, provider: { '@id': ORG_ID, '@type': 'EducationalOrganization', name: 'Linvuu' } } })) });
    if (p === '/assinatura' && loc.codigo === 'pt-BR') jsonld.push(
      { '@context': 'https://schema.org', '@type': 'Product', name: 'Assinatura Linvuu', description: fixas[p].descricao, image: `${SITE}/brand/linvuu-logo.png`, offers: [ ['Mensal', '139.00'], ['Trimestral Pix', '291.90'], ['Trimestral cartão ou boleto', '417.00'], ['Anual', '999.00'] ].map(([name, price]) => ({ '@type': 'Offer', name, price, priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: `${SITE}/assinatura` })) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Posso experimentar sem cartão?', acceptedAnswer: { '@type': 'Answer', text: 'As duas primeiras aulas de cada curso são gratuitas, sem cartão.' } }, { '@type': 'Question', name: 'Qual é o desconto no Pix?', acceptedAnswer: { '@type': 'Answer', text: 'O plano trimestral custa R$ 291,90 no Pix, 30% de desconto sobre R$ 417.' } }] },
    );
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
    return {
      status: 200, caminho: p, titulo: tx.curso(c.nome), descricao: c.descricao,
      // o curso escrito para o próprio público deste idioma (ex.: inglês no site em inglês) não entra na busca
      semIndice: c.status === 'em-breve' || c.id === loc.cursoOculto || undefined,
      em: LOCALES.filter((l) => l.cursoOculto !== c.id).map((l) => l.codigo),
      jsonld: [
        // Dados de curso do Google (Course info): provedor, oferta (2 aulas grátis, depois assinatura) e instância online no ritmo do aluno.
        {
          '@context': 'https://schema.org', '@type': 'Course', name: tx.cursoJ(c.nome), description: c.descricao, inLanguage: loc.codigo, url,
          teaches: c.id === 'br' ? 'Brazilian Portuguese' : c.nome, educationalLevel: 'A1–B1 (CEFR)', isAccessibleForFree: false,
          ...(aulas ? { coursePrerequisites: 'None', timeRequired: `PT${aulas * 2}H` } : {}),
          provider: { '@type': 'EducationalOrganization', '@id': ORG_ID, name: 'Linvuu', url: SITE, logo: `${SITE}/brand/linvuu-logo.png` },
          offers: [{ '@type': 'Offer', category: 'Subscription', price: 139, priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: `${SITE}${loc.prefixo}/assinatura` }],
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
    // A apresentacao publica do curso continua indexavel. Sessoes sem amostra publica nao entram no indice.
    return { status: 200, caminho: p, titulo: `${tx.aula(g.aula, t, c.nome)} · ${tx.sessao(n, c.nome).split(' · ')[0]}`, descricao: tx.aulaD(c.nome, g.aula, t, n, total), semIndice: n > SESSOES_GRATIS || !temNo(loc) || undefined, em: LOCALES.filter(temNo).map((l) => l.codigo),
      // Sessão grátis: dados de recurso educacional, sempre gratuito (as demais são por assinatura e não ganham marcação de gratuidade)
      jsonld: n <= SESSOES_GRATIS ? [{
        '@context': 'https://schema.org', '@type': 'LearningResource', name: tx.aula(g.aula, t, c.nome), description: tx.aulaD(c.nome, g.aula, t, n, total), url: `${SITE}${caminhoEm(loc.codigo, p)}`,
        inLanguage: loc.codigo, learningResourceType: 'Lesson', educationalLevel: 'A1 (CEFR)', teaches: c.nome, timeRequired: 'PT30M', isAccessibleForFree: true,
        isPartOf: { '@type': 'Course', name: tx.cursoJ(c.nome), url: `${SITE}${caminhoEm(loc.codigo, `/curso/${c.id}`)}` }, provider: { '@id': ORG_ID },
      }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: tx.inicio, item: `${SITE}${loc.prefixo || '/'}` }, { '@type': 'ListItem', position: 2, name: c.nome, item: `${SITE}${caminhoEm(loc.codigo, `/curso/${c.id}`)}` }, { '@type': 'ListItem', position: 3, name: tx.sessao(n, c.nome), item: `${SITE}${caminhoEm(loc.codigo, p)}` }] }] : undefined };
  }
  m = p.match(/^\/gramatica(?:\/([^/]+))?$/);
  if (m) {
    if (!m[1]) return { status: 200, caminho: p, titulo: tx.gram };
    const c = curso(m[1]);
    return c ? { status: 200, caminho: p, titulo: tx.gramC(c.nome), descricao: tx.gramD(c.nome), semIndice: c.id === loc.cursoOculto || c.status === 'em-breve' || undefined } : naoEncontrada(p, loc);
  }
  return naoEncontrada(p, loc);
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
    corpo = cabeca(base === '/' && loc.codigo === 'pt-BR' ? HOME_BR.titulo : (base === '/cursos' ? tx.cursos : home.titulo) ?? 'Linvuu · Idiomas para quem fala português', m.descricao ?? home.descricao ?? 'Cursos de inglês, espanhol, alemão, francês, italiano e russo para quem fala português.') + `<h2>${esc(tx.cursos)}</h2>` + li(visiveis.map((c) => `${a(`/curso/${c.id}`, c.nome)}: ${esc(c.descricao)}`)) + `<p>${loc.codigo === 'pt-BR' ? 'Criada por' : loc.codigo === 'es' ? 'Creada por' : 'Created by'} ${AUTORES.map((x) => esc(x.nome)).join(loc.codigo === 'pt-BR' ? ' e ' : loc.codigo === 'es' ? ' y ' : ' and ')}.</p>`
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
      if (c && d?.raiz && /^[a-z]{2}$/.test(mc[1]) && fs.existsSync(path.join(d.raiz, 'content', 'gramatica', `${mc[1]}.json`))) corpo += `<p>${a(`/gramatica/${mc[1]}`, tx.gramC(c.nome))}</p>`;
    } else if (md) {
      corpo = cabeca(m.titulo ?? '', m.descricao) + (loc.codigo === 'pt-BR' ? sessaoGratisParaHtml(d, md[1], Number(md[2])) : loc.codigo === 'en' ? sessaoGratisEnParaHtml(d, md[1], Number(md[2])) : '') + `<p>${a(`/curso/${md[1]}`, visiveis.find((x) => x.id === md[1])?.nome ?? md[1])}</p>`;
    } else if (mg && ((loc.codigo === 'pt-BR' && mg[1] !== 'br') || (loc.codigo === 'en' && (mg[1] === 'br' || (!!d?.raiz && /^[a-z]{2}$/.test(mg[1]) && fs.existsSync(path.join(d.raiz, 'content', 'gramatica', `${mg[1]}.en.json`))))))) {
      corpo = cabeca(m.titulo ?? '', m.descricao) + gramaticaGratisParaHtml(d, mg[1], loc.codigo === 'en' && mg[1] !== 'br' ? 'en' : 'pt') + `<p>${a(`/curso/${mg[1]}`, visiveis.find((x) => x.id === mg[1])?.nome ?? mg[1])}</p>`;
    } else if (m.titulo) {
      corpo = cabeca(m.titulo, m.descricao);
    }
  }
  if (base === '/assinatura' && loc.codigo === 'pt-BR') corpo = cabeca(m.titulo ?? '', m.descricao) + `<h2 id="oferta-atual">Assinatura Linvuu</h2><p>Acesso a todos os cursos de idiomas.</p><ul><li>Mensal: ${esc(PRECO_MENSAL)}, com renovação automática.</li><li>3 meses: ${esc(PRECO_TRIMESTRAL_PIX)} no Pix (30% OFF) ou ${esc(PRECO_TRIMESTRAL)} no cartão ou boleto, pagamento único.</li><li>12 meses: ${esc(PRECO_ANUAL)}, pagamento único.</li></ul><h2>Posso experimentar sem cartão?</h2><p>As duas primeiras aulas de cada curso são gratuitas, sem cartão.</p><h2>Qual é o desconto no Pix?</h2><p>O plano trimestral custa R$ 291,90 no Pix, 30% de desconto sobre R$ 417.</p><p>${a('/cursos', 'Testar 2 aulas grátis, sem cartão')} · ${a('/cadastro', 'Criar conta')} · ${a('/termos', 'Consultar termos e condições')}</p>`;
  if (base === '/excluir-conta') {
    // Sem JavaScript a página continua útil: texto completo e o endereço para o pedido.
    const x = EXCLUSAO[loc.codigo];
    corpo = cabeca(x.titulo, x.lead) + x.secoes.map((s, i) => `<h2>${esc(s.titulo)}</h2>${s.passos ? `<ol>${s.passos.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>` : ''}${s.itens ? li(s.itens.map(esc)) : ''}${(s.paragrafos ?? []).map((p) => `<p>${esc(p)}</p>`).join('')}${i === 0 ? `<p>${esc(x.formulario.alternativa)} <a href="mailto:${EMAIL_OFICIAL}">${EMAIL_OFICIAL}</a>.</p>` : ''}`).join('');
  }
  if (base === '/sobre') corpo = cabeca(m.titulo ?? '', m.descricao) + AUTORES.map((x) => `<h2 id="${x.id}">${esc(x.nome)}</h2><p>Autoria, revisão e adaptação dos livros e das aulas da Linvuu. ${x.links.map((u) => `<a href="${esc(u)}" rel="me">${/linkedin/.test(u) ? 'LinkedIn' : 'Facebook'}</a>`).join(' · ')}</p>`).join('');
  if (base === '/por-que-linvuu') corpo = cabeca(POR_QUE.titulo, POR_QUE.descricao) + `<p>${esc(POR_QUE.lead)}</p>` + POR_QUE.motivos.map((x) => `<h2 id="${x.id}">${esc(x.titulo)}</h2><p>${esc(x.texto)}</p>`).join('') + `<h2>Para quem é</h2><p>${esc(POR_QUE.paraQuem)}</p><p><a href="/cursos">Veja os cursos</a> · <a href="/livros">Leia os livros</a> · <a href="/contato">Fale com a gente</a></p>`;
  if (base === '/contato') corpo = cabeca(CONTATO.titulo, CONTATO.descricao) + `<p>${esc(CONTATO.lead)}</p>` + li(contatos().filter((c) => c.id !== 'linkedin').map((c) => `<a href="${esc(c.href)}">${esc(c.nome)}: ${esc(c.rotulo)}</a>`)) + `<h2 id="linkedin">LinkedIn</h2>` + li(AUTORES.map((x) => `<a href="${esc(x.links[0])}" rel="me">${esc(x.nome)}</a>`));
  if (base === '/ex-alunos-udemy') corpo = cabeca(EX_ALUNOS.titulo, EX_ALUNOS.descricao) + `<p>${esc(EX_ALUNOS.lead)}</p><h2>O que você encontra na Linvuu</h2>` + li(EX_ALUNOS.beneficios.map((x) => esc(x))) + `<h2>Como pedir sua condição especial</h2><ol>${EX_ALUNOS.passos.map((x) => `<li>${esc(x)}</li>`).join('')}</ol><p>${esc(EX_ALUNOS.aviso)}</p>` + `<h2>Perguntas frequentes</h2>` + EX_ALUNOS.perguntas.map((q) => `<h3>${esc(q.p)}</h3><p>${esc(q.r)}</p>`).join('');
  const menu = loc.codigo === 'pt-BR' ? '<nav aria-label="Principal"><a href="/cursos">Cursos</a> · <a href="/livros">Livros</a> · <a href="/sobre">Quem somos</a> · <a href="/por-que-linvuu">Por que estudar com a Linvuu?</a> · <a href="/contato">Contato</a> · <a href="/privacidade">Privacidade</a></nav>' : '';
  return corpo ? `<main data-prerender>${menu}${corpo}</main>` : '';
}

/** Sessão de aula grátis (dias 1 a SESSOES_GRATIS) em HTML simples para quem não executa JavaScript. O que é pago nunca passa por aqui. */
type Bloco = Record<string, any>;
const cacheGramatica = new Map<string, string>();
/** Apenas tópicos públicos que a página também mostra a visitantes após carregar a API. */
function gramaticaGratisParaHtml(d: DadosMeta | null, idioma: string, explicacao: 'pt' | 'en' = 'pt'): string {
  if (!d?.raiz || !/^[a-z]{2}$/.test(idioma)) return '';
  const arquivo = path.join(d.raiz, 'content', 'gramatica', explicacao === 'en' ? `${idioma}.en.json` : `${idioma}.json`);
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
/** Sessão gratuita (dias 1 a 8) explicada em inglês, lida de content/idiomas/<curso>/en/dia-NNN.json. Mesma regra de privacidade da versão em português. */
function sessaoGratisEnParaHtml(d: DadosMeta | null, curso: string, dia: number): string {
  if (!d?.raiz || dia < 1 || dia > SESSOES_GRATIS || !/^[a-z]{2}$/.test(curso)) return '';
  const f = path.join(d.raiz, 'content', 'idiomas', curso, 'en', `dia-${String(dia).padStart(3, '0')}.json`);
  let arq = cacheSessoesEn.get(f);
  if (!arq) { try { arq = JSON.parse(fs.readFileSync(f, 'utf8')); cacheSessoesEn.set(f, arq); } catch { return ''; } }
  const sessao = arq.sessao;
  if (!sessao?.blocos) return '';
  const t = (x: unknown) => esc(String(x ?? ''));
  const en = (x: Bloco) => x.en ?? x.pt;
  const paras = (x: string) => String(x ?? '').split(/\s*(?:PASSO|STEP) \d+:\s*/).filter(Boolean).map((y) => `<p>${t(y)}</p>`).join('');
  const tab = (linhas: Bloco[]) => linhas?.length ? `<table><thead><tr>${Object.keys(linhas[0]).map((k) => `<th>${t(k)}</th>`).join('')}</tr></thead><tbody>${linhas.map((l) => `<tr>${Object.values(l).map((v) => `<td>${t(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
  const partes: string[] = [`<p>${t(arq.objetivo)}</p>`];
  for (const b of sessao.blocos as Bloco[]) {
    if (b.tipo === 'intro' || b.tipo === 'revisao') partes.push(`<p>${t(b.texto ?? b.enunciado)}</p>`);
    else if (b.tipo === 'palavras') partes.push(`<h2>Vocabulary</h2>${tab((b.itens ?? []).map((i: Bloco) => ({ [curso]: i.ru, pronunciation: i.translit, english: en(i) })))}`);
    else if (b.tipo === 'alfabeto') partes.push(`<h2>Alphabet and sounds</h2>` + (b.grupos ?? []).map((g: Bloco) => `<h3>${t(g.nome)}</h3>${tab((g.letras ?? []).map((l: Bloco) => ({ letter: `${l.maiuscula} ${l.minuscula}`, sound: l.som, example: l.exemplo, english: l.exemploPt })))}`).join(''));
    else if (b.tipo === 'gramatica') partes.push(`<h2>${t(b.titulo)}</h2>${paras(b.explicacao)}${b.comparacao ? `<p><strong>In English:</strong> ${t(b.comparacao)}</p>` : ''}${b.exemplos ? `<ul>${b.exemplos.map((e: Bloco) => `<li>${t(e.ru)} — ${t(en(e))}</li>`).join('')}</ul>` : ''}${b.tabela ? tab(b.tabela) : ''}${(b.tabelas ?? []).map((x: Bloco) => `<h3>${t(x.titulo)}</h3>${tab(x.linhas)}`).join('')}`);
    else if (b.tipo === 'dialogo') partes.push(`<h2>${t(b.titulo)}</h2><p>${t(b.contexto)}</p><ul>${(b.linhas ?? []).map((l: Bloco) => `<li><strong>${t(l.personagem)}:</strong> ${t(l.ru)} <em>${t(en(l))}</em></li>`).join('')}</ul>`);
    else if (b.tipo === 'texto') partes.push(`<h2>${t(b.titulo)}</h2><p>${t(b.ru)}</p><p>${t(en(b))}</p>`);
    else if (b.tipo === 'producao') partes.push(`<p><strong>Practise:</strong> ${t(b.enunciado)}</p>`);
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
const ORG_ID = `${SITE}/#organizacao`;
const organizacao = () => ({ '@context': 'https://schema.org', '@type': 'EducationalOrganization', '@id': ORG_ID, name: 'Linvuu', url: SITE, logo: `${SITE}/brand/linvuu-logo.png`, email: EMAIL_OFICIAL, founder: AUTORES.map((a) => ({ '@type': 'Person', '@id': `${SITE}/sobre#${a.id}`, name: a.nome, sameAs: [...a.links] })) });
const pessoa = (a: (typeof AUTORES)[number]) => ({ '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE}/sobre#${a.id}`, name: a.nome, url: `${SITE}/sobre#${a.id}`, worksFor: { '@id': ORG_ID }, sameAs: [...a.links], knowsAbout: ['Matemática', 'Linguística', 'Ensino de idiomas', 'Inteligência artificial', 'Teoria dos números', 'Álgebra linear'] });
const naoEncontrada = (p: string, loc: Locale): MetaRota => ({ status: 404, caminho: p, titulo: TX[loc.codigo].nao, semIndice: true });
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
  // uma versão por idioma + x-default (português)
  const em = m.semIndice ? [] : LOCALES.filter((l) => !m.em || m.em.includes(l.codigo));
  const alternativos = em.length > 1 ? [...em.map((l) => `<link rel="alternate" hreflang="${l.codigo}" href="${esc(site + caminhoEm(l.codigo, m.caminho))}" />`), ...(em.some((l) => l.codigo === 'pt-BR') ? [`<link rel="alternate" hreflang="x-default" href="${esc(site + caminhoEm('pt-BR', m.caminho))}" />`] : [])].join('\n    ') : '';
  out = out.replace(/<link rel="alternate" hreflang="pt-BR" href="[^"]*" \/>/, () => alternativos);
  troca(/(<meta name="twitter:card" content=")[^"]*(")/, 'summary_large_image');
  const twitterTitle = esc(`${m.titulo ?? 'Linvuu'} · Linvuu`);
  const twitterDescription = esc(m.descricao ?? 'Cursos de idiomas Linvuu.');
  out = out.replace('</head>', () => `<meta name="twitter:title" content="${twitterTitle}" /><meta name="twitter:description" content="${twitterDescription}" /><meta name="twitter:image" content="${esc(site)}/brand/avatar-1080.png" />\n</head>`);
  if (m.jsonld?.length) out = out.replace('</head>', () => m.jsonld!.map((j) => `    <script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>\n`).join('') + '  </head>');
  const conteudo = conteudoRota(m, d, loc);
  if (conteudo) out = out.replace('<div id="root"></div>', () => `<div id="root">${conteudo}</div>`);
  if (m.semIndice) out = out.replace('</head>', () => '    <meta name="robots" content="noindex" />\n  </head>');
  return out;
}

