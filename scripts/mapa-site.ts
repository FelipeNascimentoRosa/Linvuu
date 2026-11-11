// Mapa do site: uma fotografia do que existe, de onde vem e como se prova.
// Nasce das MESMAS fontes que o servidor usa (src/App.tsx para as rotas, metaRota para status e índice,
// content/ para o material), então não vira texto que envelhece sozinho: rode de novo e ele se corrige.
// Uso: node --import tsx scripts/mapa-site.ts   (ou: npm run mapa:site)
// Saída: docs/MAPA-SITE.md — arquivo gerado, não editar à mão.
import fs from 'node:fs';
import path from 'node:path';
import { carregarDadosMeta, metaDaRota } from '../src/lib/metaRota.ts';
import { LOCALES_POR_PERFIL, caminhoEm, comPerfil, urlAbsolutaEm } from '../src/i18n/locales.ts';

const raiz = process.cwd();
const d = carregarDadosMeta(raiz);
if (!d) throw new Error('Não consegui ler content/cursos.json e content/indice.json.');

const andar = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return ['node_modules', 'dist', 'dist-apk', '.git'].includes(e.name) ? [] : andar(p);
    return [p];
  });

const linha = (v: unknown) => String(v ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------- 1. rotas do App.tsx
type Rota = { rota: string; tipo: string; componente: string; destino?: string };
const rotas: Rota[] = [];
for (const l of fs.readFileSync('src/App.tsx', 'utf8').split('\n')) {
  const m = l.match(/<Route\s+path="([^"]+)"\s+element=\{(.*)\}\s*\/>/);
  if (!m) continue;
  const [, rota, expr] = m;
  const componentes = [...expr.matchAll(/<([A-Z]\w+)/g)].map((x) => x[1]).filter((n) => n !== 'Navigate');
  const componente = componentes[componentes.length - 1] ?? '—';
  const so = /^<Navigate to="([^"]+)"/.exec(expr);
  if (so) rotas.push({ rota, tipo: 'redireciona', componente: '—', destino: so[1] });
  else if (/NATIVO &&\s*<Route/.test(l)) rotas.push({ rota, tipo: 'só no APK (não existe no site)', componente });
  else if (/NATIVO \?/.test(expr)) rotas.push({ rota, tipo: 'só no site (no APK, /conta)', componente });
  else if (rota === '*') rotas.push({ rota, tipo: 'não encontrada (404)', componente });
  else rotas.push({ rota, tipo: 'página', componente });
}

// Rotas com parâmetro, expandidas a partir do conteúdo real.
const idsCursos = d.cursos.map((c) => c.id);
const sessoes = idsCursos.reduce((s, id) => s + (d.indice[id]?.total ?? 0), 0);
const idsLivros = Object.keys(d.livros);
const capitulos = idsLivros.reduce((s, id) => s + Object.keys(d.livros[id].caps).length, 0);

const expandir = (rota: string): string[] => {
  if (rota === '/curso/:id') return idsCursos.map((id) => `/curso/${id}`);
  if (rota === '/livros/:id') return idsLivros.map((id) => `/livros/${id}`);
  if (rota === '/gramatica/:id') return idsCursos.map((id) => `/gramatica/${id}`);
  return [rota];
};

/** Cada página concreta, no perfil do domínio onde vive, com o que o servidor responderá. */
function inventario(perfil: 'br' | 'global', loc: (typeof LOCALES_POR_PERFIL)[number][1]) {
  return comPerfil(perfil, () => {
    const out: { caminho: string; url: string; componente: string; status: number; indice: boolean; titulo: string; descricao: number; em: number }[] = [];
    for (const { rota, componente, tipo } of rotas) {
      // Redirecionamentos (301 no server.ts) e páginas-folha não são avaliados como página: o metaRota devolveria
      // 404 porque não há documento ali, e o mapa passaria a reportar defeito onde existe redirecionamento correto.
      if (tipo === 'redireciona' || tipo.startsWith('só no APK') || rota === '*' || rota.includes(':n')) continue;
      if (rota.includes(':id') && !expandir(rota).length) continue;
      for (const base of expandir(rota)) {
        const p = caminhoEm(loc.codigo, base);
        const m = metaDaRota(p, d);
        out.push({ caminho: p, url: urlAbsolutaEm(loc.codigo, p), componente, status: m.status, indice: !m.semIndice, titulo: m.titulo ?? '', descricao: (m.descricao ?? '').length, em: (m.em ?? []).length });
      }
    }
    return out;
  });
}

const br = LOCALES_POR_PERFIL[0];
const global = LOCALES_POR_PERFIL[1];
const invBr = inventario(br[0], br[1]);
const invGlobal = inventario(global[0], global[1]);


// ---------------------------------------------------------------- 2. folhas de estilo e quem as veste
const css = andar('src').filter((f) => f.endsWith('.css'));
const fontes = andar('src').filter((f) => /\.tsx?$/.test(f));
const textoFontes = new Map(fontes.map((f) => [f, fs.readFileSync(f, 'utf8')]));
const rel = (f: string) => path.relative('src', f).replace(/\\/g, '/');
const folhas = css
  .map((f) => ({
    nome: rel(f),
    linhas: fs.readFileSync(f, 'utf8').split('\n').length,
    veste: fontes.filter((g) => textoFontes.get(g)!.includes(path.basename(f))).map(rel),
  }))
  .sort((a, b) => b.linhas - a.linhas);

// ---------------------------------------------------------------- 3. verificações que já existem
const scripts = fs
  .readdirSync('scripts')
  .filter((n) => fs.statSync(path.join('scripts', n)).isFile() && /^(testar|validar|medir|mapa)-/.test(n));
const npm = JSON.parse(fs.readFileSync('package.json', 'utf8')).scripts as Record<string, string>;
const verificacoes = Object.entries(npm).filter(([k]) => /^(testar|validar|medir|content|build|lint)/.test(k));

// ---------------------------------------------------------------- 4. conteúdo
const pastasConteudo = fs
  .readdirSync('content', { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => ({ pasta: e.name, json: andar(path.join('content', e.name)).filter((f) => f.endsWith('.json')).length }))
  .sort((a, b) => b.json - a.json);
const jsonRaiz = fs.readdirSync('content').filter((n) => n.endsWith('.json')).length;
const jsonTotal = pastasConteudo.reduce((s, p) => s + p.json, 0) + jsonRaiz;

// ---------------------------------------------------------------- 5. documento
const cont = (n: number, um: string, muitos: string) => `${n} ${n === 1 ? um : muitos}`;
const md: string[] = [];
md.push('# Mapa do site');
md.push('');
md.push(`Gerado por \`scripts/mapa-site.ts\` em ${new Date().toISOString().slice(0, 10)}. **Não editar à mão**: rode \`npm run mapa:site\` de novo.`);
md.push('');
md.push('Responde, sem abrir navegador, três perguntas: o que existe, de onde vem e como se prova que está certo. Pedagogia e texto final são revisão humana do Felipe; este mapa não opina sobre conteúdo.');
md.push('');
md.push('## Resumo');
md.push('');
md.push(`- Rotas declaradas em \`src/App.tsx\`: **${rotas.length}**`);
md.push(`- Páginas concretas no .com.br (pt-BR): **${invBr.length}** — ${cont(invBr.filter((x) => x.indice).length, 'indexável', 'indexáveis')}`);
md.push(`- Sessões de aula (\`/curso/:id/dia/:n\`, fora do índice): **${sessoes}** em ${cont(idsCursos.length, 'curso', 'cursos')}`);
md.push(`- Capítulos de livro: **${capitulos}** em ${cont(idsLivros.length, 'livro', 'livros')}`);
md.push(`- Folhas de CSS: **${folhas.length}** (${folhas.reduce((s, f) => s + f.linhas, 0)} linhas)`);
md.push(`- Comandos de verificação no \`package.json\`: **${verificacoes.length}**`);
md.push(`- Arquivos JSON de conteúdo: **${jsonTotal}**`);
md.push('');
// Limites idênticos aos de scripts/testar-titulos.ts: título até 60 caracteres, descrição entre 120 e 160.
type Linha = (typeof invBr)[number];
const foraDaFaixa = (inv: Linha[]) => inv.filter((x) => x.indice && (x.titulo.length > 60 || x.descricao < 120 || x.descricao > 160));
const semDescricao = (inv: Linha[]) => inv.filter((x) => x.indice && x.descricao === 0);
const dominios: [string, Linha[]][] = [['.com.br', invBr], ['.com', invGlobal]];
md.push('## 0. Checagens objetivas');
md.push('');
md.push('Mesma régua de `scripts/testar-titulos.ts` (título até 60 caracteres, descrição entre 120 e 160), aplicada ao site inteiro: o teste percorre a lista dele, este mapa percorre todas as páginas indexáveis dos dois domínios.');
md.push('');
md.push('| Domínio | Indexáveis | Fora da faixa | Indexável sem descrição |');
md.push('|---|---|---|---|');
for (const [nome, inv] of dominios) md.push(`| ${nome} | ${inv.filter((x) => x.indice).length} | ${foraDaFaixa(inv).length} | ${semDescricao(inv).length} |`);
md.push('');
const suspeitas = [...new Map([...foraDaFaixa(invBr), ...semDescricao(invBr)].map((x) => [x.caminho, x])).values()];
if (suspeitas.length) {
  md.push('Páginas indexáveis do .com.br fora da régua — nenhuma é defeito provado, mas cada uma é ponto de ataque:');
  md.push('');
  md.push('| Caminho | Título (chars) | Descrição (chars) | O que olhar |');
  md.push('|---|---|---|---|');
  for (const x of suspeitas) {
    const motivo = x.descricao === 0 ? 'sem descrição de busca' : x.titulo.length > 60 ? 'título acima de 60' : 'descrição fora de 120–160';
    md.push(`| \`${x.caminho}\` | ${x.titulo.length} | ${x.descricao} | ${motivo} |`);
  }
  md.push('');
}
md.push('## 1. Rotas do .com.br (avaliadas pelo mesmo `metaRota` que o servidor usa)');
md.push('');
md.push('| Caminho | Componente | HTTP | No índice | Título (chars) | Descrição (chars) | Idiomas |');
md.push('|---|---|---|---|---|---|---|');
for (const x of invBr) md.push(`| \`${x.caminho}\` | ${linha(x.componente) || '—'} | ${x.status} | ${x.indice ? 'sim' : 'não'} | ${x.titulo.length} | ${x.descricao} | ${x.em || 1} |`);
md.push('');
md.push('Todas as rotas, com o tipo de cada uma:');
md.push('');
md.push('| Rota | Tipo | Componente | Observação |');
md.push('|---|---|---|---|');
for (const r of rotas) md.push(`| \`${r.rota}\` | ${r.tipo} | ${r.componente} | ${r.destino ? '→ ' + r.destino : ''} |`);
md.push('');
md.push(`No .com (inglês): ${cont(invGlobal.length, 'página concreta', 'páginas concretas')}, ${cont(invGlobal.filter((x) => x.indice).length, 'indexável', 'indexáveis')}. A mesma rota pode ter status diferente em cada domínio — o mapa avalia cada perfil separadamente, como o servidor.`);
md.push('');
md.push('## 2. Folhas de estilo e quem veste cada uma');
md.push('');
md.push('A coluna "veste" sai da importação real no código. Folha global (`styles.css`, `redesign.css`, `camadas.css`) alcança também a área do aluno, que tem regra própria (raio 0, sem sombra): mudança de gosto ali é regressão, não melhoria.');
md.push('');
md.push('| Folha | Linhas | Importada por |');
md.push('|---|---|---|');
for (const f of folhas) md.push(`| \`${f.nome}\` | ${f.linhas} | ${f.veste.length ? f.veste.map((v) => '`' + v + '`').join(', ') : '— (não importada por TS/TSX)'} |`);
md.push('');
md.push('## 3. Verificações disponíveis');
md.push('');
md.push('| Comando | O que executa |');
md.push('|---|---|');
for (const [k, v] of verificacoes) md.push(`| \`npm run ${k}\` | \`${linha(v)}\` |`);
md.push('');
md.push(`Scripts em \`scripts/\`: ${scripts.length} (${cont(scripts.filter((s) => s.startsWith('testar-')).length, 'teste', 'testes')}, ${cont(scripts.filter((s) => s.startsWith('validar-')).length, 'validador', 'validadores')}, ${cont(scripts.filter((s) => s.startsWith('medir-')).length, 'medição', 'medições')}).`);
md.push('');
md.push('## 4. Conteúdo');
md.push('');
md.push('| Pasta | Arquivos JSON |');
md.push('|---|---|');
md.push(`| \`content/*.json\` (raiz) | ${jsonRaiz} |`);
for (const p of pastasConteudo) md.push(`| \`content/${p.pasta}/\` | ${p.json} |`);
md.push('');
md.push('## 5. Painel de ataque');
md.push('');
md.push('Dividido por risco. **Sem arrependimento**: conserta defeito, não pode piorar. **Gosto**: muda aparência, depende de aprovação humana tela por tela.');
md.push('');
md.push('| Frente | Grupo | Como se prova | Estado |');
md.push('|---|---|---|---|');
md.push('| Idioma vazando no .com.br | sem arrependimento | `npm run testar:dominio` | a medir |');
md.push('| Link quebrado e 404 | sem arrependimento | `npm run build` + varredura das rotas em `dist` | a medir |');
md.push('| Contraste AA par por par | sem arrependimento | `npm run validar:design` | home medida; demais páginas não |');
md.push('| JSON de conteúdo inválido | sem arrependimento | `npm run content:check` | a medir |');
md.push('| Teclado, foco e leitor de tela | sem arrependimento | inspeção por rota com Playwright | a medir |');
md.push('| Aparência das páginas internas | gosto | captura antes/depois em 1440×900 e 390×844 | proposta |');
md.push('');
md.push('## 6. Ordem sugerida');
md.push('');
md.push('1. Grupo sem arrependimento, de cima para baixo do §5 — cada frente com o seu commit atômico.');
md.push('2. Grupo de gosto, uma família de páginas por vez, com captura antes/depois e aprovação do Felipe antes do merge.');
md.push('3. Conteúdo e pedagogia: fora deste mapa. Revisão do Felipe.');
md.push('');
md.push('## 7. Limites deste mapa');
md.push('');
md.push('- Descreve o que o **código declara** e o que o `metaRota` responde; não abre navegador nem mede desempenho.');
md.push('- Não julga aparência, texto nem pedagogia.');
md.push('- Contagem de sessões e capítulos é contagem de arquivos de conteúdo, não de páginas visitadas.');
md.push('');

fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync(path.join('docs', 'MAPA-SITE.md'), md.join('\n'), 'utf8');

console.log(`MAPA-SITE.md gerado: ${rotas.length} rotas, ${invBr.length} páginas no .com.br (${invBr.filter((x) => x.indice).length} indexáveis), ${sessoes} sessões, ${capitulos} capítulos, ${folhas.length} folhas de CSS, ${jsonTotal} JSON de conteúdo.`);
