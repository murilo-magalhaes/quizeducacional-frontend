import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { emptyQuestion, Question } from '@/interfaces/question.interface';
import {
  Alternative,
  emptyAlternative,
} from '@/interfaces/alternative.interface';

export interface QuestionAlternative extends Abstract {
  questionId: number;
  question?: Question;
  alternativeId: number;
  alternative?: Alternative;
  position: number;
  correct: boolean;
  forDoubt: boolean;
}

export const emptyQuestionAlternative: QuestionAlternative = {
  ...emptyAbstract,
  questionId: 0,
  question: emptyQuestion,
  alternativeId: 0,
  alternative: emptyAlternative,
  position: 0,
  correct: false,
  forDoubt: false,
};
