import {RenderedTemplate} from "./renderedTemplate.js";

export class TemplateRenderer {
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