import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../config/site';
import { LOCALE, LOCALES, useT } from '../i18n';
import { caminhoEm, type CodigoLocale } from '../i18n/locales';
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

/**
 * Título, descrição, canonical, versões em outros idiomas (hreflang) e Open Graph de cada página.
 * `idiomas`: em quais idiomas a página existe (padrão: os três). As sessões passam [] porque a versão traduzida depende da
 * aula; para elas, as alternativas ficam no sitemap.xml.
 */
export function usePageTitle(titulo?: string, descricao?: string, idiomas: CodigoLocale[] = ['pt-BR', 'en', 'es'], semIndice = false, semMarca = false) {
  const t = useT();
  const { pathname } = useLocation();
  useEffect(() => {
    const tit = titulo ? (semMarca ? titulo : `${titulo} · Linvuu`) : t.meta.titulo;
    const desc = descricao ?? t.meta.descricao;
    const caminho = window.location.pathname.replace(/\/+$/, '') || '/';
    // Navegar da página de login/aula paga para uma amostra não pode herdar seu noindex,
    // e a navegação inversa precisa aplicar a mesma política entregue pelo servidor.
    sincronizarRobots(document, semIndice);
    document.title = tit;
    meta('meta[name="description"]', 'name=description', desc);
    meta('meta[property="og:title"]', 'property=og:title', tit);
    meta('meta[property="og:description"]', 'property=og:description', desc);
    meta('meta[property="og:url"]', 'property=og:url', SITE_URL + caminho);
    meta('meta[property="og:locale"]', 'property=og:locale', LOCALE.og);
    meta('meta[name="twitter:title"]', 'name=twitter:title', tit);
    meta('meta[name="twitter:description"]', 'name=twitter:description', desc);
    meta('meta[name="twitter:image"]', 'name=twitter:image', SITE_URL + '/brand/avatar-1080.png');
    link('canonical', SITE_URL + caminho);
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (!semIndice && idiomas.length > 1) {
      for (const l of LOCALES.filter((x) => idiomas.includes(x.codigo))) link('alternate', SITE_URL + caminhoEm(l.codigo, caminho), l.codigo);
      if (idiomas.includes('pt-BR')) link('alternate', SITE_URL + caminhoEm('pt-BR', caminho), 'x-default');
    }
  }, [titulo, descricao, t, idiomas.join(), semIndice, semMarca, pathname]);
}
