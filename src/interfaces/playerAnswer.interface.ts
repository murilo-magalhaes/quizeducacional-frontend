import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { Content, emptyContent } from '@/interfaces/content.interface';
import { emptyGamePlayer, GamePlayer } from '@/interfaces/gamePlayer.interface';
import {
  emptyQuestionAlternative,
  QuestionAlternative,
} from '@/interfaces/questionAlternative.interface';

export interface PlayerAnswer extends Abstract {
  gamePlayerId: number;
  gamePlayer: GamePlayer;
  questionAlternativeId: number;
  questionAlternative: QuestionAlternative;
  correct: boolean;
}

export const emptyPlayerAnswer: PlayerAnswer = {
  ...emptyAbstract,
  correct: false,
  gamePlayerId: 0,
  gamePlayer: emptyGamePlayer,
  questionAlternativeId: 0,
  questionAlternative: emptyQuestionAlternative,
};
