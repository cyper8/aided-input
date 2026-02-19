import { render, type TemplateResult } from "lit";

let containers: HTMLElement[] = [];

export function cleanupFixtures() {
  containers.forEach(container => container.remove());
  containers = [];
}

const createContainer = () => {
  let container = document.createElement('div');
  document.body.appendChild(container);
  containers.push(container);
  return container
}

const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

export async function fixture<T extends HTMLElement>(template: TemplateResult, options?: { modules: string[] }): Promise<T> {
  if (options) {
    await Promise.all(options.modules.map(mod => import(mod).catch(console.log)))
  }
  let container = createContainer();
  render(template, container);
  let element = container.firstElementChild as T;
  if (element) {
    if ('updateComplete' in element) {
      await element.updateComplete
    } else {
      await nextFrame()
    }
    return element
  } else {
    throw new Error(`fixture of ${template.strings.join()} rendered no element`)
  }
}