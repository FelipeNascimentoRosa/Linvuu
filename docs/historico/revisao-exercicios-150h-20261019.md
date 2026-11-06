# Revisão de 150 exercícios — rascunho

Base: 6b1b80c579d8aeb9e565fdc72162d3cc85a1f432 (#302). Seleção de 150 IDs distintos ainda com explicações-placeholder: en-020-L-208a até en-031-L-c04. Distribuição por aula: {"020":9,"021":6,"022":37,"023":7,"024":7,"025":6,"026":31,"027":6,"028":6,"029":6,"030":25,"031":4}. Frases repetidas em aulas de revisão têm IDs próprios e são conferidas em cada ocorrência.

150 explicações específicas completadas; 72 enunciados esclarecidos; 13 respostas esperadas corrigidas. Nove respostas estavam truncadas: três ocorrências de used to play, uma de I'll call, uma de most important project in, duas de You must e duas de I saw. Quatro respostas continham alternativas/comentários em português no campo comparado: en-025-L-c01/c06 e en-027-L-c01/c04. CSVs documentam antes e depois. IDs, opções e gabaritos de múltipla escolha preservados.

Revisão linguística: passado simples/contínuo/perfeito, used to e be/get used to, formas futuras, comparativos/superlativos, quantificadores, modais e presente perfeito. Enunciados delimitam a construção pretendida onde outra resposta é gramatical: past perfect versus passado simples; farther/further; already/yet em perguntas; busiest/most busy; excesso com too versus intensidade; planos de viagem. Não se transforma preferência de enquadramento em proibição gramatical universal. Algumas instruções são prática guiada e o corretor continua baseado em respostas-modelo, não em equivalência semântica aberta.

Validação estrutural: 150 IDs únicos; exatamente duas cópias sincronizadas por ID em aulas e dias; gabaritos de múltipla escolha presentes nas opções. Comparação profunda limita alterações a explicacao (300 campos), enunciado (144) e respostaEsperada (26). Nenhuma mudança em áudio, livros, preços, layout ou Android.

Validação funcional: código de src/lib/correcaoExercicios.ts lido na base e executado via Node 24. Nos 13 casos, a frase-modelo completa era rejeitada antes, passou com a resposta corrigida e uma entrada incorreta continuou rejeitada. Isso comprova a comparação do corretor; não equivale a uma segunda revisão linguística independente. Sem teste visual autenticado e sem Android em aparelho.

Referências: Cambridge English Grammar Today, https://dictionary.cambridge.org/grammar/british-grammar/word-choice-used-to-and-be-used-to , https://dictionary.cambridge.org/us/grammar/british-grammar/farther-farthest-or-further-furthest , https://dictionary.cambridge.org/grammar/british-grammar/comparison-adjectives-bigger-biggest-more-interesting-most-interesting .

Após incorporação sequencial dos lotes pendentes: 432 explicações incompletas (61 alemão, 371 inglês). Essa é a contagem acumulada de placeholders; não representa aprovação integral do curso.

Publicação pausada por instrução do Felipe. Manter em rascunho, sem merge ou deploy. Dependência direta #302; sequência anterior #298 → #299 → #300 → #301 → #302. O merge será feito posteriormente em conjunto.
