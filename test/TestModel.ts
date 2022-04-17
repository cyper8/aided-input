import { Model, Record } from '../src/Model.js';

export interface TestRecord extends Record {
  title: string;
}

export class TestModel extends Model {
  title: string = 'test';

  constructor(record: TestRecord) {
    super(record.id);
    this.title = record.title;
  }

  caption(long: boolean = false) {
    return long ? `long ${this.title}` : `${this.title}`;
  }
}

export const testModels = [
  new TestModel({ id: 1, title: 'first' }),
  new TestModel({ id: 2, title: 'second' }),
  new TestModel({ id: 3, title: 'third' }),
];
