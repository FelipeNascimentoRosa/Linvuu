// Avaliações de alunos: regras e funções puras, usadas pelo servidor (gravação e SEO) e pelo navegador (exibição).
// Nada aqui depende de Node nem do navegador.
export type DominioAvaliacao = 'br' | 'global';
export type Relacao = 'nenhuma' | 'conhece-professor';

export const NOTA_MIN = 1;
export const NOTA_MAX = 5;
export const TEXTO_MIN = 20;
export const TEXTO_MAX = 600;
export const NOME_MIN = 2;
export const NOME_MAX = 60;
/** Quantas sessões (dias de aula) o aluno precisa ter concluído com a conta aberta para avaliar. */
export const AULAS_MIN = 2;
/** Só com este número de avaliações aprovadas de pessoas sem relação com o professor o Google recebe `aggregateRating`. */
export const MIN_PARA_NOTA_AGREGADA = 5;
export const MAX_REVIEWS_NO_SCHEMA = 10;

export interface NovaAvaliacao { nota: number; texto: string; nome: string; relacao: Relacao }
export interface AvaliacaoPublica { nome: string; nota: number; texto: string; relacao: Relacao; aulas: number; em: string }

const CAMPOS = ['nota', 'texto', 'nome', 'relacao', 'aceite', 'ref_extra_av'];

/** Valida o corpo do formulário. Devolve null se algo estiver fora do contrato (tipo, tamanho, campo extra, sem aceite). */
export function validarAvaliacao(corpo: unknown): NovaAvaliacao | null {
  const b = corpo as Record<string, unknown> | null;
  if (!b || typeof b !== 'object' || Array.isArray(b)) return null;
  if (Object.keys(b).some((k) => !CAMPOS.includes(k))) return null;
  if (typeof b.nota !== 'number' || !Number.isInteger(b.nota) || b.nota < NOTA_MIN || b.nota > NOTA_MAX) return null;
  if (typeof b.texto !== 'string' || typeof b.nome !== 'string') return null;
  const texto = b.texto.replace(/\s+/g, ' ').trim();
  const nome = b.nome.replace(/\s+/g, ' ').trim();
  if (texto.length < TEXTO_MIN || texto.length > TEXTO_MAX) return null;
  if (nome.length < NOME_MIN || nome.length > NOME_MAX) return null;
  if (/https?:\/\/|www\.|@/i.test(texto) || /https?:\/\/|www\.|@/i.test(nome)) return null; // sem links nem e-mails (spam)
  if (b.relacao !== 'nenhuma' && b.relacao !== 'conhece-professor') return null;
  if (b.aceite !== true) return null; // consentimento explícito para mostrar nome e texto
  return { nota: b.nota, texto, nome, relacao: b.relacao };
}

/** Média e contagem só das avaliações de quem NÃO tem relação com o professor (as demais aparecem, mas não entram na nota). */
export function resumo(lista: AvaliacaoPublica[]): { total: number; media: number | null; contadas: number } {
  const contadas = lista.filter((a) => a.relacao === 'nenhuma');
  const soma = contadas.reduce((s, a) => s + a.nota, 0);
  return { total: lista.length, contadas: contadas.length, media: contadas.length ? Math.round((soma / contadas.length) * 10) / 10 : null };
}

/** Trecho do Product (JSON-LD). Só avaliações aprovadas e visíveis na página; `aggregateRating` só a partir de MIN_PARA_NOTA_AGREGADA. */
export function trechoSchema(lista: AvaliacaoPublica[]): Record<string, unknown> {
  const contadas = lista.filter((a) => a.relacao === 'nenhuma');
  if (!contadas.length) return {};
  const r = resumo(lista);
  const out: Record<string, unknown> = {
    review: contadas.slice(0, MAX_REVIEWS_NO_SCHEMA).map((a) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: a.nome },
      datePublished: a.em,
      reviewBody: a.texto,
      reviewRating: { '@type': 'Rating', ratingValue: a.nota, bestRating: NOTA_MAX, worstRating: NOTA_MIN },
    })),
  };
  if (r.contadas >= MIN_PARA_NOTA_AGREGADA && r.media !== null) out.aggregateRating = { '@type': 'AggregateRating', ratingValue: r.media, reviewCount: r.contadas, bestRating: NOTA_MAX, worstRating: NOTA_MIN };
  return out;
}

/** Avaliações aprovadas por domínio. O servidor preenche (server/avaliacoes.ts); vazio no build estático. */
export const aprovadasPorDominio: Record<DominioAvaliacao, AvaliacaoPublica[]> = { br: [], global: [] };
