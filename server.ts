// Arranque local/Render do servidor Linvuu (longa duração).
// A montagem do app vive em `server/app.ts`; na Vercel a entrada é `api/index.ts`.
// Em desenvolvimento, o Vite serve a SPA por cima do app (middlewareMode); em produção
// o app serve `dist/` sozinho. O import do Vite é lazy e fica SÓ aqui, para o Vite nunca
// ser empacotado na função da Vercel.
import './server/env.ts';
import { criarApp } from './server/app';

// Uma falha assíncrona esquecida não pode derrubar o site: registra e segue.
process.on('unhandledRejection', (e) => { console.error('[Linvuu] promessa rejeitada sem tratamento:', e instanceof Error ? e.message : e); });
// Depois de uma exceção não capturada o processo fica em estado incerto: registra e sai, e o Render sobe outro.
process.on('uncaughtException', (e) => { console.error('[Linvuu] erro não capturado:', e.message); setTimeout(() => process.exit(1), 200).unref(); });

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = criarApp();

if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ [Linvuu Server] Porta ${PORT}`);
  console.log(`🌐 Acesse o site em: http://localhost:${PORT}`);
});
