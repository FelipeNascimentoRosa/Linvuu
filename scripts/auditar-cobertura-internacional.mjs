// Auditoria estrutural de cobertura; não certifica a qualidade linguística.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function auditarCobertura(indice, traducoes) {
  if (!indice?.cursos || typeof indice.cursos !== 'object') throw new Error('Índice sem cursos');
  const linhas = [];
  for (const [curso, dados] of Object.entries(indice.cursos)) {
    if (!Array.isArray(dados.grupos)) throw new Error('Grupos ausentes: ' + curso);
    const ids = dados.grupos.map(g => g.aula);
    if (ids.some(n => !Number.isInteger(n) || n < 1) || new Set(ids).size !== ids.length)
      throw new Error('Aulas inválidas ou duplicadas: ' + curso);
    const fonte = dados.fonte ?? 'pt';
    if (!['pt', 'en'].includes(fonte)) throw new Error('Fonte desconhecida: ' + curso);
    for (const explicacao of ['pt', 'en']) {
      let adaptadas = ids.length;
      if (explicacao !== fonte) {
        const lista = traducoes[explicacao]?.[curso]?.aulas ?? [];
        if (!Array.isArray(lista) || lista.some(n => !ids.includes(n)) || new Set(lista).size !== lista.length)
          throw new Error('Cobertura inválida: ' + curso + '/' + explicacao);
        adaptadas = lista.length;
      }
      linhas.push({
        curso, explicacao, fonte, aulasCatalogadas: ids.length, aulasComTexto: adaptadas,
        aulasSemTexto: ids.length - adaptadas,
        cobertura: !ids.length ? 'sem-aulas' : adaptadas === ids.length ? 'total' : adaptadas ? 'parcial' : 'ausente'
      });
    }
  }
  return linhas;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const raiz = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, '..'));
  const ler = nome => JSON.parse(fs.readFileSync(path.join(raiz, 'content', nome), 'utf8'));
  try {
    const resultado = auditarCobertura(ler('indice.json'), { en: ler('indice.en.json') });
    console.log(JSON.stringify({ aviso: 'Cobertura declarada nos índices; não valida tradução, áudio ou publicação.', resultado }, null, 2));
  } catch (erro) {
    console.error(erro.message);
    process.exitCode = 1;
  }
}
