---
name: carrossel-do-livro
description: Transforma uma aula ou capítulo de content/ da Linvuu em especificação JSON de um carrossel de 8 slides (pt-BR e en) para o Felipe aprovar antes de virar arte.
---

# Carrossel do livro

Entrada: caminho de uma aula/capítulo em `content/` e o idioma de explicação (pt-BR para o .com.br, en para o .com — a gramática é explicada na língua nativa do aluno; nunca misture).

Saída: um JSON, sem arte, para aprovação do Felipe:

```json
{ "fonte": "content/...", "idioma": "pt-BR", "slides": [
  { "n": 1, "tipo": "gancho", "texto": "..." },
  { "n": 2, "tipo": "problema", "texto": "..." },
  { "n": 3, "tipo": "regra-visual", "texto": "..." },
  { "n": 4, "tipo": "exemplo-contrastivo", "texto": "..." },
  { "n": 5, "tipo": "exemplo-contrastivo", "texto": "..." },
  { "n": 6, "tipo": "erro-comum", "texto": "..." },
  { "n": 7, "tipo": "resumo", "texto": "..." },
  { "n": 8, "tipo": "cta", "texto": "Duas primeiras aulas grátis, sem cartão — linvuu.com(.br)" }
] }
```

Regras:
- Use só frases, regras e exemplos que existem no arquivo de origem; nada inventado. Cite a fonte.
- Sem promessa de fluência, prazo, nota de exame, certificado ou número de alunos que não esteja comprovado.
- Preço só se for da tabela oficial (`docs/PRECOS-DEFINIDOS.md`) e na moeda do domínio.
- Vídeo/imagem: HyperFrames ou Playwright; nunca Remotion (licença).
- Entregar a especificação ao Felipe e esperar aprovação antes de gerar qualquer arte.
