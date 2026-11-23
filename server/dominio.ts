// Dois domínios, um serviço. linvuu.com.br é o site em português (Brasil); linvuu.com é o site internacional (inglês na raiz).
// Aqui ficam as regras que impedem conteúdo duplicado entre eles e escolhem sitemap, robots e URL base de cada requisição.
import type { Express, Request, Response, NextFunction } from 'express';
import { SITE_URL, SITE_GLOBAL_URL } from '../src/config/site.ts';
import { comPerfil, perfilDoHost, type Perfil } from '../src/i18n/locales.ts';
import { DUVIDAS, caminhoDuvida } from '../src/lib/duvidas.ts';

const HOST_BR = new URL(SITE_URL).hostname;
const HOST_GLOBAL = new URL(SITE_GLOBAL_URL).hostname;

/** Perfil de domínio da requisição. Hosts desconhecidos (onrender.com, localhost) seguem o perfil brasileiro, como sempre. */
export const perfilDaRequisicao = (req: Request): Perfil => perfilDoHost(req.hostname || '');
/** Executa fn (síncrona) com o perfil do domínio da requisição. */
export const noPerfilDe = <T>(req: Request, fn: () => T): T => comPerfil(perfilDaRequisicao(req), fn);

/** URL base (https://host) da requisição quando é um dos nossos domínios; senão a configurada (APP_URL) ou o site brasileiro. */
export function baseDaRequisicao(req: Request, padrao: string): string {
  const h = (req.hostname || '').toLowerCase();
  return h === HOST_BR || h === HOST_GLOBAL ? `https://${h}` : padrao;
}

/** O que o servidor deve responder antes de montar a página, ou null para seguir. Pura, para teste. */
export function redirecionamentoDeDominio(host: string, caminho: string, consulta: string): string | null {
  const h = host.toLowerCase();
  const q = consulta ? `?${consulta}` : '';
  if (h === `www.${HOST_GLOBAL}`) return `${SITE_GLOBAL_URL}${caminho}${q}`;
  if (h === `www.${HOST_BR}`) return `${SITE_URL}${caminho}${q}`;
  const prefixo = caminho.match(/^\/(en|es)(?=\/|$)/)?.[1];
  // .com.br: inglês e o antigo espanhol do site vivem (ou viveram) no .com. 301 permanente: o Google transfere a relevância.
  // O site em espanhol foi retirado (2026-11-06); /es/... leva ao mesmo caminho em inglês. O curso de espanhol (/curso/es) não tem prefixo e segue igual.
  // Sem o prefixo, o resto do caminho decide o domínio num salto só (ex.: /es/livros vai direto ao .com.br/livros).
  if (prefixo && (h === HOST_BR || h === HOST_GLOBAL)) { const resto = caminho.slice(3) || '/'; return redirecionamentoDeDominio(HOST_GLOBAL, resto, consulta) ?? `${SITE_GLOBAL_URL}${resto}${q}`; }
  // .com.br: o curso de português para estrangeiros é explicado em inglês, então a página e a gramática dele moram no .com.
  if (h === HOST_BR && /^\/portugues\/?$/.test(caminho)) return `${SITE_GLOBAL_URL}/curso/br${q}`;
  if (h === HOST_BR && /^\/gramatica\/br(\/|$)/.test(caminho)) return `${SITE_GLOBAL_URL}${caminho}${q}`;
  // .com: o inglês é a raiz; /en/... era o endereço antigo (e o de quem digita por hábito); /es/... também.
  // Desde 19/11/2026 (Felipe: o .com espelha o .com.br) o .com tem a própria coleção /livros, em inglês, com o único livro
  // escrito em inglês: o de português para quem fala inglês (/livros/br). Os livros em português continuam no .com.br.
  if (h === HOST_GLOBAL && /^\/livros\/(?!br(\/|$))[^/]+/.test(caminho)) return `${SITE_URL}${caminho}${q}`;
  // .com.br: o livro de português para estrangeiros é escrito em inglês, então mora no .com (como /curso/br).
  if (h === HOST_BR && /^\/livros\/br(\/|$)/.test(caminho)) return `${SITE_GLOBAL_URL}${caminho}${q}`;
  // .com: o hub /materiais-gratuitos existe em inglês desde 19/11/2026; os guias de alfabeto (explicados em português)
  // continuam só no .com.br.
  if (h === HOST_GLOBAL && /^\/materiais-gratuitos\/.+/.test(caminho)) return `${SITE_URL}${caminho}${q}`;
  // .com: as páginas de dúvida (src/lib/duvidas.ts) são escritas em português para quem fala português: moram no .com.br.
  if (h === HOST_GLOBAL && DUVIDAS.some((x) => caminho.replace(/\/+$/, '') === caminhoDuvida(x))) return `${SITE_URL}${caminho}${q}`;
  // .com: a página para ex-alunos da Udemy existe só em português (o curso da Udemy é para brasileiros): mora no .com.br.
  if (h === HOST_GLOBAL && /^\/ex-alunos-udemy(\/|$)/.test(caminho)) return `${SITE_URL}${caminho}${q}`;
  // .com: o livro de gramática russa só existe em português (antes respondia 200 com título em PT no site em inglês).
  if (h === HOST_GLOBAL && /^\/livro\/gramatica-ru(\/|$)/.test(caminho)) return `${SITE_URL}${caminho}${q}`;
  // .com: o curso de inglês é para quem fala português (explicado em português) e mora no .com.br; quem já fala inglês não o vê aqui.
  if (h === HOST_GLOBAL && /^\/(curso|gramatica)\/en(\/|$)/.test(caminho)) return `${SITE_URL}${caminho}${q}`;
  // .com: /portugues e /curso/br disputavam a mesma busca; desde 13/11/2026 (Felipe) /curso/br é a página do curso.
  if (h === HOST_GLOBAL && /^\/portugues\/?$/.test(caminho)) return `${SITE_GLOBAL_URL}/curso/br${q}`;
  // .com: o curso de português só existe com explicação em inglês (/curso/br); o resto em português mora no .com.br
  return null;
}

export function registrarDominio(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') { next(); return; }
    if (/^\/(api|audio|assets|healthz|\.well-known)(\/|$)/.test(req.path) || /\.[a-z0-9]{2,5}$/i.test(req.path)) { next(); return; }
    const q = req.originalUrl.indexOf('?');
    const alvo = redirecionamentoDeDominio(req.hostname || '', req.path, q >= 0 ? req.originalUrl.slice(q + 1) : '');
    if (alvo) { res.redirect(301, alvo); return; }
    next();
  });
}
