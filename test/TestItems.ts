import { SuggestionItem } from '../src/AidedInput.js';

export class TestItem implements SuggestionItem {
  name: string = 'test';
  value: string = 'test';

  constructor({ name, value }) {
    this.name = name;
    this.value = value;
  }
}

export const tests = [
  new TestItem({ name: 'first', value: 'first' }),
  new TestItem({ name: 'second', value: 'second' }),
  new TestItem({ name: 'third', value: 'third' }),
  new TestItem({ name: 'fourth', value: 'fourth' }),
  new TestItem({ name: 'fifth', value: 'fifth' }),
  new TestItem({ name: 'sixth', value: 'sixth' })
];
