// Texto da retomada. Só afirma o que o aluno marcou: sessão marcada não prova domínio,
// e não há sequência de dias, nível concluído nem promessa de resultado.
export interface TextoRetomada { frase: string; contagem: string }

export function textoRetomada(feitos: number, total: number): TextoRetomada {
  const n = Math.max(0, Math.min(feitos, total));
  if (n === 0) return { frase: 'Vamos começar pela primeira sessão, no seu ritmo.', contagem: 'Nenhuma sessão marcada ainda' };
  const contagem = `${n} de ${total} ${n === 1 ? 'sessão marcada' : 'sessões marcadas'}`;
  if (n >= total) return { frase: 'Você marcou todas as sessões deste curso. Revisar o que quiser é sempre uma boa ideia.', contagem };
  return { frase: 'Que bom ter você de volta. Seu próximo passo está aqui.', contagem };
}
