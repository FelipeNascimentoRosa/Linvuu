// Entrada da Vercel: uma só função serverless com o app Express completo.
//
// O `vercel.json` reencaminha tudo o que não é ficheiro estático para aqui. O app é criado
// uma vez por instância (cold start) e reutilizado nas invocações seguintes. O Vite NÃO é
// importado por este caminho (só `server.ts` o importa, em dev), por isso não entra no
// pacote da função.
import '../server/env.ts';
import { criarApp } from '../server/app';

export default criarApp();
