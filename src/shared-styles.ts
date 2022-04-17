import { css } from 'lit';

export const global = css`
  * {
    box-sizing: border-box;
  }
  a,
  a:visited {
    text-decoration: none;
  }
`;

export const colorsVars = css`
  :host {
    --its-app-text-color: #464646;
    --its-app-background-color: #f0f0f0;
    --its-app-foreground-color: #dfdfdf;
    --its-app-hilight-color: #dfdad0;
    --its-app-negative-color: #fdb975;
    --its-app-positive-color: #9bffb9;
    --its-app-accent-color: #579bdf;
  }
`;

export const buttons = css`
  button,
  .button {
    border-radius: 1em;
    border: none;
    background-color: var(--its-app-foreground-color);
    padding: 0.5em;
    margin: 0.5em;
    list-style-type: none;
  }
  button[disabled],
  .button[disabled] {
    background-color: var(--its-app-background-color);
    border: solid 1px var(--its-app-foreground-color);
    color: var(--its-app-foreground-color);
  }
  .accent {
    background-color: var(--its-app-accent-color);
    color: var(--its-app-background-color, #f0f0f0);
  }
  .delete,
  .remove,
  .negative {
    background-color: var(--its-app-negative-color, red);
    color: var(--its-app-background-color, #f0f0f0);
  }
  .add,
  .confirm {
    background-color: var(--its-app-positive-color, green);
    color: var(--its-app-text-color, #464646);
  }
`;
