# Pendências para apagar ou corrigir

Inventário de 15/11/2026. Esta pasta registra evidência e decisão pendente; não muda rotas, não desativa workflows e não remove dados de alunos.

| Item | Evidência | Próximo passo |
| --- | --- | --- |
| PR #606: auditoria de dependências vermelha | [Execução 43382835632](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/43382835632). `npm audit` reportou zero vulnerabilidades naquela execução; a validação de assinatura falhou com `EMISSINGSIGNATUREKEY` em `stripe@23.1.0`. | Reexecutar o mesmo check antes de decidir o destino do PR. Não remover o check de segurança. |
| Execuções antigas vermelhas da home | [CI 43661151488](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/43661151488) e [visual 43661838788](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/43661838788). Execuções de commits antigos; o PR #615 passou nos checks da revisão entregue. | Manter como histórico de diagnóstico; não confundir com falha aberta em main. |
| Falhas antigas de segurança e Dependabot em main | Exemplos: [Segurança 42466621998](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/42466621998) e [Dependabot 41980943088](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/41980943088). | Conferir recorrência em uma execução atual antes de propor exclusão ou mudança de política. |
| Permissões das Actions | API do GitHub: Actions habilitadas com lista selecionada de ações; token padrão de leitura; workflows não podem aprovar PRs. A consulta da branch retornou `protected: false`; a consulta detalhada a rulesets retornou 403 por plano/visibilidade. | Identificar a regra, o aplicativo ou o colaborador específico antes de mudar permissões. Nenhuma dessas respostas atribui uma regra a um agente. |
| Materiais sem versão inglesa ou sem arte própria | Os guias gratuitos e livros em português continuam no .com.br. No .com, o menu oferece prática gratuita na home. O cartão de português do Brasil usa fundo neutro porque a biblioteca do catálogo não tem uma imagem correspondente. | Incluir materiais e arte próprios quando existirem versões revisadas. |

Varredura pública antes da entrega: os **55 endereços do sitemap de linvuu.com.br** e os **26 de linvuu.com** responderam HTTP 200, com idioma e URL canônica coerentes. Essa varredura não testa dados privados, checkout nem conteúdo de todos os links fora dos sitemaps.

O Vuu foi removido da árvore ativa, junto com o componente de rabiscos da home que não tinha mais uso. O progresso dos alunos é preservado; apenas o bloco de retomada deixou de aparecer nas duas homes.
