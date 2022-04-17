import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { AidedInput } from '../src/AidedInput.js';
import '../src/aided-input.js';
import { TestModel } from './TestModel.js';

describe('AidedInput', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<AidedInput<TestModel>>(
      html`<aided-input></aided-input>`
    );
    expect(el).exist;
  });
});
