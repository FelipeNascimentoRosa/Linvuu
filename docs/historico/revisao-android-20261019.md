# Revisão Android — 19/10/2026

Escopo: PR #263 em rascunho, sem merge, sem deploy, sem ativar compras.

## Correções

- Catálogo específico do APK: busca e cobertura real por idioma de explicação; cursos sem adaptação aparecem em preparação. A página web mantém sua implementação.
- A aula bloqueada leva diretamente ao login preservando a rota de retorno. Conta autenticada sem acesso recebe mensagem específica.
- Ajustes fecham com Escape e devolvem o foco; o botão físico Android fecha o painel antes de voltar ou minimizar.
- Consulta de acesso pode ser repetida após falha; o hook limpa o estado anterior e sinaliza carregamento novamente.

## Validação

- TypeScript web e APK; isolamento de progresso entre visitante e duas contas.
- Builds separados: website 84,1 MiB; assets APK 5,4 MiB. Estes valores não são o tamanho do APK compilado.
- `scripts/revisar-apk.mjs`: prévia 320/390 px, PT/EN/ES, ajustes, aviso offline, assinatura sem checkout e ausência de exceções JS.
- `scripts/revisar-fluxos-apk.mjs`: catálogo, busca vazia, foco, cursos e primeira sessão nos idiomas disponíveis, retomada após recarregar, aula bloqueada com destino preservado e assinatura.
- O APK local de teste usa somente configuração pública do cliente Firebase, injetada durante o build, sem arquivo de credenciais no Git. Login Google via popup fica desativado no Android.

## Validação ainda necessária em aparelho

Instalação e abertura no Redmi; login real por e-mail; sincronização de progresso entre aparelhos; áudio remoto com CORS, interrupção/retomada e fones; botão físico voltar; teclado, safe areas, bloqueio de tela e reabertura do processo. Nenhuma compra real foi testada ou habilitada. Downloads offline de aulas/áudio ainda não estão implementados.

O build e a entrega do APK serão registrados separadamente depois de concluídos. A prévia no navegador não comprova comportamento nativo.
