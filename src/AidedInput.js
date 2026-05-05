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
        this.placeholder = '...Start typing to see the suggestions';
        this.suggestions = [];
        this.longCaptions = true;
        this.selected = [];
        this.mode = 'replace';
        this.strict = false;
        this.handleChange = (e) => {
            let value = e.target.value;
            if (value) {
                this.selectItem(value);
                e.target.value = '';
            }
        };
        this.handleKey = (e) => {
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
        };
    }
    static get styles() {
        return [
            global,
            colorsVars,
            buttons,
            css `
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
        this.dispatchEvent(new CustomEvent("aided-change", {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: this.selected
        }));
    }
    announceInput(e) {
        this.dispatchEvent(new CustomEvent("aided-input", {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: e.target.value
        }));
    }
    selectItem(selected) {
        let suggestion;
        if (typeof selected == 'number') {
            suggestion = this.suggestions[selected];
        }
        else {
            if (typeof selected == "string") {
                suggestion = this.suggestions.find(item => item.name.startsWith(selected))
                    || (this.strict
                        ? undefined
                        : { name: selected, value: selected });
            }
            else
                suggestion = selected;
        }
        if (suggestion) {
            if (this.mode == 'append') {
                this.selected = [...this.selected, suggestion];
            }
            else {
                this.selected = [suggestion];
            }
            this.announceChange();
        }
    }
    deselectItem(index) {
        this.selected = this.selected.filter((_i, i) => i !== index);
        this.announceChange();
    }
    render() {
        return html `
      <label for="input">${this.label}</label>
      <!-- Here go already selected items //-->
      <div class="input" role="list" id="selected">
        ${this.selected.map((item, id) => html `
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
        autocomplete=off
        @keydown=${this.handleKey}
        @change=${this.handleChange}
        @input=${this.announceInput}
      />

      <datalist id="suggestions-list">
        ${this.suggestions
            .map((item, _id) => html `<option .value=${item.value}>
                ${item.name}
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
__decorate([
    property({ type: String })
], AidedInput.prototype, "mode", void 0);
__decorate([
    property({ type: Boolean })
], AidedInput.prototype, "strict", void 0);
