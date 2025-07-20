import {Abstract, emptyAbstract} from "@/interfaces/abstract.interface";

export interface GameQuestion extends Abstract {
    gameId: number;
    questionId: number;
    position: number;
}

export const emptyGame: GameQuestion = {
    ...emptyAbstract,
    gameId: 0,
    questionId: 0,
    position: 0,
}