import {Abstract, emptyAbstract} from "@/interfaces/abstract.interface";
import {Content, emptyContent} from "@/interfaces/content.interface";

export interface Game extends Abstract {
    qntQuestions: number;
    contentId: number;
    content: Content;
}

export const emptyGame: Game = {
    ...emptyAbstract,
    qntQuestions: 0,
    contentId: 0,
    content: emptyContent,
}