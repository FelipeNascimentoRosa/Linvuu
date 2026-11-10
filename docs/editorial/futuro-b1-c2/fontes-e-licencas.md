# Política de aquisição bibliográfica, OCR e direitos

## Formatos e originais
Guardar cada PDF/DOCX original no Drive, somente leitura, com ID, autor, edição, licença, URL, data, tamanho e checksum. Criar derivado OCR **separado** e depois MD/JSONL de trabalho, preservando páginas/tabelas. Registrar número de páginas convertido, problemas de diacríticos e caracteres cirílicos, perdas de tabelas, amostra visual conferida e confiança. PDF/OCR/MD/JSONL são diferentes estados do MESMO acervo, não obras aprovadas separadas.

## Ferramentas candidatas
1. Docling local: PDF → DoclingDocument JSON (coordenadas/tabelas) → Markdown/HTML/chunks; testar PDFs digital, escaneado, misto, cirílico e tabelas densas. Fonte: https://docling.org/formats/
2. Adobe Acrobat: segundo extrator/OCR, comparar integridade, não tomar como árbitro linguístico.
3. iLovePDF: opcional apenas para falhas comprovadas e após revisão contratual dos arquivos enviados e custo. Não é fonte de correção linguística.
4. Claude: proponente/redator/revisor de estrutura; GPT: auditor independente e coordenação; revisores humanos decidem divergências; nenhum deles autoriza automaticamente reutilização de fontes comerciais.

## Política de direitos
- **Autoral Linvuu**: manuscritos próprios; manter versão aprovada.
- **CC BY**: possível uso conforme licença, atribuição, marcas e componentes de terceiros; exemplos sempre auditados.
- **CC BY-SA**: estudar efeitos da cláusula CompartilhaIgual sobre adaptações; preferir redigir conteúdo autoral independente, com proveniência bibliográfica.
- **CC BY-NC / NC-SA / NC-ND**: não extrair para corpus comercial nem distribuir trechos, salvo autorização específica.
- **Código MIT/AGPL etc.**: licença do código NÃO se estende automaticamente aos dados, áudios, imagens e textos.
- **Sem licença, direitos exclusivos, provas ou corpora restritos**: somente metadados, referências e cotejo crítico permitido; não copiar conteúdo para livro, app, dataset comercial ou índice de IA; o uso de conteúdo por IA requer avaliação jurídica própria.
- **Domínio público**: verificar jurisdição, edição, transcrição e contribuições recentes antes da reutilização.
- **Termos do serviço**: podem restringir API/TDM ainda que a página seja pública.

Casos críticos documentados:
- Russian Constructicon: dataset https://github.com/constructicon/russian-data (CC BY 4.0); aplicação https://github.com/constructicon/russian (AGPL-3.0). Não confundir.
- Corpus Nacional Russo: https://ruscorpora.ru/en/page/terms/ — restrições expressas a usos comerciais.
- English Profile (Cambridge): https://englishprofile.org/?menu=contact-us — não licencia EGP/EVP para fins comerciais; nunca coletar nem indexar as tabelas de proficiência.
- Goethe B2: https://www.goethe.de/ins/de/de/prf/gzb2.cfm — referência de competências e formato; não copiar itens das provas.
- Vorrei 2019 CC BY: https://books.fupress.com/catalogue/ivorreii-corso-di-lingua-italiana-di-livello-elementare-1-e-2/3928; Vorrei 2016 CC BY-NC-ND: https://books.fupress.com/catalogue/ivorreii-corso-di-lingua-italiana-di-livello-elementare-1/3301.
- `German Study Kit`: MD existente no acervo, SEM licença comercial inequívoca verificada: https://github.com/salmanmohebi/german-study-kit.

## Esquema obrigatório por fonte
`source_id, lang, title, author, edition, publisher, original_url, original_drive_id, mime_original, source_license, license_evidence_url, rights_risk, ai_ingestion_policy, derivative_url, extraction_method, page_count, pages_verified, structure_quality, source_hash, human_reviewer, editorial_decision, notes`.

## Não realizado nesta auditoria
Não foi executado OCR integral dos acervos nem comparação de cada tabela ou edição. As fontes do Drive foram inventariadas por diretórios/manifests; a checagem de URLs públicas foi seletiva e deve se tornar granular.
