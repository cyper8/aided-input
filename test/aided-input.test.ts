import { html } from 'lit';
import { fixture } from './fixtureHelper.js';
import { expect, describe, it } from 'vitest';
import { AidedInput } from '../src/AidedInput.js';
import { TestModel } from './TestModel.js';

describe('AidedInput', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<AidedInput<TestModel>>(
      html`<aided-input></aided-input>`,
      {
        modules: ['../src/aided-input.js']
      }
    );
    expect(el).exist;
  });
});
