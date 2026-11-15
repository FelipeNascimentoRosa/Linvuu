# Linvuu — instruções para Gemini / Google Antigravity

**OBRIGATÓRIO:** antes de trabalhar, leia integralmente [AGENTS.md](AGENTS.md). Documentos datados (como `docs/CONTINUIDADE-2026-10-27.md`) são histórico, não estado atual.

As regras de projeto são compartilhadas entre Claude, ChatGPT/Codex, Cursor e Antigravity.

Antes de qualquer edição, **leia integralmente**:
1. `AGENTS.md` — instruções comuns (fonte normativa).
2. `docs/ESTADO-ATUAL.md` — snapshot com data; reconfirme `main`, PRs e deploy.
3. `docs/COORDENACAO-IA.md` — procedimentos para evitar colisões de agentes.
4. As regras e documentos locais pertinentes ao arquivo modificado.

Use branch e PR; não escreva diretamente na `main`, não faça merge automático de protótipos/livros futuros e não contorne testes vermelhos. Uma falha sem etapas de execução exige diagnosticar infraestrutura, permissões e quota antes de atribuir erro ao código.

Não exponha credenciais, IAM, chaves, informações privadas nem conteúdo protegido de terceiros. Não altere site, APK, pagamentos ou conteúdo A1–A2 como efeito colateral de documentação. Diferencie teste de merge, deploy e verificação real. Registre o resultado no PR.

Este arquivo é a entrada específica do Antigravity, e não substitui `AGENTS.md`.

## Trabalhar com o Gemini

Felipe autoriza o Gemini a colaborar nas tarefas que ele solicitar para a Linvuu, inclusive propor e implementar mudanças no site, seguindo as instruções acima. Comece pela solicitação atual, inspecione os arquivos relevantes e preserve funcionalidades, conteúdo e dados existentes. Para redesign, use como referência a identidade visual e os materiais aprovados por Felipe; apresente uma prévia quando ele pedir. Valide a mudança e descreva os resultados e limitações no PR.

Este arquivo fornece contexto e instruções: **não concede acesso à conta GitHub nem instala uma integração**. O acesso depende do ambiente escolhido por Felipe e das permissões concedidas nele. Se o Gemini tiver acesso ao checkout ou ao GitHub autorizado, pode ler o projeto e trabalhar em branch e PR; nunca presuma que esse acesso existe. Não peça credenciais em conversas nem as registre no repositório.

### Quando o Gemini não tiver acesso ao projeto

Na pasta do repositório, Felipe pode executar `git ls-files` e compartilhar a listagem para ajudar a localizar os arquivos relevantes. A listagem contém nomes de arquivos, não seus conteúdos, mas deve ser revisada antes de compartilhar caso os nomes revelem informações privadas.

Para preparar um pacote textual do front-end, se for apropriado ao ambiente:

```bash
npx repomix --style markdown --include "package.json,next.config.*,astro.config.*,vite.config.*,tailwind.config.*,public/robots.txt,public/sitemap*,src/**,app/**,components/**,styles/**"
```

O comando executa uma ferramenta de terceiros e gera um arquivo local para revisão; não o publique automaticamente. Antes de compartilhar, confira **todo o conteúdo gerado** e remova segredos, dados pessoais e material privado ou protegido, inclusive valores que possam estar em arquivos de código. Não dependa apenas das exclusões padrão da ferramenta. Não envie arquivos `.env`, chaves de serviço, tokens, credenciais do Firebase Admin ou chaves secretas do Stripe. Uma cópia empacotada é um retrato do código, não acesso para editar o repositório nem garantia de que esteja atualizada.
