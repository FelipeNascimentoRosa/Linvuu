# Linvuu: rodadas Android, internacionalização e áudio
Data da conferência: 19/10/2026. Base: main 1b7687bf61e93d9ba0ac590e2adf1e5948d2e85c.
Este plano não declara o APK pronto nem garante aprovação do Google Play.

## Produto e arquitetura
Lançamento inicial para brasileiros; arquitetura internacional desde já. Manter três escolhas independentes:
- idioma da interface: pt-BR, en, es;
- idioma das explicações: pt, en, es;
- curso estudado: en, es, fr, it, de, ru, br.
Não inferir nacionalidade, proficiência, moeda, país de cobrança ou idioma das explicações pela interface.
No fluxo futuro, selecionar explicações e exibir cobertura real; não trocar silenciosamente para português.
Não produzir novos materiais internacionais nesta rodada.
Os índices declaram 398 aulas-fonte em português (seis cursos), 62 de português para estrangeiros com fonte inglesa e duas destas adaptadas ao espanhol. Isso é inventário estrutural, não revisão linguística nem garantia de publicação. Tradução de títulos e menus não conta como aula adaptada.

Manter React/Capacitor como base candidata, com build e navegação próprios do app. HTML não determina sozinho qualidade ou aprovação. Reescrever tudo em Flutter/Kotlin agora dispersaria esforço. A decisão permanece sujeita a medições no Redmi.
Compartilhar conteúdo, regras e identidade com a web; separar adaptadores de cobrança, arquivos, áudio, autenticação, notificações e ciclo de vida. Não incorporar todos os áudios ao APK.
O PR #263 continua em rascunho: integrar main e validar antes de qualquer publicação.

## Rodadas com resultados verificáveis
Cada rodada é uma unidade de entrega; pode exigir mais de uma sessão. Não publicar automaticamente ao concluir.

| Rodada | Trabalho | Critério para avançar |
|---|---|---|
| 1 — Inventário e regras | Cobertura internacional reproduzível, matriz Play, plano de áudio e levantamento de pendências | Verificador e testes passando; diferenças entre inventário e validação registradas |
| 2 — Base Android atual | Atualizar #263 com main; separar builds; resolver dependências; gerar debug e inspecionar AAB | CI verde, build reproduzível, patrimônio de conteúdo preservado; nenhum checkout web acessível por navegação do app |
| 3 — Experiência móvel | Início para continuar estudos, navegação inferior, voltar Android, teclado, áreas seguras, toques, estados de erro; escolhas de idiomas e aviso de aulas não adaptadas | Testes de navegação e revisão visual em tela pequena, sem promessas falsas de tradução |
| 4 — Piloto de áudio | Licenças exatas, amostras locais, voz/dialeto estáveis, manifesto e hashes; reprodução e retomada | Pronúncia e qualidade aprovadas antes da produção em massa; sem dependência de API paga |
| 5 — Offline e progresso | Download por unidade com retomada, integridade e quota; estudo sem rede; progresso local e fila idempotente de sincronização | Modo avião, rede interrompida, pouco espaço, app encerrado e troca de conta sem perda/vazamento; definir validade de acesso offline |
| 6 — Conta e conformidade | Login real, links verificados, exclusão dentro/fora do app, privacidade, inventário de SDKs, Data Safety, acessibilidade e relatório de erro | Testes reais de login e exclusão; declarações correspondem aos dados coletados; permissões mínimas |
| 7 — Assinaturas Play | Produtos/preços definidos pelo Felipe; integração Billing suportada, servidor, eventos, restauração, cancelamento e reembolso | Compras de teste, pendentes, renovação, graça/bloqueio, reembolso e restauração sem liberar acesso indevido; Stripe permanece canal web |
| 8 — Dispositivo e loja | Redmi + outro perfil Android/emulador, latência, memória, rede lenta, bateria, AAB assinado e canal fechado; ficha da loja internacional honesta | Relatório sem bloqueadores, credenciais de revisão e formulários prontos; cumprir teste fechado quando aplicável; só então solicitar produção |

Começar testes internos em modo de consumo: entrar e acessar conteúdo já autorizado, sem vender dentro do app.
Não usar esse modo para disfarçar checkout externo. A oferta final dentro do app exige tratamento de cobrança próprio.
Offline é prioridade; notificações e compartilhamento só entram depois de úteis, consentidos e testados.
Áudio em segundo plano/Media3 deve ser adotado se o fluxo de escuta justificar; não pedir microfone, contatos ou localização sem necessidade.
Não tornar reconhecimento de fala, IA conversacional ou vídeo novos requisitos de lançamento.

## Áudio sem cobrança por caractere
Estratégia: geração em lote em computador próprio, arquivos persistentes no servidor e download opcional no app. Não sintetizar tudo a cada aluno, nem instalar modelos grandes no APK.
Isso elimina tarifa de API de síntese, mas não energia, processamento, armazenamento e tráfego.
Não contratar GPU/serviço pago. Disponibilidade e desempenho da máquina de geração ainda precisam ser medidos.

Candidatos:
- Piper: candidato para alemão e russo e alternativa para outros idiomas. Motor e voz não têm automaticamente a mesma licença. Registrar MODEL_CARD e licença exata de cada modelo antes de aprovar uso comercial. Nenhuma voz Piper foi aprovada nesta rodada.
- TTS do sistema Android pode ser recurso auxiliar opcional, sujeito à disponibilidade de idioma/voz/rede, não fonte única de ditados e avaliações.
- Edge TTS existente: licença de pacote npm não comprova autorização comercial do serviço. Não declarar todos os arquivos ilegais nem continuar gerando com base nessa suposição. Auditar procedência e direitos; substituir gradualmente quando necessário.

Pipeline:
1. Recontar CSVs e referências atuais, separar faltantes, existentes e modificados; preservar nomes e IDs.
2. Deduplicar apenas texto + locale/dialeto + voz + velocidade + modelo/revisão + parâmetros de pronúncia. Manter mapa para todos os nomes originais; não renomear hashes existentes.
3. Registro por voz: fonte, versão, hash, licença, atribuição, uso comercial conferido, dialeto e escuta aprovada. Bloquear produção com licença ausente ou incompatível.
4. Piloto de 20 frases por idioma estudado + pt-BR (até 140): perguntas, números, nomes, frases curtas e dificuldades fonéticas; só usar candidatos já liberados. Russo: conferir acento e ё; espanhol: confirmar variante espanhola; francês: avaliar voz única sem inventar segunda.
5. Após aprovação, gerar lotes de até 150 arquivos com checkpoints, sem depender de uma conversa permanecer aberta. Automatizar duração, arquivo vazio, silêncio, clipping e formato; revisar por escuta. Testes automáticos não comprovam pronúncia.
6. Escutar 100% do primeiro lote e dos itens de risco; depois manter controle humano por amostragem e revisar tudo que for sinalizado. Revisão por IA não substitui certeza linguística.
7. Publicar primeiro uma unidade gratuita; testar web/Android/CORS/offline; só depois instalar os demais lotes.
8. Correções regeneram somente itens alterados, preservando referências e versionando cache.

A fila histórica de 915 arquivos e 90.892 caracteres é estimativa anterior, NÃO recontagem desta rodada.
Se continuar com 915 arquivos: piloto até 140; depois seis lotes de até 150 cobrem os restantes, desde que todos os pilotos pertençam à fila e sejam aproveitados. Quantidade real depende da nova contagem.
Não converter caracteres em tokens de ChatGPT como equivalência fixa. Síntese local não consome tokens de API de TTS; revisão textual e esta conversa têm consumo próprio, sem acesso ao saldo exato da conta.
Não prometer prazo de geração antes do benchmark CPU/GPU nem uso comercial sem licença identificada.

## Rodada 1: executado e pendente
Adicionado scripts/auditar-cobertura-internacional.mjs:
    node scripts/auditar-cobertura-internacional.mjs
    node --test scripts/auditar-cobertura-internacional.test.mjs
Leitura apenas; não modifica conteúdo. Verifica IDs, duplicação e referências de tradução; emite as 21 combinações curso/explicação. Três testes passaram contra cenários de ausência, parcialidade e índices inválidos.
Executado com índices obtidos do commit-base. Fonte completa não significa áudio completo, qualidade aprovada ou acesso liberado.
Configuração android/variables.gradle declara compileSdkVersion=36 e targetSdkVersion=36; não é prova de build ou compatibilidade.
Pendente nesta primeira rodada: recontagem de áudio, licenças por voz, benchmark, atualização/compilação #263, aparelho, autenticação, pagamentos e formulários Play. Nenhum deploy nem alteração de cobrança.
