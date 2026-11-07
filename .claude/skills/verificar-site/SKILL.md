---
name: verificar-site
description: Smoke único dos dois domínios da Linvuu (linvuu.com.br e linvuu.com): status, título no idioma do domínio, h1, JSON-LD e moeda do preço, local ou em produção. Use depois de um merge/deploy ou antes de pedir ordem de merge.
---

# Verificar site (smoke único)

Rode uma vez; não repita a mesma consulta esperando resultado diferente (um deploy `build_in_progress` não muda porque você pergunta de novo).

## Local (antes do merge)
1. `npm run build:website`
2. `node scripts/iniciar-servidor-lhci.mjs > /tmp/srv.log 2>&1 &` e espere `LINVUU_LHCI_READY` no log.
3. Para cada host (`linvuu.com`, `linvuu.com.br`) e cada rota abaixo: `curl -s -H "Host: <host>" http://127.0.0.1:4398<rota>`.
4. Derrube o servidor (`pkill -f iniciar-servidor-lhci`).

## Produção (depois do deploy)
Mesmas rotas em `https://<host><rota>` com `-A "Mozilla/5.0 (compatible; Googlebot/2.1)"`.

## Rotas
`/`, `/cursos`, `/curso/ru`, `/curso/ru/dia/1`, `/gramatica/ru`, `/assinatura`, `/entrar`, `/privacidade`, `/termos`, `/russo-online`, `/portugues` (só .com; no .com.br o esperado é 301 para o .com), `/livros` (só .com.br), `/llms.txt`.

## Conferir em cada página
- status 200 (ou o 301 esperado);
- `<title>` no idioma do domínio (pt-BR no .com.br, inglês no .com);
- exatamente um `<h1>` nas páginas indexáveis (`/entrar` não tem);
- blocos `application/ld+json` quando a rota tem dados estruturados;
- moeda: **nenhum "R$" em páginas do .com e nenhum "US$" no .com.br** (conteúdo de aula do curso de português cita reais como assunto: ignorar `/curso/br` e `/gramatica/br`).

## Saída
"12/12 OK por domínio" ou a lista exata do que falhou (host, rota, o que esperava, o que veio). Sem tabela de checks nem log.
