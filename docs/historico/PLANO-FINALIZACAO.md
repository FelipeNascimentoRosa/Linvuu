# Plano de finalização (18/10/2026) e lista do que falta

> **Arquivado em 11/11/2026 (lote 99).** Substituído por [`docs/plano/`](../plano/EXECUTAR.md) — o único plano em vigor. Mantido só como registro histórico; não execute a partir daqui.

Lançamento: **5/11/2026**. Foco Brasil. Sem geração de áudio nem mudança de pagamento até a decisão do Felipe.

## Estado em 18/10
- Exercícios: **todas as aulas de en, es, fr, it, de, ru estão com 40 ou mais** (padrão em `PADRAO-IDIOMAS.md`).
- Russo: 64 títulos de blocos renomeados (padrão: tema em português, termo russo entre «», sem " · ", sem «e mais N»); referências «Aula N» do livro trocadas pelas aulas certas; blocos de outro tema removidos das aulas 19, 22 e 30 (futuro, reflexivos/imperativo, horas/conectores/mapa de casos já têm aula própria: 23, 43, 32, 28, 33, 29); prefixo «Gramática:» tirado dos títulos de aula; traduções EN/ES dos títulos atualizadas.
- Dias (`dia-NNN.json`) regenerados de ru, de e en: antes não traziam os 40 exercícios.
- Diálogos e leituras de es, fr, it, de, ru estão **escritos** em `pendentes/` (nenhuma lacuna sem cobertura); só faltam áudio.

## Plano em quatro frentes
1. **Conteúdo (Claude, sem depender de ninguém):** feito o que cabia. Resta apenas reescrever, se o Felipe quiser, os títulos de aula do russo que ainda não seguem o padrão e conferir formas com biblioteca de morfologia.
2. **Áudio (decisão do Felipe):** escolher a voz (TTS), gerar os MP3, ativar os pendentes e o exercício «Repita». Sem isso, diálogo e leitura de 5 idiomas não aparecem.
3. **Revisão humana (Felipe e Luiza):** traduções e russo/alemão avançados; acento do russo; um falante nativo no A1/A2 antes de anunciar.
4. **Operação e site:** Cloudflare, Render, indexação, login real, preços, teste no aparelho.

## O que falta (lista completa)
### Conteúdo e produto
- Áudio a gravar: **só 915 clipes** (es 261 · fr 280 · it 224 · de 60 · ru 88 · br 2 · en 0), todos do conteúdo novo; o resto já existe. Os números «a gravar» do `aulas.mjs` são o total da lista, não o que falta. Lotes e guia em `docs/audio-chatgpt/`.
- Ativar os pendentes (diálogo + leitura): es 22/30 aulas, fr 24/34, it 16/35, de 60 leituras, ru 5 diálogos + 47 leituras (aulas sem diálogo/leitura hoje).
- Exercício «Repita» em todas as aulas (depende de áudio).
- Depois de ativar, o reforço automático pode elevar a média de exercícios; rodar `npm run complementos` e conferir.
- Personagens sem voz em de (`vozes.json`: Camila, Pedro, Lena, Herr Weber, Rezeption, Mitarbeiter); aviso do validador na aula 71 do alemão.
- Russo: aulas 4 («zero») e 5 (A1) com níveis diferentes no mesmo bloco inicial; títulos de aula a revisar (ex.: aula 3 «Eu e você» é quase toda de alfabeto); conferir formas com biblioteca de morfologia; particípios (причастия) ficam para o B2.
- Mapas livro→aula: faltam ru, de, en (fr e it prontos). Falta o volume 6 do «Russo sem Mestre» (lições 51 a 60) no repositório; já foi enviado nesta sessão, falta mapeá-lo.
- Conciliar a contagem de áudios entre o gerador e o plano.
- B2 e C1 de ru e de: próxima fase (decisão já tomada: até o B1 agora).

### Revisão humana
- Traduções e textos escritos pelo Claude (es, fr, it, de, ru, principalmente avançados): revisão por Felipe/Luiza antes de 5/11.
- Russo: acentuação (maior fonte de erro, no texto e no áudio) e falante nativo para A1/A2.
- Parecer jurídico sobre o uso dos livros de referência antes de vender.

### Site, infraestrutura e vendas
- Cloudflare: Cache Rule para `/robots.txt` e `/sitemap.xml` (Edge TTL 1 h). Felipe faz no painel (Caching → Cache Rules); o conector atual é só leitura.
- Render: `healthCheckPath=/healthz` (hoje vazio); avaliar plano pago (hoje free, dorme).
- Preços dos 4 planos.
- Teste no aparelho do PR #263 (continua rascunho).
- Remover `noindex` de `/assinatura` antes de 5/11.
- Pedir indexação manual da home no Search Console.
- Teste real de login.
- `METRICAS_TOKEN`.
- Política para bots de IA.
- Sem mascotes agora.
