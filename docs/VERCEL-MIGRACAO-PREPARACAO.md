# Preparação da migração para Vercel

Estado: preparação local, sem implantação e sem alteração de DNS ou produção.

O projeto atual atende os dois domínios em um Express que monta o HTML por Host, entrega páginas pré-renderizadas, protege aulas e áudios, recebe webhooks e mantém caches e limites de requisição em memória. Nesta etapa, `createApp` também pode ser chamada por uma entrada de função sem abrir uma porta; o servidor tradicional continua iniciando normalmente. Um teste local verifica a entrada com ambos os Hosts e duas rotas de isolamento. Isso não comprova que a aplicação esteja pronta para a Vercel.

Pendências para um preview utilizável:

1. Projetar e testar roteamento de arquivos estáticos sem expor arquivos internos; `express.static` não é servido pelo adaptador Express da Vercel. Preservar HTML por domínio, canonicals, robots, sitemaps e 404.
2. Preparar armazenamento privado dos 11.033 áudios pagos; seu conteúdo soma cerca de 210 MiB, antes das dependências e de outros dados. A função Express possui limite de pacote, e o áudio não pode ser exposto publicamente. Selecionar e testar armazenamento e autorização antes de copiar dados.
3. Substituir ou adaptar limites e caches em memória para a execução em múltiplas instâncias. Verificar webhooks, mensagens, tarefas e observabilidade.
4. Usar ambiente de teste e configurações próprias de prévia; verificar autenticação Firebase, compra, acesso pago, áudios, SEO e APK antes de trocar os dois domínios. Não usar dados de pagamento reais na prévia.
5. A conta Vercel criada está no plano Hobby. Confirmar plano adequado ao uso comercial e estimativa de custo antes da publicação comercial.

Fontes: https://vercel.com/docs/frameworks/backend/express ; https://vercel.com/docs/functions/limitations ; https://vercel.com/docs/limits/fair-use-guidelines .
