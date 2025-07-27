import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';

export enum EGameStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  WON = 'WON',
  LOSED = 'LOSED',
}

export interface GamePlayer extends Abstract {
  gameId: number;
  playerId: number;
  score: number;
  gameStatus: EGameStatus;
  timeElapsed: number;
}

export const emptyGamePlayer: GamePlayer = {
  ...emptyAbstract,
  gameId: 0,
  playerId: 0,
  score: 0,
  gameStatus: EGameStatus.NOT_STARTED,
  timeElapsed: 0,
};
