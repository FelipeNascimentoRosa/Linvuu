import { dicionario } from '../i18n';
import type { CodigoLocale } from '../i18n/locales';
import { precosDo } from '../config/planos';

export type GrupoPergunta = { titulo: string; nivel?: string; dias: [number, number] };

/** As mesmas perguntas alimentam o conteúdo visível e o JSON-LD do servidor. */
export function gerarPerguntasCurso(id: string, locale: CodigoLocale, grupos: GrupoPergunta[]) {
  if (!grupos.length) return [];
  const q = dicionario(locale).cursoPagina.perguntas;
  const sessoes = grupos[grupos.length - 1].dias[1];
  const preco = precosDo(locale);
  return [
    { pergunta: q.precoP, resposta: q.precoR(preco.mensal, preco.anual) },
    { pergunta: q.prazoP, resposta: q.prazoR(grupos.length, sessoes, Math.round(sessoes * 30 / 60), Math.round(sessoes / 30), grupos.some((g) => g.nivel === 'zero')) },
    { pergunta: q.professorP, resposta: id === 'ru' ? q.professorRu : q.professorOutro, link: id === 'ru' ? q.professorRuLink : undefined },
    { pergunta: q.iniciante, resposta: q.inicianteR(grupos[0].titulo) },
  ];
}
