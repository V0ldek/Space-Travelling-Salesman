import {IDictionary} from "./dictionary.js";

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

class TemplateRenderer {
    private readonly name: string;
    private readonly templateElement: HTMLTemplateElement;
    private readonly renderElements: NodeListOf<Element>;

    constructor(name: string) {
        this.name = name;
        this.templateElement = this.getTemplateElement();
        this.renderElements = this.getRenderElements();
    }

    public render(): RenderedTemplate {
        this.renderTemplateToRenderElement();
        return new RenderedTemplate(this.renderElements);
    }

    private getTemplateElement(): HTMLTemplateElement {
        return document.querySelector(`#template-${this.name}`);
    }

    private getRenderElements(): NodeListOf<Element> {
        return document.querySelectorAll(`.render-${this.name}`);
    }

    private renderTemplateToRenderElement(): void {
        const templateInstance = this.templateElement.content.cloneNode(true);
        this.renderElements.forEach(e => e.appendChild(templateInstance));
    }
}

export interface ITemplateFactory {
    createTemplate(name: string): RenderedTemplate;
}

export class TemplateFactory implements ITemplateFactory {
    public createTemplate(name: string): RenderedTemplate {
        const templateRenderer = new TemplateRenderer(name);
        return templateRenderer.render();
    }
}