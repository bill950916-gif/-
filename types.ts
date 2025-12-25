
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  difficulty: Difficulty;
  category: string;
}

export interface Chapter {
  title: string;
  range: string;
  questions: Question[];
}

export interface ExplanantionState {
  [questionId: number]: {
    text: string;
    loading: boolean;
    error?: string;
  };
}
