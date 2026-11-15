// Validação do sistema de design (tokens da área do aluno). Roda no CI depois do build.
// 1. Contraste de texto (AA 4,5:1 obrigatório; AAA 7:1 informado) e de não texto (3:1), nos dois temas.
//    Lê os valores reais de src/tokens.css e src/redesign.css. Não usa valores copiados.
// 2. Nenhum hex direto em CSS Module de componente: só var().
// 3. CSS de produção (gzip) abaixo de 50 kB, quando existe dist/.
// Uso: node scripts/validar-design.mjs

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const ler = (p) => readFileSync(join(RAIZ, p), 'utf8');
const semComentarios = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const tokens = semComentarios(ler('src/tokens.css'));
const redesign = semComentarios(ler('src/redesign.css'));

// Declarações de um bloco exato (ex.: ".area-aluno{") do redesign.css.
function declaracoes(css, seletor) {
  const escapado = seletor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = css.match(new RegExp(`${escapado}\\{([^}]*)\\}`));
  const mapa = new Map();
  if (!m) return mapa;
  for (const d of m[1].split(';')) {
    const i = d.indexOf(':');
    if (i > 0) mapa.set(d.slice(0, i).trim(), d.slice(i + 1).trim());
  }
  return mapa;
}

const claro = declaracoes(redesign, '.area-aluno');
const escuro = declaracoes(redesign, '.area-aluno[data-tema="escuro"]');
const raizTokens = new Map();
for (const m of tokens.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) raizTokens.set(m[1], m[2].trim());

function resolver(nome, bloco, depth = 0) {
  if (depth > 12) return null;
  const v = bloco.get(nome) ?? (bloco === escuro ? claro.get(nome) : undefined) ?? raizTokens.get(nome);
  if (v === undefined) return null;
  return v.replace(/var\((--[\w-]+)(?:\s*,\s*([^)]*))?\)/g, (_, n, fb) => {
    const r = resolver(n, bloco, depth + 1);
    return r ?? fb ?? '';
  });
}

// Cor -> { r, g, b, a } em sRGB com gama (0..1). null se não for cor.
function cor(v) {
  if (!v) return null;
  v = v.trim();
  if (v === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  const hex = v.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 };
  }
  const rgb = v.match(/^rgba?\((.*)\)$/i);
  if (rgb) {
    const p = rgb[1].replace('/', ' ').split(/[\s,]+/).filter(Boolean);
    const canal = (x) => (x.endsWith('%') ? parseFloat(x) / 100 : parseFloat(x) / 255);
    const alfa = p[3] === undefined ? 1 : p[3].endsWith('%') ? parseFloat(p[3]) / 100 : parseFloat(p[3]);
    return { r: canal(p[0]), g: canal(p[1]), b: canal(p[2]), a: alfa };
  }
  const ok = v.match(/^oklch\((.*)\)$/i);
  if (ok) {
    const p = ok[1].replace('/', ' ').split(/\s+/).filter(Boolean);
    const L = p[0].endsWith('%') ? parseFloat(p[0]) / 100 : parseFloat(p[0]);
    const C = parseFloat(p[1]);
    const H = (parseFloat(p[2]) * Math.PI) / 180;
    const a = C * Math.cos(H), b = C * Math.sin(H);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
    const lin = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    const enc = (x) => {
      const c = Math.min(1, Math.max(0, x));
      return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    };
    const alfa = p[3] === undefined ? 1 : p[3].endsWith('%') ? parseFloat(p[3]) / 100 : parseFloat(p[3]);
    return { r: enc(lin[0]), g: enc(lin[1]), b: enc(lin[2]), a: alfa };
  }
  return null;
}

// Mistura uma cor (possivelmente transparente) sobre um fundo opaco, em gama sRGB.
const sobre = (c, fundo) => ({ r: c.r * c.a + fundo.r * (1 - c.a), g: c.g * c.a + fundo.g * (1 - c.a), b: c.b * c.a + fundo.b * (1 - c.a), a: 1 });
const lum = ({ r, g, b }) => {
  const l = (x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * l(r) + 0.7152 * l(g) + 0.0722 * l(b);
};
const razao = (a, b) => {
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

// Pares a verificar por tema: [nome, texto/não texto, token de frente, token de fundo]
const pares = {
  escuro: [
    ['texto sobre fundo base', 'texto', '--sem-texto', '--sem-bg'],
    ['texto sobre superfície', 'texto', '--sem-texto', '--sem-superficie'],
    ['texto sobre superfície 2 (hover)', 'texto', '--sem-texto', '--sem-superficie-2'],
    ['texto secundário sobre fundo base', 'texto', '--sem-texto-2', '--sem-bg'],
    ['texto secundário sobre superfície 2', 'texto', '--sem-texto-2', '--sem-superficie-2'],
    ['texto da aula (grafite sobre papel)', 'texto', '--grafite', '--papel'],
    ['texto do botão primário', 'texto', '--sem-acao-texto', '--sem-acao'],
    ['foco sobre fundo base', 'nao-texto', '--sem-foco', '--sem-bg'],
    ['progresso e indicador sobre fundo base', 'nao-texto', '--sem-acao', '--sem-bg'],
  ],
  claro: [
    ['texto sobre fundo base', 'texto', '--sem-texto', '--sem-bg'],
    ['texto secundário sobre fundo base', 'texto', '--sem-texto-2', '--sem-bg'],
    ['texto secundário sobre superfície 2', 'texto', '--sem-texto-2', '--sem-superficie-2'],
    ['texto da aula (grafite sobre papel)', 'texto', '--grafite', '--papel'],
    ['texto do botão primário', 'texto', '--sem-acao-texto', '--sem-acao'],
    ['foco sobre fundo base', 'nao-texto', '--sem-foco', '--sem-bg'],
    ['progresso e indicador sobre fundo base', 'nao-texto', '--sem-acao', '--sem-bg'],
  ],
};

// A composição pública usa os mesmos tons centralizados em tokens.css.
pares.claro.push(
  ['site: destaque ocre no papel', 'texto', '--site-ocre-texto', '--papel'],
  ['site: texto de apoio no papel', 'texto', '--site-texto-lead', '--papel'],
  ['site: texto secundário no papel', 'texto', '--site-texto-secundario', '--papel'],
  ['site: botão principal', 'texto', '--site-branco', '--verde-floresta'],
  ['site: botão em hover', 'texto', '--site-branco', '--site-acao-hover'],
  ['site: frase no cartão', 'texto', '--verde-floresta', '--site-cartao'],
  ['home: texto e controles sobre azul claro', 'texto', '--home-azul-texto', '--home-azul-claro'],
  ['home: botão de áudio em hover', 'texto', '--home-azul-texto', '--home-azul-hover'],
  ['home: texto sobre marfim', 'texto', '--verde-floresta', '--home-marfim'],
  ['site: texto de plano', 'texto', '--site-texto-plano', '--site-plano'],
  ['site: texto sobre verde', 'texto', '--site-texto-inverso', '--verde-floresta'],
  ['site: opção selecionada', 'texto', '--verde-floresta', '--site-selecao'],
  ['site: cartão de idioma', 'texto', '--site-texto-idioma', '--site-idioma-verde'],
  ['site: resposta de dúvida', 'texto', '--site-texto-faq', '--papel'],
  ['site: selo em pílula sobre ocre', 'texto', '--grafite', '--ocre-claro'],
);

let falhas = 0;
const linhas = [];
for (const [tema, bloco] of [['escuro', escuro], ['claro', claro]]) {
  for (const [nome, tipo, frente, fundo] of pares[tema]) {
    const vf = resolver(frente, bloco), vb = resolver(fundo, bloco);
    const cf = cor(vf), cb = cor(vb);
    if (!cf || !cb) {
      falhas++;
      linhas.push(`FALHA  [${tema}] ${nome}: não consegui ler ${frente} (${vf}) ou ${fundo} (${vb})`);
      continue;
    }
    const base = cb.a < 1 ? sobre(cb, { r: 0, g: 0, b: 0, a: 1 }) : cb;
    const frenteOpaca = sobre(cf, base);
    const r = razao(frenteOpaca, base);
    const minimo = tipo === 'texto' ? 4.5 : 3;
    const aaa = tipo === 'texto' ? (r >= 7 ? 'AAA' : 'AA') : '';
    const ok = r >= minimo;
    if (!ok) falhas++;
    linhas.push(`${ok ? 'ok    ' : 'FALHA '} [${tema}] ${nome}: ${r.toFixed(2)}:1 (mínimo ${minimo}:1) ${aaa}`);
  }
}

// 2. Hex direto em CSS Module de componente
const modulos = [];
(function varrer(dir) {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) varrer(p);
    else if (nome.endsWith('.module.css')) modulos.push(p);
  }
})(join(RAIZ, 'src'));
for (const arq of modulos) {
  const css = semComentarios(readFileSync(arq, 'utf8'));
  const achados = css.match(/#[0-9a-fA-F]{3,8}\b/g);
  const rel = relative(RAIZ, arq);
  if (achados) {
    falhas++;
    linhas.push(`FALHA  ${rel}: hex direto (${[...new Set(achados)].join(', ')}). Use só var().`);
  } else linhas.push(`ok     ${rel}: só var()`);
}

for (const p of ['src/pages/home-brasileiros.css', 'src/site-publico.css']) {
  const css = semComentarios(ler(p));
  const coresFixas = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/.test(css);
  if (coresFixas) falhas++;
  linhas.push(`${coresFixas ? 'FALHA ' : 'ok    '} ${p}: cores via tokens`);
}

// 3. Tamanho do CSS de produção
const dist = join(RAIZ, 'dist', 'assets');
if (existsSync(dist)) {
  const css = readdirSync(dist).filter((n) => n.endsWith('.css'));
  const gz = css.reduce((s, n) => s + gzipSync(readFileSync(join(dist, n))).length, 0);
  const kb = gz / 1024;
  const ok = kb < 50;
  if (!ok) falhas++;
  linhas.push(`${ok ? 'ok    ' : 'FALHA '} CSS de produção: ${kb.toFixed(1)} kB gzip (limite 50 kB)`);
} else {
  linhas.push('pulado CSS de produção: dist/ não existe (rode npm run build antes)');
}

// 13/11/2026: o papel antigo (#F5F1E8, creme) foi trocado em #602 mas sobrou em 9 arquivos — dois tons de papel na
// mesma tela, que o auditor externo viu e este validador não pegava. Agora nenhum arquivo de src/ pode trazer o creme antigo.
{
  const antigos = [];
  const varrer = (dir) => { for (const n of readdirSync(dir, { withFileTypes: true })) { const f = join(dir, n.name); if (n.isDirectory()) varrer(f); else if (/\.(css|tsx?|svg|html)$/.test(n.name) && f !== join(RAIZ, 'src', 'tokens.css')) { const t = readFileSync(f, 'utf8'); if (/f5f1e8|245,\s*241,\s*232/i.test(t)) antigos.push(f.slice(RAIZ.length + 1)); } } };
  varrer(join(RAIZ, 'src'));
  if (antigos.length) falhas++;
  linhas.push(`${antigos.length ? 'FALHA ' : 'ok    '} papel antigo #F5F1E8 fora de tokens.css: ${antigos.length ? antigos.join(', ') : 'nenhum'}`);
}
console.log(linhas.join('\n'));
console.log(falhas ? `\n${falhas} falha(s).` : '\nSistema de design válido.');
process.exit(falhas ? 1 : 0);
