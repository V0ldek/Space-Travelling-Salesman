import {Dictionary, IDictionary} from "../dictionary.js";

export class RenderedTemplate {
    private readonly instance: HTMLElement;

    constructor(renderedElement: HTMLElement) {
        this.instance = renderedElement;
    }

    public getElement(): HTMLElement {
        return this.instance;
    }

    public renderData(data: IDictionary<string>): void {
        Dictionary.forEach(data, (k, i) => this.renderItem(k, i));
    }

    public remove(): void {
        this.instance.remove();
    }

    private renderItem(key: string, item: string) {
        const itemDisplayElements = this.instance.querySelectorAll(`.data-${key}`);
        itemDisplayElements.forEach(e => e.innerHTML = item);
    }
}