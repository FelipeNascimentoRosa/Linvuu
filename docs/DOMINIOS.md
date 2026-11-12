# LEIA-ME — os dois sites da Linvuu: nacional (.com.br) e internacional (.com)

> Leia antes de qualquer tarefa. Um único servidor (Render) atende os dois domínios e decide pelo **Host** da requisição (`server/dominio.ts`, `src/i18n/locales.ts`). O código é o mesmo, mas **os dois são produtos diferentes**: língua, moeda, catálogo completo, sitemap e plano de trabalho são separados.
> Toda afirmação sobre um domínio diz **qual** domínio. Número somado dos dois ("60 páginas") nunca aparece sozinho: sempre `.com.br X · .com Y`.
> Fatos medidos ao vivo em 11/11/2026. Quando um fato mudar, atualize este arquivo no mesmo PR.

## Lado a lado

| | **Nacional — linvuu.com.br** | **Internacional — linvuu.com** |
|---|---|---|
| Perfil no código | `br` | `global` |
| Público | quem fala português | quem fala inglês |
| Interface e explicações | português | inglês |
| Moeda | reais (R$) | dólares (US$) |
| Preços (`src/config/planos.ts`) | mensal R$ 139 · trimestral R$ 417 · trimestral Pix R$ 291,90 · anual R$ 999 | mensal US$ 19,99 · anual US$ 149 |
| Código FUNDADORES | existe (50% no mensal) | **não existe** |
| Cursos completos | os 6: inglês, espanhol, alemão, francês, italiano, russo (todos explicados em português) | 3: **russo, francês, português do Brasil** (explicados em inglês) |
| Cursos parciais | nenhum | espanhol (30 de 62 aulas em inglês), alemão (1 de 72) |
| Sem explicação na língua do site | nenhum | italiano (0 de 62) |
| Livros (`/livros`) | existem (em português) | não existem: `/livros` → 301 para o .com.br |
| `/ex-alunos-udemy` | existe | 301 para o .com.br |
| `/portugues`, `/curso/br`, `/gramatica/br` | 301 para o .com | existem (português para estrangeiros) |
| URLs no sitemap | **42** | **18** |
| Páginas com o HTML real (prerender) | **42 de 42** | **18 de 18** |
| E-mail exibido | `contato@linvuu.com` (o CLAUDE.md pede `contato@linvuu.com.br`: troca pendente, só depois de um e-mail de teste do Felipe chegar nesse endereço) | `contato@linvuu.com` |
| Plano de trabalho | lotes 1–100 em `docs/plano/ESTADO.md` | lotes **I1, I2…** na seção "Internacional" do mesmo arquivo |

Os dois domínios recebem e-mail pela Cloudflare (MX conferido em 11/11/2026). Só `contato@linvuu.com` foi testado de ponta a ponta pelo Felipe.

## O que não existe (e nunca se cria sem ordem do Felipe)
- Interface ou explicação em espanhol, ou em qualquer língua que não seja português (.com.br) e inglês (.com).
- `/es/...` e `/en/...` são endereços antigos: respondem 301 para a página atual, num salto só. Não ganham página, sitemap, hreflang nem pedido de indexação.
- Curso parcial no sitemap do .com: fica fora de propósito (regra `explicacaoCompleta` em `metaRota.ts`) até ter todas as aulas em inglês.

## Regras por domínio
- **Lote nacional** (1–100) não pode piorar o .com, e **lote internacional** (I) não pode mudar o .com.br. Se o código é compartilhado, o PR prova os dois lados com captura, contagem ou `curl`.
- No .com nada aparece em português e no .com.br nada aparece em inglês, com uma exceção: o conteúdo que o aluno estuda (o idioma-alvo).
- No .com, só aparece o que existe em inglês. Livro, gramática ou aula que só existem em português **não são oferecidos** lá. Curso parcial mostra sempre a nota "Explanations in English: N of M lessons so far…".

## Como conferir cada domínio (sempre os dois, separados)
```bash
node scripts/conferir-prerender.mjs                 # produção: imprime .com.br X/42 e .com Y/18
node scripts/conferir-prerender.mjs http://127.0.0.1:4398   # local
curl -s https://linvuu.com.br/sitemap.xml | grep -c '<loc>'  # 42
curl -s https://linvuu.com/sitemap.xml | grep -c '<loc>'     # 18
```
Smoke completo: skill `verificar-site` (relata cada domínio em separado).

Lotes do .com, regras do aluno falante de inglês, trava do conteúdo traduzido e progresso: **[LEIA-ME-INTERNACIONAL.md](LEIA-ME-INTERNACIONAL.md)**.
