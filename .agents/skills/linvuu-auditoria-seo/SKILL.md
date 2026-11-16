---
name: linvuu-auditoria-seo
description: Audita os dois domínios da Linvuu, sitemaps, robots.txt, canonicals, hreflang, HTML renderizado, indexabilidade e qualidade/segurança do código sem alterar produção.
---
# Linvuu · Skill de Auditoria de Código e SEO

## Escopo e precedência
Leia `AGENTS.md`, `PAINEL.md`, `docs/DOMINIOS.md`, `docs/DECISAO-SITE-INTERNACIONAL.md` e `docs/COORDENACAO-IA.md`. O estado atual deve ser confirmado em GitHub, deploy e HTTP; relatórios antigos são apenas histórico. Dois domínios: `https://linvuu.com.br` (pt-BR) e `https://linvuu.com` (en). Não recriar `/en` ou `/es` como páginas de idioma.

## Etapas obrigatórias
1. Identificar SHA da `main`, PRs abertos e SHA implantado. Não confundir versão local, branch, deploy, Search Console e índice do Google.
2. Ler `scripts/seo.mjs`, `src/lib/metaRota.ts`, `server/dominio.ts`, `scripts/testar-inventario-seo.ts` e os arquivos `public/{sitemap.xml,sitemap-global.xml,robots.txt,robots-global.txt}`. Gerar os artefatos em ambiente isolado e comparar a saída com o Git.
3. Consultar via GET (sem credenciais) em **ambos os domínios** `/robots.txt`, `/sitemap.xml`, `/sitemap-global.xml`, `/`, `/gramatica`, páginas de curso e amostras do sitemap. Registrar HTTP, content-type, host efetivo, redirecionamento e hash do conteúdo. Falha de rede = **não verificado**, nunca `200` presumido.
4. XML: validar parse, namespace `urlset` e `xhtml`, URLs absolutas HTTPS, unicidade, `lastmod` válido e não futuro, host de cada `loc` e correspondência entre `Sitemap:` no robots e sitemap servido.
5. Para cada `loc`: verificar resposta final 200, não redirecionada, canonical próprio, ausência de `noindex` (HTTP e meta), ausência de bloqueio por robots, título/H1/descrição e HTML renderizado. Identificar conteúdo duplicado, soft-404, páginas vazias e links internos.
6. Para cada par pt-BR/en: confirmar se há conteúdo de fato nos dois idiomas, `hreflang` recíproco no HTML e XML, `x-default` consistente, sem apontar para páginas `noindex`, tradução incompleta ou redirecionamento. Não retirar um `noindex` legítimo apenas para aumentar o número de URLs.
7. Cruzar URLs indexáveis de `src/lib/metaRota.ts` com os dois sitemaps (**nos dois sentidos**); comparar sitemap estático com a saída HTTP por host e com a execução React. Testar especialmente `/gramatica`, `/curso/{id}`, `/curso/{id}/dia/1`, `/materiais-gratuitos` e as páginas legais.
8. Consultar Search Console para ambas as propriedades se o conector tiver acesso: sitemaps enviados, data da última leitura, amostras de inspeção de URL, `googleCanonical`, exclusões e motivos. **Nunca** interpretar “0 indexadas” no contador de sitemap como prova de nenhuma URL indexada.
9. Executar as validações já existentes `node scripts/seo.mjs`, `node --import tsx scripts/testar-inventario-seo.ts`, `node --import tsx scripts/testar-titulos.ts`, `npm run lint` e testes pertinentes, em branch isolada. Evitar executar scripts com efeito de escrita em produção.
10. Segurança/qualidade: ESLint para JS/TS (se configurado), Semgrep e SonarQube onde disponíveis, Bandit apenas se houver Python; testar regras e configurações concretas. Não instalar nem copiar ferramenta de terceiros sem conferir licença. `google/robotstxt` para interpretação compatível com Google; LinkChecker/Scrapy para rastreamento; validador XML/XSD para sitemaps. Cada ferramenta tem uma finalidade distinta, não substituir evidência HTTP.
11. Entregar tabela **domínio | URL | esperado | observado | prova | gravidade | correção**, separando defeito de código, problema de deploy e atraso do Google. Registrar riscos, testes, SHA, reversão e estado em `docs/COORDENACAO-IA.md` no PR de correção.

## Gates de aprovação
- Dois `/robots.txt` apontam para o `/sitemap.xml` do próprio host.
- Cada sitemap servido contém apenas `loc` do host correto, sem canonical divergente, redirecionamentos, `noindex` ou bloqueio de rastreio.
- `hreflang` recíproco apenas entre páginas equivalentes reais.
- Conjunto de URLs = conjunto indexável do servidor/navegador; diferenças documentadas e justificadas.
- CI verde **e** produção conferida após deploy. “PR criado” não é “corrigido em produção”.

## Cuidados
Auditoria é somente leitura até que haja mudanças explicitamente planejadas em branch e PR. Não enviar reindexação, alterar DNS/Cloudflare, apagar páginas, mudar robots ou fazer merge automático sem testes. Nunca registrar tokens, dados pessoais ou cabeçalhos secretos.
