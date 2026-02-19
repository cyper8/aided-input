export interface Record {
    id?: number;
}
export declare abstract class Model<T extends Record = Record> implements Record {
    id?: number;
    static get pKey(): string;
    constructor(id?: number);
    abstract caption(long?: boolean): string;
    getRecord(): T;
}
//# sourceMappingURL=Model.d.ts.map