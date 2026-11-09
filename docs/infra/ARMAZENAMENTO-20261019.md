# Linvuu — medição e plano de armazenamento
Conferência de 19/10/2026. Commit medido: 1b7687bf61e93d9ba0ac590e2adf1e5948d2e85c.
Somente leitura. Nenhum arquivo movido/apagado, cobrança ativada, regra alterada ou produção publicada.

> **Atualização de 23/10/2026 (depois da voz ElevenLabs).** Os números abaixo são de 19/10 e ficaram para trás.
> Na main 9a081ad7 o áudio soma **27.293 MP3 / 496,9 MB** (antes 16.569 / 305,5 MB): à voz antiga somou-se a geração ElevenLabs em
> `public/audio/v2/<idioma>/` (público) e `server/audio-privado-v2/<idioma>/` (pago). A árvore inteira tem 31.743 arquivos / 574,7 MB.
> A pasta v2 já resolve o risco de cache da P1 (voz nova em caminho novo, sem sobrescrever a antiga).
> Os dois scripts desta pasta foram ajustados para reconhecer v2; a chave proposta no R2 fica `r20261019/v2/<idioma>/<hash>.mp3`.
> Quando a voz antiga deixar de ser usada como reserva, ela é a primeira candidata a sair da árvore (cerca de 305 MB).

## Resultado
Os arquivos atuais rastreados somam **380.959.710 bytes (380,96 MB / 363,31 MiB)** em **20.814 arquivos**. Isso NÃO é o tamanho transferido ao abrir a home, o tamanho do APK, o uso do Render em disco, nem o repositório com seu histórico.
MB neste documento é decimal. A estimativa parcial anterior foi substituída pela soma completa.

| Grupo | Arquivos MP3 | MB |
|---|---:|---:|
| Áudio público | 5.504 | 82,43 |
| Áudio privado | 11.065 | 223,05 |
| Total MP3 | 16.569 | 305,48 |
| Índices JSON de áudio | 8 | 0,06 |
| Livros públicos/privados em conteúdo + capas | — | 5,89 |
| Restante dos arquivos rastreados | — | 69,53 |

Áudios são aproximadamente 80,2% da árvore atual. Retirá-los de uma versão futura deixaria cerca de 75,42 MB de arquivos atuais, antes de outras otimizações. Isso não elimina automaticamente os blobs do histórico Git.
As capas em public/livros somam 1,87 MB; os textos estruturados em content/livros e content/livros-privado somam 4,03 MB. Não confundir com todos os livros de referência guardados fora do site.
A pasta content/idiomas tem 43,54 MB; design tem 11,03 MB; src tem 0,55 MB. Código-fonte não é o bundle final do navegador.

### MP3 por pasta de idioma
| Pasta | Públicos | Privados | MB |
|---|---:|---:|---:|
| br | 746 | 1806 | 45.86 |
| de | 664 | 1871 | 43.88 |
| en | 534 | 1873 | 53.29 |
| es | 906 | 1429 | 42.86 |
| fr | 479 | 1304 | 28.26 |
| it | 556 | 1440 | 35.00 |
| pt | 962 | 0 | 20.45 |
| ru | 657 | 1342 | 35.89 |

br e pt são pastas distintas de pt-BR. Não fundir automaticamente.
Maior MP3: 299.808 bytes. Média: 18.437 bytes. Zero arquivos MP3 vazios pela metainformação Git; não houve decodificação integral nem escuta de todos.
Duplicação binária: 11 grupos, 12 cópias excedentes, apenas **53.568 bytes** repetidos. Deduplicar isso não resolve o problema de crescimento.
Há **25 chaves idioma/nome presentes no público e no privado com bytes diferentes**. Isso não comprova colisão de hash de texto; pode refletir vozes ou gerações diferentes. Não mesclar por nome nem renomear IDs. Dois buckets ou prefixos de visibilidade distintos preservam a separação.

## Estado real dos serviços
- [Render Linvuu](https://dashboard.render.com/web/srv-db03818u01pc738mirig): serviço Node, branch main, plano **free**, região Virginia; /healthz configurado; nenhum disco persistente listado. buildPlan starter não é o plano de execução: serviceDetails.plan é free.
- render.yaml recomenda starter e npm ci, mas o painel executa free e npm install --legacy-peer-deps && npm run build. O blueprint opcional não foi aplicado como configuração efetiva. Corrigir divergência em etapa própria.
- Consulta de tráfego Render entre 12/10 e 19/10 retornou conjunto vazio. Não foi possível medir banda/fatura por essa resposta; isso NÃO significa zero uso.
- Cloudflare: zona ativa com proxy DNS; sem Worker Routes configuradas. R2 respondeu **403: Please enable R2 through the Cloudflare Dashboard**. A conexão tem escopos R2; reconectar não resolve essa habilitação.
- A ativação de R2 exige fluxo de assinatura no painel. Não foi ativada nesta auditoria.
- Cota exata de artifacts da conta GitHub não foi obtida. O erro de upload anterior comprova bloqueio naquele momento, não identifica sozinho todos os arquivos responsáveis. A ferramenta disponível recusou a listagem geral; nada foi apagado.

## Prioridades antes da migração
### P0 — Disponibilidade e robots
O Render documenta que Free hiberna e, nessa condição, responde robots.txt com disallow-all, sem acordar o serviço.
A regra Cloudflare atual manda robots/sitemap consultar sempre a origem e não há Worker Routes para servir versão independente.
As consultas sem cache realizadas nesta auditoria retornaram **200 e Allow: /** tanto em linvuu.com.br como em linvuu.onrender.com. Não houve reprodução de hibernação nem prova de que esse foi o motivo de eventos anteriores.
Plano: comparar custo de serviço sem hibernação com separar a camada pública do backend. Não fingir resolver disponibilidade total somente congelando robots numa CDN. Se houver camada estática, sitemap deve acompanhar as páginas públicas válidas.
Nenhum upgrade automático. Verificação de cobrança e alternativa concreta precedem decisão.

### P1 — Cache dos índices
A Cache Rule atual impõe Edge TTL 86.400 s a todo /audio/, inclusive index.json; o servidor pede 300 s para esses índices.
Separar regras: índice/manifesto com até 300 s ou revalidação; MP3 versionado com cache longo. Não usar índice de um dia para instalar uma nova leva.
Nomes atuais são hash do TEXTO, não de texto+voz+modelo. Trocar a voz mantendo o nome pode deixar clientes ouvindo o arquivo anterior em cache imutável por um ano.
Planejar revisão no caminho/base ou parâmetro da URL, preservando o nome original e os IDs. Manifesto registra voz/modelo/versão/hash do conteúdo; não sobrescrever produção sem estratégia de cache e rollback.

## Arquitetura proposta
1. **GitHub:** código, JSON, scripts e manifestos pequenos. Artifacts de CI com retenção curta e upload de APK apenas quando houver candidato útil para instalar.
2. **Render:** aplicação, autenticação e autorização; sem síntese TTS pesada e sem usar disco efêmero como cópia única de mídia.
3. **R2 Standard público:** somente material já autorizado como público, via domínio próprio proposto media.linvuu.com.br, ainda não criado. r2.dev é para desenvolvimento, não produção.
4. **R2 privado:** material pago com acesso público desabilitado; sem domínio público direto nem r2.dev. O servidor valida conta e acesso antes de liberar URL assinada curta, ou um Worker autenticado realiza a entrega. Não expor todos os áudios pagos para simplificar a CDN.
5. **Máquina de geração e backup independente:** modelos de voz, dependências, WAV mestre e saídas ainda não aprovadas; nenhuma dessas ferramentas dentro do APK.
6. **Android:** conteúdo e áudio sob demanda; download por unidade, tamanho visível, quota, integridade, limpeza e isolamento de contas. Não baixar todos os 305 MB na instalação.

Para áudio público, o cliente já aceita VITE_AUDIO_BASE_URL. Usar piloto com base alternativa, mantendo os endereços antigos funcionando durante a transição.
Para privado, /api/audio hoje retorna MP3 autenticado, não JSON. Não trocar silenciosamente esse contrato por URL.
Uma evolução compatível pode acrescentar endpoint autenticado de URL temporária; manter a rota antiga durante atualização dos clientes. Negação de acesso não pode ser contornada por fallback público.
URLs assinadas R2 usam o domínio S3 e não o domínio próprio. Tratá-las como credenciais temporárias, sem registrar query de assinatura em logs.
Preservar GET/HEAD e Range/206, audio/mpeg, tamanho e hash. CORS permite somente origens efetivamente usadas pela web/Capacitor, incluindo https://localhost observado. Validar origens adicionais antes de ampliar; não usar curinga como solução.
Separar conta/visibilidade também nos caches. URL assinada pode ser reutilizada até expirar; revogação e autorização offline precisam de prazos definidos, sem prometer DRM absoluto.

## Custos e escala: hipóteses explícitas
Pela tabela oficial consultada, R2 Standard inclui 10 GB-mês, 1 milhão de operações A e 10 milhões B por mês; saída de dados do R2 não tem tarifa de egress. Excedentes, Workers e outros serviços têm cobrança própria.
O conjunto atual de áudio é aproximadamente 0,306 GB: cabe na franquia de ARMAZENAMENTO, mas isso não garante fatura total zero. Os volumes não representam o uso já existente de outros produtos da conta.
Exemplo teórico com média atual de 18.437 bytes/MP3, 100 reproduções por aluno/dia e 30 dias:
| Alunos ativos/dia | Reproduções/mês | Transferência de MP3/mês |
|---:|---:|---:|
| 100 | 300 mil | 5,53 GB |
| 1.000 | 3 milhões | 55,31 GB |
| 10.000 | 30 milhões | 553,10 GB |
Isso não é medição de público real. Cache do dispositivo/CDN reduz leituras na origem; HEAD, tentativas, Range e endpoints de autorização podem aumentar requisições.
Dez vezes o áudio atual seriam cerca de 3,05 GB por versão. Backups e várias versões somam armazenamento; manter política de retenção.
A fila de 915 itens em CSV é distinta dos 16.569 MP3 existentes. Reconciliar referências e revisão antes de gerar ou contabilizar tudo como faltante.

## Etapas de execução posteriores
| Etapa | Entrega e condição |
|---|---|
| 1 | Resolver estratégia de disponibilidade do Render e o risco de robots; conferir orçamento antes de qualquer plano pago |
| 2 | Preparar manifesto com origem, visibilidade, idioma, nome, tamanho, hash e versão; registrar as 25 sobreposições; corrigir plano de cache em branch |
| 3 | Após habilitação de R2, piloto só com uma unidade pública; copiar, não mover; comparar tamanho/hash e testar web/Android/CORS/Range |
| 4 | Validar autorização privada e URL curta com usuários autorizado, anônimo e sem acesso; não liberar produção sem esses testes |
| 5 | Migração gradual por idioma, observação de erros/latência e configuração de rollback; preservar origem antiga durante estabilização |
| 6 | Somente após verificação e backup independente, remover cópias antigas da árvore atual. Reescrever histórico Git seria tarefa separada e coordenada, nunca limpeza automática |
| 7 | Retenção de artifacts e frequência de builds ajustadas à necessidade. Não contratar mais cota antes de identificar uso real |

Rollback: reverter configuração de base de mídia e versão do manifesto para origem anterior. Não apagar a origem no mesmo passo em que se troca o destino.
A ativação e publicação não fazem parte desta rodada de medição e planejamento.

## Reproduzir
scripts/medir-arquivos-git.mjs usa git ls-tree, sem baixar áudios nem ler conteúdo dos arquivos:
    node scripts/medir-arquivos-git.mjs HEAD
    node scripts/medir-arquivos-git.mjs 1b7687bf61e93d9ba0ac590e2adf1e5948d2e85c
Executar num clone que contenha o commit. JSON anexo preserva medição por categoria e idioma.
O inventário foi obtido por árvores GitHub sem truncamento. Histórico Git, consumo real de disco/banda Render, tráfego Cloudflare, tamanho final do APK e peso inicial da home não foram medidos.

## Fontes
- [Render Free: limites, disco e robots](https://render.com/docs/free)
- [Cloudflare R2: preços](https://developers.cloudflare.com/r2/pricing/)
- [R2: ativação](https://developers.cloudflare.com/r2/get-started/)
- [R2: buckets públicos e domínio](https://developers.cloudflare.com/r2/buckets/public-buckets/)
- [R2: URLs assinadas](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)
- [R2: CORS](https://developers.cloudflare.com/r2/buckets/cors/)
- [GitHub Actions: armazenamento e atualização da medição](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
