import {IDictionary} from "../dictionary.js";

export class RenderedTemplate {
    private readonly instances: HTMLElement[];

    constructor(renderedElements: HTMLElement[]) {
        this.instances = renderedElements;
    }

    public setAttribute(attribute: string, value: string): void {
        this.instances.forEach(e => e.setAttribute(attribute, value));
    }

    public renderData(data: IDictionary<string>): void {
        for(const key in data) {
            if(data.hasOwnProperty(key)) {
                this.renderItem(key, data[key]);
            }
        }
    }

    private renderItem(key: string, item: string) {
        this.instances.forEach(renderElement => {
            const itemDisplayElements = renderElement.querySelectorAll(`.data-${key}`);
            itemDisplayElements.forEach(e => e.innerHTML = item);
        });
    }
}