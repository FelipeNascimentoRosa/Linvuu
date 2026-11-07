# Protocolo de agentes e critérios de liberação — 6 idiomas
**Tudo pendente; criação de tarefas no GitHub não inicia agentes autônomos.**

## Responsabilidades
A — bibliotecário por idioma: busca/reconcilia referências, evita duplicatas, registra DOI/ISBN/edição/licença.
B — agente documental: Docling OCR/MD/JSONL com páginas, hashes e amostra visual.
C — linguista-curador: coteja convenções, variações, exceções e linguagem do brasileiro.
D — autor-editor: cria texto original e exercícios baseados na matriz.
E — auditor adversarial independente: verifica regras com contraexemplos, naturalidade, gabarito e ambiguidade.
F — humano revisor: assina aprovações com anotação por capítulo/edição.
G — agente multimídia: roteiro, TTS/voz, vídeos e legendas SEM gerar lotes pagos antes de aprovação.
H — engenharia React/aplicativo: recebe livro-mestre aprovado; só branch futura.
I — marketing: provas de aprendizagem, sem alegar resultados ainda não medidos.
J — observabilidade/finanças: monitora custos, versões, erros e evidências, sem 'ping' pago.

## Matriz mínima por idioma
`unit_id`, `language`, `cefr_can_do`, `function`, `prerequisite`, `essential_grammar`, `memory_targets`, `exercise_types`, `counterexamples`, `register_variants`, `ptbr_interference`, `listening`, `speaking`, `reading`, `writing`, `new_context_transfer`, `source_ids_pages`, `license_check`, `human_review`, `gabarito_validation`.

## Matriz de pronto
- B1–B2 não pode ser marcado como pronto com lista de tempos verbais ou 100% de cliques.
- Passar em tarefas novas: compreensão, produção, mediação e interação quando aplicáveis; anotar rubrica e validação do revisor.
- Questões podem ter múltiplas respostas válidas; corretor automático reconhece limites e encaminha a revisão humana se necessário.
- Falhas de OCR, licença, naturalidade, orientação gramatical ou gabarito bloqueiam publicação.
- Os 6 idiomas têm a mesma rubrica, mas não sequência artificialmente traduzida.

## Pipeline de comunicação
Drive (fontes) → manifesto (metadados/direitos) → mapa de competências → capítulo autoral revisado → produção de tabelas e exercícios → áudio/vídeo derivados → validação no aplicativo → lançamento expressamente autorizado.

## Incidentes e limites
- Sem acesso confirmado do Claude via ChatGPT: integração deve ser feita por Claude Code/ambiente de desenvolvimento escolhido pelo usuário, com permissões explícitas.
- Sem acesso direto confiável à conta ElevenLabs nesta auditoria, embora haja scripts no GitHub.
- HeyGen acessível na conversa anterior para listagem de brand kits e estilos, mas isso NÃO prova geração ou pronúncia.
- Runway ainda não conectado.
- A1–A2 atuais e o site/APK são congelados.
- Sem agentes executando persistentemente apenas porque existem issues; necessidade de runner, tokens protegidos, workflows e aprovação humana.

## Critérios de licença para conteúdo de terceiros
Fontes restritas não entram na branch GitHub, tampouco textos completos não autorizados. Publicar apenas metadados, conclusões originais e links. Não armazenar chaves API em manuscritos nem issues.
