// export type Constructor<T = {}> = new (...args: any[]) => T;
export class Model {
    static get pKey() {
        return '++id';
    }
    constructor(id) {
        this.id = id;
    }
    getRecord() {
        return Object.entries(this).reduce((record, [key, value]) => {
            const output = record;
            output[key] = value;
            return output;
        }, {});
    }
}
