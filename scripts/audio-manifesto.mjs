#!/usr/bin/env node
// Manifesto do áudio PAGO: só os hashes FNV-1a (8 hex) dos MP3 que existem no repositório privado Linvuu-Audio.
// Não contém texto nem áudio. Serve para a CI auditar a cobertura do áudio pago sem clonar o repositório privado.
//
//   node scripts/audio-manifesto.mjs --dir "C:/site/Audio- Linvuu"        regrava content/audio-privado-manifesto.json a partir do clone
//   node scripts/audio-manifesto.mjs --dir "C:/site/Audio- Linvuu" --conferir   só confere (exit 1 se o manifesto estiver desatualizado)
//
// Mesmo critério de scripts/auditar-pedagogia.mjs: união de audio-privado/<idioma>/ e audio-privado-v2/<idioma>/.
// scripts/gerar-audios-eleven.mjs chama mesclarNoManifesto() a cada MP3 pago gerado, para o manifesto nunca ficar para trás.
import fs from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
export const ARQUIVO = path.join(raiz, 'content', 'audio-privado-manifesto.json');
const HASH = /^[0-9a-f]{8}$/;

export function lerManifesto() {
  if (!fs.existsSync(ARQUIVO)) return null;
  return JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
}

/** Grava com um idioma por linha (diff pequeno no Git) e hashes ordenados. */
export function gravarManifesto(idiomas) {
  const ordenado = Object.fromEntries(Object.keys(idiomas).sort().map((id) => [id, [...new Set(idiomas[id])].filter((h) => HASH.test(h)).sort()]));
  const linhas = Object.entries(ordenado).map(([id, hs]) => `  ${JSON.stringify(id)}: ${JSON.stringify(hs)}`);
  const texto = `{\n "versao": 1,\n "descricao": "Hashes FNV-1a dos MP3 pagos do repositório privado Linvuu-Audio. Sem texto e sem áudio. Gerado por scripts/audio-manifesto.mjs.",\n "idiomas": {\n${linhas.join(',\n')}\n }\n}\n`;
  fs.writeFileSync(ARQUIVO, texto);
  return ordenado;
}

/** Hashes dos MP3 de um clone do Linvuu-Audio, por idioma. */
export function hashesDoClone(dir) {
  const out = {};
  for (const sub of ['audio-privado', 'audio-privado-v2']) {
    const base = path.join(dir, sub);
    if (!fs.existsSync(base)) continue;
    for (const id of fs.readdirSync(base)) {
      const p = path.join(base, id);
      if (!fs.statSync(p).isDirectory()) continue;
      (out[id] ??= new Set());
      for (const f of fs.readdirSync(p)) if (f.endsWith('.mp3') && HASH.test(f.slice(0, -4))) out[id].add(f.slice(0, -4));
    }
  }
  return Object.fromEntries(Object.entries(out).map(([id, s]) => [id, [...s]]));
}

/** Acrescenta hashes de um idioma ao manifesto (usado pelo gerador de áudio). Nunca remove. */
export function mesclarNoManifesto(idioma, hashes) {
  const atual = lerManifesto()?.idiomas ?? {};
  atual[idioma] = [...(atual[idioma] ?? []), ...hashes];
  gravarManifesto(atual);
}

if (process.argv[1]?.endsWith('audio-manifesto.mjs')) {
  const args = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a, i, arr) => [a.slice(2), true]));
  const iDir = process.argv.indexOf('--dir');
  const dir = iDir >= 0 ? path.resolve(process.argv[iDir + 1]) : process.env.AUDIO_PRIVADO_DIR ? path.resolve(process.env.AUDIO_PRIVADO_DIR) : path.join(raiz, '.audio-privado');
  if (!fs.existsSync(dir)) { console.error(`clone do Linvuu-Audio não encontrado: ${dir} (use --dir)`); process.exit(1); }
  const novo = hashesDoClone(dir);
  if (args.conferir) {
    const atual = lerManifesto()?.idiomas ?? {};
    let dif = 0;
    for (const id of new Set([...Object.keys(novo), ...Object.keys(atual)])) {
      const a = new Set(atual[id] ?? []), b = new Set(novo[id] ?? []);
      const falta = [...b].filter((h) => !a.has(h)).length, sobra = [...a].filter((h) => !b.has(h)).length;
      if (falta || sobra) { dif++; console.log(`${id}: ${falta} no clone e fora do manifesto, ${sobra} no manifesto e fora do clone`); }
    }
    if (dif) { console.error('manifesto desatualizado: rode scripts/audio-manifesto.mjs --dir <clone>'); process.exit(1); }
    console.log('manifesto confere com o clone');
  } else {
    const g = gravarManifesto(novo);
    console.log(Object.entries(g).map(([id, hs]) => `${id}: ${hs.length}`).join(' · '));
  }
}
