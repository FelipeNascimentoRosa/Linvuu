// Contrato e conflito do registro de revisão por bloco (modelo puro, sem rede nem Firestore).
// Rodar: node --import tsx scripts/testar-registro-bloco.ts
import assert from 'node:assert/strict';
import { registrarAvaliacao } from '../src/lib/revisao/espacadoModelo';
import type { Revisao } from '../src/lib/revisao/revisaoModelo';
import { fundirRegistros, idBloco, LIMITE_BYTES_REGISTRO, LIMITE_LOTE, marcaRegistro, normalizarRegistro, TOLERANCIA_RELOGIO_MS, validarLote, validarRegistroBloco, vence, type RegistroBloco } from '../src/lib/revisao/registroBloco';

const T0 = Date.parse('2026-11-18T12:00:00.000Z');
const DIA = 86_400_000;
const iso = (t: number) => new Date(t).toISOString();
const SIG = `ex2:${'a'.repeat(32)}:5`;

const revisao = (em: number, sobra: Partial<Revisao> = {}): Revisao => ({ tipo: 'revisao-erros', versao: 1, assinatura: SIG, origem: [0, 1, 2], fila: [0], indice: 0, rodada: 2, respostas: { 0: true, 1: true, 2: true }, escolha: null, ordem: [], texto: '', resultado: null, fim: true, em: iso(em), ...sobra });
const base = (aula: number, bloco: number, praticaEm: number): RegistroBloco => ({ idioma: 'ru', aula, sessao: 1, bloco, pratica: { acertos: 2, total: 5, em: iso(praticaEm), versao: 2, assinatura: SIG } });
/** Bloco já revisado e reagendado pelo FSRS: `nota` aplicada em `quando`. */
const agendado = (aula: number, bloco: number, praticaEm: number, quando: number, nota: 'again' | 'hard' | 'good' | 'easy' = 'good'): RegistroBloco => {
  const r = base(aula, bloco, praticaEm); r.revisao = revisao(praticaEm + 1000); r.espacado = registrarAvaliacao(null, r.revisao.em, nota, quando); return r;
};

// 1. formato: o registro válido passa; cada violação reprova
const ok = agendado(1, 1, T0 - 3 * DIA, T0 - DIA);
assert.ok(validarRegistroBloco(ok), 'registro agendado é válido');
assert.ok(validarRegistroBloco(base(1, 2, T0)), 'só prática com erro (sem revisão ainda) é válido');
const ruins: Array<[string, unknown]> = [
  ['chave extra', { ...ok, nota: 10 }],
  ['idioma em maiúsculas', { ...ok, idioma: 'RU' }],
  ['idioma com 4 letras', { ...ok, idioma: 'russ' }],
  ['aula zero', { ...ok, aula: 0 }],
  ['aula decimal', { ...ok, aula: 1.5 }],
  ['sessão 100', { ...ok, sessao: 100 }],
  ['bloco zero', { ...ok, bloco: 0 }],
  ['bloco perfeito não tem o que rever', { ...ok, pratica: { ...ok.pratica, acertos: 5 } }],
  ['sem prática', { ...ok, pratica: undefined }],
  ['espaçado sem revisão', { ...base(1, 3, T0), espacado: ok.espacado }],
  ['espaçado com revisão ainda aberta', { ...ok, revisao: { ...ok.revisao, fim: false, resultado: null } }],
  ['fsrs corrompido', { ...ok, espacado: { ...ok.espacado, fsrs: { ...ok.espacado!.fsrs, stability: 'x' } } }],
  ['intervalo fsrs acima do teto', { ...ok, espacado: { ...ok.espacado, fsrs: { ...ok.espacado!.fsrs, scheduled_days: 366 } } }],
  ['não é objeto', 'texto'], ['array', []], ['nulo', null],
];
for (const [nome, v] of ruins) assert.equal(validarRegistroBloco(v), false, nome);
// tamanho: texto + escolha no limite e as listas cheias estouram o teto de bytes do registro
const cheio = Array.from({ length: 500 }, (_, i) => i);
const gordo: RegistroBloco = { ...base(1, 4, T0), revisao: revisao(T0, { origem: cheio, fila: cheio, ordem: cheio, respostas: Object.fromEntries(cheio.map((i) => [i, false])), escolha: 'x'.repeat(8000), texto: 'y'.repeat(8000), resultado: null, fim: false }) };
assert.ok(JSON.stringify(gordo).length > LIMITE_BYTES_REGISTRO, 'o caso gordo realmente passa do teto');
assert.equal(validarRegistroBloco(gordo), false, 'registro acima do teto de bytes');

// 2. normalizar: descarta o que o validador não olha e é idempotente
const sujo = JSON.parse(JSON.stringify(ok)); sujo.espacado.lixo = 'x'.repeat(1000); sujo.revisao.lixo = { a: 1 }; sujo.pratica.lixo = 1; sujo.espacado.fsrs.lixo = 2;
const limpo = normalizarRegistro(sujo);
for (const k of ['lixo']) for (const o of [limpo.espacado, limpo.revisao, limpo.pratica, limpo.espacado!.fsrs]) assert.equal(k in (o as object), false, 'campo desconhecido removido');
assert.deepEqual(normalizarRegistro(limpo), limpo, 'normalizar é idempotente');
assert.deepEqual(limpo, ok, 'normalizar preserva tudo o que é conhecido');

// 3. conflito: relação total, nunca os dois lados vencem
const ra = agendado(1, 1, T0 - 5 * DIA, T0 - 2 * DIA, 'good');
const rb = agendado(1, 1, T0 - 5 * DIA, T0 - DIA, 'good');
assert.ok(vence(rb, ra) && !vence(ra, rb), 'marca mais recente vence');
assert.equal(vence(ra, ra), false, 'igual a si mesmo não substitui');
// empate de marca: mais repetições vence
const e1 = agendado(1, 1, T0 - 9 * DIA, T0 - DIA, 'good');
const e2 = JSON.parse(JSON.stringify(e1)) as RegistroBloco; e2.espacado!.fsrs!.reps += 3;
assert.ok(vence(e2, e1) && !vence(e1, e2), 'empate de marca: mais repetições vence');
// empate total e conteúdos diferentes: exatamente um vence, e é o mesmo dos dois lados
const t1 = JSON.parse(JSON.stringify(e1)) as RegistroBloco; t1.espacado!.passo = 0; const t2 = JSON.parse(JSON.stringify(e1)) as RegistroBloco; t2.espacado!.passo = 1;
assert.notEqual(vence(t1, t2), vence(t2, t1), 'desempate determinístico: um e só um');
// varredura: 300 pares aleatórios nunca dão dois vencedores
let seed = 7; const alea = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
for (let i = 0; i < 300; i++) {
  const a = agendado(1, 1, T0 - Math.floor(alea() * 20) * DIA, T0 - Math.floor(alea() * 10) * DIA, (['again', 'hard', 'good', 'easy'] as const)[Math.floor(alea() * 4)]);
  const b = agendado(1, 1, T0 - Math.floor(alea() * 20) * DIA, T0 - Math.floor(alea() * 10) * DIA, (['again', 'hard', 'good', 'easy'] as const)[Math.floor(alea() * 4)]);
  assert.ok(!(vence(a, b) && vence(b, a)), 'nunca dois vencedores');
  if (JSON.stringify(a) !== JSON.stringify(b)) assert.ok(vence(a, b) || vence(b, a), 'diferentes sempre têm um vencedor');
}

// 4. cache velho nunca sobrescreve progresso novo (nos dois sentidos de chamada)
const velho = agendado(2, 1, T0 - 8 * DIA, T0 - 6 * DIA), novo = agendado(2, 1, T0 - 8 * DIA, T0 - DIA, 'easy');
for (const [loc, rem] of [[velho, novo], [novo, velho]] as const) {
  const f = fundirRegistros([loc], [rem]);
  assert.deepEqual(f.todos, [novo], 'o mais novo sempre fica');
  assert.deepEqual(f.paraConta, loc === novo ? [novo] : [], 'só envia à conta se o do aparelho é o mais novo');
  assert.deepEqual(f.paraAparelho, loc === velho ? [novo] : [], 'só atualiza o aparelho se a conta é a mais nova');
}
assert.deepEqual(fundirRegistros([novo], [JSON.parse(JSON.stringify(novo))]).paraConta, [], 'iguais: nada a enviar');

// 5. visitante → conta: cada bloco uma vez, sem duplicar e sem "avalanche" de vencidos
const visitante = [agendado(3, 1, T0 - 20 * DIA, T0 - 15 * DIA), agendado(3, 2, T0 - 20 * DIA, T0 - 12 * DIA), agendado(3, 3, T0 - 4 * DIA, T0 - 3 * DIA)];
const conta = [agendado(3, 2, T0 - 20 * DIA, T0 - 2 * DIA, 'easy'), agendado(3, 4, T0 - 6 * DIA, T0 - 5 * DIA)];
const f = fundirRegistros(visitante, conta);
const ids = f.todos.map(idBloco);
assert.equal(new Set(ids).size, ids.length, 'sem blocos duplicados');
assert.deepEqual([...ids].sort(), ['ru_3_S1_B1', 'ru_3_S1_B2', 'ru_3_S1_B3', 'ru_3_S1_B4'].sort(), 'união exata dos blocos');
assert.deepEqual(f.todos.find((r) => idBloco(r) === 'ru_3_S1_B2'), conta[0], 'no bloco que existe nos dois, a revisão mais recente da conta vence');
assert.deepEqual(f.paraConta.map(idBloco).sort(), ['ru_3_S1_B1', 'ru_3_S1_B3'], 'a conta recebe só o que não tinha');
assert.deepEqual(f.paraAparelho.map(idBloco).sort(), ['ru_3_S1_B2', 'ru_3_S1_B4'], 'o aparelho recebe o que não tinha e a versão mais nova do bloco que tinha velho');
// nenhuma data de vencimento foi alterada pela junção: o número de vencidos hoje é o mesmo de antes da junção
const vencidos = (rs: RegistroBloco[], agora: number) => rs.filter((r) => Date.parse(r.espacado!.proxima) <= agora).length;
for (const agora of [T0, T0 + 7 * DIA, T0 + 40 * DIA]) {
  const melhores = new Map<string, RegistroBloco>();
  for (const r of [...visitante, ...conta]) { const a = melhores.get(idBloco(r)); if (!a || vence(r, a)) melhores.set(idBloco(r), r); }
  assert.equal(vencidos(f.todos, agora), vencidos([...melhores.values()], agora), `junção não cria vencidos (agora=+${Math.round((agora - T0) / DIA)}d)`);
}
for (const r of f.todos) { const o = [...visitante, ...conta].find((x) => JSON.stringify(x) === JSON.stringify(r)); assert.ok(o, 'cada registro da junção é um dos originais, sem reescrita'); }
assert.deepEqual(fundirRegistros(f.todos, f.todos).paraConta, [], 'junção repetida é idempotente');
assert.deepEqual(fundirRegistros([], []).todos, [], 'vazio com vazio');
assert.equal(fundirRegistros([ok, { ...ok }], []).todos.length, 1, 'duplicata no mesmo lado também some');

// 6. lote do PUT
assert.equal(marcaRegistro(ok), Math.max(Date.parse(ok.pratica.em), Date.parse(ok.revisao!.em), Date.parse(ok.espacado!.em), Date.parse(ok.espacado!.fsrs!.last_review)));
assert.ok(validarLote({ registros: [ok] }, T0)?.length === 1, 'lote válido');
const lote = (n: number) => ({ registros: Array.from({ length: n }, (_, i) => agendado(10 + i, 1, T0 - 4 * DIA, T0 - DIA)) });
assert.equal(validarLote(lote(LIMITE_LOTE), T0)?.length, LIMITE_LOTE, 'exatamente 50 passa');
assert.equal(validarLote(lote(LIMITE_LOTE + 1), T0), null, '51 não passa');
assert.equal(validarLote({ registros: [] }, T0), null, 'lote vazio');
assert.equal(validarLote({ registros: [ok, ok] }, T0), null, 'mesmo bloco duas vezes no lote');
assert.equal(validarLote({ registros: [ok], extra: 1 }, T0), null, 'chave extra no corpo');
assert.equal(validarLote({ registros: [{ ...ok, aula: 0 }] }, T0), null, 'um registro inválido derruba o lote');
assert.equal(validarLote([ok], T0), null, 'corpo array');
assert.equal(validarLote(null, T0), null, 'corpo nulo');
const futuro = agendado(20, 1, T0, T0 + TOLERANCIA_RELOGIO_MS + 60_000);
assert.equal(validarLote({ registros: [futuro] }, T0), null, 'marca no futuro além da tolerância é recusada (relógio adiantado não trava o bloco)');
assert.ok(validarLote({ registros: [agendado(21, 1, T0, T0 + TOLERANCIA_RELOGIO_MS - 60_000)] }, T0), 'dentro da tolerância passa');
const limpoLote = validarLote({ registros: [sujo] }, T0);
assert.ok(limpoLote === null || !('lixo' in (limpoLote[0].espacado as object)), 'o lote devolve registros normalizados');

console.log('registro de bloco: formato, conflito (marca, repetições, desempate), cache velho, junção visitante→conta sem duplicar nem vencer em massa e lote do PUT aprovados.');
