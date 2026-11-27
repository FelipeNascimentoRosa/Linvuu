import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from 'vite';

// Renderiza os componentes reais; não depende de login, dados de alunos nem serviços externos.
(globalThis as any).window = { history: { state: { idx: 0 } }, location: { pathname: '/', origin: 'http://localhost' }, innerWidth: 1200 };
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  // No navegador o catálogo de aulas é carregado antes da primeira tela (main.tsx → carregarTraducoes); aqui faz o mesmo antes de renderizar.
  await (await vite.ssrLoadModule('/src/lib/content.ts')).carregarIndice();
  const { AuthProvider } = await vite.ssrLoadModule('/src/lib/AuthContext.tsx');
  const { default: Curso } = await vite.ssrLoadModule('/src/pages/Curso.tsx');
  const { default: Dia } = await vite.ssrLoadModule('/src/pages/Dia.tsx');
  const render = (p: string, pattern: string, component: any) => renderToStaticMarkup(
    h(MemoryRouter, { initialEntries: [p] }, h(AuthProvider, null,
      h(Routes, null, h(Route, { path: pattern, element: h(component) })))));
  for (const id of ['en', 'es', 'de', 'fr', 'it', 'ru']) {
    for (const [p, pattern, component] of [[`/curso/${id}`, '/curso/:id', Curso], [`/curso/${id}/dia/1`, '/curso/:id/dia/:n', Dia], [`/curso/${id}/dia/9`, '/curso/:id/dia/:n', Dia]] as const) {
      const html = render(p, pattern, component);
      const links = [...html.matchAll(new RegExp(`href="/curso/${id}/dia/(\\d+)"`, 'g'))].map(m => Number(m[1]));
      if (!p.endsWith('/dia/9')) assert.ok(links.length > 0, `amostras continuam acessíveis em ${p}`);
      assert.ok(links.every(n => n <= 8), `nenhum href pago anônimo em ${p}`);
      if (!p.endsWith('/dia/1')) assert.ok(html.includes('href="/assinatura"'), `sessões pagas encaminham para a oferta em ${p}`);
    }
  }
  console.log('18 páginas React reais: cursos e trilhas preservam amostras e não expõem hrefs pagos para visitantes.');
} finally {
  await vite.close();
  delete (globalThis as any).window;
}
