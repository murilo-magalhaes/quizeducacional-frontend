import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { Game } from '@/interfaces/game.interface';
import { Question } from '@/interfaces/question.interface';

export interface GameQuestion extends Abstract {
  gameId: number;
  game?: Game;
  questionId: number;
  question?: Question;
  position: number;
}

export const emptyGameQuestion: GameQuestion = {
  ...emptyAbstract,
  gameId: 0,
  game: undefined,
  questionId: 0,
  question: undefined,
  position: 0,
};
