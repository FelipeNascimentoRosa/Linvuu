# Consolidação de 950 exercícios para publicação

Autorização do Felipe em 19/10/2026: preparar mais 150 e publicar para evitar acúmulo. Reúne os lotes dos PRs #298, #299, #300, #301, #302, #303 e #304, mais o lote 150j. São 950 IDs distintos confirmados nos oito CSVs; nenhum ID foi repetido entre lotes. Relatórios individuais preservados.

Base de produção conferida: main 0df704553a592ad6494c9d9c99652c97242c67e5. Sua árvore e a do head original do #297 são idênticas (e6afea83d032d3f708165c2af786f23f215d4958). Portanto, a árvore acumulada do #304 mais o novo lote pode ser aplicada em um único commit filho de main, sem perder alterações externas. Revalidar main antes do merge se houver nova alteração concorrente.

O #298 tinha auditoria de dependências cancelada; os outros checks do #298 e todos os checks consultados de #299 a #304 passaram. A consolidação tem suas próprias checagens sobre o conjunto completo, incluindo auditoria de dependências. Não desabilitar nem pular checks. Merge apenas após sucesso de build, dependências e gitleaks. Uma única publicação evita sete deploys intermediários.

Depois do merge, verificar o commit e término do deploy no Render, logs e respostas HTTP sem cache. Encerrar PRs anteriores como substituídos somente após confirmação da publicação, preservando branches e relatórios. PR #263 permanece fora da consolidação.

Escopo: explicações, enunciados, respostas esperadas documentadas e relatórios. Sem alterações em pagamentos, áudio, layout, regras de acesso ou Android. Limites: os testes funcionais não substituem revisão linguística independente ou teste visual autenticado. A contagem final de 132 é a do inventário acumulado de placeholders.
