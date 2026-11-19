// Revisão espaçada no Web: armazém por conta e visitante, fusão sem duplicar nem vencer em massa, sincronização com conflito,
// prática por bloco, agenda, atalhos de teclado (WCAG 2.1.4) e rótulos nas duas línguas. Sem navegador, rede nem Firebase.
// Rodar: node --import tsx scripts/testar-revisao-web.ts
import assert from 'node:assert/strict';
import type { Exercicio } from '../src/lib/aulas';
import { criarArmazem, criarSincronizadorRevisao, VISITANTE } from '../src/lib/revisaoWeb/armazem';
import { registrarPratica, registroDaPratica, numeroDaSessao, type PontoDoBloco } from '../src/lib/revisaoWeb/pratica';
import { acaoDaTecla, type Contexto } from '../src/lib/revisaoWeb/atalhos';
import { intervaloFalado, intervaloVisivel } from '../src/lib/revisaoWeb/textos';
import { agendaDeRegistros } from '../src/lib/revisao/reforcoModelo';
import { registrarAvaliacao } from '../src/lib/revisao/espacadoModelo';
import { MS_DIA } from '../src/lib/revisao/fsrsAdaptador';
import { fundirRegistros, idBloco, validarLote, validarRegistroBloco, vence, type RegistroBloco } from '../src/lib/revisao/registroBloco';

let n = 0;
const ok = (nome: string) => console.log(`  ✓ ${++n}. ${nome}`);

const memoria = () => { const m = new Map<string, string>(); return { m, getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { m.set(k, v); }, removeItem: (k: string) => { m.delete(k); } }; };
const itensDe = (prefixo: string, quantos = 4): Exercicio[] => Array.from({ length: quantos }, (_, i) => ({ id: `${prefixo}-${i}`, tipo: 'multiple-choice' as const, enunciado: `Como se diz «привет» / olá ${i}?`, opcoes: ['Привет', 'Пока', 'Спасибо'], gabarito: 'Привет' }));
const ponto = (bloco = 1, sessao = 1, aula = 1, idioma = 'ru'): PontoDoBloco => ({ idioma, aula, sessao, bloco });
const AGORA = Date.parse('2026-11-18T15:00:00-03:00');
const comErro = (p: PontoDoBloco, itens: Exercicio[], quando = AGORA): RegistroBloco => registroDaPratica(p, itens, { 0: false, 1: true, 2: true, 3: true }, new Date(quando))!;
/** Registro com a revisão dos erros terminada em `fimEm`: a primeira volta vence 1 dia depois. */
const concluido = (r: RegistroBloco, fimEm: number): RegistroBloco => ({ ...r, revisao: { ...r.revisao!, fim: true, respostas: { 0: true }, em: new Date(fimEm).toISOString() } });

// 1. bloco perfeito não gera registro; bloco com erro gera registro válido, com a assinatura e a origem certas
{
  const itens = itensDe('a');
  assert.equal(registroDaPratica(ponto(), itens, { 0: true, 1: true, 2: true, 3: true }), null);
  assert.equal(registroDaPratica(ponto(), itens, { 0: true, 1: true }), null, 'prática incompleta não vira registro');
  const r = comErro(ponto(), itens);
  assert.ok(validarRegistroBloco(r));
  assert.deepEqual(r.revisao!.origem, [0]);
  assert.equal(r.pratica.acertos, 3); assert.equal(r.pratica.total, 4);
  assert.deepEqual(validarLote({ registros: [r] }), [r]);
  ok('bloco perfeito não gera registro; bloco com erro gera registro válido que o servidor aceita');
}
// 2. exercício de produção/repetição não entra na conta nem na origem
{
  const itens: Exercicio[] = [...itensDe('b', 2), { id: 'b-p', tipo: 'producao', enunciado: 'Escreva', respostaEsperada: 'x' }, { id: 'b-r', tipo: 'repeat', enunciado: 'Repita', respostaEsperada: 'y' }];
  const r = registroDaPratica(ponto(), itens, { 0: false, 1: true }, new Date(AGORA))!;
  assert.equal(r.pratica.total, 2); assert.deepEqual(r.revisao!.origem, [0]);
  ok('exercícios de produção e repetição ficam fora da correção e da origem da revisão');
}
// 3. a primeira tentativa de cada versão do bloco vale; conteúdo novo substitui
{
  const d = memoria(); const arm = criarArmazem(d, () => 'u1');
  const itens = itensDe('c');
  assert.ok(registrarPratica(arm, ponto(), itens, { 0: false, 1: true, 2: true, 3: true }, new Date(AGORA)));
  assert.equal(registrarPratica(arm, ponto(), itens, { 0: false, 1: false, 2: true, 3: true }, new Date(AGORA + 3_600_000)), null, 'refazer não reinicia a revisão');
  assert.equal(arm.ler('ru')[0].pratica.acertos, 3);
  const novos = itensDe('c', 5);
  assert.ok(registrarPratica(arm, ponto(), novos, { 0: false, 1: true, 2: true, 3: true, 4: true }, new Date(AGORA + 7_200_000)), 'conteúdo mudou: a prática nova vale');
  assert.equal(arm.ler('ru').length, 1); assert.equal(arm.ler('ru')[0].pratica.total, 5);
  ok('primeira tentativa de cada versão vale; refazer não reinicia; conteúdo novo substitui sem duplicar');
}
// 4. visitante → conta: cada bloco uma vez, datas preservadas, nada vira vencido por causa da junção
{
  const d = memoria(); let dono = VISITANTE; const arm = criarArmazem(d, () => dono);
  const mesmo = comErro(ponto(1), itensDe('d')); // bloco 1: existe como visitante e na conta
  const soVisitante = concluido(comErro(ponto(2), itensDe('e'), AGORA - 5 * MS_DIA), AGORA - 4 * MS_DIA); // volta venceu há 3 dias? (1 dia depois do fim)
  arm.gravar(mesmo); arm.gravar(soVisitante);
  dono = 'u1';
  arm.gravar({ ...mesmo, pratica: { ...mesmo.pratica, em: new Date(AGORA + 1000).toISOString() }, revisao: { ...mesmo.revisao!, em: new Date(AGORA + 1000).toISOString() } }); // a conta já tinha uma versão mais nova do bloco 1
  const antes = agendaDeRegistros(arm.ler('ru'), () => 1, AGORA).itens.length;
  assert.equal(antes, 1);
  assert.equal(arm.adotarVisitante('ru'), 2);
  assert.equal(arm.adotarVisitante('ru'), 0, 'idempotente: a cópia de visitante some depois de adotada');
  const lista = arm.ler('ru');
  assert.equal(lista.length, 2, 'dois blocos, nenhum duplicado');
  assert.equal(new Set(lista.map(idBloco)).size, 2);
  assert.equal(lista.find((r) => r.bloco === 1)!.pratica.em, new Date(AGORA + 1000).toISOString(), 'a versão mais nova da conta não foi sobrescrita pelo visitante');
  const venc = (r: RegistroBloco) => r.espacado ? r.espacado.proxima : null;
  assert.equal(venc(lista.find((r) => r.bloco === 2)!), null);
  assert.equal(JSON.stringify(lista.find((r) => r.bloco === 2)), JSON.stringify(soVisitante), 'o bloco só do visitante chegou intacto, sem data reescrita');
  dono = VISITANTE; assert.equal(arm.ler('ru').length, 0, 'o visitante não guarda mais nada');
  ok('visitante → conta: sem duplicar, sem sobrescrever o mais novo, sem reescrever datas');
}
// 5. agenda: erros pendentes, volta vencida, próxima futura, sem avalanche
{
  const base = comErro(ponto(1), itensDe('f'));
  const venceu = concluido(comErro(ponto(2), itensDe('g'), AGORA - 3 * MS_DIA), AGORA - 2 * MS_DIA); // volta 1 dia depois do fim: vencida
  const futuro = concluido(comErro(ponto(3), itensDe('h'), AGORA - MS_DIA), AGORA - 3_600_000); // vence em ~23 h
  const ag = agendaDeRegistros([base, venceu, futuro], () => 7, AGORA);
  assert.deepEqual(ag.itens.map((i) => [i.bloco, i.tipo]).sort(), [[1, 'erros'], [2, 'espacado']]);
  assert.ok(ag.proxima && Date.parse(ag.proxima) > AGORA, 'a próxima revisão está no futuro');
  assert.equal(ag.itens.every((i) => i.aula === 1 && i.sessao === 1), true);
  const semDia = agendaDeRegistros([base], () => null, AGORA);
  assert.deepEqual(semDia.itens, []);
  ok('agenda: erros pendentes e volta vencida entram; o que vence depois vira "próxima"; bloco sem dia no percurso é ignorado');
}
// 6. a nota reagenda e some da lista de hoje; "Errei" volta em minutos
{
  const r = concluido(comErro(ponto(1), itensDe('i'), AGORA - 3 * MS_DIA), AGORA - 2 * MS_DIA);
  assert.equal(agendaDeRegistros([r], () => 1, AGORA).itens.length, 1);
  const bom = { ...r, espacado: registrarAvaliacao(null, r.revisao!.em, 'good', AGORA) };
  assert.ok(validarRegistroBloco(bom));
  assert.equal(agendaDeRegistros([bom], () => 1, AGORA).itens.length, 0, 'depois de "Bom" o bloco sai de hoje');
  const errei = { ...r, espacado: registrarAvaliacao(null, r.revisao!.em, 'again', AGORA) };
  assert.equal(agendaDeRegistros([errei], () => 1, AGORA).itens.length, 0);
  assert.equal(agendaDeRegistros([errei], () => 1, AGORA + 11 * 60_000).itens.length, 1, '"Errei" volta em ~10 minutos');
  assert.ok(vence(bom, r) && vence(errei, r));
  ok('nota "Bom" reagenda para dias depois; "Errei" volta em ~10 min; ambas vencem o registro anterior');
}
// 7. sincronização: servidor falso com a mesma regra de conflito
{
  const servidor = new Map<string, RegistroBloco>();
  const chamadas: string[] = [];
  let derrubado = false;
  const pedir = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url); chamadas.push(`${init?.method ?? 'GET'} ${u}`);
    if (derrubado) throw new TypeError('offline');
    if (!(init?.headers as Record<string, string>)?.Authorization) return new Response('{}', { status: 401 });
    if ((init?.method ?? 'GET') === 'GET') return Response.json({ registros: [...servidor.values()].filter((r) => u.endsWith(r.idioma)), truncado: false });
    const lote = validarLote(JSON.parse(String(init!.body)));
    if (!lote) return new Response('{}', { status: 400 });
    return Response.json({ registros: lote.map((r) => { const a = servidor.get(idBloco(r)); if (a && !vence(r, a)) return a; servidor.set(idBloco(r), r); return r; }) });
  }) as typeof fetch;
  const d = memoria(); let uid = 'u1'; const arm = criarArmazem(d, () => uid);
  const sinc = criarSincronizadorRevisao(arm, () => uid, async () => ({ uid, token: 't' }), pedir).sincronizar;
  const velho = comErro(ponto(1), itensDe('j'), AGORA - 2 * MS_DIA);
  const novo = { ...velho, pratica: { ...velho.pratica, em: new Date(AGORA).toISOString() }, revisao: { ...velho.revisao!, em: new Date(AGORA).toISOString() } };
  servidor.set(idBloco(novo), novo);          // outro aparelho já gravou a versão nova
  arm.gravar(velho);                          // este aparelho tem um cache antigo
  assert.equal(await sinc('ru'), true);
  assert.equal(arm.ler('ru')[0].pratica.em, novo.pratica.em, 'cache antigo não sobrescreve; o aparelho adota a versão mais nova da conta');
  assert.equal(servidor.get(idBloco(velho))!.pratica.em, novo.pratica.em, 'o servidor continua com a versão nova');
  // bloco novo só local sobe para a conta
  const local = comErro(ponto(2), itensDe('k'), AGORA);
  arm.gravar(local);
  assert.equal(await sinc('ru'), true);
  assert.ok(servidor.has(idBloco(local)));
  // offline: devolve false e não perde nada
  derrubado = true;
  const offline = comErro(ponto(3), itensDe('l'), AGORA);
  arm.gravar(offline);
  assert.equal(await sinc('ru'), false);
  assert.equal(arm.ler('ru').length, 3, 'offline não apaga nem duplica');
  derrubado = false;
  assert.equal(await sinc('ru'), true);
  assert.ok(servidor.has(idBloco(offline)), 'ao voltar a rede, o que ficou só no aparelho sobe');
  assert.equal(servidor.size, 3);
  // visitante nunca chama a rede
  const antes = chamadas.length; uid = VISITANTE;
  assert.equal(await sinc('ru'), false); assert.equal(chamadas.length, antes);
  // lote de mais de 50 blocos sobe em partes de 50, sem perder nenhum
  uid = 'u2';
  for (let i = 1; i <= 120; i++) arm.gravar(comErro(ponto(1, 1, i), itensDe(`m${i}`), AGORA));
  const puts = () => chamadas.filter((c) => c.startsWith('PUT')).length;
  const p0 = puts();
  assert.equal(await sinc('ru'), true);
  assert.equal(puts() - p0, 3, '120 blocos = 3 pedidos de até 50');
  assert.equal([...servidor.values()].filter((r) => r.aula > 3 || r.bloco === 1).length >= 120, true);
  ok('sincronização: o mais novo vence nos dois sentidos, offline não perde nada, visitante não usa rede, lote > 50 sobe em partes');
}
// 8. troca de conta no meio do voo não mistura dados
{
  const d = memoria(); let uid = 'u1'; const arm = criarArmazem(d, () => uid);
  arm.gravar(comErro(ponto(1), itensDe('n')));
  uid = 'u2';
  assert.equal(arm.ler('ru').length, 0, 'outra conta não enxerga o que é da primeira');
  uid = 'u1'; assert.equal(arm.ler('ru').length, 1);
  ok('cada conta tem a sua lista; trocar de conta não mistura blocos');
}
// 9. dados corrompidos no disco são descartados, não "consertados"
{
  const d = memoria(); const arm = criarArmazem(d, () => 'u1');
  d.setItem('linvuu:revisao-web:v1:u1:ru', '{"versao":1,"registros":[{"idioma":"ru","aula":1}]}');
  assert.deepEqual(arm.ler('ru'), []);
  d.setItem('linvuu:revisao-web:v1:u1:ru', 'lixo{');
  assert.deepEqual(arm.ler('ru'), []);
  assert.deepEqual(arm.ler('../x'), []);
  ok('disco corrompido ou idioma inválido: lista vazia, sem exceção');
}
// 10. cirílico e acentos atravessam o armazém intactos
{
  const d = memoria(); const arm = criarArmazem(d, () => 'u1');
  const itens: Exercicio[] = [{ id: 'x', tipo: 'fill-gap', enunciado: 'Завершите: Я ___ студент / Eu sou ação', respostaEsperada: 'Я студент' }, ...itensDe('o', 1)];
  const r = registroDaPratica(ponto(), itens, { 0: false, 1: true }, new Date(AGORA))!;
  arm.gravar({ ...r, revisao: { ...r.revisao!, texto: 'Я студентка — não', escolha: null } });
  const volta = arm.ler('ru')[0];
  assert.equal(volta.revisao!.texto, 'Я студентка — não');
  assert.equal(numeroDaSessao('S3'), 3); assert.equal(numeroDaSessao('3'), null);
  ok('cirílico, acentos e travessão atravessam o armazém intactos');
}
// 11. atalhos (WCAG 2.1.4): só dentro da região, nunca ao digitar, notas só as liberadas
{
  const base: Contexto = { dentro: true, tag: 'P', editavel: false, podeAvancar: true, notasAbertas: false, notasLiberadas: ['hard', 'good', 'easy'], temAudio: true };
  const tecla = (key: string, extra: Record<string, boolean> = {}) => ({ key, ...extra });
  assert.deepEqual(acaoDaTecla(tecla('Enter'), base), { tipo: 'avancar' });
  assert.deepEqual(acaoDaTecla(tecla(' '), base), { tipo: 'avancar' });
  assert.deepEqual(acaoDaTecla(tecla('r'), base), { tipo: 'repetir-audio' });
  assert.equal(acaoDaTecla(tecla('r'), { ...base, temAudio: false }), null);
  assert.equal(acaoDaTecla(tecla('Enter'), { ...base, podeAvancar: false }), null);
  assert.equal(acaoDaTecla(tecla('Enter'), { ...base, tag: 'BUTTON' }), null, 'no botão, Enter/Espaço fazem a ação nativa do botão');
  assert.deepEqual(acaoDaTecla(tecla('Enter'), { ...base, tag: 'BUTTON', radio: true }), { tipo: 'avancar' }, 'na opção de resposta o Enter confirma');
  assert.equal(acaoDaTecla(tecla(' '), { ...base, tag: 'BUTTON', radio: true }), null, 'na opção de resposta o Espaço só escolhe a opção');
  assert.equal(acaoDaTecla(tecla('Enter'), { ...base, tag: 'BUTTON', radio: true, podeAvancar: false }), null);
  assert.equal(acaoDaTecla(tecla(' '), { ...base, tag: 'INPUT' }), null, 'no campo de texto o Espaço é para escrever');
  assert.equal(acaoDaTecla(tecla('r'), { ...base, tag: 'INPUT' }), null, 'digitar "r" no campo não repete áudio');
  assert.equal(acaoDaTecla(tecla('r'), { ...base, tag: 'TEXTAREA' }), null);
  assert.equal(acaoDaTecla(tecla('r'), { ...base, editavel: true }), null);
  assert.equal(acaoDaTecla(tecla('r'), { ...base, dentro: false }), null, 'fora da região da revisão nenhum atalho vale');
  for (const m of ['ctrlKey', 'altKey', 'metaKey']) assert.equal(acaoDaTecla(tecla('r', { [m]: true }), base), null);
  assert.equal(acaoDaTecla({ key: 'Enter', isComposing: true }, base), null, 'composição de texto (IME) não dispara');
  assert.equal(acaoDaTecla({ key: 'Enter', repeat: true }, base), null);
  assert.equal(acaoDaTecla(tecla('1'), base), null, 'números só valem com o painel de notas aberto');
  const notas: Contexto = { ...base, notasAbertas: true };
  assert.equal(acaoDaTecla(tecla('1'), notas), null, '"Errei" travado quando acertou de primeira');
  assert.deepEqual(acaoDaTecla(tecla('2'), notas), { tipo: 'nota', nota: 'hard' });
  assert.deepEqual(acaoDaTecla(tecla('3'), notas), { tipo: 'nota', nota: 'good' });
  assert.deepEqual(acaoDaTecla(tecla('4'), notas), { tipo: 'nota', nota: 'easy' });
  const errou: Contexto = { ...notas, notasLiberadas: ['again'] };
  assert.deepEqual(acaoDaTecla(tecla('1'), errou), { tipo: 'nota', nota: 'again' });
  for (const k of ['2', '3', '4']) assert.equal(acaoDaTecla(tecla(k), errou), null, `errou algo: só "Errei"; a tecla ${k} não registra`);
  assert.equal(acaoDaTecla(tecla('5'), notas), null);
  assert.equal(acaoDaTecla(tecla('Enter'), notas), null, 'com as notas abertas, Enter não avança por cima da escolha');
  ok('atalhos: só dentro da região, nunca ao digitar, 1–4 só com o painel aberto e respeitando a trava pedagógica');
}
// 12. paridade de rótulos: pt-BR "10 min / 6 d", en "10m / 6d"
{
  const casos: [string, string, string][] = [['10m', '10 min', '10m'], ['3h', '3 h', '3h'], ['6d', '6 d', '6d'], ['2mo', '2 meses', '2mo'], ['1mo', '1 mês', '1mo']];
  for (const [r, pt, en] of casos) { assert.equal(intervaloVisivel(r, 'pt-BR'), pt); assert.equal(intervaloVisivel(r, 'en'), en); }
  assert.equal(intervaloFalado('10m', 'pt-BR'), '10 minutos'); assert.equal(intervaloFalado('10m', 'en'), '10 minutes');
  assert.equal(intervaloFalado('1d', 'en'), '1 day'); assert.equal(intervaloFalado('6d', 'pt-BR'), '6 dias');
  ok('rótulos de intervalo: pt-BR "10 min"/"6 d", en "10m"/"6d", e a fala do leitor de tela nas duas línguas');
}
// 13. a regra de fusão é a mesma do servidor: fundir(a,b) e fundir(b,a) escolhem os mesmos vencedores
{
  const a = comErro(ponto(1), itensDe('p'), AGORA), b = { ...a, pratica: { ...a.pratica, em: new Date(AGORA + 5).toISOString() }, revisao: { ...a.revisao!, em: new Date(AGORA + 5).toISOString() } };
  const x = fundirRegistros([a], [b]).todos, y = fundirRegistros([b], [a]).todos;
  assert.equal(JSON.stringify(x), JSON.stringify(y)); assert.equal(x.length, 1); assert.equal(x[0].pratica.em, b.pratica.em);
  ok('fundir(a,b) = fundir(b,a): o aparelho e o servidor sempre escolhem o mesmo vencedor');
}
// 14. resumo: intervalo médio e proporção Bom + Fácil contra Errei, nas duas línguas
{
  const { somarEspera, mediaEspera, proporcaoAcerto, formatarEspera, SEM_ESPERAS } = await import('../src/lib/revisaoWeb/resumo');
  assert.equal(mediaEspera(SEM_ESPERAS), null);
  const e = somarEspera(somarEspera(SEM_ESPERAS, 2 * 86_400_000), 4 * 86_400_000);
  assert.equal(mediaEspera(e), 3 * 86_400_000); assert.equal(e.blocos, 2);
  assert.equal(somarEspera(SEM_ESPERAS, -5).somaMs, 0, 'relógio mexido não gera espera negativa');
  const zero = { again: 0, hard: 0, good: 0, easy: 0 };
  assert.equal(proporcaoAcerto(zero), null); assert.equal(proporcaoAcerto({ ...zero, hard: 3 }), null, 'só Difícil não tem razão');
  assert.deepEqual(proporcaoAcerto({ ...zero, good: 2, easy: 1, again: 1, hard: 5 }), { bons: 3, total: 4, porcento: 75 });
  assert.equal(proporcaoAcerto({ ...zero, again: 2 })!.porcento, 0);
  assert.equal(formatarEspera(10 * 60_000, 'pt-BR'), '10 minutos'); assert.equal(formatarEspera(10 * 60_000, 'en'), '10 minutes');
  assert.equal(formatarEspera(30_000, 'en'), '1 minute'); assert.equal(formatarEspera(3 * 3_600_000, 'pt-BR'), '3 horas');
  assert.equal(formatarEspera(86_400_000, 'en'), '24 hours'); assert.equal(formatarEspera(3 * 86_400_000, 'en'), '3 days'); assert.equal(formatarEspera(3 * 86_400_000, 'pt-BR'), '3 dias');
  ok('resumo: intervalo médio e Bom+Fácil contra Errei (Difícil fora da razão), sem divisão por zero, pt-BR e en');
}
console.log(`revisão Web: ${n} cenários verdes.`);
