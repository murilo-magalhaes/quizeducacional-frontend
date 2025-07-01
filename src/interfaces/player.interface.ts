import {Abstract, emptyAbstract} from "@/interfaces/abstract.interface";

export interface Player extends Abstract{
    name: string;
    id: number;
}

export const emptyPlayer: Player = {
    ...emptyAbstract,
    name: '',
    id: 0,
}