import {IDictionary} from "../dictionary.js";

export class RenderedTemplate {
    private readonly renderedElements: NodeListOf<Element>;

    constructor(renderedElements: NodeListOf<Element>) {
        this.renderedElements = renderedElements;
    }

    public setAttribute(attribute: string, value: string): void {
        this.renderedElements.forEach(e => e.setAttribute(attribute, value));
    }

    public renderData(data: IDictionary<string>): void {
        for(const key in data) {
            if(data.hasOwnProperty(key)) {
                this.renderItem(key, data[key]);
            }
        }
    }

    private renderItem(key: string, item: string) {
        console.log(`Rendering item for key ${key}, value ${item}`);
        this.renderedElements.forEach(renderElement => {
            const itemDisplayElements = renderElement.querySelectorAll(`.data-${key}`);
            itemDisplayElements.forEach(e => e.innerHTML = item);
        });
    }
}