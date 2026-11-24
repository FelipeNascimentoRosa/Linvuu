# Indexação da primeira aula em cursos parcialmente traduzidos

Estado: correção local em validação; não implica deploy nem indexação pelo Google.

Em 24/11/2026, a produção de linvuu.com respondia /curso/it/dia/1 com noindex, embora a primeira aula do italiano conste como traduzida em content/indice.en.json e os arquivos das primeiras oito sessões existam em inglês. A regra anterior exigia a tradução integral do curso para indexar a primeira sessão. O domínio brasileiro já listava a amostra correspondente.

Esta mudança avalia a tradução da própria aula para a primeira sessão, preservando noindex das demais sessões e dos materiais que não satisfazem as regras existentes. O gerador adiciona a URL ao sitemap internacional e os hreflang correspondentes nos dois sitemaps. Não muda autenticação, proteção do conteúdo pago, conteúdo, escolha de idioma ou redirecionamentos.

A gramática italiana em inglês não é liberada: content/gramatica/it.en.json registra 60 aulas sem tradução e inclui trechos em português. A tradução parcial e suas implicações para o restante da experiência permanecem para auditoria. O índice completo no Google depende do rastreamento e da escolha do Google.

Reversão: reverter os arquivos do PR e gerar os sitemaps novamente. Confirme os testes do PR, a publicação do Render e as respostas em ambos os domínios antes de informar que está em produção.
