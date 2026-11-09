# Mandato: conteúdo em inglês da Linvuu (protocolo de evidência)

> Salvo em 09/11/2026, a pedido do Felipe. Este arquivo é a ordem; `EN_AUDIT.md` e `METRICS_EN.md` são a prova.
> Enquanto a Fase 1 não estiver entregue e aprovada, **nenhuma página em inglês é reescrita**.

## MANDATO E AUTORIZAÇÃO

Você está autorizado a completar, corrigir e reescrever TODO o conteúdo em inglês do site da Linvuu. Isso inclui: páginas que existem em português mas não em inglês, textos placeholder, traduções automáticas de baixa qualidade, erros gramaticais, inconsistências de estilo e falta de padronização.

A autorização é total, mas condicionada a um protocolo de evidência e métrica. Nenhuma frase em inglês pode ser publicada sem passar pelos critérios abaixo.

## REGRAS DE OURO

1. Inglês é a língua de referência global do site. Toda página pública deve ter versão em inglês com qualidade nativa, não tradução literal do português.
2. Use as ferramentas e repositórios listados abaixo como memória local e referência obrigatória. Não improvise regras gramaticais ou de estilo.
3. Toda decisão de copy em inglês deve ser registrada em `NOTES_EN.md` com: trecho original, problema identificado, correção aplicada e fonte de referência (regra gramatical, guia de estilo ou benchmark).
4. Meça antes e depois. Readability, grammar score e SEO on-page são obrigatórios em cada ciclo.
5. Se uma tradução automática for usada como ponto de partida, ela deve passar pelo mesmo pipeline de QA. Nenhuma saída de máquina vai direto para produção.
6. Trabalhe página por página. Conclua uma página completamente antes de passar para a próxima.

## PROTOCOLO DE QUALIDADE EM INGLÊS (OBRIGATÓRIO POR PÁGINA)

### ETAPA 1 — AUDITORIA DA LACUNA
Liste todas as páginas públicas. Para cada uma, verifique:
- Existe versão em inglês? (URL /en/... ou similar)
- Se existe, o conteúdo é tradução literal, placeholder ou texto nativo?
- Há erros gramaticais, inconsistências de tempo verbal, falta de artigos, preposições erradas?
- O tom é consistente com o restante do site?
Registre em `EN_AUDIT.md`.

### ETAPA 2 — BASELINE MÉTRICO
Antes de reescrever, meça o texto atual em inglês com:
- Harper (offline grammar checker, Apache-2.0): conte lints por 100 palavras.
- retext-readability (npm): Flesch Reading Ease e grade level.
- @f-o-t/content-analysis ou seo-checker-pro: SEO on-page e readability.
Registre os valores em `METRICS_EN.md`.

### ETAPA 3 — ESCRITA OU REESCRITA COM EVIDÊNCIA
Para cada página:
- Se não existe em inglês: escreva do zero com base no conteúdo em português, mas adaptando para convenções do inglês (não traduzindo palavra por palavra).
- Se existe mas está ruim: reescreva frase por frase, usando The Elements of Style (domínio público, Project Gutenberg) como guia de clareza e concisão.
- Se for tradução automática: use-a apenas como rascunho. Reescreva com Harper e retext rodando em paralelo para validar cada alteração.
- Consulte os repositórios de idiomas (seção REPOSITÓRIOS) para terminologia e padrões de localização.

### ETAPA 4 — VALIDAÇÃO GRAMATICAL E DE ESTILO
Rode Harper novamente no texto reescrito. Meta: zero lints críticos, no máximo 1 lint menor por 200 palavras. Rode retext-readability: Flesch Reading Ease entre 50 e 70 (inglês claro para web). Se o texto for técnico, aceite até 45. Registre o delta em `METRICS_EN.md`.

### ETAPA 5 — VALIDAÇÃO DE SEO E CONTEÚDO
Rode @f-o-t/content-analysis ou @vuminhhoa/seo-analyzer no HTML da página. Verifique:
- Título e meta description únicos em inglês, com keyword.
- Hierarquia de headings correta.
- Comprimento mínimo de conteúdo (600+ palavras para páginas principais).
- Quick answer nos primeiros 100 words (se aplicável).
Registre o score antes e depois.

### ETAPA 6 — QA DE TRADUÇÃO (SE APLICÁVEL)
Se a página foi traduzida do português, use o framework MQM (Multidimensional Quality Metrics) para classificar erros: accuracy, fluency, terminology, style. Se possível, use COMET (Unbabel) para uma pontuação automática de qualidade da tradução. Documente os erros encontrados e corrigidos.

### ETAPA 7 — DOCUMENTAÇÃO E COMMIT
Registre em `NOTES_EN.md`: página, baseline, reescrita, pós-métrica, decisão. Commit com mensagem clara: `feat(i18n-en): complete [page] with grammar and SEO validation`.

## REPOSITÓRIOS E FERRAMENTAS OBRIGATÓRIOS

### A) GRAMÁTICA E ESTILO (licenças comerciais permitidas)
- **Harper** (Automattic/harper): verificador gramatical offline, Apache-2.0. Rápido (10ms), privado, sem servidor. Use via CLI ou integração LSP. Ideal para pipeline de CI.
- **LanguageTool**: alternativa mais madura, LGPL-2.1. Mais lento e pesado, mas com mais regras. Use apenas se Harper não cobrir algum caso específico.
- **The Elements of Style** (William Strunk, 1918/1920): guia de estilo em domínio público, disponível no Project Gutenberg (#37134). Use como referência de clareza, concisão e boas práticas de escrita.
- **English developer style (American)** — style guide para conteúdo técnico em inglês, com foco em i18n e clareza. Verifique a licença no repositório antes de usar.

### B) MÉTRICAS DE LEGIBILIDADE E QUALIDADE
- **retext-readability** (npm): plugin para checar nível de leitura com múltiplos algoritmos. Roda em Node.js, fácil de integrar ao build.
- **@f-o-t/content-analysis** (npm): análise completa de SEO, readability, estrutura e padrões problemáticos. Zero dependências, TypeScript.
- **@vuminhhoa/seo-analyzer** (npm): fork do YoastSEO, com 29 assessments de SEO e conteúdo, incluindo readability.
- **quality-docs** (sparkartgroup): CLI que usa retext para checar readability, spelling, filler, weasel words e simplificação. Bom para varrer todos os arquivos de conteúdo de uma vez.

### C) QA DE TRADUÇÃO E LOCALIZAÇÃO
- **MQM** (Multidimensional Quality Metrics): framework padronizado (ISO 5060) para classificar erros de tradução. Use a tipologia para documentar problemas de accuracy, fluency, terminology e style.
- **COMET** (Unbabel/COMET): framework neural para avaliação de tradução. Modelos XCOMET detectam erros minor, major e critical conforme MQM. Código aberto, licença permissiva.
- **Pearmut**: plataforma de avaliação de tarefas multilíngues com suporte a MQM e outros protocolos. Útil se o volume de conteúdo for grande.
- **awesome-translations** (mbiesiad): lista curada de ferramentas, plataformas e recursos de i18n/l10n. Consulte para padrões e terminologia.

### D) BENCHMARK DE QUALIDADE DE TRADUÇÃO
- **LibreTranslate / Argos Translate**: tradução open source. Qualidade razoável para pares comuns (EN↔ES, EN↔FR), mas inferior a LLMs grandes. Use como baseline, não como solução final. Se usar, sempre passe pelo pipeline de QA.

## FASES DE EXECUÇÃO

- **FASE 1 — AUDITORIA E BASELINE.** Execute Etapa 1 e Etapa 2 em todas as páginas. Entregue `EN_AUDIT.md` e `METRICS_EN.md` com baseline global. Não reescreva nada ainda.
- **FASE 2 — PÁGINAS PRIORITÁRIAS.** Comece pelas páginas de maior tráfego ou importância: home, about, pricing, contact. Execute Etapas 3 a 7 para cada uma. Entregue as páginas completas em inglês com métricas antes/depois.
- **FASE 3 — PÁGINAS SECUNDÁRIAS.** Repita o ciclo para as demais páginas públicas. Mantenha o mesmo padrão de qualidade e documentação.
- **FASE 4 — CONTEÚDO DINÂMICO E MICROCOPY.** Revise também: labels de botões, mensagens de erro, placeholders de formulário, meta tags, alt text de imagens, e-mails transacionais. Tudo em inglês deve passar pelo mesmo pipeline.
- **FASE 5 — INTEGRAÇÃO COM CI.** Configure Harper e retext-readability para rodarem no pipeline (GitHub Actions, pre-commit ou script npm). O objetivo é que toda nova string em inglês seja validada automaticamente antes do merge. Documente o setup no `README_EN.md`.

## SAÍDA ESPERADA POR PÁGINA

(a) URL da página; (b) status anterior (inexistente / ruim / tradução automática); (c) baseline (grammar lints, Flesch, SEO score); (d) texto reescrito; (e) pós-métrica; (f) erros MQM corrigidos (se aplicável); (g) nota em `NOTES_EN.md` com fonte da correção.

---

**Regras do repositório que este mandato não revoga:** `AGENTS.md` (branch + PR, sem segredo, sem alterar cobrança, licença permissiva apenas, entregar resultado pronto). O protocolo REA de `METRICS.md` continua valendo: nenhuma mudança visual sem medição antes e depois.
