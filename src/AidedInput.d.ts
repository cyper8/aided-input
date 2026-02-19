import { LitElement } from 'lit';
import { Model } from './Model.js';
export declare class AidedInput<T extends Model> extends LitElement {
    label: string;
    name: string;
    placeholder: string;
    suggestions: Array<T>;
    longCaptions: boolean;
    selected: Array<number>;
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=AidedInput.d.ts.map