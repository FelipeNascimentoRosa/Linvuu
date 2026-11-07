# Linvuu — mascote original, motion premium e retenção por aprendizagem

**Documento estratégico — 26/10/2026. STATUS: CONCEITO, SEM IMPLEMENTAÇÃO.**
**Veto de release:** não alterar site, APK, conteúdos A1–A2, pagamentos ou main antes de autorização futura. Este documento integra apenas o PR editorial em rascunho.

## Evidências observadas no repositório
- `src/tokens.css`: verde-floresta `#1E3B2F`, papel `#F5F1E8`, grafite `#1D1F1C`, ocre `#B7791F`, tipografia editorial e tokens semânticos.
- `src/components/Traco.tsx`: traço de caneta irregular, estável por semente; controla progresso real com `valor`, `exato`, `trilha` e `animar`. Ativo central para a nova linguagem de motion.
- `scripts/generate_all_mascots.js`: script legado gera mascotes culinários por idioma (pelmeni, pretzel, croissant etc.) e ícones de objetos. Não adotar seis mascotes de idioma; verificar onde são usados antes de qualquer depreciação futura.
- `src/lib/progresso.ts`: conclusão de unidades e sessões; não certifica domínio.
- `src/lib/medicao.ts`: mede alguns acertos/erros sob consentimento; ainda falta transferência/retensão.
- `src/plataforma/apk/espacadoModelo.ts`: revisões 1/3/7 dias e estado de etapa. Nunca converter esse estado automaticamente em “B2 dominado”.

## Hipótese de identidade visual: Vuu
**Vuu é nome provisório, sujeito a aprovação editorial e busca de marca.** Personagem NÃO animal, NÃO robô e NÃO professor digital realista. Silhueta baseada numa única tira de papel dobrada em dois arcos fluidos, evocando o `uu` de Linvuu, um sinal de citação e o gesto de virar uma página; integração com traços do componente `Traco`. Formas assimétricas, leve irregularidade analógica, cor predominante verde-floresta, papel como área negativa, grafite para poucas marcas faciais, ocre só como ponto/linha de ênfase. Evitar olhos enormes, cílios, nariz de pássaro, chapéus estereotípicos, plásticos 3D, gradientes neon, confete contínuo e memes efêmeros.

### Design entregável
1. SVG mestre editável em camadas sem geração única em bitmap.
2. Silhueta funcional em monocromático, 24px, 48px, 256px e redes sociais.
3. Guia de espessura do traço, proporções, margem de proteção e negativos.
4. 8 expressões/estados: neutro, curioso, pensando, atenção, ouviu, entendeu, concluiu, convidando; nenhum estado culpabiliza ou intimida.
5. Conjunto de animações 2D de 1–2 s, loops somente onde auxiliem compreensão; versão estática e reduced-motion obrigatórias.
6. Voz pt-BR adulta/natural, moderada, sem ar de “guru IA” ou atuação de professor postiço; só scripts gramaticais aprovados pelo livro-mestre. Outros idiomas: revisor por língua antes de render.
7. Biblioteca de composição horizontal 16:9, vertical 9:16, quadrado, miniícone e interface; toda ocorrência deriva do mesmo desenho-mestre.

## Microinterações da Linvuu
- Botão “Por quê?” abre explicação e exemplo contrastivo aprovado, enquanto Vuu aponta visualmente para a alteração.
- Exercício correto: traço avança **apenas pelo desempenho medido**; microanimação ≤300ms como ponto de partida de teste.
- Resposta incorreta: dica causal e oportunidade de refazer; proibir tristeza do mascote, perda punitiva de barra ou chantagem.
- Terminado: distinguir **atividade concluída** de **competência demonstrada**.
- Prática espaçada: marcador “Hora de revisar” quando elegível, sem acusar faltas.
- Motion sempre secundário às tabelas e texto; foco, teclado, leitores de tela, alto contraste e reduced-motion.

## Ferramentas comparadas
- **CSS/SVG nativo:** primeira escolha para botões, traço, barras leves. Zero SDK.
- **Motion for React** (MIT): https://github.com/motiondivision/motion ; para gestos, stagger, spring e feedback de interface. Verificar custo no bundle e performance Android. Respect reduced motion: https://motion.dev/docs/react-accessibility .
- **Rive** (runtimes MIT): https://github.com/rive-app/rive-react ; state machine para mascote como personagem vivo consistente em web/Android; preço de editor/exportação e política comercial: https://rive.app/pricing . Não confundir runtime MIT com acesso livre a arquivos/artes de terceiros.
- **HeyGen**: roteiros situacionais e vídeos; não usar avatar-professor como identidade permanente. Confirmado acesso a listagem de estilos/kits em 26/10/2026; render e pronúncia NÃO validados.
- **ElevenLabs**: roteiros de fala aprovados e áudio com licenciamento comercial confirmado pelo contrato; integração existente no repositório não comprova conta funcional.
- **Duolingo open source**: https://github.com/duolingo/halflife-regression (MIT) é pesquisa de repetição, NÃO licença do app/interface/marca Duo. Adotar princípios de feedback com desenho independente.
- **Motion AI/MCP**: documentação atual em https://motion.dev ; ferramenta de apoio a implementação futura, não motivo para adicionar assinatura.

## Social-first sem conteúdo de IA genérico
**Papel narrativo:** Vuu descobre erros que brasileiros cometem e conduz um exercício verdadeiro, com humor leve e ironia linguística, sem corrigir ridicularizando.
Roteiro de vídeo vertical em 30 s como hipótese:
0–3 s: “Essa frase em alemão parece certa — mas muda o sentido.”
3–10 s: mostrar duas frases de fontes e exemplos autorais verificados.
10–20 s: Vuu desenha o traço que destaca a mudança de construção e explica em pt-BR.
20–26 s: tarefa de escolha/produção com pausa real para responder.
26–30 s: resposta e CTA “Resolva a situação completa na Linvuu”.
Nunca prometer “fluente em 30 dias”, confundir post-view com aprendizado, nem simular estatísticas de usuários.

## Métricas e experimentos
- Social: visualização qualificada, retenção no vídeo, visitas ao perfil, link com UTM, início de desafio.
- Ativação: visitante → cadastro consentido → primeira tarefa terminada → primeira resposta independente.
- **DAU bruto**: usuários únicos ativos por dia. **DAU de aprendizagem** (métrica PROPOSTA): usuários únicos que fizeram tarefa válida de prática/transferência, não apenas login ou animação.
- **D1, D7, D30**: coortes de retorno com definição estável, separando visita de tarefa de aprendizagem.
- **Retenção cognitiva**: itens inéditos após intervalos, resultado por competência e sem consulta da resposta; não derivar de barra de conclusão.
- Experimento escalonado: A (site/apk atual) versus B (mesma tarefa com Vuu e motion), com consentimento, mesma dificuldade e controle de versões. Avaliar compreensão, desistência, perceived-premium e desempenho, não só CTR.
- Hipótese de aquisição via mascote só passa se elevar conversão para prática útil, retenção de aprendizagem ou indicação, não apenas views.

## Critérios de go/no-go
1. Identidade não pode ser confundida com Duolingo nem diminuir percepção premium em avaliação qualitativa.
2. SVG reconhecível estático e em tamanhos pequenos; cópias idênticas/consistentes exportadas.
3. Motion acessível, responsivo, redução de movimento, sem degradação perceptível de performance Android.
4. Nenhum texto gramatical gerado livremente pelo mascote sem revisão; direitos comerciais de voz/arte garantidos.
5. Instrumentação do experimento validada e com consentimento.
6. Aprovação do usuário sobre conceito e produção; PR só de documentação não implica permissão para build ou deploy.

## Estado desta versão
Somente brief e recomendação. Nenhum arquivo SVG mestre produzido, mascote animado implementado, vídeo renderizado, nome registrado ou experimento executado.
