// Pixel de publicidade: inicializado apenas depois de uma escolha específica do visitante.
export const META_PIXEL_ID = '28831394486482407'; // identificador público do conjunto da Linvuu
// Consentimento anterior mencionava apenas Meta; nova escolha inclui TikTok.
export const MARKETING_CHOICE = 'linvuu:marketing:v2';
type Choice = 'yes' | 'no' | null;
type Store = Pick<Storage, 'getItem' | 'setItem'>;
type Queue = { (...args: unknown[]): void; callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push: Queue; loaded: boolean; version: string };
type MetaWindow = Window & { fbq?: Queue; _fbq?: Queue };

// O SDK pode enviar a URL atual: não o chamamos em áreas de conta ou em URLs com parâmetros inesperados.
export function rotaSeguraParaPixel(path: string, search: string): boolean {
  if (!/^\/(?:en|es)\/?$/.test(path) && !/^\/(?:en\/|es\/)?(?:|cursos|assinatura|portugues|russo-online|sobre|por-que-linvuu|contato|gramatica(?:\/(?:en|es|de|fr|it|ru|br))?|curso\/(?:en|es|de|fr|it|ru|br)|livros(?:\/(?:en|es|de|fr|it|ru)(?:\/capitulo\/[12])?)?)\/?$/.test(path)) return false;
  const allowed = new Set(['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','ttclid','tt_test_id','plano']);
  for (const [key, value] of new URLSearchParams(search)) if (!allowed.has(key) || value.length > 200 || !/^[A-Za-z0-9_.~-]*$/.test(value)) return false;
  return true;
}

export function criarMetaPixel(store: Store, runtime: () => { win: MetaWindow; doc: Document; path: string; search: string } | null) {
  let initialized = false;
  let granted = false;
  let lastPage = '';
  const choice = (): Choice => { try { const v = store.getItem(MARKETING_CHOICE); return v === 'yes' || v === 'no' ? v : null; } catch { return null; } };
  function choose(value: 'yes' | 'no') {
    try { store.setItem(MARKETING_CHOICE, value); } catch { return; }
    if (value === 'no') { lastPage = ''; const w = runtime()?.win; if (initialized && granted && w?.fbq) w.fbq('consent', 'revoke'); granted = false; }
  }
  function tracker() {
    const r = runtime();
    if (!r || choice() !== 'yes' || !rotaSeguraParaPixel(r.path, r.search)) return null;
    if (!initialized) {
      if (!r.win.fbq) {
        const q = function (...args: unknown[]) { if (q.callMethod) q.callMethod(...args); else q.queue.push(args); } as Queue;
        q.queue = []; q.push = q; q.loaded = true; q.version = '2.0'; r.win.fbq = q; r.win._fbq = q;
        const script = r.doc.createElement('script'); script.async = true; script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        r.doc.head.appendChild(script);
      }
      r.win.fbq('consent', 'grant');
      r.win.fbq('set', 'autoConfig', false, META_PIXEL_ID);
      r.win.fbq('init', META_PIXEL_ID);
      initialized = true;
      granted = true;
    }
    if (!granted) { r.win.fbq?.('consent', 'grant'); granted = true; }
    return r.win.fbq;
  }
  function pageView() {
    const r = runtime(); if (!r) return;
    if (!rotaSeguraParaPixel(r.path, r.search)) {
      lastPage = '';
      if (initialized && granted) { r.win.fbq?.('consent', 'revoke'); granted = false; }
      return;
    }
    const key = r.path + r.search;
    if (lastPage === key) return;
    const q = tracker(); if (!q) return;
    q('track', 'PageView'); lastPage = key;
  }
  function checkout() { const q = tracker(); if (q) q('track', 'InitiateCheckout'); }
  return { choice, choose, pageView, checkout };
}

const storage: Store = { getItem: k => localStorage.getItem(k), setItem: (k,v) => localStorage.setItem(k,v) };
export const metaPixel = criarMetaPixel(storage, () => typeof window === 'undefined' || typeof document === 'undefined' ? null : { win: window as MetaWindow, doc: document, path: window.location.pathname, search: window.location.search });
