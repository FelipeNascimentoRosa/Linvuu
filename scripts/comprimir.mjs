// Pré-compressão Brotli dos estáticos de texto do website (scripts/comprimir.mjs).
//
// Roda no fim de `npm run build` (ver package.json) e gera «<arquivo>.br» ao lado de cada
// estático de texto em dist/. O servidor (server.ts) serve o .br pronto a quem aceita Brotli,
// sem gastar CPU por pedido; quem não aceita continua no express.static + gzip dinâmico.
//
// Porquê só no website: o build do APK escreve em dist-apk/ e corre dentro da app nativa,
// onde pré-comprimir não serve para nada — com VITE_ALVO=apk este script não faz nada e o
// build:apk fica exatamente como estava. Sem dependências novas: usa o zlib do Node.
//
// Falhas por arquivo são registadas e não derrubam o build: sem o .br, esse arquivo segue
// pelo caminho de sempre (estático/gzip), por isso a compressão é otimização, não requisito.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const alvo = process.env.VITE_ALVO || 'website';
if (alvo === 'apk') {
  console.log('[comprimir] alvo apk: pré-compressão ignorada (a app nativa não usa dist/).');
  process.exit(0);
}

const raiz = path.resolve('dist');
if (!fs.existsSync(raiz)) {
  console.log('[comprimir] dist/ não existe: nada a comprimir.');
  process.exit(0);
}

const EXTENSOES = new Set(['.js', '.css', '.html', '.svg', '.json', '.xml', '.txt']);
const TAMANHO_MINIMO = 1024; // abaixo disto o ganho não paga o pedido extra nem o disco

let comprimidos = 0;
let ignorados = 0;
let falhas = 0;
let bytesAntes = 0;
let bytesDepois = 0;
const maiores = [];

function comprimirArquivo(arquivo) {
  const ext = path.extname(arquivo).toLowerCase();
  if (!EXTENSOES.has(ext)) return;
  const tamanho = fs.statSync(arquivo).size;
  if (tamanho < TAMANHO_MINIMO) { ignorados++; return; }
  try {
    const original = fs.readFileSync(arquivo);
    const br = zlib.brotliCompressSync(original, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: tamanho,
      },
    });
    fs.writeFileSync(`${arquivo}.br`, br);
    comprimidos++;
    bytesAntes += tamanho;
    bytesDepois += br.length;
    maiores.push({ arquivo: path.relative(raiz, arquivo), antes: tamanho, depois: br.length });
  } catch (e) {
    falhas++;
    console.error(`[comprimir] falhou ${path.relative(raiz, arquivo)}: ${e instanceof Error ? e.message : e}`);
  }
}

function andar(dir) {
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const caminho = path.join(dir, entrada.name);
    if (entrada.isDirectory()) andar(caminho);
    else if (entrada.isFile()) comprimirArquivo(caminho);
  }
}

const inicio = Date.now();
andar(raiz);
maiores.sort((a, b) => (b.antes - b.depois) - (a.antes - a.depois));
console.log(`[comprimir] ${comprimidos} arquivos com .br (${bytesAntes} → ${bytesDepois} bytes), ${ignorados} abaixo de ${TAMANHO_MINIMO} bytes ignorados, ${falhas} falhas, em ${((Date.now() - inicio) / 1000).toFixed(1)}s.`);
for (const m of maiores.slice(0, 3)) console.log(`[comprimir]   ${m.arquivo}: ${m.antes} → ${m.depois}`);
