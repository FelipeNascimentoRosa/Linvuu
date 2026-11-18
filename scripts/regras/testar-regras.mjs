// Testa firestore.rules no emulador do Firestore com identidades FICTÍCIAS (nenhum dado real de aluno).
// Rodar: npm run testar:regras   (sobe o emulador sozinho; precisa de Java e baixa o emulador na primeira vez)
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, getDocs, query, serverTimestamp, deleteField, increment, arrayUnion } from 'firebase/firestore';

const [host, porta] = (process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8089').split(':');
const env = await initializeTestEnvironment({ projectId: 'demo-linvuu-regras', firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8'), host, port: Number(porta) } });

const ana = (token = {}) => env.authenticatedContext('ana-uid', { email: 'ana@exemplo.invalid', ...token }).firestore();
const bruno = () => env.authenticatedContext('bruno-uid', { email: 'bruno@exemplo.invalid' }).firestore();
const visitante = () => env.unauthenticatedContext().firestore();
const perfil = (o = {}) => ({ nome: 'Ana Teste', email: 'ana@exemplo.invalid', xp: 0, streak: 0, licoesCompletas: [], criadoEm: serverTimestamp(), ...o });

let n = 0;
const ok = (nome) => { n++; console.log(`  ok  ${nome}`); };
async function zerar() {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (c) => {
    const db = c.firestore();
    await setDoc(doc(db, 'users/ana-uid'), { nome: 'Ana Teste', email: 'ana@exemplo.invalid', xp: 40, streak: 3, licoesCompletas: ['en:1'], criadoEm: new Date() });
    await setDoc(doc(db, 'users/bruno-uid'), { nome: 'Bruno Teste', email: 'bruno@exemplo.invalid', xp: 10, streak: 1, licoesCompletas: [], criadoEm: new Date() });
    await setDoc(doc(db, 'usuarios/ana-uid'), { plano: 'premium' });
    await setDoc(doc(db, 'lessons/aula-1'), { titulo: 'x' });
    await setDoc(doc(db, 'eventos/e1'), { u: 'x' });
    await setDoc(doc(db, 'newsletter/h1'), { email: 'lista@exemplo.invalid' });
    await setDoc(doc(db, 'billing/ana-uid'), { stripe: 'cus_FICTICIO' });
  });
}

console.log('Cadastro (create em users/{uid})');
await zerar(); await env.withSecurityRulesDisabled(async (c) => { await deleteDoc(doc(c.firestore(), 'users/ana-uid')); });
await assertSucceeds(setDoc(doc(ana(), 'users/ana-uid'), perfil())); ok('cadastro válido do próprio usuário');
const invalidos = {
  'xp diferente de zero': { xp: 100 }, 'streak diferente de zero': { streak: 5 }, 'lições já concluídas': { licoesCompletas: ['en:1'] },
  'e-mail diferente do token': { email: 'outro@exemplo.invalid' }, 'nome com 101 caracteres': { nome: 'a'.repeat(101) }, 'nome numérico': { nome: 123 },
  'xp como texto': { xp: '0' }, 'criadoEm forjado': { criadoEm: new Date('2020-01-01') }, 'campo extra plano': { plano: 'premium' },
  'campo extra assinatura': { assinatura: 'ativa' }, 'campo extra admin': { admin: true }, 'campo extra role': { role: 'admin' }, 'licoesCompletas não é lista': { licoesCompletas: 'en:1' },
};
for (const [nome, extra] of Object.entries(invalidos)) {
  await env.withSecurityRulesDisabled(async (c) => { await deleteDoc(doc(c.firestore(), 'users/ana-uid')); });
  await assertFails(setDoc(doc(ana(), 'users/ana-uid'), perfil(extra))); ok(`cadastro negado: ${nome}`);
}
await env.withSecurityRulesDisabled(async (c) => { await deleteDoc(doc(c.firestore(), 'users/ana-uid')); });
await assertFails(setDoc(doc(ana(), 'users/ana-uid'), (({ nome, ...r }) => r)(perfil()))); ok('cadastro negado: falta o campo nome');
await assertFails(setDoc(doc(bruno(), 'users/ana-uid'), perfil())); ok('cadastro negado: criar o perfil de outra pessoa');
await assertFails(setDoc(doc(visitante(), 'users/ana-uid'), perfil())); ok('cadastro negado: visitante anônimo');

console.log('Leitura e alteração entre usuários');
await zerar();
await assertSucceeds(getDoc(doc(ana(), 'users/ana-uid'))); ok('Ana lê o próprio perfil');
await assertFails(getDoc(doc(bruno(), 'users/ana-uid'))); ok('Bruno não lê o perfil da Ana');
await assertFails(getDoc(doc(visitante(), 'users/ana-uid'))); ok('visitante não lê perfil');
await assertFails(getDocs(collection(bruno(), 'users'))); ok('listar toda a coleção users é negado');
await assertFails(getDocs(query(collection(ana(), 'users')))); ok('nem a própria Ana lista a coleção users');
await assertFails(updateDoc(doc(bruno(), 'users/ana-uid'), { nome: 'Invadido' })); ok('Bruno não altera o nome da Ana');
await assertFails(updateDoc(doc(visitante(), 'users/ana-uid'), { nome: 'Invadido' })); ok('visitante não altera perfil');
await assertFails(deleteDoc(doc(ana(), 'users/ana-uid'))); ok('nem o dono apaga o perfil');

console.log('Edição legítima do nome');
await assertSucceeds(updateDoc(doc(ana(), 'users/ana-uid'), { nome: 'Ana Maria' })); ok('Ana altera o próprio nome');
await assertFails(updateDoc(doc(ana(), 'users/ana-uid'), { nome: 'a'.repeat(101) })); ok('nome com 101 caracteres negado');
await assertFails(updateDoc(doc(ana(), 'users/ana-uid'), { nome: 42 })); ok('nome não-texto negado');
await assertFails(updateDoc(doc(ana(), 'users/ana-uid'), { nome: deleteField() })); ok('apagar o campo nome negado');

console.log('Forjar plano, assinatura, privilégios e progresso');
const forjas = {
  xp: { xp: 99999 }, 'xp com increment': { xp: increment(1000) }, streak: { streak: 365 }, 'lições (lista)': { licoesCompletas: ['en:1', 'en:2', 'en:999'] },
  'lições com arrayUnion': { licoesCompletas: arrayUnion('ru:5') }, plano: { plano: 'premium' }, assinatura: { assinatura: 'ativa' }, admin: { admin: true },
  papel: { role: 'admin' }, 'papel em português': { papel: 'administrador' }, 'cliente Stripe': { stripeCustomerId: 'cus_FICTICIO' }, email: { email: 'outro@exemplo.invalid' },
  'nome junto com xp': { nome: 'Ana', xp: 5 }, criadoEm: { criadoEm: new Date() },
};
for (const [nome, dados] of Object.entries(forjas)) { await assertFails(updateDoc(doc(ana(), 'users/ana-uid'), dados)); ok(`update negado: ${nome}`); }
await assertFails(setDoc(doc(ana(), 'users/ana-uid'), perfil({ xp: 5000 }))); ok('set (sobrescrever) com xp alto negado');
await assertFails(setDoc(doc(ana(), 'users/ana-uid'), perfil({ xp: 5000 }), { merge: true })); ok('set merge com xp alto negado');

console.log('Newsletter: o navegador não acessa (só o servidor, via Admin SDK)');
for (const [quem, db] of [['visitante', visitante()], ['usuário logado', ana()]]) {
  await assertFails(addDoc(collection(db, 'newsletter'), { email: 'a@exemplo.invalid', origem: 'rodape-pt', criadoEm: serverTimestamp() })); ok(`${quem} não grava em newsletter`);
  await assertFails(getDocs(collection(db, 'newsletter'))); ok(`${quem} não lista newsletter`);
  await assertFails(getDoc(doc(db, 'newsletter/h1'))); ok(`${quem} não lê inscrito`);
}
await assertFails(updateDoc(doc(visitante(), 'newsletter/h1'), { email: 'x@exemplo.invalid' })); ok('visitante não altera inscrito');
await assertFails(deleteDoc(doc(visitante(), 'newsletter/h1'))); ok('visitante não apaga inscrito');

console.log('Coleções sem regra explícita e legadas permanecem bloqueadas');
for (const caminho of ['usuarios/ana-uid', 'lessons/aula-1', 'eventos/e1', 'billing/ana-uid', 'qualquer/coisa', 'users/ana-uid/privado/x', 'users/ana-uid/revisao/ru_1_S1_B1']) {
  await assertFails(getDoc(doc(ana(), caminho))); ok(`leitura negada: ${caminho}`);
  await assertFails(setDoc(doc(ana(), caminho.startsWith('users/ana-uid/') ? caminho : `${caminho}x`), { plano: 'premium' })); ok(`escrita negada: ${caminho}`);
}
await assertFails(getDoc(doc(visitante(), 'lessons/aula-1'))); ok('/lessons deixou de ter leitura pública');
await assertFails(setDoc(doc(bruno(), 'usuarios/ana-uid'), { plano: 'premium' })); ok('/usuarios: Bruno não escreve na pasta da Ana');
await assertFails(setDoc(doc(ana(), 'usuarios/ana-uid'), { plano: 'premium' })); ok('/usuarios: nem a própria Ana grava campos livres (antes era permitido)');

// Revisão espaçada (users/{uid}/revisao/*): só o servidor (Admin SDK, que ignora as regras) lê e escreve. Ninguém pelo navegador.
await env.withSecurityRulesDisabled(async (c) => { await setDoc(doc(c.firestore(), 'users/ana-uid/revisao/ru_1_S1_B1'), { idioma: 'ru', marca: 1 }); });
await assertFails(getDoc(doc(ana(), 'users/ana-uid/revisao/ru_1_S1_B1'))); ok('revisão: a própria Ana não lê pelo navegador');
await assertFails(getDocs(collection(ana(), 'users/ana-uid/revisao'))); ok('revisão: a própria Ana não lista pelo navegador');
await assertFails(updateDoc(doc(ana(), 'users/ana-uid/revisao/ru_1_S1_B1'), { marca: 9e12 })); ok('revisão: a Ana não adianta a própria marca (não fixa o bloco no futuro)');
await assertFails(deleteDoc(doc(ana(), 'users/ana-uid/revisao/ru_1_S1_B1'))); ok('revisão: a Ana não apaga pelo navegador');
await assertFails(getDoc(doc(bruno(), 'users/ana-uid/revisao/ru_1_S1_B1'))); ok('revisão: Bruno não lê a da Ana');
await assertFails(setDoc(doc(bruno(), 'users/ana-uid/revisao/ru_1_S1_B2'), { idioma: 'ru' })); ok('revisão: Bruno não escreve na da Ana');
await assertFails(getDoc(doc(visitante(), 'users/ana-uid/revisao/ru_1_S1_B1'))); ok('revisão: visitante não lê');

await env.cleanup();
console.log(`\nOK: ${n} verificações de regras passaram.`);
