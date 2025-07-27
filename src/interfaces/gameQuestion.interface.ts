import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { emptyGame, Game } from '@/interfaces/game.interface';
import { emptyQuestion, Question } from '@/interfaces/question.interface';

export interface GameQuestion extends Abstract {
  gameId: number;
  game: Game;
  questionId: number;
  question: Question;
  position: number;
}

export const emptyGameQuestion: GameQuestion = {
  ...emptyAbstract,
  gameId: 0,
  game: emptyGame,
  questionId: 0,
  question: emptyQuestion,
  position: 0,
};
