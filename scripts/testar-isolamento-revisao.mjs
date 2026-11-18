// Direção dos imports do domínio de revisão espaçada: o módulo compartilhado (src/lib/revisao) é puro e não conhece
// plataforma, DOM, React nem Firebase; Web e APK nunca importam um do outro; o servidor só enxerga o módulo compartilhado.
// Complementa testar:plataformas (que olha o build): este olha o código-fonte. Rodar: node scripts/testar-isolamento-revisao.mjs
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';

const RAIZ = resolve(new URL('..', import.meta.url).pathname);
const arquivos = (dir, acc = []) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) { if (n !== 'node_modules') arquivos(p, acc); } else if (/\.(ts|tsx|mjs)$/.test(n)) acc.push(p);
  }
  return acc;
};
const importsDe = (p) => {
  const t = readFileSync(p, 'utf8');
  return [...t.matchAll(/(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/g)].map((m) => m[1]);
};
const alvo = (de, spec) => (spec.startsWith('.') ? relative(RAIZ, resolve(dirname(de), spec)) : spec);
const falhas = [];
const falha = (m) => falhas.push(m);

// 1. src/lib/revisao: só irmãos, as duas peças puras de lib (aulas e correcaoExercicios) e o ts-fsrs
const PERMITIDOS = new Set(['src/lib/aulas', 'src/lib/correcaoExercicios', 'ts-fsrs']);
const PROIBIDOS_GLOBAIS = /\b(window|document|localStorage|sessionStorage|navigator|indexedDB|fetch|XMLHttpRequest|HTMLElement)\b/;
const dominio = arquivos(join(RAIZ, 'src/lib/revisao'));
assert.ok(dominio.length >= 6, `esperava os modelos em src/lib/revisao, achei ${dominio.length}`);
for (const f of dominio) {
  for (const spec of importsDe(f)) {
    const a = alvo(f, spec);
    if (a.startsWith('src/lib/revisao/') || a === 'src/lib/revisao') continue;
    if (!PERMITIDOS.has(a)) falha(`${relative(RAIZ, f)} importa "${spec}" (módulo compartilhado só pode usar: ${[...PERMITIDOS].join(', ')} e irmãos)`);
  }
  const codigo = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  const m = PROIBIDOS_GLOBAIS.exec(codigo);
  if (m) falha(`${relative(RAIZ, f)} usa "${m[1]}" (módulo compartilhado não toca DOM nem rede)`);
}
// as duas peças puras permitidas também não podem puxar plataforma/DOM
for (const pura of ['src/lib/aulas.ts', 'src/lib/correcaoExercicios.ts']) {
  for (const spec of importsDe(join(RAIZ, pura))) { const a = alvo(join(RAIZ, pura), spec); if (/plataforma|components|pages|react/.test(a)) falha(`${pura} importa "${spec}": deixaria de ser pura`); }
}

// 2. Web e APK nunca se importam
for (const [de, outra] of [['src/plataforma/website', 'src/plataforma/apk'], ['src/plataforma/apk', 'src/plataforma/website']]) {
  const dir = join(RAIZ, de);
  for (const f of arquivos(dir)) for (const spec of importsDe(f)) { const a = alvo(f, spec); if (a.startsWith(outra)) falha(`${relative(RAIZ, f)} importa "${spec}" (${de} não pode enxergar ${outra})`); }
}
// 3. o servidor não importa de plataforma/* (o domínio de revisão já foi checado acima); e o servidor da revisão só usa src/lib/revisao
for (const f of arquivos(join(RAIZ, 'server'))) {
  for (const spec of importsDe(f)) { const a = alvo(f, spec); if (a.startsWith('src/plataforma')) falha(`${relative(RAIZ, f)} importa "${spec}" (o servidor não depende de plataforma)`); }
}
for (const f of arquivos(join(RAIZ, 'server'))) {
  for (const spec of importsDe(f)) { const a = alvo(f, spec); if (a.startsWith('src/lib/') && !a.startsWith('src/lib/revisao/') && /revisao/.test(f)) falha(`${relative(RAIZ, f)} importa "${spec}" (servidor da revisão só usa src/lib/revisao)`); }
}
// 4. os modelos não podem ter voltado para o APK (sem reexportação, sem cópia)
for (const n of ['fsrsAdaptador', 'espacadoModelo', 'revisaoModelo', 'reforcoModelo', 'estudoModelo', 'registroBloco']) {
  try { statSync(join(RAIZ, 'src/plataforma/apk', `${n}.ts`)); falha(`src/plataforma/apk/${n}.ts não deveria existir (o modelo mora em src/lib/revisao)`); } catch { /* ok */ }
}
assert.deepEqual(falhas, [], `isolamento quebrado:\n  - ${falhas.join('\n  - ')}`);
console.log(`isolamento da revisão: ${dominio.length} arquivos de domínio puros; Web e APK não se importam; o servidor não depende de plataforma.`);
