// Gera os MP3 de um idioma com o ElevenLabs (modelo eleven_v4) na pasta VERSIONADA v2:
//   público  → public/audio/v2/<idioma>/<hash>.mp3  (+ index.json, manifest.json)
//   privado  → server/audio-privado-v2/<idioma>/<hash>.mp3  (+ manifest.json)  (sessões pagas; saem por /api/audio)
// O nome do arquivo continua sendo o hash do texto (igual a src/lib/audio.ts). O caminho v2 existe para o cache
// (navegador, Cloudflare, APK) nunca servir a voz antiga. O áudio do Edge em public/audio/<idioma>/ não é tocado.
//
//   ELEVENLABS_API_KEY=... node scripts/gerar-audios-eleven.mjs --idioma=ru --teto=41500
//   ... --simular                 só conta arquivos e créditos
//   ... --so=publico|privado      limita a um dos lados (padrão: público primeiro, depois privado)
//   ... --ordem=uso               privados do mais usado para o menos usado (padrão: ordem da lista)
//   ... --ordem=aula              privados da aula mais cedo para a mais tarde (o curso é ouvido do começo para o fim)
//   ... --ate-aula=N              privados só até a aula N (usa "aula N" de primeiro_uso; sem número de aula = fica de fora)
//   ... --limite=N                no máximo N arquivos novos nesta execução
//   ... --teto=N                  para sozinho ao chegar em N créditos gastos NESTA execução (conta pelo cabeçalho real da API)
//
// Nunca sobrescreve. Retomável: o que já existe em v2 é pulado. Falha de API não é repetida (só 429 e erro 5xx, uma vez).
import fs from 'node:fs';
import path from 'node:path';
import { mesclarNoManifesto } from './audio-manifesto.mjs';

const raiz = path.resolve(import.meta.dirname, '..');
const args = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => { const [k, v = 'true'] = a.slice(2).split('='); return [k, v]; }));
const idioma = args.idioma;
const simular = args.simular === 'true';
const teto = Number(args.teto ?? 0);
const limite = Number(args.limite ?? 0);
const lado = args.so ?? 'tudo';
const ordem = args.ordem ?? 'lista';
const ateAula = Number(args['ate-aula'] ?? 0);
const MODELO = 'eleven_v4';
const SAIDA = 'mp3_44100_64'; // 64 kbps => ~8000 bytes por segundo de fala
const CONCORRENCIA = Number(args.conc ?? 4);
const CHAVE = process.env.ELEVENLABS_API_KEY;

// Vozes escolhidas (biblioteca ElevenLabs). Troque com ELEVEN_VOZ_<IDIOMA>_M / _F se precisar.
const VOZES = {
  ru: { lang: 'ru', m: 'VwRq6NLQB8AqRusa9F9t' /* Arcadees */, f: 'xcVbjGhhLIoKi3va6mAe' /* Viktoriya Voloshina */ },
  br: { lang: 'pt', m: 'uuRRBfx9C2chYfSRNn6t' /* Vander Maria */, f: 'BQzELs93jJsUOf5rCb9p' /* Vanessa */ },
  pt: { lang: 'pt', m: 'uuRRBfx9C2chYfSRNn6t', f: 'BQzELs93jJsUOf5rCb9p' },
  // Vozes padrão (sem sotaque regional), de aprendizado/narração clara. Escolhidas pelo catálogo (prévias grátis), sem teste pago.
  en: { lang: 'en', m: 'Gfpl8Yo74Is0W6cPUWWT' /* Max, eLearning */, f: 'hpp4J3VqNfWAUOO0d1Us' /* Bella, educational */ },
  de: { lang: 'de', m: 'r8MyP4qUsq5WFFSkPdfV' /* Johannes, Hochdeutsch neutro */, f: 'rKiu7lQ4c5P3az3745s3' /* Carla Blum, e-learning */ },
  fr: { lang: 'fr', m: 'AfbuxQ9DVtS4azaxN1W7' /* Léo, parisiense */, f: '6vTyAgAT8PncODBcLjRf' /* Claire Estelle, e-learning */ },
};
const cfg = VOZES[idioma];
if (!cfg) { console.error(`idioma sem voz ElevenLabs configurada: ${idioma} (ru, br, pt, en, de, fr)`); process.exit(1); }
const voz = (g) => process.env[`ELEVEN_VOZ_${idioma.toUpperCase()}_${g.toUpperCase()}`] ?? cfg[g];
if (!simular && !CHAVE) { console.error('defina ELEVENLABS_API_KEY'); process.exit(1); }

/** Texto lido pela voz: sem acento tônico (U+0301), sem travessão. Mesma regra do Edge, menos a limpeza de XML (não há XML aqui). */
export const limpar = (t) => t.normalize('NFC').replace(/́/g, '').replace(/[—–]/g, ', ').replace(/…/g, '...').replace(/\s+/g, ' ').trim();
const hashTexto = (t) => { let h = 0x811c9dc5; for (const c of Buffer.from(t.normalize('NFC').replace(/́/g, '').trim(), 'utf8')) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };

export function lerCsv(texto) {
  const linhas = []; let campo = ''; let linha = []; let aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (aspas) { if (c === '"') { if (texto[i + 1] === '"') { campo += '"'; i++; } else aspas = false; } else campo += c; }
    else if (c === '"') aspas = true;
    else if (c === ',') { linha.push(campo); campo = ''; }
    else if (c === '\n') { linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
    else if (c !== '\r') campo += c;
  }
  if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
  const [cab, ...resto] = linhas;
  return resto.filter((r) => r.length >= cab.length).map((r) => Object.fromEntries(cab.map((k, i) => [k, r[i]])));
}

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const dirPub = path.join(raiz, 'public', 'audio', 'v2', idioma);
const dirPriv = path.join(raiz, 'server', 'audio-privado-v2', idioma);
const lerJson = (f, padrao) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return padrao; } };

function carregarLista() {
  const base = path.join(raiz, 'content', 'audio');
  const arqs = [[`${idioma}-gravar.csv`, false], [`${idioma}-livro-gravar.csv`, false], [`${idioma}-narracao-gravar.csv`, true]];
  const vistos = new Map();
  for (const [nome, narr] of arqs) {
    const f = path.join(base, nome); if (!fs.existsSync(f)) continue;
    for (const l of lerCsv(fs.readFileSync(f, 'utf8'))) {
      if (!/^[0-9a-f]{8}\.mp3$/.test(l.arquivo)) continue;
      const ant = vistos.get(l.arquivo);
      const uso = Number(l.vezes_usado || 1);
      if (ant) { ant.uso = Math.max(ant.uso, uso); ant.narr ||= narr; continue; }
      const aula = Number((String(l.primeiro_uso ?? '').match(/aula (\d+)/) ?? [])[1] ?? NaN);
      vistos.set(l.arquivo, { arquivo: l.arquivo, texto: l.texto, voz: l.voz === 'f' ? 'f' : 'm', uso, narr, aula });
    }
  }
  // Público = já era público no áudio atual (public/audio/<idioma>/index.json) ou é narração. O resto é de sessão paga.
  const antigo = new Set(lerJson(path.join(raiz, 'public', 'audio', idioma, 'index.json'), []));
  const lista = [...vistos.values()].map((l) => ({ ...l, publico: l.narr || idioma === 'pt' || antigo.has(l.arquivo.replace('.mp3', '')), fala: limpar(l.texto) }));
  const ruins = lista.filter((l) => hashTexto(l.texto) !== l.arquivo.replace('.mp3', '') && !l.narr);
  if (ruins.length) console.warn(`aviso: ${ruins.length} arquivos cujo nome não bate com o hash do texto (usando o nome do CSV)`);
  return lista.filter((l) => l.fala.length > 0);
}

async function sintetizar(l, estado) {
  const corpo = { text: l.fala, model_id: MODELO, seed: parseInt(l.arquivo.slice(0, 8), 16) % 4294967295 };
  if (!estado.semIdioma) corpo.language_code = cfg.lang;
  for (let t = 1; t <= 3; t++) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voz(l.voz)}?output_format=${SAIDA}`, { method: 'POST', headers: { 'xi-api-key': CHAVE, 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    if (r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      const cobrado = Number(r.headers.get('character-cost') ?? NaN); // créditos realmente cobrados nesta chamada
      return { buf, cobrado: Number.isFinite(cobrado) ? cobrado : l.fala.length, medido: Number.isFinite(cobrado) };
    }
    const txt = (await r.text()).slice(0, 300);
    if (r.status === 400 && /language/i.test(txt) && !estado.semIdioma) { // o modelo recusou language_code: tira e segue (400 não é cobrado)
      estado.semIdioma = true; delete corpo.language_code; console.log('aviso: language_code recusado pelo modelo; seguindo sem ele'); continue;
    }
    if (r.status === 429 && t < 3) { await dormir(2000 * t); continue; }
    if (r.status >= 500 && t < 2) { await dormir(3000); continue; }
    const e = new Error(`HTTP ${r.status}: ${txt}`); e.status = r.status; throw e;
  }
}

async function main() {
  let lista = carregarLista();
  // Existe em v2 em qualquer um dos lados: o índice público antigo (Edge) foi podado, então a classificação público/privado não é confiável para decidir se falta gerar.
  const existe = (l) => fs.existsSync(path.join(dirPub, l.arquivo)) || fs.existsSync(path.join(dirPriv, l.arquivo));
  let pend = lista.filter((l) => !existe(l));
  if (lado === 'publico') pend = pend.filter((l) => l.publico);
  if (lado === 'privado') pend = pend.filter((l) => !l.publico);
  if (ateAula > 0) pend = pend.filter((l) => l.publico || (Number.isFinite(l.aula) && l.aula <= ateAula));
  // públicos primeiro (é o que o visitante ouve); privados por uso quando pedido
  const pu = (x) => (ordem === 'uso' ? -x.uso : ordem === 'aula' ? (Number.isFinite(x.aula) ? x.aula : 9999) : 0);
  pend.sort((a, b) => (b.publico - a.publico) || (pu(a) - pu(b)));
  if (limite > 0) pend = pend.slice(0, limite);
  const chars = (xs) => xs.reduce((s, l) => s + l.fala.length, 0);
  console.log(`${idioma}: ${lista.length} frases; ${lista.length - pend.length} fora desta execução (já existem em v2 ou fora do filtro); ${pend.length} a gerar = ${chars(pend)} caracteres (${pend.filter((l) => l.publico).length} públicos, ${pend.filter((l) => !l.publico).length} privados); modelo ${MODELO}; voz m=${voz('m')} f=${voz('f')}`);
  if (simular) return;
  for (const d of [dirPub, dirPriv]) fs.mkdirSync(d, { recursive: true });

  const manPub = lerJson(path.join(dirPub, 'manifest.json'), { modelo: MODELO, versao: 2, vozes: {}, arquivos: {} });
  const manPriv = lerJson(path.join(dirPriv, 'manifest.json'), { modelo: MODELO, versao: 2, vozes: {}, arquivos: {} });
  manPub.vozes = manPriv.vozes = { m: voz('m'), f: voz('f') };
  const novosPagos = new Set(); // hashes dos MP3 pagos gerados nesta execução → manifesto content/audio-privado-manifesto.json
  const salvar = () => {
    if (novosPagos.size) { mesclarNoManifesto(idioma, [...novosPagos]); novosPagos.clear(); }
    fs.writeFileSync(path.join(dirPub, 'manifest.json'), JSON.stringify(manPub, null, 1) + '\n');
    fs.writeFileSync(path.join(dirPriv, 'manifest.json'), JSON.stringify(manPriv, null, 1) + '\n');
    const pub = fs.readdirSync(dirPub).filter((f) => f.endsWith('.mp3')).map((f) => f.replace('.mp3', '')).sort();
    fs.writeFileSync(path.join(dirPub, 'index.json'), JSON.stringify(pub) + '\n');
  };

  const estado = { semIdioma: false };
  let gasto = 0; let emVoo = 0; let ok = 0; const falhas = []; const suspeitos = []; let fila = 0; let parar = false; let semCabecalho = 0; let somaChars = 0;
  const trabalhador = async () => {
    while (!parar) {
      const l = pend[fila++]; if (!l) return;
      if (teto > 0 && gasto + emVoo + l.fala.length * 0.5 > teto) { parar = true; console.log(`teto de ${teto} créditos atingido (gasto ${gasto}); parando`); return; }
      emVoo += l.fala.length; // reserva conservadora (1 crédito/caractere) enquanto a chamada está em andamento
      try {
        const { buf, cobrado, medido } = await sintetizar(l, estado);
        emVoo -= l.fala.length; gasto += cobrado; if (!medido) semCabecalho++;
        somaChars += l.fala.length;
        const alvo = path.join(l.publico ? dirPub : dirPriv, l.arquivo);
        const seg = buf.length / 8000; const esperado = l.fala.length * 0.08;
        const sus = buf.length < 1500 || seg > esperado * 3 + 3 || seg < Math.min(0.25, esperado * 0.3);
        fs.writeFileSync(alvo, buf);
        if (!l.publico) novosPagos.add(l.arquivo.replace('.mp3', ''));
        (l.publico ? manPub : manPriv).arquivos[l.arquivo.replace('.mp3', '')] = { voz: l.voz, chars: l.fala.length, creditos: cobrado, bytes: buf.length, seg: Number(seg.toFixed(2)) };
        ok++;
        if (sus) { suspeitos.push(`${l.arquivo} [${l.voz}] ${seg.toFixed(1)}s/${l.fala.length}c ${l.fala.slice(0, 40)}`); }
        if (ok % 25 === 0) { salvar(); console.log(`… ${ok} gerados | créditos nesta execução: ${gasto} | suspeitos: ${suspeitos.length}`); }
        if (ok >= 20 && gasto / somaChars > 1.06) { parar = true; console.error(`ALERTA: custo real ${(gasto / somaChars).toFixed(2)} créditos/caractere (>1,06). Parando para reavaliar.`); } // esperado ~0,5 pela API
        if (ok >= 40 && suspeitos.length / ok > 0.15) { parar = true; console.error(`ALERTA: ${suspeitos.length}/${ok} arquivos suspeitos (>15%). Parando para reavaliar.`); }
      } catch (e) {
        emVoo -= l.fala.length; // chamada falhou: não conta
        falhas.push(`${l.arquivo} (${l.fala.slice(0, 40)}): ${e.message}`);
        console.error(`FALHA ${l.arquivo}: ${e.message}`);
        if (e.status === 401 || e.status === 402 || e.status === 403 || falhas.length >= 8) { parar = true; console.error('parando (credencial, plano/saldo ou 8 falhas)'); }
      }
    }
  };
  await Promise.all(Array.from({ length: CONCORRENCIA }, trabalhador));
  salvar();
  console.log(`\nfim: ${ok} gerados | créditos gastos nesta execução: ${gasto} (${somaChars ? (gasto / somaChars).toFixed(3) : '-'}/caractere) | falhas: ${falhas.length} | suspeitos: ${suspeitos.length}${semCabecalho ? ` | sem cabeçalho de custo: ${semCabecalho}` : ''}`);
  if (suspeitos.length) console.log('suspeitos (revisar de ouvido):\n' + suspeitos.slice(0, 40).join('\n'));
  if (falhas.length) { console.error('falhas:\n' + falhas.slice(0, 20).join('\n')); process.exitCode = 1; }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
