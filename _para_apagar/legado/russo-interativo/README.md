# 🇷🇺 Curso Interativo de Russo em 30 Aulas (Nível A1–B1)

> **Pacote Completo do Aluno & Código-Fonte da Plataforma Web Interativa**
> Desenvolvido com React, TypeScript, Tailwind CSS, Web Speech API e Áudios Nativos.

---

## 📦 Conteúdo Deste Pacote

Este arquivo compactado contém **absolutamente tudo** o que foi construído:

1. **Aulas 1 a 10 Completas (Nível A1 Elementar)**:
   - `src/data/lessonsData.ts` — Aulas 1 a 5, grade curricular completa de 30 aulas.
   - `src/data/lesson6.ts` — Aula 6: Idiomas, falar/ler/escrever, verbos I e II.
   - `src/data/lesson7.ts` — Aula 7: Atividades de rotina, lazer, causais (*потому что*), *дома* vs *домой*.
   - `src/data/lesson8.ts` — Aula 8: Cores, adjetivos, posse no passado (*был/была/было/были*).
   - `src/data/lesson9.ts` — Aula 9: Alimentos, refeições, compras, caso acusativo inanimado, *есть* e *пить*.
   - `src/data/lesson10.ts` — Aula 10: Roupas, estações do ano, numerais 10 a 1.000.000, moeda russa (*рубль*), verbos *носить* e *стоить*.
   - `src/data/wordDictionary.ts` — Dicionário lexical completo com mais de 700 palavras mapeadas com tônica, transliteração fonética e tradução pt/en para o sistema de *hover-tooltips*.

2. **Apostila & Livro Didático em Markdown (Pasta `aulas_markdown/`)**:
   - `LIVRO_COMPLETO_NIVEL_A1.md` — Livro didático compilado pronto para impressão ou leitura em qualquer dispositivo.
   - `DICIONARIO_VOCABULARIO_COMPLETO.md` — Tabela completa de vocabulário e pronúncias.
   - `AULA_01_*.md` até `AULA_10_*.md` — Arquivos individuais de cada lição com vocabulário, diálogos bilíngues, textos de leitura, tabelas explicativas e exercícios com gabarito comentado.

3. **Código-Fonte da Aplicação Web**:
   - `src/App.tsx` — Painel principal com paginação, destaques e emissão do diploma.
   - `src/components/A1CertificateModal.tsx` — Gerador e impressor do Diploma Oficial de Conclusão do Nível A1.
   - `src/components/SelfIntroductionTab.tsx` — Construtor interativo de autoapresentação (*О себе*) integrando os 10 tópicos estudados.
   - `src/components/Navbar.tsx`, `VocabularyTab.tsx`, `DialoguesTab.tsx`, `ReadingTextTab.tsx`, `GrammarTab.tsx`, `ExercisesTab.tsx`, `RoadmapModal.tsx`, `WordTooltip.tsx`.
   - `src/utils/audio.ts` — Motor de síntese de voz russa com velocidade dupla (normal 1.0x e lenta 0.65x).

---

## 🚀 Como Executar o Projeto Localmente no seu Computador

### Pré-requisitos
- **Node.js** (versão 18 ou superior) instalado em sua máquina.

### Passo a Passo

1. **Extraia o arquivo ZIP** em uma pasta de sua preferência.
2. Abra o terminal nessa pasta.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o navegador no endereço indicado (geralmente `http://localhost:3000` ou `http://localhost:5173`).

---

## 🏆 Resumo das Competências do Nível A1 Dominadas
- Cumprimentos, saudações formais e informais, perguntas de nome e bem-estar.
- Gênero dos substantivos (masculino, feminino, neutro) e pronomes possessivos (*мой, твой, наш, ваш*).
- Expressão de posse no presente (*У меня есть*) e no passado (*У меня был/была/были*).
- Profissões e locais de trabalho com o **Caso Preposicional** (*в* / *на*).
- Nacionalidades e cidades natais (*по национальности*, verbo *жить* no presente e passado).
- Idiomas falados e estudados (*по-русски*), 1ª e 2ª conjugações verbais (*читать* vs *говорить*).
- Atividades diárias, rotina, hobbies, orações com *потому что* e oposição *дома* vs *домой*.
- Cores, descrição de objetos e plural dos substantivos.
- Compras em supermercados e feiras livres, alimentos e o **Caso Acusativo Inanimado**.
- Roupas, calçados, clima nas quatro estações, contagem de 10 a 1.000.000 e declinação da moeda russa (*рубль, рубля, рублей*).
