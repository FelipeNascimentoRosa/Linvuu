#!/usr/bin/env node
// Gera um vídeo vertical 1080×1920 (Shorts/Reels/TikTok) a partir de um tópico REAL da gramática da Linvuu, com HyperFrames
// (heygen-com/hyperframes, Apache-2.0 — o motor oficial de vídeo da Linvuu; nunca Remotion).
// Nada é inventado: título, regra, exemplos, tradução e tabela saem de content/gramatica/<idioma>(.en).json; o áudio é o MP3
// nativo publicado em public/audio/v2/<idioma>/<hash>.mp3 (o mesmo arquivo que o site toca). Exemplo sem áudio publicado = fora do vídeo.
// Transliteração: só para alfabeto cirílico, por tabela fixa (conversão mecânica, sem tonicidade). IPA não é gerado: dependeria de
// redução vocálica e acento que o dado não traz, e inventar seria pior que omitir.
// Animação só em CSS (@keyframes): o runtime do HyperFrames posiciona as animações do documento a cada quadro; sem GSAP.
//
// Uso:
//   node scripts/midia/gerar-video.mjs --idioma ru --topico a7-s3-1 --dominio br [--saida output/midia] [--so-projeto]
// Saída em <saida>/video-<dominio>-<idioma>-<topico>/: projeto/ (HTML + fontes + áudios) e video.mp4.
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { execFileSync, spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(import.meta.url);
const L = 1080, A = 1920;

const args = process.argv.slice(2);
const arg = (n, p) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : p; };
const idioma = arg('idioma'), dominio = arg('dominio', 'br'), topicoId = arg('topico');
const saidaBase = arg('saida', join(RAIZ, 'output', 'midia'));
const falhar = (m) => { console.error(`gerar-video: ${m}`); process.exit(1); };
if (!idioma || !topicoId) falhar('uso: --idioma <id> --topico <id> [--dominio br|com]');
if (!['br', 'com'].includes(dominio)) falhar('--dominio deve ser br ou com');

// ---------- textos fixos por domínio (copy permitida pelo CLAUDE.md, ARMADILHA 5) ----------
const T = dominio === 'br'
  ? { site: 'linvuu.com.br', lingua: 'pt', aula: (n) => `Aula ${n}`, regra: 'A regra', ouca: 'Ouça e repita', cta1: 'Duas primeiras aulas grátis, sem cartão.', cta2: 'Áudio em cada frase. Cursos feitos por professores.', nomes: { ru: 'Russo', de: 'Alemão', fr: 'Francês', es: 'Espanhol', it: 'Italiano', en: 'Inglês', br: 'Português' } }
  : { site: 'linvuu.com', lingua: 'en', aula: (n) => `Lesson ${n}`, regra: 'The rule', ouca: 'Listen and repeat', cta1: 'The first two lessons are free. No card needed.', cta2: 'Audio for every sentence. Courses made by teachers.', nomes: { ru: 'Russian', de: 'German', fr: 'French', es: 'Spanish', it: 'Italian', en: 'English', br: 'Portuguese' } };

// ---------- conteúdo (mesma regra de arquivo do site e do carrossel: fonteDe em scripts/i18n-aulas.mjs) ----------
if (dominio === 'com' && idioma === 'en') falhar('o curso de inglês é para quem fala português (.com.br)');
const fonteDe = (id) => (id === 'br' ? 'en' : 'pt');
const nomeArq = T.lingua === fonteDe(idioma) ? `${idioma}.json` : `${idioma}.${T.lingua}.json`;
const arquivo = join(RAIZ, 'content', 'gramatica', nomeArq);
if (!existsSync(arquivo)) falhar(`não há gramática de "${idioma}" explicada ${T.lingua === 'pt' ? 'em português' : 'em inglês'} (${nomeArq})`);
const topico = JSON.parse(readFileSync(arquivo, 'utf8')).topicos.find((t) => t.id === topicoId);
if (!topico) falhar(`tópico "${topicoId}" não existe em ${nomeArq}`);
if (topico.explicacaoEm) falhar(`"${topicoId}" ainda não foi traduzido para ${T.lingua}`);

const frases = (texto, max) => {
  const limpo = String(texto ?? '').replace(/\b(?:PASSO|STEP)\s*\d+:\s*/g, '').replace(/\s+/g, ' ').trim();
  if (limpo.length <= max) return limpo;
  let out = '';
  for (const p of limpo.match(/[^.!?]+[.!?]+(\s|$)/g) ?? []) { if ((out + p).length > max) break; out += p; }
  return out.trim();
};
// mesmo hash do site (src/lib/audio.ts → hashTexto): FNV-1a 32 bits do texto NFC sem acento tônico (U+0301)
const hashTexto = (t) => { let h = 0x811c9dc5; for (const c of new TextEncoder().encode(t.normalize('NFC').replace(/\u0301/g, '').trim())) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const audioDe = (t) => { const f = join(RAIZ, 'public', 'audio', 'v2', idioma, `${hashTexto(t)}.mp3`); return existsSync(f) ? f : null; };
const duracao = (f) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', f]).toString().trim());

// Transliteração do cirílico (tabela fixa, BGN/PCGN simplificada). Só para ru.
const CIR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'ye', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
// Regra fixa de pronúncia aplicada antes: «г» das terminações -ого/-его soa «в» (него → nevo, сегодня → sevodnya).
const translit = (t) => idioma !== 'ru' ? null : t.normalize('NFC').replace(/\u0301/g, '').replace(/([оеОЕ])г([оО])(?=[^А-яЁё]|$)/g, '$1в$2').replace(/сегодня/gi, (m) => m.replace(/г/i, 'в')).replace(/[А-яЁё]/g, (c, i, s) => {
  const low = c.toLowerCase();
  // «е» depois de consoante soa «e» (нет → net); no começo da palavra ou depois de vogal, «ye»
  let r = low === 'е' && i > 0 && /[бвгджзйклмнпрстфхцчшщ]/i.test(s[i - 1]) ? 'e' : CIR[low] ?? c;
  return c === low ? r : r.charAt(0).toUpperCase() + r.slice(1);
});

// ---------- roteiro: cenas com tempo exato ----------
const traducao = (e) => e[T.lingua] ?? e.pt ?? e.en;
const exemplos = (topico.exemplos ?? []).filter((e) => e[idioma] && traducao(e)).map((e) => ({ alvo: e[idioma], traducao: traducao(e), audio: audioDe(e[idioma]) })).filter((e) => e.audio).slice(0, 4);
if (exemplos.length < 2) falhar(`"${topicoId}" tem ${exemplos.length} exemplo(s) com áudio nativo publicado; o vídeo exige 2 ou mais (sem áudio não há Short)`);
const regra = frases(topico.explicacao, 190);
const cenas = [];
let t = 0;
const cena = (tipo, dur, dados = {}) => { cenas.push({ tipo, inicio: +t.toFixed(2), dur: +dur.toFixed(2), ...dados }); t += dur; };
cena('gancho', 3.2);
cena('regra', Math.min(9, Math.max(6, regra.length / 22)));
exemplos.forEach((e, i) => { const d = duracao(e.audio); cena('exemplo', d * 2 + 2.2, { ...e, n: i + 1, durAudio: d }); });
cena('cta', 4.5);
const total = +t.toFixed(2);

// ---------- projeto HyperFrames (tudo dentro da pasta: o render recusa arquivo de fora) ----------
const pasta = join(saidaBase, `video-${dominio}-${idioma}-${topico.id}`);
const proj = join(pasta, 'projeto');
rmSync(proj, { recursive: true, force: true });
mkdirSync(join(proj, 'fontes'), { recursive: true }); mkdirSync(join(proj, 'audio'), { recursive: true });
const tokens = readFileSync(join(RAIZ, 'src', 'tokens.css'), 'utf8');
const cor = (n) => (tokens.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{3,8})`)) ?? falhar(`token --${n} ausente`))[1];
const C = { verde: cor('verde-floresta'), papel: cor('papel'), grafite: cor('grafite'), grafite65: cor('grafite-65'), ocre: cor('ocre'), ocreClaro: cor('ocre-claro'), verde100: cor('verde-100') };
const fontes = [['@fontsource/literata', 'literata', 'Literata', [400, 700]], ['@fontsource/source-sans-3', 'source-sans-3', 'Source Sans 3', [400, 600]]];
let faces = '';
for (const [pkg, arq, nome, pesos] of fontes) for (const sub of ['latin', 'latin-ext', 'cyrillic']) for (const p of pesos) {
  const f = `${arq}-${sub}-${p}-normal.woff2`;
  try { copyFileSync(require.resolve(`${pkg}/files/${f}`), join(proj, 'fontes', f)); faces += `@font-face{font-family:'${nome}';font-weight:${p};font-display:block;src:url(fontes/${f}) format('woff2');}\n`; } catch {}
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// animação: o relógio de cada animação começa quando a cena (clip) entra — atraso relativo à cena, não ao filme (medido em 18/11/2026:
// com atraso absoluto o texto das cenas 2+ nunca aparecia). `inicio` fica na assinatura só para ler o roteiro.
const anima = (_inicio, desl = 0, nome = 'entra', dur = 0.5) => `animation:${nome} ${dur}s cubic-bezier(.2,.7,.2,1) ${desl.toFixed(2)}s both`;

let corpo = '';
let audios = '';
for (const c of cenas) {
  const marca = `<div class="marca"><span>Linvuu</span><span>${esc(T.site)}</span></div>`;
  const base = `class="clip cena ${c.tipo === 'gancho' || c.tipo === 'cta' ? 'escura' : ''}" data-start="${c.inicio}" data-duration="${c.dur}" data-track-index="0"`;
  if (c.tipo === 'gancho') corpo += `<section ${base}><p class="apoio" style="${anima(c.inicio, 0.1)}">${esc(T.nomes[idioma])} · ${esc(T.aula(topico.aula))}</p><h1 class="gancho" style="${anima(c.inicio, 0.3)}">${esc(topico.titulo)}</h1>${marca}</section>\n`;
  if (c.tipo === 'regra') corpo += `<section ${base}><h2 style="${anima(c.inicio)}">${esc(T.regra)}</h2><p class="regra" style="${anima(c.inicio, 0.4)}">${esc(regra)}</p>${marca}</section>\n`;
  if (c.tipo === 'exemplo') {
    const tr = translit(c.alvo);
    corpo += `<section ${base}><p class="rotulo" style="${anima(c.inicio)}">${esc(T.ouca)} · ${c.n}/${exemplos.length}</p>
<p class="alvo" style="${anima(c.inicio, 0.15)}">${esc(c.alvo)}</p>${tr ? `<p class="translit" style="${anima(c.inicio, 0.35)}">${esc(tr)}</p>` : ''}
<p class="traducao" style="${anima(c.inicio, 0.6)}">${esc(c.traducao)}</p><div class="barra"><span style="animation:barra ${c.durAudio.toFixed(2)}s linear 0.30s both"></span></div><div class="barra"><span style="animation:barra ${c.durAudio.toFixed(2)}s linear ${(1.5 + c.durAudio).toFixed(2)}s both"></span></div>${marca}</section>\n`;
    const nome = `ex${c.n}.mp3`; copyFileSync(c.audio, join(proj, 'audio', nome));
    // o mesmo áudio duas vezes: ouvir, pausa para repetir, ouvir de novo
    audios += `<audio src="audio/${nome}" data-start="${(c.inicio + 0.3).toFixed(2)}" data-duration="${c.durAudio.toFixed(2)}" data-track-index="1"></audio>\n`;
    audios += `<audio src="audio/${nome}" data-start="${(c.inicio + 1.5 + c.durAudio).toFixed(2)}" data-duration="${c.durAudio.toFixed(2)}" data-track-index="2"></audio>\n`;
  }
  if (c.tipo === 'cta') corpo += `<section ${base}><h1 class="cta" style="${anima(c.inicio, 0.1)}">${esc(T.cta1)}</h1><p class="apoio2" style="${anima(c.inicio, 0.4)}">${esc(T.cta2)}</p><p class="url" style="${anima(c.inicio, 0.7)}">${esc(T.site)}/gramatica/${esc(idioma)}</p>${marca}</section>\n`;
}

const html = `<!doctype html>
<html lang="${T.lingua === 'pt' ? 'pt-BR' : 'en'}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${L}, height=${A}" />
<!-- Gerado por scripts/midia/gerar-video.mjs a partir de ${nomeArq} → ${topico.id}. Não editar à mão. -->
<style>
${faces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${L}px;height:${A}px;overflow:hidden;background:${C.papel}}
#root{position:relative;width:${L}px;height:${A}px;font-family:'Source Sans 3',sans-serif;color:${C.grafite}}
.clip{position:absolute;inset:0}
.cena{display:flex;flex-direction:column;justify-content:center;padding:160px 96px 260px;background:${C.papel}}
.cena.escura{background:${C.verde};color:${C.papel}}
.apoio{font-size:40px;color:${C.ocreClaro};margin-bottom:36px}
.gancho{font-family:'Literata',serif;font-weight:700;font-size:112px;line-height:1.08}
h2{font-family:'Literata',serif;font-weight:700;font-size:72px;color:${C.verde};margin-bottom:48px}
.regra{font-size:52px;line-height:1.42}
.rotulo{font-size:36px;font-weight:600;color:${C.grafite65};margin-bottom:56px}
.alvo{font-family:'Literata',serif;font-weight:700;font-size:96px;line-height:1.15;color:${C.verde}}
.translit{font-size:44px;color:${C.grafite65};margin-top:24px;letter-spacing:.01em}
.traducao{font-size:52px;line-height:1.3;margin-top:48px;padding-left:28px;border-left:8px solid ${C.ocre}}
.barra{height:8px;background:${C.verde100};border-radius:4px;margin-top:48px;overflow:hidden}
.barra+.barra{margin-top:16px}
.barra span{display:block;height:100%;background:${C.verde};transform-origin:left}
.cta{font-family:'Literata',serif;font-weight:700;font-size:96px;line-height:1.1;margin-bottom:44px}
.apoio2{font-size:46px;line-height:1.35;color:${C.verde100};margin-bottom:64px}
.url{align-self:flex-start;background:${C.papel};color:${C.verde};font-weight:600;font-size:48px;padding:26px 40px;border-radius:12px}
.marca{position:absolute;left:96px;right:96px;bottom:120px;display:flex;justify-content:space-between;font-size:36px;font-weight:600;color:${C.grafite65};border-top:3px solid ${C.verde100};padding-top:28px}\n.escura .marca{color:${C.verde100};border-top-color:${C.verde100}}
@keyframes entra{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes barra{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){*{animation-duration:0s!important}}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${total}" data-width="${L}" data-height="${A}">
${corpo}${audios}</div>
</body>
</html>
`;
writeFileSync(join(proj, 'index.html'), html);
writeFileSync(join(pasta, 'roteiro.json'), JSON.stringify({ fonte: `content/gramatica/${nomeArq}`, topico: topico.id, dominio: T.site, duracao: total, cenas: cenas.map(({ audio, ...c }) => ({ ...c, ...(audio ? { audio: audio.slice(RAIZ.length + 1) } : {}) })) }, null, 2));
console.log(`roteiro: ${cenas.length} cenas, ${total}s, ${exemplos.length} exemplos com áudio nativo → ${proj.slice(RAIZ.length + 1)}`);
if (args.includes('--so-projeto')) process.exit(0);

// ---------- render ----------
const navegador = process.env.HYPERFRAMES_BROWSER_PATH;
const saida = join(pasta, 'video.mp4');
const r = spawnSync(join(RAIZ, 'node_modules', '.bin', 'hyperframes'), ['render', proj, '-o', saida, '--fps', '30', '--quality', 'delivery', '--refuse-outside-files', '--quiet'],
  { stdio: 'inherit', env: { ...process.env, HYPERFRAMES_TELEMETRY: '0', ...(navegador ? { PUPPETEER_EXECUTABLE_PATH: navegador } : {}) } });
if (r.status !== 0 || !existsSync(saida)) falhar(`o render do HyperFrames falhou (código ${r.status})`);
const sonda = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,width,height:format=duration', '-of', 'json', saida]).toString());
const v = sonda.streams.find((s) => s.codec_type === 'video'), a = sonda.streams.find((s) => s.codec_type === 'audio');
if (!v || v.width !== L || v.height !== A) falhar(`vídeo fora do formato: ${v?.width}×${v?.height}`);
if (!a) falhar('vídeo saiu sem trilha de áudio');
console.log(`vídeo: ${saida.slice(RAIZ.length + 1)} · ${v.width}×${v.height} · ${Number(sonda.format.duration).toFixed(1)}s · com áudio`);
