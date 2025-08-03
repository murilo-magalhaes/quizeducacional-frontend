import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { Content, emptyContent } from '@/interfaces/content.interface';
import { GameQuestion } from '@/interfaces/gameQuestion.interface';
import { GamePlayer } from '@/interfaces/gamePlayer.interface';
import { PlayerAnswer } from '@/interfaces/playerAnswer.interface';

export interface Game extends Abstract {
  qntAlternatives: number;
  qntQuestions: number;
  contentId: number;
  content: Content;
  questions: GameQuestion[];
  players: GamePlayer[];
  playersAnswers: PlayerAnswer[];
}

export const emptyGame: Game = {
  ...emptyAbstract,
  qntQuestions: 0,
  qntAlternatives: 0,
  contentId: 0,
  content: emptyContent,
  questions: [],
  players: [],
  playersAnswers: [],
};
