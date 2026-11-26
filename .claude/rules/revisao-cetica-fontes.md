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

## Bloqueios obrigatórios aprendidos na auditoria 001–048
Valem para todo autor e todo revisor paralelo, em qualquer idioma do .com.
- **Proibido marcar variante aceitável como erro.** Antes de rejeitar uma forma («dove è», «e mezzo», «con il», «anche io» na fala, «unico figlio» fora de expressão fixa), confirmar se é realmente agramatical ou só menos padrão/coloquial; se for só registro, dizer isso no `motivo` ou não usar como erro.
- **Proibido inventar erro de digitação.** Os `erros` refletem interferência real de falante de inglês (artigo, ordem, auxiliar, preposição, calque), nunca erros artificiais («Pessce», «librs», «gentila», «ogni il giorno») nem palavras válidas do idioma usadas como «erradas» («quanto» no lugar de «quando»).
- **Proibido contar sílabas no chute.** Separar as sílabas explicitamente antes de declarar a contagem (`ar-ri-ve-der-ci` = 5).
- **Proibido distrator homófono em exercício de áudio** (o aluno não ouve maiúscula nem acento) e **proibido 2 respostas defensáveis** em múltipla escolha. O auditor acusa o primeiro caso (`opcao-homofona-audio`).
- **Coerência entre dias da mesma trilha:** conferir que uma explicação não contradiz outro dia já escrito («stare» vs «Sono stanco», uso de «Prego», «di»/«da»).
- **Ferramentas:** `node scripts/render-revisao.mjs <curso> <lingua> <de> <ate>` para ler em texto limpo e `node scripts/auditar-pedagogia.mjs --curso <id> --lingua en --rigor` antes de entregar. Revisão paralela: um revisor por 10–12 dias, todos lidos linha por linha.
