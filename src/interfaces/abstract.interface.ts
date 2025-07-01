export interface Abstract {
    id: number;
    status: 'A' | 'C';
    createdAt: Date;
    updatedAt: Date;
}

export const emptyAbstract: Abstract = {
    createdAt: new Date(), id: 0, status: 'A', updatedAt: new Date()
}