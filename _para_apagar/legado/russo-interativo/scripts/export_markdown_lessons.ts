import fs from 'fs';
import path from 'path';
import { LESSONS_DATA } from '../src/data/lessonsData';
import { WORD_DICTIONARY } from '../src/data/wordDictionary';
import { Lesson } from '../src/types';

const outDir = path.resolve(process.cwd(), 'aulas_markdown');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function formatLessonMarkdown(lesson: Lesson): string {
  let md = `# 🎓 AULA ${lesson.id} — ${lesson.titleRu.toUpperCase()}\n`;
  md += `### ${lesson.titlePt} (${lesson.titleEn})\n\n`;
  md += `> **Descrição / Objetivo**: ${lesson.descriptionPt}\n\n`;
  md += `---\n\n`;

  // 1. Vocabulário
  md += `## 🔹 1. VOCABULÁRIO DA AULA (${lesson.vocabulary.length} termos)\n\n`;
  md += `| № | Russo | Pronúncia / Translit. | Português | English | Categoria / Notas |\n`;
  md += `|---|---|---|---|---|---|\n`;
  lesson.vocabulary.forEach((item, idx) => {
    const notes = item.notes ? ` (${item.notes})` : '';
    const cat = item.category ? `*${item.category}*` : '';
    const details = [cat, notes].filter(Boolean).join(' ');
    md += `| ${idx + 1} | **${item.stressed || item.russian}** | *${item.transliteration}* | ${item.portuguese} | ${item.english} | ${details || '—'} |\n`;
  });
  md += `\n---\n\n`;

  // 2. Diálogos
  md += `## 🔹 2. DIÁLOGOS EM CONTEXTO (${lesson.dialogues.length} diálogos)\n\n`;
  lesson.dialogues.forEach((d, idx) => {
    md += `### 🗣️ ${d.title}\n`;
    if (d.description) md += `*${d.description}*\n\n`;
    md += `| Personagem | Russo | Português | English |\n`;
    md += `|---|---|---|---|\n`;
    d.lines.forEach((line) => {
      const speaker = line.speaker ? `**${line.speaker}**` : '—';
      md += `| ${speaker} | **${line.russian}** | ${line.portuguese} | ${line.english} |\n`;
    });
    md += `\n`;
  });
  md += `---\n\n`;

  // 3. Texto de Leitura
  if (lesson.readingText) {
    md += `## 🔹 3. TEXTO DE LEITURA & COMPREENSÃO\n\n`;
    md += `### 📖 ${lesson.readingText.titleRu} (${lesson.readingText.titlePt})\n\n`;
    md += `#### Texto em Russo:\n${lesson.readingText.russian}\n\n`;
    md += `#### Tradução em Português:\n${lesson.readingText.portuguese}\n\n`;
    if (lesson.readingText.english) {
      md += `#### English Translation:\n${lesson.readingText.english}\n\n`;
    }
    if (lesson.readingText.questions && lesson.readingText.questions.length > 0) {
      md += `#### ❓ Perguntas de Compreensão:\n\n`;
      lesson.readingText.questions.forEach((q, qIdx) => {
        md += `**${qIdx + 1}. ${q.questionRu}** (*${q.questionPt}*)\n`;
        md += `- **Resposta**: ${q.answerRu} (*${q.answerPt}*)\n\n`;
      });
    }
    md += `---\n\n`;
  }

  // 4. Gramática
  md += `## 🔹 4. GRAMÁTICA ESSENCIAL (${lesson.grammar.length} tópicos)\n\n`;
  lesson.grammar.forEach((g) => {
    md += `### 📘 ${g.title}\n\n`;
    md += `${g.explanationPt}\n\n`;
    if (g.tableHeaders && g.tableRows) {
      md += `| ${g.tableHeaders.join(' | ')} |\n`;
      md += `| ${g.tableHeaders.map(() => '---').join(' | ')} |\n`;
      g.tableRows.forEach((row) => {
        md += `| ${row.join(' | ')} |\n`;
      });
      md += `\n`;
    }
    if (g.importantNote) {
      md += `> 💡 **Nota Importante**: ${g.importantNote}\n\n`;
    }
    if (g.examples && g.examples.length > 0) {
      md += `**Exemplos Práticos:**\n`;
      g.examples.forEach((ex) => {
        md += `- **${ex.russian}**\n  - *PT*: ${ex.portuguese}\n  - *EN*: ${ex.english}\n`;
      });
      md += `\n`;
    }
  });
  md += `---\n\n`;

  // 5. Exercícios
  md += `## 🔹 5. EXERCÍCIOS PRÁTICOS & GABARITO (${lesson.exercises.length} blocos)\n\n`;
  lesson.exercises.forEach((ex) => {
    md += `### ✍️ ${ex.title}\n`;
    md += `*${ex.descriptionPt}*\n\n`;
    ex.items.forEach((item, itIdx) => {
      md += `**${itIdx + 1}. ${item.question}**\n`;
      if (item.promptPt) md += `*Dica: ${item.promptPt}*\n`;
      if (item.options) md += `Opções: ${item.options.join(' | ')}\n`;
      md += `- ✅ **Resposta Correta**: \`${item.correctAnswer}\`\n`;
      if (item.explanationPt) md += `- 💡 **Explicação**: ${item.explanationPt}\n`;
      md += `\n`;
    });
  });

  return md;
}

// Generate individual files
let masterBook = `# 📚 CURSO DE LÍNGUA RUSSA — NÍVEL A1 COMPLETO (AULAS 1 A 10)\n\n`;
masterBook += `Material Didático Completo, Estruturado e Aprofundado com Vocabulário, Pronúncias, Diálogos, Leituras, Tabelas Gramaticais e Exercícios com Gabarito.\n\n`;
masterBook += `---\n\n`;

LESSONS_DATA.forEach((lesson) => {
  const md = formatLessonMarkdown(lesson);
  const fileName = `AULA_${String(lesson.id).padStart(2, '0')}_${lesson.titleRu.replace(/[^a-zA-Z0-9а-яА-ЯёЁ]+/g, '_')}.md`;
  fs.writeFileSync(path.join(outDir, fileName), md, 'utf-8');
  masterBook += md + '\n\n<div style="page-break-after: always;"></div>\n\n';
});

fs.writeFileSync(path.join(outDir, 'LIVRO_COMPLETO_NIVEL_A1.md'), masterBook, 'utf-8');

// Generate complete dictionary file
let dictMd = `# 📖 DICIONÁRIO INTEGRAL DO CURSO (NÍVEL A1)\n\n`;
dictMd += `Contém ${Object.keys(WORD_DICTIONARY).length} verbetes cadastrados com tonicidade, transliteração fonética e tradução em português e inglês.\n\n`;
dictMd += `| Palavra (com tônica) | Transliteração | Português | English | Notas |\n`;
dictMd += `|---|---|---|---|---|\n`;

const sortedKeys = Object.keys(WORD_DICTIONARY).sort((a, b) => a.localeCompare(b, 'ru'));
sortedKeys.forEach((key) => {
  const item = WORD_DICTIONARY[key];
  dictMd += `| **${item.stressed || key}** | *${item.translit || '—'}* | ${item.pt} | ${item.en || '—'} | ${item.note || '—'} |\n`;
});

fs.writeFileSync(path.join(outDir, 'DICIONARIO_VOCABULARIO_COMPLETO.md'), dictMd, 'utf-8');

console.log('Markdown lessons exported successfully!');
