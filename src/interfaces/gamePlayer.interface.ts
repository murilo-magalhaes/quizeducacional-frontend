import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { emptyGame, Game } from '@/interfaces/game.interface';
import { emptyPlayer, Player } from '@/interfaces/player.interface';
import { PlayerAnswer } from '@/interfaces/playerAnswer.interface';

export enum EGameStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
}

export interface GamePlayer extends Abstract {
  gameId: number;
  game?: Game;
  playerId: number;
  player?: Player;
  score: number;
  gameStatus: EGameStatus;
  timeElapsed: number;
  answers: PlayerAnswer[];
}

export const emptyGamePlayer: GamePlayer = {
  ...emptyAbstract,
  gameId: 0,
  game: emptyGame,
  playerId: 0,
  player: emptyPlayer,
  score: 0,
  gameStatus: EGameStatus.NOT_STARTED,
  timeElapsed: 0,
  answers: [],
};
