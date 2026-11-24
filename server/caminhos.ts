// Raiz do projeto, igual no Render, no local e na Vercel.
//
// No Render e no local, o processo arranca na raiz do repositório. Na Vercel, o código da
// função é empacotado (o `import.meta.dirname` do bundle já não é a raiz do repo) e os
// ficheiros de `includeFiles` ficam na raiz da função, que é o `process.cwd()` do runtime.
// Por isso: na Vercel a raiz é o cwd; fora dela, é o pai de `server/`.
import path from 'node:path';

export function raizDoProjeto(): string {
  if (process.env.VERCEL) return process.cwd();
  return path.resolve(import.meta.dirname, '..');
}
