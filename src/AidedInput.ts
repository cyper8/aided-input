import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { EventAt } from './generic-event.js';
import { global, buttons, colorsVars } from './shared-styles.js';

export type AidedInputInputEvent = CustomEvent<string> & {
  type: "aided-input"
}

export type AidedInputChangeEvent = CustomEvent & {
  type: "aided-change"
}

export interface SuggestionItem {
  name: string
  value: any
}

export class AidedInput<T extends SuggestionItem> extends LitElement {
  @property({ type: String }) label: string = 'Models:';
  @property({ type: String }) name: string = 'field';
  @property({ type: String }) placeholder: string =
    '...Start typing to see the suggestions';
  @property({ type: Array }) suggestions: Array<T> = [];
  @property({ type: Boolean }) longCaptions = true;
  @property({ type: Array }) selected: Array<T> = [];
  @property({ type: String }) mode: 'append' | 'replace' = 'replace';
  @property({ type: Boolean }) strict: boolean = false;

  static get styles() {
    return [
      global,
      colorsVars,
      buttons,
      css`
        :host {
          display: inline-block;
          padding: 0.5em;
          border-bottom: solid 1px black;
        }
        .input,
        .item,
        .item {
          display: inline-block;
          border-radius: 0.5em;
        }
        .item button {
          display: none;
          padding: 0 .3em 0 .3em;
          margin: 0;
        }
        .item:hover button {
          display: initial;
        }
        .input:has( + input:placeholder-shown ) {
          .item:last-child {
            outline: solid 0.5px rgba(255,0,0,0.3);
          }
        }
        input {
          border: none;
          background: none;
        }
      `,
    ];
  }

  announceChange() {
    this.dispatchEvent(
      new CustomEvent(
        "aided-change",
        {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: this.selected
        }
      ) as AidedInputChangeEvent
    );
  }

  announceInput(e: EventAt<HTMLInputElement>) {
    this.dispatchEvent(
      new CustomEvent(
        "aided-input",
        {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: e.target.value
        }
      ) as AidedInputInputEvent
    )
  }

  handleChange = (e: KeyboardEvent & EventAt<HTMLInputElement>) => {
    let value = e.target.value;
    if (value) {
      this.selectItem(value);
      e.target.value = '';
    }
  }

  handleKey = (e: KeyboardEvent & EventAt<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (e.target.value) {
          this.selectItem(e.target.value);
          e.target.value = '';
        }
        break;
      case "Backspace":
        if (e.target.value == '' && this.selected.length) {
          e.preventDefault();
          this.deselectItem(this.selected.length - 1);
        }
        break;
      default:
    }
  }

  private selectItem(selected: number): void
  private selectItem(selected: T): void
  private selectItem(selected: string): void
  private selectItem(selected: T | number | string): void {
    let suggestion: T | undefined;
    if (typeof selected == 'number') {
      suggestion = this.suggestions[selected]
    } else {
      if (typeof selected == "string") {
        suggestion = this.suggestions.find(item => item.name.startsWith(selected))
          || (this.strict
            ? undefined
            : { name: selected, value: selected } as T);
      } else suggestion = selected;
    }
    if (suggestion) {
      if (this.mode == 'append') {
        this.selected = [...this.selected, suggestion];
      } else {
        this.selected = [suggestion];
      }
      this.announceChange();
    }
  }

  deselectItem(index: number) {
    this.selected = this.selected.filter((_i, i) => i !== index);
    this.announceChange();
  }

  render() {
    return html`
      <label for="input">${this.label}</label>
      <!-- Here go already selected items //-->
      <div class="input" role="list" id="selected">
        ${this.selected.map(
      (item, id) => html`
            <span class="item" role="listitem">
              ${item.name}
              <button
                class="delete"
                @click=${() => {
          this.deselectItem(id);
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
        autocomplete=off
        @keydown=${this.handleKey}
        @change=${this.handleChange}
        @input=${this.announceInput}
      />

      <datalist id="suggestions-list">
        ${this.suggestions
        .map(
          (item, _id) =>
            html`<option .value=${item.value}>
                ${item.name}
              </option>`
        )}
      </datalist>
    `;
  }
}
