# Experiência Android v2 — 19/10/2026

Reformulação exclusiva do APK no PR #263, mantido em rascunho. A web preserva suas páginas por aliases de plataforma. Nenhum conteúdo, ID, gabarito, preço ou regra de acesso foi alterado.

## Referências e decisões

- Aquamarina: progresso real e revisão organizada. Nesta rodada: painel de avanço e percurso por unidades. Caderno de erros e revisão espaçada continuam pendentes.
- Memory: atividade focada, áudio e progresso. Nesta rodada: tela de aula exclusiva, etapas, controles de navegação acessíveis e recuperação de carregamento sem perder a rota.
- WordDrill: reduzir distração. Nesta rodada: catálogo compacto próprio, sem cartões de marketing da web. Não adotamos repetição passiva como método do curso.
- EnglishWords e Easy Speak: separar tipos de prática e ter ações evidentes. Aproveitamos a concentração na tarefa; não copiamos gamificação ou código.
- AnkiDroid: acessibilidade, personalização e recuperação. Nesta rodada: tema claro/escuro/sistema, progresso sem números fictícios, teste de ampliação simulada de texto e persistência de etapa. TalkBack e testes de aparelho ainda obrigatórios.
- jidoujisho: conectar consulta e estudo. Nesta rodada: atalho para gramática no painel. Leitor integrado, seleção de palavras e cartões contextualizados ficam para outra etapa. O projeto de referência está arquivado.

## Implementado

- Início com escolha de idioma de estudo, próxima sessão e uma ação principal. O progresso usa sessões realmente concluídas, sem estimar fluência, pontuação ou sequência diária.
- Percurso por unidades, sessão atual destacada, sessões em preparação sem link, expansão progressiva da lista e retomada existente.
- Aula com objetivo recolhido, progresso por blocos, navegação por etapas e botões inferiores adaptáveis ao texto ampliado. O motor pedagógico é compartilhado e recebe a opção `compacta` somente no APK.
- Catálogo com linhas compactas e cobertura real das explicações por idioma. As versões PT/EN/ES continuam honestas sobre material disponível.
- Ícone vetorial adaptativo com o símbolo original e moldura própria; camadas de fundo, primeiro plano e monocromática. Versão vetorial anterior ao Android 8 e máscaras adaptativas a partir dele. A forma externa final é controlada pelo launcher.

## Validação e limites

TypeScript web/APK; progresso isolado por conta; builds separados; prévia 320/390 px em PT/EN/ES; catálogo, aula, acesso e retomada; novo teste de tema persistente e aumento simulado dos tamanhos de texto. Essa simulação não equivale à escala de fonte do Android.

O APK precisa de instalação no Redmi, TalkBack, áudio com interrupções, teclado, restauração do processo e login real. Downloads offline, revisão espaçada, caderno de erros e notificações não foram implementados nesta rodada. Nenhuma biblioteca ou conteúdo dos concorrentes foi incorporado.
