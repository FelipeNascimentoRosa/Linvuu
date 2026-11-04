// Gera content/lastmod.json — o manifesto de datas de alteração por URL do sitemap.
//
// Porquê: o Google usa <lastmod> como sinal de frescura, mas só quando a data é
// verdadeira; datas inventadas ou "hoje para tudo" fazem o sinal ser ignorado.
// Aqui cada data vem do histórico git: para cada URL do sitemap, a data do commit
// mais recente (na main) que tocou um dos ficheiros-fonte da página — o conteúdo
// que a compõe, não o modelo visual. Componentes React só contam nas páginas
// estáticas, onde o texto vive dentro do componente.
//
// Como correr (exige um clone com o histórico completo; o build no Render não
// tem .git fiável, por isso o manifesto é versionado e o scripts/seo.mjs só o lê):
//   node scripts/gerar-lastmod.mjs
// Correr depois de merges com alterações de conteúdo e versionar o resultado
// no mesmo PR ou num PR de manutenção. Sem manifesto, o seo.mjs omite o lastmod
// (comportamento anterior). URLs sem fonte datablável ficam fora do manifesto e
// continuam sem lastmod — nunca se anuncia uma alteração que não aconteceu.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const raiz = path.resolve(import.meta.dirname, '..');
const SITE = 'https://linvuu.com.br';

// 1) Regenera o sitemap com o gerador oficial e lê a lista de URLs dele —
//    a lista de rotas tem uma única fonte (scripts/seo.mjs), sem duplicar regras.
execFileSync('node', [path.join(raiz, 'scripts', 'seo.mjs')], { stdio: 'inherit' });
const sitemap = fs.readFileSync(path.join(raiz, 'public', 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

// 2) Data do último commit que tocou um ficheiro (cache por ficheiro).
const cache = new Map();
const dataDoFicheiro = (f) => {
  if (!cache.has(f)) {
    let d = null;
    if (fs.existsSync(path.join(raiz, f))) {
      const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', f], { cwd: raiz, encoding: 'utf8' }).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(out)) d = out;
    }
    cache.set(f, d);
  }
  return cache.get(f);
};

// 3) Ficheiros-fonte de cada rota (caminhos relativos à raiz do repo).
const TEXTO_LOCALE = { 'pt-BR': 'src/i18n/pt-BR.ts', en: 'src/i18n/en.ts', es: 'src/i18n/es.ts' };
const pad = (n, t) => String(n).padStart(t, '0');
function fontes(caminho, locale) {
  const L = locale === 'pt-BR' ? null : locale; // 'en' | 'es' | null
  const indiceL = L ? [`content/indice.${L}.json`] : [];
  switch (caminho) {
    case '/': return ['src/pages/Home.tsx', 'src/i18n/home.ts', TEXTO_LOCALE[locale], 'content/cursos.json', 'content/indice.json', ...indiceL];
    case '/cursos': return ['src/pages/Cursos.tsx', 'content/cursos.json', 'content/indice.json'];
    case '/assinatura': return ['src/pages/Assinatura.tsx', 'src/config/planos.ts', 'src/lib/assinatura.ts'];
    case '/sobre': return ['src/pages/Sobre.tsx'];
    case '/por-que-linvuu': return ['src/pages/PorQue.tsx'];
    case '/contato': return ['src/pages/Contato.tsx'];
    case '/ex-alunos-udemy': return ['src/pages/ExAlunosUdemy.tsx'];
    case '/livros': return ['src/pages/Livros.tsx', ...fs.readdirSync(path.join(raiz, 'content', 'livros')).sort().map((id) => `content/livros/${id}/sumario.json`)];
  }
  let m;
  if ((m = caminho.match(/^\/curso\/([a-z]{2})\/dia\/(\d+)$/))) {
    const [, id, d] = m; const dia = pad(d, 3); const bloco = pad(Math.ceil(Number(d) / 4), 3);
    const base = [`content/idiomas/${id}/dia-${dia}.json`, `content/idiomas/${id}/aulas/aula-${bloco}.json`, `content/idiomas/${id}/complementos/aula-${bloco}.json`];
    return L ? [...base, `content/idiomas/${id}/${L}/dia-${dia}.json`, ...indiceL] : base;
  }
  if ((m = caminho.match(/^\/curso\/([a-z]{2})$/))) return ['content/cursos.json', 'content/indice.json', 'content/trilha.json', ...indiceL];
  if ((m = caminho.match(/^\/gramatica\/([a-z]{2})$/))) return [`content/gramatica/${m[1]}.json`, ...(L ? [`content/gramatica/${m[1]}.${L}.json`] : [])];
  if ((m = caminho.match(/^\/livros\/([a-z]{2})\/capitulo\/(\d+)$/))) return ['src/pages/Livros.tsx', `content/livros/${m[1]}/sumario.json`, `content/livros/${m[1]}/cap-${pad(m[2], 2)}.json`];
  if ((m = caminho.match(/^\/livros\/([a-z]{2})$/))) return ['src/pages/Livros.tsx', `content/livros/${m[1]}/sumario.json`, `content/livros/${m[1]}/cap-01.json`, `content/livros/${m[1]}/cap-02.json`];
  return null; // rota sem mapa de fontes: fica sem lastmod e é assinalada abaixo
}

// 4) Calcula e escreve o manifesto, com a cobertura assinalada.
const manifesto = {};
const semFonte = [];
for (const u of urls) {
  const completo = u.slice(SITE.length) || '/';
  const locale = completo === '/en' || completo.startsWith('/en/') ? 'en' : completo === '/es' || completo.startsWith('/es/') ? 'es' : 'pt-BR';
  const caminho = locale === 'pt-BR' ? completo : completo.slice(3) || '/';
  const deps = fontes(caminho, locale);
  const datas = (deps ?? []).map(dataDoFicheiro).filter(Boolean).sort();
  if (datas.length) manifesto[completo] = datas[datas.length - 1];
  else semFonte.push(completo);
}
const ordenado = Object.fromEntries(Object.entries(manifesto).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(path.join(raiz, 'content', 'lastmod.json'), JSON.stringify(ordenado, null, 2) + '\n');
console.log(`lastmod: ${Object.keys(ordenado).length} de ${urls.length} endereços com data verificável`);
if (semFonte.length) console.log(`sem lastmod (sem fonte datablável): ${semFonte.join(', ')}`);
