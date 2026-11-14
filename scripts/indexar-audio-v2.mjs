// Refaz public/audio/v2/<idioma>/index.json a partir dos MP3 que estão na pasta.
// Para quando se grava ou troca um MP3 à mão (nome do arquivo = hash do texto, como em src/lib/audio.ts).
//   node scripts/indexar-audio-v2.mjs --idioma=ru            grava o index.json
//   node scripts/indexar-audio-v2.mjs --idioma=ru --simular  só mostra o que mudaria
// O index.json é a lista ordenada dos hashes; o site só toca o MP3 que está na lista (senão cai na voz do navegador).
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => { const [k, v = 'true'] = a.slice(2).split('='); return [k, v]; }));
const idioma = args.idioma;
if (!/^[a-z]{2}$/.test(idioma ?? '')) { console.error('uso: node scripts/indexar-audio-v2.mjs --idioma=ru [--simular]'); process.exit(1); }
const dir = path.resolve(import.meta.dirname, '..', 'public', 'audio', 'v2', idioma);
if (!fs.existsSync(dir)) { console.error(`pasta inexistente: ${dir}`); process.exit(1); }

const nomes = fs.readdirSync(dir).filter((f) => /^[0-9a-f]{8}\.mp3$/.test(f));
const novo = nomes.map((f) => f.slice(0, 8)).sort();
const arq = path.join(dir, 'index.json');
const atual = fs.existsSync(arq) ? JSON.parse(fs.readFileSync(arq, 'utf8')) : [];
const antes = new Set(atual), depois = new Set(novo);
const entram = novo.filter((h) => !antes.has(h)), saem = atual.filter((h) => !depois.has(h));
console.log(`${idioma}: ${novo.length} MP3 na pasta; index tinha ${atual.length}; entram ${entram.length}, saem ${saem.length}`);
if (entram.length) console.log('entram:', entram.join(' '));
if (saem.length) console.log('saem (arquivo não existe mais):', saem.join(' '));
if (args.simular === 'true') process.exit(0);
fs.writeFileSync(arq, JSON.stringify(novo) + '\n');
console.log(`index.json gravado (${novo.length} hashes)`);
