export type Language = 'de-DE' | 'pt-BR';

export interface TopologicalRow {
  vorfeld: string;
  verbo: string;
  sujeito: string;
  mittelfeld: string;
  satzende: string;
  ptTranslation?: string;
}

export interface ContrastTrap {
  portugues: string;
  alemaoCorreto: string;
  alemaoIncorreto: string;
  nota?: string;
}

export interface ConjugationRow {
  pessoa?: string;
  pronome?: string;
  pronomes?: string;
  radicalDesinencia?: string;
  forma: string;
  destaque?: string;
}

export interface ProfessionGender {
  masculino: string;
  feminino: string;
  traducao: string;
}

export interface NumberRow {
  numero: number;
  alemao: string;
  numero2?: number;
  alemao2?: string;
}

export interface TextEntry {
  speaker: string;
  alemao: string;
  portugues: string;
  notasGramaticais?: string[];
}

export interface CountryCaseRule {
  categoria: string;
  paises: string;
  preposicaoCaso: string;
  exemplo: string;
}

export interface AlphabetLetter {
  letra: string;
  ipa: string;
  nome?: string;
  exemplo?: string;
}

export interface LexicalTerm {
  palavraAlema: string;
  classeGramatical: string;
  traducao?: string;
  traducaoExata?: string;
  fraseModelo: string;
  fraseTraducao?: string;
  plural?: string;
  audio?: string;
}

export interface ColloquialExpression {
  expressao?: string;
  expressaoAlema?: string;
  traducao?: string;
  traducaoExata?: string;
  contexto: string;
}

export interface ExerciseItem {
  id: string;
  numero: string;
  titulo: string;
  pagina: string;
  enunciado: string;
  tipo?: string;
}

export interface KeyPoint {
  numero?: number;
  conceito: string;
  regra: string;
}
