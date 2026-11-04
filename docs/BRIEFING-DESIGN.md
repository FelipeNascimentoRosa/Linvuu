# Linvuu: briefings de design

Cada bloco entre ``` é para colar inteiro na ferramenta de design. Cole o bloco 0 primeiro (sistema) e depois uma peça por vez.

## 0. Sistema de marca (colar primeiro)

```
Marca: Linvuu. Plataforma de idiomas para brasileiros adultos que querem morar, trabalhar, estudar ou viajar fora. Progresso real, sem gamificação vazia. Sessões de 30 minutos, gramática clara, áudio em cada frase.

Paleta (usar só estas):
- Verde floresta #1E3B2F (marca)
- Papel off-white #F5F1E8 (fundo)
- Grafite #1D1F1C (texto)
- Ocre queimado #B7791F (apenas no traço da barra de progresso e em pequenos detalhes)

Tipografia: Newsreader (serifada, títulos, peso 600, tracking levemente negativo) e Source Sans 3 (corpo). Escala forte e hierárquica.

Elemento de assinatura: uma barra de progresso desenhada à mão, em traço riscado de caneta, que começa curta e cresce. Ela representa evolução e mudança de vida. Deve parecer feita por uma pessoa, com leve irregularidade, nunca perfeita nem vetorial fria.

Regras: visual editorial, quiet luxury, grid rigoroso, muito espaço em branco. Proibido: gradiente roxo/azul, ilustração 3D ou Corporate Memphis, bandeiras e símbolos turísticos (matrioska, castelo, torre), fontes de sistema, aparência de template de IA. O mascote (Vuu) pode protagonizar peças de marketing e de conteúdo e áreas de produto, sempre a 96 px ou mais; logotipo, avatar, favicon e identidade legal e de rodapé continuam a ser o símbolo L, sem mascote. Fotografia, se usada, deve ser real e de cultura ou cotidiano, nunca stock sorridente.

Tom: confiante, culto e direto. Nada de texto de vendedor de curso. Não afirmar nada que o produto não entrega (sem "professores nativos", "oficial", "garantido").
```

## 1. Logo

```
Redesenhe o logo da Linvuu. Entregar: (a) logotipo horizontal com a palavra "Linvuu" em Newsreader, (b) símbolo isolado quadrado para avatar, (c) versões em verde sobre off-white, off-white sobre verde e monocromática grafite.
Ideia: a letra inicial ou o traço sob a palavra forma uma barra de progresso riscada à mão, em ocre, que cresce da esquerda para a direita. Sutil, sem ícone de livro, balão de fala ou globo.
Legibilidade a 24 px de altura. Entregar SVG e PNG com fundo transparente.
```

## 2. Capa da apostila (A4, 210x297 mm, PDF, 300 dpi, sangria 3 mm)

```
Capa de apostila Linvuu, sistema único para todos os idiomas e níveis, variando só texto.
Fundo verde floresta. Margens de 18 mm.
Topo: logotipo Linvuu em off-white, pequeno.
Centro-alto: a palavra "olá" do idioma, no próprio alfabeto, escrita à mão em grande escala, off-white (Francês: Bonjour. Russo: Привет. Alemão: Hallo. Inglês: Hello).
Centro: nome do idioma em Newsreader, muito grande (ex.: "Francês"). Abaixo, em Source Sans 3: "Nível A1 · Aulas 1 a 18".
Abaixo: a barra de progresso riscada à mão em ocre. Ela está preenchida proporcionalmente ao nível: A1 curta, A2 média, B1 longa.
Rodapé: "linvuu.com.br".
Entregar um template editável com campos: idioma, saudação, nível, intervalo de aulas, comprimento da barra.
Lombada (para versão impressa futura): vertical, "Linvuu · Francês · A1".
```

## 3. Contracapa

```
Contracapa A4 da apostila Linvuu, off-white #F5F1E8 com texto grafite.
Título em Newsreader: "Fale de verdade."
Três blocos curtos em Source Sans 3: "Sessões de 30 minutos" / "Gramática clara, com tabelas" / "Áudio em cada frase".
Parágrafo: "Esta apostila acompanha o curso online da Linvuu. Cada aula tem quatro sessões e termina em prática oral. Estude no seu ritmo, volte quando precisar."
Nota pequena: "Material de estudo da Linvuu. O certificado de nível é emitido pela Linvuu e não substitui exames oficiais."
Rodapé: logo pequeno e "linvuu.com.br". Sem código de barras, sem selo "oficial", sem foto.
```

## 4. Certificado (A4 paisagem, PDF)

```
Certificado de conclusão de nível, A4 paisagem, off-white com moldura fina verde floresta e canto com traço de barra de progresso ocre cheia.
Título (Newsreader): "Certificado de conclusão".
Texto central: "A Linvuu certifica que [NOME COMPLETO] concluiu o nível [A1/A2/B1] do curso de [IDIOMA], com [N] aulas e [H] horas de estudo."
Data de emissão e assinatura "Linvuu" (assinatura tipográfica, sem rosto nem carimbo).
Rodapé obrigatório, legível: "Certificado de conclusão emitido pela Linvuu. Não é uma certificação oficial e não substitui exames de proficiência reconhecidos."
Campos variáveis em destaque para automação: nome, nível, idioma, número de aulas, horas, data.
```

Horas por nível (4 sessões de 30 min por aula = 2 h por aula): A1 com 18 aulas = 36 h; A2 com 20 aulas = 40 h; B1 com 24 aulas = 48 h (francês). Os outros idiomas têm números próprios: o gerador deve ler do conteúdo.

## 5. Redes sociais

```
Instagram e Facebook, avatar: símbolo da Linvuu, quadrado 1080x1080, centrado em círculo seguro.
Facebook capa: 820x312 px, conteúdo importante dentro de 640x312 (centro) para o celular. Verde floresta, logotipo off-white à esquerda, barra riscada ocre atravessando, frase "Fale de verdade."
LinkedIn capa: 1584x396 px, mesma ideia, mais sóbria, com "Idiomas para quem vai viver fora." em Source Sans 3.
YouTube banner: 2560x1440 px, área segura 1546x423 no centro, logotipo e "Fale de verdade."
Mesma identidade das peças anteriores. Sem foto de pessoas, sem emoji.
```

## Onde colocar cada coisa

1. **Formulário "Set up your design system":**
   - Campo "Company name and blurb": a primeira parte do texto sugerido no chat (marca, público e direção visual).
   - Link do GitHub: já está (`FelipeNascimentoRosa/Linvuu`).
   - Arquivos: suba `public/brand/linvuu-logo.png` e `linvuu-mark.png` como referência provisória.
   - Fontes: Newsreader e Source Sans 3 (livres).
2. **Depois que a ferramenta gerar as peças:** baixe os arquivos e anexe-os aqui no chat. Eu coloco no repositório assim:
   - Logo e símbolo (SVG/PNG): `public/brand/`
   - Capas, certificado, redes sociais: `public/brand/` (peças fixas) e `content/livros/` (templates das apostilas)
   - Cores e fontes: `src/styles.css`, trocando o laranja pelo verde floresta
3. **Certificado automático:** eu ligo o template ao nome, nível e idioma no site, depois de você aprovar o desenho.
