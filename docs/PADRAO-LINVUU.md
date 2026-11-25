# Padrão Linvuu

O que todo curso da Linvuu (russo, alemão, inglês, espanhol, francês e, depois, português) precisa cumprir. Serve de régua para escrever e para revisar.

## 1. Estrutura
- 1 aula = 4 sessões de 30 minutos (a soma dos blocos de cada sessão dá exatamente 30).
- Níveis: A1, A2 e B1, cada um fechado por **revisão e simulado original** e por **certificado de conclusão do nível** (da Linvuu, não oficial, com essa frase escrita nele).
- Cada sessão tem: revisão do que veio antes, vocabulário com áudio, uma explicação, prática e produção (falar ou escrever). A revisão aparece no fim da sessão.

## 2. Como se explica
- Explicação em passos numerados («PASSO 1: …»), antes de qualquer termo técnico.
- Sempre um quadro «como é em português» (`comparacao`) e uma lista de **erros típicos de brasileiros** (errado, certo, motivo).
- Regras úteis, nada de lista de exceções antes da hora. Cada regra com exemplos prontos.
- Exemplos e textos são originais. Livros servem para conferir fatos, nunca para copiar.

## 3. Como se pratica
- Todo texto no idioma alvo tem áudio. Exercícios de ouvir, ditado, lacuna, ordenar e produção livre em toda aula.
- Resposta nunca é só certo ou errado: cada exercício tem explicação.
- O progresso mostrado ao aluno vem do que ele acertou e errou, por tópico. Sem pontos de experiência e sem sequência.

## 4. Verificações automáticas antes de publicar
- `node scripts/conteudo.mjs --check` e `npm run build` passam.
- Toda ordenação reconstrói a resposta; toda resposta certa está nas opções; sem opções repetidas.
- Sem palavras com alfabetos misturados; sessões com 30 minutos.
- Revisão por falante nativo e por professor antes de divulgar um nível.

## 5. Língua da explicação (preparado para o futuro)
Hoje a explicação é em português do Brasil. No futuro o aluno escolherá a língua materna e a explicação virá nela. Por isso:
- o texto do idioma que se aprende fica separado do texto da explicação em todos os blocos (campos `ru` = idioma alvo e `pt` = explicação; o nome do campo é histórico, não significa que seja russo);
- nenhuma regra pode depender de um trocadilho que só funciona em português;
- traduzir a explicação não deve exigir mexer no idioma alvo nem nos áudios.

## 6. Como não perder o trabalho
- O código e todo o conteúdo ficam no GitHub (repositório `Linvuu`); a `main` só recebe alterações por pull request com CI verde.
- Cópia fora do GitHub: fazer periodicamente `git clone --mirror` do repositório e guardar o resultado em outro lugar (um disco externo e um serviço de nuvem). Os áudios fazem parte do repositório.
- Conta: verificação em duas etapas no GitHub, Render, Google e Registro.br; chaves de acesso do tipo «fine-grained», por repositório, com validade; nenhuma chave em texto de conversa ou de documento.
- Variáveis secretas (Stripe, Firebase, Gemini) só na Vercel e no GitHub Secrets, nunca no código.
