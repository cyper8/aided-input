import { LitElement } from 'lit';
import { EventAt } from './generic-event.js';
export type AidedInputInputEvent = CustomEvent<string> & {
    type: "aided-input";
};
export type AidedInputChangeEvent = CustomEvent & {
    type: "aided-change";
};
export interface SuggestionItem {
    name: string;
    value: any;
}
export declare class AidedInput<T extends SuggestionItem> extends LitElement {
    label: string;
    name: string;
    placeholder: string;
    suggestions: Array<T>;
    longCaptions: boolean;
    selected: Array<T>;
    mode: 'append' | 'replace';
    strict: boolean;
    static get styles(): import("lit").CSSResult[];
    announceChange(): void;
    announceInput(e: EventAt<HTMLInputElement>): void;
    handleChange: (e: KeyboardEvent & EventAt<HTMLInputElement>) => void;
    handleKey: (e: KeyboardEvent & EventAt<HTMLInputElement>) => void;
    private selectItem;
    deselectItem(index: number): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=AidedInput.d.ts.map