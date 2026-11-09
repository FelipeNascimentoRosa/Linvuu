# Dois domínios: linvuu.com (internacional) e linvuu.com.br (Brasil) — 06/11/2026

**Estado:** implementado em branch/PR. Só vale como “no ar” depois de: merge, deploy conferido no Render e `linvuu.com` respondendo pelo Render com certificado válido. Conferir antes de afirmar.

## Decisão
Cada idioma mora num domínio. Um endereço, uma versão; nada de conteúdo duplicado.

| Idioma | Domínio | Endereço |
|---|---|---|
| Português | linvuu.com.br | `/…` |
| Inglês | linvuu.com | `/…` (raiz) |

O mesmo serviço do Render atende os dois. O servidor decide o “perfil” pelo `Host` (`server/dominio.ts`, `src/i18n/locales.ts`).
Fora dos dois domínios (desenvolvimento, `onrender.com`, app Android em `https://localhost`) vale a estrutura antiga `/` e `/en`; o APK não muda.

## O que o servidor faz
- `linvuu.com.br/en/...` e `/es/...` → 301 para o mesmo endereço em inglês no `.com` (o prefixo some do caminho). `/curso/br` → `linvuu.com/curso/br`.
- `linvuu.com/en/...` → 301 para a raiz (`/cursos` etc.). `www.` → domínio sem `www`, nos dois.
- canonical, `og:url`, JSON-LD e hreflang de cada página apontam para o domínio do idioma dela. O cluster hreflang cruza domínios (pt-BR → .com.br; en e es → .com). `x-default` = inglês.
- `/sitemap.xml` e `/robots.txt` por domínio (`sitemap-global.xml`, `robots-global.txt` no build; cada sitemap lista só URLs do próprio domínio).
- Checkout e portal do Stripe voltam para o domínio e idioma de onde o aluno veio (`success_url`, `return_url`).
- Trocar de idioma na barra do topo leva ao endereço absoluto do outro domínio.
- Na vitrine em inglês, a ordem passa a mostrar primeiro o que já está inteiro em inglês (português do Brasil, russo, francês).

## Passos de infraestrutura (fora do código)
1. Cloudflare: domínio `linvuu.com` comprado e na conta; DNS `linvuu.com` e `www` apontando para o mesmo destino do `.com.br` (proxied).
2. Render → serviço `linvuu` → Settings → Custom Domains: adicionar `linvuu.com` e `www.linvuu.com`; esperar o certificado.
3. Firebase → Authentication → Settings → Authorized domains: adicionar `linvuu.com`. Sem isso, login com Google e e-mail de redefinição falham no `.com`.
4. Só então fazer o merge. **Se o merge vier antes do passo 2, os endereços `/en` do `.com.br` redirecionam para um domínio que ainda não responde.**
5. Search Console: propriedade de domínio `sc-domain:linvuu.com` (verificação DNS na Cloudflare); enviar `https://linvuu.com/sitemap.xml`. No `.com.br`, reenviar `sitemap.xml` (agora só português).
6. Stripe: nenhuma mudança de preço, moeda ou webhook. O webhook segue em `linvuu.com.br`.

## Limites conhecidos
- Preços e cobrança continuam em R$ (BRL). Visitante estrangeiro vê R$; o cartão converte. Moeda local no checkout (Stripe Adaptive Pricing ou preços multimoeda) é decisão separada, não está neste PR.
- Contas Firebase são por origem: quem entra no `.com.br` e depois abre o `.com` precisa entrar de novo (a conta é a mesma; o armazenamento do navegador não cruza domínios). A assinatura segue a conta.
- Em inglês, só português do Brasil, russo e francês estão inteiros explicados; alemão, espanhol e italiano ficam fora da vitrine, do menu e da home do `.com` e aparecem só como “em breve, com explicações em inglês” até as aulas serem traduzidas (o sitemap já seguia essa regra).
- Os eventos de conversão do servidor (`server/conversoes.ts`) continuam usando `APP_URL` (.com.br) como origem.

## Como testar
`npm run build:website`, depois `node --import tsx scripts/testar-http-seo.ts` (5.676 páginas, com `Host` real dos dois domínios, redirecionamentos, sitemaps e robots), `scripts/testar-inventario-seo.ts`, `scripts/testar-paridade-meta.mjs http://127.0.0.1:4398` e o mesmo com `global` (navegador real, domínio `.com` simulado).

## Reversão
Reverter o PR devolve a estrutura `/en`, `/es` no `.com.br` (o código do site em espanhol continua no histórico do git). Se o `.com` já tiver sido indexado, manter os 301 do `.com` para o `.com.br` até o Google reprocessar.

## Decisão de 06/11/2026: sem site em espanhol
Felipe decidiu retirar o **site** em espanhol (interface e aulas explicadas em espanhol); o que saiu está no histórico do git. Permanecem o **curso de espanhol para falantes de português** (`/curso/es`, `content/idiomas/es`, `content/livros/es`) e a gramática dele. Saíram: `src/i18n/es.ts`, os textos `es` da interface, do APK e das páginas legais, `content/indice.es.json`, `content/gramatica/br.es.json`, `content/idiomas/br/es` e `content/idiomas/*/i18n/es`. A barra PT/EN/ES do topo foi removida (cada domínio tem um só idioma). `/es/...` em qualquer dos dois domínios redireciona 301 para o inglês na raiz do `.com`.
