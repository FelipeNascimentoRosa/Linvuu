// TRAVA do conteúdo em inglês do linvuu.com (ver docs/LEIA-ME-INTERNACIONAL.md).
// Registra a impressão digital (sha256) de todo arquivo servido em inglês para quem fala inglês:
// dias traduzidos content/idiomas/<id>/en/, o curso br (escrito em inglês), as gramáticas *.en.json e br.json.
//   node scripts/travas-en.mjs            confere: arquivo travado alterado ou apagado = erro (build/CI param)
//   node scripts/travas-en.mjs --atualizar regrava content/travas-en.json (mudança DELIBERADA, aparece no diff do PR)
// Arquivo novo (curso crescendo) não quebra a conferência, mas fica listado até ser travado.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const raiz = path.resolve(import.meta.dirname, '..');
const arqTrava = path.join(raiz, 'content', 'travas-en.json');
const rel = (f) => path.relative(raiz, f).split(path.sep).join('/');
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const dias = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => /^dia-\d+\.json$/.test(f)).map((f) => path.join(d, f)) : []);

function servidosEmIngles() {
  const out = [];
  const idiomas = path.join(raiz, 'content', 'idiomas');
  for (const id of fs.readdirSync(idiomas)) {
    out.push(...dias(path.join(idiomas, id, 'en')));
    if (id === 'br') out.push(...dias(path.join(idiomas, id))); // curso br: escrito em inglês
  }
  const g = path.join(raiz, 'content', 'gramatica');
  for (const f of fs.readdirSync(g)) if (f.endsWith('.en.json') || f === 'br.json') out.push(path.join(g, f));
  return out.sort();
}

const atual = Object.fromEntries(servidosEmIngles().map((f) => [rel(f), sha(f)]));
if (process.argv.includes('--atualizar')) {
  fs.writeFileSync(arqTrava, JSON.stringify(atual, null, 1) + '\n');
  console.log(`travas-en: ${Object.keys(atual).length} arquivos em inglês travados`);
  process.exit(0);
}
const trava = fs.existsSync(arqTrava) ? JSON.parse(fs.readFileSync(arqTrava, 'utf8')) : {};
const erros = [];
for (const [f, h] of Object.entries(trava)) {
  if (!(f in atual)) erros.push(`${f}: travado, mas foi APAGADO`);
  else if (atual[f] !== h) erros.push(`${f}: travado, mas foi ALTERADO`);
}
const novos = Object.keys(atual).filter((f) => !(f in trava));
if (erros.length) {
  console.error(`TRAVA EN (docs/LEIA-ME-INTERNACIONAL.md) — conteúdo em inglês do linvuu.com mudou sem destravar:\n${erros.slice(0, 20).join('\n')}${erros.length > 20 ? `\n… e mais ${erros.length - 20}` : ''}\nSe a mudança é deliberada e revisada: node scripts/travas-en.mjs --atualizar (e diga no PR o porquê).`);
  process.exit(1);
}
console.log(`travas-en: ok — ${Object.keys(trava).length} arquivos em inglês intactos${novos.length ? `; ${novos.length} novos ainda sem trava (rode --atualizar no PR que os cria)` : ''}`);
