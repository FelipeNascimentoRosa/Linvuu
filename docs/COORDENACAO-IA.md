# Coordenação entre Felipe, Claude, ChatGPT/Codex, Cursor e Antigravity
## Ponto de entrada por ferramenta
- **Todas:** `AGENTS.md` é a fonte comum.
- **Claude:** `CLAUDE.md`.
- **ChatGPT/Codex:** `AGENTS.md`.
- **Cursor:** `.cursor/rules/linvuu.mdc` (regra de projeto, aplicada sempre).
- **Google Antigravity:** `GEMINI.md` (regra reconhecida no workspace).
- Os arquivos específicos apenas encaminham às regras compartilhadas; não criam políticas alternativas.

## Fonte comum
O GitHub registra código, decisões e evidências. As conversas ajudam a formular tarefas, mas não sincronizam automaticamente entre assistentes. Um arquivo também não se mantém atualizado sozinho: cada agente deve atualizar este registro no mesmo PR da mudança.
Prioridade: instrução atual explícita do Felipe → instruções aplicáveis → código/configuração e evidência atual → documentos históricos. Quando código e produção divergem, registre ambos.

## Início de cada tarefa
1. Ler AGENTS.md, ESTADO-ATUAL.md e documento do assunto.
2. Identificar SHA da main, SHA do deploy e PRs abertos. Não presumir que são iguais.
3. Conferir se outro PR toca os mesmos arquivos. Uma tarefa por branch e por agente; coordenação pelo registro do PR, sem sobrescrever commits. Nunca usar a mesma branch de escrita simultaneamente em Claude, ChatGPT/Codex, Cursor e Antigravity.
4. Reproduzir o problema. Registrar URL/caminho, entrada, esperado e observado, sem dados pessoais.
5. Corrigir a causa e executar teste relevante; não mudar regras de negócio por conveniência.
6. Atualizar estado, limitações, resultado dos checks, plano de reversão e verificações pendentes.
7. Fazer merge apenas com verificações aplicáveis aprovadas. Confirmar deploy e respostas públicas antes de declarar produção corrigida.

## Formato obrigatório de passagem
- Objetivo e escopo:
- Autor/agente e branch/PR:
- SHA base e SHA final:
- Arquivos e decisões:
- Evidência do problema:
- Testes executados e resultado:
- Não testado / bloqueios:
- Merge e deploy (separados):
- Verificação em produção e horário:
- Próxima ação e critério de conclusão:

## Critérios que evitam falsos positivos
- Uma página abrir não demonstra autorização correta.
- Um 200 em /readyz não demonstra igualdade entre regras publicadas e firestore.rules.
- Sitemap aceito não significa URLs indexadas.
- “Detectada, mas não indexada” sem rastreamento não prova falha de cache.
- Requests por .php não provam execução PHP nem vazamento.
- Uma conexão marcada ACTIVE não prova escopo nem credencial válida.
- CI sem steps não prova erro do código; consultar annotations e cobrança/quotas sem contornar os gates.
- Purga da CDN não apaga cache já armazenado no navegador.
- Não salvar chaves, cabeçalhos Authorization, URLs assinadas ou exportações de usuários no registro.

## Estado operacional auditado em 27/10/2026
- O workflow de auditoria **legado** do repositório público principal está aposentado; nunca reativar a coleta IAM detalhada nesse repositório.
- A validação OIDC **não sensível** no repositório separado [Linvuu-Auditoria-Firebase](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase/actions/runs/40460208259) passou; somente o **número do projeto** foi conferido. Regras publicadas não foram lidas.
- Ambos os repositórios estão **públicos** nesta verificação. Se houver coleta de IAM ou regras detalhadas, executar apenas em destino privado, com controle de acesso aos relatórios. Não confundir permissões temporárias de um runner com acesso administrativo da sessão de ChatGPT/Claude.
- A CI e Segurança do produto passaram na main `3431e440`; o Render publicou esse SHA. A execução `success` de build/APK web não comprova testes em aparelho nem pagamento real.
- PRs de protótipo #360 e #367 continuam `draft`. PR #347 de dependências ainda está aberto. Não fechar/mergear apenas para ocultar indicadores.
- Monitoramento com execução passada `failure` e posterior `success` permanece como sinal diagnóstico; não apagar falhas nem desativar testes silenciosamente.

## Prompt comum de retomada
“Leia AGENTS.md, docs/ESTADO-ATUAL.md e docs/COORDENACAO-IA.md em FelipeNascimentoRosa/Linvuu. Confira main, PRs e deploy atuais. Continue a primeira pendência reproduzível da auditoria, registre evidências e atualize o estado no PR. Não considere correção concluída antes da verificação correspondente.”
