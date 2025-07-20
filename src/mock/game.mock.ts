import {Game} from "@/interfaces/game.interface";
import {emptyContent} from "@/interfaces/content.interface";

export const mockGames: Game[] = [
    {
        content: emptyContent,
        contentId: 3,
        createdAt: new Date(),
        id: 1,
        qntQuestions: 5,
        questions: [],
        status: 'A',
        updatedAt: new Date(),
        players: []
    },
    {
        id: 2,
        contentId: 3,
        qntQuestions: 5,
        questions: [],
        status: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
        content: emptyContent,
        players: []
    }
]