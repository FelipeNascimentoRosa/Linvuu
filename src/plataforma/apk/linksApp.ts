/** Destino interno para um App Link recebido pelo app. Só aceita https nos dois domínios e nos caminhos declarados no AndroidManifest. */
const HOSTS = new Set(['linvuu.com.br', 'linvuu.com']);
const PREFIXOS = ['/curso', '/assinatura'] as const;

export function rotaDoLink(url: string): string | null {
  let u: URL;
  try { u = new URL(url); } catch { return null; }
  if (u.protocol !== 'https:' || !HOSTS.has(u.hostname)) return null;
  if (!PREFIXOS.some((p) => u.pathname === p || u.pathname.startsWith(p + '/'))) return null;
  return u.pathname + u.search + u.hash;
}
