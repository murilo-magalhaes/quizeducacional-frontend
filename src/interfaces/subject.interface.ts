import {Abstract, emptyAbstract} from "@/interfaces/abstract.interface";

export interface Subject extends Abstract {
    title: string;
}

export const emptySubject: Subject = {
    ...emptyAbstract,
    title: '',
}