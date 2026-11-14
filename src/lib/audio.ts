// Áudio das aulas. Ordem: MP3 salvo no site (public/audio/<idioma>/<hash>.mp3, listado em index.json) → voz do navegador (provisória).
// Nome do arquivo = hash do texto SEM acento tônico (o acento é só gráfico). A lista vem de content/audio/<idioma>-gravar.csv.
// Áudio de sessão paga não fica em public/: sai de /api/audio, com o token de login (ver audioPrivado).
import { carregarAuth } from './firebase';
import { api } from './api';
import { pronunciaEspecial } from './pronuncia-russo';
const BASE = (((import.meta.env ?? {}) as Record<string, string | undefined>).VITE_AUDIO_BASE_URL ?? (import.meta.env.VITE_ALVO === 'apk' ? 'https://linvuu.com.br/audio' : '/audio')).replace(/\/$/, '');
const LANG: Record<string, string> = { pt: 'pt-BR', ru: 'ru-RU', de: 'de-DE', en: 'en-US', es: 'es-ES', fr: 'fr-FR', it: 'it-IT', br: 'pt-BR' };

/** O que a voz lê e o que entra no hash: sem acento tônico (U+0301). Mantenha igual a scripts/aulas.mjs. */
export const textoParaAudio = (t: string) => t.normalize('NFC').replace(/\u0301/g, '').trim();
export const hashTexto = (t: string) => {
  let h = 0x811c9dc5;
  for (const c of new TextEncoder().encode(textoParaAudio(t))) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
};

export type FonteAudio = 'gravacao' | 'voz-do-navegador';
const avisar = (fonte: FonteAudio) => { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent<FonteAudio>('linvuu:fonte-audio', { detail: fonte })); };

const indices = new Map<string, Promise<Set<string>>>();
/** Hashes dos MP3 que existem para o idioma (public/audio/<idioma>/index.json). Falha = conjunto vazio. */
const indice = (idioma: string) => {
  if (!indices.has(idioma)) {
    indices.set(idioma, fetch(`${BASE}/${idioma}/index.json`, { signal: AbortSignal.timeout(8000) }).then((r) => (r.ok ? r.json() : [])).then((l) => new Set<string>(Array.isArray(l) ? l : [])).catch(() => new Set<string>()));
  }
  return indices.get(idioma)!;
};

/** Voz nova (ElevenLabs): MP3 públicos em /audio/v2/<idioma>/ (caminho novo, para o cache nunca servir a voz antiga). */
const indicesV2 = new Map<string, Promise<Set<string>>>();
const indiceV2 = (idioma: string) => {
  if (!indicesV2.has(idioma)) {
    indicesV2.set(idioma, fetch(`${BASE}/v2/${idioma}/index.json`, { signal: AbortSignal.timeout(8000) }).then((r) => (r.ok ? r.json() : [])).then((l) => new Set<string>(Array.isArray(l) ? l : [])).catch(() => new Set<string>()));
  }
  return indicesV2.get(idioma)!;
};

let atual: HTMLAudioElement | null = null;
let cancelar = 0;

/** Áudio da aula em andamento (gravação ou voz do navegador). Os sons de reforço se calam nesse caso. */
export const audioTocando = (): boolean =>
  (!!atual && !atual.paused && !atual.ended) || (typeof speechSynthesis !== 'undefined' && speechSynthesis.speaking);

export const parar = () => {
  cancelar++;
  atual?.pause(); atual = null;
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
};

// Referência viva da fala: no Chrome, uma fala sem referência pode ser coletada e nunca disparar onend.
let falaAtual: SpeechSynthesisUtterance | null = null;
const vozDoNavegador = (texto: string, idioma: string) => new Promise<void>((ok) => {
  if (typeof speechSynthesis === 'undefined') return ok();
  const limpo = textoParaAudio(texto).replace(/[—…]/g, ' ');
  const u = new SpeechSynthesisUtterance(limpo);
  u.lang = LANG[idioma] ?? idioma; u.rate = 0.85;
  const v = speechSynthesis.getVoices().find((x) => x.lang.toLowerCase().startsWith(u.lang.slice(0, 2).toLowerCase()));
  if (v) u.voice = v;
  // Alguns navegadores não avisam o fim (sem voz do idioma, aba em segundo plano, fala cancelada).
  // Teto de tempo proporcional ao texto: quem espera esta promessa (botão "Ouvindo…") nunca fica preso.
  let feito = false;
  const fim = () => { if (feito) return; feito = true; clearTimeout(teto); if (falaAtual === u) falaAtual = null; ok(); };
  const teto = setTimeout(fim, Math.min(20000, 2500 + limpo.length * 110));
  u.onend = fim; u.onerror = fim;
  falaAtual = u;
  speechSynthesis.speak(u);
});

const privados = new Map<string, Promise<string | null>>();
let geracaoPrivada = 0;
/** Revoga blobs e descarta downloads em andamento quando a conta muda. */
export function limparAudioPrivado() {
  geracaoPrivada++;
  parar();
  for (const p of privados.values()) void p.then((url) => { if (url) URL.revokeObjectURL(url); });
  privados.clear();
}

/** Espera no máximo `ms`; depois segue com `reserva`. Nada no áudio pode deixar o botão preso em "Ouvindo…". */
const comTeto = <T,>(p: Promise<T>, ms: number, reserva: T): Promise<T> =>
  Promise.race([p, new Promise<T>((ok) => setTimeout(() => ok(reserva), ms))]);

/** Token do login, se houver. Falha de Auth não impede a tentativa: o servidor é quem decide o acesso.
 *  Teto de 4 s: o Firebase pode demorar ou não responder (armazenamento bloqueado, rede ruim). */
const tokenDoLogin = (): Promise<string | null> => comTeto((async () => {
  try {
    const { auth } = await carregarAuth();
    return (await auth.currentUser?.getIdToken()) ?? null;
  } catch { return null; }
})(), 4000, null);
/** Áudio de sessão paga: baixa pela API (com o token de login, se houver) e devolve um endereço local. null = sem acesso ou sem arquivo. */
const audioPrivado = (idioma: string, h: string): Promise<string | null> => {
  const chave = `${idioma}/${h}`;
  if (!privados.has(chave)) {
    const pedido = (async () => {
      try {
        const geracao = geracaoPrivada;
        const token = await tokenDoLogin();
        const r = await fetch(api(`/api/audio/${idioma}/${h}.mp3`), { headers: token ? { Authorization: `Bearer ${token}` } : {}, signal: AbortSignal.timeout(12000) });
        if (!r.ok) return null;
        const blob = await r.blob();
        return geracao === geracaoPrivada ? URL.createObjectURL(blob) : null;
      } catch { return null; }
    })().then((url) => { if (!url && privados.get(chave) === pedido) privados.delete(chave); return url; });
    privados.set(chave, pedido);
  }
  return privados.get(chave)!;
};

/** Toca um texto com o token `minha` (se `parar()` for chamado, o token muda e a fala é abandonada). */
async function tocar(texto: string, idioma: string, minha: number) {
  const h = hashTexto(texto);
  const novo = (await indiceV2(idioma)).has(h);
  const publico = novo || (await indice(idioma)).has(h);
  if (minha !== cancelar) return;
  const especial = pronunciaEspecial(idioma, h);
  const origem = especial
    ? `${BASE}${especial}`
    : publico ? `${BASE}/${novo ? 'v2/' : ''}${idioma}/${h}.mp3` : await audioPrivado(idioma, h);
  if (minha !== cancelar) return;
  if (origem) {
    try {
      const a = new Audio(origem);
      // Áudio remoto do APK usa CORS, compatível com Cross-Origin-Resource-Policy.
      a.crossOrigin = 'anonymous';
      atual = a;
      // onpause: parar() pausa o áudio; sem isso a promessa ficava pendente e o botão preso em "Ouvindo…".
      await new Promise<void>((ok, erro) => {
        // Se o arquivo não começar a tocar em 10 s (rede parada), desiste e cai na voz do navegador.
        const naoComecou = setTimeout(() => { a.pause(); erro(new Error('sem resposta')); }, 10000);
        a.onplaying = () => clearTimeout(naoComecou);
        a.onended = () => { clearTimeout(naoComecou); ok(); };
        a.onpause = () => { clearTimeout(naoComecou); ok(); };
        a.onerror = () => { clearTimeout(naoComecou); erro(new Error('sem arquivo')); };
        a.play().then(() => avisar('gravacao')).catch((e) => { clearTimeout(naoComecou); erro(e); });
      });
      return;
    } catch { if (minha !== cancelar) return; }
  }
  avisar('voz-do-navegador');
  await vozDoNavegador(texto, idioma);
}

export async function falar(texto: string, idioma = 'ru'): Promise<void> {
  parar();
  await tocar(texto, idioma, cancelar);
}

export async function falarLista(textos: string[], idioma = 'ru') {
  parar();
  const minha = cancelar;
  for (const t of textos) {
    if (minha !== cancelar) return;
    await tocar(t, idioma, minha);
  }
}

/** Narração: cada trecho com a sua voz (português e língua estudada, alternando). */
export async function falarTrechos(itens: { texto: string; idioma: string }[]) {
  parar();
  const minha = cancelar;
  for (const t of itens) {
    if (minha !== cancelar) return;
    await tocar(t.texto, t.idioma, minha);
  }
}

/** true = há áudio (gravado ou voz do navegador) no idioma; false = não há. */
export const temVoz = async (idioma: string): Promise<boolean> => {
  if ((await indiceV2(idioma)).size > 0 || (await indice(idioma)).size > 0) return true;
  return new Promise((ok) => {
    if (typeof speechSynthesis === 'undefined') return ok(false);
    const prefixo = (LANG[idioma] ?? idioma).slice(0, 2).toLowerCase();
    const checar = () => speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith(prefixo));
    if (speechSynthesis.getVoices().length) return ok(checar());
    const fim = setTimeout(() => ok(false), 1500);
    speechSynthesis.addEventListener('voiceschanged', () => { clearTimeout(fim); ok(checar()); }, { once: true });
  });
};

