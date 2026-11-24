// Teste de ponta a ponta de GET/PUT /api/progresso/revisao contra os emuladores do Firestore e do Auth (contas fictícias, sem dado real).
// Rodar: npm run testar:revisao:rota
process.env.VITE_FIREBASE_PROJECT_ID = 'demo-linvuu-revisao';
process.env.FIRESTORE_EMULATOR_HOST ??= '127.0.0.1:8089';
process.env.FIREBASE_AUTH_EMULATOR_HOST ??= '127.0.0.1:9099';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({ projectId: 'demo-linvuu-revisao' }); // firebaseAdmin() reaproveita este app
const { registrarRevisao, LIMITE_LEITURA } = await import('../server/revisao');
const { registrarProgresso } = await import('../server/progresso');
const { registrarSeguranca, registrarErros, fecharApi } = await import('../server/seguranca');
const { registrarAvaliacao } = await import('../src/lib/revisao/espacadoModelo');
const { LIMITE_CORPO_REVISAO, LIMITE_LOTE, idBloco } = await import('../src/lib/revisao/registroBloco');
type Registro = import('../src/lib/revisao/registroBloco').RegistroBloco;

const T0 = Date.now();
const DIA = 86_400_000;
const iso = (t: number) => new Date(t).toISOString();
const SIG = `ex2:${'b'.repeat(32)}:5`;
const bloco = (aula: number, b: number, praticaEm: number, quando: number, nota: 'again' | 'hard' | 'good' | 'easy' = 'good', idioma = 'ru'): Registro => {
  const revisao = { tipo: 'revisao-erros' as const, versao: 1 as const, assinatura: SIG, origem: [0, 1, 2], fila: [0], indice: 0, rodada: 2, respostas: { 0: true, 1: true, 2: true }, escolha: null, ordem: [], texto: '', resultado: null, fim: true, em: iso(praticaEm + 1000) };
  return { idioma, aula, sessao: 1, bloco: b, pratica: { acertos: 2, total: 5, em: iso(praticaEm), versao: 2, assinatura: SIG }, revisao, espacado: registrarAvaliacao(null, revisao.em, nota, quando) };
};

// Contas fictícias no emulador do Auth (senha aleatória a cada execução: nada fixo no código)
async function conta(email: string) {
  const r = await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: randomBytes(12).toString('hex'), returnSecureToken: true }) });
  const j = (await r.json()) as { idToken: string; localId: string };
  assert.ok(j.idToken && j.localId, 'conta fictícia criada no emulador');
  return { token: j.idToken, uid: j.localId };
}
const ana = await conta('ana@exemplo.invalid');
const bruno = await conta('bruno@exemplo.invalid');

// O arranjo de produção: parser grande só na rota de revisão, antes do parser global de 10 kB (server/app.ts).
const fonte = readFileSync(new URL('../server/app.ts', import.meta.url), 'utf8');
const iRev = fonte.indexOf("app.use('/api/progresso/revisao', express.json({ limit: LIMITE_CORPO_REVISAO }))"), iGlobal = fonte.indexOf("app.use(express.json({ limit: '10kb' }))");
assert.ok(iRev > 0 && iGlobal > 0 && iRev < iGlobal, 'server/app.ts: o parser da revisão vem antes do global de 10 kB');
assert.ok(fonte.includes('registrarRevisao(app)'), 'server/app.ts registra a rota');

async function subir(comLimite: boolean) {
  const a = express();
  if (comLimite) registrarSeguranca(a, false);
  a.use('/api/progresso/revisao', express.json({ limit: LIMITE_CORPO_REVISAO }));
  a.use(express.json({ limit: '10kb' }));
  registrarProgresso(a);
  registrarRevisao(a);
  fecharApi(a); registrarErros(a);
  const s = a.listen(0, '127.0.0.1'); await once(s, 'listening');
  const url = `http://127.0.0.1:${(s.address() as { port: number }).port}`;
  const h = (t?: string) => ({ 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) });
  return {
    s, url,
    get: (idioma: string, t?: string) => fetch(`${url}/api/progresso/revisao?idioma=${idioma}`, { headers: h(t) }),
    put: (corpo: unknown, t?: string, bruto = false) => fetch(`${url}/api/progresso/revisao`, { method: 'PUT', headers: h(t), body: bruto ? String(corpo) : JSON.stringify(corpo) }),
    postProgresso: (corpo: unknown, t?: string) => fetch(`${url}/api/progresso`, { method: 'POST', headers: h(t), body: JSON.stringify(corpo) }),
  };
}
const api = await subir(false);
const db = getFirestore();
const col = (uid: string) => db.collection('users').doc(uid).collection('revisao');
const lerDocs = async (uid: string) => (await col(uid).get()).docs;

// 1. sem login: 401 e nada gravado
assert.equal((await api.get('ru')).status, 401, 'GET sem token');
assert.equal((await api.put({ registros: [bloco(1, 1, T0 - 5 * DIA, T0 - DIA)] })).status, 401, 'PUT sem token');
assert.equal((await api.get('ru', 'token-falso')).status, 401, 'token inválido');
assert.equal((await lerDocs(ana.uid)).length, 0, 'sem login não grava');

// 2. leitura: idioma inválido
for (const i of ['', 'RU', 'russo', 'r', '1a']) assert.equal((await api.get(i, ana.token)).status, 400, `idioma "${i}"`);
assert.equal((await fetch(`${api.url}/api/progresso/revisao`, { headers: { Authorization: `Bearer ${ana.token}` } })).status, 400, 'sem idioma');
assert.deepEqual(await (await api.get('ru', ana.token)).json(), { registros: [], truncado: false }, 'conta nova: vazio');

// 3. gravação válida; o contrato das lições concluídas fica intocado
await db.collection('users').doc(ana.uid).set({ nome: 'Ana Teste', licoesCompletas: ['ru:1', 'ru:2'] });
const a1 = bloco(1, 1, T0 - 5 * DIA, T0 - 2 * DIA), a2 = bloco(1, 2, T0 - 5 * DIA, T0 - DIA, 'easy'), a3 = bloco(2, 1, T0 - 3 * DIA, T0 - DIA);
const r1 = await api.put({ registros: [a1, a2, a3] }, ana.token);
assert.equal(r1.status, 200);
assert.deepEqual((await r1.json()).registros, [a1, a2, a3], 'resposta devolve o vencedor de cada bloco, na ordem');
assert.equal(r1.headers.get('cache-control'), 'private, no-store');
const docs = await lerDocs(ana.uid);
assert.deepEqual(docs.map((d) => d.id).sort(), [idBloco(a1), idBloco(a2), idBloco(a3)].sort(), 'um documento por bloco, com id estável');
const d1 = docs.find((d) => d.id === idBloco(a1))!.data();
assert.equal(typeof d1.marca, 'number'); assert.ok(d1.atualizadoEm?.toDate() instanceof Date, 'marca e atualizadoEm do servidor');
assert.equal(d1.idioma, 'ru'); assert.deepEqual(d1.espacado.fsrs, a1.espacado!.fsrs, 'FSRS gravado inteiro, sem perda');
assert.deepEqual((await db.collection('users').doc(ana.uid).get()).data(), { nome: 'Ana Teste', licoesCompletas: ['ru:1', 'ru:2'] }, 'users/{uid} e licoesCompletas não foram tocados');

// 4. leitura devolve só o idioma pedido
await api.put({ registros: [bloco(1, 1, T0 - 5 * DIA, T0 - DIA, 'good', 'fr')] }, ana.token);
const ru = (await (await api.get('ru', ana.token)).json()) as { registros: Registro[]; truncado: boolean };
assert.deepEqual(ru.registros.map(idBloco).sort(), [idBloco(a1), idBloco(a2), idBloco(a3)].sort()); assert.equal(ru.truncado, false);
assert.deepEqual(ru.registros.find((r) => idBloco(r) === idBloco(a1)), a1, 'ida e volta idêntica');
assert.equal(((await (await api.get('fr', ana.token)).json()) as { registros: Registro[] }).registros.length, 1, 'francês separado do russo');

// 5. conflito: o cache velho nunca sobrescreve o novo
const velho = bloco(1, 1, T0 - 5 * DIA, T0 - 4 * DIA, 'again');
const rv = await api.put({ registros: [velho] }, ana.token);
assert.equal(rv.status, 200); assert.deepEqual((await rv.json()).registros, [a1], 'PUT de registro mais velho devolve o vencedor (o já guardado)');
assert.deepEqual((await col(ana.uid).doc(idBloco(a1)).get()).data()!.espacado.fsrs, a1.espacado!.fsrs, 'o documento não mudou');
const novo = bloco(1, 1, T0 - 5 * DIA, T0 - 1000, 'easy');
const rn = await api.put({ registros: [novo, a2] }, ana.token);
assert.deepEqual((await rn.json()).registros, [novo, a2], 'mais novo vence; o idêntico segue igual');
assert.deepEqual((await col(ana.uid).doc(idBloco(a1)).get()).data()!.espacado.fsrs, novo.espacado!.fsrs, 'o documento passou para o mais novo');
const mistura = await (await api.put({ registros: [velho, bloco(9, 9, T0 - DIA, T0 - 1000)] }, ana.token)).json();
assert.deepEqual(mistura.registros[0], novo, 'no mesmo lote: o velho perde e o bloco inédito entra'); assert.equal(mistura.registros.length, 2);

// 6. concorrência: duas gravações simultâneas do mesmo bloco, o resultado final é sempre o mais novo
const c0 = bloco(5, 1, T0 - 9 * DIA, T0 - 8 * DIA), c1 = bloco(5, 1, T0 - 9 * DIA, T0 - 5 * DIA, 'hard'), c2 = bloco(5, 1, T0 - 9 * DIA, T0 - 2 * DIA, 'easy');
await Promise.all([c0, c1, c2, c0, c1].map((c) => api.put({ registros: [c] }, ana.token)));
assert.deepEqual((await col(ana.uid).doc(idBloco(c2)).get()).data()!.espacado.fsrs, c2.espacado!.fsrs, 'em corrida, vence o mais novo');

// 7. isolamento entre contas
assert.deepEqual(await (await api.get('ru', bruno.token)).json(), { registros: [], truncado: false }, 'Bruno não vê o que é da Ana');
const b1 = bloco(1, 1, T0 - 7 * DIA, T0 - 6 * DIA);
assert.equal((await api.put({ registros: [b1] }, bruno.token)).status, 200);
assert.deepEqual((await col(bruno.uid).doc(idBloco(b1)).get()).data()!.espacado.fsrs, b1.espacado!.fsrs, 'Bruno grava na própria pasta, mesmo id de bloco');
assert.deepEqual((await col(ana.uid).doc(idBloco(novo)).get()).data()!.espacado.fsrs, novo.espacado!.fsrs, 'o bloco de mesmo id da Ana não mudou');

// 8. pedidos inválidos: 400 e nada gravado
const antes = (await lerDocs(ana.uid)).length;
const gordo = (n: number) => Array.from({ length: n }, (_, i) => bloco(100 + i, 1, T0 - 4 * DIA, T0 - DIA));
const invalidos: Array<[string, unknown]> = [
  [`${LIMITE_LOTE + 1} registros`, { registros: gordo(LIMITE_LOTE + 1) }],
  ['lote vazio', { registros: [] }], ['registros não é lista', { registros: 'x' }], ['sem registros', {}], ['corpo array', [a1]],
  ['chave extra no corpo', { registros: [a1], admin: true }],
  ['registro com chave extra', { registros: [{ ...a1, plano: 'premium' }] }],
  ['idioma inválido', { registros: [{ ...a1, idioma: 'RU' }] }], ['aula zero', { registros: [{ ...a1, aula: 0 }] }],
  ['bloco perfeito', { registros: [{ ...a1, pratica: { ...a1.pratica, acertos: 5 } }] }],
  ['fsrs corrompido', { registros: [{ ...a1, espacado: { ...a1.espacado, fsrs: { ...a1.espacado!.fsrs, stability: -1 } } }] }],
  ['bloco repetido no lote', { registros: [a1, a1] }],
  ['marca no futuro', { registros: [bloco(300, 1, T0, T0 + 3 * DIA)] }],
];
for (const [nome, corpo] of invalidos) assert.equal((await api.put(corpo, ana.token)).status, 400, nome);
assert.equal((await api.put('{json quebrado', ana.token, true)).status, 400, 'JSON inválido');
assert.equal((await lerDocs(ana.uid)).length, antes, 'inválidos não gravam nada, nem parcialmente');

// 9. tamanho do corpo: a rota aceita o lote cheio; o resto da API continua em 10 kB
const cheio = (n: number) => Array.from({ length: n }, (_, i) => ({ ...bloco(400 + i, 1, T0 - 4 * DIA, T0 - DIA), revisao: { ...bloco(400 + i, 1, T0 - 4 * DIA, T0 - DIA).revisao!, texto: 'я'.repeat(8000), escolha: 'x'.repeat(2000) } }));
const grande = cheio(LIMITE_LOTE);
const tamanho = Buffer.byteLength(JSON.stringify({ registros: grande }));
assert.ok(tamanho > 10_240 * 10, `lote de teste bem acima de 10 kB (${tamanho} bytes)`);
assert.equal((await api.put({ registros: grande }, ana.token)).status, 200, 'lote cheio (50 blocos com texto longo, cirílico) é aceito');
assert.equal((await api.get('ru', ana.token).then((r) => r.json()) as { registros: Registro[] }).registros.filter((r) => r.aula >= 400).length, LIMITE_LOTE, 'e volta inteiro');
const enorme = Buffer.byteLength(JSON.stringify({ registros: grande, lixo: 'z'.repeat(300_000) }));
assert.ok(enorme > 1_228_800, 'corpo de teste passa do limite de 1200 kB');
assert.equal((await api.put({ registros: grande, lixo: 'z'.repeat(300_000) }, ana.token)).status, 413, 'corpo acima do limite da rota: 413');
assert.equal((await api.postProgresso({ idioma: 'ru', dia: 1, feito: true, folga: 'x'.repeat(11_000) }, ana.token)).status, 413, '/api/progresso segue com o limite de 10 kB');
assert.equal((await api.postProgresso({ idioma: 'ru', dia: 1, feito: true }, ana.token)).status, 200, '/api/progresso segue funcionando como antes');

// 10. documento estranho no banco não é devolvido e é sobrescrito pela próxima gravação válida
await col(bruno.uid).doc('ru_7_S1_B1').set({ idioma: 'ru', lixo: true });
await col(bruno.uid).doc('ru_7_S1_B2').set({ ...bloco(7, 2, T0 - 4 * DIA, T0 - DIA), marca: 1, extra: 'x'.repeat(100) });
const lidos = ((await (await api.get('ru', bruno.token)).json()) as { registros: Registro[] }).registros;
assert.ok(!lidos.some((r) => r.aula === 7 && r.bloco === 1), 'documento inválido não é devolvido');
assert.ok(lidos.some((r) => r.aula === 7 && r.bloco === 2) && !('extra' in lidos.find((r) => r.aula === 7 && r.bloco === 2)!), 'campos desconhecidos do banco são descartados na leitura');
const reparo = bloco(7, 1, T0 - 4 * DIA, T0 - 1000);
assert.deepEqual((await (await api.put({ registros: [reparo] }, bruno.token)).json()).registros, [reparo], 'registro válido repara o documento estranho');

// 11. teto de leitura por idioma
{
  let escritos = 0;
  while (escritos < LIMITE_LEITURA + 5) {
    const b = db.batch();
    for (let k = 0; k < 400 && escritos < LIMITE_LEITURA + 5; k++, escritos++) b.set(col('muitos-uid').doc(`ru_${escritos + 1}_S1_B1`), { ...bloco(1 + (escritos % 999), 1 + Math.floor(escritos / 999), T0 - 4 * DIA, T0 - DIA), marca: T0 });
    await b.commit();
  }
}
const { lerRegistros } = await import('../server/revisao');
const teto = await lerRegistros(db, 'muitos-uid', 'ru');
assert.equal(teto.registros.length, LIMITE_LEITURA); assert.equal(teto.truncado, true, 'passou do teto: avisa que truncou');

// 12. limite de requisições (o de produção, em seguranca.ts): 60 por minuto na rota de revisão
const limitado = await subir(true);
let ultimo = 0; let primeiro429 = 0;
for (let i = 1; i <= 62; i++) { ultimo = (await limitado.get('ru')).status; if (ultimo === 429 && !primeiro429) primeiro429 = i; }
assert.equal(primeiro429, 61, 'a requisição 61 no mesmo minuto leva 429'); assert.equal(ultimo, 429);

limitado.s.close(); api.s.close();
console.log('revisão (rota): autenticação, validação, gravação por bloco em subcoleção, conflito (velho não sobrescreve novo, corrida), isolamento entre contas, limite de corpo só na rota, teto de leitura e limite por minuto aprovados.');
process.exit(0);
