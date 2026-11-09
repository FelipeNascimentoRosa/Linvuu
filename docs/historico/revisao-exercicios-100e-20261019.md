# Revisão de 100 exercícios — inglês

Base: c44917107a1658d57c3e54e633d6b75014403f36 (#299). Aulas 005 (1), 006 (34), 007 (29), 008 (31), 009 (5). Concluídas 100 explicações específicas e esclarecidos 47 enunciados. IDs e opções preservados; três respostas esperadas corrigidas.

Problemas funcionais: en-006-L-c01, en-008-L-c01 e en-008-L-c04 tinham comentários em português ou variantes entre parênteses dentro de respostaEsperada. Como o corretor atual compara uma única string normalizada, frases corretas eram rejeitadas. Mantido um modelo inglês no campo e observações na explicação, com enunciado coerente. Em en-007-L-106a, as opções já continham report, mas o enunciado acrescentava outro report após a lacuna; removida essa duplicação no enunciado.

Problemas pedagógicos: possessivos com referentes ambíguos; relações espaciais sem contexto suficiente; construção compacta kitchen door versus forma com of também gramatical; persons versus people; usos americanos/britânicos de preposição de rua; quantificadores e recipientes com múltiplas respostas possíveis. As instruções agora especificam a construção ou o sentido esperado. Alguns exercícios são prática guiada, não avaliação aberta de todas as variantes possíveis.

Sincronização: aulas e dias 020, 023/024, 027/028, 031/032 e 035. Validação profunda encontrou somente 200 alterações de explicação, 94 de enunciado e seis de respostaEsperada (duas cópias por exercício). 100 IDs únicos, exatamente duas ocorrências por ID, respostas de múltipla escolha presentes nas opções.

Teste funcional: código atual src/lib/correcaoExercicios.ts lido na base acima e executado com Node 24. Nos três casos, a rejeição anterior foi reproduzida, a resposta corrigida passou e uma resposta incorreta foi rejeitada. Sem alteração no corretor. Tentativa inicial com tsx CLI foi impedida pela criação de pipe IPC no ambiente; execução direta por Node concluiu os testes. Sem teste visual autenticado, sem segunda revisão humana independente.

Conferência: Cambridge English Grammar Today, https://dictionary.cambridge.org/grammar/british-grammar/possessive-pronouns , https://dictionary.cambridge.org/uk/grammar/british-grammar/possession , https://dictionary.cambridge.org/grammar/british-grammar/countable-and-uncountable-nouns .

Após incorporação sequencial dos lotes pendentes: 782 explicações incompletas (61 alemão, 721 inglês). Isso não representa aprovação integral do curso. Áudio, livros, pagamentos, layout e Android não alterados.
