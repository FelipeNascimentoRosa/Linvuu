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
