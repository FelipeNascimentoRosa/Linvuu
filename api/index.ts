import type { Request, Response } from 'express';
import { createApp } from '../server.ts';

// Uma inicialização por instância; o servidor também continua utilizável no Render.
const app = createApp();

export default async function handler(req: Request, res: Response) {
  try {
    (await app)(req, res);
  } catch (error) {
    console.error('[Linvuu] falha ao iniciar aplicação:', error);
    if (!res.headersSent) res.status(503).json({ error: 'Serviço temporariamente indisponível.' });
  }
}
