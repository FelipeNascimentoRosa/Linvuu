// POST /api/erro: relatório mínimo de erro do navegador, só para ler nos logs da Vercel (console.error estruturado).
// Sem terceiros, sem banco, sem cookie, sem IP e sem identificador: o que entra é o que o navegador manda dentro de um
// esquema fechado, depois de limpo de e-mail, token e query string. Responde sempre 204 quando o formato é válido.
import type { Express, Request, Response } from 'express';
import { perfilDaRequisicao } from './dominio';

export const TIPOS_ERRO = ['render', 'error', 'promise'] as const;
const CAMPOS = new Set(['tipo', 'mensagem', 'stack', 'rota', 'dominio', 'versao']);
export const LIMITE_MENSAGEM = 300;
export const LIMITE_STACK = 1500;

/** Tira do texto o que poderia identificar alguém: e-mails, query/hash de URL e sequências longas que parecem token. */
export function limparTexto(s: string, max: number): string {
  return s
    .replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, '[email]')
    .replace(/(https?:\/\/[^\s?#)'"]+)[?#][^\s)'"]*/g, '$1')
    .replace(/[A-Za-z0-9_\-+/=]{32,}/g, '[token]')
    .slice(0, max);
}

export interface RelatorioErro { tipo: (typeof TIPOS_ERRO)[number]; mensagem: string; stack: string; rota: string; dominio: string; versao: string }

/** Valida o corpo contra o esquema fechado. Devolve null se qualquer campo estiver fora do formato. */
export function validarRelatorio(corpo: unknown): RelatorioErro | null {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return null;
  const o = corpo as Record<string, unknown>;
  if (Object.keys(o).some((k) => !CAMPOS.has(k))) return null;
  const { tipo, mensagem, stack, rota, dominio, versao } = o;
  if (typeof tipo !== 'string' || !(TIPOS_ERRO as readonly string[]).includes(tipo)) return null;
  if (typeof mensagem !== 'string' || !mensagem.trim() || mensagem.length > LIMITE_MENSAGEM * 2) return null;
  if (stack !== undefined && (typeof stack !== 'string' || stack.length > LIMITE_STACK * 2)) return null;
  if (typeof rota !== 'string' || !/^\/[^\s]{0,199}$/.test(rota) || rota.startsWith('//') || /[?#]/.test(rota)) return null;
  if (typeof dominio !== 'string' || !/^[a-z0-9.-]{4,80}$/i.test(dominio)) return null;
  if (typeof versao !== 'string' || !/^[\w.-]{1,40}$/.test(versao)) return null;
  return {
    tipo: tipo as RelatorioErro['tipo'],
    mensagem: limparTexto(mensagem, LIMITE_MENSAGEM),
    stack: limparTexto(typeof stack === 'string' ? stack : '', LIMITE_STACK),
    rota: rota.split(/[?#]/)[0],
    dominio: dominio.toLowerCase(),
    versao,
  };
}

export function registrarErroCliente(app: Express) {
  app.post('/api/erro', (req: Request, res: Response) => {
    const r = validarRelatorio(req.body);
    if (!r) { res.status(400).json({ error: 'Pedido inválido.' }); return; }
    // O domínio vem do Host da requisição (não do corpo): o que o cliente diz só entra se for coerente com ele.
    console.error(JSON.stringify({ evento: 'erro-cliente', ...r, dominio: req.hostname || r.dominio, perfil: perfilDaRequisicao(req) }));
    res.status(204).end();
  });
}
