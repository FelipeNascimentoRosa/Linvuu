import assert from 'node:assert/strict';
import { carregarDadosMeta, metaDaRota } from '../src/lib/metaRota.ts';
import { comPerfil } from '../src/i18n/locales.ts';
import { SESSOES_GRATIS } from '../src/config/planos.ts';

// Títulos das páginas indexáveis (home, hubs e sessões grátis) têm no máximo 60 caracteres, como o Google os mostra,
// nos dois domínios. A sessão paga não entra: não vai ao sitemap.
const d = carregarDadosMeta(process.cwd());
assert.ok(d, 'dados de meta carregados');
let total = 0;
for (const perfil of ['br', 'global'] as const) {
  comPerfil(perfil, () => {
    const codigo = perfil === 'br' ? 'pt-BR' : 'en';
    const caminhos: string[] = ['/', '/cursos', '/assinatura', '/termos', '/privacidade', '/portugues', '/russo-online', '/sobre', '/por-que-linvuu', '/contato', '/ex-alunos-udemy', '/livros'];
    for (const c of d.cursos) {
      caminhos.push('/curso/' + c.id, '/gramatica/' + c.id);
      for (const g of d.indice[c.id]?.grupos ?? []) for (let n = g.dias[0]; n <= Math.min(g.dias[1], SESSOES_GRATIS); n++) caminhos.push(`/curso/${c.id}/dia/${n}`);
    }
    for (const p of caminhos) {
      const m = metaDaRota(p, d);
      if (m.status !== 200 || !m.titulo || m.semIndice || (m.em && !m.em.includes(codigo))) continue;
      const titulo = m.semMarca ? m.titulo : `${m.titulo} · Linvuu`;
      total++;
      assert.ok(titulo.length <= 60, `${perfil} ${p}: título com ${titulo.length} caracteres: ${titulo}`);
    }
  });
}
console.log(`OK: ${total} títulos indexáveis com no máximo 60 caracteres nos dois domínios.`);

// Descrição de toda página indexável — fixas, cursos e gramáticas, nos dois domínios: de 120 a 160
// caracteres, como o Google as exibe. Antes a guarda cobria só onze fixas do .com.br e por isso deixou
// passar /curso/ru com 223 caracteres e /russo-online com 101 (medidos em 10/11/2026).
// Ficam de fora o que é noindex (`semIndice`) e a versão que não existe naquele domínio (`em`).
// Os capítulos de livro (/livros/<id>/capitulo/<n>, 111 caracteres) ainda não entram: ver PENDENCIAS.md.
let totalDesc = 0;
for (const perfil of ['br', 'global'] as const) {
  comPerfil(perfil, () => {
    const codigo = perfil === 'br' ? 'pt-BR' : 'en';
    const paginas = ['/', '/cursos', '/assinatura', '/termos', '/privacidade', '/portugues', '/russo-online', '/sobre', '/por-que-linvuu', '/contato', '/ex-alunos-udemy', '/livros'];
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

