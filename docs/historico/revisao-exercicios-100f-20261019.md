# Revisão de mais 100 exercícios — aguardando publicação

Base: dc834a0d4031e1f3183906908042a70d76d01144 (#300). IDs distintos dos lotes anteriores. Distribuição por aula: {"009":19,"010":6,"011":6,"012":6,"013":36,"014":6,"015":6,"016":15}. Algumas frases reaparecem em aulas de revisão acumulada com IDs próprios; todas essas ocorrências precisam de explicação.

100 explicações-placeholder substituídas, 36 enunciados esclarecidos. Quatro respostas esperadas corrigidas: en-009-L-c03 e en-010-L-c03 estavam truncadas em You must; en-015-L-c01 e en-015-L-c04 continham observações/variantes em português. CSVs registram antes e depois. IDs, opções e gabaritos de múltipla escolha preservados.

Conferência: obrigação e conselho com modais; infinitivo e -ing; pronomes pessoais, reflexivos e recíprocos; datas e presente simples; possessivos e quantificação; presente contínuo e verbos de estado. Distinguido stop drinking de stop to drink e try restarting de try to restart. Enunciados especificam formas esperadas e referentes quando havia alternativas gramaticais. Prática guiada não significa que o corretor aceite toda paráfrase válida.

Validação: 100 IDs únicos, exatamente duas cópias sincronizadas por ID em aulas e dias; comparação profunda encontra apenas explicacao (200 campos), enunciado (72) e respostaEsperada (8). Nos quatro casos de resposta corrigida, teste usando o código atual de src/lib/correcaoExercicios.ts executado com Node 24 reproduziu a rejeição anterior, aceitou a frase corrigida e rejeitou uma resposta incorreta. Não houve teste visual autenticado nem segunda revisão humana independente.

Referências: Cambridge English Grammar Today, https://dictionary.cambridge.org/grammar/british-grammar/stop-ing-form-or-to- , https://dictionary.cambridge.org/grammar/british-grammar/word-patterns-must , https://dictionaryblog.cambridge.org/2024/03/06/avoiding-common-mistakes-with-verb-patterns-2/ .

Após incorporar os lotes pendentes, restarão 682 explicações incompletas (61 alemão, 621 inglês). Não representa aprovação integral do curso. Sem mudança de áudio, livros, pagamentos, layout ou Android.

Por solicitação do Felipe: manter este lote em rascunho; não fazer merge nem deploy agora. Retomar publicação somente após nova orientação. Ordem das dependências: #298 → #299 → #300 → este lote.
