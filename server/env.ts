// Este módulo existe por um motivo só: ordem de carregamento.
//
// Vários módulos do servidor leem process.env no topo do arquivo, fora de função:
// server/billing.ts (`chave` do Stripe) e server/firebase-admin.ts (`projetoFirebase`).
// Em ESM o módulo importado é avaliado ANTES do corpo de quem o importa, então um
// `dotenv.config()` escrito no corpo do server.ts sempre chega tarde demais: aquelas
// leituras acontecem primeiro e capturam undefined quando o valor só existe no .env.
// O sintoma era login funcionando no navegador e rotas do servidor respondendo
// 401/503 como se não houvesse configuração — apenas em desenvolvimento local.
// Na hospedagem anterior o defeito não aparecia porque as variáveis já estão no ambiente do
// processo antes de qualquer import.
//
// A correção é este arquivo ser o PRIMEIRO import do server.ts. Não acrescente
// outros imports aqui: ele precisa continuar sendo um único efeito, imediato.
import 'dotenv/config';
