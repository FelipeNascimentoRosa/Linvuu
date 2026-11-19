// Prova do reforço espaçado com ts-fsrs (domínio compartilhado, usado pelo APK e pelo Web): migração do legado, escrita aditiva, progressão, teto de 365 dias e virada de dia.
import assert from 'node:assert/strict';
import { Rating, State } from 'ts-fsrs';
import { cartaoDeLegado, diaCivil, meiaNoiteLocal, MS_DIA, NOTAS, notasPermitidas, PARAMETROS, proximos, rotuloIntervalo, validarFsrs, type Fsrs, type Nota } from '../src/lib/revisao/fsrsAdaptador';
import { fsrsDoRegistro, INTERVALOS_DIAS, previsoesDaVolta, registrarAvaliacao, situacaoEspacada, validarEspacado, type Espacado } from '../src/lib/revisao/espacadoModelo';
import { valorValido } from '../src/plataforma/apk/recuperacao';

process.env.TZ = 'America/Sao_Paulo';
const iso = (d: Date | number) => new Date(d).toISOString();
const local = (a: number, m: number, d: number, h = 0, mi = 0) => new Date(a, m - 1, d, h, mi).getTime();
assert.equal(PARAMETROS.request_retention, 0.9);
assert.equal(PARAMETROS.maximum_interval, 365);
assert.equal(PARAMETROS.enable_fuzz, true);
assert.equal(Rating.Again, 1); assert.equal(State.Review, 2);

// ── 1. Leitura e migração de payload legado versao 1 (estágios 1, 3 e 7 dias), sem pico de vencidos ──
const fim = local(2026, 11, 10, 9, 30);
const legado = (passo: number, dias: number): Espacado => ({ tipo: 'espacado', versao: 1, passo, em: iso(fim), proxima: iso(fim + dias * MS_DIA) });
const blocos = [legado(0, 1), legado(1, 3), legado(2, 7), legado(0, 1), legado(1, 3), legado(2, 7), legado(1, 3)];
for (const b of blocos) assert.ok(validarEspacado(b), 'payload legado é válido');
for (const b of blocos) {
  const f = fsrsDoRegistro(b, iso(fim))!;
  assert.ok(validarFsrs(f), 'o Card migrado é válido');
  assert.equal(f.due, b.proxima, 'a data de vencimento migrada é EXATAMENTE a já agendada');
  assert.equal(f.state, State.Review);
  assert.equal(f.scheduled_days, Math.round((Date.parse(b.proxima) - fim) / MS_DIA));
  assert.equal(f.reps, b.passo);
  assert.ok([1, 3, 7].includes(f.scheduled_days) && INTERVALOS_DIAS.includes(f.scheduled_days as 1 | 3 | 7));
}
// Sem avalanche: em toda hora de uma grade de 20 dias, a quantidade de vencidos é a mesma de antes da migração.
for (let t = fim - MS_DIA; t <= fim + 20 * MS_DIA; t += 3 * 60 * 60_000) {
  const antes = blocos.filter((b) => Date.parse(b.proxima) <= t).length;
  const depois = blocos.filter((b) => Date.parse(situacaoEspacada(iso(fim), b)!.proxima) <= t).length;
  assert.equal(depois, antes, `migração não cria vencidos (t=${iso(t)})`);
}
assert.equal(blocos.filter((b) => Date.parse(situacaoEspacada(iso(fim), b)!.proxima) <= fim + 12 * 60 * 60_000).length, 0, 'logo após migrar, nada futuro aparece como vencido');
assert.equal(fsrsDoRegistro(legado(3, 0), iso(fim)), null, 'legado encerrado (passo 3) não ressuscita');
assert.equal(situacaoEspacada(iso(fim), legado(3, 0)), null);
const semRegistro = fsrsDoRegistro(null, iso(fim))!;
assert.equal(semRegistro.due, iso(fim + MS_DIA), 'bloco sem registro: 1º dia depois da revisão, como antes');
const copia = JSON.stringify(blocos); fsrsDoRegistro(blocos[0], iso(fim)); assert.equal(JSON.stringify(blocos), copia, 'ler não altera o registro (um APK antigo segue lendo o mesmo dado)');
assert.equal(validarFsrs({ ...cartaoDeLegado(1, iso(fim + 3 * MS_DIA), iso(fim)), stability: -1 }), false);
assert.equal(fsrsDoRegistro({ ...legado(1, 3), fsrs: { lixo: true } as unknown as Fsrs }, iso(fim))!.due, legado(1, 3).proxima, 'fsrs corrompido é ignorado: migra do legado');

// ── 2. Escrita aditiva: o objeto salvo continua legível por consumidor antigo (versao 1) ──
/** Cópia congelada do consumidor ANTIGO (antes do FSRS): é o que um APK não atualizado executa. */
const antigoValidar = (v: unknown) => { if (!v || typeof v !== 'object' || Array.isArray(v)) return false; const o = v as Record<string, unknown>; const d = (x: unknown) => typeof x === 'string' && Number.isFinite(Date.parse(x)); return o.tipo === 'espacado' && o.versao === 1 && Number.isInteger(o.passo) && Number(o.passo) >= 0 && Number(o.passo) <= 3 && d(o.proxima) && d(o.em); };
const antigoSituacao = (rev: string, e: Record<string, unknown> | null) => (e && Number(e.passo) >= 3 ? null : e ? { passo: Number(e.passo), proxima: String(e.proxima) } : { passo: 0, proxima: new Date(Date.parse(rev) + MS_DIA).toISOString() });
let reg: Espacado | null = null, t = fim + MS_DIA;
for (const nota of ['good', 'good', 'hard', 'again', 'easy', 'good'] as Nota[]) {
  reg = registrarAvaliacao(reg, iso(fim), nota, t);
  const gravado = JSON.parse(JSON.stringify(reg));
  assert.equal(gravado.versao, 1); assert.equal(gravado.tipo, 'espacado');
  assert.ok(antigoValidar(gravado), 'consumidor antigo valida o registro novo');
  assert.ok(validarEspacado(gravado) && validarFsrs(gravado.fsrs));
  assert.deepEqual(antigoSituacao(iso(fim), gravado), { passo: gravado.passo, proxima: gravado.fsrs.due }, 'o antigo lê `proxima` = vencimento do FSRS');
  assert.ok(gravado.passo >= 0 && gravado.passo <= 2, 'passo legado 0..2: nunca "encerrado" para o app antigo');
  assert.equal(gravado.proxima, gravado.fsrs.due);
  for (const k of ['due', 'stability', 'difficulty', 'elapsed_days', 'scheduled_days', 'reps', 'lapses', 'state', 'last_review'] as const) assert.ok(k in gravado.fsrs, `fsrs.${k} gravado`);
  assert.ok(valorValido('linvuu:pratica-apk:v1:visitante:en:1:S4:bloco:1:espacado', JSON.stringify(gravado)), 'o journal de recuperação do APK aceita o registro novo');
  t = Date.parse(gravado.proxima);
}
const reescrito = { ...JSON.parse(JSON.stringify(reg)) }; delete reescrito.fsrs; // APK antigo regravou e o fsrs sumiu
assert.equal(fsrsDoRegistro(reescrito, iso(fim))!.due, reescrito.proxima, 'sem fsrs: migra do legado, mesma data');

// ── 3. Progressão determinística: Again, Hard, Good, Easy ──
const base = cartaoDeLegado(1, iso(local(2026, 11, 13, 10)), iso(local(2026, 11, 10, 10)));
const agora = local(2026, 11, 13, 10);
const p1 = proximos(base, agora), p2 = proximos(base, agora);
assert.deepEqual(p1, p2, 'mesma entrada, mesma saída (fuzz determinístico)');
const dias = (n: Nota) => diaCivil(Date.parse(p1[n].due)) - diaCivil(agora);
assert.equal(p1.again.state, State.Relearning); assert.equal(Date.parse(p1.again.due) - agora, 10 * 60_000, 'Errei: 10 minutos');
assert.equal(p1.again.lapses, base.lapses + 1);
for (const n of ['hard', 'good', 'easy'] as Nota[]) assert.equal(p1[n].state, State.Review);
assert.ok(dias('hard') >= 1 && dias('hard') < dias('good') && dias('good') < dias('easy'), `Difícil < Bom < Fácil (${dias('hard')}, ${dias('good')}, ${dias('easy')} dias)`);
assert.deepEqual(NOTAS.map((n) => rotuloIntervalo(p1[n], agora)), ['10m', `${dias('hard')}d`, `${dias('good')}d`, `${dias('easy')}d`], 'rótulos mostrados nos botões');
assert.deepEqual([dias('hard'), dias('good'), dias('easy')], [12, 17, 27], 'valores medidos no ts-fsrs 5.4.2 (retenção 0,9) para este cartão (estabilidade 3 d, dificuldade inicial)');
for (const n of ['hard', 'good', 'easy'] as Nota[]) { const d = new Date(p1[n].due); assert.deepEqual([d.getHours(), d.getMinutes()], [0, 0], `${n}: vence à meia-noite local`); }
let c = base, tt = agora, anterior = 0;
for (let n = 0; n < 12; n++) { c = proximos(c, tt).good; const d = diaCivil(Date.parse(c.due)) - diaCivil(tt); assert.ok(d <= 365, `Bom em sequência nunca passa de 365 dias (${d})`); if (anterior < 300) assert.ok(d > anterior, 'Bom em sequência aumenta o intervalo até perto do teto'); else assert.ok(d >= 0.9 * 365, 'perto do teto o fuzz oscila só dentro de ~10%'); anterior = d; tt = Date.parse(c.due); }
assert.deepEqual(notasPermitidas(true), ['hard', 'good', 'easy']); assert.deepEqual(notasPermitidas(false), ['again']);
assert.deepEqual(Object.keys(previsoesDaVolta(null, iso(fim), fim + MS_DIA)!), ['again', 'hard', 'good', 'easy']);

// ── 4. maximum_interval de 365 dias e virada de dia (23:55 → 00:05, horário local) ──
const veterano: Fsrs = { ...base, stability: 5000, scheduled_days: 365, reps: 40, difficulty: 3, last_review: iso(local(2026, 1, 1, 10)), due: iso(local(2026, 11, 13, 10)) };
for (const n of ['hard', 'good', 'easy'] as Nota[]) {
  const f = proximos(veterano, agora)[n];
  assert.ok(f.scheduled_days <= 365, `${n}: scheduled_days ${f.scheduled_days} ≤ 365`);
  assert.ok(diaCivil(Date.parse(f.due)) - diaCivil(agora) <= 365, `${n}: vence em no máximo 365 dias`);
}
assert.ok(proximos(veterano, agora).easy.scheduled_days >= 0.9 * 365, 'Fácil num cartão maduro fica na faixa do teto');
// Regressão da falha medida: com estabilidade muito alta o fuzz cru do ts-fsrs devolve 366; o adaptador nunca passa de 365.
let maxVisto = 0;
for (let k = 0; k < 400; k++) { const v = { ...veterano, stability: 2000 + k * 37, reps: 10 + k }; for (const n of ['good', 'easy'] as Nota[]) maxVisto = Math.max(maxVisto, proximos(v, agora + k * MS_DIA)[n].scheduled_days); }
assert.equal(maxVisto, 365, 'nenhum cartão agenda mais de 365 dias, e o teto é alcançado');
for (const tz of ['America/Sao_Paulo', 'America/New_York']) {
  process.env.TZ = tz;
  const cartao = cartaoDeLegado(1, iso(local(2026, 11, 3, 23, 55)), iso(local(2026, 10, 31, 23, 55)));
  const noite = local(2026, 11, 3, 23, 55), madrugada = local(2026, 11, 4, 0, 5);
  assert.equal(madrugada - noite, 10 * 60_000);
  assert.equal(diaCivil(madrugada) - diaCivil(noite), 1, `${tz}: 10 minutos depois já é outro dia civil`);
  const a = proximos(cartao, noite), b = proximos(cartao, madrugada);
  assert.equal(diaCivil(Date.parse(b.good.due)) - diaCivil(Date.parse(a.good.due)), 1 + (b.good.scheduled_days - a.good.scheduled_days), `${tz}: a data de vencimento acompanha o dia civil de quem avalia`);
  assert.ok(b.good.elapsed_days >= a.good.elapsed_days, `${tz}: dias decorridos contam pelo calendário local (23:55 → 00:05)`);
  for (const f of [a.good, a.easy, b.good, b.easy]) { const d = new Date(f.due); assert.deepEqual([d.getHours(), d.getMinutes()], [0, 0], `${tz}: vencimento exatamente à meia-noite local`); }
  const antes = meiaNoiteLocal(diaCivil(local(2026, 11, 1, 12)) + 1); // atravessa o fim do horário de verão nos EUA (1/11)
  assert.deepEqual([antes.getDate(), antes.getHours()], [2, 0], `${tz}: meia-noite local correta atravessando mudança de horário`);
  // O vencimento não aparece como "vencido" antes da meia-noite local.
  const vence = Date.parse(a.good.due);
  assert.ok(vence > noite && vence > madrugada - 24 * 60 * 60_000);
}
process.env.TZ = 'America/Sao_Paulo';

// 6. Relógio atrasado: avaliar com "agora" ANTES da última revisão não pode lançar (o ts-fsrs recusa tempo negativo).
{
  const revisadoEm = local(2026, 11, 18, 12);
  const card = cartaoDeLegado(0, iso(revisadoEm + MS_DIA), iso(revisadoEm - 3 * MS_DIA));
  const comDefeito = { ...card, last_review: iso(revisadoEm) };
  for (const atraso of [60_000, 6 * 3_600_000, 3 * MS_DIA]) {
    const agora = revisadoEm - atraso;
    const p = proximos(comDefeito, agora);
    for (const n of NOTAS) assert.ok(validarFsrs(p[n]), `relógio ${atraso} ms atrasado: ${n} continua válido`);
    assert.ok(Date.parse(p.good.due) >= revisadoEm, `relógio atrasado: o vencimento parte da última revisão, não do passado (${atraso} ms)`);
  }
  const aprendendo = avaliarAprendendo(revisadoEm);
  assert.ok(Date.parse(aprendendo.due) >= revisadoEm, 'passo curto com relógio atrasado também não lança');
}
function avaliarAprendendo(t: number): Fsrs {
  const errou = proximos(cartaoDeLegado(0, iso(t + MS_DIA), iso(t - MS_DIA)), t).again; // vira Reaprendendo, last_review = t
  return proximos(errou, t - 120_000).good;
}

console.log('FSRS (domínio compartilhado): migração sem pico de vencidos, escrita aditiva versao 1, progressão Again/Hard/Good/Easy, teto de 365 dias e virada de dia local aprovados.');
