# Livros em inglês (linvuu.com) — o que existe e o que falta

> Ordem do Felipe, 19/11/2026: o linvuu.com é o **espelho** do linvuu.com.br (mesmo esqueleto, desenho, cabeçalho,
> rodapé, descrições e rotas), em inglês. A única coisa que **não** se espelha é a explicação de língua (aulas,
> gramáticas, livros): cada domínio mostra só o que foi escrito na língua dele.

## O que existe hoje

| Livro | Escrito em | Para quem | Domínio | Rota |
|---|---|---|---|---|
| **Olá Portuguese** — Brazilian Portuguese, practical grammar, Volume 1 (A1–A2), 14 lições | inglês | quem fala inglês e aprende português | **só linvuu.com** | `/livros/br` (capítulos 1 e 2 grátis) |
| Inglês, Espanhol, Alemão, Francês, Italiano, Russo (Volume 1, A1–A2) | português | quem fala português | **só linvuu.com.br** | `/livros/<id>` |

- O livro de português para estrangeiros **nunca** aparece no .com.br: `linvuu.com.br/livros/br` responde 301 para o .com
  (regra em `server/dominio.ts`, testada em `scripts/testar-dominio.ts` e `scripts/testar-http-seo.ts`).
- Os livros em português **nunca** aparecem no .com: `linvuu.com/livros/<id>` (id ≠ br) responde 301 para o .com.br.
- `/livros` existe nos dois domínios, cada um com a sua coleção (`livrosDoSite` em `src/lib/livros.ts`); hreflang en ↔ pt-BR.
- Capítulos 1–2: `content/livros/br/cap-01.json`, `cap-02.json` e `sumario.json`, extraídos do PDF por
  `scripts/livros/extrair_pdf_br.py` (o PDF não entra no repositório). Travados em `content/travas-en.json`.
- Capa: `public/livros/br-a1-a2-v1-600.webp` e `-900.webp` (capa da edição em inglês). O fundo do cartão
  do curso (`public/assets/catalogo/br.webp`) é o Cristo Redentor da mesma capa, em traço de lápis.

## O que falta — **só** os livros em inglês para quem fala inglês

Ainda **não existem** e por isso **não aparecem** no .com (nem como "em breve" — seção sem conteúdo não renderiza):

- Russian for English speakers (livro)
- French for English speakers (livro)
- German for English speakers (livro)
- Spanish for English speakers (livro)
- Italian for English speakers (livro)

Os **cursos** desses idiomas já existem no .com com explicação em inglês (italiano ainda parcial: ver a tabela de
catálogo do `CLAUDE.md`). O que falta é **apenas** o livro.

## Como publicar um livro em inglês quando ele existir

1. Extrair os capítulos 1–2 e o sumário para `content/livros/<id>-en/` (ou outro id próprio — **não** reutilize
   `content/livros/<id>/`, que é o livro em português do .com.br).
2. Acrescentar o livro a `LIVROS_META_EN` em `src/lib/livros.ts` (título ≤ 60 e descrição 120–160 caracteres:
   `scripts/testar-titulos.ts` confere).
3. Ajustar `server/dominio.ts` e `scripts/seo.mjs` para o novo id morar só no .com.
4. Capa em `public/livros/`, `node scripts/travas-en.mjs --atualizar`, `npm run audit:rotas-dominios -- --atualizar-mapa`.
5. Só então o cartão do curso no .com mostra "Book · 2 free chapters" (`LivroDoCurso` em `src/components/CursoCard.tsx`).
