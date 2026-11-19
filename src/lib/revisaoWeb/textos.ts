/** Textos da revisão espaçada no Web, na língua da interface (pt-BR no .com.br, en no .com). Nunca misturam as duas. */
import { LOCALE } from '../../i18n';
import type { Nota } from '../revisao/fsrsAdaptador';

type Cod = 'pt-BR' | 'en';
const UNIDADE: Record<Cod, Record<string, string>> = {
  'pt-BR': { m: 'minutos', h: 'horas', d: 'dias', mo: 'meses' },
  en: { m: 'minutes', h: 'hours', d: 'days', mo: 'months' },
};
/** "10m" → "10 min" (pt-BR) ou "10m" (en); "6d" → "6 d" ou "6d"; "3h" → "3 h" ou "3h"; "2mo" → "2 meses" ou "2mo". */
export function intervaloVisivel(rotulo: string, cod: Cod): string {
  const m = /^(\d+)(mo|m|h|d)$/.exec(rotulo);
  if (!m || cod === 'en') return rotulo;
  const n = Number(m[1]);
  return m[2] === 'm' ? `${n} min` : m[2] === 'mo' ? `${n} ${n === 1 ? 'mês' : 'meses'}` : `${n} ${m[2]}`;
}
/** Texto lido pelo leitor de tela: "10m" → "10 minutos". */
export function intervaloFalado(rotulo: string, cod: Cod): string {
  const m = /^(\d+)(mo|m|h|d)$/.exec(rotulo);
  if (!m) return rotulo;
  const n = Number(m[1]);
  const u = UNIDADE[cod][m[2]];
  return cod === 'pt-BR' && m[2] === 'mo' && n === 1 ? '1 mês' : cod === 'en' && n === 1 ? `1 ${u.replace(/s$/, '')}` : `${n} ${u}`;
}

const PT = {
  titulo: 'Revisão espaçada', descricao: 'Os blocos em que você errou voltam em intervalos que se ajustam ao quanto você lembra.',
  voltar: 'Voltar ao curso', vazio: 'Você ainda não tem blocos para rever. Os erros dos exercícios entram aqui automaticamente.',
  nada: 'Nada para rever agora.', proxima: (d: string) => `Próxima revisão: ${d}.`, comecar: 'Começar a revisão', blocos: (n: number) => (n === 1 ? '1 bloco para rever' : `${n} blocos para rever`),
  bloco: (k: number, n: number) => `Bloco ${k} de ${n}`, carregando: 'Abrindo o bloco…', semBloco: 'Este bloco mudou desde a sua prática e foi retirado da revisão.', pular: 'Seguir para o próximo',
  regiao: 'Revisão de um bloco de exercícios', rodada: 'Rodada', questao: 'Questão', de: 'de', ouvir: 'Ouvir', repetirAudio: 'Repetir áudio (tecla R)', confirmar: 'Conferir', seguir: 'Próxima questão', terminar: 'Terminar bloco',
  correta: 'Correto', incorreta: 'Incorreto', resposta: 'Resposta:', semExplicacao: '', concluidas: 'corretas', pecas: 'Toque nas peças na ordem certa', limpar: 'Limpar', escreva: 'Escreva a resposta',
  fimErros: 'Erros corrigidos', restam: (n: number) => (n === 1 ? 'Falta 1 questão para acertar.' : `Faltam ${n} questões para acertar.`), repetir: (n: number) => `Repetir as que errei (${n})`,
  voltaEm: (r: string) => `Este bloco volta em ${r}.`, proximoBloco: 'Próximo bloco', verResumo: 'Ver resumo',
  notaTitulo: 'Como foi lembrar?', nomes: { again: 'Errei', hard: 'Difícil', good: 'Bom', easy: 'Fácil' } as Record<Nota, string>,
  notaErrou: 'Você errou ou precisou repetir nesta volta. Só «Errei» registra isso; o bloco volta em breve para você reforçar.',
  notaAcertou: 'Você acertou tudo de primeira. Diga o quanto custou lembrar: o intervalo muda com a sua escolha.',
  notaVolta: (r: string) => `volta em ${r}`, notaOk: (r: string) => `Registrado. Este bloco volta em ${r}.`, atalhos: 'Atalhos: Enter ou Espaço avançam, R repete o áudio, 1 a 4 escolhem a nota (Errei, Difícil, Bom, Fácil).',
  resumoTitulo: 'Revisão concluída', resumoBlocos: (n: number) => (n === 1 ? '1 bloco revisado' : `${n} blocos revisados`), resumoDesempenho: 'Desempenho',
  desempenho: { correcao: 'Erros corrigidos', again: 'Errei', hard: 'Difícil', good: 'Bom', easy: 'Fácil' } as Record<string, string>, resumoProxima: (d: string) => `Próxima revisão: ${d}`, resumoSem: 'Nenhuma revisão futura agendada.',
  cartaoHoje: (n: number) => (n === 1 ? '1 bloco para rever hoje' : `${n} blocos para rever hoje`), cartaoTexto: 'Revisar na hora certa fixa mais do que reler. Leva poucos minutos.', cartaoAcao: 'Rever agora', cartaoProxima: (d: string) => `Próxima revisão: ${d}`, cartaoRegiao: 'Revisão espaçada',
  falhaSalvar: 'Não foi possível salvar neste aparelho. Tente de novo.', erroCarregar: 'Não foi possível abrir este bloco. Tente de novo.', tentar: 'Tentar de novo',
};
const EN: typeof PT = {
  titulo: 'Spaced review', descricao: 'Blocks where you made mistakes come back at intervals adjusted to how well you remember.',
  voltar: 'Back to the course', vazio: 'You have no blocks to review yet. Mistakes from your exercises show up here automatically.',
  nada: 'Nothing to review right now.', proxima: (d) => `Next review: ${d}.`, comecar: 'Start review', blocos: (n) => (n === 1 ? '1 block to review' : `${n} blocks to review`),
  bloco: (k, n) => `Block ${k} of ${n}`, carregando: 'Opening the block…', semBloco: 'This block changed since you practised it and was removed from review.', pular: 'Go to the next one',
  regiao: 'Review of an exercise block', rodada: 'Round', questao: 'Question', de: 'of', ouvir: 'Listen', repetirAudio: 'Repeat audio (R key)', confirmar: 'Check', seguir: 'Next question', terminar: 'Finish block',
  correta: 'Correct', incorreta: 'Incorrect', resposta: 'Answer:', semExplicacao: '', concluidas: 'correct', pecas: 'Tap the pieces in the right order', limpar: 'Clear', escreva: 'Type the answer',
  fimErros: 'Mistakes fixed', restam: (n) => (n === 1 ? '1 question left to get right.' : `${n} questions left to get right.`), repetir: (n) => `Repeat the ones I missed (${n})`,
  voltaEm: (r) => `This block comes back in ${r}.`, proximoBloco: 'Next block', verResumo: 'See summary',
  notaTitulo: 'How did it feel to recall?', nomes: { again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' },
  notaErrou: 'You missed something or had to repeat in this round. Only “Again” records that; the block comes back soon so you can reinforce it.',
  notaAcertou: 'You got everything right the first time. Say how much effort it took: the interval changes with your choice.',
  notaVolta: (r) => `back in ${r}`, notaOk: (r) => `Saved. This block comes back in ${r}.`, atalhos: 'Shortcuts: Enter or Space move on, R repeats the audio, 1 to 4 pick the rating (Again, Hard, Good, Easy).',
  resumoTitulo: 'Review complete', resumoBlocos: (n) => (n === 1 ? '1 block reviewed' : `${n} blocks reviewed`), resumoDesempenho: 'Performance',
  desempenho: { correcao: 'Mistakes fixed', again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' }, resumoProxima: (d) => `Next review: ${d}`, resumoSem: 'No future review scheduled.',
  cartaoHoje: (n) => (n === 1 ? '1 block to review today' : `${n} blocks to review today`), cartaoTexto: 'Reviewing at the right time makes things stick better than rereading. It takes a few minutes.', cartaoAcao: 'Review now', cartaoProxima: (d) => `Next review: ${d}`, cartaoRegiao: 'Spaced review',
  falhaSalvar: 'Could not save on this device. Try again.', erroCarregar: 'Could not open this block. Try again.', tentar: 'Try again',
};
export const textosRevisao = () => (LOCALE.codigo === 'en' ? EN : PT);
export const codigoRevisao = (): Cod => (LOCALE.codigo === 'en' ? 'en' : 'pt-BR');
/** Data e hora da próxima revisão no formato da língua da interface. */
export const quandoRevisao = (iso: string): string => new Date(iso).toLocaleString(codigoRevisao(), { dateStyle: 'medium', timeStyle: 'short' });
