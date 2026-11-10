# Home para brasileiros — 16/10/2026

Pedido de Felipe: tornar o website mais fluido e visual, fortalecer marketing para brasileiros e preservar a identidade. Esta entrega muda a home em português; as páginas internacionais continuam com o componente anterior. Texto da nova composição fica no componente exclusivamente brasileiro nesta etapa.

- Verde floresta, papel e ocre, cartões com cantos suaves, demonstração interativa com áudio existente e formas em CSS (sem imagens externas nem bibliotecas novas).
- Uma chamada principal para comparar os planos. Demonstração gratuita continua acessível.
- Start: 1 idioma; Basic: 2; Intermediário: 3; Premium: todos. Comparação explicitamente em preparação, sem valores inventados, com seleção de interesse local e acesso às amostras grátis. A escolha não altera permissões nem gera cobrança.
- Premium: professor para dúvidas específicas no WhatsApp Business. Sem promessa de encontros ao vivo, prazo de resposta ou tutoria ilimitada. Mesma qualidade de conteúdo e suporte técnico em todos.
- Oferta vigente continua acessível por link explícito; checkout e autorização não são alterados.
- Retomada do estudo preservada. Navegação por teclado, mensagens de erro no áudio, seleção com aria-pressed, layouts responsivos e respeito a movimento reduzido.

Validação: TypeScript, build website e validação existente do sistema de design passaram. O validador de contraste existente cobre os tokens da área do aluno, não todos os pares de cores da nova home. Inspeção visual da versão nova em navegador e testes de interação em celular ainda pendentes; não publicar como versão validada.

Pendências: revisar visual desktop/mobile; integrar navegação global aos novos planos; definir preços e condições; implementar direitos por idioma no servidor; atualizar a versão HTML de SEO para refletir a nova oferta; consolidar textos de marketing antigos em outras páginas. Este PR não resolve indexação no Google.

## 09/11/2026 — composição quente sobre a paleta atual (variante A)

Duas variantes foram apresentadas em tela ao Felipe. Ele aprovou a entrega ("aprovo as mudanças", 09/11/2026). Entrou a **A — "Ocre solar"**: a paleta não muda (verde-floresta, papel, grafite e ocre continuam sendo as quatro cores da marca); o que muda é a forma.

- Cartões com canto de 20px, sombra macia e sem borda de 1px; superfícies alternadas nos blocos (papel, verde, ocre).
- Herói: título menor (38–58px; antes 48–78px, e 54px fixos no celular), marca-texto ocre no `em`, selo em pílula e o CTA que era link de texto virando botão sólido — mesmo HTML, só CSS.
- Fecho em bloco quente (ocre-claro, canto 32px) no lugar da faixa verde; perguntas frequentes viram cartões; cartões de idioma e de método ganham elevação no hover.
- Tokens novos em `src/tokens.css`: `--site-sombra-suave|alta|botao|controle|cena|linha|barra`; `--site-r-card` de 12 para 20px e `--site-r-control` de 8 para 12px. A área do aluno não muda: `--r-card` continua 0 e sem sombra.
- Contraste: o selo em pílula usa grafite sobre ocre-claro (12,65:1) e esse par passou a ser verificado por `scripts/validar-design.mjs`. O ocre puro sobre papel seria 4,03:1 e não serve para texto pequeno.

Risco registrado: a variante B (coral `#C2542D` e sol `#F2C879`) **não** entrou; exigiria exceção à regra das quatro cores de 07/10/2026. Fica guardada em `scripts/design/variantes/` e é um delta de CSS sobre esta base.

Limitações: as telas foram revisadas por agente em 1440×900 e 390×844 (Playwright), **sem revisão humana** das capturas; continua não havendo foto de pessoa acima da dobra — depende das fotos reais do Felipe.
