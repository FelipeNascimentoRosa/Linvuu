# Remoção da quarentena legada — 24/11/2026

Felipe autorizou a remoção dos arquivos sem uso. A pasta `_para_apagar/` foi criada como quarentena e seu inventário informava que os dois aplicativos antigos e os relatórios ali guardados não eram lidos pelo site, build, servidor ou CI. Uma busca nas pastas ativas encontrou apenas referências históricas em comentários e uma exclusão de análise estática; nenhuma dependência executável da pasta foi encontrada.

Foram retirados 136 arquivos versionados da árvore atual, incluindo os aplicativos antigos `alemao-descomplicado` e `russo-interativo` e relatórios da auditoria inglesa. Nenhum arquivo de alunos, conteúdo atual de cursos, mídia ou configuração ativa está no escopo. O histórico do Git preserva as versões anteriores; esta mudança não reduz o histórico nem apaga objetos antigos remotamente.

Reversão: reverter o commit de remoção. A ausência de dependência foi verificada com busca estática; CI e build são verificados no PR.
