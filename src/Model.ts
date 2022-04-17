// export type Constructor<T = {}> = new (...args: any[]) => T;

export interface Record {
  id?: number;
}

export abstract class Model<T extends Record = Record> implements Record {
  id?: number;

  static get pKey() {
    return '++id';
  }

  constructor(id?: number) {
    this.id = id;
  }

  abstract caption(long?: boolean): string;

  getRecord(): T {
    return Object.entries(this).reduce((record, [key, value]) => {
      const output = record;
      output[key as keyof T] = value;
      return output;
    }, {} as T);
  }
}
