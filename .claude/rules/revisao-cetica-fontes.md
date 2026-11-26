---
paths:
  - "content/idiomas/*/en/**"
  - "content/gramatica/*.en.json"
  - "fontes-publicas/**"
---
# Revisão cética e fontes públicas (.com)
Complementa a «Lei do .com» do `CLAUDE.md`. Fluxo editorial de todo lote do `.com`, em qualquer idioma.

## Papéis
1. **Fontes públicas verificadas** dão o lastro normativo e contrastivo. Ficam em `fontes-publicas/` (fora do Git; só `Public Domain`, `CC0` ou `CC BY` puro, lidos na página de direitos do próprio PDF). Nunca `NC`, `ND` ou `SA`; nunca coleções mistas nem itens em quarentena.
2. **Autor** (Gemini) escreve o lote nativamente para a L1 inglesa, só a partir de `scripts/ficha-alvo.mjs` e das fontes aprovadas. Nada de texto em português.
3. **Claude** é revisor pedagógico cético e engenheiro de integração: não aprova passivamente, aplica os arquivos, roda a CI e devolve o relatório.

## Checklist obrigatório (7 pontos, todo lote)
1. **Precisão normativa:** conferir cada `always`, `never`, `every` e `only` contra a gramática de referência; procurar contradição entre `explicacao` e `comparacao`.
2. **Zero mentalidade PT-BR:** nenhuma interferência de brasileiro, tradução literal ou menção a `Portuguese`/`Brazil` fora de diálogo legítimo.
3. **Simetria em `erros`:** `errado` e `certo` com o mesmo escopo sintático (`a la stazione → alla stazione`, nunca frase inteira contra fragmento).
4. **Distratores reais de anglófonos:** sem alternativas ambíguas (duas respostas aceitáveis) nem óbvias por tamanho ou formato.
5. **Respelling inequívoco** para inglês americano (sem notações ambíguas, como `che` para `keh`).
6. **Fidelidade ao inventário de áudio:** todo botão clicável (`dialogo`, `palavras`, `texto`, `exemplos`, `erros.certo`, `exercicios`) é literal da `ficha-alvo.mjs`; 0 botões novos sem MP3; `it-gravar.csv` inalterado.
7. **Sorteio cego:** o relatório da PR traz na íntegra o primeiro dia ímpar da última aula do lote, nunca uma amostra escolhida a dedo.

## Higiene
- PDFs e `.md` de terceiros nunca entram no Git. Em cada pasta de fonte, um `LICENCA.txt` com título, autor, ano/ISBN, licença lida no PDF, URL e «Adaptado pela Linvuu».
- Provas obrigatórias de cada PR de lote: `npm run audit:espelho` (Espelho e BrRef zerados), `auditar-pedagogia` (Vaza/RefPT/Placeh/GlsVaz/GlsPT = 0) e sitemaps em 57 e 30 URLs.
