# Linvuu — instruções para Claude (estado comprovado)

## Atualização — domínio internacional, 06/11/2026
Em andamento: `linvuu.com` (inglês na raiz; o site em espanhol foi retirado em 06/11, o curso de espanhol permanece) e `linvuu.com.br` (português). Leia [docs/DOMINIO-COM-2026-11-06.md](docs/DOMINIO-COM-2026-11-06.md). Nada disso está no ar até o merge, o deploy e o domínio respondendo no Render serem conferidos.

## Atualização para Claude — Vuu e próximo passo, 29/10/2026
Felipe aprovou a arte sorridente e a versão 2D do Vuu para a home. A entrega do mascote 2D para o site está **concluída**: [PR #395](https://github.com/FelipeNascimentoRosa/Linvuu/pull/395), merge `ba7a76b`, publicado no Render e conferido no domínio. O arquivo atual é `public/assets/vuu/vuu-feliz-2d.svg`; aparece na amostra de áudio e na apresentação da home. Ele é uma interpretação vetorial da referência aprovada. O estudo e o arquivo editável também estão em `C:\site\Vuu-estudio\arte-mestre\recebidas`. Esta conclusão diz respeito ao site; não afirma que animação, outras expressões ou integração ao APK estejam concluídas. Leia [o registro do Vuu](docs/VUU-2D-2026-10-29.md).

O próximo passo priorizado é [progresso compreensível e reforço positivo](docs/PROXIMO-PASSO-PROGRESSO-2026-10-29.md), aproveitando os dados reais já existentes. O PR #367 é um protótipo em rascunho a consultar, não uma funcionalidade já entregue. Não representar sessões marcadas pelo aluno como domínio comprovado.

## Retomada do site e SEO — 27/10/2026
Leia primeiro [a passagem de contexto da integração](docs/HANDOFF-SITE-2026-10-27.md). Ela atualiza os snapshots abaixo: o Vuu já está implementado nesta integração e o proprietário autorizou a publicação das correções do site. Confira o estado real da `main`, do deploy e dos PRs antes de afirmar que algo está publicado.

## Ponto de entrada obrigatório para a retomada
Leia [**CONTINUIDADE-2026-10-27.md**](docs/CONTINUIDADE-2026-10-27.md) **por inteiro** antes de alterar qualquer coisa. Ela registra as entregas de 27/10 e contém snapshots históricos; a atualização acima prevalece quanto ao Vuu. Verifique a visibilidade real, a main e o deploy antes de afirmar estados atuais. Claude não recebe memórias de ChatGPT/Gemini automaticamente; GitHub + testes são o protocolo de sincronia.

**Fonte de regras:** leia `AGENTS.md` e `docs/COORDENACAO-IA.md`. Antes de qualquer edição, consulte a `main`, PRs abertos, checks e `docs/ESTADO-ATUAL.md`; esse último é um *snapshot* com data, não uma sincronização permanente.

## O que foi verificado em 27/10/2026
- Repositório de produto `FelipeNascimentoRosa/Linvuu` **público**; `main` no SHA `3431e4409065e0f1bfed71c3d704b4079d41ef39` ao consultar.
- CI e Segurança do SHA `3431e440`: **success**, [CI](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/40453761867) e [Segurança](https://github.com/FelipeNascimentoRosa/Linvuu/actions/runs/40453762120).
- Render `linvuu`, deploy `dep-dbg34nrbc2fs739ptjk0`, SHA `3431e440`: **live**, confirmado por API. Não extrapolar a checkout, login de usuários, regras Firestore ou APK.
- Repositório de auditoria `FelipeNascimentoRosa/Linvuu-Auditoria-Firebase` **público**. [Run #40460208259](https://github.com/FelipeNascimentoRosa/Linvuu-Auditoria-Firebase/actions/runs/40460208259): testes offline e autenticação federada Google OIDC **success**, conferido `projectNumber=982052790317` do projeto `linvuu`. Isto comprova **identidade e leitura do identificador do projeto**, não leitura administrativa completa.
- Cloud Shell sob as duas contas proprietárias reportou `CONFIGURACAO_GCP_VERIFICADA` após `--apply` e `--verify`; não foi obtida nesta sessão uma coleta administrativa independente de IAM ou das regras publicadas.
- Workflow antigo de auditoria Firebase em `FelipeNascimentoRosa/Linvuu`: **aposentado**; o workflow válido é o do repositório separado e sua coleta detalhada **permanece bloqueada enquanto o repositório for público**.
- PRs #360 (editorial futuro) e #367 (gamificação) permanecem **draft**, não aprovados para publicação.

## Não afirmar que funciona sem comprovação
- Publicação e segurança efetiva das `firestore.rules` de produção, usuários e documentos.
- Login real, revogação testada com tokens reais, assinatura, Stripe/checkout/webhooks externos.
- APK compilado, assinado e testado em aparelho ou publicado na Google Play.
- Áudios gerados em workflow: execução verde não autoriza uso comercial da origem TTS.
- Todos os idiomas/números de aulas, experiência visual mobile ou SEO orgânico integralmente validado.

## Como trabalhar
1. Reproduzir o erro e distinguir **implementado → testes simulados → CI → merge → deploy → produção**.
2. Criar branch/PR, executar checks aplicáveis, registrar SHA, evidências, limites e reversão; não sobrescrever branches de outros agentes.
3. Não apagar histórico, conteúdo de livros, workflows ainda úteis ou PRs futuros só para esconder checks antigos em vermelho.
4. Não publicar credenciais, policies IAM, artefatos com dados administrativos, chaves, tokens ou dados de alunos em repositório público.
5. Não realizar deploy de `firestore.rules`, mudanças de cobrança, Render, credenciais ou APP/APK como efeito colateral de documentação.

**Leia** [estado verificado](docs/ESTADO-ATUAL.md) e [Firebase — situação e verificação](docs/conexao-firebase-github.md). `docs/historico/CONTEXTO.md` e `docs/historico/PARCERIA-IA.md` são registros históricos, não fontes de verdade do presente.

## Verificação de encerramento — 27/10/2026
- Render: commit `6bf7dd9` publicado `live`, build e deploy aprovados (dep-dbg4aeajnfac739kpjlg). O site atual não foi substituído por uma nova arquitetura.
- Google Search Console (propriedade `sc-domain:linvuu.com.br`): sitemap com 81 URLs e zero erros/avisos na última leitura do Google, em 22/10. As 81 URLs foram registradas no Indexing Tracker nesta auditoria. Inspeção por URL confirmou indexação de /, /assinatura, /cursos, /curso/en, /en, /sobre, /livros; não indexadas /curso/de, /livros/de e /es. Não afirmar indexação de todas as URLs nem confundir cliques de proprietário com visitantes.
- Auditoria SEO on-page de 10 páginas: 0 avisos críticos, 0 altos, 4 médios, 13 leves. Problema verificável: objeto Organization em JSON-LD de cursos sem logo; corrigido neste PR com teste. Textos curtos e metadados devem ser revisados editorialmente, sem geração de conteúdo artificial.
- Stripe conectado em `livemode=true`: 1 preço mensal ativo de R$ 139,00; webhook habilitado para `https://linvuu.com.br/api/stripe/webhook` com eventos de checkout, assinatura e faturas. Nenhum Payment Link encontrado (o site usa Checkout Sessions criadas pelo backend). O fato de existir webhook não comprova entrega bem-sucedida nem conceder acesso ao curso.
- Pagamentos web: **não verificado fluxo de compra real ponta a ponta**. Não executar compra real, não mudar preços, descontos, cupons ou eventos Stripe sem tarefa explícita; conferir com teste controlado antes de declarar 8/10 para vendas.
- APK: build web separado não é Android release/AAB certificada. Não declarar conformidade final com Google Play sem análise de artefato, política de pagamentos e teste em aparelho.
- Sem acesso conectado ao GA4 pelo GSC Wizard desta conta; não inventar métricas de eventos, conversão ou páginas de erro reais.

## Atualização de auditoria por 20 frentes (27/10/2026)
Leia [docs/AUDITORIA-20-FRENTES-2026-10-27.md](docs/AUDITORIA-20-FRENTES-2026-10-27.md) antes de prometer lançamento. O relatório distingue fatos de GitHub, Render, Search Console, Stripe e PostHog dos testes reais ainda pendentes. PR #375 corrige JSON-LD e está live; PR #377 impede preços automáticos e está live. PR #378 adiciona eventos opt-in e foi mergeado, mas confirmar SHA de deploy antes de dizer que está live. PR #379 corrigiu transições de cor dos botões do APK, passou na prévia e em rerun e foi mergeado; verificar SHA de produção e homologação física antes de declarar Google Play pronta. Issues #376, #380 e #381 registram blockers. **Não há 20 subagentes independentes nesta execução; são 20 verificações técnicas com fontes.**

## Diagnóstico Googlebot revisado (27/10/2026)
**Fonte de verdade atualizada:** [docs/SEO-INDEXACAO-GSC-2026-10-27.md](docs/SEO-INDEXACAO-GSC-2026-10-27.md). A **home está indexada**, rastreada pelo Googlebot móvel em 27/10 07:10 UTC, `robotsTxtState=ALLOWED` e `pageFetchState=SUCCESSFUL`. HTTPS e www redirecionam corretamente nos testes atuais; bloqueios históricos não equivalem a bloqueios atuais. Google aceitou reenvio do sitemap de 81 URLs em 27/10 07:52 UTC. Cursos/livros prioritários continuam desconhecidos/descobertos mas não indexados; GSC não oferece via API solicitação individual de indexação. **Nunca afirmar que somente /en é indexada, nem que as 81 URLs já estão indexadas.** Não modificar robots que permitem / para apagar avisos antigos sem inspecionar as URLs exatas.
