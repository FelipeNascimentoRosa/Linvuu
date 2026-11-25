import assert from 'node:assert/strict';
import { carregarDadosMeta, metaDaRota } from '../src/lib/metaRota.ts';
import { comPerfil } from '../src/i18n/locales.ts';
import { SESSOES_GRATIS } from '../src/config/planos.ts';
import { DUVIDAS, caminhoDuvida } from '../src/lib/duvidas.ts';

// Títulos das páginas indexáveis (home, hubs, livros, capítulos e aulas grátis) ficam entre 35 e 60 caracteres,
// como o Google os mostra, nos dois domínios. O limite de 35 faltava até 11/11/2026: `/livros/de/capitulo/1`
// saía com 29 e nenhuma régua olhava essa rota (AUDITORIA-SITE-2026-11-11 §5).
// A sessão paga não entra: desde 11/11/2026 toda sessão de aula é noindex e não vai ao sitemap.
const d = carregarDadosMeta(process.cwd());
assert.ok(d, 'dados de meta carregados');
/** Livro e capítulos publicados: as rotas `/livros/<id>` e `/livros/<id>/capitulo/<n>` que o sitemap lista. */
const livrosIndexaveis = () => {
  const out: string[] = [];
  for (const [id, lv] of Object.entries(d!.livros)) {
    if (!Object.keys(lv.caps).length) continue;
    out.push(`/livros/${id}`);
    for (const n of Object.keys(lv.caps)) out.push(`/livros/${id}/capitulo/${n}`);
  }
  return out;
};
let total = 0;
for (const perfil of ['br', 'global'] as const) {
  comPerfil(perfil, () => {
    const codigo = perfil === 'br' ? 'pt-BR' : 'en';
    const caminhos: string[] = ['/', '/cursos', '/assinatura', '/termos', '/privacidade', '/portugues', '/russo-online', '/sobre', '/por-que-linvuu', '/contato', '/ex-alunos-udemy', '/livros', '/gramatica', '/excluir-conta', ...livrosIndexaveis(), ...DUVIDAS.map(caminhoDuvida)];
    for (const c of d.cursos) {
      caminhos.push('/curso/' + c.id, '/gramatica/' + c.id);
      for (const g of d.indice[c.id]?.grupos ?? []) for (let n = g.dias[0]; n <= Math.min(g.dias[1], SESSOES_GRATIS); n++) caminhos.push(`/curso/${c.id}/dia/${n}`);
    }
    for (const p of caminhos) {
      const m = metaDaRota(p, d);
      if (m.status !== 200 || !m.titulo || m.semIndice || (m.em && !m.em.includes(codigo))) continue;
      const titulo = m.semMarca ? m.titulo : `${m.titulo} · Linvuu`;
      total++;
      assert.ok(
        titulo.length >= 35 && titulo.length <= 60,
        `${perfil} ${p}: título com ${titulo.length} caracteres (faixa 30–60): ${titulo}`,
      );
    }
  });
}
console.log(`OK: ${total} títulos indexáveis entre 35 e 60 caracteres nos dois domínios.`);

// Descrição de toda página indexável — fixas, cursos, gramáticas, livros e capítulos, nos dois domínios: de 120
// a 160 caracteres, como o Google as exibe. Antes a guarda cobria só onze fixas do .com.br e por isso deixou
// passar /curso/ru com 223 caracteres e /russo-online com 101 (medidos em 10/11/2026). Em 11/11/2026 as doze
// descrições de capítulo entraram: sete estavam entre 109 e 119 caracteres e ninguém media.
// Ficam de fora o que é noindex (`semIndice`) e a versão que não existe naquele domínio (`em`).
let totalDesc = 0;
for (const perfil of ['br', 'global'] as const) {
  comPerfil(perfil, () => {
    const codigo = perfil === 'br' ? 'pt-BR' : 'en';
    const paginas = ['/', '/cursos', '/assinatura', '/termos', '/privacidade', '/portugues', '/russo-online', '/sobre', '/por-que-linvuu', '/contato', '/ex-alunos-udemy', '/livros', '/gramatica', '/excluir-conta', ...livrosIndexaveis(), ...DUVIDAS.map(caminhoDuvida)];
    for (const c of d!.cursos) paginas.push('/curso/' + c.id, '/gramatica/' + c.id);
    for (const p of paginas) {
      const m = metaDaRota(p, d);
      if (m.status !== 200 || !m.descricao || m.semIndice || (m.em && !m.em.includes(codigo))) continue;
      totalDesc++;
      assert.ok(
        m.descricao.length >= 120 && m.descricao.length <= 160,
        `${perfil} ${p}: descrição com ${m.descricao.length} caracteres (faixa 120–160): ${m.descricao}`,
      );
    }
  });
}
console.log(`OK: ${totalDesc} descrições indexáveis entre 120 e 160 caracteres nos dois domínios.`);

