import {RenderedTemplate} from "./renderedTemplate.js";

export class TemplateRenderer {
    private readonly name: string;
    private readonly templateElement: HTMLTemplateElement;
    private readonly renderElements: NodeListOf<Element>;
    private nextId: number = 1;

    constructor(name: string) {
        console.warn("Rendering " + name);
        this.name = name;
        this.templateElement = this.getTemplateElement();
        this.renderElements = this.getRenderElements();
    }

    public render(): RenderedTemplate {
        const templateInstances = this.renderTemplateToRenderElements();
        return new RenderedTemplate(templateInstances);
    }

    private getTemplateElement(): HTMLTemplateElement {
        return document.querySelector(`#template-${this.name}`);
    }

    private getRenderElements(): NodeListOf<Element> {
        return document.querySelectorAll(`.render-${this.name}`);
    }

    private renderTemplateToRenderElements(): HTMLElement[] {
        const templateInstances: HTMLElement[] = [];
        this.renderElements.forEach(e => {
            templateInstances.push(this.renderTemplateToRenderElement(e));
        });

        return templateInstances;
    }

    private renderTemplateToRenderElement(renderElement: Element): HTMLElement {
        const templateRoot = this.templateElement.content.querySelector(".template-root");
        const templateInstance = templateRoot.cloneNode(true) as HTMLElement;
        this.setTemplateInstanceId(templateInstance);
        renderElement.appendChild(templateInstance);
        return templateInstance;
    }

    private setTemplateInstanceId(templateInstance: HTMLElement): void {
        templateInstance.id = `rendered-template-instance-${this.nextId}`;
        this.nextId++;
    }

}