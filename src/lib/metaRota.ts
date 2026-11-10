// Título, descrição e endereço de cada rota, para o servidor entregar o HTML já com as metatags certas
// (o WhatsApp, o Facebook e outros robôs não executam JavaScript; sem isto, todo link mostraria o texto da página inicial).
// Vale para os dois idiomas do site: português (.com.br) e inglês (.com).
import { aprovadasPorDominio, trechoSchema } from '../config/avaliacoes.ts';
import { REDES } from '../config/social.ts';
import { COMECAR } from './comecar.ts';
import { HOME_BR } from '../config/oferta-publica.ts';
import fs from 'node:fs';
import path from 'node:path';
import { SESSOES_GRATIS, SESSOES_POR_AULA, PRECO_MENSAL, PRECO_TRIMESTRAL, PRECO_TRIMESTRAL_PIX, PRECO_ANUAL, CENTAVOS, CENTAVOS_USD, PRECOS, precoSchema } from '../config/planos.ts';
import { LOCALES, Locale, caminhoEm, localeDoCaminho, localePadrao, semPrefixo, siteDoIdioma, urlAbsolutaEm } from '../i18n/locales.ts';
import { EMAIL_OFICIAL } from '../config/site.ts';
import { CONTATO, EX_ALUNOS } from './institucional.ts';
import { SOBRE } from './sobre.ts';
import { POR_QUE } from './porQue.ts';
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
export type MetaRota = { status: number; titulo?: string; /** título visível (h1) quando for diferente do título de busca — ver `fixas` */ h1?: string; descricao?: string; caminho: string; semIndice?: boolean; /** página-folha (aula/capítulo): o título não leva o sufixo « · Linvuu» */ semMarca?: boolean; jsonld?: object[]; locale?: Locale; /** idiomas em que a página existe (hreflang); padrão: os três */ em?: Locale['codigo'][] };

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
    // títulos traduzidos (content/indice.en.json) entram no índice de cada curso
    for (const l of ['en']) {
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
    cursos: 'Cursos', sobre: 'Quem somos', porQue: 'Por que a Linvuu?', entrar: 'Entrar', cadastro: 'Cadastre-se', assinatura: 'Assinatura', priv: 'Política de privacidade', privD: 'Quais dados a Linvuu coleta, para quê e quais são os seus direitos pela LGPD.', termos: 'Termos de uso', termosD: 'Regras de uso do site e dos cursos da Linvuu.',
    pt: 'Português para estrangeiros · Brazilian Portuguese', ptNav: 'Português para estrangeiros', ptD: 'Curso de português do Brasil para estrangeiros, do A1 ao B1, com aulas explicadas em inglês ou espanhol. 62 aulas.',
    ementa: (n: number) => `As ${n} aulas do curso`, ant: (n: number) => `← Sessão ${n}`, seg: (n: number) => `Sessão ${n} →`,
    curso: (n: string) => `Curso de ${n.toLowerCase()} online, explicado em português`, cursoPrep: (n: string) => `${n}: curso para quem fala português`, cursoJ: (n: string) => `${n} para quem fala português`, inicio: 'Início',
    aula: (a: number, t: string, n: string) => `Aula ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number, lingua: string) => `${n}, aula ${a} (${t}), sessão ${s} de ${tot}: explicação em ${lingua}, áudio em cada frase e exercícios com correção.`,
    sessao: (s: number, n: string) => `Sessão ${s} · ${n}`, dia: (n: number) => `Dia ${n}`, gram: 'Gramática', gramC: (n: string) => `Gramática: ${n.toLowerCase()}`, gramD: (n: string, lingua: string) => `Gramática de ${n.toLowerCase()} explicada em ${lingua}, tópico por tópico, com tabelas, exemplos e erros comuns.`, nao: 'Página não encontrada',
  },
  en: {
    cursos: 'Courses', sobre: 'About Linvuu', porQue: 'Why Linvuu', entrar: 'Sign in', cadastro: 'Sign up', assinatura: 'Subscription', priv: 'Privacy policy', privD: 'What data Linvuu collects, why, and what your rights are.', termos: 'Terms of use', termosD: 'Rules for using the Linvuu site and courses.',
    pt: 'Brazilian Portuguese for English speakers, A1 to B1', ptNav: 'Brazilian Portuguese', ptD: 'Learn Brazilian Portuguese from zero to B1 in 62 lessons explained in English, with audio, dialogues, grammar and exercises.',
    ementa: (n: number) => `All ${n} lessons in the course`, ant: (n: number) => `← Session ${n}`, seg: (n: number) => `Session ${n} →`,
    curso: (n: string) => `Learn ${n} online, explained in English`, cursoPrep: (n: string) => `${n} course: English edition in preparation`, cursoJ: (n: string) => `${n} for English speakers`, inicio: 'Home',
    aula: (a: number, t: string, n: string) => `Lesson ${a}: ${t} · ${n}`, aulaD: (n: string, a: number, t: string, s: number, tot: number, lingua: string) => `${n}, lesson ${a} (${t}), session ${s} of ${tot}: explained in ${lingua}, with audio for every sentence and exercises.`,
    sessao: (s: number, n: string) => `Session ${s} · ${n}`, dia: (n: number) => `Day ${n}`, gram: 'Grammar', gramC: (n: string) => `${n} grammar for English speakers`, gramD: (n: string, lingua: string) => `${n} grammar explained in ${lingua}, topic by topic: tables, examples, common mistakes and a link to the lesson where you practise it.`, nao: 'Page not found',
  },
} as const;
/**
 * Títulos e descrições de SEO das páginas fixas do site em inglês (.com).
 * O rótulo de menu («Courses», «Subscription») serve à navegação; o <title> precisa de 30 a 60 caracteres
 * (com « · Linvuu») e a <meta name="description"> de 120 a 160, com a palavra-chave.
 * Medição de 09/11/2026 no .com (EN_AUDIT.md §F3 e §F4): oito títulos abaixo de 30 caracteres e onze
 * descrições abaixo de 120. O português tem o bloco `SEO_BR` abaixo, com a mesma regra aplicada.
 */
const SEO_EN = {
  cursosT: 'Language courses: Portuguese, French and Russian',
  cursosD: 'Linvuu language courses for English speakers: Brazilian Portuguese, French and Russian explained in English, in 30-minute sessions. Two free lessons.',
  assinaturaT: 'Subscription: monthly and 12-month plans',
  assinaturaD: 'Learn languages with Linvuu: a monthly or 12-month plan, priced in US dollars, and the first two lessons of every course free. No card needed to start.',
  privT: 'Privacy policy: what data Linvuu collects',
  privD: "What data Linvuu collects, why we collect it, how long it stays and what your rights are under Brazil's LGPD data protection law, in plain English.",
  termosT: 'Terms of use for the Linvuu site and courses',
  termosD: 'Rules for using the Linvuu site and courses: payment, cancellation, the 7-day refund and what we expect from each other. Brazilian law applies.',
  entrarT: 'Sign in to your Linvuu account',
  entrarD: 'Sign in to your Linvuu account with e-mail or Google to pick up the course where you stopped, review your answers and keep your progress saved.',
  cadastroT: 'Create your Linvuu account',
  cadastroD: 'Create a free Linvuu account with e-mail or Google, start the first two lessons of any course for free and keep your progress saved.',
  naoD: 'The page you asked for does not exist or has moved. Go back to the Linvuu home page, or see the courses and the free grammar topics.',
  descPadrao: 'Linvuu: language courses for English speakers, with the first two lessons of every course free and no card required to start.',
} as const;
/**
 * Títulos e descrições de SEO das páginas fixas do site em português (.com.br).
 * Mesma regra do `SEO_EN`: rótulo de menu serve à navegação, `<title>` de 30 a 60 caracteres com
 * « · Linvuu» e `<meta name="description">` de 120 a 160, com a palavra que a pessoa digita.
 *
 * Medição de 10/11/2026 no HTML servido de linvuu.com.br: home com 164 caracteres de descrição,
 * `/cursos` com título de 15 («Cursos», só a marca), `/termos` 22/45, `/privacidade` 32/77,
 * `/gramatica/<idioma>` 25–26 e 99–102. No Search Console do mesmo dia (13/10 a 09/11) essas
 * páginas somavam 9 cliques em 28 dias, e `/assinatura` aparecia em posição 2,9 com 33 impressões
 * e nenhum clique — o defeito de metadado mais caro do domínio, porque é a página de preços.
 */
const SEO_BR = {
  cursosT: 'Cursos de idiomas online explicados em português',
  cursosD: 'Cursos de inglês, espanhol, francês, italiano, alemão e russo explicados em português, em sessões de 30 minutos. Duas aulas grátis, sem cartão.',
  assinaturaT: 'Planos e assinatura: mensal, trimestral e anual',
  assinaturaD: 'Aprenda idiomas com a Linvuu: plano mensal, trimestral com 30% OFF no Pix e anual. Duas aulas grátis, sem cartão, e cancelamento quando quiser.',
  privT: 'Política de privacidade: dados, cookies e LGPD',
  privD: 'Quais dados a Linvuu coleta, para quê, por quanto tempo ficam guardados e como exercer os seus direitos de titular pela LGPD. Sem juridiquês.',
  termosT: 'Termos de uso do site e dos cursos',
  termosD: 'Regras de uso do site e dos cursos da Linvuu: planos e pagamento, cancelamento, reembolso em até 7 dias, conteúdo de terceiros e a lei brasileira aplicada.',
  /** Nome de cada língua no feminino/masculino certo: «Gramática do russo», «do alemão», «do inglês». */
  gramT: (n: string) => `Gramática do ${n.toLowerCase()} explicada em português`,
  gramD: (n: string, lingua: string) => `Gramática de ${n.toLowerCase()} explicada em ${lingua}, tópico por tópico: tabelas, exemplos, erros comuns de brasileiros e a aula onde cada tema se pratica.`,
} as const;
/**
 * Descrição usada quando a rota não define uma (404 e páginas sem descrição própria): a do idioma da página.
 * Antes, essas rotas herdavam a descrição do modelo, que é em português — por isso /entrar, /cadastro e a 404
 * serviam texto em português no linvuu.com (EN_AUDIT.md §F2).
 */
const DESC_PADRAO: Record<'pt-BR' | 'en', string> = {
  // A do modelo (index.html) é esta: mantê-la deixa a 404 em português exatamente como estava.
  'pt-BR': 'Cursos de inglês, espanhol, francês, italiano, alemão e russo feitos para brasileiros. Explicações em português, áudio e exercícios. Experimente 2 aulas grátis.',
  en: SEO_EN.descPadrao,
};

/** Nome de cada língua de explicação, escrito na língua da página (para as descrições dizerem a língua real de cada aula/gramática). */
const LINGUAS: Record<string, Record<string, string>> = {
  'pt-BR': { pt: 'português', en: 'inglês' },
  en: { pt: 'Portuguese', en: 'English' },
};
const HOME = {
  'pt-BR': { titulo: HOME_BR.tituloSeo, descricao: HOME_BR.descricao },
  en: { titulo: 'Language courses for English speakers', descricao: 'Courses for English speakers: Brazilian Portuguese, French and Russian explained in English, German, Spanish and Italian in translation. 2 lessons free.' },
};

export function metaDaRota(pathname: string, d: DadosMeta | null): MetaRota {
  const loc = localeDoCaminho(pathname);
  const r = metaSemLocale(semPrefixo(pathname.replace(/\/+$/, '') || '/'), d, loc);
  return { ...r, caminho: caminhoEm(loc.codigo, r.caminho), locale: loc };
}

function metaSemLocale(p: string, d: DadosMeta | null, loc: Locale): MetaRota {
  // Cada idioma mora num domínio (PT no .com.br; EN/ES no .com): a identidade e as URLs absolutas seguem o domínio do idioma da página.
  const SITE = siteDoIdioma(loc.codigo);
  const ORG_ID = orgId(SITE);
  const tx = TX[loc.codigo];
  const ex = loc.explicacao;
  if (p === '/') return { status: 200, caminho: '/', ...HOME[loc.codigo], jsonld: [organizacao(SITE), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Linvuu', url: SITE, inLanguage: loc.codigo }] };
  // Livros: só em português (nos outros idiomas a página existe, mas não entra na busca).
  // /sobre existe nos dois idiomas desde 09/11/2026 — texto em src/lib/sobre.ts, indexável em pt-BR e em inglês.
  const livroBase = { em: ['pt-BR'] as Locale['codigo'][], semIndice: loc.codigo !== 'pt-BR' ? true : undefined };
  if (p === '/sobre') { const s = SOBRE[loc.codigo]; return { status: 200, caminho: p, titulo: s.seoTitulo ?? s.titulo, descricao: s.seoDescricao ?? s.descricao, em: ['pt-BR', 'en'], jsonld: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: s.titulo, url: `${SITE}/sobre`, inLanguage: loc.codigo, mainEntity: { '@id': ORG_ID } }, organizacao(SITE), ...AUTORES.map((a) => pessoa(a, SITE))] }; }
  // /por-que-linvuu existe nos dois idiomas desde 09/11/2026, como o /sobre — texto em src/lib/porQue.ts.
  if (p === '/por-que-linvuu') { const x = POR_QUE[loc.codigo]; return { status: 200, caminho: p, titulo: x.seoTitulo ?? x.titulo, descricao: x.seoDescricao ?? x.descricao, em: ['pt-BR', 'en'], jsonld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: x.titulo, url: `${SITE}/por-que-linvuu`, inLanguage: loc.codigo, about: { '@id': ORG_ID } }, organizacao(SITE)] }; }
  // /contato existe nos dois idiomas desde 09/11/2026: texto em src/lib/institucional.ts (CONTATO).
  // Era a última página de confiança em português no domínio inglês (F1 do EN_AUDIT.md).
  if (p === '/contato') { const c = CONTATO[loc.codigo]; return { status: 200, caminho: p, titulo: c.seoTitulo, descricao: c.seoDescricao, em: ['pt-BR', 'en'], jsonld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: c.titulo, url: `${SITE}/contato`, inLanguage: loc.codigo, about: { '@id': ORG_ID } }, organizacao(SITE)] }; }
  if (p === '/ex-alunos-udemy') return { status: 200, caminho: p, titulo: EX_ALUNOS.titulo, descricao: EX_ALUNOS.descricao, ...livroBase, jsonld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: EX_ALUNOS.titulo, url: `${SITE}/ex-alunos-udemy`, inLanguage: 'pt-BR', about: { '@id': ORG_ID } }, organizacao(SITE)] };
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
    return { status: 200, caminho: p, titulo: `${l.nome}, cap. ${c.n}: ${c.titulo.split(':')[0]}`, semMarca: true, descricao: `${l.nome}, capítulo ${c.n} do livro de gramática prática da Coleção Linvuu: ${c.titulo}. Leitura grátis, com áudio.`, ...livroBase, jsonld: [
      { '@context': 'https://schema.org', '@type': 'Chapter', name: `Capítulo ${c.n}: ${c.titulo}`, position: c.n, url, inLanguage: 'pt-BR', isAccessibleForFree: true, educationalLevel: c.nivel || undefined, timeRequired: `PT${minutosDeLeitura(c)}M`, isPartOf: { '@type': 'Book', name: tituloLivro(l), url: `${SITE}/livros/${l.id}` }, author: AUTORES.map((a) => ({ '@type': 'Person', name: a.nome, url: `${SITE}/sobre#${a.id}` })), publisher: { '@id': ORG_ID } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Livros', item: `${SITE}/livros` }, { '@type': 'ListItem', position: 2, name: l.nome, item: `${SITE}/livros/${l.id}` }, { '@type': 'ListItem', position: 3, name: `Capítulo ${c.n}`, item: url }] },
    ] };
  }
  const fixas: Record<string, { titulo: string; h1?: string; descricao?: string; semIndice?: boolean; em?: Locale['codigo'][] }> = {
    '/cursos': loc.codigo === 'en'
      ? { titulo: SEO_EN.cursosT, descricao: SEO_EN.cursosD }
      : { titulo: SEO_BR.cursosT, descricao: SEO_BR.cursosD },
    // Curso de português para estrangeiros: explicado em inglês, existe só no .com (no .com.br, 301 para cá).
    '/portugues': { titulo: tx.pt, descricao: tx.ptD, em: ['en'] },
    // Aulas ao vivo de russo: existe em português e em inglês; em espanhol a página volta para a home (noindex).
    '/russo-online': { titulo: AULAS_RUSSO[loc.codigo === 'en' ? 'en' : 'pt-BR'].titulo, descricao: AULAS_RUSSO[loc.codigo === 'en' ? 'en' : 'pt-BR'].descricao, em: ['pt-BR', 'en'] },
    '/entrar': loc.codigo === 'en' ? { titulo: SEO_EN.entrarT, descricao: SEO_EN.entrarD, semIndice: true } : { titulo: tx.entrar, semIndice: true },
    '/cadastro': loc.codigo === 'en' ? { titulo: SEO_EN.cadastroT, descricao: SEO_EN.cadastroD, semIndice: true } : { titulo: tx.cadastro, semIndice: true },
    '/livro/gramatica-ru': { titulo: 'Gramática russa A1–A2', semIndice: true },
    // A página de preços existe de verdade nos dois idiomas (um por domínio): indexável nos dois,
    // para os alternates hreflang de uma versão não apontarem para a outra como noindex.
    '/assinatura': loc.codigo === 'pt-BR' ? { titulo: SEO_BR.assinaturaT, h1: 'Planos e assinatura', descricao: SEO_BR.assinaturaD } : { titulo: SEO_EN.assinaturaT, descricao: SEO_EN.assinaturaD },
    '/privacidade': loc.codigo === 'en' ? { titulo: SEO_EN.privT, descricao: SEO_EN.privD } : { titulo: SEO_BR.privT, h1: tx.priv, descricao: SEO_BR.privD },
    '/termos': loc.codigo === 'en' ? { titulo: SEO_EN.termosT, descricao: SEO_EN.termosD } : { titulo: SEO_BR.termosT, h1: tx.termos, descricao: SEO_BR.termosD },
    '/excluir-conta': { titulo: EXCLUSAO[loc.codigo].titulo, descricao: EXCLUSAO[loc.codigo].descricao },
  };
  if (fixas[p]) {
    const jsonld: object[] = [];
    if (p === '/cursos' && d) jsonld.push({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: d.cursos.filter((c) => c.status !== 'em-breve' && c.id !== loc.cursoOculto && explicacaoCompleta(d, c.id, loc.explicacao)).map((c, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Course', name: c.nome, description: c.descricao, url: `${urlAbsolutaEm(loc.codigo, `/curso/${c.id}`)}`, provider: { '@id': ORG_ID, '@type': 'EducationalOrganization', name: 'Linvuu' } } })) });
    if (p === '/assinatura') {
      const en = loc.codigo === 'en';
      jsonld.push(
        { '@context': 'https://schema.org', '@type': 'Product', name: en ? 'Linvuu Subscription' : 'Assinatura Linvuu', description: fixas[p].descricao, image: `${SITE}/brand/linvuu-logo.png`, brand: { '@type': 'Brand', name: 'Linvuu' }, ...trechoSchema(aprovadasPorDominio[en ? 'global' : 'br']), offers: (en ? [['Monthly', precoSchema(CENTAVOS_USD.mensal)], ['Annual', precoSchema(CENTAVOS_USD.anual)]] : [['Mensal', precoSchema(CENTAVOS.mensal)], ['Trimestral Pix', precoSchema(CENTAVOS['trimestral-pix'])], ['Trimestral cartão ou boleto', precoSchema(CENTAVOS.trimestral)], ['Anual', precoSchema(CENTAVOS.anual)]]).map(([name, price]) => ({ '@type': 'Offer', name, price, priceCurrency: en ? 'USD' : 'BRL', availability: 'https://schema.org/InStock', url: `${SITE}/assinatura`, hasMerchantReturnPolicy: POLITICA_REEMBOLSO })) },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: en
          ? [{ '@type': 'Question', name: 'Can I try it without a card?', acceptedAnswer: { '@type': 'Answer', text: 'The first two lessons of every course are free, with no card required.' } }, { '@type': 'Question', name: 'What currency are the prices in?', acceptedAnswer: { '@type': 'Answer', text: 'Prices are in US dollars (US$19.99 a month or US$149 for 12 months, paid by card). The first two lessons of every course are free.' } }]
          : [{ '@type': 'Question', name: 'Posso experimentar sem cartão?', acceptedAnswer: { '@type': 'Answer', text: 'As duas primeiras aulas de cada curso são gratuitas, sem cartão.' } }, { '@type': 'Question', name: 'Qual é o desconto no Pix?', acceptedAnswer: { '@type': 'Answer', text: `O plano trimestral custa ${PRECO_TRIMESTRAL_PIX} no Pix, 30% de desconto sobre ${PRECO_TRIMESTRAL}.` } }] },
      );
    }
    if (p === '/russo-online') jsonld.push({ '@context': 'https://schema.org', '@type': 'Service', name: fixas[p].titulo, description: fixas[p].descricao, serviceType: loc.codigo === 'en' ? 'Online Russian language lessons' : 'Aulas de russo online', inLanguage: loc.codigo, provider: { '@id': ORG_ID }, areaServed: 'Worldwide', url: `${urlAbsolutaEm(loc.codigo, '/russo-online')}` });
    return { status: 200, caminho: p, ...fixas[p], jsonld };
  }
  if (!d) return { status: 503, caminho: p, semIndice: true }; // falha de conteúdo não vira página genérica indexável
  const curso = (id: string) => { const c = d.cursos.find((x) => x.id === id); return c ? { ...c, ...(c.i18n?.[loc.codigo] ?? {}) } : undefined; };
  const tituloAula = (id: string, aula: number, original: string) => ((d.indice[id]?.fonte ?? 'pt') === ex ? original : d.indice[id]?.tr?.[ex]?.g[aula] ?? original);
  let m = p.match(/^\/curso\/([^/]+)$/);
  if (m) {
    const c = curso(m[1]);
    if (!c) return naoEncontrada(p, loc);
    const url = `${urlAbsolutaEm(loc.codigo, p)}`;
    const aulas = d.indice[c.id]?.grupos?.length ?? 0;
    // Indexável só onde o curso existe de verdade: oferecido a esse público e com todas as aulas explicadas na língua dele.
    const oferecidoEm = (l: Locale) => c.status !== 'em-breve' && l.cursoOculto !== c.id && explicacaoCompleta(d, c.id, l.explicacao);
    return {
      status: 200, caminho: p, titulo: oferecidoEm(loc) || c.id === loc.cursoOculto ? (c.id === 'br' ? (loc.codigo === 'en' ? 'Learn Brazilian Portuguese online (A1–B1)' : 'Português para estrangeiros: curso online (A1–B1)') : tx.curso(c.nome)) : tx.cursoPrep(c.nome), descricao: c.descricao,
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
          offers: [{ '@type': 'Offer', category: 'Subscription', price: (loc.codigo === 'en' ? CENTAVOS_USD.mensal : CENTAVOS.mensal) / 100, priceCurrency: loc.codigo === 'en' ? 'USD' : 'BRL', availability: 'https://schema.org/InStock', url: `${urlAbsolutaEm(loc.codigo, '/assinatura')}` }],
          hasCourseInstance: [{ '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT30M', courseSchedule: { '@type': 'Schedule', repeatFrequency: 'Daily', repeatCount: aulas * 4 } }],
        },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: tx.inicio, item: `${urlAbsolutaEm(loc.codigo, '/')}` }, { '@type': 'ListItem', position: 2, name: tx.cursos, item: `${urlAbsolutaEm(loc.codigo, '/cursos')}` }, { '@type': 'ListItem', position: 3, name: c.nome, item: url }] },
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
    // Curso BR (português para estrangeiros): forma curta no título («Portuguese» / «Português»); com o nome completo os dias 1–4
    // passavam de 60 caracteres (decisão do Felipe, 2026-11-04: sem excepções ao limite). H1, descrições e JSON-LD mantêm o nome completo.
    const nomeTitulo = c.id === 'br' ? (loc.codigo === 'en' ? 'Portuguese' : 'Português') : c.nome;
    return { status: 200, caminho: p, titulo: `${t} · ${nomeTitulo} · ${tx.dia(n)}`, semMarca: true, descricao: descAula, semIndice: n > SESSOES_GRATIS || !temNo(loc) || undefined, em: LOCALES.filter(temNo).map((l) => l.codigo),
      // Sessão grátis: dados de recurso educacional, sempre gratuito (as demais são por assinatura e não ganham marcação de gratuidade)
      jsonld: n <= SESSOES_GRATIS ? [{
        '@context': 'https://schema.org', '@type': 'LearningResource', name: tx.aula(g.aula, t, c.nome), description: descAula, url: `${urlAbsolutaEm(loc.codigo, p)}`,
        inLanguage: loc.codigo, learningResourceType: 'Lesson', educationalLevel: 'A1 (CEFR)', teaches: c.nome, timeRequired: 'PT30M', isAccessibleForFree: true,
        isPartOf: { '@type': 'Course', name: tx.cursoJ(c.nome), url: `${urlAbsolutaEm(loc.codigo, `/curso/${c.id}`)}` }, provider: { '@id': ORG_ID },
      }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: tx.inicio, item: `${urlAbsolutaEm(loc.codigo, '/')}` }, { '@type': 'ListItem', position: 2, name: c.nome, item: `${urlAbsolutaEm(loc.codigo, `/curso/${c.id}`)}` }, { '@type': 'ListItem', position: 3, name: tx.sessao(n, c.nome), item: `${urlAbsolutaEm(loc.codigo, p)}` }] }] : undefined };
  }
  m = p.match(/^\/gramatica(?:\/([^/]+))?$/);
  if (m) {
    if (!m[1]) return { status: 200, caminho: p, titulo: tx.gram };
    const c = curso(m[1]);
    if (!c) return naoEncontrada(p, loc);
    const url = `${urlAbsolutaEm(loc.codigo, p)}`;
    const cursoUrl = `${urlAbsolutaEm(loc.codigo, `/curso/${c.id}`)}`;
    // A descrição nomeia a língua em que a gramática está de fato: a língua da página, quando existe o arquivo de gramática nela; senão, a língua em que o curso foi escrito.
    const fonteGram = d.indice[c.id]?.fonte ?? 'pt';
    const temGram = gramaticaExisteEm(d, c.id, loc.explicacao);
    const gramEm = (l: Locale) => l.cursoOculto !== c.id && c.status !== 'em-breve' && gramaticaExisteEm(d, c.id, l.explicacao);
    const linguaGram = LINGUAS[loc.codigo][temGram ? loc.explicacao : fonteGram] ?? '';
    // No pt-BR o título de busca é próprio (`SEO_BR.gramT`): `tx.gramC` («Gramática: russo») continua
    // servindo de rótulo de link no corpo pré-renderizado, onde a frase inteira ficaria pesada.
    const titGram = loc.codigo === 'pt-BR' ? SEO_BR.gramT(c.nome) : tx.gramC(c.nome);
    const descGram = loc.codigo === 'pt-BR' ? SEO_BR.gramD(c.nome, linguaGram) : tx.gramD(c.nome, linguaGram);
    // Alternates só para os públicos a quem o curso é oferecido (mesma regra da página do curso):
    // a gramática de uma língua explicada ao próprio público dela não é uma versão de idioma —
    // declarar esse alternate apontava para a página gémea marcada noindex.
    return {
      // Gramática que ainda não existe neste idioma não é página própria (o conteúdo seria o original, em outra língua).
      status: 200, caminho: p, titulo: titGram, h1: tx.gramC(c.nome), descricao: descGram, semIndice: !gramEm(loc) || undefined, em: LOCALES.filter(gramEm).map((l) => l.codigo),
      jsonld: [
        // A página de gramática é o recurso de referência do curso: tópicos e tabelas cuja descrição nomeia a língua real das explicações.
        { '@context': 'https://schema.org', '@type': 'LearningResource', name: titGram, description: descGram, url, inLanguage: loc.codigo, learningResourceType: 'Grammar reference', teaches: c.nome, isPartOf: { '@type': 'Course', name: tx.cursoJ(c.nome), url: cursoUrl }, provider: { '@id': ORG_ID } },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: tx.inicio, item: `${urlAbsolutaEm(loc.codigo, '/')}` }, { '@type': 'ListItem', position: 2, name: c.nome, item: cursoUrl }, { '@type': 'ListItem', position: 3, name: titGram, item: url }] },
      ],
    };
  }
  return naoEncontrada(p, loc);
}


/**
 * Navegação global do HTML pré-renderizado, na língua da página.
 * Até 2026-11-04 só o português a tinha: sem menu, as aulas e gramáticas em inglês ficavam com
 * 1 único link interno (o de regresso ao curso), contra 7 nas aulas em português (auditoria SEO).
 * Nos outros idiomas os destinos são os que existem e são indexáveis nessa língua: Livros e
 * Ex-alunos da Udemy só existem em português, por isso não entram. Contato entrou no `.com` em 09/11/2026,
 * quando passou a existir em inglês; Sobre, Por-que-Linvuu e Contato existem nas duas línguas.
 */
function menuPreRender(loc: Locale): string {
  if (loc.codigo === 'pt-BR') return '<nav aria-label="Principal"><a href="/cursos">Cursos</a> · <a href="/livros">Livros</a> · <a href="/sobre">Quem somos</a> · <a href="/por-que-linvuu">Por que estudar com a Linvuu?</a> · <a href="/contato">Contato</a> · <a href="/privacidade">Privacidade</a></nav>';
  const tx = TX[loc.codigo];
  const a = (href: string, texto: string) => `<a href="${esc(caminhoEm(loc.codigo, href))}">${esc(texto)}</a>`;
  const itens = [a('/', tx.inicio), a('/cursos', tx.cursos), a('/sobre', tx.sobre), a('/por-que-linvuu', tx.porQue), a('/gramatica', tx.gram), ...(loc.codigo === 'en' ? [a('/portugues', tx.ptNav)] : []), a('/contato', loc.codigo === 'en' ? 'Contact' : 'Contato'), a('/termos', tx.termos), a('/privacidade', tx.priv)];
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
  // Vitrine do domínio: no .com só entram cursos com aulas explicadas em inglês (mesma regra do site em React: cursoComExplicacaoNoSite).
  const vitrine = loc.codigo === 'pt-BR' ? visiveis : visiveis.filter((c) => (d?.indice[c.id]?.fonte ?? 'pt') === loc.explicacao || (d?.indice[c.id]?.tr?.[loc.explicacao]?.aulas?.length ?? 0) > 0);
  const base = semPrefixo(m.caminho);
  let corpo = '';
  if (base === '/' || base === '/cursos') {
    const home = HOME[loc.codigo];
    corpo = cabeca(base === '/' && loc.codigo === 'pt-BR' ? HOME_BR.titulo : (base === '/cursos' ? tx.cursos : home.titulo) ?? 'Linvuu · Idiomas para quem fala português', m.descricao ?? home.descricao ?? 'Cursos de inglês, espanhol, alemão, francês, italiano e russo para quem fala português.') + `<h2>${esc(tx.cursos)}</h2>` + li(vitrine.map((c) => `${a(`/curso/${c.id}`, c.nome)}: ${esc(c.descricao)} · ${a(`/gramatica/${c.id}`, tx.gramC(c.nome))}`))
    if (base === '/' && loc.codigo === 'pt-BR') { corpo += `<p>${esc(HOME_BR.lead)}</p><p>${a('/curso/de', 'Conhecer o curso de alemão')} · ${a('/curso/ru', 'Conhecer o curso de russo')} · ${a('/livros/de', 'Livro de alemão')} · ${a('/livros/es', 'Livro de espanhol')}</p><p>${esc(LIVROS_EM_PRODUCAO)}</p><h2>Ouça, entenda e pratique</h2><p>Explicações em português, áudio e exercícios. Experimente as duas primeiras aulas de cada curso sem cartão.</p><h2 id="planos">A oferta de hoje</h2><p>Acesso aos cursos de idiomas, com explicações em português.</p><ul><li>Mensal: ${esc(PRECO_MENSAL)}, com renovação automática.</li><li>Três meses no Pix: ${esc(PRECO_TRIMESTRAL_PIX)}, pagamento único e 30% de desconto.</li><li>Anual: ${esc(PRECO_ANUAL)}, pagamento único.</li></ul><p>${a('/assinatura', 'Ver todos os detalhes da assinatura')} · ${a('/cursos', 'Experimentar duas aulas grátis')}</p>`; }
    if (base === '/' && loc.codigo !== 'pt-BR') { const g = COMECAR[loc.codigo] ?? COMECAR['pt-BR']; corpo += `<h2>${esc(g.titulo)}</h2><p>${esc(g.lead)}</p><ol>${g.passos.map((x) => `<li><strong>${esc(x.t)}.</strong> ${esc(x.d)}</li>`).join('')}</ol><p>${esc(g.dica)}</p>`; }
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
      corpo = cabeca(m.h1 ?? m.titulo ?? '', m.descricao) + (loc.codigo === 'pt-BR' ? sessaoGratisParaHtml(d, md[1], diaN) : sessaoGratisEnParaHtml(d, md[1], diaN)) + `<p>${navegar.join(' · ')}</p>`;
    } else if (mg && d) {
      // Só chega aqui o que é indexável (o topo da função devolve '' para noindex): a gramática existe na língua da página.
      const suf = (d.indice[mg[1]]?.fonte ?? 'pt') === loc.explicacao ? '' : loc.explicacao;
      corpo = cabeca(m.h1 ?? m.titulo ?? '', m.descricao) + gramaticaGratisParaHtml(d, mg[1], suf) + `<p>${a(`/curso/${mg[1]}`, visiveis.find((x) => x.id === mg[1])?.nome ?? mg[1])}</p>`;
    } else if (m.titulo) {
      corpo = cabeca(m.h1 ?? m.titulo, m.descricao);
    }
  }
  if (base === '/assinatura' && loc.codigo === 'pt-BR') corpo = cabeca(m.h1 ?? m.titulo ?? '', m.descricao) + `<h2 id="oferta-atual">Assinatura Linvuu</h2><p>Acesso a todos os cursos de idiomas.</p><ul><li>Mensal: ${esc(PRECO_MENSAL)}, com renovação automática.</li><li>3 meses: ${esc(PRECO_TRIMESTRAL_PIX)} no Pix (30% OFF) ou ${esc(PRECO_TRIMESTRAL)} no cartão ou boleto, pagamento único.</li><li>12 meses: ${esc(PRECO_ANUAL)}, pagamento único.</li></ul><h2>Posso experimentar sem cartão?</h2><p>As duas primeiras aulas de cada curso são gratuitas, sem cartão.</p><h2>Qual é o desconto no Pix?</h2><p>O plano trimestral custa ${esc(PRECO_TRIMESTRAL_PIX)} no Pix, 30% de desconto sobre ${esc(PRECO_TRIMESTRAL)}.</p><p>${a('/cursos', 'Testar 2 aulas grátis, sem cartão')} · ${a('/cadastro', 'Criar conta')} · ${a('/termos', 'Consultar termos e condições')}</p>`;
  if (base === '/assinatura' && loc.codigo === 'en') corpo = cabeca(m.h1 ?? m.titulo ?? '', m.descricao) + `<h2 id="oferta-atual">Linvuu Subscription</h2><p>Access to every Linvuu course, with explanations in English.</p><ul><li>Monthly: ${esc(PRECOS.en.mensal)}, with automatic renewal.</li><li>12 months: ${esc(PRECOS.en.anual)}, one-time payment by card.</li></ul><h2>Can I try it without a card?</h2><p>The first two lessons of every course are free, with no card required.</p><h2>What currency are the prices in?</h2><p>Prices are in US dollars, paid by card (Apple Pay and Google Pay where your device supports them). Full refund within 7 days.</p><p>${a('/cursos', 'Try 2 free lessons, no card')} · ${a('/cadastro', 'Create account')} · ${a('/termos', 'Read the terms')}</p>`;
  if (base === '/excluir-conta') {
    // Sem JavaScript a página continua útil: texto completo e o endereço para o pedido.
    const x = EXCLUSAO[loc.codigo];
    corpo = cabeca(x.titulo, x.lead) + x.secoes.map((s, i) => `<h2>${esc(s.titulo)}</h2>${s.passos ? `<ol>${s.passos.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>` : ''}${s.itens ? li(s.itens.map(esc)) : ''}${(s.paragrafos ?? []).map((p) => `<p>${esc(p)}</p>`).join('')}${i === 0 ? `<p>${esc(x.formulario.alternativa)} <a href="mailto:${EMAIL_OFICIAL}">${EMAIL_OFICIAL}</a>.</p>` : ''}`).join('');
  }
  if (base === '/russo-online') { const x = AULAS_RUSSO[loc.codigo === 'en' ? 'en' : 'pt-BR']; corpo = cabeca(x.titulo, x.lead) + (x.credenciais.length ? `<h2>${esc(x.quemTitulo)}</h2>` + li(x.credenciais.map(esc)) : '') + (x.relatos && x.relatos.length ? `<h2>${esc(x.relatosTitulo || '')}</h2>` + li(x.relatos.map((r) => esc(`“${r.texto}” — ${r.nome}`))) + `<p>${esc(x.relatosFonte || '')}</p>` : '') + `<h2>${esc(x.playlistTitulo)}</h2><p>${esc(x.playlist)} <a href="${esc(x.playlistUrl)}">${esc(x.playlistBotao)}</a></p>` + `<h2>${esc(x.comoTitulo)}</h2>` + li(x.como.map(esc)) + `<h2>${esc(x.testeTitulo)}</h2><p>${esc(x.teste)} ${a('/curso/ru', x.testeLink)}</p><h2>${esc(x.ctaTitulo)}</h2><p>${esc(x.cta)}</p>`; }
  if (base === '/sobre') {
    // Texto inteiro na língua da página: é o que o Google lê sem executar JavaScript.
    const s = SOBRE[loc.codigo];
    corpo = cabeca(s.titulo, s.descricao) + `<p>${esc(s.lead)}</p><h2 id="sobre-autores">${esc(s.autoresTitulo)}</h2>`
      + AUTORES.map((x) => `<h3 id="${x.id}">${esc(x.nome)}</h3><p>${esc(s.autorPapel)} ${x.links.map((u) => `<a href="${esc(u)}" rel="me">${/linkedin/.test(u) ? 'LinkedIn' : 'Facebook'}</a>`).join(' · ')}</p>`).join('')
      + `<p>${esc(s.bio)}</p><h2>${esc(s.origemTitulo)}</h2><p>${esc(s.origem)}</p><h2>${esc(s.metodoTitulo)}</h2>`
      + s.metodo.map((x) => `<p><strong>${esc(x.titulo)}</strong> ${esc(x.texto)}</p>`).join('')
      + `<h2>${esc(s.audioTitulo)}</h2><p>${esc(s.audio)}</p><h2>${esc(s.ctaTitulo)}</h2><p>${a('/livros', s.ctaLivros)}, ${a('/cursos', s.ctaCursos)} ${esc(s.ctaOu)} <a href="mailto:${EMAIL_OFICIAL}">${EMAIL_OFICIAL}</a>.</p>`;
  }
  if (base === '/por-que-linvuu') {
    // Texto inteiro na língua da página: é o que o Google lê sem executar JavaScript.
    const x = POR_QUE[loc.codigo];
    corpo = cabeca(x.titulo, x.descricao) + `<p>${esc(x.lead)}</p>` + x.motivos.map((m) => `<h2 id="${m.id}">${esc(m.titulo)}</h2><p>${esc(m.texto)}</p>`).join('')
      + `<h2>${esc(x.paraQuemTitulo)}</h2><p>${esc(x.paraQuem)}</p><h2>${esc(x.ctaTitulo)}</h2><p>`
      + x.ctaSegmentos.map((s) => (s.link ? a(s.link, s.texto) : esc(s.texto))).join('') + '</p>';
  }
  if (base === '/contato') { const c = CONTATO[loc.codigo]; corpo = cabeca(c.titulo, c.descricao) + `<p>${esc(c.lead)}</p>` + li(contatos(loc.codigo).filter((x) => x.id !== 'linkedin').map((x) => `<a href="${esc(x.href)}">${esc(x.nome)}: ${esc(x.rotulo)}</a>`)) + `<h2 id="linkedin">LinkedIn</h2><p>${esc(c.autoresNota)}</p>` + li(AUTORES.map((x) => `<a href="${esc(x.links[0])}" rel="me">${esc(x.nome)}</a>`)); }
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
} as const;
/** Sessão gratuita (dias 1 a 8) explicada em inglês ou espanhol: content/idiomas/<curso>/<lingua>/dia-NNN.json,
 * ou o arquivo-base quando essa é a língua-fonte do curso (português para estrangeiros). Mesma regra de privacidade da versão em português. */
function sessaoGratisEnParaHtml(d: DadosMeta | null, curso: string, dia: number, lingua: 'en' = 'en'): string {
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

const SITE_BR = 'https://linvuu.com.br';
// Política real do site (paywall e termos): reembolso integral em até 7 dias.
const POLITICA_REEMBOLSO = { '@type': 'MerchantReturnPolicy', applicableCountry: 'BR', returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow', merchantReturnDays: 7, returnFees: 'https://schema.org/FreeReturn' };
const orgId = (site: string) => `${site}/#organizacao`;
const organizacao = (SITE: string) => ({ '@context': 'https://schema.org', '@type': 'EducationalOrganization', '@id': orgId(SITE), name: 'Linvuu', url: SITE, logo: `${SITE}/brand/linvuu-logo.png`, email: EMAIL_OFICIAL, sameAs: [SITE_BR, siteDoIdioma('en'), ...REDES.filter((r) => r.url).map((r) => r.url)].filter((u) => u !== SITE), founder: AUTORES.map((a) => ({ '@type': 'Person', '@id': `${SITE}/sobre#${a.id}`, name: a.nome, sameAs: [...a.links] })) });
const pessoa = (a: (typeof AUTORES)[number], SITE: string) => ({ '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE}/sobre#${a.id}`, name: a.nome, url: `${SITE}/sobre#${a.id}`, worksFor: { '@id': orgId(SITE) }, sameAs: [...a.links], knowsAbout: ['Matemática', 'Linguística', 'Ensino de idiomas', 'Inteligência artificial', 'Teoria dos números', 'Álgebra linear'] });
const naoEncontrada = (p: string, loc: Locale): MetaRota => ({ status: 404, caminho: p, titulo: TX[loc.codigo].nao, descricao: loc.codigo === 'en' ? SEO_EN.naoD : undefined, semIndice: true });
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Versões por idioma + x-default exatamente como o HTML do servidor as publica (fonte única também para o navegador). */
export function alternativosDe(m: MetaRota, _site: string, d: DadosMeta | null = null): { hreflang: string; href: string }[] {
  // uma versão por idioma + x-default: a versão em português quando faz parte do cluster;
  // sem ela (o curso de português para estrangeiros não existe em PT), a versão no idioma-fonte do conteúdo.
  const em = m.semIndice ? [] : LOCALES.filter((l) => !m.em || m.em.includes(l.codigo));
  if (em.length < 2) return [];
  const idCurso = semPrefixo(m.caminho).match(/^\/(?:curso|gramatica)\/([a-z]{2})/)?.[1];
  const fonte = idCurso ? d?.indice?.[idCurso]?.fonte : undefined;
  const codigoFonte = fonte === 'pt' ? 'pt-BR' : fonte;
  // x-default = a versão para quem não tem versão no seu idioma: inglês (o .com, internacional) quando existe; senão português; senão o idioma-fonte.
  const padrao = em.find((l) => l.codigo === 'en') ?? em.find((l) => l.codigo === 'pt-BR') ?? em.find((l) => l.codigo === codigoFonte) ?? em[0];
  // Cada versão vive no domínio do seu idioma (PT: .com.br; EN/ES: .com), então o cluster hreflang cruza domínios.
  return [...em.map((l) => ({ hreflang: l.codigo, href: urlAbsolutaEm(l.codigo, m.caminho) })), { hreflang: 'x-default', href: urlAbsolutaEm(padrao.codigo, m.caminho) }];
}

/** O que o navegador aplica ao navegar dentro do site: os mesmos valores que o servidor colocaria no HTML desta rota. */
export function metaParaNavegador(m: MetaRota, _site: string, d: DadosMeta | null = null) {
  return { status: m.status, caminho: m.caminho, titulo: m.titulo ? (m.semMarca ? m.titulo : `${m.titulo} · Linvuu`) : null, descricao: m.descricao ?? null, canonical: urlAbsolutaEm((m.locale ?? localePadrao()).codigo, m.caminho), noindex: !!m.semIndice, alternativos: alternativosDe(m, _site, d), lang: (m.locale ?? localePadrao()).codigo };
}

export function aplicarMeta(html: string, m: MetaRota, _site: string, d: DadosMeta | null = null): string {
  let out = html;
  const loc = m.locale ?? localePadrao();
  const site = siteDoIdioma(loc.codigo);
  const troca = (re: RegExp, valor: string) => { out = out.replace(re, (_t, a: string, b: string) => a + valor + b); };
  if (m.titulo) {
    const tit = esc(m.semMarca ? m.titulo : `${m.titulo} · Linvuu`);
    out = out.replace(/<title>[^<]*<\/title>/, () => `<title>${tit}</title>`);
    troca(/(<meta property="og:title" content=")[^"]*(")/, tit);
  }
  // Descrição: a da rota ou, quando ela não define uma, a do idioma da página — nunca a do outro idioma.
  {
    const desc = esc(m.descricao ?? DESC_PADRAO[loc.codigo]);
    troca(/(<meta name="description" content=")[^"]*(")/, desc);
    troca(/(<meta property="og:description" content=")[^"]*(")/, desc);
  }
  const url = esc(urlAbsolutaEm(loc.codigo, m.caminho));
  troca(/(<html lang=")[^"]*(")/, loc.codigo);
  troca(/(<meta property="og:locale" content=")[^"]*(")/, loc.og);
  troca(/(<meta property="og:url" content=")[^"]*(")/, url);
  troca(/(<meta property="og:image" content=")[^"]*(")/, esc(`${site}/brand/avatar-1080.png`));
  troca(/(<link rel="canonical" href=")[^"]*(")/, url);
  const alternativos = alternativosDe(m, _site, d).map((x) => `<link rel="alternate" hreflang="${x.hreflang}" href="${esc(x.href)}" />`).join('\n    ');
  out = out.replace(/<link rel="alternate" hreflang="pt-BR" href="[^"]*" \/>/, () => alternativos);
  troca(/(<meta name="twitter:card" content=")[^"]*(")/, 'summary_large_image');
  const twitterTitle = esc(m.semMarca && m.titulo ? m.titulo : `${m.titulo ?? 'Linvuu'} · Linvuu`);
  const twitterDescription = esc(m.descricao ?? DESC_PADRAO[loc.codigo]);
  out = out.replace('</head>', () => `<meta name="twitter:title" content="${twitterTitle}" /><meta name="twitter:description" content="${twitterDescription}" /><meta name="twitter:image" content="${esc(site)}/brand/avatar-1080.png" />\n</head>`);
  if (m.jsonld?.length) out = out.replace('</head>', () => m.jsonld!.map((j) => `    <script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>\n`).join('') + '  </head>');
  const conteudo = conteudoRota(m, d, loc);
  if (conteudo) out = out.replace('<div id="root"></div>', () => `<div id="root">${conteudo}</div>`);
  if (m.semIndice) out = out.replace('</head>', () => '    <meta name="robots" content="noindex" />\n  </head>');
  // Marca a rota cujo <head> veio pronto do servidor: o navegador não reescreve título, robots, canonical nem hreflang dela.
  out = out.replace('</head>', () => `    <meta name="linvuu-rota" content="${esc(m.caminho)}" />\n  </head>`);
  return out;
}

