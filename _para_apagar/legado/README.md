# Legado

Material produzido antes da estrutura de 100 dias. Fica aqui como fonte; não entra no build do site.

- `alemao-descomplicado/`: 16 aulas de alemão (Semana 1: aulas 01–09; Semana 2: aulas 07–13, chamadas de "Dia 007 a 013" no README). Dados em `src/data/`, componentes React em `src/components/`, guia completo em `README_CONTEXTO_GERAL_GEMINI_PRO.md`.
  - Atenção à numeração: a Semana 2 reaproveita os números 07 a 13. No site novo elas viram os dias 10 a 16 do curso de alemão (ver `content/idiomas/de/`).
- `site-estatico/`: versão em HTML puro (home com mascotes, `app.html` com a sala de estudo interativa), enviada ao `main` antes da migração para Vite. Fica guardada aqui; a sala de estudo (`app.html`) é referência para o player de aula (rodadas 6 e 7 do `docs/ROTEIRO.md`).
- `russo-interativo/`: curso de russo em 30 aulas (Gemini). Aulas 1 a 10 escritas (nível A1: cumprimentos, família, profissões, nacionalidades, idiomas, rotina, cores, comida, roupas e números), mais a grade das aulas 11 a 30 (A2 e B1) em `src/data/lessonsData.ts`. Apostilas em `aulas_markdown/` (`aula-01.md` … `aula-10.md`, `LIVRO_COMPLETO_NIVEL_A1.md`, `DICIONARIO_VOCABULARIO_COMPLETO.md`) e dicionário de 700+ palavras em `src/data/wordDictionary.ts`.
  - No site, as 30 aulas ocupam os dias 1 a 30 do curso de russo. As aulas 11 a 30 só têm título e tema (status planejada).
