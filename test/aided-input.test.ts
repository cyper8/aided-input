import { html } from 'lit';
import { fixture } from './fixtureHelper.js';
import { expect, describe, it } from 'vitest';
import { AidedInput } from '../src/AidedInput.js';
import { TestItem } from './TestItems.js';

describe('AidedInput', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<AidedInput<TestItem>>(
      html`<aided-input></aided-input>`,
      {
        modules: ['../src/aided-input.js']
      }
    );
    expect(el).exist;
  });
});
