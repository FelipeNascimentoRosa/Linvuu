# Revisão de 150 exercícios — rascunho

Base: 06ab91fcd3b753b7ec291ce21715dd7daf701e71 (#303). Seleção sem repetir IDs anteriores: en-031-L-c05 até en-041-L-c06. Distribuição por aula: {"031":2,"032":34,"033":6,"034":21,"035":7,"036":35,"039":7,"040":7,"041":31}. Frases reaparecem em aulas de revisão com IDs próprios; cada ocorrência selecionada foi conferida.

150 explicações-placeholder substituídas por comentários específicos. 89 enunciados esclarecidos. 13 respostas esperadas corrigidas: quatro truncadas (en-032-L-c05, en-033-L-c01, en-039-L-c05, en-040-L-c07) e nove com variantes/comentários misturados ao campo comparado. Foram retirados também os comentários de variantes que apareciam literalmente em enunciados de en-032. IDs, opções e gabaritos de múltipla escolha preservados.

Conferência linguística: perfeito simples/contínuo, estado/duração, for/since, phrasal verbs separáveis e preposicionais, condição real/hipotética/contrafactual, orações temporais, wish/hope e precaução com in case. Casos com outra leitura gramatical recebem instrução explícita: total concluído de relatórios/xícaras versus atividade em andamento; in case versus if; zero conditional versus previsão; were formal versus was informal; gotten americano versus got britânico. Não se ensina que variantes válidas sejam universalmente erradas. Parte das questões é prática guiada; o corretor continua baseado em modelos e não aceita semanticamente toda paráfrase válida.

Validação estrutural: 150 IDs únicos, exatamente duas ocorrências sincronizadas por ID em aula/dia; gabaritos presentes nas opções. Comparação profunda limita alterações a explicacao (300 campos), enunciado (178) e respostaEsperada (26). Fontes em nove aulas e 13 dias derivados. Sem alteração de áudio, livros, pagamento, layout ou Android.

Validação funcional: código atual src/lib/correcaoExercicios.ts lido na base e executado via Node 24. Nos 13 casos, o novo modelo era rejeitado pelo campo antigo; após a correção é aceito, e uma entrada incorreta continua rejeitada. Esses testes demonstram o comportamento do corretor, não uma revisão linguística independente. Sem teste visual autenticado, sem segunda revisão humana e sem afirmação de aprovação integral do curso.

Referências: Cambridge English Grammar Today, https://dictionary.cambridge.org/grammar/british-grammar/present-perfect-continuous , https://dictionary.cambridge.org/us/grammar/british-grammar/conditionals-if , https://dictionary.cambridge.org/uk/grammar/british-grammar/verbs-phrasal-verbs .

Após incorporação sequencial dos lotes preparados: restarão 282 explicações incompletas (61 alemão, 221 inglês), conforme inventário acumulado. Isso não equivale a nova auditoria de todo o conteúdo do repositório.

Publicação pausada por instrução do Felipe. Manter em rascunho, sem merge nem deploy. Dependência direta #303; o merge será feito posteriormente em conjunto, respeitando as dependências anteriores.
