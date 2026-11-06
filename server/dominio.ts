// Dois domínios, um serviço. linvuu.com.br é o site em português (Brasil); linvuu.com é o site internacional (inglês na raiz, /es em espanhol).
// Aqui ficam as regras que impedem conteúdo duplicado entre eles e escolhem sitemap, robots e URL base de cada requisição.
import type { Express, Request, Response, NextFunction } from 'express';
import { SITE_URL, SITE_GLOBAL_URL } from '../src/config/site.ts';
import { comPerfil, perfilDoHost, type Perfil } from '../src/i18n/locales.ts';

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
  // .com.br: inglês e espanhol agora vivem no .com. 301 permanente: o Google transfere a relevância.
  if (h === HOST_BR && prefixo) return `${SITE_GLOBAL_URL}${prefixo === 'en' ? caminho.slice(3) || '/' : caminho}${q}`;
  // .com: o inglês é a raiz; /en/... era o endereço antigo (e o de quem digita por hábito).
  if (h === HOST_GLOBAL && prefixo === 'en') return `${SITE_GLOBAL_URL}${caminho.slice(3) || '/'}${q}`;
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
