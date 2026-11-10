# Evolução real, UI e motion — estudo sem alterar produto atual
**Status: proposta futura.**

## Achado no produto Linvuu
- `src/lib/progresso.ts`: marca dias concluídos e estados de sessão; isso mede atividade, NÃO domínio.
- `src/lib/analytics.ts`: eventos `page_viewed`, `course_viewed`, `lesson_started`, `practice_completed`, `lesson_completed`, com consentimento e dados limitados; não coleta competência/retensão profunda.
- `src/lib/medicao.ts`: eventos de acerto/erro da prática com consentimento.
- `src/plataforma/apk/espacadoModelo.ts`: intervalos 1, 3, 7 dias (não comprovam retenção 30 dias); `RevisaoErros.tsx` já possui barra de progresso e revisão.
- `scripts/testar-plataformas.mjs` não substitui teste de instalação Android e áudio no aparelho.

## Não tratar Duolingo como frontend aberto
A organização oficial https://github.com/duolingo possui código e datasets públicos pontuais, como https://github.com/duolingo/halflife-regression (MIT; pesquisa sobre memorização). Não foi identificado repositório oficial que libere **todo** o aplicativo/interface/identidade Duolingo como open source. Não copiar Duo, a coruja, assets, textos, ícones, layouts ou progressões. Usar somente resultados públicos e bibliotecas independentes com licenças verificadas.

## Bibliotecas comparadas
- Motion for React, MIT: https://github.com/motiondivision/motion ; docs: https://motion.dev/docs/react. Boa opção futura para gestos, microinterações e transições de progresso.
- react-spring, MIT: https://github.com/pmndrs/react-spring ; opção alternativa, não instalar ambas por padrão.
- H5P Branching Scenario, MIT para esta biblioteca: https://github.com/h5p/h5p-branching-scenario . Avaliar custo de integração com React e suporte Android; H5P como protótipo, não dependência automática.
- Movimento reduzido: https://motion.dev/docs/react-accessibility ; sem autoplay, parallax ou transformações intensas para usuários com preferência `prefers-reduced-motion`.

## Especificação Linvuu: progresso HONESTO
1. **Percurso**: capítulos e sessões realizados (barra neutra).
2. **Compreensão**: verificações após explicação, incluindo justificação das escolhas.
3. **Automatização**: respostas corretas sem ajuda e com variantes; tempo apenas sinal secundário.
4. **Retenção**: tarefas comparáveis com itens novos em 1/7/30 dias (parâmetros sujeitos a pesquisa); não confundir agendamento com lembrança comprovada.
5. **Transferência**: aluno escreve/fala/seleciona em um contexto novo, avaliado com rubrica e sem exemplos idênticos.
6. **Autonomia**: progressão de tarefas guiadas para abertas, sem alegar certificação externa.

Uma barra de 100% na LIÇÃO não vira automaticamente 100% de DOMÍNIO. Selos somente quando critério explícito for atingido; nunca fake progress. Motricidade visual reforça conquista real e permite desfazer/atualizar evidências. Exibir `revisão recomendada` sem punir pausas.

## Padrões de botões e movimento
- Botão `Compreendi`: não prova domínio; vai para aplicação curta.
- Botão `Por que?`: abre gramática causal da resposta; mostra exemplos contrastivos em PT-BR e língua alvo.
- Botão `Compare`: altera tabela demonstrando ordenação, registro ou regência.
- Feedback correto: transição discreta e explicação; feedback incorreto: dica diagnóstica, sem penalização emocional.
- Animações: feedback ≤300 ms como hipótese inicial a testar, nenhuma recompensa falsa, sem bloqueio da leitura; favorecer CSS nativo para transições simples e Motion somente se necessário.
- Testar navegação por teclado, leitor de tela, toque, modo escuro e aparelhos Android modestos.

## Hipótese de marca
Sem mascote fixo nem avatar de professor permanente por padrão. Personagens narrativos de cada situação podem existir com identidade visual de Linvuu, não cópia de mascotes concorrentes. O usuário poderá decidir em outra etapa se deseja ícone narrativo persistente.

## Testes antes de instalar qualquer biblioteca
Comparar CSS puro vs Motion vs react-spring: peso final, CPU, fluidez em Android, A11y, bundle, licença, integração com tokens.css; prova com 1 fluxo de exercícios em branch isolada. Não tocar nas versões publicadas até autorização futura.
