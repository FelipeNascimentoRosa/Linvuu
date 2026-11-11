export interface VocabWord {
  id: string;
  russian: string; // Plain cyrillic
  stressed: string; // With accent mark e.g. Приве́т
  transliteration: string; // e.g. privét
  portuguese: string;
  english: string;
  category?: string;
  notes?: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  russian: string;
  portuguese: string;
  english: string;
}

export interface Dialogue {
  id: string;
  title: string;
  description?: string;
  lines: DialogueLine[];
}

export interface GrammarItem {
  title: string;
  explanationPt: string;
  explanationEn?: string;
  importantNote?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  examples?: {
    russian: string;
    portuguese: string;
    english: string;
    note?: string;
  }[];
}

export type ExerciseType = 'fill-blank' | 'multiple-choice' | 'transform' | 'audio-dictation';

export interface ExerciseItem {
  id: string;
  question: string;
  promptPt: string;
  promptEn?: string;
  russianTemplate?: string; // e.g. "Меня (я) зовут {blank}."
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanationPt: string;
  audioPhrase?: string;
}

export interface ExerciseSet {
  id: string;
  title: string;
  descriptionPt: string;
  type: ExerciseType;
  items: ExerciseItem[];
}

export interface ReadingQuestion {
  questionRu: string;
  answerRu: string;
  questionPt: string;
  answerPt: string;
}

export interface ReadingTextSection {
  titleRu: string;
  titlePt: string;
  russian: string;
  portuguese: string;
  english: string;
  questions?: ReadingQuestion[];
}

export interface Lesson {
  id: number;
  titleRu: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  vocabulary: VocabWord[];
  dialogues: Dialogue[];
  grammar: GrammarItem[];
  exercises: ExerciseSet[];
  readingText?: ReadingTextSection;
  selfIntroQuestions?: {
    questionRu: string;
    questionPt: string;
    exampleAnswerRu: string;
    exampleAnswerPt: string;
  }[];
}
