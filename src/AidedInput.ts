import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { EventAt } from './generic-event.js';
import { Model } from './Model.js';
import { global, buttons, colorsVars } from './shared-styles.js';

export class AidedInput<T extends Model> extends LitElement {
  @property({ type: String }) label: string = 'Models:';

  @property({ type: String }) name: string = 'field';

  @property({ type: String }) placeholder: string =
    'Start typing to see the suggestions';

  @property({ type: Array }) suggestions: Array<T> = [];

  @property({ type: Boolean }) longCaptions = true;

  @property({ type: Array }) selected: Array<number> = [];

  // @query('input#input')
  // input!: HTMLInputElement;

  static get styles() {
    return [
      global,
      colorsVars,
      buttons,
      css`
        .input,
        .item,
        .item button {
          display: inline-block;
        }
      `,
    ];
  }

  render() {
    return html`
      <label for="input">${this.label}</label>
      <!-- Here go already selected items //-->
      <div class="input" role="list" id="selected">
        ${this.selected.map(
          id => html`
            <span class="item" role="listitem">
              ${this.suggestions
                .filter(m => m.id === id)[0]
                .caption(this.longCaptions)}
              <button
                class="delete"
                @click=${() => {
                  this.selected = this.selected.filter(i => i !== id);
                }}
                aria-label="Remove"
              >
                &times;
              </button>
            </span>
          `
        )}
      </div>
      <!-- End //-->

      <!-- Here go input to filter suggestions list //-->
      <input
        type="text"
        placeholder=${this.placeholder}
        list="suggestions-list"
        id="input"
        name="${this.name}"
        @change=${(event: EventAt<HTMLInputElement>) => {
          const input = event.target;
          this.selected = [...this.selected, parseInt(input.value, 10)];
          input.value = '';
        }}
      />

      <datalist id="suggestions-list">
        ${this.suggestions
          .filter(m => !!m.id && !this.selected.includes(m.id))
          .map(
            m =>
              html`<option .value="${`${m.id!}`}">
                ${m.caption(this.longCaptions)}
              </option>`
          )}
      </datalist>
    `;
  }
}
