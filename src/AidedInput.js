var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { global, buttons, colorsVars } from './shared-styles.js';
export class AidedInput extends LitElement {
    constructor() {
        super(...arguments);
        this.label = 'Models:';
        this.name = 'field';
        this.placeholder = 'Start typing to see the suggestions';
        this.suggestions = [];
        this.longCaptions = true;
        this.selected = [];
    }
    // @query('input#input')
    // input!: HTMLInputElement;
    static get styles() {
        return [
            global,
            colorsVars,
            buttons,
            css `
        .input,
        .item,
        .item button {
          display: inline-block;
        }
      `,
        ];
    }
    render() {
        return html `
      <label for="input">${this.label}</label>
      <!-- Here go already selected items //-->
      <div class="input" role="list" id="selected">
        ${this.selected.map(id => html `
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
          `)}
      </div>
      <!-- End //-->

      <!-- Here go input to filter suggestions list //-->
      <input
        type="text"
        placeholder=${this.placeholder}
        list="suggestions-list"
        id="input"
        name="${this.name}"
        @change=${(event) => {
            const input = event.target;
            this.selected = [...this.selected, parseInt(input.value, 10)];
            input.value = '';
        }}
      />

      <datalist id="suggestions-list">
        ${this.suggestions
            .filter(m => !!m.id && !this.selected.includes(m.id))
            .map(m => html `<option .value="${`${m.id}`}">
                ${m.caption(this.longCaptions)}
              </option>`)}
      </datalist>
    `;
    }
}
__decorate([
    property({ type: String })
], AidedInput.prototype, "label", void 0);
__decorate([
    property({ type: String })
], AidedInput.prototype, "name", void 0);
__decorate([
    property({ type: String })
], AidedInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: Array })
], AidedInput.prototype, "suggestions", void 0);
__decorate([
    property({ type: Boolean })
], AidedInput.prototype, "longCaptions", void 0);
__decorate([
    property({ type: Array })
], AidedInput.prototype, "selected", void 0);
