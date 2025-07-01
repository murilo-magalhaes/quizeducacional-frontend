import {Abstract, emptyAbstract} from "@/interfaces/abstract.interface";
import {emptySubject, Subject} from "@/interfaces/subject.interface";

export interface Content extends Abstract {
    title: string;
    subjectId: number;
    subject: Subject;
}

export const emptyContent: Content = {
    ...emptyAbstract,
    title: '',
    subjectId: 0,
    subject: emptySubject
}