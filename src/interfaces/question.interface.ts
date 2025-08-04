import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { Content, emptyContent } from '@/interfaces/content.interface';
import { Alternative } from '@/interfaces/alternative.interface';
import { QuestionAlternative } from '@/interfaces/questionAlternative.interface';

export enum ELevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export const TLevel = {
  [ELevel.EASY]: 'Fácil',
  [ELevel.MEDIUM]: 'Médio',
  [ELevel.HARD]: 'Difícil',
};

export interface Question extends Abstract {
  statement: string;
  contentId: number;
  content?: Content;
  level: ELevel;
  alternatives: QuestionAlternative[];
}

export const emptyQuestion: Question = {
  ...emptyAbstract,
  statement: '',
  contentId: 0,
  content: emptyContent,
  level: ELevel.MEDIUM,
  alternatives: [],
};
