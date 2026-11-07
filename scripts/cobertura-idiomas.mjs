// Matriz de cobertura: para cada curso (idioma estudado) e cada língua de explicação (en, es), quantas sessões e gramáticas existem.
// Uso: node scripts/cobertura-idiomas.mjs [--escrever]   (com --escrever grava docs/COBERTURA-IDIOMAS.md)
import fs from 'node:fs';
import path from 'node:path';
const raiz = path.resolve(import.meta.dirname, '..');
const idiomasDir = path.join(raiz, 'content', 'idiomas');
const gramDir = path.join(raiz, 'content', 'gramatica');
const FONTE = { br: 'en' }; // todos os outros cursos foram escritos em português
const EXPL = ['pt', 'en'];
const conta = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => /^dia-\d+\.json$/.test(f)).length : 0);
const linhas = [];
const cursos = fs.readdirSync(idiomasDir).filter((c) => fs.statSync(path.join(idiomasDir, c)).isDirectory()).sort();
for (const c of cursos) {
  const fonte = FONTE[c] ?? 'pt';
  const total = conta(path.join(idiomasDir, c));
  const cel = EXPL.map((l) => {
    const sessoes = l === fonte ? total : conta(path.join(idiomasDir, c, l));
    const g = l === fonte ? fs.existsSync(path.join(gramDir, `${c}.json`)) : fs.existsSync(path.join(gramDir, `${c}.${l}.json`));
    return `${sessoes}/${total} · gramática ${g ? 'sim' : 'não'}`;
  });
  linhas.push(`| ${c} | ${fonte} | ${cel.join(' | ')} |`);
}
const md = `# Cobertura por língua de explicação\n\nGerado por \`node scripts/cobertura-idiomas.mjs --escrever\`. Cada célula: sessões existentes/sessões do curso · gramática na língua.\n\nOnde ficam os arquivos: sessões em \`content/idiomas/<curso>/<l>/dia-NNN.json\` (a língua de origem fica em \`content/idiomas/<curso>/\`), gramática em \`content/gramatica/<curso>.<l>.json\` (a de origem é \`<curso>.json\`), índice de títulos em \`content/indice.<l>.json\`. Ver \`docs/ESTRUTURA-INTERNACIONAL.md\`.\n\n| Curso | Escrito em | Explicado em pt | Explicado em en | Explicado em es |\n|---|---|---|---|---|\n${linhas.join('\n')}\n`;
if (process.argv.includes('--escrever')) fs.writeFileSync(path.join(raiz, 'docs', 'COBERTURA-IDIOMAS.md'), md); else console.log(md);
