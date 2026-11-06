# Matriz Google Play — Linvuu
Conferida em 19/10/2026. Políticas e documentação oficiais relevantes; não é leitura de toda regra de todo produto Google. Revalidar imediatamente antes da submissão e conferir avisos específicos da conta Play Console.

| Tema | Exigência / decisão | Evidência ou pendência |
|---|---|---|
| Venda de curso digital | Regra geral: Play Billing para compra dentro de app distribuído pelo Play; exceções/programas dependem de país, inscrição e termos | Não ativar checkout Stripe em WebView ou link disfarçado; não presumir exceções dos EUA/EEE aplicáveis ao mundo |
| Consumo sem compra | Google permite login e consumo de conteúdo adquirido fora; respeitar regras sobre direcionamento externo | Primeiro canal interno sem compra; auditar menus, ajuda e fluxos de cadastro para checkout indireto |
| Billing Library | Cronograma atual: v7 encerrou prazo padrão em 31/08/2026; extensão excepcional até 01/11/2026. v8 até 31/08/2027, v9 até 31/08/2028 | Integrar versão suportada/compatível; verificar dependência Android transitiva real, não o número do pacote RevenueCat |
| Validação | purchaseToken verificado no servidor; não liberar estado PENDING; reconhecimento e prevenção de reaproveitamento | Implementar API Developer, idempotência, associação à conta e eventos de ciclo de assinatura; testar |
| Target SDK | Para apps móveis novos/atualizados, requisito atual API 36 a partir de 31/08/2026, salvo extensão específica | Configuração declara 36; verificar artefato final e comportamento Android 16 |
| Binários | AAB, assinatura, versionCode crescente, compatibilidade das bibliotecas nativas e páginas de memória de 16 KB quando aplicável | Inventariar .so e testar artefato; não presumir compatibilidade só porque Gradle compilou |
| Privacidade/Data Safety | Política pública acessível e declarações de coleta/compartilhamento coerentes, inclusive SDKs | Inventariar Firebase, pagamentos, analytics/crashes e logs; não publicar declaração genérica |
| Exclusão | Conta criada dentro do app exige solicitação de exclusão dentro do app e por recurso externo; dados associados, retenções justificadas e informadas | Verificar fluxo completo e URL pública; não confundir desativação com exclusão |
| Acesso à revisão | Credenciais e instruções para conteúdo restrito; classificação indicativa e público corretos | Preparar conta de teste com acesso adequado; nunca colocar credencial em repositório |
| Crianças | Se crianças estiverem no público-alvo, revisar Families e demais restrições aplicáveis | Decidir público real; não declarar idade falsa para evitar obrigações |
| Permissões/UX | Coleta mínima, consentimentos quando exigidos, aplicativo estável e com utilidade | Revisar manifesto, permissões e SDKs; teste de rede/offline/ciclo de vida e acessibilidade |
| Qualidade/WebView | WebView/Capacitor não são proibição geral; regras tratam baixa funcionalidade, spam e conteúdo sem autorização | Demonstrar experiência de estudo útil e estável; nenhuma funcionalidade garante aprovação |
| Conteúdo e propriedade intelectual | Direitos sobre textos, imagens, áudio, modelos e vozes; oferta e ficha da loja honestas | Livros de referência não dão direito de republicação; registrar proveniência; não anunciar adaptação inexistente |
| Teste fechado | Para contas pessoais criadas após 13/11/2023, regra de 12 testadores inscritos continuamente por 14 dias antes de solicitar produção | Tipo/data da conta não verificados; não afirmar aplicação universal nem aprovação automática |
| Identidade e produção | Verificação e documentos variam conforme tipo da conta, país e situação da empresa | Conferir identidade fiscal e nome legal atuais com Felipe; não criar identidades artificiais nem comprar serviços de registro nesta rodada |
| Segurança e publicação | HTTPS, controle de acesso no servidor, gestão segura de segredos, atualização e evidências de teste | Offline precisa isolamento de contas/validade; sem credenciais no APK ou Git; produção só após validação |

## Fontes oficiais
- [Política de pagamentos](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en)
- [FAQ de pagamentos e apps somente de consumo](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en)
- [Segurança de compras](https://developer.android.com/google/play/billing/security)
- [Prazos Billing Library](https://developer.android.com/google/play/billing/deprecation-faq)
- [Target API](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
- [Compatibilidade 16 KB](https://developer.android.com/guide/practices/page-sizes)
- [Dados do usuário e exclusão](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)
- [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)
- [Preparar app para revisão](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en)
- [Teste de novas contas pessoais](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
- [Funcionalidade e experiência](https://support.google.com/googleplay/android-developer/answer/9898783?hl=en)
- [Spam/WebViews](https://support.google.com/googleplay/android-developer/answer/9899034?hl=en)
- [Famílias](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en)
- [Developer Program Policy](https://support.google.com/googleplay/android-developer/answer/18258653?hl=en)

## Fontes de TTS, separadas das regras Play
- [Piper: vozes e necessidade de consultar MODEL_CARD](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/VOICES.md)
Motor, pesos, voz, dados, dependências e direitos de distribuição exigem verificação própria; licença de um componente não regulariza automaticamente os demais.
