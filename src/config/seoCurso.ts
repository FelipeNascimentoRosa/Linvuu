// Descrição de busca de cada curso, quando a descrição do curso — que também é o texto visível da página,
// o `<p className="lead">` — sai da faixa que o Google mostra, cerca de 155 caracteres.
// Só a `<meta name="description">` muda; o texto que a pessoa lê continua vindo de `curso.descricao`.
// Fica neste arquivo, e não em `src/lib/metaRota.ts`, porque o navegador também lê (`Curso.tsx`): o metaRota
// importa `node:fs` e não pode entrar no pacote do cliente. Servidor e cliente leem daqui para o `<head>`
// servido e o reidratado não divergirem (`scripts/testar-paridade-meta.mjs`).
// Medição de 10/11/2026 no HTML de linvuu.com.br: `/curso/ru` servia 223 caracteres — o Google cortava a
// descrição da página que precisa ganhar «curso de russo».
export const DESC_SEO_CURSO: Partial<Record<string, Partial<Record<'pt-BR' | 'en', string>>>> = {
  ru: {
    'pt-BR': 'Curso de russo online do zero ao B1, explicado em português: alfabeto cirílico, os seis casos com exemplos, diálogos com áudio e simulados em cada nível.',
  },
};
