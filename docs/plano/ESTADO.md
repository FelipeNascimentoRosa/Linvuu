# Estado dos 100 lotes

Uma linha por lote. O agente altera **só** a linha do lote em que trabalhou, no mesmo PR do lote. Estados permitidos: `a fazer` → `em curso` → `PR aberto` → `mergeado` → `em produção` · `bloqueado` (com o motivo) · `espera o Felipe` (com o que falta dele).

| nº | lote | quem | estado | PR | prova |
|---|---|---|---|---|---|
| 1 | Mesclar #555, #556 e #557 e zerar a fila de PRs | A+F | mergeado | #555 #556 #557 | `gh pr list --state open` → só o PR do plano em 11/11; smoke de produção 200 e título no idioma certo nas 13 rotas dos dois domínios |
| 2 | Fazer o e-mail de contato exibido receber mensagem | A+F | em produção | Felipe | Felipe verificou o recebimento em 11/11; DNS 11/11: MX da Cloudflare (Email Routing) em linvuu.com e linvuu.com.br — antes `0 .` no .com |
| 3 | Comprar de verdade nos dois domínios e reembolsar | A+F | espera o Felipe | — | falta ele fazer as 3 compras com cartão próprio (mensal R$ 139, trimestral Pix R$ 291,90, mensal US$ 19,99); depois o agente confere webhook, acesso e reembolso |
| 8 | Exibir FUNDADORES, o trimestral e uma grade de planos alinhada | A | PR aberto | #579 | local: `/assinatura` .br com FUNDADORES (1×), .com sem; home com o trimestral (R$ 291,90 Pix ou R$ 417) e FUNDADORES; botões dos 3 cartões da home na mesma altura (y=4417 nos 3); `testar-contrato-billing` e `validar:design` ok |
| 4 | Imprimir o funil real a partir do servidor | A | em produção | #565 | deploy `dep-dbq14obncjis73cih4fg` live 07:02Z; `GET /api/metricas` → 404 sem `METRICAS_TOKEN` (por desenho: sem token a rota não existe) |
| 5 | Contar visitas por rota sem cookie e sem consentimento | A | em produção | #567 | deploy `dep-dbq3f42jnfac739p8q30` live 09:40Z (04efdf961); `npm run testar:medicao` verde no check `build` |
| 6 | Registrar clique de botão com identificador | A | em produção | #568 | deploy `dep-dbq3fsutehms73b810ug` live 09:42Z (5cb70f903); `POST /api/cta` com CTA inválido → 400 nos dois domínios, home 200 |
| 7 | Trocar "chegam em breve" por avaliações reais | A | em produção | #572 | produção 11/11 11:30Z: `chegam em breve` = 0 nos JS servidos por linvuu.com.br; `relatosFonte` presente (avaliações da Udemy com fonte) |
| 9 | Pôr preço, botão e regra dos 7 dias na primeira tela de /assinatura | A+F | a fazer | — | — |
| 10 | Mostrar prova e botão na primeira dobra do celular | A | a fazer | — | — |
| 11 | Corrigir as promessas que o .com não cumpre (D1, D8, D11, D12) | A | PR aberto | #576 | /en/curso/it → "0 of 62 lessons" (era "Every lesson…"); título/descrição de /cursos e da home sem prometer italiano; livros fora da home do .com; D11 não reproduz (1 visível + 1 no FAQPage); titulos, seo-publico, inventário e dominio verdes |
| 12 | Oferecer o anual em até 12 vezes no cartão | A+F | a fazer | — | — |
| 13 | Abrir conversa por WhatsApp com clique medido | A+F | a fazer | — | — |
| 14 | Reenviar os sitemaps e pedir indexação das 10 páginas que vendem | A+F | a fazer | — | — |
| 15 | Registrar os domínios no Bing e ligar o IndexNow | A+F | a fazer | — | — |
| 16 | Criar o Perfil da Empresa no Google | F | a fazer | — | — |
| 17 | Publicar a Turma de Russo ao vivo com pagamento na página | A+F | a fazer | — | — |
| 18 | Captar interesse por idioma num formulário único | A | a fazer | — | — |
| 19 | Acionar os ex-alunos da Udemy antes de 30/01/2027 | A+F | a fazer | — | — |
| 20 | Tirar o áudio pago da árvore pública do repositório | A+F | a fazer | — | — |
| 21 | Tirar os capítulos pagos da árvore pública | A | a fazer | — | — |
| 22 | Limpar do histórico do Git os arquivos pagos | A+F | a fazer | — | — |
| 23 | Criar rota e molde da página de dúvida e publicar o piloto | A | a fazer | — | — |
| 24 | Agrupar tópicos em temas e publicar 30 dúvidas de alemão | A+F | a fazer | — | — |
| 25 | Transformar /gramatica num hub de verdade | A | a fazer | — | — |
| 26 | Reescrever os hubs de russo e alemão por intenção de busca | A | a fazer | — | — |
| 27 | Reescrever os hubs de inglês, espanhol, francês e italiano | A | a fazer | — | — |
| 28 | Marcar o idioma de todo trecho estrangeiro | A | em produção | #578 | produção 11/11 12:40Z: `curl -s https://linvuu.com.br/gramatica/de | grep -c lang="de"` → 62 (DOD ≥ 20); o HTML servido agora é a página real (#580) |
| 29 | Garantir toque de 44 px, campo de 16 px, texto de 14 px e linha de 75 | A | a fazer | — | — |
| 30 | Unificar a escala de títulos e pôr o H1 acima do H2 no celular | A | a fazer | — | — |
| 31 | Corrigir textos vencidos e páginas mistas (D5, D7, D9, D10) | A | PR aberto | #582 | local: `/russo-online` dos dois domínios com "21 playlists" e link do perfil no Spotify; .com com as 7 avaliações (traduzidas, com a fonte); `/livro/gramatica-ru` "Quinze capítulos"; `.com/ex-alunos-udemy` → 301 .com.br (`testar:dominio` e `testar-http-seo`); gramáticas de/es/it no .com com aviso de tradução; prerender 60/60 |
| 32 | Alinhar a busca de /cursos, o leque de livros e o rodapé | A | a fazer | — | — |
| 33 | Contratar envio de e-mail e autenticar o domínio | A+F | a fazer | — | — |
| 34 | Escrever a sequência de 5 e-mails por idioma | A | a fazer | — | — |
| 35 | Enviar retomada em 1, 3 e 7 dias a quem criou conta e parou | A | a fazer | — | — |
| 36 | Convidar a criar conta ao fim da sessão grátis | A | a fazer | — | — |
| 37 | Gravar os 8 primeiros vídeos-dúvida do YouTube | A+F | a fazer | — | — |
| 38 | Embutir o vídeo na página de dúvida | A | a fazer | — | — |
| 39 | Publicar 30 peças por mês com link único por rede | A+F | a fazer | — | — |
| 40 | Pôr foto real de professores na primeira dobra | A+F | a fazer | — | — |
| 41 | Dar uma aula aberta ao vivo por mês que termina na turma | A+F | a fazer | — | — |
| 42 | Vigiar a disponibilidade e avisar quando cair | A | a fazer | — | — |
| 43 | Achar a causa do LCP de 3,8 a 4,8 s no celular | A | a fazer | — | — |
| 44 | Baixar o LCP para 2,5 s e subir o piso do Lighthouse | A | a fazer | — | — |
| 45 | Modelar turmas no Firestore com regras e testes | A | a fazer | — | — |
| 46 | Deixar o aluno entrar numa turma por código | A | a fazer | — | — |
| 47 | Construir o painel do professor | A | a fazer | — | — |
| 48 | Cobrar por assento | A+F | a fazer | — | — |
| 49 | Publicar "Linvuu para professores e escolas" | A+F | a fazer | — | — |
| 50 | Prospectar 100 professores e escolas | A+F | a fazer | — | — |
| 51 | Preparar proposta, contrato-modelo e nota fiscal | A+F | a fazer | — | — |
| 52 | Publicar 30 dúvidas de inglês | A | a fazer | — | — |
| 53 | Publicar 30 dúvidas de russo em português | A+F | a fazer | — | — |
| 54 | Publicar 30 dúvidas de russo em inglês no .com | A | a fazer | — | — |
| 55 | Ligar aula, dúvida e livro com próximo passo e trilha | A | a fazer | — | — |
| 56 | Criar o teste de nível por idioma | A | a fazer | — | — |
| 57 | Mostrar o objetivo real de cada aula no hub e na sessão | A | mergeado | #573 | local: `/curso/de` com 72 objetivos em pt-BR, 0 em `/en/curso/ru`; produção 11/11 11:30Z ainda sem `fase-objetivo` no JS (deploy pendente) |
| 58 | Agendar a revisão espaçada com data de retorno | A | a fazer | — | — |
| 59 | Reorganizar a página da aula | A | a fazer | — | — |
| 60 | Eliminar o flash de "Carregando…" em curso e aula | A | a fazer | — | — |
| 61 | Medir e limitar o JavaScript inicial por rota | A | a fazer | — | — |
| 62 | Remover regra morta das três folhas globais | A | a fazer | — | — |
| 63 | Fundir as três folhas globais numa só | A | a fazer | — | — |
| 64 | Reduzir tokens e cores de texto ao conjunto do §9 | A | a fazer | — | — |
| 65 | Vestir as 6 páginas de livros.css com a linguagem da home | A | a fazer | — | — |
| 66 | Usar o Vuu em 96 px e a Caveat nos estados vazios e na conclusão | A | a fazer | — | — |
| 67 | Publicar os livros A1–A2 na Amazon com ponte para o curso | A+F | a fazer | — | — |
| 68 | Trocar o e-mail por um capítulo extra em PDF | A | a fazer | — | — |
| 69 | Publicar 25 dúvidas de espanhol | A | a fazer | — | — |
| 70 | Publicar 25 dúvidas de francês | A | a fazer | — | — |
| 71 | Publicar 25 dúvidas de italiano | A | a fazer | — | — |
| 72 | Configurar o Firebase no build Android e testar em aparelho | A+F | a fazer | — | — |
| 73 | Provar a compra do Play de ponta a ponta | A+F | a fazer | — | — |
| 74 | Gerar o AAB assinado e abrir teste fechado | A+F | a fazer | — | — |
| 75 | Escrever a ficha da loja em português, inglês e espanhol | A | a fazer | — | — |
| 76 | Publicar o app e medir instalação, conta e compra | A+F | a fazer | — | — |
| 77 | Verificar o manifesto de áudio no CI | A | a fazer | — | — |
| 78 | Comparar o custo de áudio em 3 fornecedores e decidir | A+F | a fazer | — | — |
| 79 | Regerar o áudio pago de espanhol no motor contratado | A | a fazer | — | — |
| 80 | Regerar o áudio pago de italiano no motor contratado | A | a fazer | — | — |
| 81 | Tocar o primeiro áudio em até 1 segundo | A | a fazer | — | — |
| 82 | Abrir plantão ao vivo semanal para assinantes | A+F | a fazer | — | — |
| 83 | Conferir o evento de compra no Pixel e na API de conversões | A | a fazer | — | — |
| 84 | Rodar campanha paga piloto para a turma | A+F | a fazer | — | — |
| 85 | Abrir a Turma de Alemão ao vivo | A+F | a fazer | — | — |
| 86 | Abrir a turma de português para estrangeiros em dólar | A+F | a fazer | — | — |
| 87 | Refazer a home do .com em torno do que está completo | A | a fazer | — | — |
| 88 | Publicar um curso novo na Udemy como vitrine | A+F | a fazer | — | — |
| 89 | Criar perfis dos professores em Preply e Superprof | A+F | a fazer | — | — |
| 90 | Conquistar 30 links reais para os dois domínios | A+F | a fazer | — | — |
| 91 | Validar os dados estruturados nas 10 páginas principais | A | a fazer | — | — |
| 92 | Encurtar o salto duplo de /es/* | A | PR aberto | #575 | `testar:dominio` 23 casos; `/es/livros` no .com.br chega ao `.com.br/livros` em 1 salto (era 2); regra só nos dois domínios reais |
| 93 | Remover o código morto do metaRota | A | em produção | #570 · 37c78ccd9 | deploy `dep-dbq3n0u7bikc738hntk0` live 09:57:07Z; `src/lib/metaRota.ts` 675 → 602 linhas (−73); lint exit 0 e inventário `{"sessoes":3680,"sitemap":60,"resultado":"conforme"}`; em produção `/curso/ru` 200 com `<main data-prerender>` e `/curso/ru/dia/1` 200 sem pré-render e com `noindex` (era o esperado) |
| 94 | Restaurar o backup do Firestore num emulador | A | a fazer | — | — |
| 95 | Cercar cada rota com tratamento de erro e contar falhas | A | a fazer | — | — |
| 96 | Tornar a acessibilidade bloqueante no CI | A | a fazer | — | — |
| 97 | Assistir 5 gravações por semana no Clarity | F | a fazer | — | — |
| 98 | Publicar o painel semanal dos 6 números | A | a fazer | — | — |
| 99 | Arquivar planos substituídos e deixar um só caminho de leitura | A | mergeado | #571 | `docs/plano/ESTADO.md` na main (raw 200); planos antigos em `docs/historico/`; AGENTS.md e CLAUDE.md apontam para docs/plano/ |
| 100 | Reescrever o plano com números reais nos dois portões | A+F | a fazer | — | — |

## Portões

| Data | O que tem de ser verdade | Medido | Decisão |
|---|---|---|---|
| 25/11/2026 | compra real aprovada e reembolsada nos dois domínios; o funil imprime 6 números; o e-mail exibido recebe | — | — |
| 31/12/2026 | 1 turma com 6 pagantes ou mais, **ou** 10 assinantes; 60 páginas de dúvida publicadas | — | — |
| 31/01/2027 | R$ 15 mil de caixa acumulado; resgates de FUNDADORES contados (o código vence em 30/01) | — | — |
| 31/03/2027 | R$ 60 mil de caixa acumulado; 3 turmas-piloto de professores pagas | — | — |

Portão não cumprido não se estica: o lote 100 reescreve a fila com os números medidos.
