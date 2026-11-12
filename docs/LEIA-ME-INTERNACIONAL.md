# LEIA-ME-INTERNACIONAL.md — linvuu.com (leia antes de qualquer tarefa no .com)

> Documento vivo do site internacional. **Toda IA lê este arquivo antes de mexer no linvuu.com e o atualiza no mesmo PR** (seção "Progresso"). Só fala do **.com**; o .com.br está em `docs/DOMINIOS.md` e não é tocado por lotes I. Números são sempre do .com, nunca somados com o .com.br.

## 1. Quem é o aluno (a regra que decide tudo)

O aluno do linvuu.com **tem o inglês como língua materna**: americano, britânico, canadense, australiano… Ele pensa em inglês, aprendeu gramática na escola em inglês e vai comparar tudo com o inglês.

Ele estuda: **russo, francês, alemão, italiano, espanhol e português (como língua estrangeira)**.

Consequências obrigatórias em todo texto do .com:
1. **Interface, explicações, gramática, vocabulário, exercícios e notas: 100% em inglês.** Só o idioma estudado aparece no idioma estudado. Nenhuma palavra em português na página (nem em rótulo de coluna, nem em glosa, nem em `title`).
2. **Explicar a partir do inglês, não traduzir a explicação feita para brasileiro.** A comparação ("em português…") é **reescrita** como contraste com o inglês: falsos cognatos do inglês (*embarazada* ≠ embarrassed, *pronto* ≠ "right away"), o que o inglês não tem (gênero, casos, *ser/estar*, *por/para*), o que o inglês faz parecido (*-mente* = *-ly*, *bueno → bien* = *good → well*).
3. **Pronúncia aproximada escrita para leitor de inglês** (maiúscula na sílaba forte: `MOO-cho`, `deh-mah-SYAH-do`), nunca a transcrição feita para brasileiro.
4. Glosas e traduções em inglês natural (inglês americano por padrão; sem "translationese").
5. Copy pública: nunca prometer fluência ou prazo; certificado só "of completion, issued by Linvuu"; preços só de `src/config/planos.ts` (USD).

**Anti-exemplos permanentes:** `/curso/it` prometendo inglês sobre conteúdo em português (#576); etiquetas `[misto] jamón` visíveis ao aluno (#588); regeneração que trocava `ENGLISH/RUSSIAN` por `PORTUGUÊS/RUSSO/TRADUÇÃO: livro` (#590).

## 2. Estado do catálogo no .com (sessões explicadas em inglês)

Medido no repositório em 11/11/2026 (`ls content/idiomas/<id>/en`). Confira antes de afirmar.

| Curso | Sessões em inglês | Estado no .com | Trava |
|---|---|---|---|
| Russo `ru` | 312/312 | completo, indexável | travado (curado à mão) |
| Francês `fr` | 248/248 | completo, indexável | travado (curado à mão) |
| Português p/ estrangeiros `br` | 248/248 (escrito em inglês) | completo, indexável | travado |
| Espanhol `es` | 124/248 (+4 no PR #592) | parcial: nota de cobertura, fora do sitemap | travado o que existe |
| Alemão `de` | 4/288 | parcial: nota de cobertura, fora do sitemap | travado o que existe |
| Italiano `it` | 0/248 | parcial: nota de cobertura, fora do sitemap | — |

Gramáticas em inglês servidas: `ru.en.json`, `fr.en.json`, `es.en.json`, `br.json` (travadas).
Regra `explicacaoCompleta` (`server/metaRota.ts`): curso só entra no sitemap/hreflang do .com quando **todas** as sessões estão em inglês. Não "corrija" isso.

## 3. Trava do conteúdo em inglês (o que já foi traduzido não muda por acidente)

- `content/travas-en.json` guarda o sha256 de **cada arquivo servido em inglês** (936 em 11/11/2026).
- `node scripts/travas-en.mjs` confere; roda no **CI**, no `npm run content:check` e no **build do Render** (se falhar, o deploy para e o site anterior continua no ar).
- Arquivo travado **alterado ou apagado = erro**. Arquivo novo (curso crescendo) passa, mas é listado até ser travado.
- Mudar conteúdo travado só de propósito: `npm run travas:en` no mesmo PR, dizendo no corpo do PR **o que** mudou e **por quê**. O diff de `travas-en.json` mostra exatamente quais arquivos foram destravados.
- `ru/en` e `fr/en` (dias e gramáticas) são curados à mão: os mapas i18n deles são incompletos e **não podem regenerar** os arquivos servidos (guarda em `aulas.mjs`/`gramatica.mjs`, PR #590).

## 4. Como escrever uma aula nova em inglês (es, de, it)

Uma aula (4 sessões) por PR:
1. `node scripts/i18n-aulas.mjs extrair <id> en <aula> /tmp/tr` → lista dos textos.
2. Traduzir/reescrever seguindo a seção 1 (em `<id>-en-NNN.tr.json`, mesma ordem; `null` = manter o texto do idioma estudado).
3. `node scripts/i18n-aulas.mjs juntar <id> en <aula> /tmp/tr` (o marcador `[misto]/[pronuncia]` é retirado sozinho).
4. `node scripts/aulas.mjs <id> && node scripts/gramatica.mjs <id> && node scripts/conteudo.mjs` (**nunca** `npm run aulas` inteiro: ele recompila todos os idiomas).
5. `node scripts/conteudo.mjs --check` (recusa português residual de marcador) + varredura de português nos 4 dias.
6. `npm run travas:en` (trava os 4 dias novos) e atualizar a seção 5 deste arquivo.
Fontes permitidas: FSI/DLI/Peace Corps (domínio público) como base; Wikibooks só como roteiro (CC BY-SA, não copiar texto); Tatoeba só frases com atribuição. Texto final sempre original.

## 5. Progresso (atualize no mesmo PR)

| Data | O que | PR | Estado |
|---|---|---|---|
| 11/11 | I1/I2 — cursos completos com o mesmo template do .br, cartão de gramática, D14 do .com | #584, #585 | produção |
| 11/11 | I3 — páginas ru/fr/br respondem preço, tempo até B1, professor, iniciante | #586 | mergeado |
| 11/11 | Etiquetas internas `[misto]/[pronuncia]` retiradas das 120 sessões es/en + guarda | #588 | mergeado |
| 11/11 | Piloto I5: espanhol aula 31 em inglês (sessões 121–124) | #589 | mergeado |
| 11/11 | Guarda: ru/en e fr/en curados nunca regenerados por mapa | #590 | mergeado |
| 11/11 | Este arquivo + trava `travas-en.json` (936 arquivos) no CI e no build | este PR | aberto |

## 6. O que falta no .com (ordem por impacto real)

1. **Mesclar #588 → #589 → #590 → este PR** (depois de #588/#589 mesclados, rodar `npm run travas:en` aqui).
2. **Espanhol completo em inglês** (aulas 32–62, 124 sessões): fecha o 4º curso completo e indexável no .com. Uma aula por PR.
3. **I4 — 30 dúvidas de russo em inglês** (páginas de busca para quem pesquisa em inglês), a partir de `ru.en.json`.
4. **D14 — página da aula** (`/curso/ru/dia/1`): coluna estreita, título em serifa estranha, progresso invisível.
5. **D13 — `/gramatica` (índice) no sitemap do .com** e título com palavra-chave em inglês.
6. **Alemão** (284 sessões) e **italiano** (248) em inglês — depois do espanhol.
7. **Compra real em USD de ponta a ponta** (lote 3): webhook, acesso à sessão 9, reembolso.
