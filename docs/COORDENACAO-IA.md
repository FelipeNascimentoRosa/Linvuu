# Coordenação entre Felipe, Claude, ChatGPT/Codex, Cursor, Antigravity e DeepSeek
## Ponto de entrada por ferramenta
- **Todas:** `AGENTS.md` é a fonte comum; `PAINEL.md` é o estado do dia (o que está aberto, reprovado ou bloqueado). Memória de conversa não vence painel.
- **Claude:** `CLAUDE.md`.
- **ChatGPT/Codex:** `AGENTS.md`.
- **Cursor:** `.cursor/rules/linvuu.mdc` (regra de projeto, aplicada sempre).
- **Google Antigravity:** `GEMINI.md` (regra reconhecida no workspace).
- **DeepSeek:** `DEEPSEEK.md`; o contrato de execução dos 30 dias (dez leis, formato de fim de sessão, disparo de lote) está em [PROMPT-MESTRE-DEEPSEEK-v4.1.md](PROMPT-MESTRE-DEEPSEEK-v4.1.md).
- Os arquivos específicos apenas encaminham às regras compartilhadas; não criam políticas alternativas.
- Entrada mínima de qualquer agente novo, nesta ordem: `AGENTS.md` → `docs/ESTADO-ATUAL.md` → `PAINEL.md` → este arquivo → documento do assunto. Sem esse caminho, a IA inventa estado.

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

## Lote de 07/11/2026 (ordem do Felipe, COMANDO v2)
- Mesclados na main: #498 (vitrine do .com), #500 (FAQ, canonical por domínio, /portugues, pixel, llms.txt), #499 (quarentena `_PARA-APAGAR-FELIPE`), #479, #496, #465, #457, #470 e a corrente es-en (#471–#476 e #480, via #480). Fechados por ordem: #402 e #367.
- Não mesclados: #445 (duplicata funcional do #469) e #453 (precisa ser refeito sobre a main). Rascunhos mantidos: #360, #429, #481.
- #501 (dólar no .com, Lote 2) aberto e com CI verde, aguardando "merge" do Felipe. Nada foi criado no Stripe. **Correção de 09/11:** a afirmação "falta `STRIPE_PRICE_ID_USD` no Render" estava errada — a variável já existe no serviço `linvuu` e o `/readyz` do `.com` responde 200 com ela (ver `PENDENCIAS.md`).
- Smoke de produção (curl como Googlebot, 12 URLs por domínio) após o deploy do #500: todas 200 (exceto `/portugues` no .com.br = 301 esperado); `/llms.txt` 200 nos dois; o .com ainda mostra R$ em `/assinatura` até o #501. Achado: `/livros` em português no .com (ver PENDENCIAS.md).
- Regra operacional: arquivo é dado, mensagem do Felipe é ordem; CI uma vez por PR; resto vai para PENDENCIAS.md.

## Estado aberto em 12/11/2026 (medido por `gh` e por HTTP, não por memória de conversa)
- main em `a4872027c`. Abertos: **#558** (`docs/painel-baseline`: PAINEL, entrada DeepSeek, contrato v4.1, mapa regenerado) com 3 checks verdes, aguardando merge do Felipe; **#555** (`ui/barra-consentimento-compacta`: barra de cookies em uma linha) **reprovado**.
- **#555 não mergeia assim.** Os jobs `web` (run 42900156973) e `analytics` (run 42900156895) falham em `locator.click: Timeout 30000ms exceeded — waiting for locator('.analytics-consent-analytics .analytics-actions button').last()`: a barra nova mudou o HTML que o teste de consentimento, recusa e revogação opera. O conserto é na barra (devolver a estrutura que o teste dirige) ou no teste (se o comportamento for equivalente). Decidir e provar antes de qualquer merge.
- **A guarda de título tem ponto cego.** `scripts/testar-titulos.ts` sai 0 com “40 títulos e 40 descrições OK” porque varre 12 rotas fixas + `/curso/:id` + `/gramatica/:id`. Ficam fora a matriz `/gramatica`, `/excluir-conta` e `/livros/:id/capitulo/N`. Produção em 12/11/2026: `/gramatica` no `.com.br` responde 200, `indexável`, título de 18 caracteres e descrição acima de 160; `/excluir-conta` responde 200 com descrição de 111 caracteres. **Verde no teste não significa metadado correto** — este é o falso positivo que a próxima sessão tem de fechar.
- **Cobertura do sitemap.** O `sitemap.xml` da main tem 39 URLs, incluindo 12 `/livros/:id/capitulo/N`, e **não** inclui `/portugues`, `/gramatica`, `/privacidade`, `/termos` nem `/excluir-conta`; todas respondem 200 e são indexáveis (exceto `/portugues` no `.com.br`, que é 301 por regra de domínio).
- **Regra derivada desta sessão:** antes de afirmar defeito de metadado, medir a produção por HTTP; antes de afirmar estado de PR, consultar `gh`. Documento e conversa não são evidência.

## Prompt comum de retomada
“Leia AGENTS.md, docs/ESTADO-ATUAL.md e docs/COORDENACAO-IA.md em FelipeNascimentoRosa/Linvuu. Confira main, PRs e deploy atuais. Continue a primeira pendência reproduzível da auditoria, registre evidências e atualize o estado no PR. Não considere correção concluída antes da verificação correspondente.”
