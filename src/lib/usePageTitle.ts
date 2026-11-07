import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LOCALE, LOCALES, useT } from '../i18n';
import { siteDoIdioma, urlAbsolutaEm, type CodigoLocale } from '../i18n/locales';
import { sincronizarRobots } from './robotsPagina';

const meta = (sel: string, attr: string, valor: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(sel);
  if (!el) { el = document.createElement('meta'); const [k, v] = attr.split('='); el.setAttribute(k, v); document.head.appendChild(el); }
  el.setAttribute('content', valor);
};
const link = (rel: string, href: string, hreflang?: string) => {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) { el = document.createElement('link'); el.rel = rel; if (hreflang) el.hreflang = hreflang; document.head.appendChild(el); }
  el.href = href;
};

/** O que o servidor publicaria no <head> de uma rota (src/lib/metaRota.ts → metaParaNavegador). */
type MetaServidor = { status: number; caminho: string; titulo: string | null; descricao: string | null; canonical: string; noindex: boolean; alternativos: { hreflang: string; href: string }[] };

const normalizar = (p: string) => p.replace(/\/+$/, '') || '/';
/** Rota cujo <head> veio pronto do servidor (marcada por aplicarMeta); some quando o visitante navega para outra. */
const MARCA = 'meta[name="linvuu-rota"]';
const pedidos = new Map<string, Promise<MetaServidor | null>>();
function metaDoServidor(caminho: string): Promise<MetaServidor | null> {
  let p = pedidos.get(caminho);
  if (!p) {
    p = fetch(`/api/meta?p=${encodeURIComponent(caminho)}`, { credentials: 'omit' })
      .then((r) => (r.ok ? (r.json() as Promise<MetaServidor>) : null))
      // 503 = servidor sem metadados (desenvolvimento): o navegador usa o cálculo local.
      .then((m) => (m && m.status !== 503 ? m : null))
      .catch(() => null);
    p.then((m) => { if (!m) pedidos.delete(caminho); });
    pedidos.set(caminho, p);
  }
  return p;
}

function aplicar(m: { titulo: string; descricao: string; canonical: string; noindex: boolean; alternativos: { hreflang: string; href: string }[] }) {
  sincronizarRobots(document, m.noindex);
  document.title = m.titulo;
  meta('meta[name="description"]', 'name=description', m.descricao);
  meta('meta[property="og:title"]', 'property=og:title', m.titulo);
  meta('meta[property="og:description"]', 'property=og:description', m.descricao);
  meta('meta[property="og:url"]', 'property=og:url', m.canonical);
  meta('meta[property="og:locale"]', 'property=og:locale', LOCALE.og);
  meta('meta[name="twitter:title"]', 'name=twitter:title', m.titulo);
  meta('meta[name="twitter:description"]', 'name=twitter:description', m.descricao);
  meta('meta[property="og:image"]', 'property=og:image', siteDoIdioma(LOCALE.codigo) + '/brand/avatar-1080.png');
  meta('meta[name="twitter:image"]', 'name=twitter:image', siteDoIdioma(LOCALE.codigo) + '/brand/avatar-1080.png');
  link('canonical', m.canonical);
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  for (const a of m.alternativos) link('alternate', a.href, a.hreflang);
}

/**
 * Título, descrição, canonical, robots e versões em outros idiomas (hreflang) de cada página.
 *
 * Fonte única: o servidor (src/lib/metaRota.ts). No carregamento, o <head> que o servidor entregou fica intocado
 * (é o mesmo que o Google lê); ao navegar dentro do site, o navegador pede os valores da nova rota a /api/meta.
 * Os argumentos só valem onde não há servidor de metadados: o APK (sem SEO) e o desenvolvimento local.
 * `idiomas`: em quais idiomas a página existe (padrão: os dois). As sessões passam [].
 */
export function usePageTitle(titulo?: string, descricao?: string, idiomas: CodigoLocale[] = ['pt-BR', 'en'], semIndice = false) {
  const t = useT();
  const { pathname } = useLocation();
  useEffect(() => {
    const caminho = normalizar(window.location.pathname);
    const local = () => {
      const tit = titulo ? `${titulo} · Linvuu` : t.meta.titulo;
      const alternativos = !semIndice && idiomas.length > 1
        ? [...LOCALES.filter((x) => idiomas.includes(x.codigo)).map((l) => ({ hreflang: l.codigo, href: urlAbsolutaEm(l.codigo, caminho) })),
          { hreflang: 'x-default', href: urlAbsolutaEm(idiomas.includes('en') ? 'en' : 'pt-BR', caminho) }]
        : [];
      aplicar({ titulo: tit, descricao: descricao ?? t.meta.descricao, canonical: urlAbsolutaEm(LOCALE.codigo, caminho), noindex: semIndice, alternativos });
    };
    if (import.meta.env.VITE_ALVO === 'apk') { local(); return; }
    const marca = document.head.querySelector<HTMLMetaElement>(MARCA);
    if (marca && normalizar(marca.content) === caminho) return; // o <head> desta rota veio do servidor: não reescrever
    marca?.remove();
    let viva = true;
    metaDoServidor(caminho).then((m) => {
      if (!viva || normalizar(window.location.pathname) !== caminho) return;
      if (!m) { local(); return; }
      aplicar({ titulo: m.titulo ?? t.meta.titulo, descricao: m.descricao ?? t.meta.descricao, canonical: m.canonical, noindex: m.noindex, alternativos: m.alternativos });
    });
    return () => { viva = false; };
  }, [titulo, descricao, t, idiomas.join(), semIndice, pathname]);
}
