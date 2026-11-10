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
    const caminhos: string[] = ['/', '/cursos', '/assinatura'];
    for (const c of d.cursos) {
      caminhos.push('/curso/' + c.id);
      for (const g of d.indice[c.id]?.grupos ?? []) for (let n = g.dias[0]; n <= Math.min(g.dias[1], SESSOES_GRATIS); n++) caminhos.push(`/curso/${c.id}/dia/${n}`);
    }
    for (const p of caminhos) {
      const m = metaDaRota(p, d);
      if (m.status !== 200 || !m.titulo || m.semIndice) continue;
      const titulo = m.semMarca ? m.titulo : `${m.titulo} · Linvuu`;
      total++;
      assert.ok(titulo.length <= 60, `${perfil} ${p}: título com ${titulo.length} caracteres: ${titulo}`);
    }
  });
}
console.log(`OK: ${total} títulos indexáveis com no máximo 60 caracteres nos dois domínios.`);

// Descrição das páginas fixas do site em português: de 120 a 160 caracteres, como o Google as exibe.
// Sem esta guarda a classe volta — em 10/11/2026 /termos servia 45, /privacidade 77 e /gramatica/* 99–102.
// As páginas fixas do .com (em inglês) foram medidas no EN_AUDIT.md §F4 e não entram aqui; /curso/* também
// não, porque a descrição delas vem do modelo da aula e não desta tabela.
let totalBr = 0;
comPerfil('br', () => {
  const fixas = ['/', '/cursos', '/assinatura', '/termos', '/privacidade'];
  for (const c of d!.cursos) {
    const m = metaDaRota('/gramatica/' + c.id, d);
    if (m.status === 200 && !m.semIndice) fixas.push('/gramatica/' + c.id);
  }
  for (const p of fixas) {
    const m = metaDaRota(p, d);
    if (m.status !== 200 || !m.descricao || m.semIndice) continue;
    totalBr++;
    assert.ok(
      m.descricao.length >= 120 && m.descricao.length <= 160,
      `br ${p}: descrição com ${m.descricao.length} caracteres (faixa 120–160): ${m.descricao}`,
    );
  }
});
console.log(`OK: ${totalBr} descrições de páginas fixas do .com.br entre 120 e 160 caracteres.`);

