# Linvuu: guia de marca (kit completo)

Este guia é suficiente para produzir qualquer peça da Linvuu sem depender de nenhuma ferramenta, IA ou pessoa específica. Quem for criar algo (mapa mental, aula, post, slide, certificado, capa, página) deve ler este arquivo inteiro e usar os arquivos da pasta `marca/` em vez de escolher cores, fontes ou espaçamentos por conta própria.

Arquivos desta pasta:
- `MARCA.md`: este guia (regras, decisões e motivos).
- `tokens.json`: os mesmos valores em formato de dados, para ferramentas de design e geradores.
- `linvuu.css`: o CSS pronto, com tokens, tipografia, componentes didáticos e regras de impressão A4.
- `modelos/`: páginas em branco com a marca: `folha-aula-a4.html`, `mapa-mental-a4.html` e `folha-branca-a4.html`.
- `assets/`: logotipo, símbolo e avatar aprovados.

Como usar em qualquer ferramenta: cole este arquivo inteiro, depois peça a peça. Se a ferramenta aceita arquivos, anexe `linvuu.css` e `tokens.json`. Se só aceita texto, cole os valores da seção 3 e da seção 4.

---

## 1. Identidade

**Quem somos.** Plataforma de idiomas para brasileiros adultos que querem morar, trabalhar, estudar ou viajar para fora. Ensinamos a falar de verdade: gramática clara, sessões de 30 minutos, áudio em cada frase, prática oral em toda aula.

**Frase de assinatura:** "Fale de verdade."
**Frase de apoio:** "Idiomas para quem vai viver fora."

**Tom.** Confiante, culto e direto. Como um professor experiente que respeita o aluno. Frases curtas, verbos fortes, sem exclamação, sem ironia vazia.

**O que nunca dizer** (sem prova documentada, não entra em peça nenhuma):
- "melhor que" qualquer concorrente, ou o nome de um concorrente;
- "professores nativos", "oficial", "reconhecido pelo governo", "garantido", "em X semanas";
- "áudio profissional" ou "voz nativa" enquanto o áudio for sintético;
- "gamificação", "pontos", "sequência" como atrativo principal. O progresso é mostrado pelo que o aluno acertou e errou, por tópico.

**Visual em uma frase:** editorial, sóbrio, muito espaço em branco, tipografia serifada forte, uma única cor de destaque tipo caneta (ocre) usada só em traços.

**Proibido:** gradiente roxo ou azul, ilustração 3D, estilo "Corporate Memphis", bandeiras, símbolos turísticos (matrioska, castelo, torre, Cristo Redentor), emoji em peça da marca, fontes de sistema, fotos de estoque sorridente, cara de template gerado por IA, "tudo colorido" com 6 cores.

**O mascote (Vuu).** O Vuu é a cara do marketing e do produto da Linvuu: pode protagonizar peças de marketing e de conteúdo — redes sociais (reels e carrosséis), campanhas, capas de conteúdo e áreas de produto do site e do app. O que o Vuu não faz é substituir o núcleo institucional da marca: logotipo, avatar, favicon e a identidade legal e de rodapé continuam a ser o símbolo L, sem mascote. E há um limite de legibilidade, que é fato medido e não gosto: os estados de expressão do Vuu só se distinguem a partir de 96 px, portanto ele nunca aparece menor do que isso.

---

## 2. Logotipo e símbolo

**Arquivos (em `assets/`):**
- `linvuu-logo.png`: logotipo horizontal (760 × 200, fundo transparente).
- `linvuu-mark.png`: símbolo quadrado (256 × 256), L em creme sobre verde com sublinhado ocre.
- `avatar-1080.png`: símbolo em 1080 × 1080 para avatares e ícones.

**Descrição do símbolo.** Uma letra L serifada em creme (`#F5F1E8`) sobre o verde floresta (`#1E3B2F`). Um traço ocre (`#B7791F`), levemente irregular, desenhado como se fosse caneta, corre por baixo da letra. Esse traço é a barra de progresso da marca.

**Área de proteção.** Mantenha ao redor do logotipo um espaço livre igual à altura da letra "L" do símbolo. Nada encosta na marca.

**Tamanho mínimo.** Logotipo: 24 px de altura na tela, 12 mm na impressão. Símbolo: 24 px na tela, 8 mm na impressão.

**Versões aprovadas:**
- verde floresta sobre papel (padrão);
- papel sobre verde floresta (sobre fundos escuros);
- grafite monocromático (documentos em preto e branco).

**Não fazer:** girar, esticar, mudar a cor do traço ocre para outra cor, colocar sombra, contorno, gradiente, moldura, ou escrever "Linvuu" em outra fonte que não seja a do logotipo.

---

## 3. Cores

Só quatro cores de marca. Qualquer outra cor é derivada delas (mistura ou tom mais claro/escuro), nunca uma cor nova.

| Nome | Hex | Uso |
|---|---|---|
| Verde floresta | `#1E3B2F` | cor de marca: fundos de destaque, títulos de bloco, botões principais |
| Papel | `#F5F1E8` | fundo padrão de todas as peças |
| Grafite | `#1D1F1C` | texto principal |
| Ocre queimado | `#B7791F` | **apenas traços e linhas** (barra de progresso, sublinhados, separadores). Nunca texto, nunca fundo grande. |

**Derivados permitidos** (já definidos em `linvuu.css`):
- Verde: `#152A21` (hover, texto escuro), `#2D4D3F`, `#C9D3C9` (texto sobre verde, secundário), `#E4E6DA` (fundo de sucesso).
- Papel: `#FAF8F2` (cartão elevado), `#EAE4D6` (fundo recuado, tabela zebrada), `#DCD5C4` (borda).
- Grafite: `#3E403B` (texto secundário), `#5C5E57` (legenda, texto de apoio).
- Ocre: `#94611A` (linha mais forte, só traço), `#EFDFC2` (realce de fundo, usado com moderação).

**Única cor fora da paleta:** tijolo `#8C2F1E` para erro em exercício (fundo `#F2DED6`). Uso mínimo, só em resposta errada.

**Contraste.** Texto sobre papel: grafite (`#1D1F1C`) ou grafite-80. Texto sobre verde: papel ou `#C9D3C9`. Nunca texto ocre; nunca texto cinza mais claro que `#5C5E57` sobre papel.

**Proporção sugerida** numa página: 70% papel, 20% grafite, 8% verde, 2% ocre.

---

## 4. Tipografia

Três famílias de marca, mais uma de apoio:

| Papel | Família | Quando usar |
|---|---|---|
| Títulos e destaque | **Newsreader** (variável, `opsz` 72 para títulos grandes, 24 para texto) | títulos, nomes de bloco, frases de capa |
| Corpo e interface | **Source Sans 3** | texto corrido, tabelas, legendas, botões, rótulos |
| Idioma-alvo | **Literata** | palavras e frases do idioma que se aprende, especialmente cirílico (Newsreader não tem cirílico) |
| Manuscrito (uso raro) | **Caveat** | só em assinatura, nota de próprio punho e rubrica de certificado |

**Escala (px, desktop; no celular reduzir 15–20%):**

| Nome | Tamanho | Família | Peso | Tracking | Altura de linha |
|---|---|---|---|---|---|
| display XL | 96 | Newsreader | 600 | −0,025em | 1,02 |
| display L | 72 | Newsreader | 600 | −0,025em | 1,02 |
| display M | 56 | Newsreader | 600 | −0,025em | 1,02 |
| h1 | 44 | Newsreader | 600 | −0,015em | 1,12 |
| h2 | 34 | Newsreader | 600 | −0,015em | 1,12 |
| h3 | 24 | Newsreader | 600 | −0,015em | 1,12 |
| h4 | 19 | Newsreader | 600 | −0,015em | 1,12 |
| lead | 20 | Source Sans 3 | 400 | 0 | 1,6 |
| corpo | 17 | Source Sans 3 | 400 | 0 | 1,6 |
| legenda | 15 | Source Sans 3 | 400 | 0 | 1,6 |
| nota | 14 | Source Sans 3 | 400 | 0 | 1,6 |
| eyebrow | 13 | Source Sans 3 | 600 | +0,14em, maiúsculas | 1,3 |
| idioma-alvo | 22 (grande: 30) | Literata | 400 | 0 | 1,5 |

**Regras de texto:**
- Texto explicativo sempre em português do Brasil (por enquanto). Texto no idioma que se aprende vem separado e em Literata.
- Ao lado de cada palavra do idioma-alvo, a tradução em português em Source Sans 3, menor e em grafite-65.
- Não justificar texto (alinhado à esquerda). Não usar itálico em Newsreader para ênfase; use peso ou cor.
- Números de passo e de exercício em Source Sans 3, peso 700.
- Não usar mais de duas famílias por peça (Newsreader e Source Sans 3). Literata só aparece quando há idioma-alvo com cirílico ou quando o idioma pede.

---

## 5. Espaço, grid e formato

**Escala de espaço (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Use só esses valores.

**Grid.** Largura máxima 1200 px no site. Colunas de 12. Gutter 24 px. Texto corrido com no máximo 68 caracteres por linha.

**Margens em impressão A4 (210 × 297 mm):** 18 mm em todos os lados. Sangria de 3 mm em capas.

**Cantos:** quadrados. Raio máximo 4 px, só em controles (botões, campos). Cartões sem raio e sem sombra.

**Sombras:** só em elementos flutuantes (menu, popover). Nunca em cartão de conteúdo.

**Bordas:** 1 px, cor `rgba(29,31,28,.14)` para separação comum; `rgba(29,31,28,.58)` para campos de formulário (contraste 3:1).

**Movimento:** curto e discreto (120–250 ms). Nada de animação que atrapalha a leitura.

---

## 6. Elementos de assinatura

### 6.1 Barra de progresso desenhada à mão
É o elemento que diferencia a marca. Um traço ocre, levemente irregular, como se tivesse sido riscado com caneta. Começa curto e cresce. Representa evolução de quem estuda.

- Usar em: rodapé de capa, progresso de nível, divisor de seção, sublinhado de título de capa.
- Nunca usar como barra perfeita e vetorial. A irregularidade é parte da marca.
- Versão em SVG (`linvuu.css` traz a classe `.lv-progresso`, que mostra a barra com preenchimento proporcional ao valor de `--nivel`):

```html
<svg class="lv-progresso-svg" viewBox="0 0 400 18" aria-hidden="true">
  <path d="M4 11 C 70 8, 140 14, 210 10 S 340 12, 396 7"
        fill="none" stroke="#B7791F" stroke-width="5" stroke-linecap="round"/>
</svg>
```

### 6.2 Bloco de passo (PASSO 1, PASSO 2…)
Toda explicação de gramática começa em passos numerados, antes de qualquer termo técnico. Cada passo tem um número grande em verde, um título curto em Newsreader e um parágrafo.

### 6.3 Quadro "como é em português"
Sempre que houver comparação entre o português e o idioma-alvo, use o quadro `comparacao`: duas colunas, coluna da esquerda com o português, coluna da direita com o idioma-alvo, e uma linha final com a diferença em uma frase.

### 6.4 Erros típicos de brasileiros
Tabela de três colunas: **errado**, **certo**, **por quê**. Erro em tijolo, certo em verde. Sempre pelo menos três linhas quando a aula tem tema de erro.

### 6.5 Dica e atenção
- **Dica:** fundo `--papel-claro`, borda esquerda de 3 px em verde, rótulo "DICA" em eyebrow.
- **Atenção:** fundo `--tijolo-claro`, borda esquerda de 3 px em tijolo, rótulo "ATENÇÃO" em eyebrow. Só para erros reais que custam caro ao aluno.

### 6.6 Exercício e resposta
Todo exercício tem a resposta e uma explicação. Nunca responder só "certo" ou "errado". Enunciado em Source Sans 3; alternativas em blocos com borda de 1 px; resposta correta com marca de verde; resposta errada com tijolo.

### 6.7 Mapa mental
- Nó central: caixa verde floresta, título em Newsreader 600, papel em cima.
- Nós de primeiro nível: caixa papel-claro com borda de 1 px verde, texto grafite.
- Nós de segundo nível: texto simples, sem caixa, com um traço ocre ligando ao nó pai.
- Ligações: linhas de 1 px em grafite-50 ou o traço ocre para destaque. Sem curvas decorativas.
- Ler de cima para baixo ou da esquerda para a direita. Máximo de 5 ramos principais.

### 6.8 Mapa mental elaborado (A4 paisagem)
Use quando o tema tem categorias e exemplos (gênero, caso, plural, exceções). Modelo: `modelos/mapa-mental-elaborado-a4.html`.
- Nó central no meio, em caixa verde floresta.
- Até 5 ramos: 3 à esquerda e 2 à direita, ou 2 e 3. Cada ramo tem número em círculo verde, título em Newsreader 600 e subitens com traço ocre à esquerda.
- Subitens curtos: uma regra ou um exemplo por linha. Se o ramo passar de 4 linhas, separe em outro ramo ou leve para uma tabela.
- Exemplos em idioma-alvo com a fonte Literata; o resto em Source Sans 3.
- Caber em uma folha: verificar no PDF impresso. Se a última linha sair da página, encurte o texto antes de reduzir a fonte.

### 6.9 Tabela de matriz (casos, declinações, conjugações)
Use quando a informação cruza duas dimensões (gênero × número, pessoa × tempo). Componente `.lv-matriz` em `linvuu.css`; modelo: `modelos/tabela-caso-a4.html`.
- Cabeçalho em duas camadas: grupo em verde floresta; subcolunas em verde-700.
- Rótulo vertical à esquerda (`.lv-rotulo` + `.lv-rotulo-vertical`) para o agrupamento principal (ex.: Masculino, Feminino, Neutro, Plural).
- Faixas alternadas de papel-claro e papel-escuro, para ler a linha inteira.
- O termo que muda (a terminação) em negrito com traço ocre embaixo (`.lv-termo`). O traço é linha, então é permitido.
- Exemplos em idioma-alvo com `.lv-celula-exemplo`.
- Exceções em tabela própria, pequena, abaixo da tabela principal. Nunca misturar exceção com regra.
- Acento tônico: grafite em negrito com o acento gráfico (́). Nunca vermelho: vermelho no kit é só para resposta errada.
- Nota de rodapé em `.lv-matriz-nota` quando a tabela pede explicação do acento ou da exceção.

---

## 7. Estrutura de material didático

Esta é a régua pedagógica (ver também `docs/PADRAO-LINVUU.md`):

1. **Aula = 4 sessões de 30 minutos.** Soma dos blocos de cada sessão = 30 minutos.
2. **Ordem de uma sessão:** revisão do que veio antes, vocabulário com áudio, explicação em passos, prática (ouvir, lacuna, ordenar), produção (falar ou escrever).
3. **Explicação antes do termo técnico.** Primeiro o exemplo, depois o nome.
4. **Regra útil, não lista de exceções.** Cada regra com pelo menos dois exemplos prontos.
5. **Exemplos originais.** Livros servem para conferir fatos, nunca para copiar.
6. **Revisão no fim.** Uma pergunta de cada aula anterior, em forma de exercício.
7. **Certificado de nível** ao final de A1, A2 e B1, com a frase "não é oficial" escrita nele.

---

## 8. Modelos (pasta `modelos/`)

- `folha-aula-a4.html`: folha de aula A4, com título, objetivo, passos, comparação, erros típicos, dica, exercícios com resposta e rodapé. Pronta para imprimir ou exportar para PDF.
- `mapa-mental-a4.html`: mapa mental A4 paisagem, com nó central, cinco ramos e subnós (versão simples).
- `mapa-mental-elaborado-a4.html`: mapa mental A4 paisagem com ramos numerados, subitens com exemplos e traço ocre (ver 6.8).
- `tabela-caso-a4.html`: folha A4 com tabela de matriz (gênero × número), rótulo vertical, exceções e acento tônico (ver 6.9).
- `tabela-preposicional-a4.html`: tabela completa do caso preposicional (terminações por gênero, exemplos no nominativo e no preposicional, plural mesclado e exceções em singular e plural). A tabela ocupa duas folhas na impressão; as exceções vão para a segunda.
- `folha-branca-a4.html`: página em branco com cabeçalho, rodapé e área de texto na marca, para escrever o que vier.

Como imprimir ou salvar em PDF: abrir no navegador, `Ctrl+P` (Windows) ou `Cmd+P` (Mac), tamanho A4, margens padrão, gráficos de fundo ativados.

---

## 9. Checklist antes de publicar qualquer peça

- [ ] Só as quatro cores de marca e seus derivados.
- [ ] Newsreader para títulos, Source Sans 3 para corpo, Literata para idioma-alvo quando necessário.
- [ ] Ocre apenas em traços e linhas (inclui sublinhado de termo e borda de subitem).
- [ ] Acento tônico em grafite, nunca em vermelho.
- [ ] Nenhuma promessa sem prova ("melhor que", "oficial", "garantido", "nativo").
- [ ] Nenhum nome de concorrente.
- [ ] Nenhum emoji, nenhuma bandeira, nenhuma ilustração 3D.
- [ ] Vuu só em marketing, conteúdo e áreas de produto, sempre com 96 px ou mais; logotipo, avatar, favicon e rodapé legal sempre com o símbolo L, sem mascote.
- [ ] Logotipo com área de proteção e tamanho mínimo.
- [ ] Texto explicativo em português; idioma-alvo separado.
- [ ] Exercícios com resposta e explicação.
- [ ] Certificado com a frase "não é uma certificação oficial".
- [ ] Teste em celular (16 px de margem lateral, sem rolagem horizontal) e em impressão A4.

---

## 10. Idiomas (português, espanhol e inglês)

Hoje a marca e os materiais estão em português. A tradução para espanhol e inglês virá depois (ver `docs/FUTURAS-MUDANCAS.md`). Para isso já valem estas regras:
- Os mesmos tokens e fontes servem para qualquer idioma. Não criar um visual por idioma.
- Textos ficam em arquivos separados, com chave por idioma. O layout não pode depender do tamanho do texto.
- Caracteres especiais (ç, ñ, acentos, cirílico) são responsabilidade da fonte; teste cada idioma antes de publicar.

---

## 11. Onde estão as decisões

- Paleta e tipografia aprovadas: `src/tokens.css` (2026-10-07) e `docs/BRIEFING-DESIGN.md`.
- Padrão pedagógico: `docs/PADRAO-LINVUU.md`.
- Regras de publicação e de promessa: `docs/COBRANCA-APP.md` (seção de promessas) e `docs/LANCAMENTO.md`.
- Este kit é a versão portátil dessas decisões. Se algo aqui contradizer `src/tokens.css`, o arquivo `src/tokens.css` vence e este guia deve ser atualizado.
