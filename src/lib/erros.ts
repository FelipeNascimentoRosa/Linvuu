// Captura de erros do navegador: relatório mínimo para POST /api/erro (nosso servidor, sem terceiros, sem PII).
// Trava anti-tempestade: no máximo 5 relatórios por sessão da aba e nenhum repetido (mesma mensagem + mesma pista).
import { APK } from '../plataforma';

export const MAX_RELATORIOS = 5;
const CHAVE = 'linvuu:erros-enviados';
const vistos = new Set<string>();
let enviadosMemoria = 0;

const contar = (): number => {
  try { return Number(sessionStorage.getItem(CHAVE)) || 0; } catch { return enviadosMemoria; }
};
const somar = (n: number) => {
  enviadosMemoria = n;
  try { sessionStorage.setItem(CHAVE, String(n)); } catch { /* sem sessionStorage: vale a contagem em memória */ }
};

/** Erro de extensão de navegador, de script de outra origem ou ruído conhecido: não é do site e não se relata. */
export function ehRuido(mensagem: string, stack = '', arquivo = ''): boolean {
  return /(?:chrome|moz|safari(?:-web)?)-extension:\/\//i.test(`${stack}\n${arquivo}`)
    || /^Script error\.?$/i.test(mensagem.trim())
    || /ResizeObserver loop/i.test(mensagem)
    || /Non-Error promise rejection captured/i.test(mensagem)
    || (arquivo !== '' && !arquivo.startsWith(location.origin));
}

const versao = (): string => {
  try { return new URL(import.meta.url).pathname.match(/index-([\w-]+)\.js$/)?.[1] ?? 'dev'; } catch { return 'dev'; }
};

export function relatarErro(tipo: 'render' | 'error' | 'promise', erro: unknown, arquivo = ''): void {
  if (APK || typeof window === 'undefined') return;
  const e = erro instanceof Error ? erro : null;
  const mensagem = String(e?.message ?? (typeof erro === 'string' ? erro : 'erro sem mensagem')).slice(0, 400);
  const stack = String(e?.stack ?? '').slice(0, 1800);
  if (ehRuido(mensagem, stack, arquivo)) return;
  const impressao = `${tipo}|${mensagem}|${stack.split('\n')[1] ?? ''}`;
  if (vistos.has(impressao)) return;
  vistos.add(impressao);
  const n = contar();
  if (n >= MAX_RELATORIOS) return;
  somar(n + 1);
  const corpo = JSON.stringify({ tipo, mensagem, stack, rota: location.pathname, dominio: location.hostname, versao: versao() });
  try { void fetch('/api/erro', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: corpo, keepalive: true }).catch(() => {}); } catch { /* relatar nunca pode causar outro erro */ }
}

/** Liga os dois ouvintes globais, uma vez. */
export function iniciarCapturaDeErros(): void {
  if (APK || typeof window === 'undefined') return;
  window.addEventListener('error', (ev) => relatarErro('error', ev.error ?? ev.message, ev.filename || ''));
  window.addEventListener('unhandledrejection', (ev) => relatarErro('promise', ev.reason));
}
