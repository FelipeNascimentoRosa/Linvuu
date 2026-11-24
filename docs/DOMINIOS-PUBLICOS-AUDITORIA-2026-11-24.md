# Domínios e disponibilidade para cada público — 24/11/2026

Estado: rascunho técnico; não publicado. Cada domínio deve atender ao próprio público, sem redirecionamento automático para material de outro idioma nem substituição automática de explicações. Um arquivo em inglês, por si só, não comprova adequação pedagógica. A proposta anterior de indexar uma aula por existir arquivo foi revertida neste ramo.

A mudança em andamento remove redirecionamentos automáticos entre domínios e impede que a navegação web sirva sessões de outro idioma como alternativa. Rotas sem versão para o público retornam 404; conteúdo permanece nos arquivos. A API filtra tópicos de gramática explicitamente identificados em português ao pedir inglês e não substitui aulas ou gramática não existentes pelo arquivo português. A troca voluntária de idioma do usuário e a normalização de www permanecem disponíveis.

Lacunas observadas: livros, materiais e páginas de dúvida no .com sem material próprio para falantes de inglês; conteúdo de português para estrangeiros somente para público inglês; italiano no .com com duas aulas em inglês e gramática que registra 60 aulas sem versão inglesa. É necessária revisão pedagógica, não apenas tradução, e auditoria das demais áreas, áudios, conteúdo pago e fluxos autenticados.

Verificado: testes pontuais HTTP locais para indisponibilidade por domínio, filtro da gramática italiana e aula sem versão inglesa. A suíte testar:dominio e os testes HTTP anteriores ainda esperam os redirecionamentos removidos e devem ser atualizados. npm run lint já falhava na base main por incompatibilidade de ts-fsrs. PR deve continuar em rascunho até corrigir os testes, validar navegador nos dois domínios e fluxos autenticados e obter checks verdes. Nada foi mesclado ou publicado.
