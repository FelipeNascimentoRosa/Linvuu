# Linvuu — Plataforma Editorial de Idiomas em Trilhas de 30 Dias

Estrutura limpa, modular e autônoma do site Linvuu, inspirada no design system editorial scholar (edX).

## Estrutura de Arquivos

```
Linvuu/
├── index.html                 # Página inicial (Home)
├── app.html                   # Sala de estudos interativa (30 dias)
├── assets/
│   ├── css/
│   │   └── style.css          # Design system canônico (edX, Inter + Roboto Mono)
│   ├── js/
│   │   └── main.js            # Seletor de idiomas, níveis e painel cosmos
│   └── mascots/               # Comidas típicas & ícones cósmicos
│       ├── pelmeni-ru.png     # Mascote Russo (Pelmeni)
│       ├── pretzel-de.png     # Mascote Alemão (Pretzel)
│       ├── croissant-fr.png   # Mascote Francês (Croissant)
│       ├── tomate-es.png      # Mascote Espanhol (Tomate)
│       ├── batata-en.png      # Mascote Inglês (Batata)
│       ├── pastel-pt.png      # Mascote Português (Pastel)
│       ├── ima-fisica.png     # Ímã (Física)
│       └── ampulheta-matematica.png # Ampulheta (Tempo)
└── README.md
```

## O que foi consolidado

1. **Retirada de Matemática e Física** da escolha de idiomas ("Quero aprender") e dos menus. O foco é idiomas vivos.
2. **6 Níveis Exatos** em "Meu nível":
   - Zero Absoluto
   - Básico A1
   - Básico A2
   - Intermediário B1
   - Intermediário B2
   - Avançado C1
3. **Mascotes de Comida Típica**: O lado esquerdo do seletor exibe a comida típica do idioma escolhido e reage instantaneamente à troca de idioma. Os cards das trilhas também exibem seu respectivo mascote.
4. **Painel Cósmico (Lado direito)**: Apresenta fórmulas astronômicas, físicas e matemáticas clássicas e saudações ("Привет", "Hallo", "Bonjour", etc.), com os enfeites de Ímã e Ampulheta.
5. **Limpeza da Home**: Removidos avatares genéricos, o mascote genérico Lin, a seção "Sistema visual" e a seção STEM.
6. **Integração `app.html`**: Destino das trilhas e do botão "Começar", permitindo navegar entre a Home e a Trilha de 30 Dias.
