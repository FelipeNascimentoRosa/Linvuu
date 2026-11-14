# Paleta visual — linvuu.com.br

Inventário extraído de `src/tokens.css` em 14/11/2026. As quatro cores de marca são floresta, papel, grafite e ocre; os demais tokens são derivados ou cores de aplicação existentes, não autorização para acrescentar uma paleta sem revisão. Valores e usos são os do código inspecionado.

## Cores de marca

| Cor | Valor | Uso indicado |
|---|---|---|
| Verde floresta | `#1E3B2F` | Marca, títulos e ações |
| Papel | `#F3F2EE` | Fundo principal atual |
| Grafite | `#1D1F1C` | Texto principal |
| Ocre | `#B7791F` | Traços, linhas e detalhes; não texto |

## Contrastes de referência

Valores calculados com WCAG para cores sólidas; imagens e transparências exigem medição na composição real.

| Texto | Fundo | Razão |
|---|---|---:|
| `#1E3B2F` | `#F3F2EE` | 10.89:1 |
| `#1D1F1C` | `#FBFAF7` | 15.90:1 |
| `#5C5E57` | `#F3F2EE` | 5.87:1 |
| `#B7791F` | `#F3F2EE` | 3.25:1 |

## Inventário de tokens hexadecimais

| Token | Valor |
|---|---|
| `--verde-floresta` | `#1E3B2F` |
| `--papel` | `#F3F2EE` |
| `--grafite` | `#1D1F1C` |
| `--ocre` | `#B7791F` |
| `--verde-900` | `#152A21` |
| `--verde-800` | `#1E3B2F` |
| `--verde-700` | `#2D4D3F` |
| `--verde-200` | `#C9D3C9` |
| `--verde-100` | `#E4E6DA` |
| `--papel-claro` | `#FBFAF7` |
| `--papel-escuro` | `#E8E6DF` |
| `--papel-borda` | `#DCD5C4` |
| `--grafite-80` | `#3E403B` |
| `--grafite-65` | `#5C5E57` |
| `--grafite-50` | `#80817A` |
| `--ocre-escuro` | `#94611A` |
| `--ocre-claro` | `#EFDFC2` |
| `--tijolo` | `#8C2F1E` |
| `--tijolo-claro` | `#F2DED6` |
| `--fg-sobre-marca-2` | `#C9D3C9` |
| `--papel-luz` | `#F3F2EE` |
| `--foco` | `#94611A` |
| `--site-ocre-texto` | `#956015` |
| `--tinta` | `#2D4A63` |
| `--site-branco` | `#fff` |
| `--site-cartao` | `#fffdf8` |
| `--site-acao-hover` | `#2d5140` |
| `--site-texto-lead` | `#4b514a` |
| `--site-texto-nota` | `#555c53` |
| `--site-halo` | `#dfe6d7` |
| `--site-borda-cartao` | `#d6dacd` |
| `--site-sombra-demo` | `#1e3b2f16` |
| `--site-borda-controle` | `#b8c3b3` |
| `--site-seletor` | `#edf1e7` |
| `--site-texto-contexto` | `#586553` |
| `--site-texto-traducao` | `#596155` |
| `--site-onda` | `#78917b` |
| `--site-divisor-demo` | `#dde2d6` |
| `--site-borda-balao` | `#cdd5c4` |
| `--site-superficie-verde` | `#e3e9d7` |
| `--site-superficie-ocre` | `#edddbd` |
| `--site-erro` | `#9c2d24` |
| `--site-divisor` | `#d9ddcf` |
| `--site-texto-secundario` | `#535c50` |
| `--site-metodo-verde` | `#e8ecdf` |
| `--site-metodo-ocre` | `#ecdfc7` |
| `--site-metodo-neutro` | `#e4e8e5` |
| `--site-texto-inverso` | `#d6dfd0` |
| `--site-borda-inversa` | `#7e9580` |
| `--site-plano` | `#f9f6ef` |
| `--site-selecao-borda` | `#d4b174` |
| `--site-texto-plano` | `#4c624b` |
| `--site-divisor-inverso` | `#6e856e` |
| `--site-superficie-inversa` | `#2d4d3b` |
| `--site-borda-opcao` | `#becbb4` |
| `--site-selecao` | `#e6ddbd` |
| `--site-borda-idioma` | `#d7ddcf` |
| `--site-idioma-verde` | `#ecefe4` |
| `--site-idioma-ocre` | `#eee3cf` |
| `--site-idioma-neutro` | `#e5eae7` |
| `--site-sombra-cartao` | `#1e3b2f12` |
| `--site-texto-idioma` | `#46503f` |
| `--site-colecao` | `#e9dfce` |
| `--site-lombada` | `#355a43` |
| `--site-sombra-livro` | `#cbbf9c` |
| `--site-livro-destaque` | `#e6c68f` |
| `--site-divisor-faq` | `#cbd3c3` |
| `--site-texto-faq` | `#4e5949` |

Os tokens semânticos definidos por `var(...)`, misturas `rgba(...)`, estilos de sombra, tamanhos e os temas específicos devem ser consultados no próprio arquivo de tokens. Os valores de oito dígitos incluem transparência. Para textos, verificar contraste efetivo de pelo menos 4,5:1 para texto normal e 3:1 para texto grande; validar também foco e contraste de componentes. Não usar ocre claro como texto apenas por aparecer neste inventário.

## Aplicação ao catálogo

A arte ocupa o fundo inteiro do cartão, com camada de papel translúcida para manter o texto legível. Os títulos, descrições e links continuam reais em HTML. A sombra no hover é discreta. A revisão visual em tela pequena e o contraste real sobre os desenhos são necessários antes de integrar.
